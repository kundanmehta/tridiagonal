'use client';
import Link from 'next/link';

export default function Publications() {
  return (
    <main>
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700' }}>
            Publications & <span className="gradient-text">Patents</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
            Driving research and defining the edge of process simulations.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', maxWidth: '800px', margin: '0 auto' }}>
             {[
               { title: 'Multiphase Flow Modeling in High-Pressure Environments', type: 'Publication', journal: 'SPE Journal', year: '2025' },
               { title: 'Method for predictive modeling of wax deposition utilizing custom test loops', type: 'Patent', journal: 'US Patent Office', year: '2024' },
               { title: 'Scaling down stirred-tank reactors via numerical homogenization', type: 'Publication', journal: 'Chemical Engineering Science', year: '2023' },
               { title: 'Computational framework for predicting erosion-corrosion synergy', type: 'Publication', journal: 'NACE International', year: '2023' }
             ].map((item, i) => (
                <div key={i} style={{ background: '#242424', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                   <div style={{ position: 'absolute', top: '30px', right: '30px', background: item.type === 'Patent' ? 'rgba(71, 188, 135, 0.2)' : 'rgba(255,255,255,0.1)', color: item.type === 'Patent' ? 'var(--color-teal)' : '#fff', padding: '5px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold' }}>
                      {item.type}
                   </div>
                   <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', paddingRight: '80px' }}>{item.title}</h3>
                   <div style={{ display: 'flex', gap: '20px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                        {item.journal}
                     </span>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        {item.year}
                     </span>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--color-teal)', textAlign: 'center' }}>
        <div className="content-wrapper-lg">
           <h2 className="section-title" style={{ color: '#000', marginBottom: '20px' }}>Research Partnerships</h2>
           <p className="section-desc" style={{ color: 'rgba(0,0,0,0.8)', maxWidth: '600px', margin: '0 auto 40px' }}>
              We continuously collaborate with leading universities and research institutes on joint academic grants.
           </p>
           <Link href="/contact-us" style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '15px 35px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
              Propose a Study
           </Link>
        </div>
      </section>

    </main>
  );
}
