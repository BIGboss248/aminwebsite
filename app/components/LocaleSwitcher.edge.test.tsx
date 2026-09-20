import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LocaleSwitcher, LocaleSwitcherSkeleton } from "./LocaleSwitcher";

const mockReplace = jest.fn();
const mockStartProgress = jest.fn();
let mockCurrentLocale = "en";
let mockPathname = "/test-route";

jest.mock("next-intl", () => ({
  useLocale: () => mockCurrentLocale,
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      switch_language: "Language switcher",
      english: "English",
      persian: "فارسی",
    };
    return translations[key] ?? key;
  },
}));

jest.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: jest.fn(),
  }),
  usePathname: () => mockPathname,
}));

jest.mock("react-transition-progress", () => ({
  useProgress: () => mockStartProgress,
}));

describe("LocaleSwitcher Adversarial Edge-Case Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCurrentLocale = "en";
    mockPathname = "/test-route";
  });

  describe("1. Boundary & Invalid Locale Fallback Handling", () => {
    it("falls back to 'en' when an unrecognized locale string is provided via currentLocale prop", () => {
      // Cast invalid string to test runtime resilience
      render(<LocaleSwitcher currentLocale={"es" as unknown as "en" | "fa"} />);

      const enRadio = screen.getByRole("radio", { name: /en/i });
      const faRadio = screen.getByRole("radio", { name: /fa/i });

      expect(enRadio).toHaveAttribute("aria-checked", "true");
      expect(enRadio).toHaveAttribute("tabIndex", "0");
      expect(faRadio).toHaveAttribute("aria-checked", "false");
      expect(faRadio).toHaveAttribute("tabIndex", "-1");
    });

    it("falls back to 'en' when empty string is passed as currentLocale", () => {
      render(<LocaleSwitcher currentLocale={"" as unknown as "en" | "fa"} />);

      const enRadio = screen.getByRole("radio", { name: /en/i });
      expect(enRadio).toHaveAttribute("aria-checked", "true");
    });

    it("falls back to 'en' when next-intl detected locale is unsupported or corrupted", () => {
      mockCurrentLocale = "unsupported-locale";
      render(<LocaleSwitcher />);

      const enRadio = screen.getByRole("radio", { name: /en/i });
      const faRadio = screen.getByRole("radio", { name: /fa/i });

      expect(enRadio).toHaveAttribute("aria-checked", "true");
      expect(faRadio).toHaveAttribute("aria-checked", "false");
    });

    it("allows switching to 'fa' even when current state was recovered from an invalid locale", () => {
      render(<LocaleSwitcher currentLocale={"invalid" as unknown as "en" | "fa"} />);

      const faRadio = screen.getByRole("radio", { name: /fa/i });
      fireEvent.click(faRadio);

      expect(mockStartProgress).toHaveBeenCalledTimes(1);
      expect(mockReplace).toHaveBeenCalledWith("/test-route", { locale: "fa" });
    });

    it("prioritizes valid currentLocale prop over detected locale", () => {
      mockCurrentLocale = "en";
      render(<LocaleSwitcher currentLocale="fa" />);

      const faRadio = screen.getByRole("radio", { name: /fa/i });
      expect(faRadio).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("2. Rapid User Interaction & Transition Stress", () => {
    it("safely ignores rapid redundant clicks on the already active locale", () => {
      mockCurrentLocale = "en";
      render(<LocaleSwitcher />);

      const enRadio = screen.getByRole("radio", { name: /en/i });

      for (let i = 0; i < 5; i++) {
        fireEvent.click(enRadio);
      }

      expect(mockStartProgress).not.toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it("executes transition cleanly without unhandled rejections during rapid alternate clicks", () => {
      const onLocaleChange = jest.fn();
      mockCurrentLocale = "en";
      render(<LocaleSwitcher onLocaleChange={onLocaleChange} />);

      const faRadio = screen.getByRole("radio", { name: /fa/i });

      // Click rapidly
      fireEvent.click(faRadio);
      fireEvent.click(faRadio);
      fireEvent.click(faRadio);

      expect(onLocaleChange).toHaveBeenCalledWith("fa");
      expect(mockStartProgress).toHaveBeenCalled();
      expect(mockReplace).toHaveBeenCalledWith("/test-route", { locale: "fa" });
    });

    it("safely handles rapid alternating clicks between EN and FA with simulated state updates", () => {
      const onLocaleChange = jest.fn();
      mockCurrentLocale = "en";
      const { rerender } = render(
        <LocaleSwitcher currentLocale="en" onLocaleChange={onLocaleChange} />
      );

      const faRadio = screen.getByRole("radio", { name: /fa/i });
      const enRadio = screen.getByRole("radio", { name: /en/i });

      // Click FA
      fireEvent.click(faRadio);
      expect(onLocaleChange).toHaveBeenCalledWith("fa");
      expect(mockReplace).toHaveBeenCalledWith("/test-route", { locale: "fa" });

      // State updates to FA
      rerender(<LocaleSwitcher currentLocale="fa" onLocaleChange={onLocaleChange} />);

      // Redundant click on FA while active should be ignored
      fireEvent.click(faRadio);
      expect(onLocaleChange).toHaveBeenCalledTimes(1);

      // Click EN to transition back
      fireEvent.click(enRadio);
      expect(onLocaleChange).toHaveBeenCalledTimes(2);
      expect(onLocaleChange).toHaveBeenLastCalledWith("en");
      expect(mockReplace).toHaveBeenLastCalledWith("/test-route", { locale: "en" });
    });
  });

  describe("3. Keyboard Navigation Nuances & Event Bubbling", () => {
    it("cycles focus between EN and FA in both directions with ArrowRight and ArrowLeft", () => {
      mockCurrentLocale = "en";
      render(<LocaleSwitcher />);

      const enRadio = screen.getByRole("radio", { name: /en/i });
      const faRadio = screen.getByRole("radio", { name: /fa/i });

      enRadio.focus();
      expect(document.activeElement).toBe(enRadio);

      // ArrowRight on EN -> FA
      const rightEventOnEn = fireEvent.keyDown(enRadio, { key: "ArrowRight" });
      expect(rightEventOnEn).toBe(false); // defaultPrevented
      expect(document.activeElement).toBe(faRadio);

      // ArrowLeft on FA -> EN
      const leftEventOnFa = fireEvent.keyDown(faRadio, { key: "ArrowLeft" });
      expect(leftEventOnFa).toBe(false); // defaultPrevented
      expect(document.activeElement).toBe(enRadio);

      // ArrowLeft on EN -> FA (wrap-around toggle navigation)
      const leftEventOnEn = fireEvent.keyDown(enRadio, { key: "ArrowLeft" });
      expect(leftEventOnEn).toBe(false); // defaultPrevented
      expect(document.activeElement).toBe(faRadio);

      // ArrowRight on FA -> EN (wrap-around toggle navigation)
      const rightEventOnFa = fireEvent.keyDown(faRadio, { key: "ArrowRight" });
      expect(rightEventOnFa).toBe(false); // defaultPrevented
      expect(document.activeElement).toBe(enRadio);
    });

    it("does not prevent default on unhandled keys like Tab, Escape, and characters", () => {
      mockCurrentLocale = "en";
      render(<LocaleSwitcher />);

      const enRadio = screen.getByRole("radio", { name: /en/i });

      const tabEvent = fireEvent.keyDown(enRadio, { key: "Tab" });
      expect(tabEvent).toBe(true); // default NOT prevented

      const escEvent = fireEvent.keyDown(enRadio, { key: "Escape" });
      expect(escEvent).toBe(true);

      const charEvent = fireEvent.keyDown(enRadio, { key: "a" });
      expect(charEvent).toBe(true);

      const shiftEvent = fireEvent.keyDown(enRadio, { key: "Shift" });
      expect(shiftEvent).toBe(true);

      expect(mockReplace).not.toHaveBeenCalled();
    });

    it("ignores Enter and Space when pressed on the currently active locale", () => {
      mockCurrentLocale = "en";
      render(<LocaleSwitcher />);

      const enRadio = screen.getByRole("radio", { name: /en/i });
      enRadio.focus();

      fireEvent.keyDown(enRadio, { key: "Enter" });
      fireEvent.keyDown(enRadio, { key: " " });

      expect(mockStartProgress).not.toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it("bubbles click events up to outer container listeners", () => {
      const containerClickHandler = jest.fn();
      mockCurrentLocale = "en";

      render(
        <div onClick={containerClickHandler}>
          <LocaleSwitcher />
        </div>
      );

      const faRadio = screen.getByRole("radio", { name: /fa/i });
      fireEvent.click(faRadio);

      expect(containerClickHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe("4. Component Unmount During Pending Transition", () => {
    it("handles unmounting cleanly immediately following selection without crashing", () => {
      mockCurrentLocale = "en";
      const { unmount } = render(<LocaleSwitcher />);

      const faRadio = screen.getByRole("radio", { name: /fa/i });

      act(() => {
        fireEvent.click(faRadio);
        unmount();
      });

      expect(mockStartProgress).toHaveBeenCalledTimes(1);
      expect(mockReplace).toHaveBeenCalledWith("/test-route", { locale: "fa" });
    });
  });

  describe("5. Complex className Combinations & Style Merging", () => {
    it("preserves core structural classes while merging custom utility classes", () => {
      const customClasses = "custom-cockpit-pos absolute top-4 end-4 z-50 shadow-2xl";
      render(<LocaleSwitcher className={customClasses} />);

      const container = screen.getByRole("radiogroup");
      expect(container).toHaveClass("inline-flex");
      expect(container).toHaveClass("items-center");
      expect(container).toHaveClass("rounded-full");
      expect(container).toHaveClass("custom-cockpit-pos");
      expect(container).toHaveClass("z-50");
      expect(container).toHaveClass("shadow-2xl");
    });
  });

  describe("6. DOM Accessibility Hierarchy & Visual Geometry Parity", () => {
    it("renders valid ARIA radiogroup hierarchy with roving tabindex", () => {
      mockCurrentLocale = "en";
      render(<LocaleSwitcher />);

      const group = screen.getByRole("radiogroup");
      expect(group).toHaveAttribute("role", "radiogroup");
      expect(group).toHaveAttribute("aria-label", "Language switcher");

      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(2);

      // Active radio EN has tabindex 0; inactive radio FA has tabindex -1
      expect(radios[0]).toHaveAttribute("tabindex", "0");
      expect(radios[1]).toHaveAttribute("tabindex", "-1");
    });

    it("verifies the Globe icon has non-mirrored transform and aria-hidden", () => {
      const { container } = render(<LocaleSwitcher />);

      const iconWrap = container.querySelector("div[aria-hidden='true']");
      expect(iconWrap).toBeInTheDocument();
      expect(iconWrap).toHaveClass("ps-2");
      expect(iconWrap).toHaveClass("pe-1");
      expect(iconWrap).toHaveClass("order-0");

      const globeSvg = iconWrap?.querySelector("svg");
      expect(globeSvg).toBeInTheDocument();
      expect(globeSvg).toHaveClass("[transform:none]");
      expect(globeSvg).toHaveClass("shrink-0");
    });

    it("verifies bidirectional flex order classes for LTR and RTL parity", () => {
      render(<LocaleSwitcher />);

      const enRadio = screen.getByRole("radio", { name: /en/i });
      const faRadio = screen.getByRole("radio", { name: /fa/i });

      // EN: order-1 rtl:order-2
      expect(enRadio).toHaveClass("order-1");
      expect(enRadio).toHaveClass("rtl:order-2");

      // FA: order-2 rtl:order-1
      expect(faRadio).toHaveClass("order-2");
      expect(faRadio).toHaveClass("rtl:order-1");
    });

    it("ensures live telemetry pulses are aria-hidden so screen readers do not announce dots", () => {
      render(<LocaleSwitcher currentLocale="en" />);

      const enRadio = screen.getByRole("radio", { name: /en/i });
      const pulseDot = enRadio.querySelector(".animate-pulse");

      expect(pulseDot).toBeInTheDocument();
      expect(pulseDot).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("7. LocaleSwitcherSkeleton Boundary Conditions", () => {
    it("renders default skeleton fallback with correct dimensions and aria-hidden", () => {
      const { container } = render(<LocaleSwitcherSkeleton />);

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveAttribute("aria-hidden", "true");
      expect(skeleton).toHaveClass("animate-pulse");
      expect(skeleton).toHaveClass("h-9");
      expect(skeleton).toHaveClass("rounded-full");

      // Check inner placeholders
      const children = skeleton.children;
      expect(children).toHaveLength(3); // Globe placeholder, EN placeholder, FA placeholder
    });

    it("merges custom className without stripping core skeleton layout", () => {
      const { container } = render(
        <LocaleSwitcherSkeleton className="opacity-75 scale-95" />
      );

      const skeleton = container.firstChild as HTMLElement;
      expect(skeleton).toHaveClass("opacity-75");
      expect(skeleton).toHaveClass("scale-95");
      expect(skeleton).toHaveClass("inline-flex");
    });
  });
});
