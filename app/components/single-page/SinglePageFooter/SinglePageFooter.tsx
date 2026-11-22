"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUp, Check, Copy, ExternalLink, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { SinglePageFooterProps } from "./SinglePageFooter.types";

/**
 * SinglePageFooter is the specialized footer anchoring the single-page website layout.
 *
 * Features:
 * - **Smooth Anchor Navigation**: High-precision scrolling directly to `#hero`, `#projects`, `#certifications`, and `#contact`.
 * - **One-Click Back to Top**: Hardware-accelerated smooth scrolling to top of page.
 * - **Authentic Channels & Deliverables**: Direct links to verified GitHub, LinkedIn, ORCID profile, and Email.
 * - **Interactive Email Copy**: Instant clipboard copying with accessible live feedback.
 * - **Full RTL / LTR Parity**: Dynamic bidirectional layout adjustment and native Persian typography.
 *
 * @param props - Configuration properties for the single-page footer.
 * @returns A client-rendered accessible footer landmark.
 */
export function SinglePageFooter({
  className,
  brandName = SITE_CONFIG.author.name,
  currentYear = new Date().getFullYear(),
  contactEmail = SITE_CONFIG.contact.email,
  githubUrl = SITE_CONFIG.social.github,
  linkedinUrl = SITE_CONFIG.social.linkedin,
  orcidUrl = SITE_CONFIG.social.orcid,
  locale,
  ...props
}: SinglePageFooterProps): React.JSX.Element {
  const contextLocale = useLocale() as "en" | "fa";
  const effectiveLocale = locale ?? contextLocale;
  const isRtl = effectiveLocale === "fa";

  const t = useTranslations("single_page.footer");

  const [emailCopied, setEmailCopied] = useState(false);

  // Smooth scroll handler for anchor navigation
  const handleScrollToSection = useCallback((sectionId: string) => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      try {
        window.history.pushState(null, "", `#${sectionId}`);
      } catch {
        // Fallback if pushState is restricted
      }
    }
  }, []);

  // Back to top smooth scroll
  const handleBackToTop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      window.history.pushState(null, "", " ");
    } catch {
      // Fallback
    }
  }, []);

  // Copy email to clipboard
  const handleCopyEmail = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(contactEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Fallback clipboard failure
    }
  }, [contactEmail]);

  const navLinks = [
    { id: "hero", label: t("nav_hero"), href: "#hero" },
    { id: "projects", label: t("nav_projects"), href: "#projects" },
    { id: "certifications", label: t("nav_certifications"), href: "#certifications" },
    { id: "contact", label: t("nav_contact"), href: "#contact" },
  ];

  return (
    <footer
      role="contentinfo"
      aria-label="Single Page Footer"
      className={cn(
        "w-full border-t border-border/80 bg-background/95 backdrop-blur-sm pt-14 pb-10 transition-colors",
        className,
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Tier: 3-Column Cockpit Footer Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Column 1: Identity & Bio */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              {/* Brand Logo Emblem */}
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card shadow-xs overflow-hidden">
                <Image
                  src="/logo.png"
                  alt=""
                  width={32}
                  height={32}
                  className="size-full object-contain p-0.5"
                />
              </div>

              {/* Brand Title */}
              <div className="font-mono text-xs font-bold tracking-wider text-foreground">
                <span>{brandName.toUpperCase()}</span>
              </div>
            </div>

            <p className="text-xs font-medium text-foreground/90">
              {t("brand_role")}
            </p>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              {t("brand_tagline")}
            </p>
          </div>

          {/* Column 2: Quick Section Jump Matrix */}
          <nav
            aria-label="Section Navigation"
            className="md:col-span-3 space-y-3"
          >
            <ul className="space-y-2 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollToSection(link.id);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-primary transition-all duration-150 hover:translate-x-1 rtl:hover:-translate-x-1 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] text-primary"
                    >
                      {">"}
                    </span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Authentic Social Channels & Back to Top */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {t("social_heading")}
            </h3>

            {/* Channels Button Row */}
            <div className="flex flex-wrap gap-2 items-center">
              {/* GitHub */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("social_github")} (opens in new tab)`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-foreground/90 hover:text-primary hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span>{t("social_github")}</span>
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("social_linkedin")} (opens in new tab)`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-foreground/90 hover:text-primary hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <svg
                  className="h-3.5 w-3.5 text-sky-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>{t("social_linkedin")}</span>
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
              </a>

              {/* ORCID */}
              <a
                href={orcidUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("social_orcid")} (opens in new tab)`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-foreground/90 hover:text-primary hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="font-bold text-emerald-500 text-xs">iD</span>
                <span>{t("social_orcid")}</span>
                <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
              </a>

              {/* Direct Mail */}
              <a
                href={`mailto:${contactEmail}`}
                aria-label={t("social_email")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-foreground/90 hover:text-primary hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t("social_email")}</span>
              </a>
            </div>

            {/* Interactive Copy Email & Back to Top Action Controls */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyEmail}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  emailCopied
                    ? "border-status-success bg-status-success/15 text-status-success font-semibold"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary",
                )}
                aria-label={t("copy_email")}
              >
                {emailCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-status-success" aria-hidden="true" />
                    <span aria-live="polite">{t("email_copied")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t("copy_email")}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBackToTop}
                aria-label={t("back_to_top_aria")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ArrowUp className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span>{t("back_to_top")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Sub-footer */}
        <div className="border-t border-border/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>{t("copyright", { year: currentYear })}</p>
          <p className="text-muted-foreground/80 text-center sm:text-end">
            {t("built_with")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SinglePageFooter;
