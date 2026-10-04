import SinglePage, { generateStaticParams } from "./page";
import { redirect } from "next/navigation";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "fa"],
    defaultLocale: "en",
    localePrefix: "always",
  },
}));

describe("SinglePage Route Redirect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to the localized root route for en", async () => {
    await SinglePage({ params: Promise.resolve({ locale: "en" }) });
    expect(redirect).toHaveBeenCalledWith("/en");
  });

  it("redirects to the localized root route for fa", async () => {
    await SinglePage({ params: Promise.resolve({ locale: "fa" }) });
    expect(redirect).toHaveBeenCalledWith("/fa");
  });

  it("generates static params for all supported locales", () => {
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: "en" }, { locale: "fa" }]);
  });
});
