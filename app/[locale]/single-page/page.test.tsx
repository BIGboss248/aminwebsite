import React from "react";
import { render } from "@testing-library/react";
import SinglePage, { generateMetadata, generateStaticParams } from "./page";
import enMessages from "@/messages/en.json";

jest.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "fa"],
    defaultLocale: "en",
    localePrefix: "always",
  },
}));

jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn().mockImplementation(async ({ namespace }) => {
    return (key: string) => {
      if (namespace === "single_page.meta") {
        return (
          (enMessages.single_page.meta as Record<string, string>)[key] ?? key
        );
      }
      if (namespace === "common") {
        return (enMessages.common as Record<string, string>)[key] ?? key;
      }
      return key;
    };
  }),
}));

jest.mock("@/app/components/single-page/SinglePageHero", () => ({
  SinglePageHero: () => (
    <div data-testid="single-page-hero">SinglePageHero</div>
  ),
  SinglePageHeroSkeleton: () => (
    <div data-testid="single-page-hero-skeleton">SinglePageHeroSkeleton</div>
  ),
}));

describe("SinglePage Website Page (RSC & SEO)", () => {
  it("generates static params for all supported locales", () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: "en" }, { locale: "fa" }]);
  });

  it("generates localized metadata correctly", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    });

    expect(metadata.title).toBe(
      "Amin Jamali | Systems Architecture & Full-Stack Engineering",
    );
    expect(metadata.description).toBe(
      "Single-page developer cockpit, systems architecture, verified credentials, full-stack projects, and direct contact inquiry with Amin Jamali.",
    );
  });

  it("renders JSON-LD structured data and single-page hero", async () => {
    const pageElement = await SinglePage({
      params: Promise.resolve({ locale: "en" }),
    });

    const { container } = render(pageElement);

    const scriptTag = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(scriptTag).not.toBeNull();
    const jsonLdData = JSON.parse(scriptTag?.innerHTML || "{}");

    expect(jsonLdData["@context"]).toBe("https://schema.org");
    expect(jsonLdData["@graph"]).toHaveLength(1);

    const webSiteSchema = jsonLdData["@graph"][0];
    expect(webSiteSchema["@type"]).toBe("WebSite");
    expect(webSiteSchema.author["@type"]).toBe("Person");
    expect(webSiteSchema.author.name).toBe("Amin Jamali");
  });
});
