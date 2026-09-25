import React from "react";
import { render, screen } from "@testing-library/react";
import { LabToolCard } from "./LabToolCard";
import type { LabToolItem } from "./LabToolCard.types";

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

const mockTool: LabToolItem = {
  id: "doh",
  tag: "PROBE_01 // RFC 8484",
  status: "OPERATIONAL",
  title: "DNS over HTTPS (DoH) Prober",
  description: "Benchmark real-time DNS resolution latency directly from your browser.",
  protocol: "RFC 8484 / application/dns-json",
  executionMode: "Direct Browser Fetch",
  latencyTarget: "Sub-50ms Benchmarking",
  features: [
    "Multi-Resolver Parallel Latency Comparison",
    "DNS Poisoning & Spoofing Detection",
  ],
  href: "/en/lab/doh",
  cta: "Launch DoH Prober",
  category: "dns",
  glyphType: "doh",
};

describe("LabToolCard Component", () => {
  it("renders tool card with title, protocol, features, and launch link", () => {
    render(<LabToolCard tool={mockTool} locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /DNS over HTTPS \(DoH\) Prober/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("PROBE_01 // RFC 8484")).toBeInTheDocument();
    expect(screen.getByText("OPERATIONAL")).toBeInTheDocument();
    expect(screen.getByText("Sub-50ms Benchmarking")).toBeInTheDocument();
    expect(
      screen.getByText("Multi-Resolver Parallel Latency Comparison"),
    ).toBeInTheDocument();

    const launchLink = screen.getByRole("link", { name: /Launch DoH Prober/i });
    expect(launchLink).toHaveAttribute("href", "/en/lab/doh");
  });
});
