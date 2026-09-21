import React from "react";
import {
  ArrowRight,
  Network,
  Radio,
  Cpu,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@/app/components/Link";
import { cn } from "@/lib/utils";
import type {
  ToolQuickCardProps,
  ToolGlyphType,
} from "./LabLauncherSection.types";

/**
 * Render visual geometric glyph for diagnostic tool.
 */
function renderToolGlyph(glyphType?: ToolGlyphType): React.JSX.Element {
  switch (glyphType) {
    case "doh":
      return (
        <Network
          className="size-6 text-cyan-600 dark:text-cyan-400 transition-transform group-hover:scale-110 duration-200"
          aria-hidden="true"
        />
      );
    case "ipinfo":
      return (
        <Radio
          className="size-6 text-cyan-600 dark:text-cyan-400 transition-transform group-hover:scale-110 duration-200"
          aria-hidden="true"
        />
      );
    case "fingerprint":
      return (
        <Fingerprint
          className="size-6 text-cyan-600 dark:text-cyan-400 transition-transform group-hover:scale-110 duration-200"
          aria-hidden="true"
        />
      );
    default:
      return (
        <Cpu
          className="size-6 text-cyan-600 dark:text-cyan-400 transition-transform group-hover:scale-110 duration-200"
          aria-hidden="true"
        />
      );
  }
}

/**
 * Individual Interactive Diagnostic Tool Card Component.
 *
 * Renders a high-precision systems diagnostic tool preview with live status telemetry,
 * protocol indicators, technical chip markers, and direct standalone lab routing.
 *
 * @param props - Configuration properties for ToolQuickCard.
 * @returns A JSX Element representing the tool diagnostic card.
 */
export function ToolQuickCard({
  tool,
  locale = "en",
  className = "",
  ...rest
}: ToolQuickCardProps): React.JSX.Element {
  const {
    id,
    headerTag,
    privacyMode,
    title,
    pitch,
    chips,
    href,
    ctaLabel,
    glyphType,
  } = tool;

  const isRtl = locale === "fa";

  return (
    <article
      aria-labelledby={`tool-title-${id}`}
      aria-describedby={`tool-pitch-${id}`}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 shadow-xs transition-all duration-300",
        "hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_0_24px_-4px_rgba(6,182,212,0.18)]",
        className,
      )}
      {...rest}
    >
      <div>
        {/* Top Header Row: Protocol Header & Privacy Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border/60 pb-3.5 mb-5">
          {/* Live Status Dot & Monospace Protocol Spec */}
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400 tracking-wider">
            <span
              className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse shrink-0"
              aria-hidden="true"
            />
            <span>{headerTag}</span>
          </div>

          {/* Privacy / Execution Mode Pill */}
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 shrink-0"
            dir="ltr"
          >
            <ShieldCheck className="size-3 shrink-0" aria-hidden="true" />
            <span>{privacyMode}</span>
          </span>
        </div>

        {/* Glyph & Title Lockup */}
        <div className="flex items-start gap-4 mb-3">
          <div className="p-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-colors shrink-0">
            {renderToolGlyph(glyphType)}
          </div>
          <div>
            <h3
              id={`tool-title-${id}`}
              className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Concise Value Pitch */}
        <p
          id={`tool-pitch-${id}`}
          className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6"
        >
          {pitch}
        </p>

        {/* Technical Architecture & Client Endpoint Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {chips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-muted text-foreground/90 border border-border/80"
              dir="ltr"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA Launch Button */}
      <div className="pt-2 border-t border-border/40">
        <Link
          href={href}
          className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold border border-border bg-muted/40 hover:bg-cyan-500/10 hover:border-cyan-500/40 text-foreground group/btn transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          <span>{ctaLabel}</span>
          <ArrowRight
            className={cn(
              "size-4 text-cyan-600 dark:text-cyan-400 transition-transform duration-200 group-hover/btn:translate-x-1",
              isRtl && "rotate-180 group-hover/btn:-translate-x-1",
            )}
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

export default ToolQuickCard;
