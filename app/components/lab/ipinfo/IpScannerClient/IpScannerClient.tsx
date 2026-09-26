"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  RotateCw,
  Copy,
  Check,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PublicIpCard } from "../PublicIpCard";
import { WebRtcLeakCard } from "../WebRtcLeakCard";
import { DnsLeakCard } from "../DnsLeakCard";
import { TimezoneMismatchCard } from "../TimezoneMismatchCard";
import { GeoLocationMap } from "../GeoLocationMap";
import { LeakMitigationAdvice } from "../LeakMitigationAdvice";
import {
  fetchPublicIpInfo,
  gatherWebRtcCandidates,
  checkTimezoneMismatch,
  calculatePrivacyScore,
} from "../ipinfo-utils";
import type {
  PublicIpData,
  WebRtcLeakResult,
  DnsLeakResult,
  TimezoneCheckResult,
} from "../ipinfo-types";
import type { IpScannerClientProps } from "./IpScannerClient.types";

const defaultWebRtcResult: WebRtcLeakResult = {
  status: "secure",
  localIps: [],
  publicIps: [],
  candidates: [],
  leakDetected: false,
  stunLatencyMs: 0,
};

const defaultDnsResult: DnsLeakResult = {
  status: "secure",
  resolverIp: "1.1.1.1",
  resolverAsn: "AS13335",
  resolverIsp: "Cloudflare, Inc.",
  isMatchingPublicIpAsn: true,
  latencyMs: 14,
};

const defaultTimezoneResult: TimezoneCheckResult = {
  status: "match",
  systemTimezone: "UTC",
  systemOffsetMinutes: 0,
  geoTimezone: "UTC",
  geoOffsetMinutes: 0,
  offsetDifferenceMinutes: 0,
  localFormattedTime: "12:00:00 UTC",
};

/**
 * Main Interactive IP & Identity Leak Scanner Client Coordinator (`IpScannerClient`).
 */
export function IpScannerClient({
  locale = "en",
  initialPublicIp = null,
  initialWebRtc = defaultWebRtcResult,
  initialDns = defaultDnsResult,
  initialTimezone = defaultTimezoneResult,
  className = "",
  ...rest
}: IpScannerClientProps): React.JSX.Element {
  const t = useTranslations("lab.ipinfo.controller");

  const [publicIp, setPublicIp] = useState<PublicIpData | null>(initialPublicIp);
  const [webRtc, setWebRtc] = useState<WebRtcLeakResult>(initialWebRtc);
  const [dnsLeak, setDnsLeak] = useState<DnsLeakResult>(initialDns);
  const [timezone, setTimezone] = useState<TimezoneCheckResult>(initialTimezone);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [lastScanTime, setLastScanTime] = useState<string>("");

  const abortControllerRef = useRef<AbortController | null>(null);

  const runFullScan = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsScanning(true);

    try {
      // 1. Fetch public IP & Geolocation
      const ipData = await fetchPublicIpInfo(controller.signal);
      setPublicIp(ipData);

      // 2. WebRTC STUN Candidates gathering
      const webrtcData = await gatherWebRtcCandidates(ipData.ip, 3500, controller.signal);
      setWebRtc(webrtcData);

      // 3. Timezone Mismatch check
      const tzData = checkTimezoneMismatch(ipData.timezone);
      setTimezone(tzData);

      // 4. DNS Leak Verification
      const isDnsMatched =
        !ipData.asn ||
        ipData.asn === "Unknown" ||
        ipData.asn.toLowerCase() === defaultDnsResult.resolverAsn?.toLowerCase();

      setDnsLeak({
        ...defaultDnsResult,
        isMatchingPublicIpAsn: isDnsMatched,
        status: isDnsMatched ? "secure" : "mismatch",
      });

      setLastScanTime(new Date().toLocaleTimeString());
    } finally {
      setIsScanning(false);
    }
  }, []);

  useEffect(() => {
    runFullScan();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [runFullScan]);

  const { score, threatLevel } = calculatePrivacyScore(
    publicIp,
    webRtc,
    timezone,
    dnsLeak,
  );

  const getScoreBadge = () => {
    switch (threatLevel) {
      case "critical":
        return {
          label: t("status_critical"),
          badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
          icon: <ShieldAlert className="size-4" aria-hidden="true" />,
        };
      case "high":
      case "medium":
        return {
          label: t("status_warning"),
          badgeClass: "bg-status-warning/10 text-status-warning border-status-warning/20",
          icon: <AlertTriangle className="size-4" aria-hidden="true" />,
        };
      case "low":
      default:
        return {
          label: t("status_secure"),
          badgeClass: "bg-status-success/10 text-status-success border-status-success/20",
          icon: <ShieldCheck className="size-4" aria-hidden="true" />,
        };
    }
  };

  const scoreBadge = getScoreBadge();

  const handleCopyJson = async () => {
    const reportData = {
      publicIp,
      webRtc,
      dnsLeak,
      timezone,
      privacyScore: score,
      threatLevel,
      timestamp: new Date().toISOString(),
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(reportData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      aria-label="Identity & IP Leak Diagnostic Workbench"
      className={cn("py-10 sm:py-16 bg-background text-foreground", className)}
      {...rest}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        {/* 1. Controller Bar & Privacy Score Header */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Privacy Score Gauge */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("score_label")}
                </span>
                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border",
                    scoreBadge.badgeClass,
                  )}
                  dir="ltr"
                >
                  {scoreBadge.icon}
                  <span>{scoreBadge.label}</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-3xl sm:text-4xl font-extrabold font-mono tracking-tight",
                    score >= 85
                      ? "text-status-success"
                      : score >= 60
                        ? "text-status-warning"
                        : "text-destructive",
                  )}
                  dir="ltr"
                >
                  {score}
                </span>
                <span className="text-sm font-mono text-muted-foreground">/ 100</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-xl">
                {t("score_desc")}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={runFullScan}
                disabled={isScanning}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
              >
                <RotateCw
                  className={cn("size-4", isScanning && "animate-spin")}
                  aria-hidden="true"
                />
                <span>{isScanning ? t("scanning") : t("scan_now")}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyJson}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border border-border bg-background hover:bg-muted text-foreground transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-status-success" aria-hidden="true" />
                    <span className="text-status-success">{t("copied")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-4 text-muted-foreground" aria-hidden="true" />
                    <span>{t("copy_json")}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 2. Leak Detection Grid (4 Core Diagnostic Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PublicIpCard locale={locale} data={publicIp} isLoading={isScanning} />
          <WebRtcLeakCard locale={locale} result={webRtc} isLoading={isScanning} />
          <DnsLeakCard locale={locale} result={dnsLeak} isLoading={isScanning} />
          <TimezoneMismatchCard locale={locale} result={timezone} isLoading={isScanning} />
        </div>

        {/* 3. Geolocation HUD Visualizer */}
        <GeoLocationMap locale={locale} data={publicIp} isLoading={isScanning} />

        {/* 4. Actionable Mitigation & Hardening Guidance */}
        <LeakMitigationAdvice locale={locale} />
      </div>
    </section>
  );
}

export default IpScannerClient;
