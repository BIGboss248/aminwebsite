---
name: nextjs-component-dev
description: Step-by-step TDD workflow for designing and building Next.js App Router React components (RSC and Client Components) with Suspense skeletons, semantic OKLCH tokens, next-devtools debugging, and Tailwind logical styling.
metadata:
  author: BIGboss248
  version: "1.3"
---

# Next.js Component & Skeleton Development (`nextjs-component-dev`)

Specialized workflow for creating production-ready React Server Components (RSC) and Client Components with Suspense skeletons, baseline TDD tests, next-intl dictionary-backed translations, semantic theme tokens, and live runtime diagnostics via `next-devtools` MCP.

> [!TIP]
> **Modular Assets:**
>
> - Next DevTools Debugging Guide: [`references/next-devtools-debugging.md`](./references/next-devtools-debugging.md)
> - Caching & Revalidation: [`references/caching-and-revalidation.md`](./references/caching-and-revalidation.md)
> - Reference implementations (RSC & TanStack Query): [`examples/`](./examples/)
> - Verification Scripts: [`scripts/verify-dev.ps1`](./scripts/verify-dev.ps1) (Windows) / [`scripts/verify-dev.sh`](./scripts/verify-dev.sh) (Linux)

---

## Architectural Rules & Standards

### 1. Planning Context & Paths

- Read `docs/project.json` to resolve `package_manager`, `new_component_dir`, `style_file_dir`, `component_library`, `dictionaries_dir` (default: `"messages"`), and `supported_languages`.
- All internal routes MUST use `ROUTES` from `@/lib/routes`.
- All author/site metadata MUST use `SITE_CONFIG` from `@/lib/site-config`.
- Target path hierarchy: `<new_component_dir>/<page_or_global>/<ComponentName>/`
  - Category: `global/` for shared layout chrome; `<page-name>/` (e.g. `home/`, `about/`, `lab/`) for page-scoped sections.

### 2. Dev Server & Next DevTools Protocol

- **Dev Server Check & Tune-In:** Before/during component development, check if the Next.js dev server is running via `next-devtools` MCP server (`nextjs_index`).
- **If Server Running:** Tune into the running server and port immediately; do not restart.
- **If Server Not Running:** Start the dev server in the background (`pnpm dev`, `IsDaemon: true`) and verify connection via `nextjs_index`.
- **Runtime Debugging:** After implementing components, query `next-devtools` (`nextjs_call`) to inspect errors, check build status, and diagnose runtime issues immediately. Consult [`references/next-devtools-debugging.md`](./references/next-devtools-debugging.md).

### 3. RSC Boundaries & Leaf Client Push-Down

1. **Server Components by Default:** Keep components server-rendered (`async function`).
2. **Push `"use client"` Down:** Isolate interactive handlers (buttons, toggles, form inputs) into small leaf Client Components.
3. **RSC Composition:** Pass Server Components as `children` or props into Client wrappers. Never import Server Components inside `"use client"` files.

### 4. Styling, Logical Properties & Theme Tokens

- **Semantic Tokens:** Exclusively use semantic CSS variables defined in `app/globals.css` (`bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`). Hardcoded hex colors (`#FAFAFA`) or raw color scales (`bg-blue-500`) are FORBIDDEN.
- **Class Merging:** Always merge classes using `cn(...)` (`clsx` + `tailwind-merge`).
- **Logical Properties (BiDi):** Exclusively use Tailwind logical properties (`ms-`, `pe-`, `ps-`, `me-`, `start`, `end`). Physical directional classes (`ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`) are FORBIDDEN.
- **Progress Links:** Use `<Link>` from `@vercel/react-transition-progress` for primary navigation, hero CTAs, and interactive cards; use standard `next/link` for static utility links.
- **Images:** Always use `next/image` with explicit dimensions or `fill`, responsive `sizes`, and `priority` for above-the-fold LCP assets.

### 5. TanStack Query & Server Prefetching

- **Unified Cache Contract:** Define `key`, `tag`, and `queryOptions` with explicit `staleTime` (e.g. `30_000` ms).
- **Server Prefetch:** Trigger unawaited prefetch (`void queryClient.prefetchQuery(...)`) calling internal DB functions directly (zero relative fetch on server). Dehydrate with `<HydrationBoundary>`.
- **Streamed Components:** Use `useSuspenseQuery` inside `<Suspense fallback={<[ComponentName]Skeleton />}>`.
- **Optimistic Mutations:** Use `useMutation` with `onMutate` cache snapshots and `onError` rollbacks; call Server Actions with `updateTag(cache.tag)`.
- **Next.js 16 'use cache' Directives:** For native Next.js 16 caching and Server Action revalidation semantics (`updateTag`, `revalidateTag`), consult [`references/caching-and-revalidation.md`](./references/caching-and-revalidation.md).

---

## Phase 0: Implementation Plan & Approval Gate

> [!IMPORTANT]
> **Plan Before Execution:** Always generate and present an `implementation_plan.md` artifact detailing all planned file creations, modifications, TypeScript contracts, translation dictionary additions, and TDD test cases before executing any write operations, modifying dictionaries, or creating components in the repository. Wait for user confirmation/approval before proceeding with execution.

The implementation plan must cover:

1. **Target Architecture & Path**: Full target directory (`<new_component_dir>/<page_or_global>/<ComponentName>/`) and classification (RSC vs. Client leaf component).
2. **TypeScript Contracts**: Prop interfaces and types with strict English TSDoc annotations.
3. **Dictionary Strategy**: Explicit translation namespaces and keys to add to `messages/[locale].json` across all `supported_languages` in `docs/project.json` (zero hardcoded strings or in-file mock dictionaries).
4. **Theme Tokens & Styling**: Identified semantic OKLCH CSS variables and logical layout classes.
5. **Testing & Diagnostics Strategy**: Baseline unit test cases (`[ComponentName].test.tsx`), Suspense skeleton fallback assertions, BiDi / RTL tests, and `next-devtools` runtime error inspection.
6. **Verification Gate**: Exact verification commands to run (`verify-dev.ps1` / targeted test suite).

---

## Workflow Steps

- [ ] **Step 0: Implementation Plan Generation & Approval Gate**
  - Synthesize component requirements, scan `docs/project.json`, and generate `implementation_plan.md`.
  - Set `request_feedback = true` and `user_facing = true` on the artifact.
  - Wait for user review and explicit approval before writing any code.

- [ ] **Step 1: Dev Server Verification & Next DevTools Connection**
  - Query `next-devtools` MCP via `nextjs_index` to detect running Next.js dev server instances.
  - **If Dev Server is running:** Tune into the active port and server instance; continue developing without restarting.
  - **If Dev Server is NOT running:** Start the dev server in the background (`pnpm dev`, `IsDaemon: true`) and verify discovery with `nextjs_index`.

- [ ] **Step 2: Dictionary Population & TypeScript Contract Definition**
  - Read `docs/project.json` to resolve `dictionaries_dir` (`messages` is default) and `supported_languages`.
  - Define the component's translation namespace and keys.
  - **Populate all dictionary files** (`messages/en.json`, `messages/fa.json`, etc.) with authentic translations for every supported language before writing JSX.
  - Define prop interfaces with strict **English TSDoc** annotations (`@param`, `@defaultValue`, `@returns`).
  - If there are more than one supported language, component must fetch the translation first and if failed use fallbacks.

- [ ] **Step 3: TDD Baseline Unit Tests (`[ComponentName].test.tsx`)**
  - Write `[ComponentName].test.tsx` BEFORE implementing the component.
  - Wrap rendered components in `NextIntlClientProvider` supplying the dictionary messages.
  - Cover default props, interactive callbacks, Suspense skeleton fallbacks, semantic ARIA roles, and RTL orientation.

- [ ] **Step 4: Component & Skeleton Implementation**
  - Create primary component `[ComponentName].tsx` (RSC or Client Component) consuming translations via `next-intl` (`getTranslations` or `useTranslations`) with zero hardcoded placeholders or in-file mock dictionary objects.
  - Create matching Suspense skeleton `[ComponentName]Skeleton.tsx` mirroring layout geometry and classes to prevent CLS.
  - Create clean barrel export `index.ts`.

- [ ] **Step 5: Runtime Diagnostics & Verification Gate**
  - **Next DevTools Runtime Inspection:** Use `next-devtools` MCP server (`nextjs_call`) to check for compilation errors, runtime exceptions, hydration issues, or broken routes. Debug and fix any issues immediately.
  - **Targeted Test Execution:** Run verification script to check companion files, dictionary compliance, and execute unit tests:
    - **Windows (PowerShell):**
      ```pwsh
      pwsh .agents/skills/nextjs-component-dev/scripts/verify-dev.ps1 -ComponentPath <target_component_dir>
      ```
    - **Linux / macOS (Bash):**
      ```bash
      bash .agents/skills/nextjs-component-dev/scripts/verify-dev.sh <target_component_dir>
      ```
  - Fix any syntax errors, missing dictionary keys, or test regressions until all assertions pass.

- [ ] **Step 6: Implementation Plan Checklist Synchronization**
  - Check off the completed component item (`- [x]`) in `docs/plan/05-pages-and-components.md`.
  - If all sub-components and page infrastructure tasks for the parent page are completed, check off the parent page item (`- [x]`).
