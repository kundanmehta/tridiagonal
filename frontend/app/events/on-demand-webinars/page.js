'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_URL } from '@/lib/apiConfig';



export default function OnDemandWebinars() {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/webinars`, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } })
      .then(res => res.json())
      .then(json => {
        setWebinars(json.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredWebinars = webinars.filter(w => {
    const isOnDemand = new Date(w.eventDate) <= new Date();
    const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          w.description.toLowerCase().includes(searchQuery.toLowerCase());
    return isOnDemand && matchesSearch;
  });

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)', minHeight: 'auto', padding: '100px 0 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>
            On-Demand <span className="gradient-text">Webinars</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Access our library of technical sessions and expert presentations at your convenience.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a', minHeight: '600px' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div>
              <div className="dvr-line" style={{ marginBottom: '16px' }}></div>
              <h2 className="section-title" style={{ color: 'var(--color-teal)', margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700' }}>
                Technical Library
              </h2>
            </div>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <input 
                type="text" 
                placeholder="Search recordings..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 24px 16px 50px',
                  borderRadius: '30px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(0,0,0,0.3)',
                  color: '#fff',
                  outline: 'none'
                }}
              />
              <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          
          {loading ? (
             <div style={{ textAlign: 'center', color: '#94a3b8' }}>Loading webinars...</div>
          ) : filteredWebinars.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredWebinars.map((evt, i) => (
                <Link key={i} href={`/events/on-demand-webinars/${evt.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="webinar-list-item" style={{ 
                    background: '#1e2424', 
                    borderRadius: '16px', 
                    border: '1px solid rgba(71, 188, 135, 0.15)',
                    padding: '30px 40px',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ background: 'rgba(71, 188, 135, 0.12)', padding: '5px 14px', borderRadius: '20px', fontSize: '11px', color: '#43bd94', fontWeight: '800', letterSpacing: '0.5px' }}>
                           RECORDED
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                           {new Date(evt.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <div style={{ color: 'var(--color-teal)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                         VIEW DETAILS <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                    </div>

                    <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '12px', lineHeight: 1.3 }}>{evt.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.6, margin: 0, maxWidth: '900px' }}>
                       {evt.description}
                    </p>

                    <style jsx>{`
                      .webinar-list-item:hover {
                        background: #242c2c !important;
                        border-color: #43bd94 !important;
                        transform: translateY(-2px);
                        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                      }
                    `}</style>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '20px' }}>
              <h3 style={{ color: '#fff' }}>No webinars found</h3>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
