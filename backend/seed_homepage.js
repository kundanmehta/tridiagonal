require('dotenv').config();
const mongoose = require('mongoose');
const HomePage = require('./models/HomePage');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tridiagonal';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Backend Database Successfully!');

    // Clean existing
    await HomePage.deleteMany({});
    console.log('🗑️  Cleared existing Home Page data.');

    const initialData = {
      singleton: true,
      hero: {
        titleLine1: "Process Consulting and",
        titleLine2: "Technology Solutions",
        description: "We deliver 'Value' by leveraging advanced technologies to address process related challenges.",
        ctaText: "LEARN MORE",
        ctaLink: "#services",
        videoUrl: "/hubfs/home-hero-video-1.mp4",
        imageUrl: "/hubfs/Capture-1.webp",
        backgroundType: "video",
      },
      serviceCards: [
        {
          num: '01',
          title: 'Advanced Modeling & Simulation (CFD/FEA)',
          desc: 'Computational Fluid Dynamics (CFD), Discrete Element Modeling (DEM), Finite Element Analysis (FEA), Fluid Structure Interaction (FSI), Reduced Order Modeling (ROM), Digital Twin.',
          href: '/services/advance-modeling-and-simulation',
          bg: '#383838',
        },
        {
          num: '02',
          title: 'Technology Validation & Scale-up Centre',
          desc: 'Flow Assurance Studies, Erosion, Corrosion, Wax deposition, Sand transportation, Hydrates, Green Hydrogen testing, Asphaltene studies.',
          href: '/services/technology-validation-scale-up-centre',
          bg: '#1a1a1a',
        },
        {
          num: '03',
          title: 'Partner Solutions',
          desc: 'Siemens Simcenter, FactSage (thermochemical simulations), Coreform — seamlessly integrate validated third-party software directly into your ecosystem.',
          href: '/partner-solutions',
          bg: '#383838',
        },
      ],
      serviceCta: {
        text: "To know more about our practice areas, contact us today!",
        buttonText: "Contact Us",
        buttonLink: "/contact-us",
      },
      whoWeAreCards: [
        {
          title: 'Technology Catalyst',
          desc: 'We are at the forefront of driving technological advancements, innovation, and transformation within process industry. We have been playing a catalyst role in leveraging advanced technologies to execute, implement and deploy solutions to address business problems of our customers.',
          backgroundImage: '/hubfs/image%20(10).png',
          buttonText: 'VIEW MORE',
          buttonLink: '#'
        },
        {
          title: 'Operations Excellence',
          desc: "With 16+ years of experience in delivering advanced solutions for multiple industries, we have developed implementation best practices. The combination of our skill sets, and technology understanding enables us to support our customers' operational excellence initiatives.",
          backgroundImage: '/hubfs/image%20(12).png',
          buttonText: 'VIEW MORE',
          buttonLink: '#'
        },
        {
          title: 'Sustainability',
          desc: 'Tridiagonal Solutions is committed to implementing sustainable practices in its operations. We support Innovation enablement programs for CCUS, Green Hydrogen and more across Scope 1 & 2 energy optimization and GHG reporting.',
          backgroundImage: '/hubfs/image%20(11).png',
          buttonText: 'VIEW MORE',
          buttonLink: '#'
        },
      ],
      workOnCards: [
        { title: 'Computational Fluid Dynamics (CFD)', desc: 'Fluid flow analysis, Multiphase flow analysis, Combustion modeling, Aerodynamics & heat transfer analysis, Mixing & separation process studies, Emission control', icon: '/images/quarkus-svgrepo-com.svg', bg: '#16333c', href: '#' },
        { title: 'Discrete Element Method (DEM)', desc: 'Granular material behavior simulation, Tablet compression & coating, Powder handling & mixing, Crystallization & spray drying, Packaging & supply chain optimization, Process safety & efficiency improvement', icon: '/hubfs/medicine-health-medical-drug-pharmacy-pill-capsule-svgrepo-com.svg', bg: '#25352c', href: '#' },
        { title: 'Finite Element Analysis (FEA)', desc: 'Structural integrity assessment, Fatigue failure analysis, Thermal & static analysis, Dynamic & non-linear analysis, Heat transfer & temperature distribution, Coupled FEA–CFD–DEM studies', icon: '/hubfs/Optimized-Images-Solution/home/AI-based Process Optimization and Control home.svg', bg: '#363c26', href: '#' },
        { title: 'New Energy Testing (TRL 3-9) CCUS and Green Hydrogen', desc: 'Advancing Technology from TRL3 to TRL 9, CCUS-Carbon Capture Utilization and Storage, Enhanced Oil Recovery (EOR), Sustainable Energy Transition, Carbon Offset Implementation, Green Hydrogen Technology Testing & Validation, Renewable Power Integration Battery Testing.', icon: '/images/New Energy Testing (TRL 3-9) CCUS and Green Hydrogen.svg', bg: '#16333c', href: '#' },
        { title: 'Sand Blast Testing', desc: 'Coating thickness loss evaluation, Weight & thickness gauge measurement, Sand impingement cell testing, Variable airflow (10–50 m/s), Particle size control (>100 μm), Sand rate adjustment (>1 Kg/h), Impingement angle variation (0–90°)', icon: '/hubfs/sand-clock-svgrepo-com.svg', bg: '#25352c', href: '#' },
        { title: 'Asphaltene Testing Facility', desc: 'Enhance asphaltene management with our advanced global testing capabilities, designed to evaluate deposition behavior and optimize flow assurance strategies.', icon: '/hubfs/Optimized-Images-Solution/home/Scale-up and Tech Transfer home.svg', bg: '#363c26', href: '#' },
        { title: 'Multiphase flow and combustion modeling', desc: 'It includes Analyze two-phase flow of steam and water in boilers, simulate the flow of oil, water, and gas through a subsea pipeline and maximize the separation efficiency, whereas Combustion modeling includes flame impingement on radiant tube section leads to high tube metal temperatures which cause tube deformation, distortion, and rupture. And to study temperature distribution. We are using tools like ANSYS and Star CCM for simulation', icon: '/hubfs/Optimized-Images-Solution/home/Multiphase flow & combustion modeling home.svg', bg: '#16333c', href: '#' },
        { title: 'Fluid-Structure Interaction', desc: 'Simulating the complex interplay between fluids and structures using effective coupling of CFD and FEA. We do static structural analysis to check safety of separator under high pressure operating condition. We are using tools like ANSYS, Star CCM and LS Dyna for simulation.', icon: '/hubfs/Optimized-Images-Solution/home/Fluid-structure interaction home.svg', bg: '#25352c', href: '#' },
        { title: 'Flow assurance Testing (Wax, Erosion, Corrosion)', desc: 'Wax Mitigation, Asphaltene Management, Sand Management, Liquid Metal, Hydrate & CO2 Transport, Pipeline Flow Analysis, Flow Regime Identification, Inhibitor Screening, Slurry Rheology, and Erosion testing(Screen, Valve, elbows, joints, pipes, etc), Sand Blast, Sand Retention, and ICD Testing.', icon: '/hubfs/Optimized-Images-Solution/home/Flow assurance Testing (Wax, Erosion, Corrosion) home.svg', bg: '#363c26', href: '#' },
      ],
      brandIdentity: {
        title: 'Unveiling Our New\nBrand Identity',
        description: 'Welcome To Tridiagonal Solutions Fresh look! Check out our journey of delivering process excellence.',
        logoImage: '/hubfs/old_new_tridiagonal.webp',
        ctaText: 'READ MORE',
        ctaLink: '/events/tridiagonal-solutions-new-identity',
        thumbnailImage: '/hubfs/Capture-1.webp',
        modalVideoUrl: '/hubfs/brand_video.mp4',
      },
      keyHighlights: {
        title: 'Key Highlights',
        description: '16+ years process consulting experience using advanced technologies',
        ctaText: 'ABOUT US',
        ctaLink: '/about-us',
        counters: [
          { value: 2000, suffix: ' +', label: 'Multi-domain Projects' },
          { value: 150, suffix: ' +', label: 'Consultants Combination of Skillsets' },
          { value: 100, suffix: ' +M$', label: 'Customer Savings' },
          { value: 250000, suffix: ' +Sq.ft', label: 'Testing Lab For Oil & Gas' },
        ],
      },
      useCasesSection: {
        title: 'Use Cases',
        description: 'Despite of ever-evolving industries and complex value chains, digital engineering and experimental methods remain key to solving design, operational, and scale-up challenges. The following use cases highlight the application of Advanced Modeling & Simulation and Experimental Lab Scale-up in solving critical problems across diverse domains.',
        ctaText: 'VIEW ALL USE CASES',
        ctaLink: '/use-cases',
        cards: [
          { title: 'Simulating Data Centers using CoolSim', image: '/hubfs/Office Space Ventilation_ (1).png', customGradient: 'linear-gradient(135deg, #00d2ff 0%, #a4e03d 100%)', href: '#', isCaseStudy: false },
          { title: 'Frequency Response Analysis of Sparger', image: '/hubfs/Sparger.png', customGradient: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)', href: '#', isCaseStudy: true },
          { title: 'Improving the Performance of Induced Gas Flotation Unit', image: '/hubfs/Digital Twin.jpg', customGradient: 'linear-gradient(135deg, #0d324d 0%, #00d2ff 100%)', href: '#', isCaseStudy: false },
          { title: 'CFD Modeling of Mixing Systems', image: '/hubfs/CFD Analysis of a Neutralization Tank _.png', customGradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)', href: '#', isCaseStudy: false },
        ]
      },
      resourceSlides: [
        { typeStr: 'BLOGS', title: 'Fluid Structure Interaction Analysis (FSI):\nMaximizing Efficiency and Safety in Critical Industries', desc: 'In the fast-paced industrial landscape, the challenges faced by sectors such as oil and gas, crude refining, power...', image: '/hubfs/CFD FEA Coupled-1.png', href: '#' },
        { typeStr: 'WEBINARS', title: 'Advanced CFD Modeling For Reactor Safety', desc: 'Discover how computational modeling is preventing catastrophic failures and streamlining the maintenance of critical systems...', image: '/hubfs/Blog CFD DEM.png', href: '#' },
        { typeStr: 'CASE STUDIES', title: 'Enhancing Asphaltene Testing Methodologies', desc: 'A deep dive into scalable strategies to enhance extraction rates while managing long-term flow assurance concerns...', image: '/hubfs/Asphaltene Blog.png', href: '#' },
      ],
      clientLogos: [
        { name: 'Shell', image: '' },
        { name: 'BASF', image: '' },
        { name: 'Siemens', image: '' },
        { name: 'SABIC', image: '' },
        { name: 'Total', image: '' },
        { name: 'ExxonMobil', image: '' },
        { name: 'Dow', image: '' },
        { name: 'AkzoNobel', image: '' },
        { name: 'Honeywell', image: '' },
        { name: 'ABB', image: '' },
      ],
    };

    const newHomePage = await HomePage.create(initialData);
    console.log('✅ Home Page successfully seeded into MongoDB!');

  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
