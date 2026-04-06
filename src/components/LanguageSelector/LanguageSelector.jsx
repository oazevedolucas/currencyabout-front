import { useState, useRef, useEffect } from 'react'
import { useI18n, locales } from '../../i18n/I18nContext.jsx'
import './LanguageSelector.css'

const langList = Object.values(locales)

export function LanguageSelector() {
  const { lang, t, changeLang } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="lang-selector" ref={ref}>
      <button
        type="button"
        className="lang-selector__trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={t.selectCurrency}
      >
        <span className="lang-selector__flag" aria-hidden="true">{t.flag}</span>
        <span className="lang-selector__code">{lang.toUpperCase()}</span>
        <svg className={`lang-selector__chevron ${open ? 'lang-selector__chevron--open' : ''}`} width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="lang-selector__dropdown">
          {langList.map((locale) => (
            <button
              key={locale.lang}
              type="button"
              className={`lang-selector__option ${locale.lang === lang ? 'lang-selector__option--active' : ''}`}
              onClick={() => { changeLang(locale.lang); setOpen(false) }}
            >
              <span aria-hidden="true">{locale.flag}</span>
              <span>{locale.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
