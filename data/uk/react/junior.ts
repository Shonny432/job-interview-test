import type { Question } from "@/lib/quiz/types";

const questions: Question[] = [
  {
    question: "Що таке React?",
    options: [
      "Повноцінний фреймворк із роутингом, HTTP-клієнтом і ORM з коробки",
      "Бібліотека для побудови інтерфейсів із компонентів",
      "Мова програмування, яка компілюється в JavaScript",
    ],
    answer: 1,
    explanation:
      "React відповідає лише за UI: описує інтерфейс як функцію від стану й ефективно оновлює DOM. Роутинг, завантаження даних тощо додають бібліотеками (React Router, TanStack Query) або фреймворками поверх React (Next.js). JSX — це розширення синтаксису JavaScript, а не окрема мова.",
    sources: ["react-learn", "react-thinking"],
  },
  {
    question: "Що таке віртуальний DOM у React?",
    options: [
      "Прихована копія браузерного рушія, у якій React рендерить сторінку заздалегідь",
      "JS-опис UI: React порівнює його з попереднім і змінює в DOM лише різницю",
      "Вбудований у браузери API, що пришвидшує будь-які операції з DOM-деревом",
    ],
    answer: 1,
    explanation:
      "Під час рендеру компоненти повертають дерево React-елементів — звичайних JS-об'єктів. React порівнює нове дерево з попереднім (reconciliation) і вносить у справжній DOM мінімальні зміни. Це не браузерний API і не копія браузера.",
    sources: ["react-render-commit", "react-legacy-reconciliation"],
  },
  {
    question: "На що перетворюється JSX під час збирання?",
    options: [
      "На HTML-рядок, який React потім вставляє на сторінку через `innerHTML`",
      "На виклики функцій, що створюють React-елементи (`jsx()`)",
      "На шаблони `<template>`, які браузер розбирає під час завантаження сторінки",
    ],
    answer: 1,
    explanation:
      "`<h1 className=\"t\">Hi</h1>` компілюється (Babel, SWC, TypeScript) у виклик на кшталт `jsx(\"h1\", { className: \"t\", children: \"Hi\" })`, який повертає об'єкт-опис. Браузер JSX не розуміє, а `innerHTML` React не використовує — тому рядки в JSX автоматично екрануються.",
    sources: ["react-jsx"],
  },
  {
    question: "Як правильно задати CSS-клас елементу в JSX?",
    options: ["`<div class=\"box\">`", "`<div className=\"box\">`", "`<div cssClass=\"box\">`"],
    answer: 1,
    explanation:
      "JSX ближчий до JavaScript, а `class` — зарезервоване слово, тому атрибути називаються як DOM-властивості: `className`, `htmlFor` замість `for`, `tabIndex`, `onClick`. Атрибути `data-*` і `aria-*` пишуться як у HTML.",
    sources: ["react-jsx", "react-dom-common"],
  },
  {
    question: "Чому всередині JSX не можна написати `{if (isAdmin) { <Admin /> }}`?",
    options: [
      "У фігурних дужках допустимі лише вирази, а `if` — це інструкція",
      "Бо `if` у React замінено спеціальним компонентом `<If>`",
      "Можна, але лише всередині компонентів-класів",
    ],
    answer: 0,
    explanation:
      "У `{}` можна вставити будь-який JS-вираз, що повертає значення: змінну, виклик функції, тернарник `cond ? a : b`, `cond && a`. Інструкції (`if`, `for`) використовують поза JSX — до `return` або в окремій функції. Компонента `<If>` у React немає.",
    sources: ["react-conditional", "react-jsx"],
  },
  {
    question: "Чому компонент `function card() { ... }` не працює як `<card />`?",
    options: [
      "Компоненти треба оголошувати лише стрілковими функціями, а не `function`",
      "JSX вважає імена з малої літери HTML-тегами",
      "Компоненту обов'язково потрібен `export default`, інакше JSX його не знайде",
    ],
    answer: 1,
    explanation:
      "JSX розрізняє теги за регістром: `<card />` перетвориться на DOM-елемент `card`, а `<Card />` — на виклик вашого компонента. Форма оголошення (function чи стрілка) і спосіб експорту ролі не відіграють.",
    sources: ["react-learn", "react-jsx"],
  },
  {
    question: "Як повернути з компонента два сусідні елементи без зайвої обгортки в DOM?",
    options: [
      "Повернути масив без ключів: `return [<A />, <B />]`",
      "Обгорнути їх у фрагмент: `<>...</>` або `<Fragment>`",
      "Це неможливо — компонент завжди додає `<div>`",
    ],
    answer: 1,
    explanation:
      "Компонент має повертати один корінь. Фрагмент групує елементи, не додаючи вузол у DOM. Якщо фрагменту потрібен `key` (наприклад, у списку), пишуть повну форму `<Fragment key={id}>`. Масив теж допустимий, але кожному елементу потрібен `key`, інакше буде попередження.",
    sources: ["react-fragment", "react-jsx"],
  },
  {
    question: "Чи можна змінювати props усередині дочірнього компонента?",
    options: [
      "Можна: React помітить зміну й перерендерить батьківський компонент",
      "Не можна: props лише для читання, змінювати дані має їхній власник",
      "Можна, якщо prop — об'єкт або масив, а не примітивне значення",
    ],
    answer: 1,
    explanation:
      "Props — вхідні дані компонента, він не повинен їх мутувати. Щоб дитина могла змінити дані, батько передає їй колбек (`onChange`), а сам зберігає стан. Мутація об'єкта з props не спричинить перерендер і створить важковловимі баги.",
    sources: ["react-props", "react-pure"],
  },
  {
    question: "Як дочірній компонент може передати дані батькові?",
    options: [
      "Батько передає колбек через props, дитина викликає його з даними",
      "Дитина змінює об'єкт props, і батько бачить нове значення",
      "Через `this.parent.setState()` усередині дочірнього компонента",
    ],
    answer: 0,
    explanation:
      "Дані в React течуть згори вниз, а події — знизу вгору через функції: `<Search onChange={setQuery} />`, і дитина викликає `props.onChange(value)`. Мутація props не спричинить рендер батька, а доступу до екземпляра батька у функціональних компонентів немає.",
    sources: ["react-sharing-state", "react-events"],
  },
  {
    question: "Що таке `children` у React?",
    options: [
      "Prop із вмістом, переданим між тегами компонента",
      "Глобальний масив усіх дочірніх компонентів поточного застосунку",
      "Вбудований хук для доступу до вкладених DOM-елементів компонента",
    ],
    answer: 0,
    explanation:
      "`<Card><h2>Title</h2></Card>` передасть `<h2>` у `props.children`. Це основа композиції: обгортки, лейаути, модалки приймають довільний вміст. `children` може бути рядком, елементом, масивом або функцією (патерн render props).",
    sources: ["react-props"],
  },
  {
    question: "Що повертає `useState(0)`?",
    options: [
      "Об'єкт `{ value, setValue }`",
      "Масив із поточного значення й функції для його оновлення",
      "Лише поточне значення, оновлення — через `this.setState`",
    ],
    answer: 1,
    explanation:
      "`const [count, setCount] = useState(0)` — деструктуризація масиву дає змогу назвати змінні як завгодно. Початкове значення використовується лише під час першого рендеру. Якщо його обчислення дороге, передають функцію: `useState(() => compute())`.",
    sources: ["react-useState", "react-state-memory"],
  },
  {
    question: "Що виведе `console.log` після кліку?",
    code: `const [count, setCount] = useState(0);

function handleClick() {
  setCount(count + 1);
  console.log(count);
}`,
    options: ["`1`", "`0`", "`undefined`"],
    answer: 1,
    explanation:
      "Стан у межах рендеру — це «знімок». `setCount` планує новий рендер, але змінна `count` у поточній функції лишається попередньою. Нове значення буде доступне під час наступного рендеру. Якщо значення потрібне одразу, обчисліть його в змінну: `const next = count + 1`.",
    sources: ["react-state-snapshot", "react-useState"],
  },
  {
    question: "Чому дорівнюватиме `count` після одного кліку, якщо початкове значення 0?",
    code: `function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}`,
    options: ["`3`", "`1`", "`0`"],
    answer: 1,
    explanation:
      "Усі три виклики бачать той самий знімок `count = 0` і тричі ставлять у чергу значення `1`. Щоб оновлення складалися, використовуйте функціональну форму: `setCount(c => c + 1)` — кожен виклик отримає результат попереднього, і підсумок буде 3.",
    sources: ["react-queueing-updates", "react-useState"],
  },
  {
    question: "Чому компонент не перемалювався?",
    code: `const [user, setUser] = useState({ name: "Ann" });

function rename() {
  user.name = "Bob";
  setUser(user);
}`,
    options: [
      "`setUser` не можна викликати в обробниках подій — лише в ефектах",
      "Об'єкт мутовано, посилання те саме — `Object.is` не бачить змін",
      "У `useState` не можна зберігати об'єкти — лише примітивні значення",
    ],
    answer: 1,
    explanation:
      "React порівнює нове значення зі старим через `Object.is`. Це той самий об'єкт, тому оновлення пропускається. Треба створити новий об'єкт: `setUser({ ...user, name: \"Bob\" })`. Мутація ще й ламає оптимізації на кшталт `memo`.",
    sources: ["react-updating-objects", "react-useState"],
  },
  {
    question: "Як правильно додати елемент до масиву в стані?",
    options: [
      "`items.push(item); setItems(items);`",
      "`setItems([...items, item]);`",
      "`setItems(items.concat).push(item);`",
    ],
    answer: 1,
    explanation:
      "Стан треба оновлювати іммутабельно — створювати новий масив. `push` мутує наявний масив, і посилання не змінюється. Немутувальні методи: spread, `concat`, `filter`, `map`, `slice`, `toSorted()`. Видалення — `items.filter(i => i.id !== id)`.",
    sources: ["react-updating-arrays"],
  },
  {
    question: "Яке значення найкраще підходить для `key` у списку?",
    options: [
      "Індекс елемента в масиві — він завжди унікальний у межах списку",
      "Стабільний унікальний ідентифікатор із даних, наприклад `id`",
      "`Math.random()` або `crypto.randomUUID()` за кожного рендеру",
    ],
    answer: 1,
    explanation:
      "`key` допомагає React зіставити елементи між рендерами. Індекс ламається під час вставлення, видалення й сортування: стан і DOM полів «переїжджають» до інших елементів. Випадковий ключ змінюється щорендеру — React перестворюватиме всі елементи й втрачатиме їхній стан.",
    sources: ["react-lists", "react-preserving-state"],
  },
  {
    question: "Що відрендериться, якщо `items = []`?",
    code: `<div>{items.length && <List items={items} />}</div>`,
    options: ["Нічого не відрендериться", "Відрендериться цифра `0`", "Відрендериться текст `false`"],
    answer: 1,
    explanation:
      "`0 && x` повертає `0`, а React рендерить числа як текст (на відміну від `false`, `null`, `undefined`). Пишіть явну булеву умову: `items.length > 0 && ...` або тернарник `items.length ? <List /> : null`.",
    sources: ["react-conditional"],
  },
  {
    question: "У чому помилка: `<button onClick={handleClick()}>`?",
    options: [
      "Помилки немає, це стандартний запис",
      "Функція викличеться одразу під час рендеру, а не за кліком",
      "У JSX обробники пишуться рядком: `onClick=\"handleClick()\"`",
    ],
    answer: 1,
    explanation:
      "В `onClick` треба передати функцію, а не результат її виклику. Правильно: `onClick={handleClick}` або `onClick={() => handleClick(id)}`, якщо потрібні аргументи. Якщо всередині `handleClick` змінюється стан, виклик під час рендеру спричинить нескінченний цикл.",
    sources: ["react-events"],
  },
  {
    question: "Як скасувати стандартну поведінку надсилання форми в React?",
    options: [
      "Повернути `false` з обробника `onSubmit` форми",
      "Викликати `e.preventDefault()` в обробнику `onSubmit`",
      "Додати атрибут `noSubmit` до тегу `<form>` у JSX",
    ],
    answer: 1,
    explanation:
      "У React обробники отримують синтетичну подію з тим самим API, що й нативна. `return false`, як у старих inline-обробниках HTML, тут не працює. Зупинити спливання можна через `e.stopPropagation()`.",
    sources: ["react-events"],
  },
  {
    question: "Що таке керований (controlled) input?",
    options: [
      "Поле, значення якого зберігається в state: `value` + `onChange`",
      "Поле, яким керує браузер, а React читає його значення через `ref`",
      "Поле з атрибутом `required`, яке контролює браузерна валідація",
    ],
    answer: 0,
    explanation:
      "У керованому полі джерело правди — state: `value={text}` і `onChange={e => setText(e.target.value)}`. Так легко валідувати й форматувати введення на льоту. Некероване поле зберігає значення в DOM (`defaultValue`, читання через `ref` або `FormData`).",
    sources: ["react-input"],
  },
  {
    question: "React попереджає: «You provided a `value` prop to a form field without an `onChange` handler». Що сталося?",
    options: [
      "Поле стало лише для читання: `value` задано, а `onChange` немає",
      "Кероване поле не можна використовувати всередині тегу `<form>`",
      "Значення `value` має бути числом, а передано рядок",
    ],
    answer: 0,
    explanation:
      "Якщо задати `value` без `onChange`, React щорендеру повертатиме полю це значення, і користувач не зможе ввести текст. Рішення: додати `onChange`, використати `defaultValue` для некерованого поля або явно вказати `readOnly`.",
    sources: ["react-input"],
  },
  {
    question: "Двом сусіднім компонентам потрібні ті самі дані, які вони можуть змінювати. Що зробити насамперед?",
    options: [
      "Скопіювати стан в обидва компоненти й синхронізувати їх через `useEffect`",
      "Підняти стан у спільного батька й передати значення та колбеки через props",
      "Одразу підключити Redux",
    ],
    answer: 1,
    explanation:
      "Lifting state up — базовий прийом: у даних має бути одне джерело правди в найближчому спільному предку. Дублювання стану із синхронізацією через ефекти веде до розсинхрону й зайвих рендерів. Глобальні сховища потрібні, коли стан справді використовується в багатьох місцях дерева.",
    sources: ["react-sharing-state"],
  },
  {
    question: "Що таке prop drilling?",
    options: [
      "Прокидання props через проміжні компоненти, яким вони не потрібні",
      "Перевірка типів props під час виконання через `PropTypes`",
      "Спосіб оптимізації рендеру: передавання props через `React.memo`",
    ],
    answer: 0,
    explanation:
      "Коли дані з кореня потрібні глибоко внизу, їх доводиться прокидати через кожен рівень. Це незручно, але не завжди проблема. Рішення: композиція (передавати готові елементи через `children`), Context, глобальні сховища.",
    sources: ["react-context-learn", "react-sharing-state"],
  },
  {
    question: "Коли виконається ефект `useEffect(() => { ... }, [])`?",
    options: [
      "Перед кожним рендером компонента, щоб підготувати дані",
      "Після монтування (у dev зі StrictMode — двічі)",
      "Лише під час розмонтування компонента, як `componentWillUnmount`",
    ],
    answer: 1,
    explanation:
      "Порожній масив залежностей означає «синхронізуватися після монтування». Ефекти завжди виконуються після відмальовування, а не до. У режимі розробки StrictMode монтує, розмонтовує й знову монтує компонент, щоб перевірити, що очищення ефекту написано правильно.",
    sources: ["react-useEffect", "react-strict-mode"],
  },
  {
    question: "Коли виконується ефект без масиву залежностей: `useEffect(() => { ... })`?",
    options: [
      "Лише один раз — одразу після монтування компонента",
      "Після кожного рендеру компонента",
      "Ніколи: без масиву залежностей ефект не запуститься",
    ],
    answer: 1,
    explanation:
      "Без другого аргументу ефект запускається після кожного рендеру. З `[]` — лише після монтування. З `[a, b]` — після монтування й у разі зміни `a` або `b` (порівняння через `Object.is`).",
    sources: ["react-useEffect", "react-sync-effects"],
  },
  {
    question: "Коли викликається функція, повернена з `useEffect`?",
    options: [
      "Перед повторним запуском ефекту й під час розмонтування",
      "Одразу після виконання ефекту, у тому самому кадрі",
      "Лише якщо всередині ефекту було кинуто виняток",
    ],
    answer: 0,
    explanation:
      "Функція очищення (cleanup) прибирає те, що налаштував ефект: відписується від подій, очищає таймери, скасовує запити. React викликає її перед наступним запуском ефекту з новими залежностями й під час видалення компонента.",
    sources: ["react-useEffect", "react-sync-effects"],
  },
  {
    question: "Чим `useRef` відрізняється від `useState`?",
    options: [
      "Зміна `ref.current` не спричиняє повторного рендеру",
      "`useRef` можна використовувати лише для посилань на DOM",
      "Значення `useRef` скидається за кожного рендеру",
    ],
    answer: 0,
    explanation:
      "`useRef` зберігає змінне значення між рендерами, не спричиняючи перемальовування. Його використовують для посилань на DOM (`<input ref={inputRef}>`), id таймерів, попередніх значень. Якщо значення впливає на те, що видно на екрані, воно має бути в state.",
    sources: ["react-useRef", "react-refs-learn"],
  },
  {
    question: "Яке правило хуків порушено?",
    code: `function Profile({ id }) {
  if (!id) return null;
  const [data, setData] = useState(null);
  // ...
}`,
    options: [
      "Хуки не можна використовувати в компонентах, що приймають props",
      "Хук викликається після умовного `return` — порядок хуків змінюється",
      "Порушень немає: ранній `return` із хуками дозволений",
    ],
    answer: 1,
    explanation:
      "React зіставляє стан із хуками за порядком їхнього виклику. Якщо під час одного рендеру хук не викликається (через ранній `return`, умову чи цикл), порядок збивається. Хуки треба викликати на верхньому рівні, до будь-яких умовних виходів.",
    sources: ["react-rules-of-hooks"],
  },
  {
    question: "Чому користувацький хук має називатися з префікса `use`?",
    options: [
      "Інакше бандлер не зможе експортувати його з модуля",
      "Так лінтер і React розуміють, що всередині є хуки",
      "Префікс `use` вмикає автоматичну мемоізацію результату",
    ],
    answer: 1,
    explanation:
      "Префікс `use` — домовленість, на яку спираються `eslint-plugin-react-hooks` і React Compiler. Сам по собі він нічого не мемоізує. Функція без хуків усередині не повинна називатися `use...` — це звичайна утиліта.",
    sources: ["react-custom-hooks", "react-rules-of-hooks"],
  },
  {
    question: "Коли дочірній компонент перемальовується за замовчуванням?",
    options: [
      "Лише коли змінюються його props (за посиланням)",
      "Коли перемальовується батько, навіть якщо props ті самі",
      "Лише коли змінюється його власний state або context",
    ],
    answer: 1,
    explanation:
      "Рендер батька за замовчуванням рендерить усе піддерево. Інші причини: зміна власного стану й зміна контексту, який читає компонент. Пропустити рендер за однакових props дає змогу `React.memo` (або автоматично — React Compiler). Перерендер не дорівнює зміні DOM: DOM змінюється лише за наявності різниці.",
    sources: ["react-render-commit", "react-memo"],
  },
  {
    question: "Як правильно задати inline-стиль у JSX?",
    options: [
      "`style=\"color: red; font-size: 14px\"`",
      "`style={{ color: \"red\", fontSize: 14 }}`",
      "`style={[\"color: red\", \"font-size: 14px\"]}`",
    ],
    answer: 1,
    explanation:
      "`style` приймає об'єкт із camelCase-властивостями. Зовнішні дужки — вставлення виразу, внутрішні — об'єктний літерал. Числові значення для більшості властивостей інтерпретуються як пікселі (`fontSize: 14` → `14px`).",
    sources: ["react-dom-common"],
  },
  {
    question: "Які кроки потрібні, щоб передати дані через Context?",
    options: [
      "`createContext` → провайдер зі `value` → `useContext` у нащадку",
      "Оголосити глобальну змінну в модулі й імпортувати її в компонентах",
      "Передати дані в `children` кожного компонента на шляху вниз",
    ],
    answer: 0,
    explanation:
      "`const ThemeContext = createContext('light')` → `<ThemeContext value={theme}>` (у React 19 можна без `.Provider`) → `useContext(ThemeContext)` у будь-якому нащадку. У разі зміни `value` перемалюються всі компоненти, що читають цей контекст.",
    sources: ["react-context-learn", "react-useContext"],
  },
  {
    question: "Що поверне `useContext(MyContext)`, якщо над компонентом немає провайдера?",
    options: [
      "Завжди `undefined`, значення за замовчуванням ігнорується",
      "Значення за замовчуванням із `createContext(defaultValue)`",
      "React кине помилку «Provider is missing»",
    ],
    answer: 1,
    explanation:
      "Значення за замовчуванням використовується, коли провайдера вище деревом немає. Часто його роблять `null` і пишуть хук-обгортку, що кидає зрозумілу помилку: «useAuth must be used within AuthProvider».",
    sources: ["react-useContext", "react-context-learn"],
  },
  {
    question: "Навіщо `<StrictMode>` у режимі розробки викликає рендер і ефекти двічі?",
    options: [
      "Щоб прогріти кеш і пришвидшити перше завантаження сторінки",
      "Щоб виявити нечисті рендери й ефекти без очищення",
      "Це відомий баг React 18, StrictMode краще вимикати",
    ],
    answer: 1,
    explanation:
      "Подвійний виклик допомагає знайти побічні ефекти під час рендеру (мутації, запити) і забуте очищення в ефектах. У продакшен-збірці цього не відбувається. Якщо подвійний виклик щось ламає — отже, у коді є баг, який проявиться й пізніше.",
    sources: ["react-strict-mode", "react-pure"],
  },
  {
    question: "Для чого використовують `React.lazy`?",
    options: [
      "Для відкладеного завантаження коду компонента окремим чанком",
      "Для відкладеного рендеру компонента до появи у viewport",
      "Для відкладеного оновлення стану",
    ],
    answer: 0,
    explanation:
      "`const Admin = lazy(() => import('./Admin'))` виносить компонент в окремий JS-чанк, який завантажується під час першого рендеру. Це зменшує початковий бандл. Відображення в міру прокручування — інше завдання (Intersection Observer).",
    sources: ["react-lazy", "mdn-dynamic-import"],
  },
  {
    question: "Що потрібно, щоб `React.lazy` працював?",
    options: [
      "Обгорнути його (або предка) в `<Suspense fallback>`",
      "Викликати `lazy` усередині `useEffect` після монтування",
      "Додати до лінивого компонента атрибут `async`",
    ],
    answer: 0,
    explanation:
      "Поки код вантажиться, компонент «призупиняється», і найближчий `<Suspense>` показує `fallback`. Оголошувати `lazy` треба на рівні модуля, а не всередині компонента — інакше за кожного рендеру буде новий компонент із втратою стану. Модуль повинен мати `default`-експорт.",
    sources: ["react-lazy", "react-suspense"],
  },
  {
    question: "Чому `lazy(() => import('./Chart'))` видає помилку, якщо в `Chart.tsx` лише `export function Chart`?",
    options: [
      "`lazy` очікує модуль із `default`-експортом",
      "`lazy` не підтримує TypeScript-файли `.tsx`",
      "Компонент для `lazy` має бути класовим",
    ],
    answer: 0,
    explanation:
      "Проміс з `import()` має розв'язатися об'єктом із полем `default`. Для іменованого експорту використовують перетворення: `lazy(() => import('./Chart').then(m => ({ default: m.Chart })))`. TypeScript і функціональні компоненти підтримуються повністю.",
    sources: ["react-lazy"],
  },
  {
    question: "Чим небезпечний `dangerouslySetInnerHTML`?",
    options: [
      "Він сповільнює рендер у десятки разів через парсинг",
      "Він вставляє HTML без екранування — це ризик XSS",
      "Він працює лише в класових компонентах React",
    ],
    answer: 1,
    explanation:
      "Зазвичай React екранує рядки, тому `{userInput}` безпечний. `dangerouslySetInnerHTML={{ __html }}` вставляє розмітку як є, і `<img onerror=...>` з користувацьких даних виконає скрипт. Якщо HTML справді потрібен (наприклад, із CMS), його очищують санітайзером (DOMPurify).",
    sources: ["react-dom-common", "mdn-xss"],
  },
  {
    question: "Як у React 18+ підключити застосунок до DOM-елемента?",
    options: [
      "`ReactDOM.render(<App />, el)`",
      "`createRoot(el).render(<App />)`",
      "`React.mount(<App />, el)`",
    ],
    answer: 1,
    explanation:
      "`createRoot` з `react-dom/client` вмикає concurrent-можливості React 18+. `ReactDOM.render` застарів і видалений у React 19. Для гідратації HTML, відрендереного на сервері, використовують `hydrateRoot`. У фреймворках на кшталт Next.js це робиться автоматично.",
    sources: ["react-createRoot", "react-18"],
  },
  {
    question: "Що таке «чистий» компонент у термінах React?",
    options: [
      "Компонент без стилів і без побічних CSS-залежностей",
      "Компонент без побічних ефектів у рендері й з однаковим JSX",
      "Будь-який компонент, успадкований від `React.PureComponent`",
    ],
    answer: 1,
    explanation:
      "Рендер має бути чистим обчисленням: жодних мутацій зовнішніх змінних, запитів чи зміни DOM. Побічні ефекти роблять в обробниках подій або в `useEffect`. На чистоті ґрунтуються StrictMode, concurrent-рендеринг і React Compiler.",
    sources: ["react-pure"],
  },
  {
    question: "Як відрендерити список користувачів із масиву `users`?",
    options: [
      "`{users.forEach(u => <li key={u.id}>{u.name}</li>)}`",
      "`{users.map(u => <li key={u.id}>{u.name}</li>)}`",
      "`{for (const u of users) <li>{u.name}</li>}`",
    ],
    answer: 1,
    explanation:
      "`map` повертає новий масив елементів, який React відрендерить. `forEach` повертає `undefined`, тому нічого не з'явиться. `for` — інструкція, її не можна писати всередині `{}`. І не забудьте `key`.",
    sources: ["react-lists"],
  },
  {
    question: "Що таке Redux?",
    options: [
      "Бібліотека для запитів до REST API з кешуванням відповідей",
      "Сховище глобального стану: store, actions, reducers",
      "Вбудований у React хук для глобального стану застосунку",
    ],
    answer: 1,
    explanation:
      "У Redux стан зберігається в одному store, змінюється лише через dispatch дій, а новий стан обчислюють чисті функції-редʼюсери. Це дає передбачуваність, зручне налагодження (Redux DevTools, time travel) і middleware. Redux — окрема бібліотека, до React його підключають через `react-redux`.",
    sources: ["redux-essentials"],
  },
  {
    question: "Яка вимога до reducer у класичному Redux (без Immer)?",
    options: [
      "Бути чистим і повертати новий стан без мутацій",
      "Бути асинхронним і самостійно робити запити до API",
      "Напряму змінювати `state` і нічого не повертати",
    ],
    answer: 0,
    explanation:
      "`(state, action) => newState` без побічних ефектів: жодних запитів, випадкових чисел і мутацій. Асинхронність виносять у thunks або RTK Query. У Redux Toolkit можна писати «мутувальний» код — Immer під капотом перетворює його на іммутабельні оновлення.",
    sources: ["redux-essentials", "redux-style-guide"],
  },
  {
    question: "Що робить `configureStore` з Redux Toolkit?",
    options: [
      "Створює store з налаштуваннями за замовчуванням: thunk, DevTools",
      "Генерує редʼюсери й екшени за описом схеми даних",
      "Підключає store до React-компонентів без `<Provider>`",
    ],
    answer: 0,
    explanation:
      "`configureStore({ reducer: { todos: todosReducer } })` об'єднує редʼюсери, додає middleware `redux-thunk`, підключає Redux DevTools і в режимі розробки перевіряє випадкові мутації та несеріалізовані значення. Підключення до React однаково робиться через `<Provider store={store}>`.",
    sources: ["rtk-configureStore", "redux-why-rtk"],
  },
  {
    question: "Для чого потрібні `useSelector` і `useDispatch`?",
    options: [
      "`useSelector` читає дані зі store, `useDispatch` дає `dispatch`",
      "`useSelector` шукає DOM-елемент, `useDispatch` викликає DOM-подію",
      "Обидва хуки створюють окремий локальний store для компонента",
    ],
    answer: 0,
    explanation:
      "`const todos = useSelector(state => state.todos)` перемалює компонент, лише якщо результат селектора змінився (порівняння за посиланням). `const dispatch = useDispatch(); dispatch(added(todo))`. У TypeScript-проєктах створюють типізовані версії `useAppSelector` і `useAppDispatch`.",
    sources: ["react-redux-hooks"],
  },
  {
    question: "Що генерує `createSlice`?",
    options: [
      "Лише reducer, а action creators треба писати вручну",
      "Reducer і action creators для кожного case reducer",
      "React-компонент і хук для відображення стану слайса",
    ],
    answer: 1,
    explanation:
      "`createSlice({ name: 'todos', initialState, reducers: { added(state, action) {...} } })` повертає `todosSlice.reducer` і `todosSlice.actions.added` з типом `'todos/added'`. Це прибирає бойлерплейт класичного Redux із константами типів і switch.",
    sources: ["rtk-createSlice"],
  },
  {
    question: "Яке завдання насамперед розв'язує TanStack Query?",
    options: [
      "Серверний стан: завантаження, кеш, фонове оновлення даних",
      "Маршрутизацію між сторінками з попереднім завантаженням даних",
      "Глобальний UI-стан: чи відкрита модалка, поточна тема",
    ],
    answer: 0,
    explanation:
      "Серверні дані живуть на бекенді й можуть застаріти. TanStack Query бере на себе кеш, повторні запити, дедуплікацію, оновлення під час фокусу вікна, пагінацію й мутації. Клієнтський UI-стан лишається в `useState`, Context або Zustand/Redux.",
    sources: ["tq-overview"],
  },
  {
    question: "Що обов'язково передати в `useQuery`?",
    options: [
      "`url`, `method` і `headers`",
      "`queryKey` і `queryFn`",
      "`store`, `reducer` і `action`",
    ],
    answer: 1,
    explanation:
      "`useQuery({ queryKey: ['todos', id], queryFn: () => fetchTodo(id) })`. Ключ ідентифікує дані в кеші: усе, від чого залежить запит, має бути в ключі — тоді в разі зміни `id` запит виконається знову. `queryFn` — будь-яка функція, що повертає проміс, бібліотека не прив'язана до `fetch`.",
    sources: ["tq-queries", "tq-query-keys"],
  },
  {
    question: "Чим у TanStack Query v5 відрізняються `isPending` і `isFetching`?",
    options: [
      "Це синоніми: обидва true, поки йде запит",
      "`isPending` — даних ще немає, `isFetching` — іде будь-який запит",
      "`isPending` — запит упав із помилкою, `isFetching` — завершився успішно",
    ],
    answer: 1,
    explanation:
      "`isPending` (статус `pending`) означає, що даних у кеші поки немає — показуємо скелетон. `isFetching` true за кожного запиту, включно з фоновим оновленням наявних даних — тут підходить маленький індикатор. У v4 замість `isPending` був `isLoading`.",
    sources: ["tq-queries"],
  },
  {
    question: "Що треба зробити перед використанням `useQuery` у застосунку?",
    options: [
      "Створити `QueryClient` і обгорнути застосунок у провайдер",
      "Нічого: `useQuery` сам створює глобальний кеш під час першого виклику",
      "Підключити Redux store, у якому TanStack Query зберігає кеш",
    ],
    answer: 0,
    explanation:
      "`QueryClient` зберігає кеш і налаштування за замовчуванням, а провайдер робить його доступним хукам. Клієнт створюють один раз (поза компонентом або через `useState`), інакше кеш скидатиметься за кожного рендеру. Redux для TanStack Query не потрібен.",
    sources: ["tq-overview"],
  },
];

export default questions;
