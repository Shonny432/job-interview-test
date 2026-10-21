import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What does this code print?",
    code: `const user = {
  name: "Ann",
  greet() { return this.name; },
};
const greet = user.greet;
console.log(greet());`,
    options: [
      "`undefined` (or an error in strict mode): the context is lost",
      "`\"Ann\"`: a method remembers the object it was declared in",
      "`\"greet\"`: `this` points to the function itself",
    ],
    answer: 0,
    explanation:
      "`this` is determined by how a function is called, not where it's declared. `greet()` is called without an object before the dot, so `this` is `undefined` in strict mode (the global object in sloppy mode). Fix it with `user.greet.bind(user)` or by calling `user.greet()`.",
    sources: ["jsinfo-object-methods", "mdn-this"],
  },
  {
    question: "How do `call`, `apply` and `bind` differ from each other?",
    options: [
      "`call`/`apply` invoke immediately, `bind` returns a new function",
      "`bind` invokes the function immediately, while `call` and `apply` return new functions",
      "`apply` works only with arrow functions, the others with regular ones",
    ],
    answer: 0,
    explanation:
      "`fn.call(ctx, a, b)` and `fn.apply(ctx, [a, b])` invoke immediately with the given `this`. `fn.bind(ctx, a)` returns a function with a permanently bound context and partially applied arguments. None of them affect arrow functions: they have no own `this`.",
    sources: ["jsinfo-bind", "jsinfo-call-apply"],
  },
  {
    question: "What does this code print?",
    code: `function f() { return this.x; }
const g = f.bind({ x: 1 }).bind({ x: 2 });
console.log(g());`,
    options: ["`1`", "`2`", "`undefined`"],
    answer: 0,
    explanation:
      "A bound function \"remembers\" its context forever; a second `bind` can't change it (though it can add arguments). Only `new` can override `this` of a bound function.",
    sources: ["jsinfo-bind"],
  },
  {
    question: "What does this code print after a second?",
    code: `const timer = {
  seconds: 10,
  start() {
    setTimeout(function () { console.log(this.seconds); }, 1000);
  },
};
timer.start();`,
    options: [
      "`undefined`: a regular callback function has its own `this`",
      "`10`: the callback gets `this` from the `start` method",
      "`ReferenceError`: `this` is unavailable inside a timer",
    ],
    answer: 0,
    explanation:
      "The timer calls the callback without a context, so `this` isn't `timer`. An arrow function `() => console.log(this.seconds)` would take `this` from `start` and print 10. This is the classic case where arrows are useful.",
    sources: ["jsinfo-arrow-functions", "mdn-this"],
  },
  {
    question: "What does this code print?",
    code: `const obj = {
  name: "Ann",
  hi: () => this.name,
};
console.log(obj.hi());`,
    options: [
      "`undefined`: the arrow takes `this` from the outer scope, not the object",
      "`\"Ann\"`: an arrow method is always bound to its object",
      "`SyntaxError`: arrows can't be declared in object literals",
    ],
    answer: 0,
    explanation:
      "An object literal doesn't create its own scope for `this`. The arrow takes `this` from the module or global scope. That's why object methods are declared with the regular `hi() {}` syntax.",
    sources: ["jsinfo-arrow-functions", "mdn-this"],
  },
  {
    question: "How does the engine look up a property the object itself doesn't have?",
    options: [
      "It walks up the prototype chain until it finds the property or reaches `null`",
      "It immediately returns `undefined` without looking into any other objects",
      "It looks for a variable with that name in the outer scopes",
    ],
    answer: 0,
    explanation:
      "Every object has a hidden `[[Prototype]]` link (`Object.getPrototypeOf`). That's how arrays get `map` from `Array.prototype` and all objects get `toString` from `Object.prototype`. Scope lookup applies to variables, not properties.",
    sources: ["jsinfo-prototype", "mdn-prototype-chain"],
  },
  {
    question: "What does `Object.create(proto)` do?",
    options: [
      "Creates a new empty object whose prototype is `proto`",
      "Creates a deep copy of the `proto` object with all its properties",
      "Creates an instance of the `proto` class by calling its constructor",
    ],
    answer: 0,
    explanation:
      "The properties of `proto` aren't copied — they're accessible through the prototype chain. `Object.create(null)` creates an object with no prototype at all: a handy \"clean\" dictionary without inherited keys like `toString`.",
    sources: ["jsinfo-prototype", "mdn-prototype-chain"],
  },
  {
    question: "What are classes in JavaScript really?",
    options: [
      "Syntax on top of prototypal inheritance with a few extra checks",
      "A separate inheritance model that fully replaced prototypes",
      "Compile-time-only structures, like TS interfaces",
    ],
    answer: 0,
    explanation:
      "Class methods go into `Class.prototype`, and `extends` builds the prototype chain. But there are differences from constructor functions: a class can't be called without `new`, its body runs in strict mode, methods are non-enumerable, and there are private `#x` fields and `static`.",
    sources: ["jsinfo-class", "mdn-classes"],
  },
  {
    question: "Why must a subclass constructor call `super()` before accessing `this`?",
    options: [
      "The parent constructor creates the object; before `super()`, `this` doesn't exist yet",
      "Without `super()`, the parent's methods won't be copied to the child class",
      "It's a linter convention; the language itself doesn't require this order",
    ],
    answer: 0,
    explanation:
      "In a derived class, the instance is created by the parent constructor, so accessing `this` before `super()` throws a `ReferenceError`. The parent's methods aren't copied — they're available through the prototype.",
    sources: ["jsinfo-class", "mdn-classes"],
  },
  {
    question: "How does `#count` differ from `_count` in a class?",
    options: [
      "`#count` is a truly private field: there's no access to it from outside",
      "`_count` is private by the standard, while `#count` is just a convention",
      "No difference: both are equally accessible from outside the class",
    ],
    answer: 0,
    explanation:
      "An underscore is a convention; the property is still accessible. Private `#` fields are enforced by the engine: accessing `obj.#count` from outside is a syntax error. You can check for presence with `#count in obj`.",
    sources: ["mdn-private-fields", "jsinfo-private"],
  },
  {
    question: "How does `obj instanceof Class` work?",
    options: [
      "It checks whether `Class.prototype` is in the prototype chain of `obj`",
      "It compares the object's constructor name with the string `Class`",
      "It checks that the object has all of the class's methods",
    ],
    answer: 0,
    explanation:
      "That's why `instanceof` can give surprising results when prototypes are swapped or for objects from another iframe (they have a different `Array.prototype`). For arrays, `Array.isArray` is more reliable.",
    sources: ["jsinfo-prototype", "mdn-prototype-chain"],
  },
  {
    question: "What does this code print?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ["`3 3 3`", "`0 1 2`", "`undefined` three times"],
    answer: 0,
    explanation:
      "`var` creates one variable for the whole function, and by the time the timers fire, the loop has finished with `i = 3`. With `let`, each iteration gets a new binding and the output is `0 1 2`.",
    sources: ["jsinfo-closure", "jsinfo-var"],
  },
  {
    question: "What was an IIFE `(function () { ... })()` used for in the past?",
    options: [
      "To create an isolated scope and avoid polluting the global one",
      "To speed up the function through early compilation",
      "To run the function asynchronously after the page loads",
    ],
    answer: 0,
    explanation:
      "Before `let`/`const` and modules, a function was the only way to hide variables. An IIFE created a private scope (the \"module\" pattern). Today ES modules and blocks solve this, and IIFEs are sometimes used for top-level async code.",
    sources: ["jsinfo-closure", "mdn-modules"],
  },
  {
    question: "What is currying?",
    code: `const add = a => b => a + b;
add(2)(3); // 5`,
    options: [
      "Turning a function of many arguments into a chain of single-argument functions",
      "Calling a function with a delay until the next event loop tick",
      "Combining several functions into one that runs them in parallel",
    ],
    answer: 0,
    explanation:
      "Currying relies on closures: each function remembers the argument passed to it. It lets you create specialized functions (`const add10 = add(10)`). Partial application (`bind` with arguments) is a close but not identical idea.",
    sources: ["jsinfo-currying", "jsinfo-closure"],
  },
  {
    question: "How does debounce differ from throttle?",
    options: [
      "Debounce waits for a pause in events, throttle calls at most once per period",
      "Throttle waits for a pause in events, while debounce calls at most once per period",
      "They're synonyms that differ only by name in different libraries",
    ],
    answer: 0,
    explanation:
      "Debounce suits search-as-you-type: the request goes out when the user stops typing. Throttle suits `scroll` and `resize`: the handler runs regularly but at a limited rate. Both are implemented via a closure with a timer.",
    sources: ["jsinfo-call-apply", "jsinfo-settimeout"],
  },
  {
    question: "What is memoization?",
    options: [
      "Caching a function's results by arguments to avoid recomputing them",
      "Freeing memory from unused objects by the garbage collector",
      "Saving application state in `localStorage` between sessions",
    ],
    answer: 0,
    explanation:
      "A memoized function keeps an \"arguments → result\" `Map` in a closure. It works for pure functions. Downsides are memory growth and the difficulty of keys for objects (`WeakMap` is often used).",
    sources: ["jsinfo-call-apply", "jsinfo-map-set"],
  },
  {
    question: "How does `Promise.all` behave if one of the promises rejects?",
    options: [
      "It rejects immediately with that error; the other results are lost",
      "It waits for all promises and returns an array of results and errors",
      "It ignores the error and returns only the successful results",
    ],
    answer: 0,
    explanation:
      "`Promise.all` is \"all or nothing\". The other operations aren't cancelled; their results are just no longer needed. If all outcomes matter, use `Promise.allSettled`; for the first success, `Promise.any`; for the first settled, `Promise.race`.",
    sources: ["jsinfo-promise-api", "mdn-promise-all"],
  },
  {
    question: "What does `Promise.allSettled` return?",
    options: [
      "An array of `{ status, value | reason }` objects, one per promise",
      "Only the values of successful promises; errors are discarded",
      "The result of the first settled promise, successful or not",
    ],
    answer: 0,
    explanation:
      "`allSettled` never rejects: it waits for all promises and describes each outcome (`'fulfilled'` or `'rejected'`). Handy when you need to run independent requests and show a partial result.",
    sources: ["mdn-promise-allsettled", "jsinfo-promise-api"],
  },
  {
    question: "How does `Promise.any` differ from `Promise.race`?",
    options: [
      "`any` waits for the first success, `race` for the first settled with any outcome",
      "`race` waits for the first success, while `any` waits for the first settled with any outcome",
      "They're synonyms; `any` is the newer name of `race`",
    ],
    answer: 0,
    explanation:
      "`Promise.any` rejects only if all of them reject, with an `AggregateError`. `Promise.race` adopts the outcome of the fastest — that's how timeouts are done: `Promise.race([fetch(url), timeout(5000)])`.",
    sources: ["mdn-promise-any", "mdn-promise-race"],
  },
  {
    question: "How long will this code take if each request lasts 1 second?",
    code: `for (const id of [1, 2, 3]) {
  await fetchUser(id);
}`,
    options: [
      "~3 seconds: the requests run sequentially",
      "~1 second: `for...of` runs them in parallel",
      "Instantly: `await` inside a loop is ignored",
    ],
    answer: 0,
    explanation:
      "Each `await` waits for completion before the next iteration. If the requests are independent, run them in parallel: `await Promise.all(ids.map(fetchUser))` — about 1 second. Sequential order is needed when the next step depends on the previous one.",
    sources: ["jsinfo-async-await", "mdn-promise-all"],
  },
  {
    question: "Why doesn't `forEach` wait for async callbacks?",
    code: `items.forEach(async (item) => { await save(item); });
console.log("done");`,
    options: [
      "`forEach` ignores the returned promises — \"done\" is printed immediately",
      "`forEach` waits for all promises and then prints \"done\"",
      "The code crashes: `forEach` doesn't accept async functions",
    ],
    answer: 0,
    explanation:
      "The callback returns a promise, but `forEach` doesn't use it. You need `for...of` with `await` (sequential) or `await Promise.all(items.map(save))` (parallel).",
    sources: ["jsinfo-async-await", "jsinfo-array-methods"],
  },
  {
    question: "What does the chain print?",
    code: `Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { throw new Error(String(x)); })
  .catch(e => e.message)
  .then(x => console.log(x));`,
    options: ["`2`", "`1`", "Nothing: the chain stops at `catch`"],
    answer: 0,
    explanation:
      "The value returned from `then` is passed along. An error skips `then` handlers until the nearest `catch`, and `catch` returns a normal value (`'2'`), after which the chain continues as fulfilled.",
    sources: ["jsinfo-promise-chaining"],
  },
  {
    question: "What does a promise's `.finally()` do?",
    options: [
      "Runs on any outcome and doesn't change the chain's result",
      "Runs only on success and replaces the promise's value",
      "Cancels the promise if it's still in the `pending` state",
    ],
    answer: 0,
    explanation:
      "`finally` receives no arguments and passes the value or error through unchanged — handy for hiding a loading indicator. Exception: if the callback itself throws or returns a rejected promise, the chain rejects.",
    sources: ["jsinfo-promise-chaining", "mdn-promise"],
  },
  {
    question: "In what order are the lines printed?",
    code: `async function f() {
  console.log("A");
  await null;
  console.log("B");
}
f();
console.log("C");`,
    options: ["`A C B`", "`A B C`", "`C A B`"],
    answer: 0,
    explanation:
      "An async function's body runs synchronously until the first `await`. The rest continues as a microtask after the current synchronous code finishes. So first `A`, then `C`, then `B`.",
    sources: ["jsinfo-async-await", "jsinfo-microtask"],
  },
  {
    question: "Why is a recursive `setTimeout` sometimes preferable to `setInterval`?",
    options: [
      "It guarantees a pause between the end of one run and the start of the next",
      "It runs in a separate thread and doesn't block the UI",
      "It doesn't depend on the event loop and always fires exactly on time",
    ],
    answer: 0,
    explanation:
      "`setInterval` schedules runs on a fixed timetable: if a task (like a request) takes longer than the interval, calls overlap. A recursive `setTimeout` schedules the next run after the current one finishes and lets you vary the delay. Both timers are imprecise and depend on thread load.",
    sources: ["jsinfo-settimeout"],
  },
  {
    question: "What is `requestAnimationFrame` for?",
    options: [
      "To run code before the next repaint — for smooth animations",
      "To request the next video frame from the server for a player",
      "To run code in a Web Worker without blocking the page",
    ],
    answer: 0,
    explanation:
      "The callback is synced with the screen refresh rate and isn't called in background tabs, saving resources. Animation via `setTimeout(fn, 16)` can drift out of sync with frames and stutter.",
    sources: ["mdn-raf"],
  },
  {
    question: "What does a generator function do?",
    code: `function* ids() {
  let id = 1;
  while (true) yield id++;
}
const gen = ids();
gen.next().value; // 1`,
    options: [
      "Returns an iterator and runs in steps, pausing at `yield`",
      "Runs asynchronously in a separate thread and returns a promise",
      "Generates new function code while the program is running",
    ],
    answer: 0,
    explanation:
      "Calling a generator doesn't run its body; it returns an object with a `next()` method. Each `next()` continues until the next `yield`. Generators are handy for lazy and infinite sequences and for implementing iterators.",
    sources: ["jsinfo-generators", "mdn-generator"],
  },
  {
    question: "What does your own object need to work with `for...of` and spread?",
    options: [
      "Implement a `[Symbol.iterator]()` method that returns an iterator",
      "Add a `length` property and numeric keys, like an array",
      "Inherit the object from `Array.prototype` via `Object.create`",
    ],
    answer: 0,
    explanation:
      "The iteration protocol: `[Symbol.iterator]` returns an object with `next()` that yields `{ value, done }`. The easiest implementation is a generator. Objects with `length` are array-likes: they don't work with `for...of` and are converted with `Array.from`.",
    sources: ["jsinfo-iterable", "mdn-iteration-protocols"],
  },
  {
    question: "What is `Symbol` used for?",
    options: [
      "For unique property keys that don't clash with others",
      "For storing short strings while saving engine memory",
      "For declaring constants that can't be reassigned",
    ],
    answer: 0,
    explanation:
      "`Symbol('id')` is always unique, and symbol keys don't show up in `for...in` or `Object.keys`. Built-in \"well-known\" symbols customize object behavior: `Symbol.iterator`, `Symbol.toPrimitive`, `Symbol.asyncIterator`.",
    sources: ["jsinfo-symbol", "mdn-symbol"],
  },
  {
    question: "How does `WeakMap` differ from `Map`?",
    options: [
      "Keys are only objects and don't prevent garbage collection; it can't be iterated",
      "`WeakMap` is faster but holds at most 1000 entries at once",
      "`WeakMap` automatically deletes entries after a set time",
    ],
    answer: 0,
    explanation:
      "If there are no other references to a key object, the entry disappears with it. That's why `WeakMap` has no `size` or iteration. Uses: private data for objects, a metadata cache for DOM nodes without memory leaks.",
    sources: ["jsinfo-weakmap", "mdn-weakmap"],
  },
  {
    question: "Why is `structuredClone(obj)` better than `JSON.parse(JSON.stringify(obj))`?",
    options: [
      "It keeps `Date`, `Map`, `Set`, circular references and doesn't lose `undefined`",
      "It also copies functions and class methods along with the prototype",
      "It works only with primitives but is dozens of times faster",
    ],
    answer: 0,
    explanation:
      "The JSON trick turns `Date` into a string, loses `undefined`, `Map`, `Set`, `Infinity` and fails on cycles. `structuredClone` supports more types but doesn't copy functions, DOM nodes or class prototypes — such objects throw or lose their methods.",
    sources: ["mdn-structured-clone", "jsinfo-json"],
  },
  {
    question: "What does this code print?",
    code: `const cfg = Object.freeze({ db: { host: "a" } });
cfg.db.host = "b";
console.log(cfg.db.host);`,
    options: [
      "`\"b\"`: `freeze` is shallow; the nested object isn't frozen",
      "`\"a\"`: `freeze` freezes the object all the way down",
      "`TypeError`: properties of a frozen object can't be changed",
    ],
    answer: 0,
    explanation:
      "`Object.freeze` prevents adding, removing and changing properties of the object itself only. Nested objects remain mutable. Deep freezing is done with a recursive function.",
    sources: ["mdn-object-freeze", "jsinfo-property-descriptors"],
  },
  {
    question: "What does `Object.defineProperty(obj, 'id', { value: 1, writable: false })` give you?",
    options: [
      "The property can't be overwritten; by default it's also non-enumerable",
      "The property can't be read from outside; it becomes private",
      "The property is removed once the object is no longer used",
    ],
    answer: 0,
    explanation:
      "Every property has `writable`, `enumerable` and `configurable` flags. With `defineProperty`, unspecified flags default to `false`, so the property won't appear in `Object.keys` and can't be deleted. Getters and setters are defined this way too.",
    sources: ["jsinfo-property-descriptors"],
  },
  {
    question: "What does `[10, 1, 2].sort()` return?",
    options: ["`[1, 10, 2]`", "`[1, 2, 10]`", "`[10, 2, 1]`"],
    answer: 0,
    explanation:
      "Without a compare function, `sort` compares elements as strings, and `'10' < '2'`. For numbers you need `sort((a, b) => a - b)`. Also, `sort` mutates the array; the non-mutating version is `toSorted()`.",
    sources: ["mdn-array-sort", "mdn-array-tosorted"],
  },
  {
    question: "What do `parseInt('12px')` and `Number('12px')` return?",
    options: ["`12` and `NaN`", "`NaN` and `12`", "`12` and `12`"],
    answer: 0,
    explanation:
      "`parseInt` reads a number from the start of the string while it sees digits, while `Number` requires the whole string to be a number. Specify the radix: `parseInt(str, 10)`. For decimals, use `parseFloat`.",
    sources: ["jsinfo-number", "jsinfo-type-conversions"],
  },
  {
    question: "How do ES modules differ from CommonJS?",
    options: [
      "Imports are static and analyzed ahead of time; exports are \"live\" bindings",
      "ES modules work only in Node.js, while CommonJS works only in the browser",
      "CommonJS supports tree-shaking, while ES modules don't",
    ],
    answer: 0,
    explanation:
      "`import`/`export` are known before execution, which lets bundlers remove unused code (tree-shaking). An imported value reflects the export's current value. `require` runs at runtime and copies `module.exports`. ESM is always in strict mode and supports top-level `await`.",
    sources: ["jsinfo-modules", "mdn-modules"],
  },
  {
    question: "Why do you need dynamic `import()`?",
    options: [
      "To load a module on demand and split it into a separate chunk",
      "To import a module synchronously inside conditions and loops",
      "To re-import the module from scratch on every call",
    ],
    answer: 0,
    explanation:
      "`const { Chart } = await import('./chart.js')` returns a promise of the module. Bundlers create a separate file that loads only when needed — the basis of code splitting and `React.lazy`. The module is cached and runs once.",
    sources: ["mdn-dynamic-import", "jsinfo-modules"],
  },
  {
    question: "Will `fetch` reject the promise on a 404 response?",
    options: [
      "No: you have to check the status yourself via `res.ok`",
      "Yes: any 4xx or 5xx status rejects the promise with an error object",
      "Yes, but only for 5xx; 4xx responses are considered successful",
    ],
    answer: 0,
    explanation:
      "An HTTP error response is still a response. You need an explicit check: `if (!res.ok) throw new Error(res.status)`. The promise rejects on network failure, CORS blocking or cancellation via `AbortController`.",
    sources: ["mdn-fetch", "jsinfo-fetch"],
  },
  {
    question: "How do you cancel a `fetch` request?",
    options: [
      "Pass a `signal` from an `AbortController` and call `controller.abort()`",
      "Call the `cancel()` method on the promise returned by `fetch`",
      "Set the promise to `null` — the garbage collector stops the request",
    ],
    answer: 0,
    explanation:
      "After `abort()`, the promise rejects with an `AbortError`. The same signal can be passed to several requests and to `addEventListener`. For a timeout there's `AbortSignal.timeout(5000)`. Promises have no `cancel` method.",
    sources: ["mdn-abort-controller", "jsinfo-fetch"],
  },
  {
    question: "What is CORS?",
    options: [
      "A mechanism by which a server allows the browser to make requests from another origin",
      "Server protection against DDoS attacks that the browser enables automatically",
      "A data encryption format between the browser and the server",
    ],
    answer: 0,
    explanation:
      "Under the same-origin policy, the browser doesn't let a script read responses from another domain unless the server sends `Access-Control-Allow-Origin`. For \"non-simple\" requests, a preflight `OPTIONS` is sent first. It's a browser restriction: curl or a server don't apply it.",
    sources: ["mdn-cors"],
  },
  {
    question: "Why is a cookie with the `HttpOnly` flag safer than a regular one?",
    options: [
      "It can't be read from JavaScript, so XSS can't steal its value",
      "It's sent only over HTTP and never over HTTPS",
      "The browser automatically encrypts it before storing",
    ],
    answer: 0,
    explanation:
      "`HttpOnly` blocks access via `document.cookie`. Session cookies also get `Secure` (HTTPS only) and `SameSite` (CSRF protection). That's why session tokens are safer in such cookies than in `localStorage`.",
    sources: ["mdn-cookies", "jsinfo-cookie"],
  },
  {
    question: "How does `stopPropagation` differ from `stopImmediatePropagation`?",
    options: [
      "The second also prevents other handlers on the same element from running",
      "The first stops both bubbling and the browser's default action",
      "They're synonyms; the second is kept for old browser compatibility",
    ],
    answer: 0,
    explanation:
      "`stopPropagation` stops propagation to other elements, but the remaining handlers on the current element still run. `stopImmediatePropagation` stops them too. Only `preventDefault` cancels the default action. Don't overuse stopping propagation — it breaks delegation.",
    sources: ["jsinfo-bubbling", "mdn-add-event-listener"],
  },
  {
    question: "What does the `{ passive: true }` option in `addEventListener('touchmove', ...)` do?",
    options: [
      "Promises not to call `preventDefault`, so scrolling doesn't wait for the handler",
      "The handler runs once and is then removed automatically",
      "The handler fires in the capturing phase instead of bubbling",
    ],
    answer: 0,
    explanation:
      "The browser doesn't know in advance whether a handler will cancel scrolling, so it waits for it to run. A passive handler lets scrolling start immediately — noticeably smoother on mobile. For a one-time handler there's `once`; for the capturing phase, `capture`.",
    sources: ["mdn-add-event-listener"],
  },
  {
    question: "How do you efficiently insert 1000 elements into the DOM?",
    options: [
      "Collect them in a `DocumentFragment` (or one array) and insert in a single operation",
      "Insert them one by one with `appendChild` — the browser will batch them itself",
      "Rebuild the whole list via `innerHTML +=` in a loop each time",
    ],
    answer: 0,
    explanation:
      "Each insertion into the live DOM can trigger style and layout recalculation. A fragment is built outside the document and inserted at once; `el.append(...nodes)` works the same way. `innerHTML +=` in a loop reparses all the markup each time and loses handlers.",
    sources: ["mdn-document-fragment", "jsinfo-modifying-document"],
  },
  {
    question: "What's the most convenient way to detect that an element entered the viewport?",
    options: [
      "With `IntersectionObserver`",
      "With `getBoundingClientRect()` in a `scroll` handler on every pixel",
      "With a `MutationObserver` watching the element's attributes",
    ],
    answer: 0,
    explanation:
      "`IntersectionObserver` asynchronously reports when an element intersects the viewport, without loading the main thread on every scroll. Uses: lazy loading, infinite feeds, impression analytics. `MutationObserver` tracks DOM changes, not visibility.",
    sources: ["mdn-intersection-observer"],
  },
  {
    question: "What's the right way to create a custom error class?",
    code: `class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}`,
    options: [
      "Extend `Error`, call `super(message)` and set `name`",
      "Create a plain `{ message }` object — `throw` accepts any object",
      "Extend `String` so the message is displayed correctly",
    ],
    answer: 0,
    explanation:
      "Extending `Error` gives you a stack trace, correct `instanceof` behavior and console output. You can throw anything, but a plain object has no stack. For chaining causes there's `new Error('msg', { cause: err })`.",
    sources: ["jsinfo-try-catch", "mdn-error-cause"],
  },
  {
    question: "What does `Object.fromEntries(Object.entries({ a: 1, b: 2 }).map(([k, v]) => [k, v * 10]))` return?",
    options: ["`{ a: 10, b: 20 }`", "`[['a', 10], ['b', 20]]`", "`{ 0: ['a', 10], 1: ['b', 20] }`"],
    answer: 0,
    explanation:
      "`Object.entries` turns an object into an array of pairs that array methods work with, and `Object.fromEntries` collects pairs back into an object. This is the standard way to \"map over an object\". For grouping there's `Object.groupBy`.",
    sources: ["jsinfo-object", "mdn-object-groupby"],
  },
  {
    question: "How does a `getter` differ from a regular property?",
    code: `const user = {
  first: "Ann", last: "Lee",
  get full() { return this.first + " " + this.last; },
};`,
    options: [
      "The value is computed on every `user.full` access, without call parentheses",
      "The value is computed once when the object is created and then cached",
      "A getter can only be called as a method: `user.full()`",
    ],
    answer: 0,
    explanation:
      "A getter looks like a property but runs a function. Without a setter, assigning `user.full = ...` is ignored (an error in strict mode). Getters are used for computed fields and for validation via a getter/setter pair.",
    sources: ["jsinfo-property-descriptors", "jsinfo-class"],
  },
  {
    question: "What does `Array.from({ length: 3 }, (_, i) => i * 2)` return?",
    options: ["`[0, 2, 4]`", "`[undefined, undefined, undefined]`", "`[]`"],
    answer: 0,
    explanation:
      "`Array.from` creates an array from an iterable or array-like object (`{ length: 3 }`), and the second argument is a mapping function. It's a handy way to generate ranges. `new Array(3)` creates an array with \"holes\" that `map` skips.",
    sources: ["jsinfo-array-methods", "jsinfo-iterable"],
  },
  {
    question: "What does `{} === {}` return?",
    options: ["`false`", "`true`", "`TypeError`"],
    answer: 0,
    explanation:
      "Objects are compared by reference: two literals are two different objects. Comparing contents needs your own deep-equal function or a library. This matters for `useEffect` dependencies and memoization in React.",
    sources: ["mdn-equality", "jsinfo-object-copy"],
  },
];

export default questions;
