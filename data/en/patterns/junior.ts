import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What is a design pattern?",
    options: [
      "A typical solution to a commonly occurring design problem",
      "A ready-made library you install via npm",
      "A mandatory code style standard for the team",
    ],
    answer: 0,
    explanation:
      "A pattern isn't code but a description of an idea: what problem it solves, what parts the solution consists of, and its pros and cons. The implementation depends on the language and context. Knowing patterns gives a team a shared vocabulary: \"we need a strategy here\" is clear without long explanations.",
    sources: ["rg-what-is-pattern", "rg-patterns"],
  },
  {
    question: "Into which three groups are the classic GoF patterns divided?",
    options: [
      "Creational, structural, behavioral",
      "Client-side, server-side, network",
      "Synchronous, asynchronous, reactive",
    ],
    answer: 0,
    explanation:
      "Creational patterns deal with creating objects (Factory, Builder, Singleton), structural ones with composing objects (Adapter, Decorator, Facade), behavioral ones with interaction and distribution of responsibilities (Observer, Strategy, Command). The \"Gang of Four\" book (1994) described 23 patterns.",
    sources: ["rg-catalog"],
  },
  {
    question: "What does the Singleton pattern guarantee?",
    options: [
      "A class has only one instance and a global access point to it",
      "Each constructor call creates a new independent instance",
      "The object can't be changed after creation, as with `Object.freeze`",
    ],
    answer: 0,
    explanation:
      "Examples: one API client, one logger, one DB connection. In JS, the simplest singleton is a module: `export const api = new ApiClient()` — a module runs once, and all importers get the same object.",
    sources: ["rg-singleton", "pd-singleton"],
  },
  {
    question: "Why is Singleton often called an anti-pattern?",
    options: [
      "It introduces hidden global state and makes testing harder",
      "It requires too much memory to store instances",
      "It can't be implemented in JavaScript without classes",
    ],
    answer: 0,
    explanation:
      "Code that accesses a singleton directly depends on it implicitly: tests affect each other, and swapping the implementation is hard. A compromise is to create one instance but pass it explicitly (dependency injection) so tests can substitute a mock.",
    sources: ["rg-singleton", "pd-singleton"],
  },
  {
    question: "What problem does the Factory pattern solve?",
    options: [
      "Creating objects without tying code to their concrete classes",
      "Destroying objects that are no longer used",
      "Copying objects together with all their nested data",
    ],
    answer: 0,
    explanation:
      "A `createNotification(type)` function returns an `EmailNotification` or a `PushNotification`, and the calling code works with a common interface. A new type is added in one place. In JS, a factory is often just a function that returns an object.",
    sources: ["rg-factory-method", "pd-factory"],
  },
  {
    question: "How does the Observer pattern work?",
    options: [
      "An object keeps subscribers and notifies them when its state changes",
      "An object periodically polls other objects for changes",
      "An object copies its state into all related objects at once",
    ],
    answer: 0,
    explanation:
      "The subject provides `subscribe`/`unsubscribe` and calls callbacks on change. Web examples: `addEventListener`, store subscriptions in Redux and Zustand, RxJS. The key thing is to remember to unsubscribe, otherwise you get memory leaks.",
    sources: ["rg-observer", "pd-observer"],
  },
  {
    question: "How does Pub/Sub differ from the classic Observer?",
    options: [
      "Publishers and subscribers don't know about each other — an event broker connects them",
      "In Pub/Sub there can be only one subscriber, in Observer many",
      "Pub/Sub works only synchronously, Observer only asynchronously",
    ],
    answer: 0,
    explanation:
      "In Observer, subscribers register directly with the subject. In Pub/Sub there's an intermediary (an event bus, a message broker), and participants know only channel names. This decouples parts of the system more strongly but makes the event flow harder to trace.",
    sources: ["rg-observer", "wiki-message-queue"],
  },
  {
    question: "What is the Strategy pattern?",
    options: [
      "A family of interchangeable algorithms chosen at runtime",
      "A quarterly project development plan approved by the architect",
      "An order of method calls hard-coded in the base class of a hierarchy",
    ],
    answer: 0,
    explanation:
      "Instead of a long `if/else` by delivery type — a strategies object `{ courier: calcCourier, pickup: calcPickup }`, and the code calls the right one. A JS example is the compare function in `sort(compareFn)`: the sorting algorithm stays the same, while the comparison strategy is plugged in.",
    sources: ["rg-strategy"],
  },
  {
    question: "What does the Decorator pattern do?",
    options: [
      "Adds behavior to an object or function by wrapping it",
      "Changes a component's look by attaching CSS classes to it",
      "Replaces the parent class with another class at runtime",
    ],
    answer: 0,
    explanation:
      "The wrapper implements the same interface and adds logic before or after the call: caching, logging, retries. Examples: `debounce(fn)`, `withAuth(Component)` (a HOC), `@` decorators in TypeScript. Wrappers can be combined.",
    sources: ["rg-decorator"],
  },
  {
    question: "When do you need an Adapter?",
    options: [
      "When you need to convert someone else's interface into the one your code expects",
      "When you need to speed up a slow function with a cache",
      "When you need to hide an object from unauthorized users",
    ],
    answer: 0,
    explanation:
      "Example: the API returns `{ user_name, created_at }`, while the UI expects `{ name, createdAt: Date }`. An adapter function at the boundary transforms the data, and when the API changes only it needs editing. Third-party SDKs are adapted to your own interface the same way.",
    sources: ["rg-adapter"],
  },
  {
    question: "What is a Facade?",
    options: [
      "A simple interface on top of a complex subsystem",
      "The site's home page with the main navigation",
      "A copy of an object for safely passing it outside",
    ],
    answer: 0,
    explanation:
      "For example, an `api` module with `getUser()` and `updateUser()` hides `fetch`, headers, tokens, error handling and data transformation. The rest of the code doesn't know the details. A facade reduces coupling but shouldn't grow into a \"god object\".",
    sources: ["rg-facade"],
  },
  {
    question: "What is the Proxy pattern used for?",
    options: [
      "To control access to an object: caching, checks, laziness",
      "To combine several objects into one tree with a common root",
      "To create complex objects step by step through a chain of calls",
    ],
    answer: 0,
    explanation:
      "A proxy has the same interface as the original and intercepts access: lazy initialization, caching, validation, logging. JS has a built-in `Proxy` — Vue 3's reactivity is built on it.",
    sources: ["rg-proxy", "pd-proxy"],
  },
  {
    question: "Which pattern do `for...of` and `Symbol.iterator` implement?",
    options: ["Iterator", "Observer", "Builder"],
    answer: 0,
    explanation:
      "An iterator gives a uniform way to traverse a collection sequentially without exposing its internals. Arrays, `Map`, `Set`, strings and generators implement the iteration protocol, so they work the same in `for...of` and spread.",
    sources: ["rg-iterator", "jsinfo-iterable"],
  },
  {
    question: "What is the Module pattern in JavaScript?",
    options: [
      "Encapsulation: private details are hidden, a public API is exported",
      "Splitting an app into microservices deployed on different servers",
      "Loading all of the app's code as one big file for speed",
    ],
    answer: 0,
    explanation:
      "Modules used to be made with IIFEs and closures; now ES modules are used: everything not exported is private. This reduces coupling and protects against name collisions in the global scope.",
    sources: ["pd-module", "jsinfo-modules"],
  },
  {
    question: "When is the Builder pattern useful?",
    options: [
      "When an object is assembled step by step from many optional parts",
      "When you need to guarantee a single instance of a class",
      "When you need to notify subscribers about changes",
    ],
    answer: 0,
    explanation:
      "Instead of a constructor with ten parameters — a chain `new QueryBuilder().select('id').where(...).limit(10).build()`. Examples: SQL query builders (Knex), URL and config builders. In JS, passing an options object is often enough.",
    sources: ["rg-builder"],
  },
  {
    question: "How is the Prototype pattern related to JavaScript?",
    options: [
      "New objects are created from existing ones — the language itself is built on this",
      "It's a way to quickly sketch a UI without logic to show a client",
      "It's a pattern that can't be implemented in JavaScript",
    ],
    answer: 0,
    explanation:
      "The Prototype pattern is about creating objects by cloning a sample. In JS, objects inherit from other objects via the prototype chain, and `Object.create(proto)` creates an object with a given prototype. A UI prototype (a mockup) is an entirely different concept.",
    sources: ["rg-prototype", "pd-prototype"],
  },
  {
    question: "What is the Command pattern used for?",
    options: [
      "To represent an action as an object — for queues, logs and undo",
      "To unite developers into a cross-functional feature team",
      "To run JavaScript code from the terminal command line",
    ],
    answer: 0,
    explanation:
      "A command contains everything needed to perform an action and, if necessary, to undo it (`execute`/`undo`). This is how undo/redo in editors, operation queues and macros are implemented. Redux actions are a related idea: an action is described by an object.",
    sources: ["rg-command", "pd-command"],
  },
  {
    question: "Which pattern lets you treat a tree (a menu with submenus, a file system) uniformly?",
    options: ["Composite", "Singleton", "Adapter"],
    answer: 0,
    explanation:
      "Composite describes both leaves and containers with one interface, so the client traverses the tree without \"is it a folder or a file\" checks. The React component tree, the DOM and nested menus are natural examples.",
    sources: ["rg-composite"],
  },
  {
    question: "What does the State pattern describe?",
    options: [
      "An object changes its behavior based on its state, like a finite state machine",
      "Storing all of the app's data in one global store",
      "Saving a component's state to `localStorage` between sessions",
    ],
    answer: 0,
    explanation:
      "Instead of scattered `if (status === ...)` checks, each state's behavior is described separately, and transitions are explicit: `idle → loading → success | error`. On the frontend this idea is often implemented with state machines (XState) or `useReducer` with a discriminated union.",
    sources: ["rg-state"],
  },
  {
    question: "What does a Mediator do?",
    options: [
      "Centralizes interaction between objects so they don't reference each other",
      "Passes a request along a chain of handlers until one handles it",
      "Creates a copy of an object for safe modification",
    ],
    answer: 0,
    explanation:
      "Form components don't call each other directly; they notify a mediator (the parent, a form controller), which decides what to change. This reduces \"everyone with everyone\" links. The risk is the mediator growing into an overly smart object.",
    sources: ["rg-mediator", "pd-mediator"],
  },
  {
    question: "Which pattern underlies middleware in Express or Redux?",
    options: ["Chain of Responsibility", "Builder with a `next()` method", "Flyweight for shared handlers"],
    answer: 0,
    explanation:
      "A request passes through a sequence of handlers: each can handle it, modify it or pass it to the next via `next()`. This is how logging, authorization and body parsing are added without changing the main handler.",
    sources: ["rg-chain", "pd-mediator"],
  },
  {
    question: "What is the Template Method pattern?",
    options: [
      "A base algorithm defines the steps, and subclasses override individual steps",
      "A method that generates HTML markup from a string template",
      "A method copied between projects without any changes",
    ],
    answer: 0,
    explanation:
      "For example, a base class `DataExporter` defines `export()`: load → transform → save, and subclasses implement `transform()` for CSV and JSON. In a functional style, the same is done by passing step functions.",
    sources: ["rg-template-method"],
  },
  {
    question: "What is a Memento for?",
    options: [
      "Saving an object's state so you can return to it later (undo)",
      "Taking a screenshot of the page for a bug tracker report",
      "Remembering a function call's result to speed up repeated calls",
    ],
    answer: 0,
    explanation:
      "A memento stores state without exposing the object's internals. Change history in an editor or the Redux DevTools \"time machine\" are examples. With immutable data, a memento is simply a reference to a previous version.",
    sources: ["rg-memento"],
  },
  {
    question: "Why do you need the Flyweight pattern?",
    options: [
      "To save memory by sharing a common immutable part among many objects",
      "To reduce JS bundle size through minification and compression",
      "To speed up image loading by compressing them into modern formats",
    ],
    answer: 0,
    explanation:
      "If 100,000 objects share a lot of identical data (an icon, a style, a type description), the shared part is stored once, and objects keep only their unique fields. JS strings and primitives partly use a similar technique.",
    sources: ["rg-flyweight", "pd-flyweight"],
  },
  {
    question: "What does the acronym SOLID stand for?",
    options: [
      "Five object-oriented design principles by Robert Martin",
      "Five mandatory GoF patterns every project needs",
      "A set of reliability and integrity requirements for a database",
    ],
    answer: 0,
    explanation:
      "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. The principles apply beyond classes too: to functions, modules and React components.",
    sources: ["wiki-solid-uk", "wiki-solid"],
  },
  {
    question: "What does the Single Responsibility Principle (SRP) require?",
    options: [
      "A module should have one reason to change",
      "A module should contain exactly one function",
      "Each developer is responsible for only one module",
    ],
    answer: 0,
    explanation:
      "A component that loads data, formats it and draws a table changes for different reasons. Splitting it into a loading hook, formatting functions and a presentational component simplifies changes and tests. \"One function\" is a misreading.",
    sources: ["wiki-solid-uk"],
  },
  {
    question: "What does the Open/Closed Principle (OCP) mean?",
    options: [
      "Code is open for extension but closed for modification",
      "Code should be open to everyone, i.e. open source",
      "Public methods are open, private ones are closed",
    ],
    answer: 0,
    explanation:
      "New behavior is added without rewriting proven code: via a new strategy, a plugin, or a component through props/`children`. Example: a `Button` with an `icon` prop instead of editing the button for every new icon.",
    sources: ["wiki-solid-uk"],
  },
  {
    question: "What does the Liskov Substitution Principle (LSP) require?",
    options: [
      "A subtype must be usable anywhere the base type is expected",
      "A subclass must override all of the parent's methods",
      "You can't inherit more than two levels deep",
    ],
    answer: 0,
    explanation:
      "The classic violation: `Square extends Rectangle`, where `setWidth` also changes the height — code that relies on a rectangle breaks. On the frontend: a wrapper component around `<input>` should support expected props like `onChange` and `disabled`.",
    sources: ["wiki-solid-uk", "wiki-solid"],
  },
  {
    question: "What is the Interface Segregation Principle (ISP) about?",
    options: [
      "Clients shouldn't depend on methods and data they don't need",
      "Each TypeScript interface should live in a separate file",
      "UI and API interfaces should be developed by different teams",
    ],
    answer: 0,
    explanation:
      "An `Avatar` component that takes the whole `user` object with dozens of fields depends on too much. It's better to pass `src` and `name`. Narrow interfaces simplify reuse and tests.",
    sources: ["wiki-solid-uk"],
  },
  {
    question: "What does the Dependency Inversion Principle (DIP) mean?",
    options: [
      "High-level modules depend on abstractions, not on concrete implementations",
      "Dependencies in `package.json` must be sorted in reverse order",
      "Low-level modules should import high-level ones, not the other way round",
    ],
    answer: 0,
    explanation:
      "An order service depends on a `PaymentGateway` interface, not on a specific Stripe SDK. The implementation is passed in from outside, so it's easy to replace or mock in tests.",
    sources: ["wiki-dip", "mf-injection"],
  },
  {
    question: "What does the DRY principle mean?",
    options: [
      "Every piece of knowledge in a system should have a single representation",
      "Code should be \"dry\": no comments or blank lines",
      "You must not reuse other people's code",
    ],
    answer: 0,
    explanation:
      "Don't Repeat Yourself is about duplicated knowledge, not just similar lines. If an email validation rule is duplicated in three places, it's easy to miss one when it changes. But prematurely merging code that's similar yet different is harmful too.",
    sources: ["wiki-dry"],
  },
  {
    question: "What does the KISS principle mean?",
    options: [
      "Keep it simple: avoid unnecessary complexity",
      "Keep code in one file so it's easy to find",
      "Write short variable names",
    ],
    answer: 0,
    explanation:
      "Keep It Simple, Stupid: a simple solution is easier to read, test and change. Complex abstractions are justified only when they solve a real problem. Short names and a single file aren't about simplicity.",
    sources: ["wiki-kiss"],
  },
  {
    question: "What does the YAGNI principle mean?",
    options: [
      "Don't implement functionality until it's actually needed",
      "Always build in extra capabilities for future requirements",
      "Don't use third-party libraries; write everything yourself",
    ],
    answer: 0,
    explanation:
      "You Aren't Gonna Need It: premature generality (\"what if we need five languages\") costs time and complicates code, and the assumptions often don't come true. It's not a ban on thoughtful architecture but a stance against \"just in case\" code.",
    sources: ["mf-yagni"],
  },
  {
    question: "What does \"composition over inheritance\" mean?",
    options: [
      "Assemble behavior from parts instead of deep hierarchies",
      "Always use classes instead of functions and objects",
      "Never use `extends` — it's forbidden in modern JS",
    ],
    answer: 0,
    explanation:
      "Deep inheritance is fragile: a change in the base class breaks subclasses, and behavior gets \"locked\" into the hierarchy. Composition (functions, hooks, `children`, strategy objects) is more flexible. React explicitly recommends composition over component inheritance.",
    sources: ["wiki-composition", "react-thinking"],
  },
  {
    question: "What does the MVC pattern describe?",
    options: [
      "A split into model (data), view (UI) and controller (input handling)",
      "Splitting a system into microservices, virtual machines and containers",
      "A release versioning scheme: major, version, commit",
    ],
    answer: 0,
    explanation:
      "The model holds data and business logic, the view displays it, and the controller handles user actions and updates the model. Variants: MVP, MVVM. The idea of separating responsibilities lives on in the frontend: data separate from UI.",
    sources: ["mf-ui-archs"],
  },
  {
    question: "What is the Container/Presentational pattern in React about?",
    options: [
      "The container handles data and logic, the presentational one only rendering",
      "The container renders a Docker image, the presentational one slides",
      "The container is always a class, the presentational one always a function",
    ],
    answer: 0,
    explanation:
      "Presentational components receive everything via props and are easy to reuse and test (e.g. in Storybook). Today the container role is often played by hooks, and in Next.js by server components that load data.",
    sources: ["pd-container"],
  },
  {
    question: "What pattern does a custom hook `useWindowSize()` implement?",
    options: [
      "Reusing stateful logic without changing the component tree",
      "Creating a single browser window instance (Singleton)",
      "Inheriting the component from a base `Window` class via `extends`",
    ],
    answer: 0,
    explanation:
      "Hooks replaced HOCs and render props for reusing logic: the component calls a function and gets data without piling up wrappers. Inside, the hook subscribes to `resize` and unsubscribes itself (the Observer pattern).",
    sources: ["pd-hooks", "react-custom-hooks"],
  },
  {
    question: "Which pattern do React Context and `<Provider>` implement?",
    options: [
      "Provider: a value becomes available to the whole subtree without passing props",
      "Singleton: a context can be created only once per app",
      "Builder: a context is assembled step by step from several providers",
    ],
    answer: 0,
    explanation:
      "A provider solves prop drilling: the theme, current user and i18n are available to any descendant. There can be any number of contexts, and the same context can be provided with different values in different parts of the tree.",
    sources: ["pd-provider", "react-context-learn"],
  },
  {
    question: "What is an anti-pattern?",
    options: [
      "A popular solution that seems good but does harm",
      "A pattern whose use is forbidden by the language standard",
      "Any code written in a hurry without comments or documentation",
    ],
    answer: 0,
    explanation:
      "Examples: the \"god object\", spaghetti code, magic numbers, copy-paste, premature optimization. Knowing anti-patterns helps you spot them in reviews and explain why a solution is bad.",
    sources: ["rg-smells"],
  },
  {
    question: "What is a God Object?",
    options: [
      "An object or component that knows and does too much",
      "The root `window` object that everything else depends on",
      "A user object with administrator rights in the system",
    ],
    answer: 0,
    explanation:
      "A 2,000-line component, a `utils` service with everything in it — they're hard to understand, test and change, and any change is risky. The cure is splitting by responsibility (SRP).",
    sources: ["rg-smells", "wiki-solid-uk"],
  },
  {
    question: "What's wrong with \"magic numbers\" like `if (status === 3)`?",
    options: [
      "The value's meaning is unclear, and it's easy to change it wrongly in one of many places",
      "The engine compares numbers in conditions more slowly than strings",
      "Numbers can't be used in `switch` — only strings and enums",
    ],
    answer: 0,
    explanation:
      "A named constant `ORDER_STATUS.SHIPPED` explains the meaning and changes in one place. In TypeScript, a union of literals or an `as const` object is even better.",
    sources: ["rg-smells"],
  },
  {
    question: "What is callback hell, and how is it avoided?",
    options: [
      "Deeply nested async callbacks; solved with promises and `async/await`",
      "Too many event handlers on the page; solved with `React.memo`",
      "Errors inside callbacks; solved by wrapping the call in `try/catch`",
    ],
    answer: 0,
    explanation:
      "A \"pyramid\" of nested callbacks is hard to read and to handle errors in. Promises flatten the chain, and `async/await` makes async code look synchronous.",
    sources: ["jsinfo-promise", "jsinfo-async-await"],
  },
  {
    question: "A function takes 7 arguments. Which refactoring is usually appropriate?",
    options: [
      "Pass an options object with named fields",
      "Split the call into 7 calls with one argument each",
      "Move the arguments into global variables",
    ],
    answer: 0,
    explanation:
      "A long parameter list is a \"code smell\": it's easy to mix up the order. An object with destructuring `({ id, title, onSave })` is self-documenting and allows default values. Sometimes it's a sign that the function does too much.",
    sources: ["rg-smells", "rg-refactoring"],
  },
  {
    question: "What is refactoring?",
    options: [
      "Changing the structure of code without changing its behavior",
      "Adding new functionality to the product for business tasks",
      "Rewriting the project from scratch in another language or framework",
    ],
    answer: 0,
    explanation:
      "The goal is to make code clearer and easier to change. It's done in small steps under the protection of tests. If behavior changes, it's no longer refactoring but a functional change.",
    sources: ["rg-refactoring"],
  },
  {
    question: "What is Separation of Concerns?",
    options: [
      "Different aspects (data, logic, UI) live in different parts of the code",
      "Each team member works only on their own task",
      "The frontend and the backend are stored in different repositories",
    ],
    answer: 0,
    explanation:
      "For example, data loading lives in a hook or a server component, business rules in pure functions, rendering in components. A change in one aspect doesn't affect the others.",
    sources: ["mf-ui-archs", "wiki-solid-uk"],
  },
  {
    question: "What does \"high cohesion and low coupling\" mean?",
    options: [
      "One task inside a module, and modules depend on each other only loosely",
      "Modules should call each other as often and as directly as possible",
      "All related code should be kept in one big module",
    ],
    answer: 0,
    explanation:
      "High cohesion means a module's parts work toward a common goal. Low coupling means modules communicate through narrow interfaces and don't know each other's details. Then changes stay local and don't ripple across the project.",
    sources: ["wiki-demeter", "fsd"],
  },
  {
    question: "What is Dependency Injection in its simplest form?",
    options: [
      "Passing dependencies into a function or class from outside instead of creating them inside",
      "Automatically installing missing npm packages on startup",
      "Importing all of the project's modules in a single `index.js` file",
    ],
    answer: 0,
    explanation:
      "`createOrderService({ api, logger })` instead of `import api` inside: it's easy to substitute mocks in tests, and the implementation can be replaced. In React, DI is often done via Context or props.",
    sources: ["mf-injection", "wiki-dip"],
  },
  {
    question: "Which pattern does `EventEmitter` in Node.js or `EventTarget` in the browser implement?",
    options: ["Observer", "Facade", "Builder"],
    answer: 0,
    explanation:
      "The object keeps lists of handlers by event name and calls them on `emit`/`dispatchEvent`. Subscribing is `on`/`addEventListener`, unsubscribing is `off`/`removeEventListener`.",
    sources: ["rg-observer", "mdn-custom-events"],
  },
  {
    question: "Why are pure functions useful in design?",
    options: [
      "The result depends only on the arguments — they're easy to test",
      "They run faster because the engine caches their results",
      "They can't contain conditionals or loops",
    ],
    answer: 0,
    explanation:
      "A pure function without side effects is predictable: the same input gives the same output. It pays to move business logic (price calculation, validation) into pure functions and keep side effects at the edges of the system.",
    sources: ["react-pure", "wiki-kiss"],
  },
  {
    question: "Which pattern does a HOC like `withLogger(Component)` use?",
    options: ["Decorator", "Factory", "Iterator"],
    answer: 0,
    explanation:
      "A HOC wraps a component and adds behavior while keeping its interface — a classic decorator. The downsides of HOCs (nesting, prop conflicts) made hooks popular.",
    sources: ["rg-decorator", "patterns-dev-hoc"],
  },
];

export default questions;
