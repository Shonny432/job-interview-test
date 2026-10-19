import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Что такое пользовательский type guard?",
    code: `function isUser(x: unknown): x is User {
  return typeof x === "object" && x !== null && "id" in x;
}`,
    options: [
      "Функция с типом результата `x is T`, которая сужает тип аргумента при `true`",
      "Декоратор, который проверяет тип аргумента в рантайме при каждом вызове",
      "Синтаксис утверждения типа, эквивалентный записи `x as User` в коде",
    ],
    answer: 0,
    explanation:
      "После `if (isUser(data))` внутри ветки `data` имеет тип `User`. Ответственность за корректность проверки на разработчике: компилятор поверит предикату. С TS 5.5 простые предикаты выводятся автоматически, например у `arr.filter(x => x !== null)`.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Как гарантировать, что `switch` обработал все варианты union?",
    code: `function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2;
    case 'square': return s.size ** 2;
    default: { const _exhaustive: never = s; return _exhaustive; }
  }
}`,
    options: [
      "Присвоить значение в `default` переменной типа `never`",
      "Добавить комментарий `// @ts-exhaustive` перед `switch`",
      "Включить флаг `strictSwitch` в разделе `compilerOptions`",
    ],
    answer: 0,
    explanation:
      "Если добавить новую фигуру в `Shape` и забыть `case`, в `default` останется непустой тип, и присвоение в `never` даст ошибку компиляции. Также помогает флаг `noImplicitReturns` и ESLint-правило `switch-exhaustiveness-check`.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Что означает `<T extends { id: string }>` в дженерике?",
    options: [
      "Ограничение: `T` должен иметь хотя бы свойство `id: string`",
      "`T` наследует класс с полем `id`, как при `class extends`",
      "`T` может быть только ровно `{ id: string }` и ничем другим",
    ],
    answer: 0,
    explanation:
      "Constraint позволяет внутри функции безопасно обращаться к `item.id`, сохраняя полный тип `T` в результате. Передать можно любой объект с подходящим `id` и другими полями. Классы и наследование здесь ни при чём.",
    sources: ["ts-generics"],
  },
  {
    question: "Как типизировать функцию `getProp(obj, key)`, чтобы результат зависел от ключа?",
    options: [
      "`function getProp<T, K extends keyof T>(obj: T, key: K): T[K]`",
      "`function getProp(obj: object, key: string): unknown`",
      "`function getProp<T>(obj: T, key: keyof any): T`",
    ],
    answer: 0,
    explanation:
      "`K extends keyof T` разрешает только существующие ключи, а индексный доступ `T[K]` даёт точный тип значения: `getProp(user, 'age')` → `number`. Вариант с `any` теряет типизацию, а `string` пропустит опечатку.",
    sources: ["ts-keyof", "ts-indexed-access", "ts-generics"],
  },
  {
    question: "Что такое сопоставленный (mapped) тип?",
    code: `type Flags<T> = { [K in keyof T]: boolean };`,
    options: [
      "Тип, который создаёт новые свойства, перебирая ключи другого типа",
      "Тип для объекта `Map` из стандартной библиотеки JavaScript",
      "Тип, который сопоставляет значения объекта в рантайме",
    ],
    answer: 0,
    explanation:
      "`[K in keyof T]` проходит по ключам. Можно менять тип значения, добавлять или убирать модификаторы (`readonly`, `?`, `-?`) и переименовывать ключи через `as`. На mapped types построены `Partial`, `Readonly`, `Record`.",
    sources: ["ts-mapped"],
  },
  {
    question: "Что делает условный тип `T extends string ? 'text' : 'other'`?",
    options: [
      "Выбирает один из типов в зависимости от того, совместим ли `T` со `string`",
      "Проверяет в рантайме, является ли значение строкой, и бросает ошибку",
      "Объявляет, что `T` наследуется от встроенного класса `String`",
    ],
    answer: 0,
    explanation:
      "Условные типы — «тернарник» на уровне типов. Вместе с `infer` они позволяют извлекать части типов. Применённые к union, они распределяются по каждому члену (distributive conditional types).",
    sources: ["ts-conditional"],
  },
  {
    question: "Что делает `infer` в `type ElementType<T> = T extends (infer U)[] ? U : never`?",
    options: [
      "Объявляет переменную типа `U`, которую TS выводит из совпадения с шаблоном",
      "Запрашивает тип элемента массива у компилятора во время выполнения",
      "Делает `U` необязательным параметром дженерика со значением `unknown`",
    ],
    answer: 0,
    explanation:
      "`infer` используется только в `extends`-части условного типа: TS сопоставляет `T` с шаблоном и «захватывает» нужную часть. `ElementType<string[]>` → `string`. Так устроены `ReturnType`, `Parameters`, `Awaited`.",
    sources: ["ts-conditional"],
  },
  {
    question: "Что вернёт `Awaited<Promise<Promise<number>>>`?",
    options: ["`number`", "`Promise<number>`", "`Promise<Promise<number>>`"],
    answer: 0,
    explanation:
      "`Awaited` рекурсивно разворачивает промисы и thenable-объекты, повторяя поведение `await`. Удобно для типа результата async-функции: `Awaited<ReturnType<typeof fetchUser>>`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Чем `Exclude<T, U>` отличается от `Omit<T, K>`?",
    options: [
      "`Exclude` убирает члены из union, `Omit` убирает свойства из объектного типа",
      "`Exclude` убирает свойства из объекта, `Omit` — члены из union",
      "Это синонимы с разным порядком параметров типа в угловых скобках",
    ],
    answer: 0,
    explanation:
      "`Exclude<'a' | 'b' | 'c', 'a'>` → `'b' | 'c'`. `Omit<User, 'password'>` → объект без поля. Парные утилиты: `Extract` (оставить подходящие члены union) и `Pick` (оставить свойства). `NonNullable<T>` убирает `null` и `undefined`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Как работают перегрузки функций в TypeScript?",
    code: `function parse(x: string): number;
function parse(x: number): string;
function parse(x: string | number) { /* ... */ }`,
    options: [
      "Несколько сигнатур для вызова и одна скрытая реализация",
      "Для каждой сигнатуры пишется своя реализация функции, как в Java",
      "Последняя сигнатура переопределяет все предыдущие, они игнорируются",
    ],
    answer: 0,
    explanation:
      "Вызывающий код видит только сигнатуры перегрузки, и TS выбирает первую подходящую сверху вниз. Реализация должна быть совместима со всеми. Часто перегрузки можно заменить union-параметром или дженериком с условным типом.",
    sources: ["ts-functions"],
  },
  {
    question: "Что такое declaration merging?",
    options: [
      "Объединение одноимённых объявлений, например двух `interface Window`, в одно",
      "Автоматическое слияние двух npm-пакетов с типами в один при установке",
      "Объединение псевдонима `type` и `interface` с одинаковым именем",
    ],
    answer: 0,
    explanation:
      "Интерфейсы, пространства имён и некоторые другие объявления с одним именем сливаются. Так расширяют глобальные типы: `interface Window { analytics: Analytics }` в `declare global`. Псевдонимы `type` не сливаются — повторное объявление вызовет ошибку.",
    sources: ["ts-declaration-merging"],
  },
  {
    question: "Для чего нужен абстрактный класс?",
    options: [
      "Базовый класс с общим кодом и абстрактными методами без `new`",
      "Класс без методов, который используется только как тип для проверок",
      "Класс, все методы и свойства которого объявлены статическими",
    ],
    answer: 0,
    explanation:
      "`abstract class Repo { abstract find(id): T; log() {...} }` — наследники обязаны реализовать `find`, а `log` получают готовым. В отличие от интерфейса, абстрактный класс существует в рантайме и может содержать код и состояние.",
    sources: ["ts-classes"],
  },
  {
    question: "Чем `protected` отличается от `private` в классах TypeScript?",
    options: [
      "`protected` доступен в наследниках, `private` — только в самом классе",
      "`protected` доступен снаружи только для чтения, `private` — нет",
      "Это синонимы, `protected` — старое название",
    ],
    answer: 0,
    explanation:
      "`public` (по умолчанию) — доступен везде, `protected` — в классе и подклассах, `private` — только в объявившем классе. Все три — проверки компилятора; для настоящей приватности в рантайме есть `#field`.",
    sources: ["ts-classes"],
  },
  {
    question: "Что делает оператор `satisfies`?",
    code: `const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, string | number[]>;`,
    options: [
      "Проверяет соответствие типу, но сохраняет более точный выведенный тип",
      "Приводит значение к указанному типу без проверки, как оператор `as`",
      "Расширяет тип значения до указанного, теряя детали литералов",
    ],
    answer: 0,
    explanation:
      "С аннотацией `: Record<...>` тип `palette.green` стал бы `string | number[]`. С `satisfies` проверка формы выполняется, а `palette.green` остаётся `string`, и можно вызвать `.toUpperCase()`. В отличие от `as`, ничего не утверждается без проверки.",
    sources: ["ts-4-9"],
  },
  {
    question: "Что такое шаблонные литеральные типы?",
    code: `type Event = 'click' | 'focus';
type Handler = \`on\${Capitalize<Event>}\`;`,
    options: [
      "Типы строк, собранные по шаблону: здесь `'onClick' | 'onFocus'`",
      "Шаблоны для генерации кода при компиляции",
      "Строковый тип, который проверяется регулярным выражением",
    ],
    answer: 0,
    explanation:
      "Шаблонные литералы работают на уровне типов и распределяются по union. Есть встроенные преобразования: `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`. Их используют для типизации ключей событий, CSS-переменных, маршрутов.",
    sources: ["ts-template-literal"],
  },
  {
    question: "Почему вместо `enum` часто используют объект `as const`?",
    code: `const Status = { Active: 'active', Banned: 'banned' } as const;
type Status = typeof Status[keyof typeof Status];`,
    options: [
      "Это обычный JS-объект, а тип значений — union строк",
      "`as const` работает в рантайме в десятки раз быстрее, чем enum",
      "Enum удалён из TypeScript 5 и больше не компилируется",
    ],
    answer: 0,
    explanation:
      "Объект — стандартный JS: его можно итерировать, он совместим с режимом erasable syntax (Node.js type stripping). Тип — union строк, принимающий и литералы из API. Числовые enum, напротив, принимают любое число и создают обратное отображение. Enum не удалены.",
    sources: ["ts-enums", "ts-5-8"],
  },
  {
    question: "Чем `const enum` отличается от обычного `enum`?",
    options: [
      "Значения подставляются инлайном при компиляции, объекта в рантайме нет",
      "Значения `const enum` нельзя использовать в `switch` и сравнениях",
      "`const enum` может содержать только строковые значения",
    ],
    answer: 0,
    explanation:
      "`const enum` экономит размер бандла, но плохо сочетается с `isolatedModules` и транспиляторами, обрабатывающими файлы по отдельности (Babel, esbuild, SWC): им нужно знать значения из другого файла. Поэтому в библиотеках и современных сборках его избегают.",
    sources: ["ts-enums", "ts-tsconfig"],
  },
  {
    question: "Чем пространства имён (`namespace`) отличаются от ES-модулей?",
    options: [
      "Namespace — устаревший способ организации кода; сейчас — модули",
      "Namespace — новый стандарт ECMAScript, заменяющий `import`/`export`",
      "Это синонимы: компилятор автоматически превращает одно в другое",
    ],
    answer: 0,
    explanation:
      "Namespace появились до ES-модулей и создают объекты в рантайме. Сейчас код организуют файлами с `import`/`export`, а `declare namespace` иногда используют в декларациях для описания глобальных библиотек. Namespace не совместимы с `erasableSyntaxOnly`.",
    sources: ["ts-namespaces-modules", "ts-modules"],
  },
  {
    question: "Что такое функция-утверждение (assertion function)?",
    code: `function assertIsString(x: unknown): asserts x is string {
  if (typeof x !== 'string') throw new Error('Not a string');
}`,
    options: [
      "Функция, после успешного вызова которой TS считает тип аргумента суженным",
      "Функция, которая возвращает `true` или `false` для проверки типа",
      "Функция, которая работает только в тестах",
    ],
    answer: 0,
    explanation:
      "После `assertIsString(value)` дальше по коду `value` — `string`, без `if`. Если проверка не прошла, функция бросает исключение. В отличие от type guard (`x is T`) результат не нужно оборачивать в условие.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Как получить props нативной кнопки, чтобы расширить их в своём компоненте?",
    options: [
      "`React.ComponentProps<'button'>`",
      "`HTMLButtonElement` — тип props кнопки",
      "`React.ButtonProps` из пакета `@types/react`",
    ],
    answer: 0,
    explanation:
      "`type Props = React.ComponentProps<'button'> & { variant: 'primary' | 'ghost' }` — компонент принимает все нативные атрибуты (`onClick`, `disabled`, `aria-*`). `HTMLButtonElement` — тип DOM-узла, а не props. `ComponentProps<typeof MyComp>` извлекает props любого компонента.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "Как типизировать хуки Redux Toolkit в приложении на TypeScript?",
    options: [
      "Вывести `RootState` и `AppDispatch` из store и создать `useAppSelector`/`useAppDispatch`",
      "Типизировать каждый вызов `useSelector` как `any`",
      "Описать вручную интерфейс всего state и обновлять его при каждом изменении",
    ],
    answer: 0,
    explanation:
      "`type RootState = ReturnType<typeof store.getState>` и `type AppDispatch = typeof store.dispatch`. Затем `export const useAppSelector = useSelector.withTypes<RootState>()`. Типы выводятся из редьюсеров, ручное описание не нужно.",
    sources: ["redux-typescript"],
  },
  {
    question: "Как типизировать дженерик-компонент списка?",
    code: `function List<T>({ items, render }: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) { /* ... */ }`,
    options: [
      "Объявить параметр типа у функции-компонента — TS выведет `T` из `items`",
      "Дженерики в React-компонентах не поддерживаются из-за синтаксиса JSX",
      "Использовать `React.FC<T>`, где `T` — тип элемента списка",
    ],
    answer: 0,
    explanation:
      "`<List items={users} render={u => u.name} />` — `T` выведется как `User`, и `u` в `render` будет типизирован. В `.tsx` у стрелочных функций пишут `<T,>`, чтобы парсер не принял это за JSX. `React.FC` дженерики не передаёт.",
    sources: ["ts-react-cheatsheet", "ts-generics"],
  },
  {
    question: "Что делает `Extract<'a' | 'b' | 1 | 2, string>`?",
    options: ["`'a' | 'b'`", "`1 | 2`", "`never`"],
    answer: 0,
    explanation:
      "`Extract<T, U>` оставляет члены union, совместимые с `U` — здесь строковые литералы. Противоположный `Exclude` оставил бы `1 | 2`. Обе утилиты — распределённые условные типы.",
    sources: ["ts-utility-types", "ts-conditional"],
  },
  {
    question: "Что вернёт `NonNullable<string | null | undefined>`?",
    options: ["`string`", "`string | undefined`", "`never`"],
    answer: 0,
    explanation:
      "`NonNullable<T>` исключает `null` и `undefined` из union. Сейчас он реализован как `T & {}`. Удобно для значений после проверки или в результатах `filter`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Чем `object`, `{}` и `Record<string, unknown>` отличаются как типы?",
    options: [
      "`{}` — любое не-null, `object` — не примитив, `Record` — словарь",
      "Это три синонима для «любого объекта» в TypeScript",
      "`{}` — только пустой объект без единого свойства",
    ],
    answer: 0,
    explanation:
      "`{}` принимает и строки, и числа — всё, кроме `null` и `undefined`, что часто удивляет. `object` исключает примитивы. `Record<string, unknown>` — объект с произвольными строковыми ключами, к значениям которых можно обращаться. Для «любого значения» лучше `unknown`.",
    sources: ["ts-everyday-types", "ts-objects"],
  },
  {
    question: "Как TypeScript обрабатывает оператор `in` при сужении?",
    code: `type Fish = { swim(): void };
type Bird = { fly(): void };
function move(a: Fish | Bird) {
  if ('swim' in a) a.swim(); else a.fly();
}`,
    options: [
      "Сужает union до вариантов, у которых есть свойство `swim`",
      "Оператор `in` не влияет на типы",
      "Проверяет, что `a` — массив, содержащий строку `'swim'`",
    ],
    answer: 0,
    explanation:
      "TS поддерживает сужение через `typeof`, `instanceof`, `in`, проверки на равенство, истинность и дискриминанты. В `else` останется `Bird`. Для данных из сети такие проверки — часть рантайм-валидации.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Что делает `-readonly` и `-?` в mapped type?",
    code: `type Mutable<T> = { -readonly [K in keyof T]-?: T[K] };`,
    options: [
      "Убирает модификаторы `readonly` и `?` у всех свойств",
      "Добавляет модификаторы `readonly` и `?` ко всем свойствам",
      "Удаляет из типа свойства, помеченные `readonly`",
    ],
    answer: 0,
    explanation:
      "Префикс `-` снимает модификатор, `+` (по умолчанию) — добавляет. Так реализован `Required<T>` (`-?`). Встроенного `Mutable` нет, но его часто пишут по этому образцу.",
    sources: ["ts-mapped"],
  },
  {
    question: "Как переименовать ключи в mapped type?",
    code: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};`,
    options: [
      "Через `as` после `in` с шаблонным литералом",
      "Это невозможно — ключи в mapped type всегда остаются прежними",
      "Через функцию `rename()` в стандартной библиотеке типов",
    ],
    answer: 0,
    explanation:
      "Key remapping (TS 4.1+): `Getters<{ name: string }>` → `{ getName: () => string }`. Если выражение после `as` даёт `never`, ключ исключается — так фильтруют свойства по типу значения. `string & K` нужен, потому что ключи могут быть символами или числами.",
    sources: ["ts-mapped", "ts-template-literal"],
  },
  {
    question: "Почему `Object.keys(user)` возвращает `string[]`, а не `(keyof User)[]`?",
    options: [
      "В рантайме у объекта могут быть и другие ключи",
      "Это известный баг TypeScript, который исправят в следующей версии",
      "Потому что ключи объекта всегда строки, даже числовые",
    ],
    answer: 0,
    explanation:
      "Объект типа `User` может содержать лишние свойства (тип описывает минимум), поэтому обещать `(keyof User)[]` было бы небезопасно. Если вы уверены, используйте утверждение типа или типизированную обёртку. Это осознанное решение команды TypeScript.",
    sources: ["ts-type-compatibility", "ts-keyof"],
  },
  {
    question: "Что даёт флаг `noUncheckedIndexedAccess`?",
    options: [
      "Доступ по индексу получает тип с `| undefined`",
      "Полностью запрещает индексные сигнатуры в объектных типах",
      "Отключает проверку выхода за границы кортежей и массивов",
    ],
    answer: 0,
    explanation:
      "Без флага `const x = arr[10]` типизирован как `T`, хотя в рантайме это `undefined`. С флагом компилятор заставит проверить значение. Флаг не входит в `strict`, но его часто советуют включать.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Чем `unknown[]` отличается от `any[]` в параметре функции?",
    options: [
      "С `unknown[]` элементы нужно сужать, с `any[]` — нет",
      "`unknown[]` принимает только массивы объектов, но не примитивов",
      "Разницы нет: оба отключают проверки для элементов",
    ],
    answer: 0,
    explanation:
      "Обе версии принимают любой массив, но внутри функции с `unknown` нельзя вызвать метод элемента без проверки. Если функция не работает с элементами (например, считает длину), `unknown[]` — безопасный выбор. Ещё лучше — дженерик `T[]`, если тип важен для результата.",
    sources: ["ts-everyday-types", "ts-generics"],
  },
  {
    question: "Что такое декораторы в TypeScript 5?",
    options: [
      "Функции, применяемые к классам и их членам через `@`",
      "Комментарии специального вида для генерации документации TSDoc",
      "Синтаксис для объявления React-компонентов в виде классов",
    ],
    answer: 0,
    explanation:
      "TS 5.0 поддерживает стандартные декораторы (stage 3) без флага. Устаревшие «экспериментальные» декораторы (`experimentalDecorators`) с другим API используются в Angular, NestJS, TypeORM. Применение: логирование, DI, валидация, метаданные.",
    sources: ["ts-5-0", "ts-decorators"],
  },
  {
    question: "Что делает `import type { User } from './types'`?",
    options: [
      "Импортирует только тип; импорт стирается при компиляции",
      "Импортирует значение и его тип одновременно, как обычный `import`",
      "Импортирует тип в рантайме для проверок `instanceof`",
    ],
    answer: 0,
    explanation:
      "Явный type-only импорт помогает транспиляторам, обрабатывающим файлы по отдельности: они точно знают, что импорт стереть. С флагом `verbatimModuleSyntax` это обязательно для типов. Также избегаются лишние побочные эффекты от загрузки модуля.",
    sources: ["ts-modules", "ts-tsconfig"],
  },
  {
    question: "Чем `interface` предпочтительнее пересечения для расширения больших объектных типов?",
    options: [
      "`extends` ловит конфликты свойств и быстрее для компилятора",
      "Пересечения не поддерживают вложенные объекты и массивы",
      "Интерфейсы существуют в рантайме, а пересечения — нет",
    ],
    answer: 0,
    explanation:
      "При `interface B extends A` конфликт свойств — ошибка в месте объявления, а у пересечения он молча даёт `never`. Компилятор кэширует отношения интерфейсов, поэтому в больших кодовых базах это быстрее — так рекомендует вики производительности TS.",
    sources: ["ts-performance-wiki", "ts-objects"],
  },
  {
    question: "Что вернёт `Parameters<(a: string, b?: number) => void>`?",
    options: ["`[a: string, b?: number]`", "`string | number`", "`{ a: string; b?: number }`"],
    answer: 0,
    explanation:
      "`Parameters` возвращает кортеж параметров с сохранением необязательности и имён. Удобно для обёрток: `function logged(...args: Parameters<typeof fn>)`. Для конструкторов есть `ConstructorParameters`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Как указать тип `this` для функции-обработчика?",
    code: `function handler(this: HTMLButtonElement, e: MouseEvent) {
  this.disabled = true;
}`,
    options: [
      "Первый «параметр» `this` задаёт тип контекста и стирается при компиляции",
      "Это обычный первый параметр, который нужно передавать при вызове",
      "Такой синтаксис запрещён в strict-режиме TypeScript",
    ],
    answer: 0,
    explanation:
      "Псевдопараметр `this` описывает, с каким контекстом функция должна вызываться; аргументом он не является. Компилятор проверит вызовы и использование `this` внутри. В стрелочных функциях `this` лексический, и так его указать нельзя.",
    sources: ["ts-functions"],
  },
  {
    question: "Как лучше типизировать ответ API, если у разных статусов разная структура?",
    options: [
      "Union с дискриминатором `ok`: успех с `data` или ошибка",
      "Один общий тип, в котором все поля сделаны необязательными",
      "Тип `any`, потому что структура ответа заранее неизвестна",
    ],
    answer: 0,
    explanation:
      "Union делает невозможные состояния непредставимыми: при `ok: true` гарантированно есть `data`, а `error` недоступна. Тип с необязательными полями допускает бессмысленные комбинации и требует проверок везде.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Что делает утилита `ReadonlyArray<T>` (или `readonly T[]`)?",
    options: [
      "Убирает из типа мутирующие методы (`push`, `sort`)",
      "Замораживает массив в рантайме через `Object.freeze`",
      "Делает все элементы массива глубоко неизменяемыми",
    ],
    answer: 0,
    explanation:
      "Параметр `readonly T[]` гарантирует вызывающему коду, что функция не изменит его массив. Принимает и обычные массивы. Изменение вложенных объектов типом не запрещается — это неглубокая защита.",
    sources: ["ts-objects"],
  },
  {
    question: "Что такое `unique symbol`?",
    options: [
      "Тип конкретного символа, объявленного через `const s = Symbol()`",
      "Любое значение типа `symbol`, включая `Symbol.for()`",
      "Символ, который нельзя использовать как ключ объекта",
    ],
    answer: 0,
    explanation:
      "Каждый `const` с `Symbol()` получает свой подтип `unique symbol`, поэтому TS различает такие ключи. Это используют для «скрытых» свойств и брендирования типов. Обычный `symbol` описывает любые символы.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Как расширить тип глобального объекта `Window` из модуля?",
    code: `export {};
declare global {
  interface Window { dataLayer: unknown[] }
}`,
    options: [
      "Через `declare global` и слияние интерфейса `Window`",
      "Через `window.dataLayer = []` — тип выведется автоматически",
      "Через `type Window = Window & { dataLayer: unknown[] }`",
    ],
    answer: 0,
    explanation:
      "В файле-модуле (с `import`/`export`) глобальные декларации пишут внутри `declare global`. Интерфейс `Window` сливается с вашим расширением. Повторный `type Window` вызовет ошибку дублирования.",
    sources: ["ts-declaration-merging", "ts-dts"],
  },
  {
    question: "Как типизировать результат `JSON.parse` безопасно?",
    options: [
      "Считать результат `unknown` и проверить схемой (Zod)",
      "Сразу написать `JSON.parse(text) as User` — этого достаточно",
      "Оставить `any`: TypeScript сам проверит структуру позже",
    ],
    answer: 0,
    explanation:
      "`JSON.parse` возвращает `any`, но данные извне могут не совпасть с ожиданиями. Схема (`z.object({...})`) проверяет данные в рантайме, а `z.infer<typeof schema>` даёт TS-тип без дублирования. `as User` только скрывает проблему.",
    sources: ["ts-narrowing", "ts-everyday-types"],
  },
  {
    question: "Чем `type A = B` отличается от `interface A extends B {}` для отображения в подсказках IDE?",
    options: [
      "Интерфейс показывается по имени, псевдоним — разворачивается",
      "Псевдонимы типов вообще не отображаются в подсказках IDE",
      "Разницы нет: IDE показывает их одинаково",
    ],
    answer: 0,
    explanation:
      "Сложные пересечения и сопоставленные типы в подсказках часто разворачиваются в длинные структуры, тогда как интерфейс показывается по имени. Это влияет на читаемость ошибок. Для «распрямления» пересечений пишут хелпер `Prettify<T>`.",
    sources: ["ts-objects", "ts-performance-wiki"],
  },
  {
    question: "Что даёт `paths` в `tsconfig.json`?",
    options: [
      "Псевдонимы путей импорта, например `@/*` → `./src/*`",
      "Список файлов и папок, которые нужно скомпилировать",
      "Пути для вывода скомпилированных `.js`-файлов",
    ],
    answer: 0,
    explanation:
      "`paths` позволяет писать `import { Button } from '@/components/button'` вместо длинных относительных путей. Это настройка резолва для компилятора — бандлер должен понимать те же алиасы (Next.js и Vite читают их из tsconfig). Список файлов задают `include`, вывод — `outDir`.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Чем `moduleResolution: 'bundler'` отличается от `'node16'`/`'nodenext'`?",
    options: [
      "`bundler` — как у сборщиков, `nodenext` — по правилам Node.js",
      "`bundler` работает только с Webpack 4 и старше",
      "Это синонимы для разных версий TS",
    ],
    answer: 0,
    explanation:
      "В Node.js ESM нужно писать расширения в относительных импортах и учитывать `exports`/`type`. Сборщики (Vite, Next.js, esbuild) прощают это, и режим `bundler` повторяет их поведение. Для кода, исполняемого Node.js без сборки, выбирают `nodenext`.",
    sources: ["ts-tsconfig", "ts-modules"],
  },
  {
    question: "Что делает флаг `isolatedModules`?",
    options: [
      "Запрещает код, который нельзя транспилировать пофайлово",
      "Запускает компиляцию каждого модуля в отдельном процессе",
      "Изолирует глобальные переменные каждого файла друг от друга",
    ],
    answer: 0,
    explanation:
      "Babel, SWC и esbuild компилируют файлы независимо и не видят типов из других модулей. `isolatedModules` предупреждает о коде, который они не смогут обработать корректно: реэкспорт типа без `export type`, обращение к `const enum` из другого файла и т.д.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Что делает `keyof typeof obj`?",
    code: `const routes = { home: '/', about: '/about' };
type RouteName = keyof typeof routes;`,
    options: [
      "Получает union ключей значения `routes`: `'home' | 'about'`",
      "Получает union значений: `'/' | '/about'`",
      "Вызывает ошибку: `keyof` нельзя применять к `typeof`",
    ],
    answer: 0,
    explanation:
      "`typeof routes` даёт тип объекта, а `keyof` — его ключи. Для union значений нужен индексный доступ: `typeof routes[keyof typeof routes]`, а чтобы значения были литералами — `as const`.",
    sources: ["ts-keyof", "ts-typeof"],
  },
  {
    question: "Когда TS расширяет литеральный тип до общего (widening)?",
    options: [
      "В изменяемых позициях: `let`, свойства объектов",
      "Никогда: литеральные типы всегда сохраняются как есть",
      "Только при включённом флаге `noImplicitAny` в tsconfig",
    ],
    answer: 0,
    explanation:
      "`const a = 'x'` → `'x'`, но `let b = 'x'` → `string`, и `{ dir: 'left' }` → `{ dir: string }`. Из-за этого объект нельзя передать в функцию, ожидающую `'left' | 'right'`. Решения: `as const`, аннотация или `satisfies`.",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Как сделать параметр дженерика необязательным со значением по умолчанию?",
    options: [
      "`type Box<T = string> = { value: T }`",
      "`type Box<T?> = { value: T }`",
      "`type Box<T | string> = { value: T }`",
    ],
    answer: 0,
    explanation:
      "Параметры типа могут иметь значения по умолчанию: `Box` без аргумента — `Box<string>`. Их можно сочетать с ограничениями: `<T extends object = {}>`. Так устроены, например, `useState<S = undefined>` и `EventEmitter<T = any>`.",
    sources: ["ts-generics"],
  },
  {
    question: "Как типизировать функцию-фабрику, которая возвращает тот же тип, что получила?",
    options: [
      "`function clone<T>(value: T): T`",
      "`function clone(value: any): any`",
      "`function clone(value: object): object`",
    ],
    answer: 0,
    explanation:
      "Дженерик сохраняет связь между входом и выходом: `clone(user)` вернёт `User`. С `any` и `object` вызывающий код теряет информацию о типе и вынужден делать приведения.",
    sources: ["ts-generics"],
  },
  {
    question: "Что такое контекстная типизация (contextual typing)?",
    options: [
      "Вывод типов параметров функции из места, где она используется",
      "Типизация, зависящая от окружения (браузер или Node.js)",
      "Указание типа через комментарий JSDoc",
    ],
    answer: 0,
    explanation:
      "В `button.addEventListener('click', e => ...)` тип `e` (`MouseEvent`) выводится из сигнатуры `addEventListener`. Так же работают колбэки `map`, обработчики в JSX и `useState`-сеттеры. Если вынести функцию в отдельную переменную, контекст теряется — придётся аннотировать.",
    sources: ["ts-functions", "ts-everyday-types"],
  },
];

export default questions;
