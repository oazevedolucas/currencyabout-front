import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { CurrencyPairPage } from './pages/CurrencyPairPage.jsx'
import { ExchangeRatesTodayPage } from './pages/ExchangeRatesTodayPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { RouteSkeleton } from './components/RouteSkeleton/RouteSkeleton.jsx'
import './App.css'
import './pages/pages.css'

const AboutPage = lazy(() => import('./pages/legal/AboutPage.jsx').then(m => ({ default: m.AboutPage })))
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage.jsx').then(m => ({ default: m.PrivacyPage })))
const TermsPage = lazy(() => import('./pages/legal/TermsPage.jsx').then(m => ({ default: m.TermsPage })))
const ContactPage = lazy(() => import('./pages/legal/ContactPage.jsx').then(m => ({ default: m.ContactPage })))
const MethodologyPage = lazy(() => import('./pages/legal/MethodologyPage.jsx').then(m => ({ default: m.MethodologyPage })))
const GuidesIndexPage = lazy(() => import('./pages/guides/GuidesIndexPage.jsx').then(m => ({ default: m.GuidesIndexPage })))
const GuidePage = lazy(() => import('./pages/guides/GuidePage.jsx').then(m => ({ default: m.GuidePage })))

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<RouteSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/converter" element={<HomePage />} />
            <Route path="/exchange-rates-today" element={<ExchangeRatesTodayPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="/guides" element={<GuidesIndexPage />} />
            <Route path="/guides/:slug" element={<GuidePage />} />
            <Route path="/:pair" element={<CurrencyPairPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
