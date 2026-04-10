'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

const resources = [
  { label: 'USE CASES', href: '/resources/case-studies', color: 'rgba(71,188,135,0.15)', tc: 'var(--color-teal)' },
  { label: 'WEBINARS', href: '/events/on-demand-webinars', color: 'rgba(0,210,255,0.15)', tc: '#00d2ff' },
  { label: 'BLOGS', href: '/resources/blogs', color: 'rgba(255,180,0,0.12)', tc: '#ffb400' },
  { label: 'BROCHURE', href: '/resources/brochures', color: 'rgba(180,100,255,0.12)', tc: '#b464ff' },
  { label: 'PUBLICATIONS', href: '/publications-and-patents', color: 'rgba(255,90,90,0.12)', tc: '#ff5a5a' },
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

const practiceHeads = [
  { 
    name: 'Ashish Kulkarni', 
    role: 'Vice President and BU Head (Advanced Modeling and Simulation)', 
    image: '/hubfs/Ashish Kulkarni.webp', 
    linkedin: '#',
    desc: 'Ashish is one of the founding members of Tridiagonal. He holds Post graduate degree in Fluid Mechanics and Thermal Sciences from IIT, Kanpur. At Tridiagonal, Ashish has played several roles including setting up CFD consulting team, Leading the software development group, Establishing OpenFOAM based solver, Operating as Business Unit Head, etc... His technical interests include Turbulence Modeling, Simulation Data Management and Developing Digital Twins. Ashish is an expert at building team of Engineers.' 
  },
  { 
    name: 'Nagesh Joshi', 
    role: 'Practice Head Modeling and Simulation', 
    image: '/hubfs/Nagesh Joshi.webp', 
    linkedin: '#',
    desc: 'Nagesh has Masters degree in Mechanical Engineering with 20 years of experience in CFD and FEA modeling. He started his career with Atlas Copco as a Project Lead for Modeling and simulations. For the last 16 years, he has been working with Tridiagonal in different capacities. Currently, he is heading Modeling and simulations group.' 
  },
  { 
    name: 'Tukaram Suryawanshi', 
    role: 'Head of Process Consulting Services', 
    image: '/hubfs/Tukaram Suryavanshi.webp', 
    linkedin: '#',
    desc: 'Tukaram Suryawanshi holds Masters in Chemical Engineering from IISc Bangalore. As head of Process Consulting services at Tridiagonal, he specilizes in the field of Advanced Modelling & Simulations using CFD, DEM, Mathematical Modelling. He has 18+ years of experience in applying the simulation services to Chemical Process, Pharmaceuticals, Food & Beverages, Medical Devices, FMCG Industries.' 
  },
  { 
    name: 'Vivek Singh', 
    role: 'Sales Director (Simulation Software and Consulting)', 
    image: '/hubfs/Vivek Singh.webp', 
    linkedin: '#',
    desc: 'Vivek Singh brings extensive experience as Sales Director for Simulation Software and Consulting, driving global client acquisition and ensuring optimal delivery of engineering and consulting solutions tailored to critical industry demands.' 
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

export default function AdvancedModelingPage() {
  const [selectedLeader, setSelectedLeader] = useState(null);
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
            <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>CFD | FEA | DEM | MULTIPHYSICS</span>
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
            Advanced Modeling &amp;{' '}
            <span className="gradient-text">Simulation</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '14px', letterSpacing: '0.5px' }}>
            Compute | Innovate | Develop
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
            Leverage CFD, FEA, DEM &amp; Multiphysics to optimize processes, troubleshoot failures and build digital twins for your industrial equipment.
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
                Advanced Modeling &amp; Simulation <span className="gradient-text">(CFD/FEA)</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '16px', marginBottom: '20px' }}>
                Tridiagonal Solutions is one of the leading modeling &amp; Simulation consulting companies having strong global client base. We provide modeling services in Computational Fluid Dynamics (CFD), Finite Element Analysis (FEA), Discrete Element Method (DEM) &amp; Multiphysics as well.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '16px' }}>
                Our engineers also help to develop digital twins of equipment or process. Our modeling expertise enables industry to improve &amp; optimize processes and equipment design. Modeling &amp; Simulation also provides deep insights to understand root cause of structural failure &amp; troubleshoot the performance issues.
              </p>
            </div>
            <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', minHeight: '380px', background: '#242424', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Image
                src="/hubfs/Advanced Modeling Service Page Banner.png"
                alt="Advanced Modeling & Simulation"
                fill
                style={{ objectFit: 'cover' }}
              />
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

          {/* Section header */}
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Our Expertise</span>
            </div>
            <h2 className="section-title" style={{ color: '#fff', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: '800', marginBottom: '20px' }}>
              Our <span className="gradient-text">Capabilities</span>
            </h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', fontSize: '16px' }}>
              Tridiagonal has considerable capabilities in CFD modeling of combustion, multiphase flows
              and reactions. We are expertise in solving Multiphysics problems such as tightly coupled
              fluid structural (FSI) interaction, Flow Induced Vibration and acoustic induced vibration
              problems.
            </p>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .capabilities-grid-layout {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
            }
            @media (max-width: 1024px) {
              .capabilities-grid-layout {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            @media (max-width: 768px) {
              .capabilities-grid-layout {
                grid-template-columns: 1fr;
              }
            }
          ` }} />

          {/* 3-column card grid */}
          <div className="capabilities-grid-layout">
            {[
              {
                title: 'Computational Fluid Dynamics (CFD)',
                desc: 'Multiphase flow, Phase change, combustion and reaction modeling are our routine areas of working. We help industry to analyze root cause of the failure. Our engineers provide deep insights for troubleshooting & process improvement.',
                img: '/hubfs/CFD%20Evolution.png',
              },
              {
                title: 'Discrete Element Method (DEM)',
                desc: 'DEM is utilized in pharmaceuticals for powder mixing and tablet compression, in chemicals for particle handling and crystallization, and in CPG for packaging and mixing processes. It optimizes operations, ensuring uniformity and efficiency.',
                img: '/hubfs/CFD%20DEM-1.gif',
              },
              {
                title: 'Finite Element Analysis (FEA)',
                desc: 'Our canvas covers the assessment of the structural integrity of equipment, vessels, and components under static and dynamic loads, preventing thermal failures with optimized heat transfer & temperature distribution.',
                img: '/hubfs/FEA-1.png',
              },
              {
                title: 'Multiphysics Simulation',
                desc: 'Tridiagonal engineers are capable in solving fluid-structure interaction (FSI) problems, while coupling of DEM-FEA models the behavior of granular materials interacting with structures, provides a deeper understanding of stress distribution, particle flow, and potential equipment wear.',
                img: '/hubfs/CFD%20FEA%20Coupled-1.png',
              },
              {
                title: 'Digital Twin',
                desc: 'Tridiagonal tech leaders can build a virtual replica of assets & processes in various industries to reduce simulation iterations using data interpolation. Methods like CFD, FEA & DEM can predict values that are not possible to gain from sensors.',
                img: '/hubfs/Website%20Banner.png',
              },
            ].map((cap, i) => (
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
                {/* Background image & gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${cap.img}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,20,20,0.6) 0%, rgba(20,20,20,0.98) 100%)' }} />
                
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '16px', lineHeight: 1.3 }}>{cap.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', lineHeight: '1.7', flex: 1, marginBottom: '32px' }}>{cap.desc}</p>
                  
                  {/* Cyan-to-Lime Gradient Button */}
                  <Link
                    href="/resources/case-studies"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'linear-gradient(90deg, #0dd0e1, #8fe03c)',
                      color: '#000',
                      padding: '12px 24px',
                      borderRadius: '30px',
                      fontSize: '13px',
                      fontWeight: '800',
                      letterSpacing: '0.5px',
                      textDecoration: 'none',
                      width: 'fit-content',
                      boxShadow: '0 4px 15px rgba(13,208,225,0.2)',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    VIEW MORE
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            ))}

            {/* 6th Card: Contact Us (Matching Image) */}
            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #0c7196 0%, #6ca03e 100%)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '380px',
                padding: '36px 32px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(108, 160, 62, 0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              onClick={() => scrollTo('Contact Us')}
            >
              {/* Optional inner subtle gradient overlay to smooth colors */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.15) 100%)' }} />
              
              <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '40px', height: '2px', background: 'var(--color-teal)', marginBottom: '24px' }} />
                
                <h3 style={{ color: '#fff', fontSize: 'clamp(24px, 2.5vw, 28px)', fontWeight: '700', lineHeight: 1.3, marginBottom: '32px' }}>
                  To know more about our practice areas, contact us today!
                </h3>
                
                <div style={{ marginTop: 'auto' }}>
                  <button
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'transparent',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.7)',
                      padding: '10px 24px',
                      borderRadius: '30px',
                      fontSize: '14px',
                      fontWeight: '600',
                      letterSpacing: '0.3px',
                      cursor: 'pointer',
                      transition: 'background 0.3s, border-color 0.3s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; }}
                  >
                    Contact Us
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '2px' }}>
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

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
                Your Trusted Partner in Modeling &amp; Simulation.
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
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: '800' }}>
              Why Choose Us?
            </h2>
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
              <LeaderCard key={i} leader={leader} onClick={() => setSelectedLeader(leader)} />
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
                      <input required placeholder="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                        style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Last Name *</label>
                      <input required placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                        style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Email *</label>
                    <input required type="email" placeholder="Corporate Email ID" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Contact Number</label>
                    <input placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Company Name *</label>
                    <input required placeholder="Company Name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Industry</label>
                    <select value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})}
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

      {/* LEADERSHIP MODAL */}
      {selectedLeader && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }} onClick={() => setSelectedLeader(null)}>
          <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '40px', maxWidth: '800px', width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedLeader(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '32px', cursor: 'pointer', zIndex: 10 }}>×</button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start' }}>
                <div style={{ width: '220px', height: '280px', borderRadius: '16px', background: 'var(--gradient-brand)', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
                  {selectedLeader.image ? (
                    <img src={selectedLeader.image} alt={selectedLeader.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '72px', fontWeight: 'bold' }}>
                      {selectedLeader.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                  <h3 style={{ color: '#fff', fontSize: '36px', fontWeight: '700', marginBottom: '8px', lineHeight: 1.2 }}>{selectedLeader.name}</h3>
                  <div style={{ color: 'var(--color-teal)', fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '20px' }}>{selectedLeader.role}</div>
                  
                  <a href={selectedLeader.linkedin || '#'} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '30px', background: '#0077b5', color: '#fff', fontWeight: '600', fontSize: '14px', textDecoration: 'none', transition: 'background 0.2s', marginBottom: '30px' }} onMouseEnter={e => e.currentTarget.style.background='#006097'} onMouseLeave={e => e.currentTarget.style.background='#0077b5'}>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                     </svg>
                     LinkedIn Profile
                  </a>
                  
                  <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', lineHeight: 1.8 }}>
                    {selectedLeader.desc}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}
