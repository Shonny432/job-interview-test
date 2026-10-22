import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Czym model „sygnałów” (Solid, Preact Signals, Angular Signals) różni się od modelu React?",
    options: [
      "Aktualizują się tylko zależne miejsca, bez ponownego renderu komponentu",
      "Sygnały przerenderowują całą aplikację przy każdej zmianie stanu",
      "Sygnały działają tylko na serwerze i nie są używane w przeglądarce",
    ],
    answer: 0,
    explanation:
      "Sygnał to reaktywna wartość (Observer): odczyt rejestruje zależność, a zapis aktualizuje dokładnie jej subskrybentów (tekst, atrybut, obliczenie). React natomiast przerenderowuje komponent i porównuje wirtualne drzewo; React Compiler zmniejsza ten koszt, ale model jest inny.",
    sources: ["rg-observer", "react-compiler"],
  },
  {
    question: "Jaki jest główny kompromis mikrofrontendów?",
    options: [
      "Niezależne zespoły i wdrożenia kosztem złożoności, duplikacji i spójności UX",
      "Szybkie ładowanie stron kosztem niemożności pracy zespołowej",
      "Prosta infrastruktura kosztem pracy wszystkich zespołów w jednym repozytorium",
    ],
    answer: 0,
    explanation:
      "Mikrofrontendy są uzasadnione przy wielu autonomicznych zespołach i dużym produkcie: każdą część wdraża się osobno. Kosztem są zduplikowane zależności, złożona integracja, wspólny design, routing i komunikacja między częściami. Mniejszym zespołom zwykle wystarcza modularny monolit.",
    sources: ["mf-micro-frontends"],
  },
  {
    question: "Dlaczego w Module Federation React deklaruje się jako singleton `shared`?",
    options: [
      "Dwie kopie React w jednej aplikacji psują hooki i kontekst",
      "Inaczej React ładuje się wolniej z powodu braku cache CDN",
      "To wymóg licencji React dla projektów komercyjnych",
    ],
    answer: 0,
    explanation:
      "Hooki i kontekst są powiązane z konkretną instancją React: komponent ze zdalnego modułu z własną kopią powoduje „Invalid hook call”, a konteksty nie są widoczne. Współdzielone zależności-singletony wymagają uzgadniania wersji między zespołami.",
    sources: ["module-federation", "mf-micro-frontends"],
  },
  {
    question: "Jak działa wzorzec Strangler Fig przy migracji przestarzałego frontendu?",
    options: [
      "Nowy system stopniowo przejmuje trasy i funkcje starego, aż ten zniknie",
      "Stary system wyłącza się całkowicie w jeden dzień i zastępuje przepisanym",
      "Nowy i stary system działają równolegle na zawsze na różnych domenach",
    ],
    answer: 0,
    explanation:
      "Na przykład proxy kieruje `/checkout` do nowej aplikacji Next.js, a resztę do starej. Ryzyko jest mniejsze niż przy „wielkim przepisaniu”: wartość dostarcza się stopniowo, a na każdym kroku można się wycofać.",
    sources: ["mf-strangler"],
  },
  {
    question: "Co oznacza CQRS?",
    options: [
      "Osobne modele dla zapisu (poleceń) i odczytu (zapytań)",
      "Cache'owanie zapytań po stronie klienta w store Redux",
      "Szyfrowanie zapytań i odpowiedzi w trakcie przesyłania",
    ],
    answer: 0,
    explanation:
      "Model odczytu można zoptymalizować pod wyświetlanie (zdenormalizowane widoki), a model zapisu pod reguły biznesowe. Dodaje to złożoności i często ostateczną spójność, więc stosuje się to w złożonych domenach, a nie domyślnie. Na frontendzie podobna idea to rozdzielenie mutacji i zapytań, jak w TanStack Query.",
    sources: ["mf-cqrs"],
  },
  {
    question: "Czym jest Event Sourcing?",
    options: [
      "Stan to dziennik zdarzeń, a bieżącą wartość się z niego wyprowadza",
      "Subskrypcja zdarzeń DOM przez jeden handler na `document`",
      "Generowanie zdarzeń analitycznych przy każdym kliknięciu użytkownika",
    ],
    answer: 0,
    explanation:
      "Zamiast „saldo = 100” przechowuje się zdarzenia typu „wpłacono 150” i „wypłacono 50”. Daje to pełny audyt i możliwość odtworzenia oraz przeliczenia stanu. Redux z time travel to odpowiednik na frontendzie: stan = redukcja akcji.",
    sources: ["mf-event-sourcing"],
  },
  {
    question: "Czym jest Bounded Context w DDD?",
    options: [
      "Granicą, w obrębie której pojęcia modelu są jednoznaczne",
      "Limitem rozmiaru React Context w kilobajtach",
      "Zakresem widoczności zmiennej wewnątrz bloku `{}`",
    ],
    answer: 0,
    explanation:
      "„Zamówienie” oznacza co innego w katalogu, płatnościach i dostawie, a jeden model dla wszystkich staje się kompromisem. Konteksty rozdzielają modele i łączą się przez jawne integracje. To dobra podstawa do podziału na moduły, serwisy i mikrofrontendy.",
    sources: ["mf-bounded-context"],
  },
  {
    question: "Na czym polega architektura heksagonalna (Ports & Adapters)?",
    options: [
      "Rdzeń komunikuje się ze światem przez interfejsy-porty, a adaptery je implementują",
      "Aplikacja jest podzielona na sześć obowiązkowych warstw o stałych nazwach",
      "Każdy moduł łączy się z sąsiadami przez dokładnie sześć połączeń",
    ],
    answer: 0,
    explanation:
      "Port to interfejs, np. `PaymentPort`; adaptery to Stripe, mock, implementacja testowa. Rdzeń nic nie wie o HTTP, bazie ani UI. Idea jest bliska Clean Architecture i DIP; na frontendzie porty często wyraża się przez hooki lub wstrzykiwane serwisy.",
    sources: ["clean-architecture", "wiki-dip"],
  },
  {
    question: "Kiedy Clean Architecture na frontendzie zaczyna szkodzić?",
    options: [
      "Gdy warstw i abstrakcji jest więcej niż prawdziwej logiki biznesowej",
      "Gdy projekt używa TypeScript w trybie strict",
      "Gdy zespół ma więcej niż trzech frontend developerów",
    ],
    answer: 0,
    explanation:
      "Dla interfejsu CRUD łańcuch „use case → repozytorium → mapper → DTO” dla każdego przycisku to przeinżynierowanie: dużo kodu bez korzyści. Architektura powinna odpowiadać złożoności domeny; czasem wystarczy oddzielić UI, stan i warstwę API.",
    sources: ["clean-architecture", "mf-yagni"],
  },
  {
    question: "Jak automatycznie egzekwować architektoniczne reguły importów (np. warstwy FSD)?",
    options: [
      "Linterami granic w CI (dependency-cruiser, Steiger)",
      "Tylko przez code review — nie da się tego zautomatyzować",
      "Przez TypeScript `strict`, który zabrania takich importów",
    ],
    answer: 0,
    explanation:
      "Reguły typu „features nie importują widgets” i „bez cykli” są sprawdzane w CI. Bez automatyzacji architektura z czasem degraduje. TypeScript sam warstw nie sprawdza.",
    sources: ["fsd", "monorepo-tools"],
  },
  {
    question: "Czym jest Anti-Corruption Layer?",
    options: [
      "Warstwą tłumaczącą, która nie wpuszcza cudzego modelu do twojego",
      "Warstwą na poziomie bazy danych chroniącą przed SQL injection",
      "Sprawdzeniem antywirusowym plików przesyłanych przez użytkowników",
    ],
    answer: 0,
    explanation:
      "Integracja z przestarzałym API lub zewnętrznym SDK przez adaptery i mapowanie: dziwne nazwy pól, kody błędów i formaty zostają na granicy. Zmniejsza to vendor lock-in: zmiana dostawcy dotyczy tylko tej warstwy.",
    sources: ["mf-bounded-context", "rg-adapter"],
  },
  {
    question: "Czym Observable z RxJS różni się od Promise?",
    options: [
      "Observable to leniwy, anulowalny strumień; Promise to pojedyncza wartość",
      "Observable jest zawsze synchroniczny, Promise zawsze asynchroniczny",
      "Observable to stara nazwa Promise z wczesnych wersji JS",
    ],
    answer: 0,
    explanation:
      "Promise startuje od razu, daje jedną wartość i nie da się go anulować. Observable startuje przy subskrypcji, może emitować wiele wartości (zdarzenia, WebSocket), anuluje się przez wypisanie i ma operatory (`debounceTime`, `switchMap`). To implementacja Observer + Iterator.",
    sources: ["rg-observer", "rg-iterator"],
  },
  {
    question: "Co dają statecharts (XState) w porównaniu z płaskim automatem skończonym?",
    options: [
      "Zagnieżdżone i równoległe stany bez eksplozji ich liczby",
      "Automatyczne generowanie komponentów UI z opisu stanów",
      "Przechowywanie stanu na serwerze zamiast na kliencie",
    ],
    answer: 0,
    explanation:
      "Płaski automat dla złożonego procesu (odtwarzacz wideo, wieloetapowy formularz) szybko się rozrasta. Zagnieżdżone i równoległe stany, strażnicy przejść i efekty uboczne są opisywane deklaratywnie, a diagram można wizualizować i testować.",
    sources: ["rg-state"],
  },
  {
    question: "Czym jest wzorzec Backend for Frontend (BFF)?",
    options: [
      "Warstwą serwerową dopasowaną do konkretnego klienta, agregującą API",
      "Backendem napisanym w React przez frontend developerów",
      "Cache'em przeglądarki zastępującym wywołania backendu",
    ],
    answer: 0,
    explanation:
      "Aplikacja mobilna i web potrzebują różnych danych. BFF łączy żądania do mikroserwisów, usuwa zbędne pola, przechowuje sekrety i sesję. Tę rolę często pełni Next.js z Route Handlers i Server Components.",
    sources: ["mf-microservices", "next-route-handlers"],
  },
  {
    question: "Czym jest expression problem i jak przejawia się w TS?",
    options: [
      "Unie łatwo rozszerzać o operacje, klasy — o nowe typy",
      "TypeScript nie potrafi wywnioskować typów złożonych wyrażeń",
      "Wyrażeń JSX nie da się otypować bez `as`",
    ],
    answer: 0,
    explanation:
      "Przy unii dyskryminowanej dodanie nowej funkcji-handlera jest łatwe, ale nowy wariant wymaga edycji każdego `switch`. W OOP z klasami dodanie nowego typu jest łatwe, a nowej operacji — drogie (rozwiązuje to Visitor). Wybór zależy od tego, co będzie zmieniać się częściej.",
    sources: ["rg-visitor", "ts-narrowing"],
  },
  {
    question: "Co oznacza „functional core, imperative shell”?",
    options: [
      "Logika jako czyste funkcje, efekty w cienkiej zewnętrznej warstwie",
      "Rdzeń jest napisany w Haskellu, a powłoka w JavaScript",
      "Komponenty to funkcje, a hooki to klasy",
    ],
    answer: 0,
    explanation:
      "Obliczenia, walidację i przejścia stanów łatwo testować bez mocków, a żądania, timery i DOM są izolowane na krawędziach. Reducery Redux z efektami w middleware lub TanStack Query to przykłady takiego rozdzielenia.",
    sources: ["react-pure", "clean-architecture"],
  },
  {
    question: "Czym jest „zasada Hollywood” i jak przejawia się w React?",
    options: [
      "„Nie dzwoń do nas, my zadzwonimy”: framework wywołuje twój kod",
      "Komponenty powinny być efektowne i animowane",
      "Stan przekazuje się tylko z góry na dół przez propsy",
    ],
    answer: 0,
    explanation:
      "Opisujesz komponenty, a React decyduje, kiedy je renderować i wywoływać efekty oraz handlery. To odróżnia framework od biblioteki narzędziowej, którą wywołujesz ty. Render props i callbacki to lokalne formy tej samej zasady.",
    sources: ["mf-injection"],
  },
  {
    question: "Czym jest Composition Root?",
    options: [
      "Jednym miejscem, w którym składany jest graf zależności",
      "Głównym komponentem React, który renderuje wszystkie strony",
      "Głównym katalogiem monorepo",
    ],
    answer: 0,
    explanation:
      "Konkretne implementacje (klient API, logger, magazyn) tworzy się i łączy w punkcie wejścia (`main`, główny layout z providerami), a reszta kodu dostaje abstrakcje. Dzięki temu zależności są widoczne i wymienne.",
    sources: ["mf-injection"],
  },
  {
    question: "Dlaczego Service Locator często uważa się za antywzorzec w porównaniu z DI?",
    options: [
      "Zależności są ukryte: nie widać ich w sygnaturze",
      "Service Locator działa tylko na serwerze",
      "Service Locator jest wolniejszy z powodu wyszukiwania po kluczach-stringach",
    ],
    answer: 0,
    explanation:
      "`locator.get('api')` wewnątrz funkcji to niejawna zależność: test musi skonfigurować globalny rejestr, a błędy ujawniają się w runtime. Przy DI zależności są widoczne w parametrach. `useContext` jest bliski lokatorowi, ale ograniczony do drzewa i otypowany.",
    sources: ["mf-injection"],
  },
  {
    question: "Co jest złego w „God Context” — jednym React Context z całym stanem aplikacji?",
    options: [
      "Każda zmiana budzi wszystkich konsumentów",
      "Context nie może mieć więcej niż 100 pól",
      "Takiego kontekstu nie można używać w Server Components",
    ],
    answer: 0,
    explanation:
      "Zmiana motywu przerenderowuje koszyk, a wpisywanie w formularzu wyszukiwania — cały katalog. Ponadto wszystkie moduły zostają powiązane przez jeden obiekt. Dziel kontekst według domen i częstotliwości zmian lub użyj store'a z selektorami.",
    sources: ["react-useContext", "rg-smells"],
  },
  {
    question: "Czym jest temporal coupling?",
    options: [
      "Kolejność wywołań ma znaczenie, ale interfejs tego nie wyraża",
      "Moduły zależą od bieżącej daty i godziny systemu",
      "Komponenty renderują się w różnym czasie z powodu Suspense",
    ],
    answer: 0,
    explanation:
      "Na przykład `client.init()` trzeba wywołać przed `client.send()`, inaczej będzie błąd. Lepiej uczynić złą kolejność niemożliwą: fabryka zwracająca gotowy obiekt lub Builder, który wydaje obiekt dopiero po obowiązkowych krokach.",
    sources: ["rg-builder", "rg-smells"],
  },
  {
    question: "Co mówi prawo Conwaya?",
    options: [
      "Architektura odzwierciedla strukturę komunikacji w organizacji",
      "Złożoność systemu podwaja się co dwa lata",
      "Każdy system działa tylko przy 80% obciążenia",
    ],
    answer: 0,
    explanation:
      "Trzy zespoły zwykle tworzą trzy moduły lub serwisy. Wykorzystuje się to świadomie („odwrotny manewr Conwaya”): zespoły układa się pod docelową architekturę. Mikrofrontendy i mikroserwisy to w dużej mierze decyzje organizacyjne.",
    sources: ["mf-microservices", "mf-micro-frontends"],
  },
  {
    question: "Czym podejście MobX różni się architektonicznie od Redux?",
    options: [
      "MobX — mutowalne obserwowalne obiekty; Redux — niemutowalny store i jawne akcje",
      "MobX przechowuje dane na serwerze, Redux w przeglądarce",
      "MobX działa tylko z komponentami klasowymi, Redux z funkcyjnymi",
    ],
    answer: 0,
    explanation:
      "MobX automatycznie śledzi zależności i aktualizuje precyzyjnie, ale przepływ zmian jest mniej jawny. Redux wymaga więcej kodu, ale zmiany przechodzą przez akcje i reducery — łatwiej debugować i odtwarzać. Wybór to kompromis między wygodą a przewidywalnością.",
    sources: ["redux-essentials", "rg-observer"],
  },
  {
    question: "Dlaczego oddzielenie stanu „serwerowego” i „klienckiego” uważa się za ważną decyzję architektoniczną?",
    options: [
      "Mają różne zadania: cache'owanie i synchronizacja kontra UI",
      "Stanu serwerowego nie można trzymać w pamięci przeglądarki",
      "Stan kliencki musi być zawsze przechowywany w ciasteczkach",
    ],
    answer: 0,
    explanation:
      "Dane serwerowe to kopia, która się dezaktualizuje: potrzebuje cache'owania, unieważniania, ponowień i deduplikacji (TanStack Query, RTK Query, RSC). Stan UI (czy dialog jest otwarty, szkic formularza) należy do klienta. Mieszanie ich w jednym store prowadzi do ręcznej synchronizacji i błędów.",
    sources: ["tq-overview", "tkdodo-practical-rq"],
  },
  {
    question: "Czym jest Islands Architecture?",
    options: [
      "Statycznym HTML z niezależnymi interaktywnymi „wyspami”",
      "Podziałem aplikacji na izolowane mikroserwisy na różnych serwerach",
      "Strategią wdrażania w kilku regionach chmury",
    ],
    answer: 0,
    explanation:
      "Większość strony to HTML bez JS, a JS ładuje się tylko dla interaktywnych widżetów (Astro, Fresh). Zmniejsza to rozmiar JS i czas do interaktywności stron z treścią. React Server Components rozwiązują podobny problem w obrębie drzewa React.",
    sources: ["pd-islands", "webdev-rendering-on-web"],
  },
  {
    question: "Jak poprawnie rozwijać publiczne API wspólnej biblioteki komponentów?",
    options: [
      "SemVer, okres deprecacji i codemody",
      "Zmieniać API w dowolnym momencie — konsumenci sami się zaktualizują",
      "Nigdy nie zmieniać API po pierwszym wydaniu",
    ],
    answer: 0,
    explanation:
      "Breaking change to wersja major; przed usunięciem API oznacz je jako przestarzałe z ostrzeżeniem i instrukcją. Codemody (jak dla Next.js i React) automatyzują migrację. Tak biblioteka się rozwija, nie psując dziesiątek aplikacji.",
    sources: ["storybook", "next-upgrade-16"],
  },
  {
    question: "Czym jest ADR (Architecture Decision Record)?",
    options: [
      "Zapisem kontekstu, decyzji i jej konsekwencji",
      "Automatycznym raportem wydajności po buildzie",
      "Rejestrem wszystkich zależności projektu z ich licencjami",
    ],
    answer: 0,
    explanation:
      "ADR trzyma się obok kodu, by po roku było jasne, dlaczego np. wybrano TanStack Query zamiast Redux. Zmniejsza to powracające spory i pomaga nowym członkom zespołu.",
    sources: ["sd-primer"],
  },
  {
    question: "Dlaczego kolejność middleware lub interceptorów w łańcuchu odpowiedzialności jest ryzykowna?",
    options: [
      "Wynik zależy od kolejności handlerów",
      "Kolejność nie ma znaczenia — handlery działają równolegle",
      "Handlery są zawsze automatycznie sortowane alfabetycznie",
    ],
    answer: 0,
    explanation:
      "Odświeżenie tokena musi być przed ponowieniem, cache'owanie po autoryzacji, przekształcanie błędów na końcu. Kolejność należy ustalić jawnie w jednym miejscu i pokryć testami.",
    sources: ["rg-chain"],
  },
  {
    question: "Co wyróżnia Value Object?",
    options: [
      "Równość według wartości, niezmienność, własne niezmienniki",
      "Obiekt przechowuje tylko wartości liczbowe",
      "Obiekt tworzy się tylko przez fabrykę-singleton",
    ],
    answer: 0,
    explanation:
      "`Money(100, 'USD')` jest równe innemu `Money(100, 'USD')`, a operacje zwracają nowe obiekty. Walidacja w jednym miejscu wyklucza „ujemną kwotę” w całym kodzie. W TS bliskie temu są typy branded z fabrykami.",
    sources: ["mf-bounded-context", "rg-smells"],
  },
  {
    question: "Czym jest Agregat (Aggregate) w DDD?",
    options: [
      "Grupą obiektów z korzeniem, przez który przechodzą zmiany",
      "Zapytaniem SQL z `GROUP BY` i funkcjami agregującymi",
      "Połączeniem kilku komponentów React w jeden",
    ],
    answer: 0,
    explanation:
      "Na przykład zamówienie z pozycjami: pozycje można zmieniać tylko przez `Order`, który pilnuje niezmienników (suma, limity). Agregat to granica spójności i transakcji.",
    sources: ["mf-bounded-context"],
  },
  {
    question: "Czego wymaga zasada Command-Query Separation (CQS)?",
    options: [
      "Metoda albo zmienia stan, albo zwraca dane",
      "Polecenia i zapytania trzeba przechowywać w różnych bazach",
      "Zapytania do API wykonuje się tylko metodą GET",
    ],
    answer: 0,
    explanation:
      "Funkcja-zapytanie bez efektów ubocznych jest przewidywalna i bezpieczna przy wielokrotnym wywołaniu (np. podczas renderu). Są wyjątki (`stack.pop()`), ale zasada pomaga uniknąć niespodzianek typu getter, który wykonuje żądanie. CQRS to architektoniczne rozwinięcie tej idei.",
    sources: ["mf-cqrs"],
  },
  {
    question: "Co oznacza zasada „Tell, Don't Ask”?",
    options: [
      "Poproś obiekt o działanie zamiast decydować za niego",
      "Nie zadawaj pytań kolegom — czytaj dokumentację",
      "Loguj każdą akcję zamiast zwracać wartości",
    ],
    answer: 0,
    explanation:
      "Zamiast `if (cart.items.length > 0 && !cart.locked) cart.items.push(x)` — `cart.add(x)` z regułami w środku. Utrzymuje to niezmienniki blisko danych i zmniejsza liczbę „zazdrosnych” funkcji.",
    sources: ["wiki-demeter", "rg-smells"],
  },
  {
    question: "Co oznacza zasada Fail Fast?",
    options: [
      "Zgłaszaj błąd od razu i jawnie przy niepoprawnych danych",
      "Szybko wypuszczaj funkcje, nawet jeśli mogą się wysypać",
      "Wyłączaj testy, jeśli trwają zbyt długo",
    ],
    answer: 0,
    explanation:
      "Walidacja konfiguracji i danych wejściowych przy starcie lub na granicy (schematy Zod, funkcje asercji) daje czytelny błąd obok przyczyny, a nie tajemnicze `undefined` dziesięć wywołań później.",
    sources: ["ts-narrowing", "rg-smells"],
  },
  {
    question: "Jakie jest ryzyko prawa Postela („bądź liberalny w tym, co przyjmujesz”)?",
    options: [
      "Tolerowanie błędów utrwala je u klientów",
      "Ścisła walidacja zawsze spowalnia serwer kilkukrotnie",
      "Zasada zabrania walidacji po stronie klienta",
    ],
    answer: 0,
    explanation:
      "Jeśli API przyjmuje niepoprawne dane, klienci zaczynają na tym polegać, a naprawa staje się breaking change. Nowoczesne podejście to ścisła walidacja wejścia i jawne wersjonowanie zmian.",
    sources: ["sd-primer", "fsd"],
  },
  {
    question: "Jak UI powinien uwzględniać ostateczną spójność w systemie zdarzeniowym?",
    options: [
      "Pokazywać statusy pośrednie i wycofywać optymistyczne aktualizacje",
      "Czekać na pełną spójność i do tego czasu blokować UI",
      "Ignorować: spójność to wyłącznie zadanie backendu",
    ],
    answer: 0,
    explanation:
      "Po wysłaniu polecenia dane na liście mogą się nie zaktualizować od razu. UI pokazuje status „w trakcie”, stosuje optymistyczną zmianę i aktualizuje ją po zdarzeniu (WebSocket, ponowne pobranie) lub wycofuje przy błędzie.",
    sources: ["mf-event-sourcing", "tq-optimistic"],
  },
  {
    question: "Czym redux-saga różni się od listener middleware i thunków?",
    options: [
      "Saga opisuje złożone przepływy asynchroniczne generatorami",
      "Saga działa synchronicznie i nie może wykonywać żądań",
      "Saga to stara nazwa `createAsyncThunk`",
    ],
    answer: 0,
    explanation:
      "Generatory z efektami `take`, `race` i `cancel` pozwalają deklaratywnie opisywać długotrwałe procesy i testować je krok po kroku. Kosztem jest złożoność i próg wejścia. RTK zaleca thunki i listener middleware do większości zadań.",
    sources: ["rtk-listener", "jsinfo-generators"],
  },
  {
    question: "Dlaczego normalizacja danych w store na frontendzie to wzorzec architektoniczny, a nie mikrooptymalizacja?",
    options: [
      "Każda encja jest przechowywana raz według id — bez rozjazdów",
      "Znormalizowane dane zajmują mniej miejsca w localStorage",
      "Bez normalizacji Redux zabrania przechowywania tablic",
    ],
    answer: 0,
    explanation:
      "Jeśli użytkownik występuje zarówno na liście, jak i w komentarzach, zdenormalizowane kopie się rozjeżdżają. Tabela `{ ids, entities }` daje jedno źródło prawdy i szybkie aktualizacje według id. Kosztem jest składanie danych selektorami.",
    sources: ["redux-normalizing", "rtk-createEntityAdapter"],
  },
  {
    question: "Jak użyć Strategy do testów A/B bez zaśmiecania komponentów warunkami?",
    options: [
      "Wybrać implementację na granicy i przekazać ją do środka",
      "Pisać `if (experiment === 'B')` w każdym dotkniętym komponencie",
      "Wdrażać osobny build aplikacji dla każdego wariantu",
    ],
    answer: 0,
    explanation:
      "Fabryka lub provider wybiera komponent/strategię według flagi, a reszta kodu pracuje ze wspólnym interfejsem. Po eksperymencie przegrany wariant usuwa się w jednym miejscu, bez szukania warunków po całym projekcie.",
    sources: ["rg-strategy", "mf-feature-toggles"],
  },
  {
    question: "Czym są aferentne i eferentne powiązania modułu?",
    options: [
      "Ile modułów od niego zależy i od ilu on zależy",
      "Szybkość ładowania modułu przez sieć i jego rozmiar",
      "Liczba przychodzących i wychodzących żądań HTTP modułu",
    ],
    answer: 0,
    explanation:
      "Moduł, od którego zależy wiele innych (wysokie powiązanie aferentne), powinien być stabilny i abstrakcyjny — np. `shared/ui`. Moduł zależny od wielu innych jest niestabilny. Metryka niestabilności pomaga wykryć naruszenia kierunku zależności.",
    sources: ["fsd", "clean-architecture"],
  },
  {
    question: "Czym modularny monolit różni się od mikroserwisów (mikrofrontendów)?",
    options: [
      "Jeden build i wdrożenie, ale ścisłe granice modułów w środku",
      "Monolit nie może mieć modułów — to jeden duży folder",
      "Modularny monolit wdraża się częściami na różne serwery",
    ],
    answer: 0,
    explanation:
      "Modularny monolit daje większość korzyści z podziału (granice, własność, publiczne API) bez złożoności rozproszonej. Często to właściwy pierwszy krok: moduły można wydzielić później, jeśli pojawi się realna potrzeba.",
    sources: ["mf-microservices", "monorepo-tools"],
  },
  {
    question: "Czym są zdarzenia domenowe na frontendzie i dlaczego są przydatne?",
    options: [
      "Wiadomościami o faktach domenowych dla niezależnych modułów",
      "Zdarzeniami DOM typu `click` i `input` na elementach formularza",
      "Zdarzeniami, które przeglądarka wysyła przy zmianie domeny",
    ],
    answer: 0,
    explanation:
      "Moduł zamówienia publikuje zdarzenie, a analityka, koszyk i powiadomienia reagują bez bezpośredniego powiązania. To Pub/Sub na poziomie domeny; ważne jest prowadzenie katalogu zdarzeń i typowanie ich ładunku.",
    sources: ["rg-observer", "mf-event-sourcing"],
  },
  {
    question: "Jak wzorzec Circuit Breaker pomaga klientowi przy awarii API?",
    options: [
      "Po serii błędów tymczasowo przestaje wysyłać żądania",
      "Szyfruje żądania przy wykryciu podejrzanej aktywności",
      "Automatycznie przełącza użytkownika na inny język UI",
    ],
    answer: 0,
    explanation:
      "Stany: zamknięty (żądania przechodzą), otwarty (natychmiastowa porażka lub fallback), półotwarty (żądania próbne). Zapobiega to lawinie ponowień do niedziałającego serwisu i daje użytkownikowi szybką odpowiedź z ograniczoną funkcjonalnością.",
    sources: ["mf-circuit-breaker", "wiki-circuit-breaker"],
  },
  {
    question: "Kiedy wzorzec Visitor jest uzasadniony w projekcie TypeScript?",
    options: [
      "Gdy typy węzłów są stabilne, a operacji przybywa",
      "Gdy typy węzłów zmieniają się co tydzień, a operacja jest jedna",
      "Gdy trzeba zagwarantować jedną instancję klasy",
    ],
    answer: 0,
    explanation:
      "Visitor jest wygodny dla AST, dokumentów i drzew bloków edytora: nowe operacje (renderowanie, eksport, walidacja) dodaje się bez zmiany węzłów. Jeśli często dochodzą nowe węzły, trzeba zmieniać każdego visitora — to właśnie expression problem.",
    sources: ["rg-visitor"],
  },
  {
    question: "Jak zaimplementować niezawodne undo we wspólnym edytorze, w którym edytuje kilku użytkowników?",
    options: [
      "Cofać własne operacje, uwzględniając cudze (OT/CRDT)",
      "Trzymać migawkę całego dokumentu i do niej wracać",
      "Całkowicie zabronić jednoczesnej edycji",
    ],
    answer: 0,
    explanation:
      "Globalny powrót do migawki zniszczyłby cudze zmiany. We wspólnych systemach undo to nowa odwrotna operacja na bieżącym stanie, uwzględniająca równoległe edycje. Command i Memento działają lokalnie, ale współpraca wymaga modeli OT lub CRDT.",
    sources: ["crdt-tech", "wiki-ot"],
  },
  {
    question: "Co daje Fasada nad zewnętrzną biblioteką UI (np. własny `<Button>` na MUI)?",
    options: [
      "Własne stabilne API i wymianę biblioteki w jednym miejscu",
      "Opakowania przyspieszają komponenty biblioteki",
      "Wymagają tego licencje większości bibliotek UI",
    ],
    answer: 0,
    explanation:
      "Aplikacja używa tylko twoich komponentów z potrzebnymi wariantami, a szczegóły biblioteki są ukryte. Aktualizacja do nowej wersji major lub migracja dotyczy tylko warstwy opakowań. Minus: trzeba utrzymywać opakowania i nie przepuszczać przez nie całego API biblioteki.",
    sources: ["rg-facade", "storybook"],
  },
  {
    question: "Jaka jest różnica między „dziedziczeniem implementacji” a „dziedziczeniem interfejsu”?",
    options: [
      "Pierwsze bierze kod rodzica, drugie tylko kontrakt",
      "Pierwsze działa tylko w TypeScript, drugie tylko w JavaScript",
      "To to samo; różni się tylko składnia",
    ],
    answer: 0,
    explanation:
      "`extends` klasy wciąga implementację i tworzy silne powiązanie z rodzicem. `implements` lub typowanie strukturalne określają tylko kontrakt. Większość rad „kompozycja zamiast dziedziczenia” dotyczy właśnie dziedziczenia implementacji.",
    sources: ["wiki-composition", "ts-classes"],
  },
  {
    question: "Dlaczego wzorzec Saga (orkiestracja) w procesach rozproszonych dotyczy frontendu?",
    options: [
      "Wieloetapowy proces z akcjami kompensującymi przy błędzie kroku",
      "Długa animacja z kilkoma kolejnymi etapami",
      "Historia zmian komponentu w DevTools",
    ],
    answer: 0,
    explanation:
      "Składanie zamówienia: rezerwacja towaru → płatność → dostawa; jeśli płatność się nie powiedzie, rezerwację trzeba anulować. Frontend powinien odzwierciedlać statusy pośrednie i wynik kompensacji, a nie traktować operacji jako atomowej.",
    sources: ["mf-microservices", "rtk-listener"],
  },
  {
    question: "Jak Server Components zmieniają architekturę w porównaniu z SPA?",
    options: [
      "Dane i logika na serwerze, interaktywność na kliencie",
      "Klient całkowicie rezygnuje z JavaScriptu we wszystkich komponentach",
      "Serwer renderuje wszystko, a klient nie może przechowywać stanu",
    ],
    answer: 0,
    explanation:
      "Granica `'use client'` staje się decyzją architektoniczną: gdzie żyją stan i handlery, a gdzie następuje dostęp do danych i sekretów. Kliencki JS się zmniejsza, a część klienckiej warstwy API i cache znika, ale pojawiają się nowe pytania — cache'owanie po stronie serwera i serializacja propsów.",
    sources: ["react-server-components", "next-server-client"],
  },
  {
    question: "Czym jest „wewnętrzna platforma” (system projektowy + wspólne pakiety) i kiedy ją wydzielać?",
    options: [
      "Wspólnymi komponentami i narzędziami, gdy używa ich kilka produktów",
      "Osobnym serwerem dla wewnętrznych pracowników i kontrahentów firmy",
      "Platformą testów A/B, której każdy startup potrzebuje od pierwszego dnia",
    ],
    answer: 0,
    explanation:
      "Gdy kilka zespołów kopiuje te same przyciski, formularze, konfiguracje builda i linterów, wydziela się platformę z wersjonowaniem i właścicielem. Platforma zbudowana zbyt wcześnie dla jednego produktu to przedwczesna abstrakcja i zbędna biurokracja.",
    sources: ["storybook", "monorepo-tools"],
  },
  {
    question: "Czym jest „efekt drugiego systemu” w decyzjach architektonicznych?",
    options: [
      "Skłonnością do przeładowania drugiej wersji systemu wszystkimi odłożonymi pomysłami",
      "Szybszym tworzeniem drugiego systemu dzięki doświadczeniu z pierwszym",
      "Zależnością systemu od drugiej, zapasowej bazy danych",
    ],
    answer: 0,
    explanation:
      "Termin Freda Brooksa: po udanym pierwszym systemie architekt projektuje drugi „porządnie”, dodając wszystko, co wcześniej odłożono, i dostaje przekomplikowany produkt. To argument za zmianami przyrostowymi, YAGNI i Strangler Fig zamiast „wielkiego przepisania”.",
    sources: ["mf-yagni", "mf-strangler"],
  },
];

export default questions;
