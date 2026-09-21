/**
 * TypeScript definitions and prop contracts for the TrustSignalsSection component.
 */

export interface TrustSignalsSectionProps {
  /**
   * Active locale code determining typography, translation defaults, and text direction.
   * @defaultValue "en"
   */
  locale?: string;

  /**
   * Section eyebrow label override (e.g. "// 01. VERIFIED CREDENTIALS & PRODUCTION SIGNALS").
   */
  eyebrow?: string;

  /**
   * Section headline title override.
   */
  title?: string;

  /**
   * Section narrative subtitle / description override.
   */
  description?: string;

  /**
   * Navigation target URL for the "View All Verified Credentials" action link.
   * @defaultValue ROUTES.about
   */
  actionHref?: string;

  /**
   * Optional additional CSS classes to append to the root section container.
   * @defaultValue ""
   */
  className?: string;
}

