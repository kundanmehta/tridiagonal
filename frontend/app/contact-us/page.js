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

// ── HARDCODED FALLBACK DATA (mirror of original) ──
const FALLBACK = {
  heroSection: { title: 'Here To Help', description: 'Reach out to our experts today.' },
  infoCards: [
    { iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>', title: 'Sales', description: 'Interested in learning more about Tridiagonal? Request a consultation', link: '' },
    { iconSvg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>', title: 'Careers', description: 'Looking to help others thrive in their personal and professional lives? Check out our open positions', link: '/careers' },
  ],
  officesSection: {
    heading: 'Our Global Offices',
    description: 'Tridiagonal Solutions scales with you across the globe.',
    offices: [
      { region: 'North America', flagImage: '/images/download642b.png', companyName: 'Tridiagonal Solutions Inc.', addresses: [{ label: '', text: '8632 Fredericksburg Road, Suite 101, San Antonio, Texas 78240, USA' }], contacts: [{ type: 'phone', label: '+1 (210) 487-8343', value: 'tel:+12104878343' }, { type: 'fax', label: '+1 (210) 468-0699', value: 'tel:+12104680699' }, { type: 'email', label: 'info@tridiagonal.com', value: 'mailto:info@tridiagonal.com' }] },
      { region: 'India', flagImage: '/images/Flag_of_India.svg769c.jpg', companyName: 'Tridiagonal Solutions Pvt. Ltd.', addresses: [{ label: '', text: 'Unit 401, 4th Floor, Amar Madhuban Tech Park, Survey No. 43/1 and 44/1/1, Opposite Audi Showroom, Baner, Pune, Maharashtra - 411045' }, { label: 'Scale-Up & Experimental Lab Facility', text: 'Gate No.1074 1075 1076, Opp. Utkash Constrowell RMC Plant, Shirwal, Tal Khandala, Shirwal, Satara, Maharashtra, 412801' }], contacts: [{ type: 'phone', label: '+91 20 69002000', value: 'tel:+912069002000' }, { type: 'sales', label: '+91 7020993061', value: 'tel:+917020993061' }, { type: 'admin', label: '+91 8087590308', value: 'tel:+918087590308' }, { type: 'email', label: 'info@tridiagonal.com', value: 'mailto:info@tridiagonal.com' }] },
      { region: 'UAE', flagImage: '/images/640px-Flag_of_the_United_Arab_Emirates.svgd69a.png', companyName: 'Tridiagonal Solutions – FZCO', addresses: [{ label: '', text: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates' }], contacts: [{ type: 'email', label: 'info@tridiagonal.com', value: 'mailto:info@tridiagonal.com' }] },
    ]
  },
  ctaSection: { heading: 'Seeking to thrive in your professional life?', buttonText: 'CHECK OUT OUR OPEN POSITIONS', buttonLink: '/careers', backgroundImage: '/hubfs/topography-bg.webp' },
};

// ── HARDCODED FALLBACK FORM FIELDS (current contact form) ──
const FALLBACK_FORM = {
  fields: [
    { label: 'First Name', name: 'firstName', type: 'text', required: true, width: 'half' },
    { label: 'Last Name', name: 'lastName', type: 'text', required: true, width: 'half' },
    { label: 'Email', name: 'email', type: 'email', required: true, width: 'half' },
    { label: 'Contact Number', name: 'contactNumber', type: 'tel', required: true, width: 'half' },
    { label: 'Job title', name: 'jobTitle', type: 'text', required: false, width: 'half' },
    { label: 'Company Name', name: 'companyName', type: 'text', required: true, width: 'half' },
    { label: 'Industry', name: 'industry', type: 'select', required: false, width: 'full', options: ['Oil & Gas', 'Pharma & Medical Devices', 'Metals, Mining & Cement', 'Food, Beverages & CPG', 'Chemicals & Petrochemicals', 'Power & Renewables', 'Others'] },
    { label: 'Country', name: 'country', type: 'select', required: false, width: 'full', options: ['India', 'United States', 'United Arab Emirates', 'United Kingdom', 'Germany', 'Other'] },
    { label: 'Services/Technologies', name: 'servicesTechnologies', type: 'select', required: false, width: 'full', options: ['CFD', 'FEA', 'DEM', 'FSI', 'Digital Twin', 'Flow Assurance Testing', 'Erosion & Corrosion Testing', 'Tridiagonal.ai', 'Partner Solutions'] },
    { label: 'Message Box', name: 'message', type: 'textarea', required: false, width: 'full' },
  ],
  submitButtonText: 'Submit',
  consentText: "I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <a href='/privacy-policy' style='color: var(--color-teal); text-decoration: underline'>privacy policy</a>"
};

export default function ContactUs() {
  const [formRef, formInView] = useInView(0.1);
  const [officesRef, officesInView] = useInView(0.1);
  const [pageData, setPageData] = useState(null);
  const [formConfig, setFormConfig] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/contactpage`)
      .then(r => r.json())
      .then(json => {
        const d = json.data;
        if (d && Object.keys(d).length > 0) {
          setPageData({
            heroSection: { ...FALLBACK.heroSection, ...d.heroSection },
            infoCards: d.infoCards?.length > 0 ? d.infoCards : FALLBACK.infoCards,
            officesSection: {
              heading: d.officesSection?.heading || FALLBACK.officesSection.heading,
              description: d.officesSection?.description || FALLBACK.officesSection.description,
              offices: d.officesSection?.offices?.length > 0 ? d.officesSection.offices : FALLBACK.officesSection.offices,
            },
            ctaSection: { ...FALLBACK.ctaSection, ...d.ctaSection },
          });
          if (d.selectedFormId && typeof d.selectedFormId === 'object') {
            setFormConfig(d.selectedFormId);
          } else if (d.selectedFormId) {
            fetch(`${API_URL}/api/forms/${d.selectedFormId}`).then(r => r.json()).then(j => setFormConfig(j.data));
          }
        } else {
          setPageData(FALLBACK);
        }
      })
      .catch(() => setPageData(FALLBACK));
  }, []);

  const d = pageData || FALLBACK;

  // Contact icon helper for offices
  const contactIcon = (type) => {
    if (type === 'email' || type === 'fax') return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
    return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  };

  const contactLabel = (c) => {
    const prefixes = { sales: 'Sales Enquiry: ', admin: 'Admin Enquiry: ', fax: 'Fax: ' };
    return (prefixes[c.type] || '') + c.label;
  };



  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>

      {/* ═══════════════ MAIN 2-COLUMN SECTION ═══════════════ */}
      <section className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(71, 188, 135, 0.15) 0%, transparent 50%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: '40px' }}>
          
          <div className="contact-grid-wrapper" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '60px', alignItems: 'start' }}>
            
            {/* Left Column */}
            <div style={{ paddingTop: '20px' }}>
              <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: '3.5rem', marginBottom: '15px' }}>
                <span className="gradient-text">{d.heroSection.title}</span>
              </h1>
              <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', marginBottom: '40px' }}>
                {d.heroSection.description}
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

            {/* Right Column: Dynamic Form */}
            <div className="form-container" ref={formRef} style={{ background: '#242424', padding: '40px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', opacity: formInView ? 1 : 0, transform: formInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
              {!formConfig ? (
                <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '40px 20px' }}>
                  <p style={{ fontSize: '15px' }}>No form configured yet.</p>
                  <p style={{ fontSize: '13px', marginTop: '8px' }}>Please select a form in the Admin → Contact Us Settings.</p>
                </div>
              ) : (
                <DynamicFormRenderer formConfig={formConfig} theme="dark" />
              )}
            </div>
            
          </div>
        </div>
      </section>

      {/* ═══════════════ GLOBAL OFFICES SECTION ═══════════════ */}
      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: '#fff', fontSize: '36px', fontWeight: '700' }}>{d.officesSection.heading}</h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', margin: '0 auto' }}>{d.officesSection.description}</p>
          </div>

          <div ref={officesRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px', opacity: officesInView ? 1 : 0, transform: officesInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
            {(d.officesSection.offices || []).map((office, idx) => (
              <div key={idx} style={{ background: '#242424', borderRadius: '20px', padding: '40px 30px', border: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.3s, box-shadow 0.3s' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  {office.flagImage && <img src={office.flagImage} alt={`${office.region} Flag`} style={{ height: '24px', width: 'auto', borderRadius: '2px', objectFit: 'contain' }} />}
                  <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700' }}>{office.region}</h3>
                </div>
                <h4 style={{ color: 'var(--color-teal)', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>{office.companyName}</h4>

                {/* Addresses */}
                {(office.addresses || []).map((addr, aIdx) => (
                  <div key={aIdx}>
                    {addr.label && <h4 style={{ color: 'var(--color-teal)', fontSize: '15px', fontWeight: '600', marginBottom: '10px', marginTop: '16px' }}>{addr.label}</h4>}
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: aIdx === 0 ? '15px' : '14px', lineHeight: 1.7, marginBottom: aIdx < (office.addresses?.length - 1) ? '14px' : '20px' }}>{addr.text}</p>
                  </div>
                ))}

                {/* Contacts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(office.contacts || []).map((c, cIdx) => (
                    <div key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {contactIcon(c.type)}
                      {c.type === 'sales' || c.type === 'admin' || c.type === 'fax' ? (
                        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>{c.type === 'sales' ? 'Sales Enquiry: ' : c.type === 'admin' ? 'Admin Enquiry: ' : 'Fax: '}<a href={c.value} style={{ color: 'var(--color-teal)', textDecoration: 'none' }}>{c.label}</a></span>
                      ) : (
                        <a href={c.value} style={{ color: 'var(--color-teal)', fontSize: '14px', textDecoration: 'none' }}>{c.label}</a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CAREERS CTA SECTION ═══════════════ */}
      <section className="section-pad" style={{ background: '#0f0f0f', paddingBottom: '80px' }}>
        <div className="content-wrapper-lg">
          <div style={{
            background: '#1a1a1a',
            backgroundImage: `url("${d.ctaSection.backgroundImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '40px',
            padding: '80px 40px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <h2 className="fade-in-up" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '700', marginBottom: '30px', lineHeight: 1.25 }} dangerouslySetInnerHTML={{ __html: d.ctaSection.heading.replace(/\n/g, '<br />') }} />
            <Link href={d.ctaSection.buttonLink} className="careers-cta-btn fade-in-up delay-200" style={{
              background: 'linear-gradient(90deg, #02b3df, #8cc541, #02b3df)',
              color: '#1a1a1a',
              fontWeight: '700',
              padding: '16px 36px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              letterSpacing: '0.5px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 4px 15px rgba(2, 179, 223, 0.2)',
              textDecoration: 'none'
            }}
             onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(140, 197, 65, 0.3)'; }}
             onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(2, 179, 223, 0.2)'; }}
            >
              {d.ctaSection.buttonText}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>


      {/* ═══════════════ SCOPED RESPONSIVE STYLES ═══════════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .careers-cta-btn {
          background-size: 200% auto !important;
          animation: gradientShift 2.5s linear infinite;
        }
        .careers-cta-btn svg {
          transition: transform 0.3s ease;
        }
        .careers-cta-btn:hover svg {
          transform: translateX(4px);
        }
        @media (max-width: 991px) {
          .contact-grid-wrapper {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .form-col-half {
            flex: 1 1 100% !important;
          }
          .form-container {
            padding: 24px 20px !important;
            border-radius: 20px !important;
          }
        }
      `}} />

    </main>
  );
}
