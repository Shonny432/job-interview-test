import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Quiz } from "@/components/quiz";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, visibleLocales } from "@/lib/i18n/locales";
import { getQuestions, isLevelId, isTopicId, levelIds, topicIds } from "@/lib/quiz/catalog";
import { sources, type Source } from "@/lib/quiz/sources";
import type { ResolvedQuestion } from "@/lib/quiz/types";

export function generateStaticParams() {
  return topicIds.flatMap((topic) => levelIds.map((level) => ({ topic, level })));
}

type Props = PageProps<"/[lang]/quiz/[topic]/[level]">;

async function resolveParams(params: Props["params"]) {
  const { lang, topic, level } = await params;
  if (!isLocale(lang) || !isTopicId(topic) || !isLevelId(level)) notFound();
  return { lang, topic, level };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, topic, level } = await resolveParams(params);
  const t = getDictionary(lang);
  return {
    title: `${t.topics[topic].title} · ${t.levels[level].title} — ${t.appTitle}`,
    alternates: {
      languages: Object.fromEntries(visibleLocales.map((l) => [l, `/${l}/quiz/${topic}/${level}`])),
    },
  };
}

export default async function QuizPage({ params }: Props) {
  const { lang, topic, level } = await resolveParams(params);
  const t = getDictionary(lang);

  // Разворачиваем ключи литературы на сервере (с учётом языка ссылки),
  // чтобы не тянуть весь реестр в клиентский бандл
  const questions: ResolvedQuestion[] = getQuestions(lang, topic, level).map((q) => ({
    ...q,
    sources: q.sources.map((key) => {
      const source: Source = sources[key];
      return { title: source.title, url: source.urls?.[lang] ?? source.url };
    }),
  }));

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href={`/${lang}`}
        className="self-start text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        {t.backToTopics}
      </Link>
      <Quiz
        // key сбрасывает состояние теста при переходе между темами и языками
        key={`${lang}/${topic}/${level}`}
        topic={topic}
        level={level}
        title={t.quiz.introTitle(t.topics[topic].title, t.levels[level].title)}
        questions={questions}
      />
    </main>
  );
}
