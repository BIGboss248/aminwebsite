import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "./error";
import enMessages from "@/messages/en.json";

const mockLocale = "en";

jest.mock("next-intl", () => ({
  useLocale: () => mockLocale,
  useTranslations: (namespace?: string) => (key: string) => {
    if (namespace === "error") {
      return (enMessages.error as Record<string, string>)[key] ?? key;
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

describe("ErrorBoundary (Route Error Component)", () => {
  const mockReset = jest.fn();
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renders the error title, description, and action buttons", () => {
    const testError = new Error("Test explosion");
    render(<ErrorBoundary error={testError} reset={mockReset} />);

    expect(screen.getByText("System Node Anomaly")).toBeInTheDocument();
    expect(
      screen.getByText(
        "An unexpected exception occurred while rendering this route. Telemetry has logged the incident for diagnostic review.",
      ),
    ).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: /retry execution/i });
    expect(retryButton).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: /return to systems cockpit/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("calls reset function when retry button is clicked", () => {
    const testError = new Error("Network timeout");
    render(<ErrorBoundary error={testError} reset={mockReset} />);

    const retryButton = screen.getByRole("button", { name: /retry execution/i });
    fireEvent.click(retryButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("displays digest information when error has digest", () => {
    const testError = Object.assign(new Error("Digest error"), {
      digest: "CRASH_0x8F92",
    });

    render(<ErrorBoundary error={testError} reset={mockReset} />);

    expect(screen.getByText("INCIDENT_DIGEST:")).toBeInTheDocument();
    expect(screen.getByText("CRASH_0x8F92")).toBeInTheDocument();
  });

  it("logs error to console / telemetry on mount", () => {
    const testError = new Error("Diagnostic log test");
    render(<ErrorBoundary error={testError} reset={mockReset} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[ErrorBoundary caught route exception]:",
      testError,
    );
  });
});
