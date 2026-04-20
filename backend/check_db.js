const mongoose = require('mongoose');
const Resource = require('./models/Resource');
require('dotenv').config();

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const count = await Resource.countDocuments();
    const types = await Resource.aggregate([
      { $group: { _id: '$resourceType', count: { $sum: 1 } } }
    ]);
    console.log('Total Resources:', count);
    console.log('Types Breakdown:', types);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
check();
