const express = require('express');
const router = express.Router();
const { parseVoiceCommand } = require('../services/nlpService');

// POST process a voice transcript through Gemini NLP
router.post('/process', async (req, res) => {
    try {
        const { transcript } = req.body;

        if (!transcript || transcript.trim() === '') {
            return res.status(400).json({ error: 'No transcript provided' });
        }

        const parsed = await parseVoiceCommand(transcript);
        res.json(parsed);
    } catch (err) {
        console.error('Voice processing error:', err);
        res.status(500).json({ error: 'Failed to process voice command' });
    }
});

module.exports = router;
