'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function ArrowRight({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59l-2.13-2.13a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
    </svg>
  );
}

/* ─── Social Icon SVGs ─── */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 448 512" aria-label="LinkedIn">
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 320 512" aria-label="Facebook">
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg viewBox="0 0 512 512" aria-label="X / Twitter">
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 576 512" aria-label="YouTube">
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
    </svg>
  );
}

const services = [
  { title: 'Advanced Modeling & Simulation (CFD/FEA)', href: '/services/modeling' },
  { title: 'Technology Validation & Scale-up Centre', href: '/services/scale-up' },
  { title: 'Tridiagonal.ai – Domain-Driven AI', href: 'https://tridiagonal.ai' },
  { title: 'Software – Scale-up & Tech Transfer', href: 'https://tridiagonalsoftware.com' },
  { title: 'Partner Solutions', href: '/partner-solutions' },
];

const topics = [
  { title: 'Computational Fluid Dynamics', href: '/services/modeling' },
  { title: 'Green Hydrogen', href: '/services/scale-up' },
  { title: 'Fluid Structure Interaction', href: '#' },
];

const locations = [
  {
    region: 'North America',
    address: '8632 Fredericksburg Road, Suite 101, San Antonio, TX 78240',
    phone: null,
  },
  {
    region: 'India',
    address: 'Unit 401, 4th Floor, Amar Madhuban Tech Park, Survey No. 43/1 and 44/1/1, Baner, Pune, Maharashtra - 411045',
    phone: '+91 7020993061',
  },
  {
    region: 'U.A.E.',
    address: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates',
    phone: null,
  },
];

export default function Footer() {
  const [isSubscribeHovered, setIsSubscribeHovered] = useState(false);

  return (
    <>
      {/* ── CTA: Newsletter Subscribe ── */}
      <section
        className="cta-section"
        style={{
          background: 'linear-gradient(90deg, #00AEEF 0%, #a2d246 100%)',
          padding: '60px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        aria-label="Newsletter Subscribe"
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '1200px', gap: '30px', flexWrap: 'wrap', padding: '0 30px' }}>
          <h2 className="section-title" style={{ color: '#fff', fontSize: '32px', margin: 0, fontWeight: '700' }}>
            Sign up for our newsletter today!
          </h2>
          <div
            onMouseEnter={() => setIsSubscribeHovered(true)}
            onMouseLeave={() => setIsSubscribeHovered(false)}
            style={{
              position: 'relative',
              height: '60px',
              width: isSubscribeHovered ? '420px' : '220px',
              background: '#118151',
              borderRadius: '40px',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              maxWidth: '100%',
            }}
          >
            <input
              suppressHydrationWarning
              type="email"
              placeholder="Email address"
              className="newsletter-input"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                padding: '0 24px',
                fontSize: '16px',
                opacity: isSubscribeHovered ? 1 : 0,
                pointerEvents: isSubscribeHovered ? 'auto' : 'none',
                transition: 'opacity 0.3s ease 0.1s'
              }}
            />
            <button
              suppressHydrationWarning
              style={{
                position: 'absolute',
                right: '6px',
                top: '6px',
                bottom: '6px',
                width: isSubscribeHovered ? '130px' : 'calc(100% - 12px)',
                background: isSubscribeHovered ? '#0a5937' : 'transparent',
                color: '#fff',
                border: 'none',
                borderRadius: '30px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)'
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ── Main Footer ── */}
      <footer className="site-footer">
      <div className="content-wrapper-lg">
        <div className="footer-grid">

          {/* ── Column 1: Logo + tagline + social ── */}
          <div>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Tridiagonal Solutions"
                width={800}
                height={280}
                style={{ objectFit: 'contain', height: '70px', width: 'auto' }}
                quality={100}
                unoptimized={true}
              />
            </Link>

            <p className="footer-tagline">
              Trusted partner for delivering technology solutions to the process industry.
            </p>

            <p style={{ fontSize:'18px', fontWeight:600, color:'rgba(255,255,255,0.8)', marginBottom:'0.75rem' }}>
              Follow us on:
            </p>
            <div className="social-links">
              <a href="https://www.linkedin.com/company/tridiagonal-solutions/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="https://www.facebook.com/TridiagonalSolutions/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://twitter.com/TridiagonalSoln" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="https://www.youtube.com/channel/UCJajSN0v6sP3PEkNRvQeTZQ" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* ── Column 2: Services ── */}
          <div>
            <h6 className="footer-col-heading" style={{ fontSize: '15px', color: '#fff' }}>Services</h6>
            <nav aria-label="Services links">
              {services.map((s) => (
                <Link key={s.title} href={s.href} className="footer-link" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>
                  {s.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Column 3: Topics ── */}
          <div>
            <h6 className="footer-col-heading" style={{ fontSize: '15px', color: '#fff' }}>Topics</h6>
            <nav aria-label="Topic links">
              {topics.map((t) => (
                <Link key={t.title} href={t.href} className="footer-link" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>
                  {t.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Column 4: Locations ── */}
          <div>
            <h6 className="footer-col-heading" style={{ fontSize: '15px', color: '#fff' }}>Locations</h6>
            {locations.map((loc) => (
              <div key={loc.region} style={{ marginBottom:'16px' }}>
                <p className="footer-location-heading" style={{ fontSize: '15px', color: 'var(--color-sep)' }}>{loc.region}</p>
                <p className="footer-location-text" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>{loc.address}</p>
                {loc.phone && (
                  <p className="footer-location-text" style={{ marginTop:'4px', fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>
                    <strong style={{ color:'rgba(255,255,255,0.9)' }}>Sales Enquiry: </strong>
                    <a href={`tel:${loc.phone}`} style={{ color:'var(--color-teal)' }}>{loc.phone}</a>
                  </p>
                )}
              </div>
            ))}

            <div style={{ marginTop:'12px', paddingTop:'12px', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
              <p className="footer-location-heading" style={{ fontSize: '15px', color: 'var(--color-sep)' }}>Scale-Up &amp; Experimental Lab</p>
              <p className="footer-location-text" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)' }}>
                Gate No. 1074-1076, Opp. Utkash Constrowell RMC Plant, Shirwal, Satara, Maharashtra 412801
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom" style={{ background:'#111' }}>
        <div className="content-wrapper-lg">
          <div className="footer-bottom-inner">
            <p className="footer-copy" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)' }}>
              © {new Date().getFullYear()} — Tridiagonal Solutions. All Rights Reserved.
            </p>
            <nav className="footer-bottom-links" aria-label="Footer policy links">
              <Link href="/" className="footer-bottom-link" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)' }}>Home</Link>
              <Link href="/about-us" className="footer-bottom-link" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)' }}>About Us</Link>
              <Link href="/careers" className="footer-bottom-link" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)' }}>Careers</Link>
              <Link href="/privacy-policy" className="footer-bottom-link" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)' }}>Privacy Policy</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
