import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What is the RSC payload?",
    options: [
      "The serialized render result of Server Components with references to client ones",
      "JSON with all the page's props, like `__NEXT_DATA__` in the Pages Router",
      "A compressed JS bundle of server components that runs in the browser",
    ],
    answer: 0,
    explanation:
      "The payload contains the rendered tree of server components, placeholders for client components with references to their JS chunks, and their props. On the first load it's embedded in the HTML (for hydration); during client navigation it's fetched separately. Server component code never reaches the browser.",
    sources: ["next-server-client", "react-server-components"],
  },
  {
    question: "What happens during client navigation via `<Link>` in the App Router?",
    options: [
      "The new segment's RSC payload is loaded, and React updates only the changed parts",
      "The browser requests new HTML and fully replaces the current document with it",
      "The client re-runs all server components in the browser",
    ],
    answer: 0,
    explanation:
      "The router requests the payload (or takes a prefetched one from the client cache) and reconciles it with the current tree: shared layouts are preserved and client state isn't lost. If the segment is still loading, `loading.tsx` is shown. There's no full document reload.",
    sources: ["next-linking", "next-prefetching"],
  },
  {
    question: "With `cacheComponents: true`, the dev overlay shows \"blocking route\". What does it mean?",
    options: [
      "Uncached data is read outside `<Suspense>` and blocks the static shell",
      "The route is blocked by `proxy.ts` rules and returns a 403 Forbidden response",
      "Two routes in different groups conflict over the same URL",
    ],
    answer: 0,
    explanation:
      "With Cache Components, every piece of async work must be either cached via `'use cache'` (it goes into the shell) or wrapped in `<Suspense>` (it streams at request time). Otherwise the whole page would wait for data. This rule is checked in development and at build time.",
    sources: ["next-caching", "next-cache-components"],
  },
  {
    question: "How does `'use cache: remote'` differ from `'use cache'`?",
    options: [
      "It stores the result in a remote handler shared by all instances, at the cost of network latency",
      "It caches the result on the client in IndexedDB instead of the Next.js server's memory",
      "It allows reading `cookies()` and `headers()` inside the cached function",
    ],
    answer: 0,
    explanation:
      "Plain `'use cache'` stores entries in process memory (LRU) by default, so in serverless and with multiple instances the cache is short-lived and not shared. `remote` uses a handler from `cacheHandlers` (Redis, a platform KV) — more reliable but more expensive. Access to request data comes from `'use cache: private'`, not `remote`.",
    sources: ["next-use-cache", "next-self-hosting"],
  },
  {
    question: "What do you need to consider when self-hosting Next.js on several Kubernetes pods?",
    options: [
      "The cache is local to each instance by default; you need a shared cache handler",
      "Nothing: instances sync their cache with each other automatically",
      "You must disable ISR — it works only on Vercel",
    ],
    answer: 0,
    explanation:
      "By default, generated pages and data are stored in each pod's memory and disk. Without shared storage, `revalidateTag` on one pod doesn't invalidate the cache on others, and users see different versions. You should also configure `deploymentId` to protect against version skew during rolling updates.",
    sources: ["next-self-hosting"],
  },
  {
    question: "What do the `stale`, `revalidate` and `expire` parameters in `cacheLife` mean?",
    options: [
      "Freshness on the client, background refresh and the full expiration time",
      "Timeouts for the request, the retry and closing the source connection",
      "The entry's lifetime in memory, on disk and in the CDN respectively",
    ],
    answer: 0,
    explanation:
      "`stale` is how long the client uses data without checking the server. After `revalidate`, the next request gets the cached value and triggers regeneration in the background. After `expire` without requests, the entry is considered expired, and the next request waits for a new value.",
    sources: ["next-cacheLife"],
  },
  {
    question: "How does Next.js protect Server Actions from CSRF?",
    options: [
      "It accepts only POST and compares the Origin header with Host",
      "It requires a CSRF token in every form, which you must generate manually",
      "It doesn't: CSRF protection is entirely up to the developer",
    ],
    answer: 0,
    explanation:
      "Server Actions can be invoked only with POST, and Next.js compares `Origin` with `Host` (or `X-Forwarded-Host`), rejecting requests from other sites. Together with SameSite cookies, this blocks most CSRF attacks. For complex proxy setups there's `serverActions.allowedOrigins`. Authorization is still checked inside the action.",
    sources: ["next-data-security", "next-server-actions-guide"],
  },
  {
    question: "Why shouldn't Server Actions be used for loading data?",
    options: [
      "The client calls them one at a time, as uncached POSTs — slow for reads",
      "Server Actions can't return values to the calling client code",
      "They run only at build time and don't work at runtime",
    ],
    answer: 0,
    explanation:
      "Next.js dispatches Server Actions from one client sequentially: the second waits for the first so the server tree stays consistent with the result. That's good for mutations but bad for parallel reads. Load data in Server Components (or Route Handlers) and keep actions for changes.",
    sources: ["next-server-actions-guide", "next-mutating"],
  },
  {
    question: "A Server Action is declared inside a component and uses a variable from its closure. What happens to it?",
    options: [
      "Captured values are encrypted, sent to the client and sent back on invocation",
      "Closures are forbidden: a Server Action must live in a separate file",
      "The value is recomputed from the DB on the server on every action call",
    ],
    answer: 0,
    explanation:
      "Next.js serializes captured variables, encrypts them and embeds them in the page so the closure can be restored on invocation. Encryption protects against accidental leaks, but it's better not to keep secrets in closures. Multiple instances need a shared encryption key (`NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`).",
    sources: ["next-data-security"],
  },
  {
    question: "What is the React Taint API (`experimental_taintObjectReference`) for in Next.js?",
    options: [
      "To forbid passing a specific object to a client component",
      "To mark cached data as stale so it's reloaded from the server",
      "To encrypt cookie values before sending them to the user's browser",
    ],
    answer: 0,
    explanation:
      "For example, mark a user object from the DB: if it's passed whole into a client component's props, you get an error. It's a safety net, not the main protection — the foundation is a Data Access Layer that returns only the needed fields. It requires enabling `taint` in the config.",
    sources: ["next-data-security"],
  },
  {
    question: "Why does a CSP with a nonce make pages dynamic?",
    options: [
      "The nonce is unique per response, so the HTML can't be prerendered",
      "Browsers and CDNs don't cache pages that have a CSP header",
      "Nonces are supported only with client-side rendering",
    ],
    answer: 0,
    explanation:
      "Next.js reads the nonce from a request header (generated by proxy) and adds it to its scripts. Static HTML with a fixed nonce makes no sense. An alternative that keeps static rendering is a hash-based CSP or looser policies.",
    sources: ["next-csp", "mdn-csp"],
  },
  {
    question: "Why does `error.tsx` in production get a generic message for an error from a server component?",
    options: [
      "Next.js hides the details and passes a `digest` for looking it up in logs",
      "Server components can't throw errors with a message text",
      "The message is truncated to 20 characters to save payload size",
    ],
    answer: 0,
    explanation:
      "Error text can contain SQL, paths and secrets, so the client gets a generic message plus `error.digest` — a hash for finding the full error in server logs. In development the full message is available.",
    sources: ["next-error-file", "next-error-handling"],
  },
  {
    question: "What changed in `next/image` defaults in Next.js 16?",
    options: [
      "`minimumCacheTTL` grew to 4 hours, and `priority` was replaced by `preload`",
      "The component now works only with external images from `remotePatterns`",
      "Optimization is now disabled by default and enabled with a separate flag",
    ],
    answer: 0,
    explanation:
      "Previously, images without `Cache-Control` were revalidated every 60 seconds, which loaded the CPU. Now the default TTL is 4 hours. The `priority` prop is deprecated in favor of the more explicit `preload`. Also, local images with a query string require `images.localPatterns.search`, and the default `qualities` is `[75]`.",
    sources: ["next-upgrade-16", "next-image"],
  },
  {
    question: "Which runtime does `proxy.ts` use in Next.js 16?",
    options: [
      "Node.js, with no option to switch to Edge",
      "Edge only; Node.js APIs aren't available in it",
      "It's chosen automatically based on load",
    ],
    answer: 0,
    explanation:
      "In Next.js 16, proxy always runs on Node.js: familiar libraries and APIs are available. If you specifically need the edge runtime, stay on the deprecated `middleware` for now. The runtime of routes (pages, Route Handlers) is still configured separately.",
    sources: ["next-proxy", "next-upgrade-16"],
  },
  {
    question: "What prefetching optimizations appeared in the Next.js 16 router?",
    options: [
      "Layout deduplication and incremental prefetching of only the missing parts",
      "Prefetching all of the app's routes at once on the first visit",
      "Dropping link prefetching in favor of a Service Worker cache",
    ],
    answer: 0,
    explanation:
      "If several links lead to pages with a shared layout, it's downloaded once. The router loads only what isn't already in the client cache. There may be more requests, but their total size is noticeably smaller. No code changes are needed.",
    sources: ["next-upgrade-16", "next-prefetching"],
  },
  {
    question: "What does `optimizePackageImports` do?",
    options: [
      "Loads only the used modules from libraries with barrel files",
      "Compresses all npm packages into one file at build time",
      "Automatically updates dependencies to the latest versions",
    ],
    answer: 0,
    explanation:
      "Importing `import { Icon } from 'big-icon-lib'` through a barrel file can pull in hundreds of modules and slow down the build and the dev server. The option rewrites imports to the specific modules. For some popular libraries Next.js does this automatically.",
    sources: ["next-package-bundling"],
  },
  {
    question: "When do you need the `serverExternalPackages` option?",
    options: [
      "When a server package can't be bundled, e.g. one with native modules",
      "When you need to load React and React DOM as a separate CDN script",
      "When a package is used only in the browser and isn't needed on the server",
    ],
    answer: 0,
    explanation:
      "By default, Next.js bundles the dependencies of server code. Some packages (with native bindings, dynamic `require`s, large binaries) break when bundled — they're marked as external and loaded from `node_modules` at runtime. Popular cases are already on the default list.",
    sources: ["next-package-bundling"],
  },
  {
    question: "What is Draft Mode for?",
    options: [
      "Temporarily rendering static pages dynamically to preview CMS drafts",
      "Enabling a debug mode with verbose server logs in production",
      "Hiding unfinished pages from search engines via `noindex`",
    ],
    answer: 0,
    explanation:
      "A CMS editor visits a special Route Handler that calls `(await draftMode()).enable()` and sets a cookie. While the cookie is present, pages bypass the cache and load draft content. Other visitors keep getting fast static pages.",
    sources: ["next-draft-mode"],
  },
  {
    question: "What is the `instrumentation.ts` file with a `register()` function for?",
    options: [
      "Running code once on server startup, e.g. to set up OpenTelemetry",
      "Adding a global click handler to all pages for analytics",
      "Describing the module build and loading order for Turbopack",
    ],
    answer: 0,
    explanation:
      "`register` is called when a new server instance starts — suitable for initializing tracing, monitoring and logging. `onRequestError` lets you send server errors to a monitoring system. For the client side there's `instrumentation-client.ts`.",
    sources: ["next-instrumentation"],
  },
  {
    question: "How do you implement on-demand ISR via a CMS webhook?",
    options: [
      "A Route Handler checks a secret and calls `revalidateTag`/`revalidatePath`",
      "Set up a cron job that rebuilds the whole project every 5 minutes",
      "Call `router.refresh()` from the CMS admin via its SDK",
    ],
    answer: 0,
    explanation:
      "The CMS sends a POST to `/api/revalidate` with a secret and the ID of the changed entry; the handler verifies the signature and invalidates the relevant tags. Pages update on the next request, without a full rebuild. `router.refresh()` is a client-side API.",
    sources: ["next-revalidateTag", "next-route-handlers", "next-isr"],
  },
  {
    question: "Why are Context providers in the App Router moved into a separate client component?",
    options: [
      "Context is a client feature; the layout renders a `<Providers>` wrapper",
      "Providers slow down server rendering, so they're turned off on the server",
      "Next.js forbids using Context inside any layout files",
    ],
    answer: 0,
    explanation:
      "`createContext` and providers are client features. You create `providers.tsx` with `'use client'` and render it in the root layout around `children`. That way `children` stay server components. Providers are placed as deep as possible so more of the tree stays static.",
    sources: ["next-server-client"],
  },
  {
    question: "A third-party component uses hooks but has no `'use client'`. How do you use it in a server page?",
    options: [
      "Re-export it from your own file with `'use client'`",
      "Wrap it in `<Suspense>` — that's enough",
      "You can't: such libraries are incompatible with the App Router",
    ],
    answer: 0,
    explanation:
      "Create `components/carousel.tsx`: `'use client'; export { Carousel } from 'acme-carousel'`. Now the server component imports the client wrapper. Many libraries have already added the directive themselves. Suspense has nothing to do with the client boundary.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "How do you get configuration from an environment variable at runtime rather than at build time?",
    options: [
      "Read `process.env` on the server during dynamic rendering and pass it to the client",
      "Use `NEXT_PUBLIC_` — values are substituted on every request",
      "Put the config in `public/env.js` and update the file manually",
    ],
    answer: 0,
    explanation:
      "`NEXT_PUBLIC_*` variables are inlined into the bundle during `next build`, so one Docker image can't be promoted across environments with different values. Server code reads `process.env` at runtime; if the value is needed on the client, pass it via props from a dynamically rendered server component.",
    sources: ["next-env", "next-self-hosting"],
  },
  {
    question: "What is version skew, and how does `deploymentId` help with it?",
    options: [
      "An old-version client and a new-version server; the ID helps detect it",
      "Different Node.js versions in dev and prod; the ID pins one runtime version",
      "Different React versions in dependencies; the ID picks one for the bundle",
    ],
    answer: 0,
    explanation:
      "A user with a tab open after a deploy may request chunks or Server Actions that no longer exist. With `deploymentId`, Next.js adds an identifier to asset and navigation requests and, on mismatch, does a full reload instead of producing cryptic errors.",
    sources: ["next-self-hosting"],
  },
  {
    question: "Why can't `generateStaticParams` return an empty array with Cache Components?",
    options: [
      "It needs sample params to validate the route at build time",
      "An empty array disables the route, and it always responds with 404",
      "The restriction applies only to `[...slug]` routes",
    ],
    answer: 0,
    explanation:
      "The build renders the route with sample params and checks that `cookies()`, `headers()` and other request data sit inside Suspense. Without samples, validation is impossible, so it's a build error. You can return a placeholder and handle it with `notFound()`, but that weakens the check.",
    sources: ["next-generateStaticParams", "next-dynamic-routes"],
  },
  {
    question: "How do `GET` Route Handlers behave with Cache Components enabled?",
    options: [
      "They follow the same prerendering model as pages",
      "They're always dynamic and never cached",
      "They're always static; request data isn't available in them",
    ],
    answer: 0,
    explanation:
      "If the handler doesn't read request data, its response can be prerendered at build time; use `'use cache'` for cacheable parts. Accessing `request`, `cookies()` or `headers()` makes the response dynamic. Methods other than `GET` are always dynamic.",
    sources: ["next-route-handlers", "next-caching"],
  },
  {
    question: "What does the user get if a Server Action calls `revalidatePath` and returns a value?",
    options: [
      "The action's result and the updated RSC tree in one response",
      "Only the result; the page has to be reloaded manually",
      "Two separate responses: first the result, then the HTML",
    ],
    answer: 0,
    explanation:
      "Next.js optimizes mutations: the Server Action response contains both the returned value and the new payload of the affected routes (a single roundtrip). The user immediately sees the updated UI without an extra request.",
    sources: ["next-server-actions-guide", "next-revalidatePath"],
  },
  {
    question: "How do you connect `forbidden()` and `unauthorized()` to UI?",
    options: [
      "Enable `authInterrupts` and add `forbidden.tsx`",
      "They work out of the box and show the standard 404 page",
      "They're aliases of `redirect('/login')` with a different HTTP status",
    ],
    answer: 0,
    explanation:
      "The functions interrupt rendering and show the corresponding UI with 403 and 401 statuses — similar to `notFound()`. It's an experimental feature for now. Redirecting to login is done separately, via `redirect()`.",
    sources: ["next-docs"],
  },
  {
    question: "How does metadata from `generateMetadata` behave during streaming?",
    options: [
      "It streams after the UI, but for HTML-only bots the response waits for it",
      "It always blocks the whole response until the metadata is computed",
      "It's generated on the client after hydration via `document.title`",
    ],
    answer: 0,
    explanation:
      "Streaming metadata avoids delaying the first byte with a slow `generateMetadata`. Bots that don't run JS (detected by User-Agent, configurable via `htmlLimitedBots`) get the metadata in `<head>` before the HTML is sent, so SEO doesn't suffer.",
    sources: ["next-generateMetadata", "next-metadata"],
  },
  {
    question: "When should you enable `reactCompiler` in Next.js 16?",
    options: [
      "When the code follows the rules of React; builds get slower",
      "Always: it's on by default and doesn't affect build time",
      "Never in production: it's experimental and unstable",
    ],
    answer: 0,
    explanation:
      "In Next.js 16, React Compiler support is stable but disabled by default. The compiler relies on Babel, so builds get slower. It skips components that break the rules of React — the ESLint plugin helps find them.",
    sources: ["next-react-compiler", "react-compiler", "next-upgrade-16"],
  },
  {
    question: "How does `unstable_rethrow` help with error handling?",
    options: [
      "It rethrows Next.js internal errors out of `catch`",
      "It retries a failed request a given number of times with a delay",
      "It sends the error to the connected monitoring system",
    ],
    answer: 0,
    explanation:
      "Next.js uses exceptions for control flow: `redirect`, `notFound`, dynamic rendering signals. A broad `try/catch` swallows them and breaks behavior. `unstable_rethrow(err)` at the start of `catch` rethrows such errors and leaves you only the \"real\" ones.",
    sources: ["next-redirect", "next-error-handling"],
  },
  {
    question: "Why shouldn't a layout be the only place where authorization is checked?",
    options: [
      "A layout doesn't re-render during client navigation between child pages",
      "A layout runs only at build time and can't see the user's cookies",
      "Calling `redirect()` and `cookies()` is forbidden in a layout",
    ],
    answer: 0,
    explanation:
      "Thanks to partial rendering, a shared layout doesn't run again during navigation within a segment, so a check in it may not fire. Besides, Route Handlers and Server Actions are reachable directly. Keep checks close to the data — in the Data Access Layer, pages and actions.",
    sources: ["next-authentication", "next-data-security"],
  },
  {
    question: "What are Multi-Zones?",
    options: [
      "Several independent Next.js apps under one domain, split by path",
      "Deploying one app to several cloud regions at once",
      "Splitting a page into zones with different caching strategies",
    ],
    answer: 0,
    explanation:
      "For example, `/blog` and `/shop` are separate apps from different teams, combined via rewrites. Navigation between zones is a full reload (plain `<a>`), within a zone it's client-side. It's one approach to micro-frontends.",
    sources: ["next-docs"],
  },
  {
    question: "Why is page data sometimes sent twice — in the HTML and in the RSC payload?",
    options: [
      "HTML is for fast painting, the payload is for hydration",
      "It's a bug that happens only in dev mode with Turbopack",
      "The second copy is a backup in case the network drops",
    ],
    answer: 0,
    explanation:
      "Client component props are serialized into the payload embedded in the page, even if the same data is already visible in the HTML. So large arrays passed to client components bloat the response. Pagination, passing minimal fields and rendering large static parts on the server help.",
    sources: ["next-server-client", "next-data-security"],
  },
  {
    question: "What is prefetched for a dynamic route by `<Link>` with default settings?",
    options: [
      "The part of the tree up to the nearest loading boundary; the rest on navigation",
      "Nothing: dynamic routes are never prefetched",
      "The entire page along with all request data",
    ],
    answer: 0,
    explanation:
      "For static content everything is prefetched; for dynamic routes, the shared static part and the fallback up to `loading.tsx` or Suspense. Navigation becomes instant: the user sees a skeleton right away. With Partial Prefetching, the details depend on the PPR shell.",
    sources: ["next-prefetching", "next-loading"],
  },
  {
    question: "How does `refresh()` from `next/cache` differ from `revalidatePath`?",
    options: [
      "It refreshes the client router without touching the server cache",
      "It completely clears the app's entire server cache",
      "It's a synonym for `revalidatePath('/', 'layout')`",
    ],
    answer: 0,
    explanation:
      "`refresh()` in a Server Action makes the client router refetch the current page — e.g. to update a notification counter whose data isn't cached. If the data is cached, without `revalidatePath`/`revalidateTag`/`updateTag` the user sees the old value.",
    sources: ["next-refresh", "next-upgrade-16"],
  },
  {
    question: "How does Next.js 16 speed up repeated runs of `next dev` and `next build`?",
    options: [
      "Turbopack caches build artifacts on disk by default",
      "The build is automatically moved to Vercel cloud runners",
      "TypeScript type checking is disabled by default",
    ],
    answer: 0,
    explanation:
      "Turbopack's file system cache is enabled by default for dev and build, so restarts are noticeably faster. In CI, it's useful to cache the `.next/cache` folder between builds. `next build` runs type checking unless it's explicitly disabled.",
    sources: ["next-upgrade-16", "next-turbopack"],
  },
  {
    question: "What is `typedRoutes` useful for?",
    options: [
      "TypeScript checks paths in `<Link href>` and `router.push`",
      "It speeds up routing by compiling the route table",
      "It generates a typed REST client for all Route Handlers",
    ],
    answer: 0,
    explanation:
      "Next.js generates types for all routes, and a typo in `href=\"/dashbord\"` becomes a compile error. The same generated types power the `PageProps`/`LayoutProps` helpers. The option doesn't affect routing speed.",
    sources: ["next-typescript"],
  },
  {
    question: "How does the Edge runtime differ from Node.js for routes?",
    options: [
      "Edge — a reduced set of Web APIs and fast startup; Node.js — the full API",
      "Edge is simply a newer and faster version of Node.js",
      "Edge code runs in the user's browser, like a Service Worker",
    ],
    answer: 0,
    explanation:
      "The Edge runtime runs closer to the user and starts quickly, but it lacks `fs`, many npm packages and native modules, plus it has size limits. Node.js is recommended for most apps. In Next.js 16, proxy runs only on Node.js.",
    sources: ["next-docs", "next-proxy"],
  },
  {
    question: "A component shows `new Date().toLocaleString()` and causes a hydration mismatch. What's the most correct fix?",
    options: [
      "Show the time after mounting or fix it on the server",
      "Disable hydration for the whole page via a `next.config` option",
      "Wrap the component in `React.memo` so it doesn't re-render",
    ],
    answer: 0,
    explanation:
      "The server and the client are in different time zones and moments in time, so the string differs. Options: a client component that shows the time after mounting; formatting on the server with a fixed zone; `suppressHydrationWarning` on the element with the timestamp. Browser extensions also often cause mismatches.",
    sources: ["react-hydrateRoot", "next-server-client"],
  },
  {
    question: "What does `after()` in a Route Handler give you compared to `await logEvent()` before responding?",
    options: [
      "The response is sent immediately, and logging runs afterwards",
      "`after` runs code before the server even receives the request",
      "`after` guarantees that logging is transactional with the response",
    ],
    answer: 0,
    explanation:
      "The user doesn't have to wait for analytics, logs or syncing with third-party services. The platform keeps the function alive until the `after` callbacks finish. Inside, you can read `cookies()` and `headers()` in Server Actions and Route Handlers.",
    sources: ["next-after"],
  },
  {
    question: "How do you make sure a `'use cache'` function doesn't cache different users' data together?",
    options: [
      "Pass the user ID as an argument: it becomes part of the key",
      "Call `cookies()` inside the function to get the id",
      "Use one global key and clear the cache manually",
    ],
    answer: 0,
    explanation:
      "The cache key is built from arguments and captured values, so `getDashboard(userId)` creates separate entries. Reading `cookies()` inside a cached function is forbidden. Note that personal data in a shared server cache is a reason to consider `'use cache: private'`.",
    sources: ["next-use-cache", "next-caching"],
  },
  {
    question: "How does the URL-preserving modal pattern work in the App Router?",
    options: [
      "An `@modal` slot, an `(.)photo/[id]` interception and `default.tsx`",
      "Modal state in Context and a manual `history.pushState`",
      "A separate `/modal` route opened inside an `<iframe>`",
    ],
    answer: 0,
    explanation:
      "On client navigation, the interceptor renders content in the modal slot over the current page; the URL reflects the open item, and the link can be shared. On direct access, the full page opens. Closing is `router.back()`. `default.tsx` guarantees an empty slot when the modal isn't active.",
    sources: ["next-parallel-routes", "next-intercepting-routes"],
  },
  {
    question: "What's the right outcome for an error in `generateStaticParams` during the build?",
    options: [
      "The build fails, and the broken version doesn't reach production",
      "Next.js ignores the error and builds the route without pages",
      "The route automatically switches to client-side rendering",
    ],
    answer: 0,
    explanation:
      "`generateStaticParams` runs during `next build` before pages render. An error (e.g. an unavailable API) aborts the build — better than shipping an app without pages. If the source is unreliable, you can return a subset of paths and render the rest on demand.",
    sources: ["next-generateStaticParams"],
  },
  {
    question: "Why does reading `searchParams` at the top level of a page reduce the benefit of PPR?",
    options: [
      "Everything below `await searchParams` drops out of the static shell",
      "`searchParams` aren't available on pages with Cache Components",
      "It turns the whole page into a client component",
    ],
    answer: 0,
    explanation:
      "Search params are request data. If `await searchParams` is at the page root, the static shell is almost empty. Better to pass the promise down and unwrap it in a component inside `<Suspense>`, keeping the heading, filters and navigation in the shell.",
    sources: ["next-caching", "next-page-file"],
  },
  {
    question: "Which command generates the `PageProps` and `LayoutProps` types without running the dev server?",
    options: ["`next typegen`", "`next types`", "`tsc --next`"],
    answer: 0,
    explanation:
      "`next typegen` (since Next.js 15.5) generates global type helpers from the route structure — handy in CI before `tsc --noEmit`. The types are also updated during `next dev` and `next build`.",
    sources: ["next-typescript", "next-upgrade-16"],
  },
  {
    question: "How does `htmlLimitedBots` differ from regular bot handling?",
    options: [
      "It defines the bots that get metadata without streaming",
      "It forbids these bots from indexing the site via `robots`",
      "It serves bots a simplified page without styles or JS",
    ],
    answer: 0,
    explanation:
      "Some crawlers don't run JavaScript and can't see metadata that arrives via streaming. Next.js detects them by User-Agent and waits for the metadata before sending HTML. The option lets you override the list.",
    sources: ["next-generateMetadata"],
  },
  {
    question: "What happens if a layout calls `await params` at the top level with Cache Components and no `generateStaticParams`?",
    options: [
      "The layout drops out of the shell; better to pass the promise down",
      "The build always fails with an error about dynamic params",
      "Nothing: a layout is always static regardless of `params`",
    ],
    answer: 0,
    explanation:
      "Without `generateStaticParams`, param values are known only at request time — they're runtime data. The docs advise not to await `params` at the top level of a layout, but to pass the promise to the component that actually needs the value and wrap it in Suspense.",
    sources: ["next-dynamic-routes", "next-caching"],
  },
  {
    question: "How does `'use cache'` caching work on a serverless platform with the default handler?",
    options: [
      "Entries live in instance memory and aren't shared between instances",
      "Entries are automatically saved to the platform's global CDN",
      "`'use cache'` caching is completely disabled on serverless",
    ],
    answer: 0,
    explanation:
      "The default handler is an in-memory LRU. In serverless, instances are short-lived and isolated, so the runtime cache is short-lived. The main value of `'use cache'` is including data in the static shell at build time. For a reliable runtime cache, you need a remote handler or the platform's cache.",
    sources: ["next-use-cache"],
  },
  {
    question: "Why do Server Actions get encrypted, non-deterministic IDs?",
    options: [
      "So the IDs are hard to guess and unused actions can be removed",
      "To speed up calls thanks to a short name in the request",
      "To completely hide action calls from the browser's DevTools",
    ],
    answer: 0,
    explanation:
      "Next.js creates IDs for action references and periodically recalculates them between builds; unused Server Actions are removed from the client bundle (dead code elimination). But any used ID is visible in network requests — so permission checks inside the action are mandatory.",
    sources: ["next-data-security"],
  },
];

export default questions;
