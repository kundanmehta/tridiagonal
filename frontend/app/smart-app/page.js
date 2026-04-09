'use client';
import Link from 'next/link';

export default function SmartApp() {
  return (
    <main>
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700' }}>
            Domain-Driven <span className="gradient-text">Smart Apps</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
            Integrating physics-based models into modular, scalable, and fully digital cloud architectures.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: '#fff' }}>SimSight & Custom Agentic AI</h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto' }}>
              Tridiagonal designs Smart Apps that encapsulate complex computational models into user-friendly interfaces. By abstracting the heavy mathematics via REST APIs, we let plant operators input standard parameters and receive immediate predictive optimization output.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { title: 'SimSight Ecosystem', desc: 'A proprietary web platform deployed for orchestrating massive parallel CFD simulations, tracking variants, and creating accessible asset characterizations.' },
              { title: 'Agentic AI Workflows', desc: 'Intelligent process assistants that autonomously navigate data lakes and physics simulations to recommend corrective operational actions.' },
              { title: 'Real-time Edge Deployment', desc: 'We compress high-fidelity ROMs (Reduced Order Models) and deploy them to edge devices for split-second latency during active manufacturing.' }
            ].map((app, i) => (
               <div key={i} style={{ background: '#242424', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h3 className="section-title" style={{ fontSize: '22px', color: '#fff', marginBottom: '15px' }}>{app.title}</h3>
                  <p className="section-desc" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{app.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--color-teal)', textAlign: 'center' }}>
        <div className="content-wrapper-lg">
           <h2 className="section-title" style={{ color: '#000', marginBottom: '20px' }}>Digitize Your Workflows</h2>
           <p className="section-desc" style={{ color: 'rgba(0,0,0,0.8)', maxWidth: '600px', margin: '0 auto 40px' }}>
              Discuss how a custom Smart App architecture can unlock the value of your proprietary workflows.
           </p>
           <Link href="/contact-us" style={{ display: 'inline-block', background: '#000', color: '#fff', padding: '15px 35px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
              Talk to our AI Team
           </Link>
        </div>
      </section>

    </main>
  );
}
