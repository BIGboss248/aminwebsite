import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import { Link } from "@/app/components/Link";
import { cn } from "@/lib/utils";
import type { CaseStudyCardProps } from "./CaseStudyCard.types";

/**
 * CaseStudyCard Component
 *
 * High-density modular project card rendering case study details, metrics, stack, and links.
 */
export function CaseStudyCard({
  caseStudy,
  locale = "en",
  className = "",
}: CaseStudyCardProps): React.JSX.Element {
  const t = useTranslations("projects.case_studies");
  const isRtl = locale === "fa";

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary",
        className,
      )}
    >
      <div>
        {/* Card Header Row with flex-wrap according to Rule 32 */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <span className="font-mono text-xs text-primary font-semibold tracking-wider">
            {caseStudy.tag}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-primary/10 text-primary border border-primary/20">
            <span className="size-1.5 rounded-full bg-primary" />
            <span>{caseStudy.status}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-2">
          <Link
            href={caseStudy.href}
            locale={locale}
            className="focus-visible:outline-hidden"
          >
            {caseStudy.title}
          </Link>
        </h3>

        {/* Role & Client Context */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-muted-foreground mb-4 font-mono">
          <span className="text-foreground/90 font-medium">
            {caseStudy.role}
          </span>
          <span className="text-border hidden sm:inline">•</span>
          <span className="text-primary/90">{caseStudy.client}</span>
        </div>

        {/* Summary Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {caseStudy.summary}
        </p>

        {/* Verified Impact Metrics Strip */}
        <div className="mb-6">
          <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
            {t("metrics_label")}
          </div>
          <div
            dir="ltr"
            className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-background border border-border/80 text-center font-mono"
          >
            {caseStudy.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-1"
              >
                <span className="text-sm sm:text-base font-bold text-foreground">
                  {metric.value}
                </span>
                <span className="text-[10px] text-muted-foreground line-clamp-1">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture & Tech Stack Badges */}
        <div className="mb-6">
          <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
            {t("architecture_label")}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {caseStudy.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground border border-border/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation & External Links */}
      <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={caseStudy.href}
          locale={locale}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary group-hover:text-primary/90 transition-colors focus-visible:outline-hidden"
        >
          <span>{t("view_case_study")}</span>
          <ArrowRight
            className={cn(
              "size-4 transition-transform group-hover:translate-x-1",
              isRtl && "rotate-180 group-hover:-translate-x-1",
            )}
            aria-hidden="true"
          />
        </Link>

        <div className="flex items-center gap-3">
          {caseStudy.doi && (
            <a
              href={`https://doi.org/${caseStudy.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              title={t("view_paper")}
            >
              <FileText className="size-3.5" aria-hidden="true" />
              <span>DOI</span>
            </a>
          )}

          {caseStudy.liveUrl && (
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              title={t("live_preview")}
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
              <span>{t("live_preview")}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default CaseStudyCard;
