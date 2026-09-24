# Implementation Plan Architecture (`docs/plan/`)

This guide explains the modular 7-phase implementation roadmap architecture, the strict Page/Component checklist nesting rules with mandatory page-level infrastructure and SEO files, and how the multi-file plan is organized.

---

## Modular Plan Directory Structure

Rather than outputting a single monolithic plan file, the implementation plan is divided into 7 modular phase documents under `docs/plan/` with a centralized dashboard in `docs/plan/README.md`:

```text
docs/plan/
├── README.md                           # Master Progress Dashboard & Phase Index
├── 01-discovery-and-architecture.md   # Phase 1: Strategy Brief, Sitemap & Route Registries
├── 02-environment-and-cicd.md          # Phase 2: Tooling, Dev Setup, Testing, CI/CD & Docker
├── 03-system-health-probe.md           # Phase 3: Container Liveness/Readiness Probe (/api/health)
├── 04-core-foundations.md              # Phase 4: Env Vars, i18n, Theme Tokens, Layouts & OTel
├── 05-pages-and-components.md          # Phase 5: Canonical Page & Component Checklists (with SEO & support files)
├── 06-server-functions-and-metadata.md # Phase 6: Server Actions, API Routes & Global SEO Metadata
└── 07-integrations-and-release.md      # Phase 7: 3rd Party Integrations & Production Release
```

---

## Chronological Phase Ordering & Rules

### Phase 1: Project Discovery & Route Architecture (`01-discovery-and-architecture.md`)
- Establish project brief, target personas, KPIs, and domain concepts.
- Map full route inventory and rendering strategies (SSG, ISR, SSR, Client).
- Scaffold canonical specifications (`docs/project.json`), type-safe route registry (`lib/routes.ts`), and site configuration (`lib/site-config.ts`).

### Phase 2: Environment, Testing & CI/CD (`02-environment-and-cicd.md`)
- Configure package manager (`pnpm` or `bun`).
- Initialize Next.js App Router workspace with TypeScript, Tailwind CSS, and Turbopack.
- Configure agent documentation (`AGENTS.md`) and global/workspace MCP servers.
- Setup unit testing (Jest/RTL) and E2E testing (Playwright).
- Setup CI/CD, Git pre-push hooks (`pnpm run test:all`), Release Please, and production Dockerfile.

### Phase 3: System Health Monitoring Probe (`03-system-health-probe.md`)
- **Probe Endpoint**: Build `app/api/health/route.ts` checking V8 heap memory saturation, event loop lag, and process uptime.
- **Verification**: Verify automated JSON `200 OK` response and Docker Compose healthcheck probes before configuring core runtime layouts and UI.

### Phase 4: Core Foundations & Runtime Configuration (`04-core-foundations.md`)
- **Environment Variables**: Configure `.env.local`, client prefixes (`NEXT_PUBLIC_`), and dynamic container runtime env loading.
- **Multilanguage Support (i18n)**: Configure `next-intl` (via `proxy.ts` or `middleware.ts`), root `messages/[locale].json` dictionaries, and bidirectional (LTR/RTL) layout support.
- **Theme & Color Palette**: Define semantic CSS tokens in `globals.css`, configure `ThemeProvider` from `next-themes`, and build `ThemeToggle`.
- **Website Layout Shell**: Build root layout (`app/[locale]/layout.tsx`), global providers, responsive header/drawer, footer, and font loading.
- **Health & Telemetry (OTel)**: Configure distributed tracing via OpenTelemetry (`instrumentation.ts` / `@vercel/otel`) and Core Web Vitals RUM.

### Phase 5: Pages & Component Implementation Checklists (`05-pages-and-components.md`)
- **Single Canonical Source of Truth**: Contains all pages, sections, child components, and page-level support files.
- **Unique Design Philosophy**: No constrained pre-made component phase — components are crafted uniquely per page requirements.
- **Mandatory Page Infrastructure & SEO Tasks**: For EVERY page being created, the checklist MUST enforce:
  - `page.tsx` - Main page component and layout view
  - `loading.tsx` - Route streaming loading skeleton fallback
  - `error.tsx` - Nested route error boundary with recovery action
  - `generateMetadata` / `metadata` - Route metadata, title, description, and OpenGraph/Twitter cards
  - `JSON-LD` Schema - Structured data for search engine crawlers (e.g., `Person`, `WebSite`, `Article`)
  - `generateStaticParams()` - Static route parameter generation (if dynamic or localized route)
- **Page Completion Rule**: A page checklist item is ticked off (`- [x]`) **IF AND ONLY WHEN all of its individual component sub-checklist items and page infrastructure/SEO tasks are completed**.

```markdown
- [ ] **Page: Home (`/`)**
  - [ ] **Page Infrastructure & SEO**
    - [ ] `page.tsx` - Page component and layout assembly
    - [ ] `loading.tsx` - Streaming skeleton fallback
    - [ ] `error.tsx` - Route error boundary
    - [ ] `generateMetadata` - Localized page title, description, and OpenGraph tags
    - [ ] `JSON-LD Schema` - Structured data (`WebSite` / `Person`)
    - [ ] `generateStaticParams()` - Static locale params generation
  - [ ] **Section: Hero**
    - [ ] `HeroHeadline` - Core value proposition and intro copy
    - [ ] `AvailabilityBadge` - Contract / full-time status indicator pill
    - [ ] `HeroMotionGraphic` - Animated visual or interactive hero asset
    - [ ] `PrimaryActions` - Call-to-action button group
```

### Phase 6: Server Functions & Global SEO Metadata (`06-server-functions-and-metadata.md`)
- Implement Server Actions (`'use server'`) and custom API handlers (`route.ts`).
- Configure global crawler instructions (`app/robots.ts`) and dynamic XML sitemap (`app/sitemap.ts`).
- Configure application icons (`favicon.ico`, `apple-icon.png`).

### Phase 7: Integrations & Production Release (`07-integrations-and-release.md`)
- Configure 3rd party plugins (analytics with consent gating, error monitoring, email dispatch).
- Run full pre-release verification and trigger production container deployment.
