import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Чи можна за `strictFunctionTypes` присвоїти `(x: Dog) => void` змінній типу `(x: Animal) => void`?",
    options: [
      "Ні: параметри функцій перевіряються контраваріантно",
      "Так: параметри функцій перевіряються коваріантно",
      "Так, але лише якщо `Dog` — клас, а не інтерфейс",
    ],
    answer: 0,
    explanation:
      "Змінна обіцяє приймати будь-яке `Animal`, а функція вміє працювати лише з `Dog` — виклик із `Cat` зламається. Тому підтип за параметром іде у зворотний бік: `(x: Animal) => void` можна присвоїти туди, де чекають `(x: Dog) => void`, але не навпаки.",
    sources: ["ts-type-compatibility", "ts-strict"],
  },
  {
    question: "Чому `strictFunctionTypes` не діє на метод, оголошений як `handle(x: Dog): void`?",
    options: [
      "Параметри методів (method syntax) перевіряються біваріантно заради сумісності",
      "Методи класів та інтерфейсів узагалі не перевіряються на сумісність",
      "Прапорець діє лише на стрілкові функції, оголошені в класах",
    ],
    answer: 0,
    explanation:
      "Біваріантність методів залишили, щоб багато вбудованих типів (наприклад, `Array<T>`) лишалися сумісними. Якщо оголосити властивість-функцію `handle: (x: Dog) => void`, перевірка буде строгою. Тому для колбеків в інтерфейсах часто обирають синтаксис властивості.",
    sources: ["ts-type-compatibility", "ts-tsconfig"],
  },
  {
    question: "Чому дорівнює `ToArray<string | number>`, якщо `type ToArray<T> = T extends any ? T[] : never`?",
    options: ["`string[] | number[]`", "`(string | number)[]`", "`never`"],
    answer: 0,
    explanation:
      "Умовний тип над «голим» параметром розподіляється по union: умова застосовується до кожного члена окремо. Це distributive conditional type — на ньому побудовані `Exclude` і `Extract`.",
    sources: ["ts-conditional"],
  },
  {
    question: "Як вимкнути розподіл умовного типу по union?",
    options: [
      "Обгорнути обидві сторони в кортеж: `[T] extends [U] ? X : Y`",
      "Додати опцію `distributive: false` у `compilerOptions`",
      "Використати `infer U` замість `extends` у перевірці",
    ],
    answer: 0,
    explanation:
      "Розподіл спрацьовує лише тоді, коли тип, що перевіряється, — «голий» параметр. Кортеж `[T]` робить його складеним, і union перевіряється цілком: `[string | number] extends [string]` → false. Налаштування компілятора для цього немає.",
    sources: ["ts-conditional"],
  },
  {
    question: "Чому `type IsNever<T> = T extends never ? true : false` дає `never` для `IsNever<never>`?",
    options: [
      "`never` — порожній union, і розподіл по ньому дає порожній результат",
      "Це баг компілятора, тому `never` узагалі не можна перевіряти",
      "`never` завжди сумісний із літералом `false` в умовних типах",
    ],
    answer: 0,
    explanation:
      "Розподільний умовний тип застосовується до кожного члена union, а в `never` членів немає — результат `never`. Правильна перевірка: `[T] extends [never] ? true : false`.",
    sources: ["ts-conditional"],
  },
  {
    question: "Як реалізувати `DeepPartial<T>`?",
    code: `type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;`,
    options: [
      "Рекурсивним mapped type із `?` на всіх рівнях",
      "Вбудованою утилітою `Partial<T, 'deep'>` з lib.d.ts",
      "Ніяк: рекурсивні псевдоніми типів у TypeScript заборонені",
    ],
    answer: 0,
    explanation:
      "Псевдоніми типів можуть посилатися на себе. У реальній реалізації варто окремо обробити масиви, функції й `Date`, щоб не «розбирати» їх на властивості. Глибока рекурсія має ліміт інстанціювання, тому величезні типи сповільнюють компілятор.",
    sources: ["ts-mapped", "ts-conditional"],
  },
  {
    question: "Навіщо потрібні брендовані (branded) типи?",
    code: `type UserId = string & { readonly __brand: 'UserId' };`,
    options: [
      "Щоб розрізняти структурно однакові типи, наприклад `UserId` і `OrderId`",
      "Щоб додати властивість `__brand` до всіх рядків у рантаймі",
      "Щоб пришвидшити порівняння рядкових типів компілятором",
    ],
    answer: 0,
    explanation:
      "Структурна типізація вважає всі рядки сумісними, і `deleteUser(orderId)` скомпілюється. Бренд — фіктивна властивість, що існує лише в типах; значення створює функція-конструктор із перевіркою (`toUserId(s): UserId`). Так імітують номінальну типізацію.",
    sources: ["ts-type-compatibility"],
  },
  {
    question: "Як лишити в типі лише властивості-функції?",
    code: `type Methods<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};`,
    options: [
      "Remapping ключа в `never` виключає властивість із результату",
      "`as never` робить значення властивості типом `never`",
      "Цей код спричиняє помилку компіляції",
    ],
    answer: 0,
    explanation:
      "Якщо вираз після `as` обчислюється в `never`, ключ відкидається. Це стандартний прийом фільтрації ключів за типом значення. Без `as` довелося б спершу обчислити union ключів, а потім застосувати `Pick`.",
    sources: ["ts-mapped"],
  },
  {
    question: "Що поверне `Split<'a/b/c'>`?",
    code: `type Split<S extends string> =
  S extends \`\${infer Head}/\${infer Rest}\`
    ? [Head, ...Split<Rest>]
    : [S];`,
    options: ["`['a', 'b', 'c']`", "`string[]` (загальний тип)", "`['a/b/c']` (без розбору)"],
    answer: 0,
    explanation:
      "`infer` усередині шаблонного літерала розбирає рядок: `Head` захоплює частину до першого `/`, `Rest` — решту. Рекурсія й варіативні кортежі збирають результат. Так типізують параметри маршрутів на кшталт `/users/:id`.",
    sources: ["ts-template-literal", "ts-conditional"],
  },
  {
    question: "Що таке варіативні кортежі (variadic tuple types)?",
    code: `type Concat<A extends unknown[], B extends unknown[]> = [...A, ...B];`,
    options: [
      "Кортежі, у яких spread дженерик-кортежів зберігає точні типи елементів",
      "Кортежі без обмеження довжини, еквівалентні масиву `any[]` у TS",
      "Кортежі, елементи яких компілятор дозволяє міняти місцями",
    ],
    answer: 0,
    explanation:
      "`Concat<[1, 2], ['a']>` → `[1, 2, 'a']`. Це дає змогу точно типізувати `concat`, `curry`, `Promise.all`, функції-обгортки з префіксними аргументами.",
    sources: ["ts-objects", "ts-generics"],
  },
  {
    question: "Що дає модифікатор `const` у параметра типу (TS 5.0)?",
    code: `function routes<const T extends readonly string[]>(r: T) { return r; }
const r = routes(['home', 'about']);`,
    options: [
      "Літеральне виведення, як з `as const`: `r` — `readonly ['home', 'about']`",
      "Заборону змінювати аргумент усередині функції під час виконання",
      "Тип `T` не можна перевизначити явним аргументом під час виклику",
    ],
    answer: 0,
    explanation:
      "Без `const` вивелося б `string[]`, і тому, хто викликає, довелося б писати `as const`. Модифікатор діє лише на виведення типів, а не на рантайм. Обмеження `readonly string[]` потрібне, щоб літерал масиву підійшов як readonly-кортеж.",
    sources: ["ts-5-0"],
  },
  {
    question: "Для чого утиліта `NoInfer<T>` (TS 5.4)?",
    code: `function pick<C extends string>(colors: C[], fallback: NoInfer<C>) {}
pick(['red', 'blue'], 'green');`,
    options: [
      "Не дає виводити `C` з цього аргументу — буде помилка",
      "Вимикає виведення типів для всієї функції та її аргументів",
      "Робить параметр `fallback` необов'язковим зі значенням за замовчуванням",
    ],
    answer: 0,
    explanation:
      "Без `NoInfer` TS вивів би `C` як `'red' | 'blue' | 'green'` з обох аргументів, і помилки не було б. `NoInfer` каже: «бери `C` з інших місць і лише перевіряй цей аргумент».",
    sources: ["ts-5-4"],
  },
  {
    question: "Що робить `infer N extends number` в умовному типі?",
    code: `type ToNum<S> = S extends \`\${infer N extends number}\` ? N : never;
type X = ToNum<'42'>;`,
    options: [
      "Виводить `N` з обмеженням — `X` буде літеральним типом `42`",
      "Перетворює рядок `'42'` на число в рантаймі через `Number()`",
      "Спричиняє помилку компіляції: `infer` не підтримує `extends`",
    ],
    answer: 0,
    explanation:
      "Обмеження в `infer` (TS 4.7+) не лише перевіряє сумісність, а й дає змогу вивести літеральний числовий тип із рядка. Раніше для цього були потрібні вкладені умовні типи.",
    sources: ["ts-conditional", "ts-template-literal"],
  },
  {
    question: "У якому порядку писати перевантаження функції?",
    options: [
      "Від конкретніших до загальніших — TS обирає першу відповідну згори",
      "Від загальних до конкретних — TS обирає останню відповідну",
      "Порядок не важливий: TS сам обирає найточнішу сигнатуру",
    ],
    answer: 0,
    explanation:
      "Якщо загальне перевантаження `(x: any)` стоїть першим, воно «перехопить» усі виклики, і конкретні сигнатури стануть марними. Ще порада: не робити перевантажень, що відрізняються лише останнім параметром, — краще необов'язковий параметр.",
    sources: ["ts-functions", "ts-dts-dos-donts"],
  },
  {
    question: "Як додати поле `user` до типу `Request` бібліотеки Express?",
    code: `declare module 'express-serve-static-core' {
  interface Request { user?: User }
}`,
    options: [
      "Module augmentation через `declare module` і злиття",
      "Відредагувати декларації просто в `node_modules/@types/express`",
      "Створити власний тип `Request` і перевизначити імпорт через `paths`",
    ],
    answer: 0,
    explanation:
      "Augmentation дає змогу розширити типи стороннього модуля без форку: інтерфейси зливаються. Файл має бути модулем (містити `import`/`export`) і входити в проєкт. Правки в `node_modules` загубляться під час перевстановлення.",
    sources: ["ts-declaration-merging"],
  },
  {
    question: "Чого вимагає прапорець `verbatimModuleSyntax`?",
    options: [
      "Явно позначати імпорти типів через `import type`",
      "Використовувати лише CommonJS-модулі з `require`",
      "Писати розширення `.js` в усіх відносних імпортах",
    ],
    answer: 0,
    explanation:
      "Правило просте: усе без модифікатора `type` лишається у вихідному JS, усе з `type` — стирається. Це робить результат передбачуваним для будь-якого транспілятора й замінює застарілі `importsNotUsedAsValues` і `preserveValueImports`.",
    sources: ["ts-tsconfig", "ts-modules"],
  },
  {
    question: "Що забороняє прапорець `erasableSyntaxOnly` (TS 5.8)?",
    options: [
      "Синтаксис, що потребує генерації коду: `enum`, `namespace`",
      "Будь-які анотації типів у `.ts`-файлах, крім JSDoc",
      "Використання `any`, `unknown` і тверджень `as`",
    ],
    answer: 0,
    explanation:
      "Node.js уміє запускати TypeScript, просто стираючи типи (type stripping). Конструкції, що потребують генерації коду, так не працюють. Прапорець повідомляє про них заздалегідь, щоб код виконувався без окремої компіляції.",
    sources: ["ts-5-8"],
  },
  {
    question: "Навіщо Project References (`references`, `composite`)?",
    options: [
      "Розбити репозиторій на проєкти, що збираються інкрементально",
      "Підключати типи з npm-пакетів без установлення `@types`",
      "Посилатися на документацію з коментарів TSDoc",
    ],
    answer: 0,
    explanation:
      "Кожен підпроєкт компілюється окремо й видає `.d.ts`, а залежні проєкти використовують декларації, а не вихідний код. Це пришвидшує перевірку типів і забезпечує межі між пакетами монорепозиторію.",
    sources: ["ts-project-references"],
  },
  {
    question: "Чим ризикує ввімкнення `skipLibCheck: true`?",
    options: [
      "Помилки всередині `.d.ts`, зокрема ваших, не знайдуться",
      "Типи з `node_modules` узагалі перестануть використовуватися",
      "Компіляція стане помітно повільнішою",
    ],
    answer: 0,
    explanation:
      "Прапорець пропускає перевірку файлів декларацій — збирання швидше й не ламається через конфлікти між `@types`. Але помилки в деклараціях (включно з власними `.d.ts`) лишаться непоміченими. Використовувати типи з бібліотек прапорець не заважає.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Як знайти причину повільної перевірки типів у великому проєкті?",
    options: [
      "`tsc --extendedDiagnostics` і `--generateTrace`",
      "Видаляти файли з проєкту по одному, доки не стане швидше",
      "Вимкнути `strict` — перевірки стануть швидкими",
    ],
    answer: 0,
    explanation:
      "Діагностика показує час етапів і кількість інстанціювань, а трейс (аналізують `@typescript/analyze-trace` або в браузері) — які типи найдорожчі. Часті винуватці: величезні union, глибока рекурсія, складні перетини, відсутність анотацій типу, що повертається, в експортів.",
    sources: ["ts-performance-wiki"],
  },
  {
    question: "Чи можна передати `readonly string[]` у функцію, що приймає `string[]`?",
    options: [
      "Ні: функція могла б змінити масив",
      "Так: `readonly` — лише підказка, сумісність не перевіряється",
      "Так, але лише за вимкненого strict-режиму",
    ],
    answer: 0,
    explanation:
      "Зворотний напрямок (`string[]` → `readonly string[]`) дозволений. Тому параметри, які функція не змінює, краще оголошувати як `readonly T[]` — так їх можна викликати і зі змінними, і з readonly-масивами.",
    sources: ["ts-objects", "ts-type-compatibility"],
  },
  {
    question: "Що дає тип `this`, що повертається, у методі класу?",
    code: `class Query {
  where(c: string): this { /* ... */ return this; }
}
class UserQuery extends Query { active(): this { return this; } }
new UserQuery().where('x').active();`,
    options: [
      "Поліморфний `this`: ланцюжок методів зберігає тип нащадка",
      "Метод повертає завжди тип базового класу `Query`",
      "Це помилка: `this` не можна використовувати як тип",
    ],
    answer: 0,
    explanation:
      "Якби `where` повертав `Query`, після нього `.active()` був би недоступний. Поліморфний `this` зручний для fluent API та білдерів. Є також `this is T` у type guard-методах.",
    sources: ["ts-classes"],
  },
  {
    question: "Для чого анотації варіантності `in` і `out` у параметрів типу (TS 4.7)?",
    code: `interface Producer<out T> { get(): T }
interface Consumer<in T> { set(v: T): void }`,
    options: [
      "Явно задають коваріантність/контраваріантність, пришвидшуючи й уточнюючи перевірки",
      "Визначають, які параметри можна читати й писати в рантаймі",
      "Це синтаксис для вхідних і вихідних параметрів, як у C#-методах",
    ],
    answer: 0,
    explanation:
      "Зазвичай TS обчислює варіантність сам, але для складних рекурсивних типів це дорого й іноді неточно. Анотація перевіряється компілятором і використовується під час порівняння. Потрібна рідко — у бібліотеках зі складними типами.",
    sources: ["ts-generics", "ts-type-compatibility"],
  },
  {
    question: "Чому шаблонний тип `` `${A}-${B}-${C}` `` із трьох великих union може спричинити помилку?",
    options: [
      "Виходить завеликий union, а в компілятора є ліміт",
      "Шаблонні типи не підтримують більше двох підстановок",
      "Union-типи взагалі не можна підставляти в шаблонні літерали",
    ],
    answer: 0,
    explanation:
      "Шаблон з union розподіляється по всіх комбінаціях: 100 × 100 × 100 = 1 000 000 членів. TypeScript обмежує розмір union (близько 100 000) і видає помилку «Expression produces a union type that is too complex». Рішення — загальніший тип (`` `${string}-${string}` ``) або валідація функцією.",
    sources: ["ts-template-literal", "ts-performance-wiki"],
  },
  {
    question: "Як працює трюк `UnionToIntersection`?",
    code: `type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends (x: infer I) => void
    ? I : never;`,
    options: [
      "Виведення з контраваріантної позиції параметра об'єднує кандидатів у перетин",
      "Компілятор просто замінює `|` на `&` за особливим правилом для цієї назви",
      "Це не працює — перетин не можна отримати з union",
    ],
    answer: 0,
    explanation:
      "Спершу union розподіляється в union функцій `(x: A) => void | (x: B) => void`. Потім під час виведення `I` з позиції параметра (контраваріантної) кілька кандидатів об'єднуються через перетин: `A & B`. Це хрестоматійний приклад type-level програмування.",
    sources: ["ts-conditional", "type-challenges"],
  },
  {
    question: "Чому `Record<Status, string>` корисніший за `{ [k: string]: string }` для словника за статусами?",
    options: [
      "Компілятор вимагатиме ключ для кожного статусу",
      "Індексна сигнатура не підтримує рядкових значень",
      "`Record` компілюється в `Map` і працює швидше",
    ],
    answer: 0,
    explanation:
      "Додали в union `Status` новий варіант — усі `Record<Status, ...>` перестануть компілюватися, доки не додасте переклад, іконку тощо. Індексна сигнатура приймає будь-які рядки й не гарантує повноти.",
    sources: ["ts-utility-types", "ts-objects"],
  },
  {
    question: "Що змінилося у виведенні предикатів типу в TS 5.5?",
    code: `const nums = [1, null, 2].filter(x => x !== null);`,
    options: [
      "TS виводить предикат `x is number`, і `nums` — `number[]`",
      "`filter` тепер завжди повертає `never[]` для змішаних масивів",
      "Предикати типів видалено на користь функцій-тверджень",
    ],
    answer: 0,
    explanation:
      "Раніше `nums` був `(number | null)[]`, і доводилося писати `(x): x is number => x !== null`. Тепер компілятор виводить предикат для простих функцій, якщо повернене `true` справді звужує тип.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Для чого оголошення `using` (TS 5.2)?",
    code: `{
  using file = openFile('log.txt');
  // ...
} // file[Symbol.dispose]() викличеться автоматично`,
    options: [
      "Автоматичний виклик `Symbol.dispose` під час виходу з блоку",
      "Імпорт модулів усередині блоку коду, як `import` у Python",
      "Заміна `const` для глибоко незмінних об'єктів",
    ],
    answer: 0,
    explanation:
      "Це реалізація пропозиції ECMAScript Explicit Resource Management: ресурс звільняється навіть у разі винятку — як `try/finally`, але коротше. Для асинхронних ресурсів — `await using` і `Symbol.asyncDispose`. Зручно для з'єднань, файлів, блокувань, підписок у тестах.",
    sources: ["ts-handbook"],
  },
  {
    question: "Що поверне `(typeof users)[number]`, якщо `users: User[]`?",
    options: ["`User`", "`number`", "`User[]`"],
    answer: 0,
    explanation:
      "Індексний доступ за `number` повертає тип елемента масиву або union елементів кортежу. Популярна зв'язка: `const roles = [...] as const; type Role = (typeof roles)[number]`.",
    sources: ["ts-indexed-access"],
  },
  {
    question: "Що дає mapped type `{ [K in keyof T]: Box<T[K]> }`, якщо `T` — кортеж `[string, number]`?",
    options: [
      "Кортеж `[Box<string>, Box<number>]`",
      "Об'єкт із властивостями `0`, `1`, `length` і методами",
      "Помилку: mapped types не працюють із кортежами",
    ],
    answer: 0,
    explanation:
      "Mapped type над `keyof T`, де `T` — параметр-кортеж або масив, відображає елементи й зберігає кортежність, довжину й модифікатори. Це дає змогу типізувати, наприклад, `Promise.all` через `{ [K in keyof T]: Awaited<T[K]> }`.",
    sources: ["ts-mapped"],
  },
  {
    question: "Як отримати тип елемента `Set<T>` або `Map<K, V>` зі значення?",
    code: `const ids = new Set(['a', 'b']);
type Id = typeof ids extends Set<infer T> ? T : never;`,
    options: [
      "Через умовний тип з `infer` за шаблоном `Set<infer T>`",
      "Через індексний доступ `(typeof ids)[number]`",
      "Через утиліту `ElementType<typeof ids>` зі стандартної бібліотеки",
    ],
    answer: 0,
    explanation:
      "У `Set` немає числової індексної сигнатури, тому `[number]` не працює. Умовний тип з `infer` видобуває параметр будь-якого дженерика: `Map<infer K, infer V>`, `Promise<infer R>`. Вбудованої утиліти `ElementType` немає. Тут `Id` — `string`.",
    sources: ["ts-conditional", "ts-indexed-access"],
  },
  {
    question: "Навіщо ключове слово `declare`?",
    code: `declare const __APP_VERSION__: string;`,
    options: [
      "Описати сутність, що існує в рантаймі, без генерації коду",
      "Оголосити змінну, яку створить компілятор",
      "Зробити змінну глобальною в рантаймі",
    ],
    answer: 0,
    explanation:
      "Ambient-оголошення повідомляють компілятору про те, що визначено деінде: глобальні змінні, які підставляє збирач, скрипти з CDN, модулі без типів (`declare module 'legacy-lib'`). JS-коду `declare` не створює.",
    sources: ["ts-dts"],
  },
  {
    question: "Як перевірити тип у тестах, щоб отримати помилку, якщо помилки компіляції НЕ буде?",
    options: [
      "`// @ts-expect-error` над рядком, що перевіряється",
      "`// @ts-ignore` над рядком, що перевіряється",
      "`// @ts-nocheck` на початку тестового файлу",
    ],
    answer: 0,
    explanation:
      "`@ts-expect-error` придушує помилку й сам стає помилкою, якщо придушувати нічого — так тест типів «падає», коли тип став завеликим. `@ts-ignore` мовчить завжди й ховає проблеми. Для тверджень є `expectTypeOf` у Vitest, `tsd`, `@ts-expect-error` у type-challenges.",
    sources: ["ts-handbook", "type-challenges"],
  },
  {
    question: "Коли виправдане подвійне твердження `x as unknown as T`?",
    options: [
      "Майже ніколи: лише для свідомого обходу з перевіркою",
      "Завжди, коли компілятор свариться на несумісні типи",
      "Це стандартний і безпечний спосіб зведення JSON до типу",
    ],
    answer: 0,
    explanation:
      "Звичайне `as` заборонене між непов'язаними типами; через `unknown` можна стверджувати будь-що — і помилитися. Якщо без цього не обійтися (наприклад, у низькорівневій утиліті), ховайте його всередині функції з рантайм-перевіркою й тестами. Для JSON — валідація схемою.",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Чому тип `Function` краще не використовувати для колбеків?",
    options: [
      "Приймає будь-яку функцію, а виклик не перевіряється",
      "Він забороняє передавати стрілкові функції й методи",
      "Він застарів і спричиняє помилку компіляції в strict-режимі",
    ],
    answer: 0,
    explanation:
      "`Function` описує будь-яку функцію, її виклик небезпечний. Краще точна сигнатура `(value: string) => void`, а для «будь-якої функції» — `(...args: never[]) => unknown` або `(...args: any[]) => any`. Аналогічно `Object` і `{}` краще замінити на `object` або `unknown`.",
    sources: ["ts-dts-dos-donts", "ts-functions"],
  },
  {
    question: "Чому для `a: { x: string } | { y: number }` не можна написати `a.x`?",
    options: [
      "Доступні лише спільні властивості union; звузьте тип через `'x' in a`",
      "Властивості union-типів завжди доступні лише для читання",
      "Треба спершу звести `a` до `any` — так задумано",
    ],
    answer: 0,
    explanation:
      "Компілятор не знає, який варіант в `a`, а в другого `x` немає. Після `if ('x' in a)` тип звужено. Альтернатива — спільний дискримінатор (`kind`) або явні `x?: undefined` у другому варіанті.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Що змінює прапорець `exactOptionalPropertyTypes`?",
    options: [
      "`{ a?: string }` більше не приймає явний `a: undefined`",
      "Робить усі необов'язкові властивості обов'язковими",
      "Забороняє необов'язкові властивості в інтерфейсах",
    ],
    answer: 0,
    explanation:
      "Без прапорця `a?: string` еквівалентно `a?: string | undefined`. З прапорцем розрізняються «ключа немає» і «ключ є зі значенням `undefined`», що важливо для `Object.keys`, `in` і spread. Якщо `undefined` потрібен явно — пишуть `a?: string | undefined`.",
    sources: ["ts-tsconfig", "ts-objects"],
  },
  {
    question: "Що поверне `keyof (A | B)`, якщо `A = { id; name }`, `B = { id; price }`?",
    options: ["`'id'`", "`'id' | 'name' | 'price'`", "`never`"],
    answer: 0,
    explanation:
      "Значення union може бути будь-яким із варіантів, тому безпечно звертатися лише до спільних ключів. Для `keyof (A & B)` вийде об'єднання всіх ключів. Розподілити `keyof` по членах union можна умовним типом: `T extends any ? keyof T : never`.",
    sources: ["ts-keyof"],
  },
  {
    question: "Як увімкнути перевірку типів у JS-файлах без переведення на TS?",
    options: [
      "`// @ts-check` і типи через JSDoc",
      "Перейменувати файл на `.jsx` або `.mjs`",
      "Це неможливо без розширення файлу `.ts`",
    ],
    answer: 0,
    explanation:
      "TypeScript розуміє JSDoc: `/** @param {string} name */`, `@type`, `@typedef`, імпорт типів `@import`. Так влаштована типізація багатьох JS-бібліотек і поступова міграція. Перевірка працює в редакторі й через `tsc --noEmit`.",
    sources: ["ts-migrating", "ts-tsconfig"],
  },
  {
    question: "Як типізувати параметр, що приймає конструктор абстрактного класу?",
    options: [
      "`abstract new (...args: any[]) => T`",
      "`typeof T`",
      "`Constructor<T>` зі стандартної бібліотеки",
    ],
    answer: 0,
    explanation:
      "Абстрактні конструкторні типи (TS 4.2) дають змогу приймати й абстрактні, і звичайні класи — наприклад, у функціях-міксинах. `new (...args) => T` не прийме абстрактного класу. Вбудованого `Constructor<T>` немає, його зазвичай оголошують самі.",
    sources: ["ts-classes"],
  },
  {
    question: "Чи зберігається звуження змінної `let` усередині колбека?",
    code: `function f(x: string | number) {
  if (typeof x === 'string') {
    setTimeout(() => x.toUpperCase());
  }
}`,
    options: [
      "Так, з TS 5.4, якщо далі змінна не змінюється",
      "Ні, ніколи: у замиканнях звуження завжди скидається",
      "Так, але лише для `const`-змінних у будь-якій версії",
    ],
    answer: 0,
    explanation:
      "Раніше в колбеку TS вважав, що `x` може бути змінений, і скидав звуження до `string | number`. З 5.4 компілятор розуміє, що після останнього присвоєння значення стабільне, і зберігає звуження. Для `const` воно працювало й раніше.",
    sources: ["ts-5-4", "ts-narrowing"],
  },
  {
    question: "Що таке гомоморфний mapped type і що він зберігає?",
    options: [
      "Тип `{ [K in keyof T]: ... }`, що зберігає модифікатори `T`",
      "Тип, що зіставляє однакові значення різних об'єктів",
      "Тип, у якому всі властивості мають той самий тип значення",
    ],
    answer: 0,
    explanation:
      "Коли mapped type проходить по `keyof T` напряму, TS переносить модифікатори властивостей `T`. Тому `Partial<Readonly<T>>` лишається readonly. Під час перебору довільного union ключів (`K in 'a' | 'b'`) модифікатори не зберігаються.",
    sources: ["ts-mapped"],
  },
  {
    question: "Як типізувати `Promise.all`-подібну функцію над кортежем промісів?",
    options: [
      "Дженерик-кортеж `[...T]` і mapped type з `Awaited<T[K]>`",
      "Масив `Promise<any>[]` і результат `Promise<any[]>`",
      "Один дженерик `T` для всіх промісів і `Promise<T>`",
    ],
    answer: 0,
    explanation:
      "`[...T]` підказує вивести кортеж, а не масив, а гомоморфний mapped type розгортає кожен елемент: `all([fetchUser(), fetchPosts()])` → `Promise<[User, Post[]]>`. Варіанти з `any` або одним `T` втрачають позиційні типи.",
    sources: ["ts-mapped", "ts-generics"],
  },
  {
    question: "Чому функції-експорти в бібліотеці радять анотувати типом, що повертається?",
    options: [
      "Це пришвидшує перевірку й фіксує публічний контракт",
      "Без анотації TypeScript не зможе вивести тип результату",
      "Це вимога специфікації ECMAScript-модулів",
    ],
    answer: 0,
    explanation:
      "Виведення складного типу доводиться повторювати всюди, де функцію використано, а декларації стають громіздкими. Явний тип робить контракт стабільним: зміна реалізації не «протече» в API. З `isolatedDeclarations` (TS 5.5) анотації експортів стають обов'язковими.",
    sources: ["ts-performance-wiki", "ts-dts"],
  },
  {
    question: "Чим `isolatedDeclarations` (TS 5.5) корисний для монорепозиторіїв?",
    options: [
      "Дає змогу генерувати `.d.ts` пофайлово й паралельно",
      "Забороняє імпорт типів між пакетами монорепозиторію",
      "Ізолює кожен пакет в окремий процес Node.js під час збирання",
    ],
    answer: 0,
    explanation:
      "Прапорець вимагає, щоб експортовані API були явно анотовані, — тоді декларації можна отримати, дивлячись лише на один файл. Це дає змогу стороннім інструментам (oxc, swc) генерувати `.d.ts` паралельно, не чекаючи повної перевірки залежностей.",
    sources: ["ts-tsconfig", "ts-project-references"],
  },
  {
    question: "Чим `T extends object` відрізняється від `T extends {}` в обмеженні дженерика?",
    options: [
      "`object` — не примітиви, `{}` — усе, крім null/undefined",
      "Це одне й те саме обмеження з різним синтаксисом",
      "`{}` дозволяє лише порожні об'єкти без властивостей",
    ],
    answer: 0,
    explanation:
      "`{}` означає «будь-яке значення з властивостями», а в рядків і чисел властивості є, тому `T extends {}` приймає `'abc'` і `42`. Щоб дозволити лише об'єкти (включно з масивами й функціями), використовують `object`. Для «будь-чого, крім null/undefined» `{}` — саме те, що треба.",
    sources: ["ts-everyday-types", "ts-generics"],
  },
  {
    question: "Чому інтерфейс розширюється швидше для компілятора, ніж перетин?",
    options: [
      "Зв'язки інтерфейсів кешуються, а перетини перераховуються",
      "Перетини перевіряються в рантаймі, а інтерфейси — ні",
      "Інтерфейси компілюються в класи й кешуються рушієм",
    ],
    answer: 0,
    explanation:
      "Компілятор запам'ятовує результат порівняння інтерфейсів за назвою, а перетин `A & B & C` щоразу доводиться нормалізувати й порівнювати структурно. У гарячих місцях із великими типами це помітно. Про це прямо йдеться у вікі продуктивності TypeScript.",
    sources: ["ts-performance-wiki"],
  },
  {
    question: "Як типізувати редʼюсер, щоб `payload` залежав від `type` дії?",
    options: [
      "Описати дії дискримінованим union за полем `type`",
      "Зробити `payload: any` і перевіряти його в кожному `case`",
      "Створити один інтерфейс `Action` з усіма полями необов'язковими",
    ],
    answer: 0,
    explanation:
      "`type Action = { type: 'add'; payload: Todo } | { type: 'remove'; payload: { id: string } }` — у `case 'add'` TS знає, що `payload` — `Todo`. З `never` у `default` отримуємо перевірку повноти. Redux Toolkit генерує такі типи автоматично з `createSlice`.",
    sources: ["ts-narrowing", "redux-typescript"],
  },
  {
    question: "Що поверне `T[keyof T]` для `T = { a: string; b: number }`?",
    options: ["`string | number`", "`'a' | 'b'`", "`{ a: string } | { b: number }`"],
    answer: 0,
    explanation:
      "Індексний доступ за union ключів дає union типів значень. Часто використовується для отримання union значень константного об'єкта: `typeof obj[keyof typeof obj]`.",
    sources: ["ts-indexed-access", "ts-keyof"],
  },
  {
    question: "Для чого використовується `declare module '*.svg'`?",
    code: `declare module '*.svg' {
  const src: string;
  export default src;
}`,
    options: [
      "Описати тип імпорту ресурсів, які обробляє збирач",
      "Завантажити всі SVG-файли проєкту в рантаймі одним бандлом",
      "Заборонити імпорт SVG-файлів у TypeScript-коді проєкту",
    ],
    answer: 0,
    explanation:
      "Wildcard-оголошення модулів описують, що поверне імпорт файлів, які обробляє збирач (картинки, CSS Modules, `?raw`). Фреймворки зазвичай постачають такі декларації самі (`next-env.d.ts`, `vite/client`).",
    sources: ["ts-dts", "ts-modules"],
  },
];

export default questions;
