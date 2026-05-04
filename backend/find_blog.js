const mongoose = require('mongoose');
const Resource = require('./models/Resource');
require('dotenv').config();

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const slug = 'fluid-structure-interaction-analysis';
    const blog = await Resource.findOne({ slug });
    if (blog) {
      console.log('--- BLOG_DATA ---');
      console.log('ID=' + blog._id);
      console.log('SLUG=' + blog.slug);
      console.log('TYPE=' + blog.resourceType);
      console.log('----------------');
    } else {
      console.log('BLOG_NOT_FOUND');
    }
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
}
check();
