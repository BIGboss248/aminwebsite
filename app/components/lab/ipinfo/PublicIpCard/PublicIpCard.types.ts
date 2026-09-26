import type { ComponentPropsWithoutRef } from "react";
import type { PublicIpData } from "../ipinfo-types";

export interface PublicIpCardProps extends ComponentPropsWithoutRef<"div"> {
  locale?: "en" | "fa";
  data: PublicIpData | null;
  isLoading?: boolean;
}
