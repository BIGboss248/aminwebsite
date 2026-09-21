import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SiteNavbar } from "./SiteNavbar";
import { SiteNavbarSkeleton } from "./SiteNavbarSkeleton";
import { ROUTES } from "@/lib/routes";

const mockReplace = jest.fn();
const mockPush = jest.fn();
const mockStartProgress = jest.fn();
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

let mockCurrentLocale = "en";
let mockPathname = "/";

jest.mock("next-intl", () => ({
  useLocale: () => mockCurrentLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    const dict = mockCurrentLocale === "fa" ? faMessages : enMessages;
    if (namespace === "navigation") {
      return (dict.navigation as Record<string, string>)[key] ?? key;
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
    replace: mockReplace,
    push: mockPush,
  }),
  usePathname: () => mockPathname,
}));

jest.mock("react-transition-progress", () => ({
  useProgress: () => mockStartProgress,
}));

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    resolvedTheme: "dark",
    setTheme: jest.fn(),
  }),
}));

describe("SiteNavbar Baseline Unit Tests (TDD)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCurrentLocale = "en";
    mockPathname = "/";
  });

  it("renders a semantic header and navigation landmark with proper ARIA labeling", () => {
    render(<SiteNavbar />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const nav = screen.getByRole("navigation", { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it("renders the clean brand mark cockpit cluster without status badge or version", () => {
    render(<SiteNavbar />);

    const brandLink = screen.getByRole("link", { name: /amin jamali/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute("href", ROUTES.home);

    expect(screen.queryByText("SYS_ONLINE")).not.toBeInTheDocument();
    expect(screen.queryByText("v4.8")).not.toBeInTheDocument();
  });

  it("renders all 5 core navigation route links derived from centralized ROUTES", () => {
    render(<SiteNavbar />);

    expect(screen.getByRole("link", { name: /^home$/i })).toHaveAttribute(
      "href",
      ROUTES.home,
    );
    expect(screen.getByRole("link", { name: /^about$/i })).toHaveAttribute(
      "href",
      ROUTES.about,
    );
    expect(screen.getByRole("link", { name: /^projects$/i })).toHaveAttribute(
      "href",
      ROUTES.projects.root,
    );
    expect(screen.getByRole("link", { name: /^lab hub/i })).toHaveAttribute(
      "href",
      ROUTES.lab.root,
    );
    expect(screen.getByRole("link", { name: /^contact$/i })).toHaveAttribute(
      "href",
      ROUTES.contact,
    );
  });

  it("marks the active route with aria-current='page'", () => {
    mockPathname = "/projects";
    render(<SiteNavbar />);

    const projectsLink = screen.getByRole("link", { name: /^projects$/i });
    expect(projectsLink).toHaveAttribute("aria-current", "page");

    const homeLink = screen.getByRole("link", { name: /^home$/i });
    expect(homeLink).not.toHaveAttribute("aria-current");
  });

  it("does not render the 99.9% uptime badge or availability badge", () => {
    render(<SiteNavbar />);
    expect(screen.queryByText("99.9%")).not.toBeInTheDocument();
    expect(screen.queryByText(/available for/i)).not.toBeInTheDocument();
  });

  it("renders the utility cluster containing LocaleSwitcher and ThemeToggle", () => {
    render(<SiteNavbar />);

    // LocaleSwitcher radiogroup
    const langGroup = screen.getByRole("radiogroup", { name: /language/i });
    expect(langGroup).toBeInTheDocument();

    // ThemeToggle button
    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeButton).toBeInTheDocument();
  });

  it("toggles the mobile navigation drawer when hamburger button is clicked", () => {
    render(<SiteNavbar />);

    const hamburger = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    expect(hamburger).toHaveAttribute("aria-expanded", "false");

    // Click to open
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute("aria-expanded", "true");

    // Drawer links should be visible
    const mobileLinks = screen.getAllByRole("link", { name: /projects/i });
    expect(mobileLinks.length).toBeGreaterThan(1); // desktop + mobile

    // Click again to close
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile drawer when Escape key is pressed", () => {
    render(<SiteNavbar />);

    const hamburger = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders SiteNavbarSkeleton matching exact h-14 height with accessible aria-hidden", () => {
    const { container } = render(<SiteNavbarSkeleton />);

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("aria-hidden", "true");
    expect(header).toHaveClass("h-14");
  });
});
