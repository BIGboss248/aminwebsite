import React from "react";
import { cn } from "@/lib/utils";

export function DnsLeakCardSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="dns-leak-skeleton"
      className={cn(
        "flex flex-col h-full rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs animate-pulse",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-border/50">
        <div className="h-5 w-44 bg-muted rounded-md" />
        <div className="h-5 w-28 bg-muted rounded-full" />
      </div>
      <div className="py-3 space-y-2">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-3/4 bg-muted rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 mt-auto">
        <div className="h-14 bg-muted/50 rounded-xl" />
        <div className="h-14 bg-muted/50 rounded-xl" />
        <div className="h-14 bg-muted/50 rounded-xl sm:col-span-2" />
      </div>
    </div>
  );
}

export default DnsLeakCardSkeleton;
