import React from "react";
import { render } from "@testing-library/react";
import ContactPage, { generateMetadata, generateStaticParams } from "./page";
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
      if (namespace === "contact.meta") {
        return (enMessages.contact.meta as Record<string, string>)[key] ?? key;
      }
      if (namespace === "contact.header") {
        return (enMessages.contact.header as Record<string, string>)[key] ?? key;
      }
      return key;
    };
  }),
}));

jest.mock("@/app/components/contact/ContactForm", () => ({
  ContactForm: () => <div data-testid="contact-form">ContactForm</div>,
  ContactFormSkeleton: () => (
    <div data-testid="contact-form-skeleton">ContactFormSkeleton</div>
  ),
}));

jest.mock("@/app/components/contact/SocialsBlock", () => ({
  SocialsBlock: () => <div data-testid="socials-block">SocialsBlock</div>,
  SocialsBlockSkeleton: () => (
    <div data-testid="socials-block-skeleton">SocialsBlockSkeleton</div>
  ),
}));

describe("Contact Page Component (RSC & SEO)", () => {
  it("generates static params for all supported locales", () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: "en" }, { locale: "fa" }]);
  });

  it("generates localized metadata correctly", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    });

    expect(metadata.title).toBe("Contact & Socials | Amin Jamali");
    expect(metadata.description).toBe(
      "Get in touch with Amin Jamali via direct message or connect through LinkedIn, GitHub, and ORCID.",
    );
  });

  it("renders JSON-LD structured data and contact components", async () => {
    const pageElement = await ContactPage({
      params: Promise.resolve({ locale: "en" }),
    });

    const { container, getByTestId } = render(pageElement);

    expect(getByTestId("contact-form")).toBeInTheDocument();
    expect(getByTestId("socials-block")).toBeInTheDocument();

    const scriptTag = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(scriptTag).not.toBeNull();
    const jsonLdData = JSON.parse(scriptTag?.innerHTML || "{}");

    expect(jsonLdData["@context"]).toBe("https://schema.org");
    expect(jsonLdData["@graph"]).toHaveLength(1);

    const contactSchema = jsonLdData["@graph"][0];
    expect(contactSchema["@type"]).toBe("ContactPage");
    expect(contactSchema.mainEntity["@type"]).toBe("Person");
    expect(contactSchema.mainEntity.sameAs).toContain(
      "https://github.com/BIGboss248",
    );
    expect(contactSchema.mainEntity.sameAs).toContain(
      "https://linkedin.com/in/amin-jamali",
    );
    expect(contactSchema.mainEntity.sameAs).toContain(
      "https://orcid.org/0009-0004-9921-7273",
    );
  });
});
