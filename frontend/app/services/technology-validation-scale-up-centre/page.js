'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TECH_VAL_DATA } from './data';

const NAV_SECTIONS = ['About Practice', 'Capabilities', 'Industries', 'Resources', 'Why Tridiagonal', 'Practice Heads', 'Contact Us'];

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

const heroResourceSlides = [
  { type: 'BLOGS', title: 'Fluid Structure Interaction Analysis (FSI):\nMaximizing Efficiency and Safety in Critical Industries', desc: 'In the fast-paced industrial landscape, the challenges faced by sectors such as oil and gas, crude refining, power...', image: '/hubfs/CFD FEA Coupled-1.png' },
  { type: 'WEBINARS', title: 'Advanced CFD Modeling For Reactor Safety', desc: 'Discover how computational modeling is preventing catastrophic failures and streamlining the maintenance of critical systems...', image: '/hubfs/Blog CFD DEM.png' },
  { type: 'CASE STUDIES', title: 'Enhancing Asphaltene Testing Methodologies', desc: 'A deep dive into scalable strategies to enhance extraction rates while managing long-term flow assurance concerns...', image: '/hubfs/Asphaltene Blog.png' },
];

const capabilities = [
  {
    title: 'Flow Assurance',
    desc: 'Improve the productivity of process by incorporating optimal Wax Mitigation, Asphaltene Management, Sand Management, Liquid Metal, Hydrate & CO2. Transport, Pipeline Flow Analysis, Flow Regime Identification, Inhibitor Screening, Modeling Validation, Slurry Rheology, and Erosion testing.',
    img: '/hubfs/CFD%20Evolution.png',
    fullDesc: 'Improve the productivity of process by incorporating optimal Wax Mitigation, Asphaltene Management, Sand Management, Liquid Metal, Hydrate & CO2. Transport, Pipeline Flow Analysis, Flow Regime Identification, Inhibitor Screening, Modeling Validation, Slurry Rheology, and Erosion testing.'
  },
  {
    title: 'Erosion Testing',
    desc: 'Comprehensive assessment for Component Wear Analysis (Screen, Valve, elbows, joints, pipes, etc), Erosion Resistance Evaluation, Surface Damage Assessment, Erosion Rate Measurement, Validation and Correction of Models, Mechanism Investigation, Protective Coating Performance Testing, Equipment Integrity Assurance, Sand Blast, Sand Retention, and ICD Testing.',
    img: '/hubfs/CFD%20DEM-1.gif',
    fullDesc: 'Comprehensive assessment for Component Wear Analysis (Screen, Valve, elbows, joints, pipes, etc), Erosion Resistance Evaluation, Surface Damage Assessment, Erosion Rate Measurement, Validation and Correction of Models, Mechanism Investigation, Protective Coating Performance Testing, Equipment Integrity Assurance, Sand Blast, Sand Retention, and ICD Testing.'
  },
  {
    title: 'Corrosion Testing',
    desc: 'Lab and field scale assessment to ensure material integrity at each stage of development.',
    img: '/hubfs/FEA-1.png',
    fullDesc: 'Lab and field scale assessment to ensure material integrity at each stage of development.'
  },
  {
    title: 'New Energy Validation',
    desc: 'Advancing Technology from TRL3 to TRL 10, CCUS-Carbon Capture Utilization and Storage, Enhanced Oil Recovery (EOR), Sustainable Energy Transition, Carbon Offset Implementation, Green Hydrogen Technology Testing & Validation, Renewable Power Integration Battery Testing.',
    img: '/hubfs/CFD%20FEA%20Coupled-1.png',
    fullDesc: 'Advancing Technology from TRL3 to TRL 10, CCUS-Carbon Capture Utilization and Storage, Enhanced Oil Recovery (EOR), Sustainable Energy Transition, Carbon Offset Implementation, Green Hydrogen Technology Testing & Validation, Renewable Power Integration Battery Testing.'
  },
];

const industries = [
  { 
    name: 'Oil and Gas', 
    desc: 'Advanced modeling solutions for upstream, midstream, and downstream operations, providing insights to optimize equipment performance and ensure flow assurance.', 
    href: '/industries/oil-and-gas',
    image: '/hubfs/grid-1.jpg' 
  },
  { 
    name: 'Pharmaceutical and Medical device', 
    desc: 'Accelerating product development and ensuring regulatory compliance through high-fidelity simulations of medical devices and mixing processes.', 
    href: '/industries/pharmaceutical',
    image: '/hubfs/image(34).png' 
  },
  { 
    name: 'Metals and Cement', 
    desc: 'Enhancing process reliability and reducing emissions in heavy manufacturing through multiphase flow analysis and heat transfer modeling.', 
    href: '/industries/metals',
    image: '/hubfs/Metals, Mining & Cement (1)-1.png' 
  },
  { 
    name: 'Food, Beverage and CPG', 
    desc: 'Optimizing continuous and batch processing, improving product consistency, and maximizing efficiency in high-volume consumer goods manufacturing.', 
    href: '/industries/fmcg',
    image: '/hubfs/grid-3.png' 
  },
  { 
    name: 'Chemical and Process', 
    desc: 'Resolving complex fluid dynamics and reaction kinetics to scale-up operations and improve yield in specialty and bulk chemicals.', 
    href: '/industries/chemical',
    image: '/hubfs/grid-1.png' 
  },
  { 
    name: 'Power and Renewables', 
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
  { title: 'State of the Art Facility', desc: "250k+ sq. ft. facility, Advanced equipment's, Lab & field scale testing, 24/7 utility", icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ) },
  { title: 'Domain Experts', desc: "50+ domain experts with Masters, Ph.D.'s, Consultants.", icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ) },
  { title: 'Cost-Effective Solutions', desc: 'Leverage cheap labour and pre-built loops tailored to client needs.', icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  ) },
  { title: 'Quick Turnaround', desc: 'Quick testing, Single-window for analysis, verification, validation.', icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  ) },
  { title: 'Custom-Built Set-Up', desc: 'Our EPC team creates custom skids quickly. Local network accelerates projects.', icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line>
    </svg>
  ) },
  { title: 'Value Creation', desc: 'Deploying sustainable practices to efficiently create and deliver value for customers.', icon: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9Z"></path><path d="M11 3 8 9l4 13"></path><path d="M13 3l3 6-4 13"></path>
    </svg>
  ) },
];

const practiceHeads = [
  { 
    name: 'Dr. Damo Vedapuri', 
    role: 'Head – North American Operations', 
    image: '/hubfs/Dr. Damodaran Vedapuri.webp', 
    linkedin: '#',
    desc: 'Dr. Damo Vedapuri is the Head of North American Operations at Tridiagonal Solutions. He has 20 years of experience in solving a wide range of fluid flow problems in the Oil and Gas industry. Some of his core focus areas are Erosion, Erosion – Corrosion, Sand Management, and Slurry Multiphase Flow. Dr. Damo has graduated from the Institute of Corrosion and Multiphase Technology at Ohio University with a Ph.D. degree in Chemical Engineering. He is a member of SPE and actively publishes his group’s research in SPE, OTC, NACE and BHR conferences.' 
  },
  { 
    name: 'Dr. Jatin Agarwal', 
    role: 'Program Director - Technology Validation & Scale-Up Centre', 
    image: '/hubfs/Dr. Jatin Agarwal.webp', 
    linkedin: '#',
    desc: 'Dr. Jatin is working as Program Director and technical lead with 14+ years of experience for large scale production enhancement R&D projects (paraffin deposition, asphaltene deposition, multi-phase flow, simulation). He holds a Ph.D. degree in Petroleum Engineering from PDEU and Masters Degree from University of Tulsa. During his tenure at PDPU, he was instrumental in establishing state of art Drilling, Cementing and Stimulation Research Center and Enhanced Oil Recovery Consultancy Group for catering the needs of local as well as global E&P companies. He has presented several conference papers and published several journal articles in reputed conferences and journals. He has also authored a book named Offshore Operations and Engineering with CRC press of Taylor and Francis group.' 
  },
  { 
    name: 'Dr. Lee Rhyne', 
    role: 'Consultant', 
    image: '/hubfs/Dr. Lee Rhyne.webp', 
    linkedin: '#',
    desc: 'Consultant driving strategic initiatives for Technology Validation & Scale-Up Centre.' 
  },
  { 
    name: 'Dr. Ravindra Joshi', 
    role: 'Consultant', 
    image: '/hubfs/Ravindra Joshi.webp', 
    linkedin: '#',
    desc: 'Consultant bringing vast expertise in engineering scaling and technology validation.' 
  },
];

function LeaderCard({ leader, onClick }) {
  return (
    <div style={{
      background: '#1c1c1c',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      height: '100%',
    }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'var(--color-teal)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
      
      {/* Top Image Banner */}
      <div style={{ width: '100%', height: '240px', background: 'var(--gradient-brand)', position: 'relative' }}>
        {leader.image ? (
           <img src={leader.image} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        ) : (
           <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '64px', fontWeight: 'bold' }}>
              {leader.name.charAt(0)}
           </div>
        )}
      </div>
      
      {/* Card Body */}
      <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>{leader.name}</h3>
        <div style={{ color: 'var(--color-teal)', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '15px' }}>{leader.role}</div>
        
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
          {leader.desc.substring(0, 100).trim()}...
        </p>

        {/* Footer: Social + Read More */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
           <a href={leader.linkedin || '#'} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: '#fff', transition: 'background 0.2s', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.background='var(--color-teal)'} onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
               <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
             </svg>
           </a>
           <button suppressHydrationWarning onClick={onClick} style={{ background: 'transparent', border: '1px solid var(--color-teal)', color: '#fff', padding: '8px 20px', borderRadius: '24px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background='var(--color-teal)'; e.currentTarget.style.color='#000'; }} onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#fff'; }}>
             Read More
           </button>
        </div>
      </div>
    </div>
  );
}

export default function TechValidationPage() {
  const [overlayItem, setOverlayItem] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('About Practice');
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', industry: '', comments: '', privacy: false });
  const [submitted, setSubmitted] = useState(false);
  const [resourceSlide, setResourceSlide] = useState(0);
  const [resInTransition, setResInTransition] = useState(true);
  const [resRef, resInView] = useInView(0.2);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.dataset.section);
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (sectionId) => {
    const el = sectionRefs.current[sectionId];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
        {/* Dark overlay like careers */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26, 26, 26, 0.88)' }} />

        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

          {/* Badge */}
          <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.12)', border: '1px solid rgba(71,188,135,0.3)', borderRadius: '30px', padding: '6px 20px', marginBottom: '24px' }}>
            <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>TECHNOLOGY VALIDATION</span>
          </div>

          <h1
            className="hero-title fade-in-up"
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '15px',
              lineHeight: 1.2,
            }}
          >
            Technology Validation &amp;{' '}
            <span className="gradient-text">Scale-up Centre</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '14px', letterSpacing: '0.5px' }}>
            Test | Validate | Scale
          </p>

          <p
            className="hero-desc fade-in-up delay-200"
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '18px',
              maxWidth: '700px',
              margin: '0 auto 40px',
            }}
          >
            Future of flow is unfolding through rigorous testing, validation &amp; proof of concept, upgrade the technology from TRL 3 to TRL 10 &amp; shape the future of green energy.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button suppressHydrationWarning
              onClick={() => scrollTo('Contact Us')}
              className="btn-primary"
              style={{ padding: '14px 32px', borderRadius: '30px', fontWeight: '800', fontSize: '14px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px' }}
            >
              Talk to an Expert
            </button>
            <Link
              href="/resources/brochures"
              style={{
                background: 'transparent',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: '30px',
                fontWeight: '700',
                fontSize: '14px',
                border: '1px solid rgba(255,255,255,0.35)',
                textDecoration: 'none',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'translateY(0) scale(0.97)'; }}
              onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Brochure
            </Link>
          </div>
        </div>
      </section>


      {/* ── ABOUT PRACTICE ── */}
      <section
        id="about-practice"
        data-section="About Practice"
        ref={el => sectionRefs.current['About Practice'] = el}
        style={{ padding: '80px 0', background: '#1a1a1a' }}
      >
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,480px),1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '20px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>About Practice</span>
              </div>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: '800', marginBottom: '24px', lineHeight: 1.3 }}>
                Technology Validation &amp; <span className="gradient-text">Scale-up Centre</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '16px', marginBottom: '20px' }}>
                Tridiagonal Solutions Pvt. Ltd., leveraging one of the Asia's largest experimentation lab and field-scale flow testing facilities to access indispensable production enhancement data.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '16px' }}>
                For over 15+ years, we've been catering to the needs of Fortune 500 companies, to bridge the gap between data and informed decision-making, providing validation and proof of concept for optimal field operations.
              </p>
            </div>
            <div
              onClick={() => setIsVideoOpen(true)}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                minHeight: '380px',
                background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/hubfs/Advanced Modeling Service Page Banner.png') center/cover no-repeat",
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
            >
              <div className="video-play-btn" style={{ position: 'relative', zIndex: 2, background: 'rgba(255,255,255,0.9)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-teal)" aria-hidden="true" style={{ marginLeft: '4px' }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section
        id="capabilities"
        data-section="Capabilities"
        ref={el => sectionRefs.current['Capabilities'] = el}
        style={{ padding: '100px 0', background: '#111' }}
      >
        <div className="content-wrapper-lg">

          {/* Section header */}
          <div style={{ marginBottom: '80px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '20px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Expertise</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: '800', marginBottom: '24px', lineHeight: 1.2 }}>
              Our <span className="gradient-text">Capabilities</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '850px', margin: '0 auto', lineHeight: '1.8', fontSize: '17px' }}>
              Bridging the gap between theory and field performance through rigorous multiphase flow testing and process optimization. Our validation services span from molecular-level analysis to full pilot-scale testing.
            </p>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .cap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
            .cap-card { 
              position: relative; 
              background: #1a1a1a; 
              border: 1px solid rgba(255,255,255,0.06); 
              border-radius: 20px; 
              height: 420px;
              overflow: hidden; 
              display: flex; 
              flex-direction: column; 
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              cursor: pointer;
            }
            .cap-card:hover { transform: translateY(-8px); border-color: rgba(71,188,135,0.4); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
            .cap-card-img { position: absolute; inset: 0; opacity: 0.3; transition: transform 0.6s ease, opacity 0.4s; z-index: 0; }
            .cap-card:hover .cap-card-img { transform: scale(1.1); opacity: 0.45; }
            .cap-card-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(26,26,26,0.2) 0%, rgba(26,26,26,0.95) 100%); z-index: 1; }
            .cap-card-content { position: relative; z-index: 2; padding: 40px; height: 100%; display: flex; flex-direction: column; }
            
            @media (max-width: 1100px) { .cap-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 700px) { .cap-grid { grid-template-columns: 1fr; } .cap-card { height: 380px; } }
          ` }} />

          <div className="cap-grid">
            {TECH_VAL_DATA.map((cap, i) => (
              <Link key={i} href={`/services/technology-validation-scale-up-centre/${cap.slug}`} className="cap-card" style={{ textDecoration: 'none' }}>
                <div className="cap-card-img">
                  <Image src={cap.img} alt={cap.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="cap-card-overlay" />
                <div className="cap-card-content">
                  <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>{cap.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6, flex: 1 }}>{cap.desc}</p>
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ background: 'var(--gradient-brand)', color: '#000', padding: '10px 24px', borderRadius: '40px', fontSize: '12px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      VIEW MORE <ArrowRight size={14} color="#000" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Resources Card */}
            <Link href="/resources" className="cap-card" style={{ textDecoration: 'none' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.02)', zIndex: 0 }} />
              <div className="cap-card-content">
                <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Resources</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6, flex: 1 }}>
                  Explore technical brochures, case studies, and webinars detailing our validation methodologies and success stories.
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ background: 'var(--gradient-brand)', color: '#000', padding: '10px 24px', borderRadius: '40px', fontSize: '12px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    VIEW RESOURCES <ArrowRight size={14} color="#000" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Contact Us Card - LINKED AS REQUESTED */}
            <Link href="/contact-us" className="cap-card" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #0c7196 0%, #6ca03e 100%)' }}>
               <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 0 }} />
               <div className="cap-card-content">
                 <div style={{ width: '40px', height: '2px', background: 'var(--color-teal)', marginBottom: '24px' }} />
                 <h3 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>Contact Us</h3>
                 <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', lineHeight: 1.7, flex: 1 }}>
                    Uncover how our capabilities can propel your organization forward. Connect with our technology experts today.
                 </p>
                 <div style={{ marginTop: 'auto' }}>
                   <div style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '10px 24px', borderRadius: '40px', fontSize: '12px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                     GET IN TOUCH <ArrowRight size={14} color="#fff" />
                   </div>
                 </div>
               </div>
            </Link>
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
          <style dangerouslySetInnerHTML={{ __html: `
              .inds-grid {
              display: grid;
              grid-template-columns: minmax(300px, 400px) 1fr;
              gap: 80px;
              align-items: flex-start;
            }
            .inds-arrow {
              transition: transform 0.3s ease;
            }
            .inds-accordion-row:hover .inds-arrow {
              transform: translateX(5px);
            }
            @media (max-width: 900px) {
              .inds-grid {
                display: flex;
                flex-direction: column;
                gap: 40px;
              }
              .inds-sticky {
                position: relative !important;
                top: 0 !important;
              }
              .inds-img {
                 height: 300px !important;
                 aspect-ratio: auto !important;
                 border-radius: 20px !important;
                 margin-top: 20px;
              }
            }
          `}} />

          <div className="inds-grid">
            {/* Left Column */}
            <div className="inds-sticky" style={{ position: 'sticky', top: '120px' }}>
              <div className="dvr-line" style={{ marginBottom: '16px' }} />
              <h2 className="section-title" style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700', lineHeight: 1.1, marginBottom: '20px' }}>
                Industries
              </h2>
              <p className="section-desc" style={{ color: '#fff', opacity: 0.9, fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
                Your Trusted Partner in Technology Validation.
              </p>
              
              <div className="inds-img" style={{ width: '100%', aspectRatio: '1/1.1', borderRadius: '40px', overflow: 'hidden', position: 'relative' }}>
                <Image 
                  src={industries[activeIndustryIdx !== null ? activeIndustryIdx : 0].image} 
                  alt={industries[activeIndustryIdx !== null ? activeIndustryIdx : 0].name} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  unoptimized 
                />
              </div>
            </div>

            {/* Right Column Custom Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column' }} onMouseLeave={() => setActiveIndustryIdx(null)}>
              {industries.map((ind, i) => {
                const isActive = activeIndustryIdx === i;
                return (
                  <div 
                    key={i} 
                    className="inds-accordion-row"
                    onMouseEnter={() => setActiveIndustryIdx(i)}
                    onClick={() => setActiveIndustryIdx(isActive ? null : i)}
                    style={{ 
                      overflow: 'hidden', 
                      borderTop: i === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.4s ease',
                      cursor: 'pointer'
                    }}
                  >
                    {/* Header Row */}
                    <div style={{ display: 'flex', alignItems: 'center', padding: isActive ? '34px 0 16px' : '34px 0', gap: '16px', transition: 'padding 0.3s ease' }}>
                      <div className="inds-arrow" style={{ fill: isActive ? 'var(--color-teal)' : '#fff', opacity: isActive ? 1 : 0.8 }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59l-2.13-2.13a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: isActive ? '700' : '500', color: isActive ? '#fff' : 'rgba(255,255,255,0.8)', transition: 'color 0.3s' }}>
                        {ind.name}
                      </h3>
                    </div>
                    
                    {/* Expandable Content */}
                    <div style={{ 
                      maxHeight: isActive ? '300px' : '0px', 
                      opacity: isActive ? 1 : 0, 
                      transition: 'all 0.4s ease', 
                      paddingLeft: '36px', 
                      paddingBottom: isActive ? '30px' : '0px'
                    }}>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', width: '100%' }}>
                        {ind.desc}
                      </p>
                      <Link href={ind.href} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: 'var(--gradient-brand)', color: '#000',
                        fontWeight: '700', textTransform: 'uppercase',
                        padding: '10px 28px', borderRadius: '40px',
                        fontSize: '12px', letterSpacing: '0.04em', border: 'none',
                        textDecoration: 'none', transition: 'all 0.3s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,255,204,0.3)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        VIEW DETAILS <ArrowRight size={14} color="#000" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESOURCES ── */}
      <section
        id="resources"
        data-section="Resources"
        ref={el => { sectionRefs.current['Resources'] = el; resRef.current = el; }}
        style={{ padding: '80px 0', background: '#242424' }}
      >
        <div className="content-wrapper-lg">
          <div className="resources-layout">
            
            {/* Left Column: Text & Buttons */}
            <div className="resources-left">
              <div className={`dvr-line ${resInView ? 'fade-in-up' : ''}`} style={{ marginBottom: '16px', opacity: resInView ? 1 : 0 }} />
              <h2 className={`section-title ${resInView ? 'fade-in-up delay-100' : ''}`} style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700', lineHeight: 1.1, marginBottom: '20px', opacity: resInView ? 1 : 0 }}>
                Resources
              </h2>
              <p className={`section-desc ${resInView ? 'fade-in-up delay-200' : ''}`} style={{ color: '#fff', opacity: resInView ? 0.9 : 0, transition: 'opacity 0.6s', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px', maxWidth: '400px' }}>
                Explore examples and success stories of how various technologies was applied to address the needs of our customers (Flow Assurance, Corrosion Testing, Erosion Testing and New Energy)
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
                              background: 'var(--gradient-brand)', color: '#000',
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

      {/* ── WHY TRIDIAGONAL ── */}
      <section
        id="why-tridiagonal"
        data-section="Why Tridiagonal"
        ref={el => sectionRefs.current['Why Tridiagonal'] = el}
        style={{ padding: '80px 0', background: '#1c1c1c' }}
      >
        <div className="content-wrapper-lg">
          <style dangerouslySetInnerHTML={{ __html: `
            .why-grid-layout { 
               display: grid; 
               grid-template-columns: repeat(3, 1fr); 
            }
            .why-grid-cell {
               padding: 40px 30px;
               display: flex;
               flex-direction: column;
               gap: 16px;
               border-right: 1px solid rgba(255,255,255,0.08);
               border-bottom: 1px solid rgba(255,255,255,0.08);
               transition: background 0.3s;
            }
            .why-grid-cell:hover {
               background: rgba(255,255,255,0.02);
            }
            .why-grid-layout > div:nth-child(3n) {
               border-right: none;
            }
            .why-grid-layout > div:nth-last-child(-n+3) {
               border-bottom: none;
            }
            @media (max-width: 900px) { 
               .why-grid-layout { grid-template-columns: repeat(2, 1fr); } 
               .why-grid-layout > div { border-right: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); }
               .why-grid-layout > div:nth-child(even) { border-right: none; }
               .why-grid-layout > div:nth-last-child(-n+2) { border-bottom: none; }
            }
            @media (max-width: 600px) { 
               .why-grid-layout { grid-template-columns: 1fr; } 
               .why-grid-layout > div { border-right: none !important; }
               .why-grid-layout > div:last-child { border-bottom: none !important; }
            }
          `}} />
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Why Tridiagonal?</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: '800', marginBottom: '20px' }}>
              Why Choose Us?
            </h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', fontSize: '16px' }}>
               Tridiagonal Solutions, a top facility in Asia, offers cost-effective flow assurance testing for Oil &amp; Gas majors. We are specialized in multiphase flow, erosion-corrosion, wax deposition, and sand management, etc. We collaborate with industry leaders, consultants, EPCs, OEMs and service providers, with flexible business models.
            </p>
          </div>
          
          <div className="why-grid-layout">
            {whyItems.map((item, i) => (
              <div key={i} className="why-grid-cell">
                <div style={{ 
                  width: '64px', height: '64px', 
                  background: 'linear-gradient(135deg, rgba(71,188,135,0.12), rgba(71,188,135,0.01))', 
                  borderRadius: '16px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: 'var(--color-teal)', 
                  marginBottom: '12px',
                  border: '1px solid rgba(71,188,135,0.15)',
                  boxShadow: 'inset 0 2px 10px rgba(71,188,135,0.05)'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: '1.7' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY PARTNERS ── */}
      <section aria-label="Technology Partners" style={{ background: '#1c1c1c', padding: '50px 0' }}>
        <style dangerouslySetInnerHTML={{__html: `
          .home2-tp-layout {
            display: flex;
            flex-direction: column;
            gap: 40px;
            align-items: flex-start;
          }
          @media (min-width: 900px) {
            .home2-tp-layout {
               flex-direction: row;
               align-items: center;
               gap: 60px;
            }
          }
          .home2-tp-marquee-wrapper {
            position: relative;
            width: 100%;
            flex: 1;
            min-width: 0;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 60px;
            padding: 24px 0;
            box-shadow: inset 0 0 40px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.2);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
            mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          }
          .home2-tp-btn {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .home2-tp-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 255, 204, 0.4);
          }
          @media (max-width: 899px) {
            .home2-tp-btn {
               font-size: 11px !important;
               padding: 11px 18px !important;
               letter-spacing: 0.02em !important;
               white-space: nowrap !important;
               gap: 8px !important;
            }
          }
        `}} />
        <div className="content-wrapper-lg">
          <div className="home2-tp-layout">
            
            {/* Left Column: Title only */}
            <div style={{ flexShrink: 0, minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
                <div style={{ width: '3px', height: '32px', background: 'var(--gradient-brand)', borderRadius: '2px' }} />
                <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '500', margin: 0, letterSpacing: '0.02em' }}>
                  Our Clients
                </h3>
              </div>
            </div>

            {/* Right Column: Logos - Inside a single unified capsule */}
            <div className="home2-tp-marquee-wrapper">
              <div className="marquee-container" style={{ padding: '0', marginBottom: 0 }}>
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
            </div>
            
          </div>
        </div>
      </section>

      {/* ── PRACTICE HEADS ── */}
      <section
        id="practice-heads"
        data-section="Practice Heads"
        ref={el => sectionRefs.current['Practice Heads'] = el}
        style={{ padding: '80px 0', background: '#141414' }}
      >
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Practice Heads</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: '800' }}>Meet Our Leaders</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {practiceHeads.map((leader, i) => (
              <LeaderCard key={i} leader={leader} onClick={() => setOverlayItem(leader)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section
        id="contact-us"
        data-section="Contact Us"
        ref={el => sectionRefs.current['Contact Us'] = el}
        style={{ padding: '80px 0', background: '#1a1a1a' }}
      >
        <div className="content-wrapper-lg">
          <style dangerouslySetInnerHTML={{ __html: `
            .contact-form-card { padding: 40px; }
            .form-grid-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
            @media (max-width: 600px) { 
              .contact-form-card { padding: 20px; } 
              .form-grid-row { grid-template-columns: 1fr; }
            }
          `}} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,460px),1fr))', gap: '60px', alignItems: 'center' }}>
            {/* Left text */}
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '20px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Contact Us</span>
              </div>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: '800', marginBottom: '20px', lineHeight: 1.3 }}>
                Schedule a Call Today!
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontSize: '16px', marginBottom: '30px' }}>
                Uncover how our capabilities can propel your organization forward. Provide your focus areas, and we will deliver tailored solutions designed to meet your unique objectives.
              </p>
            </div>

            {/* Form */}
            <div className="contact-form-card" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
                  <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Thank You!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>Our team will reach out to you within 48 hours.</p>
                </div>
              ) : (
                <form suppressHydrationWarning onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-grid-row">
                    <div>
                      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>First Name *</label>
                      <input suppressHydrationWarning required placeholder="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                        style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Last Name *</label>
                      <input suppressHydrationWarning required placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                        style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Email *</label>
                    <input suppressHydrationWarning required type="email" placeholder="Corporate Email ID" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Contact Number</label>
                    <input suppressHydrationWarning placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Company Name *</label>
                    <input suppressHydrationWarning required placeholder="Company Name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Industry</label>
                    <select suppressHydrationWarning value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: formData.industry ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}>
                      <option value="">Please Select</option>
                      <option>Oil &amp; Gas</option>
                      <option>Pharmaceutical &amp; Medical Devices</option>
                      <option>Metals, Mining &amp; Cement</option>
                      <option>Food, Beverage &amp; CPG</option>
                      <option>Chemical &amp; Process</option>
                      <option>Power &amp; Renewables</option>
                      <option>Others</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Comments / Questions</label>
                    <textarea rows={3} placeholder="Tell us about your project..." value={formData.comments} onChange={e => setFormData({...formData, comments: e.target.value})}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <input type="checkbox" id="ams-privacy" required checked={formData.privacy} onChange={e => setFormData({...formData, privacy: e.target.checked})} style={{ marginTop: '3px', accentColor: 'var(--color-teal)', flexShrink: 0 }} />
                    <label htmlFor="ams-privacy" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', lineHeight: '1.6', cursor: 'pointer' }}>
                      I agree to receive communications regarding Tridiagonal products, services, and events. <Link href="/privacy-policy" style={{ color: 'var(--color-teal)' }}>Read our privacy policy</Link>
                    </label>
                  </div>
                  <button suppressHydrationWarning type="submit" style={{ 
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    background: 'var(--gradient-brand)', color: '#000', 
                    padding: '16px', borderRadius: '40px', 
                    fontWeight: '800', fontSize: '13px', textTransform: 'uppercase', 
                    letterSpacing: '0.04em', border: 'none', cursor: 'pointer', marginTop: '10px', transition: 'all 0.3s' 
                  }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,255,204,0.3)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    Submit Request <ArrowRight size={14} color="#000" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERLAY (CAPABILITIES & LEADERS) ── */}
      {overlayItem && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(10, 10, 10, 0.98)', color: '#fff', display: 'flex', flexDirection: 'column', animation: 'overlayFade 0.4s ease-out' }}>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes overlayFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            .overlay-content { max-width: 1200px; margin: 0 auto; width: 100%; padding: 80px 48px; position: relative; }
            .badge { display: inline-block; background: rgba(71,188,135,0.1); color: var(--color-teal); padding: 4px 14px; borderRadius: 20px; marginBottom: 24px; fontSize: 12px; fontWeight: '700'; letterSpacing: '1px'; }
            @media (max-width: 800px) { .overlay-content { padding: 60px 24px; } }
          ` }} />
          
          <div style={{ position: 'sticky', top: 0, background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(10px)', zIndex: 10, padding: '20px 48px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <button onClick={() => setOverlayItem(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div className="overlay-content">
              {/* If it's a capability */}
              {overlayItem.fullDesc ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'flex-start' }}>
                  <div>
                    <div className="badge">CAPABILITY</div>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '40px' }}>{overlayItem.title}</h2>
                    <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{overlayItem.fullDesc}</div>
                    
                    <div style={{ marginTop: '60px' }}>
                      <button onClick={() => { setOverlayItem(null); scrollTo('Contact Us'); }} style={{ background: 'var(--gradient-brand)', color: '#000', padding: '16px 36px', borderRadius: '40px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                        TALK TO AN EXPERT
                      </button>
                    </div>
                  </div>
                  <div style={{ position: 'relative', borderRadius: '30px', overflow: 'hidden', height: '600px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Image src={overlayItem.img} alt={overlayItem.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
              ) : (
                /* If it's a practice head */
                <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '80px', alignItems: 'flex-start' }}>
                  <div style={{ position: 'relative', borderRadius: '30px', overflow: 'hidden', height: '540px', background: 'var(--gradient-brand)' }}>
                    {overlayItem.image ? (
                      <img src={overlayItem.image} alt={overlayItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '120px', fontWeight: '800', color: '#000' }}>{overlayItem.name.charAt(0)}</div>
                    )}
                  </div>
                  <div>
                    <div className="badge">{overlayItem.role.toUpperCase()}</div>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '20px' }}>{overlayItem.name}</h2>
                    <a href={overlayItem.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-teal)', textDecoration: 'none', fontWeight: '700', marginBottom: '40px' }}>
                       LINKEDIN PROFILE <ArrowRight size={16} color="var(--color-teal)" />
                    </a>
                    <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>{overlayItem.desc}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


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
    </main>
  );
}
