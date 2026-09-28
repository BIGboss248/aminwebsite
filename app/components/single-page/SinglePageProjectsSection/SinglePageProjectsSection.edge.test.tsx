import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SinglePageProjectsSection } from "./SinglePageProjectsSection";
import enMessages from "@/messages/en.json";

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => {
    return (key: string) => {
      const keys = key.split(".");
      let current: unknown = enMessages.single_page.projects;
      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = (current as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      return typeof current === "string" ? current : key;
    };
  },
}));

// Mock Link
jest.mock("@/app/components/Link", () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-link">
      {children}
    </a>
  ),
}));

describe("SinglePageProjectsSection (Edge Cases)", () => {
  it("renders with RTL locale without errors and verifies no metrics elements exist anywhere", () => {
    const { container } = render(
      <SinglePageProjectsSection locale="fa" initialCategory="production" />,
    );

    expect(container).toBeInTheDocument();

    // Verify none of the metric labels or metric values are rendered across all cards
    expect(screen.queryByText("-82%")).not.toBeInTheDocument();
    expect(screen.queryByText("Query Latency Drop")).not.toBeInTheDocument();
    expect(screen.queryByText("System Uptime")).not.toBeInTheDocument();
    expect(screen.queryByText("RMSE Error Reduction")).not.toBeInTheDocument();
  });

  it("handles custom className and initialCategory properly", () => {
    render(
      <SinglePageProjectsSection
        locale="en"
        className="custom-projects-class"
        initialCategory="research"
      />,
    );

    const section = screen.getByRole("region", {
      name: enMessages.single_page.projects.title,
    });
    expect(section).toHaveClass("custom-projects-class");

    const researchTab = screen.getByRole("tab", { name: /research/i });
    expect(researchTab).toHaveAttribute("aria-selected", "true");
  });
});
