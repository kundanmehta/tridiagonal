require('dotenv').config();
const mongoose = require('mongoose');
const Webinar = require('./models/Webinar');
const News = require('./models/News');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal';

const webinarData = [
  {
    slug: 'future-of-cement-manufacturing',
    title: 'The Future of Cement Manufacturing: Simulate, Optimize, Excel',
    eventDate: new Date('2025-11-17'),
    description: 'In today’s rapidly evolving industrial landscape, the cement industry faces increasing pressure to enhance efficiency, reduce emissions, and improve process reliability — all while maintaining profitability.',
    content: [
      'In today’s rapidly evolving industrial landscape, the cement industry faces increasing pressure to enhance efficiency, reduce emissions, and improve process reliability — all while maintaining profitability. Achieving this balance requires more than traditional process control methods; it demands smarter tools and forward-thinking strategies.',
      'Simulation technology is proving to be a game-changer. From optimizing raw material blending and kiln operations to energy usage and emissions reduction, simulation enables cement manufacturers to gain deep insights into complex systems — before changes are implemented in the real world.',
      'This webinar, "The Future of Cement Manufacturing: Simulate, Optimize, Excel," will explore how advanced simulation tools are transforming the cement manufacturing process.'
    ],
    learnPoints: [
      'How simulation supports optimization in cement production',
      'Real-life examples of operational gains achieved through virtual modeling',
      'The role of simulation in sustainability and energy efficiency',
      'Steps to avail advantage of the simulation'
    ],
    attendees: [
      'Process Managers in the Cement Industry',
      'Mechanical and CFD Engineers',
      'Design and Analysis Professionals',
      'Engineering Consultants'
    ],
    presenter: {
      name: 'Mr. Harinarayanan Nagarajan',
      title: 'Project Manager - CFD Consulting',
      company: 'Tridiagonal Solutions'
    },
    duration: '60 mins',
    type: 'On-Demand'
  },
  {
    slug: 'sand-transportation-esp-assisted-wells',
    title: 'Sand Transportation for Extending Life of ESP-Assisted Wells',
    eventDate: new Date('2025-07-28'),
    description: 'Sand production remains one of the most persistent challenges in artificial lift operations, often leading to reduced Electric Submersible Pump (ESP) performance and premature equipment failure.',
    content: ['This session will dive deep into the critical aspects of sand transport, including how tubing size and flow velocity impact sand behavior in the wellbore. Backed by experimental findings and OLGA modeling.'],
    type: 'On-Demand'
  },
  {
    slug: 'fea-structural-integrity-oil-gas',
    title: 'Finite Element Analysis (FEA) to Ensure Structural Integrity of Oil and Gas Assets',
    eventDate: new Date('2025-07-10'),
    description: 'The high-stakes oil and gas sector prioritizes maintaining the structural integrity of equipment and infrastructure. This webinar explores the application of Finite Element Analysis (FEA) to predict and improve the performance of critical components.',
    content: ['Predict and improve the performance of critical components, ensuring safety, compliance, and operational efficiency.'],
    type: 'On-Demand'
  },
  {
    slug: 'cfd-modeling-separator-performance',
    title: 'CFD Modeling to Improve Separator Performance',
    eventDate: new Date('2025-06-06'),
    description: 'In the oil and gas industry, separation processes are essential for separating and purifying hydrocarbons and other components from raw crude oil and natural gas streams.',
    content: ['The primary purpose of a separator is to separate a mixture of different phases, such as liquids, gases, and solids, into distinct phases.'],
    type: 'On-Demand'
  },
  {
    slug: 'cfd-dem-catalyst-particles',
    title: 'CFD-DEM applied to Catalyst-Particles in Packed Bed Reactors or Columns | Webinar',
    eventDate: new Date('2025-04-24'),
    description: 'Introduction: The shape, size and packing of catalyst particles plays significant role in the performance of packed bed columns or reactors.',
    content: ['The resolved-particle CFD simulations are digital replica of real setup with deeper details.'],
    type: 'On-Demand'
  }
];

const newsData = [
  {
    slug: 'tridiagonal-unveils-new-brand-identity',
    title: 'Tridiagonal Solutions Unveils New Brand Identity',
    date: new Date('2024-06-08'),
    type: 'News',
    description: 'Brand Identity Evolves to Reflect the Company’s Innovative Spirit Tridiagonal Solutions is thrilled to announce the launch of our new logo and tagline, "Delivering Process Excellence," marking a refreshing change in our brand identity.',
    content: [
      'Tridiagonal Solutions is thrilled to announce the launch of our new logo and tagline, "Delivering Process Excellence," marking a refreshing change in our brand identity.',
      'This evolution reflects our commitment to innovation and providing superior value to our global clients.'
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clean existing
    await Webinar.deleteMany({});
    await News.deleteMany({});

    // Insert Webinars
    for (const item of webinarData) {
      await Webinar.create(item);
    }
    console.log(`Seeded ${webinarData.length} webinars`);

    // Insert News
    for (const item of newsData) {
      await News.create(item);
    }
    console.log(`Seeded ${newsData.length} news items`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
