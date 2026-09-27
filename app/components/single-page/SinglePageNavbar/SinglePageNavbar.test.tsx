import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SinglePageNavbar } from "./SinglePageNavbar";
import { SinglePageNavbarSkeleton } from "./SinglePageNavbarSkeleton";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockLocale === "fa" ? faMessages : enMessages;
    if (namespace === "single_page.nav") {
      return (dict.single_page.nav as Record<string, string>)[key] ?? key;
    }
    if (namespace === "common") {
      return (dict.common as Record<string, string>)[key] ?? key;
    }
    return key;
  },
}));

jest.mock("@/app/components/Link", () => {
  const React = require("react");
  const MockLink = React.forwardRef(
    ({ href, children, ...props }: any, ref: any) => (
      <a
        ref={ref}
        href={typeof href === "string" ? href : (href?.pathname ?? "#")}
        {...props}
      >
        {children}
      </a>
    ),
  );
  MockLink.displayName = "MockLink";
  return {
    __esModule: true,
    Link: MockLink,
    default: MockLink,
  };
});

jest.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
  }),
  usePathname: () => "/single-page",
}));

jest.mock("react-transition-progress", () => ({
  useProgress: () => jest.fn(),
}));

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    resolvedTheme: "dark",
    setTheme: jest.fn(),
  }),
}));

describe("SinglePageNavbar Component", () => {
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;

  beforeEach(() => {
    mockLocale = "en";
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    document.body.innerHTML = "";
  });

  it("renders a semantic header and navigation landmark with proper ARIA labeling", () => {
    render(<SinglePageNavbar />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const nav = screen.getByRole("navigation", {
      name: /single page scroll-spy navigation/i,
    });
    expect(nav).toBeInTheDocument();
  });

  it("renders brand mark identity and links to #hero", () => {
    render(<SinglePageNavbar />);

    const brandLink = screen.getByRole("link", { name: /amin jamali/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute("href", "#hero");
  });

  it("renders all 4 single-page section anchor links", () => {
    render(<SinglePageNavbar />);

    expect(screen.getByRole("link", { name: /^overview$/i })).toHaveAttribute(
      "href",
      "#hero",
    );
    expect(screen.getByRole("link", { name: /^projects$/i })).toHaveAttribute(
      "href",
      "#projects",
    );
    expect(
      screen.getByRole("link", { name: /^certifications$/i }),
    ).toHaveAttribute("href", "#certifications");
    expect(screen.getByRole("link", { name: /^contact$/i })).toHaveAttribute(
      "href",
      "#contact",
    );
  });

  it("highlights the active section when activeSectionOverride is passed", () => {
    render(<SinglePageNavbar activeSectionOverride="projects" />);

    const projectsLink = screen.getByRole("link", { name: /^projects$/i });
    expect(projectsLink).toHaveAttribute("aria-current", "true");

    const overviewLink = screen.getByRole("link", { name: /^overview$/i });
    expect(overviewLink).not.toHaveAttribute("aria-current");
  });

  it("triggers smooth scrolling when a navigation anchor is clicked", () => {
    const heroElement = document.createElement("div");
    heroElement.id = "hero";
    document.body.appendChild(heroElement);

    render(<SinglePageNavbar />);

    const overviewLink = screen.getByRole("link", { name: /^overview$/i });
    fireEvent.click(overviewLink);

    expect(heroElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
  });

  it("renders utility controls containing LocaleSwitcher and ThemeToggle", () => {
    render(<SinglePageNavbar />);

    const langGroup = screen.getByRole("radiogroup", { name: /language/i });
    expect(langGroup).toBeInTheDocument();

    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeButton).toBeInTheDocument();
  });

  it("toggles and closes mobile drawer upon user interaction", () => {
    render(<SinglePageNavbar />);

    const hamburger = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    expect(hamburger).toBeInTheDocument();

    // Open drawer
    fireEvent.click(hamburger);

    const drawer = screen.getByRole("dialog", {
      name: /single page mobile navigation/i,
    });
    expect(drawer).toBeInTheDocument();

    // Close drawer via close button
    const closeBtn = screen.getByRole("button", {
      name: /close navigation drawer/i,
    });
    fireEvent.click(closeBtn);

    expect(
      screen.queryByRole("dialog", {
        name: /single page mobile navigation/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("closes mobile drawer on Escape key press", () => {
    render(<SinglePageNavbar />);

    const hamburger = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    fireEvent.click(hamburger);

    expect(
      screen.getByRole("dialog", {
        name: /single page mobile navigation/i,
      }),
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(
      screen.queryByRole("dialog", {
        name: /single page mobile navigation/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("renders Persian translations when activeLocale='fa'", () => {
    mockLocale = "fa";
    render(<SinglePageNavbar activeLocale="fa" />);

    expect(screen.getByRole("link", { name: /^معرفی$/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /^پروژه‌ها$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /^گواهینامه‌ها$/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^تماس$/i })).toBeInTheDocument();
  });

  it("renders SinglePageNavbarSkeleton fallback matching h-14 dimensions", () => {
    const { container } = render(<SinglePageNavbarSkeleton />);

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("aria-hidden", "true");
    expect(header).toHaveClass("h-14");
  });
});
