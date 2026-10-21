import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, locales, matchLocale } from "@/lib/i18n/locales";

/** Адреса без языка (`/`, `/quiz/react/junior`) перенаправляются на язык пользователя. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    (saved && isLocale(saved) ? saved : null) ??
    matchLocale(request.headers.get("accept-language")) ??
    defaultLocale;

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Пропускаем служебные пути Next.js и файлы со расширением (favicon.ico, картинки)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
