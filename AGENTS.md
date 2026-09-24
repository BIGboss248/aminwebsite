# Agent Guidelines

## Agent skills

### Self-Repair & Continuous Learning (Always Active)

- **Always invoke `.agents/skills/self-repair`**: At session start and before starting any task, load and scan [`.agents/autofix.json`](file:///d:/Scripts/aminwebsite/.agents/autofix.json) to apply learned constraints and user preferences.
- **Rule Capture**: Whenever the user provides a correction, preference, or a mistake is diagnosed, immediately formulate an imperative rule and append it to [`.agents/autofix.json`](file:///d:/Scripts/aminwebsite/.agents/autofix.json).
- **Skill Synchronization**: Each time changes or updates are made to Next.js skills or any other skill in [`.agents/skills/`](file:///d:/Scripts/aminwebsite/.agents/skills/), also update/mirror the corresponding skill in [`d:\Scripts\Obsidian\skills`](file:///d:/Scripts/Obsidian/skills).

### Issue tracker

Issues and specs live in GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical triage roles mapped to repository labels. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout (`CONTEXT.md` and `docs/adr/`). See `docs/agents/domain.md`.

### Terminal Command Execution

- **Discrete Commands**: Never chain multiple terminal commands using `&&`, `||`, or `;` on a single line. Always execute terminal commands individually as discrete single operations.
- **Permission Alignment**: When running inspection or diagnostic commands (e.g., `git diff`, `git status`), avoid appending unnecessary file/path arguments unless specifically requested, ensuring commands cleanly match user-configured permission allowlists.

### Implementation Plan Tracking (Pages & Components)

- **Plan Item Checklist Updates**: Whenever creating, developing, or completing pages, sections, child components, or page-level infrastructure/SEO tasks (e.g., `page.tsx`, `loading.tsx`, `error.tsx`, `generateMetadata`, `JSON-LD Schema`, `generateStaticParams()`), immediately check off (`- [x]`) the corresponding items in [`docs/plan/05-pages-and-components.md`](file:///c:/scripts/aminwebsite/docs/plan/05-pages-and-components.md).
- **Page Completion Condition**: Mark a parent page item as completed (`- [x]`) in [`docs/plan/05-pages-and-components.md`](file:///c:/scripts/aminwebsite/docs/plan/05-pages-and-components.md) if and only when all of its individual component sub-checklists and page infrastructure/SEO tasks are completed.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
