import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  // ---------- useState / useReducer ----------
  {
    question: "Ile będzie wynosić `count` po jednym kliknięciu, jeśli wartość początkowa to 0?",
    code: `function handleClick() {
  setCount(count + 1);
  setCount((c) => c + 1);
  setCount(count + 1);
}`,
    options: ["`1`", "`2`", "`3`"],
    answer: 0,
    explanation:
      "Aktualizacje trafiają do kolejki po kolei: `count + 1` = 1 (migawka 0), potem `c => c + 1` = 2, potem znowu `count + 1` = 1 — ostatnia aktualizacja zastępuje wartość na 1. Mieszanie wartości z migawki z updaterami daje nieoczekiwany wynik; jeśli nowa wartość zależy od poprzedniej, używaj updaterów.",
    sources: ["react-queueing-updates", "react-state-snapshot"],
  },
  {
    question: "Jak zresetować stan komponentu formularza po zmianie wybranego użytkownika?",
    options: [
      "Renderować go z `key={userId}`, by React utworzył komponent od nowa",
      "Resetować każde pole w `useEffect` zależnym od `userId`",
      "Wywołać `setState(undefined)`, by przywrócić wartość początkową",
    ],
    answer: 0,
    explanation:
      "Inny `key` sprawia, że React traktuje to jako nowy komponent: stary stan jest odrzucany, stosowane są wartości początkowe. Efekt resetujący najpierw renderuje nieaktualne dane, a potem je poprawia — zbędny render i widoczne mignięcie.",
    sources: ["react-preserving-state", "react-no-effect"],
  },
  {
    question: "Dlaczego przechowywanie kopii propa w stanie może być błędem?",
    code: `function Message({ color }) {
  const [c, setC] = useState(color);
  return <p style={{ color: c }}>Hi</p>;
}`,
    options: [
      "Wartość początkowa jest używana raz; późniejsze zmiany `color` są ignorowane",
      "`useState` nie może przechowywać stringów pochodzących z propsów",
      "React rzuca błąd, jeśli stan duplikuje prop",
    ],
    answer: 0,
    explanation:
      "„Lustrzane odbicie” propa w stanie zamraża pierwszą wartość. Jeśli komponent ma podążać za propem — używaj go bezpośrednio. Kopiowanie do stanu ma sens tylko wtedy, gdy potrzebna jest właśnie wartość początkowa (i warto nazwać ją `initialColor`).",
    sources: ["react-choosing-state"],
  },
  {
    question: "Jak przekazać `dispatch` z `useReducer` głęboko w drzewo bez prop drillingu?",
    options: [
      "Umieścić `dispatch` w osobnym kontekście; nie zmienia się, więc konsumenci nie renderują się ponownie",
      "Zapisać `dispatch` w `localStorage` i odczytywać go w potomkach",
      "Tworzyć reducer od nowa w każdym potomku z tym samym stanem początkowym",
    ],
    answer: 0,
    explanation:
      "Wzorzec „reducer + kontekst”: jeden kontekst dla `state`, drugi — dla `dispatch`. Komponenty, które tylko wysyłają akcje (przyciski, formularze), czytają stabilny kontekst z dispatch i nie renderują się ponownie przy zmianie stanu.",
    sources: ["react-reducer", "react-context-learn"],
  },
  {
    question: "Po co jest trzeci argument `init` w `useReducer(reducer, arg, init)`?",
    options: [
      "Leniwa inicjalizacja: `init(arg)` wywoływane jest tylko przy pierwszym renderze",
      "To middleware wywoływane przed każdą akcją",
      "Określa typy akcji, które przyjmuje reducer",
    ],
    answer: 0,
    explanation:
      "`useReducer(reducer, username, createInitialState)` unika ponownego obliczania kosztownego stanu początkowego przy każdym renderze — jak leniwy inicjalizator w `useState`. `init` można też wykorzystać do resetowania stanu.",
    sources: ["react-useReducer"],
  },

  // ---------- Wydajność Contextu ----------
  {
    question: "Dlaczego wszyscy konsumenci kontekstu renderują się ponownie przy każdym renderze providera?",
    code: `<AuthContext value={{ user, login, logout }}>
  {children}
</AuthContext>`,
    options: [
      "`value` to za każdym razem nowy obiekt, a React porównuje go przez `Object.is`",
      "Context zawsze renderuje konsumentów przy każdym renderze aplikacji",
      "Funkcji nie można przekazywać przez kontekst, więc React tworzy je od nowa",
    ],
    answer: 0,
    explanation:
      "Nowy literał obiektu nigdy nie jest równy poprzedniemu. Memoizuj: `const value = useMemo(() => ({ user, login, logout }), [user, login, logout])` i `useCallback` dla funkcji (React Compiler może to zrobić automatycznie).",
    sources: ["react-useContext", "react-useMemo"],
  },
  {
    question: "Komponent używa tylko `theme` z dużego `AppContext`, ale renderuje się przy każdej zmianie koszyka. Co pomoże?",
    options: [
      "Podzielić kontekst na mniejsze według domeny i częstotliwości zmian",
      "Owinąć komponent w `React.memo` — blokuje aktualizacje kontekstu",
      "Czytać kontekst przez `useRef` zamiast `useContext`",
    ],
    answer: 0,
    explanation:
      "`React.memo` nie zatrzymuje renderów spowodowanych kontekstem, który czyta komponent. Osobne `ThemeContext` i `CartContext` ograniczają aktualizacje do właściwych konsumentów. Przy bardzo częstych aktualizacjach — store z selektorami.",
    sources: ["react-useContext", "react-memo"],
  },
  {
    question: "Dlaczego `React.memo` nie pomaga komponentowi, który wywołuje `useContext(CartContext)`?",
    options: [
      "Memo porównuje propsy, a zmiana kontekstu i tak wyrenderuje konsumenta",
      "Memo jest ignorowane dla komponentów używających jakichkolwiek hooków",
      "Memo działa tylko dla komponentów klasowych",
    ],
    answer: 0,
    explanation:
      "Aktualizacje kontekstu omijają porównanie propsów. Obejście: czytać kontekst w małym rodzicu i przekazywać zmemoizowanemu dziecku tylko potrzebną wartość — wtedy dziecko pominie render, jeśli wartość się nie zmieniła.",
    sources: ["react-memo", "react-useContext"],
  },
  {
    question: "Czy Context jest biblioteką do zarządzania stanem?",
    options: [
      "Nie: to mechanizm wstrzykiwania zależności; stan żyje w `useState`/`useReducer`",
      "Tak: zastępuje Redux i Zustand w każdym scenariuszu",
      "Tak, ale tylko dla komponentów serwerowych",
    ],
    answer: 0,
    explanation:
      "Context tylko przekazuje wartość w drzewie. Nie ma selektorów, middleware, devtools ani cache'owania. Razem z `useReducer` wystarcza wielu aplikacjom, ale przy częstych aktualizacjach i punktowych subskrypcjach lepszy jest store.",
    sources: ["react-context-learn", "redux-essentials"],
  },
  {
    question: "Co się stanie przy zagnieżdżonych providerach tego samego kontekstu?",
    code: `<ThemeContext value="dark">
  <Sidebar />
  <ThemeContext value="light">
    <Panel />
  </ThemeContext>
</ThemeContext>`,
    options: [
      "`Panel` odczyta `\"light\"` — wygrywa najbliższy provider",
      "`Panel` odczyta `\"dark\"` — wygrywa najbardziej zewnętrzny provider",
      "React rzuci błąd o zduplikowanych providerach",
    ],
    answer: 0,
    explanation:
      "`useContext` szuka najbliższego providera w górę drzewa. Nadpisanie wartości dla poddrzewa to normalna technika: ciemna sekcja na jasnej stronie, zagnieżdżony formularz z własnymi ustawieniami.",
    sources: ["react-useContext"],
  },
  {
    question: "Kiedy lepiej umieścić wartość w Contexcie, zamiast przekazywać ją jawnie przez propsy?",
    options: [
      "Gdy potrzebuje jej wiele komponentów na różnej głębokości i rzadko się zmienia",
      "Zawsze, gdy prop jest używany przez więcej niż jeden komponent",
      "Gdy wartość jest funkcją, bo funkcji nie można przekazywać propsami",
    ],
    answer: 0,
    explanation:
      "Context wymienia jawność na wygodę: trudniej zobaczyć, skąd pochodzą dane, a komponenty zależą od obecności providera. Używaj go do naprawdę przekrojowych wartości; w pozostałych przypadkach jawne propsy lub kompozycja są czytelniejsze.",
    sources: ["react-context-learn"],
  },

  // ---------- Redux Toolkit ----------
  {
    question: "Co jest nie tak z tym case reducerem?",
    code: `todoAdded(state, action) {
  state.items.push(action.payload);
  return { ...state, count: state.count + 1 };
}`,
    options: [
      "Nie można jednocześnie mutować szkicu Immera i zwracać nowej wartości",
      "`push` jest zabroniony wewnątrz reducerów `createSlice`",
      "Case reducer musi być funkcją asynchroniczną",
    ],
    answer: 0,
    explanation:
      "Albo mutuj szkic (`state.items.push(...); state.count += 1`), albo zwracaj całkowicie nowy stan — jeśli zrobisz jedno i drugie, Immer rzuci błąd.",
    sources: ["rtk-immer", "rtk-createSlice"],
  },
  {
    question: "Jakie akcje wysyła `createAsyncThunk('users/fetch', fn)`?",
    options: [
      "`users/fetch/pending`, potem `users/fetch/fulfilled` lub `users/fetch/rejected`",
      "`users/fetch/start` i `users/fetch/end`",
      "Tylko `users/fetch` z wynikiem w `payload`",
    ],
    answer: 0,
    explanation:
      "Reducery obsługują je w `extraReducers` przez `builder.addCase(fetchUsers.fulfilled, ...)`, ustawiając flagi ładowania, dane i błędy. Dla cache'owanych danych serwerowych RTK Query usuwa większość tego kodu.",
    sources: ["rtk-createAsyncThunk"],
  },
  {
    question: "Dlaczego ten selektor renderuje komponent przy każdej wysłanej akcji?",
    code: `const done = useSelector((s) => s.todos.filter((t) => t.done));`,
    options: [
      "`filter` za każdym razem zwraca nową tablicę, więc referencja zawsze się zmienia",
      "`useSelector` zawsze renderuje przy każdej akcji",
      "Selektory nie mogą używać metod tablic",
    ],
    answer: 0,
    explanation:
      "`useSelector` uruchamia się po każdym dispatch i porównuje wyniki przez `===`. Użyj zmemoizowanego selektora z `createSelector`: zwraca tę samą tablicę, dopóki `s.todos` się nie zmieni.",
    sources: ["rtk-createSelector", "redux-selectors", "react-redux-hooks"],
  },
  {
    question: "Do czego służy `extraReducers` w `createSlice`?",
    options: [
      "Do obsługi akcji zdefiniowanych poza tym slice'em (thunki, inne slice'y)",
      "Do dodania większej liczby reducerów niż limit 10 w `reducers`",
      "Do rejestrowania middleware dla slice'a",
    ],
    answer: 0,
    explanation:
      "`reducers` tworzy własne akcje slice'a, a `extraReducers` reaguje na zewnętrzne: `builder.addCase(fetchUser.fulfilled, ...)` lub `builder.addCase(logout, () => initialState)`.",
    sources: ["rtk-createSlice", "rtk-createAsyncThunk"],
  },
  {
    question: "Jak otypować `useSelector` i `useDispatch` w projekcie TypeScript?",
    options: [
      "Wyprowadzić `RootState`/`AppDispatch` ze store'a i utworzyć `useAppSelector`/`useAppDispatch`",
      "Opisać cały interfejs stanu ręcznie i rzutować każdy selektor",
      "Otypować jako `any` — RTK nie da się otypować",
    ],
    answer: 0,
    explanation:
      "`type RootState = ReturnType<typeof store.getState>`, `type AppDispatch = typeof store.dispatch`, potem `useSelector.withTypes<RootState>()`. Typy automatycznie podążają za reducerami.",
    sources: ["redux-typescript"],
  },
  {
    question: "Co daje znormalizowany stan (`{ ids, entities }`)?",
    options: [
      "Każdy element jest przechowywany raz według id, więc aktualizacje i wyszukiwanie są proste i spójne",
      "Mniejszy rozmiar bundla dzięki kompresji",
      "Automatyczną synchronizację z serwerem",
    ],
    answer: 0,
    explanation:
      "Zagnieżdżone, zduplikowane dane rozjeżdżają się (ten sam użytkownik na liście i w komentarzach). `createEntityAdapter` daje znormalizowany stan plus `addOne`, `upsertMany`, `removeOne` i selektory `selectAll`/`selectById`.",
    sources: ["redux-normalizing", "rtk-createEntityAdapter"],
  },
  {
    question: "Co sprawdza `configureStore` w trybie deweloperskim?",
    options: [
      "Przypadkowe mutacje stanu i nieserializowalne wartości w stanie i akcjach",
      "Czy każdy reducer ma testy jednostkowe",
      "Czy akcje są wysyłane nie częściej niż raz na klatkę",
    ],
    answer: 0,
    explanation:
      "Middleware sprawdzające niemutowalność i serializowalność wcześnie łapią błędy: mutację poza Immerem albo `Date`/instancję klasy/promise w store. W buildzie produkcyjnym są wyłączone.",
    sources: ["rtk-configureStore", "redux-style-guide"],
  },
  {
    question: "Czy warto trzymać stan pól formularza (każde naciśnięcie klawisza) w Reduxie?",
    options: [
      "Zwykle nie: trzymaj go lokalnie i wysyłaj wynik przy submit",
      "Tak, cały stan musi być w store, by był przewidywalny",
      "Tak, inaczej formularz nie zadziała z DevTools",
    ],
    answer: 0,
    explanation:
      "Style guide Reduxa radzi decydować osobno dla każdej części stanu. Ulotny stan UI (wpisywany tekst, hover, otwarta lista rozwijana) jest lokalny; w store — dane wspólne dla aplikacji lub takie, które muszą przetrwać nawigację.",
    sources: ["redux-style-guide"],
  },

  // ---------- Zustand ----------
  {
    question: "Dlaczego ten komponent renderuje się przy każdej zmianie store'a?",
    code: `const { count, inc } = useStore();`,
    options: [
      "Bez selektora jest subskrybowany na cały store",
      "Destrukturyzacja jest zabroniona dla hooków Zustand",
      "Akcje w store są tworzone od nowa przy każdej aktualizacji",
    ],
    answer: 0,
    explanation:
      "`useStore()` zwraca cały obiekt stanu, więc każda zmiana wyrenderuje komponent. Wybieraj to, czego potrzebujesz: `useStore((s) => s.count)` i `useStore((s) => s.inc)`.",
    sources: ["zustand-use-shallow", "zustand-intro"],
  },
  {
    question: "Dlaczego selektor zwracający nowy obiekt powoduje zbędne rendery (lub nieskończoną pętlę w v5)?",
    code: `const { a, b } = useStore((s) => ({ a: s.a, b: s.b }));`,
    options: [
      "Za każdym razem tworzony jest nowy obiekt; owiń selektor w `useShallow`",
      "Zustand zabrania wybierania więcej niż jednego pola",
      "Obiekty można wybierać tylko przez `getState()`",
    ],
    answer: 0,
    explanation:
      "Zustand porównuje wyniki selektora przez `Object.is`. `useShallow((s) => ({ a: s.a, b: s.b }))` porównuje pola płytko i zachowuje tę samą referencję, jeśli są równe.",
    sources: ["zustand-use-shallow"],
  },
  {
    question: "Jak odczytać lub zaktualizować store Zustand poza komponentami React (np. w helperze API)?",
    options: [
      "Przez `useStore.getState()` i `useStore.setState()`",
      "Nie da się — store jest dostępny tylko wewnątrz hooków",
      "Przez `useContext(useStore)`",
    ],
    answer: 0,
    explanation:
      "Hook zwracany przez `create` zawiera też API „waniliowego” store'a: `getState`, `setState`, `subscribe`. Przydatne dla interceptorów, websocketów i testów.",
    sources: ["zustand-intro", "zustand-updating-state"],
  },
  {
    question: "Jak `set` w Zustand obsługuje zagnieżdżone obiekty?",
    code: `set({ user: { name: "Ann" } }); // state was { user: { name, email }, theme }`,
    options: [
      "Scala tylko jeden poziom: `theme` zostanie, a `user.email` zginie",
      "Scala wszystko głęboko, więc `user.email` zostanie",
      "Zastępuje cały stan, tracąc `theme`",
    ],
    answer: 0,
    explanation:
      "`set` wykonuje płytkie scalanie najwyższego poziomu. Przy zagnieżdżonych aktualizacjach jawnie używaj spread: `set((s) => ({ user: { ...s.user, name: 'Ann' } }))` albo middleware `immer`.",
    sources: ["zustand-updating-state"],
  },
  {
    question: "Jak zwykle organizuje się duży store Zustand?",
    options: [
      "Dzieli się go na slice'y — funkcje tworzące części stanu, łączone w jednym `create`",
      "Jako dziesiątki niezależnych store'ów importujących się nawzajem",
      "Jako jeden ogromny literał obiektu w jednym pliku",
    ],
    answer: 0,
    explanation:
      "Wzorzec slice'ów: `createBearSlice`, `createFishSlice` dostają `set`/`get` i zwracają swoją część; `create((...a) => ({ ...createBearSlice(...a), ...createFishSlice(...a) }))`. Osobne store'y według domen to też dobra opcja.",
    sources: ["zustand-slices"],
  },
  {
    question: "Dlaczego store z `persist` może spowodować hydration mismatch w aplikacjach SSR?",
    options: [
      "Serwer renderuje wartości domyślne, a klient przywraca inne z magazynu",
      "`persist` wysyła stan na serwer przy każdym żądaniu",
      "`localStorage` jest czytany na serwerze i blokuje render",
    ],
    answer: 0,
    explanation:
      "Na serwerze nie ma `localStorage`, więc jego HTML używa wartości początkowych. Poczekaj na hydratację (`persist.hasHydrated()`/`onFinishHydration`), zanim pokażesz zapisane wartości, albo renderuj je tylko na kliencie.",
    sources: ["zustand-persist", "zustand-nextjs"],
  },

  // ---------- TanStack Query ----------
  {
    question: "Czym `staleTime` różni się od `gcTime`?",
    options: [
      "`staleTime` — jak długo dane są świeże; `gcTime` — jak długo nieużywane dane żyją w pamięci",
      "To synonimy; `gcTime` to nowa nazwa w v5",
      "`staleTime` — timeout żądania; `gcTime` — opóźnienie ponowienia",
    ],
    answer: 0,
    explanation:
      "Świeże dane nie są pobierane ponownie przy montowaniu i fokusie. Nieaktualne nadal są wyświetlane z cache i odświeżane w tle. `gcTime` (wcześniej `cacheTime`, domyślnie 5 minut) zaczyna odliczanie, gdy zapytanie nie ma już obserwatorów.",
    sources: ["tq-important-defaults", "tq-caching"],
  },
  {
    question: "Czym `isPending` różni się od `isFetching`?",
    options: [
      "`isPending` — danych jeszcze nie ma; `isFetching` — trwa dowolne żądanie, także w tle",
      "To ta sama flaga pod różnymi nazwami",
      "`isPending` — tylko dla mutacji, `isFetching` — tylko dla zapytań",
    ],
    answer: 0,
    explanation:
      "Przy `isPending` pokazuj skeleton, a przy `isFetching` ze starymi danymi na ekranie — mały wskaźnik. W v4 pierwsza nazywała się `isLoading`.",
    sources: ["tq-queries"],
  },
  {
    question: "Jak odświeżyć listę po tym, jak `useMutation` utworzył element?",
    options: [
      "Wywołać `queryClient.invalidateQueries({ queryKey: ['todos'] })` w `onSuccess`",
      "Ponownie wywołać `useQuery` wewnątrz `onSuccess`",
      "Przeładować stronę przez `location.reload()`",
    ],
    answer: 0,
    explanation:
      "Inwalidacja oznacza pasujące zapytania jako nieaktualne i ponownie pobiera aktywne. Alternatywa — zapisać zwrócony obiekt do cache przez `setQueryData`. Hooków nie można wywoływać wewnątrz callbacków.",
    sources: ["tq-mutations", "tq-invalidation"],
  },
  {
    question: "Których zapytań dotyczy `invalidateQueries({ queryKey: ['todos'] })`?",
    options: [
      "Wszystkich zapytań, których klucz zaczyna się od `['todos']`",
      "Tylko zapytania z kluczem dokładnie `['todos']`",
      "Wszystkich zapytań w cache",
    ],
    answer: 0,
    explanation:
      "Dopasowanie po prefiksie sprawia, że przydatne są hierarchiczne klucze: `['todos']` → `['todos', 'list', filters]` → `['todos', 'detail', id]`. Dla dokładnego dopasowania — `exact: true`.",
    sources: ["tq-invalidation", "tq-query-keys"],
  },
  {
    question: "Jak uruchomić zapytanie dopiero wtedy, gdy inne zwróci `user.id`?",
    options: [
      "Przekazać `enabled: !!user?.id` do zależnego zapytania",
      "Wywołać drugie `useQuery` wewnątrz `if (user)`",
      "Wywołać `refetch()` drugiego zapytania w `useEffect`",
    ],
    answer: 0,
    explanation:
      "Dopóki `enabled` jest false, zapytanie się nie wykonuje. Warunkowe wywoływanie hooków łamie zasady hooków. `user.id` powinien też być częścią klucza zależnego zapytania.",
    sources: ["tq-dependent", "react-rules-of-hooks"],
  },
  {
    question: "Jak przy paginacji pokazywać poprzednią stronę, gdy ładuje się następna?",
    options: [
      "`placeholderData: keepPreviousData`",
      "`staleTime: Infinity`",
      "`refetchOnMount: false`",
    ],
    answer: 0,
    explanation:
      "Nowy klucz (`['projects', page]`) zaczyna z pustym cache. `placeholderData` w tym czasie pokazuje poprzednie dane, a `isPlaceholderData` pozwala zablokować przycisk „Dalej”.",
    sources: ["tq-paginated"],
  },
  {
    question: "Co TanStack Query domyślnie robi z nieudanym zapytaniem?",
    options: [
      "Ponawia 3 razy z wykładniczym opóźnieniem, zanim pokaże błąd",
      "Od razu pokazuje błąd",
      "Ponawia w nieskończoność, aż się uda",
    ],
    answer: 0,
    explanation:
      "`retry: 3` z rosnącym `retryDelay`. Mutacje domyślnie nie są ponawiane. Można nie ponawiać 4xx: `retry: (count, err) => err.status >= 500 && count < 3`.",
    sources: ["tq-important-defaults"],
  },
  {
    question: "Dlaczego każda zmienna używana przez `queryFn` musi być częścią `queryKey`?",
    options: [
      "Inaczej różne dane trafiają do cache pod tym samym kluczem i nie są pobierane po zmianie zmiennej",
      "Bo `queryFn` nie ma dostępu do zmiennych komponentu",
      "Bo klucz musi mieć co najmniej trzy elementy",
    ],
    answer: 0,
    explanation:
      "Klucz to tożsamość cache, jak zależności efektu. `useQuery({ queryKey: ['todos'], queryFn: () => fetchTodos(filter) })` pokaże wyniki starego filtra. Plugin ESLint z regułą `exhaustive-deps` dla zapytań to wyłapuje.",
    sources: ["tq-query-keys"],
  },

  // ---------- RTK Query ----------
  {
    question: "Jak sprawić, by mutacja RTK Query ponownie pobrała listę postów?",
    code: `getPosts: build.query({ query: () => "posts", providesTags: ["Post"] }),
addPost: build.mutation({ query: (body) => ({ url: "posts", method: "POST", body }) }),`,
    options: [
      "Dodać `invalidatesTags: ['Post']` do `addPost`",
      "Wywołać `getPosts()` wewnątrz `query` mutacji",
      "Dodać `refetchOnMutation: true` do `getPosts`",
    ],
    answer: 0,
    explanation:
      "Tagi łączą cache z mutacjami. Dla dokładniejszej kontroli oznaczaj elementy według id (`{ type: 'Post', id }`) plus tag `'LIST'` — wtedy edycja jednego posta pobierze ponownie tylko to, czego dotyczy.",
    sources: ["rtk-query-invalidation", "rtk-query-mutations"],
  },
  {
    question: "Kiedy RTK Query usuwa nieużywane dane z cache?",
    options: [
      "Po `keepUnusedDataFor` sekundach (domyślnie 60) bez subskrybentów",
      "Od razu po odmontowaniu ostatniego komponentu",
      "Nigdy — dane żyją do przeładowania strony",
    ],
    answer: 0,
    explanation:
      "RTK Query liczy subskrypcje hooków dla każdego endpointu i argumentu. Jeśli w tym czasie ktoś znów się zasubskrybuje, dane przyjdą z cache. Odpowiednik w TanStack Query — `gcTime`.",
    sources: ["rtk-query-cache-behavior"],
  },
  {
    question: "Jak pominąć zapytanie RTK Query, dopóki argument nie jest dostępny?",
    options: [
      "Przekazać `skip: !id` lub `skipToken` zamiast argumentu",
      "Owinąć wywołanie hooka w `if (id)`",
      "Zwrócić `null` z funkcji `query` endpointu",
    ],
    answer: 0,
    explanation:
      "`useGetUserQuery(id ?? skipToken)` zostawia wywołanie hooka bezwarunkowe, ale nie pozwala wysłać żądania. To odpowiednik `enabled: false` w TanStack Query.",
    sources: ["rtk-query-queries", "react-rules-of-hooks"],
  },
  {
    question: "Jak RTK Query unika zduplikowanych żądań, gdy 3 komponenty wywołują `useGetUserQuery(1)`?",
    options: [
      "Żądania z tym samym endpointem i argumentem są łączone w jedno",
      "Wysyła trzy żądania i bierze najszybszą odpowiedź",
      "Dane dostaje tylko pierwszy komponent, pozostałe — `undefined`",
    ],
    answer: 0,
    explanation:
      "Klucz cache to endpoint + zserializowany argument. Wszyscy subskrybenci dzielą jedno żądanie i jeden wpis w cache, który żyje, dopóki zamontowany jest przynajmniej jeden z nich.",
    sources: ["rtk-query-cache-behavior", "rtk-query-overview"],
  },
  {
    question: "Co robi opcja `refetchOnMountOrArgChange` w RTK Query?",
    options: [
      "Wymusza ponowne pobranie przy montowaniu komponentu lub zmianie argumentu, nawet gdy dane są w cache",
      "Całkowicie wyłącza cache'owanie dla endpointu",
      "Pobiera dane ponownie co sekundę",
    ],
    answer: 0,
    explanation:
      "Domyślnie RTK Query podaje nowym subskrybentom dane z cache. `refetchOnMountOrArgChange: true` (lub liczba sekund) pobiera ponownie, jeśli dane są starsze. Powiązane opcje: `refetchOnFocus`, `refetchOnReconnect`, `pollingInterval`.",
    sources: ["rtk-query-cache-behavior"],
  },

  // ---------- SWR ----------
  {
    question: "Kiedy SWR domyślnie automatycznie rewaliduje dane?",
    options: [
      "Przy montowaniu, fokusie okna i przywróceniu sieci",
      "Tylko gdy użytkownik kliknie przycisk odświeżania",
      "Co 5 sekund niezależnie od aktywności",
    ],
    answer: 0,
    explanation:
      "Każdy wyzwalacz można wyłączyć (`revalidateOnFocus: false`, `revalidateOnReconnect: false`), a polling włącza się przez `refreshInterval`. Dla niezmiennych danych jest `useSWRImmutable`.",
    sources: ["swr-revalidation"],
  },
  {
    question: "Jak w SWR pobierać dane tylko po spełnieniu warunku?",
    code: `const { data } = useSWR(userId ? \`/api/user/\${userId}\` : null, fetcher);`,
    options: [
      "Przekazać `null` (lub fałszywy klucz) — SWR nie wykona żądania",
      "Owinąć `useSWR` w instrukcję `if`",
      "Przekazać `enabled: false` w opcjach",
    ],
    answer: 0,
    explanation:
      "Klucz `null` oznacza „nie pobieraj”. Klucz może być też funkcją, która rzuca błąd lub zwraca wartość fałszywą, dopóki brakuje zależności — tak buduje się zależne żądania.",
    sources: ["swr-conditional"],
  },
  {
    question: "Co robi `mutate(key)` z `useSWRConfig`?",
    options: [
      "Rewaliduje (i opcjonalnie aktualizuje) cache dla tego klucza we wszystkich komponentach",
      "Usuwa klucz na serwerze",
      "Zmienia funkcję fetcher dla tego klucza",
    ],
    answer: 0,
    explanation:
      "Po POST wywołuje się `mutate('/api/todos')`, by każdy komponent z tym kluczem pobrał dane ponownie. Można też przekazać nowe dane do natychmiastowej aktualizacji cache, a związany `mutate` z `useSWR` aktualizuje swój klucz.",
    sources: ["swr-mutation"],
  },
  {
    question: "Dlaczego dwa komponenty z tym samym kluczem SWR wykonują tylko jedno żądanie?",
    options: [
      "SWR deduplikuje żądania z tym samym kluczem w obrębie `dedupingInterval`",
      "Drugi komponent czeka, aż pierwszy zostanie odmontowany",
      "SWR cache'uje odpowiedzi w `localStorage` między komponentami",
    ],
    answer: 0,
    explanation:
      "W obrębie interwału deduplikacji (domyślnie 2 sekundy) równoległe żądania o ten sam klucz są łączone, a oba komponenty dzielą dane z cache. Dlatego `useUser()` można swobodnie wywoływać w wielu komponentach.",
    sources: ["swr-performance"],
  },
  {
    question: "Jak ustawić domyślny `fetcher` i opcje dla wszystkich hooków SWR?",
    options: [
      "Owinąć aplikację w `<SWRConfig value={{ fetcher, ... }}>`",
      "Wywołać `useSWR.defaults = { fetcher }` przy starcie",
      "Przekazywać fetcher do każdego hooka — opcje globalne nie są obsługiwane",
    ],
    answer: 0,
    explanation:
      "`SWRConfig` ustawia opcje globalne (fetcher, `revalidateOnFocus`, obsługę błędów) i może być zagnieżdżany, by nadpisać je dla poddrzewa. Przez niego można też przekazać dane początkowe `fallback` z SSR.",
    sources: ["swr-global-config"],
  },

  // ---------- React Router loader / action ----------
  {
    question: "Jak komponent odczytuje dane zwrócone przez `loader` jego trasy?",
    options: [
      "Przez `useLoaderData()` (lub prop `loaderData` w framework mode)",
      "Przez `useState` zainicjalizowany z `window.loaderResult`",
      "Przez `useEffect`, który ponownie wywołuje loader",
    ],
    answer: 0,
    explanation:
      "Router wykonuje loader przed renderem trasy i przekazuje wynik. Z generowaniem typów w framework mode `loaderData` jest w pełni otypowany.",
    sources: ["rr-data-loading"],
  },
  {
    question: "Co się dzieje po zakończeniu `action` w React Router?",
    options: [
      "Router rewaliduje loadery strony, a UI pokazuje świeże dane",
      "Cała strona przeładowuje się z serwera",
      "Nic — dane trzeba pobrać ponownie ręcznie",
    ],
    answer: 0,
    explanation:
      "Automatyczna rewalidacja po mutacjach to kluczowa idea: URL i loadery są źródłem prawdy dla danych serwerowych, więc kod synchronizacji cache po stronie klienta nie jest potrzebny.",
    sources: ["rr-actions", "rr-state-management"],
  },
  {
    question: "Jak pokazać stan oczekiwania podczas nawigacji lub wysyłania formularza w React Router?",
    options: [
      "Czytać `useNavigation().state` (`idle` / `loading` / `submitting`)",
      "Trzymać flagę `isLoading` w globalnym store",
      "Sprawdzać `document.readyState`",
    ],
    answer: 0,
    explanation:
      "`navigation.state !== 'idle'` oznacza, że router ładuje stronę lub wysyła formularz, a w `navigation.formData` są wysłane dane. To wystarcza do spinnerów i blokowania przycisków.",
    sources: ["rr-useNavigation", "rr-pending-ui"],
  },
  {
    question: "Kiedy warto użyć `useFetcher` zamiast `<Form>`?",
    options: [
      "Aby wywołać loader/action bez nawigacji, np. przycisk „polub” na liście",
      "Aby wysłać formularz, który ma przejść na nową stronę",
      "Aby pobrać dane zewnętrznego API w `useEffect`",
    ],
    answer: 0,
    explanation:
      "Fetcher ma własny stan (`fetcher.state`, `fetcher.data`) i nie zmienia URL, więc na jednej stronie może trwać wiele niezależnych mutacji (lista zadań, edycja w miejscu).",
    sources: ["rr-useFetcher"],
  },
  {
    question: "Jak przekierować z `action` po utworzeniu elementu?",
    options: [
      "Zwrócić (lub rzucić) `redirect('/items/' + id)` z action",
      "Wywołać `window.location.href = ...` wewnątrz action",
      "Wywołać `useNavigate()` wewnątrz action",
    ],
    answer: 0,
    explanation:
      "Loadery i actiony działają poza komponentami, więc hooki nie są tam dostępne. `redirect` tworzy odpowiedź, za którą podąża router. Hooki takie jak `useNavigate` działają tylko w komponentach.",
    sources: ["rr-actions"],
  },

  // ---------- Wybór rozwiązania ----------
  {
    question: "Dane serwerowe są w TanStack Query. Co zwykle zostaje dla globalnego store'a klienta?",
    options: [
      "Trochę stanu UI: motyw, otwarte panele, kroki kreatora — często wystarcza Context lub Zustand",
      "Nic — TanStack Query zastępuje też cały stan UI",
      "Pełna kopia danych serwerowych, by uniknąć ponownego pobierania",
    ],
    answer: 0,
    explanation:
      "Gdy cache serwerowy przenosi się do wyspecjalizowanego narzędzia, pozostały stan klienta jest często niewielki. Kopiowanie danych serwerowych do Redux/Zustand przywraca problemy synchronizacji, które rozwiązuje biblioteka zapytań.",
    sources: ["tq-client-state", "tkdodo-practical-rq"],
  },
  {
    question: "Jak RTK Query ma się do TanStack Query?",
    options: [
      "Podobne cele; RTK Query żyje w store Reduxa i pasuje do aplikacji, które już używają Reduxa",
      "RTK Query działa tylko z GraphQL, TanStack Query — tylko z REST",
      "TanStack Query wymaga Reduxa do przechowywania cache",
    ],
    answer: 0,
    explanation:
      "Oba cache'ują dane serwerowe z deduplikacją, inwalidacją i optymistycznymi aktualizacjami. RTK Query używa tagów, jego cache jest widoczny w Redux DevTools i zintegrowany ze slice'ami; TanStack Query ma osobny cache, klucze zapytań i szeroki zestaw funkcji (nieskończone zapytania, suspense).",
    sources: ["rtk-query-overview", "tq-overview"],
  },
];

export default questions;
