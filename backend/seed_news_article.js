require('dotenv').config();
const mongoose = require('mongoose');
const News = require('./models/News');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal';

const newsArticle = {
  title: 'Tridiagonal Solutions Unveils New Brand Identity',
  slug: 'tridiagonal-unveils-new-brand-identity',
  date: new Date('2024-06-08'),
  type: 'News',
  description: 'Tridiagonal Solutions is thrilled to announce the launch of our new logo and tagline, "Delivering Process Excellence," marking a refreshing change in our brand identity.',
  sections: [
    {
      type: 'heading',
      level: 3,
      value: 'Brand Identity Evolves to Reflect the Company’s Innovative Spirit'
    },
    {
      type: 'text',
      value: '<p>Tridiagonal Solutions is thrilled to announce the launch of our new logo and tagline, "Delivering Process Excellence," marking a refreshing change in our brand identity.</p>'
    },
    {
      type: 'text',
      value: '<p>As we evolve, so do the needs of our customers. Tridiagonal Solutions has always been committed to staying ahead of the curve, anticipating market shifts, and adapting to meet the evolving demands of our clients. Our new logo and tagline signify our dedication to continuously delivering excellence in every aspect of our work.</p>'
    },
    {
      type: 'heading',
      level: 4,
      value: 'Here are glimpses from our new logo unveiling event'
    },
    {
      type: 'image',
      image: '/hubfs/Capture-1.webp',
      caption: 'Our team celebrating the new brand identity launch.'
    },
    {
      type: 'text',
      value: '<p>In today\'s dynamic business landscape, collaboration is key to success. Tridiagonal Solutions recognizes the importance of partnerships in driving innovation and delivering value to our clients. We have cultivated a robust partnership ecosystem comprising industry leaders, technology providers, and domain experts. Through strategic collaborations, we leverage collective expertise and resources to offer comprehensive solutions that address the complex challenges faced by our clients.</p>'
    },
    {
      type: 'quote',
      value: 'Our partnership ecosystem is integral to our success. By collaborating with industry experts and technology providers, we enhance our capabilities and deliver innovative solutions that drive tangible results for our clients.',
      caption: 'Pravin Jain, CEO and Chairman at Tridiagonal Solutions'
    },
    {
      type: 'text',
      value: '<p>Tridiagonal Solutions is committed to fostering strong and mutually beneficial partnerships that enable us to deliver exceptional value to our clients. Our new logo represents our commitment to excellence, innovation, and collaborative partnerships as we continue to evolve and meet the evolving needs of our customers.</p>'
    }
  ],
  isActive: true
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Remove existing if any
    await News.findOneAndDelete({ slug: newsArticle.slug });
    
    await News.create(newsArticle);
    console.log('Seeded News Article successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
