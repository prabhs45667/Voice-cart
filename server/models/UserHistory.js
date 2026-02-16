const mongoose = require('mongoose');

// tracks what users buy frequently so we can make smart suggestions
const historyEntrySchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    category: String,
    count: {
        type: Number,
        default: 1,
    },
    lastAdded: {
        type: Date,
        default: Date.now,
    },
});

const userHistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: 'default_user',
    },
    items: [historyEntrySchema],
}, {
    timestamps: true,
});

module.exports = mongoose.model('UserHistory', userHistorySchema);
