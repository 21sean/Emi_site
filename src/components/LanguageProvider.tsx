"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getTranslations, isLanguage, type Language, type Translations } from "@/lib/translations";

const LANGUAGE_STORAGE_KEY = "emi-language";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: Translations;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored && isLanguage(stored)) {
    return stored;
  }

  const browserLanguage = navigator.languages?.[0] || navigator.language || "en";
  const normalized = browserLanguage.toLowerCase();

  if (normalized.startsWith("ja")) {
    return "ja";
  }

  if (normalized.startsWith("zh")) {
    return "zh";
  }

  return "en";
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      copy: getTranslations(language),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
