'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Static Counter ─── */
function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function Counter({ value, suffix = '+', prefix = '', label }) {
  const displayValue = typeof value === 'number' ? formatNumber(value) : value;
  return (
    <div className="counter-item" style={{ textAlign: 'left' }}>
      <div style={{ width: '24px', height: '2px', background: 'var(--color-teal)', marginBottom: '12px' }}></div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', justifyContent: 'flex-start', marginBottom: '8px' }}>
        {prefix && <span style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '500', lineHeight: 1 }}>{prefix}</span>}
        <span className="counter-number" style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '500', lineHeight: 1 }}>{displayValue}</span>
        <span className="counter-suffix" style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '500', lineHeight: 1 }}>{suffix}</span>
      </div>
      <p className="counter-label" style={{ color: '#fff', fontSize: '15px', lineHeight: 1.5, marginTop: 0 }}>{label}</p>
    </div>
  );
}

/* ─── LEADER CARD COMPONENT ─── */
function LeaderCard({ leader, onClick }) {
  return (
    <div className="leader-card-new" style={{
      background: '#1c1c1c',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      height: '100%',
    }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'var(--color-teal)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
      
      {/* Top Image Banner */}
      <div style={{ width: '100%', height: '240px', background: 'var(--gradient-brand)', position: 'relative' }}>
        {leader.image ? (
           <img src={leader.image} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        ) : (
           <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '64px', fontWeight: 'bold' }}>
              {leader.name.charAt(0)}
           </div>
        )}
      </div>
      
      {/* Card Body */}
      <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>{leader.name}</h3>
        <div style={{ color: 'var(--color-teal)', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '15px' }}>{leader.role}</div>
        
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.6, flex: 1, marginBottom: '20px' }}>
          {leader.desc.substring(0, 100).trim()}...
        </p>

        {/* Footer: Social + Read More */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
           <a href={leader.linkedin || '#'} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: '#fff', transition: 'background 0.2s', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.background='var(--color-teal)'} onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
               <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
             </svg>
           </a>
           <button onClick={onClick} style={{ background: 'transparent', border: '1px solid var(--color-teal)', color: '#fff', padding: '8px 20px', borderRadius: '24px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background='var(--color-teal)'; e.currentTarget.style.color='#000'; }} onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#fff'; }}>
             Read More
           </button>
        </div>
      </div>
    </div>
  );
}

const leadershipTeam = [
  { name: 'Pravin Jain', role: 'Chairman', linkedin: '#', image: '/hubfs/Pravin Jain.webp', desc: 'Pravin has proven his expertise in creating, positioning and managing high-growth companies. Mr. Jain has completed his Bachelors in Computer Engineering from University of Mumbai and Masters in Computer System Engineering from Northeastern University, Boston. He has also completed the Executive Program for Growing Companies at Stanford University Graduate School of Business. He has over 25 years of experience in Technology Entrepreneurship, Business Development and Delivery of Customer-Centric Solutions. Pravin’s experience includes acquiring as well as divesting companies. Pravin lived and worked for 14 years in the US, and shifted back to India in the summer of 2006. He has driven and been accountable for Sales, Marketing, Technology, Delivery and Strategy functions at his previous ventures.' },
  { name: 'Ashish Kulkarni', role: 'Vice President and BU Head (Advanced Modeling and Simulation)', linkedin: '#', image: '/hubfs/Ashish Kulkarni.webp', desc: 'Ashish is one of the founding members of Tridiagonal. He holds Post graduate degree in Fluid Mechanics and Thermal Sciences from IIT, Kanpur. At Tridiagonal, Ashish has played several roles including setting up CFD consulting team, Leading the software development group, Establishing OpenFOAM based solver, Operating as Business Unit Head, etc... His technical interests include Turbulence Modeling, Simulation Data Management and Developing Digital Twins. Ashish is an expert at building team of Engineers. Hiring, Training, Mentoring and Grooming young engineers to deliver high end engineering solutions is his forte. Ashish has followed his passion to develop around 500 CAE engineers over last twenty four years.' },
  { name: 'Dr. Damodaran Vedapuri', role: 'Head – North American Operations', linkedin: '#', image: '/hubfs/Dr. Damodaran Vedapuri.webp', desc: 'Dr. Damo Vedapuri is the Head of North American Operations at Tridiagonal Solutions. He has 20 years of experience in solving a wide range of fluid flow problems in the Oil and Gas industry. Some of his core focus areas are Erosion, Erosion – Corrosion, Sand Management, and Slurry Multiphase Flow. Dr. Damo has graduated from the Institute of Corrosion and Multiphase Technology at Ohio University with a Ph.D. degree in Chemical Engineering. He is a member of SPE and actively publishes his group’s research in SPE, OTC, NACE and BHR conferences.' }
];

const coreTeam = [
  { name: 'Dr. Jatin Agarwal', role: 'Program Director, Experimental Fluid Dynamics', linkedin: '#', image: '/hubfs/Dr. Jatin Agarwal.webp', desc: 'Dr. Jatin is working as Program Director and technical lead with 14+ years of experience for large scale production enhancement R&D projects (paraffin deposition, asphaltene deposition, multi-phase flow, simulation). He holds a Ph.D. degree in Petroleum Engineering from PDEU and Masters Degree from University of Tulsa. During his tenure at PDPU, he was instrumental in establishing state of art Drilling, Cementing and Stimulation Research Center and Enhanced Oil Recovery Consultancy Group for catering the needs of local as well as global E&P companies. He has presented several conference papers and published several journal articles in reputed conferences and journals. He has also authored a book named Offshore Operations and Engineering with CRC press of Taylor and Francis group.' },
  { name: 'Dr. Mothivel Mummudi', role: 'Global Director (Pharma) and Product Head, SimSight', linkedin: '#', image: '/hubfs/Dr. Mothivel Mummudi.webp', desc: 'Dr. Mothivel Mummudi has spent his entire professional career building advanced mathematical models for unit operations in the pharma, bio-pharma, chemicals and food industry segments. At Tridiagonal Software, he leads the development of SimSight, Tridiagonal\'s Advanced Analytics Platform based on computational data. Mothivel and the SimSight product team is driven by a strong commitment to the democratization of knowledge derived from synthetic data (i.e. data from computational models).' },
  { name: 'Dr. Gopal Kasat', role: 'Global Director-Mixing Science', linkedin: '#', image: '/hubfs/Dr. Gopal Kasat.webp', desc: 'Gopal is the Global Director-Mixing Science at Tridiagonal Software. He has a Ph.D. in Chemical Engineering from ICT, Mumbai. Gopal is also product manager for the MixIT Software. He has 20+ years of experience in scale-up/scale-down, batch & continuous mixing, computational fluid dynamics, training and mentoring, along with architecting computational solutions for chemical and process industries. Prior to Tridiagonal, Gopal worked at HyCa Technologies where he looked after development of hydrodynamic cavitaion systems for water treatment.' },
  { name: 'Nagesh Joshi', role: 'Practice Head Modeling and Simulation', linkedin: '#', image: '/hubfs/Nagesh Joshi.webp', desc: 'Nagesh has Masters degree in Mechanical Engineering with 20 years of experience in CFD and FEA modeling. He started his career with Atlascopoc as a Project Lead for Modeling and simulations. For the last 16 years, he has been working with Tridiagonal in different capacities. Currently, he is heading Modeling and simulations group.' },
  { name: 'Tukaram Suryavanshi', role: 'Head – Process Consulting', linkedin: '#', image: '/hubfs/Tukaram Suryavanshi.webp', desc: 'Tukaram Suryawanshi holds Masters in Chemical Engineering from IISc Bangalore. As head of Process Consulting services at Tridiagonal, he specilizes in the field of Advanced Modelling & Simulations using CFD, DEM, Mathematical Modelling. He has 18+ years of experience in applying the simulation services to Chemical Process, Pharmaceuticals, Food & Beverages, Medical Devices, FMCG Industries. Prior to Tridiagonal he has worked in Honeywell (Process Simulations & MES), Infosys (Engineering Services), Johnson Controls (Residential Heaters) He has publications in the international journals, conferences and patents from the work experience.' },
  { name: 'Apeksha Jadhav', role: 'HR Head', linkedin: '#', image: '/hubfs/Apeksha Jadhav.webp', desc: 'Apeksha Jadhav holds an Master Degree in Personnel Management from Pune University and certificate in Advance Human Resource Management from IIM, Indore. She is a seasoned Human Resource Business Partner with over 18 years of experience in Human Resource Management. As HR Head at Tridiagonal, she is pivotal in aligning HR functions with business objectives and enhancing employee engagement. Apeksha excels in performance management, talent sourcing, and grievance handling, demonstrating her ability to balance organizational goals with employee needs. Her career trajectory includes significant roles at Software services and Product based companies, where she spearheaded HR initiatives and managed comprehensive recruitment processes. Apeksha has successfully led HR programs that foster a positive and productive work environment. Apeksha\'s expertise extends to organizing competency-based training programs, overseeing the entire employee life cycle, and ensuring smooth HR support across business units. Her hands-on experience in designing and implementing HR policies has been instrumental in driving organizational growth and employee satisfaction.' },
  { name: 'Hrushikesh Abhyankar', role: 'CFO', linkedin: '#', image: '/hubfs/Hrushikesh Abhyankar.webp', desc: 'Hrushikesh Abhyankar is CMA with more than 15 years of experience. He has worked with MNCs and Leading Corporates in the areas of Strategic Planning, Fund Management, Accounts, Auditing, QMS and Statutory Compliance. At present, Hrushikesh is serving as Head-Finance for Tridiagonal Group with high focus on strategic planning and designing internal control systems. Exceptional negotiation skills, relationship management and abilities in liaising with Banks, financing agencies are some of his key attributes. Hrushikesh is a Financial Enthusiast adept at budgeting, forecasting, planning, reporting etc for making strategic business decisions contributing to overall growth of Tridiagonal.' }
];

const atAGlanceData = [
  {
    title: 'Our Vision',
    text: 'To create and deliver ‘Value’ to our customers by harnessing the power of technology and high performing teams',
    image: '/hubfs/vision.webp'
  },
  {
    title: 'Values',
    text: 'We strive to innovate with integrity, always putting the needs of our customers and partners first. Through relentless curiosity and a commitment to excellence, we aim to be a catalyst for bringing change and create value for everyone.',
    image: '/hubfs/values.webp'
  },
  {
    title: 'Commitment',
    text: 'At Tridiagonal Solutions, we are committed to pushing the boundaries of technology to drive innovation and deliver value. Our mission is to create solutions that not only meet the needs of today but also anticipate the challenges of tomorrow. We are dedicated to sustainability, diversity, and ethical practices, ensuring that our impact on all the stakeholders involved is a positive one. Together, we strive to make a difference and empower people to achieve more.',
    image: '/hubfs/Commitment.webp'
  }
];

export default function AboutUs() {
  const [statsRef, statsInView] = useInView(0.1);
  const [timelineRef, timelineInView] = useInView(0.1);
  const [selectedLeader, setSelectedLeader] = useState(null);

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'url(/images/about-hero-bg.png) center center / cover no-repeat, #242424',
          minHeight: 'auto',
          padding: '80px 0 60px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26, 26, 26, 0.85)' }} />
        <div
          className="content-wrapper-lg"
          style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
        >
          <h1
            className="hero-title fade-in-up"
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '15px',
            }}
          >
            Delivering Process <span className="gradient-text">Excellence</span>
          </h1>
          <p
            className="hero-desc fade-in-up delay-200"
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '18px',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Technology catalyst to provide operations excellence with combination of skillsets and advanced technologies.
          </p>
        </div>
      </section>

      {/* INTRODUCTION & CREDENTIALS */}
      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ marginBottom: '80px', width: '100%', maxWidth: '100%' }}>
            <p className="section-desc" style={{ color: '#fff', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px', maxWidth: '100%', width: '100%' }}>
              Tridiagonal Solutions Pvt. Ltd. is a consulting company, providing solutions to the process industry verticals like Oil & Gas, Lifesciences / Pharma, F&B, Chemicals, Metals & Mining, Cement, Power, etc. As a first company incubated out of national chemical laboratory (NCL), Pune (india) under the leadership of <strong>Dr. Vivek Ranade</strong>, we have been focusing on application of advanced technologies to address process related challenges.
            </p>
            <p className="section-desc" style={{ color: '#fff', fontSize: '16px', lineHeight: 1.8, maxWidth: '100%', width: '100%' }}>
              With a strong Process R&D background, and combination of skill sets (100+ persons - Domain Engg. / SMEs, Modeling & Simulation, Data Scientists, Data Engineers, Application engineers), we support process development, central modeling teams, process technologist, digital and plant operations teams with our breadth and depth of services and solutions. We have delivered &gt;2000+ consulting projects into modeling & simulation, process optimization, advanced analytics, energy optimization, flow assurance and mechanical integrity testing, etc. We serve fortune 500, 100 customers in various industries with flexible engagement models and have built center of excellence (COE&apos;s) to support customers large programs.
            </p>
          </div>

          <div ref={statsRef}>
            <h2 className="section-title" style={{ color: '#fff', fontSize: '36px', marginBottom: '40px', fontWeight: '700' }}>Our Credentials</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              {[
                { num: '500+', text: 'Customers globally' },
                { num: '2000+', text: 'Projects delivered using multiple technologies' },
                { num: '100+M $', text: 'Savings realized by our customers' },
                { num: '300+', text: 'Multi-domain / Industry consultants with diverse technology know-how' },
                { num: '15+', text: 'Technology Solutions Partnerships' },
                { num: '250,000+ Sq.ft', text: 'Experiments set-up for new technology testing' },
                { num: '10+', text: "Center of Excellence (COE's) for various customers/ partners" },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'linear-gradient(145deg, #242424, #1a1a1a)',
                  borderRadius: '16px',
                  padding: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderTop: '3px solid var(--color-teal)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  transition: 'transform 0.3s'
                }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                  <div style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '700', lineHeight: 1, textShadow: '0 2px 10px rgba(71, 188, 135, 0.2)' }}>
                    {item.num}
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: 1.6, fontWeight: '500' }}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AT A GLANCE SECTION */}
      <section className="section-pad" style={{ background: '#111', position: 'relative' }}>
        <div className="content-wrapper-lg">
          <h2 className="section-title" style={{ color: '#fff', fontSize: '40px', fontWeight: '700', textAlign: 'center', marginBottom: '80px' }}>
            Tridiagonal Solutions at a <span className="gradient-text">glance</span>
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {atAGlanceData.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '50px', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
                
                {/* Image Block */}
                <div style={{ flex: 1, minWidth: '320px', height: '400px', borderRadius: '30px', background: 'linear-gradient(135deg, rgba(71, 188, 135, 0.2), transparent)', padding: '10px', position: 'relative' }}>
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '20px', background: '#1c1c1c',
                    backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                     {/* Fallback pattern if image is not loaded */}
                     <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '24px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
                       {item.title} Image
                     </span>
                  </div>
                </div>

                {/* Text Block */}
                <div style={{ flex: 1, minWidth: '320px' }}>
                  <h3 style={{ fontSize: '36px', color: '#fff', fontWeight: '700', marginBottom: '25px', lineHeight: 1.2 }}>
                    {item.title}
                  </h3>
                  <div style={{ width: '60px', height: '4px', background: 'var(--gradient-brand)', marginBottom: '25px', borderRadius: '2px' }}></div>
                  <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.8 }}>
                    {item.text}
                  </p>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP TEAM */}
      <section id="our-team" className="section-pad" style={{ background: '#1c1c1c' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: '#fff', fontSize: '40px', fontWeight: '700' }}>
              Our Leadership Team
            </h2>
            <p className="section-desc" style={{ color: 'var(--color-teal)', margin: '0 auto' }}>Empowering Excellence, Inspiring Growth.</p>
          </div>

          <div className="leaders-grid-new">
            {leadershipTeam.map((leader, i) => (
              <LeaderCard key={i} leader={leader} onClick={() => setSelectedLeader(leader)} />
            ))}
          </div>
        </div>
      </section>

      {/* CORE TEAM */}
      <section className="section-pad" style={{ background: '#242424' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title" style={{ color: '#fff', fontSize: '40px', fontWeight: '700' }}>
              Core Team
            </h2>
            <p className="section-desc" style={{ color: 'var(--color-teal)', margin: '0 auto' }}>Delivering Value to the Customers</p>
          </div>

          <div className="leaders-grid-new">
            {coreTeam.map((leader, i) => (
              <LeaderCard key={i} leader={leader} onClick={() => setSelectedLeader(leader)} />
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP MODAL */}
      {selectedLeader && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }} onClick={() => setSelectedLeader(null)}>
          <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '40px', maxWidth: '800px', width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedLeader(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '32px', cursor: 'pointer', zIndex: 10 }}>×</button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start' }}>
                <div style={{ width: '220px', height: '280px', borderRadius: '16px', background: 'var(--gradient-brand)', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
                  {selectedLeader.image ? (
                    <img src={selectedLeader.image} alt={selectedLeader.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '72px', fontWeight: 'bold' }}>
                      {selectedLeader.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                  <h3 style={{ color: '#fff', fontSize: '36px', fontWeight: '700', marginBottom: '8px', lineHeight: 1.2 }}>{selectedLeader.name}</h3>
                  <div style={{ color: 'var(--color-teal)', fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '20px' }}>{selectedLeader.role}</div>
                  
                  <a href={selectedLeader.linkedin || '#'} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '30px', background: '#0077b5', color: '#fff', fontWeight: '600', fontSize: '14px', textDecoration: 'none', transition: 'background 0.2s', marginBottom: '30px' }} onMouseEnter={e => e.currentTarget.style.background='#006097'} onMouseLeave={e => e.currentTarget.style.background='#0077b5'}>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                     </svg>
                     LinkedIn Profile
                  </a>
                  
                  <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', lineHeight: 1.8 }}>
                    {selectedLeader.desc}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
      
      {/* TIMELINE / EVOLUTION - simplified for now */}
      <section ref={timelineRef} className="section-pad" style={{ background: '#1a1a1a' }}>
         <div className="content-wrapper-lg">
            <h2 className="section-title" style={{ textAlign: 'center', color: '#fff', marginBottom: '60px' }}>Tridiagonal Solutions Evolution</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
               {[
                 { year: '2006', text: 'First company incubated out of CSIR-National Chemical Laboratory, Pune (India) under the leadership of Dr. Vivek Ranade.' },
                 { year: '2008', text: 'Established Advanced Modeling & Simulation group (Computational Fluid Dynamics, Discrete Element Modeling, Mathematical Modeling, Hybrid Modeling, etc.)' },
                 { year: '2010', text: 'Established center of excellence for flow assurance studies for Oil & Gas, mechanical integrity testing, new energy testing (TRL 3- TRL 9)' },
                 { year: '2012', text: 'Developed CFD solver for Mixing analysis of stirred tanks' },
                 { year: '2013', text: 'Launched industry’s first mixing analysis solution - MixIT with CFD solver for mixing analysis for stirred tanks' },
                 { year: '2015', text: 'Plugging and abandonment contract for large E&P company' },
                 { year: '2018', text: 'Established Manufacturing excellence and Digital Transformation group to provide process manufacturing digital solutions' },
                 { year: '2022', text: 'Launched simulation knowledge management solution – Simsight for extracting value our of simulations' },
                 { year: '2023', text: 'Established Center of excellence for various technology solution providers (Honeywell, Emerson, Yokogawa, Aveva, etc.)' },
                 { year: '2024', text: 'New energy testing (TRL 3- TRL 9) set-up for CCUS. Unveiling Our New Brand Identity.' },
                 { year: '2025', text: 'Tridiagonal.ai: A Domain-driven AI Company Transforming Industrial Operations' },
               ].map((item, i) => (
                 <div className="timeline-row" key={i} style={{ opacity: timelineInView ? 1 : 0, transform: timelineInView ? 'translateX(0)' : 'translateX(-20px)', transition: `all 0.5s ease ${i * 0.1}s` }}>
                    <div className="year-text" style={{ color: 'var(--color-teal)', fontSize: '28px', fontWeight: 'bold' }}>{item.year}</div>
                    
                    <div className="timeline-divider" style={{ display: 'flex', alignItems: 'center', height: '34px' }}>
                       <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-teal)', flexShrink: 0 }}></div>
                       <div className="timeline-horizontal-line" style={{ height: '2px', width: '100%', background: 'rgba(255,255,255,0.1)' }}></div>
                    </div>

                    <div className="desc-text" style={{ color: '#fff', fontSize: '18px', lineHeight: 1.6, paddingTop: '3px' }}>{item.text}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* ============================================================
          TRUSTED PARTNER BANNER
          ============================================================ */}
      <section
        aria-label="Trusted Partner"
        style={{
          padding: '40px 30px',
          background: '#0f0f0f',
        }}
      >
        <div
          style={{
            borderRadius: '40px',
            overflow: 'hidden',
            backgroundImage: 'url("/hubfs/topography-bg.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#1a1a1a',
            position: 'relative',
            padding: '110px 40px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'rgb(15 15 15 / 0%)' }} aria-hidden="true" />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '755px', margin: '0 auto' }}>
            <h2 className="section-title" style={{ color: '#fff', fontSize: '45px', fontWeight: '700', lineHeight: 1.25, marginBottom: '24px' }}>
              Looking for a <span className="gradient-text">Trusted Partner</span> for<br />executing your programs?
            </h2>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', lineHeight: 1.7, marginBottom: '40px' }}>
              We bring together unparalleled expertise with combination of skillsets and technology to<br />address your digital, computational and testing needs
            </p>
            <Link
              href="/contact-us"
              className="btn-primary"
              style={{
                background: 'var(--gradient-brand)',
                color: '#000',
                fontWeight: '700',
                textTransform: 'uppercase',
                padding: '16px 40px',
                borderRadius: '40px',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '16px',
                letterSpacing: '0.04em',
              }}
            >
              CONTACT US NOW
              <svg width="16" height="16" viewBox="0 0 20 20" fill="#000" aria-hidden="true">
                <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.59l-2.13-2.13a.75.75 0 011.06-1.06l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 11-1.06-1.06l2.13-2.13H5.75A.75.75 0 015 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* SCOPED STYLES END */}
      <style dangerouslySetInnerHTML={{ __html: `
        .timeline-row {
          display: grid;
          grid-template-columns: 90px 60px 1fr;
          gap: 30px;
          align-items: flex-start;
        }
        @media (max-width: 768px) {
          .timeline-row {
             grid-template-columns: 55px 10px 1fr;
             gap: 20px;
          }
          .timeline-horizontal-line {
             display: none !important;
          }
          .timeline-row .year-text {
             font-size: 20px !important;
          }
          .timeline-row .desc-text {
             font-size: 15px !important;
          }
        }
        .leaders-grid-new {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }
      `}} />
    </main>
  );
}
