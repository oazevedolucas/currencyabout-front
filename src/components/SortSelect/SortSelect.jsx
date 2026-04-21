import { useI18n } from '../../i18n/I18nContext.jsx'
import './SortSelect.css'

export function SortSelect({ value, onChange }) {
  const { t } = useI18n()
  const labels = t.sort || {}

  const options = [
    { value: 'strength-desc', label: labels.strengthDesc || 'Strongest first' },
    { value: 'strength-asc', label: labels.strengthAsc || 'Weakest first' },
    { value: 'continent', label: labels.continent || 'By continent' },
    { value: 'popular', label: labels.popular || 'Popular first' },
    { value: 'alpha', label: labels.alpha || 'A → Z' },
  ]

  return (
    <label className="sort-select">
      <span className="sort-select__label">{labels.heading || 'Sort'}</span>
      <div className="sort-select__wrapper">
        <select
          className="sort-select__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={labels.heading || 'Sort currencies'}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg className="sort-select__chevron" width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
  )
}
