"use client";

import React, { startTransition, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useProgress } from "react-transition-progress";
import { cn } from "@/lib/utils";
import { LocaleSwitcherSkeleton } from "./LocaleSwitcherSkeleton";

export { LocaleSwitcherSkeleton };
export type { LocaleSwitcherSkeletonProps } from "./LocaleSwitcherSkeleton";

/**
 * Props for configuring the LocaleSwitcher component.
 */
export interface LocaleSwitcherProps {
  /**
   * Active locale override ('en' | 'fa').
   * When omitted, the active locale is automatically derived via next-intl `useLocale()`.
   * @defaultValue `undefined`
   */
  currentLocale?: "en" | "fa";

  /**
   * Optional callback triggered when a new locale is activated.
   * Receives the target locale code ('en' | 'fa').
   * @defaultValue `undefined`
   */
  onLocaleChange?: (locale: "en" | "fa") => void;

  /**
   * Controls whether secondary native autonyms (e.g. 'فارسی') are displayed.
   * Set to `false` for ultra-dense micro-headers or mobile drawer utility clusters.
   * @defaultValue `true`
   */
  showAutonyms?: boolean;

  /**
   * Optional custom CSS class names applied to the outer segmented container.
   * @defaultValue `""`
   */
  className?: string;
}

/**
 * Segmented Cockpit Locale Switcher (`LocaleSwitcher`).
 *
 * Provides an accessible, tactile toggle between English (`en` - LTR) and Persian (`fa` - RTL).
 * Synchronizes with next-intl route localization and react-transition-progress top bar.
 * Designed with systems-level precision: instant optical feedback, non-mirrored globe telemetry,
 * zero layout shift, and bidirectional flexbox sorting (`Globe -> FA -> EN` in RTL).
 *
 * @param props - Configuration options for the switcher.
 * @returns A segmented pill radio-group component.
 */
export function LocaleSwitcher({
  currentLocale,
  onLocaleChange,
  showAutonyms = true,
  className = "",
}: LocaleSwitcherProps): React.JSX.Element {
  const detectedLocale = useLocale();
  const activeLocale = (currentLocale ?? detectedLocale) === "fa" ? "fa" : "en";
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const startProgress = useProgress();

  const enButtonRef = useRef<HTMLButtonElement>(null);
  const faButtonRef = useRef<HTMLButtonElement>(null);

  const handleSelectLocale = (nextLocale: "en" | "fa") => {
    if (nextLocale === activeLocale) return;

    startTransition(() => {
      startProgress();
      if (onLocaleChange) {
        onLocaleChange(nextLocale);
      }
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    targetLocale: "en" | "fa",
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      if (targetLocale === "en") {
        faButtonRef.current?.focus();
      } else {
        enButtonRef.current?.focus();
      }
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelectLocale(targetLocale);
    }
  };

  const isEnActive = activeLocale === "en";
  const isFaActive = activeLocale === "fa";

  return (
    <div
      role="radiogroup"
      aria-label={t("switch_language") || "Language selection"}
      className={cn(
        "inline-flex items-center h-9 p-[3px] rounded-full border border-border bg-card/60 backdrop-blur-xs transition-colors shadow-xs group hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary/40",
        className,
      )}
    >
      {/* Leading Geometric Globe Icon (Retains real-world orientation; non-mirrored in RTL) */}
      <div
        aria-hidden="true"
        className="flex items-center justify-center ps-2 pe-1 text-muted-foreground transition-colors group-hover:text-primary order-0"
      >
        <Globe className="size-4 shrink-0 [transform:none]" />
      </div>

      {/* English Segment Button */}
      <button
        ref={enButtonRef}
        type="button"
        role="radio"
        aria-checked={isEnActive}
        tabIndex={isEnActive ? 0 : -1}
        onClick={() => handleSelectLocale("en")}
        onKeyDown={(e) => handleKeyDown(e, "en")}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 min-h-[28px] px-2.5 rounded-full font-mono text-xs font-semibold select-none transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary order-1 rtl:order-2",
          isEnActive
            ? "bg-background text-foreground shadow-xs ring-1 ring-primary/40 font-bold"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
        )}
      >
        <span>EN</span>
        {isEnActive && (
          <span
            className="size-1 rounded-full bg-primary animate-pulse"
            aria-hidden="true"
          />
        )}
      </button>

      {/* Persian Segment Button */}
      <button
        ref={faButtonRef}
        type="button"
        role="radio"
        aria-checked={isFaActive}
        tabIndex={isFaActive ? 0 : -1}
        onClick={() => handleSelectLocale("fa")}
        onKeyDown={(e) => handleKeyDown(e, "fa")}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 min-h-[28px] px-2.5 rounded-full font-mono text-xs font-semibold select-none transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary order-2 rtl:order-1",
          isFaActive
            ? "bg-background text-foreground shadow-xs ring-1 ring-primary/40 font-bold"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
        )}
      >
        <span>FA</span>
        {showAutonyms && (
          <span className="font-sans text-[11px] font-normal opacity-85 ms-0.5">
            (فارسی)
          </span>
        )}
        {isFaActive && (
          <span
            className="size-1 rounded-full bg-primary animate-pulse"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}

export default LocaleSwitcher;
