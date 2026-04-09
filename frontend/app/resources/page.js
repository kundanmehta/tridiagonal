'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Resources() {
  const categories = ['All', 'Webinars', 'Whitepapers', 'Case Studies', 'Brochures'];
  
  return (
    <main>
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700' }}>
            Featured <span className="gradient-text">Resources</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
            Discover our collection of webinars, case studies, and engineering whitepapers.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a', paddingBottom: '30px' }}>
        <div className="content-wrapper-lg">
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
              {categories.map((cat, i) => (
                 <button key={i} style={{ background: i === 0 ? 'var(--color-teal)' : '#242424', color: i === 0 ? '#000' : '#fff', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>
                   {cat}
                 </button>
              ))}
           </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a', paddingTop: '0px' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
            {[
              { type: 'Webinar', title: 'CFD-DEM applied to Catalyst-Particles in Packed Bed Reactors', img: 'Blog CFD DEM.png' },
              { type: 'Case Study', title: 'Finite Element Analysis (FEA) in Oil & Gas Assets', img: 'FEA-1.png' },
              { type: 'Webinar', title: 'CFD Modeling to Improve Separator Performance', img: 'CFD Analysis of a Neutralization Tank _.png' },
              { type: 'Whitepaper', title: 'Advancements in Mixer Design using Digital Twins', img: 'Mixing Studies.webp' },
              { type: 'Case Study', title: 'Flow Assurance in Subsea Pipelines', img: 'Flow Assurance.jpg' },
              { type: 'Brochure', title: 'Tridiagonal Technology Validation Center Breakdown', img: 'Capture-1.webp' }
            ].map((res, i) => (
               <div key={i} style={{ background: '#242424', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                  <div style={{ position: 'relative', width: '100%', height: '220px', background: '#000' }}>
                     {/* Try to load from hubfs since we know user dumped images there */}
                     <Image src={`/hubfs/${res.img}`} alt={res.title} fill style={{ objectFit: 'cover', opacity: '0.8' }} />
                     <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'var(--color-teal)', color: '#000', padding: '5px 12px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {res.type}
                     </div>
                  </div>
                  <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                     <h3 className="section-title" style={{ fontSize: '20px', color: '#fff', marginBottom: '20px', lineHeight: '1.4' }}>{res.title}</h3>
                     <span style={{ color: 'var(--color-teal)', fontSize: '14px', fontWeight: 'bold' }}>Read More →</span>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
