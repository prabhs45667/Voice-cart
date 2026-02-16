/**
 * Indian Grocery Product Catalogue (Consolidated)
 * Generic items without brand names for cleaner UI and easier voice commands.
 * Units follow Indian shopping conventions (kg, liters, dozen, packet, etc.)
 */

const CATALOGUE = [
    // ═══ 🥛 DAIRY (12 items) ═══
    { id: 'milk', name: 'Milk', price: 62, mrp: 68, category: 'Dairy', defaultUnit: 'liter', tags: ['milk', 'doodh', 'full cream', 'toned milk', 'amul milk', 'mother dairy'] },
    { id: 'curd', name: 'Curd (Dahi)', price: 30, mrp: 35, category: 'Dairy', defaultUnit: 'packet', tags: ['curd', 'dahi', 'yogurt', 'amul dahi'] },
    { id: 'butter', name: 'Butter', price: 52, mrp: 56, category: 'Dairy', defaultUnit: 'packet', tags: ['butter', 'makhan', 'amul butter'] },
    { id: 'paneer', name: 'Paneer', price: 80, mrp: 90, category: 'Dairy', defaultUnit: 'packet', tags: ['paneer', 'cottage cheese', 'amul paneer'] },
    { id: 'cheese', name: 'Cheese', price: 89, mrp: 99, category: 'Dairy', defaultUnit: 'packet', tags: ['cheese', 'cheese slices', 'cheez'] },
    { id: 'ghee', name: 'Ghee', price: 500, mrp: 560, category: 'Dairy', defaultUnit: 'liter', tags: ['ghee', 'desi ghee', 'clarified butter'] },
    { id: 'lassi', name: 'Lassi', price: 25, mrp: 30, category: 'Dairy', defaultUnit: 'packet', tags: ['lassi', 'sweet lassi', 'mango lassi'] },
    { id: 'buttermilk', name: 'Buttermilk (Chaas)', price: 20, mrp: 25, category: 'Dairy', defaultUnit: 'packet', tags: ['chaas', 'buttermilk', 'mattha'] },
    { id: 'cream', name: 'Fresh Cream', price: 45, mrp: 50, category: 'Dairy', defaultUnit: 'packet', tags: ['cream', 'fresh cream', 'malai'] },
    { id: 'khoya', name: 'Khoya (Mawa)', price: 120, mrp: 140, category: 'Dairy', defaultUnit: 'packet', tags: ['khoya', 'mawa'] },
    { id: 'condensed-milk', name: 'Condensed Milk', price: 130, mrp: 150, category: 'Dairy', defaultUnit: 'tin', tags: ['condensed milk', 'milkmaid'] },
    { id: 'eggs', name: 'Eggs', price: 84, mrp: 96, category: 'Dairy', defaultUnit: 'dozen', tags: ['egg', 'eggs', 'anda', 'ande'] },

    // ═══ 🥬 VEGETABLES (20 items) ═══
    { id: 'potato', name: 'Potato (Aloo)', price: 25, mrp: 30, category: 'Vegetables', defaultUnit: 'kg', tags: ['potato', 'aloo', 'aaloo', 'batata'] },
    { id: 'onion', name: 'Onion (Pyaaz)', price: 35, mrp: 40, category: 'Vegetables', defaultUnit: 'kg', tags: ['onion', 'pyaaz', 'kanda'] },
    { id: 'tomato', name: 'Tomato (Tamatar)', price: 40, mrp: 45, category: 'Vegetables', defaultUnit: 'kg', tags: ['tomato', 'tamatar'] },
    { id: 'green-chilli', name: 'Green Chilli (Hari Mirch)', price: 60, mrp: 70, category: 'Vegetables', defaultUnit: 'kg', tags: ['green chilli', 'hari mirch', 'mirch'] },
    { id: 'ginger', name: 'Ginger (Adrak)', price: 120, mrp: 150, category: 'Vegetables', defaultUnit: 'kg', tags: ['ginger', 'adrak'] },
    { id: 'garlic', name: 'Garlic (Lehsun)', price: 140, mrp: 160, category: 'Vegetables', defaultUnit: 'kg', tags: ['garlic', 'lehsun'] },
    { id: 'cauliflower', name: 'Cauliflower (Gobhi)', price: 30, mrp: 40, category: 'Vegetables', defaultUnit: 'kg', tags: ['cauliflower', 'gobhi', 'phool gobhi'] },
    { id: 'cabbage', name: 'Cabbage (Patta Gobhi)', price: 25, mrp: 30, category: 'Vegetables', defaultUnit: 'piece', tags: ['cabbage', 'patta gobhi', 'band gobhi'] },
    { id: 'spinach', name: 'Spinach (Palak)', price: 20, mrp: 25, category: 'Vegetables', defaultUnit: 'bundle', tags: ['spinach', 'palak'] },
    { id: 'coriander', name: 'Coriander (Dhaniya)', price: 10, mrp: 15, category: 'Vegetables', defaultUnit: 'bundle', tags: ['coriander', 'dhaniya lead', 'hara dhaniya'] },
    { id: 'ladyfinger', name: 'Lady Finger (Bhindi)', price: 45, mrp: 55, category: 'Vegetables', defaultUnit: 'kg', tags: ['lady finger', 'bhindi', 'okra'] },
    { id: 'brinjal', name: 'Brinjal (Baingan)', price: 40, mrp: 50, category: 'Vegetables', defaultUnit: 'kg', tags: ['brinjal', 'baingan', 'eggplant'] },
    { id: 'peas', name: 'Green Peas (Matar)', price: 60, mrp: 70, category: 'Vegetables', defaultUnit: 'kg', tags: ['peas', 'matar', 'green peas'] },
    { id: 'carrot', name: 'Carrot (Gajar)', price: 40, mrp: 50, category: 'Vegetables', defaultUnit: 'kg', tags: ['carrot', 'gajar'] },
    { id: 'radish', name: 'Radish (Mooli)', price: 30, mrp: 40, category: 'Vegetables', defaultUnit: 'kg', tags: ['radish', 'mooli'] },
    { id: 'cucumber', name: 'Cucumber (Kheera)', price: 30, mrp: 40, category: 'Vegetables', defaultUnit: 'kg', tags: ['cucumber', 'kheera', 'kakdi'] },
    { id: 'capsicum', name: 'Capsicum (Shimla Mirch)', price: 50, mrp: 60, category: 'Vegetables', defaultUnit: 'kg', tags: ['capsicum', 'shimla mirch'] },
    { id: 'lemon', name: 'Lemon (Nimbu)', price: 80, mrp: 100, category: 'Vegetables', defaultUnit: 'kg', tags: ['lemon', 'nimbu'] },
    { id: 'mushroom', name: 'Mushroom', price: 50, mrp: 60, category: 'Vegetables', defaultUnit: 'packet', tags: ['mushroom', 'khumbi'] },
    { id: 'bottle-gourd', name: 'Bottle Gourd (Lauki)', price: 30, mrp: 40, category: 'Vegetables', defaultUnit: 'piece', tags: ['bottle gourd', 'lauki', 'ghiya'] },

    // ═══ 🍎 FRUITS (15 items) ═══
    { id: 'banana', name: 'Banana (Kela)', price: 40, mrp: 50, category: 'Fruits', defaultUnit: 'dozen', tags: ['banana', 'kela', 'bananas'] },
    { id: 'apple', name: 'Apple (Seb)', price: 150, mrp: 180, category: 'Fruits', defaultUnit: 'kg', tags: ['apple', 'seb'] },
    { id: 'mango', name: 'Mango (Aam)', price: 120, mrp: 150, category: 'Fruits', defaultUnit: 'kg', tags: ['mango', 'aam', 'alphonso', 'dasheri'] },
    { id: 'orange', name: 'Orange (Santra)', price: 80, mrp: 100, category: 'Fruits', defaultUnit: 'kg', tags: ['orange', 'santra', 'kinnow'] },
    { id: 'grapes', name: 'Grapes (Angoor)', price: 90, mrp: 110, category: 'Fruits', defaultUnit: 'kg', tags: ['grapes', 'angoor'] },
    { id: 'papaya', name: 'Papaya (Papita)', price: 50, mrp: 60, category: 'Fruits', defaultUnit: 'piece', tags: ['papaya', 'papita'] },
    { id: 'watermelon', name: 'Watermelon (Tarbooz)', price: 30, mrp: 40, category: 'Fruits', defaultUnit: 'piece', tags: ['watermelon', 'tarbooz'] },
    { id: 'pomegranate', name: 'Pomegranate (Anaar)', price: 160, mrp: 200, category: 'Fruits', defaultUnit: 'kg', tags: ['pomegranate', 'anaar'] },
    { id: 'guava', name: 'Guava (Amrud)', price: 60, mrp: 70, category: 'Fruits', defaultUnit: 'kg', tags: ['guava', 'amrud'] },
    { id: 'pineapple', name: 'Pineapple (Ananas)', price: 60, mrp: 70, category: 'Fruits', defaultUnit: 'piece', tags: ['pineapple', 'ananas'] },
    { id: 'kiwi', name: 'Kiwi', price: 30, mrp: 40, category: 'Fruits', defaultUnit: 'piece', tags: ['kiwi'] },
    { id: 'coconut', name: 'Coconut (Nariyal)', price: 40, mrp: 50, category: 'Fruits', defaultUnit: 'piece', tags: ['coconut', 'nariyal'] },
    { id: 'muskmelon', name: 'Muskmelon (Kharbuja)', price: 40, mrp: 50, category: 'Fruits', defaultUnit: 'piece', tags: ['muskmelon', 'kharbuja'] },
    { id: 'pear', name: 'Pear (Nashpati)', price: 100, mrp: 120, category: 'Fruits', defaultUnit: 'kg', tags: ['pear', 'nashpati'] },
    { id: 'chikoo', name: 'Chikoo', price: 70, mrp: 80, category: 'Fruits', defaultUnit: 'kg', tags: ['chikoo', 'sapota'] },

    // ═══ 🌾 GROCERY (15 items) ═══
    { id: 'atta', name: 'Atta (Wheat Flour)', price: 45, mrp: 50, category: 'Grocery', defaultUnit: 'kg', tags: ['atta', 'wheat flour', 'aashirvaad', 'gehu ka atta'] },
    { id: 'rice', name: 'Basmati Rice', price: 120, mrp: 150, category: 'Grocery', defaultUnit: 'kg', tags: ['rice', 'basmati', 'chawal', 'india gate', 'daawat'] },
    { id: 'sugar', name: 'Sugar (Cheeni)', price: 42, mrp: 48, category: 'Grocery', defaultUnit: 'kg', tags: ['sugar', 'cheeni', 'shakkar'] },
    { id: 'salt', name: 'Salt (Namak)', price: 22, mrp: 25, category: 'Grocery', defaultUnit: 'kg', tags: ['salt', 'namak', 'tata salt'] },
    { id: 'oil', name: 'Cooking Oil', price: 160, mrp: 180, category: 'Grocery', defaultUnit: 'liter', tags: ['oil', 'cooking oil', 'sunflower oil', 'fortune oil', 'mustard oil'] },
    { id: 'toor-dal', name: 'Toor Dal (Arhar)', price: 130, mrp: 150, category: 'Grocery', defaultUnit: 'kg', tags: ['toor dal', 'arhar dal', 'dal'] },
    { id: 'moong-dal', name: 'Moong Dal', price: 110, mrp: 130, category: 'Grocery', defaultUnit: 'kg', tags: ['moong dal', 'yellow dal'] },
    { id: 'chana-dal', name: 'Chana Dal', price: 90, mrp: 100, category: 'Grocery', defaultUnit: 'kg', tags: ['chana dal'] },
    { id: 'masoor-dal', name: 'Masoor Dal', price: 100, mrp: 120, category: 'Grocery', defaultUnit: 'kg', tags: ['masoor dal', 'red lentils'] },
    { id: 'urad-dal', name: 'Urad Dal', price: 120, mrp: 140, category: 'Grocery', defaultUnit: 'kg', tags: ['urad dal', 'black gram'] },
    { id: 'rajma', name: 'Rajma', price: 130, mrp: 150, category: 'Grocery', defaultUnit: 'kg', tags: ['rajma', 'kidney beans'] },
    { id: 'chole', name: 'Chole (Kabuli Chana)', price: 100, mrp: 120, category: 'Grocery', defaultUnit: 'kg', tags: ['chole', 'kabuli chana', 'chickpeas'] },
    { id: 'besan', name: 'Besan', price: 90, mrp: 100, category: 'Grocery', defaultUnit: 'kg', tags: ['besan', 'gram flour'] },
    { id: 'maida', name: 'Maida', price: 40, mrp: 50, category: 'Grocery', defaultUnit: 'kg', tags: ['maida', 'refined flour'] },
    { id: 'suji', name: 'Suji (Rava)', price: 45, mrp: 55, category: 'Grocery', defaultUnit: 'kg', tags: ['suji', 'rava', 'semolina'] },

    // ═══ 🫙 MASALA (15 items) ═══
    { id: 'turmeric', name: 'Turmeric (Haldi)', price: 30, mrp: 35, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['turmeric', 'haldi', 'haldi powder'] },
    { id: 'red-chilli', name: 'Red Chilli Powder', price: 40, mrp: 50, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['red chilli', 'lal mirch', 'mirch powder'] },
    { id: 'coriander-pdr', name: 'Coriander Powder', price: 30, mrp: 40, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['coriander powder', 'dhaniya powder'] },
    { id: 'cumin-pdr', name: 'Cumin Powder (Jeera)', price: 45, mrp: 55, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['cumin powder', 'jeera powder'] },
    { id: 'garam-masala', name: 'Garam Masala', price: 60, mrp: 70, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['garam masala'] },
    { id: 'cumin-seeds', name: 'Jeera (Whole)', price: 80, mrp: 90, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['cumin seeds', 'jeera', 'sabut jeera'] },
    { id: 'mustard-seeds', name: 'Mustard Seeds (Rai)', price: 30, mrp: 40, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['mustard seeds', 'rai', 'sarso'] },
    { id: 'black-pepper', name: 'Black Pepper', price: 100, mrp: 120, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['black pepper', 'kali mirch'] },
    { id: 'cloves', name: 'Cloves (Laung)', price: 90, mrp: 110, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['cloves', 'laung'] },
    { id: 'cardamom', name: 'Cardamom (Elaichi)', price: 150, mrp: 180, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['cardamom', 'elaichi', 'green cardamom'] },
    { id: 'cinnamon', name: 'Cinnamon (Dalchini)', price: 60, mrp: 70, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['cinnamon', 'dalchini'] },
    { id: 'hing', name: 'Hing (Asafoetida)', price: 50, mrp: 60, category: 'Masala & Spices', defaultUnit: 'bottle', tags: ['hing', 'asafoetida'] },
    { id: 'kitchen-king', name: 'Kitchen King Masala', price: 55, mrp: 65, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['kitchen king'] },
    { id: 'chhole-masala', name: 'Chole Masala', price: 50, mrp: 60, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['chole masala'] },
    { id: 'pav-bhaji-masala', name: 'Pav Bhaji Masala', price: 45, mrp: 55, category: 'Masala & Spices', defaultUnit: 'packet', tags: ['pav bhaji masala'] },

    // ═══ 🍞 BAKERY (10 items) ═══
    { id: 'bread', name: 'Bread', price: 40, mrp: 45, category: 'Bakery', defaultUnit: 'packet', tags: ['bread', 'white bread', 'brown bread', 'britannia'] },
    { id: 'pav', name: 'Pav (Bun)', price: 30, mrp: 35, category: 'Bakery', defaultUnit: 'packet', tags: ['pav', 'bun', 'ladi pav'] },
    { id: 'rusk', name: 'Rusk', price: 45, mrp: 50, category: 'Bakery', defaultUnit: 'packet', tags: ['rusk', 'toast', 'suji rusk'] },
    { id: 'cake', name: 'Cake', price: 150, mrp: 180, category: 'Bakery', defaultUnit: 'packet', tags: ['cake', 'fruit cake', 'sponge cake'] },
    { id: 'cookies', name: 'Cookies', price: 100, mrp: 120, category: 'Bakery', defaultUnit: 'packet', tags: ['cookies', 'biscuits', 'bakery biscuits'] },
    { id: 'cream-roll', name: 'Cream Roll', price: 20, mrp: 25, category: 'Bakery', defaultUnit: 'piece', tags: ['cream roll'] },
    { id: 'muffin', name: 'Muffin', price: 40, mrp: 45, category: 'Bakery', defaultUnit: 'piece', tags: ['muffin', 'cupcake'] },
    { id: 'croissant', name: 'Croissant', price: 60, mrp: 70, category: 'Bakery', defaultUnit: 'piece', tags: ['croissant'] },
    { id: 'bagel', name: 'Bagel', price: 50, mrp: 60, category: 'Bakery', defaultUnit: 'piece', tags: ['bagel'] },
    { id: 'pizza-base', name: 'Pizza Base', price: 40, mrp: 50, category: 'Bakery', defaultUnit: 'packet', tags: ['pizza base'] },

    // ═══ 🍟 SNACKS (12 items) ═══
    { id: 'chips', name: 'Chips', price: 20, mrp: 20, category: 'Snacks', defaultUnit: 'packet', tags: ['chips', 'potato chips', 'lays', 'wafer'] },
    { id: 'namkeen', name: 'Namkeen', price: 60, mrp: 70, category: 'Snacks', defaultUnit: 'packet', tags: ['namkeen', 'bhujia', 'mixture', 'haldiram'] },
    { id: 'biscuits', name: 'Biscuits', price: 30, mrp: 35, category: 'Snacks', defaultUnit: 'packet', tags: ['biscuits', 'parle g', 'good day', 'cookies'] },
    { id: 'noodles', name: 'Noodles', price: 14, mrp: 14, category: 'Snacks', defaultUnit: 'packet', tags: ['noodles', 'maggi', 'yippee', 'chowmein'] },
    { id: 'pasta', name: 'Pasta', price: 50, mrp: 60, category: 'Snacks', defaultUnit: 'packet', tags: ['pasta', 'macaroni'] },
    { id: 'soup', name: 'Soup', price: 40, mrp: 45, category: 'Snacks', defaultUnit: 'packet', tags: ['soup', 'knorr soup'] },
    { id: 'popcorn', name: 'Popcorn', price: 30, mrp: 35, category: 'Snacks', defaultUnit: 'packet', tags: ['popcorn', 'act ii'] },
    { id: 'chocolates', name: 'Chocolate', price: 50, mrp: 55, category: 'Snacks', defaultUnit: 'bar', tags: ['chocolate', 'cadbury', 'dairy milk'] },
    { id: 'nachos', name: 'Nachos', price: 60, mrp: 70, category: 'Snacks', defaultUnit: 'packet', tags: ['nachos', 'doritos'] },
    { id: 'peanuts', name: 'Peanuts', price: 40, mrp: 50, category: 'Snacks', defaultUnit: 'packet', tags: ['peanuts', 'moongfali'] },
    { id: 'foxnuts', name: 'Fox Nuts (Makhana)', price: 100, mrp: 120, category: 'Snacks', defaultUnit: 'packet', tags: ['makhana', 'fox nuts'] },
    { id: 'dry-fruits', name: 'Dry Fruits Mix', price: 250, mrp: 300, category: 'Snacks', defaultUnit: 'packet', tags: ['dry fruits', 'badam', 'kaju', 'kishmish'] },

    // ═══ ☕ BEVERAGES (12 items) ═══
    { id: 'tea', name: 'Tea (Chai)', price: 130, mrp: 150, category: 'Beverages', defaultUnit: 'packet', tags: ['tea', 'chai', 'chai patti', 'tata tea', 'red label'] },
    { id: 'coffee', name: 'Coffee', price: 180, mrp: 200, category: 'Beverages', defaultUnit: 'jar', tags: ['coffee', 'nescafe', 'bru'] },
    { id: 'green-tea', name: 'Green Tea', price: 150, mrp: 180, category: 'Beverages', defaultUnit: 'packet', tags: ['green tea', 'lipton'] },
    { id: 'juice', name: 'Fruit Juice', price: 110, mrp: 130, category: 'Beverages', defaultUnit: 'liter', tags: ['juice', 'real juice', 'tropicana'] },
    { id: 'cold-drink', name: 'Cold Drink', price: 45, mrp: 50, category: 'Beverages', defaultUnit: 'liter', tags: ['cold drink', 'coke', 'pepsi', 'sprite', 'thums up'] },
    { id: 'water', name: 'Mineral Water', price: 20, mrp: 20, category: 'Beverages', defaultUnit: 'bottle', tags: ['water', 'bisleri', 'pani'] },
    { id: 'health-drink', name: 'Health Drink', price: 250, mrp: 280, category: 'Beverages', defaultUnit: 'jar', tags: ['health drink', 'horlicks', 'bournvita'] },
    { id: 'soda', name: 'Soda', price: 20, mrp: 25, category: 'Beverages', defaultUnit: 'bottle', tags: ['soda', 'club soda'] },
    { id: 'energy-drink', name: 'Energy Drink', price: 110, mrp: 120, category: 'Beverages', defaultUnit: 'can', tags: ['energy drink', 'red bull'] },
    { id: 'lemonade', name: 'Lemonade (Nimbu Pani)', price: 30, mrp: 35, category: 'Beverages', defaultUnit: 'bottle', tags: ['lemonade', 'nimbu pani'] },
    { id: 'syrup', name: 'Rose Syrup', price: 120, mrp: 140, category: 'Beverages', defaultUnit: 'bottle', tags: ['syrup', 'rooh afza', 'sharbat'] },
    { id: 'coconut-water', name: 'Coconut Water', price: 50, mrp: 60, category: 'Beverages', defaultUnit: 'bottle', tags: ['coconut water', 'nariyal pani'] },

    // ═══ 🏠 HOUSEHOLD (10 items) ═══
    { id: 'detergent', name: 'Detergent Powder', price: 130, mrp: 150, category: 'Household', defaultUnit: 'kg', tags: ['detergent', 'surf excel', 'ariel', 'washing powder'] },
    { id: 'dishwash-bar', name: 'Dishwash Bar', price: 20, mrp: 25, category: 'Household', defaultUnit: 'piece', tags: ['dishwash', 'vim bar', 'bartan'] },
    { id: 'toilet-cleaner', name: 'Toilet Cleaner', price: 90, mrp: 100, category: 'Household', defaultUnit: 'bottle', tags: ['toilet cleaner', 'harpic'] },
    { id: 'floor-cleaner', name: 'Floor Cleaner', price: 100, mrp: 120, category: 'Household', defaultUnit: 'bottle', tags: ['floor cleaner', 'lizol', 'phenyl'] },
    { id: 'glass-cleaner', name: 'Glass Cleaner', price: 80, mrp: 90, category: 'Household', defaultUnit: 'bottle', tags: ['glass cleaner', 'colin'] },
    { id: 'garbage-bags', name: 'Garbage Bags', price: 70, mrp: 80, category: 'Household', defaultUnit: 'packet', tags: ['garbage bags', 'dustbin bags'] },
    { id: 'tissue', name: 'Tissue Paper', price: 50, mrp: 60, category: 'Household', defaultUnit: 'packet', tags: ['tissue', 'napkin'] },
    { id: 'toilet-paper', name: 'Toilet Paper', price: 40, mrp: 50, category: 'Household', defaultUnit: 'roll', tags: ['toilet paper'] },
    { id: 'mosquitto', name: 'Mosquito Repellent', price: 80, mrp: 90, category: 'Household', defaultUnit: 'bottle', tags: ['mosquito', 'all out', 'good knight'] },
    { id: 'air-freshener', name: 'Air Freshener', price: 150, mrp: 180, category: 'Household', defaultUnit: 'can', tags: ['air freshener', 'room spray'] },

    // ═══ 🧴 PERSONAL CARE (10 items) ═══
    { id: 'soap', name: 'Bath Soap', price: 40, mrp: 50, category: 'Personal Care', defaultUnit: 'bar', tags: ['soap', 'lux', 'dove', 'dettol', 'sabun'] },
    { id: 'shampoo', name: 'Shampoo', price: 180, mrp: 220, category: 'Personal Care', defaultUnit: 'bottle', tags: ['shampoo', 'dove', 'sunsilk', 'head and shoulders'] },
    { id: 'toothpaste', name: 'Toothpaste', price: 60, mrp: 70, category: 'Personal Care', defaultUnit: 'tube', tags: ['toothpaste', 'colgate', 'pepsodent'] },
    { id: 'toothbrush', name: 'Toothbrush', price: 30, mrp: 40, category: 'Personal Care', defaultUnit: 'piece', tags: ['toothbrush'] },
    { id: 'face-wash', name: 'Face Wash', price: 120, mrp: 150, category: 'Personal Care', defaultUnit: 'tube', tags: ['face wash', 'himalaya'] },
    { id: 'cream', name: 'Body Lotion', price: 200, mrp: 250, category: 'Personal Care', defaultUnit: 'bottle', tags: ['lotion', 'cream', 'moisturizer', 'nivea', 'vaseline'] },
    { id: 'hair-oil', name: 'Hair Oil', price: 90, mrp: 110, category: 'Personal Care', defaultUnit: 'bottle', tags: ['hair oil', 'coconut oil', 'parachute'] },
    { id: 'sanitary-pads', name: 'Sanitary Pads', price: 80, mrp: 100, category: 'Personal Care', defaultUnit: 'packet', tags: ['pads', 'sanitary pads', 'whisper'] },
    { id: 'shaving-cream', name: 'Shaving Cream', price: 70, mrp: 80, category: 'Personal Care', defaultUnit: 'tube', tags: ['shaving cream', 'gillette'] },
    { id: 'hand-wash', name: 'Hand Wash', price: 90, mrp: 100, category: 'Personal Care', defaultUnit: 'bottle', tags: ['hand wash', 'dettol'] },
];

// ═══ HELPER FUNCTIONS ═══

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

// Levenshtein distance for fuzzy matching
function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1]
                : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

// Fuzzy catalogue search — tries exact, then includes, then Levenshtein
function fuzzyFindInCatalogue(query) {
    // first try exact/includes match
    const exact = findInCatalogue(query);
    if (exact) return exact;
    // then try Levenshtein on tags (threshold: 2 chars difference)
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
        // also check against name words
        const nameWords = p.name.toLowerCase().replace(/[()]/g, '').split(/\s+/);
        for (const nw of nameWords) {
            for (const w of words) {
                if (w.length < 3) continue;
                const dist = levenshtein(w, nw);
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
