'use client';
import { useState, useEffect } from 'react';

export default function AdminContactPageEditor() {
  const [data, setData] = useState(null);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    Promise.all([
      fetch(`${API_URL}/api/contactpage`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
      fetch(`${API_URL}/api/forms`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
    ]).then(([pageJson, formsJson]) => {
      const d = pageJson.data || {};
      setData({
        heroSection: {
          title: d.heroSection?.title || 'Here To Help',
          description: d.heroSection?.description || 'Reach out to our experts today.'
        },
        infoCards: d.infoCards?.length > 0 ? d.infoCards : [
          { iconSvg: '', title: 'Sales', description: 'Interested in learning more about Tridiagonal? Request a consultation', link: '' },
          { iconSvg: '', title: 'Careers', description: 'Looking to help others thrive in their personal and professional lives? Check out our open positions', link: '/careers' }
        ],
        selectedFormId: d.selectedFormId?._id || d.selectedFormId || '',
        officesSection: {
          heading: d.officesSection?.heading || 'Our Global Offices',
          description: d.officesSection?.description || 'Tridiagonal Solutions scales with you across the globe.',
          offices: d.officesSection?.offices?.length > 0 ? d.officesSection.offices : [
            {
              region: "North America",
              flagImage: "/hubfs/usa-flag.png",
              companyName: "Tridiagonal Solutions Inc.",
              addresses: [{ label: "", text: "8632 Fredericksburg Road, Suite 101, San Antonio, Texas 78240, USA" }],
              contacts: [
                { type: "phone", label: "+1 (210) 487-8343", value: "tel:+12104878343" },
                { type: "fax", label: "Fax: +1 (210) 468-0699", value: "" },
                { type: "email", label: "info@tridiagonal.com", value: "mailto:info@tridiagonal.com" }
              ]
            },
            {
              region: "India",
              flagImage: "/hubfs/india-flag.png",
              companyName: "Tridiagonal Solutions Pvt. Ltd.",
              addresses: [
                { label: "", text: "Unit 401, 4th Floor, Amar Madhuban Tech Park, Survey No. 43/1 and 44/1/1, Opposite Audi Showroom, Baner, Pune, Maharashtra - 411045" },
                { label: "Scale-Up & Experimental Lab Facility", text: "Gate No.1074 1075 1076, Opp. Utkash Constrowell RMC Plant, Shirwal, Tal Khandala, Shirwal, Satara, Maharashtra, 412801" }
              ],
              contacts: [
                { type: "phone", label: "+91 20 69002000", value: "tel:+912069002000" },
                { type: "phone", label: "Sales Enquiry: +91 7020993061", value: "tel:+917020993061" },
                { type: "phone", label: "Admin Enquiry: +91 8087590308", value: "tel:+918087590308" },
                { type: "email", label: "info@tridiagonal.com", value: "mailto:info@tridiagonal.com" }
              ]
            },
            {
              region: "UAE",
              flagImage: "/hubfs/uae-flag.png",
              companyName: "Tridiagonal Solutions – FZCO",
              addresses: [{ label: "", text: "Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates" }],
              contacts: [
                { type: "email", label: "info@tridiagonal.com", value: "mailto:info@tridiagonal.com" }
              ]
            }
          ]
        },
        ctaSection: {
          heading: d.ctaSection?.heading || 'Seeking to thrive in your professional life?',
          buttonText: d.ctaSection?.buttonText || 'CHECK OUT OUR OPEN POSITIONS',
          buttonLink: d.ctaSection?.buttonLink || '/careers',
          backgroundImage: d.ctaSection?.backgroundImage || '/hubfs/topography-bg.webp'
        }
      });
      setForms(formsJson.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/api/contactpage`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
        body: JSON.stringify(data)
      });
      if (res.ok) setMessage('Contact Page updated successfully!');
      else setMessage('Error saving changes.');
    } catch { setMessage('Network error.'); }
    setSaving(false);
  };

  const handleImageUpload = async (e, callback) => {
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

  const updateSection = (section, field, value) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const updateArrayItem = (section, arrayName, index, field, value) => {
    setData(prev => {
      const items = [...(prev[section]?.[arrayName] || [])];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, [section]: { ...prev[section], [arrayName]: items } };
    });
  };

  const addArrayItem = (section, arrayName, emptyObj) => {
    setData(prev => {
      const items = [...(prev[section]?.[arrayName] || []), emptyObj];
      return { ...prev, [section]: { ...prev[section], [arrayName]: items } };
    });
  };

  const removeArrayItem = (section, arrayName, index) => {
    setData(prev => {
      const items = [...(prev[section]?.[arrayName] || [])];
      items.splice(index, 1);
      return { ...prev, [section]: { ...prev[section], [arrayName]: items } };
    });
  };

  // Info cards (top-level array)
  const updateInfoCard = (index, field, value) => {
    setData(prev => {
      const cards = [...(prev.infoCards || [])];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, infoCards: cards };
    });
  };
  const addInfoCard = () => setData(prev => ({ ...prev, infoCards: [...(prev.infoCards || []), { iconSvg: '', title: '', description: '', link: '' }] }));
  const removeInfoCard = (idx) => setData(prev => { const cards = [...prev.infoCards]; cards.splice(idx, 1); return { ...prev, infoCards: cards }; });

  // Office contacts management
  const addOfficeContact = (officeIdx) => {
    updateArrayItem('officesSection', 'offices', officeIdx, 'contacts', [
      ...(data.officesSection.offices[officeIdx].contacts || []),
      { type: 'phone', label: '', value: '' }
    ]);
  };

  const updateOfficeContact = (officeIdx, contactIdx, field, value) => {
    setData(prev => {
      const offices = [...prev.officesSection.offices];
      const contacts = [...(offices[officeIdx].contacts || [])];
      contacts[contactIdx] = { ...contacts[contactIdx], [field]: value };
      offices[officeIdx] = { ...offices[officeIdx], contacts };
      return { ...prev, officesSection: { ...prev.officesSection, offices } };
    });
  };

  const removeOfficeContact = (officeIdx, contactIdx) => {
    setData(prev => {
      const offices = [...prev.officesSection.offices];
      const contacts = [...(offices[officeIdx].contacts || [])];
      contacts.splice(contactIdx, 1);
      offices[officeIdx] = { ...offices[officeIdx], contacts };
      return { ...prev, officesSection: { ...prev.officesSection, offices } };
    });
  };

  // Office addresses
  const addOfficeAddress = (officeIdx) => {
    setData(prev => {
      const offices = [...prev.officesSection.offices];
      offices[officeIdx] = {
        ...offices[officeIdx],
        addresses: [...(offices[officeIdx].addresses || []), { label: '', text: '' }]
      };
      return { ...prev, officesSection: { ...prev.officesSection, offices } };
    });
  };

  const updateOfficeAddress = (officeIdx, addrIdx, field, value) => {
    setData(prev => {
      const offices = [...prev.officesSection.offices];
      const addresses = [...(offices[officeIdx].addresses || [])];
      addresses[addrIdx] = { ...addresses[addrIdx], [field]: value };
      offices[officeIdx] = { ...offices[officeIdx], addresses };
      return { ...prev, officesSection: { ...prev.officesSection, offices } };
    });
  };

  const removeOfficeAddress = (officeIdx, addrIdx) => {
    setData(prev => {
      const offices = [...prev.officesSection.offices];
      const addresses = [...(offices[officeIdx].addresses || [])];
      addresses.splice(addrIdx, 1);
      offices[officeIdx] = { ...offices[officeIdx], addresses };
      return { ...prev, officesSection: { ...prev.officesSection, offices } };
    });
  };

  if (loading) return <div style={{ padding: '3rem', color: '#64748b' }}>Loading Contact Page environment...</div>;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a', paddingBottom: '6rem' }}>
      <style>{`
        .admin-section { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; margin-bottom: 2.5rem; overflow: hidden; }
        .admin-section-header { background: #f8fafc; padding: 1.25rem 2rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 14px; }
        .admin-badge { background: #00AEEF; color: #fff; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 700; }
        .admin-form-body { padding: 2rem; }
        .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .admin-label { display: block; font-size: 0.875rem; font-weight: 600; color: #475569; margin-bottom: 0.5rem; }
        .admin-input, .admin-textarea, .admin-select { width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.75rem 1rem; box-sizing: border-box; font-family: inherit; }
        .admin-input:focus, .admin-textarea:focus, .admin-select:focus { outline: none; border-color: #00AEEF; box-shadow: 0 0 0 3px rgba(0,174,239,0.15); }
        .admin-array-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; }
        .admin-btn-remove { background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
        .admin-btn-add { width: 100%; border: 2px dashed #cbd5e1; background: transparent; color: #64748b; font-weight: 600; padding: 1rem; border-radius: 12px; cursor: pointer; }
        .admin-btn-add:hover { border-color: #00AEEF; color: #00AEEF; }
        .bottom-bar { position: fixed; bottom: 0; left: 260px; right: 0; background: rgba(255,255,255,0.95); border-top: 1px solid #e2e8f0; padding: 1.25rem 3rem; display: flex; justify-content: flex-end; z-index: 100; }
        .admin-btn-save { background: #00AEEF; color: #fff; font-weight: 600; padding: 0.75rem 2.5rem; border: none; border-radius: 8px; cursor: pointer; }
        .sub-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 0.5rem; }
      `}</style>

      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0 }}>Contact Us Settings</h1>
        <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>Manage all content sections for the Contact Us page.</p>
      </div>

      {message && <div style={{ padding: '1rem', marginBottom: '2rem', borderRadius: '8px', background: message.includes('Error') ? '#fef2f2' : '#f0fdf4', color: message.includes('Error') ? '#991b1b' : '#166534', fontWeight: 600 }}>{message}</div>}

      <form onSubmit={handleSave}>
        {/* 1. HERO SECTION */}
        <section className="admin-section">
          <div className="admin-section-header"><span className="admin-badge">1</span><h2 style={{ margin: 0, fontWeight: 700 }}>Hero Section</h2></div>
          <div className="admin-form-body">
            <div className="admin-grid">
              <div>
                <label className="admin-label">Title</label>
                <input className="admin-input" value={data.heroSection.title} onChange={e => updateSection('heroSection', 'title', e.target.value)} />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <input className="admin-input" value={data.heroSection.description} onChange={e => updateSection('heroSection', 'description', e.target.value)} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. INFO CARDS */}
        <section className="admin-section">
          <div className="admin-section-header"><span className="admin-badge">2</span><h2 style={{ margin: 0, fontWeight: 700 }}>Info Cards (Left Column)</h2></div>
          <div className="admin-form-body">
            {data.infoCards?.map((card, idx) => (
              <div key={idx} className="admin-array-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <strong>Card #{idx + 1}</strong>
                  <button type="button" className="admin-btn-remove" onClick={() => removeInfoCard(idx)}>Remove</button>
                </div>
                <div className="admin-grid">
                  <div>
                    <label className="admin-label">Title</label>
                    <input className="admin-input" value={card.title} onChange={e => updateInfoCard(idx, 'title', e.target.value)} />
                  </div>
                  <div>
                    <label className="admin-label">Link (optional)</label>
                    <input className="admin-input" value={card.link} onChange={e => updateInfoCard(idx, 'link', e.target.value)} placeholder="/careers" />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="admin-label">Description</label>
                    <textarea className="admin-textarea" rows={2} value={card.description} onChange={e => updateInfoCard(idx, 'description', e.target.value)} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="admin-label">Icon SVG (paste raw SVG code)</label>
                    <textarea className="admin-textarea" rows={3} value={card.iconSvg} onChange={e => updateInfoCard(idx, 'iconSvg', e.target.value)} placeholder='<svg width="24" height="24" ...' style={{ fontFamily: 'monospace', fontSize: '13px' }} />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="admin-btn-add" onClick={addInfoCard}>+ Add Info Card</button>
          </div>
        </section>

        {/* 3. FORM SELECTOR */}
        <section className="admin-section">
          <div className="admin-section-header"><span className="admin-badge">3</span><h2 style={{ margin: 0, fontWeight: 700 }}>Form Selection (Right Column)</h2></div>
          <div className="admin-form-body">
            <label className="admin-label">Select Form to Display</label>
            <select className="admin-select" value={data.selectedFormId || ''} onChange={e => setData(prev => ({ ...prev, selectedFormId: e.target.value }))}>
              <option value="">-- No Form Selected --</option>
              {forms.map(f => <option key={f._id} value={f._id}>{f.name} ({f.fields?.length} fields)</option>)}
            </select>
            {forms.length === 0 && (
              <p style={{ color: '#f59e0b', marginTop: '0.75rem', fontSize: '14px' }}>⚠ No forms created yet. <a href="/admin/forms" style={{ color: '#00AEEF' }}>Create one in the Form Builder</a></p>
            )}
          </div>
        </section>

        {/* 4. OFFICES */}
        <section className="admin-section">
          <div className="admin-section-header"><span className="admin-badge">4</span><h2 style={{ margin: 0, fontWeight: 700 }}>Global Offices</h2></div>
          <div className="admin-form-body">
            <div className="admin-grid" style={{ marginBottom: '1.5rem' }}>
              <div>
                <label className="admin-label">Heading</label>
                <input className="admin-input" value={data.officesSection.heading} onChange={e => updateSection('officesSection', 'heading', e.target.value)} />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <input className="admin-input" value={data.officesSection.description} onChange={e => updateSection('officesSection', 'description', e.target.value)} />
              </div>
            </div>

            {data.officesSection.offices?.map((office, idx) => (
              <div key={idx} className="admin-array-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <strong>Office #{idx + 1}: {office.region || '(untitled)'}</strong>
                  <button type="button" className="admin-btn-remove" onClick={() => removeArrayItem('officesSection', 'offices', idx)}>Remove</button>
                </div>
                <div className="admin-grid">
                  <div>
                    <label className="admin-label">Region Name</label>
                    <input className="admin-input" value={office.region} onChange={e => updateArrayItem('officesSection', 'offices', idx, 'region', e.target.value)} />
                  </div>
                  <div>
                    <label className="admin-label">Company Name</label>
                    <input className="admin-input" value={office.companyName} onChange={e => updateArrayItem('officesSection', 'offices', idx, 'companyName', e.target.value)} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="admin-label">Flag Image URL</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input className="admin-input" value={office.flagImage} onChange={e => updateArrayItem('officesSection', 'offices', idx, 'flagImage', e.target.value)} style={{ flex: 1 }} />
                      <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                        Upload
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e, (url) => updateArrayItem('officesSection', 'offices', idx, 'flagImage', url))}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                    {office.flagImage ? (
                      <img src={office.flagImage} alt="Flag Preview" style={{ height: '50px', objectFit: 'contain', borderRadius: '4px', background: '#f8fafc', padding: '5px', border: '1px solid #cbd5e1' }} />
                    ) : (
                      <div style={{ height: '50px', border: '1px dashed #cbd5e1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>No image connected</div>
                    )}
                  </div>
                </div>

                {/* Addresses */}
                <div style={{ marginTop: '1rem' }}>
                  <label className="admin-label" style={{ marginBottom: '0.75rem' }}>Addresses</label>
                  {(office.addresses || []).map((addr, aIdx) => (
                    <div key={aIdx} className="sub-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ fontSize: '13px', color: '#64748b' }}>Address #{aIdx + 1}</strong>
                        <button type="button" className="admin-btn-remove" onClick={() => removeOfficeAddress(idx, aIdx)}>×</button>
                      </div>
                      <div className="admin-grid">
                        <div>
                          <label className="admin-label">Label (optional)</label>
                          <input className="admin-input" value={addr.label} onChange={e => updateOfficeAddress(idx, aIdx, 'label', e.target.value)} placeholder="e.g. Scale-Up Lab" />
                        </div>
                        <div>
                          <label className="admin-label">Address Text</label>
                          <input className="admin-input" value={addr.text} onChange={e => updateOfficeAddress(idx, aIdx, 'text', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addOfficeAddress(idx)} style={{ background: 'none', border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', color: '#64748b', fontSize: '13px', fontWeight: 600, marginTop: '0.5rem' }}>+ Add Address</button>
                </div>

                {/* Contacts */}
                <div style={{ marginTop: '1rem' }}>
                  <label className="admin-label" style={{ marginBottom: '0.75rem' }}>Contact Info</label>
                  {(office.contacts || []).map((c, cIdx) => (
                    <div key={cIdx} className="sub-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ fontSize: '13px', color: '#64748b' }}>Contact #{cIdx + 1}</strong>
                        <button type="button" className="admin-btn-remove" onClick={() => removeOfficeContact(idx, cIdx)}>×</button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label className="admin-label">Type</label>
                          <select className="admin-select" value={c.type} onChange={e => updateOfficeContact(idx, cIdx, 'type', e.target.value)}>
                            <option value="phone">Phone</option>
                            <option value="fax">Fax</option>
                            <option value="email">Email</option>
                            <option value="sales">Sales Enquiry</option>
                            <option value="admin">Admin Enquiry</option>
                          </select>
                        </div>
                        <div>
                          <label className="admin-label">Label</label>
                          <input className="admin-input" value={c.label} onChange={e => updateOfficeContact(idx, cIdx, 'label', e.target.value)} placeholder="e.g. +1 (210) 487-8343" />
                        </div>
                        <div>
                          <label className="admin-label">Value (link)</label>
                          <input className="admin-input" value={c.value} onChange={e => updateOfficeContact(idx, cIdx, 'value', e.target.value)} placeholder="tel:+12104878343 or mailto:..." />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addOfficeContact(idx)} style={{ background: 'none', border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer', color: '#64748b', fontSize: '13px', fontWeight: 600, marginTop: '0.5rem' }}>+ Add Contact</button>
                </div>
              </div>
            ))}
            <button type="button" className="admin-btn-add" onClick={() => addArrayItem('officesSection', 'offices', { region: '', flagImage: '', companyName: '', addresses: [], contacts: [] })}>+ Add Office</button>
          </div>
        </section>

        {/* 5. CTA SECTION */}
        <section className="admin-section">
          <div className="admin-section-header"><span className="admin-badge">5</span><h2 style={{ margin: 0, fontWeight: 700 }}>Careers CTA Banner</h2></div>
          <div className="admin-form-body">
            <div className="admin-grid">
              <div style={{ gridColumn: 'span 2' }}>
                <label className="admin-label">Heading</label>
                <textarea className="admin-textarea" rows={2} value={data.ctaSection.heading} onChange={e => updateSection('ctaSection', 'heading', e.target.value)} />
              </div>
              <div>
                <label className="admin-label">Button Text</label>
                <input className="admin-input" value={data.ctaSection.buttonText} onChange={e => updateSection('ctaSection', 'buttonText', e.target.value)} />
              </div>
              <div>
                <label className="admin-label">Button Link</label>
                <input className="admin-input" value={data.ctaSection.buttonLink} onChange={e => updateSection('ctaSection', 'buttonLink', e.target.value)} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label className="admin-label">Background Image URL</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input className="admin-input" value={data.ctaSection.backgroundImage} onChange={e => updateSection('ctaSection', 'backgroundImage', e.target.value)} style={{ flex: 1 }} />
                  <label className="admin-btn-save" style={{ cursor: 'pointer', padding: '0.75rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', boxShadow: 'none' }}>
                    Upload
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, (url) => updateSection('ctaSection', 'backgroundImage', url))}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                {data.ctaSection.backgroundImage ? (
                  <img src={data.ctaSection.backgroundImage} alt="CTA Background Preview" style={{ height: '200px', objectFit: 'cover', borderRadius: '8px', width: '100%', border: '1px solid #cbd5e1' }} />
                ) : (
                  <div style={{ height: '200px', border: '2px dashed #cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>No image connected</div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="bottom-bar">
          <button type="submit" className="admin-btn-save" disabled={saving}>{saving ? 'Saving...' : 'Save All Changes'}</button>
        </div>
      </form>
    </div>
  );
}
