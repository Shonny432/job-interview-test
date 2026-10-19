import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Что такое colocation в App Router?",
    options: [
      "Хранение компонентов и утилит рядом с маршрутами внутри `app/`",
      "Размещение сервера и базы данных в одном дата-центре",
      "Объединение нескольких страниц в один JS-бандл",
    ],
    answer: 0,
    explanation:
      "Файлы в `app/` становятся публичными только через `page` или `route`. Поэтому рядом с `page.tsx` безопасно хранить компоненты, хуки, стили и тесты конкретного маршрута. Для явности используют приватные папки `_components` или держат общий код в `src/` вне `app`.",
    sources: ["next-project-structure"],
  },
  {
    question: "Что такое Next.js?",
    options: [
      "React-фреймворк с маршрутизацией, серверным рендерингом и оптимизациями",
      "Альтернатива React со своим синтаксисом компонентов и шаблонов",
      "Серверный фреймворк на Node.js для REST API без поддержки UI",
    ],
    answer: 0,
    explanation:
      "Next.js построен на React и добавляет то, чего нет в библиотеке: файловую маршрутизацию, серверный и статический рендеринг, Server Components и Server Functions, оптимизацию изображений и шрифтов, сборку и деплой. Компоненты пишутся на обычном React.",
    sources: ["next-docs", "next-learn"],
  },
  {
    question: "Как в App Router создать страницу по адресу `/about`?",
    options: [
      "Создать файл `app/about/page.tsx` с default-экспортом компонента",
      "Создать файл `app/about.tsx` с именованным экспортом `Page`",
      "Добавить маршрут `/about` в `next.config.ts` в раздел `routes`",
    ],
    answer: 0,
    explanation:
      "Маршрут задаётся папкой, а публичной страницей её делает файл `page.tsx` (или `.js`). Без `page` папка не доступна по URL — в ней можно хранить компоненты (colocation). Конфигурации маршрутов в `next.config` нет. Файл `pages/about.tsx` — это соглашение старого Pages Router.",
    sources: ["next-layouts-pages", "next-project-structure"],
  },
  {
    question: "Чем `layout.tsx` отличается от `page.tsx`?",
    options: [
      "Layout оборачивает страницы и сохраняет состояние при навигации",
      "Layout рендерится только на сервере, а page — только в браузере",
      "Layout нужен только для метаданных, разметку в нём писать нельзя",
    ],
    answer: 0,
    explanation:
      "Layout получает `children` и общий для вложенных маршрутов UI (шапка, сайдбар). При переходе между дочерними страницами layout не перемонтируется: его состояние и DOM сохраняются, рендерится только изменившаяся часть. И layout, и page по умолчанию — Server Components.",
    sources: ["next-layouts-pages", "next-layout-file"],
  },
  {
    question: "Что обязательно должно быть в корневом `app/layout.tsx`?",
    options: [
      "Теги `<html>` и `<body>`",
      "Компонент `<Head>` из `next/head`",
      "Провайдер `<NextProvider>` вокруг `children`",
    ],
    answer: 0,
    explanation:
      "Корневой layout заменяет `_app` и `_document` из Pages Router и должен сам рендерить `<html>` и `<body>`. Метаданные задаются через экспорт `metadata` или `generateMetadata`, а не через `next/head`. Обязательного провайдера в Next.js нет.",
    sources: ["next-layout-file", "next-layouts-pages"],
  },
  {
    question: "Как создать динамический маршрут `/blog/:slug`?",
    options: [
      "Папка `app/blog/[slug]/page.tsx`",
      "Папка `app/blog/:slug/page.tsx`",
      "Папка `app/blog/{slug}/page.tsx`",
    ],
    answer: 0,
    explanation:
      "Динамический сегмент — имя папки в квадратных скобках. Значение приходит в `params`. `[...slug]` ловит несколько сегментов, `[[...slug]]` — то же, но включая маршрут без сегментов. Двоеточие и фигурные скобки — синтаксис других роутеров.",
    sources: ["next-dynamic-routes"],
  },
  {
    question: "Как правильно прочитать `params` в странице Next.js 16?",
    options: [
      "`const { slug } = await params` — это Promise",
      "`const { slug } = params` — это обычный объект",
      "`const slug = useParams().slug` в серверной странице",
    ],
    answer: 0,
    explanation:
      "С Next.js 15 `params` и `searchParams` — промисы, а в Next.js 16 синхронный доступ удалён окончательно. В серверном компоненте их ожидают через `await`, в клиентской странице — через `use(params)`. Хук `useParams` работает только в клиентских компонентах.",
    sources: ["next-dynamic-routes", "next-upgrade-16"],
  },
  {
    question: "Чем `<Link>` из `next/link` лучше обычного `<a href>` для внутренних переходов?",
    options: [
      "Переход без перезагрузки страницы и предзагрузка маршрутов",
      "Ссылки `<Link>` индексируются поисковиками, а обычные `<a>` — нет",
      "`<Link>` по умолчанию открывает страницы в новой вкладке браузера",
    ],
    answer: 0,
    explanation:
      "`<Link>` рендерит обычный `<a>` (поэтому SEO не страдает), но перехватывает клик и выполняет SPA-переход: общие layout сохраняются, загружается только нужное. Ссылки в viewport предзагружаются в продакшене. Для внешних адресов используют обычный `<a>`.",
    sources: ["next-link", "next-linking"],
  },
  {
    question: "Какими компонентами по умолчанию являются файлы в папке `app/`?",
    options: [
      "Server Components",
      "Client Components",
      "Зависит от настроек `next.config`",
    ],
    answer: 0,
    explanation:
      "В App Router всё по умолчанию — Server Components: код выполняется на сервере и не попадает в клиентский бандл. Чтобы использовать состояние, эффекты, обработчики событий или браузерные API, нужен `'use client'` в начале файла.",
    sources: ["next-server-client", "react-server-components"],
  },
  {
    question: "Компонент использует `useState` и `onClick`, но падает с ошибкой. Чего не хватает?",
    options: [
      "Директивы `'use client'` в начале файла",
      "Обёртки `<Suspense>` вокруг компонента",
      "Экспорта `export const dynamic = 'force-dynamic'`",
    ],
    answer: 0,
    explanation:
      "Хуки состояния и обработчики событий работают только в клиентских компонентах. `'use client'` объявляет границу клиентской части. Лучшая практика — выносить интерактивность в маленькие клиентские компоненты, оставляя страницу серверной.",
    sources: ["next-use-client", "next-server-client"],
  },
  {
    question: "Для чего нужен файл `loading.tsx`?",
    options: [
      "Мгновенный fallback сегмента: Next.js оборачивает page в `<Suspense>`",
      "Задаёт индикатор загрузки для всех `fetch`-запросов в браузере",
      "Показывается только при первом открытии сайта, как splash-экран",
    ],
    answer: 0,
    explanation:
      "Next.js автоматически оборачивает `page` (и вложенные сегменты) в `<Suspense fallback={<Loading />}>`. Пользователь сразу видит layout и скелетон, а содержимое стримится по готовности. Для более точечного контроля можно ставить свои `<Suspense>` внутри страницы.",
    sources: ["next-loading", "next-streaming"],
  },
  {
    question: "Почему `error.tsx` должен быть клиентским компонентом?",
    options: [
      "Это React error boundary, а он работает только на клиенте",
      "Серверные компоненты не умеют рендерить текст ошибки и стек",
      "Это требование действует только в режиме разработки",
    ],
    answer: 0,
    explanation:
      "`error.tsx` оборачивает сегмент в error boundary — это клиентский механизм. Компонент получает `error` и функцию `retry()`, которая заново загружает и рендерит сегмент (есть и `reset()` — повторный рендер без перезагрузки данных). Ошибки корневого layout ловит `global-error.tsx`.",
    sources: ["next-error-file", "next-error-handling"],
  },
  {
    question: "Как показать страницу 404 для несуществующего товара в серверной странице?",
    options: [
      "Вызвать `notFound()` из `next/navigation`",
      "Вернуть `{ status: 404 }` из компонента страницы",
      "Выбросить `new Error('404')` — Next.js сам поймёт",
    ],
    answer: 0,
    explanation:
      "`notFound()` прерывает рендер и показывает ближайший `not-found.tsx` (или стандартную 404), а также выставляет соответствующий статус. Компонент не может вернуть HTTP-статус, а обычная ошибка попадёт в `error.tsx`.",
    sources: ["next-notFound", "next-not-found"],
  },
  {
    question: "Как задать заголовок и описание страницы в App Router?",
    options: [
      "Экспортировать `metadata` или `generateMetadata` из page/layout",
      "Использовать компонент `<Head>` из `next/head` внутри страницы",
      "Прописать `<title>` в `next.config.ts` для каждого маршрута",
    ],
    answer: 0,
    explanation:
      "Metadata API работает в серверных компонентах: `export const metadata = { title, description }`, а для динамики — `export async function generateMetadata({ params })`. Значения из layout и page объединяются. `next/head` — API Pages Router.",
    sources: ["next-metadata", "next-generateMetadata"],
  },
  {
    question: "По какому адресу доступен файл `public/logo.png`?",
    options: ["`/logo.png`", "`/public/logo.png`", "`/_next/static/logo.png`"],
    answer: 0,
    explanation:
      "Содержимое `public` отдаётся от корня сайта. Туда кладут favicon, robots.txt, статические картинки. Файлы не проходят через сборку и не получают хэш в имени, поэтому их кэширование нужно настраивать отдельно. `/_next/static` — путь для ассетов, созданных сборкой.",
    sources: ["next-project-structure"],
  },
  {
    question: "Как в App Router создать API-эндпоинт `GET /api/users`?",
    options: [
      "Файл `app/api/users/route.ts` с экспортом функции `GET`",
      "Файл `app/api/users/page.tsx` с default-экспортом",
      "Файл `api/users.ts` в корне проекта с `export default handler`",
    ],
    answer: 0,
    explanation:
      "Route Handlers используют Web API `Request`/`Response`: `export async function GET(request: Request) { return Response.json(users) }`. Поддерживаются `POST`, `PUT`, `PATCH`, `DELETE` и др. В одной папке не может быть одновременно `route.ts` и `page.tsx`.",
    sources: ["next-route-handlers"],
  },
  {
    question: "Какие переменные окружения доступны в браузерном коде?",
    options: [
      "Только с префиксом `NEXT_PUBLIC_`, встраиваемые при сборке",
      "Все переменные из `.env`, если файл лежит в корне проекта",
      "Никакие: переменные окружения в браузере недоступны вообще",
    ],
    answer: 0,
    explanation:
      "Next.js подставляет `process.env.NEXT_PUBLIC_*` в клиентский код на этапе сборки, поэтому смена значения требует пересборки. Остальные переменные доступны только на сервере — так секреты (ключи API, пароли БД) не утекут в браузер.",
    sources: ["next-env"],
  },
  {
    question: "Что даёт компонент `<Image>` из `next/image`?",
    options: [
      "Подбор размера и формата, ленивую загрузку, защиту от CLS",
      "Только более короткий синтаксис для обычного тега `<img>`",
      "Загрузку изображений через WebSocket для ускорения отрисовки",
    ],
    answer: 0,
    explanation:
      "`next/image` генерирует `srcset`, отдаёт современные форматы (WebP/AVIF), по умолчанию грузит лениво и резервирует место благодаря `width`/`height` (или `fill`), предотвращая сдвиги макета. Для LCP-картинки используют `preload` (раньше — `priority`).",
    sources: ["next-images", "next-image"],
  },
  {
    question: "Почему `<Image src=\"https://cdn.example.com/a.jpg\" ... />` выдаёт ошибку конфигурации?",
    options: [
      "Внешние домены нужно разрешить в `images.remotePatterns` в `next.config`",
      "`next/image` вообще не поддерживает изображения с других доменов",
      "Внешние картинки можно грузить только в формате PNG",
    ],
    answer: 0,
    explanation:
      "Оптимизатор изображений работает на вашем сервере, и без ограничений его можно было бы использовать как прокси для любых URL. Поэтому разрешённые источники перечисляют в `remotePatterns` (протокол, хост, путь).",
    sources: ["next-image", "next-images"],
  },
  {
    question: "Что делает `next/font`?",
    options: [
      "Скачивает шрифт при сборке и раздаёт его с вашего домена",
      "Подключает Google Fonts через `<link>` при каждом запросе страницы",
      "Конвертирует шрифты в SVG-спрайт для ускорения отрисовки текста",
    ],
    answer: 0,
    explanation:
      "Шрифты (Google или локальные) загружаются на этапе сборки и раздаются вместе со статикой: браузер не ходит к Google, что лучше для приватности и скорости. Next.js также настраивает запасной шрифт с подобранными метриками, чтобы уменьшить CLS.",
    sources: ["next-fonts", "next-font"],
  },
  {
    question: "Откуда импортировать `useRouter` в App Router?",
    options: ["`next/navigation`", "`next/router`", "`react-router-dom`"],
    answer: 0,
    explanation:
      "В App Router навигационные хуки — `useRouter`, `usePathname`, `useSearchParams`, `useParams` — импортируются из `next/navigation` и работают в клиентских компонентах. `next/router` — API Pages Router. Для серверного перенаправления используют `redirect()`.",
    sources: ["next-useRouter"],
  },
  {
    question: "Как в клиентском компоненте получить текущий путь, например, чтобы подсветить активную ссылку?",
    options: ["`usePathname()`", "`window.location.pathname` при рендере", "`useRouter().pathname`"],
    answer: 0,
    explanation:
      "`usePathname()` возвращает путь и обновляется при клиентской навигации. Чтение `window` при рендере ломает SSR и гидратацию. Свойство `pathname` у `useRouter` было в Pages Router, в `next/navigation` его нет.",
    sources: ["next-usePathname"],
  },
  {
    question: "Чем SSR отличается от SSG?",
    options: [
      "SSR — HTML на каждый запрос, SSG — заранее при сборке",
      "SSR рендерит в браузере пользователя, а SSG — на сервере",
      "SSG требует подключения к базе данных, а SSR работает без неё",
    ],
    answer: 0,
    explanation:
      "Static Site Generation (prerendering) создаёт HTML при сборке и раздаёт его с CDN — быстро и дёшево, но данные «замораживаются». Server-Side Rendering формирует HTML при каждом запросе — данные свежие и персональные, но выше нагрузка и TTFB. Рендер в браузере — это CSR.",
    sources: ["vercel-ssr-ssg", "next-glossary"],
  },
  {
    question: "Что такое ISR (Incremental Static Regeneration)?",
    options: [
      "Фоновое обновление статических страниц без полной пересборки",
      "Постепенная загрузка JS-бандла по мере прокрутки страницы вниз",
      "Рендер страницы по частям в браузере после загрузки JS",
    ],
    answer: 0,
    explanation:
      "Пользователи получают закэшированную статическую страницу, а после истечения срока (или вызова `revalidatePath`/`revalidateTag`) Next.js перегенерирует её в фоне и обновит кэш. Это компромисс между скоростью SSG и актуальностью SSR.",
    sources: ["next-isr", "next-revalidating"],
  },
  {
    question: "Когда выполняется `getServerSideProps` в Pages Router?",
    options: [
      "На сервере при каждом запросе",
      "Один раз при сборке",
      "В браузере при гидратации",
    ],
    answer: 0,
    explanation:
      "`getServerSideProps` — SSR в Pages Router: функция получает контекст запроса (cookies, query) и возвращает props. При сборке выполняется `getStaticProps`. В App Router оба API заменены асинхронными серверными компонентами.",
    sources: ["next-pages-gssp", "next-pages-gsp"],
  },
  {
    question: "Что делает `getStaticPaths` в Pages Router?",
    options: [
      "Возвращает пути динамического маршрута для сборки",
      "Возвращает все статические файлы из папки `public`",
      "Задаёт редиректы и перезаписи для статических страниц",
    ],
    answer: 0,
    explanation:
      "Для страницы `pages/posts/[id].tsx` с `getStaticProps` нужно знать, какие `id` собрать заранее. Опция `fallback` определяет поведение для остальных путей. В App Router аналог — `generateStaticParams`.",
    sources: ["next-pages-gsps", "next-generateStaticParams"],
  },
  {
    question: "Что делает папка в круглых скобках, например `app/(marketing)/about/page.tsx`?",
    options: [
      "Группирует маршруты без влияния на URL — страница доступна по `/about`",
      "Делает маршрут необязательным: доступны `/marketing/about` и `/about`",
      "Скрывает маршрут из продакшен-сборки",
    ],
    answer: 0,
    explanation:
      "Route groups организуют код и позволяют дать группе свой layout (например, отдельный для маркетинга и для личного кабинета), не меняя адреса. Можно даже иметь несколько корневых layout в разных группах.",
    sources: ["next-route-groups"],
  },
  {
    question: "Зачем папке имя с подчёркиванием, например `app/_components`?",
    options: [
      "Это приватная папка: она и вложенные файлы исключаются из маршрутизации",
      "Подчёркивание делает компоненты в папке клиентскими",
      "Так Next.js понимает, что файлы нужно минифицировать сильнее",
    ],
    answer: 0,
    explanation:
      "Приватные папки явно отделяют вспомогательный код от маршрутов. Строго говоря, файлы без `page`/`route` и так не публичны, но `_` защищает от случайного создания маршрута и делает структуру понятнее.",
    sources: ["next-project-structure"],
  },
  {
    question: "Какой маршрут поймает `/docs/a/b/c`?",
    options: [
      "`app/docs/[...slug]/page.tsx`",
      "`app/docs/[slug]/page.tsx`",
      "`app/docs/*/page.tsx`",
    ],
    answer: 0,
    explanation:
      "Catch-all сегмент `[...slug]` собирает все последующие сегменты в массив. Обычный `[slug]` совпадает ровно с одним сегментом. Optional catch-all `[[...slug]]` вдобавок совпадает и с самим `/docs`. Звёздочки в именах папок Next.js не поддерживает.",
    sources: ["next-dynamic-routes"],
  },
  {
    question: "Что делают команды `next build` и `next start`?",
    options: [
      "`build` собирает продакшен-версию, `start` её запускает",
      "`build` запускает dev-сервер, а `start` — тесты проекта",
      "Это синонимы: `start` — устаревшее название `build`",
    ],
    answer: 0,
    explanation:
      "`next dev` — сервер разработки с быстрым обновлением. `next build` компилирует приложение, пререндерит статические маршруты и выводит отчёт. `next start` запускает продакшен-сервер на результате сборки. Для статического сайта есть `output: 'export'`.",
    sources: ["next-docs", "next-self-hosting"],
  },
  {
    question: "Какой бандлер Next.js 16 использует по умолчанию для `next dev` и `next build`?",
    options: ["Turbopack, без дополнительных флагов", "Webpack, как и в прежних версиях", "Vite, после перехода с Webpack"],
    answer: 0,
    explanation:
      "С Next.js 16 Turbopack стабилен и используется по умолчанию в обоих режимах — флаг `--turbopack` больше не нужен. Вернуться к Webpack можно флагом `--webpack`. Если в проекте есть кастомный `webpack`-конфиг, `next build` без флага завершится ошибкой, чтобы его не проигнорировать молча.",
    sources: ["next-upgrade-16", "next-turbopack"],
  },
  {
    question: "Как в Next.js 16 называется файл, который раньше назывался `middleware.ts`?",
    options: ["`proxy.ts`", "`interceptor.ts`", "`gateway.ts`"],
    answer: 0,
    explanation:
      "Соглашение `middleware` объявлено устаревшим и переименовано в `proxy`, чтобы подчеркнуть его роль на сетевой границе (редиректы, перезаписи, заголовки). Экспортируемая функция тоже называется `proxy`. Proxy выполняется в рантайме Node.js; edge-рантайм в нём не поддерживается.",
    sources: ["next-proxy", "next-upgrade-16"],
  },
  {
    question: "Как перенаправить пользователя на `/login` из серверного компонента?",
    options: [
      "Вызвать `redirect('/login')` из `next/navigation`",
      "Вызвать `router.push('/login')` из `useRouter`",
      "Вернуть `<Navigate to=\"/login\" />` из компонента",
    ],
    answer: 0,
    explanation:
      "`redirect()` работает в серверных компонентах, Server Functions и Route Handlers. Он выбрасывает специальное исключение, поэтому код после него не выполняется, а оборачивать его в `try/catch` нельзя. `useRouter` доступен только в клиентских компонентах, а `<Navigate>` — из React Router.",
    sources: ["next-redirect"],
  },
  {
    question: "Как получить query-параметр `?page=2` в серверной странице?",
    options: [
      "Из prop `searchParams`: `const { page } = await searchParams`",
      "Через `useSearchParams()` прямо в серверной странице",
      "Через `params.page` — query попадает в `params`",
    ],
    answer: 0,
    explanation:
      "Страница получает `searchParams` как промис. Чтение query делает страницу динамической, потому что значения известны только во время запроса. В клиентских компонентах используют `useSearchParams()`. `params` содержит только динамические сегменты пути.",
    sources: ["next-page-file", "next-useSearchParams"],
  },
  {
    question: "Как загрузить данные в серверном компоненте?",
    options: [
      "Сделать компонент `async` и вызвать `await fetch()` или запрос к БД",
      "Только через `useEffect` и `useState`, как в клиентском React",
      "Только через Route Handler и запрос к нему с клиента",
    ],
    answer: 0,
    explanation:
      "Серверные компоненты могут быть асинхронными и обращаться к данным напрямую — к API, ORM, файловой системе, — не отправляя секреты в браузер. Ходить из серверного компонента в собственный Route Handler — лишний сетевой круг. Хуки в серверных компонентах недоступны.",
    sources: ["next-fetching", "next-server-client"],
  },
  {
    question: "Где подключать глобальный CSS в App Router?",
    options: [
      "В корневом `app/layout.tsx` через `import`",
      "В каждом `page.tsx` отдельно, через `import`",
      "Только через тег `<link>` в `public/index.html`",
    ],
    answer: 0,
    explanation:
      "Глобальные стили импортируются в корневом layout и применяются ко всем маршрутам. Для стилей компонентов используют CSS Modules (`*.module.css`), Tailwind или CSS-in-JS с поддержкой RSC. Файла `index.html` в Next.js нет.",
    sources: ["next-css"],
  },
  {
    question: "Где появится `console.log` из серверного компонента?",
    options: [
      "В терминале, где запущен сервер Next.js",
      "В консоли браузера пользователя",
      "Нигде: логи в серверных компонентах отключены",
    ],
    answer: 0,
    explanation:
      "Серверный компонент выполняется на сервере (или при сборке), поэтому его логи пишутся в вывод процесса Node.js. В режиме разработки Next.js может дублировать серверные логи в браузер для удобства, но код всё равно выполняется на сервере.",
    sources: ["next-server-client"],
  },
  {
    question: "Что нужно передать в `<Image>` для картинки, растягивающейся на весь родительский блок?",
    options: [
      "Prop `fill`, а родителю — `position: relative`",
      "`width=\"100%\"` и `height=\"100%\"` строками",
      "Ничего: `<Image>` по умолчанию заполняет родителя",
    ],
    answer: 0,
    explanation:
      "Если размеры заранее неизвестны, используют `fill`: картинка позиционируется абсолютно и заполняет родителя, который должен быть `relative`, `absolute` или `fixed`. `sizes` подсказывает, какой ширины будет изображение, чтобы браузер не скачивал слишком большой файл. Вписывание задаётся через `object-fit`.",
    sources: ["next-image"],
  },
  {
    question: "Как лениво загрузить тяжёлый клиентский компонент в Next.js?",
    options: [
      "Через `next/dynamic` (или `React.lazy` + `Suspense`)",
      "Через атрибут `lazy` у компонента в JSX",
      "Через `import` внутри `useEffect` с сохранением в state",
    ],
    answer: 0,
    explanation:
      "`const Chart = dynamic(() => import('./Chart'))` выносит код в отдельный чанк и позволяет задать `loading`. Опция `ssr: false` отключает рендер на сервере, но её можно использовать только в клиентских компонентах. Серверные компоненты и так не попадают в бандл.",
    sources: ["next-lazy-loading"],
  },
  {
    question: "Зачем подключать сторонние скрипты через `next/script`?",
    options: [
      "Можно выбрать стратегию загрузки (`afterInteractive`, `lazyOnload` и др.)",
      "Только так скрипты будут работать в продакшен-сборке",
      "`next/script` автоматически переписывает скрипт на TypeScript",
    ],
    answer: 0,
    explanation:
      "Компонент `<Script>` позволяет не блокировать загрузку страницы аналитикой и виджетами: `beforeInteractive` для критичного, `afterInteractive` (по умолчанию) и `lazyOnload` для второстепенного. Скрипт загружается один раз даже при навигации между страницами.",
    sources: ["next-script"],
  },
  {
    question: "Как собрать Next.js-приложение в набор статических файлов без Node.js-сервера?",
    options: [
      "Указать `output: 'export'` в `next.config`",
      "Запустить `next start --static`",
      "Удалить папку `app` и оставить только `public`",
    ],
    answer: 0,
    explanation:
      "Static export кладёт HTML, CSS и JS в папку `out`, которую можно разместить на любом статическом хостинге. Ограничения: не работают функции, требующие сервера, — `cookies()`, Route Handlers с динамикой, ISR, оптимизация изображений по умолчанию, Server Functions.",
    sources: ["next-static-exports"],
  },
  {
    question: "Что произойдёт, если в `app/dashboard/` лежат и `page.tsx`, и `route.ts`?",
    options: [
      "Ошибка сборки: эти файлы конфликтуют за один URL",
      "GET-запросы пойдут в `route.ts`, а остальные — в `page.tsx`",
      "Страница отрендерится, а `route.ts` будет проигнорирован",
    ],
    answer: 0,
    explanation:
      "Оба файла претендуют на один и тот же URL, и Next.js сообщит о конфликте. API-маршруты обычно выносят в отдельную ветку, например `app/api/...`.",
    sources: ["next-route-handlers"],
  },
  {
    question: "Чем `template.tsx` отличается от `layout.tsx`?",
    options: [
      "Template перемонтируется при каждой навигации, layout сохраняется",
      "Template рендерится только на сервере, layout — только на клиенте",
      "Template используется только для email-шаблонов",
    ],
    answer: 0,
    explanation:
      "Template оборачивает страницы как layout, но получает уникальный ключ на каждый переход: состояние сбрасывается, эффекты запускаются заново. Это нужно, например, для анимаций входа или логирования просмотров. В большинстве случаев достаточно layout.",
    sources: ["next-template"],
  },
  {
    question: "Можно ли использовать хуки `useState` и `useEffect` в серверном компоненте?",
    options: [
      "Нет: у серверных компонентов нет state и эффектов",
      "Да, но только `useState`, а `useEffect` — нельзя",
      "Да, если компонент объявлен как `async`-функция",
    ],
    answer: 0,
    explanation:
      "Серверный компонент выполняется один раз, чтобы получить результат, и больше не «живёт». Состояние, эффекты и обработчики событий — клиентские возможности. Серверный компонент может отрендерить клиентский и передать ему данные через props.",
    sources: ["next-server-client", "react-server-components"],
  },
  {
    question: "Когда `<Link>` предзагружает маршрут?",
    options: [
      "Когда ссылка попадает в viewport (в продакшене)",
      "Только после клика по ссылке, как при обычном переходе",
      "Сразу при загрузке приложения — все маршруты сайта",
    ],
    answer: 0,
    explanation:
      "Предзагрузка делает переходы мгновенными. В dev-режиме она отключена, поэтому скорость навигации проверяют на продакшен-сборке. Поведение настраивается prop `prefetch` (`false`, `true`, `'auto'`). В Next.js 16 загрузка стала инкрементальной: общие layout скачиваются один раз.",
    sources: ["next-link", "next-prefetching"],
  },
  {
    question: "Сохранится ли состояние в sidebar внутри общего layout при переходе между страницами?",
    options: [
      "Да: общий layout не перемонтируется при навигации",
      "Нет: каждая навигация перемонтирует всё дерево целиком",
      "Только если sidebar обёрнут в `React.memo` или `useMemo`",
    ],
    answer: 0,
    explanation:
      "Next.js рендерит только изменившиеся сегменты, а общие layout остаются смонтированными: введённый текст, открытые меню и положение скролла сохраняются. Если нужно сброс при навигации — используйте `template.tsx` или `key`.",
    sources: ["next-linking", "next-layouts-pages"],
  },
  {
    question: "Как типизировать props страницы `app/blog/[slug]/page.tsx` в Next.js 16?",
    options: [
      "Глобальным хелпером `PageProps<'/blog/[slug]'>`",
      "Через `NextPage<{ slug: string }>` из `next`",
      "Типизация props страницы невозможна",
    ],
    answer: 0,
    explanation:
      "Next.js генерирует типы маршрутов (при `next dev`, `next build` или `next typegen`), и хелперы `PageProps`, `LayoutProps` и `RouteContext` знают структуру `params` для каждого пути. `NextPage` — тип из Pages Router.",
    sources: ["next-page-file", "next-typescript"],
  },
  {
    question: "Какая минимальная версия Node.js нужна для Next.js 16?",
    options: ["20.9", "16.0", "18.0"],
    answer: 0,
    explanation:
      "Next.js 16 требует Node.js 20.9+ (LTS); поддержка Node.js 18 прекращена. Также выросли требования к TypeScript (5.1+) и браузерам (Chrome/Edge/Firefox 111+, Safari 16.4+).",
    sources: ["next-upgrade-16"],
  },
  {
    question: "Можно ли использовать CSS Modules в Next.js без дополнительной настройки?",
    options: [
      "Да: файлы `*.module.css` поддерживаются из коробки",
      "Нет: нужно установить и настроить `css-loader`",
      "Только в Pages Router, App Router их не поддерживает",
    ],
    answer: 0,
    explanation:
      "`import styles from './Button.module.css'` и `className={styles.primary}` — имена классов становятся локальными. Поддерживаются и Sass (после установки пакета `sass`), Tailwind и глобальный CSS.",
    sources: ["next-css"],
  },
  {
    question: "Что выведет страница при `export const metadata = { title: 'Профиль' }` в page и `title: { template: '%s | Shop', default: 'Shop' }` в layout?",
    options: ["`Профиль | Shop`", "`Shop | Профиль`", "`Профиль` без шаблона"],
    answer: 0,
    explanation:
      "`title.template` из layout применяется к заголовкам дочерних сегментов: `%s` заменяется на `title` страницы. `default` используется, если дочерний сегмент заголовок не задал. Это избавляет от дублирования названия сайта на каждой странице.",
    sources: ["next-metadata", "next-generateMetadata"],
  },
];

export default questions;
