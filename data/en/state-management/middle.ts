import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  // ---------- useState / useReducer ----------
  {
    question: "What will `count` be after one click if it starts at 0?",
    code: `function handleClick() {
  setCount(count + 1);
  setCount((c) => c + 1);
  setCount(count + 1);
}`,
    options: ["`1`", "`2`", "`3`"],
    answer: 0,
    explanation:
      "Updates are queued in order: `count + 1` = 1 (snapshot 0), then `c => c + 1` = 2, then `count + 1` = 1 again — the last update replaces the value with 1. Mixing snapshot values with updaters gives surprising results; prefer updaters when depending on the previous value.",
    sources: ["react-queueing-updates", "react-state-snapshot"],
  },
  {
    question: "How do you reset a form component's state when the selected user changes?",
    options: [
      "Render it with `key={userId}` so React recreates the component",
      "Reset every field in a `useEffect` that depends on `userId`",
      "Call `setState(undefined)` to reset the state to its initial value",
    ],
    answer: 0,
    explanation:
      "A different `key` makes React treat it as a new component: old state is dropped and the initial values apply. A resetting effect first renders stale data and then fixes it — an extra render and a visible flash.",
    sources: ["react-preserving-state", "react-no-effect"],
  },
  {
    question: "Why can storing a copy of a prop in state be a bug?",
    code: `function Message({ color }) {
  const [c, setC] = useState(color);
  return <p style={{ color: c }}>Hi</p>;
}`,
    options: [
      "The initial value is used only once; later `color` changes are ignored",
      "`useState` can't store strings received from props",
      "React throws an error when state duplicates a prop",
    ],
    answer: 0,
    explanation:
      "\"Mirroring\" props in state freezes the first value. If the component should follow the prop, use it directly. Copy into state only when you intentionally need an initial value (and name it `initialColor`).",
    sources: ["react-choosing-state"],
  },
  {
    question: "How do you pass `dispatch` from `useReducer` deep into the tree without prop drilling?",
    options: [
      "Put `dispatch` into its own context; it never changes, so consumers don't re-render",
      "Store `dispatch` in `localStorage` and read it in children",
      "Recreate the reducer in every child with the same initial state",
    ],
    answer: 0,
    explanation:
      "The \"reducer + context\" pattern: one context for `state`, another for `dispatch`. Components that only send actions (buttons, forms) read the stable dispatch context and don't re-render when the state changes.",
    sources: ["react-reducer", "react-context-learn"],
  },
  {
    question: "What's the purpose of the third argument `init` in `useReducer(reducer, arg, init)`?",
    options: [
      "Lazy initialization: `init(arg)` is called only on the first render",
      "It's a middleware called before every action",
      "It defines the action types the reducer accepts",
    ],
    answer: 0,
    explanation:
      "`useReducer(reducer, username, createInitialState)` avoids recomputing an expensive initial state on every render — like a lazy initializer in `useState`. `init` can also be reused to reset the state.",
    sources: ["react-useReducer"],
  },

  // ---------- Context performance ----------
  {
    question: "Why do all context consumers re-render on every provider render?",
    code: `<AuthContext value={{ user, login, logout }}>
  {children}
</AuthContext>`,
    options: [
      "`value` is a new object each time, and React compares it with `Object.is`",
      "Context always re-renders consumers on every render of the app",
      "Functions can't be passed through context, so React re-creates them",
    ],
    answer: 0,
    explanation:
      "A new object literal is never equal to the previous one. Memoize: `const value = useMemo(() => ({ user, login, logout }), [user, login, logout])` with `useCallback` for the functions (the React Compiler can do this automatically).",
    sources: ["react-useContext", "react-useMemo"],
  },
  {
    question: "A component uses only `theme` from a big `AppContext` but re-renders on every cart update. What helps?",
    options: [
      "Split the context into smaller ones by domain and change frequency",
      "Wrap the component in `React.memo` — it blocks context updates",
      "Read the context with `useRef` instead of `useContext`",
    ],
    answer: 0,
    explanation:
      "`React.memo` doesn't stop re-renders caused by a context the component reads. Separate `ThemeContext` and `CartContext` limit updates to the consumers that need them. For very frequent updates, use a store with selectors.",
    sources: ["react-useContext", "react-memo"],
  },
  {
    question: "Why doesn't `React.memo` help a component that calls `useContext(CartContext)`?",
    options: [
      "Memo compares props, but a context change re-renders the consumer regardless",
      "Memo is ignored for components that use any hooks",
      "Memo works only for class components",
    ],
    answer: 0,
    explanation:
      "Context updates bypass the props comparison. A workaround: read the context in a small parent and pass only the needed value to a memoized child, so the child skips rendering when that value is unchanged.",
    sources: ["react-memo", "react-useContext"],
  },
  {
    question: "Is Context a state management library?",
    options: [
      "No: it's a dependency injection mechanism; state lives in `useState`/`useReducer`",
      "Yes: it replaces Redux and Zustand in every scenario",
      "Yes, but only for server components",
    ],
    answer: 0,
    explanation:
      "Context only transports a value through the tree. It has no selectors, middleware, devtools or caching. Combined with `useReducer` it covers many apps, but for frequent updates and fine-grained subscriptions a store is better.",
    sources: ["react-context-learn", "redux-essentials"],
  },
  {
    question: "What happens with nested providers of the same context?",
    code: `<ThemeContext value="dark">
  <Sidebar />
  <ThemeContext value="light">
    <Panel />
  </ThemeContext>
</ThemeContext>`,
    options: [
      "`Panel` reads `\"light\"` — the nearest provider wins",
      "`Panel` reads `\"dark\"` — the outermost provider wins",
      "React throws an error about duplicate providers",
    ],
    answer: 0,
    explanation:
      "`useContext` looks up to the closest provider. Overriding a value for a subtree is a legitimate pattern: a dark section inside a light page, a nested form with its own settings.",
    sources: ["react-useContext"],
  },
  {
    question: "When is it better to put a value in Context instead of passing it explicitly through props?",
    options: [
      "When many components at different depths need it and it rarely changes",
      "Whenever a prop is used by more than one component",
      "When the value is a function, since functions can't be props",
    ],
    answer: 0,
    explanation:
      "Context trades explicitness for convenience: it's harder to see where data comes from, and components depend on a provider being present. Use it for truly cross-cutting values; otherwise explicit props or composition are clearer.",
    sources: ["react-context-learn"],
  },

  // ---------- Redux Toolkit ----------
  {
    question: "What's wrong with this case reducer?",
    code: `todoAdded(state, action) {
  state.items.push(action.payload);
  return { ...state, count: state.count + 1 };
}`,
    options: [
      "You can't both mutate the Immer draft and return a new value",
      "`push` is forbidden inside `createSlice` reducers",
      "Case reducers must be async functions",
    ],
    answer: 0,
    explanation:
      "Either mutate the draft (`state.items.push(...); state.count += 1`) or return a completely new state — Immer throws if you do both.",
    sources: ["rtk-immer", "rtk-createSlice"],
  },
  {
    question: "Which actions does `createAsyncThunk('users/fetch', fn)` dispatch?",
    options: [
      "`users/fetch/pending`, then `users/fetch/fulfilled` or `users/fetch/rejected`",
      "`users/fetch/start` and `users/fetch/end`",
      "Only `users/fetch` with the result in `payload`",
    ],
    answer: 0,
    explanation:
      "Reducers handle them in `extraReducers` via `builder.addCase(fetchUsers.fulfilled, ...)` to set loading flags, data and errors. For cached server data RTK Query removes most of this code.",
    sources: ["rtk-createAsyncThunk"],
  },
  {
    question: "Why does this selector re-render the component on every dispatched action?",
    code: `const done = useSelector((s) => s.todos.filter((t) => t.done));`,
    options: [
      "`filter` returns a new array every time, so the reference always changes",
      "`useSelector` always re-renders on any action",
      "Selectors can't use array methods",
    ],
    answer: 0,
    explanation:
      "`useSelector` reruns after every dispatch and compares results with `===`. Use a memoized selector from `createSelector`, which returns the same array as long as `s.todos` hasn't changed.",
    sources: ["rtk-createSelector", "redux-selectors", "react-redux-hooks"],
  },
  {
    question: "What is `extraReducers` in `createSlice` for?",
    options: [
      "Handling actions defined outside this slice (thunks, other slices)",
      "Adding more reducers than the 10-reducer limit of `reducers`",
      "Registering middleware for the slice",
    ],
    answer: 0,
    explanation:
      "`reducers` creates the slice's own actions, while `extraReducers` reacts to external ones: `builder.addCase(fetchUser.fulfilled, ...)` or `builder.addCase(logout, () => initialState)`.",
    sources: ["rtk-createSlice", "rtk-createAsyncThunk"],
  },
  {
    question: "How do you type `useSelector` and `useDispatch` in a TypeScript project?",
    options: [
      "Infer `RootState`/`AppDispatch` from the store and create `useAppSelector`/`useAppDispatch`",
      "Write the entire state interface by hand and cast every selector",
      "Type them as `any` — RTK can't be typed",
    ],
    answer: 0,
    explanation:
      "`type RootState = ReturnType<typeof store.getState>`, `type AppDispatch = typeof store.dispatch`, then `useSelector.withTypes<RootState>()`. Types follow the reducers automatically.",
    sources: ["redux-typescript"],
  },
  {
    question: "What does normalized state (`{ ids, entities }`) give you?",
    options: [
      "Each item is stored once by id, so updates and lookups are simple and consistent",
      "Smaller bundle size thanks to compression",
      "Automatic syncing with the server",
    ],
    answer: 0,
    explanation:
      "Nested duplicated data goes out of sync (the same user in a list and in comments). `createEntityAdapter` provides normalized state plus `addOne`, `upsertMany`, `removeOne` and selectors like `selectAll`/`selectById`.",
    sources: ["redux-normalizing", "rtk-createEntityAdapter"],
  },
  {
    question: "What does `configureStore` check in development mode?",
    options: [
      "Accidental state mutations and non-serializable values in state and actions",
      "That every reducer has unit tests",
      "That actions are dispatched no more than once per frame",
    ],
    answer: 0,
    explanation:
      "The immutability and serializability middleware catch bugs early: a mutation outside Immer or a `Date`/class instance/promise in the store. They're removed in production builds.",
    sources: ["rtk-configureStore", "redux-style-guide"],
  },
  {
    question: "Should form input state (each keystroke) go into Redux?",
    options: [
      "Usually not: keep it local and dispatch the result on submit",
      "Yes, all state must be in the store to be predictable",
      "Yes, otherwise the form won't work with DevTools",
    ],
    answer: 0,
    explanation:
      "The Redux style guide recommends deciding per piece of state. Ephemeral UI state (typing, hover, an open dropdown) is local; the store holds data shared across the app or that must survive navigation.",
    sources: ["redux-style-guide"],
  },

  // ---------- Zustand ----------
  {
    question: "Why does this component re-render on every store change?",
    code: `const { count, inc } = useStore();`,
    options: [
      "Without a selector it subscribes to the whole store",
      "Destructuring is forbidden for Zustand hooks",
      "Actions in the store are recreated on every update",
    ],
    answer: 0,
    explanation:
      "`useStore()` returns the whole state object, so any change re-renders the component. Select what you need: `useStore((s) => s.count)` and `useStore((s) => s.inc)`.",
    sources: ["zustand-use-shallow", "zustand-intro"],
  },
  {
    question: "Why does a selector returning a new object cause extra re-renders (or a loop in v5)?",
    code: `const { a, b } = useStore((s) => ({ a: s.a, b: s.b }));`,
    options: [
      "A new object is created each time; wrap the selector with `useShallow`",
      "Zustand forbids selecting more than one field",
      "Objects must be selected through `getState()` only",
    ],
    answer: 0,
    explanation:
      "Zustand compares selector results with `Object.is`. `useShallow((s) => ({ a: s.a, b: s.b }))` compares the fields shallowly and keeps the same reference if they're equal.",
    sources: ["zustand-use-shallow"],
  },
  {
    question: "How do you read or update a Zustand store outside React components (e.g. in an API helper)?",
    options: [
      "With `useStore.getState()` and `useStore.setState()`",
      "You can't — the store is available only inside hooks",
      "Through `useContext(useStore)`",
    ],
    answer: 0,
    explanation:
      "The hook returned by `create` also carries the vanilla store API: `getState`, `setState`, `subscribe`. Handy for interceptors, websockets and tests.",
    sources: ["zustand-intro", "zustand-updating-state"],
  },
  {
    question: "How does `set` in Zustand handle nested objects?",
    code: `set({ user: { name: "Ann" } }); // state was { user: { name, email }, theme }`,
    options: [
      "It merges only one level deep: `theme` stays, but `user.email` is lost",
      "It deep-merges everything, so `user.email` stays",
      "It replaces the whole state, losing `theme`",
    ],
    answer: 0,
    explanation:
      "`set` does a shallow merge of the top level. For nested updates spread explicitly: `set((s) => ({ user: { ...s.user, name: 'Ann' } }))`, or use the `immer` middleware.",
    sources: ["zustand-updating-state"],
  },
  {
    question: "How is a large Zustand store usually organized?",
    options: [
      "Into slices — functions creating parts of the state, combined in one `create`",
      "As dozens of independent stores that import each other",
      "As one huge object literal in a single file",
    ],
    answer: 0,
    explanation:
      "The slices pattern: `createBearSlice`, `createFishSlice` get `set`/`get` and return their part; `create((...a) => ({ ...createBearSlice(...a), ...createFishSlice(...a) }))`. Separate stores per domain are also fine.",
    sources: ["zustand-slices"],
  },
  {
    question: "Why can a `persist`-ed store cause a hydration mismatch in SSR apps?",
    options: [
      "The server renders defaults, while the client restores different values from storage",
      "`persist` sends the state to the server on every request",
      "`localStorage` is read on the server and blocks rendering",
    ],
    answer: 0,
    explanation:
      "The server has no `localStorage`, so its HTML uses initial values. Wait for hydration (`persist.hasHydrated()`/`onFinishHydration`) before showing persisted values, or render them only on the client.",
    sources: ["zustand-persist", "zustand-nextjs"],
  },

  // ---------- TanStack Query ----------
  {
    question: "How does `staleTime` differ from `gcTime`?",
    options: [
      "`staleTime` is how long data counts as fresh; `gcTime` is how long unused data stays in memory",
      "They're synonyms; `gcTime` is the new name in v5",
      "`staleTime` is the request timeout; `gcTime` is the retry delay",
    ],
    answer: 0,
    explanation:
      "Fresh data isn't refetched on mount or focus. Stale data is still shown from cache and refreshed in the background. `gcTime` (formerly `cacheTime`, 5 minutes by default) starts when the query has no observers.",
    sources: ["tq-important-defaults", "tq-caching"],
  },
  {
    question: "How does `isPending` differ from `isFetching`?",
    options: [
      "`isPending` — no data yet; `isFetching` — any request in flight, including background",
      "They're the same flag with different names",
      "`isPending` is for mutations only, `isFetching` for queries only",
    ],
    answer: 0,
    explanation:
      "Show a skeleton when `isPending`, and a subtle indicator when `isFetching` while old data is visible. In v4 the first was called `isLoading`.",
    sources: ["tq-queries"],
  },
  {
    question: "How do you refresh the list after `useMutation` creates an item?",
    options: [
      "Call `queryClient.invalidateQueries({ queryKey: ['todos'] })` in `onSuccess`",
      "Call `useQuery` again inside `onSuccess`",
      "Reload the page with `location.reload()`",
    ],
    answer: 0,
    explanation:
      "Invalidation marks matching queries stale and refetches active ones. Alternatively write the returned object into the cache with `setQueryData`. Hooks can't be called inside callbacks.",
    sources: ["tq-mutations", "tq-invalidation"],
  },
  {
    question: "Which queries does `invalidateQueries({ queryKey: ['todos'] })` match?",
    options: [
      "Every query whose key starts with `['todos']`",
      "Only a query with the exact key `['todos']`",
      "All queries in the cache",
    ],
    answer: 0,
    explanation:
      "Prefix matching makes hierarchical keys useful: `['todos']` → `['todos', 'list', filters]` → `['todos', 'detail', id]`. Use `exact: true` for an exact match.",
    sources: ["tq-invalidation", "tq-query-keys"],
  },
  {
    question: "How do you run a query only after another one returned `user.id`?",
    options: [
      "Pass `enabled: !!user?.id` to the dependent query",
      "Call the second `useQuery` inside `if (user)`",
      "Call `refetch()` of the second query in a `useEffect`",
    ],
    answer: 0,
    explanation:
      "While `enabled` is false the query doesn't run. Calling hooks conditionally breaks the rules of hooks. `user.id` must also be part of the dependent query's key.",
    sources: ["tq-dependent", "react-rules-of-hooks"],
  },
  {
    question: "With pagination, how do you keep showing the previous page while the next one loads?",
    options: [
      "`placeholderData: keepPreviousData`",
      "`staleTime: Infinity`",
      "`refetchOnMount: false`",
    ],
    answer: 0,
    explanation:
      "A new key (`['projects', page]`) starts with an empty cache. `placeholderData` shows the previous data meanwhile, and `isPlaceholderData` lets you disable the \"Next\" button.",
    sources: ["tq-paginated"],
  },
  {
    question: "What does TanStack Query do on a failed query by default?",
    options: [
      "Retries 3 times with exponential backoff before showing an error",
      "Shows the error immediately",
      "Retries forever until it succeeds",
    ],
    answer: 0,
    explanation:
      "`retry: 3` with a growing `retryDelay`. Mutations aren't retried by default. You can skip retries for 4xx: `retry: (count, err) => err.status >= 500 && count < 3`.",
    sources: ["tq-important-defaults"],
  },
  {
    question: "Why should every variable the `queryFn` uses be part of the `queryKey`?",
    options: [
      "Otherwise different data is cached under one key and doesn't refetch when the variable changes",
      "Because `queryFn` can't access component variables",
      "Because keys must have at least three elements",
    ],
    answer: 0,
    explanation:
      "The key is the cache identity, like effect dependencies. `useQuery({ queryKey: ['todos'], queryFn: () => fetchTodos(filter) })` shows the old filter's results. The ESLint plugin `exhaustive-deps` for queries catches this.",
    sources: ["tq-query-keys"],
  },

  // ---------- RTK Query ----------
  {
    question: "How do you make an RTK Query mutation refetch the post list?",
    code: `getPosts: build.query({ query: () => "posts", providesTags: ["Post"] }),
addPost: build.mutation({ query: (body) => ({ url: "posts", method: "POST", body }) }),`,
    options: [
      "Add `invalidatesTags: ['Post']` to `addPost`",
      "Call `getPosts()` inside the mutation's `query`",
      "Add `refetchOnMutation: true` to `getPosts`",
    ],
    answer: 0,
    explanation:
      "Tags link the cache to mutations. For finer control, tag items by id (`{ type: 'Post', id }`) plus a `'LIST'` tag, so editing one post refetches only what's affected.",
    sources: ["rtk-query-invalidation", "rtk-query-mutations"],
  },
  {
    question: "When does RTK Query remove unused data from its cache?",
    options: [
      "After `keepUnusedDataFor` seconds (60 by default) without subscribers",
      "Immediately after the last component unmounts",
      "Never — data stays until a page reload",
    ],
    answer: 0,
    explanation:
      "RTK Query counts hook subscriptions per endpoint and argument. If something subscribes again within that time, data comes from the cache. The TanStack Query counterpart is `gcTime`.",
    sources: ["rtk-query-cache-behavior"],
  },
  {
    question: "How do you skip an RTK Query request until an argument is available?",
    options: [
      "Pass `skip: !id` or the `skipToken` instead of the argument",
      "Wrap the hook call in `if (id)`",
      "Return `null` from the endpoint's `query` function",
    ],
    answer: 0,
    explanation:
      "`useGetUserQuery(id ?? skipToken)` keeps the hook call unconditional while preventing the request. It's the counterpart of `enabled: false` in TanStack Query.",
    sources: ["rtk-query-queries", "react-rules-of-hooks"],
  },
  {
    question: "How does RTK Query avoid duplicate requests when 3 components call `useGetUserQuery(1)`?",
    options: [
      "Requests with the same endpoint and argument are deduplicated into one",
      "It sends three requests and keeps the fastest response",
      "Only the first component gets data; others get `undefined`",
    ],
    answer: 0,
    explanation:
      "The cache key is endpoint + serialized argument. All subscribers share one request and one cache entry, which also stays alive while any of them is mounted.",
    sources: ["rtk-query-cache-behavior", "rtk-query-overview"],
  },
  {
    question: "What does the `refetchOnMountOrArgChange` option do in RTK Query?",
    options: [
      "Forces a refetch when a component mounts or the argument changes, even if cached",
      "Disables caching for the endpoint completely",
      "Refetches the data every second",
    ],
    answer: 0,
    explanation:
      "By default RTK Query serves cached data to new subscribers. `refetchOnMountOrArgChange: true` (or a number of seconds) refetches if the data is older than that. Related options: `refetchOnFocus`, `refetchOnReconnect`, `pollingInterval`.",
    sources: ["rtk-query-cache-behavior"],
  },

  // ---------- SWR ----------
  {
    question: "When does SWR revalidate data automatically by default?",
    options: [
      "On mount, on window focus and on network reconnect",
      "Only when the user clicks a refresh button",
      "Every 5 seconds regardless of activity",
    ],
    answer: 0,
    explanation:
      "Each trigger can be turned off (`revalidateOnFocus: false`, `revalidateOnReconnect: false`), and polling is enabled with `refreshInterval`. For immutable data there's `useSWRImmutable`.",
    sources: ["swr-revalidation"],
  },
  {
    question: "How do you fetch data in SWR only when a condition is met?",
    code: `const { data } = useSWR(userId ? \`/api/user/\${userId}\` : null, fetcher);`,
    options: [
      "Pass `null` (or a falsy key) — SWR won't make the request",
      "Wrap `useSWR` in an `if` statement",
      "Pass `enabled: false` in the options",
    ],
    answer: 0,
    explanation:
      "A `null` key means \"don't fetch\". The key can also be a function that throws or returns a falsy value while a dependency is missing — that's how dependent requests are built.",
    sources: ["swr-conditional"],
  },
  {
    question: "What does `mutate(key)` from `useSWRConfig` do?",
    options: [
      "Revalidates (and optionally updates) the cached data for that key everywhere",
      "Deletes the key from the server",
      "Changes the fetcher function for that key",
    ],
    answer: 0,
    explanation:
      "After a POST you call `mutate('/api/todos')` so every component using that key refetches. You can also pass new data to update the cache immediately, and the bound `mutate` from `useSWR` updates its own key.",
    sources: ["swr-mutation"],
  },
  {
    question: "Why do two components with the same SWR key make only one request?",
    options: [
      "SWR deduplicates requests with the same key within `dedupingInterval`",
      "The second component waits for the first to unmount",
      "SWR caches responses in `localStorage` between components",
    ],
    answer: 0,
    explanation:
      "Within the deduping interval (2 seconds by default) concurrent requests for one key are merged, and both components share the cached data. That lets you call `useUser()` in many components freely.",
    sources: ["swr-performance"],
  },
  {
    question: "How do you set a default `fetcher` and options for all SWR hooks?",
    options: [
      "Wrap the app in `<SWRConfig value={{ fetcher, ... }}>`",
      "Call `useSWR.defaults = { fetcher }` at startup",
      "Pass the fetcher to every hook — global options aren't supported",
    ],
    answer: 0,
    explanation:
      "`SWRConfig` sets global options (fetcher, `revalidateOnFocus`, error handlers) and can be nested to override them for a subtree. It can also provide initial `fallback` data from SSR.",
    sources: ["swr-global-config"],
  },

  // ---------- React Router loader / action ----------
  {
    question: "How does a component read the data returned by its route `loader`?",
    options: [
      "With `useLoaderData()` (or the `loaderData` prop in framework mode)",
      "With `useState` initialized from `window.loaderResult`",
      "With `useEffect` that calls the loader again",
    ],
    answer: 0,
    explanation:
      "The router runs the loader before rendering the route and passes the result in. With type generation in framework mode, `loaderData` is fully typed.",
    sources: ["rr-data-loading"],
  },
  {
    question: "What happens after a React Router `action` completes?",
    options: [
      "The router revalidates the page's loaders so the UI shows fresh data",
      "The whole page reloads from the server",
      "Nothing — you must refetch data manually",
    ],
    answer: 0,
    explanation:
      "Automatic revalidation after mutations is the core idea: the URL and loaders are the source of truth for server data, so no client cache synchronization code is needed.",
    sources: ["rr-actions", "rr-state-management"],
  },
  {
    question: "How do you show a pending state during navigation or form submission in React Router?",
    options: [
      "Read `useNavigation().state` (`idle` / `loading` / `submitting`)",
      "Keep an `isLoading` flag in a global store",
      "Check `document.readyState`",
    ],
    answer: 0,
    explanation:
      "`navigation.state !== 'idle'` means the router is loading a page or submitting a form, and `navigation.formData` holds the submitted data — enough for spinners and disabled buttons.",
    sources: ["rr-useNavigation", "rr-pending-ui"],
  },
  {
    question: "When should you use `useFetcher` instead of `<Form>`?",
    options: [
      "To call a loader/action without navigating, e.g. a \"like\" button in a list",
      "To submit a form that must navigate to a new page",
      "To fetch data from a third-party API in `useEffect`",
    ],
    answer: 0,
    explanation:
      "A fetcher has its own state (`fetcher.state`, `fetcher.data`) and doesn't change the URL, so many independent mutations can run on one page (a todo list, inline edits).",
    sources: ["rr-useFetcher"],
  },
  {
    question: "How do you redirect from an `action` after creating an item?",
    options: [
      "Return (or throw) `redirect('/items/' + id)` from the action",
      "Call `window.location.href = ...` inside the action",
      "Call `useNavigate()` inside the action",
    ],
    answer: 0,
    explanation:
      "Loaders and actions run outside components, so hooks aren't available. `redirect` creates a response the router follows. Hooks like `useNavigate` work only in components.",
    sources: ["rr-actions"],
  },

  // ---------- Choosing a solution ----------
  {
    question: "Server data is in TanStack Query. What's usually left for a global client store?",
    options: [
      "A little UI state: theme, open panels, wizard steps — often Context or Zustand is enough",
      "Nothing — TanStack Query also replaces all UI state",
      "A full copy of server data to avoid refetching",
    ],
    answer: 0,
    explanation:
      "Once server cache moves to a dedicated tool, the remaining client state is often small. Copying server data into Redux/Zustand recreates the sync problems the query library solves.",
    sources: ["tq-client-state", "tkdodo-practical-rq"],
  },
  {
    question: "How does RTK Query compare to TanStack Query?",
    options: [
      "Similar goals; RTK Query lives in the Redux store and fits apps already on Redux",
      "RTK Query only works with GraphQL, TanStack Query only with REST",
      "TanStack Query requires Redux to store its cache",
    ],
    answer: 0,
    explanation:
      "Both cache server data with deduplication, invalidation and optimistic updates. RTK Query uses tags, its cache is visible in Redux DevTools and integrates with slices; TanStack Query has a standalone cache, query keys and a broad feature set (infinite queries, suspense).",
    sources: ["rtk-query-overview", "tq-overview"],
  },
];

export default questions;
