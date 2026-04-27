'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '@/lib/apiConfig';

const NAV_SECTIONS = ['About Practice', 'Opportunities', 'Why Tridiagonal', 'Industries'];

function ArrowRight({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59l-2.13-2.13a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
    </svg>
  );
}

const iconMap = {
  'Users': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  'Home': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M3 9h18" /><path d="M9 21V9" /><path d="M4 12h2" /><path d="M4 15h2" /><path d="M4 18h2" />
    </svg>
  ),
  'DollarSign': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  'Clock': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  'Settings': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  'TrendingUp': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" />
    </svg>
  ),
  'Briefcase': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  'Handshake': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  'Globe': (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
};

const getFullImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  if (path.startsWith('/hubfs') || path.startsWith('/images')) return path; // Hubspot or local public images
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

export default function TechValidationPage() {
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(null);
  const [industryData, setIndustryData] = useState(null);
  const [relatedIndustries, setRelatedIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [indRes, allIndsRes] = await Promise.all([
          fetch(`${API_URL}/api/industries/oil-gas`),
          fetch(`${API_URL}/api/industries`)
        ]);

        const indData = await indRes.json();
        const allInds = await allIndsRes.json();

        if (indData.data) {
          setIndustryData(indData.data);
        }

        if (allInds.data) {
          const filtered = allInds.data
            .filter(ind => ind.techValidation?.enabled && ind.slug !== 'oil-gas')
            .map(ind => ({
              name: ind.title,
              desc: ind.overview,
              image: ind.heroImage || ind.techValidation?.intro?.image || "/hubfs/grid-2.png",
              href: `/industries/${ind.slug}/technology-validation-scale-up-centre`
            }));
          setRelatedIndustries(filtered);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a', color: 'var(--color-teal)' }}>
      <div className="loader">Loading...</div>
    </div>
  );

  const data = industryData?.techValidation;
  if (!data) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Content not found</div>;

  const whyItems = data.whyChooseUs?.items || [];
  const hero = data.hero || {};
  const intro = data.intro || {};
  const mainBody = data.mainBody || {};
  const industriesSection = data.industriesSection || { title: 'Industries', subtitle: 'Your Trusted Partner in Technology Validation.' };

  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#1a1a1a' }}>

      {/* ── HERO ── */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: `url('${getFullImageUrl(hero.bgImage) || '/hubfs/Advanced%20Modeling%20Service%20Page%20Banner.png'}') center center / cover no-repeat`,
          minHeight: 'auto',
          padding: '80px 0 60px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26, 26, 26, 0.1)' }} />

        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgb(56 167 117)', border: '1px solid rgba(71,188,135,0.3)', borderRadius: '30px', padding: '6px 20px', marginBottom: '16px' }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Industry</span>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '600', display: 'block' }}>{industryData.title}</span>
          </div>

          <h1
            className="hero-title fade-in-up"
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: '50px',
              marginBottom: '20px',
              lineHeight: 1.1,
            }}
          >
            {hero.title?.split('Scale-up')[0]} <span className="gradient-text">Scale-up {hero.title?.split('Scale-up')[1]}</span>
          </h1>

          <p
            className="hero-desc fade-in-up delay-200"
            style={{
              color: 'rgb(255 255 255 / 87%)',
              fontSize: '18px',
              maxWidth: '800px',
              margin: '0 auto',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}
          >
            {hero.desc}
          </p>
        </div>
      </section>

      {/* ── ABOUT PRACTICE (Intro Section) ── */}
      <section
        id="about-practice"
        data-section="About Practice"
        ref={el => sectionRefs.current['About Practice'] = el}
        style={{ padding: '100px 0', background: '#1a1a1a' }}
      >
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,480px),1fr))', gap: '80px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '6px 18px', borderRadius: '30px', marginBottom: '24px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>{intro.badge || 'Expertise & Experience'}</span>
              </div>
              <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '32px', lineHeight: 1.2 }}>
                {intro.heading || 'Industry Overview'}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {intro.paragraphs?.map((p, i) => (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.9', fontSize: '18px', fontWeight: '400' }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div style={{
              position: 'relative',
              borderRadius: '32px',
              overflow: 'hidden',
              aspectRatio: '16/10',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <Image
                src={getFullImageUrl(intro.image) || "/hubfs/Digital Twin.jpg"}
                alt="Intro Visualization"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                style={{ objectFit: 'cover' }}
                unoptimized
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(71,188,135,0.1), transparent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── OPPORTUNITIES ── */}
      <section
        id="opportunities"
        data-section="Opportunities"
        ref={el => sectionRefs.current['Opportunities'] = el}
        style={{ padding: '80px 0', background: '#111' }}
      >
        <div className="content-wrapper-lg">
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{mainBody.badge || 'Testing & Validation'}</span>
            </div>
            <h2 className="section-title" style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '20px' }}>
              {mainBody.title || 'Opportunities'}
            </h2>
            <p className="section-desc" style={{ color: '#fff', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', fontSize: '18px', fontWeight: '400', opacity: 0.8 }}>
              {mainBody.desc}
            </p>
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
            .opp-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
            }
            @media (max-width: 1100px) {
              .opp-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 768px) {
              .opp-grid { grid-template-columns: 1fr; }
            }
            .opp-card {
              position: relative;
              border-radius: 24px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              overflow: hidden;
              display: flex;
              flex-direction: column;
              min-height: 420px;
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              padding: 32px;
              justify-content: flex-end;
            }
            .opp-card:hover {
              transform: translateY(-8px);
              border-color: var(--color-teal);
              box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            }
            .opp-bg {
              position: absolute;
              inset: 0;
              background-size: cover;
              background-position: center;
              opacity: 0.5;
              transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s;
            }
            .opp-card:hover .opp-bg {
              opacity: 0.7;
              transform: scale(1.05);
            }
            .opp-overlay {
                position: absolute;
                inset: 0;
                transition: opacity 0.4s;
            }
           
          ` }} />

          <div className="opp-grid">
            {mainBody.cards?.map((cap, i) => {
              const isContactCard = cap.title === 'Contacts Us' || cap.title === 'Contact Us';
              return (
                <div key={i} className="opp-card"
                  style={isContactCard ? {
                    background: 'linear-gradient(135deg, #085d6e 0%, #1d7a4b 50%, #588e33 100%)',
                    border: 'none',
                    justifyContent: 'flex-start'
                  } : {}}
                >
                  <div className="opp-bg" style={{
                    backgroundImage: isContactCard ? 'none' : `url('${getFullImageUrl(cap.image)}')`,
                    opacity: isContactCard ? 0 : 1
                  }} />
                  <div className="opp-overlay" style={{
                    background: isContactCard ? 'transparent' : undefined
                  }} />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {isContactCard && (
                      <div style={{ width: '40px', height: '3px', background: 'rgba(255,255,255,0.4)', marginBottom: '24px', borderRadius: '2px' }} />
                    )}
                    <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '16px', lineHeight: 1.3 }}>{cap.title}</h3>
                    <p style={{ color: isContactCard ? '#fff' : 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
                      {cap.desc}
                    </p>

                    {cap.link ? (
                      <Link
                        href={cap.link}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          background: isContactCard ? 'transparent' : 'linear-gradient(90deg, #0dd0e1, #8fe03c)',
                          border: isContactCard ? '1px solid #fff' : 'none',
                          color: isContactCard ? '#fff' : '#000', padding: '12px 32px', borderRadius: '30px',
                          fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px',
                          textDecoration: 'none', width: 'fit-content', cursor: 'pointer',
                          boxShadow: isContactCard ? 'none' : '0 4px 15px rgba(13,208,225,0.2)',
                          transition: 'transform 0.2s',
                          textTransform: 'uppercase'
                        }}
                      >
                        {cap.ctaText || (isContactCard ? 'CONTACT US' : 'VIEW MORE')} <ArrowRight size={14} color={isContactCard ? '#fff' : "#000"} />
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          if (isContactCard) {
                            window.location.href = '/contact-us';
                          }
                        }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          background: isContactCard ? 'transparent' : 'linear-gradient(90deg, #0dd0e1, #8fe03c)',
                          border: isContactCard ? '1px solid #fff' : 'none',
                          color: isContactCard ? '#fff' : '#000', padding: '12px 32px', borderRadius: '30px',
                          fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px',
                          textDecoration: 'none', width: 'fit-content', cursor: 'pointer',
                          boxShadow: isContactCard ? 'none' : '0 4px 15px rgba(13,208,225,0.2)',
                          transition: 'transform 0.2s',
                          textTransform: 'uppercase'
                        }}
                      >
                        {cap.ctaText || (isContactCard ? 'CONTACT US' : 'VIEW MORE')} <ArrowRight size={14} color={isContactCard ? '#fff' : "#000"} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY TRIDIAGONAL? ── */}
      <section
        id="why-tridiagonal"
        data-section="Why Tridiagonal"
        ref={el => sectionRefs.current['Why Tridiagonal'] = el}
        style={{ padding: '100px 0', background: '#111' }}
      >
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '24px' }}>{data.whyChooseUs?.title || 'Why Tridiagonal?'}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '1000px', margin: '0 auto', lineHeight: 1.6 }}>
              {data.whyChooseUs?.desc || `Tridiagonal Solutions provides specialized testing and validation services across scales to solve complex industrial challenges.`}
            </p>
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
            .why-grid-tech {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              border: 1px solid rgba(255,255,255,0.08);
            }
            .why-cell-tech {
              padding: 60px 40px;
              border-right: 1px solid rgba(255,255,255,0.08);
              border-bottom: 1px solid rgba(255,255,255,0.08);
              transition: all 0.3s;
              background: transparent;
            }
            .why-cell-tech:nth-child(3n) { border-right: none; }
            .why-cell-tech:nth-child(n+4) { border-bottom: none; }
            .why-cell-tech:hover {
              background: rgba(71,188,135,0.03);
            }
            @media (max-width: 1024px) {
              .why-grid-tech { grid-template-columns: repeat(2, 1fr); }
              .why-cell-tech:nth-child(3n) { border-right: 1px solid rgba(255,255,255,0.08); }
              .why-cell-tech:nth-child(2n) { border-right: none; }
              .why-cell-tech:nth-child(n+4) { border-bottom: 1px solid rgba(255,255,255,0.08); }
              .why-cell-tech:nth-child(n+5) { border-bottom: none; }
            }
            @media (max-width: 768px) {
              .why-grid-tech { grid-template-columns: 1fr; }
              .why-cell-tech { border-right: none !important; }
              .why-cell-tech:not(:last-child) { border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
            }
          `}} />

          <div className="why-grid-tech">
            {whyItems.map((item, i) => (
              <div key={i} className="why-cell-tech">
                <div style={{ color: 'var(--color-teal)', marginBottom: '24px' }}>{iconMap[item.icon] || iconMap['Users']}</div>
                <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      {data.industriesSection?.enabled !== false && (
        <section
          id="industries"
          data-section="Industries"
          ref={el => sectionRefs.current['Industries'] = el}
          style={{ padding: '100px 0', background: '#1c1c1c' }}
        >
          <div className="content-wrapper-lg">
            <div className="inds-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '80px' }}>
              <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
                <h2 className="section-title" style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700' }}>
                  {data.industriesSection?.title || 'Industries'}
                </h2>
                <p style={{ color: '#fff', opacity: 0.9, fontSize: '18px' }}>
                  {data.industriesSection?.subtitle || 'Your Trusted Partner in Technology Validation.'}
                </p>
                <div style={{ width: '100%', aspectRatio: '1/1.1', borderRadius: '40px', overflow: 'hidden', position: 'relative', marginTop: '40px' }}>
                  <Image
                    src={relatedIndustries[activeIndustryIdx || 0]?.image || "/hubfs/grid-2.png"}
                    alt="industry"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </div>
              </div>
              <div onMouseLeave={() => setActiveIndustryIdx(null)}>
                {relatedIndustries.length > 0 ? relatedIndustries.map((ind, i) => (
                  <div key={ind.name} onMouseEnter={() => setActiveIndustryIdx(i)} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '30px 0', cursor: 'pointer' }}>
                    <h3 style={{ color: activeIndustryIdx === i ? 'var(--color-teal)' : '#fff', transition: 'color 0.3s' }}>
                      {ind.name}
                    </h3>
                    {activeIndustryIdx === i && (
                      <div style={{ marginTop: '20px' }}>
                        <p style={{ color: 'rgba(255,255,255,0.8)' }}>{ind.desc}</p>
                        <Link href={ind.href} style={{ color: 'var(--color-teal)', fontWeight: '700', textDecoration: 'none', display: 'block', marginTop: '10px' }}>VIEW DETAILS →</Link>
                      </div>
                    )}
                  </div>
                )) : (
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading other industries...</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <div style={{ paddingBottom: '20px' }} />

    </main>
  );
}
