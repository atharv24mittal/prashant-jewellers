import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Gem, Phone, MessageCircle } from 'lucide-react'
import { PHONE, WHATSAPP } from '../utils/constants'

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'Try-On ✨', path: '/virtual-try-on' },
  { label: 'HUID Verify', path: '/huid-verify' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Reviews', path: '/feedback' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [loc.pathname])

  return (
    <>
      {/* Navbar — fixed just below the announcement bar (top: 36px) */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-obsidian/97 backdrop-blur-2xl shadow-2xl shadow-black/60 py-3'
            : 'bg-obsidian/80 backdrop-blur-xl py-4'
        }`}
        style={{ top: '36px', borderBottom: scrolled ? '1px solid rgba(245,158,11,0.12)' : '1px solid rgba(245,158,11,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gold-400/25 blur-lg rounded-full group-hover:bg-gold-400/45 transition-all duration-500" />
              <Gem size={24} className="text-gold-300 relative z-10 group-hover:text-gold-100 transition-colors duration-300" />
            </div>
            <div className="leading-none">
              <div className="font-accent text-[13px] tracking-[0.25em] text-gold-200 group-hover:text-white transition-colors">PRASHANT</div>
              <div className="font-body text-[9px] tracking-[0.3em] text-gold-500/55 italic mt-0.5">Jewellers · Est. 1885</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0">
            {NAV.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 font-sans text-[11px] tracking-[0.12em] uppercase transition-all duration-300 whitespace-nowrap ${
                  loc.pathname === link.path
                    ? 'text-gold-300'
                    : 'text-champagne/45 hover:text-gold-300'
                }`}
              >
                {loc.pathname === link.path && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 bottom-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)' }}
                  />
                )}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-sans tracking-wider uppercase border border-green-700/40 text-green-400 hover:border-green-400 hover:bg-green-950/30 transition-all duration-300"
            >
              <MessageCircle size={12} /> WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-sans tracking-wider uppercase gold-btn"
            >
              <Phone size={12} /> Call Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-gold-400 hover:text-gold-200 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={open ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-obsidian/80 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed right-0 z-50 w-72 lg:hidden flex flex-col"
              style={{ top: '72px', bottom: 0, background: '#0d0d1f', borderLeft: '1px solid rgba(245,158,11,0.15)' }}
            >
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="gold-divider mb-6" />
                {NAV.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 py-4 font-accent text-sm tracking-widest uppercase border-b border-gold-900/20 transition-colors ${
                        loc.pathname === link.path ? 'text-gold-300' : 'text-champagne/50 hover:text-gold-300'
                      }`}
                    >
                      {loc.pathname === link.path && (
                        <span className="w-1 h-5 flex-shrink-0" style={{ background: 'linear-gradient(to bottom, #f59e0b, #d97706)' }} />
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="p-6 space-y-3 border-t border-gold-900/20">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 font-sans text-xs uppercase tracking-wider border border-green-700/40 text-green-400 hover:bg-green-950/30 transition-all"
                >
                  <MessageCircle size={14} /> WhatsApp Us
                </a>
                <a href={`tel:${PHONE}`} className="gold-btn w-full flex items-center justify-center gap-2">
                  <Phone size={14} /> Call: {PHONE}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
