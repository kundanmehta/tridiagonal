'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─── Navigation Data ─── */
const navItems = [
  {
    label: 'Services',
    heading: 'Services',
    headingDesc: 'Applying a breadth of Process and Technology expertise to address the range of business needs in Process Industry.',
    links: [
      { title: 'Advanced Modeling & Simulation (CFD/FEA)', sub: 'CFD, FEA, DEM, FSI, Digital Twin', href: '/services/modeling' },
      { title: 'Technology Validation & Scale-up Centre', sub: 'Flow Assurance, Erosion, Corrosion, Green H₂', href: '/services/scale-up' },
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
    heading: 'Industries',
    headingDesc: 'Our in-depth domain / process understanding of the various industries enable us to support digitaltransformation, validation (CFD/FEA, Physical testing) needs of our customers',
    links: [
      { 
        title: 'Oil & Gas', 
        href: '#',
        subAreas: [
          { title: 'Advance Modeling & Simulation (CFD/FEA)', href: '/services/modeling' },
          { title: 'Technology Validation & Scale-up Centre', href: '/services/scale-up' }
        ]
      },
      { title: 'Pharma and Medical Devices', href: '#', subAreas: [
          { title: 'Advance Modeling & Simulation (CFD/FEA)', href: '/services/modeling' },
          { title: 'Technology Validation & Scale-up Centre', href: '/services/scale-up' }
      ] },
      { title: 'Metals, Mining & Cement', href: '#', subAreas: [
          { title: 'Advance Modeling & Simulation (CFD/FEA)', href: '/services/modeling' }
      ] },
      { title: 'Food, Beverages & CPG', href: '#', subAreas: [
          { title: 'Technology Validation & Scale-up Centre', href: '/services/scale-up' }
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
    heading: 'Resources',
    headingDesc: 'Explore examples and success stories of how various technologies were applied to address the needs of our customers.',
    links: [
      { title: 'Blogs', href: '/resources?type=blogs' },
      { title: 'Case Studies', href: '/resources?type=case-study' },
      { title: 'Publications / Patents', href: '/publications-and-patents' },
      { title: 'Brochure', href: '/resources?type=brochure' },
    ],
    featured: [
      { title: 'Finite Element Analysis (FEA) in Oil & Gas', href: '#' },
      { title: 'CFD Modeling to Improve Separator Performance', href: '#' },
    ],
  },
  {
    label: 'Events',
    heading: 'Events',
    headingDesc: 'Look out for featured webinars and workshops to showcase expertise and best practices in AI-ML, CFD/FEA, etc.',
    links: [
      { title: 'Upcoming Webinars', href: '/events?type=upcoming-webinars' },
      { title: 'On Demand Webinars', href: '/events?type=on-demand-webinars' },
      { title: 'News and Press Release', href: '/events?type=news-and-press-release' },
    ],
    featured: [
      { title: 'Finite Element Analysis (FEA) in Oil & Gas', href: '#' },
      { title: 'CFD Modeling to Improve Separator Performance', href: '#' },
    ],
  },
  {
    label: 'Who We Are',
    heading: 'Who we are',
    headingDesc: 'Trusted partner for delivering technologies solutions to the process industry with the combination of skillsets, technologies and domain know-how.',
    links: [
      { title: 'About Us', href: '/about-us' },
      { title: 'Our Team', href: '/about-us#our-team' },
      { title: 'News and Press Release', href: '/events?type=news-and-press-release', subAreas: [
        { title: 'Hannover Messe 2025', href: '/events?type=news-and-press-release' },
        { title: 'GRPC Event 2024', href: '/events?type=news-and-press-release' },
        { title: 'Tridiagonal Solutions Unveils New Brand Identity', href: '/events?type=news-and-press-release' },
      ]},
    ],
    featured: [
      { title: 'Finite Element Analysis (FEA) in Oil & Gas', href: '#' },
      { title: 'CFD Modeling to Improve Separator Performance', href: '#' },
    ],
  },
];

const mobileSubLinks = {
  Services: [
    { title: 'Advanced Modeling & Simulation', href: '/services/modeling' },
    { title: 'Technology Validation & Scale-up', href: '/services/scale-up' },
    { title: 'Software – Scale-up & Tech Transfer', href: 'https://tridiagonalsoftware.com' },
    { title: 'Tridiagonal.ai – Domain-Driven AI', href: 'https://tridiagonal.ai' },
    { title: 'Partner Solutions', href: '/partner-solutions' },
  ],
  Industries: [
    { title: 'Oil & Gas', href: '/industries/oil-gas' },
    { title: 'Pharma & Medical Devices', href: '/industries/pharma' },
    { title: 'Metals, Mining & Cement', href: '/industries/metals-mining' },
    { title: 'Food, Beverages & CPG', href: '/industries/food-beverages' },
    { title: 'Chemicals & Petrochemicals', href: '/industries/chemicals' },
    { title: 'Power & Renewables', href: '/industries/power' },
  ],
  Resources: [
    { title: 'Blogs', href: '/resources?type=blogs' },
    { title: 'Case Studies', href: '/resources?type=case-study' },
    { title: 'Publications / Patents', href: '/publications-and-patents' },
    { title: 'Brochure', href: '/resources?type=brochure' },
  ],
  Events: [
    { title: 'Upcoming Webinars', href: '/events?type=upcoming-webinars' },
    { title: 'On Demand Webinars', href: '/events?type=on-demand' },
    { title: 'News and Press Release', href: '/events?type=news' },
  ],
  'Who We Are': [
    { title: 'About Us', href: '/about-us' },
    { title: 'Our Team', href: '/about-us#our-team' },
    { title: 'News and Press Release', href: '/events?type=news-and-press-release' },
    { title: '↳ Hannover Messe 2025', href: '/events?type=news-and-press-release' },
    { title: '↳ GRPC Event 2024', href: '/events?type=news-and-press-release' },
    { title: '↳ Tridiagonal Solutions Unveils New Brand Identity', href: '/events?type=news-and-press-release' },
  ],
};

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
  const [scrolled, setScrolled]       = useState(false);
  const [activeMenu, setActiveMenu]   = useState(null);
  const [activeIndustry, setActiveIndustry] = useState('Oil & Gas');
  const [activeWhoWeAre, setActiveWhoWeAre] = useState(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const menuRef = useRef(null);
  const closeTimer = useRef(null);

  /* Scroll handler */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

  const activeItem = navItems.find(n => n.label === activeMenu);

  return (
    <div ref={menuRef}>
      {/* ── Header ── */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        {/* Main Nav */}
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, position:'relative', zIndex:50 }}>
            <Image
              src="/images/logo.png"
              alt="Tridiagonal Solutions"
              width={800}
              height={280}
              style={{ objectFit: 'contain', height: '80px', width: 'auto' }}
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
              >
                <button
                  suppressHydrationWarning
                  className={`nav-link${activeMenu === item.label ? ' active' : ''}`}
                  aria-expanded={activeMenu === item.label}
                  aria-haspopup="true"
                  onClick={() => toggleMenu(item.label)}
                >
                  {item.label}
                </button>
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
                onClick={() => alert("Search functionality coming soon!")}
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
              onClick={() => alert("Search functionality coming soon!")}
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
                  const isIndustry = item.label === 'Industries';
                  const isWhoWeAre = item.label === 'Who We Are';
                  const isActiveNested = (isIndustry && activeIndustry === link.title) || (isWhoWeAre && activeWhoWeAre === link.title);
                  
                  if (link.subAreas) {
                    return (
                      <div
                        key={link.title}
                        className={`mega-link-item ${isActiveNested ? 'active' : ''}`}
                        onClick={() => { if (isIndustry) setActiveIndustry(link.title); if (isWhoWeAre) setActiveWhoWeAre(link.title); }}
                        style={{ display: 'block', width: '100%' }}
                      >
                        <span className="link-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {link.title}
                          <ArrowRight size={14} />
                        </span>
                      </div>
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
                {item.label === 'Industries' ? (
                  <>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', textTransform: 'none', letterSpacing: 'normal', fontSize: '1rem', fontWeight: '500' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      Please select Service Areas
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
                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                aria-expanded={mobileExpanded === item.label}
              >
                {item.label}
                <span style={{ transition:'transform 0.25s', transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none' }}>
                  <ChevronDown size={16} />
                </span>
              </button>
              <div className={`mobile-sub-links${mobileExpanded === item.label ? ' open' : ''}`}>
                {(mobileSubLinks[item.label] || []).map((sub) => (
                  <Link
                    key={sub.title}
                    href={sub.href}
                    className="mobile-sub-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {sub.title}
                  </Link>
                ))}
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
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </div>
  );
}
