"use client";

import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { DohQueryController } from "../DohQueryController/DohQueryController";
import { DohDiagnosticConsole } from "../DohDiagnosticConsole/DohDiagnosticConsole";
import { executeDohQuery, DOH_RESOLVERS } from "../doh-utils";
import type { DohProberClientProps } from "./DohProberClient.types";
import type {
  DohResolverId,
  DohRecordType,
  DohQueryResult,
} from "../doh-types";
import type { QueryMode } from "../DohQueryController/DohQueryController.types";

/**
 * Interactive DoH Prober Client Section (`DohProberClient`).
 *
 * Coordinates live client-side browser DNS queries, executes multi-resolver
 * latency benchmarks, analyzes results for poisoning/bogon injection, and
 * updates the diagnostic console.
 */
export function DohProberClient({
  locale = "en",
  initialDomain = "google.com",
  initialRecordType = "A",
  initialResolver = "cloudflare",
  initialMode = "single",
  className = "",
  ...rest
}: DohProberClientProps): React.JSX.Element {
  const [mode, setMode] = useState<QueryMode>(initialMode);
  const [selectedResolver, setSelectedResolver] =
    useState<DohResolverId>(initialResolver);
  const [customUrl, setCustomUrl] = useState<string>("");
  const [domain, setDomain] = useState<string>(initialDomain);
  const [recordType, setRecordType] = useState<DohRecordType>(initialRecordType);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [results, setResults] = useState<DohQueryResult[]>([]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleExecute = useCallback(async () => {
    if (!domain.trim()) return;

    // Abort previous in-flight query
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsExecuting(true);

    try {
      if (mode === "single") {
        const res = await executeDohQuery(
          selectedResolver,
          customUrl,
          domain,
          recordType,
          controller.signal,
        );
        setResults([res]);
      } else {
        // Parallel benchmark: Cloudflare, Google, and Quad9
        const standardResolvers: DohResolverId[] = [
          "cloudflare",
          "google",
          "quad9",
        ];
        if (selectedResolver === "custom" && customUrl.trim()) {
          standardResolvers.push("custom");
        }

        const parallelPromises = standardResolvers.map((resId) =>
          executeDohQuery(
            resId,
            customUrl,
            domain,
            recordType,
            controller.signal,
          ),
        );

        const parallelResults = await Promise.all(parallelPromises);
        // Sort by latency ascending
        parallelResults.sort((a, b) => a.latencyMs - b.latencyMs);
        setResults(parallelResults);
      }
    } finally {
      setIsExecuting(false);
    }
  }, [domain, mode, selectedResolver, customUrl, recordType]);

  return (
    <section
      aria-label="DNS over HTTPS Diagnostic Workbench"
      className={cn("py-10 sm:py-16 bg-background text-foreground", className)}
      {...rest}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        {/* 1. Query Controller */}
        <DohQueryController
          locale={locale}
          mode={mode}
          onModeChange={setMode}
          selectedResolver={selectedResolver}
          onResolverChange={setSelectedResolver}
          customUrl={customUrl}
          onCustomUrlChange={setCustomUrl}
          domain={domain}
          onDomainChange={setDomain}
          recordType={recordType}
          onRecordTypeChange={setRecordType}
          isExecuting={isExecuting}
          onExecute={handleExecute}
        />

        {/* 2. Diagnostic Console Output & Wire Terminal */}
        <DohDiagnosticConsole
          locale={locale}
          results={results}
          isExecuting={isExecuting}
        />
      </div>
    </section>
  );
}

export default DohProberClient;
