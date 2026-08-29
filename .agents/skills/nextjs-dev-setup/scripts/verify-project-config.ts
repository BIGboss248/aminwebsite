#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";

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

export interface ValidationResult {
  filePath: string;
  exists: boolean;
  isValidJson: boolean;
  errors: string[];
  warnings: string[];
  passed: boolean;
  metadata?: Partial<ProjectContextAndMetadata>;
}

const ANSI_COLORS = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
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

  const { bold, cyan, green, red, yellow, reset, dim } = ANSI_COLORS;

  console.log(`\n${bold}${cyan}=== Next.js project.json Configuration Verification ===${reset}\n`);
  console.log(`${bold}Configuration File:${reset} ${result.filePath}`);
  console.log(`${bold}File Exists:${reset} ${result.exists ? `${green}Yes${reset}` : `${red}No${reset}`}`);
  console.log(`${bold}Valid JSON:${reset} ${result.isValidJson ? `${green}Yes${reset}` : `${red}No${reset}`}\n`);

  if (result.metadata && Object.keys(result.metadata).length > 0) {
    console.log(`${bold}Configured Properties:${reset}`);
    for (const [k, v] of Object.entries(result.metadata)) {
      if (k === "supported_languages" && Array.isArray(v)) {
        const langs = v.map((l) => (l && typeof l === "object" ? (l as Record<string, string>).language_code : "?")).join(", ");
        console.log(`  - ${cyan}${k}${reset}: [${langs}] (${v.length} locale(s))`);
      } else if ((k === "animation_library" || k === "testing_library") && Array.isArray(v)) {
        console.log(`  - ${cyan}${k}${reset}: [${v.map((item) => `"${item}"`).join(", ")}]`);
      } else {
        console.log(`  - ${cyan}${k}${reset}: ${JSON.stringify(v)}`);
      }
    }
    console.log("");
  }

  if (result.warnings.length > 0) {
    console.log(`${yellow}Warnings:${reset}`);
    for (const warn of result.warnings) {
      console.log(`  ⚠️  ${warn}`);
    }
    console.log("");
  }

  if (result.errors.length > 0) {
    console.log(`${red}Errors / Violations:${reset}`);
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
if (require.main === module) {
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

