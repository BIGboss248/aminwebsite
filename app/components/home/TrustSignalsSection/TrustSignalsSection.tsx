import React from "react";
import { useTranslations } from "next-intl";
import { Award, GraduationCap, Languages, ShieldCheck } from "lucide-react";
import { Link } from "@/app/components/Link";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { TrustSignalsSectionProps } from "./TrustSignalsSection.types";

/**
 * Trust Signals & Credentials Bento Section.
 *
 * Articulates empirical production delivery metrics, dual academic degrees in
 * Computer Science and Financial Management, verified professional certifications,
 * and global bilingual (Persian & English) proficiency.
 *
 * @param props - Configuration properties for the TrustSignalsSection.
 * @returns A React Server Component rendering the Trust Signals Bento Section.
 */
export function TrustSignalsSection({
  locale = "en",
  eyebrow,
  title,
  description,
  actionHref = ROUTES.about,
  className = "",
}: TrustSignalsSectionProps): React.JSX.Element {
  const t = useTranslations("home.trust_signals");
  const tTrust = (key: string) => t(key as never);

  const resolvedEyebrow = eyebrow ?? tTrust("eyebrow");
  const resolvedTitle = title ?? tTrust("title");
  const resolvedDescription = description ?? tTrust("description");
  const resolvedActionHref = actionHref ?? ROUTES.about;

  return (
    <section
      aria-labelledby="trust-signals-heading"
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary mb-3">
            {resolvedEyebrow}
          </p>
          <h2
            id="trust-signals-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground"
          >
            {resolvedTitle}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {resolvedDescription}
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* CELL 1: Production Web Vitals (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 shadow-xs transition-all hover:border-primary/40 hover:-translate-y-0.5 dark:hover:shadow-md dark:hover:shadow-primary/10">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-status-success/30 bg-status-success/10 text-status-success text-xs font-mono font-medium tracking-wider select-none">
                  <span
                    className="size-2 rounded-full bg-status-success animate-pulse"
                    aria-hidden="true"
                  />
                  <span>{tTrust("cell1_badge")}</span>
                </div>
                <ShieldCheck
                  className="size-5 text-status-success"
                  aria-hidden="true"
                />
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {tTrust("cell1_title")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                {tTrust("cell1_desc")}
              </p>

              {/* Web Vitals 3-Column Sub-Grid */}
              <div
                dir="ltr"
                className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-lg border border-border/60 bg-muted/20 text-center"
              >
                {/* Metric 1: LCP */}
                <div
                  className="flex flex-col items-center justify-center p-2"
                  aria-label={tTrust("cell1_metric1_aria")}
                >
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-primary tracking-tight">
                    {tTrust("cell1_metric1_value")}
                  </span>
                  <span className="mt-1 text-xs font-mono text-muted-foreground">
                    {tTrust("cell1_metric1_label")}
                  </span>
                </div>

                {/* Metric 2: Lighthouse */}
                <div
                  className="flex flex-col items-center justify-center p-2 border-s border-e border-border/40"
                  aria-label={tTrust("cell1_metric2_aria")}
                >
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-status-success tracking-tight">
                    {tTrust("cell1_metric2_value")}
                  </span>
                  <span className="mt-1 text-xs font-mono text-muted-foreground">
                    {tTrust("cell1_metric2_label")}
                  </span>
                </div>

                {/* Metric 3: CLS */}
                <div
                  className="flex flex-col items-center justify-center p-2"
                  aria-label={tTrust("cell1_metric3_aria")}
                >
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-foreground tracking-tight">
                    {tTrust("cell1_metric3_value")}
                  </span>
                  <span className="mt-1 text-xs font-mono text-muted-foreground">
                    {tTrust("cell1_metric3_label")}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Summary */}
            <p className="mt-6 pt-4 border-t border-border/40 text-xs text-muted-foreground leading-relaxed">
              {tTrust("cell1_footer")}
            </p>
          </div>

          {/* CELL 2: Dual Academic Foundation (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 shadow-xs transition-all hover:border-primary/40 hover:-translate-y-0.5 dark:hover:shadow-md dark:hover:shadow-primary/10">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium tracking-wider select-none">
                  <GraduationCap className="size-3.5" aria-hidden="true" />
                  <span>{tTrust("cell2_badge")}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {tTrust("cell2_title")}
              </h3>

              {/* Degrees List */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="size-2 rounded-full bg-primary" />
                    <h4 className="text-sm font-semibold text-foreground">
                      {tTrust("cell2_degree1_title")}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground ps-4">
                    {tTrust("cell2_degree1_desc")}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-border/60 bg-muted/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="size-2 rounded-full bg-primary" />
                    <h4 className="text-sm font-semibold text-foreground">
                      {tTrust("cell2_degree2_title")}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground ps-4">
                    {tTrust("cell2_degree2_desc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Differentiator Pill */}
            <div className="mt-6 pt-4 border-t border-border/40">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium bg-muted text-muted-foreground border border-border/60">
                {tTrust("cell2_differentiator")}
              </span>
            </div>
          </div>

          {/* CELL 3: Continuous Mastery & Professional Certifications (7 Cols) */}
          <div className="md:col-span-2 lg:col-span-7 flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 shadow-xs transition-all hover:border-primary/40 hover:-translate-y-0.5">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-medium tracking-wider select-none">
                  <Award className="size-3.5" aria-hidden="true" />
                  <span>{tTrust("cell3_badge")}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {tTrust("cell3_title")}
              </h3>

              {/* Specializations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg border border-border/60 bg-muted/20">
                  <p className="text-xs font-medium text-foreground">
                    {tTrust("cell3_cert1")}
                  </p>
                  <p className="text-xs font-mono text-primary mt-0.5">
                    {tTrust("cell3_cert1_issuer")}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-border/60 bg-muted/20">
                  <p className="text-xs font-medium text-foreground">
                    {tTrust("cell3_cert2")}
                  </p>
                  <p className="text-xs font-mono text-primary mt-0.5">
                    {tTrust("cell3_cert2_issuer")}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-border/60 bg-muted/20">
                  <p className="text-xs font-medium text-foreground">
                    {tTrust("cell3_cert3")}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    {tTrust("cell3_cert3_issuer")}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-border/60 bg-muted/20">
                  <p className="text-xs font-medium text-foreground">
                    {tTrust("cell3_cert4")}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    {tTrust("cell3_cert4_issuer")}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-4 border-t border-border/40">
              <Link
                href={resolvedActionHref}
                locale={locale}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline min-h-11"
              >
                <span>{tTrust("cell3_action")}</span>
                <span aria-hidden="true" className="ms-1 rtl:rotate-180">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* CELL 4: Global Bilingual Fluency (5 Cols) */}
          <div className="md:col-span-2 lg:col-span-5 flex flex-col justify-between rounded-xl border border-border bg-card p-6 sm:p-7 shadow-xs transition-all hover:border-primary/40 hover:-translate-y-0.5">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium tracking-wider select-none">
                  <Languages className="size-3.5" aria-hidden="true" />
                  <span>{tTrust("cell4_badge")}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {tTrust("cell4_title")}
              </h3>

              {/* Languages List */}
              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-lg border border-border/60 bg-muted/20 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">
                      {tTrust("cell4_lang1_name")}
                    </span>
                    <span className="text-xs font-mono text-status-success font-medium">
                      {tTrust("cell4_lang1_level")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {tTrust("cell4_lang1_note")}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-border/60 bg-muted/20 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">
                      {tTrust("cell4_lang2_name")}
                    </span>
                    <span className="text-xs font-mono text-primary font-medium">
                      {tTrust("cell4_lang2_level")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {tTrust("cell4_lang2_note")}
                  </p>
                </div>
              </div>
            </div>

            {/* BiDi Badge */}
            <div className="pt-4 border-t border-border/40">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium bg-status-success/10 text-status-success border border-status-success/20">
                {tTrust("cell4_bidi_badge")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSignalsSection;
