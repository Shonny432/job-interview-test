import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Quiz } from "@/components/quiz";
import { getQuestions, isLevelId, isTopicId, levelIds, topicIds } from "@/lib/quiz/catalog";
import { sources } from "@/lib/quiz/sources";
import type { ResolvedQuestion } from "@/lib/quiz/types";
import { ru } from "@/lib/i18n/ru";

export function generateStaticParams() {
  return topicIds.flatMap((topic) => levelIds.map((level) => ({ topic, level })));
}

async function resolveParams(params: PageProps<"/quiz/[topic]/[level]">["params"]) {
  const { topic, level } = await params;
  if (!isTopicId(topic) || !isLevelId(level)) notFound();
  return { topic, level };
}

export async function generateMetadata({ params }: PageProps<"/quiz/[topic]/[level]">): Promise<Metadata> {
  const { topic, level } = await resolveParams(params);
  return { title: `${ru.topics[topic].title} · ${ru.levels[level].title} — ${ru.appTitle}` };
}

export default async function QuizPage({ params }: PageProps<"/quiz/[topic]/[level]">) {
  const { topic, level } = await resolveParams(params);

  // Разворачиваем ключи литературы на сервере, чтобы не тянуть весь реестр в клиентский бандл
  const questions: ResolvedQuestion[] = getQuestions(topic, level).map((q) => ({
    ...q,
    sources: q.sources.map((key) => sources[key]),
  }));

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="self-start text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        {ru.backToTopics}
      </Link>
      <Quiz
        // key сбрасывает состояние теста при переходе между темами
        key={`${topic}/${level}`}
        topic={topic}
        level={level}
        title={ru.quiz.introTitle(ru.topics[topic].title, ru.levels[level].title)}
        questions={questions}
      />
    </main>
  );
}
