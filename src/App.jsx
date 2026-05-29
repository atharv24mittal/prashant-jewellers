import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnnouncementBar from './components/AnnouncementBar'
import AIChatbot from './components/AIChatbot'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Collections from './pages/Collections'
import HUIDVerify from './pages/HUIDVerify'
import VirtualTryOn from './pages/VirtualTryOn'
import About from './pages/About'
import Contact from './pages/Contact'
import Feedback from './pages/Feedback'

export default function App() {
  const location = useLocation()
  return (
    <div className="noise-overlay min-h-screen bg-obsidian">
      {/* Both bars fixed at top */}
      <AnnouncementBar />
      <Navbar />
      {/* Page content — top padding accounts for both fixed bars */}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/huid-verify" element={<HUIDVerify />} />
            <Route path="/virtual-try-on" element={<VirtualTryOn />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <AIChatbot />
      <WhatsAppButton />
    </div>
  )
}
