const express = require('express');
const router = express.Router();
const UserHistory = require('../models/UserHistory');
const Item = require('../models/Item');
const { generateSuggestions, findSubstitutes } = require('../services/nlpService');

// GET suggestions based on user's purchase history
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId || 'default_user';

        const history = await UserHistory.findOne({ userId });
        const currentItems = await Item.find({ userId, purchased: false });

        const suggestions = await generateSuggestions(
            history ? history.items : [],
            currentItems
        );

        res.json(suggestions);
    } catch (err) {
        console.error('Suggestions error:', err);
        res.status(500).json({ error: 'Failed to generate suggestions' });
    }
});

// GET substitutes for a specific item
router.get('/substitutes/:item', async (req, res) => {
    try {
        const substitutes = await findSubstitutes(req.params.item);
        res.json(substitutes);
    } catch (err) {
        console.error('Substitutes error:', err);
        res.status(500).json({ error: 'Failed to find substitutes' });
    }
});

module.exports = router;
