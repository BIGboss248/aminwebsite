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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
