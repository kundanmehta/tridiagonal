'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ChevronDown } from 'lucide-react';

const RESOURCE_DATA = [
  { 
    type: 'Webinar', 
    title: 'CFD-DEM applied to Catalyst-Particles in Packed Bed Reactors', 
    img: 'Blog CFD DEM.png',
    service: 'Advanced Modeling and Simulation',
    industry: 'Chemical and Petrochemical',
    application: 'Discrete Element Method'
  },
  { 
    type: 'Case Study', 
    title: 'Finite Element Analysis (FEA) in Oil & Gas Assets', 
    img: 'FEA-1.png',
    service: 'Advanced Modeling and Simulation',
    industry: 'Oil and Gas',
    application: 'FEA'
  },
  { 
    type: 'Webinar', 
    title: 'CFD Modeling to Improve Separator Performance', 
    img: 'CFD Analysis of a Neutralization Tank _.png',
    service: 'Advanced Modeling and Simulation',
    industry: 'Oil and Gas',
    application: 'CFD'
  },
  { 
    type: 'Blog', 
    title: 'Advancements in Mixer Design using Digital Twins', 
    img: 'Mixing Studies.webp',
    service: 'Advanced Modeling and Simulation',
    industry: 'Chemical and Petrochemical',
    application: 'ROM'
  },
  { 
    type: 'Case Study', 
    title: 'Flow Assurance in Subsea Pipelines', 
    img: 'Flow Assurance.jpg',
    service: 'Technology Validation and Scale Up',
    industry: 'Oil and Gas',
    application: null
  },
  { 
    type: 'Brochure', 
    title: 'Tridiagonal Technology Validation Center Breakdown', 
    img: 'Capture-1.webp',
    service: 'Technology Validation and Scale Up',
    industry: 'Others',
    application: null
  },
  {
    type: 'Case Study', 
    title: 'FSI Analysis of Cooling Pipes', 
    img: 'CFD FEA Coupled-1.png',
    service: 'Advanced Modeling and Simulation',
    industry: 'Power and Renewables',
    application: 'FSI'
  },
  {
    type: 'Blog', 
    title: 'Managing Asphaltene in Upstream Operations', 
    img: 'Asphaltene Blog.png',
    service: 'Technology Validation and Scale Up',
    industry: 'Oil and Gas',
    application: null
  }
];

const FILTER_CONFIG = {
  types: ['All', 'Blogs', 'Case Study', 'Brochures'],
  services: ['All', 'Advanced Modeling and Simulation', 'Technology Validation and Scale Up'],
  industries: [
    'All', 'Oil and Gas', 'Pharma and Medical Device', 'Cement, Metals and Mining', 
    'Food, Beverages and GPG', 'Chemical and Petrochemical', 'Power and Renewables', 
    'HVAC', 'Others'
  ],
  applications: [
    'All', 'CFD', 'Discrete Element Method', 'FEA', 'Multiphase', 'ROM', 'FSI', 'FIV/AIV'
  ]
};

function CustomSelect({ label, value, options, onChange, style = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = value === 'All' ? label : value;

  return (
    <div ref={containerRef} style={{ position: 'relative', minWidth: '220px', flex: '1', ...style }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '14px 20px',
          color: '#fff',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.3s',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-teal)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
          }
        }}
      >
        <span style={{ fontWeight: '500', color: value === 'All' ? 'rgba(255,255,255,0.6)' : '#fff' }}>
          {selectedLabel}
        </span>
        <ChevronDown 
          size={18} 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'none', 
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            color: isOpen ? 'var(--color-teal)' : 'rgba(255,255,255,0.4)'
          }} 
        />
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          left: 0,
          right: 0,
          background: '#1a1a1a',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '16px',
          zIndex: 1000,
          maxHeight: '320px',
          overflowY: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          animation: 'fadeIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)'
        }}>
          <div style={{ padding: '8px' }}>
            {options.map((opt) => (
              <div 
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  color: value === opt ? 'var(--color-teal)' : 'rgba(255,255,255,0.8)',
                  fontSize: '14px',
                  fontWeight: value === opt ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: value === opt ? 'rgba(71, 188, 135, 0.1)' : 'transparent',
                  marginBottom: '2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(71, 188, 135, 0.12)';
                  e.currentTarget.style.color = 'var(--color-teal)';
                  e.currentTarget.style.paddingLeft = '20px';
                }}
                onMouseLeave={(e) => {
                  if (value !== opt) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                    e.currentTarget.style.paddingLeft = '16px';
                  }
                }}
              >
                {opt === 'All' ? label : opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Resources() {
  const [filters, setFilters] = useState({
    type: 'All',
    service: 'All',
    industry: 'All',
    application: 'All',
    search: ''
  });

  const filteredResources = useMemo(() => {
    return RESOURCE_DATA.filter(res => {
      // Type mapping for data consistency
      const matchType = filters.type === 'All' || 
        (filters.type === 'Blogs' && (res.type === 'Blog' || res.type === 'Webinar')) || // Mocking webinars as blog-like for now
        (filters.type === 'Case Study' && res.type === 'Case Study') ||
        (filters.type === 'Brochures' && res.type === 'Brochure');

      const matchService = filters.service === 'All' || res.service === filters.service;
      const matchIndustry = filters.industry === 'All' || res.industry === filters.industry;
      
      // Conditional application matching
      const matchApplication = (filters.service !== 'Advanced Modeling and Simulation') || 
        filters.application === 'All' || 
        res.application === filters.application;

      const matchSearch = filters.search === '' || 
        res.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        res.type.toLowerCase().includes(filters.search.toLowerCase());

      return matchType && matchService && matchIndustry && matchApplication && matchSearch;
    });
  }, [filters]);

  const clearFilters = () => setFilters({ type: 'All', service: 'All', industry: 'All', application: 'All', search: '' });

  return (
    <main style={{ minHeight: '100vh', background: '#111' }}>
      {/* ── HERO ── */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)', paddingTop: '140px', paddingBottom: '60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(71, 188, 135, 0.1) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title" style={{ color: '#fff', fontWeight: '800', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '16px' }}>
            Technical <span className="gradient-text">Resources</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Access our technical library of case studies, publications, and insights across every engineering discipline.
          </p>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section style={{ background: '#111', padding: '20px 0 60px' }}>
        <div className="content-wrapper-lg">
          <div style={{ 
            background: 'rgba(255,255,255,0.02)', 
            border: '1px solid rgba(255,255,255,0.06)', 
            borderRadius: '16px', 
            padding: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', flex: 1 }}>
              <CustomSelect 
                label="All Types"
                value={filters.type}
                options={FILTER_CONFIG.types}
                onChange={(val) => setFilters({...filters, type: val})}
              />

              <CustomSelect 
                label="All Services"
                value={filters.service}
                options={FILTER_CONFIG.services}
                onChange={(val) => setFilters({...filters, service: val, application: 'All'})}
              />

              <CustomSelect 
                label="All Industries"
                value={filters.industry}
                options={FILTER_CONFIG.industries}
                onChange={(val) => setFilters({...filters, industry: val})}
              />

              {filters.service === 'Advanced Modeling and Simulation' && (
                <div style={{ animation: 'fadeIn 0.3s ease-out', flex: 1, minWidth: '220px' }}>
                  <CustomSelect 
                    label="All Applications"
                    value={filters.application}
                    options={FILTER_CONFIG.applications}
                    onChange={(val) => setFilters({...filters, application: val})}
                    style={{ borderColor: 'var(--color-teal)' }}
                  />
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '30px',
                  padding: '12px 20px 12px 48px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => e.target.parentElement.style.borderColor = 'var(--color-teal)'}
              />
            </div>
          </div>

          {/* Active Filter Tags */}
          {(filters.type !== 'All' || filters.service !== 'All' || filters.industry !== 'All' || filters.application !== 'All' || filters.search !== '') && (
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Active Filters:</span>
              <button 
                onClick={clearFilters}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-teal)', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Clear All <X size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── GRID ── */}
      <section style={{ background: '#111', paddingBottom: '120px' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {filteredResources.map((res, i) => (
               <div 
                key={i} 
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(255,255,255,0.06)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  transition: 'all 0.4s ease', 
                  cursor: 'pointer',
                  animation: 'fadeInUp 0.6s ease forwards'
                }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = 'rgba(71,188,135,0.3)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                }} 
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                  <div style={{ position: 'relative', width: '100%', height: '240px', background: '#000' }}>
                     <Image src={`/hubfs/${res.img}`} alt={res.title} fill style={{ objectFit: 'cover', opacity: '0.9' }} />
                     <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--color-teal)', color: '#000', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {res.type}
                     </div>
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                     <div>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>{res.industry}</div>
                        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '24px', lineHeight: '1.4' }}>{res.title}</h3>
                     </div>
                     <span style={{ color: 'var(--color-teal)', fontSize: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Read More 
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59l-2.13-2.13a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                        </svg>
                     </span>
                  </div>
               </div>
            ))}
          </div>
          
          {filteredResources.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(255,255,255,0.5)' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
              <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '12px' }}>No matches found</h3>
              <p style={{ maxWidth: '400px', margin: '0 auto 30px' }}>Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={clearFilters}
                style={{ background: 'var(--color-teal)', color: '#000', border: 'none', padding: '12px 30px', borderRadius: '40px', fontWeight: '800', cursor: 'pointer' }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}

const selectStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '12px 16px',
  color: '#fff',
  fontSize: '14px',
  outline: 'none',
  cursor: 'pointer',
  minWidth: '180px',
  transition: 'border-color 0.3s'
};
