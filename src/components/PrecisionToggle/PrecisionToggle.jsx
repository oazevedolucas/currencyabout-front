import { useI18n } from '../../i18n/I18nContext.jsx'
import './PrecisionToggle.css'

export function PrecisionToggle({ value, onChange }) {
  const { t } = useI18n()
  const labels = t.precision || {}
  const isPrecise = value === 'precise'
  const ariaLabel = isPrecise
    ? (labels.switchToRounded || 'Switch to rounded (2 decimals)')
    : (labels.switchToPrecise || 'Switch to precise (4 decimals)')

  return (
    <div className="precision-toggle" role="group" aria-label={labels.heading || 'Number precision'}>
      <button
        type="button"
        className={`precision-toggle__btn ${!isPrecise ? 'precision-toggle__btn--active' : ''}`}
        onClick={() => onChange('rounded')}
        aria-pressed={!isPrecise}
        title={labels.rounded || 'Rounded (2 decimals)'}
      >
        0,00
      </button>
      <button
        type="button"
        className={`precision-toggle__btn ${isPrecise ? 'precision-toggle__btn--active' : ''}`}
        onClick={() => onChange('precise')}
        aria-pressed={isPrecise}
        title={labels.precise || 'Precise (4 decimals)'}
      >
        0,0000
      </button>
      <span className="sr-only" aria-live="polite">{ariaLabel}</span>
    </div>
  )
}
