const mongoose = require('mongoose');
require('dotenv').config();

// Direct connection to shard 00-00
const directUri = 'mongodb://kundan:yGuoU5fnQm4Ra4Cw@ac-btdfeeo-shard-00-00.kyykxaa.mongodb.net:27017/?ssl=true&authSource=admin&directConnection=true';

console.log('Testing direct connection to shard-00-00');

async function test() {
    try {
        console.log('Attempting direct connection...');
        await mongoose.connect(directUri);
        console.log('✅ Direct Connection Successful!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Direct Connection Failed:');
        console.error(err);
        process.exit(1);
    }
}

test();
