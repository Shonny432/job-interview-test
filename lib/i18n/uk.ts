import { slavicPlural as plural } from "./plural";
import type { Dictionary } from "./ru";

export const uk: Dictionary = {
  appTitle: "Frontend Interview Trainer",
  appSubtitle:
    "Тренажер для підготовки до співбесіди на позицію frontend-розробника. Оберіть тему та рівень — у кожному по 50 запитань.",
  questionsCount: (n: number) => `${n} ${plural(n, "запитання", "запитання", "запитань")}`,
  bestScore: "Найкращий результат",
  notTaken: "Ще не проходили",
  backToTopics: "← Усі теми",

  language: { label: "Мова інтерфейсу" },

  progress: {
    label: "Зберігати процес проходження тесту",
    hint: "Якщо закрити вкладку чи браузер, тест продовжиться з того самого запитання",
  },

  feedback: {
    open: "Зворотний зв'язок",
    title: "Зворотний зв'язок",
    intro: "Знайшли баг або маєте ідею, як зробити сайт кращим? Напишіть — я читаю кожне повідомлення.",
    kindLabel: "Тип повідомлення",
    kinds: { bug: "Баг", idea: "Ідея" },
    messageLabel: "Повідомлення",
    bugPlaceholder: "Що сталося і як це відтворити?",
    ideaPlaceholder: "Що хотілося б додати чи змінити?",
    emailLabel: "Email для відповіді (необов'язково)",
    emailHint: "Вкажіть, якщо хочете отримати відповідь",
    submit: "Надіслати",
    sending: "Надсилання…",
    cancel: "Скасувати",
    close: "Закрити",
    success: "Дякуємо! Повідомлення надіслано.",
    error: "Не вдалося надіслати повідомлення. Спробуйте ще раз трохи згодом.",
    cooldown: "Повідомлення вже надіслано нещодавно. Спробуйте ще раз за хвилину.",
  },

  auth: {
    signIn: "Увійти",
    signInHint: "Увійдіть, щоб прогрес зберігався на всіх пристроях",
    withGithub: "Через GitHub",
    withGoogle: "Через Google",
    signOut: "Вийти",
    account: "Обліковий запис",
  },

  theme: {
    label: "Тема оформлення",
    light: "Світла тема",
    dark: "Темна тема",
    system: "Як у системі",
  },

  topics: {
    layout: {
      title: "Верстка",
      description: "HTML, CSS, Flexbox, Grid, Tailwind, адаптивність, доступність і продуктивність стилів.",
      tags: ["HTML", "CSS", "Flexbox", "Grid", "Tailwind"],
    },
    javascript: {
      title: "JavaScript",
      description: "Нативний JS: типи, замикання, this, прототипи, асинхронність і event loop, DOM та браузерні API.",
      tags: ["Closures", "Event loop", "Promises", "Prototypes", "DOM"],
    },
    react: {
      title: "React",
      description: "Компоненти, хуки, рендеринг, Context, lazy loading, Redux Toolkit і TanStack Query.",
      tags: ["Hooks", "Context", "Redux Toolkit", "TanStack Query", "Lazy"],
    },
    "state-management": {
      title: "Керування станом",
      description: "useState і useReducer, prop drilling, Context, Redux Toolkit, Zustand, а також серверний стан: TanStack Query, RTK Query, SWR і loader/action у React Router.",
      tags: ["useState", "useReducer", "Context", "Redux Toolkit", "Zustand", "TanStack Query", "RTK Query", "SWR", "React Router"],
    },
    nextjs: {
      title: "Next.js",
      description: "App Router, Server і Client Components, рендеринг, кешування, Server Actions, Next.js 16.",
      tags: ["App Router", "RSC", "Caching", "Server Actions"],
    },
    typescript: {
      title: "TypeScript",
      description: "Типи, дженерики, звуження, утилітарні та умовні типи, конфігурація і типізація React.",
      tags: ["Generics", "Narrowing", "Utility types", "tsconfig"],
    },
    patterns: {
      title: "Патерни проєктування",
      description: "GoF-патерни в JS і React, SOLID, DRY/KISS/YAGNI, архітектурні підходи: MVC, Flux, FSD, Clean Architecture.",
      tags: ["GoF", "SOLID", "Architecture", "FSD", "Anti-patterns"],
    },
    "system-design": {
      title: "System Design",
      description: "Проєктування фронтенду та вебсистем: рендеринг, API, кешування, авторизація, real-time, масштабування, деплой.",
      tags: ["Caching", "API", "Auth", "Real-time", "Scalability"],
    },
  },

  levels: {
    junior: { title: "Junior", description: "Базові поняття та синтаксис" },
    middle: { title: "Middle", description: "Практика, нюанси й оптимізація" },
    senior: { title: "Senior", description: "Архітектура, внутрішня будова, edge cases" },
  },

  quiz: {
    introTitle: (topic: string, level: string) => `${topic} · ${level}`,
    introText: (n: number) =>
      `На вас чекає ${n} ${plural(n, "запитання", "запитання", "запитань")} із трьома варіантами відповіді. Порядок запитань і варіантів перемішується під час кожного проходження.`,
    introHint: "Підказка: обирати відповідь можна клавішами 1, 2, 3, а переходити далі — Enter.",
    start: "Почати тест",
    questionOf: (i: number, n: number) => `Запитання ${i} з ${n}`,
    score: (n: number) => `Правильно: ${n}`,
    correct: "Правильно!",
    wrong: "Неправильно",
    correctAnswerIs: "Правильна відповідь:",
    whyLabel: "Пояснення",
    showExplanation: "Показати пояснення",
    readMore: "Де почитати",
    next: "Наступне запитання",
    finish: "Переглянути результат",
    resultTitle: "Тест завершено",
    resultScore: (c: number, n: number) => `${c} з ${n}`,
    resultPercent: (p: number) => `${p}% правильних відповідей`,
    verdict: (p: number) =>
      p >= 90
        ? "Чудово! Тему опановано на впевненому рівні."
        : p >= 70
          ? "Добрий результат. Повторіть теми з помилками — і буде відмінно."
          : p >= 50
            ? "Непогано, але є прогалини. Розберіть помилки й пройдіть тест ще раз."
            : "Варто підтягнути теорію: розберіть помилки й почитайте рекомендовані матеріали.",
    restart: "Пройти знову",
    retryMistakes: (n: number) => `Пройти лише помилки (${n})`,
    otherTopic: "Обрати іншу тему",
    mistakesTitle: "Розбір помилок",
    noMistakes: "Помилок немає — жодної неправильної відповіді!",
    yourAnswer: "Ваша відповідь:",
    mistakesMode: "Режим роботи над помилками",
    restartAttempt: "Почати заново",
    restartConfirm: "Почати тест заново? Поточний прогрес проходження буде втрачено.",
  },
};
