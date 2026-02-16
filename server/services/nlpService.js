const { GoogleGenerativeAI } = require('@google/generative-ai');
const { findInCatalogue, fuzzyFindInCatalogue, searchCatalogue, CATALOGUE } = require('../data/catalogue');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// ═══════════════════════════════════════════════════════════════
// HINDI → ENGLISH ITEM DICTIONARY (phonetic variants included)
// ═══════════════════════════════════════════════════════════════
const HINDI_ITEMS = {
    // dairy
    doodh: 'milk', dudh: 'milk', dhoodh: 'milk',
    makhan: 'butter', makkhan: 'butter',
    ghee: 'ghee', desi_ghee: 'ghee',
    paneer: 'paneer', panner: 'paneer',
    dahi: 'curd', dahee: 'curd', yogurt: 'curd',
    lassi: 'lassi',
    chaas: 'buttermilk', mattha: 'buttermilk', chhaas: 'buttermilk',
    anda: 'eggs', ande: 'eggs', eggs: 'eggs', egg: 'eggs',
    cream: 'cream', malai: 'cream',
    cheese: 'cheese',
    // vegetables
    aloo: 'potato', aaloo: 'potato', aalou: 'potato', allu: 'potato', potato: 'potato',
    pyaaz: 'onion', pyaj: 'onion', pyaz: 'onion',
    tamatar: 'tomato', tamaatar: 'tomato', tamater: 'tomato',
    mirch: 'chilli', mirchi: 'chilli', hari_mirch: 'green chilli',
    adrak: 'ginger', adrakh: 'ginger',
    lehsun: 'garlic', lahsun: 'garlic', lehsan: 'garlic', lasan: 'garlic',
    gobhi: 'cauliflower', gobi: 'cauliflower', phool_gobhi: 'cauliflower',
    shimla_mirch: 'capsicum',
    palak: 'spinach',
    dhaniya: 'coriander',
    bhindi: 'lady finger', okra: 'lady finger',
    baingan: 'brinjal', baigan: 'brinjal',
    lauki: 'bottle gourd', ghiya: 'bottle gourd',
    matar: 'peas', mutter: 'peas',
    gajar: 'carrot',
    mooli: 'radish',
    karela: 'bitter gourd',
    patta_gobhi: 'cabbage', band_gobhi: 'cabbage',
    kheera: 'cucumber', kakdi: 'cucumber',
    nimbu: 'lemon', neembu: 'lemon',
    khumbi: 'mushroom',
    // fruits
    kela: 'banana',
    seb: 'apple', saib: 'apple',
    aam: 'mango', aarm: 'mango', aamb: 'mango',
    hapus: 'alphonso mango', alphonso: 'alphonso mango',
    langda: 'desi mango',
    santra: 'orange', santre: 'orange', santara: 'orange', narangi: 'orange',
    angoor: 'grapes',
    papita: 'papaya',
    tarbooz: 'watermelon', tarbuj: 'watermelon',
    anaar: 'pomegranate', anar: 'pomegranate',
    amrud: 'guava', amrood: 'guava',
    ananas: 'pineapple',
    nariyal: 'coconut',
    cheeku: 'chikoo', sapota: 'chikoo',
    // grocery
    atta: 'atta', gehu: 'atta',
    chawal: 'rice', chaawal: 'rice',
    dal: 'dal', daal: 'dal',
    rajma: 'rajma',
    chole: 'chole', chane: 'chole', chana: 'chole',
    cheeni: 'sugar', shakkar: 'sugar',
    namak: 'salt',
    tel: 'oil', sarso: 'mustard oil', sarson: 'mustard oil',
    besan: 'besan',
    maida: 'maida',
    suji: 'suji', sooji: 'suji', rava: 'suji',
    poha: 'poha',
    // spices
    masala: 'garam masala',
    haldi: 'turmeric',
    jeera: 'cumin', zeera: 'cumin',
    rai: 'mustard seeds',
    kali_mirch: 'black pepper',
    // bakery
    bread: 'bread', double_roti: 'bread',
    pav: 'pav',
    rusk: 'rusk',
    // snacks
    bhujia: 'bhujia', namkeen: 'bhujia',
    chips: 'chips', lays: 'chips',
    maggi: 'maggi', noodles: 'maggi',
    biscuit: 'biscuits', parle: 'parle-g',
    // beverages
    chai: 'tea', chai_patti: 'tea',
    coffee: 'coffee',
    juice: 'juice',
    paani: 'water', pani: 'water',
    sharbat: 'rooh afza',
    // household
    sabun: 'soap', detergent: 'detergent',
    // personal care
    shampoo: 'shampoo',
    toothpaste: 'toothpaste',
};

// ═══════════════════════════════════════════════════════════════
// DEVANAGARI → ROMANIZED HINDI (for when Speech API returns Hindi script)
// ═══════════════════════════════════════════════════════════════
const DEVANAGARI_ITEMS = {
    // common phrases
    'मुझे': 'mujhe', 'चाहिए': 'chahiye', 'दो': 'do', 'एक': 'ek', 'दे': 'de',
    'लाओ': 'lao', 'डालो': 'daalo', 'हटाओ': 'hatao', 'निकालो': 'nikalo',
    'खोजो': 'search', 'ढूंढो': 'search', 'सब': 'sab', 'हटा': 'hata',
    'साफ': 'saaf', 'करो': 'karo', 'कर': 'kar',
    // numbers
    'एक': 'ek', 'दो': 'do', 'तीन': 'teen', 'चार': 'char', 'पांच': 'paanch',
    'छह': 'chhe', 'सात': 'saat', 'आठ': 'aath', 'नौ': 'nau', 'दस': 'das',
    'आधा': 'aadha', 'पाव': 'paav', 'डेढ़': 'dedh', 'ढाई': 'dhai',
    // units
    'किलो': 'kilo', 'ग्राम': 'gram', 'लीटर': 'liter', 'पैकेट': 'packet',
    'दर्जन': 'darjan', 'बोतल': 'bottle', 'पीस': 'piece',
    // dairy
    'दूध': 'doodh', 'मक्खन': 'makhan', 'घी': 'ghee', 'पनीर': 'paneer',
    'दही': 'dahi', 'लस्सी': 'lassi', 'छाछ': 'chaas', 'अंडा': 'anda',
    'अंडे': 'ande', 'क्रीम': 'cream', 'मलाई': 'malai', 'चीज़': 'cheese',
    // vegetables
    'आलू': 'aloo', 'प्याज': 'pyaaz', 'टमाटर': 'tamatar', 'मिर्च': 'mirch',
    'हरी': 'hari', 'अदरक': 'adrak', 'लहसुन': 'lehsun', 'गोभी': 'gobhi',
    'फूल': 'phool', 'शिमला': 'shimla', 'पालक': 'palak', 'धनिया': 'dhaniya',
    'भिंडी': 'bhindi', 'बैंगन': 'baingan', 'लौकी': 'lauki', 'घिया': 'ghiya',
    'मटर': 'matar', 'गाजर': 'gajar', 'मूली': 'mooli', 'करेला': 'karela',
    'पत्ता': 'patta', 'गोबी': 'gobi', 'खीरा': 'kheera', 'ककड़ी': 'kakdi',
    'नींबू': 'nimbu', 'खुंबी': 'khumbi',
    // fruits
    'केला': 'kela', 'सेब': 'seb', 'आम': 'aam', 'संतरा': 'santra',
    'अंगूर': 'angoor', 'पपीता': 'papita', 'तरबूज': 'tarbooz',
    'अनार': 'anaar', 'अमरूद': 'amrud', 'अनानास': 'ananas',
    'नारियल': 'nariyal', 'चीकू': 'cheeku',
    // grocery & staples
    'आटा': 'atta', 'चावल': 'chawal', 'दाल': 'dal', 'राजमा': 'rajma',
    'छोले': 'chole', 'चना': 'chana', 'चीनी': 'cheeni', 'शक्कर': 'shakkar',
    'नमक': 'namak', 'तेल': 'tel', 'सरसों': 'sarson', 'बेसन': 'besan',
    'मैदा': 'maida', 'सूजी': 'suji', 'पोहा': 'poha',
    // spices
    'मसाला': 'masala', 'हल्दी': 'haldi', 'जीरा': 'jeera', 'राई': 'rai',
    'काली': 'kali',
    // bakery & snacks
    'ब्रेड': 'bread', 'रोटी': 'roti', 'पाव': 'pav', 'रस्क': 'rusk',
    'भुजिया': 'bhujia', 'नमकीन': 'namkeen', 'चिप्स': 'chips',
    'मैगी': 'maggi', 'नूडल्स': 'noodles', 'बिस्कुट': 'biscuit',
    // beverages
    'चाय': 'chai', 'कॉफ़ी': 'coffee', 'जूस': 'juice', 'पानी': 'paani',
    'शरबत': 'sharbat',
    // household
    'साबुन': 'sabun',
};

function transliterateDevanagari(text) {
    // if text has no Devanagari chars, return as-is
    if (!/[\u0900-\u097F]/.test(text)) return text;

    let result = text;
    // sort keys by length (longest first) to avoid partial replacements
    const sorted = Object.keys(DEVANAGARI_ITEMS).sort((a, b) => b.length - a.length);
    for (const deva of sorted) {
        result = result.replace(new RegExp(deva, 'g'), DEVANAGARI_ITEMS[deva]);
    }
    // clean up any remaining Devanagari chars
    result = result.replace(/[\u0900-\u097F]+/g, '').trim();
    return result;
}

// ═══════════════════════════════════════════════════════════════
// HINDI NUMBER WORDS
// ═══════════════════════════════════════════════════════════════
const HINDI_NUMBERS = {
    ek: 1, do: 2, teen: 3, char: 4, paanch: 5, panch: 5,
    chhe: 6, cheh: 6, saat: 7, aath: 8, nau: 9, das: 10,
    gyarah: 11, barah: 12, bees: 20, pacchis: 25, tees: 30,
    aadha: 0.5, half: 0.5, quarter: 0.25, paav: 0.25,
    dedh: 1.5, dhai: 2.5,
};

// ═══════════════════════════════════════════════════════════════
// UNIT ALIASES
// ═══════════════════════════════════════════════════════════════
const UNIT_MAP = {
    kg: 'kg', kilo: 'kg', kilogram: 'kg', kilograms: 'kg',
    gram: 'kg', grams: 'kg', gm: 'kg', g: 'kg', // will adjust qty
    liter: 'liter', litre: 'liter', liters: 'liter', litres: 'liter', lt: 'liter', l: 'liter',
    ml: 'liter', milliliter: 'liter', // will adjust qty
    dozen: 'dozen', darjan: 'dozen', darzan: 'dozen',
    packet: 'packet', pack: 'packet', packets: 'packet', packs: 'packet',
    piece: 'piece', pieces: 'piece', pcs: 'piece', unit: 'piece', units: 'piece',
    bundle: 'bundle', bundles: 'bundle',
    bottle: 'bottle', bottles: 'bottle',
    box: 'packet', carton: 'packet',
};

// ═══════════════════════════════════════════════════════════════
// KEYWORD PATTERNS — instant, no AI
// ═══════════════════════════════════════════════════════════════

const REMOVE_PATTERNS = [
    /^(?:remove|delete|hata|hatao|nikalo|nikal|hato)\s+(.+)/i,
    /^(.+)\s+(?:remove|delete|hata|hatao|nikalo|nikal|hato)\s*$/i,
    /^(?:remove|delete)\s+(.+?)\s+(?:from|se|list)/i,
];
const CLEAR_PATTERNS = [
    /(?:clear|empty|clean|reset)\s*(?:my|the)?\s*(?:list|cart|everything)/i,
    /(?:delete|remove)\s+(?:everything|all\s+items|all|sab)/i,
    /(?:sab\s+(?:hata|hatao|nikalo|delete|remove|saaf))/i,
    /(?:(?:list|cart|sab\s+kuch)\s+(?:saaf|khali|empty|clear))/i,
    /(?:saaf\s+(?:karo|kardo|kar\s+do))/i,
];

const STOP_PATTERNS = [
    /^(?:stop|done|finish|finished|checkout|check\s+out|that's\s+all|thank\s+you|thanks|exit|quit|end)\s*$/i,
    /^(?:bas|hogaya|ho\s+gaya|bas\s+itna\s+hi|ruk\s+jao|band\s+karo)\s*$/i, // Hindi stop
];

const CHAT_PATTERNS = [
    /^(?:hello|hi|hey|good\s+morning|good\s+afternoon|good\s+evening|what's\s+up|how\s+are\s+you)\s*/i,
    /^(?:who\s+are\s+you|what\s+can\s+you\s+do|tell\s+me\s+about\s+yourself)\s*/i,
    /^(?:namaste|kaise\s+ho|kya\s+haal\s+hai)\s*/i, // Hindi chat
];
const SEARCH_PATTERNS = [
    /^(?:search|find|look|show|dikhao|dhundho|khojo)\s+(?:for\s+)?(.+)/i,
    /^(.+?)\s+(?:search|find|dhundho|dikhao|khojo)\s*$/i,
];

// ═══════════════════════════════════════════════════════════════
// RULE-BASED PARSER — handles ADD, REMOVE, CLEAR, SEARCH
// Works without Gemini. Used as pre-processor AND fallback.
// ═══════════════════════════════════════════════════════════════

function ruleBasedParse(transcript) {
    // first: transliterate any Devanagari script to romanized Hindi
    let text = transliterateDevanagari(transcript).trim().toLowerCase();

    // ── STOP / FINISH ──
    for (const pat of STOP_PATTERNS) {
        if (pat.test(text)) {
            return { intent: 'stop', item: '', quantity: 0, unit: '', category: '', clarification: '' };
        }
    }

    // ── CHAT / GREETING ──
    for (const pat of CHAT_PATTERNS) {
        if (pat.test(text)) {
            return { intent: 'chat', item: text, quantity: 0, unit: '', category: '', clarification: '' };
        }
    }

    // ── CLEAR ──
    for (const pat of CLEAR_PATTERNS) {
        if (pat.test(text)) {
            return { intent: 'clear', item: '', quantity: 0, unit: '', category: '', clarification: '' };
        }
    }

    // ── REMOVE ──
    for (const pat of REMOVE_PATTERNS) {
        const m = text.match(pat);
        if (m) {
            let raw = m[1].replace(/\s+from\s+.*$/, '').replace(/\s+my\s+list$/, '').trim();

            // extract quantity and unit if present
            let quantity = 0; // 0 means remove all by default if no quantity specified? No, effectively means "delete item"
            let unit = '';

            // check for quantity patterns in the raw string: "2 dozen eggs"
            const qtyUnitPatterns = [
                /^(\d+\.?\d*)\s*(kg|kilo|kilogram|gram|grams|gm|g|liter|litre|lt|l|ml|milliliter|dozen|darjan|darzan|packet|pack|piece|pieces|pcs|bottle|bundle|box|carton)\s+(.+)/i,
                /^(\d+\.?\d*)\s+(.+)/i, // "2 eggs"
            ];

            let itemText = raw;

            for (const p of qtyUnitPatterns) {
                const qm = raw.match(p);
                if (qm) {
                    if (qm.length >= 4) { // with explicit unit
                        quantity = parseFloat(qm[1]);
                        let rawUnit = qm[2].toLowerCase();
                        if (['g', 'gm', 'gram', 'grams'].includes(rawUnit)) { quantity /= 1000; unit = 'kg'; }
                        else if (['ml', 'milliliter'].includes(rawUnit)) { quantity /= 1000; unit = 'liter'; }
                        else { unit = UNIT_MAP[rawUnit] || rawUnit; }
                        itemText = qm[3].trim();
                    } else { // qty + item
                        const rawQty = qm[1];
                        itemText = qm[2].trim();
                        quantity = isNaN(rawQty) ? (HINDI_NUMBERS[rawQty] || 1) : parseFloat(rawQty);
                    }
                    break;
                }
            }

            // trailing unit check: "eggs 2 dozen"
            if (quantity === 0) {
                const trailingMatch = raw.match(/^(.+?)\s+(\d+\.?\d*)\s*(kg|kilo|liter|litre|dozen|darjan|packet|piece|bottle|bundle)?\s*$/i);
                if (trailingMatch) {
                    itemText = trailingMatch[1].trim();
                    quantity = parseFloat(trailingMatch[2]);
                    if (trailingMatch[3]) unit = UNIT_MAP[trailingMatch[3].toLowerCase()] || trailingMatch[3];
                }
            }

            const resolved = resolveItemName(itemText);
            const catMatch = findInCatalogue(resolved) || fuzzyFindInCatalogue(resolved);

            // Unit normalization: convert 'kg' -> 'liter' for liquids
            if (catMatch && catMatch.defaultUnit) {
                const du = catMatch.defaultUnit.toLowerCase();
                const u = unit.toLowerCase();
                if ((du === 'liter' || du === 'l' || du === 'ml') && (u === 'kg' || u === 'g' || u === 'gram')) {
                    if (u === 'kg') unit = 'liter';
                    if (u === 'g' || u === 'gram') unit = 'ml';
                }
            }

            return {
                intent: 'remove',
                item: catMatch ? catMatch.name : resolved,
                quantity: quantity > 0 ? quantity : 0, // 0 = remove all
                unit: unit || (catMatch ? catMatch.defaultUnit : ''),
                category: catMatch ? catMatch.category : '',
                clarification: '',
                catalogueId: catMatch ? catMatch.id : '',
            };
        }
    }

    // ── SEARCH ──
    for (const pat of SEARCH_PATTERNS) {
        const m = text.match(pat);
        if (m) {
            return { intent: 'search', item: m[1].trim(), quantity: 1, unit: '', category: '', clarification: '' };
        }
    }

    // ── ADD (rule-based) ──
    // strip add-intent keywords
    const addIntentWords = /^(?:add|buy|get|need|want|please\s+add|mujhe|chahiye|lao|dedo|daalo|daal\s+do|la\s+do|le\s+aao)\s*/i;
    const trailingIntent = /\s*(?:chahiye|do|dedo|lao|daalo|la\s+do|le\s+aao|add|karo|please)\s*$/i;
    text = text.replace(addIntentWords, '').replace(trailingIntent, '').trim();

    // also strip "mujhe ... chahiye" wrapper
    const mujheMatch = text.match(/^mujhe\s+(.+?)\s*(?:chahiye|do|dedo|lao)?$/i);
    if (mujheMatch) text = mujheMatch[1].trim();

    if (!text) return null;

    // extract quantity and unit
    let quantity = 1;
    let unit = '';
    let gramAdjust = false;
    let mlAdjust = false;

    // pattern: "2 kg aloo" or "aadha kilo tamatar" or "250 gram sugar"
    const qtyUnitPatterns = [
        // "2 kg aloo", "0.5 liter milk"
        /^(\d+\.?\d*)\s*(kg|kilo|kilogram|gram|grams|gm|g|liter|litre|lt|l|ml|milliliter|dozen|darjan|darzan|packet|pack|piece|pieces|pcs|bottle|bundle|box|carton)\s+(.+)/i,
        // "aadha kilo tamatar", "ek darjan ande"  
        /^(ek|do|teen|char|paanch|panch|aadha|half|quarter|paav|dedh|dhai)\s+(kg|kilo|kilogram|gram|grams|gm|liter|litre|lt|l|ml|dozen|darjan|darzan|packet|pack|piece|pieces|bottle|bundle)\s+(.+)/i,
        // "2 aloo" (just number + item, no unit)
        /^(\d+\.?\d*)\s+(.+)/i,
        // "ek aloo", "do ande" (hindi number + item, no unit)
        /^(ek|do|teen|char|paanch|panch|aadha|half|quarter|paav|dedh|dhai)\s+(.+)/i,
    ];

    let itemText = text;
    let matched = false;

    for (let pi = 0; pi < qtyUnitPatterns.length; pi++) {
        const m = text.match(qtyUnitPatterns[pi]);
        if (m) {
            if (pi <= 1) {
                // has qty + unit + item
                const rawQty = m[1];
                const rawUnit = m[2];
                itemText = m[3].trim();

                quantity = isNaN(rawQty) ? (HINDI_NUMBERS[rawQty] || 1) : parseFloat(rawQty);
                const normalizedUnit = UNIT_MAP[rawUnit.toLowerCase()];
                unit = normalizedUnit || rawUnit;

                // gram/ml conversion
                if (['gram', 'grams', 'gm', 'g'].includes(rawUnit.toLowerCase())) {
                    gramAdjust = true; // convert to kg later
                }
                if (['ml', 'milliliter'].includes(rawUnit.toLowerCase())) {
                    mlAdjust = true;
                }
            } else {
                // has qty + item (no explicit unit)
                const rawQty = m[1];
                itemText = m[2].trim();
                quantity = isNaN(rawQty) ? (HINDI_NUMBERS[rawQty] || 1) : parseFloat(rawQty);
            }
            matched = true;
            break;
        }
    }

    // also check trailing unit: "aloo 2 kg"
    if (!matched) {
        const trailingMatch = text.match(/^(.+?)\s+(\d+\.?\d*)\s*(kg|kilo|liter|litre|dozen|darjan|packet|piece|bottle|bundle)?\s*$/i);
        if (trailingMatch) {
            itemText = trailingMatch[1].trim();
            quantity = parseFloat(trailingMatch[2]);
            if (trailingMatch[3]) unit = UNIT_MAP[trailingMatch[3].toLowerCase()] || trailingMatch[3];
        }
    }

    // gram/ml adjustment
    if (gramAdjust && quantity >= 1) quantity = quantity / 1000; // 250 gram → 0.25 kg
    if (mlAdjust && quantity >= 1) quantity = quantity / 1000;   // 500 ml → 0.5 liter

    // resolve Hindi item name → English
    const resolvedItem = resolveItemName(itemText);

    // match against catalogue
    const catMatch = findInCatalogue(resolvedItem) || fuzzyFindInCatalogue(resolvedItem);

    // Unit normalization: convert 'kg' -> 'liter' for liquids
    if (catMatch && catMatch.defaultUnit) {
        let u = unit.toLowerCase(); // unit might be empty initially
        const du = catMatch.defaultUnit.toLowerCase();

        // if unit is empty, defaultUnit is used anyway below.
        // check if mismatched: user said 'kg' for 'liter' item
        if (unit && (du === 'liter' || du === 'l' || du === 'ml') && (u === 'kg' || u === 'g' || u === 'gram')) {
            if (u === 'kg') unit = 'liter';
            if (u === 'g' || u === 'gram') unit = 'ml';
        }
    }

    if (catMatch) {
        // use catalogue's default unit if none detected
        if (!unit) unit = catMatch.defaultUnit;
        return {
            intent: 'add',
            item: catMatch.name,
            quantity,
            unit,
            category: catMatch.category,
            price: catMatch.price,
            catalogueId: catMatch.id,
            clarification: '',
        };
    }

    // try harder: split into words and look for any catalogue match
    const words = resolvedItem.split(/\s+/);
    for (const w of words) {
        const wMatch = findInCatalogue(w) || fuzzyFindInCatalogue(w);
        if (wMatch) {
            if (!unit) unit = wMatch.defaultUnit;
            return {
                intent: 'add', item: wMatch.name, quantity, unit,
                category: wMatch.category, price: wMatch.price, catalogueId: wMatch.id,
                clarification: '',
            };
        }
    }

    // searchCatalogue as last resort
    const searchResults = searchCatalogue(resolvedItem);
    if (searchResults.length > 0) {
        const best = searchResults[0];
        if (!unit) unit = best.defaultUnit;
        return {
            intent: 'add', item: best.name, quantity, unit,
            category: best.category, price: best.price, catalogueId: best.id,
            clarification: `Matched "${resolvedItem}" → "${best.name}"`,
        };
    }

    // absolutely nothing found — suggest substitutes
    return {
        intent: 'not_found', item: resolvedItem, quantity, unit,
        category: '', clarification: `"${resolvedItem}" isn't in our catalogue. Try browsing categories or say "search ${resolvedItem}".`,
        substitutes: findLocalSubstitutes(resolvedItem),
    };
}

// ═══════════════════════════════════════════════════════════════
// RESOLVE HINDI → ENGLISH
// ═══════════════════════════════════════════════════════════════

function resolveItemName(text) {
    let resolved = text.trim().toLowerCase();
    // replace underscored combos first
    for (const [hindi, eng] of Object.entries(HINDI_ITEMS)) {
        const pattern = hindi.replace(/_/g, '\\s+');
        const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
        resolved = resolved.replace(regex, eng);
    }
    // single-word replacements
    const words = resolved.split(/\s+/);
    const mapped = words.map(w => HINDI_ITEMS[w] || w);
    return mapped.join(' ').trim();
}

// ═══════════════════════════════════════════════════════════════
// LOCAL SUBSTITUTES (no AI — category-based)
// ═══════════════════════════════════════════════════════════════

function findLocalSubstitutes(query) {
    const q = query.toLowerCase();
    // find items in same category or with similar tags
    const scored = CATALOGUE.map(p => {
        let score = 0;
        const pText = (p.name + ' ' + p.tags.join(' ')).toLowerCase();
        const words = q.split(/\s+/);
        words.forEach(w => { if (pText.includes(w)) score += 2; });
        return { ...p, score };
    }).filter(p => p.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
    return scored.map(p => ({ item: p.name, price: p.price, reason: `Similar to "${query}"` }));
}

// ═══════════════════════════════════════════════════════════════
// MAIN NLP ENTRY POINT
// Rule-based first → Gemini for complex → Rule-based fallback
// ═══════════════════════════════════════════════════════════════

async function parseVoiceCommand(transcript) {
    // STEP 1: Rule-based parser (instant, no AI)
    const ruleResult = ruleBasedParse(transcript);
    if (ruleResult && ruleResult.intent !== 'not_found') {
        console.log(`[rule-based] ${ruleResult.intent}: ${ruleResult.item} (${ruleResult.quantity} ${ruleResult.unit})`);
        return ruleResult;
    }

    // STEP 2: Gemini AI for truly complex / ambiguous commands
    try {
        const catalogueRef = CATALOGUE.slice(0, 50).map(p =>
            `${p.name} (₹${p.price}, ${p.defaultUnit})`
        ).join(', ');

        const prompt = `You are an Indian grocery voice assistant. Parse this command.

Command: "${transcript}"

RULES:
- If Hindi/Hinglish, translate to English first
- Hindi: doodh=milk, aloo=potato, anda=eggs, pyaaz=onion, tamatar=tomato, cheeni=sugar, namak=salt, tel=oil, chawal=rice, atta=flour, dal=lentils, kela=banana, seb=apple, aam=mango, chai=tea, ghee=ghee, paneer=paneer, dahi=curd
- chahiye/do/dedo/lao/daalo = "add"
- ek=1, do=2(qty), teen=3, char=4, paanch=5, das=10, aadha=0.5
- Use default units: veggies/fruits→kg, liquids→liter, eggs→dozen, packaged→packet

Respond ONLY with JSON:
{"intent":"add|remove|clear|search|incomplete","item":"product name in English","quantity":1,"unit":"kg|liter|dozen|packet|piece|bundle|bottle","maxPrice":null|number,"category":"","clarification":"","translatedText":"English translation"}`;

        const result = await model.generateContent(prompt);
        const cleaned = result.response.text().replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);

        // validate add against catalogue
        if (parsed.intent === 'add' && parsed.item) {
            const match = findInCatalogue(parsed.item);
            if (match) {
                parsed.item = match.name;
                parsed.category = match.category;
                parsed.price = match.price;
                parsed.catalogueId = match.id;
                if (!parsed.unit || parsed.unit === 'pcs') parsed.unit = match.defaultUnit;
            } else {
                // AI thinks valid but not in catalogue — try our own matching
                const resolved = resolveItemName(parsed.item);
                const fallback = findInCatalogue(resolved);
                if (fallback) {
                    parsed.item = fallback.name;
                    parsed.category = fallback.category;
                    parsed.price = fallback.price;
                    parsed.catalogueId = fallback.id;
                    if (!parsed.unit || parsed.unit === 'pcs') parsed.unit = fallback.defaultUnit;
                } else {
                    parsed.intent = 'not_found';
                    parsed.clarification = `"${parsed.item}" isn't in our catalogue. Try "search ${parsed.item}".`;
                    parsed.substitutes = findLocalSubstitutes(parsed.item);
                }
            }
        }
        return parsed;
    } catch (err) {
        console.error('Gemini error, using rule-based fallback:', err.message);
    }

    // STEP 3: Rule-based result as final fallback (even if not_found)
    if (ruleResult) {
        console.log(`[fallback] ${ruleResult.intent}: ${ruleResult.item}`);
        return ruleResult;
    }

    // STEP 4: Absolute last resort — never say "Could not process"
    const lastResort = findInCatalogue(transcript);
    if (lastResort) {
        return {
            intent: 'add', item: lastResort.name, quantity: 1, unit: lastResort.defaultUnit,
            category: lastResort.category, price: lastResort.price, catalogueId: lastResort.id,
            clarification: '',
        };
    }
    return {
        intent: 'search', item: transcript.trim(), quantity: 1, unit: '',
        category: '', clarification: `Searching for "${transcript.trim()}"...`,
    };
}

async function categorizeItem(itemName) {
    const match = findInCatalogue(itemName);
    return match ? match.category : 'Grocery';
}

// ═══════════════════════════════════════════════════════════════
// FREE-TIER SUGGESTIONS (no AI dependency)
// ═══════════════════════════════════════════════════════════════

async function generateSuggestions(historyItems, currentItems) {
    const currentNames = new Set((currentItems || []).map(i => i.name.toLowerCase()));
    const suggestions = [];

    // 1. History-based: most frequently bought, not already in cart
    if (historyItems && historyItems.length > 0) {
        const sorted = [...historyItems].sort((a, b) => b.count - a.count);
        for (const h of sorted) {
            if (suggestions.length >= 5) break;
            if (currentNames.has(h.itemName.toLowerCase())) continue;
            const match = findInCatalogue(h.itemName);
            if (match) {
                suggestions.push({
                    item: match.name, price: match.price, category: match.category,
                    reason: `Bought ${h.count}x before`,
                });
            }
        }
    }

    // 2. Complementary items (if user has X, suggest Y)
    const complements = {
        'dal': ['rice', 'ghee', 'atta'],
        'rice': ['dal', 'curd'],
        'atta': ['ghee', 'oil'],
        'bread': ['butter', 'eggs'],
        'milk': ['tea', 'sugar'],
        'tea': ['milk', 'sugar'],
        'paneer': ['capsicum', 'onion', 'tomato'],
        'maggi': ['eggs', 'onion'],
    };
    for (const item of (currentItems || [])) {
        if (suggestions.length >= 8) break;
        const key = Object.keys(complements).find(k => item.name.toLowerCase().includes(k));
        if (key) {
            for (const comp of complements[key]) {
                if (suggestions.length >= 8) break;
                if (currentNames.has(comp)) continue;
                if (suggestions.find(s => s.item.toLowerCase().includes(comp))) continue;
                const match = findInCatalogue(comp);
                if (match && !currentNames.has(match.name.toLowerCase())) {
                    suggestions.push({
                        item: match.name, price: match.price, category: match.category,
                        reason: `Goes well with ${item.name.split('(')[0].trim()}`,
                    });
                }
            }
        }
    }

    // 3. Seasonal defaults to fill remaining slots
    if (suggestions.length < 5) {
        const seasonal = getSeasonalDefaults();
        for (const s of seasonal) {
            if (suggestions.length >= 5) break;
            if (currentNames.has(s.item.toLowerCase())) continue;
            if (!suggestions.find(x => x.item === s.item)) {
                suggestions.push(s);
            }
        }
    }

    return suggestions.slice(0, 8);
}

async function findSubstitutes(itemName) {
    // free-tier: find items in same category
    const match = findInCatalogue(itemName);
    const category = match ? match.category : '';
    const results = CATALOGUE.filter(p => {
        if (match && p.id === match.id) return false;
        if (category && p.category === category) return true;
        return p.tags.some(t => itemName.toLowerCase().includes(t) || t.includes(itemName.toLowerCase()));
    }).slice(0, 3);
    return results.map(p => ({ item: p.name, price: p.price, reason: `Alternative in ${p.category}` }));
}

function getSeasonalDefaults() {
    const month = new Date().getMonth();
    if (month >= 10 || month <= 1) {
        return [
            { item: 'Tata Tea Gold', reason: 'Winter chai weather ☕', category: 'Beverages', price: 179 },
            { item: 'Orange (Santra)', reason: 'In season, Vitamin C 🍊', category: 'Fruits', price: 65 },
            { item: 'Carrot (Gajar)', reason: 'Gajar ka halwa season', category: 'Vegetables', price: 35 },
            { item: 'Green Peas (Matar)', reason: 'Matar paneer season', category: 'Vegetables', price: 50 },
            { item: 'Amul Ghee', reason: 'Winter warmth ❄️', category: 'Dairy', price: 499 },
        ];
    }
    if (month >= 3 && month <= 6) {
        return [
            { item: 'Alphonso Mango (Hapus)', reason: 'Aam ka season! 🥭', category: 'Fruits', price: 350 },
            { item: 'Watermelon (Tarbooz)', reason: 'Stay hydrated 🍉', category: 'Fruits', price: 25 },
            { item: 'Amul Lassi', reason: 'Beat the heat', category: 'Dairy', price: 22 },
            { item: 'Bisleri Water', reason: 'Hydration essential', category: 'Beverages', price: 20 },
            { item: 'Rooh Afza', reason: 'Summer sharbat 🍹', category: 'Beverages', price: 85 },
        ];
    }
    return [
        { item: 'Amul Full Cream Milk', reason: 'Daily essential 🥛', category: 'Dairy', price: 62 },
        { item: 'Aashirvaad Atta', reason: 'Roti staple 🫓', category: 'Grocery', price: 259 },
        { item: 'Toor Dal (Arhar)', reason: 'Daily dal 🍲', category: 'Grocery', price: 125 },
        { item: 'Potato (Aloo)', reason: 'Must-have sabzi 🥔', category: 'Vegetables', price: 25 },
        { item: 'Tata Tea Gold', reason: 'Morning chai ☕', category: 'Beverages', price: 179 },
    ];
}

module.exports = { parseVoiceCommand, categorizeItem, generateSuggestions, findSubstitutes };
