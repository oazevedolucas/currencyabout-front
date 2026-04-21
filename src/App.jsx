import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { CurrencyPairPage } from './pages/CurrencyPairPage.jsx'
import { ExchangeRatesTodayPage } from './pages/ExchangeRatesTodayPage.jsx'
import { AboutPage } from './pages/legal/AboutPage.jsx'
import { PrivacyPage } from './pages/legal/PrivacyPage.jsx'
import { TermsPage } from './pages/legal/TermsPage.jsx'
import { ContactPage } from './pages/legal/ContactPage.jsx'
import { GuidesIndexPage } from './pages/guides/GuidesIndexPage.jsx'
import { GuidePage } from './pages/guides/GuidePage.jsx'
import './App.css'
import './pages/pages.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/converter" element={<HomePage />} />
          <Route path="/exchange-rates-today" element={<ExchangeRatesTodayPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/guides" element={<GuidesIndexPage />} />
          <Route path="/guides/:slug" element={<GuidePage />} />
          <Route path="/:pair" element={<CurrencyPairPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
