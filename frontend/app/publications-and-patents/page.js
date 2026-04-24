'use client';
import { useState, useEffect } from 'react';
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
  const [items, setItems] = useState(mockData);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Advanced Filters
  const [activeType, setActiveType] = useState('All Types');
  const [activeIndustry, setActiveIndustry] = useState('All Industries');

  const [types, setTypes] = useState(['All Types']);
  const [industries, setIndustries] = useState(['All Industries']);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com';

  useEffect(() => {
    // Fetch Publications
    fetch(`${API_URL}/api/resources?type=Publication`)
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length > 0) setItems(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch Categories (Types) for Publications
    fetch(`${API_URL}/api/categories?type=Publication`)
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length > 0) {
          const names = json.data.map(c => (c.name || '').trim()).filter(Boolean);
          const unique = Array.from(new Set(names)).filter(n => n !== 'All Types');
          setTypes(['All Types', ...unique]);
        } else {
          setTypes(['All Types', 'Publication', 'Patent']);
        }
      })
      .catch(() => setTypes(['All Types', 'Publication', 'Patent']));

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
  }, [API_URL]);

  const filteredData = items.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.author || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeType === 'All Types' || item.category === activeType;
    const matchesIndustry = activeIndustry === 'All Industries' || item.industry === activeIndustry;
    return matchesSearch && matchesType && matchesIndustry;
  });

  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#111' }}>
      {/* Dynamic Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #111 0%, #1a1a1a 100%)', padding: '100px 0 60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(0, 174, 239, 0.08) 0%, transparent 60%)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontWeight: '800', fontSize: 'clamp(32px, 6vw, 64px)', marginBottom: '20px', letterSpacing: '-0.03em' }}>
            Publications & <span style={{ color: '#00AEEF' }}>Patents</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Explore our extensive scientific research and proprietary technologies advancing the process industry.
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
                  placeholder="Search title, author, or keywords..."
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

              {/* Type Filter */}
              <div style={{ flex: '1 1 200px' }}>
                <select
                  value={activeType}
                  onChange={(e) => setActiveType(e.target.value)}
                  style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 16px', borderRadius: '12px', color: '#fff', outline: 'none', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 15px top 50%', backgroundSize: '12px', cursor: 'pointer' }}
                  suppressHydrationWarning
                >
                  {types.map(t => <option key={t} value={t}>{t === 'All Types' ? 'All Publications' : t}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Results List */}
          {loading ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '100px 0' }}>Accessing our scientific archives...</div>
          ) : filteredData.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredData.map((item, i) => (
                <div key={i} className="pub-card" style={{ background: '#1a1a1a', borderRadius: '20px', padding: '30px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center', transition: 'all 0.3s ease' }}>
                  <div style={{ flex: '1', minWidth: '300px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                      <span style={{ background: 'rgba(0, 174, 239, 0.1)', color: '#00AEEF', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {item.category || 'Publication'}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>•</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600' }}>{item.industry}</span>
                    </div>
                    <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', lineHeight: '1.4', marginBottom: '15px' }}>{item.title}</h3>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        {item.author || item.authors}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div>
                    <a href={item.externalUrl || '#'} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: 'var(--color-teal)', color: '#000', padding: '12px 30px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 20px rgba(71, 188, 135, 0.2)'; }} onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}>
                      VIEW RECORD
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderRadius: '32px', border: '2px dashed rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '10px', fontWeight: '700' }}>No records match your filters</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>Try resetting your filters or adjusting your search term.</p>
              <button onClick={() => { setActiveType('All Types'); setActiveIndustry('All Industries'); setSearchQuery(''); }} style={{ marginTop: '30px', background: 'transparent', border: '1px solid var(--color-teal)', color: 'var(--color-teal)', padding: '12px 30px', borderRadius: '30px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', transition: 'all 0.3s' }}>Reset All Filters</button>
            </div>
          )}

        </div>
      </section>

      <style jsx>{`
        .pub-card:hover { border-color: rgba(71, 188, 135, 0.3) !important; background: #1f1f1f !important; transform: translateX(10px); }
      `}</style>
    </main>
  );
}
