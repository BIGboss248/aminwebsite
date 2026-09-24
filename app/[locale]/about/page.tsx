import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  AboutHero,
  AboutHeroSkeleton,
} from "@/app/components/about/AboutHero";
import {
  PhilosophySection,
  PhilosophySectionSkeleton,
} from "@/app/components/about/PhilosophySection";
import {
  ExperienceTimeline,
  ExperienceTimelineSkeleton,
} from "@/app/components/about/ExperienceTimeline";
import {
  AcademicResearchSection,
  AcademicResearchSectionSkeleton,
} from "@/app/components/about/AcademicResearchSection";
import {
  BeyondCodeSection,
  BeyondCodeSectionSkeleton,
} from "@/app/components/about/BeyondCodeSection";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}/${locale}/about`,
      languages: {
        en: `${SITE_CONFIG.baseUrl}/en/about`,
        fa: `${SITE_CONFIG.baseUrl}/fa/about`,
      },
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "about.meta" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_CONFIG.baseUrl}/${locale}/about#profilepage`,
        url: `${SITE_CONFIG.baseUrl}/${locale}/about`,
        name: tMeta("title"),
        description: tMeta("description"),
        inLanguage: locale === "fa" ? "fa-IR" : "en-US",
        mainEntity: {
          "@type": "Person",
          "@id": `${SITE_CONFIG.baseUrl}/#person`,
          name: SITE_CONFIG.author.name,
          url: `${SITE_CONFIG.baseUrl}/${locale}`,
          jobTitle: SITE_CONFIG.author.role,
          sameAs: [
            SITE_CONFIG.social.github,
            SITE_CONFIG.social.linkedin,
            SITE_CONFIG.social.orcid,
            SITE_CONFIG.social.twitter,
          ].filter(Boolean),
          knowsAbout: [
            "Next.js App Router",
            "TypeScript",
            "React",
            "Distributed Systems",
            "DNS over HTTPS",
            "Docker",
            "Full-Stack Architecture",
          ],
        },
      },
    ],
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-background font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<AboutHeroSkeleton />}>
        <AboutHero locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<PhilosophySectionSkeleton />}>
        <PhilosophySection locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<ExperienceTimelineSkeleton />}>
        <ExperienceTimeline locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<AcademicResearchSectionSkeleton />}>
        <AcademicResearchSection locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<BeyondCodeSectionSkeleton />}>
        <BeyondCodeSection locale={locale as "en" | "fa"} />
      </Suspense>
    </div>
  );
}
