'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { API_URL } from '@/lib/apiConfig';
import SearchModal from './SearchModal';

/* ─── Navigation Data ─── */
const navItemsTemplate = [
  {
    label: 'Services',
    href: '#',
    heading: 'Services',
    headingDesc: 'Applying a breadth of Process and Technology expertise to address the range of business needs in Process Industry.',
    links: [
      { 
        title: 'Advanced Modeling & Simulation (CFD/FEA)', 
        sub: 'CFD, FEA, DEM, FSI, Digital Twin', 
        href: '/services/advance-modeling-and-simulation',
        subAreas: [
          { title: 'Computational Fluid Dynamics (CFD)', href: '/services/advance-modeling-and-simulation/computational-fluid-dynamics-cfd' },
          { title: 'Discrete Element Method (DEM)', href: '/services/advance-modeling-and-simulation/discrete-element-method-dem' },
          { title: 'Finite Element Analysis (FEA)', href: '/services/advance-modeling-and-simulation/finite-element-analysis-fea' },
          { title: 'Multiphysics Simulation', href: '/services/advance-modeling-and-simulation/multiphysics-simulation' },
          { title: 'Digital Twin', href: '/services/advance-modeling-and-simulation/digital-twin' }
        ]
      },
      { 
        title: 'Technology Validation & Scale-up Centre', 
        sub: 'Flow Assurance, Erosion, Corrosion, Green H₂', 
        href: '/services/technology-validation-scale-up-centre',
        subAreas: [
          { title: 'Flow Assurance', href: '/services/technology-validation-scale-up-centre/flow-assurance-and-physical-testing' },
          { title: 'Erosion Testing', href: '/services/technology-validation-scale-up-centre/erosion-sand-management' },
          { title: 'Corrosion Testing', href: '/services/technology-validation-scale-up-centre/corrosion-testing' },
          { title: 'Lab Scale Corrosion Testing', href: '/services/technology-validation-scale-up-centre/corrosion-testing' }
        ]
      },
      { title: 'Software – Scale-up & Tech Transfer', sub: 'MixIT, SimSight, PERMIT', href: 'https://tridiagonalsoftware.com', external: true },
      { title: 'Tridiagonal.ai – Domain-Driven AI', sub: 'Agentic AI, Digital Twins, Process Insights', href: 'https://tridiagonal.ai', external: true },
      { title: 'Partner Solutions', sub: 'Siemens, FactSage, Coreform', href: '/partner-solutions' },
    ],
    featured: [
      { title: 'CFD-DEM applied to Catalyst-Particles in Packed Bed Reactors', href: '#' },
      { title: 'Finite Element Analysis (FEA) in Oil & Gas', href: '#' },
      { title: 'CFD Modeling to Improve Separator Performance', href: '#' },
    ],
  },
  {
    label: 'Industries',
    href: '#',
    heading: 'Industries',
    headingDesc: 'Our in-depth domain / process understanding of the various industries enable us to support digitaltransformation, validation (CFD/FEA, Physical testing) needs of our customers',
    links: [
      { 
        title: 'Oil & Gas', 
        href: '#',
        subAreas: [
          { title: 'Advance Modeling & Simulation (CFD/FEA)', href: '/industries/oil-gas/advance-modeling-and-simulation' },
          { title: 'Technology Validation & Scale-up Centre', href: '/industries/oil-gas/technology-validation-scale-up-centre' }
        ]
      },
      { title: 'Pharma and Medical Devices', href: '#', subAreas: [
          { title: 'Advance Modeling & Simulation (CFD/FEA)', href: '/services/modeling' },
          { title: 'Technology Validation & Scale-up Centre', href: '/services/technology-validation-scale-up-centre' }
      ] },
      { title: 'Metals, Mining & Cement', href: '#', subAreas: [
          { title: 'Advance Modeling & Simulation (CFD/FEA)', href: '/services/modeling' }
      ] },
      { title: 'Food, Beverages & CPG', href: '#', subAreas: [
          { title: 'Technology Validation & Scale-up Centre', href: '/services/technology-validation-scale-up-centre' }
      ] },
      { title: 'Chemicals & Petrochemicals', href: '#', subAreas: [
          { title: 'Advance Modeling & Simulation (CFD/FEA)', href: '/services/modeling' }
      ] },
      { title: 'Power & Renewables', href: '#', subAreas: [] },
      { title: 'Others', href: '#', subAreas: [] },
    ],
    featured: [],
  },
  {
    label: 'Resources',
    href: '/resources',
    heading: 'Resources',
    headingDesc: 'Explore examples and success stories of how various technologies were applied to address the needs of our customers.',
    links: [
      { title: 'Blogs', href: '/resources/blogs' },
      { title: 'Case Studies', href: '/resources/case-studies' },
      { title: 'Publications / Patents', href: '/publications-and-patents' },
      { title: 'Brochures', href: '/resources/brochures' },
    ],
    featured: [
      { title: 'Finite Element Analysis (FEA) in Oil & Gas', href: '#' },
      { title: 'CFD Modeling to Improve Separator Performance', href: '#' },
    ],
  },
  {
    label: 'Events',
    href: '#',
    heading: 'Events',
    headingDesc: 'Look out for featured webinars and workshops to showcase expertise and best practices in AI-ML, CFD/FEA, etc.',
    links: [
      { title: 'Upcoming Webinars', href: '/events/upcoming-webinars' },
      { title: 'On Demand Webinars', href: '/events/on-demand-webinars' },
    ],
    featured: [
      { title: 'Finite Element Analysis (FEA) in Oil & Gas', href: '#' },
      { title: 'CFD Modeling to Improve Separator Performance', href: '#' },
    ],
  },
  {
    label: 'Who We Are',
    href: '/about-us',
    heading: 'Who we are',
    headingDesc: 'Trusted partner for delivering technologies solutions to the process industry with the combination of skillsets, technologies and domain know-how.',
    links: [
      { title: 'About Us', href: '/about-us' },
      { title: 'Our Team', href: '/about-us#our-team' },
    ],
    featured: [
      { title: 'Finite Element Analysis (FEA) in Oil & Gas', href: '#' },
      { title: 'CFD Modeling to Improve Separator Performance', href: '#' },
    ],
  },
];

const mobileSubLinks = {}; // Deprecated in favor of navItems hierarchy

/* ─── Chevron SVG ─── */
function ChevronDown({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.11l3.71-3.88a.75.75 0 111.08 1.04l-4.25 4.45a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}
function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59L10.22 7.12a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
    </svg>
  );
}
function CloseIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function ChevronUpArrow({ size = 24, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

/* ─── Main Navbar Component ─── */
export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [navItems, setNavItems]       = useState(navItemsTemplate);
  const [dynamicMobileIndustries, setDynamicMobileIndustries] = useState(mobileSubLinks.Industries);

  const [scrolled, setScrolled]       = useState(false);
  const [activeMenu, setActiveMenu]   = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [activeIndustry, setActiveIndustry] = useState(null);
  const [activeWhoWeAre, setActiveWhoWeAre] = useState(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const closeTimer = useRef(null);

  /* Scroll handler */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Fetch dynamic industries & services for the menu */
  useEffect(() => {
    // 1. Fetch Industries
    fetch(`${API_URL}/api/industries`)
      .then(res => res.json())
      .then(json => {
        if (!json.data) return;
        const seen = new Set();
        let uniqueIndustries = json.data.filter(ind => {
          if (seen.has(ind.title)) return false;
          seen.add(ind.title);
          return true;
        });
        const desiredOrder = ['Oil & Gas', 'Pharma and Medical Devices', 'Metals, Mining & Cement', 'Food, Beverages & CPG', 'Chemicals & Petrochemicals', 'Power & Renewables', 'Others'];
        uniqueIndustries.sort((a, b) => (desiredOrder.indexOf(a.title) === -1 ? 999 : desiredOrder.indexOf(a.title)) - (desiredOrder.indexOf(b.title) === -1 ? 999 : desiredOrder.indexOf(b.title)));

        const dynamicLinks = uniqueIndustries.map(ind => ({
          title: ind.title,
          href: `/industries/${ind.slug}`,
          subAreas: [
            ...(ind.modelingSimulation?.enabled ? [{ title: 'Advance Modeling & Simulation (CFD/FEA)', href: `/industries/${ind.slug}/advance-modeling-and-simulation` }] : []),
            ...(ind.techValidation?.enabled ? [{ title: 'Technology Validation & Scale-up Centre', href: `/industries/${ind.slug}/technology-validation-scale-up-centre` }] : [])
          ]
        }));
        setNavItems(prev => prev.map(item => item.label === 'Industries' ? { ...item, links: dynamicLinks } : item));
      })
      .catch(err => console.error("Industries fetching error:", err));

    // 2. Fetch Services
    fetch(`${API_URL}/api/services`)
      .then(res => res.json())
      .then(json => {
        if (!json.data) return;
        const dynamicSvcLinks = json.data.map(svc => ({
          title: svc.title,
          href: `/services/${svc.slug}`,
          sub: svc.description?.substring(0, 50) + '...',
          subAreas: (svc.capabilities || []).map(cap => ({
            title: cap.title,
            href: `/services/${svc.slug}/${cap.slug || slugify(cap.title)}`
          }))
        }));

        // Preserve external/partner links if not in DB
        const preservedLinks = [
          { title: 'Software – Scale-up & Tech Transfer', sub: 'MixIT, SimSight, PERMIT', href: 'https://tridiagonalsoftware.com', external: true },
          { title: 'Tridiagonal.ai – Domain-Driven AI', sub: 'Agentic AI, Digital Twins, Process Insights', href: 'https://tridiagonal.ai', external: true },
          { title: 'Partner Solutions', sub: 'Siemens, FactSage, Coreform', href: '/partner-solutions' }
        ];

        // Merge DB services with preserved ones (avoiding duplicates)
        const finalLinks = [...dynamicSvcLinks];
        preservedLinks.forEach(pl => {
          if (!finalLinks.find(dl => dl.title === pl.title)) finalLinks.push(pl);
        });

        setNavItems(prev => prev.map(item => item.label === 'Services' ? { ...item, links: finalLinks } : item));
      })
      .catch(err => console.error("Services fetching error:", err));
  }, []);

  /* Lock body when mobile open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* Click outside handler for mega menu */
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (label) => {
    setActiveMenu(prev => {
      if (prev === label) {
        setActiveWhoWeAre(null);
        return null;
      }
      if (prev !== label) setActiveWhoWeAre(null);
      return label;
    });
  };

  const handleMouseEnter = (label) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const activeItem = navItems.find(n => n.label === activeMenu);

  return (
    <div ref={menuRef}>
      {/* ── Header ── */}
      <header 
        className={`site-header${scrolled ? ' scrolled' : ''}${isHomePage && !scrolled ? ' transparent' : ''}`}
        style={{ transition: 'background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease' }}
      >
        {/* Main Nav */}
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, position:'relative', zIndex:50 }}>
            <Image
              src="/images/logo.png"
              alt="Tridiagonal Solutions"
              width={800}
              height={280}
              className="navbar-logo-img"
              quality={100}
              unoptimized={true}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="nav-item has-mega-menu"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`nav-link${activeMenu === item.label ? ' active' : ''}`}
                  aria-expanded={activeMenu === item.label}
                  aria-haspopup="true"
                  onClick={() => setActiveMenu(null)}
                >
                  {item.label}
                </Link>
              </div>
            ))}

            <Link href="/careers" className="nav-link">
              Careers
            </Link>

            {/* Right actions */}
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginLeft:'16px' }}>
              {/* Search */}
              <button
                suppressHydrationWarning
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                style={{ background:'none', border:'none', cursor:'pointer', color:'#fff', padding:'8px 12px', display:'flex', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-teal)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="0.5" style={{ transform: 'scaleX(-1)' }}>
                  <path fillRule="evenodd" d="M9 3a6 6 0 11-4.243 10.243l-3.535 3.535a1 1 0 01-1.414-1.414l3.535-3.535A6 6 0 019 3zm0 2a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Contact Us */}
              <Link href="/contact-us" className="nav-contact-btn">
                CONTACT US <ArrowRight size={14} />
              </Link>
            </div>
          </nav>

          {/* Mobile Hamburger and Search Wrapper */}
          <div className="mobile-hamburger" style={{ display: 'none', alignItems: 'center', gap: '24px' }}>
            {/* Search Icon */}
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              style={{ background:'none', border:'none', cursor:'pointer', color:'#fff', padding:0, display:'flex', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-teal)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
            >
              <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="0.5" style={{ transform: 'scaleX(-1)' }}>
                <path fillRule="evenodd" d="M9 3a6 6 0 11-4.243 10.243l-3.535 3.535a1 1 0 01-1.414-1.414l3.535-3.535A6 6 0 019 3zm0 2a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Hamburger Icon */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{ background:'none', border:'none', cursor:'pointer', color:'#fff', padding:0, display:'flex' }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mega Dropdown ── */}
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`mega-dropdown-wrapper${activeMenu === item.label ? ' open' : ''}`}
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="mega-dropdown-inner">
              <button 
                className="mega-close-btn" 
                onClick={() => setActiveMenu(null)}
                aria-label="Close menu"
              >
                <CloseIcon size={18} color="currentColor" />
              </button>

              {/* Col 1 – Heading */}
              <div className="mega-col-heading">
                <h3>{item.heading}</h3>
                {item.headingDesc && (
                  <p className="mega-heading-desc">{item.headingDesc}</p>
                )}
              </div>

              {/* Col 2 – Links */}
              <div className={`mega-links-grid${item.links.length <= 4 ? ' single-col' : ''}`}>
                {item.links.map((link) => {
                  const isService = item.label === 'Services';
                  const isIndustry = item.label === 'Industries';
                  const isWhoWeAre = item.label === 'Who We Are';
                  const isActiveNested = (isService && activeService === link.title) || (isIndustry && activeIndustry === link.title) || (isWhoWeAre && activeWhoWeAre === link.title);
                  
                  if (link.subAreas) {
                    return (
                      <Link
                        key={link.title}
                        href={link.href}
                        className={`mega-link-item ${isActiveNested ? 'active' : ''}`}
                        onClick={() => { 
                          if (isService) setActiveService(link.title); 
                          if (isIndustry) setActiveIndustry(link.title); 
                          if (isWhoWeAre) setActiveWhoWeAre(link.title); 
                          setActiveMenu(null);
                        }}
                        onMouseEnter={() => {
                          if (isService) setActiveService(link.title);
                          if (isIndustry) setActiveIndustry(link.title);
                        }}
                        style={{ display: 'block', width: '100%' }}
                      >
                        <span className="link-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: isActiveNested ? 'var(--color-teal)' : '#fff' }}>
                          {link.title}
                          <ArrowRight size={14} color={isActiveNested ? 'var(--color-teal)' : '#fff'} />
                        </span>
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="mega-link-item"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onClick={() => setActiveMenu(null)}
                    >
                      <span className="link-title">{link.title}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Col 3 – Featured resources or Sub Areas */}
              <div className="mega-featured-col">
                {item.label === 'Services' && activeService ? (
                  <>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textTransform: 'none', letterSpacing: 'normal', fontSize: '1rem', fontWeight: '500' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      Capability Areas
                    </h4>
                    <div style={{ marginTop: '24px' }}>
                      {item.links.find(l => l.title === activeService)?.subAreas?.map(sub => (
                        <Link key={sub.title} href={sub.href} className="resource-link-item" onClick={() => setActiveMenu(null)} style={{ textDecoration: 'none' }}>
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : item.label === 'Industries' && activeIndustry ? (
                  <>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textTransform: 'none', letterSpacing: 'normal', fontSize: '1rem', fontWeight: '500' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      Service Areas
                    </h4>
                    <div style={{ marginTop: '24px' }}>
                      {item.links.find(l => l.title === activeIndustry)?.subAreas?.map(sub => (
                        <Link key={sub.title} href={sub.href} className="resource-link-item" onClick={() => setActiveMenu(null)} style={{ textDecoration: 'none' }}>
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : item.label === 'Who We Are' && activeWhoWeAre && item.links.find(l => l.title === activeWhoWeAre)?.subAreas ? (
                  <>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textTransform: 'none', letterSpacing: 'normal', fontSize: '1rem', fontWeight: '500' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      Latest News
                    </h4>
                    <div style={{ marginTop: '24px' }}>
                      {item.links.find(l => l.title === activeWhoWeAre)?.subAreas?.map(sub => (
                        <Link key={sub.title} href={sub.href} className="resource-link-item" onClick={() => setActiveMenu(null)} style={{ textDecoration: 'none' }}>
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h4>Featured Resources</h4>
                    {item.featured.map((res) => (
                      <Link key={res.title} href={res.href} className="resource-link-item" onClick={() => setActiveMenu(null)}>
                        {res.title}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className="mega-arrow-up" onClick={() => setActiveMenu(null)}>
              <ChevronUpArrow size={24} />
            </div>
          </div>
        ))}
      </header>

      {/* ── Mobile Overlay & Drawer ── */}
      <div
        className={`mobile-overlay${mobileOpen ? ' open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} role="dialog" aria-label="Navigation" aria-modal="true">
        {/* Header */}
        <div className="mobile-menu-header">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Tridiagonal"
              width={800}
              height={280}
              style={{ objectFit:'contain', height: '48px', width:'auto' }}
              unoptimized={true}
            />
          </Link>
          <button
            suppressHydrationWarning
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{ background:'none', border:'none', color:'#fff', cursor:'pointer', padding:'8px' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <div key={item.label} className="mobile-nav-item">
              <button
                suppressHydrationWarning
                className="mobile-nav-link"
                onClick={() => {
                  setMobileExpanded(mobileExpanded === item.label ? null : item.label);
                  setMobileSubExpanded(null); // Reset Level 2 when toggling Level 1
                }}
                aria-expanded={mobileExpanded === item.label}
              >
                {item.label}
                <span style={{ transition:'transform 0.25s', transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none' }}>
                  <ChevronDown size={16} />
                </span>
              </button>
              
              <div className={`mobile-sub-links${mobileExpanded === item.label ? ' open' : ''}`}>
                {item.links.map((sub) => {
                  const hasSubAreas = sub.subAreas && sub.subAreas.length > 0;
                  
                  return (
                    <div key={sub.title} className="mobile-sub-item-wrap">
                      {hasSubAreas ? (
                        <>
                          <button
                            suppressHydrationWarning
                            className="mobile-sub-link"
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', border: 'none', background: 'none', textAlign: 'left' }}
                            onClick={() => setMobileSubExpanded(mobileSubExpanded === sub.title ? null : sub.title)}
                          >
                            {sub.title}
                            <span style={{ transition:'transform 0.25s', transform: mobileSubExpanded === sub.title ? 'rotate(180deg)' : 'none' }}>
                              <ChevronDown size={14} />
                            </span>
                          </button>
                          <div className={`mobile-sub-sub-links${mobileSubExpanded === sub.title ? ' open' : ''}`} style={{ paddingLeft: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                            {sub.subAreas.map((ssa) => (
                              <Link
                                key={ssa.title}
                                href={ssa.href}
                                className="mobile-sub-link"
                                style={{ fontSize: '0.85rem', opacity: 0.8 }}
                                onClick={() => setMobileOpen(false)}
                              >
                                {ssa.title}
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Link
                          href={sub.href}
                          className="mobile-sub-link"
                          target={sub.external ? '_blank' : undefined}
                          rel={sub.external ? 'noopener noreferrer' : undefined}
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.title}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mobile-nav-item">
            <Link href="/careers" className="mobile-nav-link" onClick={() => setMobileOpen(false)} style={{ color:'#fff' }}>
              Careers
            </Link>
          </div>
        </nav>

        {/* Contact CTA */}
        <Link href="/contact-us" className="mobile-contact-btn" onClick={() => setMobileOpen(false)}>
          CONTACT US <ArrowRight size={16} />
        </Link>
      </div>

      {/* ── Responsive show/hide ── */}
      <style>{`
        .mobile-sub-sub-links {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s ease-out;
        }
        .mobile-sub-sub-links.open {
          max-height: 500px;
        }
        .mobile-sub-links.open {
          max-height: 2000px; /* Increased to accommodate nested menus */
        }

        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .mobile-hamburger { display: none !important; }
        }

        /* Responsive Logo and Header Padding */
        .navbar-logo-img {
          object-fit: contain;
          height: 80px;
          width: auto;
          transition: height 0.3s ease;
        }
        .site-header {
          padding: 35px 0;
          transition: padding 0.3s ease, background 0.3s ease;
        }

        @media (max-width: 768px) {
          .navbar-logo-img {
            height: 50px;
          }
          .site-header {
            padding: 15px 0;
          }
          .mobile-hamburger {
            gap: 16px !important;
          }
        }
        @media (max-width: 480px) {
          .navbar-logo-img {
            height: 40px;
          }
          /* Ensure search and hamburger don't crowd out logo */
          .nav-inner {
            padding: 0 12px;
          }
        }
      `}</style>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
