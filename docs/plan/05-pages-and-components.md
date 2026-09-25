# Phase 5: Pages & Component Implementation Checklists

> [!IMPORTANT]
> **Single Canonical Source of Truth**: This document contains the full inventory of application pages, sections, child components, and mandatory page-level infrastructure/SEO files.
> **Unique Design Principle**: Components are designed uniquely for each page and section without being forced into rigid pre-made templates.
> **Mandatory Page Infrastructure & SEO Tasks**: For EVERY page, the agent must check and implement:
> 1. `page.tsx` (Page view & layout assembly)
> 2. `loading.tsx` (Route streaming skeleton fallback)
> 3. `error.tsx` (Nested route error boundary)
> 4. `generateMetadata` / `metadata` (Localized title, description, OpenGraph & Twitter cards)
> 5. `JSON-LD Schema` (Structured data for search crawlers)
> 6. `generateStaticParams()` (Static route parameters for dynamic/localized routes)
> **Page Completion Rule**: A page checklist item is ticked off (`- [x]`) **IF AND ONLY WHEN all of its individual component sub-checklist items and page infrastructure/SEO tasks are completed**.

---

## Canonical Page & Component Inventory

- [x] **Page: Home (`/[locale]`)**
  - [x] **Page Infrastructure & SEO**
    - [x] `page.tsx` - Root localized page component and layout assembly
    - [x] `loading.tsx` - Streaming loading skeleton fallback
    - [x] `error.tsx` - Localized route error boundary
    - [x] `generateMetadata` - Localized page title, description, and OpenGraph metadata
    - [x] `JSON-LD Schema` - Structured data (`WebSite` / `Person`)
    - [x] `generateStaticParams()` - Static locale parameters generation
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
  - [x] **Section: Competencies & Tech Matrix**
    - [x] `TechStackMatrix` - Categorized competency tags (Next.js, TypeScript, Go, Docker)
    - [x] `SkillBadge` - Interactive skill tag with experience context
  - [x] **Section: Global Footer**
    - [x] `SiteFooter` - Author bio, contact links, copyright, and social links
    - [x] `SocialLinksBar` - GitHub, LinkedIn, ORCID, Twitter/X links

- [x] **Page: About / Digital Resume (`/[locale]/about`)**
  - [x] **Page Infrastructure & SEO**
    - [x] `page.tsx` - About page view and layout assembly
    - [x] `loading.tsx` - Streaming loading skeleton fallback
    - [x] `error.tsx` - Route error boundary
    - [x] `generateMetadata` - Localized title, description, and OpenGraph/Twitter cards
    - [x] `JSON-LD Schema` - Structured data (`ProfilePage` / `Person`)
    - [x] `generateStaticParams()` - Static locale params generation
  - [x] **Section: Narrative Biography**
    - [x] `AboutHero` - Headline, author portrait/graphic, and core engineering philosophy
    - [x] `BioStory` - In-depth professional story and systems architecture journey
  - [x] **Section: Engineering Philosophy & Architecture Principles**
    - [x] `PhilosophyCards` - Modular principles (Reliability, Zero-Compromise Performance, Deep Systems Competence)
  - [x] **Section: Experience & Education Timeline**
    - [x] `ExperienceTimeline` - Chronological career and education milestones
    - [x] `TimelineItem` - Expandable role card with key impact deliverables
  - [x] **Section: Academic & Research Credentials**
    - [x] `ResearchPublicationList` - Peer-reviewed publications list with permanent DOI links
    - [x] `DoiBadge` - Verified DOI token and BibTeX citation modal
    - [x] `OrcidVerificationCard` - Live ORCID profile integration card
  - [x] **Section: Beyond Code & Community**
    - [x] `PersonalInterestsGrid` - Open-source contributions, technical reading, and community engagement

- [ ] **Page: Projects / Case Studies Archive (`/[locale]/projects`)**
  - [ ] **Page Infrastructure & SEO**
    - [ ] `page.tsx` - Projects archive view and layout assembly
    - [ ] `loading.tsx` - Streaming loading skeleton fallback
    - [ ] `error.tsx` - Route error boundary
    - [ ] `generateMetadata` - Localized title, description, and OpenGraph/Twitter cards
    - [ ] `JSON-LD Schema` - Structured data (`CollectionPage`)
    - [ ] `generateStaticParams()` - Static locale params generation
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

- [ ] **Page: Case Study Detail (`/[locale]/projects/[slug]`)**
  - [ ] **Page Infrastructure & SEO**
    - [ ] `page.tsx` - Case study detail view and MDX renderer
    - [ ] `loading.tsx` - Streaming loading skeleton fallback
    - [ ] `error.tsx` - Route error boundary
    - [ ] `generateMetadata` - Dynamic case study title, description, and OpenGraph image
    - [ ] `JSON-LD Schema` - Structured data (`TechArticle` / `Article`)
    - [ ] `generateStaticParams()` - Static paths generation for all slug & locale permutations
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

- [ ] **Page: Interactive Lab Hub (`/[locale]/lab`)**
  - [ ] **Page Infrastructure & SEO**
    - [ ] `page.tsx` - Lab hub view and layout assembly
    - [ ] `loading.tsx` - Streaming loading skeleton fallback
    - [ ] `error.tsx` - Route error boundary
    - [ ] `generateMetadata` - Localized title, description, and OpenGraph tags
    - [ ] `JSON-LD Schema` - Structured data (`SoftwareApplication`)
    - [ ] `generateStaticParams()` - Static locale params generation
  - [ ] **Section: Lab Hub Header**
    - [ ] `LabHero` - Developer cockpit introduction and privacy/censorship diagnostic mission
    - [ ] `PrivacyGuaranteeBanner` - Notice explaining all tests execute client-side with zero PII logging
  - [ ] **Section: Diagnostic Tools Catalog**
    - [ ] `LabToolGrid` - Grid of interactive utilities
    - [ ] `LabToolCard` - Detailed tool card with protocol badges, execution requirements, and direct launch action

- [ ] **Page: Lab - DNS over HTTPS (DoH) Prober (`/[locale]/lab/doh`)**
  - [ ] **Page Infrastructure & SEO**
    - [ ] `page.tsx` - DoH prober client tool view
    - [ ] `loading.tsx` - Skeleton loader
    - [ ] `error.tsx` - Error boundary
    - [ ] `generateMetadata` - Tool-specific title & description
    - [ ] `generateStaticParams()` - Static locale params generation
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

- [ ] **Page: Lab - IP & Identity Leak Scanner (`/[locale]/lab/ipinfo`)**
  - [ ] **Page Infrastructure & SEO**
    - [ ] `page.tsx` - IP leak scanner view
    - [ ] `loading.tsx` - Skeleton loader
    - [ ] `error.tsx` - Error boundary
    - [ ] `generateMetadata` - Tool-specific title & description
    - [ ] `generateStaticParams()` - Static locale params generation
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

- [ ] **Page: Lab - Client Device Fingerprint Inspector (`/[locale]/lab/fingerprint`)**
  - [ ] **Page Infrastructure & SEO**
    - [ ] `page.tsx` - Fingerprint inspector view
    - [ ] `loading.tsx` - Skeleton loader
    - [ ] `error.tsx` - Error boundary
    - [ ] `generateMetadata` - Tool-specific title & description
    - [ ] `generateStaticParams()` - Static locale params generation
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

- [x] **Page: Contact & Socials (`/[locale]/contact`)**
  - [x] **Page Infrastructure & SEO**
    - [x] `page.tsx` - Contact page view and layout assembly
    - [x] `loading.tsx` - Streaming loading skeleton fallback
    - [x] `error.tsx` - Route error boundary
    - [x] `generateMetadata` - Localized title, description, and OpenGraph tags
    - [x] `JSON-LD Schema` - Structured data (`ContactPage`)
    - [x] `generateStaticParams()` - Static locale params generation
  - [x] **Section: Simple Contact Form**
    - [x] `ContactForm` - Clean form with Full Name, Email Address, Subject, and Message inputs
  - [x] **Section: Socials Showcase Block**
    - [x] `SocialsBlock` - Showcase cards linking to LinkedIn, GitHub, and ORCID profiles

- [ ] **Page: System & Error Pages**
  - [ ] **Section: 404 Not Found (`not-found.tsx` / `[locale]/not-found.tsx`)**
    - [ ] `NotFoundHero` - Branded creative 404 headline with developer easter egg
    - [ ] `RecoveryNavigation` - Quick recovery links back to Home, Projects, Lab, and Contact
    - [ ] `InteractiveTerminalEasterEgg` - Interactive terminal allowing commands (`help`, `ls`, `cat bio`, `home`)
  - [ ] **Section: Global Error Boundary (`error.tsx` / `global-error.tsx`)**
    - [ ] `ErrorDisplayCard` - Polite, privacy-conscious error notice without leaking stack traces
    - [ ] `ResetErrorBoundaryButton` - Retry button calling `reset()`
    - [ ] `ReportBugLink` - Direct link to file an issue with anonymized error context
