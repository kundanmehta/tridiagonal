const mongoose = require('mongoose');

const IndustrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  overview: { type: String, required: true },
  servicesMapping: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  heroImage: { type: String },
  seo: {
    metaTitle: String,
    metaDescription: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Industry', IndustrySchema);
