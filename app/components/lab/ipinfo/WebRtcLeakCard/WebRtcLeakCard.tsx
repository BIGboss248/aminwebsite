"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Radio, ShieldAlert, ShieldCheck, AlertTriangle, Layers, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WebRtcLeakCardProps } from "./WebRtcLeakCard.types";

/**
 * WebRTC ICE Candidate Leak Card (`WebRtcLeakCard`).
 */
export function WebRtcLeakCard({
  locale = "en",
  result,
  isLoading = false,
  className = "",
  ...rest
}: WebRtcLeakCardProps): React.JSX.Element {
  const t = useTranslations("lab.ipinfo.webrtc");
  const [showRawCandidates, setShowRawCandidates] = useState(false);

  const { status, localIps, publicIps, candidates } = result;

  const getStatusBadge = () => {
    switch (status) {
      case "leaked":
        return {
          label: t("badge_leaked"),
          desc: t("desc_leaked"),
          badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
          icon: <ShieldAlert className="size-4 text-destructive" aria-hidden="true" />,
          dotClass: "bg-destructive",
        };
      case "local_exposed":
        return {
          label: t("badge_local_exposed"),
          desc: t("desc_local"),
          badgeClass: "bg-status-warning/10 text-status-warning border-status-warning/20",
          icon: <AlertTriangle className="size-4 text-status-warning" aria-hidden="true" />,
          dotClass: "bg-status-warning",
        };
      case "disabled":
        return {
          label: t("badge_disabled"),
          desc: t("desc_secure"),
          badgeClass: "bg-muted text-muted-foreground border-border",
          icon: <ShieldCheck className="size-4 text-muted-foreground" aria-hidden="true" />,
          dotClass: "bg-muted-foreground",
        };
      case "secure":
      default:
        return {
          label: t("badge_secure"),
          desc: t("desc_secure"),
          badgeClass: "bg-status-success/10 text-status-success border-status-success/20",
          icon: <ShieldCheck className="size-4 text-status-success" aria-hidden="true" />,
          dotClass: "bg-status-success",
        };
    }
  };

  const badgeInfo = getStatusBadge();

  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs transition-colors",
        className,
      )}
      {...rest}
    >
      {/* Header Row with flex-wrap */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <Radio className="size-4" aria-hidden="true" />
          </span>
          <h2 className="text-base font-bold text-foreground tracking-tight">
            {t("title")}
          </h2>
        </div>

        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border",
            badgeInfo.badgeClass,
          )}
          dir="ltr"
        >
          <span className={cn("size-1.5 rounded-full animate-pulse", badgeInfo.dotClass)} />
          <span>{badgeInfo.label}</span>
        </div>
      </div>

      {/* Description Explainer */}
      <p className="py-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {badgeInfo.desc}
      </p>

      {/* Candidate Breakdown */}
      <div className="space-y-2.5 pt-2 mt-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Public IP via STUN */}
          <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex flex-col gap-1">
            <span className="text-[11px] font-mono text-muted-foreground uppercase">
              {t("type_srflx")}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-foreground font-mono truncate" dir="ltr">
              {publicIps.length > 0 ? publicIps.join(", ") : t("no_candidates")}
            </span>
          </div>

          {/* Local / Host IP */}
          <div className="p-3 rounded-xl bg-muted/40 border border-border/50 flex flex-col gap-1">
            <span className="text-[11px] font-mono text-muted-foreground uppercase">
              {t("type_host")}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-foreground font-mono truncate" dir="ltr">
              {localIps.length > 0 ? localIps.join(", ") : t("no_candidates")}
            </span>
          </div>
        </div>

        {/* Toggleable Raw Candidates List */}
        {candidates.length > 0 && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowRawCandidates((prev) => !prev)}
              aria-expanded={showRawCandidates}
              className="flex items-center justify-between w-full p-2.5 rounded-lg bg-muted/30 hover:bg-muted/60 border border-border/50 text-xs font-mono text-muted-foreground transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="flex items-center gap-2">
                <Layers className="size-3.5 text-primary" aria-hidden="true" />
                <span>
                  {t("candidates_label")} ({candidates.length})
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  showRawCandidates && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            {showRawCandidates && (
              <div className="mt-2 p-2.5 rounded-lg bg-black/80 border border-border/60 font-mono text-[11px] text-muted-foreground space-y-1 max-h-36 overflow-y-auto" dir="ltr">
                {candidates.map((cand, idx) => (
                  <div key={idx} className="truncate text-green-400">
                    <span className="text-muted-foreground">[{cand.type}]</span> {cand.ip}:{cand.port} ({cand.protocol})
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WebRtcLeakCard;
