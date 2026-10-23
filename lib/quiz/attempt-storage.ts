import { useSyncExternalStore } from "react";
import type { LevelId, TopicId } from "./types";

/**
 * Сохранение незавершённой попытки теста в localStorage, чтобы после закрытия вкладки
 * или перезагрузки вернуться к тому же вопросу.
 *
 * Хранятся не тексты, а индексы: порядок вопросов, порядок вариантов, ответы и позиция.
 * Ключ не зависит от языка — вопросы во всех языках идут в одном порядке, поэтому
 * прогресс переживает и смену языка посреди теста.
 */

const ENABLED_KEY = "quiz:resume-enabled";
const ATTEMPT_PREFIX = "quiz:attempt:";
const CHANGE_EVENT = "quiz-attempt-storage-change";

export type SavedAttempt = {
  /** Сколько вопросов в теме и уровне — если изменилось, сохранение устарело. */
  total: number;
  /** Индексы вопросов в порядке попытки. */
  ids: number[];
  /** Для каждого вопроса — исходные индексы вариантов в показанном порядке. */
  orders: [number, number, number][];
  picks: (number | null)[];
  index: number;
  mistakesOnly: boolean;
};

const attemptKey = (topic: TopicId, level: LevelId) => `${ATTEMPT_PREFIX}${topic}:${level}`;

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// ---------- Настройка «сохранять процесс» (по умолчанию включена) ----------

const readEnabled = () => read(ENABLED_KEY) !== "0";

export function isResumeEnabled() {
  return readEnabled();
}

/** null — до гидратации, когда настройка ещё неизвестна. */
export function useResumeEnabled(): boolean | null {
  return useSyncExternalStore(subscribe, readEnabled, () => null);
}

export function setResumeEnabled(enabled: boolean) {
  try {
    if (enabled) {
      localStorage.removeItem(ENABLED_KEY);
    } else {
      localStorage.setItem(ENABLED_KEY, "0");
      // Выключили — не оставляем сохранённые попытки в браузере
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key?.startsWith(ATTEMPT_PREFIX)) localStorage.removeItem(key);
      }
    }
  } catch {
    // localStorage недоступен — настройка действует до перезагрузки
  }
  notify();
}

// ---------- Сохранённая попытка ----------

/** Сырая строка сохранённой попытки (undefined — до гидратации). */
export function useSavedAttemptRaw(topic: TopicId, level: LevelId): string | null | undefined {
  const key = attemptKey(topic, level);
  return useSyncExternalStore(
    subscribe,
    () => (readEnabled() ? read(key) : null),
    () => undefined,
  );
}

export function parseSavedAttempt(raw: string, total: number): SavedAttempt | null {
  try {
    const data = JSON.parse(raw) as SavedAttempt;
    const n = data.ids?.length;
    const valid =
      data.total === total &&
      n > 0 &&
      data.orders?.length === n &&
      data.picks?.length === n &&
      Number.isInteger(data.index) &&
      data.index >= 0 &&
      data.index < n &&
      data.ids.every((id) => Number.isInteger(id) && id >= 0 && id < total) &&
      data.orders.every((o) => o.length === 3 && [...o].sort().join() === "0,1,2") &&
      data.picks.every((p) => p === null || p === 0 || p === 1 || p === 2);
    return valid ? data : null;
  } catch {
    return null;
  }
}

export function saveAttempt(topic: TopicId, level: LevelId, attempt: SavedAttempt) {
  if (!readEnabled()) return;
  try {
    localStorage.setItem(attemptKey(topic, level), JSON.stringify(attempt));
  } catch {
    // Нет места или localStorage недоступен — тест просто не восстановится
  }
}

export function clearAttempt(topic: TopicId, level: LevelId) {
  try {
    localStorage.removeItem(attemptKey(topic, level));
  } catch {
    // localStorage недоступен — нечего очищать
  }
}
