import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Скільки типів даних у JavaScript за специфікацією?",
    options: [
      "8: сім примітивів і `object`",
      "6: `number`, `string`, `boolean`, `null`, `undefined`, `object`",
      "3: примітиви, об'єкти й функції як окремий тип",
    ],
    answer: 0,
    explanation:
      "Примітиви: `number`, `bigint`, `string`, `boolean`, `null`, `undefined`, `symbol`. Усе інше — `object`, включно з масивами, функціями, датами. Функції — це об'єкти, хоча `typeof` для них повертає `'function'`.",
    sources: ["jsinfo-types", "mdn-data-structures"],
  },
  {
    question: "Що поверне `typeof null`?",
    options: ["`'object'`", "`'null'`", "`'undefined'`"],
    answer: 0,
    explanation:
      "Це історична помилка першої реалізації мови, яку залишили заради сумісності. `null` — окремий примітив. Перевіряти його треба строгим порівнянням: `value === null`.",
    sources: ["mdn-typeof", "jsinfo-types"],
  },
  {
    question: "Що поверне `typeof NaN`?",
    options: ["`'number'`", "`'NaN'`", "`'undefined'`"],
    answer: 0,
    explanation:
      "`NaN` (Not-a-Number) — спеціальне значення числового типу, результат некоректної математичної операції, наприклад `0 / 0` або `Number('abc')`. Перевірка — `Number.isNaN(x)`.",
    sources: ["jsinfo-number", "mdn-typeof"],
  },
  {
    question: "Чим `let` відрізняється від `var`?",
    options: [
      "`let` обмежений блоком `{}`, `var` — функцією",
      "`let` обмежений функцією, а `var` — блоком `{}`",
      "Нічим: `let` — просто нова назва для `var`",
    ],
    answer: 0,
    explanation:
      "Змінна `var`, оголошена всередині `if` чи `for`, видима в усій функції. Крім того, `var` піднімається зі значенням `undefined` і на верхньому рівні стає властивістю `window`, а `let` і `const` до оголошення перебувають у «тимчасовій мертвій зоні».",
    sources: ["jsinfo-var", "jsinfo-variables"],
  },
  {
    question: "Що станеться?",
    code: `const user = { name: "Ann" };
user.name = "Bob";`,
    options: [
      "Усе спрацює: `const` забороняє перепризначення, а не зміну об'єкта",
      "Помилка `TypeError`: властивості `const`-об'єкта змінювати не можна",
      "Зміну мовчки проігнорують, `name` лишиться `\"Ann\"`",
    ],
    answer: 0,
    explanation:
      "`const` фіксує посилання: `user = {}` спричинить помилку, а вміст об'єкта змінювати можна. Щоб заборонити зміну властивостей, використовують `Object.freeze` (неглибоко).",
    sources: ["jsinfo-variables", "mdn-object-freeze"],
  },
  {
    question: "Що виведе код?",
    code: `console.log(x);
var x = 5;`,
    options: ["`undefined`", "`5`", "`ReferenceError`"],
    answer: 0,
    explanation:
      "Оголошення `var` піднімається (hoisting) на початок функції та ініціалізується `undefined`, а присвоєння лишається на місці. З `let` чи `const` тут був би `ReferenceError`.",
    sources: ["mdn-hoisting", "jsinfo-var"],
  },
  {
    question: "Що виведе код?",
    code: `console.log(y);
let y = 5;`,
    options: ["`ReferenceError`", "`undefined`", "`5`"],
    answer: 0,
    explanation:
      "`let` і `const` теж піднімаються, але до рядка оголошення перебувають у тимчасовій мертвій зоні (TDZ): будь-яке звернення до них кидає `ReferenceError`. Це допомагає ловити використання змінних до ініціалізації.",
    sources: ["mdn-let", "mdn-hoisting"],
  },
  {
    question: "Чим `==` відрізняється від `===`?",
    options: [
      "`==` зводить типи перед порівнянням, `===` порівнює без зведення",
      "`===` зводить типи перед порівнянням, а `==` порівнює без зведення",
      "`==` порівнює лише числа, а `===` — значення будь-яких типів",
    ],
    answer: 0,
    explanation:
      "`0 == ''` і `'1' == 1` — `true` через зведення типів, а з `===` — `false`. Правила нестрогого порівняння заплутані, тому майже завжди використовують `===`. Зручний виняток: `x == null` перевіряє одразу і `null`, і `undefined`.",
    sources: ["jsinfo-comparison", "mdn-equality"],
  },
  {
    question: "Чим `null` відрізняється від `undefined`?",
    options: [
      "`undefined` — значення не присвоєно, `null` — явне «порожньо», задане програмістом",
      "`null` — значення не присвоєно, а `undefined` — явно задане «порожньо»",
      "Це те саме значення, `null === undefined` повертає `true`",
    ],
    answer: 0,
    explanation:
      "`undefined` отримують неініціалізовані змінні, відсутні властивості й параметри, функції без `return`. `null` присвоюють навмисно. `null == undefined` — `true`, але `null === undefined` — `false`.",
    sources: ["jsinfo-types"],
  },
  {
    question: "Що поверне `NaN === NaN`?",
    options: ["`false`", "`true`", "`NaN`"],
    answer: 0,
    explanation:
      "`NaN` не дорівнює нічому, навіть самому собі. Для перевірки використовують `Number.isNaN(x)` або `Object.is(x, NaN)`. Глобальна `isNaN('abc')` спершу зводить аргумент до числа й поверне `true` для рядків.",
    sources: ["jsinfo-number", "mdn-equality"],
  },
  {
    question: "Що виведе `0.1 + 0.2 === 0.3`?",
    options: ["`false`", "`true`", "`TypeError`"],
    answer: 0,
    explanation:
      "Числа зберігаються у двійковому форматі IEEE-754, і 0.1 та 0.2 не можна подати точно — сума дорівнює `0.30000000000000004`. Числа порівнюють із похибкою (`Math.abs(a - b) < Number.EPSILON`), а гроші рахують у копійках цілими числами.",
    sources: ["jsinfo-number", "mdn-number-epsilon"],
  },
  {
    question: "Чому дорівнюють `'5' + 3` і `'5' - 3`?",
    options: ["`'53'` і `2`", "`8` і `2`", "`'53'` і `'2'`"],
    answer: 0,
    explanation:
      "Якщо один операнд `+` — рядок, виконується конкатенація. Решта арифметичних операторів зводять операнди до чисел. Тому значення з `input.value` перед додаванням перетворюють через `Number()`.",
    sources: ["jsinfo-type-conversions"],
  },
  {
    question: "Яке зі значень є «хибним» (falsy)?",
    options: ["`0`", "`'0'`", "`[]`"],
    answer: 0,
    explanation:
      "Falsy-значення: `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`. Усе інше truthy, включно з рядком `'0'`, порожнім масивом `[]` і порожнім об'єктом `{}`.",
    sources: ["jsinfo-logical-operators", "jsinfo-type-conversions"],
  },
  {
    question: "Чим `count || 10` відрізняється від `count ?? 10`, якщо `count = 0`?",
    options: [
      "`||` поверне `10`, а `??` поверне `0`",
      "Обидва повернуть `10`, бо `0` — falsy",
      "Обидва повернуть `0`, бо значення визначене",
    ],
    answer: 0,
    explanation:
      "`||` підставляє запасне значення для будь-якого falsy, а `??` — лише для `null` і `undefined`. Для чисел і рядків, де `0` і `''` — нормальні значення, правильніше `??`.",
    sources: ["jsinfo-nullish", "jsinfo-logical-operators"],
  },
  {
    question: "Що поверне `user?.address?.city`, якщо `user = {}`?",
    options: ["`undefined`", "`TypeError`", "`null`"],
    answer: 0,
    explanation:
      "Опціональний ланцюжок перериває обчислення й повертає `undefined`, якщо значення ліворуч — `null` або `undefined`. Без `?.` звернення `user.address.city` кинуло б `TypeError`. Є варіанти для викликів `fn?.()` та індексів `arr?.[0]`.",
    sources: ["jsinfo-optional-chaining"],
  },
  {
    question: "Чим стрілкова функція відрізняється від звичайної?",
    options: [
      "Вона не має власних `this` і `arguments`, і її не можна викликати з `new`",
      "Вона завжди виконується асинхронно, а звичайна — синхронно",
      "Вона піднімається (hoisting) цілком, а звичайна функція — ні",
    ],
    answer: 0,
    explanation:
      "Стрілка бере `this` з оточення, де створена, тому зручна для колбеків усередині методів. Але як метод об'єкта вона не підходить: `this` не вказуватиме на об'єкт. Цілком піднімаються лише Function Declaration.",
    sources: ["jsinfo-arrow-functions", "mdn-this"],
  },
  {
    question: "Чи можна викликати функцію до її оголошення?",
    code: `greet();
function greet() { console.log("hi"); }`,
    options: [
      "Так: Function Declaration піднімається цілком",
      "Ні: буде `ReferenceError`, як із `let`",
      "Ні: буде `TypeError: greet is not a function`",
    ],
    answer: 0,
    explanation:
      "Оголошення функцій створюються до виконання коду у своїй області. З Function Expression (`const greet = function () {}`) виклик до оголошення не спрацює: змінна в TDZ (або `undefined` за `var`).",
    sources: ["jsinfo-function-expressions", "mdn-hoisting"],
  },
  {
    question: "Що виведе код?",
    code: `function makeCounter() {
  let count = 0;
  return () => ++count;
}
const c = makeCounter();
c(); c();
console.log(c());`,
    options: ["`3`", "`1`", "`0`"],
    answer: 0,
    explanation:
      "Це замикання: повернена функція пам'ятає змінну `count` з оточення, де її створено, і кожен виклик її збільшує. Новий виклик `makeCounter()` створив би незалежний лічильник.",
    sources: ["jsinfo-closure", "mdn-closures"],
  },
  {
    question: "Що таке замикання?",
    options: [
      "Функція разом із доступом до змінних зовнішньої області, де її створено",
      "Функція, яка викликається одразу після оголошення, а потім видаляється",
      "Блок коду у фігурних дужках, недоступний ззовні після виконання",
    ],
    answer: 0,
    explanation:
      "Кожна функція в JS запам'ятовує лексичне оточення, у якому створена, і може читати та змінювати його змінні навіть після завершення зовнішньої функції. На цьому побудовано приватні дані, фабрики функцій, мемоізацію, обробники подій.",
    sources: ["jsinfo-closure", "mdn-closures"],
  },
  {
    question: "Що виведе код?",
    code: `const a = { n: 1 };
const b = a;
b.n = 2;
console.log(a.n);`,
    options: ["`2`", "`1`", "`undefined`"],
    answer: 0,
    explanation:
      "Об'єкти передаються за посиланням: `b` вказує на той самий об'єкт, що й `a`. Щоб отримати копію, використовують spread `{ ...a }` (поверхнево) або `structuredClone(a)` (глибоко).",
    sources: ["jsinfo-object-copy"],
  },
  {
    question: "Що робить `const copy = { ...original }`?",
    options: [
      "Поверхневу копію: вкладені об'єкти лишаються спільними",
      "Глибоку копію всіх вкладених об'єктів і масивів",
      "Посилання на той самий об'єкт, як `const copy = original`",
    ],
    answer: 0,
    explanation:
      "Spread копіює лише власні властивості першого рівня. Якщо в `original.address` об'єкт, він буде спільним для обох копій. Глибоку копію дає `structuredClone`, але він не копіює функції та DOM-вузли.",
    sources: ["jsinfo-object-copy", "mdn-structured-clone"],
  },
  {
    question: "Що поверне `[1, 2, 3].map(x => x * 2)`?",
    options: ["`[2, 4, 6]`", "`undefined`", "`12`"],
    answer: 0,
    explanation:
      "`map` створює новий масив із результатів колбека, не змінюючи вихідний. Схожі немутувальні методи: `filter` (відбір), `reduce` (згортання в одне значення), `find`, `some`, `every`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "Що поверне `[1, 2, 3].forEach(x => x * 2)`?",
    options: ["`undefined`", "`[2, 4, 6]`", "`[1, 2, 3]`"],
    answer: 0,
    explanation:
      "`forEach` потрібен для побічних ефектів і завжди повертає `undefined`. Для нового масиву використовують `map`. Ще відмінність: з `forEach` не можна вийти через `break` — для цього є `for...of`, `some` або `find`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "Що поверне `[1, 2, 3, 4].reduce((sum, x) => sum + x, 0)`?",
    options: ["`10`", "`[1, 3, 6, 10]`", "`0`"],
    answer: 0,
    explanation:
      "`reduce` проходить масивом, передаючи акумулятор від кроку до кроку; другий аргумент — початкове значення. Без нього першим акумулятором стане перший елемент, а на порожньому масиві буде `TypeError`.",
    sources: ["mdn-array-reduce", "jsinfo-array-methods"],
  },
  {
    question: "Чим `for...in` відрізняється від `for...of`?",
    options: [
      "`for...in` перебирає ключі об'єкта, `for...of` — значення ітерованого",
      "`for...in` перебирає значення масиву, а `for...of` — ключі об'єкта",
      "Нічим: це два синоніми того самого циклу",
    ],
    answer: 0,
    explanation:
      "`for (const key in obj)` іде за перелічуваними рядковими ключами, включно з успадкованими. `for (const item of arr)` працює з ітерованими об'єктами: масивами, рядками, `Map`, `Set`. Для масивів `for...in` не підходить — він дає індекси рядками.",
    sources: ["mdn-for-in", "mdn-for-of"],
  },
  {
    question: "Чим `slice` відрізняється від `splice`?",
    options: [
      "`slice` повертає частину масиву без змін, `splice` змінює вихідний",
      "`splice` повертає копію без змін, а `slice` змінює вихідний масив",
      "Це синоніми, `splice` — застаріла назва методу `slice`",
    ],
    answer: 0,
    explanation:
      "`arr.slice(1, 3)` створює новий масив. `arr.splice(1, 2, 'x')` видаляє й вставляє елементи в самому `arr`. Немутувальна альтернатива — `toSpliced()`. Мутувальні методи також: `push`, `pop`, `shift`, `sort`, `reverse`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "Що повернуть `[NaN].includes(NaN)` і `[NaN].indexOf(NaN)`?",
    options: ["`true` і `-1`", "`false` і `-1`", "`true` і `0`"],
    answer: 0,
    explanation:
      "`indexOf` використовує строге порівняння `===`, а `NaN !== NaN`. `includes` використовує алгоритм SameValueZero, який вважає `NaN` рівним самому собі. Тому для перевірки наявності значення `includes` надійніший.",
    sources: ["jsinfo-array-methods", "mdn-equality"],
  },
  {
    question: "Що виведе код?",
    code: `const { name = "Гість", age } = { age: 30 };
console.log(name, age);`,
    options: ["`Гість 30`", "`undefined 30`", "`TypeError`"],
    answer: 0,
    explanation:
      "Деструктуризація дістає властивості в змінні, а значення за замовчуванням підставляється, якщо властивість `undefined`. Можна перейменовувати (`{ name: userName }`) і деструктурувати вкладені об'єкти й масиви.",
    sources: ["jsinfo-destructuring"],
  },
  {
    question: "Що виведе `sum(1, 2, 3)`?",
    code: `function sum(...nums) {
  return nums.length;
}`,
    options: ["`3`", "`1`", "`6`"],
    answer: 0,
    explanation:
      "Rest-параметр збирає решту аргументів у справжній масив. На відміну від застарілого `arguments`, це масив із методами `map` і `reduce`, і він працює в стрілкових функціях.",
    sources: ["jsinfo-rest-spread"],
  },
  {
    question: "Що поверне `Math.max(...[3, 7, 2])`?",
    options: ["`7`", "`NaN`", "`[3, 7, 2]`"],
    answer: 0,
    explanation:
      "Spread «розкладає» масив на окремі аргументи: `Math.max(3, 7, 2)`. Без spread `Math.max([3, 7, 2])` поверне `NaN`. Spread також використовують для копіювання й об'єднання масивів і об'єктів.",
    sources: ["jsinfo-rest-spread"],
  },
  {
    question: "Що поверне `JSON.stringify({ a: 1, b: undefined, c: () => 1 })`?",
    options: ["`'{\"a\":1}'`", "`'{\"a\":1,\"b\":null,\"c\":null}'`", "`TypeError`"],
    answer: 0,
    explanation:
      "Властивості зі значеннями `undefined`, функціями й символами пропускаються (у масивах вони перетворюються на `null`). `Date` перетворюється на рядок, `Map` і `Set` — на `{}`. Циклічні посилання спричиняють помилку.",
    sources: ["jsinfo-json"],
  },
  {
    question: "У якому порядку виведуться числа?",
    code: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    options: ["`1 4 3 2`", "`1 2 3 4`", "`1 4 2 3`"],
    answer: 0,
    explanation:
      "Спершу виконується синхронний код (1, 4). Потім event loop виконує всі мікрозадачі — колбеки промісів (3), і лише потім наступну макрозадачу — таймер (2). `setTimeout(fn, 0)` не означає «негайно».",
    sources: ["jsinfo-event-loop", "jsinfo-microtask"],
  },
  {
    question: "У яких станах може перебувати проміс?",
    options: [
      "`pending`, потім `fulfilled` або `rejected` — і більше не змінюється",
      "`pending`, `running`, `done` і `cancelled` на запит користувача",
      "Лише `resolved` або `rejected`, початкового стану немає",
    ],
    answer: 0,
    explanation:
      "Проміс створюється в очікуванні й один раз переходить у виконаний або відхилений стан (settled). Повторні `resolve`/`reject` ігноруються. Скасувати проміс не можна — для скасування операцій використовують `AbortController`.",
    sources: ["jsinfo-promise", "mdn-promise"],
  },
  {
    question: "Що повертає `async`-функція?",
    options: [
      "Завжди проміс, навіть якщо всередині `return 42`",
      "Значення з `return` одразу, без промісу",
      "`undefined`, а результат передається в колбек",
    ],
    answer: 0,
    explanation:
      "`async function f() { return 42 }` повертає `Promise<42>`. Виняток усередині перетворюється на відхилений проміс. Тому результат отримують через `await` або `.then()`.",
    sources: ["jsinfo-async-await", "mdn-async-function"],
  },
  {
    question: "Чому `catch` не впіймає помилку?",
    code: `try {
  fetch("/api").then(r => { throw new Error("fail"); });
} catch (e) {
  console.log("впіймали");
}`,
    options: [
      "Помилка виникає пізніше, асинхронно, коли `try` уже завершився",
      "`try/catch` узагалі не вміє перехоплювати об'єкти `Error`",
      "`fetch` автоматично придушує всі помилки всередині `.then`",
    ],
    answer: 0,
    explanation:
      "`try` виконався синхронно й закінчився до відповіді сервера. Помилку в ланцюжку ловлять через `.catch()` або пишуть `await fetch(...)` усередині `try` в async-функції — тоді `catch` спрацює.",
    sources: ["jsinfo-try-catch", "jsinfo-async-await"],
  },
  {
    question: "Що виведе `const arr = ['a', 'b']; console.log(arr[20]);`?",
    options: ["`undefined`", "`RangeError`", "`null`"],
    answer: 0,
    explanation:
      "Звернення до неіснуючого індексу, як і до відсутньої властивості об'єкта, повертає `undefined` без помилки. Для останнього елемента зручний `arr.at(-1)`.",
    sources: ["jsinfo-array-methods", "mdn-array-at"],
  },
  {
    question: "Що виведе код?",
    code: `const s = "hello";
s[0] = "H";
console.log(s);`,
    options: ["`hello`", "`Hello`", "`TypeError` у будь-якому режимі"],
    answer: 0,
    explanation:
      "Рядки незмінні: змінити символ не можна, присвоєння мовчки ігнорується (у строгому режимі — `TypeError`). Треба створити новий рядок: `s[0].toUpperCase() + s.slice(1)`.",
    sources: ["jsinfo-types", "mdn-strict-mode"],
  },
  {
    question: "Як надійно перевірити, що значення — масив?",
    options: ["`Array.isArray(value)`", "`typeof value === 'array'`", "`value.length !== undefined`"],
    answer: 0,
    explanation:
      "`typeof []` повертає `'object'`, а `length` є і в рядків, і в об'єктів-«псевдомасивів». `Array.isArray` працює навіть для масивів з інших iframe, де `instanceof Array` помиляється.",
    sources: ["jsinfo-array-methods", "mdn-typeof"],
  },
  {
    question: "Чим `textContent` безпечніший за `innerHTML` під час виведення користувацького тексту?",
    options: [
      "Він вставляє текст як є, без розбору HTML — XSS неможливий",
      "Він автоматично видаляє з рядка всі небезпечні слова й символи",
      "Він працює швидше, а безпека в обох способів однакова",
    ],
    answer: 0,
    explanation:
      "`el.innerHTML = userInput` розбере рядок як розмітку, і `<img src=x onerror=alert(1)>` виконає скрипт. `textContent` показує теги як текст. Якщо HTML справді потрібен, його очищують санітайзером (DOMPurify).",
    sources: ["mdn-textcontent", "mdn-xss"],
  },
  {
    question: "Чим `addEventListener` кращий за `el.onclick = handler`?",
    options: [
      "Дає змогу навісити кілька обробників і задати опції (`once`, `passive`)",
      "Він працює швидше, бо виконується в окремому потоці",
      "Лише він дає змогу отримати об'єкт події в обробнику",
    ],
    answer: 0,
    explanation:
      "Повторне присвоєння `onclick` затирає попередній обробник. `addEventListener` додає їх незалежно, уміє перехоплення на фазі занурення (`capture`), одноразові обробники та скасування через `signal` (AbortController). Видаляють через `removeEventListener` з тією самою функцією.",
    sources: ["mdn-add-event-listener"],
  },
  {
    question: "Що робить `event.preventDefault()`?",
    options: [
      "Скасовує дію браузера за замовчуванням (перехід, надсилання форми)",
      "Зупиняє спливання події до батьківських елементів",
      "Видаляє обробник події з елемента після першого виклику",
    ],
    answer: 0,
    explanation:
      "Наприклад, посилання не перейде за `href`, форма не надішлеться, чекбокс не перемкнеться. Зупинити спливання — це `event.stopPropagation()`; це різні речі, і їх часто плутають.",
    sources: ["jsinfo-default-browser-action"],
  },
  {
    question: "Що таке спливання події (bubbling)?",
    options: [
      "Подія спрацьовує на елементі, а потім піднімається предками до `document`",
      "Подія спершу спрацьовує на `document`, а потім спускається до елемента",
      "Подія спрацьовує на всіх елементах сторінки одночасно",
    ],
    answer: 0,
    explanation:
      "Клік по кнопці всередині `div` викличе обробники кнопки, потім `div`, потім вище. Перед спливанням є фаза занурення (capturing) — від `window` до цілі. `event.target` — де сталася подія, `event.currentTarget` — чий обробник зараз виконується.",
    sources: ["jsinfo-bubbling", "mdn-event-bubbling"],
  },
  {
    question: "У чому суть делегування подій?",
    options: [
      "Один обробник на батькові обробляє події дітей через `event.target`",
      "Обробник передається у Web Worker, щоб не блокувати основний потік",
      "Кожному дочірньому елементу призначають копію обробника батька",
    ],
    answer: 0,
    explanation:
      "Замість 1000 обробників на кожному рядку таблиці — один на `table`, який визначає ціль через `event.target.closest('tr')`. Це заощаджує пам'ять і автоматично працює для елементів, доданих пізніше. Ґрунтується на спливанні.",
    sources: ["jsinfo-event-delegation", "jsinfo-bubbling"],
  },
  {
    question: "Чим `localStorage` відрізняється від `sessionStorage`?",
    options: [
      "`localStorage` зберігається безстроково, `sessionStorage` — до закриття вкладки",
      "`sessionStorage` зберігається безстроково, а `localStorage` — до закриття вкладки",
      "`localStorage` надсилається на сервер із кожним запитом, а `sessionStorage` — ні",
    ],
    answer: 0,
    explanation:
      "Обидва зберігають рядки за доменом, обсяг — кілька мегабайтів, на сервер не надсилаються (на відміну від cookies). `sessionStorage` до того ж ізольований для кожної вкладки. Токени й секрети зберігати там небезпечно: до них має доступ будь-який скрипт на сторінці.",
    sources: ["jsinfo-localstorage", "mdn-web-storage"],
  },
  {
    question: "Що поверне `localStorage.getItem('n')` після `localStorage.setItem('n', 5)`?",
    options: ["`'5'`", "`5`", "`null`"],
    answer: 0,
    explanation:
      "Web Storage зберігає лише рядки — значення зводиться через `String()`. Об'єкт перетвориться на `'[object Object]'`, тому складні дані зберігають через `JSON.stringify` і читають через `JSON.parse`.",
    sources: ["jsinfo-localstorage", "jsinfo-json"],
  },
  {
    question: "Чим `DOMContentLoaded` відрізняється від `load`?",
    options: [
      "`DOMContentLoaded` — DOM побудовано, `load` — завантажено ще й зображення, стилі",
      "`load` спрацьовує раніше: щойно побудовано DOM, без зображень і стилів",
      "Це та сама подія з різними назвами в різних браузерах",
    ],
    answer: 0,
    explanation:
      "Для роботи з DOM досить `DOMContentLoaded` (скрипти з `defer` виконуються просто перед ним). `load` чекає на всі ресурси, включно із зображеннями й iframe, — він потрібен, наприклад, для вимірювання розмірів зображень.",
    sources: ["jsinfo-onload", "mdn-dom-content-loaded"],
  },
  {
    question: "Чим `Map` відрізняється від звичайного об'єкта?",
    options: [
      "Ключами `Map` можуть бути будь-які значення, а порядок вставлення зберігається",
      "`Map` може зберігати лише рядкові ключі, а об'єкт — будь-які значення",
      "`Map` незмінний: після створення додати до нього пари вже не можна",
    ],
    answer: 0,
    explanation:
      "В об'єкта ключі — рядки або символи (число `1` стане `'1'`), є успадковані властивості. `Map` приймає об'єкти як ключі, має `size`, методи `get/set/has/delete` і зручний для частих додавань і видалень.",
    sources: ["jsinfo-map-set"],
  },
  {
    question: "Як швидко видалити дублікати з масиву примітивів?",
    options: ["`[...new Set(arr)]`", "`arr.unique()`", "`Object.keys(arr)`"],
    answer: 0,
    explanation:
      "`Set` зберігає лише унікальні значення (порівняння SameValueZero). Spread перетворює його назад на масив. Для масивів об'єктів потрібен ключ: наприклад, `Map` за `id`.",
    sources: ["jsinfo-map-set"],
  },
  {
    question: "Що дає директива `'use strict'`?",
    options: [
      "Строгий режим: помилки замість мовчазних збоїв і заборона небезпечних конструкцій",
      "Статичну перевірку типів під час виконання, як у TypeScript",
      "Автоматичну мініфікацію й оптимізацію коду рушієм",
    ],
    answer: 0,
    explanation:
      "Наприклад, присвоєння неоголошеній змінній кине помилку замість створення глобальної, `this` у звичайній функції — `undefined`, а не `window`. Модулі й класи працюють у строгому режимі автоматично.",
    sources: ["mdn-strict-mode"],
  },
  {
    question: "Як знайти перший елемент із класом `card` на сторінці?",
    options: [
      "`document.querySelector('.card')`",
      "`document.getElementsByClassName('.card')[1]`",
      "`document.find('card')`",
    ],
    answer: 0,
    explanation:
      "`querySelector` приймає будь-який CSS-селектор і повертає перший елемент або `null`. `querySelectorAll` повертає статичний `NodeList` усіх збігів. У `getElementsByClassName` ім'я класу передають без крапки, а нумерація починається з 0.",
    sources: ["jsinfo-dom-nodes"],
  },
];

export default questions;
