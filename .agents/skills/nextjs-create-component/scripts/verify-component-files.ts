#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Interface representing verification result for a single component.
 */
export interface ComponentCheckResult {
  componentName: string;
  componentPath: string;
  hasComponentFile: boolean;
  componentFilePath?: string;
  hasSkeletonFile: boolean;
  skeletonFilePath?: string;
  hasTestFile: boolean;
  testFilePath?: string;
  passed: boolean;
  errors: string[];
}

/**
 * Summary of all verification results in a target directory.
 */
export interface VerificationSummary {
  targetDir: string;
  totalComponents: number;
  passedCount: number;
  failedCount: number;
  results: ComponentCheckResult[];
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
 * Resolves default target directory from docs/project.json if available.
 */
function getDefaultTargetDir(): string {
  const candidatePaths = [
    path.resolve(process.cwd(), "docs/project.json"),
    path.resolve(process.cwd(), "docs/PROJECT.JSON"),
    path.resolve(process.cwd(), ".agents/PROJECT.JSON"),
    path.resolve(process.cwd(), ".agents/project.json"),
  ];

  for (const projectJsonPath of candidatePaths) {
    if (fs.existsSync(projectJsonPath)) {
      try {
        const content = fs.readFileSync(projectJsonPath, "utf-8");
        const data = JSON.parse(content);
        const newCompDir = data?.project_context_and_metadata?.new_component_dir;
        if (newCompDir && fs.existsSync(path.resolve(process.cwd(), newCompDir))) {
          return path.resolve(process.cwd(), newCompDir);
        }
      } catch {
        // Continue searching other candidate paths
      }
    }
  }
  return process.cwd();
}

/**
 * Checks if a file contains an exported skeleton component definition.
 */
function fileExportsSkeleton(filePath: string, componentName: string): boolean {
  if (!fs.existsSync(filePath)) return false;
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const skeletonRegexes = [
      new RegExp(`export\\s+(function|const|class)\\s+${componentName}Skeleton\\b`),
      new RegExp(`export\\s+default\\s+function\\s+${componentName}Skeleton\\b`),
      new RegExp(`export\\s+(function|const|class)\\s+Skeleton\\b`),
    ];
    return skeletonRegexes.some((regex) => regex.test(content));
  } catch {
    return false;
  }
}

/**
 * Verifies a component within a specific directory context.
 */
function verifyComponent(
  componentName: string,
  searchDir: string
): ComponentCheckResult {
  const errors: string[] = [];

  // 1. Component File Check
  const componentExtensions = [".tsx", ".jsx", ".ts", ".js"];
  let componentFilePath: string | undefined;

  for (const ext of componentExtensions) {
    const possiblePaths = [
      path.join(searchDir, `${componentName}${ext}`),
      path.join(searchDir, `index${ext}`),
    ];
    for (const p of possiblePaths) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        componentFilePath = p;
        break;
      }
    }
    if (componentFilePath) break;
  }

  const hasComponentFile = Boolean(componentFilePath);
  if (!hasComponentFile) {
    errors.push(
      `Component file missing (expected ${componentName}.tsx or index.tsx in ${searchDir})`
    );
  }

  // 2. Skeleton File Check
  let skeletonFilePath: string | undefined;
  for (const ext of componentExtensions) {
    const possiblePaths = [
      path.join(searchDir, `${componentName}Skeleton${ext}`),
      path.join(searchDir, `Skeleton${ext}`),
      path.join(searchDir, `indexSkeleton${ext}`),
    ];
    for (const p of possiblePaths) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        skeletonFilePath = p;
        break;
      }
    }
    if (skeletonFilePath) break;
  }

  // Fallback: check if component file itself exports the Skeleton
  let hasSkeletonFile = Boolean(skeletonFilePath);
  if (!hasSkeletonFile && componentFilePath) {
    if (fileExportsSkeleton(componentFilePath, componentName)) {
      hasSkeletonFile = true;
      skeletonFilePath = `${componentFilePath} (inline export)`;
    }
  }

  if (!hasSkeletonFile) {
    errors.push(
      `Skeleton file/export missing (expected ${componentName}Skeleton.tsx or export function ${componentName}Skeleton)`
    );
  }

  // 3. Test File Check
  const testExtensions = [".test.tsx", ".test.ts", ".test.jsx", ".test.js", ".spec.tsx", ".spec.ts", ".spec.jsx", ".spec.js"];
  let testFilePath: string | undefined;

  for (const ext of testExtensions) {
    const possiblePaths = [
      path.join(searchDir, `${componentName}${ext}`),
      path.join(searchDir, `index${ext}`),
      path.join(searchDir, "__tests__", `${componentName}${ext}`),
      path.join(searchDir, "__tests__", `index${ext}`),
    ];
    for (const p of possiblePaths) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        testFilePath = p;
        break;
      }
    }
    if (testFilePath) break;
  }

  const hasTestFile = Boolean(testFilePath);
  if (!hasTestFile) {
    errors.push(
      `Test file missing (expected ${componentName}.test.tsx or __tests__/${componentName}.test.tsx)`
    );
  }

  const passed = hasComponentFile && hasSkeletonFile && hasTestFile;

  return {
    componentName,
    componentPath: searchDir,
    hasComponentFile,
    componentFilePath,
    hasSkeletonFile,
    skeletonFilePath,
    hasTestFile,
    testFilePath,
    passed,
    errors,
  };
}

/**
 * Scans target directory and audits all components found.
 */
export function auditDirectory(targetDir: string): VerificationSummary {
  const absoluteDir = path.resolve(targetDir);

  if (!fs.existsSync(absoluteDir)) {
    throw new Error(`Target directory does not exist: ${absoluteDir}`);
  }

  const stats = fs.statSync(absoluteDir);
  if (!stats.isDirectory()) {
    throw new Error(`Target path is not a directory: ${absoluteDir}`);
  }

  const results: ComponentCheckResult[] = [];
  const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });

  const ignoredDirs = new Set(["node_modules", ".git", ".next", "dist", "build", "coverage", "scripts", "__tests__"]);

  // Check if targetDir itself is a component directory (contains component file matching directory name or index)
  const dirName = path.basename(absoluteDir);
  const directFiles = entries.filter((e) => e.isFile()).map((e) => e.name);

  const isComponentDir =
    directFiles.some(
      (f) =>
        f === `${dirName}.tsx` ||
        f === `${dirName}.jsx` ||
        (f.startsWith("index.") && (f.endsWith(".tsx") || f.endsWith(".jsx")))
    );

  if (isComponentDir) {
    // Single component directory mode
    results.push(verifyComponent(dirName, absoluteDir));
  } else {
    // Directory containing components mode
    const componentNames = new Set<string>();
    const componentLocations = new Map<string, string>();

    // 1. Subdirectories as components (skip hidden directories starting with '.')
    for (const entry of entries) {
      if (entry.isDirectory() && !ignoredDirs.has(entry.name) && !entry.name.startsWith(".")) {
        componentNames.add(entry.name);
        componentLocations.set(entry.name, path.join(absoluteDir, entry.name));
      }
    }

    // 2. Direct component files in root directory
    for (const entry of entries) {
      if (entry.isFile()) {
        const fileName = entry.name;
        // Ignore test, skeleton, story, style files when discovering primary components
        if (
          !fileName.includes(".test.") &&
          !fileName.includes(".spec.") &&
          !fileName.endsWith("Skeleton.tsx") &&
          !fileName.endsWith("Skeleton.jsx") &&
          !fileName.endsWith("Skeleton.ts") &&
          !fileName.endsWith("Skeleton.js") &&
          !fileName.includes(".stories.") &&
          !fileName.endsWith(".module.css") &&
          !fileName.endsWith(".d.ts")
        ) {
          const ext = path.extname(fileName);
          if ([".tsx", ".jsx", ".ts", ".js"].includes(ext)) {
            const baseName = path.basename(fileName, ext);
            if (baseName !== "index") {
              componentNames.add(baseName);
              if (!componentLocations.has(baseName)) {
                componentLocations.set(baseName, absoluteDir);
              }
            }
          }
        }
      }
    }

    for (const compName of componentNames) {
      const searchLocation = componentLocations.get(compName) || absoluteDir;
      results.push(verifyComponent(compName, searchLocation));
    }
  }

  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.length - passedCount;

  return {
    targetDir: absoluteDir,
    totalComponents: results.length,
    passedCount,
    failedCount,
    results,
  };
}

/**
 * Formats verification summary into CLI report.
 */
function printReport(summary: VerificationSummary, jsonOutput: boolean): void {
  if (jsonOutput) {
    console.log(JSON.stringify(summary, null, 2));
    return;
  }

  const { bold, cyan, green, red, yellow, reset, dim } = ANSI_COLORS;

  console.log(`\n${bold}${cyan}=== Next.js Component Constraint Verification ===${reset}\n`);
  console.log(`${bold}Target Directory:${reset} ${summary.targetDir}`);
  console.log(`${bold}Total Components Audited:${reset} ${summary.totalComponents}\n`);

  if (summary.totalComponents === 0) {
    console.log(`${yellow}⚠️  No component files found to verify.${reset}\n`);
    return;
  }

  for (const res of summary.results) {
    const statusTag = res.passed
      ? `${green}[PASS]${reset}`
      : `${red}[FAIL]${reset}`;
    console.log(`${statusTag} ${bold}${res.componentName}${reset} ${dim}(${res.componentPath})${reset}`);

    console.log(
      `   1. Component File: ${res.hasComponentFile
        ? `${green}✓ Exists${reset} (${res.componentFilePath})`
        : `${red}✗ Missing${reset}`
      }`
    );
    console.log(
      `   2. Skeleton File:  ${res.hasSkeletonFile
        ? `${green}✓ Exists${reset} (${res.skeletonFilePath})`
        : `${red}✗ Missing${reset}`
      }`
    );
    console.log(
      `   3. Test File:      ${res.hasTestFile
        ? `${green}✓ Exists${reset} (${res.testFilePath})`
        : `${red}✗ Missing${reset}`
      }`
    );

    if (res.errors.length > 0) {
      console.log(`   ${red}Violations:${reset}`);
      for (const err of res.errors) {
        console.log(`     - ${err}`);
      }
    }
    console.log("");
  }

  console.log(`${bold}Summary:${reset} ${green}${summary.passedCount} Passed${reset}, ${summary.failedCount > 0 ? red : dim}${summary.failedCount} Failed${reset}\n`);
}

// CLI Execution Entry Point
if (require.main === module) {
  const args = process.argv.slice(2);
  const jsonFlag = args.includes("--json");
  const filteredArgs = args.filter((a) => a !== "--json");

  let targetDir = filteredArgs[0];

  if (!targetDir) {
    targetDir = getDefaultTargetDir();
  }

  try {
    const summary = auditDirectory(targetDir);
    printReport(summary, jsonFlag);

    if (summary.failedCount > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (error) {
    console.error(`${ANSI_COLORS.red}Verification Error:${ANSI_COLORS.reset}`, (error as Error).message);
    process.exit(1);
  }
}
