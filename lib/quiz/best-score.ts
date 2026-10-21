import { useSyncExternalStore } from "react";
import { getAuthState, subscribeAuth } from "@/lib/auth/session";
import { getSupabase } from "@/lib/supabase/client";
import type { LevelId, TopicId } from "./types";

export type BestScore = { correct: number; total: number };

/**
 * Где лежит прогресс:
 * - гость — localStorage этого браузера;
 * - вошедший пользователь — таблица quiz_progress в Supabase (загружается целиком при входе).
 * При входе гостевые результаты переносятся в аккаунт и удаляются из localStorage,
 * чтобы на общем компьютере они не попали в чужой аккаунт.
 */

const CHANGE_EVENT = "best-score-change";
const LOCAL_PREFIX = "quiz:best:";
const storageKey = (topic: TopicId, level: LevelId) => `${LOCAL_PREFIX}${topic}:${level}`;

/** Результаты аккаунта; scores = null, пока идёт загрузка. Значения — строки "correct/total". */
let account: { userId: string; scores: Map<string, string> | null } | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

// ---------- localStorage (гость) ----------

function readLocal(key: string): BestScore | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as BestScore) : null;
  } catch {
    return null;
  }
}

function writeLocal(key: string, score: BestScore) {
  try {
    localStorage.setItem(key, JSON.stringify(score));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — просто не сохраняем
  }
}

function readAllLocal() {
  const result: { key: string; topic: string; level: string; correct: number; total: number }[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(LOCAL_PREFIX)) continue;
      const [topic, level] = key.slice(LOCAL_PREFIX.length).split(":");
      const score = readLocal(key);
      if (topic && level && score) result.push({ key, topic, level, ...score });
    }
  } catch {
    // localStorage недоступен — переносить нечего
  }
  return result;
}

// ---------- Supabase (аккаунт) ----------

async function loadAccount(userId: string) {
  const supabase = getSupabase();
  if (!supabase) return;

  const local = readAllLocal();
  if (local.length > 0) {
    const scores = local.map(({ topic, level, correct, total }) => ({ topic, level, correct, total }));
    const { error } = await supabase.rpc("save_best_scores", { scores });
    if (error) console.error("Failed to merge local progress", error);
    else local.forEach(({ key }) => localStorage.removeItem(key));
  }

  const { data, error } = await supabase.from("quiz_progress").select("topic, level, correct, total");
  if (error) console.error("Failed to load progress", error);
  // Пока грузили, пользователь мог выйти или смениться
  if (account?.userId !== userId) return;

  const scores = new Map<string, string>();
  for (const row of data ?? []) scores.set(storageKey(row.topic, row.level), `${row.correct}/${row.total}`);
  account = { userId, scores };
  notify();
}

function onAuthChange() {
  const auth = getAuthState();
  if (auth.status !== "signed-in") {
    if (account) {
      account = null;
      notify();
    }
    return;
  }
  if (account?.userId === auth.user.id) return;
  account = { userId: auth.user.id, scores: null };
  notify();
  void loadAccount(auth.user.id);
}

// ---------- React ----------

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  const unsubscribeAuth = subscribeAuth(() => {
    onAuthChange();
    onChange();
  });
  onAuthChange();
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
    unsubscribeAuth();
  };
}

/** Снимок — строка "correct/total", null (нет результата) или undefined (ещё неизвестно). */
function getSnapshot(key: string): string | null | undefined {
  const auth = getAuthState();
  if (auth.status === "loading") return undefined;
  if (auth.status === "signed-in") {
    if (account?.userId !== auth.user.id || !account.scores) return undefined;
    return account.scores.get(key) ?? null;
  }
  const local = readLocal(key);
  return local ? `${local.correct}/${local.total}` : null;
}

/**
 * Лучший результат по теме и уровню: null — ещё не проходили,
 * undefined — пока неизвестно (до гидратации или во время загрузки из аккаунта).
 */
export function useBestScore(topic: TopicId, level: LevelId): BestScore | null | undefined {
  const key = storageKey(topic, level);
  const snapshot = useSyncExternalStore(
    subscribe,
    () => getSnapshot(key),
    () => undefined,
  );
  if (snapshot == null) return snapshot;
  const [correct, total] = snapshot.split("/").map(Number);
  return { correct, total };
}

const isBetter = (next: BestScore, prev: BestScore | null) =>
  !prev || next.correct / next.total > prev.correct / prev.total;

/** Сохраняет результат, если он лучше предыдущего (по доле правильных ответов). */
export function saveBestScore(topic: TopicId, level: LevelId, score: BestScore) {
  const key = storageKey(topic, level);
  const auth = getAuthState();

  if (auth.status !== "signed-in") {
    if (isBetter(score, readLocal(key))) writeLocal(key, score);
    return;
  }

  // Сразу показываем новый результат, а сервер сам решит, лучше ли он сохранённого
  if (account?.userId === auth.user.id && account.scores) {
    const prevRaw = account.scores.get(key);
    const [correct, total] = prevRaw ? prevRaw.split("/").map(Number) : [];
    if (isBetter(score, prevRaw ? { correct, total } : null)) {
      account = { ...account, scores: new Map(account.scores).set(key, `${score.correct}/${score.total}`) };
      notify();
    }
  }
  void getSupabase()
    ?.rpc("save_best_scores", { scores: [{ topic, level, ...score }] })
    .then(({ error }) => {
      if (!error) return;
      console.error("Failed to save progress", error);
      // Не теряем результат: он перенесётся в аккаунт при следующем входе
      if (isBetter(score, readLocal(key))) writeLocal(key, score);
    });
}
