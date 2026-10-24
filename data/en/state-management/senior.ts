import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  // ---------- Foundations: external stores, tearing ----------
  {
    question: "Why do Redux, Zustand and similar libraries subscribe through `useSyncExternalStore`?",
    options: [
      "It guarantees a consistent snapshot during concurrent rendering (no tearing)",
      "It's the only hook that can trigger re-renders from outside React",
      "It caches the store in `localStorage` between sessions",
    ],
    answer: 0,
    explanation:
      "With concurrent rendering React may pause a render; if an external store changes meanwhile, some components could read old values and others new ones. `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` prevents that and supports SSR.",
    sources: ["react-useSyncExternalStore", "react-18"],
  },
  {
    question: "What's wrong with this `getSnapshot`?",
    code: `useSyncExternalStore(subscribe, () => ({ items: store.items }));`,
    options: [
      "It returns a new object each call, so React sees endless changes and loops",
      "`getSnapshot` must be async",
      "Snapshots can't contain arrays",
    ],
    answer: 0,
    explanation:
      "React calls `getSnapshot` repeatedly and compares results with `Object.is`; a fresh object means \"changed\" every time, causing infinite re-renders. Return a cached/immutable value from the store (or a primitive).",
    sources: ["react-useSyncExternalStore"],
  },
  {
    question: "What's the difference between the \"subscribe to a selector\" model (Redux, Zustand) and Context?",
    options: [
      "A store notifies components and each re-renders only if its selected slice changed",
      "Context supports selectors natively via the second argument of `useContext`",
      "Stores re-render the whole tree, while Context updates one component",
    ],
    answer: 0,
    explanation:
      "Context has no selectors: any `value` change re-renders every consumer. Stores run each subscriber's selector and compare results, so updates are fine-grained. Libraries like `use-context-selector` emulate this on top of Context.",
    sources: ["react-useContext", "react-redux-hooks"],
  },
  {
    question: "Where should the state of a list filter (search text, sort, page) ideally live in a routed app?",
    options: [
      "In the URL search params — shareable, survives reloads and works with back/forward",
      "In a global Redux store so every component can read it",
      "In `useRef` so changes don't cause re-renders",
    ],
    answer: 0,
    explanation:
      "The URL is state too. Filters in `?q=&sort=&page=` make links shareable and history meaningful, and loaders/query keys can derive from them. Debounce typing and replace (not push) history entries for every keystroke.",
    sources: ["rr-state-management", "mdn-url"],
  },
  {
    question: "Which classification of state helps pick tools in a large app?",
    options: [
      "Server cache, URL state, form state, local UI state and global client state",
      "Synchronous and asynchronous state only",
      "Primitive and object state",
    ],
    answer: 0,
    explanation:
      "Each kind has a natural home: server cache — TanStack Query/RTK Query/SWR/loaders; URL — the router; forms — local state or a form library; UI — `useState`; truly global client state — Context or a store. Putting everything into one store makes it the bottleneck.",
    sources: ["tkdodo-practical-rq", "redux-style-guide"],
  },

  // ---------- Context advanced ----------
  {
    question: "How do you prevent consumers of a `CartContext` from re-rendering when only `dispatch`-style actions are used?",
    options: [
      "Provide state and actions in separate contexts; the actions context value is stable",
      "Wrap the provider in `React.memo`",
      "Store actions in `useRef` inside each consumer",
    ],
    answer: 0,
    explanation:
      "Buttons that only call `addItem` read `CartActionsContext` (memoized once), so cart changes don't re-render them. Only components that read `CartStateContext` update.",
    sources: ["react-reducer", "react-useContext"],
  },
  {
    question: "Why are Context providers in the Next.js App Router placed in a separate client component?",
    options: [
      "`createContext` is a client-only API; the server layout renders `<Providers>{children}</Providers>`",
      "Server components render providers twice",
      "Providers must be loaded lazily to avoid SSR",
    ],
    answer: 0,
    explanation:
      "A `'use client'` `providers.tsx` wraps `children`, which stay server components because they're passed as props. Place providers as deep as possible so more of the tree remains static.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "Why is \"one big AppContext with all state\" considered an anti-pattern?",
    options: [
      "Any change re-renders every consumer and couples unrelated modules through one object",
      "Context can't hold more than ten fields",
      "It can't be used in Server Components",
    ],
    answer: 0,
    explanation:
      "Typing in a search box re-renders the cart and the header. Split by domain and update frequency, colocate state, and move high-frequency shared state into a store with selectors.",
    sources: ["react-useContext", "rg-smells"],
  },
  {
    question: "What does `use(Context)` in React 19 add compared to `useContext`?",
    options: [
      "It can be called conditionally (e.g. after an early return)",
      "It subscribes to only one field of the context value",
      "It makes the context available in Server Components",
    ],
    answer: 0,
    explanation:
      "`use` isn't bound by the \"top-level only\" rule, so `if (!show) return null; const theme = use(ThemeContext)` works. Otherwise it reads the same nearest provider and doesn't add selectors.",
    sources: ["react-use", "react-useContext"],
  },

  // ---------- Redux Toolkit advanced ----------
  {
    question: "What is `createListenerMiddleware` for?",
    options: [
      "Running side effects in response to specific actions or state changes",
      "Subscribing React components to individual store fields",
      "Converting DOM events into Redux actions",
    ],
    answer: 0,
    explanation:
      "A lightweight alternative to sagas: `startListening({ actionCreator: todoAdded, effect: async (action, api) => {...} })`. Effects can wait for other actions (`take`), cancel, debounce and read state before/after.",
    sources: ["rtk-listener"],
  },
  {
    question: "What does `combineSlices` add to Redux Toolkit?",
    options: [
      "Lazy injection of slices, so code-split features add their reducers when loaded",
      "Merging two slices into one with combined action types",
      "Automatic persistence of slices to storage",
    ],
    answer: 0,
    explanation:
      "`const rootReducer = combineSlices(authSlice)` and later `rootReducer.inject(lazySlice)` from a lazily loaded module. Typed selectors (`slice.selectors`) handle the possibility that the slice isn't injected yet.",
    sources: ["rtk-combineSlices"],
  },
  {
    question: "Why shouldn't you put promises, class instances or functions into the Redux store?",
    options: [
      "It breaks serializability: DevTools, persistence, SSR transfer and time travel",
      "Redux can only store strings and numbers",
      "It makes `useSelector` dozens of times slower",
    ],
    answer: 0,
    explanation:
      "The store should be plain data that can be logged, saved and replayed. Keep non-serializable objects outside (e.g. in a module or listener) and store ids/serializable snapshots instead.",
    sources: ["redux-style-guide", "rtk-configureStore"],
  },
  {
    question: "What does a memoized selector from `createSelector` need to be effective with arguments?",
    code: `const selectByCategory = createSelector(
  [(s) => s.products, (s, category) => category],
  (products, category) => products.filter((p) => p.category === category),
);`,
    options: [
      "Inputs that return stable references; one selector instance per distinct argument if used in many places",
      "Wrapping every input in `useMemo`",
      "Returning a new array from each input selector",
    ],
    answer: 0,
    explanation:
      "The default cache stores the latest inputs, so alternating arguments in several components (`'books'`, `'toys'`) recomputes every time. Create a selector per component (`useMemo(makeSelector, [])`) or configure a larger cache (`weakMapMemoize` is the default in Reselect 5).",
    sources: ["rtk-createSelector", "redux-selectors"],
  },
  {
    question: "Why does Redux recommend the \"ducks\"/feature-folder structure with `createSlice`?",
    options: [
      "State, reducers, actions and selectors for a feature live together, reducing scattered boilerplate",
      "Redux requires one file per action type",
      "It's needed for `configureStore` to discover reducers",
    ],
    answer: 0,
    explanation:
      "The style guide recommends organizing by feature and using `createSlice` so a single file owns a slice's logic. Cross-feature reactions go through `extraReducers` or listeners rather than reaching into other slices.",
    sources: ["redux-style-guide", "rtk-createSlice"],
  },
  {
    question: "A reducer for `orders/placed` must also clear the cart slice. What's the idiomatic way?",
    options: [
      "Let the cart slice handle `orders/placed` in its `extraReducers`",
      "Dispatch `cart/cleared` from inside the orders reducer",
      "Mutate the cart slice from the orders reducer via `getState()`",
    ],
    answer: 0,
    explanation:
      "Reducers can't dispatch or touch other slices. Many reducers responding to one event is the intended Redux model: the action describes what happened, and each slice decides how to react.",
    sources: ["redux-style-guide", "rtk-createSlice"],
  },

  // ---------- Zustand advanced ----------
  {
    question: "Why is a module-level Zustand store dangerous in SSR (Next.js)?",
    options: [
      "On the server one module instance is shared by all requests, so users' data can leak",
      "Zustand can't run on the server at all",
      "The store is recreated on every import",
    ],
    answer: 0,
    explanation:
      "The Next.js guide recommends creating the store per request with `createStore` and passing it through a Context provider, then reading it with `useStore(storeApi, selector)`. In a purely client SPA a global store is fine.",
    sources: ["zustand-nextjs"],
  },
  {
    question: "How do you persist only some fields of a Zustand store and handle schema changes?",
    options: [
      "Use `partialize` to pick fields and `version` + `migrate` for old data",
      "Create a separate store per field",
      "Persistence always saves the whole store and can't migrate",
    ],
    answer: 0,
    explanation:
      "`persist(fn, { name, partialize: (s) => ({ cart: s.cart }), version: 2, migrate: (old, v) => ... })`. Without migrations, a renamed field leaves broken data in users' storage.",
    sources: ["zustand-persist"],
  },
  {
    question: "How do you react to Zustand changes outside React (e.g. sync to an analytics SDK)?",
    options: [
      "`useStore.subscribe(listener)` (or `subscribeWithSelector` for a slice)",
      "Poll `getState()` with `setInterval`",
      "It's impossible; subscriptions only work in components",
    ],
    answer: 0,
    explanation:
      "`subscribe` returns an unsubscribe function. The `subscribeWithSelector` middleware lets you subscribe to a specific selector with an equality function — handy for side effects tied to one field.",
    sources: ["zustand-intro"],
  },
  {
    question: "What does the `devtools` middleware give a Zustand store?",
    options: [
      "Integration with Redux DevTools: action log and time travel",
      "Automatic type generation for the store",
      "A visual editor for the store in the browser",
    ],
    answer: 0,
    explanation:
      "`create(devtools((set) => ...))` and naming updates (`set(fn, false, 'cart/add')`) make the history readable. It's one reason teams pick Zustand: lightweight yet debuggable.",
    sources: ["zustand-devtools"],
  },
  {
    question: "Zustand vs Redux Toolkit: when is RTK the stronger choice?",
    options: [
      "Large teams needing strict conventions, middleware, listeners and RTK Query in one ecosystem",
      "Small apps with one or two pieces of global state",
      "When you want to avoid any boilerplate at all",
    ],
    answer: 0,
    explanation:
      "Zustand is minimal and flexible; RTK enforces a structured, event-driven model with strong tooling. Both are fine choices — the deciding factors are team size, conventions and whether you'll use RTK Query.",
    sources: ["redux-why-rtk", "zustand-intro"],
  },

  // ---------- TanStack Query advanced ----------
  {
    question: "How do you implement an optimistic update with the cache in TanStack Query?",
    options: [
      "`onMutate`: cancel queries, snapshot and update the cache; `onError`: roll back; `onSettled`: invalidate",
      "Call `invalidateQueries` at the start of the mutation",
      "Set `optimistic: true` on the list query",
    ],
    answer: 0,
    explanation:
      "`cancelQueries` prevents an in-flight refetch from overwriting the optimistic data; the snapshot from `getQueryData` is returned as context for rollback. v5 also has a simpler approach: render `variables` while the mutation `isPending`, without touching the cache.",
    sources: ["tq-optimistic", "tq-mutations"],
  },
  {
    question: "What is structural sharing in TanStack Query?",
    options: [
      "Unchanged parts of a refetched response keep their old references",
      "One cache is shared between browser tabs",
      "Responses of all queries are stored in one normalized table",
    ],
    answer: 0,
    explanation:
      "The new JSON is deep-compared with the old one and equal subtrees reuse references, so `memo` components and effect dependencies don't react to identical data. It can be disabled for huge non-JSON data.",
    sources: ["tq-render-optimizations", "tq-caching"],
  },
  {
    question: "Why are query key factories recommended?",
    code: `export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "list"] as const,
  list: (filters: Filters) => [...todoKeys.lists(), filters] as const,
  detail: (id: number) => [...todoKeys.all, "detail", id] as const,
};`,
    options: [
      "Keys stay consistent and hierarchical, so invalidation by prefix is reliable",
      "TanStack Query requires keys to be declared in one object",
      "Factories make queries run in parallel",
    ],
    answer: 0,
    explanation:
      "Typos in hand-written keys silently break caching and invalidation. A factory gives one source of truth: `invalidateQueries({ queryKey: todoKeys.lists() })` refreshes every list but not details.",
    sources: ["tq-query-keys", "tq-invalidation"],
  },
  {
    question: "How do you pass server-prefetched TanStack Query data to client components in the Next.js App Router?",
    options: [
      "`prefetchQuery` on the server, `dehydrate`, then `<HydrationBoundary state>`",
      "Store it in `localStorage` on the server",
      "Use the `ssr: true` option of `useQuery`",
    ],
    answer: 0,
    explanation:
      "A per-request `QueryClient` prefetches and serializes the cache; the client `HydrationBoundary` puts it into the browser cache, so `useQuery` with the same key renders immediately without a refetch.",
    sources: ["tq-ssr", "tq-prefetching"],
  },
  {
    question: "Why must you not create one global `QueryClient` for all requests on the server?",
    options: [
      "Data of one user could be served to another from the shared cache",
      "A global client doesn't support async functions",
      "Next.js forbids module-level variables",
    ],
    answer: 0,
    explanation:
      "Server processes handle many users. Create the client per request (e.g. React `cache()` in RSC). In the browser, by contrast, one client for the whole app is correct.",
    sources: ["tq-ssr", "react-cache"],
  },
  {
    question: "What does `useSuspenseQuery` change?",
    options: [
      "Loading is handled by `<Suspense>`, errors by an error boundary, and `data` is always defined",
      "It caches data forever and never refetches",
      "It only works in Server Components",
    ],
    answer: 0,
    explanation:
      "No `isPending` checks inside the component. Caveats: `enabled` isn't available, and sequential suspending queries create waterfalls — prefetch or use `useSuspenseQueries` for parallel loading.",
    sources: ["tq-suspense", "react-suspense"],
  },
  {
    question: "What must you configure for `useInfiniteQuery`?",
    options: [
      "`initialPageParam` and `getNextPageParam`",
      "`pageSize` and `totalPages`",
      "A `cursor` in the key and manual `refetch` on scroll",
    ],
    answer: 0,
    explanation:
      "Data is `{ pages, pageParams }`; `getNextPageParam(lastPage)` returns the next cursor or `undefined` when done (`hasNextPage` becomes false). `fetchNextPage` is often triggered by an `IntersectionObserver`.",
    sources: ["tq-infinite"],
  },
  {
    question: "How do you cancel an in-flight request when a query becomes unused in TanStack Query?",
    options: [
      "Pass the `signal` from the `queryFn` context to `fetch`",
      "Call `AbortController.abort()` in `onSuccess`",
      "Enable a global `cancelOnUnmount` option",
    ],
    answer: 0,
    explanation:
      "`queryFn: ({ signal }) => fetch(url, { signal })`. The library aborts when the component unmounts before the response, the key changes, or `cancelQueries` is called. Without `signal` only result handling is cancelled.",
    sources: ["tq-cancellation", "mdn-abort-controller"],
  },

  {
    question: "What does the `select` option of `useQuery` give you?",
    code: `const count = useQuery({ queryKey: ["todos"], queryFn, select: (d) => d.length });`,
    options: [
      "A derived value; the component re-renders only when that value changes",
      "A choice between several `queryFn`s",
      "A list of fields to request from a GraphQL server",
    ],
    answer: 0,
    explanation:
      "The cache keeps the full response while each component subscribes to its own projection. Keep the `select` function stable (define it outside or memoize it) so it isn't re-run on every render.",
    sources: ["tq-render-optimizations"],
  },

  // ---------- RTK Query advanced ----------
  {
    question: "How do you do an optimistic update in RTK Query?",
    options: [
      "`updateQueryData` in `onQueryStarted`, then `patchResult.undo()` if `queryFulfilled` rejects",
      "Pass `optimistic: true` to the endpoint definition",
      "Invalidate tags before sending the request",
    ],
    answer: 0,
    explanation:
      "`dispatch(api.util.updateQueryData('getPost', id, (draft) => { draft.title = t }))` patches the cache via Immer and returns a patch object; `try { await queryFulfilled } catch { patch.undo() }` rolls it back.",
    sources: ["rtk-query-manual-updates"],
  },
  {
    question: "How does RTK Query decide which tagged queries to refetch with id-level tags?",
    code: `providesTags: (result) => [
  ...(result?.map(({ id }) => ({ type: "Post" as const, id })) ?? []),
  { type: "Post", id: "LIST" },
],`,
    options: [
      "A mutation invalidating `{ type: 'Post', id: 5 }` refetches only queries providing that tag",
      "Any mutation refetches every query that provides any `Post` tag",
      "Tags with ids are ignored and only the type matters",
    ],
    answer: 0,
    explanation:
      "Editing post 5 invalidates `{ type: 'Post', id: 5 }` (detail and lists containing it), while adding a post invalidates `{ type: 'Post', id: 'LIST' }`. Fine-grained tags avoid refetching everything.",
    sources: ["rtk-query-invalidation"],
  },
  {
    question: "What is `transformResponse` used for in an RTK Query endpoint?",
    options: [
      "Reshaping the raw API response (e.g. unwrapping or normalizing) before it's cached",
      "Converting the request body to JSON",
      "Changing the HTTP method of the request",
    ],
    answer: 0,
    explanation:
      "`transformResponse: (res) => res.data.items` keeps the API quirks out of components and the cache. For normalized caches you can combine it with `createEntityAdapter`.",
    sources: ["rtk-query-queries"],
  },
  {
    question: "How do you write the result of a mutation directly into a cached query without refetching (pessimistic update)?",
    options: [
      "Await `queryFulfilled` in `onQueryStarted`, then `updateQueryData` with the response",
      "Return the data from `invalidatesTags`",
      "Call the query hook inside the mutation",
    ],
    answer: 0,
    explanation:
      "A pessimistic update waits for the server and then patches the cache — no extra request, but the UI updates only after the response. Optimistic updates patch first and undo on failure.",
    sources: ["rtk-query-manual-updates"],
  },
  {
    question: "Can RTK Query and `createSlice` state coexist in one store?",
    options: [
      "Yes: the API slice is just another reducer + middleware; slices can react to its actions",
      "No: RTK Query requires a separate store",
      "Only if all slices are converted to RTK Query endpoints",
    ],
    answer: 0,
    explanation:
      "Slices can listen to endpoint actions (`builder.addMatcher(api.endpoints.login.matchFulfilled, ...)`) — e.g. to store a token after login — while server data stays in the RTK Query cache.",
    sources: ["rtk-query-overview", "rtk-createSlice"],
  },

  // ---------- SWR advanced ----------
  {
    question: "How do you make an optimistic update with SWR's `mutate`?",
    options: [
      "Pass `optimisticData` and `rollbackOnError` along with the async update function",
      "Call `mutate` twice: before and after the request",
      "SWR doesn't support optimistic updates",
    ],
    answer: 0,
    explanation:
      "`mutate(updateTodo(newTodo), { optimisticData: [...todos, newTodo], rollbackOnError: true, populateCache: true, revalidate: false })` shows the change immediately and reverts it if the request fails.",
    sources: ["swr-mutation"],
  },
  {
    question: "What does `useSWRMutation` give compared to calling `fetch` and then `mutate`?",
    options: [
      "A `trigger` function with `isMutating`/`error` state tied to a key",
      "It automatically retries the request forever",
      "It runs the mutation on every render",
    ],
    answer: 0,
    explanation:
      "`const { trigger, isMutating } = useSWRMutation('/api/todos', sendRequest)` — the request runs only when `trigger` is called, and the key's cache can be updated with the result. It's SWR's counterpart of `useMutation`.",
    sources: ["swr-mutation"],
  },
  {
    question: "How does SWR avoid re-rendering a component when unrelated fields of the response change?",
    options: [
      "Dependency collection: a component re-renders only for the returned fields it actually reads",
      "It compares responses with `JSON.stringify` and never re-renders",
      "It requires wrapping the component in `React.memo`",
    ],
    answer: 0,
    explanation:
      "If a component uses only `data`, changes to `isValidating` don't re-render it. SWR also deep-compares data by default (`compare` option), so an identical refetch doesn't trigger an update.",
    sources: ["swr-performance"],
  },
  {
    question: "How do you pass server-fetched data to SWR so the first client render has it?",
    options: [
      "Provide it as `fallback` in `<SWRConfig>` keyed by the same key (or `fallbackData` per hook)",
      "Write it into `localStorage` on the server",
      "Call `mutate` in `useEffect` after mount",
    ],
    answer: 0,
    explanation:
      "`<SWRConfig value={{ fallback: { '/api/user': user } }}>` makes `useSWR('/api/user')` return data immediately; SWR still revalidates according to its options.",
    sources: ["swr-global-config", "swr-intro"],
  },
  {
    question: "SWR vs TanStack Query: what's a fair summary?",
    options: [
      "SWR is smaller and simpler; TanStack Query offers more built-in features (devtools, mutations, fine-grained cache control)",
      "SWR only works with Next.js, TanStack Query only with Vite",
      "TanStack Query can't do stale-while-revalidate",
    ],
    answer: 0,
    explanation:
      "Both implement stale-while-revalidate with deduplication and focus revalidation. TanStack Query has richer mutation lifecycles, query cancellation, infinite queries and official devtools; SWR wins on size and simplicity.",
    sources: ["swr-intro", "tq-overview"],
  },

  // ---------- React Router loader / action advanced ----------
  {
    question: "Why are route loaders said to remove \"request waterfalls\" compared with `useEffect` fetching?",
    options: [
      "The router knows all matched routes and starts their loaders in parallel before rendering",
      "Loaders cache responses forever",
      "Loaders run in a Web Worker",
    ],
    answer: 0,
    explanation:
      "With effects a parent renders, then fetches, then renders a child that fetches again. Nested route loaders for `/users/:id/orders` run concurrently on navigation, and code-split route modules can load in parallel with data.",
    sources: ["rr-data-loading", "rr-state-management"],
  },
  {
    question: "How do you prevent a loader from re-running after every action on the page?",
    options: [
      "Export `shouldRevalidate` from the route and return `false` when the data can't be affected",
      "Wrap the loader in `useMemo`",
      "Return cache headers from the action",
    ],
    answer: 0,
    explanation:
      "By default all active loaders revalidate after an action, which is safe but can be wasteful. `shouldRevalidate({ formAction, currentUrl, nextUrl, defaultShouldRevalidate })` lets you opt out selectively.",
    sources: ["rr-actions", "rr-data-loading"],
  },
  {
    question: "How do you build optimistic UI with a React Router fetcher?",
    options: [
      "Render from `fetcher.formData` while `fetcher.state !== 'idle'`, falling back to loader data",
      "Update a global store first and then call the action",
      "Optimistic UI isn't possible with loaders and actions",
    ],
    answer: 0,
    explanation:
      "The submitted values are available immediately: `const done = fetcher.formData ? fetcher.formData.get('done') === 'true' : todo.done`. After the action completes and loaders revalidate, the real data takes over.",
    sources: ["rr-useFetcher", "rr-pending-ui"],
  },
  {
    question: "How do you stream slow, non-critical data from a React Router loader?",
    options: [
      "Return a promise (not awaited) and render it with `<Suspense>` + `<Await>` or `use()`",
      "Split the loader into two routes",
      "Use `setTimeout` inside the component",
    ],
    answer: 0,
    explanation:
      "Await critical data, return the rest as a promise: `return { product: await getProduct(), reviews: getReviews() }`. The page renders immediately and reviews stream in.",
    sources: ["rr-pending-ui", "react-suspense"],
  },
  {
    question: "Do you still need a client cache library (TanStack Query) with React Router loaders?",
    options: [
      "Often not; loaders + revalidation cover many apps, but a cache helps with shared data and fine-grained control",
      "Always — loaders don't work without a cache library",
      "Never — combining them is impossible",
    ],
    answer: 0,
    explanation:
      "Loaders tie data to routes and revalidate after actions. For data used across many routes, background refetching, infinite lists or offline, teams combine them: loaders call `queryClient.ensureQueryData`, components use `useQuery`.",
    sources: ["rr-state-management", "tq-prefetching"],
  },
  {
    question: "How should validation errors from a React Router `action` reach the form?",
    options: [
      "Return them as data from the action and read them with `useActionData` / `fetcher.data`",
      "Throw them so the route's error boundary shows the form errors",
      "Store them in a global store",
    ],
    answer: 0,
    explanation:
      "Expected errors (an invalid email) are data: `return { errors }` (often with a 400 status). Thrown errors go to the `ErrorBoundary` and replace the route UI — that's for unexpected failures.",
    sources: ["rr-actions"],
  },

  // ---------- Architecture and migration ----------
  {
    question: "A legacy app keeps API responses in Redux slices with hand-written loading flags. What's a pragmatic migration?",
    options: [
      "Move server data to RTK Query (or TanStack Query) endpoint by endpoint, keeping slices for client state",
      "Rewrite everything to Zustand in one release",
      "Move all state into Context",
    ],
    answer: 0,
    explanation:
      "Incremental migration lowers risk: each endpoint replaces a thunk, its slice fields and loading flags. RTK Query lives in the same store, so the two approaches coexist during the transition.",
    sources: ["rtk-query-overview", "redux-why-rtk"],
  },
  {
    question: "How do you keep two browser tabs' client state in sync (e.g. logout in one tab)?",
    options: [
      "Broadcast changes with `BroadcastChannel` or the `storage` event and update the store",
      "Share one Redux store object between tabs",
      "Reload all tabs every minute",
    ],
    answer: 0,
    explanation:
      "Each tab is a separate JS realm with its own store. A message on logout lets other tabs clear their state; `persist` storage events can rehydrate Zustand. Server caches also refetch on focus.",
    sources: ["mdn-broadcast-channel", "mdn-web-storage"],
  },
  {
    question: "What's the main risk of copying server data from `useQuery` into a Zustand/Redux store?",
    options: [
      "Two sources of truth: the copy goes stale and needs manual syncing",
      "TanStack Query deletes data copied elsewhere",
      "Stores can't hold arrays returned by queries",
    ],
    answer: 0,
    explanation:
      "Read server data from the query cache wherever needed (the same hook in many components is deduplicated). Store only client decisions (selected id, filters) and derive the rest.",
    sources: ["tq-client-state", "tkdodo-practical-rq"],
  },
  {
    question: "Which approach makes state logic easiest to unit-test regardless of the library?",
    options: [
      "Keep transitions in pure functions (reducers, slice reducers, store actions) tested without rendering",
      "Test only through end-to-end tests in a real browser",
      "Mock React itself in every test",
    ],
    answer: 0,
    explanation:
      "A reducer or a store action can be tested by calling it with an input and asserting the output. Components are then tested for behavior (React Testing Library), with server calls mocked at the network layer (e.g. MSW).",
    sources: ["react-reducer", "redux-style-guide"],
  },
  {
    question: "When is a finite state machine (e.g. XState) a better model than a reducer with flags?",
    options: [
      "For complex flows with many states and guarded transitions (checkout, video player, wizards)",
      "For any boolean toggle",
      "Never — reducers can't express states",
    ],
    answer: 0,
    explanation:
      "Flags like `isLoading`/`isError`/`isSuccess` allow impossible combinations. A machine (or a reducer over a discriminated union) makes states explicit and transitions guarded; statecharts add nesting and parallel states.",
    sources: ["rg-state", "react-reducer"],
  },
];

export default questions;
