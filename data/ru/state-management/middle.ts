import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  // ---------- useState / useReducer ----------
  {
    question: "Каким будет `count` после одного клика, если начальное значение 0?",
    code: `function handleClick() {
  setCount(count + 1);
  setCount((c) => c + 1);
  setCount(count + 1);
}`,
    options: ["`1`", "`2`", "`3`"],
    answer: 0,
    explanation:
      "Обновления ставятся в очередь по порядку: `count + 1` = 1 (снимок 0), затем `c => c + 1` = 2, затем снова `count + 1` = 1 — последнее обновление заменяет значение на 1. Смешение значений из снимка с апдейтерами даёт неожиданный результат; если новое значение зависит от предыдущего, используйте апдейтеры.",
    sources: ["react-queueing-updates", "react-state-snapshot"],
  },
  {
    question: "Как сбросить состояние компонента формы при смене выбранного пользователя?",
    options: [
      "Рендерить его с `key={userId}`, чтобы React пересоздал компонент",
      "Сбрасывать каждое поле в `useEffect`, зависящем от `userId`",
      "Вызвать `setState(undefined)`, чтобы вернуть начальное значение",
    ],
    answer: 0,
    explanation:
      "Другой `key` заставляет React считать это новым компонентом: старое состояние отбрасывается, применяются начальные значения. Сбрасывающий эффект сначала рендерит устаревшие данные, а потом исправляет их — лишний рендер и заметное мигание.",
    sources: ["react-preserving-state", "react-no-effect"],
  },
  {
    question: "Почему хранить копию пропа в состоянии может быть ошибкой?",
    code: `function Message({ color }) {
  const [c, setC] = useState(color);
  return <p style={{ color: c }}>Hi</p>;
}`,
    options: [
      "Начальное значение используется один раз; дальнейшие изменения `color` игнорируются",
      "`useState` не может хранить строки, полученные из пропсов",
      "React бросает ошибку, если состояние дублирует проп",
    ],
    answer: 0,
    explanation:
      "«Зеркалирование» пропа в состоянии замораживает первое значение. Если компонент должен следовать за пропом — используйте его напрямую. Копировать в состояние стоит, только когда нужно именно начальное значение (и назвать его `initialColor`).",
    sources: ["react-choosing-state"],
  },
  {
    question: "Как передать `dispatch` из `useReducer` глубоко в дерево без prop drilling?",
    options: [
      "Положить `dispatch` в отдельный контекст; он не меняется, и потребители не перерисовываются",
      "Сохранить `dispatch` в `localStorage` и читать его в потомках",
      "Создавать редьюсер заново в каждом потомке с тем же начальным состоянием",
    ],
    answer: 0,
    explanation:
      "Паттерн «редьюсер + контекст»: один контекст для `state`, другой — для `dispatch`. Компоненты, которые только отправляют действия (кнопки, формы), читают стабильный контекст с dispatch и не перерисовываются при изменении состояния.",
    sources: ["react-reducer", "react-context-learn"],
  },
  {
    question: "Зачем нужен третий аргумент `init` в `useReducer(reducer, arg, init)`?",
    options: [
      "Ленивая инициализация: `init(arg)` вызывается только на первом рендере",
      "Это middleware, вызываемое перед каждым действием",
      "Он задаёт типы действий, которые принимает редьюсер",
    ],
    answer: 0,
    explanation:
      "`useReducer(reducer, username, createInitialState)` избегает пересчёта дорогого начального состояния на каждом рендере — как ленивый инициализатор в `useState`. `init` можно переиспользовать и для сброса состояния.",
    sources: ["react-useReducer"],
  },

  // ---------- Производительность Context ----------
  {
    question: "Почему все потребители контекста перерисовываются при каждом рендере провайдера?",
    code: `<AuthContext value={{ user, login, logout }}>
  {children}
</AuthContext>`,
    options: [
      "`value` — каждый раз новый объект, а React сравнивает его через `Object.is`",
      "Context всегда перерисовывает потребителей на каждом рендере приложения",
      "Функции нельзя передавать через контекст, поэтому React пересоздаёт их",
    ],
    answer: 0,
    explanation:
      "Новый литерал объекта никогда не равен предыдущему. Мемоизируйте: `const value = useMemo(() => ({ user, login, logout }), [user, login, logout])` и `useCallback` для функций (React Compiler может сделать это автоматически).",
    sources: ["react-useContext", "react-useMemo"],
  },
  {
    question: "Компонент использует только `theme` из большого `AppContext`, но перерисовывается при каждом изменении корзины. Что поможет?",
    options: [
      "Разделить контекст на меньшие по домену и частоте изменений",
      "Обернуть компонент в `React.memo` — он блокирует обновления контекста",
      "Читать контекст через `useRef` вместо `useContext`",
    ],
    answer: 0,
    explanation:
      "`React.memo` не останавливает ререндеры из-за контекста, который читает компонент. Отдельные `ThemeContext` и `CartContext` ограничивают обновления нужными потребителями. Для очень частых обновлений — стор с селекторами.",
    sources: ["react-useContext", "react-memo"],
  },
  {
    question: "Почему `React.memo` не помогает компоненту, который вызывает `useContext(CartContext)`?",
    options: [
      "Memo сравнивает пропсы, а изменение контекста перерисует потребителя в любом случае",
      "Memo игнорируется для компонентов, которые используют любые хуки",
      "Memo работает только для классовых компонентов",
    ],
    answer: 0,
    explanation:
      "Обновления контекста обходят сравнение пропсов. Обходной путь: читать контекст в маленьком родителе и передавать мемоизированному потомку только нужное значение — тогда потомок пропустит рендер, если значение не изменилось.",
    sources: ["react-memo", "react-useContext"],
  },
  {
    question: "Является ли Context библиотекой управления состоянием?",
    options: [
      "Нет: это механизм внедрения зависимостей; состояние живёт в `useState`/`useReducer`",
      "Да: он заменяет Redux и Zustand в любом сценарии",
      "Да, но только для серверных компонентов",
    ],
    answer: 0,
    explanation:
      "Context лишь передаёт значение по дереву. У него нет селекторов, middleware, devtools и кэширования. Вместе с `useReducer` он покрывает многие приложения, но для частых обновлений и точечных подписок лучше стор.",
    sources: ["react-context-learn", "redux-essentials"],
  },
  {
    question: "Что будет при вложенных провайдерах одного контекста?",
    code: `<ThemeContext value="dark">
  <Sidebar />
  <ThemeContext value="light">
    <Panel />
  </ThemeContext>
</ThemeContext>`,
    options: [
      "`Panel` прочитает `\"light\"` — побеждает ближайший провайдер",
      "`Panel` прочитает `\"dark\"` — побеждает самый внешний провайдер",
      "React бросит ошибку о дублирующихся провайдерах",
    ],
    answer: 0,
    explanation:
      "`useContext` ищет ближайший провайдер вверх по дереву. Переопределить значение для поддерева — нормальный приём: тёмная секция на светлой странице, вложенная форма со своими настройками.",
    sources: ["react-useContext"],
  },
  {
    question: "Когда лучше положить значение в Context, а не передавать его явно через пропсы?",
    options: [
      "Когда оно нужно многим компонентам на разной глубине и редко меняется",
      "Всегда, когда проп используется больше чем одним компонентом",
      "Когда значение — функция, ведь функции нельзя передавать пропсами",
    ],
    answer: 0,
    explanation:
      "Context меняет явность на удобство: сложнее увидеть, откуда приходят данные, а компоненты зависят от наличия провайдера. Используйте его для по-настоящему сквозных значений; в остальных случаях явные пропсы или композиция понятнее.",
    sources: ["react-context-learn"],
  },

  // ---------- Redux Toolkit ----------
  {
    question: "Что не так с этим case reducer?",
    code: `todoAdded(state, action) {
  state.items.push(action.payload);
  return { ...state, count: state.count + 1 };
}`,
    options: [
      "Нельзя одновременно мутировать черновик Immer и возвращать новое значение",
      "`push` запрещён внутри редьюсеров `createSlice`",
      "Case reducer должен быть асинхронной функцией",
    ],
    answer: 0,
    explanation:
      "Либо мутируйте черновик (`state.items.push(...); state.count += 1`), либо возвращайте совершенно новое состояние — если сделать и то и другое, Immer бросит ошибку.",
    sources: ["rtk-immer", "rtk-createSlice"],
  },
  {
    question: "Какие действия отправляет `createAsyncThunk('users/fetch', fn)`?",
    options: [
      "`users/fetch/pending`, затем `users/fetch/fulfilled` или `users/fetch/rejected`",
      "`users/fetch/start` и `users/fetch/end`",
      "Только `users/fetch` с результатом в `payload`",
    ],
    answer: 0,
    explanation:
      "Редьюсеры обрабатывают их в `extraReducers` через `builder.addCase(fetchUsers.fulfilled, ...)`, выставляя флаги загрузки, данные и ошибки. Для кэшируемых серверных данных RTK Query убирает большую часть этого кода.",
    sources: ["rtk-createAsyncThunk"],
  },
  {
    question: "Почему этот селектор перерисовывает компонент при каждом отправленном действии?",
    code: `const done = useSelector((s) => s.todos.filter((t) => t.done));`,
    options: [
      "`filter` каждый раз возвращает новый массив, поэтому ссылка всегда меняется",
      "`useSelector` всегда перерисовывает при любом действии",
      "Селекторы не могут использовать методы массивов",
    ],
    answer: 0,
    explanation:
      "`useSelector` перезапускается после каждого dispatch и сравнивает результаты через `===`. Используйте мемоизированный селектор из `createSelector`: он возвращает тот же массив, пока `s.todos` не изменился.",
    sources: ["rtk-createSelector", "redux-selectors", "react-redux-hooks"],
  },
  {
    question: "Для чего нужен `extraReducers` в `createSlice`?",
    options: [
      "Обрабатывать действия, определённые вне этого слайса (thunk'и, другие слайсы)",
      "Добавлять больше редьюсеров, чем лимит в 10 штук у `reducers`",
      "Регистрировать middleware для слайса",
    ],
    answer: 0,
    explanation:
      "`reducers` создаёт собственные действия слайса, а `extraReducers` реагирует на внешние: `builder.addCase(fetchUser.fulfilled, ...)` или `builder.addCase(logout, () => initialState)`.",
    sources: ["rtk-createSlice", "rtk-createAsyncThunk"],
  },
  {
    question: "Как типизировать `useSelector` и `useDispatch` в TypeScript-проекте?",
    options: [
      "Вывести `RootState`/`AppDispatch` из стора и создать `useAppSelector`/`useAppDispatch`",
      "Описать весь интерфейс состояния вручную и кастовать каждый селектор",
      "Типизировать как `any` — RTK нельзя типизировать",
    ],
    answer: 0,
    explanation:
      "`type RootState = ReturnType<typeof store.getState>`, `type AppDispatch = typeof store.dispatch`, затем `useSelector.withTypes<RootState>()`. Типы автоматически следуют за редьюсерами.",
    sources: ["redux-typescript"],
  },
  {
    question: "Что даёт нормализованное состояние (`{ ids, entities }`)?",
    options: [
      "Каждый элемент хранится один раз по id, поэтому обновления и поиск простые и согласованные",
      "Меньший размер бандла благодаря сжатию",
      "Автоматическую синхронизацию с сервером",
    ],
    answer: 0,
    explanation:
      "Вложенные дублирующиеся данные рассинхронизируются (один и тот же пользователь в списке и в комментариях). `createEntityAdapter` даёт нормализованное состояние плюс `addOne`, `upsertMany`, `removeOne` и селекторы `selectAll`/`selectById`.",
    sources: ["redux-normalizing", "rtk-createEntityAdapter"],
  },
  {
    question: "Что проверяет `configureStore` в режиме разработки?",
    options: [
      "Случайные мутации состояния и несериализуемые значения в состоянии и действиях",
      "Что у каждого редьюсера есть юнит-тесты",
      "Что действия отправляются не чаще раза за кадр",
    ],
    answer: 0,
    explanation:
      "Middleware для проверки иммутабельности и сериализуемости рано ловят ошибки: мутацию вне Immer или `Date`/экземпляр класса/промис в сторе. В продакшен-сборке они отключены.",
    sources: ["rtk-configureStore", "redux-style-guide"],
  },
  {
    question: "Стоит ли хранить состояние полей формы (каждое нажатие клавиши) в Redux?",
    options: [
      "Обычно нет: держите его локально и отправляйте результат при сабмите",
      "Да, всё состояние должно быть в сторе, чтобы быть предсказуемым",
      "Да, иначе форма не будет работать с DevTools",
    ],
    answer: 0,
    explanation:
      "Style guide Redux советует решать для каждой части состояния отдельно. Эфемерное UI-состояние (ввод текста, hover, открытый выпадающий список) локально; в сторе — данные, общие для приложения или которые должны пережить навигацию.",
    sources: ["redux-style-guide"],
  },

  // ---------- Zustand ----------
  {
    question: "Почему этот компонент перерисовывается при любом изменении стора?",
    code: `const { count, inc } = useStore();`,
    options: [
      "Без селектора он подписан на весь стор",
      "Деструктуризация запрещена для хуков Zustand",
      "Действия в сторе пересоздаются при каждом обновлении",
    ],
    answer: 0,
    explanation:
      "`useStore()` возвращает весь объект состояния, поэтому любое изменение перерисует компонент. Выбирайте нужное: `useStore((s) => s.count)` и `useStore((s) => s.inc)`.",
    sources: ["zustand-use-shallow", "zustand-intro"],
  },
  {
    question: "Почему селектор, возвращающий новый объект, вызывает лишние ререндеры (или бесконечный цикл в v5)?",
    code: `const { a, b } = useStore((s) => ({ a: s.a, b: s.b }));`,
    options: [
      "Каждый раз создаётся новый объект; оберните селектор в `useShallow`",
      "Zustand запрещает выбирать больше одного поля",
      "Объекты можно выбирать только через `getState()`",
    ],
    answer: 0,
    explanation:
      "Zustand сравнивает результаты селектора через `Object.is`. `useShallow((s) => ({ a: s.a, b: s.b }))` сравнивает поля поверхностно и сохраняет ту же ссылку, если они равны.",
    sources: ["zustand-use-shallow"],
  },
  {
    question: "Как прочитать или обновить стор Zustand вне React-компонентов (например, в API-хелпере)?",
    options: [
      "Через `useStore.getState()` и `useStore.setState()`",
      "Никак — стор доступен только внутри хуков",
      "Через `useContext(useStore)`",
    ],
    answer: 0,
    explanation:
      "Хук, который возвращает `create`, несёт и API «ванильного» стора: `getState`, `setState`, `subscribe`. Удобно для интерсепторов, вебсокетов и тестов.",
    sources: ["zustand-intro", "zustand-updating-state"],
  },
  {
    question: "Как `set` в Zustand обрабатывает вложенные объекты?",
    code: `set({ user: { name: "Ann" } }); // state was { user: { name, email }, theme }`,
    options: [
      "Объединяет только на один уровень: `theme` останется, а `user.email` потеряется",
      "Глубоко объединяет всё, поэтому `user.email` останется",
      "Заменяет всё состояние, теряя `theme`",
    ],
    answer: 0,
    explanation:
      "`set` делает поверхностное объединение верхнего уровня. Для вложенных обновлений явно используйте spread: `set((s) => ({ user: { ...s.user, name: 'Ann' } }))` или middleware `immer`.",
    sources: ["zustand-updating-state"],
  },
  {
    question: "Как обычно организуют большой стор Zustand?",
    options: [
      "Делят на слайсы — функции, создающие части состояния, которые объединяются в одном `create`",
      "Как десятки независимых сторов, которые импортируют друг друга",
      "Как один огромный литерал объекта в одном файле",
    ],
    answer: 0,
    explanation:
      "Паттерн слайсов: `createBearSlice`, `createFishSlice` получают `set`/`get` и возвращают свою часть; `create((...a) => ({ ...createBearSlice(...a), ...createFishSlice(...a) }))`. Отдельные сторы по доменам — тоже нормальный вариант.",
    sources: ["zustand-slices"],
  },
  {
    question: "Почему стор с `persist` может вызвать hydration mismatch в SSR-приложениях?",
    options: [
      "Сервер рендерит значения по умолчанию, а клиент восстанавливает другие из хранилища",
      "`persist` отправляет состояние на сервер при каждом запросе",
      "`localStorage` читается на сервере и блокирует рендер",
    ],
    answer: 0,
    explanation:
      "На сервере нет `localStorage`, поэтому его HTML использует начальные значения. Дождитесь гидрации (`persist.hasHydrated()`/`onFinishHydration`), прежде чем показывать сохранённые значения, или рендерите их только на клиенте.",
    sources: ["zustand-persist", "zustand-nextjs"],
  },

  // ---------- TanStack Query ----------
  {
    question: "Чем `staleTime` отличается от `gcTime`?",
    options: [
      "`staleTime` — сколько данные считаются свежими; `gcTime` — сколько неиспользуемые данные живут в памяти",
      "Это синонимы; `gcTime` — новое имя в v5",
      "`staleTime` — таймаут запроса; `gcTime` — задержка повтора",
    ],
    answer: 0,
    explanation:
      "Свежие данные не перезапрашиваются при монтировании и фокусе. Устаревшие всё ещё показываются из кэша и обновляются в фоне. `gcTime` (раньше `cacheTime`, по умолчанию 5 минут) начинает отсчёт, когда у запроса не осталось наблюдателей.",
    sources: ["tq-important-defaults", "tq-caching"],
  },
  {
    question: "Чем `isPending` отличается от `isFetching`?",
    options: [
      "`isPending` — данных ещё нет; `isFetching` — идёт любой запрос, включая фоновый",
      "Это один и тот же флаг под разными именами",
      "`isPending` — только для мутаций, `isFetching` — только для запросов",
    ],
    answer: 0,
    explanation:
      "При `isPending` показывайте скелетон, а при `isFetching` со старыми данными на экране — небольшой индикатор. В v4 первый назывался `isLoading`.",
    sources: ["tq-queries"],
  },
  {
    question: "Как обновить список после того, как `useMutation` создал элемент?",
    options: [
      "Вызвать `queryClient.invalidateQueries({ queryKey: ['todos'] })` в `onSuccess`",
      "Снова вызвать `useQuery` внутри `onSuccess`",
      "Перезагрузить страницу через `location.reload()`",
    ],
    answer: 0,
    explanation:
      "Инвалидация помечает подходящие запросы устаревшими и перезапрашивает активные. Альтернатива — записать возвращённый объект в кэш через `setQueryData`. Хуки нельзя вызывать внутри колбэков.",
    sources: ["tq-mutations", "tq-invalidation"],
  },
  {
    question: "Какие запросы затрагивает `invalidateQueries({ queryKey: ['todos'] })`?",
    options: [
      "Все запросы, ключ которых начинается с `['todos']`",
      "Только запрос с ключом ровно `['todos']`",
      "Все запросы в кэше",
    ],
    answer: 0,
    explanation:
      "Совпадение по префиксу делает полезными иерархические ключи: `['todos']` → `['todos', 'list', filters]` → `['todos', 'detail', id]`. Для точного совпадения — `exact: true`.",
    sources: ["tq-invalidation", "tq-query-keys"],
  },
  {
    question: "Как запустить запрос только после того, как другой вернул `user.id`?",
    options: [
      "Передать `enabled: !!user?.id` в зависимый запрос",
      "Вызвать второй `useQuery` внутри `if (user)`",
      "Вызвать `refetch()` второго запроса в `useEffect`",
    ],
    answer: 0,
    explanation:
      "Пока `enabled` равен false, запрос не выполняется. Условный вызов хуков нарушает правила хуков. `user.id` также должен быть частью ключа зависимого запроса.",
    sources: ["tq-dependent", "react-rules-of-hooks"],
  },
  {
    question: "Как при пагинации показывать предыдущую страницу, пока грузится следующая?",
    options: [
      "`placeholderData: keepPreviousData`",
      "`staleTime: Infinity`",
      "`refetchOnMount: false`",
    ],
    answer: 0,
    explanation:
      "Новый ключ (`['projects', page]`) начинается с пустого кэша. `placeholderData` тем временем показывает предыдущие данные, а `isPlaceholderData` позволяет заблокировать кнопку «Дальше».",
    sources: ["tq-paginated"],
  },
  {
    question: "Что TanStack Query делает с упавшим запросом по умолчанию?",
    options: [
      "Повторяет 3 раза с экспоненциальной задержкой, прежде чем показать ошибку",
      "Сразу показывает ошибку",
      "Повторяет бесконечно, пока не получится",
    ],
    answer: 0,
    explanation:
      "`retry: 3` с растущим `retryDelay`. Мутации по умолчанию не повторяются. Можно не повторять 4xx: `retry: (count, err) => err.status >= 500 && count < 3`.",
    sources: ["tq-important-defaults"],
  },
  {
    question: "Почему каждая переменная, которую использует `queryFn`, должна входить в `queryKey`?",
    options: [
      "Иначе разные данные кэшируются под одним ключом и не перезапрашиваются при смене переменной",
      "Потому что `queryFn` не имеет доступа к переменным компонента",
      "Потому что в ключе должно быть минимум три элемента",
    ],
    answer: 0,
    explanation:
      "Ключ — это идентичность кэша, как зависимости эффекта. `useQuery({ queryKey: ['todos'], queryFn: () => fetchTodos(filter) })` покажет результаты старого фильтра. ESLint-плагин с правилом `exhaustive-deps` для запросов ловит это.",
    sources: ["tq-query-keys"],
  },

  // ---------- RTK Query ----------
  {
    question: "Как заставить мутацию RTK Query перезапросить список постов?",
    code: `getPosts: build.query({ query: () => "posts", providesTags: ["Post"] }),
addPost: build.mutation({ query: (body) => ({ url: "posts", method: "POST", body }) }),`,
    options: [
      "Добавить `invalidatesTags: ['Post']` в `addPost`",
      "Вызвать `getPosts()` внутри `query` мутации",
      "Добавить `refetchOnMutation: true` в `getPosts`",
    ],
    answer: 0,
    explanation:
      "Теги связывают кэш с мутациями. Для более точного контроля помечайте элементы по id (`{ type: 'Post', id }`) плюс тег `'LIST'` — тогда правка одного поста перезапросит только затронутое.",
    sources: ["rtk-query-invalidation", "rtk-query-mutations"],
  },
  {
    question: "Когда RTK Query удаляет неиспользуемые данные из кэша?",
    options: [
      "Через `keepUnusedDataFor` секунд (по умолчанию 60) без подписчиков",
      "Сразу после размонтирования последнего компонента",
      "Никогда — данные живут до перезагрузки страницы",
    ],
    answer: 0,
    explanation:
      "RTK Query считает подписки хуков на каждый эндпоинт и аргумент. Если за это время кто-то снова подпишется, данные придут из кэша. Аналог в TanStack Query — `gcTime`.",
    sources: ["rtk-query-cache-behavior"],
  },
  {
    question: "Как пропустить запрос RTK Query, пока аргумент недоступен?",
    options: [
      "Передать `skip: !id` или `skipToken` вместо аргумента",
      "Обернуть вызов хука в `if (id)`",
      "Вернуть `null` из функции `query` эндпоинта",
    ],
    answer: 0,
    explanation:
      "`useGetUserQuery(id ?? skipToken)` оставляет вызов хука безусловным, но не даёт запросу уйти. Это аналог `enabled: false` в TanStack Query.",
    sources: ["rtk-query-queries", "react-rules-of-hooks"],
  },
  {
    question: "Как RTK Query избегает дублирующих запросов, когда 3 компонента вызывают `useGetUserQuery(1)`?",
    options: [
      "Запросы с тем же эндпоинтом и аргументом объединяются в один",
      "Отправляет три запроса и берёт самый быстрый ответ",
      "Данные получает только первый компонент, остальные — `undefined`",
    ],
    answer: 0,
    explanation:
      "Ключ кэша — эндпоинт + сериализованный аргумент. Все подписчики делят один запрос и одну запись в кэше, которая живёт, пока смонтирован хотя бы один из них.",
    sources: ["rtk-query-cache-behavior", "rtk-query-overview"],
  },
  {
    question: "Что делает опция `refetchOnMountOrArgChange` в RTK Query?",
    options: [
      "Принудительно перезапрашивает при монтировании компонента или смене аргумента, даже если данные в кэше",
      "Полностью отключает кэширование для эндпоинта",
      "Перезапрашивает данные каждую секунду",
    ],
    answer: 0,
    explanation:
      "По умолчанию RTK Query отдаёт новым подписчикам данные из кэша. `refetchOnMountOrArgChange: true` (или число секунд) перезапрашивает, если данные старше этого. Связанные опции: `refetchOnFocus`, `refetchOnReconnect`, `pollingInterval`.",
    sources: ["rtk-query-cache-behavior"],
  },

  // ---------- SWR ----------
  {
    question: "Когда SWR по умолчанию автоматически перепроверяет данные?",
    options: [
      "При монтировании, фокусе окна и восстановлении сети",
      "Только когда пользователь нажимает кнопку обновления",
      "Каждые 5 секунд независимо от активности",
    ],
    answer: 0,
    explanation:
      "Каждый триггер можно отключить (`revalidateOnFocus: false`, `revalidateOnReconnect: false`), а опрос включается через `refreshInterval`. Для неизменяемых данных есть `useSWRImmutable`.",
    sources: ["swr-revalidation"],
  },
  {
    question: "Как загружать данные в SWR только при выполнении условия?",
    code: `const { data } = useSWR(userId ? \`/api/user/\${userId}\` : null, fetcher);`,
    options: [
      "Передать `null` (или ложный ключ) — SWR не сделает запрос",
      "Обернуть `useSWR` в оператор `if`",
      "Передать `enabled: false` в опциях",
    ],
    answer: 0,
    explanation:
      "Ключ `null` означает «не загружать». Ключ может быть и функцией, которая бросает ошибку или возвращает ложное значение, пока зависимость отсутствует, — так строят зависимые запросы.",
    sources: ["swr-conditional"],
  },
  {
    question: "Что делает `mutate(key)` из `useSWRConfig`?",
    options: [
      "Перепроверяет (и при желании обновляет) кэш для этого ключа во всех компонентах",
      "Удаляет ключ на сервере",
      "Меняет функцию fetcher для этого ключа",
    ],
    answer: 0,
    explanation:
      "После POST вызывают `mutate('/api/todos')`, чтобы каждый компонент с этим ключом перезапросил данные. Можно передать и новые данные для мгновенного обновления кэша, а привязанный `mutate` из `useSWR` обновляет свой ключ.",
    sources: ["swr-mutation"],
  },
  {
    question: "Почему два компонента с одним ключом SWR делают только один запрос?",
    options: [
      "SWR дедуплицирует запросы с одним ключом в пределах `dedupingInterval`",
      "Второй компонент ждёт, пока первый размонтируется",
      "SWR кэширует ответы в `localStorage` между компонентами",
    ],
    answer: 0,
    explanation:
      "В пределах интервала дедупликации (по умолчанию 2 секунды) параллельные запросы по одному ключу объединяются, и оба компонента делят закэшированные данные. Поэтому `useUser()` можно свободно вызывать во многих компонентах.",
    sources: ["swr-performance"],
  },
  {
    question: "Как задать `fetcher` и опции по умолчанию для всех хуков SWR?",
    options: [
      "Обернуть приложение в `<SWRConfig value={{ fetcher, ... }}>`",
      "Вызвать `useSWR.defaults = { fetcher }` при старте",
      "Передавать fetcher в каждый хук — глобальные опции не поддерживаются",
    ],
    answer: 0,
    explanation:
      "`SWRConfig` задаёт глобальные опции (fetcher, `revalidateOnFocus`, обработчики ошибок) и может вкладываться, чтобы переопределить их для поддерева. Через него же можно передать начальные данные `fallback` из SSR.",
    sources: ["swr-global-config"],
  },

  // ---------- React Router loader / action ----------
  {
    question: "Как компонент читает данные, которые вернул `loader` его маршрута?",
    options: [
      "Через `useLoaderData()` (или проп `loaderData` в framework mode)",
      "Через `useState`, инициализированный из `window.loaderResult`",
      "Через `useEffect`, который снова вызывает loader",
    ],
    answer: 0,
    explanation:
      "Роутер выполняет loader до рендера маршрута и передаёт результат. С генерацией типов в framework mode `loaderData` полностью типизирован.",
    sources: ["rr-data-loading"],
  },
  {
    question: "Что происходит после завершения `action` в React Router?",
    options: [
      "Роутер перепроверяет loader'ы страницы, и UI показывает свежие данные",
      "Вся страница перезагружается с сервера",
      "Ничего — данные нужно перезапросить вручную",
    ],
    answer: 0,
    explanation:
      "Автоматическая перепроверка после мутаций — ключевая идея: URL и loader'ы — источник истины для серверных данных, поэтому код синхронизации клиентского кэша не нужен.",
    sources: ["rr-actions", "rr-state-management"],
  },
  {
    question: "Как показать состояние ожидания при навигации или отправке формы в React Router?",
    options: [
      "Читать `useNavigation().state` (`idle` / `loading` / `submitting`)",
      "Хранить флаг `isLoading` в глобальном сторе",
      "Проверять `document.readyState`",
    ],
    answer: 0,
    explanation:
      "`navigation.state !== 'idle'` означает, что роутер загружает страницу или отправляет форму, а в `navigation.formData` — отправленные данные. Этого хватает для спиннеров и блокировки кнопок.",
    sources: ["rr-useNavigation", "rr-pending-ui"],
  },
  {
    question: "Когда стоит использовать `useFetcher` вместо `<Form>`?",
    options: [
      "Чтобы вызвать loader/action без навигации, например кнопку «лайк» в списке",
      "Чтобы отправить форму, которая должна перейти на новую страницу",
      "Чтобы загрузить данные стороннего API в `useEffect`",
    ],
    answer: 0,
    explanation:
      "У fetcher своё состояние (`fetcher.state`, `fetcher.data`), и он не меняет URL, поэтому на одной странице может идти много независимых мутаций (список задач, редактирование на месте).",
    sources: ["rr-useFetcher"],
  },
  {
    question: "Как перенаправить из `action` после создания элемента?",
    options: [
      "Вернуть (или бросить) `redirect('/items/' + id)` из action",
      "Вызвать `window.location.href = ...` внутри action",
      "Вызвать `useNavigate()` внутри action",
    ],
    answer: 0,
    explanation:
      "Loader'ы и action'ы выполняются вне компонентов, поэтому хуки там недоступны. `redirect` создаёт ответ, которому следует роутер. Хуки вроде `useNavigate` работают только в компонентах.",
    sources: ["rr-actions"],
  },

  // ---------- Выбор решения ----------
  {
    question: "Серверные данные лежат в TanStack Query. Что обычно остаётся для глобального клиентского стора?",
    options: [
      "Немного UI-состояния: тема, открытые панели, шаги мастера — часто хватает Context или Zustand",
      "Ничего — TanStack Query заменяет и всё UI-состояние",
      "Полная копия серверных данных, чтобы избежать перезапросов",
    ],
    answer: 0,
    explanation:
      "Когда серверный кэш переезжает в специализированный инструмент, оставшееся клиентское состояние часто невелико. Копирование серверных данных в Redux/Zustand возвращает проблемы синхронизации, которые решает библиотека запросов.",
    sources: ["tq-client-state", "tkdodo-practical-rq"],
  },
  {
    question: "Как RTK Query соотносится с TanStack Query?",
    options: [
      "Похожие цели; RTK Query живёт в Redux-сторе и подходит приложениям, уже использующим Redux",
      "RTK Query работает только с GraphQL, TanStack Query — только с REST",
      "TanStack Query требует Redux для хранения кэша",
    ],
    answer: 0,
    explanation:
      "Оба кэшируют серверные данные с дедупликацией, инвалидацией и оптимистичными обновлениями. RTK Query использует теги, его кэш виден в Redux DevTools и интегрирован со слайсами; у TanStack Query отдельный кэш, ключи запросов и широкий набор возможностей (бесконечные запросы, suspense).",
    sources: ["rtk-query-overview", "tq-overview"],
  },
];

export default questions;
