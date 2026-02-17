# My Approach & Architecture

**VoiceCart** is built on a **Voice-First Philosophy**, prioritizing speed and natural interaction over traditional UI flows.

### Technology Stack
- **Frontend:** React 19 + Vite (Fast, component-based UI).
- **Backend:** Node.js + Express (Robust API server).
- **Database:** MongoDB Atlas (Flexible schema for product catalogue & history).
- **Deployment:** Vercel (Frontend) + Render (Backend).

### AI/ML & Natural Language Processing
- **Hybrid NLP Engine:**
  - **Rule-Based Parser (Regex):** Handles instant commands like "Add milk", "Clear list" for <100ms latency.
  - **Google Gemini 1.5 Flash (LLM):** Processes complex intents, Hindi translations ("Mujhe doodh chahiye"), and price filtering ("Search rice under ₹100").
- **Fuzzy Search:** Implements Levenshtein distance to tolerate typos (e.g., "biskit" -> "Biscuit").

### Smart Algorithms
- **Multi-Strategy Recommendation Engine:**
  - Uses a **Weighted Scoring System** combining 4 strategies:
    1.  **Co-occurrence Pairs** ({Pasta, Cheese}).
    2.  **Category Expansion** ({Apple, Banana}).
    3.  **User History** (Frequently bought items).
    4.  **Seasonal Trends** ({Winter, Tea/Soup}).
  - Deduplicates and ranks top 8 suggestions dynamically.

This architecture ensures a seamless experience: **Native Speech API** for speed + **GenAI** for intelligence.
