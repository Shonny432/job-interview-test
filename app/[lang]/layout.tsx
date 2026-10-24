import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthMenu } from "@/components/auth-menu";
import { FeedbackDialog } from "@/components/feedback-dialog";
import { I18nProvider } from "@/components/i18n-provider";
import { InlineScript } from "@/components/inline-script";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ProgressToggle } from "@/components/progress-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, locales } from "@/lib/i18n/locales";
import { themeInitScript } from "@/lib/theme";
import logoDark from "@/public/logo-dark.png";
import logoLight from "@/public/logo-light.png";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.appTitle,
    description: t.appSubtitle,
    // Тему сайта вкладка браузера не знает, поэтому иконка выбирается по системной теме
    icons: {
      icon: [
        { url: "/icon-light.png", type: "image/png", sizes: "192x192", media: "(prefers-color-scheme: light)" },
        { url: "/icon-dark.png", type: "image/png", sizes: "192x192", media: "(prefers-color-scheme: dark)" },
      ],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html
      lang={lang}
      data-theme="light"
      // Инлайн-скрипт меняет data-theme до гидратации — React должен принять значение из DOM
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <InlineScript html={themeInitScript} />
      </head>
      <body className="flex min-h-full flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-100">
        <I18nProvider locale={lang}>
          <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 pt-4 sm:px-6">
            <Link
              href={`/${lang}`}
              aria-label={t.appTitle}
              title={t.appTitle}
              className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {/* Версия под тему сайта (data-theme), а не системную — переключается вместе с ThemeToggle */}
              <Image src={logoLight} alt="" width={40} height={40} loading="eager" className="dark:hidden" />
              <Image src={logoDark} alt="" width={40} height={40} loading="eager" className="hidden dark:block" />
            </Link>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
              <AuthMenu />
            </div>
          </header>
          {children}
          <footer className="mx-auto flex w-full max-w-5xl flex-col gap-4 border-t border-zinc-200 px-4 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-6 dark:border-zinc-800">
            <ProgressToggle />
            <FeedbackDialog />
          </footer>
        </I18nProvider>
      </body>
    </html>
  );
}
