import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectArchiveGrid } from "./ProjectArchiveGrid";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string, params?: { count?: number }) => {
    if (key === "results_count" && params?.count !== undefined) {
      return `${params.count} case studies found`;
    }
    if (namespace === "projects.filter") {
      return (enMessages.projects.filter as Record<string, string>)[key] ?? key;
    }
    if (namespace === "projects.case_studies") {
      const parts = key.split(".");
      if (parts.length === 2 && parts[0] && parts[1]) {
        const item = (enMessages.projects.case_studies as Record<string, unknown>)[parts[0]] as Record<string, string> | undefined;
        return item?.[parts[1]] ?? key;
      }
      return (enMessages.projects.case_studies as unknown as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

jest.mock("@/app/components/Link", () => ({
  __esModule: true,
  Link: ({
    children,
    href,
    className,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ),
  default: ({
    children,
    href,
    className,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ),
}));

describe("ProjectArchiveGrid Edge Cases", () => {
  it("handles leading and trailing whitespace and case-insensitive search queries", () => {
    render(<ProjectArchiveGrid locale="en" />);

    const searchInput = screen.getByRole("searchbox");
    fireEvent.change(searchInput, { target: { value: "   PAYLOAD   " } });

    expect(screen.getByText("Setayesh Parts Web Platform")).toBeInTheDocument();
    expect(screen.getByText("Bahar Trade Co. Web Platform")).toBeInTheDocument();
    expect(
      screen.queryByText("ParsBERT-XGBoost Commodity Volatility Model"),
    ).not.toBeInTheDocument();
  });

  it("filters correctly by Academic Research category (DOI matching)", () => {
    render(<ProjectArchiveGrid locale="en" />);

    const researchTab = screen.getByRole("tab", {
      name: /Academic Research/i,
    });
    fireEvent.click(researchTab);

    expect(
      screen.getByText("ParsBERT-XGBoost Commodity Volatility Model"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("DQN & LSTM Volatility Analysis Engine"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Bahar Trade IT Automation & Database Tuning"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Setayesh Parts Web Platform"),
    ).not.toBeInTheDocument();
  });

  it("handles empty custom case study lists gracefully", () => {
    render(<ProjectArchiveGrid caseStudies={[]} locale="en" />);

    // When caseStudies is empty array, it falls back to all default case studies
    expect(screen.getByText("Setayesh Parts Web Platform")).toBeInTheDocument();
  });
});
