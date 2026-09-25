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

describe("ProjectArchiveGrid Component", () => {
  it("renders all 5 case studies by default and filters by category tabs", () => {
    render(<ProjectArchiveGrid locale="en" />);

    expect(screen.getByText("Setayesh Parts Web Platform")).toBeInTheDocument();
    expect(screen.getByText("Bahar Trade Co. Web Platform")).toBeInTheDocument();
    expect(
      screen.getByText("ParsBERT-XGBoost Commodity Volatility Model"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("DQN & LSTM Volatility Analysis Engine"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Bahar Trade IT Automation & Database Tuning"),
    ).toBeInTheDocument();

    // Click on "Systems & Automation"
    const systemsTab = screen.getByRole("tab", {
      name: /Systems & Automation/i,
    });
    fireEvent.click(systemsTab);

    expect(
      screen.getByText("Bahar Trade IT Automation & Database Tuning"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Setayesh Parts Web Platform"),
    ).not.toBeInTheDocument();
  });

  it("filters case studies in real-time when typing in the search bar", () => {
    render(<ProjectArchiveGrid locale="en" />);

    const searchInput = screen.getByRole("searchbox");
    fireEvent.change(searchInput, { target: { value: "ParsBERT" } });

    expect(
      screen.getByText("ParsBERT-XGBoost Commodity Volatility Model"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Setayesh Parts Web Platform"),
    ).not.toBeInTheDocument();
  });

  it("shows empty state and allows resetting filters when no items match", () => {
    render(<ProjectArchiveGrid locale="en" />);

    const searchInput = screen.getByRole("searchbox");
    fireEvent.change(searchInput, {
      target: { value: "NonExistentTechnologyQueryXYZ" },
    });

    expect(
      screen.getByText("No case studies matched your filter"),
    ).toBeInTheDocument();

    const resetBtn = screen.getByRole("button", { name: /Reset All Filters/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText("Setayesh Parts Web Platform")).toBeInTheDocument();
    expect(searchInput).toHaveValue("");
  });
});
