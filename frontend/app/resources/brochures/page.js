'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/lib/apiConfig';

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
  const [brochures, setBrochures] = useState(mockBrochures);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Advanced Filters
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndustry, setActiveIndustry] = useState('All Industries');
  const [activeService, setActiveService] = useState('All Services');

  const [categories, setCategories] = useState(['All']);
  const [industries, setIndustries] = useState(['All Industries']);
  const [services, setServices] = useState(['All Services']);

  

  useEffect(() => {
    // Fetch Brochures
    fetch(`${API_URL}/api/resources?type=Brochure`)
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length > 0) setBrochures(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch Categories for Brochures
    fetch(`${API_URL}/api/categories?type=Brochure`)
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length > 0) {
          setCategories(['All', ...json.data.map(c => c.name)]);
        }
      })
      .catch(err => console.error("Filter fetch error", err));

    // Fetch Industries
    fetch(`${API_URL}/api/industries`)
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          const titles = json.data.map(i => (i.title || '').trim()).filter(Boolean);
          const unique = Array.from(new Set(titles)).filter(t => t !== 'All Industries');
          setIndustries(['All Industries', ...unique]);
        }
      })
      .catch(err => console.error('Industries fetch error:', err));

    // Fetch Services
    fetch(`${API_URL}/api/services`)
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          const titles = json.data.map(s => (s.title || '').trim()).filter(Boolean);
          const unique = Array.from(new Set(titles)).filter(t => t !== 'All Services');
          setServices(['All Services', ...unique]);
        }
      })
      .catch(err => console.error('Services fetch error:', err));
  }, [API_URL]);

  const filteredBrochures = brochures.filter(b => {
    const matchesSearch = (b.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || b.category === activeCategory;
    const matchesIndustry = activeIndustry === 'All Industries' || b.industry === activeIndustry;
    const matchesService = activeService === 'All Services' || b.service === activeService;
    return matchesSearch && matchesCategory && matchesIndustry && matchesService;
  });

  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#111' }}>
      {/* Dynamic Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #111 0%, #1a1a1a 100%)', padding: '100px 0 60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(155, 81, 224, 0.08) 0%, transparent 60%)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontWeight: '800', fontSize: 'clamp(32px, 6vw, 64px)', marginBottom: '20px', letterSpacing: '-0.03em' }}>
            Resource <span className="gradient-text">Library</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Download technical brochures, capability statements, and service overviews to learn more about our engineering expertise.
          </p>
        </div>
      </section>

      <section style={{ background: '#111', paddingBottom: '100px', minHeight: '60vh' }}>
        <div className="content-wrapper-lg">

          {/* Advanced Filter Bar */}
          <div style={{ background: '#1a1a1a', borderRadius: '24px', padding: '30px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', marginTop: '-30px', zIndex: 10 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>

              {/* Search */}
              <div style={{ flex: '1 1 300px', position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input
                  type="text"
                  placeholder="Search brochures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px 14px 45px', borderRadius: '12px', color: '#fff', outline: 'none', transition: 'border-color 0.3s' }}
                  suppressHydrationWarning
                />
              </div>

              {/* Industry Filter */}
              <div style={{ flex: '1 1 200px' }}>
                <select
                  value={activeIndustry}
                  onChange={(e) => setActiveIndustry(e.target.value)}
                  style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', borderRadius: '12px', color: '#fff', outline: 'none', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 15px top 50%', backgroundSize: '12px', cursor: 'pointer' }}
                  suppressHydrationWarning
                >
                  {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>

              {/* Service Filter */}
              <div style={{ flex: '1 1 200px' }}>
                <select
                  value={activeService}
                  onChange={(e) => setActiveService(e.target.value)}
                  style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', borderRadius: '12px', color: '#fff', outline: 'none', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 15px top 50%', backgroundSize: '12px', cursor: 'pointer' }}
                  suppressHydrationWarning
                >
                  {services.map(ser => <option key={ser} value={ser}>{ser}</option>)}
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  suppressHydrationWarning
                  style={{
                    background: activeCategory === cat ? '#00AEEF' : 'rgba(255,255,255,0.03)',
                    color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.6)',
                    border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    padding: '10px 24px',
                    borderRadius: '30px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '100px 0' }}>Fetching our brochures...</div>
          ) : filteredBrochures.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '40px' }}>
              {filteredBrochures.map((b, i) => (
                <Link key={i} href={`/resources/brochures/${b.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="br-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#1a1a1a', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)' }}>
                    <div style={{ position: 'relative', width: '100%', height: '240px' }}>
                      <Image src={b.coverImage || '/hubfs/Digital Twin.jpg'} alt={b.title} fill style={{ objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', color: '#9b51e0', padding: '6px 14px', borderRadius: '10px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(155, 81, 224, 0.2)' }}>
                        {b.category || 'BROCHURE'}
                      </div>
                    </div>
                    <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{b.industry}</span>
                        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{b.service}</span>
                      </div>
                      <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', lineHeight: '1.4', marginBottom: '15px' }}>{b.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: '1.6', marginBottom: '25px', flex: 1 }}>{b.excerpt && b.excerpt.length > 130 ? b.excerpt.substring(0, 130) + '...' : b.excerpt}</p>
                      <div style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
                        <span className="gradient-text">VIEW BROCHURE</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#9b51e0' }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderRadius: '32px', border: '2px dashed rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '10px', fontWeight: '700' }}>No brochures match your filters</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>Try resetting your filters or adjusting your search term.</p>
              <button onClick={() => { setActiveCategory('All'); setActiveIndustry('All Industries'); setActiveService('All Services'); setSearchQuery(''); }} style={{ marginTop: '30px', background: 'transparent', border: '1px solid #9b51e0', padding: '12px 30px', borderRadius: '30px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.background = 'rgba(155, 81, 224, 0.05)'; }} onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}>
                <span className="gradient-text">Reset All Filters</span>
              </button>
            </div>
          )}

        </div>
      </section>

      <style jsx>{`
        .br-card:hover { transform: translateY(-10px); border-color: rgba(155, 81, 224, 0.3) !important; box-shadow: 0 30px 60px rgba(0,0,0,0.4); }
      `}</style>
    </main>
  );
}
