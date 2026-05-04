'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { API_URL, resolveImageUrl } from '@/lib/apiConfig';

function ArrowRight({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59l-2.13-2.13a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
    </svg>
  );
}


export default function DynamicAdvancedModelingPage({ data, parentIndustryName, industrySlug }) {
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(null);
  const [allIndustries, setAllIndustries] = useState([]);
  const [useCasesSlide, setUseCasesSlide] = useState(0);
  const [useCasesInTransition, setUseCasesInTransition] = useState(true);
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);
  const sectionRefs = useRef({});

  useEffect(() => {
    async function fetchSupportingData() {
      try {
        const allRes = await fetch(`${API_URL}/api/industries`);
        const allJson = await allRes.json();
        if (allJson.data) {
          const filtered = allJson.data
            .filter(ind => ind.modelingSimulation?.enabled && ind.slug !== industrySlug)
            .map(ind => ({
              name: ind.title,
              desc: ind.overview,
              image: resolveImageUrl(ind.heroImage || ind.modelingSimulation?.hero?.bgImage || '/hubfs/Metals, Mining & Cement (1)-1.png'),
              href: `/industries/${ind.slug}/advance-modeling-and-simulation`,
            }));
          setAllIndustries(filtered);
        }

        if (data?.showcase?.selectedCaseStudies?.length > 0) {
          const slugs = data.showcase.selectedCaseStudies;
          const csResults = await Promise.all(
            slugs.map(slug => fetch(`${API_URL}/api/resources/${slug}`).then(r => r.json()).catch(() => null))
          );
          setCaseStudies(csResults.filter(r => r && r.data).map(r => r.data));
        }
      } catch (err) {
        console.error('DynamicAdvancedModelingPage: fetch error', err);
      }
    }
    fetchSupportingData();
  }, [industrySlug, data]);

  const config = data || {};
  const hero = config.hero || { title: 'Advanced Modeling & Simulation', desc: '' };
  const intro = config.intro || { heading: 'High-Fidelity Engineering Solutions', paragraphs: [] };
  const mainBody = config.mainBody || { title: 'What We Do', cards: [] };
  const showcase = config.showcase || { title: 'Use Cases', cards: [] };
  const whyChooseUs = config.whyChooseUs || { title: 'Why Choose Us?', items: [] };
  const modalsFromDb = config.modals || [];

  const dynamicModals = {};
  modalsFromDb.forEach(m => { dynamicModals[m.capabilityName] = m; });

  const carouselCards = caseStudies.length > 0
    ? caseStudies.map(cs => ({
      title: cs.title,
      image: resolveImageUrl(cs.coverImage),
      href: `/resources/case-studies/${cs.slug}`,
    }))
    : (showcase.cards || []).map(c => ({
      ...c,
      image: resolveImageUrl(c.image),
      href: '/resources/case-studies'
    }));

  useEffect(() => {
    if (carouselCards.length === 0) return;
    const timer = setInterval(() => {
      setUseCasesInTransition(true);
      setUseCasesSlide(prev => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselCards.length]);

  const useCasesCardsCount = carouselCards.length;
  useEffect(() => {
    if (useCasesCardsCount > 0 && useCasesSlide === useCasesCardsCount) {
      const timeout = setTimeout(() => {
        setUseCasesInTransition(false);
        setUseCasesSlide(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [useCasesSlide, useCasesCardsCount]);




  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#1a1a1a' }}>

      {/* ── HERO ── */}
      <section className="hero-section" style={{
        position: 'relative', overflow: 'hidden',
        background: `url('${resolveImageUrl(hero.bgImage || '/hubfs/Advanced%20Modeling%20Service%20Page%20Banner.png')}') center center / cover no-repeat`,
        minHeight: 'auto', padding: '80px 0 60px',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,26,0.1)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgb(56 167 117)', border: '1px solid rgba(71,188,135,0.3)', borderRadius: '30px', padding: '6px 20px', marginBottom: '16px' }}>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Industry</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#fff', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: '600', display: 'block' }}>{parentIndustryName}</span>
          </div>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: '50px', marginBottom: '20px', lineHeight: 1.1 }}>
            {hero.title ? (() => {
              const words = hero.title.trim().split(' ');
              if (words.length <= 2) return <>{words.length > 1 ? words[0] + ' ' : ''}<span className="gradient-text">{words[words.length - 1]}</span></>;
              return <>{words.slice(0, -2).join(' ')} <span className="gradient-text">{words.slice(-2).join(' ')}</span></>;
            })() : null}
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255,255,255,0.87)', fontSize: '18px', maxWidth: '800px', margin: '0 auto', fontWeight: '500', letterSpacing: '0.5px' }}>
            {hero.desc}
          </p>
        </div>
      </section>


      {/* ── ABOUT PRACTICE ── */}
      <section id="about-practice" data-section="About Practice" ref={el => sectionRefs.current['About Practice'] = el} style={{ padding: '100px 0', background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,480px),1fr))', gap: '80px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '6px 18px', borderRadius: '30px', marginBottom: '24px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>{intro.badge}</span>
              </div>
              <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '32px', lineHeight: 1.2 }}>{intro.heading}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {intro.paragraphs?.map((p, idx) => (
                  <p key={idx} style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.9', fontSize: '18px' }}>{p}</p>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', aspectRatio: '16/10', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Image src={resolveImageUrl(intro.image || '/hubfs/Digital Twin.jpg')} alt="About Practice" fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit: 'cover' }} unoptimized />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg,rgba(71,188,135,0.1),transparent)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section id="capabilities" data-section="Capabilities" ref={el => sectionRefs.current['Capabilities'] = el} style={{ padding: '80px 0', background: '#111' }}>
        <div className="content-wrapper-lg">
          <div style={{ marginBottom: '60px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{mainBody.badge}</span>
            </div>
            <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '20px' }}>{mainBody.title}</h2>
            <p style={{ color: '#fff', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', fontSize: '16px', fontWeight: '500' }}>{mainBody.desc}</p>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `.cap-grid-d{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}@media(max-width:1024px){.cap-grid-d{grid-template-columns:repeat(2,1fr)}}@media(max-width:768px){.cap-grid-d{grid-template-columns:1fr}}` }} />
          <div className="cap-grid-d">
            {mainBody.cards?.map((cap, i) => (
              <div key={i}
                style={{ position: 'relative', background: '#141414', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '380px', transition: 'transform 0.3s,border-color 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(71,188,135,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${resolveImageUrl(cap.image)}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'relative', zIndex: 1, padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '16px', lineHeight: 1.3 }}>{cap.title}</h3>
                  <div style={{ flex: 1, marginBottom: '32px' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {cap.desc?.split('\n').map((line, idx) => {
                        const isSub = line.trim().startsWith('-') || line.trim().startsWith('○');
                        const cleanLine = line.replace(/^[•○\s-]*/, '').trim();
                        if (!cleanLine) return null;
                        return (
                          <li key={idx} style={{ position: 'relative', paddingLeft: isSub ? '42px' : '22px', fontSize: '16px', color: '#fff', lineHeight: '1.6', marginBottom: '10px', fontWeight: isSub ? '400' : '500' }}>
                            <span style={{ position: 'absolute', left: isSub ? '22px' : '0px', top: '8px', width: isSub ? '7px' : '8px', height: isSub ? '7px' : '8px', borderRadius: '50%', border: isSub ? '1.5px solid #fff' : 'none', background: isSub ? 'transparent' : '#fff' }} />
                            {cleanLine}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {dynamicModals[cap.title] && (
                    <button onClick={() => setSelectedCapability(cap.title)} suppressHydrationWarning
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(90deg,#0dd0e1,#8fe03c)', color: '#000', padding: '12px 24px', borderRadius: '30px', fontSize: '13px', fontWeight: '600', width: 'fit-content', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(13,208,225,0.2)', transition: 'transform 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {cap.ctaText || 'VIEW MORE'} <ArrowRight size={14} color="#000" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      {showcase.enabled !== false && (
        <section id="use-cases" data-section="Use Cases" ref={el => sectionRefs.current['Use Cases'] = el} style={{ background: '#242424', padding: '80px 0', overflow: 'hidden' }}>
          <div className="content-wrapper-lg">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
              <div style={{ flex: '0 0 450px', display: 'flex', flexDirection: 'column' }}>
                <div className="dvr-line" style={{ marginBottom: '16px' }} />
                <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700', lineHeight: 1.1, marginBottom: '20px' }}>{showcase.title || 'Use Cases'}</h2>
                <p style={{ color: '#fff', opacity: 0.9, fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>{showcase.desc}</p>
                <Link href={showcase.buttonLink || '/resources/case-studies'} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gradient-brand)', color: '#000', fontWeight: '700', textTransform: 'uppercase', padding: '12px 24px', borderRadius: '40px', fontSize: '13px', letterSpacing: '0.04em', textDecoration: 'none', width: 'fit-content' }}>
                  {showcase.buttonText || 'VIEW MORE'} <ArrowRight size={14} color="#000" />
                </Link>
              </div>
              <div style={{ flex: '1', minWidth: '0', position: 'relative' }}>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', transition: useCasesInTransition ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none', transform: `translateX(-${useCasesSlide * (100 / Math.min(3, carouselCards.length))}%)` }}>
                    {[...carouselCards, ...carouselCards.slice(0, 3)].map((card, idx) => (
                      <div key={idx} style={{ flex: `0 0 ${100 / Math.min(3, carouselCards.length)}%`, minWidth: 0, padding: '0 10px', boxSizing: 'border-box' }}>
                        <Link href={card.href || '/resources/case-studies'} style={{ textDecoration: 'none', display: 'block' }}>
                          <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', aspectRatio: '1/1', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '40px', transition: 'transform 0.3s ease,box-shadow 0.3s ease' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                          >
                            {card.image
                              ? <Image src={card.image} alt={card.title} fill sizes="33vw" style={{ objectFit: 'cover' }} unoptimized />
                              : <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#0d324d,#0dd0e1)' }} />
                            }
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                            <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: '700', lineHeight: 1.4, margin: 0, flex: 1 }}>{card.title}</h3>
                            <div style={{ width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#0dd0e1,#8fe03c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <ArrowRight size={16} color="#000" />
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '50px' }}>
                  {carouselCards.map((_, idx) => (
                    <button key={idx} suppressHydrationWarning onClick={() => { setUseCasesInTransition(true); setUseCasesSlide(idx); }}
                      style={{ width: '10px', height: '10px', borderRadius: '50%', background: (useCasesSlide % (carouselCards.length || 1)) === idx ? 'var(--color-teal)' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'background 0.3s', padding: 0 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── WHY TRIDIAGONAL ── */}
      <section id="why-tridiagonal" data-section="Why Tridiagonal" ref={el => sectionRefs.current['Why Tridiagonal'] = el} style={{ padding: '80px 0', background: '#1c1c1c' }}>
        <div className="content-wrapper-lg">
          <style dangerouslySetInnerHTML={{ __html: `.wg{display:grid;grid-template-columns:repeat(3,1fr)}.wc{padding:40px 30px;border-right:1px solid rgba(255,255,255,0.08);border-bottom:1px solid rgba(255,255,255,0.08);transition:background 0.3s}.wc:hover{background:rgba(255,255,255,0.02)}@media(max-width:900px){.wg{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.wg{grid-template-columns:1fr}}` }} />
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800' }}>{whyChooseUs.title}</h2>
          </div>
          <div className="wg">
            {whyChooseUs.items?.map((item, i) => (
              <div key={i} className="wc">
                <div style={{ color: 'var(--color-teal)', marginBottom: '12px' }}>
                  {item.icon === 'Users' ? (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  ) : item.icon === 'Briefcase' ? (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                  ) : (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                  )}
                </div>
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      {config.industriesSection?.enabled !== false && (
        <section id="industries" data-section="Industries" ref={el => sectionRefs.current['Industries'] = el} style={{ padding: '100px 0', background: '#1c1c1c' }}>
          <div className="content-wrapper-lg">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px,400px) 1fr', gap: '80px' }}>
              <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
                <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '700' }}>{config.industriesSection?.title || 'Industries'}</h2>
                <p style={{ color: '#fff', opacity: 0.9, fontSize: '18px' }}>{config.industriesSection?.subtitle || 'Your Trusted Partner in Modeling & Simulation.'}</p>
                <div style={{ width: '100%', aspectRatio: '1/1.1', borderRadius: '40px', overflow: 'hidden', position: 'relative', marginTop: '40px' }}>
                  <Image
                    src={resolveImageUrl(allIndustries[activeIndustryIdx ?? 0]?.image || '/hubfs/grid-2.png')}
                    alt="industry" fill sizes="(max-width:768px) 100vw, 400px" style={{ objectFit: 'cover' }} unoptimized
                  />
                </div>
              </div>
              <div onMouseLeave={() => setActiveIndustryIdx(null)}>
                {allIndustries.length > 0 ? allIndustries.map((ind, i) => (
                  <div key={ind.name} onMouseEnter={() => setActiveIndustryIdx(i)} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '30px 0', cursor: 'pointer' }}>
                    <h3 style={{ color: activeIndustryIdx === i ? 'var(--color-teal)' : '#fff', transition: 'color 0.3s' }}>{ind.name}</h3>
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

      {/* ── CAPABILITY MODAL ── */}
      {selectedCapability && dynamicModals[selectedCapability] && (() => {
        const modalItem = dynamicModals[selectedCapability];
        return (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(20px)', overflowY: 'auto', padding: '40px 0' }}>
            <div className="content-wrapper-lg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
              <button onClick={() => setSelectedCapability(null)} style={{ background: 'none', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', cursor: 'pointer', opacity: 0.8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                Back to Practices
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ background: 'rgba(71,188,135,0.1)', color: 'var(--color-teal)', padding: '6px 16px', borderRadius: '30px', fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>{parentIndustryName?.toUpperCase()}</span>
                <button onClick={() => setSelectedCapability(null)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <div className="content-wrapper-lg">
              <h1 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '80px', maxWidth: '1000px', lineHeight: 1.1 }}>{modalItem.mainTitle}</h1>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '60px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '32px', padding: '48px' }}>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <div style={{ width: '4px', background: 'var(--color-teal)', borderRadius: '2px' }} />
                      <div>
                        <span style={{ color: 'var(--color-teal)', fontSize: '14px', fontWeight: '800', letterSpacing: '2px', display: 'block', marginBottom: '24px' }}>OVERVIEW</span>
                        <p style={{ color: '#fff', fontSize: '20px', lineHeight: 1.6, opacity: 0.9 }}>{modalItem.overview}</p>
                      </div>
                    </div>
                  </div>
                  {modalItem.image && (
                    <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', aspectRatio: '21/9', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <Image src={resolveImageUrl(modalItem.image)} alt="Technical Feature" fill sizes="100vw" style={{ objectFit: 'cover' }} unoptimized />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 60%,rgba(10,10,10,0.6) 100%)' }} />
                    </div>
                  )}
                  {modalItem.tools?.length > 0 && (
                    <div>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '32px' }}>
                        <div style={{ width: '4px', height: '16px', background: 'var(--color-teal)', borderRadius: '2px' }} />
                        <span style={{ color: 'var(--color-teal)', fontSize: '14px', fontWeight: '800', letterSpacing: '2px' }}>SIEMENS TOOLS APPLIED</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {modalItem.tools.map(tool => (
                          <span key={tool} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '12px 24px', borderRadius: '40px', fontSize: '14px', fontWeight: '600', border: '1px solid rgba(255,255,255,0.1)' }}>{tool}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    {modalItem.technicalSections?.map((sec, idx) => (
                      <div key={idx} style={{ paddingLeft: '24px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                        <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>{sec.title}</span>
                        <h4 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>{sec.subtitle}</h4>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.7 }}>{sec.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', display: 'block', marginBottom: '16px' }}>CAPABILITY</span>
                    <h5 style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>{selectedCapability}</h5>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', display: 'block', marginBottom: '16px' }}>POWERED BY</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-teal)' }} />
                      <span style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>Siemens Simcenter Suite</span>
                    </div>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
                    <h5 style={{ color: '#fff', fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>Interested in this solution?</h5>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.5, marginBottom: '32px' }}>Our experts will design a simulation approach tailored to your engineering goals.</p>
                    <Link href="/contact-us" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'linear-gradient(90deg,#0dd0e1,#8fe03c)', color: '#000', padding: '16px 32px', borderRadius: '40px', fontSize: '15px', fontWeight: '800', textDecoration: 'none' }}>
                      Contact Us <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}
