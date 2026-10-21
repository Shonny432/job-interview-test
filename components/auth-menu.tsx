"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { signIn, signOut, useAuth, type OAuthProvider } from "@/lib/auth/session";
import { useDictionary, useLocale } from "@/components/i18n-provider";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { locales } from "@/lib/i18n/locales";

const pill =
  "inline-flex h-9 items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800";
const menuItem =
  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-indigo-500 dark:hover:bg-zinc-800";

export function AuthMenu() {
  const auth = useAuth();
  const t = useDictionary().auth;
  const currentLocale = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Закрываем меню по клику снаружи и по Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (auth.status === "unavailable") return null;
  // До гидратации и проверки сессии держим место, чтобы шапка не прыгала
  if (auth.status === "loading") return <span className="h-9 w-20" aria-hidden />;

  if (auth.status === "signed-in") {
    return (
      <div
        role="group"
        aria-label={`${t.account}: ${auth.user.name}`}
        className="inline-flex h-9 items-center gap-1 rounded-full border border-zinc-200 bg-white p-0.5 pl-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <span title={auth.user.name} className="flex items-center gap-2">
          <Avatar name={auth.user.name} url={auth.user.avatarUrl} />
          <span className="hidden text-sm font-medium whitespace-nowrap sm:inline">{auth.user.name}</span>
        </span>
        <button
          type="button"
          onClick={() => void signOut()}
          aria-label={t.signOut}
          title={t.signOut}
          className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          <SignOutIcon />
          {/* На узких экранах остаётся только иконка */}
          <span className="hidden sm:inline-grid">
            {/* Подписи всех языков в одной ячейке: ширина кнопки — по самой длинной и не меняется при смене языка */}
            {locales.map((locale) => (
              <span
                key={locale}
                aria-hidden={locale !== currentLocale}
                className={`col-start-1 row-start-1 whitespace-nowrap ${locale === currentLocale ? "" : "invisible"}`}
              >
                {getDictionary(locale).auth.signOut}
              </span>
            ))}
          </span>
        </button>
      </div>
    );
  }

  const login = (provider: OAuthProvider) => {
    setOpen(false);
    void signIn(provider);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        title={t.signInHint}
        onClick={() => setOpen((v) => !v)}
        className={pill}
      >
        {t.signIn}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 flex w-64 flex-col gap-1 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
        >
          <p className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">{t.signInHint}</p>
          <MenuButton icon={<GithubIcon />} onClick={() => login("github")}>
            {t.withGithub}
          </MenuButton>
          <MenuButton icon={<GoogleIcon />} onClick={() => login("google")}>
            {t.withGoogle}
          </MenuButton>
        </div>
      )}
    </div>
  );
}

function MenuButton({ icon, onClick, children }: { icon: ReactNode; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" role="menuitem" className={menuItem} onClick={onClick}>
      {icon}
      {children}
    </button>
  );
}

function Avatar({ name, url }: { name: string; url: string | null }) {
  if (url) {
    // Аватар с GitHub/Google: next/image потребовал бы remotePatterns ради картинки 28px
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt="" referrerPolicy="no-referrer" className="size-7 rounded-full" />;
  }
  return (
    <span className="flex size-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-semibold text-white">
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}

function SignOutIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95h-4v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1h-4a12 12 0 0 0 0 10.78l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.43-3.43A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.27 6.61l4 3.1C6.22 6.88 8.87 4.77 12 4.77Z" />
    </svg>
  );
}
