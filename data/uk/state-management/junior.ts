import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  // ---------- useState ----------
  {
    question: "Що таке «стан» (state) у React-компоненті?",
    options: [
      "Дані, які змінюються з часом і впливають на екран; зміна спричиняє ререндер",
      "Будь-яка змінна, оголошена всередині функції компонента",
      "Пропси, які батько передає компоненту",
    ],
    answer: 0,
    explanation:
      "Стан — це пам'ять компонента між рендерами: значення лічильника, текст у полі, чи відкрите меню. Звичайна змінна `let` скидається при кожному рендері, і її зміна не просить React оновити UI. Пропси — вхідні дані лише для читання, ними володіє батько.",
    sources: ["react-state-memory", "react-useState"],
  },
  {
    question: "Чому лічильник на екрані не змінюється?",
    code: `function Counter() {
  let count = 0;
  return <button onClick={() => count++}>{count}</button>;
}`,
    options: [
      "Локальна змінна не зберігається між рендерами, а її зміна не спричиняє рендер",
      "Обробники `onClick` не можуть змінювати змінні, оголошені в компоненті",
      "Кнопці потрібен `type=\"button\"`, щоб клік оновив текст",
    ],
    answer: 0,
    explanation:
      "`count` при кожному рендері знову дорівнює `0`, а її збільшення не просить React перемалювати компонент. Потрібно `const [count, setCount] = useState(0)` і `setCount(count + 1)`.",
    sources: ["react-state-memory", "react-useState"],
  },
  {
    question: "Коли потрібна функціональна форма `setCount(c => c + 1)` замість `setCount(count + 1)`?",
    options: [
      "Коли нове значення залежить від попереднього, особливо за кількох оновлень поспіль",
      "Лише в класових компонентах; функціональні її не підтримують",
      "Коли в стані рядок, а не число",
    ],
    answer: 0,
    explanation:
      "`count` — знімок поточного рендера. Три виклики `setCount(count + 1)` в одному обробнику дають +1, а три `setCount(c => c + 1)` — +3: кожен апдейтер отримує результат попереднього. Це ж захищає від застарілих замикань у таймерах і ефектах.",
    sources: ["react-queueing-updates", "react-state-snapshot"],
  },
  {
    question: "Як правильно оновити одне поле об'єкта в стані?",
    code: `const [form, setForm] = useState({ name: "", email: "" });`,
    options: [
      "`setForm({ ...form, email: value })`",
      "`form.email = value; setForm(form)`",
      "`setForm({ email: value })` — React сам об'єднає об'єкти",
    ],
    answer: 0,
    explanation:
      "На відміну від `this.setState` у класах, сетер `useState` замінює значення повністю — `setForm({ email })` втратить `name`. Мутацію й передачу того самого об'єкта буде пропущено: React порівнює за посиланням (`Object.is`).",
    sources: ["react-updating-objects", "react-useState"],
  },
  {
    question: "Як видалити елемент з `id` з масиву в стані?",
    options: [
      "`setItems(items.filter(i => i.id !== id))`",
      "`items.splice(index, 1); setItems(items)`",
      "`delete items[index]; setItems(items)`",
    ],
    answer: 0,
    explanation:
      "Стан оновлюють іммутабельно: `filter`, `map`, spread і `toSorted` створюють новий масив. `splice` і `delete` мутують наявний, посилання не змінюється, і React пропускає оновлення.",
    sources: ["react-updating-arrays"],
  },
  {
    question: "Навіщо передавати функцію в `useState(() => createInitialTodos())`?",
    options: [
      "Щоб дороге обчислення виконалося лише на першому рендері",
      "Щоб стан став доступним лише для читання після ініціалізації",
      "Щоб початкове значення завантажилося асинхронно із сервера",
    ],
    answer: 0,
    explanation:
      "`useState(createInitialTodos())` викликає функцію на кожному рендері, хоча результат потрібен один раз. Лінивий ініціалізатор `useState(createInitialTodos)` викликається лише під час монтування. Він має бути синхронним і чистим.",
    sources: ["react-useState"],
  },
  {
    question: "Чи потрібно зберігати `fullName` у стані, якщо вже є `firstName` і `lastName`?",
    options: [
      "Ні — обчислити під час рендера: `const fullName = firstName + ' ' + lastName`",
      "Так — і синхронізувати через `useEffect` при кожній зміні",
      "Так — інакше React не зможе показати обчислене значення",
    ],
    answer: 0,
    explanation:
      "Надлишковий стан веде до розсинхронізації та зайвих рендерів. Усе, що виводиться з пропсів і наявного стану, обчислюють під час рендера. Якщо обчислення дороге — обгортають у `useMemo`.",
    sources: ["react-choosing-state", "react-no-effect"],
  },
  {
    question: "Що таке «локальний» стан компонента і коли його достатньо?",
    options: [
      "Стан одного компонента чи невеликого піддерева — вистачає `useState`",
      "Стан у `localStorage`, що переживає перезавантаження",
      "Стан, який можуть зберігати лише серверні компоненти",
    ],
    answer: 0,
    explanation:
      "Більша частина UI-стану локальна: чи відкритий список, текст поля, активна вкладка. Тримайте стан якомога ближче до місця використання й піднімайте його чи переносьте в стор, лише коли він потрібен кільком віддаленим компонентам.",
    sources: ["react-sharing-state", "react-choosing-state"],
  },

  // ---------- useReducer ----------
  {
    question: "Що повертає `useReducer`?",
    code: `const [state, dispatch] = useReducer(reducer, initialState);`,
    options: [
      "Поточний стан і функцію `dispatch` для надсилання дій",
      "Функцію-редʼюсер і копію початкового стану",
      "Проміс, який розв'язується новим станом",
    ],
    answer: 0,
    explanation:
      "Ви викликаєте `dispatch({ type: 'added', text })`, React викликає `reducer(state, action)` і використовує результат як наступний стан. `dispatch` стабільний між рендерами, його безпечно передавати вниз і вказувати в залежностях ефектів.",
    sources: ["react-useReducer", "react-reducer"],
  },
  {
    question: "Якою має бути функція-редʼюсер?",
    options: [
      "Чистою: `(state, action) => newState` без побічних ефектів і мутацій",
      "Асинхронною: може робити запити й повертати проміс стану",
      "Мутувальною: змінює `state` напряму й нічого не повертає",
    ],
    answer: 0,
    explanation:
      "React може викликати редʼюсер більше одного разу (наприклад, у Strict Mode), тому в ньому не можна робити запити, ставити таймери й мутувати стан. Побічні ефекти — в обробниках подій чи ефектах.",
    sources: ["react-reducer", "react-pure"],
  },
  {
    question: "Коли `useReducer` зазвичай зручніший за кілька `useState`?",
    options: [
      "Коли в стану багато пов'язаних полів, а логіка оновлень розмазана по обробниках",
      "Завжди, коли стан — один булевий прапорець",
      "Лише коли стан має бути глобальним для всього застосунку",
    ],
    answer: 0,
    explanation:
      "Редʼюсер збирає всі переходи в одному місці — їх легко читати й тестувати, а обробники лише описують, що сталося. Для одного перемикача простіше `useState`. Сам собою `useReducer` не робить стан глобальним.",
    sources: ["react-reducer", "react-useReducer"],
  },
  {
    question: "Що зазвичай робить редʼюсер для невідомого `type` дії?",
    options: [
      "Кидає помилку (або повертає поточний стан), щоб одруківка не пройшла непоміченою",
      "Повертає `undefined`, що скидає стан",
      "Повертає порожній об'єкт `{}`",
    ],
    answer: 0,
    explanation:
      "Повернення `undefined` зламає стан. У документації React у `default` кидають помилку, щоб одруківки в типах дій проявлялися одразу; у TypeScript дискриміноване об'єднання дій плюс перевірка через `never` ловлять їх на етапі компіляції.",
    sources: ["react-reducer"],
  },
  {
    question: "Чому дії називають за тим, що сталося (`'task_added'`), а не що зробити (`'set_tasks'`)?",
    options: [
      "Обробники лишаються простими, а логіка зміни стану живе в редʼюсері",
      "React вимагає, щоб типи дій були в минулому часі",
      "Так редʼюсер працює швидше",
    ],
    answer: 0,
    explanation:
      "Дія описує подію користувача («задачу додано»), а редʼюсер вирішує, як на неї реагує стан. Дії `set_*` повертають логіку в компоненти й перетворюють редʼюсер на простий сетер. Та сама конвенція прийнята в Redux.",
    sources: ["react-reducer", "redux-style-guide"],
  },

  // ---------- Prop drilling ----------
  {
    question: "Що таке prop drilling?",
    options: [
      "Передавання пропсів через проміжні компоненти, які їх не використовують",
      "Перевірка пропсів у рантаймі через PropTypes",
      "Копіювання пропсів у локальний стан через `useEffect`",
    ],
    answer: 0,
    explanation:
      "Якщо в `App` є `user`, а потрібен він глибоко вкладеному `Avatar`, кожен компонент між ними має прийняти й передати `user` далі. Це багатослівно й пов'язує проміжні компоненти з даними, які їм байдужі.",
    sources: ["react-context-learn", "react-sharing-state"],
  },
  {
    question: "Що таке «підняття стану» (lifting state up)?",
    options: [
      "Перенесення стану в найближчого спільного батька, щоб сусіди ділили його через пропси",
      "Перенесення всього стану в один глобальний стор нагорі застосунку",
      "Зберігання стану в `window`, щоб його міг читати будь-який компонент",
    ],
    answer: 0,
    explanation:
      "Двом компонентам, які мають лишатися синхронними, не варто тримати кожному свою копію. Станом володіє батько й передає вниз значення та колбек. Це перший інструмент — до Context і сторів.",
    sources: ["react-sharing-state"],
  },
  {
    question: "Який прийом часто розв'язує prop drilling без Context?",
    options: [
      "Композиція: передавати готові елементи через `children` чи інші пропси",
      "Обгорнути кожен проміжний компонент у `React.memo`",
      "Перенести дані в `useRef` у корені застосунку",
    ],
    answer: 0,
    explanation:
      "`<Layout sidebar={<UserMenu user={user} />}>` — `Layout` не потрібно знати про `user`, він просто рендерить переданий елемент. Документація React радить спершу спробувати композицію: Context ускладнює повторне використання компонентів.",
    sources: ["react-context-learn", "react-props"],
  },
  {
    question: "Чи є передавання пропсів на 2–3 рівні проблемою саме собою?",
    options: [
      "Зазвичай ні: явні пропси роблять потік даних легким для відстеження",
      "Так: будь-який проп, переданий глибше одного рівня, треба переносити в Context",
      "Так: React виводить попередження про пропси, що проходять через кілька рівнів",
    ],
    answer: 0,
    explanation:
      "Явні пропси зрозумілі й легко рефакторяться. Prop drilling стає болем, коли дані йдуть через багато шарів або потрібні багатьом компонентам — тоді доречні композиція, Context чи стор.",
    sources: ["react-context-learn"],
  },

  // ---------- Context API + useContext ----------
  {
    question: "Яке завдання розв'язує Context API?",
    options: [
      "Передати значення глибоко в дерево, не прокидаючи його через кожен рівень",
      "Зберігати серверні дані з кешуванням і перезапитами",
      "Пришвидшити рендер, пропускаючи незмінені компоненти",
    ],
    answer: 0,
    explanation:
      "Context робить значення (тему, поточного користувача, мову) доступним будь-якому нащадку. Це транспорт для значень, а не стейт-менеджер: сам стан і далі живе в `useState`/`useReducer` компонента-провайдера.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "Які кроки потрібні, щоб використати Context?",
    options: [
      "`createContext` → обгорнути дерево провайдером з `value` → читати через `useContext`",
      "`useContext` у корені → `createContext` у кожному нащадку → передати `value` пропсом",
      "Оголосити глобальну змінну й імпортувати її в кожен компонент",
    ],
    answer: 0,
    explanation:
      "`const ThemeContext = createContext('light')`; у React 19 можна рендерити `<ThemeContext value={theme}>` напряму (раніше — `<ThemeContext.Provider>`); будь-який нащадок викликає `useContext(ThemeContext)`.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "Що поверне `useContext(ThemeContext)`, якщо вище немає провайдера?",
    options: [
      "Значення за замовчуванням із `createContext(defaultValue)`",
      "`undefined` незалежно від значення за замовчуванням",
      "Одразу кине помилку",
    ],
    answer: 0,
    explanation:
      "Значення за замовчуванням використовується, коли провайдера вище по дереву не знайдено. Поширений прийом — `createContext(null)` і власний хук `useAuth()`, який кидає зрозумілу помилку, якщо провайдера немає.",
    sources: ["react-useContext"],
  },
  {
    question: "Які компоненти перемалюються при зміні `value` провайдера?",
    options: [
      "Усі компоненти, які читають цей контекст через `useContext`",
      "Лише сам провайдер",
      "Лише компоненти, що отримують значення через пропси",
    ],
    answer: 0,
    explanation:
      "Перемальовуються всі споживачі контексту, навіть якщо використовують одне поле великого об'єкта. Тому Context чудово підходить для значень, що рідко змінюються, і гірше — для стану, що часто змінюється.",
    sources: ["react-useContext"],
  },
  {
    question: "Які дані добре підходять для Context?",
    options: [
      "Ті, що рідко змінюються й потрібні багатьом: тема, мова, поточний користувач",
      "Значення текстового поля, що змінюється при кожному натисканні клавіші",
      "Список із 10 000 елементів, що оновлюється щосекунди",
    ],
    answer: 0,
    explanation:
      "Context добрий для спільних налаштувань застосунку й залежностей (наприклад, API-клієнта). Швидкозмінні значення в широко використовуваному контексті спричиняють багато ререндерів; такий стан тримають локально чи в сторі із селекторами.",
    sources: ["react-context-learn"],
  },
  {
    question: "Навіщо обгортати `useContext` у власний хук на кшталт `useAuth()`?",
    code: `export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}`,
    options: [
      "Щоб приховати об'єкт контексту й явно падати, якщо провайдера немає",
      "Бо `useContext` не можна викликати прямо в компонентах",
      "Щоб зробити значення контексту незмінним",
    ],
    answer: 0,
    explanation:
      "Споживачі імпортують один хук замість об'єкта контексту, TypeScript отримує тип без null, а забутий провайдер дає читабельну помилку замість `undefined` десь глибоко в коді.",
    sources: ["react-useContext", "react-custom-hooks"],
  },
  {
    question: "Чи може компонент використовувати кілька контекстів одночасно?",
    options: [
      "Так: викликати `useContext` для кожного",
      "Ні: лише один контекст на компонент",
      "Лише якщо об'єднати контексти в один через `mergeContexts`",
    ],
    answer: 0,
    explanation:
      "`const theme = useContext(ThemeContext); const user = useContext(UserContext);` — це нормально. Розділення непов'язаних значень за різними контекстами ще й зменшує зайві ререндери.",
    sources: ["react-useContext"],
  },

  // ---------- Redux Toolkit ----------
  {
    question: "Що таке Redux Toolkit (RTK)?",
    options: [
      "Офіційний рекомендований спосіб писати Redux-код з меншою кількістю шаблонного коду",
      "Окремий стейт-менеджер, що замінює Redux і несумісний з ним",
      "Розширення браузера для налагодження React-компонентів",
    ],
    answer: 0,
    explanation:
      "RTK об'єднує `configureStore`, `createSlice`, `createAsyncThunk`, Immer і RTK Query. Команда Redux рекомендує його для всього нового Redux-коду; ручні константи типів і switch-редʼюсери вважаються застарілими.",
    sources: ["redux-why-rtk", "redux-essentials"],
  },
  {
    question: "Що генерує `createSlice`?",
    options: [
      "Редʼюсер і action creators для кожного case reducer",
      "React-компонент, який показує стан слайса",
      "Стор із DevTools і middleware",
    ],
    answer: 0,
    explanation:
      "`createSlice({ name: 'todos', initialState, reducers: { added(state, action) {...} } })` повертає `slice.reducer` і `slice.actions.added` з типом `'todos/added'`.",
    sources: ["rtk-createSlice"],
  },
  {
    question: "Чому всередині редʼюсерів `createSlice` можна «мутувати» `state`?",
    code: `added(state, action) {
  state.items.push(action.payload);
}`,
    options: [
      "Immer під капотом перетворює ці зміни на іммутабельне оновлення",
      "Redux Toolkit скасував вимогу іммутабельності",
      "`push` особливо обробляється RTK, а інші мутації заборонені",
    ],
    answer: 0,
    explanation:
      "`state` — чернетка Immer: ви пишете мутувальний код, а Immer створює новий об'єкт зі structural sharing. Поза `createSlice`/`createReducer` мутації і далі помилка.",
    sources: ["rtk-immer", "rtk-createSlice"],
  },
  {
    question: "Що робить `configureStore`?",
    options: [
      "Створює стор з об'єднаними редʼюсерами, thunk-middleware і DevTools",
      "Під'єднує стор до React-компонентів без `<Provider>`",
      "Генерує слайси з JSON-схеми",
    ],
    answer: 0,
    explanation:
      "`configureStore({ reducer: { todos: todosReducer } })` об'єднує редʼюсери, додає `redux-thunk`, вмикає Redux DevTools і в режимі розробки перевіряє випадкові мутації та несеріалізовні значення.",
    sources: ["rtk-configureStore"],
  },
  {
    question: "Як під'єднати Redux-стор до React-застосунку?",
    options: [
      "Обгорнути застосунок у `<Provider store={store}>` з `react-redux`",
      "Імпортувати стор у кожен компонент, якому він потрібен",
      "Передати стор у `createRoot(el, { store })`",
    ],
    answer: 0,
    explanation:
      "`Provider` робить стор доступним для `useSelector` і `useDispatch` усюди нижче. Context він використовує лише для передавання посилання на стор; підписки працюють окремо й точково.",
    sources: ["react-redux-hooks", "redux-essentials"],
  },
  {
    question: "Для чого потрібні `useSelector` і `useDispatch`?",
    options: [
      "Читати дані зі стору й отримувати функцію `dispatch`",
      "Вибрати DOM-елемент і надіслати DOM-подію",
      "Створити локальний стор для одного компонента",
    ],
    answer: 0,
    explanation:
      "`const count = useSelector(state => state.counter.value)` перемальовує компонент, лише коли вибране значення змінилося. `const dispatch = useDispatch(); dispatch(increment())` надсилає дію.",
    sources: ["react-redux-hooks"],
  },
  {
    question: "Що таке action (дія) в Redux?",
    options: [
      "Простий об'єкт з полем `type`, що описує, що сталося",
      "Функція, яка напряму змінює стор",
      "React-компонент, який рендерить кнопку",
    ],
    answer: 0,
    explanation:
      "`{ type: 'todos/added', payload: { id, text } }`. Action creators із `createSlice` створюють такі об'єкти. Асинхронна логіка (thunk) надсилає звичайні дії, коли надходять дані.",
    sources: ["redux-essentials"],
  },
  {
    question: "Де в Redux Toolkit має бути запит до сервера?",
    options: [
      "У thunk (`createAsyncThunk`) чи ендпоінті RTK Query — але не в редʼюсері",
      "Просто в редʼюсері, адже він обчислює новий стан",
      "В `initialState` слайса",
    ],
    answer: 0,
    explanation:
      "Редʼюсери мають бути чистими. `createAsyncThunk` надсилає `pending`/`fulfilled`/`rejected` навколо запиту; для кешованих серверних даних зазвичай простіше RTK Query.",
    sources: ["rtk-createAsyncThunk", "rtk-query-overview"],
  },

  // ---------- Zustand ----------
  {
    question: "Що таке Zustand?",
    options: [
      "Невеликий стейт-менеджер на хуках без провайдерів і шаблонного коду",
      "Серверний кеш для відповідей API",
      "Офіційний хук React для глобального стану",
    ],
    answer: 0,
    explanation:
      "`const useBear = create(set => ({ bears: 0, add: () => set(s => ({ bears: s.bears + 1 })) }))` — і будь-який компонент викликає `useBear(...)`. `<Provider>` не потрібен: стор живе в модулі.",
    sources: ["zustand-intro"],
  },
  {
    question: "Як прочитати лише одне поле зі стору Zustand?",
    code: `const useStore = create((set) => ({ count: 0, user: null, inc: () => {} }));`,
    options: [
      "`const count = useStore((s) => s.count)`",
      "`const { count } = useContext(useStore)`",
      "`const count = useStore.count`",
    ],
    answer: 0,
    explanation:
      "Селектор підписує компонент лише на `count`: зміни `user` його не перемалюють. Виклик `useStore()` без селектора підписує на весь стор і перемальовує за будь-якої зміни.",
    sources: ["zustand-intro", "zustand-use-shallow"],
  },
  {
    question: "Як оновити стан у Zustand?",
    options: [
      "Викликати `set` усередині дії: `set((s) => ({ count: s.count + 1 }))`",
      "Присвоїти напряму: `useStore.count = 5`",
      "Надіслати об'єкт дії з полем `type`",
    ],
    answer: 0,
    explanation:
      "`set` об'єднує повернутий об'єкт зі станом на верхньому рівні (на один рівень углиб). Дії зазвичай описують прямо в сторі, і компоненти просто викликають `inc()`.",
    sources: ["zustand-updating-state"],
  },
  {
    question: "Чи потрібен стору Zustand компонент-провайдер?",
    options: [
      "Ні: стор — це хук, створений на рівні модуля",
      "Так: `<ZustandProvider>` має обгортати весь застосунок",
      "Так, але лише в продакшен-збірці",
    ],
    answer: 0,
    explanation:
      "Це одна з переваг Zustand. Зворотний бік: стор на рівні модуля спільний для всіх, хто його імпортує, — на сервері (SSR) потрібен стор на кожен запит, це показано в гайді для Next.js через Context.",
    sources: ["zustand-intro", "zustand-nextjs"],
  },
  {
    question: "Як зберігати стор Zustand у `localStorage`?",
    options: [
      "Обгорнути творця стору в middleware `persist`",
      "Zustand автоматично зберігає кожен стор у `localStorage`",
      "Викликати `localStorage.setItem` у кожному компоненті після рендера",
    ],
    answer: 0,
    explanation:
      "`create(persist((set) => ({...}), { name: 'cart' }))` зберігає й відновлює стан. Можна вибрати сховище, зберігати лише частину полів (`partialize`) і мігрувати старі версії.",
    sources: ["zustand-persist"],
  },

  // ---------- Серверний стан: TanStack Query ----------
  {
    question: "Чим серверний стан відрізняється від клієнтського (UI)?",
    options: [
      "Він живе на сервері, спільний і може застаріти — UI зберігає кешовану копію",
      "Це стан, що зберігається лише в серверних компонентах",
      "Це стан, який ніколи не показується в UI",
    ],
    answer: 0,
    explanation:
      "Серверні дані (список замовлень) можуть змінитися без відома користувача, тому їм потрібні кешування, перезапити й інвалідація. UI-стан (чи відкрита модалка) повністю належить клієнту. Змішування їх в одному сторі веде до ручного коду синхронізації.",
    sources: ["tq-overview", "tq-client-state"],
  },
  {
    question: "Для чого потрібен TanStack Query (React Query)?",
    options: [
      "Завантажувати, кешувати й підтримувати актуальними серверні дані",
      "Будувати SQL-запити на клієнті",
      "Робити маршрутизацію між сторінками",
    ],
    answer: 0,
    explanation:
      "Він бере на себе стани завантаження й помилки, кешування, дедуплікацію, фонове оновлення, повтори, пагінацію й мутації — роботу, яка виснажлива й загрожує помилками з `useEffect` + `useState`.",
    sources: ["tq-overview"],
  },
  {
    question: "Які дві обов'язкові частини в `useQuery`?",
    options: [
      "`queryKey` і `queryFn`",
      "`url` і `method`",
      "`reducer` і `initialState`",
    ],
    answer: 0,
    explanation:
      "`useQuery({ queryKey: ['todo', id], queryFn: () => fetchTodo(id) })`. Ключ ідентифікує дані в кеші; усе, від чого залежить запит, кладуть у нього — тоді зміна `id` завантажить інші дані.",
    sources: ["tq-queries", "tq-query-keys"],
  },
  {
    question: "Що потрібно зробити перед викликом `useQuery` у застосунку?",
    options: [
      "Створити `QueryClient` і обгорнути застосунок у `QueryClientProvider`",
      "Нічого: кеш створюється автоматично під час першого виклику",
      "Додати Redux-стор, у якому TanStack Query зберігає кеш",
    ],
    answer: 0,
    explanation:
      "`QueryClient` зберігає кеш і налаштування за замовчуванням. Створюють його один раз (поза компонентом чи в `useState`), щоб кеш не скидався на кожному рендері. Redux не потрібен.",
    sources: ["tq-overview"],
  },
  {
    question: "Як надіслати POST-запит (створити елемент) з TanStack Query?",
    options: [
      "Через `useMutation` і його функцію `mutate`",
      "Через `useQuery` і `method: 'POST'`",
      "Через `queryClient.post()`",
    ],
    answer: 0,
    explanation:
      "Запити (queries) читають дані, мутації їх змінюють. `const { mutate, isPending } = useMutation({ mutationFn: createTodo })`. Після успіху пов'язані запити зазвичай інвалідують, щоб список перезапитався.",
    sources: ["tq-mutations"],
  },
  {
    question: "Чому TanStack Query перезапитує дані під час повернення у вкладку браузера?",
    options: [
      "За замовчуванням дані одразу застарілі (`staleTime: 0`) і ввімкнено `refetchOnWindowFocus`",
      "Кеш очищується щоразу, коли вкладка втрачає фокус",
      "Це помилка, яка проявляється лише в режимі розробки",
    ],
    answer: 0,
    explanation:
      "За замовчуванням бібліотека агресивно підтримує свіжість: застарілі дані перезапитуються під час монтування, фокусу вікна й відновлення мережі. Якщо дані змінюються рідко, збільште `staleTime` глобально чи для конкретного запиту.",
    sources: ["tq-important-defaults"],
  },

  // ---------- RTK Query ----------
  {
    question: "Що таке RTK Query?",
    options: [
      "Інструмент завантаження й кешування даних, вбудований у Redux Toolkit",
      "Мова запитів для вибірки даних із Redux-стору",
      "GraphQL-сервер для Redux-застосунків",
    ],
    answer: 0,
    explanation:
      "Ви описуєте ендпоінти через `createApi`, а він генерує хуки (`useGetPostsQuery`) і керує кешуванням, дедуплікацією, перезапитами й інвалідацією — схоже на TanStack Query, але живе в Redux-сторі.",
    sources: ["rtk-query-overview"],
  },
  {
    question: "Що генерує `createApi` для ендпоінта `getPosts: builder.query(...)`?",
    options: [
      "Хук `useGetPostsQuery`, а також редʼюсер і middleware для стору",
      "REST-сервер, який віддає пости",
      "Слайс з `getPosts` у ролі case reducer",
    ],
    answer: 0,
    explanation:
      "`reducer` і `middleware` API-слайса додають у `configureStore`, а компоненти викликають згенерований хук: `const { data, isLoading } = useGetPostsQuery()`.",
    sources: ["rtk-query-overview", "rtk-query-queries"],
  },
  {
    question: "Як мутація RTK Query змушує списки перезапитатися після додавання елемента?",
    options: [
      "Запити оголошують `providesTags`, а мутація — `invalidatesTags`",
      "Після мутації треба викликати `window.location.reload()`",
      "RTK Query перезапитує всі ендпоінти після будь-якої мутації",
    ],
    answer: 0,
    explanation:
      "`getPosts` надає тег `Post`, а `addPost` його інвалідує — активні запити з цим тегом перезапитуються автоматично. Це аналог `invalidateQueries` у TanStack Query.",
    sources: ["rtk-query-invalidation", "rtk-query-mutations"],
  },

  // ---------- SWR ----------
  {
    question: "Що означає назва SWR?",
    options: [
      "stale-while-revalidate: показати кешовані дані, потім оновити їх у фоні",
      "Server Write Replication",
      "State With Reducers",
    ],
    answer: 0,
    explanation:
      "Стратегія прийшла з розширення HTTP `Cache-Control`: одразу повернути застарілі дані заради швидкості, перевірити у фоні й оновити UI. Бібліотека SWR від Vercel побудована навколо неї.",
    sources: ["swr-intro", "webdev-swr"],
  },
  {
    question: "Які аргументи в `useSWR(key, fetcher)`?",
    options: [
      "Унікальний ключ (часто URL) і функція, яка завантажує дані",
      "Редʼюсер і початковий стан",
      "HTTP-метод і тіло запиту",
    ],
    answer: 0,
    explanation:
      "`const { data, error, isLoading } = useSWR('/api/user', fetcher)`. Ключ ідентифікує запис у кеші: усі компоненти з одним ключем ділять один запит і одне закешоване значення.",
    sources: ["swr-intro"],
  },

  // ---------- React Router loader / action ----------
  {
    question: "Що таке `loader` у React Router?",
    options: [
      "Функція, яка завантажує дані маршруту до його рендера",
      "Компонент-спінер, що показується під час завантаження сторінки",
      "Функція, яка ліниво завантажує JS-код маршруту",
    ],
    answer: 0,
    explanation:
      "Роутер викликає loader під час навігації, а компонент читає результат через `useLoaderData()` (або через пропси у framework mode). Завантаження даних починається разом із навігацією, а не після рендера, що прибирає водоспади запитів.",
    sources: ["rr-data-loading", "rr-route-object"],
  },
  {
    question: "Що таке `action` у React Router?",
    options: [
      "Функція, яка обробляє зміну даних під час надсилання `<Form>`",
      "Redux-дія, що надсилається під час навігації",
      "Обробник кліку, прив'язаний до `<Link>`",
    ],
    answer: 0,
    explanation:
      "`<Form method=\"post\">` викликає `action` маршруту з даними форми. Після action роутер автоматично перевіряє loader'и сторінки, і UI показує свіжі дані без ручного оновлення кешу.",
    sources: ["rr-actions"],
  },
];

export default questions;
