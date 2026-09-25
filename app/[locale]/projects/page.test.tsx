import React from "react";
import { render } from "@testing-library/react";
import ProjectsPage, { generateMetadata, generateStaticParams } from "./page";
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
      if (namespace === "projects.meta") {
        return (enMessages.projects.meta as Record<string, string>)[key] ?? key;
      }
      return key;
    };
  }),
}));

jest.mock("@/app/components/projects/ProjectsHero", () => ({
  ProjectsHero: () => <div data-testid="projects-hero">ProjectsHero</div>,
  ProjectsHeroSkeleton: () => (
    <div data-testid="projects-hero-skeleton">ProjectsHeroSkeleton</div>
  ),
}));

jest.mock("@/app/components/projects/ProjectArchiveGrid", () => ({
  ProjectArchiveGrid: () => (
    <div data-testid="projects-archive-grid">ProjectArchiveGrid</div>
  ),
  ProjectArchiveGridSkeleton: () => (
    <div data-testid="projects-archive-skeleton">ProjectArchiveGridSkeleton</div>
  ),
}));

jest.mock("@/app/components/projects/OpenSourceShowcase", () => ({
  OpenSourceShowcase: () => (
    <div data-testid="open-source-showcase">OpenSourceShowcase</div>
  ),
  OpenSourceShowcaseSkeleton: () => (
    <div data-testid="open-source-skeleton">OpenSourceShowcaseSkeleton</div>
  ),
}));

describe("Projects Page Component (RSC & SEO)", () => {
  it("generates static params for all supported locales", () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: "en" }, { locale: "fa" }]);
  });

  it("generates localized metadata correctly", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    });

    expect(metadata.title).toBe(
      "Case Studies & Projects Archive | Amin Jamali",
    );
    expect(metadata.description).toBe(
      "Explore delivered engineering case studies, systems architecture, Core Web Vitals optimizations, peer-reviewed research, and open-source repositories by Amin Jamali.",
    );
  });

  it("renders JSON-LD structured data CollectionPage schema and all project sections", async () => {
    const pageElement = await ProjectsPage({
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

    const collectionSchema = jsonLdData["@graph"][0];
    expect(collectionSchema["@type"]).toBe("CollectionPage");
    expect(collectionSchema.mainEntity["@type"]).toBe("ItemList");
    expect(collectionSchema.mainEntity.itemListElement).toHaveLength(5);
  });
});
