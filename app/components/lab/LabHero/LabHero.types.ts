import type { HTMLAttributes } from "react";

export interface LabHeroProps extends HTMLAttributes<HTMLElement> {
  locale?: "en" | "fa";
  eyebrow?: string;
  badge?: string;
  title?: string;
  description?: string;
  statToolsLabel?: string;
  statToolsVal?: string;
  statClientLabel?: string;
  statClientVal?: string;
  statPrivacyLabel?: string;
  statPrivacyVal?: string;
}

export interface PrivacyGuaranteeBannerProps
  extends HTMLAttributes<HTMLDivElement> {
  locale?: "en" | "fa";
  badge?: string;
  title?: string;
  description?: string;
}
