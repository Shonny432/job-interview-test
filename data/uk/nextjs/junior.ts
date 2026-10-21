import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Що таке colocation в App Router?",
    options: [
      "Зберігання компонентів і утиліт поруч із маршрутами всередині `app/`",
      "Розміщення сервера й бази даних в одному дата-центрі",
      "Об'єднання кількох сторінок в один JS-бандл",
    ],
    answer: 0,
    explanation:
      "Файли в `app/` стають публічними лише через `page` або `route`. Тому поруч із `page.tsx` безпечно зберігати компоненти, хуки, стилі й тести конкретного маршруту. Для явності використовують приватні папки `_components` або тримають спільний код у `src/` поза `app`.",
    sources: ["next-project-structure"],
  },
  {
    question: "Що таке Next.js?",
    options: [
      "React-фреймворк із маршрутизацією, серверним рендерингом і оптимізаціями",
      "Альтернатива React із власним синтаксисом компонентів і шаблонів",
      "Серверний фреймворк на Node.js для REST API без підтримки UI",
    ],
    answer: 0,
    explanation:
      "Next.js побудований на React і додає те, чого немає в бібліотеці: файлову маршрутизацію, серверний і статичний рендеринг, Server Components і Server Functions, оптимізацію зображень і шрифтів, збирання й деплой. Компоненти пишуться звичайним React.",
    sources: ["next-docs", "next-learn"],
  },
  {
    question: "Як в App Router створити сторінку за адресою `/about`?",
    options: [
      "Створити файл `app/about/page.tsx` з default-експортом компонента",
      "Створити файл `app/about.tsx` з іменованим експортом `Page`",
      "Додати маршрут `/about` у `next.config.ts` до розділу `routes`",
    ],
    answer: 0,
    explanation:
      "Маршрут задається папкою, а публічною сторінкою її робить файл `page.tsx` (або `.js`). Без `page` папка недоступна за URL — у ній можна зберігати компоненти (colocation). Конфігурації маршрутів у `next.config` немає. Файл `pages/about.tsx` — це домовленість старого Pages Router.",
    sources: ["next-layouts-pages", "next-project-structure"],
  },
  {
    question: "Чим `layout.tsx` відрізняється від `page.tsx`?",
    options: [
      "Layout обгортає сторінки й зберігає стан під час навігації",
      "Layout рендериться лише на сервері, а page — лише в браузері",
      "Layout потрібен лише для метаданих, розмітку в ньому писати не можна",
    ],
    answer: 0,
    explanation:
      "Layout отримує `children` і спільний для вкладених маршрутів UI (шапка, сайдбар). Під час переходу між дочірніми сторінками layout не перемонтовується: його стан і DOM зберігаються, рендериться лише змінена частина. І layout, і page за замовчуванням — Server Components.",
    sources: ["next-layouts-pages", "next-layout-file"],
  },
  {
    question: "Що обов'язково має бути в кореневому `app/layout.tsx`?",
    options: [
      "Теги `<html>` і `<body>`",
      "Компонент `<Head>` з `next/head`",
      "Провайдер `<NextProvider>` навколо `children`",
    ],
    answer: 0,
    explanation:
      "Кореневий layout замінює `_app` і `_document` з Pages Router і має сам рендерити `<html>` і `<body>`. Метадані задаються через експорт `metadata` або `generateMetadata`, а не через `next/head`. Обов'язкового провайдера в Next.js немає.",
    sources: ["next-layout-file", "next-layouts-pages"],
  },
  {
    question: "Як створити динамічний маршрут `/blog/:slug`?",
    options: [
      "Папка `app/blog/[slug]/page.tsx`",
      "Папка `app/blog/:slug/page.tsx`",
      "Папка `app/blog/{slug}/page.tsx`",
    ],
    answer: 0,
    explanation:
      "Динамічний сегмент — назва папки у квадратних дужках. Значення приходить у `params`. `[...slug]` ловить кілька сегментів, `[[...slug]]` — те саме, але включно з маршрутом без сегментів. Двокрапка й фігурні дужки — синтаксис інших роутерів.",
    sources: ["next-dynamic-routes"],
  },
  {
    question: "Як правильно прочитати `params` у сторінці Next.js 16?",
    options: [
      "`const { slug } = await params` — це Promise",
      "`const { slug } = params` — це звичайний об'єкт",
      "`const slug = useParams().slug` у серверній сторінці",
    ],
    answer: 0,
    explanation:
      "З Next.js 15 `params` і `searchParams` — проміси, а в Next.js 16 синхронний доступ видалено остаточно. У серверному компоненті на них чекають через `await`, у клієнтській сторінці — через `use(params)`. Хук `useParams` працює лише в клієнтських компонентах.",
    sources: ["next-dynamic-routes", "next-upgrade-16"],
  },
  {
    question: "Чим `<Link>` з `next/link` кращий за звичайний `<a href>` для внутрішніх переходів?",
    options: [
      "Перехід без перезавантаження сторінки й попереднє завантаження маршрутів",
      "Посилання `<Link>` індексуються пошуковиками, а звичайні `<a>` — ні",
      "`<Link>` за замовчуванням відкриває сторінки в новій вкладці браузера",
    ],
    answer: 0,
    explanation:
      "`<Link>` рендерить звичайний `<a>` (тому SEO не страждає), але перехоплює клік і виконує SPA-перехід: спільні layout зберігаються, завантажується лише потрібне. Посилання у viewport попередньо завантажуються в продакшені. Для зовнішніх адрес використовують звичайний `<a>`.",
    sources: ["next-link", "next-linking"],
  },
  {
    question: "Якими компонентами за замовчуванням є файли в папці `app/`?",
    options: [
      "Server Components",
      "Client Components",
      "Залежить від налаштувань `next.config`",
    ],
    answer: 0,
    explanation:
      "В App Router усе за замовчуванням — Server Components: код виконується на сервері й не потрапляє в клієнтський бандл. Щоб використовувати стан, ефекти, обробники подій або браузерні API, потрібен `'use client'` на початку файлу.",
    sources: ["next-server-client", "react-server-components"],
  },
  {
    question: "Компонент використовує `useState` і `onClick`, але падає з помилкою. Чого бракує?",
    options: [
      "Директиви `'use client'` на початку файлу",
      "Обгортки `<Suspense>` навколо компонента",
      "Експорту `export const dynamic = 'force-dynamic'`",
    ],
    answer: 0,
    explanation:
      "Хуки стану й обробники подій працюють лише в клієнтських компонентах. `'use client'` оголошує межу клієнтської частини. Найкраща практика — виносити інтерактивність у маленькі клієнтські компоненти, лишаючи сторінку серверною.",
    sources: ["next-use-client", "next-server-client"],
  },
  {
    question: "Для чого потрібен файл `loading.tsx`?",
    options: [
      "Миттєвий fallback сегмента: Next.js обгортає page у `<Suspense>`",
      "Задає індикатор завантаження для всіх `fetch`-запитів у браузері",
      "Показується лише під час першого відкриття сайту, як splash-екран",
    ],
    answer: 0,
    explanation:
      "Next.js автоматично обгортає `page` (і вкладені сегменти) у `<Suspense fallback={<Loading />}>`. Користувач одразу бачить layout і скелетон, а вміст стримиться щойно готовий. Для точкового контролю можна ставити власні `<Suspense>` усередині сторінки.",
    sources: ["next-loading", "next-streaming"],
  },
  {
    question: "Чому `error.tsx` має бути клієнтським компонентом?",
    options: [
      "Це React error boundary, а він працює лише на клієнті",
      "Серверні компоненти не вміють рендерити текст помилки й стек",
      "Ця вимога діє лише в режимі розробки",
    ],
    answer: 0,
    explanation:
      "`error.tsx` обгортає сегмент в error boundary — це клієнтський механізм. Компонент отримує `error` і функцію `retry()`, яка заново завантажує й рендерить сегмент (є й `reset()` — повторний рендер без перезавантаження даних). Помилки кореневого layout ловить `global-error.tsx`.",
    sources: ["next-error-file", "next-error-handling"],
  },
  {
    question: "Як показати сторінку 404 для неіснуючого товару в серверній сторінці?",
    options: [
      "Викликати `notFound()` з `next/navigation`",
      "Повернути `{ status: 404 }` з компонента сторінки",
      "Кинути `new Error('404')` — Next.js сам зрозуміє",
    ],
    answer: 0,
    explanation:
      "`notFound()` перериває рендер і показує найближчий `not-found.tsx` (або стандартну 404), а також виставляє відповідний статус. Компонент не може повернути HTTP-статус, а звичайна помилка потрапить в `error.tsx`.",
    sources: ["next-notFound", "next-not-found"],
  },
  {
    question: "Як задати заголовок і опис сторінки в App Router?",
    options: [
      "Експортувати `metadata` або `generateMetadata` з page/layout",
      "Використати компонент `<Head>` з `next/head` усередині сторінки",
      "Прописати `<title>` у `next.config.ts` для кожного маршруту",
    ],
    answer: 0,
    explanation:
      "Metadata API працює в серверних компонентах: `export const metadata = { title, description }`, а для динаміки — `export async function generateMetadata({ params })`. Значення з layout і page об'єднуються. `next/head` — API Pages Router.",
    sources: ["next-metadata", "next-generateMetadata"],
  },
  {
    question: "За якою адресою доступний файл `public/logo.png`?",
    options: ["`/logo.png`", "`/public/logo.png`", "`/_next/static/logo.png`"],
    answer: 0,
    explanation:
      "Вміст `public` віддається від кореня сайту. Туди кладуть favicon, robots.txt, статичні картинки. Файли не проходять через збирання й не отримують хеш в імені, тому їх кешування треба налаштовувати окремо. `/_next/static` — шлях для асетів, створених збиранням.",
    sources: ["next-project-structure"],
  },
  {
    question: "Як в App Router створити API-ендпоінт `GET /api/users`?",
    options: [
      "Файл `app/api/users/route.ts` з експортом функції `GET`",
      "Файл `app/api/users/page.tsx` з default-експортом",
      "Файл `api/users.ts` у корені проєкту з `export default handler`",
    ],
    answer: 0,
    explanation:
      "Route Handlers використовують Web API `Request`/`Response`: `export async function GET(request: Request) { return Response.json(users) }`. Підтримуються `POST`, `PUT`, `PATCH`, `DELETE` та ін. В одній папці не може бути одночасно `route.ts` і `page.tsx`.",
    sources: ["next-route-handlers"],
  },
  {
    question: "Які змінні оточення доступні в браузерному коді?",
    options: [
      "Лише з префіксом `NEXT_PUBLIC_`, що вбудовуються під час збирання",
      "Усі змінні з `.env`, якщо файл лежить у корені проєкту",
      "Жодні: змінні оточення в браузері недоступні взагалі",
    ],
    answer: 0,
    explanation:
      "Next.js підставляє `process.env.NEXT_PUBLIC_*` у клієнтський код на етапі збирання, тому зміна значення потребує перезбирання. Решта змінних доступна лише на сервері — так секрети (ключі API, паролі БД) не витечуть у браузер.",
    sources: ["next-env"],
  },
  {
    question: "Що дає компонент `<Image>` з `next/image`?",
    options: [
      "Підбір розміру й формату, ліниве завантаження, захист від CLS",
      "Лише коротший синтаксис для звичайного тегу `<img>`",
      "Завантаження зображень через WebSocket для пришвидшення відмальовування",
    ],
    answer: 0,
    explanation:
      "`next/image` генерує `srcset`, віддає сучасні формати (WebP/AVIF), за замовчуванням вантажить ліниво й резервує місце завдяки `width`/`height` (або `fill`), запобігаючи зсувам макета. Для LCP-картинки використовують `preload` (раніше — `priority`).",
    sources: ["next-images", "next-image"],
  },
  {
    question: "Чому `<Image src=\"https://cdn.example.com/a.jpg\" ... />` видає помилку конфігурації?",
    options: [
      "Зовнішні домени треба дозволити в `images.remotePatterns` у `next.config`",
      "`next/image` узагалі не підтримує зображень з інших доменів",
      "Зовнішні картинки можна вантажити лише у форматі PNG",
    ],
    answer: 0,
    explanation:
      "Оптимізатор зображень працює на вашому сервері, і без обмежень його можна було б використовувати як проксі для будь-яких URL. Тому дозволені джерела перелічують у `remotePatterns` (протокол, хост, шлях).",
    sources: ["next-image", "next-images"],
  },
  {
    question: "Що робить `next/font`?",
    options: [
      "Завантажує шрифт під час збирання й роздає його з вашого домену",
      "Підключає Google Fonts через `<link>` за кожного запиту сторінки",
      "Конвертує шрифти в SVG-спрайт для пришвидшення відмальовування тексту",
    ],
    answer: 0,
    explanation:
      "Шрифти (Google або локальні) завантажуються на етапі збирання й роздаються разом зі статикою: браузер не звертається до Google, що краще для приватності й швидкості. Next.js також налаштовує запасний шрифт із підібраними метриками, щоб зменшити CLS.",
    sources: ["next-fonts", "next-font"],
  },
  {
    question: "Звідки імпортувати `useRouter` в App Router?",
    options: ["`next/navigation`", "`next/router`", "`react-router-dom`"],
    answer: 0,
    explanation:
      "В App Router навігаційні хуки — `useRouter`, `usePathname`, `useSearchParams`, `useParams` — імпортуються з `next/navigation` і працюють у клієнтських компонентах. `next/router` — API Pages Router. Для серверного перенаправлення використовують `redirect()`.",
    sources: ["next-useRouter"],
  },
  {
    question: "Як у клієнтському компоненті отримати поточний шлях, наприклад, щоб підсвітити активне посилання?",
    options: ["`usePathname()`", "`window.location.pathname` під час рендеру", "`useRouter().pathname`"],
    answer: 0,
    explanation:
      "`usePathname()` повертає шлях і оновлюється під час клієнтської навігації. Читання `window` під час рендеру ламає SSR і гідратацію. Властивість `pathname` у `useRouter` була в Pages Router, у `next/navigation` її немає.",
    sources: ["next-usePathname"],
  },
  {
    question: "Чим SSR відрізняється від SSG?",
    options: [
      "SSR — HTML на кожен запит, SSG — заздалегідь під час збирання",
      "SSR рендерить у браузері користувача, а SSG — на сервері",
      "SSG потребує підключення до бази даних, а SSR працює без неї",
    ],
    answer: 0,
    explanation:
      "Static Site Generation (prerendering) створює HTML під час збирання й роздає його з CDN — швидко й дешево, але дані «заморожуються». Server-Side Rendering формує HTML за кожного запиту — дані свіжі й персональні, але вищі навантаження й TTFB. Рендер у браузері — це CSR.",
    sources: ["vercel-ssr-ssg", "next-glossary"],
  },
  {
    question: "Що таке ISR (Incremental Static Regeneration)?",
    options: [
      "Фонове оновлення статичних сторінок без повного перезбирання",
      "Поступове завантаження JS-бандла в міру прокручування сторінки вниз",
      "Рендер сторінки частинами в браузері після завантаження JS",
    ],
    answer: 0,
    explanation:
      "Користувачі отримують закешовану статичну сторінку, а після спливання терміну (або виклику `revalidatePath`/`revalidateTag`) Next.js перегенерує її у фоні й оновить кеш. Це компроміс між швидкістю SSG і актуальністю SSR.",
    sources: ["next-isr", "next-revalidating"],
  },
  {
    question: "Коли виконується `getServerSideProps` у Pages Router?",
    options: [
      "На сервері за кожного запиту",
      "Один раз під час збирання",
      "У браузері під час гідратації",
    ],
    answer: 0,
    explanation:
      "`getServerSideProps` — SSR у Pages Router: функція отримує контекст запиту (cookies, query) і повертає props. Під час збирання виконується `getStaticProps`. В App Router обидва API замінені асинхронними серверними компонентами.",
    sources: ["next-pages-gssp", "next-pages-gsp"],
  },
  {
    question: "Що робить `getStaticPaths` у Pages Router?",
    options: [
      "Повертає шляхи динамічного маршруту для збирання",
      "Повертає всі статичні файли з папки `public`",
      "Задає редиректи й перезаписи для статичних сторінок",
    ],
    answer: 0,
    explanation:
      "Для сторінки `pages/posts/[id].tsx` з `getStaticProps` треба знати, які `id` зібрати заздалегідь. Опція `fallback` визначає поведінку для решти шляхів. В App Router аналог — `generateStaticParams`.",
    sources: ["next-pages-gsps", "next-generateStaticParams"],
  },
  {
    question: "Що робить папка в круглих дужках, наприклад `app/(marketing)/about/page.tsx`?",
    options: [
      "Групує маршрути без впливу на URL — сторінка доступна за `/about`",
      "Робить маршрут необов'язковим: доступні `/marketing/about` і `/about`",
      "Приховує маршрут із продакшен-збірки",
    ],
    answer: 0,
    explanation:
      "Route groups упорядковують код і дають змогу надати групі власний layout (наприклад, окремий для маркетингу й для особистого кабінету), не змінюючи адрес. Можна навіть мати кілька кореневих layout у різних групах.",
    sources: ["next-route-groups"],
  },
  {
    question: "Навіщо папці назва з підкресленням, наприклад `app/_components`?",
    options: [
      "Це приватна папка: вона й вкладені файли виключаються з маршрутизації",
      "Підкреслення робить компоненти в папці клієнтськими",
      "Так Next.js розуміє, що файли треба мініфікувати сильніше",
    ],
    answer: 0,
    explanation:
      "Приватні папки явно відокремлюють допоміжний код від маршрутів. Строго кажучи, файли без `page`/`route` і так не публічні, але `_` захищає від випадкового створення маршруту й робить структуру зрозумілішою.",
    sources: ["next-project-structure"],
  },
  {
    question: "Який маршрут спіймає `/docs/a/b/c`?",
    options: [
      "`app/docs/[...slug]/page.tsx`",
      "`app/docs/[slug]/page.tsx`",
      "`app/docs/*/page.tsx`",
    ],
    answer: 0,
    explanation:
      "Catch-all сегмент `[...slug]` збирає всі наступні сегменти в масив. Звичайний `[slug]` збігається рівно з одним сегментом. Optional catch-all `[[...slug]]` додатково збігається й із самим `/docs`. Зірочок у назвах папок Next.js не підтримує.",
    sources: ["next-dynamic-routes"],
  },
  {
    question: "Що роблять команди `next build` і `next start`?",
    options: [
      "`build` збирає продакшен-версію, `start` її запускає",
      "`build` запускає dev-сервер, а `start` — тести проєкту",
      "Це синоніми: `start` — застаріла назва `build`",
    ],
    answer: 0,
    explanation:
      "`next dev` — сервер розробки зі швидким оновленням. `next build` компілює застосунок, пререндерить статичні маршрути й виводить звіт. `next start` запускає продакшен-сервер на результаті збирання. Для статичного сайту є `output: 'export'`.",
    sources: ["next-docs", "next-self-hosting"],
  },
  {
    question: "Який бандлер Next.js 16 використовує за замовчуванням для `next dev` і `next build`?",
    options: ["Turbopack, без додаткових прапорців", "Webpack, як і в попередніх версіях", "Vite, після переходу з Webpack"],
    answer: 0,
    explanation:
      "З Next.js 16 Turbopack стабільний і використовується за замовчуванням в обох режимах — прапорець `--turbopack` більше не потрібен. Повернутися до Webpack можна прапорцем `--webpack`. Якщо в проєкті є кастомний `webpack`-конфіг, `next build` без прапорця завершиться помилкою, щоб не проігнорувати його мовчки.",
    sources: ["next-upgrade-16", "next-turbopack"],
  },
  {
    question: "Як у Next.js 16 називається файл, що раніше називався `middleware.ts`?",
    options: ["`proxy.ts`", "`interceptor.ts`", "`gateway.ts`"],
    answer: 0,
    explanation:
      "Домовленість `middleware` оголошено застарілою й перейменовано на `proxy`, щоб підкреслити її роль на мережевій межі (редиректи, перезаписи, заголовки). Експортована функція теж називається `proxy`. Proxy виконується в рантаймі Node.js; edge-рантайм у ньому не підтримується.",
    sources: ["next-proxy", "next-upgrade-16"],
  },
  {
    question: "Як перенаправити користувача на `/login` із серверного компонента?",
    options: [
      "Викликати `redirect('/login')` з `next/navigation`",
      "Викликати `router.push('/login')` з `useRouter`",
      "Повернути `<Navigate to=\"/login\" />` з компонента",
    ],
    answer: 0,
    explanation:
      "`redirect()` працює в серверних компонентах, Server Functions і Route Handlers. Він кидає спеціальний виняток, тому код після нього не виконується, а обгортати його в `try/catch` не можна. `useRouter` доступний лише в клієнтських компонентах, а `<Navigate>` — з React Router.",
    sources: ["next-redirect"],
  },
  {
    question: "Як отримати query-параметр `?page=2` у серверній сторінці?",
    options: [
      "З prop `searchParams`: `const { page } = await searchParams`",
      "Через `useSearchParams()` просто в серверній сторінці",
      "Через `params.page` — query потрапляє в `params`",
    ],
    answer: 0,
    explanation:
      "Сторінка отримує `searchParams` як проміс. Читання query робить сторінку динамічною, бо значення відомі лише під час запиту. У клієнтських компонентах використовують `useSearchParams()`. `params` містить лише динамічні сегменти шляху.",
    sources: ["next-page-file", "next-useSearchParams"],
  },
  {
    question: "Як завантажити дані в серверному компоненті?",
    options: [
      "Зробити компонент `async` і викликати `await fetch()` або запит до БД",
      "Лише через `useEffect` і `useState`, як у клієнтському React",
      "Лише через Route Handler і запит до нього з клієнта",
    ],
    answer: 0,
    explanation:
      "Серверні компоненти можуть бути асинхронними й звертатися до даних напряму — до API, ORM, файлової системи, — не надсилаючи секрети в браузер. Ходити із серверного компонента у власний Route Handler — зайве мережеве коло. Хуки в серверних компонентах недоступні.",
    sources: ["next-fetching", "next-server-client"],
  },
  {
    question: "Де підключати глобальний CSS в App Router?",
    options: [
      "У кореневому `app/layout.tsx` через `import`",
      "У кожному `page.tsx` окремо, через `import`",
      "Лише через тег `<link>` у `public/index.html`",
    ],
    answer: 0,
    explanation:
      "Глобальні стилі імпортуються в кореневому layout і застосовуються до всіх маршрутів. Для стилів компонентів використовують CSS Modules (`*.module.css`), Tailwind або CSS-in-JS з підтримкою RSC. Файлу `index.html` у Next.js немає.",
    sources: ["next-css"],
  },
  {
    question: "Де з'явиться `console.log` із серверного компонента?",
    options: [
      "У терміналі, де запущено сервер Next.js",
      "У консолі браузера користувача",
      "Ніде: логи в серверних компонентах вимкнено",
    ],
    answer: 0,
    explanation:
      "Серверний компонент виконується на сервері (або під час збирання), тому його логи пишуться у виведення процесу Node.js. У режимі розробки Next.js може дублювати серверні логи в браузер для зручності, але код однаково виконується на сервері.",
    sources: ["next-server-client"],
  },
  {
    question: "Що треба передати в `<Image>` для картинки, що розтягується на весь батьківський блок?",
    options: [
      "Prop `fill`, а батькові — `position: relative`",
      "`width=\"100%\"` і `height=\"100%\"` рядками",
      "Нічого: `<Image>` за замовчуванням заповнює батька",
    ],
    answer: 0,
    explanation:
      "Якщо розміри заздалегідь невідомі, використовують `fill`: картинка позиціонується абсолютно й заповнює батька, який має бути `relative`, `absolute` або `fixed`. `sizes` підказує, якої ширини буде зображення, щоб браузер не завантажував завеликий файл. Вписування задається через `object-fit`.",
    sources: ["next-image"],
  },
  {
    question: "Як ліниво завантажити важкий клієнтський компонент у Next.js?",
    options: [
      "Через `next/dynamic` (або `React.lazy` + `Suspense`)",
      "Через атрибут `lazy` у компонента в JSX",
      "Через `import` усередині `useEffect` зі збереженням у state",
    ],
    answer: 0,
    explanation:
      "`const Chart = dynamic(() => import('./Chart'))` виносить код в окремий чанк і дає змогу задати `loading`. Опція `ssr: false` вимикає рендер на сервері, але її можна використовувати лише в клієнтських компонентах. Серверні компоненти й так не потрапляють у бандл.",
    sources: ["next-lazy-loading"],
  },
  {
    question: "Навіщо підключати сторонні скрипти через `next/script`?",
    options: [
      "Можна вибрати стратегію завантаження (`afterInteractive`, `lazyOnload` та ін.)",
      "Лише так скрипти працюватимуть у продакшен-збірці",
      "`next/script` автоматично переписує скрипт на TypeScript",
    ],
    answer: 0,
    explanation:
      "Компонент `<Script>` дає змогу не блокувати завантаження сторінки аналітикою й віджетами: `beforeInteractive` для критичного, `afterInteractive` (за замовчуванням) і `lazyOnload` для другорядного. Скрипт завантажується один раз навіть під час навігації між сторінками.",
    sources: ["next-script"],
  },
  {
    question: "Як зібрати Next.js-застосунок у набір статичних файлів без Node.js-сервера?",
    options: [
      "Вказати `output: 'export'` у `next.config`",
      "Запустити `next start --static`",
      "Видалити папку `app` і лишити тільки `public`",
    ],
    answer: 0,
    explanation:
      "Static export кладе HTML, CSS і JS у папку `out`, яку можна розмістити на будь-якому статичному хостингу. Обмеження: не працюють функції, що потребують сервера, — `cookies()`, Route Handlers із динамікою, ISR, оптимізація зображень за замовчуванням, Server Functions.",
    sources: ["next-static-exports"],
  },
  {
    question: "Що станеться, якщо в `app/dashboard/` лежать і `page.tsx`, і `route.ts`?",
    options: [
      "Помилка збирання: ці файли конфліктують за один URL",
      "GET-запити підуть у `route.ts`, а решта — у `page.tsx`",
      "Сторінка відрендериться, а `route.ts` буде проігноровано",
    ],
    answer: 0,
    explanation:
      "Обидва файли претендують на той самий URL, і Next.js повідомить про конфлікт. API-маршрути зазвичай виносять в окрему гілку, наприклад `app/api/...`.",
    sources: ["next-route-handlers"],
  },
  {
    question: "Чим `template.tsx` відрізняється від `layout.tsx`?",
    options: [
      "Template перемонтовується за кожної навігації, layout зберігається",
      "Template рендериться лише на сервері, layout — лише на клієнті",
      "Template використовується лише для email-шаблонів",
    ],
    answer: 0,
    explanation:
      "Template обгортає сторінки як layout, але отримує унікальний ключ на кожен перехід: стан скидається, ефекти запускаються знову. Це потрібно, наприклад, для анімацій входу або логування переглядів. У більшості випадків досить layout.",
    sources: ["next-template"],
  },
  {
    question: "Чи можна використовувати хуки `useState` і `useEffect` у серверному компоненті?",
    options: [
      "Ні: серверні компоненти не мають state і ефектів",
      "Так, але лише `useState`, а `useEffect` — ні",
      "Так, якщо компонент оголошено як `async`-функцію",
    ],
    answer: 0,
    explanation:
      "Серверний компонент виконується один раз, щоб отримати результат, і більше не «живе». Стан, ефекти й обробники подій — клієнтські можливості. Серверний компонент може відрендерити клієнтський і передати йому дані через props.",
    sources: ["next-server-client", "react-server-components"],
  },
  {
    question: "Коли `<Link>` попередньо завантажує маршрут?",
    options: [
      "Коли посилання потрапляє у viewport (у продакшені)",
      "Лише після кліку по посиланню, як під час звичайного переходу",
      "Одразу під час завантаження застосунку — усі маршрути сайту",
    ],
    answer: 0,
    explanation:
      "Попереднє завантаження робить переходи миттєвими. У dev-режимі воно вимкнене, тому швидкість навігації перевіряють на продакшен-збірці. Поведінка налаштовується prop `prefetch` (`false`, `true`, `'auto'`). У Next.js 16 завантаження стало інкрементальним: спільні layout завантажуються один раз.",
    sources: ["next-link", "next-prefetching"],
  },
  {
    question: "Чи збережеться стан у sidebar усередині спільного layout під час переходу між сторінками?",
    options: [
      "Так: спільний layout не перемонтовується під час навігації",
      "Ні: кожна навігація перемонтовує все дерево повністю",
      "Лише якщо sidebar обгорнуто в `React.memo` або `useMemo`",
    ],
    answer: 0,
    explanation:
      "Next.js рендерить лише змінені сегменти, а спільні layout лишаються змонтованими: введений текст, відкриті меню й положення скролу зберігаються. Якщо потрібне скидання під час навігації — використовуйте `template.tsx` або `key`.",
    sources: ["next-linking", "next-layouts-pages"],
  },
  {
    question: "Як типізувати props сторінки `app/blog/[slug]/page.tsx` у Next.js 16?",
    options: [
      "Глобальним хелпером `PageProps<'/blog/[slug]'>`",
      "Через `NextPage<{ slug: string }>` з `next`",
      "Типізація props сторінки неможлива",
    ],
    answer: 0,
    explanation:
      "Next.js генерує типи маршрутів (під час `next dev`, `next build` або `next typegen`), і хелпери `PageProps`, `LayoutProps` і `RouteContext` знають структуру `params` для кожного шляху. `NextPage` — тип із Pages Router.",
    sources: ["next-page-file", "next-typescript"],
  },
  {
    question: "Яка мінімальна версія Node.js потрібна для Next.js 16?",
    options: ["20.9", "16.0", "18.0"],
    answer: 0,
    explanation:
      "Next.js 16 потребує Node.js 20.9+ (LTS); підтримку Node.js 18 припинено. Також зросли вимоги до TypeScript (5.1+) і браузерів (Chrome/Edge/Firefox 111+, Safari 16.4+).",
    sources: ["next-upgrade-16"],
  },
  {
    question: "Чи можна використовувати CSS Modules у Next.js без додаткового налаштування?",
    options: [
      "Так: файли `*.module.css` підтримуються з коробки",
      "Ні: треба встановити й налаштувати `css-loader`",
      "Лише в Pages Router, App Router їх не підтримує",
    ],
    answer: 0,
    explanation:
      "`import styles from './Button.module.css'` і `className={styles.primary}` — імена класів стають локальними. Підтримуються й Sass (після встановлення пакета `sass`), Tailwind і глобальний CSS.",
    sources: ["next-css"],
  },
  {
    question: "Що виведе сторінка за `export const metadata = { title: 'Профіль' }` у page і `title: { template: '%s | Shop', default: 'Shop' }` у layout?",
    options: ["`Профіль | Shop`", "`Shop | Профіль`", "`Профіль` без шаблону"],
    answer: 0,
    explanation:
      "`title.template` з layout застосовується до заголовків дочірніх сегментів: `%s` замінюється на `title` сторінки. `default` використовується, якщо дочірній сегмент заголовка не задав. Це позбавляє дублювання назви сайту на кожній сторінці.",
    sources: ["next-metadata", "next-generateMetadata"],
  },
];

export default questions;
