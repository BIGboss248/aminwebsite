---
name: nextjs-otel
description: Automated workflow and engineering standards for configuring, testing, and verifying OpenTelemetry (OTel) observability in Next.js App Router applications. Covers @vercel/otel setup, standard OTEL_SDK_DISABLED kill switch, onRequestError hook, mock OTLP collector verification harness, and structured verification reporting. Triggers on "/nextjs-otel", "setup otel", "configure opentelemetry", "test otel", or "verify opentelemetry".
metadata:
  author: BIGboss248
  version: "1.0"
---

# Next.js OpenTelemetry Observability Skill (`nextjs-otel`)

This skill defines the standard engineering workflow for setting up OpenTelemetry tracing in Next.js App Router projects, standardizing on a single kill switch, safeguarding against `@vercel/otel` initialization bugs, automatically verifying trace dispatch with a mock collector, and generating a verification report.

---

## 1. Architectural Standards & Rules

1. **Single Kill Switch Discipline**:
   - Standardize exclusively on `OTEL_SDK_DISABLED` (`true` disables OTel, `false` or empty enables).
   - Never introduce secondary custom toggles like `OTEL_ENABLED` to prevent state collision and configuration ambiguity.
2. **The `@vercel/otel` String Truthiness Safeguard**:
   - `@vercel/otel` evaluates `let o = !!t.OTEL_SDK_DISABLED; if (o) return;`. In JavaScript, `Boolean("false")` and `!!"false"` evaluate to `true`.
   - In `instrumentation.ts`, **always delete `process.env.OTEL_SDK_DISABLED`** when it is not strictly `'true'` before calling `registerOTel()`.
3. **Server-Only Scope**:
   - Instrumentation runs on the Node.js / Edge server runtime via `instrumentation.ts`. Never import server telemetry packages into Client Components.
4. **Rich Error Tracking via `onRequestError`**:
   - Implement `onRequestError(err, request, context)` to attach `next.error.digest`, route path, router kind, and HTTP method to active spans.
5. **Discrete Command Execution**:
   - Never chain commands (`&&`, `||`, `;`) when running setup, build, or test scripts. Always execute individual single operations.

---

## 2. Step-by-Step Setup Workflow

### Phase 1: Project Detection & Assessment

1. Inspect `package.json` to confirm Next.js version (App Router) and package manager (`pnpm`, `npm`, `yarn`).
2. Check for existing `instrumentation.ts` or `src/instrumentation.ts`.
3. Verify `experimental.instrumentationHook` (note: in Next.js 15+ and 16+, instrumentation hook is stable and enabled by default).

### Phase 2: Dependency Installation

Install `@vercel/otel` and `@opentelemetry/api`:

```powershell
pnpm add @vercel/otel @opentelemetry/api
```

### Phase 3: Create `instrumentation.ts`

Place in the project root (or `src/` if using `src/` directory):

```typescript
import { registerOTel } from "@vercel/otel";
import { trace, SpanStatusCode } from "@opentelemetry/api";

export interface RequestErrorContext {
  routerKind: "Pages Router" | "App Router";
  routePath: string;
  routeType: "render" | "route" | "action" | "proxy";
  renderSource?:
    | "react-server-components"
    | "react-server-components-payload"
    | "server-rendering";
  revalidateReason?: "on-demand" | "stale" | undefined;
  renderType?: "dynamic" | "dynamic-resume";
}

export interface ErrorRequestInfo {
  path: string;
  method: string;
  headers: Record<string, string | string[] | undefined>;
}

/**
 * Checks if OpenTelemetry should be completely disabled via environment variables.
 * Follows standard OpenTelemetry specification: OTEL_SDK_DISABLED=true disables the SDK.
 */
function isOtelDisabled(): boolean {
  return process.env.OTEL_SDK_DISABLED === "true";
}

export function register() {
  if (isOtelDisabled()) {
    console.log(
      "[OTel] Instrumentation hook skipped (OTEL_SDK_DISABLED=true).",
    );
    return;
  }

  // Workaround for @vercel/otel bug: @vercel/otel checks `!!process.env.OTEL_SDK_DISABLED`,
  // which treats the string "false" as truthy and disables the SDK.
  if (process.env.OTEL_SDK_DISABLED !== "true") {
    delete process.env.OTEL_SDK_DISABLED;
  }

  console.log(
    "[OTel] Initializing OpenTelemetry for service:",
    process.env.OTEL_SERVICE_NAME || "nextjs-app",
  );
  registerOTel({
    serviceName: process.env.OTEL_SERVICE_NAME || "nextjs-app",
  });
}

export async function onRequestError(
  err: unknown,
  request: ErrorRequestInfo,
  context: RequestErrorContext,
): Promise<void> {
  if (isOtelDisabled()) {
    return;
  }

  const span = trace.getActiveSpan();
  if (span) {
    if (err instanceof Error) {
      span.recordException(err);
    } else {
      span.recordException(String(err));
    }

    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: err instanceof Error ? err.message : String(err),
    });

    const digest =
      typeof err === "object" && err !== null && "digest" in err
        ? String((err as { digest?: unknown }).digest)
        : undefined;

    if (digest) span.setAttribute("next.error.digest", digest);
    if (context?.routerKind)
      span.setAttribute("next.error.router_kind", context.routerKind);
    if (context?.routePath)
      span.setAttribute("next.error.route_path", context.routePath);
    if (context?.routeType)
      span.setAttribute("next.error.route_type", context.routeType);
    if (request?.path) span.setAttribute("http.target", request.path);
    if (request?.method) span.setAttribute("http.method", request.method);
  }
}
```

### Phase 4: Environment Configuration

Configure `.env.example` and `.env.local`:

```env
# ==========================================
# OpenTelemetry Configuration
# ==========================================

# Kill Switch: set to 'true' to completely disable OTel, 'false' or empty to enable
OTEL_SDK_DISABLED=false

# Service Name reported to collector
OTEL_SERVICE_NAME=nextjs-app

# Collector OTLP HTTP Endpoint
OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318

# Protocol format (http/json recommended for readable debugging)
OTEL_EXPORTER_OTLP_PROTOCOL=http/json

# Batch schedule flush delay in milliseconds
OTEL_BSP_SCHEDULE_DELAY=1000

# Diagnostic log level (warn/info/debug)
OTEL_LOG_LEVEL=warn
```

---

## 3. Automated Verification & Testing Workflow

When asked to test or verify OpenTelemetry:

### Step 1: Run Mock OTLP Collector Harness

Run an in-memory Node.js collector in the background listening on `http://127.0.0.1:4318`:

```powershell
node -e "const http=require('http'); http.createServer((q,s)=>{let b=''; q.on('data',c=>b+=c); q.on('end',()=>{console.log('[MOCK_COLLECTOR]', q.method, q.url, b.length, 'bytes'); s.writeHead(200,{'Content-Type':'application/json'}); s.end('{}');});}).listen(4318,'127.0.0.1',()=>console.log('[MOCK_COLLECTOR] Ready on port 4318'));"
```

### Step 2: Boot Dev Server & Trigger Requests

Start Next.js dev server:

```powershell
pnpm run dev
```

Send HTTP requests to route pages or API endpoints:

```powershell
curl http://localhost:3000/
```

### Step 3: Verify Traces Arriving

Check collector output:

- Verify `POST /v1/traces` received with >0 bytes.
- Confirm Next.js server outputs `@vercel/otel/otlp: onSuccess 200 OK`.

### Step 4: Verify Kill Switch

Set `OTEL_SDK_DISABLED=true` in environment, run a test request, and verify:

- Next.js logs: `[OTel] Instrumentation hook skipped (OTEL_SDK_DISABLED=true).`
- Collector receives `0` bytes / `0` requests.

---

## 4. Verification Report Format

After completing setup or verification, output a structured Markdown report:

```markdown
# OpenTelemetry Verification Report

## Status Summary

- **OTel Status**: Active / Disabled
- **Service Name**: <configured_service_name>
- **Target Endpoint**: <configured_endpoint>
- **Exporter Protocol**: http/json | http/protobuf

## Verification Results

| Check                   | Expected                 | Actual             | Status |
| :---------------------- | :----------------------- | :----------------- | :----- |
| Initialization Hook     | Registered               | Registered         | PASS   |
| Trace Dispatch (Active) | POST /v1/traces (200 OK) | X batches received | PASS   |
| Kill Switch (Disabled)  | Skipped, 0 traces        | Skipped, 0 traces  | PASS   |
| Type Check              | 0 errors                 | 0 errors           | PASS   |

## Diagnostic Notes

- Any log notices, timing adjustments, or platform-specific behaviors.
```
