import { render, screen } from "@testing-library/react";
import React from "react";
import { HeroSection } from "./HeroSection";
import type { AvailabilityStatus } from "./HeroSection.types";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "home.hero") {
      return (dict.home.hero as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));


// Mock the Link component from @/app/components/Link
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

describe("HeroSection (Adversarial Edge Cases & Stress Tests)", () => {
  describe("Extreme Boundary Conditions", () => {
    it("handles empty string overrides gracefully without crashing", () => {
      const { container } = render(
        <HeroSection
          title=""
          description=""
          availabilityText=""
          primaryCtaText=""
          secondaryCtaText=""
          labCtaText=""
          className=""
        />,
      );

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe("");

      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("handles extremely large text strings without layout breaking or crashing", () => {
      const massiveTitle = "A".repeat(5000);
      const massiveDescription = "B".repeat(10000);
      const massiveStatus = "C".repeat(1000);

      const { container } = render(
        <HeroSection
          title={massiveTitle}
          description={massiveDescription}
          availabilityText={massiveStatus}
        />,
      );

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.textContent).toBe(massiveTitle);
      expect(screen.getByText(massiveDescription)).toBeInTheDocument();
      expect(screen.getByText(massiveStatus)).toBeInTheDocument();
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("handles explicit undefined for all optional props by falling back to defaults", () => {
      render(
        <HeroSection
          locale={undefined}
          availabilityText={undefined}
          availabilityStatus={undefined}
          title={undefined}
          description={undefined}
          primaryCtaText={undefined}
          primaryCtaHref={undefined}
          secondaryCtaText={undefined}
          secondaryCtaHref={undefined}
          labCtaText={undefined}
          labCtaHref={undefined}
          className={undefined}
        />,
      );

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /Architecting Solutions Across Frontend & Infrastructure/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/AVAILABLE FOR ARCHITECTURE & CONTRACTS/i),
      ).toBeInTheDocument();
    });

    it("handles explicit null overrides by triggering nullish coalescing defaults", () => {
      render(
        <HeroSection
          title={null as unknown as string}
          description={null as unknown as string}
          availabilityText={null as unknown as string}
          primaryCtaText={null as unknown as string}
          secondaryCtaText={null as unknown as string}
          labCtaText={null as unknown as string}
        />,
      );

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /Architecting Solutions Across Frontend & Infrastructure/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/AVAILABLE FOR ARCHITECTURE & CONTRACTS/i),
      ).toBeInTheDocument();
    });
  });

  describe("AvailabilityStatus Variants & Fallback", () => {
    it("renders 'available' status with emerald indicators", () => {
      const { container } = render(
        <HeroSection availabilityStatus="available" />,
      );

      const pill = container.querySelector(".rounded-full.border.text-xs");
      expect(pill).toHaveClass("text-emerald-600");

      const dot = container.querySelector(".rounded-full.animate-pulse");
      expect(dot).toHaveClass("bg-emerald-500");
    });

    it("renders 'busy' status with amber indicators", () => {
      const { container } = render(
        <HeroSection availabilityStatus="busy" />,
      );

      const pill = container.querySelector(".rounded-full.border.text-xs");
      expect(pill).toHaveClass("text-amber-600");

      const dot = container.querySelector(".rounded-full.animate-pulse");
      expect(dot).toHaveClass("bg-amber-500");
    });

    it("renders 'offline' status with zinc indicators", () => {
      const { container } = render(
        <HeroSection availabilityStatus="offline" />,
      );

      const pill = container.querySelector(".rounded-full.border.text-xs");
      expect(pill).toHaveClass("text-zinc-600");

      const dot = container.querySelector(".rounded-full.animate-pulse");
      expect(dot).toHaveClass("bg-zinc-400");
    });

    it("falls back gracefully when an unknown availabilityStatus is provided", () => {
      const { container } = render(
        <HeroSection
          availabilityStatus={"unknown_status" as unknown as AvailabilityStatus}
        />,
      );

      // Dot falls back to bg-zinc-400
      const dot = container.querySelector(".rounded-full.animate-pulse");
      expect(dot).toHaveClass("bg-zinc-400");
      expect(container.querySelector("section")).toBeInTheDocument();
    });
  });

  describe("Full BiDi (RTL & LTR) Rendering Assertions", () => {
    it("enforces dir='ltr' on telemetry grid and status bar even under Persian (RTL)", () => {
      const { container } = render(<HeroSection locale="fa" />);

      // Find elements with dir="ltr"
      const ltrContainers = container.querySelectorAll("[dir='ltr']");
      expect(ltrContainers.length).toBeGreaterThanOrEqual(2);

      // Verify telemetry metrics grid enforces LTR
      const telemetryGrid = ltrContainers[0];
      expect(telemetryGrid).toHaveClass("font-mono");
      expect(telemetryGrid).toHaveAttribute("dir", "ltr");

      // Verify status bar enforces LTR and displays Persian locale tag
      const statusBar = ltrContainers[1];
      expect(statusBar).toHaveAttribute("dir", "ltr");
      expect(statusBar.textContent).toContain("LOCALE: FA");
    });

    it("contains logical directional classes (ms-, rtl:rotate-180, items-start, text-start)", () => {
      const { container } = render(<HeroSection locale="fa" />);

      const narrativeCol = container.querySelector(".lg\\:col-span-7");
      expect(narrativeCol).toHaveClass("items-start");
      expect(narrativeCol).toHaveClass("text-start");

      const ctaArrow = container.querySelector(".ms-1.rtl\\:rotate-180");
      expect(ctaArrow).toBeInTheDocument();
      expect(ctaArrow).toHaveAttribute("aria-hidden", "true");
    });

    it("handles non-standard locale gracefully by falling back to English defaults with uppercased locale tag", () => {
      render(<HeroSection locale="de" />);

      // Falls back to English text
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /Architecting Solutions Across Frontend & Infrastructure/i,
        }),
      ).toBeInTheDocument();

      // Telemetry status bar reflects requested locale
      expect(screen.getByText(/LOCALE: DE/i)).toBeInTheDocument();
    });
  });

  describe("Accessibility Landmarks & Attributes", () => {
    it("has aria-labelledby='hero-heading' on section pointing to the semantic <h1>", () => {
      const { container } = render(<HeroSection />);

      const section = container.querySelector("section");
      expect(section).toHaveAttribute("aria-labelledby", "hero-heading");

      const heading = container.querySelector("#hero-heading");
      expect(heading).toBeInTheDocument();
      expect(heading?.tagName.toLowerCase()).toBe("h1");
    });

    it("provides accessible, keyboard-focusable telemetry card with tabIndex={0}", () => {
      render(<HeroSection />);

      const telemetryCard = screen.getByLabelText("Systems telemetry card");
      expect(telemetryCard).toBeInTheDocument();
      expect(telemetryCard).toHaveAttribute("tabindex", "0");

      telemetryCard.focus();
      expect(document.activeElement).toBe(telemetryCard);
    });

    it("ensures decorative elements have aria-hidden='true'", () => {
      const { container } = render(<HeroSection />);

      const gridOverlay = container.querySelector("[aria-hidden='true']");
      expect(gridOverlay).toBeInTheDocument();

      const pulseDots = container.querySelectorAll("span[aria-hidden='true']");
      expect(pulseDots.length).toBeGreaterThan(0);
    });
  });

  describe("Component Stability Under Stress", () => {
    it("remains stable under rapid re-renders with alternating props and locales", () => {
      const { rerender } = render(<HeroSection locale="en" availabilityStatus="available" />);

      const statuses: AvailabilityStatus[] = ["available", "busy", "offline"];
      const locales = ["en", "fa", "en", "fa"];

      for (let i = 0; i < 30; i++) {
        const locale = locales[i % locales.length];
        const availabilityStatus = statuses[i % statuses.length];
        const title = `Stress Test Iteration ${i}`;

        rerender(
          <HeroSection
            locale={locale}
            availabilityStatus={availabilityStatus}
            title={title}
          />,
        );

        const heading = screen.getByRole("heading", { level: 1 });
        expect(heading.textContent).toBe(title);
      }
    });
  });
});
