import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "../locales/en.json";
import tr from "../locales/tr.json";
import ar from "../locales/ar.json";

const STORAGE_KEY = "musiad-web-language";

const dictionaries = {
  en,
  tr,
  ar,
};

const I18nContext = createContext(null);

function getInitialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && dictionaries[saved]) return saved;
  return "en";
}

function getByPath(object, path) {
  return path.split(".").reduce((value, key) => {
    if (value && typeof value === "object" && key in value) return value[key];
    return undefined;
  }, object);
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  const isRtl = language === "ar";
  const messages = dictionaries[language];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", isRtl);
    document.title = messages?.meta?.siteName ?? "MÜSTAKİL FUAR/ORGANİZASYON";
  }, [isRtl, language, messages]);

  const value = useMemo(() => {
    return {
      language,
      setLanguage,
      messages,
      isRtl,
      t: (path, fallback = path) => getByPath(messages, path) ?? fallback,
    };
  }, [isRtl, language, messages]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
}
