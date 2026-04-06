import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { CurrencyPairPage } from './pages/CurrencyPairPage.jsx'
import { ExchangeRatesTodayPage } from './pages/ExchangeRatesTodayPage.jsx'
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
          <Route path="/:pair" element={<CurrencyPairPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
