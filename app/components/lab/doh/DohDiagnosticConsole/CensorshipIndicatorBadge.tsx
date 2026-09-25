import React from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, ShieldAlert, ShieldX, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CensorshipIndicatorBadgeProps } from "./DohDiagnosticConsole.types";

/**
 * Visual censorship and integrity badge (`CensorshipIndicatorBadge`).
 */
export function CensorshipIndicatorBadge({
  status,
  className = "",
  ...rest
}: CensorshipIndicatorBadgeProps): React.JSX.Element {
  const t = useTranslations("lab.doh_prober.console");

  switch (status) {
    case "secure":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-status-success/10 text-status-success border border-status-success/30",
            className,
          )}
          dir="ltr"
          {...rest}
        >
          <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{t("status_secure")}</span>
        </span>
      );
    case "poisoned":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-status-error/15 text-status-error border border-status-error/40 animate-pulse",
            className,
          )}
          dir="ltr"
          {...rest}
        >
          <ShieldAlert className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{t("status_poisoned")}</span>
        </span>
      );
    case "blocked":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-status-warning/15 text-status-warning border border-status-warning/40",
            className,
          )}
          dir="ltr"
          {...rest}
        >
          <ShieldX className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{t("status_blocked")}</span>
        </span>
      );
    case "timeout":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-muted text-muted-foreground border border-border",
            className,
          )}
          dir="ltr"
          {...rest}
        >
          <Clock className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{t("status_timeout")}</span>
        </span>
      );
    default:
      return <span />;
  }
}

export default CensorshipIndicatorBadge;
