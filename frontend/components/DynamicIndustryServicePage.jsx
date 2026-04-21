'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Users, Briefcase, Settings, Handshake, Globe, Home,
    ArrowRight, ChevronRight, X
} from 'lucide-react';

const ICON_MAP = {
    Users, Briefcase, Settings, Handshake, Globe, Home
};

export default function DynamicIndustryServicePage({ data, parentIndustryName }) {
    const [selectedCapability, setSelectedCapability] = useState(null);
    const [activeIndustryIdx, setActiveIndustryIdx] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!data || !data.enabled) return null;

    const { hero, intro, mainBody, showcase, whyChooseUs, modals } = data;

    return (
        <div style={{ background: '#1a1a1a', color: '#fff' }}>
            {/* ── HERO ── */}
            <section
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: `url('${hero.bgImage}') center center / cover no-repeat`,
                    padding: '80px 0 60px',
                }}
            >
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(26, 26, 26, 0.88)' }} />
                <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.12)', border: '1px solid rgba(71,188,135,0.3)', borderRadius: '30px', padding: '6px 20px', marginBottom: '16px' }}>
                        <span style={{ color: '#47BC87', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Industry</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <span style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: '800', display: 'block' }}>{parentIndustryName}</span>
                    </div>
                    <h1 style={{ color: '#fff', fontWeight: '700', fontSize: '50px', marginBottom: '20px', lineHeight: 1.1 }}>
                        {hero.title}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '22px', maxWidth: '800px', margin: '0 auto', fontWeight: '500' }}>
                        {hero.desc}
                    </p>
                </div>
            </section>

            {/* ── INTRO ── */}
            <section style={{ padding: '100px 0', background: '#1a1a1a' }}>
                <div className="content-wrapper-lg">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,480px),1fr))', gap: '80px', alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '6px 18px', borderRadius: '30px', marginBottom: '24px' }}>
                                <span style={{ color: '#47BC87', fontSize: '13px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>{intro.badge}</span>
                            </div>
                            <h2 style={{ color: '#47BC87', fontSize: '50px', fontWeight: '800', marginBottom: '32px', lineHeight: 1.2 }}>
                                {intro.heading}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {intro.paragraphs.map((p, i) => (
                                    <p key={i} style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.9', fontSize: '18px' }}>{p}</p>
                                ))}
                            </div>
                        </div>
                        <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', aspectRatio: '16/10', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <Image src={intro.image} alt="Intro Image" fill style={{ objectFit: 'cover' }} unoptimized />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CAPABILITIES ── */}
            <section style={{ padding: '80px 0', background: '#111' }}>
                <div className="content-wrapper-lg">
                    <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
                            <span style={{ color: '#47BC87', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{mainBody.badge}</span>
                        </div>
                        <h2 style={{ color: '#47BC87', fontSize: '50px', fontWeight: '800', marginBottom: '20px' }}>{mainBody.title}</h2>
                        <p style={{ color: '#fff', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8', fontSize: '16px', opacity: 0.8 }}>{mainBody.desc}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                        {mainBody.cards.map((card, i) => (
                            <div key={i} style={{ position: 'relative', background: '#141414', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${card.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,20,20,0.6) 0%, rgba(20,20,20,0.98) 100%)' }} />
                                <div style={{ position: 'relative', zIndex: 1, padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>{card.title}</h3>
                                    <div style={{ flex: 1, marginBottom: '32px' }}>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                            {(card.desc || '').split('\n').map((line, idx) => {
                                                const isSub = line.trim().startsWith('-') || line.trim().startsWith('○');
                                                const cleanLine = line.replace(/^[•○\s-]*/, '').trim();
                                                if (!cleanLine) return null;
                                                return (
                                                    <li key={idx} style={{ position: 'relative', paddingLeft: isSub ? '42px' : '22px', fontSize: '16px', color: '#fff', lineHeight: '1.6', marginBottom: '10px', display: 'flex', alignItems: 'flex-start', fontWeight: isSub ? '400' : '500' }}>
                                                        <span style={{ position: 'absolute', left: isSub ? '22px' : '0px', top: '8px', width: isSub ? '7px' : '8px', height: isSub ? '7px' : '8px', borderRadius: '50%', border: isSub ? '1.5px solid #fff' : 'none', background: isSub ? 'transparent' : '#fff', flexShrink: 0 }} />
                                                        {cleanLine}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    <button
                                        onClick={() => setSelectedCapability(card.title)}
                                        style={{ marginTop: 'auto', background: 'linear-gradient(90deg, #0dd0e1, #8fe03c)', color: '#000', padding: '12px 24px', borderRadius: '30px', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer', width: 'fit-content' }}
                                    >
                                        {card.ctaText} →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SHOWCASE ── */}
            {showcase && showcase.enabled && (
                <section style={{ background: '#242424', padding: '80px 0' }}>
                    <div className="content-wrapper-lg">
                        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '60px' }}>
                            <div>
                                <h2 style={{ color: '#47BC87', fontSize: '40px', fontWeight: '700', marginBottom: '20px' }}>{showcase.title}</h2>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: 1.6 }}>{showcase.desc}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
                                {showcase.cards.map((card, i) => (
                                    <div key={i} style={{ flex: '0 0 300px' }}>
                                        <div style={{ borderRadius: '24px', background: card.gradient || '#333', padding: '3px', height: '200px', marginBottom: '16px' }}>
                                            <div style={{ background: '#1c1c1c', borderRadius: '21px', height: '100%', position: 'relative', overflow: 'hidden' }}>
                                                <Image src={card.image} alt={card.title} fill style={{ objectFit: 'cover' }} unoptimized />
                                            </div>
                                        </div>
                                        <h4 style={{ fontSize: '18px', fontWeight: '600' }}>{card.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── WHY CHOOSE US ── */}
            <section style={{ padding: '80px 0', background: '#1c1c1c' }}>
                <div className="content-wrapper-lg">
                    <h2 style={{ color: '#47BC87', fontSize: '50px', fontWeight: '800', textAlign: 'center', marginBottom: '60px' }}>{whyChooseUs.title}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.08)' }}>
                        {whyChooseUs.items.map((item, i) => {
                            const Icon = ICON_MAP[item.icon] || Globe;
                            return (
                                <div key={i} style={{ padding: '40px 30px', background: '#1c1c1c' }}>
                                    <Icon color="#47BC87" size={32} style={{ marginBottom: '16px' }} />
                                    <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>{item.title}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── MODAL ── */}
            {selectedCapability && modals && modals.find(m => m.capabilityName === selectedCapability) && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(10px)', overflowY: 'auto', padding: '40px 0' }}>
                    <div className="content-wrapper-lg">
                        <button onClick={() => setSelectedCapability(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '16px', cursor: 'pointer', marginBottom: '40px' }}>← Back</button>
                        {(() => {
                            const m = modals.find(m => m.capabilityName === selectedCapability);
                            return (
                                <div>
                                    <h2 style={{ color: '#47BC87', fontSize: '48px', fontWeight: '800', marginBottom: '40px' }}>{m.mainTitle}</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '60px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                                            <p style={{ fontSize: '20px', lineHeight: 1.6 }}>{m.overview}</p>
                                            <Image src={m.mainImage} alt="Main" width={1200} height={600} style={{ borderRadius: '24px', objectFit: 'cover' }} unoptimized />
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                                {m.tools && m.tools.map(t => <span key={t} style={{ background: 'rgba(255,255,255,0.05)', padding: '8px 20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>{t}</span>)}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                                {m.sections.map((s, i) => (
                                                    <div key={i} style={{ paddingLeft: '20px', borderLeft: '2px solid #47BC87' }}>
                                                        <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>{s.subtitle}</h4>
                                                        <p style={{ color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-line' }}>{s.content}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
}
