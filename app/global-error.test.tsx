import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GlobalError from "./global-error";

describe("GlobalError Component", () => {
  const mockReset = jest.fn();
  const mockError = new Error("Fatal rendering failure");
  const originalConsoleError = console.error;

  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it("renders critical error headline and retry button", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(screen.getByText("System Critical Error")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try Again" })).toBeInTheDocument();
  });

  it("renders incident digest when provided", () => {
    const errorWithDigest = Object.assign(new Error("Fatal crash"), {
      digest: "CRIT-8849",
    });

    render(<GlobalError error={errorWithDigest} reset={mockReset} />);

    expect(screen.getByText("INCIDENT_DIGEST:")).toBeInTheDocument();
    expect(screen.getByText("CRIT-8849")).toBeInTheDocument();
  });

  it("calls reset handler when clicking try again", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    fireEvent.click(screen.getByRole("button", { name: "Try Again" }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
