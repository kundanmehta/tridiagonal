'use client';

import { useState, useEffect } from 'react';
import {
    FileText, Plus, Trash2, Calendar as CalendarIcon,
    ExternalLink, FileDown, Search, Filter,
    Image as ImageIcon, User, Briefcase, Factory
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';

export default function AdminResourceManager({ resType }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [services, setServices] = useState([]);
    const [forms, setForms] = useState([]);

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com';
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

    const fetchItems = () => {
        setLoading(true);
        fetch(`${API_URL}/api/resources/all`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(json => {
                // Filter by type if provided
                const filtered = (json.data || []).filter(i => i.resourceType === resType);
                setItems(filtered);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const fetchMetadata = async () => {
        try {
            const [catRes, indRes, serRes, formRes] = await Promise.all([
                fetch(`${API_URL}/api/categories?type=${resType}`),
                fetch(`${API_URL}/api/industries`),
                fetch(`${API_URL}/api/services`),
                fetch(`${API_URL}/api/forms`)
            ]);
            const [catJson, indJson, serJson, formJson] = await Promise.all([
                catRes.json(),
                indRes.json(),
                serRes.json(),
                formRes.json()
            ]);
            setCategories(catJson.data || []);
            setIndustries(indJson.data || []);
            setServices(serJson.data || []);
            setForms(formJson.data || []);
        } catch (err) {
            console.error('Metadata fetch error:', err);
        }
    };

    useEffect(() => {
        fetchItems();
        fetchMetadata();
    }, [resType]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        const method = editing._id ? 'PUT' : 'POST';
        const url = editing._id ? `${API_URL}/api/resources/${editing.slug}` : `${API_URL}/api/resources`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ ...editing, resourceType: resType })
            });
            if (res.ok) {
                setMessage('✅ Resource saved successfully!');
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
        if (!confirm('Permanently delete this resource?')) return;
        try {
            const res = await fetch(`${API_URL}/api/resources/${slug}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) fetchItems();
        } catch { alert('Delete failed'); }
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

    if (loading) return <div style={{ padding: '2rem', color: '#64748b' }}>Loading {resType}s...</div>;

    if (editing) {
        return (
            <div style={{ maxWidth: '1000px', paddingBottom: '100px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                    <button onClick={() => setEditing(null)} className="btn-secondary">← Cancel</button>
                    <h1 style={{ fontSize: '28px', fontWeight: 800 }}>{editing._id ? 'Edit' : 'Create'} {resType}</h1>
                </div>

                {message && <div className="alert-success">{message}</div>}

                <form onSubmit={handleSave}>
                    <div className="admin-card">
                        <h2 className="admin-card-title">General Info</h2>
                        <div className="admin-grid-2">
                            <div className="full-width">
                                <label className="admin-label">Title</label>
                                <input className="admin-input" value={editing.title} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} required />
                            </div>
                            <div>
                                <label className="admin-label">Slug</label>
                                <input className="admin-input" value={editing.slug} onChange={e => setEditing(p => ({ ...p, slug: e.target.value }))} placeholder="auto-generated-if-empty" />
                            </div>
                            <div>
                                <label className="admin-label">Date</label>
                                <input type="date" className="admin-input" value={editing.date?.split('T')[0]} onChange={e => setEditing(p => ({ ...p, date: e.target.value }))} />
                            </div>
                            <div>
                                <label className="admin-label">Category / Display Label</label>
                                <select
                                    className="admin-input"
                                    value={editing.category || ''}
                                    onChange={e => setEditing(p => ({ ...p, category: e.target.value }))}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => (
                                        <option key={c._id} value={c.name}>{c.name}</option>
                                    ))}
                                    {editing.category && !categories.find(c => c.name === editing.category) && (
                                        <option value={editing.category}>{editing.category} (Current)</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className="admin-label">Author / Organization</label>
                                <input className="admin-input" value={editing.author} onChange={e => setEditing(p => ({ ...p, author: e.target.value }))} />
                            </div>
                            <div>
                                <label className="admin-label">Industry</label>
                                <select
                                    className="admin-input"
                                    value={editing.industry || 'All'}
                                    onChange={e => setEditing(p => ({ ...p, industry: e.target.value }))}
                                >
                                    <option value="All">All Industries</option>
                                    {industries.map(i => (
                                        <option key={i._id} value={i.title}>{i.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="admin-label">Service</label>
                                <select
                                    className="admin-input"
                                    value={editing.service || 'All'}
                                    onChange={e => setEditing(p => ({ ...p, service: e.target.value }))}
                                >
                                    <option value="All">All Services</option>
                                    {services.map(s => (
                                        <option key={s._id} value={s.title}>{s.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="admin-card">
                        <h2 className="admin-card-title">Media & Links</h2>
                        <div className="admin-grid-2">
                            <div className="full-width">
                                <label className="admin-label">Featured Image URL</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input className="admin-input" value={editing.coverImage || ''} onChange={e => setEditing(p => ({ ...p, coverImage: e.target.value }))} />
                                    <label className="btn-secondary" style={{ cursor: 'pointer' }}>
                                        Upload
                                        <input type="file" hidden onChange={e => handleImageUpload(e, (url) => setEditing(p => ({ ...p, coverImage: url })))} />
                                    </label>
                                </div>
                            </div>
                            {resType === 'Brochure' && (
                                <div className="full-width">
                                    <label className="admin-label">PDF File URL</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input className="admin-input" value={editing.fileUrl || ''} onChange={e => setEditing(p => ({ ...p, fileUrl: e.target.value }))} />
                                        <label className="btn-secondary" style={{ cursor: 'pointer' }}>
                                            Upload PDF
                                            <input type="file" hidden onChange={e => handleImageUpload(e, (url) => setEditing(p => ({ ...p, fileUrl: url })))} />
                                        </label>
                                    </div>
                                </div>
                            )}
                            {resType === 'Publication' && (
                                <div className="full-width">
                                    <label className="admin-label">External Resource Link (URL)</label>
                                    <input className="admin-input" value={editing.externalUrl || ''} onChange={e => setEditing(p => ({ ...p, externalUrl: e.target.value }))} placeholder="https://..." />
                                </div>
                            )}
                            <div className="full-width">
                                <label className="admin-label">Dynamic Form (Registration/Access)</label>
                                <select
                                    className="admin-input"
                                    value={editing.selectedFormId?._id || editing.selectedFormId || ''}
                                    onChange={e => setEditing(p => ({ ...p, selectedFormId: e.target.value }))}
                                >
                                    <option value="">No Form (Direct Access)</option>
                                    {forms.map(f => (
                                        <option key={f._id} value={f._id}>{f.name}</option>
                                    ))}
                                </select>
                                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>Select the form to display for "Lock & Access" functionality.</p>
                            </div>
                        </div>
                    </div>

                    {(resType === 'Blog' || resType === 'Case Study') && (
                        <div className="admin-card">
                            <h2 className="admin-card-title">Content Area</h2>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label className="admin-label">Short Excerpt (Summary)</label>
                                <textarea className="admin-textarea" rows={3} value={editing.excerpt} onChange={e => setEditing(p => ({ ...p, excerpt: e.target.value }))} />
                            </div>
                            <RichTextEditor
                                label="Full Content (HTML)"
                                value={editing.content || ''}
                                onChange={v => setEditing(p => ({ ...p, content: v }))}
                            />
                        </div>
                    )}

                    <div className="admin-bottom-bar">
                        <button type="submit" disabled={saving} className="btn-primary">
                            {saving ? 'Saving...' : 'Save Resource'}
                        </button>
                    </div>
                </form>

                <style>{`
          .admin-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
          .admin-card-title { font-size: 18px; font-weight: 700; margin-bottom: 1.5rem; color: #1e293b; }
          .admin-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          .full-width { grid-column: span 2; }
          .admin-label { display: block; font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
          .admin-input, .admin-textarea { width: 100%; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 15px; }
          .btn-primary { background: #00AEEF; color: #fff; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; }
          .btn-secondary { padding: 10px 18px; border-radius: 8px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
          .btn-secondary:hover { border-color: #00AEEF; color: #00AEEF; }
          .alert-success { padding: 1rem; background: #f0fdf4; color: #166534; borderRadius: 10px; margin-bottom: 2rem; border: 1px solid #bbf7d0; }
          .admin-bottom-bar { position: fixed; bottom: 0; right: 0; left: 260px; background: #fff; padding: 1rem 3rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; z-index: 1000; }
        `}</style>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>{resType} Library</h1>
                    <p style={{ color: '#64748b' }}>Manage your technical {resType.toLowerCase()}s and technical insights.</p>
                </div>
                <button className="btn-primary" onClick={() => setEditing({ title: '', slug: '', resourceType: resType, category: '', date: new Date().toISOString() })}>
                    + Create {resType}
                </button>
            </div>

            <div className="admin-grid-resources" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {items.length === 0 ? (
                    <p style={{ color: '#94a3b8' }}>No {resType.toLowerCase()}s found. Click the button above to add one.</p>
                ) : (
                    items.map(item => (
                        <div key={item._id} className="admin-card" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '8px', overflow: 'hidden' }}>
                                    {item.coverImage ? (
                                        <img src={item.coverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}><ImageIcon size={24} /></div>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{item.title}</h3>
                                    <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '12px', color: '#64748b' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CalendarIcon size={12} /> {new Date(item.date).toLocaleDateString()}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={12} /> {item.category || 'General'}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                                <button className="btn-secondary" onClick={() => { setMessage(''); setEditing(item); }}>Edit</button>
                                {item.externalUrl && <a href={item.externalUrl} target="_blank" className="btn-secondary"><ExternalLink size={14} /> View Link</a>}
                                {item.fileUrl && <a href={item.fileUrl} target="_blank" className="btn-secondary"><FileDown size={14} /> PDF</a>}
                                <button className="btn-secondary" style={{ color: '#ef4444', marginLeft: 'auto' }} onClick={() => handleDelete(item.slug)}><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style>{`
        .btn-primary { background: #00AEEF; color: #fff; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; }
        .btn-secondary { padding: 8px 14px; border-radius: 8px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; color: inherit; }
        .btn-secondary:hover { border-color: #00AEEF; color: #00AEEF; }
        .admin-card { transition: all 0.2s; }
        .admin-card:hover { border-color: #00AEEF; box-shadow: 0 4px 12px rgba(0,174,239,0.08); }
      `}</style>
        </div>
    );
}
