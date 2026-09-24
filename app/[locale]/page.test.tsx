import React from "react";
import { render } from "@testing-library/react";
import Home, { generateMetadata, generateStaticParams } from "./page";
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
      if (namespace === "metadata") {
        return (enMessages.metadata as Record<string, string>)[key] ?? key;
      }
      if (namespace === "common") {
        return (enMessages.common as Record<string, string>)[key] ?? key;
      }
      return key;
    };
  }),
}));

jest.mock("@/app/components/home/HeroSection", () => ({
  HeroSection: () => <div data-testid="hero-section">HeroSection</div>,
  HeroSectionSkeleton: () => <div data-testid="hero-skeleton">HeroSkeleton</div>,
}));

jest.mock("../components/home/TrustSignalsSection", () => ({
  __esModule: true,
  default: () => <div data-testid="trust-signals-section">TrustSignalsSection</div>,
  TrustSignalsSectionSkeleton: () => (
    <div data-testid="trust-signals-skeleton">TrustSignalsSkeleton</div>
  ),
}));

jest.mock("../components/home/FeaturedProjectsGrid", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="featured-projects-section">FeaturedProjectsGrid</div>
  ),
  FeaturedProjectsGridSkeleton: () => (
    <div data-testid="featured-projects-skeleton">FeaturedProjectsSkeleton</div>
  ),
}));

jest.mock("../components/home/LabLauncherSection", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="lab-launcher-section">LabLauncherSection</div>
  ),
  LabLauncherSectionSkeleton: () => (
    <div data-testid="lab-launcher-skeleton">LabLauncherSkeleton</div>
  ),
}));

jest.mock("../components/home/TechStackMatrix", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="tech-stack-section">TechStackMatrix</div>
  ),
  TechStackMatrixSkeleton: () => (
    <div data-testid="tech-stack-skeleton">TechStackMatrixSkeleton</div>
  ),
}));

describe("Home Page Component (RSC & SEO)", () => {
  it("generates static params for all supported locales", () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: "en" }, { locale: "fa" }]);
  });

  it("generates localized metadata correctly", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    });

    expect(metadata.title).toBe(
      "Amin Jamali | Full-Stack Engineer & Architect",
    );
    expect(metadata.description).toBe(
      "Personal portfolio, interactive engineering lab, and digital credentials platform of Amin Jamali.",
    );
  });

  it("renders JSON-LD structured data and all home sections", async () => {
    const homeElement = await Home({
      params: Promise.resolve({ locale: "en" }),
    });

    const { container } = render(homeElement);

    // Verify JSON-LD script tag
    const scriptTag = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(scriptTag).not.toBeNull();
    const jsonLdData = JSON.parse(scriptTag?.innerHTML || "{}");

    expect(jsonLdData["@context"]).toBe("https://schema.org");
    expect(jsonLdData["@graph"]).toHaveLength(2);

    const websiteSchema = jsonLdData["@graph"][0];
    expect(websiteSchema["@type"]).toBe("WebSite");
    expect(websiteSchema.name).toBe("Amin Jamali");

    const personSchema = jsonLdData["@graph"][1];
    expect(personSchema["@type"]).toBe("Person");
    expect(personSchema.name).toBe("Amin Jamali");
    expect(personSchema.knowsAbout).toContain("Next.js");
  });
});
