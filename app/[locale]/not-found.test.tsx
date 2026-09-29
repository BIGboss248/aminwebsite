import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";
import enMessages from "@/messages/en.json";

const mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    if (namespace === "not_found") {
      return (enMessages.not_found as Record<string, string>)[key] ?? key;
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

describe("NotFound ([locale]/not-found component)", () => {
  it("renders 404 title, eyebrow, and description", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("// 404 UNRESOLVED ROUTE")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The requested resource could not be found or has been relocated.",
      ),
    ).toBeInTheDocument();
  });

  it("renders return home link and section shortcut jump links", () => {
    render(<NotFound />);

    const returnHomeLink = screen.getByRole("link", { name: /return home/i });
    expect(returnHomeLink).toBeInTheDocument();
    expect(returnHomeLink).toHaveAttribute("href", "/");

    const heroLink = screen.getByRole("link", { name: /overview & bio/i });
    expect(heroLink).toHaveAttribute("href", "/#hero");

    const projectsLink = screen.getByRole("link", { name: /projects & research/i });
    expect(projectsLink).toHaveAttribute("href", "/#projects");

    const certsLink = screen.getByRole("link", { name: /certifications/i });
    expect(certsLink).toHaveAttribute("href", "/#certifications");

    const contactLink = screen.getByRole("link", { name: /contact & inquiries/i });
    expect(contactLink).toHaveAttribute("href", "/#contact");
  });
});
