const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract'], default: 'Full-Time' },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  isActive: { type: Boolean, default: true },
  seo: {
    metaTitle: String,
    metaDescription: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Career', CareerSchema);
