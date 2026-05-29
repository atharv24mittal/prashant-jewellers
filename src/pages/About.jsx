import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Gem, Award, Heart, Users } from 'lucide-react'

function PageWrapper({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  )
}

const TIMELINE = [
  { year: '1885', title: 'The Beginning', desc: 'Prashant Jewellers was founded in Jamalpur Gogri, Bihar — starting a legacy of trust and craftsmanship.' },
  { year: '1920s', title: 'Growing Legacy', desc: 'Expanded to serve the entire Gogri district. Became the most trusted name for gold and silver.' },
  { year: '1970s', title: 'Modern Expansion', desc: 'Introduced diamond jewellery and modern designs while preserving traditional artistry.' },
  { year: '2000s', title: 'BIS Hallmarking', desc: 'Among the first in the region to adopt BIS hallmarking — guaranteeing purity for every customer.' },
  { year: '2020s', title: 'Digital Era', desc: 'Launched HUID verification, AI virtual try-on, and digital customer experience under Mrs Ritu Mahensaria.' },
  { year: '2024+', title: 'Future Forward', desc: 'Continuing 140+ years of trust with cutting-edge technology and timeless craftsmanship.' },
]

export default function About() {
  return (
    <PageWrapper>
      <Helmet>
        <title>About Us | Prashant Jewellers | Est. 1885</title>
        <meta name="description" content="The story of Prashant Jewellers — 140+ years of jewellery craftsmanship since 1885 in Jamalpur Gogri, Bihar. Proprietor: Mrs Ritu Mahensaria." />
      </Helmet>

      {/* Header */}
      <div className="pt-36 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight to-obsidian" />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <div className="font-display text-[20rem] text-gold-500 select-none leading-none">1885</div>
        </div>
        <div className="relative z-10 px-4">
          <p className="font-accent text-gold-500 text-xs tracking-[0.3em] uppercase mb-4">✦ Our Story ✦</p>
          <h1 className="font-display text-5xl md:text-7xl text-champagne mb-6">
            140+ Years of
            <br />
            <span className="gold-text italic">Timeless Trust</span>
          </h1>
          <p className="font-body text-champagne/50 text-xl max-w-2xl mx-auto leading-relaxed">
            From a single shop in Jamalpur Gogri to a beloved institution — our story is woven with gold, love, and the trust of thousands of families.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-24">

        {/* Proprietor section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 mb-16 text-center border-gold-600/30 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient" />
          <div className="w-24 h-24 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">👑</span>
          </div>
          <h2 className="font-display text-3xl text-champagne mb-2">Mrs Ritu Mahensaria</h2>
          <p className="font-accent text-gold-400 text-sm tracking-widest uppercase mb-6">Proprietor, Prashant Jewellers</p>
          <p className="font-body text-xl text-champagne/60 max-w-2xl mx-auto leading-relaxed italic">
            "We don't just sell jewellery. We craft memories, celebrate milestones, and honour the trust that four generations of families have placed in us. Every piece we create carries the weight of our 140-year heritage."
          </p>
          <div className="mt-6 gold-divider max-w-xs mx-auto" />
          <p className="font-body text-champagne/40 text-sm mt-4 italic">
            Carrying forward the legacy since 1885 ✦
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: <Gem size={24} />, title: 'Purity', desc: '100% BIS Hallmarked & HUID certified jewellery. Zero compromise on quality.' },
            { icon: <Heart size={24} />, title: 'Passion', desc: 'Every piece is crafted with love and attention to detail by skilled artisans.' },
            { icon: <Award size={24} />, title: 'Legacy', desc: '140+ years of trust across four generations of the Mahensaria family.' },
            { icon: <Users size={24} />, title: 'Community', desc: 'Proud to serve families across Jamalpur Gogri and beyond for generations.' },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-gold-400 flex justify-center mb-4">{v.icon}</div>
              <h3 className="font-accent text-gold-300 text-sm tracking-wide mb-3">{v.title}</h3>
              <p className="font-sans text-xs text-champagne/40 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="font-accent text-gold-500 text-xs tracking-[0.3em] uppercase mb-3">✦ Our Journey ✦</p>
            <h2 className="font-display text-4xl text-champagne">
              A <span className="gold-text italic">Legacy</span> Through Time
            </h2>
          </div>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold-gradient hidden md:block" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 glass-card p-6 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="font-display text-3xl gold-text mb-2">{item.year}</div>
                    <h3 className="font-accent text-gold-300 text-sm tracking-wide mb-2">{item.title}</h3>
                    <p className="font-sans text-xs text-champagne/50 leading-relaxed">{item.desc}</p>
                  </div>
                  {/* Center dot */}
                  <div className="relative hidden md:flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-gold-500 rounded-full border-2 border-obsidian shadow-lg shadow-gold-500/50" />
                  </div>
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="glass-card p-8 border-gold-600/30 text-center">
          <h2 className="font-display text-3xl text-champagne mb-4">
            Visit <span className="gold-text italic">Our Shop</span>
          </h2>
          <p className="font-body text-champagne/50 text-lg mb-2">
            📍 Main Market, Jamalpur Gogri, Bihar, India
          </p>
          <p className="font-sans text-sm text-champagne/40 mb-8">
            Mon–Sat: 11:00 AM – 7:30 PM
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:7004403422" className="gold-btn">📞 7004403422</a>
            <a href="mailto:prashantmahensaria@yahoo.co.in" className="outline-gold-btn">📧 Email Us</a>
            <a
              href="https://www.google.com/maps/place/Prashant+jewellers/@25.4112974,86.6575206,20z/data=!4m6!3m5!1s0x39f1c38748091a23:0xf00a39820818ab7c!8m2!3d25.4114012!4d86.6575981!16s%2Fg%2F11rkbw2ryc"
              target="_blank"
              rel="noopener noreferrer"
              className="outline-gold-btn"
            >
              🗺️ Google Maps
            </a>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
// timings updated via sed: Mon-Sat 11AM-7:30PM, Sun 12PM-7:30PM
