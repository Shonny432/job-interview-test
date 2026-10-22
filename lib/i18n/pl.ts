import { polishPlural as plural } from "./plural";
import type { Dictionary } from "./ru";

const questions = (n: number) => `${n} ${plural(n, "pytanie", "pytania", "pytań")}`;

export const pl: Dictionary = {
  appTitle: "Frontend Interview Trainer",
  appSubtitle:
    "Trener do przygotowania się do rozmowy rekrutacyjnej na stanowisko frontend developera. Wybierz temat i poziom — w każdym jest 50 pytań.",
  questionsCount: questions,
  bestScore: "Najlepszy wynik",
  notTaken: "Jeszcze nie rozwiązany",
  backToTopics: "← Wszystkie tematy",

  language: { label: "Język interfejsu" },

  auth: {
    signIn: "Zaloguj się",
    signInHint: "Zaloguj się, aby postępy zapisywały się na wszystkich urządzeniach",
    withGithub: "Przez GitHub",
    withGoogle: "Przez Google",
    signOut: "Wyloguj",
    account: "Konto",
  },

  theme: {
    label: "Motyw",
    light: "Jasny motyw",
    dark: "Ciemny motyw",
    system: "Jak w systemie",
  },

  topics: {
    layout: {
      title: "HTML i CSS",
      description: "HTML, CSS, Flexbox, Grid, Tailwind, responsywność, dostępność i wydajność stylów.",
      tags: ["HTML", "CSS", "Flexbox", "Grid", "Tailwind"],
    },
    javascript: {
      title: "JavaScript",
      description: "Czysty JS: typy, domknięcia, this, prototypy, asynchroniczność i event loop, DOM i API przeglądarki.",
      tags: ["Closures", "Event loop", "Promises", "Prototypes", "DOM"],
    },
    react: {
      title: "React",
      description: "Komponenty, hooki, renderowanie, Context, lazy loading, Redux Toolkit i TanStack Query.",
      tags: ["Hooks", "Context", "Redux Toolkit", "TanStack Query", "Lazy"],
    },
    nextjs: {
      title: "Next.js",
      description: "App Router, Server i Client Components, renderowanie, cache, Server Actions, Next.js 16.",
      tags: ["App Router", "RSC", "Caching", "Server Actions"],
    },
    typescript: {
      title: "TypeScript",
      description: "Typy, generyki, zawężanie, typy narzędziowe i warunkowe, konfiguracja i typowanie Reacta.",
      tags: ["Generics", "Narrowing", "Utility types", "tsconfig"],
    },
    patterns: {
      title: "Wzorce projektowe",
      description: "Wzorce GoF w JS i React, SOLID, DRY/KISS/YAGNI, podejścia architektoniczne: MVC, Flux, FSD, Clean Architecture.",
      tags: ["GoF", "SOLID", "Architecture", "FSD", "Anti-patterns"],
    },
    "system-design": {
      title: "System Design",
      description: "Projektowanie frontendu i systemów webowych: renderowanie, API, cache, autoryzacja, real-time, skalowanie, wdrożenia.",
      tags: ["Caching", "API", "Auth", "Real-time", "Scalability"],
    },
  },

  levels: {
    junior: { title: "Junior", description: "Podstawowe pojęcia i składnia" },
    middle: { title: "Middle", description: "Praktyka, niuanse i optymalizacja" },
    senior: { title: "Senior", description: "Architektura, mechanizmy wewnętrzne, przypadki brzegowe" },
  },

  quiz: {
    introTitle: (topic: string, level: string) => `${topic} · ${level}`,
    introText: (n: number) =>
      `${questions(n)}, w każdym trzy warianty odpowiedzi. Pytania i odpowiedzi są tasowane przy każdym podejściu.`,
    introHint: "Wskazówka: wybieraj odpowiedź klawiszami 1, 2, 3, a Enter przechodzi dalej.",
    start: "Rozpocznij test",
    questionOf: (i: number, n: number) => `Pytanie ${i} z ${n}`,
    score: (n: number) => `Poprawnych: ${n}`,
    correct: "Dobrze!",
    wrong: "Źle",
    correctAnswerIs: "Poprawna odpowiedź:",
    whyLabel: "Wyjaśnienie",
    showExplanation: "Pokaż wyjaśnienie",
    readMore: "Do poczytania",
    next: "Następne pytanie",
    finish: "Zobacz wynik",
    resultTitle: "Test zakończony",
    resultScore: (c: number, n: number) => `${c} z ${n}`,
    resultPercent: (p: number) => `${p}% poprawnych odpowiedzi`,
    verdict: (p: number) =>
      p >= 90
        ? "Świetnie! Znasz ten temat bardzo dobrze."
        : p >= 70
          ? "Dobry wynik. Powtórz tematy z błędami i będzie idealnie."
          : p >= 50
            ? "Nieźle, ale są luki. Przejrzyj błędy i spróbuj ponownie."
            : "Warto odświeżyć teorię: przejrzyj błędy i polecane materiały.",
    restart: "Spróbuj ponownie",
    retryMistakes: (n: number) => `Powtórz tylko błędy (${n})`,
    otherTopic: "Wybierz inny temat",
    mistakesTitle: "Twoje błędy",
    noMistakes: "Bez błędów — ani jednej złej odpowiedzi!",
    yourAnswer: "Twoja odpowiedź:",
    mistakesMode: "Tryb powtórki błędów",
  },
};
