import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Czy przy `strictFunctionTypes` można przypisać `(x: Dog) => void` do zmiennej typu `(x: Animal) => void`?",
    options: [
      "Nie: parametry funkcji są sprawdzane kontrawariantnie",
      "Tak: parametry funkcji są sprawdzane kowariantnie",
      "Tak, ale tylko jeśli `Dog` jest klasą, a nie interfejsem",
    ],
    answer: 0,
    explanation:
      "Zmienna obiecuje przyjąć dowolne `Animal`, a funkcja umie obsłużyć tylko `Dog` — wywołanie z `Cat` by ją zepsuło. Dlatego podtypowanie po parametrze działa w odwrotną stronę: `(x: Animal) => void` można przypisać tam, gdzie oczekiwane jest `(x: Dog) => void`, ale nie odwrotnie.",
    sources: ["ts-type-compatibility", "ts-strict"],
  },
  {
    question: "Dlaczego `strictFunctionTypes` nie działa dla metody zadeklarowanej jako `handle(x: Dog): void`?",
    options: [
      "Parametry w składni metody są sprawdzane biwariantnie pod kątem zgodności",
      "Metody klas i interfejsów w ogóle nie są sprawdzane pod kątem zgodności",
      "Flaga dotyczy tylko funkcji strzałkowych zadeklarowanych w klasach",
    ],
    answer: 0,
    explanation:
      "Biwariantność metod zachowano, by wiele wbudowanych typów (np. `Array<T>`) pozostało zgodnych. Jeśli zamiast tego zadeklarujesz właściwość-funkcję `handle: (x: Dog) => void`, sprawdzenie będzie ścisłe. Dlatego dla callbacków w interfejsach często wybiera się składnię właściwości.",
    sources: ["ts-type-compatibility", "ts-tsconfig"],
  },
  {
    question: "Czym jest `ToArray<string | number>`, jeśli `type ToArray<T> = T extends any ? T[] : never`?",
    options: ["`string[] | number[]`", "`(string | number)[]`", "`never`"],
    answer: 0,
    explanation:
      "Typ warunkowy nad „gołym” parametrem typu rozkłada się na unię: warunek jest stosowany do każdego członu osobno. To distributive conditional type — na nim zbudowane są `Exclude` i `Extract`.",
    sources: ["ts-conditional"],
  },
  {
    question: "Jak wyłączyć rozkładanie typu warunkowego na unię?",
    options: [
      "Opakować obie strony w krotkę: `[T] extends [U] ? X : Y`",
      "Dodać opcję `distributive: false` do `compilerOptions`",
      "Użyć `infer U` zamiast `extends` w sprawdzeniu",
    ],
    answer: 0,
    explanation:
      "Rozkład następuje tylko wtedy, gdy sprawdzany typ jest „gołym” parametrem. Krotka `[T]` czyni go złożonym, więc unia jest sprawdzana w całości: `[string | number] extends [string]` → false. Nie ma do tego ustawienia kompilatora.",
    sources: ["ts-conditional"],
  },
  {
    question: "Dlaczego `type IsNever<T> = T extends never ? true : false` daje `never` dla `IsNever<never>`?",
    options: [
      "`never` to pusta unia, a rozkład po niej daje pusty wynik",
      "To błąd kompilatora, więc `never` w ogóle nie da się sprawdzić",
      "`never` jest w typach warunkowych zawsze przypisywalne do literału `false`",
    ],
    answer: 0,
    explanation:
      "Rozdzielny typ warunkowy stosuje się do każdego członu unii, a `never` nie ma członów — wynikiem jest `never`. Poprawne sprawdzenie to `[T] extends [never] ? true : false`.",
    sources: ["ts-conditional"],
  },
  {
    question: "Jak zaimplementować `DeepPartial<T>`?",
    code: `type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;`,
    options: [
      "Rekurencyjnym typem mapowanym, który dodaje `?` na każdym poziomie",
      "Wbudowanym narzędziem `Partial<T, 'deep'>` z lib.d.ts",
      "Nie da się: rekurencyjne aliasy typów są w TypeScript zabronione",
    ],
    answer: 0,
    explanation:
      "Aliasy typów mogą odwoływać się do siebie. Prawdziwa implementacja powinna osobno obsłużyć tablice, funkcje i `Date`, by nie „rozbierać” ich na właściwości. Głęboka rekurencja ma limit instancjacji, więc ogromne typy spowalniają kompilator.",
    sources: ["ts-mapped", "ts-conditional"],
  },
  {
    question: "Po co są typy „branded”?",
    code: `type UserId = string & { readonly __brand: 'UserId' };`,
    options: [
      "Aby rozróżnić strukturalnie identyczne typy, np. `UserId` i `OrderId`",
      "Aby dodać właściwość `__brand` do wszystkich stringów w runtime",
      "Aby przyspieszyć porównywanie typów stringowych przez kompilator",
    ],
    answer: 0,
    explanation:
      "Typowanie strukturalne uznaje wszystkie stringi za zgodne, więc `deleteUser(orderId)` się skompiluje. Brand to fikcyjna właściwość istniejąca tylko w typach; wartość tworzy funkcja-konstruktor ze sprawdzeniem (`toUserId(s): UserId`). To emulacja typowania nominalnego.",
    sources: ["ts-type-compatibility"],
  },
  {
    question: "Jak zostawić tylko właściwości typu będące funkcjami?",
    code: `type Methods<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};`,
    options: [
      "Przemapowanie klucza na `never` usuwa właściwość z wyniku",
      "`as never` czyni typ wartości właściwości `never`",
      "Ten kod powoduje błąd kompilacji",
    ],
    answer: 0,
    explanation:
      "Jeśli wyrażenie po `as` daje `never`, klucz jest pomijany. To standardowa technika filtrowania kluczy według typu wartości. Bez `as` trzeba by najpierw obliczyć unię kluczy, a potem zastosować `Pick`.",
    sources: ["ts-mapped"],
  },
  {
    question: "Co zwraca `Split<'a/b/c'>`?",
    code: `type Split<S extends string> =
  S extends \`\${infer Head}/\${infer Rest}\`
    ? [Head, ...Split<Rest>]
    : [S];`,
    options: ["`['a', 'b', 'c']`", "`string[]` (typ ogólny)", "`['a/b/c']` (bez parsowania)"],
    answer: 0,
    explanation:
      "`infer` wewnątrz template literal parsuje string: `Head` przechwytuje część przed pierwszym `/`, `Rest` — resztę. Rekurencja i variadic tuples składają wynik. Tak typuje się parametry tras typu `/users/:id`.",
    sources: ["ts-template-literal", "ts-conditional"],
  },
  {
    question: "Czym są variadic tuple types?",
    code: `type Concat<A extends unknown[], B extends unknown[]> = [...A, ...B];`,
    options: [
      "Krotkami, w których rozwinięcie krotek generycznych zachowuje dokładne typy elementów",
      "Krotkami bez limitu długości, równoważnymi `any[]` w TS",
      "Krotkami, których elementy kompilator pozwala przestawiać",
    ],
    answer: 0,
    explanation:
      "`Concat<[1, 2], ['a']>` → `[1, 2, 'a']`. Pozwala to precyzyjnie otypować `concat`, `curry`, `Promise.all` i funkcje-wrappery z argumentami prefiksowymi.",
    sources: ["ts-objects", "ts-generics"],
  },
  {
    question: "Co daje modyfikator `const` przy parametrze typu (TS 5.0)?",
    code: `function routes<const T extends readonly string[]>(r: T) { return r; }
const r = routes(['home', 'about']);`,
    options: [
      "Wnioskowanie literałów, jak `as const`: `r` to `readonly ['home', 'about']`",
      "Zakaz modyfikowania argumentu wewnątrz funkcji w runtime",
      "`T` nie można nadpisać jawnym argumentem przy wywołaniu",
    ],
    answer: 0,
    explanation:
      "Bez `const` wywnioskowane zostałoby `string[]`, a wywołujący musiałby pisać `as const`. Modyfikator wpływa tylko na wnioskowanie typów, nie na runtime. Ograniczenie `readonly string[]` jest potrzebne, by literał tablicy pasował jako krotka readonly.",
    sources: ["ts-5-0"],
  },
  {
    question: "Do czego służy narzędzie `NoInfer<T>` (TS 5.4)?",
    code: `function pick<C extends string>(colors: C[], fallback: NoInfer<C>) {}
pick(['red', 'blue'], 'green');`,
    options: [
      "Zabrania wnioskowania `C` z tego argumentu — dlatego jest błąd",
      "Wyłącza wnioskowanie typów dla całej funkcji i jej argumentów",
      "Czyni parametr `fallback` opcjonalnym z wartością domyślną",
    ],
    answer: 0,
    explanation:
      "Bez `NoInfer` TS wywnioskowałby `C` jako `'red' | 'blue' | 'green'` z obu argumentów i błędu by nie było. `NoInfer` mówi: „weź `C` z innego miejsca, a ten argument tylko sprawdź”.",
    sources: ["ts-5-4"],
  },
  {
    question: "Co robi `infer N extends number` w typie warunkowym?",
    code: `type ToNum<S> = S extends \`\${infer N extends number}\` ? N : never;
type X = ToNum<'42'>;`,
    options: [
      "Wnioskuje `N` z ograniczeniem — `X` staje się typem literalnym `42`",
      "Konwertuje string `'42'` na liczbę w runtime przez `Number()`",
      "Powoduje błąd kompilacji: `infer` nie obsługuje `extends`",
    ],
    answer: 0,
    explanation:
      "Ograniczenie przy `infer` (TS 4.7+) nie tylko sprawdza zgodność, ale pozwala wywnioskować literalny typ liczbowy ze stringa. Wcześniej wymagało to zagnieżdżonych typów warunkowych.",
    sources: ["ts-conditional", "ts-template-literal"],
  },
  {
    question: "W jakiej kolejności pisać przeciążenia funkcji?",
    options: [
      "Od bardziej szczegółowych do ogólniejszych — TS wybiera pierwsze dopasowanie od góry",
      "Od ogólnych do szczegółowych — TS wybiera ostatnie dopasowanie",
      "Kolejność nie ma znaczenia: TS sam wybiera najdokładniejszą sygnaturę",
    ],
    answer: 0,
    explanation:
      "Jeśli ogólne przeciążenie `(x: any)` jest pierwsze, „przechwyci” wszystkie wywołania, a szczegółowe sygnatury staną się bezużyteczne. Inna rada: nie pisz przeciążeń różniących się tylko ostatnim parametrem — użyj parametru opcjonalnego.",
    sources: ["ts-functions", "ts-dts-dos-donts"],
  },
  {
    question: "Jak dodać pole `user` do typu `Request` biblioteki Express?",
    code: `declare module 'express-serve-static-core' {
  interface Request { user?: User }
}`,
    options: [
      "Module augmentation przez `declare module` i łączenie",
      "Edytować deklaracje bezpośrednio w `node_modules/@types/express`",
      "Utworzyć własny typ `Request` i podmienić import przez `paths`",
    ],
    answer: 0,
    explanation:
      "Augmentacja pozwala rozszerzyć typy zewnętrznego modułu bez forka: interfejsy się łączą. Plik musi być modułem (zawierać `import`/`export`) i być częścią projektu. Zmiany w `node_modules` przepadną przy ponownej instalacji.",
    sources: ["ts-declaration-merging"],
  },
  {
    question: "Czego wymaga flaga `verbatimModuleSyntax`?",
    options: [
      "Jawnego oznaczania importów typów przez `import type`",
      "Używania tylko modułów CommonJS z `require`",
      "Pisania rozszerzeń `.js` we wszystkich względnych importach",
    ],
    answer: 0,
    explanation:
      "Zasada jest prosta: wszystko bez modyfikatora `type` zostaje w wynikowym JS, wszystko z `type` jest usuwane. Czyni to wynik przewidywalnym dla każdego transpilera i zastępuje przestarzałe `importsNotUsedAsValues` i `preserveValueImports`.",
    sources: ["ts-tsconfig", "ts-modules"],
  },
  {
    question: "Czego zabrania flaga `erasableSyntaxOnly` (TS 5.8)?",
    options: [
      "Składni wymagającej generowania kodu: `enum`, `namespace`",
      "Jakichkolwiek adnotacji typów w plikach `.ts` oprócz JSDoc",
      "Używania `any`, `unknown` i asercji `as`",
    ],
    answer: 0,
    explanation:
      "Node.js potrafi uruchamiać TypeScript, po prostu usuwając typy (type stripping). Konstrukcje wymagające generowania kodu tak nie działają. Flaga zgłasza je z góry, by kod uruchamiał się bez osobnego kroku kompilacji.",
    sources: ["ts-5-8"],
  },
  {
    question: "Do czego służą Project References (`references`, `composite`)?",
    options: [
      "Do podziału repozytorium na przyrostowo budowane projekty",
      "Do używania typów z pakietów npm bez instalowania `@types`",
      "Do linkowania dokumentacji z komentarzy TSDoc",
    ],
    answer: 0,
    explanation:
      "Każdy podprojekt kompiluje się osobno i generuje `.d.ts`, a zależne projekty używają deklaracji zamiast źródeł. Przyspiesza to sprawdzanie typów i wymusza granice między pakietami monorepo.",
    sources: ["ts-project-references"],
  },
  {
    question: "Jakie jest ryzyko włączenia `skipLibCheck: true`?",
    options: [
      "Błędy wewnątrz plików `.d.ts`, w tym twoich, pozostają niezauważone",
      "Typy z `node_modules` przestają być w ogóle używane",
      "Kompilacja staje się wyraźnie wolniejsza",
    ],
    answer: 0,
    explanation:
      "Flaga pomija sprawdzanie plików deklaracji — buildy są szybsze i nie psują się z powodu konfliktów między `@types`. Ale błędy w deklaracjach (w tym twoich własnych `.d.ts`) pozostają niezauważone. Nie przeszkadza w używaniu typów bibliotek.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Jak znaleźć przyczynę wolnego sprawdzania typów w dużym projekcie?",
    options: [
      "`tsc --extendedDiagnostics` i `--generateTrace`",
      "Usuwać pliki z projektu po jednym, aż będzie szybciej",
      "Wyłączyć `strict` — sprawdzenia staną się szybkie",
    ],
    answer: 0,
    explanation:
      "Diagnostyka pokazuje czas każdej fazy i liczbę instancjacji, a trace (analizowany przez `@typescript/analyze-trace` lub w przeglądarce) — które typy są najdroższe. Częste przyczyny: ogromne unie, głęboka rekurencja, złożone przecięcia, brak adnotacji zwracanych typów w eksportach.",
    sources: ["ts-performance-wiki"],
  },
  {
    question: "Czy można przekazać `readonly string[]` do funkcji, która przyjmuje `string[]`?",
    options: [
      "Nie: funkcja mogłaby zmodyfikować tablicę",
      "Tak: `readonly` to tylko podpowiedź; zgodność nie jest sprawdzana",
      "Tak, ale tylko z wyłączonym trybem strict",
    ],
    answer: 0,
    explanation:
      "Odwrotny kierunek (`string[]` → `readonly string[]`) jest dozwolony. Dlatego parametry, których funkcja nie zmienia, lepiej deklarować jako `readonly T[]` — wtedy można ją wywołać zarówno z mutowalnymi, jak i readonly tablicami.",
    sources: ["ts-objects", "ts-type-compatibility"],
  },
  {
    question: "Co daje zwracany typ `this` w metodzie klasy?",
    code: `class Query {
  where(c: string): this { /* ... */ return this; }
}
class UserQuery extends Query { active(): this { return this; } }
new UserQuery().where('x').active();`,
    options: [
      "Polimorficzne `this`: łańcuch metod zachowuje typ podklasy",
      "Metoda zawsze zwraca typ klasy bazowej `Query`",
      "To błąd: `this` nie można używać jako typu",
    ],
    answer: 0,
    explanation:
      "Gdyby `where` zwracało `Query`, po nim `.active()` byłoby niedostępne. Polimorficzne `this` jest wygodne dla płynnych API i builderów. Jest też `this is T` w metodach-type guardach.",
    sources: ["ts-classes"],
  },
  {
    question: "Do czego służą adnotacje wariancji `in` i `out` przy parametrach typu (TS 4.7)?",
    code: `interface Producer<out T> { get(): T }
interface Consumer<in T> { set(v: T): void }`,
    options: [
      "Jawnie ustalają kowariancję/kontrawariancję, przyspieszając i precyzując sprawdzenia",
      "Określają, które parametry można czytać i zapisywać w runtime",
      "To składnia parametrów wejściowych i wyjściowych, jak w metodach C#",
    ],
    answer: 0,
    explanation:
      "TS zwykle sam oblicza wariancję, ale dla złożonych rekurencyjnych typów jest to kosztowne i czasem nieprecyzyjne. Adnotacja jest sprawdzana przez kompilator i używana przy porównaniach. Rzadko potrzebna — w bibliotekach ze złożonymi typami.",
    sources: ["ts-generics", "ts-type-compatibility"],
  },
  {
    question: "Dlaczego szablonowy typ `` `${A}-${B}-${C}` `` z trzech dużych unii może powodować błąd?",
    options: [
      "Wynikowa unia jest zbyt duża, a kompilator ma limit",
      "Typy szablonowe nie obsługują więcej niż dwóch podstawień",
      "Typów unii w ogóle nie można podstawiać do template literals",
    ],
    answer: 0,
    explanation:
      "Szablon z uniami rozkłada się na każdą kombinację: 100 × 100 × 100 = 1 000 000 członów. TypeScript ogranicza rozmiar unii (około 100 000) i zgłasza „Expression produces a union type that is too complex”. Rozwiązanie: ogólniejszy typ (`` `${string}-${string}` ``) lub walidacja przez funkcję.",
    sources: ["ts-template-literal", "ts-performance-wiki"],
  },
  {
    question: "Jak działa trik `UnionToIntersection`?",
    code: `type UnionToIntersection<U> =
  (U extends any ? (x: U) => void : never) extends (x: infer I) => void
    ? I : never;`,
    options: [
      "Wnioskowanie z kontrawariantnej pozycji parametru łączy kandydatów w przecięcie",
      "Kompilator po prostu zamienia `|` na `&` specjalną regułą dla tej nazwy",
      "To nie działa — z unii nie da się wyprowadzić przecięcia",
    ],
    answer: 0,
    explanation:
      "Najpierw unia rozkłada się na unię funkcji `(x: A) => void | (x: B) => void`. Potem przy wnioskowaniu `I` z (kontrawariantnej) pozycji parametru wielu kandydatów łączy się w przecięcie: `A & B`. To podręcznikowy przykład programowania na poziomie typów.",
    sources: ["ts-conditional", "type-challenges"],
  },
  {
    question: "Dlaczego `Record<Status, string>` jest przydatniejszy niż `{ [k: string]: string }` dla słownika według statusu?",
    options: [
      "Kompilator wymaga klucza dla każdego statusu",
      "Index signature nie obsługuje wartości stringowych",
      "`Record` kompiluje się do `Map` i działa szybciej",
    ],
    answer: 0,
    explanation:
      "Dodaj nowy człon do unii `Status`, a każdy `Record<Status, ...>` przestanie się kompilować, dopóki nie dodasz tłumaczenia, ikony itd. Index signature przyjmuje dowolny string i nie gwarantuje kompletności.",
    sources: ["ts-utility-types", "ts-objects"],
  },
  {
    question: "Co zmieniło się we wnioskowaniu predykatów typów w TS 5.5?",
    code: `const nums = [1, null, 2].filter(x => x !== null);`,
    options: [
      "TS wnioskuje predykat `x is number`, więc `nums` to `number[]`",
      "`filter` teraz zawsze zwraca `never[]` dla mieszanych tablic",
      "Predykaty typów usunięto na rzecz funkcji asercji",
    ],
    answer: 0,
    explanation:
      "Wcześniej `nums` było `(number | null)[]` i trzeba było pisać `(x): x is number => x !== null`. Teraz kompilator wnioskuje predykat dla prostych funkcji, jeśli zwrócenie `true` naprawdę zawęża typ.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Do czego służą deklaracje `using` (TS 5.2)?",
    code: `{
  using file = openFile('log.txt');
  // ...
} // file[Symbol.dispose]() is called automatically`,
    options: [
      "Do automatycznego wywołania `Symbol.dispose` przy wyjściu z bloku",
      "Do importowania modułów wewnątrz bloku kodu, jak `import` w Pythonie",
      "Do zastąpienia `const` dla głęboko niezmiennych obiektów",
    ],
    answer: 0,
    explanation:
      "Implementuje propozycję ECMAScript Explicit Resource Management: zasób jest zwalniany nawet przy wyjątku — jak `try/finally`, ale krócej. Dla zasobów asynchronicznych jest `await using` i `Symbol.asyncDispose`. Wygodne dla połączeń, plików, blokad i subskrypcji w testach.",
    sources: ["ts-handbook"],
  },
  {
    question: "Co zwraca `(typeof users)[number]`, jeśli `users: User[]`?",
    options: ["`User`", "`number`", "`User[]`"],
    answer: 0,
    explanation:
      "Dostęp indeksowany przez `number` zwraca typ elementu tablicy lub unię typów elementów krotki. Popularne połączenie: `const roles = [...] as const; type Role = (typeof roles)[number]`.",
    sources: ["ts-indexed-access"],
  },
  {
    question: "Co da typ mapowany `{ [K in keyof T]: Box<T[K]> }`, jeśli `T` to krotka `[string, number]`?",
    options: [
      "Krotkę `[Box<string>, Box<number>]`",
      "Obiekt z właściwościami `0`, `1`, `length` i metodami",
      "Błąd: typy mapowane nie działają z krotkami",
    ],
    answer: 0,
    explanation:
      "Typ mapowany po `keyof T`, gdzie `T` jest parametrem typu krotki lub tablicy, mapuje elementy i zachowuje krotkowość, długość i modyfikatory. Pozwala to otypować np. `Promise.all` przez `{ [K in keyof T]: Awaited<T[K]> }`.",
    sources: ["ts-mapped"],
  },
  {
    question: "Jak z wartości pobrać typ elementu `Set<T>` lub `Map<K, V>`?",
    code: `const ids = new Set(['a', 'b']);
type Id = typeof ids extends Set<infer T> ? T : never;`,
    options: [
      "Typem warunkowym z `infer` na wzorcu `Set<infer T>`",
      "Dostępem indeksowanym `(typeof ids)[number]`",
      "Narzędziem `ElementType<typeof ids>` ze standardowej biblioteki",
    ],
    answer: 0,
    explanation:
      "`Set` nie ma liczbowego index signature, więc `[number]` nie działa. Typ warunkowy z `infer` wyciąga parametr dowolnego generyka: `Map<infer K, infer V>`, `Promise<infer R>`. Wbudowanego `ElementType` nie ma. Tu `Id` to `string`.",
    sources: ["ts-conditional", "ts-indexed-access"],
  },
  {
    question: "Do czego służy słowo kluczowe `declare`?",
    code: `declare const __APP_VERSION__: string;`,
    options: [
      "Do opisania czegoś, co istnieje w runtime, bez generowania kodu",
      "Do zadeklarowania zmiennej, którą utworzy kompilator",
      "Do uczynienia zmiennej globalną w runtime",
    ],
    answer: 0,
    explanation:
      "Deklaracje ambient informują kompilator o rzeczach zdefiniowanych gdzie indziej: globalach wstrzykiwanych przez bundler, skryptach z CDN, modułach bez typów (`declare module 'legacy-lib'`). `declare` nie generuje żadnego kodu JS.",
    sources: ["ts-dts"],
  },
  {
    question: "Jak sprawdzić typ w testach tak, by błąd pojawił się, gdy NIE ma błędu kompilacji?",
    options: [
      "`// @ts-expect-error` nad sprawdzaną linią",
      "`// @ts-ignore` nad sprawdzaną linią",
      "`// @ts-nocheck` na początku pliku testowego",
    ],
    answer: 0,
    explanation:
      "`@ts-expect-error` tłumi błąd i sam staje się błędem, jeśli nie ma czego tłumić — więc test typu „pada”, gdy typ staje się zbyt szeroki. `@ts-ignore` zawsze milczy i ukrywa problemy. Do asercji jest `expectTypeOf` w Vitest, `tsd` i `@ts-expect-error` w type-challenges.",
    sources: ["ts-handbook", "type-challenges"],
  },
  {
    question: "Kiedy podwójna asercja `x as unknown as T` jest uzasadniona?",
    options: [
      "Prawie nigdy: tylko jako świadome obejście poparte sprawdzeniem",
      "Zawsze, gdy kompilator narzeka na niezgodne typy",
      "To standardowy, bezpieczny sposób rzutowania JSON na typ",
    ],
    answer: 0,
    explanation:
      "Zwykłe `as` jest zabronione między niepowiązanymi typami; przez `unknown` można zadeklarować cokolwiek — i się pomylić. Jeśli nie da się tego uniknąć (np. w niskopoziomowym narzędziu), ukryj to w funkcji ze sprawdzeniem w runtime i testami. Dla JSON waliduj schematem.",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Dlaczego warto unikać typu `Function` dla callbacków?",
    options: [
      "Przyjmuje dowolną funkcję, a wywołania nie są sprawdzane",
      "Zabrania przekazywania funkcji strzałkowych i metod",
      "Jest przestarzały i w trybie strict powoduje błąd kompilacji",
    ],
    answer: 0,
    explanation:
      "`Function` opisuje dowolną funkcję, a jej wywołanie jest niebezpieczne. Lepsza jest dokładna sygnatura `(value: string) => void`, a dla „dowolnej funkcji” — `(...args: never[]) => unknown` lub `(...args: any[]) => any`. Podobnie `Object` i `{}` lepiej zastąpić przez `object` lub `unknown`.",
    sources: ["ts-dts-dos-donts", "ts-functions"],
  },
  {
    question: "Dlaczego nie można napisać `a.x` dla `a: { x: string } | { y: number }`?",
    options: [
      "Dostępne są tylko wspólne właściwości unii; zawęź typ przez `'x' in a`",
      "Właściwości typów unii są zawsze tylko do odczytu",
      "Trzeba najpierw rzutować `a` na `any` — tak jest zaprojektowane",
    ],
    answer: 0,
    explanation:
      "Kompilator nie wie, którym członem jest `a`, a drugi nie ma `x`. Po `if ('x' in a)` typ jest zawężony. Alternatywy to wspólny dyskryminator (`kind`) lub jawne `x?: undefined` w drugim członie.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Co zmienia flaga `exactOptionalPropertyTypes`?",
    options: [
      "`{ a?: string }` nie przyjmuje już jawnego `a: undefined`",
      "Czyni wszystkie opcjonalne właściwości wymaganymi",
      "Zabrania opcjonalnych właściwości w interfejsach",
    ],
    answer: 0,
    explanation:
      "Bez flagi `a?: string` jest równoważne `a?: string | undefined`. Z nią rozróżniane jest „brak klucza” i „klucz z wartością `undefined`”, co ma znaczenie dla `Object.keys`, `in` i spreadu. Jeśli `undefined` jest jawnie potrzebne, napisz `a?: string | undefined`.",
    sources: ["ts-tsconfig", "ts-objects"],
  },
  {
    question: "Co zwraca `keyof (A | B)`, jeśli `A = { id; name }`, a `B = { id; price }`?",
    options: ["`'id'`", "`'id' | 'name' | 'price'`", "`never`"],
    answer: 0,
    explanation:
      "Wartość unii może być dowolnym z członów, więc bezpieczny jest dostęp tylko do wspólnych kluczy. `keyof (A & B)` daje unię wszystkich kluczy. Aby rozłożyć `keyof` na człony unii, użyj typu warunkowego: `T extends any ? keyof T : never`.",
    sources: ["ts-keyof"],
  },
  {
    question: "Jak włączyć sprawdzanie typów w plikach JS bez migracji na TS?",
    options: [
      "`// @ts-check` i typy przez JSDoc",
      "Zmienić nazwę pliku na `.jsx` lub `.mjs`",
      "To niemożliwe bez rozszerzenia pliku `.ts`",
    ],
    answer: 0,
    explanation:
      "TypeScript rozumie JSDoc: `/** @param {string} name */`, `@type`, `@typedef` i importy typów przez `@import`. Tak typowanych jest wiele bibliotek JS i umożliwia to stopniową migrację. Sprawdzanie działa w edytorze i przez `tsc --noEmit`.",
    sources: ["ts-migrating", "ts-tsconfig"],
  },
  {
    question: "Jak otypować parametr przyjmujący konstruktor klasy abstrakcyjnej?",
    options: [
      "`abstract new (...args: any[]) => T`",
      "`typeof T`",
      "`Constructor<T>` ze standardowej biblioteki",
    ],
    answer: 0,
    explanation:
      "Abstrakcyjne sygnatury konstruktorów (TS 4.2) pozwalają przyjmować zarówno klasy abstrakcyjne, jak i zwykłe — np. w funkcjach-mixinach. `new (...args) => T` nie przyjmie klasy abstrakcyjnej. Wbudowanego `Constructor<T>` nie ma; zwykle deklaruje się go samemu.",
    sources: ["ts-classes"],
  },
  {
    question: "Czy zawężenie zmiennej `let` jest zachowywane wewnątrz callbacku?",
    code: `function f(x: string | number) {
  if (typeof x === 'string') {
    setTimeout(() => x.toUpperCase());
  }
}`,
    options: [
      "Tak, od TS 5.4, jeśli zmienna nie jest potem ponownie przypisywana",
      "Nie, nigdy: zawężenie w domknięciach jest zawsze resetowane",
      "Tak, ale tylko dla zmiennych `const` w każdej wersji",
    ],
    answer: 0,
    explanation:
      "Wcześniej wewnątrz callbacku TS zakładał, że `x` może zostać ponownie przypisane, i resetował zawężenie do `string | number`. Od 5.4 kompilator rozumie, że wartość jest stabilna po ostatnim przypisaniu, i zachowuje zawężenie. Dla `const` działało to już wcześniej.",
    sources: ["ts-5-4", "ts-narrowing"],
  },
  {
    question: "Czym jest homomorficzny typ mapowany i co zachowuje?",
    options: [
      "Typ `{ [K in keyof T]: ... }`, który zachowuje modyfikatory `T`",
      "Typ mapujący identyczne wartości różnych obiektów",
      "Typ, w którym wszystkie właściwości mają ten sam typ wartości",
    ],
    answer: 0,
    explanation:
      "Gdy typ mapowany przechodzi bezpośrednio po `keyof T`, TS przenosi modyfikatory właściwości `T`. Dlatego `Partial<Readonly<T>>` pozostaje readonly. Przy przechodzeniu po dowolnej unii kluczy (`K in 'a' | 'b'`) modyfikatory nie są zachowywane.",
    sources: ["ts-mapped"],
  },
  {
    question: "Jak otypować funkcję podobną do `Promise.all` dla krotki promise'ów?",
    options: [
      "Generyczna krotka `[...T]` i typ mapowany z `Awaited<T[K]>`",
      "Tablica `Promise<any>[]` i wynik `Promise<any[]>`",
      "Jeden generyk `T` dla wszystkich promise'ów i `Promise<T>`",
    ],
    answer: 0,
    explanation:
      "`[...T]` podpowiada, by wywnioskować krotkę, a nie tablicę, a homomorficzny typ mapowany rozpakowuje każdy element: `all([fetchUser(), fetchPosts()])` → `Promise<[User, Post[]]>`. Wersje z `any` lub jednym `T` tracą typy pozycyjne.",
    sources: ["ts-mapped", "ts-generics"],
  },
  {
    question: "Dlaczego zaleca się adnotować zwracane typy eksportowanych funkcji w bibliotece?",
    options: [
      "Przyspiesza to sprawdzanie i utrwala publiczny kontrakt",
      "Bez adnotacji TypeScript nie potrafi wywnioskować typu wyniku",
      "Wymaga tego specyfikacja modułów ECMAScript",
    ],
    answer: 0,
    explanation:
      "Wnioskowanie złożonego typu trzeba powtarzać w każdym miejscu użycia funkcji, a deklaracje stają się nieporęczne. Jawny typ utrzymuje kontrakt stabilnym: zmiany implementacji nie „przeciekają” do API. Z `isolatedDeclarations` (TS 5.5) adnotacje na eksportach stają się obowiązkowe.",
    sources: ["ts-performance-wiki", "ts-dts"],
  },
  {
    question: "Dlaczego `isolatedDeclarations` (TS 5.5) jest przydatne dla monorepo?",
    options: [
      "Pozwala generować `.d.ts` dla każdego pliku z osobna i równolegle",
      "Zabrania importowania typów między pakietami monorepo",
      "Izoluje każdy pakiet w osobnym procesie Node.js podczas budowania",
    ],
    answer: 0,
    explanation:
      "Flaga wymaga jawnej adnotacji eksportowanego API — wtedy deklaracje można wygenerować, patrząc na jeden plik. Pozwala to zewnętrznym narzędziom (oxc, swc) generować `.d.ts` równolegle, bez czekania na pełne sprawdzenie zależności.",
    sources: ["ts-tsconfig", "ts-project-references"],
  },
  {
    question: "Czym `T extends object` różni się od `T extends {}` jako ograniczenie generyka?",
    options: [
      "`object` — nie-prymitywy, `{}` — wszystko poza null/undefined",
      "To samo ograniczenie zapisane inną składnią",
      "`{}` dopuszcza tylko puste obiekty bez właściwości",
    ],
    answer: 0,
    explanation:
      "`{}` oznacza „dowolną wartość z właściwościami”, a stringi i liczby mają właściwości, więc `T extends {}` przyjmie `'abc'` i `42`. Aby dopuścić tylko obiekty (w tym tablice i funkcje), użyj `object`. Dla „wszystkiego poza null/undefined” `{}` jest dokładnie tym, czego trzeba.",
    sources: ["ts-everyday-types", "ts-generics"],
  },
  {
    question: "Dlaczego rozszerzanie interfejsu jest dla kompilatora szybsze niż przecięcie?",
    options: [
      "Relacje interfejsów są cache'owane, a przecięcia przeliczane od nowa",
      "Przecięcia są sprawdzane w runtime, a interfejsy nie",
      "Interfejsy kompilują się do klas, które silnik cache'uje",
    ],
    answer: 0,
    explanation:
      "Kompilator cache'uje wynik porównania interfejsów po nazwie, a przecięcie `A & B & C` trzeba za każdym razem normalizować i porównywać strukturalnie. Na gorących ścieżkach z dużymi typami jest to zauważalne. TypeScript performance wiki mówi o tym wprost.",
    sources: ["ts-performance-wiki"],
  },
  {
    question: "Jak otypować reducer, by `payload` zależał od `type` akcji?",
    options: [
      "Opisać akcje jako unię dyskryminowaną po polu `type`",
      "Ustawić `payload: any` i sprawdzać go w każdym `case`",
      "Utworzyć jeden interfejs `Action` ze wszystkimi polami opcjonalnymi",
    ],
    answer: 0,
    explanation:
      "`type Action = { type: 'add'; payload: Todo } | { type: 'remove'; payload: { id: string } }` — w `case 'add'` TS wie, że `payload` to `Todo`. Z `never` w `default` dostajesz sprawdzenie kompletności. Redux Toolkit generuje takie typy automatycznie z `createSlice`.",
    sources: ["ts-narrowing", "redux-typescript"],
  },
  {
    question: "Co zwraca `T[keyof T]` dla `T = { a: string; b: number }`?",
    options: ["`string | number`", "`'a' | 'b'`", "`{ a: string } | { b: number }`"],
    answer: 0,
    explanation:
      "Dostęp indeksowany przez unię kluczy daje unię typów wartości. Często używa się go, by pobrać unię wartości obiektu-stałej: `typeof obj[keyof typeof obj]`.",
    sources: ["ts-indexed-access", "ts-keyof"],
  },
  {
    question: "Do czego służy `declare module '*.svg'`?",
    code: `declare module '*.svg' {
  const src: string;
  export default src;
}`,
    options: [
      "Do opisania typu importu zasobów obsługiwanych przez bundler",
      "Do ładowania wszystkich plików SVG projektu w runtime jedną paczką",
      "Do zabronienia importowania plików SVG w kodzie TypeScript projektu",
    ],
    answer: 0,
    explanation:
      "Deklaracje modułów z wildcardem opisują, co zwraca import plików obsługiwanych przez bundler (obrazki, CSS Modules, `?raw`). Frameworki zwykle same dostarczają takie deklaracje (`next-env.d.ts`, `vite/client`).",
    sources: ["ts-dts", "ts-modules"],
  },
];

export default questions;
