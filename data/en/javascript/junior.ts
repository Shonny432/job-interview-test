import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "How many data types does JavaScript have according to the specification?",
    options: [
      "8: seven primitives and `object`",
      "6: `number`, `string`, `boolean`, `null`, `undefined`, `object`",
      "3: primitives, objects and functions as a separate type",
    ],
    answer: 0,
    explanation:
      "Primitives: `number`, `bigint`, `string`, `boolean`, `null`, `undefined`, `symbol`. Everything else is `object`, including arrays, functions and dates. Functions are objects, even though `typeof` returns `'function'` for them.",
    sources: ["jsinfo-types", "mdn-data-structures"],
  },
  {
    question: "What does `typeof null` return?",
    options: ["`'object'`", "`'null'`", "`'undefined'`"],
    answer: 0,
    explanation:
      "It's a historical bug from the language's first implementation, kept for compatibility. `null` is a separate primitive. Check for it with strict equality: `value === null`.",
    sources: ["mdn-typeof", "jsinfo-types"],
  },
  {
    question: "What does `typeof NaN` return?",
    options: ["`'number'`", "`'NaN'`", "`'undefined'`"],
    answer: 0,
    explanation:
      "`NaN` (Not-a-Number) is a special value of the number type, the result of an invalid math operation such as `0 / 0` or `Number('abc')`. Check for it with `Number.isNaN(x)`.",
    sources: ["jsinfo-number", "mdn-typeof"],
  },
  {
    question: "How does `let` differ from `var`?",
    options: [
      "`let` is scoped to a `{}` block, `var` to a function",
      "`let` is scoped to a function, while `var` is scoped to a `{}` block",
      "No difference: `let` is just a new name for `var`",
    ],
    answer: 0,
    explanation:
      "A `var` declared inside an `if` or `for` is visible throughout the function. Also, `var` is hoisted with the value `undefined` and becomes a `window` property at the top level, while `let` and `const` are in the \"temporal dead zone\" until declared.",
    sources: ["jsinfo-var", "jsinfo-variables"],
  },
  {
    question: "What happens?",
    code: `const user = { name: "Ann" };
user.name = "Bob";`,
    options: [
      "It works: `const` forbids reassignment, not mutation of the object",
      "`TypeError`: properties of a `const` object can't be changed",
      "The change is silently ignored and `name` stays `\"Ann\"`",
    ],
    answer: 0,
    explanation:
      "`const` fixes the reference: `user = {}` throws, but the object's contents can change. To prevent property changes, use `Object.freeze` (shallowly).",
    sources: ["jsinfo-variables", "mdn-object-freeze"],
  },
  {
    question: "What does this code print?",
    code: `console.log(x);
var x = 5;`,
    options: ["`undefined`", "`5`", "`ReferenceError`"],
    answer: 0,
    explanation:
      "The `var` declaration is hoisted to the top of the function and initialized with `undefined`, while the assignment stays in place. With `let` or `const` this would be a `ReferenceError`.",
    sources: ["mdn-hoisting", "jsinfo-var"],
  },
  {
    question: "What does this code print?",
    code: `console.log(y);
let y = 5;`,
    options: ["`ReferenceError`", "`undefined`", "`5`"],
    answer: 0,
    explanation:
      "`let` and `const` are hoisted too, but until the declaration line they're in the temporal dead zone (TDZ): any access throws a `ReferenceError`. This helps catch variables used before initialization.",
    sources: ["mdn-let", "mdn-hoisting"],
  },
  {
    question: "How does `==` differ from `===`?",
    options: [
      "`==` coerces types before comparing, `===` compares without coercion",
      "`===` coerces types before comparing, while `==` compares without coercion",
      "`==` compares only numbers, while `===` compares values of any type",
    ],
    answer: 0,
    explanation:
      "`0 == ''` and `'1' == 1` are `true` because of coercion, but `false` with `===`. Loose equality rules are confusing, so `===` is almost always used. A handy exception: `x == null` checks for both `null` and `undefined` at once.",
    sources: ["jsinfo-comparison", "mdn-equality"],
  },
  {
    question: "How does `null` differ from `undefined`?",
    options: [
      "`undefined` means no value was assigned, `null` is an explicit \"empty\" set by the programmer",
      "`null` means no value was assigned, while `undefined` is an explicitly set \"empty\"",
      "They are the same value; `null === undefined` returns `true`",
    ],
    answer: 0,
    explanation:
      "`undefined` is what uninitialized variables, missing properties and parameters, and functions without `return` produce. `null` is assigned on purpose. `null == undefined` is `true`, but `null === undefined` is `false`.",
    sources: ["jsinfo-types"],
  },
  {
    question: "What does `NaN === NaN` return?",
    options: ["`false`", "`true`", "`NaN`"],
    answer: 0,
    explanation:
      "`NaN` is not equal to anything, not even itself. Use `Number.isNaN(x)` or `Object.is(x, NaN)` to check. The global `isNaN('abc')` coerces its argument to a number first and returns `true` for strings.",
    sources: ["jsinfo-number", "mdn-equality"],
  },
  {
    question: "What does `0.1 + 0.2 === 0.3` evaluate to?",
    options: ["`false`", "`true`", "`TypeError`"],
    answer: 0,
    explanation:
      "Numbers are stored in binary IEEE-754 format, and 0.1 and 0.2 can't be represented exactly — the sum is `0.30000000000000004`. Compare numbers with a tolerance (`Math.abs(a - b) < Number.EPSILON`), and handle money as integer cents.",
    sources: ["jsinfo-number", "mdn-number-epsilon"],
  },
  {
    question: "What are `'5' + 3` and `'5' - 3`?",
    options: ["`'53'` and `2`", "`8` and `2`", "`'53'` and `'2'`"],
    answer: 0,
    explanation:
      "If one operand of `+` is a string, concatenation happens. Other arithmetic operators convert operands to numbers. That's why values from `input.value` are converted with `Number()` before adding.",
    sources: ["jsinfo-type-conversions"],
  },
  {
    question: "Which of these values is falsy?",
    options: ["`0`", "`'0'`", "`[]`"],
    answer: 0,
    explanation:
      "Falsy values: `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`. Everything else is truthy, including the string `'0'`, an empty array `[]` and an empty object `{}`.",
    sources: ["jsinfo-logical-operators", "jsinfo-type-conversions"],
  },
  {
    question: "How does `count || 10` differ from `count ?? 10` when `count = 0`?",
    options: [
      "`||` returns `10`, while `??` returns `0`",
      "Both return `10`, because `0` is falsy",
      "Both return `0`, because the value is defined",
    ],
    answer: 0,
    explanation:
      "`||` substitutes the fallback for any falsy value, while `??` only does so for `null` and `undefined`. For numbers and strings where `0` and `''` are valid values, `??` is the right choice.",
    sources: ["jsinfo-nullish", "jsinfo-logical-operators"],
  },
  {
    question: "What does `user?.address?.city` return if `user = {}`?",
    options: ["`undefined`", "`TypeError`", "`null`"],
    answer: 0,
    explanation:
      "Optional chaining short-circuits and returns `undefined` if the value on the left is `null` or `undefined`. Without `?.`, `user.address.city` would throw a `TypeError`. There are also forms for calls `fn?.()` and indexes `arr?.[0]`.",
    sources: ["jsinfo-optional-chaining"],
  },
  {
    question: "How does an arrow function differ from a regular one?",
    options: [
      "It has no own `this` or `arguments` and can't be called with `new`",
      "It always runs asynchronously, while a regular one runs synchronously",
      "It is fully hoisted, while a regular function is not",
    ],
    answer: 0,
    explanation:
      "An arrow takes `this` from the scope where it was created, which makes it handy for callbacks inside methods. But it doesn't work as an object method: `this` won't point to the object. Only function declarations are fully hoisted.",
    sources: ["jsinfo-arrow-functions", "mdn-this"],
  },
  {
    question: "Can you call a function before its declaration?",
    code: `greet();
function greet() { console.log("hi"); }`,
    options: [
      "Yes: a function declaration is fully hoisted",
      "No: it throws a `ReferenceError`, as with `let`",
      "No: it throws `TypeError: greet is not a function`",
    ],
    answer: 0,
    explanation:
      "Function declarations are created before code in their scope runs. With a function expression (`const greet = function () {}`), calling before the declaration fails: the variable is in the TDZ (or `undefined` with `var`).",
    sources: ["jsinfo-function-expressions", "mdn-hoisting"],
  },
  {
    question: "What does this code print?",
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
      "This is a closure: the returned function remembers the `count` variable from the scope where it was created, and each call increments it. Calling `makeCounter()` again would create an independent counter.",
    sources: ["jsinfo-closure", "mdn-closures"],
  },
  {
    question: "What is a closure?",
    options: [
      "A function together with access to variables of the outer scope where it was created",
      "A function that is called right after declaration and then deleted",
      "A block of code in curly braces that is inaccessible from outside after it runs",
    ],
    answer: 0,
    explanation:
      "Every JS function remembers the lexical environment where it was created and can read and change its variables even after the outer function finishes. Private data, function factories, memoization and event handlers are built on this.",
    sources: ["jsinfo-closure", "mdn-closures"],
  },
  {
    question: "What does this code print?",
    code: `const a = { n: 1 };
const b = a;
b.n = 2;
console.log(a.n);`,
    options: ["`2`", "`1`", "`undefined`"],
    answer: 0,
    explanation:
      "Objects are passed by reference: `b` points to the same object as `a`. To get a copy, use spread `{ ...a }` (shallow) or `structuredClone(a)` (deep).",
    sources: ["jsinfo-object-copy"],
  },
  {
    question: "What does `const copy = { ...original }` do?",
    options: [
      "A shallow copy: nested objects remain shared",
      "A deep copy of all nested objects and arrays",
      "A reference to the same object, like `const copy = original`",
    ],
    answer: 0,
    explanation:
      "Spread copies only own first-level properties. If `original.address` is an object, it's shared by both copies. `structuredClone` gives a deep copy, but it doesn't copy functions or DOM nodes.",
    sources: ["jsinfo-object-copy", "mdn-structured-clone"],
  },
  {
    question: "What does `[1, 2, 3].map(x => x * 2)` return?",
    options: ["`[2, 4, 6]`", "`undefined`", "`12`"],
    answer: 0,
    explanation:
      "`map` creates a new array from the callback's results without changing the original. Similar non-mutating methods: `filter` (selection), `reduce` (folding into one value), `find`, `some`, `every`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "What does `[1, 2, 3].forEach(x => x * 2)` return?",
    options: ["`undefined`", "`[2, 4, 6]`", "`[1, 2, 3]`"],
    answer: 0,
    explanation:
      "`forEach` is for side effects and always returns `undefined`. Use `map` to get a new array. Another difference: you can't `break` out of `forEach` — use `for...of`, `some` or `find` for that.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "What does `[1, 2, 3, 4].reduce((sum, x) => sum + x, 0)` return?",
    options: ["`10`", "`[1, 3, 6, 10]`", "`0`"],
    answer: 0,
    explanation:
      "`reduce` walks the array, passing the accumulator from step to step; the second argument is the initial value. Without it, the first element becomes the initial accumulator, and an empty array throws a `TypeError`.",
    sources: ["mdn-array-reduce", "jsinfo-array-methods"],
  },
  {
    question: "How does `for...in` differ from `for...of`?",
    options: [
      "`for...in` iterates over object keys, `for...of` over values of an iterable",
      "`for...in` iterates over array values, while `for...of` iterates over object keys",
      "No difference: they're two synonyms for the same loop",
    ],
    answer: 0,
    explanation:
      "`for (const key in obj)` goes over enumerable string keys, including inherited ones. `for (const item of arr)` works with iterables: arrays, strings, `Map`, `Set`. `for...in` isn't suitable for arrays — it yields indexes as strings.",
    sources: ["mdn-for-in", "mdn-for-of"],
  },
  {
    question: "How does `slice` differ from `splice`?",
    options: [
      "`slice` returns part of the array without changes, `splice` mutates the original",
      "`splice` returns an unchanged copy, while `slice` mutates the original array",
      "They're synonyms; `splice` is the deprecated name of `slice`",
    ],
    answer: 0,
    explanation:
      "`arr.slice(1, 3)` creates a new array. `arr.splice(1, 2, 'x')` removes and inserts elements in `arr` itself. The non-mutating alternative is `toSpliced()`. Other mutating methods: `push`, `pop`, `shift`, `sort`, `reverse`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "What do `[NaN].includes(NaN)` and `[NaN].indexOf(NaN)` return?",
    options: ["`true` and `-1`", "`false` and `-1`", "`true` and `0`"],
    answer: 0,
    explanation:
      "`indexOf` uses strict equality `===`, and `NaN !== NaN`. `includes` uses the SameValueZero algorithm, which treats `NaN` as equal to itself. So `includes` is more reliable for checking presence.",
    sources: ["jsinfo-array-methods", "mdn-equality"],
  },
  {
    question: "What does this code print?",
    code: `const { name = "Guest", age } = { age: 30 };
console.log(name, age);`,
    options: ["`Guest 30`", "`undefined 30`", "`TypeError`"],
    answer: 0,
    explanation:
      "Destructuring extracts properties into variables, and the default value is used when the property is `undefined`. You can rename (`{ name: userName }`) and destructure nested objects and arrays.",
    sources: ["jsinfo-destructuring"],
  },
  {
    question: "What does `sum(1, 2, 3)` return?",
    code: `function sum(...nums) {
  return nums.length;
}`,
    options: ["`3`", "`1`", "`6`"],
    answer: 0,
    explanation:
      "A rest parameter collects the remaining arguments into a real array. Unlike the legacy `arguments`, it's an array with `map` and `reduce`, and it works in arrow functions.",
    sources: ["jsinfo-rest-spread"],
  },
  {
    question: "What does `Math.max(...[3, 7, 2])` return?",
    options: ["`7`", "`NaN`", "`[3, 7, 2]`"],
    answer: 0,
    explanation:
      "Spread \"expands\" the array into separate arguments: `Math.max(3, 7, 2)`. Without spread, `Math.max([3, 7, 2])` returns `NaN`. Spread is also used to copy and merge arrays and objects.",
    sources: ["jsinfo-rest-spread"],
  },
  {
    question: "What does `JSON.stringify({ a: 1, b: undefined, c: () => 1 })` return?",
    options: ["`'{\"a\":1}'`", "`'{\"a\":1,\"b\":null,\"c\":null}'`", "`TypeError`"],
    answer: 0,
    explanation:
      "Properties whose values are `undefined`, functions or symbols are skipped (in arrays they become `null`). `Date` becomes a string, `Map` and `Set` become `{}`. Circular references throw an error.",
    sources: ["jsinfo-json"],
  },
  {
    question: "In what order are the numbers printed?",
    code: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    options: ["`1 4 3 2`", "`1 2 3 4`", "`1 4 2 3`"],
    answer: 0,
    explanation:
      "Synchronous code runs first (1, 4). Then the event loop runs all microtasks — promise callbacks (3) — and only then the next macrotask — the timer (2). `setTimeout(fn, 0)` doesn't mean \"immediately\".",
    sources: ["jsinfo-event-loop", "jsinfo-microtask"],
  },
  {
    question: "Which states can a promise be in?",
    options: [
      "`pending`, then `fulfilled` or `rejected` — and it never changes again",
      "`pending`, `running`, `done` and `cancelled` on user request",
      "Only `resolved` or `rejected`; there's no initial state",
    ],
    answer: 0,
    explanation:
      "A promise starts pending and settles exactly once into fulfilled or rejected. Further `resolve`/`reject` calls are ignored. A promise can't be cancelled — use `AbortController` to cancel operations.",
    sources: ["jsinfo-promise", "mdn-promise"],
  },
  {
    question: "What does an `async` function return?",
    options: [
      "Always a promise, even with `return 42` inside",
      "The `return` value directly, without a promise",
      "`undefined`, with the result passed to a callback",
    ],
    answer: 0,
    explanation:
      "`async function f() { return 42 }` returns `Promise<42>`. An exception inside becomes a rejected promise. That's why the result is obtained with `await` or `.then()`.",
    sources: ["jsinfo-async-await", "mdn-async-function"],
  },
  {
    question: "Why won't `catch` catch the error?",
    code: `try {
  fetch("/api").then(r => { throw new Error("fail"); });
} catch (e) {
  console.log("caught");
}`,
    options: [
      "The error happens later, asynchronously, after `try` has already finished",
      "`try/catch` can't catch `Error` objects at all",
      "`fetch` automatically swallows all errors inside `.then`",
    ],
    answer: 0,
    explanation:
      "The `try` block ran synchronously and finished before the server responded. Errors in the chain are caught with `.catch()`, or by writing `await fetch(...)` inside `try` in an async function — then `catch` works.",
    sources: ["jsinfo-try-catch", "jsinfo-async-await"],
  },
  {
    question: "What does `const arr = ['a', 'b']; console.log(arr[20]);` print?",
    options: ["`undefined`", "`RangeError`", "`null`"],
    answer: 0,
    explanation:
      "Accessing a nonexistent index, like a missing object property, returns `undefined` without an error. For the last element, `arr.at(-1)` is handy.",
    sources: ["jsinfo-array-methods", "mdn-array-at"],
  },
  {
    question: "What does this code print?",
    code: `const s = "hello";
s[0] = "H";
console.log(s);`,
    options: ["`hello`", "`Hello`", "`TypeError` in any mode"],
    answer: 0,
    explanation:
      "Strings are immutable: you can't change a character; the assignment is silently ignored (a `TypeError` in strict mode). You need to create a new string: `s[0].toUpperCase() + s.slice(1)`.",
    sources: ["jsinfo-types", "mdn-strict-mode"],
  },
  {
    question: "How do you reliably check that a value is an array?",
    options: ["`Array.isArray(value)`", "`typeof value === 'array'`", "`value.length !== undefined`"],
    answer: 0,
    explanation:
      "`typeof []` returns `'object'`, and strings and array-like objects also have `length`. `Array.isArray` works even for arrays from other iframes, where `instanceof Array` fails.",
    sources: ["jsinfo-array-methods", "mdn-typeof"],
  },
  {
    question: "Why is `textContent` safer than `innerHTML` for displaying user text?",
    options: [
      "It inserts text as is, without parsing HTML — XSS is impossible",
      "It automatically strips all dangerous words and characters from the string",
      "It's faster, while both are equally safe",
    ],
    answer: 0,
    explanation:
      "`el.innerHTML = userInput` parses the string as markup, and `<img src=x onerror=alert(1)>` runs a script. `textContent` shows tags as text. If you really need HTML, clean it with a sanitizer (DOMPurify).",
    sources: ["mdn-textcontent", "mdn-xss"],
  },
  {
    question: "Why is `addEventListener` better than `el.onclick = handler`?",
    options: [
      "It allows multiple handlers and options (`once`, `passive`)",
      "It's faster because it runs in a separate thread",
      "Only it gives you access to the event object in the handler",
    ],
    answer: 0,
    explanation:
      "Reassigning `onclick` overwrites the previous handler. `addEventListener` adds them independently and supports the capture phase (`capture`), one-time handlers and removal via `signal` (AbortController). Remove handlers with `removeEventListener` and the same function.",
    sources: ["mdn-add-event-listener"],
  },
  {
    question: "What does `event.preventDefault()` do?",
    options: [
      "Cancels the browser's default action (navigation, form submission)",
      "Stops the event from bubbling up to parent elements",
      "Removes the event handler from the element after the first call",
    ],
    answer: 0,
    explanation:
      "For example, a link won't follow its `href`, a form won't submit, a checkbox won't toggle. Stopping bubbling is `event.stopPropagation()`; they're different things and often confused.",
    sources: ["jsinfo-default-browser-action"],
  },
  {
    question: "What is event bubbling?",
    options: [
      "The event fires on the element and then rises through its ancestors up to `document`",
      "The event fires on `document` first and then descends to the element",
      "The event fires on all elements of the page at the same time",
    ],
    answer: 0,
    explanation:
      "A click on a button inside a `div` triggers the button's handlers, then the `div`'s, then higher. Before bubbling there's the capturing phase — from `window` down to the target. `event.target` is where the event happened, `event.currentTarget` is whose handler is running now.",
    sources: ["jsinfo-bubbling", "mdn-event-bubbling"],
  },
  {
    question: "What is event delegation about?",
    options: [
      "One handler on a parent handles children's events via `event.target`",
      "The handler is moved to a Web Worker so it doesn't block the main thread",
      "Each child element gets a copy of the parent's handler",
    ],
    answer: 0,
    explanation:
      "Instead of 1000 handlers on every table row, there's one on `table` that finds the target via `event.target.closest('tr')`. This saves memory and automatically works for elements added later. It relies on bubbling.",
    sources: ["jsinfo-event-delegation", "jsinfo-bubbling"],
  },
  {
    question: "How does `localStorage` differ from `sessionStorage`?",
    options: [
      "`localStorage` persists indefinitely, `sessionStorage` until the tab is closed",
      "`sessionStorage` persists indefinitely, while `localStorage` lasts until the tab is closed",
      "`localStorage` is sent to the server with every request, while `sessionStorage` isn't",
    ],
    answer: 0,
    explanation:
      "Both store strings per origin, a few megabytes in size, and aren't sent to the server (unlike cookies). `sessionStorage` is also isolated per tab. Storing tokens and secrets there is unsafe: any script on the page can read them.",
    sources: ["jsinfo-localstorage", "mdn-web-storage"],
  },
  {
    question: "What does `localStorage.getItem('n')` return after `localStorage.setItem('n', 5)`?",
    options: ["`'5'`", "`5`", "`null`"],
    answer: 0,
    explanation:
      "Web Storage stores only strings — the value is converted with `String()`. An object becomes `'[object Object]'`, so complex data is saved with `JSON.stringify` and read with `JSON.parse`.",
    sources: ["jsinfo-localstorage", "jsinfo-json"],
  },
  {
    question: "How does `DOMContentLoaded` differ from `load`?",
    options: [
      "`DOMContentLoaded` — the DOM is built; `load` — images and styles are loaded too",
      "`load` fires earlier: as soon as the DOM is built, without images and styles",
      "They're the same event under different names in different browsers",
    ],
    answer: 0,
    explanation:
      "`DOMContentLoaded` is enough for working with the DOM (`defer` scripts run right before it). `load` waits for all resources, including images and iframes — you need it, for example, to measure image sizes.",
    sources: ["jsinfo-onload", "mdn-dom-content-loaded"],
  },
  {
    question: "How does `Map` differ from a plain object?",
    options: [
      "`Map` keys can be any values, and insertion order is preserved",
      "`Map` can store only string keys, while an object can store any values",
      "`Map` is immutable: pairs can't be added after creation",
    ],
    answer: 0,
    explanation:
      "Object keys are strings or symbols (the number `1` becomes `'1'`), and there are inherited properties. `Map` accepts objects as keys, has `size` and `get/set/has/delete`, and is convenient for frequent additions and removals.",
    sources: ["jsinfo-map-set"],
  },
  {
    question: "How do you quickly remove duplicates from an array of primitives?",
    options: ["`[...new Set(arr)]`", "`arr.unique()`", "`Object.keys(arr)`"],
    answer: 0,
    explanation:
      "`Set` stores only unique values (SameValueZero comparison). Spread turns it back into an array. Arrays of objects need a key: for example, a `Map` by `id`.",
    sources: ["jsinfo-map-set"],
  },
  {
    question: "What does the `'use strict'` directive give you?",
    options: [
      "Strict mode: errors instead of silent failures and a ban on dangerous constructs",
      "Static type checking at runtime, as in TypeScript",
      "Automatic minification and optimization of code by the engine",
    ],
    answer: 0,
    explanation:
      "For example, assigning to an undeclared variable throws instead of creating a global, and `this` in a regular function is `undefined`, not `window`. Modules and classes run in strict mode automatically.",
    sources: ["mdn-strict-mode"],
  },
  {
    question: "How do you find the first element with the `card` class on the page?",
    options: [
      "`document.querySelector('.card')`",
      "`document.getElementsByClassName('.card')[1]`",
      "`document.find('card')`",
    ],
    answer: 0,
    explanation:
      "`querySelector` accepts any CSS selector and returns the first element or `null`. `querySelectorAll` returns a static `NodeList` of all matches. `getElementsByClassName` takes the class name without a dot, and indexing starts at 0.",
    sources: ["jsinfo-dom-nodes"],
  },
];

export default questions;
