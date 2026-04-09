'use client';
import Link from 'next/link';

export default function FactSage() {
  return (
    <main>
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700' }}>
            Fact<span className="gradient-text">Sage</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
            The Industry Standard for Thermodynamic Simulation and Process Optimization.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ color: '#fff', marginBottom: '20px' }}>What is FactSage?</h2>
              <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
                FactSage is one of the largest computing systems in the world for chemical thermodynamics. It consists of a series of information, database, calculation, and manipulation modules that access various pure substances and solution databases.
              </p>
              <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
                As an authorized partner, Tridiagonal Solutions helps organizations across the metallurgical, chemical, and materials science industries deploy FactSage to accurately predict multiphase equilibria, slag chemistry, and high-temperature reactions.
              </p>
            </div>
            <div style={{ background: '#242424', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 className="section-title" style={{ fontSize: '20px', color: '#fff', marginBottom: '20px' }}>Key Capabilities</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                 {[
                   'Multiphase chemical equilibrium analysis',
                   'Extensive proprietary solution databases (FToxid, FScopp, etc.)',
                   'Phase diagram generation (binary, ternary, multicomponent)',
                   'Reaction thermochemistry predictions',
                   'Corrosion and environmental emission tracking'
                 ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
                      <svg style={{ flexShrink: 0, marginTop: '2px' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {item}
                    </li>
                 ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--color-teal)', textAlign: 'center' }}>
        <div className="content-wrapper-lg">
           <h2 className="section-title" style={{ color: '#000', marginBottom: '20px' }}>Evaluate FactSage Today</h2>
           <p className="section-desc" style={{ color: 'rgba(0,0,0,0.8)', maxWidth: '600px', margin: '0 auto 40px' }}>
              Speak with our thermodynamics modeling team to assess how FactSage can solve your metallurgical and chemical reactions.
           </p>
           <Link href="/contact-us" style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '15px 35px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
              Request a Consultation
           </Link>
        </div>
      </section>

    </main>
  );
}
