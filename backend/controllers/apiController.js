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

exports.submitContact = async (req, res) => {
  console.log('Contact form submitted:', req.body);
  res.json({ message: 'Successfully received message' });
};
