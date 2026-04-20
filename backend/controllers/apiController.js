const mongoose = require('mongoose');
const Resource = require('../models/Resource');
const Category = require('../models/Category');
const Service = require('../models/Service');
const Industry = require('../models/Industry');

exports.getPages = async (req, res) => {
  res.json({ message: 'Success', data: [] });
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ title: 1 });
    res.json({ message: 'Success', data: services });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Success', data: service });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
};

exports.getIndustries = async (req, res) => {
  try {
    const industries = await Industry.find().sort({ title: 1 });
    res.json({ message: 'Success', data: industries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch industries' });
  }
};

exports.getIndustryBySlug = async (req, res) => {
  try {
    const industry = await Industry.findOne({ slug: req.params.slug });
    if (!industry) return res.status(404).json({ error: 'Industry not found' });
    res.json({ message: 'Success', data: industry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch industry' });
  }
};


exports.getResources = async (req, res) => {
  try {
    const { type, industry, service } = req.query;
    const filter = { isActive: true };
    if (type) filter.resourceType = type;
    if (industry && industry !== 'All') filter.industry = industry;
    if (service && service !== 'All') filter.service = service;

    const resources = await Resource.find(filter).populate('selectedFormId').sort({ date: -1 });
    res.json({ message: 'Success', data: resources });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};

exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('selectedFormId').sort({ createdAt: -1 });
    res.json({ message: 'Success', data: resources });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all resources' });
  }
};

exports.getResourceBySlug = async (req, res) => {
  try {
    const resource = await Resource.findOne({ slug: req.params.slug }).populate('selectedFormId');
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.json({ message: 'Success', data: resource });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
};

exports.createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json({ message: 'Resource created successfully', data: resource });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create resource' });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.json({ message: 'Resource updated successfully', data: resource });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update resource' });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({ slug: req.params.slug });
    if (!resource) return res.status(404).json({ error: 'Resource not found' });
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resource' });
  }
};

exports.getBlogs = async (req, res) => {
  req.query.type = 'Blog';
  return exports.getResources(req, res);
};

exports.getEvents = async (req, res) => {
  res.json({ message: 'Success', data: [] });
};

exports.getCareers = async (req, res) => {
  res.json({ message: 'Success', data: [] });
};

const Contact = require('../models/Contact');
const WebinarRegistration = require('../models/WebinarRegistration');
const News = require('../models/News');
const Webinar = require('../models/Webinar');

exports.submitContact = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;
    const newContact = new Contact({ firstName, lastName, email, message });
    await newContact.save();
    console.log('Contact form safely stored in Database:', newContact._id);
    res.json({ message: 'Successfully received message' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
};

// GET /api/contacts — Admin: list all contact submissions
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ data: contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

const HomePage = require('../models/HomePage');

// GET /api/homepage — Fetch HomePage Data
exports.getHomePage = async (req, res) => {
  try {
    const data = await HomePage.findOne().lean(); // Use lean for easier manipulation

    if (data && data.useCasesSection) {
      if (data.useCasesSection.displayMode === 'latest') {
        const latestResources = await Resource.find({ resourceType: 'Case Study' })
          .sort({ createdAt: -1 })
          .limit(data.useCasesSection.latestCount || 4)
          .lean();

        data.useCasesSection.cards = latestResources.map(r => ({
          title: r.title,
          image: r.coverImage,
          href: `/resources/case-studies/${r.slug}`,
          isCaseStudy: true
        }));
      } else if (data.useCasesSection.displayMode === 'manual' && data.useCasesSection.manualSelectedCards?.length > 0) {
        const selectedResources = await Resource.find({ _id: { $in: data.useCasesSection.manualSelectedCards } }).lean();
        data.useCasesSection.cards = selectedResources.map(r => ({
          title: r.title,
          image: r.coverImage,
          href: `/resources/case-studies/${r.slug}`,
          isCaseStudy: true
        }));
      }
    }

    if (data && data.resourcesSection) {
      if (data.resourcesSection.displayMode === 'latest') {
        // Fetch latest 1 from each key category
        const categoriesMap = [
          { category: 'Webinar', typeStr: 'WEBINARS' },
          { category: 'Tech Blog', typeStr: 'BLOGS' },
          { category: 'Brochure', typeStr: 'BROCHURE' },
          { category: 'Publication', typeStr: 'PUBLICATIONS' }
        ];

        const fetchedSlides = await Promise.all(categoriesMap.map(async (mapping) => {
          const latest = await Resource.findOne({ category: mapping.category }).sort({ createdAt: -1 }).lean();
          if (latest) {
            return {
              typeStr: mapping.typeStr,
              title: latest.title,
              desc: latest.content ? latest.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...' : '',
              image: latest.coverImage,
              href: `/blogs/${latest.slug}`
            };
          }
          return null;
        }));

        data.resourcesSection.slides = fetchedSlides.filter(s => s !== null);
      } else if (data.resourcesSection.displayMode === 'manual' && data.resourcesSection.manualSlides?.length > 0) {
        const resolvedManual = await Promise.all(data.resourcesSection.manualSlides.map(async (m) => {
          if (!m.blogId) return null;
          const b = await Resource.findById(m.blogId).lean();
          if (b) {
            return {
              typeStr: m.typeStr || 'RESOURCE',
              title: b.title,
              desc: b.content ? b.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...' : '',
              image: b.coverImage,
              href: `/blogs/${b.slug}`
            };
          }
          return null;
        }));
        data.resourcesSection.slides = resolvedManual.filter(s => s !== null);
      }
    }

    res.json({ data: data || {} });
  } catch (error) {
    console.error('Error fetching HomePage:', error);
    res.status(500).json({ error: 'Failed to fetch HomePage config' });
  }
};

// PUT /api/homepage — Update HomePage Data (Protected)
exports.updateHomePage = async (req, res) => {
  try {
    const updateData = req.body;
    // Find the singleton document and update it, creating it if it doesn't exist
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const updated = await HomePage.findOneAndUpdate({ singleton: true }, { $set: updateData }, options);

    res.json({ message: 'HomePage updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating HomePage:', error);
    res.status(500).json({ error: 'Failed to update HomePage config' });
  }
};
// POST /api/upload — Upload a file (Protected)
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Return the relative URL to the file
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ message: 'File uploaded successfully', url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

// POST /api/upload-public — Upload a file (Public)
exports.uploadPublicFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ message: 'File uploaded successfully', url: fileUrl });
  } catch (error) {
    console.error('Error uploading public file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

const PrivacyPolicy = require('../models/PrivacyPolicy');

// GET /api/privacy-policy
exports.getPrivacyPolicy = async (req, res) => {
  try {
    const data = await PrivacyPolicy.findOne();
    res.json({ data: data || {} });
  } catch (error) {
    console.error('Error fetching PrivacyPolicy:', error);
    res.status(500).json({ error: 'Failed to fetch PrivacyPolicy config' });
  }
};

// PUT /api/privacy-policy (Protected)
exports.updatePrivacyPolicy = async (req, res) => {
  try {
    const updateData = req.body;
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const updated = await PrivacyPolicy.findOneAndUpdate({ singleton: true }, { $set: updateData }, options);

    res.json({ message: 'Privacy Policy updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating PrivacyPolicy:', error);
    res.status(500).json({ error: 'Failed to update PrivacyPolicy config' });
  }
};

// ═══════════════════════════════════════════════════════════
// DYNAMIC FORM BUILDER
// ═══════════════════════════════════════════════════════════
const DynamicForm = require('../models/DynamicForm');
const FormSubmission = require('../models/FormSubmission');
const { sendFormNotification } = require('../config/mailer');

// GET /api/forms — List all forms
exports.getDynamicForms = async (req, res) => {
  try {
    const forms = await DynamicForm.find().sort({ createdAt: -1 });
    res.json({ data: forms });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
};

// GET /api/forms/:id — Get single form config
exports.getDynamicFormById = async (req, res) => {
  try {
    const { id } = req.params;
    let form;

    // Check if it's a valid MongoDB ID
    if (mongoose.Types.ObjectId.isValid(id)) {
      form = await DynamicForm.findById(id);
    }

    // If not found by ID (or it wasn't a valid ID), try searching by slug
    if (!form) {
      form = await DynamicForm.findOne({ slug: id });
    }

    if (!form) return res.status(404).json({ error: 'Form not found' });
    res.json({ data: form });
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ error: 'Failed to fetch form' });
  }
};

// POST /api/forms — Create new form (Protected)
exports.createDynamicForm = async (req, res) => {
  try {
    const form = new DynamicForm(req.body);
    await form.save();
    res.json({ message: 'Form created successfully', data: form });
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ error: 'Failed to create form' });
  }
};

// PUT /api/forms/:id — Update form (Protected)
exports.updateDynamicForm = async (req, res) => {
  try {
    const updated = await DynamicForm.findByIdAndUpdate(req.params.id, { $set: req.body }, { returnDocument: 'after' });
    if (!updated) return res.status(404).json({ error: 'Form not found' });
    res.json({ message: 'Form updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ error: 'Failed to update form' });
  }
};

// DELETE /api/forms/:id — Delete form (Protected)
exports.deleteDynamicForm = async (req, res) => {
  try {
    await DynamicForm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ error: 'Failed to delete form' });
  }
};

// POST /api/forms/:id/submit — Public: submit a form
exports.submitDynamicForm = async (req, res) => {
  try {
    const form = await DynamicForm.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Form not found' });

    const submission = new FormSubmission({
      formId: form._id,
      formName: form.name,
      data: req.body
    });
    await submission.save();
    console.log(`✅ Form submission saved: ${form.name} (${submission._id})`);

    // Send email notification (async, don't block response)
    if (form.adminEmail) {
      sendFormNotification(form.adminEmail, form.name, req.body).catch(err => {
        console.error('Email notification failed:', err.message);
      });
    }

    res.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
};

// GET /api/forms/:id/submissions — Admin: list submissions for a form (Protected)
exports.getFormSubmissions = async (req, res) => {
  try {
    const submissions = await FormSubmission.find({ formId: req.params.id }).sort({ createdAt: -1 });
    res.json({ data: submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
};

// ═══════════════════════════════════════════════════════════
// CONTACT PAGE CMS
// ═══════════════════════════════════════════════════════════
const ContactPage = require('../models/ContactPage');

// GET /api/contactpage
exports.getContactPage = async (req, res) => {
  try {
    const data = await ContactPage.findOne().populate('selectedFormId');
    res.json({ data: data || {} });
  } catch (error) {
    console.error('Error fetching ContactPage:', error);
    res.status(500).json({ error: 'Failed to fetch ContactPage config' });
  }
};

// PUT /api/contactpage (Protected)
exports.updateContactPage = async (req, res) => {
  try {
    const updateData = req.body;
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const updated = await ContactPage.findOneAndUpdate({ singleton: true }, { $set: updateData }, options);
    res.json({ message: 'ContactPage updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating ContactPage:', error);
    res.status(500).json({ error: 'Failed to update ContactPage config' });
  }
};

// ═══════════════════════════════════════════════════════════
// ABOUT PAGE CMS
// ═══════════════════════════════════════════════════════════
const AboutPage = require('../models/AboutPage');

// GET /api/aboutpage
exports.getAboutPage = async (req, res) => {
  try {
    const data = await AboutPage.findOne();
    res.json({ data: data || {} });
  } catch (error) {
    console.error('Error fetching AboutPage:', error);
    res.status(500).json({ error: 'Failed to fetch AboutPage config' });
  }
};

// PUT /api/aboutpage (Protected)
exports.updateAboutPage = async (req, res) => {
  try {
    const updateData = req.body;
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const updated = await AboutPage.findOneAndUpdate({ singleton: true }, { $set: updateData }, options);
    res.json({ message: 'AboutPage updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating AboutPage:', error);
    res.status(500).json({ error: 'Failed to update AboutPage config' });
  }
};

// ═══════════════════════════════════════════════════════════
// CAREERS PAGE CMS
// ═══════════════════════════════════════════════════════════
const CareersPage = require('../models/CareersPage');
const CareersJob = require('../models/CareersJob');

// GET /api/careers/page
exports.getCareersPage = async (req, res) => {
  try {
    const data = await CareersPage.findOne().populate('selectedFormId');
    res.json({ data: data || {} });
  } catch (error) {
    console.error('Error fetching CareersPage:', error);
    res.status(500).json({ error: 'Failed to fetch CareersPage config' });
  }
};

// PUT /api/careers/page (Protected)
exports.updateCareersPage = async (req, res) => {
  try {
    const updateData = req.body;
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const updated = await CareersPage.findOneAndUpdate({ singleton: true }, { $set: updateData }, options);
    res.json({ message: 'CareersPage updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating CareersPage:', error);
    res.status(500).json({ error: 'Failed to update CareersPage config' });
  }
};

// GET /api/careers/jobs — list all active jobs (public)
exports.getCareersJobs = async (req, res) => {
  try {
    const jobs = await CareersJob.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ data: jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// GET /api/careers/jobs/all — list all jobs including inactive (admin)
exports.getAllCareersJobs = async (req, res) => {
  try {
    const jobs = await CareersJob.find().sort({ createdAt: -1 });
    res.json({ data: jobs });
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// GET /api/careers/jobs/:id — single job by id
exports.getCareersJobById = async (req, res) => {
  try {
    const job = await CareersJob.findOne({ id: req.params.id });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ data: job });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};

// POST /api/careers/jobs — create job (Protected)
exports.createCareersJob = async (req, res) => {
  try {
    const job = await CareersJob.create(req.body);
    res.status(201).json({ message: 'Job created', data: job });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: error.message || 'Failed to create job' });
  }
};

// PUT /api/careers/jobs/:id — update job by id (Protected)
exports.updateCareersJob = async (req, res) => {
  try {
    const job = await CareersJob.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { returnDocument: 'after' });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job updated', data: job });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};

// DELETE /api/careers/jobs/:id — delete job by id (Protected)
exports.deleteCareersJob = async (req, res) => {
  try {
    const job = await CareersJob.findOneAndDelete({ id: req.params.id });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
};

// ═══════════════════════════════════════════════════════════
// EVENTS (WEBINARS & NEWS)
// ═══════════════════════════════════════════════════════════

// --- Webinars ---

// GET /api/webinars — public listing
exports.getWebinars = async (req, res) => {
  try {
    const list = await Webinar.find({ isActive: true }).sort({ eventDate: -1 });
    res.json({ data: list });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch webinars' });
  }
};

// GET /api/webinars/all — admin listing
exports.getAllWebinars = async (req, res) => {
  try {
    const list = await Webinar.find().sort({ eventDate: -1 });
    res.json({ data: list });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all webinars' });
  }
};

// GET /api/webinars/:slug — single webinar
exports.getWebinarBySlug = async (req, res) => {
  try {
    const item = await Webinar.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ error: 'Webinar not found' });
    res.json({ data: item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch webinar' });
  }
};

// POST /api/webinars — create (Protected)
exports.createWebinar = async (req, res) => {
  try {
    const item = await Webinar.create(req.body);
    res.status(201).json({ data: item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/webinars/:slug — update (Protected)
exports.updateWebinar = async (req, res) => {
  try {
    const item = await Webinar.findOneAndUpdate({ slug: req.params.slug }, { $set: req.body }, { returnDocument: 'after' });
    if (!item) return res.status(404).json({ error: 'Webinar not found' });
    res.json({ data: item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update webinar' });
  }
};

// DELETE /api/webinars/:slug — delete (Protected)
exports.deleteWebinar = async (req, res) => {
  try {
    await Webinar.findOneAndDelete({ slug: req.params.slug });
    res.json({ message: 'Webinar deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete webinar' });
  }
};

// --- News & Press Release ---

// GET /api/news — public listing
exports.getNews = async (req, res) => {
  try {
    const list = await News.find({ isActive: true }).sort({ date: -1 });
    res.json({ data: list });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

// GET /api/news/all — admin listing
exports.getAllNews = async (req, res) => {
  try {
    const list = await News.find().sort({ date: -1 });
    res.json({ data: list });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all news' });
  }
};

// GET /api/news/:slug — single news item
exports.getNewsBySlug = async (req, res) => {
  try {
    const item = await News.findOne({ slug: req.params.slug });
    if (!item) return res.status(404).json({ error: 'News item not found' });
    res.json({ data: item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news item' });
  }
};

// POST /api/news — create (Protected)
exports.createNews = async (req, res) => {
  try {
    const item = await News.create(req.body);
    res.status(201).json({ data: item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/news/:slug — update (Protected)
exports.updateNews = async (req, res) => {
  try {
    const item = await News.findOneAndUpdate({ slug: req.params.slug }, { $set: req.body }, { returnDocument: 'after' });
    if (!item) return res.status(404).json({ error: 'News item not found' });
    res.json({ data: item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news item' });
  }
};

// DELETE /api/news/:slug — delete (Protected)
exports.deleteNews = async (req, res) => {
  try {
    await News.findOneAndDelete({ slug: req.params.slug });
    res.json({ message: 'News item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news item' });
  }
};

// --- Webinar Registration ---

// POST /api/webinars/register — public submission
exports.submitWebinarRegistration = async (req, res) => {
  try {
    const registration = await WebinarRegistration.create(req.body);
    res.status(201).json({ message: 'Registered successfully', data: registration });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit registration' });
  }
};

// GET /api/webinars/:id/registrations — admin view (Protected)
exports.getWebinarRegistrations = async (req, res) => {
  try {
    const list = await WebinarRegistration.find({ webinarId: req.params.id }).sort({ registeredAt: -1 });
    res.json({ data: list });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};

// --- Category Management ---
exports.getCategories = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = {};
    if (type) filter.resourceType = type;
    const categories = await Category.find(filter).sort({ name: 1 });
    res.json({ message: 'Success', data: categories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ message: 'Category created successfully', data: category });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create category' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category updated successfully', data: category });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to update category' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
