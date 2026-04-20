require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal';
const DynamicForm = require('./models/DynamicForm');

const WEBINAR_FORM = {
  name: 'Webinar Registration',
  slug: 'webinar-registration',
  adminEmail: 'info@tridiagonal.com',
  submitButtonText: 'Register Now',
  consentText: "I agree to receive communications regarding Tridiagonal products. Read our <a href='/privacy-policy' style='color: #43bd94; text-decoration: underline'>privacy policy</a>",
  isActive: true,
  fields: [
    { label: 'First Name', name: 'firstName', type: 'text', required: true, width: 'half' },
    { label: 'Last Name', name: 'lastName', type: 'text', required: true, width: 'half' },
    { label: 'Email Address', name: 'email', type: 'email', required: true, width: 'full' },
    { label: 'Job title', name: 'jobTitle', type: 'text', required: true, width: 'full' },
    { label: 'Company name', name: 'companyName', type: 'text', required: true, width: 'full' },
    { label: 'Phone number', name: 'phone', type: 'tel', required: false, width: 'full', placeholder: '+91 ...' },
    { label: 'Country', name: 'country', type: 'select', required: true, width: 'full', options: ['India', 'United States', 'United Kingdom', 'Germany', 'United Arab Emirates', 'Other'] },
  ],
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const form = await DynamicForm.findOneAndUpdate(
      { slug: 'webinar-registration' },
      WEBINAR_FORM,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`✅ Form created/updated: "${form.name}" (ID: ${form._id}, Slug: ${form.slug})`);

  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
