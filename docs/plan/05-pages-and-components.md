# Phase 5: Pages & Component Implementation Checklists

> [!IMPORTANT]
> **Single Canonical Source of Truth**: This document contains the full inventory of application pages, sections, child components, and mandatory page-level infrastructure/SEO files.
> **Unique Design Principle**: Components are designed uniquely for each page and section without being forced into rigid pre-made templates.
> **Mandatory Page Infrastructure & SEO Tasks**: For EVERY page, the agent must check and implement:
>
> 1. `page.tsx` (Page view & layout assembly)
> 2. `loading.tsx` (Route streaming skeleton fallback)
> 3. `error.tsx` (Nested route error boundary)
> 4. `generateMetadata` / `metadata` (Localized title, description, OpenGraph & Twitter cards)
> 5. `JSON-LD Schema` (Structured data for search crawlers)
> 6. `generateStaticParams()` (Static route parameters for dynamic/localized routes)
>    **Page Completion Rule**: A page checklist item is ticked off (`- [x]`) **IF AND ONLY WHEN all of its individual component sub-checklist items and page infrastructure/SEO tasks are completed**.

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

- [x] **Page: Projects / Case Studies Archive (`/[locale]/projects`)**
  - [x] **Page Infrastructure & SEO**
    - [x] `page.tsx` - Projects archive view and layout assembly
    - [x] `loading.tsx` - Streaming loading skeleton fallback
    - [x] `error.tsx` - Route error boundary
    - [x] `generateMetadata` - Localized title, description, and OpenGraph/Twitter cards
    - [x] `JSON-LD Schema` - Structured data (`CollectionPage`)
    - [x] `generateStaticParams()` - Static locale params generation
  - [x] **Section: Header & Value Intro**
    - [x] `ProjectsHero` - Archive introduction and filter summary
  - [x] **Section: Category Filter & Search Bar**
    - [x] `ProjectFilterTabs` - Interactive tabs (All, Full-Stack / E-Commerce, Systems & Automation, Financial AI & BI, Academic Research)
    - [x] `ProjectSearchBar` - Real-time keyword filter for case studies
  - [x] **Section: Projects Showcase Grid (Resume Case Studies)**
    - [x] `ProjectArchiveGrid` - Comprehensive responsive grid
    - [x] `CaseStudyCard` - High-density project card with metrics, architecture tags, and direct external deliverable links (live deployments, GitHub repositories, and DOI publications)
    - [x] **Deliverable 1: Setayesh Parts** - Commercial & E-Commerce Web Platform (Deployment: `https://setayesh.aminjamali.site/`, GitHub: `https://github.com/BIGboss248/setayeshparts`)
    - [x] **Deliverable 2: Bahar Trade Co. Web Platform** - Enterprise Corporate Web & CMS Engine (Deployment: `https://bahartradeco.com/en`)
    - [x] **Deliverable 3: ParsBERT-XGBoost Commodity Volatility Model** - Hybrid Persian NLP & Financial Sentiment Forecasting (DOI: `10.61838/jafci.485`)
    - [x] **Deliverable 4: DQN & LSTM Volatility Analysis Engine** - Reinforcement Learning & Volatility System (DOI: `10.61838/bmfopen.545`)
    - [x] **Deliverable 5: Bahar Trade IT Automation and Infrastructure Management** - Enterprise Linux Server Automation, Active Directory Management & IT Administration (DOI: `10.61838/msesj.477`)
  - [x] **Section: Open Source & Repositories**
    - [x] `OpenSourceShowcase` - GitHub open-source repositories and utility tools
    - [x] `GithubRepoCard` - Real-time star count, language badge, and repo link

- [x] **Page: Interactive Lab Hub (`/[locale]/lab`)**
  - [x] **Page Infrastructure & SEO**
    - [x] `page.tsx` - Lab hub view and layout assembly
    - [x] `loading.tsx` - Streaming loading skeleton fallback
    - [x] `error.tsx` - Route error boundary
    - [x] `generateMetadata` - Localized title, description, and OpenGraph tags
    - [x] `JSON-LD Schema` - Structured data (`SoftwareApplication`)
    - [x] `generateStaticParams()` - Static locale params generation
  - [x] **Section: Lab Hub Header**
    - [x] `LabHero` - Developer cockpit introduction and privacy/censorship diagnostic mission
    - [x] `PrivacyGuaranteeBanner` - Notice explaining all tests execute client-side with zero PII logging
  - [x] **Section: Diagnostic Tools Catalog**
    - [x] `LabToolGrid` - Grid of interactive utilities
    - [x] `LabToolCard` - Detailed tool card with protocol badges, execution requirements, and direct launch action

- [x] **Page: Lab - DNS over HTTPS (DoH) Prober (`/[locale]/lab/doh`)**
  - [x] **Page Infrastructure & SEO**
    - [x] `page.tsx` - DoH prober client tool view
    - [x] `loading.tsx` - Skeleton loader
    - [x] `error.tsx` - Error boundary
    - [x] `generateMetadata` - Tool-specific title & description
    - [x] `generateStaticParams()` - Static locale params generation
  - [x] **Section: Tool Header & Methodology**
    - [x] `DohToolHeader` - Title, protocol explanation, and censorship detection mechanics
    - [x] `DohMethodologyTooltip` - Explainer on DNS poisoning, query paths, and resolver differences
  - [x] **Section: Query Controller**
    - [x] `ResolverSelector` - Resolver tabs (Cloudflare, Google, Quad9, Custom endpoint)
    - [x] `DomainQueryInput` - Input bar with auto-fill domain chips
    - [x] `RecordTypeSelector` - Record type toggle chips (A, AAAA, CNAME, MX, TXT)
    - [x] `ExecuteQueryButton` - Primary execute button with loading spinner & batch query toggle
  - [x] **Section: Diagnostic Console & Output**
    - [x] `DohLatencyGraph` - Real-time horizontal bar comparison of resolver latencies
    - [x] `DohResponseTerminal` - Dark terminal with JSON/raw DNS wire answers
    - [x] `CensorshipIndicatorBadge` - Visual status badge (Secure, Poisoned, Blocked, Timeout)
  - [x] **Section: Export & Sharing**
    - [x] `ExportDohResultsButton` - Copy JSON / Shareable benchmark URL

- [x] **Page: Lab - IP & Identity Leak Scanner (`/[locale]/lab/ipinfo`)**
  - [x] **Page Infrastructure & SEO**
    - [x] `page.tsx` - IP leak scanner view
    - [x] `loading.tsx` - Skeleton loader
    - [x] `error.tsx` - Error boundary
    - [x] `generateMetadata` - Tool-specific title & description
    - [x] `generateStaticParams()` - Static locale params generation
  - [x] **Section: Scanner Header**
    - [x] `IpScanHeader` - Real-time identity diagnostic title and explanation
  - [x] **Section: Leak Detection Grid**
    - [x] `PublicIpCard` - Public IPv4/IPv6, ISP, ASN, and organization details
    - [x] `WebRtcLeakCard` - STUN/TURN server leak probe checking for local/private IP exposure
    - [x] `DnsLeakCard` - Transparent DNS resolver leak detector
    - [x] `TimezoneMismatchCard` - System clock vs IP geolocation timezone alignment check
  - [x] **Section: Geolocation Map & Routing**
    - [x] `GeoLocationMap` - Client-rendered map showing detected physical location coordinates
  - [x] **Section: Mitigation Guidance**
    - [x] `LeakMitigationAdvice` - Actionable advice for hardening proxy and VPN tunnels

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

- [ ] **Page: Single-Page Website (`/[locale]/single-page`)**
  - [x] **Page Infrastructure & SEO**
    - [x] `page.tsx` - Unified single-page layout assembly and section orchestration (`#hero`, `#projects`, `#certifications`, `#contact`)
    - [x] `loading.tsx` - Streaming loading skeleton fallback for single-page experience
    - [x] `error.tsx` - Localized route error boundary
    - [x] `generateMetadata` - Localized single-page title, description, and OpenGraph/Twitter cards
    - [x] `JSON-LD Schema` - Structured data (`WebSite` / `ProfilePage` / `Person`)
    - [x] `generateStaticParams()` - Static locale parameters generation (`en`, `fa`)
  - [x] **Section: Viewport Scroll-Spy Sticky Navigation Bar (`app/components/single-page/SinglePageNavbar`)**
    - [x] `SinglePageNavbar` - Viewport-aware scroll-spy navigation (IntersectionObserver) tracking and highlighting active in-view section, smooth anchor navigation, language switcher (EN/FA), and theme toggle
    - [x] `SinglePageNavbarSkeleton` - Skeleton fallback for single-page navigation bar
    - [x] `SinglePageMobileNav` - Responsive mobile slide-out drawer with active scroll-spy section links
  - [x] **Section: Hero - Narrative Bio & Systems Philosophy (`app/components/single-page/SinglePageHero`)**
    - [x] `SinglePageHero` - Hero section adapting and reusing `AboutHero` (headline narrative, author portrait/visual, core engineering philosophy, and immediate CTA jump anchors)
    - [x] `SinglePageHeroSkeleton` - Suspense skeleton fallback for hero section
  - [x] **Section: Projects & Research Showcase (`app/components/single-page/SinglePageProjectsSection`)**
    - [x] `SinglePageProjectsSection` - Responsive projects grid container highlighting authentic engineering systems and published research
    - [x] `SinglePageProjectCard` - Showcase card featuring tech stack badges, direct external links to GitHub repositories, live web deployments, and DOI research publications
    - [x] `SinglePageProjectsSkeleton` - Suspense skeleton fallback for projects grid
  - [x] **Section: Top 4 Certifications & LinkedIn Showcase (`app/components/single-page/SinglePageCertificationsSection`)**
    - [x] `SinglePageCertificationsSection` - Showcase section presenting top 4 professional course certifications and verified credentials
    - [x] `CertificationCard` - Credential card detailing certificate title, issuing platform/institution, credential ID, and verification link
    - [x] `LinkedInProfileBanner` - Prominent callout card linking directly to LinkedIn profile and professional network
    - [x] `SinglePageCertificationsSkeleton` - Suspense skeleton fallback for certifications section
  - [ ] **Section: Contact & Direct Inquiry (`app/components/single-page/SinglePageContactSection`)**
    - [ ] `SinglePageContactSection` - Bottom-of-page contact container integrating `ContactForm` and communication channels
    - [ ] `ContactForm` Integration - Clean inquiry form with Name, Email, Subject, and Message inputs
    - [ ] `SinglePageContactSkeleton` - Suspense skeleton fallback for contact section
  - [ ] **Section: Single-Page Footer (`app/components/single-page/SinglePageFooter`)**
    - [ ] `SinglePageFooter` - Lightweight footer with quick anchor navigation, copyright, and social links
  - [ ] **Milestone: Production Page Swap Transition**
    - [ ] `SinglePageSwap` - Validated transition to swap `/[locale]/single-page` with root `/[locale]` (Home) while preserving standalone route access

- [ ] **Page: System & Error Pages**
  - [ ] **Section: 404 Not Found (`not-found.tsx` / `[locale]/not-found.tsx`)**
    - [ ] `NotFoundHero` - Branded creative 404 headline with developer easter egg
    - [ ] `RecoveryNavigation` - Quick recovery links back to Home, Projects, Lab, and Contact
    - [ ] `InteractiveTerminalEasterEgg` - Interactive terminal allowing commands (`help`, `ls`, `cat bio`, `home`)
  - [ ] **Section: Global Error Boundary (`error.tsx` / `global-error.tsx`)**
    - [ ] `ErrorDisplayCard` - Polite, privacy-conscious error notice without leaking stack traces
    - [ ] `ResetErrorBoundaryButton` - Retry button calling `reset()`
    - [ ] `ReportBugLink` - Direct link to file an issue with anonymized error context
