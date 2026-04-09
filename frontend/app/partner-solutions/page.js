'use client';
import Link from 'next/link';

export default function PartnerSolutions() {
  return (
    <main>
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700' }}>
            Partner <span className="gradient-text">Solutions</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
            Leveraging global technology alliances to deliver comprehensive Digital Transformation and Asset Lifecycle solutions.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: '#fff' }}>Strategic Partnerships</h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto' }}>
              Tridiagonal Solutions partners with the world's leading industrial software and automation providers to ensure you receive best-in-class simulation architectures, digital twins, and operational dashboards integrated directly into your existing IT/OT stacks.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { name: 'Siemens Digital Industries', role: 'Advanced Manufacturing', desc: 'Integration of Simcenter STAR-CCM+ and specialized industrial IoT Edge devices for real-time physics deployment.' },
              { name: 'Honeywell', role: 'Process Optimization', desc: 'Deploying digital representations to Honeywell Forge for next-level production yield improvements.' },
              { name: 'Emerson', role: 'Automation & Control', desc: 'Advanced Process Control (APC) solutions combined with predictive analytics powered by computational models.' },
              { name: 'AVEVA / PI System', role: 'Data Historians', desc: 'Syncing rigorous fluid simulation data directly into OT historian dashboards for instant operator feedback.' }
            ].map((partner, i) => (
               <div key={i} style={{ background: '#242424', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ color: 'var(--color-teal)', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{partner.role}</div>
                  <h3 className="section-title" style={{ fontSize: '24px', color: '#fff', margin: 0 }}>{partner.name}</h3>
                  <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: 0 }}>{partner.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--color-teal)', textAlign: 'center' }}>
        <div className="content-wrapper-lg">
           <h2 className="section-title" style={{ color: '#000', marginBottom: '20px' }}>Become a Partner</h2>
           <p className="section-desc" style={{ color: 'rgba(0,0,0,0.8)', maxWidth: '600px', margin: '0 auto 40px' }}>
              We are constantly seeking innovative hardware, Edge, and AI companies to form joint Go-To-Market strategies.
           </p>
           <Link href="/contact-us" style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '15px 35px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
              Partner With Us
           </Link>
        </div>
      </section>

    </main>
  );
}
