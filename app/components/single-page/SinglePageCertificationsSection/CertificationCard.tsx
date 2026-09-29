"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CertificationCardProps } from "./SinglePageCertificationsSection.types";

/**
 * CertificationCard Component.
 *
 * Renders an audited professional course certification card with title,
 * issuing institution, credential ID, skill competencies, and verification link.
 */
export function CertificationCard({
  certification,
  locale = "en",
  className = "",
}: CertificationCardProps): React.JSX.Element {
  const t = useTranslations("single_page.certifications");

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5 dark:hover:shadow-md dark:hover:shadow-primary/10",
        className,
      )}
    >
      <div>
        {/* Top Tag & Status Badge Row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <span className="font-mono text-[11px] font-semibold text-primary tracking-wider uppercase">
            {certification.tag}
          </span>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-[11px] font-mono font-medium tracking-wide select-none">
            <ShieldCheck className="size-3" aria-hidden="true" />
            <span>{certification.badge}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors duration-150">
          {certification.title}
        </h3>

        {/* Issuer */}
        <div className="flex items-center gap-1.5 mb-3 text-xs font-mono text-muted-foreground">
          <Award className="size-3.5 text-primary shrink-0" aria-hidden="true" />
          <span>{t("issued_by_label")}:</span>
          <span className="font-semibold text-foreground">{certification.issuer}</span>
        </div>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 text-start">
          {certification.summary}
        </p>

        {/* Competencies / Skills Chips */}
        {certification.skills && certification.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {certification.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground border border-border/50"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Credential ID & External Verification Link */}
      <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 mt-auto">
        {certification.credentialId ? (
          <div dir="ltr" className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <span className="text-[11px] text-muted-foreground/80">{t("credential_id_label")}</span>
            <span className="text-xs font-medium text-foreground bg-muted/40 px-1.5 py-0.5 rounded border border-border/40 select-all">
              {certification.credentialId}
            </span>
          </div>
        ) : (
          <div />
        )}

        {certification.credentialUrl && (
          <a
            href={certification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline hover:text-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded py-1 px-1.5 -me-1.5"
            aria-label={`${t("view_credential")}: ${certification.title}`}
          >
            <span>{t("view_credential")}</span>
            <ExternalLink className="size-3.5 rtl:rotate-180" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export default CertificationCard;
