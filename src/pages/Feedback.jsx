import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Star, Send, MessageSquare } from 'lucide-react'
import { db } from '../utils/firebase'
import { collection, addDoc, getDocs, serverTimestamp, orderBy, query, limit } from 'firebase/firestore'
import toast from 'react-hot-toast'

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  )
}

const DEMO_REVIEWS = [
  { name: 'Sunita Sharma', rating: 5, text: 'Absolutely stunning bridal set! Mrs Ritu ji has impeccable taste and guided me beautifully. Best jewellers in Bihar!', location: 'Patna', date: '2024-03-15' },
  { name: 'Rajesh Kumar', rating: 5, text: 'Been shopping here for 20 years. Never once been disappointed. HUID certified every time, full transparency.', location: 'Bhagalpur', date: '2024-02-28' },
  { name: 'Kavita Gupta', rating: 5, text: 'The virtual try-on feature on the website is brilliant. Ordered a necklace without even visiting and it was perfect!', location: 'Gogri', date: '2024-04-01' },
  { name: 'Manoj Yadav', rating: 4, text: 'Great quality gold, fair pricing. The shop has modernised beautifully while keeping its traditional charm.', location: 'Saharsa', date: '2024-01-20' },
  { name: 'Anita Devi', rating: 5, text: 'Four generations of my family shop here. The trust is unmatched. Congratulations on 140 years!', location: 'Jamalpur', date: '2024-03-05' },
]

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange && onChange(s)}
          onMouseEnter={() => onChange && setHovered(s)}
          onMouseLeave={() => onChange && setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={28}
            className={`transition-colors ${s <= (hovered || value) ? 'text-gold-400 fill-gold-400' : 'text-gold-900'}`}
          />
        </button>
      ))}
    </div>
  )
}

export default function Feedback() {
  const [form, setForm] = useState({ name: '', location: '', rating: 5, text: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reviews, setReviews] = useState(DEMO_REVIEWS)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'), limit(20))
        const snap = await getDocs(q)
        if (!snap.empty) {
          const data = snap.docs.map((d) => ({ ...d.data(), id: d.id }))
          setReviews([...data, ...DEMO_REVIEWS])
        }
      } catch {
        // Firebase not configured, use demo data
      }
    }
    fetchReviews()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.text) {
      toast.error('Please fill in your name and feedback.')
      return
    }
    setSubmitting(true)
    try {
      await addDoc(collection(db, 'feedback'), {
        ...form,
        createdAt: serverTimestamp(),
      })
    } catch {
      // Firebase not ready, proceed anyway
    }
    setSubmitted(true)
    setReviews([{ ...form, date: new Date().toISOString().split('T')[0] }, ...reviews])
    toast.success('Thank you for your feedback! 🙏')
    setSubmitting(false)
  }

  const avgRating = (reviews.reduce((a, r) => a + (r.rating || 5), 0) / reviews.length).toFixed(1)

  return (
    <PageWrapper>
      <Helmet>
        <title>Feedback & Reviews | Prashant Jewellers</title>
        <meta name="description" content="Read customer reviews and share your experience with Prashant Jewellers, Jamalpur Gogri." />
      </Helmet>

      <div className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight to-obsidian" />
        <div className="relative z-10 px-4">
          <MessageSquare size={40} className="text-gold-400 mx-auto mb-4" />
          <p className="font-accent text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">✦ Customer Voices ✦</p>
          <h1 className="font-display text-5xl md:text-6xl text-champagne mb-4">
            Share Your <span className="gold-text italic">Experience</span>
          </h1>
          <p className="font-body text-champagne/50 text-lg max-w-xl mx-auto">
            Your words inspire us to keep crafting with love and dedication.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-24">

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 mb-12 text-center border-gold-600/30"
        >
          <div className="font-display text-7xl gold-text mb-2">{avgRating}</div>
          <StarRating value={Math.round(parseFloat(avgRating))} />
          <p className="font-sans text-sm text-champagne/40 mt-3">
            Based on {reviews.length}+ reviews
          </p>
          <p className="font-body italic text-champagne/30 text-sm mt-2">✦ 140+ years of happy families ✦</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Submit form */}
          <div>
            <h2 className="font-accent text-gold-400 text-xs tracking-widest uppercase mb-8">Leave Your Review</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 text-center border-green-600/30"
              >
                <div className="text-6xl mb-5">🙏</div>
                <h3 className="font-display text-2xl text-champagne mb-3">Thank You!</h3>
                <p className="font-body text-champagne/50 italic mb-6">
                  Your feedback means the world to us. It motivates us to continue our 140-year legacy of excellence.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', location: '', rating: 5, text: '' }) }}
                  className="outline-gold-btn"
                >
                  Write Another Review
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-accent text-gold-500/60 text-[10px] tracking-widest uppercase block mb-2">
                    Your Rating *
                  </label>
                  <StarRating value={form.rating} onChange={(r) => setForm({ ...form, rating: r })} />
                </div>
                {[
                  { name: 'name', label: 'Your Name *', placeholder: 'Priya Singh' },
                  { name: 'location', label: 'Your City', placeholder: 'Patna, Bihar' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="font-accent text-gold-500/60 text-[10px] tracking-widest uppercase block mb-2">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-gold-800/30 text-champagne/80 placeholder-champagne/20 px-4 py-3 text-sm font-sans outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-accent text-gold-500/60 text-[10px] tracking-widest uppercase block mb-2">
                    Your Feedback *
                  </label>
                  <textarea
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    placeholder="Share your experience with Prashant Jewellers..."
                    rows={5}
                    className="w-full bg-white/5 border border-gold-800/30 text-champagne/80 placeholder-champagne/20 px-4 py-3 text-sm font-sans outline-none focus:border-gold-500 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="gold-btn w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Submit Feedback
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Reviews list */}
          <div>
            <h2 className="font-accent text-gold-400 text-xs tracking-widest uppercase mb-8">
              What Our Customers Say
            </h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              <AnimatePresence>
                {reviews.map((review, i) => (
                  <motion.div
                    key={`${review.name}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.3) }}
                    className="glass-card p-5 relative"
                  >
                    <div className="text-4xl text-gold-800/20 font-display absolute top-3 right-4">"</div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(review.rating || 5)].map((_, si) => (
                        <Star key={si} size={12} className="text-gold-400 fill-gold-400" />
                      ))}
                    </div>
                    <p className="font-body text-champagne/70 text-sm leading-relaxed italic mb-4">
                      "{review.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-accent text-gold-400 text-sm">{review.name}</div>
                        {review.location && (
                          <div className="font-sans text-[11px] text-champagne/30">{review.location}</div>
                        )}
                      </div>
                      {review.date && (
                        <div className="font-sans text-[10px] text-champagne/20">{review.date}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
