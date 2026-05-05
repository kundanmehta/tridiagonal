const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  // Only one document should exist
  singleton: { type: Boolean, default: true, unique: true },
  
  smtp: {
    host: { type: String, default: '' },
    port: { type: String, default: '587' },
    user: { type: String, default: '' },
    pass: { type: String, default: '' },
  },
  recipientEmail: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
