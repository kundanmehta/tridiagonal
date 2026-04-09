export const eventsData = [
  {
    slug: 'future-of-cement-manufacturing',
    title: 'The Future of Cement Manufacturing: Simulate, Optimize, Excel',
    date: '17 Nov 2025',
    type: 'OnDemand Webinar',
    category: 'on-demand-webinar',
    description: 'In today’s rapidly evolving industrial landscape, the cement industry faces increasing pressure to enhance efficiency, reduce emissions, and improve process reliability — all while maintaining profitability. Achieving this balance requires more than traditional process control methods; it demands smarter tools and forward-thinking strategies.',
    fullDescription: [
      'In today’s rapidly evolving industrial landscape, the cement industry faces increasing pressure to enhance efficiency, reduce emissions, and improve process reliability — all while maintaining profitability. Achieving this balance requires more than traditional process control methods; it demands smarter tools and forward-thinking strategies.',
      'Simulation technology is proving to be a game-changer. From optimizing raw material blending and kiln operations to energy usage and emissions reduction, simulation enables cement manufacturers to gain deep insights into complex systems — before changes are implemented in the real world. By creating accurate simulations, industry leaders can explore scenarios, predict outcomes, and make physics-driven decisions with confidence.',
      'This webinar, "The Future of Cement Manufacturing: Simulate, Optimize, Excel," will explore how advanced simulation tools are transforming the cement manufacturing process. We\'ll discuss real-world use cases, demonstrate how simulation drives measurable improvements in performance, and highlight the key technologies leading the charge.'
    ],
    learnPoints: [
      'How simulation supports optimization in cement production',
      'Real-life examples of operational gains achieved through virtual modeling',
      'The role of simulation in sustainability and energy efficiency',
      'Steps to avail advantage of the simulation'
    ],
    attendees: [
      'Process Managers in the Cement Industry',
      'Mechanical and CFD Engineers',
      'Design and Analysis Professionals',
      'Engineering Consultants'
    ],
    presenter: {
      name: 'Mr. Harinarayanan Nagarajan',
      title: 'Project Manager - CFD Consulting',
      company: 'Tridiagonal Solutions'
    }
  },
  {
    slug: 'sand-transportation-esp-assisted-wells',
    title: 'Sand Transportation for Extending Life of ESP-Assisted Wells',
    date: '28 Jul 2025',
    type: 'OnDemand Webinar',
    category: 'on-demand-webinar',
    description: 'Sand production remains one of the most persistent challenges in artificial lift operations, often leading to reduced Electric Submersible Pump (ESP) performance and premature equipment failure. This session will dive deep into the critical aspects of sand transport, including how tubing size and flow velocity impact sand behavior in the wellbore. Backed by experimental findings and OLGA modeling...',
  },
  {
    slug: 'fea-structural-integrity-oil-gas',
    title: 'Finite Element Analysis (FEA) to Ensure Structural Integrity of Oil and Gas Assets',
    date: '10 Jul 2025',
    type: 'OnDemand Webinar',
    category: 'on-demand-webinar',
    description: 'The high-stakes oil and gas sector prioritizes maintaining the structural integrity of equipment and infrastructure. This webinar explores the application of Finite Element Analysis (FEA) to predict and improve the performance of critical components, ensuring safety, compliance, and operational efficiency.',
  },
  {
    slug: 'cfd-modeling-separator-performance',
    title: 'CFD Modeling to Improve Separator Performance',
    date: '06 Jun 2025',
    type: 'OnDemand Webinar',
    category: 'on-demand-webinar',
    description: 'In the oil and gas industry, separation processes are essential for separating and purifying hydrocarbons and other components from raw crude oil and natural gas streams. The separator is usually the first equipment through which the crude oil is processed. The primary purpose of a separator is to separate a mixture of different phases, such as liquids, gases, and solids, into distinct phases. Bas...',
  },
  {
    slug: 'cfd-dem-catalyst-particles',
    title: 'CFD-DEM applied to Catalyst-Particles in Packed Bed Reactors or Columns | Webinar',
    date: '24 Apr 2025',
    type: 'OnDemand Webinar',
    category: 'on-demand-webinar',
    description: 'Introduction: The shape, size and packing of catalyst particles plays significant role in the performance of packed bed columns or reactors. Performing experiments is expensive and has limitations due to challenges in the measurements. The resolved-particle CFD simulations are digital replica of real setup with deeper details.',
  },
  {
    slug: 'tridiagonal-unveils-new-brand-identity',
    title: 'Tridiagonal Solutions Unveils New Brand Identity',
    date: '08 Jun 2024',
    type: 'News and Press Release',
    category: 'news',
    description: 'Brand Identity Evolves to Reflect the Company’s Innovative Spirit Tridiagonal Solutions is thrilled to announce the launch of our new logo and tagline, "Delivering Process Excellence," marking a refreshing change in our brand identity.',
  }
];

// Helper functions to fetch data
export const getUpcomingWebinars = () => eventsData.filter(e => e.category === 'upcoming-webinar');
export const getOnDemandWebinars = () => eventsData.filter(e => e.category === 'on-demand-webinar');
export const getNews = () => eventsData.filter(e => e.category === 'news');
export const getEventBySlug = (slug) => eventsData.find(e => e.slug === slug);
