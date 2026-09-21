import React from "react";
import { render, screen } from "@testing-library/react";
import { TrustSignalsSection } from "./TrustSignalsSection";
import { TrustSignalsSectionSkeleton } from "./TrustSignalsSectionSkeleton";
import { ROUTES } from "@/lib/routes";
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

describe("TrustSignalsSection (Baseline TDD)", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("renders default English section headers, metrics, and bento cards", () => {
    mockLocale = "en";
    render(<TrustSignalsSection locale="en" />);

    // Eyebrow & Main Section Headline
    expect(
      screen.getByText(/\/\/ 01\. VERIFIED CREDENTIALS & PRODUCTION SIGNALS/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Empirical Proof & Verifiable Systems Rigor/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Grounded in audited production benchmarks, dual academic foundations, and certified industry engineering specializations\./i,
      ),
    ).toBeInTheDocument();

    // Cell 1: Production Web Vitals
    expect(screen.getByText(/PRODUCTION VERIFIED/i)).toBeInTheDocument();
    expect(screen.getByText(/Sub-Second LCP/i)).toBeInTheDocument();
    expect(screen.getByText(/< 0\.8s/i)).toBeInTheDocument();
    expect(screen.getByText(/Audited Score/i)).toBeInTheDocument();
    expect(screen.getByText(/99\+/i)).toBeInTheDocument();
    expect(screen.getByText(/Zero Visual Shift/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();

    // Cell 2: Dual Academic Foundation
    expect(screen.getByText(/DUAL B\.S\. DEGREES/i)).toBeInTheDocument();
    expect(screen.getByText(/B\.S\. in Computer Science/i)).toBeInTheDocument();
    expect(
      screen.getByText(/B\.S\. in Financial Management/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Systems Architecture × Business Logic/i),
    ).toBeInTheDocument();

    // Cell 3: Professional Certifications
    expect(screen.getByText(/VERIFIED SPECIALIZATIONS/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Full-Stack Web Architecture/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Deep Learning & Neural Networks/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Cloud Systems & DevOps Automation/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Advanced TypeScript & Modern React/i),
    ).toBeInTheDocument();

    // Cell 4: Bilingual Fluency
    expect(screen.getByText(/GLOBAL COMMUNICATOR/i)).toBeInTheDocument();
    expect(screen.getByText(/Persian \(فارسی\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Native \/ Mother Language/i)).toBeInTheDocument();
    expect(
      screen.getByText(/100% BiDi Ready \(LTR \+ RTL Architecture\)/i),
    ).toBeInTheDocument();
  });

  it("renders default Persian section content when locale='fa'", () => {
    mockLocale = "fa";
    render(<TrustSignalsSection locale="fa" />);

    expect(
      screen.getByText(/\/\/ ۰۱\. مدارک تأیید شده و معیارهای عملیاتی/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /اثبات تجربی و دقت مهندسی در سطح سامانه‌ها/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/تأیید شده در محیط عملیاتی/i)).toBeInTheDocument();
    expect(screen.getByText(/کارشناسی علوم کامپیوتر/i)).toBeInTheDocument();
    expect(screen.getByText(/کارشناسی مدیریت مالی/i)).toBeInTheDocument();
    expect(screen.getByText(/تخصص‌های تأیید شده/i)).toBeInTheDocument();
    expect(screen.getByText(/فارسی \(Persian\)/i)).toBeInTheDocument();
  });

  it("renders custom prop overrides when provided", () => {
    render(
      <TrustSignalsSection
        eyebrow="// CUSTOM EYEBROW"
        title="Custom Trust Title"
        description="Custom engineering proof description."
        actionHref="/custom-credentials"
      />,
    );

    expect(screen.getByText("// CUSTOM EYEBROW")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Custom Trust Title" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Custom engineering proof description."),
    ).toBeInTheDocument();

    const actionLink = screen.getByRole("link", {
      name: /View All Verified Credentials/i,
    });
    expect(actionLink).toHaveAttribute("href", "/custom-credentials");
  });

  it("links action button to default type-safe ROUTES.about", () => {
    mockLocale = "en";
    render(<TrustSignalsSection locale="en" />);

    const actionLink = screen.getByRole("link", {
      name: /View All Verified Credentials/i,
    });
    expect(actionLink).toHaveAttribute("href", ROUTES.about);
  });

  it("renders with proper accessibility attributes and semantic landmarks", () => {
    mockLocale = "en";
    render(<TrustSignalsSection locale="en" />);

    const section = screen.getByRole("region", {
      name: /Empirical Proof & Verifiable Systems Rigor/i,
    });
    expect(section).toBeInTheDocument();

    // Check accessible metric labels
    expect(
      screen.getByLabelText(/Largest Contentful Paint: less than 0.8 seconds/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Lighthouse Performance Score: 99 plus/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Cumulative Layout Shift: zero visual shift/i),
    ).toBeInTheDocument();
  });

  it("renders TrustSignalsSectionSkeleton fallback properly with pulse animation", () => {
    const { container } = render(<TrustSignalsSectionSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
