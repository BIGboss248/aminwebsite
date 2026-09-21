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
- [ ] **1.4 Page & Component Design Checklist (UX Wireframing & Screen Specs)**

  > [!IMPORTANT]
  > **Page Completion Rule**: A page checklist item is ticked off (`- [x]`) **IF AND ONLY WHEN all of its individual component sub-checklist items are designed**.
  - [ ] **Page: Home (`/`)**
    - [x] **Section: Global Navigation / Header**
      - [x] `SiteNavbar` - Brand header with desktop route links
      - [x] `MobileNavDrawer` - Slide-out navigation menu for mobile viewports
      - [x] `LocaleSwitcher` - Language selector dropdown (EN / FA)
      - [x] `ThemeToggle` - Dark / light mode switcher
    - [x] **Section: Hero**
      - [x] `HeroHeadline` - Core value proposition and intro copy
      - [x] `AvailabilityBadge` - Work status indicator pill
      - [x] `HeroMotionGraphic` - Animated systems visual / interactive terminal accent
      - [x] `HeroActionButtons` - Primary CTA (Case Studies) & Secondary CTA (Lab Tools)
    - [x] **Section: Trust Signals & Credentials**
      - [x] `CredentialsBar` - Dual academic degrees, Coursera professional certs, and bilingual fluency in Bento Grid
      - [x] `MetricHighlightList` - Key production performance callouts (<0.8s LCP, 99+ Lighthouse, 0.00 CLS)
    - [x] **Section: Featured Case Studies**
      - [x] `FeaturedProjectsGrid` - Responsive card container for top 2-3 engineering projects
      - [x] `ProjectCard` - Showcase card with visual preview, tech stack tags, and metric improvements
    - [x] **Section: Interactive Lab Tools Launcher**
      - [x] `LabLauncherSection` - Interactive launcher container
      - [x] `ToolQuickCard` - Quick diagnostic tool card with live status indicator & prober launch trigger
    - [ ] **Section: Competencies & Tech Matrix**
      - [ ] `TechStackMatrix` - Categorized competency tags (Next.js, TypeScript, Go, Docker)
      - [ ] `SkillBadge` - Interactive skill tag with experience context
    - [ ] **Section: Global Footer**
      - [x] `SiteFooter` - Author bio, contact links, copyright, and social links
      - [x] `SocialLinksBar` - GitHub, LinkedIn, ORCID, Twitter/X links

  - [ ] **Page: About (`/about`)**
    - [ ] **Section: Narrative Biography**
      - [ ] `AboutHero` - Headline, author portrait/graphic, and core engineering philosophy
      - [ ] `BioStory` - In-depth professional story and systems architecture journey
    - [ ] **Section: Engineering Philosophy & Architecture Principles**
      - [ ] `PhilosophyCards` - Modular principles (Reliability, Zero-Compromise Performance, Deep Systems Competence)
    - [ ] **Section: Experience & Education Timeline**
      - [ ] `ExperienceTimeline` - Chronological career and education milestones
      - [ ] `TimelineItem` - Expandable role card with key impact deliverables
    - [ ] **Section: Academic & Research Credentials**
      - [ ] `ResearchPublicationList` - Peer-reviewed publications list with permanent DOI links
      - [ ] `DoiBadge` - Verified DOI token and BibTeX citation modal
      - [ ] `OrcidVerificationCard` - Live ORCID profile integration card
    - [ ] **Section: Beyond Code & Community**
      - [ ] `PersonalInterestsGrid` - Open-source contributions, technical reading, and community engagement

  - [ ] **Page: Projects / Case Studies Archive (`/projects`)**
    - [ ] **Section: Header & Value Intro**
      - [ ] `ProjectsHero` - Archive introduction and filter summary
    - [ ] **Section: Category Filter & Search Bar**
      - [ ] `ProjectFilterTabs` - Interactive tabs (All, Full-Stack, Systems/Networking, Web Design, Open Source)
      - [ ] `ProjectSearchBar` - Real-time keyword filter for case studies
    - [ ] **Section: Projects Showcase Grid**
      - [ ] `ProjectArchiveGrid` - Comprehensive responsive grid
      - [ ] `CaseStudyCard` - High-density project card with metrics, architecture tags, and live links
    - [ ] **Section: Open Source & Repositories**
      - [ ] `OpenSourceShowcase` - GitHub open-source repositories and utility tools
      - [ ] `GithubRepoCard` - Real-time star count, language badge, and repo link

  - [ ] **Page: Case Study Detail (`/projects/[slug]`)**
    - [ ] **Section: Case Study Header & Metrics**
      - [ ] `CaseStudyHero` - Title, time horizon, client domain, and deployed live preview link
      - [ ] `MetricBadgeRow` - Highlighted production impact metrics (cache hits, latency drops)
    - [ ] **Section: Problem Statement & Architecture**
      - [ ] `ProblemStatementBlock` - Background context, constraints, and requirements
      - [ ] `ArchitectureDiagramViewer` - Interactive system architecture diagram with component boundaries
    - [ ] **Section: Engineering Deep-Dive & Trade-offs**
      - [ ] `TechnicalWalkthrough` - Code patterns, data flow, and concurrency mechanics
      - [ ] `CodeBlockWithCopy` - Syntax-highlighted code viewer with copy button
      - [ ] `TradeoffMatrix` - Table of architectural decisions, pros, cons, and alternatives considered
    - [ ] **Section: Verifiable Results & Performance**
      - [ ] `BenchmarkComparison` - Before-and-after performance benchmarks
      - [ ] `LighthouseScoreCard` - Live or recorded Lighthouse audit breakdown (Performance, Accessibility, SEO)
    - [ ] **Section: Navigation & Next Case Study**
      - [ ] `PrevNextProjectNav` - Links to adjacent case studies

  - [ ] **Page: Interactive Lab Hub (`/lab`)**
    - [ ] **Section: Lab Hub Header**
      - [ ] `LabHero` - Developer cockpit introduction and privacy/censorship diagnostic mission
      - [ ] `PrivacyGuaranteeBanner` - Notice explaining all tests execute client-side with zero PII logging
    - [ ] **Section: Diagnostic Tools Catalog**
      - [ ] `LabToolGrid` - Grid of interactive utilities
      - [ ] `LabToolCard` - Detailed tool card with protocol badges, execution requirements, and direct launch action

  - [ ] **Page: Lab - DNS over HTTPS (DoH) Prober (`/lab/doh`)**
    - [ ] **Section: Tool Header & Methodology**
      - [ ] `DohToolHeader` - Title, protocol explanation, and censorship detection mechanics
      - [ ] `DohMethodologyTooltip` - Explainer on DNS poisoning, query paths, and resolver differences
    - [ ] **Section: Query Controller**
      - [ ] `ResolverSelector` - Resolver tabs (Cloudflare, Google, Quad9, Custom endpoint)
      - [ ] `DomainQueryInput` - Input bar with auto-fill domain chips
      - [ ] `RecordTypeSelector` - Record type toggle chips (A, AAAA, CNAME, MX, TXT)
      - [ ] `ExecuteQueryButton` - Primary execute button with loading spinner & batch query toggle
    - [ ] **Section: Diagnostic Console & Output**
      - [ ] `DohLatencyGraph` - Real-time horizontal bar comparison of resolver latencies
      - [ ] `DohResponseTerminal` - Dark terminal with JSON/raw DNS wire answers
      - [ ] `CensorshipIndicatorBadge` - Visual status badge (Secure, Poisoned, Blocked, Timeout)
    - [ ] **Section: Export & Sharing**
      - [ ] `ExportDohResultsButton` - Copy JSON / Shareable benchmark URL

  - [ ] **Page: Lab - IP & Identity Leak Scanner (`/lab/ipinfo`)**
    - [ ] **Section: Scanner Header**
      - [ ] `IpScanHeader` - Real-time identity diagnostic title and explanation
    - [ ] **Section: Leak Detection Grid**
      - [ ] `PublicIpCard` - Public IPv4/IPv6, ISP, ASN, and organization details
      - [ ] `WebRtcLeakCard` - STUN/TURN server leak probe checking for local/private IP exposure
      - [ ] `DnsLeakCard` - Transparent DNS resolver leak detector
      - [ ] `TimezoneMismatchCard` - System clock vs IP geolocation timezone alignment check
    - [ ] **Section: Geolocation Map & Routing**
      - [ ] `GeoLocationMap` - Client-rendered map showing detected physical location coordinates
    - [ ] **Section: Mitigation Guidance**
      - [ ] `LeakMitigationAdvice` - Actionable advice for hardening proxy and VPN tunnels

  - [ ] **Page: Lab - Client Device Fingerprint Inspector (`/lab/fingerprint`)**
    - [ ] **Section: Fingerprint Header**
      - [ ] `FingerprintHeader` - Entropy score overview and hardware tracking explainer
    - [ ] **Section: Canvas & GPU Signatures**
      - [ ] `CanvasRendererCard` - Hidden 2D canvas drawing and hash generation visualizer
      - [ ] `GpuHashDisplay` - WebGL unmasked renderer, vendor string, and shader precision
    - [ ] **Section: Audio & Hardware Parameters**
      - [ ] `AudioWaveformVisualizer` - AudioContext oscillator waveform hash
      - [ ] `HardwareProfileTable` - CPU logical cores, device memory, screen resolution, color depth
    - [ ] **Section: Master Hash & Entropy Analysis**
      - [ ] `FingerprintHashCard` - Deterministic master fingerprint hash with copy button and entropy breakdown

  - [ ] **Page: Contact & Booking (`/contact`)**
    - [ ] **Section: Contact Intro & Direct Channels**
      - [ ] `ContactHero` - Direct inquiry value proposition and response time guarantee (<24h)
      - [ ] `DirectEmailCard` - Direct email with one-click copy and PGP public key link
      - [ ] `PgpKeyDownloadCard` - Verified PGP key fingerprint and `.asc` download button
    - [ ] **Section: Smart Inquiry Form**
      - [ ] `ContactInquiryForm` - Type-safe form with honeypot and rate-limiting feedback
      - [ ] `IntentSelector` - Radio/chip selector (Consulting/Architecture, Full-Time Role, Project, Security/Diagnostic Inquiry)
      - [ ] `FormSubmitButton` - Submit button with loading state and localized confirmation feedback
    - [ ] **Section: Calendar Booking Integration**
      - [ ] `CalendarBookingWidget` - Direct 15-minute introductory call scheduler embed / link

  - [ ] **Page: System & Error Pages**
    - [ ] **Section: 404 Not Found (`not-found.tsx`)**
      - [ ] `NotFoundHero` - Branded creative 404 headline with developer easter egg
      - [ ] `RecoveryNavigation` - Quick recovery links back to Home, Projects, Lab, and Contact
      - [ ] `InteractiveTerminalEasterEgg` - Interactive terminal allowing commands (`help`, `ls`, `cat bio`, `home`)
    - [ ] **Section: Global Error Boundary (`error.tsx` / `global-error.tsx`)**
      - [ ] `ErrorDisplayCard` - Polite, privacy-conscious error notice without leaking stack traces
      - [ ] `ResetErrorBoundaryButton` - Retry button calling `reset()`
      - [ ] `ReportBugLink` - Direct link to file an issue with anonymized error context

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
