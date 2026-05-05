'use client';
import { useState, useEffect } from 'react';
import { API_URL } from '@/lib/apiConfig';
import { Settings as SettingsIcon, Mail, Save, CheckCircle, Shield, Globe, Lock, Hash, RefreshCcw } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    smtp: {
      host: '',
      port: '587',
      user: '',
      pass: ''
    },
    recipientEmail: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    fetch(`${API_URL}/api/admin/settings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          setSettings(json.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch settings error:', err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch(`${API_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: 'error', text: 'Failed to update settings.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error occurred.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
      <RefreshCcw className="animate-spin text-blue-500" size={32} />
      <span className="text-gray-500 font-medium">Initializing Global Settings...</span>
    </div>
  );

  return (
    <div className="admin-container">
      <style>{`
        .admin-container {
          max-width: 1200px;
          margin: 0;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #0f172a;
          padding: 0;
        }
        
        .admin-header { 
          margin-bottom: 2rem; 
          display: flex; 
          align-items: center; 
          justify-content: justify-start; 
          gap: 1rem;
        }
        .admin-title { font-size: 2rem; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -0.03em; }
        .admin-subtitle { color: #64748b; font-size: 0.95rem; margin: 0.25rem 0 0 0; }
        
        .admin-msg { 
          padding: 0.875rem 1.25rem; 
          margin-bottom: 1.5rem; 
          border-radius: 10px; 
          font-weight: 600; 
          font-size: 0.9rem; 
          display: flex; 
          align-items: center; 
          gap: 12px;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .msg-success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
        .msg-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
        
        .admin-section { 
          background: #ffffff; 
          border: 1px solid #e2e8f0; 
          border-radius: 16px; 
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }
        .admin-section-header { 
          padding: 1.25rem 1.5rem;
          background: #fcfdfe;
          border-bottom: 1px solid #f1f5f9;
          display: flex; 
          align-items: center; 
          gap: 12px;
        }
        .admin-badge { 
          background: #00AEEF; 
          color: #fff; 
          width: 36px; 
          height: 36px; 
          border-radius: 10px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          box-shadow: 0 4px 12px rgba(0, 174, 239, 0.15);
        }
        .admin-section-header h2 { font-size: 1.15rem; font-weight: 700; color: #1e293b; margin: 0; }
        
        .admin-form-body { padding: 1.5rem; }
        
        .admin-grid { 
          display: grid; 
          gap: 1.25rem; 
          grid-template-columns: repeat(2, 1fr); 
        }
        
        .admin-field { display: flex; flex-direction: column; gap: 0.5rem; }
        .admin-label { 
          font-size: 0.75rem; 
          font-weight: 700; 
          color: #64748b; 
          text-transform: uppercase; 
          letter-spacing: 0.05em;
          margin-left: 0.25rem;
        }
        
        .input-group { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 1rem; color: #94a3b8; }
        .admin-input { 
          width: 100%; 
          padding: 0.75rem 1rem 0.75rem 2.75rem; 
          border: 1.5px solid #e2e8f0; 
          border-radius: 12px; 
          font-size: 0.95rem; 
          color: #0f172a; 
          background: #fcfdfe; 
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        .admin-input:focus { 
          outline: none; 
          border-color: #00AEEF; 
          background: #ffffff; 
          box-shadow: 0 0 0 4px rgba(0, 174, 239, 0.08);
          transform: translateY(-1px);
        }
        .admin-input::placeholder { color: #cbd5e1; }
        
        .info-box {
          background: #f0f9ff;
          border: 1px solid #e0f2fe;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.5rem;
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          font-size: 0.9rem;
          color: #0369a1;
          line-height: 1.5;
        }

        .admin-bottom-bar { 
          position: fixed; 
          bottom: 1.5rem; 
          right: 1.5rem; 
          z-index: 50; 
        }
        .admin-btn-save { 
          display: inline-flex; 
          align-items: center; 
          gap: 12px; 
          background: #00AEEF; 
          color: #ffffff; 
          border: none; 
          padding: 1rem 2.5rem; 
          font-size: 1rem; 
          font-weight: 700; 
          border-radius: 14px; 
          cursor: pointer; 
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); 
          box-shadow: 0 10px 25px -5px rgba(0, 174, 239, 0.4); 
        }
        .admin-btn-save:hover:not(:disabled) { 
          background: #0096ce; 
          transform: translateY(-2px) scale(1.02); 
          box-shadow: 0 15px 30px -5px rgba(0, 174, 239, 0.5); 
        }
        .admin-btn-save:active { transform: translateY(0) scale(0.98); }
        .admin-btn-save:disabled { opacity: 0.7; cursor: not-allowed; }

        @media (max-width: 768px) {
          .admin-grid { grid-template-columns: 1fr; }
          .admin-bottom-bar { bottom: 1rem; right: 1rem; left: 1rem; }
          .admin-btn-save { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="admin-header">
        <div className="admin-badge" style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #00AEEF, #007bbd)' }}>
          <SettingsIcon size={24} />
        </div>
        <div>
          <h1 className="admin-title">Global Settings</h1>
          <p className="admin-subtitle">Configure system-wide parameters and external integrations.</p>
        </div>
      </div>

      {message && (
        <div className={`admin-msg ${message.type === 'success' ? 'msg-success' : 'msg-error'}`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <Shield size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* NOTIFICATION SETTINGS */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge" style={{ background: '#22c55e' }}>
              <CheckCircle size={18} />
            </span>
            <h2>Notification Settings</h2>
          </div>
          
          <div className="admin-form-body">
            <div className="info-box" style={{ background: '#f0fdf4', borderColor: '#dcfce7', color: '#166534' }}>
              <Shield size={20} className="shrink-0 mt-0.5 text-green-600" />
              <span>
                Specify the <strong>Recipient Email Address</strong> that will receive all form submissions. 
                This acts as the primary notification hub for the entire platform.
              </span>
            </div>

            <div className="admin-field" style={{ maxWidth: '400px' }}>
              <label className="admin-label">Recipient Email Address</label>
              <div className="input-group">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  className="admin-input"
                  placeholder="admin@tridiagonal.com"
                  value={settings.recipientEmail || ''}
                  onChange={e => setSettings({ ...settings, recipientEmail: e.target.value })}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 ml-1 italic">
                * All website inquiries will be forwarded to this address.
              </p>
            </div>
          </div>
        </div>

        {/* SMTP SECTION */}
        <div className="admin-section">
          <div className="admin-section-header">
            <span className="admin-badge">
              <Mail size={18} />
            </span>
            <h2>Email (SMTP) Configuration</h2>
          </div>
          
          <div className="admin-form-body">
            <div className="info-box">
              <Shield size={20} className="shrink-0 mt-0.5 text-blue-500" />
              <span>
                These credentials are used by the system to send automatic email notifications for form submissions. 
                <strong> Dashboard values will take precedence over .env file configurations.</strong>
              </span>
            </div>

            <div className="admin-grid">
              <div className="admin-field">
                <label className="admin-label">SMTP Host</label>
                <div className="input-group">
                  <Globe className="input-icon" size={18} />
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g., smtp.gmail.com"
                    value={settings.smtp?.host || ''}
                    onChange={e => setSettings({ ...settings, smtp: { ...settings.smtp, host: e.target.value } })}
                  />
                </div>
              </div>

              <div className="admin-field">
                <label className="admin-label">SMTP Port</label>
                <div className="input-group">
                  <Hash className="input-icon" size={18} />
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g., 587 or 465"
                    value={settings.smtp?.port || ''}
                    onChange={e => setSettings({ ...settings, smtp: { ...settings.smtp, port: e.target.value } })}
                  />
                </div>
              </div>

              <div className="admin-field">
                <label className="admin-label">SMTP Username</label>
                <div className="input-group">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    className="admin-input"
                    placeholder="admin@tridiagonal.com"
                    value={settings.smtp?.user || ''}
                    onChange={e => setSettings({ ...settings, smtp: { ...settings.smtp, user: e.target.value } })}
                  />
                </div>
              </div>

              <div className="admin-field">
                <label className="admin-label">SMTP Password</label>
                <div className="input-group">
                  <Lock className="input-icon" size={18} />
                  <input
                    type="password"
                    className="admin-input"
                    placeholder="••••••••••••"
                    value={settings.smtp?.pass || ''}
                    onChange={e => setSettings({ ...settings, smtp: { ...settings.smtp, pass: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="admin-bottom-bar">
          <button type="submit" disabled={saving} className="admin-btn-save">
            {saving ? (
              <RefreshCcw className="animate-spin" size={20} />
            ) : <Save size={20} />}
            <span>{saving ? 'Applying...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
