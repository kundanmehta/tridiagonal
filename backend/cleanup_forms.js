const mongoose = require('mongoose');
const DynamicForm = require('./models/DynamicForm');

const MONGODB_URI = 'mongodb://kundan:elc2GEn9GPDVRQAd@ac-btdfeeo-shard-00-00.kyykxaa.mongodb.net:27017,ac-btdfeeo-shard-00-01.kyykxaa.mongodb.net:27017,ac-btdfeeo-shard-00-02.kyykxaa.mongodb.net:27017/?ssl=true&replicaSet=atlas-d8d2ga-shard-0&authSource=admin&appName=Cluster0';

async function cleanup() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');
        
        const result = await DynamicForm.updateMany(
            { adminEmail: 'info@tridiagonal.com' }, 
            { $set: { adminEmail: '' } }
        );
        
        console.log(`Cleaned up ${result.modifiedCount} forms.`);
        process.exit(0);
    } catch (err) {
        console.error('Cleanup error:', err);
        process.exit(1);
    }
}

cleanup();
