# Project Approach

VoiceCart is a production-ready voice-first shopping assistant built on the MERN stack, designed to meet all specified requirements for intelligent list management.

### Voice Input & NLP
Leveraging the **Web Speech API** for real-time multilingual recognition and **Google Gemini 1.5 Flash** for Natural Language Processing, the system handles complex phrasing ("Add 2 bottles of water") and automatically categorizes items.

### Smart Suggestions
The custom Recommendation Engine implements:
*   **Apriori Algorithm:** Mines frequent itemsets for smart complementary pairings (e.g., Pasta with Cheese).
*   **User History & Seasonal:** Prioritizes frequently bought and season-specific items.
*   **Substitutes:** Automatically offers alternatives for unavailable products.

### Voice-Activated Search
Users can filter products by price ("under 100") and brand details using voice commands, powered by the hybrid NLP engine.

### Shopping List Management
Full voice control for adding, removing, and modifying quantities, with automatic categorization for organized display.

### UI/UX & Hosting
A minimalist, mobile-optimized dark mode interface provides real-time visual feedback. The solution is deployed on **Vercel** (Frontend) and **Render** (Backend) for reliable cloud performance.
