import { Link } from 'react-router-dom'
import { SeoHead } from '../../seo/SeoHead.jsx'
import { BreadcrumbSchema } from '../../seo/StructuredData.jsx'
import { SITE_URL } from '../../seo/seoContent.js'
import './legal.css'

export function TermsPage() {
  return (
    <article className="legal-page">
      <SeoHead
        title="Terms of Service | About Currency"
        description="The terms governing your use of currencyabout.com — acceptable use, intellectual property, disclaimers, liability limits, and governing law."
        path="/terms"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Terms of Service', url: `${SITE_URL}/terms` },
      ]} />

      <div className="legal-page__meta">Last updated: April 20, 2026</div>
      <h1>Terms of Service</h1>

      <p className="legal-page__lead">
        These Terms govern your use of <strong>currencyabout.com</strong> ("the Service", "we",
        "our"). By accessing or using the Service, you agree to these Terms. If you do not agree,
        please do not use the Service.
      </p>

      <section className="legal-page__section">
        <h2>1. The Service</h2>
        <p>
          About Currency is a free, informational currency-conversion tool. It displays daily
          exchange-rate data and provides guides on international money topics. The Service is
          provided on an "as is" and "as available" basis, without warranties of any kind, either
          express or implied.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>2. No Financial Advice</h2>
        <div className="legal-page__callout">
          <strong>Important:</strong> The rates and information on this site are for reference
          only. They are not financial, investment, tax, or legal advice. Do not make financial
          decisions based solely on information displayed here. Always verify rates with your
          actual payment provider and consult a licensed professional for significant decisions.
        </div>
        <p>
          Exchange rates shown are mid-market reference rates. Your real-world conversion cost
          will typically include bank fees, card markups, or money-transfer service margins.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>3. Accuracy of Data</h2>
        <p>
          We pull rates from a third-party API and cache them daily. While we make reasonable
          efforts to display accurate data, we make <strong>no warranty</strong> that:
        </p>
        <ul>
          <li>The rates are current to the minute or second.</li>
          <li>The rates reflect the price you will obtain from any specific bank, card, or transfer service.</li>
          <li>The Service will be uninterrupted, timely, secure, or error-free.</li>
        </ul>
        <p>
          If you are converting a material amount, confirm the rate with the party actually moving
          your money before acting.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Scrape, crawl, or systematically download content from the Service using automated tools except as permitted by our <Link to="/">robots.txt</Link>.</li>
          <li>Interfere with, disrupt, or place unreasonable load on the Service's infrastructure.</li>
          <li>Attempt to gain unauthorized access to any part of the Service.</li>
          <li>Use the Service to build a competing commercial product without written permission.</li>
          <li>Use the Service in any way that violates applicable law.</li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2>5. Intellectual Property</h2>
        <p>
          The site's software, design, original text, and layout are owned by About Currency or
          its licensors and are protected by applicable copyright and trademark laws. You may
          quote short excerpts of our guides for non-commercial purposes with attribution and a
          link back. Reproducing substantial portions without permission is prohibited.
        </p>
        <p>
          Exchange-rate data is public reference information and is not claimed as our proprietary
          content. Currency names and codes follow the ISO 4217 standard.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>6. Third-Party Links and Services</h2>
        <p>
          The Service may contain links to external websites and displays advertisements served
          by Google AdSense. We do not control and are not responsible for the content, privacy
          practices, or accuracy of any third-party site or service. Clicking external links is
          at your own discretion.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>7. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, About Currency and its contributors are not
          liable for any indirect, incidental, special, consequential, or punitive damages — or
          for any loss of profits, data, or goodwill — arising from your use of the Service, even
          if we have been advised of the possibility of such damages.
        </p>
        <p>
          Our aggregate liability to you for any claim relating to the Service is limited to
          <strong> US $0</strong>, reflecting the fact that the Service is provided free of
          charge.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>8. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless About Currency from any claims, damages, or
          expenses (including reasonable legal fees) arising from your misuse of the Service or
          violation of these Terms.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>9. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Material changes will be announced by
          updating the "Last updated" date at the top of this page. Continued use of the Service
          after changes constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the jurisdiction where About Currency is
          operated, without regard to conflict-of-law principles. Any dispute will be resolved in
          the courts of that jurisdiction.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>11. Contact</h2>
        <p>
          For questions about these Terms, visit our <Link to="/contact">contact page</Link>.
          See also our <Link to="/privacy-policy">privacy policy</Link>.
        </p>
      </section>
    </article>
  )
}
