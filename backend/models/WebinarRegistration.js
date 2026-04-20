const mongoose = require('mongoose');

const WebinarRegistrationSchema = new mongoose.Schema({
  webinarId: { type: mongoose.Schema.Types.ObjectId, ref: 'Webinar', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.models.WebinarRegistration || mongoose.model('WebinarRegistration', WebinarRegistrationSchema);
