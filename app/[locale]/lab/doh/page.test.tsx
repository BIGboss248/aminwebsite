import React from "react";
import { render } from "@testing-library/react";
import DohPage, { generateMetadata, generateStaticParams } from "./page";
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
      if (namespace === "lab.doh_prober.meta") {
        return (
          (enMessages.lab.doh_prober.meta as Record<string, string>)[key] ?? key
        );
      }
      return key;
    };
  }),
}));

jest.mock("@/app/components/lab/doh/DohToolHeader", () => ({
  DohToolHeader: () => <div data-testid="doh-header">DohToolHeader</div>,
  DohToolHeaderSkeleton: () => (
    <div data-testid="doh-header-skeleton">DohToolHeaderSkeleton</div>
  ),
}));

jest.mock("@/app/components/lab/doh/DohProberClient", () => ({
  DohProberClient: () => (
    <div data-testid="doh-prober-client">DohProberClient</div>
  ),
  DohProberClientSkeleton: () => (
    <div data-testid="doh-prober-skeleton">DohProberClientSkeleton</div>
  ),
}));

describe("DoH Prober Route Page Component (RSC & SEO)", () => {
  it("generates static params for all supported locales", () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: "en" }, { locale: "fa" }]);
  });

  it("generates localized metadata correctly", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    });

    expect(metadata.title).toBe(
      "DNS over HTTPS (DoH) Prober & Censorship Detector | Amin Jamali",
    );
    expect(metadata.description).toBe(
      "Browser-native RFC 8484 DNS over HTTPS diagnostic prober. Benchmark latency across Cloudflare, Google, and Quad9, audit DNS poisoning, and analyze wire answers with 100% client-side execution.",
    );
  });

  it("renders JSON-LD structured data with WebApplication schema and DoH sections", async () => {
    const pageElement = await DohPage({
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
    expect(schema["@type"]).toBe("WebApplication");
    expect(schema.featureList).toHaveLength(5);
  });
});
