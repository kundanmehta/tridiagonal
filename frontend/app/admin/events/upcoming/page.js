'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, X, Users, Calendar as CalendarIcon, Clock, Globe, Plus, Trash2, Layout, Video, UserCheck } from 'lucide-react';
import RichTextEditor from '../../../../components/RichTextEditor';

const EMPTY_WEBINAR = {
  title: '', slug: '', eventDate: '', duration: '45 mins', sessionType: 'Online Technical Session',
  description: '', fullDescription: '', learnPoints: [], attendees: [], presenters: [], thumbnail: '', videoUrl: '', 
  accessType: 'On-Demand', format: 'Technical Presentation', host: 'Tridiagonal Solutions',
  isActive: true, type: 'Live'
};

export default function AdminWebinars({ typeFilter = 'Upcoming' }) {
  const [items, setItems] = useState([]);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [viewingRegs, setViewingRegs] = useState(null); // Webinar ID
  const [registrations, setRegistrations] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com';
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  const fetchItems = () => {
    fetch(`${API_URL}/api/webinars/all`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    })
    .then(r => r.json())
    .then(json => {
      setItems(json.data || []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  };

  const fetchForms = () => {
    fetch(`${API_URL}/api/forms`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(json => setForms(json.data || []));
  };

  useEffect(() => { 
    fetchItems(); 
    fetchForms();
  }, []);

  const fetchRegistrations = (webinarId) => {
    fetch(`${API_URL}/api/webinars/${webinarId}/registrations`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(json => setRegistrations(json.data || []));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const method = editing._id ? 'PUT' : 'POST';
    const url = editing._id ? `${API_URL}/api/webinars/${editing.slug}` : `${API_URL}/api/webinars`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editing)
      });
      if (res.ok) {
        const updatedItem = await res.json();
        const savedData = updatedItem.data || updatedItem; // Handle both wrapper and direct object
        
        setMessage('✅ Webinar saved successfully!');
        
        // Immediately update the local items list so "Edit" shows new data
        setItems(prev => prev.map(item => item._id === savedData._id ? savedData : item));
        
        // Also update the current editing state to the saved version
        setEditing(savedData);
        
        if (!editing._id) {
           setEditing(null); // If it was a new creation, close the form
           fetchItems(); // Full refresh for new items to get IDs etc
        }
      } else {
        const err = await res.json();
        setMessage(`❌ Error: ${err.error || 'Failed to save'}`);
      }
    } catch { setMessage('❌ Network error'); }
    setSaving(false);
  };

  const handleDelete = async (slug) => {
    if (!confirm('Permanently delete this webinar?')) return;
    try {
      const res = await fetch(`${API_URL}/api/webinars/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
    } catch { alert('Delete failed'); }
  };

  const addPresenter = () => {
    const newPresenter = { name: '', title: '', company: '', image: '', bio: '' };
    setEditing(p => ({ ...p, presenters: [...(p.presenters || []), newPresenter] }));
  };

  const updatePresenter = (idx, field, val) => {
    const newPresenters = [...editing.presenters];
    newPresenters[idx][field] = val;
    setEditing(p => ({ ...p, presenters: newPresenters }));
  };


  const handleImageUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch(`${API_URL}/api/upload-public`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      const json = await res.json();
      if (res.ok) callback(json.url);
    } catch { alert('Upload failed'); }
  };

  const styles = `
    .admin-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
    .form-label { display: block; font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .form-input, .form-textarea, .form-select { width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 15px; }
    .btn-action { padding: 8px 16px; border-radius: 8px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
    .btn-action:hover { border-color: #00AEEF; color: #00AEEF; background: #f0f9ff; }
    .btn-primary { background: #00AEEF; color: #fff; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; }
    .section-block { position: relative; border: 2px dashed #e2e8f0; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; background: #fafafa; }
    .section-controls { position: absolute; top: 10px; right: 10px; display: flex; gap: 6px; }
    .control-btn { 
      width: 32px; 
      height: 32px; 
      border-radius: 50%; 
      border: 1px solid #e2e8f0; 
      background: #fff; 
      cursor: pointer; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      color: #64748b;
      transition: all 0.2s;
    }
    .control-btn:hover { border-color: #00AEEF; color: #00AEEF; background: #f8fafc; }
    .admin-bottom-bar { position: fixed; bottom: 0; right: 0; left: 260px; background: #fff; padding: 1rem 3rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; z-index: 1000; box-shadow: 0 -4px 12px rgba(0,0,0,0.05); }
  `;

  if (loading) return <div style={{ padding: '2rem', color: '#64748b' }}>Loading Webinar CMS...</div>;

  if (viewingRegs) {
    return (
      <div style={{ maxWidth: '1100px' }}>
        <style>{styles}</style>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <button onClick={() => setViewingRegs(null)} className="btn-action">← Back</button>
          <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Registrations: {items.find(i=>i._id===viewingRegs)?.title}</h1>
        </div>
        <div className="admin-card">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Name</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Email</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Job / Company</th>
                <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Country</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                 <tr><td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>No registrations yet.</td></tr>
              ) : (
                registrations.map(reg => (
                  <tr key={reg._id}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>{reg.firstName} {reg.lastName}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>{reg.email}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>{reg.jobTitle} at {reg.company}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>{reg.country}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <div style={{ maxWidth: '1000px', paddingBottom: '100px' }}>
        <style>{styles}</style>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <button onClick={() => setEditing(null)} className="btn-action">← Cancel</button>
          <h1 style={{ fontSize: '28px', fontWeight: 800 }}>{editing._id ? 'Edit Webinar' : 'Create New Webinar'}</h1>
        </div>

        {message && <div style={{ padding: '1rem', background: '#f0fdf4', color: '#166534', borderRadius: '10px', marginBottom: '2rem' }}>{message}</div>}

        <form onSubmit={handleSave}>
          <div className="admin-card">
           <h2 style={{ fontSize: '18px', marginBottom: '1.5rem' }}>Core Attributes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Title</label>
                <input className="form-input" value={editing.title} onChange={e => setEditing(p=>({...p, title: e.target.value}))} required />
              </div>
              <div>
                <label className="form-label">Event Date</label>
                <input type="date" className="form-input" value={editing.eventDate ? new Date(editing.eventDate).toISOString().split('T')[0] : ''} onChange={e => setEditing(p=>({...p, eventDate: e.target.value}))} required />
              </div>
              <div>
                <label className="form-label">Duration</label>
                <input className="form-input" value={editing.duration} onChange={e => setEditing(p=>({...p, duration: e.target.value}))} />
              </div>
              <div>
                <label className="form-label">Webinar Status / Type</label>
                <select className="form-select" value={editing.type} onChange={e => setEditing(p=>({...p, type: e.target.value}))}>
                  <option value="Live">Live (Upcoming)</option>
                  <option value="On-Demand">On-Demand (Recording)</option>
                </select>
              </div>
              <div>
                <label className="form-label">Session Type</label>
                <input className="form-input" value={editing.sessionType} onChange={e => setEditing(p=>({...p, sessionType: e.target.value}))} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Thumbnail Path / URL</label>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                    <input className="form-input" value={editing.thumbnail || ''} onChange={e => setEditing(p=>({...p, thumbnail: e.target.value}))} placeholder="/uploads/..." />
                    <label className="btn-action" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      <Plus size={14}/> Upload
                      <input 
                        type="file" 
                        hidden 
                        onChange={e => handleImageUpload(e, (url) => setEditing(p=>({...p, thumbnail: url})))} 
                      />
                    </label>
                  </div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                 <label className="form-label">Video URL (For On-Demand)</label>
                 <input className="form-input" value={editing.videoUrl || ''} onChange={e => setEditing(p=>({...p, videoUrl: e.target.value}))} placeholder="https://youtube.com/embed/..." />
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontSize: '18px', marginBottom: '1.5rem' }}>Detailed Content</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Full Description (HTML Supported)</label>
              <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Registration Form</label>
              <select 
                className="form-input"
                value={editing.formSlug || ''}
                onChange={e => setEditing(p => ({ ...p, formSlug: e.target.value }))}
                style={{ appearance: 'auto' }}
              >
                <option value="">Default Form (Static Fields)</option>
                {forms.map(f => (
                  <option key={f._id} value={f.slug}>{f.name} ({f.slug})</option>
                ))}
              </select>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>
                Select a form created in the Form Builder, or leave empty for the default fields.
              </p>
            </div>

            <RichTextEditor 
                label="Detailed Content"
                value={editing.fullDescription || editing.description || ''} 
                onChange={v => setEditing(p => ({ ...p, fullDescription: v }))} 
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label className="form-label">Key Learning Points (One per line)</label>
                <textarea 
                  className="form-textarea" 
                  rows={6}
                  value={editing.learnPoints?.join('\n') || ''}
                  onChange={e => setEditing(p => ({ ...p, learnPoints: e.target.value.split('\n') }))}
                  placeholder="How simulation supports...&#10;Real-life examples...&#10;The role of..."
                />
              </div>
              <div>
                <label className="form-label">Who Should Attend (One per line)</label>
                <textarea 
                  className="form-textarea" 
                  rows={6}
                  value={editing.attendees?.join('\n') || ''}
                  onChange={e => setEditing(p => ({ ...p, attendees: e.target.value.split('\n') }))}
                  placeholder="Process Managers...&#10;Mechanical Engineers...&#10;Consultants..."
                />
              </div>
            </div>
          </div>

          <div className="admin-card">
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '18px', margin: 0 }}>Presenters</h2>
                <button type="button" onClick={addPresenter} className="btn-primary">Add Presenter</button>
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {editing.presenters?.map((pres, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', position: 'relative' }}>
                    <button type="button" onClick={() => {
                       const next = [...editing.presenters];
                       next.splice(idx, 1);
                       setEditing(p=>({...p, presenters: next}));
                    }} style={{ position: 'absolute', top: -10, right: -10, width: '24px', height: '24px', borderRadius: '50%', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}>×</button>
                    <div style={{ marginBottom: '1rem' }}>
                       <label className="form-label">Full Name</label>
                       <input className="form-input" value={pres.name} onChange={e => updatePresenter(idx, 'name', e.target.value)} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                       <label className="form-label">Title / Role</label>
                       <input className="form-input" value={pres.title} onChange={e => updatePresenter(idx, 'title', e.target.value)} />
                    </div>
                    <div>
                       <label className="form-label">Photo Path / URL</label>
                       <div style={{ display: 'flex', gap: '10px' }}>
                          <input className="form-input" value={pres.image} onChange={e => updatePresenter(idx, 'image', e.target.value)} placeholder="/uploads/..." />
                          <label className="btn-action" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            <Plus size={14}/> Upload
                            <input 
                              type="file" 
                              hidden 
                              onChange={e => handleImageUpload(e, (url) => updatePresenter(idx, 'image', url))} 
                            />
                          </label>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="admin-bottom-bar">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? 'Saving...' : (editing._id ? 'Update Webinar' : 'Publish Webinar')}
            </button>
          </div>
        </form>
      </div>
    );
  }

  const filteredItems = items.filter(it => {
    if (typeFilter === 'Upcoming') {
      return new Date(it.eventDate) > new Date() && it.type !== 'On-Demand';
    } else {
      return new Date(it.eventDate) <= new Date() || it.type === 'On-Demand';
    }
  });

  return (
    <div>
      <style>{styles}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>{typeFilter} Webinars</h1>
          <p style={{ color: '#64748b' }}>
            {typeFilter === 'Upcoming' 
              ? 'Manage live sessions and upcoming technical presentations.' 
              : 'Manage archived recordings and past webinars.'}
          </p>
        </div>
        <button className="btn-primary" onClick={() => setEditing({ ...EMPTY_WEBINAR, type: typeFilter === 'Upcoming' ? 'Live' : 'On-Demand' })}>
          + Create New {typeFilter} Webinar
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
         <div>
            {filteredItems.length === 0 ? (
              <p style={{color: '#94a3b8', fontSize: '14px' }}>No {typeFilter.toLowerCase()} webinars listed.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '1.5rem' }}>
                {filteredItems.map(item => (
                   <div key={item._id} className="admin-card" style={{ padding: '1.5rem', marginBottom: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ margin: 0, fontSize: '17px', color: '#1e293b', fontWeight: '700' }}>{item.title}</h3>
                          <div style={{ color: '#64748b', fontSize: '13px', marginTop: '6px', display: 'flex', gap: '12px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CalendarIcon size={14}/> {new Date(item.eventDate).toLocaleDateString()}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14}/> {item.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                         <button className="btn-action" onClick={() => { setMessage(''); setEditing(item); }}>Edit Content</button>
                         <button className="btn-action" onClick={() => { setViewingRegs(item._id); fetchRegistrations(item._id); }}>
                            <Users size={14}/> View Regs
                         </button>
                         <button className="btn-action" style={{ color: '#ef4444', marginLeft: 'auto' }} onClick={() => handleDelete(item.slug)}><Trash2 size={14}/></button>
                      </div>
                   </div>
                ))}
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
