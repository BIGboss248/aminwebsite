---
name: nextjs-create-component
description: Step-by-step workflow and engineering standards for designing, creating, styling, and documenting Next.js React components (RSC and Client Components). Use when creating new React components, UI elements, layouts, page sections or pages in Next.js App Router applications.
metadata:
  author: BIGboss248
  version: "1.3"
---

# Next.js Component Creation Skill (`nextjs-create-component`)

This skill provides step-by-step instructions, architectural rules, and code standards for creating production-ready React components in a Next.js App Router application.

---

## Local Next.js Documentation References

When deployed in a Next.js repository, official Next.js documentation is accessible locally via `node_modules`. Read and reference these local files for authoritative Next.js behavior:

- **RSC & Client Boundaries:**
  - [Server and Client Components](../../../node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md)
  - [`'use client'` Directive Reference](../../../node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md)
  - [`'use server'` Directive Reference](../../../node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-server.md)
- **Navigation & Links:**
  - [Linking and Navigating](../../../node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md)
  - [`<Link>` Component API Reference](../../../node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md)
  - [Prefetching Guide](../../../node_modules/next/dist/docs/01-app/02-guides/prefetching.md)
  - [Instant Navigation Guide](../../../node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md)
- **Images & Fonts:**
  - [Image Optimization Guide](../../../node_modules/next/dist/docs/01-app/01-getting-started/12-images.md)
  - [`<Image>` Component API Reference](../../../node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md)
  - [Font Optimization Guide](../../../node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md)
  - [`next/font` API Reference](../../../node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md)
- **Styling & CSS:**
  - [CSS & Tailwind Guide](../../../node_modules/next/dist/docs/01-app/01-getting-started/11-css.md)
  - [Tailwind CSS v3 Guide](../../../node_modules/next/dist/docs/01-app/02-guides/tailwind-v3-css.md)
- **Streaming & Loading States:**
  - [Streaming & Suspense Guide](../../../node_modules/next/dist/docs/01-app/02-guides/streaming.md)
- **i18n & SEO / Structured Data:**
  - [Internationalization (i18n) Guide](../../../node_modules/next/dist/docs/01-app/02-guides/internationalization.md)
  - [JSON-LD Structured Data Guide](../../../node_modules/next/dist/docs/01-app/02-guides/json-ld.md)
  - [Metadata and OG Images Guide](../../../node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md)
- **Data Fetching, Forms & Server Actions:**
  - [Fetching Data Guide](../../../node_modules/next/dist/docs/01-app/01-getting-started/06-fetching-data.md)
  - [Mutating Data Guide](../../../node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md)
  - [Forms & Mutations Guide](../../../node_modules/next/dist/docs/01-app/02-guides/forms.md)
  - [Server Actions Guide](../../../node_modules/next/dist/docs/01-app/02-guides/server-actions.md)
  - [`<Form>` Component API Reference](../../../node_modules/next/dist/docs/01-app/03-api-reference/02-components/form.md)
- **Client-Side Data Fetching & Cache Coordination:**
  - [TanStack Query & Next.js App Router Guide](../../../docs/tanstack-query-nextjs-guide.md)
  - [`use cache` Directive Reference](../../../node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-cache.md)
  - [`updateTag` API Reference](../../../node_modules/next/dist/docs/01-app/03-api-reference/04-functions/updateTag.md)

---

## Architectural Rules & Core Constraints

Before and during step execution, you MUST follow these core architectural rules and constraints:

### 1. Project Configuration & Path Resolution (Single Source of Truth)

> [!IMPORTANT]
> **MANDATORY FIRST ACTION:** Before executing any component creation, design, or test steps, you MUST read `docs/project.json` (or `docs/PROJECT.JSON`) at the workspace root using `view_file` to parse `project_context_and_metadata`. The `docs/project.json` file is the single source of truth for component target directories, style files, package manager, and project settings.

Resolve workspace parameters directly from the JSON properties in `docs/project.json`:

- `package_manager`: `project_context_and_metadata.package_manager` (e.g. `pnpm`, `npm`, `yarn`, `bun`)
- `components_dir`: `project_context_and_metadata.new_component_dir` (e.g. `src/components` or `app/components`)
- `style_file`: `project_context_and_metadata.style_file_dir` (e.g. `src/app/globals.css` or `app/globals.css`)
- `component_library`: `project_context_and_metadata.component_library` (e.g. `shadcn/ui`)
- `animation_library`: `project_context_and_metadata.animation_library` (e.g. `gsap`)
- `supported_languages`: `project_context_and_metadata.supported_languages` (array of locale metadata objects: `language_code`, `country_code`, `currency_code`, `direction`, `native_name`, `calendar_type`)
- `dictionaries_dir`: `project_context_and_metadata.dictionaries_dir` (e.g. `src/dictionaries` or `app/dictionaries`)
- `dictionary_file_pattern`: `project_context_and_metadata.dictionary_file_pattern` (e.g. `[locale].json`, resolving to `dictionaries_dir/[language code].json` such as `src/dictionaries/en.json`, `src/dictionaries/fa.json`)

**Do NOT guess or hardcode target paths.** Always read `new_component_dir` from `docs/project.json` to determine where new components and test files must be created.

### 2. Architectural Placement & RSC Boundaries

_(Reference: [Server & Client Components](../../../node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md) and [`'use client'`](../../../node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md))_

1. **Default to React Server Components (RSC):**
   - Make components cacheable Server Components by default. Fetch data, resolve metadata, and render layout on the server.
2. **Isolate Client Components ("use client"):**
   - Push the `"use client"` directive as far down the component tree as possible (to leaf components).
   - Extract interactive elements (click handlers, state managers, GSAP timelines, form inputs) into small dedicated Client Components.
3. **RSC Composition Pattern:**
   - When a Client Component wraps Server Components (e.g. layout containers or animation frames), pass the Server Components as `children` or standard React props.
   - **NEVER** import a Server Component directly inside a `"use client"` file.
4. **Directory Structure:**
   - Store components under `PROJECT["project_context_and_metadata"]["new_component_dir"]`, categorized by page/feature module.
   - Implement responsive adaptations for mobile, tablet, and desktop viewports directly within a single component using Tailwind CSS breakpoint classes (e.g., `sm:`, `md:`, `lg:`).
5. **Client Data Fetching & Unified Cache Contracts (`queryOptions`):**
   - When components require client-side dynamic fetching, infinite scroll, polling, or optimistic mutations, implement TanStack Query using a **Unified Cache Contract** (`[feature]-cache.ts`).
   - Define a single contract object with `key` (typed tuple), `tag` (server cache tag for `updateTag`), and `options` (`queryOptions(...)`) with an explicit `staleTime` (e.g. `30_000` ms).
   - **Zero Direct Relative Fetching on Server:** In Server Components, calling relative URLs (`fetch('/api/...')`) is strictly FORBIDDEN because Node.js lacks origin context and relative fetch introduces loopback overhead. Server prefetching MUST call internal database or service functions directly (e.g. `getProduct(id)`), overriding the contract's `queryFn`. Client components fetch from Route Handlers via the contract's default `queryFn`.

### 3. Next.js Optimized Components & Styling Rules

_(Reference: [Linking & Navigating](../../../node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md), [`<Link>` API](../../../node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md), [Image Optimization](../../../node_modules/next/dist/docs/01-app/01-getting-started/12-images.md), and [`<Image>` API](../../../node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md))_

1. **Framework Components & Navigation Links:**
   - **Progress-Aware Links (`@vercel/react-transition-progress`):** Use `<Link>` from `@vercel/react-transition-progress` for primary navigation menus, header links, hero CTAs, and interactive cards where immediate visual feedback during server data fetching and route streaming is critical for UX.
   - **Standard Links (`next/link`):** Use standard `<Link>` from `next/link` for static footer links, utility links, or simple inline text links where top progress bar tracking is unnecessary.
   - **Never Use Raw Anchors:** Raw `<a>` tags for internal navigation are FORBIDDEN.
   - **Images (`next/image`):** Use `<Image>` from `next/image` with explicit `width`/`height` or `fill` and `alt` text. Use `priority` for LCP images above the fold.
2. **Semantic Theme Tokens:**
   - Exclusively use CSS variables and semantic theme tokens defined in `PROJECT["project_context_and_metadata"]["style_file_dir"]` (e.g., `bg-background`, `text-foreground`, `border-border`).
   - Hardcoded color scales (e.g., `bg-blue-500`) are strictly forbidden.
3. **Strict Class Merging:**
   - Always merge Tailwind classes using `cn(...)` (wrapping `clsx` and `tailwind-merge`). Never use string concatenation.
4. **Tailwind Logical Properties (BiDi RTL/LTR):**
   - You MUST use logical directional properties (`ms-`, `pe-`, `ps-`, `me-`, `start`, `end`).
   - Physical directional classes (`ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`) are FORBIDDEN.
5. **Animations:**
   - Simple hover/focus interactions: Tailwind CSS transitions (e.g. `transition-all hover:scale-105`).
   - Complex timelines/scroll triggers: GSAP wrapped in `@gsap/react` `useGSAP()` hook with scoped DOM refs.

### 4. Loading States & Route Transitions

_(Reference: [Streaming & Suspense](../../../node_modules/next/dist/docs/01-app/02-guides/streaming.md) and [Instant Navigation](../../../node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md))_

1. **Suspense & Skeleton Fallbacks:**
   - Wrap slow data-fetching components in React `<Suspense>` boundaries.
   - Provide accurate `<Skeleton>` fallbacks matching the exact dimensions of loaded content to eliminate Cumulative Layout Shift (CLS).
   - Name skeletons `[ComponentName]Skeleton`. Use Tailwind CSS responsive breakpoint classes within the skeleton component to mirror layout changes across viewports instead of creating separate skeleton files.
2. **Route Transition Progress:**
   - Use `<Link>` from `@vercel/react-transition-progress` to trigger top-bar progress on high-priority navigation points (primary menus, header links, hero CTAs, and interactive cards).
   - Ensure the top progress bar is fixed (`fixed top-0 left-0 right-0 z-[9999] h-1 pointer-events-none`) with theme primary colors.
3. **TanStack Query Suspense Integration (`useSuspenseQuery` vs `useQuery`):**
   - **Streamed Components:** Use `useSuspenseQuery(cache.options(...))` for components rendered inside `<Suspense fallback={<[ComponentName]Skeleton />}>`. It guarantees defined `data`, streams the skeleton fallback on initial fetch, and prevents layout shift or skeleton flashing on subsequent background refetches.
   - **Interactive Shells:** Use standard `useQuery` with `enabled: boolean` when building interactive shells (such as search autocompletes, filter drawers, or command palettes) where the input shell must remain interactive and visible while queries resolve.

### 5. Server Prefetching, Cache Coordination & Cache Component Safety

_(Reference: [TanStack Query Integration Guide](../../../docs/tanstack-query-nextjs-guide.md), [`use cache`](../../../node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-cache.md), and [`updateTag`](../../../node_modules/next/dist/docs/01-app/03-api-reference/04-functions/updateTag.md))_

1. **Non-Blocking Server Prefetch Pattern:**
   - On the server, instantiate `new QueryClient()` per request (never a shared singleton).
   - Trigger prefetching without awaiting: `void queryClient.prefetchQuery(...)`. This allows Next.js to stream the component shell and `<Skeleton>` fallback immediately without blocking on database queries.
   - Dehydrate pending queries: wrap the Client Component in `<HydrationBoundary state={dehydrate(queryClient, { shouldDehydrateQuery: (q) => defaultShouldDehydrateQuery(q) || q.state.status === 'pending' })}>`.
2. **Cache Coordination & Optimistic Mutations:**
   - In mutating Client Components, use `useMutation` with `onMutate` to immediately apply optimistic UI updates via `queryClient.setQueryData(...)` and snapshot previous state.
   - In `onError`, restore `context.previous`.
   - The invoked Server Action performs the database write and calls `updateTag(cache.tag(...))` from `next/cache` to invalidate cached server reads for subsequent navigations.
3. **Cache Components Safety (Next.js 15+):**
   - With `cacheComponents: true` enabled in `next.config.ts`, `dehydrate()` calling `Date.now()` during static prerendering throws a blocking build error.
   - Use the safe hydration helper pattern: wrap the timestamp lookup in an isolated `'use cache'` function tagged with the same `cacheTag`, ensuring the timestamp is deterministically cached alongside the data.
4. **Explicit `staleTime` Standard:**
   - Always set an explicit `staleTime` (e.g. `30_000` ms) in `queryOptions`. A `staleTime` of `0` causes the browser to trigger an instant redundant HTTP refetch upon client hydration.

### 6. i18n & SEO Integration Rules

_(Reference: [Internationalization](../../../node_modules/next/dist/docs/01-app/02-guides/internationalization.md), [JSON-LD](../../../node_modules/next/dist/docs/01-app/02-guides/json-ld.md), and [Metadata & OG Images](../../../node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md))_

1. **Internationalization (i18n):**
   - Extract UI text into dictionary files formatted as `dictionaries_dir/[language code].json` (e.g., `src/dictionaries/en.json`, `src/dictionaries/fa.json`) for each locale in `supported_languages`.
   - Wrap internal links with `localizePath(href, locale)`.
   - Format currencies, numbers, and dates using the native `Intl` API (`Intl.NumberFormat`, `Intl.DateTimeFormat`).
2. **SEO & Structured Data (schema-dts):**
   - Use semantic HTML tags (`<article>`, `<section>`, `<nav>`) and correct heading hierarchy (single `<h1>`, sequential `<h2>`–`<h6>`).
   - Inject strictly typed JSON-LD schema using `schema-dts` in `@graph` array format for new NextJS pages:
     - Analyze the page context and dynamically incorporate as many applicable Schema.org entity formats as appropriate for the page content (e.g., combining `WebPage`, `Organization`/`Corporation`/`Store`, `BreadcrumbList`, `Article`, `Product`, `SoftwareApplication`, `FAQPage`, `Event`, `Course`, `VideoObject`, `Service`, `ItemPage`, etc., matching all relevant schemas rather than being restricted to a fixed list).
     - Interlink entities via `@id` references (e.g., `${pageUrl}#webpage`, `${siteUrl}/#organization`, `${pageUrl}#primary-entity`).
     - Convert CMS rich text trees to plain strings using `lexicalToPlainText(...)` before schema assignment.
     - Mark schema script with `<!-- TODO: Validate on https://validator.schema.org/ -->`.

### 7. TSDoc & Module Mapping Rules

1. **Strict English TSDoc (MANDATORY):**
   - All exported functions, props, generics, and components MUST be annotated in **English** using strict TSDoc syntax.
   - Include `@typeParam` for generics, `@param` for every input, `@defaultValue` for optionals, `@returns` for outputs, and `@throws` for errors. Focus on the "Why".
2. **Module & System Architecture Mapping:**
   - Create or append to `README.modules.md` in the component folder detailing algorithmic breakdown, internal state Mermaid diagram, consumer file references, and integration flowchart.
   - Update root `ARCHITECTURE.md` if data flow, module boundaries, or Payload CMS schemas are altered.

### 8. Common Edge Cases & Pitfalls

| Edge Case / Anti-Pattern                               | Correct Pattern                                                                                                                                                                 |
| :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Direct import of RSC inside `"use client"` file        | Pass RSC as `children` or React props into Client wrapper                                                                                                                       |
| Hardcoded colors (e.g., `text-gray-600`)               | Use semantic design tokens (`text-muted-foreground`)                                                                                                                            |
| Physical directional margins (`ml-4`, `pr-2`)          | Use logical properties (`ms-4`, `pe-2`)                                                                                                                                         |
| Standard `<img>` tag                                   | Use Next.js `<Image src="..." width={...} height={...} alt="..." />`                                                                                                            |
| Writing component code before unit tests               | Follow TDD: Write unit tests first ([ComponentName].test.tsx), establish contract, and code until tests pass                                                                    |
| Guessing unspecific or vague requirements              | Interview user (suggest /grill-me) to clarify props, layout & behavior before writing tests                                                                                     |
| Keeping JSON plan transient in chat memory only        | Save plan to `.agents/history/plan-[component-name].json` and update subtask statuses to `"completed"` as work finishes                                                         |
| Using standard `next/link` everywhere indiscriminately | Use `@vercel/react-transition-progress` `Link` for primary menus, headers, hero CTAs, and interactive cards; reserve `next/link` for static footers and minor inline text links |
| Naked internal links (`<Link href="/about">`)          | Use localized paths (`<Link href={localizePath("/about", locale)}>`)                                                                                                            |
| Manual date/currency formatting strings                | Use native `Intl.DateTimeFormat` or `Intl.NumberFormat`                                                                                                                         |
| Skipping `@param` tags or writing non-English TSDoc    | Write strict English TSDoc for every single prop & parameter                                                                                                                    |
| Shared singleton `QueryClient` on server               | Instantiate `new QueryClient()` per request on server; reuse singleton only in browser (`browserQueryClient ??= new QueryClient()`)                                             |
| Awaiting `prefetchQuery` in RSC                        | Use non-blocking prefetch `void queryClient.prefetchQuery(...)` inside `<Suspense>` to stream `<Skeleton>` immediately                                                          |
| Relative URLs in server prefetch                       | Call internal service or direct DB function in server prefetch `queryFn`; reserve relative URLs for browser fetches                                                             |
| Missing `staleTime` on hydrated queries                | Set explicit `staleTime: 30_000` in `queryOptions` to prevent instant duplicate network refetch on client hydration                                                             |
| Calling `Date.now()` during Cache Components build     | Wrap dehydration timestamp in `'use cache'` helper with matching `cacheTag`s to prevent prerender build failures                                                                |
| Sequential `useSuspenseQuery` waterfalls               | Split independent queries into sibling components or use `useSuspenseQueries`                                                                                                   |

---

## Step-by-Step Implementation Workflow

- [ ] **Step 0: Load Project Configuration (Mandatory First Action)**
  - Read `docs/project.json` (or `docs/PROJECT.JSON`) at the workspace root using `view_file`.
  - Parse `project_context_and_metadata.package_manager`, `new_component_dir`, `style_file_dir`, `component_library`, `animation_library`, and `supported_languages`.
  - Use `new_component_dir` as the target directory for all component, skeleton, test, and documentation files created in subsequent steps.

- [ ] **Step 1: Mandatory Component Reuse Check**
  - Search `new_component_dir` (read from `docs/project.json`) and `component_library` for existing components. If a component exists, reuse, adapt or extend it.
  - Creating a new component is strictly forbidden if an existing component can fulfill the capability or be extended (e.g. by adding optional props, parameters, or CSS classes) without breaking existing consumers.

- [ ] **Step 2: Requirement Alignment & User Interview (Mandatory for Vague Prompts)**
  - **Check Clarity:** If the user prompt is vague, incomplete, or unspecific regarding component props, interactive states, styling, or accessibility requirements, you MUST interview the user before writing tests or code.
  - **Interviewing User:** Ask specific clarifying questions to establish an exact specification. Suggest using the `/grill-me` slash command if deep interactive design alignment is needed.
  - **Prohibition:** Guessing or assuming missing requirements for unspecific prompts is strictly forbidden. Align on specifications first, then begin Test-Driven Development (TDD).

- [ ] **Step 3: Mandatory Pre-Flight JSON Plan & History Persistence**
      Before executing any task, you MUST generate your own tailored JSON plan for the component and persist it into `.agents/history/` directory.

  > [!IMPORTANT]
  > **EXAMPLE FORMAT SCHEMA ONLY:** The JSON structure below is an **example layout**. You MUST generate a comprehensive plan tailored to your specific task that includes subtasks for all steps (including TDD tests in Step 4, component creation in Step 5, self-reflection in Step 6, and **executing unit tests via `run_command` in Step 7**).
  1. **History Directory:** Ensure `.agents/history/` directory exists (create it if missing).
  2. **File Saving:** Save the initial JSON plan to `.agents/history/plan-[component-name].json`.
  3. **Sequential Task Execution & Crossing Off:** As each subtask is executed and completed:
     - Update the subtask's `"status"` field in `.agents/history/plan-[component-name].json` from `"pending"` to `"completed"`.
     - Output a progress update crossing off the completed task (e.g. `[x] Subtask 4: Execute unit tests`).

  ```json
  {
    "goal": "Create [ComponentName] in Next.js App Router",
    "history_file": ".agents/history/plan-[component-name].json",
    "sources_audited": [
      {
        "path": ".agents/skills/nextjs-create-component/SKILL.md",
        "scope_summary": "Extracted RSC boundary strategy, styling, i18n, TSDoc, and reflection rules"
      }
    ],
    "subtasks": [
      {
        "id": 1,
        "description": "Requirement alignment and TDD unit test creation ([ComponentName].test.tsx)",
        "workflow_phase_ref": "Step 4: Test-Driven Development (TDD)",
        "tool_intents": ["write_to_file"],
        "verification_criteria": "Unit test suite written matching component specification",
        "status": "pending"
      },
      {
        "id": 2,
        "description": "Component placement, skeleton, and responsive layout implementation",
        "workflow_phase_ref": "Step 5: Component & Responsive Variant Development",
        "tool_intents": ["write_to_file"],
        "verification_criteria": "Component and skeleton fallbacks created without lint or type errors",
        "status": "pending"
      },
      {
        "id": 3,
        "description": "Perform Self-Reflection & Quality Audit",
        "workflow_phase_ref": "Step 6: Self-Reflection & Quality Audit",
        "tool_intents": [],
        "verification_criteria": "Output mandatory Self-Reflection block with 3 adversarial checks",
        "status": "pending"
      },
      {
        "id": 4,
        "description": "Execute Unit Tests",
        "workflow_phase_ref": "Step 7: Unit Test Execution",
        "tool_intents": ["run_command"],
        "verification_criteria": "Run unit test runner with 0 errors via run_command tool",
        "status": "pending"
      }
    ],
    "eval_metrics": [
      "Zero CLS, full RTL support, 100% English TSDoc, clean build, unit tests pass"
    ],
    "risk_factors": ["Hydration mismatch, layout shift during data streaming"]
  }
  ```

- [ ] **Step 4: Test-Driven Development (TDD) - Write Unit Tests First**
  1. **Write Unit Tests First:** Based on the clarified specification, write the complete unit test file (`[ComponentName].test.tsx`) in `new_component_dir` (read from `docs/project.json`) BEFORE writing any component code. Ensure tests verify responsive layouts across desktop, tablet, and mobile breakpoints.
  2. **Comprehensive Test Scope:**
     - Props & Default Values (`@defaultValue`)
     - Interactive Client Callbacks & Event Handlers
     - Suspense & `<Skeleton>` rendering during loading states
     - Accessibility ARIA attributes (`role`, `aria-busy`, `aria-label`)
     - BiDi / RTL text orientation expectations
  3. **Testing TanStack Query Components:**
     - When testing components using `useQuery` or `useSuspenseQuery`, use a test harness with `QueryClientProvider` configured with `retry: false` and `gcTime: Infinity`.
     - Seed mock data directly into the test cache using `queryClient.setQueryData(cache.key(...), mockData)` to verify loaded data rendering, or leave unseeded inside `<Suspense fallback={<[ComponentName]Skeleton />}>` to verify fallback rendering without real network requests.
  4. **TDD Red-Green Loop:**
     - Write tests defining the contract (Red).
     - Implement component and skeleton fallbacks (Green) until all unit tests pass cleanly (`bun test`, `pnpm test`, or project runner).

- [ ] **Step 5: Component & Responsive Development**
      Develop the component (`[ComponentName].tsx`) and its skeleton fallback `[ComponentName]Skeleton.tsx` using Tailwind CSS responsive classes (e.g. `sm:`, `md:`, `lg:`) to handle mobile, tablet, and desktop layouts within a single file according to architectural guidelines and test requirements.

- [ ] **Step 6: Self-Reflection & Quality Audit (MANDATORY)**
      Before completing work, execute a **Self-Reflection Pass** and output the following critique block:

  ```markdown
  ### Self-Reflection & Quality Audit

  1. **Adversarial Edge-Case Checks:**
     - [ ] Mobile/Tablet Breakpoints: Verified layout behavior across small screens without horizontal scroll.
     - [ ] Loading & Skeleton Match: Verified `<Skeleton>` dimensions match loaded content exactly to prevent CLS.
     - [ ] Async Data & Empty States: Tested behavior when data lists are empty or API returns null.

  2. **Domain Rule Compliance Audit:**
     - [ ] RSC Purity: `"use client"` is isolated to leaf components; server components passed via `children`.
     - [ ] Styling Tokens: Used semantic tokens (`bg-background`) instead of hardcoded colors (`bg-blue-500`).
     - [ ] BiDi/RTL: Exclusively used Tailwind logical properties (`ms-`, `pe-`).
     - [ ] TSDoc Completeness: Fully annotated in English with `@param`, `@returns`, and `@defaultValue`.
     - [ ] Query Cache Hygiene: Explicit `staleTime` defined; zero relative fetch calls on server.

  3. **Identified Bugs & Corrections:**
     - Documented any layout shifts, hydration warnings, or missing ARIA labels identified and fixed.
  ```

- [ ] **Step 7: Unit Test Execution & Constraint Verification (MANDATORY SHELL EXECUTION)**

  > [!CRITICAL]
  > You MUST physically execute unit tests and constraint verification using the `run_command` tool before declaring completion or proceeding to Step 8. Do NOT skip this step, omit it from your plan, or present final handoff without calling `run_command`.
  1. **Run Constraint Verification Script:**
     - Run `npx tsx .agents/skills/nextjs-create-component/scripts/verify-component-files.ts [target_component_dir]` to verify component file, skeleton file, and test file exist.
  2. **Run Unit Tests (MUST use `run_command` tool):**
     - Execute project test runner (`bun test`, `npm test`, `jest`, or custom runner).
  3. **TDD Fix Loop:** If any unit test or constraint check fails, return to Step 5 to fix issues and re-run verification until all tests pass cleanly with 0 errors.

- [ ] **Step 8: Verification & Handoff**
  1. **Code Cleanup:** Mark debug code or temporary mock data with `// TODO: REMOVE BEFORE PRODUCTION`.
  2. **History Persistence Finalization:** Ensure all subtasks in `.agents/history/plan-[component-name].json` are updated with `"status": "completed"`.
  3. **Handoff Output:** Present completed work summary:
     - Component Name & File Path
     - Rendering & Caching Strategy (RSC / Client / ISR / TanStack Query Hydrated)
     - Dependencies & Imports
     - Props & Data Mutations
  4. **Git Operations:** Leave all git staging and committing entirely to the user. You may suggest conventional commit messages (e.g. `feat: add [ComponentName] UI component`).

---

## Reference Implementation Template

### Reference 1: Pure Server Component (`FeatureCard`)

#### 1. TDD Unit Test Contract (`FeatureCard.test.tsx`) - Written First

```tsx
import { render, screen } from "@testing-library/react";
import { FeatureCard, FeatureCardSkeleton } from "./FeatureCard";

describe("FeatureCard (TDD)", () => {
  const mockProps = {
    title: "Awesome Next.js Feature",
    description: "Build robust server components effortlessly.",
    imageUrl: "/images/feature.webp",
    href: "/features/nextjs",
    locale: "fa",
  };

  it("renders card title and description correctly", () => {
    render(<FeatureCard {...mockProps} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Awesome Next.js Feature",
    );
    expect(
      screen.getByText("Build robust server components effortlessly."),
    ).toBeInTheDocument();
  });

  it("renders localized link attribute", () => {
    render(<FeatureCard {...mockProps} />);
    const link = screen.getByRole("link", { name: /read more/i });
    expect(link).toHaveAttribute("href", "/fa/features/nextjs");
  });

  it("renders Skeleton fallback matching layout", () => {
    const { container } = render(<FeatureCardSkeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });
});
```

#### 2. Component Implementation (`FeatureCard.tsx`) - Implemented to Pass Tests

```tsx
import React, { Suspense } from "react";
import Image from "next/image";
import { Link } from "@vercel/react-transition-progress"; // Progress-aware Link for interactive cards & primary navigation
import { Graph } from "schema-dts";
import { cn } from "@/lib/utils";
import { localizePath } from "@/lib/path-list";

/**
 * Props for the FeatureCard component.
 */
export interface FeatureCardProps {
  /** Title of the feature card */
  title: string;
  /** Detailed description text */
  description: string;
  /** Image source URL relative or absolute */
  imageUrl: string;
  /** Navigation target path */
  href: string;
  /** Active user locale (e.g. 'fa' or 'en') */
  locale: string;
  /** Optional container class names @defaultValue `""` */
  className?: string;
}

/**
 * Renders a server-side cacheable feature card with responsive styling,
 * localized navigation, and schema.org structured data.
 *
 * @param props - Configuration properties for FeatureCard.
 * @returns A React Server Component rendering the localized feature card.
 */
export function FeatureCard({
  title,
  description,
  imageUrl,
  href,
  locale,
  className = "",
}: FeatureCardProps): React.JSX.Element {
  const localizedUrl = localizePath(href, locale);

  const jsonLd: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${localizedUrl}#webpage`,
        url: localizedUrl,
        name: title,
        description: description,
      },
    ],
  };

  return (
    <>
      {/* TODO: Validate this JSON-LD schema on https://validator.schema.org/ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article
        className={cn(
          "flex flex-col gap-4 p-6 rounded-lg border border-border bg-card text-card-foreground shadow-sm ms-0 pe-0 transition-all hover:shadow-md",
          className,
        )}
      >
        <div className="relative w-full h-48 overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        <Link
          href={localizedUrl}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline ms-auto"
        >
          Read More
        </Link>
      </article>
    </>
  );
}

/**
 * Skeleton fallback matching FeatureCard dimensions to prevent CLS.
 */
export function FeatureCardSkeleton(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-lg border border-border bg-muted/40 animate-pulse">
      <div className="w-full h-48 bg-muted rounded-md" />
      <div className="h-6 w-3/4 bg-muted rounded" />
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-1/4 bg-muted rounded ms-auto" />
    </div>
  );
}
```

---

### Reference 2: Dynamic Client Component with TanStack Query & Optimistic Mutations

#### 1. Shared Cache Contract (`product-cache.ts`)

```ts
import { queryOptions } from "@tanstack/react-query";

export interface Product {
  id: string;
  name: string;
  price: number;
  isFavorite: boolean;
}

export const productCache = {
  key: (id: string) => ["product", id] as const,
  tag: (id: string) => `product:${id}`,
  options: (id: string) =>
    queryOptions({
      queryKey: productCache.key(id),
      queryFn: async (): Promise<Product> => {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      },
      staleTime: 30_000,
    }),
};
```

#### 2. TDD Unit Test Contract (`ProductCard.test.tsx`) - Written First

```tsx
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { productCache } from "./product-cache";

function renderWithClient(ui: React.ReactElement, client: QueryClient) {
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
}

describe("ProductCard (TDD with useSuspenseQuery)", () => {
  it("renders cached product data when available", () => {
    const testClient = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: Infinity } },
    });

    testClient.setQueryData(productCache.key("prod-1"), {
      id: "prod-1",
      name: "Ergonomic Chair",
      price: 299,
      isFavorite: false,
    });

    renderWithClient(
      <Suspense fallback={<ProductCardSkeleton />}>
        <ProductCard id="prod-1" onToggleFavorite={jest.fn()} />
      </Suspense>,
      testClient,
    );

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Ergonomic Chair",
    );
    expect(screen.getByText("$299")).toBeInTheDocument();
  });

  it("renders Skeleton matching component dimensions during fallback", () => {
    const { container } = render(<ProductCardSkeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });
});
```

#### 3. Client Component with `useSuspenseQuery` & Optimistic Mutation (`ProductCard.tsx`)

```tsx
"use client";

import React from "react";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { productCache, type Product } from "./product-cache";

export interface ProductCardProps {
  id: string;
  onToggleFavorite: (id: string, nextStatus: boolean) => Promise<void>;
  className?: string;
}

export function ProductCard({
  id,
  onToggleFavorite,
  className = "",
}: ProductCardProps): React.JSX.Element {
  const queryClient = useQueryClient();
  const { data: product } = useSuspenseQuery(productCache.options(id));
  const queryKey = productCache.key(id);

  const mutation = useMutation({
    mutationFn: (nextStatus: boolean) => onToggleFavorite(id, nextStatus),
    onMutate: async (nextStatus) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Product>(queryKey);
      if (previous) {
        queryClient.setQueryData<Product>(queryKey, {
          ...previous,
          isFavorite: nextStatus,
        });
      }
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
  });

  return (
    <article
      className={cn(
        "flex flex-col gap-3 p-5 rounded-lg border border-border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {product.name}
        </h3>
        <button
          type="button"
          aria-label={product.isFavorite ? "Remove favorite" : "Add favorite"}
          onClick={() => mutation.mutate(!product.isFavorite)}
          className="text-sm font-medium text-primary hover:underline ms-2"
        >
          {product.isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>
      <p className="text-sm font-medium text-muted-foreground">
        ${product.price}
      </p>
    </article>
  );
}

export function ProductCardSkeleton(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-lg border border-border bg-muted/40 animate-pulse">
      <div className="h-6 w-2/3 bg-muted rounded" />
      <div className="h-4 w-1/4 bg-muted rounded" />
    </div>
  );
}
```

#### 4. Server Prefetch Wrapper (`ProductSection.tsx`)

```tsx
import { Suspense } from "react";
import {
  defaultShouldDehydrateQuery,
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { productCache } from "./product-cache";
import { getProductFromDb } from "@/lib/db/products"; // Direct server function (no relative fetch)
import { toggleFavoriteAction } from "@/app/actions/product";

interface ProductSectionProps {
  id: string;
}

export function ProductSection({ id }: ProductSectionProps): React.JSX.Element {
  return (
    <Suspense fallback={<ProductCardSkeleton />}>
      <ProductSectionData id={id} />
    </Suspense>
  );
}

async function ProductSectionData({
  id,
}: {
  id: string;
}): Promise<React.JSX.Element> {
  const queryClient = new QueryClient();

  // Non-blocking server prefetch (unawaited to allow route streaming)
  void queryClient.prefetchQuery({
    ...productCache.options(id),
    queryFn: () => getProductFromDb(id), // Direct DB call on server
  });

  return (
    <HydrationBoundary
      state={dehydrate(queryClient, {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      })}
    >
      <ProductCard id={id} onToggleFavorite={toggleFavoriteAction} />
    </HydrationBoundary>
  );
}
```
