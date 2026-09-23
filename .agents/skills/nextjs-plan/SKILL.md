---
name: nextjs-plan
description: >-
  End-to-end planning skill for Next.js App Router projects. Scans workspace files, grills the user on general needs, pages, sections, and components, and generates canonical project specifications and actionable implementation checklists. Triggers on "/nextjs-plan", "plan a nextjs project", "plan nextjs app", "create nextjs project plan", "outline nextjs architecture", or "generate plan.md".
metadata:
  author: BIGboss248
  version: "3.0"
---

# Next.js Project Planning Skill (`nextjs-plan`)

A structured, end-to-end orchestration skill for planning Next.js App Router applications from inception to launch. When invoked, it extracts known technical specifications from existing workspace files, conducts a targeted grilling interview on the user's requirements, and outputs canonical project specifications (`docs/project.json`), type-safe code registries in `lib/`, design briefs in `docs/design/`, and an actionable chronological implementation plan (`docs/plan.md`).

---

## Workflow Overview

```mermaid
flowchart TD
    Invoke["Invoke /nextjs-plan"] --> Step1["1. Automated Workspace Inspection<br/>(Extract dependencies, directory layout, styles, configs, routes)"]
    Step1 --> Step2["2. Grilling Interview on Pages & Needs<br/>(Pages ➔ Sections ➔ Components)"]
    Step2 --> Step3["3. Generate Canonical Specifications<br/>(docs/project.json & lib/ registries)"]
    Step3 --> Step4["4. Document Strategy & Design Systems<br/>(docs/design/ 01-strategy, 02-sitemap, 03-tokens)"]
    Step4 --> Step5["5. Generate Implementation Checklist<br/>(docs/plan.md with Page & Component sub-checklists)"]
    Step5 --> Step6["6. Completion & Wrap-Up<br/>(Present summary; do NOT invoke downstream skills)"]
```

---

## Standardized Project Directory Architecture

```text
├── lib/                             # Type-safe Next.js code source of truth
│   ├── routes.ts                    # Centralized route registry & path builders
│   ├── site-config.ts               # Centralized site metadata, author bio, social links
│   └── utils.ts                     # Tailwind cn helper
├── docs/                            # Architecture, planning & design rationale
│   ├── project.json                 # Canonical machine-readable specifications
│   ├── plan.md                      # Master 14-step checklist (empty workspace ➔ production)
│   ├── design/                      # Step 1: Design, UX & UI specifications
│   │   ├── 01-strategy-brief.md     # Purpose, personas, goals, KPIs, benchmarks
│   │   ├── 02-sitemap-and-routes.md # Page inventory, section hierarchy, rendering matrix
│   │   ├── 03-ui-design-tokens.md   # Semantic CSS tokens, typography, component primitives
│   │   └── wireframes/              # Stitch screen exports, Figma links, snapshots
│   └── adr/                         # Architecture Decision Records
```

---

## Step-by-Step Execution Runbook

### 1. Automated Workspace Inspection (Zero Interruption)

> [!IMPORTANT]
> **Inspect first, ask later.** Never prompt the user for facts that can be deduced directly from workspace files.

- [ ] **Scan Workspace Context**: Inspect `package.json`, lockfiles (`pnpm-lock.yaml`, `bun.lockb`), routing structure (`app/` vs `src/app/`), components directory, `app/globals.css`, UI libraries (`shadcn/ui`, `lucide-react`, animations), `next-intl` setup (root `messages/` folder), existing routes (`page.tsx`, `route.ts`), and testing/Docker configurations.
- [ ] For the complete inspection checklist, consult [workspace-inspection.md](./references/workspace-inspection.md).

### 2. User Grilling Interview (Pages ➔ Sections ➔ Components)

- [ ] **Conduct Adaptive Grilling Interview**: Engage the user in structured rounds using the grilling frontier methodology. Number each question and provide recommended answers.
- [ ] **Mandatory Step 1 Grilling Sequence**:
  1. **Pages Grilling**: Enumerate all required web pages and target URL routes.
  2. **Sections Grilling**: For each page, identify all content sections from top to bottom.
  3. **Components Grilling**: For each section, define all required UI components.
- [ ] **Core Inquiries**: Problem statement, target personas, authentication, data layer/ORM, i18n locales & RTL, visual aesthetic tone, and deployment target.
- [ ] For interview templates and decision tree rules, consult [grilling-interview.md](./references/grilling-interview.md).

### 3. Generate Canonical Specifications & Type-Safe Code

- [ ] **Create `docs/project.json`**: Populate technical metadata (package manager, component dirs, styles, UI/animation/testing libraries, supported languages, dictionary paths). Consult [project-schema.md](./references/project-schema.md) and deploy [project.json.template](./resources/templates/project.json.template).
- [ ] **Create `lib/routes.ts`**: Generate type-safe route registry from [routes.ts.template](./resources/templates/routes.ts.template).
- [ ] **Create `lib/site-config.ts`**: Generate centralized site profile and metadata from [site-config.ts.template](./resources/templates/site-config.ts.template).

### 4. Document Design Strategy in `docs/design/`

- [ ] **Create `docs/design/01-strategy-brief.md`**: Deploy [01-strategy-brief.md.template](./resources/templates/01-strategy-brief.md.template).
- [ ] **Create `docs/design/02-sitemap-and-routes.md`**: Deploy [02-sitemap-and-routes.md.template](./resources/templates/02-sitemap-and-routes.md.template).
- [ ] **Create `docs/design/03-ui-design-tokens.md`**: Deploy [03-ui-design-tokens.md.template](./resources/templates/03-ui-design-tokens.md.template).

### 5. Generate Master Implementation Checklist (`docs/plan.md`)

- [ ] **Generate `docs/plan.md`**: Construct the 14-step checklist taking the project from empty workspace to production target using [plan.md.template](./resources/templates/plan.md.template).
- [ ] **Step 1 Checklist Rule**: In Step 1, outline every page as a checklist item (`- [ ] **Page: <Page Name> (<Route>)**`) with sections and components nested as sub-checklists.
- [ ] **Page Completion Rule**: Mark a page item as `- [x]` **if and only when all of its component sub-checklist items are designed**. Mark already-completed workspace items as `- [x]` and pending items as `- [ ]`.
- [ ] Consult [plan-checklist-structure.md](./references/plan-checklist-structure.md) for full phase guidelines.

### 6. Wrap-up & Completion Gate

- [ ] Present concise summary report to user detailing workspace findings, specifications in `docs/project.json`, and roadmap in `docs/plan.md`.
- [ ] **DO NOT automatically invoke downstream Next.js skills.** Conclude execution and allow user to review the plan.

---

## Edge Cases & Known AI Pitfalls

> [!WARNING]
>
> - **Chaining Commands**: Never execute compound commands using `&&`, `||`, or `;` on a single line. Always execute terminal commands individually.
> - **Asking Before Inspecting**: Do not ask the user for basic facts (e.g. package manager, directories) that can be read from `package.json` or directory listings.
> - **Inverted Grilling Order**: Always drill down in order: Pages ➔ Sections ➔ Components. Do not jump to low-level components before establishing the route inventory.
> - **Premature Page Checkoff**: A page in Step 1 of `docs/plan.md` must remain `- [ ]` until every single child component in its sub-checklist is completed.
> - **Incorrect Dictionary Location**: In Next.js i18n configurations, dictionaries are located in `messages/` at the project root (e.g., `messages/en.json`), never in `app/dictionaries`.
> - **Hardcoding URLs & Metadata**: Always export and import routes via `lib/routes.ts` and metadata via `lib/site-config.ts`.
> - **Spawning Downstream Skills**: Do not automatically trigger implementation or styling skills upon completing the plan; stop and wait for user direction.

---

## Output Summary Schema

Upon concluding the planning phase, present the summary in this format:

```markdown
### Next.js Project Plan Completed

- **Canonical Specifications**: `[docs/project.json](file:///...)`
- **Type-Safe Registries**: `[lib/routes.ts](file:///...)` | `[lib/site-config.ts](file:///...)`
- **Design & Strategy Specs**: `[docs/design/01-strategy-brief.md](file:///...)`, `[docs/design/02-sitemap-and-routes.md](file:///...)`, `[docs/design/03-ui-design-tokens.md](file:///...)`
- **Master Roadmap**: `[docs/plan.md](file:///...)`
  - **Identified Pages**: X total routes mapped
  - **Identified Components**: Y total components cataloged across Z sections
  - **Completed Milestones**: N / 14 phases verified

_Planning complete. Review `docs/plan.md` to proceed with component design or implementation._
```

---

## Reference Guides & Templates

- [Workspace Inspection Guide](./references/workspace-inspection.md) — Comprehensive pre-interview codebase discovery checklist.
- [Grilling Interview Guide](./references/grilling-interview.md) — Multi-round questioning protocol and inquiry areas.
- [Project Schema Reference](./references/project-schema.md) — Specification fields and validation criteria for `docs/project.json`.
- [Plan Checklist Architecture](./references/plan-checklist-structure.md) — 14-step roadmap structure, page-component rules, and lifecycle phases.
- [Project JSON Template](./resources/templates/project.json.template) — Starter schema for `docs/project.json`.
- [Plan Markdown Template](./resources/templates/plan.md.template) — Starter 14-step checklist for `docs/plan.md`.
- [Routes TypeScript Template](./resources/templates/routes.ts.template) — Type-safe route definitions for `lib/routes.ts`.
- [Site Config Template](./resources/templates/site-config.ts.template) — Centralized site profile for `lib/site-config.ts`.
- [Strategy Brief Template](./resources/templates/01-strategy-brief.md.template) — Template for `docs/design/01-strategy-brief.md`.
- [Sitemap & Routes Template](./resources/templates/02-sitemap-and-routes.md.template) — Template for `docs/design/02-sitemap-and-routes.md`.
- [UI Design Tokens Template](./resources/templates/03-ui-design-tokens.md.template) — Template for `docs/design/03-ui-design-tokens.md`.
