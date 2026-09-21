import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeToggle, ThemeToggleSkeleton } from "./theme-toggle";

const mockSetTheme = jest.fn();
let mockResolvedTheme: string | undefined = "light";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      theme_toggle: "Toggle theme",
    };
    return map[key] ?? key;
  },
}));

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: mockResolvedTheme,
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeToggle Adversarial Edge-Case & Stress Tests", () => {
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

    // Default: no document.startViewTransition
    // @ts-expect-error view transition mock cleanup
    delete document.startViewTransition;
  });

  describe("1. Rapid Sequential Click Bursts (Stress Testing)", () => {
    it("handles rapid sequential clicks without throwing or dropping callback executions", () => {
      const handleToggle = jest.fn();
      render(<ThemeToggle onToggle={handleToggle} />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      const burstCount = 15;
      expect(() => {
        for (let i = 0; i < burstCount; i++) {
          fireEvent.click(button);
        }
      }).not.toThrow();

      expect(mockSetTheme).toHaveBeenCalledTimes(burstCount);
      expect(handleToggle).toHaveBeenCalledTimes(burstCount);
    });

    it("survives rapid click bursts when startViewTransition is active", async () => {
      let activeTransitions = 0;
      (
        document as unknown as { startViewTransition?: unknown }
      ).startViewTransition = jest.fn().mockImplementation((cb: () => void) => {
        activeTransitions++;
        cb();
        return {
          ready: Promise.resolve(),
        };
      });

      render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      await act(async () => {
        for (let i = 0; i < 10; i++) {
          fireEvent.click(button, { clientX: 50 + i, clientY: 50 + i });
        }
      });

      expect(mockSetTheme).toHaveBeenCalledTimes(10);
      expect(activeTransitions).toBe(10);
    });
  });

  describe("2. Unmount Lifecycle Cleanup", () => {
    it("safely unmounts while document.startViewTransition is pending without memory leak or errors", async () => {
      let resolveReady: () => void;
      const readyPromise = new Promise<void>((resolve) => {
        resolveReady = resolve;
      });

      const mockAnimate = jest.fn();
      document.documentElement.animate = mockAnimate;

      (
        document as unknown as { startViewTransition?: unknown }
      ).startViewTransition = jest.fn().mockImplementation((cb: () => void) => {
        cb();
        return {
          ready: readyPromise,
        };
      });

      const { unmount } = render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      // Click to start transition
      fireEvent.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith("dark");

      // Unmount while ready promise is still unresolved
      expect(() => {
        unmount();
      }).not.toThrow();

      // Now resolve transition.ready after unmount
      await act(async () => {
        resolveReady!();
        await readyPromise;
      });

      // Animate may run or no-op on documentElement without throwing
      expect(mockAnimate).toHaveBeenCalled();
    });
  });

  describe("3. Resiliency against getBoundingClientRect Failures", () => {
    it("handles getBoundingClientRect throwing an exception without crashing", () => {
      (
        document as unknown as { startViewTransition?: unknown }
      ).startViewTransition = jest.fn().mockImplementation((cb: () => void) => {
        cb();
        return { ready: Promise.resolve() };
      });

      render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      // Mock getBoundingClientRect to throw an error (e.g. disconnected node or virtual DOM issue)
      jest.spyOn(button, "getBoundingClientRect").mockImplementation(() => {
        throw new DOMException(
          "The element is not attached to the DOM",
          "InvalidStateError",
        );
      });

      expect(() => {
        fireEvent.click(button);
      }).not.toThrow();

      expect(mockSetTheme).toHaveBeenCalledWith("dark");
    });

    it("handles getBoundingClientRect returning all-zero dimensions safely", () => {
      (
        document as unknown as { startViewTransition?: unknown }
      ).startViewTransition = jest.fn().mockImplementation((cb: () => void) => {
        cb();
        return { ready: Promise.resolve() };
      });

      render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      jest.spyOn(button, "getBoundingClientRect").mockReturnValue({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        toJSON: () => {},
      });

      expect(() => {
        fireEvent.click(button, { clientX: 0, clientY: 0 });
      }).not.toThrow();

      expect(mockSetTheme).toHaveBeenCalledWith("dark");
    });
  });

  describe("4. Rejection in transition.ready", () => {
    it("prevents unhandled promise rejections when transition.ready rejects", async () => {
      const rejectedPromise = Promise.reject(
        new Error("View transition aborted by browser"),
      );

      (
        document as unknown as { startViewTransition?: unknown }
      ).startViewTransition = jest.fn().mockImplementation((cb: () => void) => {
        cb();
        return { ready: rejectedPromise };
      });

      render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      await act(async () => {
        fireEvent.click(button);
        try {
          await rejectedPromise;
        } catch {
          // Expected rejection
        }
      });

      // setTheme must still execute successfully
      expect(mockSetTheme).toHaveBeenCalledWith("dark");
    });
  });

  describe("5. Behavior with Undefined or Unexpected resolvedTheme Values", () => {
    it("defaults to toggling to dark when resolvedTheme is undefined", () => {
      mockResolvedTheme = undefined;
      render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      fireEvent.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith("dark");
    });

    it("defaults to toggling to dark when resolvedTheme is 'system'", () => {
      mockResolvedTheme = "system";
      render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      fireEvent.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith("dark");
    });

    it("defaults to toggling to dark when resolvedTheme is an arbitrary custom theme", () => {
      mockResolvedTheme = "sepia";
      render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      fireEvent.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith("dark");
    });

    it("toggles to light when resolvedTheme is 'dark'", () => {
      mockResolvedTheme = "dark";
      render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      fireEvent.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith("light");
    });
  });

  describe("6. Keyboard Interaction & Accessibility", () => {
    it("triggers theme toggle when button receives click via keyboard Space/Enter", () => {
      render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      // In HTML buttons, pressing Enter or Space triggers a click event with clientX=0, clientY=0
      fireEvent.click(button, { detail: 0, clientX: 0, clientY: 0 });
      expect(mockSetTheme).toHaveBeenCalledTimes(1);
      expect(mockSetTheme).toHaveBeenCalledWith("dark");

      // Verify button responds to key events without throwing
      expect(() => {
        fireEvent.keyDown(button, { key: "Enter", code: "Enter" });
        fireEvent.keyDown(button, { key: " ", code: "Space" });
      }).not.toThrow();
    });

    it("maintains focusability and standard tab navigation accessibility", () => {
      render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      button.focus();
      expect(button).toHaveFocus();

      button.blur();
      expect(button).not.toHaveFocus();
    });
  });

  describe("7. Layout Shift & ARIA Consistency", () => {
    it("preserves stable ARIA attributes and relative layout positioning", () => {
      const { rerender } = render(<ThemeToggle />);
      const button = screen.getByRole("button", { name: /toggle theme/i });

      expect(button).toHaveAttribute("aria-label", "Toggle theme");
      expect(button).toHaveClass("relative");

      // Screen reader hidden text should be intact
      const srText = screen.getByText("Toggle theme", { selector: ".sr-only" });
      expect(srText).toBeInTheDocument();

      // Rerender with custom className and ensure ARIA is never corrupted
      rerender(<ThemeToggle className="extra-class" />);
      expect(button).toHaveAttribute("aria-label", "Toggle theme");
      expect(button).toHaveClass("extra-class");
      expect(button).toHaveClass("relative");
    });

    it("maintains both Sun and Moon icon elements with correct rotation and transition classes", () => {
      const { container } = render(<ThemeToggle />);
      const svgElements = container.querySelectorAll("svg");
      expect(svgElements).toHaveLength(2);

      const [sunSvg, moonSvg] = Array.from(svgElements);
      expect(sunSvg).toHaveClass("rotate-0");
      expect(sunSvg).toHaveClass("dark:-rotate-90");
      expect(moonSvg).toHaveClass("absolute");
      expect(moonSvg).toHaveClass("rotate-90");
      expect(moonSvg).toHaveClass("dark:rotate-0");
    });
  });

  describe("8. ThemeToggleSkeleton Edge Cases", () => {
    it("handles custom HTML attributes, data-attributes, and custom classes safely", () => {
      const customOnClick = jest.fn();
      // Test merging without conflicts
      const { rerender } = render(
        <ThemeToggleSkeleton
          id="custom-skeleton-id"
          data-testid="theme-skeleton"
          data-custom-attribute="edge-value"
          className="border border-primary shadow-sm"
          style={{ opacity: 0.75 }}
          onClick={customOnClick}
        />,
      );

      const skeleton = screen.getByTestId("theme-skeleton");
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveAttribute("id", "custom-skeleton-id");
      expect(skeleton).toHaveAttribute("data-custom-attribute", "edge-value");
      expect(skeleton).toHaveAttribute("aria-hidden", "true");
      expect(skeleton).toHaveStyle({ opacity: "0.75" });

      // Ensure base classes are preserved alongside custom non-colliding classes
      expect(skeleton).toHaveClass("h-8");
      expect(skeleton).toHaveClass("w-8");
      expect(skeleton).toHaveClass("rounded-lg");
      expect(skeleton).toHaveClass("bg-muted/50");
      expect(skeleton).toHaveClass("animate-pulse");
      expect(skeleton).toHaveClass("border");
      expect(skeleton).toHaveClass("border-primary");
      expect(skeleton).toHaveClass("shadow-sm");

      fireEvent.click(skeleton);
      expect(customOnClick).toHaveBeenCalledTimes(1);

      // Verify tailwind-merge override behavior when conflicting dimensions (size-10) are passed
      rerender(
        <ThemeToggleSkeleton
          data-testid="theme-skeleton"
          className="size-10"
        />,
      );
      expect(skeleton).toHaveClass("size-10");
      expect(skeleton).not.toHaveClass("h-8");
      expect(skeleton).not.toHaveClass("w-8");
      expect(skeleton).toHaveClass("rounded-lg");
      expect(skeleton).toHaveClass("animate-pulse");
    });

    it("allows overriding aria-hidden if explicitly required by consuming layout", () => {
      render(
        <ThemeToggleSkeleton
          data-testid="skeleton-visible"
          aria-hidden={false}
          aria-label="Loading theme toggle"
        />,
      );

      const skeleton = screen.getByTestId("skeleton-visible");
      expect(skeleton).toHaveAttribute("aria-hidden", "false");
      expect(skeleton).toHaveAttribute("aria-label", "Loading theme toggle");
    });
  });
});
