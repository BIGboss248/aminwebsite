import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface SinglePageProps {
  params: Promise<{ locale: string }>;
}

export default async function SinglePage({ params }: SinglePageProps) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
