'use client';
import { useState, useEffect } from 'react';

export default function PrivacyPolicy() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/api/privacy-policy`)
      .then(res => res.json())
      .then(json => {
        setData(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching Privacy Policy:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
        <p style={{ color: '#fff' }}>Loading Privacy Policy...</p>
      </main>
    );
  }

  // Fallback if no data is found
  if (!data) {
    return (
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <section style={{ padding: '80px 0', textAlign: 'center', background: '#1a1a1a', minHeight: '100vh' }}>
          <h1 style={{color: '#fff'}}>Privacy Policy Not Found</h1>
        </section>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* HERO SECTION */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)', minHeight: 'auto', padding: '80px 0 60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '15px' }}>
            {data.hero?.titleLine1} <span className="gradient-text">{data.hero?.titleLine2}</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            {data.hero?.description}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ background: '#1a1a1a', padding: '60px 0 80px' }}>
        <div className="content-wrapper-lg" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', lineHeight: '1.8' }}>
          
          {data.contentSections && data.contentSections.map((section, index) => (
            <div key={index} style={{ marginBottom: index === 0 ? '0' : '20px' }}>
              {/* Hide the visual title for 'Introduction' to adhere to the existing design where the first paragraph has no explicit H2. */}
              {section.title !== 'Introduction' && (
                <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>
                  {section.title}
                </h2>
              )}
              
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}

        </div>
      </section>
    </main>
  );
}
