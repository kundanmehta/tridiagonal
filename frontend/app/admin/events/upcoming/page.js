'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EMPTY_WEBINAR = {
  title: '', slug: '', eventDate: '', duration: '60 mins',
  description: '', content: [''], learnPoints: [''], attendees: [''],
  presenter: { name: '', title: '', company: '', image: '' },
  thumbnail: '', videoUrl: '', registrationUrl: '', isActive: true, type: 'Live'
};

export default function AdminUpcomingWebinars() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // Webinar object
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
      // Filter for upcoming sessions logic: eventDate > now
      const now = new Date();
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
        setMessage('✅ Webinar saved successfully!');
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
    if (!confirm('Delete this webinar?')) return;
    try {
      const res = await fetch(`${API_URL}/api/webinars/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
    } catch { alert('Delete failed'); }
  };

  const handleImageUpload = async (e, field) => {
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
      if (res.ok) {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          setEditing(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: json.url } }));
        } else {
          setEditing(prev => ({ ...prev, [field]: json.url }));
        }
      }
    } catch { alert('Upload failed'); }
  };

  if (loading) return <div style={{ padding: '2rem', color: '#64748b' }}>Loading Upcoming Webinars...</div>;

  // Split items for display (Dashboard view)
  const now = new Date();
  const upcomingItems = items.filter(it => new Date(it.eventDate) > now);
  const pastItems = items.filter(it => new Date(it.eventDate) <= now);

  const styles = `
    .admin-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; }
    .btn-action { padding: 6px 12px; border-radius: 6px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 13px; font-weight: 600; }
    .btn-action:hover { border-color: #00AEEF; color: #00AEEF; }
    .btn-save { background: #00AEEF; color: #fff; border: none; padding: 10px 24px; borderRadius: 8px; fontWeight: 600; cursor: pointer; }
    .form-group { margin-bottom: 1.25rem; }
    .form-label { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }
    .form-input, .form-textarea { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; }
    .array-item { display: flex; gap: 8px; margin-bottom: 8px; }
  `;

  if (editing) {
    return (
      <div style={{ maxWidth: '900px' }}>
        <style>{styles}</style>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => setEditing(null)} className="btn-action">← Back</button>
          <h1 style={{ fontSize: '24px', margin: 0 }}>{editing._id ? 'Edit Webinar' : 'New Webinar'}</h1>
        </div>

        {message && <div style={{ padding: '1rem', background: '#f0fdf4', color: '#166534', borderRadius: '8px', marginBottom: '1.5rem' }}>{message}</div>}

        <form onSubmit={handleSave} className="admin-card">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Webinar Title</label>
              <input className="form-input" value={editing.title} onChange={e => setEditing(p=>({...p, title: e.target.value}))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Event Date</label>
              <input type="date" className="form-input" value={editing.eventDate ? new Date(editing.eventDate).toISOString().split('T')[0] : ''} onChange={e => setEditing(p=>({...p, eventDate: e.target.value}))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Duration</label>
              <input className="form-input" value={editing.duration} onChange={e => setEditing(p=>({...p, duration: e.target.value}))} />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Video URL (for On-Demand playback)</label>
              <input className="form-input" value={editing.videoUrl} onChange={e => setEditing(p=>({...p, videoUrl: e.target.value}))} placeholder="https://youtube.com/..." />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Short Description</label>
              <textarea className="form-textarea" rows={2} value={editing.description} onChange={e => setEditing(p=>({...p, description: e.target.value}))} required />
            </div>
          </div>

          <h3 style={{ fontSize: '16px', marginTop: '2rem' }}>Presenter Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" value={editing.presenter.name} onChange={e => setEditing(p=>({...p, presenter: {...p.presenter, name: e.target.value}}))} />
            </div>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input className="form-input" value={editing.presenter.title} onChange={e => setEditing(p=>({...p, presenter: {...p.presenter, title: e.target.value}}))} />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Company</label>
              <input className="form-input" value={editing.presenter.company} onChange={e => setEditing(p=>({...p, presenter: {...p.presenter, company: e.target.value}}))} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={saving} className="btn-save">
              {saving ? 'Saving...' : 'Save Webinar'}
            </button>
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
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#0f172a' }}>Upcoming Webinars</h1>
          <p style={{ color: '#64748b' }}>Manage sessions scheduled for future dates.</p>
        </div>
        <button className="btn-save" onClick={() => setEditing({...EMPTY_WEBINAR, _isNew: true})}>+ Create New</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {upcomingItems.length === 0 ? (
          <div className="admin-card" style={{ textAlign: 'center', color: '#94a3b8' }}>No upcoming webinars found.</div>
        ) : (
          upcomingItems.map(item => (
            <div key={item._id} className="admin-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{item.title}</h3>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  {new Date(item.eventDate).toLocaleDateString()} • {item.duration}
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

      {pastItems.length > 0 && (
        <div style={{ marginTop: '4rem' }}>
          <h2 style={{ fontSize: '20px', color: '#0f172a' }}>Recently Moved to On-Demand</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>These webinars have passed and now appear in the On-Demand section.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.7 }}>
             {pastItems.slice(0, 3).map(item => (
                <div key={item._id} className="admin-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '15px', color: '#1e293b' }}>{item.title}</h3>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Passed on {new Date(item.eventDate).toLocaleDateString()}</div>
                  </div>
                  <button className="btn-action" onClick={() => window.location.href='/admin/events/on-demand'}>Manage record</button>
                </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
}
