import { NextResponse } from "next/server";
import { i18n } from "./i18.config.ts";

const { locales, defaultLocale } = i18n;

const publicFile = /\.(.*)|\/favicon.ico|\/*\/.$/;

function getLocale(request) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const locale = i18n.locales.includes(segments[1])
    ? segments[1]
    : defaultLocale;
  return locale;
}
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => pathname.includes(locale));

  // 已经有语言配置了跳过
  if (pathnameHasLocale) {
    return;
  }
  // public文件不重定向
  if (publicFile.test(pathname)) {
    return;
  }
  const locale = getLocale(request); // pathname没有语言则重定向
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
