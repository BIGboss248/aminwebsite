import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  SinglePageHero,
  SinglePageHeroSkeleton,
} from "@/app/components/single-page/SinglePageHero";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface SinglePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: SinglePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "single_page.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}/${locale}/single-page`,
      languages: {
        en: `${SITE_CONFIG.baseUrl}/en/single-page`,
        fa: `${SITE_CONFIG.baseUrl}/fa/single-page`,
      },
    },
  };
}

export default async function SinglePage({ params }: SinglePageProps) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "single_page.meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.baseUrl}/${locale}/single-page#website`,
        url: `${SITE_CONFIG.baseUrl}/${locale}/single-page`,
        name: tMeta("title"),
        description: tMeta("description"),
        inLanguage: locale === "fa" ? "fa-IR" : "en-US",
        author: {
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
      <Suspense fallback={<SinglePageHeroSkeleton />}>
        <SinglePageHero locale={locale as "en" | "fa"} />
      </Suspense>
    </div>
  );
}
