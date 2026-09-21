---
name: nextjs-component-dev
description: Step-by-step TDD workflow for designing and building Next.js App Router React components (RSC and Client Components) with Suspense skeletons, semantic OKLCH tokens, and Tailwind logical styling.
metadata:
  author: BIGboss248
  version: "1.0"
---

# Next.js Component & Skeleton Development (`nextjs-component-dev`)

Specialized workflow for creating production-ready React Server Components (RSC) and Client Components with Suspense skeletons, baseline TDD tests, and semantic theme tokens.

> [!TIP]
> **Modular Assets:**
> - Reference implementations (RSC & TanStack Query): [`examples/`](./examples/)
> - Verification Scripts: [`scripts/verify-dev.ps1`](./scripts/verify-dev.ps1) (Windows) / [`scripts/verify-dev.sh`](./scripts/verify-dev.sh) (Linux)

---

## Architectural Rules & Standards

### 1. Planning Context & Paths
* Read `docs/project.json` to resolve `package_manager`, `new_component_dir`, `style_file_dir`, and `component_library`.
* All internal routes MUST use `ROUTES` from `@/lib/routes`.
* All author/site metadata MUST use `SITE_CONFIG` from `@/lib/site-config`.
* Target path hierarchy: `<new_component_dir>/<page_or_global>/<ComponentName>/`
  * Category: `global/` for shared layout chrome; `<page-name>/` (e.g. `home/`, `about/`, `lab/`) for page-scoped sections.

### 2. RSC Boundaries & Leaf Client Push-Down
1. **Server Components by Default:** Keep components server-rendered (`async function`).
2. **Push `"use client"` Down:** Isolate interactive handlers (buttons, toggles, form inputs) into small leaf Client Components.
3. **RSC Composition:** Pass Server Components as `children` or props into Client wrappers. Never import Server Components inside `"use client"` files.

### 3. Styling, Logical Properties & Theme Tokens
* **Semantic Tokens:** Exclusively use semantic CSS variables defined in `app/globals.css` (`bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`). Hardcoded hex colors (`#FAFAFA`) or raw color scales (`bg-blue-500`) are FORBIDDEN.
* **Class Merging:** Always merge classes using `cn(...)` (`clsx` + `tailwind-merge`).
* **Logical Properties (BiDi):** Exclusively use Tailwind logical properties (`ms-`, `pe-`, `ps-`, `me-`, `start`, `end`). Physical directional classes (`ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`) are FORBIDDEN.
* **Progress Links:** Use `<Link>` from `@vercel/react-transition-progress` for primary navigation, hero CTAs, and interactive cards; use standard `next/link` for static utility links.
* **Images:** Always use `next/image` with explicit dimensions or `fill`, responsive `sizes`, and `priority` for above-the-fold LCP assets.

### 4. TanStack Query & Server Prefetching
* **Unified Cache Contract:** Define `key`, `tag`, and `queryOptions` with explicit `staleTime` (e.g. `30_000` ms).
* **Server Prefetch:** Trigger unawaited prefetch (`void queryClient.prefetchQuery(...)`) calling internal DB functions directly (zero relative fetch on server). Dehydrate with `<HydrationBoundary>`.
* **Streamed Components:** Use `useSuspenseQuery` inside `<Suspense fallback={<[ComponentName]Skeleton />}>`.
* **Optimistic Mutations:** Use `useMutation` with `onMutate` cache snapshots and `onError` rollbacks; call Server Actions with `updateTag(cache.tag)`.

---

## Workflow Steps

- [ ] **Step 1: TypeScript Contract Definition & TDD Baseline Tests**
  - Define prop interfaces with strict **English TSDoc** annotations (`@param`, `@defaultValue`, `@returns`).
  - Write `[ComponentName].test.tsx` BEFORE implementing the component.
  - Cover default props, interactive callbacks, Suspense skeleton fallbacks, semantic ARIA roles, and RTL orientation.

- [ ] **Step 2: Component & Skeleton Implementation**
  - Create primary component `[ComponentName].tsx` (RSC or Client Component).
  - Create matching Suspense skeleton `[ComponentName]Skeleton.tsx` mirroring layout geometry and classes to prevent CLS.
  - Create clean barrel export `index.ts`.

- [ ] **Step 3: Verification & Test Execution**
  - Run verification script to check companion files and execute unit tests:
    * **Windows (PowerShell):**
      ```pwsh
      pwsh .agents/skills/nextjs-component-dev/scripts/verify-dev.ps1 -ComponentPath <target_component_dir>
      ```
    * **Linux / macOS (Bash):**
      ```bash
      bash .agents/skills/nextjs-component-dev/scripts/verify-dev.sh <target_component_dir>
      ```
  - Fix any syntax errors or test regressions until all assertions pass.

