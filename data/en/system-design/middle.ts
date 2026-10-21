import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What is the right way to start answering a frontend system design question?",
    options: [
      "By clarifying requirements and constraints",
      "By picking a framework and a state library right away",
      "By writing the main component's code on the whiteboard",
    ],
    answer: 0,
    explanation:
      "A popular framework is RADIO: Requirements (functional and non-functional), Architecture (components and data flow), Data model (client state), Interface (API), Optimizations (performance, a11y, i18n, security). Without requirements it's easy to design the wrong system.",
    sources: ["sd-primer"],
  },
  {
    question: "Why is cursor pagination better than offset pagination for a feed?",
    options: [
      "No duplicates on inserts and fast on deep pages",
      "It lets you jump straight to any page by its number",
      "It doesn't require sorting data on the server",
    ],
    answer: 0,
    explanation:
      "With `offset`, new posts shift the window and the user sees repeats; `OFFSET 100000` is expensive for the DB. A cursor (\"after the record with id X\") is stable and efficient on an index. The downside is you can't jump to page 57, so for tables with page numbers `offset` is sometimes more appropriate.",
    sources: ["slack-pagination", "graphql-pagination"],
  },
  {
    question: "How would you design an infinite feed with thousands of posts?",
    options: [
      "Cursor loading via `IntersectionObserver` plus list virtualization",
      "Load all posts in one request and hide the extra ones with CSS",
      "Fetch new posts on a timer every 2 seconds",
    ],
    answer: 0,
    explanation:
      "A sentinel element near the end of the list triggers loading the next page. Virtualization keeps only visible items in the DOM. Also consider: restoring scroll position when navigating back, images with explicit dimensions, new posts at the top without the feed \"jumping\".",
    sources: ["mdn-intersection-observer", "tanstack-virtual"],
  },
  {
    question: "What matters when designing autocomplete?",
    options: [
      "Debounce, cancelling stale requests, caching, keyboard support",
      "Sending a request on every keystroke with no delay",
      "Loading the entire suggestion dictionary into the browser on start",
    ],
    answer: 0,
    explanation:
      "Plus a minimum query length, handling response races, highlighting matches, a \"nothing found\" state, and the ARIA combobox pattern. For a small fixed dictionary, filtering on the client is fine (sometimes with a trie); for large ones, use server-side search.",
    sources: ["wai-aria-apg", "mdn-abort-controller", "wiki-trie"],
  },
  {
    question: "What is the main trade-off of GraphQL compared to REST?",
    options: [
      "Precise field selection, but harder caching and protection from heavy queries",
      "GraphQL is faster than REST in every scenario without exception",
      "GraphQL doesn't need a schema, so the API is easier to change",
    ],
    answer: 0,
    explanation:
      "GraphQL solves over- and under-fetching and provides a typed schema. But queries go via POST to a single endpoint, so URL-based CDN caching doesn't work out of the box; you need a normalized client cache (Apollo, urql), complexity limits and persisted queries.",
    sources: ["graphql-learn"],
  },
  {
    question: "What is the N+1 problem in GraphQL and how is it solved?",
    options: [
      "A DB query per item; solved with batching",
      "The client sends N+1 identical requests because of re-renders",
      "The schema has more types than there are tables in the database",
    ],
    answer: 0,
    explanation:
      "A list of 100 posts with an `author` field on each produces 1 + 100 queries. DataLoader collects ids within a single tick and makes one `WHERE id IN (...)` query, caching results for the duration of the request.",
    sources: ["graphql-learn"],
  },
  {
    question: "When is tRPC a good fit?",
    options: [
      "When frontend and backend are both TypeScript in one repository",
      "When the API must be public and used by third-party clients",
      "When the client is written in Swift and Kotlin and the server in Go",
    ],
    answer: 0,
    explanation:
      "tRPC infers server procedure types directly in the client without code generation or a schema. For public APIs and polyglot clients, REST with OpenAPI, GraphQL or gRPC are better.",
    sources: ["trpc", "grpc"],
  },
  {
    question: "What caching layers exist between the user and the database?",
    options: [
      "Memory, HTTP cache, Service Worker, CDN, server cache",
      "Only the browser cache — the other layers are obsolete",
      "Only the CDN — browsers don't cache API responses",
    ],
    answer: 0,
    explanation:
      "Each layer offloads the next and reduces latency: client data cache (TanStack Query), HTTP cache via headers, SW for offline, CDN at the network edge, Redis and render cache on the server. The hard part is consistent invalidation.",
    sources: ["mdn-http-caching", "sd-primer"],
  },
  {
    question: "How should JS and CSS bundles be cached?",
    options: [
      "A hash in the filename and `Cache-Control: max-age=31536000, immutable`",
      "`Cache-Control: no-store` so the user always gets fresh code",
      "Time-based: `max-age=3600` for all files",
    ],
    answer: 0,
    explanation:
      "The name `app.3f9a1c.js` changes when the content changes, so the file can be cached \"forever\". The HTML that references the bundles is cached briefly or with revalidation, so a new release is picked up immediately. Bundlers do the hashing automatically.",
    sources: ["webdev-http-cache", "mdn-cache-control"],
  },
  {
    question: "What does `Cache-Control: max-age=60, stale-while-revalidate=600` do?",
    options: [
      "Fresh for a minute, then the stale response is served while it updates in the background",
      "The response is stored for 60 seconds, then requests are blocked for 10 minutes",
      "The server must respond within 60 ms, otherwise an error is returned",
    ],
    answer: 0,
    explanation:
      "The user almost always gets an instant response from cache, while freshness is maintained by background revalidation. The same strategy underlies SWR, TanStack Query and ISR in Next.js.",
    sources: ["webdev-swr", "mdn-cache-control"],
  },
  {
    question: "Why is cache invalidation called one of the hardest problems?",
    options: [
      "Data lives in many caches and they must be updated consistently",
      "Browsers forbid clearing the cache programmatically",
      "A cache can't be cleared without restarting the server",
    ],
    answer: 0,
    explanation:
      "The same data sits in the CDN, the server cache, the client cache and on multiple pages. Tags (`revalidateTag`, key-based invalidation), short TTLs with SWR and event-driven invalidation after mutations help.",
    sources: ["next-revalidateTag", "tq-invalidation"],
  },
  {
    question: "What is the main drawback of stateless JWTs compared to server-side sessions?",
    options: [
      "An issued token is hard to revoke before it expires",
      "JWTs can't be sent in HTTP headers",
      "JWTs can't store a user identifier",
    ],
    answer: 0,
    explanation:
      "The server verifies the signature without hitting the DB, which is convenient for scaling. But if a user is banned or a token is stolen, it keeps working. Solutions: short-lived access tokens, rotating refresh tokens, a revocation list (which partially brings state back).",
    sources: ["jwt-intro", "owasp-jwt"],
  },
  {
    question: "Where is it safer to store a session token in the browser?",
    options: [
      "In a cookie with `HttpOnly`, `Secure` and `SameSite`",
      "In `localStorage` so it's easy to read from JavaScript",
      "In a global variable `window.token`",
    ],
    answer: 0,
    explanation:
      "An `HttpOnly` cookie is inaccessible to scripts, so XSS can't steal it directly. `SameSite` reduces CSRF risk, `Secure` means HTTPS only. A token in `localStorage` can be read by any injected script. There's no fully safe storage under XSS — XSS protection is mandatory.",
    sources: ["mdn-set-cookie", "owasp-session"],
  },
  {
    question: "Why use a pair of access and refresh tokens?",
    options: [
      "A short-lived access token limits leak damage; refresh renews it",
      "Access is for reading and refresh is only for writing data",
      "A refresh token speeds up page loads through caching",
    ],
    answer: 0,
    explanation:
      "Access lives for minutes and is sent with every request; refresh lives longer, is stored more securely and is used only to obtain new access tokens. Refresh token rotation makes it possible to detect reuse of a stolen token.",
    sources: ["owasp-jwt", "oauth2"],
  },
  {
    question: "Which OAuth flow is recommended for SPAs and mobile apps?",
    options: [
      "Authorization Code with PKCE",
      "Implicit Flow with the token in the URL",
      "Password Grant with the password in the client",
    ],
    answer: 0,
    explanation:
      "A public client can't keep a secret. PKCE binds the authorization request and the code exchange with a one-time verifier/challenge pair, protecting against code interception. Implicit and Password Grant are considered deprecated and insecure.",
    sources: ["oauth-pkce", "oauth2"],
  },
  {
    question: "How does OpenID Connect differ from OAuth 2.0?",
    options: [
      "OIDC adds authentication to OAuth: an ID token with user data",
      "OIDC is an obsolete version of OAuth that is no longer supported",
      "OIDC encrypts data while OAuth transmits it in the clear",
    ],
    answer: 0,
    explanation:
      "OAuth 2.0 is a protocol for delegating access to resources (\"let this app read my calendar\"); it doesn't say who the user is. OIDC, built on top of it, standardizes sign-in: ID token (JWT), userinfo, discovery. \"Sign in with Google\" is OIDC.",
    sources: ["oidc", "oauth2"],
  },
  {
    question: "How do you protect against CSRF with cookie-based authentication?",
    options: [
      "`SameSite` cookies plus a CSRF token or an `Origin` check",
      "Switch from HTTPS to HTTP so cookies aren't sent",
      "Store cookies only in `sessionStorage`",
    ],
    answer: 0,
    explanation:
      "The browser attaches cookies to requests from other sites. `SameSite=Lax/Strict` blocks most such scenarios, and a token or `Origin` check covers the rest. GET must not change data, otherwise the protection breaks.",
    sources: ["owasp-csrf", "mdn-set-cookie"],
  },
  {
    question: "What should you use for real-time notifications that only flow from the server?",
    options: [
      "Server-Sent Events: a simple HTTP stream with auto-reconnect",
      "WebSocket is mandatory — SSE can't transmit data",
      "Polling every 100 ms for minimal latency",
    ],
    answer: 0,
    explanation:
      "SSE is simpler than WebSocket: it runs over HTTP, reconnects on its own and sends `Last-Event-ID` to catch up on missed events. WebSocket is needed when the client also sends data frequently. Polling every 100 ms creates a huge load.",
    sources: ["mdn-sse", "mdn-websockets"],
  },
  {
    question: "What should be handled when a WebSocket reconnects?",
    options: [
      "Backoff, resubscribing and fetching what was missed",
      "Instant reconnection in a loop with no pauses",
      "Reloading the page on every connection drop",
    ],
    answer: 0,
    explanation:
      "Instant retries from thousands of clients will finish off a recovering server. After reconnecting, the client resubscribes to channels and requests events since the last received id. The UI shows the connection status.",
    sources: ["aws-backoff", "mdn-websockets"],
  },
  {
    question: "How do you safely retry a payment request after a network error?",
    options: [
      "Send an idempotency key with every attempt",
      "Retry until a response arrives, without any extra data",
      "Never retry: ask the user to fill out the form again",
    ],
    answer: 0,
    explanation:
      "On a timeout you don't know whether the request got through. The key (`Idempotency-Key`) is generated by the client per operation; when the server sees a retry, it returns the stored result. This is how Stripe and many payment APIs work.",
    sources: ["stripe-idempotency", "mdn-idempotent"],
  },
  {
    question: "Why add random jitter to exponential retry backoff?",
    options: [
      "So clients don't retry at the same moment",
      "So requests complete faster on average",
      "To bypass server rate limiting",
    ],
    answer: 0,
    explanation:
      "If a service goes down and comes back, all clients with identical backoff hit it simultaneously (thundering herd). The random component spreads retries over time. This is covered in detail in an AWS Architecture Blog article.",
    sources: ["aws-backoff"],
  },
  {
    question: "How should user file uploads to cloud storage be organized?",
    options: [
      "Get a signed URL and upload directly to storage",
      "Send the file as base64 inside JSON to the API server",
      "Store files in `localStorage` and sync them overnight",
    ],
    answer: 0,
    explanation:
      "A presigned URL lets the browser upload the file directly to S3/GCS without loading the API server or exposing keys. The backend checks permissions and issues a time-limited URL, then confirms the upload. Base64 increases size by a third.",
    sources: ["s3-presigned"],
  },
  {
    question: "How do you reliably upload multi-gigabyte files?",
    options: [
      "Split into chunks with resume after a disconnect",
      "Send in a single request and increase the server timeout",
      "Compress the file in the browser to 10 MB before sending",
    ],
    answer: 0,
    explanation:
      "A drop at 95% of one big request loses everything. Chunks (S3 multipart upload, the tus protocol) let you resume from the break point, upload parts in parallel and show accurate progress.",
    sources: ["tus", "s3-presigned"],
  },
  {
    question: "How do you handle conflicts when two users edit the same record?",
    options: [
      "A version or ETag: the server rejects a stale update",
      "The last one to save is always right; conflicts don't matter",
      "Lock the record for everyone while it is being viewed",
    ],
    answer: 0,
    explanation:
      "The client sends `If-Match: <etag>` or a `version` field; if the record has already changed, the server returns 409/412 and the UI offers to refresh or merge changes. \"Last write wins\" silently loses someone else's work.",
    sources: ["mdn-etag", "sd-primer"],
  },
  {
    question: "How would you build offline mode for a notes app?",
    options: [
      "Service Worker for the shell, IndexedDB for data and a sync queue for changes",
      "Store notes in cookies so they're sent to the server automatically",
      "Disable the app without a network and show an error page",
    ],
    answer: 0,
    explanation:
      "Offline-first: the shell comes from the SW cache, data is read and written locally, changes accumulate in a queue and are sent when the network returns (Background Sync or on the `online` event). Conflict resolution needs to be thought through.",
    sources: ["webdev-offline-cookbook", "mdn-indexeddb"],
  },
  {
    question: "What makes an app a PWA?",
    options: [
      "A manifest and a Service Worker: install, offline, push",
      "Compiling the site into a native app for the App Store",
      "Speeding up the site by dropping JavaScript",
    ],
    answer: 0,
    explanation:
      "A Progressive Web App is a regular HTTPS site with a web app manifest and a Service Worker. It can be installed on the home screen, works offline and receives notifications. Capabilities depend on the platform.",
    sources: ["mdn-pwa", "mdn-service-worker"],
  },
  {
    question: "Which rendering strategy makes sense for a landing page, a catalog and a user dashboard?",
    options: [
      "Landing — SSG, catalog — ISR, dashboard — dynamic",
      "CSR everywhere — it's easier to maintain",
      "SSR everywhere with no caching — data is always fresh",
    ],
    answer: 0,
    explanation:
      "The strategy follows the page's data: identical for everyone and rarely changing — static; shared data with regular updates — cache with revalidation; personal data — render per request (or PPR: a static shell plus streaming).",
    sources: ["webdev-rendering-on-web", "next-caching"],
  },
  {
    question: "What's wrong with fully hydrating a large content page?",
    options: [
      "The browser executes JS even for static text",
      "Hydration deletes the HTML received from the server",
      "Hydration is only available for pages under 100 KB",
    ],
    answer: 0,
    explanation:
      "Until the JS runs, the page is visible but unresponsive — INP and TBT suffer. Solutions: Server Components (static parts aren't hydrated), islands, lazy client components, `content-visibility`.",
    sources: ["webdev-rendering-on-web", "pd-islands"],
  },
  {
    question: "How do you track performance for real users?",
    options: [
      "RUM: collect Web Vitals in production and analyze by percentiles",
      "Run Lighthouse once before a release on a developer's laptop",
      "Watch the project's build time in CI",
    ],
    answer: 0,
    explanation:
      "The `web-vitals` library (or `useReportWebVitals` in Next.js) sends LCP, INP, CLS via `sendBeacon`. Look at the 75th percentile by device type and page, and correlate regressions with releases. Lab tests are useful but don't replace field data.",
    sources: ["webdev-vitals", "webdev-lab-field"],
  },
  {
    question: "How do you speed up navigation to the page the user is likely to open next?",
    options: [
      "Prefetch code and data based on user intent",
      "Load every page of the site on the first visit",
      "Disable the browser cache so data is fresher",
    ],
    answer: 0,
    explanation:
      "Prefetching based on user intent makes navigation nearly instant without wasting bandwidth on everything. Next.js `<Link>`, `queryClient.prefetchQuery` on `onMouseEnter`, `<link rel=\"prefetch\">`, the Speculation Rules API.",
    sources: ["next-prefetching", "tq-prefetching"],
  },
  {
    question: "Why are third-party scripts (analytics, chats, ads) dangerous for performance?",
    options: [
      "They compete for the main thread and network and can block rendering",
      "They don't affect performance since they load from other domains",
      "They speed up the site thanks to the provider's CDN cache",
    ],
    answer: 0,
    explanation:
      "Third-party code can be heavy and is outside your control. Load it asynchronously and deferred (`next/script` with the `lazyOnload` strategy), use facades (a preview instead of the widget), move it to workers (Partytown), set a budget.",
    sources: ["next-script", "webdev-performance-budgets"],
  },
  {
    question: "How does a canary release differ from blue-green?",
    options: [
      "Canary — to a portion of users, blue-green — to everyone at once",
      "Canary is for the frontend, blue-green is only for databases",
      "Blue-green rolls out to a portion of users, canary to everyone at once",
    ],
    answer: 0,
    explanation:
      "Blue-green keeps two environments and switches traffic instantly, allowing fast rollback. Canary sends 1–5% of traffic to the new version and widens the share while watching metrics. They're often combined with feature flags.",
    sources: ["mf-canary", "mf-blue-green"],
  },
  {
    question: "How do you gradually enable a new feature for 10% of users?",
    options: [
      "A flag with rollout by user id hash",
      "A separate deploy for every tenth user",
      "`Math.random() < 0.1` on every page load",
    ],
    answer: 0,
    explanation:
      "A hash of the user id gives stable group membership across sessions and devices. `Math.random()` would toggle the feature on every load. Flags are evaluated on the server or at the edge to avoid UI flicker.",
    sources: ["mf-feature-toggles"],
  },
  {
    question: "What are the pros and cons of a monorepo for several frontend apps?",
    options: [
      "Shared code and atomic changes, but you need build and caching tooling",
      "A monorepo makes users' browsers run faster",
      "A monorepo forbids different dependency versions and any libraries",
    ],
    answer: 0,
    explanation:
      "A change to the UI kit and all apps can be done in one PR, and code reuse is easier. The cost is scaling CI: you need tools with a dependency graph and caching (Turborepo, Nx), plus ownership and boundary rules.",
    sources: ["monorepo-tools"],
  },
  {
    question: "What is the foundation of a scalable design system?",
    options: [
      "Tokens, documented components, versioning",
      "One big CSS file copied into every project",
      "Mockup screenshots in a shared folder",
    ],
    answer: 0,
    explanation:
      "Tokens (colors, spacing, typography) are a single source of truth for design and code. Components are documented and tested in Storybook and published as a package with SemVer. Accessibility out of the box and a clear evolution process matter.",
    sources: ["storybook", "tw-theme"],
  },
  {
    question: "How should the UI behave when one dashboard widget fails?",
    options: [
      "Isolate the failure and show a fallback only for that widget",
      "Show a blank screen and ask to reload the page",
      "Hide the error and show an empty widget with no explanation",
    ],
    answer: 0,
    explanation:
      "Graceful degradation: the rest of the dashboard works, the broken widget has a message and a \"Retry\" button, and the error goes to monitoring. Error boundaries are placed around independent parts.",
    sources: ["react-error-boundary", "next-error-handling"],
  },
  {
    question: "Why pass a request id / trace id from the frontend through to the backend?",
    options: [
      "To link a browser error to the logs and traces of every service",
      "So the server can cache responses by that id",
      "To limit the number of requests from a single user",
    ],
    answer: 0,
    explanation:
      "Distributed tracing (OpenTelemetry, the `traceparent` header) shows a request's path through the API gateway, services and DB. A user sends a screenshot with the error id — and you immediately find the full context.",
    sources: ["opentelemetry"],
  },
  {
    question: "How does the token bucket rate limiting algorithm work?",
    options: [
      "The bucket refills with tokens at a constant rate; each request spends one",
      "Each user gets a fixed number of requests forever",
      "Requests are processed strictly one at a time in queue order",
    ],
    answer: 0,
    explanation:
      "Bucket capacity sets the allowed burst, the refill rate sets the average limit. When tokens run out, the server responds with 429. Alternatives: fixed/sliding window, leaky bucket.",
    sources: ["wiki-token-bucket", "mdn-429"],
  },
  {
    question: "How do you show other participants' cursors in a collaborative editor without flooding the network?",
    options: [
      "Send the position with throttling and interpolate movement on the client",
      "Send every mouse movement without limits",
      "Sync cursors only when the document is saved",
    ],
    answer: 0,
    explanation:
      "Presence data is ephemeral: it isn't stored in the document, it's sent at most 10–20 times per second and smoothed with animation. The document edits themselves are synced separately — via OT or CRDT.",
    sources: ["crdt-tech", "mdn-websockets"],
  },
  {
    question: "The unread message counter differs between tabs. How do you fix it?",
    options: [
      "Sync tabs via `BroadcastChannel`",
      "Forbid opening the site in multiple tabs",
      "Reload all tabs once a minute",
    ],
    answer: 0,
    explanation:
      "Each tab is a separate app with its own state. `BroadcastChannel` passes changes between them; you can also keep a single server connection in a SharedWorker and broadcast events to tabs.",
    sources: ["mdn-broadcast-channel", "mdn-web-workers"],
  },
  {
    question: "How do you load translations in a multilingual SPA without bloating the bundle?",
    options: [
      "Dynamically load only the current language's dictionary (and per section)",
      "Include every language in the main bundle for instant switching",
      "Translate texts on the fly via an external API on every render",
    ],
    answer: 0,
    explanation:
      "Dictionaries for all languages easily take hundreds of kilobytes. Dynamic import by locale and namespace saves bandwidth. With Server Components, dictionaries don't end up in the client bundle at all.",
    sources: ["next-i18n", "mdn-dynamic-import"],
  },
  {
    question: "Which HTTP security headers should a web app configure?",
    options: [
      "CSP, HSTS, `frame-ancestors`, `nosniff`",
      "Only `Access-Control-Allow-Origin: *` on all responses",
      "None — HTTPS fully takes care of security",
    ],
    answer: 0,
    explanation:
      "CSP restricts script sources, HSTS enforces HTTPS, `frame-ancestors` prevents embedding the site in an attacker's frames, `nosniff` prevents MIME type sniffing. `ACAO: *` on private APIs is, on the contrary, dangerous.",
    sources: ["mdn-csp", "owasp-top10"],
  },
  {
    question: "How do you send analytics events efficiently?",
    options: [
      "Queue them, send in batches and flush when the page is hidden",
      "Send a separate request for every click immediately",
      "Store all events in cookies and send them once a week",
    ],
    answer: 0,
    explanation:
      "Batching reduces the number of requests and the load on the main thread. On `visibilitychange` to `hidden`, the remainder is sent via `sendBeacon`. User consent (cookie consent) must be respected.",
    sources: ["mdn-send-beacon"],
  },
  {
    question: "Why can returning `totalCount` in every list response be expensive?",
    options: [
      "An exact `COUNT(*)` with filters loads the database",
      "JSON can't transmit large numbers",
      "The browser can't display a number over a million",
    ],
    answer: 0,
    explanation:
      "An infinite feed doesn't need an exact number — `hasNextPage` is enough. If the number matters, use an approximate estimate, cache the count, or compute it separately and less often.",
    sources: ["slack-pagination", "sd-primer"],
  },
  {
    question: "How does an API Gateway differ from a BFF?",
    options: [
      "Gateway is a shared entry point, BFF is a layer for a specific client",
      "Gateway works only with GraphQL and BFF only with REST",
      "They are synonyms for the same service",
    ],
    answer: 0,
    explanation:
      "A gateway handles cross-cutting concerns for all clients. A BFF aggregates and adapts data to the needs of a specific interface (web, mobile app). In real systems they often coexist.",
    sources: ["mf-microservices", "sd-primer"],
  },
  {
    question: "How do you update the client cache after a mutation so the user sees the changes?",
    options: [
      "Invalidate queries or put the response into the cache",
      "Reload the page after every mutation",
      "Wait until the cache expires on a timer",
    ],
    answer: 0,
    explanation:
      "Key-based invalidation (`invalidateQueries`, RTK Query tags) refetches fresh data; if the server returned the updated object, it's written into the cache directly without an extra request. On the Next.js server the equivalent is `updateTag`/`revalidatePath`.",
    sources: ["tq-invalidation", "rtk-query-invalidation"],
  },
  {
    question: "What is the back/forward cache and how do you avoid breaking it?",
    options: [
      "A page snapshot for instant \"back\"; `unload` and `no-store` get in the way",
      "A Service Worker cache of API responses for back and forward navigation",
      "An SPA router history cache enabled in `next.config`",
    ],
    answer: 0,
    explanation:
      "bfcache stores a snapshot of the page with its JS state, so the \"Back\" button opens it instantly. `unload` handlers, `Cache-Control: no-store` and open connections can disqualify a page from this optimization. Use `pagehide` and `visibilitychange` instead of `unload`.",
    sources: ["webdev-bfcache"],
  },
  {
    question: "How do you handle an access token expiring while the user is working?",
    options: [
      "Intercept 401, refresh the token once and retry pending requests",
      "Log the user out immediately and lose unsaved data",
      "Refresh the token before every request, even if it's still valid",
    ],
    answer: 0,
    explanation:
      "Several parallel requests may get 401 at the same time — the refresh must run once (a shared promise), while the other requests wait for it and are retried. If the refresh fails, log out while preserving drafts.",
    sources: ["owasp-session", "rg-chain"],
  },
  {
    question: "Why is search for large catalogs done on the server rather than by filtering on the client?",
    options: [
      "Millions of records can't be loaded into the browser",
      "Browsers don't support comparing strings in non-Latin languages",
      "Client-side filtering is forbidden by security policies",
    ],
    answer: 0,
    explanation:
      "Server-side search engines (Elasticsearch, Meilisearch, PostgreSQL full-text search) provide relevance, typo tolerance and facets. Client-side filtering is appropriate for hundreds to thousands of already loaded records.",
    sources: ["sd-primer"],
  },
  {
    question: "How do you manage focus when opening a modal in an SPA?",
    options: [
      "Move focus inside, trap it and restore it after closing",
      "Leave focus on the page beneath the modal",
      "Remove focus from all elements with `outline: none`",
    ],
    answer: 0,
    explanation:
      "Without focus management, keyboard and screen reader users get lost. The native `<dialog>` with `showModal()` does most of the work. At the system level, this is built into the design system's base components.",
    sources: ["wai-dialog-pattern", "mdn-dialog"],
  },
];

export default questions;
