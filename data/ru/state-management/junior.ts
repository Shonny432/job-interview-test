import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  // ---------- useState ----------
  {
    question: "Что такое «состояние» (state) в React-компоненте?",
    options: [
      "Данные, которые меняются со временем и влияют на экран; изменение вызывает ререндер",
      "Любая переменная, объявленная внутри функции компонента",
      "Пропсы, которые родитель передаёт компоненту",
    ],
    answer: 0,
    explanation:
      "Состояние — это память компонента между рендерами: значение счётчика, текст в поле, открыто ли меню. Обычная переменная `let` сбрасывается при каждом рендере, и её изменение не просит React обновить UI. Пропсы — входные данные только для чтения, ими владеет родитель.",
    sources: ["react-state-memory", "react-useState"],
  },
  {
    question: "Почему счётчик на экране не меняется?",
    code: `function Counter() {
  let count = 0;
  return <button onClick={() => count++}>{count}</button>;
}`,
    options: [
      "Локальная переменная не сохраняется между рендерами, а её изменение не вызывает рендер",
      "Обработчики `onClick` не могут менять переменные, объявленные в компоненте",
      "Кнопке нужен `type=\"button\"`, чтобы клик обновил текст",
    ],
    answer: 0,
    explanation:
      "`count` при каждом рендере заново равна `0`, а её увеличение не просит React перерисовать компонент. Нужно `const [count, setCount] = useState(0)` и `setCount(count + 1)`.",
    sources: ["react-state-memory", "react-useState"],
  },
  {
    question: "Когда нужна функциональная форма `setCount(c => c + 1)` вместо `setCount(count + 1)`?",
    options: [
      "Когда новое значение зависит от предыдущего, особенно при нескольких обновлениях подряд",
      "Только в классовых компонентах; функциональные её не поддерживают",
      "Когда в состоянии строка, а не число",
    ],
    answer: 0,
    explanation:
      "`count` — снимок текущего рендера. Три вызова `setCount(count + 1)` в одном обработчике дают +1, а три `setCount(c => c + 1)` — +3: каждый апдейтер получает результат предыдущего. Это же защищает от устаревших замыканий в таймерах и эффектах.",
    sources: ["react-queueing-updates", "react-state-snapshot"],
  },
  {
    question: "Как правильно обновить одно поле объекта в состоянии?",
    code: `const [form, setForm] = useState({ name: "", email: "" });`,
    options: [
      "`setForm({ ...form, email: value })`",
      "`form.email = value; setForm(form)`",
      "`setForm({ email: value })` — React сам объединит объекты",
    ],
    answer: 0,
    explanation:
      "В отличие от `this.setState` в классах, сеттер `useState` заменяет значение целиком — `setForm({ email })` потеряет `name`. Мутация и передача того же объекта пропускается: React сравнивает по ссылке (`Object.is`).",
    sources: ["react-updating-objects", "react-useState"],
  },
  {
    question: "Как удалить элемент с `id` из массива в состоянии?",
    options: [
      "`setItems(items.filter(i => i.id !== id))`",
      "`items.splice(index, 1); setItems(items)`",
      "`delete items[index]; setItems(items)`",
    ],
    answer: 0,
    explanation:
      "Состояние обновляют иммутабельно: `filter`, `map`, spread и `toSorted` создают новый массив. `splice` и `delete` мутируют существующий, ссылка не меняется, и React пропускает обновление.",
    sources: ["react-updating-arrays"],
  },
  {
    question: "Зачем передавать функцию в `useState(() => createInitialTodos())`?",
    options: [
      "Чтобы дорогое вычисление выполнилось только на первом рендере",
      "Чтобы состояние стало доступным только для чтения после инициализации",
      "Чтобы начальное значение загрузилось асинхронно с сервера",
    ],
    answer: 0,
    explanation:
      "`useState(createInitialTodos())` вызывает функцию на каждом рендере, хотя результат нужен один раз. Ленивый инициализатор `useState(createInitialTodos)` вызывается только при монтировании. Он должен быть синхронным и чистым.",
    sources: ["react-useState"],
  },
  {
    question: "Нужно ли хранить `fullName` в состоянии, если уже есть `firstName` и `lastName`?",
    options: [
      "Нет — вычислить во время рендера: `const fullName = firstName + ' ' + lastName`",
      "Да — и синхронизировать через `useEffect` при каждом изменении",
      "Да — иначе React не сможет отобразить вычисленное значение",
    ],
    answer: 0,
    explanation:
      "Избыточное состояние ведёт к рассинхронизации и лишним рендерам. Всё, что выводится из пропсов и имеющегося состояния, считают во время рендера. Если вычисление дорогое — оборачивают в `useMemo`.",
    sources: ["react-choosing-state", "react-no-effect"],
  },
  {
    question: "Что такое «локальное» состояние компонента и когда его достаточно?",
    options: [
      "Состояние одного компонента или небольшого поддерева — хватает `useState`",
      "Состояние в `localStorage`, переживающее перезагрузку",
      "Состояние, которое могут хранить только серверные компоненты",
    ],
    answer: 0,
    explanation:
      "Большая часть UI-состояния локальна: открыт ли выпадающий список, текст поля, активная вкладка. Держите состояние как можно ближе к месту использования и поднимайте его или переносите в стор, только когда оно нужно нескольким удалённым компонентам.",
    sources: ["react-sharing-state", "react-choosing-state"],
  },

  // ---------- useReducer ----------
  {
    question: "Что возвращает `useReducer`?",
    code: `const [state, dispatch] = useReducer(reducer, initialState);`,
    options: [
      "Текущее состояние и функцию `dispatch` для отправки действий",
      "Функцию-редьюсер и копию начального состояния",
      "Промис, который разрешается новым состоянием",
    ],
    answer: 0,
    explanation:
      "Вы вызываете `dispatch({ type: 'added', text })`, React вызывает `reducer(state, action)` и использует результат как следующее состояние. `dispatch` стабилен между рендерами, его безопасно передавать вниз и указывать в зависимостях эффектов.",
    sources: ["react-useReducer", "react-reducer"],
  },
  {
    question: "Какой должна быть функция-редьюсер?",
    options: [
      "Чистой: `(state, action) => newState` без побочных эффектов и мутаций",
      "Асинхронной: может делать запросы и возвращать промис состояния",
      "Мутирующей: меняет `state` напрямую и ничего не возвращает",
    ],
    answer: 0,
    explanation:
      "React может вызвать редьюсер больше одного раза (например, в Strict Mode), поэтому в нём нельзя делать запросы, ставить таймеры и мутировать состояние. Побочные эффекты — в обработчиках событий или эффектах.",
    sources: ["react-reducer", "react-pure"],
  },
  {
    question: "Когда `useReducer` обычно удобнее нескольких `useState`?",
    options: [
      "Когда у состояния много связанных полей, а логика обновлений размазана по обработчикам",
      "Всегда, когда состояние — один булев флаг",
      "Только когда состояние должно быть глобальным для всего приложения",
    ],
    answer: 0,
    explanation:
      "Редьюсер собирает все переходы в одном месте — их легко читать и тестировать, а обработчики лишь описывают, что произошло. Для одного переключателя проще `useState`. Сам по себе `useReducer` не делает состояние глобальным.",
    sources: ["react-reducer", "react-useReducer"],
  },
  {
    question: "Что обычно делает редьюсер для неизвестного `type` действия?",
    options: [
      "Бросает ошибку (или возвращает текущее состояние), чтобы опечатка не прошла незаметно",
      "Возвращает `undefined`, что сбрасывает состояние",
      "Возвращает пустой объект `{}`",
    ],
    answer: 0,
    explanation:
      "Возврат `undefined` сломает состояние. В документации React в `default` бросают ошибку, чтобы опечатки в типах действий проявлялись сразу; в TypeScript дискриминированное объединение действий плюс проверка через `never` ловят их на этапе компиляции.",
    sources: ["react-reducer"],
  },
  {
    question: "Почему действия называют по тому, что произошло (`'task_added'`), а не что сделать (`'set_tasks'`)?",
    options: [
      "Обработчики остаются простыми, а логика изменения состояния живёт в редьюсере",
      "React требует, чтобы типы действий были в прошедшем времени",
      "Так редьюсер работает быстрее",
    ],
    answer: 0,
    explanation:
      "Действие описывает событие пользователя («задача добавлена»), а редьюсер решает, как на него реагирует состояние. Действия `set_*` возвращают логику в компоненты и превращают редьюсер в простой сеттер. Та же конвенция принята в Redux.",
    sources: ["react-reducer", "redux-style-guide"],
  },

  // ---------- Prop drilling ----------
  {
    question: "Что такое prop drilling?",
    options: [
      "Передача пропсов через промежуточные компоненты, которые их не используют",
      "Проверка пропсов в рантайме через PropTypes",
      "Копирование пропсов в локальное состояние через `useEffect`",
    ],
    answer: 0,
    explanation:
      "Если у `App` есть `user`, а нужен он глубоко вложенному `Avatar`, каждый компонент между ними должен принять и передать `user` дальше. Это многословно и связывает промежуточные компоненты с данными, которые им безразличны.",
    sources: ["react-context-learn", "react-sharing-state"],
  },
  {
    question: "Что такое «подъём состояния» (lifting state up)?",
    options: [
      "Перенос состояния в ближайшего общего родителя, чтобы соседи делили его через пропсы",
      "Перенос всего состояния в один глобальный стор наверху приложения",
      "Хранение состояния в `window`, чтобы его мог читать любой компонент",
    ],
    answer: 0,
    explanation:
      "Двум компонентам, которые должны оставаться синхронными, не стоит держать каждому свою копию. Состоянием владеет родитель и передаёт вниз значение и колбэк. Это первый инструмент — до Context и сторов.",
    sources: ["react-sharing-state"],
  },
  {
    question: "Какой приём часто решает prop drilling без Context?",
    options: [
      "Композиция: передавать готовые элементы через `children` или другие пропсы",
      "Обернуть каждый промежуточный компонент в `React.memo`",
      "Перенести данные в `useRef` в корне приложения",
    ],
    answer: 0,
    explanation:
      "`<Layout sidebar={<UserMenu user={user} />}>` — `Layout` не нужно знать о `user`, он просто рендерит переданный элемент. Документация React советует сначала попробовать композицию: Context усложняет переиспользование компонентов.",
    sources: ["react-context-learn", "react-props"],
  },
  {
    question: "Является ли передача пропсов на 2–3 уровня проблемой сама по себе?",
    options: [
      "Обычно нет: явные пропсы делают поток данных легко отслеживаемым",
      "Да: любой проп, переданный глубже одного уровня, нужно переносить в Context",
      "Да: React выводит предупреждение о пропсах, проходящих через несколько уровней",
    ],
    answer: 0,
    explanation:
      "Явные пропсы понятны и легко рефакторятся. Prop drilling становится болью, когда данные идут через много слоёв или нужны многим компонентам — тогда уместны композиция, Context или стор.",
    sources: ["react-context-learn"],
  },

  // ---------- Context API + useContext ----------
  {
    question: "Какую задачу решает Context API?",
    options: [
      "Передать значение глубоко в дерево, не прокидывая его через каждый уровень",
      "Хранить серверные данные с кэшированием и перезапросами",
      "Ускорить рендер, пропуская неизменённые компоненты",
    ],
    answer: 0,
    explanation:
      "Context делает значение (тему, текущего пользователя, язык) доступным любому потомку. Это транспорт для значений, а не стейт-менеджер: само состояние по-прежнему живёт в `useState`/`useReducer` компонента-провайдера.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "Какие шаги нужны, чтобы использовать Context?",
    options: [
      "`createContext` → обернуть дерево провайдером с `value` → читать через `useContext`",
      "`useContext` в корне → `createContext` в каждом потомке → передать `value` пропсом",
      "Объявить глобальную переменную и импортировать её в каждый компонент",
    ],
    answer: 0,
    explanation:
      "`const ThemeContext = createContext('light')`; в React 19 можно рендерить `<ThemeContext value={theme}>` напрямую (раньше — `<ThemeContext.Provider>`); любой потомок вызывает `useContext(ThemeContext)`.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "Что вернёт `useContext(ThemeContext)`, если выше нет провайдера?",
    options: [
      "Значение по умолчанию из `createContext(defaultValue)`",
      "`undefined` независимо от значения по умолчанию",
      "Сразу бросит ошибку",
    ],
    answer: 0,
    explanation:
      "Значение по умолчанию используется, когда провайдер выше по дереву не найден. Частый приём — `createContext(null)` и свой хук `useAuth()`, который бросает понятную ошибку, если провайдера нет.",
    sources: ["react-useContext"],
  },
  {
    question: "Какие компоненты перерисуются при изменении `value` провайдера?",
    options: [
      "Все компоненты, которые читают этот контекст через `useContext`",
      "Только сам провайдер",
      "Только компоненты, получающие значение через пропсы",
    ],
    answer: 0,
    explanation:
      "Перерисовываются все потребители контекста, даже если используют одно поле большого объекта. Поэтому Context отлично подходит для редко меняющихся значений и хуже — для часто меняющегося состояния.",
    sources: ["react-useContext"],
  },
  {
    question: "Какие данные хорошо подходят для Context?",
    options: [
      "Редко меняющиеся и нужные многим: тема, язык, текущий пользователь",
      "Значение текстового поля, которое меняется при каждом нажатии клавиши",
      "Список из 10 000 элементов, обновляемый каждую секунду",
    ],
    answer: 0,
    explanation:
      "Context хорош для общих настроек приложения и зависимостей (например, API-клиента). Быстро меняющиеся значения в широко используемом контексте вызывают много ререндеров; такое состояние держат локально или в сторе с селекторами.",
    sources: ["react-context-learn"],
  },
  {
    question: "Зачем оборачивать `useContext` в свой хук вроде `useAuth()`?",
    code: `export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}`,
    options: [
      "Чтобы скрыть объект контекста и явно падать, если провайдера нет",
      "Потому что `useContext` нельзя вызывать прямо в компонентах",
      "Чтобы сделать значение контекста неизменяемым",
    ],
    answer: 0,
    explanation:
      "Потребители импортируют один хук вместо объекта контекста, TypeScript получает тип без null, а забытый провайдер даёт читаемую ошибку вместо `undefined` где-то глубоко в коде.",
    sources: ["react-useContext", "react-custom-hooks"],
  },
  {
    question: "Может ли компонент использовать несколько контекстов сразу?",
    options: [
      "Да: вызвать `useContext` для каждого",
      "Нет: только один контекст на компонент",
      "Только если объединить контексты в один через `mergeContexts`",
    ],
    answer: 0,
    explanation:
      "`const theme = useContext(ThemeContext); const user = useContext(UserContext);` — это нормально. Разделение несвязанных значений по разным контекстам ещё и уменьшает лишние ререндеры.",
    sources: ["react-useContext"],
  },

  // ---------- Redux Toolkit ----------
  {
    question: "Что такое Redux Toolkit (RTK)?",
    options: [
      "Официальный рекомендуемый способ писать Redux-код с меньшим количеством шаблонного кода",
      "Отдельный стейт-менеджер, который заменяет Redux и несовместим с ним",
      "Расширение браузера для отладки React-компонентов",
    ],
    answer: 0,
    explanation:
      "RTK объединяет `configureStore`, `createSlice`, `createAsyncThunk`, Immer и RTK Query. Команда Redux рекомендует его для всего нового Redux-кода; ручные константы типов и switch-редьюсеры считаются устаревшими.",
    sources: ["redux-why-rtk", "redux-essentials"],
  },
  {
    question: "Что генерирует `createSlice`?",
    options: [
      "Редьюсер и action creators для каждого case reducer",
      "React-компонент, который отображает состояние слайса",
      "Стор с DevTools и middleware",
    ],
    answer: 0,
    explanation:
      "`createSlice({ name: 'todos', initialState, reducers: { added(state, action) {...} } })` возвращает `slice.reducer` и `slice.actions.added` с типом `'todos/added'`.",
    sources: ["rtk-createSlice"],
  },
  {
    question: "Почему внутри редьюсеров `createSlice` можно «мутировать» `state`?",
    code: `added(state, action) {
  state.items.push(action.payload);
}`,
    options: [
      "Immer под капотом превращает эти изменения в иммутабельное обновление",
      "Redux Toolkit отменил требование иммутабельности",
      "`push` особым образом обрабатывается RTK, а остальные мутации запрещены",
    ],
    answer: 0,
    explanation:
      "`state` — черновик Immer: вы пишете мутирующий код, а Immer создаёт новый объект со structural sharing. За пределами `createSlice`/`createReducer` мутации по-прежнему ошибка.",
    sources: ["rtk-immer", "rtk-createSlice"],
  },
  {
    question: "Что делает `configureStore`?",
    options: [
      "Создаёт стор с объединёнными редьюсерами, thunk-middleware и DevTools",
      "Подключает стор к React-компонентам без `<Provider>`",
      "Генерирует слайсы из JSON-схемы",
    ],
    answer: 0,
    explanation:
      "`configureStore({ reducer: { todos: todosReducer } })` объединяет редьюсеры, добавляет `redux-thunk`, подключает Redux DevTools и в режиме разработки проверяет случайные мутации и несериализуемые значения.",
    sources: ["rtk-configureStore"],
  },
  {
    question: "Как подключить Redux-стор к React-приложению?",
    options: [
      "Обернуть приложение в `<Provider store={store}>` из `react-redux`",
      "Импортировать стор в каждый компонент, которому он нужен",
      "Передать стор в `createRoot(el, { store })`",
    ],
    answer: 0,
    explanation:
      "`Provider` делает стор доступным для `useSelector` и `useDispatch` везде ниже. Context он использует только для передачи ссылки на стор; подписки работают отдельно и точечно.",
    sources: ["react-redux-hooks", "redux-essentials"],
  },
  {
    question: "Для чего нужны `useSelector` и `useDispatch`?",
    options: [
      "Читать данные из стора и получать функцию `dispatch`",
      "Выбрать DOM-элемент и отправить DOM-событие",
      "Создать локальный стор для одного компонента",
    ],
    answer: 0,
    explanation:
      "`const count = useSelector(state => state.counter.value)` перерисовывает компонент, только когда выбранное значение изменилось. `const dispatch = useDispatch(); dispatch(increment())` отправляет действие.",
    sources: ["react-redux-hooks"],
  },
  {
    question: "Что такое action (действие) в Redux?",
    options: [
      "Простой объект с полем `type`, описывающий, что произошло",
      "Функция, которая напрямую меняет стор",
      "React-компонент, который рендерит кнопку",
    ],
    answer: 0,
    explanation:
      "`{ type: 'todos/added', payload: { id, text } }`. Action creators из `createSlice` создают такие объекты. Асинхронная логика (thunk) отправляет обычные действия, когда приходят данные.",
    sources: ["redux-essentials"],
  },
  {
    question: "Где в Redux Toolkit должен находиться запрос к серверу?",
    options: [
      "В thunk (`createAsyncThunk`) или эндпоинте RTK Query — но не в редьюсере",
      "Прямо в редьюсере, ведь он вычисляет новое состояние",
      "В `initialState` слайса",
    ],
    answer: 0,
    explanation:
      "Редьюсеры должны быть чистыми. `createAsyncThunk` отправляет `pending`/`fulfilled`/`rejected` вокруг запроса; для кэшируемых серверных данных обычно проще RTK Query.",
    sources: ["rtk-createAsyncThunk", "rtk-query-overview"],
  },

  // ---------- Zustand ----------
  {
    question: "Что такое Zustand?",
    options: [
      "Небольшой стейт-менеджер на хуках без провайдеров и шаблонного кода",
      "Серверный кэш для ответов API",
      "Официальный хук React для глобального состояния",
    ],
    answer: 0,
    explanation:
      "`const useBear = create(set => ({ bears: 0, add: () => set(s => ({ bears: s.bears + 1 })) }))` — и любой компонент вызывает `useBear(...)`. `<Provider>` не нужен: стор живёт в модуле.",
    sources: ["zustand-intro"],
  },
  {
    question: "Как прочитать только одно поле из стора Zustand?",
    code: `const useStore = create((set) => ({ count: 0, user: null, inc: () => {} }));`,
    options: [
      "`const count = useStore((s) => s.count)`",
      "`const { count } = useContext(useStore)`",
      "`const count = useStore.count`",
    ],
    answer: 0,
    explanation:
      "Селектор подписывает компонент только на `count`: изменения `user` его не перерисуют. Вызов `useStore()` без селектора подписывает на весь стор и перерисовывает при любом изменении.",
    sources: ["zustand-intro", "zustand-use-shallow"],
  },
  {
    question: "Как обновить состояние в Zustand?",
    options: [
      "Вызвать `set` внутри действия: `set((s) => ({ count: s.count + 1 }))`",
      "Присвоить напрямую: `useStore.count = 5`",
      "Отправить объект действия с полем `type`",
    ],
    answer: 0,
    explanation:
      "`set` объединяет возвращённый объект с состоянием на верхнем уровне (на один уровень вглубь). Действия обычно описывают прямо в сторе, и компоненты просто вызывают `inc()`.",
    sources: ["zustand-updating-state"],
  },
  {
    question: "Нужен ли стору Zustand компонент-провайдер?",
    options: [
      "Нет: стор — это хук, созданный на уровне модуля",
      "Да: `<ZustandProvider>` должен оборачивать всё приложение",
      "Да, но только в продакшен-сборке",
    ],
    answer: 0,
    explanation:
      "Это одно из преимуществ Zustand. Обратная сторона: стор на уровне модуля общий для всех, кто его импортирует, — на сервере (SSR) нужен стор на каждый запрос, это показано в гайде для Next.js через Context.",
    sources: ["zustand-intro", "zustand-nextjs"],
  },
  {
    question: "Как сохранять стор Zustand в `localStorage`?",
    options: [
      "Обернуть создатель стора в middleware `persist`",
      "Zustand автоматически сохраняет каждый стор в `localStorage`",
      "Вызывать `localStorage.setItem` в каждом компоненте после рендера",
    ],
    answer: 0,
    explanation:
      "`create(persist((set) => ({...}), { name: 'cart' }))` сохраняет и восстанавливает состояние. Можно выбрать хранилище, сохранять только часть полей (`partialize`) и мигрировать старые версии.",
    sources: ["zustand-persist"],
  },

  // ---------- Серверное состояние: TanStack Query ----------
  {
    question: "Чем серверное состояние отличается от клиентского (UI)?",
    options: [
      "Оно живёт на сервере, общее и может устареть — UI хранит кэшированную копию",
      "Это состояние, которое хранится только в серверных компонентах",
      "Это состояние, которое никогда не показывается в UI",
    ],
    answer: 0,
    explanation:
      "Серверные данные (список заказов) могут измениться без ведома пользователя, поэтому им нужны кэширование, перезапросы и инвалидация. UI-состояние (открыта ли модалка) целиком принадлежит клиенту. Смешение их в одном сторе ведёт к ручному коду синхронизации.",
    sources: ["tq-overview", "tq-client-state"],
  },
  {
    question: "Для чего нужен TanStack Query (React Query)?",
    options: [
      "Загружать, кэшировать и поддерживать актуальными серверные данные",
      "Строить SQL-запросы на клиенте",
      "Делать маршрутизацию между страницами",
    ],
    answer: 0,
    explanation:
      "Он берёт на себя состояния загрузки и ошибки, кэширование, дедупликацию, фоновое обновление, повторы, пагинацию и мутации — работу, которая утомительна и чревата ошибками с `useEffect` + `useState`.",
    sources: ["tq-overview"],
  },
  {
    question: "Какие две обязательные части у `useQuery`?",
    options: [
      "`queryKey` и `queryFn`",
      "`url` и `method`",
      "`reducer` и `initialState`",
    ],
    answer: 0,
    explanation:
      "`useQuery({ queryKey: ['todo', id], queryFn: () => fetchTodo(id) })`. Ключ идентифицирует данные в кэше; всё, от чего зависит запрос, кладут в него — тогда смена `id` загрузит другие данные.",
    sources: ["tq-queries", "tq-query-keys"],
  },
  {
    question: "Что нужно сделать перед вызовом `useQuery` в приложении?",
    options: [
      "Создать `QueryClient` и обернуть приложение в `QueryClientProvider`",
      "Ничего: кэш создаётся автоматически при первом вызове",
      "Добавить Redux-стор, в котором TanStack Query хранит кэш",
    ],
    answer: 0,
    explanation:
      "`QueryClient` хранит кэш и настройки по умолчанию. Создают его один раз (вне компонента или в `useState`), чтобы кэш не сбрасывался на каждом рендере. Redux не нужен.",
    sources: ["tq-overview"],
  },
  {
    question: "Как отправить POST-запрос (создать элемент) с TanStack Query?",
    options: [
      "Через `useMutation` и его функцию `mutate`",
      "Через `useQuery` и `method: 'POST'`",
      "Через `queryClient.post()`",
    ],
    answer: 0,
    explanation:
      "Запросы (queries) читают данные, мутации их меняют. `const { mutate, isPending } = useMutation({ mutationFn: createTodo })`. После успеха связанные запросы обычно инвалидируют, чтобы список перезапросился.",
    sources: ["tq-mutations"],
  },
  {
    question: "Почему TanStack Query перезапрашивает данные при возврате во вкладку браузера?",
    options: [
      "По умолчанию данные сразу устаревшие (`staleTime: 0`) и включён `refetchOnWindowFocus`",
      "Кэш очищается каждый раз, когда вкладка теряет фокус",
      "Это ошибка, которая проявляется только в режиме разработки",
    ],
    answer: 0,
    explanation:
      "По умолчанию библиотека агрессивно поддерживает свежесть: устаревшие данные перезапрашиваются при монтировании, фокусе окна и восстановлении сети. Если данные меняются редко, увеличьте `staleTime` глобально или для конкретного запроса.",
    sources: ["tq-important-defaults"],
  },

  // ---------- RTK Query ----------
  {
    question: "Что такое RTK Query?",
    options: [
      "Инструмент загрузки и кэширования данных, встроенный в Redux Toolkit",
      "Язык запросов для выборки данных из Redux-стора",
      "GraphQL-сервер для Redux-приложений",
    ],
    answer: 0,
    explanation:
      "Вы описываете эндпоинты через `createApi`, а он генерирует хуки (`useGetPostsQuery`) и управляет кэшированием, дедупликацией, перезапросами и инвалидацией — похоже на TanStack Query, но живёт в Redux-сторе.",
    sources: ["rtk-query-overview"],
  },
  {
    question: "Что генерирует `createApi` для эндпоинта `getPosts: builder.query(...)`?",
    options: [
      "Хук `useGetPostsQuery`, а также редьюсер и middleware для стора",
      "REST-сервер, который отдаёт посты",
      "Слайс с `getPosts` в роли case reducer",
    ],
    answer: 0,
    explanation:
      "`reducer` и `middleware` API-слайса добавляют в `configureStore`, а компоненты вызывают сгенерированный хук: `const { data, isLoading } = useGetPostsQuery()`.",
    sources: ["rtk-query-overview", "rtk-query-queries"],
  },
  {
    question: "Как мутация RTK Query заставляет списки перезапроситься после добавления элемента?",
    options: [
      "Запросы объявляют `providesTags`, а мутация — `invalidatesTags`",
      "После мутации нужно вызвать `window.location.reload()`",
      "RTK Query перезапрашивает все эндпоинты после любой мутации",
    ],
    answer: 0,
    explanation:
      "`getPosts` предоставляет тег `Post`, а `addPost` его инвалидирует — активные запросы с этим тегом перезапрашиваются автоматически. Это аналог `invalidateQueries` в TanStack Query.",
    sources: ["rtk-query-invalidation", "rtk-query-mutations"],
  },

  // ---------- SWR ----------
  {
    question: "Что означает название SWR?",
    options: [
      "stale-while-revalidate: показать кэшированные данные, затем обновить их в фоне",
      "Server Write Replication",
      "State With Reducers",
    ],
    answer: 0,
    explanation:
      "Стратегия пришла из расширения HTTP `Cache-Control`: сразу вернуть устаревшие данные ради скорости, перепроверить в фоне и обновить UI. Библиотека SWR от Vercel построена вокруг неё.",
    sources: ["swr-intro", "webdev-swr"],
  },
  {
    question: "Какие аргументы у `useSWR(key, fetcher)`?",
    options: [
      "Уникальный ключ (часто URL) и функция, которая загружает данные",
      "Редьюсер и начальное состояние",
      "HTTP-метод и тело запроса",
    ],
    answer: 0,
    explanation:
      "`const { data, error, isLoading } = useSWR('/api/user', fetcher)`. Ключ идентифицирует запись в кэше: все компоненты с одним ключом делят один запрос и одно закэшированное значение.",
    sources: ["swr-intro"],
  },

  // ---------- React Router loader / action ----------
  {
    question: "Что такое `loader` в React Router?",
    options: [
      "Функция, которая загружает данные маршрута до его рендера",
      "Компонент-спиннер, который показывается во время загрузки страницы",
      "Функция, которая лениво загружает JS-код маршрута",
    ],
    answer: 0,
    explanation:
      "Роутер вызывает loader при навигации, а компонент читает результат через `useLoaderData()` (или через пропсы в framework mode). Загрузка данных начинается вместе с навигацией, а не после рендера, что убирает водопады запросов.",
    sources: ["rr-data-loading", "rr-route-object"],
  },
  {
    question: "Что такое `action` в React Router?",
    options: [
      "Функция, которая обрабатывает изменение данных при отправке `<Form>`",
      "Redux-действие, которое отправляется при навигации",
      "Обработчик клика, привязанный к `<Link>`",
    ],
    answer: 0,
    explanation:
      "`<Form method=\"post\">` вызывает `action` маршрута с данными формы. После action роутер автоматически перепроверяет loader'ы страницы, и UI показывает свежие данные без ручного обновления кэша.",
    sources: ["rr-actions"],
  },
];

export default questions;
