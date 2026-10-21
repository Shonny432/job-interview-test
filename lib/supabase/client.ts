import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

let client: SupabaseClient | null = null;

/**
 * Браузерный клиент Supabase (один на вкладку). Сессия лежит в localStorage,
 * поэтому сервер Next.js о пользователе не знает и страницы остаются статическими.
 * Без переменных окружения возвращает null — сайт работает в гостевом режиме.
 */
export function getSupabase(): SupabaseClient | null {
  if (typeof window === "undefined" || !url || !key) return null;
  client ??= createClient(url, key, {
    // PKCE: после OAuth-редиректа клиент сам обменяет ?code= на сессию и уберёт его из адреса
    auth: { flowType: "pkce" },
  });
  return client;
}
