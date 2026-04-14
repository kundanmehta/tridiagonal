'use client';
import Link from 'next/link';
import Image from 'next/image';

const partners = [
  {
    slug: 'siemens',
    name: 'Siemens Digital Industries',
    tagline: 'Simulation & Digital Twin Excellence',
    logo: '/hubfs/siemens-logo.png',
    logoFilter: 'brightness(10)',
    logoBg: 'linear-gradient(135deg, #0a1628 0%, #0d2137 100%)',
    desc: 'Tridiagonal Solutions is an authorised Siemens Channel Partner, delivering world-class CFD and FEA simulation capabilities through Siemens Simcenter portfolio — including STAR-CCM+, Simcenter FLOEFD, and allied tools — to engineering teams across the process industry.',
  },
  {
    slug: 'factsage',
    name: 'FactSage',
    tagline: 'Thermodynamic Simulation Software',
    logo: '/hubfs/factsage-logo.png',
    logoFilter: 'none',
    logoBg: '#1a2a4a',
    desc: 'FactSage is the world\'s largest fully integrated thermodynamic database and software system. Tridiagonal partners with GTT-Technologies to bring FactSage\'s powerful equilibrium calculations and phase diagram tools to metals, mining, cement, and high-temperature process industries.',
  },
  {
    slug: 'coreform',
    name: 'Coreform',
    tagline: 'Next-Generation Finite Element Analysis',
    logo: '/hubfs/coreform-logo.png',
    logoFilter: 'none',
    logoBg: '#1a1a2e',
    desc: 'Coreform develops next-generation finite element analysis software based on isogeometric analysis (IGA). As a certified Coreform partner, Tridiagonal brings Coreform Cubit meshing and Coreform IGA solver capabilities to structural and mechanical engineering workflows.',
  },
];

export default function PartnerSolutionsPage() {
  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#1a1a1a' }}>

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: "url('/hubfs/Advanced%20Modeling%20Service%20Page%20Banner.png') center center / cover no-repeat",
          padding: '100px 0 80px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,26,0.88)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.12)', border: '1px solid rgba(71,188,135,0.3)', borderRadius: '30px', padding: '6px 20px', marginBottom: '24px' }}>
            <span style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>STRATEGIC ALLIANCES</span>
          </div>

          <h1
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '24px',
              lineHeight: 1.2,
            }}
          >
            Partner <span className="gradient-text">Solutions</span>
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '18px',
              maxWidth: '680px',
              margin: '0 auto 40px',
              lineHeight: 1.8,
            }}
          >
            Tridiagonal Solutions partners with the world&apos;s leading industrial software providers to deliver best-in-class simulation, thermodynamic analysis, and finite element tools to the process industry.
          </p>

          <Link
            href="#schedule-a-call"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'var(--gradient-brand)', color: '#000',
              fontWeight: '800', textTransform: 'uppercase',
              padding: '14px 36px', borderRadius: '40px',
              fontSize: '14px', letterSpacing: '0.5px', textDecoration: 'none',
            }}
          >
            Become a Partner
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      {/* ── PARTNERS GRID ── */}
      <section style={{ padding: '100px 0', background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Our Partners</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: '800', marginBottom: '20px' }}>
              Strategic <span className="gradient-text">Partnerships</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8', fontSize: '16px' }}>
              We collaborate with industry-leading technology providers to ensure you receive the most advanced, integrated, and scalable engineering solutions.
            </p>
          </div>

          {/* Partner Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {partners.map((partner, i) => (
              <div
                key={partner.slug}
                className="partner-card"
                style={{
                  background: '#141414',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '340px 1fr' : '1fr 340px',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(71,188,135,0.3)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Logo Panel */}
                {i % 2 === 0 ? (
                  <>
                    <div style={{
                      background: partner.logoBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '60px 40px', minHeight: '280px',
                    }}>
                      <img src={partner.logo} alt={partner.name} style={{ maxWidth: '180px', maxHeight: '80px', objectFit: 'contain', filter: partner.logoFilter }} />
                    </div>
                    {/* Content Panel */}
                    <div style={{ padding: '50px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
                        {partner.tagline}
                      </div>
                      <h3 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: '800', marginBottom: '20px', lineHeight: 1.2 }}>
                        {partner.name}
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.8', marginBottom: '32px' }}>
                        {partner.desc}
                      </p>
                      <Link
                        href={`/partner-solutions/${partner.slug}`}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          background: 'var(--gradient-brand)', color: '#000',
                          fontWeight: '800', textTransform: 'uppercase',
                          padding: '12px 28px', borderRadius: '40px',
                          fontSize: '13px', letterSpacing: '0.5px', textDecoration: 'none',
                          width: 'fit-content', transition: 'transform 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        Read More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Content Panel (left) */}
                    <div style={{ padding: '50px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
                        {partner.tagline}
                      </div>
                      <h3 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: '800', marginBottom: '20px', lineHeight: 1.2 }}>
                        {partner.name}
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.8', marginBottom: '32px' }}>
                        {partner.desc}
                      </p>
                      <Link
                        href={`/partner-solutions/${partner.slug}`}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          background: 'var(--gradient-brand)', color: '#000',
                          fontWeight: '800', textTransform: 'uppercase',
                          padding: '12px 28px', borderRadius: '40px',
                          fontSize: '13px', letterSpacing: '0.5px', textDecoration: 'none',
                          width: 'fit-content', transition: 'transform 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        Read More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    </div>
                    {/* Logo Panel (right) */}
                    <div style={{
                      background: partner.logoBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '60px 40px', minHeight: '280px',
                    }}>
                      <img src={partner.logo} alt={partner.name} style={{ maxWidth: '180px', maxHeight: '80px', objectFit: 'contain', filter: partner.logoFilter }} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE A CALL ── */}
      <section id="schedule-a-call" className="ps-schedule-section" style={{ padding: '80px 0', background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,460px),1fr))', gap: '60px', alignItems: 'center' }}>
            {/* Left text */}
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '20px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Contact Us</span>
              </div>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: '800', marginBottom: '20px', lineHeight: 1.3 }}>
                Schedule a Call Today!
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontSize: '16px', marginBottom: '30px' }}>
                Interested in our partner solutions or becoming a technology partner? Reach out to our team and we will connect you with the right expert.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Siemens Simcenter licensing & consulting', href: '/partner-solutions/siemens' },
                  { label: 'FactSage thermodynamic software', href: '/partner-solutions/factsage' },
                  { label: 'Coreform Cubit & IGA solver', href: '/partner-solutions/coreform' },
                ].map((item, i) => (
                  <Link key={i} href={item.href} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 20px', background: '#242424', borderRadius: '4px',
                    borderLeft: '2px solid var(--color-teal)', color: 'var(--color-teal)',
                    textDecoration: 'none', fontWeight: '700', fontSize: '15px',
                  }}>
                    {item.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="ps-form-card" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="ps-form-name-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>First Name *</label>
                    <input suppressHydrationWarning placeholder="First Name" style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Last Name *</label>
                    <input suppressHydrationWarning placeholder="Last Name" style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Corporate Email *</label>
                  <input suppressHydrationWarning type="email" placeholder="Corporate Email ID" style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Company Name *</label>
                  <input suppressHydrationWarning placeholder="Company Name" style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Interested In</label>
                  <select suppressHydrationWarning style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: 'rgba(255,255,255,0.4)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}>
                    <option value="">Please Select</option>
                    <option>Siemens Simcenter</option>
                    <option>FactSage</option>
                    <option>Coreform</option>
                    <option>Become a Partner</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Message</label>
                  <textarea suppressHydrationWarning rows={3} placeholder="Tell us about your requirements..." style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                </div>
                <button suppressHydrationWarning type="submit"
                  style={{ background: 'var(--gradient-brand)', color: '#000', border: 'none', padding: '14px 32px', borderRadius: '40px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', letterSpacing: '0.5px', width: 'fit-content' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Submit Enquiry
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile responsive style */}
      <style>{`
        /* ── Partner Cards ── */
        .partner-card {
          grid-template-columns: 340px 1fr;
        }
        @media (max-width: 900px) {
          .partner-card {
            grid-template-columns: 1fr !important;
          }
          .partner-logo-panel {
            min-height: 200px !important;
            padding: 40px 24px !important;
            order: -1 !important;
          }
          .partner-card > div:last-child {
            padding: 32px 24px !important;
          }
          .partner-card > div:first-child {
            padding: 32px 24px !important;
          }
        }

        /* ── Form + Schedule section ── */
        @media (max-width: 600px) {
          .ps-schedule-section { padding-top: 0 !important; }
          .ps-form-card { padding: 20px !important; }
          .ps-form-name-row { grid-template-columns: 1fr !important; }
        }

        /* ── Hero section padding ── */
        @media (max-width: 768px) {
          .ps-hero-section { padding: 60px 0 50px !important; }
          .ps-hero-buttons { flex-direction: column; align-items: center; }
          .ps-hero-buttons a, .ps-hero-buttons button { width: 100%; justify-content: center; }
          .ps-partners-section { padding: 60px 0 !important; }
          .ps-schedule-section { padding: 50px 0 !important; }
        }

        /* ── Partner detail pages hero ── */
        @media (max-width: 768px) {
          .pd-hero-flex { flex-direction: column !important; gap: 20px !important; }
          .pd-logo-box { width: 100% !important; padding: 24px !important; }
          .pd-products-grid { grid-template-columns: 1fr !important; }
          .pd-why-grid { grid-template-columns: 1fr !important; }
          .pd-industries-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .pd-industries-grid { grid-template-columns: 1fr !important; }
          .pd-cta-buttons { flex-direction: column !important; align-items: center !important; }
          .pd-cta-buttons a { width: 100% !important; justify-content: center !important; text-align: center !important; }
        }
      `}</style>

    </main>
  );
}
