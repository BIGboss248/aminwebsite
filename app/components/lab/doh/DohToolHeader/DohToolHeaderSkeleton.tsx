import React from "react";
import { cn } from "@/lib/utils";

export function DohToolHeaderSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="doh-header-skeleton"
      className={cn(
        "pt-10 pb-8 sm:pt-14 sm:pb-10 border-b border-border/60 bg-background text-foreground",
        className,
      )}
      role="status"
      aria-label="Loading DoH tool header"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="h-4 w-32 rounded bg-muted animate-pulse mb-6" />
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="h-4 w-44 rounded bg-muted animate-pulse" />
          <div className="h-6 w-36 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="space-y-3 max-w-4xl">
          <div className="h-10 w-3/4 rounded-lg bg-muted animate-pulse" />
          <div className="h-4 w-full rounded bg-muted/80 animate-pulse" />
        </div>
        <div className="h-20 rounded-xl border border-border/50 bg-card/40 mt-6" />
      </div>
    </div>
  );
}

export default DohToolHeaderSkeleton;
