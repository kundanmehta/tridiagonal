'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_URL } from '@/lib/apiConfig';



export default function UpcomingWebinars() {
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

  // Filter based on date > now AND title/desc match
  const filteredWebinars = webinars.filter(w => {
    const isUpcoming = new Date(w.eventDate) > new Date();
    const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          w.description.toLowerCase().includes(searchQuery.toLowerCase());
    return isUpcoming && matchesSearch;
  });

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)', minHeight: 'auto', padding: '100px 0 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>
            Upcoming <span className="gradient-text">Webinars</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Register for our expert-led live sessions to learn about the latest industry trends, advanced modeling methodologies, and tech solutions.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a', minHeight: '600px' }}>
        <div className="content-wrapper-lg">
          {/* Header & Search Bar Centered */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div>
              <div className="dvr-line" style={{ marginBottom: '16px' }}></div>
              <h2 id="browse-heading" className="section-title" style={{ color: 'var(--color-teal)', margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: 1 }}>
                Explore Sessions
              </h2>
            </div>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
              <input 
                suppressHydrationWarning
                type="text" 
                placeholder="Search webinars..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 24px 16px 50px',
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
          
          {/* Webinars List */}
          {filteredWebinars.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {filteredWebinars.map((evt, i) => (
                <Link key={i} href={`/events/upcoming-webinars/${evt.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ 
                    background: '#242424', 
                    borderRadius: '16px', 
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '32px',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    cursor: 'pointer'
                  }}
                  className="flex flex-col group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(8px)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 204, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      
                      <div style={{ flex: '1', minWidth: '300px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                          <span style={{ 
                            background: new Date(evt.eventDate) <= new Date() ? 'rgba(255, 165, 0, 0.1)' : 'rgba(0, 255, 204, 0.1)', 
                            color: new Date(evt.eventDate) <= new Date() ? '#FFA500' : 'var(--color-teal)', 
                            padding: '6px 14px', 
                            borderRadius: '20px', 
                            fontSize: '12px', 
                            fontWeight: '700', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            {new Date(evt.eventDate) <= new Date() ? 'OnDemand Webinar' : 'Upcoming Webinar'}
                          </span>
                          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            {new Date(evt.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                        </div>

                        <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', lineHeight: 1.4, marginBottom: '12px' }}>
                          {evt.title}
                        </h3>
                        
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.6, margin: 0, maxWidth: '850px' }}>
                          {evt.description.length > 220 ? evt.description.substring(0, 220) + '...' : evt.description}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-teal)', fontSize: '15px', fontWeight: '700', padding: '10px 0', minWidth: '140px', justifyContent: 'flex-end', letterSpacing: '0.5px' }}>
                        VIEW DETAILS 
                        <svg style={{ marginLeft: '8px' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                      
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <svg style={{ color: 'rgba(255,255,255,0.2)', marginBottom: '16px' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <h3 style={{ color: '#fff', fontSize: '20px', margin: '0 0 8px 0' }}>No webinars found</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>Try adjusting your search criteria</p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}
