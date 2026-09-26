import type { ComponentPropsWithoutRef } from "react";
import type { PublicIpData, WebRtcLeakResult, DnsLeakResult, TimezoneCheckResult } from "../ipinfo-types";

export interface IpScannerClientProps extends ComponentPropsWithoutRef<"section"> {
  locale?: "en" | "fa";
  initialPublicIp?: PublicIpData | null;
  initialWebRtc?: WebRtcLeakResult;
  initialDns?: DnsLeakResult;
  initialTimezone?: TimezoneCheckResult;
}
