/**
 * Advanced Recommendation Engine for VoiceCart
 * Strategies:
 * 1. Category Expansion (If user buys Fruit, suggest other Popular Fruits)
 * 2. Cross-Category Pairing (If user buys Bread, suggest Dairy/Eggs)
 * 3. Frequent Re-buys (History based)
 * 4. Trending/Seasonal (Default fallback)
 */

const { CATALOGUE, getCategories, getCategoryItems } = require('../data/catalogue');

// ═══════════════════════════════════════════════════════════════
// STRATEGY 1: Cross-Category Pairings (Logical Co-occurrence)
// ═══════════════════════════════════════════════════════════════
const PAIRING_RULES = {
    'bread': ['butter', 'eggs', 'jam', 'cheese'],
    'milk': ['bread', 'cornflakes', 'tea', 'coffee', 'sugar'],
    'tea': ['sugar', 'milk', 'biscuits', 'rusk'],
    'coffee': ['sugar', 'milk', 'cookies'],
    'rice': ['dal', 'oil', 'ghee', 'curd', 'rajma', 'chole'],
    'dal': ['rice', 'roti', 'ghee', 'spices'],
    'flour': ['oil', 'salt', 'ghee', 'vegetables'],
    'pasta': ['sauce', 'cheese', 'vegetables'],
    'noodles': ['sauce', 'vegetables', 'eggs'],
    'chips': ['cold drink', 'juice', 'dip'],
    'cereal': ['milk', 'fruits'],
    'soap': ['shampoo', 'toothpaste'],
    'detergent': ['dishwash', 'floor cleaner'],
};

function getPairingSuggestions(cartItems) {
    const suggestions = [];
    const cartNames = new Set(cartItems.map(i => i.name.toLowerCase()));

    // Check each item in cart for pairing rules
    for (const item of cartItems) {
        const itemName = item.name.toLowerCase();
        // Check if item name contains any key from rules
        const ruleKey = Object.keys(PAIRING_RULES).find(k => itemName.includes(k));

        if (ruleKey) {
            const targets = PAIRING_RULES[ruleKey];
            for (const target of targets) {
                // Find target in catalogue
                const matches = CATALOGUE.filter(p =>
                    p.tags.includes(target) || p.name.toLowerCase().includes(target)
                );

                // Pick best match (e.g. most popular or first found)
                if (matches.length > 0) {
                    // Avoid duplicates in cart
                    const best = matches.find(m => !cartNames.has(m.name.toLowerCase()) && !suggestions.some(s => s.id === m.id));
                    if (best) {
                        suggestions.push({
                            ...best,
                            reason: `Goes well with ${item.name}`,
                            score: 0.8 // High relevance
                        });
                    }
                }
            }
        }
    }
    return suggestions;
}

// ═══════════════════════════════════════════════════════════════
// STRATEGY 2: Category Expansion (Discovery)
// ═══════════════════════════════════════════════════════════════
function getCategorySuggestions(cartItems) {
    const suggestions = [];
    if (cartItems.length === 0) return [];

    // Identify dominant categories in cart
    const categoryCounts = {};
    cartItems.forEach(i => {
        categoryCounts[i.category] = (categoryCounts[i.category] || 0) + 1;
    });

    // Suggest items from the SAME categories (e.g. buy more fruits)
    for (const cat of Object.keys(categoryCounts)) {
        if (categoryCounts[cat] >= 1) { // If user bought at least 1 item from category
            const candidates = getCategoryItems(cat);
            // Shake up the variety - pick random items from same category
            // Filter out items already in cart
            const valid = candidates.filter(c => !cartItems.some(ci => ci.id === c.id));

            // Randomly pick 2
            const shuffled = valid.sort(() => 0.5 - Math.random()).slice(0, 2);
            shuffled.forEach(p => {
                suggestions.push({
                    ...p,
                    reason: `More from ${cat}`,
                    score: 0.6 // Medium relevance
                });
            });
        }
    }
    return suggestions;
}

// ═══════════════════════════════════════════════════════════════
// STRATEGY 3: History Re-Buy (Habit)
// ═══════════════════════════════════════════════════════════════
function getHistorySuggestions(historyItems, cartItems) {
    if (!historyItems || historyItems.length === 0) return [];
    const suggestions = [];
    const cartIds = new Set(cartItems.map(i => i.id));

    // Sort history by frequency
    const sorted = [...historyItems].sort((a, b) => b.count - a.count);

    for (const h of sorted) {
        if (!cartIds.has(h.itemId)) { // Recommend if not in cart
            // In real app, h.itemId would link to catalogue. Here we simulate.
            const match = CATALOGUE.find(c => c.name === h.itemName || c.id === h.itemId);
            if (match) {
                suggestions.push({
                    ...match,
                    reason: 'Buy again',
                    score: 0.9 // Very high relevance
                });
            }
        }
    }
    return suggestions.slice(0, 3);
}

// ═══════════════════════════════════════════════════════════════
// STRATEGY 4: Trending / Seasonal (Discovery)
// ═══════════════════════════════════════════════════════════════
function getSeasonalSuggestions() {
    const month = new Date().getMonth();
    let keywords = [];
    if (month >= 10 || month <= 1) keywords = ['tea', 'coffee', 'soup', 'ghee']; // Winter
    else if (month >= 3 && month <= 6) keywords = ['juice', 'cold drink', 'mango', 'ice cream', 'curd']; // Summer
    else keywords = ['tea', 'snacks', 'biscuits']; // Monsoon/General

    // Find items matching keywords
    const suggestions = [];
    keywords.forEach(k => {
        const match = CATALOGUE.find(p => p.tags.includes(k));
        if (match) {
            suggestions.push({ ...match, reason: 'Trending now', score: 0.5 });
        }
    });
    return suggestions;
}

// ═══════════════════════════════════════════════════════════════
// MASTER ENGINE
// ═══════════════════════════════════════════════════════════════
function getRecommendations(currentCart, userHistory = []) {
    const allSuggestions = [];

    // 1. Gather all candidates
    allSuggestions.push(...getHistorySuggestions(userHistory, currentCart));
    allSuggestions.push(...getPairingSuggestions(currentCart));
    allSuggestions.push(...getCategorySuggestions(currentCart));
    allSuggestions.push(...getSeasonalSuggestions());

    // 2. Deduplicate (Keep highest score)
    const unique = {};
    for (const item of allSuggestions) {
        if (!unique[item.id] || unique[item.id].score < item.score) {
            unique[item.id] = item;
        }
    }

    // 3. Sort by Score
    const sorted = Object.values(unique)
        .sort((a, b) => b.score - a.score)
        .filter(i => !currentCart.some(c => c.id === i.id)); // Final check to exclude cart items

    // 4. Return top 8 mixed results
    return sorted.slice(0, 8);
}

module.exports = { getRecommendations };
