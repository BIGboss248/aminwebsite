import React from "react";
import { render } from "@testing-library/react";
import IpInfoPage, { generateMetadata, generateStaticParams } from "./page";
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
      if (namespace === "lab.ipinfo.meta") {
        return (
          (enMessages.lab.ipinfo.meta as Record<string, string>)[key] ?? key
        );
      }
      return key;
    };
  }),
}));

jest.mock("@/app/components/lab/ipinfo/IpScanHeader", () => ({
  IpScanHeader: () => <div data-testid="ip-header">IpScanHeader</div>,
  IpScanHeaderSkeleton: () => (
    <div data-testid="ip-header-skeleton">IpScanHeaderSkeleton</div>
  ),
}));

jest.mock("@/app/components/lab/ipinfo/IpScannerClient", () => ({
  IpScannerClient: () => (
    <div data-testid="ip-scanner-client">IpScannerClient</div>
  ),
  IpScannerClientSkeleton: () => (
    <div data-testid="ip-scanner-skeleton">IpScannerClientSkeleton</div>
  ),
}));

describe("IP Info Route Page Component (RSC & SEO)", () => {
  it("generates static params for all supported locales", () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: "en" }, { locale: "fa" }]);
  });

  it("generates localized metadata correctly", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    });

    expect(metadata.title).toBe(enMessages.lab.ipinfo.meta.title);
    expect(metadata.description).toBe(enMessages.lab.ipinfo.meta.description);
  });

  it("renders JSON-LD structured data with WebApplication schema and sections", async () => {
    const pageElement = await IpInfoPage({
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
