import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Co wypisze ten kod?",
    code: `const user = {
  name: "Ann",
  greet() { return this.name; },
};
const greet = user.greet;
console.log(greet());`,
    options: [
      "`undefined` (lub błąd w trybie ścisłym): kontekst zostaje utracony",
      "`\"Ann\"`: metoda pamięta obiekt, w którym została zadeklarowana",
      "`\"greet\"`: `this` wskazuje na samą funkcję",
    ],
    answer: 0,
    explanation:
      "`this` zależy od sposobu wywołania funkcji, a nie od miejsca deklaracji. `greet()` jest wywoływana bez obiektu przed kropką, więc `this` to `undefined` w trybie ścisłym (obiekt globalny w trybie nieścisłym). Naprawia to `user.greet.bind(user)` lub wywołanie `user.greet()`.",
    sources: ["jsinfo-object-methods", "mdn-this"],
  },
  {
    question: "Czym różnią się od siebie `call`, `apply` i `bind`?",
    options: [
      "`call`/`apply` wywołują od razu, `bind` zwraca nową funkcję",
      "`bind` wywołuje funkcję od razu, a `call` i `apply` zwracają nowe funkcje",
      "`apply` działa tylko z funkcjami strzałkowymi, pozostałe ze zwykłymi",
    ],
    answer: 0,
    explanation:
      "`fn.call(ctx, a, b)` i `fn.apply(ctx, [a, b])` wywołują od razu z podanym `this`. `fn.bind(ctx, a)` zwraca funkcję z na stałe przypiętym kontekstem i częściowo zastosowanymi argumentami. Żadna z nich nie wpływa na funkcje strzałkowe: nie mają one własnego `this`.",
    sources: ["jsinfo-bind", "jsinfo-call-apply"],
  },
  {
    question: "Co wypisze ten kod?",
    code: `function f() { return this.x; }
const g = f.bind({ x: 1 }).bind({ x: 2 });
console.log(g());`,
    options: ["`1`", "`2`", "`undefined`"],
    answer: 0,
    explanation:
      "Funkcja związana „pamięta” swój kontekst na zawsze; drugi `bind` nie może go zmienić (choć może dodać argumenty). Tylko `new` może nadpisać `this` funkcji związanej.",
    sources: ["jsinfo-bind"],
  },
  {
    question: "Co wypisze ten kod po sekundzie?",
    code: `const timer = {
  seconds: 10,
  start() {
    setTimeout(function () { console.log(this.seconds); }, 1000);
  },
};
timer.start();`,
    options: [
      "`undefined`: zwykła funkcja callbacku ma własne `this`",
      "`10`: callback dostaje `this` z metody `start`",
      "`ReferenceError`: `this` jest niedostępne wewnątrz timera",
    ],
    answer: 0,
    explanation:
      "Timer wywołuje callback bez kontekstu, więc `this` to nie `timer`. Funkcja strzałkowa `() => console.log(this.seconds)` wzięłaby `this` ze `start` i wypisała 10. To klasyczny przypadek, w którym strzałki się przydają.",
    sources: ["jsinfo-arrow-functions", "mdn-this"],
  },
  {
    question: "Co wypisze ten kod?",
    code: `const obj = {
  name: "Ann",
  hi: () => this.name,
};
console.log(obj.hi());`,
    options: [
      "`undefined`: strzałka bierze `this` z zewnętrznego zakresu, a nie z obiektu",
      "`\"Ann\"`: metoda-strzałka jest zawsze związana ze swoim obiektem",
      "`SyntaxError`: strzałek nie można deklarować w literałach obiektów",
    ],
    answer: 0,
    explanation:
      "Literał obiektu nie tworzy własnego zakresu dla `this`. Strzałka bierze `this` z zakresu modułu lub globalnego. Dlatego metody obiektów deklaruje się zwykłą składnią `hi() {}`.",
    sources: ["jsinfo-arrow-functions", "mdn-this"],
  },
  {
    question: "Jak silnik szuka właściwości, której sam obiekt nie ma?",
    options: [
      "Idzie w górę łańcucha prototypów, aż znajdzie właściwość lub dojdzie do `null`",
      "Od razu zwraca `undefined`, nie zaglądając do innych obiektów",
      "Szuka zmiennej o tej nazwie w zewnętrznych zakresach",
    ],
    answer: 0,
    explanation:
      "Każdy obiekt ma ukryty link `[[Prototype]]` (`Object.getPrototypeOf`). Tak tablice dostają `map` z `Array.prototype`, a wszystkie obiekty `toString` z `Object.prototype`. Przeszukiwanie zakresów dotyczy zmiennych, a nie właściwości.",
    sources: ["jsinfo-prototype", "mdn-prototype-chain"],
  },
  {
    question: "Co robi `Object.create(proto)`?",
    options: [
      "Tworzy nowy pusty obiekt, którego prototypem jest `proto`",
      "Tworzy głęboką kopię obiektu `proto` ze wszystkimi właściwościami",
      "Tworzy instancję klasy `proto`, wywołując jej konstruktor",
    ],
    answer: 0,
    explanation:
      "Właściwości `proto` nie są kopiowane — są dostępne przez łańcuch prototypów. `Object.create(null)` tworzy obiekt w ogóle bez prototypu: wygodny „czysty” słownik bez dziedziczonych kluczy typu `toString`.",
    sources: ["jsinfo-prototype", "mdn-prototype-chain"],
  },
  {
    question: "Czym naprawdę są klasy w JavaScript?",
    options: [
      "Składnią na dziedziczeniu prototypowym z kilkoma dodatkowymi sprawdzeniami",
      "Osobnym modelem dziedziczenia, który całkowicie zastąpił prototypy",
      "Strukturami istniejącymi tylko w czasie kompilacji, jak interfejsy TS",
    ],
    answer: 0,
    explanation:
      "Metody klasy trafiają do `Class.prototype`, a `extends` buduje łańcuch prototypów. Są jednak różnice wobec funkcji-konstruktorów: klasy nie można wywołać bez `new`, jej ciało działa w trybie ścisłym, metody są niewyliczalne, są prywatne pola `#x` i `static`.",
    sources: ["jsinfo-class", "mdn-classes"],
  },
  {
    question: "Dlaczego konstruktor podklasy musi wywołać `super()` przed dostępem do `this`?",
    options: [
      "Konstruktor rodzica tworzy obiekt; przed `super()` `this` jeszcze nie istnieje",
      "Bez `super()` metody rodzica nie zostaną skopiowane do klasy potomnej",
      "To konwencja lintera; sam język nie wymaga tej kolejności",
    ],
    answer: 0,
    explanation:
      "W klasie pochodnej instancję tworzy konstruktor rodzica, więc dostęp do `this` przed `super()` rzuca `ReferenceError`. Metody rodzica nie są kopiowane — są dostępne przez prototyp.",
    sources: ["jsinfo-class", "mdn-classes"],
  },
  {
    question: "Czym `#count` różni się od `_count` w klasie?",
    options: [
      "`#count` to naprawdę prywatne pole: nie ma do niego dostępu z zewnątrz",
      "`_count` jest prywatne według standardu, a `#count` to tylko konwencja",
      "Niczym: oba są tak samo dostępne spoza klasy",
    ],
    answer: 0,
    explanation:
      "Podkreślnik to konwencja; właściwość nadal jest dostępna. Prywatne pola `#` są egzekwowane przez silnik: odwołanie `obj.#count` z zewnątrz to błąd składni. Obecność można sprawdzić przez `#count in obj`.",
    sources: ["mdn-private-fields", "jsinfo-private"],
  },
  {
    question: "Jak działa `obj instanceof Class`?",
    options: [
      "Sprawdza, czy `Class.prototype` jest w łańcuchu prototypów `obj`",
      "Porównuje nazwę konstruktora obiektu ze stringiem `Class`",
      "Sprawdza, czy obiekt ma wszystkie metody klasy",
    ],
    answer: 0,
    explanation:
      "Dlatego `instanceof` może dawać zaskakujące wyniki przy podmianie prototypów lub dla obiektów z innego iframe'a (mają inny `Array.prototype`). Dla tablic pewniejsze jest `Array.isArray`.",
    sources: ["jsinfo-prototype", "mdn-prototype-chain"],
  },
  {
    question: "Co wypisze ten kod?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ["`3 3 3`", "`0 1 2`", "`undefined` trzy razy"],
    answer: 0,
    explanation:
      "`var` tworzy jedną zmienną dla całej funkcji, a gdy timery się uruchomią, pętla jest już zakończona z `i = 3`. Z `let` każda iteracja dostaje nowe wiązanie i wynik to `0 1 2`.",
    sources: ["jsinfo-closure", "jsinfo-var"],
  },
  {
    question: "Do czego dawniej służyło IIFE `(function () { ... })()`?",
    options: [
      "Do utworzenia izolowanego zakresu i niezaśmiecania globalnego",
      "Do przyspieszenia funkcji przez wczesną kompilację",
      "Do asynchronicznego uruchomienia funkcji po załadowaniu strony",
    ],
    answer: 0,
    explanation:
      "Przed `let`/`const` i modułami funkcja była jedynym sposobem ukrycia zmiennych. IIFE tworzyło prywatny zakres (wzorzec „moduł”). Dziś rozwiązują to moduły ES i bloki, a IIFE bywa używane do asynchronicznego kodu najwyższego poziomu.",
    sources: ["jsinfo-closure", "mdn-modules"],
  },
  {
    question: "Czym jest currying?",
    code: `const add = a => b => a + b;
add(2)(3); // 5`,
    options: [
      "Zamianą funkcji wielu argumentów w łańcuch funkcji jednoargumentowych",
      "Wywołaniem funkcji z opóźnieniem do następnego cyklu event loop",
      "Połączeniem kilku funkcji w jedną, która uruchamia je równolegle",
    ],
    answer: 0,
    explanation:
      "Currying opiera się na domknięciach: każda funkcja pamięta przekazany jej argument. Pozwala tworzyć wyspecjalizowane funkcje (`const add10 = add(10)`). Częściowe zastosowanie (`bind` z argumentami) to bliska, ale nie identyczna idea.",
    sources: ["jsinfo-currying", "jsinfo-closure"],
  },
  {
    question: "Czym debounce różni się od throttle?",
    options: [
      "Debounce czeka na przerwę w zdarzeniach, throttle wywołuje najwyżej raz na okres",
      "Throttle czeka na przerwę w zdarzeniach, a debounce wywołuje najwyżej raz na okres",
      "To synonimy różniące się tylko nazwą w różnych bibliotekach",
    ],
    answer: 0,
    explanation:
      "Debounce pasuje do wyszukiwania podczas pisania: żądanie idzie, gdy użytkownik przestanie pisać. Throttle pasuje do `scroll` i `resize`: handler działa regularnie, ale z ograniczoną częstotliwością. Oba implementuje się przez domknięcie z timerem.",
    sources: ["jsinfo-call-apply", "jsinfo-settimeout"],
  },
  {
    question: "Czym jest memoizacja?",
    options: [
      "Cache'owaniem wyników funkcji według argumentów, by ich nie przeliczać",
      "Zwalnianiem pamięci z nieużywanych obiektów przez garbage collector",
      "Zapisem stanu aplikacji w `localStorage` między sesjami",
    ],
    answer: 0,
    explanation:
      "Memoizowana funkcja trzyma w domknięciu `Map` „argumenty → wynik”. Działa dla funkcji czystych. Minusy to wzrost zużycia pamięci i trudność z kluczami dla obiektów (często używa się `WeakMap`).",
    sources: ["jsinfo-call-apply", "jsinfo-map-set"],
  },
  {
    question: "Jak zachowuje się `Promise.all`, jeśli jeden z promise'ów zostanie odrzucony?",
    options: [
      "Od razu odrzuca się z tym błędem; pozostałe wyniki przepadają",
      "Czeka na wszystkie promise'y i zwraca tablicę wyników i błędów",
      "Ignoruje błąd i zwraca tylko udane wyniki",
    ],
    answer: 0,
    explanation:
      "`Promise.all` to „wszystko albo nic”. Pozostałe operacje nie są anulowane; ich wyniki po prostu nie są już potrzebne. Jeśli ważne są wszystkie wyniki, użyj `Promise.allSettled`; dla pierwszego sukcesu — `Promise.any`; dla pierwszego rozstrzygniętego — `Promise.race`.",
    sources: ["jsinfo-promise-api", "mdn-promise-all"],
  },
  {
    question: "Co zwraca `Promise.allSettled`?",
    options: [
      "Tablicę obiektów `{ status, value | reason }`, po jednym na promise",
      "Tylko wartości udanych promise'ów; błędy są odrzucane",
      "Wynik pierwszego rozstrzygniętego promise'a, udanego lub nie",
    ],
    answer: 0,
    explanation:
      "`allSettled` nigdy się nie odrzuca: czeka na wszystkie promise'y i opisuje każdy wynik (`'fulfilled'` lub `'rejected'`). Przydatne, gdy trzeba wykonać niezależne żądania i pokazać częściowy wynik.",
    sources: ["mdn-promise-allsettled", "jsinfo-promise-api"],
  },
  {
    question: "Czym `Promise.any` różni się od `Promise.race`?",
    options: [
      "`any` czeka na pierwszy sukces, `race` — na pierwsze rozstrzygnięcie z dowolnym wynikiem",
      "`race` czeka na pierwszy sukces, a `any` — na pierwsze rozstrzygnięcie z dowolnym wynikiem",
      "To synonimy; `any` to nowsza nazwa `race`",
    ],
    answer: 0,
    explanation:
      "`Promise.any` odrzuca się tylko wtedy, gdy odrzucone zostaną wszystkie, z `AggregateError`. `Promise.race` przyjmuje wynik najszybszego — tak robi się timeouty: `Promise.race([fetch(url), timeout(5000)])`.",
    sources: ["mdn-promise-any", "mdn-promise-race"],
  },
  {
    question: "Ile potrwa ten kod, jeśli każde żądanie trwa 1 sekundę?",
    code: `for (const id of [1, 2, 3]) {
  await fetchUser(id);
}`,
    options: [
      "~3 sekundy: żądania wykonują się sekwencyjnie",
      "~1 sekundę: `for...of` uruchamia je równolegle",
      "Natychmiast: `await` wewnątrz pętli jest ignorowany",
    ],
    answer: 0,
    explanation:
      "Każdy `await` czeka na zakończenie przed kolejną iteracją. Jeśli żądania są niezależne, uruchom je równolegle: `await Promise.all(ids.map(fetchUser))` — około 1 sekundy. Kolejność sekwencyjna jest potrzebna, gdy następny krok zależy od poprzedniego.",
    sources: ["jsinfo-async-await", "mdn-promise-all"],
  },
  {
    question: "Dlaczego `forEach` nie czeka na asynchroniczne callbacki?",
    code: `items.forEach(async (item) => { await save(item); });
console.log("done");`,
    options: [
      "`forEach` ignoruje zwracane promise'y — „done” wypisze się od razu",
      "`forEach` czeka na wszystkie promise'y, a potem wypisuje „done”",
      "Kod się wysypie: `forEach` nie przyjmuje funkcji async",
    ],
    answer: 0,
    explanation:
      "Callback zwraca promise, ale `forEach` go nie wykorzystuje. Potrzebny jest `for...of` z `await` (sekwencyjnie) lub `await Promise.all(items.map(save))` (równolegle).",
    sources: ["jsinfo-async-await", "jsinfo-array-methods"],
  },
  {
    question: "Co wypisze łańcuch?",
    code: `Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { throw new Error(String(x)); })
  .catch(e => e.message)
  .then(x => console.log(x));`,
    options: ["`2`", "`1`", "Nic: łańcuch zatrzymuje się na `catch`"],
    answer: 0,
    explanation:
      "Wartość zwrócona z `then` jest przekazywana dalej. Błąd pomija handlery `then` aż do najbliższego `catch`, a `catch` zwraca zwykłą wartość (`'2'`), po czym łańcuch kontynuuje jako spełniony.",
    sources: ["jsinfo-promise-chaining"],
  },
  {
    question: "Co robi `.finally()` promise'a?",
    options: [
      "Wykonuje się przy każdym wyniku i nie zmienia rezultatu łańcucha",
      "Wykonuje się tylko przy sukcesie i podmienia wartość promise'a",
      "Anuluje promise, jeśli jest jeszcze w stanie `pending`",
    ],
    answer: 0,
    explanation:
      "`finally` nie dostaje argumentów i przepuszcza wartość lub błąd bez zmian — wygodne do ukrycia wskaźnika ładowania. Wyjątek: jeśli sam callback rzuci błąd lub zwróci odrzucony promise, łańcuch zostanie odrzucony.",
    sources: ["jsinfo-promise-chaining", "mdn-promise"],
  },
  {
    question: "W jakiej kolejności zostaną wypisane linie?",
    code: `async function f() {
  console.log("A");
  await null;
  console.log("B");
}
f();
console.log("C");`,
    options: ["`A C B`", "`A B C`", "`C A B`"],
    answer: 0,
    explanation:
      "Ciało funkcji async wykonuje się synchronicznie do pierwszego `await`. Reszta jest kontynuowana jako mikrozadanie po zakończeniu bieżącego kodu synchronicznego. Dlatego najpierw `A`, potem `C`, potem `B`.",
    sources: ["jsinfo-async-await", "jsinfo-microtask"],
  },
  {
    question: "Dlaczego rekurencyjny `setTimeout` bywa lepszy niż `setInterval`?",
    options: [
      "Gwarantuje przerwę między końcem jednego uruchomienia a początkiem następnego",
      "Działa w osobnym wątku i nie blokuje UI",
      "Nie zależy od event loop i zawsze uruchamia się dokładnie na czas",
    ],
    answer: 0,
    explanation:
      "`setInterval` planuje uruchomienia według stałego harmonogramu: jeśli zadanie (np. żądanie) trwa dłużej niż interwał, wywołania się nakładają. Rekurencyjny `setTimeout` planuje kolejne uruchomienie po zakończeniu bieżącego i pozwala zmieniać opóźnienie. Oba timery są niedokładne i zależą od obciążenia wątku.",
    sources: ["jsinfo-settimeout"],
  },
  {
    question: "Do czego służy `requestAnimationFrame`?",
    options: [
      "Do uruchomienia kodu przed następnym odświeżeniem ekranu — dla płynnych animacji",
      "Do pobrania z serwera następnej klatki wideo dla odtwarzacza",
      "Do uruchomienia kodu w Web Workerze bez blokowania strony",
    ],
    answer: 0,
    explanation:
      "Callback jest zsynchronizowany z częstotliwością odświeżania ekranu i nie jest wywoływany w kartach w tle, co oszczędza zasoby. Animacja przez `setTimeout(fn, 16)` może rozjeżdżać się z klatkami i przycinać.",
    sources: ["mdn-raf"],
  },
  {
    question: "Co robi funkcja generatora?",
    code: `function* ids() {
  let id = 1;
  while (true) yield id++;
}
const gen = ids();
gen.next().value; // 1`,
    options: [
      "Zwraca iterator i wykonuje się krokami, zatrzymując się na `yield`",
      "Wykonuje się asynchronicznie w osobnym wątku i zwraca promise",
      "Generuje nowy kod funkcji w trakcie działania programu",
    ],
    answer: 0,
    explanation:
      "Wywołanie generatora nie uruchamia jego ciała; zwraca obiekt z metodą `next()`. Każde `next()` kontynuuje do następnego `yield`. Generatory są wygodne dla leniwych i nieskończonych sekwencji oraz do implementacji iteratorów.",
    sources: ["jsinfo-generators", "mdn-generator"],
  },
  {
    question: "Czego potrzebuje własny obiekt, by działać z `for...of` i spreadem?",
    options: [
      "Zaimplementować metodę `[Symbol.iterator]()`, która zwraca iterator",
      "Dodać właściwość `length` i klucze liczbowe, jak w tablicy",
      "Dziedziczyć obiekt po `Array.prototype` przez `Object.create`",
    ],
    answer: 0,
    explanation:
      "Protokół iteracji: `[Symbol.iterator]` zwraca obiekt z `next()`, który daje `{ value, done }`. Najprościej zaimplementować go generatorem. Obiekty z `length` są tablicopodobne: nie działają z `for...of` i konwertuje się je przez `Array.from`.",
    sources: ["jsinfo-iterable", "mdn-iteration-protocols"],
  },
  {
    question: "Do czego służy `Symbol`?",
    options: [
      "Do unikalnych kluczy właściwości, które nie kolidują z innymi",
      "Do przechowywania krótkich stringów z oszczędnością pamięci silnika",
      "Do deklarowania stałych, których nie można ponownie przypisać",
    ],
    answer: 0,
    explanation:
      "`Symbol('id')` jest zawsze unikalny, a klucze-symbole nie pojawiają się w `for...in` ani `Object.keys`. Wbudowane „dobrze znane” symbole dostosowują zachowanie obiektów: `Symbol.iterator`, `Symbol.toPrimitive`, `Symbol.asyncIterator`.",
    sources: ["jsinfo-symbol", "mdn-symbol"],
  },
  {
    question: "Czym `WeakMap` różni się od `Map`?",
    options: [
      "Kluczami są tylko obiekty i nie blokują garbage collection; nie da się jej iterować",
      "`WeakMap` jest szybsza, ale mieści naraz najwyżej 1000 wpisów",
      "`WeakMap` automatycznie usuwa wpisy po ustalonym czasie",
    ],
    answer: 0,
    explanation:
      "Jeśli nie ma innych referencji do obiektu-klucza, wpis znika razem z nim. Dlatego `WeakMap` nie ma `size` ani iteracji. Zastosowania: prywatne dane obiektów, cache metadanych dla węzłów DOM bez wycieków pamięci.",
    sources: ["jsinfo-weakmap", "mdn-weakmap"],
  },
  {
    question: "Dlaczego `structuredClone(obj)` jest lepszy niż `JSON.parse(JSON.stringify(obj))`?",
    options: [
      "Zachowuje `Date`, `Map`, `Set`, cykliczne referencje i nie gubi `undefined`",
      "Kopiuje też funkcje i metody klas razem z prototypem",
      "Działa tylko z prymitywami, ale jest dziesiątki razy szybszy",
    ],
    answer: 0,
    explanation:
      "Trik z JSON zamienia `Date` w string, gubi `undefined`, `Map`, `Set`, `Infinity` i wysypuje się na cyklach. `structuredClone` obsługuje więcej typów, ale nie kopiuje funkcji, węzłów DOM ani prototypów klas — takie obiekty rzucają błąd lub tracą metody.",
    sources: ["mdn-structured-clone", "jsinfo-json"],
  },
  {
    question: "Co wypisze ten kod?",
    code: `const cfg = Object.freeze({ db: { host: "a" } });
cfg.db.host = "b";
console.log(cfg.db.host);`,
    options: [
      "`\"b\"`: `freeze` jest płytki; zagnieżdżony obiekt nie jest zamrożony",
      "`\"a\"`: `freeze` zamraża obiekt aż do samego dna",
      "`TypeError`: właściwości zamrożonego obiektu nie można zmieniać",
    ],
    answer: 0,
    explanation:
      "`Object.freeze` zabrania dodawania, usuwania i zmieniania właściwości tylko samego obiektu. Zagnieżdżone obiekty pozostają mutowalne. Głębokie zamrażanie robi się funkcją rekurencyjną.",
    sources: ["mdn-object-freeze", "jsinfo-property-descriptors"],
  },
  {
    question: "Co daje `Object.defineProperty(obj, 'id', { value: 1, writable: false })`?",
    options: [
      "Właściwości nie da się nadpisać; domyślnie jest też niewyliczalna",
      "Właściwości nie da się odczytać z zewnątrz; staje się prywatna",
      "Właściwość jest usuwana, gdy obiekt przestaje być używany",
    ],
    answer: 0,
    explanation:
      "Każda właściwość ma flagi `writable`, `enumerable` i `configurable`. Przy `defineProperty` niepodane flagi domyślnie mają wartość `false`, więc właściwość nie pojawi się w `Object.keys` i nie da się jej usunąć. W ten sposób definiuje się też gettery i settery.",
    sources: ["jsinfo-property-descriptors"],
  },
  {
    question: "Co zwraca `[10, 1, 2].sort()`?",
    options: ["`[1, 10, 2]`", "`[1, 2, 10]`", "`[10, 2, 1]`"],
    answer: 0,
    explanation:
      "Bez funkcji porównującej `sort` porównuje elementy jako stringi, a `'10' < '2'`. Dla liczb potrzebne jest `sort((a, b) => a - b)`. Ponadto `sort` mutuje tablicę; wersja niemutująca to `toSorted()`.",
    sources: ["mdn-array-sort", "mdn-array-tosorted"],
  },
  {
    question: "Co zwracają `parseInt('12px')` i `Number('12px')`?",
    options: ["`12` i `NaN`", "`NaN` i `12`", "`12` i `12`"],
    answer: 0,
    explanation:
      "`parseInt` czyta liczbę od początku stringa, dopóki widzi cyfry, a `Number` wymaga, by cały string był liczbą. Podawaj podstawę: `parseInt(str, 10)`. Dla ułamków użyj `parseFloat`.",
    sources: ["jsinfo-number", "jsinfo-type-conversions"],
  },
  {
    question: "Czym moduły ES różnią się od CommonJS?",
    options: [
      "Importy są statyczne i analizowane z góry; eksporty to „żywe” wiązania",
      "Moduły ES działają tylko w Node.js, a CommonJS tylko w przeglądarce",
      "CommonJS obsługuje tree-shaking, a moduły ES nie",
    ],
    answer: 0,
    explanation:
      "`import`/`export` są znane przed wykonaniem, co pozwala bundlerom usuwać nieużywany kod (tree-shaking). Zaimportowana wartość odzwierciedla bieżącą wartość eksportu. `require` działa w czasie wykonania i kopiuje `module.exports`. ESM jest zawsze w trybie ścisłym i obsługuje `await` najwyższego poziomu.",
    sources: ["jsinfo-modules", "mdn-modules"],
  },
  {
    question: "Po co jest dynamiczny `import()`?",
    options: [
      "Aby ładować moduł na żądanie i wydzielić go do osobnego chunka",
      "Aby synchronicznie importować moduł wewnątrz warunków i pętli",
      "Aby przy każdym wywołaniu importować moduł od nowa",
    ],
    answer: 0,
    explanation:
      "`const { Chart } = await import('./chart.js')` zwraca promise modułu. Bundlery tworzą osobny plik, ładowany tylko wtedy, gdy jest potrzebny — to podstawa code splittingu i `React.lazy`. Moduł jest cache'owany i wykonuje się raz.",
    sources: ["mdn-dynamic-import", "jsinfo-modules"],
  },
  {
    question: "Czy `fetch` odrzuci promise przy odpowiedzi 404?",
    options: [
      "Nie: status trzeba sprawdzić samemu przez `res.ok`",
      "Tak: każdy status 4xx lub 5xx odrzuca promise z obiektem błędu",
      "Tak, ale tylko dla 5xx; odpowiedzi 4xx są uznawane za udane",
    ],
    answer: 0,
    explanation:
      "Odpowiedź HTTP z błędem to wciąż odpowiedź. Potrzebne jest jawne sprawdzenie: `if (!res.ok) throw new Error(res.status)`. Promise jest odrzucany przy awarii sieci, blokadzie CORS lub anulowaniu przez `AbortController`.",
    sources: ["mdn-fetch", "jsinfo-fetch"],
  },
  {
    question: "Jak anulować żądanie `fetch`?",
    options: [
      "Przekazać `signal` z `AbortController` i wywołać `controller.abort()`",
      "Wywołać metodę `cancel()` na promise zwróconym przez `fetch`",
      "Ustawić promise na `null` — garbage collector zatrzyma żądanie",
    ],
    answer: 0,
    explanation:
      "Po `abort()` promise jest odrzucany z `AbortError`. Ten sam sygnał można przekazać do kilku żądań i do `addEventListener`. Dla timeoutu jest `AbortSignal.timeout(5000)`. Promise'y nie mają metody `cancel`.",
    sources: ["mdn-abort-controller", "jsinfo-fetch"],
  },
  {
    question: "Czym jest CORS?",
    options: [
      "Mechanizmem, przez który serwer pozwala przeglądarce na żądania z innego originu",
      "Ochroną serwera przed atakami DDoS, którą przeglądarka włącza automatycznie",
      "Formatem szyfrowania danych między przeglądarką a serwerem",
    ],
    answer: 0,
    explanation:
      "Zgodnie z same-origin policy przeglądarka nie pozwala skryptowi czytać odpowiedzi z innej domeny, chyba że serwer wyśle `Access-Control-Allow-Origin`. Dla „nieprostych” żądań najpierw wysyłany jest preflight `OPTIONS`. To ograniczenie przeglądarki: curl ani serwer go nie stosują.",
    sources: ["mdn-cors"],
  },
  {
    question: "Dlaczego ciasteczko z flagą `HttpOnly` jest bezpieczniejsze od zwykłego?",
    options: [
      "Nie da się go odczytać z JavaScriptu, więc XSS nie ukradnie jego wartości",
      "Jest wysyłane tylko przez HTTP i nigdy przez HTTPS",
      "Przeglądarka automatycznie szyfruje je przed zapisem",
    ],
    answer: 0,
    explanation:
      "`HttpOnly` blokuje dostęp przez `document.cookie`. Ciasteczka sesyjne dostają też `Secure` (tylko HTTPS) i `SameSite` (ochrona przed CSRF). Dlatego tokeny sesji są bezpieczniejsze w takich ciasteczkach niż w `localStorage`.",
    sources: ["mdn-cookies", "jsinfo-cookie"],
  },
  {
    question: "Czym `stopPropagation` różni się od `stopImmediatePropagation`?",
    options: [
      "Druga dodatkowo nie pozwala uruchomić się innym handlerom na tym samym elemencie",
      "Pierwsza zatrzymuje zarówno propagację, jak i domyślną akcję przeglądarki",
      "To synonimy; druga jest zachowana dla kompatybilności ze starymi przeglądarkami",
    ],
    answer: 0,
    explanation:
      "`stopPropagation` zatrzymuje propagację do innych elementów, ale pozostałe handlery na bieżącym elemencie nadal się wykonają. `stopImmediatePropagation` zatrzymuje także je. Domyślną akcję anuluje tylko `preventDefault`. Nie nadużywaj zatrzymywania propagacji — psuje delegowanie.",
    sources: ["jsinfo-bubbling", "mdn-add-event-listener"],
  },
  {
    question: "Co robi opcja `{ passive: true }` w `addEventListener('touchmove', ...)`?",
    options: [
      "Obiecuje nie wywoływać `preventDefault`, więc przewijanie nie czeka na handler",
      "Handler wykona się raz, a potem zostanie automatycznie usunięty",
      "Handler uruchamia się w fazie przechwytywania zamiast propagacji",
    ],
    answer: 0,
    explanation:
      "Przeglądarka nie wie z góry, czy handler anuluje przewijanie, więc czeka na jego wykonanie. Pasywny handler pozwala zacząć przewijanie od razu — wyraźnie płynniej na mobile. Dla jednorazowego handlera jest `once`; dla fazy przechwytywania — `capture`.",
    sources: ["mdn-add-event-listener"],
  },
  {
    question: "Jak wydajnie wstawić 1000 elementów do DOM?",
    options: [
      "Zebrać je w `DocumentFragment` (lub jedną tablicę) i wstawić jedną operacją",
      "Wstawiać po jednym przez `appendChild` — przeglądarka sama je zgrupuje",
      "Za każdym razem przebudowywać całą listę przez `innerHTML +=` w pętli",
    ],
    answer: 0,
    explanation:
      "Każde wstawienie do żywego DOM może wywołać przeliczenie stylów i layoutu. Fragment jest budowany poza dokumentem i wstawiany naraz; tak samo działa `el.append(...nodes)`. `innerHTML +=` w pętli za każdym razem parsuje cały markup od nowa i gubi handlery.",
    sources: ["mdn-document-fragment", "jsinfo-modifying-document"],
  },
  {
    question: "Jak najwygodniej wykryć, że element pojawił się w viewporcie?",
    options: [
      "Przez `IntersectionObserver`",
      "Przez `getBoundingClientRect()` w handlerze `scroll` przy każdym pikselu",
      "Przez `MutationObserver` obserwujący atrybuty elementu",
    ],
    answer: 0,
    explanation:
      "`IntersectionObserver` asynchronicznie zgłasza przecięcie elementu z viewportem, bez obciążania głównego wątku przy każdym przewinięciu. Zastosowania: lazy loading, nieskończone feedy, analityka wyświetleń. `MutationObserver` śledzi zmiany DOM, a nie widoczność.",
    sources: ["mdn-intersection-observer"],
  },
  {
    question: "Jak poprawnie utworzyć własną klasę błędu?",
    code: `class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}`,
    options: [
      "Rozszerzyć `Error`, wywołać `super(message)` i ustawić `name`",
      "Utworzyć zwykły obiekt `{ message }` — `throw` przyjmuje dowolny obiekt",
      "Rozszerzyć `String`, by komunikat wyświetlał się poprawnie",
    ],
    answer: 0,
    explanation:
      "Rozszerzenie `Error` daje stack trace, poprawne działanie `instanceof` i wypisywanie w konsoli. Rzucać można cokolwiek, ale zwykły obiekt nie ma stosu. Do łańcuchowania przyczyn jest `new Error('msg', { cause: err })`.",
    sources: ["jsinfo-try-catch", "mdn-error-cause"],
  },
  {
    question: "Co zwraca `Object.fromEntries(Object.entries({ a: 1, b: 2 }).map(([k, v]) => [k, v * 10]))`?",
    options: ["`{ a: 10, b: 20 }`", "`[['a', 10], ['b', 20]]`", "`{ 0: ['a', 10], 1: ['b', 20] }`"],
    answer: 0,
    explanation:
      "`Object.entries` zamienia obiekt w tablicę par, z którą działają metody tablic, a `Object.fromEntries` składa pary z powrotem w obiekt. To standardowy sposób „mapowania obiektu”. Do grupowania jest `Object.groupBy`.",
    sources: ["jsinfo-object", "mdn-object-groupby"],
  },
  {
    question: "Czym `getter` różni się od zwykłej właściwości?",
    code: `const user = {
  first: "Ann", last: "Lee",
  get full() { return this.first + " " + this.last; },
};`,
    options: [
      "Wartość jest liczona przy każdym odwołaniu `user.full`, bez nawiasów wywołania",
      "Wartość jest liczona raz przy tworzeniu obiektu, a potem cache'owana",
      "Getter można wywołać tylko jako metodę: `user.full()`",
    ],
    answer: 0,
    explanation:
      "Getter wygląda jak właściwość, ale uruchamia funkcję. Bez settera przypisanie `user.full = ...` jest ignorowane (błąd w trybie ścisłym). Gettery służą do pól obliczanych i walidacji przez parę getter/setter.",
    sources: ["jsinfo-property-descriptors", "jsinfo-class"],
  },
  {
    question: "Co zwraca `Array.from({ length: 3 }, (_, i) => i * 2)`?",
    options: ["`[0, 2, 4]`", "`[undefined, undefined, undefined]`", "`[]`"],
    answer: 0,
    explanation:
      "`Array.from` tworzy tablicę z obiektu iterowalnego lub tablicopodobnego (`{ length: 3 }`), a drugi argument to funkcja mapująca. To wygodny sposób generowania zakresów. `new Array(3)` tworzy tablicę z „dziurami”, które `map` pomija.",
    sources: ["jsinfo-array-methods", "jsinfo-iterable"],
  },
  {
    question: "Co zwraca `{} === {}`?",
    options: ["`false`", "`true`", "`TypeError`"],
    answer: 0,
    explanation:
      "Obiekty porównuje się przez referencję: dwa literały to dwa różne obiekty. Porównanie zawartości wymaga własnej funkcji deep-equal lub biblioteki. Ma to znaczenie dla zależności `useEffect` i memoizacji w React.",
    sources: ["mdn-equality", "jsinfo-object-copy"],
  },
];

export default questions;
