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

// Mock matchMedia for jsdom environment (required by ThemeToggle)
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

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

describe("MobileNavDrawer Adversarial & Edge-Case Test Suite", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCurrentLocale = "en";
    mockPathname = "/";
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  // =========================================================================
  // 1. Brand Name Adversarial Inputs (Long strings, special chars, XSS, unicode)
  // =========================================================================
  describe("1. Brand Name Adversarial Inputs", () => {
    it("handles extremely long brandName (150+ characters) without throwing or breaking uppercase transform", () => {
      const longBrand = "A".repeat(160);
      render(<MobileNavDrawer {...defaultProps} brandName={longBrand} />);

      const brandEl = screen.getByText(longBrand);
      expect(brandEl).toBeInTheDocument();

      const homeLink = screen.getByRole("link", {
        name: new RegExp(`${longBrand} Home`, "i"),
      });
      expect(homeLink).toBeInTheDocument();
    });

    it("handles special characters, symbols, and HTML/XSS injection payloads safely as pure text", () => {
      const maliciousBrand =
        '<script>alert("XSS")</script> && " \' / \\ <>&%$#@!';
      render(<MobileNavDrawer {...defaultProps} brandName={maliciousBrand} />);

      expect(
        screen.getByText(maliciousBrand.toUpperCase()),
      ).toBeInTheDocument();
      expect(document.querySelector("script")).toBeNull();
    });

    it("handles empty string brandName gracefully without crashing uppercase transform", () => {
      render(<MobileNavDrawer {...defaultProps} brandName="" />);

      // Monospace lockup contains // and LAB
      expect(screen.getByText("//")).toBeInTheDocument();
      expect(screen.getByText("LAB")).toBeInTheDocument();

      // Brand link in header
      const header = screen.getByRole("dialog").querySelector(".border-b");
      const brandLink = within(header as HTMLElement).getByRole("link");
      expect(brandLink).toHaveAttribute("aria-label", " Home");
    });

    it("handles non-Latin / Persian unicode brandName strings correctly", () => {
      const persianBrand = "سامانه مدیریت ابری";
      render(<MobileNavDrawer {...defaultProps} brandName={persianBrand} />);

      expect(screen.getByText(persianBrand.toUpperCase())).toBeInTheDocument();
    });
  });

  // =========================================================================
  // 2. Rapid Toggle Cycles & Body Scroll Lock Integrity
  // =========================================================================
  describe("2. Rapid Toggle Cycles & Body Scroll Lock", () => {
    it("locks body scroll on mount and unlocks reliably on toggle", () => {
      const { rerender } = render(
        <MobileNavDrawer {...defaultProps} isOpen={true} />,
      );
      expect(document.body.style.overflow).toBe("hidden");

      rerender(<MobileNavDrawer {...defaultProps} isOpen={false} />);
      expect(document.body.style.overflow).toBe("");

      rerender(<MobileNavDrawer {...defaultProps} isOpen={true} />);
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("maintains scroll lock integrity through rapid alternating toggle cycles", () => {
      const { rerender } = render(
        <MobileNavDrawer {...defaultProps} isOpen={false} />,
      );
      expect(document.body.style.overflow).toBe("");

      for (let i = 0; i < 6; i++) {
        const shouldOpen = i % 2 === 0;
        rerender(<MobileNavDrawer {...defaultProps} isOpen={shouldOpen} />);
        expect(document.body.style.overflow).toBe(shouldOpen ? "hidden" : "");
      }
    });

    it("unlocks body scroll when unmounted while open", () => {
      const { unmount } = render(
        <MobileNavDrawer {...defaultProps} isOpen={true} />,
      );
      expect(document.body.style.overflow).toBe("hidden");

      unmount();
      expect(document.body.style.overflow).toBe("");
    });

    it("does not trigger onClose on Escape when drawer is closed", () => {
      const handleClose = jest.fn();
      render(
        <MobileNavDrawer
          {...defaultProps}
          isOpen={false}
          onClose={handleClose}
        />,
      );

      fireEvent.keyDown(window, { key: "Escape" });
      expect(handleClose).not.toHaveBeenCalled();
    });

    it("ignores non-Escape keyboard events on window when open", () => {
      const handleClose = jest.fn();
      render(
        <MobileNavDrawer
          {...defaultProps}
          isOpen={true}
          onClose={handleClose}
        />,
      );

      fireEvent.keyDown(window, { key: "Enter" });
      fireEvent.keyDown(window, { key: "Tab" });
      fireEvent.keyDown(window, { key: "Space" });
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  // =========================================================================
  // 3. Absence of Optional Callbacks (Robustness to undefined props)
  // =========================================================================
  describe("3. Absence of Optional Callbacks", () => {
    it("safely navigates route nodes without crashing when onNavigate is undefined", () => {
      const handleClose = jest.fn();
      render(
        <MobileNavDrawer
          isOpen={true}
          onClose={handleClose}
          onNavigate={undefined}
        />,
      );

      const nav = screen.getByRole("navigation", {
        name: "Mobile Route Nodes",
      });
      const links = within(nav).getAllByRole("link");

      // Click each navigation route node
      links.forEach((link, idx) => {
        expect(() => fireEvent.click(link)).not.toThrow();
        expect(handleClose).toHaveBeenCalledTimes(idx + 1);
      });
    });

    it("safely clicks the brand home lockup when onNavigate is undefined", () => {
      const handleClose = jest.fn();
      render(
        <MobileNavDrawer
          isOpen={true}
          onClose={handleClose}
          onNavigate={undefined}
        />,
      );

      const header = screen.getByRole("dialog").querySelector(".border-b");
      const brandLink = within(header as HTMLElement).getByRole("link");
      expect(() => fireEvent.click(brandLink)).not.toThrow();
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("safely interacts with LocaleSwitcher when onLocaleChange is undefined", () => {
      render(
        <MobileNavDrawer
          isOpen={true}
          onClose={jest.fn()}
          activeLocale="en"
          onLocaleChange={undefined}
        />,
      );

      // Find Persian locale radio button in LocaleSwitcher
      const faRadio = screen.getByRole("radio", { name: /FA/i });
      expect(() => fireEvent.click(faRadio)).not.toThrow();
      expect(mockReplace).toHaveBeenCalledWith("/", { locale: "fa" });
    });

    it("safely interacts with ThemeToggle when onThemeToggle is undefined", () => {
      render(
        <MobileNavDrawer
          isOpen={true}
          onClose={jest.fn()}
          onThemeToggle={undefined}
        />,
      );

      const themeBtn = screen.getByRole("button", { name: /Toggle theme/i });
      expect(() => fireEvent.click(themeBtn)).not.toThrow();
    });
  });

  // =========================================================================
  // 4. Backdrop Scrim Interaction
  // =========================================================================
  describe("4. Backdrop Scrim Interaction", () => {
    it("fires onClose when clicking the backdrop scrim", () => {
      const handleClose = jest.fn();
      render(<MobileNavDrawer {...defaultProps} onClose={handleClose} />);

      const backdrop = screen.getByTestId("mobile-nav-backdrop");
      expect(backdrop).toHaveAttribute("aria-hidden", "true");

      fireEvent.click(backdrop);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("does not trigger backdrop onClose when clicking the dialog aside panel", () => {
      const handleClose = jest.fn();
      render(<MobileNavDrawer {...defaultProps} onClose={handleClose} />);

      const asideDialog = screen.getByRole("dialog");
      fireEvent.click(asideDialog);

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  // =========================================================================
  // 5. Persian (RTL) Mode Parity
  // =========================================================================
  describe("5. Persian (RTL) Mode Parity", () => {
    it("renders slide-in-from-left class and Persian descriptions when activeLocale='fa'", () => {
      mockCurrentLocale = "fa";
      render(
        <MobileNavDrawer
          {...defaultProps}
          activeLocale="fa"
          currentPath={ROUTES.home}
        />,
      );

      const aside = screen.getByRole("dialog");
      expect(aside.className).toContain("slide-in-from-left");
      expect(aside.className).not.toContain("slide-in-from-right");

      // Verify all 5 Persian route descriptions
      expect(screen.getByText("رصدخانه مرکزی سامانه‌ها")).toBeInTheDocument();
      expect(screen.getByText("بیوگرافی و فلسفه معماری")).toBeInTheDocument();
      expect(screen.getByText("مطالعات موردی مقیاس‌بالا")).toBeInTheDocument();
      expect(screen.getByText("ابزارهای برخط تحلیل شبکه")).toBeInTheDocument();
      expect(screen.getByText("ارتباط مستقیم و مشاوره")).toBeInTheDocument();
    });

    it("renders ArrowLeft icon for active item in RTL mode", () => {
      mockCurrentLocale = "fa";
      const { container } = render(
        <MobileNavDrawer
          {...defaultProps}
          activeLocale="fa"
          currentPath={ROUTES.about}
        />,
      );

      const nav = screen.getByRole("navigation");
      const aboutLink = within(nav).getByRole("link", { name: /درباره من/i });
      expect(aboutLink).toHaveAttribute("aria-current", "page");

      // In RTL mode, ArrowLeft is rendered for active route
      const arrowLeftIcon = container.querySelector(".lucide-arrow-left");
      expect(arrowLeftIcon).toBeInTheDocument();
      expect(container.querySelector(".lucide-arrow-right")).toBeNull();
    });

    it("renders slide-in-from-right and ArrowRight icon in English (LTR) mode", () => {
      const { container } = render(
        <MobileNavDrawer
          {...defaultProps}
          activeLocale="en"
          currentPath={ROUTES.about}
        />,
      );

      const aside = screen.getByRole("dialog");
      expect(aside.className).toContain("slide-in-from-right");
      expect(aside.className).not.toContain("slide-in-from-left");

      // English description
      expect(
        screen.getByText("Biography & Architecture Philosophy"),
      ).toBeInTheDocument();

      // In LTR mode, ArrowRight is rendered for active route
      const arrowRightIcon = container.querySelector(".lucide-arrow-right");
      expect(arrowRightIcon).toBeInTheDocument();
      expect(container.querySelector(".lucide-arrow-left")).toBeNull();
    });

    it("falls back to contextLocale when activeLocale is not provided", () => {
      mockCurrentLocale = "fa";
      render(<MobileNavDrawer {...defaultProps} />);

      const aside = screen.getByRole("dialog");
      expect(aside.className).toContain("slide-in-from-left");
      expect(screen.getByText("رصدخانه مرکزی سامانه‌ها")).toBeInTheDocument();
    });
  });

  // =========================================================================
  // 6. Custom className Merging
  // =========================================================================
  describe("6. Custom className Merging", () => {
    it("merges custom className cleanly onto the aside drawer panel", () => {
      const customClass =
        "adversarial-custom-class border-emerald-500 shadow-none";
      render(<MobileNavDrawer {...defaultProps} className={customClass} />);

      const aside = screen.getByRole("dialog");
      expect(aside).toHaveClass("adversarial-custom-class");
      expect(aside).toHaveClass("relative");
      expect(aside).toHaveClass("ms-auto");
      expect(aside).toHaveClass("flex");
      expect(aside).toHaveClass("flex-col");
      expect(aside).toHaveClass("h-full");
      expect(aside).toHaveClass("w-80");
      expect(aside).toHaveClass("border-s");
    });
  });

  // =========================================================================
  // 7. Skeleton Custom itemCount Prop
  // =========================================================================
  describe("7. MobileNavDrawerSkeleton Edge Cases", () => {
    it("renders custom itemCount={3} placeholders correctly", () => {
      const { container } = render(<MobileNavDrawerSkeleton itemCount={3} />);

      const skeletonCards = container.querySelectorAll(".bg-muted\\/20");
      expect(skeletonCards.length).toBe(3);
    });

    it("renders 0 placeholders without errors when itemCount={0}", () => {
      const { container } = render(<MobileNavDrawerSkeleton itemCount={0} />);

      const skeletonCards = container.querySelectorAll(".bg-muted\\/20");
      expect(skeletonCards.length).toBe(0);

      // Header and utility dock skeletons remain intact
      expect(
        screen.getByTestId("mobile-nav-drawer-skeleton"),
      ).toBeInTheDocument();
    });

    it("renders high itemCount={12} placeholders gracefully", () => {
      const { container } = render(<MobileNavDrawerSkeleton itemCount={12} />);

      const skeletonCards = container.querySelectorAll(".bg-muted\\/20");
      expect(skeletonCards.length).toBe(12);
    });

    it("defaults to 5 placeholders when itemCount is omitted", () => {
      const { container } = render(<MobileNavDrawerSkeleton />);

      const skeletonCards = container.querySelectorAll(".bg-muted\\/20");
      expect(skeletonCards.length).toBe(5);
    });

    it("merges custom className onto the skeleton container", () => {
      render(
        <MobileNavDrawerSkeleton className="custom-skeleton-class border-red-500" />,
      );

      const skeleton = screen.getByTestId("mobile-nav-drawer-skeleton");
      expect(skeleton).toHaveClass("custom-skeleton-class");
      expect(skeleton).toHaveClass("flex");
      expect(skeleton).toHaveClass("w-80");
    });
  });

  // =========================================================================
  // 8. Route Matching Boundary Conditions
  // =========================================================================
  describe("8. Route Matching Boundary Conditions", () => {
    it("activates parent section route when currentPath is a nested child route", () => {
      render(
        <MobileNavDrawer
          {...defaultProps}
          currentPath="/projects/quantum-mesh-orchestrator"
        />,
      );

      const nav = screen.getByRole("navigation", {
        name: "Mobile Route Nodes",
      });
      const projectsLink = within(nav).getByRole("link", { name: /projects/i });
      expect(projectsLink).toHaveAttribute("aria-current", "page");

      const homeLink = within(nav).getByRole("link", { name: /home/i });
      expect(homeLink).not.toHaveAttribute("aria-current");
    });

    it("does not activate any route when currentPath is unmapped or unknown", () => {
      render(
        <MobileNavDrawer
          {...defaultProps}
          currentPath="/telemetry-external-portal"
        />,
      );

      const nav = screen.getByRole("navigation", {
        name: "Mobile Route Nodes",
      });
      const links = within(nav).getAllByRole("link");

      links.forEach((link) => {
        expect(link).not.toHaveAttribute("aria-current");
      });
    });

    it("activates home route when effectivePathname is empty string", () => {
      render(<MobileNavDrawer {...defaultProps} currentPath="" />);

      const nav = screen.getByRole("navigation", {
        name: "Mobile Route Nodes",
      });
      const homeLink = within(nav).getByRole("link", { name: /home/i });
      expect(homeLink).toHaveAttribute("aria-current", "page");
    });
  });
});
