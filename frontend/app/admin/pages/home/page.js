'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/apiConfig';

export default function AdminHomePageEditor() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [allCaseStudies, setAllCaseStudies] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  

  useEffect(() => {
    // Corrected to fetch from the actual API endpoint
    fetch(`${API_URL}/api/homepage`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
      }
    })
    .then(res => res.json())
    .then(json => {
      // Initialize with defaults if hero object or other properties are missing
      const fetchedData = json.data || {};
      const mergedData = {
        ...fetchedData,
        hero: {
          titleLine1: fetchedData.hero?.titleLine1 || "Process Consulting and",
          titleLine2: fetchedData.hero?.titleLine2 || "Technology Solutions",
          description: fetchedData.hero?.description || "We deliver 'Value' by leveraging advanced technologies to address process related challenges.",
          ctaText: fetchedData.hero?.ctaText || "LEARN MORE",
          ctaLink: fetchedData.hero?.ctaLink || "#services",
          videoUrl: fetchedData.hero?.videoUrl || "/hubfs/home-hero-video-1.mp4",
          imageUrl: fetchedData.hero?.imageUrl || "/hubfs/Capture-1.webp",
          backgroundType: fetchedData.hero?.backgroundType || "video",
        },
        serviceCards: fetchedData.serviceCards || [],
        servicesHeading: fetchedData.servicesHeading || "Our Services",
        serviceCta: {
          text: fetchedData.serviceCta?.text || "To know more about our practice areas, contact us today!",
          buttonText: fetchedData.serviceCta?.buttonText || "Contact Us",
          buttonLink: fetchedData.serviceCta?.buttonLink || "/contact-us",
        },
        whoWeAreCards: fetchedData.whoWeAreCards || [],
        whoWeAreHeading: fetchedData.whoWeAreHeading || "Who We Are",
        whoWeAreDescription: fetchedData.whoWeAreDescription || "Leveraging advanced technologies to support process industry needs.",
        workOnHeading: fetchedData.workOnHeading || "What would you like to work on?",
        workOnDescription: fetchedData.workOnDescription || "Execution and Implementation partner for your business problems.",
        workOnCards: fetchedData.workOnCards || [],
        resourceSlides: fetchedData.resourceSlides || [],
        keyHighlights: fetchedData.keyHighlights || { counters: [] },
        brandIdentity: fetchedData.brandIdentity || {},
        useCasesSection: fetchedData.useCasesSection || {
          title: "Use Cases",
          description: "Despite of ever-evolving industries...",
          ctaText: "VIEW ALL USE CASES",
          ctaLink: "/use-cases",
          displayMode: 'manual',
          latestCount: 4,
          manualSelectedCards: []
        },
        partnersSection: fetchedData.partnersSection || {
          title: "Technology Partners",
          ctaText: "EXPLORE OUR PARTNER ECOSYSTEM",
          ctaLink: "/partner-solutions",
          logos: []
        },
        resourcesSection: fetchedData.resourcesSection || {
          title: "Resources",
          description: "Explore the best practices and success stories of application of technology in process industry",
          ctaText: "ALL RESOURCES",
          ctaLink: "/resources",
          categories: fetchedData.resourcesSection?.categories || [],
          displayMode: fetchedData.resourcesSection?.displayMode || 'latest',
          manualSlides: fetchedData.resourcesSection?.manualSlides || [],
          slides: fetchedData.resourcesSection?.slides || []
        },
        cultureSection: fetchedData.cultureSection || {
          title: "Explore Our Culture and People",
          description: "Are you seeking an exciting role that will challenge and inspire you?...",
          cardHeading: "Looking to Work with us?",
          button1Text: "VIEW OPENING",
          button1Link: "/careers",
          button2Text: "ABOUT US",
          button2Link: "/about-us",
          image1: "",
          image2: "",
          image3: "",
          image4: ""
        },
        trustedPartnerSection: fetchedData.trustedPartnerSection || {
          title: "Looking for Trusted Partner for executing your programs?",
          description: "We bring together unparalleled expertise...",
          ctaText: "CONTACT US NOW",
          ctaLink: "/contact-us"
        },
      };
      
      setData(mergedData);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });

    // Fetch all logs to filter for Case Studies
    fetch(`${API_URL}/api/blogs`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
    })
    .then(res => res.json())
    .then(json => {
      const blogs = json.data || [];
      setAllBlogs(blogs);
      const cases = blogs.filter(b => b.category === 'Case Study');
      setAllCaseStudies(cases);
    })
    .catch(err => console.error('Error fetching blogs for picker:', err));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const res = await fetch(`${API_URL}/api/homepage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setMessage('Home Page updated successfully!');
      } else {
        setMessage('Error saving changes.');
      }
    } catch (err) {
      setMessage('Network error.');
    }
    setSaving(false);
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setSaving(true);
      setMessage('Uploading video...');
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formData
      });
      
      const json = await res.json();
      if (res.ok) {
        // Assume backend returns something like `/uploads/12345.mp4`
        const fullUrl = `${API_URL}${json.url}`;
        updateHero('videoUrl', fullUrl);
        setMessage('Video uploaded successfully!');
      } else {
        setMessage(json.error || 'Failed to upload video');
      }
    } catch (err) {
      console.error(err);
      setMessage('Network error during upload');
    }
    setSaving(false);
  };

  const updateHero = (field, value) => {
    setData(prev => {
      const hero = prev?.hero || {};
      return { ...prev, hero: { ...hero, [field]: value } };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setSaving(true);
      setMessage('Uploading image...');
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: formData
      });
      
      const json = await res.json();
      if (res.ok) {
        const fullUrl = `${API_URL}${json.url}`;
        updateHero('imageUrl', fullUrl);
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

  const updateArrayItem = (arrayName, index, field, value) => {
    setData(prev => {
      if (!prev) return prev;
      const newArray = [...(prev[arrayName] || [])];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName, emptyObject) => {
    setData(prev => {
      if (!prev) return prev;
      return { ...prev, [arrayName]: [...(prev[arrayName] || []), emptyObject] };
    });
  };

  const removeArrayItem = (arrayName, index) => {
    setData(prev => {
      if (!prev) return prev;
      const newArray = [...(prev[arrayName] || [])];
      newArray.splice(index, 1);
      return { ...prev, [arrayName]: newArray };
    });
  };

  if (loading) return <div style={{ padding: '3rem', color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Loading Home Page environment...</div>;

  return (
    <div className="admin-editor-wrap">
      <style>{`
        /* 
         * Modern Light Dashboard Theme
         */
        body {
          background-color: #f8fafc; /* Ensure background is crisp light gray */
        }
        .admin-editor-wrap {
          max-width: 100%;
          margin: 0 auto;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #0f172a;
          padding-bottom: 6rem; /* room for sticky footer */
        }
        
        .admin-header {
          margin-bottom: 2.5rem;
        }
        
        .admin-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.03em;
        }
        
        .admin-subtitle {
          color: #64748b;
          font-size: 1.05rem;
          margin: 0;
        }
        
        .admin-msg {
          padding: 1rem 1.25rem;
          margin-bottom: 2rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.02);
        }
        .msg-success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
        .msg-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
        
        .admin-section {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          margin-bottom: 2.5rem;
          overflow: hidden;
          transition: box-shadow 0.2s ease;
        }
        .admin-section:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
        }
        
        .admin-section-header {
          background: #f8fafc;
          padding: 1.25rem 2rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        
        .admin-section-header h2 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          letter-spacing: -0.01em;
        }
        
        .admin-badge {
          background: #00AEEF;
          color: #ffffff;
          width: 28px;
          height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: 0 2px 4px rgba(0, 174, 239, 0.3);
        }
        
        .admin-form-body {
          padding: 2rem;
        }
        
        .admin-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
        }
        @media (min-width: 768px) {
          .admin-grid { grid-template-columns: 1fr 1fr; }
        }
        .admin-col-full { grid-column: 1 / -1; }
        
        .admin-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 0.5rem;
        }
        
        .admin-input, .admin-textarea {
          width: 100%;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #0f172a;
          font-size: 0.95rem;
          font-family: inherit;
          transition: all 0.2s;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
          box-sizing: border-box;
        }
        .admin-input:hover, .admin-textarea:hover {
          border-color: #94a3b8;
        }
        .admin-input:focus, .admin-textarea:focus {
          outline: none;
          border-color: #00AEEF;
          box-shadow: 0 0 0 4px rgba(0, 174, 239, 0.15);
          background: #ffffff;
        }
        
        .admin-video-preview {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #e2e8f0;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
        }
        .video-placeholder {
          width: 100%;
          height: 140px;
          border-radius: 8px;
          border: 2px dashed #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          font-size: 0.9rem;
          font-weight: 500;
          background: #f8fafc;
        }

        .admin-bottom-bar {
          position: fixed;
          bottom: 0;
          left: 260px; /* offset by sidebar */
          right: 0;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid #e2e8f0;
          padding: 1.25rem 3rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          z-index: 100;
          box-shadow: 0 -4px 6px -1px rgba(0,0,0,0.02);
        }
        
        .admin-btn-save {
          background: #00AEEF;
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.75rem 2.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(0, 174, 239, 0.25);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .admin-btn-save:hover:not(:disabled) {
          background: #0093cf;
          transform: translateY(-1px);
          box-shadow: 0 6px 10px rgba(0, 174, 239, 0.3);
        }
        .admin-btn-save:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 174, 239, 0.2);
        }
        .admin-btn-save:disabled {
          background: #cbd5e1;
          color: #64748b;
          box-shadow: none;
          cursor: not-allowed;
        }
        /* --- Array Cards Editor --- */
        .admin-array-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .admin-array-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          position: relative;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.01);
        }
        .admin-array-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px dashed #cbd5e1;
        }
        .admin-array-card-title {
          font-weight: 700;
          color: #334155;
          font-size: 1rem;
          margin: 0;
        }
        .admin-btn-remove {
          background: #fef2f2;
          color: #ef4444;
          border: 1px solid #fecaca;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-btn-remove:hover {
          background: #fee2e2;
          color: #dc2626;
        }
        .admin-btn-add {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          border: 2px dashed #cbd5e1;
          color: #475569;
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 1rem;
          transition: all 0.2s;
          width: 100%;
          justify-content: center;
        }
        .admin-btn-add:hover {
          border-color: #00AEEF;
          color: #00AEEF;
          background: #f0f9ff;
        }
      `}</style>

      <div className="admin-header">
        <h1 className="admin-title">Home Page Settings</h1>
        <p className="admin-subtitle">Manage static configurations and dynamic hero content for the landing page.</p>
      </div>
      
      {message && (
        <div className={`admin-msg ${message.includes('Error') ? 'msg-error' : 'msg-success'}`}>
          <svg style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             {message.includes('Error') 
               ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
             }
          </svg>
          {message}
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* HERO SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">1</span>
            <h2>Hero Banner Details</h2>
          </div>
          
          <div className="admin-form-body">
            <div className="admin-grid">
              <div>
                <label className="admin-label">Headline First Line</label>
                <input type="text" placeholder="e.g. Process Consulting and" value={data?.hero?.titleLine1 || ''} onChange={e => updateHero('titleLine1', e.target.value)} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Headline Gradient Text</label>
                <input type="text" placeholder="e.g. Technology Solutions" value={data?.hero?.titleLine2 || ''} onChange={e => updateHero('titleLine2', e.target.value)} className="admin-input" />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Hero Description</label>
                <textarea placeholder="Write a short sub-headline..." value={data?.hero?.description || ''} onChange={e => updateHero('description', e.target.value)} rows={3} className="admin-textarea" />
              </div>
              <div>
                <label className="admin-label">CTA Button Text</label>
                <input type="text" placeholder="e.g. LEARN MORE" value={data?.hero?.ctaText || ''} onChange={e => updateHero('ctaText', e.target.value)} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">CTA Button Link</label>
                <input type="text" placeholder="e.g. #services or /contact" value={data?.hero?.ctaLink || ''} onChange={e => updateHero('ctaLink', e.target.value)} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Hero Background Type</label>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 500 }}>
                    <input type="radio" name="bgType" value="video" checked={data?.hero?.backgroundType === 'video'} onChange={() => updateHero('backgroundType', 'video')} />
                    Video Background
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 500 }}>
                    <input type="radio" name="bgType" value="image" checked={data?.hero?.backgroundType === 'image'} onChange={() => updateHero('backgroundType', 'image')} />
                    Photo Background
                  </label>
                </div>
              </div>

              {data?.hero?.backgroundType === 'video' ? (
                <div>
                  <label className="admin-label">Background Video URL</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input type="text" placeholder="/hubfs/your-video.mp4" value={data?.hero?.videoUrl || ''} onChange={e => updateHero('videoUrl', e.target.value)} className="admin-input" />
                    <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                      Upload Video
                      <input type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                  {data?.hero?.videoUrl ? (
                     <video src={data?.hero?.videoUrl} muted autoPlay loop playsInline className="admin-video-preview" style={{ height: '200px' }}></video>
                  ) : (
                     <div className="video-placeholder" style={{ height: '200px' }}>No video connected</div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="admin-label">Background Image URL</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input type="text" placeholder="/hubfs/your-image.png" value={data?.hero?.imageUrl || ''} onChange={e => updateHero('imageUrl', e.target.value)} className="admin-input" />
                    <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                      Upload Image
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>
                  {data?.hero?.imageUrl ? (
                     <img src={data?.hero?.imageUrl} alt="Hero Preview" className="admin-video-preview" style={{ height: '200px', objectFit: 'cover' }} />
                  ) : (
                     <div className="video-placeholder" style={{ height: '200px' }}>No image connected</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SERVICE CARDS (Dynamic Array) */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">2</span>
            <h2>Services Section</h2>
          </div>
          
          <div className="admin-form-body">
            <div>
              <label className="admin-label">Section Heading</label>
              <input type="text" value={data?.servicesHeading || ''} onChange={e => setData(prev => ({ ...prev, servicesHeading: e.target.value }))} className="admin-input" placeholder="Our Services" />
            </div>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600, color: '#333' }}>Service Cards</h3>
            <div className="admin-array-list">
              {(data?.serviceCards || []).map((card, idx) => (
                <div key={idx} className="admin-array-card">
                  <div className="admin-array-card-header">
                    <h3 className="admin-array-card-title">Card #{idx + 1}</h3>
                    <button type="button" onClick={() => removeArrayItem('serviceCards', idx)} className="admin-btn-remove">Remove Card</button>
                  </div>
                  
                  <div className="admin-grid">
                    <div>
                      <label className="admin-label">Number / Identifier</label>
                      <input type="text" value={card.num || ''} onChange={e => updateArrayItem('serviceCards', idx, 'num', e.target.value)} className="admin-input" placeholder="e.g. 01" />
                    </div>
                    <div>
                      <label className="admin-label">Redirection Link URL</label>
                      <input type="text" value={card.href || ''} onChange={e => updateArrayItem('serviceCards', idx, 'href', e.target.value)} className="admin-input" placeholder="/services/endpoint" />
                    </div>
                    <div>
                      <label className="admin-label">Title</label>
                      <input type="text" value={card.title || ''} onChange={e => updateArrayItem('serviceCards', idx, 'title', e.target.value)} className="admin-input" />
                    </div>
                    <div>
                      <label className="admin-label">Background Color Hex</label>
                      <input type="text" value={card.bg || ''} onChange={e => updateArrayItem('serviceCards', idx, 'bg', e.target.value)} className="admin-input" placeholder="#383838" />
                    </div>
                    <div className="admin-col-full">
                      <label className="admin-label">Card Description</label>
                      <textarea value={card.desc || ''} onChange={e => updateArrayItem('serviceCards', idx, 'desc', e.target.value)} rows={2} className="admin-textarea" />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                className="admin-btn-add"
                onClick={() => addArrayItem('serviceCards', { num: 'XX', title: 'New Service', desc: '', href: '#', bg: '#383838' })}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Add New Service Card
              </button>
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600, color: '#333' }}>CTA Card (4th Card)</h3>
            <div className="admin-grid">
              <div className="admin-col-full">
                <label className="admin-label">CTA Text</label>
                <input type="text" value={data?.serviceCta?.text || ''} onChange={e => setData(prev => ({ ...prev, serviceCta: { ...(prev?.serviceCta || {}), text: e.target.value } }))} className="admin-input" placeholder="To know more about our practice areas, contact us today!" />
              </div>
              <div>
                <label className="admin-label">Button Text</label>
                <input type="text" value={data?.serviceCta?.buttonText || ''} onChange={e => setData(prev => ({ ...prev, serviceCta: { ...(prev?.serviceCta || {}), buttonText: e.target.value } }))} className="admin-input" placeholder="Contact Us" />
              </div>
              <div>
                <label className="admin-label">Button Link</label>
                <input type="text" value={data?.serviceCta?.buttonLink || ''} onChange={e => setData(prev => ({ ...prev, serviceCta: { ...(prev?.serviceCta || {}), buttonLink: e.target.value } }))} className="admin-input" placeholder="/contact-us" />
              </div>
            </div>
          </div>
        </div>

        {/* WHO WE ARE SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">3</span>
            <h2>Who We Are Section</h2>
          </div>
          
          <div className="admin-form-body">
            <div className="admin-grid">
              <div>
                <label className="admin-label">Section Heading</label>
                <input type="text" value={data?.whoWeAreHeading || ''} onChange={e => setData(prev => ({ ...prev, whoWeAreHeading: e.target.value }))} className="admin-input" placeholder="Who We Are" />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Section Description</label>
                <textarea value={data?.whoWeAreDescription || ''} onChange={e => setData(prev => ({ ...prev, whoWeAreDescription: e.target.value }))} rows={2} className="admin-textarea" placeholder="Leveraging advanced technologies..." />
              </div>
            </div>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600, color: '#333' }}>Cards</h3>
            <div className="admin-array-list">
              {(data?.whoWeAreCards || []).map((card, idx) => (
                <div key={idx} className="admin-array-card">
                  <div className="admin-array-card-header">
                    <h3 className="admin-array-card-title">Card #{idx + 1}</h3>
                    <button type="button" onClick={() => removeArrayItem('whoWeAreCards', idx)} className="admin-btn-remove">Remove Card</button>
                  </div>
                  
                  <div className="admin-grid">
                    <div>
                      <label className="admin-label">Title</label>
                      <input type="text" value={card.title || ''} onChange={e => updateArrayItem('whoWeAreCards', idx, 'title', e.target.value)} className="admin-input" />
                    </div>
                    <div>
                      <label className="admin-label">Background Image URL</label>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input type="text" value={card.backgroundImage || ''} onChange={e => updateArrayItem('whoWeAreCards', idx, 'backgroundImage', e.target.value)} className="admin-input" placeholder="/hubfs/image.png" />
                        <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                          Upload
                          <input type="file" accept="image/*" onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const formData = new FormData();
                            formData.append('file', file);
                            try {
                              const res = await fetch(`${API_URL}/api/upload`, {
                                method: 'POST',
                                headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
                                body: formData,
                              });
                              const json = await res.json();
                              if (json.url) updateArrayItem('whoWeAreCards', idx, 'backgroundImage', json.url);
                            } catch (err) { console.error(err); }
                          }} style={{ display: 'none' }} />
                        </label>
                      </div>
                      {card.backgroundImage ? (
                        <img src={card.backgroundImage} alt="Card Preview" style={{ height: '200px', objectFit: 'cover', borderRadius: '8px', width: '100%' }} />
                      ) : (
                        <div className="video-placeholder" style={{ height: '200px' }}>No image connected</div>
                      )}
                    </div>
                    <div className="admin-col-full">
                      <label className="admin-label">Card Description</label>
                      <textarea value={card.desc || ''} onChange={e => updateArrayItem('whoWeAreCards', idx, 'desc', e.target.value)} rows={3} className="admin-textarea" />
                    </div>
                    <div>
                      <label className="admin-label">Button Text</label>
                      <input type="text" value={card.buttonText || ''} onChange={e => updateArrayItem('whoWeAreCards', idx, 'buttonText', e.target.value)} className="admin-input" placeholder="VIEW MORE" />
                    </div>
                    <div>
                      <label className="admin-label">Button Link URL</label>
                      <input type="text" value={card.buttonLink || ''} onChange={e => updateArrayItem('whoWeAreCards', idx, 'buttonLink', e.target.value)} className="admin-input" />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                className="admin-btn-add"
                onClick={() => addArrayItem('whoWeAreCards', { title: 'New Pillar', desc: '', backgroundImage: '', buttonText: 'VIEW MORE', buttonLink: '#' })}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Add New "Who We Are" Card
              </button>
            </div>
          </div>
        </div>

        {/* WORK ON SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">3.5</span>
            <h2>Work On Section</h2>
          </div>
          
          <div className="admin-form-body">
            <div className="admin-grid">
              <div>
                <label className="admin-label">Section Heading</label>
                <input type="text" value={data?.workOnHeading || ''} onChange={e => setData(prev => ({ ...prev, workOnHeading: e.target.value }))} className="admin-input" placeholder="What would you like to work on?" />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Section Description</label>
                <textarea value={data?.workOnDescription || ''} onChange={e => setData(prev => ({ ...prev, workOnDescription: e.target.value }))} rows={2} className="admin-textarea" placeholder="Execution and Implementation partner..." />
              </div>
            </div>

            <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600, color: '#333' }}>Cards</h3>
            <div className="admin-array-list">
              {(data?.workOnCards || []).map((card, idx) => (
                <div key={idx} className="admin-array-card">
                  <div className="admin-array-card-header">
                    <h3 className="admin-array-card-title">Card #{idx + 1}</h3>
                    <button type="button" onClick={() => removeArrayItem('workOnCards', idx)} className="admin-btn-remove">Remove Card</button>
                  </div>
                  
                  <div className="admin-grid">
                    <div>
                      <label className="admin-label">Title</label>
                      <input type="text" value={card.title || ''} onChange={e => updateArrayItem('workOnCards', idx, 'title', e.target.value)} className="admin-input" />
                    </div>
                    <div>
                      <label className="admin-label">Icon URL / Image</label>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input type="text" value={card.icon || ''} onChange={e => updateArrayItem('workOnCards', idx, 'icon', e.target.value)} className="admin-input" placeholder="/images/icon.svg" />
                        <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                          Upload
                          <input type="file" accept="image/*" onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const formData = new FormData();
                            formData.append('file', file);
                            try {
                              const res = await fetch(`${API_URL}/api/upload`, {
                                method: 'POST',
                                headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
                                body: formData,
                              });
                              const json = await res.json();
                              if (json.url) updateArrayItem('workOnCards', idx, 'icon', json.url);
                            } catch (err) { console.error(err); }
                          }} style={{ display: 'none' }} />
                        </label>
                      </div>
                      {card.icon && (
                        <div style={{ background: card.bg || '#333', padding: '10px', borderRadius: '4px', display: 'inline-block' }}>
                          <img src={card.icon} alt="Card Icon Preview" style={{ height: '40px', objectFit: 'contain' }} />
                        </div>
                      )}
                    </div>
                    <div className="admin-col-full">
                      <label className="admin-label">Card Description</label>
                      <textarea value={card.desc || ''} onChange={e => updateArrayItem('workOnCards', idx, 'desc', e.target.value)} rows={3} className="admin-textarea" />
                    </div>
                    <div>
                      <label className="admin-label">Background Color Hex</label>
                      <input type="text" value={card.bg || ''} onChange={e => updateArrayItem('workOnCards', idx, 'bg', e.target.value)} className="admin-input" placeholder="#16333c" />
                    </div>
                    <div>
                      <label className="admin-label">Card Arrow Link/URL</label>
                      <input type="text" value={card.link || ''} onChange={e => updateArrayItem('workOnCards', idx, 'link', e.target.value)} className="admin-input" placeholder="#" />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                className="admin-btn-add"
                onClick={() => addArrayItem('workOnCards', { title: 'New Area', desc: '', icon: '', bg: '#16333c', link: '#' })}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Add New "Work On" Card
              </button>
            </div>
          </div>
        </div>

        {/* BRAND IDENTITY */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">4</span>
            <h2>Brand Identity Block</h2>
          </div>
          
          <div className="admin-form-body">
            <div className="admin-grid">
              <div>
                <label className="admin-label">Section Title</label>
                <textarea value={data?.brandIdentity?.title || ''} onChange={e => setData(prev => ({...prev, brandIdentity: {...(prev?.brandIdentity || {}), title: e.target.value}}))} className="admin-textarea" rows={2} />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Short Description</label>
                <textarea value={data?.brandIdentity?.description || ''} onChange={e => setData(prev => ({...prev, brandIdentity: {...(prev?.brandIdentity || {}), description: e.target.value}}))} rows={2} className="admin-textarea" />
              </div>

              {/* Left Side Component */}
              <div className="admin-col-full" style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>Left Section (Logo & CTA)</h3>
                <div className="admin-grid">
                  <div>
                    <label className="admin-label">Logo Image Upload</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input type="text" value={data?.brandIdentity?.logoImage || ''} onChange={e => setData(prev => ({...prev, brandIdentity: {...(prev?.brandIdentity || {}), logoImage: e.target.value}}))} className="admin-input" placeholder="/hubfs/old_new_tridiagonal.webp" />
                      <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                        Upload
                        <input type="file" accept="image/*" onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await fetch(`${API_URL}/api/upload`, { method: 'POST', headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }, body: formData});
                            const json = await res.json();
                            if (json.url) setData(prev => ({...prev, brandIdentity: {...(prev?.brandIdentity || {}), logoImage: json.url}}));
                          } catch (err) { console.error(err); }
                        }} style={{ display: 'none' }} />
                      </label>
                    </div>
                    {data?.brandIdentity?.logoImage && (
                      <div style={{ background: '#242424', padding: '10px', borderRadius: '4px' }}>
                        <img src={data.brandIdentity.logoImage} alt="Logo preview" style={{ height: '60px', objectFit: 'contain' }} />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="admin-label">CTA Button Text</label>
                    <input type="text" value={data?.brandIdentity?.ctaText || ''} onChange={e => setData(prev => ({...prev, brandIdentity: {...(prev?.brandIdentity || {}), ctaText: e.target.value}}))} className="admin-input" placeholder="READ MORE" />
                  </div>
                  <div>
                    <label className="admin-label">CTA Button Link</label>
                    <input type="text" value={data?.brandIdentity?.ctaLink || ''} onChange={e => setData(prev => ({...prev, brandIdentity: {...(prev?.brandIdentity || {}), ctaLink: e.target.value}}))} className="admin-input" placeholder="/events/tridiagonal-solutions-new-identity" />
                  </div>
                </div>
              </div>

              {/* Right Side Video Component */}
              <div className="admin-col-full" style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>Right Section (Video)</h3>
                <div className="admin-grid">
                  <div>
                    <label className="admin-label">Video File Upload (.mp4)</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input type="text" value={data?.brandIdentity?.modalVideoUrl || ''} onChange={e => setData(prev => ({...prev, brandIdentity: {...(prev?.brandIdentity || {}), modalVideoUrl: e.target.value}}))} className="admin-input" placeholder="/hubfs/brand_video.mp4" />
                      <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                        Upload
                        <input type="file" accept="video/*" onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await fetch(`${API_URL}/api/upload`, { method: 'POST', headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }, body: formData});
                            const json = await res.json();
                            if (json.url) setData(prev => ({...prev, brandIdentity: {...(prev?.brandIdentity || {}), modalVideoUrl: json.url}}));
                          } catch (err) { console.error(err); }
                        }} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="admin-label">Video Thumbnail / Poster Image</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input type="text" value={data?.brandIdentity?.thumbnailImage || ''} onChange={e => setData(prev => ({...prev, brandIdentity: {...(prev?.brandIdentity || {}), thumbnailImage: e.target.value}}))} className="admin-input" placeholder="/hubfs/Capture-1.webp" />
                      <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                        Upload
                        <input type="file" accept="image/*" onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await fetch(`${API_URL}/api/upload`, { method: 'POST', headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }, body: formData});
                            const json = await res.json();
                            if (json.url) setData(prev => ({...prev, brandIdentity: {...(prev?.brandIdentity || {}), thumbnailImage: json.url}}));
                          } catch (err) { console.error(err); }
                        }} style={{ display: 'none' }} />
                      </label>
                    </div>
                    {data?.brandIdentity?.thumbnailImage && (
                      <div style={{ background: '#242424', padding: '10px', borderRadius: '4px' }}>
                         <img src={data.brandIdentity.thumbnailImage} alt="Video Thumbnail Poster" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* KEY HIGHLIGHTS / COUNTERS */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">5</span>
            <h2>Key Highlights & Counters</h2>
          </div>
          <div className="admin-form-body">
            <div className="admin-grid" style={{ marginBottom: '2rem' }}>
              <div>
                <label className="admin-label">Main Title</label>
                <input type="text" value={data?.keyHighlights?.title || ''} onChange={e => setData(prev => ({...prev, keyHighlights: {...(prev?.keyHighlights || {}), title: e.target.value}}))} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Subtitle Description</label>
                <input type="text" value={data?.keyHighlights?.description || ''} onChange={e => setData(prev => ({...prev, keyHighlights: {...(prev?.keyHighlights || {}), description: e.target.value}}))} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">CTA Button Text</label>
                <input type="text" value={data?.keyHighlights?.ctaText || ''} onChange={e => setData(prev => ({...prev, keyHighlights: {...(prev?.keyHighlights || {}), ctaText: e.target.value}}))} className="admin-input" placeholder="ABOUT US" />
              </div>
              <div>
                <label className="admin-label">CTA Button Link</label>
                <input type="text" value={data?.keyHighlights?.ctaLink || ''} onChange={e => setData(prev => ({...prev, keyHighlights: {...(prev?.keyHighlights || {}), ctaLink: e.target.value}}))} className="admin-input" placeholder="/about-us" />
              </div>
            </div>
            
            <h3 className="admin-label" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem', fontSize: '1rem' }}>Statistic Counters</h3>
            <div className="admin-array-list">
              {(data?.keyHighlights?.counters || []).map((card, idx) => (
                <div key={idx} className="admin-array-card" style={{ background: '#fff' }}>
                  <div className="admin-array-card-header">
                    <h3 className="admin-array-card-title">Statistic #{idx + 1}</h3>
                    <button type="button" onClick={() => {
                        const newArray = [...(data.keyHighlights.counters || [])];
                        newArray.splice(idx, 1);
                        setData(p => ({...p, keyHighlights: {...p.keyHighlights, counters: newArray}}));
                    }} className="admin-btn-remove">Remove Counter</button>
                  </div>
                  <div className="admin-grid" style={{ gridTemplateColumns: '1fr 1fr 2fr' }}>
                    <div>
                      <label className="admin-label">Numeric Value</label>
                      <input type="number" value={card.value || 0} onChange={e => {
                        const newArray = [...(data.keyHighlights.counters || [])];
                        newArray[idx] = { ...newArray[idx], value: parseFloat(e.target.value) };
                        setData(p => ({...p, keyHighlights: {...p.keyHighlights, counters: newArray}}));
                      }} className="admin-input" />
                    </div>
                    <div>
                      <label className="admin-label">Suffix (e.g. '+M$')</label>
                      <input type="text" value={card.suffix || ''} onChange={e => {
                        const newArray = [...(data.keyHighlights.counters || [])];
                        newArray[idx] = { ...newArray[idx], suffix: e.target.value };
                        setData(p => ({...p, keyHighlights: {...p.keyHighlights, counters: newArray}}));
                      }} className="admin-input" />
                    </div>
                    <div>
                      <label className="admin-label">Statistic Label / Text</label>
                      <input type="text" value={card.label || ''} onChange={e => {
                        const newArray = [...(data.keyHighlights.counters || [])];
                        newArray[idx] = { ...newArray[idx], label: e.target.value };
                        setData(p => ({...p, keyHighlights: {...p.keyHighlights, counters: newArray}}));
                      }} className="admin-input" />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="admin-btn-add" onClick={() => {
                 const newArray = [...(data?.keyHighlights?.counters || []), { value: 0, suffix: '+', label: 'New Metric' }];
                 setData(p => ({...p, keyHighlights: {...p.keyHighlights, counters: newArray}}));
              }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Add Numeric Statistic
              </button>
            </div>
          </div>
        </div>

        {/* USE CASES SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">6</span>
            <h2>Use Cases Carousel</h2>
          </div>
          <div className="admin-form-body">
            <div className="admin-grid" style={{ marginBottom: '2rem' }}>
              <div>
                <label className="admin-label">Section Title</label>
                <input type="text" value={data?.useCasesSection?.title || ''} onChange={e => setData(prev => ({...prev, useCasesSection: {...(prev?.useCasesSection || {}), title: e.target.value}}))} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">CTA Button Text</label>
                <input type="text" value={data?.useCasesSection?.ctaText || ''} onChange={e => setData(prev => ({...prev, useCasesSection: {...(prev?.useCasesSection || {}), ctaText: e.target.value}}))} className="admin-input" placeholder="VIEW ALL USE CASES" />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">CTA Button Link</label>
                <input type="text" value={data?.useCasesSection?.ctaLink || ''} onChange={e => setData(prev => ({...prev, useCasesSection: {...(prev?.useCasesSection || {}), ctaLink: e.target.value}}))} className="admin-input" placeholder="/use-cases" />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Section Description</label>
                <textarea value={data?.useCasesSection?.description || ''} onChange={e => setData(prev => ({...prev, useCasesSection: {...(prev?.useCasesSection || {}), description: e.target.value}}))} rows={3} className="admin-textarea" />
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#1e293b' }}>Carousel Content Mode</h3>
              
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" checked={data?.useCasesSection?.displayMode === 'latest'} onChange={() => setData(prev => ({...prev, useCasesSection: {...(prev?.useCasesSection || {}), displayMode: 'latest'}}))} />
                  <span>Auto Latest Case Studies</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="radio" checked={data?.useCasesSection?.displayMode === 'manual'} onChange={() => setData(prev => ({...prev, useCasesSection: {...(prev?.useCasesSection || {}), displayMode: 'manual'}}))} />
                  <span>Manual Selection</span>
                </label>
              </div>

              {data?.useCasesSection?.displayMode === 'latest' ? (
                <div>
                  <label className="admin-label">Number of Latest Cases to Show</label>
                  <input type="number" value={data?.useCasesSection?.latestCount || 4} onChange={e => setData(prev => ({...prev, useCasesSection: {...(prev?.useCasesSection || {}), latestCount: parseInt(e.target.value) || 4}}))} className="admin-input" style={{ maxWidth: '120px' }} />
                </div>
              ) : (
                <div className="admin-col-full">
                  <label className="admin-label">Select Case Studies (Manual)</label>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '10px' }}>Select the specific case studies you want to appear in the carousel.</p>
                  
                  <div style={{ maxHeight: '300px', overflowY: 'auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
                    {allCaseStudies.length === 0 ? (
                      <p style={{ padding: '10px', textAlign: 'center', color: '#94a3b8' }}>No case studies found in database.</p>
                    ) : (
                      allCaseStudies.map(blog => (
                        <label key={blog._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={(data?.useCasesSection?.manualSelectedCards || []).includes(blog._id)} 
                            onChange={(e) => {
                              const currentSelected = data?.useCasesSection?.manualSelectedCards || [];
                              const newSelected = e.target.checked 
                                ? [...currentSelected, blog._id]
                                : currentSelected.filter(id => id !== blog._id);
                              setData(prev => ({...prev, useCasesSection: {...(prev?.useCasesSection || {}), manualSelectedCards: newSelected}}));
                            }}
                          />
                          <img src={blog.coverImage} alt="" style={{ width: '40px', height: '30px', objectFit: 'cover', borderRadius: '4px' }} />
                          <span style={{ fontSize: '0.9rem' }}>{blog.title}</span>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TECHNOLOGY PARTNERS SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">7</span>
            <h2>Technology Partners</h2>
          </div>
          <div className="admin-form-body">
            <div className="admin-grid" style={{ marginBottom: '2rem' }}>
              <div>
                <label className="admin-label">Section Title</label>
                <input type="text" value={data?.partnersSection?.title || ''} onChange={e => setData(prev => ({...prev, partnersSection: {...(prev?.partnersSection || {}), title: e.target.value}}))} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">CTA Button Text</label>
                <input type="text" value={data?.partnersSection?.ctaText || ''} onChange={e => setData(prev => ({...prev, partnersSection: {...(prev?.partnersSection || {}), ctaText: e.target.value}}))} className="admin-input" />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">CTA Button Link</label>
                <input type="text" value={data?.partnersSection?.ctaLink || ''} onChange={e => setData(prev => ({...prev, partnersSection: {...(prev?.partnersSection || {}), ctaLink: e.target.value}}))} className="admin-input" />
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', color: '#475569', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>Manage Marquee Logos</h3>
            <div className="admin-array-list">
              {(data?.partnersSection?.logos || []).map((logo, idx) => (
                <div key={idx} className="admin-array-card" style={{ background: '#fff' }}>
                  <div className="admin-array-card-header">
                    <h3 className="admin-array-card-title">Logo #{idx + 1}</h3>
                    <button type="button" onClick={() => {
                      const newLogos = [...(data.partnersSection.logos || [])];
                      newLogos.splice(idx, 1);
                      setData(p => ({...p, partnersSection: {...p.partnersSection, logos: newLogos}}));
                    }} className="admin-btn-remove">Remove Logo</button>
                  </div>
                  <div className="admin-grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
                    <div>
                      <label className="admin-label">Partner Name</label>
                      <input type="text" value={logo.name || ''} onChange={e => {
                        const newLogos = [...(data.partnersSection.logos || [])];
                        newLogos[idx] = { ...newLogos[idx], name: e.target.value };
                        setData(p => ({...p, partnersSection: {...p.partnersSection, logos: newLogos}}));
                      }} className="admin-input" />
                    </div>
                    <div>
                      <label className="admin-label">Partner Logo</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {logo.image && <img src={logo.image} alt="" style={{ height: '40px', objectFit: 'contain', background: '#f1f5f9', padding: '4px', borderRadius: '4px' }} />}
                        <input type="file" accept="image/*" onChangeCapture={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await fetch(`${API_URL}/api/upload`, {
                              method: 'POST',
                              headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
                              body: formData
                            });
                            const json = await res.json();
                            if (json.url) {
                              const newLogos = [...(data.partnersSection.logos || [])];
                              newLogos[idx] = { ...newLogos[idx], image: json.url };
                              setData(p => ({...p, partnersSection: {...p.partnersSection, logos: newLogos}}));
                            }
                          } catch (err) { console.error('Logo upload error', err); }
                        }} className="admin-input-file" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="admin-btn-add" onClick={() => {
                const newLogos = [...(data?.partnersSection?.logos || []), { name: 'New Partner', image: '' }];
                setData(p => ({...p, partnersSection: {...p.partnersSection, logos: newLogos}}));
              }}>+ Add Partner Logo</button>
            </div>
          </div>
        </div>

        {/* RESOURCES SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">8</span>
            <h2>Resources Section</h2>
          </div>
          <div className="admin-form-body">
            <div className="admin-grid" style={{ marginBottom: '2rem' }}>
              <div>
                <label className="admin-label">Section Title</label>
                <input type="text" value={data?.resourcesSection?.title || ''} onChange={e => setData(prev => ({...prev, resourcesSection: {...(prev?.resourcesSection || {}), title: e.target.value}}))} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Display Mode</label>
                <select 
                  value={data?.resourcesSection?.displayMode || 'latest'} 
                  onChange={e => setData(prev => ({...prev, resourcesSection: {...(prev?.resourcesSection || {}), displayMode: e.target.value}}))} 
                  className="admin-input"
                >
                  <option value="latest">Auto: Latest post from each category</option>
                  <option value="manual">Manual: Pick specific posts</option>
                </select>
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Section Description</label>
                <textarea value={data?.resourcesSection?.description || ''} onChange={e => setData(prev => ({...prev, resourcesSection: {...(prev?.resourcesSection || {}), description: e.target.value}}))} className="admin-textarea" rows={2} />
              </div>
              <div>
                <label className="admin-label">Main CTA Button Text</label>
                <input type="text" value={data?.resourcesSection?.ctaText || ''} onChange={e => setData(prev => ({...prev, resourcesSection: {...(prev?.resourcesSection || {}), ctaText: e.target.value}}))} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Main CTA Button Link</label>
                <input type="text" value={data?.resourcesSection?.ctaLink || ''} onChange={e => setData(prev => ({...prev, resourcesSection: {...(prev?.resourcesSection || {}), ctaLink: e.target.value}}))} className="admin-input" />
              </div>
            </div>

            {/* Vertical Category Links */}
            <h3 style={{ fontSize: '1rem', color: '#475569', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>Vertical Category Links</h3>
            <div className="admin-array-list" style={{ marginBottom: '2.5rem' }}>
              {(data?.resourcesSection?.categories || []).map((cat, idx) => (
                <div key={idx} className="admin-array-card" style={{ background: '#f8fafc' }}>
                  <div className="admin-grid" style={{ gridTemplateColumns: '1fr 1fr auto', alignItems: 'end', gap: '10px' }}>
                    <div>
                      <label className="admin-label">Label (e.g. USE CASES)</label>
                      <input type="text" value={cat.label || ''} onChange={e => {
                        const newCats = [...(data.resourcesSection.categories || [])];
                        newCats[idx] = { ...newCats[idx], label: e.target.value };
                        setData(p => ({...p, resourcesSection: {...p.resourcesSection, categories: newCats}}));
                      }} className="admin-input" />
                    </div>
                    <div>
                      <label className="admin-label">Link</label>
                      <input type="text" value={cat.link || ''} onChange={e => {
                        const newCats = [...(data.resourcesSection.categories || [])];
                        newCats[idx] = { ...newCats[idx], link: e.target.value };
                        setData(p => ({...p, resourcesSection: {...p.resourcesSection, categories: newCats}}));
                      }} className="admin-input" />
                    </div>
                    <button type="button" onClick={() => {
                      const newCats = [...(data.resourcesSection.categories || [])];
                      newCats.splice(idx, 1);
                      setData(p => ({...p, resourcesSection: {...p.resourcesSection, categories: newCats}}));
                    }} className="admin-btn-remove" style={{ marginBottom: '4px' }}>Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" className="admin-btn-add" onClick={() => {
                const newCats = [...(data?.resourcesSection?.categories || []), { label: 'NEW CATEGORY', link: '#' }];
                setData(p => ({...p, resourcesSection: {...p.resourcesSection, categories: newCats}}));
              }}>+ Add Category</button>
            </div>

            {/* Featured Slides Selection (Only if Manual) */}
            {data?.resourcesSection?.displayMode === 'manual' ? (
              <>
                <h3 style={{ fontSize: '1rem', color: '#475569', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>Right-Side Featured Slides (Manual Selection)</h3>
                <div className="admin-array-list">
                  {(data?.resourcesSection?.manualSlides || []).map((ms, idx) => (
                    <div key={idx} className="admin-array-card" style={{ background: '#fff' }}>
                      <div className="admin-array-card-header">
                        <h3 className="admin-array-card-title">Slide #{idx + 1}</h3>
                        <button type="button" onClick={() => {
                          const newM = [...(data.resourcesSection.manualSlides || [])];
                          newM.splice(idx, 1);
                          setData(p => ({...p, resourcesSection: {...p.resourcesSection, manualSlides: newM}}));
                        }} className="admin-btn-remove">Remove</button>
                      </div>
                      <div className="admin-grid">
                        <div>
                          <label className="admin-label">Type Label (e.g. WEBINARS)</label>
                          <input type="text" value={ms.typeStr || ''} onChange={e => {
                            const newM = [...(data.resourcesSection.manualSlides || [])];
                            newM[idx] = { ...newM[idx], typeStr: e.target.value };
                            setData(p => ({...p, resourcesSection: {...p.resourcesSection, manualSlides: newM}}));
                          }} className="admin-input" />
                        </div>
                        <div>
                          <label className="admin-label">Select Post</label>
                          <select 
                            value={ms.blogId || ''} 
                            onChange={e => {
                              const newM = [...(data.resourcesSection.manualSlides || [])];
                              newM[idx] = { ...newM[idx], blogId: e.target.value };
                              setData(p => ({...p, resourcesSection: {...p.resourcesSection, manualSlides: newM}}));
                            }} 
                            className="admin-input"
                          >
                            <option value="">-- Choose a post --</option>
                            {allBlogs.map(b => (
                              <option key={b._id} value={b._id}>[{b.category}] {b.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="admin-btn-add" onClick={() => {
                    const newM = [...(data?.resourcesSection?.manualSlides || []), { typeStr: 'NEW', blogId: '' }];
                    setData(p => ({...p, resourcesSection: {...p.resourcesSection, manualSlides: newM}}));
                  }}>+ Add Manual Slide Selection</button>
                </div>
              </>
            ) : (
              <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '8px', border: '1px solid #bae6fd', color: '#0369a1', fontSize: '0.9rem' }}>
                <strong>Auto Mode Active:</strong> The carousel will automatically display the latest post from each of the following categories: 
                <ul style={{ marginTop: '0.5rem', marginLeft: '1.2rem' }}>
                  <li><strong>Webinars</strong> (Type: WEBINARS)</li>
                  <li><strong>Tech Blog</strong> (Type: BLOGS)</li>
                  <li><strong>Brochure</strong> (Type: BROCHURE)</li>
                  <li><strong>Publication</strong> (Type: PUBLICATIONS)</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* CULTURE & PEOPLE SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">9</span>
            <h2>Culture & People</h2>
          </div>
          <div className="admin-form-body">
            <div className="admin-grid" style={{ marginBottom: '2rem' }}>
              <div className="admin-col-full">
                <label className="admin-label">Section Title</label>
                <input type="text" value={data?.cultureSection?.title || ''} onChange={e => setData(prev => ({...prev, cultureSection: {...prev.cultureSection, title: e.target.value}}))} className="admin-input" />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Section Description</label>
                <textarea value={data?.cultureSection?.description || ''} onChange={e => setData(prev => ({...prev, cultureSection: {...prev.cultureSection, description: e.target.value}}))} className="admin-textarea" rows={3} />
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', color: '#475569', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>Career Card</h3>
            <div className="admin-grid" style={{ marginBottom: '2rem' }}>
              <div className="admin-col-full">
                <label className="admin-label">Card Heading</label>
                <input type="text" value={data?.cultureSection?.cardHeading || ''} onChange={e => setData(prev => ({...prev, cultureSection: {...prev.cultureSection, cardHeading: e.target.value}}))} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Button 1 Text</label>
                <input type="text" value={data?.cultureSection?.button1Text || ''} onChange={e => setData(prev => ({...prev, cultureSection: {...prev.cultureSection, button1Text: e.target.value}}))} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Button 1 Link</label>
                <input type="text" value={data?.cultureSection?.button1Link || ''} onChange={e => setData(prev => ({...prev, cultureSection: {...prev.cultureSection, button1Link: e.target.value}}))} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Button 2 Text</label>
                <input type="text" value={data?.cultureSection?.button2Text || ''} onChange={e => setData(prev => ({...prev, cultureSection: {...prev.cultureSection, button2Text: e.target.value}}))} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Button 2 Link</label>
                <input type="text" value={data?.cultureSection?.button2Link || ''} onChange={e => setData(prev => ({...prev, cultureSection: {...prev.cultureSection, button2Link: e.target.value}}))} className="admin-input" />
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', color: '#475569', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>Masonry Image Grid</h3>
            <div className="admin-grid" style={{ gap: '20px' }}>
              {[1, 2, 3, 4].map(num => (
                <div key={num} style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <label className="admin-label">Image {num}</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {data?.cultureSection?.[`image${num}`] ? (
                      <img src={data.cultureSection[`image${num}`]} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.8rem', borderRadius: '4px' }}>No Image</div>
                    )}
                    <input type="file" onChangeCapture={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append('file', file);
                      try {
                        const res = await fetch(`${API_URL}/api/upload`, {
                          method: 'POST',
                          headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
                          body: formData
                        });
                        const json = await res.json();
                        if (json.url) {
                          setData(p => ({...p, cultureSection: {...p.cultureSection, [`image${num}`]: json.url}}));
                        }
                      } catch (err) { console.error('Upload error', err); }
                    }} className="admin-input-file" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TRUSTED PARTNER BANNER SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">10</span>
            <h2>Trusted Partner Banner</h2>
          </div>
          <div className="admin-form-body">
            <div className="admin-grid">
              <div className="admin-col-full">
                <label className="admin-label">Banner Title (supports \n for line breaks)</label>
                <textarea value={data?.trustedPartnerSection?.title || ''} onChange={e => setData(prev => ({...prev, trustedPartnerSection: {...prev.trustedPartnerSection, title: e.target.value}}))} className="admin-textarea" rows={2} />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Banner Description</label>
                <textarea value={data?.trustedPartnerSection?.description || ''} onChange={e => setData(prev => ({...prev, trustedPartnerSection: {...prev.trustedPartnerSection, description: e.target.value}}))} className="admin-textarea" rows={3} />
              </div>
              <div>
                <label className="admin-label">CTA Button Text</label>
                <input type="text" value={data?.trustedPartnerSection?.ctaText || ''} onChange={e => setData(prev => ({...prev, trustedPartnerSection: {...prev.trustedPartnerSection, ctaText: e.target.value}}))} className="admin-input" />
              </div>
              <div>
                <label className="admin-label">CTA Button Link</label>
                <input type="text" value={data?.trustedPartnerSection?.ctaLink || ''} onChange={e => setData(prev => ({...prev, trustedPartnerSection: {...prev.trustedPartnerSection, ctaLink: e.target.value}}))} className="admin-input" />
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
