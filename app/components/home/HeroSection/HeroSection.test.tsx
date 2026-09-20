import { render, screen } from "@testing-library/react";
import { HeroSection } from "./HeroSection";
import { HeroSectionSkeleton } from "./HeroSectionSkeleton";
import { ROUTES } from "@/lib/routes";

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

describe("HeroSection (Baseline TDD)", () => {
  it("renders default English title, description, and status pill", () => {
    render(<HeroSection locale="en" />);

    // Primary headline
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Architecting Solutions Across Frontend & Infrastructure/i,
      }),
    ).toBeInTheDocument();

    // Narrative description
    expect(
      screen.getByText(
        /Pro frontend engineering backed by deep CI\/CD pipelines, edge networking, and resilient systems design\./i,
      ),
    ).toBeInTheDocument();

    // Availability status
    expect(
      screen.getByText(/AVAILABLE FOR ARCHITECTURE & CONTRACTS/i),
    ).toBeInTheDocument();
  });

  it("renders default Persian title, description, and status pill when locale='fa'", () => {
    render(<HeroSection locale="fa" />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /معماری راه‌حل‌های جامع از فرانت‌اند تا زیرساخت/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /توسعه حرفه‌ای فرانت‌اند مبتنی بر خطوط CI\/CD، شبکه‌های لبه و طراحی سیستم‌های تاب‌آور\./i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/آماده برای همکاری و مشاوره معماری/i),
    ).toBeInTheDocument();
  });

  it("renders custom prop overrides when provided", () => {
    render(
      <HeroSection
        title="Custom Solutions Title"
        description="Custom engineering narrative."
        availabilityText="CUSTOM STATUS"
        primaryCtaText="Custom Contact"
        primaryCtaHref="/custom-contact"
        secondaryCtaText="Custom Projects"
        secondaryCtaHref="/custom-projects"
        labCtaText="Custom Lab"
        labCtaHref="/custom-lab"
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Custom Solutions Title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Custom engineering narrative.")).toBeInTheDocument();
    expect(screen.getByText("CUSTOM STATUS")).toBeInTheDocument();

    const primaryLink = screen.getByRole("link", { name: /Custom Contact/i });
    expect(primaryLink).toHaveAttribute("href", "/custom-contact");

    const secondaryLink = screen.getByRole("link", { name: /Custom Projects/i });
    expect(secondaryLink).toHaveAttribute("href", "/custom-projects");

    const labLink = screen.getByRole("link", { name: /Custom Lab/i });
    expect(labLink).toHaveAttribute("href", "/custom-lab");
  });

  it("renders navigation action links pointing to default type-safe ROUTES", () => {
    render(<HeroSection locale="en" />);

    const primaryLink = screen.getByRole("link", {
      name: /Book Introductory Call/i,
    });
    expect(primaryLink).toHaveAttribute("href", ROUTES.contact);

    const secondaryLink = screen.getByRole("link", {
      name: /Explore Case Studies/i,
    });
    expect(secondaryLink).toHaveAttribute("href", ROUTES.projects.root);

    const labLink = screen.getByRole("link", {
      name: /Launch Lab Probers/i,
    });
    expect(labLink).toHaveAttribute("href", ROUTES.lab.root);
  });

  it("renders live systems telemetry preview data", () => {
    render(<HeroSection locale="en" />);

    expect(screen.getByText(/EDGE_LATENCY/i)).toBeInTheDocument();
    expect(screen.getByText(/18ms/i)).toBeInTheDocument();
    expect(screen.getByText(/PIPELINE_STATUS/i)).toBeInTheDocument();
    expect(screen.getByText(/PASSING/i)).toBeInTheDocument();
  });

  it("renders HeroSectionSkeleton fallback with pulse animation", () => {
    const { container } = render(<HeroSectionSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});

