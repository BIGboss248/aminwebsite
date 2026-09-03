---
name: nextjs-healthcheck
description: Automated workflow and engineering standards for setting up a production health monitoring endpoint, adding Docker Compose health check probes to detected compose stacks, core runtime metrics (V8 heap saturation, event loop lag, uptime), and automatic database detection and probes (Prisma, Drizzle, Mongoose, Supabase, etc.) in Next.js App Router applications. Triggers on "/nextjs-healthcheck", "setup health check", "add health endpoint", "docker compose healthcheck nextjs", "configure health monitor", or when inspecting application liveness/readiness.
metadata:
  author: BIGboss248
  version: "1.1"
---

# Next.js Health Check & Docker Compose Observability Skill (`nextjs-healthcheck`)

This skill defines the complete workflow for creating, configuring, and maintaining production-grade health check endpoints, detecting and configuring Docker Compose health probes across repository compose stacks, and monitoring core runtime performance metrics in Next.js App Router applications.

---

## 1. Architectural Principles & Status Code Discipline

A robust health check must differentiate between **Liveness** (process is running), **Readiness** (process is able to serve traffic), and **Saturation** (system is degraded/stressed).

### Status Code & Severity Matrix

| Status | HTTP Code | Meaning | Orchestrator Action (Docker Compose / Reverse Proxy / Load Balancer) |
| :--- | :--- | :--- | :--- |
| **`healthy`** | `200 OK` | All system metrics within normal bounds, all critical dependencies reachable. | Route traffic normally. |
| **`degraded`** | `200 OK` | App is serving requests, but under elevated resource pressure (e.g. heap utilization >80% or event loop lag >100ms). | Continue routing traffic; trigger observability warning alert. |
| **`unhealthy`** | `503 Service Unavailable` | Critical failure (database unreachable, heap saturation >90%, event loop lockup >500ms). | **Stop routing traffic** and trigger container restart / rollover. |

> [!IMPORTANT]
> **HTTP 503 on Critical Failure:** Orchestrators and reverse proxies inspect the HTTP status code. If a critical dependency is down, the endpoint **must return 503** so the instance is identified as unhealthy and removed from active routing.

---

## 2. Automated Database & Dependency Discovery Workflow

Before generating or modifying the health endpoint, the agent **must scan the project** to determine if a database or external state store is configured.

### Detection Checklist (`package.json` & Project Files)

| Dependency / ORM | Indicators in Project | Health Probe Strategy |
| :--- | :--- | :--- |
| **Prisma** | `@prisma/client`, `prisma` in `package.json`, `prisma/schema.prisma` | `await prisma.$queryRaw\`SELECT 1\`` with a 2-second timeout. |
| **Drizzle ORM** | `drizzle-orm` in `package.json`, `drizzle.config.ts` | `await db.execute(sql\`SELECT 1\`)` with a 2-second timeout. |
| **Supabase** | `@supabase/supabase-js`, `@supabase/ssr` | `await supabase.from('_dummy_health').select('count', { count: 'exact', head: true })` or ping auth endpoint. |
| **Mongoose / MongoDB** | `mongoose`, `mongodb` in `package.json` | Check `mongoose.connection.readyState === 1` or ping admin db. |
| **PostgreSQL (`pg`)** | `pg`, `postgres` in `package.json` | `await pool.query('SELECT 1')` with a 2-second timeout. |
| **MySQL (`mysql2`)** | `mysql2` in `package.json` | `await pool.query('SELECT 1')` with a 2-second timeout. |
| **SQLite (`better-sqlite3`)** | `better-sqlite3` in `package.json` | Synchronously run `db.prepare('SELECT 1').get()`. |
| **Redis (`ioredis` / `redis`)** | `ioredis`, `redis` in `package.json` | `await redis.ping()` with a 1-second timeout. |
| **No Database Detected** | None of the above dependencies present | **Omit all database checks completely.** Provide pure runtime & system metrics. |

---

## 3. Core Metrics to Measure

Every health endpoint must collect non-blocking, zero-overhead Node.js runtime metrics:

### 1. V8 Heap Saturation & Memory Utilization
- **Metrics Collected**: `used_heap_size`, `total_heap_size`, `heap_size_limit`, `rss`.
- **Heap Utilization Calculation**:
  $$\text{Heap Utilization (\%)} = \left(\frac{\text{used\_heap\_size}}{\text{heap\_size\_limit}}\right) \times 100$$
- **Thresholds**:
  - `< 80%`: `healthy`
  - `80% - 90%`: `degraded` (memory pressure)
  - `> 90%`: `unhealthy` (imminent Out-Of-Memory / OOM kill)

### 2. Event Loop Delay (CPU Starvation & Blocking Tasks)
- **Engine**: Node.js `perf_hooks.monitorEventLoopDelay({ resolution: 10 })`.
- **Metrics Collected**: Mean lag, 99th percentile lag ($p99$).
- **Thresholds**:
  - $p99 < 100\text{ms}$: `healthy`
  - $100\text{ms} \le p99 \le 500\text{ms}$: `degraded` (high load)
  - $p99 > 500\text{ms}$: `unhealthy` (event loop stalled/frozen)

### 3. Process Uptime & System Metadata
- **Metrics Collected**: `uptimeSeconds` (`Math.floor(process.uptime())`), ISO 8601 timestamp, `process.env.NODE_ENV`, package version.

---

## 4. Route Handler Templates

### Standard Location
- For `app/` root layout: `app/api/health/route.ts`
- For `src/app/` layout: `src/app/api/health/route.ts`

---

### Template A: Standard (No Database Detected)

Use this clean, lightweight template when the repository does **not** use a database:

```ts
// app/api/health/route.ts
import { NextResponse } from "next/server";
import v8 from "v8";
import { monitorEventLoopDelay } from "perf_hooks";

export const dynamic = "force-dynamic";

// Continuous event loop lag monitoring
const histogram = monitorEventLoopDelay({ resolution: 10 });
histogram.enable();

interface MetricCheck {
  status: "healthy" | "degraded" | "unhealthy";
  details?: Record<string, unknown>;
}

function evaluateMemory(): MetricCheck {
  const heapStats = v8.getHeapStatistics();
  const memoryUsage = process.memoryUsage();

  const usedHeapPercent = (heapStats.used_heap_size / heapStats.heap_size_limit) * 100;

  let status: MetricCheck["status"] = "healthy";
  if (usedHeapPercent > 90) {
    status = "unhealthy";
  } else if (usedHeapPercent > 80) {
    status = "degraded";
  }

  return {
    status,
    details: {
      heapUtilization: `${usedHeapPercent.toFixed(1)}%`,
      usedHeapMB: Math.round(heapStats.used_heap_size / 1024 / 1024),
      totalHeapMB: Math.round(heapStats.total_heap_size / 1024 / 1024),
      heapLimitMB: Math.round(heapStats.heap_size_limit / 1024 / 1024),
      rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
    },
  };
}

function evaluateEventLoop(): MetricCheck {
  const p99LagMs = histogram.percentile(99) / 1e6;

  let status: MetricCheck["status"] = "healthy";
  if (p99LagMs > 500) {
    status = "unhealthy";
  } else if (p99LagMs > 100) {
    status = "degraded";
  }

  return {
    status,
    details: {
      meanLagMs: Number((histogram.mean / 1e6).toFixed(2)),
      p99LagMs: Number(p99LagMs.toFixed(2)),
    },
  };
}

export async function GET() {
  const memory = evaluateMemory();
  const eventLoop = evaluateEventLoop();

  const isHealthy = memory.status !== "unhealthy" && eventLoop.status !== "unhealthy";
  const isDegraded = memory.status === "degraded" || eventLoop.status === "degraded";

  const overallStatus: "healthy" | "degraded" | "unhealthy" = !isHealthy
    ? "unhealthy"
    : isDegraded
      ? "degraded"
      : "healthy";

  const payload = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || "development",
    version: process.env.npm_package_version || "1.0.0",
    checks: {
      memory,
      eventLoop,
    },
  };

  return NextResponse.json(payload, {
    status: overallStatus === "unhealthy" ? 503 : 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
```

---

### Template B: Full Stack (Database Detected)

Use this template when an ORM / Database is present (e.g. Prisma or Drizzle):

```ts
// app/api/health/route.ts
import { NextResponse } from "next/server";
import v8 from "v8";
import { monitorEventLoopDelay } from "perf_hooks";
// import { prisma } from "@/lib/prisma"; // Adjust import to project convention

export const dynamic = "force-dynamic";

const histogram = monitorEventLoopDelay({ resolution: 10 });
histogram.enable();

interface DependencyCheck {
  status: "healthy" | "degraded" | "unhealthy";
  latencyMs?: number;
  error?: string;
  details?: Record<string, unknown>;
}

async function checkDatabaseConnectivity(): Promise<DependencyCheck> {
  const start = performance.now();
  try {
    // Wrap database ping with a strict 2-second timeout
    await Promise.race([
      // Replace with active DB client ping, e.g.: prisma.$queryRaw`SELECT 1`,
      new Promise((resolve) => setTimeout(resolve, 10)),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Database ping timed out after 2000ms")), 2000)
      ),
    ]);

    return {
      status: "healthy",
      latencyMs: Math.round(performance.now() - start),
    };
  } catch (err: unknown) {
    return {
      status: "unhealthy",
      latencyMs: Math.round(performance.now() - start),
      error: err instanceof Error ? err.message : "Database connection failed",
    };
  }
}

function evaluateMemory(): DependencyCheck {
  const heapStats = v8.getHeapStatistics();
  const memoryUsage = process.memoryUsage();
  const usedHeapPercent = (heapStats.used_heap_size / heapStats.heap_size_limit) * 100;

  let status: DependencyCheck["status"] = "healthy";
  if (usedHeapPercent > 90) status = "unhealthy";
  else if (usedHeapPercent > 80) status = "degraded";

  return {
    status,
    details: {
      heapUtilization: `${usedHeapPercent.toFixed(1)}%`,
      usedHeapMB: Math.round(heapStats.used_heap_size / 1024 / 1024),
      totalHeapMB: Math.round(heapStats.total_heap_size / 1024 / 1024),
      heapLimitMB: Math.round(heapStats.heap_size_limit / 1024 / 1024),
      rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
    },
  };
}

function evaluateEventLoop(): DependencyCheck {
  const p99LagMs = histogram.percentile(99) / 1e6;

  let status: DependencyCheck["status"] = "healthy";
  if (p99LagMs > 500) status = "unhealthy";
  else if (p99LagMs > 100) status = "degraded";

  return {
    status,
    details: {
      meanLagMs: Number((histogram.mean / 1e6).toFixed(2)),
      p99LagMs: Number(p99LagMs.toFixed(2)),
    },
  };
}

export async function GET() {
  const [database, memory, eventLoop] = await Promise.all([
    checkDatabaseConnectivity(),
    Promise.resolve(evaluateMemory()),
    Promise.resolve(evaluateEventLoop()),
  ]);

  const isHealthy =
    database.status !== "unhealthy" &&
    memory.status !== "unhealthy" &&
    eventLoop.status !== "unhealthy";

  const isDegraded =
    database.status === "degraded" ||
    memory.status === "degraded" ||
    eventLoop.status === "degraded";

  const overallStatus: "healthy" | "degraded" | "unhealthy" = !isHealthy
    ? "unhealthy"
    : isDegraded
      ? "degraded"
      : "healthy";

  const payload = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || "development",
    version: process.env.npm_package_version || "1.0.0",
    checks: {
      database,
      memory,
      eventLoop,
    },
  };

  return NextResponse.json(payload, {
    status: overallStatus === "unhealthy" ? 503 : 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
```

---

## 5. Docker Compose Stacks Configuration

When configuring health checks, the agent scans the workspace to discover all existing Docker Compose files and injects the healthcheck definition directly into the Next.js application service block.

### 5.1. Automated Docker Compose Detection Workflow

1. **Scan for Compose Files**:
   - Locate any compose files present at the root of the project:
     - `docker-compose.yml` (Local build & run stack)
     - `docker-compose.prod.yml` (Production / GHCR package deployment stack)
     - `docker-compose.*.yml` / `compose.yaml` (if present)
2. **Identify Next.js Application Service**:
   - Inspect the services inside each compose file to find the Next.js container (e.g., `nextjs-app`, `web`, `app`, or the service defining `build: .` / `ports: ["3000:3000"]`).
3. **Inject or Update `healthcheck` Configuration**:
   - Add the zero-dependency Node.js `fetch` healthcheck block to each detected Next.js service.

### 5.2. Standard Healthcheck Block for Compose

```yaml
    healthcheck:
      test: ["CMD-SHELL", "node -e \"fetch('http://127.0.0.1:3000/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))\""]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
```

### 5.3. Example: Configured `docker-compose.yml`

```yaml
services:
  nextjs-app:
    build:
      context: .
      dockerfile: Dockerfile
    image: nextjs-app:latest
    container_name: nextjs-standalone-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    healthcheck:
      test: ["CMD-SHELL", "node -e \"fetch('http://127.0.0.1:3000/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))\""]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
```

### 5.4. Example: Configured `docker-compose.prod.yml`

```yaml
services:
  nextjs-app:
    image: ghcr.io/<lowercase-repo-owner>/<lowercase-repo-name>:${IMAGE_TAG:-latest}
    container_name: nextjs-standalone-app
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    healthcheck:
      test: ["CMD-SHELL", "node -e \"fetch('http://127.0.0.1:3000/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))\""]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
```

---

## 6. Verification Procedure

To verify health check functionality:

1. **Test Local Development Server:**
   ```bash
   curl -i http://localhost:3000/api/health
   ```
   *Expected: HTTP 200 with JSON payload containing status, uptime, memory, and eventLoop.*

2. **Test Docker Compose Health Status:**
   ```bash
   docker compose up -d --build
   # Wait for start_period (10s) and check health
   docker compose ps
   ```
   *Expected: The service status displays `Up X seconds (healthy)`.*

3. **Stop Test Compose Stack:**
   ```bash
   docker compose down
   ```
