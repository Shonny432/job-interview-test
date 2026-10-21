import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Що таке користувацький type guard?",
    code: `function isUser(x: unknown): x is User {
  return typeof x === "object" && x !== null && "id" in x;
}`,
    options: [
      "Функція з типом результату `x is T`, що звужує тип аргументу за `true`",
      "Декоратор, що перевіряє тип аргументу в рантаймі за кожного виклику",
      "Синтаксис твердження типу, еквівалентний запису `x as User` у коді",
    ],
    answer: 0,
    explanation:
      "Після `if (isUser(data))` усередині гілки `data` має тип `User`. Відповідальність за коректність перевірки на розробникові: компілятор повірить предикату. З TS 5.5 прості предикати виводяться автоматично, наприклад у `arr.filter(x => x !== null)`.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Як гарантувати, що `switch` обробив усі варіанти union?",
    code: `function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2;
    case 'square': return s.size ** 2;
    default: { const _exhaustive: never = s; return _exhaustive; }
  }
}`,
    options: [
      "Присвоїти значення в `default` змінній типу `never`",
      "Додати коментар `// @ts-exhaustive` перед `switch`",
      "Увімкнути прапорець `strictSwitch` у розділі `compilerOptions`",
    ],
    answer: 0,
    explanation:
      "Якщо додати нову фігуру в `Shape` і забути `case`, у `default` лишиться непорожній тип, і присвоєння в `never` дасть помилку компіляції. Також допомагає прапорець `noImplicitReturns` і ESLint-правило `switch-exhaustiveness-check`.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Що означає `<T extends { id: string }>` у дженерику?",
    options: [
      "Обмеження: `T` має мати принаймні властивість `id: string`",
      "`T` успадковує клас із полем `id`, як за `class extends`",
      "`T` може бути лише рівно `{ id: string }` і нічим іншим",
    ],
    answer: 0,
    explanation:
      "Constraint дає змогу всередині функції безпечно звертатися до `item.id`, зберігаючи повний тип `T` у результаті. Передати можна будь-який об'єкт із відповідним `id` та іншими полями. Класи й успадкування тут ні до чого.",
    sources: ["ts-generics"],
  },
  {
    question: "Як типізувати функцію `getProp(obj, key)`, щоб результат залежав від ключа?",
    options: [
      "`function getProp<T, K extends keyof T>(obj: T, key: K): T[K]`",
      "`function getProp(obj: object, key: string): unknown`",
      "`function getProp<T>(obj: T, key: keyof any): T`",
    ],
    answer: 0,
    explanation:
      "`K extends keyof T` дозволяє лише наявні ключі, а індексний доступ `T[K]` дає точний тип значення: `getProp(user, 'age')` → `number`. Варіант з `any` втрачає типізацію, а `string` пропустить помилку в назві.",
    sources: ["ts-keyof", "ts-indexed-access", "ts-generics"],
  },
  {
    question: "Що таке зіставлений (mapped) тип?",
    code: `type Flags<T> = { [K in keyof T]: boolean };`,
    options: [
      "Тип, що створює нові властивості, перебираючи ключі іншого типу",
      "Тип для об'єкта `Map` зі стандартної бібліотеки JavaScript",
      "Тип, що зіставляє значення об'єкта в рантаймі",
    ],
    answer: 0,
    explanation:
      "`[K in keyof T]` проходить ключами. Можна змінювати тип значення, додавати або прибирати модифікатори (`readonly`, `?`, `-?`) і перейменовувати ключі через `as`. На mapped types побудовані `Partial`, `Readonly`, `Record`.",
    sources: ["ts-mapped"],
  },
  {
    question: "Що робить умовний тип `T extends string ? 'text' : 'other'`?",
    options: [
      "Обирає один із типів залежно від того, чи сумісний `T` зі `string`",
      "Перевіряє в рантаймі, чи є значення рядком, і кидає помилку",
      "Оголошує, що `T` успадковується від вбудованого класу `String`",
    ],
    answer: 0,
    explanation:
      "Умовні типи — «тернарник» на рівні типів. Разом з `infer` вони дають змогу видобувати частини типів. Застосовані до union, вони розподіляються по кожному члену (distributive conditional types).",
    sources: ["ts-conditional"],
  },
  {
    question: "Що робить `infer` у `type ElementType<T> = T extends (infer U)[] ? U : never`?",
    options: [
      "Оголошує змінну типу `U`, яку TS виводить зі збігу з шаблоном",
      "Запитує тип елемента масиву в компілятора під час виконання",
      "Робить `U` необов'язковим параметром дженерика зі значенням `unknown`",
    ],
    answer: 0,
    explanation:
      "`infer` використовується лише в `extends`-частині умовного типу: TS зіставляє `T` із шаблоном і «захоплює» потрібну частину. `ElementType<string[]>` → `string`. Так влаштовані `ReturnType`, `Parameters`, `Awaited`.",
    sources: ["ts-conditional"],
  },
  {
    question: "Що поверне `Awaited<Promise<Promise<number>>>`?",
    options: ["`number`", "`Promise<number>`", "`Promise<Promise<number>>`"],
    answer: 0,
    explanation:
      "`Awaited` рекурсивно розгортає проміси й thenable-об'єкти, повторюючи поведінку `await`. Зручно для типу результату async-функції: `Awaited<ReturnType<typeof fetchUser>>`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Чим `Exclude<T, U>` відрізняється від `Omit<T, K>`?",
    options: [
      "`Exclude` прибирає члени з union, `Omit` прибирає властивості з об'єктного типу",
      "`Exclude` прибирає властивості з об'єкта, `Omit` — члени з union",
      "Це синоніми з різним порядком параметрів типу в кутових дужках",
    ],
    answer: 0,
    explanation:
      "`Exclude<'a' | 'b' | 'c', 'a'>` → `'b' | 'c'`. `Omit<User, 'password'>` → об'єкт без поля. Парні утиліти: `Extract` (лишити відповідні члени union) і `Pick` (лишити властивості). `NonNullable<T>` прибирає `null` і `undefined`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Як працюють перевантаження функцій у TypeScript?",
    code: `function parse(x: string): number;
function parse(x: number): string;
function parse(x: string | number) { /* ... */ }`,
    options: [
      "Кілька сигнатур для виклику й одна прихована реалізація",
      "Для кожної сигнатури пишеться своя реалізація функції, як у Java",
      "Остання сигнатура перевизначає всі попередні, вони ігноруються",
    ],
    answer: 0,
    explanation:
      "Код, що викликає, бачить лише сигнатури перевантаження, і TS обирає першу відповідну згори вниз. Реалізація має бути сумісною з усіма. Часто перевантаження можна замінити union-параметром або дженериком з умовним типом.",
    sources: ["ts-functions"],
  },
  {
    question: "Що таке declaration merging?",
    options: [
      "Об'єднання однойменних оголошень, наприклад двох `interface Window`, в одне",
      "Автоматичне злиття двох npm-пакетів із типами в один під час установлення",
      "Об'єднання псевдоніма `type` та `interface` з однаковою назвою",
    ],
    answer: 0,
    explanation:
      "Інтерфейси, простори імен і деякі інші оголошення з однією назвою зливаються. Так розширюють глобальні типи: `interface Window { analytics: Analytics }` у `declare global`. Псевдоніми `type` не зливаються — повторне оголошення спричинить помилку.",
    sources: ["ts-declaration-merging"],
  },
  {
    question: "Для чого потрібен абстрактний клас?",
    options: [
      "Базовий клас зі спільним кодом і абстрактними методами без `new`",
      "Клас без методів, що використовується лише як тип для перевірок",
      "Клас, усі методи й властивості якого оголошено статичними",
    ],
    answer: 0,
    explanation:
      "`abstract class Repo { abstract find(id): T; log() {...} }` — нащадки мусять реалізувати `find`, а `log` отримують готовим. На відміну від інтерфейсу, абстрактний клас існує в рантаймі й може містити код і стан.",
    sources: ["ts-classes"],
  },
  {
    question: "Чим `protected` відрізняється від `private` у класах TypeScript?",
    options: [
      "`protected` доступний у нащадках, `private` — лише в самому класі",
      "`protected` доступний ззовні лише для читання, `private` — ні",
      "Це синоніми, `protected` — стара назва",
    ],
    answer: 0,
    explanation:
      "`public` (за замовчуванням) — доступний усюди, `protected` — у класі й підкласах, `private` — лише в класі, що його оголосив. Усі три — перевірки компілятора; для справжньої приватності в рантаймі є `#field`.",
    sources: ["ts-classes"],
  },
  {
    question: "Що робить оператор `satisfies`?",
    code: `const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, string | number[]>;`,
    options: [
      "Перевіряє відповідність типу, але зберігає точніший виведений тип",
      "Зводить значення до вказаного типу без перевірки, як оператор `as`",
      "Розширює тип значення до вказаного, втрачаючи деталі літералів",
    ],
    answer: 0,
    explanation:
      "З анотацією `: Record<...>` тип `palette.green` став би `string | number[]`. Із `satisfies` перевірка форми виконується, а `palette.green` лишається `string`, і можна викликати `.toUpperCase()`. На відміну від `as`, нічого не стверджується без перевірки.",
    sources: ["ts-4-9"],
  },
  {
    question: "Що таке шаблонні літеральні типи?",
    code: `type Event = 'click' | 'focus';
type Handler = \`on\${Capitalize<Event>}\`;`,
    options: [
      "Типи рядків, зібрані за шаблоном: тут `'onClick' | 'onFocus'`",
      "Шаблони для генерації коду під час компіляції",
      "Рядковий тип, що перевіряється регулярним виразом",
    ],
    answer: 0,
    explanation:
      "Шаблонні літерали працюють на рівні типів і розподіляються по union. Є вбудовані перетворення: `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`. Їх використовують для типізації ключів подій, CSS-змінних, маршрутів.",
    sources: ["ts-template-literal"],
  },
  {
    question: "Чому замість `enum` часто використовують об'єкт `as const`?",
    code: `const Status = { Active: 'active', Banned: 'banned' } as const;
type Status = typeof Status[keyof typeof Status];`,
    options: [
      "Це звичайний JS-об'єкт, а тип значень — union рядків",
      "`as const` працює в рантаймі в десятки разів швидше, ніж enum",
      "Enum видалено з TypeScript 5, і він більше не компілюється",
    ],
    answer: 0,
    explanation:
      "Об'єкт — стандартний JS: його можна ітерувати, він сумісний із режимом erasable syntax (Node.js type stripping). Тип — union рядків, що приймає й літерали з API. Числові enum, навпаки, приймають будь-яке число й створюють зворотне відображення. Enum не видалено.",
    sources: ["ts-enums", "ts-5-8"],
  },
  {
    question: "Чим `const enum` відрізняється від звичайного `enum`?",
    options: [
      "Значення підставляються інлайном під час компіляції, об'єкта в рантаймі немає",
      "Значення `const enum` не можна використовувати в `switch` і порівняннях",
      "`const enum` може містити лише рядкові значення",
    ],
    answer: 0,
    explanation:
      "`const enum` заощаджує розмір бандла, але погано поєднується з `isolatedModules` і транспіляторами, що обробляють файли окремо (Babel, esbuild, SWC): їм треба знати значення з іншого файлу. Тому в бібліотеках і сучасних збірках його уникають.",
    sources: ["ts-enums", "ts-tsconfig"],
  },
  {
    question: "Чим простори імен (`namespace`) відрізняються від ES-модулів?",
    options: [
      "Namespace — застарілий спосіб організації коду; зараз — модулі",
      "Namespace — новий стандарт ECMAScript, що замінює `import`/`export`",
      "Це синоніми: компілятор автоматично перетворює одне на інше",
    ],
    answer: 0,
    explanation:
      "Namespace з'явилися до ES-модулів і створюють об'єкти в рантаймі. Зараз код організовують файлами з `import`/`export`, а `declare namespace` іноді використовують у деклараціях для опису глобальних бібліотек. Namespace несумісні з `erasableSyntaxOnly`.",
    sources: ["ts-namespaces-modules", "ts-modules"],
  },
  {
    question: "Що таке функція-твердження (assertion function)?",
    code: `function assertIsString(x: unknown): asserts x is string {
  if (typeof x !== 'string') throw new Error('Not a string');
}`,
    options: [
      "Функція, після успішного виклику якої TS вважає тип аргументу звуженим",
      "Функція, що повертає `true` або `false` для перевірки типу",
      "Функція, що працює лише в тестах",
    ],
    answer: 0,
    explanation:
      "Після `assertIsString(value)` далі в коді `value` — `string`, без `if`. Якщо перевірка не пройшла, функція кидає виняток. На відміну від type guard (`x is T`), результат не треба обгортати в умову.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Як отримати props нативної кнопки, щоб розширити їх у своєму компоненті?",
    options: [
      "`React.ComponentProps<'button'>`",
      "`HTMLButtonElement` — тип props кнопки",
      "`React.ButtonProps` з пакета `@types/react`",
    ],
    answer: 0,
    explanation:
      "`type Props = React.ComponentProps<'button'> & { variant: 'primary' | 'ghost' }` — компонент приймає всі нативні атрибути (`onClick`, `disabled`, `aria-*`). `HTMLButtonElement` — тип DOM-вузла, а не props. `ComponentProps<typeof MyComp>` видобуває props будь-якого компонента.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "Як типізувати хуки Redux Toolkit у застосунку на TypeScript?",
    options: [
      "Вивести `RootState` і `AppDispatch` зі store і створити `useAppSelector`/`useAppDispatch`",
      "Типізувати кожен виклик `useSelector` як `any`",
      "Описати вручну інтерфейс усього state й оновлювати його за кожної зміни",
    ],
    answer: 0,
    explanation:
      "`type RootState = ReturnType<typeof store.getState>` і `type AppDispatch = typeof store.dispatch`. Потім `export const useAppSelector = useSelector.withTypes<RootState>()`. Типи виводяться з редʼюсерів, ручний опис не потрібен.",
    sources: ["redux-typescript"],
  },
  {
    question: "Як типізувати дженерик-компонент списку?",
    code: `function List<T>({ items, render }: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) { /* ... */ }`,
    options: [
      "Оголосити параметр типу у функції-компонента — TS виведе `T` з `items`",
      "Дженерики в React-компонентах не підтримуються через синтаксис JSX",
      "Використати `React.FC<T>`, де `T` — тип елемента списку",
    ],
    answer: 0,
    explanation:
      "`<List items={users} render={u => u.name} />` — `T` виведеться як `User`, і `u` у `render` буде типізований. У `.tsx` у стрілкових функцій пишуть `<T,>`, щоб парсер не сприйняв це за JSX. `React.FC` дженерики не передає.",
    sources: ["ts-react-cheatsheet", "ts-generics"],
  },
  {
    question: "Що робить `Extract<'a' | 'b' | 1 | 2, string>`?",
    options: ["`'a' | 'b'`", "`1 | 2`", "`never`"],
    answer: 0,
    explanation:
      "`Extract<T, U>` лишає члени union, сумісні з `U` — тут рядкові літерали. Протилежний `Exclude` лишив би `1 | 2`. Обидві утиліти — розподілені умовні типи.",
    sources: ["ts-utility-types", "ts-conditional"],
  },
  {
    question: "Що поверне `NonNullable<string | null | undefined>`?",
    options: ["`string`", "`string | undefined`", "`never`"],
    answer: 0,
    explanation:
      "`NonNullable<T>` виключає `null` і `undefined` з union. Зараз він реалізований як `T & {}`. Зручно для значень після перевірки або в результатах `filter`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Чим `object`, `{}` і `Record<string, unknown>` відрізняються як типи?",
    options: [
      "`{}` — будь-що не-null, `object` — не примітив, `Record` — словник",
      "Це три синоніми для «будь-якого об'єкта» в TypeScript",
      "`{}` — лише порожній об'єкт без жодної властивості",
    ],
    answer: 0,
    explanation:
      "`{}` приймає і рядки, і числа — усе, крім `null` і `undefined`, що часто дивує. `object` виключає примітиви. `Record<string, unknown>` — об'єкт із довільними рядковими ключами, до значень якого можна звертатися. Для «будь-якого значення» краще `unknown`.",
    sources: ["ts-everyday-types", "ts-objects"],
  },
  {
    question: "Як TypeScript обробляє оператор `in` під час звуження?",
    code: `type Fish = { swim(): void };
type Bird = { fly(): void };
function move(a: Fish | Bird) {
  if ('swim' in a) a.swim(); else a.fly();
}`,
    options: [
      "Звужує union до варіантів, що мають властивість `swim`",
      "Оператор `in` не впливає на типи",
      "Перевіряє, що `a` — масив, який містить рядок `'swim'`",
    ],
    answer: 0,
    explanation:
      "TS підтримує звуження через `typeof`, `instanceof`, `in`, перевірки на рівність, істинність і дискримінанти. В `else` лишиться `Bird`. Для даних із мережі такі перевірки — частина рантайм-валідації.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Що роблять `-readonly` і `-?` у mapped type?",
    code: `type Mutable<T> = { -readonly [K in keyof T]-?: T[K] };`,
    options: [
      "Прибирають модифікатори `readonly` і `?` у всіх властивостей",
      "Додають модифікатори `readonly` і `?` до всіх властивостей",
      "Видаляють із типу властивості, позначені `readonly`",
    ],
    answer: 0,
    explanation:
      "Префікс `-` знімає модифікатор, `+` (за замовчуванням) — додає. Так реалізовано `Required<T>` (`-?`). Вбудованого `Mutable` немає, але його часто пишуть за цим зразком.",
    sources: ["ts-mapped"],
  },
  {
    question: "Як перейменувати ключі в mapped type?",
    code: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};`,
    options: [
      "Через `as` після `in` із шаблонним літералом",
      "Це неможливо — ключі в mapped type завжди лишаються попередніми",
      "Через функцію `rename()` у стандартній бібліотеці типів",
    ],
    answer: 0,
    explanation:
      "Key remapping (TS 4.1+): `Getters<{ name: string }>` → `{ getName: () => string }`. Якщо вираз після `as` дає `never`, ключ виключається — так фільтрують властивості за типом значення. `string & K` потрібен, бо ключі можуть бути символами або числами.",
    sources: ["ts-mapped", "ts-template-literal"],
  },
  {
    question: "Чому `Object.keys(user)` повертає `string[]`, а не `(keyof User)[]`?",
    options: [
      "У рантаймі в об'єкта можуть бути й інші ключі",
      "Це відомий баг TypeScript, який виправлять у наступній версії",
      "Бо ключі об'єкта завжди рядки, навіть числові",
    ],
    answer: 0,
    explanation:
      "Об'єкт типу `User` може містити зайві властивості (тип описує мінімум), тому обіцяти `(keyof User)[]` було б небезпечно. Якщо ви впевнені, використовуйте твердження типу або типізовану обгортку. Це свідоме рішення команди TypeScript.",
    sources: ["ts-type-compatibility", "ts-keyof"],
  },
  {
    question: "Що дає прапорець `noUncheckedIndexedAccess`?",
    options: [
      "Доступ за індексом отримує тип із `| undefined`",
      "Повністю забороняє індексні сигнатури в об'єктних типах",
      "Вимикає перевірку виходу за межі кортежів і масивів",
    ],
    answer: 0,
    explanation:
      "Без прапорця `const x = arr[10]` типізовано як `T`, хоча в рантаймі це `undefined`. З прапорцем компілятор змусить перевірити значення. Прапорець не входить у `strict`, але його часто радять вмикати.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Чим `unknown[]` відрізняється від `any[]` у параметрі функції?",
    options: [
      "З `unknown[]` елементи треба звужувати, з `any[]` — ні",
      "`unknown[]` приймає лише масиви об'єктів, але не примітивів",
      "Різниці немає: обидва вимикають перевірки для елементів",
    ],
    answer: 0,
    explanation:
      "Обидві версії приймають будь-який масив, але всередині функції з `unknown` не можна викликати метод елемента без перевірки. Якщо функція не працює з елементами (наприклад, рахує довжину), `unknown[]` — безпечний вибір. Ще краще — дженерик `T[]`, якщо тип важливий для результату.",
    sources: ["ts-everyday-types", "ts-generics"],
  },
  {
    question: "Що таке декоратори в TypeScript 5?",
    options: [
      "Функції, що застосовуються до класів та їхніх членів через `@`",
      "Коментарі спеціального виду для генерації документації TSDoc",
      "Синтаксис для оголошення React-компонентів у вигляді класів",
    ],
    answer: 0,
    explanation:
      "TS 5.0 підтримує стандартні декоратори (stage 3) без прапорця. Застарілі «експериментальні» декоратори (`experimentalDecorators`) з іншим API використовуються в Angular, NestJS, TypeORM. Застосування: логування, DI, валідація, метадані.",
    sources: ["ts-5-0", "ts-decorators"],
  },
  {
    question: "Що робить `import type { User } from './types'`?",
    options: [
      "Імпортує лише тип; імпорт стирається під час компіляції",
      "Імпортує значення та його тип одночасно, як звичайний `import`",
      "Імпортує тип у рантаймі для перевірок `instanceof`",
    ],
    answer: 0,
    explanation:
      "Явний type-only імпорт допомагає транспіляторам, що обробляють файли окремо: вони точно знають, що імпорт треба стерти. З прапорцем `verbatimModuleSyntax` це обов'язково для типів. Також уникаються зайві побічні ефекти від завантаження модуля.",
    sources: ["ts-modules", "ts-tsconfig"],
  },
  {
    question: "Чим `interface` кращий за перетин для розширення великих об'єктних типів?",
    options: [
      "`extends` ловить конфлікти властивостей і швидший для компілятора",
      "Перетини не підтримують вкладених об'єктів і масивів",
      "Інтерфейси існують у рантаймі, а перетини — ні",
    ],
    answer: 0,
    explanation:
      "За `interface B extends A` конфлікт властивостей — помилка в місці оголошення, а в перетину він мовчки дає `never`. Компілятор кешує відношення інтерфейсів, тому у великих кодових базах це швидше — так радить вікі продуктивності TS.",
    sources: ["ts-performance-wiki", "ts-objects"],
  },
  {
    question: "Що поверне `Parameters<(a: string, b?: number) => void>`?",
    options: ["`[a: string, b?: number]`", "`string | number`", "`{ a: string; b?: number }`"],
    answer: 0,
    explanation:
      "`Parameters` повертає кортеж параметрів зі збереженням необов'язковості й назв. Зручно для обгорток: `function logged(...args: Parameters<typeof fn>)`. Для конструкторів є `ConstructorParameters`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Як указати тип `this` для функції-обробника?",
    code: `function handler(this: HTMLButtonElement, e: MouseEvent) {
  this.disabled = true;
}`,
    options: [
      "Перший «параметр» `this` задає тип контексту й стирається під час компіляції",
      "Це звичайний перший параметр, який треба передавати під час виклику",
      "Такий синтаксис заборонений у strict-режимі TypeScript",
    ],
    answer: 0,
    explanation:
      "Псевдопараметр `this` описує, з яким контекстом функція має викликатися; аргументом він не є. Компілятор перевірить виклики й використання `this` усередині. У стрілкових функціях `this` лексичний, і так його вказати не можна.",
    sources: ["ts-functions"],
  },
  {
    question: "Як краще типізувати відповідь API, якщо в різних статусів різна структура?",
    options: [
      "Union із дискримінатором `ok`: успіх із `data` або помилка",
      "Один спільний тип, у якому всі поля зроблено необов'язковими",
      "Тип `any`, бо структура відповіді заздалегідь невідома",
    ],
    answer: 0,
    explanation:
      "Union робить неможливі стани непредставними: за `ok: true` гарантовано є `data`, а `error` недоступна. Тип із необов'язковими полями допускає безглузді комбінації й вимагає перевірок усюди.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Що робить утиліта `ReadonlyArray<T>` (або `readonly T[]`)?",
    options: [
      "Прибирає з типу мутувальні методи (`push`, `sort`)",
      "Заморожує масив у рантаймі через `Object.freeze`",
      "Робить усі елементи масиву глибоко незмінними",
    ],
    answer: 0,
    explanation:
      "Параметр `readonly T[]` гарантує коду, що викликає, що функція не змінить його масив. Приймає й звичайні масиви. Зміну вкладених об'єктів тип не забороняє — це неглибокий захист.",
    sources: ["ts-objects"],
  },
  {
    question: "Що таке `unique symbol`?",
    options: [
      "Тип конкретного символу, оголошеного через `const s = Symbol()`",
      "Будь-яке значення типу `symbol`, включно з `Symbol.for()`",
      "Символ, який не можна використовувати як ключ об'єкта",
    ],
    answer: 0,
    explanation:
      "Кожен `const` із `Symbol()` отримує власний підтип `unique symbol`, тому TS розрізняє такі ключі. Це використовують для «прихованих» властивостей і брендування типів. Звичайний `symbol` описує будь-які символи.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Як розширити тип глобального об'єкта `Window` з модуля?",
    code: `export {};
declare global {
  interface Window { dataLayer: unknown[] }
}`,
    options: [
      "Через `declare global` і злиття інтерфейсу `Window`",
      "Через `window.dataLayer = []` — тип виведеться автоматично",
      "Через `type Window = Window & { dataLayer: unknown[] }`",
    ],
    answer: 0,
    explanation:
      "У файлі-модулі (з `import`/`export`) глобальні декларації пишуть усередині `declare global`. Інтерфейс `Window` зливається з вашим розширенням. Повторний `type Window` спричинить помилку дублювання.",
    sources: ["ts-declaration-merging", "ts-dts"],
  },
  {
    question: "Як безпечно типізувати результат `JSON.parse`?",
    options: [
      "Вважати результат `unknown` і перевірити схемою (Zod)",
      "Одразу написати `JSON.parse(text) as User` — цього досить",
      "Лишити `any`: TypeScript сам перевірить структуру пізніше",
    ],
    answer: 0,
    explanation:
      "`JSON.parse` повертає `any`, але дані ззовні можуть не збігтися з очікуваннями. Схема (`z.object({...})`) перевіряє дані в рантаймі, а `z.infer<typeof schema>` дає TS-тип без дублювання. `as User` лише приховує проблему.",
    sources: ["ts-narrowing", "ts-everyday-types"],
  },
  {
    question: "Чим `type A = B` відрізняється від `interface A extends B {}` для відображення в підказках IDE?",
    options: [
      "Інтерфейс показується за назвою, псевдонім — розгортається",
      "Псевдоніми типів узагалі не відображаються в підказках IDE",
      "Різниці немає: IDE показує їх однаково",
    ],
    answer: 0,
    explanation:
      "Складні перетини й зіставлені типи в підказках часто розгортаються в довгі структури, тоді як інтерфейс показується за назвою. Це впливає на читабельність помилок. Для «розпрямлення» перетинів пишуть хелпер `Prettify<T>`.",
    sources: ["ts-objects", "ts-performance-wiki"],
  },
  {
    question: "Що дає `paths` у `tsconfig.json`?",
    options: [
      "Псевдоніми шляхів імпорту, наприклад `@/*` → `./src/*`",
      "Перелік файлів і папок, які треба скомпілювати",
      "Шляхи для виведення скомпільованих `.js`-файлів",
    ],
    answer: 0,
    explanation:
      "`paths` дає змогу писати `import { Button } from '@/components/button'` замість довгих відносних шляхів. Це налаштування резолву для компілятора — бандлер має розуміти ті самі аліаси (Next.js і Vite читають їх із tsconfig). Перелік файлів задають `include`, виведення — `outDir`.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Чим `moduleResolution: 'bundler'` відрізняється від `'node16'`/`'nodenext'`?",
    options: [
      "`bundler` — як у збирачів, `nodenext` — за правилами Node.js",
      "`bundler` працює лише з Webpack 4 і старішими",
      "Це синоніми для різних версій TS",
    ],
    answer: 0,
    explanation:
      "У Node.js ESM треба писати розширення у відносних імпортах і враховувати `exports`/`type`. Збирачі (Vite, Next.js, esbuild) це прощають, і режим `bundler` повторює їхню поведінку. Для коду, що виконується Node.js без збирання, обирають `nodenext`.",
    sources: ["ts-tsconfig", "ts-modules"],
  },
  {
    question: "Що робить прапорець `isolatedModules`?",
    options: [
      "Забороняє код, який не можна транспілювати пофайлово",
      "Запускає компіляцію кожного модуля в окремому процесі",
      "Ізолює глобальні змінні кожного файлу одне від одного",
    ],
    answer: 0,
    explanation:
      "Babel, SWC і esbuild компілюють файли незалежно й не бачать типів з інших модулів. `isolatedModules` попереджає про код, який вони не зможуть обробити коректно: реекспорт типу без `export type`, звернення до `const enum` з іншого файлу тощо.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Що робить `keyof typeof obj`?",
    code: `const routes = { home: '/', about: '/about' };
type RouteName = keyof typeof routes;`,
    options: [
      "Отримує union ключів значення `routes`: `'home' | 'about'`",
      "Отримує union значень: `'/' | '/about'`",
      "Спричиняє помилку: `keyof` не можна застосовувати до `typeof`",
    ],
    answer: 0,
    explanation:
      "`typeof routes` дає тип об'єкта, а `keyof` — його ключі. Для union значень потрібен індексний доступ: `typeof routes[keyof typeof routes]`, а щоб значення були літералами — `as const`.",
    sources: ["ts-keyof", "ts-typeof"],
  },
  {
    question: "Коли TS розширює літеральний тип до загального (widening)?",
    options: [
      "У змінних позиціях: `let`, властивості об'єктів",
      "Ніколи: літеральні типи завжди зберігаються як є",
      "Лише за ввімкненого прапорця `noImplicitAny` у tsconfig",
    ],
    answer: 0,
    explanation:
      "`const a = 'x'` → `'x'`, але `let b = 'x'` → `string`, і `{ dir: 'left' }` → `{ dir: string }`. Через це об'єкт не можна передати у функцію, що очікує `'left' | 'right'`. Рішення: `as const`, анотація або `satisfies`.",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Як зробити параметр дженерика необов'язковим зі значенням за замовчуванням?",
    options: [
      "`type Box<T = string> = { value: T }`",
      "`type Box<T?> = { value: T }`",
      "`type Box<T | string> = { value: T }`",
    ],
    answer: 0,
    explanation:
      "Параметри типу можуть мати значення за замовчуванням: `Box` без аргументу — `Box<string>`. Їх можна поєднувати з обмеженнями: `<T extends object = {}>`. Так влаштовані, наприклад, `useState<S = undefined>` і `EventEmitter<T = any>`.",
    sources: ["ts-generics"],
  },
  {
    question: "Як типізувати функцію-фабрику, що повертає той самий тип, який отримала?",
    options: [
      "`function clone<T>(value: T): T`",
      "`function clone(value: any): any`",
      "`function clone(value: object): object`",
    ],
    answer: 0,
    explanation:
      "Дженерик зберігає зв'язок між входом і виходом: `clone(user)` поверне `User`. З `any` та `object` код, що викликає, втрачає інформацію про тип і змушений робити зведення.",
    sources: ["ts-generics"],
  },
  {
    question: "Що таке контекстна типізація (contextual typing)?",
    options: [
      "Виведення типів параметрів функції з місця, де її використано",
      "Типізація, що залежить від оточення (браузер чи Node.js)",
      "Вказування типу через коментар JSDoc",
    ],
    answer: 0,
    explanation:
      "У `button.addEventListener('click', e => ...)` тип `e` (`MouseEvent`) виводиться із сигнатури `addEventListener`. Так само працюють колбеки `map`, обробники в JSX і `useState`-сеттери. Якщо винести функцію в окрему змінну, контекст втрачається — доведеться анотувати.",
    sources: ["ts-functions", "ts-everyday-types"],
  },
];

export default questions;
