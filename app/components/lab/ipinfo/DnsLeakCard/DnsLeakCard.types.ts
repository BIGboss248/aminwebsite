import type { ComponentPropsWithoutRef } from "react";
import type { DnsLeakResult } from "../ipinfo-types";

export interface DnsLeakCardProps extends ComponentPropsWithoutRef<"div"> {
  locale?: "en" | "fa";
  result: DnsLeakResult;
  isLoading?: boolean;
}
