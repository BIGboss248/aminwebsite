import React from "react";
import { render, screen } from "@testing-library/react";
import { SinglePageHero } from "./SinglePageHero";
import { SinglePageHeroSkeleton } from "./SinglePageHeroSkeleton";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "single_page.hero") {
      return (dict.single_page.hero as Record<string, string>)[key] ?? key;
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

describe("SinglePageHero Component", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("renders default English title, philosophy quote, and anchor CTAs", () => {
    mockLocale = "en";
    render(<SinglePageHero locale="en" />);

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
    expect(projectsLink).toHaveAttribute("href", "#projects");

    const contactLink = screen.getByRole("link", {
      name: /Explore Interactive Lab/i,
    });
    expect(contactLink).toHaveAttribute("href", "#contact");
  });

  it("renders Persian translations when locale='fa'", () => {
    mockLocale = "fa";
    render(<SinglePageHero locale="fa" />);

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

  it("renders SinglePageHeroSkeleton fallback with pulse animation", () => {
    const { container } = render(<SinglePageHeroSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
