import { Link } from 'react-router-dom'
import './RateDisclaimer.css'

export function RateDisclaimer() {
  return (
    <aside className="rate-disclaimer" role="note" aria-label="Rate disclaimer">
      <p className="rate-disclaimer__text">
        Rates shown are <strong>mid-market reference rates</strong>, sourced from
        {' '}<a href="https://open.er-api.com" target="_blank" rel="noopener noreferrer">open.er-api.com</a>
        {' '}and refreshed once per calendar day. They are indicative and may differ from the
        rate any specific bank, card, or transfer service quotes you. About Currency does not
        provide financial, tax, or investment advice. See our
        {' '}<Link to="/methodology">methodology</Link> for sources and known limits.
      </p>
    </aside>
  )
}
