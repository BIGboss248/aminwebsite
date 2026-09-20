import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Skeleton } from "./skeleton"

describe("Skeleton Adversarial & Edge Cases", () => {
  it("handles empty className and undefined properties gracefully", () => {
    const { container } = render(<Skeleton className="" />)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveClass("bg-skeleton")
  })

  it("permits explicit consumer overrides of aria-hidden", () => {
    render(
      <Skeleton
        data-testid="explicit-aria-skeleton"
        aria-hidden={false}
        aria-label="Custom loading skeleton"
      />
    )
    const skeleton = screen.getByTestId("explicit-aria-skeleton")
    expect(skeleton).toHaveAttribute("aria-hidden", "false")
    expect(skeleton).toHaveAttribute("aria-label", "Custom loading skeleton")
  })

  it("handles conflicting dimensional classes correctly with tailwind-merge", () => {
    const { rerender } = render(
      <Skeleton data-testid="dim-skeleton" className="h-4 w-12" />
    )
    const skeleton = screen.getByTestId("dim-skeleton")
    expect(skeleton).toHaveClass("h-4")
    expect(skeleton).toHaveClass("w-12")

    // Consumer overrides with larger sizing
    rerender(<Skeleton data-testid="dim-skeleton" className="h-16 w-32" />)
    expect(skeleton).toHaveClass("h-16")
    expect(skeleton).toHaveClass("w-32")
  })

  it("renders smoothly in composite nested card hierarchies", () => {
    render(
      <div data-testid="card-skeleton" className="p-4 border rounded-xl">
        <Skeleton data-testid="child-avatar" className="size-12 rounded-full" />
        <Skeleton data-testid="child-title" className="h-4 w-3/4 mt-2" />
        <Skeleton data-testid="child-body" className="h-3 w-1/2 mt-1" />
      </div>
    )

    const card = screen.getByTestId("card-skeleton")
    expect(card).toBeInTheDocument()
    expect(screen.getByTestId("child-avatar")).toHaveClass("size-12")
    expect(screen.getByTestId("child-title")).toHaveClass("w-3/4")
    expect(screen.getByTestId("child-body")).toHaveClass("w-1/2")
  })

  it("maintains accessibility when receiving custom keyboard/focus handlers", () => {
    const handleKeyDown = jest.fn()
    render(
      <Skeleton
        data-testid="interactive-skeleton"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      />
    )
    const skeleton = screen.getByTestId("interactive-skeleton")
    skeleton.focus()
    expect(document.activeElement).toBe(skeleton)

    fireEvent.keyDown(skeleton, { key: "Enter", code: "Enter" })
    expect(handleKeyDown).toHaveBeenCalledTimes(1)
  })
})

