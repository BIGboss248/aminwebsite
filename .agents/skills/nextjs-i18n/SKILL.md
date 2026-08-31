---
name: nextjs-i18n
description: End-to-end workflow, architectural guidelines, and engineering standards for setting up, configuring, and verifying next-intl App Router internationalization (i18n) on an existing Next.js project. Triggers on "/nextjs-i18n", "setup i18n", "configure next-intl", "add internationalization", "setup locale routing", "add multilingual support", or when configuring bilingual/multilingual routing and translations.
metadata:
  author: BIGboss248
  version: "1.1"
---

# Next.js App Router i18n Skill (`nextjs-i18n`)

This skill provides step-by-step instructions, architectural rules, code templates, and automated verification for integrating **`next-intl`** into an **existing Next.js App Router project**. It guides the full migration to locale-based routing (`/[locale]/...`), type-safe translations, BiDi (LTR/RTL) directionality, and static rendering optimization with zero regressions to existing features across **Next.js 16+ (`proxy.ts`)** and **Next.js <=15 (`middleware.ts`)**.

---

## Documentation & Primary References

- [Next.js App Router internationalization (i18n) – Internationalization (i18n) for Next.js](https://next-intl.dev/docs/getting-started/app-router)
- [next-intl Setup Locale-Based Routing Guide](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)
- [next-intl Routing Configuration Reference](https://next-intl.dev/docs/routing)
- [next-intl Server & Client Components Guide](https://next-intl.dev/docs/environments/server-client-components)

---

## 1. Core Architecture & Mental Model

`next-intl` integrates natively with Next.js App Router by establishing a server-first internationalization pipeline:

```mermaid
flowchart TD
    Req[Incoming User Request] --> ProxyMW["Request Interceptor (proxy.ts in Next 16+ / middleware.ts in Next <=15)"]
    ProxyMW --> RouteCheck{"Has Locale in URL?"}
    RouteCheck -- No --> Redir["Negotiate & Redirect to /[locale]/..."]
    RouteCheck -- Yes --> RSC["Server Component (App Router [locale])"]

    RSC --> ReqConfig["i18n/request.ts (getRequestConfig)"]
    ReqConfig --> LoadDict["Load messages/[locale].json or dictionaries/[locale].json"]
    LoadDict --> RootLayout["app/[locale]/layout.tsx"]

    RootLayout --> StaticOpt["generateStaticParams() + setRequestLocale()"]
    RootLayout --> DirLang["Set <html lang=locale dir=ltr/rtl>"]
    RootLayout --> ClientProv["NextIntlClientProvider (messages)"]

    ClientProv --> RSCPage["Server Pages / RSC (getTranslations)"]
    ClientProv --> ClientComp["Client Components (useTranslations)"]
```

### Key Architectural Concepts:

1. **Locale-Based Routing (`/[locale]` Dynamic Segment):** All application routes are placed inside the `app/[locale]/` folder, ensuring search engines, users, and server caches have dedicated URLs per locale (e.g. `/en/about`, `/fa/about`).
2. **Centralized Routing Config (`i18n/routing.ts`):** Single source of truth for supported locales, default locale, domain routing, and path prefixing strategies via `defineRouting`.
3. **Request Configuration (`i18n/request.ts`):** Server hook executed on every request via `getRequestConfig` to load translation JSON dictionaries and request-scoped formatting options.
4. **Navigation Helpers (`i18n/navigation.ts`):** Locale-aware wrappers around Next.js navigation (`Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`) produced by `createNavigation(routing)`.
5. **Next.js Bundler Plugin (`next.config.ts`):** Wraps Next.js config with `createNextIntlPlugin()` to automatically link request configuration to React Server Components.
6. **Request Interceptor (`proxy.ts` in Next.js 16+ / `middleware.ts` in Next.js <=15):** 
   - **Next.js 16+ replaces `middleware.ts` with `proxy.ts` (`src/proxy.ts` or `proxy.ts`).**
   - **Next.js <=15 uses `src/middleware.ts` (or `middleware.ts`).**
   - In both cases, `createMiddleware(routing)` is exported with a matcher regex to negotiate headers, detect preferred locale, and rewrite/redirect paths without affecting static assets or APIs.
7. **Type-Safe Messages (`global.d.ts`):** Augments `AppConfig` so TypeScript validates message namespace and key paths at compile time with autocomplete.

---

## 2. Project Configuration & Path Resolution

> [!IMPORTANT]
> **MANDATORY FIRST ACTION:** Before executing any setup steps, read `docs/project.json` (or `docs/PROJECT.JSON`) at the workspace root to parse `project_context_and_metadata`.

Extract the following properties:

- `package_manager`: e.g. `pnpm`, `npm`, `yarn`, `bun`.
- `supported_languages`: array of locale objects (`language_code`, `direction`, `native_name`, `country_code`, `currency_code`, `calendar_type`).
- `dictionaries_dir`: target directory for translation JSON files (e.g. `src/dictionaries`, `app/dictionaries`, or `messages`).
- `dictionary_file_pattern`: template string (e.g. `[locale].json`).
- `style_file_dir`: stylesheet location to verify BiDi / font rules.

If `docs/project.json` is missing, auto-detect layout (`src/` vs root `app/`), lockfile package manager, and consult `docs/adr/0001-bilingual-i18n-and-directionality.md` or `CONTEXT.md` for target locales before proceeding.

---

## 3. Step-by-Step Implementation Workflow

- [ ] **Step 0: Project Layout & Next.js Version Audit**
  - Read `docs/project.json` or inspect repository layout.
  - Determine if the project uses `src/app/` or `app/` (stored as `BASE_DIR`).
  - Detect current Next.js version in `package.json`:
    - **Next.js 16+**: Uses `[BASE_DIR]/proxy.ts` (`src/proxy.ts` or `proxy.ts`). If an existing `middleware.ts` is found, migrate and rename it to `proxy.ts`.
    - **Next.js 15 and earlier**: Uses `[BASE_DIR]/middleware.ts` (`src/middleware.ts` or `middleware.ts`).

- [ ] **Step 1: Install `next-intl` Package**
  - Run the package manager installation command:
    ```bash
    # For pnpm:
    pnpm add next-intl
    # For bun:
    bun add next-intl
    # For npm:
    npm install next-intl
    # For yarn:
    yarn add next-intl
    ```

- [ ] **Step 2: Create Centralized Routing Configuration (`[BASE_DIR]/i18n/routing.ts`)**
  - Define all supported locales and the default locale using `defineRouting`.
  - Match locales defined in `docs/project.json` `supported_languages`.

- [ ] **Step 3: Create Server Request Handler (`[BASE_DIR]/i18n/request.ts`)**
  - Configure `getRequestConfig` to dynamically import the corresponding dictionary JSON based on the incoming `locale` param.
  - Handle invalid/missing locales with `notFound()`.

- [ ] **Step 4: Create Navigation Utilities (`[BASE_DIR]/i18n/navigation.ts`)**
  - Call `createNavigation(routing)` and export localized `Link`, `redirect`, `usePathname`, `useRouter`, and `getPathname`.

- [ ] **Step 5: Configure Next.js Plugin (`next.config.ts` / `next.config.mjs`)**
  - Import `createNextIntlPlugin` from `next-intl/plugin`.
  - Wrap the existing `nextConfig` with `withNextIntl(nextConfig)`.
  - Ensure existing Webpack, Turbopack, or remote image configurations are preserved without changes.

- [ ] **Step 6: Setup Request Interceptor (`[BASE_DIR]/proxy.ts` for Next.js 16+ or `[BASE_DIR]/middleware.ts` for Next.js <=15)**
  - For **Next.js 16+**, create `src/proxy.ts` (or `proxy.ts` at root).
  - For **Next.js <=15**, create `src/middleware.ts` (or `middleware.ts` at root).
  - Create the interceptor handler using `createMiddleware(routing)`.
  - Configure the route `matcher` regex to exclude Next.js internals (`_next`), Vercel internals (`_vercel`), API routes (`/api`, `/trpc`), and static asset files containing dots (`favicon.ico`, `.svg`, `.png`, `.webp`).

- [ ] **Step 7: Setup Translation Dictionaries (`[dictionaries_dir]/[locale].json`)**
  - For each locale in `supported_languages` (e.g. `en.json`, `fa.json`), create JSON dictionary files organized by logical namespaces (e.g. `common`, `navigation`, `home`, `metadata`, `errors`).
  - Ensure identical key hierarchies exist across all translation files.

- [ ] **Step 8: Migrate Existing App Router Files to `app/[locale]/`**
  - Move existing top-level `app/` routes (`page.tsx`, `layout.tsx`, `not-found.tsx`, `error.tsx`, and feature directories) into `app/[locale]/`.
  - **Preserve Non-Localized Endpoints:** Keep `app/api/`, `app/robots.ts`, `app/sitemap.ts`, and `app/manifest.ts` outside `[locale]` if they are global.
  - In `app/[locale]/layout.tsx`:
    - Call `generateStaticParams()` to return `{ locale }` objects for SSG/ISR.
    - Set `<html lang={locale} dir={localeMetadata.direction}>` dynamically (e.g. `dir="rtl"` for Persian/Arabic, `dir="ltr"` for English).
    - Load messages via `await getMessages()` and wrap children in `<NextIntlClientProvider messages={messages}>`.
    - Apply locale-specific fonts (e.g. Geist/Inter for `en`, Vazirmatn/Sahel for `fa`).

- [ ] **Step 9: Setup TypeScript Type Augmentation (`global.d.ts`)**
  - Create or update `global.d.ts` (or `src/types/global.d.ts`) to declare the `AppConfig` interface referencing the primary dictionary file (`en.json`).
  - This unlocks compile-time type-safety and autocompletion for `t('namespace.key')`.

- [ ] **Step 10: Migrate Existing Links to Localized Navigation**
  - Search existing components for `import Link from 'next/link'` or `useRouter` from `next/navigation`.
  - Replace internal navigation imports with `Link` and `useRouter` from `@/i18n/navigation`.

- [ ] **Step 11: Execute Automated Verification Script**
  - Run the automated verification script:
    ```bash
    npx tsx .agents/skills/nextjs-i18n/scripts/verify-i18n-setup.ts
    ```
  - Verify that all validation checks (including Next.js 16 `proxy.ts` check) pass cleanly with 0 errors.

- [ ] **Step 12: Generate Setup Execution Report & Handoff**
  - Output the final execution report detailing configured files, detected locales, directionality mapping, and migration notes.

---

## 4. Reference Implementation Templates

### 1. Routing Configuration (`src/i18n/routing.ts`)

```typescript
import { defineRouting } from "next-intl/routing";

/**
 * Centralized i18n routing definition.
 */
export const routing = defineRouting({
  // All supported locale identifiers
  locales: ["en", "fa"],

  // Default fallback locale when no prefix is matched
  defaultLocale: "en",

  // Prefix strategy: 'always' (default), 'as-needed', or 'never'
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
```

---

### 2. Request Configuration (`src/i18n/request.ts`)

```typescript
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the locale requested by the current route
  let locale = await requestLocale;

  // Validate that the incoming locale parameter is supported
  if (!locale || !hasLocale(routing.locales, locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Dynamically load the JSON dictionary for the matched locale
    messages: (await import(`../dictionaries/${locale}.json`)).default,
  };
});
```

---

### 3. Localized Navigation Utilities (`src/i18n/navigation.ts`)

```typescript
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Lightweight locale-aware navigation wrappers.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

---

### 4. Next.js Plugin Configuration (`next.config.ts`)

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Automatically discovers src/i18n/request.ts or i18n/request.ts
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Preserve existing Next.js configuration options here
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
```

---

### 5. Request Interceptor (`proxy.ts` vs `middleware.ts`)

#### 5A. Next.js 16+ (`src/proxy.ts` or `proxy.ts`)

> In **Next.js 16+**, `middleware.ts` is replaced with `proxy.ts` located at the project root or in `src/`.

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16+ proxy interceptor for locale negotiation and redirects.
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes (/api, /trpc)
  // - Next.js and Vercel internals (/_next, /_vercel)
  // - Static files containing a dot (e.g. favicon.ico, logo.svg, images)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
```

#### 5B. Next.js <=15 (`src/middleware.ts` or `middleware.ts`)

> In **Next.js 15 and earlier**, request interception is placed in `middleware.ts`.

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js <=15 middleware interceptor for locale negotiation and redirects.
 */
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes (/api, /trpc)
  // - Next.js and Vercel internals (/_next, /_vercel)
  // - Static files containing a dot (e.g. favicon.ico, logo.svg, images)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
```

---

### 6. Root Locale Layout (`src/app/[locale]/layout.tsx`)

```tsx
import React from "react";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  // Validate locale segment
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load all messages for the current locale
  const messages = await getMessages();

  // Resolve direction (RTL for fa/ar, LTR for en/de/etc.)
  const isRtl = locale === "fa" || locale === "ar";
  const direction = isRtl ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

### 7. TypeScript Type Augmentation (`src/types/global.d.ts` or `global.d.ts`)

```typescript
import type en from "@/dictionaries/en.json";

type Messages = typeof en;

declare module "next-intl" {
  interface AppConfig {
    Messages: Messages;
  }
}
```

---

### 8. Translation Dictionaries (`src/dictionaries/en.json` & `src/dictionaries/fa.json`)

#### `en.json`:

```json
{
  "common": {
    "brand": "Portfolio",
    "switch_language": "Change Language",
    "theme_toggle": "Toggle Theme"
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "projects": "Projects",
    "contact": "Contact"
  },
  "home": {
    "hero_title": "Full-Stack Engineer & Architect",
    "hero_description": "Crafting high-performance web experiences and AI-powered systems.",
    "cta_projects": "View Projects",
    "cta_contact": "Get in Touch"
  }
}
```

#### `fa.json`:

```json
{
  "common": {
    "brand": "پورتفولیو",
    "switch_language": "تغییر زبان",
    "theme_toggle": "تغییر پوسته"
  },
  "navigation": {
    "home": "خانه",
    "about": "درباره من",
    "projects": "پروژه‌ها",
    "contact": "تماس"
  },
  "home": {
    "hero_title": "مهندس ارشد فول‌استک و معمار سیستم",
    "hero_description": "طراحی و پیاده‌سازی سیستم‌های مدرن وب با کارایی بالا و هوش مصنوعی.",
    "cta_projects": "مشاهده پروژه‌ها",
    "cta_contact": "ارتباط با من"
  }
}
```

---

## 5. Server vs Client Component Usage Guide

| Context                        | Hook / API                                | Example Code                                                       | Notes                                                                |
| :----------------------------- | :---------------------------------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------- |
| **Server Component (RSC)**     | `getTranslations` (async)                 | `const t = await getTranslations('home');`                         | Direct async call on server; zero client JS bundle cost.             |
| **Client Component**           | `useTranslations` (hook)                  | `const t = useTranslations('navigation');`                         | Requires `"use client"` and `<NextIntlClientProvider>`.              |
| **Formatted Numbers/Currency** | `getFormatter` / `useFormatter`           | `format.number(1250, {style: 'currency', currency: 'USD'})`        | Native localized number formatting.                                  |
| **Formatted Dates/Times**      | `getFormatter` / `useFormatter`           | `format.dateTime(new Date(), {dateStyle: 'full'})`                 | Handles Gregorian vs Persian/Solar Hijri calendars.                  |
| **Dynamic Rich Text**          | `t.rich('key', { b: (c) => <b>{c}</b> })` | `t.rich('terms', { link: (c) => <Link href="/terms">{c}</Link> })` | Renders nested React elements inside translated strings.             |
| **Localized Dynamic Metadata** | `getTranslations` in `generateMetadata`   | `export async function generateMetadata({ params }) { ... }`       | Generates localized `<title>`, `<meta>`, and `alternates.languages`. |

---

## 6. BiDi (RTL / LTR) & Styling Standards

When building bilingual applications (e.g. English `ltr` and Persian `rtl`):

1. **Strict Tailwind Logical Properties:**
   - **Forbidden:** Physical properties (`ml-4`, `mr-4`, `pl-2`, `pr-2`, `left-0`, `right-0`, `text-left`, `text-right`).
   - **Required:** Logical properties (`ms-4`, `me-4`, `ps-2`, `pe-2`, `start-0`, `end-0`, `text-start`, `text-end`).
2. **Dynamic HTML Attributes:**
   - Root layout MUST set `dir={isRtl ? "rtl" : "ltr"}` and `lang={locale}`.
3. **Font Adaptation:**
   - Use CSS variables or Tailwind conditional font classes based on locale (e.g., Persian typeface `font-vazirmatn` for `fa`, sans-serif for `en`).

---

## 7. Common Edge Cases & Anti-Patterns

| Anti-Pattern / Mistake                                          | Root Cause                                                               | Proper Solution                                                                                                                                    |
| :-------------------------------------------------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Using `middleware.ts` in Next.js 16+**                        | In Next.js 16+, `middleware.ts` is replaced by `proxy.ts`.               | Rename `middleware.ts` to `src/proxy.ts` (or `proxy.ts`).                                                                                         |
| **Using `proxy.ts` in Next.js <=15**                            | Next.js 15 and earlier versions do not recognize `proxy.ts`.             | Rename `proxy.ts` to `src/middleware.ts` (or `middleware.ts`).                                                                                    |
| **Both `proxy.ts` and `middleware.ts` coexisting**              | Lingering legacy `middleware.ts` after migrating to Next.js 16+.         | Remove the redundant `middleware.ts` and keep only `proxy.ts`.                                                                                    |
| **Hydration mismatch on `<html lang>` / `<html dir>`**          | Layout renders fixed `dir="ltr"` while server is rendering `rtl` locale. | Dynamically assign `dir={isRtl ? "rtl" : "ltr"}` from `params.locale` in `app/[locale]/layout.tsx`.                                                |
| **Static rendering disabled / De-opt to SSR**                   | Missing `generateStaticParams()` or `setRequestLocale()`.                | Add `generateStaticParams()` returning `[{ locale: 'en' }, { locale: 'fa' }]` and call `setRequestLocale(locale)` at the top of layouts and pages. |
| **404 loop on static assets (favicon, images, robots.txt)**     | Interceptor matcher catches static files.                                | Ensure `matcher` in `proxy.ts`/`middleware.ts` excludes `.*\\..*`, `_next`, `_vercel`, and `/api`.                                                 |
| **Typo in translation key going unnoticed**                     | Missing TypeScript type augmentation.                                    | Augment `AppConfig.Messages` in `global.d.ts` from `en.json`.                                                                                      |
| **Broken navigation with raw `<a>` or unlocalized `next/link`** | Using standard `next/link` without locale prefix.                        | Import `Link` from `@/i18n/navigation` which automatically prepends the active locale.                                                             |
| **Calling `useTranslations` in Server Component**               | Hooks cannot be called in async RSC.                                     | Use `const t = await getTranslations('namespace')` in Server Components.                                                                           |

---

## 8. Verification & Sanity Check Execution

Before declaring completion of i18n setup:

1. **Execute the Verification Script:**
   ```bash
   npx tsx .agents/skills/nextjs-i18n/scripts/verify-i18n-setup.ts
   ```
   *The verification script automatically audits Next.js version in `package.json` and verifies that `proxy.ts` is used on Next.js 16+ or `middleware.ts` on Next.js <=15.*

2. **Execute Project Build / Type Check:**
   ```bash
   pnpm run build # or detected package manager
   ```
3. **Output Execution Summary:**
   Present the final status of all created/modified files, detected locales, directionality mapping, and navigation updates to the user.
