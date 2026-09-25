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
      screen.getByText(/IT Specialist & Full-Stack Web Developer/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /"Bridging modern web architectures, data-driven BI solutions, and rock-solid infrastructure\."/i,
      ),
    ).toBeInTheDocument();

    const projectsLink = screen.getByRole("link", {
      name: /View Projects & Case Studies/i,
    });
    expect(projectsLink).toHaveAttribute("href", ROUTES.projects.root);

    const labLink = screen.getByRole("link", {
      name: /Explore Interactive Lab/i,
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
      screen.getByText(/کارشناس ارشد فناوری اطلاعات \(IT\) و توسعه‌دهنده وب/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /«پیوند معماری مدرن وب، راهکارهای داده‌محور هوش تجاری و زیرساخت‌های پایدار.»/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders AboutHeroSkeleton fallback with pulse animation", () => {
    const { container } = render(<AboutHeroSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
