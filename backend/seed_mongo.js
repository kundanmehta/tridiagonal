require('dotenv').config();
const mongoose = require('mongoose');
const DynamicForm = require('./models/DynamicForm');

const MONGODB_URI = process.env.MONGODB_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    const formFields = [
      { label: 'First Name', name: 'firstName', type: 'text', required: true, width: 'half' },
      { label: 'Last Name', name: 'lastName', type: 'text', required: true, width: 'half' },
      { label: 'Email', name: 'email', type: 'email', required: true, width: 'half' },
      { label: 'Contact Number', name: 'contactNumber', type: 'tel', required: true, width: 'half' },
      { label: 'Job title', name: 'jobTitle', type: 'text', required: false, width: 'half' },
      { label: 'Company Name', name: 'companyName', type: 'text', required: true, width: 'half' },
      { label: 'Industry', name: 'industry', type: 'select', required: false, width: 'full', options: ['Oil & Gas', 'Pharma & Medical Devices', 'Metals, Mining & Cement', 'Food, Beverages & CPG', 'Chemicals & Petrochemicals', 'Power & Renewables', 'Others'] },
      { label: 'Country', name: 'country', type: 'select', required: false, width: 'full', options: ['India', 'United States', 'United Arab Emirates', 'United Kingdom', 'Germany', 'Other'] },
      { label: 'Services/Technologies', name: 'servicesTechnologies', type: 'select', required: false, width: 'full', options: ['CFD', 'FEA', 'DEM', 'FSI', 'Digital Twin', 'Flow Assurance Testing', 'Erosion & Corrosion Testing', 'Tridiagonal.ai', 'Partner Solutions'] },
      { label: 'Message Box', name: 'message', type: 'textarea', required: false, width: 'full' }
    ];

    let form = await DynamicForm.findOne({ slug: 'contact-us' });
    if (form) {
      console.log('Form exists, updating fields...');
      form.fields = formFields;
      form.consentText = 'I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <a href="/privacy-policy" style="color: #00AEEF; text-decoration: underline;">privacy policy</a>';
      await form.save();
    } else {
      console.log('Form does not exist, creating...');
      form = new DynamicForm({
        name: 'Contact Us',
        slug: 'contact-us',
        adminEmail: 'info@tridiagonal.com',
        submitButtonText: 'Submit',
        consentText: 'I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <a href="/privacy-policy" style="color: #00AEEF; text-decoration: underline;">privacy policy</a>',
        fields: formFields
      });
      await form.save();
    }
    
    console.log('Contact Us form successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seed();
