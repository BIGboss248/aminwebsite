"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Globe,
  Play,
  RotateCw,
  Server,
  Layers,
  Settings2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DOH_RESOLVERS,
  RECORD_TYPES,
  QUICK_DOMAINS,
} from "../doh-utils";
import type { DohQueryControllerProps } from "./DohQueryController.types";
import type { DohResolverId, DohRecordType } from "../doh-types";

/**
 * Interactive Query Controller Panel for DoH Prober (`DohQueryController`).
 */
export function DohQueryController({
  locale = "en",
  mode,
  onModeChange,
  selectedResolver,
  onResolverChange,
  customUrl,
  onCustomUrlChange,
  domain,
  onDomainChange,
  recordType,
  onRecordTypeChange,
  isExecuting,
  onExecute,
  className = "",
  ...rest
}: DohQueryControllerProps): React.JSX.Element {
  const t = useTranslations("lab.doh_prober.controller");

  const isRtl = locale === "fa";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isExecuting && domain.trim()) {
      e.preventDefault();
      onExecute();
    }
  };

  const resolverOptions: DohResolverId[] = [
    "cloudflare",
    "google",
    "quad9",
    "custom",
  ];

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-xs transition-all",
        className,
      )}
      {...rest}
    >
      {/* Top Controller Bar: Mode Selection Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5 mb-6">
        <div className="flex items-center gap-2">
          <Settings2 className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-base font-bold text-foreground">
            Query Configuration
          </h2>
        </div>

        {/* Mode Toggle: Single Resolver vs Benchmark All */}
        <div
          role="radiogroup"
          aria-label="Query Execution Mode"
          className="flex items-center p-1 rounded-xl border border-border bg-muted/60"
        >
          <button
            type="button"
            role="radio"
            aria-checked={mode === "single"}
            onClick={() => onModeChange("single")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer",
              mode === "single"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t("mode_single")}
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={mode === "parallel"}
            onClick={() => onModeChange("parallel")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer",
              mode === "parallel"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t("mode_parallel")}
          </button>
        </div>
      </div>

      {/* Upstream Resolver Selector (when in single mode) */}
      {mode === "single" && (
        <div className="mb-6">
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
            <span className="flex items-center gap-1.5">
              <Server className="size-3.5 text-primary" aria-hidden="true" />
              {t("resolver_label")}
            </span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {resolverOptions.map((resId) => {
              const res = DOH_RESOLVERS[resId];
              const isSelected = selectedResolver === resId;
              return (
                <button
                  key={resId}
                  type="button"
                  onClick={() => onResolverChange(resId)}
                  className={cn(
                    "flex flex-col items-start p-3 rounded-xl border text-start transition-all cursor-pointer",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary shadow-xs"
                      : "border-border/80 bg-muted/30 text-foreground hover:border-primary/40 hover:bg-muted/60",
                  )}
                >
                  <span className="text-xs font-bold font-mono">
                    {res.name.split(" ")[0]}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5 truncate w-full">
                    {res.provider}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom URL input */}
          {selectedResolver === "custom" && (
            <div className="mt-3">
              <input
                type="url"
                value={customUrl}
                onChange={(e) => onCustomUrlChange(e.target.value)}
                placeholder={t("custom_resolver_placeholder")}
                className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-border bg-muted/40 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                dir="ltr"
              />
            </div>
          )}
        </div>
      )}

      {/* Domain Input & Quick Presets */}
      <div className="mb-6">
        <label
          htmlFor="doh-domain-input"
          className="block text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-2"
        >
          <span className="flex items-center gap-1.5">
            <Globe className="size-3.5 text-primary" aria-hidden="true" />
            {t("domain_label")}
          </span>
        </label>

        <div className="relative">
          <input
            id="doh-domain-input"
            type="text"
            value={domain}
            onChange={(e) => onDomainChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("domain_placeholder")}
            aria-label={t("input_aria")}
            className="w-full px-4 py-2.5 text-sm sm:text-base font-mono rounded-xl border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground/60 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            dir="ltr"
          />
        </div>

        {/* Quick Domain Presets */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
          <span className="text-xs text-muted-foreground me-1">
            {t("quick_domains_label")}
          </span>
          {QUICK_DOMAINS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDomainChange(d)}
              className={cn(
                "px-2 py-0.5 rounded-md text-xs font-mono transition-colors cursor-pointer",
                domain.toLowerCase() === d
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border/60",
              )}
              dir="ltr"
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Record Type Selector Chips & Execute Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4 border-t border-border/60">
        <div>
          <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            <span className="flex items-center gap-1.5">
              <Layers className="size-3.5 text-primary" aria-hidden="true" />
              {t("record_type_label")}
            </span>
          </label>

          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Record Type Selection">
            {RECORD_TYPES.map((type: DohRecordType) => {
              const isSelected = recordType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onRecordTypeChange(type)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted text-foreground/80 hover:bg-muted/80 border border-border/80",
                  )}
                  dir="ltr"
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Execute Button with Loading Spinner */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onExecute}
            disabled={isExecuting || !domain.trim()}
            className={cn(
              "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-xs transition-all duration-200 cursor-pointer",
              "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isExecuting || !domain.trim()
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md",
            )}
          >
            {isExecuting ? (
              <>
                <RotateCw className="size-4 animate-spin" aria-hidden="true" />
                <span>{t("executing")}</span>
              </>
            ) : (
              <>
                <Play
                  className={cn("size-4 fill-current", isRtl && "rotate-180")}
                  aria-hidden="true"
                />
                <span>
                  {mode === "parallel"
                    ? t("execute_parallel")
                    : t("execute_single")}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DohQueryController;
