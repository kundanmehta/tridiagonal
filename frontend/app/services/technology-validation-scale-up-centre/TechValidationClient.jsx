'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Users, MessageSquare, Monitor, Settings, Zap, Cpu, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TECH_VAL_DATA } from './data';
import { API_URL, resolveImageUrl, extractExcerpt } from '@/lib/apiConfig';

const NAV_SECTIONS = ['About Practice', 'Capabilities', 'Industries', 'Resources', 'Why Tridiagonal', 'Practice Heads', 'Contact Us'];

const DynamicIcon = ({ name, size = 24, ...props }) => {
  const icons = { Users, MessageSquare, Monitor, Settings, Zap, Cpu, Award };
  const IconComponent = icons[name] || icons['Users'];
  return <IconComponent size={size} {...props} />;
};

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
  { title: 'State of the Art Facility', desc: "250k+ sq. ft. facility, Advanced equipment's, Lab & field scale testing, 24/7 utility", icon: 'Monitor' },
  { title: 'Domain Experts', desc: "50+ domain experts with Masters, Ph.D.'s, Consultants.", icon: 'Users' },
  { title: 'Cost-Effective Solutions', desc: 'Leverage cheap labour and pre-built loops tailored to client needs.', icon: 'Settings' },
  { title: 'Quick Turnaround', desc: 'Quick testing, Single-window for analysis, verification, validation.', icon: 'Zap' },
  { title: 'Custom-Built Set-Up', desc: 'Our EPC team creates custom skids quickly. Local network accelerates projects.', icon: 'Cpu' },
  { title: 'Value Creation', desc: 'Deploying sustainable practices to efficiently create and deliver value for customers.', icon: 'Award' },
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
           <img src={resolveImageUrl(leader.image)} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
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
          {leader.desc && leader.desc.length > 100 
            ? `${leader.desc.substring(0, 100).trim()}...` 
            : (leader.desc || '')}
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

  // Dynamic data – initialized to hardcoded fallbacks
  const [capsData, setCapsData] = useState(TECH_VAL_DATA);
  const [industriesData, setIndustriesData] = useState(industries);
  const [industriesOverrides, setIndustriesOverrides] = useState([]);
  const [whyData, setWhyData] = useState(whyItems);
  const [whyIntro, setWhyIntro] = useState({
    label: 'Why Tridiagonal?',
    heading: 'Why Choose Us?',
    description: 'Tridiagonal Solutions, a top facility in Asia, offers cost-effective flow assurance testing for Oil & Gas majors. We are specialized in multiphase flow, erosion-corrosion, wax deposition, and sand management, etc. We collaborate with industry leaders, consultants, EPCs, OEMs and service providers, with flexible business models.'
  });
  const [headsData, setHeadsData] = useState(practiceHeads);
  const [slidesData, setSlidesData] = useState(heroResourceSlides);
  const [indsIntro, setIndsIntro] = useState({ 
    title: 'Industries', 
    subtitle: 'Your Trusted Partner in Technology Validation.' 
  });
  const [trailingCards, setTrailingCards] = useState([
    { title: 'Resources', desc: 'Explore technical brochures, case studies, and webinars detailing our validation methodologies and success stories.', href: '/resources', btnLabel: 'VIEW RESOURCES' },
    { title: 'Contact Us', desc: 'Uncover how our capabilities can propel your organization forward. Connect with our technology experts today.', href: '/contact-us', btnLabel: 'GET IN TOUCH', background: 'linear-gradient(135deg, #0c7196 0%, #6ca03e 100%)' }
  ]);
  const [heroData, setHeroData] = useState({
    badge: 'TECHNOLOGY VALIDATION',
    title: 'Technology Validation &',
    gradientText: 'Scale-up Centre',
    subtitle: 'Test | Validate | Scale',
    description: 'Future of flow is unfolding through rigorous testing, validation & proof of concept, upgrade the technology from TRL 3 to TRL 10 & shape the future of green energy.',
    ctaLabel: 'Talk to an Expert',
    brochureLink: '/resources/brochures',
    bannerImage: '/hubfs/Advanced%20Modeling%20Service%20Page%20Banner.png'
  });
  const [aboutData, setAboutData] = useState({
    heading: 'Technology Validation & Scale-up Centre',
    body1: 'Tridiagonal Solutions Pvt. Ltd., leveraging one of the Asia\'s largest experimentation lab and field-scale flow testing facilities to access indispensable production enhancement data.',
    body2: 'For over 15+ years, we\'ve been catering to the needs of Fortune 500 companies, to bridge the gap between data and informed decision-making, providing validation and proof of concept for optimal field operations.',
    image: '/hubfs/Advanced Modeling Service Page Banner.png'
  });
  const [capsIntroData, setCapsIntroData] = useState({
    label: 'Expertise',
    heading: 'Our',
    gradientText: 'Capabilities',
    description: ''
  });
  const [resSectionData, setResSectionData] = useState({
    heading: 'Resources',
    description: 'Explore the best practices and success stories of application of technology in process industry',
    categories: [
      { label: 'USE CASES', link: '#' },
      { label: 'WEBINARS', link: '#' },
      { label: 'BLOGS', link: '#' },
      { label: 'BROCHURE', link: '#' },
      { label: 'PUBLICATIONS', link: '#' }
    ],
    allResourcesBtn: { label: 'ALL RESOURCES', link: '/resources' }
  });
  const [partnersData, setPartnersData] = useState([
    { name: 'Coreform', logo: '/hubfs/coreform-logo.png' },
    { name: 'Siemens', logo: '/hubfs/siemens-logo.png' },
    { name: 'FactSage', logo: '/hubfs/factsage-logo.png' }
  ]);

  useEffect(() => {
    const INDUSTRY_ORDER = [
      'Oil & Gas',
      'Pharma and Medical Devices',
      'Metals, Mining & Cement',
      'Food, Beverages & CPG',
      'Chemicals & Petrochemicals',
      'Power & Renewables',
      'Others'
    ];

    const normalize = s => s?.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '').trim();

    // Step 1: Fetch service-specific CMS data
    let serviceOverrides = [];
    fetch(`${API_URL}/api/services/technology-validation-scale-up-centre`)
      .then(r => r.json())
      .then(json => {
        const d = json.data;
        if (!d) return;
        if (d.capabilities?.length) setCapsData(d.capabilities);
        if (d.whyItems?.length) setWhyData(d.whyItems);
        if (d.whyItemsIntro) setWhyIntro(prev => ({ ...prev, ...d.whyItemsIntro }));
        if (d.industriesIntro) setIndsIntro(prev => ({ ...prev, ...d.industriesIntro }));
        // Trailing cards: use DB data if any exist, otherwise keep defaults
        if (d.capabilitiesTrailingCards && d.capabilitiesTrailingCards.length > 0) {
          setTrailingCards(d.capabilitiesTrailingCards);
        }
        // If DB returns [] or undefined, the useState defaults (Resources + Contact Us) remain

        if (d.practiceHeads?.length) setHeadsData(d.practiceHeads);
        if (d.heroResourceSlides?.length) setSlidesData(d.heroResourceSlides);
        if (d.hero) setHeroData(prev => ({ ...prev, ...d.hero }));
        if (d.about) setAboutData(prev => ({ ...prev, ...d.about }));
        if (d.capabilitiesIntro) setCapsIntroData(prev => ({ ...prev, ...d.capabilitiesIntro }));
        if (d.resourcesSection) setResSectionData(prev => ({ ...prev, ...d.resourcesSection }));
        if (d.technologyPartners?.length) setPartnersData(d.technologyPartners);
        // Store overrides in local var (not state) to avoid re-render loop
        if (d.industries?.length) serviceOverrides = d.industries;
      })
      .catch(() => { /* use fallback data */ });

    // Step 2: Fetch global industries list (runs independently, not triggered by state)
    fetch(`${API_URL}/api/industries`)
      .then(r => r.json())
      .then(json => {
        if (json.data && Array.isArray(json.data)) {
          const filtered = json.data
            .filter(ind => ind.techValidation && ind.techValidation.enabled === true)
            .map(ind => {
              // Apply any service-specific description overrides
              const override = serviceOverrides.find(o => normalize(o.name) === normalize(ind.title));
              return {
                name: ind.title,
                desc: (override && override.desc) ? override.desc : ind.overview,
                href: `/industries/${ind.slug}/technology-validation-scale-up-centre`,
                image: ind.heroImage || ind.techValidation?.intro?.image || ''
              };
            })
            .sort((a, b) => {
              const idxA = INDUSTRY_ORDER.indexOf(a.name);
              const idxB = INDUSTRY_ORDER.indexOf(b.name);
              if (idxA !== -1 && idxB !== -1) return idxA - idxB;
              if (idxA !== -1) return -1;
              if (idxB !== -1) return 1;
              return a.name.localeCompare(b.name);
            });
          if (filtered.length > 0) setIndustriesData(filtered);
        }
      })
      .catch(err => console.error('Error fetching industries:', err));
  }, []); // Run only once on mount — no state dependencies


  useEffect(() => {
    // 2. Fetch Global Resources for this service
    fetch(`${API_URL}/api/resources?service=Technology Validation %26 Scale-up Centre`)
      .then(r => r.json())
      .then(json => {
        if (json.success && json.data.length > 0) {
          const types = ['Blog', 'Case Study', 'Publication', 'Brochure'];
          const latestByType = types.map(t => {
            return json.data.find(r => r.resourceType === t);
          }).filter(Boolean);

          if (latestByType.length > 0) {
            setSlidesData(latestByType.map(r => ({
              type: r.resourceType.toUpperCase() + (r.resourceType === 'Brochure' ? '' : 'S'),
              title: r.title,
              desc: extractExcerpt(r.content, 120),
              image: r.coverImage || '/hubfs/grid-1.jpg',
              href: r.resourceType === 'Brochure' ? (r.fileUrl || '#') : `/resources/${r.slug}`
            })));
          }
        }
      })
      .catch(err => console.error("Error fetching global resources:", err));
  }, []);

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
          background: `url('${resolveImageUrl(heroData.bannerImage)}') center center / cover no-repeat`,
          minHeight: 'auto',
          padding: '80px 0 60px',
        }}
      >
        {/* Dark overlay like careers */}

        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

          {/* Badge */}
          <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.12)', border: '1px solid rgba(71,188,135,0.3)', borderRadius: '30px', padding: '6px 20px', marginBottom: '24px' }}>
            <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>{heroData.badge}</span>
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
            {heroData.title}{' '}
            <span className="gradient-text">{heroData.gradientText}</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '14px', letterSpacing: '0.5px' }}>
            {heroData.subtitle}
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
            {heroData.description}
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button suppressHydrationWarning
              onClick={() => scrollTo('Contact Us')}
              className="btn-primary"
              style={{ padding: '14px 32px', borderRadius: '30px', fontWeight: '800', fontSize: '14px', border: 'none', cursor: 'pointer', letterSpacing: '0.5px' }}
            >
              {heroData.ctaLabel}
            </button>
            <Link
              href={heroData.brochureLink}
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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes playPulse {
          0% { box-shadow: 0 0 0 0 rgba(71,188,135,0.7); }
          70% { box-shadow: 0 0 0 16px rgba(71,188,135,0); }
          100% { box-shadow: 0 0 0 0 rgba(71,188,135,0); }
        }
        .about-play-btn-active { animation: playPulse 2s infinite; }
        .about-img-container:hover .about-play-overlay { opacity: 1 !important; }
        .about-img-container:hover .about-play-btn-active { transform: scale(1.1); }
      ` }} />
      <section
        id="about-practice"
        data-section="About Practice"
        ref={el => sectionRefs.current['About Practice'] = el}
        style={{ padding: '80px 0', background: '#1a1a1a' }}
      >
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,480px),1fr))', gap: '60px', alignItems: 'center' }}>
            {/* Left: Text */}
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '20px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>About Practice</span>
              </div>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: '800', marginBottom: '24px', lineHeight: 1.3 }}>
                {aboutData.heading}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '16px', marginBottom: '20px' }}>
                {aboutData.body1}
              </p>
              {aboutData.body2 && (
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', fontSize: '16px' }}>
                  {aboutData.body2}
                </p>
              )}
            </div>

            {/* Right: Image with Video Play Overlay */}
            <div
              className="about-img-container"
              onClick={() => aboutData.videoUrl && setIsVideoOpen(true)}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                minHeight: '380px',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: aboutData.videoUrl ? 'pointer' : 'default',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                background: '#1c1c1c'
              }}
            >
              {/* Background Image */}
              {aboutData.image && (
                <img
                  src={resolveImageUrl(aboutData.image)}
                  alt={aboutData.heading}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    position: 'absolute', inset: 0,
                    filter: aboutData.videoUrl ? 'brightness(0.75)' : 'none',
                    transition: 'filter 0.3s'
                  }}
                />
              )}

              {/* Dark gradient overlay */}
              {aboutData.videoUrl && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%)',
                  zIndex: 1
                }} />
              )}

              {/* Play Button Overlay */}
              <div
                className="about-play-overlay"
                style={{
                  position: 'absolute', inset: 0, zIndex: 2,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '14px',
                  opacity: aboutData.videoUrl ? 1 : 0.35,
                  transition: 'opacity 0.3s'
                }}
              >
                <div
                  className={aboutData.videoUrl ? 'about-play-btn-active' : ''}
                  style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: aboutData.videoUrl ? 'rgba(71,188,135,0.95)' : 'rgba(180,180,180,0.8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.3s, background 0.3s',
                    boxShadow: aboutData.videoUrl ? '0 0 0 8px rgba(71,188,135,0.2)' : 'none'
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true" style={{ marginLeft: '4px' }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                {aboutData.videoUrl && (
                  <span style={{ color: '#fff', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                    Watch Video
                  </span>
                )}
                {!aboutData.videoUrl && (
                  <span style={{ color: '#fff', fontSize: '12px', fontWeight: '600', opacity: 0.7, textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                    No video uploaded
                  </span>
                )}
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
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{capsIntroData.label}</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: '800', marginBottom: '24px', lineHeight: 1.2 }}>
              {capsIntroData.heading} <span className="gradient-text">{capsIntroData.gradientText}</span>
            </h2>
            {capsIntroData.description && (
              <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', fontSize: '16px' }}>
                {capsIntroData.description}
              </p>
            )}
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
            .cap-card-bg-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 1; transition: transform 0.6s ease; z-index: 0; }
            .cap-card:hover .cap-card-bg-img { transform: scale(1.08); }
            .cap-card-content { position: relative; z-index: 2; padding: 40px; height: 100%; display: flex; flex-direction: column; }
            .cap-card-content h3 { text-shadow: 0 2px 8px rgba(0,0,0,0.8); }
            .cap-card-content p { text-shadow: 0 1px 4px rgba(0,0,0,0.7); }
            
            @media (max-width: 1100px) { .cap-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 700px) { .cap-grid { grid-template-columns: 1fr; } .cap-card { height: 380px; } }
          ` }} />

          <div className="cap-grid">
            {capsData.map((cap, i) => (
              <Link key={i} href={`/services/technology-validation-scale-up-centre/${cap.slug}`} className="cap-card" style={{ textDecoration: 'none' }}>
                {/* Use plain img — Next.js Image with fill doesn't work inside position:absolute parent */}
                {cap.img && (
                  <img
                    src={resolveImageUrl(cap.img)}
                    alt={cap.title || ''}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      opacity: 0.3,
                      transition: 'transform 0.6s ease, opacity 0.4s',
                      zIndex: 0
                    }}
                    className="cap-card-bg-img"
                  />
                )}
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

            {trailingCards.map((card, i) => (
              <Link key={i} href={card.href} className="cap-card" style={{ textDecoration: 'none', background: card.background || '#1a1a1a' }}>
                 {card.background && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)', zIndex: 0 }} />}
                 {!card.background && <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.02)', zIndex: 0 }} />}
                 <div className="cap-card-content">
                   <div style={{ width: '40px', height: '2px', background: 'var(--color-teal)', marginBottom: '24px' }} />
                   <h3 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>{card.title}</h3>
                   <p style={{ color: card.background ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.7, flex: 1 }}>
                      {card.desc}
                   </p>
                   <div style={{ marginTop: 'auto' }}>
                     <div style={{ background: 'transparent', border: card.background ? '1px solid #fff' : '1px solid var(--color-teal)', color: '#fff', padding: '10px 24px', borderRadius: '40px', fontSize: '12px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                       {card.btnLabel} <ArrowRight size={14} color={card.background ? '#fff' : 'var(--color-teal)'} />
                     </div>
                   </div>
                 </div>
              </Link>
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
                {indsIntro.title}
              </h2>
              <p className="section-desc" style={{ color: '#fff', opacity: 0.9, fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
                {indsIntro.subtitle}
              </p>
              
              <div className="inds-img" style={{ width: '100%', aspectRatio: '1/1.1', borderRadius: '40px', overflow: 'hidden', position: 'relative' }}>
                <Image 
                  src={resolveImageUrl(industriesData[activeIndustryIdx !== null ? activeIndustryIdx : 0]?.image || '')} 
                  alt={industriesData[activeIndustryIdx !== null ? activeIndustryIdx : 0]?.name || ''} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  unoptimized 
                />
              </div>
            </div>

            {/* Right Column Custom Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column' }} onMouseLeave={() => setActiveIndustryIdx(null)}>
              {industriesData.map((ind, i) => {
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
                {resSectionData.heading}
              </h2>
              <p className={`section-desc ${resInView ? 'fade-in-up delay-200' : ''}`} style={{ color: '#fff', opacity: resInView ? 0.9 : 0, transition: 'opacity 0.6s', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px', maxWidth: '400px' }}>
                {resSectionData.description}
              </p>

              <div className={resInView ? 'fade-in-up delay-300' : ''} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px', opacity: resInView ? 1 : 0 }}>
                {(resSectionData.categories || []).map((cat, i) => (
                  <Link href={cat.link || '#'} key={i} className="resource-link-card" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 20px', background: '#2d2d2d', borderRadius: '4px',
                    borderLeft: '2px solid var(--color-teal)', color: 'var(--color-teal)',
                    textDecoration: 'none', fontWeight: '800', letterSpacing: '0.02em', fontSize: '18px'
                  }}>
                    {cat.label} <ArrowRight size={16} color="var(--color-teal)" />
                  </Link>
                ))}
              </div>

              <span className={resInView ? 'fade-in-up delay-400' : ''} style={{ opacity: resInView ? 1 : 0 }}>
                <Link href={resSectionData.allResourcesBtn?.link || '/resources'} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'var(--gradient-brand)', color: '#000',
                  fontWeight: '700', textTransform: 'uppercase',
                  padding: '12px 24px', borderRadius: '40px',
                  fontSize: '13px', letterSpacing: '0.04em', textDecoration: 'none'
                }}>
                  {resSectionData.allResourcesBtn?.label || 'ALL RESOURCES'} <ArrowRight size={14} color="#000" />
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
                    display: 'flex', width: `${(slidesData.length + 1) * 100}%`,
                    transform: `translateX(-${resourceSlide * (100 / (slidesData.length + 1))}%)`,
                    transition: resInTransition ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none', height: '100%'
                  }}>
                    {[...slidesData, slidesData[0]].map((slide, idx) => (
                      <div key={idx} style={{ width: `${100 / (slidesData.length + 1)}%`, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {/* Top Image Box */}
                        <div className="resource-card-image" style={{ position: 'relative', background: '#ccc' }}>
                          <Image
                            src={resolveImageUrl(slide.image)}
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
                {slidesData.map((_, idx) => (
                  <button suppressHydrationWarning
                    key={idx}
                    onClick={() => {
                      setResInTransition(true);
                      setResourceSlide(idx);
                    }}
                    style={{
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: (resourceSlide === slidesData.length ? 0 : resourceSlide) === idx ? 'var(--color-teal)' : '#fff',
                      border: 'none', cursor: 'pointer', padding: 0,
                      opacity: (resourceSlide === slidesData.length ? 0 : resourceSlide) === idx ? 1 : 0.8
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
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{whyIntro.label}</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: '800', marginBottom: '20px' }}>
              {whyIntro.heading}
            </h2>
            {whyIntro.description && (
              <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', fontSize: '16px' }}>
                {whyIntro.description}
              </p>
            )}
          </div>
          
          <div className="why-grid-layout">
            {whyData.map((item, i) => (
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
                  <DynamicIcon name={item.icon} size={32} strokeWidth={1.5} />
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
                      {partnersData.map((p, pIdx) => (
                        <img 
                          key={pIdx}
                          src={resolveImageUrl(p.logo)} 
                          alt={p.name} 
                          style={{ height: p.logo.includes('siemens') ? '50px' : '35px', width: 'auto', objectFit: 'contain', filter: p.logo.includes('siemens') ? 'brightness(10)' : 'none', flexShrink: 0 }} 
                        />
                      ))}
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


      {/* ── Video Modal ── */}
      {isVideoOpen && aboutData.videoUrl && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 10001, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(8px)', animation: 'overlayFade 0.3s ease' }}
          onClick={() => setIsVideoOpen(false)}
        >
          <div style={{ width: '100%', maxWidth: '960px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              suppressHydrationWarning
              onClick={() => setIsVideoOpen(false)}
              style={{
                position: 'absolute', top: '-52px', right: '0',
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%', width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '20px', lineHeight: 1, transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              ✕
            </button>

            {/* Video Player */}
            {(aboutData.videoUrl.includes('youtube.com') || aboutData.videoUrl.includes('youtu.be') || aboutData.videoUrl.includes('vimeo.com')) ? (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '16px', background: '#000', boxShadow: '0 30px 80px rgba(0,0,0,0.8)' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, borderRadius: '16px' }}
                  src={aboutData.videoUrl.includes('youtu.be')
                    ? `https://www.youtube.com/embed/${aboutData.videoUrl.split('/').pop()}?autoplay=1`
                    : aboutData.videoUrl.includes('watch?v=')
                    ? `https://www.youtube.com/embed/${new URLSearchParams(aboutData.videoUrl.split('?')[1]).get('v')}?autoplay=1`
                    : aboutData.videoUrl
                  }
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                controls
                autoPlay
                style={{ width: '100%', height: 'auto', borderRadius: '16px', outline: 'none', background: '#000', boxShadow: '0 30px 80px rgba(0,0,0,0.8)', display: 'block' }}
              >
                <source src={resolveImageUrl(aboutData.videoUrl)} type="video/mp4" />
                <source src={resolveImageUrl(aboutData.videoUrl)} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
