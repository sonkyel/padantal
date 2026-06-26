"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dict, type Dict, type Locale } from "@/content/site";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: Dict };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const saved = localStorage.getItem("padantal-lang") as Locale | null;
    if (saved === "es" || saved === "en") setLocaleState(saved);
    else if (navigator.language?.toLowerCase().startsWith("en")) setLocaleState("en");
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("padantal-lang", l);
    } catch {}
    document.documentElement.lang = l;
  };

  return (
    <LangContext.Provider value={{ locale, setLocale, t: dict[locale] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

/** Atajo al diccionario del idioma actual. */
export function useT() {
  return useLang().t;
}
