import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { MobileNavDrawerSkeleton } from "./MobileNavDrawerSkeleton";
import { ROUTES } from "@/lib/routes";

const mockReplace = jest.fn();
const mockPush = jest.fn();
const mockStartProgress = jest.fn();
let mockCurrentLocale = "en";
let mockPathname = "/";

import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

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
    ({ href, children, onClick, ...props }: any, ref: any) => (
      <a
        ref={ref}
        href={typeof href === "string" ? href : (href?.pathname ?? "#")}
        onClick={onClick}
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

describe("MobileNavDrawer Baseline Unit Tests (TDD)", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCurrentLocale = "en";
    mockPathname = "/";
  });

  it("does not render dialog content when isOpen is false", () => {
    render(<MobileNavDrawer {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("renders accessible dialog landmarks and headers when isOpen is true", () => {
    render(<MobileNavDrawer {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");

    // Brand lockup
    expect(screen.getByText(/AMIN JAMALI/i)).toBeInTheDocument();
    expect(screen.getByText(/^LAB$/)).toBeInTheDocument();
  });

  it("renders all five primary telemetry navigation route nodes", () => {
    render(<MobileNavDrawer {...defaultProps} />);

    const nav = screen.getByRole("navigation", { name: "Mobile Route Nodes" });
    expect(
      within(nav).getByRole("link", { name: /home/i }),
    ).toBeInTheDocument();
    expect(
      within(nav).getByRole("link", { name: /about/i }),
    ).toBeInTheDocument();
    expect(
      within(nav).getByRole("link", { name: /projects/i }),
    ).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: /lab/i })).toBeInTheDocument();
    expect(
      within(nav).getByRole("link", { name: /contact/i }),
    ).toBeInTheDocument();
  });

  it("does not render cockpit topology subtitle or 99.9% uptime badge", () => {
    render(<MobileNavDrawer {...defaultProps} />);
    expect(screen.queryByText(/COCKPIT TOPOLOGY/i)).toBeNull();
    expect(screen.queryByText("99.9%")).toBeNull();
  });

  it("correctly identifies the active route with aria-current='page'", () => {
    render(
      <MobileNavDrawer {...defaultProps} currentPath={ROUTES.projects.root} />,
    );

    const nav = screen.getByRole("navigation", { name: "Mobile Route Nodes" });
    const projectsLink = within(nav).getByRole("link", { name: /projects/i });
    expect(projectsLink).toHaveAttribute("aria-current", "page");

    const homeLink = within(nav).getByRole("link", { name: /home/i });
    expect(homeLink).not.toHaveAttribute("aria-current");
  });

  it("fires onClose when the close button is clicked", () => {
    const handleClose = jest.fn();
    render(<MobileNavDrawer {...defaultProps} onClose={handleClose} />);

    const closeBtn = screen.getByRole("button", {
      name: /close navigation drawer/i,
    });
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("fires onClose when Escape key is pressed", () => {
    const handleClose = jest.fn();
    render(<MobileNavDrawer {...defaultProps} onClose={handleClose} />);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("fires onClose and onNavigate when a route node is clicked", () => {
    const handleClose = jest.fn();
    const handleNavigate = jest.fn();

    render(
      <MobileNavDrawer
        {...defaultProps}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />,
    );

    const nav = screen.getByRole("navigation", { name: "Mobile Route Nodes" });
    const aboutLink = within(nav).getByRole("link", { name: /about/i });
    fireEvent.click(aboutLink);

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(handleNavigate).toHaveBeenCalledWith(ROUTES.about);
  });

  it("renders MobileNavDrawerSkeleton with accessible loading semantics", () => {
    render(<MobileNavDrawerSkeleton />);

    const skeletonContainer = screen.getByTestId("mobile-nav-drawer-skeleton");
    expect(skeletonContainer).toBeInTheDocument();
    expect(skeletonContainer).toHaveAttribute("aria-busy", "true");
  });
});
