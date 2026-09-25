"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { HelpCircle, ShieldAlert, Network, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DohMethodologyTooltipProps } from "./DohToolHeader.types";

/**
 * Explainer section detailing DNS poisoning, query paths, and resolver differences (`DohMethodologyTooltip`).
 */
export function DohMethodologyTooltip({
  className = "",
  ...rest
}: DohMethodologyTooltipProps): React.JSX.Element {
  const t = useTranslations("lab.doh_prober.methodology");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "mt-6 rounded-xl border border-border/70 bg-card/80 p-4 sm:p-5 backdrop-blur-xs shadow-xs transition-all",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
            <HelpCircle className="size-4" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              {t("title")}
            </h3>
            <span
              className="text-xs font-mono text-primary font-medium"
              dir="ltr"
            >
              {t("badge")}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border border-border bg-muted/60 hover:bg-muted text-foreground transition-colors cursor-pointer"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "Hide Details" : "Learn Methodology"}</span>
          {isExpanded ? (
            <ChevronUp className="size-3.5" aria-hidden="true" />
          ) : (
            <ChevronDown className="size-3.5" aria-hidden="true" />
          )}
        </button>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed mt-3">
        {t("description")}
      </p>

      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4 pt-4 border-t border-border/50 animate-in fade-in duration-200">
          {/* Card 1: RFC 8484 */}
          <div className="rounded-lg border border-border/60 bg-muted/40 p-3">
            <div className="flex items-center gap-1.5 text-primary mb-1">
              <Network className="size-3.5" aria-hidden="true" />
              <h4 className="text-xs font-bold text-foreground">
                {t("rfc_title")}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("rfc_desc")}
            </p>
          </div>

          {/* Card 2: Poisoning Detection */}
          <div className="rounded-lg border border-border/60 bg-muted/40 p-3">
            <div className="flex items-center gap-1.5 text-status-warning mb-1">
              <ShieldAlert className="size-3.5" aria-hidden="true" />
              <h4 className="text-xs font-bold text-foreground">
                {t("poisoning_title")}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("poisoning_desc")}
            </p>
          </div>

          {/* Card 3: Zero Intermediaries */}
          <div className="rounded-lg border border-border/60 bg-muted/40 p-3">
            <div className="flex items-center gap-1.5 text-status-success mb-1">
              <Network className="size-3.5" aria-hidden="true" />
              <h4 className="text-xs font-bold text-foreground">
                {t("zero_log_title")}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("zero_log_desc")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DohMethodologyTooltip;
