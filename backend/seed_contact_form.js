require('dotenv').config();
const mongoose = require('mongoose');
const DynamicForm = require('./models/DynamicForm');

const seed = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Delete existing forms for a fresh start
    await DynamicForm.deleteMany({});
    console.log('Cleaned up existing forms.');

    const formFields = [
      { label: 'First Name', name: 'firstName', type: 'text', required: true, width: 'half' },
      { label: 'Last Name', name: 'lastName', type: 'text', required: true, width: 'half' },
      { label: 'Email', name: 'email', type: 'email', required: true, width: 'half' },
      { label: 'Contact Number', name: 'contactNumber', type: 'tel', required: true, width: 'half' },
      { label: 'Job title', name: 'jobTitle', type: 'text', required: false, width: 'half' },
      { label: 'Company Name', name: 'companyName', type: 'text', required: true, width: 'half' },
      { label: 'Industry', name: 'industry', type: 'select', required: false, width: 'full', options: ['Please Select', 'Oil & Gas', 'Pharma & Medical Devices', 'Metals, Mining & Cement', 'Food, Beverages & CPG', 'Chemicals & Petrochemicals', 'Power & Renewables', 'Others'] },
      { label: 'Country', name: 'country', type: 'select', required: false, width: 'full', options: ['Please Select', 'India', 'United States', 'United Arab Emirates', 'United Kingdom', 'Germany', 'Other'] },
      { label: 'Services/Technologies', name: 'servicesTechnologies', type: 'select', required: false, width: 'full', options: ['Please Select', 'CFD', 'FEA', 'DEM', 'FSI', 'Digital Twin', 'Flow Assurance Testing', 'Erosion & Corrosion Testing', 'Tridiagonal.ai', 'Partner Solutions'] },
      { label: 'Message Box', name: 'message', type: 'textarea', required: false, width: 'full' }
    ];

    const form = new DynamicForm({
      name: 'Contact Us',
      slug: 'contact-us',
      adminEmail: 'info@tridiagonal.com',
      submitButtonText: 'Submit',
      consentText: 'I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <a href="/privacy-policy" style="color: var(--color-teal); text-decoration: underline;">privacy policy</a>',
      fields: formFields
    });
    
    await form.save();
    console.log('Contact Us form created successfully!');

    // Link it to the Contact Page CMS
    const ContactPage = require('./models/ContactPage');
    let cp = await ContactPage.findOne({ singleton: true });
    if (!cp) {
      cp = new ContactPage({ singleton: true });
    }
    cp.selectedFormId = form._id;
    await cp.save();
    console.log('Linked to Contact Page CMS.');

    process.exit(0);
  } catch (err) {
    console.error('Seed Error:', err);
    process.exit(1);
  }
};

seed();
