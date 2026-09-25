import React from "react";
import { render, screen } from "@testing-library/react";
import { CaseStudyCard } from "./CaseStudyCard";
import type { CaseStudyItem } from "./CaseStudyCard.types";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.projects.case_studies as unknown as Record<string, string>)[key] ?? key;
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

describe("CaseStudyCard Component", () => {
  const mockCaseStudy: CaseStudyItem = {
    id: "setayesh-parts",
    category: "fullstack",
    tag: "COMMERCIAL // E-COMMERCE",
    status: "PRODUCTION",
    title: "Setayesh Parts Web Platform",
    role: "Full-Stack Architecture & DevOps Engineer",
    client: "Setayesh Auto Parts Co.",
    summary: "Scalable commercial web platform and e-commerce catalog engine.",
    metrics: [
      { value: "< 0.8s", label: "Sub-Second LCP" },
      { value: "99+", label: "Lighthouse Score" },
      { value: "100%", label: "Automated CI/CD" },
    ],
    techStack: ["Next.js", "Payload CMS", "Docker VPS"],
    href: "/projects/setayesh-parts",
    liveUrl: "https://setayeshparts.com",
    doi: "10.1234/test.doi",
  };

  it("renders card title, role, client, metrics, and links correctly", () => {
    render(<CaseStudyCard caseStudy={mockCaseStudy} locale="en" />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Setayesh Parts Web Platform",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("COMMERCIAL // E-COMMERCE")).toBeInTheDocument();
    expect(screen.getByText("PRODUCTION")).toBeInTheDocument();
    expect(
      screen.getByText("Full-Stack Architecture & DevOps Engineer"),
    ).toBeInTheDocument();
    expect(screen.getByText("Setayesh Auto Parts Co.")).toBeInTheDocument();

    expect(screen.getByText("< 0.8s")).toBeInTheDocument();
    expect(screen.getByText("Sub-Second LCP")).toBeInTheDocument();

    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Payload CMS")).toBeInTheDocument();

    const detailLinks = screen.getAllByRole("link", {
      name: /Setayesh Parts Web Platform|Explore Technical Case Study/i,
    });
    expect(detailLinks[0]).toHaveAttribute("href", "/projects/setayesh-parts");

    const liveLink = screen.getByTitle("Live Production Site");
    expect(liveLink).toHaveAttribute("href", "https://setayeshparts.com");

    const doiLink = screen.getByTitle("View Research Paper (DOI)");
    expect(doiLink).toHaveAttribute("href", "https://doi.org/10.1234/test.doi");
  });
});
