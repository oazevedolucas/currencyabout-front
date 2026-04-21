import { useI18n } from '../../i18n/I18nContext.jsx'
import './QuickAmounts.css'

const AMOUNT_PRESETS = [10, 50, 100, 500, 1000, 5000]

export function QuickAmounts({ value, onChange, symbol }) {
  const { t } = useI18n()
  const currentAmount = value ? Number(value) / 100 : 0

  return (
    <div className="quick-amounts" role="group" aria-label={t.quickAmounts || 'Quick amounts'}>
      <span className="quick-amounts__label">{t.quickAmounts || 'Quick amounts'}</span>
      <div className="quick-amounts__chips">
        {AMOUNT_PRESETS.map((amt) => {
          const isActive = Math.abs(currentAmount - amt) < 0.01
          return (
            <button
              key={amt}
              type="button"
              className={`quick-amounts__chip ${isActive ? 'quick-amounts__chip--active' : ''}`}
              onClick={() => onChange(String(amt * 100))}
              aria-pressed={isActive}
            >
              {symbol} {amt.toLocaleString('en')}
            </button>
          )
        })}
      </div>
    </div>
  )
}
