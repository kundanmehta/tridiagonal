'use client';

import { useState, useEffect } from 'react';
import {
    Factory, Layout, Plus, Trash2, ChevronRight,
    Monitor, ShieldCheck, Image as ImageIcon, Save, X, Eye
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com';

export default function AdminIndustryManager({ slug }) {
    const [industries, setIndustries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [activeTab, setActiveTab] = useState('general'); // general | modeling | validation
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

    useEffect(() => {
        fetchIndustries();
    }, [slug]);

    const fetchIndustries = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/industries`);
            const json = await res.json();
            const list = json.data || [];
            setIndustries(list);

            if (slug) {
                const item = list.find(i => i.slug === slug);
                if (item) setEditing(item);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        const method = editing._id ? 'PUT' : 'POST';
        const url = editing._id ? `${API_URL}/api/industries/${editing._id}` : `${API_URL}/api/industries`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editing)
            });

            if (res.ok) {
                setMessage('✅ Industry saved successfully!');
                const updated = await res.json();
                if (!editing._id) {
                    setIndustries(prev => [...prev, updated.data]);
                    setEditing(updated.data); // Stay on the page with the newly created ID
                } else {
                    setIndustries(prev => prev.map(i => i._id === updated.data._id ? updated.data : i));
                }
            } else {
                const err = await res.json();
                setMessage(`❌ Error: ${err.error || 'Failed to save'}`);
            }
        } catch (err) {
            setMessage('❌ Network error');
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e, path) => {
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
                updateField(path, json.url);
            }
        } catch {
            alert('Upload failed');
        }
    };

    const updateField = (path, value) => {
        setEditing(prev => {
            const keys = path.split('.');
            const newData = JSON.parse(JSON.stringify(prev)); // Deep clone for safety
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const addItem = (path, defaultItem) => {
        setEditing(prev => {
            const keys = path.split('.');
            const newData = JSON.parse(JSON.stringify(prev)); // Deep clone for safety
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            const list = current[keys[keys.length - 1]] || [];
            current[keys[keys.length - 1]] = [...list, defaultItem];
            return newData;
        });
    };

    const removeItem = (path, index) => {
        setEditing(prev => {
            const keys = path.split('.');
            const newData = JSON.parse(JSON.stringify(prev)); // Deep clone for safety
            let current = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            const list = [...current[keys[keys.length - 1]]];
            list.splice(index, 1);
            current[keys[keys.length - 1]] = list;
            return newData;
        });
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading industries...</div>;

    if (editing) {
        return (
            <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={() => setEditing(null)} className="btn-secondary">← Back</button>
                        <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Manage Industry: {editing.title}</h1>
                    </div>
                    <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                {message && <div style={{ padding: '1rem', background: '#f0fdf4', color: '#166534', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #bbf7d0' }}>{message}</div>}

                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem', gap: '2rem' }}>
                    <button onClick={() => setActiveTab('general')} style={{ padding: '12px 0', fontSize: '14px', fontWeight: 600, color: activeTab === 'general' ? '#00AEEF' : '#64748b', borderBottom: activeTab === 'general' ? '2px solid #00AEEF' : 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'none', cursor: 'pointer' }}>General Overview</button>
                    <button onClick={() => setActiveTab('modeling')} style={{ padding: '12px 0', fontSize: '14px', fontWeight: 600, color: activeTab === 'modeling' ? '#00AEEF' : '#64748b', borderBottom: activeTab === 'modeling' ? '2px solid #00AEEF' : 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'none', cursor: 'pointer' }}>Modeling & Simulation</button>
                    <button onClick={() => setActiveTab('validation')} style={{ padding: '12px 0', fontSize: '14px', fontWeight: 600, color: activeTab === 'validation' ? '#00AEEF' : '#64748b', borderBottom: activeTab === 'validation' ? '2px solid #00AEEF' : 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none', background: 'none', cursor: 'pointer' }}>Tech Validation</button>
                </div>

                <form onSubmit={handleSave}>
                    {activeTab === 'general' && (
                        <div className="admin-card">
                            <h3 className="section-header">Basic Information</h3>
                            <div className="grid-2">
                                <div>
                                    <label className="admin-label">Industry Title</label>
                                    <input className="admin-input" value={editing.title} onChange={e => updateField('title', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="admin-label">Slug</label>
                                    <input className="admin-input" value={editing.slug} onChange={e => updateField('slug', e.target.value)} required />
                                </div>
                                <div className="full-width">
                                    <label className="admin-label">Overview Description</label>
                                    <textarea className="admin-input" rows={3} value={editing.overview} onChange={e => updateField('overview', e.target.value)} required />
                                </div>
                            </div>
                        </div>
                    )}

                    {(activeTab === 'modeling' || activeTab === 'validation') && (
                        <ServiceAreaEditor
                            area={activeTab === 'modeling' ? 'modelingSimulation' : 'techValidation'}
                            data={activeTab === 'modeling' ? editing.modelingSimulation : editing.techValidation}
                            updateField={updateField}
                            addItem={addItem}
                            removeItem={removeItem}
                            handleImageUpload={handleImageUpload}
                            editing={editing}
                        />
                    )}

                    <div className="admin-bottom-bar">
                        <button type="submit" disabled={saving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 30px' }}>
                            <Save size={20} />
                            {saving ? 'Saving Changes...' : 'Save All Changes'}
                        </button>
                    </div>
                </form>

                <style>{`
          .admin-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; }
          .section-header { font-size: 18px; font-weight: 700; margin-bottom: 1.5rem; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          .full-width { grid-column: span 2; }
          .admin-label { display: block; font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
          .admin-input { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; }
          .btn-primary { background: #00AEEF; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
          .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
          .btn-secondary { padding: 8px 16px; border-radius: 8px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 13px; font-weight: 600; }
          .btn-danger { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; }
          .btn-add { background: #f8fafc; border: 1px dotted #cbd5e1; padding: 12px; width: 100%; border-radius: 8px; cursor: pointer; color: #64748b; font-weight: 600; margin-top: 1rem; }
          .btn-add:hover { background: #f1f5f9; color: #00AEEF; }

          .admin-bottom-bar { 
             position: fixed; 
             bottom: 0; 
             left: 260px; 
             right: 0; 
             background: rgba(255, 255, 255, 0.9); 
             backdrop-filter: blur(8px); 
             border-top: 1px solid #e2e8f0; 
             padding: 1rem 2rem; 
             display: flex; 
             justify-content: flex-end; 
             z-index: 100; 
             box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.05); 
           }

           @media (max-width: 1024px) {
             .admin-bottom-bar { left: 0; }
           }
        `}</style>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>Industries Manager</h1>
                    <p style={{ color: '#64748b' }}>Configure high-level industry pages and nested service areas.</p>
                </div>
                <button className="btn-primary" onClick={() => setEditing({ title: '', slug: '', overview: '', modelingSimulation: { enabled: false }, techValidation: { enabled: false } })}>
                    + Add New Industry
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {industries.map(ind => (
                    <div key={ind._id} className="admin-card" style={{ transition: 'all 0.2s' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', background: 'rgba(0,174,239,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00AEEF' }}>
                                    <Factory size={20} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{ind.title}</h3>
                                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>/{ind.slug}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                {ind.modelingSimulation?.enabled && <div title="Modeling Enabled" style={{ padding: '4px', borderRadius: '4px', background: '#e0f2fe', color: '#0369a1' }}><Monitor size={14} /></div>}
                                {ind.techValidation?.enabled && <div title="Validation Enabled" style={{ padding: '4px', borderRadius: '4px', background: '#f0fdf4', color: '#166534' }}><ShieldCheck size={14} /></div>}
                            </div>
                        </div>
                        <p style={{ fontSize: '14px', color: '#475569', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ind.overview}</p>
                        <div style={{ display: 'flex', gap: '8px', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                            <button className="btn-secondary" onClick={() => setEditing(ind)}>Edit Content</button>
                            <a href={`/industries/${ind.slug}`} target="_blank" className="btn-secondary" style={{ textDecoration: 'none', color: 'inherit' }}><Eye size={14} /> View</a>
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
          .admin-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; }
          .admin-card:hover { border-color: #00AEEF; box-shadow: 0 4px 12px rgba(0,174,239,0.08); }
          .btn-primary { background: #00AEEF; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; }
          .btn-secondary { padding: 8px 16px; border-radius: 8px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
      `}</style>
        </div>
    );
}

function ServiceAreaEditor({ area, data, updateField, addItem, removeItem, handleImageUpload, editing }) {
    if (!data) return <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Initialize this service area to start adding content.</div>;

    return (
        <div>
            <div className="admin-card" style={{ background: data.enabled ? '#fff' : '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="section-header" style={{ margin: 0, border: 'none' }}>{area === 'modelingSimulation' ? 'Modeling & Simulation' : 'Technology Validation'} Service Area</h3>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={data.enabled} onChange={e => updateField(`${area}.enabled`, e.target.checked)} />
                        Enabled for this industry
                    </label>
                </div>

                {data.enabled && (
                    <>
                        {/* HERO */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h4 className="section-subtitle">Hero Section</h4>
                            <div className="grid-2">
                                <div className="full-width">
                                    <label className="admin-label">Hero Title</label>
                                    <input className="admin-input" value={data.hero?.title || ''} onChange={e => updateField(`${area}.hero.title`, e.target.value)} />
                                </div>
                                <div className="full-width">
                                    <label className="admin-label">Hero Description</label>
                                    <input className="admin-input" value={data.hero?.desc || ''} onChange={e => updateField(`${area}.hero.desc`, e.target.value)} />
                                </div>
                                <div className="full-width">
                                    <label className="admin-label">Hero Background Image</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input className="admin-input" value={data.hero?.bgImage || ''} onChange={e => updateField(`${area}.hero.bgImage`, e.target.value)} />
                                        <label className="btn-secondary" style={{ cursor: 'pointer' }}>Upload <input type="file" hidden onChange={e => handleImageUpload(e, `${area}.hero.bgImage`)} /></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* INTRO */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h4 className="section-subtitle">Intro Section</h4>
                            <div className="grid-2">
                                <div>
                                    <label className="admin-label">Intro Badge</label>
                                    <input className="admin-input" value={data.intro?.badge || ''} onChange={e => updateField(`${area}.intro.badge`, e.target.value)} />
                                </div>
                                <div>
                                    <label className="admin-label">Intro Heading</label>
                                    <input className="admin-input" value={data.intro?.heading || ''} onChange={e => updateField(`${area}.intro.heading`, e.target.value)} />
                                </div>
                                <div className="full-width">
                                    <label className="admin-label">Paragraphs (One per line)</label>
                                    <textarea className="admin-input" rows={4} value={data.intro?.paragraphs?.join('\n') || ''} onChange={e => updateField(`${area}.intro.paragraphs`, e.target.value.split('\n'))} />
                                </div>
                                <div className="full-width">
                                    <label className="admin-label">Intro Image</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input className="admin-input" value={data.intro?.image || ''} onChange={e => updateField(`${area}.intro.image`, e.target.value)} />
                                        <label className="btn-secondary" style={{ cursor: 'pointer' }}>Upload <input type="file" hidden onChange={e => handleImageUpload(e, `${area}.intro.image`)} /></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MAIN BODY (CAPABILITIES) */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h4 className="section-subtitle">Capabilities Cards</h4>
                            <div className="grid-2">
                                <div>
                                    <label className="admin-label">Section Title</label>
                                    <input className="admin-input" value={data.mainBody?.title || ''} onChange={e => updateField(`${area}.mainBody.title`, e.target.value)} />
                                </div>
                                <div>
                                    <label className="admin-label">Section Badge</label>
                                    <input className="admin-input" value={data.mainBody?.badge || ''} onChange={e => updateField(`${area}.mainBody.badge`, e.target.value)} />
                                </div>
                                <div className="full-width">
                                    <label className="admin-label">Section Description</label>
                                    <textarea className="admin-input" rows={2} value={data.mainBody?.desc || ''} onChange={e => updateField(`${area}.mainBody.desc`, e.target.value)} />
                                </div>
                            </div>
                            <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                                {data.mainBody?.cards?.map((card, i) => (
                                    <div key={i} className="sub-card">
                                        <button type="button" onClick={() => removeItem(`${area}.mainBody.cards`, i)} className="btn-danger" style={{ position: 'absolute', top: '10px', right: '10px' }}>Remove</button>
                                        <label className="admin-label">Card Title</label>
                                        <input className="admin-input-sm" value={card.title} onChange={e => updateField(`${area}.mainBody.cards.${i}.title`, e.target.value)} />
                                        <label className="admin-label">Description</label>
                                        <textarea className="admin-input-sm" rows={3} value={card.desc} onChange={e => updateField(`${area}.mainBody.cards.${i}.desc`, e.target.value)} />
                                        <label className="admin-label">Card Image</label>
                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                                            <input className="admin-input-sm" style={{ marginBottom: 0, flex: 1 }} value={card.image} onChange={e => updateField(`${area}.mainBody.cards.${i}.image`, e.target.value)} />
                                            <label className="btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '12px' }}>Upload <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, `${area}.mainBody.cards.${i}.image`)} /></label>
                                        </div>
                                        {card.image && (
                                            <div style={{ marginBottom: '8px' }}>
                                                <img 
                                                    src={card.image.startsWith('http') ? card.image : `${API_URL}${card.image}`} 
                                                    alt="preview" 
                                                    style={{ maxWidth: '100px', borderRadius: '6px', border: '1px solid #e2e8f0' }} 
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            </div>
                                        )}
                                        
                                        <div className="grid-2" style={{ gap: '10px' }}>
                                            <div>
                                                <label className="admin-label">CTA Text</label>
                                                <input className="admin-input-sm" value={card.ctaText || 'VIEW MORE'} onChange={e => updateField(`${area}.mainBody.cards.${i}.ctaText`, e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="admin-label">Target Link (Internal)</label>
                                                <input className="admin-input-sm" placeholder="/services/..." value={card.link || ''} onChange={e => updateField(`${area}.mainBody.cards.${i}.link`, e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={() => addItem(`${area}.mainBody.cards`, { title: '', desc: '', image: '', ctaText: 'VIEW MORE', link: '' })} className="btn-add">+ Add Capability Card</button>
                        </div>

                        {/* SHOWCASE (USE CASES) */}
                        <div style={{ marginBottom: '3rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h4 className="section-subtitle" style={{ margin: 0 }}>Showcase / Use Cases</h4>
                                <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <input type="checkbox" checked={data.showcase?.enabled} onChange={e => updateField(`${area}.showcase.enabled`, e.target.checked)} /> Enable Showcase
                                </label>
                            </div>
                            {data.showcase?.enabled && (
                                <>
                                    <div className="grid-2">
                                        <div><label className="admin-label">Title</label><input className="admin-input" value={data.showcase.title || ''} onChange={e => updateField(`${area}.showcase.title`, e.target.value)} /></div>
                                        <div className="full-width"><label className="admin-label">Description</label><textarea className="admin-input" value={data.showcase.desc || ''} onChange={e => updateField(`${area}.showcase.desc`, e.target.value)} /></div>
                                    </div>
                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', overflowX: 'auto', padding: '10px' }}>
                                        {data.showcase.cards?.map((card, i) => (
                                            <div key={i} className="sub-card" style={{ minWidth: '250px' }}>
                                                <button type="button" onClick={() => removeItem(`${area}.showcase.cards`, i)} className="btn-danger" style={{ float: 'right' }}>X</button>
                                                <label className="admin-label">Title</label><input className="admin-input-sm" value={card.title} onChange={e => updateField(`${area}.showcase.cards.${i}.title`, e.target.value)} />
                                                <label className="admin-label">Image</label>
                                                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                                                    <input className="admin-input-sm" style={{ marginBottom: 0, flex: 1 }} value={card.image} onChange={e => updateField(`${area}.showcase.cards.${i}.image`, e.target.value)} />
                                                    <label className="btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '12px' }}>Upload <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, `${area}.showcase.cards.${i}.image`)} /></label>
                                                </div>
                                                {card.image && (
                                                    <div style={{ marginBottom: '8px' }}>
                                                        <img 
                                                            src={card.image.startsWith('http') ? card.image : `${API_URL}${card.image}`} 
                                                            alt="preview" 
                                                            style={{ maxWidth: '80px', borderRadius: '6px', border: '1px solid #e2e8f0' }} 
                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                        />
                                                    </div>
                                                )}
                                                <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" checked={card.isCaseStudy} onChange={e => updateField(`${area}.showcase.cards.${i}.isCaseStudy`, e.target.checked)} /> Is Case Study</label>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addItem(`${area}.showcase.cards`, { title: '', image: '', isCaseStudy: false, gradient: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)' })} className="btn-secondary" style={{ height: 'fit-content' }}>+ Add</button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* INDUSTRIES SECTION */}
                        <div style={{ marginBottom: '3rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h4 className="section-subtitle" style={{ margin: 0 }}>Related Industries Section</h4>
                                <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <input type="checkbox" checked={data.industriesSection?.enabled !== false} onChange={e => updateField(`${area}.industriesSection.enabled`, e.target.checked)} />
                                    Show this section
                                </label>
                            </div>
                            <div className="grid-2">
                                <div>
                                    <label className="admin-label">Section Heading</label>
                                    <input className="admin-input" placeholder="e.g. Industries" value={data.industriesSection?.title || ''} onChange={e => updateField(`${area}.industriesSection.title`, e.target.value)} />
                                </div>
                                <div className="full-width">
                                    <label className="admin-label">Section Subheading</label>
                                    <input className="admin-input" placeholder="e.g. Your Trusted Partner in Modeling & Simulation." value={data.industriesSection?.subtitle || ''} onChange={e => updateField(`${area}.industriesSection.subtitle`, e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* WHY CHOOSE US */}
                        <div style={{ marginBottom: '3rem' }}>
                            <h4 className="section-subtitle">Why Choose Us Items</h4>
                            <div style={{ marginBottom: '1rem' }}>
                                <label className="admin-label">Section Title</label>
                                <input className="admin-input" value={data.whyChooseUs?.title || ''} onChange={e => updateField(`${area}.whyChooseUs.title`, e.target.value)} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                                {data.whyChooseUs?.items?.map((item, i) => (
                                    <div key={i} className="sub-card">
                                        <button type="button" onClick={() => removeItem(`${area}.whyChooseUs.items`, i)} className="btn-danger" style={{ float: 'right' }}>X</button>
                                        <label className="admin-label">Icon (lucide key)</label>
                                        <select className="admin-input-sm" value={item.icon} onChange={e => updateField(`${area}.whyChooseUs.items.${i}.icon`, e.target.value)}>
                                            <option value="Users">Users</option>
                                            <option value="Briefcase">Consulting</option>
                                            <option value="Settings">Solutions</option>
                                            <option value="Handshake">Engagement</option>
                                            <option value="Globe">Value</option>
                                            <option value="Home">Facility</option>
                                            <option value="ShieldCheck">Integrity</option>
                                        </select>
                                        <label className="admin-label">Title</label>
                                        <input className="admin-input-sm" value={item.title} onChange={e => updateField(`${area}.whyChooseUs.items.${i}.title`, e.target.value)} />
                                        <label className="admin-label">Description</label>
                                        <textarea className="admin-input-sm" rows={2} value={item.desc} onChange={e => updateField(`${area}.whyChooseUs.items.${i}.desc`, e.target.value)} />
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={() => addItem(`${area}.whyChooseUs.items`, { title: '', desc: '', icon: 'Users' })} className="btn-add">+ Add Item</button>
                        </div>

                        {/* Technical Details (Modals) Section - Only for Modeling */}
                        {area === 'modelingSimulation' && (
                            <div style={{ marginTop: '3rem' }}>
                                <h4 className="section-subtitle">Technical Details (Modals)</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {data.modals?.map((modal, i) => (
                                        <div key={i} className="sub-card" style={{ borderLeft: '4px solid #00AEEF' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                                                <div style={{ flex: 1 }}>
                                                    <label className="admin-label">Links to Capability Card</label>
                                                    <select className="admin-input-sm" value={modal.capabilityName} onChange={e => updateField(`${area}.modals.${i}.capabilityName`, e.target.value)}>
                                                        <option value="">Select Card</option>
                                                        {data.mainBody?.cards?.map(c => <option key={c.title} value={c.title}>{c.title}</option>)}
                                                    </select>
                                                </div>
                                                <button type="button" onClick={() => removeItem(`${area}.modals`, i)} className="btn-danger" style={{ height: 'fit-content' }}>Delete Modal Info</button>
                                            </div>
                                            <div className="grid-2" style={{ marginTop: '1rem' }}>
                                                <div className="full-width"><label className="admin-label">Main Modal Title</label><input className="admin-input-sm" value={modal.mainTitle || ''} onChange={e => updateField(`${area}.modals.${i}.mainTitle`, e.target.value)} /></div>
                                                <div className="full-width"><label className="admin-label">Overview</label><textarea className="admin-input-sm" rows={3} value={modal.overview || ''} onChange={e => updateField(`${area}.modals.${i}.overview`, e.target.value)} /></div>
                                                
                                                <div className="full-width">
                                                    <label className="admin-label">Technical Feature Image</label>
                                                    <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                                                        <input className="admin-input-sm" style={{ marginBottom: 0 }} value={modal.image || ''} onChange={e => updateField(`${area}.modals.${i}.image`, e.target.value)} />
                                                        <label className="btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>Upload <input type="file" hidden onChange={e => handleImageUpload(e, `${area}.modals.${i}.image`)} /></label>
                                                    </div>
                                                    {modal.image && (
                                                        <div style={{ marginTop: '10px' }}>
                                                            <img 
                                                                src={modal.image.startsWith('http') ? modal.image : `${API_URL}${modal.image}`} 
                                                                alt="Modal Preview" 
                                                                style={{ maxWidth: '150px', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
                                                                onError={(e) => { e.target.style.display = 'none'; }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="full-width"><label className="admin-label">Tools Applied (Comma separated)</label><input className="admin-input-sm" value={modal.tools?.join(', ') || ''} onChange={e => updateField(`${area}.modals.${i}.tools`, e.target.value.split(',').map(t => t.trim()))} /></div>
                                            </div>
                                            <div style={{ marginTop: '1rem' }}>
                                                <label className="admin-label">Inner Technical Sections</label>
                                                {modal.technicalSections?.map((sec, j) => (
                                                    <div key={j} style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                                                        <div className="grid-2" style={{ marginBottom: '8px' }}>
                                                            <div>
                                                                <label className="admin-label" style={{ fontSize: '9px' }}>Section Title</label>
                                                                <input className="admin-input-sm" placeholder="e.g. CFD Centric Post Processing" value={sec.title || ''} onChange={e => updateField(`${area}.modals.${i}.technicalSections.${j}.title`, e.target.value)} />
                                                            </div>
                                                            <div>
                                                                <label className="admin-label" style={{ fontSize: '9px' }}>Subtitle</label>
                                                                <input className="admin-input-sm" placeholder="e.g. Study of Separation process" value={sec.subtitle || ''} onChange={e => updateField(`${area}.modals.${i}.technicalSections.${j}.subtitle`, e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <label className="admin-label" style={{ fontSize: '9px' }}>Section Content</label>
                                                        <textarea className="admin-input-sm" rows={4} placeholder="Detailed technical content..." value={sec.content || ''} onChange={e => updateField(`${area}.modals.${i}.technicalSections.${j}.content`, e.target.value)} />
                                                        <button type="button" onClick={() => {
                                                            const list = [...modal.technicalSections];
                                                            list.splice(j, 1);
                                                            updateField(`${area}.modals.${i}.technicalSections`, list);
                                                        }} className="btn-danger" style={{ padding: '4px 12px', marginTop: '4px' }}>Remove Sub-section</button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => {
                                                    const list = modal.technicalSections || [];
                                                    updateField(`${area}.modals.${i}.technicalSections`, [...list, { title: '', subtitle: '', content: '' }]);
                                                }} className="btn-secondary" style={{ fontSize: '11px', padding: '10px 15px', width: '100%', borderStyle: 'dashed' }}>+ Add Sub-section</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => addItem(`${area}.modals`, { capabilityName: '', mainTitle: '', overview: '', technicalSections: [], tools: [], image: '' })} className="btn-add">+ Add Technical Modal Details</button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <style>{`
        .section-subtitle { font-size: 14px; font-weight: 800; color: #1e293b; margin-bottom: 1.25rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #00AEEF; display: inline-block; padding-bottom: 4px; }
        .sub-card { background: #fdfdfd; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem; position: relative; }
        .admin-input-sm { width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; margin-bottom: 10px; }
      `}</style>
        </div>
    );
}
