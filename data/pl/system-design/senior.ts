import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Co mówi twierdzenie CAP?",
    options: [
      "Przy podziale sieci trzeba wybierać między spójnością a dostępnością",
      "System rozproszony zawsze może zapewnić wszystkie trzy właściwości naraz",
      "Cache, API i trwałego magazynu nie można umieszczać na jednym serwerze",
    ],
    answer: 0,
    explanation:
      "Consistency, Availability, Partition tolerance: podział sieci w systemie rozproszonym jest nieunikniony, a w tym momencie system albo odrzuca część żądań (CP), albo odpowiada możliwie nieaktualnymi danymi (AP). W normalnej pracy kompromis dotyczy spójności i opóźnienia (PACELC).",
    sources: ["wiki-cap-uk", "sd-primer"],
  },
  {
    question: "Użytkownik zaktualizował profil, odświeżył stronę i zobaczył stare dane. Która gwarancja została naruszona?",
    options: [
      "Read-your-writes: użytkownik powinien widzieć własne zmiany",
      "Atomowość: zmiana została zastosowana tylko w połowie",
      "Izolacja transakcji: dwa żądania przeszkadzają sobie nawzajem",
    ],
    answer: 0,
    explanation:
      "Typowa przyczyna to odczyt z repliki, do której zmiana jeszcze nie dotarła, lub nieaktualny cache. Rozwiązania: przez jakiś czas po zapisie czytać „swoje” dane z węzła głównego, aktualizować cache kliencki odpowiedzią mutacji, używać `updateTag` zamiast unieważniania SWR.",
    sources: ["wiki-replication", "next-updateTag"],
  },
  {
    question: "Czym grozi wybór klucza shardowania „według daty utworzenia”?",
    options: [
      "Wszystkie nowe rekordy trafią do jednego sharda — powstanie gorąca partycja",
      "Dat nie można używać jako klucza w bazach danych",
      "Rekordy z tą samą datą zostaną usunięte jako duplikaty",
    ],
    answer: 0,
    explanation:
      "Shardowanie rozdziela dane między węzły; klucz powinien równomiernie rozkładać obciążenie i pasować do zapytań. Monotoniczny klucz koncentruje zapis w ostatnim shardzie. Często używa się hasha od id użytkownika lub klucza złożonego.",
    sources: ["wiki-sharding", "sd-primer"],
  },
  {
    question: "Po co consistent hashing przy dodawaniu węzłów cache?",
    options: [
      "Przy zmianie liczby węzłów przenosi się tylko niewielka część kluczy",
      "Gwarantuje, że wszystkie klucze są przechowywane na wszystkich węzłach",
      "Szyfruje klucze, by węzły nie widziały nawzajem swoich danych",
    ],
    answer: 0,
    explanation:
      "Z `hash(key) % N` zmiana N przenosi prawie wszystkie klucze, a cache masowo chybia. Pierścień hashy (z wirtualnymi węzłami) przenosi tylko ~1/N kluczy. Używa się go w rozproszonych cache'ach, CDN, bazach.",
    sources: ["wiki-consistent-hashing", "sd-primer"],
  },
  {
    question: "Po co umieszczać kolejkę wiadomości między API a obsługą ciężkich zadań?",
    options: [
      "Aby rozdzielić przyjmowanie i przetwarzanie, wygładzając szczyty obciążenia",
      "Aby uczynić przetwarzanie synchronicznym i zagwarantować odpowiedź w 10 ms",
      "Aby zastąpić bazę danych szybszym magazynem",
    ],
    answer: 0,
    explanation:
      "API szybko przyjmuje żądanie i wstawia zadanie do kolejki (generowanie raportu, przetwarzanie wideo), a workery wykonują je we własnym tempie. Szczyty obciążenia są wygładzane, a awaria workera nie gubi zadania. Klient poznaje wynik przez polling statusu, SSE lub powiadomienie.",
    sources: ["wiki-message-queue", "sd-primer"],
  },
  {
    question: "Dlaczego konsumenci kolejki z dostarczaniem „at-least-once” muszą być idempotentni?",
    options: [
      "Wiadomość może przyjść ponownie i nie powinno to szkodzić",
      "Inaczej kolejka usunie wiadomość przed jej przetworzeniem",
      "Idempotentność jest potrzebna tylko dla kolejek z jednym konsumentem",
    ],
    answer: 0,
    explanation:
      "Exactly-once jest w praktyce kosztowne lub nieosiągalne, więc systemy gwarantują „co najmniej raz”. Handler przechowuje id przetworzonych wiadomości lub czyni operacje idempotentnymi (upsert zamiast insert).",
    sources: ["wiki-message-queue", "stripe-idempotency"],
  },
  {
    question: "Czym jest backpressure?",
    options: [
      "Sygnałem od wolnego konsumenta do źródła: „zwolnij”",
      "Odwrotną kolejnością przetwarzania wiadomości w kolejce",
      "Kompresją danych przed wysłaniem kanałem zwrotnym",
    ],
    answer: 0,
    explanation:
      "Bez przeciwciśnienia szybkie źródło przepełnia bufory i pamięć konsumenta. Przykłady: Streams API w przeglądarce (`ReadableStream` z kolejką), ograniczenie rozmiaru kolejki, odrzucanie żądań 429/503.",
    sources: ["sd-primer"],
  },
  {
    question: "Czym fan-out on write różni się od fan-out on read w feedzie sieci społecznościowej?",
    options: [
      "Przy zapisie post kopiuje się do feedów obserwujących; przy odczycie feed składa się w locie",
      "Przy zapisie post wysyła się tylko autorowi, przy odczycie — wszystkim użytkownikom",
      "To to samo, różnica jest tylko w terminologii",
    ],
    answer: 0,
    explanation:
      "Wstępne obliczanie feedów przyspiesza odczyt, ale post gwiazdy z milionami obserwujących generuje miliony zapisów. Składanie przy odczycie jest tanie przy zapisie, ale wolne przy odczycie. Zwykle stosuje się hybrydę: zwykłym autorom — fan-out on write, celebrytom — domieszanie przy odczycie.",
    sources: ["sd-primer"],
  },
  {
    question: "Jak zapewnić poprawną kolejność wiadomości w czacie?",
    options: [
      "Numery porządkowe w obrębie rozmowy od serwera, a nie czas na kliencie",
      "Sortować wiadomości według czasu urządzenia nadawcy",
      "Wysyłać wiadomości ściśle po jednej i czekać na potwierdzenie od wszystkich",
    ],
    answer: 0,
    explanation:
      "Zegary urządzeń się rozjeżdżają, a wiadomości dostarczane są różnymi drogami. Serwer nadaje monotoniczny numer w obrębie rozmowy; klient pokazuje wysłaną wiadomość z tymczasowym id i zastępuje je potwierdzonym. Luki w numerach sygnalizują potrzebę dociągnięcia.",
    sources: ["sd-primer", "mdn-websockets"],
  },
  {
    question: "Jakie komponenty są zwykle potrzebne w architekturze komunikatora?",
    options: [
      "Bramki WS, magazyn wiadomości, presence i push",
      "Jeden serwer z bazą, który wszyscy klienci odpytują co sekundę",
      "Tylko CDN, bo wiadomości to pliki statyczne",
    ],
    answer: 0,
    explanation:
      "Bramki trzymają połączenia i skalują się poziomo; między nimi jest pub/sub (Redis, Kafka), by wiadomość dotarła do właściwego węzła. Magazyn wiadomości, statusy dostarczenia i przeczytania, presence z heartbeatem, powiadomienia push, synchronizacja między urządzeniami.",
    sources: ["mdn-websockets", "wiki-message-queue"],
  },
  {
    question: "Jak skalować serwery WebSocket poziomo?",
    options: [
      "Połączyć węzły przez pub/sub do dostarczania między nimi",
      "Trzymać wszystkie połączenia na jednym serwerze z dużą ilością pamięci",
      "Przełączać klientów na losowy węzeł przy każdej wiadomości",
    ],
    answer: 0,
    explanation:
      "Użytkownicy jednego czatu są podłączeni do różnych węzłów. Węzeł, który otrzymał wiadomość, publikuje ją w szynie, a węzły z subskrybentami dostarczają ją swoim połączeniom. Load balancer musi obsługiwać długie połączenia; przy wdrożeniu klienci łączą się ponownie stopniowo.",
    sources: ["wiki-load-balancing", "mdn-websockets"],
  },
  {
    question: "Jak zaimplementować status „online” dla milionów użytkowników?",
    options: [
      "Heartbeat z TTL: status wygasa bez sygnałów od klienta",
      "Zapisywać status w głównej bazie przy każdym ruchu myszy",
      "Odpytywać każdego użytkownika z serwera co sekundę",
    ],
    answer: 0,
    explanation:
      "Klient wysyła sygnał co N sekund, a serwer przechowuje klucz z TTL w szybkim magazynie (Redis). Rozłączenie bez jawnego wylogowania wykrywa się po wygaśnięciu. Zmiany statusu rozsyła się tylko tym, którzy je widzą.",
    sources: ["sd-primer"],
  },
  {
    question: "Czym OT różni się od CRDT we wspólnej edycji?",
    options: [
      "OT przekształca operacje przez serwer, CRDT zbiegają się same",
      "OT działa tylko z obrazkami, a CRDT tylko z tekstem",
      "CRDT wymaga blokowania dokumentu na czas każdej edycji",
    ],
    answer: 0,
    explanation:
      "Operational Transformation (Google Docs) koryguje równoległe operacje względem siebie, co jest prostsze z serwerem-arbitrem. CRDT (Yjs, Automerge) to struktury, których stany matematycznie scalają się w jeden w dowolnej kolejności; wygodne offline i w P2P, ale niosą metadane.",
    sources: ["crdt-tech", "wiki-ot"],
  },
  {
    question: "Jak działa adaptacyjny streaming wideo (HLS/DASH)?",
    options: [
      "Segmenty w różnych bitrate'ach, odtwarzacz wybiera według sieci",
      "Wideo ładuje się w całości jednym plikiem w maksymalnej jakości",
      "Serwer transmituje wideo przez WebSocket klatka po klatce",
    ],
    answer: 0,
    explanation:
      "Playlista wymienia warianty jakości, a odtwarzacz (przez MSE) wybiera segmenty zależnie od przepustowości i bufora. Segmenty to zwykłe pliki HTTP, więc CDN dobrze je cache'uje.",
    sources: ["apple-hls", "mdn-mse"],
  },
  {
    question: "Jak zaprojektować serwowanie obrazków użytkowników w różnych rozmiarach?",
    options: [
      "Przechowywać oryginał, generować rozmiary i formaty na żądanie i cache'ować na CDN",
      "Z góry generować wszystkie możliwe rozmiary dla wszystkich urządzeń przy przesyłaniu",
      "Serwować tylko oryginał i skalować go w przeglądarce przez CSS",
    ],
    answer: 0,
    explanation:
      "Serwis transformacji (własny lub chmurowy) według parametrów URL szerokości i formatu tworzy wariant i umieszcza go w cache CDN. Zestaw dopuszczalnych rozmiarów się ogranicza, by nie mnożyć nieskończonych wariantów i nie dawać atakować serwisu.",
    sources: ["wiki-cdn", "webdev-image-formats"],
  },
  {
    question: "Jak zaimplementować rate limiting, jeśli API działa na 20 serwerach?",
    options: [
      "Przechowywać liczniki we wspólnym szybkim magazynie (Redis) lub na bramce",
      "Liczyć limity na każdym serwerze niezależnie — wynik będzie ten sam",
      "Ograniczać żądania tylko w przeglądarce przez JavaScript",
    ],
    answer: 0,
    explanation:
      "Lokalne liczniki dają limit ×20 i zależą od balansowania. Wspólny magazyn z operacjami atomowymi (lub limiter na API gateway/CDN) daje limit globalny. Ograniczenia po stronie klienta łatwo obejść.",
    sources: ["wiki-rate-limiting", "wiki-token-bucket"],
  },
  {
    question: "Do czego przydaje się filtr Blooma?",
    options: [
      "Do szybkiego sprawdzenia „na pewno nie / być może jest” w zbiorze",
      "Do dokładnego policzenia liczby unikalnych elementów zbioru",
      "Do posortowania miliarda rekordów bez użycia pamięci",
    ],
    answer: 0,
    explanation:
      "Filtr Blooma nie daje fałszywie negatywnych odpowiedzi, ale dopuszcza fałszywie pozytywne. Przykład: szybko odsiać na pewno wolne nicki lub URL-e, których na pewno nie ma w cache, zanim pójdzie się do bazy.",
    sources: ["wiki-bloom-filter"],
  },
  {
    question: "Jak generować krótkie linki w serwisie skracania URL?",
    options: [
      "Unikalne id z licznika zakodowane w base62",
      "Losowe 3 znaki bez sprawdzania kolizji",
      "Hash MD5 z całego URL, wszystkie 32 znaki",
    ],
    answer: 0,
    explanation:
      "Base62 z 64-bitowego id daje krótki string bez kolizji; licznik rozdziela się zakresami, by węzły nie synchronizowały się przy każdym żądaniu. Losowe krótkie stringi wymagają sprawdzania kolizji; pełny hash jest za długi. Odczyty się cache'uje, przekierowanie to 301 lub 302 zależnie od potrzeby analityki.",
    sources: ["sd-primer"],
  },
  {
    question: "Jak skalować podpowiedzi wyszukiwania (typeahead) do milionów żądań na sekundę?",
    options: [
      "Wstępne obliczanie top-K dla prefiksów, cache na krawędzi, debounce",
      "Wyszukiwanie pełnotekstowe po całej bazie przy każdym naciśnięciu klawisza",
      "Ładowanie do przeglądarki pełnego słownika wszystkich możliwych podpowiedzi",
    ],
    answer: 0,
    explanation:
      "Popularne prefiksy i ich podpowiedzi (trie lub key-value) są aktualizowane offline na podstawie logów zapytań, a odpowiedzi cache'owane na CDN i w przeglądarce. Klient zmniejsza liczbę żądań przez debounce, anulowanie i lokalny cache prefiksów.",
    sources: ["wiki-trie", "wiki-cdn"],
  },
  {
    question: "Jakie problemy pojawiają się przy działaniu serwisu w kilku regionach (active-active)?",
    options: [
      "Konflikty zapisów, opóźnienie replikacji, przepisy o danych",
      "Żadne — dane synchronizują się natychmiast i za darmo",
      "Tylko wzrost rachunku za hosting, architektura się nie zmienia",
    ],
    answer: 0,
    explanation:
      "Zapis w dwóch regionach jednocześnie wymaga strategii rozwiązywania konfliktów (last-write-wins, CRDT, „region domowy” użytkownika). Ponadto przepisy o lokalizacji danych (np. RODO) ograniczają, gdzie przechowywać dane osobowe.",
    sources: ["wiki-replication", "wiki-cap-uk"],
  },
  {
    question: "Czym nagłówek `Vary: User-Agent` lub `Vary: Cookie` grozi dla CDN?",
    options: [
      "Klucz cache się rozdrabnia i prawie nie ma trafień",
      "CDN przestaje kompresować odpowiedzi dla takich żądań",
      "Przeglądarka odrzuca odpowiedzi z takim nagłówkiem",
    ],
    answer: 0,
    explanation:
      "`Vary` dodaje nagłówki żądania do klucza cache. User-Agent i Cookie są prawie unikalne dla każdego odwiedzającego, więc cache staje się bezużyteczny. Normalizuje się klucz (klasa urządzenia zamiast pełnego UA) i wynosi personalizację z cache'owanej odpowiedzi.",
    sources: ["mdn-http-caching", "wiki-cdn"],
  },
  {
    question: "Czym jest cache stampede i jak mu zapobiec?",
    options: [
      "Lawina przeliczeń wygasłego wpisu; ratują lock i SWR",
      "Cache się przepełnia i wypiera wszystkie wpisy jednocześnie",
      "Użytkownicy masowo czyszczą cache przeglądarki",
    ],
    answer: 0,
    explanation:
      "Gdy popularny klucz wygasa, tysiące żądań jednocześnie idą do bazy. Rozwiązania: łączenie żądań (jedno przelicza, reszta czeka), stale-while-revalidate, losowy rozrzut TTL, rozgrzewanie.",
    sources: ["webdev-swr", "sd-primer"],
  },
  {
    question: "Czym różnią się strategie cache-aside, write-through i write-back?",
    options: [
      "Cache przy odczycie; zapis do cache i bazy; odroczony zapis do bazy",
      "To trzy nazwy jednej strategii w różnych bazach danych",
      "Różnią się tylko ilością pamięci przydzielonej na cache",
    ],
    answer: 0,
    explanation:
      "Cache-aside (lazy loading) jest najpopularniejsza: przy chybieniu czytamy bazę i wkładamy do cache. Write-through utrzymuje cache aktualnym kosztem wolnego zapisu. Write-back jest szybszy, ale ryzykuje utratę danych przy awarii cache.",
    sources: ["sd-primer"],
  },
  {
    question: "Kiedy renderować na edge, a kiedy w regionie blisko bazy danych?",
    options: [
      "Edge — dla lekkiej logiki, region — przy częstych zapytaniach do bazy",
      "Edge jest zawsze szybszy, niezależnie od tego, gdzie są dane",
      "Region jest zawsze szybszy, edge służy tylko do statyki",
    ],
    answer: 0,
    explanation:
      "Edge jest blisko użytkownika, ale jeśli strona robi pięć kolejnych zapytań do bazy przez ocean, każde doda setki milisekund. Render obok danych plus cache CDN często wygrywa. Edge sprawdza się przy przekierowaniach, testach A/B, personalizacji według ciasteczek, autoryzacji.",
    sources: ["next-proxy", "wiki-cdn"],
  },
  {
    question: "Jakie istnieją sposoby kompozycji mikrofrontendów?",
    options: [
      "Podczas budowania, na serwerze i w runtime w przeglądarce",
      "Tylko przez iframe — innych sposobów nie ma",
      "Tylko przez wspólny pakiet npm zbudowany w jedną paczkę",
    ],
    answer: 0,
    explanation:
      "Kompozycja podczas budowania jest prosta, ale odbiera niezależne wdrożenia. Serwerowa składa HTML z fragmentów. Kompozycja w runtime daje niezależne wydania kosztem złożoności i uzgadniania zależności. iframe daje izolację, ale słabo nadaje się do UX i SEO.",
    sources: ["mf-micro-frontends", "module-federation"],
  },
  {
    question: "Jak wdrożyć zmianę API, nie psując klientów starej wersji?",
    options: [
      "Expand-and-contract: dodać, przenieść, usunąć stare",
      "Wdrożyć API i frontend jednocześnie, w tej samej sekundzie",
      "Poprosić użytkowników o odświeżenie strony po wydaniu",
    ],
    answer: 0,
    explanation:
      "Otwarte karty, aplikacje mobilne i cache żyją ze starym kodem. Najpierw API obsługuje zarówno stary, jak i nowy format, potem klienci przechodzą, i dopiero potem stare się usuwa. To samo podejście stosuje się do migracji schematu bazy.",
    sources: ["mf-strangler", "sd-primer"],
  },
  {
    question: "Dlaczego po wdrożeniu SPA użytkownicy dostają `ChunkLoadError`?",
    options: [
      "Stara karta żąda już usuniętego chunka",
      "Przeglądarka nie obsługuje dynamicznego importu modułów",
      "CDN blokuje pliki JavaScript większe niż 1 MB",
    ],
    answer: 0,
    explanation:
      "Nazwy z hashem się zmieniają, a leniwie ładowany chunk starej wersji znika. Rozwiązania: przechowywać zasoby kilku ostatnich wydań, przechwytywać błąd i przeładowywać stronę, ochrona przed version skew (`deploymentId` w Next.js).",
    sources: ["next-self-hosting", "mdn-dynamic-import"],
  },
  {
    question: "Jak metryki, logi i trace'y uzupełniają się nawzajem?",
    options: [
      "Metryki pokazują, że coś jest nie tak, trace'y — gdzie, logi — dlaczego",
      "To trzy nazwy tego samego narzędzia",
      "Logi zastępują metryki i trace'y, jeśli pisać je szczegółowo",
    ],
    answer: 0,
    explanation:
      "Metryki (częstotliwość błędów, p95 opóźnienia) są tanie i nadają się do alertów. Rozproszony trace pokazuje drogę żądania przez serwisy. Logi dają szczegóły konkretnego zdarzenia. OpenTelemetry standaryzuje zbieranie wszystkich trzech sygnałów.",
    sources: ["opentelemetry", "sre-slo"],
  },
  {
    question: "Czym jest budżet błędów (error budget)?",
    options: [
      "Dopuszczalną z SLO częścią awarii, którą można „wydać”",
      "Kwotą pieniędzy przydzieloną na naprawę błędów w kwartale",
      "Maksymalną liczbą otwartych zadań w bug trackerze",
    ],
    answer: 0,
    explanation:
      "Przy SLO 99,9% budżet to 0,1% nieudanych żądań. Dopóki budżet jest, zespół wypuszcza funkcje; gdy się wyczerpie — skupia się na niezawodności. Tak niezawodność staje się mierzalnym kompromisem, a nie sporem.",
    sources: ["sre-slo"],
  },
  {
    question: "Czym jest wzorzec Bulkhead (grodzie)?",
    options: [
      "Izolacją zasobów, by awaria nie pochłonęła całego systemu",
      "Połączeniem wszystkich serwisów w jednym procesie dla szybkości",
      "Szyfrowaniem danych osobno dla każdego użytkownika",
    ],
    answer: 0,
    explanation:
      "Osobne pule połączeń i wątków dla różnych zależności: wolny serwis rekomendacji nie zajmie wszystkich połączeń potrzebnych do płatności. Razem z circuit breakerem i timeoutami zapobiega kaskadowym awariom.",
    sources: ["mf-circuit-breaker", "sd-primer"],
  },
  {
    question: "Dlaczego ważne jest patrzenie na p99 opóźnienia, a nie tylko na średnią?",
    options: [
      "Średnia ukrywa wolny „ogon” żądań",
      "p99 jest zawsze mniejsze od średniej i lepiej wygląda w raportach",
      "Średniej nie da się obliczyć dla żądań sieciowych",
    ],
    answer: 0,
    explanation:
      "Jeśli strona robi 20 żądań, prawdopodobieństwo trafienia na co najmniej jedno wolne jest wysokie, a użytkownik czeka na najwolniejsze. Dlatego SLO formułuje się w percentylach (p95, p99), a Web Vitals ocenia według 75. percentyla.",
    sources: ["sre-slo", "webdev-vitals"],
  },
  {
    question: "Jak połączyć cache'owanie HTML na CDN z personalizacją (imię użytkownika, koszyk)?",
    options: [
      "Cache'ować powłokę, a dane osobiste strumieniować osobno",
      "Wyłączyć cache'owanie HTML dla wszystkich stron",
      "Cache'ować HTML osobno dla każdego użytkownika na CDN",
    ],
    answer: 0,
    explanation:
      "Partial Prerendering, Edge Side Includes lub doładowanie po stronie klienta: część statyczna jest serwowana z CDN natychmiast, a fragmenty osobiste podstawiane przy żądaniu. Cache per użytkownik zabija wydajność CDN i grozi wyciekami.",
    sources: ["next-cache-components", "webdev-rendering-on-web"],
  },
  {
    question: "Dlaczego udanego przekierowania ze strony płatności nie można uznać za potwierdzenie płatności?",
    options: [
      "Przekierowanie można podrobić; potwierdza webhook dostawcy",
      "Przekierowania zawsze przychodzą wcześniej, niż pieniądze zostaną pobrane z konta",
      "Dostawcy płatności nie obsługują przekierowań z powrotem na stronę",
    ],
    answer: 0,
    explanation:
      "Użytkownik może zamknąć kartę lub otworzyć success-URL ręcznie. Źródłem prawdy jest serwerowy webhook od dostawcy ze sprawdzeniem podpisu oraz weryfikacja statusu przez API. Obsługa webhooków musi być idempotentna.",
    sources: ["stripe-idempotency", "owasp-top10"],
  },
  {
    question: "Jak sprawdzić autentyczność przychodzącego webhooka?",
    options: [
      "Sprawdzić podpis HMAC i znacznik czasu",
      "Sprawdzić, że żądanie przyszło metodą POST",
      "Sprawdzić, że w ciele jest pole `verified: true`",
    ],
    answer: 0,
    explanation:
      "Endpoint webhooka jest publiczny, każdy może go wywołać. Dostawca podpisuje ciało sekretem, a ty sprawdzasz podpis (na surowym ciele) i czas, by odsiać ponowne wysłanie. Wszystko inne łatwo podrobić.",
    sources: ["owasp-top10", "stripe-idempotency"],
  },
  {
    question: "Dlaczego indeks wyszukiwania często aktualizuje się asynchronicznie, a nie w tej samej transakcji?",
    options: [
      "Aby zapis do bazy nie zależał od wyszukiwania; ceną jest opóźnienie",
      "Silniki wyszukiwania w ogóle nie obsługują zapisu danych",
      "Transakcje są zabronione przy pracy z danymi tekstowymi",
    ],
    answer: 0,
    explanation:
      "Zmiany przekazuje się do indeksu przez kolejkę lub CDC (change data capture). Główna operacja jest szybka i niezawodna, a wyszukiwanie nadrabia w ciągu sekund — ostateczna spójność. UI powinien być na to gotowy (np. pokazywać właśnie utworzone z lokalnego stanu).",
    sources: ["wiki-message-queue", "mf-cqrs"],
  },
  {
    question: "Jak atomowo zaktualizować bazę danych i wysłać zdarzenie do kolejki?",
    options: [
      "Outbox: zdarzenie zapisuje się do bazy w tej samej transakcji",
      "Najpierw wysłać zdarzenie, potem zapisać do bazy — kolejność nie ma znaczenia",
      "Wysyłać zdarzenie z przeglądarki użytkownika po udanej odpowiedzi API",
    ],
    answer: 0,
    explanation:
      "Bez transakcji obejmującej bazę i broker możliwe są rozbieżności: zapis przeszedł, a zdarzenie się zgubiło (lub odwrotnie). Tabela outbox utrwala zdarzenie atomowo ze zmianą, a relay publikuje je z ponowieniami (at-least-once).",
    sources: ["mf-event-sourcing", "wiki-message-queue"],
  },
  {
    question: "Serwis musi obsłużyć 10 mln aktywnych użytkowników dziennie po 20 żądań. Jakie jest średnie obciążenie?",
    options: ["≈ 2 300 żądań na sekundę", "≈ 200 000 żądań na sekundę", "≈ 23 żądania na sekundę"],
    answer: 0,
    explanation:
      "200 mln żądań dziennie / 86 400 sekund ≈ 2 315 RPS średnio. Obciążenie szczytowe jest zwykle 2–5 razy wyższe od średniego — pod nie planuje się moce. Takie szacunki (back-of-the-envelope) są oczekiwane na rozmowie.",
    sources: ["sd-primer"],
  },
  {
    question: "Czym projektowanie systemu read-heavy różni się od write-heavy?",
    options: [
      "Odczyt — cache i repliki, zapis — kolejki i shardowanie",
      "Nie ma różnicy: architektura nie zależy od proporcji operacji",
      "Systemy read-heavy nie używają baz danych",
    ],
    answer: 0,
    explanation:
      "Katalog produktów czyta się tysiące razy częściej, niż zmienia — opłaca się cache'ować i skalować odczyt. Zbieranie metryk lub logów to strumień zapisów: ważne są przyjmowanie przez kolejkę, zapis paczkami i partycjonowanie.",
    sources: ["sd-primer", "wiki-replication"],
  },
  {
    question: "Jak zbudować dashboard analityczny dla milionów zdarzeń, by otwierał się szybko?",
    options: [
      "Wstępnie agregować dane na serwerze i oddawać klientowi tylko potrzebne punkty",
      "Ładować wszystkie zdarzenia do przeglądarki i liczyć wykresy na kliencie",
      "Budować wykresy z surowych danych z głównej bazy transakcyjnej",
    ],
    answer: 0,
    explanation:
      "Osobne modele odczytu (CQRS, magazyny OLAP) przechowują agregaty według przedziałów; dla wykresu oddaje się przerzedzony szereg (downsampling). Ciężkie zapytania analityczne nie powinny obciążać głównej bazy.",
    sources: ["mf-cqrs", "sd-primer"],
  },
  {
    question: "Jak zaprojektować system powiadomień (e-mail, push, in-app)?",
    options: [
      "Kolejka, ustawienia użytkownika, deduplikacja, ponowienia",
      "Wysyłać powiadomienie synchronicznie prosto z handlera żądania HTTP",
      "Przechowywać powiadomienia tylko w `localStorage` u odbiorcy",
    ],
    answer: 0,
    explanation:
      "Zdarzenie trafia do kolejki, serwis powiadomień sprawdza preferencje i ciche godziny, wybiera kanały, grupuje i deduplikuje, wysyła przez dostawców z ponowieniami i rate limits. Powiadomienia in-app są przechowywane na serwerze i dostarczane przez SSE/WebSocket.",
    sources: ["wiki-message-queue", "mdn-sse"],
  },
  {
    question: "Jak oddawać wynik ciężkiej operacji (eksport raportu trwający 5 minut)?",
    options: [
      "Przyjąć zadanie (202 Accepted), przetworzyć w tle i powiadomić o gotowości",
      "Trzymać żądanie HTTP otwarte przez całe 5 minut do gotowości pliku",
      "Poprosić użytkownika, by nie zamykał karty i poczekał",
    ],
    answer: 0,
    explanation:
      "Serwer zwraca id zadania, a klient śledzi status (polling, SSE) lub dostaje powiadomienie z linkiem do pliku w magazynie. Długie żądania HTTP są zrywane przez proxy i load balancery i słabo się skalują.",
    sources: ["wiki-message-queue", "mdn-sse"],
  },
  {
    question: "Jak frontend może obliczać feature flags bez migotania interfejsu?",
    options: [
      "Obliczać flagi na serwerze lub edge i oddawać gotowy wynik razem z HTML",
      "Pobierać flagi na kliencie po renderze i przerysowywać stronę",
      "Trzymać flagi w kodzie i zmieniać je tylko nowym wdrożeniem",
    ],
    answer: 0,
    explanation:
      "Ładowanie flag po stronie klienta prowadzi do „mignięcia” starego wariantu i przesunięć układu. Ocena na serwerze (lub bootstrap wartości w HTML) daje stabilny pierwszy render. Flagi się cache'uje i uwzględnia w kluczu cache stron.",
    sources: ["mf-feature-toggles", "next-proxy"],
  },
  {
    question: "Co minimalizować w logach i analityce ze względu na prywatność?",
    options: [
      "Dane osobowe: tokeny, hasła, e-maile itp. w URL i zdarzeniach",
      "Liczbę linii logów, niezależnie od zawartości",
      "Znaczniki czasu, by nie dało się odtworzyć kolejności zdarzeń",
    ],
    answer: 0,
    explanation:
      "Tokeny w query stringach trafiają do logów serwerów i proxy, a e-mail w analityce narusza wymagania RODO. Maskuje się pola, nie przekazuje sekretów w URL, ogranicza czas przechowywania logów.",
    sources: ["owasp-top10", "owasp-session"],
  },
  {
    question: "Dlaczego podpisane linki do prywatnych plików robi się krótkotrwałymi?",
    options: [
      "Link, który wyciekł, szybko przestanie działać",
      "Krótkie linki szybciej ładują się w przeglądarce",
      "Magazyny nie obsługują linków dłuższych niż doba",
    ],
    answer: 0,
    explanation:
      "Podpisany URL daje dostęp bez autoryzacji każdemu, kto go ma. Ważność w minutach ogranicza szkody z przekazania lub wycieku przez logi i Referer. Do długiego dostępu wydaje się nowe linki po sprawdzeniu uprawnień.",
    sources: ["s3-presigned", "owasp-top10"],
  },
  {
    question: "Czym projektowanie ze ścisłą spójnością różni się dla salda bankowego i licznika polubień?",
    options: [
      "Saldo potrzebuje transakcji, polubienia nie",
      "Oba wymagają równie ścisłych transakcji bez wyjątków",
      "Oba można liczyć na kliencie bez udziału serwera",
    ],
    answer: 0,
    explanation:
      "Wymagania spójności wyznacza domena: pieniądze potrzebują transakcji ACID i idempotentności, a polubienia można gromadzić, agregować asynchronicznie i pokazywać z opóźnieniem („1,2 tys.”). Wybór wpływa na koszt i skalowalność.",
    sources: ["wiki-cap-uk", "sd-primer"],
  },
  {
    question: "Czym są hedged requests i kiedy są przydatne?",
    options: [
      "Duplikatem żądania do innej repliki przy opóźnieniu odpowiedzi",
      "Żądaniami szyfrowanymi dwukrotnie dla dodatkowego bezpieczeństwa",
      "Żądaniami wysyłanymi tylko poza godzinami pracy",
    ],
    answer: 0,
    explanation:
      "Jeśli odpowiedź spóźnia się dłużej niż zwykle, wysyła się kopię na inny serwer i bierze pierwszą odpowiedź. Obniża to p99 kosztem niewielkiego wzrostu obciążenia. Nadaje się tylko do idempotentnych odczytów.",
    sources: ["sre-slo", "mdn-idempotent"],
  },
  {
    question: "Jak zapewnić działanie strony, jeśli padł serwis rekomendacji?",
    options: [
      "Timeout, circuit breaker i fallback bez rekomendacji",
      "Czekać na odpowiedź rekomendacji w nieskończoność, nie pokazując strony",
      "Zwracać błąd 500 dla całej strony",
    ],
    answer: 0,
    explanation:
      "Niekrytyczne zależności nie powinny kłaść głównego scenariusza. Renderujemy stronę, a blok rekomendacji pokazujemy z cache, popularnymi produktami lub go ukrywamy. Na froncie — Suspense i error boundary wokół bloku, streaming zamiast czekania.",
    sources: ["mf-circuit-breaker", "next-streaming"],
  },
  {
    question: "Jak określić wymagania co do przechowywania wiadomości czatu przez 5 lat dla 1 mln użytkowników?",
    options: [
      "Oszacować objętość: wiadomości × rozmiar × okres, plus repliki",
      "Przechowywać wszystko w pamięci serwera — tak najszybciej",
      "Przechowywanie nie jest ważne na etapie projektowania",
    ],
    answer: 0,
    explanation:
      "Na przykład 1 mln × 50 wiadomości × 200 bajtów ≈ 10 GB dziennie, ≈ 18 TB w 5 lat przed replikacją i indeksami. Taka ocena wyznacza wybór magazynu, partycjonowanie według rozmów i czasu, archiwizację starych danych.",
    sources: ["sd-primer", "wiki-sharding"],
  },
  {
    question: "Czym odporność na awarie active-passive różni się od active-active?",
    options: [
      "W active-passive rezerwa czeka i włącza się przy awarii; w active-active wszystkie węzły obsługują ruch",
      "Active-passive działa tylko dla baz danych, active-active tylko dla frontendu",
      "To to samo, różnica jest tylko w nazwach u różnych chmur",
    ],
    answer: 0,
    explanation:
      "Active-passive jest prostszy pod względem spójności, ale rezerwa stoi bezczynnie, a przełączenie zajmuje czas. Active-active w pełni wykorzystuje zasoby i niezauważalnie przeżywa awarię węzła, ale wymaga rozwiązywania konfliktów i balansowania.",
    sources: ["wiki-load-balancing", "wiki-replication"],
  },
  {
    question: "Dlaczego odpowiedź API dla klientów mobilnych warto projektować z myślą o długim życiu starych wersji?",
    options: [
      "Stare wersje aplikacji żyją miesiącami",
      "Klienci mobilni aktualizują się automatycznie zaraz po wydaniu",
      "Klienci mobilni nie używają API, tylko działają offline",
    ],
    answer: 0,
    explanation:
      "W przeciwieństwie do webu nie da się „przeładować” wszystkich użytkowników. Potrzebne są wsteczna zgodność, wersjonowanie, wymuszona aktualizacja dla krytycznych zmian i metryki według wersji klientów.",
    sources: ["sd-primer", "graphql-learn"],
  },
];

export default questions;
