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



const INDUSTRY_TABS = ['Oil and Gas', 'Process Industry', 'Pharma & Medical', 'Marine'];

const indIco = (paths) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
);

const INDUSTRY_DATA = {
  'Oil and Gas': [
    { title: 'Downhole Tools & Wellbore Operations', img: '/hubfs/oil-gas-1.jpg', icon: indIco(<><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></>), detail: 'Our simulation capabilities for downhole tools and wellbore operations encompass thermal-hydraulic modeling, drill string dynamics, and fluid-structure interaction analysis. Using Simcenter STAR-CCM+ and Simcenter 3D, we analyze complex downhole environments including high-pressure/high-temperature (HPHT) conditions, erosion patterns in tubulars, and multiphase flow in well completions to optimize tool performance and extend operational life.' },
    { title: 'Flow Assurance & Subsea', img: '/hubfs/oil-gas-2.jpg', icon: indIco(<><path d="M2 12c2-4 6-4 8 0s6 4 8 0"/><path d="M2 6c2-4 6-4 8 0s6 4 8 0"/><path d="M2 18c2-4 6-4 8 0s6 4 8 0"/></>), detail: 'Flow assurance simulation addresses hydrate formation, wax deposition, slugging, and corrosion in subsea pipelines and risers. We leverage Simcenter Amesim and STAR-CCM+ to model multiphase flow regimes, predict pressure drops across complex subsea architectures, and ensure reliable production from wellhead to topside processing facilities under varying thermal and hydraulic conditions.' },
    { title: 'Marine and Offshore', img: '/hubfs/oil-gas-3.jpg', icon: indIco(<><path d="M2 20l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2"/><path d="M4 16V8a2 2 0 012-2h12a2 2 0 012 2v8"/><path d="M12 6V2"/></>), detail: 'Our marine and offshore simulation expertise covers vessel hydrodynamics, structural integrity analysis of platforms, mooring system design, and environmental load assessment. Using Simcenter 3D and STAR-CCM+, we predict wave-structure interaction, vortex-induced motion, green water events, and fatigue life of critical offshore components to ensure safe and efficient operations.' },
    { title: 'Process & Separation', img: '/hubfs/oil-gas-4.jpg', icon: indIco(<><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 12h18"/><path d="M12 3v18"/><circle cx="7.5" cy="7.5" r="1.5"/><circle cx="16.5" cy="16.5" r="1.5"/></>), detail: 'Simulation of separation processes including distillation, absorption, extraction, and membrane separation is critical for process efficiency. We use Simcenter STAR-CCM+ to model multiphase separators, cyclones, and coalescers, predicting droplet behavior, phase separation efficiency, and residence time distributions to optimize equipment design and reduce energy consumption.' },
    { title: 'Process Safety', img: '/hubfs/oil-gas-5.jpg', icon: indIco(<><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>), detail: 'Process safety simulation encompasses fire and explosion modeling, gas dispersion analysis, relief valve sizing, and consequence assessment. We employ Simcenter STAR-CCM+ for CFD-based fire and explosion overpressure prediction, toxic gas dispersion modeling, and thermal radiation analysis to ensure facility designs meet safety standards and minimize risk to personnel and the environment.' },
    { title: 'Transportation & Refining', img: '/hubfs/oil-gas-6.jpg', icon: indIco(<><path d="M5 18H3a2 2 0 01-2-2V8a2 2 0 012-2h3.19M15 6h2.81A2 2 0 0120 7.38L21.38 11a2 2 0 01.05.46V16a2 2 0 01-2 2h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M14 6H9"/></>), detail: 'Our simulation services for transportation and refining cover pipeline flow analysis, heat exchanger design, reactor modeling, and crude processing optimization. Using Simcenter FLOMASTER for piping networks and STAR-CCM+ for detailed equipment-level CFD, we help refineries and pipeline operators improve throughput, reduce fouling, and optimize energy integration across their facilities.' },
  ],
  'Process Industry': [
    { title: 'Chemical Processing', img: '/hubfs/process-1.jpg', icon: indIco(<><path d="M10 2v7.527a2 2 0 01-.211.896L4.72 20.19a1 1 0 00.87 1.487h12.82a1 1 0 00.87-1.487l-5.069-9.767A2 2 0 0114 9.527V2"/><path d="M8.5 2h7"/></>), detail: 'Chemical processing simulation covers reactor design, mixing optimization, heat and mass transfer in chemical equipment, and process intensification. We use Simcenter STAR-CCM+ for detailed CFD modeling of stirred reactors, static mixers, and fluidized beds, predicting species concentrations, temperature distributions, and reaction kinetics to optimize yield and selectivity in chemical manufacturing.' },
    { title: 'Mixing & Reactor Design', img: '/hubfs/process-2.jpg', icon: indIco(<><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/><path d="M7 7l10 10"/></>), detail: 'Our mixing and reactor design capabilities include impeller selection and optimization, residence time distribution analysis, scale-up prediction, and gas-liquid dispersion modeling. Using Simcenter STAR-CCM+, we simulate complex multiphase reactor environments to predict mixing quality, power consumption, and heat transfer rates for batch, semi-batch, and continuous reactor configurations.' },
    { title: 'Heat Transfer Equipment', img: '/hubfs/process-3.jpg', icon: indIco(<><path d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z"/></>), detail: 'Simulation of heat transfer equipment — including shell-and-tube exchangers, plate heat exchangers, air-cooled condensers, and fired heaters — enables optimization of thermal performance and fouling management. We use Simcenter STAR-CCM+ and Simcenter FLOEFD to analyze detailed thermal-hydraulic behavior, predict fouling patterns, and optimize baffle arrangements and tube layouts.' },
    { title: 'Power Generation', img: '/hubfs/process-4.jpg', icon: indIco(<><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>), detail: 'Power generation simulation addresses boiler combustion optimization, turbine aerodynamics, cooling tower performance, and balance-of-plant analysis. We leverage Simcenter STAR-CCM+ for combustion and emissions prediction, Simcenter 3D for structural and fatigue analysis of rotating equipment, and Simcenter Amesim for plant-level system simulation to maximize efficiency and availability.' },
    { title: 'Water Treatment', img: '/hubfs/process-5.jpg', icon: indIco(<><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></>), detail: 'Water treatment simulation encompasses sedimentation tank design, membrane filtration modeling, UV disinfection analysis, and aeration system optimization. Using Simcenter STAR-CCM+, we model particle settling, biofilm growth, chemical dosing and mixing, and hydraulic performance of treatment units to help operators meet effluent quality targets while minimizing energy and chemical consumption.' },
    { title: 'HVAC & Building Systems', img: '/hubfs/process-6.jpg', icon: indIco(<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>), detail: 'HVAC and building systems simulation covers airflow distribution, thermal comfort prediction, contaminant dispersion, and energy performance analysis. We use Simcenter STAR-CCM+ for detailed room-level CFD and Simcenter FLOEFD for electronics thermal management to optimize ventilation effectiveness, indoor air quality, and energy consumption in commercial, industrial, and cleanroom environments.' },
  ],
  'Pharma & Medical': [
    { title: 'Drug Delivery Systems', img: '/hubfs/pharma-1.jpg', icon: indIco(<><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/></>), detail: 'Drug delivery simulation covers inhaler design, nasal spray characterization, transdermal patch analysis, and injection system optimization. We use Simcenter STAR-CCM+ to model aerosol particle deposition in respiratory tracts, spray breakup and evaporation dynamics, and drug release kinetics from controlled-release formulations to ensure consistent and effective drug delivery to target sites.' },
    { title: 'Bioprocess Engineering', img: '/hubfs/pharma-2.jpg', icon: indIco(<><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>), detail: 'Bioprocess engineering simulation addresses bioreactor design, cell culture optimization, fermentation modeling, and downstream processing. Using Simcenter STAR-CCM+, we predict oxygen transfer rates, shear stress distributions on sensitive cell cultures, mixing patterns in large-scale bioreactors, and temperature control to maximize yield and product quality in pharmaceutical and biotech manufacturing.' },
    { title: 'Medical Devices', img: '/hubfs/pharma-3.jpg', icon: indIco(<><path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3"/><path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4"/></>), detail: 'Medical device simulation encompasses blood flow analysis in cardiovascular devices, structural analysis of implants, drug-eluting stent optimization, and ventilator design. We leverage Simcenter STAR-CCM+ for hemodynamic CFD, Simcenter 3D for structural biomechanics, and Simcenter Amesim for physiological system modeling to support regulatory submissions and accelerate device development.' },
    { title: 'Cleanroom Design', img: '/hubfs/pharma-4.jpg', icon: indIco(<><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>), detail: 'Cleanroom simulation addresses airflow pattern analysis (unidirectional and turbulent), particle contamination prediction, temperature and humidity control, and pressurization strategy optimization. Using Simcenter STAR-CCM+, we model air change effectiveness, particle deposition risks near critical process zones, and filter performance to ensure compliance with ISO 14644 classification requirements.' },
    { title: 'Pharmaceutical Manufacturing', img: '/hubfs/pharma-5.jpg', icon: indIco(<><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></>), detail: 'Pharmaceutical manufacturing simulation covers tablet coating, granulation, spray drying, lyophilization, and continuous manufacturing processes. We use Simcenter STAR-CCM+ for detailed CFD analysis of powder flow in fluid bed equipment, droplet drying in spray dryers, and coating uniformity in pan coaters to optimize process parameters and ensure product quality compliance with FDA/EMA requirements.' },
    { title: 'Sterilization & Validation', img: '/hubfs/pharma-6.jpg', icon: indIco(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>), detail: 'Sterilization simulation addresses autoclave thermal mapping, EtO gas distribution, radiation dose prediction, and aseptic process validation. Using Simcenter STAR-CCM+ and Simcenter FLOEFD, we model temperature uniformity in steam sterilizers, gas concentration distributions in EtO chambers, and UV dose calculations to support equipment qualification and process validation for GMP compliance.' },
  ],
  'Marine': [
    { title: 'Ship Hydrodynamics', img: '/hubfs/marine-1.jpg', icon: indIco(<><path d="M2 20l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2"/><path d="M4 16V8a2 2 0 012-2h12a2 2 0 012 2v8"/><line x1="12" y1="6" x2="12" y2="2"/></>), detail: 'Ship hydrodynamics simulation covers hull resistance prediction, propeller design optimization, seakeeping analysis, and maneuvering performance evaluation. We use Simcenter STAR-CCM+ with advanced free-surface modeling to predict drag, wave patterns, and propulsive efficiency for vessel designs ranging from tankers and container ships to high-speed craft and offshore support vessels.' },
    { title: 'Propulsion Systems', img: '/hubfs/marine-2.jpg', icon: indIco(<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></>), detail: 'Propulsion system simulation addresses propeller cavitation prediction, waterjet design, podded drive optimization, and engine cooling analysis. Using Simcenter STAR-CCM+ for detailed blade-level CFD and Simcenter Amesim for system-level powertrain modeling, we optimize propulsive efficiency, minimize underwater radiated noise, and ensure compliance with emission regulations for marine diesel and LNG propulsion systems.' },
    { title: 'Offshore Structures', img: '/hubfs/marine-3.jpg', icon: indIco(<><rect x="3" y="8" width="18" height="14" rx="2"/><path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></>), detail: 'Offshore structure simulation covers jacket and topside structural analysis, foundation pile design, wave and current loading prediction, and fatigue life assessment. We leverage Simcenter 3D for finite element structural analysis, Simcenter STAR-CCM+ for wave-structure interaction CFD, and combined approaches for VIV (vortex-induced vibration) analysis of risers and conductors in deepwater environments.' },
    { title: 'Naval Architecture', img: '/hubfs/marine-4.jpg', icon: indIco(<><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>), detail: 'Naval architecture simulation encompasses stability analysis, structural longitudinal strength assessment, compartment flooding modeling, and operational envelope optimization. Using Simcenter 3D and STAR-CCM+, we support classification society compliance, damage stability assessments, and lifetime structural monitoring solutions to ensure vessels meet IMO, SOLAS, and class requirements throughout their service life.' },
    { title: 'Port & Harbor Design', img: '/hubfs/marine-5.jpg', icon: indIco(<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>), detail: 'Port and harbor simulation addresses wave propagation, sediment transport, dredging optimization, and berth operability assessment. We use Simcenter STAR-CCM+ to model complex wave-current interactions, predict siltation patterns in navigation channels, and assess vessel motion at berth to optimize breakwater layouts, fairway alignments, and port infrastructure for safe and efficient operations.' },
    { title: 'Underwater Systems', img: '/hubfs/marine-6.jpg', icon: indIco(<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></>), detail: 'Underwater systems simulation covers AUV/ROV hydrodynamics, sonar array performance, umbilical dynamics, and deep-sea equipment thermal management. Using Simcenter STAR-CCM+ for external flow CFD and Simcenter Amesim for control system modeling, we optimize vehicle drag, maneuverability, and endurance for underwater inspection, survey, and intervention operations in challenging deep-sea environments.' },
  ],
};

/* ── fallback gradient when image is missing ── */
const CARD_GRADIENTS = [
  'linear-gradient(135deg, #0a1628 0%, #122640 60%, #1a3a5e 100%)',
  'linear-gradient(135deg, #0e1e2e 0%, #162e42 60%, #1e4058 100%)',
  'linear-gradient(135deg, #0a1a2a 0%, #14304a 60%, #1e465a 100%)',
  'linear-gradient(135deg, #101828 0%, #1a2c44 60%, #24405e 100%)',
  'linear-gradient(135deg, #0c1a26 0%, #162a3e 60%, #203c54 100%)',
  'linear-gradient(135deg, #0e1e30 0%, #182e48 60%, #22405e 100%)',
];

export default function SiemensPartnerPage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', industry: '', comments: '', privacy: false });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('Oil and Gas');
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
        background: "url('/hubfs/Partner%20Solutions%20Siemens%20Banner.png') center center / cover no-repeat",
        padding: '100px 0 80px',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,20,20,0.88)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/partner-solutions" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '14px', textDecoration: 'none', marginBottom: '32px' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-teal)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Partner Solutions
          </Link>

          <div className="pd-hero-flex" style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <div className="pd-logo-box" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2137 100%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, minWidth: '220px' }}>
              <img src="/hubfs/siemens-logo.png" alt="Siemens" style={{ height: '60px', width: 'auto', filter: 'brightness(10)', objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ color: 'var(--color-teal)', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
                Technology Partner
              </div>
              <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', lineHeight: 1.2, marginBottom: '16px' }}>
                Siemens Digital Industries
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '28px' }}>
                Simulation &amp; Digital Twin Excellence
              </p>
              <button suppressHydrationWarning onClick={() => scrollTo('contact-us')} style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--gradient-brand)', color: '#000',
                border: 'none', padding: '14px 32px', borderRadius: '40px',
                fontSize: '14px', fontWeight: '800', letterSpacing: '0.5px', cursor: 'pointer',
              }}>
                Schedule a Call <ArrowRight size={16} color="#000" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section
        id="overview"
        style={{ padding: '80px 0', background: '#242424' }}
      >
        <div className="content-wrapper-lg">

          {/* Block 1 — Strategic Partnership */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,480px), 1fr))', gap: '60px', alignItems: 'center', marginBottom: '72px' }}>
            <div>
              <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '20px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Strategic Partnership</span>
              </div>
              <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', lineHeight: 1.25, marginBottom: '24px' }}>
                Powering Process Industries with <span className="gradient-text">Siemens Simcenter</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.85', marginBottom: '24px' }}>
                Siemens and Tridiagonal Solutions are now into a strategic partnership to co-develop process industry verticals — primarily Oil &amp; Energy, Pharma, Food, Specialty Chemicals, Metals &amp; Materials — to provide state-of-the-art solutions to customers in their digital transformation journey.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.85' }}>
                Tridiagonal brings its entire CFD domain experience to empower industries in identifying and deploying the latest simulation techniques with Siemens Digital Solution offerings.
              </p>
            </div>

            {/* Logo feature card */}
            <div style={{
              background: 'linear-gradient(135deg, #0a1628 0%, #0d2137 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '56px 40px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '20px', textAlign: 'center',
            }}>
              <img src="/hubfs/siemens-logo.png" alt="Siemens" style={{ height: '60px', filter: 'brightness(10)', objectFit: 'contain' }} />
              <div style={{ width: '48px', height: '2px', background: 'var(--gradient-brand)', borderRadius: '2px' }} />
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', fontStyle: 'italic', lineHeight: '1.6', maxWidth: '300px' }}>
                Ingenuity for Life
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
                {['Oil & Energy', 'Pharma', 'Chemicals', 'Metals'].map((tag, i) => (
                  <span key={i} style={{ background: 'rgba(71,188,135,0.1)', border: '1px solid rgba(71,188,135,0.2)', color: 'var(--color-teal)', fontSize: '12px', fontWeight: '600', padding: '4px 12px', borderRadius: '30px' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Block 2 — Simcenter Description */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(71,188,135,0.06) 0%, rgba(0,153,153,0.04) 100%)',
            border: '1px solid rgba(71,188,135,0.15)',
            borderRadius: '24px',
            padding: '48px',
            marginBottom: '72px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--gradient-brand)', borderRadius: '4px 0 0 4px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '48px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/>
                  </svg>
                  <span style={{ color: 'var(--color-teal)', fontSize: '14px', fontWeight: '700', letterSpacing: '0.5px' }}>Simcenter</span>
                </div>
                <h3 style={{ color: '#fff', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: '800', lineHeight: 1.3, marginBottom: '0' }}>
                  Engineer Innovation Faster &amp; With Greater Confidence
                </h3>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '16px', lineHeight: '1.85' }}>
                We help our customers avoid risk and gain a competitive edge by offering them a complete environment to effectively optimize the performance of complex products throughout the lifecycle, starting from the early stages. Simcenter allows engineers to generate a set of ultra-realistic, multi-physics models and data that can predict real product behavior — essential to the holistic digital twin. Using Simcenter, manufacturers engineer innovation into their products faster and with greater confidence.
              </p>
            </div>
          </div>

          {/* Block 3 — Comprehensive Solutions Portfolio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
              <div style={{ width: '40px', height: '3px', background: 'var(--gradient-brand)', borderRadius: '2px', flexShrink: 0 }} />
              <h3 style={{ color: '#fff', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: '800' }}>
                Delivering a Comprehensive Solutions Portfolio
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))', gap: '24px' }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.85' }}>
                The strength of Simcenter is in both the excellence of its individual components and the synergies that can be achieved by combining them. Physical testing, multidisciplinary computer-aided engineering (CAE), computational fluid dynamics (CFD), and powerful multi-physics system simulation solutions are long-time industry-leading applications.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.85' }}>
                Simcenter solutions merge these elements with robust design exploration and data analytics, managed within a product lifecycle management (PLM) context powered by Teamcenter — giving your organisation a true end-to-end digital thread.
              </p>
            </div>
          </div>

        </div>
      </section>



      {/* ── INDUSTRIES SECTION ── */}
      <section id="industries" style={{ padding: '80px 0', background: '#242424' }}>
        <div className="content-wrapper-lg">
          <style dangerouslySetInnerHTML={{ __html: `
            .ind-tabs-wrap { display: flex; gap: 0; margin-bottom: 48px; border-bottom: 2px solid rgba(255,255,255,0.06); overflow-x: auto; -webkit-overflow-scrolling: touch; }
            .ind-tab-btn { position: relative; padding: 14px 28px; background: none; border: none; color: rgba(255,255,255,0.5); font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: color 0.25s; }
            .ind-tab-btn:hover { color: rgba(255,255,255,0.85); }
            .ind-tab-btn.active { color: var(--color-teal); }
            .ind-tab-btn.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: var(--color-teal); border-radius: 2px 2px 0 0; }
            .ind-grid2 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
            @media (max-width: 900px) { .ind-grid2 { grid-template-columns: repeat(2, 1fr); } .ind-tab-btn { padding: 12px 20px; font-size: 14px; } }
            @media (max-width: 560px) { .ind-grid2 { grid-template-columns: 1fr; } }
            .ind-card2 { background: #1a1a1a; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; overflow: hidden; transition: transform 0.3s ease, border-color 0.3s ease; display: flex; flex-direction: column; }
            .ind-card2:hover { transform: translateY(-4px); border-color: rgba(71,188,135,0.25); }
            .ind-card2-imgfb { width: 100%; height: 180px; display: flex; align-items: center; justify-content: center; position: relative; }
            .ind-card2-body { padding: 24px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
            .ind-vm-btn {
              display: inline-flex; align-items: center; gap: 7px; padding: 10px 22px;
              border: none; border-radius: 8px; cursor: pointer; transition: all 0.25s;
              width: fit-content; margin-top: auto;
              background: var(--gradient-brand); color: #0a0a0a;
              font-size: 13px; font-weight: 800; letter-spacing: 0.3px;
            }
            .ind-vm-btn:hover { opacity: 0.88; transform: translateY(-1px); }
            /* ── Service Page Overlay ── */
            .spov { position: fixed; inset: 0; z-index: 10000; background: #0f0f0f; overflow-y: auto; animation: spovIn 0.3s cubic-bezier(0.22,1,0.36,1); }
            @keyframes spovIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
            .spov-nav { position: sticky; top:0; z-index:20; height:64px; display:flex; align-items:center; justify-content:space-between; padding:0 48px; background:rgba(15,15,15,0.92); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.05); }
            .spov-back { display:inline-flex; align-items:center; gap:8px; background:none; border:none; color:rgba(255,255,255,0.5); font-size:14px; font-weight:600; cursor:pointer; transition:color 0.2s; padding:0; }
            .spov-back:hover { color:#fff; }
            .spov-x { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.65); font-size:15px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s; }
            .spov-x:hover { background:rgba(255,255,255,0.14); color:#fff; }
            .spov-hero { position:relative; width:100%; height:210px; overflow:hidden; display:flex; align-items:flex-end; }
            .spov-hero-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
            .spov-hero-grad { position:absolute; inset:0; background:linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.5) 55%, rgba(15,15,15,0.08) 100%); }
            .spov-hero-text { position:relative; z-index:2; width:100%; margin:0 auto; padding:0 48px 48px; }
            .spov-wrap { margin:0 auto; padding:48px 48px 80px; }
            .spov-cols { display:grid; grid-template-columns:1fr 320px; gap:28px; align-items:start; }
            .spov-main { display:flex; flex-direction:column; gap:20px; }
            .spov-side { display:flex; flex-direction:column; gap:16px; position:sticky; top:84px; }
            .spov-card { background:#1a1a1a; border:1px solid rgba(255,255,255,0.06); border-radius:16px; padding:28px; }
            .spov-side-card { background:#1a1a1a; border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:22px; }
            .spov-cta-link { display:inline-flex; align-items:center; justify-content:center; gap:8px; background:var(--gradient-brand); color:#000; padding:13px 24px; border-radius:40px; font-size:14px; font-weight:800; letter-spacing:0.3px; text-decoration:none; transition:all 0.25s; width:100%; }
            .spov-cta-link:hover { opacity:0.86; transform:translateY(-1px); }
            @media (max-width:900px) { .spov-cols { grid-template-columns:1fr; } .spov-side { position:static; } .spov-hero { height:260px; } .spov-hero-text,.spov-wrap { padding-left:24px; padding-right:24px; } .spov-nav { padding:0 20px; } }
          ` }} />

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(71,188,135,0.1)', padding: '4px 14px', borderRadius: '20px', marginBottom: '20px' }}>
              <span style={{ color: 'var(--color-teal)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Industries We Serve</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: '800', lineHeight: 1.25 }}>
              Simulation Solutions Across <span className="gradient-text">Key Industries</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="ind-tabs-wrap">
            {INDUSTRY_TABS.map(tab => (
              <button suppressHydrationWarning key={tab} className={`ind-tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>

          {/* Grid */}
          <div className="ind-grid2">
            {INDUSTRY_DATA[activeTab].map((item, i) => (
              <div key={`${activeTab}-${i}`} className="ind-card2">
                {/* Card Image */}
                <div className="ind-card2-imgfb" style={{ background: CARD_GRADIENTS[i % CARD_GRADIENTS.length] }}>
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <div style={{ position: 'relative', zIndex: 1 }}>{item.icon}</div>
                </div>
                {/* Card Body */}
                <div className="ind-card2-body">
                  <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', lineHeight: 1.4, margin: 0 }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.65', flex: 1, margin: 0 }}>
                    {item.detail.substring(0, 110)}...
                  </p>
                  <button suppressHydrationWarning className="ind-vm-btn" onClick={() => setModalItem({ ...item, cardIndex: i })}>
                    View More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE PAGE OVERLAY ── */}
      {modalItem && (
        <div className="spov">

          {/* Sticky Nav */}
          <nav className="spov-nav">
            <button className="spov-back" onClick={() => setModalItem(null)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back to Industries
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ background: 'rgba(71,188,135,0.08)', border: '1px solid rgba(71,188,135,0.15)', padding: '4px 14px', borderRadius: '20px', color: 'var(--color-teal)', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{activeTab}</span>
              <button className="spov-x" onClick={() => setModalItem(null)}>✕</button>
            </div>
          </nav>

          {/* Full-Width Hero */}
          <div className="spov-hero" style={{ background: CARD_GRADIENTS[(modalItem.cardIndex ?? 0) % CARD_GRADIENTS.length] }}>
            {modalItem.img && (
              <img className="spov-hero-img" src={modalItem.img} alt={modalItem.title}
                onError={e => { e.target.style.display = 'none'; }}
              />
            )}
            <div className="spov-hero-grad" />
            <div className="spov-hero-text">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(71,188,135,0.12)', border: '1px solid rgba(71,188,135,0.2)', borderRadius: '20px', padding: '5px 14px', marginBottom: '16px' }}>
                <span style={{ color: 'var(--color-teal)', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>{activeTab} · Simulation Solution</span>
              </div>
              <h1 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '900', lineHeight: 1.2, margin: 0, textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}>
                {modalItem.title}
              </h1>
            </div>
          </div>

          {/* Two-column Content */}
          <div className="spov-wrap">
            <div className="spov-cols">

              {/* Main */}
              <div className="spov-main">
                {/* Overview */}
                <div className="spov-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                    <div style={{ width: '3px', height: '20px', background: 'var(--gradient-brand)', borderRadius: '2px', flexShrink: 0 }} />
                    <span style={{ color: 'var(--color-teal)', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Overview</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '16px', lineHeight: '1.9', margin: 0 }}>
                    {modalItem.detail}
                  </p>
                </div>

                {/* Siemens Tools */}
                <div className="spov-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                    <div style={{ width: '3px', height: '20px', background: 'var(--gradient-brand)', borderRadius: '2px', flexShrink: 0 }} />
                    <span style={{ color: 'var(--color-teal)', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Siemens Tools Applied</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {['Simcenter STAR-CCM+', 'Simcenter 3D', 'Simcenter Amesim', 'Simcenter FLOEFD', 'FLOMASTER'].map(t => (
                      <span key={t} style={{ padding: '7px 16px', borderRadius: '30px', background: 'rgba(71,188,135,0.07)', border: '1px solid rgba(71,188,135,0.15)', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="spov-side">
                {/* Icon + Name */}
                <div className="spov-side-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(71,188,135,0.15), rgba(71,188,135,0.04))', border: '1px solid rgba(71,188,135,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {modalItem.icon}
                  </div>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Capability</div>
                    <div style={{ color: '#fff', fontSize: '13px', fontWeight: '700', lineHeight: 1.35 }}>{modalItem.title}</div>
                  </div>
                </div>

                {/* Partner */}
                <div className="spov-side-card">
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Powered By</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--color-teal)', borderRadius: '50%' }} />
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontWeight: '600' }}>Siemens Simcenter Suite</span>
                  </div>
                </div>

                {/* CTA box */}
                <div className="spov-side-card" style={{ background: 'linear-gradient(135deg, rgba(71,188,135,0.07) 0%, rgba(71,188,135,0.02) 100%)', border: '1px solid rgba(71,188,135,0.14)' }}>
                  <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Interested in this solution?</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: '1.6', marginBottom: '18px' }}>
                    Our experts will design a simulation approach tailored to your engineering goals.
                  </p>
                  <Link
                    href={`/contact-us?service=${encodeURIComponent(modalItem.title)}&partner=siemens&industry=${encodeURIComponent(activeTab)}`}
                    className="spov-cta-link"
                    onClick={() => setModalItem(null)}
                  >
                    Contact Us <ArrowRight size={14} color="#000" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ── CONTACT FORM ── */}
      {/* ── CONTACT FORM ── */}
      <section id="contact-us" style={{ padding: '80px 0', background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <style dangerouslySetInnerHTML={{ __html: `
            .siemens-form-card { padding: 40px; }
            .siemens-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
            @media (max-width: 900px) {
              .siemens-form-card { padding: 24px; }
            }
            @media (max-width: 600px) {
              .siemens-form-row { grid-template-columns: 1fr; }
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
            <div className="siemens-form-card" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
                  <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Thank You!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>Our Siemens team will reach out to you within 48 hours.</p>
                </div>
              ) : (
                <form suppressHydrationWarning onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="siemens-form-row">
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
                      <option>Simcenter STAR-CCM+ (CFD)</option>
                      <option>Simcenter 3D (FEA)</option>
                      <option>Simcenter FLOEFD</option>
                      <option>Simcenter Amesim</option>
                      <option>Simcenter FLOMASTER</option>
                      <option>Software Training</option>
                      <option>Consulting Services</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Comments / Questions</label>
                    <textarea suppressHydrationWarning rows={3} placeholder="Tell us about your project..." value={formData.comments} onChange={e => setFormData({ ...formData, comments: e.target.value })}
                      style={{ width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '11px 14px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <input suppressHydrationWarning type="checkbox" id="siemens-privacy" required checked={formData.privacy} onChange={e => setFormData({ ...formData, privacy: e.target.checked })} style={{ marginTop: '3px', accentColor: 'var(--color-teal)', flexShrink: 0 }} />
                    <label htmlFor="siemens-privacy" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', lineHeight: '1.6', cursor: 'pointer' }}>
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
