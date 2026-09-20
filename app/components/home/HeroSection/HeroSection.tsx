import React from "react";
import { Link } from "@/app/components/Link";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { HeroSectionProps } from "./HeroSection.types";

/**
 * Default textual content mapped by locale.
 */
const DEFAULT_CONTENT = {
  en: {
    availabilityText: "AVAILABLE FOR ARCHITECTURE & CONTRACTS",
    title: "Architecting Solutions Across Frontend & Infrastructure",
    description:
      "Pro frontend engineering backed by deep CI/CD pipelines, edge networking, and resilient systems design.",
    primaryCtaText: "Book Introductory Call",
    secondaryCtaText: "Explore Case Studies",
    labCtaText: "Launch Lab Probers",
    telemetryTitle: "SYSTEMS OBSERVATORY // EDGE TELEMETRY",
    latencyLabel: "EDGE_LATENCY",
    latencyValue: "18ms",
    pipelineLabel: "PIPELINE_STATUS",
    pipelineValue: "PASSING",
    dohLabel: "DNS_RESOLVER_PROBE",
    dohValue: "ACTIVE (0.8ms)",
    infraLabel: "INFRASTRUCTURE",
    infraValue: "OCI Standalone Container",
  },
  fa: {
    availabilityText: "آماده برای همکاری و مشاوره معماری",
    title: "معماری راه‌حل‌های جامع از فرانت‌اند تا زیرساخت",
    description:
      "توسعه حرفه‌ای فرانت‌اند مبتنی بر خطوط CI/CD، شبکه‌های لبه و طراحی سیستم‌های تاب‌آور.",
    primaryCtaText: "رزرو جلسه گفتگو",
    secondaryCtaText: "مشاهده پروژه‌ها",
    labCtaText: "ابزارهای آزمایشگاه",
    telemetryTitle: "رصدخانه سیستم‌ها // تله‌متری لبه",
    latencyLabel: "تأخیر لبه",
    latencyValue: "۱۸ میلی‌ثانیه",
    pipelineLabel: "وضعیت پایپ‌لاین",
    pipelineValue: "تأیید شده",
    dohLabel: "کاوشگر DNS",
    dohValue: "فعال (۰.۸ میلی‌ثانیه)",
    infraLabel: "زیرساخت",
    infraValue: "کانتینر مستقل OCI",
  },
};

/**
 * Editorial Minimalist Hero Section for the Home Page.
 *
 * Articulates Amin Jamali's competence as a Pro Frontend Developer & Solutions
 * Architect across interface engineering, CI/CD pipelines, networking, and infrastructure.
 *
 * @param props - Configuration properties for the HeroSection.
 * @returns A React Server Component rendering the Hero Section.
 */
export function HeroSection({
  locale = "en",
  availabilityText,
  availabilityStatus = "available",
  title,
  description,
  primaryCtaText,
  primaryCtaHref = ROUTES.contact,
  secondaryCtaText,
  secondaryCtaHref = ROUTES.projects.root,
  labCtaText,
  labCtaHref = ROUTES.lab.root,
  className = "",
}: HeroSectionProps): React.JSX.Element {
  const isPersian = locale === "fa";
  const content = isPersian ? DEFAULT_CONTENT.fa : DEFAULT_CONTENT.en;

  const resolvedAvailability = availabilityText ?? content.availabilityText;
  const resolvedTitle = title ?? content.title;
  const resolvedDescription = description ?? content.description;
  const resolvedPrimaryCta = primaryCtaText ?? content.primaryCtaText;
  const resolvedSecondaryCta = secondaryCtaText ?? content.secondaryCtaText;
  const resolvedLabCta = labCtaText ?? content.labCtaText;

  // Status indicator colors
  const statusColorMap = {
    available: "bg-emerald-500 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
    busy: "bg-amber-500 text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/5",
    offline: "bg-zinc-500 text-zinc-600 dark:text-zinc-400 border-zinc-500/30 bg-zinc-500/5",
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 lg:py-32 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      {/* Background Subtle Topology Grid Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      >
        <svg
          className="h-full w-full stroke-border"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 48 0 L 0 0 0 48" fill="none" strokeWidth="0.75" />
              <circle cx="48" cy="48" r="1" className="fill-border" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Start Column: Narrative & Action Triggers (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            {/* Availability Status Pill */}
            <div
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium tracking-wider mb-6 select-none",
                statusColorMap[availabilityStatus],
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full animate-pulse",
                  availabilityStatus === "available"
                    ? "bg-emerald-500"
                    : availabilityStatus === "busy"
                      ? "bg-amber-500"
                      : "bg-zinc-400",
                )}
                aria-hidden="true"
              />
              <span>{resolvedAvailability}</span>
            </div>

            {/* Main Editorial Headline */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] max-w-2xl"
            >
              {resolvedTitle}
            </h1>

            {/* Narrative Value Proposition */}
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              {resolvedDescription}
            </p>

            {/* Dual CTA Triggers */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href={primaryCtaHref}
                locale={locale}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-xs transition-all hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[44px] min-w-[140px]"
              >
                <span>{resolvedPrimaryCta}</span>
                <span aria-hidden="true" className="ms-1 rtl:rotate-180">
                  →
                </span>
              </Link>

              <Link
                href={secondaryCtaHref}
                locale={locale}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground font-medium text-sm transition-all hover:bg-muted hover:border-border/80 focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
              >
                <span>{resolvedSecondaryCta}</span>
              </Link>

              <Link
                href={labCtaHref}
                locale={locale}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground font-medium transition-colors min-h-[44px]"
              >
                <span className="size-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                <span>{resolvedLabCta}</span>
              </Link>
            </div>
          </div>

          {/* End Column: Interactive Telemetry HUD Card (5 Cols) */}
          <div className="lg:col-span-5 w-full">
            <div
              className="relative rounded-xl border border-border bg-card p-6 shadow-sm dark:shadow-[0_0_24px_-4px_rgba(6,182,212,0.15)] transition-all"
              tabIndex={0}
              aria-label="Systems telemetry card"
            >
              {/* Telemetry Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground">
                    {content.telemetryTitle}
                  </span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                  LIVE
                </span>
              </div>

              {/* Telemetry Metrics Grid (Always strictly LTR for code & values) */}
              <div
                dir="ltr"
                className="grid grid-cols-2 gap-4 font-mono text-xs text-start"
              >
                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <p className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">
                    {content.latencyLabel}
                  </p>
                  <p className="text-base font-bold text-cyan-600 dark:text-cyan-400">
                    {content.latencyValue}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <p className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">
                    {content.pipelineLabel}
                  </p>
                  <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                    {content.pipelineValue}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <p className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">
                    {content.dohLabel}
                  </p>
                  <p className="text-xs font-semibold text-foreground truncate">
                    {content.dohValue}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <p className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">
                    {content.infraLabel}
                  </p>
                  <p className="text-xs font-semibold text-foreground truncate">
                    {content.infraValue}
                  </p>
                </div>
              </div>

              {/* Telemetry Status Bar */}
              <div
                dir="ltr"
                className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground"
              >
                <span>LOCALE: {locale.toUpperCase()}</span>
                <span>STATUS: OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

