import React from "react";
import { cn } from "@/lib/utils";

export interface ProjectFilterTabsSkeletonProps {
  className?: string;
}

export function ProjectFilterTabsSkeleton({
  className = "",
}: ProjectFilterTabsSkeletonProps): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-9 w-28 sm:w-32 rounded-lg bg-card border border-border animate-pulse"
        />
      ))}
    </div>
  );
}

export default ProjectFilterTabsSkeleton;
