/**
 * cleanup_duplicate_industries.js
 * Run once with: node cleanup_duplicate_industries.js
 * Removes duplicate industry documents, keeping only the one with the most content.
 */
require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal';

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const db = mongoose.connection.db;
  const col = db.collection('industries');
  const all = await col.find({}).toArray();

  // Group by title
  const byTitle = {};
  for (const doc of all) {
    if (!byTitle[doc.title]) byTitle[doc.title] = [];
    byTitle[doc.title].push(doc);
  }

  let removedCount = 0;
  for (const [title, docs] of Object.entries(byTitle)) {
    if (docs.length <= 1) continue;

    // Keep the one with the most fields/content (largest JSON string)
    docs.sort((a, b) => JSON.stringify(b).length - JSON.stringify(a).length);
    const keep = docs[0];
    const toRemove = docs.slice(1).map(d => d._id);

    console.log(`Title "${title}": keeping _id=${keep._id}, removing ${toRemove.length} duplicate(s)`);
    await col.deleteMany({ _id: { $in: toRemove } });
    removedCount += toRemove.length;
  }

  if (removedCount === 0) {
    console.log('✅ No duplicates found — database is clean!');
  } else {
    console.log(`✅ Done! Removed ${removedCount} duplicate(s).`);
  }

  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });
