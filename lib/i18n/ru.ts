import type { LevelId, TopicId } from "@/lib/quiz/types";
import { slavicPlural as plural } from "./plural";

/** Строки интерфейса. uk.ts и en.ts повторяют эту форму (тип Dictionary). */
export const ru = {
  appTitle: "Frontend Interview Trainer",
  appSubtitle:
    "Тренажёр для подготовки к собеседованию на позицию frontend-разработчика. Выберите тему и уровень — в каждом по 50 вопросов.",
  questionsCount: (n: number) => `${n} ${plural(n, "вопрос", "вопроса", "вопросов")}`,
  bestScore: "Лучший результат",
  notTaken: "Ещё не проходили",
  backToTopics: "← Все темы",

  language: { label: "Язык интерфейса" },

  progress: {
    label: "Сохранять процесс прохождения теста",
    hint: "Если закрыть вкладку или браузер, тест продолжится с того же вопроса",
  },

  feedback: {
    open: "Обратная связь",
    title: "Обратная связь",
    intro: "Нашли баг или есть идея, как сделать сайт лучше? Напишите — я читаю каждое сообщение.",
    kindLabel: "Тип сообщения",
    kinds: { bug: "Баг", idea: "Идея" },
    messageLabel: "Сообщение",
    bugPlaceholder: "Что произошло и как это повторить?",
    ideaPlaceholder: "Что хотелось бы добавить или изменить?",
    emailLabel: "Email для ответа (необязательно)",
    emailHint: "Укажите, если хотите получить ответ",
    submit: "Отправить",
    sending: "Отправка…",
    cancel: "Отмена",
    close: "Закрыть",
    success: "Спасибо! Сообщение отправлено.",
    error: "Не удалось отправить сообщение. Попробуйте ещё раз чуть позже.",
    cooldown: "Сообщение уже отправлено недавно. Попробуйте ещё раз через минуту.",
  },

  auth: {
    signIn: "Войти",
    signInHint: "Войдите, чтобы прогресс сохранялся на всех устройствах",
    withGithub: "Через GitHub",
    withGoogle: "Через Google",
    signOut: "Выйти",
    account: "Аккаунт",
  },

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
    "state-management": {
      title: "Управление состоянием",
      description: "useState и useReducer, prop drilling, Context, Redux Toolkit, Zustand, а также серверное состояние: TanStack Query, RTK Query, SWR и loader/action в React Router.",
      tags: ["useState", "useReducer", "Context", "Redux Toolkit", "Zustand", "TanStack Query", "RTK Query", "SWR", "React Router"],
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
    verdict: (p: number): string =>
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
    restartAttempt: "Начать заново",
    restartConfirm: "Начать тест заново? Текущий прогресс прохождения будет потерян.",
  },
};

export type Dictionary = typeof ru;

