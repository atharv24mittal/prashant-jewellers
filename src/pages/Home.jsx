import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Gem, Star, Shield, Award, ArrowRight, Sparkles, ChevronDown, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { MAPS_URL, MAPS_DIRECTIONS, PHONE, WHATSAPP, TIMINGS } from '../utils/constants'

const CATEGORIES = [
  { name: 'Bridal Sets', emoji: '👰', desc: 'Complete 7-piece wedding jewellery', path: '/collections' },
  { name: 'Gold Necklaces', emoji: '📿', desc: 'Classic & contemporary 22K designs', path: '/collections' },
  { name: 'Diamond Rings', emoji: '💍', desc: 'IGI certified solitaires & clusters', path: '/collections' },
  { name: 'Gold Bangles', emoji: '🪬', desc: 'Traditional & designer bangles', path: '/collections' },
  { name: 'Earrings', emoji: '✨', desc: 'Jhumkas, studs, chandeliers & drops', path: '/collections' },
  { name: 'Silver Items', emoji: '🥈', desc: 'Pure 925 silver — payal, pooja items', path: '/collections' },
]

const STATS = [
  { value: '140+', label: 'Years of Trust', sub: 'Since 1885' },
  { value: '50K+', label: 'Happy Families', sub: 'Served with love' },
  { value: '100%', label: 'BIS Hallmarked', sub: 'Purity guaranteed' },
  { value: '6-Char', label: 'HUID Certified', sub: 'Every single piece' },
]

const TESTIMONIALS = [
  { name: 'Priya Singh', text: 'Got my entire bridal set from here — absolutely stunning! Mrs Ritu ji has impeccable taste. Best jewellers in Bihar!', stars: 5, city: 'Patna' },
  { name: 'Rajesh Kumar', text: 'Shopping here for 20 years. Never once disappointed. HUID certified jewellery gives full confidence. Highly recommended!', stars: 5, city: 'Bhagalpur' },
  { name: 'Anita Devi', text: 'The AI try-on feature helped me choose online and the piece was exactly as expected. My family has shopped here for generations.', stars: 5, city: 'Gogri' },
  { name: 'Sunita Sharma', text: '140 years of trust isn\'t just a tagline here — you feel it in every interaction. The quality is unmatched in the entire region.', stars: 5, city: 'Saharsa' },
]

// Floating golden particles
function Particles() {
  const [items] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: ['#f59e0b','#fde68a','#d97706','#fbbf24'][i % 4],
      opacity: Math.random() * 0.35 + 0.08,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
      startY: Math.random() * 100,
    }))
  )
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map(p => (
        <div key={p.id} className="absolute rounded-full particle"
          style={{
            left: `${p.left}%`,
            top: `${p.startY}%`,
            width: p.size, height: p.size,
            background: p.color,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

// Animated counter
function Counter({ value, duration = 2 }) {
  const [count, setCount] = useState(0)
  const numericVal = parseFloat(value.replace(/[^0-9.]/g, ''))
  const suffix = value.replace(/[0-9.]/g, '')
  useEffect(() => {
    let start = 0
    const step = numericVal / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= numericVal) { setCount(numericVal); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [numericVal, duration])
  return <>{isNaN(numericVal) ? value : `${count}${suffix}`}</>
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const [statsVisible, setStatsVisible] = useState(false)

  return (
    <>
      <Helmet>
        <title>Prashant Jewellers | 140+ Years of Trust | Jamalpur Gogri Bihar</title>
        <meta name="description" content="Prashant Jewellers — Est. 1885. Gold, diamond & bridal jewellery. BIS Hallmarked, HUID Certified. Main Market, Jamalpur Gogri. Call 7004403422." />
      </Helmet>

      {/* ══════════ HERO ══════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: "92px" }}>
        <Particles />

        {/* Background layers */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(120,53,15,0.12) 0%, rgba(8,8,15,0) 70%)' }} />
        <div className="absolute inset-0 diamond-grid opacity-40" />

        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
          {[700, 520, 340].map(s => (
            <div key={s} className="absolute border border-gold-400 rotate-45 rounded-sm"
              style={{ width: s, height: s }} />
          ))}
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 mb-8">
            <div className="gold-divider w-10" />
            <span className="font-accent text-gold-400/80 text-[11px] tracking-[0.35em] uppercase">
              Est. 1885 · Jamalpur Gogri, Bihar
            </span>
            <div className="gold-divider w-10" />
          </motion.div>

          {/* Main heading */}
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}>
            <span className="text-champagne block">Where Gold</span>
            <span className="shimmer-text italic block mt-1">Tells Stories</span>
          </motion.h1>

          {/* Sub */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="font-body text-xl text-champagne/45 max-w-xl mx-auto mb-3 leading-relaxed">
            Over 140 years of crafting timeless jewellery — BIS Hallmarked, HUID Certified, and made with unmatched artistry.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="font-body italic text-gold-500/55 text-base mb-10">
            — Mrs Ritu Mahensaria, Proprietor
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link to="/collections" className="gold-btn">Explore Collections</Link>
            <Link to="/virtual-try-on" className="outline-gold-btn">✨ Virtual Try-On</Link>
            <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="outline-gold-btn">
              🧭 Get Directions
            </a>
          </motion.div>

          {/* Quick contact pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 justify-center">
            <a href={`tel:${PHONE}`}
              className="flex items-center gap-1.5 px-4 py-2 border border-gold-800/30 text-champagne/50 hover:border-gold-500 hover:text-gold-300 transition-all font-sans text-xs">
              <Phone size={12} /> {PHONE}
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 border border-green-800/30 text-green-500/50 hover:border-green-500 hover:text-green-300 transition-all font-sans text-xs">
              <MessageCircle size={12} /> WhatsApp
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 border border-gold-800/30 text-champagne/50 hover:border-gold-500 hover:text-gold-300 transition-all font-sans text-xs">
              <MapPin size={12} /> Main Market, Gogri
            </a>
          </motion.div>

          {/* Scroll cue */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            className="mt-16 flex flex-col items-center gap-2 text-champagne/20">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDown size={16} className="animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════ TIMINGS STRIP ══════════ */}
      <section className="py-4 border-y border-gold-900/20"
        style={{ background: 'linear-gradient(90deg, rgba(13,13,31,0.9), rgba(20,12,5,0.6), rgba(13,13,31,0.9))' }}>
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gold-500" />
            <span className="font-sans text-xs text-champagne/50">{TIMINGS.weekdays}</span>
          </div>
          <div className="w-px h-4 bg-gold-800/30 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gold-500" />
            <span className="font-sans text-xs text-champagne/50">{TIMINGS.sunday}</span>
          </div>
          <div className="w-px h-4 bg-gold-800/30 hidden sm:block" />
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-gold-400/60 hover:text-gold-300 transition-colors font-sans text-xs">
            <MapPin size={13} /> Main Market, Jamalpur Gogri →
          </a>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <motion.section
        onViewportEnter={() => setStatsVisible(true)}
        className="py-20 border-b border-gold-900/15"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,31,0.5), transparent)' }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center group">
              <div className="font-display gold-text leading-none mb-1" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
                {statsVisible ? <Counter value={s.value} /> : s.value}
              </div>
              <div className="font-accent text-gold-400/70 text-xs tracking-widest uppercase mt-1">{s.label}</div>
              <div className="font-body text-champagne/30 text-xs italic mt-0.5">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ══════════ CATEGORIES ══════════ */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="ornament-divider mb-4">
            <span className="font-accent text-gold-500/60 text-[10px] tracking-[0.4em] uppercase">Our Collections</span>
          </div>
          <h2 className="section-title text-champagne mb-3">
            Crafted for Every <span className="gold-text italic">Occasion</span>
          </h2>
          <p className="font-body text-champagne/40 text-lg max-w-lg mx-auto">
            From everyday elegance to once-in-a-lifetime bridal sets — all BIS hallmarked.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div key={cat.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ y: -5 }}>
              <Link to={cat.path}
                className="glass-card flex flex-col items-center text-center p-6 lg:p-8 hover:border-gold-500/35 transition-all duration-350 group block"
                style={{ minHeight: 180 }}>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
                <h3 className="font-accent text-gold-300 text-sm tracking-wide mb-1.5">{cat.name}</h3>
                <p className="font-sans text-[11px] text-champagne/35 mb-3">{cat.desc}</p>
                <div className="flex items-center gap-1 text-gold-600/50 group-hover:text-gold-400 transition-colors font-sans text-[10px] uppercase tracking-wider mt-auto">
                  Explore <ArrowRight size={10} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════ HERITAGE BANNER ══════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(78,28,5,0.18) 0%, rgba(120,53,15,0.08) 50%, rgba(78,28,5,0.18) 100%)' }} />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none select-none">
          <span className="font-display text-champagne" style={{ fontSize: 'clamp(8rem,25vw,22rem)' }}>1885</span>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Gem size={36} className="text-gold-400 mx-auto mb-6 animate-float" />
            <div className="ornament-divider mb-5">
              <span className="font-accent text-gold-500/60 text-[10px] tracking-[0.4em] uppercase">A Legacy of Excellence</span>
            </div>
            <h2 className="font-display text-champagne mb-5 leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
              140+ Years of Unbroken<br /><span className="gold-text italic">Trust & Craftsmanship</span>
            </h2>
            <p className="font-body text-xl text-champagne/40 max-w-2xl mx-auto leading-relaxed mb-10">
              Since 1885, Prashant Jewellers has been the most trusted name in Jamalpur Gogri. Generation after generation, families choose us for their most precious moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about" className="outline-gold-btn">Our Story →</Link>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="outline-gold-btn">
                📍 Visit Our Shop
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ WHY US ══════════ */}
      <section className="py-24" style={{ background: 'rgba(13,13,31,0.4)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="ornament-divider mb-4">
              <span className="font-accent text-gold-500/60 text-[10px] tracking-[0.4em] uppercase">The Prashant Promise</span>
            </div>
            <h2 className="section-title text-champagne">Why <span className="gold-text italic">Families</span> Trust Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Shield size={26} />, title: 'HUID Certified', desc: 'Every piece carries a unique BIS Hallmark ID for guaranteed purity — no exceptions.' },
              { icon: <Award size={26} />, title: '140+ Year Legacy', desc: 'Four generations of jewellery expertise since 1885 in Jamalpur Gogri.' },
              { icon: <Star size={26} />, title: 'Master Artisans', desc: 'Skilled craftspeople with decades of experience in gold, diamond & silver work.' },
              { icon: <Sparkles size={26} />, title: 'AI-Powered Try-On', desc: 'Virtually try any piece before buying — unique in the entire region.' },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                className="glass-card p-6 text-center group hover:border-gold-500/30 transition-all duration-300">
                <div className="text-gold-400 flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="font-accent text-gold-300 text-sm tracking-wide mb-2">{f.title}</h3>
                <p className="font-sans text-xs text-champagne/35 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="ornament-divider mb-4">
            <span className="font-accent text-gold-500/60 text-[10px] tracking-[0.4em] uppercase">Customer Love</span>
          </div>
          <h2 className="section-title text-champagne">What Our <span className="gold-text italic">Families</span> Say</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass-card p-6 relative hover:border-gold-500/25 transition-all group">
              <div className="absolute top-3 right-4 font-display text-5xl text-gold-800/15 leading-none select-none">"</div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.stars)].map((_, si) => (
                  <Star key={si} size={13} className="star-filled" />
                ))}
              </div>
              <p className="font-body text-champagne/60 text-sm leading-relaxed italic mb-4">"{t.text}"</p>
              <div>
                <div className="font-accent text-gold-400 text-sm">{t.name}</div>
                <div className="font-sans text-[11px] text-champagne/25">{t.city}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/feedback" className="outline-gold-btn">Share Your Experience →</Link>
        </div>
      </section>

      {/* ══════════ FEATURES HIGHLIGHTS ══════════ */}
      <section className="py-16 border-y border-gold-900/15" style={{ background: 'rgba(13,13,31,0.5)' }}>
        <div className="max-w-5xl mx-auto px-4 grid sm:grid-cols-3 gap-6 text-center">
          <Link to="/virtual-try-on"
            className="glass-card p-6 hover:border-gold-500/35 transition-all group cursor-pointer">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🪞</div>
            <h3 className="font-accent text-gold-300 text-sm tracking-wide mb-2">Virtual Try-On</h3>
            <p className="font-sans text-xs text-champagne/35">Upload your photo — AI suggests the best jewellery for your face shape</p>
          </Link>
          <Link to="/huid-verify"
            className="glass-card p-6 hover:border-gold-500/35 transition-all group cursor-pointer">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🛡️</div>
            <h3 className="font-accent text-gold-300 text-sm tracking-wide mb-2">HUID Verify</h3>
            <p className="font-sans text-xs text-champagne/35">Verify authenticity of any piece with its unique 6-character HUID code</p>
          </Link>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="glass-card p-6 hover:border-green-500/25 transition-all group cursor-pointer">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💬</div>
            <h3 className="font-accent text-gold-300 text-sm tracking-wide mb-2">WhatsApp Us</h3>
            <p className="font-sans text-xs text-champagne/35">Chat directly with our team for gold rates, custom orders & enquiries</p>
          </a>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(78,28,5,0.2), rgba(120,53,15,0.1), rgba(78,28,5,0.2))' }} />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-champagne mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              Ready to Find Your<br /><span className="gold-text italic">Perfect Piece?</span>
            </h2>
            <p className="font-body text-lg text-champagne/40 mb-8">
              Visit us at Main Market, Jamalpur Gogri — or call for a personal consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`tel:${PHONE}`} className="gold-btn flex items-center justify-center gap-2">
                <Phone size={15} /> Call: {PHONE}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 font-accent text-sm tracking-widest uppercase text-green-400 border border-green-700/40 hover:bg-green-950/30 hover:border-green-400 transition-all">
                <MessageCircle size={15} /> WhatsApp Us
              </a>
              <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="outline-gold-btn flex items-center justify-center gap-2">
                <MapPin size={15} /> Directions
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
