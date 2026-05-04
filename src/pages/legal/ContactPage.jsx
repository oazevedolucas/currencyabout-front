import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SeoHead } from '../../seo/SeoHead.jsx'
import { BreadcrumbSchema } from '../../seo/StructuredData.jsx'
import { SITE_URL } from '../../seo/seoContent.js'
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs.jsx'
import './legal.css'

const CONTACT_EMAIL = 'contact@currencyabout.com'

export function ContactPage() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const body = encodeURIComponent(message)
    const subj = encodeURIComponent(subject || 'Contact from currencyabout.com')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subj}&body=${body}`
  }

  return (
    <article className="legal-page">
      <SeoHead
        title="Contact Us | About Currency"
        description="Get in touch with About Currency — corrections, feedback, press inquiries, or partnership ideas. We read every message."
        path="/contact"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Contact', url: `${SITE_URL}/contact` },
      ]} />

      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: 'Contact' },
      ]} />

      <div className="legal-page__meta">Last updated: April 20, 2026</div>
      <h1>Contact Us</h1>

      <p className="legal-page__lead">
        We read every message. Whether you spotted a typo, have a feature idea, want to collaborate,
        or need to reach us about a legal matter — please use one of the options below.
      </p>

      <section className="legal-page__section">
        <h2>Email</h2>
        <p>
          The fastest way to reach us is by email:
          {' '}<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>
          We aim to respond within <strong>3 business days</strong>. For urgent corrections that
          affect displayed data, please write "URGENT" in the subject line.
        </p>
      </section>

      <section className="legal-page__section">
        <h2>Send a Message</h2>
        <p>
          You can also use the short form below. It opens your default email client pre-filled with
          your message — we do not store form submissions on our server.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              type="text"
              className="contact-form__input"
              placeholder="e.g. Typo on GBP-to-USD page"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              maxLength={120}
              required
            />
          </div>
          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              className="contact-form__textarea"
              placeholder="Tell us what's on your mind..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={4000}
              required
            />
          </div>
          <button type="submit" className="btn btn--primary">Open email client</button>
        </form>
      </section>

      <section className="legal-page__section">
        <h2>What to Include</h2>
        <ul>
          <li><strong>Corrections:</strong> the page URL, the incorrect value, and the correct value with a source if possible.</li>
          <li><strong>Feature requests:</strong> what you are trying to accomplish, not just what feature to add.</li>
          <li><strong>Press inquiries:</strong> the outlet, deadline, and the angle you are exploring.</li>
          <li><strong>Legal or privacy matters:</strong> please reference this page and our <Link to="/privacy-policy">privacy policy</Link>.</li>
        </ul>
      </section>

      <section className="legal-page__section">
        <h2>What We Do Not Do</h2>
        <ul>
          <li>We do not provide personal financial advice or recommend specific banks, wallets, or money-transfer services.</li>
          <li>We do not sell data, user lists, or backlinks.</li>
          <li>We do not accept guest posts that include affiliate or sponsored links disguised as editorial content.</li>
        </ul>
      </section>
    </article>
  )
}
