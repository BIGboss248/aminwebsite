"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/components/Link";
import { ROUTES } from "@/lib/routes";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Localized Route Error Boundary
 *
 * Catches unhandled runtime exceptions within the localized route segment,
 * logs diagnostic telemetry, and presents a resilient, accessible recovery UI
 * without leaking sensitive stack traces.
 */
export default function ErrorBoundary({
  error,
  reset,
}: ErrorPageProps): React.JSX.Element {
  const t = useTranslations("error");

  useEffect(() => {
    // Log telemetry / error report
    console.error("[ErrorBoundary caught route exception]:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-96 px-4 py-16 text-center">
      <div className="max-w-md w-full p-8 rounded-2xl border border-border bg-card/80 shadow-lg backdrop-blur-sm">
        {/* Status Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/10 text-destructive border border-destructive/20">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        {/* Title & Description */}
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl mb-2">
          {t("title")}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {t("description")}
        </p>

        {/* Digest Info */}
        {error.digest && (
          <div className="mb-6 p-2.5 rounded-lg bg-muted/60 border border-border/60 text-xs font-mono text-muted-foreground flex items-center justify-center gap-2">
            <span className="font-semibold text-foreground/80">
              {t("digest_label")}:
            </span>
            <span>{error.digest}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {t("retry")}
          </button>
          <Link
            href={ROUTES.home}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm border border-border bg-background text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {t("home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
