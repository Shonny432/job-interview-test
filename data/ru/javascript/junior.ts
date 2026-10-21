import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Сколько типов данных в JavaScript по спецификации?",
    options: [
      "8: семь примитивов и `object`",
      "6: `number`, `string`, `boolean`, `null`, `undefined`, `object`",
      "3: примитивы, объекты и функции как отдельный тип",
    ],
    answer: 0,
    explanation:
      "Примитивы: `number`, `bigint`, `string`, `boolean`, `null`, `undefined`, `symbol`. Всё остальное — `object`, включая массивы, функции, даты. Функции — это объекты, хотя `typeof` для них возвращает `'function'`.",
    sources: ["jsinfo-types", "mdn-data-structures"],
  },
  {
    question: "Что вернёт `typeof null`?",
    options: ["`'object'`", "`'null'`", "`'undefined'`"],
    answer: 0,
    explanation:
      "Это историческая ошибка первой реализации языка, которую оставили ради совместимости. `null` — отдельный примитив. Проверять его нужно строгим сравнением: `value === null`.",
    sources: ["mdn-typeof", "jsinfo-types"],
  },
  {
    question: "Что вернёт `typeof NaN`?",
    options: ["`'number'`", "`'NaN'`", "`'undefined'`"],
    answer: 0,
    explanation:
      "`NaN` (Not-a-Number) — специальное значение числового типа, результат некорректной математической операции, например `0 / 0` или `Number('abc')`. Проверка — `Number.isNaN(x)`.",
    sources: ["jsinfo-number", "mdn-typeof"],
  },
  {
    question: "Чем `let` отличается от `var`?",
    options: [
      "`let` ограничен блоком `{}`, `var` — функцией",
      "`let` ограничен функцией, а `var` — блоком `{}`",
      "Ничем: `let` — просто новое название для `var`",
    ],
    answer: 0,
    explanation:
      "Переменная `var`, объявленная внутри `if` или `for`, видна во всей функции. Кроме того, `var` поднимается со значением `undefined` и на верхнем уровне становится свойством `window`, а `let` и `const` до объявления находятся во «временной мёртвой зоне».",
    sources: ["jsinfo-var", "jsinfo-variables"],
  },
  {
    question: "Что произойдёт?",
    code: `const user = { name: "Ann" };
user.name = "Bob";`,
    options: [
      "Всё сработает: `const` запрещает переприсваивание, а не изменение объекта",
      "Ошибка `TypeError`: свойства `const`-объекта менять нельзя",
      "Изменение молча проигнорируется, `name` останется `\"Ann\"`",
    ],
    answer: 0,
    explanation:
      "`const` фиксирует ссылку: `user = {}` вызовет ошибку, а содержимое объекта менять можно. Чтобы запретить изменение свойств, используют `Object.freeze` (неглубоко).",
    sources: ["jsinfo-variables", "mdn-object-freeze"],
  },
  {
    question: "Что выведет код?",
    code: `console.log(x);
var x = 5;`,
    options: ["`undefined`", "`5`", "`ReferenceError`"],
    answer: 0,
    explanation:
      "Объявление `var` поднимается (hoisting) в начало функции и инициализируется `undefined`, а присваивание остаётся на месте. С `let` или `const` здесь был бы `ReferenceError`.",
    sources: ["mdn-hoisting", "jsinfo-var"],
  },
  {
    question: "Что выведет код?",
    code: `console.log(y);
let y = 5;`,
    options: ["`ReferenceError`", "`undefined`", "`5`"],
    answer: 0,
    explanation:
      "`let` и `const` тоже поднимаются, но до строки объявления находятся во временной мёртвой зоне (TDZ): любое обращение к ним бросает `ReferenceError`. Это помогает ловить использование переменных до инициализации.",
    sources: ["mdn-let", "mdn-hoisting"],
  },
  {
    question: "Чем `==` отличается от `===`?",
    options: [
      "`==` приводит типы перед сравнением, `===` сравнивает без приведения",
      "`===` приводит типы перед сравнением, а `==` сравнивает без приведения",
      "`==` сравнивает только числа, а `===` — значения любых типов",
    ],
    answer: 0,
    explanation:
      "`0 == ''` и `'1' == 1` — `true` из-за приведения, а с `===` — `false`. Правила нестрогого сравнения запутаны, поэтому почти всегда используют `===`. Удобное исключение: `x == null` проверяет сразу и `null`, и `undefined`.",
    sources: ["jsinfo-comparison", "mdn-equality"],
  },
  {
    question: "Чем `null` отличается от `undefined`?",
    options: [
      "`undefined` — значение не присвоено, `null` — явное «пусто», заданное программистом",
      "`null` — значение не присвоено, а `undefined` — явно заданное «пусто»",
      "Это одно и то же значение, `null === undefined` возвращает `true`",
    ],
    answer: 0,
    explanation:
      "`undefined` получают неинициализированные переменные, отсутствующие свойства и параметры, функции без `return`. `null` присваивают намеренно. `null == undefined` — `true`, но `null === undefined` — `false`.",
    sources: ["jsinfo-types"],
  },
  {
    question: "Что вернёт `NaN === NaN`?",
    options: ["`false`", "`true`", "`NaN`"],
    answer: 0,
    explanation:
      "`NaN` не равен ничему, даже самому себе. Для проверки используют `Number.isNaN(x)` или `Object.is(x, NaN)`. Глобальная `isNaN('abc')` сначала приводит аргумент к числу и вернёт `true` для строк.",
    sources: ["jsinfo-number", "mdn-equality"],
  },
  {
    question: "Что выведет `0.1 + 0.2 === 0.3`?",
    options: ["`false`", "`true`", "`TypeError`"],
    answer: 0,
    explanation:
      "Числа хранятся в двоичном формате IEEE-754, и 0.1 и 0.2 нельзя представить точно — сумма равна `0.30000000000000004`. Числа сравнивают с погрешностью (`Math.abs(a - b) < Number.EPSILON`), а деньги считают в копейках целыми числами.",
    sources: ["jsinfo-number", "mdn-number-epsilon"],
  },
  {
    question: "Чему равны `'5' + 3` и `'5' - 3`?",
    options: ["`'53'` и `2`", "`8` и `2`", "`'53'` и `'2'`"],
    answer: 0,
    explanation:
      "Если один операнд `+` — строка, выполняется конкатенация. Остальные арифметические операторы приводят операнды к числам. Поэтому значения из `input.value` перед сложением преобразуют через `Number()`.",
    sources: ["jsinfo-type-conversions"],
  },
  {
    question: "Какое из значений является «ложным» (falsy)?",
    options: ["`0`", "`'0'`", "`[]`"],
    answer: 0,
    explanation:
      "Falsy-значения: `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`. Всё остальное truthy, включая строку `'0'`, пустой массив `[]` и пустой объект `{}`.",
    sources: ["jsinfo-logical-operators", "jsinfo-type-conversions"],
  },
  {
    question: "Чем `count || 10` отличается от `count ?? 10`, если `count = 0`?",
    options: [
      "`||` вернёт `10`, а `??` вернёт `0`",
      "Оба вернут `10`, потому что `0` — falsy",
      "Оба вернут `0`, потому что значение определено",
    ],
    answer: 0,
    explanation:
      "`||` подставляет запасное значение для любого falsy, а `??` — только для `null` и `undefined`. Для чисел и строк, где `0` и `''` — нормальные значения, правильнее `??`.",
    sources: ["jsinfo-nullish", "jsinfo-logical-operators"],
  },
  {
    question: "Что вернёт `user?.address?.city`, если `user = {}`?",
    options: ["`undefined`", "`TypeError`", "`null`"],
    answer: 0,
    explanation:
      "Опциональная цепочка прерывает вычисление и возвращает `undefined`, если значение слева — `null` или `undefined`. Без `?.` обращение `user.address.city` бросило бы `TypeError`. Есть варианты для вызовов `fn?.()` и индексов `arr?.[0]`.",
    sources: ["jsinfo-optional-chaining"],
  },
  {
    question: "Чем стрелочная функция отличается от обычной?",
    options: [
      "У неё нет своего `this` и `arguments`, и её нельзя вызвать с `new`",
      "Она всегда выполняется асинхронно, а обычная — синхронно",
      "Она поднимается (hoisting) целиком, а обычная функция — нет",
    ],
    answer: 0,
    explanation:
      "Стрелка берёт `this` из окружения, где создана, поэтому удобна для колбэков внутри методов. Но как метод объекта она не подходит: `this` не будет указывать на объект. Поднимаются целиком только Function Declaration.",
    sources: ["jsinfo-arrow-functions", "mdn-this"],
  },
  {
    question: "Можно ли вызвать функцию до её объявления?",
    code: `greet();
function greet() { console.log("hi"); }`,
    options: [
      "Да: Function Declaration поднимается целиком",
      "Нет: будет `ReferenceError`, как с `let`",
      "Нет: будет `TypeError: greet is not a function`",
    ],
    answer: 0,
    explanation:
      "Объявления функций создаются до выполнения кода в своей области. С Function Expression (`const greet = function () {}`) вызов до объявления не сработает: переменная в TDZ (или `undefined` при `var`).",
    sources: ["jsinfo-function-expressions", "mdn-hoisting"],
  },
  {
    question: "Что выведет код?",
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
      "Это замыкание: возвращённая функция помнит переменную `count` из окружения, где была создана, и каждый вызов её увеличивает. Новый вызов `makeCounter()` создал бы независимый счётчик.",
    sources: ["jsinfo-closure", "mdn-closures"],
  },
  {
    question: "Что такое замыкание?",
    options: [
      "Функция вместе с доступом к переменным внешней области, где она создана",
      "Функция, которая вызывается сразу после объявления и затем удаляется",
      "Блок кода в фигурных скобках, недоступный снаружи после выполнения",
    ],
    answer: 0,
    explanation:
      "Каждая функция в JS запоминает лексическое окружение, в котором создана, и может читать и менять его переменные даже после завершения внешней функции. На этом построены приватные данные, фабрики функций, мемоизация, обработчики событий.",
    sources: ["jsinfo-closure", "mdn-closures"],
  },
  {
    question: "Что выведет код?",
    code: `const a = { n: 1 };
const b = a;
b.n = 2;
console.log(a.n);`,
    options: ["`2`", "`1`", "`undefined`"],
    answer: 0,
    explanation:
      "Объекты передаются по ссылке: `b` указывает на тот же объект, что и `a`. Чтобы получить копию, используют spread `{ ...a }` (поверхностно) или `structuredClone(a)` (глубоко).",
    sources: ["jsinfo-object-copy"],
  },
  {
    question: "Что делает `const copy = { ...original }`?",
    options: [
      "Поверхностную копию: вложенные объекты остаются общими",
      "Глубокую копию всех вложенных объектов и массивов",
      "Ссылку на тот же объект, как `const copy = original`",
    ],
    answer: 0,
    explanation:
      "Spread копирует только собственные свойства первого уровня. Если в `original.address` объект, он будет общим для обеих копий. Глубокую копию даёт `structuredClone`, но он не копирует функции и DOM-узлы.",
    sources: ["jsinfo-object-copy", "mdn-structured-clone"],
  },
  {
    question: "Что вернёт `[1, 2, 3].map(x => x * 2)`?",
    options: ["`[2, 4, 6]`", "`undefined`", "`12`"],
    answer: 0,
    explanation:
      "`map` создаёт новый массив из результатов колбэка, не изменяя исходный. Похожие немутирующие методы: `filter` (отбор), `reduce` (свёртка в одно значение), `find`, `some`, `every`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "Что вернёт `[1, 2, 3].forEach(x => x * 2)`?",
    options: ["`undefined`", "`[2, 4, 6]`", "`[1, 2, 3]`"],
    answer: 0,
    explanation:
      "`forEach` нужен для побочных эффектов и всегда возвращает `undefined`. Для нового массива используют `map`. Ещё отличие: из `forEach` нельзя выйти через `break` — для этого есть `for...of`, `some` или `find`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "Что вернёт `[1, 2, 3, 4].reduce((sum, x) => sum + x, 0)`?",
    options: ["`10`", "`[1, 3, 6, 10]`", "`0`"],
    answer: 0,
    explanation:
      "`reduce` проходит по массиву, передавая аккумулятор из шага в шаг; второй аргумент — начальное значение. Без него первым аккумулятором станет первый элемент, а на пустом массиве будет `TypeError`.",
    sources: ["mdn-array-reduce", "jsinfo-array-methods"],
  },
  {
    question: "Чем `for...in` отличается от `for...of`?",
    options: [
      "`for...in` перебирает ключи объекта, `for...of` — значения итерируемого",
      "`for...in` перебирает значения массива, а `for...of` — ключи объекта",
      "Ничем: это два синонима одного и того же цикла",
    ],
    answer: 0,
    explanation:
      "`for (const key in obj)` идёт по перечисляемым строковым ключам, включая унаследованные. `for (const item of arr)` работает с итерируемыми объектами: массивами, строками, `Map`, `Set`. Для массивов `for...in` не подходит — он даёт индексы строками.",
    sources: ["mdn-for-in", "mdn-for-of"],
  },
  {
    question: "Чем `slice` отличается от `splice`?",
    options: [
      "`slice` возвращает часть массива без изменений, `splice` меняет исходный",
      "`splice` возвращает копию без изменений, а `slice` меняет исходный массив",
      "Это синонимы, `splice` — устаревшее название метода `slice`",
    ],
    answer: 0,
    explanation:
      "`arr.slice(1, 3)` создаёт новый массив. `arr.splice(1, 2, 'x')` удаляет и вставляет элементы в самом `arr`. Немутирующая альтернатива — `toSpliced()`. Мутирующие методы также: `push`, `pop`, `shift`, `sort`, `reverse`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "Что вернёт `[NaN].includes(NaN)` и `[NaN].indexOf(NaN)`?",
    options: ["`true` и `-1`", "`false` и `-1`", "`true` и `0`"],
    answer: 0,
    explanation:
      "`indexOf` использует строгое сравнение `===`, а `NaN !== NaN`. `includes` использует алгоритм SameValueZero, который считает `NaN` равным самому себе. Поэтому для проверки наличия значения `includes` надёжнее.",
    sources: ["jsinfo-array-methods", "mdn-equality"],
  },
  {
    question: "Что выведет код?",
    code: `const { name = "Гость", age } = { age: 30 };
console.log(name, age);`,
    options: ["`Гость 30`", "`undefined 30`", "`TypeError`"],
    answer: 0,
    explanation:
      "Деструктуризация достаёт свойства в переменные, а значение по умолчанию подставляется, если свойство `undefined`. Можно переименовывать (`{ name: userName }`) и деструктурировать вложенные объекты и массивы.",
    sources: ["jsinfo-destructuring"],
  },
  {
    question: "Что выведет `sum(1, 2, 3)`?",
    code: `function sum(...nums) {
  return nums.length;
}`,
    options: ["`3`", "`1`", "`6`"],
    answer: 0,
    explanation:
      "Rest-параметр собирает оставшиеся аргументы в настоящий массив. В отличие от устаревшего `arguments`, это массив с методами `map` и `reduce`, и он работает в стрелочных функциях.",
    sources: ["jsinfo-rest-spread"],
  },
  {
    question: "Что вернёт `Math.max(...[3, 7, 2])`?",
    options: ["`7`", "`NaN`", "`[3, 7, 2]`"],
    answer: 0,
    explanation:
      "Spread «раскладывает» массив в отдельные аргументы: `Math.max(3, 7, 2)`. Без spread `Math.max([3, 7, 2])` вернёт `NaN`. Spread также используется для копирования и объединения массивов и объектов.",
    sources: ["jsinfo-rest-spread"],
  },
  {
    question: "Что вернёт `JSON.stringify({ a: 1, b: undefined, c: () => 1 })`?",
    options: ["`'{\"a\":1}'`", "`'{\"a\":1,\"b\":null,\"c\":null}'`", "`TypeError`"],
    answer: 0,
    explanation:
      "Свойства со значениями `undefined`, функциями и символами пропускаются (в массивах они превращаются в `null`). `Date` превращается в строку, `Map` и `Set` — в `{}`. Циклические ссылки вызывают ошибку.",
    sources: ["jsinfo-json"],
  },
  {
    question: "В каком порядке выведутся числа?",
    code: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    options: ["`1 4 3 2`", "`1 2 3 4`", "`1 4 2 3`"],
    answer: 0,
    explanation:
      "Сначала выполняется синхронный код (1, 4). Затем event loop выполняет все микрозадачи — колбэки промисов (3), и только потом следующую макрозадачу — таймер (2). `setTimeout(fn, 0)` не означает «немедленно».",
    sources: ["jsinfo-event-loop", "jsinfo-microtask"],
  },
  {
    question: "В каких состояниях может находиться промис?",
    options: [
      "`pending`, затем `fulfilled` или `rejected` — и больше не меняется",
      "`pending`, `running`, `done` и `cancelled` по запросу пользователя",
      "Только `resolved` или `rejected`, начального состояния нет",
    ],
    answer: 0,
    explanation:
      "Промис создаётся в ожидании и один раз переходит в выполненное или отклонённое состояние (settled). Повторные `resolve`/`reject` игнорируются. Отменить промис нельзя — для отмены операций используют `AbortController`.",
    sources: ["jsinfo-promise", "mdn-promise"],
  },
  {
    question: "Что возвращает `async`-функция?",
    options: [
      "Всегда промис, даже если внутри `return 42`",
      "Значение из `return` сразу, без промиса",
      "`undefined`, а результат передаётся в колбэк",
    ],
    answer: 0,
    explanation:
      "`async function f() { return 42 }` возвращает `Promise<42>`. Исключение внутри превращается в отклонённый промис. Поэтому результат получают через `await` или `.then()`.",
    sources: ["jsinfo-async-await", "mdn-async-function"],
  },
  {
    question: "Почему `catch` не поймает ошибку?",
    code: `try {
  fetch("/api").then(r => { throw new Error("fail"); });
} catch (e) {
  console.log("поймали");
}`,
    options: [
      "Ошибка возникает позже, асинхронно, когда `try` уже завершился",
      "`try/catch` вообще не умеет перехватывать объекты `Error`",
      "`fetch` подавляет все ошибки внутри `.then` автоматически",
    ],
    answer: 0,
    explanation:
      "`try` выполнился синхронно и закончился до ответа сервера. Ошибку в цепочке ловят через `.catch()` либо пишут `await fetch(...)` внутри `try` в async-функции — тогда `catch` сработает.",
    sources: ["jsinfo-try-catch", "jsinfo-async-await"],
  },
  {
    question: "Что выведет `const arr = ['a', 'b']; console.log(arr[20]);`?",
    options: ["`undefined`", "`RangeError`", "`null`"],
    answer: 0,
    explanation:
      "Обращение к несуществующему индексу, как и к отсутствующему свойству объекта, возвращает `undefined` без ошибки. Для последнего элемента удобен `arr.at(-1)`.",
    sources: ["jsinfo-array-methods", "mdn-array-at"],
  },
  {
    question: "Что выведет код?",
    code: `const s = "hello";
s[0] = "H";
console.log(s);`,
    options: ["`hello`", "`Hello`", "`TypeError` в любом режиме"],
    answer: 0,
    explanation:
      "Строки неизменяемы: изменить символ нельзя, присваивание молча игнорируется (в строгом режиме — `TypeError`). Нужно создать новую строку: `s[0].toUpperCase() + s.slice(1)`.",
    sources: ["jsinfo-types", "mdn-strict-mode"],
  },
  {
    question: "Как надёжно проверить, что значение — массив?",
    options: ["`Array.isArray(value)`", "`typeof value === 'array'`", "`value.length !== undefined`"],
    answer: 0,
    explanation:
      "`typeof []` возвращает `'object'`, а `length` есть и у строк, и у объектов-«псевдомассивов». `Array.isArray` работает даже для массивов из других iframe, где `instanceof Array` ошибается.",
    sources: ["jsinfo-array-methods", "mdn-typeof"],
  },
  {
    question: "Чем `textContent` безопаснее `innerHTML` при выводе пользовательского текста?",
    options: [
      "Он вставляет текст как есть, без разбора HTML — XSS невозможен",
      "Он автоматически удаляет из строки все опасные слова и символы",
      "Он работает быстрее, а безопасность у обоих способов одинаковая",
    ],
    answer: 0,
    explanation:
      "`el.innerHTML = userInput` разберёт строку как разметку, и `<img src=x onerror=alert(1)>` выполнит скрипт. `textContent` показывает теги как текст. Если HTML действительно нужен, его очищают санитайзером (DOMPurify).",
    sources: ["mdn-textcontent", "mdn-xss"],
  },
  {
    question: "Чем `addEventListener` лучше `el.onclick = handler`?",
    options: [
      "Позволяет навесить несколько обработчиков и задать опции (`once`, `passive`)",
      "Он работает быстрее, потому что выполняется в отдельном потоке",
      "Только он позволяет получить объект события в обработчике",
    ],
    answer: 0,
    explanation:
      "Повторное присваивание `onclick` затирает предыдущий обработчик. `addEventListener` добавляет их независимо, умеет перехват на фазе погружения (`capture`), одноразовые обработчики и отмену через `signal` (AbortController). Удаляют через `removeEventListener` с той же функцией.",
    sources: ["mdn-add-event-listener"],
  },
  {
    question: "Что делает `event.preventDefault()`?",
    options: [
      "Отменяет действие браузера по умолчанию (переход, отправку формы)",
      "Останавливает всплытие события к родительским элементам",
      "Удаляет обработчик события с элемента после первого вызова",
    ],
    answer: 0,
    explanation:
      "Например, ссылка не перейдёт по `href`, форма не отправится, чекбокс не переключится. Остановить всплытие — это `event.stopPropagation()`; это разные вещи, и их часто путают.",
    sources: ["jsinfo-default-browser-action"],
  },
  {
    question: "Что такое всплытие события (bubbling)?",
    options: [
      "Событие срабатывает на элементе, а затем поднимается по предкам до `document`",
      "Событие сначала срабатывает на `document`, а потом спускается к элементу",
      "Событие срабатывает на всех элементах страницы одновременно",
    ],
    answer: 0,
    explanation:
      "Клик по кнопке внутри `div` вызовет обработчики кнопки, затем `div`, затем выше. Перед всплытием есть фаза погружения (capturing) — от `window` к цели. `event.target` — где произошло событие, `event.currentTarget` — чей обработчик сейчас выполняется.",
    sources: ["jsinfo-bubbling", "mdn-event-bubbling"],
  },
  {
    question: "В чём суть делегирования событий?",
    options: [
      "Один обработчик на родителе обрабатывает события детей через `event.target`",
      "Обработчик передаётся в Web Worker, чтобы не блокировать основной поток",
      "Каждому дочернему элементу назначается копия обработчика родителя",
    ],
    answer: 0,
    explanation:
      "Вместо 1000 обработчиков на каждой строке таблицы — один на `table`, который определяет цель через `event.target.closest('tr')`. Это экономит память и автоматически работает для добавленных позже элементов. Основано на всплытии.",
    sources: ["jsinfo-event-delegation", "jsinfo-bubbling"],
  },
  {
    question: "Чем `localStorage` отличается от `sessionStorage`?",
    options: [
      "`localStorage` хранится бессрочно, `sessionStorage` — до закрытия вкладки",
      "`sessionStorage` хранится бессрочно, а `localStorage` — до закрытия вкладки",
      "`localStorage` отправляется на сервер с каждым запросом, а `sessionStorage` — нет",
    ],
    answer: 0,
    explanation:
      "Оба хранят строки по домену, объём — несколько мегабайт, на сервер не отправляются (в отличие от cookies). `sessionStorage` к тому же изолирован для каждой вкладки. Токены и секреты хранить там небезопасно: к ним есть доступ у любого скрипта на странице.",
    sources: ["jsinfo-localstorage", "mdn-web-storage"],
  },
  {
    question: "Что вернёт `localStorage.getItem('n')` после `localStorage.setItem('n', 5)`?",
    options: ["`'5'`", "`5`", "`null`"],
    answer: 0,
    explanation:
      "Web Storage хранит только строки — значение приводится через `String()`. Объект превратится в `'[object Object]'`, поэтому сложные данные сохраняют через `JSON.stringify` и читают через `JSON.parse`.",
    sources: ["jsinfo-localstorage", "jsinfo-json"],
  },
  {
    question: "Чем `DOMContentLoaded` отличается от `load`?",
    options: [
      "`DOMContentLoaded` — DOM построен, `load` — загружены ещё и картинки, стили",
      "`load` срабатывает раньше: как только построен DOM, без картинок и стилей",
      "Это одно и то же событие с разными именами в разных браузерах",
    ],
    answer: 0,
    explanation:
      "Для работы с DOM достаточно `DOMContentLoaded` (скрипты с `defer` выполняются прямо перед ним). `load` ждёт все ресурсы, включая изображения и iframe, — он нужен, например, для измерения размеров картинок.",
    sources: ["jsinfo-onload", "mdn-dom-content-loaded"],
  },
  {
    question: "Чем `Map` отличается от обычного объекта?",
    options: [
      "Ключами `Map` могут быть любые значения, а порядок вставки сохраняется",
      "`Map` может хранить только строковые ключи, а объект — любые значения",
      "`Map` неизменяем: после создания добавить в него пары уже нельзя",
    ],
    answer: 0,
    explanation:
      "У объекта ключи — строки или символы (число `1` станет `'1'`), есть унаследованные свойства. `Map` принимает объекты как ключи, имеет `size`, методы `get/set/has/delete` и удобен для частых добавлений и удалений.",
    sources: ["jsinfo-map-set"],
  },
  {
    question: "Как быстро удалить дубликаты из массива примитивов?",
    options: ["`[...new Set(arr)]`", "`arr.unique()`", "`Object.keys(arr)`"],
    answer: 0,
    explanation:
      "`Set` хранит только уникальные значения (сравнение SameValueZero). Spread превращает его обратно в массив. Для массивов объектов нужен ключ: например, `Map` по `id`.",
    sources: ["jsinfo-map-set"],
  },
  {
    question: "Что даёт директива `'use strict'`?",
    options: [
      "Строгий режим: ошибки вместо молчаливых сбоев и запрет опасных конструкций",
      "Статическую проверку типов во время выполнения, как в TypeScript",
      "Автоматическую минификацию и оптимизацию кода движком",
    ],
    answer: 0,
    explanation:
      "Например, присваивание необъявленной переменной бросит ошибку вместо создания глобальной, `this` в обычной функции — `undefined`, а не `window`. Модули и классы работают в строгом режиме автоматически.",
    sources: ["mdn-strict-mode"],
  },
  {
    question: "Как найти первый элемент с классом `card` на странице?",
    options: [
      "`document.querySelector('.card')`",
      "`document.getElementsByClassName('.card')[1]`",
      "`document.find('card')`",
    ],
    answer: 0,
    explanation:
      "`querySelector` принимает любой CSS-селектор и возвращает первый элемент или `null`. `querySelectorAll` возвращает статичный `NodeList` всех совпадений. У `getElementsByClassName` имя класса передаётся без точки, а нумерация начинается с 0.",
    sources: ["jsinfo-dom-nodes"],
  },
];

export default questions;
