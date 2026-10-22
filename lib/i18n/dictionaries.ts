import { en } from "./en";
import type { Locale } from "./locales";
import { pl } from "./pl";
import { ru, type Dictionary } from "./ru";
import { uk } from "./uk";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { ru, uk, en, pl };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
