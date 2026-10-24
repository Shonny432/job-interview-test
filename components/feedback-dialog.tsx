"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import { useDictionary, useLocale } from "@/components/i18n-provider";

type Kind = "bug" | "idea";
type Status = "idle" | "sending" | "sent" | "error" | "cooldown";

const COOLDOWN_KEY = "feedback:lastSentAt";
const COOLDOWN_MS = 60_000;

function inCooldown(): boolean {
  try {
    return Date.now() - Number(localStorage.getItem(COOLDOWN_KEY) ?? 0) < COOLDOWN_MS;
  } catch {
    return false;
  }
}

/** Ссылка «Обратная связь» в футере и модальное окно с формой (баг или идея). */
export function FeedbackDialog() {
  const t = useDictionary().feedback;
  const locale = useLocale();
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [kind, setKind] = useState<Kind>("bug");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function open() {
    if (status !== "sending") setStatus("idle");
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Скрытое поле-ловушка: люди его не видят, боты заполняют
    if (new FormData(e.currentTarget).get("website")) return;
    if (inCooldown()) {
      setStatus("cooldown");
      return;
    }
    const supabase = getSupabase();
    if (!supabase) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    const { error } = await supabase.from("feedback").insert({
      kind,
      message: message.trim(),
      email: email.trim() || null,
      locale,
      page: pathname.slice(0, 300),
    });
    if (error) {
      setStatus("error");
      return;
    }
    try {
      localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    } catch {}
    setMessage("");
    setEmail("");
    setStatus("sent");
  }

  const field =
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-900";

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="shrink-0 text-sm font-medium text-indigo-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-indigo-400"
      >
        {t.open}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        // Клик по затемнённому фону закрывает окно
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-0 text-zinc-900 shadow-xl backdrop:bg-black/50 dark:bg-zinc-950 dark:text-zinc-100"
      >
        <div className="flex flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 id={titleId} className="text-lg font-semibold">
                {t.title}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.intro}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={t.close}
              className="-mt-1 -mr-1 rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-indigo-500 dark:hover:bg-zinc-800"
            >
              <svg aria-hidden viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {status === "sent" ? (
            <div className="flex flex-col gap-4">
              <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                {t.success}
              </p>
              <button
                type="button"
                onClick={close}
                className="self-end rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 text-sm font-medium">{t.kindLabel}</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["bug", "idea"] as const).map((k) => (
                    <label
                      key={k}
                      className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm transition-colors has-focus-visible:outline-2 has-focus-visible:outline-indigo-500 ${
                        kind === k
                          ? "border-indigo-500 bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                          : "border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <input
                        type="radio"
                        name="kind"
                        value={k}
                        checked={kind === k}
                        onChange={() => setKind(k)}
                        className="sr-only"
                      />
                      {t.kinds[k]}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">{t.messageLabel}</span>
                <textarea
                  required
                  minLength={5}
                  maxLength={2000}
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={kind === "bug" ? t.bugPlaceholder : t.ideaPlaceholder}
                  className={`${field} resize-y`}
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">{t.emailLabel}</span>
                <input
                  type="email"
                  maxLength={200}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={field}
                />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{t.emailHint}</span>
              </label>

              {/* Ловушка для ботов */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

              {(status === "error" || status === "cooldown") && (
                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
                  {status === "cooldown" ? t.cooldown : t.error}
                </p>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
                >
                  {status === "sending" ? t.sending : t.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
