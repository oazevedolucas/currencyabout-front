import { memo, useCallback } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import './CurrencyFilter.css'

export const CurrencyFilter = memo(function CurrencyFilter({ currencies, selected, onChange }) {
  const { t } = useI18n()
  const allSelected = selected.size === currencies.length

  const handleClick = useCallback((code) => {
    if (allSelected) {
      onChange(new Set([code]))
      return
    }

    if (selected.size === 1 && selected.has(code)) {
      onChange(new Set(currencies.map((c) => c.code)))
      return
    }

    const next = new Set(selected)
    if (next.has(code)) {
      next.delete(code)
    } else {
      next.add(code)
    }
    onChange(next)
  }, [currencies, selected, allSelected, onChange])

  const handleShowAll = useCallback(() => {
    onChange(new Set(currencies.map((c) => c.code)))
  }, [currencies, onChange])

  return (
    <div className="currency-filter">
      <div className="currency-filter__header">
        <span className="currency-filter__label">{t.filterLabel}</span>
        {!allSelected && (
          <button
            type="button"
            className="currency-filter__reset"
            onClick={handleShowAll}
          >
            {t.filterShowAll}
          </button>
        )}
      </div>
      <div className="currency-filter__chips" role="group" aria-label={t.filterBy}>
        {currencies.map((c) => {
          const isActive = selected.has(c.code)
          return (
            <button
              key={c.code}
              type="button"
              className={`currency-filter__chip ${isActive ? 'currency-filter__chip--active' : ''}`}
              onClick={() => handleClick(c.code)}
              aria-pressed={isActive}
              title={c.name}
            >
              <span className="currency-filter__chip-flag" aria-hidden="true">{c.flag}</span>
              <span className="currency-filter__chip-code">{c.code}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
})
