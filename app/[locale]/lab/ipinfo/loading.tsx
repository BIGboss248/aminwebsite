import React from "react";
import { IpScanHeaderSkeleton } from "@/app/components/lab/ipinfo/IpScanHeader";
import { IpScannerClientSkeleton } from "@/app/components/lab/ipinfo/IpScannerClient";

export default function IpInfoLoading(): React.JSX.Element {
  return (
    <div
      data-testid="ipinfo-loading-skeleton"
      className="flex flex-col flex-1 w-full bg-background font-sans"
    >
      <IpScanHeaderSkeleton />
      <IpScannerClientSkeleton />
    </div>
  );
}
