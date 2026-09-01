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
