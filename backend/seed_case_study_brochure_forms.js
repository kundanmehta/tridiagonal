const mongoose = require('mongoose');
const dotenv = require('dotenv');
const DynamicForm = require('./models/DynamicForm');

// Load env vars
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal';

const seedForms = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Form Builder Seed ...');

        const countryOptions = ['India', 'United States', 'United Arab Emirates', 'United Kingdom', 'Germany', 'Other'];

        // 1. Case Study Form
        const caseStudyForm = {
            name: 'Case Study',
            slug: 'case-study',
            adminEmail: 'info@tridiagonal.com',
            submitButtonText: 'Submit',
            consentText: "I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <a href='/privacy-policy' style='color: var(--color-teal); text-decoration: underline'>privacy policy</a>",
            fields: [
                { label: 'First Name*', name: 'firstName', type: 'text', required: true, width: 'half', placeholder: 'First Name' },
                { label: 'Last Name*', name: 'lastName', type: 'text', required: true, width: 'half', placeholder: 'Last Name' },
                { label: 'Email*', name: 'email', type: 'email', required: true, width: 'full', placeholder: 'Corporate Email ID' },
                { label: 'Company*', name: 'company', type: 'text', required: true, width: 'full', placeholder: 'Company Name' },
                { label: 'Phone Number', name: 'phone', type: 'tel', required: false, width: 'full', placeholder: 'Phone Number' },
                { label: 'Country*', name: 'country', type: 'select', required: true, width: 'full', options: countryOptions, placeholder: 'Please Select' }
            ]
        };

        // 2. Brochure Form
        const brochureForm = {
            name: 'Brochure',
            slug: 'brochure',
            adminEmail: 'info@tridiagonal.com',
            submitButtonText: 'Download',
            consentText: "I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <a href='/privacy-policy' style='color: var(--color-teal); text-decoration: underline'>privacy policy</a>",
            fields: [
                { label: 'First Name*', name: 'firstName', type: 'text', required: true, width: 'half', placeholder: 'First Name' },
                { label: 'Last Name*', name: 'lastName', type: 'text', required: true, width: 'half', placeholder: 'Last Name' },
                { label: 'Email*', name: 'email', type: 'email', required: true, width: 'full', placeholder: 'Corporate Email ID' },
                { label: 'Company*', name: 'company', type: 'text', required: true, width: 'full', placeholder: 'Company Name' },
                { label: 'Phone Number', name: 'phone', type: 'tel', required: false, width: 'full', placeholder: 'Phone Number' },
                { label: 'Country*', name: 'country', type: 'select', required: true, width: 'full', options: countryOptions, placeholder: 'Please Select' }
            ]
        };

        await DynamicForm.findOneAndUpdate({ slug: 'case-study' }, caseStudyForm, { upsert: true, new: true });
        console.log('✅ Case Study Form Seeded');

        await DynamicForm.findOneAndUpdate({ slug: 'brochure' }, brochureForm, { upsert: true, new: true });
        console.log('✅ Brochure Form Seeded');

        process.exit(0);
    } catch (error) {
        console.error('❌ SEED ERROR:', error);
        process.exit(1);
    }
};

seedForms();
