import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  HeroSection,
  HeroSectionSkeleton,
} from "@/app/components/home/HeroSection";
import { routing } from "@/i18n/routing";
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

  return (
    <div className="flex flex-col flex-1 w-full bg-background font-sans">
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
