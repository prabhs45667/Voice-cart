const mongoose = require('mongoose');
require('dotenv').config();

const ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String,
    category: String,
    userId: { type: String, default: 'default_user' }
});
const Item = mongoose.model('Item', ItemSchema);

async function run() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        // Clean slate
        await Item.deleteMany({ userId: 'default_user' });
        console.log('Cleared default_user items.');

        // 1. Create failing items
        const eggs = await Item.create({ name: 'Eggs', quantity: 10, unit: 'dozen', category: 'Dairy', userId: 'default_user' });
        const cuc = await Item.create({ name: 'Cucumber (Kheera)', quantity: 4, unit: 'kg', category: 'Vegetables', userId: 'default_user' });
        console.log('Created items: Eggs, Cucumber (Kheera)');

        // 2. Try regex checks
        const eggRegex = new RegExp(`^Eggs$`, 'i');
        const cucRegex = new RegExp(`^Cucumber \\(Kheera\\)$`, 'i');

        console.log(`Regex 'Eggs': ${eggRegex.test('Eggs')}`);
        console.log(`Regex 'Cucumber (Kheera)': ${cucRegex.test('Cucumber (Kheera)')}`);

        // 3. Try findOneAndDelete manually (simulating DELETE route)
        const delCuc = await Item.findOneAndDelete({
            name: { $regex: cucRegex },
            userId: 'default_user'
        });
        console.log('Deleted Cucumber (Full Remove):', !!delCuc);

        // 4. Try quantity update manually (simulating POST route)
        // Remove 3 dozen eggs from 10
        const eggItem = await Item.findOne({ name: { $regex: eggRegex }, userId: 'default_user' });
        if (eggItem) {
            eggItem.quantity -= 3;
            await eggItem.save();
            console.log('Removed 3 dozen Eggs. New Qty:', eggItem.quantity);
        } else {
            console.log('Could not find Eggs for partial remove.');
        }

    } catch (e) {
        console.error(e);
    } finally {
        mongoose.disconnect();
    }
}

run();
