import React from "react";
import { render } from "@testing-library/react";
import Home, { generateMetadata, generateStaticParams } from "./page";
import enMessages from "@/messages/en.json";
import { SITE_CONFIG } from "@/lib/site-config";

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
  SinglePageCertificationsSection: () => (
    <div data-testid="single-page-certifications">
      SinglePageCertificationsSection
    </div>
  ),
  SinglePageCertificationsSkeleton: () => (
    <div data-testid="single-page-certifications-skeleton">
      SinglePageCertificationsSkeleton
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

describe("Home Page (Single-Page Website Experience)", () => {
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
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_CONFIG.baseUrl}/en`,
    );
  });

  it("renders JSON-LD structured data and single-page sections", async () => {
    const pageElement = await Home({
      params: Promise.resolve({ locale: "en" }),
    });

    const { container, getByTestId } = render(pageElement);

    expect(getByTestId("single-page-navbar")).toBeInTheDocument();
    expect(getByTestId("single-page-hero")).toBeInTheDocument();
    expect(getByTestId("single-page-projects")).toBeInTheDocument();
    expect(getByTestId("single-page-certifications")).toBeInTheDocument();
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
    expect(webSiteSchema.url).toBe(`${SITE_CONFIG.baseUrl}/en`);
    expect(webSiteSchema.author["@type"]).toBe("Person");
    expect(webSiteSchema.author.name).toBe("Amin Jamali");

    const contactSchema = jsonLdData["@graph"][1];
    expect(contactSchema["@type"]).toBe("ContactPage");
    expect(contactSchema.url).toBe(`${SITE_CONFIG.baseUrl}/en#contact`);
    expect(contactSchema.mainEntity["@type"]).toBe("Person");
    expect(contactSchema.mainEntity.name).toBe("Amin Jamali");
  });
});
