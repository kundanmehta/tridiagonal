'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EMPTY_WEBINAR = {
  title: '', slug: '', eventDate: '', duration: '60 mins',
  description: '', content: [''], learnPoints: [''], attendees: [''],
  presenter: { name: '', title: '', company: '', image: '' },
  thumbnail: '', videoUrl: '', registrationUrl: '', isActive: true, type: 'On-Demand'
};

export default function AdminOnDemandWebinars() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  const fetchItems = () => {
    fetch(`${API_URL}/api/webinars/all`, {
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
    const url = editing._id ? `${API_URL}/api/webinars/${editing.slug}` : `${API_URL}/api/webinars`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editing)
      });
      if (res.ok) {
        setMessage('✅ Webinar saved!');
        setEditing(null);
        fetchItems();
      } else {
        const err = await res.json();
        setMessage(`❌ Error: ${err.error || 'Failed to save'}`);
      }
    } catch { setMessage('❌ Network error'); }
    setSaving(false);
  };

  const handleDelete = async (slug) => {
    if (!confirm('Delete this on-demand webinar?')) return;
    try {
      const res = await fetch(`${API_URL}/api/webinars/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
    } catch { alert('Delete failed'); }
  };

  if (loading) return <div style={{ padding: '2rem', color: '#64748b' }}>Loading On-Demand Webinars...</div>;

  const now = new Date();
  const onDemandItems = items.filter(it => new Date(it.eventDate) <= now);

  const styles = `
    .admin-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; }
    .btn-action { padding: 6px 12px; border-radius: 6px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 13px; font-weight: 600; }
    .btn-action:hover { border-color: #00AEEF; color: #00AEEF; }
    .btn-save { background: #00AEEF; color: #fff; border: none; padding: 10px 24px; borderRadius: 8px; fontWeight: 600; cursor: pointer; }
    .form-group { margin-bottom: 1.25rem; }
    .form-label { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }
    .form-input, .form-textarea { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; }
  `;

  if (editing) {
    return (
      <div style={{ maxWidth: '900px' }}>
        <style>{styles}</style>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => setEditing(null)} className="btn-action">← Back</button>
          <h1 style={{ fontSize: '24px', margin: 0 }}>Edit On-Demand Content</h1>
        </div>

        <form onSubmit={handleSave} className="admin-card">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Title</label>
              <input className="form-input" value={editing.title} onChange={e => setEditing(p=>({...p, title: e.target.value}))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Past Date (Recorded on)</label>
              <input type="date" className="form-input" value={editing.eventDate ? new Date(editing.eventDate).toISOString().split('T')[0] : ''} onChange={e => setEditing(p=>({...p, eventDate: e.target.value}))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Video URL (YouTube/Vimeo Embed)</label>
              <input className="form-input" value={editing.videoUrl} onChange={e => setEditing(p=>({...p, videoUrl: e.target.value}))} placeholder="https://youtube.com/embed/..." />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
               <label className="form-label">About the Session</label>
               <textarea className="form-textarea" rows={4} value={editing.description} onChange={e => setEditing(p=>({...p, description: e.target.value}))} required />
            </div>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={saving} className="btn-save">{saving ? 'Saving...' : 'Publish to On-Demand'}</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <style>{styles}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#0f172a' }}>On-Demand Webinars</h1>
          <p style={{ color: '#64748b' }}>Sessions that have already taken place and are available for replay.</p>
        </div>
        <button className="btn-save" onClick={() => setEditing({...EMPTY_WEBINAR, eventDate: new Date().toISOString().split('T')[0]})}>+ Add Recorded Session</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {onDemandItems.length === 0 ? (
          <div className="admin-card" style={{ textAlign: 'center', color: '#94a3b8' }}>No on-demand sessions found.</div>
        ) : (
          onDemandItems.map(item => (
            <div key={item._id} className="admin-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{item.title}</h3>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  Recorded: {new Date(item.eventDate).toLocaleDateString()} • {item.videoUrl ? 'Video Link Set' : 'No Video Link'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
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
