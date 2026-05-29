import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, Bot, Trash2 } from 'lucide-react'
import { PHONE, EMAIL, WHATSAPP, TIMINGS } from '../utils/constants'

const SYSTEM_PROMPT = `You are the expert AI jewellery advisor for Prashant Jewellers — established 1885, located at Main Market, Jamalpur Gogri, Bihar, India.
Proprietor: Mrs Ritu Mahensaria.
Contact: ${PHONE} | ${EMAIL}
Shop timings: ${TIMINGS.weekdays}, ${TIMINGS.sunday}.

You are warm, elegant, knowledgeable. You respond like a trusted senior jeweller with 140 years of family expertise.

Topics you help with:
1. Jewellery recommendations — gold (22K/24K), diamond (18K), silver (925), bridal sets, necklaces, rings, bangles, earrings, maang tikka, payal, nose rings, haath phool
2. Face-shape jewellery advice:
   - Oval → any style works, especially chandeliers and layered necklaces
   - Round → long drop earrings, V-shape necklaces to elongate
   - Heart → teardrop/wider-bottom earrings, chokers
   - Square → hoop earrings, round pendants, curved bangles
   - Oblong/Long → wide jhumkas, statement chokers, button studs
3. Gold rates — always say "For today's exact rate call ${PHONE} or WhatsApp us"
4. HUID / BIS Hallmark — every piece at Prashant Jewellers has a unique 6-char HUID code for authenticity
5. Custom jewellery orders — bring design inspiration or describe, we'll craft it
6. Bridal consultation — full bridal set packages available
7. Shop location, timings, directions
8. Jewellery care tips (store in separate pouches, avoid chemicals, clean with soft cloth)
9. Occasion-based suggestions — wedding, engagement, anniversary, festivals (Diwali, Akshaya Tritiya, Dhanteras)
10. Price enquiries — always guide to call/WhatsApp for exact pricing

Rules:
- Keep responses under 120 words unless a detailed comparison is needed
- Use occasional elegant expressions and relevant emojis
- Never fabricate prices — always direct to call for pricing
- If asked about face shape and not provided, ask first
- End responses with a helpful next step (call, visit, WhatsApp)
- Speak with warmth, occasionally using Hindi words (namaste, shukriya, bilkul) for a personal touch`

const QUICK = [
  "Best jewellery for my face shape? 💎",
  "Show me bridal collections 👰",
  "What is HUID certification? 🛡️",
  "Today's gold rate? 💛",
  "Shop timings & location 📍",
  "Custom jewellery order? ✨",
]

// Groq API — free, fast, no CORS issues from browser
// Model: llama-3.3-70b-versatile (best free model on Groq)
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.3-70b-versatile'

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Namaste! ✨ Welcome to Prashant Jewellers — 140+ years of timeless elegance since 1885.\n\nI'm your personal AI jewellery advisor. I can help you choose the perfect piece, verify HUID, suggest jewellery for your face shape, and much more.\n\nHow may I assist you today? 💎`,
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [messages, open])

  const send = async (text) => {
    const msg = (text || input).trim()
    if (!msg || loading) return

    const history = [...messages, { role: 'user', content: msg }]
    setMessages(history)
    setInput('')
    setLoading(true)

    try {
      const key = import.meta.env.VITE_GROQ_API_KEY
      if (!key) throw new Error('No Groq API key found in environment variables')

      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history.map(m => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 400,
          temperature: 0.75,
          stream: false,
        }),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error('Groq API error:', res.status, errText)
        throw new Error(`Groq API returned ${res.status}`)
      }

      const data = await res.json()
      const reply = data?.choices?.[0]?.message?.content

      if (!reply) throw new Error('Empty response from Groq')

      setMessages([...history, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error('Chatbot error:', err.message)
      setMessages([...history, {
        role: 'assistant',
        content: `I'm having a little trouble connecting right now. Please call us directly at 📞 ${PHONE} or send a WhatsApp message — our team will be delighted to help! 🙏`,
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 gold-btn shadow-2xl"
        style={{ boxShadow: '0 0 30px rgba(245,158,11,0.3)' }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        animate={open ? { scale: 0, opacity: 0, pointerEvents: 'none' } : { scale: 1, opacity: 1 }}
        aria-label="Open AI Chat"
      >
        <Sparkles size={16} />
        <span className="text-[11px] font-accent tracking-widest">AI Advisor</span>
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-green-400 rounded-full border-2 border-obsidian">
          <span className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
        </span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.92 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden shadow-2xl"
            style={{
              width: 370,
              maxWidth: 'calc(100vw - 24px)',
              height: 560,
              maxHeight: 'calc(100vh - 120px)',
              background: 'linear-gradient(160deg, rgba(13,13,31,0.98) 0%, rgba(8,8,15,0.99) 100%)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 2,
              boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,158,11,0.08), inset 0 1px 0 rgba(245,158,11,0.12)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-gold-900/25"
              style={{ background: 'linear-gradient(90deg, rgba(120,53,15,0.25) 0%, transparent 100%)' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#92400e,#f59e0b)' }}
                  >
                    <Sparkles size={15} className="text-obsidian" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-obsidian" />
                </div>
                <div>
                  <div className="font-accent text-gold-200 text-sm tracking-wide leading-none">AI Jewellery Advisor</div>
                  <div className="font-sans text-[10px] text-green-400 mt-0.5">● Online · Powered by Groq AI</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessages([{
                    role: 'assistant',
                    content: `Namaste! ✨ How may I assist you today? 💎`,
                  }])}
                  className="text-champagne/25 hover:text-gold-400 transition-colors p-1"
                  title="Clear chat"
                >
                  <Trash2 size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="text-champagne/25 hover:text-gold-400 transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'assistant' && (
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: 'linear-gradient(135deg,#92400e,#d97706)' }}
                    >
                      <Bot size={12} className="text-obsidian" />
                    </div>
                  )}
                  <div className={`max-w-[82%] px-3.5 py-2.5 text-[13px] font-sans leading-relaxed whitespace-pre-line ${
                    m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#92400e,#d97706)' }}
                  >
                    <Bot size={12} className="text-obsidian" />
                  </div>
                  <div className="chat-bubble-ai px-4 py-3 flex gap-1.5 items-center">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-2 h-2 bg-gold-400/50 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick questions — only shown on first message */}
            {messages.length <= 1 && (
              <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                {QUICK.map(q => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-[10px] px-2.5 py-1.5 border border-gold-800/35 text-gold-500/65 hover:border-gold-500 hover:text-gold-300 transition-all font-sans leading-tight"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 pt-2 border-t border-gold-900/20">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
                  placeholder="Ask about jewellery, HUID, gold rates…"
                  className="flex-1 bg-white/[0.04] border border-gold-800/25 text-champagne/85 text-[13px] px-3.5 py-2.5 font-sans outline-none focus:border-gold-500/50 transition-colors"
                  style={{ borderRadius: 1 }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-10 flex-shrink-0 flex items-center justify-center text-obsidian disabled:opacity-30 transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg,#d97706,#f59e0b)', borderRadius: 1 }}
                >
                  <Send size={14} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-1.5 px-0.5">
                <a href={`tel:${PHONE}`} className="font-sans text-[10px] text-gold-700/50 hover:text-gold-400 transition-colors">
                  📞 {PHONE}
                </a>
                <span className="font-sans text-[9px] text-champagne/15">Prashant Jewellers AI ✦ 1885</span>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-[10px] text-green-700/50 hover:text-green-400 transition-colors">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
