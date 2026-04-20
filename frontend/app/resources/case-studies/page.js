'use client';
import { useState, useEffect } from 'react';
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
  const [caseStudies, setCaseStudies] = useState(mockCaseStudies);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Advanced Filters
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndustry, setActiveIndustry] = useState('All Industries');
  const [activeService, setActiveService] = useState('All Services');

  const [categories, setCategories] = useState(['All']);
  const [industries, setIndustries] = useState(['All Industries']);
  const [services, setServices] = useState(['All Services']);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    // Fetch Case Studies
    fetch(`${API_URL}/api/resources?type=Case Study`)
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length > 0) setCaseStudies(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch Categories for Case Studies
    fetch(`${API_URL}/api/categories?type=Case Study`)
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

  const filteredCaseStudies = caseStudies.filter(cs => {
    const matchesSearch = (cs.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cs.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || cs.category === activeCategory;
    const matchesIndustry = activeIndustry === 'All Industries' || cs.industry === activeIndustry;
    const matchesService = activeService === 'All Services' || cs.service === activeService;
    return matchesSearch && matchesCategory && matchesIndustry && matchesService;
  });

  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#111' }}>
      {/* Dynamic Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #111 0%, #1a1a1a 100%)', padding: '100px 0 60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(0, 174, 239, 0.08) 0%, transparent 60%)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontWeight: '800', fontSize: 'clamp(32px, 6vw, 64px)', marginBottom: '20px', letterSpacing: '-0.03em' }}>
            Success <span className="gradient-text">Stories</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Explore how we've helped global leaders solve complex engineering challenges through advanced simulation and digital twins.
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
                  placeholder="Search case studies..."
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
                    color: activeCategory === cat ? '#000' : 'rgba(255,255,255,0.6)',
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
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '100px 0' }}>Fetching our success stories...</div>
          ) : filteredCaseStudies.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '40px' }}>
              {filteredCaseStudies.map((cs, i) => (
                <Link key={i} href={`/resources/case-studies/${cs.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="cs-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#1a1a1a', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)' }}>
                    <div style={{ position: 'relative', width: '100%', height: '240px' }}>
                      <Image src={cs.coverImage || '/hubfs/Digital Twin.jpg'} alt={cs.title} fill style={{ objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', color: '#00AEEF', padding: '6px 14px', borderRadius: '10px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(0, 174, 239, 0.2)' }}>
                        {cs.category}
                      </div>
                    </div>
                    <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{cs.industry}</span>
                        <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{cs.service}</span>
                      </div>
                      <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', lineHeight: '1.4', marginBottom: '15px' }}>{cs.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: '1.6', marginBottom: '25px', flex: 1 }}>{cs.excerpt && cs.excerpt.length > 130 ? cs.excerpt.substring(0, 130) + '...' : cs.excerpt}</p>
                      <div style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="gradient-text">READ CASE STUDY</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#00AEEF' }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderRadius: '32px', border: '2px dashed rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '10px', fontWeight: '700' }}>No stories match your filters</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>Try resetting your filters or adjusting your search term.</p>
              <button onClick={() => { setActiveCategory('All'); setActiveIndustry('All Industries'); setActiveService('All Services'); setSearchQuery(''); }} style={{ marginTop: '30px', background: 'transparent', border: '1px solid #00AEEF', padding: '12px 30px', borderRadius: '30px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.background = 'rgba(0, 174, 239, 0.05)'; }} onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}>
                <span className="gradient-text">Reset All Filters</span>
              </button>
            </div>
          )}

        </div>
      </section>

      <style jsx>{`
        .cs-card:hover { transform: translateY(-10px); border-color: rgba(0, 174, 239, 0.3) !important; box-shadow: 0 30px 60px rgba(0,0,0,0.4); }
      `}</style>
    </main>
  );
}
