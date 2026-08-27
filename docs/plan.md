# Implementation Plan

## Phase 0: System Architecture & Core Foundations

- [ ] **0.1 Internationalization & Directionality (`/[locale]`)**
  - [ ] Set up route structure for `/[locale]` (`/en` and `/fa`)
  - [ ] Create type-safe translation dictionaries (`dictionaries/en.json`, `dictionaries/fa.json`)
  - [ ] Configure typography: modern sans-serif (LTR) for `en` and `Vazirmatn` font (RTL) for `fa`
  - [ ] Add dynamic `<html lang="..." dir="...">` attributes based on active locale

- [ ] **0.2 Design System & Tailwind CSS Tokens**
  - [ ] Configure color tokens (Slate dark background, Cyan/Teal accents, subtle borders)
  - [ ] Build core UI components (`Button`, `Badge`, `Card`, `Container`, `SectionHeading`, `Input`, `Textarea`, `Modal`)
  - [ ] Configure GSAP and Motion setup with React 19 lifecycle cleanup hooks

- [ ] **0.3 Global Layout Shell**
  - [ ] Build sticky frosted-glass Header with brand logo, nav links, locale switcher, and CTA
  - [ ] Build mobile responsive navigation drawer
  - [ ] Build high-impact Footer with brand identity, quick links, social links, and interactive hover effects

---

## Phase 1: MVP Core Experience

- [ ] **1.1 Home Page (`/[locale]`)**
  - [ ] Hero section with value proposition, availability badge, and interactive mouse hover/particle effect
  - [ ] Primary CTAs: "View Projects", "Hire Me", "Download Resume"
  - [ ] Featured Case Studies showcase (top 2-3 projects with metrics and tags)
  - [ ] Services overview summary cards
  - [ ] Trust signals / metrics bar

- [ ] **1.2 Projects & Case Studies (`/[locale]/projects`, `/[locale]/projects/[slug]`)**
  - [ ] Projects gallery with filter tabs (All, Full-Stack, Web Design, Open Source, Systems/Networking)
  - [ ] Project preview cards with thumbnails, tech stack pills, and impact summaries
  - [ ] Static MDX pipeline for case study pages (`generateStaticParams`)
  - [ ] Case study layout (Problem statement, System architecture, Challenges, Core Web Vitals metrics, Links)

- [ ] **1.3 Digital Resume (`/[locale]/resume`)**
  - [ ] Interactive CV layout with expandable job roles and key achievements
  - [ ] Downloadable PDF resume action
  - [ ] Skills matrix (Languages, Frameworks, DevOps, Design, Networking)
  - [ ] Education and certifications section

- [ ] **1.4 Contact & Booking (`/[locale]/contact`)**
  - [ ] Multi-intent inquiry form (Freelance project / Full-time role / General inquiry)
  - [ ] Form validation and submission with feedback
  - [ ] Calendar booking integration (Cal.com / Calendly)
  - [ ] Live timezone indicator (Tehran / UTC) and response availability status

- [ ] **1.5 System Error Pages**
  - [ ] Custom branded 404 Not Found page (`not-found.tsx`) with recovery navigation
  - [ ] Global and route error boundaries (`error.tsx`, `global-error.tsx`) with reset retry handlers

---

## Phase 2: Services & Personal Brand

- [ ] **2.1 Services & Offerings (`/[locale]/services`)**
  - [ ] Detailed service cards (MVP Development, UI/UX Design to Code, Performance Tuning, Custom APIs)
  - [ ] 4-step workflow process (Discover -> Design -> Build -> Launch)
  - [ ] Client FAQ accordion (timelines, pricing, communication)

- [ ] **2.2 About Page & Publications (`/[locale]/about`)**
  - [ ] Personal background story, design philosophy, and engineering mindset
  - [ ] Career milestones and open-source timeline
  - [ ] Peer-reviewed research publications section with DOI links and ORCID profile

---

## Phase 3: Interactive Diagnostic Lab Suite

- [ ] **3.1 Lab Directory Hub (`/[locale]/lab`)**
  - [ ] Overview index of interactive tools and networking utilities
  - [ ] Client-side execution highlight badges

- [ ] **3.2 DNS over HTTPS (DoH) Tester (`/[locale]/lab/doh`)**
  - [ ] Preset resolver list (Cloudflare, Google, Quad9, ControlD, DNSforge, LibreDNS, etc.)
  - [ ] Custom endpoint input and query path support (`/dns-query`, `/resolve`, `/query`)
  - [ ] Client-side browser fetch prober for domain resolution
  - [ ] 3-state detection: Accessible & Authentic, DNS Poisoned / Sinkholed, Blocked / Unreachable
  - [ ] Resolver latency comparison chart

- [ ] **3.3 IP & Identity Exposure Scanner (`/[locale]/lab/ipinfo`)**
  - [ ] IP lookup (IPv4/IPv6, ISP, ASN, Geolocation)
  - [ ] Identity leak tests (WebRTC private candidate IP leak, Timezone delta check, Proxy headers)
  - [ ] Device fingerprinting engine (Canvas 2D render hash, WebGL GPU vendor/renderer, AudioContext hash, CPU concurrency, RAM)

---

## Phase 4: SEO, Performance & Deployment

- [ ] **4.1 SEO & Metadata**
  - [ ] Dynamic OpenGraph and Twitter card image generation
  - [ ] Multilingual `hreflang` tags, dynamic `sitemap.ts`, and `robots.ts`
  - [ ] JSON-LD structured data (`Person`, `WebSite`)

- [ ] **4.2 Optimization & Verification**
  - [ ] Image optimization with modern formats (AVIF/WebP)
  - [ ] Zero Cumulative Layout Shift (CLS) verification
  - [ ] Lighthouse audit targeting 95+ across all routes (Performance, Accessibility, Best Practices, SEO)
  - [ ] CI/CD pipeline setup and production deployment
