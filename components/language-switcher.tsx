"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary, useLocale } from "@/components/i18n-provider";
import { LOCALE_COOKIE, localeLabels, visibleLocales, type Locale } from "@/lib/i18n/locales";

/** Тот же путь, но с другим языком в первом сегменте: /ru/quiz/... → /en/quiz/... */
function swapLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || `/${locale}`;
}

function rememberLocale(locale: Locale) {
  // proxy.ts читает эту cookie, чтобы в следующий раз открыть сайт на выбранном языке
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher() {
  const current = useLocale();
  const pathname = usePathname();
  const t = useDictionary();

  return (
    <nav
      aria-label={t.language.label}
      className="inline-flex items-center gap-0.5 rounded-full border border-zinc-200 bg-white p-0.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      {visibleLocales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={swapLocale(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? "page" : undefined}
            aria-label={localeLabels[locale].name}
            title={localeLabels[locale].name}
            onClick={() => rememberLocale(locale)}
            className={`flex h-8 min-w-9 items-center justify-center rounded-full px-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
              active
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            }`}
          >
            {localeLabels[locale].short}
          </Link>
        );
      })}
    </nav>
  );
}
