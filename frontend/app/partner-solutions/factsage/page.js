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

const INDUSTRY_TABS = ['Metals & Steel', 'Mining & Minerals', 'Cement & Ceramics', 'Process Industry'];

const indIco = (paths) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
);

const INDUSTRY_DATA = {
  'Metals & Steel': [
    { title: 'Steelmaking & Refining', img: '/hubfs/factsage-metals-1.jpg', icon: indIco(<><path d="M7 11v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8"/><path d="M21 11v8a1 1 0 01-1 1h-2a1 1 0 01-1-1v-8"/><path d="M11 11l1-8 1 8"/><path d="M9 11h6"/></>), detail: 'FactSage is widely used to model complex steelmaking processes including BOF, EAF, and secondary refining (LF, VD, RH). It helps in predicting slag-metal-gas equilibria, carbon and alloy oxidation, and the formation of non-metallic inclusions. By optimizing slag chemistry and temperature, manufacturers can improve steel cleanliness, yield, and energy efficiency while reducing refractory wear.' },
    { title: 'Slag Design & Optimization', img: '/hubfs/factsage-metals-2.jpg', icon: indIco(<><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>), detail: 'Advanced thermodynamic modeling allows for the custom design of slag systems for specific metallurgical tasks. FactSage predicts slag viscosity, liquidus temperature, and capacity for impurity removal (sulfur, phosphorus). Optimizing slag chemistry is critical for protecting refractories and ensuring smooth process operations in blast furnaces and refining units.' },
    { title: 'Alloy Development', img: '/hubfs/factsage-metals-3.jpg', icon: indIco(<><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>), detail: 'Develop new high-performance alloys by predicting phase stability, solidification paths (Scheil-Gulliver), and precipitation behavior. FactSage enables engineers to simulate heat treatment cycles and predict the microstructural evolution of steels, aluminum alloys, and superalloys across a wide range of temperatures and compositions.' },
  ],
  'Mining & Minerals': [
    { title: 'Smelting & Roasting', img: '/hubfs/factsage-mining-1.jpg', icon: indIco(<><path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M4.93 19.07l2.83-2.83M12 18v4M16.24 16.24l2.83 2.83M18 12h4M16.24 7.76l2.83-2.83"/></>), detail: 'Optimize non-ferrous smelting (Copper, Nickel, Lead, Zinc) and roasting processes. FactSage modeIs the complex interactions between sulfide concentrates, fluxes, and furnace gases to maximize metal recovery and control off-gas composition. It accounts for the distribution of minor elements (precious metals, impurities) across matte, slag, and gas phases.' },
    { title: 'Hydrometallurgy', img: '/hubfs/factsage-mining-2.jpg', icon: indIco(<><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></>), detail: 'Apply thermodynamic equilibrium to aqueous systems for leaching, solvent extraction, and precipitation. FactSage models pH-dependent solubility, complexation, and redox reactions, helping mineral processors optimize reagent consumption and metal extraction efficiency while minimizing environmental impact from tailing discharge.' },
    { title: 'Rare Earth Extraction', img: '/hubfs/factsage-mining-3.jpg', icon: indIco(<><path d="M12 2v20M2 12h20"/><path d="M12 2L2 12l10 10 10-10L12 2z"/></>), detail: 'FactSage supports the complex Separation and purification of rare earth elements (REE). It models the thermodynamic behavior of REE oxides, chlorides, and fluorides in various processing media, enabling the design of efficient extraction circuits for high-purity rare earth products essential for modern technologies.' },
  ],
  'Cement & Ceramics': [
    { title: 'Clinker Formation', img: '/hubfs/factsage-cement-1.jpg', icon: indIco(<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18"/><path d="M12 3v18"/></>), detail: 'Model the chemical reactions inside the cement kiln to predict clinker mineralogy (Alite, Belite, etc.) as a function of raw meal composition and firing temperature. FactSage helps in optimizing fuel mixes (including alternative fuels), managing alkali/sulfur/chlorine cycles, and reducing the carbon footprint of cement production by enabling lower clinker-to-cement ratios.' },
    { title: 'Refractory Interaction', img: '/hubfs/factsage-cement-2.jpg', icon: indIco(<><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 00 3 8v8a2 2 0 00 1 1.73l7 4a2 2 0 00 2 0l7-4A2 2 0 00 21 16z"/></>), detail: 'Simulate the thermochemical interaction between process slags/melts and kiln refractories (Mag-Chrome, Alumina, etc.). FactSage predicts the formation of infiltration layers, chemical corrosion, and thermal shock vulnerability, helping operators select the best refractory materials for extended campaign life and reduced maintenance downtime.' },
    { title: 'Advanced Ceramics', img: '/hubfs/factsage-cement-3.jpg', icon: indIco(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>), detail: 'Design and optimize processing of high-performance technical ceramics. Model sintering behavior, phase stability of multicomponent oxides, nitrides, and carbides, and the effects of sintering aids. FactSage provides critical data for producing ceramics with tailored thermal, mechanical, and electrical properties for aerospace and industrial applications.' },
  ],
  'Process Industry': [
    { title: 'Combustion & Gasification', img: '/hubfs/factsage-process-1.jpg', icon: indIco(<><path d="M12 2c0 2.5 1 5 5 5 .5 0 1 .1 1.5.3 1 4-2 7.5-3 8.5-.1-.7-.4-1.2-.8-1.5-.7-.5-1.5-.6-2.2-.6-.7 0-1.5.1-2.2.6-.4.3-.7.8-.8 1.5-1-1-4-4.5-3-8.5.5-.2 1-.3 1.5-.3 4 0 5-2.5 5-5z"/></>), detail: 'Model high-temperature combustion and gasification of coal, biomass, and waste streams. FactSage predicts flue gas composition, adiabatic flame temperature, sulfur and ash behavior (slagging/fouling), and pollutant formation (NOx, SOx). This enables the design of cleaner and more efficient energy conversion systems and chemical feedstocks.' },
    { title: 'Corrosion & Oxidation', img: '/hubfs/factsage-process-2.jpg', icon: indIco(<><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>), detail: 'Predict high-高温 corrosion of materials in aggressive process environments. FactSage models gas-solid and liquid-solid interactions, stable scale formation, and internal oxidation/sulfidation. It helps in materials selection and life prediction for boiler tubes, turbine blades, and chemical reactor components operating under extreme conditions.' },
    { title: 'Glass & Glass-Ceramics', img: '/hubfs/factsage-process-3.jpg', icon: indIco(<><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>), detail: 'Optimize glass melting and forming processes. FactSage models phase transformations, liquidus and working temperatures, and the behavior of refining agents. It supports the development of new glass formulations and glass-ceramics by predicting crystallization behavior and chemical durability across multicomponent systems.' },
  ],
};

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #0a1628 0%, #122640 60%, #1a3a5e 100%)',
  'linear-gradient(135deg, #0e1e2e 0%, #162e42 60%, #1e4058 100%)',
  'linear-gradient(135deg, #0a1a2a 0%, #14304a 60%, #1e465a 100%)',
  'linear-gradient(135deg, #101828 0%, #1a2c44 60%, #24405e 100%)',
];

export default function FactSagePartnerPage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', industry: '', comments: '', privacy: false });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('Metals & Steel');
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
        background: "url('/hubfs/FactSage%20Software%20Banner.png') center center / cover no-repeat",
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
            <div style={{ background: 'linear-gradient(135deg, #0a1a4a 0%, #0c1a2e 100%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, minWidth: '220px' }}>
              <img src="/hubfs/factsage-logo.png" alt="FactSage" style={{ height: '60px', width: 'auto', filter: 'brightness(10)', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
                Technology Partner
              </div>
              <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', lineHeight: 1.2, marginBottom: '16px' }}>
                FactSage
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '28px' }}>
                Thermodynamic Simulation Software Excellence
              </p>
              <button suppressHydrationWarning onClick={() => scrollTo('contact-us')} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--gradient-brand)', color: '#000',
                border: 'none', padding: '14px 32px', borderRadius: '40px',
                fontSize: '14px', fontWeight: '800', letterSpacing: '0.5px', cursor: 'pointer',
              }}>
                Request a Demo <ArrowRight size={16} color="#000" />
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
                Leading the World in <span className="gradient-text">Thermodynamic Simulation</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.85', marginBottom: '20px' }}>
                FactSage is the world&apos;s largest fully integrated thermodynamic database computing system, developed through decades of collaboration between GTT-Technologies and CRCT. It is the gold standard for high-temperature process simulation across metals, ceramics, and mineral processing.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.85' }}>
                Tridiagonal Solutions is the authorized distributor and consulting partner for FactSage in India and APAC. We empower organizations to leverage thermodynamic data for process innovation, efficiency gains, and environmental compliance.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #0a1a4a 0%, #0c1a2e 100%)',
              borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)',
              padding: '56px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center'
            }}>
              <img src="/hubfs/factsage-logo.png" alt="FactSage" style={{ height: '60px', filter: 'brightness(10)' }} />
              <div style={{ width: '48px', height: '2px', background: 'var(--gradient-brand)', borderRadius: '2px' }} />
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', fontStyle: 'italic' }}>Authorized Distributor &amp; Partner</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Database Suite', 'Metals', 'Slags', 'Process Simulation'].map((tag, i) => (
                  <span key={i} style={{ background: 'rgba(71,188,135,0.1)', border: '1px solid rgba(71,188,135,0.2)', color: 'var(--color-teal)', fontSize: '12px', fontWeight: '600', padding: '4px 12px', borderRadius: '30px' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(71,188,135,0.06) 0%, rgba(0,100,200,0.04) 100%)',
            border: '1px solid rgba(71,188,135,0.15)', borderRadius: '24px', padding: '48px', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--gradient-brand)' }} />
            <h3 style={{ color: '#fff', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: '800', lineHeight: 1.3, marginBottom: '20px' }}>Comprehensive Database Solutions</h3>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '16px', lineHeight: '1.85', margin: 0 }}>
              FactSage merges physical testing, multi-physics CAE, and system simulation with robust design exploration. It provides reliable data that predicts real chemical behavior — essential for any holistic process digital twin in the materials processing industry.
            </p>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES SECTION ── */}
      <section id="industries" style={{ padding: '80px 0', background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <style dangerouslySetInnerHTML={{ __html: `
            .ind-tabs-wrap { display: flex; gap: 0; margin-bottom: 40px; border-bottom: 2px solid rgba(255,255,255,0.06); }
            .ind-tab-btn { position: relative; padding: 14px 28px; background: none; border: none; color: rgba(255,255,255,0.5); font-size: 15px; font-weight: 600; cursor: pointer; transition: color 0.2s; }
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
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: '800' }}>Thermodynamic Solutions for <span className="gradient-text">Global Markets</span></h2>
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
                    <span style={{ color: 'var(--color-teal)', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px' }}>OVERVIEW</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '16px', lineHeight: '1.9' }}>{modalItem.detail}</p>
                </div>
              </div>
              <div className="spov-side">
                <div className="spov-side-card" style={{ background: 'linear-gradient(135deg, rgba(71,188,135,0.07) 0%, rgba(71,188,135,0.02) 100%)', border: '1px solid rgba(71,188,135,0.14)' }}>
                  <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Request a Demo</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: '1.6', marginBottom: '18px' }}>Explore how FactSage thermodynamic simulation can optimize your process.</p>
                  <Link href={`/contact-us?service=${encodeURIComponent(modalItem.title)}&partner=factsage&industry=${encodeURIComponent(activeTab)}`} className="spov-cta-link" onClick={() => setModalItem(null)}>Request Demo <ArrowRight size={14} color="#000" /></Link>
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
            .fs-form-card { padding: 40px; }
            .fs-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
            @media (max-width: 900px) {
              .fs-form-card { padding: 24px; }
            }
            @media (max-width: 600px) {
              .fs-form-row { grid-template-columns: 1fr; }
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
            <div className="fs-form-card" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
                  <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Thank You!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>Our FactSage team will reach out to you within 48 hours.</p>
                </div>
              ) : (
                <form suppressHydrationWarning onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="fs-form-row">
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
                      <option>FactSage Demo</option>
                      <option>Software Licensing</option>
                      <option>Training Workshops</option>
                      <option>Consulting Projects</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Comments / Questions</label>
                    <textarea suppressHydrationWarning rows={3} placeholder="Tell us about your project..." value={formData.comments} onChange={e => setFormData({ ...formData, comments: e.target.value })}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <input suppressHydrationWarning type="checkbox" id="factsage-privacy" required checked={formData.privacy} onChange={e => setFormData({ ...formData, privacy: e.target.checked })} style={{ marginTop: '3px', accentColor: 'var(--color-teal)', flexShrink: 0 }} />
                    <label htmlFor="factsage-privacy" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', lineHeight: '1.6', cursor: 'pointer' }}>
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
