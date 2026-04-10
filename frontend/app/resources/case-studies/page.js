'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const mockCaseStudies = [
  {
    title: 'Reducing Erosion in Subsea Pipelines',
    service: 'Advanced Modeling & Simulation',
    industry: 'Oil & Gas',
    excerpt: 'Detailed CFD analysis of sand erosion inside subsea tie-backs leading to a 30% reduction in pipe wear.',
    img: '/hubfs/Digital Twin.jpg',
    slug: 'reducing-erosion-subsea',
    date: 'Dec 02, 2023'
  },
  {
    title: 'Optimizing Mixing Bioreactors for Vaccine Production',
    service: 'Technology Validation',
    industry: 'Pharma & Medical Devices',
    excerpt: 'Using physical scale-up modeling and computational fluid dynamics to maximize cell viability in heavy agitation tanks.',
    img: '/hubfs/image%20(10).png',
    slug: 'optimizing-mixing-bioreactors',
    date: 'Jan 14, 2024'
  },
  {
    title: 'Digital Twin for Continuous Caster Tracking',
    service: 'Digital Transformation',
    industry: 'Metals & Mining',
    excerpt: 'Implementation of a holistic digital twin using Agentic AI to predict slab defects and thermal anomalies.',
    img: '/hubfs/Flow Assurance.jpg',
    slug: 'digital-twin-caster-tracking',
    date: 'Feb 19, 2024'
  },
  {
    title: 'Thermal Profiling of Heat Exchangers',
    service: 'Advanced Modeling & Simulation',
    industry: 'Chemicals & Petrochemicals',
    excerpt: 'Redesigning cross-flow heat exchangers using automated thermal CFD mapping to prevent localized overheating.',
    img: '/hubfs/CFD FEA Coupled-1.png',
    slug: 'thermal-profiling-heat-exchangers',
    date: 'Mar 10, 2024'
  },
  {
    title: 'Flow Assurance Strategy using Siemens Simcenter',
    service: 'Partner Solutions',
    industry: 'Oil & Gas',
    excerpt: 'A seamless integration of Siemens Simcenter to identify complex multiphase flow regimes during heavy oil extraction.',
    img: '/hubfs/Blog CFD DEM.png',
    slug: 'flow-assurance-siemens-simcenter',
    date: 'Apr 05, 2024'
  },
  {
    title: 'Crystallization Process Scale-up',
    service: 'Technology Validation',
    industry: 'Food & Beverages',
    excerpt: 'Experimental fluid dynamics and pilot plant testing applied to optimize commercial scale crystallization networks.',
    img: '/hubfs/image%20(12).png',
    slug: 'crystallization-process-scaleup',
    date: 'May 22, 2024'
  }
];

export default function CaseStudiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeService, setActiveService] = useState('All Services');
  const [activeIndustry, setActiveIndustry] = useState('All Industries');

  const services = ['All Services', 'Advanced Modeling & Simulation', 'Technology Validation', 'Digital Transformation', 'Partner Solutions'];
  const industries = ['All Industries', 'Oil & Gas', 'Pharma & Medical Devices', 'Metals & Mining', 'Chemicals & Petrochemicals', 'Food & Beverages'];

  // Filter based on search query, service, and industry
  const filteredCaseStudies = mockCaseStudies.filter(cs => {
    const matchesSearch = cs.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cs.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = activeService === 'All Services' || cs.service === activeService;
    const matchesIndustry = activeIndustry === 'All Industries' || cs.industry === activeIndustry;
    return matchesSearch && matchesService && matchesIndustry;
  });

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)', minHeight: 'auto', padding: '100px 0 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>
            Case <span className="gradient-text">Studies</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Explore examples and success stories of how various technologies were applied to address complex industrial challenges.
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
                Explore Case Studies
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
                  placeholder="Search case studies..." 
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
          {filteredCaseStudies.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', 
              gap: '30px' 
            }}>
              {filteredCaseStudies.map((cs, i) => (
                <Link key={i} href={`/resources/case-studies/${cs.slug}`} style={{ textDecoration: 'none' }}>
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
                        src={cs.img} 
                        alt={cs.title} 
                        fill 
                        style={{ objectFit: 'cover', opacity: 0.9 }} 
                      />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '24px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          {cs.date}
                        </span>
                        <span style={{ background: 'rgb(55 55 55 / 62%)', color: 'var(--color-teal)', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {cs.industry}
                        </span>
                        <span style={{ background: 'rgb(70 187 134 / 22%)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {cs.service}
                        </span>
                      </div>
                      
                      <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', lineHeight: 1.4, marginBottom: '12px' }}>
                        {cs.title}
                      </h3>
                      
                      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px 0', flex: '1' }}>
                        {cs.excerpt.length > 120 ? cs.excerpt.substring(0, 120) + '...' : cs.excerpt}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-teal)', fontSize: '15px', fontWeight: '700', letterSpacing: '0.5px', marginTop: 'auto' }}>
                        READ CASE STUDY 
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
              <h3 style={{ color: '#fff', fontSize: '20px', margin: '0 0 8px 0' }}>No case studies found</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>Try adjusting your search criteria or modifying the filters</p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
