import robots from "./robots";
import { SITE_CONFIG } from "@/lib/site-config";

describe("robots() metadata route", () => {
  it("generates correct robots configuration", () => {
    const config = robots();

    expect(config).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      sitemap: `${SITE_CONFIG.baseUrl}/sitemap.xml`,
    });
  });
});
