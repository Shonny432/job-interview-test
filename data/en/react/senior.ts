import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Why is React's `cache()` useful in Server Components?",
    options: [
      "It deduplicates calls with the same arguments within a single request",
      "It keeps a function's result across requests from different users forever",
      "It caches a component's JSX in the browser between page transitions",
    ],
    answer: 0,
    explanation:
      "`const getUser = cache(async (id) => db.user.find(id))` — several components in one server render can call `getUser(1)`, and the database query runs once. The cache lives only within the request, so different users' data doesn't mix. Cross-request caching in Next.js is done with `'use cache'`.",
    sources: ["react-cache", "next-use-cache"],
  },
  {
    question: "What is Fiber in React?",
    options: [
      "The reconciler architecture: rendering is split into interruptible units of work",
      "A built-in React HTTP client for streaming data from the server",
      "An alternative DOM engine that React uses instead of the browser's",
    ],
    answer: 0,
    explanation:
      "Fiber (React 16+) represents each tree node as a \"fiber\" object with information about its work. This makes it possible to pause, interrupt and prioritize rendering and reuse work — the foundation of concurrent features (transitions, Suspense). The old stack reconciler walked the tree recursively and couldn't stop.",
    sources: ["react-fiber-architecture", "react-render-commit"],
  },
  {
    question: "How does the render phase differ from the commit phase?",
    options: [
      "Render is interruptible and can repeat; commit synchronously applies changes to the DOM",
      "Render changes the DOM directly, while commit only writes a change log to DevTools",
      "Both phases are synchronous and run exactly once per state update",
    ],
    answer: 0,
    explanation:
      "In the render phase, React calls components and computes the diff — it can be interrupted, discarded and restarted, which is why rendering must be pure. In the commit phase, changes are applied to the DOM all at once without interruption, then layout effects run, and after painting — regular effects.",
    sources: ["react-render-commit", "react-pure"],
  },
  {
    question: "What does concurrent rendering give the user?",
    options: [
      "Urgent updates (typing) can interrupt a heavy non-urgent render",
      "Components render in parallel across multiple CPU threads",
      "React renders all components in a Web Worker, offloading the main thread",
    ],
    answer: 0,
    explanation:
      "Concurrent doesn't mean multithreaded: JS still runs on one thread. React can prepare several versions of the UI, yield control to the browser and interrupt lower-priority work (transitions) for urgent work. It kicks in when you use `startTransition`, `useDeferredValue` and Suspense.",
    sources: ["react-18", "react-useTransition"],
  },
  {
    question: "What happens during hydration?",
    options: [
      "React attaches handlers and state to the HTML rendered by the server",
      "The server re-renders the page after every user click",
      "The browser re-downloads all the HTML and replaces the server markup with it",
    ],
    answer: 0,
    explanation:
      "`hydrateRoot` walks the existing DOM, renders components on the client and expects the same markup, so it can simply \"bring it to life\". Until hydration finishes, the UI is visible but not interactive. If the markup doesn't match, you get a hydration error and the subtree is re-rendered on the client.",
    sources: ["react-hydrateRoot"],
  },
  {
    question: "Which code in render typically causes a hydration error?",
    options: [
      "`new Date().toLocaleTimeString()` or a `typeof window !== 'undefined'` branch",
      "`useState` with an initial value from props passed from the server",
      "Calling `useMemo` with an empty dependency array in a client component",
    ],
    answer: 0,
    explanation:
      "The server and the client must render the same HTML. Time, random numbers, checking `window`, `localStorage` and the browser locale produce different results. Show client-only values after mounting (an effect or `useSyncExternalStore` with `getServerSnapshot`). For unavoidable text differences (a timestamp) there's `suppressHydrationWarning`.",
    sources: ["react-hydrateRoot", "react-useSyncExternalStore"],
  },
  {
    question: "What is selective hydration in React 18+?",
    options: [
      "Hydrating by Suspense boundaries, prioritizing the one the user clicked",
      "Hydrating only components that have a `hydrate` attribute",
      "Disabling hydration for all components without event handlers",
    ],
    answer: 0,
    explanation:
      "Each `<Suspense>` boundary hydrates independently without waiting for all the code. If the user clicks a part that isn't hydrated yet, React raises its priority and replays the event after hydration. Together with streaming, this reduces time to interactivity.",
    sources: ["react-18", "react-suspense"],
  },
  {
    question: "How does streaming SSR (`renderToPipeableStream`) work?",
    options: [
      "HTML is sent in parts: the shell right away, Suspense content when ready",
      "The server waits for all data and sends HTML in one gzip-compressed response",
      "The server sends only JSON, and the HTML is assembled entirely on the client",
    ],
    answer: 0,
    explanation:
      "The server immediately sends the shell with fallbacks, and when the data inside a Suspense boundary is ready, it appends HTML to the stream plus a small script that puts it in place. A slow block no longer delays the whole page. Streaming in the Next.js App Router is built on this.",
    sources: ["react-suspense", "next-streaming"],
  },
  {
    question: "How do Server Components differ from client components?",
    options: [
      "They run only on the server, have no state or effects, and aren't in the bundle",
      "They render on the server once and then fully hydrate on the client",
      "They're class components that React runs in a separate Node process",
    ],
    answer: 0,
    explanation:
      "RSCs can be `async` and access the database and file system, and their code and dependencies aren't sent to the browser. The result is a serialized tree (the RSC payload). State hooks, effects and event handlers aren't available in them — use client components for interactivity.",
    sources: ["react-server-components", "next-server-client"],
  },
  {
    question: "What does the `'use client'` directive at the top of a file do?",
    options: [
      "Marks a boundary: the module and everything it imports go into the client bundle",
      "Forbids rendering the component on the server; it renders only in the browser",
      "Enables strict checking of client hooks for this module",
    ],
    answer: 0,
    explanation:
      "`'use client'` goes at the entry point of a client subtree, not in every file: imported modules automatically become client modules. Client components are still rendered on the server during SSR (into HTML) and hydrated in the browser.",
    sources: ["react-use-client", "next-use-client"],
  },
  {
    question: "How do you render a Server Component inside a client `<Modal>`?",
    options: [
      "Pass it as `children` (or another prop) from a Server Component parent",
      "Import the Server Component directly in the `Modal` file with `'use client'`",
      "Wrap the Server Component in `React.lazy` inside the client module",
    ],
    answer: 0,
    explanation:
      "A client module can't import a server component — the import would make it a client component. But a server parent can render `<Modal><ServerCart /></Modal>`: `ServerCart` runs on the server, and `Modal` receives the ready result as `children`.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "Which props can't be passed from a Server Component to a Client Component?",
    options: [
      "Regular functions and class instances — they aren't serializable",
      "Arrays and objects nested more than three levels deep — they're truncated",
      "Strings longer than 64 KB and any `Date` or `Map` values",
    ],
    answer: 0,
    explanation:
      "Props cross the network, so they must be serializable: primitives, arrays, plain objects, `Date`, `Map`, `Set`, promises, JSX. You can't pass a function — except Server Functions (`'use server'`), which turn into a reference for calling.",
    sources: ["react-use-client", "react-use-server"],
  },
  {
    question: "What's important to remember about `'use server'` functions in terms of security?",
    options: [
      "They're public HTTP endpoints: check authorization and input inside",
      "They're accessible only from your app's components, so no checks are needed",
      "Next.js automatically checks user permissions before calling them",
    ],
    answer: 0,
    explanation:
      "A Server Function can be called with a direct POST request, bypassing the UI. Arguments come from the client and can be forged. Inside the function, check the session and permissions, validate data (e.g. with Zod), and don't rely on the button being visible only to admins.",
    sources: ["react-use-server", "next-data-security"],
  },
  {
    question: "What is `useEffectEvent` for?",
    options: [
      "To read the latest props and state in an effect without making them dependencies",
      "To subscribe an effect to native DOM events without `addEventListener`",
      "To run an effect only in response to a click, not after render",
    ],
    answer: 0,
    explanation:
      "Example: a chat connection effect depends on `roomId`, and on connection you need to show a notification using the current `theme`. Adding `theme` to dependencies would reconnect the chat on theme change. `const onConnected = useEffectEvent(() => notify(theme))` always sees the fresh `theme` but isn't reactive.",
    sources: ["react-useEffectEvent", "react-separating-events"],
  },
  {
    question: "What does the `<Activity mode=\"hidden\">` component (React 19.2) do?",
    options: [
      "Hides the subtree, keeping its state and tearing down effects",
      "Removes the subtree from the DOM and resets all its state",
      "Pauses rendering of the subtree but keeps effects active",
    ],
    answer: 0,
    explanation:
      "The hidden subtree gets `display: none`, effects are cleaned up, and updates render at low priority. When switched back to `visible`, state (typed text, scroll) is preserved and effects are recreated. Handy for tabs and pre-rendering screens the user is likely to visit.",
    sources: ["react-activity", "react-19-2"],
  },
  {
    question: "What is `useImperativeHandle` for?",
    options: [
      "To expose a limited set of methods to the parent via ref instead of a DOM node",
      "To call a child component's methods without a ref, by component name",
      "To synchronously update parent state from a child component's effect",
    ],
    answer: 0,
    explanation:
      "`useImperativeHandle(ref, () => ({ focus, scrollToBottom }))` exposes only the needed methods and hides implementation details. An imperative API is an exception for focus, scrolling, animations and media, not a replacement for props.",
    sources: ["react-useImperativeHandle", "react-dom-refs"],
  },
  {
    question: "What does this hook do?",
    code: `const useHandler = (f) => {
  const ref = useRef(f);
  ref.current = f;
  return useCallback((...args) => ref.current(...args), []);
};`,
    options: [
      "Returns a stable function that always calls the latest version of `f`",
      "Memoizes the result of calling `f`, recomputing when arguments change",
      "Calls `f` once on mount and remembers its return value",
    ],
    answer: 0,
    explanation:
      "The callback reference is stable (handy for `memo` children and effect dependencies), but inside it always sees fresh props and state. Caveat: writing `ref.current` during render formally breaks render purity; React offers `useEffectEvent` for this task, and inside effects you'd update the ref in `useLayoutEffect`.",
    sources: ["react-useRef", "react-useEffectEvent"],
  },
  {
    question: "What is tearing in concurrent rendering?",
    options: [
      "Different parts of the UI show different versions of an external mutable store",
      "An animation glitch during scrolling caused by long tasks on the main thread",
      "A hydration error where part of the DOM is removed and redrawn",
    ],
    answer: 0,
    explanation:
      "If rendering is interrupted and an external store (not React state) changes in the meantime, some components read the old value and others the new one. `useSyncExternalStore` protects against this. That's why third-party stores should subscribe through it rather than `useEffect` + `useState`.",
    sources: ["react-useSyncExternalStore", "react-18"],
  },
  {
    question: "Which of these scenarios causes a memory leak in a React app?",
    options: [
      "Subscribing to `window` or a WebSocket in an effect without unsubscribing in cleanup",
      "Calling `setState` in a click handler after an async request",
      "A large number of components wrapped in `React.memo`",
    ],
    answer: 0,
    explanation:
      "The handler holds a closure with the component's data, which isn't freed after unmounting; repeated mounts accumulate subscriptions. Similar sources: uncleared timers, unbounded global caches, references to detached DOM nodes. Find them with Memory snapshots in DevTools.",
    sources: ["react-sync-effects", "react-useEffect"],
  },
  {
    question: "What's the most accurate way to find which components are slow during interaction?",
    options: [
      "Record a profile in the React DevTools Profiler and the browser's Performance panel",
      "Wrap all components in `memo` and see if it gets faster",
      "Log `console.time` in every component in the production build",
    ],
    answer: 0,
    explanation:
      "The Profiler shows which components rendered, how long it took and why (enable \"Record why each component rendered\"). The Performance panel shows long tasks, layout and paint. Optimizing blindly leads to unnecessary complexity. For metrics in code there's `<Profiler onRender>`.",
    sources: ["react-profiler", "webdev-inp"],
  },
  {
    question: "Why doesn't `useContext` have \"selectors\", and how do people work around it?",
    options: [
      "Context wakes all consumers; split the context or use an external store",
      "It does: the second argument is `useContext(Ctx, selector)`",
      "Selectors aren't needed: React compares the fields of the `value` object itself",
    ],
    answer: 0,
    explanation:
      "Any change to `value` re-renders everyone calling `useContext`, even if they need one field. Workarounds: several narrow contexts, memoized consumers, the `use-context-selector` library, or a store with selector subscriptions (Zustand, Redux, Jotai).",
    sources: ["react-useContext", "react-useSyncExternalStore"],
  },
  {
    question: "You need to render a list of 100,000 items. What should you do?",
    options: [
      "Virtualize: keep only the visible items in the DOM",
      "Wrap each item in `memo` and render everything at once",
      "Render items in batches of 1000 via `setTimeout`",
    ],
    answer: 0,
    explanation:
      "The bottleneck is the number of DOM nodes. Virtualization (TanStack Virtual, react-window) renders a window of visible rows and swaps them while scrolling. `memo` doesn't reduce the DOM, and timer batches only stretch out the same work. Also consider pagination or server-side filtering.",
    sources: ["tanstack-virtual", "webdev-virtualize-lists"],
  },
  {
    question: "What happens to an error thrown during render if there's no error boundary above the component?",
    options: [
      "React unmounts the whole root tree and reports via `onUncaughtError`",
      "React shows the nearest `<Suspense>` fallback instead of the component",
      "React ignores the error and keeps the previous render result",
    ],
    answer: 0,
    explanation:
      "An unhandled render error removes the root's entire UI — showing a broken interface is worse than nothing. In React 19, `createRoot` has `onCaughtError` and `onUncaughtError` for logging. That's why boundaries are placed around routes and independent widgets.",
    sources: ["react-error-boundary", "react-createRoot"],
  },
  {
    question: "Why doesn't an already-shown Suspense fallback appear during a transition inside `startTransition`?",
    options: [
      "React keeps the old UI until the new one is ready instead of swapping in a spinner",
      "Inside a transition, Suspense is disabled until the end of the session",
      "The fallback is shown, but too briefly to notice",
    ],
    answer: 0,
    explanation:
      "If already displayed content suspends because of an urgent update, React shows the fallback. In a transition it prefers to keep the previous screen (with `isPending` for an indicator), so skeletons don't \"flash\". Navigation in Suspense-based routers works this way.",
    sources: ["react-useTransition", "react-suspense"],
  },
  {
    question: "What changed in `startTransition` in React 19?",
    options: [
      "It accepts async functions (Actions) and keeps `isPending` until they finish",
      "It became synchronous and no longer allows interrupting the update's render",
      "It was replaced by `useDeferredValue` and deprecated in React 19",
    ],
    answer: 0,
    explanation:
      "In React 19, `startTransition(async () => { await save(); setState(...) })` is an Action: `isPending` is true for the whole duration, errors can be handled, and forms with `action` use this mechanism automatically. Caveat: `setState` after `await` must be wrapped in `startTransition` again.",
    sources: ["react-startTransition", "react-19"],
  },
  {
    question: "What's new about callback refs in React 19?",
    options: [
      "The callback can return a cleanup function called when the element detaches",
      "Callback refs are no longer called with `null` and aren't needed for DOM",
      "Callback refs are called on every render, not only on mount",
    ],
    answer: 0,
    explanation:
      "`<div ref={node => { const obs = observe(node); return () => obs.disconnect(); }}>` — the cleanup runs when the element is removed or the callback changes. Previously React called the callback with `null`, and cleanup had to be written by hand.",
    sources: ["react-19", "react-dom-common"],
  },
  {
    question: "How do you set `<title>` and `<meta>` from a component in React 19 without third-party libraries?",
    options: [
      "Render `<title>` and `<meta>` in the component — React hoists them into `<head>`",
      "Only via `document.title` in a `useEffect` after mounting",
      "Via a `head` prop on the root component passed to `createRoot`",
    ],
    answer: 0,
    explanation:
      "React 19 supports document metadata: `<title>`, `<meta>` and `<link>` anywhere in the tree are moved into `<head>`, including during SSR and streaming. It also added style precedence (`precedence`) and async script support. In Next.js, the Metadata API is usually used instead.",
    sources: ["react-19", "next-metadata"],
  },
  {
    question: "Does `useMemo` guarantee the computation won't repeat with the same dependencies?",
    options: [
      "No: React may discard the cache; code must work without `useMemo` too",
      "Yes: it's a semantic guarantee you can rely on for effects",
      "Yes, but only if dependencies are primitives rather than objects",
    ],
    answer: 0,
    explanation:
      "The docs explicitly call `useMemo` a performance optimization: React may throw away the cache (e.g. for hidden components or in future versions). If code breaks without `useMemo`, look for a logic problem. For a guaranteed constant value, use `useState(() => init)` or `useRef`.",
    sources: ["react-useMemo"],
  },
  {
    question: "When is it acceptable to call `setState` directly during render?",
    options: [
      "To adjust state when a prop changes, with a guard condition against loops",
      "Never: it always causes a \"Too many re-renders\" error",
      "Always, whenever you need to sync any state with new props",
    ],
    answer: 0,
    explanation:
      "The \"storing information from previous renders\" pattern: `if (items !== prevItems) { setPrevItems(items); setSelection(null); }`. React immediately re-runs the component's render without painting the intermediate state. It's better than `useEffect`, but `key` or computing during render is even better.",
    sources: ["react-useState", "react-no-effect"],
  },
  {
    question: "When is `flushSync` justified?",
    options: [
      "When the DOM must update synchronously before the next line of code",
      "When you need to speed up any render by disabling batching",
      "When you need to send state to the server before a page transition",
    ],
    answer: 0,
    explanation:
      "Example: you added a message and want to scroll to it immediately — without `flushSync`, the new DOM node doesn't exist yet. It's also needed when integrating with third-party code like `onbeforeprint`. It's an expensive operation that breaks batching and concurrent optimizations — use it sparingly.",
    sources: ["react-flushSync"],
  },
  {
    question: "What is `createListenerMiddleware` in Redux Toolkit for?",
    options: [
      "To run side effects in response to specific actions",
      "To subscribe React components to individual store fields",
      "To listen to DOM events and turn them into Redux actions",
    ],
    answer: 0,
    explanation:
      "Listener middleware is a lightweight alternative to redux-saga and redux-observable: `startListening({ actionCreator: todoAdded, effect: async (action, api) => {...} })`. You can wait for other actions (`take`), cancel tasks, debounce, and work with state before and after the action.",
    sources: ["rtk-listener"],
  },
  {
    question: "How do you do an optimistic update in RTK Query?",
    options: [
      "`updateQueryData` in `onQueryStarted`, rolling back via `undo()`",
      "Pass an `optimistic: true` flag to the endpoint definition in `createApi`",
      "Call `invalidatesTags` manually before sending the request to the server",
    ],
    answer: 0,
    explanation:
      "`dispatch(api.util.updateQueryData('getPost', id, draft => { draft.title = t }))` edits the cache with Immer and returns a patch object. In `try { await queryFulfilled } catch { patchResult.undo() }` the changes are rolled back on error. TanStack Query has a similar approach via `onMutate`.",
    sources: ["rtk-query-overview", "rtk-query-invalidation"],
  },
  {
    question: "What is the signature of a Redux middleware?",
    options: [
      "`store => next => action => { ... }`",
      "`(state, action) => newState | void`",
      "`action => store => dispatch(action)`",
    ],
    answer: 0,
    explanation:
      "Currying gives the middleware access to `getState`/`dispatch`, the next link in the chain `next`, and the current action. A middleware can log, modify, delay or replace actions (e.g. thunk calls functions instead of passing them on). `(state, action) => newState` is a reducer.",
    sources: ["redux-essentials"],
  },
  {
    question: "Why don't you put promises, class instances and functions into the Redux store?",
    options: [
      "It breaks serialization, DevTools, state persistence and predictability",
      "Redux physically can't store anything but strings and numbers",
      "It slows `useSelector` dozens of times due to deep comparison",
    ],
    answer: 0,
    explanation:
      "The store should be a plain serializable tree: it's logged, persisted (redux-persist), replayed in time travel and passed from the server during SSR. RTK warns about non-serializable values in dev. Keep non-serializable objects outside the store and store their ids in it.",
    sources: ["redux-style-guide", "rtk-configureStore"],
  },
  {
    question: "What is structural sharing in TanStack Query?",
    options: [
      "Unchanged parts of a response keep their previous references after a refetch",
      "One cache is shared between several browser tabs",
      "Responses from different queries are stored in one shared normalized table",
    ],
    answer: 0,
    explanation:
      "When updating data, the library deeply compares the new JSON with the old and reuses references to matching objects. So components that depend on unchanged parts don't re-render, and `memo` and effect dependencies work correctly.",
    sources: ["tq-render-optimizations", "tq-caching"],
  },
  {
    question: "How do you correctly pass TanStack Query data loaded on the server to client components?",
    options: [
      "`prefetchQuery` on the server, then `dehydrate` and `<HydrationBoundary state>`",
      "Put the data into `localStorage` on the server and read it on the client",
      "Pass the `ssr: true` option to `useQuery` — the library does the rest",
    ],
    answer: 0,
    explanation:
      "The server creates a `QueryClient` per request, runs `prefetchQuery` and serializes the cache via `dehydrate(queryClient)`. The client-side `HydrationBoundary` puts this data into the client cache, and `useQuery` with the same key gets it immediately without refetching.",
    sources: ["tq-ssr", "tq-prefetching"],
  },
  {
    question: "Why can't you use a single global `QueryClient` for all requests on the server?",
    options: [
      "One user's cache can leak into another user's response",
      "A global client doesn't support async requests",
      "Next.js forbids module-level variables in server code",
    ],
    answer: 0,
    explanation:
      "The server handles requests from different users in one process, and a shared cache would mix their data. Create a client per request (e.g. via React's `cache()` in RSC). In the browser, on the contrary, there's one client for the whole app.",
    sources: ["tq-ssr", "react-cache"],
  },
  {
    question: "How do you properly support request cancellation in TanStack Query?",
    options: [
      "Pass the `signal` from the `queryFn` argument to `fetch`",
      "Call `AbortController.abort()` in `onSuccess`",
      "Enable the global option `cancelOnUnmount: true`",
    ],
    answer: 0,
    explanation:
      "`queryFn: ({ signal }) => fetch(url, { signal })`. The library cancels the request if the component unmounts before the response, the key changes, or `cancelQueries` is called. Without passing `signal`, only result handling is cancelled while the HTTP request itself continues.",
    sources: ["tq-cancellation", "mdn-abort-controller"],
  },
  {
    question: "How does `useSuspenseQuery` differ from `useQuery`?",
    options: [
      "`<Suspense>` handles loading, a boundary handles errors, `data` is defined",
      "It caches data forever and never refetches",
      "It works only in Server Components and doesn't need a provider",
    ],
    answer: 0,
    explanation:
      "The component suspends until data arrives, so there's no need for `isPending` checks inside, and `data` isn't `undefined`. Errors propagate to the error boundary (reset via `QueryErrorResetBoundary`). Caveats: the `enabled` option isn't available, and sequential suspensions create request waterfalls.",
    sources: ["tq-suspense", "react-suspense"],
  },
  {
    question: "What must you specify in `useInfiniteQuery`?",
    options: [
      "`initialPageParam` and a `getNextPageParam` function",
      "`pageSize` and `totalPages` to calculate the number of requests",
      "A `cursor` in the query key and a manual `refetch` on scroll",
    ],
    answer: 0,
    explanation:
      "Data is stored as `{ pages, pageParams }`. `getNextPageParam(lastPage)` returns the next page's cursor or `undefined` when there are no more pages (`hasNextPage` becomes false). Loading more is `fetchNextPage()`, often triggered by an Intersection Observer.",
    sources: ["tq-infinite"],
  },
  {
    question: "Do you need Redux or Zustand if server data is already in TanStack Query?",
    options: [
      "Often not: little client state remains, and `useState` and Context are enough",
      "Yes, always: TanStack Query works only on top of a Redux store",
      "No, never: TanStack Query fully stores client UI state as well",
    ],
    answer: 0,
    explanation:
      "A large share of \"global state\" in typical apps is a cache of server data. Once TanStack Query takes it over, the remaining client state (theme, filters, wizard state) is often small. A store is justified for complex client logic: editors, offline mode, complex forms.",
    sources: ["tq-overview", "tkdodo-practical-rq"],
  },
  {
    question: "\"Invalid hook call\" error. What's the most likely cause if the component code is correct?",
    options: [
      "Two copies of React from different packages ended up in the bundle",
      "The component is declared as an arrow function instead of with `function`",
      "The component has more than ten hooks, and React doesn't support more",
    ],
    answer: 0,
    explanation:
      "Causes: calling a hook outside a component, mismatched `react` and `react-dom` versions, or duplicate React. Hooks are tied to the \"dispatcher\" of a specific React copy. Check with `npm ls react`; in monorepos and micro-frontends React is made a singleton (peerDependencies, `shared` in Module Federation).",
    sources: ["react-rules-of-hooks"],
  },
  {
    question: "What principle underlies React Testing Library?",
    options: [
      "Test behavior the way the user sees it: roles, text, labels",
      "Test the internal state and instance methods of components",
      "Snapshot the whole DOM and compare it after every action",
    ],
    answer: 0,
    explanation:
      "Queries like `getByRole('button', { name: 'Save' })` check behavior and accessibility at the same time and don't break when internals are refactored. Interactions are simulated with `user-event`. Tests of implementation details are brittle and guarantee little.",
    sources: ["wai-aria-apg", "react-learn"],
  },
  {
    question: "What are headless UI components, and why are they chosen for design systems?",
    options: [
      "Components with logic and accessibility but no styles: the look is entirely yours",
      "Components that render only on the server, without a browser",
      "Components without JSX, described in JSON and assembled at build time",
    ],
    answer: 0,
    explanation:
      "Radix UI, Headless UI and React Aria implement behavior, keyboard handling, focus and ARIA for complex widgets (dialogs, comboboxes, menus), while styling is up to you (Tailwind, CSS Modules). shadcn/ui, for example, is built on this. Writing such widgets from scratch is expensive and risky.",
    sources: ["wai-aria-apg", "patterns-dev-compound"],
  },
  {
    question: "How does `key` on a wrapper component differ from `key` inside a list?",
    options: [
      "Mechanically it doesn't: changing `key` always means a new instance with new state",
      "Outside lists, `key` is ignored and serves only as a hint for the linter",
      "Outside lists, `key` caches the component instead of recreating it",
    ],
    answer: 0,
    explanation:
      "`key` is part of a component's identity anywhere. In a list it matches items between renders; outside a list it's used to explicitly reset state (`<Chat key={contactId} />`). The key must be unique among siblings, not globally.",
    sources: ["react-preserving-state", "react-lists"],
  },
  {
    question: "What are the `preload` and `preinit` APIs from `react-dom` in React 19 for?",
    options: [
      "To hint the browser in advance to load fonts, styles and scripts",
      "To preload data for `useQuery` before the component renders",
      "To warm up the Server Components cache at build time",
    ],
    answer: 0,
    explanation:
      "`preload(href, { as: 'font' })`, `preinit(href, { as: 'style' })`, `prefetchDNS` and `preconnect` can be called from components and during SSR — React inserts the matching `<link>`s into `<head>` and deduplicates them. This speeds up discovery of critical resources.",
    sources: ["react-19", "mdn-link-preload"],
  },
  {
    question: "Why can `React.memo` with a custom comparison function be dangerous?",
    options: [
      "If not all props are compared, the component shows stale data or callbacks",
      "A custom comparison function is forbidden in the production build",
      "The function runs on the server and slows down SSR",
    ],
    answer: 0,
    explanation:
      "`arePropsEqual` must account for all props, including functions: if you ignore a callback, the component calls its old version with a \"frozen\" closure. Deep comparison of large data can cost more than the render itself. Stabilizing props is usually the better choice.",
    sources: ["react-memo"],
  },
  {
    question: "How does React 18+ handle `setState` on an unmounted component?",
    options: [
      "It ignores it: the old warning was removed as a false positive",
      "It throws an exception and unmounts the entire app",
      "It stores the value and applies it on the next mount",
    ],
    answer: 0,
    explanation:
      "The warning \"Can't perform a React state update on an unmounted component\" was removed in React 18: it often fired falsely (e.g. on a request response after leaving the page), and real leaks are forgotten subscriptions, not `setState` itself. You still need to cancel requests and unsubscribe in cleanup.",
    sources: ["react-18", "react-useEffect"],
  },
  {
    question: "What does TanStack Query give you compared to loading data in `useEffect` with `useState`?",
    options: [
      "Deduplication, caching, retries, background updates and race protection out of the box",
      "Only a shorter syntax; the approaches behave the same",
      "It makes requests synchronous, so loading states aren't needed",
    ],
    answer: 0,
    explanation:
      "Hand-rolled loading in an effect quickly accumulates problems: response races, no cache (refetching on every mount), duplicates from several components, manual retries and error handling, desync with the server. The library solves this declaratively via keys.",
    sources: ["tq-overview", "react-useEffect"],
  },
  {
    question: "When does RTK Query remove data from its cache?",
    options: [
      "When the data has no subscribers for longer than `keepUnusedDataFor` (60 s by default)",
      "Immediately after the last component unmounts, with no delay",
      "Never: data lives until the user reloads the page",
    ],
    answer: 0,
    explanation:
      "RTK Query counts hook subscriptions for each endpoint and argument. When no subscribers remain, the `keepUnusedDataFor` timer starts; if something subscribes again in that time, the data comes from the cache. The TanStack Query counterpart is `gcTime`.",
    sources: ["rtk-query-overview"],
  },
];

export default questions;
