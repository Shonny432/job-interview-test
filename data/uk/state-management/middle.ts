import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  // ---------- useState / useReducer ----------
  {
    question: "Яким буде `count` після одного кліку, якщо початкове значення 0?",
    code: `function handleClick() {
  setCount(count + 1);
  setCount((c) => c + 1);
  setCount(count + 1);
}`,
    options: ["`1`", "`2`", "`3`"],
    answer: 0,
    explanation:
      "Оновлення стають у чергу по порядку: `count + 1` = 1 (знімок 0), потім `c => c + 1` = 2, потім знову `count + 1` = 1 — останнє оновлення замінює значення на 1. Змішування значень зі знімка з апдейтерами дає неочікуваний результат; якщо нове значення залежить від попереднього, використовуйте апдейтери.",
    sources: ["react-queueing-updates", "react-state-snapshot"],
  },
  {
    question: "Як скинути стан компонента форми під час зміни вибраного користувача?",
    options: [
      "Рендерити його з `key={userId}`, щоб React перестворив компонент",
      "Скидати кожне поле в `useEffect`, що залежить від `userId`",
      "Викликати `setState(undefined)`, щоб повернути початкове значення",
    ],
    answer: 0,
    explanation:
      "Інший `key` змушує React вважати це новим компонентом: старий стан відкидається, застосовуються початкові значення. Ефект для скидання спершу рендерить застарілі дані, а потім виправляє їх — зайвий рендер і помітне блимання.",
    sources: ["react-preserving-state", "react-no-effect"],
  },
  {
    question: "Чому зберігати копію пропа в стані може бути помилкою?",
    code: `function Message({ color }) {
  const [c, setC] = useState(color);
  return <p style={{ color: c }}>Hi</p>;
}`,
    options: [
      "Початкове значення використовується один раз; подальші зміни `color` ігноруються",
      "`useState` не може зберігати рядки, отримані з пропсів",
      "React кидає помилку, якщо стан дублює проп",
    ],
    answer: 0,
    explanation:
      "«Віддзеркалення» пропа в стані заморожує перше значення. Якщо компонент має стежити за пропом — використовуйте його напряму. Копіювати в стан варто, лише коли потрібне саме початкове значення (і назвати його `initialColor`).",
    sources: ["react-choosing-state"],
  },
  {
    question: "Як передати `dispatch` з `useReducer` глибоко в дерево без prop drilling?",
    options: [
      "Покласти `dispatch` в окремий контекст; він не змінюється, і споживачі не перемальовуються",
      "Зберегти `dispatch` у `localStorage` і читати його в нащадках",
      "Створювати редʼюсер заново в кожному нащадку з тим самим початковим станом",
    ],
    answer: 0,
    explanation:
      "Патерн «редʼюсер + контекст»: один контекст для `state`, інший — для `dispatch`. Компоненти, які лише надсилають дії (кнопки, форми), читають стабільний контекст з dispatch і не перемальовуються при зміні стану.",
    sources: ["react-reducer", "react-context-learn"],
  },
  {
    question: "Навіщо потрібен третій аргумент `init` у `useReducer(reducer, arg, init)`?",
    options: [
      "Лінива ініціалізація: `init(arg)` викликається лише на першому рендері",
      "Це middleware, що викликається перед кожною дією",
      "Він задає типи дій, які приймає редʼюсер",
    ],
    answer: 0,
    explanation:
      "`useReducer(reducer, username, createInitialState)` уникає перерахунку дорогого початкового стану на кожному рендері — як лінивий ініціалізатор у `useState`. `init` можна перевикористати й для скидання стану.",
    sources: ["react-useReducer"],
  },

  // ---------- Продуктивність Context ----------
  {
    question: "Чому всі споживачі контексту перемальовуються при кожному рендері провайдера?",
    code: `<AuthContext value={{ user, login, logout }}>
  {children}
</AuthContext>`,
    options: [
      "`value` — щоразу новий об'єкт, а React порівнює його через `Object.is`",
      "Context завжди перемальовує споживачів на кожному рендері застосунку",
      "Функції не можна передавати через контекст, тому React перестворює їх",
    ],
    answer: 0,
    explanation:
      "Новий літерал об'єкта ніколи не дорівнює попередньому. Мемоізуйте: `const value = useMemo(() => ({ user, login, logout }), [user, login, logout])` і `useCallback` для функцій (React Compiler може зробити це автоматично).",
    sources: ["react-useContext", "react-useMemo"],
  },
  {
    question: "Компонент використовує лише `theme` з великого `AppContext`, але перемальовується при кожній зміні кошика. Що допоможе?",
    options: [
      "Розділити контекст на менші за доменом і частотою змін",
      "Обгорнути компонент у `React.memo` — він блокує оновлення контексту",
      "Читати контекст через `useRef` замість `useContext`",
    ],
    answer: 0,
    explanation:
      "`React.memo` не зупиняє ререндери через контекст, який читає компонент. Окремі `ThemeContext` і `CartContext` обмежують оновлення потрібними споживачами. Для дуже частих оновлень — стор із селекторами.",
    sources: ["react-useContext", "react-memo"],
  },
  {
    question: "Чому `React.memo` не допомагає компоненту, який викликає `useContext(CartContext)`?",
    options: [
      "Memo порівнює пропси, а зміна контексту перемалює споживача в будь-якому разі",
      "Memo ігнорується для компонентів, які використовують будь-які хуки",
      "Memo працює лише для класових компонентів",
    ],
    answer: 0,
    explanation:
      "Оновлення контексту оминають порівняння пропсів. Обхідний шлях: читати контекст у маленькому батьку й передавати мемоізованому нащадку лише потрібне значення — тоді нащадок пропустить рендер, якщо значення не змінилося.",
    sources: ["react-memo", "react-useContext"],
  },
  {
    question: "Чи є Context бібліотекою керування станом?",
    options: [
      "Ні: це механізм впровадження залежностей; стан живе в `useState`/`useReducer`",
      "Так: він замінює Redux і Zustand у будь-якому сценарії",
      "Так, але лише для серверних компонентів",
    ],
    answer: 0,
    explanation:
      "Context лише передає значення деревом. У нього немає селекторів, middleware, devtools і кешування. Разом з `useReducer` він покриває багато застосунків, але для частих оновлень і точкових підписок краще стор.",
    sources: ["react-context-learn", "redux-essentials"],
  },
  {
    question: "Що буде з вкладеними провайдерами одного контексту?",
    code: `<ThemeContext value="dark">
  <Sidebar />
  <ThemeContext value="light">
    <Panel />
  </ThemeContext>
</ThemeContext>`,
    options: [
      "`Panel` прочитає `\"light\"` — перемагає найближчий провайдер",
      "`Panel` прочитає `\"dark\"` — перемагає найзовнішніший провайдер",
      "React кине помилку про дубльовані провайдери",
    ],
    answer: 0,
    explanation:
      "`useContext` шукає найближчий провайдер угору по дереву. Перевизначити значення для піддерева — нормальний прийом: темна секція на світлій сторінці, вкладена форма з власними налаштуваннями.",
    sources: ["react-useContext"],
  },
  {
    question: "Коли краще покласти значення в Context, а не передавати його явно через пропси?",
    options: [
      "Коли воно потрібне багатьом компонентам на різній глибині й рідко змінюється",
      "Завжди, коли проп використовує більше ніж один компонент",
      "Коли значення — функція, адже функції не можна передавати пропсами",
    ],
    answer: 0,
    explanation:
      "Context міняє явність на зручність: важче побачити, звідки приходять дані, а компоненти залежать від наявності провайдера. Використовуйте його для справді наскрізних значень; в інших випадках явні пропси чи композиція зрозуміліші.",
    sources: ["react-context-learn"],
  },

  // ---------- Redux Toolkit ----------
  {
    question: "Що не так із цим case reducer?",
    code: `todoAdded(state, action) {
  state.items.push(action.payload);
  return { ...state, count: state.count + 1 };
}`,
    options: [
      "Не можна одночасно мутувати чернетку Immer і повертати нове значення",
      "`push` заборонений усередині редʼюсерів `createSlice`",
      "Case reducer має бути асинхронною функцією",
    ],
    answer: 0,
    explanation:
      "Або мутуйте чернетку (`state.items.push(...); state.count += 1`), або повертайте цілком новий стан — якщо зробити і те, і інше, Immer кине помилку.",
    sources: ["rtk-immer", "rtk-createSlice"],
  },
  {
    question: "Які дії надсилає `createAsyncThunk('users/fetch', fn)`?",
    options: [
      "`users/fetch/pending`, потім `users/fetch/fulfilled` або `users/fetch/rejected`",
      "`users/fetch/start` і `users/fetch/end`",
      "Лише `users/fetch` з результатом у `payload`",
    ],
    answer: 0,
    explanation:
      "Редʼюсери обробляють їх в `extraReducers` через `builder.addCase(fetchUsers.fulfilled, ...)`, виставляючи прапорці завантаження, дані й помилки. Для кешованих серверних даних RTK Query прибирає більшу частину цього коду.",
    sources: ["rtk-createAsyncThunk"],
  },
  {
    question: "Чому цей селектор перемальовує компонент при кожній надісланій дії?",
    code: `const done = useSelector((s) => s.todos.filter((t) => t.done));`,
    options: [
      "`filter` щоразу повертає новий масив, тому посилання завжди змінюється",
      "`useSelector` завжди перемальовує при будь-якій дії",
      "Селектори не можуть використовувати методи масивів",
    ],
    answer: 0,
    explanation:
      "`useSelector` перезапускається після кожного dispatch і порівнює результати через `===`. Використовуйте мемоізований селектор із `createSelector`: він повертає той самий масив, доки `s.todos` не змінився.",
    sources: ["rtk-createSelector", "redux-selectors", "react-redux-hooks"],
  },
  {
    question: "Для чого потрібен `extraReducers` у `createSlice`?",
    options: [
      "Обробляти дії, визначені поза цим слайсом (thunk'и, інші слайси)",
      "Додавати більше редʼюсерів, ніж ліміт у 10 штук у `reducers`",
      "Реєструвати middleware для слайса",
    ],
    answer: 0,
    explanation:
      "`reducers` створює власні дії слайса, а `extraReducers` реагує на зовнішні: `builder.addCase(fetchUser.fulfilled, ...)` або `builder.addCase(logout, () => initialState)`.",
    sources: ["rtk-createSlice", "rtk-createAsyncThunk"],
  },
  {
    question: "Як типізувати `useSelector` і `useDispatch` у TypeScript-проєкті?",
    options: [
      "Вивести `RootState`/`AppDispatch` зі стору й створити `useAppSelector`/`useAppDispatch`",
      "Описати весь інтерфейс стану вручну й кастувати кожен селектор",
      "Типізувати як `any` — RTK не можна типізувати",
    ],
    answer: 0,
    explanation:
      "`type RootState = ReturnType<typeof store.getState>`, `type AppDispatch = typeof store.dispatch`, потім `useSelector.withTypes<RootState>()`. Типи автоматично стежать за редʼюсерами.",
    sources: ["redux-typescript"],
  },
  {
    question: "Що дає нормалізований стан (`{ ids, entities }`)?",
    options: [
      "Кожен елемент зберігається один раз за id, тож оновлення й пошук прості та узгоджені",
      "Менший розмір бандла завдяки стисненню",
      "Автоматичну синхронізацію із сервером",
    ],
    answer: 0,
    explanation:
      "Вкладені дубльовані дані розсинхронізуються (той самий користувач у списку й у коментарях). `createEntityAdapter` дає нормалізований стан плюс `addOne`, `upsertMany`, `removeOne` і селектори `selectAll`/`selectById`.",
    sources: ["redux-normalizing", "rtk-createEntityAdapter"],
  },
  {
    question: "Що перевіряє `configureStore` у режимі розробки?",
    options: [
      "Випадкові мутації стану й несеріалізовні значення в стані та діях",
      "Що кожен редʼюсер має юніт-тести",
      "Що дії надсилаються не частіше ніж раз за кадр",
    ],
    answer: 0,
    explanation:
      "Middleware для перевірки іммутабельності й серіалізовності рано ловлять помилки: мутацію поза Immer чи `Date`/екземпляр класу/проміс у сторі. У продакшен-збірці вони вимкнені.",
    sources: ["rtk-configureStore", "redux-style-guide"],
  },
  {
    question: "Чи варто зберігати стан полів форми (кожне натискання клавіші) в Redux?",
    options: [
      "Зазвичай ні: тримайте його локально й надсилайте результат під час сабміту",
      "Так, увесь стан має бути в сторі, щоб бути передбачуваним",
      "Так, інакше форма не працюватиме з DevTools",
    ],
    answer: 0,
    explanation:
      "Style guide Redux радить вирішувати для кожної частини стану окремо. Ефемерний UI-стан (введення тексту, hover, відкритий випадний список) локальний; у сторі — дані, спільні для застосунку або які мають пережити навігацію.",
    sources: ["redux-style-guide"],
  },

  // ---------- Zustand ----------
  {
    question: "Чому цей компонент перемальовується при будь-якій зміні стору?",
    code: `const { count, inc } = useStore();`,
    options: [
      "Без селектора він підписаний на весь стор",
      "Деструктуризація заборонена для хуків Zustand",
      "Дії в сторі перестворюються при кожному оновленні",
    ],
    answer: 0,
    explanation:
      "`useStore()` повертає весь об'єкт стану, тому будь-яка зміна перемалює компонент. Вибирайте потрібне: `useStore((s) => s.count)` і `useStore((s) => s.inc)`.",
    sources: ["zustand-use-shallow", "zustand-intro"],
  },
  {
    question: "Чому селектор, що повертає новий об'єкт, спричиняє зайві ререндери (або нескінченний цикл у v5)?",
    code: `const { a, b } = useStore((s) => ({ a: s.a, b: s.b }));`,
    options: [
      "Щоразу створюється новий об'єкт; обгорніть селектор у `useShallow`",
      "Zustand забороняє вибирати більше одного поля",
      "Об'єкти можна вибирати лише через `getState()`",
    ],
    answer: 0,
    explanation:
      "Zustand порівнює результати селектора через `Object.is`. `useShallow((s) => ({ a: s.a, b: s.b }))` порівнює поля поверхнево й зберігає те саме посилання, якщо вони рівні.",
    sources: ["zustand-use-shallow"],
  },
  {
    question: "Як прочитати чи оновити стор Zustand поза React-компонентами (наприклад, в API-хелпері)?",
    options: [
      "Через `useStore.getState()` і `useStore.setState()`",
      "Ніяк — стор доступний лише всередині хуків",
      "Через `useContext(useStore)`",
    ],
    answer: 0,
    explanation:
      "Хук, який повертає `create`, несе й API «ванільного» стору: `getState`, `setState`, `subscribe`. Зручно для інтерсепторів, вебсокетів і тестів.",
    sources: ["zustand-intro", "zustand-updating-state"],
  },
  {
    question: "Як `set` у Zustand обробляє вкладені об'єкти?",
    code: `set({ user: { name: "Ann" } }); // state was { user: { name, email }, theme }`,
    options: [
      "Об'єднує лише на один рівень: `theme` залишиться, а `user.email` загубиться",
      "Глибоко об'єднує все, тому `user.email` залишиться",
      "Замінює весь стан, втрачаючи `theme`",
    ],
    answer: 0,
    explanation:
      "`set` робить поверхневе об'єднання верхнього рівня. Для вкладених оновлень явно використовуйте spread: `set((s) => ({ user: { ...s.user, name: 'Ann' } }))` або middleware `immer`.",
    sources: ["zustand-updating-state"],
  },
  {
    question: "Як зазвичай організовують великий стор Zustand?",
    options: [
      "Ділять на слайси — функції, що створюють частини стану, які об'єднуються в одному `create`",
      "Як десятки незалежних сторів, які імпортують один одного",
      "Як один величезний літерал об'єкта в одному файлі",
    ],
    answer: 0,
    explanation:
      "Патерн слайсів: `createBearSlice`, `createFishSlice` отримують `set`/`get` і повертають свою частину; `create((...a) => ({ ...createBearSlice(...a), ...createFishSlice(...a) }))`. Окремі стори за доменами — теж нормальний варіант.",
    sources: ["zustand-slices"],
  },
  {
    question: "Чому стор із `persist` може спричинити hydration mismatch у SSR-застосунках?",
    options: [
      "Сервер рендерить значення за замовчуванням, а клієнт відновлює інші зі сховища",
      "`persist` надсилає стан на сервер при кожному запиті",
      "`localStorage` читається на сервері й блокує рендер",
    ],
    answer: 0,
    explanation:
      "На сервері немає `localStorage`, тому його HTML використовує початкові значення. Дочекайтеся гідрації (`persist.hasHydrated()`/`onFinishHydration`), перш ніж показувати збережені значення, або рендерте їх лише на клієнті.",
    sources: ["zustand-persist", "zustand-nextjs"],
  },

  // ---------- TanStack Query ----------
  {
    question: "Чим `staleTime` відрізняється від `gcTime`?",
    options: [
      "`staleTime` — скільки дані вважаються свіжими; `gcTime` — скільки невикористані дані живуть у пам'яті",
      "Це синоніми; `gcTime` — нова назва у v5",
      "`staleTime` — таймаут запиту; `gcTime` — затримка повтору",
    ],
    answer: 0,
    explanation:
      "Свіжі дані не перезапитуються під час монтування й фокусу. Застарілі все ще показуються з кешу й оновлюються у фоні. `gcTime` (раніше `cacheTime`, за замовчуванням 5 хвилин) починає відлік, коли в запиту не лишилося спостерігачів.",
    sources: ["tq-important-defaults", "tq-caching"],
  },
  {
    question: "Чим `isPending` відрізняється від `isFetching`?",
    options: [
      "`isPending` — даних ще немає; `isFetching` — триває будь-який запит, зокрема фоновий",
      "Це той самий прапорець під різними назвами",
      "`isPending` — лише для мутацій, `isFetching` — лише для запитів",
    ],
    answer: 0,
    explanation:
      "За `isPending` показуйте скелетон, а за `isFetching` зі старими даними на екрані — невеликий індикатор. У v4 перший називався `isLoading`.",
    sources: ["tq-queries"],
  },
  {
    question: "Як оновити список після того, як `useMutation` створив елемент?",
    options: [
      "Викликати `queryClient.invalidateQueries({ queryKey: ['todos'] })` в `onSuccess`",
      "Знову викликати `useQuery` всередині `onSuccess`",
      "Перезавантажити сторінку через `location.reload()`",
    ],
    answer: 0,
    explanation:
      "Інвалідація позначає відповідні запити застарілими й перезапитує активні. Альтернатива — записати повернений об'єкт у кеш через `setQueryData`. Хуки не можна викликати всередині колбеків.",
    sources: ["tq-mutations", "tq-invalidation"],
  },
  {
    question: "Які запити зачіпає `invalidateQueries({ queryKey: ['todos'] })`?",
    options: [
      "Усі запити, ключ яких починається з `['todos']`",
      "Лише запит із ключем рівно `['todos']`",
      "Усі запити в кеші",
    ],
    answer: 0,
    explanation:
      "Збіг за префіксом робить корисними ієрархічні ключі: `['todos']` → `['todos', 'list', filters]` → `['todos', 'detail', id]`. Для точного збігу — `exact: true`.",
    sources: ["tq-invalidation", "tq-query-keys"],
  },
  {
    question: "Як запустити запит лише після того, як інший повернув `user.id`?",
    options: [
      "Передати `enabled: !!user?.id` у залежний запит",
      "Викликати другий `useQuery` всередині `if (user)`",
      "Викликати `refetch()` другого запиту в `useEffect`",
    ],
    answer: 0,
    explanation:
      "Поки `enabled` дорівнює false, запит не виконується. Умовний виклик хуків порушує правила хуків. `user.id` також має бути частиною ключа залежного запиту.",
    sources: ["tq-dependent", "react-rules-of-hooks"],
  },
  {
    question: "Як під час пагінації показувати попередню сторінку, поки вантажиться наступна?",
    options: [
      "`placeholderData: keepPreviousData`",
      "`staleTime: Infinity`",
      "`refetchOnMount: false`",
    ],
    answer: 0,
    explanation:
      "Новий ключ (`['projects', page]`) починається з порожнього кешу. `placeholderData` тим часом показує попередні дані, а `isPlaceholderData` дає змогу заблокувати кнопку «Далі».",
    sources: ["tq-paginated"],
  },
  {
    question: "Що TanStack Query робить з невдалим запитом за замовчуванням?",
    options: [
      "Повторює 3 рази з експоненційною затримкою, перш ніж показати помилку",
      "Одразу показує помилку",
      "Повторює нескінченно, доки не вийде",
    ],
    answer: 0,
    explanation:
      "`retry: 3` зі зростаючим `retryDelay`. Мутації за замовчуванням не повторюються. Можна не повторювати 4xx: `retry: (count, err) => err.status >= 500 && count < 3`.",
    sources: ["tq-important-defaults"],
  },
  {
    question: "Чому кожна змінна, яку використовує `queryFn`, має входити в `queryKey`?",
    options: [
      "Інакше різні дані кешуються під одним ключем і не перезапитуються при зміні змінної",
      "Бо `queryFn` не має доступу до змінних компонента",
      "Бо в ключі має бути щонайменше три елементи",
    ],
    answer: 0,
    explanation:
      "Ключ — це ідентичність кешу, як залежності ефекту. `useQuery({ queryKey: ['todos'], queryFn: () => fetchTodos(filter) })` покаже результати старого фільтра. ESLint-плагін із правилом `exhaustive-deps` для запитів це ловить.",
    sources: ["tq-query-keys"],
  },

  // ---------- RTK Query ----------
  {
    question: "Як змусити мутацію RTK Query перезапитати список постів?",
    code: `getPosts: build.query({ query: () => "posts", providesTags: ["Post"] }),
addPost: build.mutation({ query: (body) => ({ url: "posts", method: "POST", body }) }),`,
    options: [
      "Додати `invalidatesTags: ['Post']` в `addPost`",
      "Викликати `getPosts()` всередині `query` мутації",
      "Додати `refetchOnMutation: true` в `getPosts`",
    ],
    answer: 0,
    explanation:
      "Теги пов'язують кеш із мутаціями. Для точнішого контролю позначайте елементи за id (`{ type: 'Post', id }`) плюс тег `'LIST'` — тоді редагування одного поста перезапитає лише зачеплене.",
    sources: ["rtk-query-invalidation", "rtk-query-mutations"],
  },
  {
    question: "Коли RTK Query видаляє невикористані дані з кешу?",
    options: [
      "Через `keepUnusedDataFor` секунд (за замовчуванням 60) без підписників",
      "Одразу після розмонтування останнього компонента",
      "Ніколи — дані живуть до перезавантаження сторінки",
    ],
    answer: 0,
    explanation:
      "RTK Query рахує підписки хуків на кожен ендпоінт і аргумент. Якщо за цей час хтось знову підпишеться, дані прийдуть із кешу. Аналог у TanStack Query — `gcTime`.",
    sources: ["rtk-query-cache-behavior"],
  },
  {
    question: "Як пропустити запит RTK Query, поки аргумент недоступний?",
    options: [
      "Передати `skip: !id` або `skipToken` замість аргументу",
      "Обгорнути виклик хука в `if (id)`",
      "Повернути `null` з функції `query` ендпоінта",
    ],
    answer: 0,
    explanation:
      "`useGetUserQuery(id ?? skipToken)` залишає виклик хука безумовним, але не дає запиту піти. Це аналог `enabled: false` у TanStack Query.",
    sources: ["rtk-query-queries", "react-rules-of-hooks"],
  },
  {
    question: "Як RTK Query уникає дубльованих запитів, коли 3 компоненти викликають `useGetUserQuery(1)`?",
    options: [
      "Запити з тим самим ендпоінтом і аргументом об'єднуються в один",
      "Надсилає три запити й бере найшвидшу відповідь",
      "Дані отримує лише перший компонент, решта — `undefined`",
    ],
    answer: 0,
    explanation:
      "Ключ кешу — ендпоінт + серіалізований аргумент. Усі підписники ділять один запит і один запис у кеші, який живе, доки змонтований хоча б один із них.",
    sources: ["rtk-query-cache-behavior", "rtk-query-overview"],
  },
  {
    question: "Що робить опція `refetchOnMountOrArgChange` у RTK Query?",
    options: [
      "Примусово перезапитує під час монтування компонента чи зміни аргументу, навіть якщо дані в кеші",
      "Повністю вимикає кешування для ендпоінта",
      "Перезапитує дані щосекунди",
    ],
    answer: 0,
    explanation:
      "За замовчуванням RTK Query віддає новим підписникам дані з кешу. `refetchOnMountOrArgChange: true` (або число секунд) перезапитує, якщо дані старші за це. Пов'язані опції: `refetchOnFocus`, `refetchOnReconnect`, `pollingInterval`.",
    sources: ["rtk-query-cache-behavior"],
  },

  // ---------- SWR ----------
  {
    question: "Коли SWR за замовчуванням автоматично перевіряє дані повторно?",
    options: [
      "Під час монтування, фокусу вікна й відновлення мережі",
      "Лише коли користувач натискає кнопку оновлення",
      "Кожні 5 секунд незалежно від активності",
    ],
    answer: 0,
    explanation:
      "Кожен тригер можна вимкнути (`revalidateOnFocus: false`, `revalidateOnReconnect: false`), а опитування вмикається через `refreshInterval`. Для незмінних даних є `useSWRImmutable`.",
    sources: ["swr-revalidation"],
  },
  {
    question: "Як завантажувати дані в SWR лише за виконання умови?",
    code: `const { data } = useSWR(userId ? \`/api/user/\${userId}\` : null, fetcher);`,
    options: [
      "Передати `null` (або хибний ключ) — SWR не зробить запит",
      "Обгорнути `useSWR` в оператор `if`",
      "Передати `enabled: false` в опціях",
    ],
    answer: 0,
    explanation:
      "Ключ `null` означає «не завантажувати». Ключ може бути й функцією, яка кидає помилку чи повертає хибне значення, поки залежності немає, — так будують залежні запити.",
    sources: ["swr-conditional"],
  },
  {
    question: "Що робить `mutate(key)` з `useSWRConfig`?",
    options: [
      "Повторно перевіряє (і за бажання оновлює) кеш для цього ключа в усіх компонентах",
      "Видаляє ключ на сервері",
      "Змінює функцію fetcher для цього ключа",
    ],
    answer: 0,
    explanation:
      "Після POST викликають `mutate('/api/todos')`, щоб кожен компонент із цим ключем перезапитав дані. Можна передати й нові дані для миттєвого оновлення кешу, а прив'язаний `mutate` з `useSWR` оновлює свій ключ.",
    sources: ["swr-mutation"],
  },
  {
    question: "Чому два компоненти з одним ключем SWR роблять лише один запит?",
    options: [
      "SWR дедуплікує запити з одним ключем у межах `dedupingInterval`",
      "Другий компонент чекає, поки перший розмонтується",
      "SWR кешує відповіді в `localStorage` між компонентами",
    ],
    answer: 0,
    explanation:
      "У межах інтервалу дедуплікації (за замовчуванням 2 секунди) паралельні запити за одним ключем об'єднуються, і обидва компоненти ділять закешовані дані. Тому `useUser()` можна вільно викликати в багатьох компонентах.",
    sources: ["swr-performance"],
  },
  {
    question: "Як задати `fetcher` і опції за замовчуванням для всіх хуків SWR?",
    options: [
      "Обгорнути застосунок у `<SWRConfig value={{ fetcher, ... }}>`",
      "Викликати `useSWR.defaults = { fetcher }` під час старту",
      "Передавати fetcher у кожен хук — глобальні опції не підтримуються",
    ],
    answer: 0,
    explanation:
      "`SWRConfig` задає глобальні опції (fetcher, `revalidateOnFocus`, обробники помилок) і може вкладатися, щоб перевизначити їх для піддерева. Через нього ж можна передати початкові дані `fallback` з SSR.",
    sources: ["swr-global-config"],
  },

  // ---------- React Router loader / action ----------
  {
    question: "Як компонент читає дані, які повернув `loader` його маршруту?",
    options: [
      "Через `useLoaderData()` (або проп `loaderData` у framework mode)",
      "Через `useState`, ініціалізований з `window.loaderResult`",
      "Через `useEffect`, який знову викликає loader",
    ],
    answer: 0,
    explanation:
      "Роутер виконує loader до рендера маршруту й передає результат. З генерацією типів у framework mode `loaderData` повністю типізований.",
    sources: ["rr-data-loading"],
  },
  {
    question: "Що відбувається після завершення `action` у React Router?",
    options: [
      "Роутер повторно перевіряє loader'и сторінки, і UI показує свіжі дані",
      "Уся сторінка перезавантажується із сервера",
      "Нічого — дані треба перезапитати вручну",
    ],
    answer: 0,
    explanation:
      "Автоматична повторна перевірка після мутацій — ключова ідея: URL і loader'и — джерело істини для серверних даних, тому код синхронізації клієнтського кешу не потрібен.",
    sources: ["rr-actions", "rr-state-management"],
  },
  {
    question: "Як показати стан очікування під час навігації чи надсилання форми в React Router?",
    options: [
      "Читати `useNavigation().state` (`idle` / `loading` / `submitting`)",
      "Зберігати прапорець `isLoading` у глобальному сторі",
      "Перевіряти `document.readyState`",
    ],
    answer: 0,
    explanation:
      "`navigation.state !== 'idle'` означає, що роутер завантажує сторінку чи надсилає форму, а в `navigation.formData` — надіслані дані. Цього досить для спінерів і блокування кнопок.",
    sources: ["rr-useNavigation", "rr-pending-ui"],
  },
  {
    question: "Коли варто використовувати `useFetcher` замість `<Form>`?",
    options: [
      "Щоб викликати loader/action без навігації, наприклад кнопку «лайк» у списку",
      "Щоб надіслати форму, яка має перейти на нову сторінку",
      "Щоб завантажити дані стороннього API в `useEffect`",
    ],
    answer: 0,
    explanation:
      "У fetcher свій стан (`fetcher.state`, `fetcher.data`), і він не змінює URL, тож на одній сторінці може йти багато незалежних мутацій (список задач, редагування на місці).",
    sources: ["rr-useFetcher"],
  },
  {
    question: "Як перенаправити з `action` після створення елемента?",
    options: [
      "Повернути (або кинути) `redirect('/items/' + id)` з action",
      "Викликати `window.location.href = ...` всередині action",
      "Викликати `useNavigate()` всередині action",
    ],
    answer: 0,
    explanation:
      "Loader'и та action'и виконуються поза компонентами, тому хуки там недоступні. `redirect` створює відповідь, за якою йде роутер. Хуки на кшталт `useNavigate` працюють лише в компонентах.",
    sources: ["rr-actions"],
  },

  // ---------- Вибір рішення ----------
  {
    question: "Серверні дані лежать у TanStack Query. Що зазвичай лишається для глобального клієнтського стору?",
    options: [
      "Трохи UI-стану: тема, відкриті панелі, кроки майстра — часто вистачає Context чи Zustand",
      "Нічого — TanStack Query замінює й увесь UI-стан",
      "Повна копія серверних даних, щоб уникнути перезапитів",
    ],
    answer: 0,
    explanation:
      "Коли серверний кеш переїжджає в спеціалізований інструмент, решта клієнтського стану часто невелика. Копіювання серверних даних у Redux/Zustand повертає проблеми синхронізації, які розв'язує бібліотека запитів.",
    sources: ["tq-client-state", "tkdodo-practical-rq"],
  },
  {
    question: "Як RTK Query співвідноситься з TanStack Query?",
    options: [
      "Схожі цілі; RTK Query живе в Redux-сторі й підходить застосункам, що вже використовують Redux",
      "RTK Query працює лише з GraphQL, TanStack Query — лише з REST",
      "TanStack Query потребує Redux для зберігання кешу",
    ],
    answer: 0,
    explanation:
      "Обидва кешують серверні дані з дедуплікацією, інвалідацією й оптимістичними оновленнями. RTK Query використовує теги, його кеш видно в Redux DevTools і він інтегрований зі слайсами; у TanStack Query окремий кеш, ключі запитів і широкий набір можливостей (нескінченні запити, suspense).",
    sources: ["rtk-query-overview", "tq-overview"],
  },
];

export default questions;
