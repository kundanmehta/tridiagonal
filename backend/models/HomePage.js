const mongoose = require('mongoose');

const HomePageSchema = new mongoose.Schema({
  // Only one document should exist for Home Page Data
  singleton: { type: Boolean, default: true, unique: true },
  
  hero: {
    titleLine1: { type: String, default: "Process Consulting and" },
    titleLine2: { type: String, default: "Technology Solutions" },
    description: { type: String, default: "We deliver 'Value' by leveraging advanced technologies to address process related challenges." },
    ctaText: { type: String, default: "LEARN MORE" },
    ctaLink: { type: String, default: "#services" },
    videoUrl: { type: String, default: "/hubfs/home-hero-video-1.mp4" },
  },
  
  serviceCards: [{
    num: String,
    title: String,
    desc: String,
    href: String,
    bg: String,
  }],
  
  serviceCta: {
    text: { type: String, default: "To know more about our practice areas, contact us today!" },
    buttonText: { type: String, default: "Contact Us" },
    buttonLink: { type: String, default: "/contact-us" },
  },
  
  whoWeAreCards: [{
    title: String,
    desc: String,
    backgroundImage: String,
    buttonText: String,
    buttonLink: String,
  }],

  workOnCards: [{
    title: String,
    desc: String,
    icon: String,
    bg: String,
    href: String,
  }],

  brandIdentity: {
    title: { type: String, default: "Unveiling Our New\nBrand Identity" },
    description: { type: String, default: "Welcome To Tridiagonal Solutions Fresh look! Check out our journey of delivering process excellence." },
    logoImage: { type: String, default: "/hubfs/old_new_tridiagonal.webp" },
    ctaText: { type: String, default: "READ MORE" },
    ctaLink: { type: String, default: "/events/tridiagonal-solutions-new-identity" },
    thumbnailImage: { type: String, default: "/hubfs/Capture-1.webp" },
    modalVideoUrl: { type: String, default: "/hubfs/brand_video.mp4" },
  },

  keyHighlights: {
    title: { type: String, default: "Key Highlights" },
    description: { type: String, default: "16+ years process consulting experience using advanced technologies" },
    ctaText: { type: String, default: "ABOUT US" },
    ctaLink: { type: String, default: "/about-us" },
    counters: [{
      value: Number,
      suffix: String,
      label: String,
    }],
  },

  useCasesSection: {
    title: { type: String, default: "Use Cases" },
    description: { type: String, default: "Despite of ever-evolving industries and complex value chains, digital engineering and experimental methods remain key to solving design, operational, and scale-up challenges. The following use cases highlight the application of Advanced Modeling & Simulation and Experimental Lab Scale-up in solving critical problems across diverse domains." },
    ctaText: { type: String, default: "VIEW ALL USE CASES" },
    ctaLink: { type: String, default: "/use-cases" },
    cards: [{
      title: String,
      image: String,
      customGradient: String,
      href: String,
      isCaseStudy: { type: Boolean, default: false }
    }],
  },

  resourceSlides: [{
    typeStr: String, // e.g. "BLOGS", "WEBINARS", "CASE STUDIES" - aliased to avoid 'type' keyword conflicts
    title: String,
    desc: String,
    image: String,
    href: String,
  }],

  clientLogos: [{
    name: String,
    image: String,
  }],

}, { timestamps: true });

// Ensure we only have one Home Page document
HomePageSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existing = await mongoose.models.HomePage.countDocuments();
    if (existing > 0) {
      return next(new Error('You can only create one Home Page document!'));
    }
  }
  next();
});

module.exports = mongoose.models.HomePage || mongoose.model('HomePage', HomePageSchema);
