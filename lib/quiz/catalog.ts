import type { Locale } from "@/lib/i18n/locales";
import type { LevelId, Question, TopicId } from "./types";

import ruLayoutJunior from "@/data/ru/layout/junior";
import ruLayoutMiddle from "@/data/ru/layout/middle";
import ruLayoutSenior from "@/data/ru/layout/senior";
import ruJavascriptJunior from "@/data/ru/javascript/junior";
import ruJavascriptMiddle from "@/data/ru/javascript/middle";
import ruJavascriptSenior from "@/data/ru/javascript/senior";
import ruReactJunior from "@/data/ru/react/junior";
import ruReactMiddle from "@/data/ru/react/middle";
import ruReactSenior from "@/data/ru/react/senior";
import ruNextjsJunior from "@/data/ru/nextjs/junior";
import ruNextjsMiddle from "@/data/ru/nextjs/middle";
import ruNextjsSenior from "@/data/ru/nextjs/senior";
import ruTypescriptJunior from "@/data/ru/typescript/junior";
import ruTypescriptMiddle from "@/data/ru/typescript/middle";
import ruTypescriptSenior from "@/data/ru/typescript/senior";
import ruPatternsJunior from "@/data/ru/patterns/junior";
import ruPatternsMiddle from "@/data/ru/patterns/middle";
import ruPatternsSenior from "@/data/ru/patterns/senior";
import ruSystemDesignJunior from "@/data/ru/system-design/junior";
import ruSystemDesignMiddle from "@/data/ru/system-design/middle";
import ruSystemDesignSenior from "@/data/ru/system-design/senior";
import ukLayoutJunior from "@/data/uk/layout/junior";
import ukLayoutMiddle from "@/data/uk/layout/middle";
import ukLayoutSenior from "@/data/uk/layout/senior";
import ukJavascriptJunior from "@/data/uk/javascript/junior";
import ukJavascriptMiddle from "@/data/uk/javascript/middle";
import ukJavascriptSenior from "@/data/uk/javascript/senior";
import ukReactJunior from "@/data/uk/react/junior";
import ukReactMiddle from "@/data/uk/react/middle";
import ukReactSenior from "@/data/uk/react/senior";
import ukNextjsJunior from "@/data/uk/nextjs/junior";
import ukNextjsMiddle from "@/data/uk/nextjs/middle";
import ukNextjsSenior from "@/data/uk/nextjs/senior";
import ukTypescriptJunior from "@/data/uk/typescript/junior";
import ukTypescriptMiddle from "@/data/uk/typescript/middle";
import ukTypescriptSenior from "@/data/uk/typescript/senior";
import ukPatternsJunior from "@/data/uk/patterns/junior";
import ukPatternsMiddle from "@/data/uk/patterns/middle";
import ukPatternsSenior from "@/data/uk/patterns/senior";
import ukSystemDesignJunior from "@/data/uk/system-design/junior";
import ukSystemDesignMiddle from "@/data/uk/system-design/middle";
import ukSystemDesignSenior from "@/data/uk/system-design/senior";
import enLayoutJunior from "@/data/en/layout/junior";
import enLayoutMiddle from "@/data/en/layout/middle";
import enLayoutSenior from "@/data/en/layout/senior";
import enJavascriptJunior from "@/data/en/javascript/junior";
import enJavascriptMiddle from "@/data/en/javascript/middle";
import enJavascriptSenior from "@/data/en/javascript/senior";
import enReactJunior from "@/data/en/react/junior";
import enReactMiddle from "@/data/en/react/middle";
import enReactSenior from "@/data/en/react/senior";
import enNextjsJunior from "@/data/en/nextjs/junior";
import enNextjsMiddle from "@/data/en/nextjs/middle";
import enNextjsSenior from "@/data/en/nextjs/senior";
import enTypescriptJunior from "@/data/en/typescript/junior";
import enTypescriptMiddle from "@/data/en/typescript/middle";
import enTypescriptSenior from "@/data/en/typescript/senior";
import enPatternsJunior from "@/data/en/patterns/junior";
import enPatternsMiddle from "@/data/en/patterns/middle";
import enPatternsSenior from "@/data/en/patterns/senior";
import enSystemDesignJunior from "@/data/en/system-design/junior";
import enSystemDesignMiddle from "@/data/en/system-design/middle";
import enSystemDesignSenior from "@/data/en/system-design/senior";

export const topicIds = [
  "layout",
  "javascript",
  "react",
  "nextjs",
  "typescript",
  "patterns",
  "system-design",
] as const satisfies readonly TopicId[];
export const levelIds = ["junior", "middle", "senior"] as const satisfies readonly LevelId[];

// Импорты статические: модуль используется только в серверных компонентах,
// поэтому вопросы не попадают в клиентский бандл целиком.
const questions: Record<Locale, Record<TopicId, Record<LevelId, Question[]>>> = {
  ru: {
    layout: { junior: ruLayoutJunior, middle: ruLayoutMiddle, senior: ruLayoutSenior },
    javascript: { junior: ruJavascriptJunior, middle: ruJavascriptMiddle, senior: ruJavascriptSenior },
    react: { junior: ruReactJunior, middle: ruReactMiddle, senior: ruReactSenior },
    nextjs: { junior: ruNextjsJunior, middle: ruNextjsMiddle, senior: ruNextjsSenior },
    typescript: { junior: ruTypescriptJunior, middle: ruTypescriptMiddle, senior: ruTypescriptSenior },
    patterns: { junior: ruPatternsJunior, middle: ruPatternsMiddle, senior: ruPatternsSenior },
    "system-design": { junior: ruSystemDesignJunior, middle: ruSystemDesignMiddle, senior: ruSystemDesignSenior },
  },
  uk: {
    layout: { junior: ukLayoutJunior, middle: ukLayoutMiddle, senior: ukLayoutSenior },
    javascript: { junior: ukJavascriptJunior, middle: ukJavascriptMiddle, senior: ukJavascriptSenior },
    react: { junior: ukReactJunior, middle: ukReactMiddle, senior: ukReactSenior },
    nextjs: { junior: ukNextjsJunior, middle: ukNextjsMiddle, senior: ukNextjsSenior },
    typescript: { junior: ukTypescriptJunior, middle: ukTypescriptMiddle, senior: ukTypescriptSenior },
    patterns: { junior: ukPatternsJunior, middle: ukPatternsMiddle, senior: ukPatternsSenior },
    "system-design": { junior: ukSystemDesignJunior, middle: ukSystemDesignMiddle, senior: ukSystemDesignSenior },
  },
  en: {
    layout: { junior: enLayoutJunior, middle: enLayoutMiddle, senior: enLayoutSenior },
    javascript: { junior: enJavascriptJunior, middle: enJavascriptMiddle, senior: enJavascriptSenior },
    react: { junior: enReactJunior, middle: enReactMiddle, senior: enReactSenior },
    nextjs: { junior: enNextjsJunior, middle: enNextjsMiddle, senior: enNextjsSenior },
    typescript: { junior: enTypescriptJunior, middle: enTypescriptMiddle, senior: enTypescriptSenior },
    patterns: { junior: enPatternsJunior, middle: enPatternsMiddle, senior: enPatternsSenior },
    "system-design": { junior: enSystemDesignJunior, middle: enSystemDesignMiddle, senior: enSystemDesignSenior },
  },
};

export function isTopicId(value: string): value is TopicId {
  return (topicIds as readonly string[]).includes(value);
}

export function isLevelId(value: string): value is LevelId {
  return (levelIds as readonly string[]).includes(value);
}

export function getQuestions(locale: Locale, topic: TopicId, level: LevelId): Question[] {
  return questions[locale][topic][level];
}
