const express = require('express');
const router = express.Router();
const { CATALOGUE, searchCatalogue, getCategories, getCategoryItems } = require('../data/catalogue');

// GET full catalogue
router.get('/', (req, res) => {
    const { category, search, maxPrice } = req.query;

    let results = CATALOGUE;

    if (search) {
        results = searchCatalogue(search, maxPrice ? parseFloat(maxPrice) : null);
    } else if (category) {
        results = getCategoryItems(category);
    }

    if (maxPrice && !search) {
        results = results.filter(p => p.price <= parseFloat(maxPrice));
    }

    res.json(results);
});

// GET all categories
router.get('/categories', (req, res) => {
    res.json(getCategories());
});

// GET products by category
router.get('/category/:name', (req, res) => {
    const items = getCategoryItems(req.params.name);
    res.json(items);
});

module.exports = router;
