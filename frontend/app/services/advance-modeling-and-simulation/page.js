'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function AdvanceModeling() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700' }}>
            Advanced Modeling & <span className="gradient-text">Simulation</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
            Leverage Computational Fluid Dynamics (CFD), Finite Element Analysis (FEA), and Discrete Element Modeling (DEM) to optimize your process operations.
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ color: '#fff', marginBottom: '20px' }}>Unlock Process Optimization</h2>
              <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
                With over 15+ years of pure domain expertise, Tridiagonal Solutions accelerates process innovation by building highly accurate physics-based mathematical models.
              </p>
              <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)' }}>
                We bridge the gap between traditional R&D and digital operations, delivering profound insights into mixing, reactions, thermal management, and flow assurance across complex industrial systems.
              </p>
            </div>
            <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', minHeight: '350px', background: '#242424', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Image 
                src="/hubfs/Advanced Modeling Service Page Banner.png" 
                alt="Advanced Modeling Simulation" 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR EXPERTISE / SERVICES GRID */}
      <section className="section-pad" style={{ background: '#242424' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: '#fff' }}>Our Core Competencies</h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto' }}>
              We apply multidisciplinary physics simulations to troubleshoot, design, and scale up critical equipment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { title: 'Computational Fluid Dynamics (CFD)', desc: 'Predict fluid flow patterns, heat transfer, and chemical reactions accurately within complex geometries to reduce trial-and-error testing.' },
              { title: 'Finite Element Analysis (FEA)', desc: 'Ensure structural integrity, assess mechanical failures, vibration profiles, and fatigue cycles under operational load conditions.' },
              { title: 'Discrete Element Modeling (DEM)', desc: 'Analyze flow behavior of granular materials, cohesive powders, and bulk solids handling equipment.' },
              { title: 'Fluid Structure Interaction (FSI)', desc: 'Solve complex coupled problems where dynamic fluid forces interact tightly with responsive solid mechanics.' }
            ].map((skill, i) => (
               <div key={i} style={{ background: '#1a1a1a', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '10px', background: 'rgba(71, 188, 135, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                  <h3 className="section-title" style={{ fontSize: '22px', color: '#fff', marginBottom: '15px' }}>{skill.title}</h3>
                  <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{skill.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: 'var(--color-teal)', textAlign: 'center' }}>
        <div className="content-wrapper-lg">
           <h2 className="section-title" style={{ color: '#000', marginBottom: '20px' }}>Ready to Scale Up Faster?</h2>
           <p className="section-desc" style={{ color: 'rgba(0,0,0,0.8)', maxWidth: '600px', margin: '0 auto 40px' }}>
              Connect with our domain experts to discuss your specific process challenges.
           </p>
           <Link href="/contact-us" style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '15px 35px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
              Contact Us Today
           </Link>
        </div>
      </section>
      
    </main>
  );
}
