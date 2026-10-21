import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Що таке TypeScript?",
    options: [
      "Надмножина JavaScript зі статичною типізацією, що компілюється в JS",
      "Окрема мова з власним рантаймом, яку браузери виконують напряму",
      "Бібліотека для перевірки типів під час виконання JavaScript-коду",
    ],
    answer: 0,
    explanation:
      "Будь-який валідний JS — майже завжди валідний TS. Типи перевіряються під час компіляції, а потім стираються: у рантаймі виконується звичайний JavaScript, і перевірок типів там немає. Тому дані ззовні (API, форми) однаково валідують у рантаймі — наприклад, через Zod.",
    sources: ["ts-ts-for-js", "ts-handbook"],
  },
  {
    question: "Чи є перевірка типів TypeScript під час виконання програми?",
    options: [
      "Ні: типи стираються під час компіляції, у рантаймі працює звичайний JS",
      "Так: компілятор вставляє перевірки перед кожним викликом функції",
      "Так, але лише для класів та інтерфейсів із модифікатором `strict`",
    ],
    answer: 0,
    explanation:
      "TypeScript — інструмент часу розробки. Якщо API поверне `null` замість об'єкта, типи не врятують. Для рантайм-перевірок використовують `typeof`/`instanceof` і бібліотеки схем (Zod, Valibot), з яких можна вивести й TS-типи.",
    sources: ["ts-ts-for-js"],
  },
  {
    question: "Чим `unknown` відрізняється від `any`?",
    options: [
      "З `unknown` нічого не можна робити без звуження типу, а `any` вимикає перевірки",
      "`unknown` можна присвоїти будь-якій змінній, а `any` — лише `object`",
      "Це синоніми, `unknown` — просто новіша назва для `any`",
    ],
    answer: 0,
    explanation:
      "`any` вимикає типізацію й «заражає» все, до чого торкається. `unknown` — безпечний аналог: значення може бути чим завгодно, але використовувати його можна лише після перевірки (`typeof x === 'string'`). Для даних із `JSON.parse` і `catch (e)` правильніше `unknown`.",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Що означає тип `never`?",
    options: [
      "Тип значення, якого не може бути: функція ніколи не повертає керування",
      "Те саме, що `void`: функція нічого не повертає й завершується нормально",
      "Те саме, що `null`: значення відсутнє, але змінна існує",
    ],
    answer: 0,
    explanation:
      "`never` — порожній тип. Його повертають функції, що завжди кидають виняток або зациклюються. Також він з'являється за повного звуження union-типу — на цьому побудована перевірка вичерпного `switch`. `void` — функція завершується, але результат не використовується.",
    sources: ["ts-functions", "ts-narrowing"],
  },
  {
    question: "Що виведе TypeScript для `let x = 5;`?",
    options: ["`number`", "`5` (літеральний тип)", "`any` (без анотації)"],
    answer: 0,
    explanation:
      "Виведення типів (inference): для `let` літерал розширюється до `number`, бо змінну можна перепризначити. Для `const x = 5` тип буде літеральним `5`. Явні анотації потрібні там, де виведення неможливе або неточне — наприклад, у параметрах функцій.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Яка різниця між `interface` і `type` для опису об'єкта?",
    options: [
      "Обидва підходять; `interface` можна розширювати злиттям, а `type` вміє union та інші типи",
      "`interface` працює лише з класами, а `type` — лише з примітивними типами",
      "`type` застарів, і в нових проєктах його використовувати не рекомендують узагалі",
    ],
    answer: 0,
    explanation:
      "Для об'єктів вони майже взаємозамінні. Відмінності: інтерфейси з однією назвою зливаються (declaration merging), розширюються через `extends`. Псевдоніми типів описують union, кортежі, примітиви, умовні й зіставлені типи. Багато команд використовують `interface` для об'єктів і `type` для решти.",
    sources: ["ts-everyday-types", "ts-objects"],
  },
  {
    question: "Як оголосити необов'язкову властивість об'єкта?",
    options: [
      "`{ name?: string }`",
      "`{ name: optional string }`",
      "`{ ?name: string }`",
    ],
    answer: 0,
    explanation:
      "`?` після назви робить властивість необов'язковою: її тип — `string | undefined`, а сам ключ може бути відсутнім. З прапорцем `exactOptionalPropertyTypes` явне присвоєння `undefined` відрізняється від відсутності ключа.",
    sources: ["ts-objects"],
  },
  {
    question: "Що робить модифікатор `readonly` у `{ readonly id: number }`?",
    options: [
      "Забороняє перепризначення властивості на рівні типів, у рантаймі нічого не змінює",
      "Робить об'єкт глибоко незмінним через `Object.freeze` у рантаймі",
      "Робить властивість приватною й недоступною ззовні класу",
    ],
    answer: 0,
    explanation:
      "`readonly` — лише перевірка компілятора: `obj.id = 2` спричинить помилку. Він неглибокий — вкладені об'єкти можна змінювати. У рантаймі об'єкт звичайний. Для масивів є `readonly string[]` / `ReadonlyArray<string>`, а глибоке заморожування роблять через `as const` або `Object.freeze`.",
    sources: ["ts-objects"],
  },
  {
    question: "Що означає тип `string | number`?",
    options: [
      "Значення може бути рядком або числом (об'єднання)",
      "Значення одночасно і рядок, і число (перетин)",
      "Рядок, що містить лише цифри",
    ],
    answer: 0,
    explanation:
      "Union-тип допускає будь-який із варіантів. Поки тип не звужено, доступні лише операції, спільні для всіх варіантів. Перетин записується через `&` і вимагає відповідності всім типам одразу (`A & B`).",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Що дає перетин `type Admin = User & { role: 'admin' }`?",
    options: [
      "Тип з усіма властивостями `User` і додатково `role: 'admin'`",
      "Тип лише зі спільними властивостями `User` і об'єкта з `role`",
      "Тип, що може бути або `User`, або `{ role: 'admin' }`",
    ],
    answer: 0,
    explanation:
      "Перетин об'єднує вимоги: значення має задовольняти обидва типи. Це спосіб композиції типів, схожий на `interface Admin extends User`. За конфліктних властивостей для цієї властивості виходить `never`.",
    sources: ["ts-objects"],
  },
  {
    question: "Що таке літеральний тип `'left' | 'right'`?",
    options: [
      "Тип, що допускає лише рядки `'left'` або `'right'`",
      "Будь-який рядок, що починається з `left` або `right`",
      "Перелік (enum) із числовими значеннями 0 і 1",
    ],
    answer: 0,
    explanation:
      "Літеральні типи звужують значення до конкретних констант. Union літералів — часта альтернатива enum: `type Direction = 'left' | 'right'`. Помилку `'lft'` компілятор спіймає, а IDE підкаже варіанти.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Як типізувати функцію, що приймає рядок і повертає число?",
    options: [
      "`(s: string) => number`",
      "`(string) => number`",
      "`function(s): string -> number`",
    ],
    answer: 0,
    explanation:
      "У типі функції в параметрів обов'язкові назви: `(s: string) => number`. Запис `(string) => number` означає параметр із назвою `string` і типом `any`. Оголошення функції: `function len(s: string): number { ... }`.",
    sources: ["ts-functions"],
  },
  {
    question: "Як оголосити необов'язковий параметр функції?",
    options: [
      "`function greet(name?: string)`",
      "`function greet(optional name: string)`",
      "`function greet(name: string = ?)`",
    ],
    answer: 0,
    explanation:
      "`?` робить параметр необов'язковим, його тип — `string | undefined`. Альтернатива — значення за замовчуванням: `greet(name = 'Гість')`, тоді тип виводиться як `string`. Необов'язкові параметри мають іти після обов'язкових.",
    sources: ["ts-functions"],
  },
  {
    question: "Що таке кортеж (tuple) у TypeScript?",
    options: [
      "Масив фіксованої довжини з відомим типом кожного елемента",
      "Масив довільної довжини, де всі елементи одного типу",
      "Незмінний об'єкт із числовими ключами замість назв властивостей",
    ],
    answer: 0,
    explanation:
      "`type Point = [number, number]` — рівно два числа. Кортежі зручні для повернення кількох значень, як у `useState`: `[value, setter]`. Елементи можна іменувати (`[x: number, y: number]`) і робити необов'язковими (`[string, number?]`).",
    sources: ["ts-objects"],
  },
  {
    question: "Як типізувати масив рядків?",
    options: ["`string[]` або `Array<string>`", "`[string]` або `Array[string]`", "`array of string` або `string()`"],
    answer: 0,
    explanation:
      "`string[]` і `Array<string>` еквівалентні. `[string]` — кортеж з одного елемента. Для масивів лише для читання — `readonly string[]`.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Що таке дженерик (generic)?",
    options: [
      "Параметр типу, що дає змогу писати код для різних типів зі збереженням зв'язку між ними",
      "Тип `any`, який використовують для тимчасового вимкнення перевірок у функціях",
      "Базовий клас, від якого успадковуються всі інші типи й інтерфейси",
    ],
    answer: 0,
    explanation:
      "`function first<T>(arr: T[]): T | undefined` — тип результату пов'язаний із типом вхідного масиву: `first([1, 2])` поверне `number | undefined`. З `any` цей зв'язок втрачається. Дженерики використовуються в `Array<T>`, `Promise<T>`, `useState<T>`.",
    sources: ["ts-generics"],
  },
  {
    question: "Що робить утилітарний тип `Partial<User>`?",
    options: [
      "Робить усі властивості `User` необов'язковими",
      "Лишає лише частину властивостей, вказаних другим параметром",
      "Робить усі властивості `User` доступними лише для читання",
    ],
    answer: 0,
    explanation:
      "`Partial<T>` додає `?` до всіх властивостей — зручно для об'єктів оновлення: `update(id, patch: Partial<User>)`. Вибір підмножини — `Pick`, лише читання — `Readonly`, усі обов'язкові — `Required`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Чим відрізняються `Pick<User, 'id' | 'name'>` і `Omit<User, 'password'>`?",
    options: [
      "`Pick` лишає перелічені властивості, `Omit` — усі, крім перелічених",
      "`Pick` робить властивості обов'язковими, `Omit` — необов'язковими",
      "Це синоніми з різним порядком аргументів",
    ],
    answer: 0,
    explanation:
      "Обидва створюють новий тип з наявного. `Pick` — білий список ключів, `Omit` — чорний. Наприклад, `Omit<User, 'password'>` — тип для відповіді API без секретних полів.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Що описує `Record<string, number>`?",
    options: [
      "Об'єкт, у якого ключі — рядки, а значення — числа",
      "Масив пар `[string, number]`, відсортований за ключем",
      "Колекцію `Map` зі стандартної бібліотеки JavaScript",
    ],
    answer: 0,
    explanation:
      "`Record<K, V>` — об'єкт із ключами `K` і значеннями `V`. З union-ключами він вимагає всіх ключів: `Record<'uk' | 'en', string>`. Це не `Map`: `Map` — окрема структура даних із методами `get`/`set`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Що поверне `keyof { id: number; name: string }`?",
    options: ["`'id' | 'name'`", "`number | string`", "`['id', 'name']`"],
    answer: 0,
    explanation:
      "`keyof` повертає union ключів типу. Типи значень отримують через індексний доступ: `T['id']` або `T[keyof T]`. У рантаймі `keyof` не існує — для масиву ключів використовують `Object.keys`.",
    sources: ["ts-keyof"],
  },
  {
    question: "Що робить `typeof` у позиції типу: `type Config = typeof config`?",
    options: [
      "Бере тип змінної `config`, виведений компілятором",
      "Повертає рядок `'object'`, як у JavaScript",
      "Перевіряє тип `config` під час виконання",
    ],
    answer: 0,
    explanation:
      "У виразах `typeof` — JS-оператор, що повертає рядок. У позиції типу це оператор TypeScript, що видобуває тип значення. Зручно, щоб не дублювати опис: `const routes = {...} as const; type Routes = typeof routes`.",
    sources: ["ts-typeof"],
  },
  {
    question: "Як правильно типізувати props React-компонента?",
    options: [
      "`function Button({ label }: { label: string })` або через `type Props`",
      "`function Button(props: any)` — React типізує props сам",
      "`function Button<label: string>()` — props передаються дженериком",
    ],
    answer: 0,
    explanation:
      "Props — звичайний об'єкт, його типізують інтерфейсом або псевдонімом. `React.FC` не обов'язковий. Для `children` використовують `React.ReactNode`, для розширення нативних атрибутів — `React.ComponentProps<'button'>`.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "Який тип має подія в `onChange` для `<input>` у React?",
    options: [
      "`React.ChangeEvent<HTMLInputElement>`",
      "`Event` — нативна подія DOM",
      "`InputEvent<string>` зі стандартної бібліотеки",
    ],
    answer: 0,
    explanation:
      "React використовує власні синтетичні події: `ChangeEvent`, `MouseEvent<HTMLButtonElement>`, `FormEvent<HTMLFormElement>` тощо. Дженерик вказує елемент, тому `e.target.value` типізований. Якщо обробник інлайновий, тип виводиться автоматично.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "Як указати тип стану, якщо початкове значення `null`: `useState(null)`?",
    options: [
      "`useState<User | null>(null)`",
      "`useState(null as User)`",
      "Тип указувати не треба, TS виведе `User`",
    ],
    answer: 0,
    explanation:
      "Без дженерика тип виведеться як `null`, і потім не можна буде присвоїти користувача. Явний дженерик описує всі можливі стани. Каст `null as User` — брехня компілятору: далі код вважатиме, що користувач завжди є.",
    sources: ["ts-react-cheatsheet", "ts-generics"],
  },
  {
    question: "Що робить твердження типу `value as string`?",
    options: [
      "Каже компілятору вважати значення рядком, без перевірки в рантаймі",
      "Перетворює значення на рядок, як `String(value)`",
      "Перевіряє в рантаймі, що значення — рядок, інакше кидає помилку",
    ],
    answer: 0,
    explanation:
      "`as` — підказка компілятору, а не перетворення: якщо насправді там число, помилка проявиться пізніше. Використовуйте його, коли знаєте більше за компілятор (наприклад, тип елемента з `querySelector`), і віддавайте перевагу звуженню через перевірки.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Що робить оператор `!` у `user!.name`?",
    options: [
      "Стверджує, що значення не `null`/`undefined`, без перевірки в рантаймі",
      "Логічне заперечення `user`, як оператор `!` у JavaScript",
      "Робить звернення до властивості безпечним, як опціональний ланцюжок `?.`",
    ],
    answer: 0,
    explanation:
      "Non-null assertion прибирає `null | undefined` з типу. Якщо значення все ж `null`, буде рантайм-помилка. Безпечніше — явна перевірка або `user?.name` (опціональний ланцюжок, поверне `undefined`).",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Що вмикає прапорець `strict` у `tsconfig.json`?",
    options: [
      "Набір строгих перевірок: `strictNullChecks`, `noImplicitAny` та інші",
      "Режим `'use strict'` у скомпільованому JavaScript і нічого більше",
      "Заборону на використання `any` і `as` у будь-якому вигляді",
    ],
    answer: 0,
    explanation:
      "`strict: true` вмикає сімейство прапорців: `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictBindCallApply`, `useUnknownInCatchVariables` та ін. Нові проєкти варто починати зі strict. Явний `any` він не забороняє — для цього є правила лінтера.",
    sources: ["ts-strict", "ts-tsconfig"],
  },
  {
    question: "Що дає `strictNullChecks`?",
    options: [
      "`null` і `undefined` стають окремими типами, їх треба явно враховувати",
      "Забороняє використовувати `null` у коді зовсім, дозволяючи лише `undefined`",
      "Автоматично замінює `null` на `undefined` під час компіляції в JS",
    ],
    answer: 0,
    explanation:
      "Без прапорця `null` можна присвоїти будь-чому, і помилки «cannot read property of null» не ловляться. З прапорцем `string` не включає `null`: треба писати `string | null` і перевіряти значення перед використанням. Це один із найкорисніших прапорців.",
    sources: ["ts-strict", "ts-everyday-types"],
  },
  {
    question: "Як звузити тип `string | number` до `string` усередині умови?",
    options: [
      "`if (typeof value === 'string') { ... }`",
      "`if (value is string) { ... }`",
      "`if (value instanceof String) { ... }`",
    ],
    answer: 0,
    explanation:
      "TypeScript аналізує потік керування: після перевірки `typeof` усередині гілки тип звужено до `string`, а в `else` — до `number`. `instanceof String` перевіряє об'єкт-обгортку, а не примітив. Синтаксис `x is T` використовується в сигнатурі type guard-функцій.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Чим `enum Color { Red, Green }` відрізняється від `type Color = 'red' | 'green'`?",
    options: [
      "`enum` створює об'єкт у рантаймі, union літералів існує лише в типах",
      "Union літералів створює об'єкт у рантаймі, `enum` — лише тип",
      "Нічим: компілятор генерує для них однаковий JavaScript-код",
    ],
    answer: 0,
    explanation:
      "Звичайний `enum` компілюється в JS-об'єкт (числовий — зі зворотним відображенням). Union рядків нічого не додає в бандл і сумісний із JSON та API. Багато команд віддають перевагу union або об'єкту `as const`. Крім того, enum несумісний із режимом `erasableSyntaxOnly`.",
    sources: ["ts-enums"],
  },
  {
    question: "Що робить `as const` у `const roles = ['admin', 'user'] as const`?",
    options: [
      "Робить масив readonly-кортежем із літеральними типами `'admin'` і `'user'`",
      "Заморожує масив у рантаймі через `Object.freeze` під час компіляції",
      "Перетворює масив на `enum` із рядковими значеннями",
    ],
    answer: 0,
    explanation:
      "Без `as const` тип — `string[]`. З ним — `readonly ['admin', 'user']`, і можна отримати union: `type Role = typeof roles[number]` → `'admin' | 'user'`. У рантаймі об'єкт не заморожується.",
    sources: ["ts-everyday-types", "ts-typeof"],
  },
  {
    question: "Що таке структурна типізація в TypeScript?",
    options: [
      "Сумісність типів визначається їхньою формою (набором властивостей), а не назвою",
      "Типи сумісні, лише якщо оголошені з однією й тією самою назвою",
      "Типізація, за якої кожен об'єкт мусить успадковуватися від класу",
    ],
    answer: 0,
    explanation:
      "Якщо об'єкт має всі властивості, яких вимагає тип, він підходить — навіть якщо його тип названо інакше (duck typing). Тому `Point2D` і `Vector2D` з однаковими полями взаємозамінні. Номінальну поведінку можна імітувати брендованими типами.",
    sources: ["ts-type-compatibility"],
  },
  {
    question: "Що таке файл `.d.ts`?",
    options: [
      "Файл декларацій: описує типи наявного JS-коду без реалізації",
      "Скомпільований TypeScript для налагодження в браузері через source maps",
      "Файл із тестами для типів, який запускає `tsc --test`",
    ],
    answer: 0,
    explanation:
      "Декларації дають змогу використовувати JS-бібліотеки з типами. Їх пишуть вручну, генерують компілятором (`declaration: true`) або встановлюють із DefinitelyTyped. Коду, що виконується, у `.d.ts` немає.",
    sources: ["ts-dts"],
  },
  {
    question: "Навіщо встановлювати пакети на кшталт `@types/lodash`?",
    options: [
      "Щоб отримати типи для бібліотеки, написаної на JS без вбудованих декларацій",
      "Щоб установити TypeScript-версію бібліотеки замість її JS-версії",
      "Щоб увімкнути перевірку типів у рантаймі для викликів цієї бібліотеки",
    ],
    answer: 0,
    explanation:
      "Пакети `@types/*` публікуються з репозиторію DefinitelyTyped і містять лише `.d.ts`. Багато сучасних бібліотек постачають типи самі — тоді `@types` не потрібен. Зазвичай встановлюються як devDependencies.",
    sources: ["ts-dts"],
  },
  {
    question: "Що скомпілює `tsc` з TypeScript-файлу?",
    options: [
      "JavaScript без анотацій типів (і опційно `.d.ts` та source maps)",
      "Машинний код для вибраної платформи, як компілятор Go",
      "WebAssembly-модуль, який завантажує браузер",
    ],
    answer: 0,
    explanation:
      "Компілятор перевіряє типи й видає JS під вказаний `target`. У сучасних проєктах збирання часто роблять esbuild, SWC або Babel (лише видаляють типи), а `tsc --noEmit` запускають окремо для перевірки.",
    sources: ["ts-tsconfig", "ts-ts-for-js"],
  },
  {
    question: "Який тип має змінна `e` у `catch (e)` за ввімкненого `strict`?",
    options: ["`unknown`", "`Error` (вбудований клас)", "`any` (як без strict)"],
    answer: 0,
    explanation:
      "З прапорцем `useUnknownInCatchVariables` (входить у strict) `e` — `unknown`, адже кинути можна будь-що, не лише `Error`. Перед використанням перевіряють: `if (e instanceof Error) console.log(e.message)`.",
    sources: ["ts-strict", "ts-narrowing"],
  },
  {
    question: "Що означає тип значення, що повертається, `void`?",
    options: [
      "Функція нічого корисного не повертає, результат не використовується",
      "Функція завжди повертає `null` замість значення",
      "Функція ніколи не завершується або кидає помилку",
    ],
    answer: 0,
    explanation:
      "`void` використовується для функцій без значення в `return`. Нюанс: тип колбека `() => void` дозволяє передати функцію, що щось повертає (результат буде проігноровано), — тому `arr.forEach(x => list.push(x))` компілюється. Функція, що ніколи не завершується, має тип `never`.",
    sources: ["ts-functions"],
  },
  {
    question: "Як описати об'єкт із довільними рядковими ключами й числовими значеннями через індексну сигнатуру?",
    options: [
      "`{ [key: string]: number }`",
      "`{ key: string => number }`",
      "`{ *: number }`",
    ],
    answer: 0,
    explanation:
      "Індексна сигнатура описує «словник». Еквівалент — `Record<string, number>`. З прапорцем `noUncheckedIndexedAccess` звернення `obj[key]` поверне `number | undefined`, що точніше відображає реальність.",
    sources: ["ts-objects"],
  },
  {
    question: "Як розширити інтерфейс?",
    options: [
      "`interface Admin extends User { role: string }`",
      "`interface Admin implements User { role: string }`",
      "`interface Admin = User + { role: string }`",
    ],
    answer: 0,
    explanation:
      "Інтерфейс розширюється через `extends` (можна від кількох: `extends A, B`). `implements` використовують класи, щоб гарантувати відповідність інтерфейсу. Для псевдонімів типів аналог — перетин `User & { role: string }`.",
    sources: ["ts-objects"],
  },
  {
    question: "Що робить `implements` у класі?",
    options: [
      "Перевіряє, що клас відповідає інтерфейсу; нічого не успадковує",
      "Успадковує реалізацію методів і властивостей інтерфейсу в клас",
      "Створює екземпляр інтерфейсу, доступний через `this`",
    ],
    answer: 0,
    explanation:
      "`class Cat implements Animal` — компілятор перевірить, що в класі є всі члени `Animal`. Реалізацію треба написати самому, на відміну від `extends` для класів. Інтерфейси в рантаймі не існують.",
    sources: ["ts-classes"],
  },
  {
    question: "Чим `private` у TypeScript відрізняється від `#field` у JavaScript?",
    options: [
      "`private` — лише перевірка компілятора, `#field` — приватність у рантаймі",
      "Нічим: `#field` просто компілюється в модифікатор `private`",
      "`#field` працює лише в TypeScript і не підтримується рушіями JS",
    ],
    answer: 0,
    explanation:
      "Після компіляції `private` поле — звичайна властивість, її можна прочитати через `obj['field']`. Приватні поля `#field` підтримуються рушієм JS і недоступні ззовні класу ніяк. Модифікатори `public`, `protected`, `private` — інструменти TypeScript.",
    sources: ["ts-classes"],
  },
  {
    question: "Як типізувати асинхронну функцію, що повертає користувача?",
    options: [
      "`async function getUser(): Promise<User>`",
      "`async function getUser(): User`",
      "`async function getUser(): Async<User>`",
    ],
    answer: 0,
    explanation:
      "Async-функція завжди повертає проміс, тому тип результату — `Promise<User>`. Анотація `User` спричинить помилку. Тип значення промісу можна видобути утилітою `Awaited<ReturnType<typeof getUser>>`.",
    sources: ["ts-functions", "ts-utility-types"],
  },
  {
    question: "Як TypeScript учинить із `const el = document.getElementById('app')`?",
    options: [
      "Виведе тип `HTMLElement | null` і вимагатиме перевірити на `null`",
      "Виведе тип `HTMLDivElement` автоматично за розміткою сторінки",
      "Виведе `any`, бо DOM-API в TypeScript не типізовані",
    ],
    answer: 0,
    explanation:
      "Елемента може не виявитися, тому в типі є `null`. Для конкретного типу використовують `querySelector<HTMLInputElement>('#email')` або перевірку `instanceof HTMLInputElement`. Типи DOM входять у стандартну бібліотеку (`lib: ['dom']`).",
    sources: ["ts-narrowing", "ts-everyday-types"],
  },
  {
    question: "Що таке union зі спільним полем-дискримінатором?",
    code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number };`,
    options: [
      "Дискриміноване об'єднання: за `kind` TS звужує тип у `switch`/`if`",
      "Помилка: в union не можна використовувати однакові назви властивостей",
      "Перетин двох об'єктів із властивістю `kind`",
    ],
    answer: 0,
    explanation:
      "Перевірка `if (shape.kind === 'circle')` звужує тип, і всередині доступний `shape.radius`. Це основний спосіб моделювати стани: `{ status: 'loading' } | { status: 'success'; data } | { status: 'error'; error }`.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Як вивести тип значення, що повертає функція `createStore`?",
    options: [
      "`ReturnType<typeof createStore>`",
      "`typeof createStore()` з викликом функції",
      "`ResultOf<createStore>` зі стандартної бібліотеки",
    ],
    answer: 0,
    explanation:
      "`ReturnType` приймає тип функції, тому потрібен `typeof`. Аналогічно `Parameters<typeof fn>` дає кортеж параметрів. Так типи виводяться з реалізації, а не дублюються.",
    sources: ["ts-utility-types", "ts-typeof"],
  },
  {
    question: "Що станеться під час передавання об'єктного літерала із зайвою властивістю?",
    code: `type User = { name: string };
const u: User = { name: 'Ann', age: 30 };`,
    options: [
      "Помилка: для літералів діє перевірка зайвих властивостей",
      "Усе гаразд: зайві властивості завжди дозволені",
      "Властивість `age` мовчки видалиться під час компіляції",
    ],
    answer: 0,
    explanation:
      "Excess property check спрацьовує лише для свіжих об'єктних літералів — це захист від помилок у назвах. Якщо спершу покласти об'єкт у змінну, а потім присвоїти, помилки не буде (структурна сумісність). Компілятор нічого не видаляє.",
    sources: ["ts-objects", "ts-type-compatibility"],
  },
  {
    question: "Що таке `tsconfig.json`?",
    options: [
      "Файл із налаштуваннями компілятора й переліком файлів проєкту",
      "Файл із переліком npm-залежностей для TypeScript",
      "Файл із типами для всіх модулів проєкту",
    ],
    answer: 0,
    explanation:
      "У `compilerOptions` задають `target`, `module`, `strict`, `paths` тощо, а `include`/`exclude` визначають, які файли входять у проєкт. Залежності описує `package.json`, а типи — `.d.ts`-файли. Конфіги можна успадковувати через `extends`.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Як поступово перевести JS-проєкт на TypeScript?",
    options: [
      "Увімкнути `allowJs`, перейменовувати файли по одному й посилювати перевірки",
      "Переписати весь проєкт на TS за один раз, інакше він не збереться",
      "Додати `// @ts-nocheck` в усі файли назавжди",
    ],
    answer: 0,
    explanation:
      "`allowJs` дає змогу змішувати JS і TS, `checkJs` і JSDoc дають типи без перейменування. Починають із листових модулів і утиліт, потім посилюють `strict`-прапорці. Повне переписування ризиковане й зупиняє розробку.",
    sources: ["ts-migrating"],
  },
  {
    question: "Чим `Required<T>` відрізняється від `Partial<T>`?",
    options: [
      "`Required` робить усі властивості обов'язковими, `Partial` — необов'язковими",
      "`Required` прибирає модифікатор `readonly`, а `Partial` — додає",
      "Це синоніми: обидва роблять властивості обов'язковими для об'єкта",
    ],
    answer: 0,
    explanation:
      "Вони протилежні: `Required` прибирає модифікатор `?`, `Partial` додає його. За `readonly` відповідає `Readonly<T>`. Усі ці утиліти — зіставлені типи, які можна написати й самостійно.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Як указати, що функція приймає будь-яку кількість чисел?",
    options: [
      "`function sum(...nums: number[])`",
      "`function sum(nums...: number)`",
      "`function sum(*nums: number)`",
    ],
    answer: 0,
    explanation:
      "Rest-параметр збирає аргументи в масив, його тип — масив або кортеж. Виклик: `sum(1, 2, 3)` або `sum(...arr)`.",
    sources: ["ts-functions"],
  },
];

export default questions;
