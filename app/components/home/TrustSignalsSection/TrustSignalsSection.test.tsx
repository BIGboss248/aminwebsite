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
        name: /Grounded Engineering Rigor & Verified Credentials/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Backed by production deployments, dual academic degrees, peer-reviewed research, and certified industry specializations\./i,
      ),
    ).toBeInTheDocument();

    // Cell 1: Production Web Vitals
    expect(screen.getByText(/PRODUCTION EXPERTISE/i)).toBeInTheDocument();
    expect(screen.getByText(/5\+ Yrs/i)).toBeInTheDocument();
    expect(screen.getByText(/Production Experience/i)).toBeInTheDocument();
    expect(screen.getAllByText(/100%/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Type-Safe & Tested/i)).toBeInTheDocument();
    expect(screen.getByText(/Docker/i)).toBeInTheDocument();
    expect(screen.getByText(/OCI Containerized/i)).toBeInTheDocument();

    // Cell 2: Dual Academic Foundation
    expect(screen.getByText(/DUAL B\.S\. DEGREES/i)).toBeInTheDocument();
    expect(screen.getByText(/B\.S\. in Computer Engineering/i)).toBeInTheDocument();
    expect(
      screen.getByText(/B\.S\. in Financial Management/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Software Engineering × Financial Intelligence/i),
    ).toBeInTheDocument();

    // Cell 3: Professional Certifications
    expect(screen.getByText(/VERIFIED SPECIALIZATIONS/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Google AI & Prompt Optimization/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/React Foundations for Next\.js/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/DevOps, Cloud & Containers/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/AWS Cloud Quest Tracks/i),
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
      screen.getByText(/\/\/ ۰۱\. مدارک تأیید شده و توانمندی‌های عملیاتی/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /دقت مهندسی مبتنی بر پروژه‌های واقعی و مدارج معتبر/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/تخصص در محیط عملیاتی/i)).toBeInTheDocument();
    expect(screen.getByText(/کارشناسی مهندسی کامپیوتر/i)).toBeInTheDocument();
    expect(screen.getByText(/کارشناسی مدیریت مالی/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/تخصص‌های تأیید شده/i).length,
    ).toBeGreaterThanOrEqual(1);
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
      name: /Grounded Engineering Rigor & Verified Credentials/i,
    });
    expect(section).toBeInTheDocument();

    // Check accessible metric labels
    expect(
      screen.getByLabelText(/More than 5 years of production experience/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/100% strict TypeScript type safety/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Production Docker containerized architecture/i),
    ).toBeInTheDocument();
  });

  it("renders TrustSignalsSectionSkeleton fallback properly with pulse animation", () => {
    const { container } = render(<TrustSignalsSectionSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
