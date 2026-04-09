'use client';
import Link from 'next/link';

export default function Industries() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700' }}>
            Industries <span className="gradient-text">We Serve</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
            Accelerating digital, simulation, and operational efficiency across heavy manufacturing domains.
          </p>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: '#fff' }}>Global Industrial Expertise</h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto' }}>
              We deploy our deep domain knowledge and advanced mathematical modeling skills directly into the trenches of the world's most critical manufacturing pipelines.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {[
              { title: 'Chemicals & Petrochemicals', slug: 'chemicals-petrochemicals', icon: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' },
              { title: 'Oil & Gas', slug: 'oil-and-gas', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
              { title: 'Pharmaceuticals', slug: 'pharmaceuticals', icon: 'M10 22v-6.57M14 22v-6.57M2 8.3c0-2.3 1.9-4.2 4.3-4.2h11.4c2.4 0 4.3 1.9 4.3 4.2 0 2.3-1.9 4.2-4.3 4.2H6.3C3.9 12.5 2 10.6 2 8.3z' },
              { title: 'Food & Beverages', slug: 'food-and-beverages', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
              { title: 'Metals & Mining', slug: 'metals-and-mining', icon: 'M2 22h20M7 2h10v20H7z' },
              { title: 'Power Generation', slug: 'power-generation', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' }
            ].map((ind, i) => (
               <Link href={`/industries/${ind.slug}`} key={i} style={{ textDecoration: 'none' }}>
                 <div style={{ background: '#242424', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', height: '100%', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--color-teal)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}>
                    <div style={{ color: 'var(--color-teal)', marginBottom: '20px' }}>
                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d={ind.icon}></path>
                       </svg>
                    </div>
                    <h3 className="section-title" style={{ fontSize: '22px', color: '#fff', marginBottom: '10px' }}>{ind.title}</h3>
                    <p className="section-desc" style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>View Solutions →</p>
                 </div>
               </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
