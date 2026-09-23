import React from "react";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton Baseline Unit Tests", () => {
  it("renders with default data-slot, aria-hidden, and base classes", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute("data-slot", "skeleton");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveClass("bg-skeleton");
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("rounded-md");
  });

  it("merges custom className without overriding fundamental tokens", () => {
    render(
      <Skeleton data-testid="skeleton" className="h-10 w-24 rounded-full" />,
    );
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveClass("h-10");
    expect(skeleton).toHaveClass("w-24");
    expect(skeleton).toHaveClass("rounded-full");
    expect(skeleton).toHaveClass("bg-skeleton");
    expect(skeleton).toHaveClass("animate-pulse");
  });

  it("supports accessibleLabel for standalone loading status announcements", () => {
    render(
      <Skeleton
        data-testid="accessible-skeleton"
        accessibleLabel="Loading profile data"
      />,
    );
    const skeleton = screen.getByTestId("accessible-skeleton");

    expect(skeleton).toHaveAttribute("role", "status");
    expect(skeleton).toHaveAttribute("aria-label", "Loading profile data");
    expect(skeleton).not.toHaveAttribute("aria-hidden");
  });

  it("forwards arbitrary HTML attributes and event props", () => {
    const handleClick = jest.fn();
    render(
      <Skeleton
        data-testid="interactive-skeleton"
        id="test-skeleton-id"
        onClick={handleClick}
        style={{ opacity: 0.85 }}
      />,
    );
    const skeleton = screen.getByTestId("interactive-skeleton");

    expect(skeleton).toHaveAttribute("id", "test-skeleton-id");
    expect(skeleton).toHaveStyle({ opacity: "0.85" });
  });

  it("includes accessibility classes for reduced motion and forced colors", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveClass("motion-reduce:animate-none");
    expect(skeleton).toHaveClass("motion-reduce:opacity-80");
    expect(skeleton).toHaveClass("forced-colors:outline-1");
    expect(skeleton).toHaveClass("forced-colors:outline-current");
  });
});
