import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DohQueryController } from "./DohQueryController";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.lab.doh_prober.controller as Record<string, string>)[key] ?? key;
  },
}));

describe("DohQueryController Component", () => {
  const defaultProps = {
    mode: "single" as const,
    onModeChange: jest.fn(),
    selectedResolver: "cloudflare" as const,
    onResolverChange: jest.fn(),
    customUrl: "",
    onCustomUrlChange: jest.fn(),
    domain: "google.com",
    onDomainChange: jest.fn(),
    recordType: "A" as const,
    onRecordTypeChange: jest.fn(),
    isExecuting: false,
    onExecute: jest.fn(),
  };

  it("renders domain input, resolvers, record types, and triggers execute on button click", () => {
    render(<DohQueryController {...defaultProps} />);

    expect(screen.getByDisplayValue("google.com")).toBeInTheDocument();
    expect(screen.getByText("Cloudflare")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();

    const executeBtn = screen.getByRole("button", {
      name: /Query Selected Resolver/i,
    });
    fireEvent.click(executeBtn);
    expect(defaultProps.onExecute).toHaveBeenCalledTimes(1);
  });

  it("switches query mode when mode buttons are clicked", () => {
    render(<DohQueryController {...defaultProps} />);

    const parallelBtn = screen.getByRole("radio", {
      name: /Benchmark All \(Parallel\)/i,
    });
    fireEvent.click(parallelBtn);
    expect(defaultProps.onModeChange).toHaveBeenCalledWith("parallel");
  });
});
