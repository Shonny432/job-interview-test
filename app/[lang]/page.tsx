import Link from "next/link";
import { BestScoreBadge } from "@/components/best-score-badge";
import { getQuestions, levelIds, topicIds } from "@/lib/quiz/catalog";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";

const topicAccent = {
  layout: "from-sky-500 to-cyan-400",
  javascript: "from-amber-400 to-yellow-300",
  react: "from-indigo-500 to-sky-400",
  nextjs: "from-zinc-800 to-zinc-500 dark:from-zinc-200 dark:to-zinc-400",
  typescript: "from-blue-600 to-blue-400",
  patterns: "from-violet-500 to-fuchsia-400",
  "system-design": "from-emerald-500 to-teal-400",
} as const;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.appTitle}</h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">{t.appSubtitle}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {topicIds.map((topic) => {
          const info = t.topics[topic];
          return (
            <section
              key={topic}
              className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className={`h-1.5 bg-linear-to-r ${topicAccent[topic]}`} />
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-semibold">{info.title}</h2>
                  <p className="text-zinc-600 dark:text-zinc-400">{info.description}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {info.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className="mt-auto flex flex-col gap-2">
                  {levelIds.map((level) => {
                    const levelInfo = t.levels[level];
                    const count = getQuestions(lang, topic, level).length;
                    return (
                      <li key={level}>
                        <Link
                          href={`/${lang}/quiz/${topic}/${level}`}
                          className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 px-4 py-3 transition-colors hover:border-indigo-400 hover:bg-indigo-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-zinc-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/30"
                        >
                          <span className="flex flex-col">
                            <span className="font-medium">{levelInfo.title}</span>
                            <span className="text-sm text-zinc-500 dark:text-zinc-400">
                              {levelInfo.description} · {t.questionsCount(count)}
                            </span>
                          </span>
                          <BestScoreBadge topic={topic} level={level} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
