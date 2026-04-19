require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal';

const DynamicForm = require('./models/DynamicForm');
const CareersPage = require('./models/CareersPage');

const CAREERS_FORM = {
  name: 'Career Application',
  slug: 'career-application',
  adminEmail: 'hr@tridiagonal.com',
  submitButtonText: 'Submit Application',
  consentText: "I confirm that the information provided is accurate and I consent to Tridiagonal Solutions processing my personal data for recruitment purposes. Read our <a href='/privacy-policy' style='color: var(--color-teal); text-decoration: underline'>privacy policy</a>.",
  isActive: true,
  fields: [
    // Row 1: Name (half) + Email (half)
    {
      label: 'Full Name',
      name: 'fullName',
      type: 'text',
      required: true,
      placeholder: 'e.g. John Doe',
      width: 'half',
    },
    {
      label: 'Email Address',
      name: 'email',
      type: 'email',
      required: true,
      placeholder: 'john@example.com',
      width: 'half',
    },
    // Row 2: Phone (half) + LinkedIn (half)
    {
      label: 'Phone Number',
      name: 'phone',
      type: 'tel',
      required: true,
      placeholder: '+91 98765 43210',
      width: 'half',
    },
    {
      label: 'LinkedIn / Portfolio URL',
      name: 'linkedinUrl',
      type: 'text',
      required: false,
      placeholder: 'https://linkedin.com/in/yourprofile',
      width: 'half',
    },
    // Row 3: Current Company (half) + Current Role (half)
    {
      label: 'Current Company',
      name: 'currentCompany',
      type: 'text',
      required: false,
      placeholder: 'Where do you currently work?',
      width: 'half',
    },
    {
      label: 'Current Role / Designation',
      name: 'currentRole',
      type: 'text',
      required: false,
      placeholder: 'e.g. Project Engineer',
      width: 'half',
    },
    // Row 4: Total Experience (half) + Notice Period (half)
    {
      label: 'Total Years of Experience',
      name: 'totalExperience',
      type: 'select',
      required: true,
      width: 'half',
      options: [
        'Fresher / Student',
        'Less than 1 year',
        '1 – 3 years',
        '3 – 5 years',
        '5 – 8 years',
        '8 – 12 years',
        '12+ years',
      ],
    },
    {
      label: 'Notice Period',
      name: 'noticePeriod',
      type: 'select',
      required: false,
      width: 'half',
      options: [
        'Immediately Available',
        '15 days',
        '30 days',
        '45 days',
        '60 days',
        '90 days',
        'More than 90 days',
      ],
    },
    // Row 5: Highest Education (full)
    {
      label: 'Highest Qualification',
      name: 'qualification',
      type: 'select',
      required: true,
      width: 'full',
      options: [
        'B.E / B.Tech',
        'M.E / M.Tech',
        'M.Sc',
        'MBA',
        'Ph.D',
        'Diploma',
        'Other',
      ],
    },
    // Row 6: Area of Expertise (full)
    {
      label: 'Area of Expertise',
      name: 'expertise',
      type: 'select',
      required: true,
      width: 'full',
      options: [
        'Computational Fluid Dynamics (CFD)',
        'Finite Element Analysis (FEA)',
        'Discrete Element Method (DEM)',
        'Experimental Fluid Dynamics (EFD)',
        'Data Science / AI / ML',
        'Process Engineering',
        'Digital Transformation',
        'HR & Operations',
        'Finance & Accounts',
        'Other',
      ],
    },
    // Row 7: Cover Letter / Why Tridiagonal (full)
    {
      label: 'Cover Letter / Why do you want to join Tridiagonal?',
      name: 'coverLetter',
      type: 'textarea',
      required: false,
      placeholder: "Tell us about yourself and why you're excited about this opportunity...",
      width: 'full',
    },
    // Row 8: Resume Upload (full)
    {
      label: 'Upload Resume (PDF, DOC, DOCX)',
      name: 'resume',
      type: 'file',
      required: true,
      width: 'full',
    },
  ],
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Upsert the form
    const form = await DynamicForm.findOneAndUpdate(
      { slug: 'career-application' },
      CAREERS_FORM,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`  ✓ Form created/updated: "${form.name}" (ID: ${form._id})`);

    // Auto-link this form to the CareersPage singleton
    await CareersPage.findOneAndUpdate(
      { singleton: true },
      { $set: { selectedFormId: form._id } },
      { upsert: true, new: true }
    );
    console.log('  ✓ Form auto-linked to CareersPage');

    console.log('\n✅ Career Application form seeded and linked!');
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
