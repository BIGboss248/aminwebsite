import type { HTMLAttributes } from "react";
import type { DohResolverId, DohRecordType } from "../doh-types";
import type { QueryMode } from "../DohQueryController/DohQueryController.types";

export interface DohProberClientProps extends HTMLAttributes<HTMLElement> {
  locale?: "en" | "fa";
  initialDomain?: string;
  initialRecordType?: DohRecordType;
  initialResolver?: DohResolverId;
  initialMode?: QueryMode;
}
