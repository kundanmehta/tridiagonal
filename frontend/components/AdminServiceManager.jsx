'use client';
import { useState, useEffect } from 'react';
import { Settings, Plus, Edit2, Trash2, Save, X, Image as ImageLucide, Type, AlignLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { API_URL, resolveImageUrl } from '@/lib/apiConfig';
import AdminSEOEditor from './AdminSEOEditor';

export default function AdminServiceManager() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('general');

    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/services`);
            const json = await res.json();
            setServices(json.data || []);
        } catch (err) {
            console.error('Failed to fetch services:', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        const isNew = !editing._id;
        const method = isNew ? 'POST' : 'PUT';
        const url = isNew ? `${API_URL}/api/services` : `${API_URL}/api/services/${editing._id}`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(editing)
            });
            const json = await res.json();
            if (res.ok) {
                setMessage('✅ Service saved successfully!');
                fetchServices();
                if (json.data) setEditing(json.data);
            } else {
                setMessage(`❌ Error: ${json.error || 'Failed to save'}`);
            }
        } catch { setMessage('❌ Network error'); }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Permanently delete this service?')) return;
        try {
            const res = await fetch(`${API_URL}/api/services/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) fetchServices();
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

    const slugify = (text) => text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    if (loading) return <div style={{ padding: '2rem', color: '#64748b' }}>Loading services...</div>;

    if (editing) {
        return (
            <div style={{ maxWidth: '1000px', paddingBottom: '100px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                    <button onClick={() => setEditing(null)} className="btn-secondary">← Back to List</button>
                    <h1 style={{ fontSize: '28px', fontWeight: 800 }}>{editing._id ? 'Edit' : 'Create'} Service</h1>
                </div>

                {message && (
                    <div className={message.startsWith('❌') ? 'alert-error' : 'alert-success'}>
                        {message}
                    </div>
                )}

                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem', gap: '2rem' }}>
                    <button type="button" onClick={() => setActiveTab('general')} style={{ padding: '12px 0', fontSize: '14px', fontWeight: 600, color: activeTab === 'general' ? '#00AEEF' : '#64748b', borderBottom: activeTab === 'general' ? '2px solid #00AEEF' : 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'none', cursor: 'pointer' }}>General Content</button>
                    <button type="button" onClick={() => setActiveTab('seo')} style={{ padding: '12px 0', fontSize: '14px', fontWeight: 600, color: activeTab === 'seo' ? '#00AEEF' : '#64748b', borderBottom: activeTab === 'seo' ? '2px solid #00AEEF' : 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'none', cursor: 'pointer' }}>SEO Settings</button>
                </div>

                <form onSubmit={handleSave}>
                    {activeTab === 'general' && (
                        <>
                            <div className="admin-card">
                                <h2 className="admin-card-title">Basic Information</h2>
                                <div className="admin-grid-2">
                                    <div className="full-width">
                                        <label className="admin-label">Service Title</label>
                                        <input 
                                            className="admin-input" 
                                            value={editing.title} 
                                            onChange={e => {
                                                const newTitle = e.target.value;
                                                setEditing(p => {
                                                    const updates = { ...p, title: newTitle };
                                                    if (!p.slug || p.slug === slugify(p.title || '')) {
                                                        updates.slug = slugify(newTitle);
                                                    }
                                                    return updates;
                                                });
                                            }} 
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="admin-label">Slug</label>
                                        <input 
                                            className="admin-input" 
                                            value={editing.slug} 
                                            onChange={e => setEditing(p => ({ ...p, slug: e.target.value }))} 
                                        />
                                    </div>
                                    <div className="full-width">
                                        <label className="admin-label">Short Description</label>
                                        <textarea 
                                            className="admin-textarea" 
                                            rows={3} 
                                            value={editing.description} 
                                            onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} 
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="admin-card">
                                <h2 className="admin-card-title">Media</h2>
                                <div className="admin-grid-1">
                                    <div className="full-width">
                                        <label className="admin-label">Hero / Banner Image</label>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <input className="admin-input" value={editing.heroImage || ''} onChange={e => setEditing(p => ({ ...p, heroImage: e.target.value }))} />
                                            <label className="btn-secondary" style={{ cursor: 'pointer', flexShrink: 0 }}>
                                                Upload
                                                <input type="file" hidden onChange={e => handleImageUpload(e, (url) => setEditing(p => ({ ...p, heroImage: url })))} />
                                            </label>
                                            {editing.heroImage && (
                                                <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                                                    <img src={resolveImageUrl(editing.heroImage)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="admin-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 className="admin-card-title" style={{ margin: 0 }}>Key Features</h2>
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => setEditing(p => ({
                                            ...p,
                                            features: [...(p.features || []), '']
                                        }))}
                                    >
                                        + Add Feature
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {(editing.features || []).map((feature, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <input 
                                                className="admin-input" 
                                                value={feature} 
                                                onChange={e => {
                                                    const newFeatures = [...editing.features];
                                                    newFeatures[idx] = e.target.value;
                                                    setEditing(p => ({ ...p, features: newFeatures }));
                                                }} 
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => {
                                                    const newFeatures = editing.features.filter((_, i) => i !== idx);
                                                    setEditing(p => ({ ...p, features: newFeatures }));
                                                }}
                                                style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'seo' && (
                        <div className="admin-card">
                            <h2 className="admin-card-title">Search Engine Optimization</h2>
                            <AdminSEOEditor
                                seoData={editing.seo || { metaTitle: '', metaDescription: '', focusKeyword: '', ogImage: '' }}
                                onChange={(updatedSeo) => setEditing(prev => ({ ...prev, seo: updatedSeo }))}
                                pagePath={`/services/${editing.slug}`}
                            />
                        </div>
                    )}

                    <div className="admin-bottom-bar" style={{ position: 'fixed', bottom: 0, left: '260px', right: 0, background: '#fff', padding: '20px 40px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', zIndex: 40 }}>
                        <button type="submit" disabled={saving} className="btn-primary" style={{ padding: '12px 32px' }}>
                            {saving ? 'Saving...' : 'Save Service'}
                        </button>
                    </div>
                </form>

                <style>{`
                    .admin-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
                    .admin-card-title { font-size: 18px; font-weight: 700; margin-bottom: 1.5rem; color: #1e293b; }
                    .admin-grid-1 { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
                    .admin-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                    .full-width { grid-column: span 2; }
                    .admin-label { display: block; font-size: 13px; font-weight: 600; color: #64748b; margin-bottom: 8px; }
                    .admin-input { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; color: #1e293b; outline: none; }
                    .admin-input:focus { border-color: #00AEEF; box-shadow: 0 0 0 3px rgba(0,174,239,0.1); }
                    .admin-textarea { width: 100%; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; color: #1e293b; outline: none; font-family: inherit; }
                    .btn-primary { background: #00AEEF; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
                    .btn-primary:hover { background: #008fcc; }
                    .btn-primary:disabled { background: #94a3b8; cursor: not-allowed; }
                    .btn-secondary { background: #fff; color: #475569; border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
                    .btn-secondary:hover { background: #f8fafc; border-color: #cbd5e1; }
                    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem; }
                    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem; }
                `}</style>
            </div>
        );
    }

    return (
        <>
            <header className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-corporate-blue flex items-center">
                        <Settings className="mr-3 text-corporate-cyan" size={32} /> Services Management
                    </h1>
                    <p className="text-gray-500 mt-2">Create, edit, and organize the specialized services offered.</p>
                </div>
                <button 
                  onClick={() => setEditing({ title: '', slug: '', description: '', features: [], heroImage: '', seo: { metaTitle: '', metaDescription: '', focusKeyword: '', ogImage: '' } })} 
                  className="bg-corporate-blue hover:bg-corporate-lightBlue text-white px-6 py-3 rounded-lg font-bold flex items-center transition-colors shadow-md hover:shadow-lg"
                >
                    <Plus size={20} className="mr-2" /> Add New Service
                </button>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm border-b uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Service Title</th>
                                <th className="px-6 py-4 font-semibold">URL Slug</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {services.map((service, idx) => (
                                <tr key={service._id || idx} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5 font-bold text-corporate-blue">{service.title}</td>
                                    <td className="px-6 py-5 text-gray-500">/services/{service.slug}</td>
                                    <td className="px-6 py-5"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Published</span></td>
                                    <td className="px-6 py-5 text-right flex justify-end space-x-3">
                                        <button onClick={() => setEditing(service)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-md"><Edit2 size={16}/></button>
                                        <button onClick={() => handleDelete(service._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-md"><Trash2 size={16}/></button>
                                    </td>
                                </tr>
                            ))}
                            {services.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">No services found in database. Add one to get started!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
