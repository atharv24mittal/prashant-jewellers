import { Link } from 'react-router-dom'
import { Gem, Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook } from 'lucide-react'
import { MAPS_URL, MAPS_DIRECTIONS, PHONE, EMAIL, WHATSAPP, TIMINGS } from '../utils/constants'

export default function Footer() {
  return (
    <footer style={{ background: '#050508', borderTop: '1px solid rgba(245,158,11,0.1)' }} className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Gem size={20} className="text-gold-400" />
              <div>
                <div className="font-accent text-gold-300 tracking-wider text-sm">PRASHANT JEWELLERS</div>
                <div className="font-body text-xs text-gold-600/50 italic">Est. 1885 · Jamalpur Gogri</div>
              </div>
            </div>
            <p className="font-sans text-xs text-champagne/35 mb-1">Proprietor: <span className="text-gold-400/70">Mrs Ritu Mahensaria</span></p>
            <p className="font-body text-sm text-champagne/30 leading-relaxed mb-5">
              Four generations of crafting timeless jewellery with love, trust & unmatched artistry.
            </p>
            <div className="flex gap-2.5">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 border border-gold-800/25 flex items-center justify-center text-gold-800 hover:text-gold-400 hover:border-gold-500 transition-all">
                <Instagram size={13} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 border border-gold-800/25 flex items-center justify-center text-gold-800 hover:text-gold-400 hover:border-gold-500 transition-all">
                <Facebook size={13} />
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 border border-green-800/25 flex items-center justify-center text-green-800 hover:text-green-400 hover:border-green-500 transition-all">
                <MessageCircle size={13} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-accent text-gold-400/70 text-[10px] tracking-widest uppercase mb-5">Explore</h4>
            <ul className="space-y-2.5">
              {[
                ['Home','/'],[' Collections','/collections'],['Virtual Try-On','/virtual-try-on'],
                ['HUID Verify','/huid-verify'],['About Us','/about'],['Contact','/contact'],['Reviews','/feedback'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="font-sans text-sm text-champagne/35 hover:text-gold-300 transition-colors flex items-center gap-2 group">
                    <span className="w-3 h-px bg-gold-800/40 group-hover:w-5 group-hover:bg-gold-500 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-accent text-gold-400/70 text-[10px] tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-3.5">
              <li>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex gap-3 group">
                  <MapPin size={14} className="text-gold-600 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-xs text-champagne/40 leading-relaxed group-hover:text-gold-300 transition-colors">
                    Main Market, Jamalpur Gogri, Bihar
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE}`} className="flex gap-3 group">
                  <Phone size={14} className="text-gold-600 flex-shrink-0" />
                  <span className="font-sans text-xs text-champagne/40 group-hover:text-gold-300 transition-colors">+91 {PHONE}</span>
                </a>
              </li>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex gap-3 group">
                  <MessageCircle size={14} className="text-green-700 flex-shrink-0" />
                  <span className="font-sans text-xs text-champagne/40 group-hover:text-green-300 transition-colors">WhatsApp Us</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex gap-3 group">
                  <Mail size={14} className="text-gold-600 flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-[11px] text-champagne/40 group-hover:text-gold-300 transition-colors break-all">{EMAIL}</span>
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={14} className="text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-xs text-champagne/40">{TIMINGS.weekdays}</p>
                  <p className="font-sans text-xs text-champagne/40">{TIMINGS.sunday}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-accent text-gold-400/70 text-[10px] tracking-widest uppercase mb-5">Find Us</h4>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
              className="block border border-gold-900/25 hover:border-gold-600/40 transition-all group mb-3 overflow-hidden">
              <div className="h-28 flex flex-col items-center justify-center gap-2 relative"
                style={{ background: 'linear-gradient(135deg,#0d0d1f,#08080f)' }}>
                <div className="absolute inset-0 opacity-[0.05]"
                  style={{ backgroundImage:'radial-gradient(circle,#f59e0b 1px,transparent 1px)', backgroundSize:'18px 18px' }} />
                <MapPin size={24} className="text-gold-500 group-hover:scale-110 transition-transform relative z-10" />
                <span className="font-sans text-[10px] text-champagne/35 relative z-10">Jamalpur Gogri, Bihar</span>
              </div>
              <div className="bg-gold-950/20 py-2 text-center font-accent text-[9px] text-gold-500/60 tracking-widest uppercase">
                View on Google Maps →
              </div>
            </a>
            <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer"
              className="outline-gold-btn w-full text-center block text-[10px] py-2">🧭 Get Directions</a>
          </div>
        </div>

        <div className="gold-divider mb-6" />
        <div className="flex flex-wrap justify-center gap-5 mb-6">
          {['BIS Hallmarked ✦','HUID Certified ✦','Est. 1885 ✦','140+ Years Trust ✦','50,000+ Happy Families'].map(b => (
            <span key={b} className="font-sans text-[10px] text-gold-800/50">{b}</span>
          ))}
        </div>
        <div className="gold-divider mb-5" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-sans text-xs text-champagne/20">© {new Date().getFullYear()} Prashant Jewellers, Jamalpur Gogri. All rights reserved.</p>
          <p className="font-body text-xs text-champagne/18 italic">Crafting memories in gold since 1885 ✦</p>
        </div>
      </div>
    </footer>
  )
}
