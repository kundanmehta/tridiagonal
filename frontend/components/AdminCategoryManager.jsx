'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, Search } from 'lucide-react';
import { API_URL } from '@/lib/apiConfig';



export default function AdminCategoryManager({ resType }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', slug: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchCategories();
    }, [resType]);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/api/categories?type=${resType}`);
            const json = await res.json();
            setCategories(json.data || []);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        const token = localStorage.getItem('admin_token');
        const method = editingCategory ? 'PUT' : 'POST';
        const url = editingCategory
            ? `${API_URL}/api/categories/${editingCategory._id}`
            : `${API_URL}/api/categories`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...formData, resourceType: resType })
            });

            const data = await res.json();
            if (res.ok) {
                setMessage({ type: 'success', text: '✅ Category saved successfully!' });
                setFormData({ name: '', slug: '' });
                fetchCategories();
                setTimeout(() => {
                    setShowModal(false);
                    setEditingCategory(null);
                    setMessage({ type: '', text: '' });
                }, 1500);
            } else {
                setMessage({ type: 'error', text: `❌ ${data.error || 'Failed to save category'}` });
            }
        } catch (err) {
            setMessage({ type: 'error', text: '❌ Network error. Is the server running?' });
            console.error('Save failed:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        const token = localStorage.getItem('admin_token');
        try {
            const res = await fetch(`${API_URL}/api/categories/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchCategories();
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const openModal = (cat = null) => {
        if (cat) {
            setEditingCategory(cat);
            setFormData({ name: cat.name, slug: cat.slug });
        } else {
            setEditingCategory(null);
            setFormData({ name: '', slug: '' });
        }
        setShowModal(true);
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Manage {resType} Categories</h1>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>Create and manage categories for your {resType.toLowerCase()}s</p>
                </div>
                <button
                    onClick={() => openModal()}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#00AEEF',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,174,239,0.2)'
                    }}
                >
                    <Plus size={18} /> Add Category
                </button>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Search size={18} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ border: 'none', outline: 'none', fontSize: '14px', width: '100%' }}
                    />
                </div>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading...</div>
                ) : filteredCategories.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No categories found</div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc' }}>
                                <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Name</th>
                                <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Slug</th>
                                <th style={{ textAlign: 'right', padding: '12px 24px', fontSize: '12px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.map((cat) => (
                                <tr key={cat._id} style={{ borderTop: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '500', color: '#0f172a' }}>{cat.name}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#64748b' }}>{cat.slug}</td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <button
                                                onClick={() => openModal(cat)}
                                                style={{ padding: '6px', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat._id)}
                                                style={{ padding: '6px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(15, 23, 42, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        background: '#fff',
                        width: '100%',
                        maxWidth: '500px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} style={{ padding: '24px' }}>
                            {message.text && (
                                <div style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    fontSize: '14px',
                                    background: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
                                    color: message.type === 'success' ? '#166534' : '#991b1b',
                                    border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`
                                }}>
                                    {message.text}
                                </div>
                            )}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        const slug = name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
                                        setFormData({ name, slug });
                                    }}
                                    placeholder="e.g. Engineering"
                                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none' }}
                                />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Slug</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="e.g. engineering"
                                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', background: '#f8fafc' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: saving ? '#94a3b8' : '#00AEEF',
                                        color: '#fff',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: saving ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {saving ? 'Saving...' : editingCategory ? 'Update' : 'Create'} Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
