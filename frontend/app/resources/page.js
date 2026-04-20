'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ChevronDown } from 'lucide-react';

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
    <div ref={containerRef} style={{ position: 'relative', minWidth: '220px', flex: '1', ...style }} suppressHydrationWarning>
      <div
        onClick={() => setIsOpen(!isOpen)}
        suppressHydrationWarning
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
          e.currentTarget.style.borderColor = '#00AEEF';
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
            color: isOpen ? '#00AEEF' : 'rgba(255,255,255,0.4)'
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
                  color: value === opt ? '#00AEEF' : 'rgba(255,255,255,0.8)',
                  fontSize: '14px',
                  fontWeight: value === opt ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: value === opt ? 'rgba(71, 188, 135, 0.1)' : 'transparent',
                  marginBottom: '2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(71, 188, 135, 0.12)';
                  e.currentTarget.style.color = '#00AEEF';
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

const getResourceUrl = (res) => {
  if (res.resourceType === 'Publication') return res.externalUrl || '#';
  const typeMap = {
    'Blog': 'blogs',
    'Case Study': 'case-studies',
    'Brochure': 'brochures'
  };
  const category = typeMap[res.resourceType] || 'blogs';
  return `/resources/${category}/${res.slug}`;
};

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [industries, setIndustries] = useState(['All']);
  const [services, setServices] = useState(['All']);
  const [filters, setFilters] = useState({
    type: 'All',
    service: 'All',
    industry: 'All',
    search: ''
  });

  const FILTER_CONFIG = {
    types: ['All', 'Blogs', 'Case Study', 'Brochures', 'Publications']
  };

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    // Fetch Resources
    fetch(`${API_URL}/api/resources`)
      .then(res => res.json())
      .then(json => {
        if (json.data) setResources(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch Industries
    fetch(`${API_URL}/api/industries`)
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          const titles = json.data.map(i => (i.title || '').trim()).filter(Boolean);
          const unique = Array.from(new Set(titles)).filter(t => t !== 'All');
          setIndustries(['All', ...unique]);
        }
      })
      .catch(err => console.error('Industries fetch error:', err));

    // Fetch Services
    fetch(`${API_URL}/api/services`)
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          const titles = json.data.map(s => (s.title || '').trim()).filter(Boolean);
          const unique = Array.from(new Set(titles)).filter(t => t !== 'All');
          setServices(['All', ...unique]);
        }
      })
      .catch(err => console.error('Services fetch error:', err));
  }, [API_URL]);

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchType = filters.type === 'All' ||
        (filters.type === 'Blogs' && res.resourceType === 'Blog') ||
        (filters.type === 'Case Study' && res.resourceType === 'Case Study') ||
        (filters.type === 'Brochures' && res.resourceType === 'Brochure') ||
        (filters.type === 'Publications' && res.resourceType === 'Publication');

      const matchService = filters.service === 'All' || res.service === filters.service;
      const matchIndustry = filters.industry === 'All' || res.industry === filters.industry;

      const matchSearch = filters.search === '' ||
        (res.title || '').toLowerCase().includes(filters.search.toLowerCase()) ||
        (res.excerpt || '').toLowerCase().includes(filters.search.toLowerCase());

      return matchType && matchService && matchIndustry && matchSearch;
    });
  }, [resources, filters]);

  const clearFilters = () => setFilters({ type: 'All', service: 'All', industry: 'All', search: '' });

  return (
    <main style={{ minHeight: '100vh', background: '#111', paddingTop: 'var(--nav-height)' }}>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #111 0%, #1a1a1a 100%)', padding: '100px 0 60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(0, 174, 239, 0.08) 0%, transparent 60%)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontWeight: '800', fontSize: 'clamp(32px, 6vw, 64px)', marginBottom: '20px', letterSpacing: '-0.03em' }}>
            Technical <span className="gradient-text">Resources</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Access our comprehensive technical library of case studies, publications, and insights across every engineering discipline.
          </p>
        </div>
      </section>

      {/* ── UNIFIED FILTER BAR ── */}
      <section style={{ background: '#111', paddingBottom: '60px' }}>
        <div className="content-wrapper-lg">
          <div style={{
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
            padding: '30px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative',
            marginTop: '-40px',
            zIndex: 10
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', flex: 1 }}>
              <CustomSelect
                label="Resource Type"
                value={filters.type}
                options={FILTER_CONFIG.types}
                onChange={(val) => setFilters({ ...filters, type: val })}
              />

              <CustomSelect
                label="All Services"
                value={filters.service}
                options={services}
                onChange={(val) => setFilters({ ...filters, service: val })}
              />

              <CustomSelect
                label="All Industries"
                value={filters.industry}
                options={industries}
                onChange={(val) => setFilters({ ...filters, industry: val })}
              />
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
              <input
                type="text"
                placeholder="Search everything..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                style={{
                  width: '100%',
                  background: '#111',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '14px 20px 14px 48px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                suppressHydrationWarning
              />
            </div>
          </div>

          {/* Active Filter Tags */}
          {(filters.type !== 'All' || filters.service !== 'All' || filters.industry !== 'All' || filters.search !== '') && (
            <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', animation: 'fadeIn 0.3s ease' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Filters:</span>
              <button
                onClick={clearFilters}
                style={{ background: 'rgba(71, 188, 135, 0.1)', border: 'none', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.3s' }}
              >
                <span className="gradient-text">Clear All</span> <X size={14} style={{ color: 'var(--color-teal)' }} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── RESPONSIVE GRID ── */}
      <section style={{ background: '#111', paddingBottom: '120px' }}>
        <div className="content-wrapper-lg">
          {loading ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '100px 0' }}>Syncing with technical library...</div>
          ) : filteredResources.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
              {filteredResources.map((res, i) => (
                <Link
                  key={i}
                  href={getResourceUrl(res)}
                  target={res.resourceType === 'Publication' ? '_blank' : undefined}
                  style={{ textDecoration: 'none' }}
                >
                  <article
                    className="res-card"
                    style={{
                      background: '#1a1a1a',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '220px', background: '#000' }}>
                      <Image src={res.coverImage || '/hubfs/Digital Twin.jpg'} alt={res.title} fill style={{ objectFit: 'cover', opacity: '0.9' }} />
                      <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', color: 'var(--color-teal)', padding: '6px 14px', borderRadius: '10px', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(71, 188, 135, 0.2)' }}>
                        {res.resourceType}
                      </div>
                    </div>
                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{res.industry}</span>
                      </div>
                      <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#fff', marginBottom: '20px', lineHeight: '1.4', flex: 1 }}>{res.title}</h3>
                      <div style={{ fontSize: '13px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
                        <span className="gradient-text">{res.resourceType === 'Publication' ? 'EXTERNAL LINK' : 'READ MORE'}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#00AEEF' }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderRadius: '32px', border: '2px dashed rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '10px', fontWeight: '700' }}>No resources match your filters</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>Try exploring other categories or adjusting your search.</p>
              <button onClick={clearFilters} style={{ marginTop: '30px', background: 'transparent', border: '1px solid #00AEEF', padding: '12px 30px', borderRadius: '30px', fontWeight: '700', cursor: 'pointer' }}>
                <span className="gradient-text">Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        .res-card:hover { transform: translateY(-10px); border-color: rgba(0, 174, 239, 0.3) !important; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
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
