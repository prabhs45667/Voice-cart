const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0.1, // allow fractional quantities like 0.25 kg, 0.5 liter
  },
  unit: {
    type: String,
    default: 'pcs',
    trim: true,
  },
  category: {
    type: String,
    default: 'Other',
    enum: [
      'Dairy', 'Vegetables', 'Fruits', 'Grocery',
      'Masala & Spices', 'Bakery', 'Snacks', 'Beverages',
      'Household', 'Personal Care', 'Other',
      // legacy values for backward compat
      'Produce', 'Meat', 'Frozen',
    ],
  },
  price: {
    type: Number,
    default: 0,
  },
  catalogueId: {
    type: String,
    default: '',
  },
  purchased: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    default: 'default_user',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Item', itemSchema);
