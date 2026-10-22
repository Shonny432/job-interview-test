import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Kiedy React zachowuje stan komponentu między renderami?",
    options: [
      "Dopóki ten sam typ komponentu pozostaje na tej samej pozycji",
      "Dopóki propsy komponentu nie zmieniły się po referencji",
      "Zawsze, aż do przeładowania całej strony",
    ],
    answer: 0,
    explanation:
      "Stan jest przypisany do pozycji w drzewie UI, a nie do zmiennej. Jeśli w tym samym miejscu wyrenderuje się inny typ (`<input>` zamiast `<textarea>`, inny komponent), poddrzewo jest odtwarzane i stan przepada. Dlatego nie wolno deklarować komponentów wewnątrz innych komponentów: każdy render tworzy nowy typ.",
    sources: ["react-preserving-state"],
  },
  {
    question: "Jak zresetować stan `<EditForm />` przy przejściu do innego użytkownika?",
    options: [
      "Wyzerować wszystkie pola w `useEffect` przy zmianie `userId`",
      "Przekazać `key={userId}` — React odtworzy komponent",
      "Wywołać `forceUpdate()` na komponencie formularza",
    ],
    answer: 1,
    explanation:
      "Nowy `key` mówi React, że to inny komponent: stary się odmontowuje razem ze stanem, a nowy montuje. Reset przez efekt działa, ale najpierw renderuje nieaktualne dane, a potem je poprawia — zbędny render i mignięcie. `forceUpdate` istnieje tylko w klasach i nie resetuje stanu.",
    sources: ["react-preserving-state", "react-no-effect"],
  },
  {
    question: "Co robi `React.memo(Component)`?",
    options: [
      "Pomija render, jeśli propsy są płytko równe poprzednim",
      "Cache'uje DOM komponentu między przejściami stron SPA",
      "Memoizuje wyniki wszystkich obliczeń wewnątrz komponentu",
    ],
    answer: 0,
    explanation:
      "`memo` porównuje każdy prop przez `Object.is`. Jeśli wszystkie są równe, ponownie używany jest poprzedni wynik renderu. Zmiany własnego stanu i kontekstu nadal wywołują render. Jako drugi argument można przekazać własną funkcję porównującą.",
    sources: ["react-memo"],
  },
  {
    question: "Dlaczego `memo` nie pomaga `<List items={data} onSelect={() => select(id)} style={{ gap: 8 }} />`?",
    options: [
      "`memo` nie działa z funkcjami strzałkowymi w propsach",
      "Callback i obiekt stylu są tworzone od nowa przy każdym renderze",
      "`memo` nie potrafi porównywać tablic w propsach",
    ],
    answer: 1,
    explanation:
      "Funkcja inline i literał obiektu to nowe referencje przy każdym renderze, więc płytkie porównanie ich nie przepuści. Ustabilizuj je przez `useCallback` / `useMemo` albo wynieś stałe poza komponent. React Compiler robi to automatycznie.",
    sources: ["react-memo", "react-useCallback"],
  },
  {
    question: "Do czego służy `useMemo`?",
    options: [
      "Do cache'owania wyniku kosztownego obliczenia między renderami",
      "Do przechowywania wartości między przeładowaniami strony",
      "Do uruchamiania efektów ubocznych po renderze",
    ],
    answer: 0,
    explanation:
      "`useMemo(() => filterTodos(todos, tab), [todos, tab])` przelicza wartość tylko przy zmianie zależności. Drugie zastosowanie to stabilna referencja obiektu dla dzieci z `memo` lub zależności efektów. React może wyrzucić cache, więc `useMemo` to optymalizacja, a nie gwarancja.",
    sources: ["react-useMemo"],
  },
  {
    question: "Dlaczego nie należy deklarować komponentu wewnątrz innego komponentu?",
    code: `function Page() {
  function Row({ item }) { return <li>{item}</li>; }
  return <ul>{items.map(i => <Row key={i} item={i} />)}</ul>;
}`,
    options: [
      "Zagnieżdżone funkcje nie mogą zwracać JSX bez `React.memo`",
      "Każdy render tworzy nowy typ `Row` — jest on odtwarzany",
      "Łamie to zasady hooków i powoduje błąd lintera",
    ],
    answer: 1,
    explanation:
      "Dla React `Row` z różnych renderów to różne typy komponentów, bo to nowe funkcje. Dlatego poddrzewo za każdym razem się odmontowuje i montuje ponownie: tracony jest stan i fokus, a DOM jest odtwarzany. Deklaruj komponenty na najwyższym poziomie modułu.",
    sources: ["react-preserving-state"],
  },
  {
    question: "Jak `useCallback(fn, deps)` ma się do `useMemo`?",
    options: [
      "`useCallback(fn, deps)` to to samo co `useMemo(() => fn, deps)`",
      "`useCallback` wywołuje funkcję, a `useMemo` nie",
      "`useCallback` działa tylko z funkcjami async",
    ],
    answer: 0,
    explanation:
      "`useCallback` cache'uje samą funkcję, `useMemo` — wynik wywołania funkcji. `useCallback` nie wywołuje przekazanej funkcji ani nie przyspiesza jej działania. Jest przydatny, gdy funkcja trafia do komponentu z `memo` lub jest zależnością efektu.",
    sources: ["react-useCallback", "react-useMemo"],
  },
  {
    question: "Kiedy `useCallback` jest naprawdę przydatny?",
    options: [
      "Zawsze: ustawiaj go na każdym handlerze zdarzeń",
      "Gdy funkcję dostaje dziecko z `memo` lub efekt",
      "Gdy funkcja jest duża i kosztowna do utworzenia",
    ],
    answer: 1,
    explanation:
      "`useCallback` sam w sobie nie przyspiesza kodu: funkcja i tak jest tworzona podczas renderu, plus jest koszt porównywania zależności. Ma sens tylko wtedy, gdy komuś zależy na stabilnej referencji. Rozmiar funkcji nie ma znaczenia.",
    sources: ["react-useCallback", "react-memo"],
  },
  {
    question: "Kiedy `useReducer` jest lepszy niż `useState`?",
    options: [
      "Gdy stan to pojedynczy przełącznik boolean",
      "Gdy jest wiele powiązanych pól i złożone przejścia",
      "Tylko gdy potrzebny jest dostęp do globalnego stanu",
    ],
    answer: 1,
    explanation:
      "`useReducer` zbiera logikę aktualizacji w jednej czystej funkcji `(state, action) => newState`: łatwo ją czytać i testować, a handlery tylko opisują, co się stało (`dispatch({ type: 'added' })`). `dispatch` jest stabilny i wygodny do przekazywania w dół. Nie czyni stanu globalnym.",
    sources: ["react-useReducer", "react-reducer"],
  },
  {
    question: "Czym `useLayoutEffect` różni się od `useEffect`?",
    options: [
      "Wykonuje się po zmianach DOM, ale przed malowaniem",
      "Wykonuje się tylko na serwerze podczas SSR",
      "Wykonuje się przed renderem, by przygotować dane",
    ],
    answer: 0,
    explanation:
      "`useLayoutEffect` blokuje malowanie, więc nadaje się do mierzenia DOM i korekty pozycji (tooltipy) bez mignięcia. `useEffect` działa po malowaniu i go nie blokuje — to wybór domyślny. `useLayoutEffect` nie wykonuje się na serwerze.",
    sources: ["react-useLayoutEffect", "react-useEffect"],
  },
  {
    question: "Dlaczego licznik zatrzymuje się na 1?",
    code: `const [count, setCount] = useState(0);

useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id);
}, []);`,
    options: [
      "`setInterval` nie można używać wewnątrz efektów",
      "Callback zamknął w domknięciu `count = 0` z pierwszego renderu",
      "`clearInterval` uruchamia się zaraz po pierwszym tyknięciu",
    ],
    answer: 1,
    explanation:
      "Efekt z `[]` jest tworzony raz i widzi `count` z pierwszego renderu. Każde tyknięcie ustawia `0 + 1`. Rozwiązania: aktualizacja funkcyjna `setCount(c => c + 1)` (najlepiej), dodanie `count` do zależności (interwał jest odtwarzany) lub trzymanie wartości w `ref`.",
    sources: ["react-queueing-updates", "react-effect-deps", "jsinfo-closure"],
  },
  {
    question: "Dlaczego ten efekt wykonuje się po każdym renderze?",
    code: `const options = { roomId, serverUrl };

useEffect(() => {
  const conn = connect(options);
  return () => conn.close();
}, [options]);`,
    options: [
      "`options` to nowy obiekt przy każdym renderze",
      "Obiekty w zależnościach zawsze ponownie uruchamiają efekt",
      "Bo `connect` to funkcja async zwracająca promise",
    ],
    answer: 0,
    explanation:
      "Zależności porównuje się przez `Object.is`, a nowy literał obiektu nigdy nie jest równy poprzedniemu. Poprawnie jest utworzyć obiekt wewnątrz efektu i zależeć od prymitywów: `[roomId, serverUrl]`. Wyciszanie lintera to zły pomysł.",
    sources: ["react-effect-deps"],
  },
  {
    question: "Jak uniknąć wyścigu przy ładowaniu danych w `useEffect`, jeśli `userId` szybko się zmienia?",
    options: [
      "Flaga `ignore` lub `AbortController` w funkcji czyszczącej",
      "Dodać `setTimeout` na 300 ms przed każdym żądaniem",
      "Usunąć `userId` z tablicy zależności efektu",
    ],
    answer: 0,
    explanation:
      "Odpowiedzi mogą przychodzić w innej kolejności, a stara odpowiedź nadpisuje nową. W funkcji czyszczącej ustaw `ignore = true` (wynik jest ignorowany) lub wywołaj `controller.abort()` (żądanie jest anulowane). Jeszcze lepiej użyć TanStack Query lub ładowania danych we frameworku, gdzie jest to rozwiązane.",
    sources: ["react-useEffect", "mdn-abort-controller"],
  },
  {
    question: "Jak poprawnie uzyskać `fullName` z `firstName` i `lastName` przechowywanych w stanie?",
    options: [
      "Osobny stan `fullName` i `useEffect`, który go aktualizuje",
      "Obliczyć podczas renderu: `const fullName = firstName + ' ' + lastName`",
      "Trzymać `fullName` w `useRef` i aktualizować ręcznie",
    ],
    answer: 1,
    explanation:
      "Wartości, które można obliczyć z propsów i stanu, nie powinny być przechowywane w stanie. Połączenie „stan + synchronizujący efekt” daje zbędny render z nieaktualną wartością i ryzyko rozjazdu. Jeśli obliczenie jest kosztowne, opakuj je w `useMemo`.",
    sources: ["react-no-effect", "react-choosing-state"],
  },
  {
    question: "Jakich błędów NIE łapie error boundary?",
    options: [
      "Błędów podczas renderowania komponentów potomnych",
      "Błędów w handlerach zdarzeń i kodzie asynchronicznym",
      "Błędów w metodach cyklu życia potomków",
    ],
    answer: 1,
    explanation:
      "Error boundary łapie błędy podczas renderu, w konstruktorach i metodach cyklu życia potomków. Błędy w `onClick`, `setTimeout` i promise'ach występują poza renderem — obsługuje się je przez `try/catch` lub zapisuje w stanie, by rzucić podczas renderu. Boundary to komponent klasowy z `getDerivedStateFromError`; często używa się `react-error-boundary`.",
    sources: ["react-error-boundary"],
  },
  {
    question: "Co zmieniło się w React 19 w przekazywaniu `ref` do komponentów funkcyjnych?",
    options: [
      "`ref` można odebrać jako zwykły prop; `forwardRef` nie jest już potrzebny",
      "Przekazywanie `ref` do komponentów funkcyjnych jest teraz zabronione",
      "`ref` działa teraz tylko z komponentami klasowymi",
    ],
    answer: 0,
    explanation:
      "W React 19 `function Input({ ref, ...props })` dostaje `ref` bezpośrednio. `forwardRef` nadal działa, ale zostanie oznaczony jako przestarzały. Ponadto callback ref może teraz zwracać funkcję czyszczącą.",
    sources: ["react-19", "react-forwardRef"],
  },
  {
    question: "Jak zachowują się zdarzenia wewnątrz portalu `createPortal(child, document.body)`?",
    options: [
      "Propagują się przez drzewo React do rodzica w React, a nie przez DOM",
      "W ogóle się nie propagują — portal je blokuje",
      "Propagują się tylko przez drzewo DOM aż do `document.body`",
    ],
    answer: 0,
    explanation:
      "Portal renderuje DOM w innym miejscu (modale, tooltipy, by uciec od `overflow: hidden` i kontekstów nakładania), ale logicznie pozostaje częścią drzewa React: kontekst jest dostępny, a zdarzenia propagują się do przodków w React. Czasem bywa to zaskakujące, np. `onClick` rodzica uruchamia się od kliknięcia w modalu.",
    sources: ["react-createPortal"],
  },
  {
    question: "Czym jest komponent wyższego rzędu (HOC)?",
    options: [
      "Funkcją, która przyjmuje komponent i zwraca nowy",
      "Komponentem znajdującym się na samej górze drzewa",
      "Komponentem z liczbą potomków powyżej określonej",
    ],
    answer: 0,
    explanation:
      "Przykład: `withAuth(Page)` sprawdza uwierzytelnienie i renderuje `Page` lub przekierowanie. HOC były popularne przed hookami. Minusy: „piekło wrapperów”, konflikty nazw propsów, złożone typowanie. Dziś taką logikę zwykle wynosi się do własnych hooków.",
    sources: ["patterns-dev-hoc", "react-legacy-hoc"],
  },
  {
    question: "Na czym polega wzorzec render props?",
    options: [
      "Komponent wywołuje przekazaną funkcję, by renderować",
      "Komponent renderuje wszystkie swoje propsy jako string do DOM",
      "Propsy przekazuje się tylko przez metodę `render()` klasy",
    ],
    answer: 0,
    explanation:
      "`<MouseTracker render={pos => <Cursor {...pos} />} />` — komponent posiada logikę, a wywołujący decyduje, jak wyrenderować wynik. Funkcję często przekazuje się jako `children`. Hooki w dużej mierze zastąpiły ten wzorzec, ale pozostaje przydatny, np. w wirtualizowanych listach i komponentach headless.",
    sources: ["patterns-dev-render-props"],
  },
  {
    question: "Czym jest wzorzec compound components?",
    options: [
      "Powiązane części dzielące kontekst: `<Tabs>`, `<Tabs.Panel>`",
      "Komponent złożony z kilku zagnieżdżonych wrapperów HOC",
      "Komponent, który rekurencyjnie renderuje sam siebie dla zagnieżdżeń",
    ],
    answer: 0,
    explanation:
      "Rodzic trzyma stan i przekazuje go przez Context, a części potomne z niego korzystają. Użytkownik składa markup, jak w natywnych `<select>` i `<option>`, bez tuzina propsów konfiguracyjnych. Tak działają Radix UI, Headless UI i Reach UI.",
    sources: ["patterns-dev-compound"],
  },
  {
    question: "Dlaczego wszyscy konsumenci kontekstu przerenderowują się przy każdym renderze providera?",
    code: `<AuthContext value={{ user, login, logout }}>
  {children}
</AuthContext>`,
    options: [
      "`value` to nowy obiekt przy każdym renderze providera",
      "Kontekst zawsze budzi wszystkich konsumentów; nie da się tego zmienić",
      "Funkcji `login` i `logout` nie można umieszczać w kontekście",
    ],
    answer: 0,
    explanation:
      "React porównuje `value` przez `Object.is`. Literał obiektu jest zawsze nowy, więc każdy render providera budzi wszystkich konsumentów. Rozwiązanie: `useMemo` dla wartości (i `useCallback` dla funkcji) lub podział kontekstu na części.",
    sources: ["react-useContext", "react-useMemo"],
  },
  {
    question: "Po co dzielić kontekst na `StateContext` i `DispatchContext`?",
    options: [
      "Komponenty czytające tylko `dispatch` nie przerenderują się przy zmianie danych",
      "React nie pozwala umieścić w jednym kontekście zarówno danych, jak i funkcji",
      "Aby `dispatch` działał asynchronicznie, jak w Redux Thunk",
    ],
    answer: 0,
    explanation:
      "`dispatch` z `useReducer` jest stabilny i nigdy się nie zmienia. Jeśli umieścisz go w osobnym kontekście, przyciski „dodaj” i „usuń”, które czytają tylko jego, nie będą się przerenderowywać przy każdej zmianie danych. To częsta technika skalowania „reducer + kontekst”.",
    sources: ["react-context-learn", "react-reducer"],
  },
  {
    question: "Co robi `useTransition`?",
    options: [
      "Oznacza aktualizację jako niepilną, zachowując responsywność UI",
      "Animuje przejście między komponentami przez klasy CSS",
      "Odracza wykonanie efektu do następnej klatki przeglądarki",
    ],
    answer: 0,
    explanation:
      "`const [isPending, startTransition] = useTransition()`; aktualizacje wewnątrz `startTransition` mogą być przerwane przez pilniejsze. Na przykład przełączenie na ciężką zakładkę nie blokuje UI, a `isPending` pozwala pokazać wskaźnik. Nie ma to nic wspólnego z animacjami CSS.",
    sources: ["react-useTransition", "react-startTransition"],
  },
  {
    question: "Kiedy używać `useDeferredValue`?",
    options: [
      "Gdy ciężki UI zależy od szybko zmieniającej się wartości",
      "Gdy trzeba odroczyć ładowanie kodu komponentu do kliknięcia",
      "Gdy trzeba opóźnić aktualizację o stały czas",
    ],
    answer: 0,
    explanation:
      "`const deferredQuery = useDeferredValue(query)` — pole aktualizuje się od razu, a ciężka lista renderuje się z „opóźnioną” wartością w tle i jest przerywana nowymi naciśnięciami. W przeciwieństwie do debounce nie ma stałego opóźnienia: na szybkim urządzeniu opóźnienie jest prawie zerowe.",
    sources: ["react-useDeferredValue"],
  },
  {
    question: "Czym jest automatyczny batching w React 18+?",
    options: [
      "Łączeniem wielu wywołań `setState` w jeden render wszędzie",
      "Łączeniem wielu komponentów w jedną paczkę JS",
      "Automatyczną memoizacją wszystkich komponentów aplikacji",
    ],
    answer: 0,
    explanation:
      "Przed React 18 aktualizacje były grupowane tylko w handlerach zdarzeń React. Teraz `setA(); setB();` wewnątrz `setTimeout`, `fetch().then()` lub natywnych handlerów dają jeden render. Jeśli trzeba zastosować aktualizację synchronicznie (np. przed pomiarem DOM), użyj `flushSync`.",
    sources: ["react-18", "react-flushSync"],
  },
  {
    question: "Do czego służy `useId`?",
    options: [
      "Do unikalnych identyfikatorów zgodnych na serwerze i kliencie",
      "Do generowania stabilnych `key` w listach",
      "Do odczytu atrybutu `id` elementu DOM",
    ],
    answer: 0,
    explanation:
      "`useId` jest wygodny do łączenia `label` + `input`, `aria-describedby` itp. `Math.random()` dałby różne wartości przy SSR i hydratacji, a globalny licznik psuje się przy innej kolejności renderu. `useId` nie nadaje się do `key` w listach — klucze powinny pochodzić z danych.",
    sources: ["react-useId"],
  },
  {
    question: "Do czego służy `useSyncExternalStore`?",
    options: [
      "Do subskrypcji zewnętrznego store'a bez „rozrywania” (tearing) UI",
      "Do synchronizacji stanu między kartami przeglądarki",
      "Do synchronicznego ładowania danych z serwera podczas renderu",
    ],
    answer: 0,
    explanation:
      "Hook przyjmuje `subscribe`, `getSnapshot` i `getServerSnapshot` i gwarantuje spójną wartość przy renderowaniu współbieżnym (bez tearingu). Zbudowane są na nim Redux, Zustand i podobne biblioteki. Przykład: subskrypcja `navigator.onLine` lub `localStorage`.",
    sources: ["react-useSyncExternalStore"],
  },
  {
    question: "Czym `use(promise)` z React 19 różni się od zwykłych hooków?",
    options: [
      "Można go wywołać wewnątrz warunków; zawiesza renderowanie",
      "Działa tylko w komponentach klasowych React 19",
      "Uruchamia promise od nowa przy każdym renderze i go cache'uje",
    ],
    answer: 0,
    explanation:
      "`use` czyta wartość promise'a lub kontekstu. Dopóki promise się nie rozwiąże, działa najbliższy `<Suspense>`, a błąd trafia do error boundary. Nie twórz promise'a podczas renderu komponentu klienckiego — za każdym razem będzie nowy; przekaż go z Server Component lub biblioteki z cache.",
    sources: ["react-use", "react-suspense"],
  },
  {
    question: "Co daje `useActionState` w React 19?",
    options: [
      "Wynik akcji formularza i flagę `isPending`",
      "Globalny magazyn wszystkich akcji, jak Redux",
      "Historię wszystkich zmian stanu do debugowania w DevTools",
    ],
    answer: 0,
    explanation:
      "`const [state, formAction, isPending] = useActionState(action, initialState)`. Funkcja `action` dostaje poprzedni stan i `FormData`, a jej wynik staje się nowym stanem — wygodne dla błędów walidacji. `formAction` przekazuje się do `<form action>`. Działa też z Server Functions.",
    sources: ["react-useActionState", "react-19"],
  },
  {
    question: "Do czego służy `useOptimistic`?",
    options: [
      "Do pokazania oczekiwanego wyniku przed odpowiedzią serwera",
      "Do optymalizacji renderu przez pomijanie zbędnych aktualizacji",
      "Do wcześniejszego ładowania danych, które wkrótce będą potrzebne",
    ],
    answer: 0,
    explanation:
      "Dopóki akcja trwa, `useOptimistic` zwraca optymistyczną wersję danych (np. nowa wiadomość jest już na liście). Po zakończeniu akcji pokazywany jest prawdziwy stan, a przy błędzie optymistyczna wartość po prostu znika.",
    sources: ["react-useOptimistic"],
  },
  {
    question: "Co robi React Compiler?",
    options: [
      "Memoizuje komponenty i wartości podczas budowania",
      "Kompiluje JSX do WebAssembly, by przyspieszyć renderowanie",
      "Automatycznie zamienia komponenty klasowe na funkcyjne",
    ],
    answer: 0,
    explanation:
      "Kompilator analizuje kod i sam wstawia memoizację, więc ręczne `useMemo`, `useCallback` i `memo` są w większości zbędne. Opiera się na zasadach React (czyste rendery, niemutowalność) i pomija komponenty, które je łamią. W Next.js 16 włącza się go opcją `reactCompiler`.",
    sources: ["react-compiler", "next-react-compiler"],
  },
  {
    question: "Dlaczego React Hook Form jest zwykle szybszy niż formularze z kontrolowanymi polami?",
    options: [
      "Pola są niekontrolowane: pisanie nie przerenderowuje całego formularza",
      "Kompiluje formularz do natywnego kodu przeglądarki podczas budowania",
      "Całkowicie wyłącza walidację aż do wysłania",
    ],
    answer: 0,
    explanation:
      "W kontrolowanym formularzu każde naciśnięcie klawisza aktualizuje stan i przerenderowuje formularz. RHF rejestruje pola przez `register` i trzyma wartości poza stanem React, przerenderowując tylko to, co jest subskrybowane (`watch`, błędy). Walidacja może działać na `onChange`, `onBlur` i `onSubmit`, często ze schematami Zod lub Yup.",
    sources: ["react-hook-form", "react-input"],
  },
  {
    question: "Jak zachowują się zagnieżdżone granice `<Suspense>`?",
    options: [
      "Działa fallback najbliższej granicy powyżej",
      "Zawsze działa najwyższa granica w drzewie",
      "Zagnieżdżony Suspense jest zabroniony i rzuca błąd",
    ],
    answer: 0,
    explanation:
      "Rozmieszczenie granic decyduje, które części UI pojawiają się razem. Jedna granica wokół całej strony daje jeden duży spinner. Kilka zagnieżdżonych pozwala odsłaniać treść stopniowo: nagłówek → główna treść → komentarze. Przy streaming SSR każda granica może przyjść jako osobny kawałek HTML.",
    sources: ["react-suspense"],
  },
  {
    question: "Gdzie podział kodu przez `lazy` zwykle przynosi najwięcej korzyści?",
    options: [
      "Na trasach i ciężkich, rzadko potrzebnych widżetach",
      "Na każdym przycisku i ikonie, by paczki były mniejsze",
      "Tylko na komponentach renderowanych na serwerze",
    ],
    answer: 0,
    explanation:
      "Podział po trasach daje największy zysk: użytkownik ładuje kod tylko strony, na której jest. Ciężkie, rzadko potrzebne części (edytor rich text, mapy) wydziela się osobno. Zbyt drobny podział powoduje kaskady żądań i migotanie fallbacków.",
    sources: ["react-lazy", "next-lazy-loading"],
  },
  {
    question: "Co jest nie tak z tym case reducerem w `createSlice`?",
    code: `todoAdded(state, action) {
  state.items.push(action.payload);
  return { ...state, count: state.count + 1 };
}`,
    options: [
      "Nie można jednocześnie mutować draftu i zwracać wartości",
      "Metody mutujące, jak `push`, są zabronione w `createSlice`",
      "Case reducer musi być funkcją async",
    ],
    answer: 0,
    explanation:
      "Immer pozwala albo „mutować” draft `state`, albo zwrócić całkiem nową wartość — ale nie oba naraz, inaczej Immer rzuci błąd. Tu wystarczą `state.items.push(...)` i `state.count += 1`. `push` jest dozwolony, bo zmiany dotyczą draftu.",
    sources: ["rtk-immer", "rtk-createSlice"],
  },
  {
    question: "Jakie akcje generuje `createAsyncThunk('users/fetch', ...)`?",
    options: [
      "`pending`, `fulfilled` i `rejected`",
      "`request`, `success` i `failure`",
      "`start`, `end` i `error`",
    ],
    answer: 0,
    explanation:
      "Thunk wysyła `pending` przed żądaniem, potem `fulfilled` z wynikiem lub `rejected` z błędem. Reducery obsługują je w `extraReducers` przez `builder.addCase(fetchUsers.fulfilled, ...)`. Do cache'owania danych serwerowych zwykle lepiej pasuje RTK Query.",
    sources: ["rtk-createAsyncThunk"],
  },
  {
    question: "Skąd RTK Query wie, które dane pobrać ponownie po mutacji?",
    options: [
      "Endpointy zapytań deklarują `providesTags`, a mutacje `invalidatesTags`",
      "Po każdej mutacji pobiera ponownie wszystkie endpointy",
      "Trzeba ręcznie wywołać `refetch()` na każdym hooku zapytania",
    ],
    answer: 0,
    explanation:
      "Tagi łączą cache zapytań z mutacjami: `getPosts` dostarcza `[{ type: 'Post', id: 'LIST' }]`, a `addPost` unieważnia tag `Post` — aktywne zapytania z tym tagiem są automatycznie pobierane ponownie. To odpowiednik `invalidateQueries` w TanStack Query.",
    sources: ["rtk-query-invalidation"],
  },
  {
    question: "Czym jest RTK Query?",
    options: [
      "Pobieraniem i cache'owaniem danych w RTK: `createApi` generuje hooki",
      "Językiem zapytań do store'a Redux, podobnym do składni SQL",
      "Pluginem serwera GraphQL generującym schemat ze store'a",
    ],
    answer: 0,
    explanation:
      "`createApi` opisuje endpointy, a biblioteka generuje hooki typu `useGetPostsQuery` i zarządza cache'owaniem, deduplikacją, ponownym pobieraniem i unieważnianiem po tagach. Rozwiązuje te same problemy co TanStack Query, ale jest wbudowana w infrastrukturę Redux. Działa też z GraphQL, ale nie jest pluginem serwera.",
    sources: ["rtk-query-overview"],
  },
  {
    question: "Co daje `createEntityAdapter`?",
    options: [
      "Normalizację `{ ids, entities }` i reducery CRUD",
      "Bezpośrednie połączenie z bazą danych ze store'a Redux",
      "Automatyczną walidację encji względem schematu JSON",
    ],
    answer: 0,
    explanation:
      "Normalizacja przechowuje każdą encję raz według id, co upraszcza aktualizacje i wyszukiwanie. Adapter daje `addOne`, `upsertMany`, `removeOne`, `setAll` oraz selektory `selectAll`, `selectById` i obsługuje sortowanie.",
    sources: ["rtk-createEntityAdapter", "redux-normalizing"],
  },
  {
    question: "Dlaczego ten selektor powoduje re-render przy każdej akcji w store?",
    code: `const done = useSelector(state =>
  state.todos.filter(t => t.done)
);`,
    options: [
      "`filter` za każdym razem zwraca nową tablicę",
      "`useSelector` zawsze przerenderowuje przy każdej akcji",
      "`filter` jest zbyt wolny, by wywoływać go w selektorze",
    ],
    answer: 0,
    explanation:
      "`useSelector` uruchamia się po każdym dispatchu i porównuje wynik po referencji. Nowa tablica nigdy nie jest równa poprzedniej. Rozwiązaniem jest memoizowany selektor `createSelector`, który zwraca tę samą tablicę, dopóki `state.todos` się nie zmienił.",
    sources: ["rtk-createSelector", "redux-selectors", "react-redux-hooks"],
  },
  {
    question: "Kiedy Redux (lub Zustand) jest bardziej odpowiedni niż React Context?",
    options: [
      "Gdy stan często się zmienia i potrzebne są precyzyjne subskrypcje",
      "Zawsze: Context jest przestarzały i zostanie usunięty z React",
      "Tylko gdy aplikacja ma więcej niż dziesięć stron",
    ],
    answer: 0,
    explanation:
      "Context to mechanizm przekazywania wartości w głąb drzewa, a nie menedżer stanu: przy zmianie `value` przerenderowują się wszyscy konsumenci; nie ma precyzyjnych subskrypcji. Dla rzadko zmieniających się danych (motyw, bieżący użytkownik) wystarczy. Store'y z selektorami dają precyzyjne subskrypcje, middleware i DevTools.",
    sources: ["redux-essentials", "react-context-learn"],
  },
  {
    question: "Czym `staleTime` różni się od `gcTime` w TanStack Query?",
    options: [
      "`staleTime` to okres świeżości, `gcTime` — jak długo dane są trzymane bez obserwatorów",
      "To synonimy: `gcTime` to nowa nazwa `staleTime` w v5",
      "`staleTime` to timeout żądania, `gcTime` — interwał ponowień",
    ],
    answer: 0,
    explanation:
      "Dopóki dane są świeże, nie ma ponownego pobierania przy montowaniu ani fokusie okna. Po `staleTime` stają się nieaktualne, ale nadal są pokazywane z cache i odświeżane w tle. `gcTime` (dawniej `cacheTime`, domyślnie 5 minut) zaczyna liczyć, gdy zapytanie nie ma już obserwatorów — wtedy dane są usuwane z pamięci.",
    sources: ["tq-important-defaults", "tq-caching"],
  },
  {
    question: "Dlaczego TanStack Query z domyślnymi ustawieniami pobiera dane ponownie po powrocie do karty?",
    options: [
      "Domyślnie `staleTime: 0` i `refetchOnWindowFocus`",
      "To znany błąd naprawiony w następnej wersji",
      "Cache jest całkowicie czyszczony przy każdej utracie fokusu",
    ],
    answer: 0,
    explanation:
      "Domyślnie TanStack Query agresywnie dba o aktualność danych: od razu uznaje je za nieaktualne i pobiera ponownie przy montowaniu, fokusie okna i ponownym połączeniu z siecią. Jeśli dane rzadko się zmieniają, zwiększ `staleTime` globalnie lub dla konkretnego zapytania.",
    sources: ["tq-important-defaults"],
  },
  {
    question: "Jak zaktualizować listę po udanym utworzeniu elementu przez `useMutation`?",
    options: [
      "Wywołać `invalidateQueries` dla `['todos']` w `onSuccess`",
      "Przeładować stronę przez `location.reload()` w `onSuccess`",
      "Ponownie wywołać `useQuery` wewnątrz callbacku `onSuccess`",
    ],
    answer: 0,
    explanation:
      "Unieważnienie oznacza zapytania jako nieaktualne i pobiera ponownie aktywne. Alternatywą jest bezpośrednia aktualizacja cache przez `setQueryData`, jeśli serwer zwrócił nowy obiekt. Hooków nie można wywoływać wewnątrz callbacków.",
    sources: ["tq-mutations", "tq-invalidation"],
  },
  {
    question: "Które zapytania unieważnia `invalidateQueries({ queryKey: ['todos'] })`?",
    options: [
      "Wszystkie zapytania, których klucz zaczyna się od `['todos']`",
      "Tylko zapytanie, którego klucz to dokładnie `['todos']`",
      "Wszystkie zapytania w aplikacji oprócz nieaktywnych",
    ],
    answer: 0,
    explanation:
      "Domyślnie dopasowanie odbywa się po prefiksie klucza, dlatego wygodne są hierarchiczne klucze: `['todos']` → `['todos', 'list', filters]` → `['todos', 'detail', id]`. Dokładne dopasowanie włącza `exact: true`. Klucze często wynosi się do fabryki (`todoKeys.detail(id)`).",
    sources: ["tq-invalidation", "tq-query-keys"],
  },
  {
    question: "Jak zaimplementować optymistyczną aktualizację przez cache w TanStack Query?",
    options: [
      "`onMutate` — migawka i edycja cache, `onError` — wycofanie",
      "Wywołać `invalidateQueries` na samym początku mutacji",
      "Przekazać opcję `optimistic: true` do `useQuery` listy",
    ],
    answer: 0,
    explanation:
      "`cancelQueries` zapobiega nadpisaniu optymistycznych danych przez żądanie w tle. Migawka z `getQueryData` jest zwracana z `onMutate` jako kontekst do wycofania. W v5 jest prostsza opcja — pokazywać `variables` mutacji w UI, dopóki jest `isPending`, bez dotykania cache.",
    sources: ["tq-optimistic", "tq-mutations"],
  },
  {
    question: "Jak uruchomić zapytanie dopiero po otrzymaniu `user.id` z innego zapytania?",
    options: [
      "Przekazać `enabled: !!user?.id` do drugiego zapytania",
      "Wywołać drugi `useQuery` wewnątrz warunku `if (user)`",
      "Wywołać `refetch()` drugiego zapytania w `useEffect`",
    ],
    answer: 0,
    explanation:
      "Dopóki `enabled` jest false, zapytanie się nie wykonuje (status `pending`). Warunkowe wywołanie hooka łamie zasady hooków, a ręczny `refetch` w efekcie to zbędna komplikacja. `user.id` powinien być częścią klucza drugiego zapytania.",
    sources: ["tq-dependent", "react-rules-of-hooks"],
  },
  {
    question: "Jak przy paginacji pokazywać starą stronę, dopóki ładuje się nowa, zamiast szkieletu?",
    options: [
      "`placeholderData: keepPreviousData`",
      "`staleTime: Infinity` dla wszystkich stron",
      "`refetchOnMount: false` na zapytaniu",
    ],
    answer: 0,
    explanation:
      "Przy nowym kluczu (`['projects', page]`) zapytanie zaczyna z pustym cache. `placeholderData` podstawia poprzednie dane na czas ładowania nowych, a `isPlaceholderData` pozwala np. zablokować przycisk „Dalej”. W v4 była to opcja `keepPreviousData: true`.",
    sources: ["tq-paginated"],
  },
  {
    question: "Co domyślnie robi TanStack Query przy błędzie zapytania po stronie klienta?",
    options: [
      "Ponawia 3 razy z rosnącym opóźnieniem, potem zgłasza błąd",
      "Od razu pokazuje błąd bez żadnego ponowienia",
      "Ponawia żądanie w nieskończoność aż do sukcesu",
    ],
    answer: 0,
    explanation:
      "Domyślnie `retry: 3`, a `retryDelay` rośnie wykładniczo. Mutacje domyślnie nie są ponawiane. Ponowienia konfiguruje się funkcją, np. nie ponawiać 4xx: `retry: (count, err) => err.status >= 500 && count < 3`.",
    sources: ["tq-important-defaults"],
  },
  {
    question: "Po co `useQuery` ma opcję `select`?",
    options: [
      "Aby pobrać część danych i subskrybować tylko ją",
      "Aby wybrać, które z kilku zapytań wykonać",
      "Aby wymienić pola żądane od serwera GraphQL",
    ],
    answer: 0,
    explanation:
      "`useQuery({ queryKey: ['todos'], queryFn, select: d => d.length })` — cache przechowuje pełną odpowiedź, a komponent dostaje wartość pochodną i subskrybuje tylko ją. Dla stabilnej referencji wynieś funkcję `select` poza komponent lub ją memoizuj.",
    sources: ["tq-render-optimizations"],
  },
];

export default questions;
