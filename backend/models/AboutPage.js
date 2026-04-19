const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  desc: { type: String, required: true }
}, { _id: false });

const TimelineSchema = new mongoose.Schema({
  year: { type: String, required: true },
  text: { type: String, required: true }
}, { _id: false });

const CredentialSchema = new mongoose.Schema({
  num: { type: String, required: true },
  text: { type: String, required: true }
}, { _id: false });

const GlanceCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, default: '' }
}, { _id: false });

const AboutPageSchema = new mongoose.Schema({
  singleton: { type: Boolean, default: true, unique: true },

  heroSection: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    bgImage: { type: String, default: '' }
  },

  introSection: {
    paragraphs: [{ type: String }],
    credentials: [CredentialSchema]
  },

  atAGlanceSection: {
    heading: { type: String, default: '' },
    cards: [GlanceCardSchema]
  },

  leadershipSection: {
    heading: { type: String, default: '' },
    description: { type: String, default: '' },
    members: [MemberSchema]
  },

  coreTeamSection: {
    heading: { type: String, default: '' },
    description: { type: String, default: '' },
    members: [MemberSchema]
  },

  timelineSection: {
    heading: { type: String, default: '' },
    events: [TimelineSchema]
  },

  ctaSection: {
    heading: { type: String, default: '' },
    description: { type: String, default: '' },
    buttonText: { type: String, default: '' },
    buttonLink: { type: String, default: '' },
    bgImage: { type: String, default: '' }
  }

}, { timestamps: true });

module.exports = mongoose.models.AboutPage || mongoose.model('AboutPage', AboutPageSchema);
