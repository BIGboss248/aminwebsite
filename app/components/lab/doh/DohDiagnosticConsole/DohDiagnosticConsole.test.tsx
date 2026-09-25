import React from "react";
import { render, screen } from "@testing-library/react";
import { DohDiagnosticConsole } from "./DohDiagnosticConsole";
import type { DohQueryResult } from "../doh-types";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.lab.doh_prober.console as Record<string, string>)[key] ?? key;
  },
}));

const mockResults: DohQueryResult[] = [
  {
    resolverId: "cloudflare",
    resolverName: "Cloudflare (1.1.1.1)",
    url: "https://cloudflare-dns.com/dns-query",
    domain: "google.com",
    recordType: "A",
    latencyMs: 18,
    status: "secure",
    answers: [
      {
        name: "google.com",
        type: "A",
        TTL: 300,
        data: "142.250.190.46",
      },
    ],
    rawJson: {
      Status: 0,
      Answer: [{ name: "google.com", type: 1, TTL: 300, data: "142.250.190.46" }],
    },
    timestamp: "2026-09-25T19:00:00.000Z",
  },
];

describe("DohDiagnosticConsole Component", () => {
  it("renders empty state when results array is empty", () => {
    render(<DohDiagnosticConsole results={[]} isExecuting={false} locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Diagnostic Console Ready/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders latency bars, answer records table, and terminal when results are provided", () => {
    render(<DohDiagnosticConsole results={mockResults} isExecuting={false} locale="en" />);

    expect(screen.getByText("Cloudflare (1.1.1.1)")).toBeInTheDocument();
    expect(screen.getByText("18 ms")).toBeInTheDocument();
    expect(screen.getByText("142.250.190.46")).toBeInTheDocument();
    expect(screen.getByText("Copy Raw JSON")).toBeInTheDocument();
  });
});
