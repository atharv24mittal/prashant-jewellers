# ✨ Prashant Jewellers — Official Website

> **140+ years of timeless elegance since 1885**
> Live at → [prashantjewellers.vercel.app](https://prashantjewellers.vercel.app)

A full-featured jewellery e-presence website for **Prashant Jewellers**, Main Market, Jamalpur Gogri, Bihar.
Proprietor: **Mrs Ritu Mahensaria** · 📞 7004403422 · ✉️ prashantmahensaria@yahoo.co.in

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database | Firebase Firestore |
| AI Chatbot | Groq API (llama-3.3-70b-versatile) |
| Routing | React Router v6 |
| SEO | React Helmet Async |
| Notifications | React Hot Toast |
| Hosting | Vercel |

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, stats counter, categories, heritage banner, testimonials, CTA |
| `/collections` | Collections | Filterable jewellery grid — search + category chips |
| `/virtual-try-on` | Virtual Try-On | Upload photo, AI face shape detection, jewellery recommendations |
| `/huid-verify` | HUID Verify | BIS Hallmark HUID code verification (demo + Firebase lookup) |
| `/about` | About | Proprietor section, animated timeline, brand values |
| `/contact` | Contact | Contact form (saves to Firestore), map button, all contact info |
| `/feedback` | Feedback | Star ratings, review submission to Firestore, live review list |

---

## Project Structure

```
prashant-jewellers/
├── index.html                  ← SEO meta tags, Google Fonts, schema.org structured data
├── vite.config.js
├── tailwind.config.js          ← Custom colors: gold, obsidian, midnight, deep, champagne
├── vercel.json                 ← Vercel deployment + SPA rewrites
├── firestore.rules
├── .env.example
└── src/
    ├── main.jsx                ← Entry point (BrowserRouter + HelmetProvider + Toaster)
    ├── App.jsx                 ← Routes + fixed layout
    ├── styles/
    │   └── globals.css         ← Custom CSS utilities + animations
    ├── utils/
    │   ├── firebase.js         ← Firebase init
    │   └── constants.js        ← MAPS_URL, PHONE, EMAIL, WHATSAPP, TIMINGS
    ├── components/
    │   ├── AnnouncementBar.jsx ← Fixed top bar, CSS marquee, live from Firestore
    │   ├── Navbar.jsx          ← Fixed below announcement bar, mobile drawer
    │   ├── Footer.jsx
    │   ├── AIChatbot.jsx       ← Floating AI chat (Groq API)
    │   └── WhatsAppButton.jsx  ← Floating WhatsApp button
    └── pages/
        ├── Home.jsx
        ├── Collections.jsx
        ├── VirtualTryOn.jsx
        ├── HUIDVerify.jsx
        ├── About.jsx
        ├── Contact.jsx
        └── Feedback.jsx
```

---

## Local Setup

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/prashant-jewellers.git
cd prashant-jewellers

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Firebase and Groq API keys (see below)

# 4. Start the dev server
npm run dev
# Opens at http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_GROQ_API_KEY=
```

**Getting your keys:**
- **Firebase** → [console.firebase.google.com](https://console.firebase.google.com) → Project Settings → Your apps
- **Groq** → [console.groq.com/keys](https://console.groq.com/keys) (free tier available)

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## Deployment (Vercel)

```bash
# Push to GitHub
git add .
git commit -m "your message"
git push

# Vercel auto-deploys on every push to main
# First time: go to vercel.com → New Project → Import your GitHub repo
# Add all VITE_ environment variables in the Vercel dashboard → Settings → Environment Variables
```

The `vercel.json` already handles SPA rewrites so all routes work on refresh.

---

## Firebase Collections

| Collection | Written by | Contents |
|---|---|---|
| `contacts` | Contact page form | name, phone, message, timestamp |
| `feedback` | Feedback page form | name, rating, review, timestamp |
| `announcements` | Admin (manual) | text, active (bool) — shown in top bar |

---

## HUID Demo Codes

For testing the HUID Verify page without a real code:

| Code | Item |
|---|---|
| `AA1234` | 22K Gold Necklace |
| `BB5678` | Diamond Ring |
| `CC9012` | Silver Bangles |

---

## AI Chatbot

The floating AI advisor uses **Groq's free API** with `llama-3.3-70b-versatile`. It is pre-trained with a system prompt covering:

- Jewellery recommendations by occasion and face shape
- Gold, diamond, silver product knowledge
- HUID / BIS Hallmark explanation
- Shop timings, location, contact details
- Bridal consultation guidance
- Jewellery care tips

---

## Roadmap

- [ ] Live gold rate widget (22K / 24K) via GoldAPI
- [ ] Admin panel at `/admin` for announcements and contact inbox
- [ ] Real jewellery photos via Firebase Storage
- [ ] WhatsApp enquiry button per product card
- [ ] Embedded Google Maps iframe on Contact page
- [ ] PWA support (installable on mobile)
- [ ] OG image for WhatsApp / social link previews

---

## Contact

**Prashant Jewellers**
Main Market, Jamalpur Gogri, Bihar, India

📞 [7004403422](tel:7004403422)
💬 [WhatsApp](https://wa.me/917004403422)
✉️ prashantmahensaria@yahoo.co.in
🗺️ [Get Directions](https://www.google.com/maps/dir//Prashant+jewellers/@25.4114012,86.6575981,17z)

**Shop Timings:**
Mon–Sat: 11:00 AM – 7:30 PM
Sunday: 12:00 PM – 7:30 PM

---

*Built with ❤️ for 140 years of craftsmanship.*
