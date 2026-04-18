const mongoose = require('mongoose');
const dotenv = require('dotenv');
const DynamicForm = require('./models/DynamicForm');
const ContactPage = require('./models/ContactPage');

// Load env vars
dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Form Builder Seed ...');

    // 1. Create Contact Us Form
    let form = await DynamicForm.findOne({ slug: 'contact-us' });
    if (!form) {
      form = new DynamicForm({
        name: 'Contact Us',
        slug: 'contact-us',
        adminEmail: 'info@tridiagonal.com',
        submitButtonText: 'Submit',
        consentText: 'I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <a href=\'/privacy-policy\' style=\'color: var(--color-teal); text-decoration: underline\'>privacy policy</a>',
        fields: [
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
        ]
      });
      await form.save();
      console.log('✅ Contact Us Form Created');
    } else {
      console.log('ℹ️ Contact Us Form already exists');
    }

    // 2. Assign Form to ContactPage CMS
    const cPage = await ContactPage.findOne({ singleton: true }) || new ContactPage({ singleton: true });
    cPage.selectedFormId = form._id;
    await cPage.save();
    console.log('✅ Assigned form to Contact Page');

    process.exit(0);
  } catch (error) {
    console.error('❌ SEED ERROR:', error);
    process.exit(1);
  }
};

seed();
