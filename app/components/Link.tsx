"use client";

import {
  forwardRef,
  startTransition,
  type ComponentProps,
  type MouseEvent,
} from "react";
import { createNavigation } from "next-intl/navigation";
import { useProgress } from "react-transition-progress";
import { routing } from "@/i18n/routing";

const { Link: NextIntlLink, useRouter } = createNavigation(routing);

export type LinkProps = ComponentProps<typeof NextIntlLink>;

/**
 * Checks if the click event is modified (e.g. meta/ctrl/shift/alt or middle click, target="_blank", download)
 */
function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>): boolean {
  const eventTarget = event.currentTarget;
  const target = eventTarget.getAttribute("target");
  const hasDownload = eventTarget.hasAttribute("download");

  return (
    (target !== null && target !== "_self") ||
    hasDownload ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    (event.nativeEvent && event.nativeEvent.button === 1) ||
    (event.nativeEvent &&
      (event.nativeEvent as unknown as { which?: number }).which === 2)
  );
}

/**
 * Checks if the href is an external URL or on-page hash.
 */
function isExternalOrHash(href: LinkProps["href"]): boolean {
  if (typeof href === "string") {
    return href.startsWith("#") || /^(https?:|\/\/|mailto:|tel:)/i.test(href);
  }
  return false;
}

/**
 * Merged Link component supporting both next-intl locale navigation
 * and react-transition-progress progress bar animations.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, locale, replace, scroll, onClick, ...rest },
  ref,
) {
  const router = useRouter();
  const startProgress = useProgress();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // 1. Run user-provided onClick handler
    if (onClick) {
      onClick(event);
    }

    // 2. Ignore if default was prevented, modified click, or external/hash navigation
    if (
      event.defaultPrevented ||
      isModifiedEvent(event) ||
      isExternalOrHash(href)
    ) {
      return;
    }

    // 3. Trigger transition and navigation with progress bar
    event.preventDefault();
    startTransition(() => {
      startProgress();
      const navigate = replace ? router.replace : router.push;
      navigate(href as Parameters<typeof router.push>[0], {
        scroll,
        locale,
      });
    });
  };

  return (
    <NextIntlLink
      ref={ref}
      href={href}
      locale={locale}
      replace={replace}
      scroll={scroll}
      onClick={handleClick}
      {...rest}
    />
  );
});

Link.displayName = "Link";

export default Link;
