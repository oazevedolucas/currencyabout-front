import { Link } from 'react-router-dom'
import { SeoHead } from '../../seo/SeoHead.jsx'
import { BreadcrumbSchema } from '../../seo/StructuredData.jsx'
import { SITE_URL } from '../../seo/seoContent.js'
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs.jsx'
import './legal.css'

export function MethodologyPage() {
  return (
    <article className="legal-page">
      <SeoHead
        title="Methodology — How We Source and Calculate Exchange Rates | About Currency"
        description="A transparent, in-depth look at how About Currency sources foreign-exchange data, refreshes rates, calculates conversions, and discloses limitations. Editorial standards, data partners, accuracy disclosures, and known caveats."
        path="/methodology"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Methodology', url: `${SITE_URL}/methodology` },
      ]} />

      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: 'Methodology' },
      ]} />

      <div className="legal-page__meta">Last updated: May 4, 2026</div>
      <h1>Methodology: How We Source and Calculate Exchange Rates</h1>

      <p className="legal-page__lead">
        This page exists for one reason: transparency. When a website tells you the
        US dollar is worth 5.02 Brazilian reais today, you deserve to know where that
        number came from, when it was last refreshed, what assumptions sit behind it,
        and what it can and cannot be used for. Below is a full, plain-English walk-through
        of the data and editorial process behind every figure on About Currency.
      </p>

      <section className="legal-page__section">
        <h2>1. What kind of rates we publish</h2>
        <p>
          Every exchange rate displayed on About Currency is a <strong>mid-market reference rate</strong> — the
          midpoint between the price at which large banks buy a currency and the price at which
          they sell it on the global interbank market. This is the same kind of figure quoted by
          news outlets, central banks, and reputable financial publications when they report "today's
          exchange rate".
        </p>
        <p>
          Mid-market rates are the cleanest, fairest single number to publish, because they remove
          the spread that any specific provider would add to a real customer transaction. They are
          ideal for understanding the economic relationship between two currencies. They are
          <strong> not</strong> the rate you will receive from a bank, card, or money-transfer service —
          a point we deliberately repeat across the site so readers do not budget around an
          unrealistically favourable number. For the difference between mid-market and retail rates,
          see our guide on <Link to="/guides/how-exchange-rates-work">how exchange rates work</Link>.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>2. Where the data comes from</h2>
        <p>
          Live exchange rates are pulled from a public exchange-rate API
          (<code>open.er-api.com</code>) that itself aggregates publicly available reference data
          from a broad pool of sources, including central-bank reference rates and major commercial
          banks. We chose this provider for three reasons:
        </p>
        <ul>
          <li><strong>Transparency.</strong> The provider publishes its sourcing approach openly.</li>
          <li><strong>Stability.</strong> The endpoint has multi-year uptime and consistent schemas.</li>
          <li><strong>Independence.</strong> It is not operated by any company we are commercially tied to.</li>
        </ul>
        <p>
          Whenever a discrepancy is reported between our rate and another reference site (the IMF,
          the ECB, Bloomberg), we treat the third-party source as authoritative for cross-checking
          and update our process where warranted.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>3. Refresh cadence and caching</h2>
        <p>
          We fetch a fresh rate snapshot once per calendar day. The snapshot is stored in the
          visitor's browser (in <code>localStorage</code>) so subsequent conversions during the same
          day load instantly without an additional network round-trip. This is a deliberate choice —
          it keeps the site fast on slow connections and reduces unnecessary API calls. If you reload
          the page after the daily refresh window, you will receive the new snapshot.
        </p>
        <div className="legal-page__callout">
          <strong>What this means for you:</strong> the rate displayed during a given day is the rate
          observed at the moment of the day's first refresh, not a tick-by-tick streaming quote. For
          casual conversion (travel budgeting, online shopping, remittances) this is more than
          accurate enough. For trading, you should use a professional real-time data feed.
        </div>
      </section>

      <section className="legal-page__section">
        <h2>4. How we compute cross-rates</h2>
        <p>
          Our data partner publishes a base table of rates expressed against a single base currency
          (typically USD). To compute, for example, an EUR-to-BRL rate, we apply the standard
          mathematical relationship:
        </p>
        <pre className="legal-page__code">
{`rate(EUR → BRL) = rate(USD → BRL) / rate(USD → EUR)`}
        </pre>
        <p>
          This produces what is known as a <em>cross-rate</em>. Cross-rates can differ very slightly
          from the same pair quoted directly on a trading venue because of microsecond-level spread
          differences in the underlying market. For practical purposes the divergence is negligible
          (typically well under 0.1%).
        </p>
        <p>
          The reverse direction is computed by simple inversion: <code>rate(B → A) = 1 / rate(A → B)</code>.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>5. Currencies covered and selection criteria</h2>
        <p>
          About Currency supports 21 currencies that together account for the overwhelming majority
          of global foreign-exchange volume:
        </p>
        <ul>
          <li><strong>Reserve majors:</strong> USD, EUR, JPY, GBP, CHF.</li>
          <li><strong>Commodity-linked majors:</strong> CAD, AUD, NZD, NOK.</li>
          <li><strong>Asia-Pacific:</strong> CNY, INR, KRW, SGD, HKD.</li>
          <li><strong>Europe (non-euro):</strong> SEK, DKK.</li>
          <li><strong>Latin America:</strong> BRL, MXN.</li>
          <li><strong>Middle East:</strong> AED, SAR, ILS.</li>
        </ul>
        <p>
          Currencies are added when (a) they have a stable, freely available reference rate,
          (b) they are convertible enough that a published mid-market rate is meaningful, and
          (c) reader demand justifies the maintenance overhead. We deliberately avoid listing
          currencies whose rates are heavily distorted by capital controls or parallel markets,
          because publishing a single "official" rate for those currencies would be misleading.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>6. Rounding and display precision</h2>
        <p>
          Rates are stored internally at the precision delivered by the source (typically 4–6
          significant digits) and displayed with a precision appropriate to the magnitude of the
          rate:
        </p>
        <ul>
          <li>Rates above 100 are shown to 2 decimal places (for example, JPY values).</li>
          <li>Rates between 1 and 100 are shown to 4 decimal places.</li>
          <li>Sub-unit rates may use up to 6 decimal places when toggled to "precise" mode.</li>
        </ul>
        <p>
          The user-facing precision toggle on the homepage lets you switch between rounded
          (everyday use) and precise (analytical use) display modes without changing the underlying
          calculation.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>7. Editorial process</h2>
        <p>
          All non-data content on this site — guides, currency profiles, FAQ answers, methodology
          notes — is written by a small team of writers and engineers with backgrounds in financial
          technology, international payments, and consumer finance. We do not generate articles
          algorithmically and we do not republish content from other sites.
        </p>
        <p>Three editorial principles govern every page we publish:</p>
        <ol>
          <li>
            <strong>Accuracy over fluency.</strong> Where the simple version of a fact would be
            misleading (for example, the difference between mid-market and retail rates) we choose
            the longer, more accurate explanation, even at the cost of brevity.
          </li>
          <li>
            <strong>No hidden recommendations.</strong> We do not accept paid placement of specific
            banks, transfer services, fintech apps, or trading platforms in our editorial content.
            Any future affiliate or partner relationships will be disclosed inline at the point of
            mention.
          </li>
          <li>
            <strong>Update or retire.</strong> Articles are reviewed at least annually, with the
            "Last updated" date reflecting the most recent material change. Pages that no longer
            meet our standard are corrected or removed rather than left to drift.
          </li>
        </ol>
      </section>

      <section className="legal-page__section">
        <h2>8. Known limitations</h2>
        <p>
          We believe in stating openly what this site is <em>not</em>:
        </p>
        <ul>
          <li>
            <strong>Not a trading platform.</strong> The rates here are reference figures, refreshed
            daily, not live tick-by-tick quotes. They are unsuitable for execution decisions in
            FX trading.
          </li>
          <li>
            <strong>Not a financial advisor.</strong> Nothing on this site constitutes investment,
            tax, legal, or remittance advice. We provide context; you make the decision.
          </li>
          <li>
            <strong>Not exhaustive.</strong> We do not yet cover every currency in the world. If a
            currency you need is missing, please contact us — we maintain a public backlog of
            requested additions.
          </li>
          <li>
            <strong>Not always perfectly synchronised.</strong> Because we cache for a day, you may
            occasionally see a rate that is a few hours stale relative to the very latest market
            print. For casual use this is by design; for time-sensitive use, cross-check.
          </li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2>9. Corrections policy</h2>
        <p>
          If you spot an error — a typo, a stale figure, a misleading framing — please write to us
          via the <Link to="/contact">contact page</Link>. We respond to corrections requests within
          a few business days. Material corrections to published guides are noted in a "Corrections"
          line at the bottom of the affected article.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>10. Independence and funding</h2>
        <p>
          About Currency is funded by display advertising served through Google AdSense, plus a
          small set of contextual partner links that we may add in the future and disclose
          individually. We do not receive payment in exchange for editorial coverage, ranking, or
          inclusion in our currency list. The advertising on this site has no influence over the
          rates we display, the guides we publish, or the design choices we make.
        </p>
        <p>
          For full disclosure on advertising cookies and reader privacy, see our
          {' '}<Link to="/privacy-policy">privacy policy</Link>. For the legal framework that
          governs use of the site, see our <Link to="/terms">terms of service</Link>.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>Questions or corrections?</h2>
        <p>
          We treat methodology as a living document. If you believe a calculation, source, or
          framing on this page can be made more accurate or more useful, we want to hear from you.
          Reach out via our <Link to="/contact">contact page</Link>.
        </p>
      </section>
    </article>
  )
}
