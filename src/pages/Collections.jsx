import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Search, Filter, Gem } from 'lucide-react'
import { Link } from 'react-router-dom'

const FILTERS = ['All', 'Gold', 'Diamond', 'Silver', 'Bridal', 'Rings', 'Necklaces', 'Earrings', 'Bangles']

const PRODUCTS = [
  { id: 1, name: 'Royal Bridal Set', category: ['Gold', 'Bridal'], purity: '22K', emoji: '👑', desc: 'Complete 7-piece bridal collection with maang tikka', price: 'On Request' },
  { id: 2, name: 'Diamond Solitaire Ring', category: ['Diamond', 'Rings'], purity: '18K', emoji: '💍', desc: 'IGI certified 1 carat round brilliant diamond', price: 'On Request' },
  { id: 3, name: 'Temple Necklace', category: ['Gold', 'Necklaces'], purity: '22K', emoji: '📿', desc: 'Traditional South Indian temple jewellery design', price: 'On Request' },
  { id: 4, name: 'Kundan Jhumkas', category: ['Gold', 'Earrings'], purity: '22K', emoji: '✨', desc: 'Handcrafted kundan earrings with pearl drops', price: 'On Request' },
  { id: 5, name: 'Diamond Tennis Bracelet', category: ['Diamond'], purity: '18K', emoji: '💎', desc: 'Prong-set diamonds in an elegant line bracelet', price: 'On Request' },
  { id: 6, name: 'Gold Bangles Set (6)', category: ['Gold', 'Bangles'], purity: '22K', emoji: '🪬', desc: 'Traditional plain gold bangles — set of 6', price: 'On Request' },
  { id: 7, name: 'Silver Payal (Pair)', category: ['Silver'], purity: '925', emoji: '🥈', desc: 'Pure silver anklets with ghungroo bells', price: 'On Request' },
  { id: 8, name: 'Polki Necklace', category: ['Gold', 'Bridal', 'Necklaces'], purity: '22K', emoji: '🌸', desc: 'Uncut diamond polki in intricate gold setting', price: 'On Request' },
  { id: 9, name: 'Diamond Mangalsutra', category: ['Diamond', 'Necklaces', 'Bridal'], purity: '18K', emoji: '🖤', desc: 'Contemporary diamond mangalsutra with black beads', price: 'On Request' },
  { id: 10, name: 'Gold Chain (24")', category: ['Gold', 'Necklaces'], purity: '22K', emoji: '⛓️', desc: 'Classic box chain in 22K gold — 24 inches', price: 'On Request' },
  { id: 11, name: 'Chandbali Earrings', category: ['Gold', 'Earrings'], purity: '22K', emoji: '🌙', desc: 'Moon-shaped gold chandbali with meenakari work', price: 'On Request' },
  { id: 12, name: 'Silver Pooja Items Set', category: ['Silver'], purity: '925', emoji: '🪔', desc: 'Pure silver puja thali, diya, and incense holder', price: 'On Request' },
]

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  )
}

export default function Collections() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = PRODUCTS.filter((p) => {
    const matchesFilter = activeFilter === 'All' || p.category.includes(activeFilter)
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <PageWrapper>
      <Helmet>
        <title>Collections | Prashant Jewellers</title>
        <meta name="description" content="Explore our exquisite collection of gold, diamond, silver and bridal jewellery at Prashant Jewellers, Jamalpur Gogri." />
      </Helmet>

      {/* Header */}
      <div className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight to-obsidian" />
        <div className="relative z-10 px-4">
          <p className="font-accent text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">✦ Our Treasures ✦</p>
          <h1 className="font-display text-5xl md:text-6xl text-champagne mb-4">
            Our <span className="gold-text italic">Collections</span>
          </h1>
          <p className="font-body text-champagne/50 text-lg max-w-xl mx-auto">
            Each piece is BIS hallmarked and carries a unique HUID for guaranteed purity.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jewellery..."
              className="w-full bg-white/5 border border-gold-800/30 text-champagne pl-11 pr-4 py-3 text-sm font-sans outline-none focus:border-gold-500 transition-colors placeholder-champagne/25"
            />
          </div>
          <div className="flex items-center gap-2 text-gold-600">
            <Filter size={16} />
            <span className="font-sans text-xs text-champagne/40 uppercase tracking-wider">Filter:</span>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-gold-gradient text-obsidian'
                  : 'border border-gold-800/30 text-champagne/50 hover:border-gold-500 hover:text-gold-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }}
                className="glass-card group hover:border-gold-500/40 transition-all duration-300 overflow-hidden"
              >
                {/* Product visual */}
                <div className="h-36 bg-gradient-to-br from-amber-950/30 to-midnight flex items-center justify-center border-b border-gold-900/20 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-gold-500 to-amber-900" />
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {product.emoji}
                  </span>
                  <div className="absolute top-2 right-2">
                    <span className="font-accent text-[10px] text-gold-400 bg-obsidian/60 px-2 py-0.5 border border-gold-800/30">
                      {product.purity}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-accent text-gold-300 text-xs tracking-wide mb-1 leading-tight">{product.name}</h3>
                  <p className="font-sans text-[11px] text-champagne/40 leading-relaxed mb-3">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-gold-500 italic">{product.price}</span>
                    <a
                      href="tel:7004403422"
                      className="text-[10px] font-sans text-champagne/30 hover:text-gold-400 transition-colors uppercase tracking-wider"
                    >
                      Enquire →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Gem size={40} className="text-gold-700 mx-auto mb-4" />
            <p className="font-body text-champagne/40 text-lg italic">No items found. Try a different search.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 glass-card p-8 text-center border-gold-700/30">
          <h3 className="font-display text-2xl text-champagne mb-3">
            Don't see what you're looking for?
          </h3>
          <p className="font-body text-champagne/50 mb-6">
            We create custom jewellery. Share your design or idea and we'll craft it for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:7004403422" className="gold-btn">Call for Custom Order</a>
            <Link to="/virtual-try-on" className="outline-gold-btn">Upload Your Design</Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
