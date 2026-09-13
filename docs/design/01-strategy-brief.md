# Project Strategy Brief: Amin Jamali Portfolio & Lab

**Document Version:** 1.0  
**Status:** Approved  
**Category:** Hybrid Personal Portfolio, Interactive Systems Lab, and Digital Credentials Platform

---

## 1. Executive Summary & Purpose

Amin Jamali's web platform serves as a multi-faceted digital flagship: an authoritative portfolio of production web applications, a live interactive engineering lab for network diagnostics and privacy benchmarking, and a verifiable repository of academic credentials and peer-reviewed research.

Unlike standard static portfolios that merely display screenshot galleries and generic skill lists, this platform is an active demonstration of deep systems competence, modern web performance, verifiable academic credentials, and privacy-conscious real-time web utilities.

---

## 2. Core Value Proposition & Problem Statement

### The Problem

- **Resume Saturation & Low Trust**: Modern technical hiring and consulting markets are flooded with unverified claims, shallow tutorial clones, and vague experience summaries.
- **Disconnected Identity**: Academic research (DOIs, ORCID), open-source contributions, and production systems architecture are frequently fragmented across disparate platforms (GitHub, LinkedIn, Google Scholar, personal blogs).
- **Passive Demonstration**: Most portfolios talk about engineering capabilities without proving them live in the browser.

### The Solution

- **Empirical Proof via Case Studies**: Deep technical narratives analyzing real problems, architectural decisions, trade-offs, and verifiable Core Web Vitals performance benchmarks.
- **Interactive Engineering Lab**: Fully functional client-side and edge utilities (DoH Prober, IP & WebRTC leak diagnostic, hardware fingerprinting) that demonstrate deep networking and browser runtime expertise in real time.
- **Unified Academic & Professional Credibility**: Integration of verified DOIs, ORCID records, and vendor certifications directly into the user experience.

---

## 3. Target Audience Personas

### Persona 1: Engineering Leadership & Technical Recruiters (VPs of Eng, CTOs, Staff Recruiters)

- **Profile**: Time-constrained, seeking senior-level and architectural competence.
- **Key Needs**: Rapid validation of technical depth, clean code organization, proven production performance, and architecture design rationale.
- **Primary Flows**: Hero value proposition $\rightarrow$ Featured Case Studies $\rightarrow$ Architecture Deep Dives $\rightarrow$ One-click contact / resume.

### Persona 2: Technical Clients & Enterprise Founders

- **Profile**: Seeking high-reliability contract engineering, full-stack architectural leadership, or systems consulting.
- **Key Needs**: Clear understanding of delivered business value, reliability, performance gains, and direct communication channel.
- **Primary Flows**: Value proposition $\rightarrow$ Delivered client outcomes $\rightarrow$ Lab tools (proof of capability) $\rightarrow$ Direct contact booking.

### Persona 3: Peer Developers & Academic Researchers

- **Profile**: Interested in technical implementation details, networking mechanics, censorship circumvention diagnostics, and peer-reviewed publications.
- **Key Needs**: Reproducible benchmarks, open-source code repositories, interactive tool utility, and academic citations (BibTeX / DOIs).
- **Primary Flows**: Interactive Lab utilities $\rightarrow$ Academic Publications $\rightarrow$ GitHub repository links.

---

## 4. Measurable Success Metrics & KPIs

| Metric                              | Target             | Measurement Method                                               |
| :---------------------------------- | :----------------- | :--------------------------------------------------------------- |
| **Lighthouse Performance**          | **$\ge$ 95 / 100** | Automated CI Playwright / Lighthouse audits on all public routes |
| **Largest Contentful Paint (LCP)**  | **$<$ 1.2s**       | Real User Monitoring (RUM) & Web Vitals telemetry                |
| **Cumulative Layout Shift (CLS)**   | **$<$ 0.05**       | Zero shift font loading (`next/font`) & static dimensions        |
| **Interaction to Next Paint (INP)** | **$<$ 100ms**      | Chrome UX Report (CrUX) and RUM beacon monitoring                |
| **Accessibility (a11y)**            | **100 / 100**      | Radix UI primitives, ARIA compliance, full RTL support           |
| **SEO & Crawlability**              | **100 / 100**      | JSON-LD schema, dynamic XML sitemaps, OpenGraph metadata         |
| **Lab Tool Execution Speed**        | **$<$ 250ms**      | Client-side execution without server bottlenecks                 |

---

## 5. Competitive Analysis & Benchmarks

1. **Guillermo Rauch / Lee Robinson Portfolios**:
   - _Strengths_: Hyper-minimalist aesthetics, blazing load speeds, seamless dark/light modes.
   - _Takeaway_: Keep navigation distraction-free and ensure page transitions are instantaneous.
2. **BrowserLeaks / DNS Leak Test / IPinfo**:
   - _Strengths_: Utilitarian, fast, high-trust diagnostic output.
   - _Takeaway_: Re-engineer networking diagnostic tools (DoH probing, WebRTC detection) with modern UI elegance, clear visual status indicators, and exportable results.
3. **Academic Profiles (Google Scholar, Papers With Code)**:
   - _Strengths_: Direct links to citations and DOIs.
   - _Takeaway_: Integrate research publications directly with verified badges, DOIs, and instant BibTeX copy buttons.
