import type { Dictionary } from "./ru";

const questions = (n: number) => `${n} ${n === 1 ? "question" : "questions"}`;

export const en: Dictionary = {
  appTitle: "Frontend Interview Trainer",
  appSubtitle:
    "Practice for your frontend developer interview. Pick a topic and a level — each has 50 questions.",
  questionsCount: questions,
  bestScore: "Best score",
  notTaken: "Not taken yet",
  backToTopics: "← All topics",

  language: { label: "Interface language" },

  progress: {
    label: "Save quiz progress",
    hint: "If you close the tab or browser, the quiz resumes from the same question",
  },

  auth: {
    signIn: "Sign in",
    signInHint: "Sign in to keep your progress across devices",
    withGithub: "With GitHub",
    withGoogle: "With Google",
    signOut: "Sign out",
    account: "Account",
  },

  theme: {
    label: "Color theme",
    light: "Light theme",
    dark: "Dark theme",
    system: "Match system",
  },

  topics: {
    layout: {
      title: "HTML & CSS",
      description: "HTML, CSS, Flexbox, Grid, Tailwind, responsive design, accessibility and styling performance.",
      tags: ["HTML", "CSS", "Flexbox", "Grid", "Tailwind"],
    },
    javascript: {
      title: "JavaScript",
      description: "Vanilla JS: types, closures, this, prototypes, async code and the event loop, DOM and browser APIs.",
      tags: ["Closures", "Event loop", "Promises", "Prototypes", "DOM"],
    },
    react: {
      title: "React",
      description: "Components, hooks, rendering, Context, lazy loading, Redux Toolkit and TanStack Query.",
      tags: ["Hooks", "Context", "Redux Toolkit", "TanStack Query", "Lazy"],
    },
    "state-management": {
      title: "State management",
      description: "useState and useReducer, prop drilling, Context, Redux Toolkit, Zustand, and server state with TanStack Query, RTK Query, SWR and React Router loaders/actions.",
      tags: ["useState", "useReducer", "Context", "Redux Toolkit", "Zustand", "TanStack Query", "RTK Query", "SWR", "React Router"],
    },
    nextjs: {
      title: "Next.js",
      description: "App Router, Server and Client Components, rendering, caching, Server Actions, Next.js 16.",
      tags: ["App Router", "RSC", "Caching", "Server Actions"],
    },
    typescript: {
      title: "TypeScript",
      description: "Types, generics, narrowing, utility and conditional types, configuration and typing React.",
      tags: ["Generics", "Narrowing", "Utility types", "tsconfig"],
    },
    patterns: {
      title: "Design Patterns",
      description: "GoF patterns in JS and React, SOLID, DRY/KISS/YAGNI, architecture approaches: MVC, Flux, FSD, Clean Architecture.",
      tags: ["GoF", "SOLID", "Architecture", "FSD", "Anti-patterns"],
    },
    "system-design": {
      title: "System Design",
      description: "Designing frontends and web systems: rendering, APIs, caching, auth, real-time, scalability, deployment.",
      tags: ["Caching", "API", "Auth", "Real-time", "Scalability"],
    },
  },

  levels: {
    junior: { title: "Junior", description: "Core concepts and syntax" },
    middle: { title: "Middle", description: "Practice, nuances and optimization" },
    senior: { title: "Senior", description: "Architecture, internals, edge cases" },
  },

  quiz: {
    introTitle: (topic: string, level: string) => `${topic} · ${level}`,
    introText: (n: number) =>
      `${questions(n)} with three answer options each. Questions and options are shuffled on every attempt.`,
    introHint: "Tip: pick an answer with keys 1, 2, 3 and press Enter to continue.",
    start: "Start the quiz",
    questionOf: (i: number, n: number) => `Question ${i} of ${n}`,
    score: (n: number) => `Correct: ${n}`,
    correct: "Correct!",
    wrong: "Wrong",
    correctAnswerIs: "Correct answer:",
    whyLabel: "Explanation",
    showExplanation: "Show explanation",
    readMore: "Further reading",
    next: "Next question",
    finish: "See results",
    resultTitle: "Quiz complete",
    resultScore: (c: number, n: number) => `${c} of ${n}`,
    resultPercent: (p: number) => `${p}% correct answers`,
    verdict: (p: number) =>
      p >= 90
        ? "Excellent! You know this topic well."
        : p >= 70
          ? "Good result. Review the topics you missed and you'll nail it."
          : p >= 50
            ? "Not bad, but there are gaps. Go through your mistakes and try again."
            : "Worth brushing up on the theory: review your mistakes and read the recommended materials.",
    restart: "Try again",
    retryMistakes: (n: number) => `Retry mistakes only (${n})`,
    otherTopic: "Choose another topic",
    mistakesTitle: "Your mistakes",
    noMistakes: "No mistakes — not a single wrong answer!",
    yourAnswer: "Your answer:",
    mistakesMode: "Mistakes review mode",
    restartAttempt: "Start over",
    restartConfirm: "Start the quiz over? Your current progress will be lost.",
  },
};
