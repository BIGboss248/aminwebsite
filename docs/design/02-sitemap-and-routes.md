# Sitemap, Information Architecture & Route Matrix

**Document Version:** 1.0  
**Status:** Approved  
**Companion Code:** [`lib/routes.ts`](file:///d:/Scripts/aminwebsite/lib/routes.ts)

---

## 1. Information Architecture & Sitemap Tree

```text
/ (Home)
├── /about                    # Background, philosophy, systems experience, verified credentials
├── /projects                 # Case studies and production systems archive
│   └── /projects/[slug]      # Deep-dive case study analysis (architecture, performance, metrics)
├── /resume                   # Interactive CV, academic publications (DOIs), certifications
├── /lab                      # Interactive systems engineering diagnostics hub
│   ├── /lab/doh              # DoH Prober (multi-resolver latency & censorship benchmark)
│   ├── /lab/ipinfo           # IP & Identity Leak Vector detector (WebRTC, DNS, timezone)
│   └── /lab/fingerprint      # Client device fingerprinting inspector (Canvas, WebGL, Audio)
├── /contact                  # Contact channels, PGP key, secure inquiry form
└── /api                      # Edge and Node.js Route Handlers
    ├── /api/health           # Container liveness & readiness probe (heap, event loop, DB)
    ├── /api/telemetry/vitals # Web Vitals beacon ingestion
    └── /api/contact          # Form submission handler with honeypot & rate-limiting
```

---

## 2. Next.js Route Rendering Matrix

| Route              | Rendering Strategy               | Caching & Invalidation                   | Hydration Scope                                   | Purpose                                            |
| :----------------- | :------------------------------- | :--------------------------------------- | :------------------------------------------------ | :------------------------------------------------- |
| `/` (Home)         | **SSG** (Static Site Gen)        | Static at build; cached on CDN           | Leaf Client Components (nav, theme toggle)        | Blazing fast first impression (<1s LCP)            |
| `/about`           | **SSG**                          | Static at build                          | Static markup with minimal interaction            | Biography, credentials, technical timeline         |
| `/projects`        | **SSG / ISR**                    | Revalidate on new release or MDX push    | Filter tabs, search state                         | Grid of case studies with tech stack tags          |
| `/projects/[slug]` | **SSG** (`generateStaticParams`) | Pre-rendered at build time               | Code block copy buttons, image zoom               | Long-form technical breakdown & architecture diffs |
| `/resume`          | **SSG**                          | Static at build                          | Print / PDF trigger, BibTeX copy buttons          | Interactive resume & academic publications         |
| `/lab`             | **SSG**                          | Static layout                            | Diagnostic card triggers                          | Launchpad for engineering tools                    |
| `/lab/doh`         | **CSR** (Client-Side Rendering)  | `dynamic = 'force-static'` layout shell  | Full client interactivity (fetch DoH endpoints)   | Live browser-side DNS queries and latency charts   |
| `/lab/ipinfo`      | **Hybrid (SSR + CSR)**           | Dynamic request context                  | WebRTC socket detection, IP geolocation map       | Server extracts headers, client tests WebRTC leaks |
| `/lab/fingerprint` | **CSR**                          | Client-only calculation                  | Canvas / WebGL canvas rendering, hash display     | Deterministic browser signature generation         |
| `/contact`         | **SSG**                          | Static page shell                        | Form validation state (`react-hook-form` + `zod`) | Direct contact inquiry interface                   |
| `/api/health`      | **Dynamic SSR**                  | `export const dynamic = 'force-dynamic'` | Pure JSON response                                | Kubernetes / Docker health check probe             |
| `/api/contact`     | **Dynamic SSR**                  | Server function or POST handler          | Pure JSON response                                | Validates and dispatches contact emails            |

---

## 3. Page Section Hierarchy

### 3.1 Home Page (`/`)

1. **Site Header**: Sticky navigation, logo mark, locale selector (`EN` / `FA`), theme switcher (Dark/Light).
2. **Hero Section**:
   - High-impact headline: Systems Architecture & Full-Stack Engineering.
   - Status badge: "Available for select consulting & engineering roles".
   - Primary CTA ("View Case Studies") & Secondary CTA ("Explore Lab Tools").
   - Quick terminal/code snippet showing architecture highlights.
3. **Trust Signals & Credentials Bar**:
   - Peer-reviewed research DOIs, ORCID link, cloud certifications.
4. **Featured Case Studies Grid**:
   - Top 2-3 deep-dive projects showing problem, solution, and verifiable metric improvements (e.g. "99.8% cache hit ratio", "58% reduction in LCP").
5. **Interactive Lab Showcase**:
   - Live mini-widget showcasing DoH prober or identity diagnostic.
6. **Core Competencies & Technology Matrix**:
   - Categorized skills: Next.js/React, TypeScript, Go/Python, Docker/Linux, Distributed Systems.
7. **Contact Callout**:
   - Clear conversion point to initiate discussions.
8. **Site Footer**:
   - Centralized author information from `lib/site-config.ts`, copyright, social links, RSS/sitemap links.

### 3.2 Case Study Detail Page (`/projects/[slug]`)

1. **Case Study Header**: Project title, time horizon, client/domain, and deployed live link.
2. **Key Metric Badges**: Performance, scalability, and delivery milestones.
3. **Problem & Context Statement**: Architectural constraints and baseline conditions.
4. **Architecture Diagram**: System flow and component boundaries.
5. **Engineering Implementation Deep-Dive**: Technical decisions, trade-offs, and code patterns.
6. **Verifiable Results**: Lighthouse audit comparisons and business outcomes.
7. **Next Case Study Navigation**: Previous / Next project links.

### 3.3 Interactive Lab Pages (`/lab/*`)

1. **Tool Header**: Diagnostic title, explanation of the security/networking mechanism, and methodology.
2. **Action Controller**: "Run Test" trigger, configuration toggles (e.g. select custom DNS resolver, toggle WebRTC leak test).
3. **Live Output Console / Visualizer**:
   - Real-time progress bar, latency bar charts, status badges (Secure, Leaked, Blocked).
4. **Detailed Technical Report**:
   - Raw payload view, explanation of detected vectors, mitigation recommendations.
5. **JSON Export / Copy Link**: Allows users to share their test results or embed them.
