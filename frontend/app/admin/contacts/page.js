'use client';
import { useState, useEffect } from 'react';
import { Users, Mail, Clock, Filter, Eye, X, CheckCircle, MessageSquare, AlertCircle, RefreshCcw, ChevronDown, Calendar, User, Search, Inbox, ExternalLink, ArrowRight, Database, LayoutPanelTop, Info, FileText, Globe, Subtitles } from 'lucide-react';
import { API_URL } from '@/lib/apiConfig';

export default function AdminContactsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [formSource, setFormSource] = useState('All');
  const [dynamicForms, setDynamicForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('structured'); // 'structured', 'metadata', 'raw'

  const fetchSubmissions = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      let url = `${API_URL}/api/admin/submissions`;
      if (formSource !== 'All') {
        url += `?source=${encodeURIComponent(formSource)}`;
      }
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      setSubmissions(json.data || []);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDynamicForms = async () => {
    try {
      const res = await fetch(`${API_URL}/api/forms`);
      const json = await res.json();
      setDynamicForms(json.data || []);
    } catch (err) {
      console.error('Error fetching dynamic forms:', err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [formSource]);

  useEffect(() => {
    fetchDynamicForms();
  }, []);

  const updateStatus = async (item, newStatus) => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`${API_URL}/api/admin/submissions/${item.type}/${item._id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setSubmissions(prev => prev.map(s => s._id === item._id ? { ...s, status: newStatus } : s));
        if (selected && selected._id === item._id) {
          setSelected(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const filtered = submissions.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && submissions.length === 0) return (
    <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
      <RefreshCcw className="animate-spin text-blue-500" size={32} />
      <span className="text-gray-500 font-medium tracking-tight">Syncing inquiries from server...</span>
    </div>
  );

  return (
    <div className="admin-page-wrapper">
      <style>{`
        .admin-page-wrapper {
          max-width: 1300px;
          margin: 0;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: #1e293b;
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .admin-header-v2 { 
          margin-bottom: 1.5rem; 
          display: flex; 
          align-items: center; 
          justify-content: space-between;
        }
        .header-content { display: flex; align-items: center; gap: 1.25rem; }
        .header-icon-box { 
          background: linear-gradient(135deg, #00AEEF 0%, #007bbd 100%);
          color: white;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px -4px rgba(0, 174, 239, 0.3);
        }
        .page-titles h1 { font-size: 1.85rem; font-weight: 800; color: #0f172a; margin: 0; letter-spacing: -0.025em; }
        .page-titles p { color: #64748b; font-size: 0.95rem; margin-top: 2px; font-weight: 500; }

        .toolbar {
          background: #ffffff;
          padding: 1rem 1.25rem;
          border-radius: 18px;
          border: 1px solid #eef2f6;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 280px;
        }
        .search-container input {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 0.75rem 1rem 0.75rem 2.8rem;
          border-radius: 12px;
          font-size: 0.95rem;
          color: #1e293b;
          transition: all 0.2s;
        }
        .search-container input:focus {
          background: #ffffff;
          border-color: #00AEEF;
          box-shadow: 0 0 0 4px rgba(0, 174, 239, 0.06);
          outline: none;
        }
        .search-container .search-icon { position: absolute; left: 1rem; top: 0.85rem; color: #94a3b8; }

        .filter-select-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .fancy-select {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 0.7rem 2.5rem 0.7rem 1rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.8rem center;
          background-size: 0.85rem;
          min-width: 200px;
          transition: all 0.2s;
        }
        .fancy-select:hover { border-color: #00AEEF; }

        .refresh-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }
        .refresh-btn:hover { background: #f8fafc; color: #00AEEF; border-color: #00AEEF; transform: rotate(30deg); }

        /* GRID & CARDS */
        .grid-v2 {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .premium-card {
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 20px;
          padding: 1.5rem;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          overflow: hidden;
        }
        .premium-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 4px; height: 100%;
          background: transparent;
          transition: background 0.3s;
        }
        .premium-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
          border-color: #e2e8f0;
        }
        .premium-card:hover::before { background: #00AEEF; }

        .badge-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
        .source-pill {
          font-size: 0.7rem;
          font-weight: 800;
          color: #00AEEF;
          background: rgba(0, 174, 239, 0.08);
          padding: 0.25rem 0.75rem;
          border-radius: 8px;
          letter-spacing: 0.02em;
        }
        
        .status-pill {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .status-pill.new { background: #f0fdf4; color: #15803d; }
        .status-pill.reviewed { background: #fffbeb; color: #b45309; }
        .status-pill.replied { background: #f8fafc; color: #64748b; }

        .card-main h3 { font-size: 1.2rem; font-weight: 700; color: #0f172a; margin: 0 0 0.25rem 0; }
        .card-email { font-size: 0.9rem; color: #64748b; display: flex; align-items: center; gap: 6px; margin-bottom: 1.25rem; }
        
        .snippet {
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.6;
          background: #fbfcfe;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          font-style: italic;
          border: 1px solid #f1f5f9;
        }

        .card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .time-info { font-size: 0.75rem; color: #94a3b8; display: flex; align-items: center; gap: 4px; }
        .details-link {
          background: #f8fafc;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        .details-link:hover { background: #eef2f6; color: #00AEEF; border-color: #00AEEF; }

        /* EMPTY STATE */
        .empty-state-v2 {
          text-align: center;
          padding: 5rem 2rem;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #eef2f6;
          margin-top: 1rem;
        }
        .empty-icon-wrap {
          width: 80px; height: 80px;
          background: #f8fafc;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: #cbd5e1;
          position: relative;
        }
        .empty-state-v2 h2 { font-size: 1.5rem; font-weight: 700; color: #1e293b; margin-bottom: 0.5rem; }
        .empty-state-v2 p { color: #94a3b8; max-width: 320px; margin: 0 auto; line-height: 1.5; }

        /* MODAL */
        .glass-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(5px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.3s ease;
        }
        .crm-modal-v4 {
          background: #fff;
          width: 100%;
          max-width: 900px;
          height: 85vh;
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          animation: crmSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes crmSlide { 
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .crm-header-v4 {
          padding: 2rem 2.5rem;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .crm-header-info h2 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0; }
        .crm-header-info p { font-size: 0.85rem; color: #64748b; margin-top: 4px; font-weight: 500; }

        .crm-tabs-v4 {
          display: flex;
          background: #f8fafc;
          padding: 0 2.5rem;
          border-bottom: 1px solid #e2e8f0;
          gap: 2rem;
        }
        .crm-tab-v4 {
          padding: 1rem 0;
          font-size: 0.85rem;
          font-weight: 700;
          color: #94a3b8;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
          border: none;
          background: transparent;
        }
        .crm-tab-v4:hover { color: #64748b; }
        .crm-tab-v4.active { color: #00AEEF; }
        .crm-tab-v4.active::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; width: 100%; height: 2px;
          background: #00AEEF;
        }

        .crm-body-v4 { flex: 1; overflow-y: auto; padding: 2.5rem; }
        
        /* DATA TABLE STYLE */
        .crm-data-table { width: 100%; border-collapse: separate; border-spacing: 0; }
        .crm-data-table tr td { padding: 1.25rem 0; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
        .crm-data-table tr:last-child td { border-bottom: none; }
        
        .crm-label-col { width: 30%; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; padding-right: 2rem !important; }
        .crm-value-col { font-size: 0.95rem; font-weight: 600; color: #1e293b; line-height: 1.5; }
        .crm-value-col p { margin: 0; white-space: pre-wrap; }

        /* RAW DATA CRM */
        .crm-raw-box {
          background: #0f172a;
          color: #94a3b8;
          padding: 2rem;
          border-radius: 12px;
          font-family: inherit;
          font-size: 0.85rem;
          line-height: 1.7;
          overflow-x: auto;
        }
        .crm-raw-box span { color: #38bdf8; } /* property keys */
        .crm-raw-box em { color: #fbbf24; font-style: normal; } /* strings */

        .crm-footer-v4 {
          padding: 1.5rem 2.5rem;
          background: #fff;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .crm-close-btn { 
          background: #00AEEF; color: #fff; padding: 0.75rem 2rem; border-radius: 10px; 
          font-weight: 700; font-size: 0.9rem; border: none; cursor: pointer; transition: all 0.2s;
        }
        .crm-close-btn:hover { background: #0096ce; box-shadow: 0 4px 12px rgba(0, 174, 239, 0.2); }

        /* CRM STATUS CONTROLLER */
        .crm-status-control {
          display: flex; background: #f1f5f9; padding: 4px; border-radius: 10px; gap: 4px;
        }
        .crm-status-btn {
          padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700;
          color: #64748b; transition: all 0.2s; border: none; background: transparent; cursor: pointer;
        }
        .crm-status-btn:hover:not(.active) { background: rgba(0, 0, 0, 0.05); color: #1e293b; }
        .crm-status-btn.active {
          background: #fff; color: #00AEEF; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .crm-header-v4 .close-icon-wrap {
          width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
          border-radius: 50%; color: #94a3b8; cursor: pointer; transition: all 0.2s;
          border: none; background: transparent; padding: 0; outline: none;
        }
        .crm-header-v4 .close-icon-wrap:hover { background: #f1f5f9; color: #1e293b; transform: rotate(90deg); }
      `}</style>

      <div className="admin-header-v2">
        <div className="header-content">
          <div className="header-icon-box">
            <Users size={28} />
          </div>
          <div className="page-titles">
            <h1>Client Inquiries</h1>
            <p>Unified data management for all website touchpoints.</p>
          </div>
        </div>
        <button className="refresh-btn" onClick={fetchSubmissions} title="Refresh Data">
          <RefreshCcw size={20} />
        </button>
      </div>

      <div className="toolbar">
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search leads by name, email or message..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-select-wrap">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Source Filter</label>
          <select 
            className="fancy-select"
            value={formSource}
            onChange={e => setFormSource(e.target.value)}
          >
            <option value="All">All Form Sources</option>
            <optgroup label="Standard Forms">
              <option value="Contact Us Form">Contact Us Page</option>
            </optgroup>
            <optgroup label="Dynamic Builder Forms">
              {dynamicForms.map(form => (
                <option key={form._id} value={form.name}>{form.name}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state-v2">
          <div className="empty-icon-wrap">
            <Inbox size={40} />
            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full"><AlertCircle className="text-blue-500" size={20} /></div>
          </div>
          <h2>No inquiries found</h2>
          <p>We couldn't find any submissions matching your current search or filter criteria.</p>
        </div>
      ) : (
        <div className="list-container-v2">
          <style>{`
            .list-container-v2 {
              background: #fff;
              border-radius: 20px;
              border: 1px solid #eef2f6;
              overflow: hidden;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
            }
            .list-header {
              display: grid;
              grid-template-columns: 180px 1fr 150px 120px 100px;
              padding: 1rem 1.5rem;
              background: #f8fafc;
              border-bottom: 2px solid #eef2f6;
              gap: 1rem;
              align-items: center;
            }
            .list-header span {
              font-size: 0.75rem;
              font-weight: 800;
              color: #94a3b8;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .list-row {
              display: grid;
              grid-template-columns: 180px 1fr 150px 120px 100px;
              padding: 1.25rem 1.5rem;
              gap: 1rem;
              align-items: center;
              border-bottom: 1px solid #f1f5f9;
              cursor: pointer;
              transition: all 0.2s;
            }
            .list-row:last-child { border-bottom: none; }
            .list-row:hover { background: #fbfcfe; }
            
            .row-name { font-weight: 700; color: #1e293b; font-size: 0.95rem; display: flex; flex-direction: column; gap: 4px; }
            .row-email { font-size: 0.8rem; color: #64748b; font-weight: 500; }
            .row-message { font-size: 0.9rem; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 1rem; font-style: italic; }
            .row-source { display: inline-flex; }
            .row-time { font-size: 0.85rem; color: #94a3b8; font-weight: 600; text-align: right; }

            /* Grid layout adjustment for smaller screens */
            @media (max-width: 1000px) {
              .list-header, .list-row {
                grid-template-columns: 150px 1fr 120px 80px;
              }
              .row-email { display: none; }
            }
          `}</style>
          
          <div className="list-header">
            <span>Customer</span>
            <span>Snippet / Message</span>
            <span>Source</span>
            <span>Status</span>
            <span style={{ textAlign: 'right' }}>Date</span>
          </div>

          <div className="list-body">
            {filtered.map(item => (
              <div 
                key={item._id} 
                className="list-row"
                onClick={() => setSelected(item)}
              >
                <div className="row-name">
                  {item.name}
                  <span className="row-email">{item.email}</span>
                </div>

                <div className="row-message">
                  {item.message}
                </div>

                <div className="row-source">
                  <span className="source-pill" style={{ margin: 0 }}>{item.source}</span>
                </div>

                <div>
                  <span className={`status-pill ${item.status.toLowerCase()}`}>
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'New' ? 'bg-green-500' : 
                      item.status === 'Replied' ? 'bg-blue-400' : 
                      'bg-yellow-500'
                    }`} />
                    {item.status}
                  </span>
                </div>

                <div className="row-time">
                  {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* ENTERPRISE CRM MODAL V4 */}
      {selected && (
        <div className="glass-overlay" onClick={() => setSelected(null)}>
          <div className="crm-modal-v4" onClick={e => e.stopPropagation()}>
            <div className="crm-header-v4">
              <div className="crm-header-info">
                <h2>{selected.name}</h2>
                <p>Submission ID: {selected._id} • {new Date(selected.createdAt).toLocaleString()}</p>
              </div>
              <button 
                className="close-icon-wrap"
                onClick={() => setSelected(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="crm-tabs-v4">
              <button 
                className={`crm-tab-v4 ${viewMode === 'structured' ? 'active' : ''}`}
                onClick={() => setViewMode('structured')}
              >
                Form Submission
              </button>
              <button 
                className={`crm-tab-v4 ${viewMode === 'metadata' ? 'active' : ''}`}
                onClick={() => setViewMode('metadata')}
              >
                Contact Details
              </button>
              <button 
                className={`crm-tab-v4 ${viewMode === 'raw' ? 'active' : ''}`}
                onClick={() => setViewMode('raw')}
              >
                Raw Data (JSON)
              </button>
            </div>

            <div className="crm-body-v4">
              {viewMode === 'structured' && (
                <table className="crm-data-table">
                  <tbody>
                    {Object.entries(selected.data).map(([key, value]) => {
                      const label = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim();
                      return (
                        <tr key={key}>
                          <td className="crm-label-col">{label}</td>
                          <td className="crm-value-col">
                            <p>{String(value) || '—'}</p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {viewMode === 'metadata' && (
                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-2 gap-12">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer Name</label>
                      <p className="text-lg font-bold text-slate-800">{selected.name}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                      <p className="text-lg font-bold text-blue-500">{selected.email}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Origin Source</label>
                      <p className="font-semibold text-slate-700">{selected.source}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Submission Date</label>
                      <p className="font-semibold text-slate-700">{new Date(selected.createdAt).toDateString()}</p>
                    </div>
                  </div>
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-4">
                    <div className="bg-blue-500 p-2 rounded-lg text-white"><Info size={20} /></div>
                    <div>
                      <h4 className="font-bold text-blue-900 text-sm">Automated Insight</h4>
                      <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                        This lead engaged via the <strong>{selected.source}</strong>. 
                        The data has been aggregated from the {selected.type} collection for centralized management.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {viewMode === 'raw' && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Backend Document State</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] font-bold">LIVE SYNC</span>
                  </div>
                  <pre className="crm-raw-box">
                    {JSON.stringify(selected, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="crm-footer-v4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Change Lead Status</span>
                <div className="crm-status-control">
                  {['New', 'Reviewed', 'Replied'].map(status => (
                    <button 
                      key={status}
                      onClick={() => updateStatus(selected, status)}
                      className={`crm-status-btn ${selected.status === status ? 'active' : ''}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setSelected(null)}
                className="crm-close-btn"
              >
                Confirm & Close
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}
