/**
 * Type Definitions for IP & Identity Leak Scanner (`/lab/ipinfo`)
 */

export interface PublicIpData {
  ip: string;
  version: "IPv4" | "IPv6";
  country: string;
  countryCode: string;
  region: string;
  city: string;
  postal?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utcOffset: string;
  asn: string;
  org: string;
  isp: string;
  isProxy?: boolean;
  isVpn?: boolean;
  isTor?: boolean;
  isHosting?: boolean;
}

export interface WebRtcCandidate {
  candidate: string;
  type: "host" | "srflx" | "relay" | "prflx" | "unknown";
  ip: string;
  port: number;
  protocol: "udp" | "tcp";
  isPrivate: boolean;
  isIpv6: boolean;
}

export interface WebRtcLeakResult {
  status: "secure" | "leaked" | "local_exposed" | "disabled" | "error";
  localIps: string[];
  publicIps: string[];
  candidates: WebRtcCandidate[];
  leakDetected: boolean;
  stunLatencyMs: number;
}

export interface DnsLeakResult {
  status: "secure" | "mismatch" | "transparent_detected" | "unknown";
  resolverIp?: string;
  resolverAsn?: string;
  resolverIsp?: string;
  resolverCountry?: string;
  isMatchingPublicIpAsn: boolean;
  latencyMs: number;
}

export interface TimezoneCheckResult {
  status: "match" | "mismatch" | "unknown";
  systemTimezone: string;
  systemOffsetMinutes: number;
  geoTimezone: string;
  geoOffsetMinutes: number;
  offsetDifferenceMinutes: number;
  localFormattedTime: string;
}

export interface IdentityScanReport {
  publicIp: PublicIpData | null;
  webRtc: WebRtcLeakResult;
  dnsLeak: DnsLeakResult;
  timezone: TimezoneCheckResult;
  privacyScore: number; // 0 - 100
  threatLevel: "low" | "medium" | "high" | "critical";
  isScanning: boolean;
  timestamp: string;
}
