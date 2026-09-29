import sitemap from "./sitemap";
import { SITE_CONFIG } from "@/lib/site-config";

jest.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "fa"],
    defaultLocale: "en",
  },
}));

describe("sitemap() metadata route", () => {
  it("generates sitemap entries for all supported locales with alternates", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(2);

    const locales = ["en", "fa"];
    locales.forEach((locale) => {
      const entry = entries.find((e) => e.url === `${SITE_CONFIG.baseUrl}/${locale}`);
      expect(entry).toBeDefined();
      expect(entry?.priority).toBe(1.0);
      expect(entry?.changeFrequency).toBe("weekly");
      expect(entry?.alternates?.languages).toEqual({
        en: `${SITE_CONFIG.baseUrl}/en`,
        fa: `${SITE_CONFIG.baseUrl}/fa`,
      });
    });
  });
});
