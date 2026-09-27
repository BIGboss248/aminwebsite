import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  SinglePageNavbar,
  SinglePageNavbarSkeleton,
  SinglePageHero,
  SinglePageHeroSkeleton,
  SinglePageProjectsSection,
  SinglePageProjectsSkeleton,
  ContactForm,
  ContactFormSkeleton,
  SocialsBlock,
  SocialsBlockSkeleton,
} from "@/app/components/single-page";

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
  const tContactHeader = await getTranslations({
    locale,
    namespace: "contact.header",
  });

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
      {
        "@type": "ContactPage",
        "@id": `${SITE_CONFIG.baseUrl}/${locale}/single-page#contact`,
        url: `${SITE_CONFIG.baseUrl}/${locale}/single-page#contact`,
        name: tContactHeader("title"),
        description: tContactHeader("description"),
        inLanguage: locale === "fa" ? "fa-IR" : "en-US",
        mainEntity: {
          "@type": "Person",
          "@id": `${SITE_CONFIG.baseUrl}/#person`,
          name: SITE_CONFIG.author.name,
          url: `${SITE_CONFIG.baseUrl}/${locale}`,
          jobTitle: SITE_CONFIG.author.role,
          email: SITE_CONFIG.contact.email,
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
      <Suspense fallback={<SinglePageNavbarSkeleton />}>
        <SinglePageNavbar activeLocale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<SinglePageHeroSkeleton />}>
        <SinglePageHero locale={locale as "en" | "fa"} />
      </Suspense>
      <Suspense fallback={<SinglePageProjectsSkeleton />}>
        <SinglePageProjectsSection locale={locale as "en" | "fa"} />
      </Suspense>

      {/* Section: Contact & Direct Inquiry */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="py-16 sm:py-24 border-b border-border/40 bg-background text-foreground transition-colors"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Header Intro */}
          <div className="mb-10 sm:mb-12 max-w-2xl">
            <span className="font-mono text-xs font-semibold text-primary tracking-wider uppercase block mb-2">
              {tContactHeader("eyebrow")}
            </span>
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4"
            >
              {tContactHeader("title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {tContactHeader("description")}
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
      </section>
    </div>
  );
}
