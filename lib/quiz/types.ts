import type { ResolvedSource, SourceKey } from "./sources";

export type TopicId =
  | "layout"
  | "javascript"
  | "react"
  | "state-management"
  | "nextjs"
  | "typescript"
  | "patterns"
  | "system-design";
export type LevelId = "junior" | "middle" | "senior";

export type AnswerIndex = 0 | 1 | 2;

export type Question = {
  /** Текст вопроса. Фрагменты в `обратных кавычках` рендерятся как код. */
  question: string;
  /** Необязательный блок кода к вопросу. */
  code?: string;
  /** Ровно три варианта ответа. */
  options: [string, string, string];
  /** Индекс правильного варианта в `options`. */
  answer: AnswerIndex;
  /** Объяснение: почему верный ответ верный, а остальные — нет. */
  explanation: string;
  /** Ключи из реестра литературы `sources.ts`. */
  sources: SourceKey[];
};

/** Вопрос, готовый к передаче в клиентский компонент: ссылки уже развёрнуты из реестра. */
export type ResolvedQuestion = Omit<Question, "sources"> & { sources: ResolvedSource[] };
