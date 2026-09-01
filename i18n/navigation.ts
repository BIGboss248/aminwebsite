import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Lightweight locale-aware navigation wrappers.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
