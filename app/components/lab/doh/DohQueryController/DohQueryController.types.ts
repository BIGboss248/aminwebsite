import type { HTMLAttributes } from "react";
import type { DohResolverId, DohRecordType } from "../doh-types";

export type QueryMode = "single" | "parallel";

export interface DohQueryControllerProps extends HTMLAttributes<HTMLDivElement> {
  locale?: "en" | "fa";
  mode: QueryMode;
  onModeChange: (mode: QueryMode) => void;
  selectedResolver: DohResolverId;
  onResolverChange: (resolver: DohResolverId) => void;
  customUrl: string;
  onCustomUrlChange: (url: string) => void;
  domain: string;
  onDomainChange: (domain: string) => void;
  recordType: DohRecordType;
  onRecordTypeChange: (type: DohRecordType) => void;
  isExecuting: boolean;
  onExecute: () => void;
}
