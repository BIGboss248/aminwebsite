# Privacy, Compliance & Data Governance

**Document Version:** 1.0  
**Status:** Active  
**Compliance Scope:** GDPR, ePrivacy Directive, User Consent Lifecycle, and Log Redaction

---

## 1. Principles & Data Minimization

The application adheres to strict data minimization principles across all user interactions, analytics collection, and server logging:

1. **Zero Unconsented Tracking**: Analytics cookies and session recording scripts are blocked by default until explicit consent is granted.
2. **Local Processing in Diagnostic Lab**: Security and diagnostic tools (`/lab/*`) run calculations and network checks client-side whenever possible without persisting sensitive network information or client IPs.
3. **No Third-Party Ad Networks**: The platform contains no advertising trackers or behavioral cross-site retargeting scripts.

---

## 2. Consent Management Lifecycle

### 2.1 Consent Categories

| Category                    | Storage Key             | Default State   | Purpose                                                   |
| :-------------------------- | :---------------------- | :-------------- | :-------------------------------------------------------- |
| **Strictly Necessary**      | `app-consent:necessary` | `always_active` | Theme preferences, locale selection, CSRF security tokens |
| **Telemetry & Performance** | `app-consent:analytics` | `denied`        | Core Web Vitals RUM metrics and aggregate page views      |
| **Session Diagnostics**     | `app-consent:session`   | `denied`        | Diagnostic replay and error recording (PostHog/Sentry)    |

### 2.2 Dynamic Gating

Context providers and third-party SDKs check consent state before initializing. Changing consent from the footer or settings panel immediately tears down active recording instances and deletes associated local storage keys.

---

## 3. Server Logging & PII Scrubbing

To prevent Personally Identifiable Information (PII) from leaking into server logs, container stdout, or external tracing collectors:

### 3.1 Automatic Redaction Rules

- **IP Addresses**: Anonymized or masked to `/24` (IPv4) or `/48` (IPv6) in web telemetry.
- **Form Submissions**: Form payloads on contact/inquiry routes redact sensitive contact fields (`email`, `phone`, `body`) before logging metadata (e.g. `{ action: "contact_submit", status: "success", intent: "freelance" }`).
- **Authorization & Tokens**: Request headers matching `Authorization`, `Cookie`, `Set-Cookie`, and custom secrets are stripped from trace spans.

### 3.2 Log Retention & Archival

- **Ephemeral Container Logs**: Rotated after 7 days or 100MB per container volume.
- **Diagnostic Traces**: Retained for a maximum of 14 days in telemetry stores before automated purging.
