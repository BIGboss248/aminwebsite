import React from "react";
import { cn } from "@/lib/utils";
import { DohQueryControllerSkeleton } from "../DohQueryController/DohQueryControllerSkeleton";
import { DohDiagnosticConsoleSkeleton } from "../DohDiagnosticConsole/DohDiagnosticConsoleSkeleton";

export function DohProberClientSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="doh-prober-skeleton"
      className={cn("py-10 sm:py-16 bg-background text-foreground space-y-8", className)}
      role="status"
      aria-label="Loading DoH Prober interface"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        <DohQueryControllerSkeleton />
        <DohDiagnosticConsoleSkeleton />
      </div>
    </div>
  );
}

export default DohProberClientSkeleton;
