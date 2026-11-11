import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import translations from "../i18n/translations";
import { DEFAULT_LANG, langFromPath, langPath } from "../data/site";

const LanguageContext = createContext();

// The URL decides the language (/ is English, /fr is French), so each language is
// its own indexable page and the prerendered HTML always matches the first render.
// `initialLang` is only passed by the build-time prerender, which has no window.
export const LanguageProvider = ({ initialLang, children }) => {
  const [lang, setLangState] = useState(() => initialLang || langFromPath(window.location.pathname));

  const setLang = useCallback((l) => {
    localStorage.setItem("lang", l);
    if (langFromPath(window.location.pathname) !== l) {
      window.history.pushState(null, "", langPath(l) + window.location.hash);
    }
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
    // A returning visitor who chose French and lands on the root goes back to /fr.
    // After mount, not during the first render, which has to match the HTML.
    const saved = localStorage.getItem("lang");
    if (saved && saved !== DEFAULT_LANG && translations[saved] && window.location.pathname === "/") {
      window.history.replaceState(null, "", langPath(saved) + window.location.hash);
      setLangState(saved);
    }
    // Back/forward between / and /fr
    const onPop = () => setLangState(langFromPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].seo.title;
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
