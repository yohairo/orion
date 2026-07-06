import { createContext, useContext, type ReactNode } from 'react';
import { getTranslations, type Translations } from './index';

const I18nContext = createContext<Translations>(getTranslations('en'));

export function I18nProvider({ lang, children }: { lang: string; children: ReactNode }) {
  const t = getTranslations(lang);
  return <I18nContext.Provider value={t}>{children}</I18nContext.Provider>;
}

export function useTranslate(): Translations {
  return useContext(I18nContext);
}
