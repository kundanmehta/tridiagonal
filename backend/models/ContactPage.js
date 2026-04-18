const mongoose = require('mongoose');

const ContactPageSchema = new mongoose.Schema({
  singleton: { type: Boolean, default: true, unique: true },

  heroSection: {
    title: { type: String, default: 'Here To Help' },
    description: { type: String, default: 'Reach out to our experts today.' }
  },

  infoCards: [{
    iconSvg: { type: String, default: '' }, // Raw SVG string
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    link: { type: String, default: '' }
  }],

  selectedFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'DynamicForm', default: null },

  officesSection: {
    heading: { type: String, default: 'Our Global Offices' },
    description: { type: String, default: 'Tridiagonal Solutions scales with you across the globe.' },
    offices: [{
      region: { type: String, default: '' },
      flagImage: { type: String, default: '' },
      companyName: { type: String, default: '' },
      addresses: [{
        label: { type: String, default: '' },
        text: { type: String, default: '' }
      }],
      contacts: [{
        type: { type: String, enum: ['phone', 'fax', 'email', 'sales', 'admin'], default: 'phone' },
        label: { type: String, default: '' },
        value: { type: String, default: '' }
      }]
    }]
  },

  ctaSection: {
    heading: { type: String, default: 'Seeking to thrive in your professional life?' },
    buttonText: { type: String, default: 'CHECK OUT OUR OPEN POSITIONS' },
    buttonLink: { type: String, default: '/careers' },
    backgroundImage: { type: String, default: '/hubfs/topography-bg.webp' }
  }

}, { timestamps: true });

module.exports = mongoose.models.ContactPage || mongoose.model('ContactPage', ContactPageSchema);
