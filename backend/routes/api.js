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

// --- Admin & CMS Protected Routes ---
router.get('/contacts', verifyToken, apiController.getContacts);
router.get('/homepage', apiController.getHomePage); 
router.put('/homepage', verifyToken, apiController.updateHomePage); 

module.exports = router;
