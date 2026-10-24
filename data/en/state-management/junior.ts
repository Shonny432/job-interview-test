import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  // ---------- useState ----------
  {
    question: "What is \"state\" in a React component?",
    options: [
      "Data that changes over time and affects what's on screen; a change triggers a re-render",
      "Any variable declared inside the component function",
      "Props passed down to the component by its parent",
    ],
    answer: 0,
    explanation:
      "State is the component's memory between renders: a counter value, form input, whether a menu is open. A regular `let` variable resets on every render and its change doesn't tell React to update the UI. Props are read-only inputs owned by the parent.",
    sources: ["react-state-memory", "react-useState"],
  },
  {
    question: "Why doesn't the counter on screen change?",
    code: `function Counter() {
  let count = 0;
  return <button onClick={() => count++}>{count}</button>;
}`,
    options: [
      "A local variable isn't preserved between renders and changing it doesn't trigger a render",
      "`onClick` handlers can't modify variables declared in the component",
      "The button needs `type=\"button\"` for the click to update the text",
    ],
    answer: 0,
    explanation:
      "`count` is recreated as `0` on every render, and incrementing it doesn't ask React to re-render. You need `const [count, setCount] = useState(0)` and `setCount(count + 1)`.",
    sources: ["react-state-memory", "react-useState"],
  },
  {
    question: "When should you use the functional update `setCount(c => c + 1)` instead of `setCount(count + 1)`?",
    options: [
      "When the new value depends on the previous one, especially with several updates in a row",
      "Only in class components; function components don't support it",
      "When the state holds a string rather than a number",
    ],
    answer: 0,
    explanation:
      "`count` is a snapshot of the current render. Three `setCount(count + 1)` calls in one handler produce +1, while three `setCount(c => c + 1)` produce +3, because each updater receives the result of the previous one. It also protects against stale closures in timers and effects.",
    sources: ["react-queueing-updates", "react-state-snapshot"],
  },
  {
    question: "What's the right way to update one field of an object in state?",
    code: `const [form, setForm] = useState({ name: "", email: "" });`,
    options: [
      "`setForm({ ...form, email: value })`",
      "`form.email = value; setForm(form)`",
      "`setForm({ email: value })` — React merges the objects itself",
    ],
    answer: 0,
    explanation:
      "Unlike `this.setState` in classes, the `useState` setter replaces the value entirely — `setForm({ email })` would lose `name`. Mutating and passing the same object is skipped, because React compares by reference (`Object.is`).",
    sources: ["react-updating-objects", "react-useState"],
  },
  {
    question: "How do you remove an item with `id` from an array in state?",
    options: [
      "`setItems(items.filter(i => i.id !== id))`",
      "`items.splice(index, 1); setItems(items)`",
      "`delete items[index]; setItems(items)`",
    ],
    answer: 0,
    explanation:
      "State must be updated immutably: `filter`, `map`, spread and `toSorted` create a new array. `splice` and `delete` mutate the existing one, the reference stays the same, and React skips the update.",
    sources: ["react-updating-arrays"],
  },
  {
    question: "Why pass a function to `useState(() => createInitialTodos())`?",
    options: [
      "So the expensive computation runs only on the first render",
      "So the state becomes read-only after initialization",
      "So the initial value is loaded asynchronously from the server",
    ],
    answer: 0,
    explanation:
      "`useState(createInitialTodos())` calls the function on every render, even though the result is used only once. A lazy initializer `useState(createInitialTodos)` is called only on mount. It must be synchronous and pure.",
    sources: ["react-useState"],
  },
  {
    question: "Should you store `fullName` in state if you already have `firstName` and `lastName`?",
    options: [
      "No — compute it during render: `const fullName = firstName + ' ' + lastName`",
      "Yes — and sync it with a `useEffect` on every change",
      "Yes — otherwise React can't display the computed value",
    ],
    answer: 0,
    explanation:
      "Redundant state leads to desynchronization and extra renders. Anything derivable from props and existing state is computed during render. If the computation is expensive, wrap it in `useMemo`.",
    sources: ["react-choosing-state", "react-no-effect"],
  },
  {
    question: "What is \"local\" (component) state and when is it enough?",
    options: [
      "State used by one component or a small subtree — `useState` is enough",
      "State stored in `localStorage` to survive reloads",
      "State that only server components can hold",
    ],
    answer: 0,
    explanation:
      "Most UI state is local: whether a dropdown is open, an input's text, the active tab. Keep state as close as possible to where it's used, and lift it up or move it into a store only when several distant components need it.",
    sources: ["react-sharing-state", "react-choosing-state"],
  },

  // ---------- useReducer ----------
  {
    question: "What does `useReducer` return?",
    code: `const [state, dispatch] = useReducer(reducer, initialState);`,
    options: [
      "The current state and a `dispatch` function to send actions",
      "The reducer function and a copy of the initial state",
      "A promise that resolves with the new state",
    ],
    answer: 0,
    explanation:
      "You call `dispatch({ type: 'added', text })`, React calls `reducer(state, action)` and uses the returned value as the next state. `dispatch` is stable across renders, so it's safe to pass down and to use in effect dependencies.",
    sources: ["react-useReducer", "react-reducer"],
  },
  {
    question: "What must a reducer function be like?",
    options: [
      "Pure: `(state, action) => newState` with no side effects or mutations",
      "Async: it can make requests and return a promise of the state",
      "Mutating: it changes `state` directly and returns nothing",
    ],
    answer: 0,
    explanation:
      "React may call the reducer more than once (e.g. in Strict Mode), so it must not make requests, set timers or mutate the state. Side effects belong in event handlers or effects.",
    sources: ["react-reducer", "react-pure"],
  },
  {
    question: "When is `useReducer` usually a better choice than several `useState` calls?",
    options: [
      "When the state has many related fields and update logic is spread over handlers",
      "Whenever the state is a single boolean flag",
      "Only when the state must be shared globally across the app",
    ],
    answer: 0,
    explanation:
      "A reducer collects all transitions in one place, so they're easy to read and test, and handlers only describe what happened. For a single toggle `useState` is simpler. `useReducer` doesn't make state global by itself.",
    sources: ["react-reducer", "react-useReducer"],
  },
  {
    question: "What does a reducer usually return for an unknown action `type`?",
    options: [
      "Throw an error (or return the current state) so the typo isn't silently ignored",
      "`undefined`, which tells React to reset the state",
      "An empty object `{}`",
    ],
    answer: 0,
    explanation:
      "Returning `undefined` would break the state. The React docs throw an error in `default` so typos in action types surface immediately; in TypeScript, a discriminated union of actions plus a `never` check catches them at compile time.",
    sources: ["react-reducer"],
  },
  {
    question: "Why name actions after what happened (`'task_added'`) rather than what to do (`'set_tasks'`)?",
    options: [
      "Handlers stay simple and the logic of how state changes lives in the reducer",
      "React requires action types to be in the past tense",
      "Past-tense names make the reducer run faster",
    ],
    answer: 0,
    explanation:
      "An action describes a user event (\"a task was added\"), and the reducer decides how state reacts. `set_*` actions push the logic back into components and turn the reducer into a dumb setter. The same convention is used in Redux.",
    sources: ["react-reducer", "redux-style-guide"],
  },

  // ---------- Prop drilling ----------
  {
    question: "What is prop drilling?",
    options: [
      "Passing props through intermediate components that don't use them",
      "Validating props at runtime with PropTypes",
      "Copying props into local state with `useEffect`",
    ],
    answer: 0,
    explanation:
      "If `App` has a `user` that a deeply nested `Avatar` needs, every component in between must accept and forward `user`. It's verbose and couples the intermediate components to data they don't care about.",
    sources: ["react-context-learn", "react-sharing-state"],
  },
  {
    question: "What is \"lifting state up\"?",
    options: [
      "Moving state into the closest common parent so siblings can share it via props",
      "Moving all state into one global store at the top of the app",
      "Storing state in `window` so any component can read it",
    ],
    answer: 0,
    explanation:
      "Two components that must stay in sync shouldn't each have their own copy. The parent owns the state and passes the value plus a callback down. This is the first tool to reach for, before Context or a store.",
    sources: ["react-sharing-state"],
  },
  {
    question: "Which technique often solves prop drilling without Context?",
    options: [
      "Composition: pass ready-made elements via `children` or other props",
      "Wrapping every intermediate component in `React.memo`",
      "Moving the data into a `useRef` at the root",
    ],
    answer: 0,
    explanation:
      "`<Layout sidebar={<UserMenu user={user} />}>` — `Layout` doesn't need to know about `user`; it just renders the passed element. The React docs recommend trying composition first, since Context makes components harder to reuse.",
    sources: ["react-context-learn", "react-props"],
  },
  {
    question: "Is passing props down 2–3 levels a problem by itself?",
    options: [
      "Usually not: explicit props make data flow easy to trace",
      "Yes: any prop passed more than one level must be moved to Context",
      "Yes: React shows a warning for props passed through several levels",
    ],
    answer: 0,
    explanation:
      "Explicit props are clear and easy to refactor. Prop drilling becomes a pain when data goes through many layers or many components need it — then composition, Context or a store make sense.",
    sources: ["react-context-learn"],
  },

  // ---------- Context API + useContext ----------
  {
    question: "What problem does the Context API solve?",
    options: [
      "Passing a value deep into the tree without forwarding it through every level",
      "Storing server data with caching and refetching",
      "Speeding up renders by skipping unchanged components",
    ],
    answer: 0,
    explanation:
      "Context makes a value (theme, current user, locale) available to any descendant. It's a transport for values, not a state manager: the state itself still lives in `useState`/`useReducer` of the provider component.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "What are the steps to use Context?",
    options: [
      "`createContext` → wrap the tree in a provider with `value` → read with `useContext`",
      "`useContext` in the root → `createContext` in each child → pass `value` as a prop",
      "Declare a global variable and import it into every component",
    ],
    answer: 0,
    explanation:
      "`const ThemeContext = createContext('light')`; in React 19 you can render `<ThemeContext value={theme}>` directly (earlier versions used `<ThemeContext.Provider>`); any descendant calls `useContext(ThemeContext)`.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "What does `useContext(ThemeContext)` return if there's no provider above?",
    options: [
      "The default value passed to `createContext(defaultValue)`",
      "`undefined`, regardless of the default value",
      "It throws an error immediately",
    ],
    answer: 0,
    explanation:
      "The default is used when no provider is found up the tree. A common pattern is `createContext(null)` plus a custom hook `useAuth()` that throws a clear error if the provider is missing.",
    sources: ["react-useContext"],
  },
  {
    question: "Which components re-render when a provider's `value` changes?",
    options: [
      "Every component that reads this context with `useContext`",
      "Only the provider itself",
      "Only components that receive the value through props",
    ],
    answer: 0,
    explanation:
      "All consumers of the context re-render, even if they use only one field of a large object. That's why Context is great for rarely changing values and less suitable for frequently changing state.",
    sources: ["react-useContext"],
  },
  {
    question: "Which data is a good fit for Context?",
    options: [
      "Rarely changing, widely needed values: theme, locale, current user",
      "A text input's value that changes on every keystroke",
      "A list of 10,000 items that updates every second",
    ],
    answer: 0,
    explanation:
      "Context shines for app-wide settings and dependencies (e.g. an API client). Rapidly changing values in a widely used context cause many re-renders; keep such state local or use a store with selectors.",
    sources: ["react-context-learn"],
  },
  {
    question: "Why wrap `useContext` in a custom hook like `useAuth()`?",
    code: `export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}`,
    options: [
      "To hide the context object and fail clearly when the provider is missing",
      "Because `useContext` can't be called directly in components",
      "To make the context value immutable",
    ],
    answer: 0,
    explanation:
      "Consumers import one hook instead of the context object, TypeScript gets a non-null type, and a missing provider produces a readable error instead of `undefined` somewhere deep in the code.",
    sources: ["react-useContext", "react-custom-hooks"],
  },
  {
    question: "Can a component use several contexts at once?",
    options: [
      "Yes: call `useContext` for each one",
      "No: only one context per component",
      "Only if the contexts are combined into one with `mergeContexts`",
    ],
    answer: 0,
    explanation:
      "`const theme = useContext(ThemeContext); const user = useContext(UserContext);` is normal. Splitting unrelated values into separate contexts also reduces unnecessary re-renders.",
    sources: ["react-useContext"],
  },

  // ---------- Redux Toolkit ----------
  {
    question: "What is Redux Toolkit (RTK)?",
    options: [
      "The official, recommended way to write Redux code with less boilerplate",
      "A separate state manager that replaces Redux and isn't compatible with it",
      "A browser extension for debugging React components",
    ],
    answer: 0,
    explanation:
      "RTK bundles `configureStore`, `createSlice`, `createAsyncThunk`, Immer and RTK Query. The Redux team recommends it for all new Redux code; hand-written action types and switch reducers are considered legacy.",
    sources: ["redux-why-rtk", "redux-essentials"],
  },
  {
    question: "What does `createSlice` generate?",
    options: [
      "A reducer and action creators for each case reducer",
      "A React component that renders the slice state",
      "A store with DevTools and middleware",
    ],
    answer: 0,
    explanation:
      "`createSlice({ name: 'todos', initialState, reducers: { added(state, action) {...} } })` returns `slice.reducer` and `slice.actions.added` with the type `'todos/added'`.",
    sources: ["rtk-createSlice"],
  },
  {
    question: "Why can you \"mutate\" `state` inside `createSlice` reducers?",
    code: `added(state, action) {
  state.items.push(action.payload);
}`,
    options: [
      "Immer turns these changes into an immutable update under the hood",
      "Redux Toolkit dropped the immutability requirement",
      "`push` is special-cased by RTK and other mutations are forbidden",
    ],
    answer: 0,
    explanation:
      "`state` is an Immer draft: you write mutating code, and Immer produces a new object with structural sharing. Outside `createSlice`/`createReducer` mutations are still bugs.",
    sources: ["rtk-immer", "rtk-createSlice"],
  },
  {
    question: "What does `configureStore` do?",
    options: [
      "Creates the store with combined reducers, thunk middleware and DevTools",
      "Connects the store to React components without `<Provider>`",
      "Generates slices from a JSON schema",
    ],
    answer: 0,
    explanation:
      "`configureStore({ reducer: { todos: todosReducer } })` combines reducers, adds `redux-thunk`, enables Redux DevTools and, in development, checks for accidental mutations and non-serializable values.",
    sources: ["rtk-configureStore"],
  },
  {
    question: "How do you connect a Redux store to a React app?",
    options: [
      "Wrap the app in `<Provider store={store}>` from `react-redux`",
      "Import the store into every component that needs it",
      "Pass the store to `createRoot(el, { store })`",
    ],
    answer: 0,
    explanation:
      "`Provider` makes the store available to `useSelector` and `useDispatch` anywhere below. Under the hood it uses Context only to pass the store reference; subscriptions are handled separately and precisely.",
    sources: ["react-redux-hooks", "redux-essentials"],
  },
  {
    question: "What are `useSelector` and `useDispatch` for?",
    options: [
      "Reading data from the store and getting the `dispatch` function",
      "Selecting a DOM element and dispatching a DOM event",
      "Creating a local store for one component",
    ],
    answer: 0,
    explanation:
      "`const count = useSelector(state => state.counter.value)` re-renders the component only when the selected value changes. `const dispatch = useDispatch(); dispatch(increment())` sends an action.",
    sources: ["react-redux-hooks"],
  },
  {
    question: "What is an action in Redux?",
    options: [
      "A plain object with a `type` field describing what happened",
      "A function that directly modifies the store",
      "A React component that renders a button",
    ],
    answer: 0,
    explanation:
      "`{ type: 'todos/added', payload: { id, text } }`. Action creators from `createSlice` build such objects. Async logic (thunks) dispatches plain actions when data arrives.",
    sources: ["redux-essentials"],
  },
  {
    question: "Where should a request to the server live in Redux Toolkit?",
    options: [
      "In a thunk (`createAsyncThunk`) or an RTK Query endpoint — not in a reducer",
      "Directly inside the reducer, since it computes the new state",
      "In the `initialState` of the slice",
    ],
    answer: 0,
    explanation:
      "Reducers must be pure. `createAsyncThunk` dispatches `pending`/`fulfilled`/`rejected` around the request; for cached server data RTK Query is usually simpler.",
    sources: ["rtk-createAsyncThunk", "rtk-query-overview"],
  },

  // ---------- Zustand ----------
  {
    question: "What is Zustand?",
    options: [
      "A small hook-based state manager without providers or boilerplate",
      "A server-side cache for API responses",
      "An official React hook for global state",
    ],
    answer: 0,
    explanation:
      "`const useBear = create(set => ({ bears: 0, add: () => set(s => ({ bears: s.bears + 1 })) }))` — and any component calls `useBear(...)`. No `<Provider>` is needed; the store lives in a module.",
    sources: ["zustand-intro"],
  },
  {
    question: "How do you read just one field from a Zustand store?",
    code: `const useStore = create((set) => ({ count: 0, user: null, inc: () => {} }));`,
    options: [
      "`const count = useStore((s) => s.count)`",
      "`const { count } = useContext(useStore)`",
      "`const count = useStore.count`",
    ],
    answer: 0,
    explanation:
      "A selector subscribes the component only to `count`: changes to `user` won't re-render it. Calling `useStore()` without a selector subscribes to the whole store and re-renders on any change.",
    sources: ["zustand-intro", "zustand-use-shallow"],
  },
  {
    question: "How do you update state in Zustand?",
    options: [
      "Call `set` inside an action: `set((s) => ({ count: s.count + 1 }))`",
      "Assign directly: `useStore.count = 5`",
      "Dispatch an action object with a `type` field",
    ],
    answer: 0,
    explanation:
      "`set` merges the returned object into the state at the top level (one level deep). Actions are usually defined right in the store, so components just call `inc()`.",
    sources: ["zustand-updating-state"],
  },
  {
    question: "Does a Zustand store require a Provider component?",
    options: [
      "No: the store is a hook created at module level",
      "Yes: `<ZustandProvider>` must wrap the whole app",
      "Yes, but only in production builds",
    ],
    answer: 0,
    explanation:
      "That's one of Zustand's selling points. The flip side: a module-level store is shared by everything that imports it — on the server (SSR) you need a store per request, which the Next.js guide shows via Context.",
    sources: ["zustand-intro", "zustand-nextjs"],
  },
  {
    question: "How do you save a Zustand store to `localStorage`?",
    options: [
      "Wrap the store creator in the `persist` middleware",
      "Zustand saves every store to `localStorage` automatically",
      "Call `localStorage.setItem` inside each component after rendering",
    ],
    answer: 0,
    explanation:
      "`create(persist((set) => ({...}), { name: 'cart' }))` saves and restores the state. You can choose the storage, persist only some fields (`partialize`) and migrate old versions.",
    sources: ["zustand-persist"],
  },

  // ---------- Server state: TanStack Query ----------
  {
    question: "How does server state differ from client (UI) state?",
    options: [
      "It lives on the server, is shared and can become stale — the UI holds a cached copy",
      "It's state stored in server components only",
      "It's state that is never shown in the UI",
    ],
    answer: 0,
    explanation:
      "Server data (a list of orders) can change without the user's knowledge, so it needs caching, refetching and invalidation. UI state (whether a modal is open) belongs entirely to the client. Mixing them in one store leads to manual sync code.",
    sources: ["tq-overview", "tq-client-state"],
  },
  {
    question: "What is TanStack Query (React Query) for?",
    options: [
      "Fetching, caching and keeping server data up to date",
      "Building SQL queries on the client",
      "Routing between pages",
    ],
    answer: 0,
    explanation:
      "It handles loading and error states, caching, deduplication, background refetching, retries, pagination and mutations — work that's tedious and error-prone with `useEffect` + `useState`.",
    sources: ["tq-overview"],
  },
  {
    question: "What are the two required parts of `useQuery`?",
    options: [
      "`queryKey` and `queryFn`",
      "`url` and `method`",
      "`reducer` and `initialState`",
    ],
    answer: 0,
    explanation:
      "`useQuery({ queryKey: ['todo', id], queryFn: () => fetchTodo(id) })`. The key identifies the cached data; everything the request depends on goes into it, so changing `id` loads different data.",
    sources: ["tq-queries", "tq-query-keys"],
  },
  {
    question: "What's needed before calling `useQuery` in an app?",
    options: [
      "Create a `QueryClient` and wrap the app in `QueryClientProvider`",
      "Nothing: the cache is created automatically on the first call",
      "A Redux store where TanStack Query keeps its cache",
    ],
    answer: 0,
    explanation:
      "The `QueryClient` holds the cache and defaults. Create it once (outside the component or in `useState`) so the cache isn't reset on every render. Redux isn't required.",
    sources: ["tq-overview"],
  },
  {
    question: "How do you send a POST request (create an item) with TanStack Query?",
    options: [
      "With `useMutation` and its `mutate` function",
      "With `useQuery` and `method: 'POST'`",
      "With `queryClient.post()`",
    ],
    answer: 0,
    explanation:
      "Queries read data, mutations change it. `const { mutate, isPending } = useMutation({ mutationFn: createTodo })`. After success, related queries are usually invalidated so the list refetches.",
    sources: ["tq-mutations"],
  },
  {
    question: "Why does TanStack Query refetch data when you return to the browser tab?",
    options: [
      "Data is stale by default (`staleTime: 0`) and `refetchOnWindowFocus` is on",
      "The cache is cleared every time the tab loses focus",
      "It's a bug that appears only in development",
    ],
    answer: 0,
    explanation:
      "The default is aggressive freshness: stale data is refetched on mount, window focus and reconnect. If the data rarely changes, raise `staleTime` globally or per query.",
    sources: ["tq-important-defaults"],
  },

  // ---------- RTK Query ----------
  {
    question: "What is RTK Query?",
    options: [
      "A data fetching and caching tool built into Redux Toolkit",
      "A query language for selecting data from the Redux store",
      "A GraphQL server for Redux apps",
    ],
    answer: 0,
    explanation:
      "You describe endpoints with `createApi`, and it generates hooks (`useGetPostsQuery`) and manages caching, deduplication, refetching and invalidation — similar to TanStack Query but living in the Redux store.",
    sources: ["rtk-query-overview"],
  },
  {
    question: "What does `createApi` generate for an endpoint `getPosts: builder.query(...)`?",
    options: [
      "A hook `useGetPostsQuery` plus a reducer and middleware for the store",
      "A REST server that serves the posts",
      "A slice with `getPosts` as a case reducer",
    ],
    answer: 0,
    explanation:
      "The API slice's `reducer` and `middleware` are added to `configureStore`, and components call the generated hook: `const { data, isLoading } = useGetPostsQuery()`.",
    sources: ["rtk-query-overview", "rtk-query-queries"],
  },
  {
    question: "How does an RTK Query mutation make lists refetch after adding an item?",
    options: [
      "Queries declare `providesTags`, the mutation declares `invalidatesTags`",
      "You must call `window.location.reload()` after the mutation",
      "RTK Query refetches every endpoint after every mutation",
    ],
    answer: 0,
    explanation:
      "`getPosts` provides the `Post` tag and `addPost` invalidates it — active queries with that tag refetch automatically. It's the RTK Query counterpart of `invalidateQueries` in TanStack Query.",
    sources: ["rtk-query-invalidation", "rtk-query-mutations"],
  },

  // ---------- SWR ----------
  {
    question: "What does the name SWR stand for?",
    options: [
      "stale-while-revalidate: show cached data, then refresh it in the background",
      "Server Write Replication",
      "State With Reducers",
    ],
    answer: 0,
    explanation:
      "The strategy comes from the HTTP `Cache-Control` extension: return stale data immediately for speed, revalidate in the background, then update the UI. Vercel's SWR library is built around it.",
    sources: ["swr-intro", "webdev-swr"],
  },
  {
    question: "What are the arguments of `useSWR(key, fetcher)`?",
    options: [
      "A unique key (often the URL) and a function that loads the data",
      "A reducer and an initial state",
      "An HTTP method and a request body",
    ],
    answer: 0,
    explanation:
      "`const { data, error, isLoading } = useSWR('/api/user', fetcher)`. The key identifies the cache entry: every component using the same key shares one request and one cached value.",
    sources: ["swr-intro"],
  },

  // ---------- React Router loader / action ----------
  {
    question: "What is a `loader` in React Router?",
    options: [
      "A function that loads a route's data before it renders",
      "A spinner component shown while a page loads",
      "A function that lazy-loads the route's JS code",
    ],
    answer: 0,
    explanation:
      "The router calls the loader on navigation and the component reads the result with `useLoaderData()` (or via props in framework mode). Data loading starts with navigation instead of after render, which avoids request waterfalls.",
    sources: ["rr-data-loading", "rr-route-object"],
  },
  {
    question: "What is an `action` in React Router?",
    options: [
      "A function that handles a data mutation from a `<Form>` submission",
      "A Redux action dispatched on navigation",
      "A click handler attached to `<Link>`",
    ],
    answer: 0,
    explanation:
      "`<Form method=\"post\">` calls the route's `action` with the form data. After the action, the router automatically revalidates the page's loaders, so the UI shows fresh data without manual cache updates.",
    sources: ["rr-actions"],
  },
];

export default questions;
