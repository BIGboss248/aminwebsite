"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { AcademicResearchSectionProps } from "./AcademicResearchSection.types";

/**
 * AcademicResearchSection Component.
 */
export function AcademicResearchSection({
  locale = "en",
  className = "",
}: AcademicResearchSectionProps): React.JSX.Element {
  const t = useTranslations("about.research");
  const [copied, setCopied] = useState(false);

  const bibtex = `@article{jamali2024deep,
  title={Deep Learning Approaches in Time-Series Forecasting & Financial Volatility},
  author={Jamali, Amin},
  journal={International Journal of Applied Computational Science},
  year={2024},
  doi={10.1000/ijacs.2024.0892}
}`;

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const certifications = [
    {
      title: t("cert1_title"),
      issuer: t("cert1_issuer"),
    },
    {
      title: t("cert2_title"),
      issuer: t("cert2_issuer"),
    },
    {
      title: t("cert3_title"),
      issuer: t("cert3_issuer"),
    },
  ];

  return (
    <section
      aria-labelledby="research-heading"
      className={cn(
        "py-16 sm:py-24 border-b border-border/40 bg-section-alternate text-section-alternate-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-start max-w-3xl mb-12 lg:mb-16 text-start">
          <p className="text-xs sm:text-sm font-mono text-primary font-semibold tracking-wider mb-2">
            {t("eyebrow")}
          </p>
          <h2
            id="research-heading"
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            {t("title")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-xl bg-card border border-border shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20 select-none">
                  {t("pub1_badge")}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {t("pub1_year")}
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
                {t("pub1_title")}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-primary mb-4">
                {t("pub1_venue")}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t("pub1_abstract")}
              </p>

              <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
                <div dir="ltr" className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-muted-foreground">DOI:</span>
                  <span className="text-primary font-semibold">
                    {t("pub1_doi")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCitation}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border bg-background hover:bg-muted text-xs font-mono text-foreground font-medium transition-colors"
                >
                  <span>
                    {copied ? t("citation_copied") : t("copy_citation")}
                  </span>
                </button>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-status-success animate-pulse" />
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {t("orcid_title")}
                  </h4>
                  <p dir="ltr" className="font-mono text-xs text-muted-foreground">
                    {t("orcid_status")}
                  </p>
                </div>
              </div>

              <a
                href={SITE_CONFIG.social.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:bg-primary/90 transition-colors"
              >
                <span>{t("orcid_cta")}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 rounded-xl bg-card border border-border shadow-xs">
            <h3 className="text-lg font-bold tracking-tight text-foreground mb-1">
              {t("certs_title")}
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              {t("certs_subtitle")}
            </p>

            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-border/70 bg-background/50 hover:bg-muted/30 transition-colors"
                >
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-mono text-primary">
                    {cert.issuer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AcademicResearchSection;
