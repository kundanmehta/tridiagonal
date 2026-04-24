'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, X } from 'lucide-react';
import RichTextEditor from '../../../../components/RichTextEditor';
import { API_URL } from '@/lib/apiConfig';

const EMPTY_NEWS = {
  title: '', slug: '', date: '', type: 'News',
  description: '', sections: [], thumbnail: '', isActive: true
};

export default function AdminNewsEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  const fetchItems = () => {
    fetch(`${API_URL}/api/news/all`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(json => {
      setItems(json.data || []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const method = editing._id ? 'PUT' : 'POST';
    const url = editing._id ? `${API_URL}/api/news/${editing.slug}` : `${API_URL}/api/news`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editing)
      });
      if (res.ok) {
        setMessage('✅ News Article saved successfully!');
        setEditing(null);
        fetchItems();
      } else {
        const err = await res.json();
        setMessage(`❌ Error: ${err.error || 'Failed to save'}`);
      }
    } catch { setMessage('❌ Network error'); }
    setSaving(false);
  };

  const addSection = (type) => {
    const newSection = { type, value: '', level: 2, image: '', caption: '' };
    setEditing(prev => ({ ...prev, sections: [...(prev.sections || []), newSection] }));
  };

  const updateSection = (index, field, val) => {
    const newSections = [...editing.sections];
    newSections[index][field] = val;
    setEditing({ ...editing, sections: newSections });
  };

  const removeSection = (index) => {
    setEditing(prev => ({ ...prev, sections: prev.sections.filter((_, i) => i !== index) }));
  };

  const moveSection = (index, direction) => {
    const newSections = [...editing.sections];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    setEditing({ ...editing, sections: newSections });
  };

  const handleImageUpload = async (index, e) => {
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
      if (res.ok) updateSection(index, 'image', json.url);
    } catch { alert('Upload failed'); }
  };

  const styles = `
    .admin-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
    .btn-action { padding: 8px 16px; border-radius: 6px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s; }
    .btn-action:hover { border-color: #00AEEF; color: #00AEEF; background: #f0f9ff; }
    .btn-save { background: #00AEEF; color: #fff; border: none; padding: 12px 32px; borderRadius: 10px; fontWeight: 700; cursor: pointer; boxShadow: 0 4px 12px rgba(0, 174, 239, 0.2); }
    .form-group { margin-bottom: 1.5rem; }
    .form-label { display: block; font-size: 13px; font-weight: 700; color: #1e293b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .form-input, .form-textarea, .form-select { width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 15px; transition: border-color 0.2s; }
    .form-input:focus { border-color: #00AEEF; outline: none; }
    .section-block { position: relative; border: 2px dashed #e2e8f0; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; background: #fafafa; }
    .section-controls { position: absolute; top: 10px; right: 10px; display: flex; gap: 4px; }
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
    .admin-bottom-bar {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 260px;
      background: #fff;
      padding: 1rem 3rem;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: flex-end;
      z-index: 1000;
      box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
    }
  `;

  if (loading) return <div style={{ padding: '2rem', color: '#64748b' }}>Loading News CMS...</div>;

  if (editing) {
    return (
      <div style={{ maxWidth: '1000px', paddingBottom: '100px' }}>
        <style>{styles}</style>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <button onClick={() => setEditing(null)} className="btn-action">← Cancel</button>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#0f172a' }}>{editing._id ? 'Edit Article' : 'Create New News & Press Release'}</h1>
        </div>

        {message && <div style={{ padding: '1rem', background: '#f0fdf4', color: '#166534', borderRadius: '10px', marginBottom: '2rem', fontWeight: 600 }}>{message}</div>}

        <form onSubmit={handleSave}>
          <div className="admin-card">
            <h2 style={{ fontSize: '18px', marginBottom: '1.5rem', color: '#0f172a' }}>Basic Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Article Title</label>
                <input className="form-input" value={editing.title} onChange={e => setEditing(p=>({...p, title: e.target.value}))} required placeholder="e.g. Tridiagonal Solutions Unveils New Brand Identity" />
              </div>
              <div className="form-group">
                <label className="form-label">Publish Date</label>
                <input type="date" className="form-input" value={editing.date ? new Date(editing.date).toISOString().split('T')[0] : ''} onChange={e => setEditing(p=>({...p, date: e.target.value}))} required />
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-select" value={editing.type} onChange={e => setEditing(p=>({...p, type: e.target.value}))}>
                  <option value="News">News</option>
                  <option value="Press Release">Press Release</option>
                </select>
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Search Summary (SEO Description)</label>
                <textarea className="form-textarea" rows={3} value={editing.description} onChange={e => setEditing(p=>({...p, description: e.target.value}))} required placeholder="Brief summary of the article for listing pages..." />
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '18px', margin: 0, color: '#0f172a' }}>Article Content Sections</h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={() => addSection('heading')} className="btn-action">+ Heading</button>
                <button type="button" onClick={() => addSection('text')} className="btn-action">+ Description/Text</button>
                <button type="button" onClick={() => addSection('image')} className="btn-action">+ Image</button>
                <button type="button" onClick={() => addSection('quote')} className="btn-action">+ Quote</button>
              </div>
            </div>

            {(editing.sections || []).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '12px' }}>
                No content sections added yet. Use the buttons above to start building your article.
              </div>
            ) : (
              editing.sections.map((section, idx) => (
                <div key={idx} className="section-block">
                  <div className="section-controls">
                    <button type="button" className="control-btn" onClick={() => moveSection(idx, -1)} title="Move Up">
                      <ArrowUp size={14} />
                    </button>
                    <button type="button" className="control-btn" onClick={() => moveSection(idx, 1)} title="Move Down">
                      <ArrowDown size={14} />
                    </button>
                    <button type="button" className="control-btn" style={{ color: '#ef4444' }} onClick={() => removeSection(idx)} title="Remove Section">
                      <X size={14} />
                    </button>
                  </div>

                  <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, color: '#00AEEF', background: 'rgba(0,174,239,0.1)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '12px' }}>
                    {section.type}
                  </span>

                  {section.type === 'heading' && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                       <input className="form-input" value={section.value} onChange={e => updateSection(idx, 'value', e.target.value)} placeholder="Enter heading text..." />
                    </div>
                  )}

                  {section.type === 'text' && (
                    <RichTextEditor value={section.value} onChange={val => updateSection(idx, 'value', val)} />
                  )}

                  {section.type === 'image' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem' }}>
                      <div style={{ height: '140px', background: '#eee', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {section.image ? (
                          <img 
                            src={section.image.startsWith('/uploads') ? `${API_URL}${section.image}` : section.image} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        ) : <span style={{fontSize: '12px' }}>No Image</span>}
                      </div>
                      <div>
                        <label className="form-label">Upload Image</label>
                        <input type="file" onChange={e => handleImageUpload(idx, e)} style={{ marginBottom: '1rem' }} />
                        <label className="form-label">Caption (Optional)</label>
                        <input className="form-input" value={section.caption} onChange={e => updateSection(idx, 'caption', e.target.value)} placeholder="e.g. Logo unveiling event at HQ" />
                      </div>
                    </div>
                  )}

                  {section.type === 'quote' && (
                    <div>
                      <textarea className="form-textarea" rows={3} value={section.value} onChange={e => updateSection(idx, 'value', e.target.value)} placeholder="Enter quote text..." />
                      <div style={{ marginTop: '0.5rem' }}>
                         <input className="form-input" value={section.caption} onChange={e => updateSection(idx, 'caption', e.target.value)} placeholder="Attribution (e.g. - Pravin Jain, CEO)" />
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="admin-bottom-bar">
            <button type="submit" disabled={saving} className="btn-save">
              {saving ? 'Publishing...' : (editing._id ? 'Update Article' : 'Publish Article')}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <style>{styles}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, margin: 0, color: '#0f172a', letterSpacing: '-0.02em' }}>News & Press Release</h1>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Manage company updates and media announcements with the section builder.</p>
        </div>
        <button className="btn-save" onClick={() => setEditing({...EMPTY_NEWS, date: new Date().toISOString().split('T')[0]})}>+ Create New News</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.length === 0 ? (
          <div className="admin-card" style={{ textAlign: 'center', color: '#94a3b8', padding: '4rem' }}>No news items found. Start by creating your first article.</div>
        ) : (
          items.map(item => (
            <div key={item._id} className="admin-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'box-shadow 0.2s' }} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'} onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, color: '#00AEEF', background: 'rgba(0,174,239,0.1)', padding: '4px 10px', borderRadius: '4px' }}>{item.type}</span>
                <h3 style={{ margin: '12px 0 6px', fontSize: '17px', color: '#1e293b', fontWeight: '700' }}>{item.title}</h3>
                <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={12} /> {new Date(item.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  <span style={{ color: '#e2e8f0' }}>|</span>
                  {(item.sections || []).length} Sections
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-action" onClick={() => setEditing(item)}>Edit</button>
                <button className="btn-action" style={{ color: '#ef4444' }} onClick={() => handleDelete(item.slug)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const Calendar = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
);
