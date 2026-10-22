import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Jak event loop przetwarza zadania w przeglądarce?",
    options: [
      "Jedno makrozadanie, potem cała kolejka mikrozadań, potem ewentualne renderowanie",
      "Wszystkie makrozadania z rzędu, potem jedno mikrozadanie, potem obowiązkowe renderowanie",
      "Mikro- i makrozadania ściśle naprzemiennie, jedno po drugim",
    ],
    answer: 0,
    explanation:
      "Po każdym makrozadaniu (skrypt, zdarzenie, timer) kolejka mikrozadań jest opróżniana do końca, łącznie z mikrozadaniami dodanymi po drodze. Potem przeglądarka może zaktualizować renderowanie (wywołując `requestAnimationFrame`), jeśli przyszła pora na klatkę. Dlatego długi łańcuch mikrozadań również blokuje renderowanie.",
    sources: ["jsinfo-event-loop", "mdn-event-loop", "mdn-async-intro"],
  },
  {
    question: "Co stanie się ze stroną?",
    code: `function loop() {
  Promise.resolve().then(loop);
}
loop();`,
    options: [
      "Strona się zawiesi: mikrozadania są dodawane bez końca, a renderowanie nigdy nie następuje",
      "Nic złego: przeglądarka zdąży narysować klatki między mikrozadaniami",
      "`RangeError: Maximum call stack size exceeded` z powodu rekurencji",
    ],
    answer: 0,
    explanation:
      "Stos nie rośnie (każde wywołanie to osobne mikrozadanie), więc przepełnienia nie ma. Ale kolejka mikrozadań nigdy się nie opróżnia, a event loop nigdy nie przechodzi do renderowania ani zdarzeń. Z `setTimeout(loop)` strona pozostałaby responsywna.",
    sources: ["jsinfo-microtask", "mdn-microtasks"],
  },
  {
    question: "Czy funkcja executor w `new Promise(executor)` wykonuje się synchronicznie?",
    code: `new Promise(() => console.log("A"));
console.log("B");`,
    options: [
      "Tak: wypisze się `A`, potem `B`",
      "Nie: wypisze się `B`, potem `A`",
      "Nie: `A` nie wypisze się, dopóki nie zostanie wywołane `resolve`",
    ],
    answer: 0,
    explanation:
      "Executor jest wywoływany od razu w konstruktorze. Asynchroniczne są tylko callbacki `then/catch/finally` — zawsze wykonują się jako mikrozadania, nawet jeśli promise jest już rozstrzygnięty. Gwarantuje to przewidywalną kolejność kodu.",
    sources: ["jsinfo-promise", "mdn-promise"],
  },
  {
    question: "Dlaczego poniższy promise nigdy nie zostanie odrzucony?",
    code: `new Promise((resolve, reject) => {
  setTimeout(() => { throw new Error("boom"); }, 0);
});`,
    options: [
      "Wyjątek w timerze jest rzucany poza executorem i nie jest powiązany z promise'em",
      "`setTimeout` wewnątrz promise'a automatycznie połyka wszelkie wyjątki",
      "Promise zostanie odrzucony, ale dopiero po jawnym wywołaniu `.catch()`",
    ],
    answer: 0,
    explanation:
      "Tylko synchroniczne wyjątki w executorze automatycznie zamieniają się w odrzucenie. Błąd w callbacku timera następuje później, w osobnym zadaniu: staje się globalnym nieobsłużonym błędem, a promise na zawsze zostaje `pending`. Trzeba jawnie wywołać `reject`.",
    sources: ["jsinfo-promise", "jsinfo-try-catch"],
  },
  {
    question: "Jak globalnie śledzić nieobsłużone odrzucenia promise'ów w przeglądarce?",
    options: [
      "Zdarzeniem `unhandledrejection` na `window`",
      "Zdarzeniem `error` na `document` z flagą `promise`",
      "Metodą `Promise.onError` na starcie aplikacji",
    ],
    answer: 0,
    explanation:
      "`window.addEventListener('unhandledrejection', e => report(e.reason))` to standardowy sposób wysyłania takich błędów do monitoringu. Synchroniczne nieobsłużone błędy łapie zdarzenie `error` na `window`. Metody `Promise.onError` nie ma.",
    sources: ["jsinfo-try-catch", "mdn-promise"],
  },
  {
    question: "Co robi `for await...of`?",
    options: [
      "Iteruje po asynchronicznym obiekcie iterowalnym, czekając na każdą wartość",
      "Uruchamia wszystkie iteracje pętli równolegle i czeka na ich zakończenie",
      "Powtarza pętlę, dopóki promise nie stanie się `fulfilled`",
    ],
    answer: 0,
    explanation:
      "Działa z obiektami, które mają `Symbol.asyncIterator`: generatorami async, strumieniami (`ReadableStream`), paginacją API. Iteracje wykonują się sekwencyjnie. Do równoległego przetwarzania tablicy promise'ów użyj `Promise.all`.",
    sources: ["mdn-for-await", "jsinfo-generators"],
  },
  {
    question: "Do czego przydaje się asynchroniczny generator?",
    code: `async function* pages(url) {
  while (url) {
    const res = await fetch(url).then(r => r.json());
    yield res.items;
    url = res.next;
  }
}`,
    options: [
      "Do leniwego oddawania danych porcjami, które przychodzą asynchronicznie",
      "Do równoległego wykonywania żądań w osobnych wątkach",
      "Do synchronicznego czekania na odpowiedź bez blokowania event loop",
    ],
    answer: 0,
    explanation:
      "Konsument pisze `for await (const items of pages(url))` i decyduje, kiedy przestać — następna strona nie jest pobierana, dopóki nie jest potrzebna. Wyjście z pętli przez `break` wywołuje `return()` generatora i go kończy.",
    sources: ["jsinfo-generators", "mdn-for-await"],
  },
  {
    question: "Do czego służy `Proxy`?",
    options: [
      "Do przechwytywania operacji na obiekcie: odczytów, zapisów, usunięć",
      "Do kierowania żądań HTTP przez serwer pośredniczący",
      "Do tworzenia niezmiennych głębokich kopii obiektów",
    ],
    answer: 0,
    explanation:
      "Pułapki (traps) takie jak `get`, `set`, `has` i `deleteProperty` pozwalają implementować reaktywność (tak działa Vue 3), walidację, logowanie i wartości domyślne. `Reflect` daje domyślne zachowanie operacji do użycia wewnątrz pułapek.",
    sources: ["jsinfo-proxy", "mdn-proxy"],
  },
  {
    question: "W jakich warunkach garbage collector na pewno usunie obiekt?",
    options: [
      "Obiekt jest nieosiągalny z korzeni (zmienne globalne, stos, domknięcia)",
      "Jego licznik referencji spadł do zera po przypisaniu `null`",
      "Od ostatniego odwołania do obiektu minęło ponad 60 sekund",
    ],
    answer: 0,
    explanation:
      "Nowoczesne silniki używają mark-and-sweep: żywe jest wszystko, co osiągalne z korzeni. Cykliczne referencje między nieosiągalnymi obiektami nie przeszkadzają w ich usunięciu — w przeciwieństwie do zliczania referencji. Moment sprzątania nie jest określony.",
    sources: ["jsinfo-garbage-collection", "mdn-memory"],
  },
  {
    question: "Jaki scenariusz typowo powoduje wyciek pamięci w SPA?",
    options: [
      "Handlery na `window` i timery, które nie są usuwane po opuszczeniu strony",
      "Używanie `const` zamiast `let` dla dużych tablic w funkcjach",
      "Częste tworzenie krótkotrwałych obiektów wewnątrz pętli",
    ],
    answer: 0,
    explanation:
      "Subskrypcja trzyma domknięcie, a przez nie dane komponentu i węzły DOM. Inne źródła: odłączone węzły DOM z referencjami z JS, rosnące globalne cache, zapomniane `setInterval`. Krótkotrwałe obiekty są wydajnie sprzątane przez młodą generację GC. Wycieki znajduje się przez Memory snapshots w DevTools.",
    sources: ["mdn-memory", "jsinfo-garbage-collection"],
  },
  {
    question: "Dlaczego zaleca się ostrożność z `WeakRef` i `FinalizationRegistry`?",
    options: [
      "Moment garbage collection jest nieprzewidywalny — logika nie powinna od niego zależeć",
      "Działają tylko w Node.js i nie są dostępne w silnikach przeglądarek",
      "Spowalniają dostęp do wszystkich obiektów aplikacji dziesiątki razy",
    ],
    answer: 0,
    explanation:
      "Obiekt za `WeakRef` może zniknąć w dowolnej chwili lub żyć dłużej niż oczekiwano, a callback finalizacji może nigdy nie zostać wywołany. Nadają się do cache i jako zabezpieczenie, ale nie do obowiązkowego zwalniania zasobów.",
    sources: ["mdn-weakref", "mdn-memory"],
  },
  {
    question: "Czego nie ma kod wewnątrz Web Workera?",
    options: [
      "Dostępu do DOM; komunikuje się z głównym wątkiem przez `postMessage`",
      "Dostępu do `fetch` i timerów — dozwolone są tylko obliczenia",
      "Możliwości importowania modułów — worker to zawsze jeden plik",
    ],
    answer: 0,
    explanation:
      "Worker działa w osobnym wątku, więc ciężkie obliczenia nie blokują UI. Dostępne są `fetch`, timery, IndexedDB i moduły (`type: 'module'`). Dane przekazuje się przez kopiowanie (structured clone) lub przeniesienie własności (`Transferable`, np. `ArrayBuffer`).",
    sources: ["mdn-web-workers"],
  },
  {
    question: "Po co przekazywać `ArrayBuffer` do workera jako transferable: `postMessage(buf, [buf])`?",
    options: [
      "Własność jest przenoszona bez kopiowania; bufor w wątku źródłowym staje się pusty",
      "Bufor staje się współdzielony i oba wątki widzą nawzajem swoje zmiany",
      "Bufor jest kompresowany przed wysłaniem, co zmniejsza zużycie pamięci",
    ],
    answer: 0,
    explanation:
      "Kopiowanie dużych danych jest drogie. Transfer przekazuje pamięć natychmiast, a `byteLength` u nadawcy staje się 0. Prawdziwa pamięć współdzielona to `SharedArrayBuffer` z `Atomics`, ale wymaga izolacji cross-origin (nagłówki COOP/COEP).",
    sources: ["mdn-web-workers", "mdn-structured-clone"],
  },
  {
    question: "Co potrafi Service Worker?",
    options: [
      "Przechwytywać żądania sieciowe strony i odpowiadać z cache, działając offline",
      "Szybciej wykonywać JavaScript strony, kompilując go do WebAssembly",
      "Mieć dostęp do DOM wszystkich otwartych kart tej samej strony",
    ],
    answer: 0,
    explanation:
      "Service Worker to proxy między stroną a siecią z własnym cyklem życia (`install`, `activate`, `fetch`). Na nim budowane są PWA: strategie cache (cache-first, network-first, stale-while-revalidate), powiadomienia push, synchronizacja w tle. Działa tylko przez HTTPS i nie widzi DOM.",
    sources: ["mdn-service-worker"],
  },
  {
    question: "Czym Server-Sent Events różnią się od WebSocket?",
    options: [
      "SSE to jednokierunkowy strumień z serwera przez HTTP, WebSocket — kanał dwukierunkowy",
      "SSE to kanał dwukierunkowy, a WebSocket tylko wysyła dane z serwera",
      "SSE działa tylko w Node.js, WebSocket tylko w przeglądarce",
    ],
    answer: 0,
    explanation:
      "SSE (`EventSource`) jest prostsze: zwykły HTTP, automatyczne ponowne łączenie, zdarzenia tekstowe — wystarczy do powiadomień i strumieniowania odpowiedzi. WebSocket jest potrzebny do częstej dwukierunkowej wymiany (czaty, gry, wspólna edycja) i obsługuje dane binarne.",
    sources: ["mdn-sse", "mdn-websockets"],
  },
  {
    question: "Co trzeba sprawdzić w handlerze `message` przy komunikacji z iframe'em przez `postMessage`?",
    options: [
      "`event.origin` — że wiadomość przyszła z oczekiwanej domeny",
      "`event.timeStamp` — że wiadomość nie jest starsza niż sekunda",
      "Nic: przeglądarka dostarcza wiadomości tylko z twojej domeny",
    ],
    answer: 0,
    explanation:
      "`postMessage` działa między originami i każde okno może wysłać wiadomość. Bez sprawdzenia `origin` atakujący może wysyłać podrobione polecenia. Przy wysyłaniu podawaj konkretny `targetOrigin` zamiast `'*'`. Między kartami tej samej strony wygodny jest `BroadcastChannel`.",
    sources: ["mdn-post-message", "mdn-broadcast-channel"],
  },
  {
    question: "Jak zaimplementować wzorzec obserwatora na API przeglądarki, bez bibliotek?",
    options: [
      "Przez `EventTarget` i `CustomEvent`: `dispatchEvent` i `addEventListener`",
      "Przez `MutationObserver` subskrybujący zmiany obiektu JS",
      "Przez `Object.observe`, wbudowane w nowoczesne przeglądarki",
    ],
    answer: 0,
    explanation:
      "Można rozszerzyć klasę `EventTarget` i wysyłać `new CustomEvent('change', { detail })`. Inne wbudowane obserwatory: `MutationObserver` (zmiany DOM), `IntersectionObserver`, `ResizeObserver`. `Object.observe` został usunięty ze standardu.",
    sources: ["mdn-custom-events", "patterns-dev-js"],
  },
  {
    question: "Dlaczego `ResizeObserver` jest lepszy niż handler `window.resize` dla komponentu?",
    options: [
      "Zgłasza zmiany rozmiaru konkretnego elementu z dowolnej przyczyny",
      "Wyzwala się częściej i dokładniej, przy każdym pikselu zmiany okna",
      "Pozwala zmienić rozmiar elementu bez przeliczania layoutu",
    ],
    answer: 0,
    explanation:
      "Element może zmienić rozmiar bez zmiany okna: otworzył się sidebar, załadowała się treść. `ResizeObserver` śledzi sam element i jest wywoływany w cyklu renderowania, bez odpytywania `getBoundingClientRect`. Przydatny dla wykresów i wirtualizowanych list.",
    sources: ["mdn-resize-observer"],
  },
  {
    question: "Co robi tagged template?",
    code: "const q = sql`SELECT * FROM users WHERE id = ${id}`;",
    options: [
      "Wywołuje funkcję `sql` z tablicą części stringa i podstawionymi wartościami",
      "Kompiluje string do gotowego zapytania SQL podczas budowania",
      "Escapuje wszystkie znaki stringa do bezpiecznego wstawienia w HTML",
    ],
    answer: 0,
    explanation:
      "Funkcja-tag dostaje `strings` i wartości osobno, więc może bezpiecznie escapować podstawienia lub przekazać je jako parametry zapytania — ochrona przed wstrzyknięciami. Tak działają styled-components, tagi `graphql` i `String.raw`.",
    sources: ["mdn-tagged-templates"],
  },
  {
    question: "W jakiej kolejności `Object.keys` zwróci klucze `{ b: 1, 2: 1, a: 1, 1: 1 }`?",
    options: ["`['1', '2', 'b', 'a']`", "`['b', '2', 'a', '1']`", "`['a', 'b', '1', '2']`"],
    answer: 0,
    explanation:
      "Najpierw idą klucze całkowite rosnąco, potem klucze-stringi w kolejności dodania, potem symbole (których `Object.keys` nie zwraca). Jeśli kolejność kluczy liczbowych jest ważna, użyj `Map`.",
    sources: ["jsinfo-object", "jsinfo-map-set"],
  },
  {
    question: "Jak głęboko zamrozić obiekt?",
    code: `function deepFreeze(obj) {
  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") deepFreeze(value);
  }
  return Object.freeze(obj);
}`,
    options: [
      "Rekurencyjnie zamrozić zagnieżdżone obiekty, a potem sam obiekt",
      "Wywołać `Object.freeze(obj, { deep: true })`",
      "Użyć `Object.seal`, które działa aż do samego dna",
    ],
    answer: 0,
    explanation:
      "`Object.freeze` jest płytki, a `Object.seal` tylko zabrania dodawania i usuwania właściwości. Rekurencja przechodzi po drzewie; przy cyklicznych referencjach trzymaj odwiedzone obiekty w `WeakSet`. `freeze` nie ma opcji `deep`.",
    sources: ["mdn-object-freeze", "jsinfo-property-descriptors"],
  },
  {
    question: "Jak zserializować do JSON obiekt z cyklicznymi referencjami?",
    options: [
      "Przez `replacer` w `JSON.stringify`, śledząc odwiedzone obiekty w `WeakSet`",
      "Zwykły `JSON.stringify` sobie poradzi: zastępuje cykle przez `null`",
      "Takiego obiektu nie da się zserializować w żaden sposób",
    ],
    answer: 0,
    explanation:
      "`JSON.stringify` rzuca `TypeError: Converting circular structure to JSON`. W `replacer` można pomijać już widziane obiekty lub zastępować je referencją-markerem (jak robią biblioteki typu flatted). Do kopiowania wewnątrz JS działa `structuredClone` — obsługuje cykle.",
    sources: ["jsinfo-json", "jsinfo-weakmap"],
  },
  {
    question: "Jak ograniczyć liczbę równoczesnych żądań przy ładowaniu 100 URL-i?",
    options: [
      "Pula: N „workerów” pobiera URL-e ze wspólnej kolejki, aż się opróżni",
      "`Promise.all` sam ogranicza współbieżność do sześciu żądań",
      "Uruchomić żądania przez `setTimeout` z opóźnieniem 0",
    ],
    answer: 0,
    explanation:
      "`Promise.all` uruchamia wszystko naraz i nie ma limitu (limit połączeń przeglądarki dotyczy sieci, a nie pamięci czy serwera). Pula N funkcji async pobierających zadania z kolejki utrzymuje dokładnie N żądań w locie. Gotowe implementacje: `p-limit` i podobne.",
    sources: ["mdn-promise-all", "jsinfo-async-await"],
  },
  {
    question: "Czym jest exponential backoff przy ponawianiu żądań?",
    options: [
      "Zwiększaniem przerwy między próbami (1s, 2s, 4s…), często z losowym jitterem",
      "Ponawianiem żądania w stałym odstępie aż do pierwszego sukcesu",
      "Wysyłaniem kilku kopii żądania naraz do różnych serwerów",
    ],
    answer: 0,
    explanation:
      "Rosnące opóźnienie zmniejsza obciążenie przeciążonego serwera, a jitter (losowy dodatek) sprawia, że klienci nie ponawiają synchronicznie. Ponawiaj tylko operacje idempotentne i błędy przejściowe (5xx, sieć), a nie 4xx.",
    sources: ["jsinfo-async-await", "jsinfo-settimeout"],
  },
  {
    question: "Dlaczego w implementacji debounce ważne jest zachowanie `this` i argumentów?",
    code: `function debounce(fn, ms) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), ms);
  };
}`,
    options: [
      "Inaczej opakowana metoda straci kontekst obiektu i parametry wywołania",
      "Inaczej poprzedniego timera nie da się wyczyścić przez `clearTimeout`",
      "Inaczej funkcja wykona się synchronicznie, bez opóźnienia `ms`",
    ],
    answer: 0,
    explanation:
      "Opakowanie musi być przezroczyste: wywołanie `obj.save(data)` przez debounce musi dotrzeć do `fn` z tym samym `this` i argumentami. Dlatego zwracana jest zwykła funkcja (ma własne `this`), a wewnątrz timera strzałka je zachowuje.",
    sources: ["jsinfo-call-apply", "jsinfo-closure"],
  },
  {
    question: "Dlaczego dodawanie właściwości do obiektów w różnej kolejności może spowolnić kod w V8?",
    options: [
      "Obiekty dostają różne ukryte klasy i gorzej się optymalizują",
      "V8 sortuje właściwości alfabetycznie przy każdym dostępie do obiektu",
      "Kolejność właściwości w ogóle nie wpływa na wydajność silnika",
    ],
    answer: 0,
    explanation:
      "Silnik optymalizuje dostęp do właściwości według „kształtu” obiektu (hidden class / shape). Jeśli obiekty jednego typu są tworzone z różną kolejnością lub zestawem pól, miejsce wywołania widzi wiele kształtów i traci szybką ścieżkę. Inicjalizuj wszystkie pola od razu w konstruktorze i nie usuwaj ich przez `delete`.",
    sources: ["mdn-memory", "javascript-info-en"],
  },
  {
    question: "Jak nie blokować UI przy przetwarzaniu 100 000 elementów w głównym wątku?",
    options: [
      "Podzielić pracę na porcje i oddawać wątek (lub przenieść ją do workera)",
      "Opakować pętlę w funkcję `async` — wykona się w wątku w tle",
      "Użyć `Promise.all` — promise'y działają w równoległych wątkach",
    ],
    answer: 0,
    explanation:
      "Zadania dłuższe niż 50 ms szkodzą responsywności (INP). `async` nie tworzy nowego wątku: synchroniczna pętla w środku nadal blokuje. Potnij pracę na kawałki i oddawaj wątek przez `setTimeout`, `scheduler.yield()` (gdzie jest obsługiwane) lub `requestIdleCallback`; ciężkie obliczenia przenieś do Web Workera.",
    sources: ["webdev-inp", "mdn-web-workers"],
  },
  {
    question: "Dlaczego `performance.now()` jest lepsze niż `Date.now()` do mierzenia czasu wykonania?",
    options: [
      "To precyzyjny monotoniczny timer niezależny od zegara systemowego",
      "Zwraca dokładny czas serwera, a nie zegar użytkownika",
      "Działa poza event loop i obciążenie nie może go spowolnić",
    ],
    answer: 0,
    explanation:
      "`Date.now()` to milisekundy według zegara systemowego, który może się przesuwać (synchronizacja, zmiana czasu). `performance.now()` liczy od początku nawigacji z ułamkami milisekund. Do znaczników w DevTools są `performance.mark()` i `measure()`.",
    sources: ["mdn-performance-api"],
  },
  {
    question: "Co zwraca `new Date(2025, 1, 1).getMonth()` i który to miesiąc?",
    options: ["`1` — luty", "`1` — styczeń", "`2` — luty"],
    answer: 0,
    explanation:
      "Miesiące w `Date` liczone są od zera, a dni od jedynki. To częste źródło błędów obok stref czasowych i mutowalności `Date`. Do formatowania używaj `Intl.DateTimeFormat`; `Date` zastępuje API `Temporal`.",
    sources: ["mdn-intl", "mdn-js-guide"],
  },
  {
    question: "Co się stanie przy `10n + 1`?",
    options: [
      "`TypeError`: nie można mieszać `BigInt` i `Number` w arytmetyce",
      "Wynik to `11n`: liczba jest automatycznie konwertowana na `BigInt`",
      "Wynik to `11`: `BigInt` automatycznie staje się liczbą",
    ],
    answer: 0,
    explanation:
      "Niejawne mieszanie jest zabronione, aby nie tracić precyzji. Bądź jawny: `10n + BigInt(1)` lub `Number(10n) + 1`. `BigInt` jest potrzebny dla liczb całkowitych większych niż `Number.MAX_SAFE_INTEGER` (2^53 − 1): identyfikatorów, kryptografii. `JSON.stringify` go nie obsługuje.",
    sources: ["mdn-bigint", "jsinfo-number"],
  },
  {
    question: "Dlaczego `9007199254740993 === 9007199254740992` zwraca `true`?",
    options: [
      "Liczb powyżej `MAX_SAFE_INTEGER` nie da się przedstawić dokładnie",
      "To błąd silnika V8, który ujawnia się tylko w Chrome",
      "Ostatnia cyfra długiego literału liczbowego jest odrzucana",
    ],
    answer: 0,
    explanation:
      "Double ma 53-bitową mantysę, więc nie wszystkie liczby całkowite powyżej 2^53 da się przedstawić. Duże identyfikatory z API (np. 64-bitowe) przychodzą w JSON jako stringi lub są obsługiwane przez `BigInt`, inaczej po cichu się psują. Sprawdza się to przez `Number.isSafeInteger`.",
    sources: ["jsinfo-number", "mdn-bigint"],
  },
  {
    question: "Czym jest ReDoS?",
    options: [
      "Odmową usługi wywołaną przez „ciężkie” wyrażenie regularne",
      "Atakiem, w którym serwer przekierowuje żądania na obcą domenę",
      "Ponownym wysłaniem formularza przy przeładowaniu strony przez przeglądarkę",
    ],
    answer: 0,
    explanation:
      "Wyrażenia typu `/^(a+)+$/` na specjalnie spreparowanym stringu działają w czasie wykładniczym i blokują wątek (szczególnie groźne na serwerze Node.js). Unikaj zagnieżdżonych kwantyfikatorów, ograniczaj długość wejścia, używaj bezpiecznych silników.",
    sources: ["mdn-regexp"],
  },
  {
    question: "Co jest niebezpiecznego w funkcji deep merge zastosowanej do JSON od użytkownika?",
    code: `merge({}, JSON.parse('{"__proto__": {"isAdmin": true}}'));`,
    options: [
      "Prototype pollution: właściwość trafia do `Object.prototype`",
      "Przepełnia stos przy dowolnych zagnieżdżonych danych JSON",
      "Nic: `JSON.parse` automatycznie usuwa niebezpieczne klucze wewnętrzne",
    ],
    answer: 0,
    explanation:
      "Naiwny merge wykona `target.__proto__.isAdmin = true`, a `({}).isAdmin` stanie się `true` w całej aplikacji. Ochrona: pomijać `__proto__`, `constructor`, `prototype`, używać `Object.create(null)` lub `Map` jako słowników, walidować wejście schematem.",
    sources: ["jsinfo-prototype", "mdn-prototype-chain"],
  },
  {
    question: "Dlaczego `eval` i `new Function` są zwykle zakazane polityką bezpieczeństwa?",
    options: [
      "Wykonują stringi jako kod — droga do XSS",
      "Działają tylko w trybie ścisłym i psują stare przeglądarki",
      "Zostały usunięte w ECMAScript 2020 i nie są obsługiwane",
    ],
    answer: 0,
    explanation:
      "Jeśli do stringa trafią dane użytkownika, atakujący uruchomi własny kod. CSP domyślnie blokuje takie wywołania. Ponadto `eval` utrudnia optymalizacje silnika. Prawie zawsze jest alternatywa: `JSON.parse`, tablica funkcji, `Function` z kodem znanym w czasie budowania.",
    sources: ["mdn-csp", "mdn-strict-mode"],
  },
  {
    question: "Co może się stać przy cyklicznej zależności między modułami ES?",
    code: `// a.js
import { b } from "./b.js";
export const a = "A" + b;
// b.js
import { a } from "./a.js";
export const b = "B" + a;`,
    options: [
      "`ReferenceError`: dostęp do `const` przed inicjalizacją",
      "Bundler automatycznie połączy moduły w jeden i wszystko zadziała",
      "Obie wartości staną się `undefined`, ale błędu nie będzie",
    ],
    answer: 0,
    explanation:
      "Moduły wykonują się w kolejności grafu; przy cyklu jeden z nich zaczyna działać, gdy eksport drugiego jest jeszcze w TDZ. Z `var` dostalibyśmy `undefined`; z `const`/`let`/klasami — błąd. Rozwiązanie: wynieść wspólny kod do trzeciego modułu lub odwoływać się do importu leniwie wewnątrz funkcji.",
    sources: ["mdn-modules", "mdn-let"],
  },
  {
    question: "Jak `await` najwyższego poziomu w module wpływa na moduły, które go importują?",
    options: [
      "Ich wykonanie czeka, aż moduł z `await` zakończy inicjalizację",
      "Nie wpływa: moduły importujące dostają promise zamiast eksportu",
      "`await` najwyższego poziomu jest zabroniony w modułach, dozwolony tylko w skryptach",
    ],
    answer: 0,
    explanation:
      "Moduł z `await` najwyższego poziomu staje się asynchronicznym węzłem grafu, a zależne moduły wykonują się po nim. Wygodne do ładowania konfiguracji, ale wolny `await` opóźnia całą gałąź aplikacji.",
    sources: ["mdn-modules", "jsinfo-async-await"],
  },
  {
    question: "Co daje `Promise.withResolvers()` (ES2024)?",
    options: [
      "Zwraca `{ promise, resolve, reject }` do sterowania z zewnątrz",
      "Tworzy promise, którego nie da się w żaden sposób odrzucić",
      "Automatycznie anuluje promise po zadanym timeoucie",
    ],
    answer: 0,
    explanation:
      "Wcześniej pisało się do tego „deferred”: deklarowało zmienne i przypisywało `resolve`/`reject` wewnątrz konstruktora. Wygodne, gdy promise jest rozstrzygany z innego miejsca — np. z handlera zdarzenia lub kolejki.",
    sources: ["mdn-promise"],
  },
  {
    question: "Co zwraca `new Set([1, 2, 3]).intersection(new Set([2, 3, 4]))`?",
    options: ["`Set {2, 3}`", "`Set {1, 2, 3, 4}`", "`TypeError`: nie ma takiej metody"],
    answer: 0,
    explanation:
      "Od 2024 roku `Set` ma metody teorii zbiorów: `union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf` i inne. Wcześniej pisało się to ręcznie przez `filter`. Przed użyciem w produkcji sprawdź obsługę w docelowych przeglądarkach.",
    sources: ["jsinfo-map-set"],
  },
  {
    question: "Co robi `Object.groupBy(users, u => u.role)`?",
    options: [
      "Zwraca obiekt: klucz — rola, wartość — tablica użytkowników",
      "Sortuje oryginalną tablicę użytkowników według pola `role`",
      "Usuwa z tablicy użytkowników z powtarzającymi się rolami",
    ],
    answer: 0,
    explanation:
      "`Object.groupBy` (ES2024) zastępuje typowy `reduce` do grupowania. Wynikiem jest obiekt z prototypem `null`. Jeśli klucze nie są stringami, użyj `Map.groupBy`.",
    sources: ["mdn-object-groupby"],
  },
  {
    question: "Do czego przydaje się `MutationObserver`?",
    options: [
      "Asynchronicznie zgłasza zmiany DOM: dzieci, atrybuty, tekst",
      "Śledzi zmiany właściwości zwykłych obiektów JS",
      "Przechwytuje zmiany `localStorage` w innych kartach",
    ],
    answer: 0,
    explanation:
      "Na przykład do reagowania na markup wstawiony przez zewnętrzny widżet lub implementacji autozapisu dla `contenteditable`. Rekordy zmian przychodzą paczką jako mikrozadanie. Dla obiektów JS użyj `Proxy`; dla `localStorage` — zdarzenia `storage`.",
    sources: ["mdn-mutation-observer"],
  },
  {
    question: "Gdzie przechowywać duże ustrukturyzowane dane po stronie klienta (np. cache offline)?",
    options: [
      "W IndexedDB — asynchronicznej bazie z indeksami i dużym limitem",
      "W `localStorage` — jest synchroniczny i przechowuje obiekty bezpośrednio",
      "W ciasteczkach — synchronizują się z serwerem automatycznie",
    ],
    answer: 0,
    explanation:
      "`localStorage` jest ograniczony do kilku megabajtów, przechowuje tylko stringi i blokuje wątek. Ciasteczka są małe (~4 KB) i wysyłane z każdym żądaniem. IndexedDB przechowuje obiekty i `Blob`-y oraz obsługuje transakcje i indeksy; łatwiej z niej korzystać przez nakładki typu `idb`.",
    sources: ["mdn-indexeddb", "mdn-web-storage"],
  },
  {
    question: "Jak synchronizować dane między kartami tej samej strony?",
    options: [
      "Przez `BroadcastChannel` lub zdarzenie `storage`",
      "Przez `window.opener`, które mają wszystkie karty tej samej strony",
      "Przez `sessionStorage` — jest wspólny dla wszystkich kart tej samej strony",
    ],
    answer: 0,
    explanation:
      "`BroadcastChannel('app')` dostarcza wiadomości do wszystkich kontekstów tego samego originu (karty, iframe'y, workery). Zdarzenie `storage` wyzwala się w innych kartach przy zapisie do `localStorage`. `sessionStorage` jest izolowany per karta.",
    sources: ["mdn-broadcast-channel", "mdn-web-storage"],
  },
  {
    question: "Po co cache'ować instancje `Intl.NumberFormat`?",
    options: [
      "Utworzenie formatera jest drogie, a jego wywołanie tanie",
      "Bez cache formater zwraca różne wyniki dla tych samych danych",
      "Formater dla każdej lokalizacji można utworzyć tylko raz na sesję",
    ],
    answer: 0,
    explanation:
      "Konstruktory `Intl` ładują dane lokalizacji i parsują opcje. Wywołanie `toLocaleString()` w pętli po tysiącach wierszy za każdym razem tworzy formater. Lepiej raz utworzyć `new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })` i wywoływać `format`.",
    sources: ["mdn-intl"],
  },
  {
    question: "Jak poprawnie zbudować query string z obiektu parametrów?",
    options: [
      "Przez `new URLSearchParams(params).toString()`",
      "Ręcznie sklejać stringi: `'?q=' + q + '&page=' + page`",
      "Przez `JSON.stringify(params)`, przekazując wynik jako query",
    ],
    answer: 0,
    explanation:
      "`URLSearchParams` poprawnie koduje spacje, znaki spoza ASCII i znaki specjalne typu `&`, które przy ręcznym sklejaniu zepsułyby żądanie lub pozwoliły podmienić parametry. Obiekt `URL` pozwala pracować z całym adresem: `url.searchParams.set('page', 2)`.",
    sources: ["mdn-url"],
  },
  {
    question: "Co zwróci wyrażenie?",
    code: `const obj = {
  [Symbol.toPrimitive](hint) {
    return hint === "number" ? 42 : "obj";
  },
};
console.log(+obj, \`\${obj}\`);`,
    options: ["`42 obj`", "`NaN [object Object]`", "`42 42`"],
    answer: 0,
    explanation:
      "Przy konwersji na prymityw silnik wywołuje `Symbol.toPrimitive` z podpowiedzią `'number'`, `'string'` lub `'default'`. Bez niego używane są `valueOf` i `toString`. Tak działa np. odejmowanie dat: `date2 - date1`.",
    sources: ["jsinfo-symbol", "jsinfo-type-conversions"],
  },
  {
    question: "Co zwraca `[1, 2, 3, 4].findLast(n => n % 2 === 1)`?",
    options: ["`3`", "`1`", "`[1, 3]`"],
    answer: 0,
    explanation:
      "`findLast` i `findLastIndex` (ES2023) szukają od końca tablicy — bez `reverse`, które mutuje tablicę. Dla wielu dopasowań użyj `filter`.",
    sources: ["jsinfo-array-methods"],
  },
  {
    question: "Po co przekazywać opcję `cause` do `Error`?",
    code: `try { await save(); }
catch (err) { throw new Error("Failed to save the order", { cause: err }); }`,
    options: [
      "Aby zachować oryginalny błąd i nie stracić pierwotnej przyczyny",
      "Aby automatycznie wysłać błąd do systemu monitoringu",
      "Aby zatrzymać propagację błędu dalej w górę stosu wywołań",
    ],
    answer: 0,
    explanation:
      "Opakowywanie błędów dodaje kontekst na poziomie aplikacji, a `cause` zachowuje błąd niskiego poziomu z jego stosem. DevTools i wiele systemów monitoringu pokazują cały łańcuch przyczyn.",
    sources: ["mdn-error-cause", "jsinfo-try-catch"],
  },
  {
    question: "Czym jest Temporal Dead Zone dla parametrów domyślnych?",
    code: `function f(a = b, b = 1) { return a; }
f();`,
    options: [
      "`ReferenceError`: parametr `b` nie jest jeszcze zainicjalizowany przy obliczaniu `a`",
      "Zwraca `1`: parametry domyślne są obliczane w dowolnej kolejności",
      "Zwraca `undefined`: `b` jest hoistowany z wartością `undefined`",
    ],
    answer: 0,
    explanation:
      "Parametry są inicjalizowane od lewej do prawej i zachowują się jak `let`: dostęp do jeszcze niezainicjalizowanego parametru to błąd TDZ. W odwrotnej kolejności (`a = 1, b = a`) działa. Wartości domyślne są obliczane przy każdym wywołaniu, a nie raz.",
    sources: ["mdn-let", "jsinfo-function-expressions"],
  },
  {
    question: "Do czego przydaje się `globalThis`?",
    options: [
      "Do jednolitego dostępu do obiektu globalnego w dowolnym środowisku",
      "To nowa nazwa `window`, działająca tylko w przeglądarce",
      "Tworzy izolowany zakres globalny dla każdego modułu",
    ],
    answer: 0,
    explanation:
      "W przeglądarce obiekt globalny to `window`, w workerach `self`, w Node.js `global`. `globalThis` działa wszędzie, co jest ważne dla uniwersalnego (izomorficznego) kodu i bibliotek.",
    sources: ["mdn-js-guide"],
  },
  {
    question: "Dlaczego nie należy przekazywać funkcji `async` jako executora w `new Promise(async (resolve) => ...)`?",
    options: [
      "Błąd po `await` nie odrzuci promise'a — zawiśnie on",
      "Konstruktor `Promise` rzuca `TypeError` dla każdej funkcji async",
      "To działa, ale executor i promise wykonują się dwukrotnie",
    ],
    answer: 0,
    explanation:
      "Konstruktor ignoruje promise zwrócony przez asynchroniczny executor, więc wyjątek po `await` staje się nieobsłużonym odrzuceniem, a zewnętrzny promise zostaje `pending`. Jeśli w środku już jest `await`, opakowanie `new Promise` zwykle w ogóle nie jest potrzebne — wystarczy funkcja async.",
    sources: ["jsinfo-promise", "jsinfo-async-await"],
  },
];

export default questions;
