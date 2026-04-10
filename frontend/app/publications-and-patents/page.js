'use client';
import { useState } from 'react';
import Link from 'next/link';

const mockData = [
  {
    id: 1,
    title: 'System and Method for Online Prediction of Slab Defects in Continuous Casting',
    authors: 'Tridiagonal Solutions Inc.',
    type: 'Patent',
    date: 'August 21, 2024',
    url: '#'
  },
  {
    id: 2,
    title: 'Computational analysis of multiphase flow in heavy-duty bubble column reactors',
    authors: 'S. Joshi, M. Patel',
    type: 'Publication',
    date: 'March 15, 2023',
    url: '#'
  },
  {
    id: 3,
    title: 'Apparatus for Optimizing Hydrofoil Impeller Designs using Reduced-Order Models',
    authors: 'Tridiagonal Solutions Inc.',
    type: 'Patent',
    date: 'November 12, 2023',
    url: '#'
  },
  {
    id: 4,
    title: 'Numerical Simulation of Particulate Matter Dispersion in Coastal Industrial Zones',
    authors: 'A. Kumar, R. Singh',
    type: 'Publication',
    date: 'January 05, 2022',
    url: '#'
  },
  {
    id: 5,
    title: 'Coupled CFD-DPM approach for estimating sand erosion in subsea manifolds',
    authors: 'P. Verma, S. Kulkarni',
    type: 'Publication',
    date: 'September 18, 2023',
    url: '#'
  },
  {
    id: 6,
    title: 'Method for automated thermal mapping of cross-flow heat exchangers',
    authors: 'Tridiagonal Solutions Inc.',
    type: 'Patent',
    date: 'February 04, 2021',
    url: '#'
  }
];

export default function PublicationsPatentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All Types');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const types = ['All Types', 'Publication', 'Patent'];

  // Filter based on search query and type
  const filteredData = mockData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.authors.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === 'All Types' || item.type === activeType;
    return matchesSearch && matchesType;
  });

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)', padding: '80px 0 60px', minHeight: 'auto' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(71, 188, 135, 0.1) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>
            Publications & <span className="gradient-text">Patents</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Explore our extensive repository of published scientific research and proprietary technological patents.
          </p>
        </div>
      </section>

      <section style={{ background: '#1a1a1a', minHeight: '600px', padding: '60px 0 100px' }}>
        <div className="content-wrapper-lg">
          
          {/* Top Control Bar (Search & Filter) */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px', alignItems: 'center' }}>
            
            {/* Search Input */}
            <div style={{ flex: '1', minWidth: '300px', position: 'relative' }}>
              <input 
                suppressHydrationWarning
                type="text" 
                placeholder="Search by title or author..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px 14px 45px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: '#242424',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
              <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            {/* Custom Dropdown Filter */}
            <div 
              style={{ position: 'relative', display: 'flex', alignItems: 'center', background: '#242424', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '0 16px', height: '48px', minWidth: '320px', flex: '0.4', cursor: 'pointer' }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginRight: '8px' }}>Type</span>
              <div style={{ flex: '1', color: '#fff', fontSize: '14px', fontWeight: '600', userSelect: 'none' }}>
                {activeType}
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" style={{ pointerEvents: 'none', transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>

              {/* Options Menu */}
              {isDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '0',
                  right: '0',
                  background: '#242424',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '6px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  zIndex: 20,
                  overflow: 'hidden'
                }}>
                  {types.map(type => (
                    <div
                      key={type}
                      onClick={() => setActiveType(type)}
                      style={{
                        padding: '12px 16px',
                        color: activeType === type ? 'var(--color-teal)' : '#fff',
                        fontSize: '14px',
                        fontWeight: activeType === type ? '600' : '400',
                        background: activeType === type ? 'rgba(255,255,255,0.03)' : 'transparent',
                        transition: 'background 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        if (activeType !== type) e.target.style.background = 'rgba(255,255,255,0.05)';
                      }}
                      onMouseLeave={(e) => {
                        if (activeType !== type) e.target.style.background = 'transparent';
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>

          {/* List Container */}
          <div style={{ background: '#222222', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            {filteredData.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredData.map((item, index) => (
                  <div 
                    key={item.id} 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '20px 15px',
                      borderBottom: index !== filteredData.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      transition: 'background 0.3s ease',
                      flexWrap: 'wrap',
                      gap: '20px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    
                    {/* Left side content */}
                    <div style={{ flex: '1', minWidth: '250px', maxWidth: '100%', overflow: 'hidden' }}>
                      <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                        {item.title}
                      </h3>
                      
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                           {item.authors}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                           {item.date}
                        </div>

                        <div style={{ 
                          background: item.type === 'Patent' ? 'rgba(70, 187, 134, 0.15)' : 'rgba(0, 210, 255, 0.15)', 
                          color: item.type === 'Patent' ? 'var(--color-teal)' : '#00d2ff',
                          padding: '4px 10px', 
                          borderRadius: '20px', 
                          fontSize: '11px', 
                          fontWeight: '700', 
                          letterSpacing: '0.5px' 
                        }}>
                          {item.type}
                        </div>

                      </div>
                    </div>

                    {/* Right side CTA */}
                    <div>
                      <Link 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          background: 'linear-gradient(90deg, #0dd0e1, #8fe03c)',
                          color: '#000',
                          padding: '10px 24px',
                          borderRadius: '30px',
                          fontSize: '13px',
                          fontWeight: '800',
                          textDecoration: 'none',
                          letterSpacing: '0.5px',
                          transition: 'opacity 0.3s, transform 0.2s',
                          boxShadow: '0 4px 15px rgba(32, 227, 178, 0.3)',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.85'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                        onMouseDown={(e) => e.target.style.transform = 'scale(0.96)'}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                      >
                        VIEW MORE
                      </Link>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                 <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>No records found matching your filters.</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
