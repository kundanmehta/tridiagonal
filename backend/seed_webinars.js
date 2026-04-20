require('dotenv').config();
const mongoose = require('mongoose');
const Webinar = require('./models/Webinar');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal';

const webinarData = [
  {
    slug: 'future-of-cement-manufacturing',
    title: 'The Future of Cement Manufacturing: Simulate, Optimize, Excel',
    date: '17 Nov 2025',
    type: 'On-Demand',
    category: 'on-demand-webinar',
    description: 'In today’s rapidly evolving industrial landscape, the cement industry faces increasing pressure to enhance efficiency, reduce emissions, and improve process reliability — all while maintaining profitability.',
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
    },
    duration: '60 mins'
  },
  {
    slug: 'sand-transportation-esp-assisted-wells',
    title: 'Sand Transportation for Extending Life of ESP-Assisted Wells',
    date: '28 Jul 2025',
    type: 'On-Demand',
    category: 'on-demand-webinar',
    description: 'Sand production remains one of the most persistent challenges in artificial lift operations, often leading to reduced Electric Submersible Pump (ESP) performance and premature equipment failure.',
    fullDescription: [
      'Sand production is one of the most persistent challenges in artificial lift operations, frequently leading to reduced Electric Submersible Pump (ESP) performance and premature equipment failure.',
      'This session provides a deep dive into the critical aspects of sand transport, examining how tubing size and flow velocity impact sand behavior within the wellbore. The discussion is supported by a combination of experimental findings and comparisons with OLGA modeling.'
    ],
    learnPoints: [
      'Sand Transport Challenges: Why sand production is a persistent issue affecting ESP reliability.',
      'Critical Velocity: Understanding critical velocity in achieving effective sand transport.',
      'Informed Decision Making: Tubing size selection based on field data and modeling insights.',
      'Modeling Awareness: Limitations of OLGA modeling in complex, sand-rich scenarios.',
      'Real-World Validation: Using experimental evidence to validate sand transport behavior.'
    ],
    attendees: [
      'Production Engineers',
      'Flow Assurance Specialists',
      'Reservoir & Well Engineers',
      'R&D Teams'
    ],
    presenter: {
      name: 'External Expert',
      title: 'Technical Specialist',
      company: 'Tridiagonal Solutions'
    },
    duration: '45 mins'
  },
  {
    slug: 'fea-structural-integrity-oil-gas',
    title: 'Finite Element Analysis (FEA) to Ensure Structural Integrity of Oil and Gas Assets',
    date: '10 Jul 2025',
    type: 'On-Demand',
    category: 'on-demand-webinar',
    description: 'The high-stakes oil and gas sector prioritizes maintaining the structural integrity of equipment and infrastructure.',
    fullDescription: [
      'The high-stakes oil and gas sector prioritizes maintaining the structural integrity of equipment and infrastructure. This webinar explores the application of Finite Element Analysis (FEA) to predict and improve the performance of critical components.',
      'FEA provides critical data to designers, plant operators, and managers regarding product safety and compliance with international code. Applying FEA helps reduce development time and costs through accurate modeling and analysis.'
    ],
    learnPoints: [
      'Introduction to FEA: Overview of the FEA process.',
      'Real-World Application: Replicating real-world loading scenarios for equipment.',
      'Reliability Assessment: Assessing equipment reliability under various conditions.',
      'Industry Insights: Product safety and compliance with international standards.',
      'Efficiency: Reducing development time and costs through FEA.'
    ],
    attendees: [
      'Project Managers in Oil & Gas',
      'Mechanical and Structural Engineers',
      'Design and Analysis Professionals',
      'Engineering Consultants'
    ],
    presenter: {
      name: 'FEA Expert',
      title: 'Senior Analysis Engineer',
      company: 'Tridiagonal Solutions'
    },
    duration: '50 mins'
  },
  {
    slug: 'cfd-modeling-separator-performance',
    title: 'CFD Modeling to Improve Separator Performance',
    date: '06 Jun 2025',
    type: 'On-Demand',
    category: 'on-demand-webinar',
    description: 'In the oil and gas industry, separation processes are essential for separating raw crude oil and natural gas streams into distinct phases.',
    fullDescription: [
      'In the oil and gas industry, separators are critical for processing raw crude oil and natural gas. This webinar highlights how CFD provides data-driven insights into separator performance.',
      'Engineers simulate various operating conditions to uncover hidden flow issues and validate design choices without relying on costly trial-and-error methods.'
    ],
    learnPoints: [
      'Modeling Approaches: Detailed methods for modeling two-phase and three-phase separation.',
      'Flow & Pressure Insights: Interpreting flow patterns and pressure distribution.',
      'Design Optimization: Using numerical simulations to optimize separator internals.',
      'Performance Improvement: Strategies for scaling up designs and addressing inefficiencies.'
    ],
    attendees: [
      'Consultants involved in separator retrofitting',
      'Students and researchers focused on fluid dynamics',
      'Professionals seeking to streamline development'
    ],
    presenter: {
      name: 'CFD Specialist',
      title: 'Principal Engineer',
      company: 'Tridiagonal Solutions'
    },
    duration: '55 mins'
  },
  {
    slug: 'cfd-dem-catalyst-particles',
    title: 'CFD-DEM applied to Catalyst-Particles in Packed Bed Reactors or Columns | Webinar',
    date: '24 Apr 2025',
    type: 'On-Demand',
    category: 'on-demand-webinar',
    description: 'The shape, size, and packing configuration of catalyst particles are critical to packed bed reactor performance.',
    fullDescription: [
      'The shape, size, and packing configuration of catalyst particles are critical. This webinar highlights how resolved-particle CFD-DEM simulations act as a "digital twin" of the real setup.',
      'These simulations provide high-fidelity insights into fluid flow and heat transfer, allowing for design optimization without extensive physical testing.'
    ],
    learnPoints: [
      'Performance Metrics: How particle attributes influence pressure drop and residence time.',
      'Advanced Simulation: DEM-based packing integrated with particle-resolved CFD.',
      'Industry Applications: Methodologies for Catalysis, Refining, and Chemical Processing.',
      'Design Optimization: Identifying optimal designs without extensive testing.',
      'Technical Hurdles: Handling complex geometries and meshing challenges.'
    ],
    attendees: [
      'Process & Chemical Engineers',
      'Simulation & Modeling Specialists',
      'R&D Professionals',
      'Industry Personnel in Refining and Petrochemicals'
    ],
    presenter: {
      name: 'DEM Expert',
      title: 'Research Scientist',
      company: 'Tridiagonal Solutions'
    },
    duration: '60 mins'
  },
  {
    slug: 'plant-gpt-in-action',
    title: 'Plant GPT in Action: Real-World Use Cases of Domain-Powered Agentic AI',
    date: '20 May 2026',
    type: 'Upcoming',
    category: 'upcoming-webinar',
    description: 'Explore how multi-agent systems transform industrial operations through domain-powered agentic AI.',
    fullDescription: [
      'Tridiagonal.ai’s "Plant GPT" is a specialized solution designed for intelligent manufacturing operations. It leverages a multi-agent framework and Large Language Models (LLMs) to provide real-time decision support.',
      'These sessions explore how specialized micro-agents collaborate to interpret operational data and deliver actionable knowledge.'
    ],
    learnPoints: [
      'Hybrid Architecture: Combining machine learning with LLM-powered reasoning.',
      'Operational Intelligence: Unifying fragmented data into a holistic view.',
      'Decision-Making: How Decision Graphs drive AI-suggested actions.',
      'Scalability: Deploying autonomous AI agents across heavy industries.'
    ],
    attendees: [
      'C-Level Executives and Digital Officers',
      'Plant Management and Factory Managers',
      'Technical & Digital Leadership',
      'Process Experts and MSAT Engineers'
    ],
    presenter: {
      name: 'AI Solutions Team',
      title: 'Domain Experts',
      company: 'Tridiagonal.ai'
    },
    duration: '45 mins'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { connectTimeoutMS: 30000 });
    console.log('Connected to MongoDB');

    // Clean existing webinars to avoid duplicates and ensure fresh content
    await Webinar.deleteMany({});
    console.log('Cleared existing webinars');

    for (const item of webinarData) {
      const sections = [
        { 
          type: 'text', 
          value: item.fullDescription.map(p => `<p>${p}</p>`).join('') 
        }
      ];

      await Webinar.create({
        title: item.title,
        slug: item.slug,
        eventDate: new Date(item.date === 'Upcoming' ? Date.now() + 30*24*60*60*1000 : item.date),
        description: item.description,
        sections,
        learnPoints: item.learnPoints,
        attendees: item.attendees,
        presenters: [item.presenter],
        duration: item.duration,
        type: item.type === 'On-Demand' ? 'On-Demand' : 'Live',
        accessType: item.category === 'upcoming-webinar' ? 'Upcoming' : 'On-Demand',
        isActive: true
      });

      console.log(`Seeded: ${item.title}`);
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
