import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Which pattern was applied in this refactoring?",
    code: `// before
function price(type, sum) {
  if (type === "vip") return sum * 0.8;
  if (type === "sale") return sum * 0.9;
  return sum;
}
// after
const discounts = { vip: s => s * 0.8, sale: s => s * 0.9, regular: s => s };
const price = (type, sum) => discounts[type](sum);`,
    options: [
      "Strategy: the algorithms were moved into interchangeable functions",
      "Singleton: all discounts are stored in one shared global object",
      "Template Method: the base calculation is overridden in subclasses",
    ],
    answer: 0,
    explanation:
      "Each discount is a separate strategy, and a new one is added without editing the `price` function (also an example of OCP). In JS, a strategy is often just an object of functions instead of a class hierarchy.",
    sources: ["rg-strategy", "wiki-solid-uk"],
  },
  {
    question: "Why does `subscribe` in an Observer implementation usually return an unsubscribe function?",
    code: `function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}`,
    options: [
      "So the subscriber can easily unsubscribe and avoid a memory leak",
      "So the subscription fires only once and then removes itself",
      "So the subject can call the subscriber synchronously, without the event loop",
    ],
    answer: 0,
    explanation:
      "The returned function fits neatly into `useEffect` cleanup: `useEffect(() => store.subscribe(fn), [])`. Without unsubscribing, the subject keeps references to callbacks of unmounted components — a leak and extra calls. Redux, Zustand and `useSyncExternalStore` work this way.",
    sources: ["rg-observer", "react-useSyncExternalStore"],
  },
  {
    question: "How does Decorator differ from Proxy if their structure is similar?",
    options: [
      "By intent: Decorator adds behavior, Proxy controls access to the object",
      "Decorator works only with functions, Proxy only with classes",
      "Proxy always creates a new object, Decorator always mutates the original",
    ],
    answer: 0,
    explanation:
      "Both wrap an object with the same interface. Decorators are usually stacked to build up functionality (logging + cache + retry). A proxy manages lifecycle and access: lazy loading, permission checks, a remote object. Many patterns differ precisely by their goal.",
    sources: ["rg-decorator", "rg-proxy"],
  },
  {
    question: "How does Adapter differ from Facade?",
    options: [
      "Adapter fits an interface to the expected one, Facade simplifies working with a subsystem",
      "Adapter simplifies a complex subsystem, while Facade changes the data format",
      "It's the same pattern, just called differently in different books",
    ],
    answer: 0,
    explanation:
      "An adapter usually wraps one object and makes it compatible with existing code. A facade defines a new, simpler interface over many objects. In practice, an API layer often combines both: a facade over HTTP and adapters for the data.",
    sources: ["rg-adapter", "rg-facade"],
  },
  {
    question: "When is an Abstract Factory appropriate instead of a simple factory?",
    options: [
      "When you need families of related, compatible objects",
      "When you need to create objects without calling a constructor at all",
      "When an object must exist as a single instance",
    ],
    answer: 0,
    explanation:
      "Example: a UI kit for two platforms — the factory creates a button, an input and a modal in one style, and they can't be mixed. A simple factory picks one product by a parameter. Don't introduce an abstract factory if there's only one family.",
    sources: ["rg-abstract-factory", "rg-factory-method"],
  },
  {
    question: "What's dangerous about a module-level singleton (`export const cache = new Map()`) in an SSR app?",
    options: [
      "On the server the module is shared by all requests, so users' data gets mixed",
      "During SSR modules aren't cached, so the singleton is recreated on every import",
      "SSR doesn't support ES modules, so such code won't build",
    ],
    answer: 0,
    explanation:
      "In the browser, a module variable lives within one tab. A server process serves thousands of users, and a shared module-level cache or store can serve one user's data to another. Request state is created per request (e.g. React's `cache()`, a `QueryClient` per request).",
    sources: ["rg-singleton", "tq-ssr", "react-cache"],
  },
  {
    question: "How do you implement undo/redo with the Command pattern?",
    options: [
      "Keep stacks of commands, each with `execute` and `undo`",
      "Save a copy of the whole DOM after every user action",
      "Reload the page and replay all actions except the last one",
    ],
    answer: 0,
    explanation:
      "An executed command goes onto the `undo` stack; undoing calls `undo()` and moves the command to the `redo` stack. A new action clears `redo`. An alternative for immutable state is the Memento pattern: keep previous versions of the state.",
    sources: ["rg-command", "rg-memento"],
  },
  {
    question: "Why are `isLoading`, `isError`, `isSuccess` flags worse than an explicit state?",
    code: `type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: string };`,
    options: [
      "Flags allow impossible combinations, while an explicit state allows only valid ones",
      "Flags take more memory than a single string `status` field",
      "TypeScript can't type several boolean fields at once",
    ],
    answer: 0,
    explanation:
      "Three boolean flags give 8 combinations, including meaningless ones like \"loading and error at once\". A discriminated union is essentially the State pattern / a finite state machine: transitions are explicit, and `data` is available only in `success`.",
    sources: ["rg-state", "ts-narrowing"],
  },
  {
    question: "What's the risk of a global event bus as an implementation of Mediator?",
    options: [
      "Data flows are implicit: it's unclear who sends an event and why",
      "An event bus can't pass data along with an event",
      "A bus can't be used together with React components",
    ],
    answer: 0,
    explanation:
      "Decoupling via event names is convenient, but as the app grows, connections hide in strings, cycles appear, and \"ghost\" subscribers emerge. That's why React apps usually prefer explicit flows: props, Context, a store with selectors.",
    sources: ["rg-mediator", "pd-mediator"],
  },
  {
    question: "Which pattern do axios interceptors or `fetch` wrappers implement?",
    options: [
      "Chain of Responsibility: the request passes through handlers",
      "Abstract Factory: each interceptor creates a new HTTP client",
      "Singleton: the interceptor guarantees a single active request",
    ],
    answer: 0,
    explanation:
      "Interceptors add a token, log, refresh the session on 401, transform errors — each is responsible for its own step and passes the request on. Order matters and should be fixed explicitly.",
    sources: ["rg-chain"],
  },
  {
    question: "How do you render a comment tree of arbitrary depth?",
    code: `function Comment({ comment }) {
  return (
    <li>
      {comment.text}
      {comment.replies.length > 0 && (
        <ul>{comment.replies.map(r => <Comment key={r.id} comment={r} />)}</ul>
      )}
    </li>
  );
}`,
    options: [
      "With a recursive component — the Composite pattern for UI",
      "Only as a flat list; recursion is forbidden in React",
      "With a `useEffect` that inserts nested replies into the DOM",
    ],
    answer: 0,
    explanation:
      "Nodes and leaves are handled the same way, so the component calls itself for its children. For very deep or large trees, add virtualization or \"Show more\", and store the data normalized.",
    sources: ["rg-composite"],
  },
  {
    question: "How does a generator help implement an Iterator for a paginated API?",
    options: [
      "It yields items one by one and requests the next page lazily",
      "It loads all pages in parallel in separate threads",
      "It caches API responses between page reloads",
    ],
    answer: 0,
    explanation:
      "An async generator hides cursors and page numbers: the consumer writes `for await (const item of allItems())` and can stop at any time without loading anything extra. Traversal logic is separated from processing logic.",
    sources: ["rg-iterator", "jsinfo-generators"],
  },
  {
    question: "How does Template Method differ from Strategy?",
    options: [
      "Template Method varies steps via inheritance, Strategy via composition",
      "Strategy varies steps via inheritance, while Template Method uses composition",
      "Template Method is chosen at runtime, Strategy at compile time",
    ],
    answer: 0,
    explanation:
      "Template Method fixes the algorithm's skeleton in a base class, and the variation is set by a subclass (statically). A strategy is passed to an object and can change at runtime. In JS, composition is usually preferred: pass step functions.",
    sources: ["rg-template-method", "rg-strategy"],
  },
  {
    question: "Why does immutable state simplify the Memento pattern?",
    options: [
      "Old versions don't change, so a memento is just a reference to a previous object",
      "Immutable objects are saved to `localStorage` automatically",
      "Immutability forbids undo, so mementos aren't needed",
    ],
    answer: 0,
    explanation:
      "With mutations, a memento requires a deep copy. With immutable updates (spread, Immer), unchanged parts are reused (structural sharing), and change history costs almost nothing. That's how time travel in Redux DevTools works.",
    sources: ["rg-memento", "rtk-immer"],
  },
  {
    question: "Which pattern does a Babel or ESLint plugin use when it walks the AST with `Identifier()` and `CallExpression()` methods?",
    options: [
      "Visitor: operations on tree nodes are moved into a separate object",
      "Builder: the plugin creates a new tree from the source one step by step",
      "Adapter: the plugin converts the AST to another compiler's format",
    ],
    answer: 0,
    explanation:
      "Visitor lets you add new operations over a structure (checks, transformations) without changing the node classes. The traverser calls the visitor's method for each node type.",
    sources: ["rg-visitor"],
  },
  {
    question: "Notifications come in three types and are sent over three channels (email, push, SMS). Which pattern saves you from 9 classes?",
    options: [
      "Bridge: the notification type and delivery channel evolve independently",
      "Singleton: all notifications are sent through one instance",
      "Iterator: channels are iterated in turn for each type",
    ],
    answer: 0,
    explanation:
      "Bridge separates the abstraction (notification type) from the implementation (channel) and links them via composition: 3 + 3 classes instead of 3 × 3. A new channel is added without changing the types.",
    sources: ["rg-bridge"],
  },
  {
    question: "Why have a layer of \"repositories\" or API services on the frontend instead of calling `fetch` directly in components?",
    options: [
      "Components don't know about transport and API format, which is easy to replace and mock",
      "Without a separate layer, the browser doesn't allow caching server responses",
      "It's a React requirement: `fetch` can't be called inside components",
    ],
    answer: 0,
    explanation:
      "A repository hides where data comes from (REST, GraphQL, cache, mocks) and returns domain objects. When an endpoint changes, one place is edited, and tests replace the whole repository. TanStack Query hooks often call exactly such functions.",
    sources: ["mf-repository", "rg-facade"],
  },
  {
    question: "How do you inject a dependency into React components so you can swap the API client in tests?",
    options: [
      "Pass the client via a Context provider and wrap with a different value in tests",
      "Import the client directly and change a global variable in tests",
      "Create a new client inside every component during render",
    ],
    answer: 0,
    explanation:
      "Context is React's built-in DI mechanism: `<ApiProvider client={mockClient}>` in tests and Storybook, the real client in the app. `QueryClientProvider` and the Redux store provider work the same way.",
    sources: ["mf-injection", "react-context-learn"],
  },
  {
    question: "Which of these situations violates the Liskov Substitution Principle?",
    options: [
      "A subclass overrides a method and throws \"Not implemented\"",
      "A subclass adds a new method that the parent doesn't have",
      "A subclass calls the parent implementation via `super`",
    ],
    answer: 0,
    explanation:
      "Code working with the base type doesn't expect an exception — substitution breaks the program. It's usually a sign that the hierarchy is wrong and the interface should be split (ISP). LSP doesn't forbid adding new methods.",
    sources: ["wiki-solid-uk", "wiki-solid"],
  },
  {
    question: "A `UserCard` component takes `user: User` (30 fields) but uses only the name and avatar. Which principle is violated?",
    options: [
      "Interface Segregation: the component depends on data it doesn't need",
      "Open/Closed: the component can't be extended without modification",
      "Single Responsibility: the component displays user data",
    ],
    answer: 0,
    explanation:
      "With a narrow interface `{ name, avatarUrl }`, the component can be used for a comment author or a chat participant, and tests don't need a full object. Also, changes to the `User` type won't affect the component.",
    sources: ["wiki-solid-uk"],
  },
  {
    question: "What does the Law of Demeter say about `order.customer.address.city.name`?",
    options: [
      "The code knows about objects that are too far away — talk to your neighbors",
      "The chain is fine if all the objects are created in one module",
      "It's a violation only when using optional chaining `?.`",
    ],
    answer: 0,
    explanation:
      "\"Talk only to your friends\": long chains tie code to the internals of many objects, and a change in any of them breaks the caller. The fix is a method or selector like `getDeliveryCity(order)`.",
    sources: ["wiki-demeter"],
  },
  {
    question: "What is unidirectional data flow in the Flux architecture?",
    options: [
      "Action → dispatcher → store → view, in a loop",
      "Data is passed only from server to client, never back",
      "Components exchange data directly in both directions via references",
    ],
    answer: 0,
    explanation:
      "Flux appeared at Facebook as a response to tangled two-way connections in MVC. The view doesn't change the store directly; it dispatches an action. Redux simplified the idea: one store and pure reducers instead of a dispatcher and several stores.",
    sources: ["flux", "redux-essentials"],
  },
  {
    question: "How does MVVM differ from React's approach?",
    options: [
      "MVVM uses two-way binding, React uses one-way data flow",
      "MVVM has no data model, while in React a model is mandatory",
      "MVVM is used only on the server, React only on the client",
    ],
    answer: 0,
    explanation:
      "Angular and Vue support two-way binding (`v-model`, `[(ngModel)]`): field changes automatically go into the model. In React, the value and handler are wired explicitly (`value` + `onChange`) — more code, but a more transparent data flow.",
    sources: ["mf-ui-archs"],
  },
  {
    question: "Which patterns can you see in Redux?",
    options: [
      "Command (actions), Observer (subscribe), a fold (the reducer)",
      "Singleton, Bridge and Visitor in every slice",
      "Abstract Factory and Template Method for every reducer",
    ],
    answer: 0,
    explanation:
      "An action is an object describing an intent (like a Command), the store notifies subscribers (Observer), the reducer folds a stream of actions into state, and middleware forms a chain of responsibility. This helps explain where Redux's strengths and limitations come from.",
    sources: ["redux-essentials", "rg-command"],
  },
  {
    question: "What is the order of Feature-Sliced Design layers from top to bottom?",
    options: [
      "app → pages → widgets → features → entities → shared",
      "shared → entities → features → widgets → pages → app",
      "pages → app → shared → features → widgets → entities",
    ],
    answer: 0,
    explanation:
      "In FSD, a module can import only from layers below it: `features` use `entities` and `shared`, but not `widgets`. This prevents circular dependencies and makes the impact of changes predictable.",
    sources: ["fsd"],
  },
  {
    question: "Why does every slice in FSD have a public API (`index.ts`)?",
    options: [
      "So outside code depends only on the slice's explicit exports",
      "So the bundler can load a slice in one request instead of several",
      "So TypeScript can check the types inside the slice",
    ],
    answer: 0,
    explanation:
      "A public API is the module's contract (a Facade): the internal structure can change as long as the exports don't. A linter (Steiger, eslint plugins) forbids \"deep\" imports that bypass `index`.",
    sources: ["fsd", "rg-facade"],
  },
  {
    question: "How can barrel files (`index.ts` re-exporting everything) do harm?",
    options: [
      "They can slow down builds and tests and cause circular imports",
      "Barrel files are forbidden in ES modules and don't work in the browser",
      "They make all exported functions private",
    ],
    answer: 0,
    explanation:
      "Importing one function from a large barrel can force the bundler and test runner to parse the whole module graph, and mutual re-exports easily form cycles. Fixes: narrow public APIs, direct imports within a module, `optimizePackageImports` in Next.js.",
    sources: ["next-package-bundling", "fsd"],
  },
  {
    question: "What's the main rule of Clean Architecture?",
    options: [
      "Dependencies point inward: business rules don't know about UI, DB or frameworks",
      "Each layer should live in a separate repository",
      "The user interface is the center of the system; everything depends on it",
    ],
    answer: 0,
    explanation:
      "Entities and use cases are at the center, while frameworks, DB and UI are in the outer circles and depend on the inner ones. Then business logic can be tested without a browser, and the framework changed without rewriting the rules. For the frontend, the approach is often simplified.",
    sources: ["clean-architecture", "wiki-dip"],
  },
  {
    question: "Where should business rules (e.g. discount calculation) live in a frontend app?",
    options: [
      "In pure functions of a domain layer used by components and hooks",
      "Right in the component's JSX, so the logic sits next to the rendering",
      "In CSS via variables, so as not to burden JavaScript",
    ],
    answer: 0,
    explanation:
      "Rules scattered across components get duplicated and are hard to test. Pure functions in `entities`/`domain` are reused across screens, on the server and in tests without rendering.",
    sources: ["clean-architecture", "fsd"],
  },
  {
    question: "What does Atomic Design describe?",
    options: [
      "A UI hierarchy: atoms → molecules → organisms → templates → pages",
      "Splitting the bundle into atomic chunks for parallel loading",
      "State management via atoms, as in Jotai and Recoil",
    ],
    answer: 0,
    explanation:
      "Brad Frost's methodology for design systems: a button and an input are atoms, a search field with a button is a molecule, a header is an organism. Atoms in Jotai are a different concept (units of state).",
    sources: ["storybook", "fsd"],
  },
  {
    question: "What is shotgun surgery?",
    options: [
      "One change requires edits in many different places in the code",
      "Running many tests in parallel to speed up CI",
      "Deploying several services at the same time",
    ],
    answer: 0,
    explanation:
      "For example, adding a new order status requires edits in 12 files. It's a sign that one piece of knowledge is smeared across the code (a violation of DRY and cohesion). The cure is gathering the related logic into one module.",
    sources: ["rg-smells"],
  },
  {
    question: "What is feature envy?",
    options: [
      "A function works more with another object's data than with its own",
      "A function copied into different modules because it's so useful",
      "A function that calls itself recursively too often",
    ],
    answer: 0,
    explanation:
      "If an `OrderView` method keeps reaching into `customer`'s fields and computing things from them, the logic should move closer to the data — into the customer module. This increases cohesion and simplifies changes.",
    sources: ["rg-smells"],
  },
  {
    question: "What is primitive obsession, and how is it treated?",
    options: [
      "Domain concepts are bare strings and numbers; treated with value types",
      "Using `number` instead of `bigint` for large numbers",
      "Giving up classes in favor of functions and primitives",
    ],
    answer: 0,
    explanation:
      "`userId: string`, `price: number` are easy to confuse with other strings and numbers. Value objects (`Money`), branded TS types (`UserId`) and enum-like unions make such mistakes impossible and gather validation in one place.",
    sources: ["rg-smells", "ts-type-compatibility"],
  },
  {
    question: "Why do people say \"duplication is cheaper than the wrong abstraction\"?",
    options: [
      "Premature generalization accumulates flags and couples unrelated cases",
      "Copied code runs faster because there are no function calls",
      "JavaScript engines don't optimize abstractions well",
    ],
    answer: 0,
    explanation:
      "A shared component for two similar screens gradually gets `isAdmin`, `variant`, `hideFooter`… and becomes worse than copies. The AHA principle (Avoid Hasty Abstractions) and the \"rule of three\": generalize when the repetition has become obvious.",
    sources: ["wiki-dry", "mf-yagni"],
  },
  {
    question: "What is the Null Object pattern?",
    code: `const noopLogger = { info() {}, error() {} };
function createService(logger = noopLogger) { /* ... */ }`,
    options: [
      "A stub with the same interface instead of `null` checks",
      "An object whose properties are all `null` by default",
      "A way to remove an object from memory by assigning `null` to it",
    ],
    answer: 0,
    explanation:
      "Instead of `if (logger) logger.info(...)` all over the code, a safe stub is passed in. This simplifies the code and eliminates \"cannot read property of null\" errors.",
    sources: ["rg-smells", "mf-injection"],
  },
  {
    question: "How do you implement lazy initialization of a heavy object?",
    code: `let client;
export function getClient() {
  return (client ??= createHeavyClient());
}`,
    options: [
      "Create the object on first access and reuse it afterwards",
      "Create the object in a `setTimeout` so it doesn't block loading",
      "Create a new object on every `getClient` call",
    ],
    answer: 0,
    explanation:
      "Lazy initialization saves startup time and resources if the object may not be needed. It's often combined with dynamic `import()` for heavy SDKs. Remember SSR: on the server such a module-level cache is shared by all requests.",
    sources: ["rg-singleton", "rg-proxy"],
  },
  {
    question: "What's wrong with mixins (`Object.assign(Class.prototype, mixin)`)?",
    options: [
      "Implicit dependencies, name clashes, unclear origin of methods",
      "Mixins are forbidden in strict mode and don't work in modules",
      "Mixins copy only methods, not properties",
    ],
    answer: 0,
    explanation:
      "Methods \"appear\" in the class from who knows where, and mixins can overwrite each other and rely on each other's fields. React dropped mixins back in the class component era; today hooks and composition solve the same problem.",
    sources: ["pd-mixin", "wiki-composition"],
  },
  {
    question: "What is the Registry pattern, using plugins as an example?",
    code: `const renderers = new Map();
export const register = (type, fn) => renderers.set(type, fn);
export const render = (block) => renderers.get(block.type)?.(block);`,
    options: [
      "Handlers register by key, and the core doesn't know about them",
      "All of the app's data is written to the Windows registry",
      "Components register in the DOM as Custom Elements",
    ],
    answer: 0,
    explanation:
      "This is how extensible systems are built: CMS editor blocks, dashboard widgets, validation rules. A new type is added by registration, without changing the core (OCP).",
    sources: ["rg-strategy", "wiki-solid-uk"],
  },
  {
    question: "How does a mock differ from a stub in tests?",
    options: [
      "A stub returns canned data, a mock also verifies calls",
      "A mock returns canned data, while a stub verifies calls",
      "They're synonyms; the difference is only in library names",
    ],
    answer: 0,
    explanation:
      "Test doubles: dummy (a placeholder), stub (canned answers), spy (records calls), mock (with expectations about calls), fake (a simplified working implementation, e.g. an in-memory repository). Dependency injection makes substitution easy.",
    sources: ["mf-test-pyramid", "mf-injection"],
  },
  {
    question: "What is the \"test pyramid\"?",
    options: [
      "Many fast unit tests, fewer integration tests and very few e2e tests",
      "The order of running tests: e2e first, then integration, then unit",
      "A hierarchy of responsibility: QA → developer → team lead",
    ],
    answer: 0,
    explanation:
      "Lower levels are cheap and fast; upper ones are closer to reality but slow and brittle. On the frontend, the \"trophy\" variant is popular, emphasizing component integration tests (Testing Library).",
    sources: ["mf-test-pyramid"],
  },
  {
    question: "What is a headless component in terms of patterns?",
    options: [
      "Logic separated from markup and styles",
      "A component rendered on the server without a browser",
      "A component without a `<head>` in its HTML",
    ],
    answer: 0,
    explanation:
      "A hook or component provides state and handlers (`useCombobox`, Radix primitives), while the app controls markup and styles. It's separation of concerns and OCP: the look changes without changing the logic.",
    sources: ["pd-hooks", "wai-aria-apg"],
  },
  {
    question: "Which pattern is used in component \"slots\" (`<Card header={...} footer={...}>`)?",
    options: [
      "Composition via props: a skeleton plus passed-in content",
      "Inheritance: `Card` extends `Header` and `Footer`",
      "Singleton: a page can have only one card",
    ],
    answer: 0,
    explanation:
      "Slots (`children`, named props with JSX) let you extend a component without adding a flag for every case. It's a direct application of \"composition over inheritance\" and OCP.",
    sources: ["wiki-composition", "react-props"],
  },
  {
    question: "What is a higher-order function in terms of patterns?",
    options: [
      "A function that takes or returns a function",
      "A function that runs before all others on startup",
      "The function with the most calls in the profiler",
    ],
    answer: 0,
    explanation:
      "`map`, `filter`, `debounce`, `memoize` and HOCs are all higher-order functions. In JS, many classic patterns are expressed this way, without classes or hierarchies.",
    sources: ["rg-decorator", "rg-strategy"],
  },
  {
    question: "How are event delegation and the Flyweight pattern related?",
    options: [
      "One shared handler instead of thousands of identical ones",
      "Delegation creates a copy of the handler on every element",
      "They aren't: delegation is the Singleton pattern",
    ],
    answer: 0,
    explanation:
      "A handler on the parent is shared by all child elements, and the unique state (which element) comes from `event.target` — the Flyweight's extrinsic state. This saves memory and initialization time for large lists.",
    sources: ["rg-flyweight", "jsinfo-event-delegation"],
  },
  {
    question: "How is `useReducer` close to the State pattern?",
    options: [
      "Transitions in one place: new state = f(current, action)",
      "`useReducer` stores state globally for the whole app",
      "`useReducer` automatically syncs state with the server",
    ],
    answer: 0,
    explanation:
      "A reducer is a state machine's transition function. You can forbid invalid transitions (ignore `submit` in the `loading` state). For complex scenarios, explicit state machines (XState) are used.",
    sources: ["react-reducer", "rg-state"],
  },
  {
    question: "Which pattern does `React.memo` or a `memoize(fn)` function implement?",
    options: [
      "A caching Proxy/Decorator: the wrapper returns the previous result",
      "Abstract Factory: the wrapper creates a new component on each call",
      "Visitor: the wrapper walks through all props and changes them",
    ],
    answer: 0,
    explanation:
      "The wrapper has the same interface and intercepts the call: if the inputs haven't changed, it returns the stored result. A caching proxy is a classic application of the Proxy pattern.",
    sources: ["rg-proxy", "react-memo"],
  },
  {
    question: "When should you extract an abstraction, according to the \"rule of three\"?",
    options: [
      "When similar code shows up for the third time",
      "Right away, when writing the code for the first time, for the future",
      "Only after the project has existed for three years",
    ],
    answer: 0,
    explanation:
      "Two cases are often similar by accident, while the third shows what's truly common. The rule helps balance DRY and YAGNI.",
    sources: ["wiki-dry", "mf-yagni"],
  },
  {
    question: "Which pattern does the Proxy object in Vue 3 or MobX implement for reactivity?",
    options: [
      "Proxy + Observer: reads register a dependency, writes notify",
      "Builder: the proxy assembles new state from changes step by step",
      "Abstract Factory: the proxy creates families of reactive components",
    ],
    answer: 0,
    explanation:
      "The `get` trap remembers which effect or component read the property, and the `set` trap notifies subscribers of the change. This gives fine-grained reactivity without manual subscriptions. Signals are built on the same principle.",
    sources: ["rg-proxy", "rg-observer", "mdn-proxy"],
  },
  {
    question: "What is an \"anemic model\", and why is it criticized?",
    options: [
      "Objects are just data; the logic lives separately in services",
      "A data model without indexes in the database, which makes queries slow",
      "A model with an excessive number of methods and behavior",
    ],
    answer: 0,
    explanation:
      "Fowler calls it an anti-pattern in OOP: data and the rules for changing it are separated, so invariants are easy to break. On a functional-style frontend, \"data + pure functions side by side in one module\" is a reasonable compromise, as long as the rules are concentrated in one place.",
    sources: ["mf-anemic"],
  },
  {
    question: "How does a DI container (Angular, InversifyJS) differ from passing dependencies by hand?",
    options: [
      "The container creates objects and resolves the dependency graph from configuration",
      "The container forbids passing dependencies through the constructor",
      "The container works only with singletons and can't create new objects",
    ],
    answer: 0,
    explanation:
      "The container registers providers and, on request, assembles an object with all its dependencies, managing lifetimes (singleton, per request, per component). React projects usually make do with Context and factories, without a container.",
    sources: ["mf-injection"],
  },
];

export default questions;
