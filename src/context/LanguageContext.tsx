'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale } from '@/types';
import { TRANSLATIONS, TranslationKey } from '@/lib/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt'); // Default to PT as requested or EN

  useEffect(() => {
    // Check saved preference in localStorage
    const saved = localStorage.getItem('forturismo_locale') as Locale | null;
    if (saved && (saved === 'en' || saved === 'pt' || saved === 'es')) {
      setLocaleState(saved);
    } else {
      // Check browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('pt')) {
        setLocaleState('pt');
      } else if (browserLang.startsWith('es')) {
        setLocaleState('es');
      } else {
        setLocaleState('en');
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('forturismo_locale', newLocale);
  };

  const t = (key: TranslationKey): string => {
    const dict = TRANSLATIONS[locale] || TRANSLATIONS.en;
    return (dict as Record<string, string>)[key] || (TRANSLATIONS.en as Record<string, string>)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
