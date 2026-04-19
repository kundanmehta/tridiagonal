const mongoose = require('mongoose');

const WebinarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  eventDate: { type: Date, required: true },
  duration: { type: String, default: '45 mins' },
  description: { type: String, required: true },
  content: [{ type: String }], // Paragraphs of full description
  learnPoints: [{ type: String }],
  attendees: [{ type: String }],
  presenter: {
    name: { type: String },
    title: { type: String },
    company: { type: String },
    image: { type: String }, // URL to uploaded image
  },
  thumbnail: { type: String },
  videoUrl: { type: String }, // For On-Demand
  registrationUrl: { type: String }, // Optional override
  isActive: { type: Boolean, default: true },
  type: { type: String, enum: ['Live', 'On-Demand'], default: 'Live' } // Optional manual override
}, { timestamps: true });

// Auto-generate slug from title if not provided
WebinarSchema.pre('validate', function() {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
});

module.exports = mongoose.models.Webinar || mongoose.model('Webinar', WebinarSchema);
