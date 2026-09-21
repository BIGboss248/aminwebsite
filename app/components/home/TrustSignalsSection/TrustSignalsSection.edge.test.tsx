import React from "react";
import { render, screen } from "@testing-library/react";
import { TrustSignalsSection } from "./TrustSignalsSection";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "home.trust_signals") {
      return (dict.home.trust_signals as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

// Mock Link from @/app/components/Link
jest.mock("@/app/components/Link", () => {
  return {
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
  };
});

describe("TrustSignalsSection (Adversarial Edge Cases & Stress Tests)", () => {
  describe("Extreme Boundary Conditions", () => {
    it("handles empty string overrides gracefully without crashing", () => {
      const { container } = render(
        <TrustSignalsSection
          eyebrow=""
          title=""
          description=""
          actionHref=""
          className=""
        />,
      );

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe("");
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("handles massive strings without layout breaks or throwing", () => {
      const massiveEyebrow = "E".repeat(2000);
      const massiveTitle = "T".repeat(5000);
      const massiveDesc = "D".repeat(10000);

      const { container } = render(
        <TrustSignalsSection
          eyebrow={massiveEyebrow}
          title={massiveTitle}
          description={massiveDesc}
        />,
      );

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading.textContent).toBe(massiveTitle);
      expect(screen.getByText(massiveDesc)).toBeInTheDocument();
      expect(screen.getByText(massiveEyebrow)).toBeInTheDocument();
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("handles explicit undefined/null overrides by falling back safely", () => {
      render(
        <TrustSignalsSection
          locale={undefined}
          eyebrow={undefined}
          title={undefined}
          description={undefined}
          actionHref={undefined}
          className={undefined}
        />,
      );

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: /Empirical Proof & Verifiable Systems Rigor/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe("BiDi (RTL & LTR) Adaptations & Layout Direction", () => {
    it("preserves dir='ltr' for raw Web Vitals monospace metrics grid in both LTR and RTL", () => {
      const { container } = render(<TrustSignalsSection locale="fa" />);

      const ltrContainer = container.querySelector("[dir='ltr']");
      expect(ltrContainer).toBeInTheDocument();
      expect(ltrContainer).toHaveAttribute("dir", "ltr");
    });

    it("includes RTL logical classes (ps-, rtl:rotate-180) for cross-border alignment", () => {
      const { container } = render(<TrustSignalsSection locale="fa" />);

      const arrow = container.querySelector(".rtl\\:rotate-180");
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Rapid State Re-rendering Stress Test", () => {
    it("survives rapid re-renders with alternating locales and props", () => {
      const { rerender } = render(<TrustSignalsSection locale="en" />);

      for (let i = 0; i < 30; i++) {
        const locale = i % 2 === 0 ? "en" : "fa";
        const title = `Trust Stress Test Iteration ${i}`;

        rerender(<TrustSignalsSection locale={locale} title={title} />);

        const heading = screen.getByRole("heading", { level: 2 });
        expect(heading.textContent).toBe(title);
      }
    });
  });
});
