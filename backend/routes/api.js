const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const verifyToken = require('../middleware/auth');

// Public API routes
router.get('/pages', apiController.getPages);
router.get('/services', apiController.getServices);
router.get('/industries', apiController.getIndustries);
router.get('/blogs', apiController.getBlogs);
router.get('/events', apiController.getEvents);
router.get('/careers', apiController.getCareers);

// Dynamic slug routes
router.get('/services/:slug', apiController.getServiceBySlug);
router.get('/industries/:slug', apiController.getIndustryBySlug);

// Contact form (public submit)
router.post('/contact', apiController.submitContact);

const upload = require('../config/multer');

// --- Admin & CMS Protected Routes ---
router.get('/contacts', verifyToken, apiController.getContacts);
router.get('/homepage', apiController.getHomePage); 
router.put('/homepage', verifyToken, apiController.updateHomePage); 
router.post('/upload', verifyToken, upload.single('file'), apiController.uploadFile);
router.post('/upload-public', upload.single('file'), apiController.uploadPublicFile);

// Privacy Policy page
router.get('/privacy-policy', apiController.getPrivacyPolicy);
router.put('/privacy-policy', verifyToken, apiController.updatePrivacyPolicy);

// Dynamic Form Builder
router.get('/forms', apiController.getDynamicForms);
router.post('/forms', verifyToken, apiController.createDynamicForm);
router.get('/forms/:id', apiController.getDynamicFormById);
router.put('/forms/:id', verifyToken, apiController.updateDynamicForm);
router.delete('/forms/:id', verifyToken, apiController.deleteDynamicForm);
router.post('/forms/:id/submit', apiController.submitDynamicForm);
router.get('/forms/:id/submissions', verifyToken, apiController.getFormSubmissions);

// Contact Page CMS
router.get('/contactpage', apiController.getContactPage);
router.put('/contactpage', verifyToken, apiController.updateContactPage);

// About Us Page CMS
router.get('/aboutpage', apiController.getAboutPage);
router.put('/aboutpage', verifyToken, apiController.updateAboutPage);

// Careers Page CMS
router.get('/careers/page', apiController.getCareersPage);
router.put('/careers/page', verifyToken, apiController.updateCareersPage);
router.get('/careers/jobs/all', verifyToken, apiController.getAllCareersJobs); // admin: all jobs
router.get('/careers/jobs', apiController.getCareersJobs);                     // public: active only
router.post('/careers/jobs', verifyToken, apiController.createCareersJob);
router.get('/careers/jobs/:id', apiController.getCareersJobById);
router.put('/careers/jobs/:id', verifyToken, apiController.updateCareersJob);
router.delete('/careers/jobs/:id', verifyToken, apiController.deleteCareersJob);

module.exports = router;
