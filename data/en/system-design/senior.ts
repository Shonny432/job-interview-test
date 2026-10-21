import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What does the CAP theorem state?",
    options: [
      "During a network partition you have to choose between consistency and availability",
      "A distributed system can always provide all three properties at once",
      "Cache, API and persistence can't be placed on the same server",
    ],
    answer: 0,
    explanation:
      "Consistency, Availability, Partition tolerance: network partitions are inevitable in a distributed system, and at that moment the system either rejects some requests (CP) or responds with possibly stale data (AP). In normal operation the trade-off is between consistency and latency (PACELC).",
    sources: ["wiki-cap-uk", "sd-primer"],
  },
  {
    question: "A user updated their profile, refreshed the page and saw the old data. Which guarantee was violated?",
    options: [
      "Read-your-writes: the user must see their own changes",
      "Atomicity: the change was only half applied",
      "Transaction isolation: two requests interfere with each other",
    ],
    answer: 0,
    explanation:
      "A typical cause is reading from a replica the change hasn't reached yet, or a stale cache. Solutions: read \"own\" data from the primary for a while after a write, update the client cache with the mutation response, use `updateTag` instead of SWR invalidation.",
    sources: ["wiki-replication", "next-updateTag"],
  },
  {
    question: "Why is choosing \"creation date\" as a sharding key dangerous?",
    options: [
      "All new records land in one shard — a hot partition",
      "Dates can't be used as keys in databases",
      "Records with the same date will be deleted as duplicates",
    ],
    answer: 0,
    explanation:
      "Sharding distributes data across nodes; the key must spread the load evenly and match the queries. A monotonic key concentrates writes in the last shard. A hash of the user id or a composite key is often used.",
    sources: ["wiki-sharding", "sd-primer"],
  },
  {
    question: "Why use consistent hashing when adding cache nodes?",
    options: [
      "When the number of nodes changes, only a small share of keys move",
      "It guarantees that all keys are stored on all nodes",
      "It encrypts keys so nodes can't see each other's data",
    ],
    answer: 0,
    explanation:
      "With `hash(key) % N`, changing N redistributes almost all keys and the cache misses en masse. A hash ring (with virtual nodes) moves only ~1/N of the keys. Used in distributed caches, CDNs and databases.",
    sources: ["wiki-consistent-hashing", "sd-primer"],
  },
  {
    question: "Why put a message queue between the API and a heavy-task worker?",
    options: [
      "To decouple intake from processing and smooth out load spikes",
      "To make processing synchronous and guarantee a 10 ms response",
      "To replace the database with faster storage",
    ],
    answer: 0,
    explanation:
      "The API quickly accepts the request and enqueues a task (report generation, video processing), and workers process it at their own pace. Load spikes are smoothed out, and a worker failure doesn't lose the task. The client learns the result via status polling, SSE or a notification.",
    sources: ["wiki-message-queue", "sd-primer"],
  },
  {
    question: "Why must consumers of an \"at-least-once\" queue be idempotent?",
    options: [
      "A message may arrive again, and that must cause no harm",
      "Otherwise the queue deletes the message before it is processed",
      "Idempotency is only needed for queues with a single consumer",
    ],
    answer: 0,
    explanation:
      "Exactly-once is expensive or unattainable in practice, so systems guarantee \"at least once\". The handler stores ids of processed messages or makes operations idempotent (upsert instead of insert).",
    sources: ["wiki-message-queue", "stripe-idempotency"],
  },
  {
    question: "What is backpressure?",
    options: [
      "A signal from a slow consumer to the source: \"slow down\"",
      "Processing queue messages in reverse order",
      "Compressing data before sending it over a back channel",
    ],
    answer: 0,
    explanation:
      "Without backpressure, a fast source overflows the consumer's buffers and memory. Examples: the Streams API in the browser (`ReadableStream` with a queue), limiting queue size, rejecting requests with 429/503.",
    sources: ["sd-primer"],
  },
  {
    question: "How does fan-out on write differ from fan-out on read in a social feed?",
    options: [
      "On write, a post is copied into followers' feeds; on read, the feed is assembled on the fly",
      "On write, a post is sent only to the author; on read, to all users",
      "They're the same thing; only the terminology differs",
    ],
    answer: 0,
    explanation:
      "Precomputed feeds make reads fast, but a celebrity's post with millions of followers generates millions of writes. Assembling on read is cheap to write but slow to read. Usually it's a hybrid: fan-out on write for regular authors, merge-in at read time for celebrities.",
    sources: ["sd-primer"],
  },
  {
    question: "How do you guarantee correct message order in a chat?",
    options: [
      "Server-assigned sequence numbers per conversation, not client time",
      "Sort messages by the sender's device time",
      "Send messages strictly one at a time and wait for everyone's acknowledgment",
    ],
    answer: 0,
    explanation:
      "Device clocks drift, and messages are delivered along different paths. The server assigns a monotonic number within a conversation; the client shows a sent message with a temporary id and replaces it with the confirmed one. Gaps in numbers signal the need to fetch missing messages.",
    sources: ["sd-primer", "mdn-websockets"],
  },
  {
    question: "Which components are usually needed in a messenger architecture?",
    options: [
      "WS gateways, message storage, presence and push",
      "One server with a database that all clients poll once a second",
      "Only a CDN, since messages are static files",
    ],
    answer: 0,
    explanation:
      "Gateways hold connections and scale horizontally; pub/sub (Redis, Kafka) sits between them so a message reaches the right node. Message storage, delivery and read receipts, presence with heartbeats, push notifications, cross-device sync.",
    sources: ["mdn-websockets", "wiki-message-queue"],
  },
  {
    question: "How do you scale WebSocket servers horizontally?",
    options: [
      "Connect nodes via pub/sub for delivery between them",
      "Keep all connections on one server with lots of memory",
      "Reconnect clients to a random node on every message",
    ],
    answer: 0,
    explanation:
      "Users of the same chat are connected to different nodes. The node that receives a message publishes it to a bus, and nodes with subscribers deliver it to their connections. The load balancer must support long-lived connections; during deploys clients reconnect gradually.",
    sources: ["wiki-load-balancing", "mdn-websockets"],
  },
  {
    question: "How do you implement an \"online\" status for millions of users?",
    options: [
      "Heartbeat with TTL: the status expires without client signals",
      "Write the status to the main database on every mouse move",
      "Poll every user from the server once a second",
    ],
    answer: 0,
    explanation:
      "The client sends a signal every N seconds, and the server stores a key with a TTL in fast storage (Redis). A disconnect without an explicit logout is detected by expiration. Status changes are broadcast only to those who can see them.",
    sources: ["sd-primer"],
  },
  {
    question: "How does OT differ from CRDT in collaborative editing?",
    options: [
      "OT transforms operations via a server, CRDTs converge on their own",
      "OT works only with images and CRDT only with text",
      "CRDT requires locking the document for every edit",
    ],
    answer: 0,
    explanation:
      "Operational Transformation (Google Docs) adjusts concurrent operations relative to each other, which is easier with an arbiter server. CRDTs (Yjs, Automerge) are structures whose states mathematically merge into one in any order; they're convenient for offline and P2P but carry metadata.",
    sources: ["crdt-tech", "wiki-ot"],
  },
  {
    question: "How does adaptive video streaming (HLS/DASH) work?",
    options: [
      "Segments at different bitrates; the player picks based on the network",
      "The whole video is downloaded as one file at maximum quality",
      "The server streams the video frame by frame over WebSocket",
    ],
    answer: 0,
    explanation:
      "A playlist lists quality variants, and the player (via MSE) picks segments based on bandwidth and buffer. Segments are ordinary HTTP files, so a CDN caches them well.",
    sources: ["apple-hls", "mdn-mse"],
  },
  {
    question: "How would you design serving user images in different sizes?",
    options: [
      "Store the original, generate sizes and formats on demand and cache on a CDN",
      "Pre-generate every possible size for every device at upload time",
      "Serve only the original and scale it in the browser with CSS",
    ],
    answer: 0,
    explanation:
      "A transformation service (in-house or cloud) creates a variant from width and format URL parameters and puts it into the CDN cache. The set of allowed sizes is limited to avoid endless variants and to prevent attacks on the service.",
    sources: ["wiki-cdn", "webdev-image-formats"],
  },
  {
    question: "How do you implement rate limiting when the API runs on 20 servers?",
    options: [
      "Keep counters in shared fast storage (Redis) or at the gateway",
      "Count limits on each server independently — the result is the same",
      "Limit requests only in the browser with JavaScript",
    ],
    answer: 0,
    explanation:
      "Local counters give a limit ×20 and depend on load balancing. Shared storage with atomic operations (or a limiter at the API gateway/CDN) gives a global limit. Client-side limits are easily bypassed.",
    sources: ["wiki-rate-limiting", "wiki-token-bucket"],
  },
  {
    question: "What is a Bloom filter useful for?",
    options: [
      "Quickly checking \"definitely not / maybe\" in a set",
      "Exactly counting the number of unique elements in a set",
      "Sorting a billion records without using memory",
    ],
    answer: 0,
    explanation:
      "A Bloom filter never gives false negatives but allows false positives. Example: quickly rule out usernames that are definitely free, or URLs that are definitely not cached, before going to the DB.",
    sources: ["wiki-bloom-filter"],
  },
  {
    question: "How do you generate short links in a URL shortener?",
    options: [
      "A unique id from a counter, encoded in base62",
      "Random 3 characters without collision checks",
      "An MD5 hash of the whole URL, all 32 characters",
    ],
    answer: 0,
    explanation:
      "Base62 of a 64-bit id gives a short string without collisions; the counter is handed out in ranges so nodes don't sync on every request. Random short strings require collision checks; a full hash is too long. Reads are cached, and the redirect is 301 or 302 depending on whether analytics is needed.",
    sources: ["sd-primer"],
  },
  {
    question: "How do you scale search suggestions (typeahead) to millions of requests per second?",
    options: [
      "Precomputed top-K per prefix, edge caching, debounce",
      "Full-text search across the whole database on every keystroke",
      "Load the full dictionary of all possible suggestions into the browser",
    ],
    answer: 0,
    explanation:
      "Popular prefixes and their suggestions (a trie or key-value) are updated offline from query logs, and responses are cached on the CDN and in the browser. The client reduces requests with debounce, cancellation and a local prefix cache.",
    sources: ["wiki-trie", "wiki-cdn"],
  },
  {
    question: "What problems arise when running a service in multiple regions (active-active)?",
    options: [
      "Write conflicts, replication lag, data laws",
      "None — data syncs instantly and for free",
      "Only a bigger hosting bill; the architecture doesn't change",
    ],
    answer: 0,
    explanation:
      "Writing in two regions simultaneously requires a conflict resolution strategy (last-write-wins, CRDT, a user's \"home region\"). In addition, data localization laws (e.g. GDPR) restrict where personal data may be stored.",
    sources: ["wiki-replication", "wiki-cap-uk"],
  },
  {
    question: "Why is a `Vary: User-Agent` or `Vary: Cookie` header dangerous for a CDN?",
    options: [
      "The cache key fragments and almost no hits remain",
      "The CDN stops compressing responses for such requests",
      "The browser rejects responses with that header",
    ],
    answer: 0,
    explanation:
      "`Vary` adds request headers to the cache key. User-Agent and Cookie are nearly unique per visitor, so the cache becomes useless. Normalize the key (device class instead of the full UA) and move personalization out of the cached response.",
    sources: ["mdn-http-caching", "wiki-cdn"],
  },
  {
    question: "What is a cache stampede and how do you prevent it?",
    options: [
      "An avalanche of recomputations of an expired entry; locks and SWR help",
      "The cache overflows and evicts all entries at once",
      "Users clear their browser cache en masse",
    ],
    answer: 0,
    explanation:
      "When a popular key expires, thousands of requests hit the DB at once. Solutions: request coalescing (one recomputes, the others wait), stale-while-revalidate, random TTL jitter, warming.",
    sources: ["webdev-swr", "sd-primer"],
  },
  {
    question: "How do cache-aside, write-through and write-back strategies differ?",
    options: [
      "Cache on read; write to cache and DB; deferred write to DB",
      "They're three names for one strategy in different databases",
      "They differ only in the amount of memory allocated to the cache",
    ],
    answer: 0,
    explanation:
      "Cache-aside (lazy loading) is the most common: on a miss, read the DB and put the result in the cache. Write-through keeps the cache up to date at the cost of slower writes. Write-back is faster but risks losing data if the cache fails.",
    sources: ["sd-primer"],
  },
  {
    question: "When should you render at the edge, and when in a region near the database?",
    options: [
      "Edge for light logic, region for frequent DB queries",
      "Edge is always faster, regardless of where the data lives",
      "A region is always faster; the edge is only for static assets",
    ],
    answer: 0,
    explanation:
      "The edge is close to the user, but if a page makes five sequential DB queries across an ocean, each adds hundreds of milliseconds. Rendering near the data plus CDN caching often wins. The edge is good for redirects, A/B tests, cookie-based personalization and auth.",
    sources: ["next-proxy", "wiki-cdn"],
  },
  {
    question: "What ways of composing micro-frontends exist?",
    options: [
      "At build time, on the server and at runtime in the browser",
      "Only via iframe — there are no other ways",
      "Only via a shared npm package built into one bundle",
    ],
    answer: 0,
    explanation:
      "Build-time composition is simple but rules out independent deploys. Server-side composition assembles HTML from fragments. Runtime composition gives independent releases at the cost of complexity and dependency coordination. iframes give isolation but are poor for UX and SEO.",
    sources: ["mf-micro-frontends", "module-federation"],
  },
  {
    question: "How do you deploy an API change without breaking clients on the old version?",
    options: [
      "Expand-and-contract: add, migrate, remove the old",
      "Roll out the API and frontend simultaneously, in the same second",
      "Ask users to refresh the page after the release",
    ],
    answer: 0,
    explanation:
      "Open tabs, mobile apps and caches live with old code. First the API supports both the old and new format, then clients migrate, and only then is the old one removed. The same approach applies to DB schema migrations.",
    sources: ["mf-strangler", "sd-primer"],
  },
  {
    question: "Why do users get a `ChunkLoadError` after an SPA deploy?",
    options: [
      "An old tab requests a chunk that has already been removed",
      "The browser doesn't support dynamic module imports",
      "The CDN blocks JavaScript files larger than 1 MB",
    ],
    answer: 0,
    explanation:
      "Hashed names change, and a lazily loaded chunk of the old version disappears. Solutions: keep assets from the last few releases, catch the error and reload the page, version skew protection (`deploymentId` in Next.js).",
    sources: ["next-self-hosting", "mdn-dynamic-import"],
  },
  {
    question: "How do metrics, logs and traces complement each other?",
    options: [
      "Metrics show something is wrong, traces show where, logs show why",
      "They are three names for the same tool",
      "Logs replace metrics and traces if they're detailed enough",
    ],
    answer: 0,
    explanation:
      "Metrics (error rate, p95 latency) are cheap and suitable for alerts. A distributed trace shows a request's path through services. Logs give details of a specific event. OpenTelemetry standardizes collecting all three signals.",
    sources: ["opentelemetry", "sre-slo"],
  },
  {
    question: "What is an error budget?",
    options: [
      "The allowed share of failures under the SLO that can be \"spent\"",
      "The amount of money allocated to fixing bugs per quarter",
      "The maximum number of open issues in the bug tracker",
    ],
    answer: 0,
    explanation:
      "With a 99.9% SLO, the budget is 0.1% failed requests. While budget remains, the team ships features; when it's exhausted, the focus shifts to reliability. This makes reliability a measurable trade-off rather than an argument.",
    sources: ["sre-slo"],
  },
  {
    question: "What is the Bulkhead pattern?",
    options: [
      "Resource isolation so one failure doesn't consume the whole system",
      "Merging all services into one process for speed",
      "Encrypting data separately for each user",
    ],
    answer: 0,
    explanation:
      "Separate connection and thread pools for different dependencies: a slow recommendations service won't take all the connections needed for payments. Together with circuit breakers and timeouts it prevents cascading failures.",
    sources: ["mf-circuit-breaker", "sd-primer"],
  },
  {
    question: "Why is it important to look at p99 latency and not just the average?",
    options: [
      "The average hides the slow \"tail\" of requests",
      "p99 is always lower than the average and looks better in reports",
      "The average can't be computed for network requests",
    ],
    answer: 0,
    explanation:
      "If a page makes 20 requests, the probability of hitting at least one slow one is high, and the user waits for the slowest. That's why SLOs are stated in percentiles (p95, p99), and Web Vitals are assessed at the 75th percentile.",
    sources: ["sre-slo", "webdev-vitals"],
  },
  {
    question: "How do you combine CDN caching of HTML with personalization (username, cart)?",
    options: [
      "Cache the shell and stream personal parts separately",
      "Disable HTML caching for all pages",
      "Cache HTML separately for each user on the CDN",
    ],
    answer: 0,
    explanation:
      "Partial Prerendering, Edge Side Includes or client-side loading: the static part is served instantly from the CDN, and personal fragments are filled in on request. A per-user cache kills CDN efficiency and risks leaks.",
    sources: ["next-cache-components", "webdev-rendering-on-web"],
  },
  {
    question: "Why can't a successful redirect from the payment page be treated as payment confirmation?",
    options: [
      "A redirect can be faked; the provider's webhook confirms it",
      "Redirects always arrive before the money is charged",
      "Payment providers don't support redirects back to the site",
    ],
    answer: 0,
    explanation:
      "The user may close the tab or open the success URL manually. The source of truth is a server-side webhook from the provider with signature verification, plus a status check via the API. Webhook handling must be idempotent.",
    sources: ["stripe-idempotency", "owasp-top10"],
  },
  {
    question: "How do you verify the authenticity of an incoming webhook?",
    options: [
      "Verify the HMAC signature and timestamp",
      "Check that the request came via POST",
      "Check that the body contains a `verified: true` field",
    ],
    answer: 0,
    explanation:
      "The webhook endpoint is public; anyone can call it. The provider signs the body with a secret, and you verify the signature (on the raw body) and the time to reject replays. Everything else is easy to forge.",
    sources: ["owasp-top10", "stripe-idempotency"],
  },
  {
    question: "Why is the search index often updated asynchronously rather than in the same transaction?",
    options: [
      "So DB writes don't depend on search; the cost is a delay",
      "Search engines don't support writing data at all",
      "Transactions are forbidden when working with text data",
    ],
    answer: 0,
    explanation:
      "Changes are fed into the index via a queue or CDC (change data capture). The main operation is fast and reliable, and search catches up within seconds — eventual consistency. The UI must be ready for this (e.g. show just-created items from local state).",
    sources: ["wiki-message-queue", "mf-cqrs"],
  },
  {
    question: "How do you atomically update the database and publish an event to a queue?",
    options: [
      "Outbox: the event is written to the DB in the same transaction",
      "Send the event first, then write to the database — order doesn't matter",
      "Send the event from the user's browser after a successful API response",
    ],
    answer: 0,
    explanation:
      "Without a transaction spanning the DB and the broker, inconsistencies are possible: the write succeeded but the event was lost (or vice versa). An outbox table records the event atomically with the change, and a relay publishes it with retries (at-least-once).",
    sources: ["mf-event-sourcing", "wiki-message-queue"],
  },
  {
    question: "A service must handle 10 million daily active users making 20 requests each. What is the average load?",
    options: ["≈ 2,300 requests per second", "≈ 200,000 requests per second", "≈ 23 requests per second"],
    answer: 0,
    explanation:
      "200 million requests per day / 86,400 seconds ≈ 2,315 RPS on average. Peak load is usually 2–5× the average, and capacity is planned for it. Such back-of-the-envelope estimates are expected in interviews.",
    sources: ["sd-primer"],
  },
  {
    question: "How does designing a read-heavy system differ from a write-heavy one?",
    options: [
      "Reads — caches and replicas; writes — queues and sharding",
      "No difference: architecture doesn't depend on the operation ratio",
      "Read-heavy systems don't use databases",
    ],
    answer: 0,
    explanation:
      "A product catalog is read thousands of times more often than it changes — it pays to cache and scale reads. Collecting metrics or logs is a stream of writes: ingestion via a queue, batch writes and partitioning matter.",
    sources: ["sd-primer", "wiki-replication"],
  },
  {
    question: "How do you build an analytics dashboard over millions of events so it opens quickly?",
    options: [
      "Pre-aggregate data on the server and send the client only the needed points",
      "Load all events into the browser and compute charts on the client",
      "Build charts from raw data in the main transactional database",
    ],
    answer: 0,
    explanation:
      "Separate read models (CQRS, OLAP stores) keep aggregates by interval; a chart receives a downsampled series. Heavy analytics queries must not load the main database.",
    sources: ["mf-cqrs", "sd-primer"],
  },
  {
    question: "How would you design a notification system (email, push, in-app)?",
    options: [
      "Queue, user preferences, deduplication, retries",
      "Send the notification synchronously right from the HTTP request handler",
      "Store notifications only in the recipient's `localStorage`",
    ],
    answer: 0,
    explanation:
      "An event goes into a queue; the notification service checks preferences and quiet hours, picks channels, groups and deduplicates, and sends via providers with retries and rate limits. In-app notifications are stored on the server and delivered via SSE/WebSocket.",
    sources: ["wiki-message-queue", "mdn-sse"],
  },
  {
    question: "How do you deliver the result of a heavy operation (a 5-minute report export)?",
    options: [
      "Accept the job (202 Accepted), process it in the background and notify when ready",
      "Keep the HTTP request open for all 5 minutes until the file is ready",
      "Ask the user not to close the tab and wait",
    ],
    answer: 0,
    explanation:
      "The server returns a job id, and the client tracks status (polling, SSE) or gets a notification with a link to the file in storage. Long HTTP requests get cut off by proxies and load balancers and scale poorly.",
    sources: ["wiki-message-queue", "mdn-sse"],
  },
  {
    question: "How can the frontend evaluate feature flags without UI flicker?",
    options: [
      "Evaluate flags on the server or edge and ship the result with the HTML",
      "Fetch flags on the client after render and re-render the page",
      "Keep flags in code and change them only with a new deploy",
    ],
    answer: 0,
    explanation:
      "Loading flags on the client causes a \"flash\" of the old variant and layout shifts. Server-side evaluation (or bootstrapping values into the HTML) gives a stable first render. Flags are cached and included in the page cache key.",
    sources: ["mf-feature-toggles", "next-proxy"],
  },
  {
    question: "What should be minimized in logs and analytics for privacy?",
    options: [
      "Personal data: tokens, passwords, emails and the like in URLs and events",
      "The number of log lines, regardless of content",
      "Timestamps, so the sequence of events can't be reconstructed",
    ],
    answer: 0,
    explanation:
      "Tokens in query strings end up in server and proxy logs, and emails in analytics violate GDPR requirements. Mask fields, don't put secrets in URLs, limit log retention.",
    sources: ["owasp-top10", "owasp-session"],
  },
  {
    question: "Why are signed links to private files made short-lived?",
    options: [
      "A leaked link quickly stops working",
      "Short links load faster in the browser",
      "Storage services don't support links longer than a day",
    ],
    answer: 0,
    explanation:
      "A signed URL grants access without authorization to anyone who has it. An expiry of minutes limits the damage from forwarding or leaks via logs and Referer. For long-term access, new links are issued after a permission check.",
    sources: ["s3-presigned", "owasp-top10"],
  },
  {
    question: "How does designing for strong consistency differ for a bank balance versus a like counter?",
    options: [
      "The balance needs transactions, likes don't",
      "Both require equally strict transactions without exception",
      "Both can be computed on the client without the server",
    ],
    answer: 0,
    explanation:
      "Consistency requirements are set by the domain: money needs ACID transactions and idempotency, while likes can be accumulated, aggregated asynchronously and shown with a delay (\"1.2K\"). The choice affects cost and scalability.",
    sources: ["wiki-cap-uk", "sd-primer"],
  },
  {
    question: "What are hedged requests and when are they useful?",
    options: [
      "Duplicating a request to another replica when the response is slow",
      "Requests encrypted twice for extra security",
      "Requests sent only outside business hours",
    ],
    answer: 0,
    explanation:
      "If a response takes longer than usual, a copy is sent to another server and the first response wins. This lowers p99 at the cost of a small load increase. Suitable only for idempotent reads.",
    sources: ["sre-slo", "mdn-idempotent"],
  },
  {
    question: "How do you keep the site working if the recommendations service is down?",
    options: [
      "Timeout, circuit breaker and a fallback without recommendations",
      "Wait for recommendations forever without showing the page",
      "Return a 500 error for the whole page",
    ],
    answer: 0,
    explanation:
      "Non-critical dependencies must not take down the main flow. Render the page, and show the recommendations block from cache, as popular products, or hide it. On the frontend — Suspense and an error boundary around the block, streaming instead of waiting.",
    sources: ["mf-circuit-breaker", "next-streaming"],
  },
  {
    question: "How do you estimate storage requirements for 5 years of chat messages for 1M users?",
    options: [
      "Estimate volume: messages × size × retention, plus replicas",
      "Keep everything in server memory — it's the fastest",
      "Storage doesn't matter at the design stage",
    ],
    answer: 0,
    explanation:
      "For example, 1M × 50 messages × 200 bytes ≈ 10 GB per day, ≈ 18 TB over 5 years before replication and indexes. Such an estimate drives the choice of storage, partitioning by conversation and time, and archiving of old data.",
    sources: ["sd-primer", "wiki-sharding"],
  },
  {
    question: "How does active-passive failover differ from active-active?",
    options: [
      "In active-passive a standby waits and takes over on failure; in active-active all nodes serve traffic",
      "Active-passive works only for databases, active-active only for the frontend",
      "They're the same; only the names differ across clouds",
    ],
    answer: 0,
    explanation:
      "Active-passive is simpler for consistency, but the standby sits idle and failover takes time. Active-active uses resources fully and survives a node failure unnoticed, but requires conflict resolution and load balancing.",
    sources: ["wiki-load-balancing", "wiki-replication"],
  },
  {
    question: "Why should API responses for mobile clients be designed with long-lived old versions in mind?",
    options: [
      "Old app versions live on for months",
      "Mobile clients update automatically right after a release",
      "Mobile clients don't use the API and work offline",
    ],
    answer: 0,
    explanation:
      "Unlike the web, you can't \"reload\" all users. You need backward compatibility, versioning, forced updates for critical changes and metrics by client version.",
    sources: ["sd-primer", "graphql-learn"],
  },
];

export default questions;
