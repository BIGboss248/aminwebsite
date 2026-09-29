"use client";

import React, { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { LocaleSwitcher } from "@/app/components/LocaleSwitcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { SinglePageMobileNavProps } from "./SinglePageNavbar.types";

/**
 * Responsive Mobile Navigation Drawer (`SinglePageMobileNav`).
 *
 * Slide-out modal drawer for single-page viewport navigation on mobile/tablet viewports (< 768px).
 * Displays active scroll-spy section highlights, smooth anchor jump triggers, and quick utility controls.
 *
 * @param props - Configuration properties for the mobile navigation drawer.
 * @returns A client-rendered accessible modal navigation drawer.
 */
export function SinglePageMobileNav({
  isOpen,
  onClose,
  items,
  activeSection,
  onSelectSection,
  brandName = SITE_CONFIG.author.name,
  activeLocale,
  onLocaleChange,
  onThemeToggle,
}: SinglePageMobileNavProps): React.JSX.Element | null {
  const t = useTranslations("single_page.nav");
  const tCommon = useTranslations("common");

  // Handle ESC key press to close drawer
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("mobile_nav")}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-background/95 backdrop-blur-xl md:hidden animate-in fade-in-0 duration-200"
    >
      {/* 1. Drawer Header */}
      <div className="flex h-14 items-center justify-between border-b border-border/80 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {/* Emblem */}
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card">
            <svg
              className="h-4 w-4 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <circle cx="12" cy="12" r="3" className="fill-primary/20" />
            </svg>
          </div>

          <div className="font-mono text-xs font-bold text-foreground">
            <span>{brandName.toUpperCase()}</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close_drawer")}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* 2. Navigation Link List */}
      <nav
        role="navigation"
        aria-label={t("mobile_nav")}
        className="flex-1 overflow-y-auto px-4 py-6 sm:px-6"
      >
        <ul className="flex flex-col gap-2 list-none m-0 p-0">
          {items.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectSection(item.id);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold border border-primary/30"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent",
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-mono text-xs text-primary transition-opacity",
                        isActive ? "opacity-100 font-bold" : "opacity-40",
                      )}
                    >
                      {">"}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {isActive && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-primary bg-primary/15 px-2 py-0.5 rounded-full">
                      <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                      <span>{t("active_section")}</span>
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 3. Utility Controls Footer */}
      <div className="border-t border-border/80 px-4 py-4 sm:px-6 flex items-center justify-between bg-card/40">
        <LocaleSwitcher
          currentLocale={activeLocale}
          onLocaleChange={onLocaleChange}
          showAutonyms={true}
          className="h-9 text-xs"
        />

        <ThemeToggle onToggle={onThemeToggle} className="h-9 w-9" />
      </div>
    </div>
  );
}

export default SinglePageMobileNav;
