import './CurrencyCardSkeleton.css'

export function CurrencyCardSkeleton() {
  return (
    <div className="currency-card-skeleton" aria-hidden="true">
      <div className="currency-card-skeleton__header">
        <div className="skeleton-shimmer currency-card-skeleton__flag" />
        <div className="currency-card-skeleton__info">
          <div className="skeleton-shimmer currency-card-skeleton__line currency-card-skeleton__line--short" />
          <div className="skeleton-shimmer currency-card-skeleton__line currency-card-skeleton__line--med" />
        </div>
      </div>
      <div className="currency-card-skeleton__value">
        <div className="skeleton-shimmer currency-card-skeleton__line currency-card-skeleton__line--lg" />
        <div className="skeleton-shimmer currency-card-skeleton__line currency-card-skeleton__line--xs" />
      </div>
    </div>
  )
}

export function CurrencyGridSkeleton({ count = 8 }) {
  return (
    <div
      className="currency-grid"
      role="status"
      aria-live="polite"
      aria-label="Loading exchange rates"
    >
      {Array.from({ length: count }).map((_, i) => (
        <CurrencyCardSkeleton key={i} />
      ))}
    </div>
  )
}
