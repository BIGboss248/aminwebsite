# AI Skill Templates & Boilerplates

Use these ready-to-use templates as starting points for common types of AI skills.

---

## 1. Workflow / Runbook Skill Template

Best for multi-step tasks like deployment, migrations, setups, or audits.

```markdown
---
name: service-migration
description: >-
  Migrate database tables and application services from legacy schema to v2 schema.
  Use when the user asks to "migrate database", "run schema migration", or "upgrade service models".
---

# Service Migration Skill

Step-by-step procedure for executing database schema and service migrations safely.

## Prerequisites & Checklist

- [ ] Database credentials configured in `.env.local`
- [ ] Working branch created (`git checkout -b chore/migrate-schema`)

## Step-by-Step Procedure

### 1. Pre-Migration Audit

1. Run the audit script to check for breaking schema changes:
   `powershell -ExecutionPolicy Bypass -File ./scripts/audit_schema.ps1`
2. Review audit logs in `logs/audit.json`.

### 2. Apply Migrations

1. Run the migration command: `pnpm run migrate:v2`
2. Validate foreign key constraints.

## Edge Cases & AI Pitfalls

- **Soft Deletes**: Always verify queries include `WHERE deleted_at IS NULL`.
- **Lock Contention**: Never run direct `ALTER TABLE` on tables exceeding 100k rows without batching.

## Verification & Self-Check

- [ ] Run test suite: `pnpm test:integration`
- [ ] Verify healthcheck endpoint returns 200 OK.
```

---

## 2. Tool / CLI Wrapper Skill Template

Best for teaching an agent how to use a specific CLI tool or library (e.g. Docker, Android CLI, Stitch).

````markdown
---
name: cli-tool-helper
description: >-
  Execute and automate workflows with the MyTool CLI. Use when running MyTool commands,
  troubleshooting CLI flags, or configuring tool options.
---

# MyTool CLI Helper

Runbook for invoking `mytool` commands safely and accurately.

## Command Reference Matrix

| Goal          | Command        | Flags / Options          |
| :------------ | :------------- | :----------------------- |
| Build release | `mytool build` | `--release --minify`     |
| Run linter    | `mytool lint`  | `--fix --max-warnings=0` |

## Execution Guidelines

1. Always run commands using single, isolated operations.
2. Check tool exit code. If non-zero, consult [troubleshooting.md](./references/troubleshooting.md).

## Output Template

Format the summary as:

```text
[MyTool Execution Report]
Status: SUCCESS / FAILURE
Artifacts: <list of generated files>
Warnings: <list of warnings>
```
````

````

---

## 3. Architecture & Review Skill Template

Best for design review, spec-driven development, code quality audits, or security inspections.

```markdown
---
name: security-audit
description: >-
  Audit codebase for security vulnerabilities, API key exposure, missing authentication middleware,
  and improper database permissions. Use when reviewing code for security or conducting a PR security audit.
---

# Security Audit Skill

Guide for conducting comprehensive application security reviews.

## Top Vulnerability Vectors to Inspect
1. **Exposed Credentials**: Verify no `.env` files or secrets are committed.
2. **Missing Auth Middleware**: Ensure all private routes check session tokens.
3. **Database RLS / Permissions**: Verify Row Level Security is enabled.
4. **Input Sanitization**: Ensure user inputs are validated before database queries.

## Review Workflow
1. Scan touched files for vulnerability vectors.
2. Formulate findings using the [Security Report Template](./references/report-template.md).
3. Provide concrete code diffs to remediate identified issues.
````
