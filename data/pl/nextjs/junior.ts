import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Czym jest kolokacja (colocation) w App Router?",
    options: [
      "Trzymaniem komponentów i narzędzi obok tras wewnątrz `app/`",
      "Umieszczeniem serwera i bazy danych w tym samym centrum danych",
      "Łączeniem kilku stron w jedną paczkę JS",
    ],
    answer: 0,
    explanation:
      "Pliki w `app/` stają się publiczne tylko przez `page` lub `route`. Dlatego komponenty, hooki, style i testy trasy można bezpiecznie trzymać obok jej `page.tsx`. Dla przejrzystości używa się prywatnych folderów `_components` lub trzyma wspólny kod w `src/` poza `app`.",
    sources: ["next-project-structure"],
  },
  {
    question: "Czym jest Next.js?",
    options: [
      "Frameworkiem React z routingiem, renderowaniem serwerowym i optymalizacjami",
      "Alternatywą dla React z własną składnią komponentów i szablonów",
      "Serwerowym frameworkiem Node.js do REST API bez obsługi UI",
    ],
    answer: 0,
    explanation:
      "Next.js jest zbudowany na React i dodaje to, czego brakuje bibliotece: routing oparty na plikach, renderowanie serwerowe i statyczne, Server Components i Server Functions, optymalizację obrazków i fontów, budowanie i wdrażanie. Komponenty pisze się w zwykłym React.",
    sources: ["next-docs", "next-learn"],
  },
  {
    question: "Jak utworzyć stronę pod adresem `/about` w App Router?",
    options: [
      "Utworzyć `app/about/page.tsx` z komponentem eksportowanym domyślnie",
      "Utworzyć `app/about.tsx` z nazwanym eksportem `Page`",
      "Dodać trasę `/about` w sekcji `routes` w `next.config.ts`",
    ],
    answer: 0,
    explanation:
      "Trasę wyznacza folder, a plik `page.tsx` (lub `.js`) czyni ją publiczną stroną. Bez `page` folder jest niedostępny pod adresem URL — można w nim trzymać komponenty (kolokacja). W `next.config` nie ma konfiguracji tras. Plik `pages/about.tsx` to konwencja starego Pages Router.",
    sources: ["next-layouts-pages", "next-project-structure"],
  },
  {
    question: "Czym `layout.tsx` różni się od `page.tsx`?",
    options: [
      "Layout opakowuje strony i zachowuje stan podczas nawigacji",
      "Layout renderuje się tylko na serwerze, a strona tylko w przeglądarce",
      "Layout służy tylko do metadanych; nie można w nim pisać markupu",
    ],
    answer: 0,
    explanation:
      "Layout dostaje `children` i zawiera UI wspólny dla zagnieżdżonych tras (nagłówek, sidebar). Przy przejściach między stronami potomnymi layout nie montuje się ponownie: jego stan i DOM są zachowane, a renderuje się tylko zmieniona część. Zarówno layout, jak i strona to domyślnie Server Components.",
    sources: ["next-layouts-pages", "next-layout-file"],
  },
  {
    question: "Co musi zawierać główny `app/layout.tsx`?",
    options: [
      "Znaczniki `<html>` i `<body>`",
      "Komponent `<Head>` z `next/head`",
      "`<NextProvider>` wokół `children`",
    ],
    answer: 0,
    explanation:
      "Główny layout zastępuje `_app` i `_document` z Pages Router i musi sam renderować `<html>` i `<body>`. Metadane ustawia się eksportem `metadata` lub `generateMetadata`, a nie przez `next/head`. Next.js nie ma obowiązkowego providera.",
    sources: ["next-layout-file", "next-layouts-pages"],
  },
  {
    question: "Jak utworzyć dynamiczną trasę `/blog/:slug`?",
    options: [
      "Folder `app/blog/[slug]/page.tsx`",
      "Folder `app/blog/:slug/page.tsx`",
      "Folder `app/blog/{slug}/page.tsx`",
    ],
    answer: 0,
    explanation:
      "Segment dynamiczny to nazwa folderu w nawiasach kwadratowych. Wartość trafia do `params`. `[...slug]` łapie kilka segmentów; `[[...slug]]` robi to samo, ale pasuje też do trasy bez segmentów. Dwukropki i nawiasy klamrowe to składnia innych routerów.",
    sources: ["next-dynamic-routes"],
  },
  {
    question: "Jak poprawnie odczytać `params` na stronie w Next.js 16?",
    options: [
      "`const { slug } = await params` — to Promise",
      "`const { slug } = params` — to zwykły obiekt",
      "`const slug = useParams().slug` na stronie serwerowej",
    ],
    answer: 0,
    explanation:
      "Od Next.js 15 `params` i `searchParams` są promise'ami, a Next.js 16 całkowicie usunął dostęp synchroniczny. W komponencie serwerowym robi się `await`; na stronie klienckiej — `use(params)`. Hook `useParams` działa tylko w komponentach klienckich.",
    sources: ["next-dynamic-routes", "next-upgrade-16"],
  },
  {
    question: "Dlaczego `<Link>` z `next/link` jest lepszy niż zwykły `<a href>` do nawigacji wewnętrznej?",
    options: [
      "Nawigacja bez pełnego przeładowania strony plus wcześniejsze ładowanie tras",
      "Linki `<Link>` są indeksowane przez wyszukiwarki, a zwykłe `<a>` nie",
      "`<Link>` domyślnie otwiera strony w nowej karcie przeglądarki",
    ],
    answer: 0,
    explanation:
      "`<Link>` renderuje zwykły `<a>` (więc SEO nie cierpi), ale przechwytuje kliknięcie i wykonuje przejście SPA: wspólne layouty zostają, ładowane jest tylko to, co potrzebne. Linki w viewporcie są w produkcji wcześniej ładowane (prefetch). Do adresów zewnętrznych użyj zwykłego `<a>`.",
    sources: ["next-link", "next-linking"],
  },
  {
    question: "Jakimi komponentami są domyślnie pliki w folderze `app/`?",
    options: [
      "Server Components",
      "Client Components",
      "Zależy od ustawień `next.config`",
    ],
    answer: 0,
    explanation:
      "W App Router wszystko jest domyślnie Server Component: kod wykonuje się na serwerze i nie trafia do paczki klienckiej. Aby użyć stanu, efektów, handlerów zdarzeń lub API przeglądarki, dodaj `'use client'` na początku pliku.",
    sources: ["next-server-client", "react-server-components"],
  },
  {
    question: "Komponent używa `useState` i `onClick`, ale wysypuje się z błędem. Czego brakuje?",
    options: [
      "Dyrektywy `'use client'` na początku pliku",
      "Opakowania `<Suspense>` wokół komponentu",
      "Eksportu `export const dynamic = 'force-dynamic'`",
    ],
    answer: 0,
    explanation:
      "Hooki stanu i handlery zdarzeń działają tylko w komponentach klienckich. `'use client'` deklaruje granicę części klienckiej. Dobra praktyka to wynosić interaktywność do małych komponentów klienckich, a samą stronę zostawiać na serwerze.",
    sources: ["next-use-client", "next-server-client"],
  },
  {
    question: "Do czego służy plik `loading.tsx`?",
    options: [
      "Natychmiastowy fallback segmentu: Next.js opakowuje stronę w `<Suspense>`",
      "Ustawia wskaźnik ładowania dla wszystkich żądań `fetch` w przeglądarce",
      "Jest pokazywany tylko przy pierwszej wizycie na stronie, jak ekran powitalny",
    ],
    answer: 0,
    explanation:
      "Next.js automatycznie opakowuje `page` (i zagnieżdżone segmenty) w `<Suspense fallback={<Loading />}>`. Użytkownik od razu widzi layout i szkielet, a treść dopływa strumieniowo, gdy jest gotowa. Do precyzyjniejszej kontroli umieść własny `<Suspense>` wewnątrz strony.",
    sources: ["next-loading", "next-streaming"],
  },
  {
    question: "Dlaczego `error.tsx` musi być komponentem klienckim?",
    options: [
      "To error boundary React, który działa tylko na kliencie",
      "Komponenty serwerowe nie potrafią renderować tekstu błędu i stack trace",
      "Wymóg dotyczy tylko trybu deweloperskiego",
    ],
    answer: 0,
    explanation:
      "`error.tsx` opakowuje segment w error boundary — mechanizm kliencki. Komponent dostaje `error` i funkcję `retry()`, która ponownie ładuje i renderuje segment (jest też `reset()` — ponowny render bez ponownego pobierania danych). Błędy w głównym layoucie łapie `global-error.tsx`.",
    sources: ["next-error-file", "next-error-handling"],
  },
  {
    question: "Jak na stronie serwerowej pokazać stronę 404 dla nieistniejącego produktu?",
    options: [
      "Wywołać `notFound()` z `next/navigation`",
      "Zwrócić `{ status: 404 }` z komponentu strony",
      "Rzucić `new Error('404')` — Next.js sam się domyśli",
    ],
    answer: 0,
    explanation:
      "`notFound()` przerywa renderowanie, pokazuje najbliższy `not-found.tsx` (lub domyślne 404) i ustawia odpowiedni status. Komponent nie może zwrócić statusu HTTP, a zwykły błąd trafi do `error.tsx`.",
    sources: ["next-notFound", "next-not-found"],
  },
  {
    question: "Jak w App Router ustawić tytuł i opis strony?",
    options: [
      "Wyeksportować `metadata` lub `generateMetadata` ze strony/layoutu",
      "Użyć komponentu `<Head>` z `next/head` wewnątrz strony",
      "Podać `<title>` w `next.config.ts` dla każdej trasy",
    ],
    answer: 0,
    explanation:
      "Metadata API działa w komponentach serwerowych: `export const metadata = { title, description }`, a dla wartości dynamicznych `export async function generateMetadata({ params })`. Wartości z layoutu i strony są scalane. `next/head` to API Pages Router.",
    sources: ["next-metadata", "next-generateMetadata"],
  },
  {
    question: "Pod jakim adresem URL jest dostępny plik `public/logo.png`?",
    options: ["`/logo.png`", "`/public/logo.png`", "`/_next/static/logo.png`"],
    answer: 0,
    explanation:
      "Zawartość `public` jest serwowana od korzenia strony. Trafiają tam favikony, robots.txt i statyczne obrazki. Te pliki nie przechodzą przez build i nie dostają hasha w nazwie, więc cache trzeba skonfigurować osobno. `/_next/static` to ścieżka zasobów generowanych przez build.",
    sources: ["next-project-structure"],
  },
  {
    question: "Jak w App Router utworzyć endpoint API `GET /api/users`?",
    options: [
      "Plik `app/api/users/route.ts` eksportujący funkcję `GET`",
      "Plik `app/api/users/page.tsx` z eksportem domyślnym",
      "Plik `api/users.ts` w korzeniu projektu z `export default handler`",
    ],
    answer: 0,
    explanation:
      "Route Handlers używają webowych API `Request`/`Response`: `export async function GET(request: Request) { return Response.json(users) }`. Obsługiwane są `POST`, `PUT`, `PATCH`, `DELETE` i inne. Folder nie może zawierać jednocześnie `route.ts` i `page.tsx`.",
    sources: ["next-route-handlers"],
  },
  {
    question: "Które zmienne środowiskowe są dostępne w kodzie przeglądarki?",
    options: [
      "Tylko te z prefiksem `NEXT_PUBLIC_`, wstawiane podczas budowania",
      "Wszystkie zmienne z `.env`, jeśli plik jest w korzeniu projektu",
      "Żadne: zmienne środowiskowe w ogóle nie są dostępne w przeglądarce",
    ],
    answer: 0,
    explanation:
      "Next.js podstawia `process.env.NEXT_PUBLIC_*` do kodu klienckiego podczas budowania, więc zmiana wartości wymaga ponownego builda. Pozostałe zmienne są dostępne tylko na serwerze — dzięki temu sekrety (klucze API, hasła do bazy) nie wyciekają do przeglądarki.",
    sources: ["next-env"],
  },
  {
    question: "Co daje komponent `<Image>` z `next/image`?",
    options: [
      "Dobór rozmiaru i formatu, lazy loading, ochronę przed CLS",
      "Tylko krótszą składnię dla zwykłego znacznika `<img>`",
      "Ładowanie obrazków przez WebSocket dla szybszego renderowania",
    ],
    answer: 0,
    explanation:
      "`next/image` generuje `srcset`, serwuje nowoczesne formaty (WebP/AVIF), domyślnie ładuje leniwie i rezerwuje miejsce dzięki `width`/`height` (lub `fill`), zapobiegając przesunięciom układu. Dla obrazka LCP użyj `preload` (dawniej `priority`).",
    sources: ["next-images", "next-image"],
  },
  {
    question: "Dlaczego `<Image src=\"https://cdn.example.com/a.jpg\" ... />` daje błąd konfiguracji?",
    options: [
      "Zewnętrzne domeny trzeba dopuścić w `images.remotePatterns` w `next.config`",
      "`next/image` w ogóle nie obsługuje obrazków z innych domen",
      "Zewnętrzne obrazki można ładować tylko w formacie PNG",
    ],
    answer: 0,
    explanation:
      "Optymalizator obrazków działa na twoim serwerze i bez ograniczeń mógłby być użyty jako proxy dla dowolnego URL. Dlatego dozwolone źródła wymienia się w `remotePatterns` (protokół, host, ścieżka).",
    sources: ["next-image", "next-images"],
  },
  {
    question: "Co robi `next/font`?",
    options: [
      "Pobiera font podczas budowania i serwuje go z twojej domeny",
      "Ładuje Google Fonts przez `<link>` przy każdym żądaniu strony",
      "Zamienia fonty na sprite SVG, by przyspieszyć renderowanie tekstu",
    ],
    answer: 0,
    explanation:
      "Fonty (Google lub lokalne) są pobierane podczas budowania i serwowane razem z twoimi zasobami statycznymi: przeglądarka nie łączy się z Google, co jest lepsze dla prywatności i szybkości. Next.js konfiguruje też font zapasowy z dopasowanymi metrykami, by zmniejszyć CLS.",
    sources: ["next-fonts", "next-font"],
  },
  {
    question: "Skąd importuje się `useRouter` w App Router?",
    options: ["`next/navigation`", "`next/router`", "`react-router-dom`"],
    answer: 0,
    explanation:
      "W App Router hooki nawigacji — `useRouter`, `usePathname`, `useSearchParams`, `useParams` — importuje się z `next/navigation` i działają w komponentach klienckich. `next/router` to API Pages Router. Do przekierowania po stronie serwera służy `redirect()`.",
    sources: ["next-useRouter"],
  },
  {
    question: "Jak w komponencie klienckim pobrać bieżącą ścieżkę, np. by podświetlić aktywny link?",
    options: ["`usePathname()`", "`window.location.pathname` podczas renderu", "`useRouter().pathname`"],
    answer: 0,
    explanation:
      "`usePathname()` zwraca ścieżkę i aktualizuje się przy nawigacji po stronie klienta. Czytanie `window` podczas renderu psuje SSR i hydratację. Właściwość `pathname` w `useRouter` istniała w Pages Router; w `next/navigation` jej nie ma.",
    sources: ["next-usePathname"],
  },
  {
    question: "Czym SSR różni się od SSG?",
    options: [
      "SSR — HTML przy każdym żądaniu, SSG — z góry podczas budowania",
      "SSR renderuje w przeglądarce użytkownika, a SSG na serwerze",
      "SSG wymaga połączenia z bazą danych, a SSR działa bez niego",
    ],
    answer: 0,
    explanation:
      "Static Site Generation (prerendering) tworzy HTML podczas budowania i serwuje go z CDN — szybko i tanio, ale dane są „zamrożone”. Server-Side Rendering tworzy HTML przy każdym żądaniu — dane są świeże i spersonalizowane, ale obciążenie i TTFB są wyższe. Renderowanie w przeglądarce to CSR.",
    sources: ["vercel-ssr-ssg", "next-glossary"],
  },
  {
    question: "Czym jest ISR (Incremental Static Regeneration)?",
    options: [
      "Aktualizacją stron statycznych w tle bez pełnego przebudowania",
      "Stopniowym ładowaniem paczki JS podczas przewijania strony",
      "Renderowaniem strony częściami w przeglądarce po załadowaniu JS",
    ],
    answer: 0,
    explanation:
      "Użytkownicy dostają stronę statyczną z cache, a po upływie okresu (lub wywołaniu `revalidatePath`/`revalidateTag`) Next.js generuje ją ponownie w tle i aktualizuje cache. To kompromis między szybkością SSG a świeżością SSR.",
    sources: ["next-isr", "next-revalidating"],
  },
  {
    question: "Kiedy w Pages Router wykonuje się `getServerSideProps`?",
    options: [
      "Na serwerze przy każdym żądaniu",
      "Raz podczas budowania",
      "W przeglądarce podczas hydratacji",
    ],
    answer: 0,
    explanation:
      "`getServerSideProps` to SSR w Pages Router: funkcja dostaje kontekst żądania (ciasteczka, query) i zwraca propsy. Podczas budowania zamiast niej działa `getStaticProps`. W App Router oba API zastępują asynchroniczne komponenty serwerowe.",
    sources: ["next-pages-gssp", "next-pages-gsp"],
  },
  {
    question: "Co robi `getStaticPaths` w Pages Router?",
    options: [
      "Zwraca ścieżki trasy dynamicznej do zbudowania",
      "Zwraca wszystkie pliki statyczne z folderu `public`",
      "Definiuje przekierowania i rewrite'y dla stron statycznych",
    ],
    answer: 0,
    explanation:
      "Dla strony `pages/posts/[id].tsx` z `getStaticProps` Next.js musi wiedzieć, które `id` zbudować z góry. Opcja `fallback` określa zachowanie dla pozostałych ścieżek. Odpowiednik w App Router to `generateStaticParams`.",
    sources: ["next-pages-gsps", "next-generateStaticParams"],
  },
  {
    question: "Co daje folder w nawiasach, np. `app/(marketing)/about/page.tsx`?",
    options: [
      "Grupuje trasy bez wpływu na URL — strona jest pod `/about`",
      "Czyni trasę opcjonalną: działa zarówno `/marketing/about`, jak i `/about`",
      "Ukrywa trasę przed buildem produkcyjnym",
    ],
    answer: 0,
    explanation:
      "Grupy tras porządkują kod i pozwalają grupie mieć własny layout (np. osobne dla marketingu i panelu użytkownika) bez zmiany URL. Można nawet mieć kilka głównych layoutów w różnych grupach.",
    sources: ["next-route-groups"],
  },
  {
    question: "Po co nadawać folderowi nazwę z podkreślnikiem, np. `app/_components`?",
    options: [
      "To folder prywatny: on i jego pliki są wyłączone z routingu",
      "Podkreślnik czyni komponenty w folderze klienckimi",
      "Mówi Next.js, by mocniej minifikować te pliki",
    ],
    answer: 0,
    explanation:
      "Prywatne foldery jawnie oddzielają kod pomocniczy od tras. Ściśle biorąc, pliki bez `page`/`route` i tak nie są publiczne, ale `_` chroni przed przypadkowym utworzeniem trasy i czyni strukturę czytelniejszą.",
    sources: ["next-project-structure"],
  },
  {
    question: "Która trasa złapie `/docs/a/b/c`?",
    options: [
      "`app/docs/[...slug]/page.tsx`",
      "`app/docs/[slug]/page.tsx`",
      "`app/docs/*/page.tsx`",
    ],
    answer: 0,
    explanation:
      "Segment catch-all `[...slug]` zbiera wszystkie kolejne segmenty w tablicę. Zwykły `[slug]` pasuje do dokładnie jednego segmentu. Opcjonalny catch-all `[[...slug]]` pasuje też do samego `/docs`. Next.js nie obsługuje gwiazdek w nazwach folderów.",
    sources: ["next-dynamic-routes"],
  },
  {
    question: "Co robią polecenia `next build` i `next start`?",
    options: [
      "`build` tworzy build produkcyjny, `start` go uruchamia",
      "`build` uruchamia serwer deweloperski, a `start` — testy projektu",
      "To synonimy: `start` to stara nazwa `build`",
    ],
    answer: 0,
    explanation:
      "`next dev` to serwer deweloperski z szybkim odświeżaniem. `next build` kompiluje aplikację, prerenderuje trasy statyczne i wypisuje raport. `next start` uruchamia serwer produkcyjny na wyniku builda. Dla strony statycznej jest `output: 'export'`.",
    sources: ["next-docs", "next-self-hosting"],
  },
  {
    question: "Jakiego bundlera domyślnie używa Next.js 16 dla `next dev` i `next build`?",
    options: ["Turbopack, bez dodatkowych flag", "Webpack, jak w poprzednich wersjach", "Vite, po przejściu z Webpacka"],
    answer: 0,
    explanation:
      "Od Next.js 16 Turbopack jest stabilny i używany domyślnie w obu trybach — flaga `--turbopack` nie jest już potrzebna. Do Webpacka można wrócić flagą `--webpack`. Jeśli projekt ma własną konfigurację `webpack`, `next build` bez flagi się wysypie, by konfiguracja nie została po cichu zignorowana.",
    sources: ["next-upgrade-16", "next-turbopack"],
  },
  {
    question: "Jak w Next.js 16 nazywa się plik, który wcześniej nazywał się `middleware.ts`?",
    options: ["`proxy.ts`", "`interceptor.ts`", "`gateway.ts`"],
    answer: 0,
    explanation:
      "Konwencja `middleware` jest przestarzała i przemianowana na `proxy`, by podkreślić jej rolę na granicy sieci (przekierowania, rewrite'y, nagłówki). Eksportowana funkcja też nazywa się `proxy`. Proxy działa w runtime Node.js; runtime edge nie jest tam obsługiwany.",
    sources: ["next-proxy", "next-upgrade-16"],
  },
  {
    question: "Jak przekierować użytkownika na `/login` z komponentu serwerowego?",
    options: [
      "Wywołać `redirect('/login')` z `next/navigation`",
      "Wywołać `router.push('/login')` z `useRouter`",
      "Zwrócić `<Navigate to=\"/login\" />` z komponentu",
    ],
    answer: 0,
    explanation:
      "`redirect()` działa w komponentach serwerowych, Server Functions i Route Handlers. Rzuca specjalny wyjątek, więc kod po nim się nie wykona, i nie wolno go opakowywać w `try/catch`. `useRouter` jest dostępny tylko w komponentach klienckich, a `<Navigate>` pochodzi z React Router.",
    sources: ["next-redirect"],
  },
  {
    question: "Jak na stronie serwerowej pobrać parametr zapytania `?page=2`?",
    options: [
      "Z propa `searchParams`: `const { page } = await searchParams`",
      "Przez `useSearchParams()` bezpośrednio na stronie serwerowej",
      "Przez `params.page` — query trafia do `params`",
    ],
    answer: 0,
    explanation:
      "Strona dostaje `searchParams` jako promise. Odczyt query czyni stronę dynamiczną, bo wartości są znane dopiero w momencie żądania. W komponentach klienckich używa się `useSearchParams()`. `params` zawiera tylko dynamiczne segmenty ścieżki.",
    sources: ["next-page-file", "next-useSearchParams"],
  },
  {
    question: "Jak ładować dane w komponencie serwerowym?",
    options: [
      "Uczynić komponent `async` i wywołać `await fetch()` lub zapytanie do bazy",
      "Tylko przez `useEffect` i `useState`, jak w klienckim React",
      "Tylko przez Route Handler i żądanie do niego z klienta",
    ],
    answer: 0,
    explanation:
      "Komponenty serwerowe mogą być asynchroniczne i sięgać do danych bezpośrednio — API, ORM, system plików — bez wysyłania sekretów do przeglądarki. Wywoływanie własnego Route Handlera z komponentu serwerowego to zbędna podróż przez sieć. Hooki w komponentach serwerowych są niedostępne.",
    sources: ["next-fetching", "next-server-client"],
  },
  {
    question: "Gdzie w App Router importuje się globalny CSS?",
    options: [
      "W głównym `app/layout.tsx` przez `import`",
      "W każdym `page.tsx` osobno przez `import`",
      "Tylko przez znacznik `<link>` w `public/index.html`",
    ],
    answer: 0,
    explanation:
      "Style globalne importuje się w głównym layoucie i działają na wszystkich trasach. Do stylów komponentów służą CSS Modules (`*.module.css`), Tailwind lub CSS-in-JS z obsługą RSC. Next.js nie ma pliku `index.html`.",
    sources: ["next-css"],
  },
  {
    question: "Gdzie pojawi się `console.log` z komponentu serwerowego?",
    options: [
      "W terminalu, w którym działa serwer Next.js",
      "W konsoli przeglądarki użytkownika",
      "Nigdzie: logowanie w komponentach serwerowych jest wyłączone",
    ],
    answer: 0,
    explanation:
      "Komponent serwerowy wykonuje się na serwerze (lub podczas budowania), więc jego logi trafiają do wyjścia procesu Node.js. W trybie deweloperskim Next.js może dla wygody duplikować logi serwera w przeglądarce, ale kod i tak działa na serwerze.",
    sources: ["next-server-client"],
  },
  {
    question: "Co przekazać do `<Image>` dla obrazka rozciągniętego na cały blok rodzica?",
    options: [
      "Prop `fill`, z `position: relative` na rodzicu",
      "`width=\"100%\"` i `height=\"100%\"` jako stringi",
      "Nic: `<Image>` domyślnie wypełnia rodzica",
    ],
    answer: 0,
    explanation:
      "Gdy wymiary nie są znane z góry, używa się `fill`: obrazek jest pozycjonowany absolutnie i wypełnia rodzica, który musi mieć `relative`, `absolute` lub `fixed`. `sizes` podpowiada, jak szeroki będzie obrazek, by przeglądarka nie pobierała zbyt dużego pliku. Dopasowaniem steruje `object-fit`.",
    sources: ["next-image"],
  },
  {
    question: "Jak w Next.js leniwie załadować ciężki komponent kliencki?",
    options: [
      "Przez `next/dynamic` (lub `React.lazy` + `Suspense`)",
      "Przez atrybut `lazy` na komponencie w JSX",
      "Przez `import` wewnątrz `useEffect` z zapisem w stanie",
    ],
    answer: 0,
    explanation:
      "`const Chart = dynamic(() => import('./Chart'))` wydziela kod do osobnego chunka i pozwala podać `loading`. Opcja `ssr: false` wyłącza renderowanie na serwerze, ale można jej użyć tylko w komponentach klienckich. Komponenty serwerowe i tak nie trafiają do paczki.",
    sources: ["next-lazy-loading"],
  },
  {
    question: "Po co ładować zewnętrzne skrypty przez `next/script`?",
    options: [
      "Można wybrać strategię ładowania (`afterInteractive`, `lazyOnload` itd.)",
      "Tylko wtedy skrypty będą działać w buildzie produkcyjnym",
      "`next/script` automatycznie przepisuje skrypt na TypeScript",
    ],
    answer: 0,
    explanation:
      "Komponent `<Script>` pozwala nie blokować ładowania strony analityką i widżetami: `beforeInteractive` dla krytycznych skryptów, `afterInteractive` (domyślnie) i `lazyOnload` dla drugorzędnych. Skrypt ładuje się raz nawet przy przechodzeniu między stronami.",
    sources: ["next-script"],
  },
  {
    question: "Jak zbudować aplikację Next.js do zestawu plików statycznych bez serwera Node.js?",
    options: [
      "Ustawić `output: 'export'` w `next.config`",
      "Uruchomić `next start --static`",
      "Usunąć folder `app` i zostawić tylko `public`",
    ],
    answer: 0,
    explanation:
      "Eksport statyczny umieszcza HTML, CSS i JS w folderze `out`, który można hostować na dowolnym hostingu statycznym. Ograniczenia: nie działają funkcje wymagające serwera — `cookies()`, dynamiczne Route Handlers, ISR, domyślna optymalizacja obrazków, Server Functions.",
    sources: ["next-static-exports"],
  },
  {
    question: "Co się stanie, jeśli w `app/dashboard/` będą jednocześnie `page.tsx` i `route.ts`?",
    options: [
      "Błąd budowania: te pliki konfliktują o ten sam URL",
      "Żądania GET trafią do `route.ts`, pozostałe do `page.tsx`",
      "Strona się wyrenderuje, a `route.ts` zostanie zignorowany",
    ],
    answer: 0,
    explanation:
      "Oba pliki pretendują do tego samego URL i Next.js zgłasza konflikt. Trasy API zwykle wynosi się do osobnej gałęzi, np. `app/api/...`.",
    sources: ["next-route-handlers"],
  },
  {
    question: "Czym `template.tsx` różni się od `layout.tsx`?",
    options: [
      "Template montuje się ponownie przy każdej nawigacji, layout pozostaje",
      "Template renderuje się tylko na serwerze, layout tylko na kliencie",
      "Template służy tylko do szablonów e-maili",
    ],
    answer: 0,
    explanation:
      "Template opakowuje strony jak layout, ale przy każdej nawigacji dostaje unikalny klucz: stan się resetuje, a efekty uruchamiają ponownie. Przydaje się to np. do animacji wejścia lub logowania wyświetleń stron. W większości przypadków wystarczy layout.",
    sources: ["next-template"],
  },
  {
    question: "Czy w komponencie serwerowym można używać hooków `useState` i `useEffect`?",
    options: [
      "Nie: komponenty serwerowe nie mają stanu ani efektów",
      "Tak, ale tylko `useState`, bez `useEffect`",
      "Tak, jeśli komponent jest zadeklarowany jako funkcja `async`",
    ],
    answer: 0,
    explanation:
      "Komponent serwerowy wykonuje się raz, by dać wynik, i potem nie „żyje”. Stan, efekty i handlery zdarzeń to możliwości klienckie. Komponent serwerowy może wyrenderować komponent kliencki i przekazać mu dane przez propsy.",
    sources: ["next-server-client", "react-server-components"],
  },
  {
    question: "Kiedy `<Link>` wcześniej ładuje trasę (prefetch)?",
    options: [
      "Gdy link pojawia się w viewporcie (w produkcji)",
      "Tylko po kliknięciu linku, jak przy zwykłej nawigacji",
      "Od razu przy ładowaniu aplikacji — wszystkie trasy strony",
    ],
    answer: 0,
    explanation:
      "Prefetch czyni nawigację natychmiastową. W trybie deweloperskim jest wyłączony, więc szybkość nawigacji sprawdzaj na buildzie produkcyjnym. Zachowanie konfiguruje prop `prefetch` (`false`, `true`, `'auto'`). W Next.js 16 prefetch stał się przyrostowy: wspólne layouty są pobierane raz.",
    sources: ["next-link", "next-prefetching"],
  },
  {
    question: "Czy stan w sidebarze wewnątrz wspólnego layoutu przetrwa przejście między stronami?",
    options: [
      "Tak: wspólny layout nie montuje się ponownie podczas nawigacji",
      "Nie: każda nawigacja montuje ponownie całe drzewo",
      "Tylko jeśli sidebar jest opakowany w `React.memo` lub `useMemo`",
    ],
    answer: 0,
    explanation:
      "Next.js renderuje tylko zmienione segmenty, a wspólne layouty pozostają zamontowane: wpisany tekst, otwarte menu i pozycja przewinięcia są zachowane. Jeśli potrzebny jest reset przy nawigacji, użyj `template.tsx` lub `key`.",
    sources: ["next-linking", "next-layouts-pages"],
  },
  {
    question: "Jak otypować propsy `app/blog/[slug]/page.tsx` w Next.js 16?",
    options: [
      "Globalnym helperem `PageProps<'/blog/[slug]'>`",
      "Przez `NextPage<{ slug: string }>` z `next`",
      "Typowanie propsów strony nie jest możliwe",
    ],
    answer: 0,
    explanation:
      "Next.js generuje typy tras (podczas `next dev`, `next build` lub `next typegen`), a helpery `PageProps`, `LayoutProps` i `RouteContext` znają kształt `params` dla każdej ścieżki. `NextPage` to typ Pages Router.",
    sources: ["next-page-file", "next-typescript"],
  },
  {
    question: "Jaka minimalna wersja Node.js jest wymagana dla Next.js 16?",
    options: ["20.9", "16.0", "18.0"],
    answer: 0,
    explanation:
      "Next.js 16 wymaga Node.js 20.9+ (LTS); obsługę Node.js 18 usunięto. Wzrosły też wymagania dla TypeScript (5.1+) i przeglądarek (Chrome/Edge/Firefox 111+, Safari 16.4+).",
    sources: ["next-upgrade-16"],
  },
  {
    question: "Czy w Next.js można używać CSS Modules bez dodatkowej konfiguracji?",
    options: [
      "Tak: pliki `*.module.css` są obsługiwane od razu",
      "Nie: trzeba zainstalować i skonfigurować `css-loader`",
      "Tylko w Pages Router; App Router ich nie obsługuje",
    ],
    answer: 0,
    explanation:
      "`import styles from './Button.module.css'` i `className={styles.primary}` — nazwy klas stają się lokalne. Obsługiwane są też Sass (po instalacji pakietu `sass`), Tailwind i globalny CSS.",
    sources: ["next-css"],
  },
  {
    question: "Jaki tytuł dostanie strona przy `export const metadata = { title: 'Profile' }` na stronie i `title: { template: '%s | Shop', default: 'Shop' }` w layoucie?",
    options: ["`Profile | Shop`", "`Shop | Profile`", "`Profile` bez szablonu"],
    answer: 0,
    explanation:
      "`title.template` z layoutu jest stosowany do tytułów segmentów potomnych: `%s` jest zastępowane przez `title` strony. `default` jest używany, jeśli segment potomny nie ustawia tytułu. Oszczędza to powtarzania nazwy strony na każdej podstronie.",
    sources: ["next-metadata", "next-generateMetadata"],
  },
];

export default questions;
