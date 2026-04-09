'use client';
import Link from 'next/link';

export default function TechValidationCenter() {
  return (
    <main>
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700' }}>
            Technology Validation & <span className="gradient-text">Scale-up Centre</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
            Bridging the gap between conceptual bench-scale R&D and pilot-ready execution through high-end experimental loops and custom validation setups.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: '#fff' }}>Experimental Validation Facility</h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto' }}>
              Our bespoke flow loops and testing centers enable engineers to validate CFD models aggressively across scale parameters safely and effectively. Tridiagonal possesses a 250,000+ sq. ft. facility specifically designed for heavy testing environments.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { title: 'Flow Assurance Testing', desc: 'Predict and mitigate wax deposition, hydrate formations, and asphaltene blockages using our dedicated multi-phase temperature-controlled loops.' },
              { title: 'Slurry & Sand Transport', desc: 'Large scale clear-acrylic flow loops for visual and sensor-based mapping of sand deposition, transport ceilings, and fluid-slurry limits.' },
              { title: 'Mechanical Integrity (Erosion & Corrosion)', desc: 'Accelerated high-velocity abrasive erosion testing on complex valve, pipe, and choke geometries.' },
              { title: 'New Energy Systems', desc: 'Testing rigs adapted for Carbon Capture (CCUS) dynamics, Green Hydrogen electrolyser scaling, and advanced materials.' }
            ].map((facility, i) => (
               <div key={i} style={{ background: '#242424', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 className="section-title" style={{ fontSize: '22px', color: '#fff', marginBottom: '15px' }}>{facility.title}</h3>
                  <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{facility.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#242424' }}>
        <div className="content-wrapper-lg" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ color: '#fff', marginBottom: '20px' }}>Testing Capacities (TRL 3 to TRL 9)</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
             {['Custom High-Pressure Loops', 'High Temperature Environments', 'Laser Doppler Velocimetry', 'High-Speed Videography', 'In-line Rheology', 'Pumping Capabilities up to MW'].map((cap, i) => (
                <div key={i} style={{ background: '#1a1a1a', border: '1px solid var(--color-teal)', color: '#fff', padding: '15px 25px', borderRadius: '30px', fontWeight: '500' }}>
                   {cap}
                </div>
             ))}
          </div>
        </div>
      </section>
      
      <section className="section-pad" style={{ background: 'var(--color-teal)', textAlign: 'center' }}>
        <div className="content-wrapper-lg">
           <h2 className="section-title" style={{ color: '#000', marginBottom: '20px' }}>Book the Facility</h2>
           <p className="section-desc" style={{ color: 'rgba(0,0,0,0.8)', maxWidth: '600px', margin: '0 auto 40px' }}>
              Want to see our test rigs in action or validate a new product prototype?
           </p>
           <Link href="/contact-us" style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '15px 35px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
              Schedule a Discovery Call
           </Link>
        </div>
      </section>

    </main>
  );
}
