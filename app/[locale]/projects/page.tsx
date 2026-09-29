import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  ProjectsHero,
  ProjectsHeroSkeleton,
} from "@/app/components/projects/ProjectsHero";
import {
  ProjectArchiveGrid,
  ProjectArchiveGridSkeleton,
} from "@/app/components/projects/ProjectArchiveGrid";
import {
  OpenSourceShowcase,
  OpenSourceShowcaseSkeleton,
} from "@/app/components/projects/OpenSourceShowcase";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}/${locale}/projects`,
      languages: {
        en: `${SITE_CONFIG.baseUrl}/en/projects`,
        fa: `${SITE_CONFIG.baseUrl}/fa/projects`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_CONFIG.baseUrl}/${locale}/projects`,
      siteName: SITE_CONFIG.name,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "projects.meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_CONFIG.baseUrl}/${locale}/projects#collectionpage`,
        url: `${SITE_CONFIG.baseUrl}/${locale}/projects`,
        name: tMeta("title"),
        description: tMeta("description"),
        inLanguage: locale === "fa" ? "fa-IR" : "en-US",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_CONFIG.baseUrl}/#website`,
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.baseUrl,
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Setayesh Parts Web Platform",
              url: "https://setayesh.aminjamali.site/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Bahar Trade Co. Web Platform",
              url: "https://bahartradeco.com/en",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Azad Bazar Multi-Vendor Marketplace",
              url: "https://azadbazar.isfahan.iau.ir/",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "ParsBERT-XGBoost Commodity Volatility Model",
              url: "https://doi.org/10.61838/jafci.485",
            },
            {
              "@type": "ListItem",
              position: 5,
              name: "DQN & LSTM Volatility Analysis Engine",
              url: "https://doi.org/10.61838/bmfopen.545",
            },
            {
              "@type": "ListItem",
              position: 6,
              name: "Bahar Trade IT Automation and Infrastructure Management",
            },
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
      <Suspense fallback={<ProjectsHeroSkeleton />}>
        <ProjectsHero locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<ProjectArchiveGridSkeleton />}>
        <ProjectArchiveGrid locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<OpenSourceShowcaseSkeleton />}>
        <OpenSourceShowcase locale={locale as "en" | "fa"} />
      </Suspense>
    </div>
  );
}
