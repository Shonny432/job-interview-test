import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Jaki wzorzec zastosowano w tym refaktoringu?",
    code: `// before
function price(type, sum) {
  if (type === "vip") return sum * 0.8;
  if (type === "sale") return sum * 0.9;
  return sum;
}
// after
const discounts = { vip: s => s * 0.8, sale: s => s * 0.9, regular: s => s };
const price = (type, sum) => discounts[type](sum);`,
    options: [
      "Strategy: algorytmy wyniesiono do wymiennych funkcji",
      "Singleton: wszystkie rabaty są w jednym wspólnym obiekcie globalnym",
      "Template Method: bazowe obliczenie jest nadpisywane w podklasach",
    ],
    answer: 0,
    explanation:
      "Każdy rabat to osobna strategia, a nową dodaje się bez edytowania funkcji `price` (to także przykład OCP). W JS strategia to często po prostu obiekt funkcji zamiast hierarchii klas.",
    sources: ["rg-strategy", "wiki-solid-uk"],
  },
  {
    question: "Dlaczego `subscribe` w implementacji Observera zwykle zwraca funkcję wypisującą?",
    code: `function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}`,
    options: [
      "Aby subskrybent mógł łatwo się wypisać i uniknąć wycieku pamięci",
      "Aby subskrypcja zadziałała tylko raz, a potem sama się usunęła",
      "Aby podmiot mógł wywołać subskrybenta synchronicznie, bez event loop",
    ],
    answer: 0,
    explanation:
      "Zwrócona funkcja wygodnie pasuje do funkcji czyszczącej `useEffect`: `useEffect(() => store.subscribe(fn), [])`. Bez wypisania podmiot trzyma referencje do callbacków odmontowanych komponentów — wyciek i zbędne wywołania. Tak działają Redux, Zustand i `useSyncExternalStore`.",
    sources: ["rg-observer", "react-useSyncExternalStore"],
  },
  {
    question: "Czym Decorator różni się od Proxy, skoro ich struktura jest podobna?",
    options: [
      "Celem: Decorator dodaje zachowanie, Proxy kontroluje dostęp do obiektu",
      "Decorator działa tylko z funkcjami, Proxy tylko z klasami",
      "Proxy zawsze tworzy nowy obiekt, Decorator zawsze mutuje oryginał",
    ],
    answer: 0,
    explanation:
      "Oba opakowują obiekt tym samym interfejsem. Dekoratory zwykle się łączy, rozbudowując funkcjonalność (logowanie + cache + ponowienia). Proxy zarządza cyklem życia i dostępem: leniwe ładowanie, sprawdzanie uprawnień, zdalny obiekt. Wiele wzorców różni się właśnie celem.",
    sources: ["rg-decorator", "rg-proxy"],
  },
  {
    question: "Czym Adapter różni się od Fasady?",
    options: [
      "Adapter dopasowuje interfejs do oczekiwanego, Fasada upraszcza pracę z podsystemem",
      "Adapter upraszcza złożony podsystem, a Fasada zmienia format danych",
      "To ten sam wzorzec, tylko różnie nazywany w różnych książkach",
    ],
    answer: 0,
    explanation:
      "Adapter zwykle opakowuje jeden obiekt i czyni go zgodnym z istniejącym kodem. Fasada definiuje nowy, prostszy interfejs nad wieloma obiektami. W praktyce warstwa API często łączy oba: fasadę nad HTTP i adaptery danych.",
    sources: ["rg-adapter", "rg-facade"],
  },
  {
    question: "Kiedy zamiast prostej fabryki odpowiednia jest Abstract Factory?",
    options: [
      "Gdy potrzebne są rodziny powiązanych, zgodnych ze sobą obiektów",
      "Gdy trzeba tworzyć obiekty w ogóle bez wywoływania konstruktora",
      "Gdy obiekt musi istnieć w jednej instancji",
    ],
    answer: 0,
    explanation:
      "Przykład: UI kit dla dwóch platform — fabryka tworzy przycisk, pole i modal w jednym stylu i nie da się ich wymieszać. Prosta fabryka wybiera jeden produkt według parametru. Nie wprowadzaj abstrakcyjnej fabryki, jeśli rodzina jest tylko jedna.",
    sources: ["rg-abstract-factory", "rg-factory-method"],
  },
  {
    question: "Co jest niebezpiecznego w singletonie na poziomie modułu (`export const cache = new Map()`) w aplikacji SSR?",
    options: [
      "Na serwerze moduł jest wspólny dla wszystkich żądań, więc dane użytkowników się mieszają",
      "Przy SSR moduły nie są cache'owane, więc singleton tworzy się przy każdym imporcie",
      "SSR nie obsługuje modułów ES, więc taki kod się nie zbuduje",
    ],
    answer: 0,
    explanation:
      "W przeglądarce zmienna modułu żyje w obrębie jednej karty. Proces serwera obsługuje tysiące użytkowników, a wspólny cache lub store na poziomie modułu może podać dane jednego użytkownika innemu. Stan żądania tworzy się per żądanie (np. `cache()` z React, `QueryClient` na żądanie).",
    sources: ["rg-singleton", "tq-ssr", "react-cache"],
  },
  {
    question: "Jak zaimplementować undo/redo wzorcem Command?",
    options: [
      "Trzymać stosy poleceń, każde z `execute` i `undo`",
      "Zapisywać kopię całego DOM po każdej akcji użytkownika",
      "Przeładować stronę i odtworzyć wszystkie akcje oprócz ostatniej",
    ],
    answer: 0,
    explanation:
      "Wykonane polecenie trafia na stos `undo`; cofnięcie wywołuje `undo()` i przenosi polecenie na stos `redo`. Nowa akcja czyści `redo`. Alternatywa dla niemutowalnego stanu to wzorzec Memento: przechowywanie poprzednich wersji stanu.",
    sources: ["rg-command", "rg-memento"],
  },
  {
    question: "Dlaczego flagi `isLoading`, `isError`, `isSuccess` są gorsze niż jawny stan?",
    code: `type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User }
  | { status: "error"; error: string };`,
    options: [
      "Flagi dopuszczają niemożliwe kombinacje, a jawny stan tylko poprawne",
      "Flagi zajmują więcej pamięci niż jedno pole stringowe `status`",
      "TypeScript nie potrafi otypować kilku pól boolean naraz",
    ],
    answer: 0,
    explanation:
      "Trzy flagi boolean dają 8 kombinacji, w tym bezsensowne typu „ładowanie i błąd naraz”. Unia dyskryminowana to w istocie wzorzec State / automat skończony: przejścia są jawne, a `data` jest dostępne tylko w `success`.",
    sources: ["rg-state", "ts-narrowing"],
  },
  {
    question: "Jakie jest ryzyko globalnej szyny zdarzeń jako implementacji Mediatora?",
    options: [
      "Przepływy danych są niejawne: nie wiadomo, kto wysyła zdarzenie i dlaczego",
      "Szyna zdarzeń nie potrafi przekazać danych razem ze zdarzeniem",
      "Szyny nie da się używać razem z komponentami React",
    ],
    answer: 0,
    explanation:
      "Rozdzielenie przez nazwy zdarzeń jest wygodne, ale wraz ze wzrostem aplikacji powiązania chowają się w stringach, pojawiają się cykle i „widmowi” subskrybenci. Dlatego aplikacje React zwykle wolą jawne przepływy: propsy, Context, store z selektorami.",
    sources: ["rg-mediator", "pd-mediator"],
  },
  {
    question: "Jaki wzorzec realizują interceptory axios lub wrappery `fetch`?",
    options: [
      "Chain of Responsibility: żądanie przechodzi przez handlery",
      "Abstract Factory: każdy interceptor tworzy nowego klienta HTTP",
      "Singleton: interceptor gwarantuje jedno aktywne żądanie",
    ],
    answer: 0,
    explanation:
      "Interceptory dodają token, logują, odświeżają sesję przy 401, przekształcają błędy — każdy odpowiada za swój krok i przekazuje żądanie dalej. Kolejność ma znaczenie i trzeba ją jawnie ustalić.",
    sources: ["rg-chain"],
  },
  {
    question: "Jak wyrenderować drzewo komentarzy dowolnej głębokości?",
    code: `function Comment({ comment }) {
  return (
    <li>
      {comment.text}
      {comment.replies.length > 0 && (
        <ul>{comment.replies.map(r => <Comment key={r.id} comment={r} />)}</ul>
      )}
    </li>
  );
}`,
    options: [
      "Rekurencyjnym komponentem — wzorzec Composite dla UI",
      "Tylko jako płaską listę; rekurencja w React jest zabroniona",
      "Przez `useEffect`, który wstawia zagnieżdżone odpowiedzi do DOM",
    ],
    answer: 0,
    explanation:
      "Węzły i liście obsługuje się tak samo, więc komponent wywołuje sam siebie dla dzieci. Dla bardzo głębokich lub dużych drzew dodaj wirtualizację lub „Pokaż więcej”, a dane przechowuj znormalizowane.",
    sources: ["rg-composite"],
  },
  {
    question: "Jak generator pomaga zaimplementować Iterator dla paginowanego API?",
    options: [
      "Oddaje elementy po jednym i leniwie pobiera kolejną stronę",
      "Ładuje wszystkie strony równolegle w osobnych wątkach",
      "Cache'uje odpowiedzi API między przeładowaniami strony",
    ],
    answer: 0,
    explanation:
      "Generator asynchroniczny ukrywa kursory i numery stron: konsument pisze `for await (const item of allItems())` i może przerwać w dowolnym momencie, nie ładując niczego zbędnego. Logika przechodzenia jest oddzielona od logiki przetwarzania.",
    sources: ["rg-iterator", "jsinfo-generators"],
  },
  {
    question: "Czym Template Method różni się od Strategy?",
    options: [
      "Template Method zmienia kroki przez dziedziczenie, Strategy — przez kompozycję",
      "Strategy zmienia kroki przez dziedziczenie, a Template Method — przez kompozycję",
      "Template Method wybiera się w runtime, Strategy podczas kompilacji",
    ],
    answer: 0,
    explanation:
      "Template Method ustala szkielet algorytmu w klasie bazowej, a wariant ustawia podklasa (statycznie). Strategię przekazuje się obiektowi i może zmieniać się w runtime. W JS zwykle woli się kompozycję: przekazywanie funkcji-kroków.",
    sources: ["rg-template-method", "rg-strategy"],
  },
  {
    question: "Dlaczego niemutowalny stan upraszcza wzorzec Memento?",
    options: [
      "Stare wersje się nie zmieniają, więc memento to po prostu referencja do poprzedniego obiektu",
      "Niemutowalne obiekty są automatycznie zapisywane w `localStorage`",
      "Niemutowalność zabrania cofania, więc memento nie jest potrzebne",
    ],
    answer: 0,
    explanation:
      "Przy mutacjach memento wymaga głębokiej kopii. Przy niemutowalnych aktualizacjach (spread, Immer) niezmienione części są ponownie używane (structural sharing), a historia zmian prawie nic nie kosztuje. Tak działa time travel w Redux DevTools.",
    sources: ["rg-memento", "rtk-immer"],
  },
  {
    question: "Jakiego wzorca używa plugin Babel lub ESLint, gdy przechodzi AST metodami `Identifier()` i `CallExpression()`?",
    options: [
      "Visitor: operacje na węzłach drzewa są wyniesione do osobnego obiektu",
      "Builder: plugin krok po kroku tworzy nowe drzewo z wyjściowego",
      "Adapter: plugin konwertuje AST do formatu innego kompilatora",
    ],
    answer: 0,
    explanation:
      "Visitor pozwala dodawać nowe operacje nad strukturą (sprawdzenia, przekształcenia) bez zmiany klas węzłów. Mechanizm przechodzenia wywołuje metodę visitora dla każdego typu węzła.",
    sources: ["rg-visitor"],
  },
  {
    question: "Powiadomienia mają trzy typy i wysyłane są trzema kanałami (e-mail, push, SMS). Który wzorzec oszczędzi 9 klas?",
    options: [
      "Bridge: typ powiadomienia i kanał dostarczenia rozwijają się niezależnie",
      "Singleton: wszystkie powiadomienia są wysyłane przez jedną instancję",
      "Iterator: kanały są kolejno przechodzone dla każdego typu",
    ],
    answer: 0,
    explanation:
      "Bridge oddziela abstrakcję (typ powiadomienia) od implementacji (kanału) i łączy je kompozycją: 3 + 3 klasy zamiast 3 × 3. Nowy kanał dodaje się bez zmiany typów.",
    sources: ["rg-bridge"],
  },
  {
    question: "Po co na frontendzie warstwa „repozytoriów” lub serwisów API zamiast bezpośredniego `fetch` w komponentach?",
    options: [
      "Komponenty nie znają transportu ani formatu API, co łatwo wymienić i zamockować",
      "Bez osobnej warstwy przeglądarka nie pozwala cache'ować odpowiedzi serwera",
      "To wymóg React: `fetch` nie można wywoływać wewnątrz komponentów",
    ],
    answer: 0,
    explanation:
      "Repozytorium ukrywa, skąd pochodzą dane (REST, GraphQL, cache, mocki), i zwraca obiekty domenowe. Przy zmianie endpointu edytuje się jedno miejsce, a w testach podmienia całe repozytorium. Hooki TanStack Query często wywołują właśnie takie funkcje.",
    sources: ["mf-repository", "rg-facade"],
  },
  {
    question: "Jak wstrzyknąć zależność do komponentów React, by w testach podmienić klienta API?",
    options: [
      "Przekazać klienta przez provider Context i w testach opakować inną wartością",
      "Importować klienta bezpośrednio i w testach zmieniać zmienną globalną",
      "Tworzyć nowego klienta wewnątrz każdego komponentu podczas renderu",
    ],
    answer: 0,
    explanation:
      "Context to wbudowany w React mechanizm DI: `<ApiProvider client={mockClient}>` w testach i Storybook, prawdziwy klient w aplikacji. Tak samo działają `QueryClientProvider` i provider store'a Redux.",
    sources: ["mf-injection", "react-context-learn"],
  },
  {
    question: "Która z tych sytuacji łamie zasadę podstawienia Liskov?",
    options: [
      "Podklasa nadpisuje metodę i rzuca „Not implemented”",
      "Podklasa dodaje nową metodę, której nie ma rodzic",
      "Podklasa wywołuje implementację rodzica przez `super`",
    ],
    answer: 0,
    explanation:
      "Kod pracujący z typem bazowym nie spodziewa się wyjątku — podstawienie psuje program. To zwykle znak, że hierarchia jest błędna, a interfejs trzeba podzielić (ISP). LSP nie zabrania dodawania nowych metod.",
    sources: ["wiki-solid-uk", "wiki-solid"],
  },
  {
    question: "Komponent `UserCard` przyjmuje `user: User` (30 pól), ale używa tylko imienia i awatara. Która zasada jest łamana?",
    options: [
      "Interface Segregation: komponent zależy od danych, których nie potrzebuje",
      "Open/Closed: komponentu nie da się rozszerzyć bez modyfikacji",
      "Single Responsibility: komponent wyświetla dane użytkownika",
    ],
    answer: 0,
    explanation:
      "Z wąskim interfejsem `{ name, avatarUrl }` komponentu można użyć dla autora komentarza lub uczestnika czatu, a testy nie wymagają pełnego obiektu. Ponadto zmiany typu `User` nie dotkną komponentu.",
    sources: ["wiki-solid-uk"],
  },
  {
    question: "Co prawo Demeter mówi o `order.customer.address.city.name`?",
    options: [
      "Kod wie o zbyt odległych obiektach — rozmawiaj z sąsiadami",
      "Łańcuch jest w porządku, jeśli wszystkie obiekty powstały w jednym module",
      "To naruszenie tylko przy użyciu optional chaining `?.`",
    ],
    answer: 0,
    explanation:
      "„Rozmawiaj tylko z przyjaciółmi”: długie łańcuchy wiążą kod z wnętrzem wielu obiektów, a zmiana któregokolwiek z nich psuje wywołującego. Rozwiązanie to metoda lub selektor typu `getDeliveryCity(order)`.",
    sources: ["wiki-demeter"],
  },
  {
    question: "Czym jest jednokierunkowy przepływ danych w architekturze Flux?",
    options: [
      "Akcja → dispatcher → store → widok, w pętli",
      "Dane są przekazywane tylko z serwera do klienta, nigdy z powrotem",
      "Komponenty wymieniają dane bezpośrednio w obie strony przez referencje",
    ],
    answer: 0,
    explanation:
      "Flux powstał w Facebooku jako odpowiedź na splątane dwukierunkowe powiązania w MVC. Widok nie zmienia store bezpośrednio, tylko wysyła akcję. Redux uprościł tę ideę: jeden store i czyste reducery zamiast dispatchera i kilku store'ów.",
    sources: ["flux", "redux-essentials"],
  },
  {
    question: "Czym MVVM różni się od podejścia React?",
    options: [
      "MVVM używa wiązania dwukierunkowego, React — jednokierunkowego przepływu danych",
      "W MVVM nie ma modelu danych, a w React model jest obowiązkowy",
      "MVVM używa się tylko na serwerze, React tylko na kliencie",
    ],
    answer: 0,
    explanation:
      "Angular i Vue obsługują wiązanie dwukierunkowe (`v-model`, `[(ngModel)]`): zmiany pola automatycznie trafiają do modelu. W React wartość i handler łączy się jawnie (`value` + `onChange`) — więcej kodu, ale przejrzystszy przepływ danych.",
    sources: ["mf-ui-archs"],
  },
  {
    question: "Jakie wzorce można dostrzec w Redux?",
    options: [
      "Command (akcje), Observer (subscribe), redukcja (reducer)",
      "Singleton, Bridge i Visitor w każdym slice'ie",
      "Abstract Factory i Template Method dla każdego reducera",
    ],
    answer: 0,
    explanation:
      "Akcja to obiekt opisujący zamiar (jak Command), store powiadamia subskrybentów (Observer), reducer redukuje strumień akcji do stanu, a middleware tworzą łańcuch odpowiedzialności. Pomaga to wyjaśnić, skąd biorą się mocne strony i ograniczenia Redux.",
    sources: ["redux-essentials", "rg-command"],
  },
  {
    question: "Jaka jest kolejność warstw Feature-Sliced Design od góry do dołu?",
    options: [
      "app → pages → widgets → features → entities → shared",
      "shared → entities → features → widgets → pages → app",
      "pages → app → shared → features → widgets → entities",
    ],
    answer: 0,
    explanation:
      "W FSD moduł może importować tylko z niższych warstw: `features` używają `entities` i `shared`, ale nie `widgets`. Zapobiega to cyklicznym zależnościom i czyni wpływ zmian przewidywalnym.",
    sources: ["fsd"],
  },
  {
    question: "Po co każdy slice w FSD ma publiczne API (`index.ts`)?",
    options: [
      "Aby kod zewnętrzny zależał tylko od jawnych eksportów slice'a",
      "Aby bundler ładował slice jednym żądaniem zamiast kilku",
      "Aby TypeScript mógł sprawdzać typy wewnątrz slice'a",
    ],
    answer: 0,
    explanation:
      "Publiczne API to kontrakt modułu (Fasada): wewnętrzna struktura może się zmieniać, dopóki eksporty pozostają te same. Linter (Steiger, pluginy eslint) zabrania „głębokich” importów z pominięciem `index`.",
    sources: ["fsd", "rg-facade"],
  },
  {
    question: "Jak mogą zaszkodzić barrel files (`index.ts`, który reeksportuje wszystko)?",
    options: [
      "Mogą spowalniać buildy i testy oraz powodować cykliczne importy",
      "Barrel files są zabronione w modułach ES i nie działają w przeglądarce",
      "Czynią wszystkie eksportowane funkcje prywatnymi",
    ],
    answer: 0,
    explanation:
      "Import jednej funkcji z dużego barrela może zmusić bundler i test runner do parsowania całego grafu modułów, a wzajemne reeksporty łatwo tworzą cykle. Rozwiązania: wąskie publiczne API, bezpośrednie importy wewnątrz modułu, `optimizePackageImports` w Next.js.",
    sources: ["next-package-bundling", "fsd"],
  },
  {
    question: "Jaka jest główna zasada Clean Architecture?",
    options: [
      "Zależności skierowane są do środka: reguły biznesowe nie wiedzą o UI, bazie ani frameworkach",
      "Każda warstwa powinna być w osobnym repozytorium",
      "Interfejs użytkownika jest centrum systemu; wszystko od niego zależy",
    ],
    answer: 0,
    explanation:
      "W centrum są encje i przypadki użycia, a frameworki, baza i UI — w zewnętrznych kręgach i zależą od wewnętrznych. Wtedy logikę biznesową można testować bez przeglądarki, a framework zmienić bez przepisywania reguł. Dla frontendu podejście często się upraszcza.",
    sources: ["clean-architecture", "wiki-dip"],
  },
  {
    question: "Gdzie w aplikacji frontendowej powinny być reguły biznesowe (np. obliczanie rabatu)?",
    options: [
      "W czystych funkcjach warstwy domenowej, używanych przez komponenty i hooki",
      "Bezpośrednio w JSX komponentu, by logika była obok renderowania",
      "W CSS przez zmienne, by nie obciążać JavaScriptu",
    ],
    answer: 0,
    explanation:
      "Reguły rozproszone po komponentach są duplikowane i trudne do testowania. Czyste funkcje w `entities`/`domain` są ponownie używane na różnych ekranach, na serwerze i w testach bez renderowania.",
    sources: ["clean-architecture", "fsd"],
  },
  {
    question: "Co opisuje Atomic Design?",
    options: [
      "Hierarchię UI: atomy → molekuły → organizmy → szablony → strony",
      "Podział paczki na atomowe chunki do równoległego ładowania",
      "Zarządzanie stanem przez atomy, jak w Jotai i Recoil",
    ],
    answer: 0,
    explanation:
      "Metodologia Brada Frosta dla systemów projektowych: przycisk i pole to atomy, pole wyszukiwania z przyciskiem to molekuła, nagłówek to organizm. Atomy w Jotai to inne pojęcie (jednostki stanu).",
    sources: ["storybook", "fsd"],
  },
  {
    question: "Czym jest shotgun surgery?",
    options: [
      "Jedna zmiana wymaga poprawek w wielu różnych miejscach kodu",
      "Równoległe uruchamianie wielu testów dla przyspieszenia CI",
      "Jednoczesne wdrażanie kilku serwisów",
    ],
    answer: 0,
    explanation:
      "Na przykład dodanie nowego statusu zamówienia wymaga poprawek w 12 plikach. To znak, że jedna wiedza jest rozmazana po kodzie (naruszenie DRY i spójności). Lekarstwem jest zebranie powiązanej logiki w jednym module.",
    sources: ["rg-smells"],
  },
  {
    question: "Czym jest feature envy?",
    options: [
      "Funkcja pracuje więcej z danymi innego obiektu niż ze swoimi",
      "Funkcja skopiowana do różnych modułów, bo jest tak przydatna",
      "Funkcja, która zbyt często wywołuje się rekurencyjnie",
    ],
    answer: 0,
    explanation:
      "Jeśli metoda `OrderView` ciągle sięga do pól `customer` i coś z nich oblicza, logikę należy przenieść bliżej danych — do modułu klienta. Zwiększa to spójność i upraszcza zmiany.",
    sources: ["rg-smells"],
  },
  {
    question: "Czym jest primitive obsession i jak się ją leczy?",
    options: [
      "Pojęcia domenowe to gołe stringi i liczby; leczy się to typami-wartościami",
      "Używanie `number` zamiast `bigint` dla dużych liczb",
      "Rezygnacja z klas na rzecz funkcji i prymitywów",
    ],
    answer: 0,
    explanation:
      "`userId: string`, `price: number` łatwo pomylić z innymi stringami i liczbami. Value objects (`Money`), typy branded w TS (`UserId`) i unie podobne do enumów czynią takie błędy niemożliwymi i zbierają walidację w jednym miejscu.",
    sources: ["rg-smells", "ts-type-compatibility"],
  },
  {
    question: "Dlaczego mówi się, że „duplikacja jest tańsza niż zła abstrakcja”?",
    options: [
      "Przedwczesne uogólnienie obrasta flagami i wiąże niezwiązane przypadki",
      "Skopiowany kod działa szybciej, bo nie ma wywołań funkcji",
      "Silniki JavaScript źle optymalizują abstrakcje",
    ],
    answer: 0,
    explanation:
      "Wspólny komponent dla dwóch podobnych ekranów stopniowo dostaje `isAdmin`, `variant`, `hideFooter`… i staje się gorszy od kopii. Zasada AHA (Avoid Hasty Abstractions) i „reguła trzech”: uogólniaj, gdy powtórzenie stało się oczywiste.",
    sources: ["wiki-dry", "mf-yagni"],
  },
  {
    question: "Czym jest wzorzec Null Object?",
    code: `const noopLogger = { info() {}, error() {} };
function createService(logger = noopLogger) { /* ... */ }`,
    options: [
      "Zaślepką z tym samym interfejsem zamiast sprawdzeń `null`",
      "Obiektem, którego wszystkie właściwości to domyślnie `null`",
      "Sposobem usunięcia obiektu z pamięci przez przypisanie mu `null`",
    ],
    answer: 0,
    explanation:
      "Zamiast `if (logger) logger.info(...)` w całym kodzie przekazuje się bezpieczną zaślepkę. Upraszcza to kod i eliminuje błędy „cannot read property of null”.",
    sources: ["rg-smells", "mf-injection"],
  },
  {
    question: "Jak zaimplementować leniwą inicjalizację ciężkiego obiektu?",
    code: `let client;
export function getClient() {
  return (client ??= createHeavyClient());
}`,
    options: [
      "Utworzyć obiekt przy pierwszym odwołaniu i potem używać go ponownie",
      "Utworzyć obiekt w `setTimeout`, by nie blokował ładowania",
      "Tworzyć nowy obiekt przy każdym wywołaniu `getClient`",
    ],
    answer: 0,
    explanation:
      "Leniwa inicjalizacja oszczędza czas startu i zasoby, jeśli obiekt może nie być potrzebny. Często łączy się ją z dynamicznym `import()` dla ciężkich SDK. Pamiętaj o SSR: na serwerze taki cache na poziomie modułu jest wspólny dla wszystkich żądań.",
    sources: ["rg-singleton", "rg-proxy"],
  },
  {
    question: "Co jest złego w mixinach (`Object.assign(Class.prototype, mixin)`)?",
    options: [
      "Niejawne zależności, konflikty nazw, niejasne pochodzenie metod",
      "Mixiny są zabronione w trybie ścisłym i nie działają w modułach",
      "Mixiny kopiują tylko metody, a nie właściwości",
    ],
    answer: 0,
    explanation:
      "Metody „pojawiają się” w klasie nie wiadomo skąd, a mixiny mogą się nawzajem nadpisywać i polegać na swoich polach. React zrezygnował z mixinów jeszcze w erze komponentów klasowych; dziś ten sam problem rozwiązują hooki i kompozycja.",
    sources: ["pd-mixin", "wiki-composition"],
  },
  {
    question: "Czym jest wzorzec Registry na przykładzie pluginów?",
    code: `const renderers = new Map();
export const register = (type, fn) => renderers.set(type, fn);
export const render = (block) => renderers.get(block.type)?.(block);`,
    options: [
      "Handlery rejestrują się według klucza, a rdzeń nic o nich nie wie",
      "Wszystkie dane aplikacji są zapisywane w rejestrze Windows",
      "Komponenty rejestrują się w DOM jako Custom Elements",
    ],
    answer: 0,
    explanation:
      "Tak buduje się rozszerzalne systemy: bloki edytora CMS, widżety dashboardów, reguły walidacji. Nowy typ dodaje się rejestracją, bez zmiany rdzenia (OCP).",
    sources: ["rg-strategy", "wiki-solid-uk"],
  },
  {
    question: "Czym mock różni się od stuba w testach?",
    options: [
      "Stub zwraca przygotowane dane, mock dodatkowo sprawdza wywołania",
      "Mock zwraca przygotowane dane, a stub sprawdza wywołania",
      "To synonimy; różnica jest tylko w nazwach bibliotek",
    ],
    answer: 0,
    explanation:
      "Dublery testowe: dummy (zaślepka), stub (przygotowane odpowiedzi), spy (rejestruje wywołania), mock (z oczekiwaniami co do wywołań), fake (uproszczona działająca implementacja, np. repozytorium w pamięci). Dependency injection ułatwia podmianę.",
    sources: ["mf-test-pyramid", "mf-injection"],
  },
  {
    question: "Czym jest „piramida testów”?",
    options: [
      "Dużo szybkich testów jednostkowych, mniej integracyjnych i bardzo mało e2e",
      "Kolejność uruchamiania testów: najpierw e2e, potem integracyjne, potem jednostkowe",
      "Hierarchia odpowiedzialności: QA → programista → team lead",
    ],
    answer: 0,
    explanation:
      "Niższe poziomy są tanie i szybkie; wyższe bliższe rzeczywistości, ale wolne i kruche. Na frontendzie popularny jest wariant „trofeum” z naciskiem na integracyjne testy komponentów (Testing Library).",
    sources: ["mf-test-pyramid"],
  },
  {
    question: "Czym jest komponent headless w kategoriach wzorców?",
    options: [
      "Logiką oddzieloną od markupu i stylów",
      "Komponentem renderowanym na serwerze bez przeglądarki",
      "Komponentem bez `<head>` w swoim HTML",
    ],
    answer: 0,
    explanation:
      "Hook lub komponent daje stan i handlery (`useCombobox`, prymitywy Radix), a aplikacja kontroluje markup i style. To rozdzielenie odpowiedzialności i OCP: wygląd zmienia się bez zmiany logiki.",
    sources: ["pd-hooks", "wai-aria-apg"],
  },
  {
    question: "Jaki wzorzec stosuje się w „slotach” komponentu (`<Card header={...} footer={...}>`)?",
    options: [
      "Kompozycję przez propsy: szkielet plus przekazana treść",
      "Dziedziczenie: `Card` rozszerza `Header` i `Footer`",
      "Singleton: strona może mieć tylko jedną kartę",
    ],
    answer: 0,
    explanation:
      "Sloty (`children`, nazwane propsy z JSX) pozwalają rozszerzać komponent bez dodawania flagi dla każdego przypadku. To bezpośrednie zastosowanie „kompozycji zamiast dziedziczenia” i OCP.",
    sources: ["wiki-composition", "react-props"],
  },
  {
    question: "Czym jest funkcja wyższego rzędu w kategoriach wzorców?",
    options: [
      "Funkcją, która przyjmuje lub zwraca funkcję",
      "Funkcją, która wykonuje się przed wszystkimi innymi przy starcie",
      "Funkcją z największą liczbą wywołań w profilerze",
    ],
    answer: 0,
    explanation:
      "`map`, `filter`, `debounce`, `memoize` i HOC to funkcje wyższego rzędu. W JS wiele klasycznych wzorców wyraża się w ten sposób, bez klas i hierarchii.",
    sources: ["rg-decorator", "rg-strategy"],
  },
  {
    question: "Jak delegowanie zdarzeń ma się do wzorca Flyweight?",
    options: [
      "Jeden wspólny handler zamiast tysięcy identycznych",
      "Delegowanie tworzy kopię handlera na każdym elemencie",
      "Nie ma związku: delegowanie to wzorzec Singleton",
    ],
    answer: 0,
    explanation:
      "Handler na rodzicu jest wspólny dla wszystkich elementów potomnych, a unikalny stan (który element) pochodzi z `event.target` — to zewnętrzny stan Flyweighta. Oszczędza to pamięć i czas inicjalizacji dużych list.",
    sources: ["rg-flyweight", "jsinfo-event-delegation"],
  },
  {
    question: "Jak `useReducer` jest bliski wzorcowi State?",
    options: [
      "Przejścia w jednym miejscu: nowy stan = f(bieżący, akcja)",
      "`useReducer` przechowuje stan globalnie dla całej aplikacji",
      "`useReducer` automatycznie synchronizuje stan z serwerem",
    ],
    answer: 0,
    explanation:
      "Reducer to funkcja przejść automatu stanów. Można zabronić niepoprawnych przejść (ignorować `submit` w stanie `loading`). Dla złożonych scenariuszy używa się jawnych automatów stanów (XState).",
    sources: ["react-reducer", "rg-state"],
  },
  {
    question: "Jaki wzorzec realizuje `React.memo` lub funkcja `memoize(fn)`?",
    options: [
      "Cache'ujący Proxy/Decorator: opakowanie zwraca poprzedni wynik",
      "Abstract Factory: opakowanie tworzy nowy komponent przy każdym wywołaniu",
      "Visitor: opakowanie przechodzi po wszystkich propsach i je zmienia",
    ],
    answer: 0,
    explanation:
      "Opakowanie ma ten sam interfejs i przechwytuje wywołanie: jeśli dane wejściowe się nie zmieniły, zwraca zapamiętany wynik. Cache'ujące proxy to klasyczne zastosowanie wzorca Proxy.",
    sources: ["rg-proxy", "react-memo"],
  },
  {
    question: "Kiedy według „reguły trzech” należy wyodrębniać abstrakcję?",
    options: [
      "Gdy podobny kod pojawia się po raz trzeci",
      "Od razu, przy pierwszym pisaniu kodu, na przyszłość",
      "Dopiero po trzech latach istnienia projektu",
    ],
    answer: 0,
    explanation:
      "Dwa przypadki często są podobne przypadkowo, a trzeci pokazuje, co naprawdę jest wspólne. Reguła pomaga zachować równowagę między DRY a YAGNI.",
    sources: ["wiki-dry", "mf-yagni"],
  },
  {
    question: "Jaki wzorzec realizuje obiekt Proxy w Vue 3 lub MobX dla reaktywności?",
    options: [
      "Proxy + Observer: odczyt rejestruje zależność, zapis powiadamia",
      "Builder: proxy krok po kroku składa nowy stan ze zmian",
      "Abstract Factory: proxy tworzy rodziny reaktywnych komponentów",
    ],
    answer: 0,
    explanation:
      "Pułapka `get` zapamiętuje, który efekt lub komponent odczytał właściwość, a pułapka `set` powiadamia subskrybentów o zmianie. Daje to precyzyjną reaktywność bez ręcznych subskrypcji. Na tej samej zasadzie zbudowane są sygnały.",
    sources: ["rg-proxy", "rg-observer", "mdn-proxy"],
  },
  {
    question: "Czym jest „anemiczny model” i dlaczego się go krytykuje?",
    options: [
      "Obiekty to tylko dane; logika żyje osobno w serwisach",
      "Model danych bez indeksów w bazie, przez co zapytania są wolne",
      "Model z nadmierną liczbą metod i zachowań",
    ],
    answer: 0,
    explanation:
      "Fowler nazywa to antywzorcem w OOP: dane i reguły ich zmiany są rozdzielone, więc łatwo złamać niezmienniki. Na frontendzie w stylu funkcyjnym „dane + czyste funkcje obok siebie w jednym module” to rozsądny kompromis, o ile reguły są skupione w jednym miejscu.",
    sources: ["mf-anemic"],
  },
  {
    question: "Czym kontener DI (Angular, InversifyJS) różni się od ręcznego przekazywania zależności?",
    options: [
      "Kontener tworzy obiekty i rozwiązuje graf zależności według konfiguracji",
      "Kontener zabrania przekazywania zależności przez konstruktor",
      "Kontener działa tylko z singletonami i nie potrafi tworzyć nowych obiektów",
    ],
    answer: 0,
    explanation:
      "Kontener rejestruje providery i na żądanie składa obiekt ze wszystkimi zależnościami, zarządzając czasem życia (singleton, na żądanie, na komponent). Projekty React zwykle obywają się Context i fabrykami, bez kontenera.",
    sources: ["mf-injection"],
  },
];

export default questions;
