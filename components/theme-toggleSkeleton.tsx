import * as React from "react";
import { cn } from "cn";

/**
 * Skeleton placeholder matching the exact dimensions of ThemeToggle
 * to eliminate cumulative layout shift (CLS) during streaming and initial mount.
 *
 * @param props - Optional HTML div attributes including className.
 * @returns An accessible pulse-animated placeholder element.
 */
export function ThemeToggleSkeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn("h-8 w-8 rounded-lg bg-muted/50 animate-pulse", className)}
      className={cn("h-8 w-8 rounded-lg bg-skeleton animate-pulse", className)}
      {...props}
    />
  );
}

export const Skeleton = ThemeToggleSkeleton;
export default ThemeToggleSkeleton;

