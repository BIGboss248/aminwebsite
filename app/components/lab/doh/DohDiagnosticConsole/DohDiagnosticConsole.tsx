"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Activity,
  Terminal as TerminalIcon,
  Copy,
  Check,
  Zap,
  Layers,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CensorshipIndicatorBadge } from "./CensorshipIndicatorBadge";
import type { DohDiagnosticConsoleProps } from "./DohDiagnosticConsole.types";

/**
 * Diagnostic Console & Output View (`DohDiagnosticConsole`).
 */
export function DohDiagnosticConsole({
  locale = "en",
  results,
  isExecuting,
  className = "",
  ...rest
}: DohDiagnosticConsoleProps): React.JSX.Element {
  const t = useTranslations("lab.doh_prober.console");
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(0);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const isRtl = locale === "fa";

  if (results.length === 0 && !isExecuting) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-dashed border-border p-8 sm:p-12 text-center bg-card/40 backdrop-blur-xs",
          className,
        )}
        {...rest}
      >
        <div className="size-12 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mx-auto mb-4">
          <TerminalIcon className="size-6" aria-hidden="true" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-foreground">
          {t("empty_state_title")}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          {t("empty_state_desc")}
        </p>
      </div>
    );
  }

  const activeResult = results[selectedResultIndex] ?? results[0];

  const maxLatency = Math.max(...results.map((r) => r.latencyMs), 100);

  const handleCopyJson = async () => {
    if (!activeResult?.rawJson) return;
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(activeResult.rawJson, null, 2),
      );
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className={cn("space-y-6", className)} {...rest}>
      {/* 1. Multi-Resolver Latency Benchmark Graph */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <Activity className="size-4 text-primary" aria-hidden="true" />
            <h3 className="text-sm font-bold text-foreground">
              {t("latency_title")}
            </h3>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {results.length} Responders
          </span>
        </div>

        <div className="space-y-4">
          {results.map((res, idx) => {
            const isSelected = selectedResultIndex === idx;
            const percentage = Math.max(
              12,
              Math.min(100, Math.round((res.latencyMs / maxLatency) * 100)),
            );

            let barColor = "bg-primary";
            if (res.status === "poisoned") barColor = "bg-status-error";
            else if (res.status === "blocked") barColor = "bg-status-warning";
            else if (res.status === "timeout") barColor = "bg-muted-foreground";

            return (
              <button
                key={`${res.resolverId}-${idx}`}
                type="button"
                onClick={() => setSelectedResultIndex(idx)}
                className={cn(
                  "w-full text-start p-3 rounded-xl border transition-all cursor-pointer",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary/30"
                    : "border-border/60 bg-muted/20 hover:border-primary/40 hover:bg-muted/40",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-foreground">
                      {res.resolverName}
                    </span>
                    <CensorshipIndicatorBadge status={res.status} />
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-primary">
                    <Zap className="size-3.5 shrink-0" aria-hidden="true" />
                    <span>{res.latencyMs} ms</span>
                  </div>
                </div>

                {/* Latency Progress Bar */}
                <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      barColor,
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Parsed Answer Records Table */}
      {activeResult && (
        <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-primary" aria-hidden="true" />
              <h3 className="text-sm font-bold text-foreground">
                {t("records_table_title")} ({activeResult.resolverName})
              </h3>
            </div>
            <span className="text-xs font-mono text-muted-foreground" dir="ltr">
              {activeResult.domain} // {activeResult.recordType}
            </span>
          </div>

          {activeResult.answers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs font-mono" dir="ltr">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground">
                    <th className="pb-2.5 text-start font-semibold">{t("col_name")}</th>
                    <th className="pb-2.5 text-start font-semibold">{t("col_type")}</th>
                    <th className="pb-2.5 text-start font-semibold">{t("col_ttl")}</th>
                    <th className="pb-2.5 text-start font-semibold">{t("col_data")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 text-foreground">
                  {activeResult.answers.map((ans, aIdx) => (
                    <tr key={aIdx} className="hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 pe-3 font-semibold text-primary">{ans.name}</td>
                      <td className="py-2.5 pe-3">{String(ans.type)}</td>
                      <td className="py-2.5 pe-3 text-muted-foreground">{ans.TTL}s</td>
                      <td className="py-2.5 break-all font-bold">{ans.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-xs font-mono text-muted-foreground rounded-lg bg-muted/20 border border-border/60">
              {activeResult.errorMessage ?? "No DNS answer records returned (NODATA or NXDOMAIN)."}
            </div>
          )}
        </div>
      )}

      {/* 3. Dark Raw Terminal Output */}
      {Boolean(activeResult?.rawJson) && (
        <div className="rounded-2xl border border-border/80 bg-neutral-950 text-neutral-100 p-5 sm:p-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3.5 mb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
              <TerminalIcon className="size-4 text-cyan-400" aria-hidden="true" />
              <span>{t("terminal_title")}</span>
            </div>

            {/* Copy JSON Action */}
            <button
              type="button"
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 transition-colors cursor-pointer"
            >
              {hasCopied ? (
                <>
                  <Check className="size-3.5 text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-400">{t("copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5 text-cyan-400" aria-hidden="true" />
                  <span>{t("copy_json")}</span>
                </>
              )}
            </button>
          </div>

          <pre
            className="text-xs font-mono overflow-x-auto p-3 rounded-lg bg-neutral-900/80 border border-neutral-800/80 text-cyan-300 leading-relaxed max-h-96"
            dir="ltr"
          >
            {JSON.stringify(activeResult.rawJson, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default DohDiagnosticConsole;
