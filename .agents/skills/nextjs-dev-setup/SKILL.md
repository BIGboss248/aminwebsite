---
name: nextjs-dev-setup
description: >-
  Bootstrap, configure, and verify the complete Next.js App Router development environment, project metadata, testing suites, MCP servers, styling linters, Docker containerization, git hooks, and CI/CD pipelines. Use when the user asks to "setup nextjs dev environment", "start a nextjs project", "containerize nextjs app", or triggers "/nextjs-dev-setup".
metadata:
  author: BIGboss248
  version: "2.3"
---

# Next.js Development Setup (`nextjs-dev-setup`)

A structured, end-to-end orchestration runbook for establishing, configuring, and verifying the Next.js App Router development environment and single source of truth at `docs/project.json`.

---

## Pre-Conditions & Discovery

- [ ] **Zero-Interruption Scan**: Scan existing repository files (`package.json`, lockfiles, stylesheets, `docs/adr/*.md`, `docs/plan.md`, `CONTEXT.md`) before asking questions.
- [ ] For complete property specifications and automated discovery rules, consult [project-json-schema.md](./references/project-json-schema.md).

---

## Step-by-Step Execution Flow

### Stage 1: Project Metadata (`docs/project.json`)

1. Create `docs/` directory if absent.
2. Initialize `docs/project.json` using [project.template.json](./resources/templates/project.template.json).
3. If and only if required fields cannot be deduced from repository files, confirm only the missing fields with the user.

### Stage 2: Testing Suites (Jest, Playwright & Storybook)

> [!IMPORTANT]
> **No Dummy Test Files (Rule 3):** Do not create placeholder/sample test or story files in the user workspace. Configure framework files and scripts only. Sample patterns are available in [sample-component.test.tsx](./examples/sample-component.test.tsx), [sample-navigation.spec.ts](./examples/sample-navigation.spec.ts), and [sample-component.stories.tsx](./examples/sample-component.stories.tsx).

1. **Jest Unit Testing**: Configure [jest.config.ts.template](./resources/templates/jest.config.ts.template) and [jest.setup.ts.template](./resources/templates/jest.setup.ts.template).
2. **Playwright E2E**: Configure [playwright.config.ts.template](./resources/templates/playwright.config.ts.template) and install browsers (`pnpm exec playwright install --with-deps chromium firefox webkit`).
3. **Storybook Workshop**: Configure [.storybook/main.ts](./resources/templates/storybook-main.ts.template) and [.storybook/preview.tsx](./resources/templates/storybook-preview.tsx.template).
4. Review testing architecture in [testing-and-storybook-guide.md](./references/testing-and-storybook-guide.md).

### Stage 3: Dual MCP Server Configuration

> [!IMPORTANT]
> **Antigravity Global MCP Loading Rule:** Antigravity (AG) only loads MCP servers configured globally on the host system (`~/.gemini/antigravity/mcp_config.json` and `~/.gemini/config/mcp_config.json`). Workspace-level `mcp.json` is maintained for portability. Both must be configured.

1. Configure `next-devtools`, `playwright`, `storybook`, and `codebase-memory-mcp`.
2. **Stutter Prevention**: Ensure `auto_watch = false` via `codebase-memory-mcp config set auto_watch false` and deploy root [.cbmignore](./resources/templates/cbmignore.template).
3. Review full server specs in [mcp-configuration-guide.md](./references/mcp-configuration-guide.md).

### Stage 4: Agent-First Design System Linting (`@shadcn/lint`)

1. Install `@shadcn/lint` devDependency.
2. Configure ESLint flat config using [eslint.config.mjs.template](./resources/templates/eslint.config.mjs.template).
3. Review rule mechanics in [styling-and-linting-guide.md](./references/styling-and-linting-guide.md).

### Stage 5: Standalone Production Docker Containerization

1. Enable `output: "standalone"` in `next.config.ts`.
2. Deploy [Dockerfile.template](./resources/templates/Dockerfile.template), [docker-compose.yml.template](./resources/templates/docker-compose.yml.template), [docker-compose.prod.yml.template](./resources/templates/docker-compose.prod.yml.template), and [dockerignore.template](./resources/templates/dockerignore.template).
3. Review architecture in [docker-containerization-guide.md](./references/docker-containerization-guide.md).

### Stage 6: Git Hooks & Credit-Optimized CI/CD

1. Install `husky`, `@commitlint/cli`, `@commitlint/config-conventional`.
2. Configure [commitlint.config.mjs.template](./resources/templates/commitlint.config.mjs.template) and `.husky/commit-msg`.
3. Configure `.husky/pre-push` to execute dual test suites: `pnpm run test:all`.
4. Deploy [.github/workflows/release-please.yml](./resources/templates/release-please.yml.template) with `.next/cache` build caching and multi-arch matrix publishing.
5. Review CI/CD caching layers in [cicd-and-release-automation-guide.md](./references/cicd-and-release-automation-guide.md).

---

## Verification & Sanity Check

- [ ] Execute configuration verification script:
  - **Windows (PowerShell)**:
    ```powershell
    powershell -ExecutionPolicy Bypass -File .agents/skills/nextjs-dev-setup/scripts/verify-project-config.ps1
    ```
  - **Linux / macOS (Bash)**:
    ```bash
    bash .agents/skills/nextjs-dev-setup/scripts/verify-project-config.sh
    ```
- [ ] Fix any reported errors and re-verify until all checks pass.

---

## Edge Cases & Known AI Pitfalls

- **Chained Commands**: Never chain commands with `&&` or `;` on a single line in terminal execution.
- **MCP Disabling**: In AG global configs, `agy.exe` ignores `"disabled": true` inside `mcpServers`. Move disabled servers outside `mcpServers`.
- **Docker Image Names**: Docker OCI naming strictly requires lowercase repository names (`IMAGE_NAME=$(echo ... | tr '[:upper:]' '[:lower:]')`).
- **Storybook Intl Context**: Always wrap Storybook stories rendering `Link` or `useTranslations` with `NextIntlClientProvider` to prevent `No intl context found` errors.

---

## Output Execution Report Template

```markdown
## 🛠️ Next.js Dev Setup Execution Report

| Step / Component                     | Target File(s) / Resource                                                                              | Status                          | Notes / Details                                                                  |
| :----------------------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------------ | :------------------------------------------------------------------------------- |
| **1. Project Metadata**              | `docs/project.json`                                                                                    | `[IMPLEMENTED]` / `[UNTOUCHED]` | Configured package manager, directories, animation & i18n metadata.              |
| **2. Core Dependencies**             | `package.json`, Lockfile                                                                               | `[IMPLEMENTED]` / `[UNTOUCHED]` | Verified React, Next.js, styling, and motion libraries.                          |
| **3. Next.js Dev Server MCP**        | `~/.gemini/antigravity/mcp_config.json`, `mcp.json`, `.agents/plugins/workspace-tools/mcp_config.json` | `[IMPLEMENTED]` / `[UNTOUCHED]` | Configured Next.js Dev Server (`next-devtools`) globally for AG & in workspace.  |
| **4. Playwright & Playwright MCP**   | `playwright.config.ts`, `~/.gemini/antigravity/mcp_config.json`, `mcp.json`                            | `[IMPLEMENTED]` / `[UNTOUCHED]` | Verified test runner, browser binaries & Playwright MCP globally & in workspace. |
| **5. Codebase Memory & Stutter Fix** | `.cbmignore`, `mcp.json`, `~/.gemini/antigravity/mcp_config.json`, `auto_watch=false`                  | `[IMPLEMENTED]` / `[UNTOUCHED]` | Registered MCP, configured .cbmignore exclusions, and disabled session watcher.  |
| **6. Jest Unit Testing**             | `jest.config.ts`, `jest.setup.ts`                                                                      | `[IMPLEMENTED]` / `[UNTOUCHED]` | Configured Next.js Jest transformer, jsdom environment & test-dom.               |
| **7. Storybook & Storybook MCP**     | `.storybook/main.ts`, `.storybook/preview.tsx`, `mcp.json`, `~/.gemini/antigravity/mcp_config.json`    | `[IMPLEMENTED]` / `[UNTOUCHED]` | Configured Storybook Vite, a11y, themes & Storybook AI MCP globally & workspace. |
| **8. Agent-First Tailwind Linter**   | `eslint.config.mjs`, `package.json`                                                                    | `[IMPLEMENTED]` / `[UNTOUCHED]` | Configured `@shadcn/lint` for agent verification of design tokens and contracts. |
| **9. Docker Containerization**       | `Dockerfile`, `docker-compose.yml`, `docker-compose.prod.yml`, `.dockerignore`                         | `[IMPLEMENTED]` / `[UNTOUCHED]` | Multi-stage standalone production container & local/GHCR Docker Compose stacks.  |
| **10. Husky Git Hooks**              | `.husky/commit-msg`, `.husky/pre-push`                                                                 | `[IMPLEMENTED]` / `[UNTOUCHED]` | Enforces dual pre-push test suite (Jest + Playwright) & commitlint.              |
| **11. Commitlint Config**            | `commitlint.config.mjs`                                                                                | `[IMPLEMENTED]` / `[UNTOUCHED]` | Configured `@commitlint/config-conventional`.                                    |
| **12. Release & CI Build Caching**   | `.github/workflows/release-please.yml`                                                                 | `[IMPLEMENTED]` / `[UNTOUCHED]` | Next.js build cache (.next/cache), SemVer release PRs & GHCR multi-arch pkg.     |
| **13. Environment Verification**     | `scripts/verify-project-config.ps1` / `.sh`                                                            | `[PASSED]`                      | Sanity check passed with zero errors.                                            |

#### Status Definitions:

- **`[IMPLEMENTED]`**: Freshly created, installed, or modified during this setup run.
- **`[UNTOUCHED]`**: Already properly configured prior to running the skill; preserved as-is.
- **`[SKIPPED]`**: Intentionally omitted (e.g. optional tooling or user preference).
```

#### Git Commit Output

Group files and generate a commit message summarizing the changes made during the setup process. Output the commit commands without running them directly, leaving committing to the user.
