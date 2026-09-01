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
