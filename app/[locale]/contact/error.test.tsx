import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactErrorBoundary from "./error";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "System Node Anomaly",
      description: "An unexpected exception occurred.",
      retry: "Retry Execution",
      home: "Return to Systems Cockpit",
      digest_label: "INCIDENT_DIGEST",
    };
    return translations[key] ?? key;
  },
}));

jest.mock("@/app/components/Link", () => ({
  __esModule: true,
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("Contact Route Error Boundary", () => {
  const mockReset = jest.fn();
  const mockError = new Error("Connection failed") as Error & {
    digest?: string;
  };
  mockError.digest = "CRASH_DIGEST_9901";

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("renders error title, description, digest code, and action buttons", () => {
    render(<ContactErrorBoundary error={mockError} reset={mockReset} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /System Node Anomaly/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/An unexpected exception occurred/i),
    ).toBeInTheDocument();
    expect(screen.getByText("CRASH_DIGEST_9901")).toBeInTheDocument();

    const retryButton = screen.getByRole("button", { name: /Retry Execution/i });
    expect(retryButton).toBeInTheDocument();

    const homeLink = screen.getByRole("link", {
      name: /Return to Systems Cockpit/i,
    });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("triggers reset callback when retry button is clicked", () => {
    render(<ContactErrorBoundary error={mockError} reset={mockReset} />);

    const retryButton = screen.getByRole("button", { name: /Retry Execution/i });
    fireEvent.click(retryButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
