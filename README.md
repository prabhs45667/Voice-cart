# 🛒 VoiceCart — Voice Command Shopping Assistant

A smart, voice-powered shopping list manager that uses AI to understand natural language commands, auto-categorize items, and provide intelligent recommendations.

> **Live Demo**: [your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

---

## ✨ Features

### 🎤 Voice Input
- **Speech Recognition** — Add, remove, and search items using natural voice commands
- **Natural Language Understanding** — Say things however you want: "Add milk", "I need 5 oranges", "throw in some bread"
- **Real-time Transcript** — See what the app is hearing as you speak
- **Multilingual** — Supports English, Hindi (हिन्दी), Spanish, and French

### 🧠 Smart AI Features
- **Auto-Categorization** — Items are automatically sorted into categories (Dairy, Produce, Bakery, etc.)
- **Purchase History Tracking** — Learns what you buy frequently
- **Smart Suggestions** — Recommends items based on your shopping patterns
- **Seasonal Picks** — Suggests seasonal items (watermelon in summer, hot chocolate in winter)
- **Substitutes** — Suggests alternatives (e.g., almond milk instead of regular milk)

### 📋 List Management
- **Voice or Text** — Add items by speaking or typing
- **Quantity Tracking** — "Add 2 bottles of water" works perfectly
- **Category Grouping** — Items organized by Dairy, Produce, Snacks, etc.
- **Toggle Purchased** — Check items off as you shop
- **Smart Duplicates** — Adding the same item again increases quantity instead of creating duplicates

### 🔐 Login & Auth
- **Instant Demo Login** — No typing required. Auto-filled demo account for new users.
- **Secure Persistence** — Uses localStorage for session management.

### 🎨 UI/UX
- **Dark Mode** — Easy on the eyes, modern look
- **Animated Mic Button** — Pulsating ring effect when listening
- **Sound Wave Visualizer** — Audio bars animate while recording
- **Real-time Feedback** — Loading states, confirmations, error messages
- **Responsive** — Works great on desktop and mobile
- **Progress Bar** — See how many items you've checked off

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 + Vite | Fast, component-based UI |
| **Styling** | Tailwind CSS + Custom CSS | Utility classes + custom animations |
| **Voice** | Web Speech API | Browser-native speech recognition (free) |
| **AI/NLP** | Google Gemini API | Intent parsing, categorization, suggestions |
| **Backend** | Node.js + Express | REST API server |
| **Database** | MongoDB Atlas | Cloud-hosted data persistence |
| **Notifications** | react-hot-toast | Clean toast notifications |

---

## 📁 Project Structure

```
VoiceCart/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── VoiceButton.jsx      # Mic button + language selector
│   │   │   ├── ShoppingList.jsx     # Category-grouped item list
│   │   │   ├── Suggestions.jsx      # AI recommendation cards
│   │   │   └── SearchResults.jsx    # Voice search results
│   │   ├── hooks/
│   │   │   └── useVoiceRecognition.js  # Web Speech API hook
│   │   ├── services/
│   │   │   └── api.js               # Backend API calls
│   │   ├── App.jsx                  # Main app + business logic
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Design system + animations
│   ├── index.html
│   └── vite.config.js
├── server/                          # Express Backend
│   ├── models/
│   │   ├── Item.js                  # Shopping item schema
│   │   └── UserHistory.js           # Purchase frequency tracking
│   ├── routes/
│   │   ├── items.js                 # CRUD endpoints
│   │   ├── voice.js                 # NLP processing endpoint
│   │   └── suggestions.js           # AI suggestions endpoint
│   ├── services/
│   │   └── nlpService.js            # Gemini API integration
│   └── server.js                    # Express app + MongoDB connection
├── docs/
│   └── approach.md                  # Design approach write-up
└── README.md
```

---

## ⚡ How It Works

```
User speaks → Web Speech API → Raw transcript
                                      ↓
                              Gemini AI (NLP)
                                      ↓
                           Extract: intent, item,
                           quantity, category
                                      ↓
                    ┌─────────────────┼─────────────────┐
                    ↓                 ↓                 ↓
              intent: add      intent: remove     intent: search
                    ↓                 ↓                 ↓
            POST /api/items   DELETE /api/items   Filter local list
                    ↓                 ↓                 ↓
                    └─────────────────┼─────────────────┘
                                      ↓
                              UI updates instantly
                                      ↓
                          Suggestions refresh (AI)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (free tier) — [Create one here](https://www.mongodb.com/atlas)
- Google Gemini API key (free tier) — [Get one here](https://aistudio.google.com/apikey)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/voicecart.git
cd voicecart
```

### 2. Set up the backend
```bash
cd server
npm install

# Create your .env file
cp .env.example .env
# Edit .env and add your MongoDB URI and Gemini API key
```

### 3. Set up the frontend
```bash
cd ../client
npm install
```

### 4. Start both servers
```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
cd client
npm run dev
```

### 5. Open in browser
Navigate to `http://localhost:5173` — make sure to use **Chrome** or **Edge** for voice recognition support.

---

## 🎤 Voice Commands Examples

| What you say | What happens |
|---|---|
| "Add milk" | Adds 1 pcs of milk (Dairy) |
| "Add 2 bottles of water" | Adds 2 bottles of water (Beverages) |
| "I need 5 oranges" | Adds 5 oranges (Produce) |
| "Remove eggs from my list" | Removes eggs |
| "Delete bread" | Removes bread |
| "Find organic apples" | Searches for organic apples |
| "मुझे दूध चाहिए" (Hindi) | Adds milk |

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `GEMINI_API_KEY` | Google Gemini API key |

---

## 📊 Architecture Decisions

1. **Web Speech API** over paid speech services — It's free, built into Chrome/Edge, supports multiple languages, and has zero latency since it runs in the browser.

2. **Gemini AI for NLP** — Instead of building custom regex parsers or ML models, I leveraged Gemini's understanding of natural language. It handles varied phrasings ("add milk", "I need milk", "throw in some milk") out of the box.

3. **Category auto-detection** — Rather than asking users to specify categories, Gemini classifies items automatically (milk → Dairy, apples → Produce).

4. **Dark mode by default** — Optimized for mobile shopping in stores with varying lighting conditions.

5. **No authentication** — Simplified the flow using a default user. In production, this would be extended with OAuth.

---

## 🤝 Contributing

This is an assessment project, but feel free to fork and build upon it.

## 📄 License

MIT
