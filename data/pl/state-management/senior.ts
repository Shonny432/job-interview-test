import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  // ---------- Podstawy: zewnętrzne store'y, tearing ----------
  {
    question: "Dlaczego Redux, Zustand i podobne biblioteki subskrybują przez `useSyncExternalStore`?",
    options: [
      "Gwarantuje spójną migawkę przy renderowaniu współbieżnym (bez tearingu)",
      "To jedyny hook, który może wywoływać rendery spoza Reacta",
      "Cache'uje store w `localStorage` między sesjami",
    ],
    answer: 0,
    explanation:
      "Przy renderowaniu współbieżnym React może wstrzymać render; jeśli zewnętrzny store w tym czasie się zmieni, jedne komponenty odczytają starą wartość, a inne nową. `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` temu zapobiega i obsługuje SSR.",
    sources: ["react-useSyncExternalStore", "react-18"],
  },
  {
    question: "Co jest nie tak z tym `getSnapshot`?",
    code: `useSyncExternalStore(subscribe, () => ({ items: store.items }));`,
    options: [
      "Zwraca nowy obiekt przy każdym wywołaniu, React widzi nieskończone zmiany i się zapętla",
      "`getSnapshot` musi być asynchroniczny",
      "Migawki nie mogą zawierać tablic",
    ],
    answer: 0,
    explanation:
      "React wielokrotnie wywołuje `getSnapshot` i porównuje wyniki przez `Object.is`; nowy obiekt za każdym razem oznacza „zmieniło się”, co powoduje nieskończone rendery. Zwracaj z store'a wartość z cache/niemutowalną (lub prymityw).",
    sources: ["react-useSyncExternalStore"],
  },
  {
    question: "Jaka jest różnica między modelem „subskrypcji selektora” (Redux, Zustand) a Contextem?",
    options: [
      "Store powiadamia komponenty, a każdy renderuje się tylko, gdy zmieniła się wybrana przez niego część",
      "Context natywnie obsługuje selektory przez drugi argument `useContext`",
      "Store'y renderują całe drzewo, a Context aktualizuje jeden komponent",
    ],
    answer: 0,
    explanation:
      "Context nie ma selektorów: każda zmiana `value` renderuje wszystkich konsumentów. Store'y wykonują selektor każdego subskrybenta i porównują wyniki, więc aktualizacje są punktowe. Biblioteki takie jak `use-context-selector` emulują to na bazie Contextu.",
    sources: ["react-useContext", "react-redux-hooks"],
  },
  {
    question: "Gdzie w aplikacji z routingiem najlepiej trzymać stan filtra listy (wyszukiwanie, sortowanie, strona)?",
    options: [
      "W parametrach search URL — linkiem można się podzielić, stan przetrwa przeładowanie i działa z „wstecz/dalej”",
      "W globalnym store Reduxa, by mógł go czytać każdy komponent",
      "W `useRef`, by zmiany nie wywoływały renderów",
    ],
    answer: 0,
    explanation:
      "URL to też stan. Filtry w `?q=&sort=&page=` sprawiają, że linki łatwo udostępniać, a historia ma sens; loadery i klucze zapytań mogą się z nich wywodzić. Wpisywany tekst się debounce'uje i zastępuje (a nie dodaje) wpisy historii przy każdym naciśnięciu.",
    sources: ["rr-state-management", "mdn-url"],
  },
  {
    question: "Jaka klasyfikacja stanu pomaga wybierać narzędzia w dużej aplikacji?",
    options: [
      "Cache serwerowy, stan URL, stan formularzy, lokalny stan UI i globalny stan klienta",
      "Tylko stan synchroniczny i asynchroniczny",
      "Stan prymitywny i obiektowy",
    ],
    answer: 0,
    explanation:
      "Każdy rodzaj ma naturalne miejsce: cache serwerowy — TanStack Query/RTK Query/SWR/loadery; URL — router; formularze — stan lokalny lub biblioteka formularzy; UI — `useState`; naprawdę globalny stan klienta — Context lub store. Wrzucanie wszystkiego do jednego store'a robi z niego wąskie gardło.",
    sources: ["tkdodo-practical-rq", "redux-style-guide"],
  },

  // ---------- Zaawansowany Context ----------
  {
    question: "Jak sprawić, by konsumenci `CartContext` używający tylko akcji w stylu `dispatch` nie renderowali się ponownie?",
    options: [
      "Przekazywać stan i akcje w osobnych kontekstach; wartość kontekstu akcji jest stabilna",
      "Owinąć providera w `React.memo`",
      "Trzymać akcje w `useRef` wewnątrz każdego konsumenta",
    ],
    answer: 0,
    explanation:
      "Przyciski, które tylko wywołują `addItem`, czytają `CartActionsContext` (zmemoizowany raz), więc zmiany koszyka ich nie renderują. Aktualizują się tylko komponenty czytające `CartStateContext`.",
    sources: ["react-reducer", "react-useContext"],
  },
  {
    question: "Dlaczego providery Contextu w Next.js App Router wydziela się do osobnego komponentu klienckiego?",
    options: [
      "`createContext` to API tylko klienckie; serwerowy layout renderuje `<Providers>{children}</Providers>`",
      "Komponenty serwerowe renderują providery dwukrotnie",
      "Providery trzeba ładować leniwie, by uniknąć SSR",
    ],
    answer: 0,
    explanation:
      "Plik `providers.tsx` z `'use client'` owija `children`, które pozostają komponentami serwerowymi, bo są przekazywane jako propsy. Umieszczaj providery jak najgłębiej, by większa część drzewa pozostała statyczna.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "Dlaczego „jeden duży AppContext z całym stanem” uważa się za antywzorzec?",
    options: [
      "Każda zmiana renderuje wszystkich konsumentów i wiąże niepowiązane moduły przez jeden obiekt",
      "Context nie może przechowywać więcej niż dziesięciu pól",
      "Nie można go używać w Server Components",
    ],
    answer: 0,
    explanation:
      "Wpisywanie w pole wyszukiwania renderuje koszyk i nagłówek. Dziel według domen i częstotliwości aktualizacji, trzymaj stan blisko miejsca użycia, a często zmieniający się wspólny stan przenieś do store'a z selektorami.",
    sources: ["react-useContext", "rg-smells"],
  },
  {
    question: "Co dodaje `use(Context)` w React 19 w porównaniu z `useContext`?",
    options: [
      "Można go wywoływać warunkowo (np. po wczesnym return)",
      "Subskrybuje tylko jedno pole wartości kontekstu",
      "Udostępnia kontekst w Server Components",
    ],
    answer: 0,
    explanation:
      "`use` nie podlega regule „tylko na najwyższym poziomie”, więc `if (!show) return null; const theme = use(ThemeContext)` działa. Poza tym czyta tego samego najbliższego providera i nie dodaje selektorów.",
    sources: ["react-use", "react-useContext"],
  },

  // ---------- Zaawansowany Redux Toolkit ----------
  {
    question: "Do czego służy `createListenerMiddleware`?",
    options: [
      "Do uruchamiania efektów ubocznych w odpowiedzi na konkretne akcje lub zmiany stanu",
      "Do subskrybowania komponentów React na poszczególne pola store'a",
      "Do zamiany zdarzeń DOM na akcje Reduxa",
    ],
    answer: 0,
    explanation:
      "Lekka alternatywa dla sag: `startListening({ actionCreator: todoAdded, effect: async (action, api) => {...} })`. Efekty mogą czekać na inne akcje (`take`), być anulowane, robić debounce i czytać stan przed i po akcji.",
    sources: ["rtk-listener"],
  },
  {
    question: "Co dodaje `combineSlices` w Redux Toolkit?",
    options: [
      "Leniwe wstrzykiwanie slice'ów: funkcje z code splittingiem dodają swoje reducery przy ładowaniu",
      "Scalenie dwóch slice'ów w jeden z połączonymi typami akcji",
      "Automatyczne zapisywanie slice'ów w magazynie",
    ],
    answer: 0,
    explanation:
      "`const rootReducer = combineSlices(authSlice)`, a później `rootReducer.inject(lazySlice)` z leniwie ładowanego modułu. Otypowane selektory (`slice.selectors`) uwzględniają, że slice może nie być jeszcze wstrzyknięty.",
    sources: ["rtk-combineSlices"],
  },
  {
    question: "Dlaczego do store'a Reduxa nie wkłada się promise'ów, instancji klas i funkcji?",
    options: [
      "Psuje to serializowalność: DevTools, zapisywanie, przekazywanie przy SSR i time travel",
      "Redux może przechowywać tylko stringi i liczby",
      "Spowalnia to `useSelector` kilkudziesięciokrotnie",
    ],
    answer: 0,
    explanation:
      "Store powinien zawierać zwykłe dane, które można logować, zapisywać i odtwarzać. Nieserializowalne obiekty trzyma się na zewnątrz (np. w module lub listenerze), a w store — id lub serializowalne migawki.",
    sources: ["redux-style-guide", "rtk-configureStore"],
  },
  {
    question: "Czego potrzebuje zmemoizowany selektor z `createSelector`, by był wydajny z argumentami?",
    code: `const selectByCategory = createSelector(
  [(s) => s.products, (s, category) => category],
  (products, category) => products.filter((p) => p.category === category),
);`,
    options: [
      "Wejść o stabilnych referencjach; osobnej instancji selektora na argument, jeśli używa się go w wielu miejscach",
      "Owinięcia każdego wejścia w `useMemo`",
      "Zwracania nowej tablicy z każdego selektora wejściowego",
    ],
    answer: 0,
    explanation:
      "Domyślny cache pamięta ostatnie wejścia, więc przeplatanie argumentów w kilku komponentach (`'books'`, `'toys'`) za każdym razem przelicza wynik. Twórz selektor na komponent (`useMemo(makeSelector, [])`) albo skonfiguruj większy cache (`weakMapMemoize` — domyślny w Reselect 5).",
    sources: ["rtk-createSelector", "redux-selectors"],
  },
  {
    question: "Dlaczego Redux zaleca strukturę „ducks”/folderów według funkcji z `createSlice`?",
    options: [
      "Stan, reducery, akcje i selektory funkcji żyją razem, mniej rozrzuconego boilerplate'u",
      "Redux wymaga osobnego pliku dla każdego typu akcji",
      "Jest to potrzebne, by `configureStore` znalazł reducery",
    ],
    answer: 0,
    explanation:
      "Style guide zaleca organizację według funkcji i `createSlice`, by logiką slice'a zarządzał jeden plik. Reakcje między funkcjami — przez `extraReducers` lub listenery, a nie przez bezpośrednią ingerencję w cudze slice'y.",
    sources: ["redux-style-guide", "rtk-createSlice"],
  },
  {
    question: "Reducer dla `orders/placed` musi też wyczyścić slice koszyka. Jak zrobić to idiomatycznie?",
    options: [
      "Niech slice koszyka obsłuży `orders/placed` w swoich `extraReducers`",
      "Wysłać `cart/cleared` z wnętrza reducera zamówień",
      "Zmutować slice koszyka z reducera zamówień przez `getState()`",
    ],
    answer: 0,
    explanation:
      "Reducery nie mogą wysyłać akcji ani dotykać innych slice'ów. Wiele reducerów reagujących na jedno zdarzenie to właśnie zamierzony model Reduxa: akcja opisuje, co się stało, a każdy slice decyduje, jak zareagować.",
    sources: ["redux-style-guide", "rtk-createSlice"],
  },

  // ---------- Zaawansowany Zustand ----------
  {
    question: "Czym grozi store Zustand na poziomie modułu przy SSR (Next.js)?",
    options: [
      "Na serwerze jedna instancja modułu jest wspólna dla wszystkich żądań, a dane użytkowników mogą wyciec",
      "Zustand w ogóle nie działa na serwerze",
      "Store jest tworzony od nowa przy każdym imporcie",
    ],
    answer: 0,
    explanation:
      "Przewodnik dla Next.js zaleca tworzenie store'a na każde żądanie przez `createStore` i przekazywanie go przez provider Contextu, a odczyt przez `useStore(storeApi, selector)`. W czysto klienckim SPA globalny store jest w porządku.",
    sources: ["zustand-nextjs"],
  },
  {
    question: "Jak zapisywać tylko część pól store'a Zustand i obsługiwać zmiany schematu?",
    options: [
      "`partialize` do wyboru pól oraz `version` + `migrate` dla starych danych",
      "Utworzyć osobny store dla każdego pola",
      "Persist zawsze zapisuje cały store i nie umie migrować",
    ],
    answer: 0,
    explanation:
      "`persist(fn, { name, partialize: (s) => ({ cart: s.cart }), version: 2, migrate: (old, v) => ... })`. Bez migracji przemianowane pole zostawi w magazynie użytkowników zepsute dane.",
    sources: ["zustand-persist"],
  },
  {
    question: "Jak reagować na zmiany w Zustand poza Reactem (np. synchronizować z SDK analityki)?",
    options: [
      "`useStore.subscribe(listener)` (lub `subscribeWithSelector` dla części stanu)",
      "Odpytywać `getState()` przez `setInterval`",
      "Nie da się: subskrypcje działają tylko w komponentach",
    ],
    answer: 0,
    explanation:
      "`subscribe` zwraca funkcję anulującą subskrypcję. Middleware `subscribeWithSelector` pozwala subskrybować konkretny selektor z funkcją porównania — wygodne dla efektów ubocznych powiązanych z jednym polem.",
    sources: ["zustand-intro"],
  },
  {
    question: "Co daje store'owi Zustand middleware `devtools`?",
    options: [
      "Integrację z Redux DevTools: dziennik akcji i time travel",
      "Automatyczne generowanie typów dla store'a",
      "Wizualny edytor store'a w przeglądarce",
    ],
    answer: 0,
    explanation:
      "`create(devtools((set) => ...))` i nazwane aktualizacje (`set(fn, false, 'cart/add')`) sprawiają, że historia jest czytelna. To jeden z powodów wyboru Zustand: lekki, ale łatwy do debugowania.",
    sources: ["zustand-devtools"],
  },
  {
    question: "Zustand czy Redux Toolkit: kiedy RTK jest mocniejszym wyborem?",
    options: [
      "Duże zespoły, które potrzebują ścisłych konwencji, middleware, listenerów i RTK Query w jednym ekosystemie",
      "Małe aplikacje z jednym-dwoma kawałkami stanu globalnego",
      "Gdy chce się całkowicie uniknąć boilerplate'u",
    ],
    answer: 0,
    explanation:
      "Zustand jest minimalistyczny i elastyczny; RTK narzuca uporządkowany model zdarzeń z mocnymi narzędziami. Oba wybory są dobre — decydują wielkość zespołu, konwencje i to, czy będziecie używać RTK Query.",
    sources: ["redux-why-rtk", "zustand-intro"],
  },

  // ---------- Zaawansowany TanStack Query ----------
  {
    question: "Jak zaimplementować optymistyczną aktualizację przez cache w TanStack Query?",
    options: [
      "`onMutate`: anulować zapytania, zrobić migawkę i zaktualizować cache; `onError`: wycofać; `onSettled`: zinwalidować",
      "Wywołać `invalidateQueries` na początku mutacji",
      "Ustawić `optimistic: true` w zapytaniu listy",
    ],
    answer: 0,
    explanation:
      "`cancelQueries` nie pozwala trwającemu pobieraniu nadpisać danych optymistycznych; migawka z `getQueryData` jest zwracana jako kontekst do wycofania. W v5 jest też prostsze podejście: pokazywać `variables`, dopóki mutacja jest `isPending`, bez ruszania cache.",
    sources: ["tq-optimistic", "tq-mutations"],
  },
  {
    question: "Czym jest structural sharing w TanStack Query?",
    options: [
      "Niezmienione części ponownie pobranej odpowiedzi zachowują stare referencje",
      "Jeden cache jest wspólny dla kart przeglądarki",
      "Odpowiedzi wszystkich zapytań są przechowywane w jednej znormalizowanej tabeli",
    ],
    answer: 0,
    explanation:
      "Nowy JSON jest głęboko porównywany ze starym, a równe poddrzewa ponownie wykorzystują referencje, więc komponenty `memo` i zależności efektów nie reagują na identyczne dane. Dla ogromnych danych nie-JSON można to wyłączyć.",
    sources: ["tq-render-optimizations", "tq-caching"],
  },
  {
    question: "Dlaczego zaleca się fabryki kluczy zapytań?",
    code: `export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "list"] as const,
  list: (filters: Filters) => [...todoKeys.lists(), filters] as const,
  detail: (id: number) => [...todoKeys.all, "detail", id] as const,
};`,
    options: [
      "Klucze pozostają spójne i hierarchiczne, więc inwalidacja po prefiksie jest niezawodna",
      "TanStack Query wymaga deklarowania kluczy w jednym obiekcie",
      "Fabryki sprawiają, że zapytania wykonują się równolegle",
    ],
    answer: 0,
    explanation:
      "Literówki w ręcznie pisanych kluczach po cichu psują cache'owanie i inwalidację. Fabryka daje jedno źródło prawdy: `invalidateQueries({ queryKey: todoKeys.lists() })` odświeża wszystkie listy, ale nie szczegóły.",
    sources: ["tq-query-keys", "tq-invalidation"],
  },
  {
    question: "Jak przekazać dane TanStack Query pobrane wcześniej na serwerze do komponentów klienckich w Next.js App Router?",
    options: [
      "`prefetchQuery` na serwerze, `dehydrate`, potem `<HydrationBoundary state>`",
      "Zapisać je w `localStorage` na serwerze",
      "Użyć opcji `ssr: true` w `useQuery`",
    ],
    answer: 0,
    explanation:
      "`QueryClient` tworzony na każde żądanie pobiera z wyprzedzeniem i serializuje cache; kliencki `HydrationBoundary` wkłada go do cache przeglądarki, więc `useQuery` z tym samym kluczem renderuje się od razu bez ponownego pobierania.",
    sources: ["tq-ssr", "tq-prefetching"],
  },
  {
    question: "Dlaczego na serwerze nie wolno tworzyć jednego globalnego `QueryClient` dla wszystkich żądań?",
    options: [
      "Dane jednego użytkownika mogą trafić do innego ze wspólnego cache",
      "Globalny klient nie obsługuje funkcji asynchronicznych",
      "Next.js zabrania zmiennych na poziomie modułu",
    ],
    answer: 0,
    explanation:
      "Proces serwera obsługuje wielu użytkowników. Twórz klienta na każde żądanie (np. przez React `cache()` w RSC). W przeglądarce natomiast jeden klient na całą aplikację to poprawne podejście.",
    sources: ["tq-ssr", "react-cache"],
  },
  {
    question: "Co zmienia `useSuspenseQuery`?",
    options: [
      "Ładowanie obsługuje `<Suspense>`, błędy — error boundary, a `data` jest zawsze zdefiniowane",
      "Cache'uje dane na zawsze i nigdy nie pobiera ich ponownie",
      "Działa tylko w Server Components",
    ],
    answer: 0,
    explanation:
      "Wewnątrz komponentu nie trzeba sprawdzać `isPending`. Niuanse: `enabled` jest niedostępne, a zapytania wstrzymujące się po kolei tworzą kaskady — pobieraj z wyprzedzeniem lub używaj `useSuspenseQueries` do równoległego ładowania.",
    sources: ["tq-suspense", "react-suspense"],
  },
  {
    question: "Co trzeba skonfigurować dla `useInfiniteQuery`?",
    options: [
      "`initialPageParam` i `getNextPageParam`",
      "`pageSize` i `totalPages`",
      "`cursor` w kluczu i ręczny `refetch` przy przewijaniu",
    ],
    answer: 0,
    explanation:
      "Dane to `{ pages, pageParams }`; `getNextPageParam(lastPage)` zwraca następny kursor lub `undefined`, gdy stron już nie ma (`hasNextPage` staje się false). `fetchNextPage` często wyzwala się przez `IntersectionObserver`.",
    sources: ["tq-infinite"],
  },
  {
    question: "Jak w TanStack Query anulować trwające żądanie, gdy przestało być potrzebne?",
    options: [
      "Przekazać `signal` z kontekstu `queryFn` do `fetch`",
      "Wywołać `AbortController.abort()` w `onSuccess`",
      "Włączyć globalną opcję `cancelOnUnmount`",
    ],
    answer: 0,
    explanation:
      "`queryFn: ({ signal }) => fetch(url, { signal })`. Biblioteka anuluje żądanie, jeśli komponent odmontował się przed odpowiedzią, zmienił się klucz lub wywołano `cancelQueries`. Bez `signal` anulowane jest tylko przetwarzanie wyniku.",
    sources: ["tq-cancellation", "mdn-abort-controller"],
  },
  {
    question: "Co daje opcja `select` w `useQuery`?",
    code: `const count = useQuery({ queryKey: ["todos"], queryFn, select: (d) => d.length });`,
    options: [
      "Wartość pochodną; komponent renderuje się ponownie tylko wtedy, gdy się zmieniła",
      "Wybór między kilkoma `queryFn`",
      "Listę pól dla zapytania do serwera GraphQL",
    ],
    answer: 0,
    explanation:
      "Cache przechowuje pełną odpowiedź, a każdy komponent subskrybuje swoją projekcję. Utrzymuj funkcję `select` stabilną (deklaruj na zewnątrz lub memoizuj), by nie uruchamiała się przy każdym renderze.",
    sources: ["tq-render-optimizations"],
  },

  // ---------- Zaawansowany RTK Query ----------
  {
    question: "Jak zrobić optymistyczną aktualizację w RTK Query?",
    options: [
      "`updateQueryData` w `onQueryStarted`, potem `patchResult.undo()`, jeśli `queryFulfilled` zostanie odrzucone",
      "Przekazać `optimistic: true` w definicji endpointu",
      "Zinwalidować tagi przed wysłaniem żądania",
    ],
    answer: 0,
    explanation:
      "`dispatch(api.util.updateQueryData('getPost', id, (draft) => { draft.title = t }))` edytuje cache przez Immera i zwraca obiekt patcha; `try { await queryFulfilled } catch { patch.undo() }` go wycofuje.",
    sources: ["rtk-query-manual-updates"],
  },
  {
    question: "Jak RTK Query decyduje, które zapytania pobrać ponownie przy tagach z id?",
    code: `providesTags: (result) => [
  ...(result?.map(({ id }) => ({ type: "Post" as const, id })) ?? []),
  { type: "Post", id: "LIST" },
],`,
    options: [
      "Mutacja inwalidująca `{ type: 'Post', id: 5 }` pobiera ponownie tylko zapytania z tym tagiem",
      "Każda mutacja pobiera ponownie wszystkie zapytania z dowolnym tagiem `Post`",
      "Tagi z id są ignorowane, liczy się tylko typ",
    ],
    answer: 0,
    explanation:
      "Edycja posta 5 inwaliduje `{ type: 'Post', id: 5 }` (szczegóły i listy, w których jest), a dodanie posta — `{ type: 'Post', id: 'LIST' }`. Punktowe tagi oszczędzają ponownego pobierania wszystkiego.",
    sources: ["rtk-query-invalidation"],
  },
  {
    question: "Do czego w endpoincie RTK Query używa się `transformResponse`?",
    options: [
      "Aby przekształcić surową odpowiedź API (np. rozpakować lub znormalizować) przed cache'owaniem",
      "Aby przekonwertować ciało żądania do JSON",
      "Aby zmienić metodę HTTP żądania",
    ],
    answer: 0,
    explanation:
      "`transformResponse: (res) => res.data.items` nie wpuszcza osobliwości API do komponentów i cache. Dla znormalizowanego cache można go łączyć z `createEntityAdapter`.",
    sources: ["rtk-query-queries"],
  },
  {
    question: "Jak zapisać wynik mutacji bezpośrednio do zapytania w cache bez ponownego pobierania (aktualizacja pesymistyczna)?",
    options: [
      "Poczekać na `queryFulfilled` w `onQueryStarted`, potem `updateQueryData` z odpowiedzią",
      "Zwrócić dane z `invalidatesTags`",
      "Wywołać hook zapytania wewnątrz mutacji",
    ],
    answer: 0,
    explanation:
      "Aktualizacja pesymistyczna czeka na serwer, a potem edytuje cache — bez dodatkowego żądania, ale UI zaktualizuje się dopiero po odpowiedzi. Aktualizacje optymistyczne najpierw edytują cache i wycofują zmianę przy błędzie.",
    sources: ["rtk-query-manual-updates"],
  },
  {
    question: "Czy RTK Query i stan `createSlice` mogą współistnieć w jednym store?",
    options: [
      "Tak: slice API to po prostu kolejny reducer + middleware; slice'y mogą reagować na jego akcje",
      "Nie: RTK Query wymaga osobnego store'a",
      "Tylko jeśli wszystkie slice'y zamieni się w endpointy RTK Query",
    ],
    answer: 0,
    explanation:
      "Slice'y mogą nasłuchiwać akcji endpointów (`builder.addMatcher(api.endpoints.login.matchFulfilled, ...)`) — np. by zapisać token po zalogowaniu — a dane serwerowe zostają w cache RTK Query.",
    sources: ["rtk-query-overview", "rtk-createSlice"],
  },

  // ---------- Zaawansowany SWR ----------
  {
    question: "Jak zrobić optymistyczną aktualizację przez `mutate` w SWR?",
    options: [
      "Przekazać `optimisticData` i `rollbackOnError` razem z asynchroniczną funkcją aktualizacji",
      "Wywołać `mutate` dwa razy: przed i po żądaniu",
      "SWR nie obsługuje aktualizacji optymistycznych",
    ],
    answer: 0,
    explanation:
      "`mutate(updateTodo(newTodo), { optimisticData: [...todos, newTodo], rollbackOnError: true, populateCache: true, revalidate: false })` od razu pokazuje zmianę i wycofuje ją, jeśli żądanie się nie powiedzie.",
    sources: ["swr-mutation"],
  },
  {
    question: "Co daje `useSWRMutation` w porównaniu z wywołaniem `fetch`, a potem `mutate`?",
    options: [
      "Funkcję `trigger` ze stanem `isMutating`/`error`, powiązaną z kluczem",
      "Automatycznie ponawia żądanie w nieskończoność",
      "Wykonuje mutację przy każdym renderze",
    ],
    answer: 0,
    explanation:
      "`const { trigger, isMutating } = useSWRMutation('/api/todos', sendRequest)` — żądanie wykonuje się tylko po wywołaniu `trigger`, a cache klucza można zaktualizować wynikiem. To odpowiednik `useMutation` w SWR.",
    sources: ["swr-mutation"],
  },
  {
    question: "Jak SWR unika renderu komponentu, gdy zmieniają się niezwiązane z nim pola odpowiedzi?",
    options: [
      "Śledzenie zależności: komponent renderuje się tylko z powodu zwróconych pól, które faktycznie czyta",
      "Porównuje odpowiedzi przez `JSON.stringify` i nigdy nie renderuje",
      "Wymaga owinięcia komponentu w `React.memo`",
    ],
    answer: 0,
    explanation:
      "Jeśli komponent używa tylko `data`, zmiany `isValidating` go nie wyrenderują. Ponadto SWR domyślnie głęboko porównuje dane (opcja `compare`), więc identyczne ponowne pobranie nie wywołuje aktualizacji.",
    sources: ["swr-performance"],
  },
  {
    question: "Jak przekazać do SWR dane pobrane na serwerze, by były dostępne przy pierwszym renderze klienta?",
    options: [
      "Przekazać je jako `fallback` w `<SWRConfig>` pod tym samym kluczem (lub `fallbackData` w hooku)",
      "Zapisać je w `localStorage` na serwerze",
      "Wywołać `mutate` w `useEffect` po zamontowaniu",
    ],
    answer: 0,
    explanation:
      "`<SWRConfig value={{ fallback: { '/api/user': user } }}>` sprawia, że `useSWR('/api/user')` od razu zwraca dane; SWR i tak je zrewaliduje zgodnie ze swoimi opcjami.",
    sources: ["swr-global-config", "swr-intro"],
  },
  {
    question: "SWR czy TanStack Query: które porównanie jest uczciwe?",
    options: [
      "SWR jest mniejszy i prostszy; TanStack Query daje więcej wbudowanych funkcji (devtools, mutacje, precyzyjną kontrolę cache)",
      "SWR działa tylko z Next.js, TanStack Query — tylko z Vite",
      "TanStack Query nie obsługuje stale-while-revalidate",
    ],
    answer: 0,
    explanation:
      "Oba implementują stale-while-revalidate z deduplikacją i rewalidacją przy fokusie. TanStack Query ma bogatszy cykl życia mutacji, anulowanie zapytań, nieskończone zapytania i oficjalne devtools; SWR wygrywa rozmiarem i prostotą.",
    sources: ["swr-intro", "tq-overview"],
  },

  // ---------- Zaawansowane loader / action w React Router ----------
  {
    question: "Dlaczego mówi się, że loadery tras eliminują „kaskady żądań” w porównaniu z pobieraniem w `useEffect`?",
    options: [
      "Router zna wszystkie dopasowane trasy i uruchamia ich loadery równolegle przed renderem",
      "Loadery cache'ują odpowiedzi na zawsze",
      "Loadery działają w Web Workerze",
    ],
    answer: 0,
    explanation:
      "Z efektami rodzic się renderuje, potem pobiera dane, potem renderuje dziecko, które znów pobiera. Zagnieżdżone loadery dla `/users/:id/orders` startują jednocześnie przy nawigacji, a moduły tras z code splittingiem mogą ładować się równolegle z danymi.",
    sources: ["rr-data-loading", "rr-state-management"],
  },
  {
    question: "Jak nie uruchamiać ponownie loadera po każdym action na stronie?",
    options: [
      "Wyeksportować z trasy `shouldRevalidate` i zwracać `false`, gdy dane nie mogą się zmienić",
      "Owinąć loader w `useMemo`",
      "Zwracać nagłówki cache'owania z action",
    ],
    answer: 0,
    explanation:
      "Domyślnie po action rewalidowane są wszystkie aktywne loadery — to bezpieczne, ale może być marnotrawne. `shouldRevalidate({ formAction, currentUrl, nextUrl, defaultShouldRevalidate })` pozwala z tego wybiórczo zrezygnować.",
    sources: ["rr-actions", "rr-data-loading"],
  },
  {
    question: "Jak zbudować optymistyczne UI z fetcherem w React Router?",
    options: [
      "Renderować z `fetcher.formData`, dopóki `fetcher.state !== 'idle'`, w przeciwnym razie — z danych loadera",
      "Najpierw zaktualizować globalny store, a potem wywołać action",
      "Optymistyczne UI jest niemożliwe z loaderami i actionami",
    ],
    answer: 0,
    explanation:
      "Wysłane wartości są dostępne od razu: `const done = fetcher.formData ? fetcher.formData.get('done') === 'true' : todo.done`. Po zakończeniu action i rewalidacji loaderów do gry wchodzą prawdziwe dane.",
    sources: ["rr-useFetcher", "rr-pending-ui"],
  },
  {
    question: "Jak strumieniować wolne, niekrytyczne dane z loadera React Router?",
    options: [
      "Zwrócić promise (bez await) i wyrenderować go przez `<Suspense>` + `<Await>` lub `use()`",
      "Podzielić loader na dwie trasy",
      "Użyć `setTimeout` wewnątrz komponentu",
    ],
    answer: 0,
    explanation:
      "Na krytyczne dane się czeka, resztę zwraca się jako promise: `return { product: await getProduct(), reviews: getReviews() }`. Strona renderuje się od razu, a opinie dociągają się strumieniowo.",
    sources: ["rr-pending-ui", "react-suspense"],
  },
  {
    question: "Czy przy loaderach React Router potrzebna jest biblioteka cache klienta (TanStack Query)?",
    options: [
      "Często nie; loadery + rewalidacja wystarczają wielu aplikacjom, ale cache pomaga przy współdzielonych danych i precyzyjnej kontroli",
      "Zawsze — loadery nie działają bez biblioteki cache",
      "Nigdy — nie da się ich łączyć",
    ],
    answer: 0,
    explanation:
      "Loadery wiążą dane z trasami i rewalidują je po actionach. Dla danych używanych na wielu trasach, odświeżania w tle, nieskończonych list czy trybu offline łączy się je: loadery wywołują `queryClient.ensureQueryData`, a komponenty — `useQuery`.",
    sources: ["rr-state-management", "tq-prefetching"],
  },
  {
    question: "Jak błędy walidacji z `action` React Router powinny trafiać do formularza?",
    options: [
      "Zwrócić je jako dane z action i czytać przez `useActionData` / `fetcher.data`",
      "Rzucić je, by error boundary trasy pokazał błędy formularza",
      "Trzymać je w globalnym store",
    ],
    answer: 0,
    explanation:
      "Oczekiwane błędy (niepoprawny email) to dane: `return { errors }` (często ze statusem 400). Rzucone błędy trafiają do `ErrorBoundary` i zastępują UI trasy — to dla nieoczekiwanych awarii.",
    sources: ["rr-actions"],
  },

  // ---------- Architektura i migracja ----------
  {
    question: "Aplikacja legacy trzyma odpowiedzi API w slice'ach Reduxa z ręcznymi flagami ładowania. Jaka migracja jest pragmatyczna?",
    options: [
      "Przenosić dane serwerowe do RTK Query (lub TanStack Query) endpoint po endpoincie, zostawiając slice'y dla stanu klienta",
      "Przepisać wszystko na Zustand w jednym wydaniu",
      "Przenieść cały stan do Contextu",
    ],
    answer: 0,
    explanation:
      "Stopniowa migracja zmniejsza ryzyko: każdy endpoint zastępuje thunk, pola jego slice'a i flagi ładowania. RTK Query żyje w tym samym store, więc oba podejścia współistnieją w trakcie przejścia.",
    sources: ["rtk-query-overview", "redux-why-rtk"],
  },
  {
    question: "Jak zsynchronizować stan klienta dwóch kart przeglądarki (np. wylogowanie w jednej karcie)?",
    options: [
      "Rozsyłać zmiany przez `BroadcastChannel` lub zdarzenie `storage` i aktualizować store",
      "Używać jednego obiektu store'a Reduxa dla wszystkich kart",
      "Przeładowywać wszystkie karty co minutę",
    ],
    answer: 0,
    explanation:
      "Każda karta to osobne środowisko JS z własnym store'em. Komunikat przy wylogowaniu pozwala innym kartom wyczyścić stan; zdarzenia magazynu przy `persist` mogą ponownie zhydratować Zustand. Cache serwerowe dodatkowo pobierają się ponownie przy fokusie.",
    sources: ["mdn-broadcast-channel", "mdn-web-storage"],
  },
  {
    question: "Jakie jest główne ryzyko kopiowania danych serwerowych z `useQuery` do store'a Zustand/Redux?",
    options: [
      "Dwa źródła prawdy: kopia się dezaktualizuje i wymaga ręcznej synchronizacji",
      "TanStack Query usuwa dane skopiowane w inne miejsce",
      "Store'y nie mogą przechowywać tablic zwróconych przez zapytania",
    ],
    answer: 0,
    explanation:
      "Czytaj dane serwerowe z cache zapytań wszędzie, gdzie są potrzebne (ten sam hook w wielu komponentach jest deduplikowany). W store trzymaj tylko decyzje klienta (wybrane id, filtry), a resztę wyprowadzaj.",
    sources: ["tq-client-state", "tkdodo-practical-rq"],
  },
  {
    question: "Jakie podejście sprawia, że logikę stanu najłatwiej testować jednostkowo, niezależnie od biblioteki?",
    options: [
      "Trzymać przejścia w czystych funkcjach (reducery, reducery slice'ów, akcje store'a) i testować bez renderu",
      "Testować wyłącznie testami end-to-end w prawdziwej przeglądarce",
      "Mockować samego Reacta w każdym teście",
    ],
    answer: 0,
    explanation:
      "Reducer lub akcję store'a testuje się wywołaniem z danymi wejściowymi i sprawdzeniem wyniku. Komponenty testuje się potem przez zachowanie (React Testing Library), a wywołania serwera mockuje na poziomie sieci (np. MSW).",
    sources: ["react-reducer", "redux-style-guide"],
  },
  {
    question: "Kiedy maszyna stanów (np. XState) jest lepsza niż reducer z flagami?",
    options: [
      "W złożonych scenariuszach z wieloma stanami i strzeżonymi przejściami (checkout, odtwarzacz wideo, kreatory)",
      "Dla każdego przełącznika logicznego",
      "Nigdy — reducery nie potrafią wyrażać stanów",
    ],
    answer: 0,
    explanation:
      "Flagi takie jak `isLoading`/`isError`/`isSuccess` dopuszczają niemożliwe kombinacje. Maszyna (lub reducer na unii dyskryminowanej) czyni stany jawnymi, a przejścia strzeżonymi; statecharts dodają stany zagnieżdżone i równoległe.",
    sources: ["rg-state", "react-reducer"],
  },
];

export default questions;
