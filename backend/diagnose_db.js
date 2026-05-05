const mongoose = require('mongoose');
const FormSubmission = require('./models/FormSubmission');
const DynamicForm = require('./models/DynamicForm');
const Contact = require('./models/Contact');
require('dotenv').config();

async function diagnose() {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const subCount = await FormSubmission.countDocuments();
    const contactCount = await Contact.countDocuments();
    const formCount = await DynamicForm.countDocuments();

    console.log(`Submissions: ${subCount}`);
    console.log(`Contacts: ${contactCount}`);
    console.log(`Dynamic Forms: ${formCount}`);

    const latestSubs = await FormSubmission.find().sort({ createdAt: -1 }).limit(10);
    console.log('\n--- Latest Form Submissions ---');
    latestSubs.forEach(s => {
      console.log(`ID: ${s._id}, Name: "${s.formName}", Created: ${s.createdAt}`);
      console.log(`Data: ${JSON.stringify(s.data)}`);
    });

    const forms = await DynamicForm.find();
    console.log('\n--- Available Dynamic Forms ---');
    forms.forEach(f => {
      console.log(`Name: "${f.name}", ID: ${f._id}`);
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

diagnose();
