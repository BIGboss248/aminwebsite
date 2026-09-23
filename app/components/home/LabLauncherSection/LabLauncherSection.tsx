import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import { Link } from "@/app/components/Link";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ToolQuickCard } from "./ToolQuickCard";
import type {
  LabLauncherSectionProps,
  ToolItem,
} from "./LabLauncherSection.types";

/**
 * Interactive Lab Tools Launcher Section (`LabLauncherSection`).
 *
 * Displays a 3-column diagnostic observatory matrix on the home page highlighting
 * client-executed systems tools: DNS over HTTPS Prober, IP & Identity Leak Scanner,
 * and Client Device Fingerprint Inspector with zero backend logging.
 *
 * @param props - Configuration properties for LabLauncherSection.
 * @returns A React Component rendering the Interactive Lab Section.
 */
export function LabLauncherSection({
  locale = "en",
  eyebrow,
  title,
  description,
  zeroLoggingBadge,
  exploreHubHref = ROUTES.lab.root,
  tools,
  className = "",
  ...rest
}: LabLauncherSectionProps): React.JSX.Element {
  const t = useTranslations("home.lab_launcher");
  const tLab = (key: string) => t(key as never);

  const resolvedEyebrow = eyebrow ?? tLab("eyebrow");
  const resolvedTitle = title ?? tLab("title");
  const resolvedDescription = description ?? tLab("description");
  const resolvedZeroLogging = zeroLoggingBadge ?? tLab("zero_logging_badge");
  const resolvedExploreHub = tLab("explore_hub");
  const isRtl = locale === "fa";

  // Build default 3 diagnostic tools from translation dictionary
  const defaultTools: ToolItem[] = [
    {
      id: "doh",
      headerTag: tLab("doh_header"),
      privacyMode: tLab("doh_mode"),
      title: tLab("doh_title"),
      pitch: tLab("doh_pitch"),
      chips: [
        tLab("doh_chip1"),
        tLab("doh_chip2"),
        tLab("doh_chip3"),
        tLab("doh_chip4"),
      ],
      href: ROUTES.lab.doh,
      ctaLabel: tLab("doh_cta"),
      glyphType: "doh",
    },
    {
      id: "ipinfo",
      headerTag: tLab("ipinfo_header"),
      privacyMode: tLab("ipinfo_mode"),
      title: tLab("ipinfo_title"),
      pitch: tLab("ipinfo_pitch"),
      chips: [
        tLab("ipinfo_chip1"),
        tLab("ipinfo_chip2"),
        tLab("ipinfo_chip3"),
        tLab("ipinfo_chip4"),
      ],
      href: ROUTES.lab.ipInfo,
      ctaLabel: tLab("ipinfo_cta"),
      glyphType: "ipinfo",
    },
    {
      id: "fingerprint",
      headerTag: tLab("fingerprint_header"),
      privacyMode: tLab("fingerprint_mode"),
      title: tLab("fingerprint_title"),
      pitch: tLab("fingerprint_pitch"),
      chips: [
        tLab("fingerprint_chip1"),
        tLab("fingerprint_chip2"),
        tLab("fingerprint_chip3"),
        tLab("fingerprint_chip4"),
      ],
      href: ROUTES.lab.fingerprint,
      ctaLabel: tLab("fingerprint_cta"),
      glyphType: "fingerprint",
    },
  ];

  const resolvedTools = tools ?? defaultTools;

  return (
    <section
      aria-labelledby="lab-launcher-heading"
      className={cn(
        "relative overflow-hidden py-16 sm:py-24 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
      {...rest}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="p-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                <Terminal className="size-3.5" aria-hidden="true" />
              </span>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
                {resolvedEyebrow}
              </p>
            </div>
            <h2
              id="lab-launcher-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground"
            >
              {resolvedTitle}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {resolvedDescription}
            </p>
          </div>

          {/* Header Action & Security Pill */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-end lg:items-center gap-3 shrink-0">
            {/* Zero Logging Pill */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-status-success/10 text-status-success border border-status-success/20"
              role="status"
              aria-label={tLab("zero_logging_aria")}
            >
              <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{resolvedZeroLogging}</span>
            </div>

            {/* Desktop "Explore Full Lab Hub" Link */}
            <div className="hidden md:flex shrink-0">
              <Link
                href={exploreHubHref}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-border bg-card hover:bg-muted hover:border-primary/40 text-foreground transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>{resolvedExploreHub}</span>
                <ArrowRight
                  className={cn(
                    "size-4 text-primary transition-transform",
                    isRtl && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* 3-Column Responsive Diagnostic Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {resolvedTools.map((tool) => (
            <ToolQuickCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>

        {/* Mobile "Explore Full Lab Hub" Full-Width Link */}
        <div className="mt-8 flex md:hidden">
          <Link
            href={exploreHubHref}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border border-border bg-card hover:bg-muted text-foreground transition-all"
          >
            <span>{resolvedExploreHub}</span>
            <ArrowRight
              className={cn("size-4 text-primary", isRtl && "rotate-180")}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LabLauncherSection;
