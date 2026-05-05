'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/lib/apiConfig';
import DynamicFormRenderer from '@/components/DynamicFormRenderer';

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function ContactUsClient({ initialData, fallbackData }) {
  const [formRef, formInView] = useInView(0.1);
  const [officesRef, officesInView] = useInView(0.1);
  const [pageData, setPageData] = useState(initialData);
  const [formConfig, setFormConfig] = useState(null);

  useEffect(() => {
    // If we have a form ID, fetch the form configuration
    const d = pageData || fallbackData;
    if (d.selectedFormId) {
      if (typeof d.selectedFormId === 'object') {
        setFormConfig(d.selectedFormId);
      } else {
        fetch(`${API_URL}/api/forms/${d.selectedFormId}`)
          .then(r => r.json())
          .then(j => setFormConfig(j.data))
          .catch(err => console.error("Error fetching form:", err));
      }
    }
  }, [pageData, fallbackData]);

  const d = pageData || fallbackData;

  const contactIcon = (type) => {
    if (type === 'email' || type === 'fax') return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  };

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(71, 188, 135, 0.15) 0%, transparent 50%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: '40px' }}>
          <div className="contact-grid-wrapper" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '60px', alignItems: 'start' }}>
            <div style={{ paddingTop: '20px' }}>
              <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: '3.5rem', marginBottom: '15px' }}>
                <span className="gradient-text">{d.heroSection?.title}</span>
              </h1>
              <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', marginBottom: '40px' }}>
                {d.heroSection?.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {(d.infoCards || []).map((card, idx) => {
                  const inner = (
                    <div key={idx} className="fade-in-up delay-200" style={{ background: '#2a2a2a', borderRadius: '20px', padding: '30px 24px', border: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', display: 'flex', gap: '20px', alignItems: 'flex-start' }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(71,188,135,0.1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ width: '56px', height: '56px', flexShrink: 0, borderRadius: '50%', background: 'rgba(71,188,135,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(71,188,135,0.2)' }}>
                        {card.iconSvg ? <span dangerouslySetInnerHTML={{ __html: card.iconSvg }} /> : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        )}
                      </div>
                      <div>
                        <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{card.title}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.5 }}>{card.description}</p>
                      </div>
                    </div>
                  );
                  if (card.link) return <Link key={idx} href={card.link} style={{ textDecoration: 'none' }}>{inner}</Link>;
                  return inner;
                })}
              </div>
            </div>
            <div className="form-container" ref={formRef} style={{ background: '#242424', padding: '40px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', opacity: formInView ? 1 : 0, transform: formInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
              {!formConfig ? (
                <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '40px 20px' }}>
                  <p style={{ fontSize: '15px' }}>Loading form...</p>
                </div>
              ) : (
                <DynamicFormRenderer formConfig={formConfig} theme="dark" />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: '#fff', fontSize: '36px', fontWeight: '700' }}>{d.officesSection?.heading}</h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', margin: '0 auto' }}>{d.officesSection?.description}</p>
          </div>
          <div ref={officesRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px', opacity: officesInView ? 1 : 0, transform: officesInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
            {(d.officesSection?.offices || []).map((office, idx) => (
              <div key={idx} style={{ background: '#242424', borderRadius: '20px', padding: '40px 30px', border: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.3s, box-shadow 0.3s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  {office.flagImage && <img src={office.flagImage} alt={`${office.region} Flag`} style={{ height: '24px', width: 'auto', borderRadius: '2px', objectFit: 'contain' }} />}
                  <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700' }}>{office.region}</h3>
                </div>
                <h4 style={{ color: 'var(--color-teal)', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>{office.companyName}</h4>
                {(office.addresses || []).map((addr, aIdx) => (
                  <div key={aIdx}>
                    {addr.label && <h4 style={{ color: 'var(--color-teal)', fontSize: '15px', fontWeight: '600', marginBottom: '10px', marginTop: '16px' }}>{addr.label}</h4>}
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: aIdx === 0 ? '15px' : '14px', lineHeight: 1.7, marginBottom: aIdx < (office.addresses?.length - 1) ? '14px' : '20px' }}>{addr.text}</p>
                  </div>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(office.contacts || []).map((c, cIdx) => (
                    <div key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {contactIcon(c.type)}
                      <a href={c.value} style={{ color: 'var(--color-teal)', fontSize: '14px', textDecoration: 'none' }}>{c.label}</a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#0f0f0f', paddingBottom: '80px' }}>
        <div className="content-wrapper-lg">
          <div style={{ background: '#1a1a1a', backgroundImage: `url("${d.ctaSection?.backgroundImage}")`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '40px', padding: '80px 40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '700', marginBottom: '30px', lineHeight: 1.25 }} dangerouslySetInnerHTML={{ __html: d.ctaSection?.heading?.replace(/\n/g, '<br />') }} />
            <Link href={d.ctaSection?.buttonLink || '/'} className="careers-cta-btn">
              {d.ctaSection?.buttonText}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .careers-cta-btn {
          background: linear-gradient(90deg, #02b3df, #8cc541, #02b3df);
          background-size: 200% auto !important;
          animation: gradientShift 2.5s linear infinite;
          color: #1a1a1a;
          font-weight: 700;
          padding: 16px 36px;
          border-radius: 50px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        @media (max-width: 991px) {
          .contact-grid-wrapper { grid-template-columns: 1fr !important; }
        }
      `}} />
    </main>
  );
}
