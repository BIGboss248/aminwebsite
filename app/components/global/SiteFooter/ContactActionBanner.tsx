"use client";

import React, { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Check, Mail, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export interface ContactActionBannerProps {
  /**
   * Optional custom CSS class names to merge onto the container.
   * @defaultValue `""`
   */
  className?: string;

  /**
   * Target email address for direct inquiries.
   * @defaultValue `SITE_CONFIG.contact.email`
   */
  email?: string;
}

/**
 * ContactActionBanner renders the high-impact consultation callout card at the top of the global footer.
 */
export function ContactActionBanner({
  className,
  email = SITE_CONFIG.contact.email,
}: ContactActionBannerProps): React.JSX.Element {
  const t = useTranslations("footer");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(email);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch {
        // Fallback gracefully
        setIsCopied(false);
      }
    }
  }, [email]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-sm transition-all duration-300",
        className,
      )}
    >
      {/* Ambient background decoration */}
      <div
        className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left / Top Narrative Zone */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-wider text-primary uppercase">
              {t("eyebrow")}
            </span>
            <div className="flex items-center gap-1.5 rounded-full border border-status-success/20 bg-status-success/10 px-2.5 py-0.5 text-xs font-medium text-status-success">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
              </span>
              <span>{t("status_available")}</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {t("headline")}
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Right / Action Triggers Zone */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {/* Primary Mailto Action */}
          <a
            href={`mailto:${email}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>{t("email_cta")}</span>
            <ArrowUpRight
              className="h-4 w-4 rtl:rotate-180"
              aria-hidden="true"
            />
          </a>

          {/* Direct Copy Email Action */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={t("copy_email")}
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background/80 px-4 py-2.5 font-mono text-xs font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {isCopied ? (
              <>
                <Check
                  className="h-4 w-4 text-status-success"
                  aria-hidden="true"
                />
                <span
                  className="text-status-success font-semibold"
                  aria-live="polite"
                >
                  {t("email_copied")}
                </span>
              </>
            ) : (
              <>
                <Copy
                  className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors"
                  aria-hidden="true"
                />
                <span dir="ltr" className="select-all">
                  {email}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
