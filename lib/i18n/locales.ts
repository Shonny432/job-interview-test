export const locales = ["uk", "en", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Короткая подпись в переключателе и полное название языка на нём самом. */
export const localeLabels: Record<Locale, { short: string; name: string }> = {
  ru: { short: "RU", name: "Русский" },
  uk: { short: "UA", name: "Українська" },
  en: { short: "EN", name: "English" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Выбор языка по заголовку Accept-Language с учётом весов q. */
export function matchLocale(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter((item) => item.lang && !Number.isNaN(item.q))
    .sort((a, b) => b.q - a.q);
  return ranked.map((item) => item.lang).find(isLocale) ?? null;
}
