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
  selectedFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'DynamicForm', default: null }
}, { timestamps: true });

module.exports = mongoose.model('CareersPage', CareersPageSchema);
