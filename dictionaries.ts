import "server-only";
import { Locale, i18n } from "./i18.config";
const locales: { [key: string]: () => Promise<any> } = {
  en: () => import("./public/locales/en.json").then((module) => module.default),
  "zh-Hans": () =>
    import("./public/locales/zh-Hans.json").then((module) => module.default),
};

function getLocale(locale: Locale) {
  if (typeof locales[locale] === "function") {
    return locales[locale]();
  } else {
    console.error("Locale not found");
  }
}

export const getDictinary = async (locale = i18n.defaultLocale as Locale) =>
  getLocale(locale);
