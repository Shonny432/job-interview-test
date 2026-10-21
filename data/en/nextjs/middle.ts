import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What is a Server Function (Server Action) in Next.js?",
    options: [
      "An async function marked `'use server'` that can be called from the client",
      "A Route Handler that is automatically created for every page",
      "A function that runs at build time and caches its result",
    ],
    answer: 0,
    explanation:
      "The `'use server'` directive turns a function into a server function, and Next.js creates an endpoint for it. You can pass it to `<form action>` or call it from a client handler. The call is a POST request. Server Actions are Server Functions used for mutations, often followed by cache revalidation.",
    sources: ["next-mutating", "react-use-server"],
  },
  {
    question: "What does `<form action={createPost}>` with a Server Action give you compared to `onSubmit` + `fetch`?",
    options: [
      "The form works even before JS loads (progressive enhancement), with no API route",
      "The form submits faster thanks to a persistent WebSocket connection",
      "Form data is automatically validated against the database schema",
    ],
    answer: 0,
    explanation:
      "A Server Action receives `FormData` directly, so you don't need a Route Handler and a client `fetch`. If the form is rendered by a server component, it submits even before hydration. You still write validation yourself (e.g. with Zod). Submission state is shown via `useActionState` or `useFormStatus`.",
    sources: ["next-mutating", "react-useActionState"],
  },
  {
    question: "What does `revalidatePath('/blog')` do after a mutation?",
    options: [
      "Marks the cached data and UI of the `/blog` route as stale",
      "Restarts the Next.js server to clear the whole cache",
      "Redirects the user to the `/blog` page after the action",
    ],
    answer: 0,
    explanation:
      "The next request to `/blog` gets fresh data. When called in a Server Action, the updated UI comes back right in the action's response. For targeted invalidation of data used on many pages, tags are more convenient (`cacheTag` + `revalidateTag`/`updateTag`).",
    sources: ["next-revalidatePath", "next-revalidating"],
  },
  {
    question: "How does `updateTag` differ from `revalidateTag` in Next.js 16?",
    options: [
      "`updateTag` expires the cache immediately (read-your-writes), `revalidateTag` is stale-while-revalidate",
      "`updateTag` works only in Route Handlers, while `revalidateTag` works only in proxy",
      "They're synonyms; `revalidateTag` is deprecated in favor of `updateTag`",
    ],
    answer: 0,
    explanation:
      "`updateTag` is available only in Server Actions: the user who changed the data sees the changes immediately. `revalidateTag(tag, 'max')` marks data as stale: visitors see the old version while the new one is prepared in the background — good for blogs and catalogs. In Next.js 16, `revalidateTag` requires a second argument — a `cacheLife` profile.",
    sources: ["next-updateTag", "next-revalidateTag", "next-upgrade-16"],
  },
  {
    question: "Are `fetch` requests in server components cached by default (Next.js 15+, without Cache Components)?",
    options: [
      "No: they aren't cached by default; enable caching with `cache: 'force-cache'`",
      "Yes: all `fetch`es are cached forever; disable it with `no-store`",
      "Yes, but only GET requests to domains listed in `next.config`",
    ],
    answer: 0,
    explanation:
      "In Next.js 14, `fetch` was cached by default, which often surprised people. Since version 15 the behavior is the opposite. With Cache Components enabled, caching is explicit via `'use cache'`, and uncached data streams inside `<Suspense>`.",
    sources: ["next-caching-previous", "next-upgrade-15"],
  },
  {
    question: "What does the `'use cache'` directive do?",
    options: [
      "Caches the result of an async function or component; arguments are part of the cache key",
      "Enables caching of all `fetch`es across the whole app at once and forever",
      "Saves a client component's state to the browser's `localStorage`",
    ],
    answer: 0,
    explanation:
      "`'use cache'` works with `cacheComponents: true`: at the level of a data function, a component or a whole file. Arguments and captured values become part of the key. The lifetime is set with `cacheLife`, invalidation tags with `cacheTag`. A cached result can become part of the page's static shell.",
    sources: ["next-use-cache", "next-caching"],
  },
  {
    question: "Why can't you call `cookies()` inside a function with `'use cache'`?",
    options: [
      "The cache is shared across requests, while cookies are per-request data",
      "`cookies()` works only in client components",
      "It's a restriction of development mode only",
    ],
    answer: 0,
    explanation:
      "If a cached function read cookies, one user's data could be served to another. The right way is to read cookies outside and pass the needed value as an argument (it becomes part of the key). For rare cases there's `'use cache: private'`, which doesn't store the result in the server cache across requests.",
    sources: ["next-use-cache", "next-cookies"],
  },
  {
    question: "Which `cacheLife` profile applies if you don't specify one in `'use cache'`?",
    options: ["`default`", "`max`", "`seconds`"],
    answer: 0,
    explanation:
      "The `default` profile: stale 5 minutes, revalidate 15 minutes, expire never. There are presets `seconds`, `minutes`, `hours`, `days`, `weeks`, `max`, and custom profiles in `next.config`. The docs recommend always specifying `cacheLife` explicitly so the behavior is clear at the call site.",
    sources: ["next-cacheLife"],
  },
  {
    question: "What is `cacheTag('products')` inside a cached function for?",
    options: [
      "To invalidate entries with this tag later",
      "To send the tag in a response header for CDN caching",
      "To limit the cache to the `/products` route only",
    ],
    answer: 0,
    explanation:
      "Tags link cache entries to a type of data rather than a URL. One product mutation can invalidate every page and component that uses products: `revalidateTag('products', 'max')`. You can set several tags, e.g. a general one and one with an id: `cacheTag('products', `product-${id}`)`.",
    sources: ["next-cacheTag", "next-revalidateTag"],
  },
  {
    question: "What does `loading.tsx` do during client navigation to a segment with slow data?",
    options: [
      "Immediately shows a fallback, keeping the shared layout, while the segment loads",
      "Blocks navigation until the data is fully loaded",
      "Performs a full page reload with the browser's indicator",
    ],
    answer: 0,
    explanation:
      "Navigation is instant: the layout stays interactive, the `loading.tsx` fallback is shown instead of the page, and the content streams in. The fallback can be prefetched along with the link. Without `loading.tsx` or `<Suspense>`, navigation would wait for the data.",
    sources: ["next-loading", "next-linking"],
  },
  {
    question: "What does `generateStaticParams` do?",
    options: [
      "Returns segment values to prerender at build time",
      "Generates random route parameters for A/B tests",
      "Creates query parameters for all `<Link>`s on the page",
    ],
    answer: 0,
    explanation:
      "`export function generateStaticParams() { return posts.map(p => ({ slug: p.slug })) }` — these pages are built ahead of time. It replaces `getStaticPaths` from the Pages Router. With Cache Components, the function must return at least one set of params — that's how the build verifies the route doesn't access request data incorrectly.",
    sources: ["next-generateStaticParams"],
  },
  {
    question: "How do you show a page with slow data in Next.js without delaying the whole page?",
    options: [
      "Wrap the slow component in `<Suspense>` — it streams in later",
      "Move data loading into a client component's `useEffect`",
      "Increase the server response timeout in `next.config`",
    ],
    answer: 0,
    explanation:
      "The server sends the shell and fallback right away and appends the slow block's HTML to the stream when it's ready. Loading in `useEffect` sends empty HTML, adds a request waterfall and hurts LCP. With Cache Components, uncached data must be inside `<Suspense>`.",
    sources: ["next-streaming", "next-caching"],
  },
  {
    question: "How do you avoid a request waterfall if a component needs independent `getUser()` and `getPosts()`?",
    options: [
      "Start both requests at once and wait with `Promise.all`",
      "Call them sequentially with two separate `await`s",
      "Move both requests into separate `useEffect`s on the client",
    ],
    answer: 0,
    explanation:
      "Sequential `await`s add up the waiting time. `const [user, posts] = await Promise.all([getUser(), getPosts()])` runs them in parallel. Another option is to pass promises down and unwrap them with `use()` under separate Suspense boundaries so parts of the UI appear independently.",
    sources: ["next-fetching"],
  },
  {
    question: "How do you avoid a double DB query if both `generateMetadata` and the page call `getUser(id)`?",
    options: [
      "Wrap the function in React's `cache()` — deduplication within one request",
      "Store the user in a module-level global variable on the server",
      "Pass the data from `generateMetadata` to the page via its props",
    ],
    answer: 0,
    explanation:
      "`cache()` memoizes calls with the same arguments for the duration of one server render. Next.js deduplicates `fetch` with identical parameters itself, but ORMs and SDKs need `cache()`. A global variable would mix different users' data.",
    sources: ["react-cache", "next-fetching"],
  },
  {
    question: "How do you guarantee a module with secrets never ends up in the client bundle?",
    options: [
      "Add `import 'server-only'` to it",
      "Name the file with a `.server.ts` suffix",
      "Put it in the `public` folder",
    ],
    answer: 0,
    explanation:
      "The `server-only` package causes a build error if the module is imported from a client component. This protects against accidentally leaking DB code or keys. There's a matching `client-only` package. The `.server` suffix does nothing in the App Router, and `public` is served to everyone.",
    sources: ["next-server-client", "next-data-security"],
  },
  {
    question: "Can you use `next/dynamic` with `ssr: false` in a server component?",
    options: [
      "No: `ssr: false` is allowed only in client components",
      "Yes, it's the main way to disable SSR for a page",
      "Yes, but only in `layout.tsx`",
    ],
    answer: 0,
    explanation:
      "Use the `ssr: false` option inside a `'use client'` file: for example, for a component that accesses `window` on import. In a server component, Next.js throws an error. Server components don't ship their code to the browser anyway.",
    sources: ["next-lazy-loading"],
  },
  {
    question: "Why wrap a component using `useSearchParams()` in `<Suspense>`?",
    options: [
      "Otherwise everything up to the nearest boundary drops out of prerendering",
      "Without Suspense, `useSearchParams` always returns `null` on the client",
      "It's needed only for correct behavior in Safari and iOS",
    ],
    answer: 0,
    explanation:
      "Query parameters are unknown during prerendering. If a Suspense boundary sits close to the component, the rest of the page goes into static HTML and only this piece renders on the client. Without a boundary, a large part of the tree becomes client-rendered, and Next.js warns about it.",
    sources: ["next-useSearchParams"],
  },
  {
    question: "What are parallel routes (`@slot`)?",
    options: [
      "Named slots that let you render several pages in one layout",
      "Routes processed in multiple server threads",
      "Duplicating a route for A/B testing",
    ],
    answer: 0,
    explanation:
      "The `@analytics` folder becomes the `analytics` prop of the parent layout. Each slot has its own navigation, loading and error states — handy for dashboards and modals. On a full reload, an inactive slot renders its `default.tsx` (or a 404 if there isn't one).",
    sources: ["next-parallel-routes"],
  },
  {
    question: "What are intercepting routes `(.)photo/[id]` for?",
    options: [
      "Showing a route on top of the current page, e.g. in a modal",
      "Intercepting all API requests and logging them on the server",
      "Redirecting an unauthenticated user to the login page",
    ],
    answer: 0,
    explanation:
      "On client navigation from a feed to `/photo/1`, the interceptor renders the photo in a modal over the feed, and the URL changes. On direct access or page reload, the full `/photo/1` page opens. It's usually combined with a parallel `@modal` slot.",
    sources: ["next-intercepting-routes", "next-parallel-routes"],
  },
  {
    question: "How do you read a cookie in a Next.js 16 server component?",
    options: [
      "`const store = await cookies(); store.get('theme')`",
      "`document.cookie` inside the server component",
      "`const theme = cookies().get('theme')` without `await`",
    ],
    answer: 0,
    explanation:
      "`cookies()` and `headers()` are async: synchronous access was removed in Next.js 16. Using them makes rendering request-dependent. You can set cookies in Server Actions and Route Handlers, but not while rendering a server component.",
    sources: ["next-cookies", "next-upgrade-16"],
  },
  {
    question: "What does `proxy.ts` (formerly middleware) do?",
    options: [
      "Runs before the request is handled: redirects, rewrites, headers",
      "Proxies all `fetch`es from server components through a shared cache",
      "Swaps React components depending on the device",
    ],
    answer: 0,
    explanation:
      "Proxy intercepts requests at the network boundary: redirecting unauthenticated users, A/B tests, locales, headers. Its scope is set with `matcher`. Don't use it for heavy logic or as the only authorization check — permissions should also be checked close to the data.",
    sources: ["next-proxy"],
  },
  {
    question: "What do you call in a client component to refetch the current route's server components?",
    options: [
      "`router.refresh()` from `useRouter()`",
      "`window.location.reload()`",
      "`router.push(pathname)` with the same path",
    ],
    answer: 0,
    explanation:
      "`router.refresh()` makes a new request to the server and re-renders server components while preserving React and browser client state (scroll, typed input). `location.reload()` resets everything. In Server Actions, the counterpart is the `refresh()` function from `next/cache`.",
    sources: ["next-useRouter", "next-refresh"],
  },
  {
    question: "How does `global-error.tsx` differ from `error.tsx`?",
    options: [
      "It catches root layout errors and renders its own `<html>` and `<body>`",
      "It catches errors only during the `next build` command",
      "It's the same as `error.tsx`, but for `route.ts` API routes",
    ],
    answer: 0,
    explanation:
      "An `error.tsx` at the root won't catch an error in the root layout itself — it lives inside it. `global-error.tsx` replaces the whole document, so it includes its own styles and markup. You can't export metadata from it; use React's `<title>` instead.",
    sources: ["next-error-file", "next-error-handling"],
  },
  {
    question: "What does `export const dynamic = 'force-dynamic'` do (without Cache Components)?",
    options: [
      "Forces the route to render on every request, disabling prerendering",
      "Enables hot module reloading in the production build too",
      "Makes all of the route's components client components, like `'use client'`",
    ],
    answer: 0,
    explanation:
      "It's a route segment config option from the previous caching model. With Cache Components, explicit tools are used instead: `'use cache'` for caching, `<Suspense>` and `connection()` for request-time data. It doesn't turn components into client components.",
    sources: ["next-caching-previous", "next-route-segment-config"],
  },
  {
    question: "Which props can be passed from a server page to a client component?",
    options: [
      "Serializable values and Server Actions; regular functions can't be passed",
      "Any values, including classes and event handlers",
      "Only strings — everything else must be converted to JSON manually",
    ],
    answer: 0,
    explanation:
      "Props travel over the network in the RSC payload. Objects, arrays, `Date`, `Map`, promises, JSX and Server Functions are supported. You can't pass a regular function (`onClick={() => ...}`) from a server component — declare the handler in the client component.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "In the App Router, how do you get data for `generateMetadata` and the page without fetching the API twice via `fetch`?",
    options: [
      "Do nothing: identical `fetch`es within one render are deduplicated",
      "Save the response to `localStorage` and read it the second time",
      "Use `getStaticProps` next to the `generateMetadata` function",
    ],
    answer: 0,
    explanation:
      "Request memoization: GET `fetch` requests with the same URL and options within one render run once. For other data sources (ORM, SDK), use React's `cache()`. `getStaticProps` doesn't work in the App Router.",
    sources: ["next-fetching", "react-cache"],
  },
  {
    question: "What's the right way to do optimistic UI for a Server Action on the client?",
    options: [
      "With `useOptimistic` while the action is running",
      "With `router.refresh()` before calling the action",
      "With `revalidatePath` in the client component",
    ],
    answer: 0,
    explanation:
      "`useOptimistic` shows the expected state immediately and automatically switches back to the real one when the action finishes and fresh data arrives. `revalidatePath` works only on the server. `router.refresh()` before the action won't give instant feedback.",
    sources: ["react-useOptimistic", "next-mutating"],
  },
  {
    question: "What happens with `redirect()` inside `try/catch` in a Server Action?",
    code: `try {
  await save(data);
  redirect('/done');
} catch (e) {
  return { error: 'Failed to save' };
}`,
    options: [
      "`catch` intercepts the redirect's internal exception, so there's no redirect",
      "The redirect works; `catch` runs only if `save` fails",
      "Next.js reports a build error",
    ],
    answer: 0,
    explanation:
      "`redirect()` and `notFound()` work by throwing special exceptions. A regular `catch` swallows them. The fix is to call `redirect` after the `try/catch` block or rethrow internal errors (`unstable_rethrow(e)`).",
    sources: ["next-redirect", "next-mutating"],
  },
  {
    question: "How does `<Form>` from `next/form` differ from a plain `<form>` for a search form?",
    options: [
      "With a string `action`, it performs a client-side navigation with the query",
      "It automatically validates fields against a Zod schema before submitting",
      "It sends data over WebSocket instead of a regular HTTP request",
    ],
    answer: 0,
    explanation:
      "`<Form action=\"/search\">` turns the fields into `searchParams` and performs an SPA navigation that keeps the shared layout, instead of a full reload. It prefetches shared UI (e.g. `loading.tsx`). Without JS it works like a regular form. With a function in `action`, it behaves like a React form with a Server Action.",
    sources: ["next-form"],
  },
  {
    question: "What does `generateMetadata` do compared to a static `metadata` export?",
    options: [
      "Computes metadata dynamically, e.g. from data fetched by `params`",
      "Generates metadata on the client after the page loads",
      "Creates a `sitemap.xml` for all pages",
    ],
    answer: 0,
    explanation:
      "`export async function generateMetadata({ params }) { const post = await getPost((await params).slug); return { title: post.title } }`. It runs on the server. There's a separate `sitemap.ts` file for sitemaps, and Open Graph images can be generated via `opengraph-image.tsx`.",
    sources: ["next-generateMetadata", "next-metadata"],
  },
  {
    question: "How do you support multiple languages in the App Router?",
    options: [
      "An `app/[lang]/...` segment + locale detection in proxy + dictionaries on the server",
      "Enable the `i18n` option in `next.config` — the App Router translates by itself",
      "Create a separate Next.js app for each language",
    ],
    answer: 0,
    explanation:
      "The App Router doesn't use the built-in `i18n` option from the Pages Router. Typically you create a dynamic `[lang]` segment, redirect the user in proxy based on the `Accept-Language` header and load dictionaries in server components (they don't end up in the bundle). Libraries like next-intl are often used.",
    sources: ["next-i18n", "next-proxy"],
  },
  {
    question: "How do you return JSON with status 201 from a Route Handler?",
    options: [
      "`return Response.json(data, { status: 201 })`",
      "`res.status(201).json(data);`",
      "`return { status: 201, body: data };`",
    ],
    answer: 0,
    explanation:
      "Route Handlers are built on Web APIs: they take a `Request` and return a `Response` (or `NextResponse` with extra features). `res.status().json()` is the Express style used by Pages Router API Routes. A plain object isn't a valid response.",
    sources: ["next-route-handlers"],
  },
  {
    question: "What is Partial Prerendering (PPR) in Next.js 16?",
    options: [
      "The page's static shell is sent immediately, and dynamic parts stream in",
      "Prerendering only the first half of the page for speed",
      "A mode where half of the pages are static and half are dynamic",
    ],
    answer: 0,
    explanation:
      "One route can combine static and dynamic parts: everything that can be prerendered (including `'use cache'`) goes into the shell and is served instantly, while request data streams inside `<Suspense>`. In Next.js 16 it's enabled via `cacheComponents: true` instead of the former experimental flag.",
    sources: ["next-cache-components", "next-caching", "next-upgrade-16"],
  },
  {
    question: "How do you prefetch data for client components using TanStack Query in the App Router?",
    options: [
      "`prefetchQuery` on the server and `HydrationBoundary`",
      "Call `useQuery` directly in an async server component",
      "Put the `QueryClient` instance into the page's `metadata` export",
    ],
    answer: 0,
    explanation:
      "A server component creates a `QueryClient`, runs `prefetchQuery` and passes the cache state via `<HydrationBoundary state={dehydrate(qc)}>`. A client `useQuery` with the same key gets the data immediately. Hooks don't work in server components.",
    sources: ["tq-ssr", "next-fetching"],
  },
  {
    question: "What happens when you import a server component into a `'use client'` file?",
    options: [
      "It becomes a client component, and server code breaks or leaks",
      "It stays a server component: Next.js splits the modules at build time",
      "The import is ignored, and the component doesn't render",
    ],
    answer: 0,
    explanation:
      "Everything imported from a client module goes into the client bundle. If the component accessed the DB, the build fails (or worse, the code reaches the browser). Pass a server component to a client one as `children` or another prop from a server parent.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "How do you run code (e.g. analytics) after the response is sent, without delaying the user?",
    options: [
      "Use `after()` from `next/server`",
      "Start a promise without `await` in a server component",
      "Call `setTimeout` in a server component",
    ],
    answer: 0,
    explanation:
      "`after(() => log(...))` schedules work after the response finishes (in server components, Server Actions, Route Handlers, proxy). A \"dangling\" promise in a serverless environment can be cut off when the function ends, and its errors get lost.",
    sources: ["next-after"],
  },
  {
    question: "In Next.js, how do you send only part of the DB data to the client so nothing extra (like a password hash) leaks?",
    options: [
      "Return DTOs with only the needed fields from the data access layer",
      "Pass the whole user object: React hides the extra fields",
      "Delete the extra fields in the client component after receiving them",
    ],
    answer: 0,
    explanation:
      "Everything in a client component's props is serialized into the HTML and RSC payload and visible in DevTools. A Data Access Layer that checks permissions and returns minimal DTOs is recommended. You can also use the taint API to forbid passing certain objects to the client.",
    sources: ["next-data-security"],
  },
  {
    question: "How does `revalidatePath('/blog/[slug]', 'page')` differ from `revalidatePath('/blog/my-post')`?",
    options: [
      "The first covers all pages of the pattern, the second one specific path",
      "No difference: the second argument `'page'` is simply ignored",
      "The first invalidates only the layout, the second only the page",
    ],
    answer: 0,
    explanation:
      "If you pass a pattern with a dynamic segment, you must specify the type `'page'` or `'layout'`, and invalidation affects all paths matching the pattern. A specific path invalidates one page. `revalidatePath('/', 'layout')` resets the whole app.",
    sources: ["next-revalidatePath"],
  },
  {
    question: "Where should you store a secret API key used in a server component?",
    options: [
      "In an environment variable without the `NEXT_PUBLIC_` prefix",
      "In `NEXT_PUBLIC_API_KEY` so it's available everywhere",
      "Right in the component's code — it's a server component anyway",
    ],
    answer: 0,
    explanation:
      "Variables without the prefix are available only on the server. `NEXT_PUBLIC_*` variables are inlined into the client bundle and visible to everyone. Hardcoding ends up in the repository. `.env*.local` files aren't committed, and in production the values are set on the platform.",
    sources: ["next-env", "next-data-security"],
  },
  {
    question: "What does `connection()` from `next/server` do?",
    options: [
      "Signals that rendering from here on must wait for an actual request",
      "Opens a database connection pool for the current request",
      "Checks that the user has an internet connection",
    ],
    answer: 0,
    explanation:
      "It's needed when a component uses values that mustn't be computed during prerendering but doesn't access `cookies()` or `headers()`: for example, `Math.random()` or the current time. With Cache Components, such a component goes inside `<Suspense>`.",
    sources: ["next-connection"],
  },
  {
    question: "Why is `useFormStatus` handy in forms with Server Actions?",
    options: [
      "It gives the parent form's `pending` state so you can disable the button",
      "It returns the validation result of each form field",
      "It lets you submit the form programmatically, without a button or click",
    ],
    answer: 0,
    explanation:
      "The hook is called in a component inside `<form>` (usually the submit button): `const { pending } = useFormStatus()`. This lets you build a reusable `<SubmitButton>`. The action's result and errors are held by `useActionState`.",
    sources: ["react-useFormStatus", "next-mutating"],
  },
  {
    question: "Which file sets the fallback for a parallel route slot on a full page reload?",
    options: ["`default.tsx`", "`fallback.tsx`", "`slot.tsx`"],
    answer: 0,
    explanation:
      "During soft navigation, Next.js remembers the active state of slots. After a reload, it can't restore the state of slots that don't match the URL, so it renders their `default.tsx` (or a 404 if the file is missing). For a modal, `@modal/default.tsx` usually returns `null`.",
    sources: ["next-parallel-routes"],
  },
  {
    question: "How does a static route differ from a dynamic one in terms of rendering?",
    options: [
      "Static — at build time, dynamic — on every request",
      "A static route can't contain any JavaScript",
      "Dynamic means any route with a `[param]` segment in its path",
    ],
    answer: 0,
    explanation:
      "A route becomes dynamic when it uses request data: `cookies()`, `headers()`, `searchParams`, uncached requests. A `[slug]` segment by itself doesn't do that — it can be prerendered via `generateStaticParams`. With Cache Components, the boundary runs inside the page (PPR).",
    sources: ["next-rendering-philosophy", "next-caching"],
  },
  {
    question: "Where is the right place to check authorization in the App Router?",
    options: [
      "Close to the data: in the Data Access Layer, Server Actions and Route Handlers",
      "Only in `proxy.ts` — after it, all routes are considered protected",
      "Only in a client component, by hiding buttons from guests",
    ],
    answer: 0,
    explanation:
      "Proxy is fine for optimistic checks and redirects but shouldn't be the only protection: Server Actions are called directly, and layouts don't re-render on navigation. Check the session and permissions reliably where data is read and changed. Hiding buttons on the client isn't security.",
    sources: ["next-authentication", "next-data-security"],
  },
  {
    question: "How do you limit which paths `proxy.ts` runs on?",
    options: [
      "Export a `config` with a `matcher`",
      "Create a separate proxy in each route folder",
      "List the paths in the `proxyRoutes` section of `next.config`",
    ],
    answer: 0,
    explanation:
      "`export const config = { matcher: ['/dashboard/:path*'] }` — proxy runs only for matching paths. Static files and `_next` are usually excluded to save resources. There's one proxy per project, located at the root (or in `src`).",
    sources: ["next-proxy"],
  },
  {
    question: "What is `opengraph-image.tsx` useful for?",
    options: [
      "Generating the route's OG image from JSX at build time or on request",
      "Optimizing all images on the page for social media sharing",
      "Adding a watermark to all of the route's images",
    ],
    answer: 0,
    explanation:
      "By convention the file returns an `ImageResponse` with JSX markup — Next.js turns it into a PNG and adds the necessary `<meta>` tags. Handy for article previews with a title. In Next.js 16, `params` in such files is a promise too.",
    sources: ["next-metadata", "next-upgrade-16"],
  },
  {
    question: "Where does a client component's code run on the first page load?",
    options: [
      "Both on the server (for HTML) and in the browser (hydration)",
      "Only in the browser; it's skipped on the server",
      "Only on the server; the browser gets ready HTML without JS",
    ],
    answer: 0,
    explanation:
      "`'use client'` doesn't mean \"client only\": the component is prerendered to HTML on the server and then hydrated. That's why you can't access `window` during render without checks — use effects or `next/dynamic` with `ssr: false`.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "How is page data updated after an action if `revalidateTag(tag, 'max')` is used?",
    options: [
      "The visitor gets the old data, and fresh data is generated in the background",
      "The page instantly reloads for all users",
      "The data updates only after the project is rebuilt",
    ],
    answer: 0,
    explanation:
      "The `'max'` profile gives stale-while-revalidate semantics: the entry is marked stale, the first request gets the old version and triggers regeneration. If the author of the change should see the result immediately, use `updateTag` in a Server Action.",
    sources: ["next-revalidateTag", "next-updateTag"],
  },
  {
    question: "What does `staleTimes` in `next.config` control?",
    options: [
      "How long segments live in the client router cache",
      "How long `fetch` responses live in the server cache",
      "The timeout for generating static pages at build time",
    ],
    answer: 0,
    explanation:
      "The client router cache stores the RSC payload of visited and prefetched segments so back/forward navigation and repeat visits are instant. `staleTimes` sets how long this data is considered fresh for dynamic and static pages. The server data cache is configured separately.",
    sources: ["next-staleTimes", "next-prefetching"],
  },
  {
    question: "How do you return validation errors to a form from a Server Action?",
    options: [
      "Return an errors object and read it via `useActionState`",
      "Throw an exception — it appears next to the field",
      "Call `alert()` on the server",
    ],
    answer: 0,
    explanation:
      "Expected errors (an invalid email) are returned as data: `return { errors: { email: 'Invalid address' } }`. The form renders them via the `useActionState` state. Exceptions are reserved for unexpected failures — `error.tsx` catches them.",
    sources: ["next-mutating", "next-error-handling", "react-useActionState"],
  },
];

export default questions;
