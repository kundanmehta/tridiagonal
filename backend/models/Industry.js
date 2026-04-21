const mongoose = require('mongoose');

const ServiceAreaSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: false },
  hero: {
    bgImage: String,
    title: String,
    desc: String,
  },
  intro: {
    badge: String,
    heading: String,
    paragraphs: [String],
    image: String,
  },
  mainBody: {
    title: String,
    badge: String,
    desc: String,
    cards: [{
      title: String,
      desc: String,
      image: String,
      ctaText: { type: String, default: 'VIEW MORE' },
      link: String,
    }]
  },
  showcase: {
    enabled: { type: Boolean, default: false },
    title: String,
    desc: String,
    cards: [{
      title: String,
      image: String,
      isCaseStudy: { type: Boolean, default: false },
      gradient: String,
    }]
  },
  whyChooseUs: {
    title: String,
    items: [{
      title: String,
      desc: String,
      icon: String,
    }]
  },
  industriesSection: {
    enabled: { type: Boolean, default: true },
    title: { type: String, default: 'Industries' },
    subtitle: { type: String, default: 'Your Trusted Partner in Modeling & Simulation.' }
  },
  modals: [{
    capabilityName: String,
    mainTitle: String,
    overview: String,
    image: String,
    tools: [String],
    technicalSections: [{
      title: String,
      subtitle: String,
      content: String,
    }]
  }]
}, { _id: false });

const IndustrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  overview: { type: String, required: true },
  servicesMapping: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  heroImage: { type: String },

  // New CMS fields for Industry Sub-Pages
  modelingSimulation: { type: ServiceAreaSchema, default: () => ({}) },
  techValidation: { type: ServiceAreaSchema, default: () => ({}) },

  seo: {
    metaTitle: String,
    metaDescription: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Industry', IndustrySchema);
