import type { ComponentPropsWithoutRef } from "react";
import type { WebRtcLeakResult } from "../ipinfo-types";

export interface WebRtcLeakCardProps extends ComponentPropsWithoutRef<"div"> {
  locale?: "en" | "fa";
  result: WebRtcLeakResult;
  isLoading?: boolean;
}
