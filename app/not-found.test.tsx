import React from "react";
import { render, screen } from "@testing-library/react";
import RootNotFound from "./not-found";

jest.mock("next/link", () => ({
  __esModule: true,
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

describe("RootNotFound (Root not-found component)", () => {
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renders 404 badge, heading, and return link", () => {
    render(<RootNotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("// UNRESOLVED ROUTE")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();

    const returnLink = screen.getByRole("link", { name: /return to homepage/i });
    expect(returnLink).toBeInTheDocument();
    expect(returnLink).toHaveAttribute("href", "/en");
  });
});
