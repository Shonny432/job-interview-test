import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "When does React preserve a component's state between renders?",
    options: [
      "As long as the same component type stays at the same position",
      "As long as the component's props haven't changed by reference",
      "Always, until the whole page is reloaded",
    ],
    answer: 0,
    explanation:
      "State is tied to a position in the UI tree, not to a variable. If a different type renders in the same place (`<input>` instead of `<textarea>`, another component), the subtree is recreated and state is lost. That's why you must not declare components inside other components: each render creates a new type.",
    sources: ["react-preserving-state"],
  },
  {
    question: "How do you reset the state of `<EditForm />` when switching to another user?",
    options: [
      "Reset all fields in a `useEffect` when `userId` changes",
      "Pass `key={userId}` — React recreates the component",
      "Call `forceUpdate()` on the form component",
    ],
    answer: 1,
    explanation:
      "A new `key` tells React it's a different component: the old one unmounts along with its state, and a new one mounts. Resetting via an effect works, but first renders stale data and then fixes it — an extra render and flicker. `forceUpdate` exists only on classes and doesn't reset state.",
    sources: ["react-preserving-state", "react-no-effect"],
  },
  {
    question: "What does `React.memo(Component)` do?",
    options: [
      "Skips rendering if props are shallowly equal to the previous ones",
      "Caches the component's DOM between SPA page transitions",
      "Memoizes the results of all computations inside the component",
    ],
    answer: 0,
    explanation:
      "`memo` compares each prop with `Object.is`. If all are equal, the previous render result is reused. Changes to its own state and context still trigger a render. You can pass a custom comparison function as the second argument.",
    sources: ["react-memo"],
  },
  {
    question: "Why doesn't `memo` help `<List items={data} onSelect={() => select(id)} style={{ gap: 8 }} />`?",
    options: [
      "`memo` doesn't work with arrow functions in props",
      "The callback and the style object are recreated on every render",
      "`memo` can't compare arrays in props",
    ],
    answer: 1,
    explanation:
      "An inline function and an object literal are new references on every render, so shallow comparison won't let them through. Stabilize them with `useCallback` / `useMemo`, or move constants outside the component. The React Compiler does this automatically.",
    sources: ["react-memo", "react-useCallback"],
  },
  {
    question: "What is `useMemo` for?",
    options: [
      "Caching the result of an expensive computation between renders",
      "Keeping a value between page reloads",
      "Running side effects after render",
    ],
    answer: 0,
    explanation:
      "`useMemo(() => filterTodos(todos, tab), [todos, tab])` recomputes the value only when dependencies change. The second use is a stable object reference for `memo` children or effect dependencies. React may discard the cache, so `useMemo` is an optimization, not a guarantee.",
    sources: ["react-useMemo"],
  },
  {
    question: "Why shouldn't you declare a component inside another component?",
    code: `function Page() {
  function Row({ item }) { return <li>{item}</li>; }
  return <ul>{items.map(i => <Row key={i} item={i} />)}</ul>;
}`,
    options: [
      "Nested functions can't return JSX without `React.memo`",
      "Each render creates a new `Row` type — it gets recreated",
      "It breaks the rules of hooks and causes a linter error",
    ],
    answer: 1,
    explanation:
      "To React, `Row` from different renders are different component types, since they're new functions. So the subtree unmounts and remounts every time: state and focus are lost, and the DOM is recreated. Declare components at the top level of the module.",
    sources: ["react-preserving-state"],
  },
  {
    question: "How are `useCallback(fn, deps)` and `useMemo` related?",
    options: [
      "`useCallback(fn, deps)` is the same as `useMemo(() => fn, deps)`",
      "`useCallback` calls the function, while `useMemo` doesn't",
      "`useCallback` works only with async functions",
    ],
    answer: 0,
    explanation:
      "`useCallback` caches the function itself, `useMemo` caches the result of calling a function. `useCallback` doesn't call the passed function or make it run faster. It's useful when the function is passed to a `memo` component or used as an effect dependency.",
    sources: ["react-useCallback", "react-useMemo"],
  },
  {
    question: "When is `useCallback` actually useful?",
    options: [
      "Always: put it on every event handler",
      "When a `memo` child or an effect receives the function",
      "When the function is large and expensive to create",
    ],
    answer: 1,
    explanation:
      "`useCallback` by itself doesn't speed up code: the function is still created during render, plus there's the cost of comparing dependencies. It makes sense only if someone cares about a stable reference. The function's size doesn't matter.",
    sources: ["react-useCallback", "react-memo"],
  },
  {
    question: "When is `useReducer` preferable to `useState`?",
    options: [
      "When the state is a single boolean toggle",
      "When there are many related fields and complex transitions",
      "Only when you need access to global state",
    ],
    answer: 1,
    explanation:
      "`useReducer` gathers update logic into one pure function `(state, action) => newState`: it's easy to read and test, and handlers only describe what happened (`dispatch({ type: 'added' })`). `dispatch` is stable and convenient to pass down. It doesn't make the state global.",
    sources: ["react-useReducer", "react-reducer"],
  },
  {
    question: "How does `useLayoutEffect` differ from `useEffect`?",
    options: [
      "It runs after DOM changes but before painting",
      "It runs only on the server during SSR",
      "It runs before render to prepare data",
    ],
    answer: 0,
    explanation:
      "`useLayoutEffect` blocks painting, so it suits measuring the DOM and adjusting position (tooltips) without flicker. `useEffect` runs after painting and doesn't block it — it's the default choice. `useLayoutEffect` doesn't run on the server.",
    sources: ["react-useLayoutEffect", "react-useEffect"],
  },
  {
    question: "Why does the counter stop at 1?",
    code: `const [count, setCount] = useState(0);

useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id);
}, []);`,
    options: [
      "`setInterval` can't be used inside effects",
      "The callback closed over `count = 0` from the first render",
      "`clearInterval` fires right after the first tick",
    ],
    answer: 1,
    explanation:
      "The effect with `[]` is created once and sees `count` from the first render. Each tick sets `0 + 1`. Fixes: a functional update `setCount(c => c + 1)` (best), adding `count` to dependencies (the interval is recreated), or keeping the value in a `ref`.",
    sources: ["react-queueing-updates", "react-effect-deps", "jsinfo-closure"],
  },
  {
    question: "Why does this effect run after every render?",
    code: `const options = { roomId, serverUrl };

useEffect(() => {
  const conn = connect(options);
  return () => conn.close();
}, [options]);`,
    options: [
      "`options` is a new object on every render",
      "Objects in dependencies always re-run the effect",
      "Because `connect` is an async function returning a promise",
    ],
    answer: 0,
    explanation:
      "Dependencies are compared via `Object.is`, and a new object literal never equals the previous one. The right way is to create the object inside the effect and depend on primitives: `[roomId, serverUrl]`. Suppressing the linter is a bad idea.",
    sources: ["react-effect-deps"],
  },
  {
    question: "How do you avoid a race when loading data in `useEffect` if `userId` changes quickly?",
    options: [
      "An `ignore` flag or an `AbortController` in cleanup",
      "Add a 300 ms `setTimeout` before each request",
      "Remove `userId` from the effect's dependency array",
    ],
    answer: 0,
    explanation:
      "Responses can arrive out of order, and an old response overwrites a new one. In cleanup, set `ignore = true` (the result is ignored) or call `controller.abort()` (the request is cancelled). Even better, use TanStack Query or framework data loading, where this is solved.",
    sources: ["react-useEffect", "mdn-abort-controller"],
  },
  {
    question: "What's the right way to get `fullName` from `firstName` and `lastName` stored in state?",
    options: [
      "A separate `fullName` state and a `useEffect` that updates it",
      "Compute it during render: `const fullName = firstName + ' ' + lastName`",
      "Keep `fullName` in a `useRef` and update it manually",
    ],
    answer: 1,
    explanation:
      "Values that can be computed from props and state shouldn't be stored in state. The \"state + syncing effect\" combo causes an extra render with a stale value and a risk of desync. If the computation is expensive, wrap it in `useMemo`.",
    sources: ["react-no-effect", "react-choosing-state"],
  },
  {
    question: "Which errors does an error boundary NOT catch?",
    options: [
      "Errors while rendering child components",
      "Errors in event handlers and async code",
      "Errors in descendants' lifecycle methods",
    ],
    answer: 1,
    explanation:
      "An error boundary catches errors during render, in constructors and in descendants' lifecycle methods. Errors in `onClick`, `setTimeout` and promises happen outside render — handle them with `try/catch` or put them into state to throw during render. A boundary is a class component with `getDerivedStateFromError`; `react-error-boundary` is often used.",
    sources: ["react-error-boundary"],
  },
  {
    question: "What changed about passing `ref` to function components in React 19?",
    options: [
      "`ref` can be received as a regular prop; `forwardRef` is no longer needed",
      "Passing `ref` to function components is now forbidden",
      "`ref` now works only with class components",
    ],
    answer: 0,
    explanation:
      "In React 19, `function Input({ ref, ...props })` receives `ref` directly. `forwardRef` still works but will be deprecated. Also, a callback ref can now return a cleanup function.",
    sources: ["react-19", "react-forwardRef"],
  },
  {
    question: "How do events behave inside a portal `createPortal(child, document.body)`?",
    options: [
      "They bubble through the React tree to the React parent, not through the DOM",
      "They don't bubble at all — the portal blocks them",
      "They bubble only through the DOM tree up to `document.body`",
    ],
    answer: 0,
    explanation:
      "A portal renders DOM elsewhere (modals, tooltips, to escape `overflow: hidden` and stacking contexts), but logically remains part of the React tree: context is available, and events bubble to React ancestors. This is sometimes surprising, e.g. a parent's `onClick` fires from a click in the modal.",
    sources: ["react-createPortal"],
  },
  {
    question: "What is a higher-order component (HOC)?",
    options: [
      "A function that takes a component and returns a new one",
      "A component located at the very top level of the tree",
      "A component with more than a certain number of descendants",
    ],
    answer: 0,
    explanation:
      "Example: `withAuth(Page)` checks authentication and renders `Page` or a redirect. HOCs were popular before hooks. Downsides: \"wrapper hell\", prop name collisions, complex typing. Today such logic is usually moved into custom hooks.",
    sources: ["patterns-dev-hoc", "react-legacy-hoc"],
  },
  {
    question: "What's the idea of the render props pattern?",
    options: [
      "The component calls a passed function to render",
      "The component renders all its props as a string into the DOM",
      "Props are passed only through a class's `render()` method",
    ],
    answer: 0,
    explanation:
      "`<MouseTracker render={pos => <Cursor {...pos} />} />` — the component owns the logic, and the caller decides how to render the result. The function is often passed as `children`. Hooks largely replaced the pattern, but it remains useful, e.g. in virtualized lists and headless components.",
    sources: ["patterns-dev-render-props"],
  },
  {
    question: "What is the compound components pattern?",
    options: [
      "Related parts sharing a context: `<Tabs>`, `<Tabs.Panel>`",
      "A component assembled from several nested HOC wrappers",
      "A component that recursively renders itself for nesting",
    ],
    answer: 0,
    explanation:
      "The parent holds state and passes it through Context, and the child parts use it. The user composes the markup, as with native `<select>` and `<option>`, without a dozen configuration props. Radix UI, Headless UI and Reach UI work this way.",
    sources: ["patterns-dev-compound"],
  },
  {
    question: "Why do all context consumers re-render on every provider render?",
    code: `<AuthContext value={{ user, login, logout }}>
  {children}
</AuthContext>`,
    options: [
      "`value` is a new object on every provider render",
      "Context always wakes up all consumers; this can't be changed",
      "The `login` and `logout` functions can't be put into context",
    ],
    answer: 0,
    explanation:
      "React compares `value` via `Object.is`. An object literal is always new, so every provider render wakes up all consumers. The fix is `useMemo` for the value (and `useCallback` for functions), or splitting the context into parts.",
    sources: ["react-useContext", "react-useMemo"],
  },
  {
    question: "Why split context into `StateContext` and `DispatchContext`?",
    options: [
      "Components reading only `dispatch` don't re-render when data changes",
      "React doesn't allow putting both data and functions into one context",
      "So that `dispatch` works asynchronously, as in Redux Thunk",
    ],
    answer: 0,
    explanation:
      "`dispatch` from `useReducer` is stable and never changes. If you put it into a separate context, \"add\" and \"delete\" buttons that read only it won't re-render on every data change. It's a common technique for scaling \"reducer + context\".",
    sources: ["react-context-learn", "react-reducer"],
  },
  {
    question: "What does `useTransition` do?",
    options: [
      "Marks an update as non-urgent, keeping the UI responsive",
      "Animates the transition between components via CSS classes",
      "Defers running an effect to the next browser frame",
    ],
    answer: 0,
    explanation:
      "`const [isPending, startTransition] = useTransition()`; updates inside `startTransition` can be interrupted by more urgent ones. For example, switching to a heavy tab doesn't block the UI, and `isPending` lets you show an indicator. It has nothing to do with CSS animations.",
    sources: ["react-useTransition", "react-startTransition"],
  },
  {
    question: "When should you use `useDeferredValue`?",
    options: [
      "When heavy UI depends on a rapidly changing value",
      "When you need to defer loading a component's code until a click",
      "When you need to delay an update by a fixed time",
    ],
    answer: 0,
    explanation:
      "`const deferredQuery = useDeferredValue(query)` — the input updates immediately, while the heavy list renders with a \"lagging\" value in the background and is interrupted by new keystrokes. Unlike debounce, there's no fixed delay: on a fast device the lag is almost zero.",
    sources: ["react-useDeferredValue"],
  },
  {
    question: "What is automatic batching in React 18+?",
    options: [
      "Combining multiple `setState` calls into one render everywhere",
      "Combining multiple components into one JS bundle",
      "Automatic memoization of all components in the app",
    ],
    answer: 0,
    explanation:
      "Before React 18, updates were batched only in React event handlers. Now `setA(); setB();` inside `setTimeout`, `fetch().then()` or native handlers produce one render. If you need to apply an update synchronously (e.g. before measuring the DOM), use `flushSync`.",
    sources: ["react-18", "react-flushSync"],
  },
  {
    question: "What is `useId` for?",
    options: [
      "For unique ids that match on the server and the client",
      "For generating stable `key`s in lists",
      "For reading a DOM element's `id` attribute",
    ],
    answer: 0,
    explanation:
      "`useId` is handy for linking `label` + `input`, `aria-describedby` and the like. `Math.random()` would give different values during SSR and hydration, and a global counter breaks with a different render order. `useId` isn't suitable for list `key`s — keys should come from data.",
    sources: ["react-useId"],
  },
  {
    question: "What is `useSyncExternalStore` for?",
    options: [
      "Subscribing to an external store without UI \"tearing\"",
      "Syncing state between browser tabs",
      "Synchronously loading data from the server during render",
    ],
    answer: 0,
    explanation:
      "The hook takes `subscribe`, `getSnapshot` and `getServerSnapshot` and guarantees a consistent value during concurrent rendering (no tearing). Redux, Zustand and similar libraries are built on it. Example: subscribing to `navigator.onLine` or `localStorage`.",
    sources: ["react-useSyncExternalStore"],
  },
  {
    question: "How does React 19's `use(promise)` differ from regular hooks?",
    options: [
      "It can be called inside conditions; it suspends rendering",
      "It works only in React 19 class components",
      "It restarts the promise on every render and caches it",
    ],
    answer: 0,
    explanation:
      "`use` reads the value of a promise or context. Until the promise resolves, the nearest `<Suspense>` kicks in, and an error goes to the error boundary. Don't create the promise during a client component's render — it'll be new every time; pass it from a Server Component or a caching library.",
    sources: ["react-use", "react-suspense"],
  },
  {
    question: "What does `useActionState` give you in React 19?",
    options: [
      "The form action's result and an `isPending` flag",
      "A global store of all actions, like Redux",
      "A history of all state changes for debugging in DevTools",
    ],
    answer: 0,
    explanation:
      "`const [state, formAction, isPending] = useActionState(action, initialState)`. The `action` function receives the previous state and `FormData`, and its result becomes the new state — handy for validation errors. `formAction` is passed to `<form action>`. It works with Server Functions too.",
    sources: ["react-useActionState", "react-19"],
  },
  {
    question: "What is `useOptimistic` for?",
    options: [
      "Showing the expected result before the server responds",
      "Optimizing rendering by skipping unnecessary updates",
      "Preloading data that will be needed soon",
    ],
    answer: 0,
    explanation:
      "While an action is running, `useOptimistic` returns an optimistic version of the data (e.g. the new message is already in the list). When the action finishes, the real state is shown, and on error the optimistic value simply disappears.",
    sources: ["react-useOptimistic"],
  },
  {
    question: "What does the React Compiler do?",
    options: [
      "Memoizes components and values at build time",
      "Compiles JSX to WebAssembly to speed up rendering",
      "Automatically converts class components to functions",
    ],
    answer: 0,
    explanation:
      "The compiler analyzes code and inserts memoization itself, so manual `useMemo`, `useCallback` and `memo` are mostly unnecessary. It relies on the rules of React (pure renders, immutability) and skips components that break them. In Next.js 16 it's enabled with the `reactCompiler` option.",
    sources: ["react-compiler", "next-react-compiler"],
  },
  {
    question: "Why is React Hook Form usually faster than forms with controlled fields?",
    options: [
      "Fields are uncontrolled: typing doesn't re-render the whole form",
      "It compiles the form to native browser code at build time",
      "It disables validation entirely until submission",
    ],
    answer: 0,
    explanation:
      "In a controlled form, every keystroke updates state and re-renders the form. RHF registers fields via `register` and keeps values outside React state, re-rendering only what's subscribed (`watch`, errors). Validation can run on `onChange`, `onBlur` and `onSubmit`, often with Zod or Yup schemas.",
    sources: ["react-hook-form", "react-input"],
  },
  {
    question: "How do nested `<Suspense>` boundaries behave?",
    options: [
      "The fallback of the nearest boundary above fires",
      "The topmost boundary in the tree always fires",
      "Nested Suspense is forbidden and throws an error",
    ],
    answer: 0,
    explanation:
      "Boundary placement determines which parts of the UI appear together. One boundary around the whole page gives one big spinner. Several nested ones let you reveal content progressively: header → main → comments. With streaming SSR, each boundary can arrive as a separate HTML chunk.",
    sources: ["react-suspense"],
  },
  {
    question: "Where is code splitting with `lazy` usually most beneficial?",
    options: [
      "On routes and heavy, rarely needed widgets",
      "On every button and icon, so bundles are smaller",
      "Only on components rendered on the server",
    ],
    answer: 0,
    explanation:
      "Route-based splitting gives the biggest win: the user loads code only for the page they're on. Heavy, rarely needed parts (a rich-text editor, maps) are split out separately. Splitting too finely causes request waterfalls and fallback flicker.",
    sources: ["react-lazy", "next-lazy-loading"],
  },
  {
    question: "What's wrong with this case reducer in `createSlice`?",
    code: `todoAdded(state, action) {
  state.items.push(action.payload);
  return { ...state, count: state.count + 1 };
}`,
    options: [
      "You can't both mutate the draft and return a value",
      "Mutating methods like `push` are forbidden in `createSlice`",
      "A case reducer must be an async function",
    ],
    answer: 0,
    explanation:
      "Immer lets you either \"mutate\" the `state` draft or return an entirely new value — but not both, or Immer throws an error. Here `state.items.push(...)` and `state.count += 1` are enough. `push` is allowed because changes apply to the draft.",
    sources: ["rtk-immer", "rtk-createSlice"],
  },
  {
    question: "Which actions does `createAsyncThunk('users/fetch', ...)` generate?",
    options: [
      "`pending`, `fulfilled` and `rejected`",
      "`request`, `success` and `failure`",
      "`start`, `end` and `error`",
    ],
    answer: 0,
    explanation:
      "The thunk dispatches `pending` before the request, then `fulfilled` with the result or `rejected` with the error. Reducers handle them in `extraReducers` via `builder.addCase(fetchUsers.fulfilled, ...)`. For caching server data, RTK Query is usually a better fit.",
    sources: ["rtk-createAsyncThunk"],
  },
  {
    question: "How does RTK Query know which data to refetch after a mutation?",
    options: [
      "Query endpoints declare `providesTags`, and mutations declare `invalidatesTags`",
      "It refetches all endpoints after any mutation",
      "You have to call `refetch()` on every query hook manually",
    ],
    answer: 0,
    explanation:
      "Tags link the query cache to mutations: `getPosts` provides `[{ type: 'Post', id: 'LIST' }]`, and `addPost` invalidates the `Post` tag — active queries with this tag are refetched automatically. It's the counterpart of `invalidateQueries` in TanStack Query.",
    sources: ["rtk-query-invalidation"],
  },
  {
    question: "What is RTK Query?",
    options: [
      "Data fetching and caching in RTK: `createApi` generates hooks",
      "A query language for the Redux store, similar to SQL syntax",
      "A GraphQL server plugin that generates a schema from the store",
    ],
    answer: 0,
    explanation:
      "`createApi` describes endpoints, and the library generates hooks like `useGetPostsQuery` and manages caching, deduplication, refetching and tag-based invalidation. It solves the same problems as TanStack Query but is built into the Redux infrastructure. It works with GraphQL too, but it isn't a server plugin.",
    sources: ["rtk-query-overview"],
  },
  {
    question: "What does `createEntityAdapter` give you?",
    options: [
      "`{ ids, entities }` normalization and CRUD reducers",
      "A direct database connection from the Redux store",
      "Automatic entity validation against a JSON schema",
    ],
    answer: 0,
    explanation:
      "Normalization stores each entity once by id, which simplifies updates and lookups. The adapter provides `addOne`, `upsertMany`, `removeOne`, `setAll` and the selectors `selectAll`, `selectById`, and supports sorting.",
    sources: ["rtk-createEntityAdapter", "redux-normalizing"],
  },
  {
    question: "Why does this selector cause a re-render on any action in the store?",
    code: `const done = useSelector(state =>
  state.todos.filter(t => t.done)
);`,
    options: [
      "`filter` returns a new array every time",
      "`useSelector` always re-renders on any action",
      "`filter` is too slow to call inside a selector",
    ],
    answer: 0,
    explanation:
      "`useSelector` runs after every dispatch and compares the result by reference. A new array never equals the previous one. The fix is a memoized `createSelector` selector, which returns the same array as long as `state.todos` hasn't changed.",
    sources: ["rtk-createSelector", "redux-selectors", "react-redux-hooks"],
  },
  {
    question: "When is Redux (or Zustand) more appropriate than React Context?",
    options: [
      "When state changes often and you need fine-grained subscriptions",
      "Always: Context is deprecated and will be removed from React",
      "Only when the app has more than ten pages",
    ],
    answer: 0,
    explanation:
      "Context is a mechanism for passing a value deep into the tree, not a state manager: when `value` changes, all consumers re-render; there are no fine-grained subscriptions. For rarely changing data (theme, current user) it's enough. Stores with selectors give fine-grained subscriptions, middleware and DevTools.",
    sources: ["redux-essentials", "react-context-learn"],
  },
  {
    question: "How does `staleTime` differ from `gcTime` in TanStack Query?",
    options: [
      "`staleTime` is the freshness period, `gcTime` how long it's kept without observers",
      "They're synonyms: `gcTime` is the new name of `staleTime` in v5",
      "`staleTime` is the request timeout, `gcTime` the retry interval",
    ],
    answer: 0,
    explanation:
      "While data is fresh, there's no refetch on mount or window focus. After `staleTime`, it becomes stale but is still shown from the cache and refreshed in the background. `gcTime` (formerly `cacheTime`, 5 minutes by default) starts counting when the query has no observers left — then the data is removed from memory.",
    sources: ["tq-important-defaults", "tq-caching"],
  },
  {
    question: "Why does TanStack Query, with default settings, refetch data when you return to the tab?",
    options: [
      "`staleTime: 0` and `refetchOnWindowFocus` by default",
      "It's a known bug fixed in the next version",
      "The cache is fully cleared on every focus loss",
    ],
    answer: 0,
    explanation:
      "By default, TanStack Query aggressively keeps data up to date: it's considered stale immediately and refetched on mount, window focus and network reconnect. If data rarely changes, increase `staleTime` globally or for a specific query.",
    sources: ["tq-important-defaults"],
  },
  {
    question: "How do you update a list after successfully creating an item via `useMutation`?",
    options: [
      "Call `invalidateQueries` for `['todos']` in `onSuccess`",
      "Reload the page via `location.reload()` in `onSuccess`",
      "Call `useQuery` again inside the `onSuccess` callback",
    ],
    answer: 0,
    explanation:
      "Invalidation marks queries as stale and refetches the active ones. The alternative is to update the cache directly via `setQueryData` if the server returned the new object. Hooks can't be called inside callbacks.",
    sources: ["tq-mutations", "tq-invalidation"],
  },
  {
    question: "Which queries does `invalidateQueries({ queryKey: ['todos'] })` invalidate?",
    options: [
      "All queries whose key starts with `['todos']`",
      "Only the query whose key is exactly `['todos']`",
      "All queries in the app except inactive ones",
    ],
    answer: 0,
    explanation:
      "Matching is by key prefix by default, which makes hierarchical keys convenient: `['todos']` → `['todos', 'list', filters]` → `['todos', 'detail', id]`. Exact matching is enabled with `exact: true`. Keys are often moved into a factory (`todoKeys.detail(id)`).",
    sources: ["tq-invalidation", "tq-query-keys"],
  },
  {
    question: "How do you implement an optimistic update via the cache in TanStack Query?",
    options: [
      "`onMutate` — snapshot and edit the cache, `onError` — roll back",
      "Call `invalidateQueries` at the very start of the mutation",
      "Pass the `optimistic: true` option to the list's `useQuery`",
    ],
    answer: 0,
    explanation:
      "`cancelQueries` prevents a background request from overwriting the optimistic data. The snapshot from `getQueryData` is returned from `onMutate` as context for rollback. v5 has a simpler option — show the mutation's `variables` in the UI while it's `isPending`, without touching the cache.",
    sources: ["tq-optimistic", "tq-mutations"],
  },
  {
    question: "How do you run a query only after `user.id` is received from another query?",
    options: [
      "Pass `enabled: !!user?.id` to the second query",
      "Call the second `useQuery` inside an `if (user)` condition",
      "Call the second query's `refetch()` in a `useEffect`",
    ],
    answer: 0,
    explanation:
      "While `enabled` is false, the query doesn't run (status `pending`). Calling a hook conditionally breaks the rules of hooks, and a manual `refetch` in an effect is needless complexity. `user.id` should be part of the second query's key.",
    sources: ["tq-dependent", "react-rules-of-hooks"],
  },
  {
    question: "With pagination, how do you show the old page while the new one loads, instead of a skeleton?",
    options: [
      "`placeholderData: keepPreviousData`",
      "`staleTime: Infinity` for all pages",
      "`refetchOnMount: false` on the query",
    ],
    answer: 0,
    explanation:
      "With a new key (`['projects', page]`), the query starts with an empty cache. `placeholderData` substitutes the previous data while the new data loads, and `isPlaceholderData` lets you, for example, disable the \"Next\" button. In v4 this was the `keepPreviousData: true` option.",
    sources: ["tq-paginated"],
  },
  {
    question: "What does TanStack Query do on a query error by default on the client?",
    options: [
      "Retries 3 times with increasing delay, then errors",
      "Shows the error immediately without a single retry",
      "Retries the request forever until it succeeds",
    ],
    answer: 0,
    explanation:
      "By default `retry: 3`, and `retryDelay` grows exponentially. Mutations don't retry by default. Retries are configurable with a function, e.g. don't retry 4xx: `retry: (count, err) => err.status >= 500 && count < 3`.",
    sources: ["tq-important-defaults"],
  },
  {
    question: "Why does `useQuery` have a `select` option?",
    options: [
      "To get part of the data and subscribe only to it",
      "To choose which of several queries to run",
      "To list the fields requested from a GraphQL server",
    ],
    answer: 0,
    explanation:
      "`useQuery({ queryKey: ['todos'], queryFn, select: d => d.length })` — the cache stores the full response, while the component gets a derived value and subscribes only to it. For a stable reference, move the `select` function outside the component or memoize it.",
    sources: ["tq-render-optimizations"],
  },
];

export default questions;
