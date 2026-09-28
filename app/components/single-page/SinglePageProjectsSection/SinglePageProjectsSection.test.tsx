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

describe("SinglePageProjectsSection", () => {
  it("renders the section header and category tabs", () => {
    render(<SinglePageProjectsSection locale="en" />);

    expect(
      screen.getByRole("heading", {
        name: enMessages.single_page.projects.title,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("tab", { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /production/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /research/i })).toBeInTheDocument();
  });

  it("renders the updated Bahar Trade IT Automation and Infrastructure Management card without verified impact metrics", () => {
    render(<SinglePageProjectsSection locale="en" />);

    // Check title and summary
    expect(
      screen.getByText("Bahar Trade IT Automation and Infrastructure Management"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Enterprise Linux Server Automation, Active Directory Management, Enterprise Security, and IT Administration.",
      ),
    ).toBeInTheDocument();

    // Verify impact matrix metrics (e.g. Query Latency Drop) are NOT rendered
    expect(screen.queryByText("Query Latency Drop")).not.toBeInTheDocument();
    expect(screen.queryByText("-82%")).not.toBeInTheDocument();

    // Verify Bahar Trade card title is plain text and not a link
    const titleElement = screen.getByText(
      "Bahar Trade IT Automation and Infrastructure Management",
    );
    expect(titleElement.closest("a")).toBeNull();
  });

  it("filters cards when clicking category tabs", () => {
    render(<SinglePageProjectsSection locale="en" />);

    // Initially All projects are shown
    expect(
      screen.getByText("Bahar Trade IT Automation and Infrastructure Management"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(enMessages.single_page.projects.items.parsbert_ime_forecasting.title),
    ).toBeInTheDocument();

    // Click Research tab
    const researchTab = screen.getByRole("tab", { name: /research/i });
    fireEvent.click(researchTab);

    expect(
      screen.getByText(enMessages.single_page.projects.items.parsbert_ime_forecasting.title),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Bahar Trade IT Automation and Infrastructure Management"),
    ).not.toBeInTheDocument();

    // Click Production tab
    const prodTab = screen.getByRole("tab", { name: /production/i });
    fireEvent.click(prodTab);

    expect(
      screen.getByText("Bahar Trade IT Automation and Infrastructure Management"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(enMessages.single_page.projects.items.parsbert_ime_forecasting.title),
    ).not.toBeInTheDocument();
  });
});
