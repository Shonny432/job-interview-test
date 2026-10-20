export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
const CHANGE_EVENT = "theme-preference-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Выполняется инлайн в <head> до первой отрисовки: выставляет `data-theme` на <html>,
 * чтобы страница не мигала светлой темой у пользователей с тёмной.
 */
export const themeInitScript = `(function(){var t;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}var d=t==="dark"||(t!=="light"&&window.matchMedia("${DARK_QUERY}").matches);document.documentElement.dataset.theme=d?"dark":"light"})()`;

function isPreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function readThemePreference(): ThemePreference {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return isPreference(value) ? value : "system";
  } catch {
    return "system";
  }
}

function resolve(preference: ThemePreference): ResolvedTheme {
  if (preference !== "system") return preference;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

export function applyThemePreference(preference: ThemePreference) {
  document.documentElement.dataset.theme = resolve(preference);
}

export function saveThemePreference(preference: ThemePreference) {
  try {
    if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // localStorage недоступен — тема применится только до перезагрузки
  }
  applyThemePreference(preference);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Подписка для useSyncExternalStore: смена выбора, другие вкладки и смена системной темы. */
export function subscribeThemePreference(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  const sync = () => {
    applyThemePreference(readThemePreference());
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", sync);
  media.addEventListener("change", sync);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", sync);
    media.removeEventListener("change", sync);
  };
}
