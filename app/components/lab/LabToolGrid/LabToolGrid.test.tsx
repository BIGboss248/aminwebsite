import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LabToolGrid } from "./LabToolGrid";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    if (namespace === "lab.tools_catalog") {
      return (enMessages.lab.tools_catalog as Record<string, string>)[key] ?? key;
    }
    if (namespace === "lab.tools.doh") {
      if (key.startsWith("features.")) {
        const idx = parseInt(key.split(".")[1], 10);
        return enMessages.lab.tools.doh.features[idx] ?? key;
      }
      return (
        (enMessages.lab.tools.doh as unknown as Record<string, string>)[key] ??
        key
      );
    }
    if (namespace === "lab.tools.ipinfo") {
      if (key.startsWith("features.")) {
        const idx = parseInt(key.split(".")[1], 10);
        return enMessages.lab.tools.ipinfo.features[idx] ?? key;
      }
      return (
        (enMessages.lab.tools.ipinfo as unknown as Record<string, string>)[key] ??
        key
      );
    }
    if (namespace === "lab.tools.fingerprint") {
      if (key.startsWith("features.")) {
        const idx = parseInt(key.split(".")[1], 10);
        return enMessages.lab.tools.fingerprint.features[idx] ?? key;
      }
      return (
        (enMessages.lab.tools.fingerprint as unknown as Record<
          string,
          string
        >)[key] ?? key
      );
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

describe("LabToolGrid Component", () => {
  it("renders catalog heading, category filter tabs, and all 3 tool cards by default", () => {
    render(<LabToolGrid locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Interactive Probers & Systems Instrumentation/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("tab", { name: /All Diagnostic Tools/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /DNS & Protocol Probing/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /Network & IP Auditing/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /Hardware & Entropy/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /DNS over HTTPS \(DoH\) Prober/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /IP & Identity Leak Scanner/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Client Device Fingerprint Inspector/i,
      }),
    ).toBeInTheDocument();
  });

  it("filters tools correctly when a category tab is clicked", () => {
    render(<LabToolGrid locale="en" />);

    const dnsTab = screen.getByRole("tab", { name: /DNS & Protocol Probing/i });
    fireEvent.click(dnsTab);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /DNS over HTTPS \(DoH\) Prober/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 3,
        name: /IP & Identity Leak Scanner/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 3,
        name: /Client Device Fingerprint Inspector/i,
      }),
    ).not.toBeInTheDocument();
  });
});
