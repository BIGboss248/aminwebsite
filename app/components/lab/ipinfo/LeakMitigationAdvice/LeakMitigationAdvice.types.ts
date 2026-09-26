import type { ComponentPropsWithoutRef } from "react";

export interface LeakMitigationAdviceProps extends ComponentPropsWithoutRef<"section"> {
  locale?: "en" | "fa";
}
