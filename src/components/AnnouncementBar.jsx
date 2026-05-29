import { useState, useEffect } from 'react'
import { db } from '../utils/firebase'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { X, Zap } from 'lucide-react'
import { WHATSAPP } from '../utils/constants'

const DEFAULT_ANNOUNCEMENTS = [
  '✨ New Bridal Collection 2025 — Visit Us In Store!',
  '🏅 Every Piece BIS Hallmarked & HUID Certified — 100% Purity Guaranteed',
  '💛 140+ Years of Unbroken Trust Since 1885 — Jamalpur Gogri',
  '📞 Call 7004403422 for Live Gold Rates & Custom Orders',
  '💍 Complete Bridal Sets Available — Book Your Appointment Today',
  '🎁 Special Offers on Diamond Jewellery — Limited Period Only',
  '🤖 Chat with our AI Jewellery Advisor — Available 24/7 on this Website',
  '📍 Main Market, Jamalpur Gogri · Mon–Sat 11AM–7:30PM · Sun 12PM–7:30PM',
]

export default function AnnouncementBar() {
  const [items, setItems] = useState(DEFAULT_ANNOUNCEMENTS)

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'announcements'),
        where('active', '==', true),
        orderBy('createdAt', 'desc')
      )
      return onSnapshot(q, snap => {
        if (!snap.empty) setItems(snap.docs.map(d => d.data().text))
      }, () => {})
    } catch {}
  }, [])

  // Triple the items so the marquee loop is perfectly seamless
  const tripled = [...items, ...items, ...items]

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-9 overflow-hidden select-none"
      style={{
        background: 'linear-gradient(90deg,#78350f 0%,#b45309 20%,#d97706 40%,#f59e0b 50%,#d97706 60%,#b45309 80%,#78350f 100%)',
        backgroundSize: '200% auto',
        animation: 'shimmer 6s linear infinite',
      }}
    >
      <div className="h-full flex items-center">
        {/* Left badge */}
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 h-full flex items-center gap-1.5 px-4 bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
        >
          <Zap size={11} className="text-obsidian fill-obsidian" />
          <span className="font-accent text-[10px] text-obsidian font-black tracking-[0.3em] uppercase whitespace-nowrap hidden sm:block">
            LIVE
          </span>
          <span className="text-obsidian/40 mx-1 hidden sm:block">|</span>
        </a>

        {/* Scrolling text — pure CSS, no JS timer */}
        <div className="flex-1 overflow-hidden h-full flex items-center">
          <div
            className="flex items-center whitespace-nowrap"
            style={{ animation: 'marquee 45s linear infinite' }}
          >
            {tripled.map((text, i) => (
              <span
                key={i}
                className="text-obsidian font-sans text-[11px] font-bold mx-12 cursor-pointer hover:underline"
                onClick={() => window.open(WHATSAPP, '_blank')}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
