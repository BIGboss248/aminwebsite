---
name: seo-ops
description: Setup, automate, and execute SEO audits, CI/CD pre-push/pre-deploy checks, and ranking optimizations using the seo CLI and MCP server.
---

# SEO Operations & Automation (`seo-ops`)

An end-to-end runbook for configuring the `seo` MCP server, integrating pre-push and CI/CD quality gates, and executing evidence-backed technical, programmatic, and ranking audits.

---

## Interactive Intent Routing

When `/seo-ops` is invoked, immediately prompt the user or inspect context to determine the objective:

1. **Pathway A: Repository CI/CD & Pre-Push Setup** (`setup-repo`)
   - Add pre-push git hooks and GitHub Actions workflows to audit builds before deployment.
2. **Pathway B: Agent MCP Server Configuration** (`setup-mcp`)
   - Configure the `seo` stdio MCP server in workspace or global Antigravity configurations.
3. **Pathway C: Audit, Diagnose & Rank Optimization** (`audit-and-optimize`)
   - Run technical audits against local (`localhost`) or live sites, parse structured findings, apply Next.js fixes, and verify.

---

## Pathway A: Repository CI/CD & Pre-Push Setup

Enforce zero-regression SEO gates in development and deployment pipelines:

- [ ] **1. Verify Prerequisites**:
  - Ensure Node.js 22+ is available in the environment (`node -v`).
  - Verify local package manager (`pnpm`, `npm`, `bun`).
- [ ] **2. Configure Local Pre-Push Hook**:
  - Add or update Husky/git pre-push hook to build the project and run:
    ```bash
    npx -y seo report --url http://127.0.0.1:3000 --actions-only --json
    ```
  - See [cicd-pipeline-guide.md](references/cicd-pipeline-guide.md) and [pre-push template](resources/templates/seo-ci.yml.template).
- [ ] **3. Install CI/CD Workflow**:
  - Scaffold GitHub Actions workflow (`.github/workflows/seo-check.yml`) from [seo-ci.yml.template](resources/templates/seo-ci.yml.template).
  - Configure background server spin-up, audit execution, and artifact generation.
- [ ] **4. Validate Pipeline**:
  - Execute native verification script:
    - Windows: `powershell -ExecutionPolicy Bypass -File .agents/skills/seo-ops/scripts/verify-seo-setup.ps1 -Mode cicd`
    - Linux/macOS: `bash .agents/skills/seo-ops/scripts/verify-seo-setup.sh -m cicd`

---

## Pathway B: Agent MCP Server Setup

Enable the AI agent to query 74 structured SEO reports through Model Context Protocol tools:

- [ ] **1. Verify Global CLI Installation**:
  - Ensure `seo` CLI binary is installed globally:
    ```bash
    npm install -g seo
    seo --version
    ```
- [ ] **2. Register MCP Server Configuration**:
  - Add the `seo` stdio entry to `.agents/mcp_config.json` (workspace) or `~/.gemini/config/mcp_config.json` (global):
    ```json
    {
      "mcpServers": {
        "seo": {
          "command": "npx",
          "args": ["-y", "seo", "mcp"]
        }
      }
    }
    ```
  - See [mcp-setup-guide.md](references/mcp-setup-guide.md).
- [ ] **3. Verify MCP Availability**:
  - Verify `seo mcp serve --test` exits with code 0.
  - Test tool availability (`seo_list_reports`, `seo_describe_report`, `seo_run_report`).
  - Execute native verification script:
    - Windows: `powershell -ExecutionPolicy Bypass -File .agents/skills/seo-ops/scripts/verify-seo-setup.ps1 -Mode mcp`
    - Linux/macOS: `bash .agents/skills/seo-ops/scripts/verify-seo-setup.sh -m mcp`

---

## Pathway C: Audit, Diagnose & Rank Optimization

Execute structured audits and apply code-level remediations following the official agent loop:

- [ ] **1. Select Audit Target**:
  - **Local Build Audit**: Start local Next.js server (`pnpm build && pnpm start`) and run:
    ```bash
    seo report --url http://127.0.0.1:3000 --actions-only --json
    ```
  - **Live Search Console Audit**: Run `seo report` (or `seo quick-wins` / `seo second-page` / `seo pseo-patterns`).
- [ ] **2. Discover & Describe Specific Report (if using MCP)**:
  - Call `seo_list_reports` to discover available report IDs by category.
  - Call `seo_describe_report` to retrieve JSON Schema, `readOrder`, `doNotClaim`, and verification rules.
  - Call `seo_run_report` with bounded JSON parameters (use `view: "actions"` for action queues).
- [ ] **3. Triage & Remediate Findings**:
  - Inspect `findings`, `inventories`, data status, and caveats.
  - Assign explicit outcome to every item:
    - For fixes: `fixed`, `deferred`, or `not-needed`.
    - For reviews: `changed`, `no-change`, or `deferred`.
  - Address **Metadata**: Fix `generateMetadata()`, canonical URLs, OpenGraph, robots tags in `page.tsx`/`layout.tsx`.
  - Address **Structured Data**: Fix JSON-LD schema components (`Organization`, `WebSite`, `BreadcrumbList`).
  - Address **i18n / Routes**: Fix `hreflang`, locale alternates, and `sitemap.ts`.
  - Refer to [ranking-optimization-guide.md](references/ranking-optimization-guide.md) for remediation matrices.
- [ ] **4. Verify Remediation**:
  - Re-run `seo audit-page --url <target-url>` to confirm clean zero-finding status.

---

## Edge Cases & Known Pitfalls

- **Node Version Requirement**: `seo` requires Node 22+. Check `node --version` before initiating.
- **Port Availability in CI/CD**: Ensure the background dev/start server is fully healthy and responding on the specified port before executing `seo report`.
- **Command Chaining Restriction**: Never chain terminal commands (`&&`, `||`, `;`) when configuring hooks or running scripts; invoke single discrete commands.
- **Evidence Separation**: Never treat missing or partial data as zero. Keep observed crawl data strictly separate from external provider estimates.
- **No Unverifiable Guarantees**: Never promise exact ranking positions or traffic numbers; focus on verifiable technical and structural remediations.

---

## Reference Guides & Resources

- [MCP Setup & Tool Reference](references/mcp-setup-guide.md)
- [CI/CD & Pre-Push Pipeline Guide](references/cicd-pipeline-guide.md)
- [SEO Ranking & Code Remediation Guide](references/ranking-optimization-guide.md)
- [GitHub Actions CI Workflow Template](resources/templates/seo-ci.yml.template)
- [MCP Config JSON Template](resources/templates/mcp_config.template.json)
