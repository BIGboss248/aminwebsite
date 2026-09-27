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
      if (namespace === "contact.header") {
        return (
          (enMessages.contact.header as Record<string, string>)[key] ?? key
        );
      }
      if (namespace === "common") {
        return (enMessages.common as Record<string, string>)[key] ?? key;
      }
      return key;
    };
  }),
}));

jest.mock("@/app/components/single-page", () => ({
  SinglePageNavbar: () => (
    <div data-testid="single-page-navbar">SinglePageNavbar</div>
  ),
  SinglePageNavbarSkeleton: () => (
    <div data-testid="single-page-navbar-skeleton">
      SinglePageNavbarSkeleton
    </div>
  ),
  SinglePageHero: () => (
    <div data-testid="single-page-hero">SinglePageHero</div>
  ),
  SinglePageHeroSkeleton: () => (
    <div data-testid="single-page-hero-skeleton">SinglePageHeroSkeleton</div>
  ),
  SinglePageProjectsSection: () => (
    <div data-testid="single-page-projects">SinglePageProjectsSection</div>
  ),
  SinglePageProjectsSkeleton: () => (
    <div data-testid="single-page-projects-skeleton">
      SinglePageProjectsSkeleton
    </div>
  ),
  ContactForm: () => <div data-testid="contact-form">ContactForm</div>,
  ContactFormSkeleton: () => (
    <div data-testid="contact-form-skeleton">ContactFormSkeleton</div>
  ),
  SocialsBlock: () => <div data-testid="socials-block">SocialsBlock</div>,
  SocialsBlockSkeleton: () => (
    <div data-testid="socials-block-skeleton">SocialsBlockSkeleton</div>
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

  it("renders JSON-LD structured data, single-page hero, and contact section", async () => {
    const pageElement = await SinglePage({
      params: Promise.resolve({ locale: "en" }),
    });

    const { container, getByTestId } = render(pageElement);

    expect(getByTestId("single-page-navbar")).toBeInTheDocument();
    expect(getByTestId("single-page-hero")).toBeInTheDocument();
    expect(getByTestId("single-page-projects")).toBeInTheDocument();
    expect(getByTestId("contact-form")).toBeInTheDocument();
    expect(getByTestId("socials-block")).toBeInTheDocument();

    const scriptTag = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(scriptTag).not.toBeNull();
    const jsonLdData = JSON.parse(scriptTag?.innerHTML || "{}");

    expect(jsonLdData["@context"]).toBe("https://schema.org");
    expect(jsonLdData["@graph"]).toHaveLength(2);

    const webSiteSchema = jsonLdData["@graph"][0];
    expect(webSiteSchema["@type"]).toBe("WebSite");
    expect(webSiteSchema.author["@type"]).toBe("Person");
    expect(webSiteSchema.author.name).toBe("Amin Jamali");

    const contactSchema = jsonLdData["@graph"][1];
    expect(contactSchema["@type"]).toBe("ContactPage");
    expect(contactSchema.mainEntity["@type"]).toBe("Person");
    expect(contactSchema.mainEntity.name).toBe("Amin Jamali");
  });
});
