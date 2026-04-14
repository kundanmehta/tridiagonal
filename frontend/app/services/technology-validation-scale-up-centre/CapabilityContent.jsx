'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TECH_VAL_DATA } from './data';

function ArrowRight({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59l-2.13-2.13a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
    </svg>
  );
}

export default function CapabilityContent({ capabilityId }) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', industry: '', comments: '', privacy: false });
  const [submitted, setSubmitted] = useState(false);

  const activeCap = TECH_VAL_DATA.find(c => c.id === capabilityId);
  if (!activeCap) return <div>Capability not found</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-us');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ paddingTop: '80px', background: '#111', color: '#fff', minHeight: '100vh' }}>
      
      {/* ── HERO ── */}
      <section style={{ position: 'relative', padding: '140px 0 100px', background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-teal) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', border: '1px solid rgba(71,188,135,0.2)', padding: '6px 20px', borderRadius: '30px', marginBottom: '32px' }}>
            <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Technology Validation</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '28px', letterSpacing: '-0.02em' }}>
             {activeCap.title}
          </h1>
          <p style={{ maxWidth: '850px', margin: '0 auto 48px', fontSize: '22px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontWeight: '400' }}>
             {activeCap.subtitle}
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button suppressHydrationWarning onClick={scrollToContact} className="btn-primary" style={{ padding: '16px 40px', borderRadius: '40px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
              Consult an Expert
            </button>
            <Link href="/resources/brochures" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '16px 40px', borderRadius: '40px', textDecoration: 'none', fontWeight: '700', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              Download Brochure
            </Link>
          </div>
        </div>
      </section>

      {/* ── ALTERNATING CONTENT SECTIONS ── */}
      <div style={{ background: '#111', padding: '0px 0px' }}>
        <div className="content-wrapper-lg">
          
          {activeCap.fullContent.map((section, idx) => {
            const isImageLeft = idx % 2 !== 0;
            return (
              <section key={idx} style={{ padding: '60px 0', borderBottom: idx === activeCap.fullContent.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '80px', alignItems: 'center' }}>
                  
                  {/* Content Box */}
                  <div style={{ order: isImageLeft ? 2 : 1 }}>
                     <div style={{ width: '40px', height: '2px', background: 'var(--color-teal)', marginBottom: '24px' }} />
                     <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '28px', lineHeight: 1.2 }}>
                        {section.heading}
                     </h2>
                     <p style={{ fontSize: '19px', lineHeight: 1.9, color: 'rgba(255,255,255,0.75)', marginBottom: '32px' }}>
                        {section.text}
                     </p>
                     {section.bullets && (
                       <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px', marginBottom: '32px' }}>
                         {section.bullets.map((b, k) => (
                           <li key={k} style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.9)' }}>
                             <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-teal)', marginTop: '10px' }} />
                             {b}
                           </li>
                         ))}
                       </ul>
                     )}

                     <Link href="/resources/brochures" style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '10px', 
                        background: 'var(--gradient-brand)', color: '#000', 
                        fontWeight: '700', textDecoration: 'none', 
                        fontSize: '14px', padding: '12px 28px', 
                        borderRadius: '40px', transition: 'all 0.3s',
                        textTransform: 'uppercase', letterSpacing: '0.5px',
                        boxShadow: '0 10px 20px rgba(71,188,135,0.2)'
                     }} onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform='none'}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                        Download Brochure
                     </Link>
                  </div>

                  {/* Image Box */}
                  <div style={{ order: isImageLeft ? 1 : 2 }}>
                    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '480px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                      <Image 
                        src={section.image || activeCap.img} 
                        alt={section.heading} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)' }} />
                    </div>
                  </div>

                </div>
              </section>
            );
          })}

        </div>
      </div>

      {/* ── BACK LINK ── */}
      <div style={{ background: '#111', paddingBottom: '100px', textAlign: 'center' }}>
          <Link href="/services/technology-validation-scale-up-centre" style={{ color: 'var(--color-teal)', textDecoration: 'none', fontWeight: '700', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.7, transition: 'opacity 0.3s' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: 'rotate(180deg)' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Explore Other Tech Val Services
          </Link>
      </div>

      {/* ── CONTACT FORM ── */}
      <section id="contact-us" style={{ padding: '120px 0', background: '#171717', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,460px),1fr))', gap: '80px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '24px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Expert Consultation</span>
              </div>
              <h2 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)', fontWeight: '800', marginBottom: '24px', lineHeight: 1.1 }}>
                Talk to a <span className="gradient-text">Validation Expert!</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.9', fontSize: '18px', maxWidth: '520px' }}>
                 Uncover how our experimental validation capabilities can optimize your equipment performance. Connect with our technical leaders today.
              </p>
            </div>

            <div style={{ background: '#222', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '32px', padding: '48px', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontSize: '72px', marginBottom: '24px' }}>🚀</div>
                  <h3 style={{ color: '#fff', fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>Message Sent!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.7', fontSize: '16px' }}>Our technical team will review your requirements and reach out within 24-48 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>First Name *</label>
                      <input suppressHydrationWarning required placeholder="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Last Name *</label>
                      <input suppressHydrationWarning required placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Email Address *</label>
                      <input suppressHydrationWarning required type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Contact Number</label>
                      <input suppressHydrationWarning placeholder="Contact Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Company Name *</label>
                    <input suppressHydrationWarning required placeholder="Company Name" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
                        style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '14px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Industry</label>
                    <select suppressHydrationWarning value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })}
                      style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: formData.industry ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                      <option value="">Please Select</option>
                      <option>Oil & Gas</option>
                      <option>Chemical / Process</option>
                      <option>Metals & Mining</option>
                      <option>Power & Energy</option>
                      <option>Automotive / Aerospace</option>
                      <option>Others</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Comments / Questions</label>
                    <textarea suppressHydrationWarning rows={3} placeholder="Tell us about your requirements..." value={formData.comments} onChange={e => setFormData({ ...formData, comments: e.target.value })}
                      style={{ width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <input type="checkbox" id="privacy" checked={formData.privacy} onChange={e => setFormData({ ...formData, privacy: e.target.checked })} style={{ marginTop: '4px' }} />
                    <label htmlFor="privacy" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                      I have read and agree to the <Link href="/privacy-policy" style={{ color: 'var(--color-teal)' }}>Privacy Policy</Link>
                    </label>
                  </div>
                  <button suppressHydrationWarning type="submit"
                    style={{ 
                      background: 'var(--gradient-brand)', color: '#202020', border: 'none', 
                      padding: '18px 48px', borderRadius: '40px', fontSize: '16px', 
                      fontWeight: '600', cursor: 'pointer', display: 'inline-flex', 
                      alignItems: 'center', gap: '10px', width: 'fit-content', 
                      marginTop: '10px', boxShadow: '0 20px 40px rgba(71,188,135,0.25)',
                      letterSpacing: '0.5px', textTransform: 'uppercase'
                    }}
                  >
                    SUBMIT REQUEST <ArrowRight size={20} color="#000" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
