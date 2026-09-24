import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  ContactForm,
  ContactFormSkeleton,
} from "@/app/components/contact/ContactForm";
import {
  SocialsBlock,
  SocialsBlockSkeleton,
} from "@/app/components/contact/SocialsBlock";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_CONFIG.baseUrl}/${locale}/contact`,
      languages: {
        en: `${SITE_CONFIG.baseUrl}/en/contact`,
        fa: `${SITE_CONFIG.baseUrl}/fa/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "contact.meta" });
  const tHeader = await getTranslations({ locale, namespace: "contact.header" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_CONFIG.baseUrl}/${locale}/contact#contactpage`,
        url: `${SITE_CONFIG.baseUrl}/${locale}/contact`,
        name: tMeta("title"),
        description: tMeta("description"),
        inLanguage: locale === "fa" ? "fa-IR" : "en-US",
        mainEntity: {
          "@type": "Person",
          "@id": `${SITE_CONFIG.baseUrl}/#person`,
          name: SITE_CONFIG.author.name,
          url: `${SITE_CONFIG.baseUrl}/${locale}`,
          jobTitle: SITE_CONFIG.author.role,
          email: SITE_CONFIG.contact.email,
          sameAs: [
            SITE_CONFIG.social.github,
            SITE_CONFIG.social.linkedin,
            SITE_CONFIG.social.orcid,
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-6xl">
        {/* Header Intro */}
        <div className="mb-10 sm:mb-12 max-w-2xl">
          <span className="font-mono text-xs font-semibold text-primary tracking-wider uppercase block mb-2">
            {tHeader("eyebrow")}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            {tHeader("title")}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {tHeader("description")}
          </p>
        </div>

        {/* 2-Column Grid: Simple Form + Socials Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <Suspense fallback={<ContactFormSkeleton />}>
              <ContactForm locale={locale as "en" | "fa"} />
            </Suspense>
          </div>

          <div className="lg:col-span-5">
            <Suspense fallback={<SocialsBlockSkeleton />}>
              <SocialsBlock locale={locale as "en" | "fa"} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
