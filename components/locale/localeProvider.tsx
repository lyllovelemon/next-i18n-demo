"use client";
import { createContext, useContext } from "react";
import { i18n } from "@/i18.config";

type LocaleContextType = {
  lang: string;
  setLang: (locale: string) => void;
};
const LocaleContext = createContext({} as LocaleContextType);

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) => {
  function setLang(locale: string) {
    lang = locale;
  }
  if (!i18n.locales.includes(lang)) {
    lang = i18n.defaultLocale;
  }
  return (
    <LocaleContext.Provider value={{ lang, setLang }}>
      {children}
    </LocaleContext.Provider>
  );
};
