import type { LevelId, TopicId } from "@/lib/quiz/types";

/** Строки интерфейса. Для английской версии достаточно добавить en.ts той же формы. */
export const ru = {
  appTitle: "Frontend Interview Trainer",
  appSubtitle:
    "Тренажёр для подготовки к собеседованию на позицию frontend-разработчика. Выберите тему и уровень — в каждом по 50 вопросов.",
  questionsCount: (n: number) => `${n} ${plural(n, "вопрос", "вопроса", "вопросов")}`,
  bestScore: "Лучший результат",
  notTaken: "Ещё не проходили",
  backToTopics: "← Все темы",

  theme: {
    label: "Тема оформления",
    light: "Светлая тема",
    dark: "Тёмная тема",
    system: "Как в системе",
  },

  topics: {
    layout: {
      title: "Вёрстка",
      description: "HTML, CSS, Flexbox, Grid, Tailwind, адаптивность, доступность и производительность стилей.",
      tags: ["HTML", "CSS", "Flexbox", "Grid", "Tailwind"],
    },
    javascript: {
      title: "JavaScript",
      description: "Нативный JS: типы, замыкания, this, прототипы, асинхронность и event loop, DOM и браузерные API.",
      tags: ["Closures", "Event loop", "Promises", "Prototypes", "DOM"],
    },
    react: {
      title: "React",
      description: "Компоненты, хуки, рендеринг, Context, lazy loading, Redux Toolkit и TanStack Query.",
      tags: ["Hooks", "Context", "Redux Toolkit", "TanStack Query", "Lazy"],
    },
    nextjs: {
      title: "Next.js",
      description: "App Router, Server и Client Components, рендеринг, кэширование, Server Actions, Next.js 16.",
      tags: ["App Router", "RSC", "Caching", "Server Actions"],
    },
    typescript: {
      title: "TypeScript",
      description: "Типы, дженерики, сужение, утилитарные и условные типы, конфигурация и типизация React.",
      tags: ["Generics", "Narrowing", "Utility types", "tsconfig"],
    },
    patterns: {
      title: "Паттерны проектирования",
      description: "GoF-паттерны в JS и React, SOLID, DRY/KISS/YAGNI, архитектурные подходы: MVC, Flux, FSD, Clean Architecture.",
      tags: ["GoF", "SOLID", "Architecture", "FSD", "Anti-patterns"],
    },
    "system-design": {
      title: "System Design",
      description: "Проектирование фронтенда и веб-систем: рендеринг, API, кэширование, авторизация, real-time, масштабирование, деплой.",
      tags: ["Caching", "API", "Auth", "Real-time", "Scalability"],
    },
  } satisfies Record<TopicId, { title: string; description: string; tags: string[] }>,

  levels: {
    junior: { title: "Junior", description: "Базовые понятия и синтаксис" },
    middle: { title: "Middle", description: "Практика, нюансы и оптимизация" },
    senior: { title: "Senior", description: "Архитектура, внутреннее устройство, edge cases" },
  } satisfies Record<LevelId, { title: string; description: string }>,

  quiz: {
    introTitle: (topic: string, level: string) => `${topic} · ${level}`,
    introText: (n: number) =>
      `Вас ждёт ${n} ${plural(n, "вопрос", "вопроса", "вопросов")} с тремя вариантами ответа. Порядок вопросов и вариантов перемешивается при каждом прохождении.`,
    introHint: "Подсказка: выбирать ответ можно клавишами 1, 2, 3, а переходить дальше — Enter.",
    start: "Начать тест",
    questionOf: (i: number, n: number) => `Вопрос ${i} из ${n}`,
    score: (n: number) => `Верно: ${n}`,
    correct: "Правильно!",
    wrong: "Неправильно",
    correctAnswerIs: "Правильный ответ:",
    whyLabel: "Объяснение",
    showExplanation: "Показать объяснение",
    readMore: "Где почитать",
    next: "Следующий вопрос",
    finish: "Посмотреть результат",
    resultTitle: "Тест завершён",
    resultScore: (c: number, n: number) => `${c} из ${n}`,
    resultPercent: (p: number) => `${p}% правильных ответов`,
    verdict: (p: number) =>
      p >= 90
        ? "Отлично! Тема освоена на уверенном уровне."
        : p >= 70
          ? "Хороший результат. Повторите темы с ошибками — и будет отлично."
          : p >= 50
            ? "Неплохо, но есть пробелы. Разберите ошибки и пройдите тест ещё раз."
            : "Стоит подтянуть теорию: разберите ошибки и почитайте рекомендованные материалы.",
    restart: "Пройти заново",
    retryMistakes: (n: number) => `Пройти только ошибки (${n})`,
    otherTopic: "Выбрать другую тему",
    mistakesTitle: "Разбор ошибок",
    noMistakes: "Ошибок нет — ни одного неверного ответа!",
    yourAnswer: "Ваш ответ:",
    mistakesMode: "Режим работы над ошибками",
  },
};

export type Dictionary = typeof ru;

function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}
