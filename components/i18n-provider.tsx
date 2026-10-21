"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, type Locale } from "@/lib/i18n/locales";

const LocaleContext = createContext<Locale>(defaultLocale);

/** Передаёт язык клиентским компонентам; сами словари небольшие и лежат в бандле. */
export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useDictionary() {
  return getDictionary(useContext(LocaleContext));
}
