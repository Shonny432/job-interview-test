import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What is React?",
    options: [
      "A full framework with routing, an HTTP client and an ORM out of the box",
      "A library for building user interfaces out of components",
      "A programming language that compiles to JavaScript",
    ],
    answer: 1,
    explanation:
      "React is responsible only for the UI: it describes the interface as a function of state and updates the DOM efficiently. Routing, data loading and the rest come from libraries (React Router, TanStack Query) or frameworks built on React (Next.js). JSX is a JavaScript syntax extension, not a separate language.",
    sources: ["react-learn", "react-thinking"],
  },
  {
    question: "What is the virtual DOM in React?",
    options: [
      "A hidden copy of the browser engine where React renders the page in advance",
      "A JS description of the UI: React diffs it with the previous one and applies only the difference",
      "A browser-built-in API that speeds up any DOM tree operations",
    ],
    answer: 1,
    explanation:
      "When rendering, components return a tree of React elements — plain JS objects. React compares the new tree with the previous one (reconciliation) and applies minimal changes to the real DOM. It isn't a browser API or a copy of the browser.",
    sources: ["react-render-commit", "react-legacy-reconciliation"],
  },
  {
    question: "What does JSX turn into at build time?",
    options: [
      "An HTML string that React then inserts into the page via `innerHTML`",
      "Function calls that create React elements (`jsx()`)",
      "`<template>` templates that the browser parses on page load",
    ],
    answer: 1,
    explanation:
      "`<h1 className=\"t\">Hi</h1>` is compiled (by Babel, SWC, TypeScript) into a call like `jsx(\"h1\", { className: \"t\", children: \"Hi\" })`, which returns a description object. Browsers don't understand JSX, and React doesn't use `innerHTML` — that's why strings in JSX are escaped automatically.",
    sources: ["react-jsx"],
  },
  {
    question: "How do you set a CSS class on an element in JSX?",
    options: ["`<div class=\"box\">`", "`<div className=\"box\">`", "`<div cssClass=\"box\">`"],
    answer: 1,
    explanation:
      "JSX is closer to JavaScript, and `class` is a reserved word, so attributes are named like DOM properties: `className`, `htmlFor` instead of `for`, `tabIndex`, `onClick`. `data-*` and `aria-*` attributes are written as in HTML.",
    sources: ["react-jsx", "react-dom-common"],
  },
  {
    question: "Why can't you write `{if (isAdmin) { <Admin /> }}` inside JSX?",
    options: [
      "Only expressions are allowed in curly braces, and `if` is a statement",
      "Because React replaced `if` with a special `<If>` component",
      "You can, but only inside class components",
    ],
    answer: 0,
    explanation:
      "Inside `{}` you can put any JS expression that produces a value: a variable, a function call, a ternary `cond ? a : b`, `cond && a`. Statements (`if`, `for`) are used outside JSX — before `return` or in a separate function. React has no `<If>` component.",
    sources: ["react-conditional", "react-jsx"],
  },
  {
    question: "Why doesn't the component `function card() { ... }` work as `<card />`?",
    options: [
      "Components must be declared only with arrow functions, not `function`",
      "JSX treats lowercase names as HTML tags",
      "A component must have `export default`, otherwise JSX won't find it",
    ],
    answer: 1,
    explanation:
      "JSX distinguishes tags by case: `<card />` becomes a DOM element `card`, while `<Card />` becomes a call to your component. The declaration form (function or arrow) and the export style don't matter.",
    sources: ["react-learn", "react-jsx"],
  },
  {
    question: "How do you return two sibling elements from a component without an extra DOM wrapper?",
    options: [
      "Return an array without keys: `return [<A />, <B />]`",
      "Wrap them in a fragment: `<>...</>` or `<Fragment>`",
      "It's impossible — a component always adds a `<div>`",
    ],
    answer: 1,
    explanation:
      "A component must return a single root. A fragment groups elements without adding a DOM node. If the fragment needs a `key` (e.g. in a list), use the full form `<Fragment key={id}>`. An array is also allowed, but each element needs a `key`, otherwise you get a warning.",
    sources: ["react-fragment", "react-jsx"],
  },
  {
    question: "Can you modify props inside a child component?",
    options: [
      "Yes: React notices the change and re-renders the parent component",
      "No: props are read-only; the data's owner should change it",
      "Yes, if the prop is an object or array rather than a primitive",
    ],
    answer: 1,
    explanation:
      "Props are the component's inputs, and it must not mutate them. For a child to change data, the parent passes it a callback (`onChange`) and keeps the state itself. Mutating an object from props won't trigger a re-render and creates hard-to-find bugs.",
    sources: ["react-props", "react-pure"],
  },
  {
    question: "How can a child component pass data to its parent?",
    options: [
      "The parent passes a callback via props, and the child calls it with the data",
      "The child mutates the props object, and the parent sees the new value",
      "Via `this.parent.setState()` inside the child component",
    ],
    answer: 0,
    explanation:
      "In React, data flows down and events flow up through functions: `<Search onChange={setQuery} />`, and the child calls `props.onChange(value)`. Mutating props won't re-render the parent, and function components have no access to the parent instance.",
    sources: ["react-sharing-state", "react-events"],
  },
  {
    question: "What is `children` in React?",
    options: [
      "A prop with the content passed between the component's tags",
      "A global array of all child components of the current app",
      "A built-in hook for accessing the component's nested DOM elements",
    ],
    answer: 0,
    explanation:
      "`<Card><h2>Title</h2></Card>` passes the `<h2>` in `props.children`. It's the basis of composition: wrappers, layouts and modals accept arbitrary content. `children` can be a string, an element, an array or a function (the render props pattern).",
    sources: ["react-props"],
  },
  {
    question: "What does `useState(0)` return?",
    options: [
      "An object `{ value, setValue }`",
      "An array of the current value and a function to update it",
      "Only the current value; updates go through `this.setState`",
    ],
    answer: 1,
    explanation:
      "`const [count, setCount] = useState(0)` — array destructuring lets you name the variables however you like. The initial value is used only on the first render. If computing it is expensive, pass a function: `useState(() => compute())`.",
    sources: ["react-useState", "react-state-memory"],
  },
  {
    question: "What does `console.log` print after a click?",
    code: `const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count);
}`,
    options: ["`1`", "`0`", "`undefined`"],
    answer: 1,
    explanation:
      "State within a render is a \"snapshot\". `setCount` schedules a new render, but the `count` variable in the current function stays the same. The new value is available on the next render. If you need the value right away, compute it into a variable: `const next = count + 1`.",
    sources: ["react-state-snapshot", "react-useState"],
  },
  {
    question: "What will `count` be after one click if the initial value is 0?",
    code: `function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}`,
    options: ["`3`", "`1`", "`0`"],
    answer: 1,
    explanation:
      "All three calls see the same snapshot `count = 0` and queue the value `1` three times. To make updates add up, use the functional form: `setCount(c => c + 1)` — each call gets the previous result, and the total is 3.",
    sources: ["react-queueing-updates", "react-useState"],
  },
  {
    question: "Why didn't the component re-render?",
    code: `const [user, setUser] = useState({ name: "Ann" });

function rename() {
  user.name = "Bob";
  setUser(user);
}`,
    options: [
      "`setUser` can't be called in event handlers — only in effects",
      "The object was mutated, the reference is the same — `Object.is` sees no change",
      "Objects can't be stored in `useState` — only primitive values",
    ],
    answer: 1,
    explanation:
      "React compares the new value with the old one via `Object.is`. It's the same object, so the update is skipped. You need to create a new object: `setUser({ ...user, name: \"Bob\" })`. Mutation also breaks optimizations like `memo`.",
    sources: ["react-updating-objects", "react-useState"],
  },
  {
    question: "What's the right way to add an item to an array in state?",
    options: [
      "`items.push(item); setItems(items);`",
      "`setItems([...items, item]);`",
      "`setItems(items.concat).push(item);`",
    ],
    answer: 1,
    explanation:
      "State must be updated immutably — by creating a new array. `push` mutates the existing array, and the reference doesn't change. Non-mutating methods: spread, `concat`, `filter`, `map`, `slice`, `toSorted()`. Removal: `items.filter(i => i.id !== id)`.",
    sources: ["react-updating-arrays"],
  },
  {
    question: "Which value is best for `key` in a list?",
    options: [
      "The item's index in the array — it's always unique within the list",
      "A stable unique identifier from the data, such as `id`",
      "`Math.random()` or `crypto.randomUUID()` on every render",
    ],
    answer: 1,
    explanation:
      "`key` helps React match elements between renders. An index breaks on insertion, removal and sorting: input state and DOM \"move\" to other items. A random key changes every render — React recreates all elements and loses their state.",
    sources: ["react-lists", "react-preserving-state"],
  },
  {
    question: "What is rendered if `items = []`?",
    code: `<div>{items.length && <List items={items} />}</div>`,
    options: ["Nothing is rendered", "The digit `0` is rendered", "The text `false` is rendered"],
    answer: 1,
    explanation:
      "`0 && x` returns `0`, and React renders numbers as text (unlike `false`, `null`, `undefined`). Write an explicit boolean condition: `items.length > 0 && ...` or a ternary `items.length ? <List /> : null`.",
    sources: ["react-conditional"],
  },
  {
    question: "What's wrong with `<button onClick={handleClick()}>`?",
    options: [
      "Nothing, it's the standard syntax",
      "The function is called immediately during render, not on click",
      "In JSX, handlers are written as a string: `onClick=\"handleClick()\"`",
    ],
    answer: 1,
    explanation:
      "`onClick` needs a function, not the result of calling it. Correct: `onClick={handleClick}`, or `onClick={() => handleClick(id)}` if you need arguments. If `handleClick` changes state, calling it during render causes an infinite loop.",
    sources: ["react-events"],
  },
  {
    question: "How do you cancel the default form submission behavior in React?",
    options: [
      "Return `false` from the form's `onSubmit` handler",
      "Call `e.preventDefault()` in the `onSubmit` handler",
      "Add a `noSubmit` attribute to the `<form>` tag in JSX",
    ],
    answer: 1,
    explanation:
      "In React, handlers receive a synthetic event with the same API as the native one. `return false`, as in old inline HTML handlers, doesn't work here. You can stop bubbling with `e.stopPropagation()`.",
    sources: ["react-events"],
  },
  {
    question: "What is a controlled input?",
    options: [
      "A field whose value is stored in state: `value` + `onChange`",
      "A field managed by the browser, with React reading its value via `ref`",
      "A field with the `required` attribute, controlled by browser validation",
    ],
    answer: 0,
    explanation:
      "In a controlled field, state is the source of truth: `value={text}` and `onChange={e => setText(e.target.value)}`. This makes it easy to validate and format input on the fly. An uncontrolled field keeps its value in the DOM (`defaultValue`, read via `ref` or `FormData`).",
    sources: ["react-input"],
  },
  {
    question: "React warns: \"You provided a `value` prop to a form field without an `onChange` handler\". What happened?",
    options: [
      "The field became read-only: `value` is set but `onChange` isn't",
      "A controlled field can't be used inside a `<form>` tag",
      "The `value` must be a number, but a string was passed",
    ],
    answer: 0,
    explanation:
      "If you set `value` without `onChange`, React resets the field to that value on every render, and the user can't type. Fixes: add `onChange`, use `defaultValue` for an uncontrolled field, or set `readOnly` explicitly.",
    sources: ["react-input"],
  },
  {
    question: "Two sibling components need the same data, which they can change. What should you do first?",
    options: [
      "Copy the state into both components and sync them via `useEffect`",
      "Lift the state to the common parent and pass the value and callbacks via props",
      "Add Redux right away",
    ],
    answer: 1,
    explanation:
      "Lifting state up is a basic technique: data should have a single source of truth in the closest common ancestor. Duplicating state and syncing it with effects leads to desync and extra renders. Global stores are needed when state is really used in many places in the tree.",
    sources: ["react-sharing-state"],
  },
  {
    question: "What is prop drilling?",
    options: [
      "Passing props through intermediate components that don't need them",
      "Runtime type checking of props via `PropTypes`",
      "A render optimization: passing props through `React.memo`",
    ],
    answer: 0,
    explanation:
      "When data from the root is needed deep down, you have to pass it through every level. It's inconvenient but not always a problem. Solutions: composition (pass ready elements via `children`), Context, global stores.",
    sources: ["react-context-learn", "react-sharing-state"],
  },
  {
    question: "When does the effect `useEffect(() => { ... }, [])` run?",
    options: [
      "Before every render of the component, to prepare data",
      "After mounting (twice in dev with StrictMode)",
      "Only when the component unmounts, like `componentWillUnmount`",
    ],
    answer: 1,
    explanation:
      "An empty dependency array means \"synchronize after mounting\". Effects always run after painting, not before. In development, StrictMode mounts, unmounts and mounts the component again to verify that the effect's cleanup is written correctly.",
    sources: ["react-useEffect", "react-strict-mode"],
  },
  {
    question: "When does an effect without a dependency array run: `useEffect(() => { ... })`?",
    options: [
      "Only once — right after the component mounts",
      "After every render of the component",
      "Never: without a dependency array the effect doesn't run",
    ],
    answer: 1,
    explanation:
      "Without the second argument, the effect runs after every render. With `[]` — only after mounting. With `[a, b]` — after mounting and whenever `a` or `b` changes (compared via `Object.is`).",
    sources: ["react-useEffect", "react-sync-effects"],
  },
  {
    question: "When is the function returned from `useEffect` called?",
    options: [
      "Before the effect re-runs and when the component unmounts",
      "Right after the effect runs, in the same frame",
      "Only if an exception was thrown inside the effect",
    ],
    answer: 0,
    explanation:
      "The cleanup function undoes what the effect set up: it unsubscribes from events, clears timers, cancels requests. React calls it before the next run of the effect with new dependencies and when the component is removed.",
    sources: ["react-useEffect", "react-sync-effects"],
  },
  {
    question: "How does `useRef` differ from `useState`?",
    options: [
      "Changing `ref.current` doesn't trigger a re-render",
      "`useRef` can only be used for DOM references",
      "The `useRef` value is reset on every render",
    ],
    answer: 0,
    explanation:
      "`useRef` keeps a mutable value between renders without causing a re-render. It's used for DOM references (`<input ref={inputRef}>`), timer ids and previous values. If a value affects what's on screen, it belongs in state.",
    sources: ["react-useRef", "react-refs-learn"],
  },
  {
    question: "Which rule of hooks is broken?",
    code: `function Profile({ id }) {
  if (!id) return null;
  const [data, setData] = useState(null);
  // ...
}`,
    options: [
      "Hooks can't be used in components that accept props",
      "The hook is called after a conditional `return` — the hook order changes",
      "Nothing is broken: an early `return` with hooks is allowed",
    ],
    answer: 1,
    explanation:
      "React matches state to hooks by their call order. If a hook isn't called during some render (because of an early `return`, a condition or a loop), the order breaks. Call hooks at the top level, before any conditional exits.",
    sources: ["react-rules-of-hooks"],
  },
  {
    question: "Why must a custom hook's name start with `use`?",
    options: [
      "Otherwise the bundler can't export it from the module",
      "That's how the linter and React know it contains hooks",
      "The `use` prefix enables automatic memoization of the result",
    ],
    answer: 1,
    explanation:
      "The `use` prefix is a convention that `eslint-plugin-react-hooks` and the React Compiler rely on. By itself it doesn't memoize anything. A function with no hooks inside shouldn't be named `use...` — it's a regular utility.",
    sources: ["react-custom-hooks", "react-rules-of-hooks"],
  },
  {
    question: "When does a child component re-render by default?",
    options: [
      "Only when its props change (by reference)",
      "When the parent re-renders, even if the props are the same",
      "Only when its own state or context changes",
    ],
    answer: 1,
    explanation:
      "A parent render re-renders the whole subtree by default. Other causes: a change in its own state and a change in a context it reads. `React.memo` (or the React Compiler automatically) lets you skip rendering when props are equal. A re-render isn't a DOM change: the DOM changes only if there's a difference.",
    sources: ["react-render-commit", "react-memo"],
  },
  {
    question: "How do you set an inline style in JSX?",
    options: [
      "`style=\"color: red; font-size: 14px\"`",
      "`style={{ color: \"red\", fontSize: 14 }}`",
      "`style={[\"color: red\", \"font-size: 14px\"]}`",
    ],
    answer: 1,
    explanation:
      "`style` takes an object with camelCase properties. The outer braces embed an expression, the inner ones are an object literal. For most properties, numeric values are interpreted as pixels (`fontSize: 14` → `14px`).",
    sources: ["react-dom-common"],
  },
  {
    question: "What steps are needed to pass data via Context?",
    options: [
      "`createContext` → a provider with `value` → `useContext` in a descendant",
      "Declare a global variable in a module and import it into components",
      "Pass the data in `children` of every component on the way down",
    ],
    answer: 0,
    explanation:
      "`const ThemeContext = createContext('light')` → `<ThemeContext value={theme}>` (in React 19 you can omit `.Provider`) → `useContext(ThemeContext)` in any descendant. When `value` changes, all components reading this context re-render.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "What does `useContext(MyContext)` return if there's no provider above the component?",
    options: [
      "Always `undefined`; the default value is ignored",
      "The default value from `createContext(defaultValue)`",
      "React throws a \"Provider is missing\" error",
    ],
    answer: 1,
    explanation:
      "The default value is used when there's no provider higher in the tree. It's often set to `null`, with a wrapper hook that throws a clear error: \"useAuth must be used within AuthProvider\".",
    sources: ["react-useContext", "react-context-learn"],
  },
  {
    question: "Why does `<StrictMode>` call render and effects twice in development?",
    options: [
      "To warm up the cache and speed up the first page load",
      "To reveal impure renders and effects without cleanup",
      "It's a known React 18 bug; it's better to disable StrictMode",
    ],
    answer: 1,
    explanation:
      "The double call helps find side effects during render (mutations, requests) and missing cleanup in effects. It doesn't happen in the production build. If the double call breaks something, the code has a bug that will show up later anyway.",
    sources: ["react-strict-mode", "react-pure"],
  },
  {
    question: "What is `React.lazy` used for?",
    options: [
      "For lazy-loading a component's code as a separate chunk",
      "For deferring a component's render until it enters the viewport",
      "For deferring state updates",
    ],
    answer: 0,
    explanation:
      "`const Admin = lazy(() => import('./Admin'))` moves the component into a separate JS chunk loaded on first render. This shrinks the initial bundle. Showing content as you scroll is a different task (Intersection Observer).",
    sources: ["react-lazy", "mdn-dynamic-import"],
  },
  {
    question: "What does `React.lazy` need in order to work?",
    options: [
      "Wrap it (or an ancestor) in `<Suspense fallback>`",
      "Call `lazy` inside `useEffect` after mounting",
      "Add an `async` attribute to the lazy component",
    ],
    answer: 0,
    explanation:
      "While the code loads, the component \"suspends\" and the nearest `<Suspense>` shows its `fallback`. Declare `lazy` at module level, not inside a component — otherwise every render creates a new component and loses state. The module must have a `default` export.",
    sources: ["react-lazy", "react-suspense"],
  },
  {
    question: "Why does `lazy(() => import('./Chart'))` fail if `Chart.tsx` has only `export function Chart`?",
    options: [
      "`lazy` expects a module with a `default` export",
      "`lazy` doesn't support TypeScript `.tsx` files",
      "A component for `lazy` must be a class component",
    ],
    answer: 0,
    explanation:
      "The promise from `import()` must resolve to an object with a `default` field. For a named export, map it: `lazy(() => import('./Chart').then(m => ({ default: m.Chart })))`. TypeScript and function components are fully supported.",
    sources: ["react-lazy"],
  },
  {
    question: "What's dangerous about `dangerouslySetInnerHTML`?",
    options: [
      "It slows rendering dozens of times due to parsing",
      "It inserts HTML without escaping — an XSS risk",
      "It works only in React class components",
    ],
    answer: 1,
    explanation:
      "React normally escapes strings, so `{userInput}` is safe. `dangerouslySetInnerHTML={{ __html }}` inserts markup as is, and `<img onerror=...>` from user data runs a script. If you really need HTML (e.g. from a CMS), clean it with a sanitizer (DOMPurify).",
    sources: ["react-dom-common", "mdn-xss"],
  },
  {
    question: "How do you attach an app to a DOM element in React 18+?",
    options: [
      "`ReactDOM.render(<App />, el)`",
      "`createRoot(el).render(<App />)`",
      "`React.mount(<App />, el)`",
    ],
    answer: 1,
    explanation:
      "`createRoot` from `react-dom/client` enables React 18+ concurrent features. `ReactDOM.render` is deprecated and removed in React 19. To hydrate server-rendered HTML, use `hydrateRoot`. Frameworks like Next.js do this automatically.",
    sources: ["react-createRoot", "react-18"],
  },
  {
    question: "What is a \"pure\" component in React terms?",
    options: [
      "A component with no styles and no CSS side dependencies",
      "A component with no side effects in render and the same JSX for the same input",
      "Any component that extends `React.PureComponent`",
    ],
    answer: 1,
    explanation:
      "Rendering must be a pure computation: no mutating external variables, no requests, no DOM changes. Side effects belong in event handlers or `useEffect`. StrictMode, concurrent rendering and the React Compiler rely on purity.",
    sources: ["react-pure"],
  },
  {
    question: "How do you render a list of users from the `users` array?",
    options: [
      "`{users.forEach(u => <li key={u.id}>{u.name}</li>)}`",
      "`{users.map(u => <li key={u.id}>{u.name}</li>)}`",
      "`{for (const u of users) <li>{u.name}</li>}`",
    ],
    answer: 1,
    explanation:
      "`map` returns a new array of elements that React renders. `forEach` returns `undefined`, so nothing appears. `for` is a statement and can't be written inside `{}`. And don't forget `key`.",
    sources: ["react-lists"],
  },
  {
    question: "What is Redux?",
    options: [
      "A library for REST API requests with response caching",
      "A global state store: store, actions, reducers",
      "A React built-in hook for global app state",
    ],
    answer: 1,
    explanation:
      "In Redux, state lives in a single store, changes only by dispatching actions, and new state is computed by pure reducer functions. This gives predictability, convenient debugging (Redux DevTools, time travel) and middleware. Redux is a separate library, connected to React via `react-redux`.",
    sources: ["redux-essentials"],
  },
  {
    question: "What's required of a reducer in classic Redux (without Immer)?",
    options: [
      "To be pure and return new state without mutations",
      "To be async and make API requests on its own",
      "To change `state` directly and return nothing",
    ],
    answer: 0,
    explanation:
      "`(state, action) => newState` with no side effects: no requests, random numbers or mutations. Async logic goes into thunks or RTK Query. In Redux Toolkit you can write \"mutating\" code — Immer turns it into immutable updates under the hood.",
    sources: ["redux-essentials", "redux-style-guide"],
  },
  {
    question: "What does `configureStore` from Redux Toolkit do?",
    options: [
      "Creates a store with sensible defaults: thunk, DevTools",
      "Generates reducers and actions from a data schema description",
      "Connects the store to React components without `<Provider>`",
    ],
    answer: 0,
    explanation:
      "`configureStore({ reducer: { todos: todosReducer } })` combines reducers, adds the `redux-thunk` middleware, hooks up Redux DevTools and, in development, checks for accidental mutations and non-serializable values. Connecting to React is still done via `<Provider store={store}>`.",
    sources: ["rtk-configureStore", "redux-why-rtk"],
  },
  {
    question: "What are `useSelector` and `useDispatch` for?",
    options: [
      "`useSelector` reads data from the store, `useDispatch` gives you `dispatch`",
      "`useSelector` finds a DOM element, `useDispatch` fires a DOM event",
      "Both hooks create a separate local store for the component",
    ],
    answer: 0,
    explanation:
      "`const todos = useSelector(state => state.todos)` re-renders the component only if the selector result changed (by reference). `const dispatch = useDispatch(); dispatch(added(todo))`. TypeScript projects create typed versions `useAppSelector` and `useAppDispatch`.",
    sources: ["react-redux-hooks"],
  },
  {
    question: "What does `createSlice` generate?",
    options: [
      "Only a reducer; action creators must be written by hand",
      "A reducer and action creators for each case reducer",
      "A React component and a hook to display the slice's state",
    ],
    answer: 1,
    explanation:
      "`createSlice({ name: 'todos', initialState, reducers: { added(state, action) {...} } })` returns `todosSlice.reducer` and `todosSlice.actions.added` with the type `'todos/added'`. This removes classic Redux boilerplate with type constants and switch.",
    sources: ["rtk-createSlice"],
  },
  {
    question: "What problem does TanStack Query primarily solve?",
    options: [
      "Server state: fetching, caching, background data updates",
      "Routing between pages with data preloading",
      "Global UI state: whether a modal is open, the current theme",
    ],
    answer: 0,
    explanation:
      "Server data lives on the backend and can become stale. TanStack Query handles caching, retries, deduplication, refetching on window focus, pagination and mutations. Client UI state stays in `useState`, Context or Zustand/Redux.",
    sources: ["tq-overview"],
  },
  {
    question: "What must you pass to `useQuery`?",
    options: [
      "`url`, `method` and `headers`",
      "`queryKey` and `queryFn`",
      "`store`, `reducer` and `action`",
    ],
    answer: 1,
    explanation:
      "`useQuery({ queryKey: ['todos', id], queryFn: () => fetchTodo(id) })`. The key identifies data in the cache: everything the request depends on must be in the key — then the request reruns when `id` changes. `queryFn` is any function returning a promise; the library isn't tied to `fetch`.",
    sources: ["tq-queries", "tq-query-keys"],
  },
  {
    question: "How do `isPending` and `isFetching` differ in TanStack Query v5?",
    options: [
      "They're synonyms: both are true while a request is in flight",
      "`isPending` — no data yet, `isFetching` — any request is in flight",
      "`isPending` — the request failed, `isFetching` — it succeeded",
    ],
    answer: 1,
    explanation:
      "`isPending` (status `pending`) means there's no data in the cache yet — show a skeleton. `isFetching` is true for every request, including background refetches of existing data — a small indicator fits here. In v4, `isLoading` was used instead of `isPending`.",
    sources: ["tq-queries"],
  },
  {
    question: "What must you do before using `useQuery` in an app?",
    options: [
      "Create a `QueryClient` and wrap the app in its provider",
      "Nothing: `useQuery` creates a global cache on its first call",
      "Add a Redux store where TanStack Query keeps its cache",
    ],
    answer: 0,
    explanation:
      "`QueryClient` holds the cache and default settings, and the provider makes it available to hooks. Create the client once (outside a component or via `useState`), otherwise the cache resets on every render. TanStack Query doesn't need Redux.",
    sources: ["tq-overview"],
  },
];

export default questions;
