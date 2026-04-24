'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users, Briefcase, Settings, Handshake, Globe, Home,
  ArrowRight, ChevronRight, X, Monitor, Clock, TrendingUp, DollarSign
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com';

const ICON_MAP = {
  'Users': <Users size={40} />,
  'Briefcase': <Briefcase size={40} />,
  'Settings': <Settings size={40} />,
  'Handshake': <Handshake size={40} />,
  'Globe': <Globe size={40} />,
  'Home': <Home size={40} />,
  'Monitor': <Monitor size={40} />,
  'Clock': <Clock size={40} />,
  'TrendingUp': <TrendingUp size={40} />,
  'DollarSign': <DollarSign size={40} />
};

const getFullImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  if (path.startsWith('/hubfs') || path.startsWith('/images')) return path; // Hubspot or local public images
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

export default function DynamicIndustryServicePage({ data, parentIndustryName, serviceType }) {
  const [selectedCapability, setSelectedCapability] = useState(null);
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(null);
  const [relatedIndustries, setRelatedIndustries] = useState([]);
  const [useCasesSlide, setUseCasesSlide] = useState(0);
  const [useCasesInTransition, setUseCasesInTransition] = useState(true);
  const sectionRefs = useRef({});

  // Detect if this is Tech Validation vs Modeling & Simulation
  const isTechValidation = serviceType === 'techValidation' || serviceType === 'technology-validation-scale-up-centre';

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com'}/api/industries`);
        const json = await res.json();
        if (json.data) {
          // Filter out current industry and map to correct service path
          const filtered = json.data
            .filter(ind => ind.title !== parentIndustryName && ind[isTechValidation ? 'techValidation' : 'modelingSimulation']?.enabled)
            .map(ind => ({
              name: ind.title,
              desc: ind.overview,
              image: ind.heroImage || "/hubfs/grid-1.png",
              href: `/industries/${ind.slug}/${isTechValidation ? 'technology-validation-scale-up-centre' : 'advance-modeling-and-simulation'}`
            }));
          setRelatedIndustries(filtered);
        }
      } catch (err) {
        console.error('Error fetching industries:', err);
      }
    };
    fetchRelated();
  }, [parentIndustryName, isTechValidation]);

  if (!data) return null;

  const {
    hero = {},
    intro = {},
    mainBody = {},
    showcase = {},
    whyChooseUs = {},
    industriesSection = { title: 'Industries', subtitle: 'Your Trusted Partner in Modeling & Simulation.' },
    modals = []
  } = data;

  // Auto-scroll Use Cases slider
  const useCasesCardsCount = showcase.cards?.length || 0;
  useEffect(() => {
    if (!showcase.enabled || useCasesCardsCount === 0) return;
    const timer = setInterval(() => {
      setUseCasesInTransition(true);
      setUseCasesSlide(prev => prev + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, [showcase.enabled, useCasesCardsCount]);

  // Seamless infinite loop snap-back
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
    <div style={{ background: '#1a1a1a', color: '#fff' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --color-teal: #47BC87;
          --gradient-brand: linear-gradient(90deg, #0dd0e1, #8fe03c);
        }
        .content-wrapper-lg {
          max-width: 100%;
          width: 100%;
          margin: 0 auto;
          padding: 0 40px;
        }
        @media (max-width: 768px) {
          .content-wrapper-lg { padding: 0 20px; }
        }
        .gradient-text {
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-section {
          position: relative;
          padding: 180px 0 120px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(26, 26, 26, 0.4);
        }
        .section-title {
          font-size: 50px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .section-title { font-size: 36px; }
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }
        @media (max-width: 480px) {
          .card-grid { grid-template-columns: 1fr; }
        }
        .premium-card {
          position: relative;
          background: #141414;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          min-height: 420px;
          padding: 40px;
          justify-content: flex-end;
        }
        .premium-card:hover {
          transform: translateY(-10px);
          border-color: var(--color-teal);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .card-bg {
          position: absolute;
          inset: 0;
          opacity: 0.5;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s ease;
        }
        .premium-card:hover .card-bg { transform: scale(1.1); opacity: 0.3; }
        .card-content { position: relative; z-index: 1; }
        
        .why-tridiagonal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(255,255,255,0.08);
          border-left: 1px solid rgba(255,255,255,0.08);
        }
        @media (max-width: 1024px) {
          .why-tridiagonal-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .why-tridiagonal-grid { grid-template-columns: 1fr; }
        }
        .why-item {
          padding: 80px 50px;
          border-right: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .why-item:hover { background: rgba(71, 188, 135, 0.03); }
        .industry-grid { 
          display: grid; 
          grid-template-columns: minmax(350px, 450px) 1fr; 
          gap: 100px; 
        }
        @media (max-width: 1024px) {
          .industry-grid { 
            grid-template-columns: 1fr; 
            gap: 60px; 
          }
          .industry-grid > div:first-child {
            position: relative !important;
            top: 0 !important;
          }
        }
        .modal-content-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 60px;
          align-items: start;
        }
        @media (max-width: 1200px) {
          .modal-content-grid {
            grid-template-columns: 1fr 300px;
            gap: 40px;
          }
        }
        @media (max-width: 900px) {
          .modal-content-grid {
            grid-template-columns: 1fr;
          }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .modal-overlay {
          animation: modalSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal-tech-section {
          padding-left: 28px;
          border-left: 3px solid rgba(71,188,135,0.25);
          transition: border-color 0.3s ease;
        }
        .modal-tech-section:hover {
          border-left-color: var(--color-teal);
        }
        .modal-tool-pill {
          background: rgba(255,255,255,0.04);
          color: #fff;
          padding: 12px 24px;
          border-radius: 40px;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.25s ease;
        }
        .modal-tool-pill:hover {
          background: rgba(71,188,135,0.1);
          border-color: rgba(71,188,135,0.3);
          color: var(--color-teal);
        }
        .modal-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(90deg, #0dd0e1, #8fe03c);
          color: #000;
          padding: 16px 32px;
          border-radius: 40px;
          font-size: 15px;
          font-weight: 800;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(13,208,225,0.15);
        }
        .modal-cta-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 30px rgba(13,208,225,0.3);
        }
      `}} />

      {/* ── HERO ── */}
      <section className="hero-section" style={{ backgroundImage: `url('${getFullImageUrl(hero.bgImage) || '/hubfs/Advanced%20Modeling%20Service%20Page%20Banner.png'}')` }}>
        <div className="hero-overlay" />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', border: '1px solid rgba(71,188,135,0.2)', borderRadius: '30px', padding: '6px 20px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Industry</span>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem', fontWeight: '700', letterSpacing: '1px' }}>{parentIndustryName}</span>
          </div>
          <h1 className="section-title">
            {hero.title?.includes('Simulation') ? (
              <>Advanced Modeling <span className="gradient-text">& Simulation</span></>
            ) : hero.title?.includes('Validation') ? (
              <>Technology Validation <span className="gradient-text">& Scale-up</span></>
            ) : (
              hero.title
            )}
          </h1>
          <p style={{ color: 'rgb(255 255 255 / 86%)', fontSize: '22px', maxWidth: '800px', margin: '0 auto', fontWeight: '500' }}>
            {hero.desc}
          </p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ padding: '100px 0' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '6px 18px', borderRadius: '30px', marginBottom: '24px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>{intro.badge || 'Overview'}</span>
              </div>
              <h2 style={{ color: 'var(--color-teal)', fontSize: '50px', fontWeight: '800', marginBottom: '32px', lineHeight: 1.2 }}>
                {intro.heading}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {intro.paragraphs?.map((p, i) => (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.9', fontSize: '18px' }}>{p}</p>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', aspectRatio: '16/10', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <Image src={getFullImageUrl(intro.image) || "/hubfs/grid-2.png"} alt="Intro" fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section style={{ padding: '100px 0', background: '#111' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{mainBody.badge || 'Capabilities'}</span>
            </div>
            <h2 className="section-title" style={{ color: 'var(--color-teal)' }}>{mainBody.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '800px', margin: '0 auto', fontSize: '18px' }}>{mainBody.desc}</p>
          </div>

          <div className="card-grid">
            {mainBody.cards?.map((card, i) => (
              <div key={i} className="premium-card">
                <div className="card-bg" style={{ backgroundImage: `url('${getFullImageUrl(card.image)}')` }} />
                <div className="card-content">
                  <h3 style={{ color: '#fff', fontSize: '26px', fontWeight: '700', marginBottom: '20px' }}>{card.title}</h3>
                  <div style={{ marginBottom: '32px' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {card.desc?.split('\n').map((line, idx) => {
                        const isSub = line.trim().startsWith('-') || line.trim().startsWith('○');
                        const cleanLine = line.replace(/^[•○\s-]*/, '').trim();
                        if (!cleanLine) return null;
                        return (
                          <li key={idx} style={{
                            position: 'relative', paddingLeft: isSub ? '42px' : '22px', fontSize: '16px', color: '#fff',
                            lineHeight: '1.6', marginBottom: '12px', display: 'flex', alignItems: 'flex-start',
                            opacity: 0.8
                          }}>
                            <span style={{
                              position: 'absolute', left: isSub ? '22px' : '0px', top: '10px',
                              width: '6px', height: '6px', borderRadius: '50%', background: isSub ? 'none' : '#fff',
                              border: isSub ? '1px solid #fff' : 'none'
                            }} />
                            {cleanLine}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {isTechValidation ? (
                    <Link href={card.link || '/contact-us'} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'var(--gradient-brand)', color: '#000', padding: '14px 32px',
                      borderRadius: '32px', fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px'
                    }}>
                      {card.buttonText || card.ctaText || 'VIEW MORE'} <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setSelectedCapability(card.title)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        background: 'var(--gradient-brand)', color: '#000', padding: '14px 32px',
                        borderRadius: '32px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px',
                        border: 'none', cursor: 'pointer'
                      }}
                    >
                      {card.buttonText || card.ctaText || 'TECHNICAL DETAILS'} <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES / SHOWCASE ── */}
      {showcase.enabled && (
        <section style={{ background: '#242424', padding: '100px 0', overflow: 'hidden' }}>
          <div className="content-wrapper-lg">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px' }}>
              {/* Left info column */}
              <div style={{ flex: useCasesCardsCount > 0 ? '0 0 350px' : '1', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '60px', height: '4px', background: 'var(--gradient-brand)', borderRadius: '2px', marginBottom: '24px' }} />
                <h2 className="section-title" style={{ color: 'var(--color-teal)', marginBottom: '20px' }}>
                  {showcase.title || 'Use Cases'}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', lineHeight: 1.7, marginBottom: '40px', maxWidth: useCasesCardsCount > 0 ? 'none' : '800px' }}>
                  {showcase.desc}
                </p>
                <Link href="/resources/case-studies" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'var(--gradient-brand)', color: '#000',
                  fontWeight: '700', textTransform: 'uppercase',
                  padding: '14px 28px', borderRadius: '40px',
                  fontSize: '13px', letterSpacing: '0.04em', textDecoration: 'none', width: 'fit-content',
                  boxShadow: '0 4px 15px rgba(13,208,225,0.15)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}>
                  VIEW MORE <ArrowRight size={14} />
                </Link>
              </div>

              {/* Slider — only when cards exist */}
              {useCasesCardsCount > 0 && (
              <div style={{ flex: '1', minWidth: '0', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  display: 'flex',
                  transition: useCasesInTransition ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                  transform: `translateX(-${useCasesSlide * (100 / (useCasesCardsCount + 3 || 3))}%)`,
                  width: `calc(${(useCasesCardsCount + 3 || 3)} * 33.3333%)`
                }}>
                  {[...(showcase.cards || []), ...(showcase.cards?.slice(0, 3) || [])].map((card, idx) => (
                    <div key={idx} style={{ flex: `0 0 ${100 / (useCasesCardsCount + 3 || 3)}%`, minWidth: 0, padding: '0 10px' }}>
                      <div style={{
                        borderRadius: '24px',
                        background: card.gradient || 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
                        padding: card.isCaseStudy ? '4px' : '3px',
                        marginBottom: '20px',
                        minHeight: '300px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          background: card.isCaseStudy ? '#fff' : '#1c1c1c',
                          borderRadius: '20px', width: '100%', height: '100%',
                          position: 'relative', minHeight: '300px'
                        }}>
                          <Image
                            src={getFullImageUrl(card.image) || '/hubfs/grid-1.png'}
                            alt={card.title || 'Use Case'}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                            style={{ objectFit: card.isCaseStudy ? 'contain' : 'cover' }}
                            unoptimized
                          />
                        </div>
                      </div>
                      <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>{card.title}</h3>
                    </div>
                  ))}
                </div>
                {/* Dots */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
                  {showcase.cards?.map((_, idx) => (
                    <button
                      key={idx}
                      suppressHydrationWarning
                      onClick={() => setUseCasesSlide(idx)}
                      style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: (useCasesSlide % (useCasesCardsCount || 1)) === idx ? 'var(--color-teal)' : 'rgba(255,255,255,0.3)',
                        border: 'none', cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    />
                  ))}
                </div>
              </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── WHY TRIDIAGONAL ── */}
      <section style={{ padding: '100px 0', background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="section-title" style={{ color: 'var(--color-teal)' }}>{whyChooseUs.title || 'Why Tridiagonal?'}</h2>
          </div>
          <div className="why-tridiagonal-grid">
            {whyChooseUs.items?.map((item, i) => (
              <div key={i} className="why-item">
                <div style={{ color: 'var(--color-teal)' }}>
                  {ICON_MAP[item.icon] || <Globe size={40} />}
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>{item.title}</h3>
                  <p style={{ color: 'rgb(255 255 255 / 86%)', fontSize: '16px', lineHeight: '1.7', fontWeight: '400' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED INDUSTRIES ── */}
      <section style={{ padding: '120px 0', background: '#1c1c1c' }}>
        <div className="content-wrapper-lg">
          <div className="industry-grid">
            <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
              <h2 className="section-title" style={{ color: 'var(--color-teal)', marginBottom: '20px' }}>{industriesSection.title || 'Industries'}</h2>
              <p style={{ color: 'rgb(255 255 255 / 86%)', fontSize: '18px', maxWidth: '380px', lineHeight: '1.6', marginBottom: '40px' }}>
                {industriesSection.subtitle || 'Your Trusted Partner in Modeling & Simulation.'}
              </p>
              <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: '40px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
                <Image src={getFullImageUrl(relatedIndustries[activeIndustryIdx || 0]?.image) || "/hubfs/grid-1.png"} alt="Industry" fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
            </div>

            <div onMouseLeave={() => setActiveIndustryIdx(null)} style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {relatedIndustries.map((ind, i) => (
                <Link
                  key={i}
                  href={ind.href}
                  onMouseEnter={() => setActiveIndustryIdx(i)}
                  style={{
                    display: 'block',
                    padding: '28px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{
                      fontSize: '22px',
                      color: activeIndustryIdx === i ? 'var(--color-teal)' : '#fff',
                      fontWeight: '700',
                      letterSpacing: '0.5px',
                      transition: 'all 0.3s ease'
                    }}>
                      {ind.name}
                    </h3>
                    <ArrowRight
                      size={20}
                      style={{
                        color: 'var(--color-teal)',
                        opacity: activeIndustryIdx === i ? 1 : 0.2,
                        transform: activeIndustryIdx === i ? 'translateX(0)' : 'translateX(-10px)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITY MODAL OVERLAY ── */}
      {selectedCapability && modals.find(m => m.capabilityName === selectedCapability) && (() => {
        const modalData = modals.find(m => m.capabilityName === selectedCapability);
        return (
          <div className="modal-overlay" style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            overflowY: 'auto',
            padding: '40px 0'
          }}>
            {/* ─ Top Navigation Bar ─ */}
            <div className="content-wrapper-lg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
              <button
                onClick={() => setSelectedCapability(null)}
                style={{
                  background: 'none', border: 'none', color: '#fff',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  fontSize: '16px', cursor: 'pointer', opacity: 0.7,
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                Back to Practices
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  background: 'rgba(71,188,135,0.1)',
                  color: 'var(--color-teal)',
                  padding: '6px 18px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontWeight: '800',
                  letterSpacing: '1.5px',
                  border: '1px solid rgba(71,188,135,0.2)'
                }}>
                  {parentIndustryName?.toUpperCase()}
                </span>
                <button
                  onClick={() => setSelectedCapability(null)}
                  style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer',
                    transition: 'all 0.25s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="content-wrapper-lg">
              {/* ─ Modal Title ─ */}
              <h1 style={{
                color: 'var(--color-teal)',
                fontSize: 'clamp(36px, 4vw, 56px)',
                fontWeight: '800',
                marginBottom: '80px',
                maxWidth: '900px',
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}>
                {modalData.mainTitle}
              </h1>

              <div className="modal-content-grid">
                {/* ─── Left Content Column ─── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>

                  {/* Overview Card */}
                  <div style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '28px',
                    padding: '44px',
                    backdropFilter: 'blur(8px)'
                  }}>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <div style={{
                        width: '4px',
                        flexShrink: 0,
                        background: 'linear-gradient(180deg, var(--color-teal), rgba(71,188,135,0.2))',
                        borderRadius: '2px'
                      }} />
                      <div>
                        <span style={{
                          color: 'var(--color-teal)', fontSize: '13px', fontWeight: '800',
                          letterSpacing: '2.5px', display: 'block', marginBottom: '20px'
                        }}>OVERVIEW</span>
                        <p style={{
                          color: 'rgba(255,255,255,0.88)', fontSize: '18px',
                          lineHeight: 1.75, fontWeight: '400'
                        }}>
                          {modalData.overview}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feature Image */}
                  {(modalData.image || modalData.mainImage) && (
                    <div style={{
                      position: 'relative',
                      borderRadius: '28px',
                      overflow: 'hidden',
                      aspectRatio: '21/9',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
                    }}>
                      <Image
                        src={getFullImageUrl(modalData.image || modalData.mainImage) || "/hubfs/grid-1.png"}
                        alt={modalData.mainTitle || 'Technical Feature'}
                        fill
                        sizes="(max-width: 1200px) 100vw, 900px"
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.7) 100%)'
                      }} />
                    </div>
                  )}

                  {/* Siemens Tools */}
                  {modalData.tools?.length > 0 && (
                    <div>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '28px' }}>
                        <div style={{
                          width: '4px', height: '18px',
                          background: 'var(--color-teal)', borderRadius: '2px'
                        }} />
                        <span style={{
                          color: 'var(--color-teal)', fontSize: '13px', fontWeight: '800', letterSpacing: '2.5px'
                        }}>SIEMENS TOOLS APPLIED</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {modalData.tools.map(tool => (
                          <span key={tool} className="modal-tool-pill">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technical Sections */}
                  {modalData.technicalSections?.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
                      {modalData.technicalSections.map((sec, idx) => (
                        <div key={idx} className="modal-tech-section">
                          <span style={{
                            color: 'var(--color-teal)', fontSize: '12px', fontWeight: '800',
                            letterSpacing: '2px', textTransform: 'uppercase',
                            display: 'block', marginBottom: '10px'
                          }}>{sec.title}</span>
                          <h4 style={{
                            color: '#fff', fontSize: '22px', fontWeight: '700',
                            marginBottom: '14px', lineHeight: 1.3
                          }}>{sec.subtitle}</h4>
                          <p style={{
                            color: 'rgba(255,255,255,0.65)', fontSize: '16px',
                            lineHeight: 1.75, whiteSpace: 'pre-line'
                          }}>{sec.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ─── Right Sidebar ─── */}
                <div style={{ position: 'sticky', top: '100px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Capability Card */}
                  <div style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '22px',
                    padding: '28px 32px'
                  }}>
                    <span style={{
                      color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '700',
                      letterSpacing: '1.5px', display: 'block', marginBottom: '14px'
                    }}>CAPABILITY</span>
                    <h5 style={{ color: '#fff', fontSize: '17px', fontWeight: '700', margin: 0, lineHeight: 1.4 }}>
                      {selectedCapability}
                    </h5>
                  </div>

                  {/* Powered By Card */}
                  <div style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '22px',
                    padding: '28px 32px'
                  }}>
                    <span style={{
                      color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '700',
                      letterSpacing: '1.5px', display: 'block', marginBottom: '14px'
                    }}>POWERED BY</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: 'var(--color-teal)',
                          boxShadow: '0 0 8px rgba(71,188,135,0.4)'
                        }} />
                        <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>Siemens Simcenter Suite</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Card */}
                  <div style={{
                    background: 'linear-gradient(145deg, rgba(71,188,135,0.06), rgba(13,208,225,0.04))',
                    border: '1px solid rgba(71,188,135,0.12)',
                    borderRadius: '22px',
                    padding: '36px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '14px',
                      background: 'rgba(71,188,135,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 20px',
                      border: '1px solid rgba(71,188,135,0.15)'
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <h5 style={{
                      color: '#fff', fontSize: '18px', fontWeight: '800', marginBottom: '12px'
                    }}>Interested in this solution?</h5>
                    <p style={{
                      color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6, marginBottom: '28px'
                    }}>Our experts will design a simulation approach tailored to your engineering goals.</p>
                    <Link href="/contact-us" className="modal-cta-btn">
                      Contact Us <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
