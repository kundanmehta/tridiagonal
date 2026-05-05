const mongoose = require('mongoose');

const CareersPageSchema = new mongoose.Schema({
  singleton: { type: Boolean, default: true, unique: true },
  heroSection: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    bgImage: { type: String, default: '' }
  },
  coreValuesSection: {
    heading: { type: String, default: 'Our Core Values' },
    description: { type: String, default: 'Fostering Growth and Success for Our Customers and Employees' },
    values: [{
      title: { type: String, default: '' },
      desc: { type: String, default: '' },
      _id: false
    }]
  },
  opportunitiesSection: {
    heading: { type: String, default: 'Check out our latest opportunities' }
  },
  applicationSection: {
    heading: { type: String, default: 'Apply for this position' },
    description: { type: String, default: 'Interested in this role? Click the button below to submit your application through our official careers portal. We look forward to hearing from you!' }
  },
  selectedFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'DynamicForm', default: null },
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    focusKeyword: { type: String, default: '' },
    ogImage: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('CareersPage', CareersPageSchema);
