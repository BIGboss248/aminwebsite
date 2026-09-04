---
name: nextjs-dev-setup
description: Use when user wants to setup a dev environment for a NextJS project, configure project settings, setup Jest unit testing and Playwright E2E testing, setup Next.js and Playwright MCP servers, configure Docker standalone production containerization (Dockerfile, docker-compose.yml, and .dockerignore), setup git hooks and commitlint, or configure Release Please automation with multi-arch (AMD64 & ARM64) GitHub Container Registry (GHCR) package deployment and credit-optimized Next.js CI build caching (.next/cache). Triggers on "/NextJS-dev-Setup", "setup my nextjs dev environment", "start a nextJS project", "containerize nextjs app", "deploy package on release", or when configuring/creating docs/project.json or mcp.json.
metadata:
  author: BIGboss248
  version: "2.0"
---

# Next.js Development Setup & Project Configuration Skill (`nextjs-dev-setup`)

This skill establishes, validates, and initializes the Next.js development environment, automatically scanning repository files and documentation in `docs/` to discover project configuration and maintain the single source of truth at `docs/project.json`.

---

## 1. Project Configuration Schema (`docs/project.json`)

The `docs/project.json` file is the mandatory single source of truth for component creation, package manager, styling rules, animation engines, testing suites, and internationalization across all agent skills (such as `nextjs-create-component`).

### Complete Properties Specification (`project_context_and_metadata`)

| Property Name             | Type                  | Description                                                                 | Discovery / Example                                                                                      |
| :------------------------ | :-------------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `package_manager`         | `string`              | Package manager used in the project (`"pnpm"`, `"npm"`, `"yarn"`, `"bun"`). | Auto-discovered from lockfiles or `package.json` `"packageManager"`.                                     |
| `new_component_dir`       | `string`              | Target directory where components, skeletons, and unit tests are created.   | Auto-discovered from `app/` or `src/` (e.g. `"app/components"` or `"src/components"`).                   |
| `style_file_dir`          | `string`              | Relative path to the global CSS / theme stylesheet.                         | Auto-discovered from stylesheet path (e.g. `"app/globals.css"` or `"src/app/globals.css"`).              |
| `component_library`       | `string`              | UI component library or design system adopted in the project.               | Discovered from `package.json` dependencies / `docs/` (e.g. `"shadcn/ui"`, `"radix-ui"`, `"none"`).      |
| `animation_library`       | `Array<string>`       | Motion and animation libraries used for complex animations.                 | Discovered from `package.json` / `docs/adr/` (e.g. `["gsap"]`, `["framer-motion"]`, `["none"]`).         |
| `testing_library`         | `Array<string>`       | Testing frameworks and libraries configured in the project.                 | Discovered from `package.json` / config files (e.g. `["jest", "playwright", "@testing-library/react"]`). |
| `supported_languages`     | `Array<LocaleObject>` | List of supported locales with direction, currency, and calendar metadata.  | Discovered from `docs/adr/`, `docs/project-plan.md`, or `CONTEXT.md`.                                    |
| `dictionaries_dir`        | `string`              | Relative directory path for i18n translation message catalogs.              | Defaults to `"messages"` (or `"src/messages"` / `"dictionaries"`).                                       |
| `dictionary_file_pattern` | `string`              | Filename naming pattern for locale translation JSON files.                  | Defaults to `"[locale].json"`.                                                                           |

#### Locale Object Schema (`supported_languages[...]`)

Each entry in the `supported_languages` array contains:

- **`language_code`** (`string`): ISO 639-1 two-letter language code (e.g. `"en"`, `"fa"`, `"ar"`, `"de"`, `"fr"`).
- **`country_code`** (`string`): ISO 3166-1 alpha-2 country code (e.g. `"US"`, `"IR"`, `"GB"`, `"DE"`).
- **`currency_code`** (`string`): ISO 4217 three-letter currency code (e.g. `"USD"`, `"IRR"`, `"EUR"`, `"GBP"`).
- **`direction`** (`string`): Reading direction — strictly `"ltr"` (Left-to-Right) or `"rtl"` (Right-to-Left).
- **`native_name`** (`string`): Autonym / native display name of the language (e.g. `"English"`, `"فارسی"`, `"العربية"`).
- **`calendar_type`** (`string`): Primary calendar system (e.g. `"gregorian"`, `"persian"`, `"islamic"`).

---

## 2. Standard `docs/project.json` Template

```json
{
  "project_context_and_metadata": {
    "package_manager": "pnpm",
    "new_component_dir": "app/components",
    "style_file_dir": "app/globals.css",
    "component_library": "shadcn/ui",
    "animation_library": ["gsap"],
    "testing_library": [
      "jest",
      "playwright",
      "@testing-library/react",
      "@testing-library/jest-dom"
    ],
    "supported_languages": [
      {
        "language_code": "en",
        "country_code": "US",
        "currency_code": "USD",
        "direction": "ltr",
        "native_name": "English",
        "calendar_type": "gregorian"
      },
      {
        "language_code": "fa",
        "country_code": "IR",
        "currency_code": "IRR",
        "direction": "rtl",
        "native_name": "فارسی",
        "calendar_type": "persian"
      }
    ],
    "dictionaries_dir": "messages",
    "dictionary_file_pattern": "[locale].json"
  }
}
```

---

## 3. Step-by-Step Setup & Configuration Workflow

### Step 1: Automated Docs & Repository Scan (Zero Interruption Rule)

> [!IMPORTANT]
> **DO NOT ASK THE USER IF INFORMATION IS FOUND IN `docs/` OR REPOSITORY FILES.**
> Scan the repository files and documentation in `docs/` first. Automatically extract all available configurations. Only prompt the user for fields that are genuinely missing, unresolvable, or ambiguous.

1. **Scan `docs/` and Root Documentation:**
   - Scan `docs/project-plan.md`, `docs/plan.md`, `docs/adr/*.md`, `docs/agents/*.md`, and `CONTEXT.md`.
   - Extract architectural choices:
     - **Languages & Directionality:** Check `docs/adr/0001-bilingual-i18n-and-directionality.md`, `docs/project-plan.md`, or `CONTEXT.md` for language list (e.g. `en` and `fa`, LTR and RTL).
     - **Animation & UI Stack:** Check `docs/adr/0002-local-mdx-and-gsap-interaction-stack.md` or `docs/project-plan.md` (e.g. GSAP, Tailwind CSS, shadcn/ui).
     - **Testing Frameworks:** Check `package.json` dependencies / config files (e.g. `jest.config.ts`, `playwright.config.ts`, `jest`, `@playwright/test`, `@testing-library/react`).

2. **Scan Package Manager (Automated Detection):**
   - Inspect `package.json` for `"packageManager"` field (e.g., `"packageManager": "pnpm@11.22.0"` -> `"pnpm"`).
   - Check lockfiles present in workspace:
     - `pnpm-lock.yaml` -> `"pnpm"`
     - `bun.lockb` / `bun.lock` -> `"bun"`
     - `yarn.lock` -> `"yarn"`
     - `package-lock.json` -> `"npm"`

3. **Scan Project Layout & Stylesheet Paths:**
   - Check whether the repository uses `src/app/` or `app/`:
     - If `app/` exists at root -> set `new_component_dir` to `"app/components"`.
     - If `src/app/` exists -> set `new_component_dir` to `"src/components"`.
   - Locate global stylesheet:
     - Check `app/globals.css`, `src/app/globals.css`, `app/global.css`, `src/styles/globals.css` -> set `style_file_dir`.

4. **Scan Installed Dependencies (`package.json`):**
   - Check `dependencies` and `devDependencies`:
     - Component libraries: `radix-ui`, `shadcn`, `@headlessui/react`, etc.
     - Animation libraries: `gsap`, `@gsap/react`, `framer-motion`, `motion`, `tailwind-animate` (stored as an array of strings in `animation_library`).
     - Testing libraries: `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@playwright/test`, `playwright` (stored as an array of strings in `testing_library`).
     - Git hooks & commit standards: `husky`, `@commitlint/cli`, `@commitlint/config-conventional`, `lint-staged`.

---

### Step 2: Fallback Questionnaire (Only for Undetermined Fields)

If and ONLY if any required properties could not be deduced from `docs/` or repository files, prompt the user specifically for those missing fields:

```markdown
### 📋 Next.js Project Configuration Confirmation

The following properties could not be automatically determined from docs/ or repo files. Please confirm or provide:

[List only the undetermined properties]
```

_(If all properties were successfully discovered during Step 1, proceed directly to Step 3 without asking questions.)_

---

### Step 3: Create or Update `docs/project.json`

1. Ensure the `docs/` directory exists.
2. Write or update `docs/project.json` with the complete `project_context_and_metadata` JSON object.
3. Validate that target directory (`new_component_dir`) and `style_file_dir` exist or create placeholder directories/files as needed.

---

### Step 4: Verify Next.js Dependencies & Dev Environment

1. **Verify Core Tooling with Detected `package_manager`:**
   - React & Next.js versions (e.g. Next.js 15+ / 16+, React 19)
   - Styling tools: Tailwind CSS, `clsx`, `tailwind-merge`
   - Route transition progress: `@vercel/react-transition-progress`
   - Animation libraries: configured entries in `animation_library` (e.g. `["gsap", "@gsap/react"]`)
   - SEO / Structured data: `schema-dts`
   - Testing libraries: configured entries in `testing_library` (e.g. `["jest", "playwright", "@testing-library/react", "@testing-library/jest-dom"]`)
   - Git hook & commit tooling: `husky`, `@commitlint/cli`, `@commitlint/config-conventional`
2. **Install Any Missing Required Packages:**
   - Run the detected package manager (e.g. `pnpm add ...` or `bun add ...`) for any missing dependencies.
3. **Verify Script Setup:**
   - Ensure `package.json` contains appropriate `dev`, `build`, `lint`, and `test` scripts.

---

### Step 5: Setup Next.js Dev Server MCP Server (`next-devtools`)

Model Context Protocol (MCP) servers equip AI coding agents with direct runtime inspection, dev server telemetry, and automated route evaluation.

1. **Configure Next.js Dev Server MCP (`next-devtools` / `@modelcontextprotocol/server-nextjs`):**
   - Enables the agent to query live Next.js compilation status, inspect runtime/build errors, list active routes, clear cache, and evaluate browser scripts against the running dev server on port 3000.
   - Package: `next-devtools`

2. **Standard MCP Server Configuration (`.vscode/mcp.json` / `mcp.json`):**
   - Create or update `mcp.json` or `.vscode/mcp.json` with the following configuration:

```json
{
  "mcpServers": {
    "next-devtools": {
      "command": "npx",
      "args": ["-y", "next-devtools"]
    }
  }
}
```

---

### Step 6: Setup Playwright End-to-End (E2E) Testing & Playwright MCP Server

Playwright tests the complete running Next.js application across real browser engines (**Chromium**, **Firefox**, and **WebKit**), verifying routing, auth flows, and `async` Server Components, while the Playwright MCP server empowers AI coding agents to perform browser automation, visual snapshot inspection, and DOM interaction directly.

1. **Install Playwright Dev Dependency:**

   ```bash
   pnpm add -D @playwright/test
   ```

2. **Configure `playwright.config.ts`:**
   Configure `playwright.config.ts` with `baseURL` and `webServer`:

   ```ts
   import { defineConfig, devices } from "@playwright/test";

   const PORT = process.env.PORT || 3000;
   const BASE_URL = `http://localhost:${PORT}`;

   export default defineConfig({
     testDir: "./tests",
     fullyParallel: true,
     forbidOnly: !!process.env.CI,
     retries: process.env.CI ? 2 : 0,
     workers: process.env.CI ? 1 : undefined,
     reporter: "html",
     use: {
       baseURL: BASE_URL,
       trace: "on-first-retry",
     },
     projects: [
       {
         name: "chromium",
         use: { ...devices["Desktop Chrome"] },
       },
       {
         name: "firefox",
         use: { ...devices["Desktop Firefox"] },
       },
       {
         name: "webkit",
         use: { ...devices["Desktop Safari"] },
       },
     ],
     webServer: {
       command: process.env.CI
         ? "npm run build && npm run start"
         : "npm run dev",
       url: BASE_URL,
       timeout: 120 * 1000,
       reuseExistingServer: !process.env.CI,
     },
   });
   ```

3. **Install Target Browser Binaries:**

   ```bash
   pnpm exec playwright install --with-deps chromium firefox webkit
   ```

4. **Configure Playwright MCP Server (`@executeautomation/playwright-mcp-server` / `@modelcontextprotocol/server-playwright`):**
   - Enables the agent to perform browser automation, end-to-end testing, visual snapshot verification, DOM element interaction, and console inspection.
   - Update `mcp.json` or `.vscode/mcp.json` to include both servers:

   ```json
   {
     "mcpServers": {
       "next-devtools": {
         "command": "npx",
         "args": ["-y", "next-devtools"]
       },
       "playwright": {
         "command": "npx",
         "args": ["-y", "@executeautomation/playwright-mcp-server"]
       }
     }
   }
   ```

5. **CI Execution & Web Server Lifecycle (Build & Run Behavior):**
   - Requires the full Next.js application built and running, but **no manual build/run steps are needed in GitHub Actions**. Playwright's `webServer` configuration automatically detects `CI=true`, runs `pnpm build && pnpm start`, waits for `http://localhost:3000` to become healthy, runs the browser test suite, and cleanly terminates the server upon test completion.

6. **Configure Playwright Test Scripts (`package.json`):**

   ```json
   {
     "scripts": {
       "test:e2e": "playwright test --pass-with-no-tests",
       "test:e2e:ui": "playwright test --ui"
     }
   }
   ```

7. **Reference Implementation Example (For Future Test Creation):**

   ```ts
   // Reference: Playwright E2E navigation test pattern (Do NOT generate this file during dev setup)
   import { test, expect } from "@playwright/test";

   test("should navigate across pages", async ({ page }) => {
     await page.goto("/");
     await expect(page.locator("h1")).toBeVisible();
   });
   ```

---

### Step 7: Setup Jest Unit & Snapshot Testing (`next/jest`)

Next.js provides built-in integration with Jest via the `next/jest` transformer, which automatically configures SWC transforms, mocks CSS modules and fonts, and loads `.env` variables.

> [!IMPORTANT]
> **NO DUMMY / SAMPLE TEST GENERATION IN PROJECT:**
> Do NOT create placeholder or dummy test files in the actual user project during setup. The test code examples provided below are strictly for agent reference and developer documentation. Only configure framework configuration files (`jest.config.ts`, `jest.setup.ts`, and scripts).

> [!NOTE]
> **Async Server Components Limitation:** Because `async` React Server Components run in Node server environments, Jest (running in `jsdom`) currently does not execute `async` RSCs directly. Use Jest for synchronous Server/Client Components, hooks, and utilities; rely on Playwright E2E tests (Step 6) for `async` Server Components.

1. **Install Jest & React Testing Library:**
   Install the necessary dev dependencies using the detected package manager:

   ```bash
   # pnpm:
   pnpm add -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest

   # npm:
   npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest

   # yarn:
   yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest

   # bun:
   bun add -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
   ```

2. **Configure `jest.config.ts`:**
   Create `jest.config.ts` at the project root using `next/jest`:

   ```ts
   import type { Config } from "jest";
   import nextJest from "next/jest.js";

   const createJestConfig = nextJest({
     // Provide the path to your Next.js app to load next.config.js and .env files
     dir: "./",
   });

   const config: Config = {
     coverageProvider: "v8",
     testEnvironment: "jsdom",
     setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
     testPathIgnorePatterns: [
       "<rootDir>/node_modules/",
       "<rootDir>/.next/",
       "<rootDir>/e2e/",
       "<rootDir>/tests/",
     ],
     moduleNameMapper: {
       "^@/(.*)$": "<rootDir>/$1",
     },
   };

   // Export createJestConfig to ensure next/jest loads async Next.js config
   export default createJestConfig(config);
   ```

3. **Configure `jest.setup.ts`:**
   Create `jest.setup.ts` to extend Jest with `@testing-library/jest-dom` custom matchers:

   ```ts
   import "@testing-library/jest-dom";
   ```

4. **CI Execution & Web Server Lifecycle (Build & Run Behavior):**
   - Jest does **not** require building or running the Next.js application. Jest executes tests in an in-memory virtual DOM (`jsdom`) using Next.js SWC compilation (`next/jest`), testing components, hooks, and utilities directly.

5. **Configure Unified Test Scripts (`package.json`):**
   Configure `package.json` scripts with flags so freshly created projects without test files will exit with code 0 instead of breaking git hooks or CI/CD pipelines:

   ```json
   {
     "scripts": {
       "test": "jest --passWithNoTests",
       "test:watch": "jest --watch --passWithNoTests",
       "test:coverage": "jest --coverage --passWithNoTests",
       "test:e2e": "playwright test --pass-with-no-tests",
       "test:e2e:ui": "playwright test --ui",
       "test:all": "jest --passWithNoTests && playwright test --pass-with-no-tests"
     }
   }
   ```

6. **Reference Implementation Example (For Future Test Creation):**

   ```tsx
   // Reference: Unit and snapshot test pattern (Do NOT generate this file during dev setup)
   import "@testing-library/jest-dom";
   import { render, screen } from "@testing-library/react";
   import Page from "../app/page";

   describe("Page Component", () => {
     it("renders heading correctly", () => {
       render(<Page />);
       const heading = screen.getByRole("heading", { level: 1 });
       expect(heading).toBeInTheDocument();
     });

     it("matches snapshot", () => {
       const { container } = render(<Page />);
       expect(container).toMatchSnapshot();
     });
   });
   ```

---

### Step 8: Setup Docker Containerization (Standalone Production Container)

Containerizing Next.js using **Standalone Mode** packages only the traced production `node_modules` and compiled assets into a minimal, secure, non-root Node.js container (`server.js`). Local development runs directly on the host machine using the project package manager (`pnpm run dev`), while Docker is configured strictly for production builds and deployments.

#### 8.1. Enable Standalone Output in Next.js (`next.config.ts` / `next.config.js`)

Ensure `output: "standalone"` is enabled in `next.config.ts` (or `next.config.js`):

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

#### 8.2. Configure Docker Ignore File (`.dockerignore`)

Create or update `.dockerignore` at the repository root to exclude local build artifacts, secrets, and caches:

```dockerignore
# Dependencies
node_modules/
.pnp/
.pnp.js
.pnpm-store/

# Next.js build outputs
.next/
out/
dist/
build/
.vercel/

# Testing and coverage
coverage/
.nyc_output/
__tests__/
__mocks__/
jest/
cypress/
playwright-report/
test-results/
.vitest/

# Environment files (prevent leaking secrets into image context)
.env
.env*
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs and debug
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# IDE and git
.git/
.gitignore
.vscode/
.idea/

# Docker files
Dockerfile*
.dockerignore
compose*.yaml
docker-compose*.yml

# Documentation & CI
*.md
docs/
.github/
```

#### 8.3. Production Multi-Stage `Dockerfile` (Standalone Mode)

Create `Dockerfile` at the repository root using a 3-stage multi-stage build (`dependencies` -> `builder` -> `runner`):

```dockerfile
# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================
ARG NODE_VERSION=22-slim

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

ENV CI=true

# Copy package declarations, workspace configs, and lockfiles
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./

# Install dependencies using BuildKit cache mounts, frozen lockfile, and container-only hoisting
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
  if [ -f package-lock.json ]; then \
    npm ci --no-audit --no-fund --ignore-scripts; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn install --frozen-lockfile --production=false --ignore-scripts; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm install --frozen-lockfile --ignore-scripts --shamefully-hoist; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

# ============================================
# Stage 2: Build Next.js Application
# ============================================
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

# Copy dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV CI=true
ENV NODE_ENV=production
# Next.js telemetry (uncomment to disable during build)
# ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js standalone application
RUN if [ -f package-lock.json ]; then \
    npm run build; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn build; \
  elif [ -f pnpm-lock.yaml ]; then \
    ./node_modules/.bin/next build; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

# ============================================
# Stage 3: Minimal Production Standalone Runner
# ============================================
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ARG PORT=3000
ENV PORT=${PORT}
ENV HOSTNAME="0.0.0.0"
ENV NODE_PATH="/app/node_modules"
# ENV NEXT_TELEMETRY_DISABLED=1

# Copy public directory assets
COPY --from=builder --chown=node:node /app/public ./public

# Set permissions for prerender cache
RUN mkdir .next && chown node:node .next

# Copy standalone build output and static assets
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Switch to non-root user for security best practices
USER node

# Expose port for HTTP traffic (defaults to 3000)
EXPOSE ${PORT}

# Start Next.js standalone server
CMD ["node", "server.js"]
```

#### 8.4. Local Build Stack (`docker-compose.yml`)

Create `docker-compose.yml` at the repository root for building and running standalone production containers directly from local source:

```yaml
services:
  nextjs-app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - PORT=${PORT:-3000}
    image: nextjs-app:latest
    container_name: nextjs-standalone-app
    restart: unless-stopped
    ports:
      - "${PORT:-3000}:${PORT:-3000}"
    environment:
      - NODE_ENV=production
      - PORT=${PORT:-3000}
```

#### 8.5. GHCR Package Deployment Stack (`docker-compose.prod.yml`)

Create `docker-compose.prod.yml` at the repository root for lightweight production deployments pulling pre-built multi-arch images directly from GitHub Container Registry (GHCR) without needing local source code or build tooling:

```yaml
services:
  nextjs-app:
    image: ghcr.io/<lowercase-repo-owner>/<lowercase-repo-name>:${IMAGE_TAG:-latest}
    container_name: nextjs-standalone-app
    restart: always
    ports:
      - "${PORT:-3000}:${PORT:-3000}"
    environment:
      - NODE_ENV=production
      - PORT=${PORT:-3000}
```

#### 8.6. Container Commands Reference

- **Local Build & Run (Direct Docker)**:
  ```bash
  docker build -t nextjs-app:latest .
  docker run -d -p 3000:3000 --name nextjs-standalone-app nextjs-app:latest
  ```
- **Local Build & Run (Docker Compose)**:
  ```bash
  docker compose up -d --build
  ```
- **GHCR Production Package Deployment**:

  ```bash
  # Pull the latest published image from GHCR
  docker compose -f docker-compose.prod.yml pull

  # Deploy the container stack (defaults to latest)
  docker compose -f docker-compose.prod.yml up -d

  # Deploy a specific semantic release version:
  IMAGE_TAG=1.0.0 docker compose -f docker-compose.prod.yml up -d
  ```

---

### Step 9: Setup Git Hooks with Husky & Commitlint (Dual-Suite Pre-Push Enforcement)

1. **Install Husky & Commitlint:**
   - Install `husky`, `@commitlint/cli`, and `@commitlint/config-conventional` as dev dependencies using the detected package manager:
     ```bash
     pnpm add -D husky @commitlint/cli @commitlint/config-conventional
     ```

2. **Configure Commitlint:**
   - Create `commitlint.config.mjs` at the repository root to enforce Conventional Commits:
     ```javascript
     export default {
       extends: ["@commitlint/config-conventional"],
     };
     ```

3. **Initialize Husky Once:**
   - Initialize Husky to generate the `.husky/` directory and configure the `"prepare": "husky"` script in `package.json`:
     ```bash
     pnpm exec husky init
     ```

4. **Configure `commit-msg` Hook for Conventional Commits:**
   - Create or update `.husky/commit-msg` to validate commit messages before commits are created:
     ```bash
     echo "pnpm exec commitlint --edit \$1" > .husky/commit-msg
     ```
     _(Note: ensure `$1` is passed so commitlint checks the temporary commit message file)._

5. **Configure `pre-push` Hook to Run Both Jest & Playwright Tests:**
   - Create or update `.husky/pre-push` to run both the Jest unit suite and the Playwright E2E suite before pushing code:
     ```bash
     echo "pnpm run test:all" > .husky/pre-push
     ```
   - Ensure the hook is configured to block git pushes if any unit or E2E test fails.

6. **Verify Commitlint & Hook Functionality:**
   - Test that commitlint rejects non-conforming messages and accepts valid conventional messages:

     ```bash
     # Should fail with lint errors:
     echo "bad message" | pnpm exec commitlint

     # Should pass cleanly:
     echo "feat: add commitlint setup" | pnpm exec commitlint
     ```

---

### Step 10: Setup Credit-Optimized CI/CD, Release Automation & Multi-Arch GHCR Container Packaging

To minimize GitHub Actions minutes, consume as few billing credits as possible, and automate both semantic releases and multi-platform (AMD64 & ARM64) GitHub Container Registry (GHCR) package deployments:

1. **GitHub Credit-Saving Design Patterns:**
   - **`concurrency.cancel-in-progress: false`**: Ensures active release and workflow runs on main are never cancelled in-flight when new commits are pushed.
   - **Fail-Fast Testing Hierarchy**: Runs lightweight, in-memory **Jest unit tests first**. If unit tests fail, the job terminates immediately before spending time or runner resources installing browsers and running Playwright.
   - **Playwright Binary Caching**: Caches `~/.cache/ms-playwright` using `actions/cache` keyed against lockfile hashes, eliminating repeated multi-hundred-megabyte browser downloads on every run.
   - **Next.js CI Build Caching (`.next/cache`)**: Persists the `.next/cache` directory between CI workflow runs using `actions/cache@v4`. Next.js saves SWC compilation artifacts, Webpack/Turbopack caches, and prerendered static assets in `.next/cache`. Persisting this cache eliminates full rebuilds from scratch during CI (such as when Playwright runs `pnpm build && pnpm start` in `webServer`), cuts CI execution times, saves GitHub Actions minutes, and eliminates the Next.js `No Cache Detected` diagnostic error ([Next.js: No Cache Detected](https://nextjs.org/docs/messages/no-cache)). Keyed with `${{ runner.os }}-nextjs-${{ hashFiles('**/<lockfile>') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.json') }}` and incremental fallback `restore-keys`.
   - **CI Single Browser Targeting / Sequential Execution**: Runs Playwright efficiently against built production output (`[pm] run build && [pm] run start` or `test:e2e`).
   - **Node.js Active LTS Runtime**: Uses `node-version: 22` to avoid runner deprecation warnings.
   - **Two-Stage Multi-Arch Matrix Builder**: Builds `linux/amd64` and `linux/arm64` images concurrently across separate dedicated runner machines (`ubuntu-latest` and `ubuntu-24.04-arm`). Each machine pushes its architecture image by digest and caches layers scoped to its architecture (`scope=${{ matrix.arch }}`). A lightweight `merge-manifest` job stitches the digests into a unified multi-arch manifest list without rebuilding.

2. **Generate Package-Manager-Specific GitHub Actions Workflow (`.github/workflows/release-please.yml`):**

   Generate the configuration matching the project's detected `package_manager` (from `docs/project.json` or `package.json`):

   > [!IMPORTANT]
   > When using `actions/setup-node@v4` with `cache: "pnpm"`, `pnpm` MUST be installed before `setup-node` (via `pnpm/action-setup@v4`) so that `setup-node` can locate the `pnpm` executable to configure the global store cache path.
   > The workflow includes `packages: write` permissions, matrix build jobs on distinct runners for AMD64 and ARM64, and a downstream `merge-manifest` job that deploys the multi-arch package to GitHub Container Registry (`ghcr.io`).

   ```yaml
   name: Release Please & CI Validation

   on:
     push:
       branches:
         - main
     pull_request:
       branches:
         - main

   concurrency:
     group: ${{ github.workflow }}-${{ github.ref }}
     cancel-in-progress: false

   permissions:
     contents: write
     pull-requests: write
     packages: write # Grants permissions to publish container images to GitHub Container Registry (ghcr.io)

   jobs:
     test:
       name: Test Suite (Jest & Playwright)
       runs-on: ubuntu-latest
       steps:
         - name: Checkout Repository
           uses: actions/checkout@v4

         - name: Install pnpm
           uses: pnpm/action-setup@v4
           with:
             run_install: false

         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: 22
             cache: "pnpm"

         - name: Install Dependencies
           run: pnpm install --frozen-lockfile

         # 1. Fast fail-early unit & snapshot test execution (takes seconds, saves runner time)
         - name: Run Jest Unit Tests
           run: pnpm test

         # 2. Cache Playwright browser binaries to eliminate recurring download time
         - name: Cache Playwright Browsers
           uses: actions/cache@v4
           id: playwright-cache
           with:
             path: ~/.cache/ms-playwright
             key: ${{ runner.os }}-playwright-${{ hashFiles('**/pnpm-lock.yaml') }}

         - name: Install Playwright Browsers & OS Dependencies
           if: steps.playwright-cache.outputs.cache-hit != 'true'
           run: pnpm exec playwright install --with-deps

         # 3. Next.js CI Build Cache (.next/cache) to prevent "No Cache Detected" and accelerate build times
         - name: Restore Next.js Build Cache
           uses: actions/cache@v4
           with:
             # Next.js saves build artifacts, compilation output, and prerender caches in .next/cache
             path: |
               ${{ github.workspace }}/.next/cache
             # Generate a new cache whenever packages or source files change.
             key: ${{ runner.os }}-nextjs-${{ hashFiles('**/pnpm-lock.yaml') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.json') }}
             # If source files changed but packages didn't, rebuild incrementally from a prior cache.
             restore-keys: |
               ${{ runner.os }}-nextjs-${{ hashFiles('**/pnpm-lock.yaml') }}-

         # 4. Execute End-to-End browser tests against built app
         - name: Run Playwright E2E Tests
           run: pnpm test:e2e

     release-please:
       name: Release Please Automation
       needs: test
       if: github.ref == 'refs/heads/main' && github.event_name == 'push'
       runs-on: ubuntu-latest
       outputs:
         release_created: ${{ steps.release.outputs.release_created }}
         tag_name: ${{ steps.release.outputs.tag_name }}
         version: ${{ steps.release.outputs.version }}
       steps:
         - uses: googleapis/release-please-action@v4
           id: release
           with:
             release-type: node

     # Parallel Matrix Builder: builds AMD64 and ARM64 images concurrently on separate runner machines
     build-container:
       name: Build Container Image (${{ matrix.platform }})
       needs: [test, release-please]
       if: needs.release-please.outputs.release_created == 'true'
       strategy:
         fail-fast: false
         matrix:
           include:
             - runner: ubuntu-latest
               platform: linux/amd64
               arch: amd64
             - runner: ubuntu-24.04-arm
               platform: linux/arm64
               arch: arm64
       runs-on: ${{ matrix.runner }}
       steps:
         - name: Checkout Repository
           uses: actions/checkout@v4

         - name: Lowercase Repository Name
           run: |
             echo "IMAGE_NAME=$(echo "ghcr.io/${{ github.repository }}" | tr '[:upper:]' '[:lower:]')" >> "$GITHUB_ENV"

         - name: Set up Docker Buildx
           uses: docker/setup-buildx-action@v3

         - name: Log in to GitHub Container Registry
           uses: docker/login-action@v3
           with:
             registry: ghcr.io
             username: ${{ github.actor }}
             password: ${{ secrets.GITHUB_TOKEN }}

         - name: Extract Docker metadata (labels)
           id: meta
           uses: docker/metadata-action@v5
           with:
             images: ${{ env.IMAGE_NAME }}

         - name: Build and push by digest
           id: build
           uses: docker/build-push-action@v6
           with:
             context: .
             file: ./Dockerfile
             platforms: ${{ matrix.platform }}
             labels: ${{ steps.meta.outputs.labels }}
             outputs: type=image,name=${{ env.IMAGE_NAME }},push-by-digest=true,name-canonical=true,push=true
             cache-from: type=gha,scope=${{ matrix.arch }}
             cache-to: type=gha,mode=max,scope=${{ matrix.arch }}

         - name: Export digest
           run: |
             mkdir -p /tmp/digests
             digest="${{ steps.build.outputs.digest }}"
             touch "/tmp/digests/${digest#sha256:}"

         - name: Upload digest
           uses: actions/upload-artifact@v4
           with:
             name: digests-${{ matrix.arch }}
             path: /tmp/digests/*
             if-no-files-found: error
             retention-days: 1

     # Manifest Merger: stitches AMD64 and ARM64 architecture digests into a unified multi-arch release tag
     merge-manifest:
       name: Create & Push Multi-Arch Manifest (AMD64 + ARM64)
       needs: [release-please, build-container]
       runs-on: ubuntu-latest
       steps:
         - name: Download digests
           uses: actions/download-artifact@v4
           with:
             path: /tmp/digests
             pattern: digests-*
             merge-multiple: true

         - name: Lowercase Repository Name
           run: |
             echo "IMAGE_NAME=$(echo "ghcr.io/${{ github.repository }}" | tr '[:upper:]' '[:lower:]')" >> "$GITHUB_ENV"

         - name: Set up Docker Buildx
           uses: docker/setup-buildx-action@v3

         - name: Log in to GitHub Container Registry
           uses: docker/login-action@v3
           with:
             registry: ghcr.io
             username: ${{ github.actor }}
             password: ${{ secrets.GITHUB_TOKEN }}

         - name: Extract Docker metadata (tags, labels)
           id: meta
           uses: docker/metadata-action@v5
           with:
             images: ${{ env.IMAGE_NAME }}
             tags: |
               type=raw,value=${{ needs.release-please.outputs.version }}
               type=raw,value=v${{ needs.release-please.outputs.version }}
               type=raw,value=latest

         - name: Create manifest list and push
           working-directory: /tmp/digests
           run: |
             docker buildx imagetools create $(jq -cr '.tags | map("-t " + .) | join(" ")' <<< "$DOCKER_METADATA_OUTPUT_JSON") \
               $(printf '${{ env.IMAGE_NAME }}@sha256:%s ' *)

         - name: Inspect image
           run: |
             docker buildx imagetools inspect ${{ env.IMAGE_NAME }}:${{ needs.release-please.outputs.version }}
   ```

3. **Next.js CI Build Caching Deep-Dive & Multi-Package-Manager Matrix:**

   Next.js continuously records compiler cache, Webpack/Turbopack compilation artifacts, and page prerenders into `.next/cache`. Persisting this directory across CI workflow runs enables incremental compilation, saving GitHub Actions billing credits and eliminating the Next.js `No Cache Detected` diagnostic error ([Next.js Documentation: No Cache Detected](https://nextjs.org/docs/messages/no-cache)).

   #### How the Cache Key Strategy Works:
   - **Exact Match (`key`)**:
     Composed of the runner OS, lockfile hash, and source file patterns:
     `${{ runner.os }}-nextjs-${{ hashFiles('**/<lockfile>') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.json') }}`.
     When neither source code nor dependencies have changed, the cache hits exactly, completing the build step with near-instant execution.
   - **Incremental Fallback (`restore-keys`)**:
     Configured with the prefix fallback: `${{ runner.os }}-nextjs-${{ hashFiles('**/<lockfile>') }}-`.
     When application code changes on a branch or PR but dependencies have not changed, the primary key misses, but `restore-keys` restores the previous build cache for those exact dependencies. Next.js then performs **incremental compilation** — compiling only the modified routes, server actions, and components instead of rebuilding from scratch.
   - **Dependency Invalidation**:
     Whenever dependencies are updated or lockfiles change, the lockfile hash in both the key and restore-keys changes, safely invalidating outdated caches and creating a fresh, clean baseline cache.

   #### Multi-Package-Manager Configuration Matrix:

   Depending on the project's detected `package_manager` in `docs/project.json` or `package.json`, configure the Next.js cache step in `.github/workflows/release-please.yml`:

   | Package Manager | Lockfile Pattern              | Setup Action & Cache Setting                                       | Next.js Cache Path                                                              |
   | :-------------- | :---------------------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------ |
   | **pnpm**        | `**/pnpm-lock.yaml`           | `pnpm/action-setup@v4` + `actions/setup-node@v4` (`cache: "pnpm"`) | `${{ github.workspace }}/.next/cache`                                           |
   | **npm**         | `**/package-lock.json`        | `actions/setup-node@v4` (`cache: "npm"`)                           | `${{ github.workspace }}/.next/cache` (or `~/.npm` if setup-node cache omitted) |
   | **yarn**        | `**/yarn.lock`                | `actions/setup-node@v4` (`cache: "yarn"`)                          | `${{ github.workspace }}/.next/cache`                                           |
   | **bun**         | `**/bun.lockb`, `**/bun.lock` | `oven-sh/setup-bun@v2`                                             | `${{ github.workspace }}/.next/cache`                                           |

   ##### Package Manager Snippet Specifications:
   - **pnpm (`pnpm-lock.yaml`)**:

     ```yaml
     - name: Restore Next.js Build Cache
       uses: actions/cache@v4
       with:
         path: |
           ${{ github.workspace }}/.next/cache
         key: ${{ runner.os }}-nextjs-${{ hashFiles('**/pnpm-lock.yaml') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.json') }}
         restore-keys: |
           ${{ runner.os }}-nextjs-${{ hashFiles('**/pnpm-lock.yaml') }}-
     ```

   - **npm (`package-lock.json`)**:

     ```yaml
     - name: Restore Next.js Build Cache
       uses: actions/cache@v4
       with:
         path: |
           ${{ github.workspace }}/.next/cache
         key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.json') }}
         restore-keys: |
           ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-
     ```

   - **yarn (`yarn.lock`)**:

     ```yaml
     - name: Restore Next.js Build Cache
       uses: actions/cache@v4
       with:
         path: |
           ${{ github.workspace }}/.next/cache
         key: ${{ runner.os }}-nextjs-${{ hashFiles('**/yarn.lock') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.json') }}
         restore-keys: |
           ${{ runner.os }}-nextjs-${{ hashFiles('**/yarn.lock') }}-
     ```

   - **bun (`bun.lockb` or `bun.lock`)**:
     ```yaml
     - name: Restore Next.js Build Cache
       uses: actions/cache@v4
       with:
         path: |
           ${{ github.workspace }}/.next/cache
         key: ${{ runner.os }}-nextjs-${{ hashFiles('**/bun.lockb', '**/bun.lock') }}-${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.json') }}
         restore-keys: |
           ${{ runner.os }}-nextjs-${{ hashFiles('**/bun.lockb', '**/bun.lock') }}-
     ```

   #### 4-Layer Credit-Saving Caching Hierarchy:

   | Layer                                    | Target Resource                                      | Caching Mechanism                                     | Purpose                                                                          |
   | :--------------------------------------- | :--------------------------------------------------- | :---------------------------------------------------- | :------------------------------------------------------------------------------- |
   | **Layer 1: Package Manager Store**       | Global store (`~/.local/share/pnpm/store`, `~/.npm`) | `actions/setup-node@v4` (`cache: "[pm]"`)             | Avoids re-downloading dependency tarballs over the network.                      |
   | **Layer 2: Next.js CI Build Cache**      | `${{ github.workspace }}/.next/cache`                | `actions/cache@v4` with composite lockfile+source key | Accelerates SWC compilation & prerendering; eliminates "No Cache Detected".      |
   | **Layer 3: Playwright Browser Binaries** | `~/.cache/ms-playwright`                             | `actions/cache@v4` keyed by lockfile                  | Eliminates multi-hundred-megabyte browser downloads (Chromium, WebKit, Firefox). |
   | **Layer 4: Docker Container Layers**     | OCI build stages & layers                            | `docker/build-push-action@v6` with `type=gha`         | Caches container stages across runs for native multi-arch builds.                |

4. **Required GitHub Repository Access Permissions:**

   > [!IMPORTANT]
   > For Release Please to open and maintain Release Pull Requests and publish GHCR container images:
   >
   > 1. Go to repository **Settings** → **Actions** → **General**.
   > 2. Under **Workflow permissions**:
   >    - Select **"Read and write permissions"**.
   >    - Check **"Allow GitHub Actions to create and approve pull requests"**.
   > 3. Click **Save**.

5. **Verify Documentation:**
   - Reference `docs/release-automation.md` for team workflow conventions, commit message types, Release PR management, and multi-arch GitHub Packages deployment.

---

### Step 11: Verify Project Configuration & Sanity Check

1. Run the project configuration verification script:
   ```bash
   npx tsx .agents/skills/nextjs-dev-setup/scripts/verify-project-config.ts
   ```
2. The verification script will:
   - Verify `docs/project.json` exists.
   - Verify valid JSON structure.
   - Verify all required properties (`package_manager`, `new_component_dir`, `style_file_dir`, `component_library`, `animation_library`, `testing_library`, `supported_languages`) are present and non-empty.
   - Validate each locale object in `supported_languages` array.
   - Verify presence and configuration of testing suites (Jest and Playwright).
   - Audit `mcp.json` / `.vscode/mcp.json` for `next-devtools` and `playwright` MCP servers.
   - Audit Docker containerization configuration (`Dockerfile`, `docker-compose.yml`, `docker-compose.prod.yml`, `.dockerignore`, and standalone output).
   - Audit `.github/workflows/release-please.yml` for credit-optimized Next.js CI build caching (`.next/cache`), package manager setup, SemVer release automation, and multi-arch GHCR publishing.
3. If the script reports any errors, fix the configuration in `docs/project.json`, `mcp.json`, or Docker files and re-run until all checks pass.

---

### Step 12: Generate Dev Setup Execution Report

Upon completing the verification, the agent MUST output a clear and concise execution report summarizing the status of every step and artifact, explicitly distinguishing between what was freshly implemented vs. what was already configured (and left untouched).

#### Standard Output Report Template

```markdown
## 🛠️ Next.js Dev Setup Execution Report

| Step / Component                   | Target File(s) / Resource                                                      | Status                          | Notes / Details                                                                 |
| :--------------------------------- | :----------------------------------------------------------------------------- | :------------------------------ | :------------------------------------------------------------------------------ |
| **1. Project Metadata**            | `docs/project.json`                                                            | `[IMPLEMENTED]` / `[UNTOUCHED]` | Configured package manager, directories, animation & i18n metadata.             |
| **2. Core Dependencies**           | `package.json`, Lockfile                                                       | `[IMPLEMENTED]` / `[UNTOUCHED]` | Verified React, Next.js, styling, and motion libraries.                         |
| **3. Next.js Dev Server MCP**      | `mcp.json` / `.vscode/mcp.json`                                                | `[IMPLEMENTED]` / `[UNTOUCHED]` | Configured Next.js Dev Server (`next-devtools`) MCP server.                     |
| **4. Playwright & Playwright MCP** | `playwright.config.ts`, `mcp.json`                                             | `[IMPLEMENTED]` / `[UNTOUCHED]` | Verified test runner, browser binaries & Playwright MCP server.                 |
| **5. Jest Unit Testing**           | `jest.config.ts`, `jest.setup.ts`                                              | `[IMPLEMENTED]` / `[UNTOUCHED]` | Configured Next.js Jest transformer, jsdom environment & test-dom.              |
| **6. Docker Containerization**     | `Dockerfile`, `docker-compose.yml`, `docker-compose.prod.yml`, `.dockerignore` | `[IMPLEMENTED]` / `[UNTOUCHED]` | Multi-stage standalone production container & local/GHCR Docker Compose stacks. |
| **7. Husky Git Hooks**             | `.husky/commit-msg`, `.husky/pre-push`                                         | `[IMPLEMENTED]` / `[UNTOUCHED]` | Enforces dual pre-push test suite (Jest + Playwright) & commitlint.             |
| **8. Commitlint Config**           | `commitlint.config.mjs`                                                        | `[IMPLEMENTED]` / `[UNTOUCHED]` | Configured `@commitlint/config-conventional`.                                   |
| **9. Release & CI Build Caching**  | `.github/workflows/release-please.yml`                                         | `[IMPLEMENTED]` / `[UNTOUCHED]` | Next.js build cache (.next/cache), SemVer release PRs & GHCR multi-arch pkg.    |
| **10. Environment Verification**   | `scripts/verify-project-config.ts`                                             | `[PASSED]`                      | Sanity check passed with zero errors.                                           |

#### Status Definitions:

- **`[IMPLEMENTED]`**: Freshly created, installed, or modified during this setup run.
- **`[UNTOUCHED]`**: Already properly configured prior to running the skill; preserved as-is.
- **`[SKIPPED]`**: Intentionally omitted (e.g. optional tooling or user preference).
```

#### git commit

Group files and generate a commit message summarizing the changes made during the setup process. Don't commit anything output the commit commands and leave commiting to the user.
