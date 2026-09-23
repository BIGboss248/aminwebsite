# Implementation Plan Checklist Architecture (`docs/plan.md`)

This guide explains the 14-step implementation roadmap architecture, the strict Step 1 page/component checklist nesting rules, and design document synchronization.

---

## The 14 Standard Planning Steps

A complete Next.js implementation plan tracks the project from an empty directory to a production-deployed application:

1. **Step 1: Design Website & User Experience (Planning, UX & UI)**
   - 1.1 Planning & Strategy (Project Brief, KPIs, Benchmarks)
   - 1.2 Visual Identity & UI Design System (Semantic tokens, typography, primitives)
   - 1.3 Page & Component Design Checklist (UX wireframing, screen specs)
2. **Step 2: Install Package Manager** (`pnpm`, `bun`)
3. **Step 3: Setup Next.js Environment**
   - 3.1 Create Next.js App with CLI & Setup Environment (App Router, Turbopack, React Compiler)
   - 3.2 Configure `AGENTS.md` File (Next.js documentation rules, command execution constraints)
   - 3.3 Configure AI MCP Servers & Agent Skills (`next-devtools`, `playwright`, host AGY configs)
   - 3.4 Setup Code Testing (Jest, React Testing Library, Playwright E2E)
   - 3.5 Setup CI/CD & Production Containerization (Multi-stage Dockerfile, `docker-compose.yml`, Git pre-push hooks)
4. **Step 4: Structure Content & Route Registry (Type-Safe Code in `lib/`)** (`lib/routes.ts`, `lib/site-config.ts`)
5. **Step 5: Health & Log Monitoring** (`/api/health`, OpenTelemetry OTel, Core Web Vitals)
6. **Step 6: Theme & Color Palette** (Semantic CSS tokens, `next-themes` provider, theme toggle)
7. **Step 7: Setup Multilanguage Support (i18n)** (`next-intl`, root `messages/` dictionaries, LTR/RTL BiDi)
8. **Step 8: Develop Reusable Components** (Shadcn/Radix UI primitives, RSC default + client leaves)
9. **Step 9: Website Layout Shell** (Root layout, providers, header drawer, footer, web fonts)
10. **Step 10: Environment Variables Configuration** (`.env.local`, `NEXT_PUBLIC_` prefixes)
11. **Step 11: Design Website Pages** (Page views, JSON-LD schema, dynamic metadata, Suspense streaming)
12. **Step 12: Design API Routes / Server Functions** (`route.ts`, Server Actions, `"use cache"`)
13. **Step 13: Configure File-Based Metadata** (`favicon.ico`, `opengraph-image`, `robots.ts`, `sitemap.ts`)
14. **Step 14: Setup 3rd Party Plugins & Integrations** (Analytics, consent policies, CMS, external APIs)

---

## Step 1 Checklist & Component Completion Rules

> [!IMPORTANT]
> **Page & Component Nesting Structure**:
> In Step 1.3 of `docs/plan.md`, every single page identified during the grilling interview MUST be outlined as a top-level page checklist item:
> `- [ ] **Page: <Page Name> (<Route>)**`
>
> Inside each page item, nested sub-checklists MUST represent the content sections and individual components:
>
> ```markdown
> - [ ] **Page: Home (`/`)**
>   - [ ] **Section: Hero**
>     - [ ] `HeroHeadline` - Core value proposition and intro copy
>     - [ ] `AvailabilityBadge` - Contract / full-time status indicator pill
>     - [ ] `HeroGraphic` - Animated visual or interactive hero asset
>     - [ ] `PrimaryActions` - Call-to-action button group
> ```

> [!IMPORTANT]
> **Page Completion Rule**:
> A page checklist item is ticked off (`- [x]`) **IF AND ONLY WHEN all of its individual component sub-checklist items are designed and completed**.

---

## Step 1 Design Artifact Documentation

In tandem with `docs/plan.md`, three core reference documents are established in `docs/design/`:

1. **`docs/design/01-strategy-brief.md`**: Problem statement, target personas, KPIs, competitive benchmarks.
2. **`docs/design/02-sitemap-and-routes.md`**: Complete sitemap, section hierarchy, component breakdown, and Next.js rendering matrix (SSG / ISR / SSR / Client).
3. **`docs/design/03-ui-design-tokens.md`**: Brand narrative, semantic CSS variables (Light/Dark themes), typography pairings, and primitive styling specs.
