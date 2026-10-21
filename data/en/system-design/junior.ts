import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What happens when a user types a site's address and presses Enter?",
    options: [
      "DNS → connection (TCP/TLS) → HTTP request → response → page rendering",
      "The browser immediately downloads all the site's files from the nearest Google server",
      "The browser sends the request to a search engine, which redirects to the site",
    ],
    answer: 0,
    explanation:
      "The browser resolves the IP via DNS (with caches at every level), establishes a connection and the TLS handshake, sends the request, receives HTML, parses it, loads CSS/JS/images, builds the DOM and CSSOM, and performs layout and paint. It's the classic opening question for a performance discussion.",
    sources: ["sd-primer", "webdev-rendering"],
  },
  {
    question: "What is DNS for?",
    options: [
      "It translates domain names into server IP addresses",
      "It encrypts traffic between the browser and the server using TLS",
      "It stores copies of sites closer to the user for fast loading",
    ],
    answer: 0,
    explanation:
      "DNS is the internet's distributed \"phone book\". Responses are cached (browser, OS, ISP) for the duration of the TTL. Encryption is TLS's job, and copies of content near the user are the CDN's job.",
    sources: ["sd-primer"],
  },
  {
    question: "How does HTTPS differ from HTTP?",
    options: [
      "Traffic is encrypted and the server's authenticity is verified via TLS",
      "HTTPS is faster because it compresses all server responses",
      "HTTPS allows only GET requests, while HTTP allows any method",
    ],
    answer: 0,
    explanation:
      "TLS protects against eavesdropping and tampering, and the certificate confirms you're talking to the real server. Many modern browser APIs (Service Worker, geolocation, HTTP/2 in browsers) work only over HTTPS.",
    sources: ["sd-primer", "mdn-same-origin"],
  },
  {
    question: "What does the REST principle \"resources + HTTP methods\" mean?",
    options: [
      "The URL identifies a resource and the method an action: `GET /users/1`, `DELETE /users/1`",
      "All actions go through `POST /api` with the operation name in the body",
      "Each action gets its own URL like `/getUser` or `/deleteUser`",
    ],
    answer: 0,
    explanation:
      "REST uses nouns in URLs and the semantics of HTTP methods: GET reads, POST creates, PUT/PATCH update, DELETE deletes. This makes the API predictable, and caches and proxies understand the meaning of requests.",
    sources: ["mdn-http-methods", "sd-primer"],
  },
  {
    question: "How does GET differ from POST?",
    options: [
      "GET reads data and mustn't change it, POST sends data to be changed",
      "GET is safer because URL data is encrypted separately from the body",
      "POST is faster because the browser never caches it",
    ],
    answer: 0,
    explanation:
      "GET is a safe and idempotent method: it can be cached, retried and prefetched. Parameters are visible in the URL and logs, so secrets must not be sent via GET. POST creates or changes data, and the browser asks before resubmitting a form.",
    sources: ["mdn-http-methods", "mdn-idempotent"],
  },
  {
    question: "Which HTTP method is NOT idempotent?",
    options: ["`POST`", "`PUT`", "`DELETE`"],
    answer: 0,
    explanation:
      "Idempotency: repeating the same request has the same effect on the server. PUT replaces a resource entirely, DELETE removes it — repeating changes nothing. Two \"create order\" POSTs create two orders. That's why retrying POST on failure is dangerous without an idempotency key.",
    sources: ["mdn-idempotent", "mdn-http-methods"],
  },
  {
    question: "What do the HTTP status code classes mean?",
    options: [
      "2xx — success, 3xx — redirect, 4xx — client error, 5xx — server error",
      "2xx — client error, 3xx — success, 4xx — server error, 5xx — redirect",
      "2xx — cached response, 4xx — stale response, 5xx — partial response",
    ],
    answer: 0,
    explanation:
      "Examples: 200 OK, 201 Created, 204 No Content; 301/302 redirects, 304 Not Modified; 400 Bad Request, 401, 403, 404, 409 Conflict, 422, 429; 500, 502, 503, 504. The class also drives client logic: 4xx are usually not retried, while 5xx and network errors can be.",
    sources: ["mdn-http-methods", "sd-primer"],
  },
  {
    question: "How do 401 and 403 responses differ?",
    options: [
      "401 — not authenticated, 403 — authenticated but lacking permission",
      "401 — no access rights, 403 — the user hasn't logged in at all",
      "401 — resource not found, 403 — server temporarily unavailable",
    ],
    answer: 0,
    explanation:
      "On 401, the client usually prompts the user to sign in or refreshes the token. On 403, signing in again won't help — show \"access denied\". 404 means the resource wasn't found (sometimes it's returned instead of 403 to avoid revealing that the resource exists).",
    sources: ["owasp-auth", "sd-primer"],
  },
  {
    question: "How does authentication differ from authorization?",
    options: [
      "Authentication is who you are, authorization is what you're allowed to do",
      "Authentication is what you're allowed to do, authorization is who you are",
      "They're synonyms for a user signing in to the system",
    ],
    answer: 0,
    explanation:
      "First the system verifies identity (password, OAuth, passkey), then permissions for a specific action (role, ownership of the resource). Permission checks are mandatory on the server: a hidden button in the UI protects nothing.",
    sources: ["owasp-auth", "next-authentication"],
  },
  {
    question: "What does it mean that HTTP is a stateless protocol?",
    options: [
      "Each request is independent; \"memory\" of the user is passed via a cookie or token",
      "The server can't store data in a database between users' requests",
      "The browser deletes all site data after the tab is closed",
    ],
    answer: 0,
    explanation:
      "The server doesn't remember previous requests by itself, so the session is sent with every request: a cookie with a session ID or a token in a header. Stateless servers are easy to scale — any instance can handle any request.",
    sources: ["owasp-session", "sd-primer"],
  },
  {
    question: "What is a CDN for?",
    options: [
      "Serving content from servers geographically close to the user",
      "Storing user data in encrypted form on the client",
      "Compiling JavaScript code before sending it to the browser",
    ],
    answer: 0,
    explanation:
      "A CDN caches static assets (JS, CSS, images, video) and even HTML at points of presence worldwide: lower latency, less load on the origin server, protection against traffic spikes. For dynamic content, a CDN can proxy and cache by rules.",
    sources: ["mdn-cdn", "wiki-cdn"],
  },
  {
    question: "What does the `Cache-Control: max-age=3600` header specify?",
    options: [
      "The response can be used from the cache for an hour without contacting the server",
      "The server must respond to the request within an hour",
      "The browser must delete all site data after an hour",
    ],
    answer: 0,
    explanation:
      "While the response is \"fresh\", the browser doesn't hit the network. After it expires, the browser can revalidate with a conditional request (ETag/Last-Modified) and get a 304. `no-store` forbids caching, and `no-cache` requires revalidation before every use.",
    sources: ["mdn-cache-control", "mdn-http-caching"],
  },
  {
    question: "How does latency differ from bandwidth?",
    options: [
      "Latency is the time to a response, bandwidth is the data volume per unit of time",
      "Latency is the data volume per second, bandwidth is the time to first byte",
      "They're synonyms for the user's internet speed",
    ],
    answer: 0,
    explanation:
      "Even on a wide channel, each extra request costs a round trip to the server and back (RTT). Mobile networks have high latency, so fewer requests, CDNs, prefetching and HTTP/2 matter. For large files, bandwidth matters more.",
    sources: ["sd-primer", "webdev-lcp"],
  },
  {
    question: "How does an SPA differ from an MPA?",
    options: [
      "An SPA switches pages on the client via JS, an MPA loads new HTML from the server",
      "An SPA is a single HTML page with no navigation at all",
      "An MPA doesn't support JavaScript and works only with static content",
    ],
    answer: 0,
    explanation:
      "An SPA gives smooth transitions and rich interactivity but needs more JS and attention to SEO and first load. An MPA is simpler and faster to start. Modern frameworks (Next.js) combine server rendering and client navigation.",
    sources: ["webdev-rendering-on-web", "next-glossary"],
  },
  {
    question: "Why does server-side rendering (SSR) often improve the first load?",
    options: [
      "The user gets ready HTML right away, without waiting for JS to load and run",
      "The server is always faster than the browser, so the page loads instantly",
      "SSR completely removes the need to load JavaScript in the browser",
    ],
    answer: 0,
    explanation:
      "With CSR, the browser first gets almost empty HTML and waits for the bundle. With SSR, content is visible immediately, which improves LCP and SEO, but hydration still needs JS for interactivity. The cost is server load and response time.",
    sources: ["webdev-rendering-on-web", "vercel-ssr-ssg"],
  },
  {
    question: "Why does an API return a list page by page (pagination)?",
    options: [
      "So that thousands of records aren't transferred and rendered at once",
      "So that search engines index each page separately",
      "Because JSON doesn't support arrays longer than 100 elements",
    ],
    answer: 0,
    explanation:
      "Large responses are slow to transfer and burden the database and browser memory. Pagination can be offset-based (`?page=3&limit=20`) or cursor-based (`?after=abc`). In the UI: page numbers, \"Load more\" or infinite scroll.",
    sources: ["graphql-pagination", "slack-pagination"],
  },
  {
    question: "Why use debounce in search-as-you-type?",
    options: [
      "To send a request after a pause in typing rather than on every character",
      "To send requests in parallel so they return faster",
      "To make the browser cache search responses forever",
    ],
    answer: 0,
    explanation:
      "Without debounce, the word \"sneakers\" produces 8 requests. A 200–300 ms delay reduces server load. Additionally, stale requests are cancelled (`AbortController`) so an old response doesn't overwrite a new one, and results are cached.",
    sources: ["jsinfo-settimeout", "mdn-abort-controller"],
  },
  {
    question: "Which UI states should you plan for a screen with a list of data?",
    options: [
      "Loading, empty list, error and successful result",
      "Only the successful result — the browser handles the rest",
      "Only loading and success; errors are shown in the console",
    ],
    answer: 0,
    explanation:
      "An empty state suggests what to do next, an error state offers a \"Retry\" button, and skeletons reduce the feeling of waiting. In a system design interview, such details demonstrate maturity.",
    sources: ["tq-queries", "sd-primer"],
  },
  {
    question: "How do functional requirements differ from non-functional ones?",
    options: [
      "Functional — what the system does, non-functional — how well it does it",
      "Functional — for the backend, non-functional — for the frontend",
      "Functional ones are written by the client, non-functional ones by QA",
    ],
    answer: 0,
    explanation:
      "Functional: \"the user can add an item to the cart\". Non-functional: performance, accessibility, security, reliability, scalability, offline support. System design interviews start by clarifying both.",
    sources: ["sd-primer"],
  },
  {
    question: "How does vertical scaling differ from horizontal scaling?",
    options: [
      "Vertical — a more powerful server, horizontal — more servers",
      "Vertical — more servers, horizontal — a more powerful server",
      "Vertical concerns the database, horizontal only the frontend",
    ],
    answer: 0,
    explanation:
      "Vertical scaling (more CPU/RAM) is simple but has a ceiling and a single point of failure. Horizontal scaling needs a load balancer and stateless servers, but it's nearly unlimited and improves fault tolerance.",
    sources: ["sd-primer", "wiki-load-balancing"],
  },
  {
    question: "What does a load balancer do?",
    options: [
      "Distributes requests among several servers and removes unhealthy ones",
      "Compresses server responses to reduce network load",
      "Limits the number of users who can open the site at once",
    ],
    answer: 0,
    explanation:
      "Algorithms: round robin, least connections, IP hash. Health checks exclude failed instances. A load balancer is the foundation of horizontal scaling and fault tolerance.",
    sources: ["wiki-load-balancing", "sd-primer"],
  },
  {
    question: "In general, how do relational (SQL) databases differ from NoSQL?",
    options: [
      "SQL — tables with a schema and relations, NoSQL — flexible data models",
      "SQL works only on the server, NoSQL only in the browser",
      "NoSQL can't store data on disk, only in memory",
    ],
    answer: 0,
    explanation:
      "Relational DBs (PostgreSQL) provide transactions, JOINs and a strict schema. NoSQL — document (MongoDB), key-value (Redis), columnar, graph — scale horizontally more easily or fit a specific access pattern better. The choice depends on the data and queries.",
    sources: ["sd-primer"],
  },
  {
    question: "What is polling?",
    options: [
      "The client periodically asks the server whether there's new data",
      "The server pushes data to the client over an open connection",
      "Users voting for new product features",
    ],
    answer: 0,
    explanation:
      "The simplest way to get updates: a request every N seconds. Downsides: up to N seconds of delay and empty requests. Alternatives: long polling, SSE, WebSocket. For infrequent updates, polling is often enough.",
    sources: ["mdn-websockets", "mdn-sse"],
  },
  {
    question: "When should you choose WebSocket?",
    options: [
      "When you need frequent two-way exchange in real time",
      "When you need to load a large image faster than regular HTTP",
      "When you need to cache API responses on the browser side",
    ],
    answer: 0,
    explanation:
      "WebSocket keeps a persistent connection, and both sides can send messages at any time. The cost is persistent connections on the server, reconnections and scaling. For a server-only stream, SSE is simpler.",
    sources: ["mdn-websockets"],
  },
  {
    question: "What should you do with images to make the page load faster?",
    options: [
      "Serve modern formats at the right size and lazy-load those below the fold",
      "Embed all images in HTML as base64 to reduce the number of requests",
      "Load images at maximum resolution for every screen",
    ],
    answer: 0,
    explanation:
      "AVIF/WebP, `srcset` for screen size, `loading=\"lazy\"` for off-screen images, dimensions to prevent CLS, a CDN with optimization. Base64 inflates HTML by a third and isn't cached separately — it's justified only for tiny icons.",
    sources: ["webdev-image-formats", "mdn-responsive-images"],
  },
  {
    question: "Why split the JS bundle into parts (code splitting)?",
    options: [
      "So the user loads only the code for the needed page or feature",
      "So the code runs in parallel in several browser threads",
      "To hide the source code from users",
    ],
    answer: 0,
    explanation:
      "One huge bundle slows down the first load. Splitting by routes and heavy components (`import()`, `React.lazy`) reduces the initial size. Frameworks like Next.js split by routes automatically.",
    sources: ["mdn-dynamic-import", "next-lazy-loading"],
  },
  {
    question: "What do minification and compression (gzip, brotli) give you?",
    options: [
      "They reduce the size of transferred files and speed up loading",
      "They encrypt the code so it can't be read",
      "They make JavaScript run several times faster in the browser",
    ],
    answer: 0,
    explanation:
      "Minification removes whitespace and shortens names, and HTTP-level compression shrinks text resources several times more (brotli is usually more efficient than gzip). It barely affects execution speed — that depends on the code's size and complexity.",
    sources: ["mdn-compression"],
  },
  {
    question: "What are dev, staging and production environments for?",
    options: [
      "Development, testing on a copy of production, and serving real users",
      "Different programming languages for the frontend, backend and databases",
      "Different browser versions in which the site is tested",
    ],
    answer: 0,
    explanation:
      "Staging mirrors production's configuration to catch problems before release. Configuration (API URLs, keys) is passed via environment variables rather than stored in code — a 12-factor app principle.",
    sources: ["twelve-factor", "next-env"],
  },
  {
    question: "What is CI/CD?",
    options: [
      "Automated checks and delivery of every change",
      "Manual testing by QA before every release",
      "A version control system that's an alternative to Git",
    ],
    answer: 0,
    explanation:
      "Continuous Integration: every push runs the linter, tests and build. Continuous Delivery/Deployment: changes that pass the checks are rolled out automatically (to staging or production). This speeds up releases and reduces risk.",
    sources: ["twelve-factor", "mf-blue-green"],
  },
  {
    question: "Why does the frontend need error monitoring (Sentry and the like)?",
    options: [
      "To learn about real users' errors along with stack traces",
      "To block users who run into errors",
      "To fix bugs in production automatically without a release",
    ],
    answer: 0,
    explanation:
      "Users rarely report errors. Monitoring collects exceptions, unhandled promise rejections, the browser and the actions leading up to the failure, and source maps turn a minified stack into a readable one.",
    sources: ["opentelemetry", "sre-slo"],
  },
  {
    question: "What does a 429 Too Many Requests response mean?",
    options: [
      "The client exceeded the request limit and should wait",
      "The server is overloaded and has stopped working entirely",
      "The request has too many parameters in the URL",
    ],
    answer: 0,
    explanation:
      "Rate limiting protects a service from abuse and overload. The response may include `Retry-After`. The client should retry later, preferably with exponential backoff, not immediately.",
    sources: ["mdn-429", "wiki-rate-limiting"],
  },
  {
    question: "Where should form data be validated?",
    options: [
      "On the client for convenience and on the server for security",
      "Only on the client — the server receives already-checked data",
      "Only on the server — client-side validation is pointless",
    ],
    answer: 0,
    explanation:
      "Client-side validation gives instant feedback but is easily bypassed with a direct request. The server must check everything. A shared schema (e.g. Zod) can be reused on both sides.",
    sources: ["owasp-top10", "mdn-form-validation"],
  },
  {
    question: "Why version an API (`/api/v1/...`)?",
    options: [
      "To change the contract without breaking clients that already work",
      "To speed up server responses through per-version caching",
      "So that search engines index new versions of the site separately",
    ],
    answer: 0,
    explanation:
      "Mobile apps and old browser tabs keep using the old contract for a long time. Breaking changes go into a new version, while non-breaking ones (new optional fields) are added to the existing one. The version can be passed in the URL or a header.",
    sources: ["sd-primer", "graphql-learn"],
  },
  {
    question: "Why set a timeout on network requests?",
    options: [
      "To avoid waiting forever and to show the user an error or retry",
      "So that requests run at a strictly defined time of day",
      "So that the browser doesn't cache the response longer than set",
    ],
    answer: 0,
    explanation:
      "`fetch` has no timeout by default: a \"hung\" request keeps the loading indicator spinning forever. Use `AbortSignal.timeout(ms)` and show a clear state with a retry button.",
    sources: ["mdn-abort-controller", "aws-backoff"],
  },
  {
    question: "What is an optimistic UI update?",
    options: [
      "Showing the result immediately, before the server responds, with rollback",
      "Hiding errors from the user so as not to spoil the experience",
      "Loading all data in advance in the hope it will be needed",
    ],
    answer: 0,
    explanation:
      "A like, checking off a task or sending a message feel instant. If the server returns an error, the state is rolled back and the user is notified. It suits actions with a high chance of success.",
    sources: ["tq-optimistic", "react-useOptimistic"],
  },
  {
    question: "How do you avoid losing a draft of a long form if the tab is closed by accident?",
    options: [
      "Periodically save the draft to `localStorage` or to the server",
      "Forbid the user from closing the tab until the form is submitted",
      "Keep the draft in a JavaScript variable in memory",
    ],
    answer: 0,
    explanation:
      "Autosave (with debounce) to `localStorage`/IndexedDB or the server restores the data when the user returns. You can additionally warn via `beforeunload`, but you can't and shouldn't forbid closing. An in-memory variable disappears with the tab.",
    sources: ["mdn-web-storage", "mdn-indexeddb"],
  },
  {
    question: "Why is accessibility (a11y) considered a non-functional requirement of a system?",
    options: [
      "It describes how well everyone can use the product",
      "It's needed only for government sites and doesn't affect business",
      "Only a separate team checks it, after the release",
    ],
    answer: 0,
    explanation:
      "Accessibility affects audience reach, SEO, legal risks (accessibility laws in the EU and US) and usability for everyone. It's cheaper to build it in from the start: semantics, keyboard support, contrast, ARIA for complex widgets.",
    sources: ["wcag-quickref", "mdn-a11y"],
  },
  {
    question: "What should you take into account if the product will be in several languages?",
    options: [
      "Texts in dictionaries, locale-based date and number formats, RTL and varying string lengths",
      "It's enough to machine-translate texts every time a page is shown",
      "A separate site for each language with a full copy of the code",
    ],
    answer: 0,
    explanation:
      "Strings aren't hardcoded but moved into dictionaries; dates, currencies and numbers are formatted with `Intl`; plural forms, writing direction and translation length are taken into account. The language is usually reflected in the URL for SEO.",
    sources: ["next-i18n", "mdn-intl"],
  },
  {
    question: "What is a feature flag?",
    options: [
      "A switch that turns a feature on without a new deploy — for some or all users",
      "A flag in `package.json` that enables experimental Node.js features",
      "A \"new\" badge next to a new feature in the UI",
    ],
    answer: 0,
    explanation:
      "Flags let you ship code switched off, enable a feature gradually, run A/B tests and quickly disable something broken. Old flags must be removed, or the code accumulates branches.",
    sources: ["mf-feature-toggles"],
  },
  {
    question: "What is a single point of failure?",
    options: [
      "A component whose failure brings down the whole system",
      "A place in the code where all of the app's errors are handled",
      "The server that stores the database backup",
    ],
    answer: 0,
    explanation:
      "For example, a single database without replicas or a single server without a load balancer. It's eliminated through redundancy: multiple instances, replicas, different availability zones. On the frontend, the analogue is a whole page depending on one third-party script.",
    sources: ["sd-primer", "wiki-replication"],
  },
  {
    question: "What does \"99.9%\" (three nines) availability mean?",
    options: [
      "Allowed downtime is about 8.7 hours per year",
      "The service answers 99.9% of requests in under 100 ms",
      "The service runs at 99.9% of server capacity",
    ],
    answer: 0,
    explanation:
      "99.9% ≈ 43 minutes of downtime per month, 99.99% about 4 minutes. Each extra \"nine\" gets dramatically more expensive. SLOs (internal targets) and SLAs (commitments to customers) are stated in these terms, and an \"error budget\" helps balance release speed and reliability.",
    sources: ["sre-slo"],
  },
  {
    question: "Why can't you trust data that comes from the client?",
    options: [
      "The user can modify any request the client sends",
      "The client always sends data in the wrong encoding",
      "The browser randomly alters data when sending it",
    ],
    answer: 0,
    explanation:
      "Via DevTools, curl or a proxy, anyone can send any values: a product price, someone else's ID, an admin role. The server must check permissions, validate input and recompute important values (an order total) itself.",
    sources: ["owasp-top10", "next-data-security"],
  },
  {
    question: "How do you protect against XSS when displaying user content?",
    options: [
      "Escape output, never insert HTML without sanitizing, configure CSP",
      "Check that the user typed the text in English",
      "Store user content only in `localStorage`",
    ],
    answer: 0,
    explanation:
      "Frameworks escape text by default; the dangerous parts are `innerHTML`, `dangerouslySetInnerHTML` and `javascript:` links. If HTML is needed (an editor), it's sanitized on the server and the client. CSP restricts script sources — a second line of defense.",
    sources: ["mdn-xss", "owasp-html5"],
  },
  {
    question: "What is \"logging\" in the context of operating a system?",
    options: [
      "Recording events and errors to investigate problems",
      "A user signing in with a login and password",
      "Compressing source code before sending it to the server",
    ],
    answer: 0,
    explanation:
      "Logs, together with metrics and traces, make up observability. It's important to log in a structured way (JSON), with a request ID and without personal data or secrets.",
    sources: ["opentelemetry", "sd-primer"],
  },
  {
    question: "Why is a static site (SSG) good for a blog or documentation?",
    options: [
      "HTML is built in advance and served from a CDN — fast, cheap and reliable",
      "It lets users edit pages right in the browser",
      "It works without a server or CDN, straight from the author's computer",
    ],
    answer: 0,
    explanation:
      "The content changes rarely and is the same for everyone, so it pays to prerender it. Updates happen via a rebuild or ISR. Personal data needs dynamic rendering or client-side loading.",
    sources: ["webdev-rendering-on-web", "next-isr"],
  },
  {
    question: "Why is a cache like Redis in front of the database useful under high load?",
    options: [
      "Frequent requests are answered from memory, offloading the database",
      "Redis replaces the database, so there's no need to keep it",
      "Redis encrypts data, so the database becomes more secure",
    ],
    answer: 0,
    explanation:
      "Popular data (profiles, a catalog) is read from memory in fractions of a millisecond. The main difficulty is invalidation: when and how to update the cache after the data changes. Redis complements the main DB rather than replacing it.",
    sources: ["sd-primer"],
  },
  {
    question: "What is database replication?",
    options: [
      "Copies of data on several servers for reliability and reads",
      "Removing duplicate records from database tables",
      "Migrating the database to a new schema version",
    ],
    answer: 0,
    explanation:
      "A typical setup: one primary server for writes and replicas for reads. If the primary fails, a replica can be promoted. Caveat: replication lag — just-written data may not have appeared on the replica yet.",
    sources: ["wiki-replication", "sd-primer"],
  },
  {
    question: "What is an ETag, and why is it needed?",
    options: [
      "A resource version identifier: the server responds 304 if the version hasn't changed",
      "A tag the CDN uses to detect the user's country for translation",
      "An authorization token the browser adds to every request",
    ],
    answer: 0,
    explanation:
      "The browser sends `If-None-Match: <etag>`, and if the resource hasn't changed, the server responds 304 Not Modified without a body — saving traffic. It's the cache revalidation mechanism used together with `Cache-Control`.",
    sources: ["mdn-etag", "mdn-http-caching"],
  },
  {
    question: "How does long polling differ from regular polling?",
    options: [
      "The server keeps the request open until new data appears",
      "The client sends requests more often — every 100 ms",
      "The request is sent once per session and never repeated",
    ],
    answer: 0,
    explanation:
      "The response arrives as soon as there's an event, after which the client opens a new request. Latency is lower than with regular polling, and it works through any proxy. Today SSE or WebSocket are used more often.",
    sources: ["mdn-sse", "mdn-websockets"],
  },
  {
    question: "How do you send analytics when the page closes without losing the request?",
    options: [
      "With `navigator.sendBeacon` or `fetch` with `keepalive: true`",
      "With a regular `fetch` in a `beforeunload` handler",
      "With a `setTimeout` of 5 seconds after the tab is closed",
    ],
    answer: 0,
    explanation:
      "A regular request during page unload may be cancelled. `sendBeacon` queues a small POST in the browser and delivers it in the background. It's better to send on `visibilitychange` (when the page is hidden), since `unload` fires unreliably.",
    sources: ["mdn-send-beacon"],
  },
];

export default questions;
