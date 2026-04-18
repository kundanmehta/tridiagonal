'use client';
import { useState, useEffect } from 'react';
import RichTextEditor from '../../../../components/RichTextEditor';

export default function AdminPrivacyPolicyEditor() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  // Accordion state
  const [expandedSection, setExpandedSection] = useState(1);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setMessage('Session expired. Please login again.');
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/privacy-policy`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(json => {
      const fetchedData = json.data || {};
      setData({
        hero: {
          titleLine1: fetchedData.hero?.titleLine1 || "Privacy",
          titleLine2: fetchedData.hero?.titleLine2 || "Policy",
          description: fetchedData.hero?.description || "We are committed to protecting your privacy and ensuring your data is handled securely.",
        },
        contentSections: fetchedData.contentSections && Array.isArray(fetchedData.contentSections) 
          ? fetchedData.contentSections 
          : [{ title: 'Introduction', content: '' }]
      });
      setLoading(false);
    })
    .catch(err => {
      console.error('Fetch error:', err);
      setMessage(`Failed to load data: ${err.message}`);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setMessage('');
    
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setMessage('Error: You are not authorized. Please login.');
      setSaving(false);
      return;
    }

    try {
      // Final sanitization of all content sections before saving
      const sanitizedData = {
        ...data,
        contentSections: data.contentSections.map(sec => ({
          ...sec,
          content: sec.content ? sec.content.replace(/&nbsp;/g, ' ').replace(/ +/g, ' ') : ''
        }))
      };

      const res = await fetch(`${API_URL}/api/privacy-policy`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(sanitizedData)
      });
      
      const result = await res.json();
      
      if (res.ok) {
        setMessage('Privacy Policy updated successfully!');
        // Refresh local data with response if available
        if (result.data) {
           setData(prev => ({...prev, ...result.data}));
        }
      } else {
        setMessage(`Error: ${result.error || result.message || 'Failed to save changes'}`);
      }
    } catch (err) {
      setMessage(`Network error: ${err.message}`);
    }
    setSaving(false);
  };

  const updateHero = (field, value) => {
    setData(prev => {
      const hero = prev?.hero || {};
      return { ...prev, hero: { ...hero, [field]: value } };
    });
  };

  const updateContentSection = (index, field, value) => {
    setData(prev => {
      if (!prev) return prev;
      const newSections = [...(prev.contentSections || [])];
      newSections[index] = { ...newSections[index], [field]: value };
      return { ...prev, contentSections: newSections };
    });
  };

  const addContentSection = () => {
    setData(prev => {
      if (!prev) return prev;
      return { 
        ...prev, 
        contentSections: [...(prev.contentSections || []), { title: 'New Section', content: '' }]
      };
    });
  };

  const removeContentSection = (index) => {
    setData(prev => {
      if (!prev) return prev;
      const newSections = [...(prev.contentSections || [])];
      newSections.splice(index, 1);
      return { ...prev, contentSections: newSections };
    });
  };

  const isExpanded = (id) => expandedSection === id;
  const toggleSection = (id) => setExpandedSection(prev => prev === id ? null : id);

  if (loading) return <div style={{ padding: '3rem', color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Loading Privacy Policy environment...</div>;

  return (
    <div className="admin-editor-wrap">
      <style>{`
        /* 
         * Modern Light Dashboard Theme (Imported from Home Builder)
         */
        body {
          background-color: #f8fafc;
        }
        .admin-editor-wrap {
          max-width: 100%;
          margin: 0 auto;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #0f172a;
          padding-bottom: 6rem;
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
          cursor: pointer;
          user-select: none;
          transition: background 0.2s;
        }
        .admin-section-header:hover {
          background: #f1f5f9;
        }
        
        .admin-section-header h2 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          letter-spacing: -0.01em;
          flex: 1;
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
          width: 100%;
          border: 2px dashed #cbd5e1;
          background: transparent;
          color: #64748b;
          font-weight: 600;
          padding: 1.25rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .admin-btn-add:hover {
          border-color: #00AEEF;
          color: #00AEEF;
          background: #f0f9ff;
        }
        
        .admin-chevron {
          transition: transform 0.3s ease;
          color: #94a3b8;
        }
        .admin-chevron.open {
          transform: rotate(180deg);
          color: #00AEEF;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .opacity-25 { opacity: 0.25; }
        .opacity-75 { opacity: 0.75; }
      `}</style>

      <div className="admin-header">
        <h1 className="admin-title">Privacy Policy Builder</h1>
        <p className="admin-subtitle">Modify the global configuration for your privacy policy.</p>
      </div>

      {message && (
        <div className={`admin-msg ${message.includes('successfully') ? 'msg-success' : 'msg-error'}`}>
          {message.includes('successfully') ? (
            <svg style={{width:'20px', height:'20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          ) : (
            <svg style={{width:'20px', height:'20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          )}
          {message}
        </div>
      )}

      <form onSubmit={handleSave}>

        {/* 1. HERO SECTION */}
        <div className="admin-section">
          <div className="admin-section-header" onClick={() => toggleSection(1)}>
            <span className="admin-badge">1</span>
            <h2>Hero Banner</h2>
            <svg className={`admin-chevron ${isExpanded(1) ? 'open' : ''}`} width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {isExpanded(1) && (
            <div className="admin-form-body">
              <div className="admin-grid">
                <div>
                  <label className="admin-label">Title Line 1</label>
                  <input type="text" value={data?.hero?.titleLine1 || ''} onChange={e => updateHero('titleLine1', e.target.value)} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">Title Line 2</label>
                  <input type="text" value={data?.hero?.titleLine2 || ''} onChange={e => updateHero('titleLine2', e.target.value)} className="admin-input" />
                </div>
                <div className="admin-col-full">
                  <label className="admin-label">Description</label>
                  <textarea value={data?.hero?.description || ''} onChange={e => updateHero('description', e.target.value)} className="admin-textarea" rows={3} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. DYNAMIC CONTENT SECTIONS */}
        <div className="admin-section">
          <div className="admin-section-header" onClick={() => toggleSection(2)}>
            <span className="admin-badge">2</span>
            <h2>Document Content Sections</h2>
            <svg className={`admin-chevron ${isExpanded(2) ? 'open' : ''}`} width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          {isExpanded(2) && (
            <div className="admin-form-body">
              <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Manage the main privacy policy sections. You can use standard HTML like &lt;p&gt;, &lt;ul&gt;, and &lt;strong&gt; for formatting.
              </p>
              
              <div className="admin-array-list">
                {data?.contentSections?.map((sec, idx) => (
                  <div key={idx} className="admin-array-card">
                    <div className="admin-array-card-header">
                      <h4 className="admin-array-card-title">Section {idx + 1}</h4>
                      <button type="button" onClick={() => removeContentSection(idx)} className="admin-btn-remove">Remove</button>
                    </div>
                    
                    <div className="admin-grid" style={{ marginBottom: '1.5rem' }}>
                      <div className="admin-col-full">
                        <label className="admin-label">Heading</label>
                        <input
                          type="text"
                          value={sec.title || ''}
                          onChange={(e) => updateContentSection(idx, 'title', e.target.value)}
                          className="admin-input"
                          placeholder="e.g., Data Controller"
                        />
                      </div>
                      
                      <div className="admin-col-full">
                        <RichTextEditor
                          value={sec.content || ''}
                          onChange={(val) => updateContentSection(idx, 'content', val)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button type="button" onClick={addContentSection} className="admin-btn-add">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                  Add New Section
                </button>
              </div>
            </div>
          )}
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

      </form>
    </div>
  );
}
