"use client";
import { useState, useEffect } from "react";
import { useLocale } from "./localeProvider";
import { usePathname, useRouter } from "next/navigation";
import { Locale, i18n, LocaleMap } from "@/i18.config";
import clsx from "clsx";
export default function LocaleSwitcher({ className }: { className: string }) {
  const { lang, setLang } = useLocale();
  const [showTab, setShowTab] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const pathname = usePathname();
  const router = useRouter();

  const toggleTab = () => {
    setShowTab(!showTab);
  };
  const findActiveLocale = () => {
    const segments = pathname.split("/");
    const locale = i18n.locales.includes(segments[1])
      ? segments[1]
      : i18n.defaultLocale;
    const index = i18n.locales.indexOf(locale);
    if (index > -1) {
      setActiveIndex(index);
      setLang(i18n.locales[index]);
    }
  };

  const redirectedPathName = (locale: Locale) => {
    if (!pathname || locale === i18n.defaultLocale) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  const changeLocale = (e: any, locale: string, index: number) => {
    e.preventDefault();
    setLang(locale);
    setActiveIndex(index);
    const url = redirectedPathName(locale || i18n.defaultLocale);
    if (url !== pathname) {
      router.push(url);
    }
  };
  useEffect(() => {
    findActiveLocale();
  }, []);

  return (
    <div className={clsx(className)}>
      <h2
        className="cursor-pointer border-yellow-600 border border-solid text-black rounded-lg py-2.5 px-3"
        onClick={toggleTab}
      >
        当前语言:{(i18n.localeMap as LocaleMap)[lang as string]}
      </h2>
      {showTab && (
        <ul className="absolute z-10 bg-white lg:w-[200px] flex flex-col">
          {i18n.locales.map((locale: Locale, index: number) => (
            <li
              onClick={(e) => {
                changeLocale(e, locale, index);
              }}
              key={index}
              className={clsx(
                "cursor-pointer h-8 flex items-center justify-center w-full text-[#333] bg-white rounded-none py-4 pl-[25px] hover:bg-[#f0f0f0] hover:rounded-none",
                `${
                  activeIndex === index &&
                  "w-full bg-[#f0f0f0] font-semibold  lg:text-black rounded-md"
                }`
              )}
            >
              {locale}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
