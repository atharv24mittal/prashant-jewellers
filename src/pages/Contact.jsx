import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Phone, Mail, MapPin, Clock, Send, ExternalLink, MessageCircle } from 'lucide-react'
import { db } from '../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { MAPS_URL, MAPS_DIRECTIONS, PHONE, EMAIL, WHATSAPP, TIMINGS } from '../utils/constants'

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) {
      toast.error('Please fill in your name and message.')
      return
    }
    setSubmitting(true)
    try {
      await addDoc(collection(db, 'contacts'), { ...form, createdAt: serverTimestamp(), source: 'website' })
    } catch {}
    setSubmitted(true)
    toast.success("Message sent! We'll respond within 24 hours. 🙏")
    setSubmitting(false)
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>Contact | Prashant Jewellers | 7004403422</title>
        <meta name="description" content="Contact Prashant Jewellers at Main Market, Jamalpur Gogri, Bihar. Call 7004403422 or email prashantmahensaria@yahoo.co.in." />
      </Helmet>

      <div className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight to-obsidian" />
        <div className="relative z-10 px-4">
          <div className="ornament-divider mb-4 justify-center">
            <span className="font-accent text-gold-500/60 text-[10px] tracking-[0.4em] uppercase">Reach Us</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-champagne mb-4">
            Get in <span className="gold-text italic">Touch</span>
          </h1>
          <p className="font-body text-champagne/45 text-lg max-w-xl mx-auto">
            We'd love to help you find the perfect piece. Reach out any way you prefer.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">

          {/* Info */}
          <div>
            <h2 className="font-accent text-gold-400 text-xs tracking-widest uppercase mb-8">Contact Information</h2>
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: <MapPin size={18} />, title: 'Visit Our Shop',
                  lines: ['Main Market, Jamalpur Gogri', 'Bihar, India'],
                  action: { label: 'Open in Google Maps →', href: MAPS_URL, ext: true },
                },
                {
                  icon: <Phone size={18} />, title: 'Call Us',
                  lines: [`+91 ${PHONE}`],
                  action: { label: 'Call Now →', href: `tel:${PHONE}` },
                },
                {
                  icon: <MessageCircle size={18} />, title: 'WhatsApp',
                  lines: [`+91 ${PHONE}`],
                  action: { label: 'Open WhatsApp →', href: WHATSAPP, ext: true },
                },
                {
                  icon: <Mail size={18} />, title: 'Email Us',
                  lines: [EMAIL],
                  action: { label: 'Send Email →', href: `mailto:${EMAIL}` },
                },
                {
                  icon: <Clock size={18} />, title: 'Shop Hours',
                  lines: [TIMINGS.weekdays, TIMINGS.sunday],
                },
              ].map(item => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="glass-card p-5 flex gap-4 hover:border-gold-500/25 transition-all">
                  <div className="text-gold-400 flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-accent text-gold-300 text-xs tracking-wide mb-1.5">{item.title}</h3>
                    {item.lines.map(l => (
                      <p key={l} className="font-sans text-sm text-champagne/55 truncate">{l}</p>
                    ))}
                    {item.action && (
                      <a href={item.action.href}
                        target={item.action.ext ? '_blank' : undefined}
                        rel={item.action.ext ? 'noopener noreferrer' : undefined}
                        className="font-sans text-xs text-gold-500 hover:text-gold-300 transition-colors mt-1 inline-flex items-center gap-1">
                        {item.action.label}
                        {item.action.ext && <ExternalLink size={10} />}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map block */}
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
              className="block border border-gold-800/25 overflow-hidden hover:border-gold-500/45 transition-all group">
              <div className="h-44 flex flex-col items-center justify-center gap-3 relative"
                style={{ background: 'linear-gradient(135deg, #0d0d1f, #08080f)' }}>
                <div className="absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #f59e0b 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
                <MapPin size={32} className="text-gold-400 group-hover:scale-110 transition-transform relative z-10" />
                <div className="text-center relative z-10">
                  <p className="font-accent text-gold-300 text-sm tracking-wider">Prashant Jewellers</p>
                  <p className="font-sans text-xs text-champagne/40 mt-1">Main Market, Jamalpur Gogri · Bihar</p>
                </div>
              </div>
              <div className="bg-gold-950/30 py-2.5 text-center font-accent text-[10px] text-gold-400 tracking-widest uppercase flex items-center justify-center gap-2">
                Open Google Maps <ExternalLink size={10} />
              </div>
            </a>

            <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer"
              className="gold-btn w-full text-center block mt-3">
              🧭 Get Turn-by-Turn Directions
            </a>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-accent text-gold-400 text-xs tracking-widest uppercase mb-8">Send a Message</h2>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 text-center" style={{ borderColor: 'rgba(74,222,128,0.2)' }}>
                <div className="text-6xl mb-5">🙏</div>
                <h3 className="font-display text-2xl text-champagne mb-3">Message Received!</h3>
                <p className="font-body text-champagne/45 italic mb-6">
                  Thank you for reaching out. Mrs Ritu Mahensaria or our team will respond within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={() => { setSubmitted(false); setForm({ name:'',phone:'',email:'',subject:'',message:'' }) }}
                    className="outline-gold-btn">Send Another Message</button>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 font-accent text-xs tracking-widest uppercase border border-green-700/40 text-green-400 hover:bg-green-950/30 transition-all">
                    <MessageCircle size={13} /> WhatsApp Instead
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name:'name', label:'Your Name *', placeholder:'Ram Kumar', type:'text' },
                  { name:'phone', label:'Phone Number', placeholder:'+91 98765 43210', type:'tel' },
                  { name:'email', label:'Email Address', placeholder:'you@example.com', type:'email' },
                  { name:'subject', label:'Subject', placeholder:'Bridal jewellery enquiry', type:'text' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="font-accent text-gold-500/50 text-[10px] tracking-widest uppercase block mb-2">{f.label}</label>
                    <input type={f.type} value={form[f.name]}
                      onChange={e => setForm({...form, [f.name]: e.target.value})}
                      placeholder={f.placeholder} className="input-field" />
                  </div>
                ))}
                <div>
                  <label className="font-accent text-gold-500/50 text-[10px] tracking-widest uppercase block mb-2">Message *</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})}
                    placeholder="Tell us what you're looking for..." rows={5} className="input-field resize-none" />
                </div>
                <button type="submit" disabled={submitting}
                  className="gold-btn w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? (
                    <><div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />Sending…</>
                  ) : (
                    <><Send size={14} />Send Message</>
                  )}
                </button>
                <p className="font-sans text-xs text-champagne/25 text-center">
                  Or call directly: <a href={`tel:${PHONE}`} className="text-gold-500 hover:text-gold-300">{PHONE}</a>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom 3 quick links */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { emoji:'📞', label:'Call Directly', value:`+91 ${PHONE}`, href:`tel:${PHONE}` },
            { emoji:'💬', label:'WhatsApp', value:'Instant reply', href:WHATSAPP, ext:true },
            { emoji:'🗺️', label:'Get Directions', value:'Jamalpur Gogri, Bihar', href:MAPS_DIRECTIONS, ext:true },
          ].map(c => (
            <a key={c.label} href={c.href}
              target={c.ext ? '_blank' : undefined} rel={c.ext ? 'noopener noreferrer' : undefined}
              className="glass-card p-5 text-center hover:border-gold-500/35 transition-all group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{c.emoji}</div>
              <div className="font-accent text-gold-400 text-xs tracking-wide mb-1 group-hover:text-gold-200 transition-colors">{c.label}</div>
              <div className="font-sans text-xs text-champagne/35">{c.value}</div>
            </a>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
