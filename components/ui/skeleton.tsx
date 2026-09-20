import * as React from "react"
import { cn } from "cn"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional accessible label when the skeleton acts as a standalone status announcer.
   * If provided, `aria-hidden` is omitted and `role="status"` is assigned.
   */
  accessibleLabel?: string
}

/**
 * Accessible loading placeholder primitive.
 * Consumes the central `--skeleton` design token across light and dark themes.
 * Complies with WCAG 2.1 Non-text Contrast (1.4.11) and Vestibular Motion Safety (2.2.2).
 *
 * @param props - HTML div attributes and optional accessibleLabel.
 * @returns Accessible skeleton placeholder element.
 */
function Skeleton({
  className,
  accessibleLabel,
  ...props
}: SkeletonProps): React.JSX.Element {
  return (
    <div
      data-slot="skeleton"
      aria-hidden={accessibleLabel ? undefined : (props["aria-hidden"] ?? "true")}
      aria-label={accessibleLabel ?? props["aria-label"]}
      role={accessibleLabel ? "status" : props.role}
      className={cn(
        "rounded-md bg-skeleton animate-pulse border border-skeleton-border/40 motion-reduce:animate-none motion-reduce:opacity-80 forced-colors:outline forced-colors:outline-1 forced-colors:outline-current",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
export default Skeleton

