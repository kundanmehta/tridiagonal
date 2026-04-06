const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Define API routes
router.get('/pages', apiController.getPages);
router.get('/services', apiController.getServices);
router.get('/industries', apiController.getIndustries);
router.get('/blogs', apiController.getBlogs);
router.get('/events', apiController.getEvents);
router.get('/careers', apiController.getCareers);

// Mock dynamic slugs
router.get('/services/:slug', apiController.getServiceBySlug);
router.get('/industries/:slug', apiController.getIndustryBySlug);

// User/Contact routes
router.post('/contact', apiController.submitContact);

module.exports = router;
