import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Czym jest Server Function (Server Action) w Next.js?",
    options: [
      "Funkcją async oznaczoną `'use server'`, którą można wywołać z klienta",
      "Route Handlerem tworzonym automatycznie dla każdej strony",
      "Funkcją wykonywaną podczas budowania, która cache'uje swój wynik",
    ],
    answer: 0,
    explanation:
      "Dyrektywa `'use server'` zamienia funkcję w serwerową, a Next.js tworzy dla niej endpoint. Można ją przekazać do `<form action>` lub wywołać z klienckiego handlera. Wywołanie to żądanie POST. Server Actions to Server Functions używane do mutacji, często z późniejszą rewalidacją cache.",
    sources: ["next-mutating", "react-use-server"],
  },
  {
    question: "Co daje `<form action={createPost}>` z Server Action w porównaniu z `onSubmit` + `fetch`?",
    options: [
      "Formularz działa nawet przed załadowaniem JS (progressive enhancement), bez trasy API",
      "Formularz wysyła się szybciej dzięki stałemu połączeniu WebSocket",
      "Dane formularza są automatycznie walidowane względem schematu bazy",
    ],
    answer: 0,
    explanation:
      "Server Action dostaje `FormData` bezpośrednio, więc nie potrzebujesz Route Handlera ani klienckiego `fetch`. Jeśli formularz renderuje komponent serwerowy, wysyła się nawet przed hydratacją. Walidację nadal piszesz sam (np. przez Zod). Stan wysyłania pokazuje się przez `useActionState` lub `useFormStatus`.",
    sources: ["next-mutating", "react-useActionState"],
  },
  {
    question: "Co robi `revalidatePath('/blog')` po mutacji?",
    options: [
      "Oznacza zcache'owane dane i UI trasy `/blog` jako nieaktualne",
      "Restartuje serwer Next.js, by wyczyścić cały cache",
      "Przekierowuje użytkownika na stronę `/blog` po akcji",
    ],
    answer: 0,
    explanation:
      "Następne żądanie do `/blog` dostanie świeże dane. Przy wywołaniu w Server Action zaktualizowany UI wraca od razu w odpowiedzi akcji. Do punktowego unieważniania danych używanych na wielu stronach wygodniejsze są tagi (`cacheTag` + `revalidateTag`/`updateTag`).",
    sources: ["next-revalidatePath", "next-revalidating"],
  },
  {
    question: "Czym `updateTag` różni się od `revalidateTag` w Next.js 16?",
    options: [
      "`updateTag` od razu unieważnia cache (read-your-writes), `revalidateTag` to stale-while-revalidate",
      "`updateTag` działa tylko w Route Handlers, a `revalidateTag` tylko w proxy",
      "To synonimy; `revalidateTag` jest przestarzały na rzecz `updateTag`",
    ],
    answer: 0,
    explanation:
      "`updateTag` jest dostępny tylko w Server Actions: użytkownik, który zmienił dane, od razu widzi zmiany. `revalidateTag(tag, 'max')` oznacza dane jako nieaktualne: odwiedzający widzą starą wersję, a nowa jest przygotowywana w tle — dobre dla blogów i katalogów. W Next.js 16 `revalidateTag` wymaga drugiego argumentu — profilu `cacheLife`.",
    sources: ["next-updateTag", "next-revalidateTag", "next-upgrade-16"],
  },
  {
    question: "Czy żądania `fetch` w komponentach serwerowych są domyślnie cache'owane (Next.js 15+, bez Cache Components)?",
    options: [
      "Nie: domyślnie nie są cache'owane; cache włącza się przez `cache: 'force-cache'`",
      "Tak: wszystkie `fetch` są cache'owane na zawsze; wyłącza się to przez `no-store`",
      "Tak, ale tylko żądania GET do domen wymienionych w `next.config`",
    ],
    answer: 0,
    explanation:
      "W Next.js 14 `fetch` był domyślnie cache'owany, co często zaskakiwało. Od wersji 15 zachowanie jest odwrotne. Z włączonymi Cache Components cache'owanie jest jawne przez `'use cache'`, a niezcache'owane dane strumieniują się wewnątrz `<Suspense>`.",
    sources: ["next-caching-previous", "next-upgrade-15"],
  },
  {
    question: "Co robi dyrektywa `'use cache'`?",
    options: [
      "Cache'uje wynik funkcji async lub komponentu; argumenty są częścią klucza cache",
      "Włącza cache'owanie wszystkich `fetch` w całej aplikacji naraz i na zawsze",
      "Zapisuje stan komponentu klienckiego w `localStorage` przeglądarki",
    ],
    answer: 0,
    explanation:
      "`'use cache'` działa z `cacheComponents: true`: na poziomie funkcji danych, komponentu lub całego pliku. Argumenty i przechwycone wartości stają się częścią klucza. Czas życia ustawia `cacheLife`, tagi do unieważniania — `cacheTag`. Zcache'owany wynik może stać się częścią statycznej powłoki strony.",
    sources: ["next-use-cache", "next-caching"],
  },
  {
    question: "Dlaczego nie można wywołać `cookies()` wewnątrz funkcji z `'use cache'`?",
    options: [
      "Cache jest współdzielony między żądaniami, a ciasteczka to dane konkretnego żądania",
      "`cookies()` działa tylko w komponentach klienckich",
      "To ograniczenie tylko trybu deweloperskiego",
    ],
    answer: 0,
    explanation:
      "Gdyby zcache'owana funkcja czytała ciasteczka, dane jednego użytkownika mogłyby trafić do innego. Poprawnie jest odczytać ciasteczka na zewnątrz i przekazać potrzebną wartość jako argument (stanie się częścią klucza). Na rzadkie przypadki jest `'use cache: private'`, które nie zapisuje wyniku w cache serwera między żądaniami.",
    sources: ["next-use-cache", "next-cookies"],
  },
  {
    question: "Który profil `cacheLife` jest stosowany, jeśli nie podasz go w `'use cache'`?",
    options: ["`default`", "`max`", "`seconds`"],
    answer: 0,
    explanation:
      "Profil `default`: stale 5 minut, revalidate 15 minut, expire nigdy. Są predefiniowane `seconds`, `minutes`, `hours`, `days`, `weeks`, `max` oraz własne profile w `next.config`. Dokumentacja zaleca zawsze jawnie podawać `cacheLife`, by zachowanie było jasne w miejscu wywołania.",
    sources: ["next-cacheLife"],
  },
  {
    question: "Po co `cacheTag('products')` wewnątrz zcache'owanej funkcji?",
    options: [
      "Aby później unieważnić wpisy z tym tagiem",
      "Aby wysłać tag w nagłówku odpowiedzi dla cache CDN",
      "Aby ograniczyć cache tylko do trasy `/products`",
    ],
    answer: 0,
    explanation:
      "Tagi wiążą wpisy cache z rodzajem danych, a nie z URL. Jedna mutacja produktu może unieważnić wszystkie strony i komponenty używające produktów: `revalidateTag('products', 'max')`. Można ustawić kilka tagów, np. ogólny i z id: `cacheTag('products', `product-${id}`)`.",
    sources: ["next-cacheTag", "next-revalidateTag"],
  },
  {
    question: "Co robi `loading.tsx` przy nawigacji po stronie klienta do segmentu z wolnymi danymi?",
    options: [
      "Od razu pokazuje fallback, zachowując wspólny layout, dopóki segment się ładuje",
      "Blokuje nawigację, dopóki dane nie załadują się w całości",
      "Wykonuje pełne przeładowanie strony ze wskaźnikiem przeglądarki",
    ],
    answer: 0,
    explanation:
      "Nawigacja jest natychmiastowa: layout pozostaje interaktywny, zamiast strony pokazywany jest fallback `loading.tsx`, a treść dopływa strumieniowo. Fallback może zostać wcześniej załadowany razem z linkiem. Bez `loading.tsx` lub `<Suspense>` nawigacja czekałaby na dane.",
    sources: ["next-loading", "next-linking"],
  },
  {
    question: "Co robi `generateStaticParams`?",
    options: [
      "Zwraca wartości segmentów do prerenderowania podczas budowania",
      "Generuje losowe parametry tras do testów A/B",
      "Tworzy parametry zapytania dla wszystkich `<Link>` na stronie",
    ],
    answer: 0,
    explanation:
      "`export function generateStaticParams() { return posts.map(p => ({ slug: p.slug })) }` — te strony są budowane z góry. Zastępuje `getStaticPaths` z Pages Router. Przy Cache Components funkcja musi zwrócić co najmniej jeden zestaw parametrów — tak build sprawdza, że trasa nie odwołuje się niepoprawnie do danych żądania.",
    sources: ["next-generateStaticParams"],
  },
  {
    question: "Jak w Next.js pokazać stronę z wolnymi danymi bez opóźniania całej strony?",
    options: [
      "Opakować wolny komponent w `<Suspense>` — dopłynie strumieniowo później",
      "Przenieść ładowanie danych do `useEffect` komponentu klienckiego",
      "Zwiększyć timeout odpowiedzi serwera w `next.config`",
    ],
    answer: 0,
    explanation:
      "Serwer od razu wysyła powłokę i fallback, a HTML wolnego bloku dopisuje do strumienia, gdy będzie gotowy. Ładowanie w `useEffect` wysyła pusty HTML, dodaje kaskadę żądań i szkodzi LCP. Przy Cache Components niezcache'owane dane muszą być wewnątrz `<Suspense>`.",
    sources: ["next-streaming", "next-caching"],
  },
  {
    question: "Jak uniknąć kaskady żądań, jeśli komponent potrzebuje niezależnych `getUser()` i `getPosts()`?",
    options: [
      "Uruchomić oba żądania naraz i czekać przez `Promise.all`",
      "Wywołać je kolejno dwoma osobnymi `await`",
      "Przenieść oba żądania do osobnych `useEffect` na kliencie",
    ],
    answer: 0,
    explanation:
      "Kolejne `await` sumują czas oczekiwania. `const [user, posts] = await Promise.all([getUser(), getPosts()])` uruchamia je równolegle. Inna opcja: przekazać promise'y w dół i rozpakować je przez `use()` pod osobnymi granicami Suspense, by części UI pojawiały się niezależnie.",
    sources: ["next-fetching"],
  },
  {
    question: "Jak uniknąć podwójnego zapytania do bazy, jeśli `generateMetadata` i strona wywołują `getUser(id)`?",
    options: [
      "Opakować funkcję w `cache()` z React — deduplikacja w obrębie jednego żądania",
      "Trzymać użytkownika w globalnej zmiennej modułu na serwerze",
      "Przekazać dane z `generateMetadata` do strony przez jej propsy",
    ],
    answer: 0,
    explanation:
      "`cache()` memoizuje wywołania z tymi samymi argumentami na czas jednego renderu serwerowego. `fetch` z identycznymi parametrami Next.js deduplikuje sam, ale ORM-y i SDK potrzebują `cache()`. Zmienna globalna pomieszałaby dane różnych użytkowników.",
    sources: ["react-cache", "next-fetching"],
  },
  {
    question: "Jak zagwarantować, że moduł z sekretami nigdy nie trafi do paczki klienckiej?",
    options: [
      "Dodać do niego `import 'server-only'`",
      "Nazwać plik z sufiksem `.server.ts`",
      "Umieścić go w folderze `public`",
    ],
    answer: 0,
    explanation:
      "Pakiet `server-only` powoduje błąd budowania, jeśli moduł zostanie zaimportowany z komponentu klienckiego. Chroni to przed przypadkowym wyciekiem kodu bazy lub kluczy. Jest też analogiczny pakiet `client-only`. Sufiks `.server` w App Router nic nie robi, a `public` jest serwowany wszystkim.",
    sources: ["next-server-client", "next-data-security"],
  },
  {
    question: "Czy można użyć `next/dynamic` z `ssr: false` w komponencie serwerowym?",
    options: [
      "Nie: `ssr: false` jest dozwolone tylko w komponentach klienckich",
      "Tak, to główny sposób wyłączenia SSR dla strony",
      "Tak, ale tylko w `layout.tsx`",
    ],
    answer: 0,
    explanation:
      "Opcji `ssr: false` używa się w pliku z `'use client'`: np. dla komponentu, który przy imporcie odwołuje się do `window`. W komponencie serwerowym Next.js rzuci błąd. Komponenty serwerowe i tak nie wysyłają swojego kodu do przeglądarki.",
    sources: ["next-lazy-loading"],
  },
  {
    question: "Po co opakowywać komponent z `useSearchParams()` w `<Suspense>`?",
    options: [
      "Inaczej wszystko aż do najbliższej granicy wypada z prerenderingu",
      "Bez Suspense `useSearchParams` zawsze zwraca `null` na kliencie",
      "Jest to potrzebne tylko do poprawnego działania w Safari i iOS",
    ],
    answer: 0,
    explanation:
      "Parametry zapytania są nieznane podczas prerenderingu. Jeśli granica Suspense jest blisko komponentu, reszta strony trafia do statycznego HTML, a tylko ten fragment renderuje się na kliencie. Bez granicy duża część drzewa staje się renderowana po stronie klienta, a Next.js o tym ostrzega.",
    sources: ["next-useSearchParams"],
  },
  {
    question: "Czym są trasy równoległe (`@slot`)?",
    options: [
      "Nazwanymi slotami, które pozwalają renderować kilka stron w jednym layoucie",
      "Trasami obsługiwanymi w kilku wątkach serwera",
      "Duplikowaniem trasy na potrzeby testów A/B",
    ],
    answer: 0,
    explanation:
      "Folder `@analytics` staje się propem `analytics` layoutu rodzica. Każdy slot ma własną nawigację, stany ładowania i błędów — wygodne dla dashboardów i modali. Przy pełnym przeładowaniu nieaktywny slot renderuje swój `default.tsx` (lub 404, jeśli go nie ma).",
    sources: ["next-parallel-routes"],
  },
  {
    question: "Do czego służą trasy przechwytujące `(.)photo/[id]`?",
    options: [
      "Do pokazania trasy na wierzchu bieżącej strony, np. w modalu",
      "Do przechwytywania wszystkich żądań API i logowania ich na serwerze",
      "Do przekierowania niezalogowanego użytkownika na stronę logowania",
    ],
    answer: 0,
    explanation:
      "Przy nawigacji po stronie klienta z feedu do `/photo/1` trasa przechwytująca renderuje zdjęcie w modalu nad feedem, a URL się zmienia. Przy bezpośrednim wejściu lub przeładowaniu otwiera się pełna strona `/photo/1`. Zwykle łączy się to z równoległym slotem `@modal`.",
    sources: ["next-intercepting-routes", "next-parallel-routes"],
  },
  {
    question: "Jak odczytać ciasteczko w komponencie serwerowym Next.js 16?",
    options: [
      "`const store = await cookies(); store.get('theme')`",
      "`document.cookie` wewnątrz komponentu serwerowego",
      "`const theme = cookies().get('theme')` bez `await`",
    ],
    answer: 0,
    explanation:
      "`cookies()` i `headers()` są asynchroniczne: dostęp synchroniczny usunięto w Next.js 16. Ich użycie uzależnia renderowanie od żądania. Ciasteczka można ustawiać w Server Actions i Route Handlers, ale nie podczas renderowania komponentu serwerowego.",
    sources: ["next-cookies", "next-upgrade-16"],
  },
  {
    question: "Co robi `proxy.ts` (dawniej middleware)?",
    options: [
      "Wykonuje się przed obsługą żądania: przekierowania, rewrite'y, nagłówki",
      "Przepuszcza wszystkie `fetch` z komponentów serwerowych przez wspólny cache",
      "Podmienia komponenty React w zależności od urządzenia",
    ],
    answer: 0,
    explanation:
      "Proxy przechwytuje żądania na granicy sieci: przekierowanie niezalogowanych, testy A/B, lokalizacje, nagłówki. Zakres ustawia `matcher`. Nie używaj go do ciężkiej logiki ani jako jedynego sprawdzenia autoryzacji — uprawnienia trzeba sprawdzać także blisko danych.",
    sources: ["next-proxy"],
  },
  {
    question: "Co wywołać w komponencie klienckim, by ponownie pobrać komponenty serwerowe bieżącej trasy?",
    options: [
      "`router.refresh()` z `useRouter()`",
      "`window.location.reload()`",
      "`router.push(pathname)` z tą samą ścieżką",
    ],
    answer: 0,
    explanation:
      "`router.refresh()` robi nowe żądanie do serwera i przerenderowuje komponenty serwerowe, zachowując kliencki stan React i przeglądarki (przewinięcie, wpisany tekst). `location.reload()` resetuje wszystko. W Server Actions odpowiednikiem jest funkcja `refresh()` z `next/cache`.",
    sources: ["next-useRouter", "next-refresh"],
  },
  {
    question: "Czym `global-error.tsx` różni się od `error.tsx`?",
    options: [
      "Łapie błędy głównego layoutu i renderuje własne `<html>` i `<body>`",
      "Łapie błędy tylko podczas polecenia `next build`",
      "To samo co `error.tsx`, ale dla tras API `route.ts`",
    ],
    answer: 0,
    explanation:
      "`error.tsx` w korzeniu nie złapie błędu w samym głównym layoucie — znajduje się wewnątrz niego. `global-error.tsx` zastępuje cały dokument, więc zawiera własne style i markup. Nie można z niego eksportować metadanych; użyj zamiast tego `<title>` z React.",
    sources: ["next-error-file", "next-error-handling"],
  },
  {
    question: "Co robi `export const dynamic = 'force-dynamic'` (bez Cache Components)?",
    options: [
      "Wymusza renderowanie trasy przy każdym żądaniu, wyłączając prerendering",
      "Włącza hot reload modułów także w buildzie produkcyjnym",
      "Czyni wszystkie komponenty trasy klienckimi, jak `'use client'`",
    ],
    answer: 0,
    explanation:
      "To opcja route segment config z poprzedniego modelu cache'owania. Przy Cache Components zamiast niej używa się jawnych narzędzi: `'use cache'` do cache'owania, `<Suspense>` i `connection()` do danych z czasu żądania. Nie zamienia komponentów w klienckie.",
    sources: ["next-caching-previous", "next-route-segment-config"],
  },
  {
    question: "Jakie propsy można przekazać ze strony serwerowej do komponentu klienckiego?",
    options: [
      "Wartości serializowalne i Server Actions; zwykłych funkcji przekazać nie można",
      "Dowolne wartości, w tym klasy i handlery zdarzeń",
      "Tylko stringi — resztę trzeba ręcznie konwertować na JSON",
    ],
    answer: 0,
    explanation:
      "Propsy przechodzą przez sieć w RSC payload. Obsługiwane są obiekty, tablice, `Date`, `Map`, promise'y, JSX i Server Functions. Zwykłej funkcji (`onClick={() => ...}`) z komponentu serwerowego przekazać nie można — zadeklaruj handler w komponencie klienckim.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "Jak w App Router pobrać dane dla `generateMetadata` i strony, nie odpytując API dwa razy przez `fetch`?",
    options: [
      "Nic nie robić: identyczne `fetch` w jednym renderze są deduplikowane",
      "Zapisać odpowiedź w `localStorage` i odczytać ją za drugim razem",
      "Użyć `getStaticProps` obok funkcji `generateMetadata`",
    ],
    answer: 0,
    explanation:
      "Request memoization: żądania GET `fetch` z tym samym URL i opcjami w obrębie jednego renderu wykonują się raz. Dla innych źródeł danych (ORM, SDK) użyj `cache()` z React. `getStaticProps` w App Router nie działa.",
    sources: ["next-fetching", "react-cache"],
  },
  {
    question: "Jak poprawnie zrobić optymistyczny UI dla Server Action na kliencie?",
    options: [
      "Przez `useOptimistic`, dopóki akcja trwa",
      "Przez `router.refresh()` przed wywołaniem akcji",
      "Przez `revalidatePath` w komponencie klienckim",
    ],
    answer: 0,
    explanation:
      "`useOptimistic` od razu pokazuje oczekiwany stan i automatycznie wraca do prawdziwego, gdy akcja się zakończy i przyjdą świeże dane. `revalidatePath` działa tylko na serwerze. `router.refresh()` przed akcją nie da natychmiastowej informacji zwrotnej.",
    sources: ["react-useOptimistic", "next-mutating"],
  },
  {
    question: "Co się stanie z `redirect()` wewnątrz `try/catch` w Server Action?",
    code: `try {
  await save(data);
  redirect('/done');
} catch (e) {
  return { error: 'Failed to save' };
}`,
    options: [
      "`catch` przechwyci wewnętrzny wyjątek przekierowania, więc przekierowania nie będzie",
      "Przekierowanie zadziała; `catch` wykona się tylko przy błędzie `save`",
      "Next.js zgłosi błąd budowania",
    ],
    answer: 0,
    explanation:
      "`redirect()` i `notFound()` działają przez rzucanie specjalnych wyjątków. Zwykły `catch` je połyka. Rozwiązanie: wywołać `redirect` po bloku `try/catch` lub ponownie rzucać wewnętrzne błędy (`unstable_rethrow(e)`).",
    sources: ["next-redirect", "next-mutating"],
  },
  {
    question: "Czym `<Form>` z `next/form` różni się od zwykłego `<form>` w formularzu wyszukiwania?",
    options: [
      "Ze stringowym `action` wykonuje nawigację po stronie klienta z query",
      "Automatycznie waliduje pola schematem Zod przed wysłaniem",
      "Wysyła dane przez WebSocket zamiast zwykłego żądania HTTP",
    ],
    answer: 0,
    explanation:
      "`<Form action=\"/search\">` zamienia pola w `searchParams` i wykonuje przejście SPA z zachowaniem wspólnego layoutu, zamiast pełnego przeładowania. Wcześniej ładuje wspólny UI (np. `loading.tsx`). Bez JS działa jak zwykły formularz. Z funkcją w `action` zachowuje się jak formularz React z Server Action.",
    sources: ["next-form"],
  },
  {
    question: "Co robi `generateMetadata` w porównaniu ze statycznym eksportem `metadata`?",
    options: [
      "Oblicza metadane dynamicznie, np. z danych pobranych według `params`",
      "Generuje metadane na kliencie po załadowaniu strony",
      "Tworzy `sitemap.xml` dla wszystkich stron",
    ],
    answer: 0,
    explanation:
      "`export async function generateMetadata({ params }) { const post = await getPost((await params).slug); return { title: post.title } }`. Wykonuje się na serwerze. Do mapy strony jest osobny plik `sitemap.ts`, a obrazki Open Graph można generować przez `opengraph-image.tsx`.",
    sources: ["next-generateMetadata", "next-metadata"],
  },
  {
    question: "Jak obsłużyć wiele języków w App Router?",
    options: [
      "Segment `app/[lang]/...` + wykrywanie lokalizacji w proxy + słowniki na serwerze",
      "Włączyć opcję `i18n` w `next.config` — App Router przetłumaczy sam",
      "Utworzyć osobną aplikację Next.js dla każdego języka",
    ],
    answer: 0,
    explanation:
      "App Router nie używa wbudowanej opcji `i18n` z Pages Router. Zwykle tworzy się dynamiczny segment `[lang]`, przekierowuje użytkownika w proxy według nagłówka `Accept-Language` i ładuje słowniki w komponentach serwerowych (nie trafiają do paczki). Często używa się bibliotek typu next-intl.",
    sources: ["next-i18n", "next-proxy"],
  },
  {
    question: "Jak zwrócić JSON ze statusem 201 z Route Handlera?",
    options: [
      "`return Response.json(data, { status: 201 })`",
      "`res.status(201).json(data);`",
      "`return { status: 201, body: data };`",
    ],
    answer: 0,
    explanation:
      "Route Handlers są zbudowane na Web API: przyjmują `Request` i zwracają `Response` (lub `NextResponse` z dodatkowymi możliwościami). `res.status().json()` to styl Express używany przez API Routes w Pages Router. Zwykły obiekt nie jest poprawną odpowiedzią.",
    sources: ["next-route-handlers"],
  },
  {
    question: "Czym jest Partial Prerendering (PPR) w Next.js 16?",
    options: [
      "Statyczna powłoka strony jest wysyłana od razu, a części dynamiczne dopływają strumieniowo",
      "Prerendering tylko pierwszej połowy strony dla szybkości",
      "Tryb, w którym połowa stron jest statyczna, a połowa dynamiczna",
    ],
    answer: 0,
    explanation:
      "Jedna trasa może łączyć części statyczne i dynamiczne: wszystko, co da się prerenderować (w tym `'use cache'`), trafia do powłoki i jest serwowane natychmiast, a dane z żądania strumieniują się wewnątrz `<Suspense>`. W Next.js 16 włącza się to przez `cacheComponents: true` zamiast dawnej eksperymentalnej flagi.",
    sources: ["next-cache-components", "next-caching", "next-upgrade-16"],
  },
  {
    question: "Jak w App Router wcześniej załadować dane dla komponentów klienckich z TanStack Query?",
    options: [
      "`prefetchQuery` na serwerze i `HydrationBoundary`",
      "Wywołać `useQuery` bezpośrednio w asynchronicznym komponencie serwerowym",
      "Umieścić instancję `QueryClient` w eksporcie `metadata` strony",
    ],
    answer: 0,
    explanation:
      "Komponent serwerowy tworzy `QueryClient`, wykonuje `prefetchQuery` i przekazuje stan cache przez `<HydrationBoundary state={dehydrate(qc)}>`. Kliencki `useQuery` z tym samym kluczem dostaje dane od razu. Hooki nie działają w komponentach serwerowych.",
    sources: ["tq-ssr", "next-fetching"],
  },
  {
    question: "Co się stanie przy imporcie komponentu serwerowego do pliku z `'use client'`?",
    options: [
      "Stanie się on kliencki, a kod serwerowy się zepsuje lub wycieknie",
      "Pozostanie serwerowy: Next.js rozdzieli moduły podczas budowania",
      "Import zostanie zignorowany, a komponent się nie wyrenderuje",
    ],
    answer: 0,
    explanation:
      "Wszystko, co importuje moduł kliencki, trafia do paczki klienckiej. Jeśli komponent odwoływał się do bazy, build się wysypie (albo gorzej — kod trafi do przeglądarki). Komponent serwerowy przekazuje się do klienckiego jako `children` lub inny prop z rodzica serwerowego.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "Jak wykonać kod (np. analitykę) po wysłaniu odpowiedzi, nie opóźniając użytkownika?",
    options: [
      "Użyć `after()` z `next/server`",
      "Uruchomić promise bez `await` w komponencie serwerowym",
      "Wywołać `setTimeout` w komponencie serwerowym",
    ],
    answer: 0,
    explanation:
      "`after(() => log(...))` planuje pracę po zakończeniu odpowiedzi (w komponentach serwerowych, Server Actions, Route Handlers, proxy). „Wiszący” promise w środowisku serverless może zostać przerwany po zakończeniu funkcji, a jego błędy giną.",
    sources: ["next-after"],
  },
  {
    question: "Jak w Next.js wysłać klientowi tylko część danych z bazy, by nie wyciekło nic zbędnego (np. hash hasła)?",
    options: [
      "Zwracać z warstwy dostępu do danych DTO z tylko potrzebnymi polami",
      "Przekazać cały obiekt użytkownika: React ukryje zbędne pola",
      "Usuwać zbędne pola w komponencie klienckim po ich otrzymaniu",
    ],
    answer: 0,
    explanation:
      "Wszystko w propsach komponentu klienckiego jest serializowane do HTML i RSC payload i widoczne w DevTools. Zaleca się Data Access Layer, który sprawdza uprawnienia i zwraca minimalne DTO. Można też użyć taint API, by zabronić przekazywania określonych obiektów do klienta.",
    sources: ["next-data-security"],
  },
  {
    question: "Czym `revalidatePath('/blog/[slug]', 'page')` różni się od `revalidatePath('/blog/my-post')`?",
    options: [
      "Pierwsze obejmuje wszystkie strony wzorca, drugie — jedną konkretną ścieżkę",
      "Niczym: drugi argument `'page'` jest po prostu ignorowany",
      "Pierwsze unieważnia tylko layout, drugie tylko stronę",
    ],
    answer: 0,
    explanation:
      "Jeśli przekazujesz wzorzec z segmentem dynamicznym, trzeba podać typ `'page'` lub `'layout'`, a unieważnienie obejmie wszystkie ścieżki pasujące do wzorca. Konkretna ścieżka unieważnia jedną stronę. `revalidatePath('/', 'layout')` resetuje całą aplikację.",
    sources: ["next-revalidatePath"],
  },
  {
    question: "Gdzie przechowywać tajny klucz API używany w komponencie serwerowym?",
    options: [
      "W zmiennej środowiskowej bez prefiksu `NEXT_PUBLIC_`",
      "W `NEXT_PUBLIC_API_KEY`, by był dostępny wszędzie",
      "Bezpośrednio w kodzie komponentu — i tak jest serwerowy",
    ],
    answer: 0,
    explanation:
      "Zmienne bez prefiksu są dostępne tylko na serwerze. Zmienne `NEXT_PUBLIC_*` są wstawiane do paczki klienckiej i widoczne dla wszystkich. Hardkodowanie trafia do repozytorium. Pliki `.env*.local` nie są commitowane, a w produkcji wartości ustawia się na platformie.",
    sources: ["next-env", "next-data-security"],
  },
  {
    question: "Co robi `connection()` z `next/server`?",
    options: [
      "Sygnalizuje, że renderowanie od tego miejsca musi czekać na prawdziwe żądanie",
      "Otwiera pulę połączeń z bazą danych dla bieżącego żądania",
      "Sprawdza, czy użytkownik ma połączenie z internetem",
    ],
    answer: 0,
    explanation:
      "Jest potrzebne, gdy komponent używa wartości, których nie wolno obliczać podczas prerenderingu, ale nie odwołuje się do `cookies()` ani `headers()`: np. `Math.random()` lub bieżący czas. Przy Cache Components taki komponent umieszcza się wewnątrz `<Suspense>`.",
    sources: ["next-connection"],
  },
  {
    question: "Dlaczego `useFormStatus` jest wygodny w formularzach z Server Actions?",
    options: [
      "Daje stan `pending` formularza rodzica, by zablokować przycisk",
      "Zwraca wynik walidacji każdego pola formularza",
      "Pozwala wysłać formularz programowo, bez przycisku i kliknięcia",
    ],
    answer: 0,
    explanation:
      "Hook wywołuje się w komponencie wewnątrz `<form>` (zwykle w przycisku wysyłania): `const { pending } = useFormStatus()`. Pozwala to zrobić wielokrotnego użytku `<SubmitButton>`. Wynik akcji i błędy trzyma `useActionState`.",
    sources: ["react-useFormStatus", "next-mutating"],
  },
  {
    question: "Który plik ustawia fallback slotu trasy równoległej przy pełnym przeładowaniu strony?",
    options: ["`default.tsx`", "`fallback.tsx`", "`slot.tsx`"],
    answer: 0,
    explanation:
      "Przy miękkiej nawigacji Next.js pamięta aktywny stan slotów. Po przeładowaniu nie może przywrócić stanu slotów niepasujących do URL, więc renderuje ich `default.tsx` (lub 404, jeśli pliku nie ma). Dla modala `@modal/default.tsx` zwykle zwraca `null`.",
    sources: ["next-parallel-routes"],
  },
  {
    question: "Czym trasa statyczna różni się od dynamicznej pod względem renderowania?",
    options: [
      "Statyczna — podczas budowania, dynamiczna — przy każdym żądaniu",
      "Trasa statyczna nie może zawierać żadnego JavaScriptu",
      "Dynamiczna to każda trasa z segmentem `[param]` w ścieżce",
    ],
    answer: 0,
    explanation:
      "Trasa staje się dynamiczna, gdy używa danych żądania: `cookies()`, `headers()`, `searchParams`, niezcache'owanych żądań. Sam segment `[slug]` tego nie robi — można go prerenderować przez `generateStaticParams`. Przy Cache Components granica przebiega wewnątrz strony (PPR).",
    sources: ["next-rendering-philosophy", "next-caching"],
  },
  {
    question: "Gdzie w App Router poprawnie sprawdzać autoryzację?",
    options: [
      "Blisko danych: w Data Access Layer, Server Actions i Route Handlers",
      "Tylko w `proxy.ts` — za nim wszystkie trasy są uznawane za chronione",
      "Tylko w komponencie klienckim, ukrywając przyciski przed gośćmi",
    ],
    answer: 0,
    explanation:
      "Proxy nadaje się do optymistycznych sprawdzeń i przekierowań, ale nie powinien być jedyną ochroną: Server Actions wywołuje się bezpośrednio, a layouty nie przerenderowują się przy nawigacji. Sesję i uprawnienia sprawdzaj niezawodnie tam, gdzie dane są czytane i zmieniane. Ukrywanie przycisków na kliencie to nie bezpieczeństwo.",
    sources: ["next-authentication", "next-data-security"],
  },
  {
    question: "Jak ograniczyć ścieżki, na których działa `proxy.ts`?",
    options: [
      "Wyeksportować `config` z `matcher`",
      "Utworzyć osobne proxy w każdym folderze trasy",
      "Wymienić ścieżki w sekcji `proxyRoutes` w `next.config`",
    ],
    answer: 0,
    explanation:
      "`export const config = { matcher: ['/dashboard/:path*'] }` — proxy działa tylko dla pasujących ścieżek. Pliki statyczne i `_next` zwykle się wyklucza, by oszczędzać zasoby. Proxy jest jedno na projekt i leży w korzeniu (lub w `src`).",
    sources: ["next-proxy"],
  },
  {
    question: "Do czego przydaje się `opengraph-image.tsx`?",
    options: [
      "Do generowania obrazka OG trasy z JSX podczas budowania lub na żądanie",
      "Do optymalizacji wszystkich obrazków na stronie pod udostępnianie w social media",
      "Do dodawania znaku wodnego do wszystkich obrazków trasy",
    ],
    answer: 0,
    explanation:
      "Plik według konwencji zwraca `ImageResponse` z markupem JSX — Next.js zamienia go w PNG i dodaje potrzebne znaczniki `<meta>`. Wygodne dla podglądów artykułów z tytułem. W Next.js 16 `params` w takich plikach też jest promise'em.",
    sources: ["next-metadata", "next-upgrade-16"],
  },
  {
    question: "Gdzie wykonuje się kod komponentu klienckiego przy pierwszym ładowaniu strony?",
    options: [
      "Zarówno na serwerze (dla HTML), jak i w przeglądarce (hydratacja)",
      "Tylko w przeglądarce; na serwerze jest pomijany",
      "Tylko na serwerze; przeglądarka dostaje gotowy HTML bez JS",
    ],
    answer: 0,
    explanation:
      "`'use client'` nie oznacza „tylko klient”: komponent jest prerenderowany do HTML na serwerze, a potem hydratowany. Dlatego podczas renderu nie można bez sprawdzeń odwoływać się do `window` — użyj efektów lub `next/dynamic` z `ssr: false`.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "Jak aktualizują się dane strony po akcji, jeśli użyto `revalidateTag(tag, 'max')`?",
    options: [
      "Odwiedzający dostaje stare dane, a świeże są generowane w tle",
      "Strona natychmiast przeładowuje się u wszystkich użytkowników",
      "Dane zaktualizują się dopiero po przebudowaniu projektu",
    ],
    answer: 0,
    explanation:
      "Profil `'max'` daje semantykę stale-while-revalidate: wpis jest oznaczany jako nieaktualny, pierwsze żądanie dostaje starą wersję i uruchamia regenerację. Jeśli autor zmiany ma od razu zobaczyć wynik, użyj `updateTag` w Server Action.",
    sources: ["next-revalidateTag", "next-updateTag"],
  },
  {
    question: "Czym steruje `staleTimes` w `next.config`?",
    options: [
      "Czasem życia segmentów w klienckim cache routera",
      "Czasem życia odpowiedzi `fetch` w cache serwera",
      "Timeoutem generowania stron statycznych podczas budowania",
    ],
    answer: 0,
    explanation:
      "Kliencki cache routera przechowuje RSC payload odwiedzonych i wcześniej załadowanych segmentów, by nawigacja wstecz/naprzód i ponowne wizyty były natychmiastowe. `staleTimes` ustala, jak długo te dane są uznawane za świeże dla stron dynamicznych i statycznych. Serwerowy cache danych konfiguruje się osobno.",
    sources: ["next-staleTimes", "next-prefetching"],
  },
  {
    question: "Jak zwrócić błędy walidacji do formularza z Server Action?",
    options: [
      "Zwrócić obiekt błędów i odczytać go przez `useActionState`",
      "Rzucić wyjątek — pojawi się obok pola",
      "Wywołać `alert()` na serwerze",
    ],
    answer: 0,
    explanation:
      "Oczekiwane błędy (niepoprawny e-mail) zwraca się jako dane: `return { errors: { email: 'Invalid address' } }`. Formularz renderuje je przez stan z `useActionState`. Wyjątki są dla nieoczekiwanych awarii — łapie je `error.tsx`.",
    sources: ["next-mutating", "next-error-handling", "react-useActionState"],
  },
];

export default questions;
