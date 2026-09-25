import React from "react";
import { cn } from "@/lib/utils";

export function DohQueryControllerSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="doh-controller-skeleton"
      className={cn(
        "rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-7 shadow-xs",
        className,
      )}
      role="status"
      aria-label="Loading DoH query controller"
    >
      <div className="flex items-center justify-between border-b border-border/40 pb-5 mb-6">
        <div className="h-5 w-36 rounded bg-muted animate-pulse" />
        <div className="h-8 w-44 rounded-xl bg-muted animate-pulse" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 rounded-xl border border-border/40 bg-muted/20 animate-pulse" />
        ))}
      </div>

      <div className="space-y-2 mb-6">
        <div className="h-4 w-28 rounded bg-muted animate-pulse" />
        <div className="h-12 w-full rounded-xl bg-muted/60 animate-pulse" />
        <div className="flex gap-1.5 pt-1">
          {[1, 2, 3, 4].map((j) => (
            <div key={j} className="h-5 w-16 rounded bg-muted/40 animate-pulse" />
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-border/40">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((k) => (
            <div key={k} className="h-8 w-12 rounded-lg bg-muted/60 animate-pulse" />
          ))}
        </div>
        <div className="h-10 w-44 rounded-xl bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export default DohQueryControllerSkeleton;
