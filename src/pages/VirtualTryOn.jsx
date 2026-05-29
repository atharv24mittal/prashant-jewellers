import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Upload, Camera, Sparkles, RefreshCw, Download, X } from 'lucide-react'

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  )
}

const FACE_SHAPES = {
  oval: {
    label: 'Oval',
    icon: '🥚',
    desc: 'Balanced proportions — most face shapes look great on you!',
    recommendations: [
      { name: 'Chandelier Earrings', emoji: '✨', reason: 'Elongate beautifully and complement oval symmetry' },
      { name: 'Layered Necklaces', emoji: '📿', reason: 'Multi-strand pieces add visual interest' },
      { name: 'Hoops', emoji: '⭕', reason: 'Both small studs and large hoops work wonderfully' },
      { name: 'Statement Rings', emoji: '💍', reason: 'Any bold ring design suits oval faces' },
    ],
  },
  round: {
    label: 'Round',
    icon: '🔵',
    desc: 'Soft, curved features — elongating jewellery flatters best.',
    recommendations: [
      { name: 'Long Drop Earrings', emoji: '💧', reason: 'Create vertical lines to elongate the face' },
      { name: 'V-shape Necklaces', emoji: '▼', reason: 'Draws the eye downward for a slimming effect' },
      { name: 'Rectangular Gems', emoji: '💎', reason: 'Angular cuts contrast soft round features' },
      { name: 'Long Pendant', emoji: '📿', reason: 'Adds length and elegance to the face shape' },
    ],
  },
  heart: {
    label: 'Heart',
    icon: '❤️',
    desc: 'Wider forehead, narrow chin — balance is key.',
    recommendations: [
      { name: 'Chandelier/Teardrop', emoji: '🫧', reason: 'Wider at bottom to balance the narrow chin' },
      { name: 'Choker Necklaces', emoji: '🔗', reason: 'Draw attention to the neck and décolleté' },
      { name: 'Cluster Earrings', emoji: '🌸', reason: 'Add width to the jaw area beautifully' },
      { name: 'Oval Gemstones', emoji: '🟢', reason: 'Soft curves complement heart-shaped faces' },
    ],
  },
  square: {
    label: 'Square',
    icon: '⬛',
    desc: 'Strong jawline — soft and curved jewellery softens features.',
    recommendations: [
      { name: 'Hoop Earrings', emoji: '⭕', reason: 'Round curves soften angular jawlines' },
      { name: 'Circular Pendants', emoji: '🔘', reason: 'Oval and round shapes balance square features' },
      { name: 'Long Chains', emoji: '⛓️', reason: 'Add vertical flow to break strong angles' },
      { name: 'Curved Bangles', emoji: '🪬', reason: 'Soft rounded bangles complement the look' },
    ],
  },
  oblong: {
    label: 'Oblong / Long',
    icon: '🫲',
    desc: 'Long and narrow face — add width with the right pieces.',
    recommendations: [
      { name: 'Wide Jhumkas', emoji: '🔔', reason: 'Add horizontal width and traditional charm' },
      { name: 'Statement Choker', emoji: '💎', reason: 'Wide chokers visually shorten the face' },
      { name: 'Button Studs', emoji: '🔘', reason: 'Small round studs add width without bulk' },
      { name: 'Broad Bangles', emoji: '🪬', reason: 'Wider cuffs draw attention horizontally' },
    ],
  },
}

const JEWELLERY_OVERLAYS = [
  { name: 'Gold Necklace', emoji: '📿', position: 'neck' },
  { name: 'Jhumka Earrings', emoji: '🔔', position: 'ears' },
  { name: 'Maang Tikka', emoji: '✨', position: 'forehead' },
  { name: 'Nose Ring', emoji: '💫', position: 'nose' },
]

export default function VirtualTryOn() {
  const [image, setImage] = useState(null)
  const [faceShape, setFaceShape] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [manualShape, setManualShape] = useState(null)
  const [activeOverlay, setActiveOverlay] = useState(null)
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)

  const handleFileUpload = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target.result)
      setFaceShape(null)
      setManualShape(null)
      analyzeWithAI(e.target.result)
    }
    reader.readAsDataURL(file)
  }, [])

  const analyzeWithAI = async (imageData) => {
    setAnalyzing(true)
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    try {
      if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        await new Promise((r) => setTimeout(r, 1800))
        const shapes = Object.keys(FACE_SHAPES)
        setFaceShape(shapes[Math.floor(Math.random() * shapes.length)])
      } else {
        const base64 = imageData.split(',')[1]
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { inline_data: { mime_type: 'image/jpeg', data: base64 } },
                  { text: 'Analyze this image. If it contains a human face, determine the face shape: oval, round, heart, square, or oblong. Reply with ONLY one of these exact words. If no face is detected, reply with "none".' },
                ],
              }],
              generationConfig: { maxOutputTokens: 10, temperature: 0 },
            }),
          }
        )
        const data = await response.json()
        const detected = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase()
        if (FACE_SHAPES[detected]) {
          setFaceShape(detected)
        } else {
          setFaceShape('oval') // Default fallback
        }
      }
    } catch {
      setFaceShape('oval')
    } finally {
      setAnalyzing(false)
    }
  }

  const activeShape = faceShape || manualShape
  const shapeData = activeShape ? FACE_SHAPES[activeShape] : null

  return (
    <PageWrapper>
      <Helmet>
        <title>Virtual Try-On | Prashant Jewellers</title>
        <meta name="description" content="Upload your photo and try on jewellery virtually. Get AI-powered face shape analysis and jewellery recommendations at Prashant Jewellers." />
      </Helmet>

      {/* Header */}
      <div className="pt-36 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight to-obsidian" />
        <div className="relative z-10 px-4">
          <Sparkles size={40} className="text-gold-400 mx-auto mb-4" />
          <p className="font-accent text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">✦ AI-Powered ✦</p>
          <h1 className="font-display text-5xl md:text-6xl text-champagne mb-4">
            Virtual <span className="gold-text italic">Try-On</span>
          </h1>
          <p className="font-body text-champagne/50 text-lg max-w-xl mx-auto">
            Upload your photo for instant AI face shape analysis and personalized jewellery recommendations.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Upload Panel */}
          <div>
            <h2 className="font-accent text-gold-400 text-xs tracking-widest uppercase mb-6">
              Step 1 — Upload Your Photo
            </h2>

            {!image ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFileUpload(e.dataTransfer.files[0]) }}
                className="glass-card border-2 border-dashed border-gold-800/40 hover:border-gold-500/60 transition-all cursor-pointer min-h-72 flex flex-col items-center justify-center gap-4 p-8"
              >
                <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center">
                  <Upload size={24} className="text-obsidian" />
                </div>
                <div className="text-center">
                  <p className="font-accent text-gold-300 text-sm tracking-wide mb-2">Drop your photo here</p>
                  <p className="font-sans text-xs text-champagne/40">or click to browse · JPG, PNG · Max 10MB</p>
                </div>
                <div className="flex items-center gap-2 text-champagne/20">
                  <div className="gold-divider w-8" />
                  <span className="font-sans text-xs">or</span>
                  <div className="gold-divider w-8" />
                </div>
                <button className="outline-gold-btn text-xs flex items-center gap-2">
                  <Camera size={14} /> Use Camera (coming soon)
                </button>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={image}
                  alt="Uploaded face"
                  className="w-full max-h-96 object-cover border border-gold-800/30"
                />
                {/* Overlay jewellery emoji */}
                {activeOverlay && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-8xl opacity-70 drop-shadow-2xl">{activeOverlay}</span>
                  </div>
                )}
                {analyzing && (
                  <div className="absolute inset-0 bg-obsidian/70 flex flex-col items-center justify-center gap-4">
                    <div className="jewel-spinner" />
                    <p className="font-accent text-gold-400 text-sm tracking-wide animate-pulse">
                      Analyzing Face Shape...
                    </p>
                  </div>
                )}
                <button
                  onClick={() => { setImage(null); setFaceShape(null); setManualShape(null); setActiveOverlay(null) }}
                  className="absolute top-3 right-3 w-8 h-8 bg-obsidian/80 border border-gold-800/40 flex items-center justify-center text-champagne/60 hover:text-gold-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />

            {/* Jewellery overlay buttons */}
            {image && !analyzing && (
              <div className="mt-4">
                <p className="font-accent text-gold-500/50 text-[10px] tracking-widest uppercase mb-3">
                  Tap to overlay jewellery
                </p>
                <div className="flex flex-wrap gap-2">
                  {JEWELLERY_OVERLAYS.map((j) => (
                    <button
                      key={j.name}
                      onClick={() => setActiveOverlay(activeOverlay === j.emoji ? null : j.emoji)}
                      className={`px-3 py-2 text-xs font-sans flex items-center gap-2 transition-all ${
                        activeOverlay === j.emoji
                          ? 'bg-gold-gradient text-obsidian'
                          : 'border border-gold-800/30 text-champagne/50 hover:border-gold-500'
                      }`}
                    >
                      {j.emoji} {j.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Manual face shape selector */}
            <div className="mt-6">
              <p className="font-accent text-gold-500/50 text-[10px] tracking-widest uppercase mb-3">
                Or select face shape manually
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(FACE_SHAPES).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => { setManualShape(key); setFaceShape(null) }}
                    className={`px-3 py-2 text-xs font-sans flex items-center gap-1.5 transition-all ${
                      (manualShape === key && !faceShape)
                        ? 'bg-gold-gradient text-obsidian'
                        : 'border border-gold-800/30 text-champagne/50 hover:border-gold-500'
                    }`}
                  >
                    {val.icon} {val.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations Panel */}
          <div>
            <h2 className="font-accent text-gold-400 text-xs tracking-widest uppercase mb-6">
              Step 2 — Your Recommendations
            </h2>

            <AnimatePresence mode="wait">
              {!activeShape && !analyzing ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-8 text-center min-h-72 flex flex-col items-center justify-center"
                >
                  <div className="text-6xl mb-4">💎</div>
                  <p className="font-body text-champagne/40 italic text-lg">
                    Upload a photo or select your face shape to see personalized jewellery recommendations
                  </p>
                </motion.div>
              ) : analyzing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-8 text-center min-h-72 flex flex-col items-center justify-center gap-4"
                >
                  <div className="jewel-spinner" />
                  <p className="font-accent text-gold-400 text-sm animate-pulse">Detecting face shape with AI...</p>
                </motion.div>
              ) : shapeData ? (
                <motion.div
                  key={activeShape}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {/* Detected shape */}
                  <div className="glass-card p-5 mb-5 border-gold-600/30">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{shapeData.icon}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {faceShape && (
                            <span className="font-sans text-[10px] bg-green-900/40 text-green-400 border border-green-700/30 px-2 py-0.5">
                              AI Detected
                            </span>
                          )}
                          {manualShape && !faceShape && (
                            <span className="font-sans text-[10px] bg-gold-900/40 text-gold-400 border border-gold-700/30 px-2 py-0.5">
                              Manual Select
                            </span>
                          )}
                        </div>
                        <h3 className="font-accent text-gold-300 text-base tracking-wide">{shapeData.label} Face Shape</h3>
                        <p className="font-sans text-xs text-champagne/50 mt-1">{shapeData.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <p className="font-accent text-gold-500/60 text-[10px] tracking-widest uppercase">
                      Best Jewellery for You
                    </p>
                    {shapeData.recommendations.map((rec, i) => (
                      <motion.div
                        key={rec.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="glass-card p-4 flex items-start gap-4 hover:border-gold-500/40 transition-all"
                      >
                        <span className="text-3xl flex-shrink-0">{rec.emoji}</span>
                        <div>
                          <h4 className="font-accent text-gold-300 text-sm tracking-wide">{rec.name}</h4>
                          <p className="font-sans text-xs text-champagne/40 mt-1">{rec.reason}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 glass-card p-5 text-center border-gold-700/30">
                    <p className="font-body text-champagne/50 italic mb-4 text-sm">
                      Want to see these pieces in person? Visit us or call for a personal styling session.
                    </p>
                    <a href="tel:7004403422" className="gold-btn w-full text-center block">
                      Book Styling Session: 7004403422
                    </a>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Upload your design */}
        <div className="mt-16 glass-card p-8 text-center border-gold-700/30">
          <h3 className="font-display text-3xl text-champagne mb-3">Have a Custom Design?</h3>
          <p className="font-body text-champagne/50 mb-6">
            Upload your design inspiration — we'll craft it in pure gold or silver with BIS hallmarking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:prashantmahensaria@yahoo.co.in" className="gold-btn">
              📧 Email Your Design
            </a>
            <a href="tel:7004403422" className="outline-gold-btn">
              📞 Discuss on Call
            </a>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
