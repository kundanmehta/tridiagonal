require('dotenv').config();
const mongoose = require('mongoose');
const HomePage = require('./models/HomePage');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tridiagonal';

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    const data = await HomePage.findOne();
    console.log('DATA_START');
    console.log(JSON.stringify(data, null, 2));
    console.log('DATA_END');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

check();
