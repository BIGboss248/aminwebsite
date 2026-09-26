import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  IpScanHeader,
  IpScanHeaderSkeleton,
} from "@/app/components/lab/ipinfo/IpScanHeader";
import {
  IpScannerClient,
  IpScannerClientSkeleton,
} from "@/app/components/lab/ipinfo/IpScannerClient";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface IpInfoPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: IpInfoPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lab.ipinfo.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}/${locale}/lab/ipinfo`,
      languages: {
        en: `${SITE_CONFIG.baseUrl}/en/lab/ipinfo`,
        fa: `${SITE_CONFIG.baseUrl}/fa/lab/ipinfo`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_CONFIG.baseUrl}/${locale}/lab/ipinfo`,
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

export default async function IpInfoPage({ params }: IpInfoPageProps) {
  const { locale } = await params;
  const tMeta = await getTranslations({
    locale,
    namespace: "lab.ipinfo.meta",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_CONFIG.baseUrl}/${locale}/lab/ipinfo#webapp`,
        url: `${SITE_CONFIG.baseUrl}/${locale}/lab/ipinfo`,
        name: tMeta("title"),
        description: tMeta("description"),
        inLanguage: locale === "fa" ? "fa-IR" : "en-US",
        applicationCategory: "SecurityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "WebRTC ICE Candidate Leak Detection",
          "Public IPv4 & IPv6 Dual-Stack Routing Verification",
          "Autonomous System Number (ASN) & ISP Audit",
          "Browser Intl Timezone Drift Analysis",
          "Client-Side Zero Telemetry Execution",
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
      <Suspense fallback={<IpScanHeaderSkeleton />}>
        <IpScanHeader locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<IpScannerClientSkeleton />}>
        <IpScannerClient locale={locale as "en" | "fa"} />
      </Suspense>
    </div>
  );
}
