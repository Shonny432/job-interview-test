import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Что такое React?",
    options: [
      "Полноценный фреймворк с роутингом, HTTP-клиентом и ORM из коробки",
      "Библиотека для построения интерфейсов из компонентов",
      "Язык программирования, который компилируется в JavaScript",
    ],
    answer: 1,
    explanation:
      "React отвечает только за UI: описывает интерфейс как функцию от состояния и эффективно обновляет DOM. Роутинг, загрузку данных и прочее добавляют библиотеками (React Router, TanStack Query) или фреймворками поверх React (Next.js). JSX — это расширение синтаксиса JavaScript, а не отдельный язык.",
    sources: ["react-learn", "react-thinking"],
  },
  {
    question: "Что такое виртуальный DOM в React?",
    options: [
      "Скрытая копия браузерного движка, в которой React рендерит страницу заранее",
      "JS-описание UI: React сравнивает его с прошлым и меняет в DOM только разницу",
      "Встроенный в браузеры API, который ускоряет любые операции с DOM-деревом",
    ],
    answer: 1,
    explanation:
      "При рендере компоненты возвращают дерево React-элементов — обычных JS-объектов. React сравнивает новое дерево с предыдущим (reconciliation) и вносит в настоящий DOM минимальные изменения. Это не браузерный API и не копия браузера.",
    sources: ["react-render-commit", "react-legacy-reconciliation"],
  },
  {
    question: "Во что превращается JSX при сборке?",
    options: [
      "В HTML-строку, которую React затем вставляет в страницу через `innerHTML`",
      "В вызовы функций, создающих React-элементы (`jsx()`)",
      "В шаблоны `<template>`, которые браузер разбирает при загрузке страницы",
    ],
    answer: 1,
    explanation:
      "`<h1 className=\"t\">Hi</h1>` компилируется (Babel, SWC, TypeScript) в вызов вроде `jsx(\"h1\", { className: \"t\", children: \"Hi\" })`, который возвращает объект-описание. Браузер JSX не понимает, а `innerHTML` React не использует — поэтому строки в JSX автоматически экранируются.",
    sources: ["react-jsx"],
  },
  {
    question: "Как правильно задать CSS-класс элементу в JSX?",
    options: ["`<div class=\"box\">`", "`<div className=\"box\">`", "`<div cssClass=\"box\">`"],
    answer: 1,
    explanation:
      "JSX ближе к JavaScript, а `class` — зарезервированное слово, поэтому атрибуты называются как DOM-свойства: `className`, `htmlFor` вместо `for`, `tabIndex`, `onClick`. Атрибуты `data-*` и `aria-*` пишутся как в HTML.",
    sources: ["react-jsx", "react-dom-common"],
  },
  {
    question: "Почему внутри JSX нельзя написать `{if (isAdmin) { <Admin /> }}`?",
    options: [
      "В фигурных скобках допустимы только выражения, а `if` — это инструкция",
      "Потому что `if` в React заменён специальным компонентом `<If>`",
      "Можно, но только внутри компонентов-классов",
    ],
    answer: 0,
    explanation:
      "В `{}` можно вставить любое JS-выражение, которое возвращает значение: переменную, вызов функции, тернарник `cond ? a : b`, `cond && a`. Инструкции (`if`, `for`) используются вне JSX — до `return` или в отдельной функции. Компонента `<If>` в React нет.",
    sources: ["react-conditional", "react-jsx"],
  },
  {
    question: "Почему компонент `function card() { ... }` не работает как `<card />`?",
    options: [
      "Компоненты нужно объявлять только стрелочными функциями, а не `function`",
      "JSX считает имена с маленькой буквы HTML-тегами",
      "Компоненту обязательно нужен `export default`, иначе JSX его не найдёт",
    ],
    answer: 1,
    explanation:
      "JSX различает теги по регистру: `<card />` превратится в DOM-элемент `card`, а `<Card />` — в вызов вашего компонента. Форма объявления (function или стрелка) и способ экспорта роли не играют.",
    sources: ["react-learn", "react-jsx"],
  },
  {
    question: "Как вернуть из компонента два соседних элемента без лишней обёртки в DOM?",
    options: [
      "Вернуть массив без ключей: `return [<A />, <B />]`",
      "Обернуть их во фрагмент: `<>...</>` или `<Fragment>`",
      "Это невозможно — компонент всегда добавляет `<div>`",
    ],
    answer: 1,
    explanation:
      "Компонент должен возвращать один корень. Фрагмент группирует элементы, не добавляя узел в DOM. Если фрагменту нужен `key` (например, в списке), пишут полную форму `<Fragment key={id}>`. Массив тоже допустим, но каждому элементу нужен `key`, иначе будет предупреждение.",
    sources: ["react-fragment", "react-jsx"],
  },
  {
    question: "Можно ли изменять props внутри дочернего компонента?",
    options: [
      "Можно: React заметит изменение и перерендерит родительский компонент",
      "Нельзя: props только для чтения, менять данные должен их владелец",
      "Можно, если prop — объект или массив, а не примитивное значение",
    ],
    answer: 1,
    explanation:
      "Props — входные данные компонента, он не должен их мутировать. Чтобы ребёнок мог изменить данные, родитель передаёт ему колбэк (`onChange`), а сам хранит состояние. Мутация объекта из props не вызовет перерендер и создаст трудноуловимые баги.",
    sources: ["react-props", "react-pure"],
  },
  {
    question: "Как дочерний компонент может передать данные родителю?",
    options: [
      "Родитель передаёт колбэк через props, ребёнок вызывает его с данными",
      "Ребёнок изменяет объект props, и родитель видит новое значение",
      "Через `this.parent.setState()` внутри дочернего компонента",
    ],
    answer: 0,
    explanation:
      "Данные в React текут сверху вниз, а события — снизу вверх через функции: `<Search onChange={setQuery} />`, и ребёнок вызывает `props.onChange(value)`. Мутация props не вызовет рендер родителя, а доступа к экземпляру родителя у функциональных компонентов нет.",
    sources: ["react-sharing-state", "react-events"],
  },
  {
    question: "Что такое `children` в React?",
    options: [
      "Prop с содержимым, переданным между тегами компонента",
      "Глобальный массив всех дочерних компонентов текущего приложения",
      "Встроенный хук для доступа к вложенным DOM-элементам компонента",
    ],
    answer: 0,
    explanation:
      "`<Card><h2>Title</h2></Card>` передаст `<h2>` в `props.children`. Это основа композиции: обёртки, лэйауты, модалки принимают произвольное содержимое. `children` может быть строкой, элементом, массивом или функцией (паттерн render props).",
    sources: ["react-props"],
  },
  {
    question: "Что возвращает `useState(0)`?",
    options: [
      "Объект `{ value, setValue }`",
      "Массив из текущего значения и функции для его обновления",
      "Только текущее значение, обновление — через `this.setState`",
    ],
    answer: 1,
    explanation:
      "`const [count, setCount] = useState(0)` — деструктуризация массива позволяет назвать переменные как угодно. Начальное значение используется только при первом рендере. Если его вычисление дорогое, передают функцию: `useState(() => compute())`.",
    sources: ["react-useState", "react-state-memory"],
  },
  {
    question: "Что выведет `console.log` после клика?",
    code: `const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count);
}`,
    options: ["`1`", "`0`", "`undefined`"],
    answer: 1,
    explanation:
      "Состояние в рамках рендера — это «снимок». `setCount` планирует новый рендер, но переменная `count` в текущей функции остаётся прежней. Новое значение будет доступно при следующем рендере. Если нужно значение сразу, вычислите его в переменную: `const next = count + 1`.",
    sources: ["react-state-snapshot", "react-useState"],
  },
  {
    question: "Чему будет равен `count` после одного клика, если начальное значение 0?",
    code: `function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}`,
    options: ["`3`", "`1`", "`0`"],
    answer: 1,
    explanation:
      "Все три вызова видят один и тот же снимок `count = 0` и трижды ставят в очередь значение `1`. Чтобы обновления складывались, используйте функциональную форму: `setCount(c => c + 1)` — каждый вызов получит результат предыдущего, и итог будет 3.",
    sources: ["react-queueing-updates", "react-useState"],
  },
  {
    question: "Почему компонент не перерисовался?",
    code: `const [user, setUser] = useState({ name: "Ann" });

function rename() {
  user.name = "Bob";
  setUser(user);
}`,
    options: [
      "`setUser` нельзя вызывать в обработчиках событий — только в эффектах",
      "Объект мутирован, ссылка та же — `Object.is` не видит изменений",
      "В `useState` нельзя хранить объекты — только примитивные значения",
    ],
    answer: 1,
    explanation:
      "React сравнивает новое значение со старым через `Object.is`. Это тот же объект, поэтому обновление пропускается. Нужно создать новый объект: `setUser({ ...user, name: \"Bob\" })`. Мутация ещё и ломает оптимизации вроде `memo`.",
    sources: ["react-updating-objects", "react-useState"],
  },
  {
    question: "Как правильно добавить элемент в массив в состоянии?",
    options: [
      "`items.push(item); setItems(items);`",
      "`setItems([...items, item]);`",
      "`setItems(items.concat).push(item);`",
    ],
    answer: 1,
    explanation:
      "Состояние нужно обновлять иммутабельно — создавать новый массив. `push` мутирует существующий массив, и ссылка не меняется. Немутирующие методы: spread, `concat`, `filter`, `map`, `slice`, `toSorted()`. Удаление — `items.filter(i => i.id !== id)`.",
    sources: ["react-updating-arrays"],
  },
  {
    question: "Какое значение лучше всего подходит для `key` в списке?",
    options: [
      "Индекс элемента в массиве — он всегда уникален в пределах списка",
      "Стабильный уникальный идентификатор из данных, например `id`",
      "`Math.random()` или `crypto.randomUUID()` при каждом рендере",
    ],
    answer: 1,
    explanation:
      "`key` помогает React сопоставить элементы между рендерами. Индекс ломается при вставке, удалении и сортировке: состояние и DOM полей «переезжают» к другим элементам. Случайный ключ меняется каждый рендер — React будет пересоздавать все элементы и терять их состояние.",
    sources: ["react-lists", "react-preserving-state"],
  },
  {
    question: "Что отрендерится, если `items = []`?",
    code: `<div>{items.length && <List items={items} />}</div>`,
    options: ["Ничего не отрендерится", "Отрендерится цифра `0`", "Отрендерится текст `false`"],
    answer: 1,
    explanation:
      "`0 && x` возвращает `0`, а React рендерит числа как текст (в отличие от `false`, `null`, `undefined`). Пишите явное булево условие: `items.length > 0 && ...` или тернарник `items.length ? <List /> : null`.",
    sources: ["react-conditional"],
  },
  {
    question: "В чём ошибка: `<button onClick={handleClick()}>`?",
    options: [
      "Ошибки нет, это стандартная запись",
      "Функция вызовется сразу при рендере, а не по клику",
      "В JSX обработчики пишутся строкой: `onClick=\"handleClick()\"`",
    ],
    answer: 1,
    explanation:
      "В `onClick` нужно передать функцию, а не результат её вызова. Правильно: `onClick={handleClick}` или `onClick={() => handleClick(id)}`, если нужны аргументы. Если внутри `handleClick` меняется состояние, вызов при рендере приведёт к бесконечному циклу.",
    sources: ["react-events"],
  },
  {
    question: "Как отменить стандартное поведение отправки формы в React?",
    options: [
      "Вернуть `false` из обработчика `onSubmit` формы",
      "Вызвать `e.preventDefault()` в обработчике `onSubmit`",
      "Добавить атрибут `noSubmit` к тегу `<form>` в JSX",
    ],
    answer: 1,
    explanation:
      "В React обработчики получают синтетическое событие с тем же API, что и нативное. `return false`, как в старых inline-обработчиках HTML, здесь не работает. Остановить всплытие можно через `e.stopPropagation()`.",
    sources: ["react-events"],
  },
  {
    question: "Что такое управляемый (controlled) input?",
    options: [
      "Поле, значение которого хранится в state: `value` + `onChange`",
      "Поле, которым управляет браузер, а React читает его значение через `ref`",
      "Поле с атрибутом `required`, которое контролирует браузерная валидация",
    ],
    answer: 0,
    explanation:
      "В управляемом поле источник правды — state: `value={text}` и `onChange={e => setText(e.target.value)}`. Так легко валидировать и форматировать ввод на лету. Неуправляемое поле хранит значение в DOM (`defaultValue`, чтение через `ref` или `FormData`).",
    sources: ["react-input"],
  },
  {
    question: "React предупреждает: «You provided a `value` prop to a form field without an `onChange` handler». Что случилось?",
    options: [
      "Поле стало только для чтения: `value` задан, а `onChange` нет",
      "Управляемое поле нельзя использовать внутри тега `<form>`",
      "Значение `value` должно быть числом, а передана строка",
    ],
    answer: 0,
    explanation:
      "Если задать `value` без `onChange`, React будет каждый рендер возвращать полю это значение, и пользователь не сможет ввести текст. Решения: добавить `onChange`, использовать `defaultValue` для неуправляемого поля или явно указать `readOnly`.",
    sources: ["react-input"],
  },
  {
    question: "Двум соседним компонентам нужны одни и те же данные, которые они могут менять. Что сделать в первую очередь?",
    options: [
      "Скопировать состояние в оба компонента и синхронизировать их через `useEffect`",
      "Поднять состояние в общего родителя и передать значение и колбэки через props",
      "Сразу подключить Redux",
    ],
    answer: 1,
    explanation:
      "Lifting state up — базовый приём: у данных должен быть один источник правды в ближайшем общем предке. Дублирование состояния с синхронизацией через эффекты ведёт к рассинхрону и лишним рендерам. Глобальные хранилища нужны, когда состояние действительно используется во многих местах дерева.",
    sources: ["react-sharing-state"],
  },
  {
    question: "Что такое prop drilling?",
    options: [
      "Проброс props через промежуточные компоненты, которым они не нужны",
      "Проверка типов props во время выполнения через `PropTypes`",
      "Способ оптимизации рендера: передача props через `React.memo`",
    ],
    answer: 0,
    explanation:
      "Когда данные из корня нужны глубоко внизу, их приходится прокидывать через каждый уровень. Это неудобно, но не всегда проблема. Решения: композиция (передавать готовые элементы через `children`), Context, глобальные хранилища.",
    sources: ["react-context-learn", "react-sharing-state"],
  },
  {
    question: "Когда выполнится эффект `useEffect(() => { ... }, [])`?",
    options: [
      "Перед каждым рендером компонента, чтобы подготовить данные",
      "После монтирования (в dev со StrictMode — дважды)",
      "Только при размонтировании компонента, как `componentWillUnmount`",
    ],
    answer: 1,
    explanation:
      "Пустой массив зависимостей означает «синхронизироваться после монтирования». Эффекты всегда выполняются после отрисовки, а не до. В режиме разработки StrictMode монтирует, размонтирует и снова монтирует компонент, чтобы проверить, что очистка эффекта написана правильно.",
    sources: ["react-useEffect", "react-strict-mode"],
  },
  {
    question: "Когда выполняется эффект без массива зависимостей: `useEffect(() => { ... })`?",
    options: [
      "Только один раз — сразу после монтирования компонента",
      "После каждого рендера компонента",
      "Никогда: без массива зависимостей эффект не запустится",
    ],
    answer: 1,
    explanation:
      "Без второго аргумента эффект запускается после каждого рендера. С `[]` — только после монтирования. С `[a, b]` — после монтирования и при изменении `a` или `b` (сравнение через `Object.is`).",
    sources: ["react-useEffect", "react-sync-effects"],
  },
  {
    question: "Когда вызывается функция, возвращённая из `useEffect`?",
    options: [
      "Перед повторным запуском эффекта и при размонтировании",
      "Сразу после выполнения эффекта, в том же кадре",
      "Только если внутри эффекта было выброшено исключение",
    ],
    answer: 0,
    explanation:
      "Функция очистки (cleanup) убирает то, что настроил эффект: отписывается от событий, очищает таймеры, отменяет запросы. React вызывает её перед следующим запуском эффекта с новыми зависимостями и при удалении компонента.",
    sources: ["react-useEffect", "react-sync-effects"],
  },
  {
    question: "Чем `useRef` отличается от `useState`?",
    options: [
      "Изменение `ref.current` не вызывает повторный рендер",
      "`useRef` можно использовать только для ссылок на DOM",
      "Значение `useRef` сбрасывается при каждом рендере",
    ],
    answer: 0,
    explanation:
      "`useRef` хранит изменяемое значение между рендерами, не вызывая перерисовку. Его используют для ссылок на DOM (`<input ref={inputRef}>`), id таймеров, предыдущих значений. Если значение влияет на то, что видно на экране, оно должно быть в state.",
    sources: ["react-useRef", "react-refs-learn"],
  },
  {
    question: "Какое правило хуков нарушено?",
    code: `function Profile({ id }) {
  if (!id) return null;
  const [data, setData] = useState(null);
  // ...
}`,
    options: [
      "Хуки нельзя использовать в компонентах, которые принимают props",
      "Хук вызывается после условного `return` — порядок хуков меняется",
      "Нарушений нет: ранний `return` с хуками разрешён",
    ],
    answer: 1,
    explanation:
      "React сопоставляет состояние с хуками по порядку их вызова. Если при одном рендере хук не вызывается (из-за раннего `return`, условия или цикла), порядок сбивается. Хуки нужно вызывать на верхнем уровне, до любых условных выходов.",
    sources: ["react-rules-of-hooks"],
  },
  {
    question: "Почему пользовательский хук должен называться с префикса `use`?",
    options: [
      "Иначе бандлер не сможет экспортировать его из модуля",
      "Так линтер и React понимают, что внутри есть хуки",
      "Префикс `use` включает автоматическую мемоизацию результата",
    ],
    answer: 1,
    explanation:
      "Префикс `use` — соглашение, на которое опираются `eslint-plugin-react-hooks` и React Compiler. Сам по себе он ничего не мемоизирует. Функция без хуков внутри не должна называться `use...` — это обычная утилита.",
    sources: ["react-custom-hooks", "react-rules-of-hooks"],
  },
  {
    question: "Когда дочерний компонент перерисовывается по умолчанию?",
    options: [
      "Только когда меняются его props (по ссылке)",
      "Когда перерисовывается родитель, даже если props те же",
      "Только когда меняется его собственный state или context",
    ],
    answer: 1,
    explanation:
      "Рендер родителя по умолчанию рендерит всё поддерево. Ещё причины: изменение своего состояния и изменение контекста, который читает компонент. Пропустить рендер при одинаковых props позволяет `React.memo` (или автоматически — React Compiler). Перерендер не равен изменению DOM: DOM меняется только при разнице.",
    sources: ["react-render-commit", "react-memo"],
  },
  {
    question: "Как правильно задать inline-стиль в JSX?",
    options: [
      "`style=\"color: red; font-size: 14px\"`",
      "`style={{ color: \"red\", fontSize: 14 }}`",
      "`style={[\"color: red\", \"font-size: 14px\"]}`",
    ],
    answer: 1,
    explanation:
      "`style` принимает объект с camelCase-свойствами. Внешние скобки — вставка выражения, внутренние — объектный литерал. Числовые значения для большинства свойств интерпретируются как пиксели (`fontSize: 14` → `14px`).",
    sources: ["react-dom-common"],
  },
  {
    question: "Какие шаги нужны, чтобы передать данные через Context?",
    options: [
      "`createContext` → провайдер со `value` → `useContext` в потомке",
      "Объявить глобальную переменную в модуле и импортировать её в компонентах",
      "Передать данные в `children` каждого компонента на пути вниз",
    ],
    answer: 0,
    explanation:
      "`const ThemeContext = createContext('light')` → `<ThemeContext value={theme}>` (в React 19 можно без `.Provider`) → `useContext(ThemeContext)` в любом потомке. При изменении `value` перерисуются все компоненты, читающие этот контекст.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "Что вернёт `useContext(MyContext)`, если над компонентом нет провайдера?",
    options: [
      "Всегда `undefined`, значение по умолчанию игнорируется",
      "Значение по умолчанию из `createContext(defaultValue)`",
      "React выбросит ошибку «Provider is missing»",
    ],
    answer: 1,
    explanation:
      "Значение по умолчанию используется, когда провайдера выше по дереву нет. Часто его делают `null` и пишут хук-обёртку, который выбрасывает понятную ошибку: «useAuth must be used within AuthProvider».",
    sources: ["react-useContext", "react-context-learn"],
  },
  {
    question: "Зачем `<StrictMode>` в режиме разработки вызывает рендер и эффекты дважды?",
    options: [
      "Чтобы прогреть кэш и ускорить первую загрузку страницы",
      "Чтобы выявить нечистые рендеры и эффекты без очистки",
      "Это известный баг React 18, StrictMode лучше отключать",
    ],
    answer: 1,
    explanation:
      "Двойной вызов помогает найти побочные эффекты при рендере (мутации, запросы) и забытую очистку в эффектах. В продакшен-сборке этого не происходит. Если двойной вызов что-то ломает — значит, в коде есть баг, который проявится и позже.",
    sources: ["react-strict-mode", "react-pure"],
  },
  {
    question: "Для чего используют `React.lazy`?",
    options: [
      "Для отложенной загрузки кода компонента отдельным чанком",
      "Для отложенного рендера компонента до появления в viewport",
      "Для отложенного обновления состояния",
    ],
    answer: 0,
    explanation:
      "`const Admin = lazy(() => import('./Admin'))` выносит компонент в отдельный JS-чанк, который загружается при первом рендере. Это уменьшает начальный бандл. Отображение по мере прокрутки — другая задача (Intersection Observer).",
    sources: ["react-lazy", "mdn-dynamic-import"],
  },
  {
    question: "Что нужно, чтобы `React.lazy` работал?",
    options: [
      "Обернуть его (или предка) в `<Suspense fallback>`",
      "Вызвать `lazy` внутри `useEffect` после монтирования",
      "Добавить к ленивому компоненту атрибут `async`",
    ],
    answer: 0,
    explanation:
      "Пока код грузится, компонент «приостанавливается», и ближайший `<Suspense>` показывает `fallback`. Объявлять `lazy` нужно на уровне модуля, а не внутри компонента — иначе при каждом рендере будет новый компонент с потерей состояния. Модуль должен иметь `default`-экспорт.",
    sources: ["react-lazy", "react-suspense"],
  },
  {
    question: "Почему `lazy(() => import('./Chart'))` выдаёт ошибку, если в `Chart.tsx` только `export function Chart`?",
    options: [
      "`lazy` ожидает модуль с `default`-экспортом",
      "`lazy` не поддерживает TypeScript-файлы `.tsx`",
      "Компонент для `lazy` должен быть классовым",
    ],
    answer: 0,
    explanation:
      "Промис из `import()` должен разрешиться объектом с полем `default`. Для именованного экспорта используют преобразование: `lazy(() => import('./Chart').then(m => ({ default: m.Chart })))`. TypeScript и функциональные компоненты поддерживаются полностью.",
    sources: ["react-lazy"],
  },
  {
    question: "Чем опасен `dangerouslySetInnerHTML`?",
    options: [
      "Он замедляет рендер в десятки раз из-за парсинга",
      "Он вставляет HTML без экранирования — это риск XSS",
      "Он работает только в классовых компонентах React",
    ],
    answer: 1,
    explanation:
      "Обычно React экранирует строки, поэтому `{userInput}` безопасен. `dangerouslySetInnerHTML={{ __html }}` вставляет разметку как есть, и `<img onerror=...>` из пользовательских данных выполнит скрипт. Если HTML действительно нужен (например, из CMS), его очищают санитайзером (DOMPurify).",
    sources: ["react-dom-common", "mdn-xss"],
  },
  {
    question: "Как в React 18+ подключить приложение к DOM-элементу?",
    options: [
      "`ReactDOM.render(<App />, el)`",
      "`createRoot(el).render(<App />)`",
      "`React.mount(<App />, el)`",
    ],
    answer: 1,
    explanation:
      "`createRoot` из `react-dom/client` включает concurrent-возможности React 18+. `ReactDOM.render` устарел и удалён в React 19. Для гидратации HTML, отрендеренного на сервере, используют `hydrateRoot`. Во фреймворках вроде Next.js это делается автоматически.",
    sources: ["react-createRoot", "react-18"],
  },
  {
    question: "Что такое «чистый» компонент в терминах React?",
    options: [
      "Компонент без стилей и без побочных CSS-зависимостей",
      "Компонент без побочных эффектов в рендере и с одинаковым JSX",
      "Любой компонент, унаследованный от `React.PureComponent`",
    ],
    answer: 1,
    explanation:
      "Рендер должен быть чистым вычислением: никаких мутаций внешних переменных, запросов или изменения DOM. Побочные эффекты делают в обработчиках событий или в `useEffect`. На чистоте основаны StrictMode, concurrent-рендеринг и React Compiler.",
    sources: ["react-pure"],
  },
  {
    question: "Как отрендерить список пользователей из массива `users`?",
    options: [
      "`{users.forEach(u => <li key={u.id}>{u.name}</li>)}`",
      "`{users.map(u => <li key={u.id}>{u.name}</li>)}`",
      "`{for (const u of users) <li>{u.name}</li>}`",
    ],
    answer: 1,
    explanation:
      "`map` возвращает новый массив элементов, который React отрендерит. `forEach` возвращает `undefined`, поэтому ничего не появится. `for` — инструкция, её нельзя писать внутри `{}`. И не забудьте `key`.",
    sources: ["react-lists"],
  },
  {
    question: "Что такое Redux?",
    options: [
      "Библиотека для запросов к REST API с кэшированием ответов",
      "Хранилище глобального состояния: store, actions, reducers",
      "Встроенный в React хук для глобального состояния приложения",
    ],
    answer: 1,
    explanation:
      "В Redux состояние хранится в одном store, изменяется только через dispatch действий, а новое состояние вычисляют чистые функции-редьюсеры. Это даёт предсказуемость, удобную отладку (Redux DevTools, time travel) и middleware. Redux — отдельная библиотека, к React его подключают через `react-redux`.",
    sources: ["redux-essentials"],
  },
  {
    question: "Какое требование к reducer в классическом Redux (без Immer)?",
    options: [
      "Быть чистым и возвращать новое состояние без мутаций",
      "Быть асинхронным и самостоятельно делать запросы к API",
      "Напрямую менять `state` и ничего не возвращать",
    ],
    answer: 0,
    explanation:
      "`(state, action) => newState` без побочных эффектов: никаких запросов, случайных чисел и мутаций. Асинхронность выносят в thunks или RTK Query. В Redux Toolkit можно писать «мутирующий» код — Immer под капотом превращает его в иммутабельные обновления.",
    sources: ["redux-essentials", "redux-style-guide"],
  },
  {
    question: "Что делает `configureStore` из Redux Toolkit?",
    options: [
      "Создаёт store с настройками по умолчанию: thunk, DevTools",
      "Генерирует редьюсеры и экшены по описанию схемы данных",
      "Подключает store к React-компонентам без `<Provider>`",
    ],
    answer: 0,
    explanation:
      "`configureStore({ reducer: { todos: todosReducer } })` объединяет редьюсеры, добавляет middleware `redux-thunk`, подключает Redux DevTools и в режиме разработки проверяет случайные мутации и несериализуемые значения. Подключение к React всё равно делается через `<Provider store={store}>`.",
    sources: ["rtk-configureStore", "redux-why-rtk"],
  },
  {
    question: "Для чего нужны `useSelector` и `useDispatch`?",
    options: [
      "`useSelector` читает данные из store, `useDispatch` даёт `dispatch`",
      "`useSelector` ищет DOM-элемент, `useDispatch` вызывает DOM-событие",
      "Оба хука создают отдельный локальный store для компонента",
    ],
    answer: 0,
    explanation:
      "`const todos = useSelector(state => state.todos)` перерисует компонент, только если результат селектора изменился (сравнение по ссылке). `const dispatch = useDispatch(); dispatch(added(todo))`. В TypeScript-проектах создают типизированные версии `useAppSelector` и `useAppDispatch`.",
    sources: ["react-redux-hooks"],
  },
  {
    question: "Что генерирует `createSlice`?",
    options: [
      "Только reducer, а action creators нужно писать вручную",
      "Reducer и action creators для каждого case reducer",
      "React-компонент и хук для отображения состояния слайса",
    ],
    answer: 1,
    explanation:
      "`createSlice({ name: 'todos', initialState, reducers: { added(state, action) {...} } })` возвращает `todosSlice.reducer` и `todosSlice.actions.added` с типом `'todos/added'`. Это убирает бойлерплейт классического Redux с константами типов и switch.",
    sources: ["rtk-createSlice"],
  },
  {
    question: "Какую задачу в первую очередь решает TanStack Query?",
    options: [
      "Серверное состояние: загрузка, кэш, фоновое обновление данных",
      "Маршрутизация между страницами с предзагрузкой данных",
      "Глобальное UI-состояние: открыта ли модалка, текущая тема",
    ],
    answer: 0,
    explanation:
      "Серверные данные живут на бэкенде и могут устареть. TanStack Query берёт на себя кэш, повторные запросы, дедупликацию, обновление при фокусе окна, пагинацию и мутации. Клиентское UI-состояние остаётся в `useState`, Context или Zustand/Redux.",
    sources: ["tq-overview"],
  },
  {
    question: "Что обязательно передать в `useQuery`?",
    options: [
      "`url`, `method` и `headers`",
      "`queryKey` и `queryFn`",
      "`store`, `reducer` и `action`",
    ],
    answer: 1,
    explanation:
      "`useQuery({ queryKey: ['todos', id], queryFn: () => fetchTodo(id) })`. Ключ идентифицирует данные в кэше: всё, от чего зависит запрос, должно быть в ключе — тогда при смене `id` запрос выполнится заново. `queryFn` — любая функция, возвращающая промис, библиотека не привязана к `fetch`.",
    sources: ["tq-queries", "tq-query-keys"],
  },
  {
    question: "Чем в TanStack Query v5 отличаются `isPending` и `isFetching`?",
    options: [
      "Это синонимы: оба true, пока идёт запрос",
      "`isPending` — данных ещё нет, `isFetching` — идёт любой запрос",
      "`isPending` — запрос упал с ошибкой, `isFetching` — завершился успешно",
    ],
    answer: 1,
    explanation:
      "`isPending` (статус `pending`) означает, что данных в кэше пока нет — показываем скелетон. `isFetching` true при каждом запросе, включая фоновое обновление уже имеющихся данных — тут подходит маленький индикатор. В v4 вместо `isPending` был `isLoading`.",
    sources: ["tq-queries"],
  },
  {
    question: "Что нужно сделать перед использованием `useQuery` в приложении?",
    options: [
      "Создать `QueryClient` и обернуть приложение в провайдер",
      "Ничего: `useQuery` сам создаёт глобальный кэш при первом вызове",
      "Подключить Redux store, в котором TanStack Query хранит кэш",
    ],
    answer: 0,
    explanation:
      "`QueryClient` хранит кэш и настройки по умолчанию, а провайдер делает его доступным хукам. Клиент создают один раз (вне компонента или через `useState`), иначе кэш будет сбрасываться при каждом рендере. Redux для TanStack Query не нужен.",
    sources: ["tq-overview"],
  },
];

export default questions;
