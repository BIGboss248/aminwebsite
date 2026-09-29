"use client";

import React, { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps): React.JSX.Element {
  useEffect(() => {
    console.error("[Global Critical Error]:", error);
  }, [error]);

  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col items-center justify-center bg-background text-foreground font-sans p-6 text-center antialiased">
        <div className="max-w-md w-full p-8 rounded-2xl border border-border bg-card shadow-lg">
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
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
            System Critical Error
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            An unexpected application error occurred at the root level.
          </p>

          {error.digest && (
            <div className="mb-6 p-2.5 rounded-lg bg-muted border border-border text-xs font-mono text-muted-foreground flex items-center justify-center gap-2">
              <span className="font-semibold text-foreground">INCIDENT_DIGEST:</span>
              <span>{error.digest}</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
