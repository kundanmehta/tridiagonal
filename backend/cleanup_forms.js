require('dotenv').config();
const mongoose = require('mongoose');
const DynamicForm = require('./models/DynamicForm');

const MONGODB_URI = process.env.MONGODB_URI;

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
