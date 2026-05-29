import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Shield, Search, CheckCircle, AlertCircle, ExternalLink, Info } from 'lucide-react'

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  )
}

// Mock HUID data for demo purposes
const MOCK_HUID_DB = {
  'AA1234': { item: 'Gold Necklace', purity: '22K (916)', weight: '25.3g', hallmark: 'BIS Hallmark', shop: 'Prashant Jewellers', status: 'GENUINE', year: 2023 },
  'BB5678': { item: 'Diamond Ring', purity: '18K (750)', weight: '6.2g', hallmark: 'BIS Hallmark', shop: 'Prashant Jewellers', status: 'GENUINE', year: 2024 },
  'CC9012': { item: 'Gold Bangles (x4)', purity: '22K (916)', weight: '42.8g', hallmark: 'BIS Hallmark', shop: 'Prashant Jewellers', status: 'GENUINE', year: 2022 },
}

export default function HUIDVerify() {
  const [huid, setHuid] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)

  const handleVerify = async () => {
    if (!huid.trim()) return
    setLoading(true)
    setResult(null)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200))
    const found = MOCK_HUID_DB[huid.trim().toUpperCase()]
    setResult(found || 'NOT_FOUND')
    setChecked(true)
    setLoading(false)
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>HUID Verify | Prashant Jewellers</title>
        <meta name="description" content="Verify the authenticity of your BIS hallmarked jewellery using the HUID number at Prashant Jewellers." />
      </Helmet>

      {/* Header */}
      <div className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight to-obsidian" />
        <div className="relative z-10 px-4">
          <Shield size={40} className="text-gold-400 mx-auto mb-4" />
          <p className="font-accent text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">✦ Authentication ✦</p>
          <h1 className="font-display text-5xl md:text-6xl text-champagne mb-4">
            HUID <span className="gold-text italic">Verify</span>
          </h1>
          <p className="font-body text-champagne/50 text-lg max-w-xl mx-auto">
            Verify the authenticity of your BIS hallmarked jewellery using the unique 6-character HUID code.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-24">

        {/* What is HUID */}
        <div className="glass-card p-6 mb-8 border-gold-700/30">
          <div className="flex gap-4">
            <Info size={20} className="text-gold-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-accent text-gold-300 text-sm tracking-wide mb-2">What is HUID?</h3>
              <p className="font-sans text-sm text-champagne/50 leading-relaxed">
                HUID (Hallmark Unique Identification) is a 6-character alphanumeric code assigned by the Bureau of Indian Standards (BIS) to every hallmarked jewellery piece. It guarantees the purity of gold, silver, and other precious metals. Every piece at Prashant Jewellers comes with a verified HUID.
              </p>
            </div>
          </div>
        </div>

        {/* Verify Tool */}
        <div className="glass-card p-8 mb-8">
          <h2 className="font-accent text-gold-300 text-sm tracking-widest uppercase mb-6 text-center">
            Enter HUID Code
          </h2>

          <div className="flex gap-3 mb-4">
            <input
              value={huid}
              onChange={(e) => { setHuid(e.target.value.toUpperCase()); setChecked(false); setResult(null) }}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              placeholder="e.g. AA1234"
              maxLength={6}
              className="flex-1 bg-white/5 border border-gold-800/30 text-champagne text-center font-accent text-xl tracking-[0.5em] py-4 outline-none focus:border-gold-500 transition-colors placeholder-champagne/20"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={!huid.trim() || loading}
            className="gold-btn w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Search size={16} />
                Verify HUID
              </>
            )}
          </button>

          <p className="text-center font-sans text-xs text-champagne/25 mt-3">
            Try: AA1234, BB5678, CC9012 for demo
          </p>

          {/* Result */}
          <AnimatePresence>
            {checked && result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6"
              >
                {result === 'NOT_FOUND' ? (
                  <div className="border border-red-500/30 bg-red-950/20 p-6 text-center">
                    <AlertCircle size={36} className="text-red-400 mx-auto mb-3" />
                    <h3 className="font-accent text-red-400 text-sm tracking-wide mb-2">HUID Not Found</h3>
                    <p className="font-sans text-xs text-champagne/50 leading-relaxed">
                      This HUID could not be verified. Please check the code and try again, or visit the official BIS Care app for further verification. Contact us if you have concerns.
                    </p>
                    <a href="tel:7004403422" className="outline-gold-btn inline-block mt-4 text-xs">
                      Contact Us: 7004403422
                    </a>
                  </div>
                ) : (
                  <div className="border border-green-500/30 bg-green-950/20 p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <CheckCircle size={28} className="text-green-400" />
                      <div>
                        <h3 className="font-accent text-green-400 text-sm tracking-wide">✓ GENUINE — Verified Authentic</h3>
                        <p className="font-sans text-xs text-champagne/40">BIS Hallmarked & HUID Registered</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ['HUID Code', huid],
                        ['Item', result.item],
                        ['Purity', result.purity],
                        ['Weight', result.weight],
                        ['Hallmark', result.hallmark],
                        ['Shop', result.shop],
                        ['Year', result.year],
                        ['Status', result.status],
                      ].map(([label, value]) => (
                        <div key={label} className="bg-white/5 px-4 py-3">
                          <p className="font-sans text-[10px] text-champagne/30 uppercase tracking-wider mb-1">{label}</p>
                          <p className={`font-accent text-sm ${label === 'Status' ? 'text-green-400' : 'text-gold-300'}`}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Official BIS link */}
        <div className="glass-card p-6 text-center border-gold-700/30">
          <p className="font-body text-champagne/50 mb-4 italic">
            For official government verification, use the BIS Care App or website
          </p>
          <a
            href="https://www.bis.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 outline-gold-btn text-xs"
          >
            Visit BIS Official Site <ExternalLink size={12} />
          </a>
        </div>

        {/* How to find HUID */}
        <div className="mt-8 glass-card p-8 border-gold-700/30">
          <h3 className="font-accent text-gold-300 text-sm tracking-widest uppercase mb-6 text-center">
            How to Find Your HUID
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'On Your Jewellery', desc: 'Look for a tiny stamp with a 6-character code on your hallmarked piece' },
              { step: '02', title: 'On the Certificate', desc: 'Your purchase receipt / hallmark certificate from Prashant Jewellers contains the HUID' },
              { step: '03', title: 'Ask Us', desc: 'Call 7004403422 or visit our shop — we maintain records of every HUID we issue' },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="font-display text-4xl text-gold-800/50 mb-2">{step.step}</div>
                <h4 className="font-accent text-gold-400 text-xs tracking-wide mb-2">{step.title}</h4>
                <p className="font-sans text-xs text-champagne/40 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
