/**
 * Indian Grocery Product Catalogue (Consolidated)
 * Generic items without brand names for cleaner UI and easier voice commands.
 * Units follow Indian shopping conventions (kg, liters, dozen, packet, etc.)
 */

const CATALOGUE = [
    { id: 'milk-amul-gold', name: 'Amul Gold Milk', price: 66, mrp: 70, category: 'Dairy', defaultUnit: 'liter', tags: ['milk', 'doodh', 'full cream', 'amul gold'] },
    { id: 'milk-amul-toned', name: 'Amul Taaza (Toned)', price: 54, mrp: 58, category: 'Dairy', defaultUnit: 'liter', tags: ['milk', 'toned milk', 'amul taaza'] },
    { id: 'milk-mother-dairy', name: 'Mother Dairy Milk', price: 64, mrp: 68, category: 'Dairy', defaultUnit: 'liter', tags: ['milk', 'full cream', 'mother dairy'] },
    { id: 'curd-amul', name: 'Amul Masti Dahi', price: 35, mrp: 40, category: 'Dairy', defaultUnit: 'packet', tags: ['curd', 'dahi', 'yogurt', 'amul'] },
    { id: 'curd-nestle', name: 'Nestle Curd', price: 40, mrp: 45, category: 'Dairy', defaultUnit: 'packet', tags: ['curd', 'dahi', 'nestle'] },
    { id: 'butter-amul', name: 'Amul Butter', price: 56, mrp: 60, category: 'Dairy', defaultUnit: 'packet', tags: ['butter', 'makhan', 'amul butter'] },
    { id: 'butter-president', name: 'President Butter', price: 80, mrp: 90, category: 'Dairy', defaultUnit: 'packet', tags: ['butter', 'unsalted butter'] },
    { id: 'paneer-amul', name: 'Amul Paneer', price: 90, mrp: 100, category: 'Dairy', defaultUnit: 'packet', tags: ['paneer', 'cottage cheese'] },
    { id: 'paneer-gowardhan', name: 'Gowardhan Paneer', price: 95, mrp: 105, category: 'Dairy', defaultUnit: 'packet', tags: ['paneer', 'soft paneer'] },
    { id: 'cheese-slices', name: 'Amul Cheese Slices', price: 140, mrp: 150, category: 'Dairy', defaultUnit: 'packet', tags: ['cheese', 'slices', 'burger cheese'] },
    { id: 'cheese-cubes', name: 'Britannia Cheese Cubes', price: 130, mrp: 145, category: 'Dairy', defaultUnit: 'packet', tags: ['cheese', 'cubes'] },
    { id: 'ghee-amul', name: 'Amul Ghee', price: 550, mrp: 600, category: 'Dairy', defaultUnit: 'liter', tags: ['ghee', 'desi ghee', 'cow ghee'] },
    { id: 'ghee-gowardhan', name: 'Gowardhan Ghee', price: 620, mrp: 680, category: 'Dairy', defaultUnit: 'liter', tags: ['ghee', 'premium ghee'] },
    { id: 'lassi-amul', name: 'Amul Lassi', price: 25, mrp: 30, category: 'Dairy', defaultUnit: 'packet', tags: ['lassi', 'sweet lassi'] },
    { id: 'chaas-amul', name: 'Amul Masti Chaas', price: 15, mrp: 20, category: 'Dairy', defaultUnit: 'packet', tags: ['chaas', 'buttermilk'] },
    { id: 'cream-amul', name: 'Amul Fresh Cream', price: 65, mrp: 70, category: 'Dairy', defaultUnit: 'packet', tags: ['cream', 'fresh cream', 'malai'] },
    { id: 'condensed-milk', name: 'Nestle Milkmaid', price: 145, mrp: 160, category: 'Dairy', defaultUnit: 'tin', tags: ['condensed milk', 'mithai mate'] },
    { id: 'eggs-6', name: 'Eggs (6 pcs)', price: 42, mrp: 50, category: 'Dairy', defaultUnit: 'packet', tags: ['eggs', 'anda'] },
    { id: 'eggs-30', name: 'Eggs (Tray of 30)', price: 210, mrp: 250, category: 'Dairy', defaultUnit: 'tray', tags: ['eggs', 'anda', 'full tray'] },

    // ═══ 🥬 VEGETABLES (20 items) ═══
    { id: 'potato', name: 'Potato (Aloo)', price: 25, mrp: 30, category: 'Vegetables', defaultUnit: 'kg', tags: ['potato', 'aloo', 'batata'] },
    { id: 'onion', name: 'Onion (Pyaaz)', price: 35, mrp: 40, category: 'Vegetables', defaultUnit: 'kg', tags: ['onion', 'pyaaz', 'kanda'] },
    { id: 'tomato-desi', name: 'Tomato (Desi)', price: 40, mrp: 50, category: 'Vegetables', defaultUnit: 'kg', tags: ['tomato', 'tamatar', 'sour tomato'] },
    { id: 'tomato-hybrid', name: 'Tomato (Hybrid)', price: 30, mrp: 40, category: 'Vegetables', defaultUnit: 'kg', tags: ['tomato', 'salad tomato'] },
    { id: 'green-chilli', name: 'Green Chilli', price: 60, mrp: 80, category: 'Vegetables', defaultUnit: 'kg', tags: ['chilli', 'mirch', 'hari mirch'] },
    { id: 'ginger', name: 'Ginger (Adrak)', price: 120, mrp: 150, category: 'Vegetables', defaultUnit: 'kg', tags: ['ginger', 'adrak'] },
    { id: 'garlic', name: 'Garlic (Lehsun)', price: 160, mrp: 200, category: 'Vegetables', defaultUnit: 'kg', tags: ['garlic', 'lehsun'] },
    { id: 'coriander', name: 'Coriander Bunch', price: 15, mrp: 20, category: 'Vegetables', defaultUnit: 'bundle', tags: ['coriander', 'dhaniya'] },
    { id: 'palak', name: 'Spinach Bunch', price: 25, mrp: 30, category: 'Vegetables', defaultUnit: 'bundle', tags: ['spinach', 'palak'] },
    { id: 'bhindi', name: 'Lady Finger (Bhindi)', price: 45, mrp: 60, category: 'Vegetables', defaultUnit: 'kg', tags: ['lady finger', 'bhindi', 'okra'] },
    { id: 'cauliflower', name: 'Cauliflower (Gobhi)', price: 35, mrp: 50, category: 'Vegetables', defaultUnit: 'kg', tags: ['cauliflower', 'gobhi'] },
    { id: 'cabbage', name: 'Cabbage', price: 25, mrp: 40, category: 'Vegetables', defaultUnit: 'piece', tags: ['cabbage', 'patta gobhi'] },
    { id: 'carrot-orange', name: 'Carrot (Orange)', price: 40, mrp: 60, category: 'Vegetables', defaultUnit: 'kg', tags: ['carrot', 'gajar'] },
    { id: 'carrot-red', name: 'Carrot (Red Desi)', price: 60, mrp: 80, category: 'Vegetables', defaultUnit: 'kg', tags: ['carrot', 'gajar', 'halwa gajar'] },
    { id: 'cucumber', name: 'Cucumber', price: 30, mrp: 40, category: 'Vegetables', defaultUnit: 'kg', tags: ['cucumber', 'kheera'] },
    { id: 'capsicum', name: 'Capsicum (Green)', price: 50, mrp: 70, category: 'Vegetables', defaultUnit: 'kg', tags: ['capsicum', 'shimla mirch'] },
    { id: 'peas', name: 'Green Peas (Matar)', price: 60, mrp: 80, category: 'Vegetables', defaultUnit: 'kg', tags: ['peas', 'matar'] },
    { id: 'mushroom', name: 'Mushroom Button', price: 55, mrp: 70, category: 'Vegetables', defaultUnit: 'packet', tags: ['mushroom', 'khumbi'] },

    // ═══ 🍎 FRUITS (15 items) ═══
    { id: 'banana-robusta', name: 'Banana (Robusta)', price: 40, mrp: 50, category: 'Fruits', defaultUnit: 'dozen', tags: ['banana', 'kela'] },
    { id: 'banana-elaichi', name: 'Banana (Elaichi)', price: 60, mrp: 80, category: 'Fruits', defaultUnit: 'dozen', tags: ['banana', 'kela', 'small banana'] },
    { id: 'apple-shimla', name: 'Apple (Shimla)', price: 140, mrp: 180, category: 'Fruits', defaultUnit: 'kg', tags: ['apple', 'seb'] },
    { id: 'apple-fuji', name: 'Apple (Fuji Import)', price: 220, mrp: 280, category: 'Fruits', defaultUnit: 'kg', tags: ['apple', 'seb', 'imported apple'] },
    { id: 'mango-alphonso', name: 'Mango (Alphonso)', price: 400, mrp: 600, category: 'Fruits', defaultUnit: 'dozen', tags: ['mango', 'aam', 'hapus'] },
    { id: 'mango-kesar', name: 'Mango (Kesar)', price: 250, mrp: 350, category: 'Fruits', defaultUnit: 'kg', tags: ['mango', 'aam'] },
    { id: 'orange', name: 'Orange (Nagpur)', price: 80, mrp: 100, category: 'Fruits', defaultUnit: 'kg', tags: ['orange', 'santra'] },
    { id: 'grapes-green', name: 'Grapes (Green)', price: 90, mrp: 120, category: 'Fruits', defaultUnit: 'kg', tags: ['grapes', 'angoor'] },
    { id: 'grapes-black', name: 'Grapes (Black)', price: 120, mrp: 150, category: 'Fruits', defaultUnit: 'kg', tags: ['grapes', 'kale angoor'] },
    { id: 'papaya', name: 'Papaya', price: 45, mrp: 60, category: 'Fruits', defaultUnit: 'piece', tags: ['papaya', 'papita'] },
    { id: 'pomegranate', name: 'Pomegranate (Kabul)', price: 180, mrp: 220, category: 'Fruits', defaultUnit: 'kg', tags: ['pomegranate', 'anaar'] },
    { id: 'kiwi', name: 'Kiwi (Imported)', price: 100, mrp: 130, category: 'Fruits', defaultUnit: 'box', tags: ['kiwi', 'zespri'] },
    { id: 'coconut', name: 'Coconut (Water)', price: 50, mrp: 60, category: 'Fruits', defaultUnit: 'piece', tags: ['coconut', 'nariyal pani'] },

    // ═══ 🌾 GROCERY (Staples) ═══
    { id: 'atta-aashirvaad', name: 'Aashirvaad Atta (5kg)', price: 250, mrp: 310, category: 'Grocery', defaultUnit: 'packet', tags: ['atta', 'wheat flour', 'roti'] },
    { id: 'atta-shakti', name: 'Pillsbury Atta (5kg)', price: 240, mrp: 300, category: 'Grocery', defaultUnit: 'packet', tags: ['atta', 'wheat flour'] },
    { id: 'rice-basmati', name: 'India Gate Basmati', price: 150, mrp: 190, category: 'Grocery', defaultUnit: 'kg', tags: ['rice', 'basmati', 'chawal'] },
    { id: 'rice-kolam', name: 'Kolam Rice', price: 65, mrp: 80, category: 'Grocery', defaultUnit: 'kg', tags: ['rice', 'daily rice'] },
    { id: 'rice-brown', name: 'Daawat Brown Rice', price: 140, mrp: 180, category: 'Grocery', defaultUnit: 'kg', tags: ['rice', 'brown rice', 'healthy'] },
    { id: 'dal-toor', name: 'Tata Sampann Toor Dal', price: 145, mrp: 170, category: 'Grocery', defaultUnit: 'kg', tags: ['dal', 'arhar', 'pulses'] },
    { id: 'dal-moong', name: 'Moong Dal (Yellow)', price: 120, mrp: 140, category: 'Grocery', defaultUnit: 'kg', tags: ['dal', 'moong'] },
    { id: 'dal-urad', name: 'Urad Dal (Split)', price: 130, mrp: 150, category: 'Grocery', defaultUnit: 'kg', tags: ['dal', 'black dal'] },
    { id: 'chana-kabuli', name: 'Kabuli Chana (Chole)', price: 110, mrp: 140, category: 'Grocery', defaultUnit: 'kg', tags: ['chole', 'chana'] },
    { id: 'rajma-chitra', name: 'Rajma Chitra', price: 125, mrp: 150, category: 'Grocery', defaultUnit: 'kg', tags: ['rajma', 'beans'] },
    { id: 'sugar', name: 'sugar', price: 44, mrp: 50, category: 'Grocery', defaultUnit: 'kg', tags: ['sugar', 'cheeni'] },
    { id: 'sugar-brown', name: 'Organic Brown Sugar', price: 120, mrp: 150, category: 'Grocery', defaultUnit: 'packet', tags: ['sugar', 'brown sugar', 'healthy'] },
    { id: 'salt-tata', name: 'Tata Salt', price: 28, mrp: 30, category: 'Grocery', defaultUnit: 'packet', tags: ['salt', 'namak', 'iodized'] },
    { id: 'salt-rock', name: 'Sendha Namak (Rock Salt)', price: 50, mrp: 80, category: 'Grocery', defaultUnit: 'packet', tags: ['salt', 'fasting salt'] },
    { id: 'oil-fortune', name: 'Fortune Soybean Oil (1L)', price: 140, mrp: 170, category: 'Grocery', defaultUnit: 'packet', tags: ['oil', 'cooking oil'] },
    { id: 'oil-saffola', name: 'Saffola Gold Oil (1L)', price: 190, mrp: 240, category: 'Grocery', defaultUnit: 'packet', tags: ['oil', 'heart oil'] },
    { id: 'oil-mustard', name: 'Dhara Mustard Oil (1L)', price: 160, mrp: 190, category: 'Grocery', defaultUnit: 'bottle', tags: ['oil', 'sarso tel'] },
    { id: 'oil-olive', name: 'Figaro Olive Oil (500ml)', price: 850, mrp: 1000, category: 'Grocery', defaultUnit: 'bottle', tags: ['oil', 'olive oil', 'healthy'] },

    // ═══ 🫙 MASALA (Spices) ═══
    { id: 'masala-everest-garam', name: 'Everest Garam Masala', price: 75, mrp: 85, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['masala', 'garam masala'] },
    { id: 'masala-mdh-chole', name: 'MDH Chole Masala', price: 68, mrp: 78, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['masala', 'chole'] },
    { id: 'masala-pavbhaji', name: 'Everest Pav Bhaji Masala', price: 65, mrp: 75, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['masala', 'pav bhaji'] },
    { id: 'haldi', name: 'Turmeric Powder (Haldi)', price: 40, mrp: 50, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['haldi', 'turmeric'] },
    { id: 'chilli-powder', name: 'Red Chilli Powder (Tikha)', price: 55, mrp: 70, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['chilli', 'mirch', 'teekha lal'] },
    { id: 'chilli-kashmiri', name: 'Kashmiri Mirch Powder', price: 90, mrp: 110, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['chilli', 'color'] },
    { id: 'jeera', name: 'Jeera Whole', price: 90, mrp: 120, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['jeera', 'cumin'] },

    // ═══ 🍞 BAKERY ═══
    { id: 'bread-white', name: 'Britannia White Bread', price: 45, mrp: 50, category: 'Bakery', defaultUnit: 'packet', tags: ['bread', 'white bread'] },
    { id: 'bread-brown', name: 'Britannia Brown Bread', price: 50, mrp: 55, category: 'Bakery', defaultUnit: 'packet', tags: ['bread', 'brown bread', 'healthy'] },
    { id: 'bread-multigrain', name: 'Modern Multigrain Bread', price: 60, mrp: 70, category: 'Bakery', defaultUnit: 'packet', tags: ['bread', 'multigrain'] },
    { id: 'pav', name: 'Ladi Pav', price: 20, mrp: 25, category: 'Bakery', defaultUnit: 'packet', tags: ['pav', 'bun'] },
    { id: 'eggs-bakery', name: 'Farm Fresh Eggs (6)', price: 48, mrp: 55, category: 'Bakery', defaultUnit: 'packet', tags: ['eggs'] },

    // ═══ 🧴 PERSONAL CARE (Expanded) ═══
    { id: 'paste-colgate', name: 'Colgate Strong Teeth', price: 95, mrp: 110, category: 'Personal Care', defaultUnit: 'tube', tags: ['toothpaste', 'colgate', 'dental'] },
    { id: 'paste-pepsodent', name: 'Pepsodent Germicheck', price: 55, mrp: 65, category: 'Personal Care', defaultUnit: 'tube', tags: ['toothpaste', 'pepsodent'] },
    { id: 'paste-sensodyne', name: 'Sensodyne Fresh Mint', price: 160, mrp: 180, category: 'Personal Care', defaultUnit: 'tube', tags: ['toothpaste', 'sensitive', 'sensodyne'] },
    { id: 'paste-dabur', name: 'Dabur Red Paste', price: 50, mrp: 60, category: 'Personal Care', defaultUnit: 'tube', tags: ['toothpaste', 'ayurvedic', 'dabur'] },
    { id: 'brush-oralb', name: 'Oral-B Toothbrush', price: 30, mrp: 40, category: 'Personal Care', defaultUnit: 'piece', tags: ['toothbrush', 'brush'] },
    { id: 'soap-lux', name: 'Lux Rose Soap', price: 40, mrp: 45, category: 'Personal Care', defaultUnit: 'bar', tags: ['soap', 'bath', 'lux'] },
    { id: 'soap-dove', name: 'Dove Beauty Bar', price: 65, mrp: 75, category: 'Personal Care', defaultUnit: 'bar', tags: ['soap', 'moisturizing', 'dove'] },
    { id: 'soap-dettol', name: 'Dettol Antiseptic Soap', price: 38, mrp: 45, category: 'Personal Care', defaultUnit: 'bar', tags: ['soap', 'germ protection', 'dettol'] },
    { id: 'shampoo-dove', name: 'Dove Repair Shampoo', price: 180, mrp: 220, category: 'Personal Care', defaultUnit: 'bottle', tags: ['shampoo', 'hair', 'dove'] },
    { id: 'shampoo-head', name: 'Head & Shoulders', price: 190, mrp: 230, category: 'Personal Care', defaultUnit: 'bottle', tags: ['shampoo', 'dandruff'] },
    { id: 'shampoo-clinic', name: 'Clinic Plus', price: 80, mrp: 100, category: 'Personal Care', defaultUnit: 'bottle', tags: ['shampoo', 'family'] },
    { id: 'facewash-himalaya', name: 'Himalaya Neem Face Wash', price: 140, mrp: 170, category: 'Personal Care', defaultUnit: 'tube', tags: ['face wash', 'anti acne', 'himalaya'] },
    { id: 'facewash-garnier', name: 'Garnier Men Face Wash', price: 150, mrp: 180, category: 'Personal Care', defaultUnit: 'tube', tags: ['face wash', 'men'] },
    { id: 'tea-tata', name: 'Tata Tea Gold', price: 130, mrp: 150, category: 'Beverages', defaultUnit: 'packet', tags: ['tea', 'chai', 'tata'] },
    { id: 'tea-redlabel', name: 'Red Label Tea', price: 125, mrp: 145, category: 'Beverages', defaultUnit: 'packet', tags: ['tea', 'chai', 'red label'] },
    { id: 'coffee-nescafe', name: 'Nescafe Classic', price: 180, mrp: 210, category: 'Beverages', defaultUnit: 'jar', tags: ['coffee', 'instant'] },
    { id: 'coffee-bru', name: 'Bru Gold Coffee', price: 200, mrp: 240, category: 'Beverages', defaultUnit: 'jar', tags: ['coffee', 'bru'] },
    { id: 'drink-coke', name: 'Coca Cola (1.25L)', price: 60, mrp: 65, category: 'Beverages', defaultUnit: 'bottle', tags: ['cold drink', 'soda'] },
    { id: 'drink-thumsup', name: 'Thums Up (1.25L)', price: 60, mrp: 65, category: 'Beverages', defaultUnit: 'bottle', tags: ['cold drink', 'toofani'] },
    { id: 'juice-real', name: 'Real Mixed Fruit', price: 110, mrp: 130, category: 'Beverages', defaultUnit: 'packet', tags: ['juice', 'fruit juice'] },

    { id: 'det-surf', name: 'Surf Excel Matic', price: 240, mrp: 280, category: 'Household', defaultUnit: 'packet', tags: ['detergent', 'washing powder'] },
    { id: 'det-tide', name: 'Tide Plus', price: 110, mrp: 140, category: 'Household', defaultUnit: 'packet', tags: ['detergent', 'tide'] },
    { id: 'dish-vim-bar', name: 'Vim Dishwash Bar', price: 20, mrp: 25, category: 'Household', defaultUnit: 'bar', tags: ['dishwash', 'vim'] },
    { id: 'dish-vim-liq', name: 'Vim Liquid Gel', price: 105, mrp: 120, category: 'Household', defaultUnit: 'bottle', tags: ['dishwash', 'liquid'] },
    { id: 'toilet-harpic', name: 'Harpic Power Plus', price: 95, mrp: 115, category: 'Household', defaultUnit: 'bottle', tags: ['toilet cleaner', 'cleaner'] },
    { id: 'floor-lizol', name: 'Lizol Floor Cleaner', price: 110, mrp: 130, category: 'Household', defaultUnit: 'bottle', tags: ['floor cleaner', 'disinfectant'] },
];

function findInCatalogue(query) {
    if (!query) return null;
    const q = query.toLowerCase().trim();
    let match = CATALOGUE.find(p => p.name.toLowerCase() === q);
    if (match) return match;
    match = CATALOGUE.find(p => p.name.toLowerCase().includes(q) || q.includes(p.name.toLowerCase()));
    if (match) return match;
    match = CATALOGUE.find(p => p.tags.some(t => t === q || t.includes(q) || q.includes(t)));
    if (match) return match;
    const words = q.split(/\s+/);
    if (words.length >= 1) {
        match = CATALOGUE.find(p => { const n = p.name.toLowerCase(); const t = p.tags.join(' ').toLowerCase(); return words.every(w => n.includes(w) || t.includes(w)); });
        if (match) return match;
        if (words.length >= 2) {
            match = CATALOGUE.find(p => { const n = p.name.toLowerCase(); const t = p.tags.join(' ').toLowerCase(); return words.filter(w => n.includes(w) || t.includes(w)).length >= 2; });
            if (match) return match;
        }
        const skip = new Set(['add', 'the', 'of', 'a', 'an', 'my', 'me', 'get', 'buy', 'need', 'want', 'please', 'some', 'mujhe', 'chahiye', 'do', 'ek', 'daal', 'daalo']);
        const meaningful = words.filter(w => !skip.has(w) && w.length > 2);
        if (meaningful.length > 0) {
            match = CATALOGUE.find(p => { const t = p.tags.join(' ').toLowerCase(); return meaningful.some(w => t.includes(w)); });
            if (match) return match;
        }
    }
    return null;
}

function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

function fuzzyFindInCatalogue(query) {
    const exact = findInCatalogue(query);
    if (exact) return exact;
    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/);
    let bestMatch = null, bestDist = Infinity;
    for (const p of CATALOGUE) {
        for (const tag of p.tags) {
            for (const w of words) {
                if (w.length < 3) continue;
                const dist = levenshtein(w, tag);
                if (dist <= 2 && dist < bestDist) {
                    bestDist = dist;
                    bestMatch = p;
                }
            }
        }
    }
    return bestMatch;
}

function searchCatalogue(query) {
    if (!query) return CATALOGUE;
    const q = query.toLowerCase().trim();
    return CATALOGUE.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q) || q.includes(t)) || p.category.toLowerCase().includes(q));
}

function getCategories() { return [...new Set(CATALOGUE.map(p => p.category))]; }
function getCategoryItems(category) { return CATALOGUE.filter(p => p.category === category); }

module.exports = { CATALOGUE, findInCatalogue, fuzzyFindInCatalogue, searchCatalogue, getCategories, getCategoryItems };
