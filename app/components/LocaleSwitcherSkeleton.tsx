import React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the LocaleSwitcherSkeleton component.
 */
export interface LocaleSwitcherSkeletonProps {
  /**
   * Additional CSS classes to apply to the skeleton placeholder.
   * @defaultValue `""`
   */
  className?: string;
}

/**
 * Loading skeleton fallback for the LocaleSwitcher component.
 * Mirrors the exact segmented pill dimensions (36px visual height, rounded-full)
 * to prevent Cumulative Layout Shift (CLS) during page hydration or streaming.
 *
 * @param props - Configuration properties for the skeleton.
 * @returns A loading placeholder matching the segmented pill geometry.
 */
export function LocaleSwitcherSkeleton({
  className = "",
}: LocaleSwitcherSkeletonProps): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "inline-flex items-center h-9 p-1 rounded-full border border-border/60 bg-skeleton/40 animate-pulse select-none motion-reduce:animate-none motion-reduce:opacity-80 forced-colors:outline forced-colors:outline-1",
        className,
      )}
    >
      {/* Globe glyph placeholder */}
      <div className="size-4 rounded-full bg-skeleton-shimmer ms-2 me-1" />

      {/* Segment 1 placeholder (EN) */}
      <div className="h-7 w-9 rounded-full bg-skeleton-shimmer mx-0.5" />

      {/* Segment 2 placeholder (FA) */}
      <div className="h-7 w-14 rounded-full bg-skeleton-shimmer mx-0.5" />
    </div>
  );
}

export default LocaleSwitcherSkeleton;
