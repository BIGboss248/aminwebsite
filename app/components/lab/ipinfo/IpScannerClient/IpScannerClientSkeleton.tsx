import React from "react";
import { cn } from "@/lib/utils";
import { PublicIpCardSkeleton } from "../PublicIpCard";
import { WebRtcLeakCardSkeleton } from "../WebRtcLeakCard";
import { DnsLeakCardSkeleton } from "../DnsLeakCard";
import { TimezoneMismatchCardSkeleton } from "../TimezoneMismatchCard";
import { GeoLocationMapSkeleton } from "../GeoLocationMap";
import { LeakMitigationAdviceSkeleton } from "../LeakMitigationAdvice";

export function IpScannerClientSkeleton({
  className = "",
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div
      data-testid="ip-scanner-skeleton"
      className={cn("py-10 sm:py-16 bg-background text-foreground animate-pulse", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        {/* Controller Bar Skeleton */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-9 w-20 bg-muted rounded-md" />
              <div className="h-4 w-80 max-w-full bg-muted rounded" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-44 bg-muted rounded-xl" />
              <div className="h-10 w-36 bg-muted rounded-xl" />
            </div>
          </div>
        </div>

        {/* 4 Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PublicIpCardSkeleton />
          <WebRtcLeakCardSkeleton />
          <DnsLeakCardSkeleton />
          <TimezoneMismatchCardSkeleton />
        </div>

        {/* Map Skeleton */}
        <GeoLocationMapSkeleton />

        {/* Mitigation Skeleton */}
        <LeakMitigationAdviceSkeleton />
      </div>
    </div>
  );
}

export default IpScannerClientSkeleton;
