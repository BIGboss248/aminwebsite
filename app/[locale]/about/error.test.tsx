import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AboutErrorBoundary from "./error";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return (enMessages.error as Record<string, string>)[key] ?? key;
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

describe("About ErrorBoundary Component", () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it("renders error UI with title, description, and calls reset when clicked", () => {
    const mockReset = jest.fn();
    const testError = new Error("Test anomaly in about route");

    render(<AboutErrorBoundary error={testError} reset={mockReset} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /System Node Anomaly/i }),
    ).toBeInTheDocument();

    const retryBtn = screen.getByRole("button", { name: /Retry Execution/i });
    fireEvent.click(retryBtn);
    expect(mockReset).toHaveBeenCalledTimes(1);

    const homeLink = screen.getByRole("link", {
      name: /Return to Systems Cockpit/i,
    });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders error digest when provided", () => {
    const mockReset = jest.fn();
    const testError = Object.assign(new Error("Test error with digest"), {
      digest: "ABOUT_ERR_8892",
    });

    render(<AboutErrorBoundary error={testError} reset={mockReset} />);

    expect(screen.getByText("ABOUT_ERR_8892")).toBeInTheDocument();
  });
});
