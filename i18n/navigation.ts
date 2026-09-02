import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Lightweight locale-aware navigation wrappers from next-intl.
 */
export const {
  redirect,
  usePathname,
  useRouter,
  getPathname,
  Link: NextIntlLink,
} = createNavigation(routing);

export { Link } from "@/app/components/Link";
export type { LinkProps } from "@/app/components/Link";

