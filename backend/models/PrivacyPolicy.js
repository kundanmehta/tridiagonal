const mongoose = require('mongoose');

const PrivacyPolicySchema = new mongoose.Schema({
  singleton: { type: Boolean, default: true, unique: true },
  
  hero: {
    titleLine1: { type: String, default: "Privacy" },
    titleLine2: { type: String, default: "Policy" },
    description: { type: String, default: "We are committed to protecting your privacy and ensuring your data is handled securely." },
  },

  contentSections: [{
    title: { type: String },
    content: { type: String } // HTML allowed
  }],

}, { timestamps: true });

// Ensure we only have one document
PrivacyPolicySchema.pre('save', async function() {
  if (this.isNew) {
    const existing = await mongoose.models.PrivacyPolicy.countDocuments();
    if (existing > 0) {
      throw new Error('You can only create one Privacy Policy document!');
    }
  }
});

module.exports = mongoose.models.PrivacyPolicy || mongoose.model('PrivacyPolicy', PrivacyPolicySchema);
