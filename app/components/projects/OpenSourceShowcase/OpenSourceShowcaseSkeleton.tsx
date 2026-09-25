import React from "react";
import { cn } from "@/lib/utils";
import { GithubRepoCardSkeleton } from "../GithubRepoCard/GithubRepoCardSkeleton";

export interface OpenSourceShowcaseSkeletonProps {
  className?: string;
}

export function OpenSourceShowcaseSkeleton({
  className = "",
}: OpenSourceShowcaseSkeletonProps): React.JSX.Element {
  return (
    <section
      aria-hidden="true"
      className={cn("py-16 sm:py-20 lg:py-24 bg-background transition-colors", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="h-4 w-36 bg-muted rounded animate-pulse mb-3" />
            <div className="h-8 w-80 bg-muted rounded animate-pulse mb-4" />
            <div className="h-4 w-full bg-muted/80 rounded animate-pulse mb-2" />
          </div>
          <div className="h-10 w-48 bg-muted rounded-lg animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <GithubRepoCardSkeleton />
          <GithubRepoCardSkeleton />
          <GithubRepoCardSkeleton />
          <GithubRepoCardSkeleton />
        </div>
      </div>
    </section>
  );
}

export default OpenSourceShowcaseSkeleton;
