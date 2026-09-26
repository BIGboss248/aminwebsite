import type { ComponentPropsWithoutRef } from "react";
import type { TimezoneCheckResult } from "../ipinfo-types";

export interface TimezoneMismatchCardProps extends ComponentPropsWithoutRef<"div"> {
  locale?: "en" | "fa";
  result: TimezoneCheckResult;
  isLoading?: boolean;
}
