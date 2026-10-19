import { useSyncExternalStore } from "react";
import type { LevelId, TopicId } from "./types";

export type BestScore = { correct: number; total: number };

const CHANGE_EVENT = "best-score-change";
const storageKey = (topic: TopicId, level: LevelId) => `quiz:best:${topic}:${level}`;

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/** Лучший результат по теме и уровню (null — ещё не проходили или до гидрации). */
export function useBestScore(topic: TopicId, level: LevelId): BestScore | null {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(storageKey(topic, level)),
    () => null,
  );
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BestScore;
  } catch {
    return null;
  }
}

/** Сохраняет результат, если он лучше предыдущего (по доле правильных ответов). */
export function saveBestScore(topic: TopicId, level: LevelId, score: BestScore) {
  const key = storageKey(topic, level);
  try {
    const prevRaw = localStorage.getItem(key);
    const prev = prevRaw ? (JSON.parse(prevRaw) as BestScore) : null;
    if (prev && prev.correct / prev.total >= score.correct / score.total) return;
    localStorage.setItem(key, JSON.stringify(score));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // localStorage недоступен (приватный режим и т.п.) — просто не сохраняем
  }
}
