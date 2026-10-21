import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "How does the event loop process tasks in the browser?",
    options: [
      "One macrotask, then the whole microtask queue, then a possible render",
      "All macrotasks in a row, then one microtask, then a mandatory render",
      "Micro- and macrotasks strictly alternate one after another",
    ],
    answer: 0,
    explanation:
      "After each macrotask (script, event, timer), the microtask queue is drained completely, including microtasks added along the way. Then the browser may update rendering (calling `requestAnimationFrame`) if it's time for a frame. That's why a long chain of microtasks also blocks rendering.",
    sources: ["jsinfo-event-loop", "mdn-event-loop", "mdn-async-intro"],
  },
  {
    question: "What happens to the page?",
    code: `function loop() {
  Promise.resolve().then(loop);
}
loop();`,
    options: [
      "The page freezes: microtasks are added endlessly and rendering never happens",
      "Nothing bad: the browser manages to paint frames between microtasks",
      "`RangeError: Maximum call stack size exceeded` because of recursion",
    ],
    answer: 0,
    explanation:
      "The stack doesn't grow (each call is a separate microtask), so there's no overflow. But the microtask queue never empties, and the event loop never moves on to rendering or events. With `setTimeout(loop)` the page would stay responsive.",
    sources: ["jsinfo-microtask", "mdn-microtasks"],
  },
  {
    question: "Does the `new Promise(executor)` executor function run synchronously?",
    code: `new Promise(() => console.log("A"));
console.log("B");`,
    options: [
      "Yes: `A` is printed, then `B`",
      "No: `B` is printed, then `A`",
      "No: `A` isn't printed until `resolve` is called",
    ],
    answer: 0,
    explanation:
      "The executor is called right away in the constructor. Only `then/catch/finally` callbacks are asynchronous — they always run as microtasks, even if the promise is already settled. This guarantees a predictable code order.",
    sources: ["jsinfo-promise", "mdn-promise"],
  },
  {
    question: "Why will the promise below never reject?",
    code: `new Promise((resolve, reject) => {
  setTimeout(() => { throw new Error("boom"); }, 0);
});`,
    options: [
      "The exception in the timer is thrown outside the executor and isn't tied to the promise",
      "`setTimeout` inside a promise automatically swallows any exceptions",
      "The promise will reject, but only after `.catch()` is called explicitly",
    ],
    answer: 0,
    explanation:
      "Only synchronous exceptions in the executor automatically become rejections. An error in a timer callback happens later, in a separate task: it becomes a global unhandled error, and the promise stays `pending` forever. You need to call `reject` explicitly.",
    sources: ["jsinfo-promise", "jsinfo-try-catch"],
  },
  {
    question: "How do you globally track unhandled promise rejections in the browser?",
    options: [
      "The `unhandledrejection` event on `window`",
      "The `error` event on `document` with a `promise` flag",
      "The `Promise.onError` method at the start of the app",
    ],
    answer: 0,
    explanation:
      "`window.addEventListener('unhandledrejection', e => report(e.reason))` is the standard way to send such errors to monitoring. Synchronous unhandled errors are caught by the `error` event on `window`. There's no `Promise.onError` method.",
    sources: ["jsinfo-try-catch", "mdn-promise"],
  },
  {
    question: "What does `for await...of` do?",
    options: [
      "Iterates over an async iterable, awaiting each value",
      "Runs all loop iterations in parallel and waits for them to finish",
      "Repeats the loop until the promise becomes `fulfilled`",
    ],
    answer: 0,
    explanation:
      "It works with objects that have `Symbol.asyncIterator`: async generators, streams (`ReadableStream`), API pagination. Iterations run sequentially. To process an array of promises in parallel, use `Promise.all`.",
    sources: ["mdn-for-await", "jsinfo-generators"],
  },
  {
    question: "What is an async generator handy for?",
    code: `async function* pages(url) {
  while (url) {
    const res = await fetch(url).then(r => r.json());
    yield res.items;
    url = res.next;
  }
}`,
    options: [
      "For lazily yielding data in chunks that arrive asynchronously",
      "For running requests in parallel in separate threads",
      "For synchronously waiting for a response without blocking the event loop",
    ],
    answer: 0,
    explanation:
      "The consumer writes `for await (const items of pages(url))` and decides when to stop — the next page isn't requested until it's needed. Leaving the loop with `break` calls the generator's `return()` and finishes it.",
    sources: ["jsinfo-generators", "mdn-for-await"],
  },
  {
    question: "What is `Proxy` used for?",
    options: [
      "To intercept operations on an object: reads, writes, deletions",
      "To route HTTP requests through an intermediate server",
      "To create immutable deep copies of objects",
    ],
    answer: 0,
    explanation:
      "Traps such as `get`, `set`, `has` and `deleteProperty` let you implement reactivity (that's how Vue 3 works), validation, logging and default values. `Reflect` provides the default behavior of operations for use inside traps.",
    sources: ["jsinfo-proxy", "mdn-proxy"],
  },
  {
    question: "What conditions guarantee that the garbage collector will remove an object?",
    options: [
      "The object is unreachable from the roots (globals, the stack, closures)",
      "Its reference count dropped to zero after assigning `null`",
      "More than 60 seconds have passed since the object was last accessed",
    ],
    answer: 0,
    explanation:
      "Modern engines use mark-and-sweep: everything reachable from the roots is alive. Circular references between unreachable objects don't prevent their removal — unlike reference counting. The timing of collection is unspecified.",
    sources: ["jsinfo-garbage-collection", "mdn-memory"],
  },
  {
    question: "Which scenario typically causes a memory leak in an SPA?",
    options: [
      "Handlers on `window` and timers that aren't removed when leaving the page",
      "Using `const` instead of `let` for large arrays in functions",
      "Frequently creating short-lived objects inside loops",
    ],
    answer: 0,
    explanation:
      "A subscription holds a closure, and through it the component's data and DOM nodes. Other sources: detached DOM nodes referenced from JS, growing global caches, forgotten `setInterval`s. Short-lived objects are efficiently collected by the GC's young generation. Leaks are found with Memory snapshots in DevTools.",
    sources: ["mdn-memory", "jsinfo-garbage-collection"],
  },
  {
    question: "Why are you advised to be careful with `WeakRef` and `FinalizationRegistry`?",
    options: [
      "Garbage collection timing is unpredictable — logic shouldn't depend on it",
      "They work only in Node.js and aren't available in browser engines",
      "They slow down access to all objects in the app dozens of times",
    ],
    answer: 0,
    explanation:
      "An object behind a `WeakRef` can disappear at any moment or live longer than expected, and a finalization callback may never be called. They're appropriate for caches and as a safety net, but not for mandatory resource cleanup.",
    sources: ["mdn-weakref", "mdn-memory"],
  },
  {
    question: "What doesn't code inside a Web Worker have?",
    options: [
      "Access to the DOM; it talks to the main thread via `postMessage`",
      "Access to `fetch` and timers — only computations are allowed",
      "The ability to import modules — a worker is always one file",
    ],
    answer: 0,
    explanation:
      "A worker runs in a separate thread, so heavy computations don't block the UI. `fetch`, timers, IndexedDB and modules (`type: 'module'`) are available. Data is passed by copying (structured clone) or by transferring ownership (`Transferable`, e.g. `ArrayBuffer`).",
    sources: ["mdn-web-workers"],
  },
  {
    question: "Why pass an `ArrayBuffer` to a worker as transferable: `postMessage(buf, [buf])`?",
    options: [
      "Ownership is transferred without copying; the buffer becomes empty in the source thread",
      "The buffer becomes shared, and both threads see each other's changes",
      "The buffer is compressed before sending, which reduces memory use",
    ],
    answer: 0,
    explanation:
      "Copying large data is expensive. A transfer hands over the memory instantly, and the sender's `byteLength` becomes 0. True shared memory is `SharedArrayBuffer` with `Atomics`, but it requires cross-origin isolation (COOP/COEP headers).",
    sources: ["mdn-web-workers", "mdn-structured-clone"],
  },
  {
    question: "What can a Service Worker do?",
    options: [
      "Intercept the page's network requests and respond from cache, working offline",
      "Run the page's JavaScript faster by compiling it to WebAssembly",
      "Access the DOM of all open tabs of the same site",
    ],
    answer: 0,
    explanation:
      "A Service Worker is a proxy between the page and the network with its own lifecycle (`install`, `activate`, `fetch`). PWAs are built on it: caching strategies (cache-first, network-first, stale-while-revalidate), push notifications, background sync. It works only over HTTPS and can't see the DOM.",
    sources: ["mdn-service-worker"],
  },
  {
    question: "How do Server-Sent Events differ from WebSocket?",
    options: [
      "SSE is a one-way stream from the server over HTTP, WebSocket a two-way channel",
      "SSE is a two-way channel, while WebSocket only sends data from the server",
      "SSE works only in Node.js, WebSocket only in the browser",
    ],
    answer: 0,
    explanation:
      "SSE (`EventSource`) is simpler: plain HTTP, automatic reconnection, text events — enough for notifications and streaming responses. WebSocket is needed for frequent two-way exchange (chats, games, collaborative editing) and supports binary data.",
    sources: ["mdn-sse", "mdn-websockets"],
  },
  {
    question: "What must you check in a `message` handler when talking to an iframe via `postMessage`?",
    options: [
      "`event.origin` — that the message came from the expected domain",
      "`event.timeStamp` — that the message is no older than one second",
      "Nothing: the browser delivers messages only from your domain",
    ],
    answer: 0,
    explanation:
      "`postMessage` works across origins, and any window can send a message. Without checking `origin`, an attacker can send forged commands. When sending, specify a concrete `targetOrigin` instead of `'*'`. Between tabs of the same site, `BroadcastChannel` is handy.",
    sources: ["mdn-post-message", "mdn-broadcast-channel"],
  },
  {
    question: "How do you implement the observer pattern with browser APIs, without libraries?",
    options: [
      "With `EventTarget` and `CustomEvent`: `dispatchEvent` and `addEventListener`",
      "With a `MutationObserver` subscribed to changes of a JS object",
      "With `Object.observe`, built into modern browsers",
    ],
    answer: 0,
    explanation:
      "You can extend a class from `EventTarget` and dispatch `new CustomEvent('change', { detail })`. Other built-in observers: `MutationObserver` (DOM changes), `IntersectionObserver`, `ResizeObserver`. `Object.observe` was removed from the standard.",
    sources: ["mdn-custom-events", "patterns-dev-js"],
  },
  {
    question: "Why is `ResizeObserver` better than a `window.resize` handler for a component?",
    options: [
      "It reports size changes of a specific element for any reason",
      "It fires more often and more precisely, on every pixel of window change",
      "It lets you resize an element without recalculating layout",
    ],
    answer: 0,
    explanation:
      "An element can change size without the window changing: a sidebar opened, content loaded. `ResizeObserver` tracks the element itself and is called in the rendering cycle, without polling `getBoundingClientRect`. Useful for charts and virtualized lists.",
    sources: ["mdn-resize-observer"],
  },
  {
    question: "What does a tagged template do?",
    code: "const q = sql`SELECT * FROM users WHERE id = ${id}`;",
    options: [
      "Calls the `sql` function with an array of string parts and the substituted values",
      "Compiles the string into a ready SQL query at build time",
      "Escapes all characters of the string for safe insertion into HTML",
    ],
    answer: 0,
    explanation:
      "The tag function receives `strings` and the values separately, so it can safely escape substitutions or pass them as query parameters — protection against injections. That's how styled-components, `graphql` tags and `String.raw` work.",
    sources: ["mdn-tagged-templates"],
  },
  {
    question: "In what order will `Object.keys` return the keys of `{ b: 1, 2: 1, a: 1, 1: 1 }`?",
    options: ["`['1', '2', 'b', 'a']`", "`['b', '2', 'a', '1']`", "`['a', 'b', '1', '2']`"],
    answer: 0,
    explanation:
      "Integer keys come first in ascending order, then string keys in insertion order, then symbols (which `Object.keys` doesn't return). If order matters for numeric keys, use a `Map`.",
    sources: ["jsinfo-object", "jsinfo-map-set"],
  },
  {
    question: "How do you deep-freeze an object?",
    code: `function deepFreeze(obj) {
  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") deepFreeze(value);
  }
  return Object.freeze(obj);
}`,
    options: [
      "Recursively freeze nested objects and then the object itself",
      "Call `Object.freeze(obj, { deep: true })`",
      "Use `Object.seal`, which works all the way down",
    ],
    answer: 0,
    explanation:
      "`Object.freeze` is shallow, and `Object.seal` only prevents adding and removing properties. Recursion walks the tree; for circular references, keep visited objects in a `WeakSet`. `freeze` has no `deep` option.",
    sources: ["mdn-object-freeze", "jsinfo-property-descriptors"],
  },
  {
    question: "How do you serialize an object with circular references to JSON?",
    options: [
      "Via a `replacer` in `JSON.stringify`, tracking visited objects in a `WeakSet`",
      "Plain `JSON.stringify` handles it: it replaces cycles with `null`",
      "Such an object can't be serialized in any way",
    ],
    answer: 0,
    explanation:
      "`JSON.stringify` throws `TypeError: Converting circular structure to JSON`. In a `replacer` you can skip already-seen objects or replace them with a marker reference (as libraries like flatted do). For copying within JS, `structuredClone` works — it supports cycles.",
    sources: ["jsinfo-json", "jsinfo-weakmap"],
  },
  {
    question: "How do you limit the number of concurrent requests when loading 100 URLs?",
    options: [
      "A pool: N \"workers\" take URLs from a shared queue until it's empty",
      "`Promise.all` itself limits concurrency to six requests",
      "Start the requests via `setTimeout` with a delay of 0",
    ],
    answer: 0,
    explanation:
      "`Promise.all` starts everything at once and has no limit (the browser's connection limit concerns the network, not memory or the server). A pool of N async functions pulling tasks from a queue keeps exactly N requests in flight. Ready-made implementations: `p-limit` and similar.",
    sources: ["mdn-promise-all", "jsinfo-async-await"],
  },
  {
    question: "What is exponential backoff when retrying requests?",
    options: [
      "Increasing the pause between attempts (1s, 2s, 4s…), often with random jitter",
      "Retrying the request at a fixed interval until the first success",
      "Sending several copies of the request to different servers at once",
    ],
    answer: 0,
    explanation:
      "A growing delay reduces load on an overloaded server, and jitter (a random addition) keeps all clients from retrying in sync. Only retry idempotent operations and transient errors (5xx, network), not 4xx.",
    sources: ["jsinfo-async-await", "jsinfo-settimeout"],
  },
  {
    question: "Why is it important to preserve `this` and arguments in a debounce implementation?",
    code: `function debounce(fn, ms) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), ms);
  };
}`,
    options: [
      "Otherwise the wrapped method loses the object's context and call parameters",
      "Otherwise the previous timer can't be cleared via `clearTimeout`",
      "Otherwise the function runs synchronously, without the `ms` delay",
    ],
    answer: 0,
    explanation:
      "The wrapper must be transparent: calling `obj.save(data)` through debounce has to reach `fn` with the same `this` and arguments. That's why a regular function is returned (it has its own `this`), and inside the timer an arrow preserves it.",
    sources: ["jsinfo-call-apply", "jsinfo-closure"],
  },
  {
    question: "Why can adding properties to objects in different orders slow code down in V8?",
    options: [
      "The objects get different hidden classes and optimize worse",
      "V8 sorts properties alphabetically on every object access",
      "Property order doesn't affect engine performance at all",
    ],
    answer: 0,
    explanation:
      "The engine optimizes property access by the object's \"shape\" (hidden class / shape). If objects of one type are created with different orders or sets of fields, the call site sees many shapes and loses the fast path. Initialize all fields in the constructor right away and don't remove them with `delete`.",
    sources: ["mdn-memory", "javascript-info-en"],
  },
  {
    question: "How do you avoid blocking the UI when processing 100,000 items on the main thread?",
    options: [
      "Split the work into chunks and yield the thread (or move it to a worker)",
      "Wrap the loop in an `async` function — it runs in a background thread",
      "Use `Promise.all` — promises run in parallel threads",
    ],
    answer: 0,
    explanation:
      "Tasks longer than 50 ms hurt responsiveness (INP). `async` doesn't create a new thread: a synchronous loop inside still blocks. Cut the work into pieces and yield via `setTimeout`, `scheduler.yield()` (where supported) or `requestIdleCallback`; move heavy computation to a Web Worker.",
    sources: ["webdev-inp", "mdn-web-workers"],
  },
  {
    question: "Why is `performance.now()` better than `Date.now()` for measuring execution time?",
    options: [
      "It's a precise monotonic timer independent of the system clock",
      "It returns the exact server time rather than the user's clock",
      "It runs outside the event loop and can't be slowed by load",
    ],
    answer: 0,
    explanation:
      "`Date.now()` is milliseconds by the system clock, which can shift (sync, time changes). `performance.now()` counts from the start of navigation with fractional milliseconds. For marks in DevTools there are `performance.mark()` and `measure()`.",
    sources: ["mdn-performance-api"],
  },
  {
    question: "What does `new Date(2025, 1, 1).getMonth()` return, and which month is it?",
    options: ["`1` — February", "`1` — January", "`2` — February"],
    answer: 0,
    explanation:
      "Months in `Date` are zero-based, while days start at one. It's a common source of bugs along with time zones and `Date` mutability. Use `Intl.DateTimeFormat` for formatting; the `Temporal` API is replacing `Date`.",
    sources: ["mdn-intl", "mdn-js-guide"],
  },
  {
    question: "What happens with `10n + 1`?",
    options: [
      "`TypeError`: you can't mix `BigInt` and `Number` in arithmetic",
      "The result is `11n`: the number is converted to `BigInt` automatically",
      "The result is `11`: the `BigInt` becomes a number automatically",
    ],
    answer: 0,
    explanation:
      "Implicit mixing is forbidden to avoid losing precision. Be explicit: `10n + BigInt(1)` or `Number(10n) + 1`. `BigInt` is needed for integers larger than `Number.MAX_SAFE_INTEGER` (2^53 − 1): IDs, cryptography. `JSON.stringify` doesn't support it.",
    sources: ["mdn-bigint", "jsinfo-number"],
  },
  {
    question: "Why does `9007199254740993 === 9007199254740992` return `true`?",
    options: [
      "Numbers above `MAX_SAFE_INTEGER` can't be represented exactly",
      "It's a V8 engine bug that shows up only in Chrome",
      "The last digit of a long numeric literal is dropped",
    ],
    answer: 0,
    explanation:
      "A double has a 53-bit mantissa, so not all integers beyond 2^53 are representable. Large IDs from APIs (e.g. 64-bit ones) come in JSON as strings or are handled via `BigInt`, otherwise they're silently corrupted. Check with `Number.isSafeInteger`.",
    sources: ["jsinfo-number", "mdn-bigint"],
  },
  {
    question: "What is ReDoS?",
    options: [
      "Denial of service caused by a \"heavy\" regular expression",
      "An attack where the server redirects requests to a foreign domain",
      "Resubmitting a form when the browser reloads the page",
    ],
    answer: 0,
    explanation:
      "Expressions like `/^(a+)+$/` on a specially crafted string take exponential time and block the thread (especially dangerous on a Node.js server). Avoid nested quantifiers, limit input length, use safe engines.",
    sources: ["mdn-regexp"],
  },
  {
    question: "What's dangerous about a deep-merge function applied to user-supplied JSON?",
    code: `merge({}, JSON.parse('{"__proto__": {"isAdmin": true}}'));`,
    options: [
      "Prototype pollution: the property ends up in `Object.prototype`",
      "It overflows the stack on any nested JSON data",
      "Nothing: `JSON.parse` automatically strips dangerous internal keys",
    ],
    answer: 0,
    explanation:
      "A naive merge assigns `target.__proto__.isAdmin = true`, and `({}).isAdmin` becomes `true` across the whole app. Protection: skip `__proto__`, `constructor`, `prototype`, use `Object.create(null)` or `Map` for dictionaries, validate input with a schema.",
    sources: ["jsinfo-prototype", "mdn-prototype-chain"],
  },
  {
    question: "Why are `eval` and `new Function` usually banned by security policy?",
    options: [
      "They execute strings as code — a path to XSS",
      "They work only in strict mode and break old browsers",
      "They were removed in ECMAScript 2020 and aren't supported",
    ],
    answer: 0,
    explanation:
      "If user data ends up in the string, an attacker runs their own code. CSP blocks such calls by default. Also, `eval` hinders engine optimizations. There's almost always an alternative: `JSON.parse`, a function table, `Function` with code known at build time.",
    sources: ["mdn-csp", "mdn-strict-mode"],
  },
  {
    question: "What can happen with a circular dependency between ES modules?",
    code: `// a.js
import { b } from "./b.js";
export const a = "A" + b;
// b.js
import { a } from "./a.js";
export const b = "B" + a;`,
    options: [
      "`ReferenceError`: accessing a `const` before initialization",
      "The bundler automatically merges the modules into one and it works",
      "Both values become `undefined`, but there's no error",
    ],
    answer: 0,
    explanation:
      "Modules execute in graph order; with a cycle, one of them starts running while the other's export is still in the TDZ. With `var` you'd get `undefined`; with `const`/`let`/classes, an error. The fix is to move shared code into a third module or access the import lazily inside functions.",
    sources: ["mdn-modules", "mdn-let"],
  },
  {
    question: "How does top-level `await` in a module affect the modules that import it?",
    options: [
      "Their execution waits until the module with `await` finishes initializing",
      "It doesn't: importing modules receive a promise instead of the export",
      "Top-level `await` is forbidden in modules, only allowed in scripts",
    ],
    answer: 0,
    explanation:
      "A module with top-level `await` becomes an async node of the graph, and dependent modules run after it. Handy for loading configuration, but a slow `await` delays the whole branch of the app.",
    sources: ["mdn-modules", "jsinfo-async-await"],
  },
  {
    question: "What does `Promise.withResolvers()` (ES2024) give you?",
    options: [
      "Returns `{ promise, resolve, reject }` for control from outside",
      "Creates a promise that can't be rejected in any way",
      "Automatically cancels the promise after a given timeout",
    ],
    answer: 0,
    explanation:
      "Previously you wrote a \"deferred\" for this: declared variables and assigned `resolve`/`reject` inside the constructor. Handy when a promise is resolved from elsewhere — for example, from an event handler or a queue.",
    sources: ["mdn-promise"],
  },
  {
    question: "What does `new Set([1, 2, 3]).intersection(new Set([2, 3, 4]))` return?",
    options: ["`Set {2, 3}`", "`Set {1, 2, 3, 4}`", "`TypeError`: no such method"],
    answer: 0,
    explanation:
      "Since 2024, `Set` has set-theory methods: `union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf` and more. Previously this was written by hand with `filter`. Check target browser support before using it in production.",
    sources: ["jsinfo-map-set"],
  },
  {
    question: "What does `Object.groupBy(users, u => u.role)` do?",
    options: [
      "Returns an object: key — role, value — array of users",
      "Sorts the original users array by the `role` field",
      "Removes users with duplicate roles from the array",
    ],
    answer: 0,
    explanation:
      "`Object.groupBy` (ES2024) replaces the typical `reduce` for grouping. The result is an object with a `null` prototype. If keys aren't strings, use `Map.groupBy`.",
    sources: ["mdn-object-groupby"],
  },
  {
    question: "What is `MutationObserver` useful for?",
    options: [
      "It asynchronously reports DOM changes: children, attributes, text",
      "It tracks property changes of plain JS objects",
      "It intercepts `localStorage` changes in other tabs",
    ],
    answer: 0,
    explanation:
      "For example, to react to markup inserted by a third-party widget or to implement autosave for `contenteditable`. Change records arrive in a batch as a microtask. For JS objects use `Proxy`; for `localStorage`, the `storage` event.",
    sources: ["mdn-mutation-observer"],
  },
  {
    question: "Where should you store large structured data on the client (e.g. an offline cache)?",
    options: [
      "In IndexedDB — an async database with indexes and a large quota",
      "In `localStorage` — it's synchronous and stores objects directly",
      "In cookies — they sync with the server automatically",
    ],
    answer: 0,
    explanation:
      "`localStorage` is limited to a few megabytes, stores only strings and blocks the thread. Cookies are small (~4 KB) and are sent with every request. IndexedDB stores objects and `Blob`s and supports transactions and indexes; it's easier to use via wrappers like `idb`.",
    sources: ["mdn-indexeddb", "mdn-web-storage"],
  },
  {
    question: "How do you sync data between tabs of the same site?",
    options: [
      "With `BroadcastChannel` or the `storage` event",
      "With `window.opener`, which all tabs of the same site have",
      "With `sessionStorage` — it's shared by all tabs of the same site",
    ],
    answer: 0,
    explanation:
      "`BroadcastChannel('app')` delivers messages to all contexts of the same origin (tabs, iframes, workers). The `storage` event fires in other tabs when `localStorage` is written. `sessionStorage` is isolated per tab.",
    sources: ["mdn-broadcast-channel", "mdn-web-storage"],
  },
  {
    question: "Why cache `Intl.NumberFormat` instances?",
    options: [
      "Creating a formatter is expensive, while calling it is cheap",
      "Without a cache the formatter returns different results for the same data",
      "A formatter for each locale can be created only once per session",
    ],
    answer: 0,
    explanation:
      "`Intl` constructors load locale data and parse options. Calling `toLocaleString()` in a loop over thousands of rows creates a formatter every time. Better to create `new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })` once and call `format`.",
    sources: ["mdn-intl"],
  },
  {
    question: "What's the right way to build a query string from a params object?",
    options: [
      "With `new URLSearchParams(params).toString()`",
      "Concatenate strings by hand: `'?q=' + q + '&page=' + page`",
      "With `JSON.stringify(params)`, passing the result as the query",
    ],
    answer: 0,
    explanation:
      "`URLSearchParams` correctly encodes spaces, non-ASCII characters and special characters like `&`, which would break the request or allow parameter tampering with manual concatenation. The `URL` object lets you work with the whole address: `url.searchParams.set('page', 2)`.",
    sources: ["mdn-url"],
  },
  {
    question: "What does the expression return?",
    code: `const obj = {
  [Symbol.toPrimitive](hint) {
    return hint === "number" ? 42 : "obj";
  },
};
console.log(+obj, \`\${obj}\`);`,
    options: ["`42 obj`", "`NaN [object Object]`", "`42 42`"],
    answer: 0,
    explanation:
      "When converting to a primitive, the engine calls `Symbol.toPrimitive` with the hint `'number'`, `'string'` or `'default'`. Without it, `valueOf` and `toString` are used. This is how, for example, date subtraction works: `date2 - date1`.",
    sources: ["jsinfo-symbol", "jsinfo-type-conversions"],
  },
  {
    question: "What does `[1, 2, 3, 4].findLast(n => n % 2 === 1)` return?",
    options: ["`3`", "`1`", "`[1, 3]`"],
    answer: 0,
    explanation:
      "`findLast` and `findLastIndex` (ES2023) search from the end of the array — without `reverse`, which mutates the array. For multiple matches, use `filter`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "Why pass the `cause` option to `Error`?",
    code: `try { await save(); }
catch (err) { throw new Error("Failed to save the order", { cause: err }); }`,
    options: [
      "To keep the original error and not lose the root cause",
      "To send the error to a monitoring system automatically",
      "To stop the error from propagating further up the call stack",
    ],
    answer: 0,
    explanation:
      "Wrapping errors adds application-level context, and `cause` keeps the low-level error with its stack. DevTools and many monitoring systems show the whole chain of causes.",
    sources: ["mdn-error-cause", "jsinfo-try-catch"],
  },
  {
    question: "What is the Temporal Dead Zone for default parameters?",
    code: `function f(a = b, b = 1) { return a; }
f();`,
    options: [
      "`ReferenceError`: parameter `b` isn't initialized yet when `a` is evaluated",
      "Returns `1`: default parameters are evaluated in any order",
      "Returns `undefined`: `b` is hoisted with the value `undefined`",
    ],
    answer: 0,
    explanation:
      "Parameters are initialized left to right and behave like `let`: accessing a not-yet-initialized parameter is a TDZ error. In the reverse order (`a = 1, b = a`) it works. Default values are evaluated on every call, not once.",
    sources: ["mdn-let", "jsinfo-function-expressions"],
  },
  {
    question: "What is `globalThis` useful for?",
    options: [
      "Uniform access to the global object in any environment",
      "It's a new name for `window` that works only in the browser",
      "It creates an isolated global scope for each module",
    ],
    answer: 0,
    explanation:
      "In the browser the global object is `window`, in workers `self`, in Node.js `global`. `globalThis` works everywhere, which matters for universal (isomorphic) code and libraries.",
    sources: ["mdn-js-guide"],
  },
  {
    question: "Why shouldn't you pass an `async` function as the executor in `new Promise(async (resolve) => ...)`?",
    options: [
      "An error after `await` won't reject the promise — it hangs",
      "The `Promise` constructor throws `TypeError` for any async function",
      "It works, but the executor and the promise run twice",
    ],
    answer: 0,
    explanation:
      "The constructor ignores the promise returned by an async executor, so an exception after `await` becomes an unhandled rejection, and the outer promise stays `pending`. If there's already an `await` inside, the `new Promise` wrapper usually isn't needed at all — an async function is enough.",
    sources: ["jsinfo-promise", "jsinfo-async-await"],
  },
];

export default questions;
