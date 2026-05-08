const mongoose = require('mongoose');

const FullContentSchema = new mongoose.Schema({
  heading: { type: String, default: '' },
  text: { type: String, default: '' },
  image: { type: String, default: '' },
  bullets: [{ type: String }]
}, { _id: false });

const CapabilitySchema = new mongoose.Schema({
  id: { type: String, required: true },
  slug: { type: String, required: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  desc: { type: String, default: '' },
  img: { type: String, default: '' },
  cta: {
    label: { type: String, default: 'Talk to an Expert' },
    link: { type: String, default: '#contact-us' }
  },
  fullContent: [FullContentSchema]
}, { _id: false });

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },

  // Hero Section
  hero: {
    badge: { type: String, default: '' },
    title: { type: String, default: '' },
    gradientText: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    ctaLabel: { type: String, default: 'Talk to an Expert' },
    brochureLink: { type: String, default: '/resources/brochures' },
    bannerImage: { type: String, default: '' }
  },

  // About Section
  about: {
    heading: { type: String, default: '' },
    body1: { type: String, default: '' },
    body2: { type: String, default: '' },
    image: { type: String, default: '' },
    videoUrl: { type: String, default: '' }
  },

  // Capabilities intro text
  capabilitiesIntro: {
    label: { type: String, default: 'Our Expertise' },
    heading: { type: String, default: 'Our Capabilities' },
    gradientText: { type: String, default: 'Capabilities' },
    description: { type: String, default: '' }
  },

  // Capability cards (each also powers a sub-page)
  capabilities: [CapabilitySchema],

  // Trailing cards in the capabilities grid (Resources, Contact Us etc)
  capabilitiesTrailingCards: [{
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
    href: { type: String, default: '#' },
    btnLabel: { type: String, default: 'View More' },
    background: { type: String, default: '' } // CSS gradient or hex
  }],

  // Industries accordion
  industriesIntro: {
    title: { type: String, default: 'Industries' },
    subtitle: { type: String, default: '' }
  },
  industries: [{
    name: { type: String, default: '' },
    desc: { type: String, default: '' },
    href: { type: String, default: '#' },
    image: { type: String, default: '' }
  }],

  // Why Tridiagonal items
  whyItemsIntro: {
    label: { type: String, default: 'Why Tridiagonal?' },
    heading: { type: String, default: 'Why Choose Us?' },
    description: { type: String, default: '' }
  },
  whyItems: [{
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
    icon: { type: String, default: '' }
  }],

  // Practice Heads / Team
  practiceHeads: [{
    name: { type: String, default: '' },
    role: { type: String, default: '' },
    image: { type: String, default: '' },
    linkedin: { type: String, default: '#' },
    desc: { type: String, default: '' }
  }],

  // Resource slider cards
  heroResourceSlides: [{
    type: { type: String, default: '' },
    title: { type: String, default: '' },
    desc: { type: String, default: '' },
    image: { type: String, default: '' },
    href: { type: String, default: '#' }
  }],

  // Resources Section (Left side + global right side)
  resourcesSection: {
    heading: { type: String, default: 'Resources' },
    description: { type: String, default: 'Explore the best practices and success stories of application of technology in process industry' },
    categories: [{
      label: { type: String, default: '' },
      link: { type: String, default: '#' }
    }],
    allResourcesBtn: {
      label: { type: String, default: 'ALL RESOURCES' },
      link: { type: String, default: '/resources' }
    }
  },

  // SEO
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    focusKeyword: { type: String, default: '' },
    ogImage: { type: String, default: '' }
  },
  
  // Contact Section
  contactSection: {
    heading: { type: String, default: 'Schedule a Call Today!' },
    description: { type: String, default: 'Uncover how our capabilities can propel your organization forward.' },
    formSlug: { type: String, default: 'contact-form' }
  },
  
  // Technology Partners (Marquee)
  technologyPartners: [{
    name: { type: String, default: '' },
    logo: { type: String, default: '' }
  }]
}, { timestamps: true });

module.exports = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
