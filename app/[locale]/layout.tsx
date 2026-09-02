import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<React.JSX.Element> {
  const { locale } = await params;

  // Validate locale segment
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load all messages for the current locale
  const messages = await getMessages();

  // Resolve direction (RTL for fa, LTR for en)
  const isRtl = locale === "fa";
  const direction = isRtl ? "rtl" : "ltr";
  const fontVariable = isRtl ? vazirmatn.variable : geistSans.variable;

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${fontVariable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <ProgressBarProvider>
            <ProgressBar className="fixed top-0 left-0 right-0 h-1 bg-sky-500 z-50 shadow-sm shadow-sky-500/20" />
            {children}
          </ProgressBarProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
