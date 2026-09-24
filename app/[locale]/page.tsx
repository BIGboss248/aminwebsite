import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  HeroSection,
  HeroSectionSkeleton,
} from "@/app/components/home/HeroSection";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/site-config";
import TrustSignalsSection, {
  TrustSignalsSectionSkeleton,
} from "../components/home/TrustSignalsSection";
import FeaturedProjectsGrid, {
  FeaturedProjectsGridSkeleton,
} from "../components/home/FeaturedProjectsGrid";
import LabLauncherSection, {
  LabLauncherSectionSkeleton,
} from "../components/home/LabLauncherSection";
import TechStackMatrix, {
  TechStackMatrixSkeleton,
} from "../components/home/TechStackMatrix";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.baseUrl}/${locale}#website`,
        url: `${SITE_CONFIG.baseUrl}/${locale}`,
        name: tCommon("brand"),
        description: tMeta("description"),
        inLanguage: locale === "fa" ? "fa-IR" : "en-US",
      },
      {
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
          "Next.js",
          "TypeScript",
          "React",
          "Tailwind CSS",
          "Go",
          "Docker",
          "DNS over HTTPS",
          "Systems Architecture",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col flex-1 w-full bg-background font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<HeroSectionSkeleton />}>
        <HeroSection locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<TrustSignalsSectionSkeleton />}>
        <TrustSignalsSection locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<FeaturedProjectsGridSkeleton />}>
        <FeaturedProjectsGrid locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<LabLauncherSectionSkeleton />}>
        <LabLauncherSection locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<TechStackMatrixSkeleton />}>
        <TechStackMatrix locale={locale as "en" | "fa"} />
      </Suspense>
    </div>
  );
}
