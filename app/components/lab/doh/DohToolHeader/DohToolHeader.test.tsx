import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DohToolHeader } from "./DohToolHeader";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    if (namespace === "lab.doh_prober.header") {
      return (enMessages.lab.doh_prober.header as Record<string, string>)[key] ?? key;
    }
    if (namespace === "lab.doh_prober.methodology") {
      return (enMessages.lab.doh_prober.methodology as Record<string, string>)[key] ?? key;
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

describe("DohToolHeader Component", () => {
  it("renders header title, description, and back link to lab hub", () => {
    render(<DohToolHeader locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /DNS over HTTPS \(DoH\) Prober/i,
      }),
    ).toBeInTheDocument();

    const backLink = screen.getByRole("link", { name: /Return to Lab Hub/i });
    expect(backLink).toHaveAttribute("href", "/lab");
  });

  it("toggles methodology details when toggle button is clicked", () => {
    render(<DohToolHeader locale="en" />);

    const toggleBtn = screen.getByRole("button", { name: /Learn Methodology/i });
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.getByText("RFC 8484 Standard")).toBeInTheDocument();
    expect(screen.getByText("Poisoning Detection")).toBeInTheDocument();
  });
});
