import React from "react";
import { cn } from "@/lib/utils";

export function LeakMitigationAdviceSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="mitigation-skeleton"
      className={cn(
        "rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-xs animate-pulse",
        className,
      )}
    >
      <div className="h-4 w-32 bg-muted rounded mb-2" />
      <div className="h-6 w-64 bg-muted rounded mb-2" />
      <div className="h-4 w-96 max-w-full bg-muted rounded mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-24 bg-muted/40 rounded-xl" />
        <div className="h-24 bg-muted/40 rounded-xl" />
        <div className="h-24 bg-muted/40 rounded-xl" />
        <div className="h-24 bg-muted/40 rounded-xl" />
      </div>
    </div>
  );
}

export default LeakMitigationAdviceSkeleton;
