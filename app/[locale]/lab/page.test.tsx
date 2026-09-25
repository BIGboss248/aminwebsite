import React from "react";
import { render } from "@testing-library/react";
import LabPage, { generateMetadata, generateStaticParams } from "./page";
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
      if (namespace === "lab.meta") {
        return (enMessages.lab.meta as Record<string, string>)[key] ?? key;
      }
      return key;
    };
  }),
}));

jest.mock("@/app/components/lab/LabHero", () => ({
  LabHero: () => <div data-testid="lab-hero">LabHero</div>,
  LabHeroSkeleton: () => (
    <div data-testid="lab-hero-skeleton">LabHeroSkeleton</div>
  ),
}));

jest.mock("@/app/components/lab/LabToolGrid", () => ({
  LabToolGrid: () => <div data-testid="lab-tool-grid">LabToolGrid</div>,
  LabToolGridSkeleton: () => (
    <div data-testid="lab-tool-grid-skeleton">LabToolGridSkeleton</div>
  ),
}));

describe("Lab Hub Page Component (RSC & SEO)", () => {
  it("generates static params for all supported locales", () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: "en" }, { locale: "fa" }]);
  });

  it("generates localized metadata correctly", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    });

    expect(metadata.title).toBe(
      "Interactive Systems Lab & Diagnostics | Amin Jamali",
    );
    expect(metadata.description).toBe(
      "Browser-native systems observatory and network diagnostics suite. RFC 8484 DNS over HTTPS, WebRTC identity leak detection, and hardware entropy analysis with 100% client-side execution and zero telemetry logging.",
    );
  });

  it("renders JSON-LD structured data with SoftwareApplication schema and lab sections", async () => {
    const pageElement = await LabPage({
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

    const schema = jsonLdData["@graph"][0];
    expect(schema["@type"]).toBe("CollectionPage");
    expect(schema.mainEntity["@type"]).toBe("SoftwareApplication");
    expect(schema.mainEntity.featureList).toHaveLength(5);
  });
});
