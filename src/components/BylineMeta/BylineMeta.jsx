import { Link } from 'react-router-dom'
import { getAuthor } from '../../content/authors.js'
import './BylineMeta.css'

function formatDate(isoDate, lang) {
  try {
    return new Date(isoDate + 'T00:00:00').toLocaleDateString(lang, {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  } catch (_) {
    return isoDate // ignore — fall back to ISO string
  }
}

export function BylineMeta({ authorSlug, reviewedDate, reviewedLabel, readingMinutes, readingLabel, byLabel, lang = 'en' }) {
  const author = getAuthor(authorSlug)
  if (!author) return null

  return (
    <div className="byline-meta">
      <span className="byline-meta__author">
        {byLabel}{' '}
        <Link to="/about#author" className="byline-meta__link">{author.name}</Link>
      </span>
      {readingMinutes ? (
        <>
          <span aria-hidden="true" className="byline-meta__sep">·</span>
          <span className="byline-meta__reading">{readingMinutes} {readingLabel}</span>
        </>
      ) : null}
      {reviewedDate ? (
        <>
          <span aria-hidden="true" className="byline-meta__sep">·</span>
          <span className="byline-meta__reviewed">{reviewedLabel} {formatDate(reviewedDate, lang)}</span>
        </>
      ) : null}
    </div>
  )
}
