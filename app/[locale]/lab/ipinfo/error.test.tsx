import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import IpInfoErrorBoundary from "./error";
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

describe("IpInfoErrorBoundary Component", () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it("renders error UI and triggers reset on click", () => {
    const mockReset = jest.fn();
    const testError = new Error("Test anomaly in IP info route segment");

    render(<IpInfoErrorBoundary error={testError} reset={mockReset} />);

    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toBeInTheDocument();

    const retryBtn = screen.getByRole("button", {
      name: new RegExp(enMessages.error.retry, "i"),
    });
    fireEvent.click(retryBtn);
    expect(mockReset).toHaveBeenCalledTimes(1);

    const homeLink = screen.getByRole("link", {
      name: new RegExp(enMessages.error.home, "i"),
    });
    expect(homeLink).toHaveAttribute("href", "/lab");
  });

  it("renders error digest when present", () => {
    const mockReset = jest.fn();
    const testError = Object.assign(new Error("Test error with digest"), {
      digest: "IP_ERR_4081",
    });

    render(<IpInfoErrorBoundary error={testError} reset={mockReset} />);

    expect(screen.getByText("IP_ERR_4081")).toBeInTheDocument();
  });
});
