/**
 * TypeScript Data Contracts for SinglePageCertificationsSection
 */

export interface CertificationItem {
  /**
   * Unique identifier for the certification.
   */
  id: string;
  /**
   * Domain or category tag (e.g., 'IT INFRASTRUCTURE & SYSTEMS', 'AI & GENERATIVE WORKFLOWS').
   */
  tag: string;
  /**
   * Status or credential badge (e.g., 'SPECIALIZATION', 'CERTIFIED QUEST').
   */
  badge: string;
  /**
   * Full certification title.
   */
  title: string;
  /**
   * Issuing institution or platform (e.g., 'Google & Coursera', 'Amazon Web Services (AWS)').
   */
  issuer: string;
  /**
   * Concise summary of the curriculum, covered skills, and verification scope.
   */
  summary: string;
  /**
   * Official credential ID if available.
   */
  credentialId?: string;
  /**
   * Direct verification or course track URL.
   */
  credentialUrl?: string;
  /**
   * Key competencies and skill chips acquired from the certification.
   */
  skills: string[];
}

export interface AdditionalCertificationItem {
  /**
   * Unique identifier for the additional certification item.
   */
  id: string;
  /**
   * Certificate title.
   */
  title: string;
  /**
   * Issuing platform or institution.
   */
  issuer: string;
  /**
   * Direct credential verification URL.
   */
  url: string;
}

export interface SinglePageCertificationsSectionProps {
  /**
   * Active UI language locale.
   */
  locale?: "en" | "fa";
  /**
   * Optional custom CSS class name.
   */
  className?: string;
}

export interface CertificationCardProps {
  /**
   * The certification model to render.
   */
  certification: CertificationItem;
  /**
   * Active UI language locale.
   */
  locale?: "en" | "fa";
  /**
   * Optional custom CSS class name.
   */
  className?: string;
}

export interface CompactCertificationCardProps {
  /**
   * Compact certification item model.
   */
  certification: AdditionalCertificationItem;
  /**
   * Active UI language locale.
   */
  locale?: "en" | "fa";
  /**
   * Optional custom CSS class name.
   */
  className?: string;
}

export interface LinkedInProfileBannerProps {
  /**
   * Active UI language locale.
   */
  locale?: "en" | "fa";
  /**
   * Optional custom CSS class name.
   */
  className?: string;
}

export interface SinglePageCertificationsSkeletonProps {
  /**
   * Optional custom CSS class name.
   */
  className?: string;
}
