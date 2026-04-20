const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  resourceType: {
    type: String,
    enum: ['Blog', 'Case Study', 'Publication', 'Brochure'],
    default: 'Blog'
  },
  category: { type: String, default: 'General' }, // Sub-category (e.g. Engineering, Modeling for Blogs)
  industry: { type: String, default: 'All' },
  service: { type: String, default: 'All' },
  author: { type: String }, // Can be used for "Authors" in Publications too
  date: { type: Date, default: Date.now },
  excerpt: { type: String },
  content: { type: String }, // Rich text content for Blogs and Case Studies
  coverImage: { type: String },
  fileUrl: { type: String }, // For PDF Brochures
  externalUrl: { type: String }, // For Publication links
  seo: {
    metaTitle: String,
    metaDescription: String,
  },
  selectedFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'DynamicForm' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);
