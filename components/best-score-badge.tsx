"use client";

import { useBestScore } from "@/lib/quiz/best-score";
import type { LevelId, TopicId } from "@/lib/quiz/types";
import { ru } from "@/lib/i18n/ru";

export function BestScoreBadge({ topic, level }: { topic: TopicId; level: LevelId }) {
  const best = useBestScore(topic, level);

  if (!best) {
    return <span className="text-xs text-zinc-400 dark:text-zinc-500">{ru.notTaken}</span>;
  }

  const percent = Math.round((best.correct / best.total) * 100);
  const color =
    percent >= 80
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
      : percent >= 50
        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
        : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${color}`} title={ru.bestScore}>
      {best.correct}/{best.total}
    </span>
  );
}
