# Implementation Plan - Amin Jamali Portfolio & Lab

A comprehensive, chronological checklist tracking all milestones from empty workspace to the current project state and final production release.

---

## Step 1: Design Website & User Experience (Planning, UX & UI)

- [x] **1.1 Planning & Strategy (Project Brief & Discovery)**
  - [x] Establish core purpose, domain model, and entity vocabulary in `CONTEXT.md`
  - [x] Define target audience: engineering leads, systems recruiters, technical clients, and peer developers
  - [x] Define primary goals: building trust through verified credentials, showcasing deep case studies, and demonstrating real-time systems competence
  - [x] Define success criteria & metrics: 95+ Lighthouse scores, sub-second LCP, zero layout shift (CLS), interactive tool responsiveness
  - [x] Analyze industry benchmarks and leading engineering portfolios / diagnostic tools
  - [x] Define product category: Hybrid Personal Portfolio, Interactive Systems Lab, and Digital Credentials Platform
- [ ] **1.2 Structure & Information Architecture (UX & Wireframing)**
  - [x] Map page inventory: Home (`/`), About (`/about`), Projects/Case Studies (`/projects`), Lab Hub (`/lab`), Contact (`/contact`)
  - [x] Map section hierarchy for each page in [`docs/design/02-sitemap-and-routes.md`](file:///d:/Scripts/aminwebsite/docs/design/02-sitemap-and-routes.md):
    - [x] Hero section (value proposition, availability badge, dynamic motion accents)
    - [x] Featured Case Studies showcase (top 2-3 projects with metrics and tech tags)
    - [x] Interactive Lab Tools launcher (DoH Prober, IP Leak Scanner)
    - [x] Trust signals bar (DOIs, ORCID, vendor certifications)
    - [x] Global header (navigation, locale switcher, theme toggle) & comprehensive footer
  - [x] Define rendering strategy per route (SSG for marketing/case studies, SSR for dynamic diagnostics, client-side for lab tools) in [`docs/design/02-sitemap-and-routes.md`](file:///d:/Scripts/aminwebsite/docs/design/02-sitemap-and-routes.md)
  - [ ] Develop wireframes and interaction flows in [`docs/design/wireframes/`](file:///d:/Scripts/aminwebsite/docs/design/wireframes/) (bypassing the blank page via Google Stitch / Figma)
- [ ] **1.3 Visual Identity & UI Design System (UI & Aesthetics)**
  - [x] Formulate core storytelling & emotional message in [`docs/design/03-ui-design-tokens.md`](file:///d:/Scripts/aminwebsite/docs/design/03-ui-design-tokens.md): "Technical clarity, high-precision systems engineering, trustworthy infrastructure"
  - [x] Define color palette & semantic CSS tokens for light and dark themes (OKLCH slate dark canvas, Emerald/Amber status, neutral borders)
  - [x] Select typography & font pairing: Latin sans-serif headings/body paired with `Vazirmatn` for Persian RTL
  - [ ] Design brand logo mark and favicon assets
  - [x] Curate iconography (`lucide-react` with consistent 1.75px stroke) and custom diagram assets in [`docs/design/03-ui-design-tokens.md`](file:///d:/Scripts/aminwebsite/docs/design/03-ui-design-tokens.md)
  - [x] Design reusable UI primitives (Button, Card, Badge, Input, Modal) to centralize styling before code implementation

---

## Step 2: Install Package Manager

- [x] Select and configure package manager (`pnpm@11.22.0` with `pnpm-lock.yaml`)

---

## Step 3: Setup Next.js Environment

- [x] **3.1 Create Next.js App with CLI & Setup Environment**
  - [x] Initialize Next.js 16 App Router project with TypeScript and Tailwind CSS v4
  - [ ] Enable React Compiler (`babel-plugin-react-compiler`) in `next.config.ts` if applicable
  - [ ] Enable Turbopack filesystem cache for dev (`experimental.turbopackFileSystemCacheForDev: true`)
- [x] **3.2 Configure `AGENTS.md` File**
  - [x] Enforce reading `node_modules/next/dist/docs/` as the primary source of truth
  - [x] Document terminal constraints, permission alignment, and self-repair integration
- [x] **3.3 Configure AI MCP Servers & Agent Skills**
  - [x] Configure workspace `mcp.json` (`next-devtools-mcp`, Playwright MCP)
  - [x] Ensure global AGY host MCP configurations
- [x] **3.4 Setup Code Testing**
  - [x] Configure Jest for unit/integration tests (`jest.config.ts`, `jsdom`, React Testing Library)
  - [x] Configure Playwright for end-to-end testing across Chromium, Firefox, and WebKit (`playwright.config.ts`)
  - [x] Set up unified pre-push test script (`pnpm run test:all`)
- [x] **3.5 Setup CI/CD & Production Containerization**
  - [x] Configure multi-stage production Dockerfile (`Dockerfile`, `docker-compose.yml`, `docker-compose.prod.yml`, `.dockerignore`) for standalone output
  - [x] Configure Husky git hooks (`pre-commit`, `pre-push`) with Commitlint conventional commits
  - [x] Configure semantic versioning and release automation in [`docs/operations/release-automation.md`](file:///d:/Scripts/aminwebsite/docs/operations/release-automation.md)

---

## Step 4: Structure Content & Route Registry (Type-Safe Code in `lib/`)

- [x] Create centralized route paths registry (`lib/routes.ts`) with typed paths and dynamic route builders
- [x] Centralize site metadata, author bio, social links, and credentials in a shared configuration file (`lib/site-config.ts`)

---

## Step 5: Health & Log Monitoring

- [x] Configure Docker container liveness probe endpoint (`/api/health` monitoring V8 heap saturation, event loop lag, and process uptime) documented in [`docs/operations/health-and-telemetry.md`](file:///d:/Scripts/aminwebsite/docs/operations/health-and-telemetry.md)
- [ ] Setup server telemetry and distributed tracing via OpenTelemetry (`instrumentation.ts` / `@vercel/otel`)
- [ ] Setup Core Web Vitals (RUM) monitoring component (`useReportWebVitals` / beacon dispatcher)

---

## Step 6: Theme & Color Palette

- [x] Define color palette and semantic theme tokens in `app/globals.css` for both light and dark themes
- [x] Implement theme provider with system preference support and local storage persistence (`ThemeProvider` from `next-themes`)
- [x] Build theme switcher toggle component using Shadcn primitives (`components/theme-toggle.tsx`)

---

## Step 7: Setup Multilanguage Support (i18n)

- [x] Configure request negotiation and routing with `proxy.ts`
- [x] Setup root translation dictionaries in `messages/` (`messages/en.json`, `messages/fa.json`)
- [x] Implement bidirectional layout support (LTR for English, RTL for Persian) and Vazirmatn font
- [ ] Expand translation catalogs to support full case study content, contact forms, and lab utilities
- [ ] Build interactive language switcher component for site header

---

## Step 8: Develop Reusable Components

- [x] Build reusable UI primitives styled with design tokens (`components/ui/button.tsx`)
- [x] Build localized, progress-aware navigation wrapper (`app/components/Link.tsx`)
- [ ] Build foundational UI primitives: `Badge`, `Card`, `Container`, `SectionHeading`, `Input`, `Textarea`, `Modal`
- [ ] Build MDX code block styling components with syntax highlighting for technical case studies

---

## Step 9: Website Layout Shell

- [x] Build root website layout shell (`app/[locale]/layout.tsx`) with dynamic `lang`, `dir`, and font classes
- [x] Wrap application with global context providers in layout (ThemeProvider, RouteProgressBar)
- [ ] Build responsive `SiteHeader` with desktop navigation and mobile drawer
- [ ] Build `SiteFooter` with brand details, trust signals, and quick navigation

---

## Step 10: Environment Variables Configuration

- [x] Setup `.env.local` template for development
- [ ] Explicitly prefix client-exposed variables with `NEXT_PUBLIC_` (e.g. `NEXT_PUBLIC_BASE_URL`)
- [ ] Add Resend API key and PostHog environment configuration

---

## Step 11: Design Website Pages

- [ ] **11.1 Home / Landing Page (`/[locale]`)**
  - [ ] Implement hero section with engineering tagline, status availability badge, and interactive motion accents
  - [ ] Featured Case Studies showcase (top 2-3 projects with metrics and tech stack badges)
  - [ ] Interactive Lab Tools quick launcher section
  - [ ] Trust signals and verified credentials bar (DOIs, ORCID, Certifications)
- [ ] **11.2 Case Studies & Projects (`/[locale]/projects`, `/[locale]/projects/[slug]`)**
  - [ ] Setup static local MDX pipeline with `generateStaticParams()` for case studies
  - [ ] Build projects gallery with category filters (Full-Stack, Systems/Networking, Web Design, Open Source)
  - [ ] Build technical case study page layout (Problem Statement, Architecture, Engineering Challenges, Core Web Vitals metrics)
- [ ] **11.3 Digital Resume & Credentials (`/[locale]/resume` or `/[locale]/about`)**
  - [ ] Interactive career milestones timeline
  - [ ] Peer-reviewed research publications section with permanent DOI links
  - [ ] Downloadable PDF resume action (reference content in [`docs/design/resume.html`](file:///d:/Scripts/aminwebsite/docs/design/resume.html))
  - [ ] Skills matrix (Languages, Frameworks, DevOps, Networking)
- [ ] **11.4 Interactive Diagnostic Lab Suite (`/[locale]/lab`)**
  - [ ] **Stage 1 (MVP)**: Lab directory hub (`/[locale]/lab`)
  - [ ] **Stage 1 (MVP)**: DNS over HTTPS (DoH) Prober (`/[locale]/lab/doh`): resolver benchmark, censorship/poisoning detection, custom query paths
  - [ ] **Stage 1 (MVP)**: Identity Exposure Scanner (`/[locale]/lab/ipinfo`): WebRTC IP leak check, timezone delta test, proxy headers
  - [ ] **Stage 2**: Device Fingerprinting Engine (`/[locale]/lab/fingerprint`): Canvas 2D render hash, WebGL GPU parameters, AudioContext waveform
- [ ] **11.5 Contact & Inquiries (`/[locale]/contact`)**
  - [ ] Multi-intent message inquiry form (Freelance / Full-time / Consultation)
  - [ ] Server Action submission handler with Zod validation
  - [ ] Direct email dispatch integration via Resend
  - [ ] Form submission feedback with toast notifications
- [ ] **11.6 System Error & Loading States**
  - [ ] Custom branded 404 page (`app/[locale]/not-found.tsx`)
  - [ ] Global route error boundary (`app/[locale]/error.tsx`)
  - [ ] Skeleton fallbacks and loading indicators (`loading.tsx` / `<Suspense>`)

---

## Step 12: Design API Routes (if applicable)

- [x] Configure system health monitoring probe (`app/api/health/route.ts`)
- [ ] Implement Server Action mutation handlers for contact form submission (`app/actions/contact.ts`)

---

## Step 13: Configure File-Based Metadata

- [x] Add application favicon (`app/favicon.ico`)
- [ ] Add social sharing preview images (`opengraph-image.png`, `twitter-image.png`)
- [ ] Configure search engine crawler instructions in `app/robots.ts`
- [ ] Generate dynamic XML sitemap in `app/sitemap.ts`
- [ ] Inject structured data (`JSON-LD` for `Person` and `WebSite`) via `schema-dts`

---

## Step 14: Setup 3rd Party Plugins & Integrations

- [ ] Configure PostHog analytics and session recording gated behind user consent policies in [`docs/operations/privacy-and-gdpr.md`](file:///d:/Scripts/aminwebsite/docs/operations/privacy-and-gdpr.md)
- [ ] Configure Sentry exception tracking and error monitoring
- [ ] Configure Resend API integration for email delivery
