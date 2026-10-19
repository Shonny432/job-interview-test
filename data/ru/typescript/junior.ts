import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Что такое TypeScript?",
    options: [
      "Надмножество JavaScript со статической типизацией, компилируемое в JS",
      "Отдельный язык со своим рантаймом, который браузеры выполняют напрямую",
      "Библиотека для проверки типов во время выполнения JavaScript-кода",
    ],
    answer: 0,
    explanation:
      "Любой валидный JS — почти всегда валидный TS. Типы проверяются при компиляции и затем стираются: в рантайме выполняется обычный JavaScript, и проверок типов там нет. Поэтому данные извне (API, формы) всё равно валидируют в рантайме — например, через Zod.",
    sources: ["ts-ts-for-js", "ts-handbook"],
  },
  {
    question: "Есть ли проверка типов TypeScript во время выполнения программы?",
    options: [
      "Нет: типы стираются при компиляции, в рантайме работает обычный JS",
      "Да: компилятор вставляет проверки перед каждым вызовом функции",
      "Да, но только для классов и интерфейсов с модификатором `strict`",
    ],
    answer: 0,
    explanation:
      "TypeScript — инструмент времени разработки. Если API вернёт `null` вместо объекта, типы не спасут. Для рантайм-проверок используют `typeof`/`instanceof` и библиотеки схем (Zod, Valibot), из которых можно вывести и TS-типы.",
    sources: ["ts-ts-for-js"],
  },
  {
    question: "Чем `unknown` отличается от `any`?",
    options: [
      "С `unknown` ничего нельзя делать без сужения типа, а `any` отключает проверки",
      "`unknown` можно присвоить любой переменной, а `any` — только `object`",
      "Это синонимы, `unknown` — просто более новое название для `any`",
    ],
    answer: 0,
    explanation:
      "`any` выключает типизацию и «заражает» всё, к чему прикасается. `unknown` — безопасный аналог: значение может быть чем угодно, но использовать его можно только после проверки (`typeof x === 'string'`). Для данных из `JSON.parse` и `catch (e)` правильнее `unknown`.",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Что означает тип `never`?",
    options: [
      "Тип значения, которого не может быть: функция никогда не возвращает управление",
      "То же, что `void`: функция ничего не возвращает и завершается нормально",
      "То же, что `null`: значение отсутствует, но переменная существует",
    ],
    answer: 0,
    explanation:
      "`never` — пустой тип. Его возвращают функции, которые всегда бросают исключение или зацикливаются. Также он появляется при полном сужении union-типа — на этом построена проверка исчерпывающего `switch`. `void` — функция завершается, но результат не используется.",
    sources: ["ts-functions", "ts-narrowing"],
  },
  {
    question: "Что выведет TypeScript для `let x = 5;`?",
    options: ["`number`", "`5` (литеральный тип)", "`any` (без аннотации)"],
    answer: 0,
    explanation:
      "Выведение типов (inference): для `let` литерал расширяется до `number`, потому что переменную можно переприсвоить. Для `const x = 5` тип будет литеральным `5`. Явные аннотации нужны там, где вывод невозможен или неточен — например, в параметрах функций.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Какая разница между `interface` и `type` для описания объекта?",
    options: [
      "Обе подходят; `interface` можно расширять слиянием, а `type` умеет union и другие типы",
      "`interface` работает только с классами, а `type` — только с примитивными типами",
      "`type` устарел, и в новых проектах его использовать не рекомендуется вовсе",
    ],
    answer: 0,
    explanation:
      "Для объектов они почти взаимозаменяемы. Отличия: интерфейсы с одним именем сливаются (declaration merging), расширяются через `extends`. Псевдонимы типов описывают union, кортежи, примитивы, условные и сопоставленные типы. Многие команды используют `interface` для объектов и `type` для остального.",
    sources: ["ts-everyday-types", "ts-objects"],
  },
  {
    question: "Как объявить необязательное свойство объекта?",
    options: [
      "`{ name?: string }`",
      "`{ name: optional string }`",
      "`{ ?name: string }`",
    ],
    answer: 0,
    explanation:
      "`?` после имени делает свойство необязательным: его тип — `string | undefined`, а сам ключ может отсутствовать. С флагом `exactOptionalPropertyTypes` явное присваивание `undefined` различается с отсутствием ключа.",
    sources: ["ts-objects"],
  },
  {
    question: "Что делает модификатор `readonly` в `{ readonly id: number }`?",
    options: [
      "Запрещает переприсваивание свойства на уровне типов, в рантайме ничего не меняет",
      "Делает объект глубоко неизменяемым через `Object.freeze` в рантайме",
      "Делает свойство приватным и недоступным снаружи класса",
    ],
    answer: 0,
    explanation:
      "`readonly` — только проверка компилятора: `obj.id = 2` вызовет ошибку. Он неглубокий — вложенные объекты можно менять. В рантайме объект обычный. Для массивов есть `readonly string[]` / `ReadonlyArray<string>`, а глубокую заморозку делают через `as const` или `Object.freeze`.",
    sources: ["ts-objects"],
  },
  {
    question: "Что означает тип `string | number`?",
    options: [
      "Значение может быть строкой или числом (объединение)",
      "Значение одновременно и строка, и число (пересечение)",
      "Строка, которая содержит только цифры",
    ],
    answer: 0,
    explanation:
      "Union-тип допускает любой из вариантов. Пока тип не сужен, доступны только общие для всех вариантов операции. Пересечение записывается через `&` и требует соответствия всем типам сразу (`A & B`).",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Что даёт пересечение `type Admin = User & { role: 'admin' }`?",
    options: [
      "Тип со всеми свойствами `User` и дополнительно `role: 'admin'`",
      "Тип только с общими свойствами `User` и объекта с `role`",
      "Тип, который может быть либо `User`, либо `{ role: 'admin' }`",
    ],
    answer: 0,
    explanation:
      "Пересечение объединяет требования: значение должно удовлетворять обоим типам. Это способ композиции типов, похожий на `interface Admin extends User`. При конфликтующих свойствах получается `never` для этого свойства.",
    sources: ["ts-objects"],
  },
  {
    question: "Что такое литеральный тип `'left' | 'right'`?",
    options: [
      "Тип, допускающий только строки `'left'` или `'right'`",
      "Любая строка, начинающаяся с `left` или `right`",
      "Перечисление (enum) с числовыми значениями 0 и 1",
    ],
    answer: 0,
    explanation:
      "Литеральные типы сужают значение до конкретных констант. Union литералов — частая альтернатива enum: `type Direction = 'left' | 'right'`. Опечатку `'lft'` компилятор поймает, а IDE подскажет варианты.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Как типизировать функцию, принимающую строку и возвращающую число?",
    options: [
      "`(s: string) => number`",
      "`(string) => number`",
      "`function(s): string -> number`",
    ],
    answer: 0,
    explanation:
      "В типе функции у параметров обязательны имена: `(s: string) => number`. Запись `(string) => number` означает параметр с именем `string` и типом `any`. Объявление функции: `function len(s: string): number { ... }`.",
    sources: ["ts-functions"],
  },
  {
    question: "Как объявить необязательный параметр функции?",
    options: [
      "`function greet(name?: string)`",
      "`function greet(optional name: string)`",
      "`function greet(name: string = ?)`",
    ],
    answer: 0,
    explanation:
      "`?` делает параметр необязательным, его тип — `string | undefined`. Альтернатива — значение по умолчанию: `greet(name = 'Гость')`, тогда тип выводится как `string`. Необязательные параметры должны идти после обязательных.",
    sources: ["ts-functions"],
  },
  {
    question: "Что такое кортеж (tuple) в TypeScript?",
    options: [
      "Массив фиксированной длины с известным типом каждого элемента",
      "Массив произвольной длины, где все элементы одного типа",
      "Неизменяемый объект с числовыми ключами вместо имён свойств",
    ],
    answer: 0,
    explanation:
      "`type Point = [number, number]` — ровно два числа. Кортежи удобны для возврата нескольких значений, как в `useState`: `[value, setter]`. Элементы можно именовать (`[x: number, y: number]`) и делать необязательными (`[string, number?]`).",
    sources: ["ts-objects"],
  },
  {
    question: "Как типизировать массив строк?",
    options: ["`string[]` или `Array<string>`", "`[string]` или `Array[string]`", "`array of string` или `string()`"],
    answer: 0,
    explanation:
      "`string[]` и `Array<string>` эквивалентны. `[string]` — кортеж из одного элемента. Для массивов только для чтения — `readonly string[]`.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Что такое дженерик (generic)?",
    options: [
      "Параметр типа, позволяющий писать код для разных типов с сохранением связи между ними",
      "Тип `any`, который используется для временного отключения проверок в функциях",
      "Базовый класс, от которого наследуются все остальные типы и интерфейсы",
    ],
    answer: 0,
    explanation:
      "`function first<T>(arr: T[]): T | undefined` — тип результата связан с типом входного массива: `first([1, 2])` вернёт `number | undefined`. С `any` эта связь теряется. Дженерики используются в `Array<T>`, `Promise<T>`, `useState<T>`.",
    sources: ["ts-generics"],
  },
  {
    question: "Что делает утилитарный тип `Partial<User>`?",
    options: [
      "Делает все свойства `User` необязательными",
      "Оставляет только часть свойств, указанных вторым параметром",
      "Делает все свойства `User` доступными только для чтения",
    ],
    answer: 0,
    explanation:
      "`Partial<T>` добавляет `?` ко всем свойствам — удобно для объектов обновления: `update(id, patch: Partial<User>)`. Выбор подмножества — `Pick`, только чтение — `Readonly`, все обязательные — `Required`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Чем отличаются `Pick<User, 'id' | 'name'>` и `Omit<User, 'password'>`?",
    options: [
      "`Pick` оставляет перечисленные свойства, `Omit` — все, кроме перечисленных",
      "`Pick` делает свойства обязательными, `Omit` — необязательными",
      "Это синонимы с разным порядком аргументов",
    ],
    answer: 0,
    explanation:
      "Оба создают новый тип из существующего. `Pick` — белый список ключей, `Omit` — чёрный. Например, `Omit<User, 'password'>` — тип для ответа API без секретных полей.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Что описывает `Record<string, number>`?",
    options: [
      "Объект, у которого ключи — строки, а значения — числа",
      "Массив пар `[string, number]`, отсортированный по ключу",
      "Коллекцию `Map` из стандартной библиотеки JavaScript",
    ],
    answer: 0,
    explanation:
      "`Record<K, V>` — объект с ключами `K` и значениями `V`. С union-ключами он требует все ключи: `Record<'ru' | 'en', string>`. Это не `Map`: `Map` — отдельная структура данных с методами `get`/`set`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Что вернёт `keyof { id: number; name: string }`?",
    options: ["`'id' | 'name'`", "`number | string`", "`['id', 'name']`"],
    answer: 0,
    explanation:
      "`keyof` возвращает union ключей типа. Типы значений получают через индексный доступ: `T['id']` или `T[keyof T]`. В рантайме `keyof` не существует — для массива ключей используют `Object.keys`.",
    sources: ["ts-keyof"],
  },
  {
    question: "Что делает `typeof` в позиции типа: `type Config = typeof config`?",
    options: [
      "Берёт тип переменной `config`, выведенный компилятором",
      "Возвращает строку `'object'`, как в JavaScript",
      "Проверяет тип `config` во время выполнения",
    ],
    answer: 0,
    explanation:
      "В выражениях `typeof` — JS-оператор, возвращающий строку. В позиции типа это оператор TypeScript, извлекающий тип значения. Удобно, чтобы не дублировать описание: `const routes = {...} as const; type Routes = typeof routes`.",
    sources: ["ts-typeof"],
  },
  {
    question: "Как правильно типизировать props React-компонента?",
    options: [
      "`function Button({ label }: { label: string })` или через `type Props`",
      "`function Button(props: any)` — React типизирует props сам",
      "`function Button<label: string>()` — props передаются дженериком",
    ],
    answer: 0,
    explanation:
      "Props — обычный объект, его типизируют интерфейсом или псевдонимом. `React.FC` не обязателен. Для `children` используют `React.ReactNode`, для расширения нативных атрибутов — `React.ComponentProps<'button'>`.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "Какой тип у события в `onChange` для `<input>` в React?",
    options: [
      "`React.ChangeEvent<HTMLInputElement>`",
      "`Event` — нативное событие DOM",
      "`InputEvent<string>` из стандартной библиотеки",
    ],
    answer: 0,
    explanation:
      "React использует свои синтетические события: `ChangeEvent`, `MouseEvent<HTMLButtonElement>`, `FormEvent<HTMLFormElement>` и т.д. Дженерик указывает элемент, поэтому `e.target.value` типизирован. Если обработчик инлайновый, тип выводится автоматически.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "Как указать тип состояния, если начальное значение `null`: `useState(null)`?",
    options: [
      "`useState<User | null>(null)`",
      "`useState(null as User)`",
      "Тип указывать не нужно, TS выведет `User`",
    ],
    answer: 0,
    explanation:
      "Без дженерика тип выведется как `null`, и потом нельзя будет присвоить пользователя. Явный дженерик описывает все возможные состояния. Каст `null as User` — ложь компилятору: дальше код будет считать, что пользователь всегда есть.",
    sources: ["ts-react-cheatsheet", "ts-generics"],
  },
  {
    question: "Что делает утверждение типа `value as string`?",
    options: [
      "Говорит компилятору считать значение строкой, без проверки в рантайме",
      "Преобразует значение в строку, как `String(value)`",
      "Проверяет в рантайме, что значение строка, иначе бросает ошибку",
    ],
    answer: 0,
    explanation:
      "`as` — подсказка компилятору, а не преобразование: если на самом деле там число, ошибка проявится позже. Используйте его, когда знаете больше компилятора (например, тип элемента из `querySelector`), и предпочитайте сужение через проверки.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Что делает оператор `!` в `user!.name`?",
    options: [
      "Утверждает, что значение не `null`/`undefined`, без проверки в рантайме",
      "Логическое отрицание `user`, как оператор `!` в JavaScript",
      "Делает обращение к свойству безопасным, как опциональная цепочка `?.`",
    ],
    answer: 0,
    explanation:
      "Non-null assertion убирает `null | undefined` из типа. Если значение всё же `null`, будет рантайм-ошибка. Безопаснее явная проверка или `user?.name` (опциональная цепочка, вернёт `undefined`).",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Что включает флаг `strict` в `tsconfig.json`?",
    options: [
      "Набор строгих проверок: `strictNullChecks`, `noImplicitAny` и другие",
      "Режим `'use strict'` в скомпилированном JavaScript и ничего больше",
      "Запрет на использование `any` и `as` в любом виде",
    ],
    answer: 0,
    explanation:
      "`strict: true` включает семейство флагов: `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictBindCallApply`, `useUnknownInCatchVariables` и др. Новые проекты стоит начинать со strict. Явный `any` он не запрещает — для этого есть правила линтера.",
    sources: ["ts-strict", "ts-tsconfig"],
  },
  {
    question: "Что даёт `strictNullChecks`?",
    options: [
      "`null` и `undefined` становятся отдельными типами, их нужно явно учитывать",
      "Запрещает использовать `null` в коде совсем, разрешая только `undefined`",
      "Автоматически заменяет `null` на `undefined` при компиляции в JS",
    ],
    answer: 0,
    explanation:
      "Без флага `null` можно присвоить чему угодно, и ошибки «cannot read property of null» не ловятся. С флагом `string` не включает `null`: нужно писать `string | null` и проверять значение перед использованием. Это один из самых полезных флагов.",
    sources: ["ts-strict", "ts-everyday-types"],
  },
  {
    question: "Как сузить тип `string | number` до `string` внутри условия?",
    options: [
      "`if (typeof value === 'string') { ... }`",
      "`if (value is string) { ... }`",
      "`if (value instanceof String) { ... }`",
    ],
    answer: 0,
    explanation:
      "TypeScript анализирует поток управления: после проверки `typeof` внутри ветки тип сужен до `string`, а в `else` — до `number`. `instanceof String` проверяет объект-обёртку, а не примитив. Синтаксис `x is T` используется в сигнатуре type guard-функций.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Чем `enum Color { Red, Green }` отличается от `type Color = 'red' | 'green'`?",
    options: [
      "`enum` создаёт объект в рантайме, union литералов существует только в типах",
      "Union литералов создаёт объект в рантайме, `enum` — только тип",
      "Ничем: компилятор генерирует для них одинаковый JavaScript-код",
    ],
    answer: 0,
    explanation:
      "Обычный `enum` компилируется в JS-объект (числовой — с обратным отображением). Union строк ничего не добавляет в бандл и совместим с JSON и API. Многие команды предпочитают union или объект `as const`. Кроме того, enum несовместим с режимом `erasableSyntaxOnly`.",
    sources: ["ts-enums"],
  },
  {
    question: "Что делает `as const` в `const roles = ['admin', 'user'] as const`?",
    options: [
      "Делает массив readonly-кортежем с литеральными типами `'admin'` и `'user'`",
      "Замораживает массив в рантайме через `Object.freeze` при компиляции",
      "Превращает массив в `enum` со строковыми значениями",
    ],
    answer: 0,
    explanation:
      "Без `as const` тип — `string[]`. С ним — `readonly ['admin', 'user']`, и можно получить union: `type Role = typeof roles[number]` → `'admin' | 'user'`. В рантайме объект не замораживается.",
    sources: ["ts-everyday-types", "ts-typeof"],
  },
  {
    question: "Что такое структурная типизация в TypeScript?",
    options: [
      "Совместимость типов определяется их формой (набором свойств), а не именем",
      "Типы совместимы, только если объявлены с одним и тем же именем",
      "Типизация, при которой каждый объект обязан наследоваться от класса",
    ],
    answer: 0,
    explanation:
      "Если у объекта есть все свойства, которые требует тип, он подходит — даже если его тип назван иначе (duck typing). Поэтому `Point2D` и `Vector2D` с одинаковыми полями взаимозаменяемы. Номинальное поведение можно имитировать брендированными типами.",
    sources: ["ts-type-compatibility"],
  },
  {
    question: "Что такое файл `.d.ts`?",
    options: [
      "Файл деклараций: описывает типы существующего JS-кода без реализации",
      "Скомпилированный TypeScript для отладки в браузере через source maps",
      "Файл с тестами для типов, который запускает `tsc --test`",
    ],
    answer: 0,
    explanation:
      "Декларации позволяют использовать JS-библиотеки с типами. Их пишут вручную, генерируют компилятором (`declaration: true`) или ставят из DefinitelyTyped. Кода, который выполняется, в `.d.ts` нет.",
    sources: ["ts-dts"],
  },
  {
    question: "Зачем ставить пакеты вида `@types/lodash`?",
    options: [
      "Чтобы получить типы для библиотеки, написанной на JS без встроенных деклараций",
      "Чтобы установить TypeScript-версию библиотеки вместо её JS-версии",
      "Чтобы включить проверку типов в рантайме для вызовов этой библиотеки",
    ],
    answer: 0,
    explanation:
      "Пакеты `@types/*` публикуются из репозитория DefinitelyTyped и содержат только `.d.ts`. Многие современные библиотеки поставляют типы сами — тогда `@types` не нужен. Обычно ставятся как devDependencies.",
    sources: ["ts-dts"],
  },
  {
    question: "Что скомпилирует `tsc` из TypeScript-файла?",
    options: [
      "JavaScript без аннотаций типов (и опционально `.d.ts` и source maps)",
      "Машинный код для выбранной платформы, как компилятор Go",
      "WebAssembly-модуль, который загружается браузером",
    ],
    answer: 0,
    explanation:
      "Компилятор проверяет типы и выдаёт JS под указанный `target`. В современных проектах сборку часто делают esbuild, SWC или Babel (только удаляют типы), а `tsc --noEmit` запускают отдельно для проверки.",
    sources: ["ts-tsconfig", "ts-ts-for-js"],
  },
  {
    question: "Какой тип у переменной `e` в `catch (e)` при включённом `strict`?",
    options: ["`unknown`", "`Error` (встроенный класс)", "`any` (как без strict)"],
    answer: 0,
    explanation:
      "С флагом `useUnknownInCatchVariables` (входит в strict) `e` — `unknown`, ведь выбросить можно что угодно, не только `Error`. Перед использованием проверяют: `if (e instanceof Error) console.log(e.message)`.",
    sources: ["ts-strict", "ts-narrowing"],
  },
  {
    question: "Что означает тип возвращаемого значения `void`?",
    options: [
      "Функция ничего полезного не возвращает, результат не используется",
      "Функция всегда возвращает `null` вместо значения",
      "Функция никогда не завершается или бросает ошибку",
    ],
    answer: 0,
    explanation:
      "`void` используется для функций без `return` значения. Нюанс: тип колбэка `() => void` разрешает передать функцию, которая что-то возвращает (результат будет проигнорирован), — поэтому `arr.forEach(x => list.push(x))` компилируется. Функция, которая никогда не завершается, имеет тип `never`.",
    sources: ["ts-functions"],
  },
  {
    question: "Как описать объект с произвольными строковыми ключами и числовыми значениями через индексную сигнатуру?",
    options: [
      "`{ [key: string]: number }`",
      "`{ key: string => number }`",
      "`{ *: number }`",
    ],
    answer: 0,
    explanation:
      "Индексная сигнатура описывает «словарь». Эквивалент — `Record<string, number>`. С флагом `noUncheckedIndexedAccess` обращение `obj[key]` вернёт `number | undefined`, что точнее отражает реальность.",
    sources: ["ts-objects"],
  },
  {
    question: "Как расширить интерфейс?",
    options: [
      "`interface Admin extends User { role: string }`",
      "`interface Admin implements User { role: string }`",
      "`interface Admin = User + { role: string }`",
    ],
    answer: 0,
    explanation:
      "Интерфейс расширяется через `extends` (можно от нескольких: `extends A, B`). `implements` используется классами, чтобы гарантировать соответствие интерфейсу. Для псевдонимов типов аналог — пересечение `User & { role: string }`.",
    sources: ["ts-objects"],
  },
  {
    question: "Что делает `implements` в классе?",
    options: [
      "Проверяет, что класс соответствует интерфейсу; ничего не наследует",
      "Наследует реализацию методов и свойств интерфейса в класс",
      "Создаёт экземпляр интерфейса, доступный через `this`",
    ],
    answer: 0,
    explanation:
      "`class Cat implements Animal` — компилятор проверит, что в классе есть все члены `Animal`. Реализацию нужно написать самому, в отличие от `extends` для классов. Интерфейсы в рантайме не существуют.",
    sources: ["ts-classes"],
  },
  {
    question: "Чем `private` в TypeScript отличается от `#field` в JavaScript?",
    options: [
      "`private` — только проверка компилятора, `#field` — приватность в рантайме",
      "Ничем: `#field` просто компилируется в модификатор `private`",
      "`#field` работает только в TypeScript и не поддерживается движками JS",
    ],
    answer: 0,
    explanation:
      "После компиляции `private` поле — обычное свойство, его можно прочитать через `obj['field']`. Приватные поля `#field` поддерживаются движком JS и недоступны снаружи класса никак. Модификаторы `public`, `protected`, `private` — инструменты TypeScript.",
    sources: ["ts-classes"],
  },
  {
    question: "Как типизировать асинхронную функцию, возвращающую пользователя?",
    options: [
      "`async function getUser(): Promise<User>`",
      "`async function getUser(): User`",
      "`async function getUser(): Async<User>`",
    ],
    answer: 0,
    explanation:
      "Async-функция всегда возвращает промис, поэтому тип результата — `Promise<User>`. Аннотация `User` вызовет ошибку. Тип значения промиса можно извлечь утилитой `Awaited<ReturnType<typeof getUser>>`.",
    sources: ["ts-functions", "ts-utility-types"],
  },
  {
    question: "Как TypeScript поступит с `const el = document.getElementById('app')`?",
    options: [
      "Выведет тип `HTMLElement | null` и потребует проверить на `null`",
      "Выведет тип `HTMLDivElement` автоматически по разметке страницы",
      "Выведет `any`, потому что DOM-API в TypeScript не типизированы",
    ],
    answer: 0,
    explanation:
      "Элемента может не оказаться, поэтому в типе есть `null`. Для конкретного типа используют `querySelector<HTMLInputElement>('#email')` или проверку `instanceof HTMLInputElement`. Типы DOM входят в стандартную библиотеку (`lib: ['dom']`).",
    sources: ["ts-narrowing", "ts-everyday-types"],
  },
  {
    question: "Что такое union с общим полем-дискриминатором?",
    code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number };`,
    options: [
      "Дискриминированное объединение: по `kind` TS сужает тип в `switch`/`if`",
      "Ошибка: в union нельзя использовать одинаковые имена свойств",
      "Пересечение двух объектов со свойством `kind`",
    ],
    answer: 0,
    explanation:
      "Проверка `if (shape.kind === 'circle')` сужает тип, и внутри доступен `shape.radius`. Это основной способ моделировать состояния: `{ status: 'loading' } | { status: 'success'; data } | { status: 'error'; error }`.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Как вывести тип возвращаемого значения функции `createStore`?",
    options: [
      "`ReturnType<typeof createStore>`",
      "`typeof createStore()` с вызовом функции",
      "`ResultOf<createStore>` из стандартной библиотеки",
    ],
    answer: 0,
    explanation:
      "`ReturnType` принимает тип функции, поэтому нужен `typeof`. Аналогично `Parameters<typeof fn>` даёт кортеж параметров. Так типы выводятся из реализации, а не дублируются.",
    sources: ["ts-utility-types", "ts-typeof"],
  },
  {
    question: "Что произойдёт при передаче объектного литерала с лишним свойством?",
    code: `type User = { name: string };
const u: User = { name: 'Ann', age: 30 };`,
    options: [
      "Ошибка: для литералов действует проверка лишних свойств",
      "Всё в порядке: лишние свойства всегда разрешены",
      "Свойство `age` молча удалится при компиляции",
    ],
    answer: 0,
    explanation:
      "Excess property check срабатывает только для свежих объектных литералов — это защита от опечаток. Если сначала положить объект в переменную, а потом присвоить, ошибки не будет (структурная совместимость). Компилятор ничего не удаляет.",
    sources: ["ts-objects", "ts-type-compatibility"],
  },
  {
    question: "Что такое `tsconfig.json`?",
    options: [
      "Файл с настройками компилятора и списком файлов проекта",
      "Файл со списком npm-зависимостей для TypeScript",
      "Файл с типами для всех модулей проекта",
    ],
    answer: 0,
    explanation:
      "В `compilerOptions` задают `target`, `module`, `strict`, `paths` и т.д., а `include`/`exclude` определяют, какие файлы входят в проект. Зависимости описывает `package.json`, а типы — `.d.ts`-файлы. Конфиги можно наследовать через `extends`.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Как постепенно перевести JS-проект на TypeScript?",
    options: [
      "Включить `allowJs`, переименовывать файлы по одному и ужесточать проверки",
      "Переписать весь проект на TS за один раз, иначе он не соберётся",
      "Добавить `// @ts-nocheck` во все файлы навсегда",
    ],
    answer: 0,
    explanation:
      "`allowJs` позволяет смешивать JS и TS, `checkJs` и JSDoc дают типы без переименования. Начинают с листовых модулей и утилит, затем ужесточают `strict`-флаги. Полная переписка рискованна и останавливает разработку.",
    sources: ["ts-migrating"],
  },
  {
    question: "Чем `Required<T>` отличается от `Partial<T>`?",
    options: [
      "`Required` делает все свойства обязательными, `Partial` — необязательными",
      "`Required` убирает модификатор `readonly`, а `Partial` — добавляет",
      "Это синонимы: оба делают свойства обязательными для объекта",
    ],
    answer: 0,
    explanation:
      "Они противоположны: `Required` убирает модификатор `?`, `Partial` добавляет его. За `readonly` отвечает `Readonly<T>`. Все эти утилиты — сопоставленные типы, которые можно написать и самостоятельно.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Как указать, что функция принимает любое количество чисел?",
    options: [
      "`function sum(...nums: number[])`",
      "`function sum(nums...: number)`",
      "`function sum(*nums: number)`",
    ],
    answer: 0,
    explanation:
      "Rest-параметр собирает аргументы в массив, его тип — массив или кортеж. Вызов: `sum(1, 2, 3)` или `sum(...arr)`.",
    sources: ["ts-functions"],
  },
];

export default questions;
