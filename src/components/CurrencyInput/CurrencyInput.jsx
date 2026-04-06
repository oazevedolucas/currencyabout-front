import { useRef, useState, useEffect } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import './CurrencyInput.css'

function formatAmount(value) {
  if (!value) return ''
  const num = Number(value) / 100
  return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function CurrencyInput({ value, onChange, currencies, selectedCurrency, onCurrencyChange }) {
  const { t } = useI18n()
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchRef = useRef(null)

  const selected = currencies.find((c) => c.code === selectedCurrency)

  const filtered = search
    ? currencies.filter(
        (c) =>
          c.code.toLowerCase().includes(search.toLowerCase()) ||
          c.name.toLowerCase().includes(search.toLowerCase())
      )
    : currencies

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus()
    }
  }, [open])

  function handleChange(e) {
    const raw = e.target.value.replace(/\D/g, '')
    onChange(raw)
  }

  function handleFocus() {
    const el = inputRef.current
    if (el) {
      requestAnimationFrame(() => {
        el.setSelectionRange(el.value.length, el.value.length)
      })
    }
  }

  function handleSelect(code) {
    onCurrencyChange(code)
    setOpen(false)
    setSearch('')
  }

  const display = value ? formatAmount(value) : ''
  const symbol = selected?.code || 'BRL'

  return (
    <div className="currency-input">
      <label className="currency-input__label" htmlFor="amount">
        {t.inputLabel}
      </label>
      <div className="currency-input__wrapper">
        <div className="currency-input__selector" ref={dropdownRef}>
          <button
            type="button"
            className="currency-input__trigger"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-haspopup="listbox"
          >
            <span className="currency-input__trigger-flag" aria-hidden="true">
              {selected?.flag}
            </span>
            <span className="currency-input__trigger-code">{symbol}</span>
            <span className="currency-input__trigger-symbol">{selected?.symbol}</span>
            <svg className={`currency-input__chevron ${open ? 'currency-input__chevron--open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {open && (
            <div className="currency-input__dropdown" role="listbox" aria-label={t.selectCurrency}>
              <div className="currency-input__search-wrapper">
                <input
                  ref={searchRef}
                  type="text"
                  className="currency-input__search"
                  placeholder={t.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label={t.searchCurrency}
                />
              </div>
              <div className="currency-input__options">
                {filtered.length > 0 ? (
                  filtered.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      role="option"
                      aria-selected={c.code === selectedCurrency}
                      className={`currency-input__option ${c.code === selectedCurrency ? 'currency-input__option--selected' : ''}`}
                      onClick={() => handleSelect(c.code)}
                    >
                      <span className="currency-input__option-flag" aria-hidden="true">{c.flag}</span>
                      <span className="currency-input__option-code">{c.code}</span>
                      <span className="currency-input__option-symbol">{c.symbol}</span>
                      <span className="currency-input__option-name">{c.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="currency-input__empty">{t.noCurrencyFound}</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="currency-input__field-wrapper">
          <span className="currency-input__field-symbol">{selected?.symbol}</span>
          <input
            ref={inputRef}
            id="amount"
            type="text"
            inputMode="numeric"
            className="currency-input__field"
            placeholder={t.inputPlaceholder}
            value={display}
            onChange={handleChange}
            onFocus={handleFocus}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}
