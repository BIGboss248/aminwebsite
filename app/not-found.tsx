import React from "react";
import Link from "next/link";
import "@/app/globals.css";

export default function RootNotFound(): React.JSX.Element {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col items-center justify-center bg-background text-foreground font-sans p-6 text-center antialiased">
        <div className="max-w-md w-full p-8 rounded-2xl border border-border bg-card shadow-lg text-card-foreground">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <span className="font-mono text-xl font-extrabold tracking-wider">404</span>
          </div>

          <span className="font-mono text-xs font-semibold text-primary tracking-wider uppercase block mb-2">
            // UNRESOLVED ROUTE
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-3">
            Page Not Found
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            The page you are looking for does not exist or has been relocated.
          </p>

          <Link
            href="/en"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
          >
            Return to Homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
