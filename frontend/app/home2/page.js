'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─── Inline SVG helpers ─── */
function ArrowRight({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59l-2.13-2.13a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
    </svg>
  );
}

function LongArrowRight({ size = 18, color = '#fff', strokeWidth = 2.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

/* ─── Counter animation hook ─── */
function useCounter(target, duration = 2000, startWhen = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startWhen) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startWhen]);
  return count;
}

/* ─── Intersection Observer hook ─── */
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

/* ─── Counter pill ─── */
function Counter({ value, suffix = '+', label, inView }) {
  const count = useCounter(value, 2200, inView);
  return (
    <div className="counter-item">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
        <span className="counter-number">{count.toLocaleString()}</span>
        <span className="counter-suffix">{suffix}</span>
      </div>
      <p className="counter-label">{label}</p>
    </div>
  );
}

/* ============================================================
   DATA
   ============================================================ */

const serviceCards = [
  {
    num: '01',
    title: 'Advanced Modeling & Simulation (CFD/FEA)',
    desc: 'Computational Fluid Dynamics (CFD), Discrete Element Modeling (DEM), Finite Element Analysis (FEA), Fluid Structure Interaction (FSI), Reduced Order Modeling (ROM), Digital Twin.',
    href: '/services/modeling',
    bg: '#383838',
  },
  {
    num: '02',
    title: 'Technology Validation & Scale-up Centre',
    desc: 'Flow Assurance Studies, Erosion, Corrosion, Wax deposition, Sand transportation, Hydrates, Green Hydrogen testing, Asphaltene studies.',
    href: '/services/scale-up',
    bg: '#1a1a1a',
  },
  {
    num: '03',
    title: 'Software Solutions',
    desc: 'Mixing Analysis (MixIT), SimSight (for Scale-up, Tech transfer, Asset characterization), Pipeline Erosion Risk Mitigation Tool (PERMIT).',
    href: 'https://tridiagonalsoftware.com',
    external: true,
    bg: '#383838',
  },
  {
    num: '04',
    title: 'Digital Transformation – Tridiagonal.ai',
    desc: 'At Tridiagonal.ai, we deliver next-gen AI and hybrid digital solutions for process industries leveraging domain expertise tightly coupled with Agentic AI.',
    href: 'https://tridiagonal.ai',
    external: true,
    bg: '#1a1a1a',
    cta: 'Visit Tridiagonal.ai',
  },
  {
    num: '05',
    title: 'Partner Solutions',
    desc: 'Siemens Simcenter, FactSage (thermochemical simulations), Coreform — seamlessly integrate validated third-party software directly into your ecosystem.',
    href: '/partner-solutions',
    bg: '#383838',
  },
];

const wwCards = [
  {
    title: 'Technology Catalyst',
    desc: 'We are at the forefront of driving technological advancements, innovation, and transformation within process industry. We have been playing a catalyst role in leveraging advanced technologies to execute, implement and deploy solutions to address business problems of our customers.',
    bg: 'url("/hubfs/image%20(10).png")',
  },
  {
    title: 'Operations Excellence',
    desc: "With 16+ years of experience in delivering advanced solutions for multiple industries, we have developed implementation best practices. The combination of our skill sets, and technology understanding enables us to support our customers' operational excellence initiatives.",
    bg: 'url("/hubfs/image%20(12).png")',
  },
  {
    title: 'Sustainability',
    desc: 'Tridiagonal Solutions is committed to implementing sustainable practices in its operations. We support Innovation enablement programs for CCUS, Green Hydrogen and more across Scope 1 & 2 energy optimization and GHG reporting.',
    bg: 'url("/hubfs/image%20(11).png")',
  },
];


const counters = [
  { value: 2000, suffix: ' +', label: 'Multi-domain Projects' },
  { value: 300,  suffix: ' +', label: 'Consultants Combination of Skillsets' },
  { value: 100,   suffix: ' +M$', label: 'Customer Savings' },
  { value: 250000,  suffix: ' +Sq.ft', label: 'Testing Lab For Oil & Gas' },
];

const clientLogos = [
  'Shell', 'BASF', 'Siemens', 'SABIC', 'Total', 'ExxonMobil', 'Dow', 'AkzoNobel', 'Honeywell', 'ABB',
];

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default function HomePage() {
  const videoRef = useRef(null);
  const [counterRef, counterInView] = useInView(0.3);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [resourceSlide, setResourceSlide] = useState(0);
  const [resInTransition, setResInTransition] = useState(true);
  const [resRef, resInView] = useInView(0.2);

  const heroResourceSlides = [
    { type: 'BLOGS', title: 'Fluid Structure Interaction Analysis (FSI):\nMaximizing Efficiency and Safety in Critical Industries', desc: 'In the fast-paced industrial landscape, the challenges faced by sectors such as oil and gas, crude refining, power...', image: '/hubfs/CFD FEA Coupled-1.png' },
    { type: 'WEBINARS', title: 'Advanced CFD Modeling For Reactor Safety', desc: 'Discover how computational modeling is preventing catastrophic failures and streamlining the maintenance of critical systems...', image: '/hubfs/Blog CFD DEM.png' },
    { type: 'CASE STUDIES', title: 'Enhancing Asphaltene Testing Methodologies', desc: 'A deep dive into scalable strategies to enhance extraction rates while managing long-term flow assurance concerns...', image: '/hubfs/Asphaltene Blog.png' },
  ];

  const [useCasesSlide, setUseCasesSlide] = useState(0);
  const [useCasesInTransition, setUseCasesInTransition] = useState(true);

  const workOnCards = [
    { title: 'Computational Fluid Dynamics (CFD)', desc: 'Fluid flow analysis, Multiphase flow analysis, Combustion modeling, Aerodynamics & heat transfer analysis, Mixing & separation process studies, Emission control', icon: '/images/quarkus-svgrepo-com.svg', bg: '#16333c' },
    { title: 'Discrete Element Method (DEM)', desc: 'Granular material behavior simulation, Tablet compression & coating, Powder handling & mixing, Crystallization & spray drying, Packaging & supply chain optimization, Process safety & efficiency improvement', icon: '/hubfs/medicine-health-medical-drug-pharmacy-pill-capsule-svgrepo-com.svg', bg: '#25352c' },
    { title: 'Finite Element Analysis (FEA)', desc: 'Structural integrity assessment, Fatigue failure analysis, Thermal & static analysis, Dynamic & non-linear analysis, Heat transfer & temperature distribution, Coupled FEA–CFD–DEM studies', icon: '/hubfs/Optimized-Images-Solution/home/AI-based Process Optimization and Control home.svg', bg: '#363c26' },
    { title: 'New Energy Testing (TRL 3-9) CCUS and Green Hydrogen', desc: 'Advancing Technology from TRL3 to TRL 9, CCUS-Carbon Capture Utilization and Storage, Enhanced Oil Recovery (EOR), Sustainable Energy Transition, Carbon Offset Implementation, Green Hydrogen Technology Testing & Validation, Renewable Power Integration Battery Testing.', icon: '/images/New Energy Testing (TRL 3-9) CCUS and Green Hydrogen.svg', bg: '#16333c' },
    { title: 'Sand Blast Testing', desc: 'Coating thickness loss evaluation, Weight & thickness gauge measurement, Sand impingement cell testing, Variable airflow (10–50 m/s), Particle size control (>100 μm), Sand rate adjustment (>1 Kg/h), Impingement angle variation (0–90°)', icon: '/hubfs/sand-clock-svgrepo-com.svg', bg: '#25352c' },
    { title: 'Asphaltene Testing Facility', desc: 'Enhance asphaltene management with our advanced global testing capabilities, designed to evaluate deposition behavior and optimize flow assurance strategies.', icon: '/hubfs/Optimized-Images-Solution/home/Scale-up and Tech Transfer home.svg', bg: '#363c26' },
    { title: 'Multiphase flow and combustion modeling', desc: 'It includes Analyze two-phase flow of steam and water in boilers, simulate the flow of oil, water, and gas through a subsea pipeline and maximize the separation efficiency, whereas Combustion modeling includes flame impingement on radiant tube section leads to high tube metal temperatures which cause tube deformation, distortion, and rupture. And to study temperature distribution. We are using tools like ANSYS and Star CCM for simulation', icon: '/hubfs/Optimized-Images-Solution/home/Multiphase flow & combustion modeling home.svg', bg: '#16333c' },
    { title: 'Fluid-Structure Interaction', desc: 'Simulating the complex interplay between fluids and structures using effective coupling of CFD and FEA. We do static structural analysis to check safety of separator under high pressure operating condition. We are using tools like ANSYS, Star CCM and LS Dyna for simulation.', icon: '/hubfs/Optimized-Images-Solution/home/Fluid-structure interaction home.svg', bg: '#25352c' },
    { title: 'Flow assurance Testing (Wax, Erosion, Corrosion)', desc: 'Wax Mitigation, Asphaltene Management, Sand Management, Liquid Metal, Hydrate & CO2 Transport, Pipeline Flow Analysis, Flow Regime Identification, Inhibitor Screening, Slurry Rheology, and Erosion testing(Screen, Valve, elbows, joints, pipes, etc), Sand Blast, Sand Retention, and ICD Testing.', icon: '/hubfs/Optimized-Images-Solution/home/Flow assurance Testing (Wax, Erosion, Corrosion) home.svg', bg: '#363c26' },
  ];

  const useCasesCards = [
    { title: 'Simulating Data Centers using CoolSim', image: '/hubfs/Office Space Ventilation_ (1).png', customGradient: 'linear-gradient(135deg, #00d2ff 0%, #a4e03d 100%)' },
    { title: 'Frequency Response Analysis of Sparger', image: '/hubfs/Sparger.png', isCaseStudy: true, customGradient: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)' },
    { title: 'Improving the Performance of Induced Gas Flotation Unit', image: '/hubfs/Digital Twin.jpg', customGradient: 'linear-gradient(135deg, #0d324d 0%, #00d2ff 100%)' },
    { title: 'CFD Modeling of Mixing Systems', image: '/hubfs/CFD Analysis of a Neutralization Tank _.png', customGradient: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)' },
  ];

  // Auto-scroll Use Cases slider (continuous loop)
  useEffect(() => {
    const timer = setInterval(() => {
      setUseCasesInTransition(true);
      setUseCasesSlide((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Handle snapping back for seamless infinite scroll (Use Cases)
  useEffect(() => {
    if (useCasesSlide === useCasesCards.length) {
      const timeout = setTimeout(() => {
        setUseCasesInTransition(false); // Disable transition for snap
        setUseCasesSlide(0);            // Instantly jump to true first slide
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [useCasesSlide, useCasesCards.length]);

  // Auto-scroll resource slider (continuous loop)
  useEffect(() => {
    const timer = setInterval(() => {
      setResInTransition(true);
      setResourceSlide((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Handle snapping back for seamless infinite scroll
  useEffect(() => {
    if (resourceSlide === heroResourceSlides.length) {
      const timeout = setTimeout(() => {
        setResInTransition(false); // Disable transition for snap
        setResourceSlide(0);       // Instantly jump to true first slide
      }, 500); // 500ms matches transform transition duration
      return () => clearTimeout(timeout);
    }
  }, [resourceSlide, heroResourceSlides.length]);

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>

      {/* ============================================================
          1. HERO
          ============================================================ */}
      <section
        className="hero-section"
        style={{ paddingTop: 0 }}
        aria-label="Hero"
      >
        {/* Video background */}
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/hubfs/home-hero-video-1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay" aria-hidden="true" />

        <div className="content-wrapper-xl" style={{ position: 'relative', zIndex: 10, width: '100%', marginTop: '60px' }}>
          <h1 className="hero-title fade-in-up delay-100">
            Process Consulting and<br />
            <span className="gradient-text">Technology Solutions</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: '#fff', fontWeight: '500', fontSize: '1.25rem', marginTop: '1rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            We deliver ‘Value’ by leveraging advanced technologies to address process related challenges.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }} className="fade-in-up delay-300">
            <a href="#services" className="btn-primary">
              LEARN MORE <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#services" className="scroll-indicator" aria-label="Scroll down">
          <div className="scroll-arrow" />
          <div className="scroll-arrow" />
          <div className="scroll-arrow" />
        </a>
      </section>

      {/* ============================================================
          2. OUR SERVICES
          ============================================================ */}
      <section id="services" className="services-section" style={{ padding: '0' }} aria-labelledby="services-heading">
        {/* Section heading */}
        <div className="content-wrapper-lg" style={{ paddingTop: '80px', paddingBottom: '48px' }}>
          <div className="dvr-line" />
          <h2 id="services-heading" className="section-title">Our Services</h2>
        </div>

        {/* Cards grid */}
        <div className="services-grid" role="list">
          {serviceCards.map((card) => (
            <div key={card.num} className="service-card-wrap" role="listitem">
              <Link
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                style={{ display: 'block', height: '100%' }}
              >
                <article className="service-card" style={{ background: card.bg }}>
                  <div className="service-card-gradient-overlay" aria-hidden="true" />
                  <div className="service-card-content">
                    <div className="service-card-number">{card.num}</div>
                    <div>
                      <h3 className="service-card-title">{card.title}</h3>
                      <p className="service-card-desc">{card.desc}</p>
                      <div className="service-card-cta" aria-hidden="true">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}

          {/* 6th card: Contact CTA */}
          <div className="service-card-wrap" role="listitem">
            <Link href="/contact" style={{ display: 'block', height: '100%' }}>
              <article
                className="service-cta-card"
                style={{ background: '#242424', position:'relative', overflow:'hidden' }}
              >
                <div
                  className="service-card-gradient-overlay"
                  style={{ opacity: 0.6 }}
                  aria-hidden="true"
                />
                <div className="service-cta-card-content">
                  <div className="dvr-line" />
                  <h3 className="service-card-title" style={{ fontSize: '1.35rem' }}>
                    To know more about our practice areas, contact us today!
                  </h3>
                </div>
                <div style={{ position:'relative', zIndex:2 }}>
                  <span className="btn-outline-white" style={{ fontSize:'0.9rem', padding:'10px 22px' }}>
                    Contact Us <ArrowRight size={14} />
                  </span>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. WHO WE ARE
          ============================================================ */}
      <section aria-labelledby="wwa-heading" className="wwa-section">
        <div className="content-wrapper-lg">
          <div className="dvr-line" />
          <h2 id="wwa-heading" className="section-title">Who We Are</h2>
          <p className="section-desc">Leveraging advanced technologies to support process industry needs.</p>
        </div>

        <div className="wwa-grid" role="list">
          {wwCards.map((card) => (
            <article
              key={card.title}
              className="wwa-card"
              style={{ background: card.bg }}
              role="listitem"
            >
              <div className="wwa-card-content">
                <div>
                  <h3 className="wwa-card-title">{card.title}</h3>
                  <p className="wwa-card-desc">{card.desc}</p>
                </div>
                <button suppressHydrationWarning
                  className="btn-outline-white"
                  style={{ fontSize: '16px', fontWeight: 700, padding: '12px 24px', cursor: 'pointer', letterSpacing: '0.05em', alignSelf: 'flex-start' }}
                  aria-label={`View more about ${card.title}`}
                >
                  VIEW MORE <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================
          3.5. WHAT WOULD YOU LIKE TO WORK ON?
          ============================================================ */}
      <section aria-label="What would you like to work on?" style={{ background: '#1c1f20', padding: '80px 0' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title" style={{ color: 'var(--color-teal)', fontSize: '40px', fontWeight: '700', marginBottom: '15px' }}>
              What would you like to work on?
            </h2>
            <p className="section-desc" style={{ color: '#fff', fontSize: '18px', opacity: 0.9 }}>
              Execution and Implementation partner for your business problems.
            </p>
          </div>

          <div className="work-cards-grid">
            {workOnCards.map((card, idx) => (
              <Link href="#" key={idx} className="work-card" style={{ background: card.bg }}>
                <img src={card.icon} alt={card.title} className="work-card-icon" />
                <h4 className="work-card-title">{card.title}</h4>
                <p className="work-card-desc">{card.desc}</p>
                <div className="work-card-btn">
                  <LongArrowRight size={16} strokeWidth={3} color="#fff" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          4. TWO-COLUMN SPLIT (Solutions / Scale up)
          ============================================================ */}
      <section className="two-col-section section-pad" aria-label="Brand Identity" style={{ backgroundColor: '#242424' }}>
        <div className="content-wrapper-lg">
          <div className="two-col-grid" style={{ alignItems: 'center', gap: '3rem' }}>
            {/* Text side */}
            <div>
              <h2 className="section-title" style={{ color: 'var(--color-teal)', marginBottom: '1.25rem', fontSize: '50px' }}>
                Unveiling Our New<br />Brand Identity
              </h2>
              <p className="section-desc" style={{ color: '#fff', fontSize: '18px', lineHeight: 1.6, marginBottom: '2rem' }}>
                Welcome To Tridiagonal Solutions Fresh look! Check out our journey of delivering process excellence.
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                 <img src="/hubfs/old_new_tridiagonal.webp" alt="Tridiagonal Old and New Logo" style={{ maxWidth: '320px', height: 'auto', display: 'block', borderRadius: '4px' }} />
              </div>

              <Link href="/events/tridiagonal-solutions-new-identity" 
                className="btn-primary" 
                style={{ background: 'var(--gradient-brand)', color: '#000', fontWeight: '700', textTransform: 'uppercase', padding: '12px 28px', border: 'none' }}>
                READ MORE <ArrowRight size={15} color="#000" />
              </Link>
            </div>

            {/* Video thumbnail side */}
            <div className="video-thumb-wrap" style={{ cursor: 'pointer' }} onClick={() => setIsVideoOpen(true)}>
              <div
                style={{
                  width: '100%',
                  height: '420px',
                  background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/hubfs/Capture-1.webp") center/cover no-repeat',
                  backgroundColor: '#ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius:'16px',
                  position:'relative',
                  overflow:'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}
              >
                <div className="video-play-btn" style={{ position:'relative', zIndex:2, background: 'rgba(255,255,255,0.9)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-teal)" aria-hidden="true" style={{ marginLeft: '4px' }}>
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsVideoOpen(false)}>
            <div style={{ width: '90%', maxWidth: '900px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
               <button suppressHydrationWarning 
                 onClick={() => setIsVideoOpen(false)}
                 style={{ position: 'absolute', top: '-40px', right: '0', background: 'transparent', color: '#fff', border: 'none', fontSize: '32px', cursor: 'pointer' }}>
                 &times;
               </button>
               <video 
                 controls 
                 autoPlay 
                 style={{ width: '100%', height: 'auto', borderRadius: '8px', outline: 'none', background: '#000' }}>
                 <source src="/hubfs/brand_video.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
            </div>
          </div>
        )}
      </section>

      {/* ============================================================
          6. KEY HIGHLIGHTS – Counters
          ============================================================ */}
      <section className="counters-section section-pad" ref={counterRef} aria-labelledby="counters-heading">
        <div className="content-wrapper-lg">
          <div className="counters-layout">
            {/* Left text */}
            <div>
              <h2 id="counters-heading" className="section-title" style={{ color: 'var(--color-teal)', marginBottom: '1.25rem', fontSize: '56px' }}>Key Highlights</h2>
              <p className="section-desc" style={{ color: '#fff', lineHeight: 1.6, marginBottom: '2.5rem', fontSize:'20px', paddingRight: '20px' }}>
                16+ years process consulting experience using advanced technologies
              </p>
              <Link href="/about-us" className="btn-primary" style={{ background: 'var(--gradient-brand)', color: '#000', fontWeight: '700', textTransform: 'uppercase', padding: '14px 32px', borderRadius: '40px', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                ABOUT US <ArrowRight size={15} color="#000" />
              </Link>
            </div>

            {/* Counters grid */}
            <div className="counters-grid">
              {counters.map((c) => (
                <Counter key={c.label} value={c.value} suffix={c.suffix} label={c.label} inView={counterInView} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          8.9. USE CASES SECTION
          ============================================================ */}
      <section aria-label="Use Cases" style={{ background: '#242424', padding: '80px 0', overflow: 'hidden' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
            
            {/* Left Column: Heading & Text */}
            <div style={{ flex: '0 0 350px', display: 'flex', flexDirection: 'column' }}>
              <div className="dvr-line" style={{ marginBottom: '16px' }} />
              <h2 className="section-title" style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700', lineHeight: 1.1, marginBottom: '20px' }}>
                Use Cases
              </h2>
              <p className="section-desc" style={{ color: '#fff', opacity: 0.9, fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
                Despite of ever-evolving industries and complex value chains, digital engineering and experimental methods remain key to solving design, operational, and scale-up challenges. The following use cases highlight the application of Advanced Modeling & Simulation and Experimental Lab Scale-up in solving critical problems across diverse domains.
              </p>
              <div style={{ marginTop: '0px' }}>
                <Link href="/use-cases" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'var(--gradient-brand)', color: '#000',
                  fontWeight: '700', textTransform: 'uppercase',
                  padding: '12px 24px', borderRadius: '40px',
                  fontSize: '13px', letterSpacing: '0.04em', textDecoration: 'none'
                }}>
                  VIEW MORE <ArrowRight size={14} color="#000" />
                </Link>
              </div>
            </div>

            {/* Right Column: Carousel */}
            <div style={{ flex: '1', minWidth: '0', position: 'relative', overflow: 'hidden' }}>
              <div style={{ 
                display: 'flex', transition: useCasesInTransition ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none', 
                transform: `translateX(-${useCasesSlide * (100 / (useCasesCards.length + 3))}%)`, 
                width: `calc(${(useCasesCards.length + 3)} * var(--uc-slide-width, 33.3333%))` 
              }}>
                {[...useCasesCards, useCasesCards[0], useCasesCards[1], useCasesCards[2]].map((card, idx) => (
                  <div className="use-cases-slide" key={idx} style={{ flex: `0 0 ${100 / (useCasesCards.length + 3)}%`, minWidth: 0, padding: '0 10px', display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Image / Card Container */}
                    <div style={{ 
                      borderRadius: '24px', 
                      background: card.customGradient || (card.isCaseStudy ? 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)' : 'transparent'),
                      padding: card.isCaseStudy ? '4px' : '3px',
                      marginBottom: '20px',
                      display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0
                    }}>
                      <div style={{ 
                        background: card.isCaseStudy ? '#fff' : '#1c1c1c', 
                        borderRadius: '20px', overflow: 'hidden', height: 'auto', minHeight: '300px',
                        position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', minWidth: 0
                      }}>
                        {card.isCaseStudy ? (
                          <>
                            <p style={{ color: '#000', fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px', position: 'absolute', top: '20px', textTransform: 'uppercase' }}>CASE STUDY</p>
                            <div style={{ position: 'relative', width: '100%', maxWidth: '250px', aspectRatio: '1/1', marginTop: '30px' }}>
                              <Image src={card.image} alt={card.title} fill style={{ objectFit: 'contain' }} unoptimized />
                            </div>
                          </>
                        ) : (
                          <Image src={card.image} alt={card.title} fill style={{ objectFit: 'cover' }} unoptimized />
                        )}
                      </div>
                    </div>

                    <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '500', lineHeight: 1.4, minHeight: '50px', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                      {card.title}
                    </h3>
                    
                    <button suppressHydrationWarning onClick={() => {
                        setUseCasesInTransition(true);
                        setUseCasesSlide(idx % useCasesCards.length);
                      }} style={{
                      marginTop: '20px', width: '40px', height: '40px', borderRadius: '50%',
                      background: 'var(--color-teal)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', flexShrink: 0
                    }}>
                      <ArrowRight size={18} color="#000" />
                    </button>
                    
                  </div>
                ))}
              </div>

              {/* Slider Dots */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
                {useCasesCards.map((_, idx) => (
                  <button suppressHydrationWarning
                    key={idx}
                    onClick={() => {
                      setUseCasesInTransition(true);
                      setUseCasesSlide(idx);
                    }}
                    style={{
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: (useCasesSlide === useCasesCards.length ? 0 : useCasesSlide) === idx ? 'var(--color-teal)' : '#fff',
                      border: 'none', cursor: 'pointer', padding: 0,
                      opacity: (useCasesSlide === useCasesCards.length ? 0 : useCasesSlide) === idx ? 1 : 0.8
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          9. TECHNOLOGY PARTNERS SECTION
          ============================================================ */}
      <section aria-label="Technology Partners" style={{ background: '#1a1a1a', padding: '80px 0 40px 0' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Title */}
            <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '400', marginBottom: '40px', marginTop: 0 }}>
              Technology Partners
            </h3>
            
            {/* Logos - Infinite Scrolling Marquee */}
            <div className="marquee-container" style={{ marginBottom: '40px', padding: '10px 0' }}>
              <div className="marquee-content">
                {/* Render 4 identical groups to ensure enough width for ultra-wide screens and perfect 50% translation looping */}
                {[...Array(4)].map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '80px', paddingRight: '80px' }}>
                    <img src="/hubfs/coreform-logo.png" alt="Coreform" style={{ height: '35px', width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
                    <img src="/hubfs/siemens-logo.png" alt="Siemens" style={{ height: '50px', width: 'auto', objectFit: 'contain', filter: 'brightness(10)', flexShrink: 0 }} />
                    <img src="/hubfs/factsage-logo.png" alt="FactSage" style={{ height: '45px', width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
                    <img src="/hubfs/coreform-logo.png" alt="Coreform" style={{ height: '35px', width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
                    <img src="/hubfs/siemens-logo.png" alt="Siemens" style={{ height: '50px', width: 'auto', objectFit: 'contain', filter: 'brightness(10)', flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <Link href="/partner-solutions" style={{
              display: 'inline-block',
              background: 'var(--gradient-brand)', color: '#000',
              fontWeight: '700', textTransform: 'uppercase',
              padding: '14px 32px', borderRadius: '40px',
              fontSize: '13px', letterSpacing: '0.04em', textDecoration: 'none'
            }}>
              EXPLORE OUR PARTNER ECOSYSTEM
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          9.4. RESOURCES SECTION
          ============================================================ */}
      <section aria-label="Resources" style={{ background: '#242424', padding: '80px 0' }} ref={resRef}>
        <div className="content-wrapper-lg">
          <div className="resources-layout">
            
            {/* Left Column: Text & Buttons */}
            <div className="resources-left">
              <div className={`dvr-line ${resInView ? 'fade-in-up' : ''}`} style={{ marginBottom: '16px', opacity: resInView ? 1 : 0 }} />
              <h2 className={`section-title ${resInView ? 'fade-in-up delay-100' : ''}`} style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700', lineHeight: 1.1, marginBottom: '20px', opacity: resInView ? 1 : 0 }}>
                Resources
              </h2>
              <p className={`section-desc ${resInView ? 'fade-in-up delay-200' : ''}`} style={{ color: '#fff', opacity: resInView ? 0.9 : 0, transition: 'opacity 0.6s', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px', maxWidth: '400px' }}>
                Explore the best practices and success stories of application of technology in process industry
              </p>

              <div className={resInView ? 'fade-in-up delay-300' : ''} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px', opacity: resInView ? 1 : 0 }}>
                {['USE CASES', 'WEBINARS', 'BLOGS', 'BROCHURE', 'PUBLICATIONS'].map((item) => (
                  <Link href="#" key={item} className="resource-link-card" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 20px', background: '#2d2d2d', borderRadius: '4px',
                    borderLeft: '2px solid var(--color-teal)', color: 'var(--color-teal)',
                    textDecoration: 'none', fontWeight: '800', letterSpacing: '0.02em', fontSize: '18px'
                  }}>
                    {item} <ArrowRight size={16} color="var(--color-teal)" />
                  </Link>
                ))}
              </div>

              <span className={resInView ? 'fade-in-up delay-400' : ''} style={{ opacity: resInView ? 1 : 0 }}>
                <Link href="/resources" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'var(--gradient-brand)', color: '#000',
                  fontWeight: '700', textTransform: 'uppercase',
                  padding: '12px 24px', borderRadius: '40px',
                  fontSize: '13px', letterSpacing: '0.04em', textDecoration: 'none'
                }}>
                  ALL RESOURCES <ArrowRight size={14} color="#000" />
                </Link>
              </span>
            </div>

            {/* Right Column: Dynamic Slider Card */}
            <div className="resources-right">
              <div style={{ 
                background: 'var(--gradient-brand)',
                padding: '4px', borderRadius: '16px', width: '100%',
                boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
              }}>
                <div style={{ 
                  background: '#242424', borderRadius: '14px', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column', minHeight: '520px',
                  position: 'relative'
                }}>
                  {/* Slider */}
                  <div style={{
                    display: 'flex', width: `${(heroResourceSlides.length + 1) * 100}%`,
                    transform: `translateX(-${resourceSlide * (100 / (heroResourceSlides.length + 1))}%)`,
                    transition: resInTransition ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none', height: '100%'
                  }}>
                    {[...heroResourceSlides, heroResourceSlides[0]].map((slide, idx) => (
                      <div key={idx} style={{ width: `${100 / (heroResourceSlides.length + 1)}%`, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {/* Top Image Box */}
                        <div className="resource-card-image" style={{ position: 'relative', background: '#ccc' }}>
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            unoptimized={true}
                          />
                          <div style={{
                            position: 'absolute', top: '20px', left: '20px',
                            background: 'var(--color-teal)', color: '#fff', fontSize: '11px',
                            fontWeight: '700', textTransform: 'uppercase', padding: '6px 14px',
                            borderRadius: '20px', letterSpacing: '0.05em'
                          }}>
                            {slide.type}
                          </div>
                        </div>

                        {/* Bottom Text Box */}
                        <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', background: '#1c1c1c' }}>
                          <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', lineHeight: 1.4, marginBottom: '12px', whiteSpace: 'pre-line' }}>
                            {slide.title}
                          </h3>
                          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
                            {slide.desc}
                          </p>
                          <div style={{ marginTop: 'auto' }}>
                            <Link href="#" style={{
                              display: 'inline-flex', alignItems: 'center', gap: '8px',
                              background: 'var(--gradient-brand)', color: '#000', // Making text black like the original design requested earlier
                              fontWeight: '700', textTransform: 'uppercase',
                              padding: '10px 24px', borderRadius: '40px',
                              fontSize: '12px', letterSpacing: '0.04em', textDecoration: 'none'
                            }}>
                              READ MORE <ArrowRight size={14} color="#000" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slider Dots below the card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
                {heroResourceSlides.map((_, idx) => (
                  <button suppressHydrationWarning
                    key={idx}
                    onClick={() => {
                      setResInTransition(true);
                      setResourceSlide(idx);
                    }}
                    style={{
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: (resourceSlide === heroResourceSlides.length ? 0 : resourceSlide) === idx ? 'var(--color-teal)' : '#fff',
                      border: 'none', cursor: 'pointer', padding: 0,
                      opacity: (resourceSlide === heroResourceSlides.length ? 0 : resourceSlide) === idx ? 1 : 0.8
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          9.5. CULTURE & PEOPLE — Masonry Grid
          ============================================================ */}
      <section aria-label="Explore Our Culture and People" style={{ background: '#1a1a1a', padding: '40px 0 80px 0' }}>
        <div className="content-wrapper-lg">
          {/* Header */}
          <div style={{ marginBottom: '48px' }}>
            <div className="dvr-line" style={{ marginBottom: '16px' }} />
            <h2 className="section-title" style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700', lineHeight: 1.2, marginBottom: '16px' }}>
              Explore Our Culture and People
            </h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: 1.7, maxWidth: '620px' }}>
              Are you seeking an exciting role that will challenge and inspire you? Work with diverse and driven people on global projects that are truly shaping the process industry. Seize the opportunity to learn, grow, and realize your ambitions.
            </p>
          </div>

          {/* Masonry Grid — exactly matching the reference layout */}
          <div className="culture-masonry-grid">
            {/* LEFT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Box: Looking to Work with us? */}
              <div style={{
                background: '#242424',
                borderRadius: '16px',
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '200px',
              }}>
                <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '28px' }}>
                  Looking to Work with us?
                </h3>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link href="/careers" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'var(--gradient-brand)', color: '#000',
                    fontWeight: '700', textTransform: 'uppercase',
                    padding: '12px 24px', borderRadius: '40px',
                    fontSize: '14px', letterSpacing: '0.04em', textDecoration: 'none',
                  }}>
                    VIEW OPENING <ArrowRight size={14} color="#000" />
                  </Link>
                  <Link href="/about-us" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'transparent', color: '#fff',
                    fontWeight: '600', textTransform: 'uppercase',
                    padding: '11px 24px', borderRadius: '40px',
                    fontSize: '14px', letterSpacing: '0.04em', textDecoration: 'none',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                  }}>
                    ABOUT US <ArrowRight size={14} color="#fff" />
                  </Link>
                </div>
              </div>

              {/* Image 1 — team group photo (left) */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', flex: 1 }}>
                <img
                  src="/hubfs/grid-1.jpg"
                  alt="Tridiagonal team"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '280px' }}
                />
              </div>

              {/* Image 4 — office/workspace */}
              <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <img
                  src="/hubfs/grid-4.webp"
                  alt="Tridiagonal office"
                  style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Image 2 — tall team photo (right top, taller) */}
              <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <img
                  src="/hubfs/grid-2.webp"
                  alt="Tridiagonal leadership team"
                  style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Image 3 — group learning/workshop */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', flex: 1 }}>
                <img
                  src="/hubfs/grid-3.webp"
                  alt="Tridiagonal team activity"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '280px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          10. TRUSTED PARTNER BANNER
          ============================================================ */}
      <section
        aria-label="Trusted Partner"
        style={{
          padding: '40px 30px',
          background: '#0f0f0f',
        }}
      >
        <div
          style={{
            borderRadius: '40px',
            overflow: 'hidden',
            backgroundImage: 'url("/hubfs/topography-bg.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#1a1a1a',
            position: 'relative',
            padding: '110px 40px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgb(15 15 15 / 0%)' }} aria-hidden="true" />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '740px', margin: '0 auto' }}>
            <h2 className="section-title" style={{ color: '#fff', fontSize: '45px', fontWeight: '700', lineHeight: 1.25, marginBottom: '24px' }}>
              Looking for Trusted Partner for<br />executing your programs?
            </h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', lineHeight: 1.7, marginBottom: '40px' }}>
              We bring together unparalleled expertise with combination of skillsets and technology to<br />address your digital, computational and testing needs
            </p>
            <Link
              href="/contact-us"
              className="btn-primary"
              style={{
                background: 'var(--gradient-brand)',
                color: '#000',
                fontWeight: '700',
                textTransform: 'uppercase',
                padding: '16px 40px',
                borderRadius: '40px',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '16px',
                letterSpacing: '0.04em',
              }}
            >
              CONTACT US NOW <ArrowRight size={16} color="#000" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
