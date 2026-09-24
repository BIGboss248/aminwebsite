import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "./loading";
import enMessages from "@/messages/en.json";

const mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    if (namespace === "home.tech_matrix") {
      return (enMessages.home.tech_matrix as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

describe("Loading Component (Home Streaming Skeleton)", () => {
  it("renders the loading container and all home section skeletons", () => {
    const { container } = render(<Loading />);

    const loadingContainer = screen.getByTestId("home-loading-skeleton");
    expect(loadingContainer).toBeInTheDocument();
    expect(loadingContainer).toHaveClass(
      "flex flex-col flex-1 w-full bg-background font-sans",
    );

    // Hero skeleton is rendered
    expect(screen.getByLabelText(/loading hero section/i)).toBeInTheDocument();
    // Trust signals skeleton is rendered
    expect(
      screen.getByLabelText(/loading trust signals and credentials/i),
    ).toBeInTheDocument();
    // Tech matrix skeleton is rendered
    expect(
      screen.getByLabelText(/loading competencies and tech matrix/i),
    ).toBeInTheDocument();

    // Verify all 5 section elements are present
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBe(5);
  });
});
