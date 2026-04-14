'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CAPABILITIES_DATA } from './data';

const NAV_SECTIONS = ['About Practice', 'Opportunities', 'Why Tridiagonal', 'Industries'];

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



const industries = [
  { 
    name: 'Pharma and Medical Devices', 
    desc: 'Accelerating product development and ensuring regulatory compliance through high-fidelity simulations of medical devices and mixing processes.', 
    href: '/industries/pharmaceutical/technology-validation-scale-up-centre',
    image: '/hubfs/image(34).png' 
  },
  { 
    name: 'Metals, Mining & Cement', 
    desc: 'Enhancing process reliability and reducing emissions in heavy manufacturing through multiphase flow analysis and heat transfer modeling.', 
    href: '/industries/metals/technology-validation-scale-up-centre',
    image: '/hubfs/Metals, Mining & Cement (1)-1.png' 
  },
  { 
    name: 'Food, Beverages & CPG', 
    desc: 'Optimizing continuous and batch processing, improving product consistency, and maximizing efficiency in high-volume consumer goods manufacturing.', 
    href: '/industries/fmcg/technology-validation-scale-up-centre',
    image: '/hubfs/grid-3.png' 
  },
  { 
    name: 'Chemicals & Petrochemicals', 
    desc: 'Resolving complex fluid dynamics and reaction kinetics to scale-up operations and improve yield in specialty and bulk chemicals.', 
    href: '/industries/chemical/technology-validation-scale-up-centre',
    image: '/hubfs/grid-1.png' 
  },
  { 
    name: 'Power & Renewables', 
    desc: 'Driving the new energy transition with advanced simulation of CCUS, green hydrogen production, and renewable infrastructure reliability.', 
    href: '/industries/power/technology-validation-scale-up-centre',
    image: '/hubfs/New energy.png' 
  },
  { 
    name: 'Others', 
    desc: 'Our advanced simulation capabilities span numerous other distinct workflows including water treatment, semiconductors, and specialized manufacturing.', 
    href: '/industries/technology-validation-scale-up-centre',
    image: '/hubfs/grid-2.png' 
  },
];

const whyItemsTech = [
  { 
    title: 'State of the Art Facility', 
    desc: '250k+ sq. ft. facility, Advanced equipment\'s, Lab & field scale testing, 24/7 utility', 
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M4 12h2"/><path d="M4 15h2"/><path d="M4 18h2"/>
      </svg>
    ) 
  },
  { 
    title: 'Domain Experts', 
    desc: '50+ domain experts with Masters, Ph.D.\'s, Consultants.', 
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ) 
  },
  { 
    title: 'Cost-Effective Solutions', 
    desc: 'Leverage cheap labour and pre-built loops tailored to client needs.', 
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ) 
  },
  { 
    title: 'Quick Turnaround', 
    desc: 'Quick testing, Single-window for analysis, verification, validation.', 
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ) 
  },
  { 
    title: 'Custom-Built Set-Up', 
    desc: 'Our EPC team creates custom skids quickly. Local network accelerates projects.', 
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ) 
  },
  { 
    title: 'Value Creation', 
    desc: 'Deploying sustainable practices to efficiently create and deliver value for customers.', 
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13"/><path d="M13 3l3 6-4 13"/>
      </svg>
    ) 
  }
];
;

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

export default function TechValidationPage() {
  const [activeSection, setActiveSection] = useState('About Practice');
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(null);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const sectionRefs = useRef({});

  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#1a1a1a' }}>

      {/* ── HERO ── */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: "url('/hubfs/Advanced%20Modeling%20Service%20Page%20Banner.png') center center / cover no-repeat",
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
            <span style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: '800', display: 'block' }}>Oil & Gas</span>
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
            Technology Validation &amp; <span className="gradient-text">Scale-up Centre</span>
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
            Serving Upstream, Midstream &amp; Downstream segment.
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
                <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Expertise & Experience</span>
              </div>
              <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '32px', lineHeight: 1.2 }}>
                Industry Overview
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.9', fontSize: '18px', fontWeight: '400' }}>
                  The Oil & Gas testing sector grapples with complex challenges like erosion, wax deposition, and multiphase flow dynamics. Specialized facilities are crucial for rigorous testing to address these operational hurdles. Environmental regulations and evolving technology demand emission reduction, profitability, and innovation, requiring continuous improvement of existing methods and introduction of new products.
                </p>
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
                src="/hubfs/Digital Twin.jpg"
                alt="Oil & Gas Infrastructure Visualization"
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

      {/* ── OPPORTUNITIES ── */}
      <section
        id="opportunities"
        data-section="Opportunities"
        ref={el => sectionRefs.current['Opportunities'] = el}
        style={{ padding: '80px 0', background: '#111' }}
      >
        <div className="content-wrapper-lg">
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Testing & Validation</span>
            </div>
            <h2 className="section-title" style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '20px' }}>
              Opportunities
            </h2>
            <p className="section-desc" style={{ color: '#fff', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', fontSize: '18px', fontWeight: '400', opacity: 0.8 }}>
              Tridiagonal offers innovative solutions for Oil & Gas challenges like erosion and wax deposition. Our specialized facilities enable comprehensive testing and analysis to optimize sand screen durability, enhance multiphase flow dynamics, and improve asset integrity against erosion-corrosion. Tridiagonal's expertise unlocks potential for advancements that boost operational efficiency and reliability in Oil & Gas production.
            </p>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .opp-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
            }
            @media (max-width: 1100px) {
              .opp-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 768px) {
              .opp-grid { grid-template-columns: 1fr; }
            }
            .opp-card {
              position: relative;
              background: #000;
              border-radius: 24px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              overflow: hidden;
              display: flex;
              flex-direction: column;
              min-height: 420px;
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              padding: 32px;
              justify-content: flex-end;
            }
            .opp-card:hover {
              transform: translateY(-8px);
              border-color: var(--color-teal);
              box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            }
            .opp-bg {
              position: absolute;
              inset: 0;
              background-size: cover;
              background-position: center;
              opacity: 0.5;
              transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s;
            }
            .opp-card:hover .opp-bg {
              opacity: 0.7;
              transform: scale(1.05);
            }
            .opp-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.95) 100%);
              transition: opacity 0.4s;
            }
            .opp-card:hover .opp-overlay {
              background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.98) 100%);
            }
          ` }} />

          <div className="opp-grid">
            {CAPABILITIES_DATA.map((cap, i) => {
              const isContactCard = cap.id === 'contact-us-card';
              return (
                <div key={i} className="opp-card"
                  style={isContactCard ? {
                    background: 'linear-gradient(135deg, #085d6e 0%, #1d7a4b 50%, #588e33 100%)',
                    border: 'none',
                    justifyContent: 'flex-start'
                  } : {}}
                >
                  <div className="opp-bg" style={{ 
                    backgroundImage: isContactCard ? 'none' : `url('${cap.img}')`,
                    opacity: isContactCard ? 0 : 0.5
                  }} />
                  <div className="opp-overlay" style={{
                    background: isContactCard ? 'transparent' : undefined
                  }} />
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {isContactCard && (
                      <div style={{ width: '40px', height: '3px', background: 'rgba(255,255,255,0.4)', marginBottom: '24px', borderRadius: '2px' }} />
                    )}
                    <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '16px', lineHeight: 1.3 }}>{cap.title}</h3>
                    <p style={{ color: isContactCard ? '#fff' : 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
                      {cap.desc}
                    </p>
                    
                    <Link 
                      href={cap.cta.link}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: isContactCard ? 'transparent' : 'linear-gradient(90deg, #0dd0e1, #8fe03c)',
                        border: isContactCard ? '1px solid #fff' : 'none',
                        color: isContactCard ? '#fff' : '#000', padding: '12px 32px', borderRadius: '30px',
                        fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px',
                        textDecoration: 'none', width: 'fit-content', cursor: 'pointer',
                        boxShadow: isContactCard ? 'none' : '0 4px 15px rgba(13,208,225,0.2)',
                        transition: 'transform 0.2s',
                        textTransform: 'uppercase'
                      }}
                    >
                      {cap.cta.label} <ArrowRight size={14} color={isContactCard ? '#fff' : "#000"} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY TRIDIAGONAL? ── */}
      <section
        id="why-tridiagonal"
        data-section="Why Tridiagonal"
        ref={el => sectionRefs.current['Why Tridiagonal'] = el}
        style={{ padding: '100px 0', background: '#111' }}
      >
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '24px' }}>Why Tridiagonal?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '1000px', margin: '0 auto', lineHeight: 1.6 }}>
              Tridiagonal Solutions, a top facility in Asia, offers cost-effective flow assurance testing for Oil & Gas majors. We are specialized in multiphase flow, erosion-corrosion, wax deposition, and sand management, etc. We collaborate with industry leaders, consultants, EPCs, OEMs and service providers, with flexible business models.
            </p>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .why-grid-tech {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              border: 1px solid rgba(255,255,255,0.08);
            }
            .why-cell-tech {
              padding: 60px 40px;
              border-right: 1px solid rgba(255,255,255,0.08);
              border-bottom: 1px solid rgba(255,255,255,0.08);
              transition: all 0.3s;
              background: transparent;
            }
            .why-cell-tech:nth-child(3n) { border-right: none; }
            .why-cell-tech:nth-child(n+4) { border-bottom: none; }
            .why-cell-tech:hover {
              background: rgba(71,188,135,0.03);
            }
            @media (max-width: 1024px) {
              .why-grid-tech { grid-template-columns: repeat(2, 1fr); }
              .why-cell-tech:nth-child(3n) { border-right: 1px solid rgba(255,255,255,0.08); }
              .why-cell-tech:nth-child(2n) { border-right: none; }
              .why-cell-tech:nth-child(n+4) { border-bottom: 1px solid rgba(255,255,255,0.08); }
              .why-cell-tech:nth-child(n+5) { border-bottom: none; }
            }
            @media (max-width: 768px) {
              .why-grid-tech { grid-template-columns: 1fr; }
              .why-cell-tech { border-right: none !important; }
              .why-cell-tech:not(:last-child) { border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
            }
          `}} />

          <div className="why-grid-tech">
            {whyItemsTech.map((item, i) => (
              <div key={i} className="why-cell-tech">
                <div style={{ color: 'var(--color-teal)', marginBottom: '24px' }}>{item.icon}</div>
                <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── INDUSTRIES ── */}
      <section
        id="industries"
        data-section="Industries"
        ref={el => sectionRefs.current['Industries'] = el}
        style={{ padding: '100px 0', background: '#1c1c1c' }}
      >
        <div className="content-wrapper-lg">
          <div className="inds-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '80px' }}>
            <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
              <h2 className="section-title" style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700' }}>Industries</h2>
              <p style={{ color: '#fff', opacity: 0.9, fontSize: '18px' }}>Your Trusted Partner in Modeling & Simulation.</p>
              <div style={{ width: '100%', aspectRatio: '1/1.1', borderRadius: '40px', overflow: 'hidden', position: 'relative', marginTop: '40px' }}>
                <Image 
                  src={industries[activeIndustryIdx || 0].image} 
                  alt="industry" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: 'cover' }} 
                  unoptimized 
                />
              </div>
            </div>
            <div onMouseLeave={() => setActiveIndustryIdx(null)}>
              {industries.map((ind, i) => (
                <div key={ind.name} onMouseEnter={() => setActiveIndustryIdx(i)} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '30px 0', cursor: 'pointer' }}>
                  <h3 style={{ color: activeIndustryIdx === i ? 'var(--color-teal)' : '#fff', transition: 'color 0.3s' }}>{ind.name}</h3>
                  {activeIndustryIdx === i && (
                    <div style={{ marginTop: '20px' }}>
                      <p style={{ color: 'rgba(255,255,255,0.8)' }}>{ind.desc}</p>
                      <Link href={ind.href} style={{ color: 'var(--color-teal)', fontWeight: '700', textDecoration: 'none', display: 'block', marginTop: '10px' }}>VIEW DETAILS →</Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITY MODAL OVERLAY ── */}
      {selectedCapability && MODAL_DATA[selectedCapability] && (() => {
        const data = MODAL_DATA[selectedCapability];
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
                  OIL AND GAS
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

                  {/* Technical Sections */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    {data.technicalSections.map((sec, idx) => (
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

                  <div 
                    id="contact-us"
                    style={{ 
                      background: 'linear-gradient(135deg, #085d6e 0%, #1d7a4b 50%, #588e33 100%)', 
                      borderRadius: '40px', 
                      padding: '80px 60px',
                      textAlign: 'left',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
                    }}
                  >
                    <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.3)', marginBottom: '40px', borderRadius: '2px' }} />
                    
                    <h2 style={{ 
                      color: '#fff', 
                      fontSize: 'clamp(2rem, 4vw, 3.2rem)', 
                      fontWeight: '700', 
                      marginBottom: '60px', 
                      lineHeight: 1.1,
                      maxWidth: '800px'
                    }}>
                      To know more about our practice areas, contact us today!
                    </h2>

                    <Link href="/contact-us" style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.6)',
                      color: '#fff', padding: '16px 40px', borderRadius: '40px',
                      fontSize: '18px', fontWeight: '600', textDecoration: 'none', transition: 'all 0.3s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }}
                    >
                      Contact Us <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
