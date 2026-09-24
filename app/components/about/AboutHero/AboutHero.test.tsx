import React from "react";
import { render, screen } from "@testing-library/react";
import { AboutHero } from "./AboutHero";
import { AboutHeroSkeleton } from "./AboutHeroSkeleton";
import { ROUTES } from "@/lib/routes";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "about.hero") {
      return (dict.about.hero as Record<string, string>)[key] ?? key;
    }
    if (namespace === "common") {
      return (dict.common as Record<string, string>)[key] ?? key;
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

describe("AboutHero Component", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("renders default English title, philosophy quote, and CTAs", () => {
    mockLocale = "en";
    render(<AboutHero locale="en" />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Amin Jamali/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Systems Engineer & Full-Stack Developer/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /"I build systems that don't fail — obsidian reliability, zero compromise\."/i,
      ),
    ).toBeInTheDocument();

    const projectsLink = screen.getByRole("link", {
      name: /View Case Studies/i,
    });
    expect(projectsLink).toHaveAttribute("href", ROUTES.projects.root);

    const labLink = screen.getByRole("link", {
      name: /Explore the Lab/i,
    });
    expect(labLink).toHaveAttribute("href", ROUTES.lab.root);
  });

  it("renders Persian translations when locale='fa'", () => {
    mockLocale = "fa";
    render(<AboutHero locale="fa" />);

    expect(
      screen.getByRole("heading", { level: 1, name: /امین جمالی/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/مهندس سیستم‌ها و توسعه‌دهنده فول‌استک/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /«من سیستم‌هایی می‌سازم که شکست نمی‌خورند — پایداری ابسیدین، بدون هیچ مصالحه‌ای.»/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders AboutHeroSkeleton fallback with pulse animation", () => {
    const { container } = render(<AboutHeroSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
