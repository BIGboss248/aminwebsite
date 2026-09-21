import React from "react";
import { render, screen } from "@testing-library/react";
import { FeaturedProjectsGrid } from "./FeaturedProjectsGrid";
import { ProjectCard } from "./ProjectCard";
import { FeaturedProjectsGridSkeleton } from "./FeaturedProjectsGridSkeleton";
import { ROUTES } from "@/lib/routes";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "home.featured_projects") {
      return (dict.home.featured_projects as Record<string, string>)[key] ?? key;
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

describe("FeaturedProjectsGrid (Baseline TDD)", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("renders default English section headers and 3 project dossier cards", () => {
    mockLocale = "en";
    render(<FeaturedProjectsGrid locale="en" />);

    // Eyebrow & Main Section Headline
    expect(
      screen.getByText(/\/\/ 02\. FEATURED ENGINEERING SYSTEMS/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Selected Case Studies & Delivered Systems/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /High-impact production systems spanning enterprise web platforms, high-throughput e-commerce engines, and cross-platform mobile apps\./i,
      ),
    ).toBeInTheDocument();

    // CASE 01: Enterprise Corporate Platform
    expect(screen.getByText(/CASE_01 \/\/ WEB_PLATFORM/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Enterprise Corporate Platform/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Full-Stack Architecture & Web Vitals/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /High-performance corporate web platform engineered with Next.js App Router/i,
      ),
    ).toBeInTheDocument();

    // CASE 02: High-Throughput E-Commerce Platform
    expect(screen.getByText(/CASE_02 \/\/ COMMERCE_ENGINE/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /High-Throughput E-Commerce Platform/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Commerce Architecture & Inventory State/i),
    ).toBeInTheDocument();

    // CASE 03: Cross-Platform Note-Taking App
    expect(screen.getByText(/CASE_03 \/\/ MOBILE_APP/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Cross-Platform Note-Taking App/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Mobile State & Local-First Persistence/i),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Flutter/i).length).toBeGreaterThanOrEqual(1);

    // Action links
    const caseStudyLinks = screen.getAllByRole("link", {
      name: /View Case Study/i,
    });
    expect(caseStudyLinks).toHaveLength(3);

    // View All buttons (desktop + mobile)
    const viewAllLinks = screen.getAllByRole("link", {
      name: /Explore All Case Studies/i,
    });
    expect(viewAllLinks.length).toBeGreaterThanOrEqual(1);
    expect(viewAllLinks[0]).toHaveAttribute("href", ROUTES.projects.root);
  });

  it("renders authentic Persian translations when locale is 'fa'", () => {
    mockLocale = "fa";
    render(<FeaturedProjectsGrid locale="fa" />);

    expect(
      screen.getByText(/\/\/ ۰۲\. سامانه‌ها و پروژه‌های شاخص/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /مطالعات موردی منتخب و سیستم‌های توسعه‌یافته/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /پلتفرم سازمانی شرکت تجاری/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /پلتفرم فروشگاهی و تجارت الکترونیک/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /اپلیکیشن یادداشت‌برداری چندسکویی/i,
      }),
    ).toBeInTheDocument();
  });

  it("accepts and renders custom prop overrides for header and projects", () => {
    const customProjects = [
      {
        id: "custom-1",
        tag: "CASE_CUSTOM // DISTRIBUTED_DB",
        title: "Distributed Storage Engine",
        role: "Systems & Consensus Engineering",
        summary: "High-concurrency Raft consensus engine built in Rust.",
        techStack: ["Rust", "Raft", "gRPC"],
        href: "/projects/distributed-storage",
      },
    ];

    render(
      <FeaturedProjectsGrid
        locale="en"
        eyebrow="// CUSTOM EYEBROW"
        title="Custom Portfolio Headline"
        description="Custom engineering description for test."
        projects={customProjects}
        viewAllHref="/custom-projects-link"
      />,
    );

    expect(screen.getByText(/\/\/ CUSTOM EYEBROW/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Portfolio Headline/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Custom engineering description for test\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/CASE_CUSTOM \/\/ DISTRIBUTED_DB/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Distributed Storage Engine/i,
      }),
    ).toBeInTheDocument();
    const customViewAllLinks = screen.getAllByRole("link", {
      name: /Explore All Case Studies/i,
    });
    expect(customViewAllLinks[0]).toHaveAttribute("href", "/custom-projects-link");
  });

  it("renders individual ProjectCard with correct semantic elements and ARIA bindings", () => {
    const project = {
      id: "test-card",
      tag: "CASE_99 // PROTOTYPE",
      title: "Diagnostic DNS Prober",
      role: "Network Security & Edge Probing",
      summary: "Browser-based DNS-over-HTTPS benchmarking utility.",
      techStack: ["TypeScript", "Web Workers", "DoH"],
      href: "/projects/dns-prober",
    };

    render(<ProjectCard project={project} locale="en" />);

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Diagnostic DNS Prober/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/CASE_99 \/\/ PROTOTYPE/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Network Security & Edge Probing/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Browser-based DNS-over-HTTPS benchmarking utility\./i),
    ).toBeInTheDocument();
    expect(screen.getByText("Web Workers")).toBeInTheDocument();
  });
});

describe("FeaturedProjectsGridSkeleton", () => {
  it("renders skeleton layout and placeholders without crashing", () => {
    const { container } = render(<FeaturedProjectsGridSkeleton />);

    // Section container
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("aria-hidden", "true");

    // Check for animated pulse skeletons
    const pulseElements = container.querySelectorAll(".animate-pulse");
    expect(pulseElements.length).toBeGreaterThan(5);
  });
});
