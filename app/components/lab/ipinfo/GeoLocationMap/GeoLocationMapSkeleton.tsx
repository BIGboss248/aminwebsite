import React from "react";
import { cn } from "@/lib/utils";

export function GeoLocationMapSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="geolocation-map-skeleton"
      className={cn(
        "rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs animate-pulse",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-border/50 mb-5">
        <div className="h-5 w-48 bg-muted rounded-md" />
        <div className="h-5 w-32 bg-muted rounded-full" />
      </div>
      <div className="w-full h-56 sm:h-72 rounded-xl bg-muted/60 mb-3" />
      <div className="h-4 w-3/4 bg-muted rounded" />
    </div>
  );
}

export default GeoLocationMapSkeleton;
