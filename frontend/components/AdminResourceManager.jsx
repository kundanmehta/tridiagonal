'use client';

import { useState, useEffect } from 'react';
import {
    FileText, Plus, Trash2, Calendar as CalendarIcon,
    ExternalLink, FileDown, Search, Filter,
    Image as ImageIcon, User, Briefcase, Factory,
    ArrowUp, ArrowDown, Type, AlignLeft,
    Image as ImageLucide
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import { API_URL, resolveImageUrl } from '@/lib/apiConfig';

import AdminSEOEditor from './AdminSEOEditor';

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
    const [activeTab, setActiveTab] = useState('general');

    
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
        const isNew = !editing._id;
        const method = isNew ? 'POST' : 'PUT';
        const url = isNew ? `${API_URL}/api/resources` : `${API_URL}/api/resources/${editing._id || editing.slug}`;
        console.log(`[AdminResourceManager] handleSave - method: ${method}, url: ${url}, isNew: ${isNew}`);

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ ...editing, resourceType: resType })
            });
            const json = await res.json();
            if (res.ok) {
                setMessage('✅ Resource saved successfully!');
                fetchItems();
                // Stay on the edit page — update editing state with the saved data
                if (json.data) setEditing(json.data);
            } else {
                setMessage(`❌ Error: ${json.error || 'Failed to save'}`);
            }
        } catch { setMessage('❌ Network error'); }
        setSaving(false);
    };

    const handleDelete = async (slug, id) => {
        if (!confirm('Permanently delete this resource?')) return;
        try {
            const res = await fetch(`${API_URL}/api/resources/${id || slug}`, {
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

    // Block management helpers
    const addBlock = (type) => {
        const newBlock = { blockType: type, text: '', subValue: '', image: '', link: '' };
        setEditing(p => ({
            ...p,
            contentBlocks: [...(p.contentBlocks || []), newBlock]
        }));
    };

    const removeBlock = (index) => {
        setEditing(p => ({
            ...p,
            contentBlocks: p.contentBlocks.filter((_, i) => i !== index)
        }));
    };

    const updateBlock = (index, updates) => {
        setEditing(p => {
            const blocks = [...(p.contentBlocks || [])];
            blocks[index] = { ...blocks[index], ...updates };
            return { ...p, contentBlocks: blocks };
        });
    };

    const moveBlock = (index, direction) => {
        setEditing(p => {
            const blocks = [...(p.contentBlocks || [])];
            if (direction === 'up' && index > 0) {
                [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
            } else if (direction === 'down' && index < blocks.length - 1) {
                [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
            }
            return { ...p, contentBlocks: blocks };
        });
    };

    const slugify = (text) => text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    if (loading) return <div style={{ padding: '2rem', color: '#64748b' }}>Loading {resType}s...</div>;

    if (editing) {
        return (
            <div style={{ maxWidth: '1000px', paddingBottom: '100px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                    <button onClick={() => setEditing(null)} className="btn-secondary">← Cancel</button>
                    <h1 style={{ fontSize: '28px', fontWeight: 800 }}>{editing._id ? 'Edit' : 'Create'} {resType}</h1>
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
                            <h2 className="admin-card-title">General Info</h2>
                            <div className="admin-grid-2">
                                <div className="full-width">
                                    <label className="admin-label">Title</label>
                                    <input 
                                        className="admin-input" 
                                        value={editing.title} 
                                        onChange={e => {
                                            const newTitle = e.target.value;
                                            setEditing(p => {
                                                const updates = { ...p, title: newTitle };
                                                // Auto-generate slug if it's currently empty or looks like it was auto-generated from previous title
                                                const currentSlug = p.slug || '';
                                                const oldAutoSlug = p.title ? slugify(p.title) : '';
                                                if (!currentSlug || currentSlug === oldAutoSlug) {
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
                                        placeholder="auto-generated" 
                                    />
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
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <input className="admin-input" value={editing.coverImage || ''} onChange={e => setEditing(p => ({ ...p, coverImage: e.target.value }))} />
                                        <label className="btn-secondary" style={{ cursor: 'pointer', flexShrink: 0 }}>
                                            Upload
                                            <input type="file" hidden onChange={e => handleImageUpload(e, (url) => setEditing(p => ({ ...p, coverImage: url })))} />
                                        </label>
                                        {editing.coverImage && (
                                            <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                                                <img src={resolveImageUrl(editing.coverImage)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        )}
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

                        {resType === 'Blog' ? (
                            <div className="admin-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 className="admin-card-title" style={{ margin: 0 }}>Structured Content Blocks</h2>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button type="button" className="btn-secondary" onClick={() => addBlock('heading')}><Type size={16} /> Heading</button>
                                        <button type="button" className="btn-secondary" onClick={() => addBlock('text')}><AlignLeft size={16} /> Text</button>
                                        <button type="button" className="btn-secondary" onClick={() => addBlock('image')}><ImageLucide size={16} /> Image</button>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {(editing.contentBlocks || []).map((block, idx) => {
                                        const bType = block.blockType || block.type; // Fallback for legacy
                                        return (
                                            <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', position: 'relative' }}>
                                                {/* Block Controls */}
                                                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                                                    <button type="button" className="icon-btn" onClick={() => moveBlock(idx, 'up')} disabled={idx === 0} title="Move Up"><ArrowUp size={14} /></button>
                                                    <button type="button" className="icon-btn" onClick={() => moveBlock(idx, 'down')} disabled={idx === editing.contentBlocks.length - 1} title="Move Down"><ArrowDown size={14} /></button>
                                                    <button type="button" className="icon-btn delete" onClick={() => removeBlock(idx)} title="Remove Block"><Trash2 size={14} /></button>
                                                </div>

                                                <div style={{ paddingRight: '100px' }}>
                                                    <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#00AEEF', marginBottom: '10px', display: 'block' }}>{bType} Block</span>
                                                    
                                                    {bType === 'heading' && (
                                                        <input 
                                                            className="admin-input" 
                                                            style={{ fontWeight: 700, fontSize: '18px' }} 
                                                            placeholder="Enter section heading (e.g. Overview)..." 
                                                            value={block.text} 
                                                            onChange={e => updateBlock(idx, { text: e.target.value })} 
                                                        />
                                                    )}

                                                    {bType === 'text' && (
                                                        <RichTextEditor 
                                                            value={block.text} 
                                                            onChange={v => updateBlock(idx, { text: v })} 
                                                        />
                                                    )}

                                                    {bType === 'image' && (
                                                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '20px' }}>
                                                            <label style={{ width: '120px', height: '120px', background: '#e2e8f0', border: '2px dashed #cbd5e1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}>
                                                                {block.image ? (
                                                                    <img src={resolveImageUrl(block.image)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                ) : (
                                                                    <Plus size={24} color="#94a3b8" />
                                                                )}
                                                                <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, (url) => updateBlock(idx, { image: url }))} />
                                                            </label>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                                <div>
                                                                    <label className="admin-label">Image Link (Optional)</label>
                                                                    <input className="admin-input" placeholder="https://..." value={block.link} onChange={e => updateBlock(idx, { link: e.target.value })} />
                                                                </div>
                                                                <div>
                                                                    <label className="admin-label">Caption / Alt Text</label>
                                                                    <input className="admin-input" placeholder="Enter caption..." value={block.subValue} onChange={e => updateBlock(idx, { subValue: e.target.value })} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {(editing.contentBlocks || []).length === 0 && (
                                        <div style={{ textAlign: 'center', padding: '40px', background: '#f8fafc', border: '2px dashed #e2e8f0', borderRadius: '12px', color: '#64748b' }}>
                                            No content blocks yet. Use the buttons above to start building your blog with headings, text, and images.
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            (resType === 'Blog' || resType === 'Case Study') && (
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
                            )
                        )}

                        {resType === 'Blog' && (
                            <div className="admin-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 className="admin-card-title" style={{ margin: 0 }}>Technical Contributors</h2>
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => setEditing(p => ({
                                            ...p,
                                            contributors: [...(p.contributors || []), { name: '', role: '', organization: 'Tridiagonal Solutions' }]
                                        }))}
                                    >
                                        + Add Contributor
                                    </button>
                                </div>
                                {(editing.contributors || []).length === 0 && (
                                    <p style={{ color: '#94a3b8', fontSize: '14px' }}>No contributors added yet. Click "Add Contributor" above.</p>
                                )}
                                {(editing.contributors || []).map((c, idx) => (
                                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 1fr auto', gap: '12px', alignItems: 'end', marginBottom: '12px', padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                        {/* Avatar Upload */}
                                        <div>
                                            <label className="admin-label">Photo</label>
                                            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: c.image ? 'transparent' : '#e2e8f0', border: '2px dashed #cbd5e1', cursor: 'pointer', overflow: 'hidden' }}>
                                                {c.image ? (
                                                    <img src={resolveImageUrl(c.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                                ) : (
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                                )}
                                                <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, (url) => { const u = [...(editing.contributors || [])]; u[idx] = { ...u[idx], image: url }; setEditing(p => ({ ...p, contributors: u })); })} />
                                            </label>
                                        </div>
                                        <div>
                                            <label className="admin-label">Full Name</label>
                                            <input className="admin-input" placeholder="Mr. John Smith" value={c.name} onChange={e => { const u = [...(editing.contributors || [])]; u[idx] = { ...u[idx], name: e.target.value }; setEditing(p => ({ ...p, contributors: u })); }} />
                                        </div>
                                        <div>
                                            <label className="admin-label">Role / Title</label>
                                            <input className="admin-input" placeholder="Project Manager - CFD" value={c.role} onChange={e => { const u = [...(editing.contributors || [])]; u[idx] = { ...u[idx], role: e.target.value }; setEditing(p => ({ ...p, contributors: u })); }} />
                                        </div>
                                        <div>
                                            <label className="admin-label">Organization</label>
                                            <input className="admin-input" placeholder="Tridiagonal Solutions" value={c.organization} onChange={e => { const u = [...(editing.contributors || [])]; u[idx] = { ...u[idx], organization: e.target.value }; setEditing(p => ({ ...p, contributors: u })); }} />
                                        </div>
                                        <button type="button" onClick={() => { const u = (editing.contributors || []).filter((_, i) => i !== idx); setEditing(p => ({ ...p, contributors: u })); }} style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        </>
                    )}

                    {activeTab === 'seo' && (
                        <div className="admin-card">
                            <h2 className="admin-card-title">Search Engine Optimization</h2>
                            <AdminSEOEditor
                                seoData={editing.seo || { metaTitle: '', metaDescription: '', focusKeyword: '', ogImage: '' }}
                                onChange={(updatedSeo) => setEditing(prev => ({ ...prev, seo: updatedSeo }))}
                                pagePath={`/resources/${resType === 'Blog' ? 'blogs' : resType === 'Case Study' ? 'case-studies' : resType.toLowerCase() + 's'}/${editing.slug}`}
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
          .alert-success { padding: 1rem; background: #f0fdf4; color: #166534; border-radius: 10px; margin-bottom: 2rem; border: 1px solid #bbf7d0; font-weight: 600; }
          .alert-error { padding: 1rem; background: #fef2f2; color: #991b1b; border-radius: 10px; margin-bottom: 2rem; border: 1px solid #fecaca; font-weight: 600; }
          .admin-bottom-bar { position: fixed; bottom: 0; right: 0; left: 260px; background: #fff; padding: 1rem 3rem; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; z-index: 1000; }
          .icon-btn { background: #fff; border: 1px solid #e2e8f0; color: #64748b; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
          .icon-btn:hover { border-color: #00AEEF; color: #00AEEF; }
          .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; background: #fef2f2; }
          .icon-btn:disabled { opacity: 0.3; cursor: not-allowed; }
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
                                        <img src={resolveImageUrl(item.coverImage)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                                <button className="btn-secondary" style={{ color: '#ef4444', marginLeft: 'auto' }} onClick={() => handleDelete(item.slug, item._id)}><Trash2 size={14} /></button>
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
