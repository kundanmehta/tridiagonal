'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com';

export default function Events() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/webinars`, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache' } })
      .then(res => res.json())
      .then(json => {
        setItems(json.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main>
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700' }}>
            News & <span className="gradient-text">Events</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
            Catch us globally at industry leading conferences, expos, and exclusive webinars.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <h2 className="section-title" style={{ color: '#fff', marginBottom: '40px', textAlign: 'center' }}>Featured Events</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
             {loading ? (
                <div style={{ textAlign: 'center', color: '#94a3b8' }}>Loading events...</div>
             ) : items.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#94a3b8' }}>No specific events listed at the moment.</div>
             ) : (
                items.slice(0, 5).map((evt, i) => (
                  <div key={i} style={{ background: '#242424', padding: '30px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                     <div style={{ flex: 1 }}>
                       <div style={{ color: 'var(--color-teal)', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>
                          {new Date(evt.eventDate) > new Date() ? 'UPCOMING WEBINAR' : 'PAST WEBINAR'}
                       </div>
                       <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>{evt.title}</h3>
                       <div style={{ display: 'flex', gap: '20px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                         <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                           {new Date(evt.eventDate).toLocaleDateString()}
                         </span>
                         <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                           {evt.duration || '60 mins'}
                         </span>
                       </div>
                     </div>
                     <Link 
                        href={`/events/${new Date(evt.eventDate) > new Date() ? 'upcoming-webinars' : 'on-demand-webinars'}/${evt.slug}`} 
                        className="btn-primary" 
                        style={{ padding: '12px 30px', fontSize: '14px' }}
                     >
                        View Details
                     </Link>
                  </div>
                ))
             )}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#242424', textAlign: 'center' }}>
        <div className="content-wrapper-lg">
           <h2 className="section-title" style={{ color: '#fff', marginBottom: '20px' }}>Host Tridiagonal For A Lunch & Learn</h2>
           <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 40px' }}>
              We regularly visit client headquarters to deliver highly focused, complimentary Lunch & Learn sessions regarding specific engineering challenges.
           </p>
           <Link href="/contact-us" style={{ display: 'inline-block', background: 'var(--color-teal)', color: '#000', padding: '15px 35px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
              Request a Session
           </Link>
        </div>
      </section>
    </main>
  );
}
