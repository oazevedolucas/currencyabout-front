import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import en from './locales/en.js'
import pt from './locales/pt.js'
import es from './locales/es.js'
import fr from './locales/fr.js'
import de from './locales/de.js'
import zh from './locales/zh.js'
import ja from './locales/ja.js'

export const locales = { en, pt, es, fr, de, zh, ja }

const STORAGE_KEY = 'currencyabout_lang'

function detectLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && locales[saved]) return saved

  const browserLang = navigator.language?.slice(0, 2)
  if (browserLang && locales[browserLang]) return browserLang

  return 'en'
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage)

  const changeLang = useCallback((code) => {
    setLang(code)
    localStorage.setItem(STORAGE_KEY, code)
    document.documentElement.lang = code
  }, [])

  const t = useMemo(() => locales[lang] || locales.en, [lang])

  const value = useMemo(() => ({ lang, t, changeLang }), [lang, t, changeLang])

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
