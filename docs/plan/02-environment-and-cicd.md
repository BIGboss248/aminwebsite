# Phase 2: Environment, Testing & CI/CD

---

## Deliverables & Status

- [x] **2.1 Package Manager**
  - [x] Select and configure package manager (`pnpm@11.22.0` with `pnpm-lock.yaml`)
- [x] **2.2 Next.js Workspace Initialization**
  - [x] Initialize Next.js 16 App Router project with TypeScript and Tailwind CSS v4
- [x] **2.3 Agent Documentation & MCP Tools**
  - [x] Enforce reading `node_modules/next/dist/docs/` as the primary source of truth in `AGENTS.md`
  - [x] Document terminal constraints, permission alignment, and self-repair integration in `AGENTS.md`
  - [x] Configure workspace `mcp.json` (`next-devtools-mcp`, Playwright MCP, `codebase-memory`)
  - [x] Configure global AGY host MCP configurations
- [x] **2.4 Testing Infrastructure**
  - [x] Configure Jest for unit/integration tests (`jest.config.ts`, `jsdom`, React Testing Library)
  - [x] Configure Playwright for end-to-end testing across Chromium, Firefox, and WebKit (`playwright.config.ts`)
  - [x] Set up unified pre-push test script (`pnpm run test:all`)
- [x] **2.5 CI/CD & Production Containerization**
  - [x] Configure multi-stage production Dockerfile (`Dockerfile`, `docker-compose.yml`, `docker-compose.prod.yml`, `.dockerignore`) for standalone output
  - [x] Configure Husky git hooks (`pre-commit`, `pre-push`) with Commitlint conventional commits
  - [x] Configure semantic versioning and release automation in [`docs/operations/release-automation.md`](file:///c:/scripts/aminwebsite/docs/operations/release-automation.md)
