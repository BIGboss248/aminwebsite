# Phase 1: Project Discovery & Route Architecture

---

## Deliverables & Status

- [x] **1.1 Planning & Strategy (Project Brief & Discovery)**
  - [x] Establish core purpose, domain model, and entity vocabulary in `CONTEXT.md`
  - [x] Define target audience: engineering leads, systems recruiters, technical clients, and peer developers
  - [x] Define primary goals: building trust through verified credentials, showcasing deep case studies, and demonstrating real-time systems competence
  - [x] Define success criteria & metrics: 95+ Lighthouse scores, sub-second LCP, zero layout shift (CLS), interactive tool responsiveness
  - [x] Analyze industry benchmarks and leading engineering portfolios / diagnostic tools
  - [x] Define product category in [`docs/design/01-strategy-brief.md`](file:///c:/scripts/aminwebsite/docs/design/01-strategy-brief.md)
- [x] **1.2 Information Architecture & Sitemap**
  - [x] Map page route inventory: Home (`/`), About (`/about`), Projects/Case Studies (`/projects`), Lab Hub (`/lab`), Contact (`/contact`) in [`docs/design/02-sitemap-and-routes.md`](file:///c:/scripts/aminwebsite/docs/design/02-sitemap-and-routes.md)
  - [x] Map section hierarchy for each page in [`docs/design/02-sitemap-and-routes.md`](file:///c:/scripts/aminwebsite/docs/design/02-sitemap-and-routes.md)
  - [x] Define rendering strategy per route (SSG for marketing/case studies, SSR for dynamic diagnostics, client-side for lab tools) in [`docs/design/02-sitemap-and-routes.md`](file:///c:/scripts/aminwebsite/docs/design/02-sitemap-and-routes.md)
- [x] **1.3 Type-Safe Registries & Site Config**
  - [x] Create centralized route paths registry (`lib/routes.ts`) with typed paths and dynamic route builders
  - [x] Centralize site metadata, author bio, social links, and credentials in a shared configuration file (`lib/site-config.ts`)
