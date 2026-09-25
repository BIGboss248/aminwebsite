import React from "react";
import { cn } from "@/lib/utils";

export interface ProjectSearchBarSkeletonProps {
  className?: string;
}

export function ProjectSearchBarSkeleton({
  className = "",
}: ProjectSearchBarSkeletonProps): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-11 w-full rounded-lg bg-card border border-border animate-pulse",
        className,
      )}
    />
  );
}

export default ProjectSearchBarSkeleton;
