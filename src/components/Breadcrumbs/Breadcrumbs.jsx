import { Link } from 'react-router-dom'
import './Breadcrumbs.css'

export function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={`${item.label}-${idx}`} className="breadcrumbs__item">
              {isLast || !item.to ? (
                <span className="breadcrumbs__current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="breadcrumbs__link">
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <span className="breadcrumbs__sep" aria-hidden="true">/</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
