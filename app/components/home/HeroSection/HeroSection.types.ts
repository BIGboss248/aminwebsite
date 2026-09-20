/**
 * TypeScript definitions and prop contracts for the HeroSection component.
 */

/**
 * Operational availability status for client contracts, architecture consulting, or employment.
 */
export type AvailabilityStatus = "available" | "busy" | "offline";

export interface HeroSectionProps {
  /**
   * Active locale code determining typography, translation defaults, and text direction.
   * @defaultValue "en"
   */
  locale?: string;
  /**
   * Availability badge label text override.
   */
  availabilityText?: string;
  /**
   * Operational availability status governing the indicator dot color.
   * @defaultValue "available"
   */
  availabilityStatus?: AvailabilityStatus;
  /**
   * Main editorial headline.
   */
  title?: string;
  /**
   * Narrative body paragraph articulating the core value proposition.
   */
  description?: string;
  /**
   * Primary CTA button label.
   */
  primaryCtaText?: string;
  /**
   * Primary CTA navigation target URL or path.
   */
  primaryCtaHref?: string;
  /**
   * Secondary CTA button label.
   */
  secondaryCtaText?: string;
  /**
   * Secondary CTA navigation target URL or path.
   */
  secondaryCtaHref?: string;
  /**
   * Tertiary/Lab CTA button label.
   */
  labCtaText?: string;
  /**
   * Tertiary/Lab CTA navigation target URL or path.
   */
  labCtaHref?: string;
  /**
   * Optional additional CSS classes to append to the root section container.
   * @defaultValue ""
   */
  className?: string;
}

