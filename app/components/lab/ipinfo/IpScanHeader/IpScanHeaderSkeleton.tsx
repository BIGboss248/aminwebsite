import React from "react";
import { cn } from "@/lib/utils";

export function IpScanHeaderSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="ip-header-skeleton"
      className={cn(
        "pt-10 pb-8 sm:pt-14 sm:pb-10 border-b border-border/60 bg-background animate-pulse",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="h-4 w-28 bg-muted rounded-md mb-6" />
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="h-4 w-48 bg-muted rounded-md" />
          <div className="h-6 w-36 bg-muted rounded-full" />
        </div>
        <div className="h-8 sm:h-12 w-3/4 max-w-lg bg-muted rounded-lg mb-3.5" />
        <div className="h-4 sm:h-5 w-full max-w-2xl bg-muted rounded-md mb-2" />
        <div className="h-4 sm:h-5 w-4/5 max-w-xl bg-muted rounded-md mb-6" />
        <div className="h-20 w-full bg-muted/50 rounded-xl border border-border/50" />
      </div>
    </div>
  );
}

export default IpScanHeaderSkeleton;
