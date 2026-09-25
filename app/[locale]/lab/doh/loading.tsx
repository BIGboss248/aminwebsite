import React from "react";
import { DohToolHeaderSkeleton } from "@/app/components/lab/doh/DohToolHeader";
import { DohProberClientSkeleton } from "@/app/components/lab/doh/DohProberClient";

export default function DohLoading(): React.JSX.Element {
  return (
    <div
      data-testid="doh-loading-skeleton"
      className="flex flex-col flex-1 w-full bg-background font-sans"
    >
      <DohToolHeaderSkeleton />
      <DohProberClientSkeleton />
    </div>
  );
}
