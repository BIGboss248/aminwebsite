import React from "react";
import { render, screen } from "@testing-library/react";
import { FeaturedProjectsGrid } from "./FeaturedProjectsGrid";
import { ProjectCard } from "./ProjectCard";
import type { ProjectItem } from "./FeaturedProjectsGrid.types";
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

describe("FeaturedProjectsGrid (Adversarial & Edge Cases)", () => {
  beforeEach(() => {
    mockLocale = "en";
  });

  it("handles empty projects array gracefully without crashing", () => {
    const { container } = render(
      <FeaturedProjectsGrid locale="en" projects={[]} />,
    );

    const section = screen.getByRole("region", {
      name: /Real-World Projects & Delivered Systems/i,
    });
    expect(section).toBeInTheDocument();
    expect(container.querySelectorAll("article")).toHaveLength(0);
  });

  it("handles extremely long content without layout breakage", () => {
    const longProject: ProjectItem = {
      id: "edge-long-id-999",
      tag: "CASE_OVERFLOW_TEST // " + "X".repeat(100),
      title: "Very Long Project Title ".repeat(10),
      role: "Principal Systems Architect ".repeat(5),
      summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10),
      techStack: Array.from({ length: 20 }, (_, i) => `Tech_${i}_${"A".repeat(15)}`),
      href: "/projects/very-long-url-" + "1".repeat(100),
      frameType: "browser",
      actionLabel: "Custom Action Label ".repeat(3),
    };

    render(<ProjectCard project={longProject} locale="en" />);

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: new RegExp(longProject.title.slice(0, 30), "i") }),
    ).toBeInTheDocument();
  });

  it("handles mobile frameType styling and icons correctly", () => {
    const mobileProject: ProjectItem = {
      id: "mobile-case",
      tag: "CASE_03 // MOBILE_APP",
      title: "Mobile Note App",
      role: "Flutter Engineering",
      summary: "Mobile note app test.",
      techStack: ["Flutter", "Dart"],
      href: "/projects/flutter-notes",
      frameType: "mobile",
    };

    const { container } = render(<ProjectCard project={mobileProject} locale="fa" />);

    // Check that mobile chrome exists
    expect(container.querySelector(".lucide-smartphone")).toBeInTheDocument();
  });

  it("handles special characters and unicode in tech tags and labels", () => {
    const unicodeProject: ProjectItem = {
      id: "unicode-case",
      tag: "CASE_UNICODE // <>&\"' $100% #@!",
      title: "پروژه آزمایشی با کاراکترهای خاص & <HTML>",
      role: "معماری & Security <Script>",
      summary: "تست بررسی کاراکترهای خاص: !@#$%^&*()_+{}[]|\":?><",
      techStack: ["C++", "C#", ".NET 8", "Go 1.22", "Vue.js 3"],
      href: "/projects/unicode-test",
    };

    render(<ProjectCard project={unicodeProject} locale="fa" />);

    expect(screen.getByText("C++")).toBeInTheDocument();
    expect(screen.getByText("C#")).toBeInTheDocument();
    expect(screen.getByText(".NET 8")).toBeInTheDocument();
  });
});

