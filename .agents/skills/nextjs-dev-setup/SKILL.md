---
name: nextjs-dev-setup
description: Use when user wants to setup a dev environment for a NextJS project or configure project settings. Triggers on "/NextJS-dev-Setup", "setup my nextjs dev environment", "start a nextJS project", or when configuring/creating docs/project.json.
metadata:
  author: BIGboss248
  version: "1.1"
---

# Next.js Development Setup & Project Configuration Skill (`nextjs-dev-setup`)

This skill establishes, validates, and initializes the Next.js development environment, automatically scanning repository files and documentation in `docs/` to discover project configuration and maintain the single source of truth at `docs/project.json`.

---

## 1. Project Configuration Schema (`docs/project.json`)

The `docs/project.json` file is the mandatory single source of truth for component creation, package manager, styling rules, animation engines, and internationalization across all agent skills (such as `nextjs-create-component`).

### Complete Properties Specification (`project_context_and_metadata`)

| Property Name | Type | Description | Discovery / Example |
| :--- | :--- | :--- | :--- |
| `package_manager` | `string` | Package manager used in the project (`"pnpm"`, `"npm"`, `"yarn"`, `"bun"`). | Auto-discovered from lockfiles or `package.json` `"packageManager"`. |
| `new_component_dir` | `string` | Target directory where components, skeletons, and unit tests are created. | Auto-discovered from `app/` or `src/` (e.g. `"app/components"` or `"src/components"`). |
| `style_file_dir` | `string` | Relative path to the global CSS / theme stylesheet. | Auto-discovered from stylesheet path (e.g. `"app/globals.css"` or `"src/app/globals.css"`). |
| `component_library` | `string` | UI component library or design system adopted in the project. | Discovered from `package.json` dependencies / `docs/` (e.g. `"shadcn/ui"`, `"radix-ui"`, `"none"`). |
| `animation_library` | `string` | Motion and animation library used for complex animations. | Discovered from `package.json` / `docs/adr/` (e.g. `"gsap"`, `"framer-motion"`, `"none"`). |
| `supported_languages` | `Array<LocaleObject>` | List of supported locales with direction, currency, and calendar metadata. | Discovered from `docs/adr/`, `docs/project-plan.md`, or `CONTEXT.md`. |
| `dictionaries_dir` | `string` | Target directory storing i18n translation dictionary JSON files. | Auto-discovered or standard path (e.g. `"app/dictionaries"` or `"src/dictionaries"`). |
| `dictionary_file_pattern` | `string` | Naming convention template for translation files. | Standard template: `"[locale].json"` (resolves to e.g. `en.json`, `fa.json`). |

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
    "animation_library": "gsap",
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
    "dictionaries_dir": "app/dictionaries",
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

2. **Scan Package Manager (Automated Detection):**
   - Inspect `package.json` for `"packageManager"` field (e.g., `"packageManager": "pnpm@11.22.0"` -> `"pnpm"`).
   - Check lockfiles present in workspace:
     - `pnpm-lock.yaml` -> `"pnpm"`
     - `bun.lockb` / `bun.lock` -> `"bun"`
     - `yarn.lock` -> `"yarn"`
     - `package-lock.json` -> `"npm"`

3. **Scan Project Layout & Stylesheet Paths:**
   - Check whether the repository uses `src/app/` or `app/`:
     - If `app/` exists at root -> set `new_component_dir` to `"app/components"` and `dictionaries_dir` to `"app/dictionaries"`.
     - If `src/app/` exists -> set `new_component_dir` to `"src/components"` and `dictionaries_dir` to `"src/dictionaries"`.
   - Locate global stylesheet:
     - Check `app/globals.css`, `src/app/globals.css`, `app/global.css`, `src/styles/globals.css` -> set `style_file_dir`.

4. **Scan Installed Dependencies (`package.json`):**
   - Check `dependencies` and `devDependencies`:
     - Component libraries: `radix-ui`, `shadcn`, `@headlessui/react`, etc.
     - Animation libraries: `gsap`, `@gsap/react`, `framer-motion`, `motion`, `tailwind-animate`.

---

### Step 2: Fallback Questionnaire (Only for Undetermined Fields)

If and ONLY if any required properties could not be deduced from `docs/` or repository files, prompt the user specifically for those missing fields:

```markdown
### 📋 Next.js Project Configuration Confirmation

The following properties could not be automatically determined from docs/ or repo files. Please confirm or provide:

[List only the undetermined properties]
```

*(If all properties were successfully discovered during Step 1, proceed directly to Step 3 without asking questions.)*

---

### Step 3: Create or Update `docs/project.json`

1. Ensure the `docs/` directory exists.
2. Write or update `docs/project.json` with the complete `project_context_and_metadata` JSON object.
3. Validate that target directories (`new_component_dir`, `dictionaries_dir`) and `style_file_dir` exist or create placeholder directories/files as needed.

---

### Step 4: Verify Next.js Dependencies & Dev Environment

1. **Verify Core Tooling with Detected `package_manager`:**
   - React & Next.js versions (e.g. Next.js 15+ / 16+, React 19)
   - Styling tools: Tailwind CSS, `clsx`, `tailwind-merge`
   - Route transition progress: `@vercel/react-transition-progress`
   - Animation library: `gsap`, `@gsap/react` (if selected in `docs/project.json`)
   - SEO / Structured data: `schema-dts`
   - Test framework: `@testing-library/react`, `@testing-library/jest-dom`, test runner
2. **Install Any Missing Required Packages:**
   - Run the detected package manager (e.g. `pnpm add ...` or `bun add ...`) for any missing dependencies.
3. **Verify Script Setup:**
   - Ensure `package.json` contains appropriate `dev`, `build`, `lint`, and `test` scripts.

---

### Step 5: Final Sanity Check

1. Run verification script:
   ```bash
   npx tsx .agents/skills/nextjs-create-component/scripts/verify-component-files.ts
   ```
2. Confirm `docs/project.json` is valid JSON and all schema properties are satisfied.
