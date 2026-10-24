import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  // ---------- Основи: зовнішні стори, tearing ----------
  {
    question: "Чому Redux, Zustand і схожі бібліотеки підписуються через `useSyncExternalStore`?",
    options: [
      "Він гарантує узгоджений знімок під час конкурентного рендерингу (без tearing)",
      "Це єдиний хук, який може спричиняти ререндери ззовні React",
      "Він кешує стор у `localStorage` між сесіями",
    ],
    answer: 0,
    explanation:
      "Під час конкурентного рендерингу React може призупинити рендер; якщо зовнішній стор у цей час зміниться, одні компоненти прочитають старе значення, інші — нове. `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` запобігає цьому й підтримує SSR.",
    sources: ["react-useSyncExternalStore", "react-18"],
  },
  {
    question: "Що не так із цим `getSnapshot`?",
    code: `useSyncExternalStore(subscribe, () => ({ items: store.items }));`,
    options: [
      "Він повертає новий об'єкт при кожному виклику, React бачить нескінченні зміни й зациклюється",
      "`getSnapshot` має бути асинхронним",
      "Знімки не можуть містити масиви",
    ],
    answer: 0,
    explanation:
      "React багаторазово викликає `getSnapshot` і порівнює результати через `Object.is`; новий об'єкт щоразу означає «змінилося», що спричиняє нескінченні ререндери. Повертайте закешоване/іммутабельне значення зі стору (або примітив).",
    sources: ["react-useSyncExternalStore"],
  },
  {
    question: "У чому різниця між моделлю «підписка на селектор» (Redux, Zustand) і Context?",
    options: [
      "Стор сповіщає компоненти, і кожен перемальовується, лише якщо змінилася вибрана ним частина",
      "Context нативно підтримує селектори через другий аргумент `useContext`",
      "Стори перемальовують усе дерево, а Context оновлює один компонент",
    ],
    answer: 0,
    explanation:
      "У Context немає селекторів: будь-яка зміна `value` перемальовує всіх споживачів. Стори виконують селектор кожного підписника й порівнюють результати, тому оновлення точкові. Бібліотеки на кшталт `use-context-selector` емулюють це поверх Context.",
    sources: ["react-useContext", "react-redux-hooks"],
  },
  {
    question: "Де в застосунку з роутингом найкраще зберігати стан фільтра списку (пошук, сортування, сторінка)?",
    options: [
      "У search-параметрах URL — посиланням можна поділитися, стан переживає перезавантаження й працює з «назад/вперед»",
      "У глобальному Redux-сторі, щоб його міг читати будь-який компонент",
      "У `useRef`, щоб зміни не спричиняли ререндерів",
    ],
    answer: 0,
    explanation:
      "URL — теж стан. Фільтри в `?q=&sort=&page=` роблять посилання зручними для поширення, а історію — осмисленою; loader'и й ключі запитів можуть виводитися з них. Введення тексту дебаунсять і замінюють (а не додають) записи історії на кожне натискання.",
    sources: ["rr-state-management", "mdn-url"],
  },
  {
    question: "Яка класифікація стану допомагає вибирати інструменти у великому застосунку?",
    options: [
      "Серверний кеш, стан URL, стан форм, локальний UI-стан і глобальний клієнтський стан",
      "Лише синхронний і асинхронний стан",
      "Примітивний і об'єктний стан",
    ],
    answer: 0,
    explanation:
      "Кожен вид має природне місце: серверний кеш — TanStack Query/RTK Query/SWR/loader'и; URL — роутер; форми — локальний стан чи бібліотека форм; UI — `useState`; справді глобальний клієнтський стан — Context або стор. Якщо складати все в один стор, він стає вузьким місцем.",
    sources: ["tkdodo-practical-rq", "redux-style-guide"],
  },

  // ---------- Просунутий Context ----------
  {
    question: "Як зробити, щоб споживачі `CartContext`, які використовують лише дії в стилі `dispatch`, не перемальовувалися?",
    options: [
      "Передавати стан і дії в різних контекстах; значення контексту дій стабільне",
      "Обгорнути провайдер у `React.memo`",
      "Зберігати дії в `useRef` всередині кожного споживача",
    ],
    answer: 0,
    explanation:
      "Кнопки, які лише викликають `addItem`, читають `CartActionsContext` (мемоізований один раз), тому зміни кошика їх не перемальовують. Оновлюються лише компоненти, що читають `CartStateContext`.",
    sources: ["react-reducer", "react-useContext"],
  },
  {
    question: "Чому провайдери Context у Next.js App Router виносять в окремий клієнтський компонент?",
    options: [
      "`createContext` — лише клієнтський API; серверний layout рендерить `<Providers>{children}</Providers>`",
      "Серверні компоненти рендерять провайдери двічі",
      "Провайдери треба завантажувати ліниво, щоб уникнути SSR",
    ],
    answer: 0,
    explanation:
      "Файл `providers.tsx` з `'use client'` обгортає `children`, які лишаються серверними компонентами, бо передаються як пропси. Розміщуйте провайдери якомога глибше, щоб більша частина дерева лишалася статичною.",
    sources: ["next-server-client", "react-use-client"],
  },
  {
    question: "Чому «один великий AppContext з усім станом» вважається антипатерном?",
    options: [
      "Будь-яка зміна перемальовує всіх споживачів і пов'язує непов'язані модулі через один об'єкт",
      "Context не може зберігати більше десяти полів",
      "Його не можна використовувати в Server Components",
    ],
    answer: 0,
    explanation:
      "Введення в поле пошуку перемальовує кошик і шапку. Діліть за доменами й частотою оновлень, тримайте стан поруч із місцем використання, а спільний стан, що часто змінюється, переносьте в стор із селекторами.",
    sources: ["react-useContext", "rg-smells"],
  },
  {
    question: "Що додає `use(Context)` у React 19 порівняно з `useContext`?",
    options: [
      "Його можна викликати умовно (наприклад, після раннього return)",
      "Він підписується лише на одне поле значення контексту",
      "Він робить контекст доступним у Server Components",
    ],
    answer: 0,
    explanation:
      "На `use` не поширюється правило «лише на верхньому рівні», тому `if (!show) return null; const theme = use(ThemeContext)` працює. В іншому він читає той самий найближчий провайдер і селекторів не додає.",
    sources: ["react-use", "react-useContext"],
  },

  // ---------- Просунутий Redux Toolkit ----------
  {
    question: "Для чого потрібен `createListenerMiddleware`?",
    options: [
      "Запускати побічні ефекти у відповідь на конкретні дії чи зміни стану",
      "Підписувати React-компоненти на окремі поля стору",
      "Перетворювати DOM-події на Redux-дії",
    ],
    answer: 0,
    explanation:
      "Легка альтернатива сагам: `startListening({ actionCreator: todoAdded, effect: async (action, api) => {...} })`. Ефекти можуть чекати інших дій (`take`), скасовуватися, робити debounce і читати стан до й після дії.",
    sources: ["rtk-listener"],
  },
  {
    question: "Що додає `combineSlices` у Redux Toolkit?",
    options: [
      "Ліниве впровадження слайсів: фічі з code splitting додають свої редʼюсери під час завантаження",
      "Злиття двох слайсів в один з об'єднаними типами дій",
      "Автоматичне збереження слайсів у сховищі",
    ],
    answer: 0,
    explanation:
      "`const rootReducer = combineSlices(authSlice)`, а пізніше `rootReducer.inject(lazySlice)` з ліниво завантаженого модуля. Типізовані селектори (`slice.selectors`) враховують, що слайс може бути ще не впроваджений.",
    sources: ["rtk-combineSlices"],
  },
  {
    question: "Чому в Redux-стор не кладуть проміси, екземпляри класів і функції?",
    options: [
      "Це ламає серіалізовність: DevTools, збереження, передавання під час SSR і time travel",
      "Redux може зберігати лише рядки й числа",
      "Це сповільнює `useSelector` у десятки разів",
    ],
    answer: 0,
    explanation:
      "Стор має бути простими даними, які можна логувати, зберігати й відтворювати. Несеріалізовні об'єкти тримають ззовні (наприклад, у модулі чи listener), а в сторі — id або серіалізовні знімки.",
    sources: ["redux-style-guide", "rtk-configureStore"],
  },
  {
    question: "Що потрібно мемоізованому селектору з `createSelector`, щоб він був ефективним з аргументами?",
    code: `const selectByCategory = createSelector(
  [(s) => s.products, (s, category) => category],
  (products, category) => products.filter((p) => p.category === category),
);`,
    options: [
      "Входи зі стабільними посиланнями; окремий екземпляр селектора на кожен аргумент, якщо він використовується в багатьох місцях",
      "Обгорнути кожен вхід у `useMemo`",
      "Повертати новий масив з кожного вхідного селектора",
    ],
    answer: 0,
    explanation:
      "Кеш за замовчуванням зберігає останні входи, тому чергування аргументів у кількох компонентах (`'books'`, `'toys'`) щоразу перераховує результат. Створюйте селектор на компонент (`useMemo(makeSelector, [])`) або налаштуйте більший кеш (`weakMapMemoize` — за замовчуванням у Reselect 5).",
    sources: ["rtk-createSelector", "redux-selectors"],
  },
  {
    question: "Чому Redux рекомендує структуру «ducks»/папки за фічами з `createSlice`?",
    options: [
      "Стан, редʼюсери, дії та селектори фічі живуть разом, менше розкиданого шаблонного коду",
      "Redux вимагає окремий файл на кожен тип дії",
      "Це потрібно, щоб `configureStore` знайшов редʼюсери",
    ],
    answer: 0,
    explanation:
      "Style guide рекомендує організацію за фічами й `createSlice`, щоб логікою слайса володів один файл. Реакції між фічами — через `extraReducers` або listener'и, а не через пряме втручання в чужі слайси.",
    sources: ["redux-style-guide", "rtk-createSlice"],
  },
  {
    question: "Редʼюсер для `orders/placed` має також очистити слайс кошика. Як це зробити ідіоматично?",
    options: [
      "Нехай слайс кошика обробить `orders/placed` у своїх `extraReducers`",
      "Надіслати `cart/cleared` зсередини редʼюсера замовлень",
      "Мутувати слайс кошика з редʼюсера замовлень через `getState()`",
    ],
    answer: 0,
    explanation:
      "Редʼюсери не можуть надсилати дії й чіпати інші слайси. Багато редʼюсерів, що реагують на одну подію, — це і є задумана модель Redux: дія описує, що сталося, а кожен слайс вирішує, як реагувати.",
    sources: ["redux-style-guide", "rtk-createSlice"],
  },

  // ---------- Просунутий Zustand ----------
  {
    question: "Чим небезпечний стор Zustand на рівні модуля під час SSR (Next.js)?",
    options: [
      "На сервері один екземпляр модуля спільний для всіх запитів, і дані користувачів можуть витекти",
      "Zustand узагалі не може працювати на сервері",
      "Стор перестворюється при кожному імпорті",
    ],
    answer: 0,
    explanation:
      "Гайд для Next.js рекомендує створювати стор на кожен запит через `createStore` і передавати його через провайдер Context, а читати — через `useStore(storeApi, selector)`. У суто клієнтському SPA глобальний стор допустимий.",
    sources: ["zustand-nextjs"],
  },
  {
    question: "Як зберігати лише частину полів стору Zustand і обробляти зміни схеми?",
    options: [
      "`partialize` для вибору полів і `version` + `migrate` для старих даних",
      "Створити окремий стор на кожне поле",
      "Persist завжди зберігає весь стор і не вміє мігрувати",
    ],
    answer: 0,
    explanation:
      "`persist(fn, { name, partialize: (s) => ({ cart: s.cart }), version: 2, migrate: (old, v) => ... })`. Без міграцій перейменоване поле залишить у сховищі користувачів зламані дані.",
    sources: ["zustand-persist"],
  },
  {
    question: "Як реагувати на зміни Zustand поза React (наприклад, синхронізувати з SDK аналітики)?",
    options: [
      "`useStore.subscribe(listener)` (або `subscribeWithSelector` для частини стану)",
      "Опитувати `getState()` через `setInterval`",
      "Ніяк: підписки працюють лише в компонентах",
    ],
    answer: 0,
    explanation:
      "`subscribe` повертає функцію відписки. Middleware `subscribeWithSelector` дає змогу підписатися на конкретний селектор із функцією порівняння — зручно для побічних ефектів, прив'язаних до одного поля.",
    sources: ["zustand-intro"],
  },
  {
    question: "Що дає стору Zustand middleware `devtools`?",
    options: [
      "Інтеграцію з Redux DevTools: журнал дій і time travel",
      "Автоматичну генерацію типів для стору",
      "Візуальний редактор стору в браузері",
    ],
    answer: 0,
    explanation:
      "`create(devtools((set) => ...))` та іменовані оновлення (`set(fn, false, 'cart/add')`) роблять історію читабельною. Це одна з причин вибору Zustand: легкий, але придатний до налагодження.",
    sources: ["zustand-devtools"],
  },
  {
    question: "Zustand чи Redux Toolkit: коли RTK — сильніший вибір?",
    options: [
      "Великі команди, яким потрібні суворі конвенції, middleware, listener'и та RTK Query в одній екосистемі",
      "Невеликі застосунки з одним-двома шматками глобального стану",
      "Коли хочеться зовсім уникнути шаблонного коду",
    ],
    answer: 0,
    explanation:
      "Zustand мінімалістичний і гнучкий; RTK задає структуровану подієву модель із сильними інструментами. Обидва вибори добрі — вирішують розмір команди, конвенції та те, чи використовуватимете ви RTK Query.",
    sources: ["redux-why-rtk", "zustand-intro"],
  },

  // ---------- Просунутий TanStack Query ----------
  {
    question: "Як реалізувати оптимістичне оновлення через кеш у TanStack Query?",
    options: [
      "`onMutate`: скасувати запити, зробити знімок і оновити кеш; `onError`: відкотити; `onSettled`: інвалідувати",
      "Викликати `invalidateQueries` на початку мутації",
      "Вказати `optimistic: true` у запиту списку",
    ],
    answer: 0,
    explanation:
      "`cancelQueries` не дає перезапиту, що виконується, перезаписати оптимістичні дані; знімок із `getQueryData` повертається як контекст для відкату. У v5 є й простіший підхід: показувати `variables`, поки мутація `isPending`, не чіпаючи кеш.",
    sources: ["tq-optimistic", "tq-mutations"],
  },
  {
    question: "Що таке structural sharing у TanStack Query?",
    options: [
      "Незмінені частини перезапитаної відповіді зберігають старі посилання",
      "Один кеш спільний для вкладок браузера",
      "Відповіді всіх запитів зберігаються в одній нормалізованій таблиці",
    ],
    answer: 0,
    explanation:
      "Новий JSON глибоко порівнюється зі старим, і рівні піддерева перевикористовують посилання, тому `memo`-компоненти й залежності ефектів не реагують на ідентичні дані. Для величезних не-JSON даних це можна вимкнути.",
    sources: ["tq-render-optimizations", "tq-caching"],
  },
  {
    question: "Чому рекомендують фабрики ключів запитів?",
    code: `export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "list"] as const,
  list: (filters: Filters) => [...todoKeys.lists(), filters] as const,
  detail: (id: number) => [...todoKeys.all, "detail", id] as const,
};`,
    options: [
      "Ключі лишаються узгодженими та ієрархічними, тому інвалідація за префіксом надійна",
      "TanStack Query вимагає оголошувати ключі в одному об'єкті",
      "Фабрики змушують запити виконуватися паралельно",
    ],
    answer: 0,
    explanation:
      "Одруківки в ключах, написаних вручну, тихо ламають кешування й інвалідацію. Фабрика дає єдине джерело істини: `invalidateQueries({ queryKey: todoKeys.lists() })` оновлює всі списки, але не деталі.",
    sources: ["tq-query-keys", "tq-invalidation"],
  },
  {
    question: "Як передати попередньо завантажені на сервері дані TanStack Query клієнтським компонентам у Next.js App Router?",
    options: [
      "`prefetchQuery` на сервері, `dehydrate`, потім `<HydrationBoundary state>`",
      "Зберегти їх у `localStorage` на сервері",
      "Використати опцію `ssr: true` у `useQuery`",
    ],
    answer: 0,
    explanation:
      "`QueryClient` на кожен запит попередньо завантажує й серіалізує кеш; клієнтський `HydrationBoundary` кладе його в кеш браузера, тому `useQuery` з тим самим ключем рендериться одразу без перезапиту.",
    sources: ["tq-ssr", "tq-prefetching"],
  },
  {
    question: "Чому на сервері не можна створювати один глобальний `QueryClient` для всіх запитів?",
    options: [
      "Дані одного користувача можуть потрапити до іншого зі спільного кешу",
      "Глобальний клієнт не підтримує асинхронні функції",
      "Next.js забороняє змінні на рівні модуля",
    ],
    answer: 0,
    explanation:
      "Серверний процес обслуговує багатьох користувачів. Створюйте клієнт на кожен запит (наприклад, через React `cache()` у RSC). У браузері, навпаки, один клієнт на весь застосунок — це правильно.",
    sources: ["tq-ssr", "react-cache"],
  },
  {
    question: "Що змінює `useSuspenseQuery`?",
    options: [
      "Завантаження обробляє `<Suspense>`, помилки — error boundary, а `data` завжди визначене",
      "Він кешує дані назавжди й ніколи не перезапитує",
      "Він працює лише в Server Components",
    ],
    answer: 0,
    explanation:
      "Усередині компонента не потрібні перевірки `isPending`. Нюанси: `enabled` недоступний, а запити, що послідовно призупиняються, створюють водоспади — завантажуйте заздалегідь або використовуйте `useSuspenseQueries` для паралельного завантаження.",
    sources: ["tq-suspense", "react-suspense"],
  },
  {
    question: "Що потрібно налаштувати для `useInfiniteQuery`?",
    options: [
      "`initialPageParam` і `getNextPageParam`",
      "`pageSize` і `totalPages`",
      "`cursor` у ключі та ручний `refetch` під час прокручування",
    ],
    answer: 0,
    explanation:
      "Дані — це `{ pages, pageParams }`; `getNextPageParam(lastPage)` повертає наступний курсор або `undefined`, коли сторінок більше немає (`hasNextPage` стає false). `fetchNextPage` часто запускають через `IntersectionObserver`.",
    sources: ["tq-infinite"],
  },
  {
    question: "Як у TanStack Query скасувати запит, що виконується, коли він став непотрібним?",
    options: [
      "Передати `signal` з контексту `queryFn` у `fetch`",
      "Викликати `AbortController.abort()` в `onSuccess`",
      "Увімкнути глобальну опцію `cancelOnUnmount`",
    ],
    answer: 0,
    explanation:
      "`queryFn: ({ signal }) => fetch(url, { signal })`. Бібліотека скасовує запит, якщо компонент розмонтувався до відповіді, змінився ключ або викликано `cancelQueries`. Без `signal` скасовується лише обробка результату.",
    sources: ["tq-cancellation", "mdn-abort-controller"],
  },
  {
    question: "Що дає опція `select` у `useQuery`?",
    code: `const count = useQuery({ queryKey: ["todos"], queryFn, select: (d) => d.length });`,
    options: [
      "Похідне значення; компонент перемальовується, лише коли воно змінилося",
      "Вибір між кількома `queryFn`",
      "Список полів для запиту до GraphQL-сервера",
    ],
    answer: 0,
    explanation:
      "Кеш зберігає повну відповідь, а кожен компонент підписаний на свою проєкцію. Тримайте функцію `select` стабільною (оголошуйте ззовні чи мемоізуйте), щоб вона не перезапускалася на кожному рендері.",
    sources: ["tq-render-optimizations"],
  },

  // ---------- Просунутий RTK Query ----------
  {
    question: "Як зробити оптимістичне оновлення в RTK Query?",
    options: [
      "`updateQueryData` в `onQueryStarted`, потім `patchResult.undo()`, якщо `queryFulfilled` відхилено",
      "Передати `optimistic: true` у визначення ендпоінта",
      "Інвалідувати теги до надсилання запиту",
    ],
    answer: 0,
    explanation:
      "`dispatch(api.util.updateQueryData('getPost', id, (draft) => { draft.title = t }))` редагує кеш через Immer і повертає об'єкт патча; `try { await queryFulfilled } catch { patch.undo() }` відкочує його.",
    sources: ["rtk-query-manual-updates"],
  },
  {
    question: "Як RTK Query вирішує, які запити перезапитати за тегів з id?",
    code: `providesTags: (result) => [
  ...(result?.map(({ id }) => ({ type: "Post" as const, id })) ?? []),
  { type: "Post", id: "LIST" },
],`,
    options: [
      "Мутація, що інвалідує `{ type: 'Post', id: 5 }`, перезапитує лише запити з цим тегом",
      "Будь-яка мутація перезапитує всі запити з будь-яким тегом `Post`",
      "Теги з id ігноруються, важливий лише тип",
    ],
    answer: 0,
    explanation:
      "Редагування поста 5 інвалідує `{ type: 'Post', id: 5 }` (деталі й списки, де він є), а додавання поста — `{ type: 'Post', id: 'LIST' }`. Точкові теги позбавляють від перезапиту всього підряд.",
    sources: ["rtk-query-invalidation"],
  },
  {
    question: "Для чого в ендпоінті RTK Query використовують `transformResponse`?",
    options: [
      "Щоб перетворити сиру відповідь API (наприклад, розгорнути чи нормалізувати) до кешування",
      "Щоб конвертувати тіло запиту в JSON",
      "Щоб змінити HTTP-метод запиту",
    ],
    answer: 0,
    explanation:
      "`transformResponse: (res) => res.data.items` не пускає особливості API в компоненти й кеш. Для нормалізованого кешу його можна поєднувати з `createEntityAdapter`.",
    sources: ["rtk-query-queries"],
  },
  {
    question: "Як записати результат мутації прямо в закешований запит без перезапиту (песимістичне оновлення)?",
    options: [
      "Дочекатися `queryFulfilled` в `onQueryStarted`, потім `updateQueryData` з відповіддю",
      "Повернути дані з `invalidatesTags`",
      "Викликати хук запиту всередині мутації",
    ],
    answer: 0,
    explanation:
      "Песимістичне оновлення чекає сервер і потім редагує кеш — без зайвого запиту, але UI оновиться лише після відповіді. Оптимістичні оновлення спершу редагують кеш і відкочуються в разі помилки.",
    sources: ["rtk-query-manual-updates"],
  },
  {
    question: "Чи можуть RTK Query і стан `createSlice` співіснувати в одному сторі?",
    options: [
      "Так: API-слайс — це просто ще один редʼюсер + middleware; слайси можуть реагувати на його дії",
      "Ні: RTK Query потребує окремого стору",
      "Лише якщо всі слайси перетворити на ендпоінти RTK Query",
    ],
    answer: 0,
    explanation:
      "Слайси можуть слухати дії ендпоінтів (`builder.addMatcher(api.endpoints.login.matchFulfilled, ...)`) — наприклад, щоб зберегти токен після входу, — а серверні дані лишаються в кеші RTK Query.",
    sources: ["rtk-query-overview", "rtk-createSlice"],
  },

  // ---------- Просунутий SWR ----------
  {
    question: "Як зробити оптимістичне оновлення через `mutate` у SWR?",
    options: [
      "Передати `optimisticData` і `rollbackOnError` разом з асинхронною функцією оновлення",
      "Викликати `mutate` двічі: до й після запиту",
      "SWR не підтримує оптимістичні оновлення",
    ],
    answer: 0,
    explanation:
      "`mutate(updateTodo(newTodo), { optimisticData: [...todos, newTodo], rollbackOnError: true, populateCache: true, revalidate: false })` одразу показує зміну й відкочує її, якщо запит не вдався.",
    sources: ["swr-mutation"],
  },
  {
    question: "Що дає `useSWRMutation` порівняно з викликом `fetch`, а потім `mutate`?",
    options: [
      "Функцію `trigger` зі станом `isMutating`/`error`, прив'язану до ключа",
      "Він автоматично повторює запит нескінченно",
      "Він виконує мутацію на кожному рендері",
    ],
    answer: 0,
    explanation:
      "`const { trigger, isMutating } = useSWRMutation('/api/todos', sendRequest)` — запит виконується лише під час виклику `trigger`, а кеш ключа можна оновити результатом. Це аналог `useMutation` у SWR.",
    sources: ["swr-mutation"],
  },
  {
    question: "Як SWR уникає ререндера компонента, коли змінюються не пов'язані з ним поля відповіді?",
    options: [
      "Збирання залежностей: компонент перемальовується лише через ті повернені поля, які справді читає",
      "Порівнює відповіді через `JSON.stringify` і ніколи не перемальовує",
      "Вимагає обгорнути компонент у `React.memo`",
    ],
    answer: 0,
    explanation:
      "Якщо компонент використовує лише `data`, зміни `isValidating` його не перемалюють. Крім того, SWR за замовчуванням глибоко порівнює дані (опція `compare`), тому ідентичний перезапит не спричиняє оновлення.",
    sources: ["swr-performance"],
  },
  {
    question: "Як передати в SWR дані, завантажені на сервері, щоб вони були в першого клієнтського рендера?",
    options: [
      "Передати їх як `fallback` у `<SWRConfig>` за тим самим ключем (або `fallbackData` у хуку)",
      "Записати їх у `localStorage` на сервері",
      "Викликати `mutate` в `useEffect` після монтування",
    ],
    answer: 0,
    explanation:
      "`<SWRConfig value={{ fallback: { '/api/user': user } }}>` змушує `useSWR('/api/user')` одразу повернути дані; SWR однаково перевірить їх повторно згідно зі своїми опціями.",
    sources: ["swr-global-config", "swr-intro"],
  },
  {
    question: "SWR чи TanStack Query: яке порівняння справедливе?",
    options: [
      "SWR менший і простіший; TanStack Query дає більше вбудованих можливостей (devtools, мутації, тонкий контроль кешу)",
      "SWR працює лише з Next.js, TanStack Query — лише з Vite",
      "TanStack Query не вміє stale-while-revalidate",
    ],
    answer: 0,
    explanation:
      "Обидва реалізують stale-while-revalidate з дедуплікацією й повторною перевіркою під час фокусу. У TanStack Query багатший життєвий цикл мутацій, скасування запитів, нескінченні запити й офіційні devtools; SWR виграє розміром і простотою.",
    sources: ["swr-intro", "tq-overview"],
  },

  // ---------- Просунуті loader / action у React Router ----------
  {
    question: "Чому кажуть, що loader'и маршрутів прибирають «водоспади запитів» порівняно із завантаженням у `useEffect`?",
    options: [
      "Роутер знає всі збіглі маршрути й запускає їхні loader'и паралельно до рендера",
      "Loader'и кешують відповіді назавжди",
      "Loader'и виконуються у Web Worker",
    ],
    answer: 0,
    explanation:
      "З ефектами батько рендериться, потім завантажує дані, потім рендерить нащадка, який знову завантажує. Вкладені loader'и для `/users/:id/orders` запускаються одночасно під час навігації, а модулі маршрутів з code splitting можуть вантажитися паралельно з даними.",
    sources: ["rr-data-loading", "rr-state-management"],
  },
  {
    question: "Як не перезапускати loader після кожного action на сторінці?",
    options: [
      "Експортувати з маршруту `shouldRevalidate` і повертати `false`, коли дані не можуть змінитися",
      "Обгорнути loader у `useMemo`",
      "Повертати заголовки кешування з action",
    ],
    answer: 0,
    explanation:
      "За замовчуванням після action повторно перевіряються всі активні loader'и — це безпечно, але може бути марнотратно. `shouldRevalidate({ formAction, currentUrl, nextUrl, defaultShouldRevalidate })` дає змогу вибірково відмовитися.",
    sources: ["rr-actions", "rr-data-loading"],
  },
  {
    question: "Як побудувати оптимістичний UI з fetcher у React Router?",
    options: [
      "Рендерити з `fetcher.formData`, поки `fetcher.state !== 'idle'`, інакше — з даних loader'а",
      "Спершу оновити глобальний стор, а потім викликати action",
      "Оптимістичний UI неможливий з loader'ами та action'ами",
    ],
    answer: 0,
    explanation:
      "Надіслані значення доступні одразу: `const done = fetcher.formData ? fetcher.formData.get('done') === 'true' : todo.done`. Після завершення action і повторної перевірки loader'ів у справу вступають реальні дані.",
    sources: ["rr-useFetcher", "rr-pending-ui"],
  },
  {
    question: "Як стрімити повільні некритичні дані з loader'а React Router?",
    options: [
      "Повернути проміс (без await) і відрендерити його через `<Suspense>` + `<Await>` або `use()`",
      "Розбити loader на два маршрути",
      "Використати `setTimeout` всередині компонента",
    ],
    answer: 0,
    explanation:
      "Критичні дані дочікуються, решта повертається промісом: `return { product: await getProduct(), reviews: getReviews() }`. Сторінка рендериться одразу, а відгуки підвантажуються потоком.",
    sources: ["rr-pending-ui", "react-suspense"],
  },
  {
    question: "Чи потрібна бібліотека клієнтського кешу (TanStack Query) за наявності loader'ів React Router?",
    options: [
      "Часто ні; loader'и + повторна перевірка покривають багато застосунків, але кеш допомагає зі спільними даними й тонким контролем",
      "Завжди — loader'и не працюють без бібліотеки кешу",
      "Ніколи — їх неможливо поєднати",
    ],
    answer: 0,
    explanation:
      "Loader'и прив'язують дані до маршрутів і повторно перевіряють їх після action'ів. Для даних, що використовуються на багатьох маршрутах, фонового оновлення, нескінченних списків чи офлайну їх поєднують: loader'и викликають `queryClient.ensureQueryData`, а компоненти — `useQuery`.",
    sources: ["rr-state-management", "tq-prefetching"],
  },
  {
    question: "Як помилки валідації з `action` React Router мають потрапляти у форму?",
    options: [
      "Повернути їх як дані з action і читати через `useActionData` / `fetcher.data`",
      "Кинути їх, щоб error boundary маршруту показав помилки форми",
      "Зберігати їх у глобальному сторі",
    ],
    answer: 0,
    explanation:
      "Очікувані помилки (невірний email) — це дані: `return { errors }` (часто зі статусом 400). Кинуті помилки йдуть в `ErrorBoundary` і замінюють UI маршруту — це для неочікуваних збоїв.",
    sources: ["rr-actions"],
  },

  // ---------- Архітектура й міграція ----------
  {
    question: "Легасі-застосунок зберігає відповіді API в Redux-слайсах із ручними прапорцями завантаження. Яка міграція прагматична?",
    options: [
      "Переносити серверні дані в RTK Query (або TanStack Query) ендпоінт за ендпоінтом, залишаючи слайси для клієнтського стану",
      "Переписати все на Zustand за один реліз",
      "Перенести весь стан у Context",
    ],
    answer: 0,
    explanation:
      "Поступова міграція знижує ризик: кожен ендпоінт замінює thunk, поля його слайса й прапорці завантаження. RTK Query живе в тому самому сторі, тому обидва підходи співіснують під час переходу.",
    sources: ["rtk-query-overview", "redux-why-rtk"],
  },
  {
    question: "Як синхронізувати клієнтський стан двох вкладок браузера (наприклад, вихід в одній вкладці)?",
    options: [
      "Розсилати зміни через `BroadcastChannel` або подію `storage` й оновлювати стор",
      "Використовувати один об'єкт Redux-стору на всі вкладки",
      "Перезавантажувати всі вкладки раз на хвилину",
    ],
    answer: 0,
    explanation:
      "Кожна вкладка — окреме JS-середовище зі своїм стором. Повідомлення під час виходу дає змогу іншим вкладкам очистити стан; події сховища за `persist` можуть регідрувати Zustand. Серверні кеші ще й перезапитуються під час фокусу.",
    sources: ["mdn-broadcast-channel", "mdn-web-storage"],
  },
  {
    question: "Який головний ризик копіювання серверних даних з `useQuery` у стор Zustand/Redux?",
    options: [
      "Два джерела істини: копія застаріває й потребує ручної синхронізації",
      "TanStack Query видаляє дані, скопійовані в інше місце",
      "Стори не можуть зберігати масиви, повернені запитами",
    ],
    answer: 0,
    explanation:
      "Читайте серверні дані з кешу запитів усюди, де вони потрібні (той самий хук у багатьох компонентах дедуплікується). У сторі зберігайте лише клієнтські рішення (вибраний id, фільтри), а решту виводьте.",
    sources: ["tq-client-state", "tkdodo-practical-rq"],
  },
  {
    question: "Який підхід робить логіку стану найпростішою для юніт-тестів незалежно від бібліотеки?",
    options: [
      "Тримати переходи в чистих функціях (редʼюсери, редʼюсери слайсів, дії стору) і тестувати без рендера",
      "Тестувати лише наскрізними тестами в справжньому браузері",
      "Мокати сам React у кожному тесті",
    ],
    answer: 0,
    explanation:
      "Редʼюсер чи дію стору тестують викликом із вхідними даними й перевіркою результату. Компоненти потім тестують за поведінкою (React Testing Library), а серверні виклики мокають на рівні мережі (наприклад, MSW).",
    sources: ["react-reducer", "redux-style-guide"],
  },
  {
    question: "Коли скінченний автомат (наприклад, XState) кращий за редʼюсер із прапорцями?",
    options: [
      "Для складних сценаріїв із багатьма станами й охоронюваними переходами (оформлення замовлення, відеоплеєр, майстри)",
      "Для будь-якого булевого перемикача",
      "Ніколи — редʼюсери не вміють виражати стани",
    ],
    answer: 0,
    explanation:
      "Прапорці на кшталт `isLoading`/`isError`/`isSuccess` допускають неможливі комбінації. Автомат (або редʼюсер над дискримінованим об'єднанням) робить стани явними, а переходи охоронюваними; statecharts додають вкладені й паралельні стани.",
    sources: ["rg-state", "react-reducer"],
  },
];

export default questions;
