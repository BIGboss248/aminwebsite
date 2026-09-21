# Progressive Disclosure & Context Management

Progressive disclosure is an architectural pattern that keeps AI agents fast, precise, and cost-effective by loading instructions and documentation **only when needed**.

---

## 1. Why Progressive Disclosure Matters

- **Context Window Conservation**: Even with large context windows (1M+ tokens), dumping large documentation sets into system prompts causes "needle in a haystack" degradation, increasing hallucinations and instruction drift.
- **Speed & Latency**: Shorter prompts process significantly faster and cost less.
- **Modularity**: Sub-topics can be updated independently without rewriting the primary runbook.

---

## 2. Directory Separation Strategy

Organize your skill repository cleanly across these layers:

```text
skills/<skill-name>/
├── SKILL.md                 # Layer 1: Core Workflow & Orchestration (~100-300 lines)
├── references/              # Layer 2: On-Demand Technical Manuals & Checklists
│   ├── api-reference.md
│   └── error-handbook.md
├── scripts/                 # Layer 3: Executable CLI Helpers (.ps1 / .sh)
│   └── run_checks.ps1
├── examples/                # Layer 4: Reference Code Snippets
│   └── good-patterns.ts
└── resources/               # Layer 5: Assets, JSON Schemas, Templates
    └── config-template.json
```

---

## 3. How to Structure `SKILL.md` (Layer 1)

The main `SKILL.md` is an **orchestrator and runbook**, not a general encyclopedia:

- Keep it strictly focused on:
  1. What prerequisite tools/files are needed.
  2. The step-by-step checklist of execution.
  3. Where to find deeper docs when a specific branch or error occurs.
  4. How to verify that the task is finished.
- Link to reference files using standard relative markdown links:
  ```markdown
  If configuring OAuth2 providers, follow the detailed setup in [oauth-setup.md](./references/oauth-setup.md).
  ```

---

## 4. Authoring Guidelines for `references/` (Layer 2)

- **Single-Topic Focus**: Keep each reference file dedicated to one specific topic (e.g. `caching-rules.md`, `database-schema.md`, `error-recovery.md`).
- **Concise Tables & Bullet Points**: Prefer structured tables and short checklists over long paragraphs.
- **No Redundancy**: Avoid repeating instructions already stated in `SKILL.md`.

---

## 5. Script Design Guidelines (`scripts/`)

- Provide native scripts for both major environments: `.ps1` for PowerShell (Windows) and `.sh` for POSIX shells (Linux/macOS).
- Always support a `--help` / `-Help` flag explaining inputs and expected outputs.
- Write self-contained scripts or clearly fail early with human-readable error messages if dependencies are missing.
- Ensure scripts return standard exit codes (`0` for success, non-zero for error) so agents can interpret task status unambiguously.
