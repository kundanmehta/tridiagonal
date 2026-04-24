'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CAPABILITIES_DATA } from './data';
import { API_URL } from '@/lib/apiConfig';

const NAV_SECTIONS = ['About Practice', 'Capabilities', 'Use Cases', 'Why Tridiagonal', 'Industries'];

function ArrowRight({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59l-2.13-2.13a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
    </svg>
  );
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const capabilities = [
  {
    title: 'Computational Fluid Dynamics (CFD)',
    desc: 'Multiphase flow, Phase change, combustion and reaction modeling are our routine areas of working. We help industry to analyze root cause of the failure. Our engineers provide deep insights for troubleshooting & process improvement.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l2 2"/><circle cx="18" cy="8" r="3"/>
      </svg>
    ),
  },
  {
    title: 'Discrete Element Method (DEM)',
    desc: 'DEM is utilized in pharmaceuticals for powder mixing and tablet compression, in chemicals for particle handling and crystallization, and in CPG for packaging and mixing processes. It optimizes operations, ensuring uniformity and efficiency.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><circle cx="12" cy="12" r="2"/>
        <line x1="8" y1="6" x2="10" y2="11"/><line x1="14" y1="13" x2="16" y2="18"/>
      </svg>
    ),
  },
  {
    title: 'Finite Element Analysis (FEA)',
    desc: 'Our canvas covers the assessment of the structural integrity of equipment, vessels, and components under static and dynamic loads, preventing thermal failures with optimized heat transfer & temperature distribution. Our engineers follow ASME & API standards.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="2" x2="12" y2="22"/>
        <line x1="2" y1="8.5" x2="22" y2="8.5"/>
      </svg>
    ),
  },
  {
    title: 'Multiphysics Simulation',
    desc: 'Tridiagonal engineers are capable in solving fluid-structure interaction (FSI) problems, while coupling of DEM-FEA models the behavior of granular materials interacting with structures, provides a deeper understanding of stress distribution and particle flow.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
  },
  {
    title: 'Digital Twin',
    desc: 'Tridiagonal tech leaders can build a virtual replica of assets & processes in various industries to reduce simulation iterations using data interpolation. Methods like CFD, FEA & DEM can predict values that are not possible to gain from sensors.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        <path d="M7 10h2l2-4 2 8 2-4h2"/>
      </svg>
    ),
  },
];

const useCasesCards = [
  { title: 'Simulating Data Centers using CoolSim', image: '/hubfs/Office Space Ventilation_ (1).png', customGradient: 'linear-gradient(135deg, #00d2ff 0%, #a4e03d 100%)' },
  { title: 'Frequency Response Analysis of Sparger', image: '/hubfs/Sparger.png', isCaseStudy: true, customGradient: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)' },
  { title: 'Improving the Performance of Induced Gas Flotation Unit', image: '/hubfs/Digital Twin.jpg', customGradient: 'linear-gradient(135deg, #0d324d 0%, #00d2ff 100%)' },
  { title: 'CFD Modeling of Mixing Systems', image: '/hubfs/CFD Analysis of a Neutralization Tank _.png', customGradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)' },
];

const industries = [
  { 
    name: 'Pharma and Medical Devices', 
    desc: 'Accelerating product development and ensuring regulatory compliance through high-fidelity simulations of medical devices and mixing processes.', 
    href: '/industries/pharmaceutical',
    image: '/hubfs/image(34).png' 
  },
  { 
    name: 'Metals, Mining & Cement', 
    desc: 'Enhancing process reliability and reducing emissions in heavy manufacturing through multiphase flow analysis and heat transfer modeling.', 
    href: '/industries/metals',
    image: '/hubfs/Metals, Mining & Cement (1)-1.png' 
  },
  { 
    name: 'Food, Beverages & CPG', 
    desc: 'Optimizing continuous and batch processing, improving product consistency, and maximizing efficiency in high-volume consumer goods manufacturing.', 
    href: '/industries/fmcg',
    image: '/hubfs/grid-3.png' 
  },
  { 
    name: 'Chemicals & Petrochemicals', 
    desc: 'Resolving complex fluid dynamics and reaction kinetics to scale-up operations and improve yield in specialty and bulk chemicals.', 
    href: '/industries/chemical',
    image: '/hubfs/grid-1.png' 
  },
  { 
    name: 'Power & Renewables', 
    desc: 'Driving the new energy transition with advanced simulation of CCUS, green hydrogen production, and renewable infrastructure reliability.', 
    href: '/industries/power',
    image: '/hubfs/New energy.png' 
  },
  { 
    name: 'Others', 
    desc: 'Our advanced simulation capabilities span numerous other distinct workflows including water treatment, semiconductors, and specialized manufacturing.', 
    href: '/industries',
    image: '/hubfs/grid-2.png' 
  },
];

const whyItems = [
  { title: 'Team', desc: '300+ experts with masters and Ph.D\'s in chemical engineering.', icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ) },
  { title: 'Consulting Expertise', desc: 'Extending over 100 man-years globally to Fortune 500 clients', icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line>
    </svg>
  ) },
  { title: 'Solutions', desc: 'Tailored to optimize operations and decision-making', icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  ) },
  { title: 'Engagement models', desc: 'Flexible options including time and material, dedicated centers, and project-specific arrangements', icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ) },
  { title: 'Value Creation', desc: 'Deploying best practices and methods to efficiently create and deliver value for customers.', icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9Z"></path><path d="M11 3 8 9l4 13"></path><path d="M13 3l3 6-4 13"></path>
    </svg>
  ) },
  { title: 'Multi Skilled Expertise', desc: 'Team having exposure and expertise of developing scalable solutions across multiple platforms.', icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  ) },
];

const MODAL_DATA = {
  'Computational Fluid Dynamics (CFD)': {
    mainTitle: 'Computational Fluid Dynamics',
    overview: 'Computational Fluid Dynamics (CFD) empowers you to visualize and analyze complex fluid flow phenomena within your designs. Our team of CFD specialists leverage cutting-edge tools and proven methodologies to provide comprehensive solutions for a wide range of applications, including heat transfer analysis for equipment design, Multiphase flow modeling and Combustion analysis for emission control. We are trusted partners of renowned companies since last two decades. We work on a wide range of applications making considerable contributions to design & process optimization.',
    technicalSections: [
      {
        title: 'Computational Fluid Dynamics (CFD)',
        subtitle: 'CFD centric Post Processing',
        content: 'Study of Separation process \nOur CFD engineers can analyze oil blending & suggest appropriate jet-mixture position for optimal performance. Homogenization time can also be predicted to take inferred decisions. Separation is an essential process in Oil & Gas industry, here we can evaluate and enhance performance of various separation equipment like two/three-phase separators, vertical/horizontal and spherical separators, Cyclone and pre-treaters with simulation.'
      },
      {
        title: 'Combustion Modeling',
        subtitle: 'Combustion Modeling',
        content: 'Tridiagonal has considerable experience on modeling burner arrangements, flame interactions, NOx and SOx predictions and Flame impingement on radiant tube section to avoid rupture. Our engineers also worked on processed heaters used in reformers. We help optimize flow of fluid and air to Burner using CFD as well as improve combustion efficiency by optimizing fuel and air flow'
      },
      {
        title: 'Ongoing Performance Monitoring and Enhancement',
        subtitle: 'Well drilling & Cementing',
        content: 'Tridiagonal engineers work on both onshore & offshore oil extraction applications. Our team can analyze pressure drop patterns & erosion modeling of downhole tools using CFD as well as equipment & tools involved in other processes like completion, cementing & plugging and abandonment to understand fluid displacement. Other applications include sand screens, submersible pumps, steel catenary riser(SCR) & exhaust gas dispersion from offshore platforms.'
      },
      {
        title: 'Dynamic Simulation (Operator training simulation)',
        subtitle: 'Simulation for refining applications & processes',
        content: "Tridiagonal's CFD capabilities cover a wide range of equipment & processes under oil refining. Our simulation assessment helps solve coking issues in fractionators by tracking particle & liquid distribution. Insights provided from our M&S team are useful in selection of Fixed bed reactors to get improved temperature distribution & flow uniformity."
      },
      {
        title: 'Dynamic analysis',
        subtitle: 'Seamless coupling with Finite Element analysis',
        content: 'Through incorporation of coupled FEA-CFD analysis we offer more realistic solutions on various oil & gas equipment. Synergizing both these domains our experts help you solve problems related to Fluid Structure Interaction(FSI) & Thermal Structural interaction.'
      }
    ],
    tools: ['Simcenter STAR-CCM+', 'Simcenter 3D', 'Simcenter Amesim', 'Simcenter FLOEFD', 'FLOMASTER'],
    image: '/hubfs/CFD Analysis of a Neutralization Tank _.png'
  },
  'Finite Element Analysis (FEA)': {
    mainTitle: 'Finite Element Analysis',
    overview: 'Finite Element Analysis (FEA) has become an indispensable technology within the oil and gas industry. This sophisticated computer-aided engineering technique allows engineers to perform simulations of various components and structures and predict their behavior under real-world operating conditions.\n\nThis capability to analyze stress, strain, and deformations across a wide range of scenarios strengthens safety protocols, optimizes designs, and ultimately reduces costs throughout production, and transportation phases.',
    technicalSections: [
      {
        title: 'Structural analysis of RPB under rotation',
        subtitle: 'Ensuring Structural integrity of Pressure Vessels',
        content: 'Our FEA engineers can do static structural analysis to assess the structural integrity of different pressure vessels broadly classified as Vertical Pressure Vessels and Horizontal Pressure Vessels used in Oil refineries. We do these analyses using industry standards like ASME and API for stress classification and ASCE for Seismic analysis. We also frequently analyze separators & coke drums for deformations.'
      },
      {
        title: 'Oil in water prediction in skimmers',
        subtitle: 'Strength assessment of oil extraction equipment',
        content: 'From wellheads to offshore rigs our engineers can perform stress analysis to ensure safe & reliable operations. We can replicate the response of offshore platforms under combined forces of waves, wind, and sea currents. Under energy extraction operations, Tridiagonal works on a wide range of applications including Centrifugal compressors & gate valves.'
      },
      {
        title: 'Boiler energy optimization-1',
        subtitle: 'Ensuring structural integrity of energy storage solutions',
        content: 'Leveraging FEA, Tridiagonal can do a static analysis to capture stiffness of Distillation column to avoid collapse due to buckling loads. We have extensive experience in analyzing structural integrity of Storage tanks at component level such as Tank Roof Nozzle, Baffle Plate and bottom plate nozzle.'
      },
      {
        title: 'Fluid Structure Interaction',
        subtitle: 'Fatigue Life prediction for Piping structures',
        content: 'Tridiagonal engineers have considerable experience in predicting fatigue life of piping by calculating stress intensities at critical locations. We can simulate vortices and acoustic resonances and their effect on pipe wall structure to predict resonance frequency and high stress region in piping structures.'
      },
      {
        title: 'Quality Control and Regulatory Compliance',
        subtitle: 'Seamless coupling with Computational Fluid Dynamics',
        content: 'Through incorporation of coupled FEA-CFD analysis we offer more realistic solutions on various oil & gas equipment. Synergizing both these domains our experts help you solve problems related to Fluid Structure Interaction(FSI) & Thermal Structural interaction.'
      }
    ],
    tools: ['Simcenter 3D', 'NX Nastran', 'Simcenter Amesim', 'HEEDS', 'STAR-CCM+'],
    image: '/hubfs/Sparger.png'
  },
  'Discrete Element Method (DEM)': {
    mainTitle: 'Discrete Element Method',
    overview: 'Discrete Element Modeling (DEM) is a technique used in the oil and gas industry for simulating the behavior of granular materials, particularly in drilling processes and fluidized bed reactors.',
    technicalSections: [
      {
        title: 'Dynamic analysis',
        subtitle: 'Drill-bit interaction analysis',
        content: 'Tridiagonal can simulate how the drill bit interacts with rock formations at various depths. Our engineers predict wear and tear of drill bits, optimize drilling parameters, and improve drilling efficiency.'
      },
      {
        title: 'Integrity',
        subtitle: 'Simulating Wellbore Stability',
        content: 'Wellbore instability can cause significant problems during drilling. Tridiagonal can model the movement of formation particles around the wellbore, helping to predict potential wellbore collapse and design strategies to prevent it.'
      },
      {
        title: 'Predictive maintenance for Batch reactors',
        subtitle: 'Simulating movement and particle interaction under Bed reactors',
        content: 'FCC reactors use a fluidized bed of catalyst particles to crack heavier hydrocarbon molecules into lighter products. Tridiagonal can simulate the movement and interactions of these particles within the reactor, aiding in optimizing FCC operations for better product yield and catalyst life.'
      },
      {
        title: 'Automated Interpretation of RCA Incident reports',
        subtitle: 'Seamless coupling with Computational Fluid Dynamics',
        content: 'The plugging is dependent on the flow field, the number of particles, their cohesivity, and contact behavior. Tridiagonal can provide insights into the process of plugging in turbulent multiphase flows with cohesive/adhesive particles using high-fidelity CFD-DEM coupling.'
      }
    ],
    tools: ['Simcenter STAR-CCM+', 'Simcenter 3D', 'HEEDS'],
    image: '/hubfs/Digital Twin.jpg'
  },
  'Multiphysics Simulation': {
    mainTitle: 'Multiphysics Simulation',
    overview: 'As the Oil and Gas industry includes many complex processes & equipment, it is critical to understand the dynamics of internal processes and their effect on equipment to enhance performance. Tridiagonal has developed advanced capabilities to couple different disciplines to solve complex real-life issues using high-fidelity computational methods.',
    technicalSections: [
      {
        title: 'Fluid Structure Interaction',
        subtitle: 'Fluid Structure Interaction',
        content: 'Tridiagonal uses the coupling of Computational Fluid Dynamics (CFD) and Finite Element Analysis (FEA) to analyze the interplay between fluids & structures. Our experts can analyze flow-induced stresses, vibrations, and other dynamic effects. Our range of applications covers equipment like liquid seal drums, heat exchangers, and more.'
      },
      {
        title: 'Thermal Structural Interaction',
        subtitle: 'Thermal Structural Interaction',
        content: 'Our CFD engineers can provide high-fidelity boundary conditions for FE analysis by simulating fluid flow and heat transfer. This helps in understanding mechanical deformations in fired pressure vessels and optimizing their structural resilience.'
      },
      {
        title: 'Predictive maintenance for Batch reactors',
        subtitle: 'DEM-FEA coupled problems',
        content: 'During oil extraction, inefficient transport and accumulation of drill cuttings in the wellbore can lead to stuck pipes. Our DEM engineers simulate the movement of drill cuttings in the drilling fluid, while FEA is used to analyze the structural integrity of the wellbore and drill string to improve cuttings transport and prevent operational failures.'
      }
    ],
    tools: ['Simcenter STAR-CCM+', 'Simcenter 3D', 'Abaqus', 'Ansys'],
    image: '/hubfs/Office Space Ventilation_ (1).png'
  },
  'Digital Twin': {
    mainTitle: 'Digital Twin',
    overview: 'Tridiagonal tech experts build virtual replicas of assets and processes to reduce simulation iterations using data interpolation and real-time insights. Methods like CFD, FEA & DEM allow for predictions that may not be practically achievable through physical sensors alone.',
    technicalSections: [
      {
        title: 'Basic Start building Analytics Culture',
        subtitle: 'Building ROM (Reduced Order Modeling)',
        content: 'In areas where full-scale simulation is computationally expensive, Tridiagonal builds ROMs by creating lower-dimensional models that capture essential system behavior. This speeds up simulations and provides a straightforward approach for rapid analysis.'
      },
      {
        title: 'Advanced Analytics',
        subtitle: 'Creating Response surface models (RSM)',
        content: "Tridiagonal uses Response Surface Modeling (RSM), a statistical technique to save on simulation costs. By analyzing relationships between input variables and output responses, our engineers predict performance without running individual full-scale simulations. This significantly reduces R&D costs in oil refining and recovery."
      }
    ],
    tools: ['Simcenter STAR-CCM+', 'HEEDS', 'Simcenter Amesim', 'Python Data Stack'],
    image: '/hubfs/Metals, Mining & Cement (1)-1.png'
  }
};

export default function AdvancedModelingPage() {
  const [industryData, setIndustryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('About Practice');
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(null);
  const [allIndustries, setAllIndustries] = useState([]);
  const [useCasesSlide, setUseCasesSlide] = useState(0);
  const [useCasesInTransition, setUseCasesInTransition] = useState(true);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    async function fetchData() {
      try {
        const baseUrl = API_URL;
        
        // Fetch current industry data
        const res = await fetch(`${baseUrl}/api/industries/oil-gas`);
        const json = await res.json();
        if (json.data) {
          setIndustryData(json.data);
        }

        // Fetch all industries for the dynamic Industries section
        const allRes = await fetch(`${baseUrl}/api/industries`);
        const allJson = await allRes.json();
        if (allJson.data) {
          const filtered = allJson.data
            .filter(ind => ind.modelingSimulation?.enabled && ind.slug !== 'oil-gas')
            .map(ind => ({
              name: ind.title,
              desc: ind.overview,
              image: ind.heroImage || ind.modelingSimulation?.hero?.bgImage || "/hubfs/Metals, Mining & Cement (1)-1.png",
              href: `/industries/${ind.slug}/advance-modeling-and-simulation`
            }));
          setAllIndustries(filtered);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const config = industryData?.modelingSimulation || {};
  const hero = config.hero || { title: 'Advanced Modeling & Simulation', desc: 'Serving Upstream, Midstream & Downstream segment.' };
  const intro = config.intro || { heading: 'High-Fidelity Engineering Solutions', paragraphs: [] };
  const mainBody = config.mainBody || { title: 'What We Do', cards: [] };
  const showcase = config.showcase || { title: 'Use Cases', cards: [] };
  const whyChooseUs = config.whyChooseUs || { title: 'Why Choose Us?', items: [] };
  const modalsFromDb = config.modals || [];

  // Map modals from DB to the structure frontend expects
  const dynamicModals = {};
  modalsFromDb.forEach(m => {
    dynamicModals[m.capabilityName] = m;
  });

  const MODAL_DATA_FINAL = Object.keys(dynamicModals).length > 0 ? dynamicModals : MODAL_DATA;

  // Auto-scroll Use Cases slider (continuous loop)
  useEffect(() => {
    const timer = setInterval(() => {
      setUseCasesInTransition(true);
      setUseCasesSlide((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Handle snapping back for seamless infinite scroll (Use Cases)
  const useCasesCardsCount = showcase.cards?.length || 0;
  useEffect(() => {
    if (useCasesCardsCount > 0 && useCasesSlide === useCasesCardsCount) {
      const timeout = setTimeout(() => {
        setUseCasesInTransition(false);
        setUseCasesSlide(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [useCasesSlide, useCasesCardsCount]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a', color: '#fff' }}>
        <div style={{ fontSize: '20px', fontWeight: '600' }}>Loading...</div>
      </div>
    );
  }

  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#1a1a1a' }}>
      {/* ── HERO ── */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: `url('${hero.bgImage || '/hubfs/Advanced%20Modeling%20Service%20Page%20Banner.png'}') center center / cover no-repeat`,
          minHeight: 'auto',
          padding: '80px 0 60px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26, 26, 26, 0.88)' }} />

        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.12)', border: '1px solid rgba(71,188,135,0.3)', borderRadius: '30px', padding: '6px 20px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Industry</span>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: '800', display: 'block' }}>{industryData?.title || 'Oil & Gas'}</span>
          </div>

          <h1
            className="hero-title fade-in-up"
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: '50px',
              marginBottom: '20px',
              lineHeight: 1.1,
            }}
          >
            {hero.title}
          </h1>

          <p
            className="hero-desc fade-in-up delay-200"
            style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: '22px',
              maxWidth: '800px',
              margin: '0 auto',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}
          >
            {hero.desc}
          </p>
        </div>
      </section>

      {/* ── ABOUT PRACTICE (Intro Section) ── */}
      <section
        id="about-practice"
        data-section="About Practice"
        ref={el => sectionRefs.current['About Practice'] = el}
        style={{ padding: '100px 0', background: '#1a1a1a' }}
      >
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,480px),1fr))', gap: '80px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '6px 18px', borderRadius: '30px', marginBottom: '24px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>{intro.badge}</span>
              </div>
              <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '32px', lineHeight: 1.2 }}>
                {intro.heading}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {intro.paragraphs?.map((p, idx) => (
                  <p key={idx} style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.9', fontSize: '18px', fontWeight: '400' }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
            
            {/* Intro Section Image */}
            <div style={{ 
              position: 'relative', 
              borderRadius: '32px', 
              overflow: 'hidden', 
              aspectRatio: '16/10',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <Image
                src={intro.image || "/hubfs/Digital Twin.jpg"}
                alt="Infrastructure Visualization"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                style={{ objectFit: 'cover' }}
                unoptimized
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(71,188,135,0.1), transparent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section
        id="capabilities"
        data-section="Capabilities"
        ref={el => sectionRefs.current['Capabilities'] = el}
        style={{ padding: '80px 0', background: '#111' }}
      >
        <div className="content-wrapper-lg">
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{mainBody.badge}</span>
            </div>
            <h2 className="section-title" style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '20px' }}>
              {mainBody.title}
            </h2>
            <p className="section-desc" style={{ color: '#fff', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', fontSize: '16px', fontWeight: '500' }}>
              {mainBody.desc}
            </p>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .capabilities-grid-layout {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
            }
            @media (max-width: 1024px) {
              .capabilities-grid-layout { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 768px) {
              .capabilities-grid-layout { grid-template-columns: 1fr; }
            }
          ` }} />

          <div className="capabilities-grid-layout">
            {mainBody.cards?.map((cap, i) => (
              <div key={i}
                style={{
                  position: 'relative',
                  background: '#141414',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '380px',
                  transition: 'transform 0.3s, border-color 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(71,188,135,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${cap.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,20,20,0.6) 0%, rgba(20,20,20,0.98) 100%)' }} />
                
                <div style={{ position: 'relative', zIndex: 1, padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '16px', lineHeight: 1.3 }}>{cap.title}</h3>
                  <div style={{ flex: 1, marginBottom: '32px' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {cap.desc?.split('\n').map((line, idx) => {
                        const isSub = line.trim().startsWith('-') || line.trim().startsWith('○');
                        const cleanLine = line.replace(/^[•○\s-]*/, '').trim();
                        if (!cleanLine) return null;
                        return (
                          <li key={idx} style={{
                            position: 'relative',
                            paddingLeft: isSub ? '42px' : '22px',
                            fontSize: '16px',
                            color: '#fff',
                            lineHeight: '1.6',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            fontWeight: isSub ? '400' : '500'
                          }}>
                            <span style={{
                              position: 'absolute',
                              left: isSub ? '22px' : '0px',
                              top: '8px',
                              width: isSub ? '7px' : '8px',
                              height: isSub ? '7px' : '8px',
                              borderRadius: '50%',
                              border: isSub ? '1.5px solid #fff' : 'none',
                              background: isSub ? 'transparent' : '#fff',
                            }} />
                            {cleanLine}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedCapability(cap.title)}
                    suppressHydrationWarning
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'linear-gradient(90deg, #0dd0e1, #8fe03c)',
                      color: '#000', padding: '12px 24px', borderRadius: '30px',
                      fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px',
                      textDecoration: 'none', width: 'fit-content', border: 'none', cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(13,208,225,0.2)',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {cap.ctaText || 'VIEW MORE'} <ArrowRight size={14} color="#000" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section
        id="use-cases"
        data-section="Use Cases"
        ref={el => sectionRefs.current['Use Cases'] = el}
        style={{ background: '#242424', padding: '80px 0', overflow: 'hidden' }}
      >
        <div className="content-wrapper-lg">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            <div style={{ flex: '0 0 350px', display: 'flex', flexDirection: 'column' }}>
              <div className="dvr-line" style={{ marginBottom: '16px' }} />
              <h2 className="section-title" style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700', lineHeight: 1.1, marginBottom: '20px' }}>
                {showcase.title}
              </h2>
              <p className="section-desc" style={{ color: '#fff', opacity: 0.9, fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
                {showcase.desc}
              </p>
              <Link href="/resources/case-studies" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--gradient-brand)', color: '#000',
                fontWeight: '700', textTransform: 'uppercase',
                padding: '12px 24px', borderRadius: '40px',
                fontSize: '13px', letterSpacing: '0.04em', textDecoration: 'none', width: 'fit-content'
              }}>
                VIEW MORE <ArrowRight size={14} color="#000" />
              </Link>
            </div>

            <div style={{ flex: '1', minWidth: '0', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                display: 'flex', transition: useCasesInTransition ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                transform: `translateX(-${useCasesSlide * (100 / (showcase.cards?.length + 3 || 3))}%)`,
                width: `calc(${(showcase.cards?.length + 3 || 3)} * 33.3333%)`
              }}>
                {[...(showcase.cards || []), ...(showcase.cards?.slice(0, 3) || [])].map((card, idx) => (
                  <div key={idx} style={{ flex: `0 0 ${100 / (showcase.cards?.length + 3 || 3)}%`, minWidth: 0, padding: '0 10px' }}>
                    <div style={{ borderRadius: '24px', background: card.gradient || 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)', padding: card.isCaseStudy ? '4px' : '3px', marginBottom: '20px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <div style={{ background: card.isCaseStudy ? '#fff' : '#1c1c1c', borderRadius: '20px', width: '100%', height: '100%', position: 'relative', minHeight: '300px' }}>
                         <Image 
                           src={card.image} 
                           alt={card.title} 
                           fill 
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                           style={{ objectFit: card.isCaseStudy ? 'contain' : 'cover' }} 
                           unoptimized 
                         />
                      </div>
                    </div>
                    <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>{card.title}</h3>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
                {showcase.cards?.map((_, idx) => (
                  <button key={idx} suppressHydrationWarning onClick={() => setUseCasesSlide(idx)}
                    style={{ width: '12px', height: '12px', borderRadius: '50%', background: (useCasesSlide % (showcase.cards?.length || 1)) === idx ? 'var(--color-teal)' : '#fff', border: 'none', cursor: 'pointer', opacity: (useCasesSlide % (showcase.cards?.length || 1)) === idx ? 1 : 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY TRIDIAGONAL ── */}
      <section
        id="why-tridiagonal"
        data-section="Why Tridiagonal"
        ref={el => sectionRefs.current['Why Tridiagonal'] = el}
        style={{ padding: '80px 0', background: '#1c1c1c' }}
      >
        <div className="content-wrapper-lg">
          <style dangerouslySetInnerHTML={{ __html: `
            .why-grid-layout { display: grid; grid-template-columns: repeat(3, 1fr); }
            .why-grid-cell { padding: 40px 30px; border-right: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); transition: background 0.3s; }
            .why-grid-cell:hover { background: rgba(255,255,255,0.02); }
            @media (max-width: 900px) { .why-grid-layout { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 600px) { .why-grid-layout { grid-template-columns: 1fr; } }
          `}} />
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800' }}>{whyChooseUs.title}</h2>
          </div>
          <div className="why-grid-layout">
            {whyChooseUs.items?.map((item, i) => (
              <div key={i} className="why-grid-cell">
                <div style={{ color: 'var(--color-teal)', marginBottom: '12px' }}>
                   {/* Fallback icon if none provided in DB */}
                   {item.icon === 'Users' ? (
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                   ) : item.icon === 'Briefcase' ? (
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                   ) : (
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                   )}
                </div>
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      {config.industriesSection?.enabled !== false && (
        <section
          id="industries"
          data-section="Industries"
          ref={el => sectionRefs.current['Industries'] = el}
          style={{ padding: '100px 0', background: '#1c1c1c' }}
        >
          <div className="content-wrapper-lg">
            <div className="inds-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '80px' }}>
              <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
                <h2 className="section-title" style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700' }}>{config.industriesSection?.title || 'Industries'}</h2>
                <p style={{ color: '#fff', opacity: 0.9, fontSize: '18px' }}>{config.industriesSection?.subtitle || 'Your Trusted Partner in Modeling & Simulation.'}</p>
                <div style={{ width: '100%', aspectRatio: '1/1.1', borderRadius: '40px', overflow: 'hidden', position: 'relative', marginTop: '40px' }}>
                  <Image 
                    src={allIndustries[activeIndustryIdx || 0]?.image || "/hubfs/grid-2.png"} 
                    alt="industry" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: 'cover' }} 
                    unoptimized 
                  />
                </div>
              </div>
              <div onMouseLeave={() => setActiveIndustryIdx(null)}>
                {allIndustries.length > 0 ? allIndustries.map((ind, i) => (
                  <div key={ind.name} onMouseEnter={() => setActiveIndustryIdx(i)} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '30px 0', cursor: 'pointer' }}>
                    <h3 style={{ color: activeIndustryIdx === i ? 'var(--color-teal)' : '#fff', transition: 'color 0.3s' }}>{ind.name}</h3>
                    {activeIndustryIdx === i && (
                      <div style={{ marginTop: '20px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.8)' }}>{ind.desc}</p>
                        <Link href={ind.href} style={{ color: 'var(--color-teal)', fontWeight: '700', textDecoration: 'none', display: 'block', marginTop: '10px' }}>VIEW DETAILS →</Link>
                      </div>
                    )}
                  </div>
                )) : (
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading other industries...</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CAPABILITY MODAL OVERLAY ── */}
      {selectedCapability && MODAL_DATA_FINAL[selectedCapability] && (() => {
        const data = MODAL_DATA_FINAL[selectedCapability];
        return (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            overflowY: 'auto',
            padding: '40px 0'
          }}>
            {/* Top Navigation */}
            <div className="content-wrapper-lg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
              <button 
                onClick={() => setSelectedCapability(null)}
                style={{ background: 'none', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', cursor: 'pointer', opacity: 0.8 }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.8}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back to Practices
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ background: 'rgba(71,188,135,0.1)', color: 'var(--color-teal)', padding: '6px 16px', borderRadius: '30px', fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>
                  {industryData?.title?.toUpperCase() || 'OIL AND GAS'}
                </span>
                <button 
                  onClick={() => setSelectedCapability(null)}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            <div className="content-wrapper-lg">
              <h1 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '80px', maxWidth: '1000px', lineHeight: 1.1 }}>
                {data.mainTitle}
              </h1>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '60px' }}>
                {/* Left Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                  
                  {/* Overview Card */}
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '32px', padding: '48px', position: 'relative' }}>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <div style={{ width: '4px', background: 'var(--color-teal)', borderRadius: '2px' }} />
                      <div>
                        <span style={{ color: 'var(--color-teal)', fontSize: '14px', fontWeight: '800', letterSpacing: '2px', display: 'block', marginBottom: '24px' }}>OVERVIEW</span>
                        <p style={{ color: '#fff', fontSize: '20px', lineHeight: 1.6, fontWeight: '400', opacity: 0.9 }}>
                          {data.overview}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feature Image */}
                  {data.image && (
                    <div style={{ 
                      position: 'relative', 
                      borderRadius: '32px', 
                      overflow: 'hidden', 
                      aspectRatio: '21/9',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}>
                      <Image 
                        src={data.image} 
                        alt="Technical Feature" 
                        fill 
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        style={{ objectFit: 'cover' }} 
                        unoptimized 
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.6) 100%)' }} />
                    </div>
                  )}

                  {/* Siemens Tools */}
                  {data.tools && data.tools.length > 0 && (
                    <div>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '32px' }}>
                        <div style={{ width: '4px', height: '16px', background: 'var(--color-teal)', borderRadius: '2px' }} />
                        <span style={{ color: 'var(--color-teal)', fontSize: '14px', fontWeight: '800', letterSpacing: '2px' }}>SIEMENS TOOLS APPLIED</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {data.tools.map(tool => (
                          <span key={tool} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '12px 24px', borderRadius: '40px', fontSize: '14px', fontWeight: '600', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technical Sections */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    {data.technicalSections?.map((sec, idx) => (
                      <div key={idx} style={{ paddingLeft: '24px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                        <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{sec.title}</span>
                        <h4 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>{sec.subtitle}</h4>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{sec.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', display: 'block', marginBottom: '16px' }}>CAPABILITY</span>
                    <h5 style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>{selectedCapability}</h5>
                  </div>
                  
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', display: 'block', marginBottom: '16px' }}>POWERED BY</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-teal)' }} />
                      <span style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>Siemens Simcenter Suite</span>
                    </div>
                  </div>

                  <div style={{ 
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '24px', 
                    padding: '40px',
                    textAlign: 'center'
                  }}>
                    <h5 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Interested in this solution?</h5>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.5, marginBottom: '32px' }}>Our experts will design a simulation approach tailored to your engineering goals.</p>
                    <Link href="/contact-us" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      background: 'linear-gradient(90deg, #0dd0e1, #8fe03c)',
                      color: '#000', padding: '16px 32px', borderRadius: '40px',
                      fontSize: '15px', fontWeight: '800', textDecoration: 'none', transition: 'transform 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      Contact Us <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </main>
  );
}
