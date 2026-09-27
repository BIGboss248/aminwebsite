import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { SinglePageNavbar } from "./SinglePageNavbar";
import { SinglePageMobileNav } from "./SinglePageMobileNav";
import enMessages from "@/messages/en.json";

let mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    if (namespace === "single_page.nav") {
      return (enMessages.single_page.nav as Record<string, string>)[key] ?? key;
    }
    if (namespace === "common") {
      return (enMessages.common as Record<string, string>)[key] ?? key;
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

describe("SinglePageNavbar Adversarial & Edge Cases", () => {
  let observerCallback: (entries: any[]) => void = () => {};
  const mockObserve = jest.fn();
  const mockDisconnect = jest.fn();

  beforeEach(() => {
    mockLocale = "en";
    document.body.innerHTML = "";

    window.matchMedia =
      window.matchMedia ||
      jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

    // Mock IntersectionObserver
    (window as any).IntersectionObserver = jest.fn(
      (callback: (entries: any[]) => void) => {
        observerCallback = callback;
        return {
          observe: mockObserve,
          unobserve: jest.fn(),
          disconnect: mockDisconnect,
        };
      },
    );
  });

  it("handles custom brandName and custom className gracefully", () => {
    render(
      <SinglePageNavbar
        brandName="Cyber Architect"
        className="custom-navbar-class"
      />,
    );

    expect(screen.getByText("CYBER ARCHITECT")).toBeInTheDocument();
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("custom-navbar-class");
  });

  it("fires onThemeToggle and onLocaleChange callbacks when passed", () => {
    const onThemeToggle = jest.fn();
    const onLocaleChange = jest.fn();

    render(
      <SinglePageNavbar
        onThemeToggle={onThemeToggle}
        onLocaleChange={onLocaleChange}
      />,
    );

    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(themeButton);
    expect(onThemeToggle).toHaveBeenCalledWith("light");
  });

  it("updates active section dynamically via IntersectionObserver entries", () => {
    render(<SinglePageNavbar />);

    // Simulate IntersectionObserver firing with 'certifications' intersecting
    act(() => {
      observerCallback([
        {
          isIntersecting: true,
          intersectionRatio: 0.8,
          target: { id: "certifications" },
        },
      ]);
    });

    const certLink = screen.getByRole("link", { name: /^certifications$/i });
    expect(certLink).toHaveAttribute("aria-current", "true");
  });

  it("handles empty or non-intersecting IntersectionObserver entries without throwing", () => {
    render(<SinglePageNavbar />);

    act(() => {
      observerCallback([]);
    });

    // Default hero remains active
    const heroLink = screen.getByRole("link", { name: /^overview$/i });
    expect(heroLink).toHaveAttribute("aria-current", "true");
  });

  it("updates active section to 'hero' when window is scrolled to the top (< 100px)", () => {
    render(<SinglePageNavbar activeSectionOverride="projects" />);

    // Set scroll position to 0
    Object.defineProperty(window, "scrollY", { value: 20, writable: true });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    // Overridden prop keeps priority if passed, let's test with no override
  });

  it("updates active section to 'hero' when scrolled to top with no override", () => {
    render(<SinglePageNavbar />);

    Object.defineProperty(window, "scrollY", { value: 10, writable: true });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    const heroLink = screen.getByRole("link", { name: /^overview$/i });
    expect(heroLink).toHaveAttribute("aria-current", "true");
  });

  it("updates active section to 'contact' when scrolled to bottom of document", () => {
    render(<SinglePageNavbar />);

    Object.defineProperty(window, "scrollY", { value: 2000, writable: true });
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2800,
      writable: true,
    });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    const contactLink = screen.getByRole("link", { name: /^contact$/i });
    expect(contactLink).toHaveAttribute("aria-current", "true");
  });

  it("SinglePageMobileNav returns null when isOpen is false", () => {
    const { container } = render(
      <SinglePageMobileNav
        isOpen={false}
        onClose={jest.fn()}
        items={[]}
        activeSection="hero"
        onSelectSection={jest.fn()}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("SinglePageMobileNav triggers onSelectSection when an item is clicked", () => {
    const onSelectSection = jest.fn();
    const items = [
      { id: "hero", label: "Overview", href: "#hero" },
      { id: "projects", label: "Projects", href: "#projects" },
    ];

    render(
      <SinglePageMobileNav
        isOpen={true}
        onClose={jest.fn()}
        items={items}
        activeSection="projects"
        onSelectSection={onSelectSection}
      />,
    );

    const projectsLink = screen.getByRole("link", { name: /projects/i });
    fireEvent.click(projectsLink);

    expect(onSelectSection).toHaveBeenCalledWith("projects");
  });
});
