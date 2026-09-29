"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp, Search, Award } from "lucide-react";
import { CertificationCard } from "./CertificationCard";
import { CompactCertificationCard } from "./CompactCertificationCard";
import { LinkedInProfileBanner } from "./LinkedInProfileBanner";
import { cn } from "@/lib/utils";
import type {
  SinglePageCertificationsSectionProps,
  CertificationItem,
  AdditionalCertificationItem,
} from "./SinglePageCertificationsSection.types";

/**
 * SinglePageCertificationsSection Component.
 *
 * Showcases the author's top 4 verified professional course certifications:
 * 1. Google IT Support Specialization
 * 2. IBM DevOps, Cloud, and Agile Foundations Specialization
 * 3. Google AI
 * 4. AWS Cloud Quest: Solutions Architect
 *
 * Along with an authoritative LinkedIn profile callout banner and an expandable
 * interactive accreditation drawer displaying all 53+ additional certificates with direct verification links.
 */
export function SinglePageCertificationsSection({
  locale = "en",
  className = "",
}: SinglePageCertificationsSectionProps): React.JSX.Element {
  const t = useTranslations("single_page.certifications");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Construct top 4 typed certification items from translation dictionary
  const topCertifications: CertificationItem[] = useMemo(() => {
    return [
      {
        id: "google_it_support",
        tag: t("items.google_it_support.tag"),
        badge: t("items.google_it_support.badge"),
        title: t("items.google_it_support.title"),
        issuer: t("items.google_it_support.issuer"),
        summary: t("items.google_it_support.summary"),
        credentialId: t("items.google_it_support.credential_id"),
        credentialUrl: t("items.google_it_support.credential_url"),
        skills: [
          t("items.google_it_support.skills.0"),
          t("items.google_it_support.skills.1"),
          t("items.google_it_support.skills.2"),
          t("items.google_it_support.skills.3"),
          t("items.google_it_support.skills.4"),
        ],
      },
      {
        id: "ibm_devops",
        tag: t("items.ibm_devops.tag"),
        badge: t("items.ibm_devops.badge"),
        title: t("items.ibm_devops.title"),
        issuer: t("items.ibm_devops.issuer"),
        summary: t("items.ibm_devops.summary"),
        credentialId: t("items.ibm_devops.credential_id"),
        credentialUrl: t("items.ibm_devops.credential_url"),
        skills: [
          t("items.ibm_devops.skills.0"),
          t("items.ibm_devops.skills.1"),
          t("items.ibm_devops.skills.2"),
          t("items.ibm_devops.skills.3"),
          t("items.ibm_devops.skills.4"),
        ],
      },
      {
        id: "google_ai",
        tag: t("items.google_ai.tag"),
        badge: t("items.google_ai.badge"),
        title: t("items.google_ai.title"),
        issuer: t("items.google_ai.issuer"),
        summary: t("items.google_ai.summary"),
        credentialId: t("items.google_ai.credential_id"),
        credentialUrl: t("items.google_ai.credential_url"),
        skills: [
          t("items.google_ai.skills.0"),
          t("items.google_ai.skills.1"),
          t("items.google_ai.skills.2"),
          t("items.google_ai.skills.3"),
          t("items.google_ai.skills.4"),
        ],
      },
      {
        id: "aws_solutions_architect",
        tag: t("items.aws_solutions_architect.tag"),
        badge: t("items.aws_solutions_architect.badge"),
        title: t("items.aws_solutions_architect.title"),
        issuer: t("items.aws_solutions_architect.issuer"),
        summary: t("items.aws_solutions_architect.summary"),
        credentialId: t("items.aws_solutions_architect.credential_id"),
        credentialUrl: t("items.aws_solutions_architect.credential_url"),
        skills: [
          t("items.aws_solutions_architect.skills.0"),
          t("items.aws_solutions_architect.skills.1"),
          t("items.aws_solutions_architect.skills.2"),
          t("items.aws_solutions_architect.skills.3"),
          t("items.aws_solutions_architect.skills.4"),
        ],
      },
    ];
  }, [t]);

  // Construct typed additional certifications list
  const additionalCertifications: AdditionalCertificationItem[] = useMemo(() => {
    try {
      const raw = t.raw("additional_items");
      if (Array.isArray(raw)) {
        return raw as AdditionalCertificationItem[];
      }
      return [];
    } catch {
      return [];
    }
  }, [t]);

  // Filter additional certifications based on search query
  const filteredAdditionalCerts = useMemo(() => {
    if (!searchQuery.trim()) return additionalCertifications;
    const q = searchQuery.toLowerCase();
    return additionalCertifications.filter(
      (cert) =>
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q),
    );
  }, [additionalCertifications, searchQuery]);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className={cn(
        "py-16 sm:py-24 border-b border-border/40 bg-background text-foreground transition-colors",
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 max-w-3xl">
          <span className="font-mono text-xs font-semibold text-primary tracking-wider uppercase block mb-2">
            {t("eyebrow")}
          </span>
          <h2
            id="certifications-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Top 4 Certifications 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {topCertifications.map((cert) => (
            <CertificationCard
              key={cert.id}
              certification={cert}
              locale={locale}
            />
          ))}
        </div>

        {/* Expand / Collapse Additional Certifications Control */}
        <div className="flex flex-col items-center justify-center mb-8 pt-2">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            aria-controls="additional-certifications-panel"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card hover:bg-muted text-xs sm:text-sm font-semibold text-foreground shadow-xs hover:border-primary/50 transition-all duration-200 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Award className="size-4 text-primary" aria-hidden="true" />
            <span>
              {isExpanded
                ? t("show_less_button")
                : t("show_all_button", { count: additionalCertifications.length })}
            </span>
            {isExpanded ? (
              <ChevronUp className="size-4 text-muted-foreground" aria-hidden="true" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Collapsible Panel for 53 Additional Certifications */}
        {isExpanded && (
          <div
            id="additional-certifications-panel"
            className="mb-10 p-6 sm:p-8 rounded-2xl border border-border bg-card/60 shadow-xs animate-in fade-in duration-300"
          >
            {/* Additional Panel Header & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/60">
              <div>
                <span className="font-mono text-xs font-semibold text-primary uppercase block mb-1">
                  {t("additional_eyebrow")}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  {t("additional_title")}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {t("additional_description")}
                </p>
              </div>

              {/* Filter Search Input */}
              <div className="relative w-full sm:w-72 shrink-0">
                <Search
                  className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("search_placeholder")}
                  className="w-full ps-9 pe-3 py-2 rounded-lg border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary transition-colors"
                />
              </div>
            </div>

            {/* Compact Certifications Grid */}
            {filteredAdditionalCerts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredAdditionalCerts.map((cert) => (
                  <CompactCertificationCard
                    key={cert.id}
                    certification={cert}
                    locale={locale}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground text-xs font-mono">
                {t("no_results")}
              </div>
            )}
          </div>
        )}

        {/* LinkedIn Profile Showcase Banner */}
        <LinkedInProfileBanner locale={locale} />
      </div>
    </section>
  );
}

export default SinglePageCertificationsSection;
