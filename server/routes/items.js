const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const UserHistory = require('../models/UserHistory');
const { findInCatalogue } = require('../data/catalogue');

// GET all items for a user
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId || 'default_user';
        const items = await Item.find({ userId }).sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// POST add a new item (must exist in catalogue)
router.post('/', async (req, res) => {
    try {
        const { name, quantity, unit, category, userId, price, catalogueId } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Item name is required' });
        }

        // validate the item exists in our product catalogue
        const catalogueMatch = findInCatalogue(name);
        if (!catalogueMatch) {
            return res.status(400).json({
                error: 'not_in_catalogue',
                message: `"${name}" is not available in our catalogue. Use the search to find available products.`,
            });
        }

        // use official catalogue name and price
        const officialName = catalogueMatch.name;
        const officialPrice = catalogueMatch.price;
        const officialCategory = catalogueMatch.category;

        // escape special regex chars in name (parentheses etc.)
        const escapedName = officialName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // check if item already exists - if so, update quantity
        const existing = await Item.findOne({
            name: { $regex: new RegExp(`^${escapedName}$`, 'i') },
            userId: userId || 'default_user',
            purchased: false,
        });

        if (existing) {
            existing.quantity += (quantity || 1);
            console.log(`[items] Updated existing "${officialName}" qty: ${existing.quantity} (added ${quantity})`);
            await existing.save();

            // update history
            await updateHistory(userId || 'default_user', officialName, officialCategory);

            return res.json(existing);
        }

        const item = new Item({
            name: officialName,
            quantity: quantity || 1,
            unit: unit || catalogueMatch.defaultUnit || 'piece',
            category: officialCategory,
            price: officialPrice,
            catalogueId: catalogueMatch.id,
            userId: userId || 'default_user',
        });
        console.log(`[items] Creating new "${officialName}" qty: ${quantity || 1}, unit: ${unit}`);

        await item.save();

        // also track this in user history for suggestions later
        await updateHistory(userId || 'default_user', officialName, officialCategory);

        res.status(201).json(item);
    } catch (err) {
        console.error('Add item error:', err);
        res.status(500).json({ error: 'Failed to add item' });
    }
});

// PUT update an item (quantity, purchased status, etc)
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// DELETE remove an item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item removed', item });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// DELETE remove item by name (for voice "remove milk" commands)
// POST remove/decrease item quantity
router.post('/remove', async (req, res) => {
    try {
        const { name, quantity, userId } = req.body;
        if (!name) return res.status(400).json({ error: 'Item name required' });

        // escape regex chars
        const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const item = await Item.findOne({
            name: { $regex: new RegExp(`^${escapedName}$`, 'i') },
            userId: userId || 'default_user',
        });

        if (!item) {
            return res.status(404).json({ error: `"${name}" not found in your list` });
        }

        const removeQty = parseFloat(quantity) || 0;

        if (removeQty > 0) {
            item.quantity -= removeQty;
            console.log(`[items] Decreasing "${name}" qty by ${removeQty}. New qty: ${item.quantity}`);

            if (item.quantity <= 0.05) { // epsilon for float arithmetic
                await Item.findByIdAndDelete(item._id);
                return res.json({ message: `Removed ${name}`, item: { ...item.toObject(), quantity: 0 }, action: 'deleted' });
            } else {
                await item.save();
                return res.json({ message: `Decreased ${name} by ${removeQty}`, item, action: 'updated' });
            }
        } else {
            // remove entirely
            await Item.findByIdAndDelete(item._id);
            return res.json({ message: `Removed ${name}`, item, action: 'deleted' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove item' });
    }
});

// DELETE remove an item (legacy)
router.delete('/byname/:name', async (req, res) => {
    try {
        const userId = req.query.userId || 'default_user';
        const escapedName = req.params.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const item = await Item.findOneAndDelete({
            name: { $regex: new RegExp(`^${escapedName}$`, 'i') },
            userId,
        });

        if (!item) {
            return res.status(404).json({ error: `"${req.params.name}" not found in your list` });
        }

        res.json({ message: 'Item removed', item });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// helper: track purchase history for recommendations
async function updateHistory(userId, itemName, category) {
    try {
        let history = await UserHistory.findOne({ userId });

        if (!history) {
            history = new UserHistory({ userId, items: [] });
        }

        const existingEntry = history.items.find(
            h => h.itemName.toLowerCase() === itemName.toLowerCase()
        );

        if (existingEntry) {
            existingEntry.count += 1;
            existingEntry.lastAdded = new Date();
        } else {
            history.items.push({
                itemName,
                category: category || 'Other',
                count: 1,
                lastAdded: new Date(),
            });
        }

        await history.save();
    } catch (err) {
        // don't let history errors break the main flow
        console.error('History update failed:', err.message);
    }
}

module.exports = router;
