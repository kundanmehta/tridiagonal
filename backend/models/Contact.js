const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'Reviewed', 'Replied'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
