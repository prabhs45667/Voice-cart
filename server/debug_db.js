const mongoose = require('mongoose');
require('dotenv').config();

const ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String,
    category: String,
    purchased: Boolean,
    userId: { type: String, default: 'default_user' },
});
const Item = mongoose.model('Item', ItemSchema);

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const items = await Item.find({});
        console.log('--- ALL ITEMS ---');
        items.forEach(i => {
            console.log(`id: ${i._id}, name: "${i.name}", qty: ${i.quantity}, unit: "${i.unit}", userId: "${i.userId}"`);

            if (i.name.toLowerCase().includes('banana')) {
                console.log('   -> MATCHES "banana" substring');
                const escaped = i.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`^${escaped}$`, 'i');
                console.log(`   -> Name: "${i.name}"`);
                console.log(`   -> Escaped: "${escaped}"`);
                console.log(`   -> Regex: ${regex}`);
                console.log('   -> Regex Test: ', regex.test(i.name));
            }
        });

    } catch (e) {
        console.error(e);
    } finally {
        mongoose.disconnect();
    }
}

check();
