import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "./loading";
import enMessages from "@/messages/en.json";

const mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    if (namespace === "single_page.hero") {
      return (enMessages.single_page.hero as Record<string, string>)[key] ?? key;
    }
    if (namespace === "single_page.certifications") {
      return (enMessages.single_page.certifications as unknown as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

describe("Loading Component (Single-Page Streaming Skeleton)", () => {
  it("renders the loading container and single-page skeleton elements", () => {
    const { container } = render(<Loading />);

    const loadingContainer = screen.getByTestId("home-loading-skeleton");
    expect(loadingContainer).toBeInTheDocument();
    expect(loadingContainer).toHaveClass(
      "flex flex-col flex-1 w-full bg-background font-sans",
    );

    // Hero skeleton is rendered
    expect(screen.getByLabelText(/loading single page hero/i)).toBeInTheDocument();
    // Certifications skeleton is rendered
    expect(
      screen.getByLabelText(/loading certifications and credentials/i),
    ).toBeInTheDocument();

    // Skeletons are rendered as sections
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(3);
  });
});
