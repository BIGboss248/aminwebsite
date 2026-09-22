# Docker Standalone Production Containerization Guide

Containerizing Next.js using **Standalone Mode** packages only traced production `node_modules` and compiled assets into a minimal, secure, non-root Node.js container (`server.js`). Local development runs directly on the host machine using the project package manager (`pnpm run dev`), while Docker is configured strictly for production builds and deployments.

---

## 1. Standalone Next.js Output

Ensure `output: "standalone"` is enabled in `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

---

## 2. Multi-Stage Dockerfile Architecture

The production Dockerfile employs 3 distinct stages:

1. **`dependencies` stage**: Installs production dependencies using BuildKit cache mounts (`/root/.local/share/pnpm/store`) and frozen lockfiles.
2. **`builder` stage**: Compiles the standalone application using `next build`.
3. **`runner` stage**: Minimal Node 22 slim runtime copying only `.next/standalone`, `.next/static`, and `public/`, running under a non-root `node` user.

- Dockerfile Template: [`Dockerfile.template`](../resources/templates/Dockerfile.template)
- Dockerignore Template: [`dockerignore.template`](../resources/templates/dockerignore.template)

---

## 3. Dual Docker Compose Stacks

1. **Local Build & Verification Stack (`docker-compose.yml`)**:
   - Compiles and runs the container from local source code.
   - Template: [`docker-compose.yml.template`](../resources/templates/docker-compose.yml.template)
2. **GHCR Production Package Stack (`docker-compose.prod.yml`)**:
   - Pulls pre-built multi-arch images directly from GitHub Container Registry without needing local source code.
   - Template: [`docker-compose.prod.yml.template`](../resources/templates/docker-compose.prod.yml.template)

---

## 4. Execution Commands Reference

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
