import { Link } from 'react-router-dom'
import { SeoHead } from '../../seo/SeoHead.jsx'
import { BreadcrumbSchema } from '../../seo/StructuredData.jsx'
import { SITE_URL } from '../../seo/seoContent.js'
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs.jsx'
import './legal.css'

export function AboutPage() {
  return (
    <article className="legal-page">
      <SeoHead
        title="About Us - Our Mission & How We Work | About Currency"
        description="About Currency is an independent currency conversion tool providing reliable daily exchange rates for 21+ world currencies. Learn about our mission, data sources, and editorial standards."
        path="/about"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'About', url: `${SITE_URL}/about` },
      ]} />

      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: 'About' },
      ]} />

      <div className="legal-page__meta">Last updated: April 20, 2026</div>
      <h1>About About Currency</h1>

      <p className="legal-page__lead">
        About Currency is a free, independent online currency converter that helps travelers,
        freelancers, businesses, and curious readers make sense of foreign-exchange rates.
        Our mission is simple: deliver accurate, transparent, and privacy-respecting currency data —
        without login walls, hidden fees, or misleading math.
      </p>

      <section className="legal-page__section">
        <h2>Our Mission</h2>
        <p>
          Every day, hundreds of millions of people convert currencies — for online shopping, for
          travel, for paying overseas contractors, for remittances to family abroad. Yet most
          conversion tools bury users under advertising, request unnecessary personal data, or
          quote rates that differ significantly from the true mid-market rate.
        </p>
        <p>
          We built About Currency to be the opposite: <strong>fast, ad-light, transparent, and
          free</strong>. You can see today's rate, understand where it comes from, convert any
          amount you want, and leave — no account required.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>How We Source Exchange Rates</h2>
        <p>
          We pull daily reference rates from a public exchange-rate API that aggregates data from
          major financial institutions and central-bank publications. Rates are cached in your
          browser for the day for performance, and refreshed automatically each day. For a full
          walk-through of our data pipeline, refresh cadence, and known limitations, see our
          dedicated <Link to="/methodology">methodology page</Link>.
        </p>
        <div className="legal-page__callout">
          <strong>Important:</strong> The rates shown on this site are <em>mid-market reference rates</em> —
          the midpoint between the interbank buy and sell prices. They do not include the spreads,
          margins, or fees charged by banks, cards, or money-transfer services. Your real-world
          conversion cost will typically be 0.5%–5% higher than the quoted rate.
        </div>
      </section>

      <section className="legal-page__section">
        <h2>What Makes Us Different</h2>
        <ul>
          <li><strong>21+ currencies</strong> covering 90%+ of global foreign-exchange volume.</li>
          <li><strong>7 languages</strong> — English, Portuguese, Spanish, French, German, Chinese, and Japanese.</li>
          <li><strong>No account, no tracking beyond what's disclosed</strong> in our <Link to="/privacy-policy">privacy policy</Link>.</li>
          <li><strong>Light, fast, and accessible</strong> — works on slow connections and screen readers.</li>
          <li><strong>Dark and light themes</strong> that respect your system preferences.</li>
          <li><strong>Detailed pair pages</strong> for each major currency combination, with historical context and practical use cases.</li>
          <li><strong>Educational guides</strong> that explain how exchange rates work, without finance jargon.</li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2>Editorial Standards</h2>
        <p>
          Guides and reference articles on this site are written and reviewed by contributors with
          backgrounds in financial technology, international payments, and consumer finance.
          Our editorial policy follows three principles:
        </p>
        <ol>
          <li><strong>Accuracy</strong> — we cite central banks, standards bodies (ISO 4217), and reputable financial publications for any factual claim.</li>
          <li><strong>Neutrality</strong> — we do not recommend specific banks, wallets, or payment services in exchange for compensation.</li>
          <li><strong>Transparency</strong> — every article shows its last-updated date, and material changes are noted.</li>
        </ol>
      </section>

      <section className="legal-page__section">
        <h2>Who We Are</h2>
        <p>
          About Currency is an independent project. It is not affiliated with any bank, broker,
          money-transfer service, or government agency. The site is maintained by a small team of
          web engineers and writers who care about useful, honest financial tools.
        </p>
        <p>
          If you want to get in touch — press inquiries, corrections, partnership ideas, or
          feedback — please visit our <Link to="/contact">contact page</Link>.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>A Note on Advertising</h2>
        <p>
          To keep the site free, we display advertising served through Google AdSense. Ads are
          clearly labeled and are never presented as editorial content. We do not accept paid
          placement in our guides, and ranking on this site has nothing to do with advertiser
          relationships. See our <Link to="/privacy-policy">privacy policy</Link> for details on
          how advertising cookies work.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>Disclaimer</h2>
        <p>
          About Currency provides information for educational and reference purposes. It is not
          financial advice. Always confirm the rate offered by your actual payment provider before
          committing to a large conversion, and consult a licensed professional for tax or
          investment decisions. Full details in our <Link to="/terms">terms of service</Link>.
        </p>
      </section>
    </article>
  )
}
