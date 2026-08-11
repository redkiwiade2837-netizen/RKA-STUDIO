import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('rka_language') || 'en');

  useEffect(() => {
    localStorage.setItem('rka_language', language);
  }, [language]);

  // "checkout.email" -> translations[language].checkout.email
  const t = (path) => {
    const value = path.split('.').reduce((node, key) => node?.[key], translations[language]);
    return value ?? path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}