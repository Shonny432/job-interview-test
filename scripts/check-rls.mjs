// Проверка RLS таблицы quiz_progress так, как её видит посторонний: только publishable-ключ, без service role.
// Запуск: npm run check:rls  (переменные берутся из .env.local)
//
// Сценарии:
//   1. Гость (роль anon) не читает, не пишет и не меняет ничьи строки и не вызывает save_best_scores.
//   2. Пользователь B не видит и не меняет строки пользователя A и не может записать строку от имени A.
// Для п. 2 нужны два аккаунта — скрипт создаёт их через анонимный вход Supabase
// (Authentication → Sign In / Providers → Allow anonymous sign-ins). Такие пользователи
// получают роль authenticated, то есть те же права, что и вошедшие через GitHub/Google.
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) {
  console.error("Нет NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY в окружении");
  process.exit(2);
}

const TABLE = "quiz_progress";
const newClient = () => createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

let failed = 0;
function check(name, ok, details = "") {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${details ? `  (${details})` : ""}`);
}
const describe = (error) => (error ? `${error.code ?? ""} ${error.message}`.trim() : "без ошибки");

async function signIn(label) {
  const client = newClient();
  const { data, error } = await client.auth.signInAnonymously();
  if (error) return { error };
  console.log(`      ${label}: тестовый пользователь ${data.user.id}`);
  return { client, id: data.user.id };
}

// ---------- 1. Гость ----------
console.log("\n— Гость (anon)");
const anon = newClient();

{
  const { data, error } = await anon.from(TABLE).select("*");
  check("anon: SELECT не возвращает строк", !error && data.length === 0, error ? describe(error) : `строк: ${data.length}`);
}
{
  const { error } = await anon
    .from(TABLE)
    .insert({ user_id: "00000000-0000-0000-0000-000000000000", topic: "react", level: "junior", correct: 50, total: 50 });
  check("anon: INSERT отклонён", !!error, describe(error));
}
{
  const { data, error } = await anon.from(TABLE).update({ correct: 0 }).neq("topic", "").select();
  check("anon: UPDATE не меняет ни одной строки", !!error || data.length === 0, error ? describe(error) : `изменено: ${data.length}`);
}
{
  const { data, error } = await anon.from(TABLE).delete().neq("topic", "").select();
  check("anon: DELETE не удаляет ни одной строки", !!error || data.length === 0, error ? describe(error) : `удалено: ${data.length}`);
}
{
  const { error } = await anon.rpc("save_best_scores", { scores: [{ topic: "react", level: "junior", correct: 50, total: 50 }] });
  check("anon: вызов save_best_scores отклонён", !!error, describe(error));
}

// ---------- 2. Пользователь против пользователя ----------
console.log("\n— Пользователь B против строк пользователя A");
const a = await signIn("A");
const b = a.error ? a : await signIn("B");

const skipped = !!(a.error || b.error);
if (skipped) {
  const error = a.error ?? b.error;
  console.log(`SKIP  не удалось создать тестовых пользователей: ${describe(error)}`);
  console.log("      Включите на время проверки: Authentication → Sign In / Providers → Allow anonymous sign-ins");
} else {
  // A сохраняет результат — эту строку B будет пытаться прочитать и изменить
  {
    const { error } = await a.client.rpc("save_best_scores", { scores: [{ topic: "react", level: "junior", correct: 10, total: 50 }] });
    check("A: сохраняет свой результат через save_best_scores", !error, describe(error));
    const { data } = await a.client.from(TABLE).select("user_id, topic, level, correct");
    check("A: видит ровно свою строку", data?.length === 1 && data[0].user_id === a.id, `строк: ${data?.length ?? 0}`);
  }

  {
    const { data, error } = await b.client.from(TABLE).select("*").eq("user_id", a.id);
    check("B: не видит строки A", !error && data.length === 0, error ? describe(error) : `строк: ${data.length}`);
  }
  {
    const { data, error } = await b.client.from(TABLE).update({ correct: 50 }).eq("user_id", a.id).select();
    check("B: UPDATE строки A ничего не меняет", !!error || data.length === 0, error ? describe(error) : `изменено: ${data.length}`);
  }
  {
    const { error } = await b.client
      .from(TABLE)
      .insert({ user_id: a.id, topic: "react", level: "middle", correct: 50, total: 50 });
    check("B: INSERT от имени A отклонён", !!error, describe(error));
  }
  {
    const { error } = await b.client
      .from(TABLE)
      .upsert({ user_id: a.id, topic: "react", level: "junior", correct: 50, total: 50 });
    check("B: UPSERT поверх строки A отклонён", !!error, describe(error));
  }
  {
    const { data, error } = await b.client.from(TABLE).delete().eq("user_id", a.id).select();
    check("B: DELETE строки A ничего не удаляет", !!error || data.length === 0, error ? describe(error) : `удалено: ${data.length}`);
  }
  {
    // save_best_scores пишет только от имени вызывающего: строка A не должна измениться
    await b.client.rpc("save_best_scores", { scores: [{ topic: "react", level: "junior", correct: 50, total: 50 }] });
    const { data } = await a.client.from(TABLE).select("correct").eq("topic", "react").eq("level", "junior");
    check("B: save_best_scores не трогает результат A", data?.[0]?.correct === 10, `у A сейчас: ${data?.[0]?.correct}`);
  }
  {
    // Функция оставляет лучший результат: худший не должен затереть лучший
    await a.client.rpc("save_best_scores", { scores: [{ topic: "react", level: "junior", correct: 5, total: 50 }] });
    const { data } = await a.client.from(TABLE).select("correct").eq("topic", "react").eq("level", "junior");
    check("A: худший результат не затирает лучший", data?.[0]?.correct === 10, `у A сейчас: ${data?.[0]?.correct}`);
  }
  {
    const { data, error } = await anon.from(TABLE).select("*");
    check("anon: после записей A и B по-прежнему не видит строк", !error && data.length === 0, error ? describe(error) : `строк: ${data.length}`);
  }

  console.log(`\n      Тестовые пользователи остались в Authentication → Users (A: ${a.id}, B: ${b.id}).`);
  console.log("      Удалите их там — строки quiz_progress удалятся каскадно.");
}

console.log(
  failed
    ? `\nПровалено проверок: ${failed}`
    : skipped
      ? "\nПроверки гостя пройдены, проверка «пользователь против пользователя» пропущена"
      : "\nВсе проверки пройдены",
);
process.exit(failed ? 1 : 0);
