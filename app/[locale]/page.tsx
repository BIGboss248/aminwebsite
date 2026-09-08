import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/app/components/Link";
import { ThemeToggle } from "@/components/theme-toggle";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;

  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");

  const otherLocale = locale === "en" ? "fa" : "en";
  const otherLocaleName = locale === "en" ? "فارسی" : "English";

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-card text-card-foreground rounded-2xl border border-border shadow-xs sm:items-start">
        <div className="w-full flex items-center justify-between mb-8">
          <Image
            className="dark:invert h-5 w-[100px]"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              locale={otherLocale}
              className="text-sm font-medium rounded-full border border-border px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {tCommon("switch_language")}: {otherLocaleName}
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-start">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground">
            {t.rich("hero_title", {
              file: (chunks) => (
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
                  {chunks}
                </code>
              ),
            })}
          </h1>
          <p className="max-w-md text-lg leading-8 text-muted-foreground">
            {t.rich("hero_description", {
              templates: (chunks) => (
                <a
                  href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  className="font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-2"
                >
                  {chunks}
                </a>
              ),
              learning: (chunks) => (
                <a
                  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                  className="font-medium text-foreground underline decoration-muted-foreground/50 underline-offset-2"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-primary-foreground transition-colors hover:bg-primary/90 md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            {t("cta_deploy")}
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-border px-5 text-foreground transition-colors hover:bg-muted md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("cta_docs")}
          </a>
        </div>
        <div>
          <Link href={"/about"} locale="fa">
            About page
          </Link>
        </div>
      </main>
    </div>
  );
}
