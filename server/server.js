require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const itemRoutes = require('./routes/items');
const voiceRoutes = require('./routes/voice');
const suggestionRoutes = require('./routes/suggestions');
const catalogueRoutes = require('./routes/catalogue');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin: ['https://voice-cart-drab.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// request logging - helpful during development
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// routes
app.use('/api/items', itemRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/catalogue', catalogueRoutes);

// health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// start server immediately, connect to MongoDB in background
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// connect to MongoDB (non-blocking)
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection failed (server still running):', err.message));
