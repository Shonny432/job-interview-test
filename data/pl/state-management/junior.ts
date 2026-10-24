import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  // ---------- useState ----------
  {
    question: "Czym jest „stan” (state) w komponencie React?",
    options: [
      "Dane, które zmieniają się w czasie i wpływają na ekran; ich zmiana powoduje ponowny render",
      "Dowolna zmienna zadeklarowana wewnątrz funkcji komponentu",
      "Propsy, które rodzic przekazuje komponentowi",
    ],
    answer: 0,
    explanation:
      "Stan to pamięć komponentu między renderami: wartość licznika, tekst w polu, czy menu jest otwarte. Zwykła zmienna `let` resetuje się przy każdym renderze, a jej zmiana nie prosi Reacta o odświeżenie UI. Propsy to dane wejściowe tylko do odczytu, należą do rodzica.",
    sources: ["react-state-memory", "react-useState"],
  },
  {
    question: "Dlaczego licznik na ekranie się nie zmienia?",
    code: `function Counter() {
  let count = 0;
  return <button onClick={() => count++}>{count}</button>;
}`,
    options: [
      "Zmienna lokalna nie przetrwa między renderami, a jej zmiana nie wywołuje renderu",
      "Handlery `onClick` nie mogą zmieniać zmiennych zadeklarowanych w komponencie",
      "Przycisk potrzebuje `type=\"button\"`, aby kliknięcie zaktualizowało tekst",
    ],
    answer: 0,
    explanation:
      "`count` przy każdym renderze znów wynosi `0`, a jej zwiększenie nie prosi Reacta o ponowne narysowanie komponentu. Potrzeba `const [count, setCount] = useState(0)` i `setCount(count + 1)`.",
    sources: ["react-state-memory", "react-useState"],
  },
  {
    question: "Kiedy potrzebna jest funkcyjna forma `setCount(c => c + 1)` zamiast `setCount(count + 1)`?",
    options: [
      "Gdy nowa wartość zależy od poprzedniej, zwłaszcza przy kilku aktualizacjach z rzędu",
      "Tylko w komponentach klasowych; funkcyjne jej nie obsługują",
      "Gdy w stanie jest string, a nie liczba",
    ],
    answer: 0,
    explanation:
      "`count` to migawka bieżącego renderu. Trzy wywołania `setCount(count + 1)` w jednym handlerze dają +1, a trzy `setCount(c => c + 1)` — +3: każdy updater dostaje wynik poprzedniego. To samo chroni przed nieaktualnymi domknięciami w timerach i efektach.",
    sources: ["react-queueing-updates", "react-state-snapshot"],
  },
  {
    question: "Jak poprawnie zaktualizować jedno pole obiektu w stanie?",
    code: `const [form, setForm] = useState({ name: "", email: "" });`,
    options: [
      "`setForm({ ...form, email: value })`",
      "`form.email = value; setForm(form)`",
      "`setForm({ email: value })` — React sam scali obiekty",
    ],
    answer: 0,
    explanation:
      "W odróżnieniu od `this.setState` w klasach setter `useState` zastępuje wartość w całości — `setForm({ email })` zgubi `name`. Mutacja i przekazanie tego samego obiektu zostaną pominięte: React porównuje referencje (`Object.is`).",
    sources: ["react-updating-objects", "react-useState"],
  },
  {
    question: "Jak usunąć element z `id` z tablicy w stanie?",
    options: [
      "`setItems(items.filter(i => i.id !== id))`",
      "`items.splice(index, 1); setItems(items)`",
      "`delete items[index]; setItems(items)`",
    ],
    answer: 0,
    explanation:
      "Stan aktualizuje się niemutowalnie: `filter`, `map`, spread i `toSorted` tworzą nową tablicę. `splice` i `delete` mutują istniejącą, referencja się nie zmienia i React pomija aktualizację.",
    sources: ["react-updating-arrays"],
  },
  {
    question: "Po co przekazywać funkcję do `useState(() => createInitialTodos())`?",
    options: [
      "Aby kosztowne obliczenie wykonało się tylko przy pierwszym renderze",
      "Aby stan stał się tylko do odczytu po inicjalizacji",
      "Aby wartość początkowa załadowała się asynchronicznie z serwera",
    ],
    answer: 0,
    explanation:
      "`useState(createInitialTodos())` wywołuje funkcję przy każdym renderze, choć wynik jest potrzebny raz. Leniwy inicjalizator `useState(createInitialTodos)` wywoływany jest tylko przy montowaniu. Musi być synchroniczny i czysty.",
    sources: ["react-useState"],
  },
  {
    question: "Czy trzeba przechowywać `fullName` w stanie, jeśli są już `firstName` i `lastName`?",
    options: [
      "Nie — obliczyć podczas renderu: `const fullName = firstName + ' ' + lastName`",
      "Tak — i synchronizować przez `useEffect` przy każdej zmianie",
      "Tak — inaczej React nie wyświetli obliczonej wartości",
    ],
    answer: 0,
    explanation:
      "Nadmiarowy stan prowadzi do rozsynchronizowania i zbędnych renderów. Wszystko, co wynika z propsów i istniejącego stanu, oblicza się podczas renderu. Jeśli obliczenie jest kosztowne — owija się je w `useMemo`.",
    sources: ["react-choosing-state", "react-no-effect"],
  },
  {
    question: "Czym jest „lokalny” stan komponentu i kiedy wystarcza?",
    options: [
      "Stan jednego komponentu lub małego poddrzewa — wystarcza `useState`",
      "Stan w `localStorage`, który przetrwa przeładowanie",
      "Stan, który mogą przechowywać tylko komponenty serwerowe",
    ],
    answer: 0,
    explanation:
      "Większość stanu UI jest lokalna: czy lista jest rozwinięta, tekst pola, aktywna zakładka. Trzymaj stan jak najbliżej miejsca użycia i podnoś go lub przenoś do store'a dopiero wtedy, gdy potrzebuje go kilka odległych komponentów.",
    sources: ["react-sharing-state", "react-choosing-state"],
  },

  // ---------- useReducer ----------
  {
    question: "Co zwraca `useReducer`?",
    code: `const [state, dispatch] = useReducer(reducer, initialState);`,
    options: [
      "Bieżący stan i funkcję `dispatch` do wysyłania akcji",
      "Funkcję reducera i kopię stanu początkowego",
      "Promise, który rozwiązuje się nowym stanem",
    ],
    answer: 0,
    explanation:
      "Wywołujesz `dispatch({ type: 'added', text })`, React wywołuje `reducer(state, action)` i używa wyniku jako następnego stanu. `dispatch` jest stabilny między renderami, można go bezpiecznie przekazywać w dół i podawać w zależnościach efektów.",
    sources: ["react-useReducer", "react-reducer"],
  },
  {
    question: "Jaka powinna być funkcja reducera?",
    options: [
      "Czysta: `(state, action) => newState` bez efektów ubocznych i mutacji",
      "Asynchroniczna: może wykonywać żądania i zwracać promise stanu",
      "Mutująca: zmienia `state` bezpośrednio i nic nie zwraca",
    ],
    answer: 0,
    explanation:
      "React może wywołać reducer więcej niż raz (np. w Strict Mode), więc nie wolno w nim wykonywać żądań, ustawiać timerów ani mutować stanu. Efekty uboczne — w handlerach zdarzeń lub efektach.",
    sources: ["react-reducer", "react-pure"],
  },
  {
    question: "Kiedy `useReducer` jest zwykle wygodniejszy niż kilka `useState`?",
    options: [
      "Gdy stan ma wiele powiązanych pól, a logika aktualizacji jest rozrzucona po handlerach",
      "Zawsze, gdy stan to jedna flaga logiczna",
      "Tylko gdy stan ma być globalny dla całej aplikacji",
    ],
    answer: 0,
    explanation:
      "Reducer zbiera wszystkie przejścia w jednym miejscu — łatwo je czytać i testować, a handlery tylko opisują, co się stało. Dla jednego przełącznika prostszy jest `useState`. Sam `useReducer` nie czyni stanu globalnym.",
    sources: ["react-reducer", "react-useReducer"],
  },
  {
    question: "Co zwykle robi reducer dla nieznanego `type` akcji?",
    options: [
      "Rzuca błąd (lub zwraca bieżący stan), aby literówka nie przeszła niezauważona",
      "Zwraca `undefined`, co resetuje stan",
      "Zwraca pusty obiekt `{}`",
    ],
    answer: 0,
    explanation:
      "Zwrócenie `undefined` zepsuje stan. W dokumentacji Reacta w `default` rzuca się błąd, by literówki w typach akcji ujawniały się od razu; w TypeScript unia dyskryminowana akcji plus sprawdzenie przez `never` łapią je na etapie kompilacji.",
    sources: ["react-reducer"],
  },
  {
    question: "Dlaczego akcje nazywa się tym, co się stało (`'task_added'`), a nie co zrobić (`'set_tasks'`)?",
    options: [
      "Handlery pozostają proste, a logika zmiany stanu żyje w reducerze",
      "React wymaga, by typy akcji były w czasie przeszłym",
      "Dzięki temu reducer działa szybciej",
    ],
    answer: 0,
    explanation:
      "Akcja opisuje zdarzenie użytkownika („dodano zadanie”), a reducer decyduje, jak reaguje na nie stan. Akcje `set_*` przenoszą logikę z powrotem do komponentów i zamieniają reducer w zwykły setter. Ta sama konwencja obowiązuje w Reduxie.",
    sources: ["react-reducer", "redux-style-guide"],
  },

  // ---------- Prop drilling ----------
  {
    question: "Czym jest prop drilling?",
    options: [
      "Przekazywanie propsów przez komponenty pośrednie, które ich nie używają",
      "Sprawdzanie propsów w runtime przez PropTypes",
      "Kopiowanie propsów do stanu lokalnego przez `useEffect`",
    ],
    answer: 0,
    explanation:
      "Jeśli `App` ma `user`, a potrzebuje go głęboko zagnieżdżony `Avatar`, każdy komponent pomiędzy musi przyjąć i przekazać `user` dalej. To rozwlekłe i wiąże komponenty pośrednie z danymi, które ich nie obchodzą.",
    sources: ["react-context-learn", "react-sharing-state"],
  },
  {
    question: "Czym jest „podnoszenie stanu” (lifting state up)?",
    options: [
      "Przeniesienie stanu do najbliższego wspólnego rodzica, by rodzeństwo dzieliło go przez propsy",
      "Przeniesienie całego stanu do jednego globalnego store'a na górze aplikacji",
      "Przechowywanie stanu w `window`, by mógł go czytać każdy komponent",
    ],
    answer: 0,
    explanation:
      "Dwa komponenty, które muszą być zsynchronizowane, nie powinny trzymać własnych kopii. Stan należy do rodzica, który przekazuje w dół wartość i callback. To pierwsze narzędzie — przed Contextem i store'ami.",
    sources: ["react-sharing-state"],
  },
  {
    question: "Jaka technika często rozwiązuje prop drilling bez Contextu?",
    options: [
      "Kompozycja: przekazywanie gotowych elementów przez `children` lub inne propsy",
      "Owinięcie każdego komponentu pośredniego w `React.memo`",
      "Przeniesienie danych do `useRef` w korzeniu aplikacji",
    ],
    answer: 0,
    explanation:
      "`<Layout sidebar={<UserMenu user={user} />}>` — `Layout` nie musi wiedzieć o `user`, po prostu renderuje przekazany element. Dokumentacja Reacta radzi najpierw spróbować kompozycji: Context utrudnia ponowne użycie komponentów.",
    sources: ["react-context-learn", "react-props"],
  },
  {
    question: "Czy przekazywanie propsów przez 2–3 poziomy jest problemem samo w sobie?",
    options: [
      "Zwykle nie: jawne propsy sprawiają, że przepływ danych łatwo prześledzić",
      "Tak: każdy prop przekazany głębiej niż o jeden poziom trzeba przenieść do Contextu",
      "Tak: React wyświetla ostrzeżenie o propsach przechodzących przez kilka poziomów",
    ],
    answer: 0,
    explanation:
      "Jawne propsy są zrozumiałe i łatwe w refaktoryzacji. Prop drilling staje się bolesny, gdy dane przechodzą przez wiele warstw lub są potrzebne wielu komponentom — wtedy pasują kompozycja, Context lub store.",
    sources: ["react-context-learn"],
  },

  // ---------- Context API + useContext ----------
  {
    question: "Jaki problem rozwiązuje Context API?",
    options: [
      "Przekazanie wartości głęboko w drzewo bez przekazywania jej przez każdy poziom",
      "Przechowywanie danych serwerowych z cache'owaniem i ponownym pobieraniem",
      "Przyspieszenie renderu przez pomijanie niezmienionych komponentów",
    ],
    answer: 0,
    explanation:
      "Context udostępnia wartość (motyw, bieżącego użytkownika, język) każdemu potomkowi. To transport wartości, a nie menedżer stanu: sam stan nadal żyje w `useState`/`useReducer` komponentu-providera.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "Jakie kroki są potrzebne, by użyć Contextu?",
    options: [
      "`createContext` → owinąć drzewo providerem z `value` → czytać przez `useContext`",
      "`useContext` w korzeniu → `createContext` w każdym potomku → przekazać `value` propsem",
      "Zadeklarować zmienną globalną i importować ją w każdym komponencie",
    ],
    answer: 0,
    explanation:
      "`const ThemeContext = createContext('light')`; w React 19 można renderować `<ThemeContext value={theme}>` bezpośrednio (wcześniej `<ThemeContext.Provider>`); dowolny potomek wywołuje `useContext(ThemeContext)`.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "Co zwróci `useContext(ThemeContext)`, jeśli powyżej nie ma providera?",
    options: [
      "Wartość domyślną z `createContext(defaultValue)`",
      "`undefined` niezależnie od wartości domyślnej",
      "Od razu rzuci błąd",
    ],
    answer: 0,
    explanation:
      "Wartość domyślna jest używana, gdy wyżej w drzewie nie znaleziono providera. Częsty wzorzec — `createContext(null)` i własny hook `useAuth()`, który rzuca czytelny błąd, gdy providera brakuje.",
    sources: ["react-useContext"],
  },
  {
    question: "Które komponenty zostaną ponownie wyrenderowane po zmianie `value` providera?",
    options: [
      "Wszystkie komponenty, które czytają ten kontekst przez `useContext`",
      "Tylko sam provider",
      "Tylko komponenty, które dostają wartość przez propsy",
    ],
    answer: 0,
    explanation:
      "Renderują się ponownie wszyscy konsumenci kontekstu, nawet jeśli używają jednego pola dużego obiektu. Dlatego Context świetnie nadaje się do rzadko zmieniających się wartości, a gorzej do często zmieniającego się stanu.",
    sources: ["react-useContext"],
  },
  {
    question: "Jakie dane dobrze nadają się do Contextu?",
    options: [
      "Rzadko zmieniające się i potrzebne wielu: motyw, język, bieżący użytkownik",
      "Wartość pola tekstowego zmieniająca się przy każdym naciśnięciu klawisza",
      "Lista 10 000 elementów aktualizowana co sekundę",
    ],
    answer: 0,
    explanation:
      "Context jest dobry do wspólnych ustawień aplikacji i zależności (np. klienta API). Szybko zmieniające się wartości w szeroko używanym kontekście powodują wiele renderów; taki stan trzyma się lokalnie lub w store z selektorami.",
    sources: ["react-context-learn"],
  },
  {
    question: "Po co owijać `useContext` we własny hook, np. `useAuth()`?",
    code: `export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}`,
    options: [
      "Aby ukryć obiekt kontekstu i wyraźnie zgłosić błąd, gdy brakuje providera",
      "Bo `useContext` nie można wywoływać bezpośrednio w komponentach",
      "Aby wartość kontekstu była niezmienna",
    ],
    answer: 0,
    explanation:
      "Konsumenci importują jeden hook zamiast obiektu kontekstu, TypeScript dostaje typ bez null, a zapomniany provider daje czytelny błąd zamiast `undefined` gdzieś głęboko w kodzie.",
    sources: ["react-useContext", "react-custom-hooks"],
  },
  {
    question: "Czy komponent może używać kilku kontekstów jednocześnie?",
    options: [
      "Tak: wywołać `useContext` dla każdego",
      "Nie: tylko jeden kontekst na komponent",
      "Tylko po połączeniu kontekstów w jeden przez `mergeContexts`",
    ],
    answer: 0,
    explanation:
      "`const theme = useContext(ThemeContext); const user = useContext(UserContext);` — to normalne. Rozdzielenie niepowiązanych wartości na różne konteksty dodatkowo zmniejsza zbędne rendery.",
    sources: ["react-useContext"],
  },

  // ---------- Redux Toolkit ----------
  {
    question: "Czym jest Redux Toolkit (RTK)?",
    options: [
      "Oficjalnym, zalecanym sposobem pisania kodu Redux z mniejszą ilością boilerplate'u",
      "Oddzielnym menedżerem stanu, który zastępuje Redux i jest z nim niekompatybilny",
      "Rozszerzeniem przeglądarki do debugowania komponentów React",
    ],
    answer: 0,
    explanation:
      "RTK łączy `configureStore`, `createSlice`, `createAsyncThunk`, Immer i RTK Query. Zespół Reduxa zaleca go do całego nowego kodu Redux; ręczne stałe typów i reducery na switchu uważa się za przestarzałe.",
    sources: ["redux-why-rtk", "redux-essentials"],
  },
  {
    question: "Co generuje `createSlice`?",
    options: [
      "Reducer i action creatory dla każdego case reducera",
      "Komponent React wyświetlający stan slice'a",
      "Store z DevTools i middleware",
    ],
    answer: 0,
    explanation:
      "`createSlice({ name: 'todos', initialState, reducers: { added(state, action) {...} } })` zwraca `slice.reducer` i `slice.actions.added` z typem `'todos/added'`.",
    sources: ["rtk-createSlice"],
  },
  {
    question: "Dlaczego wewnątrz reducerów `createSlice` można „mutować” `state`?",
    code: `added(state, action) {
  state.items.push(action.payload);
}`,
    options: [
      "Immer pod spodem zamienia te zmiany w niemutowalną aktualizację",
      "Redux Toolkit zniósł wymóg niemutowalności",
      "`push` jest specjalnie obsługiwany przez RTK, a inne mutacje są zabronione",
    ],
    answer: 0,
    explanation:
      "`state` to szkic (draft) Immera: piszesz mutujący kod, a Immer tworzy nowy obiekt ze structural sharing. Poza `createSlice`/`createReducer` mutacje nadal są błędem.",
    sources: ["rtk-immer", "rtk-createSlice"],
  },
  {
    question: "Co robi `configureStore`?",
    options: [
      "Tworzy store z połączonymi reducerami, middleware thunk i DevTools",
      "Podłącza store do komponentów React bez `<Provider>`",
      "Generuje slice'y ze schematu JSON",
    ],
    answer: 0,
    explanation:
      "`configureStore({ reducer: { todos: todosReducer } })` łączy reducery, dodaje `redux-thunk`, włącza Redux DevTools i w trybie deweloperskim sprawdza przypadkowe mutacje oraz nieserializowalne wartości.",
    sources: ["rtk-configureStore"],
  },
  {
    question: "Jak podłączyć store Reduxa do aplikacji React?",
    options: [
      "Owinąć aplikację w `<Provider store={store}>` z `react-redux`",
      "Importować store w każdym komponencie, który go potrzebuje",
      "Przekazać store do `createRoot(el, { store })`",
    ],
    answer: 0,
    explanation:
      "`Provider` udostępnia store dla `useSelector` i `useDispatch` wszędzie poniżej. Context używany jest tylko do przekazania referencji do store'a; subskrypcje działają osobno i punktowo.",
    sources: ["react-redux-hooks", "redux-essentials"],
  },
  {
    question: "Do czego służą `useSelector` i `useDispatch`?",
    options: [
      "Do odczytu danych ze store'a i pobrania funkcji `dispatch`",
      "Do wybrania elementu DOM i wysłania zdarzenia DOM",
      "Do utworzenia lokalnego store'a dla jednego komponentu",
    ],
    answer: 0,
    explanation:
      "`const count = useSelector(state => state.counter.value)` renderuje komponent ponownie tylko wtedy, gdy wybrana wartość się zmieniła. `const dispatch = useDispatch(); dispatch(increment())` wysyła akcję.",
    sources: ["react-redux-hooks"],
  },
  {
    question: "Czym jest action (akcja) w Reduxie?",
    options: [
      "Zwykłym obiektem z polem `type`, opisującym, co się stało",
      "Funkcją, która bezpośrednio zmienia store",
      "Komponentem React renderującym przycisk",
    ],
    answer: 0,
    explanation:
      "`{ type: 'todos/added', payload: { id, text } }`. Action creatory z `createSlice` tworzą takie obiekty. Logika asynchroniczna (thunk) wysyła zwykłe akcje, gdy nadejdą dane.",
    sources: ["redux-essentials"],
  },
  {
    question: "Gdzie w Redux Toolkit powinno znaleźć się żądanie do serwera?",
    options: [
      "W thunku (`createAsyncThunk`) lub endpoincie RTK Query — ale nie w reducerze",
      "Bezpośrednio w reducerze, skoro oblicza on nowy stan",
      "W `initialState` slice'a",
    ],
    answer: 0,
    explanation:
      "Reducery muszą być czyste. `createAsyncThunk` wysyła `pending`/`fulfilled`/`rejected` wokół żądania; dla cache'owanych danych serwerowych zwykle prostszy jest RTK Query.",
    sources: ["rtk-createAsyncThunk", "rtk-query-overview"],
  },

  // ---------- Zustand ----------
  {
    question: "Czym jest Zustand?",
    options: [
      "Małym menedżerem stanu opartym na hookach, bez providerów i boilerplate'u",
      "Cache'em serwerowym dla odpowiedzi API",
      "Oficjalnym hookiem Reacta do stanu globalnego",
    ],
    answer: 0,
    explanation:
      "`const useBear = create(set => ({ bears: 0, add: () => set(s => ({ bears: s.bears + 1 })) }))` — i każdy komponent wywołuje `useBear(...)`. `<Provider>` nie jest potrzebny: store żyje w module.",
    sources: ["zustand-intro"],
  },
  {
    question: "Jak odczytać tylko jedno pole ze store'a Zustand?",
    code: `const useStore = create((set) => ({ count: 0, user: null, inc: () => {} }));`,
    options: [
      "`const count = useStore((s) => s.count)`",
      "`const { count } = useContext(useStore)`",
      "`const count = useStore.count`",
    ],
    answer: 0,
    explanation:
      "Selektor subskrybuje komponent tylko na `count`: zmiany `user` nie wywołają jego renderu. Wywołanie `useStore()` bez selektora subskrybuje cały store i renderuje przy każdej zmianie.",
    sources: ["zustand-intro", "zustand-use-shallow"],
  },
  {
    question: "Jak zaktualizować stan w Zustand?",
    options: [
      "Wywołać `set` wewnątrz akcji: `set((s) => ({ count: s.count + 1 }))`",
      "Przypisać bezpośrednio: `useStore.count = 5`",
      "Wysłać obiekt akcji z polem `type`",
    ],
    answer: 0,
    explanation:
      "`set` scala zwrócony obiekt ze stanem na najwyższym poziomie (jeden poziom w głąb). Akcje zwykle opisuje się bezpośrednio w store, a komponenty po prostu wywołują `inc()`.",
    sources: ["zustand-updating-state"],
  },
  {
    question: "Czy store Zustand potrzebuje komponentu-providera?",
    options: [
      "Nie: store to hook utworzony na poziomie modułu",
      "Tak: `<ZustandProvider>` musi owijać całą aplikację",
      "Tak, ale tylko w buildzie produkcyjnym",
    ],
    answer: 0,
    explanation:
      "To jedna z zalet Zustand. Druga strona: store na poziomie modułu jest wspólny dla wszystkich, którzy go importują — na serwerze (SSR) potrzebny jest store na każde żądanie, co pokazuje przewodnik dla Next.js przez Context.",
    sources: ["zustand-intro", "zustand-nextjs"],
  },
  {
    question: "Jak zapisywać store Zustand w `localStorage`?",
    options: [
      "Owinąć kreator store'a w middleware `persist`",
      "Zustand automatycznie zapisuje każdy store w `localStorage`",
      "Wywoływać `localStorage.setItem` w każdym komponencie po renderze",
    ],
    answer: 0,
    explanation:
      "`create(persist((set) => ({...}), { name: 'cart' }))` zapisuje i przywraca stan. Można wybrać magazyn, zapisywać tylko część pól (`partialize`) i migrować stare wersje.",
    sources: ["zustand-persist"],
  },

  // ---------- Stan serwerowy: TanStack Query ----------
  {
    question: "Czym stan serwerowy różni się od klienckiego (UI)?",
    options: [
      "Żyje na serwerze, jest współdzielony i może się zdezaktualizować — UI trzyma kopię w cache",
      "To stan przechowywany tylko w komponentach serwerowych",
      "To stan, który nigdy nie jest wyświetlany w UI",
    ],
    answer: 0,
    explanation:
      "Dane serwerowe (lista zamówień) mogą się zmienić bez wiedzy użytkownika, więc potrzebują cache'owania, ponownego pobierania i inwalidacji. Stan UI (czy modal jest otwarty) w pełni należy do klienta. Mieszanie ich w jednym store prowadzi do ręcznego kodu synchronizacji.",
    sources: ["tq-overview", "tq-client-state"],
  },
  {
    question: "Do czego służy TanStack Query (React Query)?",
    options: [
      "Do pobierania, cache'owania i utrzymywania aktualności danych serwerowych",
      "Do budowania zapytań SQL po stronie klienta",
      "Do routingu między stronami",
    ],
    answer: 0,
    explanation:
      "Przejmuje stany ładowania i błędu, cache'owanie, deduplikację, odświeżanie w tle, ponawianie, paginację i mutacje — pracę, która z `useEffect` + `useState` jest żmudna i podatna na błędy.",
    sources: ["tq-overview"],
  },
  {
    question: "Jakie są dwie obowiązkowe części `useQuery`?",
    options: [
      "`queryKey` i `queryFn`",
      "`url` i `method`",
      "`reducer` i `initialState`",
    ],
    answer: 0,
    explanation:
      "`useQuery({ queryKey: ['todo', id], queryFn: () => fetchTodo(id) })`. Klucz identyfikuje dane w cache; wszystko, od czego zależy zapytanie, wkłada się do niego — wtedy zmiana `id` pobierze inne dane.",
    sources: ["tq-queries", "tq-query-keys"],
  },
  {
    question: "Co trzeba zrobić przed wywołaniem `useQuery` w aplikacji?",
    options: [
      "Utworzyć `QueryClient` i owinąć aplikację w `QueryClientProvider`",
      "Nic: cache tworzy się automatycznie przy pierwszym wywołaniu",
      "Dodać store Reduxa, w którym TanStack Query trzyma cache",
    ],
    answer: 0,
    explanation:
      "`QueryClient` przechowuje cache i ustawienia domyślne. Tworzy się go raz (poza komponentem lub w `useState`), by cache nie resetował się przy każdym renderze. Redux nie jest potrzebny.",
    sources: ["tq-overview"],
  },
  {
    question: "Jak wysłać żądanie POST (utworzyć element) z TanStack Query?",
    options: [
      "Przez `useMutation` i jego funkcję `mutate`",
      "Przez `useQuery` i `method: 'POST'`",
      "Przez `queryClient.post()`",
    ],
    answer: 0,
    explanation:
      "Zapytania (queries) czytają dane, mutacje je zmieniają. `const { mutate, isPending } = useMutation({ mutationFn: createTodo })`. Po sukcesie powiązane zapytania zwykle się inwaliduje, by lista pobrała się ponownie.",
    sources: ["tq-mutations"],
  },
  {
    question: "Dlaczego TanStack Query ponownie pobiera dane po powrocie do karty przeglądarki?",
    options: [
      "Domyślnie dane są od razu nieaktualne (`staleTime: 0`) i włączone jest `refetchOnWindowFocus`",
      "Cache jest czyszczony za każdym razem, gdy karta traci fokus",
      "To błąd, który występuje tylko w trybie deweloperskim",
    ],
    answer: 0,
    explanation:
      "Domyślnie biblioteka agresywnie dba o świeżość: nieaktualne dane są pobierane ponownie przy montowaniu, fokusie okna i przywróceniu sieci. Jeśli dane zmieniają się rzadko, zwiększ `staleTime` globalnie lub dla konkretnego zapytania.",
    sources: ["tq-important-defaults"],
  },

  // ---------- RTK Query ----------
  {
    question: "Czym jest RTK Query?",
    options: [
      "Narzędziem do pobierania i cache'owania danych wbudowanym w Redux Toolkit",
      "Językiem zapytań do wybierania danych ze store'a Reduxa",
      "Serwerem GraphQL dla aplikacji Redux",
    ],
    answer: 0,
    explanation:
      "Opisujesz endpointy przez `createApi`, a on generuje hooki (`useGetPostsQuery`) i zarządza cache'owaniem, deduplikacją, ponownym pobieraniem i inwalidacją — podobnie do TanStack Query, ale żyje w store Reduxa.",
    sources: ["rtk-query-overview"],
  },
  {
    question: "Co generuje `createApi` dla endpointu `getPosts: builder.query(...)`?",
    options: [
      "Hook `useGetPostsQuery`, a także reducer i middleware dla store'a",
      "Serwer REST, który zwraca posty",
      "Slice z `getPosts` jako case reducerem",
    ],
    answer: 0,
    explanation:
      "`reducer` i `middleware` slice'a API dodaje się do `configureStore`, a komponenty wywołują wygenerowany hook: `const { data, isLoading } = useGetPostsQuery()`.",
    sources: ["rtk-query-overview", "rtk-query-queries"],
  },
  {
    question: "Jak mutacja RTK Query sprawia, że listy pobierają się ponownie po dodaniu elementu?",
    options: [
      "Zapytania deklarują `providesTags`, a mutacja — `invalidatesTags`",
      "Po mutacji trzeba wywołać `window.location.reload()`",
      "RTK Query ponownie pobiera wszystkie endpointy po każdej mutacji",
    ],
    answer: 0,
    explanation:
      "`getPosts` dostarcza tag `Post`, a `addPost` go inwaliduje — aktywne zapytania z tym tagiem pobierają się ponownie automatycznie. To odpowiednik `invalidateQueries` w TanStack Query.",
    sources: ["rtk-query-invalidation", "rtk-query-mutations"],
  },

  // ---------- SWR ----------
  {
    question: "Co oznacza nazwa SWR?",
    options: [
      "stale-while-revalidate: pokaż dane z cache, a potem odśwież je w tle",
      "Server Write Replication",
      "State With Reducers",
    ],
    answer: 0,
    explanation:
      "Strategia pochodzi z rozszerzenia HTTP `Cache-Control`: od razu zwrócić nieaktualne dane dla szybkości, sprawdzić w tle i zaktualizować UI. Biblioteka SWR od Vercel jest zbudowana wokół niej.",
    sources: ["swr-intro", "webdev-swr"],
  },
  {
    question: "Jakie są argumenty `useSWR(key, fetcher)`?",
    options: [
      "Unikalny klucz (często URL) i funkcja pobierająca dane",
      "Reducer i stan początkowy",
      "Metoda HTTP i ciało żądania",
    ],
    answer: 0,
    explanation:
      "`const { data, error, isLoading } = useSWR('/api/user', fetcher)`. Klucz identyfikuje wpis w cache: wszystkie komponenty z tym samym kluczem dzielą jedno żądanie i jedną wartość w cache.",
    sources: ["swr-intro"],
  },

  // ---------- React Router loader / action ----------
  {
    question: "Czym jest `loader` w React Router?",
    options: [
      "Funkcją, która ładuje dane trasy przed jej renderem",
      "Komponentem-spinnerem wyświetlanym podczas ładowania strony",
      "Funkcją, która leniwie ładuje kod JS trasy",
    ],
    answer: 0,
    explanation:
      "Router wywołuje loader podczas nawigacji, a komponent czyta wynik przez `useLoaderData()` (lub przez propsy w framework mode). Pobieranie danych zaczyna się razem z nawigacją, a nie po renderze, co eliminuje kaskady żądań.",
    sources: ["rr-data-loading", "rr-route-object"],
  },
  {
    question: "Czym jest `action` w React Router?",
    options: [
      "Funkcją obsługującą zmianę danych przy wysłaniu `<Form>`",
      "Akcją Reduxa wysyłaną podczas nawigacji",
      "Handlerem kliknięcia przypiętym do `<Link>`",
    ],
    answer: 0,
    explanation:
      "`<Form method=\"post\">` wywołuje `action` trasy z danymi formularza. Po action router automatycznie ponownie sprawdza loadery strony, a UI pokazuje świeże dane bez ręcznej aktualizacji cache.",
    sources: ["rr-actions"],
  },
];

export default questions;
