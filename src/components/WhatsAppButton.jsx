import { motion } from 'framer-motion'
import { WHATSAPP } from '../utils/constants'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 z-50 w-13 h-13 rounded-full flex items-center justify-center shadow-2xl"
      style={{
        width: 52, height: 52,
        background: 'linear-gradient(135deg,#25d366,#128c7e)',
        boxShadow: '0 4px 24px rgba(37,211,102,0.35)',
      }}
    >
      {/* WhatsApp SVG */}
      <svg viewBox="0 0 32 32" width="26" height="26" fill="white">
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.514L4 29l7.686-1.806A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm5.894 16.69c-.246.693-1.433 1.322-1.972 1.38-.503.054-1.14.077-1.84-.116-.425-.12-.97-.28-1.667-.55-2.933-1.174-4.85-4.09-4.997-4.282-.147-.192-1.198-1.597-1.198-3.047 0-1.45.758-2.163 1.027-2.458.269-.295.587-.37.783-.37.196 0 .392.002.564.01.181.01.424-.069.664.508.246.59.835 2.04.908 2.187.073.147.122.32.024.514-.098.196-.147.32-.295.49-.147.172-.31.384-.442.516-.147.147-.3.306-.129.6.172.294.762 1.257 1.636 2.035 1.124.998 2.072 1.308 2.366 1.454.295.147.467.123.64-.073.172-.196.734-.858.93-1.152.196-.294.392-.246.66-.147.27.098 1.71.807 2.004.954.295.147.49.22.564.343.073.122.073.71-.172 1.403z"/>
      </svg>
      {/* Ping ring */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-25"
        style={{ background: '#25d366' }} />
    </motion.a>
  )
}
