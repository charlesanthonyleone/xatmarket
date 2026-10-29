import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Advertising from './pages/Advertising.jsx'
import Setup from './pages/Setup.jsx'
import Revival from './pages/Revival.jsx'
import Earn from './pages/Earn.jsx'
import Ideas from './pages/Ideas.jsx'
import Venture from './pages/Venture.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) { const el = document.getElementById(hash.slice(1)); if (el) { el.scrollIntoView(); return } }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advertising" element={<Advertising />} />
        <Route path="/community-setup" element={<Setup />} />
        <Route path="/community-revival" element={<Revival />} />
        <Route path="/get-paid" element={<Earn />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/ideas/:slug" element={<Venture />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
