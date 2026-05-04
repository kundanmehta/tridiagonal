require('dotenv').config();
const mongoose = require('mongoose');
const CareersJob = require('./models/CareersJob');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const jobs = await CareersJob.find({});
  console.log(JSON.stringify(jobs.map(j => ({id: j.id, title: j.title, applyExternalLink: j.applyExternalLink})), null, 2));
  process.exit(0);
}).catch(console.error);
