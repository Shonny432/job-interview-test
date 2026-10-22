import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Czym jest RSC payload?",
    options: [
      "Zserializowanym wynikiem renderu Server Components z referencjami do klienckich",
      "JSON-em ze wszystkimi propsami strony, jak `__NEXT_DATA__` w Pages Router",
      "Skompresowaną paczką JS komponentów serwerowych wykonywaną w przeglądarce",
    ],
    answer: 0,
    explanation:
      "Payload zawiera wyrenderowane drzewo komponentów serwerowych, miejsca na komponenty klienckie z referencjami do ich chunków JS oraz ich propsy. Przy pierwszym ładowaniu jest osadzony w HTML (dla hydratacji); przy nawigacji po stronie klienta pobiera się go osobno. Kod komponentów serwerowych nigdy nie trafia do przeglądarki.",
    sources: ["next-server-client", "react-server-components"],
  },
  {
    question: "Co dzieje się przy nawigacji po stronie klienta przez `<Link>` w App Router?",
    options: [
      "Ładowany jest RSC payload nowego segmentu, a React aktualizuje tylko zmienione części",
      "Przeglądarka pobiera nowy HTML i całkowicie zastępuje nim bieżący dokument",
      "Klient ponownie uruchamia wszystkie komponenty serwerowe w przeglądarce",
    ],
    answer: 0,
    explanation:
      "Router pobiera payload (lub bierze wcześniej załadowany z klienckiego cache) i uzgadnia go z bieżącym drzewem: wspólne layouty są zachowane, a stan kliencki nie przepada. Jeśli segment wciąż się ładuje, pokazywany jest `loading.tsx`. Nie ma pełnego przeładowania dokumentu.",
    sources: ["next-linking", "next-prefetching"],
  },
  {
    question: "Przy `cacheComponents: true` dev overlay pokazuje „blocking route”. Co to oznacza?",
    options: [
      "Niezcache'owane dane są czytane poza `<Suspense>` i blokują statyczną powłokę",
      "Trasa jest zablokowana regułami `proxy.ts` i zwraca odpowiedź 403 Forbidden",
      "Dwie trasy w różnych grupach konfliktują o ten sam URL",
    ],
    answer: 0,
    explanation:
      "Przy Cache Components każda asynchroniczna praca musi być albo zcache'owana przez `'use cache'` (trafia do powłoki), albo opakowana w `<Suspense>` (strumieniuje się w czasie żądania). Inaczej cała strona czekałaby na dane. Ta zasada jest sprawdzana w trybie deweloperskim i podczas budowania.",
    sources: ["next-caching", "next-cache-components"],
  },
  {
    question: "Czym `'use cache: remote'` różni się od `'use cache'`?",
    options: [
      "Przechowuje wynik w zdalnym handlerze wspólnym dla wszystkich instancji, kosztem opóźnienia sieci",
      "Cache'uje wynik na kliencie w IndexedDB zamiast w pamięci serwera Next.js",
      "Pozwala czytać `cookies()` i `headers()` wewnątrz zcache'owanej funkcji",
    ],
    answer: 0,
    explanation:
      "Zwykłe `'use cache'` domyślnie przechowuje wpisy w pamięci procesu (LRU), więc w serverless i przy wielu instancjach cache jest krótkotrwały i niewspółdzielony. `remote` używa handlera z `cacheHandlers` (Redis, KV platformy) — pewniej, ale drożej. Dostęp do danych żądania daje `'use cache: private'`, a nie `remote`.",
    sources: ["next-use-cache", "next-self-hosting"],
  },
  {
    question: "Co trzeba uwzględnić przy self-hostingu Next.js na kilku podach Kubernetes?",
    options: [
      "Cache jest domyślnie lokalny dla każdej instancji; potrzebny jest wspólny cache handler",
      "Nic: instancje automatycznie synchronizują między sobą cache",
      "Trzeba wyłączyć ISR — działa tylko na Vercel",
    ],
    answer: 0,
    explanation:
      "Domyślnie wygenerowane strony i dane są przechowywane w pamięci i na dysku każdego poda. Bez wspólnego magazynu `revalidateTag` na jednym podzie nie unieważni cache na innych, a użytkownicy zobaczą różne wersje. Warto też skonfigurować `deploymentId` dla ochrony przed version skew przy rolling update.",
    sources: ["next-self-hosting"],
  },
  {
    question: "Co oznaczają parametry `stale`, `revalidate` i `expire` w `cacheLife`?",
    options: [
      "Świeżość na kliencie, odświeżenie w tle i pełny czas wygaśnięcia",
      "Timeouty żądania, ponowienia i zamknięcia połączenia ze źródłem",
      "Czas życia wpisu odpowiednio w pamięci, na dysku i w CDN",
    ],
    answer: 0,
    explanation:
      "`stale` to czas, przez który klient używa danych bez sprawdzania serwera. Po `revalidate` kolejne żądanie dostaje zcache'owaną wartość i uruchamia regenerację w tle. Po `expire` bez żądań wpis jest uznawany za wygasły, a kolejne żądanie czeka na nową wartość.",
    sources: ["next-cacheLife"],
  },
  {
    question: "Jak Next.js chroni Server Actions przed CSRF?",
    options: [
      "Przyjmuje tylko POST i porównuje nagłówek Origin z Host",
      "Wymaga tokena CSRF w każdym formularzu, który trzeba wygenerować ręcznie",
      "Nie chroni: ochrona przed CSRF jest całkowicie po stronie dewelopera",
    ],
    answer: 0,
    explanation:
      "Server Actions można wywołać tylko metodą POST, a Next.js porównuje `Origin` z `Host` (lub `X-Forwarded-Host`), odrzucając żądania z innych stron. Razem z ciasteczkami SameSite blokuje to większość ataków CSRF. Dla złożonych konfiguracji proxy jest `serverActions.allowedOrigins`. Autoryzację i tak sprawdza się wewnątrz akcji.",
    sources: ["next-data-security", "next-server-actions-guide"],
  },
  {
    question: "Dlaczego nie należy używać Server Actions do ładowania danych?",
    options: [
      "Klient wywołuje je po jednej, jako niecache'owane POST — wolno przy odczytach",
      "Server Actions nie mogą zwracać wartości do wywołującego kodu klienta",
      "Działają tylko podczas budowania i nie działają w runtime",
    ],
    answer: 0,
    explanation:
      "Next.js wysyła Server Actions z jednego klienta sekwencyjnie: druga czeka na pierwszą, by drzewo serwerowe było spójne z wynikiem. To dobre dla mutacji, ale złe dla równoległych odczytów. Dane ładuj w Server Components (lub Route Handlers), a akcje zostaw na zmiany.",
    sources: ["next-server-actions-guide", "next-mutating"],
  },
  {
    question: "Server Action jest zadeklarowana wewnątrz komponentu i używa zmiennej z domknięcia. Co się z nią dzieje?",
    options: [
      "Przechwycone wartości są szyfrowane, wysyłane do klienta i odsyłane przy wywołaniu",
      "Domknięcia są zabronione: Server Action musi być w osobnym pliku",
      "Wartość jest ponownie obliczana z bazy na serwerze przy każdym wywołaniu akcji",
    ],
    answer: 0,
    explanation:
      "Next.js serializuje przechwycone zmienne, szyfruje je i osadza w stronie, by przy wywołaniu odtworzyć domknięcie. Szyfrowanie chroni przed przypadkowymi wyciekami, ale lepiej nie trzymać sekretów w domknięciach. Przy wielu instancjach potrzebny jest wspólny klucz szyfrowania (`NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`).",
    sources: ["next-data-security"],
  },
  {
    question: "Do czego w Next.js służy React Taint API (`experimental_taintObjectReference`)?",
    options: [
      "Do zakazania przekazania konkretnego obiektu do komponentu klienckiego",
      "Do oznaczenia zcache'owanych danych jako nieaktualnych, by przeładować je z serwera",
      "Do szyfrowania wartości ciasteczek przed wysłaniem do przeglądarki użytkownika",
    ],
    answer: 0,
    explanation:
      "Na przykład oznacz obiekt użytkownika z bazy: jeśli trafi w całości do propsów komponentu klienckiego, pojawi się błąd. To zabezpieczenie, a nie główna ochrona — podstawą jest Data Access Layer zwracający tylko potrzebne pola. Wymaga włączenia `taint` w konfiguracji.",
    sources: ["next-data-security"],
  },
  {
    question: "Dlaczego CSP z nonce czyni strony dynamicznymi?",
    options: [
      "Nonce jest unikalny dla każdej odpowiedzi, więc HTML nie da się prerenderować",
      "Przeglądarki i CDN nie cache'ują stron z nagłówkiem CSP",
      "Nonce'y są obsługiwane tylko przy renderowaniu po stronie klienta",
    ],
    answer: 0,
    explanation:
      "Next.js odczytuje nonce z nagłówka żądania (generowanego w proxy) i dodaje go do swoich skryptów. Statyczny HTML ze stałym nonce nie ma sensu. Alternatywa zachowująca statyczność to CSP oparte na hashach lub luźniejsze polityki.",
    sources: ["next-csp", "mdn-csp"],
  },
  {
    question: "Dlaczego `error.tsx` w produkcji dostaje ogólny komunikat dla błędu z komponentu serwerowego?",
    options: [
      "Next.js ukrywa szczegóły i przekazuje `digest` do wyszukania w logach",
      "Komponenty serwerowe nie mogą rzucać błędów z tekstem komunikatu",
      "Komunikat jest przycinany do 20 znaków, by oszczędzić rozmiar payloadu",
    ],
    answer: 0,
    explanation:
      "Tekst błędu może zawierać SQL, ścieżki i sekrety, więc klient dostaje ogólny komunikat plus `error.digest` — hash do znalezienia pełnego błędu w logach serwera. W trybie deweloperskim pełny komunikat jest dostępny.",
    sources: ["next-error-file", "next-error-handling"],
  },
  {
    question: "Co zmieniło się w ustawieniach domyślnych `next/image` w Next.js 16?",
    options: [
      "`minimumCacheTTL` wzrósł do 4 godzin, a `priority` zastąpiono przez `preload`",
      "Komponent działa teraz tylko z zewnętrznymi obrazkami z `remotePatterns`",
      "Optymalizacja jest teraz domyślnie wyłączona i włączana osobną flagą",
    ],
    answer: 0,
    explanation:
      "Wcześniej obrazki bez `Cache-Control` były rewalidowane co 60 sekund, co obciążało CPU. Teraz domyślny TTL to 4 godziny. Prop `priority` jest przestarzały na rzecz bardziej jawnego `preload`. Ponadto lokalne obrazki z query stringiem wymagają `images.localPatterns.search`, a domyślne `qualities` to `[75]`.",
    sources: ["next-upgrade-16", "next-image"],
  },
  {
    question: "Jakiego runtime używa `proxy.ts` w Next.js 16?",
    options: [
      "Node.js, bez możliwości przełączenia na Edge",
      "Tylko Edge; API Node.js nie są w nim dostępne",
      "Jest wybierany automatycznie w zależności od obciążenia",
    ],
    answer: 0,
    explanation:
      "W Next.js 16 proxy zawsze działa na Node.js: dostępne są znane biblioteki i API. Jeśli konkretnie potrzebujesz runtime edge, na razie zostań przy przestarzałym `middleware`. Runtime tras (strony, Route Handlers) nadal konfiguruje się osobno.",
    sources: ["next-proxy", "next-upgrade-16"],
  },
  {
    question: "Jakie optymalizacje prefetchu pojawiły się w routerze Next.js 16?",
    options: [
      "Deduplikacja layoutów i przyrostowy prefetch tylko brakujących części",
      "Wcześniejsze ładowanie wszystkich tras aplikacji naraz przy pierwszej wizycie",
      "Rezygnacja z prefetchu linków na rzecz cache Service Workera",
    ],
    answer: 0,
    explanation:
      "Jeśli kilka linków prowadzi do stron ze wspólnym layoutem, jest on pobierany raz. Router ładuje tylko to, czego nie ma jeszcze w klienckim cache. Żądań może być więcej, ale ich łączny rozmiar jest wyraźnie mniejszy. Zmiany w kodzie nie są potrzebne.",
    sources: ["next-upgrade-16", "next-prefetching"],
  },
  {
    question: "Co robi `optimizePackageImports`?",
    options: [
      "Ładuje z bibliotek z barrel files tylko używane moduły",
      "Kompresuje wszystkie pakiety npm do jednego pliku podczas budowania",
      "Automatycznie aktualizuje zależności do najnowszych wersji",
    ],
    answer: 0,
    explanation:
      "Import `import { Icon } from 'big-icon-lib'` przez barrel file może pociągnąć setki modułów i spowolnić build oraz serwer deweloperski. Opcja przepisuje importy na konkretne moduły. Dla części popularnych bibliotek Next.js robi to automatycznie.",
    sources: ["next-package-bundling"],
  },
  {
    question: "Kiedy potrzebna jest opcja `serverExternalPackages`?",
    options: [
      "Gdy pakietu serwerowego nie da się zbundlować, np. z modułami natywnymi",
      "Gdy trzeba załadować React i React DOM osobnym skryptem z CDN",
      "Gdy pakiet jest używany tylko w przeglądarce i nie jest potrzebny na serwerze",
    ],
    answer: 0,
    explanation:
      "Domyślnie Next.js bundluje zależności kodu serwerowego. Niektóre pakiety (z natywnymi wiązaniami, dynamicznymi `require`, dużymi plikami binarnymi) psują się przy bundlowaniu — oznacza się je jako zewnętrzne i ładuje z `node_modules` w runtime. Popularne przypadki są już na domyślnej liście.",
    sources: ["next-package-bundling"],
  },
  {
    question: "Do czego służy Draft Mode?",
    options: [
      "Do tymczasowego dynamicznego renderowania stron statycznych dla podglądu szkiców z CMS",
      "Do włączenia trybu debugowania ze szczegółowymi logami serwera w produkcji",
      "Do ukrycia niegotowych stron przed wyszukiwarkami przez `noindex`",
    ],
    answer: 0,
    explanation:
      "Redaktor CMS wchodzi na specjalny Route Handler, który wywołuje `(await draftMode()).enable()` i ustawia ciasteczko. Dopóki ciasteczko jest obecne, strony omijają cache i ładują treść szkicu. Pozostali odwiedzający nadal dostają szybkie strony statyczne.",
    sources: ["next-draft-mode"],
  },
  {
    question: "Do czego służy plik `instrumentation.ts` z funkcją `register()`?",
    options: [
      "Do jednorazowego uruchomienia kodu przy starcie serwera, np. konfiguracji OpenTelemetry",
      "Do dodania globalnego handlera kliknięć na wszystkich stronach dla analityki",
      "Do opisania kolejności budowania i ładowania modułów dla Turbopack",
    ],
    answer: 0,
    explanation:
      "`register` jest wywoływana przy starcie nowej instancji serwera — nadaje się do inicjalizacji tracingu, monitoringu i logowania. `onRequestError` pozwala wysyłać błędy serwera do systemu monitoringu. Dla strony klienta jest `instrumentation-client.ts`.",
    sources: ["next-instrumentation"],
  },
  {
    question: "Jak zaimplementować ISR na żądanie przez webhook z CMS?",
    options: [
      "Route Handler sprawdza sekret i wywołuje `revalidateTag`/`revalidatePath`",
      "Ustawić zadanie cron, które co 5 minut przebudowuje cały projekt",
      "Wywołać `router.refresh()` z panelu CMS przez jego SDK",
    ],
    answer: 0,
    explanation:
      "CMS wysyła POST na `/api/revalidate` z sekretem i ID zmienionego wpisu; handler weryfikuje podpis i unieważnia odpowiednie tagi. Strony aktualizują się przy następnym żądaniu, bez pełnego przebudowania. `router.refresh()` to API klienckie.",
    sources: ["next-revalidateTag", "next-route-handlers", "next-isr"],
  },
  {
    question: "Dlaczego providery Context w App Router wynosi się do osobnego komponentu klienckiego?",
    options: [
      "Context to możliwość kliencka; layout renderuje wrapper `<Providers>`",
      "Providery spowalniają renderowanie serwerowe, więc wyłącza się je na serwerze",
      "Next.js zabrania używania Context w jakichkolwiek plikach layoutów",
    ],
    answer: 0,
    explanation:
      "`createContext` i providery to możliwości klienckie. Tworzy się `providers.tsx` z `'use client'` i renderuje go w głównym layoucie wokół `children`. Dzięki temu `children` pozostają komponentami serwerowymi. Providery umieszcza się jak najgłębiej, by więcej drzewa pozostało statyczne.",
    sources: ["next-server-client"],
  },
  {
    question: "Zewnętrzny komponent używa hooków, ale nie ma `'use client'`. Jak użyć go na stronie serwerowej?",
    options: [
      "Reeksportować go z własnego pliku z `'use client'`",
      "Opakować go w `<Suspense>` — to wystarczy",
      "Nie da się: takie biblioteki są niekompatybilne z App Router",
    ],
    answer: 0,
    explanation:
      "Utwórz `components/carousel.tsx`: `'use client'; export { Carousel } from 'acme-carousel'`. Teraz komponent serwerowy importuje kliencki wrapper. Wiele bibliotek samo już dodało dyrektywę. Suspense nie ma nic wspólnego z granicą kliencką.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "Jak pobrać konfigurację ze zmiennej środowiskowej w runtime, a nie podczas budowania?",
    options: [
      "Czytać `process.env` na serwerze przy renderowaniu dynamicznym i przekazać klientowi",
      "Użyć `NEXT_PUBLIC_` — wartości są podstawiane przy każdym żądaniu",
      "Umieścić konfigurację w `public/env.js` i aktualizować plik ręcznie",
    ],
    answer: 0,
    explanation:
      "Zmienne `NEXT_PUBLIC_*` są wstawiane do paczki podczas `next build`, więc jednego obrazu Docker nie da się przenosić między środowiskami z różnymi wartościami. Kod serwerowy czyta `process.env` w runtime; jeśli wartość jest potrzebna na kliencie, przekaż ją propsami z dynamicznie renderowanego komponentu serwerowego.",
    sources: ["next-env", "next-self-hosting"],
  },
  {
    question: "Czym jest version skew i jak pomaga w nim `deploymentId`?",
    options: [
      "Klient starej wersji i serwer nowej; ID pomaga to wykryć",
      "Różne wersje Node.js w dev i prod; ID przypina jedną wersję runtime",
      "Różne wersje React w zależnościach; ID wybiera jedną do paczki",
    ],
    answer: 0,
    explanation:
      "Użytkownik z kartą otwartą po wdrożeniu może żądać chunków lub Server Actions, których już nie ma. Z `deploymentId` Next.js dodaje identyfikator do żądań zasobów i nawigacji, a przy niezgodności robi pełne przeładowanie zamiast niezrozumiałych błędów.",
    sources: ["next-self-hosting"],
  },
  {
    question: "Dlaczego przy Cache Components `generateStaticParams` nie może zwrócić pustej tablicy?",
    options: [
      "Potrzebuje przykładowych parametrów, by zwalidować trasę podczas budowania",
      "Pusta tablica wyłącza trasę i zawsze odpowiada ona 404",
      "Ograniczenie dotyczy tylko tras `[...slug]`",
    ],
    answer: 0,
    explanation:
      "Build renderuje trasę z przykładowymi parametrami i sprawdza, czy `cookies()`, `headers()` i inne dane żądania są wewnątrz Suspense. Bez przykładów walidacja jest niemożliwa, więc to błąd budowania. Można zwrócić placeholder i obsłużyć go przez `notFound()`, ale osłabia to sprawdzenie.",
    sources: ["next-generateStaticParams", "next-dynamic-routes"],
  },
  {
    question: "Jak zachowują się Route Handlers `GET` przy włączonych Cache Components?",
    options: [
      "Podlegają temu samemu modelowi prerenderingu co strony",
      "Są zawsze dynamiczne i nigdy nie są cache'owane",
      "Są zawsze statyczne; dane żądania są w nich niedostępne",
    ],
    answer: 0,
    explanation:
      "Jeśli handler nie czyta danych żądania, jego odpowiedź może zostać prerenderowana podczas budowania; dla części cache'owalnych używa się `'use cache'`. Dostęp do `request`, `cookies()` lub `headers()` czyni odpowiedź dynamiczną. Metody inne niż `GET` są zawsze dynamiczne.",
    sources: ["next-route-handlers", "next-caching"],
  },
  {
    question: "Co dostanie użytkownik, jeśli Server Action wywoła `revalidatePath` i zwróci wartość?",
    options: [
      "Wynik akcji i zaktualizowane drzewo RSC w jednej odpowiedzi",
      "Tylko wynik; stronę trzeba przeładować ręcznie",
      "Dwie osobne odpowiedzi: najpierw wynik, potem HTML",
    ],
    answer: 0,
    explanation:
      "Next.js optymalizuje mutacje: odpowiedź Server Action zawiera zarówno zwróconą wartość, jak i nowy payload dotkniętych tras (jeden roundtrip). Użytkownik od razu widzi zaktualizowany UI bez dodatkowego żądania.",
    sources: ["next-server-actions-guide", "next-revalidatePath"],
  },
  {
    question: "Jak podłączyć UI do `forbidden()` i `unauthorized()`?",
    options: [
      "Włączyć `authInterrupts` i dodać `forbidden.tsx`",
      "Działają od razu i pokazują standardową stronę 404",
      "To aliasy `redirect('/login')` z innym statusem HTTP",
    ],
    answer: 0,
    explanation:
      "Funkcje przerywają renderowanie i pokazują odpowiedni UI ze statusami 403 i 401 — podobnie jak `notFound()`. Na razie to funkcja eksperymentalna. Przekierowanie do logowania robi się osobno, przez `redirect()`.",
    sources: ["next-docs"],
  },
  {
    question: "Jak zachowują się metadane z `generateMetadata` przy streamingu?",
    options: [
      "Strumieniują się po UI, ale dla botów czytających tylko HTML odpowiedź na nie czeka",
      "Zawsze blokują całą odpowiedź, dopóki metadane nie zostaną obliczone",
      "Są generowane na kliencie po hydratacji przez `document.title`",
    ],
    answer: 0,
    explanation:
      "Strumieniowanie metadanych pozwala nie opóźniać pierwszego bajtu wolnym `generateMetadata`. Boty, które nie wykonują JS (wykrywane po User-Agent, konfigurowane przez `htmlLimitedBots`), dostają metadane w `<head>` przed wysłaniem HTML, więc SEO nie cierpi.",
    sources: ["next-generateMetadata", "next-metadata"],
  },
  {
    question: "Kiedy włączać `reactCompiler` w Next.js 16?",
    options: [
      "Gdy kod przestrzega zasad React; buildy stają się wolniejsze",
      "Zawsze: jest domyślnie włączony i nie wpływa na czas budowania",
      "Nigdy w produkcji: jest eksperymentalny i niestabilny",
    ],
    answer: 0,
    explanation:
      "W Next.js 16 obsługa React Compiler jest stabilna, ale domyślnie wyłączona. Kompilator opiera się na Babel, więc buildy zwalniają. Pomija komponenty łamiące zasady React — pomaga je znaleźć plugin ESLint.",
    sources: ["next-react-compiler", "react-compiler", "next-upgrade-16"],
  },
  {
    question: "Jak `unstable_rethrow` pomaga w obsłudze błędów?",
    options: [
      "Ponownie rzuca wewnętrzne błędy Next.js z `catch`",
      "Ponawia nieudane żądanie podaną liczbę razy z opóźnieniem",
      "Wysyła błąd do podłączonego systemu monitoringu",
    ],
    answer: 0,
    explanation:
      "Next.js używa wyjątków do sterowania przepływem: `redirect`, `notFound`, sygnały renderowania dynamicznego. Szeroki `try/catch` je połyka i psuje zachowanie. `unstable_rethrow(err)` na początku `catch` ponownie rzuca takie błędy i zostawia tylko „prawdziwe”.",
    sources: ["next-redirect", "next-error-handling"],
  },
  {
    question: "Dlaczego layout nie powinien być jedynym miejscem sprawdzania autoryzacji?",
    options: [
      "Layout nie przerenderowuje się przy nawigacji po stronie klienta między stronami potomnymi",
      "Layout działa tylko podczas budowania i nie widzi ciasteczek użytkownika",
      "W layoucie zabronione jest wywoływanie `redirect()` i `cookies()`",
    ],
    answer: 0,
    explanation:
      "Dzięki częściowemu renderowaniu wspólny layout nie wykonuje się ponownie przy nawigacji w obrębie segmentu, więc sprawdzenie w nim może nie zadziałać. Poza tym Route Handlers i Server Actions są dostępne bezpośrednio. Trzymaj sprawdzenia blisko danych — w Data Access Layer, stronach i akcjach.",
    sources: ["next-authentication", "next-data-security"],
  },
  {
    question: "Czym są Multi-Zones?",
    options: [
      "Kilkoma niezależnymi aplikacjami Next.js pod jedną domeną, podzielonymi po ścieżkach",
      "Wdrożeniem jednej aplikacji naraz w kilku regionach chmury",
      "Podziałem strony na strefy z różnymi strategiami cache'owania",
    ],
    answer: 0,
    explanation:
      "Na przykład `/blog` i `/shop` to osobne aplikacje różnych zespołów, połączone przez rewrite'y. Nawigacja między strefami to pełne przeładowanie (zwykły `<a>`), w obrębie strefy — po stronie klienta. To jedno z podejść do mikrofrontendów.",
    sources: ["next-docs"],
  },
  {
    question: "Dlaczego dane strony bywają wysyłane dwukrotnie — w HTML i w RSC payload?",
    options: [
      "HTML służy szybkiemu malowaniu, payload — hydratacji",
      "To błąd występujący tylko w trybie dev z Turbopack",
      "Druga kopia to zapas na wypadek zerwania sieci",
    ],
    answer: 0,
    explanation:
      "Propsy komponentów klienckich są serializowane do payloadu osadzonego w stronie, nawet jeśli te same dane są już widoczne w HTML. Dlatego duże tablice przekazywane do komponentów klienckich powiększają odpowiedź. Pomaga paginacja, przekazywanie minimalnych pól i renderowanie dużych statycznych części na serwerze.",
    sources: ["next-server-client", "next-data-security"],
  },
  {
    question: "Co `<Link>` z domyślnymi ustawieniami wcześniej ładuje dla trasy dynamicznej?",
    options: [
      "Część drzewa do najbliższej granicy ładowania; resztę przy nawigacji",
      "Nic: trasy dynamiczne nigdy nie są wcześniej ładowane",
      "Całą stronę razem ze wszystkimi danymi żądania",
    ],
    answer: 0,
    explanation:
      "Dla treści statycznej ładowane jest wszystko; dla tras dynamicznych — wspólna część statyczna i fallback do `loading.tsx` lub Suspense. Nawigacja staje się natychmiastowa: użytkownik od razu widzi szkielet. Przy Partial Prefetching szczegóły zależą od powłoki PPR.",
    sources: ["next-prefetching", "next-loading"],
  },
  {
    question: "Czym `refresh()` z `next/cache` różni się od `revalidatePath`?",
    options: [
      "Odświeża kliencki router, nie dotykając cache serwera",
      "Całkowicie czyści cały cache serwera aplikacji",
      "To synonim `revalidatePath('/', 'layout')`",
    ],
    answer: 0,
    explanation:
      "`refresh()` w Server Action sprawia, że kliencki router ponownie pobiera bieżącą stronę — np. by zaktualizować licznik powiadomień, którego dane nie są cache'owane. Jeśli dane są zcache'owane, bez `revalidatePath`/`revalidateTag`/`updateTag` użytkownik zobaczy starą wartość.",
    sources: ["next-refresh", "next-upgrade-16"],
  },
  {
    question: "Jak Next.js 16 przyspiesza ponowne uruchomienia `next dev` i `next build`?",
    options: [
      "Turbopack domyślnie cache'uje artefakty budowania na dysku",
      "Build jest automatycznie przenoszony do chmurowych runnerów Vercel",
      "Sprawdzanie typów TypeScript jest domyślnie wyłączone",
    ],
    answer: 0,
    explanation:
      "Cache systemu plików Turbopack jest domyślnie włączony dla dev i build, więc restarty są wyraźnie szybsze. W CI warto cache'ować folder `.next/cache` między buildami. `next build` sprawdza typy, chyba że jawnie to wyłączono.",
    sources: ["next-upgrade-16", "next-turbopack"],
  },
  {
    question: "Do czego przydaje się `typedRoutes`?",
    options: [
      "TypeScript sprawdza ścieżki w `<Link href>` i `router.push`",
      "Przyspiesza routing przez kompilację tabeli tras",
      "Generuje otypowanego klienta REST dla wszystkich Route Handlers",
    ],
    answer: 0,
    explanation:
      "Next.js generuje typy dla wszystkich tras, a literówka w `href=\"/dashbord\"` staje się błędem kompilacji. Te same wygenerowane typy zasilają helpery `PageProps`/`LayoutProps`. Opcja nie wpływa na szybkość routingu.",
    sources: ["next-typescript"],
  },
  {
    question: "Czym runtime Edge różni się od Node.js dla tras?",
    options: [
      "Edge — ograniczony zestaw Web API i szybki start; Node.js — pełne API",
      "Edge to po prostu nowsza i szybsza wersja Node.js",
      "Kod Edge wykonuje się w przeglądarce użytkownika, jak Service Worker",
    ],
    answer: 0,
    explanation:
      "Runtime Edge działa bliżej użytkownika i szybko startuje, ale nie ma `fs`, wielu pakietów npm i modułów natywnych, a do tego ma limity rozmiaru. Dla większości aplikacji zalecany jest Node.js. W Next.js 16 proxy działa tylko na Node.js.",
    sources: ["next-docs", "next-proxy"],
  },
  {
    question: "Komponent pokazuje `new Date().toLocaleString()` i powoduje hydration mismatch. Jakie rozwiązanie jest najpoprawniejsze?",
    options: [
      "Pokazać czas po zamontowaniu lub ustalić go na serwerze",
      "Wyłączyć hydratację dla całej strony opcją `next.config`",
      "Opakować komponent w `React.memo`, by się nie przerenderowywał",
    ],
    answer: 0,
    explanation:
      "Serwer i klient są w różnych strefach czasowych i momentach, więc string się różni. Opcje: komponent kliencki pokazujący czas po zamontowaniu; formatowanie na serwerze ze stałą strefą; `suppressHydrationWarning` na elemencie ze znacznikiem czasu. Niezgodności często powodują też rozszerzenia przeglądarki.",
    sources: ["react-hydrateRoot", "next-server-client"],
  },
  {
    question: "Co daje `after()` w Route Handlerze w porównaniu z `await logEvent()` przed odpowiedzią?",
    options: [
      "Odpowiedź jest wysyłana od razu, a logowanie wykonuje się potem",
      "`after` wykonuje kod, zanim serwer w ogóle otrzyma żądanie",
      "`after` gwarantuje transakcyjność logowania z odpowiedzią",
    ],
    answer: 0,
    explanation:
      "Użytkownik nie musi czekać na analitykę, logi ani synchronizację z zewnętrznymi usługami. Platforma utrzymuje funkcję przy życiu, aż callbacki `after` się zakończą. Wewnątrz w Server Actions i Route Handlers można czytać `cookies()` i `headers()`.",
    sources: ["next-after"],
  },
  {
    question: "Jak upewnić się, że funkcja z `'use cache'` nie cache'uje razem danych różnych użytkowników?",
    options: [
      "Przekazać ID użytkownika jako argument: stanie się częścią klucza",
      "Wywołać `cookies()` wewnątrz funkcji, by pobrać id",
      "Użyć jednego globalnego klucza i czyścić cache ręcznie",
    ],
    answer: 0,
    explanation:
      "Klucz cache budowany jest z argumentów i przechwyconych wartości, więc `getDashboard(userId)` tworzy osobne wpisy. Czytanie `cookies()` wewnątrz zcache'owanej funkcji jest zabronione. Pamiętaj, że dane osobowe we wspólnym cache serwera to powód, by rozważyć `'use cache: private'`.",
    sources: ["next-use-cache", "next-caching"],
  },
  {
    question: "Jak działa wzorzec modala z zachowaniem URL w App Router?",
    options: [
      "Slot `@modal`, przechwycenie `(.)photo/[id]` i `default.tsx`",
      "Stan modala w Context i ręczne `history.pushState`",
      "Osobna trasa `/modal` otwierana wewnątrz `<iframe>`",
    ],
    answer: 0,
    explanation:
      "Przy nawigacji po stronie klienta trasa przechwytująca renderuje treść w slocie modala nad bieżącą stroną; URL odzwierciedla otwarty element, a linkiem można się podzielić. Przy bezpośrednim wejściu otwiera się pełna strona. Zamknięcie to `router.back()`. `default.tsx` gwarantuje pusty slot, gdy modal nie jest aktywny.",
    sources: ["next-parallel-routes", "next-intercepting-routes"],
  },
  {
    question: "Jaki jest poprawny skutek błędu w `generateStaticParams` podczas budowania?",
    options: [
      "Build się wysypie, a zepsuta wersja nie trafi do produkcji",
      "Next.js zignoruje błąd i zbuduje trasę bez stron",
      "Trasa automatycznie przełączy się na renderowanie po stronie klienta",
    ],
    answer: 0,
    explanation:
      "`generateStaticParams` wykonuje się podczas `next build` przed renderowaniem stron. Błąd (np. niedostępne API) przerywa build — lepiej niż wypuścić aplikację bez stron. Jeśli źródło jest zawodne, można zwrócić podzbiór ścieżek, a resztę renderować na żądanie.",
    sources: ["next-generateStaticParams"],
  },
  {
    question: "Dlaczego czytanie `searchParams` na najwyższym poziomie strony zmniejsza korzyść z PPR?",
    options: [
      "Wszystko poniżej `await searchParams` wypada ze statycznej powłoki",
      "`searchParams` są niedostępne na stronach z Cache Components",
      "Zamienia to całą stronę w komponent kliencki",
    ],
    answer: 0,
    explanation:
      "Parametry wyszukiwania to dane żądania. Jeśli `await searchParams` jest w korzeniu strony, statyczna powłoka jest prawie pusta. Lepiej przekazać promise w dół i rozpakować go w komponencie wewnątrz `<Suspense>`, zostawiając w powłoce nagłówek, filtry i nawigację.",
    sources: ["next-caching", "next-page-file"],
  },
  {
    question: "Które polecenie generuje typy `PageProps` i `LayoutProps` bez uruchamiania serwera deweloperskiego?",
    options: ["`next typegen`", "`next types`", "`tsc --next`"],
    answer: 0,
    explanation:
      "`next typegen` (od Next.js 15.5) generuje globalne helpery typów ze struktury tras — wygodne w CI przed `tsc --noEmit`. Typy są też aktualizowane podczas `next dev` i `next build`.",
    sources: ["next-typescript", "next-upgrade-16"],
  },
  {
    question: "Czym `htmlLimitedBots` różni się od zwykłej obsługi botów?",
    options: [
      "Określa boty, które dostają metadane bez streamingu",
      "Zabrania tym botom indeksowania strony przez `robots`",
      "Serwuje botom uproszczoną stronę bez stylów i JS",
    ],
    answer: 0,
    explanation:
      "Niektóre crawlery nie wykonują JavaScriptu i nie widzą metadanych przychodzących strumieniowo. Next.js wykrywa je po User-Agent i czeka na metadane przed wysłaniem HTML. Opcja pozwala nadpisać tę listę.",
    sources: ["next-generateMetadata"],
  },
  {
    question: "Co się stanie, jeśli layout wywoła `await params` na najwyższym poziomie przy Cache Components i bez `generateStaticParams`?",
    options: [
      "Layout wypadnie z powłoki; lepiej przekazać promise w dół",
      "Build zawsze wysypie się z błędem o dynamicznych parametrach",
      "Nic: layout jest zawsze statyczny niezależnie od `params`",
    ],
    answer: 0,
    explanation:
      "Bez `generateStaticParams` wartości parametrów są znane dopiero w czasie żądania — to dane runtime. Dokumentacja radzi nie czekać na `params` na najwyższym poziomie layoutu, lecz przekazać promise do komponentu, który naprawdę potrzebuje wartości, i opakować go w Suspense.",
    sources: ["next-dynamic-routes", "next-caching"],
  },
  {
    question: "Jak działa cache'owanie `'use cache'` na platformie serverless z domyślnym handlerem?",
    options: [
      "Wpisy żyją w pamięci instancji i nie są współdzielone między instancjami",
      "Wpisy są automatycznie zapisywane w globalnym CDN platformy",
      "Cache'owanie `'use cache'` jest w serverless całkowicie wyłączone",
    ],
    answer: 0,
    explanation:
      "Domyślny handler to LRU w pamięci. W serverless instancje są krótkotrwałe i izolowane, więc cache w runtime jest krótkotrwały. Główna wartość `'use cache'` to włączenie danych do statycznej powłoki podczas budowania. Dla niezawodnego cache w runtime potrzebny jest zdalny handler lub cache platformy.",
    sources: ["next-use-cache"],
  },
  {
    question: "Dlaczego Server Actions dostają szyfrowane, niedeterministyczne ID?",
    options: [
      "By ID były trudne do odgadnięcia, a nieużywane akcje można było usuwać",
      "By przyspieszyć wywołania dzięki krótkiej nazwie w żądaniu",
      "By całkowicie ukryć wywołania akcji przed DevTools przeglądarki",
    ],
    answer: 0,
    explanation:
      "Next.js tworzy ID dla referencji do akcji i okresowo przelicza je między buildami; nieużywane Server Actions są usuwane z paczki klienckiej (dead code elimination). Ale każde używane ID jest widoczne w żądaniach sieciowych — dlatego sprawdzanie uprawnień wewnątrz akcji jest obowiązkowe.",
    sources: ["next-data-security"],
  },
];

export default questions;
