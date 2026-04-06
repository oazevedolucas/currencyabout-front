import { useState } from 'react'
import { FAQSchema } from '../../seo/StructuredData.jsx'
import './FAQ.css'

export function FAQ({ questions }) {
  const [openIndex, setOpenIndex] = useState(null)

  if (!questions || questions.length === 0) return null

  return (
    <section className="faq" aria-label="Frequently asked questions">
      <FAQSchema questions={questions} />
      <h2 className="faq__title">FAQ</h2>
      <div className="faq__list">
        {questions.map((item, i) => (
          <details
            key={i}
            className="faq__item"
            open={openIndex === i}
            onToggle={(e) => {
              if (e.target.open) setOpenIndex(i)
              else if (openIndex === i) setOpenIndex(null)
            }}
          >
            <summary className="faq__question">
              <span>{item.question}</span>
              <svg className="faq__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <p className="faq__answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
