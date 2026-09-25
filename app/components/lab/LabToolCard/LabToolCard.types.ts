import type { HTMLAttributes } from "react";

export type ToolCategory = "dns" | "network" | "entropy";
export type ToolGlyphType = "doh" | "ipinfo" | "fingerprint";

export interface LabToolItem {
  id: string;
  tag: string;
  status: string;
  title: string;
  description: string;
  protocol: string;
  executionMode: string;
  latencyTarget: string;
  features: string[];
  href: string;
  cta: string;
  category: ToolCategory;
  glyphType: ToolGlyphType;
}

export interface LabToolCardProps extends HTMLAttributes<HTMLElement> {
  tool: LabToolItem;
  locale?: "en" | "fa";
}
