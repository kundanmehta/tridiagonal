require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal';

const CareersJob = require('./models/CareersJob');
const CareersPage = require('./models/CareersPage');

const JOBS = [
  {
    id: 'project-engineer',
    title: 'Project Engineer',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'January 8, 2026',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '1–3 years',
    education: "Master's Degree in Chemical or Mechanical Engineering",
    overview: 'We are looking for a highly motivated Project Engineer to join our Advanced Modeling & Simulation group. You will work on critical projects involving fluid flow, heat transfer, and complex phenomena simulation for the process industry. This is an exciting opportunity to contribute to solving real-world engineering challenges using state-of-the-art computational tools.',
    responsibilities: [
      'Perform CFD simulations using industry-standard tools (Ansys Fluent, OpenFOAM, STAR-CCM+)',
      'Collaborate with cross-functional teams to define simulation parameters and boundary conditions',
      'Validate simulation results against experimental and plant data',
      'Present findings and technical recommendations to clients through reports and presentations',
      'Contribute to the development of best practices and standard operating procedures',
      'Stay updated with advancements in CFD methodologies and apply them to projects',
    ],
    requirements: [
      "Master's Degree in Chemical or Mechanical Engineering",
      'Proficiency in CFD software (OpenFOAM, Ansys Fluent, or STAR-CCM+)',
      'Strong problem-solving and analytical skills',
      'Knowledge of phase mixing and separation is a plus',
      'Excellent written and verbal communication skills',
      'Ability to work independently and in a team environment',
    ],
    benefits: [
      'Competitive salary and performance-based bonuses',
      'Opportunity to work on cutting-edge projects for Fortune 500 companies',
      'Continuous learning through mentorship and training programs',
      'Collaborative and innovation-driven work culture',
      'Health insurance and other employee benefits',
    ],
    isActive: true,
  },
  {
    id: 'sr-project-engineer-cfd-combustion',
    title: 'Sr. Project Engineer (CFD – Combustion Modeling)',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'November 18, 2025',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '5+ years',
    education: "PhD or Master's in Engineering",
    overview: 'Lead complex CFD combustion modeling projects for our major clients in the oil and gas sector. Assume technical leadership and mentor junior engineers while delivering high-value insights. You will be at the forefront of developing innovative combustion simulation approaches that directly impact plant safety and efficiency.',
    responsibilities: [
      'Lead combustion CFD projects end-to-end for global energy clients',
      'Develop, validate, and implement combustion sub-models for industrial burners, furnaces, and reactors',
      'Mentor junior team members and review project deliverables for technical accuracy',
      'Contribute to proposals, technical presentations, and business development activities',
      'Collaborate with experimental teams for model validation against physical test data',
      'Drive standardization efforts in combustion modeling workflows',
    ],
    requirements: [
      "PhD or Master's in Mechanical, Chemical, or Aerospace Engineering",
      '5+ years of hands-on experience in Combustion CFD Modeling',
      'Deep understanding of turbulence-chemistry interaction models (EDC, FGM, PDF)',
      'Proficiency in Ansys Fluent or equivalent CFD platforms',
      'Excellent communication and client management skills',
      'Experience with scripting/automation (Python, UDF) is a plus',
    ],
    benefits: [
      'Leadership role with high-impact global projects',
      'Competitive compensation package with performance bonuses',
      'Opportunity to publish and present research at international conferences',
      'Flexible work arrangements',
      'Health insurance and comprehensive employee benefits',
    ],
    isActive: true,
  },
  {
    id: 'project-engineer-efd-laboratory',
    title: 'Project Engineer (EFD Laboratory)',
    department: 'Technology Validation & Scale-up Centre',
    date: 'October 20, 2025',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '1–3 years',
    education: "Bachelor's or Master's in Engineering",
    overview: 'This is a hands-on role focused on operating and maintaining experimental fluid dynamics setups. Work closely with the simulation team to validate CFD models with real-world test data. You will play a key role in bridging the gap between computational predictions and physical reality.',
    responsibilities: [
      'Design and execute experimental fluid dynamics campaigns in a lab environment',
      'Maintain, calibrate, and troubleshoot laboratory instrumentation and equipment',
      'Analyze experimental data and benchmark against CFD predictions',
      'Prepare detailed test reports and documentation for internal and client use',
      'Collaborate with CFD engineers to define test matrices and validation protocols',
      'Support scale-up activities and technology transfer to clients',
    ],
    requirements: [
      "Bachelor's or Master's in Mechanical, Chemical, or relevant Engineering discipline",
      'Experience with lab-scale testing, flow measurement, and sensor technologies',
      'Knowledge of fluid mechanics, heat transfer, and mass transfer fundamentals',
      'Ability to analyze and interpret physical test data',
      'Familiarity with data acquisition systems and LabVIEW is a plus',
      'Strong attention to detail and safety awareness',
    ],
    benefits: [
      'Unique opportunity to work in a state-of-the-art EFD laboratory',
      'Cross-functional collaboration with simulation experts',
      'Competitive salary and benefits package',
      'Professional development and training opportunities',
      'Health insurance and employee wellness programs',
    ],
    isActive: true,
  },
  {
    id: 'project-leader-cfd-combustion',
    title: 'Project Leader (CFD - Combustion Modeling)',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'February 13, 2025',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '8+ years',
    education: "PhD or Master's in Engineering",
    overview: 'Provide strategic and technical leadership for a team of combustion modeling experts. Drive innovation and maintain best practices across project executions. This senior role demands a combination of deep technical expertise and strong people management skills to deliver world-class simulation solutions.',
    responsibilities: [
      'Lead a team of 4-6 engineers on combustion-related projects',
      'Define project scope, timelines, budgets, and deliverables',
      'Ensure quality control and technical rigor across all simulation work',
      'Engage directly with clients for requirement gathering, progress reviews, and final presentations',
      'Identify new business opportunities and contribute to proposal writing',
      'Drive technical innovation by evaluating new tools, methods, and research',
    ],
    requirements: [
      '8+ years of experience in CFD and combustion modeling',
      'Proven team leadership, project management, and mentorship capabilities',
      'Strong technical background in reacting flow simulations',
      'Ability to align technical deliverables with business goals',
      'Excellent interpersonal, leadership, and communication skills',
      'Experience with P&L management is a plus',
    ],
    benefits: [
      'Senior leadership position with strategic influence',
      'Competitive senior-level compensation with performance incentives',
      'Opportunity to shape the direction of combustion modeling practice',
      'International travel and client engagement opportunities',
      'Comprehensive benefits including health, retirement, and professional development',
    ],
    isActive: true,
  },
  {
    id: 'intern-fea',
    title: 'Intern (FEA)',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'October 1, 2024',
    location: 'Pune, India',
    type: 'Internship',
    experience: '0 years (Students welcome)',
    education: 'B.E / B.Tech / M.Tech (Pursuing or Recently Completed)',
    overview: 'A structured 6-month internship program designed for recent graduates or final-year students looking to gain hands-on experience in Finite Element Analysis in a professional engineering services environment. You will learn from experienced engineers and contribute to live projects.',
    responsibilities: [
      'Assist senior engineers in structural, thermal, and modal FEA analyses',
      'Learn and apply industry-standard FEA workflows (Ansys Mechanical, Abaqus)',
      'Participate in team meetings, knowledge-sharing sessions, and technical discussions',
      'Document simulation setups, results, and learnings systematically',
      'Contribute to internal R&D and benchmarking activities',
    ],
    requirements: [
      'Currently pursuing or recently completed B.E/B.Tech/M.Tech in Mechanical or related discipline',
      'Basic understanding of solid mechanics, structural analysis, and material science',
      'Familiarity with any FEA software (Ansys, Abaqus, SolidWorks Simulation) is a plus',
      'Strong academic record and eagerness to learn',
      'Good communication skills (written and verbal)',
    ],
    benefits: [
      'Mentorship from experienced FEA professionals',
      'Hands-on experience with real client projects',
      'Stipend provided during the internship period',
      'Certificate of completion and potential for full-time conversion',
      'Access to Tridiagonal learning resources and technical library',
    ],
    isActive: true,
  },
];

const PAGE_DATA = {
  singleton: true,
  heroSection: {
    title: 'Explore opportunities to grow in <span class="gradient-text">advanced technology</span> space',
    description: "We're a group of talented professionals who are passionate about applying advanced technologies in process industry",
    bgImage: '/images/careers-bg.png',
  },
  coreValuesSection: {
    heading: 'Our Core Values',
    description: 'Fostering Growth and Success for Our Customers and Employees',
    values: [
      { title: 'Innovation', desc: 'Encouraging new ideas, creativity, and continuous improvement.' },
      { title: 'Customer Centricity', desc: "Putting customers' needs first and striving to exceed their expectations." },
      { title: 'Excellence', desc: 'Striving for the highest standards of quality and performance.' },
      { title: 'Results-Driven', desc: 'Focusing on achieving measurable outcomes and goals.' },
      { title: 'Teamwork', desc: 'Collaborating effectively and valuing diverse perspectives.' },
      { title: 'Agility', desc: 'Being adaptable and responsive to changing market and technological trends.' },
    ],
  },
  opportunitiesSection: {
    heading: 'Check out our latest opportunities',
  },
  selectedFormId: null,
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Seed jobs
    for (const job of JOBS) {
      await CareersJob.findOneAndUpdate({ id: job.id }, job, { upsert: true, new: true });
      console.log(`  ✓ Job upserted: ${job.title}`);
    }

    // Seed page config
    await CareersPage.findOneAndUpdate({ singleton: true }, PAGE_DATA, { upsert: true, new: true });
    console.log('  ✓ CareersPage config seeded');

    console.log('\n✅ Careers seed complete!');
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
