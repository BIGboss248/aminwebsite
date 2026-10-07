import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${SITE_CONFIG.baseUrl}/${locale}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1.0,
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((loc) => [loc, `${SITE_CONFIG.baseUrl}/${loc}`]),
        ),
        "x-default": `${SITE_CONFIG.baseUrl}/${routing.defaultLocale}`,
      },
    },
  }));
}
