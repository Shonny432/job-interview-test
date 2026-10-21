import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "What is colocation in the App Router?",
    options: [
      "Keeping components and utilities next to routes inside `app/`",
      "Placing the server and the database in the same data center",
      "Combining several pages into one JS bundle",
    ],
    answer: 0,
    explanation:
      "Files in `app/` become public only through `page` or `route`. So it's safe to keep a route's components, hooks, styles and tests next to its `page.tsx`. For clarity, use private `_components` folders or keep shared code in `src/` outside `app`.",
    sources: ["next-project-structure"],
  },
  {
    question: "What is Next.js?",
    options: [
      "A React framework with routing, server rendering and optimizations",
      "An alternative to React with its own component and template syntax",
      "A Node.js server framework for REST APIs without UI support",
    ],
    answer: 0,
    explanation:
      "Next.js is built on React and adds what the library lacks: file-based routing, server and static rendering, Server Components and Server Functions, image and font optimization, building and deployment. Components are written in plain React.",
    sources: ["next-docs", "next-learn"],
  },
  {
    question: "How do you create a page at `/about` in the App Router?",
    options: [
      "Create `app/about/page.tsx` with a default-exported component",
      "Create `app/about.tsx` with a named export `Page`",
      "Add an `/about` route to the `routes` section of `next.config.ts`",
    ],
    answer: 0,
    explanation:
      "A route is defined by a folder, and a `page.tsx` (or `.js`) file makes it a public page. Without `page`, the folder isn't reachable by URL — you can keep components in it (colocation). There's no route configuration in `next.config`. A `pages/about.tsx` file is the old Pages Router convention.",
    sources: ["next-layouts-pages", "next-project-structure"],
  },
  {
    question: "How does `layout.tsx` differ from `page.tsx`?",
    options: [
      "A layout wraps pages and preserves state during navigation",
      "A layout renders only on the server, a page only in the browser",
      "A layout is only for metadata; you can't write markup in it",
    ],
    answer: 0,
    explanation:
      "A layout receives `children` and holds UI shared by nested routes (header, sidebar). When navigating between child pages, the layout doesn't remount: its state and DOM are preserved, and only the changed part renders. Both layout and page are Server Components by default.",
    sources: ["next-layouts-pages", "next-layout-file"],
  },
  {
    question: "What must the root `app/layout.tsx` contain?",
    options: [
      "The `<html>` and `<body>` tags",
      "The `<Head>` component from `next/head`",
      "A `<NextProvider>` around `children`",
    ],
    answer: 0,
    explanation:
      "The root layout replaces `_app` and `_document` from the Pages Router and must render `<html>` and `<body>` itself. Metadata is set via the `metadata` or `generateMetadata` export, not `next/head`. Next.js has no mandatory provider.",
    sources: ["next-layout-file", "next-layouts-pages"],
  },
  {
    question: "How do you create a dynamic route `/blog/:slug`?",
    options: [
      "The folder `app/blog/[slug]/page.tsx`",
      "The folder `app/blog/:slug/page.tsx`",
      "The folder `app/blog/{slug}/page.tsx`",
    ],
    answer: 0,
    explanation:
      "A dynamic segment is a folder name in square brackets. The value arrives in `params`. `[...slug]` catches several segments; `[[...slug]]` does the same but also matches the route without segments. Colons and curly braces are other routers' syntax.",
    sources: ["next-dynamic-routes"],
  },
  {
    question: "How do you correctly read `params` in a Next.js 16 page?",
    options: [
      "`const { slug } = await params` — it's a Promise",
      "`const { slug } = params` — it's a plain object",
      "`const slug = useParams().slug` in a server page",
    ],
    answer: 0,
    explanation:
      "Since Next.js 15, `params` and `searchParams` are promises, and Next.js 16 removed synchronous access entirely. In a server component you `await` them; in a client page, use `use(params)`. The `useParams` hook works only in client components.",
    sources: ["next-dynamic-routes", "next-upgrade-16"],
  },
  {
    question: "Why is `<Link>` from `next/link` better than a plain `<a href>` for internal navigation?",
    options: [
      "Navigation without a full page reload, plus route prefetching",
      "`<Link>` links are indexed by search engines, while plain `<a>` aren't",
      "`<Link>` opens pages in a new browser tab by default",
    ],
    answer: 0,
    explanation:
      "`<Link>` renders a regular `<a>` (so SEO doesn't suffer) but intercepts the click and performs an SPA transition: shared layouts are kept, and only what's needed is loaded. Links in the viewport are prefetched in production. For external addresses, use a plain `<a>`.",
    sources: ["next-link", "next-linking"],
  },
  {
    question: "What kind of components are files in the `app/` folder by default?",
    options: [
      "Server Components",
      "Client Components",
      "It depends on `next.config` settings",
    ],
    answer: 0,
    explanation:
      "In the App Router, everything is a Server Component by default: the code runs on the server and doesn't end up in the client bundle. To use state, effects, event handlers or browser APIs, add `'use client'` at the top of the file.",
    sources: ["next-server-client", "react-server-components"],
  },
  {
    question: "A component uses `useState` and `onClick` but crashes with an error. What's missing?",
    options: [
      "The `'use client'` directive at the top of the file",
      "A `<Suspense>` wrapper around the component",
      "The export `export const dynamic = 'force-dynamic'`",
    ],
    answer: 0,
    explanation:
      "State hooks and event handlers work only in client components. `'use client'` declares the boundary of the client part. Best practice is to move interactivity into small client components and keep the page itself on the server.",
    sources: ["next-use-client", "next-server-client"],
  },
  {
    question: "What is the `loading.tsx` file for?",
    options: [
      "An instant segment fallback: Next.js wraps the page in `<Suspense>`",
      "It sets a loading indicator for all `fetch` requests in the browser",
      "It's shown only on the first visit to the site, like a splash screen",
    ],
    answer: 0,
    explanation:
      "Next.js automatically wraps `page` (and nested segments) in `<Suspense fallback={<Loading />}>`. The user immediately sees the layout and a skeleton, while content streams in when ready. For finer control, place your own `<Suspense>` inside the page.",
    sources: ["next-loading", "next-streaming"],
  },
  {
    question: "Why must `error.tsx` be a client component?",
    options: [
      "It's a React error boundary, which only works on the client",
      "Server components can't render error text and stack traces",
      "The requirement applies only in development mode",
    ],
    answer: 0,
    explanation:
      "`error.tsx` wraps the segment in an error boundary — a client-side mechanism. The component receives `error` and a `retry()` function that reloads and re-renders the segment (there's also `reset()` — re-render without refetching data). Errors in the root layout are caught by `global-error.tsx`.",
    sources: ["next-error-file", "next-error-handling"],
  },
  {
    question: "How do you show a 404 page for a nonexistent product in a server page?",
    options: [
      "Call `notFound()` from `next/navigation`",
      "Return `{ status: 404 }` from the page component",
      "Throw `new Error('404')` — Next.js will figure it out",
    ],
    answer: 0,
    explanation:
      "`notFound()` stops rendering, shows the nearest `not-found.tsx` (or the default 404) and sets the appropriate status. A component can't return an HTTP status, and a regular error goes to `error.tsx`.",
    sources: ["next-notFound", "next-not-found"],
  },
  {
    question: "How do you set a page's title and description in the App Router?",
    options: [
      "Export `metadata` or `generateMetadata` from a page/layout",
      "Use the `<Head>` component from `next/head` inside the page",
      "Specify `<title>` in `next.config.ts` for each route",
    ],
    answer: 0,
    explanation:
      "The Metadata API works in server components: `export const metadata = { title, description }`, and for dynamic values `export async function generateMetadata({ params })`. Values from layout and page are merged. `next/head` is a Pages Router API.",
    sources: ["next-metadata", "next-generateMetadata"],
  },
  {
    question: "At what URL is the file `public/logo.png` served?",
    options: ["`/logo.png`", "`/public/logo.png`", "`/_next/static/logo.png`"],
    answer: 0,
    explanation:
      "The contents of `public` are served from the site root. Favicons, robots.txt and static images go there. These files don't go through the build and don't get a hash in their name, so caching must be configured separately. `/_next/static` is the path for build-generated assets.",
    sources: ["next-project-structure"],
  },
  {
    question: "How do you create a `GET /api/users` API endpoint in the App Router?",
    options: [
      "A file `app/api/users/route.ts` exporting a `GET` function",
      "A file `app/api/users/page.tsx` with a default export",
      "A file `api/users.ts` in the project root with `export default handler`",
    ],
    answer: 0,
    explanation:
      "Route Handlers use the Web `Request`/`Response` APIs: `export async function GET(request: Request) { return Response.json(users) }`. `POST`, `PUT`, `PATCH`, `DELETE` and others are supported. A folder can't contain both `route.ts` and `page.tsx`.",
    sources: ["next-route-handlers"],
  },
  {
    question: "Which environment variables are available in browser code?",
    options: [
      "Only those prefixed with `NEXT_PUBLIC_`, inlined at build time",
      "All variables from `.env` if the file is in the project root",
      "None: environment variables aren't available in the browser at all",
    ],
    answer: 0,
    explanation:
      "Next.js substitutes `process.env.NEXT_PUBLIC_*` into client code at build time, so changing a value requires a rebuild. Other variables are available only on the server — that way secrets (API keys, DB passwords) don't leak to the browser.",
    sources: ["next-env"],
  },
  {
    question: "What does the `<Image>` component from `next/image` give you?",
    options: [
      "Size and format selection, lazy loading, protection against CLS",
      "Just a shorter syntax for a regular `<img>` tag",
      "Image loading over WebSocket to speed up rendering",
    ],
    answer: 0,
    explanation:
      "`next/image` generates `srcset`, serves modern formats (WebP/AVIF), lazy-loads by default and reserves space thanks to `width`/`height` (or `fill`), preventing layout shifts. For the LCP image, use `preload` (formerly `priority`).",
    sources: ["next-images", "next-image"],
  },
  {
    question: "Why does `<Image src=\"https://cdn.example.com/a.jpg\" ... />` produce a configuration error?",
    options: [
      "External domains must be allowed in `images.remotePatterns` in `next.config`",
      "`next/image` doesn't support images from other domains at all",
      "External images can be loaded only in PNG format",
    ],
    answer: 0,
    explanation:
      "The image optimizer runs on your server, and without restrictions it could be used as a proxy for any URL. That's why allowed sources are listed in `remotePatterns` (protocol, host, path).",
    sources: ["next-image", "next-images"],
  },
  {
    question: "What does `next/font` do?",
    options: [
      "Downloads the font at build time and serves it from your domain",
      "Loads Google Fonts via `<link>` on every page request",
      "Converts fonts into an SVG sprite to speed up text rendering",
    ],
    answer: 0,
    explanation:
      "Fonts (Google or local) are downloaded at build time and served with your static assets: the browser doesn't contact Google, which is better for privacy and speed. Next.js also configures a fallback font with adjusted metrics to reduce CLS.",
    sources: ["next-fonts", "next-font"],
  },
  {
    question: "Where do you import `useRouter` from in the App Router?",
    options: ["`next/navigation`", "`next/router`", "`react-router-dom`"],
    answer: 0,
    explanation:
      "In the App Router, navigation hooks — `useRouter`, `usePathname`, `useSearchParams`, `useParams` — are imported from `next/navigation` and work in client components. `next/router` is the Pages Router API. For a server-side redirect, use `redirect()`.",
    sources: ["next-useRouter"],
  },
  {
    question: "How do you get the current path in a client component, e.g. to highlight the active link?",
    options: ["`usePathname()`", "`window.location.pathname` during render", "`useRouter().pathname`"],
    answer: 0,
    explanation:
      "`usePathname()` returns the path and updates on client-side navigation. Reading `window` during render breaks SSR and hydration. The `pathname` property on `useRouter` existed in the Pages Router; it isn't in `next/navigation`.",
    sources: ["next-usePathname"],
  },
  {
    question: "How does SSR differ from SSG?",
    options: [
      "SSR — HTML on every request, SSG — ahead of time at build",
      "SSR renders in the user's browser, while SSG renders on the server",
      "SSG requires a database connection, while SSR works without one",
    ],
    answer: 0,
    explanation:
      "Static Site Generation (prerendering) creates HTML at build time and serves it from a CDN — fast and cheap, but the data is \"frozen\". Server-Side Rendering produces HTML on every request — the data is fresh and personalized, but load and TTFB are higher. Rendering in the browser is CSR.",
    sources: ["vercel-ssr-ssg", "next-glossary"],
  },
  {
    question: "What is ISR (Incremental Static Regeneration)?",
    options: [
      "Background updating of static pages without a full rebuild",
      "Gradual loading of the JS bundle as you scroll down the page",
      "Rendering the page in parts in the browser after JS loads",
    ],
    answer: 0,
    explanation:
      "Users get a cached static page, and after the period expires (or `revalidatePath`/`revalidateTag` is called), Next.js regenerates it in the background and updates the cache. It's a compromise between the speed of SSG and the freshness of SSR.",
    sources: ["next-isr", "next-revalidating"],
  },
  {
    question: "When does `getServerSideProps` run in the Pages Router?",
    options: [
      "On the server on every request",
      "Once at build time",
      "In the browser during hydration",
    ],
    answer: 0,
    explanation:
      "`getServerSideProps` is SSR in the Pages Router: the function receives the request context (cookies, query) and returns props. At build time, `getStaticProps` runs instead. In the App Router, both APIs are replaced by async server components.",
    sources: ["next-pages-gssp", "next-pages-gsp"],
  },
  {
    question: "What does `getStaticPaths` do in the Pages Router?",
    options: [
      "Returns the paths of a dynamic route to build",
      "Returns all static files from the `public` folder",
      "Defines redirects and rewrites for static pages",
    ],
    answer: 0,
    explanation:
      "For a `pages/posts/[id].tsx` page with `getStaticProps`, Next.js needs to know which `id`s to build ahead of time. The `fallback` option defines behavior for other paths. The App Router counterpart is `generateStaticParams`.",
    sources: ["next-pages-gsps", "next-generateStaticParams"],
  },
  {
    question: "What does a folder in parentheses do, e.g. `app/(marketing)/about/page.tsx`?",
    options: [
      "Groups routes without affecting the URL — the page is at `/about`",
      "Makes the route optional: both `/marketing/about` and `/about` work",
      "Hides the route from the production build",
    ],
    answer: 0,
    explanation:
      "Route groups organize code and let a group have its own layout (e.g. separate ones for marketing and the user dashboard) without changing URLs. You can even have several root layouts in different groups.",
    sources: ["next-route-groups"],
  },
  {
    question: "Why give a folder a name with an underscore, e.g. `app/_components`?",
    options: [
      "It's a private folder: it and its files are excluded from routing",
      "The underscore makes the components in the folder client components",
      "It tells Next.js to minify those files more aggressively",
    ],
    answer: 0,
    explanation:
      "Private folders explicitly separate helper code from routes. Strictly speaking, files without `page`/`route` aren't public anyway, but `_` protects against accidentally creating a route and makes the structure clearer.",
    sources: ["next-project-structure"],
  },
  {
    question: "Which route will catch `/docs/a/b/c`?",
    options: [
      "`app/docs/[...slug]/page.tsx`",
      "`app/docs/[slug]/page.tsx`",
      "`app/docs/*/page.tsx`",
    ],
    answer: 0,
    explanation:
      "A catch-all segment `[...slug]` collects all following segments into an array. A regular `[slug]` matches exactly one segment. An optional catch-all `[[...slug]]` also matches `/docs` itself. Next.js doesn't support asterisks in folder names.",
    sources: ["next-dynamic-routes"],
  },
  {
    question: "What do the `next build` and `next start` commands do?",
    options: [
      "`build` creates the production build, `start` runs it",
      "`build` starts the dev server, while `start` runs the project's tests",
      "They're synonyms: `start` is the old name of `build`",
    ],
    answer: 0,
    explanation:
      "`next dev` is the development server with fast refresh. `next build` compiles the app, prerenders static routes and prints a report. `next start` runs the production server on the build output. For a static site there's `output: 'export'`.",
    sources: ["next-docs", "next-self-hosting"],
  },
  {
    question: "Which bundler does Next.js 16 use by default for `next dev` and `next build`?",
    options: ["Turbopack, without extra flags", "Webpack, as in previous versions", "Vite, after switching from Webpack"],
    answer: 0,
    explanation:
      "Since Next.js 16, Turbopack is stable and used by default in both modes — the `--turbopack` flag is no longer needed. You can go back to Webpack with the `--webpack` flag. If the project has a custom `webpack` config, `next build` without the flag fails so that the config isn't silently ignored.",
    sources: ["next-upgrade-16", "next-turbopack"],
  },
  {
    question: "In Next.js 16, what is the file formerly called `middleware.ts` named?",
    options: ["`proxy.ts`", "`interceptor.ts`", "`gateway.ts`"],
    answer: 0,
    explanation:
      "The `middleware` convention is deprecated and renamed to `proxy` to emphasize its role at the network boundary (redirects, rewrites, headers). The exported function is also called `proxy`. Proxy runs in the Node.js runtime; the edge runtime isn't supported there.",
    sources: ["next-proxy", "next-upgrade-16"],
  },
  {
    question: "How do you redirect the user to `/login` from a server component?",
    options: [
      "Call `redirect('/login')` from `next/navigation`",
      "Call `router.push('/login')` from `useRouter`",
      "Return `<Navigate to=\"/login\" />` from the component",
    ],
    answer: 0,
    explanation:
      "`redirect()` works in server components, Server Functions and Route Handlers. It throws a special exception, so code after it doesn't run, and you must not wrap it in `try/catch`. `useRouter` is available only in client components, and `<Navigate>` is from React Router.",
    sources: ["next-redirect"],
  },
  {
    question: "How do you get the `?page=2` query parameter in a server page?",
    options: [
      "From the `searchParams` prop: `const { page } = await searchParams`",
      "Via `useSearchParams()` directly in the server page",
      "Via `params.page` — the query goes into `params`",
    ],
    answer: 0,
    explanation:
      "The page receives `searchParams` as a promise. Reading the query makes the page dynamic, because the values are known only at request time. In client components, use `useSearchParams()`. `params` contains only the dynamic path segments.",
    sources: ["next-page-file", "next-useSearchParams"],
  },
  {
    question: "How do you load data in a server component?",
    options: [
      "Make the component `async` and call `await fetch()` or a DB query",
      "Only via `useEffect` and `useState`, as in client React",
      "Only via a Route Handler and a request to it from the client",
    ],
    answer: 0,
    explanation:
      "Server components can be async and access data directly — APIs, ORMs, the file system — without sending secrets to the browser. Calling your own Route Handler from a server component is an unnecessary network round trip. Hooks aren't available in server components.",
    sources: ["next-fetching", "next-server-client"],
  },
  {
    question: "Where do you import global CSS in the App Router?",
    options: [
      "In the root `app/layout.tsx` via `import`",
      "In each `page.tsx` separately via `import`",
      "Only via a `<link>` tag in `public/index.html`",
    ],
    answer: 0,
    explanation:
      "Global styles are imported in the root layout and apply to all routes. For component styles, use CSS Modules (`*.module.css`), Tailwind or CSS-in-JS with RSC support. Next.js has no `index.html` file.",
    sources: ["next-css"],
  },
  {
    question: "Where does a `console.log` from a server component appear?",
    options: [
      "In the terminal where the Next.js server is running",
      "In the user's browser console",
      "Nowhere: logging is disabled in server components",
    ],
    answer: 0,
    explanation:
      "A server component runs on the server (or at build time), so its logs go to the Node.js process output. In development, Next.js may mirror server logs to the browser for convenience, but the code still runs on the server.",
    sources: ["next-server-client"],
  },
  {
    question: "What do you pass to `<Image>` for an image that stretches over the whole parent block?",
    options: [
      "The `fill` prop, with `position: relative` on the parent",
      "`width=\"100%\"` and `height=\"100%\"` as strings",
      "Nothing: `<Image>` fills its parent by default",
    ],
    answer: 0,
    explanation:
      "When dimensions aren't known in advance, use `fill`: the image is absolutely positioned and fills the parent, which must be `relative`, `absolute` or `fixed`. `sizes` hints how wide the image will be so the browser doesn't download a file that's too large. Fitting is controlled with `object-fit`.",
    sources: ["next-image"],
  },
  {
    question: "How do you lazy-load a heavy client component in Next.js?",
    options: [
      "With `next/dynamic` (or `React.lazy` + `Suspense`)",
      "With a `lazy` attribute on the component in JSX",
      "With `import` inside `useEffect`, storing it in state",
    ],
    answer: 0,
    explanation:
      "`const Chart = dynamic(() => import('./Chart'))` moves the code into a separate chunk and lets you specify `loading`. The `ssr: false` option disables server rendering but can be used only in client components. Server components don't end up in the bundle anyway.",
    sources: ["next-lazy-loading"],
  },
  {
    question: "Why load third-party scripts via `next/script`?",
    options: [
      "You can choose a loading strategy (`afterInteractive`, `lazyOnload`, etc.)",
      "Only then will scripts work in the production build",
      "`next/script` automatically rewrites the script in TypeScript",
    ],
    answer: 0,
    explanation:
      "The `<Script>` component lets you avoid blocking page load with analytics and widgets: `beforeInteractive` for critical scripts, `afterInteractive` (the default) and `lazyOnload` for secondary ones. A script loads once even when navigating between pages.",
    sources: ["next-script"],
  },
  {
    question: "How do you build a Next.js app into a set of static files without a Node.js server?",
    options: [
      "Set `output: 'export'` in `next.config`",
      "Run `next start --static`",
      "Delete the `app` folder and keep only `public`",
    ],
    answer: 0,
    explanation:
      "A static export puts HTML, CSS and JS into the `out` folder, which you can host on any static hosting. Limitations: features that need a server don't work — `cookies()`, dynamic Route Handlers, ISR, default image optimization, Server Functions.",
    sources: ["next-static-exports"],
  },
  {
    question: "What happens if `app/dashboard/` contains both `page.tsx` and `route.ts`?",
    options: [
      "A build error: these files conflict over the same URL",
      "GET requests go to `route.ts`, the rest to `page.tsx`",
      "The page renders, and `route.ts` is ignored",
    ],
    answer: 0,
    explanation:
      "Both files claim the same URL, and Next.js reports a conflict. API routes are usually moved into a separate branch, e.g. `app/api/...`.",
    sources: ["next-route-handlers"],
  },
  {
    question: "How does `template.tsx` differ from `layout.tsx`?",
    options: [
      "A template remounts on every navigation, a layout persists",
      "A template renders only on the server, a layout only on the client",
      "A template is used only for email templates",
    ],
    answer: 0,
    explanation:
      "A template wraps pages like a layout but gets a unique key on each navigation: state resets and effects run again. This is useful, for example, for enter animations or logging page views. In most cases a layout is enough.",
    sources: ["next-template"],
  },
  {
    question: "Can you use the `useState` and `useEffect` hooks in a server component?",
    options: [
      "No: server components have no state or effects",
      "Yes, but only `useState`, not `useEffect`",
      "Yes, if the component is declared as an `async` function",
    ],
    answer: 0,
    explanation:
      "A server component runs once to produce a result and doesn't \"live\" afterwards. State, effects and event handlers are client features. A server component can render a client component and pass it data via props.",
    sources: ["next-server-client", "react-server-components"],
  },
  {
    question: "When does `<Link>` prefetch a route?",
    options: [
      "When the link enters the viewport (in production)",
      "Only after the link is clicked, as with normal navigation",
      "Right when the app loads — every route of the site",
    ],
    answer: 0,
    explanation:
      "Prefetching makes navigation instant. It's disabled in dev mode, so check navigation speed on a production build. The behavior is configured with the `prefetch` prop (`false`, `true`, `'auto'`). In Next.js 16 prefetching became incremental: shared layouts are downloaded once.",
    sources: ["next-link", "next-prefetching"],
  },
  {
    question: "Will state in a sidebar inside a shared layout survive navigation between pages?",
    options: [
      "Yes: a shared layout doesn't remount during navigation",
      "No: every navigation remounts the whole tree",
      "Only if the sidebar is wrapped in `React.memo` or `useMemo`",
    ],
    answer: 0,
    explanation:
      "Next.js renders only the changed segments, while shared layouts stay mounted: typed text, open menus and scroll position are preserved. If you need a reset on navigation, use `template.tsx` or `key`.",
    sources: ["next-linking", "next-layouts-pages"],
  },
  {
    question: "How do you type the props of `app/blog/[slug]/page.tsx` in Next.js 16?",
    options: [
      "With the global helper `PageProps<'/blog/[slug]'>`",
      "With `NextPage<{ slug: string }>` from `next`",
      "Typing page props isn't possible",
    ],
    answer: 0,
    explanation:
      "Next.js generates route types (during `next dev`, `next build` or `next typegen`), and the `PageProps`, `LayoutProps` and `RouteContext` helpers know the `params` shape for each path. `NextPage` is a Pages Router type.",
    sources: ["next-page-file", "next-typescript"],
  },
  {
    question: "What is the minimum Node.js version required for Next.js 16?",
    options: ["20.9", "16.0", "18.0"],
    answer: 0,
    explanation:
      "Next.js 16 requires Node.js 20.9+ (LTS); Node.js 18 support was dropped. Requirements for TypeScript (5.1+) and browsers (Chrome/Edge/Firefox 111+, Safari 16.4+) also went up.",
    sources: ["next-upgrade-16"],
  },
  {
    question: "Can you use CSS Modules in Next.js without extra configuration?",
    options: [
      "Yes: `*.module.css` files are supported out of the box",
      "No: you have to install and configure `css-loader`",
      "Only in the Pages Router; the App Router doesn't support them",
    ],
    answer: 0,
    explanation:
      "`import styles from './Button.module.css'` and `className={styles.primary}` — class names become locally scoped. Sass (after installing the `sass` package), Tailwind and global CSS are supported too.",
    sources: ["next-css"],
  },
  {
    question: "What title does the page get with `export const metadata = { title: 'Profile' }` in the page and `title: { template: '%s | Shop', default: 'Shop' }` in the layout?",
    options: ["`Profile | Shop`", "`Shop | Profile`", "`Profile` without the template"],
    answer: 0,
    explanation:
      "`title.template` from the layout is applied to titles of child segments: `%s` is replaced with the page's `title`. `default` is used if a child segment doesn't set a title. This saves you from repeating the site name on every page.",
    sources: ["next-metadata", "next-generateMetadata"],
  },
];

export default questions;
