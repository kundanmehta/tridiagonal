const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: ['News', 'Case Study', 'Publication', 'Tech Blog'], default: 'Tech Blog' },
  content: { type: String, required: true },
  author: { type: String },
  coverImage: { type: String },
  seo: {
    metaTitle: String,
    metaDescription: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
