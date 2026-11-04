import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import translations from "../i18n/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(
    () => localStorage.getItem("lang") || "en"
  );

  const setLang = useCallback((l) => {
    localStorage.setItem("lang", l);
    // Crossfade the whole page between languages where the View Transitions API exists
    // (flushSync so the new text is in the DOM when the "after" snapshot is taken)
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduce) {
      document.startViewTransition(() => flushSync(() => setLangState(l)));
    } else {
      setLangState(l);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key) => key.split(".").reduce((obj, k) => obj?.[k], translations[lang]) ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
