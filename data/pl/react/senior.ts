import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Dlaczego `cache()` z React przydaje się w Server Components?",
    options: [
      "Deduplikuje wywołania z tymi samymi argumentami w obrębie jednego żądania",
      "Przechowuje wynik funkcji między żądaniami różnych użytkowników na zawsze",
      "Cache'uje JSX komponentu w przeglądarce między przejściami stron",
    ],
    answer: 0,
    explanation:
      "`const getUser = cache(async (id) => db.user.find(id))` — kilka komponentów w jednym renderze serwerowym może wywołać `getUser(1)`, a zapytanie do bazy wykona się raz. Cache żyje tylko w obrębie żądania, więc dane różnych użytkowników się nie mieszają. Cache'owanie między żądaniami w Next.js robi się przez `'use cache'`.",
    sources: ["react-cache", "next-use-cache"],
  },
  {
    question: "Czym jest Fiber w React?",
    options: [
      "Architekturą reconcilera: renderowanie jest dzielone na przerywalne jednostki pracy",
      "Wbudowanym klientem HTTP React do strumieniowania danych z serwera",
      "Alternatywnym silnikiem DOM, którego React używa zamiast przeglądarkowego",
    ],
    answer: 0,
    explanation:
      "Fiber (React 16+) przedstawia każdy węzeł drzewa jako obiekt „fiber” z informacją o jego pracy. Pozwala to wstrzymywać, przerywać i priorytetyzować renderowanie oraz ponownie wykorzystywać pracę — to podstawa możliwości współbieżnych (transitions, Suspense). Stary stack reconciler przechodził drzewo rekurencyjnie i nie potrafił się zatrzymać.",
    sources: ["react-fiber-architecture", "react-render-commit"],
  },
  {
    question: "Czym faza render różni się od fazy commit?",
    options: [
      "Render jest przerywalny i może się powtarzać; commit synchronicznie nanosi zmiany do DOM",
      "Render zmienia DOM bezpośrednio, a commit tylko zapisuje log zmian do DevTools",
      "Obie fazy są synchroniczne i wykonują się dokładnie raz na aktualizację stanu",
    ],
    answer: 0,
    explanation:
      "W fazie render React wywołuje komponenty i oblicza różnice — może zostać przerwana, odrzucona i uruchomiona ponownie, dlatego render musi być czysty. W fazie commit zmiany są nanoszone do DOM naraz bez przerywania, potem wykonują się efekty layoutu, a po malowaniu — zwykłe efekty.",
    sources: ["react-render-commit", "react-pure"],
  },
  {
    question: "Co renderowanie współbieżne daje użytkownikowi?",
    options: [
      "Pilne aktualizacje (wpisywanie) mogą przerwać ciężki niepilny render",
      "Komponenty renderują się równolegle w kilku wątkach CPU",
      "React renderuje wszystkie komponenty w Web Workerze, odciążając główny wątek",
    ],
    answer: 0,
    explanation:
      "Współbieżność nie oznacza wielowątkowości: JS nadal działa w jednym wątku. React może przygotowywać kilka wersji UI, oddawać sterowanie przeglądarce i przerywać pracę o niższym priorytecie (transitions) dla pilnej. Działa to, gdy używasz `startTransition`, `useDeferredValue` i Suspense.",
    sources: ["react-18", "react-useTransition"],
  },
  {
    question: "Co dzieje się podczas hydratacji?",
    options: [
      "React podpina handlery i stan do HTML wyrenderowanego przez serwer",
      "Serwer ponownie renderuje stronę po każdym kliknięciu użytkownika",
      "Przeglądarka ponownie pobiera cały HTML i zastępuje nim markup serwera",
    ],
    answer: 0,
    explanation:
      "`hydrateRoot` przechodzi po istniejącym DOM, renderuje komponenty na kliencie i oczekuje tego samego markupu, by po prostu go „ożywić”. Dopóki hydratacja się nie zakończy, UI jest widoczny, ale nieinteraktywny. Jeśli markup się nie zgadza, pojawia się błąd hydratacji, a poddrzewo jest renderowane ponownie na kliencie.",
    sources: ["react-hydrateRoot"],
  },
  {
    question: "Jaki kod w renderze typowo powoduje błąd hydratacji?",
    options: [
      "`new Date().toLocaleTimeString()` lub gałąź `typeof window !== 'undefined'`",
      "`useState` z wartością początkową z propsów przekazanych z serwera",
      "Wywołanie `useMemo` z pustą tablicą zależności w komponencie klienckim",
    ],
    answer: 0,
    explanation:
      "Serwer i klient muszą wyrenderować ten sam HTML. Czas, liczby losowe, sprawdzanie `window`, `localStorage` i lokalizacja przeglądarki dają różne wyniki. Wartości tylko klienckie pokazuj po zamontowaniu (efekt lub `useSyncExternalStore` z `getServerSnapshot`). Dla nieuniknionych różnic w tekście (znacznik czasu) jest `suppressHydrationWarning`.",
    sources: ["react-hydrateRoot", "react-useSyncExternalStore"],
  },
  {
    question: "Czym jest selektywna hydratacja w React 18+?",
    options: [
      "Hydratacją według granic Suspense z priorytetem tej, którą kliknął użytkownik",
      "Hydratacją tylko komponentów, które mają atrybut `hydrate`",
      "Wyłączeniem hydratacji dla wszystkich komponentów bez handlerów zdarzeń",
    ],
    answer: 0,
    explanation:
      "Każda granica `<Suspense>` hydratuje się niezależnie, bez czekania na cały kod. Jeśli użytkownik kliknie część, która nie jest jeszcze zhydratowana, React podnosi jej priorytet i odtwarza zdarzenie po hydratacji. Razem ze streamingiem skraca to czas do interaktywności.",
    sources: ["react-18", "react-suspense"],
  },
  {
    question: "Jak działa streaming SSR (`renderToPipeableStream`)?",
    options: [
      "HTML jest wysyłany częściami: powłoka od razu, treść Suspense, gdy będzie gotowa",
      "Serwer czeka na wszystkie dane i wysyła HTML jedną odpowiedzią skompresowaną gzipem",
      "Serwer wysyła tylko JSON, a HTML jest składany w całości na kliencie",
    ],
    answer: 0,
    explanation:
      "Serwer od razu wysyła powłokę z fallbackami, a gdy dane wewnątrz granicy Suspense są gotowe, dopisuje do strumienia HTML i mały skrypt, który wstawia go na miejsce. Wolny blok nie opóźnia już całej strony. Na tym zbudowany jest streaming w Next.js App Router.",
    sources: ["react-suspense", "next-streaming"],
  },
  {
    question: "Czym Server Components różnią się od komponentów klienckich?",
    options: [
      "Działają tylko na serwerze, nie mają stanu ani efektów i nie trafiają do paczki",
      "Renderują się raz na serwerze, a potem w pełni hydratują na kliencie",
      "To komponenty klasowe, które React uruchamia w osobnym procesie Node",
    ],
    answer: 0,
    explanation:
      "RSC mogą być `async` i mieć dostęp do bazy danych i systemu plików, a ich kod i zależności nie są wysyłane do przeglądarki. Wynikiem jest zserializowane drzewo (RSC payload). Hooki stanu, efekty i handlery zdarzeń są w nich niedostępne — do interaktywności służą komponenty klienckie.",
    sources: ["react-server-components", "next-server-client"],
  },
  {
    question: "Co robi dyrektywa `'use client'` na początku pliku?",
    options: [
      "Wyznacza granicę: moduł i wszystko, co importuje, trafia do paczki klienckiej",
      "Zabrania renderowania komponentu na serwerze; renderuje się tylko w przeglądarce",
      "Włącza ścisłe sprawdzanie hooków klienckich dla tego modułu",
    ],
    answer: 0,
    explanation:
      "`'use client'` stawia się w punkcie wejścia do poddrzewa klienckiego, a nie w każdym pliku: importowane moduły automatycznie stają się klienckie. Komponenty klienckie i tak są renderowane na serwerze przy SSR (do HTML) i hydratowane w przeglądarce.",
    sources: ["react-use-client", "next-use-client"],
  },
  {
    question: "Jak wyrenderować Server Component wewnątrz klienckiego `<Modal>`?",
    options: [
      "Przekazać go jako `children` (lub inny prop) z rodzica będącego Server Component",
      "Zaimportować Server Component bezpośrednio w pliku `Modal` z `'use client'`",
      "Opakować Server Component w `React.lazy` wewnątrz modułu klienckiego",
    ],
    answer: 0,
    explanation:
      "Moduł kliencki nie może importować komponentu serwerowego — import uczyniłby go klienckim. Ale rodzic serwerowy może wyrenderować `<Modal><ServerCart /></Modal>`: `ServerCart` wykona się na serwerze, a `Modal` dostanie gotowy wynik jako `children`.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "Których propsów nie można przekazać z Server Component do Client Component?",
    options: [
      "Zwykłych funkcji i instancji klas — nie są serializowalne",
      "Tablic i obiektów zagnieżdżonych głębiej niż trzy poziomy — są przycinane",
      "Stringów dłuższych niż 64 KB oraz wszelkich wartości `Date` i `Map`",
    ],
    answer: 0,
    explanation:
      "Propsy przechodzą przez sieć, więc muszą być serializowalne: prymitywy, tablice, zwykłe obiekty, `Date`, `Map`, `Set`, promise'y, JSX. Funkcji przekazać nie można — z wyjątkiem Server Functions (`'use server'`), które zamieniają się w referencję do wywołania.",
    sources: ["react-use-client", "react-use-server"],
  },
  {
    question: "Co ważnego trzeba pamiętać o funkcjach `'use server'` pod kątem bezpieczeństwa?",
    options: [
      "To publiczne endpointy HTTP: w środku sprawdzaj autoryzację i dane wejściowe",
      "Są dostępne tylko z komponentów twojej aplikacji, więc sprawdzenia są zbędne",
      "Next.js automatycznie sprawdza uprawnienia użytkownika przed ich wywołaniem",
    ],
    answer: 0,
    explanation:
      "Server Function można wywołać bezpośrednim żądaniem POST, omijając UI. Argumenty przychodzą od klienta i mogą być podrobione. Wewnątrz funkcji sprawdzaj sesję i uprawnienia, waliduj dane (np. przez Zod) i nie polegaj na tym, że przycisk widzą tylko administratorzy.",
    sources: ["react-use-server", "next-data-security"],
  },
  {
    question: "Do czego służy `useEffectEvent`?",
    options: [
      "Do czytania najnowszych propsów i stanu w efekcie bez dodawania ich do zależności",
      "Do subskrypcji efektu na natywne zdarzenia DOM bez `addEventListener`",
      "Do uruchamiania efektu tylko w odpowiedzi na kliknięcie, a nie po renderze",
    ],
    answer: 0,
    explanation:
      "Przykład: efekt połączenia z czatem zależy od `roomId`, a przy połączeniu trzeba pokazać powiadomienie z bieżącym `theme`. Dodanie `theme` do zależności spowodowałoby ponowne łączenie czatu przy zmianie motywu. `const onConnected = useEffectEvent(() => notify(theme))` zawsze widzi świeże `theme`, ale nie jest reaktywne.",
    sources: ["react-useEffectEvent", "react-separating-events"],
  },
  {
    question: "Co robi komponent `<Activity mode=\"hidden\">` (React 19.2)?",
    options: [
      "Ukrywa poddrzewo, zachowując jego stan i zwalniając efekty",
      "Usuwa poddrzewo z DOM i resetuje cały jego stan",
      "Wstrzymuje renderowanie poddrzewa, ale zostawia efekty aktywne",
    ],
    answer: 0,
    explanation:
      "Ukryte poddrzewo dostaje `display: none`, efekty są czyszczone, a aktualizacje renderują się z niskim priorytetem. Po przełączeniu z powrotem na `visible` stan (wpisany tekst, przewinięcie) jest zachowany, a efekty tworzone ponownie. Wygodne dla zakładek i wstępnego renderowania ekranów, które użytkownik prawdopodobnie odwiedzi.",
    sources: ["react-activity", "react-19-2"],
  },
  {
    question: "Do czego służy `useImperativeHandle`?",
    options: [
      "Do wystawienia rodzicowi przez ref ograniczonego zestawu metod zamiast węzła DOM",
      "Do wywoływania metod komponentu potomnego bez ref, po nazwie komponentu",
      "Do synchronicznej aktualizacji stanu rodzica z efektu komponentu potomnego",
    ],
    answer: 0,
    explanation:
      "`useImperativeHandle(ref, () => ({ focus, scrollToBottom }))` wystawia tylko potrzebne metody i ukrywa szczegóły implementacji. Imperatywne API to wyjątek dla fokusu, przewijania, animacji i mediów, a nie zamiennik propsów.",
    sources: ["react-useImperativeHandle", "react-dom-refs"],
  },
  {
    question: "Co robi ten hook?",
    code: `const useHandler = (f) => {
  const ref = useRef(f);
  ref.current = f;
  return useCallback((...args) => ref.current(...args), []);
};`,
    options: [
      "Zwraca stabilną funkcję, która zawsze wywołuje najnowszą wersję `f`",
      "Memoizuje wynik wywołania `f`, przeliczając go przy zmianie argumentów",
      "Wywołuje `f` raz przy montowaniu i zapamiętuje zwróconą wartość",
    ],
    answer: 0,
    explanation:
      "Referencja do callbacku jest stabilna (wygodne dla dzieci z `memo` i zależności efektów), ale w środku zawsze widzi świeże propsy i stan. Uwaga: zapis `ref.current` podczas renderu formalnie łamie czystość renderu; React proponuje do tego zadania `useEffectEvent`, a w efektach ref aktualizuje się w `useLayoutEffect`.",
    sources: ["react-useRef", "react-useEffectEvent"],
  },
  {
    question: "Czym jest tearing przy renderowaniu współbieżnym?",
    options: [
      "Różne części UI pokazują różne wersje zewnętrznego mutowalnego store'a",
      "Zakłócenie animacji podczas przewijania z powodu długich zadań w głównym wątku",
      "Błąd hydratacji, przy którym część DOM jest usuwana i rysowana od nowa",
    ],
    answer: 0,
    explanation:
      "Jeśli renderowanie zostanie przerwane, a w międzyczasie zmieni się zewnętrzny store (nie stan React), część komponentów odczyta starą wartość, a część nową. Chroni przed tym `useSyncExternalStore`. Dlatego zewnętrzne store'y powinny subskrybować przez niego, a nie przez `useEffect` + `useState`.",
    sources: ["react-useSyncExternalStore", "react-18"],
  },
  {
    question: "Który z tych scenariuszy powoduje wyciek pamięci w aplikacji React?",
    options: [
      "Subskrypcja `window` lub WebSocketu w efekcie bez wypisania się w funkcji czyszczącej",
      "Wywołanie `setState` w handlerze kliknięcia po asynchronicznym żądaniu",
      "Duża liczba komponentów opakowanych w `React.memo`",
    ],
    answer: 0,
    explanation:
      "Handler trzyma domknięcie z danymi komponentu, które nie jest zwalniane po odmontowaniu; kolejne montowania gromadzą subskrypcje. Podobne źródła: niewyczyszczone timery, nieograniczone globalne cache, referencje do odłączonych węzłów DOM. Znajduje się je przez Memory snapshots w DevTools.",
    sources: ["react-sync-effects", "react-useEffect"],
  },
  {
    question: "Jak najdokładniej znaleźć, które komponenty są wolne podczas interakcji?",
    options: [
      "Nagrać profil w React DevTools Profiler i panelu Performance przeglądarki",
      "Opakować wszystkie komponenty w `memo` i zobaczyć, czy będzie szybciej",
      "Logować `console.time` w każdym komponencie w buildzie produkcyjnym",
    ],
    answer: 0,
    explanation:
      "Profiler pokazuje, które komponenty się wyrenderowały, ile to trwało i dlaczego (włącz „Record why each component rendered”). Panel Performance pokazuje długie zadania, layout i malowanie. Optymalizacja na ślepo prowadzi do zbędnej złożoności. Do metryk w kodzie jest `<Profiler onRender>`.",
    sources: ["react-profiler", "webdev-inp"],
  },
  {
    question: "Dlaczego `useContext` nie ma „selektorów” i jak się to obchodzi?",
    options: [
      "Kontekst budzi wszystkich konsumentów; podziel kontekst lub użyj zewnętrznego store'a",
      "Ma: drugi argument to `useContext(Ctx, selector)`",
      "Selektory nie są potrzebne: React sam porównuje pola obiektu `value`",
    ],
    answer: 0,
    explanation:
      "Każda zmiana `value` przerenderowuje wszystkich wywołujących `useContext`, nawet jeśli potrzebują jednego pola. Obejścia: kilka wąskich kontekstów, memoizowani konsumenci, biblioteka `use-context-selector` lub store z subskrypcją przez selektory (Zustand, Redux, Jotai).",
    sources: ["react-useContext", "react-useSyncExternalStore"],
  },
  {
    question: "Trzeba wyrenderować listę 100 000 elementów. Co zrobić?",
    options: [
      "Wirtualizować: trzymać w DOM tylko widoczne elementy",
      "Opakować każdy element w `memo` i wyrenderować wszystko naraz",
      "Renderować elementy paczkami po 1000 przez `setTimeout`",
    ],
    answer: 0,
    explanation:
      "Wąskim gardłem jest liczba węzłów DOM. Wirtualizacja (TanStack Virtual, react-window) renderuje okno widocznych wierszy i podmienia je podczas przewijania. `memo` nie zmniejsza DOM, a paczki przez timer tylko rozciągają tę samą pracę. Rozważ też paginację lub filtrowanie po stronie serwera.",
    sources: ["tanstack-virtual", "webdev-virtualize-lists"],
  },
  {
    question: "Co stanie się z błędem rzuconym podczas renderu, jeśli nad komponentem nie ma error boundary?",
    options: [
      "React odmontuje całe drzewo korzenia i zgłosi błąd przez `onUncaughtError`",
      "React pokaże fallback najbliższego `<Suspense>` zamiast komponentu",
      "React zignoruje błąd i zachowa poprzedni wynik renderu",
    ],
    answer: 0,
    explanation:
      "Nieobsłużony błąd renderu usuwa cały UI korzenia — pokazanie zepsutego interfejsu jest gorsze niż nic. W React 19 `createRoot` ma `onCaughtError` i `onUncaughtError` do logowania. Dlatego granice ustawia się wokół tras i niezależnych widżetów.",
    sources: ["react-error-boundary", "react-createRoot"],
  },
  {
    question: "Dlaczego podczas przejścia wewnątrz `startTransition` nie pojawia się już pokazany fallback Suspense?",
    options: [
      "React trzyma stary UI, dopóki nowy nie będzie gotowy, zamiast podmieniać go spinnerem",
      "Wewnątrz transition Suspense jest wyłączony do końca sesji",
      "Fallback jest pokazywany, ale zbyt krótko, by to zauważyć",
    ],
    answer: 0,
    explanation:
      "Jeśli już wyświetlona treść zawiesza się z powodu pilnej aktualizacji, React pokazuje fallback. W transition woli zachować poprzedni ekran (z `isPending` dla wskaźnika), żeby szkielety nie „migały”. Tak działa nawigacja w routerach opartych na Suspense.",
    sources: ["react-useTransition", "react-suspense"],
  },
  {
    question: "Co zmieniło się w `startTransition` w React 19?",
    options: [
      "Przyjmuje funkcje async (Actions) i trzyma `isPending` do ich zakończenia",
      "Stał się synchroniczny i nie pozwala już przerywać renderu aktualizacji",
      "Został zastąpiony przez `useDeferredValue` i oznaczony jako przestarzały w React 19",
    ],
    answer: 0,
    explanation:
      "W React 19 `startTransition(async () => { await save(); setState(...) })` to Action: `isPending` jest true przez cały czas trwania, błędy można obsłużyć, a formularze z `action` automatycznie używają tego mechanizmu. Uwaga: `setState` po `await` trzeba ponownie opakować w `startTransition`.",
    sources: ["react-startTransition", "react-19"],
  },
  {
    question: "Co nowego jest w callback refach w React 19?",
    options: [
      "Callback może zwrócić funkcję czyszczącą wywoływaną przy odłączeniu elementu",
      "Callback refy nie są już wywoływane z `null` i nie są potrzebne dla DOM",
      "Callback refy są wywoływane przy każdym renderze, a nie tylko przy montowaniu",
    ],
    answer: 0,
    explanation:
      "`<div ref={node => { const obs = observe(node); return () => obs.disconnect(); }}>` — czyszczenie wykona się przy usunięciu elementu lub zmianie callbacku. Wcześniej React wywoływał callback z `null`, a czyszczenie trzeba było pisać ręcznie.",
    sources: ["react-19", "react-dom-common"],
  },
  {
    question: "Jak w React 19 ustawić `<title>` i `<meta>` z komponentu bez zewnętrznych bibliotek?",
    options: [
      "Wyrenderować `<title>` i `<meta>` w komponencie — React przeniesie je do `<head>`",
      "Tylko przez `document.title` w `useEffect` po zamontowaniu",
      "Przez prop `head` korzeniowego komponentu przekazany do `createRoot`",
    ],
    answer: 0,
    explanation:
      "React 19 obsługuje metadane dokumentu: `<title>`, `<meta>` i `<link>` w dowolnym miejscu drzewa są przenoszone do `<head>`, także przy SSR i streamingu. Dodano też priorytet stylów (`precedence`) i obsługę skryptów async. W Next.js zwykle używa się zamiast tego Metadata API.",
    sources: ["react-19", "next-metadata"],
  },
  {
    question: "Czy `useMemo` gwarantuje, że obliczenie nie powtórzy się przy tych samych zależnościach?",
    options: [
      "Nie: React może wyrzucić cache; kod musi działać także bez `useMemo`",
      "Tak: to gwarancja semantyczna, na której można polegać w efektach",
      "Tak, ale tylko jeśli zależności są prymitywami, a nie obiektami",
    ],
    answer: 0,
    explanation:
      "Dokumentacja wprost nazywa `useMemo` optymalizacją wydajności: React może wyrzucić cache (np. dla ukrytych komponentów lub w przyszłych wersjach). Jeśli kod psuje się bez `useMemo`, szukaj problemu w logice. Dla gwarantowanej stałej wartości użyj `useState(() => init)` lub `useRef`.",
    sources: ["react-useMemo"],
  },
  {
    question: "Kiedy dopuszczalne jest wywołanie `setState` bezpośrednio podczas renderu?",
    options: [
      "Do korekty stanu przy zmianie propa, z warunkiem chroniącym przed pętlą",
      "Nigdy: zawsze powoduje błąd „Too many re-renders”",
      "Zawsze, gdy trzeba zsynchronizować dowolny stan z nowymi propsami",
    ],
    answer: 0,
    explanation:
      "Wzorzec „przechowywania informacji z poprzednich renderów”: `if (items !== prevItems) { setPrevItems(items); setSelection(null); }`. React od razu ponownie wykonuje render komponentu, nie malując stanu pośredniego. To lepsze niż `useEffect`, ale `key` lub obliczenie podczas renderu są jeszcze lepsze.",
    sources: ["react-useState", "react-no-effect"],
  },
  {
    question: "Kiedy `flushSync` jest uzasadniony?",
    options: [
      "Gdy DOM musi się zaktualizować synchronicznie przed następną linią kodu",
      "Gdy trzeba przyspieszyć dowolny render przez wyłączenie batchingu",
      "Gdy trzeba wysłać stan na serwer przed przejściem na inną stronę",
    ],
    answer: 0,
    explanation:
      "Przykład: dodałeś wiadomość i chcesz od razu do niej przewinąć — bez `flushSync` nowy węzeł DOM jeszcze nie istnieje. Jest też potrzebny przy integracji z zewnętrznym kodem typu `onbeforeprint`. To kosztowna operacja, która psuje batching i optymalizacje współbieżne — używaj oszczędnie.",
    sources: ["react-flushSync"],
  },
  {
    question: "Do czego służy `createListenerMiddleware` w Redux Toolkit?",
    options: [
      "Do uruchamiania efektów ubocznych w odpowiedzi na konkretne akcje",
      "Do subskrypcji komponentów React na pojedyncze pola store'a",
      "Do nasłuchiwania zdarzeń DOM i zamieniania ich w akcje Redux",
    ],
    answer: 0,
    explanation:
      "Listener middleware to lekka alternatywa dla redux-saga i redux-observable: `startListening({ actionCreator: todoAdded, effect: async (action, api) => {...} })`. Można czekać na inne akcje (`take`), anulować zadania, robić debounce i pracować ze stanem przed akcją i po niej.",
    sources: ["rtk-listener"],
  },
  {
    question: "Jak zrobić optymistyczną aktualizację w RTK Query?",
    options: [
      "`updateQueryData` w `onQueryStarted`, wycofanie przez `undo()`",
      "Przekazać flagę `optimistic: true` do definicji endpointu w `createApi`",
      "Ręcznie wywołać `invalidatesTags` przed wysłaniem żądania na serwer",
    ],
    answer: 0,
    explanation:
      "`dispatch(api.util.updateQueryData('getPost', id, draft => { draft.title = t }))` edytuje cache przez Immer i zwraca obiekt patcha. W `try { await queryFulfilled } catch { patchResult.undo() }` zmiany są wycofywane przy błędzie. TanStack Query ma podobne podejście przez `onMutate`.",
    sources: ["rtk-query-overview", "rtk-query-invalidation"],
  },
  {
    question: "Jaka jest sygnatura middleware Redux?",
    options: [
      "`store => next => action => { ... }`",
      "`(state, action) => newState | void`",
      "`action => store => dispatch(action)`",
    ],
    answer: 0,
    explanation:
      "Currying daje middleware dostęp do `getState`/`dispatch`, kolejnego ogniwa łańcucha `next` i bieżącej akcji. Middleware może logować, modyfikować, opóźniać lub podmieniać akcje (np. thunk wywołuje funkcje zamiast przekazywać je dalej). `(state, action) => newState` to reducer.",
    sources: ["redux-essentials"],
  },
  {
    question: "Dlaczego nie umieszcza się w store Redux promise'ów, instancji klas i funkcji?",
    options: [
      "Psuje to serializację, DevTools, zapis stanu i przewidywalność",
      "Redux fizycznie nie może przechowywać niczego poza stringami i liczbami",
      "Spowalnia to `useSelector` dziesiątki razy z powodu głębokiego porównania",
    ],
    answer: 0,
    explanation:
      "Store powinien być zwykłym serializowalnym drzewem: jest logowany, zapisywany (redux-persist), odtwarzany w time travel i przekazywany z serwera przy SSR. RTK ostrzega o nieserializowalnych wartościach w trybie deweloperskim. Nieserializowalne obiekty trzymaj poza store, a w nim przechowuj ich identyfikatory.",
    sources: ["redux-style-guide", "rtk-configureStore"],
  },
  {
    question: "Czym jest structural sharing w TanStack Query?",
    options: [
      "Niezmienione części odpowiedzi zachowują poprzednie referencje po ponownym pobraniu",
      "Jeden cache jest współdzielony między kilkoma kartami przeglądarki",
      "Odpowiedzi różnych zapytań są przechowywane w jednej wspólnej znormalizowanej tabeli",
    ],
    answer: 0,
    explanation:
      "Przy aktualizacji danych biblioteka głęboko porównuje nowy JSON ze starym i ponownie używa referencji do pasujących obiektów. Dlatego komponenty zależne od niezmienionych części nie przerenderowują się, a `memo` i zależności efektów działają poprawnie.",
    sources: ["tq-render-optimizations", "tq-caching"],
  },
  {
    question: "Jak poprawnie przekazać dane TanStack Query załadowane na serwerze do komponentów klienckich?",
    options: [
      "`prefetchQuery` na serwerze, potem `dehydrate` i `<HydrationBoundary state>`",
      "Zapisać dane w `localStorage` na serwerze i odczytać je na kliencie",
      "Przekazać opcję `ssr: true` do `useQuery` — biblioteka zrobi resztę",
    ],
    answer: 0,
    explanation:
      "Serwer tworzy `QueryClient` na każde żądanie, wykonuje `prefetchQuery` i serializuje cache przez `dehydrate(queryClient)`. Kliencki `HydrationBoundary` umieszcza te dane w cache klienta, a `useQuery` z tym samym kluczem dostaje je od razu, bez ponownego pobierania.",
    sources: ["tq-ssr", "tq-prefetching"],
  },
  {
    question: "Dlaczego na serwerze nie można używać jednego globalnego `QueryClient` dla wszystkich żądań?",
    options: [
      "Cache jednego użytkownika może wyciec do odpowiedzi innego",
      "Globalny klient nie obsługuje żądań asynchronicznych",
      "Next.js zabrania zmiennych na poziomie modułu w kodzie serwerowym",
    ],
    answer: 0,
    explanation:
      "Serwer obsługuje żądania różnych użytkowników w jednym procesie, a wspólny cache pomieszałby ich dane. Twórz klienta na każde żądanie (np. przez `cache()` z React w RSC). W przeglądarce, przeciwnie, jest jeden klient na całą aplikację.",
    sources: ["tq-ssr", "react-cache"],
  },
  {
    question: "Jak poprawnie obsłużyć anulowanie żądań w TanStack Query?",
    options: [
      "Przekazać `signal` z argumentu `queryFn` do `fetch`",
      "Wywołać `AbortController.abort()` w `onSuccess`",
      "Włączyć globalną opcję `cancelOnUnmount: true`",
    ],
    answer: 0,
    explanation:
      "`queryFn: ({ signal }) => fetch(url, { signal })`. Biblioteka anuluje żądanie, jeśli komponent odmontuje się przed odpowiedzią, zmieni się klucz lub zostanie wywołane `cancelQueries`. Bez przekazania `signal` anulowana jest tylko obsługa wyniku, a samo żądanie HTTP trwa dalej.",
    sources: ["tq-cancellation", "mdn-abort-controller"],
  },
  {
    question: "Czym `useSuspenseQuery` różni się od `useQuery`?",
    options: [
      "Ładowanie obsługuje `<Suspense>`, błędy — boundary, a `data` jest zdefiniowane",
      "Cache'uje dane na zawsze i nigdy nie pobiera ich ponownie",
      "Działa tylko w Server Components i nie potrzebuje providera",
    ],
    answer: 0,
    explanation:
      "Komponent zawiesza się, dopóki nie przyjdą dane, więc w środku nie trzeba sprawdzać `isPending`, a `data` nie jest `undefined`. Błędy trafiają do error boundary (reset przez `QueryErrorResetBoundary`). Uwagi: opcja `enabled` jest niedostępna, a sekwencyjne zawieszenia tworzą kaskady żądań.",
    sources: ["tq-suspense", "react-suspense"],
  },
  {
    question: "Co trzeba podać w `useInfiniteQuery`?",
    options: [
      "`initialPageParam` i funkcję `getNextPageParam`",
      "`pageSize` i `totalPages` do obliczenia liczby żądań",
      "`cursor` w kluczu zapytania i ręczny `refetch` przy przewijaniu",
    ],
    answer: 0,
    explanation:
      "Dane są przechowywane jako `{ pages, pageParams }`. `getNextPageParam(lastPage)` zwraca kursor następnej strony lub `undefined`, gdy stron już nie ma (`hasNextPage` staje się false). Doładowanie to `fetchNextPage()`, często wyzwalane przez Intersection Observer.",
    sources: ["tq-infinite"],
  },
  {
    question: "Czy potrzebny jest Redux lub Zustand, jeśli dane serwerowe są już w TanStack Query?",
    options: [
      "Często nie: zostaje mało stanu klienckiego i wystarczą `useState` i Context",
      "Tak, zawsze: TanStack Query działa tylko na store Redux",
      "Nie, nigdy: TanStack Query w pełni przechowuje także kliencki stan UI",
    ],
    answer: 0,
    explanation:
      "Duża część „stanu globalnego” w typowych aplikacjach to cache danych serwerowych. Gdy przejmie go TanStack Query, pozostały stan kliencki (motyw, filtry, stan kreatora) jest często niewielki. Store jest uzasadniony przy złożonej logice klienckiej: edytorach, trybie offline, złożonych formularzach.",
    sources: ["tq-overview", "tkdodo-practical-rq"],
  },
  {
    question: "Błąd „Invalid hook call”. Jaka jest najbardziej prawdopodobna przyczyna, jeśli kod komponentu jest poprawny?",
    options: [
      "Do paczki trafiły dwie kopie React z różnych pakietów",
      "Komponent jest zadeklarowany jako funkcja strzałkowa zamiast przez `function`",
      "Komponent ma więcej niż dziesięć hooków, a React nie obsługuje więcej",
    ],
    answer: 0,
    explanation:
      "Przyczyny: wywołanie hooka poza komponentem, niezgodne wersje `react` i `react-dom` lub zduplikowany React. Hooki są powiązane z „dispatcherem” konkretnej kopii React. Sprawdza się to przez `npm ls react`; w monorepo i mikrofrontendach React robi się singletonem (peerDependencies, `shared` w Module Federation).",
    sources: ["react-rules-of-hooks"],
  },
  {
    question: "Jaka zasada leży u podstaw React Testing Library?",
    options: [
      "Testować zachowanie tak, jak widzi je użytkownik: role, tekst, etykiety",
      "Testować wewnętrzny stan i metody instancji komponentów",
      "Robić snapshot całego DOM i porównywać go po każdej akcji",
    ],
    answer: 0,
    explanation:
      "Zapytania typu `getByRole('button', { name: 'Save' })` jednocześnie sprawdzają zachowanie i dostępność i nie psują się przy refaktoryzacji wnętrza. Interakcje symuluje się przez `user-event`. Testy szczegółów implementacji są kruche i niewiele gwarantują.",
    sources: ["wai-aria-apg", "react-learn"],
  },
  {
    question: "Czym są komponenty headless UI i dlaczego wybiera się je do systemów projektowych?",
    options: [
      "Komponenty z logiką i dostępnością, ale bez stylów: wygląd jest w całości twój",
      "Komponenty, które renderują się tylko na serwerze, bez przeglądarki",
      "Komponenty bez JSX, opisane w JSON i składane podczas budowania",
    ],
    answer: 0,
    explanation:
      "Radix UI, Headless UI i React Aria implementują zachowanie, obsługę klawiatury, fokus i ARIA złożonych widżetów (dialogi, comboboxy, menu), a stylowanie zależy od ciebie (Tailwind, CSS Modules). Na tym zbudowany jest np. shadcn/ui. Pisanie takich widżetów od zera jest drogie i ryzykowne.",
    sources: ["wai-aria-apg", "patterns-dev-compound"],
  },
  {
    question: "Czym `key` na komponencie-wrapperze różni się od `key` wewnątrz listy?",
    options: [
      "Mechanicznie niczym: zmiana `key` zawsze oznacza nową instancję z nowym stanem",
      "Poza listami `key` jest ignorowany i służy tylko jako podpowiedź dla lintera",
      "Poza listami `key` cache'uje komponent zamiast go odtwarzać",
    ],
    answer: 0,
    explanation:
      "`key` jest częścią tożsamości komponentu w każdym miejscu. W liście dopasowuje elementy między renderami; poza listą służy do jawnego resetu stanu (`<Chat key={contactId} />`). Klucz musi być unikalny wśród rodzeństwa, a nie globalnie.",
    sources: ["react-preserving-state", "react-lists"],
  },
  {
    question: "Do czego służą API `preload` i `preinit` z `react-dom` w React 19?",
    options: [
      "Do wcześniejszego podpowiedzenia przeglądarce ładowania fontów, stylów i skryptów",
      "Do wcześniejszego ładowania danych dla `useQuery` przed renderem komponentu",
      "Do rozgrzewania cache Server Components podczas budowania",
    ],
    answer: 0,
    explanation:
      "`preload(href, { as: 'font' })`, `preinit(href, { as: 'style' })`, `prefetchDNS` i `preconnect` można wywoływać z komponentów i podczas SSR — React wstawia odpowiednie `<link>` do `<head>` i je deduplikuje. Przyspiesza to wykrywanie krytycznych zasobów.",
    sources: ["react-19", "mdn-link-preload"],
  },
  {
    question: "Dlaczego `React.memo` z własną funkcją porównującą może być niebezpieczne?",
    options: [
      "Jeśli nie porównuje się wszystkich propsów, komponent pokazuje nieaktualne dane lub callbacki",
      "Własna funkcja porównująca jest zabroniona w buildzie produkcyjnym",
      "Funkcja wykonuje się na serwerze i spowalnia SSR",
    ],
    answer: 0,
    explanation:
      "`arePropsEqual` musi uwzględniać wszystkie propsy, w tym funkcje: jeśli zignorujesz callback, komponent wywoła jego starą wersję z „zamrożonym” domknięciem. Głębokie porównanie dużych danych może kosztować więcej niż sam render. Stabilizacja propsów jest zwykle lepszym wyborem.",
    sources: ["react-memo"],
  },
  {
    question: "Jak React 18+ obsługuje `setState` na odmontowanym komponencie?",
    options: [
      "Ignoruje: stare ostrzeżenie usunięto jako fałszywie pozytywne",
      "Rzuca wyjątek i odmontowuje całą aplikację",
      "Zapamiętuje wartość i stosuje ją przy następnym montowaniu",
    ],
    answer: 0,
    explanation:
      "Ostrzeżenie „Can't perform a React state update on an unmounted component” usunięto w React 18: często pojawiało się fałszywie (np. przy odpowiedzi na żądanie po opuszczeniu strony), a prawdziwe wycieki to zapomniane subskrypcje, a nie sam `setState`. Nadal trzeba anulować żądania i wypisywać się w funkcji czyszczącej.",
    sources: ["react-18", "react-useEffect"],
  },
  {
    question: "Co daje TanStack Query w porównaniu z ładowaniem danych w `useEffect` z `useState`?",
    options: [
      "Deduplikację, cache'owanie, ponowienia, aktualizacje w tle i ochronę przed wyścigami od razu",
      "Tylko krótszą składnię; podejścia zachowują się tak samo",
      "Czyni żądania synchronicznymi, więc stany ładowania nie są potrzebne",
    ],
    answer: 0,
    explanation:
      "Ręczne ładowanie w efekcie szybko obrasta problemami: wyścigi odpowiedzi, brak cache (ponowne pobieranie przy każdym montowaniu), duplikaty z kilku komponentów, ręczne ponowienia i obsługa błędów, rozjazd z serwerem. Biblioteka rozwiązuje to deklaratywnie przez klucze.",
    sources: ["tq-overview", "react-useEffect"],
  },
  {
    question: "Kiedy RTK Query usuwa dane ze swojego cache?",
    options: [
      "Gdy dane nie mają subskrybentów dłużej niż `keepUnusedDataFor` (domyślnie 60 s)",
      "Zaraz po odmontowaniu ostatniego komponentu, bez opóźnienia",
      "Nigdy: dane żyją, dopóki użytkownik nie przeładuje strony",
    ],
    answer: 0,
    explanation:
      "RTK Query liczy subskrypcje hooków dla każdego endpointu i argumentu. Gdy subskrybentów nie ma, startuje timer `keepUnusedDataFor`; jeśli w tym czasie ktoś znowu się subskrybuje, dane pochodzą z cache. Odpowiednik w TanStack Query to `gcTime`.",
    sources: ["rtk-query-overview"],
  },
];

export default questions;
