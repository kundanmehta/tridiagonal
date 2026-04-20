require('dotenv').config();
const mongoose = require('mongoose');
const Resource = require('./models/Resource');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal';

const sampleResources = [
    {
        title: 'Fluid Structure Interaction Analysis (FSI): Maximizing Efficiency',
        slug: 'fsi-efficiency',
        resourceType: 'Blog',
        category: 'Engineering',
        excerpt: 'In the fast-paced industrial landscape, the challenges faced by sectors such as oil and gas...',
        content: '<p>Detailed content about FSI analysis...</p>',
        coverImage: '/hubfs/CFD FEA Coupled-1.png',
        industry: 'Oil & Gas',
        date: new Date('2023-10-12')
    },
    {
        title: 'Reducing Erosion in Subsea Pipelines',
        slug: 'reducing-erosion-subsea',
        resourceType: 'Case Study',
        industry: 'Oil & Gas',
        service: 'Advanced Modeling & Simulation',
        excerpt: 'Detailed CFD analysis of sand erosion inside subsea tie-backs leading to a 30% reduction in pipe wear.',
        content: '<p>Detailed case study content...</p>',
        coverImage: '/hubfs/Digital Twin.jpg',
        date: new Date('2023-12-02')
    },
    {
        title: 'Advanced Computational Fluid Dynamics Services Overview',
        slug: 'cfd-services-overview',
        resourceType: 'Brochure',
        industry: 'Oil & Gas',
        service: 'Advanced Modeling & Simulation',
        excerpt: 'Comprehensive overview of our CFD consulting solutions.',
        coverImage: '/hubfs/Digital Twin.jpg',
        fileUrl: '/uploads/brochures/cfd-overview.pdf',
        date: new Date('2023-12-15')
    },
    {
        title: 'System and Method for Online Prediction of Slab Defects in Continuous Casting',
        slug: 'continuous-casting-patent',
        resourceType: 'Publication',
        author: 'Tridiagonal Solutions Inc.',
        category: 'Patent',
        excerpt: 'Proprietary technology for defect prediction.',
        externalUrl: 'https://patents.google.com/',
        date: new Date('2024-08-21')
    }
];

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB for seeding Resources...');
        await Resource.deleteMany({});
        await Resource.insertMany(sampleResources);
        console.log('✅ Resources seeded successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error seeding resources:', err);
        process.exit(1);
    });
