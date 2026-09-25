import type { HTMLAttributes } from "react";
import type { DohQueryResult, DohStatus } from "../doh-types";

export interface DohDiagnosticConsoleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "results"> {
  locale?: "en" | "fa";
  results: DohQueryResult[];
  isExecuting: boolean;
}

export interface CensorshipIndicatorBadgeProps
  extends HTMLAttributes<HTMLSpanElement> {
  status: DohStatus;
}
