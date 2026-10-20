"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import {
  readThemePreference,
  saveThemePreference,
  subscribeThemePreference,
  type ThemePreference,
} from "@/lib/theme";
import { ru } from "@/lib/i18n/ru";

const options: { value: ThemePreference; label: string; icon: ReactNode }[] = [
  { value: "light", label: ru.theme.light, icon: <SunIcon /> },
  { value: "dark", label: ru.theme.dark, icon: <MoonIcon /> },
  { value: "system", label: ru.theme.system, icon: <MonitorIcon /> },
];

export function ThemeToggle() {
  // На сервере выбор неизвестен (null) — кнопки рендерятся без активного состояния до гидратации
  const preference = useSyncExternalStore(subscribeThemePreference, readThemePreference, () => null);

  return (
    <div
      role="group"
      aria-label={ru.theme.label}
      className="inline-flex items-center gap-0.5 rounded-full border border-zinc-200 bg-white p-0.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      {options.map((option) => {
        const active = preference === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            aria-label={option.label}
            title={option.label}
            onClick={() => saveThemePreference(option.value)}
            className={`flex size-8 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
              active
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            }`}
          >
            {option.icon}
          </button>
        );
      })}
    </div>
  );
}

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function SunIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
