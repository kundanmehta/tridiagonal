'use client';
import { useState, useEffect } from 'react';

const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'tel', label: 'Phone' },
  { value: 'number', label: 'Number' },
  { value: 'select', label: 'Dropdown' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'file', label: 'File Upload' },
];

export default function AdminFormBuilder() {
  const [forms, setForms] = useState([]);
  const [editing, setEditing] = useState(null); // null = list view, object = editing
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com';

  const fetchForms = () => {
    fetch(`${API_URL}/api/forms`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
    })
    .then(r => r.json())
    .then(j => { setForms(j.data || []); setLoading(false); })
    .catch(() => setLoading(false));
  };

  useEffect(() => { fetchForms(); }, []);

  const startNewForm = () => {
    setEditing({
      name: '',
      slug: '',
      adminEmail: '',
      fields: [],
      submitButtonText: 'Submit',
      consentText: '',
      isActive: true,
      _isNew: true
    });
  };

  const startEditForm = (form) => {
    setEditing({ ...form, _isNew: false });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    const token = localStorage.getItem('admin_token');
    const method = editing._isNew ? 'POST' : 'PUT';
    const url = editing._isNew ? `${API_URL}/api/forms` : `${API_URL}/api/forms/${editing._id}`;
    
    const { _isNew, ...body } = editing;
    try {
      const res = await fetch(url, {
        method, 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setMessage('Form saved successfully!');
        fetchForms();
        const json = await res.json();
        setEditing({ ...json.data, _isNew: false });
      } else {
        const err = await res.json();
        setMessage(`Error: ${err.error}`);
      }
    } catch (e) { setMessage('Network error'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this form and all its submissions?')) return;
    await fetch(`${API_URL}/api/forms/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
    });
    fetchForms();
  };

  // Field management
  const addField = () => {
    setEditing(prev => ({
      ...prev,
      fields: [...(prev.fields || []), { label: '', name: '', type: 'text', required: false, placeholder: '', options: [], width: 'full' }]
    }));
  };

  const updateField = (idx, key, val) => {
    setEditing(prev => {
      const fields = [...prev.fields];
      fields[idx] = { ...fields[idx], [key]: val };
      // Auto-generate name from label
      if (key === 'label') {
        fields[idx].name = val.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '');
      }
      return { ...prev, fields };
    });
  };

  const removeField = (idx) => {
    setEditing(prev => {
      const fields = [...prev.fields];
      fields.splice(idx, 1);
      return { ...prev, fields };
    });
  };

  const moveField = (idx, dir) => {
    setEditing(prev => {
      const fields = [...prev.fields];
      const target = idx + dir;
      if (target < 0 || target >= fields.length) return prev;
      [fields[idx], fields[target]] = [fields[target], fields[idx]];
      return { ...prev, fields };
    });
  };

  if (loading) return <div style={{ padding: '3rem', color: '#64748b' }}>Loading forms...</div>;

  // ── LIST VIEW ──
  if (!editing) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a', paddingBottom: '4rem' }}>
        <style>{`
          .admin-editor-wrap { max-width: 100%; }
          .form-list-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; transition: box-shadow 0.2s; }
          .form-list-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
          .admin-btn-primary { background: #00AEEF; color: #fff; border: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
          .admin-btn-primary:hover { background: #0093cf; }
          .admin-btn-outline { background: transparent; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; transition: all 0.2s; color: #475569; }
          .admin-btn-outline:hover { border-color: #00AEEF; color: #00AEEF; }
          .admin-btn-danger { background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; }
        `}</style>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0 }}>Form Builder</h1>
            <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>Create and manage dynamic forms for your website.</p>
          </div>
          <button className="admin-btn-primary" onClick={startNewForm}>+ Create New Form</button>
        </div>

        {forms.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>No forms created yet. Click "Create New Form" to get started.</p>
          </div>
        ) : (
          forms.map(form => (
            <div key={form._id} className="form-list-card">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{form.name}</h3>
                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>{form.fields?.length || 0} fields · Slug: {form.slug}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="admin-btn-outline" onClick={() => startEditForm(form)}>Edit</button>
                <button className="admin-btn-outline" onClick={() => window.location.href = `/admin/forms/${form._id}/submissions`}>Submissions</button>
                <button className="admin-btn-danger" onClick={() => handleDelete(form._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  // ── EDITOR VIEW ──
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a', paddingBottom: '6rem' }}>
      <style>{`
        .admin-section { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; margin-bottom: 2rem; overflow: hidden; }
        .admin-section-header { background: #f8fafc; padding: 1.25rem 2rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 14px; }
        .admin-badge { background: #00AEEF; color: #fff; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 700; font-size: 0.85rem; }
        .admin-form-body { padding: 2rem; }
        .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .admin-label { display: block; font-size: 0.875rem; font-weight: 600; color: #475569; margin-bottom: 0.5rem; }
        .admin-input, .admin-textarea, .admin-select { width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.75rem 1rem; box-sizing: border-box; font-family: inherit; font-size: 0.95rem; }
        .admin-input:focus, .admin-textarea:focus, .admin-select:focus { outline: none; border-color: #00AEEF; box-shadow: 0 0 0 3px rgba(0,174,239,0.15); }
        .field-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; position: relative; }
        .field-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px dashed #cbd5e1; }
        .admin-btn-add { width: 100%; border: 2px dashed #cbd5e1; background: transparent; color: #64748b; font-weight: 600; padding: 1.25rem; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .admin-btn-add:hover { border-color: #00AEEF; color: #00AEEF; background: #f0f9ff; }
        .admin-btn-remove { background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
        .bottom-bar { position: fixed; bottom: 0; left: 260px; right: 0; background: rgba(255,255,255,0.95); border-top: 1px solid #e2e8f0; padding: 1.25rem 3rem; display: flex; justify-content: space-between; align-items: center; z-index: 100; }
        .admin-btn-save { background: #00AEEF; color: #fff; font-weight: 600; padding: 0.75rem 2.5rem; border: none; border-radius: 8px; cursor: pointer; }
        .move-btn { background: #fff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 8px; cursor: pointer; font-size: 14px; }
        .move-btn:hover { border-color: #00AEEF; }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '1.5rem' }}>←</button>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{editing._isNew ? 'Create New Form' : `Edit: ${editing.name}`}</h1>
        </div>
      </div>

      {message && <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px', background: message.includes('Error') ? '#fef2f2' : '#f0fdf4', color: message.includes('Error') ? '#991b1b' : '#166534', fontWeight: 600 }}>{message}</div>}

      {/* FORM SETTINGS */}
      <div className="admin-section">
        <div className="admin-section-header">
          <span className="admin-badge">1</span>
          <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Form Settings</h2>
        </div>
        <div className="admin-form-body">
          <div className="admin-grid">
            <div>
              <label className="admin-label">Form Name</label>
              <input className="admin-input" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }))} placeholder="e.g. Contact Us" />
            </div>
            <div>
              <label className="admin-label">Slug (auto-generated)</label>
              <input className="admin-input" value={editing.slug} onChange={e => setEditing(p => ({ ...p, slug: e.target.value }))} style={{ background: '#f8fafc' }} />
            </div>
            <div>
              <label className="admin-label">Admin Notification Email</label>
              <input className="admin-input" type="email" value={editing.adminEmail} onChange={e => setEditing(p => ({ ...p, adminEmail: e.target.value }))} placeholder="admin@example.com" />
            </div>
            <div>
              <label className="admin-label">Submit Button Text</label>
              <input className="admin-input" value={editing.submitButtonText} onChange={e => setEditing(p => ({ ...p, submitButtonText: e.target.value }))} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label className="admin-label">Consent Text (leave blank to hide)</label>
              <textarea className="admin-textarea" rows={2} value={editing.consentText} onChange={e => setEditing(p => ({ ...p, consentText: e.target.value }))} placeholder="I agree to receive communications..." />
            </div>
          </div>
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="admin-section">
        <div className="admin-section-header">
          <span className="admin-badge">2</span>
          <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Form Fields ({editing.fields?.length || 0})</h2>
        </div>
        <div className="admin-form-body">
          {editing.fields?.map((field, idx) => (
            <div key={idx} className="field-card">
              <div className="field-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="move-btn" onClick={() => moveField(idx, -1)} title="Move up">↑</button>
                    <button className="move-btn" onClick={() => moveField(idx, 1)} title="Move down">↓</button>
                  </div>
                  <strong style={{ color: '#334155' }}>Field #{idx + 1}: {field.label || '(untitled)'}</strong>
                </div>
                <button className="admin-btn-remove" onClick={() => removeField(idx)}>Remove</button>
              </div>
              <div className="admin-grid">
                <div>
                  <label className="admin-label">Label</label>
                  <input className="admin-input" value={field.label} onChange={e => updateField(idx, 'label', e.target.value)} placeholder="e.g. First Name" />
                </div>
                <div>
                  <label className="admin-label">Field Name (API key)</label>
                  <input className="admin-input" value={field.name} onChange={e => updateField(idx, 'name', e.target.value)} style={{ background: '#f8fafc' }} />
                </div>
                <div>
                  <label className="admin-label">Type</label>
                  <select className="admin-select" value={field.type} onChange={e => updateField(idx, 'type', e.target.value)}>
                    {FIELD_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="admin-label">Width</label>
                  <select className="admin-select" value={field.width} onChange={e => updateField(idx, 'width', e.target.value)}>
                    <option value="full">Full Width</option>
                    <option value="half">Half Width</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">Placeholder</label>
                  <input className="admin-input" value={field.placeholder || ''} onChange={e => updateField(idx, 'placeholder', e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '1.75rem' }}>
                  <input type="checkbox" checked={field.required} onChange={e => updateField(idx, 'required', e.target.checked)} id={`req-${idx}`} style={{ accentColor: '#00AEEF' }} />
                  <label htmlFor={`req-${idx}`} style={{ fontWeight: 600, color: '#475569' }}>Required</label>
                </div>
              </div>
              {field.type === 'select' && (
                <div style={{ marginTop: '1rem' }}>
                  <label className="admin-label">Dropdown Options (one per line)</label>
                  <textarea className="admin-textarea" rows={4} value={(field.options || []).join('\n')} onChange={e => updateField(idx, 'options', e.target.value.split('\n'))} placeholder="Option 1&#10;Option 2&#10;Option 3" />
                </div>
              )}
            </div>
          ))}
          <button className="admin-btn-add" onClick={addField}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
            Add New Field
          </button>
        </div>
      </div>

      <div className="bottom-bar">
        <button onClick={() => setEditing(null)} style={{ background: 'none', border: '1px solid #e2e8f0', padding: '0.75rem 2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, color: '#64748b' }}>Cancel</button>
        <button className="admin-btn-save" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Form'}
        </button>
      </div>
    </div>
  );
}
