// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import shadcn from "@shadcn/lint";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "storybook-static/**",
    ".agents/**",
    "docs/**",
    "lint-results.json",
  ]),
  ...storybook.configs["flat/recommended"],
  {
    plugins: {
      shadcn,
    },
    rules: {
      "shadcn/no-restyle": [
        "error",
        {
          allow: ["layout"],
          contracts: [
            // Sample component contract exception:
            // { pattern: "^Button$", allow: ["w-full", "mt-*", "mb-*"] },
            { pattern: "^Skeleton$", allow: ["*"] },
          ],
        },
      ],
      "shadcn/no-raw-colors": "error",
      "shadcn/no-arbitrary-values": "error",
      "shadcn/no-unknown-classes": "error",
      "shadcn/no-inline-styles": "error",
      "shadcn/require-static-classes": "error",
    },
  },
  {
    // Turn off restyle, arbitrary values & static class checks in primitive UI directories so components can style themselves
    files: ["app/components/ui/**", "components/ui/**", "src/components/ui/**"],
    rules: {
      "shadcn/no-restyle": "off",
      "shadcn/no-arbitrary-values": "off",
      "shadcn/require-static-classes": "off",
    },
  },
  {
    // Turn off shadcn design system restrictions in unit tests, specs, and stories
    files: ["**/*.test.*", "**/*.spec.*", "**/*.stories.*", "**/__tests__/**"],
    rules: {
      "shadcn/no-restyle": "off",
      "shadcn/no-unknown-classes": "off",
      "shadcn/no-arbitrary-values": "off",
      "shadcn/no-inline-styles": "off",
      "shadcn/no-raw-colors": "off",
      "shadcn/require-static-classes": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

export default eslintConfig;
