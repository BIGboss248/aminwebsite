"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { cn } from "cn";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

/**
 * Configuration properties for the ThemeToggle component.
 */
export interface ThemeToggleProps {
  /**
   * Optional custom CSS class names to merge onto the toggle button container.
   * @defaultValue `""`
   */
  className?: string;
  /**
   * Optional callback triggered when the theme is toggled.
   * @param nextTheme - The newly selected theme ("light" | "dark").
   */
  onToggle?: (nextTheme: "light" | "dark") => void;
}

/**
 * Interactive Client Component for switching between light and dark themes.
 *
 * Features:
 * - Direct integration with `next-themes`
 * - Hydration-safe external store subscription to prevent layout mismatch
 * - Circular expanding clip-path animation via View Transitions API with graceful fallback
 * - Automatic reduction of motion when `prefers-reduced-motion: reduce` is detected
 * - Accessible keyboard and screen-reader support
 *
 * @param props - Configuration properties for ThemeToggle.
 * @returns A client-rendered toggle button with animated Sun and Moon icons.
 */
export function ThemeToggle({
  className = "",
  onToggle,
}: ThemeToggleProps = {}): React.JSX.Element {
  const tCommon = useTranslations("common");

  const { setTheme, resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!mounted) return;

    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    onToggle?.(nextTheme);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    let rect: { left: number; top: number; width: number; height: number } = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    };
    try {
      if (
        event.currentTarget &&
        typeof event.currentTarget.getBoundingClientRect === "function"
      ) {
        rect = event.currentTarget.getBoundingClientRect() ?? rect;
      }
    } catch {
      // Gracefully handle environments where getBoundingClientRect fails
    }

    const isKeyboardClick = event.clientX === 0 && event.clientY === 0;
    const x =
      isKeyboardClick || !event.clientX
        ? rect.left + rect.width / 2
        : event.clientX;
    const y =
      isKeyboardClick || !event.clientY
        ? rect.top + rect.height / 2
        : event.clientY;

    const endRadius = Math.hypot(
      Math.max(x, (typeof window !== "undefined" ? window.innerWidth : 0) - x),
      Math.max(y, (typeof window !== "undefined" ? window.innerHeight : 0) - y),
    );

    const isDark = nextTheme === "dark";

    // Set CSS custom properties on documentElement for instant GPU compositor animation
    const docEl = document.documentElement;
    docEl.style.setProperty("--theme-x", `${x}px`);
    docEl.style.setProperty("--theme-y", `${y}px`);
    docEl.style.setProperty("--theme-r", `${endRadius}px`);

    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme);
        });
        docEl.classList.toggle("dark", isDark);
      });

      if (transition && transition.ready) {
        transition.ready
          .then(() => {
            const clipPath = [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            docEl.animate(
              {
                clipPath: isDark ? clipPath : [...clipPath].reverse(),
              },
              {
                duration: 500,
                easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                pseudoElement: isDark
                  ? "::view-transition-new(root)"
                  : "::view-transition-old(root)",
              },
            );
          })
          .catch(() => {
            // Prevent unhandled promise rejection if transition is aborted or superseded
          });
      }

      if (transition && transition.finished) {
        transition.finished
          .finally(() => {
            docEl.style.removeProperty("--theme-x");
            docEl.style.removeProperty("--theme-y");
            docEl.style.removeProperty("--theme-r");
          })
          .catch(() => {});
      }
    } catch {
      setTheme(nextTheme);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={tCommon("theme_toggle")}
      className={cn("relative", className)}
    >
      <Sun className="rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{tCommon("theme_toggle")}</span>
    </Button>
  );
}

/**
 * Skeleton placeholder matching the exact dimensions of ThemeToggle
 * to eliminate cumulative layout shift (CLS) during streaming and initial mount.
 *
 * @param props - Optional HTML div attributes including className.
 * @returns An accessible pulse-animated placeholder element.
 */
export function ThemeToggleSkeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn("h-8 w-8 rounded-lg bg-muted/50 animate-pulse", className)}
      {...props}
    />
  );
}

export const Skeleton = ThemeToggleSkeleton;
