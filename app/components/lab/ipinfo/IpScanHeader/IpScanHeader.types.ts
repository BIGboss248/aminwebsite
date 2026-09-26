import type { ComponentPropsWithoutRef } from "react";

export interface IpScanHeaderProps extends ComponentPropsWithoutRef<"header"> {
  locale?: "en" | "fa";
  eyebrow?: string;
  badge?: string;
  title?: string;
  description?: string;
}
