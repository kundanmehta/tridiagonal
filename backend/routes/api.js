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

// Events (Webinars & News)
router.get('/webinars/all', verifyToken, apiController.getAllWebinars);
router.get('/webinars', apiController.getWebinars);
router.post('/webinars', verifyToken, apiController.createWebinar);
router.get('/webinars/:slug', apiController.getWebinarBySlug);
router.put('/webinars/:slug', verifyToken, apiController.updateWebinar);
router.delete('/webinars/:slug', verifyToken, apiController.deleteWebinar);
router.post('/webinars/register', apiController.submitWebinarRegistration);
router.get('/webinars/:id/registrations', verifyToken, apiController.getWebinarRegistrations);

router.get('/news/all', verifyToken, apiController.getAllNews);
router.get('/news', apiController.getNews);
router.post('/news', verifyToken, apiController.createNews);
router.get('/news/:slug', apiController.getNewsBySlug);
router.put('/news/:slug', verifyToken, apiController.updateNews);
router.delete('/news/:slug', verifyToken, apiController.deleteNews);

// Resources (Blogs, Case Studies, Publications, Brochures)
router.get('/resources/all', verifyToken, apiController.getAllResources);
router.get('/resources', apiController.getResources);
router.post('/resources', verifyToken, apiController.createResource);
router.get('/resources/:slug', apiController.getResourceBySlug);
router.put('/resources/:slug', verifyToken, apiController.updateResource);
router.delete('/resources/:slug', verifyToken, apiController.deleteResource);

// Categories
router.get('/categories', apiController.getCategories);
router.post('/categories', verifyToken, apiController.createCategory);
router.put('/categories/:id', verifyToken, apiController.updateCategory);
router.delete('/categories/:id', verifyToken, apiController.deleteCategory);

module.exports = router;

