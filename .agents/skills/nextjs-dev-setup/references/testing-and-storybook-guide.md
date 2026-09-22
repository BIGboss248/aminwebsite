# Testing and Storybook Workshop Setup Guide

This guide covers the setup, architecture, and verification of Jest unit testing, Playwright E2E testing, and Storybook component development in Next.js App Router projects.

---

## 1. Zero Dummy Files Constraint (Rule 3)

> [!IMPORTANT]
> **NO DUMMY / SAMPLE TEST OR STORY GENERATION IN WORKSPACE:**
> Do NOT create placeholder or dummy test or story files in the user workspace during setup. Only configure framework configuration files (`jest.config.ts`, `jest.setup.ts`, `playwright.config.ts`, `.storybook/main.ts`, `.storybook/preview.tsx`, and `package.json` scripts).
> Sample patterns are provided strictly for documentation:
>
> - Storybook CSF3 Example: [`sample-component.stories.tsx`](../examples/sample-component.stories.tsx)
> - Jest Unit Test Example: [`sample-component.test.tsx`](../examples/sample-component.test.tsx)
> - Playwright E2E Test Example: [`sample-navigation.spec.ts`](../examples/sample-navigation.spec.ts)

---

## 2. Jest Unit & Snapshot Testing (`next/jest`)

Next.js provides built-in integration with Jest via the `next/jest` transformer, which automatically configures SWC transforms, mocks CSS modules/fonts, and loads `.env` variables.

- **Config Files**:
  - `jest.config.ts`: see [`jest.config.ts.template`](../resources/templates/jest.config.ts.template)
  - `jest.setup.ts`: see [`jest.setup.ts.template`](../resources/templates/jest.setup.ts.template)
- **Scope**: Synchronous Server/Client Components, custom hooks, utilities, and snapshots in `jsdom`.
- **Async Server Components Note**: Because `async` React Server Components run in Node server environments, Jest (running in `jsdom`) does not execute `async` RSCs directly. Rely on Playwright E2E tests for `async` Server Components.

---

## 3. Playwright End-to-End Testing

Playwright tests the complete running Next.js application across real browser engines (**Chromium**, **Firefox**, **WebKit**), verifying routing, auth flows, and `async` Server Components.

- **Config File**: `playwright.config.ts`: see [`playwright.config.ts.template`](../resources/templates/playwright.config.ts.template)
- **Browser Installation**:
  ```bash
  pnpm exec playwright install --with-deps chromium firefox webkit
  ```
- **Web Server Lifecycle**: Playwright's `webServer` configuration automatically detects `CI=true`, runs `pnpm build && pnpm start`, waits for `http://localhost:3000` to become healthy, runs the browser test suite, and cleanly terminates the server upon test completion.

---

## 4. Storybook Component Workshop & Themes

Storybook provides an isolated UI component development workshop, visual regression testing, interactive sandbox testing, and living styleguide documentation.

- **Configuration Files**:
  - `.storybook/main.ts`: see [`storybook-main.ts.template`](../resources/templates/storybook-main.ts.template)
  - `.storybook/preview.tsx`: see [`storybook-preview.tsx.template`](../resources/templates/storybook-preview.tsx.template)
- **Co-Located Story Architecture**:
  Story files MUST be co-located directly beside their respective UI component files across `components/` and `app/`:
  - UI Component: `components/ui/button.tsx` -> Story: `components/ui/button.stories.tsx`
  - Feature Component: `app/components/header/Header.tsx` -> Story: `app/components/header/Header.stories.tsx`
- **Mandatory `CssCheck` Story**:
  Storybook suites must include a `CssCheck` story that asserts a resolved `getComputedStyle(element)` value (e.g., background color or font) to prove that Tailwind CSS and stylesheets successfully load in the preview iframe.
- **Theme Tokens & i18n Decorators**:
  All Storybook preview wrappers and story decorators MUST strictly use semantic theme tokens from `globals.css` (`bg-background`, `text-foreground`, `border-border`) with scoped `.light` and `.dark` classes. If components use `next-intl` navigation (`Link`, `useRouter`), wrap stories with `NextIntlClientProvider` and `ProgressBarProvider`.

---

## 5. Unified `package.json` Scripts

Configure test and story scripts with exit-code-safe flags so empty project suites do not break CI:

```json
{
  "scripts": {
    "test": "jest --passWithNoTests",
    "test:watch": "jest --watch --passWithNoTests",
    "test:coverage": "jest --coverage --passWithNoTests",
    "test:e2e": "playwright test --pass-with-no-tests",
    "test:e2e:ui": "playwright test --ui",
    "test:all": "jest --passWithNoTests && playwright test --pass-with-no-tests",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "storybook:smoke": "storybook dev --smoke-test"
  }
}
```
