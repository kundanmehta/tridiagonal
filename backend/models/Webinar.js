const mongoose = require('mongoose');

const WebinarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  eventDate: { type: Date, required: true },
  duration: { type: String, default: '45 mins' },
  sessionType: { type: String, default: 'Online Technical Session' },
  description: { type: String, required: true }, // SEO / Summary
  fullDescription: { type: String }, // Detailed HTML content
  formSlug: { type: String, default: '' }, // Link to dynamic registration form
  sections: [{
    type: { type: String, enum: ['heading', 'text', 'image', 'quote', 'points', 'who_attend'], required: true },
    value: { type: String }, 
    level: { type: Number, default: 2 },
    image: { type: String },
    caption: { type: String },
    items: [{ type: String }], // For points and who_attend
  }],
  learnPoints: [{ type: String }],
  attendees: [{ type: String }],
  presenters: [{
    name: { type: String },
    title: { type: String },
    company: { type: String },
    image: { type: String },
    bio: { type: String },
  }],
  thumbnail: { type: String },
  videoUrl: { type: String }, 
  accessType: { type: String, default: 'On-Demand' },
  format: { type: String, default: 'Technical Presentation' },
  host: { type: String, default: 'Tridiagonal Solutions' },
  isActive: { type: Boolean, default: true },
  type: { type: String, enum: ['Live', 'On-Demand'], default: 'Live' }
}, { timestamps: true });

// Auto-generate slug from title if not provided
WebinarSchema.pre('validate', function() {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
});

module.exports = mongoose.models.Webinar || mongoose.model('Webinar', WebinarSchema);
