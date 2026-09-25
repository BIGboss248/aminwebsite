import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/site-config";
import { LabHero, LabHeroSkeleton } from "@/app/components/lab/LabHero";
import { LabToolGrid, LabToolGridSkeleton } from "@/app/components/lab/LabToolGrid";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LabPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LabPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lab.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}/${locale}/lab`,
      languages: {
        en: `${SITE_CONFIG.baseUrl}/en/lab`,
        fa: `${SITE_CONFIG.baseUrl}/fa/lab`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_CONFIG.baseUrl}/${locale}/lab`,
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

export default async function LabPage({ params }: LabPageProps) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "lab.meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_CONFIG.baseUrl}/${locale}/lab#collectionpage`,
        url: `${SITE_CONFIG.baseUrl}/${locale}/lab`,
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
          "@type": "SoftwareApplication",
          "@id": `${SITE_CONFIG.baseUrl}/${locale}/lab#software`,
          name: "Interactive Systems Observatory & Network Diagnostics Lab",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "RFC 8484 DNS over HTTPS Prober",
            "WebRTC IP & Identity Leak Scanner",
            "Hardware & Browser Entropy Inspector",
            "100% Client-Side Direct Fetch",
            "Zero Server Telemetry Logging",
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
      <Suspense fallback={<LabHeroSkeleton />}>
        <LabHero locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<LabToolGridSkeleton />}>
        <LabToolGrid locale={locale as "en" | "fa"} />
      </Suspense>
    </div>
  );
}
