import React from "react";
import { render } from "@testing-library/react";
import AboutPage, { generateMetadata, generateStaticParams } from "./page";
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
      if (namespace === "about.meta") {
        return (enMessages.about.meta as Record<string, string>)[key] ?? key;
      }
      if (namespace === "common") {
        return (enMessages.common as Record<string, string>)[key] ?? key;
      }
      return key;
    };
  }),
}));

jest.mock("@/app/components/about/AboutHero", () => ({
  AboutHero: () => <div data-testid="about-hero">AboutHero</div>,
  AboutHeroSkeleton: () => <div data-testid="about-hero-skeleton">AboutHeroSkeleton</div>,
}));

jest.mock("@/app/components/about/PhilosophySection", () => ({
  PhilosophySection: () => <div data-testid="philosophy-section">PhilosophySection</div>,
  PhilosophySectionSkeleton: () => <div data-testid="philosophy-skeleton">PhilosophySkeleton</div>,
}));

jest.mock("@/app/components/about/ExperienceTimeline", () => ({
  ExperienceTimeline: () => <div data-testid="experience-timeline">ExperienceTimeline</div>,
  ExperienceTimelineSkeleton: () => <div data-testid="experience-skeleton">ExperienceSkeleton</div>,
}));

jest.mock("@/app/components/about/AcademicResearchSection", () => ({
  AcademicResearchSection: () => <div data-testid="academic-research">AcademicResearch</div>,
  AcademicResearchSectionSkeleton: () => <div data-testid="academic-skeleton">AcademicSkeleton</div>,
}));

jest.mock("@/app/components/about/BeyondCodeSection", () => ({
  BeyondCodeSection: () => <div data-testid="beyond-code">BeyondCode</div>,
  BeyondCodeSectionSkeleton: () => <div data-testid="beyond-skeleton">BeyondSkeleton</div>,
}));

describe("About Page Component (RSC & SEO)", () => {
  it("generates static params for all supported locales", () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: "en" }, { locale: "fa" }]);
  });

  it("generates localized metadata correctly", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    });

    expect(metadata.title).toBe(
      "About Amin Jamali | Biography & Systems Architecture",
    );
    expect(metadata.description).toBe(
      "Biography, engineering philosophy, academic credentials, and systems journey of Amin Jamali.",
    );
  });

  it("renders JSON-LD structured data and all about sections", async () => {
    const pageElement = await AboutPage({
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

    const profileSchema = jsonLdData["@graph"][0];
    expect(profileSchema["@type"]).toBe("ProfilePage");
    expect(profileSchema.mainEntity["@type"]).toBe("Person");
    expect(profileSchema.mainEntity.name).toBe("Amin Jamali");
  });
});
