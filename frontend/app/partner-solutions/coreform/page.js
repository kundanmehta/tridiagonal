'use client';
import { useState } from 'react';
import Link from 'next/link';

function ArrowRight({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color} aria-hidden="true">
      <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59l-2.13-2.13a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
    </svg>
  );
}

const INDUSTRY_TABS = ['Aerospace & Defense', 'Automotive', 'Nuclear & Energy', 'Manufacturing'];

const indIco = (paths) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
);

const INDUSTRY_DATA = {
  'Aerospace & Defense': [
    { title: 'Structural Integrity', img: '/hubfs/coreform-aero-1.jpg', icon: indIco(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>), detail: 'Coreform Cubit and IGA are used for high-fidelity structural analysis of aerospace components. Isogeometric analysis (IGA) allows for exact geometry representation of complex aerofoil surfaces and structural frames, eliminating the errors introduced by traditional mesh approximations. This ensures superior accuracy in predicting stress concentrations, buckling, and fatigue life under extreme flight loads.' },
    { title: 'Advanced Meshing', img: '/hubfs/coreform-aero-2.jpg', icon: indIco(<><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 00 3 8v8a2 2 0 00 1 1.73l7 4a2 2 0 00 2 0l7-4A2 2 0 00 21 16z"/></>), detail: 'Coreform Cubit is the industry standard for hex-dominant meshing of complex aerospace assemblies. Its advanced geometry healing and decomposition tools allow engineers to prepare complex CAD models for simulation in a fraction of the time compared to traditional tools. Cubit supports the high-quality meshes required for non-linear structural analysis and high-speed CFD.' },
    { title: 'Propulsion Systems', img: '/hubfs/coreform-aero-3.jpg', icon: indIco(<><circle cx="12" cy="12" r="10"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></>), detail: 'Analyze the performance and durability of jet engines and rocket motors. Coreform IGA provides higher-order accuracy for modeling thin-walled structures and rotating components. By utilizing the same NURBS basis as CAD, IGA enables seamless design-to-analysis loops, allowing aerospace engineers to optimize turbine blade profiles and casing structures with unprecedented precision.' },
  ],
  'Automotive': [
    { title: 'Crashworthiness', img: '/hubfs/coreform-auto-1.jpg', icon: indIco(<><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></>), detail: 'Coreform IGA is revolutionizing automotive crash simulation by enabling direct analysis of CAD surfaces. Traditional FEA meshes often struggle with large deformations and self-contact in thin-shell structures; IGA handles these with superior robustness and accuracy. This allows automotive OEMs to better predict energy absorption and occupant safety while reducing the number of physical crash tests.' },
    { title: 'Vehicle Dynamics', img: '/hubfs/coreform-auto-2.jpg', icon: indIco(<><path d="M5 18H3a2 2 0 01-2-2V8a2 2 0 012-2h3.19M15 6h2.81A2 2 0 0120 7.38L21.38 11a2 2 0 01.05.46V16a2 2 0 01-2 2h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M14 6H9"/></>), detail: 'Optimize suspension components and chassis structures for weight and performance. Coreform Cubit provides the high-quality hexahedral meshes necessary for accurate vibration and durability analysis. Isogeometric analysis further enhances this by providing smoother stress fields and more accurate frequency responses, leading to quieter and more robust vehicle designs.' },
    { title: 'Electric Powertrains', img: '/hubfs/coreform-auto-3.jpg', icon: indIco(<><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>), detail: 'Model the structural and thermal behavior of EV battery enclosures and motor housings. Coreform tools enable efficient simulation of thin-walled cooling channels and complex structural ribs. IGA is particularly effective for modeling the thin laminations in electric motors, providing high-accuracy magnetic and structural analysis with significantly fewer degrees of freedom.' },
  ],
  'Nuclear & Energy': [
    { title: 'Reactor Pressure Vessels', img: '/hubfs/coreform-nuc-1.jpg', icon: indIco(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>), detail: 'Coreform Cubit and IGA are critical for the safety analysis of nuclear reactor components. IGA provides the exact geometry representation required for accurate stress intensity factor calculations in fracture mechanics. This ensures that reactor pressure vessels and piping systems can be monitored for structural health with the highest degree of confidence over their multi-decade service life.' },
    { title: 'Nuclear Fuel Modeling', img: '/hubfs/coreform-nuc-2.jpg', icon: indIco(<><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16v.01"/><path d="M8 12h8"/></>), detail: 'Simulate the thermomechanical behavior of nuclear fuel pins and assemblies. Coreform tools handle the complex contact problems and thermal expansion challenges associated with fuel-cladding interaction. IGA is particularly well-suited for these problems, as it provides higher-order continuity across element boundaries, resulting in more stable and accurate solutions for large-scale nuclear simulations.' },
    { title: 'Wind Turbine Optimization', img: '/hubfs/coreform-nuc-3.jpg', icon: indIco(<><circle cx="12" cy="12" r="2"/><path d="M12 2v8M12 14v8M2 12h8M14 12h8"/></>), detail: 'Improve the efficiency and lifespan of wind turbine blades through advanced structural modeling. Coreform IGA allows for precise modeling of composite layers and airfoil curvatures directly from CAD data. This leads to better predictions of aerodynamic loads and fatigue life, enabling the design of larger and more efficient turbines for renewable energy generation.' },
  ],
  'Manufacturing': [
    { title: 'Die & Mold Design', img: '/hubfs/coreform-mfg-1.jpg', icon: indIco(<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18"/><path d="M12 3v18"/></>), detail: 'Optimize the design of dies and molds for casting and forging. Coreform Cubit provides the hex-mesh quality required for accurate thermal and fluid simulation of the filling process. IGA further improves the analysis of die life by providing more accurate stress predictions at complex fillets and corners, helping manufacturers reduce tooling costs and production downtime.' },
    { title: 'Additive Manufacturing', img: '/hubfs/coreform-mfg-2.jpg', icon: indIco(<><path d="M4 18l6-6-6-6M20 12h-8"/></>), detail: 'Predict residual stresses and distortion in 3D-printed metal parts. Coreform IGA is uniquely suited for additive manufacturing simulation as it can represent the smooth surfaces of printed parts more accurately than traditional meshes. This allows for better "print-it-right-the-first-time" strategies, reducing material waste and post-processing requirements in advanced manufacturing workflows.' },
    { title: 'Industrial Equipment', img: '/hubfs/coreform-mfg-3.jpg', icon: indIco(<><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></>), detail: 'Enhance the performance and durability of industrial machinery. Whether it is pumps, valves, or heavy machinery, Coreform tools help engineers identify structural weaknesses and optimize weight. The direct CAD-to-simulation workflow of IGA significantly reduces the time from design concept to validated engineering solution, accelerating the product development cycle.' },
  ],
};

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #0a1628 0%, #1a2a4a 60%, #2a3a6e 100%)',
  'linear-gradient(135deg, #0e1e2e 0%, #1e2e52 60%, #2e3e78 100%)',
  'linear-gradient(135deg, #0a1a2a 0%, #1a3a6a 60%, #2a4a8a 100%)',
  'linear-gradient(135deg, #101828 0%, #203858 60%, #305888 100%)',
];

export default function CoreformPartnerPage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', industry: '', comments: '', privacy: false });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('Aerospace & Defense');
  const [modalItem, setModalItem] = useState(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
  };

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#1a1a1a' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        background: "url('/hubfs/Coreform%20Software%20Banner.png') center center / cover no-repeat",
        padding: '100px 0 80px',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,20,20,0.85)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/partner-solutions" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none', marginBottom: '32px' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-teal)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Partner Solutions
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, minWidth: '220px' }}>
              <img src="/hubfs/coreform-logo.png" alt="Coreform" style={{ height: '60px', width: 'auto', filter: 'brightness(10)', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
                Technology Partner
              </div>
              <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', lineHeight: 1.2, marginBottom: '16px' }}>
                Coreform
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '28px' }}>
                Next-Generation Finite Element Analysis Excellence
              </p>
              <button suppressHydrationWarning onClick={() => scrollTo('contact-us')} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--gradient-brand)', color: '#000',
                border: 'none', padding: '14px 32px', borderRadius: '40px',
                fontSize: '14px', fontWeight: '800', letterSpacing: '0.5px', cursor: 'pointer',
              }}>
                Talk to an Expert <ArrowRight size={16} color="#000" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section id="overview" style={{ padding: '80px 0', background: '#242424' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,480px), 1fr))', gap: '60px', alignItems: 'center', marginBottom: '72px' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '20px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Partnership Overview</span>
              </div>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', lineHeight: 1.25, marginBottom: '24px' }}>
                Pioneering <span className="gradient-text">Isogeometric Analysis</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.85', marginBottom: '20px' }}>
                Coreform develops next-generation computer-aided engineering (CAE) software based on isogeometric analysis (IGA) — a revolutionary technology that bridges the gap between CAD geometry and finite element analysis.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.85' }}>
                As a certified Coreform partner, Tridiagonal helps engineering organisations adopt Coreform Cubit and Coreform IGA solver for high-accuracy structural, thermal, and fluid simulations with dramatically reduced pre-processing time.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)',
              padding: '56px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center'
            }}>
              <img src="/hubfs/coreform-logo.png" alt="Coreform" style={{ height: '60px', filter: 'brightness(10)' }} />
              <div style={{ width: '48px', height: '2px', background: 'var(--gradient-brand)', borderRadius: '2px' }} />
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', fontStyle: 'italic' }}>Strategic Technology Partner</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Meshing', 'IGA Solver', 'Structural FEA', 'Advanced CAE'].map((tag, i) => (
                  <span key={i} style={{ background: 'rgba(71,188,135,0.1)', border: '1px solid rgba(71,188,135,0.2)', color: 'var(--color-teal)', fontSize: '12px', fontWeight: '600', padding: '4px 12px', borderRadius: '30px' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(71,188,135,0.06) 0%, rgba(50,50,150,0.04) 100%)',
            border: '1px solid rgba(71,188,135,0.15)', borderRadius: '24px', padding: '48px', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--gradient-brand)' }} />
            <h3 style={{ color: '#fff', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: '800', lineHeight: 1.3, marginBottom: '20px' }}>CAD-to-Simulation Excellence</h3>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '16px', lineHeight: '1.85', margin: 0 }}>
              Use the same mathematical representations for both design and simulation. Coreform allows engineers to eliminate time-consuming mesh generation and geometry approximation errors, delivering superior accuracy with fewer degrees of freedom.
            </p>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES SECTION ── */}
      <section id="industries" style={{ padding: '80px 0', background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <style dangerouslySetInnerHTML={{ __html: `
            .ind-tabs-wrap { display: flex; gap: 0; margin-bottom: 40px; border-bottom: 2px solid rgba(255,255,255,0.06); overflow-x: auto; }
            .ind-tab-btn { position: relative; padding: 14px 28px; background: none; border: none; color: rgba(255,255,255,0.5); font-size: 15px; font-weight: 600; cursor: pointer; transition: color 0.2s; white-space: nowrap; }
            .ind-tab-btn.active { color: var(--color-teal); }
            .ind-tab-btn.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: var(--color-teal); }
            .ind-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
            .ind-card { background: #242424; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; overflow: hidden; transition: transform 0.3s; display: flex; flex-direction: column; }
            .ind-card:hover { transform: translateY(-5px); border-color: var(--color-teal); }
            .ind-card-imgfb { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; position: relative; }
            .ind-card-body { padding: 24px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
            .ind-vm-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 22px; border: none; border-radius: 8px; background: var(--gradient-brand); color: #000; font-size: 13px; font-weight: 800; cursor: pointer; transition: opacity 0.2s; width: fit-content; margin-top: auto; }
            .ind-vm-btn:hover { opacity: 0.85; }

            .spov { position: fixed; inset: 0; z-index: 10000; background: #0f0f0f; overflow-y: auto; animation: spovIn 0.3s ease; }
            @keyframes spovIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
            .spov-nav { position: sticky; top:0; z-index:20; height:64px; display:flex; align-items:center; justify-content:space-between; padding:0 48px; background:rgba(15,15,15,0.92); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.05); }
            .spov-back { display:inline-flex; align-items:center; gap:8px; background:none; border:none; color:rgba(255,255,255,0.5); font-size:14px; font-weight:600; cursor:pointer; }
            .spov-x { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.65); display:flex; align-items:center; justify-content:center; cursor:pointer; }
            .spov-hero { position:relative; width:100%; height:210px; overflow:hidden; display:flex; align-items:flex-end; }
            .spov-hero-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
            .spov-hero-grad { position:absolute; inset:0; background:linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.5) 100%); }
            .spov-hero-text { position:relative; z-index:2; width:100%; margin:0 auto; padding:0 48px 48px; }
            .spov-wrap { margin:0 auto; padding:48px 48px 80px; }
            .spov-cols { display:grid; grid-template-columns:1fr 320px; gap:28px; align-items:start; }
            .spov-card { background:#1a1a1a; border:1px solid rgba(255,255,255,0.06); border-radius:16px; padding:28px; }
            .spov-side-card { background:#1a1a1a; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:22px; }
            .spov-cta-link { display:inline-flex; align-items:center; justify-content:center; gap:8px; background:var(--gradient-brand); color:#000; padding:13px 24px; border-radius:40px; font-size:14px; font-weight:800; text-decoration:none; width:100%; }
            @media (max-width:900px) { .ind-grid { grid-template-columns: 1fr 1fr; } .spov-cols { grid-template-columns:1fr; } .spov-hero { height:180px; } }
            @media (max-width:600px) { .ind-grid { grid-template-columns: 1fr; } }
          ` }} />

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Industries Served</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: '800' }}>Advanced Simulation for <span className="gradient-text">Complex Engineering</span></h2>
          </div>

          <div className="ind-tabs-wrap">
            {INDUSTRY_TABS.map(tab => (
              <button suppressHydrationWarning key={tab} className={`ind-tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>

          <div className="ind-grid">
            {INDUSTRY_DATA[activeTab].map((item, i) => (
              <div key={`${activeTab}-${i}`} className="ind-card">
                <div className="ind-card-imgfb" style={{ background: CARD_GRADIENTS[i % CARD_GRADIENTS.length] }}>
                   {item.img && <img src={item.img} alt={item.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />}
                  <div style={{ position: 'relative', zIndex: 1 }}>{item.icon}</div>
                </div>
                <div className="ind-card-body">
                  <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', lineHeight: 1.4, margin: 0 }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.65', flex: 1, margin: 0 }}>{item.detail.substring(0, 100)}...</p>
                  <button suppressHydrationWarning className="ind-vm-btn" onClick={() => setModalItem({ ...item, cardIndex: i })}>View More →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalItem && (
        <div className="spov">
          <nav className="spov-nav">
            <button className="spov-back" onClick={() => setModalItem(null)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back to Industries
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '11px', fontWeight: '700', letterSpacing: '1px' }}>{activeTab}</span>
              <button className="spov-x" onClick={() => setModalItem(null)}>✕</button>
            </div>
          </nav>
          <div className="spov-hero" style={{ background: CARD_GRADIENTS[(modalItem.cardIndex ?? 0) % CARD_GRADIENTS.length] }}>
            {modalItem.img && <img className="spov-hero-img" src={modalItem.img} alt={modalItem.title} onError={e => e.target.style.display = 'none'} />}
            <div className="spov-hero-grad" />
            <div className="spov-hero-text">
              <h1 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: '900', margin: 0 }}>{modalItem.title}</h1>
            </div>
          </div>
          <div className="spov-wrap">
            <div className="spov-cols">
              <div className="spov-main">
                <div className="spov-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                    <div style={{ width: '3px', height: '20px', background: 'var(--gradient-brand)', borderRadius: '2px' }} />
                    <span style={{ color: 'var(--color-teal)', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px' }}>CAPABILITY OVERVIEW</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '16px', lineHeight: '1.9' }}>{modalItem.detail}</p>
                </div>
              </div>
              <div className="spov-side">
                <div className="spov-side-card" style={{ background: 'linear-gradient(135deg, rgba(71,188,135,0.07) 0%, rgba(71,188,135,0.02) 100%)', border: '1px solid rgba(71,188,135,0.14)' }}>
                  <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Talk to an Expert</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: '1.6', marginBottom: '18px' }}>Discover how Coreform Cubit and IGA can transform your FEA workflows.</p>
                  <Link href={`/contact-us?service=${encodeURIComponent(modalItem.title)}&partner=coreform&industry=${encodeURIComponent(activeTab)}`} className="spov-cta-link" onClick={() => setModalItem(null)}>Talk to an Expert <ArrowRight size={14} color="#000" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT FORM ── */}
      <section id="contact-us" style={{ padding: '80px 0', background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <style dangerouslySetInnerHTML={{ __html: `
            .cf-form-card { padding: 40px; }
            .cf-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
            @media (max-width: 900px) {
              .cf-form-card { padding: 24px; }
            }
            @media (max-width: 600px) {
              .cf-form-row { grid-template-columns: 1fr; }
            }
          ` }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,460px),1fr))', gap: '60px', alignItems: 'center' }}>
            {/* Left */}
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '20px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Contact Us</span>
              </div>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: '800', marginBottom: '20px', lineHeight: 1.3 }}>
                Schedule a Call Today!
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', fontSize: '16px' }}>
                Uncover how our capabilities can propel your organization forward. Provide your focus areas, and we will deliver tailored solutions designed to meet your unique objectives.
              </p>
            </div>

            {/* Form */}
            <div className="cf-form-card" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
                  <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Thank You!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>Our Coreform team will reach out to you within 48 hours.</p>
                </div>
              ) : (
                <form suppressHydrationWarning onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="cf-form-row">
                    <div>
                      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>First Name *</label>
                      <input suppressHydrationWarning required placeholder="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Last Name *</label>
                      <input suppressHydrationWarning required placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Email *</label>
                    <input suppressHydrationWarning required type="email" placeholder="Corporate Email ID" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Contact Number</label>
                    <input suppressHydrationWarning placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Company Name *</label>
                    <input suppressHydrationWarning required placeholder="Company Name" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Interested In</label>
                    <select suppressHydrationWarning value={formData.industry} onChange={e => setFormData({ ...formData, industry: e.target.value })}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: formData.industry ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: '14px', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}>
                      <option value="">Please Select</option>
                      <option>Coreform Cubit</option>
                      <option>Coreform IGA Solver</option>
                      <option>Software Trial</option>
                      <option>Consulting Services</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Comments / Questions</label>
                    <textarea suppressHydrationWarning rows={3} placeholder="Tell us about your project..." value={formData.comments} onChange={e => setFormData({ ...formData, comments: e.target.value })}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <input suppressHydrationWarning type="checkbox" id="coreform-privacy" required checked={formData.privacy} onChange={e => setFormData({ ...formData, privacy: e.target.checked })} style={{ marginTop: '3px', accentColor: 'var(--color-teal)', flexShrink: 0 }} />
                    <label htmlFor="coreform-privacy" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', lineHeight: '1.6', cursor: 'pointer' }}>
                      I agree to receive communications from Tridiagonal. <Link href="/privacy-policy" style={{ color: 'var(--color-teal)' }}>Read our privacy policy</Link>
                    </label>
                  </div>
                  <button suppressHydrationWarning type="submit"
                    style={{ background: 'var(--gradient-brand)', color: '#000', border: 'none', padding: '14px 32px', borderRadius: '40px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', width: 'fit-content' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Submit <ArrowRight size={16} color="#000" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
