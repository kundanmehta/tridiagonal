const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String }, // Can be HTML or Markdown
  seo: {
    metaTitle: String,
    metaDescription: String,
    canonicalUrl: String,
    openGraphImage: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Page', PageSchema);
