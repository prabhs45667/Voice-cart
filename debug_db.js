const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' }); // Adjust path if needed

const ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    unit: String,
    category: String,
    purchased: Boolean,
    userId: String,
});
const Item = mongoose.model('Item', ItemSchema);

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const items = await Item.find({});
        console.log('--- ALL ITEMS ---');
        items.forEach(i => {
            console.log(`id: ${i._id}, name: "${i.name}", qty: ${i.quantity}, unit: "${i.unit}", user: "${i.userId}"`);
            // print checks
            if (i.name.includes('Banana')) {
                console.log('   -> MATCHES "Banana" substring');
                console.log('   -> RegEx Test ^Banana (Kela)$: ', /^Banana \(Kela\)$/i.test(i.name));
            }
        });

    } catch (e) {
        console.error(e);
    } finally {
        mongoose.disconnect();
    }
}

check();
