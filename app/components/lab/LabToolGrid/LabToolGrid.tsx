"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { SlidersHorizontal, Terminal, Sparkles } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { LabToolCard } from "../LabToolCard/LabToolCard";
import type { LabToolGridProps, FilterOption } from "./LabToolGrid.types";
import type { LabToolItem } from "../LabToolCard/LabToolCard.types";

/**
 * Diagnostic Tools Catalog Section (`LabToolGrid`).
 *
 * Interactive catalog featuring category filters (All Tools, DNS Prober, Network/IP,
 * Hardware Entropy) and responsive grid of detailed diagnostic cards.
 */
export function LabToolGrid({
  locale = "en",
  eyebrow,
  title,
  description,
  tools,
  className = "",
  ...rest
}: LabToolGridProps): React.JSX.Element {
  const tCatalog = useTranslations("lab.tools_catalog");
  const tDoh = useTranslations("lab.tools.doh");
  const tIpInfo = useTranslations("lab.tools.ipinfo");
  const tFingerprint = useTranslations("lab.tools.fingerprint");

  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const resolvedEyebrow = eyebrow ?? tCatalog("eyebrow");
  const resolvedTitle = title ?? tCatalog("title");
  const resolvedDescription = description ?? tCatalog("description");

  // Build tools from translation dictionaries if not passed as prop
  const defaultTools: LabToolItem[] = useMemo(() => {
    return [
      {
        id: "doh",
        tag: tDoh("tag"),
        status: tDoh("status"),
        title: tDoh("title"),
        description: tDoh("description"),
        protocol: tDoh("protocol"),
        executionMode: tDoh("execution_mode"),
        latencyTarget: tDoh("latency_target"),
        features: [
          tDoh("features.0"),
          tDoh("features.1"),
          tDoh("features.2"),
          tDoh("features.3"),
        ],
        href: ROUTES.lab.doh,
        cta: tDoh("cta"),
        category: "dns",
        glyphType: "doh",
      },
      {
        id: "ipinfo",
        tag: tIpInfo("tag"),
        status: tIpInfo("status"),
        title: tIpInfo("title"),
        description: tIpInfo("description"),
        protocol: tIpInfo("protocol"),
        executionMode: tIpInfo("execution_mode"),
        latencyTarget: tIpInfo("latency_target"),
        features: [
          tIpInfo("features.0"),
          tIpInfo("features.1"),
          tIpInfo("features.2"),
          tIpInfo("features.3"),
        ],
        href: ROUTES.lab.ipInfo,
        cta: tIpInfo("cta"),
        category: "network",
        glyphType: "ipinfo",
      },
      {
        id: "fingerprint",
        tag: tFingerprint("tag"),
        status: tFingerprint("status"),
        title: tFingerprint("title"),
        description: tFingerprint("description"),
        protocol: tFingerprint("protocol"),
        executionMode: tFingerprint("execution_mode"),
        latencyTarget: tFingerprint("latency_target"),
        features: [
          tFingerprint("features.0"),
          tFingerprint("features.1"),
          tFingerprint("features.2"),
          tFingerprint("features.3"),
        ],
        href: ROUTES.lab.fingerprint,
        cta: tFingerprint("cta"),
        category: "entropy",
        glyphType: "fingerprint",
      },
    ];
  }, [tDoh, tIpInfo, tFingerprint]);

  const allTools = tools ?? defaultTools;

  // Filter tools based on active category tab
  const filteredTools = useMemo(() => {
    if (activeFilter === "all") return allTools;
    return allTools.filter((tool) => tool.category === activeFilter);
  }, [allTools, activeFilter]);

  const filterTabs: { id: FilterOption; label: string }[] = [
    { id: "all", label: tCatalog("filter_all") },
    { id: "dns", label: tCatalog("filter_dns") },
    { id: "network", label: tCatalog("filter_network") },
    { id: "entropy", label: tCatalog("filter_entropy") },
  ];

  return (
    <section
      aria-labelledby="lab-tools-heading"
      className={cn(
        "py-16 sm:py-24 bg-background text-foreground transition-colors",
        className,
      )}
      {...rest}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="p-1 rounded-md bg-primary/10 text-primary border border-primary/20">
              <Terminal className="size-3.5" aria-hidden="true" />
            </span>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              {resolvedEyebrow}
            </p>
          </div>
          <h2
            id="lab-tools-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground"
          >
            {resolvedTitle}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {resolvedDescription}
          </p>
        </div>

        {/* Filter Selection Tabs */}
        <div
          role="tablist"
          aria-label="Filter diagnostic tools by category"
          className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl border border-border bg-card/60 backdrop-blur-xs max-w-max mb-10 shadow-xs"
        >
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-muted-foreground border-e border-border/60 me-1">
            <SlidersHorizontal className="size-3.5 text-primary" aria-hidden="true" />
            <span>CATEGORIES</span>
          </div>

          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3-Column Responsive Tools Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          role="region"
          aria-label="Diagnostic tools list"
        >
          {filteredTools.map((tool) => (
            <LabToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>

        {/* Empty State Guard */}
        {filteredTools.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <Sparkles className="size-8 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium text-foreground">
              No diagnostic utilities found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default LabToolGrid;
