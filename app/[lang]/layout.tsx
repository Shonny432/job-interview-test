import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthMenu } from "@/components/auth-menu";
import { I18nProvider } from "@/components/i18n-provider";
import { InlineScript } from "@/components/inline-script";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, locales } from "@/lib/i18n/locales";
import { themeInitScript } from "@/lib/theme";
import logo from "@/public/logo.png";
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
  return { title: t.appTitle, description: t.appSubtitle };
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
              <Image src={logo} alt="" width={40} height={40} loading="eager" />
            </Link>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
              <AuthMenu />
            </div>
          </header>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
