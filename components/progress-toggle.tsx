"use client";

import { useId } from "react";
import { setResumeEnabled, useResumeEnabled } from "@/lib/quiz/attempt-storage";
import { useDictionary } from "@/components/i18n-provider";

/** Переключатель «Сохранять процесс прохождения теста» (по умолчанию включён). */
export function ProgressToggle() {
  const t = useDictionary().progress;
  const enabled = useResumeEnabled();
  const labelId = useId();
  const hintId = useId();
  // До гидратации настройка неизвестна — рисуем выключенным и неактивным
  const on = enabled === true;

  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby={labelId}
        aria-describedby={hintId}
        disabled={enabled === null}
        onClick={() => setResumeEnabled(!on)}
        className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 ${
          on ? "bg-indigo-500" : "bg-zinc-300 dark:bg-zinc-700"
        }`}
      >
        <span
          aria-hidden
          className={`inline-block size-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5.5" : "translate-x-0.5"}`}
        />
      </button>
      <span className="flex flex-col gap-0.5">
        <span id={labelId} className="text-sm font-medium">
          {t.label}
        </span>
        <span id={hintId} className="text-xs text-zinc-500 dark:text-zinc-400">
          {t.hint}
        </span>
      </span>
    </div>
  );
}
