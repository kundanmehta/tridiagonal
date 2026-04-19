const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['News', 'Press Release'], default: 'News' },
  description: { type: String, required: true },
  sections: [{
    type: { type: String, enum: ['heading', 'text', 'image', 'quote'], required: true },
    value: { type: String }, // stores text or heading text
    level: { type: Number, default: 2 }, // h2, h3, etc
    image: { type: String }, // image URL
    caption: { type: String }, // image caption
  }],
  thumbnail: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Auto-generate slug
NewsSchema.pre('validate', function() {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
});

module.exports = mongoose.models.News || mongoose.model('News', NewsSchema);
