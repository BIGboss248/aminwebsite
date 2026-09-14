# Health Checks & Observability Telemetry

**Document Version:** 1.0  
**Status:** Active  
**Component Scope:** Runtime Health Probes (`/api/health`), OpenTelemetry Distributed Tracing, and Real User Monitoring (RUM)

---

## 1. System Health Probing (`/api/health`)

The application exposes a lightweight, non-blocking health probe endpoint at `/api/health` designed for container orchestrator readiness/liveness checks (e.g., Docker Compose, Kubernetes, or edge reverse proxies).

### 1.1 Metrics Monitored

| Metric                  | Target Threshold               | Description                                   |
| :---------------------- | :----------------------------- | :-------------------------------------------- |
| **Status**              | `healthy` / `degraded`         | Overall application operational state         |
| **Uptime**              | Continuous (seconds)           | Duration since Node.js process initialization |
| **Memory (Heap Used)**  | `< 85%` of allocated heap      | V8 JavaScript heap consumption                |
| **Memory (RSS)**        | Monitored                      | Resident Set Size memory footprint            |
| **Event Loop Lag**      | `< 100ms`                      | Latency in Node.js libuv event loop iteration |
| **Database Connection** | `ok` (if active DB configured) | Live ping to primary database or ORM client   |

### 1.2 Health Probe Response Schema

```json
{
  "status": "healthy",
  "timestamp": "2026-09-14T09:30:00.000Z",
  "uptime": 3600,
  "checks": {
    "memory": {
      "status": "pass",
      "heapUsedBytes": 52428800,
      "heapTotalBytes": 104857600
    },
    "eventLoop": {
      "status": "pass",
      "lagMs": 4.2
    },
    "database": {
      "status": "pass",
      "latencyMs": 12
    }
  }
}
```

---

## 2. Distributed Tracing & OpenTelemetry (OTel)

Observability is instrumented across server runtimes and edge middleware using OpenTelemetry via Next.js instrumentation hooks.

### 2.1 Instrumentation Architecture

- **`instrumentation.ts`**: Registers OpenTelemetry SDK on Node.js and Edge runtimes.
- **Kill Switch (`OTEL_SDK_DISABLED`)**: Ensures local development runs cleanly without attempting to connect to external collectors unless `OTEL_SDK_DISABLED=false`.
- **Collector Protocols**: OTLP/HTTP or OTLP/gRPC exporter for Jaeger, Grafana Tempo, or SigNoz.

### 2.2 Trace Spans & Context Propagation

1. **HTTP Ingress**: Automatically spans incoming requests with path, method, status code, and duration.
2. **Server Actions & Route Handlers**: Captures internal business operations, database queries, and external API requests (e.g. DoH lookups, Resend emails).
3. **W3C Trace Context**: Injects `traceparent` and `tracestate` headers across outbound requests for end-to-end tracing.

---

## 3. Real User Monitoring (RUM) & Core Web Vitals

Client-side user experience is tracked using the `useReportWebVitals` hook and lightweight telemetry beacons:

- **Largest Contentful Paint (LCP)**: Target `< 1.2s`
- **Interaction to Next Paint (INP)**: Target `< 100ms`
- **Cumulative Layout Shift (CLS)**: Target `< 0.05`
- **Time to First Byte (TTFB)**: Target `< 200ms`

Telemetry beacons are transmitted via `navigator.sendBeacon` to `/api/telemetry/vitals` or third-party analytics (PostHog) strictly after user consent.
