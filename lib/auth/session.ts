import { useSyncExternalStore } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase/client";

export type OAuthProvider = "github" | "google";
export type AuthUser = { id: string; name: string; avatarUrl: string | null };
export type AuthState =
  | { status: "loading" }
  /** Supabase не настроен (нет переменных окружения) — вход скрыт. */
  | { status: "unavailable" }
  | { status: "guest" }
  | { status: "signed-in"; user: AuthUser };

const LOADING: AuthState = { status: "loading" };
const UNAVAILABLE: AuthState = { status: "unavailable" };
const GUEST: AuthState = { status: "guest" };

let state: AuthState = LOADING;
let started = false;
const listeners = new Set<() => void>();

function toAuthUser(user: User): AuthUser {
  const meta = user.user_metadata;
  return {
    id: user.id,
    name: meta.full_name || meta.name || meta.user_name || user.email || "",
    avatarUrl: meta.avatar_url || meta.picture || null,
  };
}

function setState(next: AuthState) {
  // Не будим подписчиков, если пользователь тот же (например, при обновлении токена)
  if (next.status === "signed-in" && state.status === "signed-in" && next.user.id === state.user.id) return;
  if (next.status !== "signed-in" && next.status === state.status) return;
  state = next;
  listeners.forEach((l) => l());
}

function start() {
  if (started) return;
  started = true;
  const supabase = getSupabase();
  if (!supabase) {
    setState(UNAVAILABLE);
    return;
  }
  // Первым событием приходит INITIAL_SESSION — в том числе после обмена ?code= при OAuth-редиректе
  supabase.auth.onAuthStateChange((_event, session) => {
    setState(session ? { status: "signed-in", user: toAuthUser(session.user) } : GUEST);
  });
}

export function subscribeAuth(onChange: () => void) {
  listeners.add(onChange);
  start();
  return () => {
    listeners.delete(onChange);
  };
}

export function getAuthState() {
  return state;
}

export function useAuth(): AuthState {
  return useSyncExternalStore(subscribeAuth, getAuthState, () => LOADING);
}

export async function signIn(provider: OAuthProvider) {
  const supabase = getSupabase();
  if (!supabase) return;
  // Возвращаемся на ту же страницу; адрес должен входить в Redirect URLs проекта Supabase
  const redirectTo = window.location.origin + window.location.pathname;
  const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
  if (error) console.error("Sign-in failed", error);
}

export async function signOut() {
  const { error } = (await getSupabase()?.auth.signOut()) ?? {};
  if (error) console.error("Sign-out failed", error);
}
