import { i18n } from "@/i18.config.ts";
export default function useDict(locale: string) {
  if (!i18n.locales.includes(locale)) {
    locale = i18n.defaultLocale;
  }
  const res = require(`../public/locales/${locale}.json`);
  return res;
}
