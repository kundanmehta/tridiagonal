const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  heroImage: { type: String },
  contentImages: [{ type: String }],
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    focusKeyword: { type: String, default: '' },
    ogImage: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
