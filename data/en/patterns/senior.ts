import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "How does the \"signals\" model (Solid, Preact Signals, Angular Signals) differ from React's model?",
    options: [
      "Only the dependent places update, without re-rendering the component",
      "Signals re-render the whole app on any state change",
      "Signals work only on the server and aren't used in the browser",
    ],
    answer: 0,
    explanation:
      "A signal is a reactive value (Observer): reading registers a dependency, and writing updates exactly its subscribers (text, an attribute, a computation). React instead re-renders the component and diffs the virtual tree; the React Compiler reduces that cost, but the model is different.",
    sources: ["rg-observer", "react-compiler"],
  },
  {
    question: "What's the main trade-off of micro-frontends?",
    options: [
      "Independent teams and deploys at the cost of complexity, duplication and UX consistency",
      "Fast page loads at the cost of making teamwork impossible",
      "Simple infrastructure at the cost of all teams working in one repository",
    ],
    answer: 0,
    explanation:
      "Micro-frontends are justified with many autonomous teams and a large product: each part is deployed separately. The cost is duplicated dependencies, complex integration, shared design, routing and communication between parts. Smaller teams usually do fine with a modular monolith.",
    sources: ["mf-micro-frontends"],
  },
  {
    question: "Why is React declared as a `shared` singleton in Module Federation?",
    options: [
      "Two copies of React in one app break hooks and context",
      "Otherwise React loads more slowly due to missing CDN cache",
      "It's a React license requirement for commercial projects",
    ],
    answer: 0,
    explanation:
      "Hooks and context are tied to a specific React instance: a component from a remote module with its own copy causes \"Invalid hook call\", and contexts aren't visible. Shared singleton dependencies require coordinating versions between teams.",
    sources: ["module-federation", "mf-micro-frontends"],
  },
  {
    question: "How does the Strangler Fig pattern work when migrating a legacy frontend?",
    options: [
      "The new system gradually takes over routes and features of the old one until it disappears",
      "The old system is switched off entirely in one day and replaced by the rewrite",
      "The new and old systems run in parallel forever on different domains",
    ],
    answer: 0,
    explanation:
      "For example, a proxy routes `/checkout` to the new Next.js app and everything else to the old one. Risks are lower than with a \"big rewrite\": value is delivered gradually, and you can roll back at any step.",
    sources: ["mf-strangler"],
  },
  {
    question: "What does CQRS mean?",
    options: [
      "Separate models for writing (commands) and reading (queries)",
      "Client-side caching of requests in the Redux store",
      "Encrypting requests and responses in transit",
    ],
    answer: 0,
    explanation:
      "The read model can be optimized for display (denormalized views), and the write model for business rules. It adds complexity and often eventual consistency, so it's used in complex domains, not by default. On the frontend, a similar idea is separating mutations and queries, as in TanStack Query.",
    sources: ["mf-cqrs"],
  },
  {
    question: "What is Event Sourcing?",
    options: [
      "State is a log of events, and the current value is derived from it",
      "Subscribing to DOM events via a single handler on `document`",
      "Generating analytics events on every user click",
    ],
    answer: 0,
    explanation:
      "Instead of \"balance = 100\", events like \"deposited 150\" and \"withdrew 50\" are stored. This gives a full audit trail and the ability to replay and recompute state. Redux with time travel is the frontend counterpart: state = a fold of actions.",
    sources: ["mf-event-sourcing"],
  },
  {
    question: "What is a Bounded Context in DDD?",
    options: [
      "A boundary within which the model's terms are unambiguous",
      "A size limit on a React Context in kilobytes",
      "The scope of a variable inside a `{}` block",
    ],
    answer: 0,
    explanation:
      "An \"order\" means different things in the catalog, payments and shipping, and a single model for all of them becomes a compromise. Contexts separate models and connect via explicit integrations. It's a good basis for splitting into modules, services and micro-frontends.",
    sources: ["mf-bounded-context"],
  },
  {
    question: "What's the idea of hexagonal architecture (Ports & Adapters)?",
    options: [
      "The core talks to the world through port interfaces, and adapters implement them",
      "The app is divided into six mandatory layers with fixed names",
      "Each module connects to its neighbors through exactly six links",
    ],
    answer: 0,
    explanation:
      "A port is an interface such as `PaymentPort`; adapters are Stripe, a mock, a test implementation. The core knows nothing about HTTP, the DB or the UI. The idea is close to Clean Architecture and DIP; on the frontend, ports are often expressed as hooks or injected services.",
    sources: ["clean-architecture", "wiki-dip"],
  },
  {
    question: "When does Clean Architecture on the frontend become harmful?",
    options: [
      "When there are more layers and abstractions than real business logic",
      "When the project uses TypeScript in strict mode",
      "When the team has more than three frontend developers",
    ],
    answer: 0,
    explanation:
      "For a CRUD interface, a \"use case → repository → mapper → DTO\" chain for every button is over-engineering: lots of code with no benefit. Architecture should match domain complexity; sometimes separating UI, state and the API layer is enough.",
    sources: ["clean-architecture", "mf-yagni"],
  },
  {
    question: "How do you automatically enforce architectural import rules (e.g. FSD layers)?",
    options: [
      "With boundary linters in CI (dependency-cruiser, Steiger)",
      "Only through code review — it can't be automated",
      "With TypeScript `strict`, which forbids such imports",
    ],
    answer: 0,
    explanation:
      "Rules like \"features don't import widgets\" and \"no cycles\" are checked in CI. Without automation, architecture degrades over time. TypeScript doesn't check layers by itself.",
    sources: ["fsd", "monorepo-tools"],
  },
  {
    question: "What is an Anti-Corruption Layer?",
    options: [
      "A translation layer that keeps a foreign model out of yours",
      "A database-level layer protecting against SQL injection",
      "An antivirus check for files uploaded by users",
    ],
    answer: 0,
    explanation:
      "Integration with a legacy API or a third-party SDK through adapters and mapping: odd field names, error codes and formats stay at the boundary. This reduces vendor lock-in: changing the provider affects only that layer.",
    sources: ["mf-bounded-context", "rg-adapter"],
  },
  {
    question: "How does an RxJS Observable differ from a Promise?",
    options: [
      "An Observable is a lazy, cancellable stream; a Promise is a single value",
      "An Observable is always synchronous, a Promise always asynchronous",
      "Observable is the old name of Promise from early JS versions",
    ],
    answer: 0,
    explanation:
      "A promise starts immediately, delivers one value and can't be cancelled. An Observable starts on subscription, can emit many values (events, WebSocket), is cancelled by unsubscribing and has operators (`debounceTime`, `switchMap`). It's an implementation of Observer + Iterator.",
    sources: ["rg-observer", "rg-iterator"],
  },
  {
    question: "What do statecharts (XState) offer compared to a flat finite state machine?",
    options: [
      "Nested and parallel states without an explosion in their number",
      "Automatic generation of UI components from a state description",
      "Storing state on the server instead of the client",
    ],
    answer: 0,
    explanation:
      "A flat machine for a complex process (a video player, a multi-step form) grows quickly. Nested and parallel states, transition guards and side effects are described declaratively, and the diagram can be visualized and tested.",
    sources: ["rg-state"],
  },
  {
    question: "What is the Backend for Frontend (BFF) pattern?",
    options: [
      "A server layer tailored to a specific client that aggregates APIs",
      "A backend written in React by frontend developers",
      "A browser cache that replaces calls to the backend",
    ],
    answer: 0,
    explanation:
      "A mobile app and the web need different data. A BFF combines requests to microservices, strips unnecessary fields, and holds secrets and the session. Next.js with Route Handlers and Server Components often plays this role.",
    sources: ["mf-microservices", "next-route-handlers"],
  },
  {
    question: "What is the expression problem, and how does it show up in TS?",
    options: [
      "Unions are easy to extend with operations, classes with new types",
      "TypeScript can't infer the types of complex expressions",
      "JSX expressions can't be typed without `as`",
    ],
    answer: 0,
    explanation:
      "With a discriminated union, adding a new handler function is easy, but a new variant requires editing every `switch`. In OOP with classes, adding a new type is easy, but a new operation is expensive (solved with Visitor). The choice depends on what will change more often.",
    sources: ["rg-visitor", "ts-narrowing"],
  },
  {
    question: "What does \"functional core, imperative shell\" mean?",
    options: [
      "Logic as pure functions, effects in a thin outer layer",
      "The core is written in Haskell and the shell in JavaScript",
      "Components are functions, while hooks are classes",
    ],
    answer: 0,
    explanation:
      "Calculations, validation and state transitions are easy to test without mocks, while requests, timers and the DOM are isolated at the edges. Redux reducers with effects in middleware, or TanStack Query, are examples of this separation.",
    sources: ["react-pure", "clean-architecture"],
  },
  {
    question: "What is the \"Hollywood principle\", and how does it show up in React?",
    options: [
      "\"Don't call us, we'll call you\": the framework calls your code",
      "Components should be spectacular and animated",
      "State is passed only top-down via props",
    ],
    answer: 0,
    explanation:
      "You describe components, and React decides when to render them and call effects and handlers. This distinguishes a framework from a utility library that you call. Render props and callbacks are local forms of the same principle.",
    sources: ["mf-injection"],
  },
  {
    question: "What is a Composition Root?",
    options: [
      "A single place where the dependency graph is assembled",
      "The root React component that renders all pages",
      "The root directory of a monorepo",
    ],
    answer: 0,
    explanation:
      "Concrete implementations (API client, logger, storage) are created and wired at the entry point (`main`, a root layout with providers), and the rest of the code receives abstractions. This keeps dependencies visible and replaceable.",
    sources: ["mf-injection"],
  },
  {
    question: "Why is Service Locator often considered an anti-pattern compared to DI?",
    options: [
      "Dependencies are hidden: they aren't visible in the signature",
      "Service Locator works only on the server",
      "Service Locator is slower because of lookups by string keys",
    ],
    answer: 0,
    explanation:
      "`locator.get('api')` inside a function is an implicit dependency: a test has to set up a global registry, and errors show up at runtime. With DI, dependencies are visible in the parameters. `useContext` is close to a locator but is scoped to the tree and typed.",
    sources: ["mf-injection"],
  },
  {
    question: "What's wrong with a \"God Context\" — one React Context holding all of the app's state?",
    options: [
      "Any change wakes up every consumer",
      "A Context can't hold more than 100 fields",
      "Such a context can't be used in Server Components",
    ],
    answer: 0,
    explanation:
      "Changing the theme re-renders the cart, and typing in the search form re-renders the whole catalog. Besides, all modules become coupled through one object. Split the context by domain and change frequency, or use a store with selectors.",
    sources: ["react-useContext", "rg-smells"],
  },
  {
    question: "What is temporal coupling?",
    options: [
      "Call order matters, but the interface doesn't express it",
      "Modules depend on the system's current date and time",
      "Components render at different times because of Suspense",
    ],
    answer: 0,
    explanation:
      "For example, `client.init()` must be called before `client.send()`, or there's an error. Better to make the wrong order impossible: a factory that returns a ready object, or a Builder that hands out the object only after the mandatory steps.",
    sources: ["rg-builder", "rg-smells"],
  },
  {
    question: "What does Conway's law state?",
    options: [
      "Architecture mirrors the organization's communication structure",
      "System complexity doubles every two years",
      "Any system works only at 80% load",
    ],
    answer: 0,
    explanation:
      "Three teams tend to create three modules or services. This is used deliberately (the \"inverse Conway maneuver\"): teams are structured to match the desired architecture. Micro-frontends and microservices are largely organizational decisions.",
    sources: ["mf-microservices", "mf-micro-frontends"],
  },
  {
    question: "How does the MobX approach differ from Redux architecturally?",
    options: [
      "MobX — mutable observable objects; Redux — an immutable store and explicit actions",
      "MobX stores data on the server, Redux in the browser",
      "MobX works only with class components, Redux with function components",
    ],
    answer: 0,
    explanation:
      "MobX tracks dependencies automatically and updates precisely, but the flow of changes is less explicit. Redux requires more code, but changes go through actions and reducers — easier to debug and replay. The choice is a trade-off between convenience and predictability.",
    sources: ["redux-essentials", "rg-observer"],
  },
  {
    question: "Why is separating \"server\" and \"client\" state considered an important architectural decision?",
    options: [
      "They have different jobs: caching and syncing versus UI",
      "Server state can't be kept in browser memory",
      "Client state must always be stored in cookies",
    ],
    answer: 0,
    explanation:
      "Server data is a copy that goes stale: it needs caching, invalidation, retries and deduplication (TanStack Query, RTK Query, RSC). UI state (whether a dialog is open, a form draft) belongs to the client. Mixing them in one store leads to manual syncing and bugs.",
    sources: ["tq-overview", "tkdodo-practical-rq"],
  },
  {
    question: "What is Islands Architecture?",
    options: [
      "Static HTML with independent interactive \"islands\"",
      "Splitting an app into isolated microservices on different servers",
      "A strategy of deploying to several cloud regions",
    ],
    answer: 0,
    explanation:
      "Most of the page is HTML without JS, and JS loads only for interactive widgets (Astro, Fresh). This reduces JS size and time to interactivity for content sites. React Server Components solve a similar problem within the React tree.",
    sources: ["pd-islands", "webdev-rendering-on-web"],
  },
  {
    question: "What's the right way to evolve the public API of a shared component library?",
    options: [
      "SemVer, a deprecation period and codemods",
      "Change the API anytime — consumers will update themselves",
      "Never change the API after the first release",
    ],
    answer: 0,
    explanation:
      "A breaking change is a major version; before removing an API, mark it deprecated with a warning and instructions. Codemods (like those for Next.js and React) automate migration. This way the library evolves without breaking dozens of apps.",
    sources: ["storybook", "next-upgrade-16"],
  },
  {
    question: "What is an ADR (Architecture Decision Record)?",
    options: [
      "A record of the context, the decision and its consequences",
      "An automatic performance report after the build",
      "A registry of all project dependencies with their licenses",
    ],
    answer: 0,
    explanation:
      "ADRs are kept next to the code so that a year later it's clear why, say, TanStack Query was chosen over Redux. This reduces repeated debates and helps new team members.",
    sources: ["sd-primer"],
  },
  {
    question: "Why is the order of middleware or interceptors in a chain of responsibility risky?",
    options: [
      "The result depends on the order of the handlers",
      "Order doesn't matter — handlers run in parallel",
      "Handlers are always sorted alphabetically automatically",
    ],
    answer: 0,
    explanation:
      "Token refresh must come before the retry, caching after authorization, error transformation at the end. The order should be set explicitly in one place and covered by tests.",
    sources: ["rg-chain"],
  },
  {
    question: "What distinguishes a Value Object?",
    options: [
      "Equality by value, immutability, its own invariants",
      "The object stores only numeric values",
      "The object is created only via a singleton factory",
    ],
    answer: 0,
    explanation:
      "`Money(100, 'USD')` equals another `Money(100, 'USD')`, and operations return new objects. Validation in one place rules out a \"negative amount\" throughout the code. In TS, branded types with factories are close to this.",
    sources: ["mf-bounded-context", "rg-smells"],
  },
  {
    question: "What is an Aggregate in DDD?",
    options: [
      "A group of objects with a root through which changes go",
      "An SQL query with `GROUP BY` and aggregate functions",
      "Combining several React components into one",
    ],
    answer: 0,
    explanation:
      "For example, an order with line items: items can be changed only through `Order`, which enforces invariants (total, limits). An aggregate is a consistency and transaction boundary.",
    sources: ["mf-bounded-context"],
  },
  {
    question: "What does the Command-Query Separation (CQS) principle require?",
    options: [
      "A method either changes state or returns data",
      "Commands and queries must be stored in different databases",
      "API queries are made only with the GET method",
    ],
    answer: 0,
    explanation:
      "A query function without side effects is predictable and safe to call repeatedly (e.g. during render). There are exceptions (`stack.pop()`), but the principle helps avoid surprises like a getter that makes a request. CQRS is the architectural extension of this idea.",
    sources: ["mf-cqrs"],
  },
  {
    question: "What does the \"Tell, Don't Ask\" principle mean?",
    options: [
      "Ask an object to act instead of deciding for it",
      "Don't ask colleagues questions — read the documentation",
      "Log every action instead of returning values",
    ],
    answer: 0,
    explanation:
      "Instead of `if (cart.items.length > 0 && !cart.locked) cart.items.push(x)` — `cart.add(x)`, with the rules inside. This keeps invariants close to the data and reduces \"envious\" functions.",
    sources: ["wiki-demeter", "rg-smells"],
  },
  {
    question: "What does the Fail Fast principle mean?",
    options: [
      "Fail immediately and explicitly on invalid data",
      "Ship features quickly even if they might crash",
      "Disable tests if they take too long",
    ],
    answer: 0,
    explanation:
      "Validating configuration and input on startup or at the boundary (Zod schemas, assertion functions) gives a clear error next to the cause, rather than a mysterious `undefined` ten calls later.",
    sources: ["ts-narrowing", "rg-smells"],
  },
  {
    question: "What's the risk of Postel's law (\"be liberal in what you accept\")?",
    options: [
      "Tolerating errors entrenches them in clients",
      "Strict validation always slows the server down several times",
      "The principle forbids client-side validation",
    ],
    answer: 0,
    explanation:
      "If an API accepts malformed data, clients start relying on it, and fixing it becomes a breaking change. The modern approach is to validate input strictly and version changes explicitly.",
    sources: ["sd-primer", "fsd"],
  },
  {
    question: "How should the UI account for eventual consistency in an event-driven system?",
    options: [
      "Show intermediate statuses and roll back optimistic updates",
      "Wait for full consistency and block the UI until then",
      "Ignore it: consistency is purely the backend's job",
    ],
    answer: 0,
    explanation:
      "After a command is sent, the data in a list may not update immediately. The UI shows a \"processing\" status, applies an optimistic change and updates it on an event (WebSocket, a refetch) or rolls it back on error.",
    sources: ["mf-event-sourcing", "tq-optimistic"],
  },
  {
    question: "How does redux-saga differ from listener middleware and thunks?",
    options: [
      "A saga describes complex async flows with generators",
      "A saga runs synchronously and can't make requests",
      "Saga is the old name of `createAsyncThunk`",
    ],
    answer: 0,
    explanation:
      "Generators with `take`, `race` and `cancel` effects let you describe long-running processes declaratively and test them step by step. The cost is complexity and a learning curve. RTK recommends thunks and listener middleware for most tasks.",
    sources: ["rtk-listener", "jsinfo-generators"],
  },
  {
    question: "Why is normalizing data in a frontend store an architectural pattern rather than a micro-optimization?",
    options: [
      "Each entity is stored once by id — no desync",
      "Normalized data takes less space in localStorage",
      "Without normalization, Redux forbids storing arrays",
    ],
    answer: 0,
    explanation:
      "If a user appears both in a list and in comments, denormalized copies drift apart. An `{ ids, entities }` table gives a single source of truth and fast updates by id. The cost is assembling data with selectors.",
    sources: ["redux-normalizing", "rtk-createEntityAdapter"],
  },
  {
    question: "How do you use Strategy for A/B tests without cluttering components with conditions?",
    options: [
      "Choose the implementation at the boundary and pass it inward",
      "Write `if (experiment === 'B')` in every affected component",
      "Deploy a separate app build for each variant",
    ],
    answer: 0,
    explanation:
      "A factory or provider picks the component/strategy by flag, and the rest of the code works with a common interface. After the experiment, the losing variant is removed in one place, without hunting for conditions across the project.",
    sources: ["rg-strategy", "mf-feature-toggles"],
  },
  {
    question: "What are afferent and efferent coupling of a module?",
    options: [
      "How many modules depend on it, and how many it depends on",
      "The module's network load speed and its size",
      "The number of incoming and outgoing HTTP requests of the module",
    ],
    answer: 0,
    explanation:
      "A module many others depend on (high afferent coupling) should be stable and abstract — e.g. `shared/ui`. A module depending on many others is unstable. The instability metric helps spot violations of dependency direction.",
    sources: ["fsd", "clean-architecture"],
  },
  {
    question: "How does a modular monolith differ from microservices (micro-frontends)?",
    options: [
      "One build and deploy, but strict module boundaries inside",
      "A monolith can't have modules — it's one big folder",
      "A modular monolith is deployed in parts to different servers",
    ],
    answer: 0,
    explanation:
      "A modular monolith gives most of the benefits of separation (boundaries, ownership, public APIs) without distributed complexity. It's often the right first step: modules can be extracted later if a real need arises.",
    sources: ["mf-microservices", "monorepo-tools"],
  },
  {
    question: "What are domain events on the frontend, and why are they useful?",
    options: [
      "Messages about domain facts for independent modules",
      "DOM events like `click` and `input` on form elements",
      "Events the browser fires when the domain changes",
    ],
    answer: 0,
    explanation:
      "The checkout module publishes an event, and analytics, the cart and notifications react without being directly coupled. It's Pub/Sub at the domain level; it's important to maintain an event catalog and type the payloads.",
    sources: ["rg-observer", "mf-event-sourcing"],
  },
  {
    question: "How does the Circuit Breaker pattern help the client when an API fails?",
    options: [
      "After a series of errors it temporarily stops sending requests",
      "It encrypts requests if suspicious activity is detected",
      "It automatically switches the user to another UI language",
    ],
    answer: 0,
    explanation:
      "States: closed (requests go through), open (immediate failure or fallback), half-open (trial requests). This prevents an avalanche of retries to a failed service and gives the user a fast response with degraded functionality.",
    sources: ["mf-circuit-breaker", "wiki-circuit-breaker"],
  },
  {
    question: "When is the Visitor pattern justified in a TypeScript project?",
    options: [
      "When node types are stable but operations keep growing",
      "When node types change every week and there's one operation",
      "When you need to guarantee a single instance of a class",
    ],
    answer: 0,
    explanation:
      "Visitor is handy for ASTs, documents and editor block trees: new operations (rendering, export, validation) are added without changing the nodes. If new nodes are added often, every visitor has to change — that's the expression problem.",
    sources: ["rg-visitor"],
  },
  {
    question: "How do you implement reliable undo in a collaborative editor with several users editing?",
    options: [
      "Undo your own operations while accounting for others' (OT/CRDT)",
      "Keep a snapshot of the whole document and roll back to it",
      "Forbid simultaneous editing altogether",
    ],
    answer: 0,
    explanation:
      "A global rollback to a snapshot would destroy other people's changes. In collaborative systems, undo is a new inverse operation on the current state that accounts for concurrent edits. Command and Memento work locally, but collaboration needs OT or CRDT models.",
    sources: ["crdt-tech", "wiki-ot"],
  },
  {
    question: "What does a Facade over a third-party UI library (e.g. your own `<Button>` on top of MUI) give you?",
    options: [
      "Your own stable API and replacing the library in one place",
      "The wrappers make the library's components faster",
      "It's required by the licenses of most UI libraries",
    ],
    answer: 0,
    explanation:
      "The app uses only your components with the variants you need, and the library details are hidden. A major version upgrade or migration affects only the wrapper layer. The downside is maintaining the wrappers and not leaking the library's whole API through.",
    sources: ["rg-facade", "storybook"],
  },
  {
    question: "What's the difference between \"implementation inheritance\" and \"interface inheritance\"?",
    options: [
      "The first takes the parent's code, the second only the contract",
      "The first works only in TypeScript, the second only in JavaScript",
      "They're the same thing; only the syntax differs",
    ],
    answer: 0,
    explanation:
      "A class's `extends` pulls in the implementation and creates strong coupling to the parent. `implements` or structural typing define only the contract. Most \"composition over inheritance\" advice is specifically about implementation inheritance.",
    sources: ["wiki-composition", "ts-classes"],
  },
  {
    question: "Why is the Saga pattern (orchestration) in distributed processes relevant to the frontend?",
    options: [
      "A multi-step process with compensating actions when a step fails",
      "A long animation with several sequential stages",
      "A component's change history in DevTools",
    ],
    answer: 0,
    explanation:
      "Placing an order: reserve the item → pay → ship; if payment fails, the reservation must be cancelled. The frontend should reflect intermediate statuses and the outcome of compensations rather than treating the operation as atomic.",
    sources: ["mf-microservices", "rtk-listener"],
  },
  {
    question: "How do Server Components change architecture compared to an SPA?",
    options: [
      "Data and logic on the server, interactivity on the client",
      "The client drops JavaScript entirely in all components",
      "The server renders everything, and the client can't hold state",
    ],
    answer: 0,
    explanation:
      "The `'use client'` boundary becomes an architectural decision: where state and handlers live, and where data and secrets are accessed. Client JS shrinks, and part of the client-side API and cache layer disappears, but new questions arise — server-side caching and props serialization.",
    sources: ["react-server-components", "next-server-client"],
  },
  {
    question: "What is an \"internal platform\" (design system + shared packages), and when should you extract one?",
    options: [
      "Shared components and tools, once several products use them",
      "A separate server for the company's internal staff and contractors",
      "An A/B testing platform every startup needs from day one",
    ],
    answer: 0,
    explanation:
      "When several teams copy the same buttons, forms, build configs and linters, a platform with versioning and an owner is extracted. A platform built too early for a single product is a premature abstraction and needless bureaucracy.",
    sources: ["storybook", "monorepo-tools"],
  },
  {
    question: "What is the \"second-system effect\" in architectural decisions?",
    options: [
      "The tendency to overload the second version of a system with every postponed idea",
      "Faster development of the second system thanks to experience with the first",
      "A system's dependency on a second, backup database",
    ],
    answer: 0,
    explanation:
      "Fred Brooks's term: after a successful first system, the architect designs the second one \"properly\", adding everything previously left out, and ends up with an overcomplicated product. An argument for incremental change, YAGNI and Strangler Fig instead of a \"big rewrite\".",
    sources: ["mf-yagni", "mf-strangler"],
  },
];

export default questions;
