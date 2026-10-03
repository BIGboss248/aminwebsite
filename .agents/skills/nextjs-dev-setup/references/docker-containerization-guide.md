# Docker Standalone Production Containerization Guide

Containerizing Next.js using **Standalone Mode** packages only traced production `node_modules` and compiled assets into a minimal, secure, non-root Node.js container (`server.js`). Local development runs directly on the host machine using the project package manager (`pnpm run dev`), while Docker is configured strictly for production builds and deployments.

---

## 1. Standalone Next.js Configuration & Security Safeguards

Configure `next.config.ts` with standalone output, Server Action origin protection, version skew protection (`deploymentId`), and reverse proxy streaming headers (`X-Accel-Buffering`):

```ts
import type { NextConfig } from "next";
import { SITE_CONFIG } from "./lib/site-config";

const siteHost = new URL(SITE_CONFIG.baseUrl).host;

const nextConfig: NextConfig = {
  output: "standalone",
  // Version skew protection across deployments and rolling releases
  deploymentId: process.env.NEXT_PUBLIC_APP_VERSION || process.env.GIT_HASH || undefined,
  experimental: {
    serverActions: {
      allowedOrigins: [
        siteHost,
        `*.${siteHost}`,
        "localhost:3000",
        "127.0.0.1:3000",
      ],
    },
  },
  // Anti-buffering header for reverse proxies (Nginx / Traefik) to preserve Suspense streaming & PPR
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },
  outputFileTracingIncludes: {
    "/*": ["./node_modules/@swc/helpers/**/*"],
  },
};

export default nextConfig;
```

---

## 2. Server Action Encryption Key

To ensure Server Action tokens remain decryptable across server restarts, container rebuilds, and rolling updates:

1. Generate a consistent 32-byte (256-bit) base64 encryption key:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
2. Mirror `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` in `.env.example` and pass it to your production container environment.

---

## 3. Multi-Stage Dockerfile Architecture

The production Dockerfile employs 3 distinct stages:

1. **`dependencies` stage**: Installs production dependencies using BuildKit cache mounts (`/root/.local/share/pnpm/store`) and frozen lockfiles.
2. **`builder` stage**: Compiles the standalone application using `next build`.
3. **`runner` stage**: Minimal Node 22 slim runtime copying only `.next/standalone`, `.next/static`, and `public/`, running under a non-root `node` user with `STOPSIGNAL SIGTERM` for graceful request draining and `after()` background task completion.

- Dockerfile Template: [`Dockerfile.template`](../resources/templates/Dockerfile.template)
- Dockerignore Template: [`dockerignore.template`](../resources/templates/dockerignore.template)

---

## 4. Docker Compose Stacks & Graceful Shutdown

Both Compose stacks configure `stop_grace_period: 30s` to allow in-flight HTTP requests and Next.js `after()` callbacks to finish before termination:

1. **Local Build & Verification Stack (`docker-compose.yml`)**:
   - Compiles and runs the container from local source code.
   - Template: [`docker-compose.yml.template`](../resources/templates/docker-compose.yml.template)
2. **GHCR Production Package Stack (`docker-compose.prod.yml`)**:
   - Pulls pre-built multi-arch images directly from GitHub Container Registry without needing local source code.
   - Template: [`docker-compose.prod.yml.template`](../resources/templates/docker-compose.prod.yml.template)

---

## 5. Execution Commands Reference

- **Local Build & Run (Direct Docker)**:
  ```bash
  docker build -t nextjs-app:latest .
  docker run -d -p 3000:3000 --name nextjs-standalone-app nextjs-app:latest
  ```
- **Local Build & Run (Docker Compose)**:
  ```bash
  docker compose up -d --build
  ```
- **GHCR Production Package Deployment**:
  ```bash
  docker compose -f docker-compose.prod.yml pull
  docker compose -f docker-compose.prod.yml up -d
  # Specific release tag:
  IMAGE_TAG=1.0.0 docker compose -f docker-compose.prod.yml up -d
  ```

---

> [!WARNING]
> ### Multi-Container Deployments & Distributed Cache Coordination
> When scaling beyond a single container instance (e.g. running multiple replicas behind a load balancer or deploying to Kubernetes), the default local filesystem cache (`.next/cache`) causes **cache drift** (one pod invalidating a tag while others serve stale content).
>
> For multi-container scaling, you must configure a distributed shared cache handler (e.g. Redis) with tag synchronization (`refreshTags()`).
> - **Self-Hosting Guide**: [Next.js Self-Hosting Documentation](https://nextjs.org/docs/app/guides/self-hosting#multi-server-deployments)
> - **Official Redis Reference**: [vercel/next.js/examples/cache-handler-redis](https://github.com/vercel/next.js/tree/canary/examples/cache-handler-redis)
