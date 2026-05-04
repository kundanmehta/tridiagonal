const mongoose = require('mongoose');
const Resource = require('./models/Resource');
require('dotenv').config();

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const resources = await Resource.find({}, '_id slug title').sort({ createdAt: -1 });
    console.log('--- DATABASE_RESOURCES ---');
    resources.forEach(r => {
      console.log(`ID: ${r._id} | SLUG: ${r.slug} | TITLE: ${r.title.substring(0, 30)}...`);
    });
    console.log('-------------------------');
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
}
check();
