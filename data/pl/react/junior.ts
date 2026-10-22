import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Czym jest React?",
    options: [
      "Pełnym frameworkiem z routingiem, klientem HTTP i ORM w zestawie",
      "Biblioteką do budowania interfejsów użytkownika z komponentów",
      "Językiem programowania kompilowanym do JavaScriptu",
    ],
    answer: 1,
    explanation:
      "React odpowiada tylko za UI: opisuje interfejs jako funkcję stanu i wydajnie aktualizuje DOM. Routing, ładowanie danych i resztę dają biblioteki (React Router, TanStack Query) lub frameworki zbudowane na React (Next.js). JSX to rozszerzenie składni JavaScriptu, a nie osobny język.",
    sources: ["react-learn", "react-thinking"],
  },
  {
    question: "Czym jest wirtualny DOM w React?",
    options: [
      "Ukrytą kopią silnika przeglądarki, w której React z góry renderuje stronę",
      "Opisem UI w JS: React porównuje go z poprzednim i nanosi tylko różnicę",
      "Wbudowanym w przeglądarkę API, które przyspiesza wszelkie operacje na drzewie DOM",
    ],
    answer: 1,
    explanation:
      "Podczas renderowania komponenty zwracają drzewo elementów React — zwykłych obiektów JS. React porównuje nowe drzewo z poprzednim (rekoncyliacja) i nanosi minimalne zmiany do prawdziwego DOM. To nie jest API przeglądarki ani kopia przeglądarki.",
    sources: ["react-render-commit", "react-legacy-reconciliation"],
  },
  {
    question: "W co zamienia się JSX podczas budowania?",
    options: [
      "W string HTML, który React potem wstawia na stronę przez `innerHTML`",
      "W wywołania funkcji tworzących elementy React (`jsx()`)",
      "W szablony `<template>`, które przeglądarka parsuje przy ładowaniu strony",
    ],
    answer: 1,
    explanation:
      "`<h1 className=\"t\">Hi</h1>` jest kompilowane (przez Babel, SWC, TypeScript) do wywołania w stylu `jsx(\"h1\", { className: \"t\", children: \"Hi\" })`, które zwraca obiekt-opis. Przeglądarki nie rozumieją JSX, a React nie używa `innerHTML` — dlatego stringi w JSX są automatycznie escapowane.",
    sources: ["react-jsx"],
  },
  {
    question: "Jak ustawić klasę CSS na elemencie w JSX?",
    options: ["`<div class=\"box\">`", "`<div className=\"box\">`", "`<div cssClass=\"box\">`"],
    answer: 1,
    explanation:
      "JSX jest bliższy JavaScriptowi, a `class` to słowo zastrzeżone, więc atrybuty nazywa się jak właściwości DOM: `className`, `htmlFor` zamiast `for`, `tabIndex`, `onClick`. Atrybuty `data-*` i `aria-*` pisze się jak w HTML.",
    sources: ["react-jsx", "react-dom-common"],
  },
  {
    question: "Dlaczego nie można napisać `{if (isAdmin) { <Admin /> }}` wewnątrz JSX?",
    options: [
      "W nawiasach klamrowych dozwolone są tylko wyrażenia, a `if` to instrukcja",
      "Bo React zastąpił `if` specjalnym komponentem `<If>`",
      "Można, ale tylko wewnątrz komponentów klasowych",
    ],
    answer: 0,
    explanation:
      "Wewnątrz `{}` można umieścić dowolne wyrażenie JS dające wartość: zmienną, wywołanie funkcji, ternarny `cond ? a : b`, `cond && a`. Instrukcje (`if`, `for`) stosuje się poza JSX — przed `return` lub w osobnej funkcji. React nie ma komponentu `<If>`.",
    sources: ["react-conditional", "react-jsx"],
  },
  {
    question: "Dlaczego komponent `function card() { ... }` nie działa jako `<card />`?",
    options: [
      "Komponenty trzeba deklarować tylko funkcjami strzałkowymi, a nie `function`",
      "JSX traktuje nazwy pisane małą literą jako znaczniki HTML",
      "Komponent musi mieć `export default`, inaczej JSX go nie znajdzie",
    ],
    answer: 1,
    explanation:
      "JSX rozróżnia znaczniki po wielkości liter: `<card />` staje się elementem DOM `card`, a `<Card />` — wywołaniem twojego komponentu. Forma deklaracji (funkcja czy strzałka) i sposób eksportu nie mają znaczenia.",
    sources: ["react-learn", "react-jsx"],
  },
  {
    question: "Jak zwrócić z komponentu dwa sąsiednie elementy bez dodatkowego wrappera w DOM?",
    options: [
      "Zwrócić tablicę bez kluczy: `return [<A />, <B />]`",
      "Opakować je we fragment: `<>...</>` lub `<Fragment>`",
      "To niemożliwe — komponent zawsze dodaje `<div>`",
    ],
    answer: 1,
    explanation:
      "Komponent musi zwracać jeden korzeń. Fragment grupuje elementy bez dodawania węzła DOM. Jeśli fragment potrzebuje `key` (np. w liście), użyj pełnej formy `<Fragment key={id}>`. Tablica też jest dozwolona, ale każdy element potrzebuje `key`, inaczej pojawi się ostrzeżenie.",
    sources: ["react-fragment", "react-jsx"],
  },
  {
    question: "Czy można zmieniać propsy wewnątrz komponentu potomnego?",
    options: [
      "Tak: React zauważy zmianę i przerenderuje komponent rodzica",
      "Nie: propsy są tylko do odczytu; dane powinien zmieniać ich właściciel",
      "Tak, jeśli prop jest obiektem lub tablicą, a nie prymitywem",
    ],
    answer: 1,
    explanation:
      "Propsy to dane wejściowe komponentu i nie wolno ich mutować. Aby dziecko mogło zmienić dane, rodzic przekazuje mu callback (`onChange`) i sam trzyma stan. Mutacja obiektu z propsów nie wywoła re-renderu i tworzy trudne do znalezienia błędy.",
    sources: ["react-props", "react-pure"],
  },
  {
    question: "Jak komponent potomny może przekazać dane rodzicowi?",
    options: [
      "Rodzic przekazuje callback przez propsy, a dziecko wywołuje go z danymi",
      "Dziecko mutuje obiekt propsów, a rodzic widzi nową wartość",
      "Przez `this.parent.setState()` wewnątrz komponentu potomnego",
    ],
    answer: 0,
    explanation:
      "W React dane płyną w dół, a zdarzenia w górę przez funkcje: `<Search onChange={setQuery} />`, a dziecko wywołuje `props.onChange(value)`. Mutacja propsów nie przerenderuje rodzica, a komponenty funkcyjne nie mają dostępu do instancji rodzica.",
    sources: ["react-sharing-state", "react-events"],
  },
  {
    question: "Czym jest `children` w React?",
    options: [
      "Propem z treścią przekazaną między znacznikami komponentu",
      "Globalną tablicą wszystkich komponentów potomnych aplikacji",
      "Wbudowanym hookiem do dostępu do zagnieżdżonych elementów DOM komponentu",
    ],
    answer: 0,
    explanation:
      "`<Card><h2>Title</h2></Card>` przekazuje `<h2>` w `props.children`. To podstawa kompozycji: wrappery, layouty i modale przyjmują dowolną treść. `children` może być stringiem, elementem, tablicą lub funkcją (wzorzec render props).",
    sources: ["react-props"],
  },
  {
    question: "Co zwraca `useState(0)`?",
    options: [
      "Obiekt `{ value, setValue }`",
      "Tablicę z bieżącą wartością i funkcją do jej aktualizacji",
      "Tylko bieżącą wartość; aktualizacje idą przez `this.setState`",
    ],
    answer: 1,
    explanation:
      "`const [count, setCount] = useState(0)` — destrukturyzacja tablicy pozwala dowolnie nazwać zmienne. Wartość początkowa jest używana tylko przy pierwszym renderze. Jeśli jej obliczenie jest kosztowne, przekaż funkcję: `useState(() => compute())`.",
    sources: ["react-useState", "react-state-memory"],
  },
  {
    question: "Co wypisze `console.log` po kliknięciu?",
    code: `const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count);
}`,
    options: ["`1`", "`0`", "`undefined`"],
    answer: 1,
    explanation:
      "Stan w obrębie renderu to „migawka”. `setCount` planuje nowy render, ale zmienna `count` w bieżącej funkcji pozostaje ta sama. Nowa wartość jest dostępna w następnym renderze. Jeśli potrzebujesz wartości od razu, oblicz ją do zmiennej: `const next = count + 1`.",
    sources: ["react-state-snapshot", "react-useState"],
  },
  {
    question: "Ile wyniesie `count` po jednym kliknięciu, jeśli wartość początkowa to 0?",
    code: `function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}`,
    options: ["`3`", "`1`", "`0`"],
    answer: 1,
    explanation:
      "Wszystkie trzy wywołania widzą tę samą migawkę `count = 0` i trzy razy kolejkują wartość `1`. Aby aktualizacje się sumowały, użyj formy funkcyjnej: `setCount(c => c + 1)` — każde wywołanie dostaje poprzedni wynik, a suma to 3.",
    sources: ["react-queueing-updates", "react-useState"],
  },
  {
    question: "Dlaczego komponent się nie przerenderował?",
    code: `const [user, setUser] = useState({ name: "Ann" });

function rename() {
  user.name = "Bob";
  setUser(user);
}`,
    options: [
      "`setUser` nie można wywoływać w handlerach zdarzeń — tylko w efektach",
      "Obiekt został zmutowany, referencja jest ta sama — `Object.is` nie widzi zmiany",
      "W `useState` nie można przechowywać obiektów — tylko wartości prymitywne",
    ],
    answer: 1,
    explanation:
      "React porównuje nową wartość ze starą przez `Object.is`. To ten sam obiekt, więc aktualizacja jest pomijana. Trzeba utworzyć nowy obiekt: `setUser({ ...user, name: \"Bob\" })`. Mutacja psuje też optymalizacje typu `memo`.",
    sources: ["react-updating-objects", "react-useState"],
  },
  {
    question: "Jak poprawnie dodać element do tablicy w stanie?",
    options: [
      "`items.push(item); setItems(items);`",
      "`setItems([...items, item]);`",
      "`setItems(items.concat).push(item);`",
    ],
    answer: 1,
    explanation:
      "Stan trzeba aktualizować niemutowalnie — tworząc nową tablicę. `push` mutuje istniejącą tablicę, a referencja się nie zmienia. Niemutujące metody: spread, `concat`, `filter`, `map`, `slice`, `toSorted()`. Usuwanie: `items.filter(i => i.id !== id)`.",
    sources: ["react-updating-arrays"],
  },
  {
    question: "Jaka wartość najlepiej nadaje się na `key` w liście?",
    options: [
      "Indeks elementu w tablicy — jest zawsze unikalny w obrębie listy",
      "Stabilny unikalny identyfikator z danych, np. `id`",
      "`Math.random()` lub `crypto.randomUUID()` przy każdym renderze",
    ],
    answer: 1,
    explanation:
      "`key` pomaga React dopasować elementy między renderami. Indeks psuje się przy wstawianiu, usuwaniu i sortowaniu: stan pól i DOM „przeskakują” na inne elementy. Losowy klucz zmienia się przy każdym renderze — React odtwarza wszystkie elementy i traci ich stan.",
    sources: ["react-lists", "react-preserving-state"],
  },
  {
    question: "Co zostanie wyrenderowane, jeśli `items = []`?",
    code: `<div>{items.length && <List items={items} />}</div>`,
    options: ["Nic się nie wyrenderuje", "Wyrenderuje się cyfra `0`", "Wyrenderuje się tekst `false`"],
    answer: 1,
    explanation:
      "`0 && x` zwraca `0`, a React renderuje liczby jako tekst (w przeciwieństwie do `false`, `null`, `undefined`). Pisz jawny warunek logiczny: `items.length > 0 && ...` lub ternarny `items.length ? <List /> : null`.",
    sources: ["react-conditional"],
  },
  {
    question: "Co jest nie tak z `<button onClick={handleClick()}>`?",
    options: [
      "Nic, to standardowa składnia",
      "Funkcja jest wywoływana od razu podczas renderu, a nie po kliknięciu",
      "W JSX handlery pisze się jako string: `onClick=\"handleClick()\"`",
    ],
    answer: 1,
    explanation:
      "`onClick` potrzebuje funkcji, a nie wyniku jej wywołania. Poprawnie: `onClick={handleClick}` lub `onClick={() => handleClick(id)}`, jeśli potrzebne są argumenty. Jeśli `handleClick` zmienia stan, wywołanie podczas renderu powoduje nieskończoną pętlę.",
    sources: ["react-events"],
  },
  {
    question: "Jak w React anulować domyślne wysyłanie formularza?",
    options: [
      "Zwrócić `false` z handlera `onSubmit` formularza",
      "Wywołać `e.preventDefault()` w handlerze `onSubmit`",
      "Dodać atrybut `noSubmit` do znacznika `<form>` w JSX",
    ],
    answer: 1,
    explanation:
      "W React handlery dostają syntetyczne zdarzenie z tym samym API co natywne. `return false`, jak w starych handlerach inline w HTML, tu nie działa. Propagację można zatrzymać przez `e.stopPropagation()`.",
    sources: ["react-events"],
  },
  {
    question: "Czym jest kontrolowane pole (controlled input)?",
    options: [
      "Polem, którego wartość jest przechowywana w stanie: `value` + `onChange`",
      "Polem zarządzanym przez przeglądarkę, którego wartość React czyta przez `ref`",
      "Polem z atrybutem `required`, kontrolowanym przez walidację przeglądarki",
    ],
    answer: 0,
    explanation:
      "W polu kontrolowanym źródłem prawdy jest stan: `value={text}` i `onChange={e => setText(e.target.value)}`. Ułatwia to walidację i formatowanie wpisywanych danych w locie. Pole niekontrolowane trzyma wartość w DOM (`defaultValue`, odczyt przez `ref` lub `FormData`).",
    sources: ["react-input"],
  },
  {
    question: "React ostrzega: „You provided a `value` prop to a form field without an `onChange` handler”. Co się stało?",
    options: [
      "Pole stało się tylko do odczytu: `value` jest ustawione, a `onChange` nie",
      "Kontrolowanego pola nie można używać wewnątrz znacznika `<form>`",
      "`value` musi być liczbą, a przekazano string",
    ],
    answer: 0,
    explanation:
      "Jeśli ustawisz `value` bez `onChange`, React przy każdym renderze przywraca pole do tej wartości i użytkownik nie może pisać. Rozwiązania: dodać `onChange`, użyć `defaultValue` dla pola niekontrolowanego lub jawnie ustawić `readOnly`.",
    sources: ["react-input"],
  },
  {
    question: "Dwa sąsiednie komponenty potrzebują tych samych danych, które mogą zmieniać. Co zrobić najpierw?",
    options: [
      "Skopiować stan do obu komponentów i synchronizować przez `useEffect`",
      "Przenieść stan do wspólnego rodzica i przekazać wartość oraz callbacki przez propsy",
      "Od razu dodać Redux",
    ],
    answer: 1,
    explanation:
      "Podnoszenie stanu (lifting state up) to podstawowa technika: dane powinny mieć jedno źródło prawdy w najbliższym wspólnym przodku. Duplikowanie stanu i synchronizowanie efektami prowadzi do rozjazdów i zbędnych renderów. Globalne store'y są potrzebne, gdy stan jest naprawdę używany w wielu miejscach drzewa.",
    sources: ["react-sharing-state"],
  },
  {
    question: "Czym jest prop drilling?",
    options: [
      "Przekazywaniem propsów przez pośrednie komponenty, które ich nie potrzebują",
      "Sprawdzaniem typów propsów w czasie działania przez `PropTypes`",
      "Optymalizacją renderu: przekazywaniem propsów przez `React.memo`",
    ],
    answer: 0,
    explanation:
      "Gdy dane z korzenia są potrzebne głęboko w dole, trzeba je przekazywać przez każdy poziom. Jest to niewygodne, ale nie zawsze stanowi problem. Rozwiązania: kompozycja (przekazywanie gotowych elementów przez `children`), Context, globalne store'y.",
    sources: ["react-context-learn", "react-sharing-state"],
  },
  {
    question: "Kiedy wykonuje się efekt `useEffect(() => { ... }, [])`?",
    options: [
      "Przed każdym renderem komponentu, by przygotować dane",
      "Po zamontowaniu (w dev ze StrictMode dwukrotnie)",
      "Tylko przy odmontowaniu komponentu, jak `componentWillUnmount`",
    ],
    answer: 1,
    explanation:
      "Pusta tablica zależności oznacza „synchronizuj po zamontowaniu”. Efekty zawsze uruchamiają się po malowaniu, a nie przed. W trybie deweloperskim StrictMode montuje, odmontowuje i ponownie montuje komponent, by sprawdzić, czy czyszczenie efektu jest napisane poprawnie.",
    sources: ["react-useEffect", "react-strict-mode"],
  },
  {
    question: "Kiedy wykonuje się efekt bez tablicy zależności: `useEffect(() => { ... })`?",
    options: [
      "Tylko raz — zaraz po zamontowaniu komponentu",
      "Po każdym renderze komponentu",
      "Nigdy: bez tablicy zależności efekt się nie uruchamia",
    ],
    answer: 1,
    explanation:
      "Bez drugiego argumentu efekt uruchamia się po każdym renderze. Z `[]` — tylko po zamontowaniu. Z `[a, b]` — po zamontowaniu i przy każdej zmianie `a` lub `b` (porównanie przez `Object.is`).",
    sources: ["react-useEffect", "react-sync-effects"],
  },
  {
    question: "Kiedy wywoływana jest funkcja zwrócona z `useEffect`?",
    options: [
      "Przed ponownym uruchomieniem efektu i przy odmontowaniu komponentu",
      "Zaraz po wykonaniu efektu, w tej samej klatce",
      "Tylko jeśli wewnątrz efektu został rzucony wyjątek",
    ],
    answer: 0,
    explanation:
      "Funkcja czyszcząca cofa to, co ustawił efekt: wypisuje się ze zdarzeń, czyści timery, anuluje żądania. React wywołuje ją przed kolejnym uruchomieniem efektu z nowymi zależnościami i przy usuwaniu komponentu.",
    sources: ["react-useEffect", "react-sync-effects"],
  },
  {
    question: "Czym `useRef` różni się od `useState`?",
    options: [
      "Zmiana `ref.current` nie wywołuje re-renderu",
      "`useRef` można używać tylko do referencji do DOM",
      "Wartość `useRef` jest resetowana przy każdym renderze",
    ],
    answer: 0,
    explanation:
      "`useRef` przechowuje mutowalną wartość między renderami, nie wywołując re-renderu. Służy do referencji do DOM (`<input ref={inputRef}>`), identyfikatorów timerów i poprzednich wartości. Jeśli wartość wpływa na to, co widać na ekranie, powinna być w stanie.",
    sources: ["react-useRef", "react-refs-learn"],
  },
  {
    question: "Która zasada hooków jest złamana?",
    code: `function Profile({ id }) {
  if (!id) return null;
  const [data, setData] = useState(null);
  // ...
}`,
    options: [
      "Hooków nie można używać w komponentach przyjmujących propsy",
      "Hook jest wywoływany po warunkowym `return` — zmienia się kolejność hooków",
      "Nic nie jest złamane: wczesny `return` z hookami jest dozwolony",
    ],
    answer: 1,
    explanation:
      "React dopasowuje stan do hooków według kolejności ich wywołań. Jeśli hook nie zostanie wywołany w którymś renderze (z powodu wczesnego `return`, warunku lub pętli), kolejność się psuje. Wywołuj hooki na najwyższym poziomie, przed jakimikolwiek warunkowymi wyjściami.",
    sources: ["react-rules-of-hooks"],
  },
  {
    question: "Dlaczego nazwa własnego hooka musi zaczynać się od `use`?",
    options: [
      "Inaczej bundler nie będzie mógł wyeksportować go z modułu",
      "Tak linter i React wiedzą, że zawiera on hooki",
      "Prefiks `use` włącza automatyczną memoizację wyniku",
    ],
    answer: 1,
    explanation:
      "Prefiks `use` to konwencja, na której opierają się `eslint-plugin-react-hooks` i React Compiler. Sam w sobie niczego nie memoizuje. Funkcji bez hooków w środku nie należy nazywać `use...` — to zwykła funkcja pomocnicza.",
    sources: ["react-custom-hooks", "react-rules-of-hooks"],
  },
  {
    question: "Kiedy domyślnie przerenderowuje się komponent potomny?",
    options: [
      "Tylko gdy zmienią się jego propsy (po referencji)",
      "Gdy przerenderuje się rodzic, nawet jeśli propsy są te same",
      "Tylko gdy zmieni się jego własny stan lub kontekst",
    ],
    answer: 1,
    explanation:
      "Render rodzica domyślnie przerenderowuje całe poddrzewo. Inne przyczyny: zmiana własnego stanu i zmiana czytanego kontekstu. `React.memo` (lub automatycznie React Compiler) pozwala pominąć render przy równych propsach. Re-render to nie zmiana DOM: DOM zmienia się tylko, gdy jest różnica.",
    sources: ["react-render-commit", "react-memo"],
  },
  {
    question: "Jak ustawić styl inline w JSX?",
    options: [
      "`style=\"color: red; font-size: 14px\"`",
      "`style={{ color: \"red\", fontSize: 14 }}`",
      "`style={[\"color: red\", \"font-size: 14px\"]}`",
    ],
    answer: 1,
    explanation:
      "`style` przyjmuje obiekt z właściwościami w camelCase. Zewnętrzne nawiasy osadzają wyrażenie, wewnętrzne to literał obiektu. Dla większości właściwości wartości liczbowe są interpretowane jako piksele (`fontSize: 14` → `14px`).",
    sources: ["react-dom-common"],
  },
  {
    question: "Jakie kroki są potrzebne, by przekazać dane przez Context?",
    options: [
      "`createContext` → provider z `value` → `useContext` w potomku",
      "Zadeklarować zmienną globalną w module i importować ją do komponentów",
      "Przekazywać dane w `children` każdego komponentu po drodze",
    ],
    answer: 0,
    explanation:
      "`const ThemeContext = createContext('light')` → `<ThemeContext value={theme}>` (w React 19 można pominąć `.Provider`) → `useContext(ThemeContext)` w dowolnym potomku. Gdy `value` się zmienia, przerenderowują się wszystkie komponenty czytające ten kontekst.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "Co zwraca `useContext(MyContext)`, jeśli nad komponentem nie ma providera?",
    options: [
      "Zawsze `undefined`; wartość domyślna jest ignorowana",
      "Wartość domyślną z `createContext(defaultValue)`",
      "React rzuca błąd „Provider is missing”",
    ],
    answer: 1,
    explanation:
      "Wartość domyślna jest używana, gdy wyżej w drzewie nie ma providera. Często ustawia się ją na `null` i robi hook-opakowanie, który rzuca czytelny błąd: „useAuth must be used within AuthProvider”.",
    sources: ["react-useContext", "react-context-learn"],
  },
  {
    question: "Dlaczego `<StrictMode>` w trybie deweloperskim wywołuje render i efekty dwukrotnie?",
    options: [
      "Aby rozgrzać cache i przyspieszyć pierwsze ładowanie strony",
      "Aby ujawnić nieczyste rendery i efekty bez czyszczenia",
      "To znany błąd React 18; lepiej wyłączyć StrictMode",
    ],
    answer: 1,
    explanation:
      "Podwójne wywołanie pomaga znaleźć efekty uboczne podczas renderu (mutacje, żądania) i brak czyszczenia w efektach. W buildzie produkcyjnym się nie dzieje. Jeśli podwójne wywołanie coś psuje, w kodzie jest błąd, który i tak kiedyś się ujawni.",
    sources: ["react-strict-mode", "react-pure"],
  },
  {
    question: "Do czego służy `React.lazy`?",
    options: [
      "Do leniwego ładowania kodu komponentu jako osobnego chunka",
      "Do odroczenia renderu komponentu, aż wejdzie w viewport",
      "Do odraczania aktualizacji stanu",
    ],
    answer: 0,
    explanation:
      "`const Admin = lazy(() => import('./Admin'))` wydziela komponent do osobnego chunka JS ładowanego przy pierwszym renderze. Zmniejsza to początkową paczkę. Pokazywanie treści podczas przewijania to inne zadanie (Intersection Observer).",
    sources: ["react-lazy", "mdn-dynamic-import"],
  },
  {
    question: "Czego potrzebuje `React.lazy`, by działać?",
    options: [
      "Opakowania go (lub przodka) w `<Suspense fallback>`",
      "Wywołania `lazy` wewnątrz `useEffect` po zamontowaniu",
      "Dodania atrybutu `async` do leniwego komponentu",
    ],
    answer: 0,
    explanation:
      "Podczas ładowania kodu komponent „zawiesza się”, a najbliższy `<Suspense>` pokazuje swój `fallback`. Deklaruj `lazy` na poziomie modułu, a nie wewnątrz komponentu — inaczej każdy render tworzy nowy komponent i traci stan. Moduł musi mieć eksport `default`.",
    sources: ["react-lazy", "react-suspense"],
  },
  {
    question: "Dlaczego `lazy(() => import('./Chart'))` zawodzi, jeśli `Chart.tsx` ma tylko `export function Chart`?",
    options: [
      "`lazy` oczekuje modułu z eksportem `default`",
      "`lazy` nie obsługuje plików TypeScript `.tsx`",
      "Komponent dla `lazy` musi być komponentem klasowym",
    ],
    answer: 0,
    explanation:
      "Promise z `import()` musi rozwiązywać się do obiektu z polem `default`. Dla eksportu nazwanego trzeba go zmapować: `lazy(() => import('./Chart').then(m => ({ default: m.Chart })))`. TypeScript i komponenty funkcyjne są w pełni obsługiwane.",
    sources: ["react-lazy"],
  },
  {
    question: "Co jest niebezpiecznego w `dangerouslySetInnerHTML`?",
    options: [
      "Spowalnia renderowanie dziesiątki razy z powodu parsowania",
      "Wstawia HTML bez escapowania — ryzyko XSS",
      "Działa tylko w komponentach klasowych React",
    ],
    answer: 1,
    explanation:
      "React normalnie escapuje stringi, więc `{userInput}` jest bezpieczne. `dangerouslySetInnerHTML={{ __html }}` wstawia markup bez zmian, a `<img onerror=...>` z danych użytkownika uruchomi skrypt. Jeśli naprawdę potrzebujesz HTML (np. z CMS), oczyść go sanitizerem (DOMPurify).",
    sources: ["react-dom-common", "mdn-xss"],
  },
  {
    question: "Jak w React 18+ podpiąć aplikację do elementu DOM?",
    options: [
      "`ReactDOM.render(<App />, el)`",
      "`createRoot(el).render(<App />)`",
      "`React.mount(<App />, el)`",
    ],
    answer: 1,
    explanation:
      "`createRoot` z `react-dom/client` włącza współbieżne możliwości React 18+. `ReactDOM.render` jest przestarzałe i usunięte w React 19. Do hydratacji HTML wyrenderowanego na serwerze używa się `hydrateRoot`. Frameworki takie jak Next.js robią to automatycznie.",
    sources: ["react-createRoot", "react-18"],
  },
  {
    question: "Czym jest „czysty” komponent w rozumieniu React?",
    options: [
      "Komponentem bez stylów i bez zależności od CSS",
      "Komponentem bez efektów ubocznych w renderze i z tym samym JSX dla tych samych danych",
      "Każdym komponentem dziedziczącym po `React.PureComponent`",
    ],
    answer: 1,
    explanation:
      "Renderowanie musi być czystym obliczeniem: bez mutowania zewnętrznych zmiennych, bez żądań, bez zmian DOM. Efekty uboczne należą do handlerów zdarzeń lub `useEffect`. Na czystości opierają się StrictMode, renderowanie współbieżne i React Compiler.",
    sources: ["react-pure"],
  },
  {
    question: "Jak wyrenderować listę użytkowników z tablicy `users`?",
    options: [
      "`{users.forEach(u => <li key={u.id}>{u.name}</li>)}`",
      "`{users.map(u => <li key={u.id}>{u.name}</li>)}`",
      "`{for (const u of users) <li>{u.name}</li>}`",
    ],
    answer: 1,
    explanation:
      "`map` zwraca nową tablicę elementów, którą React renderuje. `forEach` zwraca `undefined`, więc nic się nie pojawi. `for` to instrukcja i nie można jej pisać wewnątrz `{}`. I nie zapomnij o `key`.",
    sources: ["react-lists"],
  },
  {
    question: "Czym jest Redux?",
    options: [
      "Biblioteką do żądań REST API z cache'owaniem odpowiedzi",
      "Globalnym magazynem stanu: store, akcje, reducery",
      "Wbudowanym hookiem React dla globalnego stanu aplikacji",
    ],
    answer: 1,
    explanation:
      "W Redux stan żyje w jednym store, zmienia się tylko przez dispatch akcji, a nowy stan obliczają czyste funkcje-reducery. Daje to przewidywalność, wygodne debugowanie (Redux DevTools, time travel) i middleware. Redux to osobna biblioteka, podłączana do React przez `react-redux`.",
    sources: ["redux-essentials"],
  },
  {
    question: "Czego wymaga się od reducera w klasycznym Redux (bez Immer)?",
    options: [
      "Ma być czysty i zwracać nowy stan bez mutacji",
      "Ma być asynchroniczny i samodzielnie wykonywać żądania do API",
      "Ma zmieniać `state` bezpośrednio i niczego nie zwracać",
    ],
    answer: 0,
    explanation:
      "`(state, action) => newState` bez efektów ubocznych: bez żądań, liczb losowych i mutacji. Logika asynchroniczna trafia do thunków lub RTK Query. W Redux Toolkit można pisać „mutujący” kod — Immer pod spodem zamienia go na niemutowalne aktualizacje.",
    sources: ["redux-essentials", "redux-style-guide"],
  },
  {
    question: "Co robi `configureStore` z Redux Toolkit?",
    options: [
      "Tworzy store z rozsądnymi ustawieniami domyślnymi: thunk, DevTools",
      "Generuje reducery i akcje z opisu schematu danych",
      "Podłącza store do komponentów React bez `<Provider>`",
    ],
    answer: 0,
    explanation:
      "`configureStore({ reducer: { todos: todosReducer } })` łączy reducery, dodaje middleware `redux-thunk`, podłącza Redux DevTools, a w trybie deweloperskim sprawdza przypadkowe mutacje i nieserializowalne wartości. Podłączenie do React nadal robi się przez `<Provider store={store}>`.",
    sources: ["rtk-configureStore", "redux-why-rtk"],
  },
  {
    question: "Do czego służą `useSelector` i `useDispatch`?",
    options: [
      "`useSelector` czyta dane ze store, `useDispatch` daje `dispatch`",
      "`useSelector` znajduje element DOM, `useDispatch` wyzwala zdarzenie DOM",
      "Oba hooki tworzą osobny lokalny store dla komponentu",
    ],
    answer: 0,
    explanation:
      "`const todos = useSelector(state => state.todos)` przerenderowuje komponent tylko wtedy, gdy wynik selektora się zmienił (po referencji). `const dispatch = useDispatch(); dispatch(added(todo))`. Projekty w TypeScript tworzą otypowane wersje `useAppSelector` i `useAppDispatch`.",
    sources: ["react-redux-hooks"],
  },
  {
    question: "Co generuje `createSlice`?",
    options: [
      "Tylko reducer; action creatory trzeba napisać ręcznie",
      "Reducer i action creatory dla każdego case reducera",
      "Komponent React i hook do wyświetlania stanu slice'a",
    ],
    answer: 1,
    explanation:
      "`createSlice({ name: 'todos', initialState, reducers: { added(state, action) {...} } })` zwraca `todosSlice.reducer` i `todosSlice.actions.added` z typem `'todos/added'`. Usuwa to boilerplate klasycznego Redux ze stałymi typów i switchem.",
    sources: ["rtk-createSlice"],
  },
  {
    question: "Jaki problem przede wszystkim rozwiązuje TanStack Query?",
    options: [
      "Stan serwerowy: pobieranie, cache'owanie, aktualizację danych w tle",
      "Routing między stronami z wcześniejszym ładowaniem danych",
      "Globalny stan UI: czy modal jest otwarty, bieżący motyw",
    ],
    answer: 0,
    explanation:
      "Dane serwerowe żyją na backendzie i mogą się zdezaktualizować. TanStack Query zajmuje się cache'owaniem, ponowieniami, deduplikacją, odświeżaniem przy fokusie okna, paginacją i mutacjami. Kliencki stan UI zostaje w `useState`, Context lub Zustand/Redux.",
    sources: ["tq-overview"],
  },
  {
    question: "Co trzeba przekazać do `useQuery`?",
    options: [
      "`url`, `method` i `headers`",
      "`queryKey` i `queryFn`",
      "`store`, `reducer` i `action`",
    ],
    answer: 1,
    explanation:
      "`useQuery({ queryKey: ['todos', id], queryFn: () => fetchTodo(id) })`. Klucz identyfikuje dane w cache: wszystko, od czego zależy żądanie, musi być w kluczu — wtedy żądanie powtórzy się przy zmianie `id`. `queryFn` to dowolna funkcja zwracająca promise; biblioteka nie jest powiązana z `fetch`.",
    sources: ["tq-queries", "tq-query-keys"],
  },
  {
    question: "Czym różnią się `isPending` i `isFetching` w TanStack Query v5?",
    options: [
      "To synonimy: oba są true, gdy trwa żądanie",
      "`isPending` — jeszcze nie ma danych, `isFetching` — trwa dowolne żądanie",
      "`isPending` — żądanie się nie powiodło, `isFetching` — powiodło się",
    ],
    answer: 1,
    explanation:
      "`isPending` (status `pending`) oznacza, że w cache nie ma jeszcze danych — pokaż szkielet. `isFetching` jest true przy każdym żądaniu, także przy odświeżaniu istniejących danych w tle — pasuje tu mały wskaźnik. W v4 zamiast `isPending` używano `isLoading`.",
    sources: ["tq-queries"],
  },
  {
    question: "Co trzeba zrobić przed użyciem `useQuery` w aplikacji?",
    options: [
      "Utworzyć `QueryClient` i opakować aplikację w jego provider",
      "Nic: `useQuery` tworzy globalny cache przy pierwszym wywołaniu",
      "Dodać store Redux, w którym TanStack Query trzyma swój cache",
    ],
    answer: 0,
    explanation:
      "`QueryClient` przechowuje cache i ustawienia domyślne, a provider udostępnia go hookom. Utwórz klienta raz (poza komponentem lub przez `useState`), inaczej cache będzie resetowany przy każdym renderze. TanStack Query nie potrzebuje Redux.",
    sources: ["tq-overview"],
  },
];

export default questions;
