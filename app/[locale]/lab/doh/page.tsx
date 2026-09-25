import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  DohToolHeader,
  DohToolHeaderSkeleton,
} from "@/app/components/lab/doh/DohToolHeader";
import {
  DohProberClient,
  DohProberClientSkeleton,
} from "@/app/components/lab/doh/DohProberClient";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface DohPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: DohPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lab.doh_prober.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}/${locale}/lab/doh`,
      languages: {
        en: `${SITE_CONFIG.baseUrl}/en/lab/doh`,
        fa: `${SITE_CONFIG.baseUrl}/fa/lab/doh`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_CONFIG.baseUrl}/${locale}/lab/doh`,
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

export default async function DohPage({ params }: DohPageProps) {
  const { locale } = await params;
  const tMeta = await getTranslations({
    locale,
    namespace: "lab.doh_prober.meta",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_CONFIG.baseUrl}/${locale}/lab/doh#webapp`,
        url: `${SITE_CONFIG.baseUrl}/${locale}/lab/doh`,
        name: tMeta("title"),
        description: tMeta("description"),
        inLanguage: locale === "fa" ? "fa-IR" : "en-US",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "RFC 8484 DNS over HTTPS Client Fetch",
          "Parallel Multi-Resolver Latency Benchmarking",
          "DNS Poisoning & Bogon IP Injection Detection",
          "Raw JSON Wire Answer Inspection",
          "Zero Backend Proxying or Telemetry Logging",
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
      <Suspense fallback={<DohToolHeaderSkeleton />}>
        <DohToolHeader locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<DohProberClientSkeleton />}>
        <DohProberClient locale={locale as "en" | "fa"} />
      </Suspense>
    </div>
  );
}
