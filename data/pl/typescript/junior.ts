import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Czym jest TypeScript?",
    options: [
      "Nadzbiorem JavaScriptu ze statycznym typowaniem, kompilowanym do JS",
      "Osobnym językiem z własnym runtime, który przeglądarki wykonują bezpośrednio",
      "Biblioteką do sprawdzania typów podczas działania kodu JavaScript",
    ],
    answer: 0,
    explanation:
      "Każdy poprawny JS jest prawie zawsze poprawnym TS. Typy są sprawdzane podczas kompilacji, a potem usuwane: w runtime działa zwykły JavaScript i nie ma tam sprawdzania typów. Dlatego dane zewnętrzne (API, formularze) nadal waliduje się w runtime — np. przez Zod.",
    sources: ["ts-ts-for-js", "ts-handbook"],
  },
  {
    question: "Czy TypeScript sprawdza typy podczas działania programu?",
    options: [
      "Nie: typy są usuwane podczas kompilacji; w runtime działa zwykły JS",
      "Tak: kompilator wstawia sprawdzenia przed każdym wywołaniem funkcji",
      "Tak, ale tylko dla klas i interfejsów z modyfikatorem `strict`",
    ],
    answer: 0,
    explanation:
      "TypeScript to narzędzie czasu programowania. Jeśli API zwróci `null` zamiast obiektu, typy cię nie uratują. Do sprawdzeń w runtime używa się `typeof`/`instanceof` i bibliotek schematów (Zod, Valibot), z których można też wyprowadzić typy TS.",
    sources: ["ts-ts-for-js"],
  },
  {
    question: "Czym `unknown` różni się od `any`?",
    options: [
      "Z `unknown` nic nie zrobisz bez zawężenia, a `any` wyłącza sprawdzanie",
      "`unknown` można przypisać do dowolnej zmiennej, a `any` tylko do `object`",
      "To synonimy; `unknown` to po prostu nowsza nazwa `any`",
    ],
    answer: 0,
    explanation:
      "`any` wyłącza typowanie i „zaraża” wszystko, czego dotknie. `unknown` to bezpieczny odpowiednik: wartość może być czymkolwiek, ale użyć jej można dopiero po sprawdzeniu (`typeof x === 'string'`). Dla danych z `JSON.parse` i `catch (e)` właściwym wyborem jest `unknown`.",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Co oznacza typ `never`?",
    options: [
      "Typ wartości, która nie może istnieć: funkcja nigdy nie zwraca sterowania",
      "To samo co `void`: funkcja niczego nie zwraca i kończy się normalnie",
      "To samo co `null`: wartości nie ma, ale zmienna istnieje",
    ],
    answer: 0,
    explanation:
      "`never` to typ pusty. Zwracają go funkcje, które zawsze rzucają błąd lub działają w nieskończoność. Pojawia się też, gdy unia jest w pełni zawężona — na tym opierają się wyczerpujące sprawdzenia w `switch`. `void` oznacza, że funkcja się kończy, ale jej wynik nie jest używany.",
    sources: ["ts-functions", "ts-narrowing"],
  },
  {
    question: "Jaki typ TypeScript wywnioskuje dla `let x = 5;`?",
    options: ["`number`", "`5` (typ literalny)", "`any` (brak adnotacji)"],
    answer: 0,
    explanation:
      "Wnioskowanie typów: dla `let` literał rozszerza się do `number`, bo zmienną można ponownie przypisać. Dla `const x = 5` typem jest literał `5`. Jawne adnotacje są potrzebne tam, gdzie wnioskowanie jest niemożliwe lub nieprecyzyjne — np. w parametrach funkcji.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Jaka jest różnica między `interface` a `type` przy opisie obiektu?",
    options: [
      "Oba działają; `interface` można rozszerzać przez łączenie, a `type` wyraża unie i nie tylko",
      "`interface` działa tylko z klasami, a `type` tylko z typami prymitywnymi",
      "`type` jest przestarzały i w ogóle niezalecany w nowych projektach",
    ],
    answer: 0,
    explanation:
      "Dla obiektów są prawie wymienne. Różnice: interfejsy o tej samej nazwie się łączą (declaration merging) i rozszerza się je przez `extends`. Aliasy typów opisują unie, krotki, prymitywy, typy warunkowe i mapowane. Wiele zespołów używa `interface` dla obiektów i `type` dla wszystkiego innego.",
    sources: ["ts-everyday-types", "ts-objects"],
  },
  {
    question: "Jak zadeklarować opcjonalną właściwość obiektu?",
    options: [
      "`{ name?: string }`",
      "`{ name: optional string }`",
      "`{ ?name: string }`",
    ],
    answer: 0,
    explanation:
      "`?` po nazwie czyni właściwość opcjonalną: jej typ to `string | undefined`, a sam klucz może nie istnieć. Z flagą `exactOptionalPropertyTypes` jawne przypisanie `undefined` jest odróżniane od braku klucza.",
    sources: ["ts-objects"],
  },
  {
    question: "Co robi modyfikator `readonly` w `{ readonly id: number }`?",
    options: [
      "Zabrania ponownego przypisania właściwości na poziomie typów; w runtime nic się nie zmienia",
      "Czyni obiekt głęboko niezmiennym przez `Object.freeze` w runtime",
      "Czyni właściwość prywatną i niedostępną poza klasą",
    ],
    answer: 0,
    explanation:
      "`readonly` to tylko sprawdzenie kompilatora: `obj.id = 2` powoduje błąd. Jest płytkie — zagnieżdżone obiekty można zmieniać. W runtime obiekt jest zwyczajny. Dla tablic jest `readonly string[]` / `ReadonlyArray<string>`, a głębokie zamrożenie robi się przez `as const` lub `Object.freeze`.",
    sources: ["ts-objects"],
  },
  {
    question: "Co oznacza typ `string | number`?",
    options: [
      "Wartość może być stringiem lub liczbą (unia)",
      "Wartość jest jednocześnie stringiem i liczbą (przecięcie)",
      "String zawierający tylko cyfry",
    ],
    answer: 0,
    explanation:
      "Typ unii dopuszcza dowolny ze swoich członów. Dopóki typ nie zostanie zawężony, dostępne są tylko operacje wspólne dla wszystkich członów. Przecięcie zapisuje się przez `&` i wymaga zgodności ze wszystkimi typami naraz (`A & B`).",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Co daje przecięcie `type Admin = User & { role: 'admin' }`?",
    options: [
      "Typ ze wszystkimi właściwościami `User` plus `role: 'admin'`",
      "Typ tylko z właściwościami wspólnymi dla `User` i obiektu z `role`",
      "Typ, który może być albo `User`, albo `{ role: 'admin' }`",
    ],
    answer: 0,
    explanation:
      "Przecięcie łączy wymagania: wartość musi spełniać oba typy. To sposób komponowania typów, podobny do `interface Admin extends User`. Konfliktujące właściwości dają `never` dla tej właściwości.",
    sources: ["ts-objects"],
  },
  {
    question: "Czym jest typ literalny `'left' | 'right'`?",
    options: [
      "Typem, który dopuszcza tylko stringi `'left'` lub `'right'`",
      "Dowolnym stringiem zaczynającym się od `left` lub `right`",
      "Enumem z wartościami liczbowymi 0 i 1",
    ],
    answer: 0,
    explanation:
      "Typy literalne zawężają wartość do konkretnych stałych. Unia literałów to częsta alternatywa dla enumów: `type Direction = 'left' | 'right'`. Kompilator wyłapie literówkę `'lft'`, a IDE podpowie opcje.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Jak otypować funkcję, która przyjmuje string i zwraca liczbę?",
    options: [
      "`(s: string) => number`",
      "`(string) => number`",
      "`function(s): string -> number`",
    ],
    answer: 0,
    explanation:
      "W typie funkcji nazwy parametrów są obowiązkowe: `(s: string) => number`. `(string) => number` oznacza parametr o nazwie `string` typu `any`. Deklaracja funkcji: `function len(s: string): number { ... }`.",
    sources: ["ts-functions"],
  },
  {
    question: "Jak zadeklarować opcjonalny parametr funkcji?",
    options: [
      "`function greet(name?: string)`",
      "`function greet(optional name: string)`",
      "`function greet(name: string = ?)`",
    ],
    answer: 0,
    explanation:
      "`?` czyni parametr opcjonalnym; jego typ to `string | undefined`. Alternatywą jest wartość domyślna: `greet(name = 'Guest')`, wtedy typ jest wnioskowany jako `string`. Parametry opcjonalne muszą być po wymaganych.",
    sources: ["ts-functions"],
  },
  {
    question: "Czym jest krotka (tuple) w TypeScript?",
    options: [
      "Tablicą o stałej długości ze znanym typem każdego elementu",
      "Tablicą dowolnej długości, w której wszystkie elementy mają ten sam typ",
      "Niezmiennym obiektem z kluczami liczbowymi zamiast nazw właściwości",
    ],
    answer: 0,
    explanation:
      "`type Point = [number, number]` — dokładnie dwie liczby. Krotki są wygodne do zwracania kilku wartości, jak w `useState`: `[value, setter]`. Elementy można nazwać (`[x: number, y: number]`) i uczynić opcjonalnymi (`[string, number?]`).",
    sources: ["ts-objects"],
  },
  {
    question: "Jak otypować tablicę stringów?",
    options: ["`string[]` lub `Array<string>`", "`[string]` lub `Array[string]`", "`array of string` lub `string()`"],
    answer: 0,
    explanation:
      "`string[]` i `Array<string>` są równoważne. `[string]` to krotka jednoelementowa. Dla tablic tylko do odczytu używa się `readonly string[]`.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Czym jest generyk?",
    options: [
      "Parametrem typu, który pozwala pisać kod dla różnych typów, zachowując związek między nimi",
      "Typem `any` używanym do tymczasowego wyłączenia sprawdzania w funkcjach",
      "Klasą bazową, po której dziedziczą wszystkie inne typy i interfejsy",
    ],
    answer: 0,
    explanation:
      "`function first<T>(arr: T[]): T | undefined` — typ wyniku jest powiązany z typem tablicy wejściowej: `first([1, 2])` zwraca `number | undefined`. Z `any` ten związek przepada. Generyki są używane w `Array<T>`, `Promise<T>`, `useState<T>`.",
    sources: ["ts-generics"],
  },
  {
    question: "Co robi typ narzędziowy `Partial<User>`?",
    options: [
      "Czyni wszystkie właściwości `User` opcjonalnymi",
      "Zostawia tylko część właściwości, podanych drugim parametrem",
      "Czyni wszystkie właściwości `User` tylko do odczytu",
    ],
    answer: 0,
    explanation:
      "`Partial<T>` dodaje `?` do każdej właściwości — wygodne dla obiektów aktualizacji: `update(id, patch: Partial<User>)`. Wybór podzbioru to `Pick`, tylko do odczytu — `Readonly`, wszystkie wymagane — `Required`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Czym różnią się `Pick<User, 'id' | 'name'>` i `Omit<User, 'password'>`?",
    options: [
      "`Pick` zostawia wymienione właściwości, `Omit` — wszystko oprócz nich",
      "`Pick` czyni właściwości wymaganymi, `Omit` — opcjonalnymi",
      "To synonimy z inną kolejnością argumentów",
    ],
    answer: 0,
    explanation:
      "Oba tworzą nowy typ z istniejącego. `Pick` to lista dozwolonych kluczy, `Omit` — zabronionych. Na przykład `Omit<User, 'password'>` to typ dla odpowiedzi API bez tajnych pól.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Co opisuje `Record<string, number>`?",
    options: [
      "Obiekt, którego klucze są stringami, a wartości liczbami",
      "Tablicę par `[string, number]` posortowaną według klucza",
      "Kolekcję `Map` ze standardowej biblioteki JavaScript",
    ],
    answer: 0,
    explanation:
      "`Record<K, V>` to obiekt z kluczami `K` i wartościami `V`. Przy kluczach-unii wymaga wszystkich: `Record<'en' | 'uk', string>`. To nie jest `Map`: `Map` to osobna struktura danych z metodami `get`/`set`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Co zwraca `keyof { id: number; name: string }`?",
    options: ["`'id' | 'name'`", "`number | string`", "`['id', 'name']`"],
    answer: 0,
    explanation:
      "`keyof` zwraca unię kluczy typu. Typy wartości pobiera się przez dostęp indeksowany: `T['id']` lub `T[keyof T]`. `keyof` nie istnieje w runtime — tablicę kluczy daje `Object.keys`.",
    sources: ["ts-keyof"],
  },
  {
    question: "Co robi `typeof` w pozycji typu: `type Config = typeof config`?",
    options: [
      "Bierze typ zmiennej `config` wywnioskowany przez kompilator",
      "Zwraca string `'object'`, jak w JavaScript",
      "Sprawdza typ `config` w runtime",
    ],
    answer: 0,
    explanation:
      "W wyrażeniach `typeof` to operator JS zwracający string. W pozycji typu to operator TypeScript wyciągający typ wartości. Wygodne, by uniknąć duplikacji: `const routes = {...} as const; type Routes = typeof routes`.",
    sources: ["ts-typeof"],
  },
  {
    question: "Jak poprawnie otypować propsy komponentu React?",
    options: [
      "`function Button({ label }: { label: string })` lub przez `type Props`",
      "`function Button(props: any)` — React sam typuje propsy",
      "`function Button<label: string>()` — propsy przekazuje się jako generyk",
    ],
    answer: 0,
    explanation:
      "Propsy to zwykły obiekt, typowany interfejsem lub aliasem typu. `React.FC` nie jest wymagany. Dla `children` użyj `React.ReactNode`; do rozszerzenia natywnych atrybutów — `React.ComponentProps<'button'>`.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "Jaki jest typ zdarzenia w `onChange` dla `<input>` w React?",
    options: [
      "`React.ChangeEvent<HTMLInputElement>`",
      "`Event` — natywne zdarzenie DOM",
      "`InputEvent<string>` ze standardowej biblioteki",
    ],
    answer: 0,
    explanation:
      "React używa własnych syntetycznych zdarzeń: `ChangeEvent`, `MouseEvent<HTMLButtonElement>`, `FormEvent<HTMLFormElement>` itd. Generyk określa element, więc `e.target.value` jest otypowane. Jeśli handler jest inline, typ wnioskuje się automatycznie.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "Jak podać typ stanu, jeśli wartość początkowa to `null`: `useState(null)`?",
    options: [
      "`useState<User | null>(null)`",
      "`useState(null as User)`",
      "Nie trzeba go podawać; TS wywnioskuje `User`",
    ],
    answer: 0,
    explanation:
      "Bez generyka typ zostanie wywnioskowany jako `null` i później nie da się przypisać użytkownika. Jawny generyk opisuje wszystkie możliwe stany. Rzutowanie `null as User` okłamuje kompilator: kod będzie wtedy zakładał, że użytkownik zawsze istnieje.",
    sources: ["ts-react-cheatsheet", "ts-generics"],
  },
  {
    question: "Co robi asercja typu `value as string`?",
    options: [
      "Mówi kompilatorowi, by traktował wartość jako string, bez sprawdzania w runtime",
      "Konwertuje wartość na string, jak `String(value)`",
      "Sprawdza w runtime, że wartość jest stringiem, i rzuca błąd w przeciwnym razie",
    ],
    answer: 0,
    explanation:
      "`as` to podpowiedź dla kompilatora, a nie konwersja: jeśli to w rzeczywistości liczba, błąd ujawni się później. Używaj, gdy wiesz więcej niż kompilator (np. typ elementu z `querySelector`), i preferuj zawężanie przez sprawdzenia.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Co robi operator `!` w `user!.name`?",
    options: [
      "Zapewnia, że wartość nie jest `null`/`undefined`, bez sprawdzania w runtime",
      "Logiczną negację `user`, jak operator `!` w JavaScript",
      "Czyni dostęp do właściwości bezpiecznym, jak optional chaining `?.`",
    ],
    answer: 0,
    explanation:
      "Non-null assertion usuwa `null | undefined` z typu. Jeśli wartość jednak będzie `null`, dostaniesz błąd w runtime. Bezpieczniejsze opcje to jawne sprawdzenie lub `user?.name` (optional chaining, zwraca `undefined`).",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Co włącza flaga `strict` w `tsconfig.json`?",
    options: [
      "Zestaw ścisłych sprawdzeń: `strictNullChecks`, `noImplicitAny` i inne",
      "Tryb `'use strict'` w skompilowanym JavaScripcie i nic więcej",
      "Zakaz używania `any` i `as` w jakiejkolwiek formie",
    ],
    answer: 0,
    explanation:
      "`strict: true` włącza rodzinę flag: `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictBindCallApply`, `useUnknownInCatchVariables` i inne. Nowe projekty warto zaczynać ze strict. Nie zabrania jawnego `any` — do tego są reguły lintera.",
    sources: ["ts-strict", "ts-tsconfig"],
  },
  {
    question: "Co daje `strictNullChecks`?",
    options: [
      "`null` i `undefined` stają się osobnymi typami, które trzeba jawnie obsłużyć",
      "Całkowicie zabrania `null` w kodzie, pozwalając tylko na `undefined`",
      "Automatycznie zastępuje `null` przez `undefined` przy kompilacji do JS",
    ],
    answer: 0,
    explanation:
      "Bez flagi `null` można przypisać do czegokolwiek, a błędy „cannot read property of null” nie są wyłapywane. Z nią `string` nie zawiera `null`: piszesz `string | null` i sprawdzasz wartość przed użyciem. To jedna z najbardziej przydatnych flag.",
    sources: ["ts-strict", "ts-everyday-types"],
  },
  {
    question: "Jak zawęzić `string | number` do `string` wewnątrz warunku?",
    options: [
      "`if (typeof value === 'string') { ... }`",
      "`if (value is string) { ... }`",
      "`if (value instanceof String) { ... }`",
    ],
    answer: 0,
    explanation:
      "TypeScript analizuje przepływ sterowania: po sprawdzeniu `typeof` typ wewnątrz gałęzi jest zawężony do `string`, a w `else` do `number`. `instanceof String` sprawdza obiekt-wrapper, a nie prymityw. Składnia `x is T` jest używana w sygnaturze funkcji typu type guard.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Czym `enum Color { Red, Green }` różni się od `type Color = 'red' | 'green'`?",
    options: [
      "`enum` tworzy obiekt w runtime; unia literałów istnieje tylko w typach",
      "Unia literałów tworzy obiekt w runtime; `enum` to tylko typ",
      "Niczym: kompilator generuje dla obu ten sam JavaScript",
    ],
    answer: 0,
    explanation:
      "Zwykły `enum` kompiluje się do obiektu JS (liczbowy — z odwrotnym mapowaniem). Unia stringów nic nie dodaje do paczki i jest zgodna z JSON i API. Wiele zespołów woli unie lub obiekt `as const`. Ponadto enumy są niekompatybilne z trybem `erasableSyntaxOnly`.",
    sources: ["ts-enums"],
  },
  {
    question: "Co robi `as const` w `const roles = ['admin', 'user'] as const`?",
    options: [
      "Czyni tablicę krotką readonly z typami literalnymi `'admin'` i `'user'`",
      "Zamraża tablicę w runtime przez `Object.freeze` podczas kompilacji",
      "Zamienia tablicę w `enum` z wartościami stringowymi",
    ],
    answer: 0,
    explanation:
      "Bez `as const` typ to `string[]`. Z nim — `readonly ['admin', 'user']` i można wyprowadzić unię: `type Role = typeof roles[number]` → `'admin' | 'user'`. Obiekt nie jest zamrażany w runtime.",
    sources: ["ts-everyday-types", "ts-typeof"],
  },
  {
    question: "Czym jest typowanie strukturalne w TypeScript?",
    options: [
      "Zgodność typów zależy od kształtu (zestawu właściwości), a nie od nazwy",
      "Typy są zgodne tylko wtedy, gdy są zadeklarowane z tą samą nazwą",
      "Typowanie, w którym każdy obiekt musi dziedziczyć po klasie",
    ],
    answer: 0,
    explanation:
      "Jeśli obiekt ma wszystkie właściwości wymagane przez typ, pasuje — nawet jeśli jego typ ma inną nazwę (duck typing). Dlatego `Point2D` i `Vector2D` z tymi samymi polami są wymienne. Zachowanie nominalne można emulować typami „branded”.",
    sources: ["ts-type-compatibility"],
  },
  {
    question: "Czym jest plik `.d.ts`?",
    options: [
      "Plikiem deklaracji: opisuje typy istniejącego kodu JS bez implementacji",
      "Skompilowanym TypeScriptem do debugowania w przeglądarce przez source mapy",
      "Plikiem z testami typów uruchamianymi przez `tsc --test`",
    ],
    answer: 0,
    explanation:
      "Deklaracje pozwalają używać bibliotek JS z typami. Pisze się je ręcznie, generuje kompilatorem (`declaration: true`) lub instaluje z DefinitelyTyped. Plik `.d.ts` nie zawiera kodu wykonywalnego.",
    sources: ["ts-dts"],
  },
  {
    question: "Po co instalować pakiety typu `@types/lodash`?",
    options: [
      "Aby dostać typy dla biblioteki napisanej w JS bez wbudowanych deklaracji",
      "Aby zainstalować wersję biblioteki w TypeScript zamiast wersji JS",
      "Aby włączyć sprawdzanie typów w runtime dla wywołań tej biblioteki",
    ],
    answer: 0,
    explanation:
      "Pakiety `@types/*` są publikowane z repozytorium DefinitelyTyped i zawierają tylko pliki `.d.ts`. Wiele nowoczesnych bibliotek dostarcza własne typy — wtedy `@types` nie jest potrzebny. Zwykle instaluje się je jako devDependencies.",
    sources: ["ts-dts"],
  },
  {
    question: "Do czego `tsc` kompiluje plik TypeScript?",
    options: [
      "Do JavaScriptu bez adnotacji typów (i opcjonalnie `.d.ts` oraz source map)",
      "Do kodu maszynowego wybranej platformy, jak kompilator Go",
      "Do modułu WebAssembly ładowanego przez przeglądarkę",
    ],
    answer: 0,
    explanation:
      "Kompilator sprawdza typy i generuje JS dla podanego `target`. W nowoczesnych projektach budowanie często robi esbuild, SWC lub Babel (które tylko usuwają typy), a `tsc --noEmit` uruchamia się osobno do sprawdzania.",
    sources: ["ts-tsconfig", "ts-ts-for-js"],
  },
  {
    question: "Jaki jest typ `e` w `catch (e)` przy włączonym `strict`?",
    options: ["`unknown`", "`Error` (wbudowana klasa)", "`any` (jak bez strict)"],
    answer: 0,
    explanation:
      "Z flagą `useUnknownInCatchVariables` (część strict) `e` ma typ `unknown`, bo rzucić można cokolwiek, nie tylko `Error`. Sprawdź przed użyciem: `if (e instanceof Error) console.log(e.message)`.",
    sources: ["ts-strict", "ts-narrowing"],
  },
  {
    question: "Co oznacza zwracany typ `void`?",
    options: [
      "Funkcja nie zwraca nic przydatnego; wynik nie jest używany",
      "Funkcja zawsze zwraca `null` zamiast wartości",
      "Funkcja nigdy się nie kończy lub rzuca błąd",
    ],
    answer: 0,
    explanation:
      "`void` używa się dla funkcji bez wartości w `return`. Uwaga: typ callbacku `() => void` pozwala przekazać funkcję, która coś zwraca (wynik jest ignorowany) — dlatego `arr.forEach(x => list.push(x))` się kompiluje. Funkcja, która nigdy się nie kończy, ma typ `never`.",
    sources: ["ts-functions"],
  },
  {
    question: "Jak przez index signature opisać obiekt z dowolnymi kluczami-stringami i wartościami-liczbami?",
    options: [
      "`{ [key: string]: number }`",
      "`{ key: string => number }`",
      "`{ *: number }`",
    ],
    answer: 0,
    explanation:
      "Index signature opisuje „słownik”. Odpowiednik to `Record<string, number>`. Z flagą `noUncheckedIndexedAccess` `obj[key]` zwraca `number | undefined`, co lepiej oddaje rzeczywistość.",
    sources: ["ts-objects"],
  },
  {
    question: "Jak rozszerzyć interfejs?",
    options: [
      "`interface Admin extends User { role: string }`",
      "`interface Admin implements User { role: string }`",
      "`interface Admin = User + { role: string }`",
    ],
    answer: 0,
    explanation:
      "Interfejs rozszerza się przez `extends` (z kilku naraz: `extends A, B`). `implements` stosują klasy, by zagwarantować zgodność z interfejsem. Dla aliasów typów odpowiednikiem jest przecięcie `User & { role: string }`.",
    sources: ["ts-objects"],
  },
  {
    question: "Co robi `implements` w klasie?",
    options: [
      "Sprawdza, czy klasa pasuje do interfejsu; niczego nie dziedziczy",
      "Dziedziczy do klasy implementacje metod i właściwości interfejsu",
      "Tworzy instancję interfejsu dostępną przez `this`",
    ],
    answer: 0,
    explanation:
      "`class Cat implements Animal` — kompilator sprawdza, czy klasa ma wszystkie składowe `Animal`. Implementację trzeba napisać samemu, w przeciwieństwie do `extends` dla klas. Interfejsy nie istnieją w runtime.",
    sources: ["ts-classes"],
  },
  {
    question: "Czym `private` w TypeScript różni się od `#field` w JavaScript?",
    options: [
      "`private` to tylko sprawdzenie kompilatora, `#field` to prywatność w runtime",
      "Niczym: `#field` jest po prostu kompilowane do modyfikatora `private`",
      "`#field` działa tylko w TypeScript i nie jest obsługiwane przez silniki JS",
    ],
    answer: 0,
    explanation:
      "Po kompilacji pole `private` to zwykła właściwość, którą można odczytać przez `obj['field']`. Prywatne pola `#field` są obsługiwane przez silnik JS i w ogóle nie da się do nich dostać spoza klasy. Modyfikatory `public`, `protected` i `private` to narzędzia TypeScript.",
    sources: ["ts-classes"],
  },
  {
    question: "Jak otypować funkcję async zwracającą użytkownika?",
    options: [
      "`async function getUser(): Promise<User>`",
      "`async function getUser(): User`",
      "`async function getUser(): Async<User>`",
    ],
    answer: 0,
    explanation:
      "Funkcja async zawsze zwraca promise, więc typ wyniku to `Promise<User>`. Adnotacja `User` spowoduje błąd. Typ wartości promise'a można wyciągnąć przez `Awaited<ReturnType<typeof getUser>>`.",
    sources: ["ts-functions", "ts-utility-types"],
  },
  {
    question: "Co TypeScript zrobi z `const el = document.getElementById('app')`?",
    options: [
      "Wywnioskuje `HTMLElement | null` i będzie wymagał sprawdzenia `null`",
      "Wywnioskuje `HTMLDivElement` automatycznie z markupu strony",
      "Wywnioskuje `any`, bo API DOM nie są typowane w TypeScript",
    ],
    answer: 0,
    explanation:
      "Element może nie istnieć, więc typ zawiera `null`. Dla konkretnego typu użyj `querySelector<HTMLInputElement>('#email')` lub sprawdzenia `instanceof HTMLInputElement`. Typy DOM są częścią biblioteki standardowej (`lib: ['dom']`).",
    sources: ["ts-narrowing", "ts-everyday-types"],
  },
  {
    question: "Czym jest unia ze wspólnym polem-dyskryminatorem?",
    code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number };`,
    options: [
      "Unią dyskryminowaną: TS zawęża typ według `kind` w `switch`/`if`",
      "Błędem: w unii nie można używać tych samych nazw właściwości",
      "Przecięciem dwóch obiektów z właściwością `kind`",
    ],
    answer: 0,
    explanation:
      "Sprawdzenie `if (shape.kind === 'circle')` zawęża typ i wewnątrz dostępne jest `shape.radius`. To główny sposób modelowania stanów: `{ status: 'loading' } | { status: 'success'; data } | { status: 'error'; error }`.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Jak pobrać typ zwracany przez funkcję `createStore`?",
    options: [
      "`ReturnType<typeof createStore>`",
      "`typeof createStore()` z wywołaniem funkcji",
      "`ResultOf<createStore>` ze standardowej biblioteki",
    ],
    answer: 0,
    explanation:
      "`ReturnType` przyjmuje typ funkcji, więc potrzebne jest `typeof`. Podobnie `Parameters<typeof fn>` daje krotkę parametrów. W ten sposób typy są wyprowadzane z implementacji, a nie duplikowane.",
    sources: ["ts-utility-types", "ts-typeof"],
  },
  {
    question: "Co się stanie przy przekazaniu literału obiektu z dodatkową właściwością?",
    code: `type User = { name: string };
const u: User = { name: 'Ann', age: 30 };`,
    options: [
      "Błąd: literały podlegają sprawdzaniu nadmiarowych właściwości",
      "Wszystko w porządku: dodatkowe właściwości są zawsze dozwolone",
      "Właściwość `age` jest po cichu usuwana podczas kompilacji",
    ],
    answer: 0,
    explanation:
      "Sprawdzanie nadmiarowych właściwości dotyczy tylko „świeżych” literałów obiektów — to ochrona przed literówkami. Jeśli najpierw umieścisz obiekt w zmiennej, a potem go przypiszesz, błędu nie będzie (zgodność strukturalna). Kompilator niczego nie usuwa.",
    sources: ["ts-objects", "ts-type-compatibility"],
  },
  {
    question: "Czym jest `tsconfig.json`?",
    options: [
      "Plikiem z ustawieniami kompilatora i listą plików projektu",
      "Plikiem z listą zależności npm dla TypeScript",
      "Plikiem z typami dla wszystkich modułów projektu",
    ],
    answer: 0,
    explanation:
      "W `compilerOptions` ustawia się `target`, `module`, `strict`, `paths` itd., a `include`/`exclude` określają, które pliki należą do projektu. Zależności opisuje `package.json`, a typy — pliki `.d.ts`. Konfiguracje można dziedziczyć przez `extends`.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Jak stopniowo przenieść projekt JS na TypeScript?",
    options: [
      "Włączyć `allowJs`, zmieniać nazwy plików po kolei i zaostrzać sprawdzenia",
      "Przepisać cały projekt na TS naraz, inaczej się nie zbuduje",
      "Dodać `// @ts-nocheck` do każdego pliku na zawsze",
    ],
    answer: 0,
    explanation:
      "`allowJs` pozwala mieszać JS i TS, a `checkJs` i JSDoc dają typy bez zmiany nazw plików. Zacznij od modułów-liści i narzędzi, potem zaostrzaj flagi `strict`. Pełne przepisanie jest ryzykowne i wstrzymuje rozwój.",
    sources: ["ts-migrating"],
  },
  {
    question: "Czym `Required<T>` różni się od `Partial<T>`?",
    options: [
      "`Required` czyni wszystkie właściwości wymaganymi, `Partial` — opcjonalnymi",
      "`Required` usuwa modyfikator `readonly`, a `Partial` go dodaje",
      "To synonimy: oba czynią właściwości obiektu wymaganymi",
    ],
    answer: 0,
    explanation:
      "To przeciwieństwa: `Required` usuwa modyfikator `?`, `Partial` go dodaje. `readonly` obsługuje `Readonly<T>`. Wszystkie te narzędzia to typy mapowane, które można napisać samemu.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Jak określić, że funkcja przyjmuje dowolną liczbę liczb?",
    options: [
      "`function sum(...nums: number[])`",
      "`function sum(nums...: number)`",
      "`function sum(*nums: number)`",
    ],
    answer: 0,
    explanation:
      "Parametr rest zbiera argumenty w tablicę; jego typem jest tablica lub krotka. Wywołuje się go jako `sum(1, 2, 3)` lub `sum(...arr)`.",
    sources: ["ts-functions"],
  },
];

export default questions;
