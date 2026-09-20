import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeToggle, ThemeToggleSkeleton } from "./theme-toggle";

const mockSetTheme = jest.fn();
let mockResolvedTheme = "light";

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: mockResolvedTheme,
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeToggle Baseline Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockResolvedTheme = "light";

    // Default window.matchMedia mock
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

    // Default: no document.startViewTransition unless explicitly added
    // @ts-expect-error view transition polyfill mock
    delete document.startViewTransition;
  });

  it("renders the toggle button with accessible name and sr-only text", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Toggle theme");
  });

  it("toggles theme to dark when current theme is light", () => {
    mockResolvedTheme = "light";
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("toggles theme to light when current theme is dark", () => {
    mockResolvedTheme = "dark";
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("triggers optional onToggle callback with the next theme", () => {
    const handleToggle = jest.fn();
    mockResolvedTheme = "light";
    render(<ThemeToggle onToggle={handleToggle} />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);

    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith("dark");
  });

  it("invokes document.startViewTransition and executes clip-path animation when supported", async () => {
    const mockAnimate = jest.fn();
    const mockTransitionReady = Promise.resolve();

    document.documentElement.animate = mockAnimate;
    (document as unknown as { startViewTransition?: unknown }).startViewTransition = jest.fn().mockImplementation((cb: () => void) => {
      cb();
      return {
        ready: mockTransitionReady,
      };
    });

    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });

    // Mock getBoundingClientRect
    jest.spyOn(button, "getBoundingClientRect").mockReturnValue({
      x: 100,
      y: 100,
      width: 40,
      height: 40,
      top: 100,
      left: 100,
      right: 140,
      bottom: 140,
      toJSON: () => {},
    });

    await act(async () => {
      fireEvent.click(button, { clientX: 120, clientY: 120 });
      await mockTransitionReady;
    });

    expect(document.startViewTransition).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
    expect(mockAnimate).toHaveBeenCalledWith(
      expect.objectContaining({
        clipPath: expect.arrayContaining([
          expect.stringContaining("circle(0px at 120px 120px)"),
        ]),
      }),
      expect.objectContaining({
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }),
    );
  });

  it("bypasses view transition animation when user prefers reduced motion", () => {
    (document as unknown as { startViewTransition?: unknown }).startViewTransition = jest.fn();

    // Match media returns true for prefers-reduced-motion
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);

    // setTheme is invoked directly without calling startViewTransition
    expect(document.startViewTransition).not.toHaveBeenCalled();
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("applies custom className passed via props", () => {
    render(<ThemeToggle className="custom-test-class" />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toHaveClass("custom-test-class");
  });

  it("renders ThemeToggleSkeleton with matching dimensions and pulse animation", () => {
    const { container } = render(<ThemeToggleSkeleton className="skeleton-custom" />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("skeleton-custom");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
  });
});

