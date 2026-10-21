"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CodeBlock, RichText } from "@/components/rich-text";
import { saveBestScore } from "@/lib/quiz/best-score";
import type { LevelId, ResolvedQuestion, TopicId } from "@/lib/quiz/types";
import { useDictionary, useLocale } from "@/components/i18n-provider";

type Props = {
  topic: TopicId;
  level: LevelId;
  title: string;
  questions: ResolvedQuestion[];
};

/** Вопрос в рамках одной попытки: варианты перемешаны, `answer` пересчитан. */
type Card = ResolvedQuestion & { id: number };

type Attempt = {
  cards: Card[];
  /** Выбранный вариант по каждому вопросу (null — ещё не отвечен). */
  picks: (number | null)[];
  index: number;
  mistakesOnly: boolean;
};

type Phase = "intro" | "playing" | "finished";

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildAttempt(cards: Card[], mistakesOnly: boolean): Attempt {
  const shuffled = shuffle(cards).map((card) => {
    const order = shuffle([0, 1, 2] as const);
    return {
      ...card,
      options: order.map((i) => card.options[i]) as Card["options"],
      answer: order.indexOf(card.answer) as Card["answer"],
    };
  });
  return { cards: shuffled, picks: shuffled.map(() => null), index: 0, mistakesOnly };
}

export function Quiz({ topic, level, title, questions }: Props) {
  const t = useDictionary().quiz;
  const [allCards] = useState<Card[]>(() => questions.map((q, id) => ({ ...q, id })));
  const [phase, setPhase] = useState<Phase>("intro");
  const [attempt, setAttempt] = useState<Attempt | null>(null);

  const start = useCallback(
    (cards: Card[], mistakesOnly = false) => {
      setAttempt(buildAttempt(cards, mistakesOnly));
      setPhase("playing");
      window.scrollTo({ top: 0 });
    },
    [],
  );

  if (phase === "intro" || !attempt) {
    return (
      <div className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{t.introText(allCards.length)}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">{t.introHint}</p>
        <button
          type="button"
          onClick={() => start(allCards)}
          autoFocus
          className="self-start rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {t.start}
        </button>
      </div>
    );
  }

  if (phase === "finished") {
    return (
      <Results
        attempt={attempt}
        onRestart={() => start(allCards)}
        onRetryMistakes={(cards) => start(cards, true)}
      />
    );
  }

  return (
    <QuestionView
      attempt={attempt}
      onPick={(option) =>
        setAttempt((a) => {
          if (!a || a.picks[a.index] !== null) return a;
          const picks = [...a.picks];
          picks[a.index] = option;
          return { ...a, picks };
        })
      }
      onNext={() => {
        if (attempt.index + 1 < attempt.cards.length) {
          setAttempt({ ...attempt, index: attempt.index + 1 });
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        // Лучший результат учитываем только для полного прохождения
        if (!attempt.mistakesOnly) {
          const correct = attempt.cards.filter((c, i) => attempt.picks[i] === c.answer).length;
          saveBestScore(topic, level, { correct, total: attempt.cards.length });
        }
        setPhase("finished");
        window.scrollTo({ top: 0 });
      }}
    />
  );
}

function QuestionView({
  attempt,
  onPick,
  onNext,
}: {
  attempt: Attempt;
  onPick: (option: number) => void;
  onNext: () => void;
}) {
  const t = useDictionary().quiz;
  const { cards, picks, index } = attempt;
  const card = cards[index];
  const picked = picks[index];
  const answered = picked !== null;
  const isCorrect = picked === card.answer;
  const isLast = index + 1 === cards.length;
  const correctSoFar = cards.filter((c, i) => picks[i] === c.answer).length;
  const [explanationOpen, setExplanationOpen] = useState(false);

  // Сбрасываем раскрытое объяснение при переходе к следующему вопросу
  const [prevIndex, setPrevIndex] = useState(index);
  if (prevIndex !== index) {
    setPrevIndex(index);
    setExplanationOpen(false);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!answered && ["1", "2", "3"].includes(e.key)) {
        onPick(Number(e.key) - 1);
      } else if (answered && e.key === "Enter" && !(e.target instanceof HTMLButtonElement)) {
        onNext();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [answered, onPick, onNext]);

  const showExplanation = answered && (!isCorrect || explanationOpen);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <span>{t.questionOf(index + 1, cards.length)}</span>
          <span>{t.score(correctSoFar)}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-indigo-500 transition-[width] duration-300"
            style={{ width: `${((index + (answered ? 1 : 0)) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        {attempt.mistakesOnly && (
          <span className="self-start rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            {t.mistakesMode}
          </span>
        )}
        <h2 className="text-lg font-semibold leading-snug sm:text-xl">
          <RichText text={card.question} />
        </h2>
        {card.code && <CodeBlock code={card.code} />}

        <ul className="flex flex-col gap-3">
          {card.options.map((option, i) => {
            const state = !answered
              ? "idle"
              : i === card.answer
                ? "correct"
                : i === picked
                  ? "wrong"
                  : "muted";
            return (
              <li key={i}>
                <button
                  type="button"
                  disabled={answered}
                  onClick={() => onPick(i)}
                  className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${optionClasses[state]}`}
                >
                  <span
                    className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${badgeClasses[state]}`}
                  >
                    {state === "correct" ? "✓" : state === "wrong" ? "✕" : i + 1}
                  </span>
                  <span className="leading-relaxed">
                    <RichText text={option} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {answered && (
          <div
            role="status"
            className={`flex flex-col gap-4 rounded-xl p-4 sm:p-5 ${
              isCorrect
                ? "bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100"
                : "bg-rose-50 text-rose-950 dark:bg-rose-950/40 dark:text-rose-100"
            }`}
          >
            <p className="font-semibold">
              {isCorrect ? t.correct : t.wrong}
              {!isCorrect && (
                <span className="font-normal">
                  {" "}
                  — {t.correctAnswerIs} <RichText text={card.options[card.answer]} />
                </span>
              )}
            </p>

            {showExplanation ? (
              <>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold uppercase tracking-wide opacity-70">{t.whyLabel}</p>
                  <p className="leading-relaxed">
                    <RichText text={card.explanation} />
                  </p>
                </div>
                <Sources sources={card.sources} />
              </>
            ) : (
              <button
                type="button"
                onClick={() => setExplanationOpen(true)}
                className="self-start text-sm font-medium underline underline-offset-4 hover:no-underline"
              >
                {t.showExplanation}
              </button>
            )}
          </div>
        )}

        {answered && (
          <button
            type="button"
            onClick={onNext}
            className="self-end rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {isLast ? t.finish : t.next} →
          </button>
        )}
      </div>
    </div>
  );
}

const optionClasses = {
  idle: "cursor-pointer border-zinc-200 hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-zinc-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/30",
  correct: "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-100",
  wrong: "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950/40 dark:text-rose-100",
  muted: "border-zinc-200 opacity-60 dark:border-zinc-800",
} as const;

const badgeClasses = {
  idle: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  correct: "bg-emerald-500 text-white",
  wrong: "bg-rose-500 text-white",
  muted: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500",
} as const;

function Sources({ sources }: { sources: ResolvedQuestion["sources"] }) {
  const t = useDictionary().quiz;
  if (sources.length === 0) return null;
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-semibold uppercase tracking-wide opacity-70">{t.readMore}</p>
      <ul className="flex flex-col gap-1">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:no-underline"
            >
              {s.title} ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Results({
  attempt,
  onRestart,
  onRetryMistakes,
}: {
  attempt: Attempt;
  onRestart: () => void;
  onRetryMistakes: (cards: Card[]) => void;
}) {
  const t = useDictionary().quiz;
  const locale = useLocale();
  const { cards, picks } = attempt;
  const mistakes = cards
    .map((card, i) => ({ card, picked: picks[i] }))
    .filter(({ card, picked }) => picked !== card.answer);
  const correct = cards.length - mistakes.length;
  const percent = Math.round((correct / cards.length) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">{t.resultTitle}</p>
        <p className="text-5xl font-bold tabular-nums">{t.resultScore(correct, cards.length)}</p>
        <p
          className={`text-lg font-medium ${
            percent >= 80 ? "text-emerald-600 dark:text-emerald-400" : percent >= 50 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"
          }`}
        >
          {t.resultPercent(percent)}
        </p>
        <p className="max-w-md text-zinc-600 dark:text-zinc-400">{t.verdict(percent)}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onRestart}
            autoFocus
            className="rounded-full bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {t.restart}
          </button>
          {mistakes.length > 0 && (
            <button
              type="button"
              onClick={() => onRetryMistakes(mistakes.map((m) => m.card))}
              className="rounded-full border border-zinc-300 px-6 py-3 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              {t.retryMistakes(mistakes.length)}
            </button>
          )}
          <Link
            href={`/${locale}`}
            className="rounded-full border border-zinc-300 px-6 py-3 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            {t.otherTopic}
          </Link>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">{t.mistakesTitle}</h2>
        {mistakes.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">{t.noMistakes}</p>
        ) : (
          mistakes.map(({ card, picked }) => (
            <details
              key={card.id}
              className="group rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <summary className="cursor-pointer list-none font-medium leading-snug marker:hidden">
                <span className="mr-2 inline-block text-zinc-400 transition-transform group-open:rotate-90">▸</span>
                <RichText text={card.question} />
              </summary>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                {card.code && <CodeBlock code={card.code} />}
                <p className="text-rose-700 dark:text-rose-400">
                  <span className="font-semibold">{t.yourAnswer}</span>{" "}
                  {picked !== null && <RichText text={card.options[picked]} />}
                </p>
                <p className="text-emerald-700 dark:text-emerald-400">
                  <span className="font-semibold">{t.correctAnswerIs}</span>{" "}
                  <RichText text={card.options[card.answer]} />
                </p>
                <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <RichText text={card.explanation} />
                </p>
                <Sources sources={card.sources} />
              </div>
            </details>
          ))
        )}
      </section>
    </div>
  );
}
