const mongoose = require('mongoose');

const ContentBlockSchema = new mongoose.Schema({
  blockType: { type: String, enum: ['heading', 'text', 'image'] },
  text: String,
  subValue: String,
  image: String,
  link: String
}, { _id: false });

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
  contributors: [{ name: String, role: String, organization: String, image: String }], // Technical Contributors for Blogs
  date: { type: Date, default: Date.now },
  excerpt: { type: String },
  content: { type: String }, // Rich text content for Blogs and Case Studies
  contentBlocks: [ContentBlockSchema],
  coverImage: { type: String },
  fileUrl: { type: String }, // For PDF Brochures
  externalUrl: { type: String }, // For Publication links
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    focusKeyword: { type: String, default: '' },
    ogImage: { type: String, default: '' }
  },
  selectedFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'DynamicForm' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Pre-save hook to generate slug if missing
ResourceSchema.pre('validate', function() {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
});

module.exports = mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);
