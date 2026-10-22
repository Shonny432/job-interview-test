import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Co dzieje się, gdy użytkownik wpisuje adres strony i naciska Enter?",
    options: [
      "DNS → połączenie (TCP/TLS) → żądanie HTTP → odpowiedź → renderowanie strony",
      "Przeglądarka od razu pobiera wszystkie pliki strony z najbliższego serwera Google",
      "Przeglądarka wysyła żądanie do wyszukiwarki, która przekierowuje na stronę",
    ],
    answer: 0,
    explanation:
      "Przeglądarka ustala IP przez DNS (z cache na każdym poziomie), nawiązuje połączenie i handshake TLS, wysyła żądanie, dostaje HTML, parsuje go, ładuje CSS/JS/obrazki, buduje DOM i CSSOM oraz wykonuje layout i malowanie. To klasyczne pytanie otwierające rozmowę o wydajności.",
    sources: ["sd-primer", "webdev-rendering"],
  },
  {
    question: "Do czego służy DNS?",
    options: [
      "Zamienia nazwy domen na adresy IP serwerów",
      "Szyfruje ruch między przeglądarką a serwerem przez TLS",
      "Przechowuje kopie stron bliżej użytkownika dla szybkiego ładowania",
    ],
    answer: 0,
    explanation:
      "DNS to rozproszona „książka telefoniczna” internetu. Odpowiedzi są cache'owane (przeglądarka, system, dostawca) na czas TTL. Szyfrowanie to zadanie TLS, a kopie treści blisko użytkownika — CDN.",
    sources: ["sd-primer"],
  },
  {
    question: "Czym HTTPS różni się od HTTP?",
    options: [
      "Ruch jest szyfrowany, a autentyczność serwera weryfikowana przez TLS",
      "HTTPS jest szybszy, bo kompresuje wszystkie odpowiedzi serwera",
      "HTTPS pozwala tylko na żądania GET, a HTTP na dowolne metody",
    ],
    answer: 0,
    explanation:
      "TLS chroni przed podsłuchem i podmianą danych, a certyfikat potwierdza, że rozmawiasz z prawdziwym serwerem. Wiele nowoczesnych API przeglądarki (Service Worker, geolokalizacja, HTTP/2 w przeglądarkach) działa tylko przez HTTPS.",
    sources: ["sd-primer", "mdn-same-origin"],
  },
  {
    question: "Co oznacza zasada REST „zasoby + metody HTTP”?",
    options: [
      "URL identyfikuje zasób, a metoda akcję: `GET /users/1`, `DELETE /users/1`",
      "Wszystkie akcje idą przez `POST /api` z nazwą operacji w ciele",
      "Każda akcja ma własny URL typu `/getUser` czy `/deleteUser`",
    ],
    answer: 0,
    explanation:
      "REST używa rzeczowników w URL i semantyki metod HTTP: GET czyta, POST tworzy, PUT/PATCH aktualizują, DELETE usuwa. Czyni to API przewidywalnym, a cache i proxy rozumieją sens żądań.",
    sources: ["mdn-http-methods", "sd-primer"],
  },
  {
    question: "Czym GET różni się od POST?",
    options: [
      "GET czyta dane i nie może ich zmieniać, POST wysyła dane do zmiany",
      "GET jest bezpieczniejszy, bo dane z URL są szyfrowane osobno od ciała",
      "POST jest szybszy, bo przeglądarka nigdy go nie cache'uje",
    ],
    answer: 0,
    explanation:
      "GET to metoda bezpieczna i idempotentna: można go cache'ować, ponawiać i wcześniej ładować. Parametry widać w URL i logach, więc sekretów nie wolno przesyłać przez GET. POST tworzy lub zmienia dane, a przeglądarka pyta przed ponownym wysłaniem formularza.",
    sources: ["mdn-http-methods", "mdn-idempotent"],
  },
  {
    question: "Która metoda HTTP NIE jest idempotentna?",
    options: ["`POST`", "`PUT`", "`DELETE`"],
    answer: 0,
    explanation:
      "Idempotentność: powtórzenie tego samego żądania daje ten sam efekt na serwerze. PUT całkowicie zastępuje zasób, DELETE go usuwa — powtórzenie nic nie zmienia. Dwa POST-y „utwórz zamówienie” tworzą dwa zamówienia. Dlatego ponawianie POST przy awarii jest niebezpieczne bez klucza idempotentności.",
    sources: ["mdn-idempotent", "mdn-http-methods"],
  },
  {
    question: "Co oznaczają klasy kodów statusu HTTP?",
    options: [
      "2xx — sukces, 3xx — przekierowanie, 4xx — błąd klienta, 5xx — błąd serwera",
      "2xx — błąd klienta, 3xx — sukces, 4xx — błąd serwera, 5xx — przekierowanie",
      "2xx — odpowiedź z cache, 4xx — nieaktualna odpowiedź, 5xx — odpowiedź częściowa",
    ],
    answer: 0,
    explanation:
      "Przykłady: 200 OK, 201 Created, 204 No Content; 301/302 przekierowania, 304 Not Modified; 400 Bad Request, 401, 403, 404, 409 Conflict, 422, 429; 500, 502, 503, 504. Klasa wpływa też na logikę klienta: 4xx zwykle się nie ponawia, a 5xx i błędy sieci można.",
    sources: ["mdn-http-methods", "sd-primer"],
  },
  {
    question: "Czym różnią się odpowiedzi 401 i 403?",
    options: [
      "401 — niezalogowany, 403 — zalogowany, ale bez uprawnień",
      "401 — brak uprawnień, 403 — użytkownik w ogóle się nie zalogował",
      "401 — zasób nie znaleziony, 403 — serwer chwilowo niedostępny",
    ],
    answer: 0,
    explanation:
      "Przy 401 klient zwykle proponuje zalogowanie lub odświeża token. Przy 403 ponowne logowanie nie pomoże — pokaż „brak dostępu”. 404 oznacza, że zasobu nie znaleziono (czasem zwraca się je zamiast 403, by nie ujawniać, że zasób istnieje).",
    sources: ["owasp-auth", "sd-primer"],
  },
  {
    question: "Czym uwierzytelnianie różni się od autoryzacji?",
    options: [
      "Uwierzytelnianie to kim jesteś, autoryzacja — co wolno ci robić",
      "Uwierzytelnianie to co wolno ci robić, autoryzacja — kim jesteś",
      "To synonimy logowania użytkownika do systemu",
    ],
    answer: 0,
    explanation:
      "Najpierw system weryfikuje tożsamość (hasło, OAuth, passkey), potem uprawnienia do konkretnej akcji (rola, własność zasobu). Sprawdzanie uprawnień na serwerze jest obowiązkowe: ukryty przycisk w UI niczego nie chroni.",
    sources: ["owasp-auth", "next-authentication"],
  },
  {
    question: "Co oznacza, że HTTP to protokół bezstanowy?",
    options: [
      "Każde żądanie jest niezależne; „pamięć” o użytkowniku przekazuje się ciasteczkiem lub tokenem",
      "Serwer nie może przechowywać danych w bazie między żądaniami użytkowników",
      "Przeglądarka usuwa wszystkie dane strony po zamknięciu karty",
    ],
    answer: 0,
    explanation:
      "Serwer sam nie pamięta poprzednich żądań, więc sesję przekazuje się z każdym żądaniem: ciasteczko z ID sesji lub token w nagłówku. Bezstanowe serwery łatwo skalować — każda instancja może obsłużyć dowolne żądanie.",
    sources: ["owasp-session", "sd-primer"],
  },
  {
    question: "Do czego służy CDN?",
    options: [
      "Do serwowania treści z serwerów geograficznie bliskich użytkownikowi",
      "Do przechowywania danych użytkowników w zaszyfrowanej postaci na kliencie",
      "Do kompilowania kodu JavaScript przed wysłaniem do przeglądarki",
    ],
    answer: 0,
    explanation:
      "CDN cache'uje zasoby statyczne (JS, CSS, obrazki, wideo), a nawet HTML w punktach obecności na całym świecie: mniejsze opóźnienia, mniejsze obciążenie serwera źródłowego, ochrona przed skokami ruchu. Dla treści dynamicznych CDN może proxować i cache'ować według reguł.",
    sources: ["mdn-cdn", "wiki-cdn"],
  },
  {
    question: "Co określa nagłówek `Cache-Control: max-age=3600`?",
    options: [
      "Odpowiedzi można przez godzinę używać z cache bez pytania serwera",
      "Serwer musi odpowiedzieć na żądanie w ciągu godziny",
      "Przeglądarka musi usunąć wszystkie dane strony po godzinie",
    ],
    answer: 0,
    explanation:
      "Dopóki odpowiedź jest „świeża”, przeglądarka nie odwołuje się do sieci. Po upływie czasu może ją zrewalidować żądaniem warunkowym (ETag/Last-Modified) i dostać 304. `no-store` zabrania cache'owania, a `no-cache` wymaga rewalidacji przed każdym użyciem.",
    sources: ["mdn-cache-control", "mdn-http-caching"],
  },
  {
    question: "Czym opóźnienie (latency) różni się od przepustowości (bandwidth)?",
    options: [
      "Opóźnienie to czas do odpowiedzi, przepustowość to ilość danych w jednostce czasu",
      "Opóźnienie to ilość danych na sekundę, przepustowość to czas do pierwszego bajtu",
      "To synonimy szybkości internetu użytkownika",
    ],
    answer: 0,
    explanation:
      "Nawet na szerokim łączu każde dodatkowe żądanie kosztuje podróż do serwera i z powrotem (RTT). Sieci komórkowe mają wysokie opóźnienia, więc ważne są mniejsza liczba żądań, CDN, prefetch i HTTP/2. Dla dużych plików ważniejsza jest przepustowość.",
    sources: ["sd-primer", "webdev-lcp"],
  },
  {
    question: "Czym SPA różni się od MPA?",
    options: [
      "SPA przełącza strony na kliencie przez JS, MPA ładuje nowy HTML z serwera",
      "SPA to jedna strona HTML w ogóle bez nawigacji",
      "MPA nie obsługuje JavaScriptu i działa tylko z treścią statyczną",
    ],
    answer: 0,
    explanation:
      "SPA daje płynne przejścia i bogatą interaktywność, ale wymaga więcej JS i uwagi wobec SEO i pierwszego ładowania. MPA jest prostsze i szybciej startuje. Nowoczesne frameworki (Next.js) łączą renderowanie serwerowe i nawigację po stronie klienta.",
    sources: ["webdev-rendering-on-web", "next-glossary"],
  },
  {
    question: "Dlaczego renderowanie po stronie serwera (SSR) często poprawia pierwsze ładowanie?",
    options: [
      "Użytkownik od razu dostaje gotowy HTML, bez czekania na załadowanie i wykonanie JS",
      "Serwer jest zawsze szybszy niż przeglądarka, więc strona ładuje się natychmiast",
      "SSR całkowicie eliminuje potrzebę ładowania JavaScriptu w przeglądarce",
    ],
    answer: 0,
    explanation:
      "Przy CSR przeglądarka najpierw dostaje prawie pusty HTML i czeka na paczkę. Przy SSR treść jest widoczna od razu, co poprawia LCP i SEO, ale do interaktywności nadal potrzebna jest hydratacja z JS. Kosztem jest obciążenie serwera i czas odpowiedzi.",
    sources: ["webdev-rendering-on-web", "vercel-ssr-ssg"],
  },
  {
    question: "Dlaczego API zwraca listę stronami (paginacja)?",
    options: [
      "Aby nie przesyłać i nie renderować tysięcy rekordów naraz",
      "Aby wyszukiwarki indeksowały każdą stronę osobno",
      "Bo JSON nie obsługuje tablic dłuższych niż 100 elementów",
    ],
    answer: 0,
    explanation:
      "Duże odpowiedzi wolno się przesyłają i obciążają bazę oraz pamięć przeglądarki. Paginacja może być przez offset (`?page=3&limit=20`) lub kursor (`?after=abc`). W UI: numery stron, „Załaduj więcej” lub nieskończone przewijanie.",
    sources: ["graphql-pagination", "slack-pagination"],
  },
  {
    question: "Po co debounce w wyszukiwaniu podczas pisania?",
    options: [
      "Aby wysłać żądanie po przerwie w pisaniu, a nie przy każdym znaku",
      "Aby wysyłać żądania równolegle, by szybciej wracały",
      "Aby przeglądarka cache'owała odpowiedzi wyszukiwania na zawsze",
    ],
    answer: 0,
    explanation:
      "Bez debounce słowo „sneakers” daje 8 żądań. Opóźnienie 200–300 ms zmniejsza obciążenie serwera. Dodatkowo anuluje się nieaktualne żądania (`AbortController`), by stara odpowiedź nie nadpisała nowej, i cache'uje wyniki.",
    sources: ["jsinfo-settimeout", "mdn-abort-controller"],
  },
  {
    question: "Jakie stany UI przewidzieć dla ekranu z listą danych?",
    options: [
      "Ładowanie, pusta lista, błąd i udany wynik",
      "Tylko udany wynik — resztę obsłuży przeglądarka",
      "Tylko ładowanie i sukces; błędy pokazuje się w konsoli",
    ],
    answer: 0,
    explanation:
      "Pusty stan podpowiada, co zrobić dalej, stan błędu proponuje przycisk „Spróbuj ponownie”, a szkielety zmniejszają poczucie oczekiwania. Na rozmowie z system design takie szczegóły świadczą o dojrzałości.",
    sources: ["tq-queries", "sd-primer"],
  },
  {
    question: "Czym wymagania funkcjonalne różnią się od niefunkcjonalnych?",
    options: [
      "Funkcjonalne — co system robi, niefunkcjonalne — jak dobrze to robi",
      "Funkcjonalne — dla backendu, niefunkcjonalne — dla frontendu",
      "Funkcjonalne pisze klient, a niefunkcjonalne — QA",
    ],
    answer: 0,
    explanation:
      "Funkcjonalne: „użytkownik może dodać produkt do koszyka”. Niefunkcjonalne: wydajność, dostępność, bezpieczeństwo, niezawodność, skalowalność, działanie offline. Rozmowy z system design zaczynają się od doprecyzowania obu.",
    sources: ["sd-primer"],
  },
  {
    question: "Czym skalowanie pionowe różni się od poziomego?",
    options: [
      "Pionowe — mocniejszy serwer, poziome — więcej serwerów",
      "Pionowe — więcej serwerów, poziome — mocniejszy serwer",
      "Pionowe dotyczy bazy danych, poziome tylko frontendu",
    ],
    answer: 0,
    explanation:
      "Skalowanie pionowe (więcej CPU/RAM) jest proste, ale ma sufit i pojedynczy punkt awarii. Poziome wymaga load balancera i bezstanowych serwerów, ale jest prawie nieograniczone i zwiększa odporność na awarie.",
    sources: ["sd-primer", "wiki-load-balancing"],
  },
  {
    question: "Co robi load balancer?",
    options: [
      "Rozdziela żądania między kilka serwerów i wyłącza niedziałające",
      "Kompresuje odpowiedzi serwera, by zmniejszyć obciążenie sieci",
      "Ogranicza liczbę użytkowników, którzy mogą naraz otworzyć stronę",
    ],
    answer: 0,
    explanation:
      "Algorytmy: round robin, least connections, IP hash. Health checks wykluczają niedziałające instancje. Load balancer to podstawa skalowania poziomego i odporności na awarie.",
    sources: ["wiki-load-balancing", "sd-primer"],
  },
  {
    question: "Czym ogólnie relacyjne bazy danych (SQL) różnią się od NoSQL?",
    options: [
      "SQL — tabele ze schematem i relacjami, NoSQL — elastyczne modele danych",
      "SQL działa tylko na serwerze, NoSQL tylko w przeglądarce",
      "NoSQL nie może przechowywać danych na dysku, tylko w pamięci",
    ],
    answer: 0,
    explanation:
      "Relacyjne bazy (PostgreSQL) dają transakcje, JOIN-y i ścisły schemat. NoSQL — dokumentowe (MongoDB), klucz-wartość (Redis), kolumnowe, grafowe — łatwiej skalują się poziomo lub lepiej pasują do konkretnego wzorca dostępu. Wybór zależy od danych i zapytań.",
    sources: ["sd-primer"],
  },
  {
    question: "Czym jest polling?",
    options: [
      "Klient okresowo pyta serwer, czy są nowe dane",
      "Serwer wysyła dane klientowi przez otwarte połączenie",
      "Głosowanie użytkowników na nowe funkcje produktu",
    ],
    answer: 0,
    explanation:
      "Najprostszy sposób na aktualizacje: żądanie co N sekund. Minusy: opóźnienie do N sekund i puste żądania. Alternatywy: long polling, SSE, WebSocket. Przy rzadkich aktualizacjach polling często wystarcza.",
    sources: ["mdn-websockets", "mdn-sse"],
  },
  {
    question: "Kiedy wybrać WebSocket?",
    options: [
      "Gdy potrzebna jest częsta dwukierunkowa wymiana w czasie rzeczywistym",
      "Gdy trzeba załadować duży obrazek szybciej niż zwykłym HTTP",
      "Gdy trzeba cache'ować odpowiedzi API po stronie przeglądarki",
    ],
    answer: 0,
    explanation:
      "WebSocket utrzymuje stałe połączenie, a obie strony mogą wysyłać wiadomości w dowolnym momencie. Kosztem są stałe połączenia na serwerze, ponowne łączenie i skalowanie. Dla strumienia tylko z serwera prostsze jest SSE.",
    sources: ["mdn-websockets"],
  },
  {
    question: "Co zrobić z obrazkami, by strona ładowała się szybciej?",
    options: [
      "Serwować nowoczesne formaty w odpowiednim rozmiarze i leniwie ładować te poniżej pierwszego ekranu",
      "Osadzić wszystkie obrazki w HTML jako base64, by zmniejszyć liczbę żądań",
      "Ładować obrazki w maksymalnej rozdzielczości dla każdego ekranu",
    ],
    answer: 0,
    explanation:
      "AVIF/WebP, `srcset` pod rozmiar ekranu, `loading=\"lazy\"` dla obrazków poza ekranem, wymiary przeciw CLS, CDN z optymalizacją. Base64 powiększa HTML o jedną trzecią i nie jest cache'owany osobno — uzasadniony tylko dla malutkich ikon.",
    sources: ["webdev-image-formats", "mdn-responsive-images"],
  },
  {
    question: "Po co dzielić paczkę JS na części (code splitting)?",
    options: [
      "Aby użytkownik ładował tylko kod potrzebnej strony lub funkcji",
      "Aby kod wykonywał się równolegle w kilku wątkach przeglądarki",
      "Aby ukryć kod źródłowy przed użytkownikami",
    ],
    answer: 0,
    explanation:
      "Jedna ogromna paczka spowalnia pierwsze ładowanie. Podział po trasach i ciężkich komponentach (`import()`, `React.lazy`) zmniejsza początkowy rozmiar. Frameworki takie jak Next.js dzielą po trasach automatycznie.",
    sources: ["mdn-dynamic-import", "next-lazy-loading"],
  },
  {
    question: "Co dają minifikacja i kompresja (gzip, brotli)?",
    options: [
      "Zmniejszają rozmiar przesyłanych plików i przyspieszają ładowanie",
      "Szyfrują kod, by nie dało się go przeczytać",
      "Sprawiają, że JavaScript wykonuje się w przeglądarce kilka razy szybciej",
    ],
    answer: 0,
    explanation:
      "Minifikacja usuwa spacje i skraca nazwy, a kompresja na poziomie HTTP zmniejsza zasoby tekstowe jeszcze kilkukrotnie (brotli zwykle jest wydajniejszy niż gzip). Na szybkość wykonania prawie nie wpływa — ta zależy od rozmiaru i złożoności kodu.",
    sources: ["mdn-compression"],
  },
  {
    question: "Po co są środowiska dev, staging i production?",
    options: [
      "Do rozwoju, testów na kopii produkcji i obsługi prawdziwych użytkowników",
      "Różne języki programowania dla frontendu, backendu i baz danych",
      "Różne wersje przeglądarek, w których testuje się stronę",
    ],
    answer: 0,
    explanation:
      "Staging odwzorowuje konfigurację produkcji, by wyłapać problemy przed wydaniem. Konfigurację (URL API, klucze) przekazuje się zmiennymi środowiskowymi, a nie trzyma w kodzie — to zasada 12-factor app.",
    sources: ["twelve-factor", "next-env"],
  },
  {
    question: "Czym jest CI/CD?",
    options: [
      "Automatycznymi sprawdzeniami i dostarczaniem każdej zmiany",
      "Ręcznym testowaniem przez QA przed każdym wydaniem",
      "Systemem kontroli wersji, alternatywą dla Gita",
    ],
    answer: 0,
    explanation:
      "Continuous Integration: każdy push uruchamia linter, testy i build. Continuous Delivery/Deployment: zmiany, które przeszły sprawdzenia, są wdrażane automatycznie (na staging lub produkcję). Przyspiesza to wydania i zmniejsza ryzyko.",
    sources: ["twelve-factor", "mf-blue-green"],
  },
  {
    question: "Po co frontendowi monitoring błędów (Sentry i podobne)?",
    options: [
      "Aby dowiadywać się o błędach prawdziwych użytkowników razem ze stack trace",
      "Aby blokować użytkowników, którzy napotykają błędy",
      "Aby automatycznie naprawiać błędy w produkcji bez wydania",
    ],
    answer: 0,
    explanation:
      "Użytkownicy rzadko zgłaszają błędy. Monitoring zbiera wyjątki, nieobsłużone odrzucenia promise'ów, przeglądarkę i działania prowadzące do awarii, a source mapy zamieniają zminifikowany stos w czytelny.",
    sources: ["opentelemetry", "sre-slo"],
  },
  {
    question: "Co oznacza odpowiedź 429 Too Many Requests?",
    options: [
      "Klient przekroczył limit żądań i powinien poczekać",
      "Serwer jest przeciążony i całkowicie przestał działać",
      "Żądanie ma zbyt wiele parametrów w URL",
    ],
    answer: 0,
    explanation:
      "Rate limiting chroni serwis przed nadużyciami i przeciążeniem. Odpowiedź może zawierać `Retry-After`. Klient powinien ponowić później, najlepiej z wykładniczym opóźnieniem, a nie od razu.",
    sources: ["mdn-429", "wiki-rate-limiting"],
  },
  {
    question: "Gdzie walidować dane formularza?",
    options: [
      "Na kliencie dla wygody i na serwerze dla bezpieczeństwa",
      "Tylko na kliencie — serwer dostaje już sprawdzone dane",
      "Tylko na serwerze — walidacja po stronie klienta nie ma sensu",
    ],
    answer: 0,
    explanation:
      "Walidacja po stronie klienta daje natychmiastową informację zwrotną, ale łatwo ją obejść bezpośrednim żądaniem. Serwer musi sprawdzać wszystko. Wspólny schemat (np. Zod) można używać po obu stronach.",
    sources: ["owasp-top10", "mdn-form-validation"],
  },
  {
    question: "Po co wersjonować API (`/api/v1/...`)?",
    options: [
      "Aby zmieniać kontrakt, nie psując już działających klientów",
      "Aby przyspieszyć odpowiedzi serwera przez cache dla każdej wersji",
      "Aby wyszukiwarki indeksowały nowe wersje strony osobno",
    ],
    answer: 0,
    explanation:
      "Aplikacje mobilne i stare karty przeglądarki długo używają starego kontraktu. Zmiany łamiące trafiają do nowej wersji, a niełamiące (nowe opcjonalne pola) dodaje się do istniejącej. Wersję można przekazać w URL lub nagłówku.",
    sources: ["sd-primer", "graphql-learn"],
  },
  {
    question: "Po co ustawiać timeout na żądaniach sieciowych?",
    options: [
      "Aby nie czekać w nieskończoność i pokazać użytkownikowi błąd lub ponowienie",
      "Aby żądania wykonywały się o ściśle określonej porze dnia",
      "Aby przeglądarka nie cache'owała odpowiedzi dłużej niż ustalono",
    ],
    answer: 0,
    explanation:
      "`fetch` domyślnie nie ma timeoutu: „zawieszone” żądanie sprawia, że wskaźnik ładowania kręci się w nieskończoność. Użyj `AbortSignal.timeout(ms)` i pokaż czytelny stan z przyciskiem ponowienia.",
    sources: ["mdn-abort-controller", "aws-backoff"],
  },
  {
    question: "Czym jest optymistyczna aktualizacja UI?",
    options: [
      "Pokazaniem wyniku od razu, przed odpowiedzią serwera, z możliwością wycofania",
      "Ukrywaniem błędów przed użytkownikiem, by nie psuć wrażeń",
      "Wcześniejszym ładowaniem wszystkich danych w nadziei, że się przydadzą",
    ],
    answer: 0,
    explanation:
      "Polubienie, odhaczenie zadania czy wysłanie wiadomości wydają się natychmiastowe. Jeśli serwer zwróci błąd, stan jest wycofywany, a użytkownik powiadamiany. Pasuje to do akcji z dużym prawdopodobieństwem sukcesu.",
    sources: ["tq-optimistic", "react-useOptimistic"],
  },
  {
    question: "Jak nie stracić szkicu długiego formularza przy przypadkowym zamknięciu karty?",
    options: [
      "Okresowo zapisywać szkic w `localStorage` lub na serwerze",
      "Zabronić użytkownikowi zamykania karty, dopóki formularz nie zostanie wysłany",
      "Trzymać szkic w zmiennej JavaScript w pamięci",
    ],
    answer: 0,
    explanation:
      "Autozapis (z debounce) do `localStorage`/IndexedDB lub na serwer przywraca dane po powrocie. Można dodatkowo ostrzec przez `beforeunload`, ale zabraniać zamknięcia nie można i nie należy. Zmienna w pamięci znika razem z kartą.",
    sources: ["mdn-web-storage", "mdn-indexeddb"],
  },
  {
    question: "Dlaczego dostępność (a11y) uznaje się za niefunkcjonalne wymaganie systemu?",
    options: [
      "Opisuje, jak dobrze wszyscy mogą korzystać z produktu",
      "Jest potrzebna tylko stronom rządowym i nie wpływa na biznes",
      "Sprawdza ją tylko osobny zespół, po wydaniu",
    ],
    answer: 0,
    explanation:
      "Dostępność wpływa na zasięg odbiorców, SEO, ryzyka prawne (przepisy o dostępności w UE i USA) i wygodę dla wszystkich. Taniej jest zaplanować ją od początku: semantyka, obsługa klawiatury, kontrast, ARIA dla złożonych widżetów.",
    sources: ["wcag-quickref", "mdn-a11y"],
  },
  {
    question: "Co uwzględnić, jeśli produkt będzie w kilku językach?",
    options: [
      "Teksty w słownikach, formaty dat i liczb według lokalizacji, RTL i różna długość napisów",
      "Wystarczy tłumaczyć teksty maszynowo przy każdym wyświetleniu strony",
      "Osobna strona dla każdego języka z pełną kopią kodu",
    ],
    answer: 0,
    explanation:
      "Napisów nie hardkoduje się, tylko wynosi do słowników; daty, waluty i liczby formatuje się przez `Intl`; uwzględnia się formy liczby mnogiej, kierunek pisma i długość tłumaczeń. Język zwykle odzwierciedla się w URL dla SEO.",
    sources: ["next-i18n", "mdn-intl"],
  },
  {
    question: "Czym jest feature flag?",
    options: [
      "Przełącznikiem włączającym funkcję bez nowego wdrożenia — dla części lub wszystkich użytkowników",
      "Flagą w `package.json`, która włącza eksperymentalne funkcje Node.js",
      "Plakietką „nowość” obok nowej funkcji w UI",
    ],
    answer: 0,
    explanation:
      "Flagi pozwalają wdrażać kod wyłączony, włączać funkcję stopniowo, robić testy A/B i szybko wyłączać to, co się zepsuło. Stare flagi trzeba usuwać, inaczej kod obrasta gałęziami.",
    sources: ["mf-feature-toggles"],
  },
  {
    question: "Czym jest pojedynczy punkt awarii (single point of failure)?",
    options: [
      "Komponentem, którego awaria kładzie cały system",
      "Miejscem w kodzie, w którym obsługiwane są wszystkie błędy aplikacji",
      "Serwerem, na którym przechowywana jest kopia zapasowa bazy",
    ],
    answer: 0,
    explanation:
      "Na przykład jedna baza bez replik lub jeden serwer bez load balancera. Eliminuje się to przez redundancję: wiele instancji, repliki, różne strefy dostępności. Na frontendzie odpowiednikiem jest cała strona zależna od jednego zewnętrznego skryptu.",
    sources: ["sd-primer", "wiki-replication"],
  },
  {
    question: "Co oznacza dostępność „99.9%” (trzy dziewiątki)?",
    options: [
      "Dopuszczalny przestój to około 8,7 godziny rocznie",
      "Serwis odpowiada na 99,9% żądań w czasie poniżej 100 ms",
      "Serwis działa przy 99,9% mocy serwera",
    ],
    answer: 0,
    explanation:
      "99,9% ≈ 43 minuty przestoju miesięcznie, 99,99% — około 4 minut. Każda kolejna „dziewiątka” jest drastycznie droższa. W tych kategoriach formułuje się SLO (cele wewnętrzne) i SLA (zobowiązania wobec klientów), a „budżet błędów” pomaga wyważyć tempo wydań i niezawodność.",
    sources: ["sre-slo"],
  },
  {
    question: "Dlaczego nie można ufać danym przychodzącym od klienta?",
    options: [
      "Użytkownik może zmienić każde żądanie wysyłane przez klienta",
      "Klient zawsze wysyła dane w złym kodowaniu",
      "Przeglądarka losowo zmienia dane podczas wysyłania",
    ],
    answer: 0,
    explanation:
      "Przez DevTools, curl lub proxy każdy może wysłać dowolne wartości: cenę produktu, cudze ID, rolę administratora. Serwer musi sprawdzać uprawnienia, walidować dane wejściowe i sam przeliczać ważne wartości (sumę zamówienia).",
    sources: ["owasp-top10", "next-data-security"],
  },
  {
    question: "Jak chronić się przed XSS przy wyświetlaniu treści użytkowników?",
    options: [
      "Escapować wyjście, nie wstawiać HTML bez sanitizacji, skonfigurować CSP",
      "Sprawdzać, czy użytkownik wpisał tekst po angielsku",
      "Przechowywać treści użytkowników tylko w `localStorage`",
    ],
    answer: 0,
    explanation:
      "Frameworki domyślnie escapują tekst; niebezpieczne są `innerHTML`, `dangerouslySetInnerHTML` i linki `javascript:`. Jeśli HTML jest potrzebny (edytor), sanitizuje się go na serwerze i kliencie. CSP ogranicza źródła skryptów — to druga linia obrony.",
    sources: ["mdn-xss", "owasp-html5"],
  },
  {
    question: "Czym jest „logowanie” w kontekście utrzymania systemu?",
    options: [
      "Zapisywaniem zdarzeń i błędów do badania problemów",
      "Wejściem użytkownika do systemu przez login i hasło",
      "Kompresowaniem kodu źródłowego przed wysłaniem na serwer",
    ],
    answer: 0,
    explanation:
      "Logi razem z metrykami i trace'ami tworzą obserwowalność. Ważne, by logować w sposób ustrukturyzowany (JSON), z identyfikatorem żądania i bez danych osobowych oraz sekretów.",
    sources: ["opentelemetry", "sd-primer"],
  },
  {
    question: "Dlaczego statyczna strona (SSG) dobrze pasuje do bloga lub dokumentacji?",
    options: [
      "HTML jest budowany z góry i serwowany z CDN — szybko, tanio i niezawodnie",
      "Pozwala użytkownikom edytować strony bezpośrednio w przeglądarce",
      "Działa bez serwera i CDN, prosto z komputera autora",
    ],
    answer: 0,
    explanation:
      "Treść zmienia się rzadko i jest taka sama dla wszystkich, więc opłaca się ją prerenderować. Aktualizacja następuje przez przebudowanie lub ISR. Dane osobiste wymagają renderowania dynamicznego lub ładowania po stronie klienta.",
    sources: ["webdev-rendering-on-web", "next-isr"],
  },
  {
    question: "Dlaczego cache typu Redis przed bazą jest przydatny przy dużym obciążeniu?",
    options: [
      "Częste żądania obsługuje się z pamięci, odciążając bazę",
      "Redis zastępuje bazę, więc nie trzeba jej utrzymywać",
      "Redis szyfruje dane, więc baza staje się bezpieczniejsza",
    ],
    answer: 0,
    explanation:
      "Popularne dane (profile, katalog) czyta się z pamięci w ułamkach milisekundy. Główna trudność to unieważnianie: kiedy i jak aktualizować cache po zmianie danych. Redis uzupełnia główną bazę, a nie ją zastępuje.",
    sources: ["sd-primer"],
  },
  {
    question: "Czym jest replikacja bazy danych?",
    options: [
      "Kopiami danych na kilku serwerach dla niezawodności i odczytów",
      "Usuwaniem zduplikowanych rekordów z tabel bazy",
      "Migracją bazy do nowej wersji schematu",
    ],
    answer: 0,
    explanation:
      "Typowy schemat: jeden główny serwer do zapisu i repliki do odczytu. Przy awarii głównego replikę można awansować. Uwaga: opóźnienie replikacji — świeżo zapisane dane mogą jeszcze nie pojawić się na replice.",
    sources: ["wiki-replication", "sd-primer"],
  },
  {
    question: "Czym jest ETag i po co jest potrzebny?",
    options: [
      "Identyfikatorem wersji zasobu: serwer odpowiada 304, jeśli wersja się nie zmieniła",
      "Tagiem, po którym CDN rozpoznaje kraj użytkownika do tłumaczenia",
      "Tokenem autoryzacji, który przeglądarka dodaje do każdego żądania",
    ],
    answer: 0,
    explanation:
      "Przeglądarka wysyła `If-None-Match: <etag>`, a jeśli zasób się nie zmienił, serwer odpowiada 304 Not Modified bez ciała — oszczędzając transfer. To mechanizm rewalidacji cache używany razem z `Cache-Control`.",
    sources: ["mdn-etag", "mdn-http-caching"],
  },
  {
    question: "Czym long polling różni się od zwykłego pollingu?",
    options: [
      "Serwer trzyma żądanie otwarte, dopóki nie pojawią się nowe dane",
      "Klient wysyła żądania częściej — co 100 ms",
      "Żądanie wysyła się raz na sesję i nigdy się go nie powtarza",
    ],
    answer: 0,
    explanation:
      "Odpowiedź przychodzi, gdy tylko pojawi się zdarzenie, po czym klient otwiera nowe żądanie. Opóźnienie jest mniejsze niż przy zwykłym pollingu i działa przez każde proxy. Dziś częściej używa się SSE lub WebSocket.",
    sources: ["mdn-sse", "mdn-websockets"],
  },
  {
    question: "Jak wysłać analitykę przy zamykaniu strony, nie tracąc żądania?",
    options: [
      "Przez `navigator.sendBeacon` lub `fetch` z `keepalive: true`",
      "Zwykłym `fetch` w handlerze `beforeunload`",
      "Przez `setTimeout` na 5 sekund po zamknięciu karty",
    ],
    answer: 0,
    explanation:
      "Zwykłe żądanie przy rozładowywaniu strony może zostać anulowane. `sendBeacon` kolejkuje mały POST w przeglądarce i dostarcza go w tle. Lepiej wysyłać przy `visibilitychange` (gdy strona jest ukrywana), bo `unload` wyzwala się zawodnie.",
    sources: ["mdn-send-beacon"],
  },
];

export default questions;
