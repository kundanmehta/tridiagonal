'use client';
import { useState, useEffect, use } from 'react';

export default function FormSubmissionsPage({ params }) {
  const resolvedParams = use(params);
  const formId = resolvedParams.id;
  const [submissions, setSubmissions] = useState([]);
  const [formName, setFormName] = useState('');
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com';

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    // Fetch form info
    fetch(`${API_URL}/api/forms/${formId}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json())
      .then(j => setFormName(j.data?.name || 'Unknown Form'));
    // Fetch submissions
    fetch(`${API_URL}/api/forms/${formId}/submissions`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json())
      .then(j => { setSubmissions(j.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [formId]);

  if (loading) return <div style={{ padding: '3rem', color: '#64748b' }}>Loading submissions...</div>;

  // Get all unique field keys from submissions
  const allKeys = [...new Set(submissions.flatMap(s => Object.keys(s.data || {})))];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a' }}>
      <style>{`
        .sub-table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
        .sub-table th { background: #f8fafc; padding: 12px 16px; text-align: left; font-size: 13px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }
        .sub-table td { padding: 12px 16px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sub-table tr:hover td { background: #f8fafc; }
        .status-badge { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <a href="/admin/forms" style={{ color: '#64748b', fontSize: '1.5rem', textDecoration: 'none' }}>←</a>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{formName} — Submissions</h1>
          <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>{submissions.length} total submissions</p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>No submissions received yet.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="sub-table">
            <thead>
              <tr>
                <th>#</th>
                {allKeys.map(k => <th key={k} style={{ textTransform: 'capitalize' }}>{k.replace(/_/g, ' ')}</th>)}
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, i) => (
                <tr key={sub._id}>
                  <td>{i + 1}</td>
                  {allKeys.map(k => <td key={k} title={sub.data?.[k] || '-'}>{sub.data?.[k] || '-'}</td>)}
                  <td>
                    <span className="status-badge" style={{
                      background: sub.status === 'New' ? '#eff6ff' : sub.status === 'Reviewed' ? '#fefce8' : '#f0fdf4',
                      color: sub.status === 'New' ? '#1d4ed8' : sub.status === 'Reviewed' ? '#a16207' : '#15803d'
                    }}>{sub.status}</span>
                  </td>
                  <td>{new Date(sub.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
