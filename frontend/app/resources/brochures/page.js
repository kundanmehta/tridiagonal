'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const mockBrochures = [
  {
    title: 'Advanced Computational Fluid Dynamics Services Overview',
    service: 'Advanced Modeling & Simulation',
    industry: 'Oil & Gas',
    excerpt: 'Comprehensive overview of our CFD consulting solutions, encompassing multiphase flows, reacting flows, and heat transfer.',
    img: '/hubfs/Digital Twin.jpg',
    slug: 'cfd-services-overview',
    date: 'Dec 15, 2023'
  },
  {
    title: 'Digital Twin Solutions for Process Industries',
    service: 'Digital Transformation',
    industry: 'Chemicals & Petrochemicals',
    excerpt: 'A deep dive into building AI-driven predictive digital twins to drastically enhance asset reliability and yield.',
    img: '/hubfs/Flow Assurance.jpg',
    slug: 'digital-twin-solutions',
    date: 'Feb 10, 2024'
  },
  {
    title: 'Scale-Up & Validation Centre Capabilities',
    service: 'Technology Validation',
    industry: 'Pharma & Medical Devices',
    excerpt: 'Details on our cutting-edge laboratory facilities utilized to bridge the gap between bench scale and commercial manufacturing.',
    img: '/hubfs/image%20(10).png',
    slug: 'scaleup-validation-capabilities',
    date: 'Apr 02, 2024'
  },
  {
    title: 'Siemens Simcenter Engineering Partnership',
    service: 'Partner Solutions',
    industry: 'Metals & Mining',
    excerpt: 'Discover our integrated 1D and 3D simulation workflows powered by Siemens Simcenter to accelerate product design.',
    img: '/hubfs/Blog CFD DEM.png',
    slug: 'siemens-simcenter-partnership',
    date: 'Jun 22, 2024'
  }
];

export default function BrochuresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeService, setActiveService] = useState('All Services');
  const [activeIndustry, setActiveIndustry] = useState('All Industries');

  const services = ['All Services', 'Advanced Modeling & Simulation', 'Technology Validation', 'Digital Transformation', 'Partner Solutions'];
  const industries = ['All Industries', 'Oil & Gas', 'Pharma & Medical Devices', 'Metals & Mining', 'Chemicals & Petrochemicals', 'Food & Beverages'];

  // Filter based on search query, service, and industry
  const filteredBrochures = mockBrochures.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = activeService === 'All Services' || b.service === activeService;
    const matchesIndustry = activeIndustry === 'All Industries' || b.industry === activeIndustry;
    return matchesSearch && matchesService && matchesIndustry;
  });

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)', minHeight: 'auto', padding: '100px 0 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>
            Corporate <span className="gradient-text">Brochures</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Download comprehensive documentation regarding our services, capabilities, and industry-specific solutions. 
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a', minHeight: '600px' }}>
        <div className="content-wrapper-lg">
          
          {/* Header, Filters & Search Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div style={{ width: '100%', marginBottom: '10px' }}>
              <div className="dvr-line" style={{ marginBottom: '16px' }}></div>
              <h2 className="section-title" style={{ color: 'var(--color-teal)', margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: 1 }}>
                Explore Brochures
              </h2>
            </div>
            
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              
              {/* Dropdown Filters */}
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', flex: '1', minWidth: '300px' }}>
                <select
                  value={activeService}
                  onChange={(e) => setActiveService(e.target.value)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: '#242424',
                    color: '#fff',
                    fontSize: '15px',
                    outline: 'none',
                    cursor: 'pointer',
                    minWidth: '220px'
                  }}
                >
                  {services.map(svc => <option key={svc} value={svc}>{svc}</option>)}
                </select>

                <select
                  value={activeIndustry}
                  onChange={(e) => setActiveIndustry(e.target.value)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: '#242424',
                    color: '#fff',
                    fontSize: '15px',
                    outline: 'none',
                    cursor: 'pointer',
                    minWidth: '220px'
                  }}
                >
                  {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                <input 
                  suppressHydrationWarning
                  type="text" 
                  placeholder="Search brochures..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 24px 14px 44px',
                    borderRadius: '30px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(0,0,0,0.3)',
                    color: '#fff',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-teal)';
                    e.target.style.boxShadow = '0 0 15px rgba(0, 255, 204, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Card Grid List */}
          {filteredBrochures.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', 
              gap: '30px' 
            }}>
              {filteredBrochures.map((b, i) => (
                <Link key={i} href={`/resources/brochures/${b.slug}`} style={{ textDecoration: 'none' }}>
                  <article style={{ 
                    background: '#242424', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 204, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  }}
                  >
                    {/* Featured Image */}
                    <div style={{ position: 'relative', width: '100%', height: '220px', background: '#111' }}>
                      <Image 
                        src={b.img} 
                        alt={b.title} 
                        fill 
                        style={{ objectFit: 'cover', opacity: 0.9 }} 
                      />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '24px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          {b.date}
                        </span>
                        <span style={{ background: 'rgb(55 55 55 / 62%)', color: 'var(--color-teal)', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {b.industry}
                        </span>
                        <span style={{ background: 'rgb(70 187 134 / 22%)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {b.service}
                        </span>
                      </div>
                      
                      <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', lineHeight: 1.4, marginBottom: '12px' }}>
                        {b.title}
                      </h3>
                      
                      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px 0', flex: '1' }}>
                        {b.excerpt.length > 120 ? b.excerpt.substring(0, 120) + '...' : b.excerpt}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-teal)', fontSize: '15px', fontWeight: '700', letterSpacing: '0.5px', marginTop: 'auto' }}>
                        VIEW BROCHURE 
                        <svg style={{ marginLeft: '8px' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <svg style={{ color: 'rgba(255,255,255,0.2)', marginBottom: '16px', display: 'inline-block' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <h3 style={{ color: '#fff', fontSize: '20px', margin: '0 0 8px 0' }}>No brochures found</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>Try adjusting your search criteria or modifying the filters</p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
