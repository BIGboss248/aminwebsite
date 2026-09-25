import React from "react";
import { cn } from "@/lib/utils";

export function DohDiagnosticConsoleSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="doh-console-skeleton"
      className={cn("space-y-6", className)}
      role="status"
      aria-label="Loading diagnostic console"
    >
      <div className="rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-7 space-y-4">
        <div className="h-5 w-48 rounded bg-muted animate-pulse mb-4" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-xl border border-border/40 bg-muted/20 animate-pulse" />
        ))}
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-7 space-y-4">
        <div className="h-5 w-52 rounded bg-muted animate-pulse" />
        <div className="h-28 rounded-lg bg-muted/20 animate-pulse" />
      </div>
    </div>
  );
}

export default DohDiagnosticConsoleSkeleton;
