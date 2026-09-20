import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LocaleSwitcher, LocaleSwitcherSkeleton } from "./LocaleSwitcher";

const mockReplace = jest.fn();
const mockStartProgress = jest.fn();
let mockCurrentLocale = "en";
let mockPathname = "/about";

jest.mock("next-intl", () => ({
  useLocale: () => mockCurrentLocale,
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      switch_language: "Language",
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

describe("LocaleSwitcher Baseline Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCurrentLocale = "en";
    mockPathname = "/about";
  });

  it("renders a radiogroup container with globe icon and two locale options", () => {
    render(<LocaleSwitcher />);

    const group = screen.getByRole("radiogroup", { name: /language/i });
    expect(group).toBeInTheDocument();

    const enRadio = screen.getByRole("radio", { name: /en/i });
    const faRadio = screen.getByRole("radio", { name: /fa/i });

    expect(enRadio).toBeInTheDocument();
    expect(faRadio).toBeInTheDocument();
  });

  it("marks active locale with aria-checked=true and inactive with aria-checked=false", () => {
    mockCurrentLocale = "en";
    render(<LocaleSwitcher />);

    const enRadio = screen.getByRole("radio", { name: /en/i });
    const faRadio = screen.getByRole("radio", { name: /fa/i });

    expect(enRadio).toHaveAttribute("aria-checked", "true");
    expect(faRadio).toHaveAttribute("aria-checked", "false");
  });

  it("respects currentLocale override prop when provided", () => {
    mockCurrentLocale = "en";
    render(<LocaleSwitcher currentLocale="fa" />);

    const enRadio = screen.getByRole("radio", { name: /en/i });
    const faRadio = screen.getByRole("radio", { name: /fa/i });

    expect(enRadio).toHaveAttribute("aria-checked", "false");
    expect(faRadio).toHaveAttribute("aria-checked", "true");
  });

  it("switches to Persian (fa) on click, triggering progress and router.replace", () => {
    mockCurrentLocale = "en";
    render(<LocaleSwitcher />);

    const faRadio = screen.getByRole("radio", { name: /fa/i });
    fireEvent.click(faRadio);

    expect(mockStartProgress).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/about", { locale: "fa" });
  });

  it("switches to English (en) when Persian is active", () => {
    mockCurrentLocale = "fa";
    render(<LocaleSwitcher />);

    const enRadio = screen.getByRole("radio", { name: /en/i });
    fireEvent.click(enRadio);

    expect(mockStartProgress).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/about", { locale: "en" });
  });

  it("fires optional onLocaleChange callback when switching locale", () => {
    const handleLocaleChange = jest.fn();
    mockCurrentLocale = "en";
    render(<LocaleSwitcher onLocaleChange={handleLocaleChange} />);

    const faRadio = screen.getByRole("radio", { name: /fa/i });
    fireEvent.click(faRadio);

    expect(handleLocaleChange).toHaveBeenCalledTimes(1);
    expect(handleLocaleChange).toHaveBeenCalledWith("fa");
  });

  it("does not trigger navigation when clicking the already active locale", () => {
    mockCurrentLocale = "en";
    render(<LocaleSwitcher />);

    const enRadio = screen.getByRole("radio", { name: /en/i });
    fireEvent.click(enRadio);

    expect(mockStartProgress).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("supports keyboard arrow navigation between segments", () => {
    mockCurrentLocale = "en";
    render(<LocaleSwitcher />);

    const enRadio = screen.getByRole("radio", { name: /en/i });
    const faRadio = screen.getByRole("radio", { name: /fa/i });

    enRadio.focus();
    expect(document.activeElement).toBe(enRadio);

    fireEvent.keyDown(enRadio, { key: "ArrowRight" });
    expect(document.activeElement).toBe(faRadio);

    fireEvent.keyDown(faRadio, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(enRadio);
  });

  it("triggers selection on Enter or Space key press on inactive option", () => {
    mockCurrentLocale = "en";
    render(<LocaleSwitcher />);

    const faRadio = screen.getByRole("radio", { name: /fa/i });
    faRadio.focus();

    fireEvent.keyDown(faRadio, { key: "Enter" });
    expect(mockReplace).toHaveBeenCalledWith("/about", { locale: "fa" });

    jest.clearAllMocks();
    fireEvent.keyDown(faRadio, { key: " " });
    expect(mockReplace).toHaveBeenCalledWith("/about", { locale: "fa" });
  });

  it("hides native script autonyms when showAutonyms=false", () => {
    render(<LocaleSwitcher showAutonyms={false} />);

    expect(screen.queryByText(/فارسی/i)).not.toBeInTheDocument();
  });

  it("applies custom className to segmented pill container", () => {
    render(<LocaleSwitcher className="custom-switcher-class" />);

    const group = screen.getByRole("radiogroup", { name: /language/i });
    expect(group).toHaveClass("custom-switcher-class");
  });

  it("renders LocaleSwitcherSkeleton matching layout geometry with animate-pulse", () => {
    const { container } = render(
      <LocaleSwitcherSkeleton className="skeleton-test" />,
    );

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("skeleton-test");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
  });
});
