exports.getPages = async (req, res) => {
  res.json({ message: 'Success', data: [] });
};

exports.getServices = async (req, res) => {
  const mockServices = [
    { title: "Process Engineering", slug: "process-engineering", description: "Design, optimize and troubleshoot chemical processes." },
    { title: "Flow Modeling", slug: "flow-modeling", description: "CFD analysis for reactor design and fluid flow problems." },
    { title: "Particle Technology", slug: "particle-technology", description: "Characterization and handling of granular materials." },
    { title: "Asset Performance", slug: "asset-performance", description: "Monitoring and reliability enhancement of industrial assets." },
    { title: "Sustainability Solutions", slug: "sustainability", description: "Energy efficiency and emission reduction strategies." }
  ];
  res.json({ message: 'Success', data: mockServices });
};

exports.getServiceBySlug = async (req, res) => {
  res.json({ message: 'Success', data: { title: req.params.slug.replace('-', ' '), description: 'Detail for ' + req.params.slug } });
};

exports.getIndustries = async (req, res) => {
  const mockIndustries = [
    { title: "Oil & Gas", slug: "oil-gas" },
    { title: "Chemicals", slug: "chemicals" },
    { title: "Pharmaceuticals", slug: "pharmaceuticals" },
    { title: "Food & Beverage", slug: "food-beverage" },
    { title: "Energy", slug: "energy" }
  ];
  res.json({ message: 'Success', data: mockIndustries });
};

exports.getIndustryBySlug = async (req, res) => {
  res.json({ message: 'Success', data: { title: req.params.slug.replace('-', ' ') } });
};

exports.getBlogs = async (req, res) => {
  res.json({ message: 'Success', data: [] });
};

exports.getEvents = async (req, res) => {
  res.json({ message: 'Success', data: [] });
};

exports.getCareers = async (req, res) => {
  res.json({ message: 'Success', data: [] });
};

const Contact = require('../models/Contact'); // Import Contact model

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
    const data = await HomePage.findOne();
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
    const updated = await HomePage.findOneAndUpdate({ singleton: true }, updateData, options);
    
    res.json({ message: 'HomePage updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating HomePage:', error);
    res.status(500).json({ error: 'Failed to update HomePage config' });
  }
};
