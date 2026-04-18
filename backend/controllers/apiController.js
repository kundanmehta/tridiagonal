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
const Blog = require('../models/Blog');

// GET /api/homepage — Fetch HomePage Data
exports.getHomePage = async (req, res) => {
  try {
    const data = await HomePage.findOne().lean(); // Use lean for easier manipulation
    
    if (data && data.useCasesSection) {
      if (data.useCasesSection.displayMode === 'latest') {
        const latestBlogs = await Blog.find({ category: 'Case Study' })
          .sort({ createdAt: -1 })
          .limit(data.useCasesSection.latestCount || 4)
          .lean();
        
        data.useCasesSection.cards = latestBlogs.map(b => ({
          title: b.title,
          image: b.coverImage,
          href: `/blogs/${b.slug}`,
          isCaseStudy: true
        }));
      } else if (data.useCasesSection.displayMode === 'manual' && data.useCasesSection.manualSelectedCards?.length > 0) {
        const selectedBlogs = await Blog.find({ _id: { $in: data.useCasesSection.manualSelectedCards } }).lean();
        data.useCasesSection.cards = selectedBlogs.map(b => ({
          title: b.title,
          image: b.coverImage,
          href: `/blogs/${b.slug}`,
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
          const latest = await Blog.findOne({ category: mapping.category }).sort({ createdAt: -1 }).lean();
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
          const b = await Blog.findById(m.blogId).lean();
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
