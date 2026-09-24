"use client";

import React, { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  CodeXml,
  FileCode,
  Layers,
  Palette,
  Activity,
  Terminal,
  Boxes,
  Database,
  Cpu,
  Network,
  Box,
  GitBranch,
  HardDrive,
  Globe,
  Lock,
  Radio,
  FingerprintPattern,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SkillBadgeProps } from "./TechStackMatrix.types";

const ICON_MAP: Record<string, LucideIcon> = {
  nextjs: CodeXml,
  typescript: FileCode,
  react: Layers,
  tailwind: Palette,
  framer: Activity,
  go: Terminal,
  python: Boxes,
  postgres: Database,
  redis: Cpu,
  grpc: Network,
  nodejs: Box,
  docker: Box,
  kubernetes: Boxes,
  github_actions: GitBranch,
  linux: HardDrive,
  nginx: Network,
  doh: Globe,
  tls: Lock,
  stun: Radio,
  entropy: FingerprintPattern,
};

/**
 * Interactive SkillBadge Client Leaf Component.
 *
 * Renders a competency capsule with geometric icon, technology name, and experience tag.
 * On hover or focus, triggers an active telemetry neon glow and presents a micro-popover
 * detailing years in production and architectural use cases.
 *
 * @param props - Configuration properties for the SkillBadge.
 * @returns An accessible interactive badge element with inspection popover.
 */
export function SkillBadge({
  skill,
  accentColor,
  className,
}: SkillBadgeProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("home.tech_matrix");

  const Icon = ICON_MAP[skill.iconName] ?? CodeXml;
  const techName = t(skill.nameKey as never);
  const techTag = t(skill.tagKey as never);
  const techExp = t(skill.expKey as never);
  const techUsecase = t(skill.usecaseKey as never);
  const expLabel = t("popover_experience_label" as never);
  const usecaseLabel = t("popover_usecase_label" as never);

  const accentStyles = {
    cyan: {
      borderHover: "hover:border-cyan-500/60 focus-visible:border-cyan-500/80 dark:hover:border-cyan-400/60",
      glow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:hover:shadow-[0_0_24px_rgba(6,182,212,0.25)]",
      iconText: "text-cyan-600 dark:text-cyan-400",
      dot: "bg-cyan-500 dark:bg-cyan-400",
      pillBg: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20",
    },
    violet: {
      borderHover: "hover:border-violet-500/60 focus-visible:border-violet-500/80 dark:hover:border-violet-400/60",
      glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] dark:hover:shadow-[0_0_24px_rgba(139,92,246,0.25)]",
      iconText: "text-violet-600 dark:text-violet-400",
      dot: "bg-violet-500 dark:bg-violet-400",
      pillBg: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20",
    },
    emerald: {
      borderHover: "hover:border-emerald-500/60 focus-visible:border-emerald-500/80 dark:hover:border-emerald-400/60",
      glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] dark:hover:shadow-[0_0_24px_rgba(16,185,129,0.25)]",
      iconText: "text-emerald-600 dark:text-emerald-400",
      dot: "bg-emerald-500 dark:bg-emerald-400",
      pillBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    },
    amber: {
      borderHover: "hover:border-amber-500/60 focus-visible:border-amber-500/80 dark:hover:border-amber-400/60",
      glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]",
      iconText: "text-amber-600 dark:text-amber-400",
      dot: "bg-amber-500 dark:bg-amber-400",
      pillBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    },
  }[accentColor];

  return (
    <div
      ref={triggerRef}
      role="button"
      tabIndex={0}
      aria-label={`${techName} - ${techTag}`}
      aria-expanded={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        } else if (e.key === "Escape") {
          setIsOpen(false);
        }
      }}
      className={cn(
        "group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-border/70 bg-card/60 hover:bg-card text-foreground transition-all duration-200 cursor-pointer select-none",
        "min-h-[44px] sm:min-h-[40px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        accentStyles.borderHover,
        accentStyles.glow,
        className,
      )}
    >
      {/* Geometric Icon */}
      <div
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-md bg-muted/60 transition-transform duration-200 group-hover:scale-110",
          accentStyles.iconText,
        )}
      >
        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      </div>

      {/* Name & Tag */}
      <div className="flex flex-col items-start min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs sm:text-sm font-semibold tracking-tight truncate text-foreground group-hover:text-primary transition-colors">
            {techName}
          </span>
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity",
              accentStyles.dot,
            )}
            aria-hidden="true"
          />
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground/90 truncate tracking-wide">
          {techTag}
        </span>
      </div>

      {/* Floating Micro-Popover */}
      {isOpen && (
        <div
          role="tooltip"
          className={cn(
            "absolute bottom-full start-1/2 -translate-x-1/2 rtl:translate-x-1/2 mb-2 z-50 w-64 sm:w-72 p-3.5 rounded-xl border border-border bg-popover/95 text-popover-foreground shadow-2xl backdrop-blur-md transition-all animate-in fade-in-0 zoom-in-95",
          )}
        >
          {/* Header row with flex-wrap according to Rule 33 */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <Icon className={cn("w-3.5 h-3.5", accentStyles.iconText)} aria-hidden="true" />
              <span className="text-xs font-bold font-mono tracking-tight text-foreground">
                {techName}
              </span>
            </div>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border",
                accentStyles.pillBg,
              )}
            >
              {techExp}
            </span>
          </div>

          {/* Body */}
          <div className="space-y-1.5 text-start">
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              {usecaseLabel}
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed font-sans">
              {techUsecase}
            </p>
          </div>

          {/* Micro arrow indicator */}
          <div className="absolute top-full start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -mt-px w-2.5 h-2.5 border-b border-e border-border bg-popover rotate-45" />
        </div>
      )}
    </div>
  );
}
