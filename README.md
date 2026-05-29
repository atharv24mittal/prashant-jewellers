# 💎 Prashant Jewellers Website

> **Est. 1885 · 140+ Years of Trust · Jamalpur Gogri, Bihar**
> Proprietor: Mrs Ritu Mahensaria | 📞 7004403422

A world-class jewellery website with AI chatbot, virtual try-on, HUID verification, Firebase backend, and Vercel deployment — all **100% free**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Chatbot** | Powered by Google Gemini — answers jewellery queries 24/7 |
| 👗 **Virtual Try-On** | Upload photo → AI detects face shape → personalized recommendations |
| 🛡️ **HUID Verify** | Verify BIS hallmark authenticity with a 6-character code |
| 📣 **Announcement Bar** | Live announcements from Firebase Firestore |
| ⭐ **Feedback System** | Real reviews stored in Firebase |
| 📧 **Contact Form** | Messages saved to Firebase Firestore |
| 🗺️ **Google Maps** | Direct navigation from the website |
| 🎨 **Luxury Design** | Gold/dark theme, animations, 100% mobile responsive |
| 🔍 **SEO Optimized** | Structured data, meta tags, canonical URLs |

---

## 🚀 Quick Setup (15 minutes)

### Step 1 — Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/prashant-jewellers.git
cd prashant-jewellers
npm install
```

### Step 2 — Set Up Firebase (FREE)

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"** → Name it `prashant-jewellers` → Continue
3. Enable **Google Analytics** (optional) → Create project
4. In the project dashboard: **Project Settings** → **Your apps** → Click `</>` (Web)
5. Register app as `prashant-jewellers-web` → Copy the config
6. In Firebase Console: **Build → Firestore Database → Create database** → Start in production mode → Choose `asia-south1` (Mumbai)
7. **Build → Storage** → Get started (for future image uploads)
8. Go to **Firestore → Rules** → paste content from `firestore.rules` → Publish

### Step 3 — Get Google Gemini API Key (FREE)

1. Visit [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click **"Create API key"** → Copy it
3. Free tier: 15 requests/minute, 1M tokens/day — more than enough!

### Step 4 — Create your `.env` file

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=prashant-jewellers.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=prashant-jewellers
VITE_FIREBASE_STORAGE_BUCKET=prashant-jewellers.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXX

VITE_GEMINI_API_KEY=AIzaSy...
```

### Step 5 — Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) 🎉

---

## 🌐 Deploy to Vercel (FREE)

### Option A — Vercel CLI (Fastest)

```bash
npm install -g vercel
vercel
# Follow the prompts
```

Then add environment variables:
```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_GEMINI_API_KEY
# ... add all VITE_ variables
vercel --prod
```

### Option B — GitHub + Vercel (Recommended for auto-deploy)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "🚀 Initial launch — Prashant Jewellers website"
git remote add origin https://github.com/YOUR_USERNAME/prashant-jewellers.git
git push -u origin main
```

2. Go to [https://vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo
3. In **Environment Variables**, add all your `.env` keys
4. Click **Deploy** ✅

Your site is now live at `https://prashant-jewellers.vercel.app`!

### Custom Domain (Optional — Free with Vercel)

- In Vercel: **Settings → Domains** → Add `prashantjewellers.in`
- Update your domain DNS to point to Vercel
- SSL certificate is automatic and free

---

## 📁 Project Structure

```
prashant-jewellers/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation with mobile drawer
│   │   ├── Footer.jsx          # Footer with links, contact, map
│   │   ├── AnnouncementBar.jsx # Live scrolling announcements
│   │   └── AIChatbot.jsx       # Gemini-powered chat widget
│   ├── pages/
│   │   ├── Home.jsx            # Hero, stats, categories, testimonials
│   │   ├── Collections.jsx     # Filterable jewellery grid
│   │   ├── VirtualTryOn.jsx    # AI face shape + recommendations
│   │   ├── HUIDVerify.jsx      # HUID code verification
│   │   ├── About.jsx           # Story, timeline, proprietor
│   │   ├── Contact.jsx         # Form + map + contact info
│   │   └── Feedback.jsx        # Reviews + submission form
│   ├── utils/
│   │   └── firebase.js         # Firebase initialization
│   ├── styles/
│   │   └── globals.css         # Global styles + Tailwind
│   ├── App.jsx                 # Routes + layout
│   └── main.jsx                # Entry point
├── .env.example                # Environment variable template
├── .gitignore
├── firestore.rules             # Firebase security rules
├── vercel.json                 # Vercel deployment config
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🔧 Adding Live Gold Rate (Optional Enhancement)

To show live gold rates, you can use [metals-api.com](https://metals-api.com) or [goldapi.io](https://goldapi.io). Both have free tiers. Ask the AI chatbot in this project for integration help!

---

## 📣 Managing Announcements

Add announcements directly in Firebase Console:
1. **Firestore → announcements → Add document**
2. Fields: `text: "🎁 New Diwali Offer — 5% off on diamonds!"`, `active: true`, `createdAt: (timestamp)`

---

## 📞 Contact

**Prashant Jewellers** · Main Market, Jamalpur Gogri, Bihar  
📞 7004403422 · 📧 prashantmahensaria@yahoo.co.in

---

*Built with ❤️ for 140+ years of trust*
