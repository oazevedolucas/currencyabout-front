import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

const STORAGE_KEY = 'currencyabout_theme'
const ThemeContext = createContext(null)

function detectTheme() {
  // SSR / build-time: no localStorage, no matchMedia. Return 'light' to match
  // the index.html baseline (<html data-theme="light">) so renderToString
  // and the hydrated client agree on the initial theme attribute.
  if (typeof window === 'undefined') return 'light'
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // ignore — storage blocked
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(detectTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b120e' : '#4ade80')
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, next)
        } catch {
          // ignore — storage blocked
        }
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
