import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Czym jest type guard zdefiniowany przez użytkownika?",
    code: `function isUser(x: unknown): x is User {
  return typeof x === "object" && x !== null && "id" in x;
}`,
    options: [
      "Funkcją ze zwracanym typem `x is T`, która przy `true` zawęża argument",
      "Dekoratorem, który przy każdym wywołaniu sprawdza typ argumentu w runtime",
      "Składnią asercji typu równoważną zapisowi `x as User` w kodzie",
    ],
    answer: 0,
    explanation:
      "Po `if (isUser(data))` wewnątrz gałęzi `data` ma typ `User`. Za poprawność sprawdzenia odpowiada programista: kompilator ufa predykatowi. Od TS 5.5 proste predykaty są wnioskowane automatycznie, np. dla `arr.filter(x => x !== null)`.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Jak zagwarantować, że `switch` obsłużył wszystkie człony unii?",
    code: `function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2;
    case 'square': return s.size ** 2;
    default: { const _exhaustive: never = s; return _exhaustive; }
  }
}`,
    options: [
      "Przypisać wartość w `default` do zmiennej typu `never`",
      "Dodać komentarz `// @ts-exhaustive` przed `switch`",
      "Włączyć flagę `strictSwitch` w `compilerOptions`",
    ],
    answer: 0,
    explanation:
      "Jeśli dodasz nowy kształt do `Shape` i zapomnisz o `case`, w `default` zostanie niepusty typ, a przypisanie go do `never` spowoduje błąd kompilacji. Pomagają też flaga `noImplicitReturns` i reguła ESLint `switch-exhaustiveness-check`.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Co oznacza `<T extends { id: string }>` w generyku?",
    options: [
      "Ograniczenie: `T` musi mieć co najmniej właściwość `id: string`",
      "`T` dziedziczy klasę z polem `id`, jak przy `class extends`",
      "`T` może być dokładnie `{ id: string }` i niczym innym",
    ],
    answer: 0,
    explanation:
      "Ograniczenie pozwala bezpiecznie odwoływać się do `item.id` wewnątrz funkcji, zachowując pełny typ `T` w wyniku. Można przekazać dowolny obiekt z odpowiednim `id` i innymi polami. Klasy i dziedziczenie nie mają z tym nic wspólnego.",
    sources: ["ts-generics"],
  },
  {
    question: "Jak otypować `getProp(obj, key)`, by wynik zależał od klucza?",
    options: [
      "`function getProp<T, K extends keyof T>(obj: T, key: K): T[K]`",
      "`function getProp(obj: object, key: string): unknown`",
      "`function getProp<T>(obj: T, key: keyof any): T`",
    ],
    answer: 0,
    explanation:
      "`K extends keyof T` dopuszcza tylko istniejące klucze, a dostęp indeksowany `T[K]` daje dokładny typ wartości: `getProp(user, 'age')` → `number`. Wersja z `any` traci typowanie, a `string` przepuszcza literówki.",
    sources: ["ts-keyof", "ts-indexed-access", "ts-generics"],
  },
  {
    question: "Czym jest typ mapowany (mapped type)?",
    code: `type Flags<T> = { [K in keyof T]: boolean };`,
    options: [
      "Typem, który tworzy nowe właściwości, przechodząc po kluczach innego typu",
      "Typem dla obiektu `Map` ze standardowej biblioteki JavaScript",
      "Typem, który mapuje wartości obiektu w runtime",
    ],
    answer: 0,
    explanation:
      "`[K in keyof T]` przechodzi po kluczach. Można zmienić typ wartości, dodać lub usunąć modyfikatory (`readonly`, `?`, `-?`) i zmienić nazwy kluczy przez `as`. Na typach mapowanych zbudowane są `Partial`, `Readonly` i `Record`.",
    sources: ["ts-mapped"],
  },
  {
    question: "Co robi typ warunkowy `T extends string ? 'text' : 'other'`?",
    options: [
      "Wybiera jeden z typów w zależności od tego, czy `T` jest przypisywalny do `string`",
      "Sprawdza w runtime, czy wartość jest stringiem, i rzuca błąd",
      "Deklaruje, że `T` dziedziczy po wbudowanej klasie `String`",
    ],
    answer: 0,
    explanation:
      "Typy warunkowe to „operator trójargumentowy” na poziomie typów. Razem z `infer` pozwalają wyciągać części typów. Zastosowane do unii rozkładają się na każdy człon (distributive conditional types).",
    sources: ["ts-conditional"],
  },
  {
    question: "Co robi `infer` w `type ElementType<T> = T extends (infer U)[] ? U : never`?",
    options: [
      "Deklaruje zmienną typu `U`, którą TS wywnioskuje z dopasowania do wzorca",
      "Pyta kompilator w runtime o typ elementu tablicy",
      "Czyni `U` opcjonalnym parametrem generycznym z domyślnym `unknown`",
    ],
    answer: 0,
    explanation:
      "`infer` stosuje się tylko w części `extends` typu warunkowego: TS dopasowuje `T` do wzorca i „przechwytuje” potrzebną część. `ElementType<string[]>` → `string`. Tak działają `ReturnType`, `Parameters` i `Awaited`.",
    sources: ["ts-conditional"],
  },
  {
    question: "Co zwraca `Awaited<Promise<Promise<number>>>`?",
    options: ["`number`", "`Promise<number>`", "`Promise<Promise<number>>`"],
    answer: 0,
    explanation:
      "`Awaited` rekurencyjnie rozpakowuje promise'y i obiekty thenable, odwzorowując zachowanie `await`. Wygodne dla typu wyniku funkcji async: `Awaited<ReturnType<typeof fetchUser>>`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Czym `Exclude<T, U>` różni się od `Omit<T, K>`?",
    options: [
      "`Exclude` usuwa człony z unii, `Omit` usuwa właściwości z typu obiektowego",
      "`Exclude` usuwa właściwości z obiektu, `Omit` usuwa człony unii",
      "To synonimy z inną kolejnością parametrów typu",
    ],
    answer: 0,
    explanation:
      "`Exclude<'a' | 'b' | 'c', 'a'>` → `'b' | 'c'`. `Omit<User, 'password'>` → obiekt bez pola. Narzędzia w parze: `Extract` (zostawia pasujące człony unii) i `Pick` (zostawia właściwości). `NonNullable<T>` usuwa `null` i `undefined`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Jak działają przeciążenia funkcji w TypeScript?",
    code: `function parse(x: string): number;
function parse(x: number): string;
function parse(x: string | number) { /* ... */ }`,
    options: [
      "Kilka sygnatur wywołania i jedna ukryta implementacja",
      "Każda sygnatura dostaje własną implementację funkcji, jak w Javie",
      "Ostatnia sygnatura nadpisuje wszystkie poprzednie, które są ignorowane",
    ],
    answer: 0,
    explanation:
      "Kod wywołujący widzi tylko sygnatury przeciążeń, a TS wybiera pierwszą pasującą od góry do dołu. Implementacja musi być zgodna ze wszystkimi. Przeciążenia często można zastąpić parametrem-unią lub generykiem z typem warunkowym.",
    sources: ["ts-functions"],
  },
  {
    question: "Czym jest declaration merging?",
    options: [
      "Łączeniem deklaracji o tej samej nazwie, np. dwóch `interface Window`, w jedną",
      "Automatycznym łączeniem dwóch pakietów typów npm w jeden przy instalacji",
      "Łączeniem aliasu `type` i `interface` o tej samej nazwie",
    ],
    answer: 0,
    explanation:
      "Interfejsy, namespace'y i niektóre inne deklaracje o tej samej nazwie się łączą. Tak rozszerza się typy globalne: `interface Window { analytics: Analytics }` w `declare global`. Aliasy `type` się nie łączą — ponowna deklaracja to błąd.",
    sources: ["ts-declaration-merging"],
  },
  {
    question: "Do czego służy klasa abstrakcyjna?",
    options: [
      "Klasa bazowa ze wspólnym kodem i metodami abstrakcyjnymi, nie do utworzenia przez `new`",
      "Klasa bez metod, używana tylko jako typ do sprawdzeń",
      "Klasa, której wszystkie metody i właściwości są statyczne",
    ],
    answer: 0,
    explanation:
      "`abstract class Repo { abstract find(id): T; log() {...} }` — podklasy muszą zaimplementować `find` i dostają gotowe `log`. W przeciwieństwie do interfejsu klasa abstrakcyjna istnieje w runtime i może zawierać kod i stan.",
    sources: ["ts-classes"],
  },
  {
    question: "Czym `protected` różni się od `private` w klasach TypeScript?",
    options: [
      "`protected` jest dostępne w podklasach, `private` tylko w samej klasie",
      "`protected` można czytać z zewnątrz, a `private` nie",
      "To synonimy; `protected` to stara nazwa",
    ],
    answer: 0,
    explanation:
      "`public` (domyślnie) jest dostępne wszędzie, `protected` — w klasie i podklasach, `private` — tylko w klasie deklarującej. Wszystkie trzy to sprawdzenia kompilatora; prawdziwa prywatność w runtime to `#field`.",
    sources: ["ts-classes"],
  },
  {
    question: "Co robi operator `satisfies`?",
    code: `const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, string | number[]>;`,
    options: [
      "Sprawdza zgodność z typem, ale zachowuje dokładniejszy wywnioskowany typ",
      "Rzutuje wartość na podany typ bez sprawdzania, jak `as`",
      "Rozszerza typ wartości do podanego, tracąc szczegóły literałów",
    ],
    answer: 0,
    explanation:
      "Z adnotacją `: Record<...>` `palette.green` stałoby się `string | number[]`. Z `satisfies` kształt jest sprawdzany, ale `palette.green` pozostaje `string`, więc można wywołać `.toUpperCase()`. W przeciwieństwie do `as` nic nie jest zakładane bez sprawdzenia.",
    sources: ["ts-4-9"],
  },
  {
    question: "Czym są template literal types?",
    code: `type Event = 'click' | 'focus';
type Handler = \`on\${Capitalize<Event>}\`;`,
    options: [
      "Typami stringów budowanymi z szablonu: tu `'onClick' | 'onFocus'`",
      "Szablonami do generowania kodu podczas kompilacji",
      "Typem stringa sprawdzanym wyrażeniem regularnym",
    ],
    answer: 0,
    explanation:
      "Szablony literałów działają na poziomie typów i rozkładają się na unie. Są wbudowane przekształcenia: `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`. Używa się ich do typowania kluczy zdarzeń, zmiennych CSS i tras.",
    sources: ["ts-template-literal"],
  },
  {
    question: "Dlaczego zamiast `enum` często używa się obiektu z `as const`?",
    code: `const Status = { Active: 'active', Banned: 'banned' } as const;
type Status = typeof Status[keyof typeof Status];`,
    options: [
      "To zwykły obiekt JS, a typ wartości to unia stringów",
      "`as const` działa w runtime dziesiątki razy szybciej niż enum",
      "Enumy usunięto w TypeScript 5 i już się nie kompilują",
    ],
    answer: 0,
    explanation:
      "Obiekt to standardowy JS: można po nim iterować i jest zgodny z trybem erasable syntax (type stripping w Node.js). Typ to unia stringów, która przyjmuje też literały z API. Enumy liczbowe natomiast przyjmują dowolną liczbę i tworzą odwrotne mapowanie. Enumów nie usunięto.",
    sources: ["ts-enums", "ts-5-8"],
  },
  {
    question: "Czym `const enum` różni się od zwykłego `enum`?",
    options: [
      "Wartości są wstawiane podczas kompilacji; w runtime nie ma obiektu",
      "Wartości `const enum` nie można używać w `switch` ani porównaniach",
      "`const enum` może zawierać tylko wartości stringowe",
    ],
    answer: 0,
    explanation:
      "`const enum` oszczędza rozmiar paczki, ale źle współpracuje z `isolatedModules` i transpilerami przetwarzającymi pliki pojedynczo (Babel, esbuild, SWC): musiałyby znać wartości z innego pliku. Dlatego biblioteki i nowoczesne buildy go unikają.",
    sources: ["ts-enums", "ts-tsconfig"],
  },
  {
    question: "Czym przestrzenie nazw (`namespace`) różnią się od modułów ES?",
    options: [
      "Namespace'y to przestarzały sposób organizacji kodu; teraz używa się modułów",
      "Namespace'y to nowy standard ECMAScript zastępujący `import`/`export`",
      "To synonimy: kompilator zamienia jedno w drugie",
    ],
    answer: 0,
    explanation:
      "Namespace'y powstały przed modułami ES i tworzą obiekty w runtime. Dziś kod organizuje się w plikach z `import`/`export`, a `declare namespace` bywa używane w deklaracjach do opisu bibliotek globalnych. Namespace'y nie są zgodne z `erasableSyntaxOnly`.",
    sources: ["ts-namespaces-modules", "ts-modules"],
  },
  {
    question: "Czym jest funkcja asercji (assertion function)?",
    code: `function assertIsString(x: unknown): asserts x is string {
  if (typeof x !== 'string') throw new Error('Not a string');
}`,
    options: [
      "Funkcją, po której udanym wywołaniu TS uznaje typ argumentu za zawężony",
      "Funkcją zwracającą `true` lub `false` do sprawdzenia typu",
      "Funkcją, która działa tylko w testach",
    ],
    answer: 0,
    explanation:
      "Po `assertIsString(value)` `value` jest `string` w dalszym kodzie, bez `if`. Jeśli sprawdzenie się nie powiedzie, funkcja rzuca błąd. W przeciwieństwie do type guard (`x is T`) nie trzeba opakowywać wyniku w warunek.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Jak pobrać propsy natywnego przycisku, by rozszerzyć je w swoim komponencie?",
    options: [
      "`React.ComponentProps<'button'>`",
      "`HTMLButtonElement` — typ propsów przycisku",
      "`React.ButtonProps` z pakietu `@types/react`",
    ],
    answer: 0,
    explanation:
      "`type Props = React.ComponentProps<'button'> & { variant: 'primary' | 'ghost' }` — komponent przyjmuje wszystkie natywne atrybuty (`onClick`, `disabled`, `aria-*`). `HTMLButtonElement` to typ węzła DOM, a nie propsów. `ComponentProps<typeof MyComp>` wyciąga propsy dowolnego komponentu.",
    sources: ["ts-react-cheatsheet"],
  },
  {
    question: "Jak otypować hooki Redux Toolkit w aplikacji TypeScript?",
    options: [
      "Wywnioskować `RootState` i `AppDispatch` ze store i utworzyć `useAppSelector`/`useAppDispatch`",
      "Typować każde wywołanie `useSelector` jako `any`",
      "Opisać ręcznie cały interfejs stanu i aktualizować go przy każdej zmianie",
    ],
    answer: 0,
    explanation:
      "`type RootState = ReturnType<typeof store.getState>` i `type AppDispatch = typeof store.dispatch`. Potem `export const useAppSelector = useSelector.withTypes<RootState>()`. Typy są wnioskowane z reducerów; ręczny opis nie jest potrzebny.",
    sources: ["redux-typescript"],
  },
  {
    question: "Jak otypować generyczny komponent listy?",
    code: `function List<T>({ items, render }: {
  items: T[];
  render: (item: T) => React.ReactNode;
}) { /* ... */ }`,
    options: [
      "Zadeklarować parametr typu w funkcji komponentu — TS wywnioskuje `T` z `items`",
      "Generyki nie są obsługiwane w komponentach React z powodu składni JSX",
      "Użyć `React.FC<T>`, gdzie `T` to typ elementu listy",
    ],
    answer: 0,
    explanation:
      "`<List items={users} render={u => u.name} />` — `T` jest wnioskowane jako `User`, a `u` w `render` jest otypowane. W plikach `.tsx` funkcje strzałkowe używają `<T,>`, by parser nie pomylił tego z JSX. `React.FC` nie przepuszcza generyków.",
    sources: ["ts-react-cheatsheet", "ts-generics"],
  },
  {
    question: "Co da `Extract<'a' | 'b' | 1 | 2, string>`?",
    options: ["`'a' | 'b'`", "`1 | 2`", "`never`"],
    answer: 0,
    explanation:
      "`Extract<T, U>` zostawia człony unii przypisywalne do `U` — tu literały stringowe. Przeciwne `Exclude` zostawiłoby `1 | 2`. Oba narzędzia to rozdzielne typy warunkowe.",
    sources: ["ts-utility-types", "ts-conditional"],
  },
  {
    question: "Co zwraca `NonNullable<string | null | undefined>`?",
    options: ["`string`", "`string | undefined`", "`never`"],
    answer: 0,
    explanation:
      "`NonNullable<T>` wyklucza z unii `null` i `undefined`. Obecnie jest zaimplementowane jako `T & {}`. Wygodne dla wartości po sprawdzeniu lub w wynikach `filter`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Czym różnią się jako typy `object`, `{}` i `Record<string, unknown>`?",
    options: [
      "`{}` — wszystko poza null, `object` — nie-prymityw, `Record` — słownik",
      "To trzy synonimy „dowolnego obiektu” w TypeScript",
      "`{}` oznacza tylko pusty obiekt bez żadnej właściwości",
    ],
    answer: 0,
    explanation:
      "`{}` przyjmuje też stringi i liczby — wszystko oprócz `null` i `undefined`, co często zaskakuje. `object` wyklucza prymitywy. `Record<string, unknown>` to obiekt z dowolnymi kluczami-stringami, do wartości którego można się odwoływać. Dla „dowolnej wartości” lepsze jest `unknown`.",
    sources: ["ts-everyday-types", "ts-objects"],
  },
  {
    question: "Jak TypeScript traktuje operator `in` przy zawężaniu?",
    code: `type Fish = { swim(): void };
type Bird = { fly(): void };
function move(a: Fish | Bird) {
  if ('swim' in a) a.swim(); else a.fly();
}`,
    options: [
      "Zawęża unię do członów, które mają właściwość `swim`",
      "Operator `in` nie wpływa na typy",
      "Sprawdza, czy `a` jest tablicą zawierającą string `'swim'`",
    ],
    answer: 0,
    explanation:
      "TS obsługuje zawężanie przez `typeof`, `instanceof`, `in`, porównania równości, prawdziwość i dyskryminatory. W `else` zostaje `Bird`. Dla danych z sieci takie sprawdzenia są częścią walidacji w runtime.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Co robią `-readonly` i `-?` w typie mapowanym?",
    code: `type Mutable<T> = { -readonly [K in keyof T]-?: T[K] };`,
    options: [
      "Usuwają modyfikatory `readonly` i `?` ze wszystkich właściwości",
      "Dodają modyfikatory `readonly` i `?` do wszystkich właściwości",
      "Usuwają z typu właściwości oznaczone `readonly`",
    ],
    answer: 0,
    explanation:
      "Prefiks `-` usuwa modyfikator, `+` (domyślnie) go dodaje. Tak jest zaimplementowane `Required<T>` (`-?`). Wbudowanego `Mutable` nie ma, ale często pisze się go według tego wzorca.",
    sources: ["ts-mapped"],
  },
  {
    question: "Jak zmienić nazwy kluczy w typie mapowanym?",
    code: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};`,
    options: [
      "Przez `as` po `in`, używając template literal",
      "To niemożliwe — klucze w typie mapowanym zawsze pozostają te same",
      "Funkcją `rename()` ze standardowej biblioteki typów",
    ],
    answer: 0,
    explanation:
      "Key remapping (TS 4.1+): `Getters<{ name: string }>` → `{ getName: () => string }`. Jeśli wyrażenie po `as` daje `never`, klucz jest pomijany — tak filtruje się właściwości według typu wartości. `string & K` jest potrzebne, bo klucze mogą być symbolami lub liczbami.",
    sources: ["ts-mapped", "ts-template-literal"],
  },
  {
    question: "Dlaczego `Object.keys(user)` zwraca `string[]`, a nie `(keyof User)[]`?",
    options: [
      "W runtime obiekt może mieć też inne klucze",
      "To znany błąd TypeScript, który zostanie naprawiony w następnej wersji",
      "Bo klucze obiektu są zawsze stringami, nawet liczbowe",
    ],
    answer: 0,
    explanation:
      "Obiekt typu `User` może zawierać dodatkowe właściwości (typ opisuje minimum), więc obietnica `(keyof User)[]` byłaby niebezpieczna. Jeśli masz pewność, użyj asercji typu lub otypowanego wrappera. To świadoma decyzja zespołu TypeScript.",
    sources: ["ts-type-compatibility", "ts-keyof"],
  },
  {
    question: "Co daje flaga `noUncheckedIndexedAccess`?",
    options: [
      "Dostęp przez indeks dostaje typ z `| undefined`",
      "Całkowicie zabrania index signature w typach obiektów",
      "Wyłącza sprawdzanie wyjścia poza zakres dla krotek i tablic",
    ],
    answer: 0,
    explanation:
      "Bez flagi `const x = arr[10]` ma typ `T`, choć w runtime to `undefined`. Z flagą kompilator zmusza do sprawdzenia wartości. Flaga nie jest częścią `strict`, ale często jest zalecana.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Czym `unknown[]` różni się od `any[]` w parametrze funkcji?",
    options: [
      "Z `unknown[]` elementy trzeba zawężać, z `any[]` nie",
      "`unknown[]` przyjmuje tylko tablice obiektów, nie prymitywów",
      "Niczym: oba wyłączają sprawdzanie elementów",
    ],
    answer: 0,
    explanation:
      "Oba przyjmują dowolną tablicę, ale wewnątrz funkcji z `unknown` nie wywołasz metody elementu bez sprawdzenia. Jeśli funkcja nie pracuje z elementami (np. liczy długość), `unknown[]` to bezpieczny wybór. Jeszcze lepszy jest generyk `T[]`, jeśli typ jest ważny dla wyniku.",
    sources: ["ts-everyday-types", "ts-generics"],
  },
  {
    question: "Czym są dekoratory w TypeScript 5?",
    options: [
      "Funkcjami stosowanymi do klas i ich składowych przez `@`",
      "Specjalnymi komentarzami do generowania dokumentacji TSDoc",
      "Składnią do deklarowania komponentów React jako klas",
    ],
    answer: 0,
    explanation:
      "TS 5.0 obsługuje standardowe dekoratory (stage 3) bez flagi. Stare „eksperymentalne” dekoratory (`experimentalDecorators`) z innym API są używane w Angular, NestJS i TypeORM. Zastosowania: logowanie, DI, walidacja, metadane.",
    sources: ["ts-5-0", "ts-decorators"],
  },
  {
    question: "Co robi `import type { User } from './types'`?",
    options: [
      "Importuje tylko typ; import jest usuwany podczas kompilacji",
      "Importuje naraz wartość i jej typ, jak zwykły `import`",
      "Importuje typ w runtime do sprawdzeń `instanceof`",
    ],
    answer: 0,
    explanation:
      "Jawny import tylko typu pomaga transpilerom przetwarzającym pliki pojedynczo: wiedzą na pewno, że import można usunąć. Z flagą `verbatimModuleSyntax` jest to obowiązkowe dla typów. Pozwala też uniknąć niechcianych efektów ubocznych ładowania modułu.",
    sources: ["ts-modules", "ts-tsconfig"],
  },
  {
    question: "Dlaczego do rozszerzania dużych typów obiektowych `interface` jest lepszy niż przecięcie?",
    options: [
      "`extends` wyłapuje konflikty właściwości i jest szybszy dla kompilatora",
      "Przecięcia nie obsługują zagnieżdżonych obiektów i tablic",
      "Interfejsy istnieją w runtime, a przecięcia nie",
    ],
    answer: 0,
    explanation:
      "Przy `interface B extends A` konflikt właściwości to błąd w miejscu deklaracji, a przecięcie po cichu daje `never`. Kompilator cache'uje relacje interfejsów, więc w dużych bazach kodu jest to szybsze — tak zaleca TS performance wiki.",
    sources: ["ts-performance-wiki", "ts-objects"],
  },
  {
    question: "Co zwraca `Parameters<(a: string, b?: number) => void>`?",
    options: ["`[a: string, b?: number]`", "`string | number`", "`{ a: string; b?: number }`"],
    answer: 0,
    explanation:
      "`Parameters` zwraca krotkę parametrów, zachowując opcjonalność i nazwy. Wygodne dla wrapperów: `function logged(...args: Parameters<typeof fn>)`. Dla konstruktorów jest `ConstructorParameters`.",
    sources: ["ts-utility-types"],
  },
  {
    question: "Jak określić typ `this` dla funkcji-handlera?",
    code: `function handler(this: HTMLButtonElement, e: MouseEvent) {
  this.disabled = true;
}`,
    options: [
      "Pierwszy „parametr” `this` ustawia typ kontekstu i jest usuwany przy kompilacji",
      "To zwykły pierwszy parametr, który trzeba przekazać przy wywołaniu",
      "Ta składnia jest zabroniona w trybie strict TypeScript",
    ],
    answer: 0,
    explanation:
      "Pseudoparametr `this` opisuje, z jakim kontekstem funkcja musi być wywołana; nie jest argumentem. Kompilator sprawdza wywołania i użycie `this` wewnątrz. W funkcjach strzałkowych `this` jest leksykalne i nie da się go tak określić.",
    sources: ["ts-functions"],
  },
  {
    question: "Jak najlepiej otypować odpowiedź API, której struktura różni się w zależności od statusu?",
    options: [
      "Unią dyskryminowaną po `ok`: sukces z `data` lub błąd",
      "Jednym wspólnym typem ze wszystkimi polami opcjonalnymi",
      "Typem `any`, bo struktura odpowiedzi nie jest znana z góry",
    ],
    answer: 0,
    explanation:
      "Unia czyni niemożliwe stany niewyrażalnymi: przy `ok: true` `data` jest gwarantowane, a `error` niedostępne. Typ z opcjonalnymi polami dopuszcza bezsensowne kombinacje i wymaga sprawdzeń wszędzie.",
    sources: ["ts-narrowing"],
  },
  {
    question: "Co robi narzędzie `ReadonlyArray<T>` (lub `readonly T[]`)?",
    options: [
      "Usuwa z typu metody mutujące (`push`, `sort`)",
      "Zamraża tablicę w runtime przez `Object.freeze`",
      "Czyni wszystkie elementy tablicy głęboko niezmiennymi",
    ],
    answer: 0,
    explanation:
      "Parametr `readonly T[]` gwarantuje wywołującemu, że funkcja nie zmieni jego tablicy. Przyjmuje też zwykłe tablice. Typ nie zabrania zmieniać zagnieżdżonych obiektów — to płytka ochrona.",
    sources: ["ts-objects"],
  },
  {
    question: "Czym jest `unique symbol`?",
    options: [
      "Typem konkretnego symbolu zadeklarowanego przez `const s = Symbol()`",
      "Dowolną wartością typu `symbol`, w tym `Symbol.for()`",
      "Symbolem, którego nie można użyć jako klucza obiektu",
    ],
    answer: 0,
    explanation:
      "Każdy `const` z `Symbol()` dostaje własny podtyp `unique symbol`, więc TS rozróżnia takie klucze. Używa się tego do „ukrytych” właściwości i oznaczania typów (branding). Zwykły `symbol` opisuje dowolny symbol.",
    sources: ["ts-everyday-types"],
  },
  {
    question: "Jak rozszerzyć typ globalnego obiektu `Window` z modułu?",
    code: `export {};
declare global {
  interface Window { dataLayer: unknown[] }
}`,
    options: [
      "Przez `declare global` i połączenie z interfejsem `Window`",
      "Przez `window.dataLayer = []` — typ wywnioskuje się automatycznie",
      "Przez `type Window = Window & { dataLayer: unknown[] }`",
    ],
    answer: 0,
    explanation:
      "W pliku-module (z `import`/`export`) deklaracje globalne umieszcza się w `declare global`. Interfejs `Window` łączy się z twoim rozszerzeniem. Ponowna deklaracja `type Window` powoduje błąd zduplikowanego identyfikatora.",
    sources: ["ts-declaration-merging", "ts-dts"],
  },
  {
    question: "Jak bezpiecznie otypować wynik `JSON.parse`?",
    options: [
      "Traktować wynik jako `unknown` i walidować go schematem (Zod)",
      "Po prostu napisać `JSON.parse(text) as User` — to wystarczy",
      "Zostawić `any`: TypeScript sam później sprawdzi strukturę",
    ],
    answer: 0,
    explanation:
      "`JSON.parse` zwraca `any`, ale dane zewnętrzne mogą nie spełniać oczekiwań. Schemat (`z.object({...})`) waliduje dane w runtime, a `z.infer<typeof schema>` daje typ TS bez duplikacji. `as User` tylko ukrywa problem.",
    sources: ["ts-narrowing", "ts-everyday-types"],
  },
  {
    question: "Czym `type A = B` różni się od `interface A extends B {}` w podpowiedziach IDE?",
    options: [
      "Interfejs jest pokazywany z nazwy, alias jest rozwijany",
      "Aliasy typów w ogóle nie są pokazywane w podpowiedziach IDE",
      "Niczym: IDE pokazuje je tak samo",
    ],
    answer: 0,
    explanation:
      "Złożone przecięcia i typy mapowane w podpowiedziach są często rozwijane w długie struktury, a interfejs jest pokazywany z nazwy. Wpływa to na czytelność błędów. Do „spłaszczenia” przecięć pisze się helper `Prettify<T>`.",
    sources: ["ts-objects", "ts-performance-wiki"],
  },
  {
    question: "Co daje `paths` w `tsconfig.json`?",
    options: [
      "Aliasy ścieżek importu, np. `@/*` → `./src/*`",
      "Listę plików i folderów do kompilacji",
      "Ścieżki wyjściowe dla skompilowanych plików `.js`",
    ],
    answer: 0,
    explanation:
      "`paths` pozwala pisać `import { Button } from '@/components/button'` zamiast długich ścieżek względnych. To ustawienie rozwiązywania dla kompilatora — bundler musi rozumieć te same aliasy (Next.js i Vite czytają je z tsconfig). Listę plików ustawia `include`, wyjście — `outDir`.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Czym `moduleResolution: 'bundler'` różni się od `'node16'`/`'nodenext'`?",
    options: [
      "`bundler` działa jak bundlery, `nodenext` przestrzega zasad Node.js",
      "`bundler` działa tylko z Webpack 4 i starszymi",
      "To synonimy dla różnych wersji TS",
    ],
    answer: 0,
    explanation:
      "W ESM Node.js trzeba pisać rozszerzenia we względnych importach i uwzględniać `exports`/`type`. Bundlery (Vite, Next.js, esbuild) są w tym pobłażliwe, a tryb `bundler` odwzorowuje ich zachowanie. Dla kodu uruchamianego przez Node.js bez builda wybierz `nodenext`.",
    sources: ["ts-tsconfig", "ts-modules"],
  },
  {
    question: "Co robi flaga `isolatedModules`?",
    options: [
      "Zabrania kodu, którego nie da się transpilować plik po pliku",
      "Kompiluje każdy moduł w osobnym procesie",
      "Izoluje zmienne globalne każdego pliku od siebie",
    ],
    answer: 0,
    explanation:
      "Babel, SWC i esbuild kompilują pliki niezależnie i nie widzą typów z innych modułów. `isolatedModules` ostrzega o kodzie, którego nie mogą poprawnie obsłużyć: reeksport typu bez `export type`, dostęp do `const enum` z innego pliku itd.",
    sources: ["ts-tsconfig"],
  },
  {
    question: "Co robi `keyof typeof obj`?",
    code: `const routes = { home: '/', about: '/about' };
type RouteName = keyof typeof routes;`,
    options: [
      "Pobiera unię kluczy wartości `routes`: `'home' | 'about'`",
      "Pobiera unię wartości: `'/' | '/about'`",
      "Powoduje błąd: `keyof` nie można stosować do `typeof`",
    ],
    answer: 0,
    explanation:
      "`typeof routes` daje typ obiektu, a `keyof` — jego klucze. Dla unii wartości potrzebny jest dostęp indeksowany: `typeof routes[keyof typeof routes]` oraz `as const`, by wartości były literałami.",
    sources: ["ts-keyof", "ts-typeof"],
  },
  {
    question: "Kiedy TS rozszerza typ literalny do ogólnego?",
    options: [
      "W pozycjach mutowalnych: `let`, właściwości obiektów",
      "Nigdy: typy literalne są zawsze zachowywane bez zmian",
      "Tylko przy włączonej fladze `noImplicitAny` w tsconfig",
    ],
    answer: 0,
    explanation:
      "`const a = 'x'` → `'x'`, ale `let b = 'x'` → `string`, a `{ dir: 'left' }` → `{ dir: string }`. Przez to obiektu nie da się przekazać do funkcji oczekującej `'left' | 'right'`. Rozwiązania: `as const`, adnotacja lub `satisfies`.",
    sources: ["ts-everyday-types", "ts-narrowing"],
  },
  {
    question: "Jak uczynić parametr generyczny opcjonalnym z wartością domyślną?",
    options: [
      "`type Box<T = string> = { value: T }`",
      "`type Box<T?> = { value: T }`",
      "`type Box<T | string> = { value: T }`",
    ],
    answer: 0,
    explanation:
      "Parametry typu mogą mieć wartości domyślne: `Box` bez argumentu to `Box<string>`. Można je łączyć z ograniczeniami: `<T extends object = {}>`. Tak działają np. `useState<S = undefined>` i `EventEmitter<T = any>`.",
    sources: ["ts-generics"],
  },
  {
    question: "Jak otypować funkcję-fabrykę, która zwraca ten sam typ, który otrzymała?",
    options: [
      "`function clone<T>(value: T): T`",
      "`function clone(value: any): any`",
      "`function clone(value: object): object`",
    ],
    answer: 0,
    explanation:
      "Generyk zachowuje związek między wejściem a wyjściem: `clone(user)` zwraca `User`. Z `any` i `object` kod wywołujący traci informację o typie i musi rzutować.",
    sources: ["ts-generics"],
  },
  {
    question: "Czym jest typowanie kontekstowe (contextual typing)?",
    options: [
      "Wnioskowaniem typów parametrów funkcji z miejsca jej użycia",
      "Typowaniem zależnym od środowiska (przeglądarka czy Node.js)",
      "Określaniem typu przez komentarz JSDoc",
    ],
    answer: 0,
    explanation:
      "W `button.addEventListener('click', e => ...)` typ `e` (`MouseEvent`) jest wnioskowany z sygnatury `addEventListener`. Tak samo działają callbacki `map`, handlery JSX i settery `useState`. Jeśli wyniesiesz funkcję do osobnej zmiennej, kontekst przepada — trzeba będzie ją otypować.",
    sources: ["ts-functions", "ts-everyday-types"],
  },
];

export default questions;
