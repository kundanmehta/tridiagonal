'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// Mock DB
const mockBrochures = [
  {
    title: 'Advanced Computational Fluid Dynamics Services Overview',
    service: 'Advanced Modeling & Simulation',
    industry: 'Oil & Gas',
    excerpt: 'Comprehensive overview of our CFD consulting solutions, encompassing multiphase flows, reacting flows, and heat transfer.',
    img: '/hubfs/Digital Twin.jpg',
    slug: 'cfd-services-overview',
    date: 'Dec 15, 2023',
    content: [
      "Our Advanced Computational Fluid Dynamics (CFD) Services brochure offers an in-depth look at our core consulting capabilities. Tridiagonal Solutions has spent over a decade perfecting simulation workflows that directly impact the bottom line of heavy industry operations.",
      "Inside this brochure, you will find detailed explanations of our multiphase flow modeling, reacting flow analysis, and conjugate heat transfer services. We outline our standard operating procedures, software expertise (including Ansys Fluent, OpenFOAM, and STAR-CCM+), and hardware capabilities.",
      "Whether you are looking to optimize a single mixing tank or validate the flow assurance of a subsea production network, this document serves as the foundational guide to understanding how our engineering team integrates with yours."
    ]
  },
  {
    title: 'Digital Twin Solutions for Process Industries',
    service: 'Digital Transformation',
    industry: 'Chemicals & Petrochemicals',
    excerpt: 'A deep dive into building AI-driven predictive digital twins to drastically enhance asset reliability and yield.',
    img: '/hubfs/Flow Assurance.jpg',
    slug: 'digital-twin-solutions',
    date: 'Feb 10, 2024',
    content: [
      "The Digital Twin Solutions brochure outlines our approach to industrial digital transformation. Moving beyond basic IoT dashboards, we build rigorous physics-informed AI models that predict process anomalies before they occur.",
      "We detail the architecture of our agentic AI frameworks which seamlessly consume live SCADA data, process it through reduced-order thermal/fluid models, and spit out optimized control parameters in real time.",
      "Explore case highlights from the petrochemical sector where our digital twins have extended asset life by 20% and reduced unplanned downtime significantly. This brochure is essential reading for plant managers and CTOs looking to modernize heavy assets."
    ]
  },
  {
    title: 'Scale-Up & Validation Centre Capabilities',
    service: 'Technology Validation',
    industry: 'Pharma & Medical Devices',
    excerpt: 'Details on our cutting-edge laboratory facilities utilized to bridge the gap between bench scale and commercial manufacturing.',
    img: '/hubfs/image%20(10).png',
    slug: 'scaleup-validation-capabilities',
    date: 'Apr 02, 2024',
    content: [
      "Scale-up is notoriously difficult, particularly in the pharmaceutical and specialty chemicals sectors where shear sensitivity and mixing times dictate product quality.",
      "This brochure provides a panoramic overview of our Technology Validation Centre in Pune. We highlight our array of physical testing rigs, including transparent acrylic vessels, multi-stage pipelines, and advanced diagnostic tools like Particle Image Velocimetry (PIV) and laser-based droplet sizing.",
      "Learn how we systematically de-risk capital expenditures by coupling these empirical validation techniques with our robust computational models, ensuring that what works in the lab will work seamlessly at commercial scale."
    ]
  },
  {
    title: 'Siemens Simcenter Engineering Partnership',
    service: 'Partner Solutions',
    industry: 'Metals & Mining',
    excerpt: 'Discover our integrated 1D and 3D simulation workflows powered by Siemens Simcenter to accelerate product design.',
    img: '/hubfs/Blog CFD DEM.png',
    slug: 'siemens-simcenter-partnership',
    date: 'Jun 22, 2024',
    content: [
      "As an official engineering partner for Siemens Digital Industries Software, Tridiagonal brings unique expertise in deploying the Simcenter portfolio to solve complex multi-physics problems.",
      "This comprehensive brochure outlines our joint workflows utilizing Simcenter Amesim for 1D system modeling, and Simcenter STAR-CCM+ for high-fidelity 3D analysis.",
      "We showcase examples of how bridging 1D and 3D simulations accelerates the product development lifecycle by up to 40%, particularly in heavy machinery design and complex thermal management systems. Download to explore the licensing and consulting structures available through this partnership."
    ]
  }
];

export default function BrochureSinglePage() {
  const params = useParams();
  const { slug } = params || {};
  
  const brochure = mockBrochures.find((b) => b.slug === slug);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    consent: false
  });

  if (!brochure) {
    return (
      <main style={{ paddingTop: 'var(--nav-height)', background: '#1a1a1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <h1 style={{ color: '#fff' }}>Brochure Not Found</h1>
      </main>
    );
  }

  const handleDownload = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* ─────────────── HERO SECTION ─────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)',
          padding: '80px 0 60px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }} />
        
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            href="/resources/brochures"
            style={{
              color: 'var(--color-teal)',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '25px',
              transition: 'opacity 0.3s',
              fontWeight: '600'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            BACK TO BROCHURES
          </Link>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <span style={{ 
              display: 'inline-block',
              background: 'rgba(0, 255, 204, 0.15)', 
              color: 'var(--color-teal)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {brochure.industry}
            </span>
            <span style={{ 
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.1)', 
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {brochure.service}
            </span>
          </div>

          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: '700',
              marginBottom: '24px',
              lineHeight: '1.2',
              maxWidth: '900px'
            }}
          >
            {brochure.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              {brochure.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Downloadable PDF Available
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────── CONTENT & FORM AREA ─────────────── */}
      <section style={{ background: '#1a1a1a', padding: '60px 0 80px' }}>
        <div className="content-wrapper-lg">
          
          <div className="br-detail-layout">
            
            {/* LEFT: Content */}
            <div className="br-detail-left">
              
              <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px', background: '#000' }}>
                <Image 
                  src={brochure.img} 
                  alt={brochure.title} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
              </div>

              <div style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', fontSize: '1.15rem' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: '500', color: '#fff', marginBottom: '30px' }}>
                  {brochure.excerpt}
                </p>
                {brochure.content.map((para, i) => (
                  <p key={i} style={{ marginBottom: '25px' }}>{para}</p>
                ))}
              </div>

            </div>

            {/* RIGHT: Download Form */}
            <div className="br-detail-right">
              <div className="br-form-card">
                {!submitted ? (
                  <>
                    <form onSubmit={handleDownload} className="br-apply-form">
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>First Name*</label>
                          <input suppressHydrationWarning type="text" required placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label>Last Name*</label>
                          <input suppressHydrationWarning type="text" required placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Email*</label>
                        <input suppressHydrationWarning type="email" required placeholder="Corporate Email ID" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>

                      <div className="form-group">
                        <label>Company*</label>
                        <input suppressHydrationWarning type="text" required placeholder="Company Name" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                      </div>

                      <div className="form-group">
                        <label>Phone Number</label>
                        <input suppressHydrationWarning type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      </div>

                      <div className="form-group">
                        <label>Country*</label>
                        <select suppressHydrationWarning required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', background: '#1a1a1a url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E") no-repeat right 14px top 55%' }}>
                            <option value="">Please Select</option>
                            <option value="India">India (भारत)</option>
                            <option value="USA">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="UAE">United Arab Emirates</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Germany">Germany</option>
                            <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="form-group" style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: '10px' }}>
                        <input suppressHydrationWarning type="checkbox" id="consent" required checked={formData.consent} onChange={(e) => setFormData({...formData, consent: e.target.checked})} style={{ width: '18px', height: '18px', marginTop: '4px', cursor: 'pointer', accentColor: 'var(--color-teal)' }} />
                        <label htmlFor="consent" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.5', cursor: 'pointer' }}>
                          I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. <Link href="/privacy-policy" style={{ color: 'var(--color-teal)', textDecoration: 'underline' }}>Read our privacy policy*</Link>
                        </label>
                      </div>

                      <button suppressHydrationWarning type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '16px', fontWeight: '700', marginTop: '15px' }}>
                        Learn More
                      </button>
                    </form>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(71,188,135,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>
                      Thank You!
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>
                      Your download is ready. Click the button below to retrieve your brochure.
                    </p>
                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert('Download starting...')}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      Click here to Download
                    </button>
                  </div>
                )}
              </div>

              {/* Related & Sharing */}
              <div style={{ background: '#242424', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', marginTop: '35px' }}>
                <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
                  Related Brochures
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {mockBrochures.filter(b => b.slug !== brochure.slug).slice(0, 3).map((related) => (
                    <Link href={`/resources/brochures/${related.slug}`} key={related.slug} style={{ display: 'flex', gap: '15px', textDecoration: 'none' }}>
                      <div style={{ width: '80px', height: '60px', position: 'relative', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                         <Image src={related.img} alt={related.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '14px', color: '#fff', lineHeight: '1.4', marginBottom: '6px', fontWeight: '600' }}>
                          {related.title.length > 50 ? related.title.substring(0, 50) + '...' : related.title}
                        </h4>
                        <span style={{ fontSize: '12px', color: 'var(--color-teal)' }}>{related.industry}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '15px' }}>Share this Brochure</h3>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {['LinkedIn', 'Twitter', 'Facebook', 'WhatsApp'].map(social => (
                      <button key={social} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', transition: 'background 0.3s' }}
                      onMouseEnter={(e) => { e.target.style.background = 'var(--color-teal)'; e.target.style.color = '#000'; }}
                      onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = '#fff'; }}
                      >
                        {social}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─────────────── SCOPED STYLES ─────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Layout */
        .br-detail-layout {
          display: flex;
          gap: 50px;
          align-items: flex-start;
        }
        .br-detail-left { flex: 1.15; min-width: 0; }
        .br-detail-right { flex: 0.85; min-width: 320px; position: sticky; top: calc(var(--nav-height) + 20px); }
        @media (max-width: 900px) {
          .br-detail-layout { flex-direction: column; }
          .br-detail-right { width: 100%; position: static; }
        }

        /* Form Card */
        .br-form-card {
          background: #242424;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }
        .br-apply-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }
        
        .form-group { display: flex; flex-direction: column; gap: 7px; }
        .form-group label {
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          font-weight: 500;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 14px;
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s ease;
          font-family: inherit;
        }
        .form-group select {
           background-size: 12px !important;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus { border-color: var(--color-teal); }
        .form-group input::placeholder,
        .form-group textarea::placeholder { color: rgba(255,255,255,0.25); }
      `}} />
    </main>
  );
}
