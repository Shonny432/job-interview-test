import type { LevelId, Question, TopicId } from "./types";

import layoutJunior from "@/data/ru/layout/junior";
import layoutMiddle from "@/data/ru/layout/middle";
import layoutSenior from "@/data/ru/layout/senior";
import javascriptJunior from "@/data/ru/javascript/junior";
import javascriptMiddle from "@/data/ru/javascript/middle";
import javascriptSenior from "@/data/ru/javascript/senior";
import reactJunior from "@/data/ru/react/junior";
import reactMiddle from "@/data/ru/react/middle";
import reactSenior from "@/data/ru/react/senior";
import nextjsJunior from "@/data/ru/nextjs/junior";
import nextjsMiddle from "@/data/ru/nextjs/middle";
import nextjsSenior from "@/data/ru/nextjs/senior";
import typescriptJunior from "@/data/ru/typescript/junior";
import typescriptMiddle from "@/data/ru/typescript/middle";
import typescriptSenior from "@/data/ru/typescript/senior";

export const topicIds = ["layout", "javascript", "react", "nextjs", "typescript"] as const satisfies readonly TopicId[];
export const levelIds = ["junior", "middle", "senior"] as const satisfies readonly LevelId[];

const questions: Record<TopicId, Record<LevelId, Question[]>> = {
  layout: { junior: layoutJunior, middle: layoutMiddle, senior: layoutSenior },
  javascript: { junior: javascriptJunior, middle: javascriptMiddle, senior: javascriptSenior },
  react: { junior: reactJunior, middle: reactMiddle, senior: reactSenior },
  nextjs: { junior: nextjsJunior, middle: nextjsMiddle, senior: nextjsSenior },
  typescript: { junior: typescriptJunior, middle: typescriptMiddle, senior: typescriptSenior },
};

export function isTopicId(value: string): value is TopicId {
  return (topicIds as readonly string[]).includes(value);
}

export function isLevelId(value: string): value is LevelId {
  return (levelIds as readonly string[]).includes(value);
}

export function getQuestions(topic: TopicId, level: LevelId): Question[] {
  return questions[topic][level];
}
