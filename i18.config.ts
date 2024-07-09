export type LocaleMap = {
  [key: string]: string;
};
export const i18n = {
  defaultLocale: "zh-Hans",
  locales: ["zh-Hans", "en"],
  localeMap: {
    "zh-Hans": "简体中文",
    en: "英文",
  },
};
export type Locale = (typeof i18n)["locales"][number];
