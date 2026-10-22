import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Ile typów danych ma JavaScript według specyfikacji?",
    options: [
      "8: siedem prymitywów i `object`",
      "6: `number`, `string`, `boolean`, `null`, `undefined`, `object`",
      "3: prymitywy, obiekty i funkcje jako osobny typ",
    ],
    answer: 0,
    explanation:
      "Prymitywy: `number`, `bigint`, `string`, `boolean`, `null`, `undefined`, `symbol`. Wszystko inne to `object`, w tym tablice, funkcje i daty. Funkcje są obiektami, choć `typeof` zwraca dla nich `'function'`.",
    sources: ["jsinfo-types", "mdn-data-structures"],
  },
  {
    question: "Co zwraca `typeof null`?",
    options: ["`'object'`", "`'null'`", "`'undefined'`"],
    answer: 0,
    explanation:
      "To historyczny błąd z pierwszej implementacji języka, zachowany dla kompatybilności. `null` to osobny prymityw. Sprawdza się go ścisłą równością: `value === null`.",
    sources: ["mdn-typeof", "jsinfo-types"],
  },
  {
    question: "Co zwraca `typeof NaN`?",
    options: ["`'number'`", "`'NaN'`", "`'undefined'`"],
    answer: 0,
    explanation:
      "`NaN` (Not-a-Number) to specjalna wartość typu liczbowego, wynik niepoprawnej operacji matematycznej, np. `0 / 0` lub `Number('abc')`. Sprawdza się go przez `Number.isNaN(x)`.",
    sources: ["jsinfo-number", "mdn-typeof"],
  },
  {
    question: "Czym `let` różni się od `var`?",
    options: [
      "`let` ma zasięg bloku `{}`, `var` — funkcji",
      "`let` ma zasięg funkcji, a `var` — bloku `{}`",
      "Niczym: `let` to po prostu nowa nazwa `var`",
    ],
    answer: 0,
    explanation:
      "`var` zadeklarowany wewnątrz `if` lub `for` jest widoczny w całej funkcji. Ponadto `var` jest hoistowany z wartością `undefined` i na najwyższym poziomie staje się właściwością `window`, a `let` i `const` do momentu deklaracji są w „martwej strefie czasowej”.",
    sources: ["jsinfo-var", "jsinfo-variables"],
  },
  {
    question: "Co się stanie?",
    code: `const user = { name: "Ann" };
user.name = "Bob";`,
    options: [
      "Zadziała: `const` zabrania ponownego przypisania, a nie mutacji obiektu",
      "`TypeError`: właściwości obiektu `const` nie można zmieniać",
      "Zmiana zostanie po cichu zignorowana i `name` pozostanie `\"Ann\"`",
    ],
    answer: 0,
    explanation:
      "`const` ustala referencję: `user = {}` rzuci błąd, ale zawartość obiektu można zmieniać. Aby zablokować zmiany właściwości, użyj `Object.freeze` (płytko).",
    sources: ["jsinfo-variables", "mdn-object-freeze"],
  },
  {
    question: "Co wypisze ten kod?",
    code: `console.log(x);
var x = 5;`,
    options: ["`undefined`", "`5`", "`ReferenceError`"],
    answer: 0,
    explanation:
      "Deklaracja `var` jest wynoszona na początek funkcji i inicjalizowana wartością `undefined`, a przypisanie zostaje na miejscu. Z `let` lub `const` byłby to `ReferenceError`.",
    sources: ["mdn-hoisting", "jsinfo-var"],
  },
  {
    question: "Co wypisze ten kod?",
    code: `console.log(y);
let y = 5;`,
    options: ["`ReferenceError`", "`undefined`", "`5`"],
    answer: 0,
    explanation:
      "`let` i `const` też są hoistowane, ale do linii deklaracji znajdują się w martwej strefie czasowej (TDZ): każdy dostęp rzuca `ReferenceError`. Pomaga to wychwycić zmienne użyte przed inicjalizacją.",
    sources: ["mdn-let", "mdn-hoisting"],
  },
  {
    question: "Czym `==` różni się od `===`?",
    options: [
      "`==` konwertuje typy przed porównaniem, `===` porównuje bez konwersji",
      "`===` konwertuje typy przed porównaniem, a `==` porównuje bez konwersji",
      "`==` porównuje tylko liczby, a `===` wartości dowolnego typu",
    ],
    answer: 0,
    explanation:
      "`0 == ''` i `'1' == 1` dają `true` z powodu konwersji, ale `false` przy `===`. Reguły luźnej równości są mylące, więc niemal zawsze używa się `===`. Wygodny wyjątek: `x == null` sprawdza naraz `null` i `undefined`.",
    sources: ["jsinfo-comparison", "mdn-equality"],
  },
  {
    question: "Czym `null` różni się od `undefined`?",
    options: [
      "`undefined` oznacza brak przypisanej wartości, `null` to jawna „pustka” ustawiona przez programistę",
      "`null` oznacza brak przypisanej wartości, a `undefined` to jawnie ustawiona „pustka”",
      "To ta sama wartość; `null === undefined` zwraca `true`",
    ],
    answer: 0,
    explanation:
      "`undefined` dają niezainicjalizowane zmienne, brakujące właściwości i parametry oraz funkcje bez `return`. `null` przypisuje się celowo. `null == undefined` to `true`, ale `null === undefined` to `false`.",
    sources: ["jsinfo-types"],
  },
  {
    question: "Co zwraca `NaN === NaN`?",
    options: ["`false`", "`true`", "`NaN`"],
    answer: 0,
    explanation:
      "`NaN` nie jest równy niczemu, nawet sobie. Do sprawdzenia użyj `Number.isNaN(x)` lub `Object.is(x, NaN)`. Globalne `isNaN('abc')` najpierw konwertuje argument na liczbę i zwraca `true` dla stringów.",
    sources: ["jsinfo-number", "mdn-equality"],
  },
  {
    question: "Ile wynosi `0.1 + 0.2 === 0.3`?",
    options: ["`false`", "`true`", "`TypeError`"],
    answer: 0,
    explanation:
      "Liczby są przechowywane w binarnym formacie IEEE-754, a 0.1 i 0.2 nie da się przedstawić dokładnie — suma to `0.30000000000000004`. Liczby porównuje się z tolerancją (`Math.abs(a - b) < Number.EPSILON`), a pieniądze obsługuje jako całkowite grosze.",
    sources: ["jsinfo-number", "mdn-number-epsilon"],
  },
  {
    question: "Ile wynoszą `'5' + 3` i `'5' - 3`?",
    options: ["`'53'` i `2`", "`8` i `2`", "`'53'` i `'2'`"],
    answer: 0,
    explanation:
      "Jeśli jeden operand `+` jest stringiem, następuje konkatenacja. Pozostałe operatory arytmetyczne konwertują operandy na liczby. Dlatego wartości z `input.value` konwertuje się przez `Number()` przed dodawaniem.",
    sources: ["jsinfo-type-conversions"],
  },
  {
    question: "Która z tych wartości jest falsy?",
    options: ["`0`", "`'0'`", "`[]`"],
    answer: 0,
    explanation:
      "Wartości falsy: `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`. Wszystko inne jest truthy, w tym string `'0'`, pusta tablica `[]` i pusty obiekt `{}`.",
    sources: ["jsinfo-logical-operators", "jsinfo-type-conversions"],
  },
  {
    question: "Czym `count || 10` różni się od `count ?? 10` przy `count = 0`?",
    options: [
      "`||` zwraca `10`, a `??` zwraca `0`",
      "Oba zwracają `10`, bo `0` jest falsy",
      "Oba zwracają `0`, bo wartość jest zdefiniowana",
    ],
    answer: 0,
    explanation:
      "`||` podstawia wartość zapasową dla każdej wartości falsy, a `??` tylko dla `null` i `undefined`. Dla liczb i stringów, w których `0` i `''` są poprawnymi wartościami, właściwym wyborem jest `??`.",
    sources: ["jsinfo-nullish", "jsinfo-logical-operators"],
  },
  {
    question: "Co zwraca `user?.address?.city`, jeśli `user = {}`?",
    options: ["`undefined`", "`TypeError`", "`null`"],
    answer: 0,
    explanation:
      "Optional chaining przerywa obliczenie i zwraca `undefined`, jeśli wartość po lewej to `null` lub `undefined`. Bez `?.` wyrażenie `user.address.city` rzuciłoby `TypeError`. Są też formy dla wywołań `fn?.()` i indeksów `arr?.[0]`.",
    sources: ["jsinfo-optional-chaining"],
  },
  {
    question: "Czym funkcja strzałkowa różni się od zwykłej?",
    options: [
      "Nie ma własnego `this` ani `arguments` i nie można jej wywołać przez `new`",
      "Zawsze wykonuje się asynchronicznie, a zwykła synchronicznie",
      "Jest w pełni hoistowana, a zwykła funkcja nie",
    ],
    answer: 0,
    explanation:
      "Strzałka bierze `this` z zakresu, w którym została utworzona, co czyni ją wygodną dla callbacków wewnątrz metod. Ale nie nadaje się na metodę obiektu: `this` nie będzie wskazywać na obiekt. W pełni hoistowane są tylko deklaracje funkcji (function declaration).",
    sources: ["jsinfo-arrow-functions", "mdn-this"],
  },
  {
    question: "Czy można wywołać funkcję przed jej deklaracją?",
    code: `greet();
function greet() { console.log("hi"); }`,
    options: [
      "Tak: function declaration jest w pełni hoistowana",
      "Nie: rzuci `ReferenceError`, jak przy `let`",
      "Nie: rzuci `TypeError: greet is not a function`",
    ],
    answer: 0,
    explanation:
      "Deklaracje funkcji są tworzone przed wykonaniem kodu w ich zakresie. Przy function expression (`const greet = function () {}`) wywołanie przed deklaracją się nie powiedzie: zmienna jest w TDZ (lub ma wartość `undefined` przy `var`).",
    sources: ["jsinfo-function-expressions", "mdn-hoisting"],
  },
  {
    question: "Co wypisze ten kod?",
    code: `function makeCounter() {
  let count = 0;
  return () => ++count;
}
const c = makeCounter();
c(); c();
console.log(c());`,
    options: ["`3`", "`1`", "`0`"],
    answer: 0,
    explanation:
      "To domknięcie: zwrócona funkcja pamięta zmienną `count` z zakresu, w którym powstała, a każde wywołanie ją zwiększa. Ponowne wywołanie `makeCounter()` utworzyłoby niezależny licznik.",
    sources: ["jsinfo-closure", "mdn-closures"],
  },
  {
    question: "Czym jest domknięcie (closure)?",
    options: [
      "Funkcja wraz z dostępem do zmiennych zewnętrznego zakresu, w którym została utworzona",
      "Funkcja wywoływana zaraz po deklaracji, a potem usuwana",
      "Blok kodu w nawiasach klamrowych, niedostępny z zewnątrz po wykonaniu",
    ],
    answer: 0,
    explanation:
      "Każda funkcja JS pamięta środowisko leksykalne, w którym powstała, i może czytać oraz zmieniać jego zmienne nawet po zakończeniu funkcji zewnętrznej. Na tym opierają się prywatne dane, fabryki funkcji, memoizacja i obsługa zdarzeń.",
    sources: ["jsinfo-closure", "mdn-closures"],
  },
  {
    question: "Co wypisze ten kod?",
    code: `const a = { n: 1 };
const b = a;
b.n = 2;
console.log(a.n);`,
    options: ["`2`", "`1`", "`undefined`"],
    answer: 0,
    explanation:
      "Obiekty są przekazywane przez referencję: `b` wskazuje na ten sam obiekt co `a`. Aby uzyskać kopię, użyj spreadu `{ ...a }` (płytko) lub `structuredClone(a)` (głęboko).",
    sources: ["jsinfo-object-copy"],
  },
  {
    question: "Co robi `const copy = { ...original }`?",
    options: [
      "Płytką kopię: zagnieżdżone obiekty pozostają wspólne",
      "Głęboką kopię wszystkich zagnieżdżonych obiektów i tablic",
      "Referencję do tego samego obiektu, jak `const copy = original`",
    ],
    answer: 0,
    explanation:
      "Spread kopiuje tylko własne właściwości pierwszego poziomu. Jeśli `original.address` jest obiektem, będzie wspólny dla obu kopii. `structuredClone` daje głęboką kopię, ale nie kopiuje funkcji ani węzłów DOM.",
    sources: ["jsinfo-object-copy", "mdn-structured-clone"],
  },
  {
    question: "Co zwraca `[1, 2, 3].map(x => x * 2)`?",
    options: ["`[2, 4, 6]`", "`undefined`", "`12`"],
    answer: 0,
    explanation:
      "`map` tworzy nową tablicę z wyników callbacka, nie zmieniając oryginału. Podobne niemutujące metody: `filter` (wybór), `reduce` (redukcja do jednej wartości), `find`, `some`, `every`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "Co zwraca `[1, 2, 3].forEach(x => x * 2)`?",
    options: ["`undefined`", "`[2, 4, 6]`", "`[1, 2, 3]`"],
    answer: 0,
    explanation:
      "`forEach` służy do efektów ubocznych i zawsze zwraca `undefined`. Aby dostać nową tablicę, użyj `map`. Inna różnica: z `forEach` nie da się wyjść przez `break` — do tego służą `for...of`, `some` lub `find`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "Co zwraca `[1, 2, 3, 4].reduce((sum, x) => sum + x, 0)`?",
    options: ["`10`", "`[1, 3, 6, 10]`", "`0`"],
    answer: 0,
    explanation:
      "`reduce` przechodzi po tablicy, przekazując akumulator z kroku do kroku; drugi argument to wartość początkowa. Bez niego pierwszy element staje się początkowym akumulatorem, a pusta tablica rzuca `TypeError`.",
    sources: ["mdn-array-reduce", "jsinfo-array-methods"],
  },
  {
    question: "Czym `for...in` różni się od `for...of`?",
    options: [
      "`for...in` iteruje po kluczach obiektu, `for...of` po wartościach obiektu iterowalnego",
      "`for...in` iteruje po wartościach tablicy, a `for...of` po kluczach obiektu",
      "Niczym: to dwa synonimy tej samej pętli",
    ],
    answer: 0,
    explanation:
      "`for (const key in obj)` przechodzi po wyliczalnych kluczach-stringach, w tym dziedziczonych. `for (const item of arr)` działa z obiektami iterowalnymi: tablicami, stringami, `Map`, `Set`. `for...in` nie nadaje się do tablic — zwraca indeksy jako stringi.",
    sources: ["mdn-for-in", "mdn-for-of"],
  },
  {
    question: "Czym `slice` różni się od `splice`?",
    options: [
      "`slice` zwraca część tablicy bez zmian, `splice` mutuje oryginał",
      "`splice` zwraca niezmienioną kopię, a `slice` mutuje oryginalną tablicę",
      "To synonimy; `splice` to przestarzała nazwa `slice`",
    ],
    answer: 0,
    explanation:
      "`arr.slice(1, 3)` tworzy nową tablicę. `arr.splice(1, 2, 'x')` usuwa i wstawia elementy w samym `arr`. Niemutująca alternatywa to `toSpliced()`. Inne mutujące metody: `push`, `pop`, `shift`, `sort`, `reverse`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "Co zwracają `[NaN].includes(NaN)` i `[NaN].indexOf(NaN)`?",
    options: ["`true` i `-1`", "`false` i `-1`", "`true` i `0`"],
    answer: 0,
    explanation:
      "`indexOf` używa ścisłej równości `===`, a `NaN !== NaN`. `includes` używa algorytmu SameValueZero, który uznaje `NaN` za równy sobie. Dlatego `includes` jest pewniejszy do sprawdzania obecności.",
    sources: ["jsinfo-array-methods", "mdn-equality"],
  },
  {
    question: "Co wypisze ten kod?",
    code: `const { name = "Guest", age } = { age: 30 };
console.log(name, age);`,
    options: ["`Guest 30`", "`undefined 30`", "`TypeError`"],
    answer: 0,
    explanation:
      "Destrukturyzacja wyciąga właściwości do zmiennych, a wartość domyślna jest używana, gdy właściwość to `undefined`. Można zmieniać nazwy (`{ name: userName }`) i destrukturyzować zagnieżdżone obiekty i tablice.",
    sources: ["jsinfo-destructuring"],
  },
  {
    question: "Co zwraca `sum(1, 2, 3)`?",
    code: `function sum(...nums) {
  return nums.length;
}`,
    options: ["`3`", "`1`", "`6`"],
    answer: 0,
    explanation:
      "Parametr rest zbiera pozostałe argumenty w prawdziwą tablicę. W odróżnieniu od przestarzałego `arguments` jest to tablica z `map` i `reduce` i działa w funkcjach strzałkowych.",
    sources: ["jsinfo-rest-spread"],
  },
  {
    question: "Co zwraca `Math.max(...[3, 7, 2])`?",
    options: ["`7`", "`NaN`", "`[3, 7, 2]`"],
    answer: 0,
    explanation:
      "Spread „rozkłada” tablicę na osobne argumenty: `Math.max(3, 7, 2)`. Bez spreadu `Math.max([3, 7, 2])` zwraca `NaN`. Spread służy też do kopiowania i łączenia tablic i obiektów.",
    sources: ["jsinfo-rest-spread"],
  },
  {
    question: "Co zwraca `JSON.stringify({ a: 1, b: undefined, c: () => 1 })`?",
    options: ["`'{\"a\":1}'`", "`'{\"a\":1,\"b\":null,\"c\":null}'`", "`TypeError`"],
    answer: 0,
    explanation:
      "Właściwości o wartościach `undefined`, funkcje i symbole są pomijane (w tablicach stają się `null`). `Date` staje się stringiem, `Map` i `Set` — `{}`. Cykliczne referencje rzucają błąd.",
    sources: ["jsinfo-json"],
  },
  {
    question: "W jakiej kolejności zostaną wypisane liczby?",
    code: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);`,
    options: ["`1 4 3 2`", "`1 2 3 4`", "`1 4 2 3`"],
    answer: 0,
    explanation:
      "Najpierw wykonuje się kod synchroniczny (1, 4). Potem event loop wykonuje wszystkie mikrozadania — callbacki promise'ów (3) — a dopiero potem kolejne makrozadanie — timer (2). `setTimeout(fn, 0)` nie oznacza „natychmiast”.",
    sources: ["jsinfo-event-loop", "jsinfo-microtask"],
  },
  {
    question: "W jakich stanach może być promise?",
    options: [
      "`pending`, potem `fulfilled` lub `rejected` — i więcej się nie zmienia",
      "`pending`, `running`, `done` i `cancelled` na żądanie użytkownika",
      "Tylko `resolved` lub `rejected`; nie ma stanu początkowego",
    ],
    answer: 0,
    explanation:
      "Promise zaczyna w stanie pending i rozstrzyga się dokładnie raz do fulfilled lub rejected. Kolejne wywołania `resolve`/`reject` są ignorowane. Promise'a nie da się anulować — do anulowania operacji służy `AbortController`.",
    sources: ["jsinfo-promise", "mdn-promise"],
  },
  {
    question: "Co zwraca funkcja `async`?",
    options: [
      "Zawsze promise, nawet z `return 42` w środku",
      "Wartość z `return` bezpośrednio, bez promise'a",
      "`undefined`, a wynik jest przekazywany do callbacka",
    ],
    answer: 0,
    explanation:
      "`async function f() { return 42 }` zwraca `Promise<42>`. Wyjątek w środku zamienia się w odrzucony promise. Dlatego wynik pobiera się przez `await` lub `.then()`.",
    sources: ["jsinfo-async-await", "mdn-async-function"],
  },
  {
    question: "Dlaczego `catch` nie złapie błędu?",
    code: `try {
  fetch("/api").then(r => { throw new Error("fail"); });
} catch (e) {
  console.log("caught");
}`,
    options: [
      "Błąd występuje później, asynchronicznie, gdy `try` już się zakończył",
      "`try/catch` w ogóle nie łapie obiektów `Error`",
      "`fetch` automatycznie połyka wszystkie błędy wewnątrz `.then`",
    ],
    answer: 0,
    explanation:
      "Blok `try` wykonał się synchronicznie i zakończył, zanim serwer odpowiedział. Błędy w łańcuchu łapie się przez `.catch()` albo pisząc `await fetch(...)` wewnątrz `try` w funkcji async — wtedy `catch` działa.",
    sources: ["jsinfo-try-catch", "jsinfo-async-await"],
  },
  {
    question: "Co wypisze `const arr = ['a', 'b']; console.log(arr[20]);`?",
    options: ["`undefined`", "`RangeError`", "`null`"],
    answer: 0,
    explanation:
      "Odwołanie do nieistniejącego indeksu, jak do brakującej właściwości obiektu, zwraca `undefined` bez błędu. Do ostatniego elementu wygodne jest `arr.at(-1)`.",
    sources: ["jsinfo-array-methods", "mdn-array-at"],
  },
  {
    question: "Co wypisze ten kod?",
    code: `const s = "hello";
s[0] = "H";
console.log(s);`,
    options: ["`hello`", "`Hello`", "`TypeError` w każdym trybie"],
    answer: 0,
    explanation:
      "Stringi są niezmienne: nie można zmienić znaku; przypisanie jest po cichu ignorowane (`TypeError` w trybie ścisłym). Trzeba utworzyć nowy string: `s[0].toUpperCase() + s.slice(1)`.",
    sources: ["jsinfo-types", "mdn-strict-mode"],
  },
  {
    question: "Jak niezawodnie sprawdzić, że wartość jest tablicą?",
    options: ["`Array.isArray(value)`", "`typeof value === 'array'`", "`value.length !== undefined`"],
    answer: 0,
    explanation:
      "`typeof []` zwraca `'object'`, a `length` mają też stringi i obiekty tablicopodobne. `Array.isArray` działa nawet dla tablic z innych iframe'ów, gdzie `instanceof Array` zawodzi.",
    sources: ["jsinfo-array-methods", "mdn-typeof"],
  },
  {
    question: "Dlaczego `textContent` jest bezpieczniejszy niż `innerHTML` do wyświetlania tekstu użytkownika?",
    options: [
      "Wstawia tekst bez zmian, bez parsowania HTML — XSS jest niemożliwy",
      "Automatycznie usuwa ze stringa wszystkie niebezpieczne słowa i znaki",
      "Jest szybszy, a oba są tak samo bezpieczne",
    ],
    answer: 0,
    explanation:
      "`el.innerHTML = userInput` parsuje string jako markup, a `<img src=x onerror=alert(1)>` uruchamia skrypt. `textContent` pokazuje znaczniki jako tekst. Jeśli naprawdę potrzebujesz HTML, oczyść go sanitizerem (DOMPurify).",
    sources: ["mdn-textcontent", "mdn-xss"],
  },
  {
    question: "Dlaczego `addEventListener` jest lepszy niż `el.onclick = handler`?",
    options: [
      "Pozwala na wiele handlerów i opcje (`once`, `passive`)",
      "Jest szybszy, bo działa w osobnym wątku",
      "Tylko on daje dostęp do obiektu zdarzenia w handlerze",
    ],
    answer: 0,
    explanation:
      "Ponowne przypisanie `onclick` nadpisuje poprzedni handler. `addEventListener` dodaje je niezależnie i obsługuje fazę przechwytywania (`capture`), jednorazowe handlery i usuwanie przez `signal` (AbortController). Usuwa się je przez `removeEventListener` z tą samą funkcją.",
    sources: ["mdn-add-event-listener"],
  },
  {
    question: "Co robi `event.preventDefault()`?",
    options: [
      "Anuluje domyślną akcję przeglądarki (przejście, wysłanie formularza)",
      "Zatrzymuje propagację zdarzenia do elementów nadrzędnych",
      "Usuwa handler zdarzenia z elementu po pierwszym wywołaniu",
    ],
    answer: 0,
    explanation:
      "Na przykład link nie przejdzie pod `href`, formularz się nie wyśle, checkbox się nie przełączy. Zatrzymanie propagacji to `event.stopPropagation()`; to różne rzeczy, często mylone.",
    sources: ["jsinfo-default-browser-action"],
  },
  {
    question: "Czym jest propagacja zdarzeń w górę (bubbling)?",
    options: [
      "Zdarzenie wyzwala się na elemencie, a potem wędruje przez przodków aż do `document`",
      "Zdarzenie wyzwala się najpierw na `document`, a potem schodzi do elementu",
      "Zdarzenie wyzwala się na wszystkich elementach strony jednocześnie",
    ],
    answer: 0,
    explanation:
      "Kliknięcie przycisku wewnątrz `div` uruchamia handlery przycisku, potem `div`, potem wyżej. Przed bubblingiem jest faza przechwytywania (capturing) — od `window` w dół do celu. `event.target` to miejsce, gdzie zdarzenie nastąpiło, `event.currentTarget` — czyj handler działa teraz.",
    sources: ["jsinfo-bubbling", "mdn-event-bubbling"],
  },
  {
    question: "Na czym polega delegowanie zdarzeń?",
    options: [
      "Jeden handler na rodzicu obsługuje zdarzenia dzieci przez `event.target`",
      "Handler jest przenoszony do Web Workera, by nie blokował głównego wątku",
      "Każdy element potomny dostaje kopię handlera rodzica",
    ],
    answer: 0,
    explanation:
      "Zamiast 1000 handlerów na każdym wierszu tabeli jest jeden na `table`, który znajduje cel przez `event.target.closest('tr')`. Oszczędza to pamięć i automatycznie działa dla elementów dodanych później. Opiera się na bubblingu.",
    sources: ["jsinfo-event-delegation", "jsinfo-bubbling"],
  },
  {
    question: "Czym `localStorage` różni się od `sessionStorage`?",
    options: [
      "`localStorage` przechowuje dane bezterminowo, `sessionStorage` — do zamknięcia karty",
      "`sessionStorage` przechowuje dane bezterminowo, a `localStorage` — do zamknięcia karty",
      "`localStorage` jest wysyłany na serwer z każdym żądaniem, a `sessionStorage` nie",
    ],
    answer: 0,
    explanation:
      "Oba przechowują stringi w obrębie originu, kilka megabajtów, i nie są wysyłane na serwer (w przeciwieństwie do ciasteczek). `sessionStorage` jest dodatkowo izolowany per karta. Przechowywanie tam tokenów i sekretów jest niebezpieczne: każdy skrypt na stronie może je odczytać.",
    sources: ["jsinfo-localstorage", "mdn-web-storage"],
  },
  {
    question: "Co zwróci `localStorage.getItem('n')` po `localStorage.setItem('n', 5)`?",
    options: ["`'5'`", "`5`", "`null`"],
    answer: 0,
    explanation:
      "Web Storage przechowuje tylko stringi — wartość jest konwertowana przez `String()`. Obiekt zamieni się w `'[object Object]'`, dlatego złożone dane zapisuje się przez `JSON.stringify`, a odczytuje przez `JSON.parse`.",
    sources: ["jsinfo-localstorage", "jsinfo-json"],
  },
  {
    question: "Czym `DOMContentLoaded` różni się od `load`?",
    options: [
      "`DOMContentLoaded` — DOM jest zbudowany; `load` — załadowane są też obrazki i style",
      "`load` wyzwala się wcześniej: zaraz po zbudowaniu DOM, bez obrazków i stylów",
      "To to samo zdarzenie pod różnymi nazwami w różnych przeglądarkach",
    ],
    answer: 0,
    explanation:
      "`DOMContentLoaded` wystarczy do pracy z DOM (skrypty `defer` wykonują się tuż przed nim). `load` czeka na wszystkie zasoby, w tym obrazki i iframe'y — jest potrzebny np. do zmierzenia rozmiarów obrazków.",
    sources: ["jsinfo-onload", "mdn-dom-content-loaded"],
  },
  {
    question: "Czym `Map` różni się od zwykłego obiektu?",
    options: [
      "Kluczami `Map` mogą być dowolne wartości, a kolejność wstawiania jest zachowana",
      "`Map` przechowuje tylko klucze-stringi, a obiekt dowolne wartości",
      "`Map` jest niezmienna: po utworzeniu nie można dodawać par",
    ],
    answer: 0,
    explanation:
      "Kluczami obiektu są stringi lub symbole (liczba `1` staje się `'1'`), są też właściwości dziedziczone. `Map` przyjmuje obiekty jako klucze, ma `size` oraz `get/set/has/delete` i jest wygodna przy częstym dodawaniu i usuwaniu.",
    sources: ["jsinfo-map-set"],
  },
  {
    question: "Jak szybko usunąć duplikaty z tablicy prymitywów?",
    options: ["`[...new Set(arr)]`", "`arr.unique()`", "`Object.keys(arr)`"],
    answer: 0,
    explanation:
      "`Set` przechowuje tylko unikalne wartości (porównanie SameValueZero). Spread zamienia go z powrotem w tablicę. Tablice obiektów wymagają klucza: np. `Map` po `id`.",
    sources: ["jsinfo-map-set"],
  },
  {
    question: "Co daje dyrektywa `'use strict'`?",
    options: [
      "Tryb ścisły: błędy zamiast cichych porażek i zakaz niebezpiecznych konstrukcji",
      "Statyczne sprawdzanie typów w czasie działania, jak w TypeScript",
      "Automatyczną minifikację i optymalizację kodu przez silnik",
    ],
    answer: 0,
    explanation:
      "Na przykład przypisanie do niezadeklarowanej zmiennej rzuca błąd zamiast tworzyć zmienną globalną, a `this` w zwykłej funkcji to `undefined`, a nie `window`. Moduły i klasy działają w trybie ścisłym automatycznie.",
    sources: ["mdn-strict-mode"],
  },
  {
    question: "Jak znaleźć pierwszy element z klasą `card` na stronie?",
    options: [
      "`document.querySelector('.card')`",
      "`document.getElementsByClassName('.card')[1]`",
      "`document.find('card')`",
    ],
    answer: 0,
    explanation:
      "`querySelector` przyjmuje dowolny selektor CSS i zwraca pierwszy element lub `null`. `querySelectorAll` zwraca statyczną `NodeList` wszystkich dopasowań. `getElementsByClassName` przyjmuje nazwę klasy bez kropki, a indeksowanie zaczyna się od 0.",
    sources: ["jsinfo-dom-nodes"],
  },
];

export default questions;
