#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Locale object structure expected in supported_languages array.
 */
export interface LocaleMetadata {
  language_code: string;
  country_code: string;
  currency_code: string;
  direction: "ltr" | "rtl";
  native_name: string;
  calendar_type: string;
}

/**
 * Project context and metadata schema.
 */
export interface ProjectContextAndMetadata {
  package_manager: string;
  new_component_dir: string;
  style_file_dir: string;
  component_library: string;
  animation_library: string[];
  testing_library: string[];
  supported_languages: LocaleMetadata[];
  dictionaries_dir: string;
  dictionary_file_pattern: string;
}

export interface ProjectConfig {
  project_context_and_metadata: ProjectContextAndMetadata;
}

export interface PathCheckResult {
  property: string;
  expectedPath: string;
  exists: boolean;
  type: "file" | "directory";
  isOptional?: boolean;
}

export interface DevAutomationCheckResult {
  name: string;
  category: "git_hooks" | "commitlint" | "release_automation" | "testing" | "dev_tools";
  status: "configured" | "missing" | "warning";
  details: string;
}

export interface ValidationResult {
  filePath: string;
  exists: boolean;
  isValidJson: boolean;
  errors: string[];
  warnings: string[];
  passed: boolean;
  metadata?: Partial<ProjectContextAndMetadata>;
  pathChecks: PathCheckResult[];
  automationChecks: DevAutomationCheckResult[];
}

const ANSI_COLORS = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
};

/**
 * Finds the project configuration file path.
 */
export function resolveConfigFilePath(customPath?: string): string {
  if (customPath) {
    return path.resolve(process.cwd(), customPath);
  }

  const candidatePaths = [
    path.resolve(process.cwd(), "docs/project.json"),
    path.resolve(process.cwd(), "docs/PROJECT.JSON"),
    path.resolve(process.cwd(), ".agents/PROJECT.JSON"),
    path.resolve(process.cwd(), ".agents/project.json"),
  ];

  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // Default target if none exist yet
  return path.resolve(process.cwd(), "docs/project.json");
}

/**
 * Checks file and directory existence referenced in project configuration.
 */
function auditFileSystemPaths(
  meta: Partial<ProjectContextAndMetadata>,
  warnings: string[]
): PathCheckResult[] {
  const checks: PathCheckResult[] = [];
  const rootDir = process.cwd();

  // 1. Style file check
  if (meta.style_file_dir) {
    const styleAbs = path.resolve(rootDir, meta.style_file_dir);
    const exists = fs.existsSync(styleAbs) && fs.statSync(styleAbs).isFile();
    checks.push({
      property: "style_file_dir",
      expectedPath: meta.style_file_dir,
      exists,
      type: "file",
    });
    if (!exists) {
      warnings.push(`Global stylesheet '${meta.style_file_dir}' does not exist on disk.`);
    }
  }

  // 2. Component directory check
  if (meta.new_component_dir) {
    const compAbs = path.resolve(rootDir, meta.new_component_dir);
    const exists = fs.existsSync(compAbs) && fs.statSync(compAbs).isDirectory();
    checks.push({
      property: "new_component_dir",
      expectedPath: meta.new_component_dir,
      exists,
      type: "directory",
    });
    if (!exists) {
      warnings.push(`Component directory '${meta.new_component_dir}' does not exist yet.`);
    }
  }

  // 3. Dictionaries directory check
  if (meta.dictionaries_dir) {
    const dictAbs = path.resolve(rootDir, meta.dictionaries_dir);
    const exists = fs.existsSync(dictAbs) && fs.statSync(dictAbs).isDirectory();
    checks.push({
      property: "dictionaries_dir",
      expectedPath: meta.dictionaries_dir,
      exists,
      type: "directory",
    });
    if (!exists) {
      warnings.push(`Dictionaries directory '${meta.dictionaries_dir}' does not exist yet.`);
    } else if (Array.isArray(meta.supported_languages) && meta.dictionary_file_pattern) {
      // Check individual dictionary files for each locale
      for (const loc of meta.supported_languages) {
        if (loc && typeof loc === "object" && loc.language_code) {
          const expectedFileName = meta.dictionary_file_pattern.replace(
            /\[locale\]/gi,
            loc.language_code
          );
          const dictFileRel = path.join(meta.dictionaries_dir, expectedFileName);
          const dictFileAbs = path.resolve(rootDir, dictFileRel);
          const fileExists = fs.existsSync(dictFileAbs) && fs.statSync(dictFileAbs).isFile();

          checks.push({
            property: `dictionary:${loc.language_code}`,
            expectedPath: dictFileRel,
            exists: fileExists,
            type: "file",
            isOptional: true,
          });

          if (!fileExists) {
            warnings.push(
              `i18n dictionary file '${dictFileRel}' for locale '${loc.language_code}' was not found.`
            );
          }
        }
      }
    }
  }

  return checks;
}

/**
 * Audits dev environment automation: Husky, Commitlint, Playwright, and Release Please.
 */
function auditDevAutomation(meta?: Partial<ProjectContextAndMetadata>): DevAutomationCheckResult[] {
  const rootDir = process.cwd();
  const results: DevAutomationCheckResult[] = [];

  // 1. Commitlint Configuration Check
  const commitlintConfigs = [
    "commitlint.config.mjs",
    "commitlint.config.js",
    "commitlint.config.cjs",
    "commitlint.config.ts",
    ".commitlintrc.json",
    ".commitlintrc.yaml",
    ".commitlintrc.yml",
    ".commitlintrc.js",
    ".commitlintrc.mjs",
  ];
  const foundCommitlintConfig = commitlintConfigs.find((cfg) =>
    fs.existsSync(path.resolve(rootDir, cfg))
  );

  if (foundCommitlintConfig) {
    results.push({
      name: "Commitlint Configuration",
      category: "commitlint",
      status: "configured",
      details: `Found '${foundCommitlintConfig}' enforcing Conventional Commits.`,
    });
  } else {
    results.push({
      name: "Commitlint Configuration",
      category: "commitlint",
      status: "missing",
      details: "Missing commitlint.config.mjs. Required for Conventional Commit enforcement.",
    });
  }

  // 2. Husky & Git Hooks Check
  const huskyDir = path.resolve(rootDir, ".husky");
  const hasHuskyDir = fs.existsSync(huskyDir) && fs.statSync(huskyDir).isDirectory();
  const hasCommitMsgHook =
    hasHuskyDir && fs.existsSync(path.resolve(huskyDir, "commit-msg"));
  const hasPrePushHook =
    hasHuskyDir && fs.existsSync(path.resolve(huskyDir, "pre-push"));

  if (hasHuskyDir) {
    if (hasCommitMsgHook && hasPrePushHook) {
      results.push({
        name: "Husky Git Hooks",
        category: "git_hooks",
        status: "configured",
        details: "Configured with .husky/commit-msg and .husky/pre-push hooks.",
      });
    } else {
      const missingHooks: string[] = [];
      if (!hasCommitMsgHook) missingHooks.push(".husky/commit-msg");
      if (!hasPrePushHook) missingHooks.push(".husky/pre-push");
      results.push({
        name: "Husky Git Hooks",
        category: "git_hooks",
        status: "warning",
        details: `Husky initialized, but missing hook(s): ${missingHooks.join(", ")}`,
      });
    }
  } else {
    results.push({
      name: "Husky Git Hooks",
      category: "git_hooks",
      status: "missing",
      details: "Missing .husky/ directory. Run 'pnpm exec husky init'.",
    });
  }

  // 3. Release Please & Release Automation Check
  const releasePleaseWorkflows = [
    ".github/workflows/release-please.yml",
    ".github/workflows/release-please.yaml",
    ".github/workflows/release.yml",
    ".github/workflows/release.yaml",
  ];
  const foundReleaseWorkflow = releasePleaseWorkflows.find((wf) =>
    fs.existsSync(path.resolve(rootDir, wf))
  );

  const hasReleaseDoc =
    fs.existsSync(path.resolve(rootDir, "docs/release-automation.md")) ||
    fs.existsSync(path.resolve(rootDir, "docs/release-please.md"));

  if (foundReleaseWorkflow) {
    const wfContent = fs.readFileSync(path.resolve(rootDir, foundReleaseWorkflow), "utf-8");
    const pm = meta?.package_manager || "pnpm";
    let pmWarning = "";
    if (pm === "pnpm" && wfContent.includes('cache: "pnpm"') && !wfContent.includes("pnpm/action-setup")) {
      pmWarning = " (Warning: Missing 'pnpm/action-setup' before 'actions/setup-node' with pnpm cache)";
    }
    results.push({
      name: "Release Please CI/CD",
      category: "release_automation",
      status: pmWarning ? "warning" : "configured",
      details: `Found GitHub Actions workflow '${foundReleaseWorkflow}' configured for ${pm}.${pmWarning}`,
    });
  } else {
    results.push({
      name: "Release Please CI/CD",
      category: "release_automation",
      status: "warning",
      details: hasReleaseDoc
        ? "Release doc exists, but .github/workflows/release-please.yml workflow is not yet created."
        : "Missing .github/workflows/release-please.yml for automated semver releases and changelog.",
    });
  }

  // 4. Testing Framework Checks (Jest & Playwright)
  const jestConfigs = [
    "jest.config.ts",
    "jest.config.js",
    "jest.config.mjs",
    "jest.config.cjs",
  ];
  const foundJestConfig = jestConfigs.find((cfg) =>
    fs.existsSync(path.resolve(rootDir, cfg))
  );
  const hasJestSetup =
    fs.existsSync(path.resolve(rootDir, "jest.setup.ts")) ||
    fs.existsSync(path.resolve(rootDir, "jest.setup.js")) ||
    fs.existsSync(path.resolve(rootDir, "jest.setup.mjs"));

  if (foundJestConfig) {
    results.push({
      name: "Jest Test Runner",
      category: "testing",
      status: "configured",
      details: `Found '${foundJestConfig}' (setup: ${hasJestSetup ? "configured" : "none"}) for Unit & Snapshot testing.`,
    });
  } else {
    results.push({
      name: "Jest Test Runner",
      category: "testing",
      status: "warning",
      details: "Missing jest.config.ts / jest.setup.ts for unit and component snapshot testing.",
    });
  }

  const playwrightConfigs = [
    "playwright.config.ts",
    "playwright.config.js",
    "playwright.config.mjs",
  ];
  const foundPlaywrightConfig = playwrightConfigs.find((cfg) =>
    fs.existsSync(path.resolve(rootDir, cfg))
  );

  if (foundPlaywrightConfig) {
    results.push({
      name: "Playwright Test Runner",
      category: "testing",
      status: "configured",
      details: `Found '${foundPlaywrightConfig}' with E2E test configuration.`,
    });
  } else {
    results.push({
      name: "Playwright Test Runner",
      category: "testing",
      status: "warning",
      details: "Missing playwright.config.ts for automated browser and UI testing.",
    });
  }

  // 5. MCP Server Configuration Check (mcp.json / .vscode/mcp.json)
  const mcpCandidatePaths = [
    path.resolve(rootDir, "mcp.json"),
    path.resolve(rootDir, ".vscode/mcp.json"),
    path.resolve(rootDir, ".agents/mcp.json"),
    path.resolve(rootDir, ".cursor/mcp.json"),
  ];
  const foundMcpConfig = mcpCandidatePaths.find((p) => fs.existsSync(p));

  if (foundMcpConfig) {
    try {
      const rawMcp = fs.readFileSync(foundMcpConfig, "utf-8");
      const cleanedMcpJson = rawMcp.replace(/(?<!:)\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
      const parsedMcp = JSON.parse(cleanedMcpJson);
      const servers = (parsedMcp.mcpServers || parsedMcp.servers || {}) as Record<string, unknown>;

      const hasNextDevTools = Object.keys(servers).some(
        (k) =>
          k.toLowerCase().includes("next") ||
          JSON.stringify(servers[k]).includes("next-devtools") ||
          JSON.stringify(servers[k]).includes("server-nextjs")
      );

      const hasPlaywrightMcp = Object.keys(servers).some(
        (k) =>
          k.toLowerCase().includes("playwright") ||
          JSON.stringify(servers[k]).includes("playwright")
      );

      if (hasNextDevTools && hasPlaywrightMcp) {
        results.push({
          name: "MCP Server Integration",
          category: "dev_tools",
          status: "configured",
          details: `Found '${path.relative(rootDir, foundMcpConfig)}' configured with Next.js Dev Server (next-devtools) and Playwright MCP.`,
        });
      } else {
        const missing: string[] = [];
        if (!hasNextDevTools) missing.push("Next.js Dev Server MCP (next-devtools)");
        if (!hasPlaywrightMcp) missing.push("Playwright MCP (playwright)");
        results.push({
          name: "MCP Server Integration",
          category: "dev_tools",
          status: "warning",
          details: `'${path.relative(rootDir, foundMcpConfig)}' exists, but missing server(s): ${missing.join(", ")}`,
        });
      }
    } catch (e) {
      results.push({
        name: "MCP Server Integration",
        category: "dev_tools",
        status: "warning",
        details: `Failed to parse '${path.relative(rootDir, foundMcpConfig)}': ${(e as Error).message}`,
      });
    }
  } else {
    results.push({
      name: "MCP Server Integration",
      category: "dev_tools",
      status: "warning",
      details: "Missing mcp.json / .vscode/mcp.json. Configure Next.js Dev Server (next-devtools) and Playwright MCP servers for agent telemetry.",
    });
  }

  // 6. Docker Containerization Check (Dockerfile, docker-compose.yml, .dockerignore)
  const dockerfilePath = path.resolve(rootDir, "Dockerfile");
  const composePath = fs.existsSync(path.resolve(rootDir, "docker-compose.yml"))
    ? path.resolve(rootDir, "docker-compose.yml")
    : path.resolve(rootDir, "compose.yaml");
  const dockerignorePath = path.resolve(rootDir, ".dockerignore");

  const hasDockerfile = fs.existsSync(dockerfilePath);
  const hasCompose = fs.existsSync(composePath);
  const hasDockerignore = fs.existsSync(dockerignorePath);

  if (hasDockerfile && hasCompose && hasDockerignore) {
    const composeFileName = path.basename(composePath);
    results.push({
      name: "Docker Containerization",
      category: "dev_tools",
      status: "configured",
      details: `Configured multi-stage production standalone Dockerfile, ${composeFileName}, and .dockerignore.`,
    });
  } else {
    const missing: string[] = [];
    if (!hasDockerfile) missing.push("Dockerfile");
    if (!hasCompose) missing.push("docker-compose.yml");
    if (!hasDockerignore) missing.push(".dockerignore");
    results.push({
      name: "Docker Containerization",
      category: "dev_tools",
      status: "warning",
      details: `Docker containerization files missing: ${missing.join(", ")}`,
    });
  }

  return results;
}

/**
 * Verifies existence and completeness of project configuration.
 */
export function verifyProjectConfig(filePath: string): ValidationResult {
  const result: ValidationResult = {
    filePath,
    exists: false,
    isValidJson: false,
    errors: [],
    warnings: [],
    passed: false,
    pathChecks: [],
    automationChecks: auditDevAutomation(),
  };

  // 1. Existence check
  if (!fs.existsSync(filePath)) {
    result.errors.push(`Configuration file not found at: ${filePath}`);
    return result;
  }
  result.exists = true;

  // 2. JSON Parse check
  let parsed: unknown;
  try {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    parsed = JSON.parse(rawContent);
    result.isValidJson = true;
  } catch (err) {
    result.errors.push(`Invalid JSON syntax: ${(err as Error).message}`);
    return result;
  }

  if (typeof parsed !== "object" || parsed === null) {
    result.errors.push("Root JSON content must be an object.");
    return result;
  }

  const root = parsed as Record<string, unknown>;
  const metadata = root.project_context_and_metadata;

  if (typeof metadata !== "object" || metadata === null) {
    result.errors.push("Missing required top-level key: 'project_context_and_metadata'");
    return result;
  }

  const meta = metadata as Record<string, unknown>;
  result.metadata = meta as Partial<ProjectContextAndMetadata>;

  // 3. String properties validation
  const requiredStringProps: Array<{ key: keyof ProjectContextAndMetadata; label: string }> = [
    { key: "package_manager", label: "Package Manager (package_manager)" },
    { key: "new_component_dir", label: "New Component Directory (new_component_dir)" },
    { key: "style_file_dir", label: "Style File Directory (style_file_dir)" },
    { key: "component_library", label: "Component Library (component_library)" },
    { key: "dictionaries_dir", label: "Dictionaries Directory (dictionaries_dir)" },
    { key: "dictionary_file_pattern", label: "Dictionary File Pattern (dictionary_file_pattern)" },
  ];

  for (const { key, label } of requiredStringProps) {
    const value = meta[key];
    if (value === undefined || value === null) {
      result.errors.push(`Missing property: '${key}' (${label})`);
    } else if (typeof value !== "string") {
      result.errors.push(`Property '${key}' must be a string, received ${typeof value}`);
    } else if (value.trim() === "") {
      result.errors.push(`Property '${key}' cannot be an empty string`);
    }
  }

  // 4. String Array properties validation (animation_library & testing_library)
  const requiredArrayProps: Array<{ key: keyof ProjectContextAndMetadata; label: string }> = [
    { key: "animation_library", label: "Animation Library (animation_library)" },
    { key: "testing_library", label: "Testing Library (testing_library)" },
  ];

  for (const { key, label } of requiredArrayProps) {
    const value = meta[key];
    if (value === undefined || value === null) {
      result.errors.push(`Missing property: '${key}' (${label})`);
    } else if (!Array.isArray(value)) {
      result.errors.push(`Property '${key}' must be an array of strings, received ${typeof value}`);
    } else if (value.length === 0) {
      result.errors.push(`Property '${key}' must contain at least one entry`);
    } else {
      value.forEach((item: unknown, idx: number) => {
        if (typeof item !== "string" || item.trim() === "") {
          result.errors.push(`Property '${key}[${idx}]' must be a non-empty string`);
        }
      });
    }
  }

  // 5. Validate package_manager specific values
  if (typeof meta.package_manager === "string" && meta.package_manager.trim() !== "") {
    const validPackageManagers = ["pnpm", "npm", "yarn", "bun"];
    if (!validPackageManagers.includes(meta.package_manager.toLowerCase())) {
      result.warnings.push(
        `Property 'package_manager' is '${meta.package_manager}'. Standard values are: ${validPackageManagers.join(", ")}`
      );
    }
  }

  // 6. Validate supported_languages array
  const languages = meta.supported_languages;
  if (languages === undefined || languages === null) {
    result.errors.push("Missing property: 'supported_languages'");
  } else if (!Array.isArray(languages)) {
    result.errors.push("Property 'supported_languages' must be an array");
  } else if (languages.length === 0) {
    result.errors.push("Property 'supported_languages' must contain at least one locale object");
  } else {
    languages.forEach((locale: unknown, index: number) => {
      if (typeof locale !== "object" || locale === null) {
        result.errors.push(`supported_languages[${index}] must be an object`);
        return;
      }

      const loc = locale as Record<string, unknown>;
      const requiredLocaleFields: Array<keyof LocaleMetadata> = [
        "language_code",
        "country_code",
        "currency_code",
        "direction",
        "native_name",
        "calendar_type",
      ];

      for (const field of requiredLocaleFields) {
        const val = loc[field];
        if (val === undefined || val === null || (typeof val === "string" && val.trim() === "")) {
          result.errors.push(`supported_languages[${index}] is missing or has empty field '${field}'`);
        }
      }

      if (loc.direction && loc.direction !== "ltr" && loc.direction !== "rtl") {
        result.errors.push(
          `supported_languages[${index}].direction must be either 'ltr' or 'rtl', received '${loc.direction}'`
        );
      }
    });
  }

  // 7. Audit filesystem paths referenced in metadata
  result.pathChecks = auditFileSystemPaths(result.metadata, result.warnings);

  // 8. Audit dev environment automation (Husky, Commitlint, Playwright, Release Please)
  result.automationChecks = auditDevAutomation(result.metadata);

  result.passed = result.errors.length === 0;
  return result;
}

/**
 * Formats validation output into terminal report.
 */
function printReport(result: ValidationResult, jsonOutput: boolean): void {
  if (jsonOutput) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  const { bold, cyan, green, red, yellow, magenta, reset, dim } = ANSI_COLORS;

  console.log(`\n${bold}${cyan}=== Next.js Dev Setup & project.json Verification ===${reset}\n`);
  console.log(`${bold}Configuration File:${reset} ${result.filePath}`);
  console.log(`${bold}File Exists:${reset} ${result.exists ? `${green}Yes${reset}` : `${red}No${reset}`}`);
  console.log(`${bold}Valid JSON:${reset} ${result.isValidJson ? `${green}Yes${reset}` : `${red}No${reset}`}\n`);

  // Section 1: project.json Metadata
  if (result.metadata && Object.keys(result.metadata).length > 0) {
    console.log(`${bold}${magenta}▶ Project Metadata & Schema Properties:${reset}`);
    for (const [k, v] of Object.entries(result.metadata)) {
      if (k === "supported_languages" && Array.isArray(v)) {
        const langs = v
          .map((l) => (l && typeof l === "object" ? ((l as unknown as Record<string, string>).language_code || "?") : "?"))
          .join(", ");
        console.log(`  - ${cyan}${k}${reset}: [${langs}] (${v.length} locale(s))`);
      } else if ((k === "animation_library" || k === "testing_library") && Array.isArray(v)) {
        console.log(`  - ${cyan}${k}${reset}: [${v.map((item) => `"${item}"`).join(", ")}]`);
      } else {
        console.log(`  - ${cyan}${k}${reset}: ${JSON.stringify(v)}`);
      }
    }
    console.log("");
  }

  // Section 2: Filesystem & Path Consistency
  if (result.pathChecks.length > 0) {
    console.log(`${bold}${magenta}▶ Filesystem Structure & i18n Paths:${reset}`);
    for (const check of result.pathChecks) {
      const statusIcon = check.exists ? `${green}✓${reset}` : `${yellow}✗${reset}`;
      const statusLabel = check.exists ? `${green}Exists${reset}` : `${yellow}Missing${reset}`;
      console.log(`  ${statusIcon} ${cyan}${check.property}${reset}: ${check.expectedPath} (${statusLabel})`);
    }
    console.log("");
  }

  // Section 3: Dev Environment Automation Audit
  if (result.automationChecks.length > 0) {
    console.log(`${bold}${magenta}▶ Git Hooks, Commit Standards & Release Automation:${reset}`);
    for (const check of result.automationChecks) {
      let statusTag = `${green}[OK]${reset}`;
      if (check.status === "warning") {
        statusTag = `${yellow}[WARN]${reset}`;
      } else if (check.status === "missing") {
        statusTag = `${red}[MISSING]${reset}`;
      }
      console.log(`  ${statusTag} ${bold}${check.name}:${reset} ${check.details}`);
    }
    console.log("");
  }

  // Warnings
  if (result.warnings.length > 0) {
    console.log(`${yellow}${bold}Warnings & Recommendations:${reset}`);
    for (const warn of result.warnings) {
      console.log(`  ⚠️  ${warn}`);
    }
    console.log("");
  }

  // Errors / Violations
  if (result.errors.length > 0) {
    console.log(`${red}${bold}Errors / Violations:${reset}`);
    for (const err of result.errors) {
      console.log(`  ✗ ${err}`);
    }
    console.log("");
  }

  const statusTag = result.passed
    ? `${green}${bold}✓ SUCCESS: project.json is valid and complete.${reset}`
    : `${red}${bold}✗ FAILED: project.json has missing or invalid properties.${reset}`;

  console.log(`${statusTag}\n`);
}

// CLI Execution
const isDirectExecution =
  process.argv[1] &&
  (process.argv[1] === fileURLToPath(import.meta.url) ||
    process.argv[1].endsWith("verify-project-config.ts") ||
    process.argv[1].endsWith("verify-project-config.js"));

if (isDirectExecution) {
  const args = process.argv.slice(2);
  const jsonFlag = args.includes("--json");
  const filteredArgs = args.filter((a) => a !== "--json");

  const targetPath = resolveConfigFilePath(filteredArgs[0]);
  const validation = verifyProjectConfig(targetPath);
  printReport(validation, jsonFlag);

  if (!validation.passed) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}
