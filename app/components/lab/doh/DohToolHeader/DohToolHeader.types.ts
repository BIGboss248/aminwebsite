import type { HTMLAttributes } from "react";

export interface DohToolHeaderProps extends HTMLAttributes<HTMLElement> {
  locale?: "en" | "fa";
  eyebrow?: string;
  badge?: string;
  title?: string;
  description?: string;
}

export interface DohMethodologyTooltipProps
  extends HTMLAttributes<HTMLDivElement> {
  locale?: "en" | "fa";
}
