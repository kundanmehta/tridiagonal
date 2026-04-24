'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAboutPageEditor() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com';

  useEffect(() => {
    fetch(`${API_URL}/api/aboutpage`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
    })
    .then(res => res.json())
    .then(json => {
      const d = json.data || {};
      
      const mergedData = {
        heroSection: {
          title: d.heroSection?.title || 'Delivering Process <span className="gradient-text">Excellence</span>',
          description: d.heroSection?.description || 'Technology catalyst to provide operations excellence with combination of skillsets and advanced technologies.',
          bgImage: d.heroSection?.bgImage || '/images/about-hero-bg.png'
        },
        introSection: {
          paragraphs: d.introSection?.paragraphs?.length > 0 ? d.introSection.paragraphs : [
            'Tridiagonal Solutions Pvt. Ltd. is a consulting company, providing solutions to the process industry verticals like Oil & Gas, Lifesciences / Pharma, F&B, Chemicals, Metals & Mining, Cement, Power, etc. As a first company incubated out of national chemical laboratory (NCL), Pune (india) under the leadership of <strong>Dr. Vivek Ranade</strong>, we have been focusing on application of advanced technologies to address process related challenges.',
            `With a strong Process R&D background, and combination of skill sets (100+ persons - Domain Engg. / SMEs, Modeling & Simulation, Data Scientists, Data Engineers, Application engineers), we support process development, central modeling teams, process technologist, digital and plant operations teams with our breadth and depth of services and solutions. We have delivered >2000+ consulting projects into modeling & simulation, process optimization, advanced analytics, energy optimization, flow assurance and mechanical integrity testing, etc. We serve fortune 500, 100 customers in various industries with flexible engagement models and have built center of excellence (COE's) to support customers large programs.`
          ],
          credentials: d.introSection?.credentials?.length > 0 ? d.introSection.credentials : [
            { num: '500+', text: 'Customers globally' },
            { num: '2000+', text: 'Projects delivered using multiple technologies' },
            { num: '100+M $', text: 'Savings realized by our customers' },
            { num: '300+', text: 'Multi-domain / Industry consultants with diverse technology know-how' },
            { num: '15+', text: 'Technology Solutions Partnerships' },
            { num: '250,000+ Sq.ft', text: 'Experiments set-up for new technology testing' },
            { num: '10+', text: "Center of Excellence (COE's) for various customers/ partners" }
          ]
        },
        atAGlanceSection: {
          heading: d.atAGlanceSection?.heading || 'Tridiagonal Solutions at a <span className="gradient-text">glance</span>',
          cards: d.atAGlanceSection?.cards?.length > 0 ? d.atAGlanceSection.cards : [
            { title: 'Our Vision', text: 'To create and deliver ‘Value’ to our customers by harnessing the power of technology and high performing teams', image: '/hubfs/vision.webp' },
            { title: 'Values', text: 'We strive to innovate with integrity, always putting the needs of our customers and partners first. Through relentless curiosity and a commitment to excellence, we aim to be a catalyst for bringing change and create value for everyone.', image: '/hubfs/values.webp' },
            { title: 'Commitment', text: 'At Tridiagonal Solutions, we are committed to pushing the boundaries of technology to drive innovation and deliver value. Our mission is to create solutions that not only meet the needs of today but also anticipate the challenges of tomorrow. We are dedicated to sustainability, diversity, and ethical practices, ensuring that our impact on all the stakeholders involved is a positive one. Together, we strive to make a difference and empower people to achieve more.', image: '/hubfs/Commitment.webp' }
          ]
        },
        leadershipSection: {
          heading: d.leadershipSection?.heading || 'Our Leadership Team',
          description: d.leadershipSection?.description || 'Empowering Excellence, Inspiring Growth.',
          members: d.leadershipSection?.members?.length > 0 ? d.leadershipSection.members : [
            { name: 'Pravin Jain', role: 'Chairman', linkedin: '#', image: '/hubfs/Pravin Jain.webp', desc: 'Pravin has proven his expertise in creating, positioning and managing high-growth companies. Mr. Jain has completed his Bachelors in Computer Engineering from University of Mumbai and Masters in Computer System Engineering from Northeastern University, Boston. He has also completed the Executive Program for Growing Companies at Stanford University Graduate School of Business. He has over 25 years of experience in Technology Entrepreneurship, Business Development and Delivery of Customer-Centric Solutions. Pravin’s experience includes acquiring as well as divesting companies. Pravin lived and worked for 14 years in the US, and shifted back to India in the summer of 2006. He has driven and been accountable for Sales, Marketing, Technology, Delivery and Strategy functions at his previous ventures.' },
            { name: 'Ashish Kulkarni', role: 'Vice President and BU Head (Advanced Modeling and Simulation)', linkedin: '#', image: '/hubfs/Ashish Kulkarni.webp', desc: 'Ashish is one of the founding members of Tridiagonal. He holds Post graduate degree in Fluid Mechanics and Thermal Sciences from IIT, Kanpur. At Tridiagonal, Ashish has played several roles including setting up CFD consulting team, Leading the software development group, Establishing OpenFOAM based solver, Operating as Business Unit Head, etc... His technical interests include Turbulence Modeling, Simulation Data Management and Developing Digital Twins. Ashish is an expert at building team of Engineers. Hiring, Training, Mentoring and Grooming young engineers to deliver high end engineering solutions is his forte. Ashish has followed his passion to develop around 500 CAE engineers over last twenty four years.' },
            { name: 'Dr. Damodaran Vedapuri', role: 'Head – North American Operations', linkedin: '#', image: '/hubfs/Dr. Damodaran Vedapuri.webp', desc: 'Dr. Damo Vedapuri is the Head of North American Operations at Tridiagonal Solutions. He has 20 years of experience in solving a wide range of fluid flow problems in the Oil and Gas industry. Some of his core focus areas are Erosion, Erosion – Corrosion, Sand Management, and Slurry Multiphase Flow. Dr. Damo has graduated from the Institute of Corrosion and Multiphase Technology at Ohio University with a Ph.D. degree in Chemical Engineering. He is a member of SPE and actively publishes his group’s research in SPE, OTC, NACE and BHR conferences.' }
          ]
        },
        coreTeamSection: {
          heading: d.coreTeamSection?.heading || 'Core Team',
          description: d.coreTeamSection?.description || 'Delivering Value to the Customers',
          members: d.coreTeamSection?.members?.length > 0 ? d.coreTeamSection.members : [
            { name: 'Dr. Jatin Agarwal', role: 'Program Director, Experimental Fluid Dynamics', linkedin: '#', image: '/hubfs/Dr. Jatin Agarwal.webp', desc: 'Dr. Jatin is working as Program Director and technical lead with 14+ years of experience for large scale production enhancement R&D projects (paraffin deposition, asphaltene deposition, multi-phase flow, simulation). He holds a Ph.D. degree in Petroleum Engineering from PDEU and Masters Degree from University of Tulsa. During his tenure at PDPU, he was instrumental in establishing state of art Drilling, Cementing and Stimulation Research Center and Enhanced Oil Recovery Consultancy Group for catering the needs of local as well as global E&P companies. He has presented several conference papers and published several journal articles in reputed conferences and journals. He has also authored a book named Offshore Operations and Engineering with CRC press of Taylor and Francis group.' },
            { name: 'Dr. Mothivel Mummudi', role: 'Global Director (Pharma) and Product Head, SimSight', linkedin: '#', image: '/hubfs/Dr. Mothivel Mummudi.webp', desc: 'Dr. Mothivel Mummudi has spent his entire professional career building advanced mathematical models for unit operations in the pharma, bio-pharma, chemicals and food industry segments. At Tridiagonal Software, he leads the development of SimSight, Tridiagonal\'s Advanced Analytics Platform based on computational data. Mothivel and the SimSight product team is driven by a strong commitment to the democratization of knowledge derived from synthetic data (i.e. data from computational models).' },
            { name: 'Dr. Gopal Kasat', role: 'Global Director-Mixing Science', linkedin: '#', image: '/hubfs/Dr. Gopal Kasat.webp', desc: 'Gopal is the Global Director-Mixing Science at Tridiagonal Software. He has a Ph.D. in Chemical Engineering from ICT, Mumbai. Gopal is also product manager for the MixIT Software. He has 20+ years of experience in scale-up/scale-down, batch & continuous mixing, computational fluid dynamics, training and mentoring, along with architecting computational solutions for chemical and process industries. Prior to Tridiagonal, Gopal worked at HyCa Technologies where he looked after development of hydrodynamic cavitaion systems for water treatment.' },
            { name: 'Nagesh Joshi', role: 'Practice Head Modeling and Simulation', linkedin: '#', image: '/hubfs/Nagesh Joshi.webp', desc: 'Nagesh has Masters degree in Mechanical Engineering with 20 years of experience in CFD and FEA modeling. He started his career with Atlascopoc as a Project Lead for Modeling and simulations. For the last 16 years, he has been working with Tridiagonal in different capacities. Currently, he is heading Modeling and simulations group.' },
            { name: 'Tukaram Suryavanshi', role: 'Head – Process Consulting', linkedin: '#', image: '/hubfs/Tukaram Suryavanshi.webp', desc: 'Tukaram Suryawanshi holds Masters in Chemical Engineering from IISc Bangalore. As head of Process Consulting services at Tridiagonal, he specilizes in the field of Advanced Modelling & Simulations using CFD, DEM, Mathematical Modelling. He has 18+ years of experience in applying the simulation services to Chemical Process, Pharmaceuticals, Food & Beverages, Medical Devices, FMCG Industries. Prior to Tridiagonal he has worked in Honeywell (Process Simulations & MES), Infosys (Engineering Services), Johnson Controls (Residential Heaters) He has publications in the international journals, conferences and patents from the work experience.' },
            { name: 'Apeksha Jadhav', role: 'HR Head', linkedin: '#', image: '/hubfs/Apeksha Jadhav.webp', desc: 'Apeksha Jadhav holds an Master Degree in Personnel Management from Pune University and certificate in Advance Human Resource Management from IIM, Indore. She is a seasoned Human Resource Business Partner with over 18 years of experience in Human Resource Management. As HR Head at Tridiagonal, she is pivotal in aligning HR functions with business objectives and enhancing employee engagement. Apeksha excels in performance management, talent sourcing, and grievance handling, demonstrating her ability to balance organizational goals with employee needs.' },
            { name: 'Hrushikesh Abhyankar', role: 'CFO', linkedin: '#', image: '/hubfs/Hrushikesh Abhyankar.webp', desc: 'Hrushikesh Abhyankar is CMA with more than 15 years of experience. He has worked with MNCs and Leading Corporates in the areas of Strategic Planning, Fund Management, Accounts, Auditing, QMS and Statutory Compliance. At present, Hrushikesh is serving as Head-Finance for Tridiagonal Group with high focus on strategic planning and designing internal control systems. Exceptional negotiation skills, relationship management and abilities in liaising with Banks, financing agencies are some of his key attributes.' }
          ]
        },
        timelineSection: {
          heading: d.timelineSection?.heading || 'Tridiagonal Solutions Evolution',
          events: d.timelineSection?.events?.length > 0 ? d.timelineSection.events : [
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
            { year: '2025', text: 'Tridiagonal.ai: A Domain-driven AI Company Transforming Industrial Operations' }
          ]
        },
        ctaSection: {
          heading: d.ctaSection?.heading || 'Looking for a <span className="gradient-text">Trusted Partner</span> for<br />executing your programs?',
          description: d.ctaSection?.description || 'We bring together unparalleled expertise with combination of skillsets and technology to<br />address your digital, computational and testing needs',
          buttonText: d.ctaSection?.buttonText || 'CONTACT US NOW',
          buttonLink: d.ctaSection?.buttonLink || '/contact-us',
          bgImage: d.ctaSection?.bgImage || '/hubfs/topography-bg.webp'
        }
      };

      // Ensure lists are not empty arrays if defaults existed but were overwritten by empty arrays
      if (!mergedData.introSection.paragraphs || mergedData.introSection.paragraphs.length === 0) {
        mergedData.introSection.paragraphs = ['Tridiagonal Solutions Pvt. Ltd. is a consulting company...'];
      }
      if (!mergedData.introSection.credentials || mergedData.introSection.credentials.length === 0) {
        mergedData.introSection.credentials = [{ num: '500+', text: 'Customers globally' }];
      }

      setData(mergedData);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      // Fallback empty structure allowing the admin to build from scratch
      setData({
        heroSection: {}, introSection: {}, atAGlanceSection: {},
        leadershipSection: {}, coreTeamSection: {}, timelineSection: {}, ctaSection: {}
      });
      setLoading(false);
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const res = await fetch(`${API_URL}/api/aboutpage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setMessage('About Us Page updated successfully!');
      } else {
        setMessage('Error saving changes.');
      }
    } catch (err) {
      setMessage('Network error.');
    }
    setSaving(false);
  };

  const handleImageUploadGeneric = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setSaving(true);
      setMessage('Uploading image...');
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
        body: formData
      });
      const json = await res.json();
      if (res.ok) {
        const fullUrl = `${API_URL}${json.url}`;
        callback(fullUrl);
        setMessage('Image uploaded successfully!');
      } else {
        setMessage(json.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error during upload');
    }
    setSaving(false);
  };

  const updateSectionField = (section, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const updateArrayItem = (section, arrayName, index, field, value) => {
    setData(prev => {
      const arr = [...(prev[section][arrayName] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: { ...prev[section], [arrayName]: arr } };
    });
  };

  const addArrayItem = (section, arrayName, defaultObj) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], [arrayName]: [...(prev[section][arrayName] || []), defaultObj] }
    }));
  };

  const removeArrayItem = (section, arrayName, index) => {
    setData(prev => {
      const arr = [...(prev[section][arrayName] || [])];
      arr.splice(index, 1);
      return { ...prev, [section]: { ...prev[section], [arrayName]: arr } };
    });
  };

  if (loading || !data) return <div style={{ padding: '3rem', color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Loading About Us CMS environment...</div>;

  return (
    <div className="admin-editor-wrap">
      <style>{`
        /* 
         * Modern Light Dashboard Theme matching HomePage
         */
        body {
          background-color: #f8fafc; 
        }
        .admin-editor-wrap {
          max-width: 100%;
          margin: 0 auto;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #0f172a;
          padding-bottom: 6rem; /* room for sticky footer */
        }
        
        .admin-header { margin-bottom: 2.5rem; }
        .admin-title { font-size: 2.25rem; font-weight: 800; color: #0f172a; margin: 0 0 0.5rem 0; letter-spacing: -0.03em; }
        .admin-subtitle { color: #64748b; font-size: 1.05rem; margin: 0; }
        
        .admin-msg { padding: 1rem 1.25rem; margin-bottom: 2rem; border-radius: 8px; font-weight: 600; font-size: 0.95rem; display: flex; alignItems: center; gap: 12px; boxShadow: 0 2px 5px rgba(0,0,0,0.02); }
        .msg-success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
        .msg-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
        
        .admin-section { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); }
        .admin-section-header { display: flex; align-items: center; justify-content: flex-start; gap: 12px; margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1.25rem; }
        .admin-badge { background: #00AEEF; color: #fff; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(0, 174, 239, 0.2); }
        .admin-section-header h2 { font-size: 1.25rem; font-weight: 700; color: #1e293b; margin: 0; }
        
        .admin-grid { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
        .admin-col-full { grid-column: 1 / -1; }
        
        .admin-label { display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .admin-input, .admin-textarea, .admin-select { width: 100%; padding: 0.75rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; color: #0f172a; background: #f8fafc; transition: all 0.2s ease; box-shadow: inset 0 1px 2px rgba(0,0,0,0.01); }
        .admin-input:focus, .admin-textarea:focus, .admin-select:focus { outline: none; border-color: #00AEEF; background: #ffffff; box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.1); }
        .admin-textarea { resize: vertical; min-height: 80px; }
        
        .admin-img-preview { width: 100%; max-width: 250px; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; margin-top: 1rem; background: #f1f5f9; padding: 4px; }
        .admin-img-preview img { width: 100%; height: auto; border-radius: 4px; display: block; }
        .admin-input-file { display: block; width: 100%; font-size: 0.9rem; color: #64748b; padding: 0.5rem 0; }
        .admin-input-file::file-selector-button { padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f1f5f9; color: #334155; font-weight: 600; cursor: pointer; transition: all 0.2s; margin-right: 1rem; }
        .admin-input-file::file-selector-button:hover { background: #e2e8f0; }

        .admin-cards-container { display: flex; flex-direction: column; gap: 1rem; }
        .admin-card-row { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; position: relative; }
        .admin-card-close { position: absolute; top: 12px; right: 12px; background: #fee2e2; color: #ef4444; border: none; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .admin-card-close:hover { background: #fecaca; }
        
        .admin-btn-add { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.9rem; color: #0f172a; background: #ffffff; border: 1px solid #cbd5e1; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
        .admin-btn-add:hover { background: #f1f5f9; border-color: #94a3b8; }
        
        .admin-bottom-bar { position: fixed; bottom: 0; left: 240px; right: 0; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); border-top: 1px solid #e2e8f0; padding: 1rem 2rem; display: flex; justify-content: flex-end; z-index: 50; box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.05); }
        .admin-btn-save { display: inline-flex; align-items: center; gap: 10px; background: #00AEEF; color: #ffffff; border: none; padding: 0.875rem 2rem; font-size: 1rem; font-weight: 700; border-radius: 8px; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 10px rgba(0, 174, 239, 0.3); }
        .admin-btn-save:hover:not(:disabled) { background: #0096ce; transform: translateY(-1px); box-shadow: 0 6px 15px rgba(0, 174, 239, 0.4); }
        .admin-btn-save:disabled { opacity: 0.7; cursor: not-allowed; }

        @media (max-width: 768px) {
          .admin-bottom-bar { left: 0; padding: 1rem; }
        }
      `}</style>

      <div className="admin-header">
        <h1 className="admin-title">About Us Page CMS</h1>
        <p className="admin-subtitle">Design and configure all sections of the About Us page.</p>
      </div>

      {message && (
         <div className={`admin-msg ${message.includes('success') ? 'msg-success' : 'msg-error'}`}>
          {message.includes('success') ? (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          ) : (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )}
          {message}
        </div>
      )}

      <form onSubmit={handleSave}>
        
        {/* 1. HERO SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">1</span>
            <h2>Hero Section</h2>
          </div>
          <div className="admin-form-body">
             <div className="admin-grid">
              <div className="admin-col-full">
                <label className="admin-label">Title (HTML allowed for styling)</label>
                <input type="text" value={data.heroSection?.title || ''} onChange={e => updateSectionField('heroSection', 'title', e.target.value)} className="admin-input" placeholder='Delivering Process <span className="gradient-text">Excellence</span>' />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Description</label>
                <textarea value={data.heroSection?.description || ''} onChange={e => updateSectionField('heroSection', 'description', e.target.value)} className="admin-textarea" rows={3}></textarea>
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Background Image URL</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input type="text" value={data.heroSection?.bgImage || ''} onChange={e => updateSectionField('heroSection', 'bgImage', e.target.value)} className="admin-input" />
                  <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                    Upload Image
                    <input type="file" accept="image/*" onChange={(e) => handleImageUploadGeneric(e, (url) => updateSectionField('heroSection', 'bgImage', url))} style={{ display: 'none' }} />
                  </label>
                </div>
                {data.heroSection?.bgImage && (
                  <div className="admin-img-preview" style={{ maxWidth: '250px' }}><img src={data.heroSection.bgImage} alt="Hero Background"/></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. INTRODUCTION SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">2</span>
            <h2>Introduction & Credentials</h2>
          </div>
          <div className="admin-form-body">
            
            <div style={{ marginBottom: '2rem' }}>
              <label className="admin-label">Introduction Paragraphs</label>
              {(data.introSection?.paragraphs || []).map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <textarea value={p} onChange={e => {
                    const newP = [...data.introSection.paragraphs];
                    newP[i] = e.target.value;
                    updateSectionField('introSection', 'paragraphs', newP);
                  }} className="admin-textarea" rows={3} style={{ flex: 1 }} />
                  <button type="button" onClick={() => {
                    const newP = [...data.introSection.paragraphs];
                    newP.splice(i, 1);
                    updateSectionField('introSection', 'paragraphs', newP);
                  }} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              ))}
              <button type="button" className="admin-btn-add" onClick={() => updateSectionField('introSection', 'paragraphs', [...(data.introSection?.paragraphs || []), ''])}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Paragraph
              </button>
            </div>

            <div>
              <label className="admin-label">Credentials List</label>
              <div className="admin-cards-container">
                {(data.introSection?.credentials || []).map((cred, i) => (
                  <div key={i} className="admin-card-row" style={{ display: 'flex', gap: '15px' }}>
                    <button type="button" className="admin-card-close" onClick={() => removeArrayItem('introSection', 'credentials', i)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div style={{ width: '150px' }}>
                      <input type="text" placeholder="Number (e.g. 500+)" value={cred.num || ''} onChange={e => updateArrayItem('introSection', 'credentials', i, 'num', e.target.value)} className="admin-input" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <input type="text" placeholder="Text (e.g. Customers globally)" value={cred.text || ''} onChange={e => updateArrayItem('introSection', 'credentials', i, 'text', e.target.value)} className="admin-input" />
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="admin-btn-add" style={{ marginTop: '1rem' }} onClick={() => addArrayItem('introSection', 'credentials', { num: '', text: '' })}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Credential
              </button>
            </div>
          </div>
        </div>

        {/* 3. AT A GLANCE */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">3</span>
            <h2>At A Glance</h2>
          </div>
          <div className="admin-form-body">
            <div className="admin-grid" style={{ marginBottom: '2rem' }}>
               <div className="admin-col-full">
                  <label className="admin-label">Heading</label>
                  <input type="text" value={data.atAGlanceSection?.heading || ''} onChange={e => updateSectionField('atAGlanceSection', 'heading', e.target.value)} className="admin-input" />
               </div>
            </div>

            <label className="admin-label">Cards</label>
            <div className="admin-cards-container">
              {(data.atAGlanceSection?.cards || []).map((card, i) => (
                <div key={i} className="admin-card-row admin-grid">
                  <button type="button" className="admin-card-close" onClick={() => removeArrayItem('atAGlanceSection', 'cards', i)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                  <div className="admin-col-full" style={{ paddingRight: '30px' }}>
                    <label className="admin-label">Card Title</label>
                    <input type="text" value={card.title || ''} onChange={e => updateArrayItem('atAGlanceSection', 'cards', i, 'title', e.target.value)} className="admin-input" />
                  </div>
                  <div className="admin-col-full">
                    <label className="admin-label">Card Text</label>
                    <textarea value={card.text || ''} onChange={e => updateArrayItem('atAGlanceSection', 'cards', i, 'text', e.target.value)} className="admin-textarea" rows={3}></textarea>
                  </div>
                  <div className="admin-col-full">
                    <label className="admin-label">Card Image</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input type="text" value={card.image || ''} onChange={e => updateArrayItem('atAGlanceSection', 'cards', i, 'image', e.target.value)} className="admin-input" />
                      <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                        Upload Image
                        <input type="file" accept="image/*" onChange={(e) => handleImageUploadGeneric(e, (url) => updateArrayItem('atAGlanceSection', 'cards', i, 'image', url))} style={{ display: 'none' }} />
                      </label>
                    </div>
                    {card.image && (
                      <div className="admin-img-preview" style={{ maxWidth: '150px' }}><img src={card.image} alt="Icon"/></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="admin-btn-add" style={{ marginTop: '1rem' }} onClick={() => addArrayItem('atAGlanceSection', 'cards', { title: '', text: '', image: '' })}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Card
            </button>
          </div>
        </div>

        {/* 4. LEADERSHIP TEAM */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">4</span>
            <h2>Our Leadership Team</h2>
          </div>
          <div className="admin-form-body">
            <div className="admin-grid" style={{ marginBottom: '2rem' }}>
               <div>
                  <label className="admin-label">Heading</label>
                  <input type="text" value={data.leadershipSection?.heading || ''} onChange={e => updateSectionField('leadershipSection', 'heading', e.target.value)} className="admin-input" />
               </div>
               <div>
                  <label className="admin-label">Description</label>
                  <input type="text" value={data.leadershipSection?.description || ''} onChange={e => updateSectionField('leadershipSection', 'description', e.target.value)} className="admin-input" />
               </div>
            </div>

            <label className="admin-label">Members</label>
            <div className="admin-cards-container">
              {(data.leadershipSection?.members || []).map((member, i) => (
                <div key={i} className="admin-card-row admin-grid">
                  <button type="button" className="admin-card-close" onClick={() => removeArrayItem('leadershipSection', 'members', i)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                  <div style={{ paddingRight: '30px' }}>
                    <label className="admin-label">Name</label>
                    <input type="text" value={member.name || ''} onChange={e => updateArrayItem('leadershipSection', 'members', i, 'name', e.target.value)} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Role</label>
                    <input type="text" value={member.role || ''} onChange={e => updateArrayItem('leadershipSection', 'members', i, 'role', e.target.value)} className="admin-input" />
                  </div>
                  <div className="admin-col-full">
                    <label className="admin-label">LinkedIn URL</label>
                    <input type="text" value={member.linkedin || ''} onChange={e => updateArrayItem('leadershipSection', 'members', i, 'linkedin', e.target.value)} className="admin-input" />
                  </div>
                  <div className="admin-col-full">
                    <label className="admin-label">Profile Image</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input type="text" value={member.image || ''} onChange={e => updateArrayItem('leadershipSection', 'members', i, 'image', e.target.value)} className="admin-input" />
                      <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                        Upload Image
                        <input type="file" accept="image/*" onChange={(e) => handleImageUploadGeneric(e, (url) => updateArrayItem('leadershipSection', 'members', i, 'image', url))} style={{ display: 'none' }} />
                      </label>
                    </div>
                    {member.image && (
                      <div className="admin-img-preview" style={{ maxWidth: '100px' }}><img src={member.image} alt="Profile"/></div>
                    )}
                  </div>
                  <div className="admin-col-full">
                    <label className="admin-label">Extended Description (For Popup window)</label>
                    <textarea value={member.desc || ''} onChange={e => updateArrayItem('leadershipSection', 'members', i, 'desc', e.target.value)} className="admin-textarea" rows={4}></textarea>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="admin-btn-add" style={{ marginTop: '1rem' }} onClick={() => addArrayItem('leadershipSection', 'members', { name: '', role: '', linkedin: '', image: '', desc: '' })}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Leader
            </button>
          </div>
        </div>

        {/* 5. CORE TEAM */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">5</span>
            <h2>Core Team</h2>
          </div>
          <div className="admin-form-body">
            <div className="admin-grid" style={{ marginBottom: '2rem' }}>
               <div>
                  <label className="admin-label">Heading</label>
                  <input type="text" value={data.coreTeamSection?.heading || ''} onChange={e => updateSectionField('coreTeamSection', 'heading', e.target.value)} className="admin-input" />
               </div>
               <div>
                  <label className="admin-label">Description</label>
                  <input type="text" value={data.coreTeamSection?.description || ''} onChange={e => updateSectionField('coreTeamSection', 'description', e.target.value)} className="admin-input" />
               </div>
            </div>

            <label className="admin-label">Members</label>
            <div className="admin-cards-container">
              {(data.coreTeamSection?.members || []).map((member, i) => (
                <div key={i} className="admin-card-row admin-grid">
                  <button type="button" className="admin-card-close" onClick={() => removeArrayItem('coreTeamSection', 'members', i)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                  <div style={{ paddingRight: '30px' }}>
                    <label className="admin-label">Name</label>
                    <input type="text" value={member.name || ''} onChange={e => updateArrayItem('coreTeamSection', 'members', i, 'name', e.target.value)} className="admin-input" />
                  </div>
                  <div>
                    <label className="admin-label">Role</label>
                    <input type="text" value={member.role || ''} onChange={e => updateArrayItem('coreTeamSection', 'members', i, 'role', e.target.value)} className="admin-input" />
                  </div>
                  <div className="admin-col-full">
                    <label className="admin-label">LinkedIn URL</label>
                    <input type="text" value={member.linkedin || ''} onChange={e => updateArrayItem('coreTeamSection', 'members', i, 'linkedin', e.target.value)} className="admin-input" />
                  </div>
                  <div className="admin-col-full">
                    <label className="admin-label">Profile Image</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input type="text" value={member.image || ''} onChange={e => updateArrayItem('coreTeamSection', 'members', i, 'image', e.target.value)} className="admin-input" />
                      <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                        Upload Image
                        <input type="file" accept="image/*" onChange={(e) => handleImageUploadGeneric(e, (url) => updateArrayItem('coreTeamSection', 'members', i, 'image', url))} style={{ display: 'none' }} />
                      </label>
                    </div>
                    {member.image && (
                      <div className="admin-img-preview" style={{ maxWidth: '100px' }}><img src={member.image} alt="Profile"/></div>
                    )}
                  </div>
                  <div className="admin-col-full">
                    <label className="admin-label">Extended Description (For Popup window)</label>
                    <textarea value={member.desc || ''} onChange={e => updateArrayItem('coreTeamSection', 'members', i, 'desc', e.target.value)} className="admin-textarea" rows={4}></textarea>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="admin-btn-add" style={{ marginTop: '1rem' }} onClick={() => addArrayItem('coreTeamSection', 'members', { name: '', role: '', linkedin: '', image: '', desc: '' })}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Core Member
            </button>
          </div>
        </div>

        {/* 6. TIMELINE SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">6</span>
            <h2>Timeline / Evolution</h2>
          </div>
          <div className="admin-form-body">
            <div className="admin-grid" style={{ marginBottom: '2rem' }}>
               <div className="admin-col-full">
                  <label className="admin-label">Heading</label>
                  <input type="text" value={data.timelineSection?.heading || ''} onChange={e => updateSectionField('timelineSection', 'heading', e.target.value)} className="admin-input" />
               </div>
            </div>

            <label className="admin-label">Timeline Events</label>
            <div className="admin-cards-container">
              {(data.timelineSection?.events || []).map((evt, i) => (
                <div key={i} className="admin-card-row admin-grid">
                  <button type="button" className="admin-card-close" onClick={() => removeArrayItem('timelineSection', 'events', i)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                  <div style={{ paddingRight: '30px' }}>
                    <label className="admin-label">Year (e.g. 2006)</label>
                    <input type="text" value={evt.year || ''} onChange={e => updateArrayItem('timelineSection', 'events', i, 'year', e.target.value)} className="admin-input" />
                  </div>
                  <div className="admin-col-full">
                    <label className="admin-label">Description Text</label>
                    <textarea value={evt.text || ''} onChange={e => updateArrayItem('timelineSection', 'events', i, 'text', e.target.value)} className="admin-textarea" rows={3}></textarea>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="admin-btn-add" style={{ marginTop: '1rem' }} onClick={() => addArrayItem('timelineSection', 'events', { year: '', text: '' })}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Timeline Event
            </button>
          </div>
        </div>

        {/* 7. CTA SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">7</span>
            <h2>Trusted Partner CTA Header</h2>
          </div>
          <div className="admin-form-body">
             <div className="admin-grid">
              <div className="admin-col-full">
                <label className="admin-label">Heading (HTML allowed for breaks)</label>
                <input type="text" value={data.ctaSection?.heading || ''} onChange={e => updateSectionField('ctaSection', 'heading', e.target.value)} className="admin-input" />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Description</label>
                <textarea value={data.ctaSection?.description || ''} onChange={e => updateSectionField('ctaSection', 'description', e.target.value)} className="admin-textarea" rows={3}></textarea>
              </div>
              <div>
                <label className="admin-label">Button Text</label>
                <input type="text" value={data.ctaSection?.buttonText || ''} onChange={e => updateSectionField('ctaSection', 'buttonText', e.target.value)} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Button Link</label>
                <input type="text" value={data.ctaSection?.buttonLink || ''} onChange={e => updateSectionField('ctaSection', 'buttonLink', e.target.value)} className="admin-input" />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Background Map Image</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input type="text" value={data.ctaSection?.bgImage || ''} onChange={e => updateSectionField('ctaSection', 'bgImage', e.target.value)} className="admin-input" />
                  <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                    Upload Image
                    <input type="file" accept="image/*" onChange={(e) => handleImageUploadGeneric(e, (url) => updateSectionField('ctaSection', 'bgImage', url))} style={{ display: 'none' }} />
                  </label>
                </div>
                {data.ctaSection?.bgImage && (
                  <div className="admin-img-preview" style={{ maxWidth: '250px' }}><img src={data.ctaSection.bgImage} alt="CTA Bg"/></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="admin-bottom-bar">
          <button type="submit" disabled={saving} className="admin-btn-save">
             {saving ? (
               <svg style={{ animation: 'spin 1s linear infinite', width: '18px', height: '18px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
             ) : (
               <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
             )}
             {saving ? 'Publishing...' : 'Save All Changes'}
          </button>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .opacity-25 { opacity: 0.25; }
          .opacity-75 { opacity: 0.75; }
        `}} />
      </form>
    </div>
  );
}
