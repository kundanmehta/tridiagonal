const mongoose = require('mongoose');
const AboutPage = require('./models/AboutPage');

async function check() {
  await mongoose.connect('mongodb://127.0.0.1:27017/tridiagonal');
  const d = await AboutPage.findOne();
  console.log(JSON.stringify(d, null, 2));
  process.exit(0);
}
check();
