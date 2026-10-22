import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Czym jest wzorzec projektowy?",
    options: [
      "Typowym rozwiązaniem często występującego problemu projektowego",
      "Gotową biblioteką instalowaną przez npm",
      "Obowiązkowym standardem stylu kodu dla zespołu",
    ],
    answer: 0,
    explanation:
      "Wzorzec to nie kod, lecz opis idei: jaki problem rozwiązuje, z jakich części składa się rozwiązanie, jakie ma zalety i wady. Implementacja zależy od języka i kontekstu. Znajomość wzorców daje zespołowi wspólny słownik: „tu potrzebna jest strategia” jest zrozumiałe bez długich wyjaśnień.",
    sources: ["rg-what-is-pattern", "rg-patterns"],
  },
  {
    question: "Na jakie trzy grupy dzielą się klasyczne wzorce GoF?",
    options: [
      "Kreacyjne, strukturalne, behawioralne",
      "Klienckie, serwerowe, sieciowe",
      "Synchroniczne, asynchroniczne, reaktywne",
    ],
    answer: 0,
    explanation:
      "Wzorce kreacyjne dotyczą tworzenia obiektów (Factory, Builder, Singleton), strukturalne — składania obiektów (Adapter, Decorator, Facade), behawioralne — interakcji i podziału odpowiedzialności (Observer, Strategy, Command). Książka „Bandy Czworga” (1994) opisała 23 wzorce.",
    sources: ["rg-catalog"],
  },
  {
    question: "Co gwarantuje wzorzec Singleton?",
    options: [
      "Klasa ma tylko jedną instancję i globalny punkt dostępu do niej",
      "Każde wywołanie konstruktora tworzy nową niezależną instancję",
      "Obiektu nie można zmienić po utworzeniu, jak przy `Object.freeze`",
    ],
    answer: 0,
    explanation:
      "Przykłady: jeden klient API, jeden logger, jedno połączenie z bazą. W JS najprostszy singleton to moduł: `export const api = new ApiClient()` — moduł wykonuje się raz, a wszyscy importujący dostają ten sam obiekt.",
    sources: ["rg-singleton", "pd-singleton"],
  },
  {
    question: "Dlaczego Singleton często nazywa się antywzorcem?",
    options: [
      "Wprowadza ukryty stan globalny i utrudnia testowanie",
      "Wymaga zbyt dużo pamięci na przechowywanie instancji",
      "Nie da się go zaimplementować w JavaScript bez klas",
    ],
    answer: 0,
    explanation:
      "Kod, który bezpośrednio odwołuje się do singletona, niejawnie od niego zależy: testy wpływają na siebie nawzajem, a podmiana implementacji jest trudna. Kompromis: utworzyć jedną instancję, ale przekazywać ją jawnie (dependency injection), by w testach podstawić mock.",
    sources: ["rg-singleton", "pd-singleton"],
  },
  {
    question: "Jaki problem rozwiązuje wzorzec Factory?",
    options: [
      "Tworzenie obiektów bez wiązania kodu z ich konkretnymi klasami",
      "Niszczenie obiektów, które nie są już używane",
      "Kopiowanie obiektów razem ze wszystkimi zagnieżdżonymi danymi",
    ],
    answer: 0,
    explanation:
      "Funkcja `createNotification(type)` zwraca `EmailNotification` lub `PushNotification`, a kod wywołujący pracuje ze wspólnym interfejsem. Nowy typ dodaje się w jednym miejscu. W JS fabryka to często po prostu funkcja zwracająca obiekt.",
    sources: ["rg-factory-method", "pd-factory"],
  },
  {
    question: "Jak działa wzorzec Observer?",
    options: [
      "Obiekt trzyma subskrybentów i powiadamia ich o zmianie stanu",
      "Obiekt okresowo odpytuje inne obiekty o zmiany",
      "Obiekt kopiuje swój stan naraz do wszystkich powiązanych obiektów",
    ],
    answer: 0,
    explanation:
      "Podmiot udostępnia `subscribe`/`unsubscribe` i wywołuje callbacki przy zmianie. Przykłady w webie: `addEventListener`, subskrypcje store'ów w Redux i Zustand, RxJS. Najważniejsze, by nie zapominać o wypisywaniu się, inaczej będą wycieki pamięci.",
    sources: ["rg-observer", "pd-observer"],
  },
  {
    question: "Czym Pub/Sub różni się od klasycznego Observera?",
    options: [
      "Wydawcy i subskrybenci nie wiedzą o sobie — łączy ich broker zdarzeń",
      "W Pub/Sub może być tylko jeden subskrybent, w Observerze wielu",
      "Pub/Sub działa tylko synchronicznie, Observer tylko asynchronicznie",
    ],
    answer: 0,
    explanation:
      "W Observerze subskrybenci rejestrują się bezpośrednio u podmiotu. W Pub/Sub jest pośrednik (szyna zdarzeń, broker wiadomości), a uczestnicy znają tylko nazwy kanałów. Silniej rozdziela to części systemu, ale utrudnia śledzenie przepływu zdarzeń.",
    sources: ["rg-observer", "wiki-message-queue"],
  },
  {
    question: "Czym jest wzorzec Strategy?",
    options: [
      "Rodziną wymiennych algorytmów wybieranych w runtime",
      "Kwartalnym planem rozwoju projektu zatwierdzanym przez architekta",
      "Kolejnością wywołań metod zapisaną na sztywno w klasie bazowej hierarchii",
    ],
    answer: 0,
    explanation:
      "Zamiast długiego `if/else` według typu dostawy — obiekt strategii `{ courier: calcCourier, pickup: calcPickup }`, a kod wywołuje odpowiednią. Przykład w JS to funkcja porównująca w `sort(compareFn)`: algorytm sortowania jest ten sam, a strategia porównania jest podpinana.",
    sources: ["rg-strategy"],
  },
  {
    question: "Co robi wzorzec Decorator?",
    options: [
      "Dodaje zachowanie obiektowi lub funkcji, opakowując je",
      "Zmienia wygląd komponentu, podpinając do niego klasy CSS",
      "Podmienia klasę rodzica na inną klasę w runtime",
    ],
    answer: 0,
    explanation:
      "Opakowanie implementuje ten sam interfejs i dodaje logikę przed lub po wywołaniu: cache'owanie, logowanie, ponowienia. Przykłady: `debounce(fn)`, `withAuth(Component)` (HOC), dekoratory `@` w TypeScript. Opakowania można łączyć.",
    sources: ["rg-decorator"],
  },
  {
    question: "Kiedy potrzebny jest Adapter?",
    options: [
      "Gdy trzeba przekształcić cudzy interfejs w taki, jakiego oczekuje twój kod",
      "Gdy trzeba przyspieszyć wolną funkcję przez cache",
      "Gdy trzeba ukryć obiekt przed nieuprawnionymi użytkownikami",
    ],
    answer: 0,
    explanation:
      "Przykład: API zwraca `{ user_name, created_at }`, a UI oczekuje `{ name, createdAt: Date }`. Funkcja-adapter na granicy przekształca dane, a przy zmianie API edytuje się tylko ją. Tak samo dostosowuje się zewnętrzne SDK do własnego interfejsu.",
    sources: ["rg-adapter"],
  },
  {
    question: "Czym jest Fasada (Facade)?",
    options: [
      "Prostym interfejsem nad złożonym podsystemem",
      "Stroną główną witryny z główną nawigacją",
      "Kopią obiektu do bezpiecznego przekazania na zewnątrz",
    ],
    answer: 0,
    explanation:
      "Na przykład moduł `api` z `getUser()` i `updateUser()` ukrywa `fetch`, nagłówki, tokeny, obsługę błędów i przekształcanie danych. Reszta kodu nie zna szczegółów. Fasada zmniejsza powiązania, ale nie powinna rozrosnąć się w „boski obiekt”.",
    sources: ["rg-facade"],
  },
  {
    question: "Do czego służy wzorzec Proxy?",
    options: [
      "Do kontroli dostępu do obiektu: cache'owanie, sprawdzenia, leniwość",
      "Do łączenia kilku obiektów w jedno drzewo ze wspólnym korzeniem",
      "Do tworzenia złożonych obiektów krok po kroku przez łańcuch wywołań",
    ],
    answer: 0,
    explanation:
      "Proxy ma ten sam interfejs co oryginał i przechwytuje dostęp: leniwa inicjalizacja, cache'owanie, walidacja, logowanie. JS ma wbudowany `Proxy` — na nim zbudowana jest reaktywność Vue 3.",
    sources: ["rg-proxy", "pd-proxy"],
  },
  {
    question: "Jaki wzorzec realizują `for...of` i `Symbol.iterator`?",
    options: ["Iterator", "Observer", "Builder"],
    answer: 0,
    explanation:
      "Iterator daje jednolity sposób sekwencyjnego przechodzenia kolekcji bez ujawniania jej wnętrza. Tablice, `Map`, `Set`, stringi i generatory implementują protokół iteracji, więc działają tak samo w `for...of` i spreadzie.",
    sources: ["rg-iterator", "jsinfo-iterable"],
  },
  {
    question: "Czym jest wzorzec Module w JavaScript?",
    options: [
      "Hermetyzacją: prywatne szczegóły są ukryte, eksportowane jest publiczne API",
      "Podziałem aplikacji na mikroserwisy wdrożone na różnych serwerach",
      "Ładowaniem całego kodu aplikacji jednym dużym plikiem dla szybkości",
    ],
    answer: 0,
    explanation:
      "Kiedyś moduły robiło się przez IIFE i domknięcia, teraz używa się modułów ES: wszystko, co nie jest eksportowane, jest prywatne. Zmniejsza to powiązania i chroni przed konfliktami nazw w zakresie globalnym.",
    sources: ["pd-module", "jsinfo-modules"],
  },
  {
    question: "Kiedy przydaje się wzorzec Builder?",
    options: [
      "Gdy obiekt jest składany krok po kroku z wielu opcjonalnych części",
      "Gdy trzeba zagwarantować jedną instancję klasy",
      "Gdy trzeba powiadamiać subskrybentów o zmianach",
    ],
    answer: 0,
    explanation:
      "Zamiast konstruktora z dziesięcioma parametrami — łańcuch `new QueryBuilder().select('id').where(...).limit(10).build()`. Przykłady: buildery zapytań SQL (Knex), buildery URL i konfiguracji. W JS często wystarczy przekazać obiekt opcji.",
    sources: ["rg-builder"],
  },
  {
    question: "Jak wzorzec Prototype ma się do JavaScriptu?",
    options: [
      "Nowe obiekty tworzy się z istniejących — na tym zbudowany jest sam język",
      "To sposób na szybki szkic UI bez logiki do pokazania klientowi",
      "To wzorzec, którego nie da się zaimplementować w JavaScript",
    ],
    answer: 0,
    explanation:
      "Wzorzec Prototype dotyczy tworzenia obiektów przez klonowanie wzorca. W JS obiekty dziedziczą po innych obiektach przez łańcuch prototypów, a `Object.create(proto)` tworzy obiekt z podanym prototypem. Prototyp UI (makieta) to zupełnie inne pojęcie.",
    sources: ["rg-prototype", "pd-prototype"],
  },
  {
    question: "Do czego służy wzorzec Command?",
    options: [
      "Do przedstawienia akcji jako obiektu — dla kolejek, logów i cofania",
      "Do zjednoczenia programistów w wielofunkcyjny zespół produktowy",
      "Do uruchamiania kodu JavaScript z wiersza poleceń terminala",
    ],
    answer: 0,
    explanation:
      "Polecenie zawiera wszystko, co potrzebne do wykonania akcji i, w razie potrzeby, jej cofnięcia (`execute`/`undo`). Tak implementuje się undo/redo w edytorach, kolejki operacji i makra. Akcje Redux to pokrewna idea: akcję opisuje obiekt.",
    sources: ["rg-command", "pd-command"],
  },
  {
    question: "Który wzorzec pozwala jednolicie pracować z drzewem (menu z podmenu, system plików)?",
    options: ["Composite", "Singleton", "Adapter"],
    answer: 0,
    explanation:
      "Composite opisuje zarówno liście, jak i kontenery jednym interfejsem, więc klient przechodzi drzewo bez sprawdzeń „czy to folder, czy plik”. Drzewo komponentów React, DOM i zagnieżdżone menu to naturalne przykłady.",
    sources: ["rg-composite"],
  },
  {
    question: "Co opisuje wzorzec State?",
    options: [
      "Obiekt zmienia zachowanie w zależności od stanu, jak automat skończony",
      "Przechowywanie wszystkich danych aplikacji w jednym globalnym store",
      "Zapisywanie stanu komponentu w `localStorage` między sesjami",
    ],
    answer: 0,
    explanation:
      "Zamiast rozproszonych sprawdzeń `if (status === ...)` zachowanie każdego stanu opisuje się osobno, a przejścia są jawne: `idle → loading → success | error`. Na frontendzie ideę tę często realizuje się automatami stanów (XState) lub `useReducer` z unią dyskryminowaną.",
    sources: ["rg-state"],
  },
  {
    question: "Co robi Mediator?",
    options: [
      "Centralizuje interakcję obiektów, by nie odwoływały się do siebie nawzajem",
      "Przekazuje żądanie wzdłuż łańcucha handlerów, aż któryś je obsłuży",
      "Tworzy kopię obiektu do bezpiecznej modyfikacji",
    ],
    answer: 0,
    explanation:
      "Komponenty formularza nie wywołują się nawzajem bezpośrednio, tylko powiadamiają mediatora (rodzica, kontroler formularza), który decyduje, co zmienić. Zmniejsza to powiązania „każdy z każdym”. Ryzyko: mediator rozrasta się w zbyt mądry obiekt.",
    sources: ["rg-mediator", "pd-mediator"],
  },
  {
    question: "Jaki wzorzec leży u podstaw middleware w Express lub Redux?",
    options: ["Chain of Responsibility", "Builder z metodą `next()`", "Flyweight dla wspólnych handlerów"],
    answer: 0,
    explanation:
      "Żądanie przechodzi przez sekwencję handlerów: każdy może je obsłużyć, zmodyfikować lub przekazać dalej przez `next()`. Tak dodaje się logowanie, autoryzację i parsowanie ciała bez zmiany głównego handlera.",
    sources: ["rg-chain", "pd-mediator"],
  },
  {
    question: "Czym jest wzorzec Template Method?",
    options: [
      "Bazowy algorytm ustala kroki, a podklasy nadpisują poszczególne kroki",
      "Metodą generującą markup HTML z szablonu stringowego",
      "Metodą kopiowaną między projektami bez żadnych zmian",
    ],
    answer: 0,
    explanation:
      "Na przykład klasa bazowa `DataExporter` definiuje `export()`: ładowanie → przekształcenie → zapis, a podklasy implementują `transform()` dla CSV i JSON. W stylu funkcyjnym to samo robi się przez przekazywanie funkcji-kroków.",
    sources: ["rg-template-method"],
  },
  {
    question: "Po co jest Memento?",
    options: [
      "Do zapisania stanu obiektu, by później do niego wrócić (undo)",
      "Do zrobienia zrzutu ekranu strony do zgłoszenia w bug trackerze",
      "Do zapamiętania wyniku wywołania funkcji dla przyspieszenia kolejnych",
    ],
    answer: 0,
    explanation:
      "Memento przechowuje stan, nie ujawniając wnętrza obiektu. Historia zmian w edytorze czy „wehikuł czasu” Redux DevTools to przykłady. Przy niemutowalnych danych memento to po prostu referencja do poprzedniej wersji.",
    sources: ["rg-memento"],
  },
  {
    question: "Po co jest wzorzec Flyweight?",
    options: [
      "Do oszczędzania pamięci przez współdzielenie wspólnej niezmiennej części przez wiele obiektów",
      "Do zmniejszenia rozmiaru paczki JS przez minifikację i kompresję",
      "Do przyspieszenia ładowania obrazków przez kompresję do nowoczesnych formatów",
    ],
    answer: 0,
    explanation:
      "Jeśli 100 000 obiektów ma wiele identycznych danych (ikona, styl, opis typu), wspólną część przechowuje się raz, a obiekty trzymają tylko swoje unikalne pola. Stringi i prymitywy w JS częściowo używają podobnej techniki.",
    sources: ["rg-flyweight", "pd-flyweight"],
  },
  {
    question: "Co oznacza akronim SOLID?",
    options: [
      "Pięć zasad projektowania obiektowego Roberta Martina",
      "Pięć obowiązkowych wzorców GoF w każdym projekcie",
      "Zestaw wymagań niezawodności i integralności bazy danych",
    ],
    answer: 0,
    explanation:
      "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. Zasady stosuje się nie tylko do klas, ale też do funkcji, modułów i komponentów React.",
    sources: ["wiki-solid-uk", "wiki-solid"],
  },
  {
    question: "Czego wymaga zasada pojedynczej odpowiedzialności (SRP)?",
    options: [
      "Moduł powinien mieć jeden powód do zmiany",
      "Moduł powinien zawierać dokładnie jedną funkcję",
      "Każdy programista odpowiada tylko za jeden moduł",
    ],
    answer: 0,
    explanation:
      "Komponent, który ładuje dane, formatuje je i rysuje tabelę, zmienia się z różnych powodów. Podział na hook ładowania, funkcje formatujące i komponent prezentacyjny upraszcza zmiany i testy. „Jedna funkcja” to błędna interpretacja.",
    sources: ["wiki-solid-uk"],
  },
  {
    question: "Co oznacza zasada otwarte/zamknięte (OCP)?",
    options: [
      "Kod jest otwarty na rozszerzenia, ale zamknięty na modyfikacje",
      "Kod powinien być otwarty dla wszystkich, czyli open source",
      "Metody publiczne są otwarte, a prywatne zamknięte",
    ],
    answer: 0,
    explanation:
      "Nowe zachowanie dodaje się bez przepisywania sprawdzonego kodu: przez nową strategię, plugin lub komponent przez propsy/`children`. Przykład: `Button` z propem `icon` zamiast edytowania przycisku dla każdej nowej ikony.",
    sources: ["wiki-solid-uk"],
  },
  {
    question: "Czego wymaga zasada podstawienia Liskov (LSP)?",
    options: [
      "Podtyp musi dać się użyć wszędzie, gdzie oczekiwany jest typ bazowy",
      "Podklasa musi nadpisać wszystkie metody rodzica",
      "Nie można dziedziczyć głębiej niż dwa poziomy",
    ],
    answer: 0,
    explanation:
      "Klasyczne naruszenie: `Square extends Rectangle`, gdzie `setWidth` zmienia też wysokość — kod polegający na prostokącie się psuje. Na frontendzie: komponent-wrapper wokół `<input>` powinien obsługiwać oczekiwane propsy, takie jak `onChange` i `disabled`.",
    sources: ["wiki-solid-uk", "wiki-solid"],
  },
  {
    question: "O czym mówi zasada segregacji interfejsów (ISP)?",
    options: [
      "Klienci nie powinni zależeć od metod i danych, których nie potrzebują",
      "Każdy interfejs TypeScript powinien być w osobnym pliku",
      "Interfejsy UI i API powinny tworzyć różne zespoły",
    ],
    answer: 0,
    explanation:
      "Komponent `Avatar`, który przyjmuje cały obiekt `user` z dziesiątkami pól, zależy od zbyt wielu rzeczy. Lepiej przekazać `src` i `name`. Wąskie interfejsy upraszczają ponowne użycie i testy.",
    sources: ["wiki-solid-uk"],
  },
  {
    question: "Co oznacza zasada odwrócenia zależności (DIP)?",
    options: [
      "Moduły wysokiego poziomu zależą od abstrakcji, a nie od konkretnych implementacji",
      "Zależności w `package.json` trzeba sortować w odwrotnej kolejności",
      "Moduły niskiego poziomu powinny importować wysokopoziomowe, a nie odwrotnie",
    ],
    answer: 0,
    explanation:
      "Serwis zamówień zależy od interfejsu `PaymentGateway`, a nie od konkretnego SDK Stripe. Implementację przekazuje się z zewnątrz, więc łatwo ją podmienić lub zamockować w testach.",
    sources: ["wiki-dip", "mf-injection"],
  },
  {
    question: "Co oznacza zasada DRY?",
    options: [
      "Każda wiedza w systemie powinna mieć jedną reprezentację",
      "Kod powinien być „suchy”: bez komentarzy i pustych linii",
      "Nie wolno ponownie używać cudzego kodu",
    ],
    answer: 0,
    explanation:
      "Don't Repeat Yourself dotyczy duplikacji wiedzy, a nie tylko podobnych linii. Jeśli reguła walidacji e-maila jest powielona w trzech miejscach, przy zmianie łatwo jedno przeoczyć. Ale przedwczesne łączenie kodu podobnego, a jednak różnego, też szkodzi.",
    sources: ["wiki-dry"],
  },
  {
    question: "Co oznacza zasada KISS?",
    options: [
      "Upraszczaj: unikaj zbędnej złożoności",
      "Trzymaj kod w jednym pliku, żeby łatwo go znaleźć",
      "Pisz krótkie nazwy zmiennych",
    ],
    answer: 0,
    explanation:
      "Keep It Simple, Stupid: proste rozwiązanie łatwiej czytać, testować i zmieniać. Złożone abstrakcje są uzasadnione tylko wtedy, gdy rozwiązują realny problem. Krótkie nazwy i jeden plik nie mają nic wspólnego z prostotą.",
    sources: ["wiki-kiss"],
  },
  {
    question: "Co oznacza zasada YAGNI?",
    options: [
      "Nie implementuj funkcjonalności, dopóki nie jest naprawdę potrzebna",
      "Zawsze zakładaj dodatkowe możliwości pod przyszłe wymagania",
      "Nie używaj zewnętrznych bibliotek, pisz wszystko sam",
    ],
    answer: 0,
    explanation:
      "You Aren't Gonna Need It: przedwczesna ogólność („a co, jeśli będzie pięć języków”) kosztuje czas i komplikuje kod, a założenia często się nie sprawdzają. To nie zakaz przemyślanej architektury, lecz sprzeciw wobec kodu „na zapas”.",
    sources: ["mf-yagni"],
  },
  {
    question: "Co oznacza „kompozycja zamiast dziedziczenia”?",
    options: [
      "Składaj zachowanie z części zamiast głębokich hierarchii",
      "Zawsze używaj klas zamiast funkcji i obiektów",
      "Nigdy nie używaj `extends` — jest zabronione we współczesnym JS",
    ],
    answer: 0,
    explanation:
      "Głębokie dziedziczenie jest kruche: zmiana w klasie bazowej psuje podklasy, a zachowanie zostaje „zamknięte” w hierarchii. Kompozycja (funkcje, hooki, `children`, obiekty-strategie) jest elastyczniejsza. React wprost zaleca kompozycję zamiast dziedziczenia komponentów.",
    sources: ["wiki-composition", "react-thinking"],
  },
  {
    question: "Co opisuje wzorzec MVC?",
    options: [
      "Podział na model (dane), widok (UI) i kontroler (obsługa wejścia)",
      "Podział systemu na mikroserwisy, maszyny wirtualne i kontenery",
      "Schemat wersjonowania wydań: major, version, commit",
    ],
    answer: 0,
    explanation:
      "Model przechowuje dane i logikę biznesową, widok je wyświetla, a kontroler obsługuje akcje użytkownika i aktualizuje model. Warianty: MVP, MVVM. Idea rozdzielenia odpowiedzialności żyje na frontendzie dalej: dane osobno od UI.",
    sources: ["mf-ui-archs"],
  },
  {
    question: "Na czym polega wzorzec Container/Presentational w React?",
    options: [
      "Kontener zajmuje się danymi i logiką, prezentacyjny — tylko renderowaniem",
      "Kontener renderuje obraz Docker, prezentacyjny — slajdy",
      "Kontener to zawsze klasa, prezentacyjny to zawsze funkcja",
    ],
    answer: 0,
    explanation:
      "Komponenty prezentacyjne dostają wszystko przez propsy i łatwo je ponownie używać i testować (np. w Storybook). Dziś rolę kontenera często pełnią hooki, a w Next.js komponenty serwerowe ładujące dane.",
    sources: ["pd-container"],
  },
  {
    question: "Jaki wzorzec realizuje własny hook `useWindowSize()`?",
    options: [
      "Ponowne użycie logiki ze stanem bez zmiany drzewa komponentów",
      "Tworzenie jednej instancji okna przeglądarki (Singleton)",
      "Dziedziczenie komponentu po bazowej klasie `Window` przez `extends`",
    ],
    answer: 0,
    explanation:
      "Hooki zastąpiły HOC i render props do ponownego użycia logiki: komponent wywołuje funkcję i dostaje dane bez nawarstwiania wrapperów. Wewnątrz hook subskrybuje `resize` i sam się wypisuje (wzorzec Observer).",
    sources: ["pd-hooks", "react-custom-hooks"],
  },
  {
    question: "Jaki wzorzec realizują React Context i `<Provider>`?",
    options: [
      "Provider: wartość staje się dostępna całemu poddrzewu bez przekazywania propsów",
      "Singleton: kontekst można utworzyć tylko raz w aplikacji",
      "Builder: kontekst jest składany krok po kroku z kilku providerów",
    ],
    answer: 0,
    explanation:
      "Provider rozwiązuje prop drilling: motyw, bieżący użytkownik i i18n są dostępne każdemu potomkowi. Kontekstów może być dowolnie wiele, a ten sam kontekst można w różnych częściach drzewa udostępniać z różnymi wartościami.",
    sources: ["pd-provider", "react-context-learn"],
  },
  {
    question: "Czym jest antywzorzec?",
    options: [
      "Popularnym rozwiązaniem, które wydaje się dobre, ale szkodzi",
      "Wzorcem, którego użycie zabrania standard języka",
      "Dowolnym kodem napisanym w pośpiechu bez komentarzy i dokumentacji",
    ],
    answer: 0,
    explanation:
      "Przykłady: „boski obiekt”, kod spaghetti, magiczne liczby, kopiuj-wklej, przedwczesna optymalizacja. Znajomość antywzorców pomaga dostrzegać je w code review i wyjaśniać, dlaczego rozwiązanie jest złe.",
    sources: ["rg-smells"],
  },
  {
    question: "Czym jest God Object?",
    options: [
      "Obiektem lub komponentem, który wie i robi zbyt wiele",
      "Głównym obiektem `window`, od którego zależy wszystko inne",
      "Obiektem użytkownika z uprawnieniami administratora w systemie",
    ],
    answer: 0,
    explanation:
      "Komponent na 2000 linii, serwis `utils` ze wszystkim naraz — trudno je zrozumieć, testować i zmieniać, a każda zmiana jest ryzykowna. Lekarstwem jest podział według odpowiedzialności (SRP).",
    sources: ["rg-smells", "wiki-solid-uk"],
  },
  {
    question: "Co jest złego w „magicznych liczbach” typu `if (status === 3)`?",
    options: [
      "Sens wartości jest niejasny i łatwo ją błędnie zmienić w jednym z wielu miejsc",
      "Silnik porównuje liczby w warunkach wolniej niż stringi",
      "Liczb nie można używać w `switch` — tylko stringów i enumów",
    ],
    answer: 0,
    explanation:
      "Nazwana stała `ORDER_STATUS.SHIPPED` wyjaśnia sens i zmienia się w jednym miejscu. W TypeScript jeszcze lepsza jest unia literałów lub obiekt `as const`.",
    sources: ["rg-smells"],
  },
  {
    question: "Czym jest callback hell i jak go uniknąć?",
    options: [
      "Głęboko zagnieżdżone asynchroniczne callbacki; rozwiązują to promise'y i `async/await`",
      "Zbyt wiele handlerów zdarzeń na stronie; rozwiązuje to `React.memo`",
      "Błędy wewnątrz callbacków; rozwiązuje to opakowanie wywołania w `try/catch`",
    ],
    answer: 0,
    explanation:
      "„Piramidę” zagnieżdżonych callbacków trudno czytać i trudno w niej obsługiwać błędy. Promise'y spłaszczają łańcuch, a `async/await` sprawia, że kod asynchroniczny wygląda jak synchroniczny.",
    sources: ["jsinfo-promise", "jsinfo-async-await"],
  },
  {
    question: "Funkcja przyjmuje 7 argumentów. Jaki refaktoring jest zwykle odpowiedni?",
    options: [
      "Przekazać obiekt opcji z nazwanymi polami",
      "Rozbić wywołanie na 7 wywołań z jednym argumentem każde",
      "Przenieść argumenty do zmiennych globalnych",
    ],
    answer: 0,
    explanation:
      "Długa lista parametrów to „zapach kodu”: łatwo pomylić kolejność. Obiekt z destrukturyzacją `({ id, title, onSave })` dokumentuje się sam i pozwala na wartości domyślne. Czasem to znak, że funkcja robi zbyt wiele.",
    sources: ["rg-smells", "rg-refactoring"],
  },
  {
    question: "Czym jest refaktoring?",
    options: [
      "Zmianą struktury kodu bez zmiany jego zachowania",
      "Dodawaniem nowej funkcjonalności do produktu na potrzeby biznesu",
      "Przepisaniem projektu od zera na inny język lub framework",
    ],
    answer: 0,
    explanation:
      "Celem jest uczynienie kodu czytelniejszym i łatwiejszym do zmiany. Robi się go małymi krokami pod ochroną testów. Jeśli zmienia się zachowanie, to już nie refaktoring, lecz zmiana funkcjonalna.",
    sources: ["rg-refactoring"],
  },
  {
    question: "Czym jest Separation of Concerns?",
    options: [
      "Różne aspekty (dane, logika, UI) są w różnych częściach kodu",
      "Każdy członek zespołu pracuje tylko nad własnym zadaniem",
      "Frontend i backend są przechowywane w różnych repozytoriach",
    ],
    answer: 0,
    explanation:
      "Na przykład ładowanie danych jest w hooku lub komponencie serwerowym, reguły biznesowe w czystych funkcjach, renderowanie w komponentach. Zmiana w jednym aspekcie nie wpływa na pozostałe.",
    sources: ["mf-ui-archs", "wiki-solid-uk"],
  },
  {
    question: "Co oznacza „wysoka spójność i niskie powiązanie”?",
    options: [
      "Jedno zadanie wewnątrz modułu, a moduły luźno od siebie zależą",
      "Moduły powinny wywoływać się nawzajem jak najczęściej i bezpośrednio",
      "Cały powiązany kod należy trzymać w jednym dużym module",
    ],
    answer: 0,
    explanation:
      "Wysoka spójność oznacza, że części modułu działają na rzecz wspólnego celu. Niskie powiązanie oznacza, że moduły komunikują się przez wąskie interfejsy i nie znają nawzajem swoich szczegółów. Wtedy zmiany pozostają lokalne i nie rozchodzą się po projekcie.",
    sources: ["wiki-demeter", "fsd"],
  },
  {
    question: "Czym jest Dependency Injection w najprostszej formie?",
    options: [
      "Przekazywaniem zależności do funkcji lub klasy z zewnątrz zamiast tworzenia ich wewnątrz",
      "Automatyczną instalacją brakujących pakietów npm przy starcie",
      "Importowaniem wszystkich modułów projektu w jednym pliku `index.js`",
    ],
    answer: 0,
    explanation:
      "`createOrderService({ api, logger })` zamiast `import api` wewnątrz: w testach łatwo podstawić mocki, a implementację można wymienić. W React DI często robi się przez Context lub propsy.",
    sources: ["mf-injection", "wiki-dip"],
  },
  {
    question: "Jaki wzorzec realizuje `EventEmitter` w Node.js lub `EventTarget` w przeglądarce?",
    options: ["Observer", "Facade", "Builder"],
    answer: 0,
    explanation:
      "Obiekt trzyma listy handlerów według nazwy zdarzenia i wywołuje je przy `emit`/`dispatchEvent`. Subskrypcja to `on`/`addEventListener`, wypisanie — `off`/`removeEventListener`.",
    sources: ["rg-observer", "mdn-custom-events"],
  },
  {
    question: "Dlaczego czyste funkcje są przydatne w projektowaniu?",
    options: [
      "Wynik zależy tylko od argumentów — łatwo je testować",
      "Działają szybciej, bo silnik cache'uje ich wyniki",
      "Nie mogą zawierać warunków ani pętli",
    ],
    answer: 0,
    explanation:
      "Czysta funkcja bez efektów ubocznych jest przewidywalna: te same dane wejściowe dają ten sam wynik. Logikę biznesową (obliczanie ceny, walidację) opłaca się wynosić do czystych funkcji, a efekty uboczne trzymać na krawędziach systemu.",
    sources: ["react-pure", "wiki-kiss"],
  },
  {
    question: "Jaki wzorzec wykorzystuje HOC w stylu `withLogger(Component)`?",
    options: ["Decorator", "Factory", "Iterator"],
    answer: 0,
    explanation:
      "HOC opakowuje komponent i dodaje zachowanie, zachowując jego interfejs — klasyczny dekorator. Wady HOC (zagnieżdżenie, konflikty propsów) sprawiły, że popularne stały się hooki.",
    sources: ["rg-decorator", "patterns-dev-hoc"],
  },
];

export default questions;
