import type { ComponentPropsWithoutRef } from "react";

/**
 * Diagnostic Tool Glyph Identifiers.
 */
export type ToolGlyphType = "doh" | "ipinfo" | "fingerprint";

/**
 * Individual Diagnostic Tool Item Data Structure.
 */
export interface ToolItem {
  /** Unique tool identifier key */
  id: string;
  /** Monospace protocol/probe header tag (e.g. "PROBE_01 // RFC 8484 DOH") */
  headerTag: string;
  /** Privacy/Execution mode label (e.g. "CLIENT-SIDE PROBE") */
  privacyMode: string;
  /** Primary display title for the tool */
  title: string;
  /** Concise 2-line diagnostic capability summary */
  pitch: string;
  /** List of client endpoint and architecture tags */
  chips: string[];
  /** Destination route */
  href: string;
  /** Action button CTA text */
  ctaLabel: string;
  /** Geometric glyph style type */
  glyphType?: ToolGlyphType;
}

/**
 * Properties for the ToolQuickCard Component.
 */
export interface ToolQuickCardProps extends ComponentPropsWithoutRef<"article"> {
  /** Diagnostic tool data payload */
  tool: ToolItem;
  /** Active language locale */
  locale?: "en" | "fa";
  /** Additional CSS class names */
  className?: string;
}

/**
 * Properties for the LabLauncherSection Component.
 */
export interface LabLauncherSectionProps
  extends ComponentPropsWithoutRef<"section"> {
  /** Active language locale */
  locale?: "en" | "fa";
  /** Optional section eyebrow text override */
  eyebrow?: string;
  /** Optional main section heading override */
  title?: string;
  /** Optional section description override */
  description?: string;
  /** Optional zero-logging badge text override */
  zeroLoggingBadge?: string;
  /** Optional "Explore Full Lab Hub" destination route */
  exploreHubHref?: string;
  /** Optional custom tools array override */
  tools?: ToolItem[];
  /** Additional CSS class names */
  className?: string;
}

