import React, { createContext, useContext, useState } from 'react';
import { translations } from './i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const detected = navigator.language?.startsWith('ru') ? 'ru' : 'en';
  const stored = localStorage.getItem('lang');
  const [lang, setLang] = useState(stored || detected);

  const toggle = () => {
    const next = lang === 'en' ? 'ru' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
