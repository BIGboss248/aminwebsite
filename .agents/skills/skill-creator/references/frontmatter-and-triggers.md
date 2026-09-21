# Frontmatter & Triggers Guide

The `description` in YAML frontmatter is the single most critical field in a skill. In modern agent systems (like Google Antigravity, Claude Code, Cursor, Windsurf), skills use **progressive disclosure**: the body of `SKILL.md` is **not** loaded into context by default. The agent only sees the skill's `name` and `description` to decide whether to activate it.

---

## 1. Specification Requirements

According to the Open Agent Skills specification (`agentskills.io`):

| Field             | Type   | Constraints                                                                                                                                          | Best Practice                                                                              |
| :---------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| **`name`**        | String | 1–64 characters. Only lowercase alphanumeric (`a-z`, `0-9`) and hyphens (`-`). Cannot start/end with `-` or contain `--`. Must match directory name. | Be descriptive and concise: `docker-deploy`, `nextjs-component-dev`, `skill-creator`.      |
| **`description`** | String | 1–1024 characters.                                                                                                                                   | Clearly declare **what** the skill accomplishes and **when / trigger phrases** to load it. |
| **`license`**     | String | Optional. SPDX identifier (e.g. `Apache-2.0`, `MIT`).                                                                                                | Include if sharing publicly.                                                               |
| **`metadata`**    | Map    | Optional. String key-value pairs (e.g. `version`, `author`).                                                                                         | Use for versioning or plugin associations.                                                 |

---

## 2. Writing High-Trigger Descriptions

### The Golden Rule

> **"A good description triggers when it should, and never triggers when it shouldn't."**

### 3 Core Principles

1. **Instruction & Intent Framing**: Describe user intent and tasks rather than low-level implementation details.
   - ❌ _Weak_: "Runs docker build and docker-compose up with healthcheck flags."
   - ✅ _Strong_: "Build, containerize, and deploy production Docker images. Use when containerizing applications, writing Dockerfile, generating docker-compose.yml, or troubleshooting container build failures."
2. **Third-Person Perspective**: Write in the third person.
   - ❌ _Weak_: "I can help you review your code."
   - ✅ _Strong_: "Review code for performance bottlenecks, security vulnerabilities, and adherence to team style guides. Use when the user asks for a PR review or code audit."
3. **Keyword & Trigger Phrase Richness**: Include exact terms, slash commands, or scenarios users frequently mention.
   - Example triggers: _"create a new skill"_, _"review my UI"_, _"audit database migrations"_, _"migrate from pages router"_.

---

## 3. Description Anti-Patterns to Avoid

| Anti-Pattern                                                                      | Why It Fails                                                                   | Better Alternative                                                                                                                                      |
| :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Vague / Over-general** (`"Helps with Next.js development."`)                    | Triggers on every single Next.js prompt, polluting context and wasting tokens. | `"Configure Next.js OpenTelemetry, tracing, and metrics instrumentation. Use when adding OTel, debugging request spans, or configuring APM exporters."` |
| **Implementation Dump** (`"Parses AST with Babel then runs ESLint with rule X."`) | Fails to match natural user queries like "check accessibility".                | Focus on what problem it solves: `"Audit UI components for accessibility (WCAG AA/AAA) and semantic HTML."`                                             |
| **Overly Narrow** (`"Only for editing file /src/auth/token.ts."`)                 | Too rigid for general workflows.                                               | Use workspace rules or targeted scripts instead.                                                                                                        |

---

## 4. Multi-Line YAML Frontmatter Formatting

Always use YAML folded block scalars (`>-`) for clean multi-line readability:

```yaml
---
name: nextjs-i18n-setup
description: >-
  Configure and manage internationalization (i18n) in Next.js applications using next-intl
  with root messages directory. Use when adding multi-language support, setting up localized
  routing, configuring locale detection, or translating UI strings.
---
```
