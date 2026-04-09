'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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

export default function ContactUs() {
  const [formRef, formInView] = useInView(0.1);
  const [officesRef, officesInView] = useInView(0.1);

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>

      {/* ═══════════════ MAIN 2-COLUMN SECTION ═══════════════ */}
      <section className="section-pad" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(71, 188, 135, 0.15) 0%, transparent 50%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: '40px' }}>
          
          <div className="contact-grid-wrapper" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '60px', alignItems: 'start' }}>
            
            {/* Left Column: Here To Help */}
            <div style={{ paddingTop: '20px' }}>
              <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: '3.5rem', marginBottom: '15px' }}>
                <span className="gradient-text">Here To Help</span>
              </h1>
              <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', marginBottom: '40px' }}>
                Reach out to our experts today.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Sales Card */}
                <div className="fade-in-up delay-200" style={{ background: '#2a2a2a', borderRadius: '20px', padding: '30px 24px', border: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', display: 'flex', gap: '20px', alignItems: 'flex-start' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(71,188,135,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: '56px', height: '56px', flexShrink: 0, borderRadius: '50%', background: 'rgba(71,188,135,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(71,188,135,0.2)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Sales</h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.5 }}>Interested in learning more about Tridiagonal? Request a consultation</p>
                  </div>
                </div>

                {/* Careers Card */}
                <Link href="/careers" style={{ textDecoration: 'none' }}>
                  <div className="fade-in-up delay-200" style={{ background: '#2a2a2a', borderRadius: '20px', padding: '30px 24px', border: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', display: 'flex', gap: '20px', alignItems: 'flex-start' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(71,188,135,0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ width: '56px', height: '56px', flexShrink: 0, borderRadius: '50%', background: 'rgba(71,188,135,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(71,188,135,0.2)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                      </svg>
                    </div>
                    <div>
                      <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Careers</h3>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.5 }}>Looking to help others thrive in their personal and professional lives? Check out our open positions</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="form-container" ref={formRef} style={{ background: '#242424', padding: '40px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', opacity: formInView ? 1 : 0, transform: formInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
              <form className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div className="form-col-half" style={{ flex: '1 1 calc(50% - 8px)' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>First Name<span style={{color: '#f05a28'}}>*</span></label>
                    <input suppressHydrationWarning type="text" required style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', padding: '10px 14px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div className="form-col-half" style={{ flex: '1 1 calc(50% - 8px)' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Last Name<span style={{color: '#f05a28'}}>*</span></label>
                    <input suppressHydrationWarning type="text" required style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', padding: '10px 14px', color: '#fff', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div className="form-col-half" style={{ flex: '1 1 calc(50% - 8px)' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Email<span style={{color: '#f05a28'}}>*</span></label>
                    <input suppressHydrationWarning type="email" required style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', padding: '10px 14px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div className="form-col-half" style={{ flex: '1 1 calc(50% - 8px)' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Contact Number<span style={{color: '#f05a28'}}>*</span></label>
                    <input suppressHydrationWarning type="tel" required style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', padding: '10px 14px', color: '#fff', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div className="form-col-half" style={{ flex: '1 1 calc(50% - 8px)' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Job title</label>
                    <input suppressHydrationWarning type="text" style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', padding: '10px 14px', color: '#fff', outline: 'none' }} />
                  </div>
                  <div className="form-col-half" style={{ flex: '1 1 calc(50% - 8px)' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Company Name<span style={{color: '#f05a28'}}>*</span></label>
                    <input suppressHydrationWarning type="text" required style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', padding: '10px 14px', color: '#fff', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#fff', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Industry</label>
                  <select suppressHydrationWarning defaultValue="" style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', padding: '10px 14px', color: '#fff', outline: 'none', appearance: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23ffffff' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px top 50%' }}>
                    <option value="" disabled>Please Select</option>
                    <option value="oil-gas">Oil &amp; Gas</option>
                    <option value="pharma">Pharma &amp; Medical Devices</option>
                    <option value="metals">Metals, Mining &amp; Cement</option>
                    <option value="food">Food, Beverages &amp; CPG</option>
                    <option value="chemicals">Chemicals &amp; Petrochemicals</option>
                    <option value="power">Power &amp; Renewables</option>
                    <option value="other">Others</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#fff', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Country</label>
                  <select suppressHydrationWarning defaultValue="" style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', padding: '10px 14px', color: '#fff', outline: 'none', appearance: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23ffffff' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px top 50%' }}>
                    <option value="" disabled>Please Select</option>
                    <option value="india">India</option>
                    <option value="usa">United States</option>
                    <option value="uae">United Arab Emirates</option>
                    <option value="uk">United Kingdom</option>
                    <option value="germany">Germany</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#fff', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Services/Technologies</label>
                  <select suppressHydrationWarning defaultValue="" style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', padding: '10px 14px', color: '#fff', outline: 'none', appearance: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23ffffff' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px top 50%' }}>
                    <option value="" disabled>Please Select</option>
                    <option value="cfd">CFD</option>
                    <option value="fea">FEA</option>
                    <option value="dem">DEM</option>
                    <option value="fsi">FSI</option>
                    <option value="digital-twin">Digital Twin</option>
                    <option value="flow-assurance">Flow Assurance Testing</option>
                    <option value="erosion-corrosion">Erosion &amp; Corrosion Testing</option>
                    <option value="ai">Tridiagonal.ai</option>
                    <option value="partner">Partner Solutions</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#fff', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>Message Box</label>
                  <textarea suppressHydrationWarning rows="3" style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', padding: '10px 14px', color: '#fff', outline: 'none', resize: 'vertical' }}></textarea>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '5px' }}>
                  <input suppressHydrationWarning type="checkbox" id="agree" style={{ marginTop: '5px', accentColor: 'var(--color-teal)' }} />
                  <label htmlFor="agree" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', lineHeight: 1.4 }}>
                    I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <a href="/privacy-policy" style={{ color: 'var(--color-teal)', textDecoration: 'underline' }}>privacy policy</a>
                  </label>
                </div>

                {/* Recaptcha Placeholder */}
                <div style={{ background: '#f5f5f5', borderRadius: '4px', width: 'max-content', display: 'flex', alignItems: 'stretch', border: '1px solid #dcdcdc', overflow: 'hidden', height: '50px' }}>
                  <div style={{ background: '#1a73e8', color: '#fff', fontSize: '11px', padding: '0 12px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    protected by reCAPTCHA
                  </div>
                  <div style={{ padding: '0 15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#a5a5a5">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.43 4.07 16.05 4.07 12C4.07 7.95 7.05 4.57 11 4.07V19.93ZM13 4.07C16.95 4.57 19.93 7.95 19.93 12C19.93 16.05 16.95 19.43 13 19.93V4.07Z"/>
                    </svg>
                  </div>
                </div>

                <button suppressHydrationWarning type="submit" style={{ marginTop: '8px', width: '100%', background: 'linear-gradient(90deg, #1aa390, #88c847)', color: '#fff', padding: '14px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', border: 'none', cursor: 'pointer', transition: 'box-shadow 0.3s, transform 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 25px rgba(136,200,71,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  Submit
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* ═══════════════ GLOBAL OFFICES SECTION ═══════════════ */}
      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: '#fff', fontSize: '36px', fontWeight: '700' }}>Our Global Offices</h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', margin: '0 auto' }}>Tridiagonal Solutions scales with you across the globe.</p>
          </div>

          <div ref={officesRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px', opacity: officesInView ? 1 : 0, transform: officesInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>

            {/* ── North America ── */}
            <div style={{ background: '#242424', borderRadius: '20px', padding: '40px 30px', border: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <img src="/images/download642b.png" alt="USA Flag" style={{ height: '24px', width: 'auto', borderRadius: '2px', objectFit: 'contain' }} />
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700' }}>North America</h3>
              </div>
              <h4 style={{ color: 'var(--color-teal)', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Tridiagonal Solutions Inc.</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
                8632 Fredericksburg Road, Suite 101<br />San Antonio, Texas 78240, USA
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href="tel:+12104878343" style={{ color: 'var(--color-teal)', fontSize: '14px', textDecoration: 'none' }}>+1 (210) 487-8343</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>Fax: <a href="tel:+12104680699" style={{ color: 'var(--color-teal)', textDecoration: 'none' }}>+1 (210) 468-0699</a></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href="mailto:info@tridiagonal.com" style={{ color: 'var(--color-teal)', fontSize: '14px', textDecoration: 'none' }}>info@tridiagonal.com</a>
                </div>
              </div>
            </div>

            {/* ── India ── */}
            <div style={{ background: '#242424', borderRadius: '20px', padding: '40px 30px', border: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <img src="/images/Flag_of_India.svg769c.jpg" alt="India Flag" style={{ height: '24px', width: 'auto', borderRadius: '2px', objectFit: 'contain' }} />
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700' }}>India</h3>
              </div>
              <h4 style={{ color: 'var(--color-teal)', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Tridiagonal Solutions Pvt. Ltd.</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7, marginBottom: '14px' }}>
                Unit 401, 4th Floor, Amar Madhuban Tech Park, Survey No. 43/1 and 44/1/1, Opposite Audi Showroom, Baner, Pune, Maharashtra - 411045
              </p>

              <h4 style={{ color: 'var(--color-teal)', fontSize: '15px', fontWeight: '600', marginBottom: '10px', marginTop: '16px' }}>Scale-Up &amp; Experimental Lab Facility</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
                Gate No.1074 1075 1076, Opp. Utkash Constrowell RMC Plant, Shirwal, Tal Khandala, Shirwal, Satara, Maharashtra, 412801
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href="tel:+912069002000" style={{ color: 'var(--color-teal)', fontSize: '14px', textDecoration: 'none' }}>+91 20 69002000</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>Sales Enquiry: <a href="tel:+917020993061" style={{ color: 'var(--color-teal)', textDecoration: 'none' }}>+91 7020993061</a></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>Admin Enquiry: <a href="tel:+918087590308" style={{ color: 'var(--color-teal)', textDecoration: 'none' }}>+91 8087590308</a></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href="mailto:info@tridiagonal.com" style={{ color: 'var(--color-teal)', fontSize: '14px', textDecoration: 'none' }}>info@tridiagonal.com</a>
                </div>
              </div>
            </div>

            {/* ── UAE ── */}
            <div style={{ background: '#242424', borderRadius: '20px', padding: '40px 30px', border: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.3s, box-shadow 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <img src="/images/640px-Flag_of_the_United_Arab_Emirates.svgd69a.png" alt="UAE Flag" style={{ height: '24px', width: 'auto', borderRadius: '2px', objectFit: 'contain' }} />
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700' }}>UAE</h3>
              </div>
              <h4 style={{ color: 'var(--color-teal)', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Tridiagonal Solutions – FZCO</h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
                Building A1, Dubai Digital Park,<br />Dubai Silicon Oasis, Dubai,<br />United Arab Emirates
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:info@tridiagonal.com" style={{ color: 'var(--color-teal)', fontSize: '14px', textDecoration: 'none' }}>info@tridiagonal.com</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ CAREERS CTA SECTION ═══════════════ */}
      <section className="section-pad" style={{ background: '#0f0f0f', paddingBottom: '80px' }}>
        <div className="content-wrapper-lg">
          <div style={{
            background: '#1a1a1a',
            backgroundImage: 'url("/hubfs/topography-bg.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '40px',
            padding: '80px 40px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <h2 className="fade-in-up" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '700', marginBottom: '30px', lineHeight: 1.25 }}>
              Seeking to thrive in your<br />professional life?
            </h2>
            <Link href="/careers" className="careers-cta-btn fade-in-up delay-200" style={{
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
              CHECK OUT OUR OPEN POSITIONS
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
