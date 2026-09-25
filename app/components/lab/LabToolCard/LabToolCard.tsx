import React from "react";
import {
  ArrowRight,
  Network,
  Radio,
  Fingerprint,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Link } from "@/app/components/Link";
import { cn } from "@/lib/utils";
import type {
  LabToolCardProps,
  ToolGlyphType,
} from "./LabToolCard.types";

/**
 * Render visual icon glyph for diagnostic tool card.
 */
function renderToolGlyph(glyphType: ToolGlyphType): React.JSX.Element {
  switch (glyphType) {
    case "doh":
      return (
        <Network
          className="size-6 text-primary transition-transform group-hover:scale-110 duration-200"
          aria-hidden="true"
        />
      );
    case "ipinfo":
      return (
        <Radio
          className="size-6 text-primary transition-transform group-hover:scale-110 duration-200"
          aria-hidden="true"
        />
      );
    case "fingerprint":
      return (
        <Fingerprint
          className="size-6 text-primary transition-transform group-hover:scale-110 duration-200"
          aria-hidden="true"
        />
      );
    default:
      return (
        <Cpu
          className="size-6 text-primary transition-transform group-hover:scale-110 duration-200"
          aria-hidden="true"
        />
      );
  }
}

/**
 * Detailed Interactive Lab Tool Card (`LabToolCard`).
 *
 * Renders full diagnostic tool information including protocol badges,
 * execution specifications, capability checklist, and direct launch trigger.
 */
export function LabToolCard({
  tool,
  locale = "en",
  className = "",
  ...rest
}: LabToolCardProps): React.JSX.Element {
  const {
    id,
    tag,
    status,
    title,
    description,
    protocol,
    executionMode,
    latencyTarget,
    features,
    href,
    cta,
    glyphType,
  } = tool;

  const isRtl = locale === "fa";

  return (
    <article
      aria-labelledby={`lab-tool-title-${id}`}
      aria-describedby={`lab-tool-desc-${id}`}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs transition-all duration-300",
        "hover:border-primary/50 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-primary/5",
        className,
      )}
      {...rest}
    >
      <div>
        {/* Top Header Row: Protocol Header & Live Status Badge with flex-wrap and responsive gap */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border/60 pb-3.5 mb-5">
          {/* Protocol Tag & Pulse Indicator */}
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-primary tracking-wider">
            <span
              className="size-2 rounded-full bg-status-success shadow-xs shadow-status-success/50 animate-pulse shrink-0"
              aria-hidden="true"
            />
            <span dir="ltr">{tag}</span>
          </div>

          {/* Operational Status Pill */}
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-status-success/10 text-status-success border border-status-success/20 shrink-0"
            dir="ltr"
          >
            <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
            <span>{status}</span>
          </span>
        </div>

        {/* Glyph & Title Lockup */}
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 text-primary group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors shrink-0">
            {renderToolGlyph(glyphType)}
          </div>
          <div>
            <h3
              id={`lab-tool-title-${id}`}
              className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors"
            >
              {title}
            </h3>
            <p
              className="mt-1 text-xs font-mono text-muted-foreground flex items-center gap-1.5"
              dir="ltr"
            >
              <Zap className="size-3 text-primary shrink-0" aria-hidden="true" />
              <span>{latencyTarget}</span>
            </p>
          </div>
        </div>

        {/* Deep Description */}
        <p
          id={`lab-tool-desc-${id}`}
          className="text-sm text-muted-foreground leading-relaxed mb-6"
        >
          {description}
        </p>

        {/* Feature Capabilities Checklist */}
        <div className="mb-6 space-y-2">
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground/80 mb-2">
            Capabilities & Audit Vectors
          </p>
          <ul className="space-y-1.5 text-xs text-muted-foreground" role="list">
            {features.map((feat) => (
              <li key={feat} className="flex items-start gap-2">
                <CheckCircle2
                  className="size-3.5 text-status-success mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Execution Mode & Protocol Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6 pt-3 border-t border-border/40">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-muted text-foreground/90 border border-border/80"
            dir="ltr"
          >
            {protocol}
          </span>
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20"
            dir="ltr"
          >
            {executionMode}
          </span>
        </div>
      </div>

      {/* Action CTA Launch Button */}
      <div className="pt-4 border-t border-border/60">
        <Link
          href={href}
          className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold border border-border bg-card hover:bg-primary/10 hover:border-primary/40 text-foreground group/btn transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span>{cta}</span>
          <ArrowRight
            className={cn(
              "size-4 text-primary transition-transform duration-200 group-hover/btn:translate-x-1",
              isRtl && "rotate-180 group-hover/btn:-translate-x-1",
            )}
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

export default LabToolCard;
