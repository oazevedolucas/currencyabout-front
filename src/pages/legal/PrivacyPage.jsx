import { Link } from 'react-router-dom'
import { SeoHead } from '../../seo/SeoHead.jsx'
import { BreadcrumbSchema } from '../../seo/StructuredData.jsx'
import { SITE_URL } from '../../seo/seoContent.js'
import './legal.css'

export function PrivacyPage() {
  return (
    <article className="legal-page">
      <SeoHead
        title="Privacy Policy | About Currency"
        description="How About Currency handles your data: what we collect, what third parties (Google AdSense, fonts, API) receive, cookie usage, your rights under GDPR and CCPA."
        path="/privacy-policy"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Privacy Policy', url: `${SITE_URL}/privacy-policy` },
      ]} />

      <div className="legal-page__meta">Last updated: April 20, 2026</div>
      <h1>Privacy Policy</h1>

      <p className="legal-page__lead">
        This policy explains what information About Currency collects when you use
        <strong> currencyabout.com</strong>, how that information is used, who it is shared with,
        and your rights. We try to collect as little as possible and be plain about the rest.
      </p>

      <section className="legal-page__section">
        <h2>1. Data We Collect Directly</h2>
        <p>About Currency does <strong>not</strong> require an account. We do not collect names, email addresses, or payment information through the converter itself. Specifically:</p>
        <ul>
          <li><strong>Language preference</strong> — stored in your browser's <code>localStorage</code> so the site loads in the same language next time.</li>
          <li><strong>Theme preference</strong> (light or dark) — stored the same way.</li>
          <li><strong>Cached exchange rates</strong> — stored locally so we do not re-request data you already have.</li>
        </ul>
        <p>None of this leaves your browser. It is readable only by About Currency and cleared when you clear your browser data.</p>
      </section>

      <section className="legal-page__section">
        <h2>2. Data Collected Automatically by the Hosting Provider</h2>
        <p>
          Our site is served through <strong>Cloudflare</strong>. Like any website host, Cloudflare
          processes standard HTTP request data — IP address, user-agent, request timestamp, and
          referring URL — for security, abuse prevention, and performance monitoring. This is
          governed by Cloudflare's own privacy policy.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>3. Third-Party Services We Use</h2>

        <h3>3.1 Google AdSense (Advertising)</h3>
        <p>
          We display advertisements through <strong>Google AdSense</strong>. Google and its
          partners may use cookies and identifiers to:
        </p>
        <ul>
          <li>Serve ads based on your prior visits to this and other websites.</li>
          <li>Measure ad performance (impressions, clicks, conversions).</li>
          <li>Prevent fraudulent ad traffic.</li>
        </ul>
        <p>
          You can opt out of personalized advertising by visiting
          {' '}<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>
          {' '}or
          {' '}<a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
          For more detail, see
          {' '}<a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google's partner-sites policy</a>.
        </p>

        <h3>3.2 Exchange-Rate API</h3>
        <p>
          We fetch exchange-rate data from a public API (<strong>open.er-api.com</strong>). When
          your browser requests a rate, the API provider receives your IP address as part of any
          normal HTTP request. No identifying data is sent by us.
        </p>

        <h3>3.3 Google Fonts</h3>
        <p>
          We use Google Fonts to load the Inter typeface. Google receives your IP and user-agent
          as part of font delivery, per
          {' '}<a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener noreferrer">Google Fonts' privacy FAQ</a>.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>4. Cookies</h2>
        <p>The cookies that may be set on your device fall into these categories:</p>
        <ul>
          <li><strong>Strictly necessary</strong>: Cloudflare security cookies (e.g., <code>__cf_bm</code>).</li>
          <li><strong>Advertising</strong>: Google and partners may set cookies (e.g., <code>IDE</code>, <code>NID</code>) for ad personalization and measurement.</li>
        </ul>
        <p>
          You can block or delete cookies in your browser settings. Doing so will not break the
          converter, but may affect advertising relevance.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>5. Your Rights</h2>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Know what personal data is collected about you.</li>
          <li>Request a copy of that data.</li>
          <li>Request deletion of that data.</li>
          <li>Opt out of the sale or sharing of personal information (<strong>CCPA/CPRA, for California residents</strong>).</li>
          <li>Object to or restrict processing (<strong>GDPR, for EU/EEA residents</strong>).</li>
          <li>Lodge a complaint with a supervisory authority.</li>
        </ul>
        <p>
          Because we do not collect account-level personal data, most requests will be directed to
          the third parties listed above (notably Google). For anything we can act on, contact us
          via the <Link to="/contact">contact page</Link>.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>6. Children's Privacy</h2>
        <p>
          About Currency is not directed at children under 13. We do not knowingly collect
          information from children under 13. If you believe a child has provided data to us,
          please contact us and we will take appropriate action.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>7. Changes to This Policy</h2>
        <p>
          If we make material changes, we will update the "Last updated" date at the top of this
          page. Continued use of the site after an update constitutes acceptance of the revised
          policy.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>8. Contact</h2>
        <p>
          Questions about this privacy policy? Visit our <Link to="/contact">contact page</Link>.
        </p>
      </section>
    </article>
  )
}
