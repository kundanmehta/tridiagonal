'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL, resolveImageUrl } from '@/lib/apiConfig';
import DynamicFormRenderer from '@/components/DynamicFormRenderer';

function ArrowRight({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59l-2.13-2.13a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
    </svg>
  );
}

export default function DynamicCapabilityClient({ serviceSlug, capabilitySlug }) {
  const [service, setService] = useState(null);
  const [capability, setCapability] = useState(null);
  const [useCases, setUseCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carousel State
  const [ucSlide, setUcSlide] = useState(0);
  const [ucTransition, setUcTransition] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // 1. Fetch Service Data
        const res = await fetch(`${API_URL}/api/services/${serviceSlug}?t=${Date.now()}`);
        
        // Guard against non-JSON responses (HTML error pages)
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Backend server is not reachable. Please ensure it is running.');
        }

        const json = await res.json();
        if (!json.data) throw new Error(`Service "${serviceSlug}" not found in database.`);
        
        setService(json.data);

        // 2. Find Capability by slug OR id (case-insensitive)
        const cap = json.data.capabilities?.find(c => 
          c.slug === capabilitySlug || 
          c.id === capabilitySlug ||
          c.slug?.toLowerCase() === capabilitySlug?.toLowerCase()
        );
        if (!cap) throw new Error(`Capability "${capabilitySlug}" not found. It may not be configured in the service yet.`);
        setCapability(cap);

        // 3. Fetch Use Cases filtered by service
        try {
          const ucRes = await fetch(`${API_URL}/api/resources?type=Case Study&service=${serviceSlug}&t=${Date.now()}`);
          const ucJson = await ucRes.json();
          setUseCases(ucJson.data || []);
        } catch {
          setUseCases([]); // Non-critical — don't fail page load
        }

      } catch (err) {
        console.error('DynamicCapabilityClient fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [serviceSlug, capabilitySlug]);


  // Use Case Carousel Auto-scroll
  useEffect(() => {
    if (useCases.length <= 3) return;
    const timer = setInterval(() => {
      setUcTransition(true);
      setUcSlide((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, [useCases]);

  useEffect(() => {
    if (ucSlide >= useCases.length && useCases.length > 0) {
      const timeout = setTimeout(() => {
        setUcTransition(false);
        setUcSlide(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [ucSlide, useCases.length]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: '#fff', background: '#111', minHeight: '100vh' }}>Loading...</div>;
  if (error || !capability) return <div style={{ padding: '100px', textAlign: 'center', color: '#fff', background: '#111', minHeight: '100vh' }}>Error: {error || 'Capability not found'}</div>;

  const contactSection = service.contactSection || { heading: 'Schedule a Call Today!', description: 'Uncover how our capabilities can propel your organization forward.', formSlug: 'contact-form' };

  return (
    <main style={{ background: '#111', color: '#fff', minHeight: '100vh' }}>
      
      {/* ── HERO ── */}
      <section style={{ position: 'relative', padding: '140px 0 100px', background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-teal) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', border: '1px solid rgba(71,188,135,0.2)', padding: '6px 20px', borderRadius: '30px', marginBottom: '32px' }}>
            <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>{service.title}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '28px', letterSpacing: '-0.02em' }}>
             {capability.title?.split('(')[0]} <span className="gradient-text">{capability.title?.includes('(') ? `(${capability.title.split('(')[1]}` : ''}</span>
          </h1>
          <p style={{ maxWidth: '850px', margin: '0 auto 48px', fontSize: '22px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontWeight: '400' }}>
             {capability.subtitle || capability.desc}
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <a href="#contact-us" className="btn-primary" style={{ padding: '16px 40px', borderRadius: '40px', fontWeight: '800', border: 'none', cursor: 'pointer', textDecoration: 'none' }}>
              Consult an Expert
            </a>
          </div>
        </div>
      </section>

      {/* ── DYNAMIC CONTENT SECTIONS ── */}
      <div style={{ background: '#111' }}>
        <div className="content-wrapper-lg">
          {capability.fullContent?.map((section, idx) => {
            const hasImage = section.image && section.image.trim() !== '';
            const isImageLeft = idx % 2 !== 0;

            if (!hasImage) {
              return (
                <section key={idx} style={{ padding: '80px 0', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', padding: '60px 40px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '40px', height: '2px', background: 'var(--color-teal)', margin: '0 auto 24px' }} />
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '28px' }}>{section.heading}</h2>
                    <p style={{ fontSize: '19px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginBottom: '32px' }}>{section.text}</p>
                    {section.bullets && (
                      <ul style={{ listStyle: 'none', padding: 0, display: 'inline-grid', gap: '16px', textAlign: 'left' }}>
                        {section.bullets.map((b, k) => (
                          <li key={k} style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.9)' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-teal)', marginTop: '10px' }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              );
            }

            return (
              <section key={idx} style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '80px', alignItems: 'center' }}>
                  <div style={{ order: isImageLeft ? 2 : 1 }}>
                     <div style={{ width: '40px', height: '2px', background: 'var(--color-teal)', marginBottom: '24px' }} />
                     <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '28px', lineHeight: 1.2 }}>{section.heading}</h2>
                     <p style={{ fontSize: '19px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginBottom: '32px' }}>{section.text}</p>
                     {section.bullets && (
                       <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
                         {section.bullets.map((b, k) => (
                           <li key={k} style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.9)' }}>
                             <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-teal)', marginTop: '10px' }} />
                             {b}
                           </li>
                         ))}
                       </ul>
                     )}
                  </div>
                  <div style={{ order: isImageLeft ? 1 : 2 }}>
                    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '480px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                      <Image src={resolveImageUrl(section.image)} alt={section.heading} fill style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* ── USE CASES CAROUSEL (Home Page Style) ── */}
      {useCases.length > 0 && (
        <section style={{ background: '#1c1f20', padding: '100px 0', overflow: 'hidden' }}>
          <div className="content-wrapper-lg">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
              <div style={{ flex: '0 0 350px' }}>
                <div style={{ width: '60px', height: '3px', background: 'var(--color-teal)', marginBottom: '24px' }} />
                <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700', lineHeight: 1.1, marginBottom: '20px' }}>Use Cases</h2>
                <p style={{ color: '#fff', opacity: 0.8, fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
                  Explore how we apply {capability.title} and other {service.title} techniques to solve complex industrial challenges.
                </p>
                <Link href="/resources/use-cases" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gradient-brand)', color: '#000', fontWeight: '700', padding: '12px 28px', borderRadius: '40px', fontSize: '13px', textDecoration: 'none' }}>
                  VIEW ALL CASES <ArrowRight size={14} color="#000" />
                </Link>
              </div>

              <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
                <div style={{
                  display: 'flex',
                  transition: ucTransition ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                  transform: `translateX(-${ucSlide * (100 / (useCases.length + 3))}%)`,
                  width: `calc(${(useCases.length + 3)} * 33.333%)`
                }}>
                  {[...useCases, ...useCases.slice(0, 3)].map((uc, idx) => (
                    <div key={idx} style={{ flex: `0 0 ${100 / (useCases.length + 3)}%`, padding: '0 12px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '4px', height: '100%', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ background: '#fff', borderRadius: '20px', aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
                           <Image src={resolveImageUrl(uc.image)} alt={uc.title} fill style={{ objectFit: 'contain', padding: '20px' }} />
                        </div>
                        <div style={{ padding: '24px' }}>
                          <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '600', marginBottom: '16px', minHeight: '50px' }}>{uc.title}</h4>
                          <Link href={uc.link || `/resources/use-cases/${uc.slug}`} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ArrowRight size={18} color="#000" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT US (Identical to Main Service Page) ── */}
      <section id="contact-us" style={{ padding: '120px 0', background: '#111' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '24px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Contact Us</span>
              </div>
              <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', marginBottom: '24px', lineHeight: 1.1 }}>{contactSection.heading}</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontSize: '18px' }}>{contactSection.description}</p>
            </div>
            <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '40px' }}>
              <DynamicFormRenderer formSlug={contactSection.formSlug} theme="dark" />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
