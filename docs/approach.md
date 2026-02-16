# My Approach

**Core Philosophy**: VoiceCart is designed to be the fastest way to build a shopping list, leveraging voice for speed and AI for intelligence.

**Architecture**:
- **Frontend**: React (Vite) for a responsive, dark-mode native feel.
- **Voice**: Web Speech API for instant, zero-latency recognition.
- **Backend/AI**: Node.js/Express + Google Gemini API.
- **Database**: MongoDB Atlas for persistence and history tracking.

**Key Implementations**:
- **Smart Parsing**: A hybrid NLP engine first uses regex for speed ("Add 2kg potatoes"), backed by Gemini for complex intents like "Find toothpaste under $5" or Hindi translations ("Mujhe doodh chahiye").
- **Intelligent Features**: The system auto-categorizes items, suggests substitutes if products are missing, and recommends frequently bought items based on history.
- **Efficiency**: No login wall (instant demo access) and local substitutes ensuring usability even if AI falls back.

**Trade-offs**:
Authentication was simplified to a demo user to focus on core voice UX and NLP accuracy within the 8-hour timeline. Deployment is ready for any Node.js compatible host like Render or Vercel.
