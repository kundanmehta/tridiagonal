const mongoose = require('mongoose');

const CareersJobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, trim: true }, // URL slug
  title: { type: String, required: true },
  department: { type: String, default: '' },
  location: { type: String, default: 'Pune, India' },
  type: { type: String, default: 'Full-time' }, // Full-time / Internship
  date: { type: String, default: '' },
  experience: { type: String, default: '' },
  education: { type: String, default: '' },
  overview: { type: String, default: '' },
  responsibilities: [{ type: String }],
  requirements: [{ type: String }],
  benefits: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('CareersJob', CareersJobSchema);
