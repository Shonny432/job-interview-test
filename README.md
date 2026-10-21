# Frontend Interview Trainer

Тренажёр для подготовки к собеседованию на позицию frontend-разработчика.
Темы: Вёрстка, JavaScript, React (включая Redux Toolkit и TanStack Query), Next.js, TypeScript, Паттерны проектирования, System Design.
Уровни: Junior, Middle, Senior — по 50 вопросов с тремя вариантами ответа, объяснением и ссылками на литературу.

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Вход и сохранение прогресса (Supabase)

Без настройки сайт работает в гостевом режиме: лучший результат хранится в `localStorage`.
Чтобы прогресс сохранялся в аккаунте (вход через GitHub или Google):

1. Создайте проект на [supabase.com](https://supabase.com).
2. **SQL Editor** → вставьте [supabase/migrations/0001_quiz_progress.sql](supabase/migrations/0001_quiz_progress.sql) → **Run**.
3. Скопируйте `.env.example` в `.env.local` и заполните значения из **Project Settings → API Keys**.
4. **Authentication → URL Configuration**: Site URL — адрес сайта, в **Redirect URLs** добавьте
   `http://localhost:3000/**` и `https://<ваш-домен>/**`.
5. **Authentication → Sign In / Providers**: включите GitHub и Google.
   Callback URL для обоих провайдеров: `https://<project-ref>.supabase.co/auth/v1/callback`.
   - GitHub: Settings → Developer settings → OAuth Apps → New OAuth App → Client ID и Secret.
   - Google: Google Cloud Console → APIs & Services → Credentials → OAuth client ID (Web application) → Client ID и Secret.
6. Перезапустите `npm run dev`.

Вход и запросы к базе выполняются в браузере, доступ к данным ограничен политиками RLS
(каждый пользователь видит только свои строки), поэтому страницы остаются статическими.
При первом входе результаты, набранные гостем, переносятся в аккаунт.

## Структура

```
app/
  page.tsx                      — главная: темы и уровни
  quiz/[topic]/[level]/page.tsx — страница теста (пререндерится для всех тем и уровней)
components/
  quiz.tsx                      — клиентский компонент теста
data/ru/<тема>/<уровень>.ts     — вопросы (по 50 в файле)
lib/
  i18n/ru.ts                    — строки интерфейса
  quiz/catalog.ts               — подключение файлов с вопросами
  quiz/sources.ts               — реестр литературы (ссылки)
  quiz/types.ts                 — типы
```

## Как добавить вопрос

Добавьте объект в нужный файл `data/ru/<тема>/<уровень>.ts`:

```ts
{
  question: "Текст вопроса, `код` в обратных кавычках",
  code: "необязательный блок кода",
  options: ["вариант 1", "вариант 2", "вариант 3"],
  answer: 0, // индекс правильного варианта
  explanation: "Почему верно именно так и что не так с остальными вариантами",
  sources: ["mdn-flexbox"], // ключи из lib/quiz/sources.ts
}
```

Порядок вопросов и вариантов перемешивается при каждом прохождении, поэтому `answer` можно ставить на любую позицию.
Старайтесь, чтобы правильный вариант не был заметно длиннее остальных — иначе его легко угадать.

## Английская версия (план)

Добавить `lib/i18n/en.ts` той же формы, что `ru.ts`, и папку `data/en/` с той же структурой, затем выбирать словарь и данные по сегменту `[lang]` в маршруте.
