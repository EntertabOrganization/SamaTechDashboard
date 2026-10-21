"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { translate, type Language } from "./translations";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
}>({ language: "en", setLanguage: () => {} });

export function LanguageProvider({ initialLanguage, children }: {
  initialLanguage: Language;
  children: ReactNode;
}) {
  const [language, updateLanguage] = useState(initialLanguage);

  function setLanguage(next: Language) {
    updateLanguage(next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.cookie = `samatechs-language=${next}; path=/; max-age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return { ...context, t: (text: string) => translate(text, context.language) };
}

/** Localize text without changing markup, component state, or form values. */
export function Trans({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  if (typeof children === "string") return translate(children, language);
  if (Array.isArray(children)) return children.map((child) =>
    typeof child === "string" ? translate(child, language) : child);
  return children;
}
