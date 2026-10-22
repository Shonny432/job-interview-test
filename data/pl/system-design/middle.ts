import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Od czego poprawnie zaczynać odpowiedź na zadanie z frontend system design?",
    options: [
      "Od doprecyzowania wymagań i ograniczeń",
      "Od razu od wyboru frameworka i biblioteki stanu",
      "Od pisania kodu głównego komponentu na tablicy",
    ],
    answer: 0,
    explanation:
      "Popularny szkielet RADIO: Requirements (funkcjonalne i niefunkcjonalne), Architecture (komponenty i przepływy danych), Data model (stan kliencki), Interface (API), Optimizations (wydajność, a11y, i18n, bezpieczeństwo). Bez wymagań łatwo zaprojektować nie ten system.",
    sources: ["sd-primer"],
  },
  {
    question: "Dlaczego paginacja kursorowa jest lepsza od paginacji przez przesunięcie (`offset`) dla feedu?",
    options: [
      "Brak duplikatów przy wstawieniach i szybko na głębokich stronach",
      "Pozwala od razu przejść do dowolnej strony po jej numerze",
      "Nie wymaga sortowania danych na serwerze",
    ],
    answer: 0,
    explanation:
      "Przy `offset` nowe posty przesuwają wycinek i użytkownik widzi powtórzenia; `OFFSET 100000` jest drogi dla bazy. Kursor („po rekordzie z id X”) jest stabilny i wydajny na indeksie. Minus: nie da się przeskoczyć na stronę 57, więc dla tabel z numerami stron `offset` bywa odpowiedniejszy.",
    sources: ["slack-pagination", "graphql-pagination"],
  },
  {
    question: "Jak zaprojektować nieskończony feed z tysiącami postów?",
    options: [
      "Ładowanie kursorowe przez `IntersectionObserver` i wirtualizacja listy",
      "Załadować wszystkie posty jednym żądaniem i ukryć nadmiar przez CSS",
      "Pobierać nowe posty timerem co 2 sekundy",
    ],
    answer: 0,
    explanation:
      "Element-strażnik przy końcu listy uruchamia ładowanie kolejnej strony. Wirtualizacja trzyma w DOM tylko widoczne elementy. Uwzględnia się też: przywracanie pozycji przy powrocie, obrazki z wymiarami, nowe posty na górze bez „skoku” feedu.",
    sources: ["mdn-intersection-observer", "tanstack-virtual"],
  },
  {
    question: "Co ważne jest przy projektowaniu autouzupełniania (autocomplete)?",
    options: [
      "Debounce, anulowanie nieaktualnych żądań, cache, obsługa klawiatury",
      "Wysyłanie żądania przy każdym naciśnięciu klawisza bez opóźnień",
      "Ładowanie przy starcie całego słownika podpowiedzi do przeglądarki",
    ],
    answer: 0,
    explanation:
      "Plus minimalna długość zapytania, obsługa wyścigów odpowiedzi, podświetlanie dopasowań, stan „nic nie znaleziono”, wzorzec ARIA combobox. Dla małego stałego słownika można filtrować na kliencie (czasem z trie), dla dużych — wyszukiwanie po stronie serwera.",
    sources: ["wai-aria-apg", "mdn-abort-controller", "wiki-trie"],
  },
  {
    question: "Jaki jest główny kompromis GraphQL w porównaniu z REST?",
    options: [
      "Dokładny wybór pól, ale trudniejszy cache i ochrona przed ciężkimi zapytaniami",
      "GraphQL jest szybszy od REST we wszystkich scenariuszach bez wyjątku",
      "GraphQL nie wymaga schematu, więc API łatwiej zmieniać",
    ],
    answer: 0,
    explanation:
      "GraphQL rozwiązuje over- i under-fetching i daje otypowany schemat. Ale zapytania idą metodą POST na jeden endpoint — cache CDN po URL nie działa „z pudełka”, potrzebny jest znormalizowany cache kliencki (Apollo, urql), limity złożoności i persisted queries.",
    sources: ["graphql-learn"],
  },
  {
    question: "Czym jest problem N+1 w GraphQL i jak się go rozwiązuje?",
    options: [
      "Zapytanie do bazy na każdy element; rozwiązuje się to batchingiem",
      "Klient wysyła N+1 identycznych żądań z powodu ponownych renderów",
      "Schemat zawiera więcej typów niż tabel w bazie danych",
    ],
    answer: 0,
    explanation:
      "Lista 100 postów z polem `author` przy każdym daje 1 + 100 zapytań. DataLoader zbiera id w obrębie jednego cyklu i wykonuje jedno zapytanie `WHERE id IN (...)`, cache'ując wyniki na czas żądania.",
    sources: ["graphql-learn"],
  },
  {
    question: "Kiedy tRPC jest odpowiedni?",
    options: [
      "Gdy frontend i backend są w TypeScript w jednym repozytorium",
      "Gdy API ma być publiczne i używane przez zewnętrznych klientów",
      "Gdy klient jest napisany w Swift i Kotlin, a serwer w Go",
    ],
    answer: 0,
    explanation:
      "tRPC przenosi typy procedur serwera prosto do klienta bez generowania kodu i schematu. Dla publicznych API i klientów w różnych językach lepsze są REST z OpenAPI, GraphQL lub gRPC.",
    sources: ["trpc", "grpc"],
  },
  {
    question: "Jakie poziomy cache'owania są między użytkownikiem a bazą danych?",
    options: [
      "Pamięć, cache HTTP, Service Worker, CDN, cache serwera",
      "Tylko cache przeglądarki — pozostałe poziomy są przestarzałe",
      "Tylko CDN — przeglądarka nie cache'uje odpowiedzi API",
    ],
    answer: 0,
    explanation:
      "Każdy poziom odciąża kolejny i zmniejsza opóźnienie: kliencki cache danych (TanStack Query), cache HTTP według nagłówków, SW do pracy offline, CDN na krawędzi sieci, Redis i cache renderowania na serwerze. Trudność — spójne unieważnianie.",
    sources: ["mdn-http-caching", "sd-primer"],
  },
  {
    question: "Jak poprawnie cache'ować paczki JS i CSS?",
    options: [
      "Hash w nazwie pliku i `Cache-Control: max-age=31536000, immutable`",
      "`Cache-Control: no-store`, by użytkownik zawsze dostawał świeży kod",
      "Cache'ować według czasu: `max-age=3600` dla wszystkich plików",
    ],
    answer: 0,
    explanation:
      "Nazwa `app.3f9a1c.js` zmienia się przy zmianie zawartości, więc plik można cache'ować „na zawsze”. HTML, który odwołuje się do paczek, cache'uje się krótko lub z rewalidacją — wtedy nowe wydanie jest od razu podchwytywane. Bundlery robią hashowanie automatycznie.",
    sources: ["webdev-http-cache", "mdn-cache-control"],
  },
  {
    question: "Co daje `Cache-Control: max-age=60, stale-while-revalidate=600`?",
    options: [
      "Przez minutę odpowiedź jest świeża, potem serwowana jest nieaktualna, a aktualizacja idzie w tle",
      "Odpowiedź jest przechowywana 60 sekund, potem żądanie jest blokowane na 10 minut",
      "Serwer musi odpowiedzieć w 60 ms, inaczej zwracany jest błąd",
    ],
    answer: 0,
    explanation:
      "Użytkownik prawie zawsze dostaje natychmiastową odpowiedź z cache, a świeżość utrzymuje rewalidacja w tle. Ta sama strategia leży u podstaw SWR, TanStack Query i ISR w Next.js.",
    sources: ["webdev-swr", "mdn-cache-control"],
  },
  {
    question: "Dlaczego unieważnianie cache nazywa się jednym z najtrudniejszych zadań?",
    options: [
      "Dane leżą w wielu cache'ach i trzeba je aktualizować spójnie",
      "Przeglądarki zabraniają programowego usuwania cache",
      "Cache nie da się wyczyścić bez restartu serwera",
    ],
    answer: 0,
    explanation:
      "Te same dane leżą w CDN, cache serwera, cache klienta i na kilku stronach. Pomagają tagi (`revalidateTag`, unieważnianie po kluczach), krótkie TTL z SWR i unieważnianie zdarzeniowe po mutacjach.",
    sources: ["next-revalidateTag", "tq-invalidation"],
  },
  {
    question: "Jaka jest główna wada bezstanowych JWT w porównaniu z sesjami serwerowymi?",
    options: [
      "Wydanego tokena trudno odwołać przed upływem jego ważności",
      "JWT nie można przesyłać w nagłówkach HTTP",
      "JWT nie obsługuje przechowywania identyfikatora użytkownika",
    ],
    answer: 0,
    explanation:
      "Serwer sprawdza podpis bez odwoływania się do bazy — to wygodne przy skalowaniu. Ale przy zablokowaniu użytkownika lub kradzieży tokena nadal on działa. Rozwiązania: krótko żyjące access tokeny, refresh tokeny z rotacją, lista odwołanych tokenów (co częściowo przywraca stan).",
    sources: ["jwt-intro", "owasp-jwt"],
  },
  {
    question: "Gdzie bezpieczniej przechowywać token sesji w przeglądarce?",
    options: [
      "W ciasteczku z `HttpOnly`, `Secure` i `SameSite`",
      "W `localStorage`, by wygodnie czytać go z JavaScriptu",
      "W zmiennej globalnej `window.token`",
    ],
    answer: 0,
    explanation:
      "Ciasteczko `HttpOnly` jest niedostępne dla skryptów, więc XSS nie ukradnie go bezpośrednio. `SameSite` zmniejsza ryzyko CSRF, `Secure` — tylko HTTPS. Token w `localStorage` odczyta każdy wstrzyknięty skrypt. Całkowicie bezpiecznego przechowywania przy XSS nie ma — ochrona przed XSS jest obowiązkowa.",
    sources: ["mdn-set-cookie", "owasp-session"],
  },
  {
    question: "Po co para tokenów access i refresh?",
    options: [
      "Krótki access zmniejsza szkody z wycieku, refresh go odnawia",
      "Access służy do odczytu, a refresh tylko do zapisu danych",
      "Refresh token przyspiesza ładowanie stron dzięki cache",
    ],
    answer: 0,
    explanation:
      "Access żyje minuty i jest wysyłany z każdym żądaniem; refresh żyje dłużej, jest przechowywany pewniej i używany tylko do uzyskania nowych access tokenów. Rotacja refresh tokenów pozwala wykryć ponowne użycie skradzionego.",
    sources: ["owasp-jwt", "oauth2"],
  },
  {
    question: "Który przepływ OAuth jest zalecany dla SPA i aplikacji mobilnych?",
    options: [
      "Authorization Code z PKCE",
      "Implicit Flow z tokenem w URL",
      "Password Grant z hasłem w kliencie",
    ],
    answer: 0,
    explanation:
      "Klient publiczny nie może przechowywać sekretu. PKCE wiąże żądanie autoryzacji i wymianę kodu jednorazową parą verifier/challenge, chroniąc przed przechwyceniem kodu. Implicit i Password Grant uznaje się za przestarzałe i niebezpieczne.",
    sources: ["oauth-pkce", "oauth2"],
  },
  {
    question: "Czym OpenID Connect różni się od OAuth 2.0?",
    options: [
      "OIDC dodaje do OAuth uwierzytelnianie: ID token z danymi o użytkowniku",
      "OIDC to przestarzała wersja OAuth, która nie jest już wspierana",
      "OIDC szyfruje dane, a OAuth przesyła je otwarcie",
    ],
    answer: 0,
    explanation:
      "OAuth 2.0 to protokół delegowania dostępu do zasobów („pozwól aplikacji czytać mój kalendarz”), nie mówi, kim jest użytkownik. OIDC nad nim standaryzuje logowanie: ID token (JWT), userinfo, discovery. „Zaloguj przez Google” to OIDC.",
    sources: ["oidc", "oauth2"],
  },
  {
    question: "Jak chronić się przed CSRF przy uwierzytelnianiu przez ciasteczka?",
    options: [
      "Ciasteczka `SameSite` i token CSRF lub sprawdzanie `Origin`",
      "Przejść z HTTPS na HTTP, by ciasteczka nie były wysyłane",
      "Przechowywać ciasteczka tylko w `sessionStorage`",
    ],
    answer: 0,
    explanation:
      "Przeglądarka dołącza ciasteczka do żądań z cudzych stron. `SameSite=Lax/Strict` blokuje większość takich scenariuszy, a token lub sprawdzenie `Origin` zamyka resztę. GET nie może zmieniać danych, inaczej ochrona się psuje.",
    sources: ["owasp-csrf", "mdn-set-cookie"],
  },
  {
    question: "Co wybrać do powiadomień w czasie rzeczywistym, które idą tylko od serwera?",
    options: [
      "Server-Sent Events: prosty strumień HTTP z automatycznym ponownym łączeniem",
      "Koniecznie WebSocket — SSE nie potrafi przesyłać danych",
      "Polling co 100 ms dla minimalnego opóźnienia",
    ],
    answer: 0,
    explanation:
      "SSE jest prostsze niż WebSocket: działa przez HTTP, samo się ponownie łączy i przekazuje `Last-Event-ID`, by dociągnąć pominięte zdarzenia. WebSocket jest potrzebny, jeśli klient też często wysyła dane. Polling co 100 ms stworzy ogromne obciążenie.",
    sources: ["mdn-sse", "mdn-websockets"],
  },
  {
    question: "Co trzeba przewidzieć przy ponownym łączeniu WebSocket?",
    options: [
      "Backoff, ponowną subskrypcję i dociągnięcie pominiętych zdarzeń",
      "Natychmiastowe ponowne łączenie w pętli bez przerw",
      "Przeładowanie strony przy każdym zerwaniu połączenia",
    ],
    answer: 0,
    explanation:
      "Natychmiastowe ponowienia od tysięcy klientów dobiją podnoszący się serwer. Po ponownym połączeniu klient znów subskrybuje kanały i pobiera zdarzenia od ostatniego otrzymanego id. UI pokazuje status połączenia.",
    sources: ["aws-backoff", "mdn-websockets"],
  },
  {
    question: "Jak bezpiecznie ponowić żądanie płatności przy błędzie sieci?",
    options: [
      "Wysyłać klucz idempotentności z każdą próbą",
      "Ponawiać żądanie, aż przyjdzie odpowiedź, bez dodatkowych danych",
      "Nigdy nie ponawiać: poprosić użytkownika o ponowne wypełnienie formularza",
    ],
    answer: 0,
    explanation:
      "Przy timeoucie nie wiadomo, czy żądanie dotarło. Klucz (`Idempotency-Key`) generuje klient dla operacji; serwer, widząc powtórzenie, zwróci zapisany wynik. Tak działają Stripe i wiele API płatniczych.",
    sources: ["stripe-idempotency", "mdn-idempotent"],
  },
  {
    question: "Po co do wykładniczego opóźnienia ponowień dodaje się losowy rozrzut (jitter)?",
    options: [
      "Aby klienci nie ponawiali żądań jednocześnie",
      "Aby żądania wykonywały się średnio szybciej",
      "Aby obejść rate limiting serwera",
    ],
    answer: 0,
    explanation:
      "Jeśli serwis padł i się podniósł, wszyscy klienci z identycznym backoffem uderzą jednocześnie (thundering herd). Losowy składnik rozkłada ponowienia w czasie. Jest to szczegółowo omówione w artykule AWS Architecture Blog.",
    sources: ["aws-backoff"],
  },
  {
    question: "Jak poprawnie zorganizować przesyłanie plików użytkowników do chmury?",
    options: [
      "Pobrać podpisany link i przesyłać bezpośrednio do magazynu",
      "Wysłać plik jako base64 wewnątrz JSON na serwer API",
      "Przechowywać pliki w `localStorage` i synchronizować nocą",
    ],
    answer: 0,
    explanation:
      "Presigned URL pozwala przeglądarce przesłać plik bezpośrednio do S3/GCS, nie obciążając serwera API i nie ujawniając kluczy. Backend sprawdza uprawnienia i wydaje ograniczony czasowo link, a potem potwierdza przesłanie. Base64 zwiększa rozmiar o jedną trzecią.",
    sources: ["s3-presigned"],
  },
  {
    question: "Jak niezawodnie przesyłać pliki o rozmiarze gigabajtów?",
    options: [
      "Dzielić na części ze wznawianiem po zerwaniu",
      "Wysyłać jednym żądaniem i zwiększyć timeout serwera",
      "Kompresować plik w przeglądarce do 10 MB przed wysłaniem",
    ],
    answer: 0,
    explanation:
      "Zerwanie przy 95% jednego dużego żądania to utrata wszystkiego. Kawałki (multipart upload w S3, protokół tus) pozwalają kontynuować od miejsca zerwania, przesyłać części równolegle i pokazywać dokładny postęp.",
    sources: ["tus", "s3-presigned"],
  },
  {
    question: "Jak radzić sobie z konfliktami, gdy dwóch użytkowników edytuje ten sam rekord?",
    options: [
      "Wersja lub ETag: serwer odrzuci nieaktualną zmianę",
      "Ostatni zapisujący zawsze ma rację, konflikty nie są ważne",
      "Blokować rekord dla wszystkich na czas przeglądania",
    ],
    answer: 0,
    explanation:
      "Klient wysyła `If-Match: <etag>` lub pole `version`; jeśli rekord już się zmienił, serwer zwróci 409/412, a UI zaproponuje odświeżenie danych lub scalenie zmian. „Ostatni ma rację” po cichu gubi cudzą pracę.",
    sources: ["mdn-etag", "sd-primer"],
  },
  {
    question: "Jak zorganizować tryb offline dla aplikacji do notatek?",
    options: [
      "Service Worker dla powłoki, IndexedDB dla danych i kolejka synchronizacji zmian",
      "Przechowywać notatki w ciasteczkach, by automatycznie trafiały na serwer",
      "Wyłączać aplikację bez sieci i pokazywać stronę błędu",
    ],
    answer: 0,
    explanation:
      "Podejście offline-first: powłoka z cache SW, dane czytane i zapisywane lokalnie, zmiany gromadzone w kolejce i wysyłane po przywróceniu sieci (Background Sync lub przy zdarzeniu `online`). Trzeba przemyśleć rozwiązywanie konfliktów.",
    sources: ["webdev-offline-cookbook", "mdn-indexeddb"],
  },
  {
    question: "Co czyni aplikację PWA?",
    options: [
      "Manifest i Service Worker: instalacja, offline, push",
      "Kompilacja strony do natywnej aplikacji dla App Store",
      "Przyspieszenie strony przez rezygnację z JavaScriptu",
    ],
    answer: 0,
    explanation:
      "Progressive Web App to zwykła strona przez HTTPS z web app manifest i Service Workerem. Można ją zainstalować na ekranie głównym, działa offline i otrzymuje powiadomienia. Możliwości zależą od platformy.",
    sources: ["mdn-pwa", "mdn-service-worker"],
  },
  {
    question: "Jaką strategię renderowania logicznie wybrać dla landingu, katalogu i panelu użytkownika?",
    options: [
      "Landing — SSG, katalog — ISR, panel — dynamicznie",
      "Wszędzie tylko CSR — tak łatwiej utrzymywać",
      "Wszędzie tylko SSR bez cache — wtedy dane są zawsze świeże",
    ],
    answer: 0,
    explanation:
      "Strategię wybiera się pod dane strony: takie same dla wszystkich i rzadko zmieniane — statyka; wspólne dane z regularną aktualizacją — cache z rewalidacją; dane osobiste — render na żądanie (lub PPR: statyczna powłoka + streaming).",
    sources: ["webdev-rendering-on-web", "next-caching"],
  },
  {
    question: "Co jest złego w pełnej hydratacji dużej strony z treścią?",
    options: [
      "Przeglądarka wykonuje JS nawet dla statycznego tekstu",
      "Hydratacja usuwa HTML otrzymany z serwera",
      "Hydratacja jest dostępna tylko dla stron mniejszych niż 100 KB",
    ],
    answer: 0,
    explanation:
      "Dopóki JS się nie wykona, strona jest widoczna, ale nie reaguje — cierpią INP i TBT. Rozwiązania: Server Components (statyczne części nie są hydratowane), wyspy, leniwe komponenty klienckie, `content-visibility`.",
    sources: ["webdev-rendering-on-web", "pd-islands"],
  },
  {
    question: "Jak śledzić wydajność u prawdziwych użytkowników?",
    options: [
      "RUM: zbierać Web Vitals w produkcji i analizować po percentylach",
      "Uruchomić Lighthouse raz przed wydaniem na laptopie programisty",
      "Patrzeć na czas budowania projektu w CI",
    ],
    answer: 0,
    explanation:
      "Biblioteka `web-vitals` (lub `useReportWebVitals` w Next.js) wysyła LCP, INP, CLS przez `sendBeacon`. Patrzy się na 75. percentyl według typów urządzeń i stron, łączy regresje z wydaniami. Testy laboratoryjne są przydatne, ale nie zastępują danych terenowych.",
    sources: ["webdev-vitals", "webdev-lab-field"],
  },
  {
    question: "Jak przyspieszyć przejście na następną stronę, którą użytkownik prawdopodobnie otworzy?",
    options: [
      "Wcześniej ładować kod i dane według zamiaru użytkownika",
      "Ładować wszystkie strony serwisu przy pierwszej wizycie",
      "Wyłączać cache przeglądarki, by dane były świeższe",
    ],
    answer: 0,
    explanation:
      "Wcześniejsze ładowanie (prefetch) według zamiaru użytkownika czyni przejście prawie natychmiastowym, bez marnowania transferu na wszystko. Next.js `<Link>`, `queryClient.prefetchQuery` na `onMouseEnter`, `<link rel=\"prefetch\">`, Speculation Rules API.",
    sources: ["next-prefetching", "tq-prefetching"],
  },
  {
    question: "Czym zewnętrzne skrypty (analityka, czaty, reklamy) grożą wydajności?",
    options: [
      "Konkurują o główny wątek i sieć oraz mogą blokować renderowanie",
      "Nie wpływają na wydajność, bo ładują się z cudzych domen",
      "Przyspieszają stronę dzięki cache na CDN dostawcy",
    ],
    answer: 0,
    explanation:
      "Zewnętrzny kod bywa ciężki i jest poza twoją kontrolą. Podłącza się go asynchronicznie i z opóźnieniem (`next/script` ze strategią `lazyOnload`), używa fasad (podgląd zamiast widżetu), przenosi do workerów (Partytown), ustala budżet.",
    sources: ["next-script", "webdev-performance-budgets"],
  },
  {
    question: "Czym wydanie canary różni się od blue-green?",
    options: [
      "Canary — części użytkowników, blue-green — wszystkim naraz",
      "Canary — dla frontendu, blue-green — tylko dla baz danych",
      "Blue-green wdraża części użytkowników, canary — wszystkim naraz",
    ],
    answer: 0,
    explanation:
      "Blue-green utrzymuje dwa środowiska i natychmiast przełącza ruch, pozwalając szybko się wycofać. Canary kieruje 1–5% ruchu na nową wersję i zwiększa udział, obserwując metryki. Często łączy się je z feature flags.",
    sources: ["mf-canary", "mf-blue-green"],
  },
  {
    question: "Jak stopniowo włączyć nową funkcję dla 10% użytkowników?",
    options: [
      "Flaga z wdrażaniem według hasha id użytkownika",
      "Osobne wdrożenie dla co dziesiątego użytkownika",
      "`Math.random() < 0.1` przy każdym ładowaniu strony",
    ],
    answer: 0,
    explanation:
      "Hash z id użytkownika daje stabilne przypisanie do grupy między sesjami i urządzeniami. `Math.random()` przełączałby funkcję przy każdym ładowaniu. Flagi oblicza się na serwerze lub na krawędzi, by nie było migotania interfejsu.",
    sources: ["mf-feature-toggles"],
  },
  {
    question: "Jakie są zalety i wady monorepo dla kilku aplikacji frontendowych?",
    options: [
      "Wspólny kod i atomowe zmiany, ale potrzebne narzędzia do budowania i cache",
      "Monorepo przyspiesza działanie przeglądarki użytkowników",
      "Monorepo zabrania różnych wersji zależności i jakichkolwiek bibliotek",
    ],
    answer: 0,
    explanation:
      "Zmianę UI kitu i wszystkich aplikacji można zrobić jednym PR, ponowne użycie kodu jest prostsze. Ceną jest skalowanie CI: potrzebne są narzędzia z grafem zależności i cache (Turborepo, Nx), zasady własności i granic.",
    sources: ["monorepo-tools"],
  },
  {
    question: "Co leży u podstaw skalowalnego systemu projektowego?",
    options: [
      "Tokeny, udokumentowane komponenty, wersjonowanie",
      "Jeden duży plik CSS kopiowany do każdego projektu",
      "Zrzuty ekranu makiet we wspólnym folderze",
    ],
    answer: 0,
    explanation:
      "Tokeny (kolory, odstępy, typografia) to jedno źródło dla designu i kodu. Komponenty są dokumentowane i testowane w Storybook, publikowane jako pakiet z SemVer. Ważne są dostępność „z pudełka” i jasny proces rozwoju.",
    sources: ["storybook", "tw-theme"],
  },
  {
    question: "Jak interfejs powinien się zachować przy awarii jednego z widżetów dashboardu?",
    options: [
      "Izolować awarię i pokazać fallback tylko w widżecie",
      "Pokazać biały ekran i poprosić o przeładowanie strony",
      "Ukryć błąd i pokazywać pusty widżet bez wyjaśnień",
    ],
    answer: 0,
    explanation:
      "Graceful degradation: reszta dashboardu działa, zepsuty widżet ma komunikat i przycisk „Spróbuj ponownie”, a błąd trafia do monitoringu. Granice błędów ustawia się wokół niezależnych części.",
    sources: ["react-error-boundary", "next-error-handling"],
  },
  {
    question: "Po co przekazywać identyfikator żądania (request id / trace id) od frontendu do backendu?",
    options: [
      "Aby powiązać błąd w przeglądarce z logami i trace'ami wszystkich serwisów",
      "Aby serwer mógł cache'ować odpowiedzi według tego identyfikatora",
      "Aby ograniczyć liczbę żądań od jednego użytkownika",
    ],
    answer: 0,
    explanation:
      "Rozproszone śledzenie (OpenTelemetry, nagłówek `traceparent`) pokazuje drogę żądania przez API gateway, serwisy i bazę. Użytkownik przysyła zrzut ekranu z id błędu — i od razu znajdujesz pełny kontekst.",
    sources: ["opentelemetry"],
  },
  {
    question: "Jak działa algorytm rate limiting „token bucket”?",
    options: [
      "Wiadro uzupełnia się tokenami ze stałą prędkością; żądanie zużywa token",
      "Każdy użytkownik dostaje stałą liczbę żądań na zawsze",
      "Żądania są przetwarzane ściśle po jednym w kolejności kolejki",
    ],
    answer: 0,
    explanation:
      "Pojemność wiadra określa dopuszczalny skok, prędkość uzupełniania — średni limit. Gdy tokeny się skończą, serwer odpowiada 429. Alternatywy: fixed/sliding window, leaky bucket.",
    sources: ["wiki-token-bucket", "mdn-429"],
  },
  {
    question: "Jak pokazywać kursory innych uczestników we wspólnym edytorze, nie przeciążając sieci?",
    options: [
      "Wysyłać pozycję z throttle i interpolować ruch na kliencie",
      "Wysyłać każdy ruch myszy bez ograniczeń",
      "Synchronizować kursory tylko przy zapisie dokumentu",
    ],
    answer: 0,
    explanation:
      "Dane presence są ulotne: nie przechowuje się ich w dokumencie, wysyła najwyżej 10–20 razy na sekundę i wygładza animacją. Same edycje dokumentu synchronizuje się osobno — przez OT lub CRDT.",
    sources: ["crdt-tech", "mdn-websockets"],
  },
  {
    question: "Licznik nieprzeczytanych wiadomości różni się w różnych kartach. Jak to naprawić?",
    options: [
      "Synchronizować karty przez `BroadcastChannel`",
      "Zabronić otwierania strony w kilku kartach",
      "Przeładowywać wszystkie karty co minutę",
    ],
    answer: 0,
    explanation:
      "Każda karta to osobna aplikacja z własnym stanem. `BroadcastChannel` przekazuje zmiany między nimi; można też trzymać jedno połączenie z serwerem w SharedWorker i rozsyłać zdarzenia do kart.",
    sources: ["mdn-broadcast-channel", "mdn-web-workers"],
  },
  {
    question: "Jak ładować tłumaczenia w wielojęzycznym SPA, nie powiększając paczki?",
    options: [
      "Dynamicznie ładować słownik tylko bieżącego języka (i po sekcjach)",
      "Włączyć wszystkie języki do głównej paczki dla natychmiastowego przełączania",
      "Tłumaczyć teksty w locie przez zewnętrzne API przy każdym wyświetleniu",
    ],
    answer: 0,
    explanation:
      "Słowniki wszystkich języków łatwo zajmują setki kilobajtów. Dynamiczny import według lokalizacji i przestrzeni nazw oszczędza transfer. W Server Components słowniki w ogóle nie trafiają do paczki klienckiej.",
    sources: ["next-i18n", "mdn-dynamic-import"],
  },
  {
    question: "Jakie nagłówki bezpieczeństwa HTTP warto skonfigurować dla aplikacji webowej?",
    options: [
      "CSP, HSTS, `frame-ancestors`, `nosniff`",
      "Tylko `Access-Control-Allow-Origin: *` dla wszystkich odpowiedzi",
      "Żadnych — bezpieczeństwo w pełni zapewnia HTTPS",
    ],
    answer: 0,
    explanation:
      "CSP ogranicza źródła skryptów, HSTS wymusza HTTPS, `frame-ancestors` zabrania osadzania strony w ramkach atakującego, `nosniff` zapobiega podmianie typów MIME. `ACAO: *` na prywatnych API jest natomiast niebezpieczny.",
    sources: ["mdn-csp", "owasp-top10"],
  },
  {
    question: "Jak wydajnie wysyłać zdarzenia analityczne?",
    options: [
      "Gromadzić w kolejce, wysyłać paczkami i doręczać przy ukryciu strony",
      "Od razu wysyłać osobne żądanie przy każdym kliknięciu",
      "Zapisywać wszystkie zdarzenia w ciasteczkach i wysyłać raz w tygodniu",
    ],
    answer: 0,
    explanation:
      "Batching zmniejsza liczbę żądań i obciążenie głównego wątku. Przy `visibilitychange` na `hidden` resztę wysyła się przez `sendBeacon`. Trzeba szanować zgodę użytkownika (cookie consent).",
    sources: ["mdn-send-beacon"],
  },
  {
    question: "Dlaczego zwracanie `totalCount` w każdej odpowiedzi listy może być kosztowne?",
    options: [
      "Dokładny `COUNT(*)` z filtrami obciąża bazę",
      "JSON nie potrafi przesyłać dużych liczb",
      "Przeglądarka nie potrafi wyświetlić liczby większej niż milion",
    ],
    answer: 0,
    explanation:
      "Dla nieskończonego feedu dokładna liczba nie jest potrzebna — wystarczy `hasNextPage`. Jeśli liczba jest ważna, używa się przybliżonej oceny, cache'uje zliczanie lub liczy osobno i rzadziej.",
    sources: ["slack-pagination", "sd-primer"],
  },
  {
    question: "Czym API Gateway różni się od BFF?",
    options: [
      "Gateway to wspólne wejście, BFF to warstwa pod konkretnego klienta",
      "Gateway działa tylko z GraphQL, a BFF tylko z REST",
      "To synonimy tego samego serwisu",
    ],
    answer: 0,
    explanation:
      "Gateway rozwiązuje zagadnienia przekrojowe dla wszystkich klientów. BFF agreguje i dostosowuje dane do potrzeb konkretnego interfejsu (web, aplikacja mobilna). W prawdziwych systemach często współistnieją.",
    sources: ["mf-microservices", "sd-primer"],
  },
  {
    question: "Jak aktualizować cache kliencki po mutacji, by użytkownik zobaczył zmiany?",
    options: [
      "Unieważnić zapytania lub włożyć odpowiedź do cache",
      "Przeładować stronę po każdej mutacji",
      "Czekać, aż cache zdezaktualizuje się według timera",
    ],
    answer: 0,
    explanation:
      "Unieważnienie po kluczach (`invalidateQueries`, tagi RTK Query) ponownie pobierze aktualne dane; jeśli serwer zwrócił zaktualizowany obiekt, wkłada się go do cache bezpośrednio, bez dodatkowego żądania. Na serwerze Next.js odpowiednikiem jest `updateTag`/`revalidatePath`.",
    sources: ["tq-invalidation", "rtk-query-invalidation"],
  },
  {
    question: "Czym jest back/forward cache i jak go nie zepsuć?",
    options: [
      "Migawka strony dla natychmiastowego „wstecz”; przeszkadzają `unload` i `no-store`",
      "Cache odpowiedzi API w Service Workerze do nawigacji wstecz i naprzód",
      "Cache historii routera SPA włączany w `next.config`",
    ],
    answer: 0,
    explanation:
      "bfcache zapisuje migawkę strony ze stanem JS, a przycisk „Wstecz” otwiera ją natychmiast. Handlery `unload`, `Cache-Control: no-store` i niezamknięte połączenia mogą pozbawić stronę tej optymalizacji. Zamiast `unload` używa się `pagehide` i `visibilitychange`.",
    sources: ["webdev-bfcache"],
  },
  {
    question: "Jak obsłużyć wygaśnięcie access tokena w trakcie pracy użytkownika?",
    options: [
      "Przechwycić 401, raz odświeżyć token i ponowić oczekujące żądania",
      "Od razu wylogować użytkownika i stracić niezapisane dane",
      "Odświeżać token przed każdym żądaniem, nawet jeśli jest ważny",
    ],
    answer: 0,
    explanation:
      "Kilka równoległych żądań może jednocześnie dostać 401 — odświeżenie powinno wykonać się raz (wspólny promise), a pozostałe żądania na nie czekają i są ponawiane. Jeśli refresh się nie powiedzie — wylogowanie z zachowaniem szkiców.",
    sources: ["owasp-session", "rg-chain"],
  },
  {
    question: "Dlaczego dla dużych katalogów wyszukiwanie robi się na serwerze, a nie filtrowaniem na kliencie?",
    options: [
      "Milionów rekordów nie da się załadować do przeglądarki",
      "Przeglądarki nie obsługują porównywania stringów w językach innych niż łacińskie",
      "Filtrowanie po stronie klienta jest zabronione politykami bezpieczeństwa",
    ],
    answer: 0,
    explanation:
      "Serwerowe silniki wyszukiwania (Elasticsearch, Meilisearch, pełnotekstowe wyszukiwanie PostgreSQL) dają trafność, tolerancję literówek i fasety. Filtrowanie po stronie klienta jest odpowiednie dla setek–tysięcy już załadowanych rekordów.",
    sources: ["sd-primer"],
  },
  {
    question: "Jak zarządzać fokusem przy otwieraniu okna modalnego w SPA?",
    options: [
      "Fokus do środka, uwięzienie i powrót po zamknięciu",
      "Zostawić fokus na stronie pod modalem",
      "Usunąć fokus ze wszystkich elementów przez `outline: none`",
    ],
    answer: 0,
    explanation:
      "Bez zarządzania fokusem użytkownicy klawiatury i czytników ekranu się gubią. Natywny `<dialog>` z `showModal()` robi większość pracy. Na poziomie systemu zakłada się to w komponentach bazowych systemu projektowego.",
    sources: ["wai-dialog-pattern", "mdn-dialog"],
  },
];

export default questions;
