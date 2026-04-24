'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/apiConfig';

const EMPTY_JOB = {
  id: '', title: '', department: '', location: 'Pune, India', type: 'Full-time',
  date: '', experience: '', education: '', overview: '',
  responsibilities: [''], requirements: [''], benefits: [''],
  isActive: true,
};

const DEPT_OPTIONS = [
  'Advanced Modeling & Simulation (CFD/FEA)',
  'Technology Validation & Scale-up Centre',
  'Digital Solutions & AI',
  'Process Consulting',
  'HR & Operations',
  'Finance',
];

export default function AdminCareersEditor() {
  const router = useRouter();
  const [pageData, setPageData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedJob, setExpandedJob] = useState(null); // index or 'new'
  const [newJob, setNewJob] = useState({ ...EMPTY_JOB });
  const [jobSaving, setJobSaving] = useState(null); // index or 'new'

  
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';

  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    Promise.all([
      fetch(`${API_URL}/api/careers/page`, { headers: { Authorization: `Bearer ${t}` } }).then(r => r.json()),
      fetch(`${API_URL}/api/careers/jobs/all`, { headers: { Authorization: `Bearer ${t}` } }).then(r => r.json()),
      fetch(`${API_URL}/api/forms`, { headers: { Authorization: `Bearer ${t}` } }).then(r => r.json()),
    ]).then(([pageJson, jobsJson, formsJson]) => {
      const d = pageJson.data || {};
      setPageData({
        heroSection: {
          title: d.heroSection?.title || 'Explore opportunities to grow in <span class="gradient-text">advanced technology</span> space',
          description: d.heroSection?.description || "We're a group of talented professionals who are passionate about applying advanced technologies in process industry",
          bgImage: d.heroSection?.bgImage || '/images/careers-bg.png',
        },
        coreValuesSection: {
          heading: d.coreValuesSection?.heading || 'Our Core Values',
          description: d.coreValuesSection?.description || 'Fostering Growth and Success for Our Customers and Employees',
          values: d.coreValuesSection?.values?.length > 0 ? d.coreValuesSection.values : [
            { title: 'Innovation', desc: 'Encouraging new ideas, creativity, and continuous improvement.' },
            { title: 'Customer Centricity', desc: "Putting customers' needs first and striving to exceed their expectations." },
            { title: 'Excellence', desc: 'Striving for the highest standards of quality and performance.' },
            { title: 'Results-Driven', desc: 'Focusing on achieving measurable outcomes and goals.' },
            { title: 'Teamwork', desc: 'Collaborating effectively and valuing diverse perspectives.' },
            { title: 'Agility', desc: 'Being adaptable and responsive to changing market and technological trends.' },
          ],
        },
        opportunitiesSection: {
          heading: d.opportunitiesSection?.heading || 'Check out our latest opportunities',
        },
        selectedFormId: d.selectedFormId?._id || d.selectedFormId || '',
      });
      setJobs(jobsJson.data || []);
      setForms(formsJson.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  /* ── Page-level save ── */
  const handlePageSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/api/careers/page`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(pageData),
      });
      setMessage(res.ok ? '✅ Page settings saved!' : '❌ Error saving settings.');
    } catch { setMessage('❌ Network error.'); }
    setSaving(false);
  };

  /* ── Image upload ── */
  const handleImageUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    try {
      setSaving(true);
      setMessage('Uploading image...');
      const res = await fetch(`${API_URL}/api/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      const json = await res.json();
      if (res.ok) { callback(`${API_URL}${json.url}`); setMessage('✅ Image uploaded!'); }
      else { setMessage('❌ Upload failed.'); }
    } catch { setMessage('❌ Upload error.'); }
    setSaving(false);
  };

  /* ── Core value helpers ── */
  const updateValue = (idx, field, val) => setPageData(prev => {
    const values = [...prev.coreValuesSection.values];
    values[idx] = { ...values[idx], [field]: val };
    return { ...prev, coreValuesSection: { ...prev.coreValuesSection, values } };
  });
  const addValue = () => setPageData(prev => ({ ...prev, coreValuesSection: { ...prev.coreValuesSection, values: [...prev.coreValuesSection.values, { title: '', desc: '' }] } }));
  const removeValue = (idx) => setPageData(prev => {
    const values = [...prev.coreValuesSection.values]; values.splice(idx, 1);
    return { ...prev, coreValuesSection: { ...prev.coreValuesSection, values } };
  });

  /* ── Job edit helpers ── */
  const updateJob = (idx, field, val) => setJobs(prev => { const j = [...prev]; j[idx] = { ...j[idx], [field]: val }; return j; });
  const updateJobList = (idx, listName, listIdx, val) => setJobs(prev => {
    const j = [...prev]; const list = [...(j[idx][listName] || [])]; list[listIdx] = val; j[idx] = { ...j[idx], [listName]: list }; return j;
  });
  const addJobListItem = (idx, listName) => setJobs(prev => { const j = [...prev]; j[idx] = { ...j[idx], [listName]: [...(j[idx][listName] || []), ''] }; return j; });
  const removeJobListItem = (idx, listName, listIdx) => setJobs(prev => {
    const j = [...prev]; const list = [...j[idx][listName]]; list.splice(listIdx, 1); j[idx] = { ...j[idx], [listName]: list }; return j;
  });

  /* ── Save individual job ── */
  const saveJob = async (idx) => {
    const job = jobs[idx];
    setJobSaving(idx);
    try {
      const res = await fetch(`${API_URL}/api/careers/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(job),
      });
      if (res.ok) setMessage(`✅ "${job.title}" saved!`);
      else setMessage('❌ Error saving job.');
    } catch { setMessage('❌ Network error.'); }
    setJobSaving(null);
  };

  /* ── Toggle job active ── */
  const toggleJob = async (idx) => {
    const job = jobs[idx];
    const updated = { ...job, isActive: !job.isActive };
    try {
      const res = await fetch(`${API_URL}/api/careers/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(updated),
      });
      if (res.ok) { updateJob(idx, 'isActive', !job.isActive); setMessage(`✅ Visibility updated for "${job.title}"`); }
    } catch { setMessage('❌ Network error.'); }
  };

  /* ── Delete job ── */
  const deleteJob = async (idx) => {
    const job = jobs[idx];
    if (!confirm(`Delete "${job.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API_URL}/api/careers/jobs/${job.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { setJobs(prev => prev.filter((_, i) => i !== idx)); setMessage(`✅ "${job.title}" deleted.`); }
    } catch { setMessage('❌ Network error.'); }
  };

  /* ── New job helpers ── */
  const updateNewJobList = (listName, listIdx, val) => setNewJob(prev => { const list = [...(prev[listName] || [])]; list[listIdx] = val; return { ...prev, [listName]: list }; });
  const addNewJobListItem = (listName) => setNewJob(prev => ({ ...prev, [listName]: [...(prev[listName] || []), ''] }));
  const removeNewJobListItem = (listName, listIdx) => setNewJob(prev => { const list = [...prev[listName]]; list.splice(listIdx, 1); return { ...prev, [listName]: list }; });

  const saveNewJob = async () => {
    if (!newJob.id || !newJob.title) { setMessage('❌ Job Slug (ID) and Title are required.'); return; }
    setJobSaving('new');
    try {
      const res = await fetch(`${API_URL}/api/careers/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newJob),
      });
      const json = await res.json();
      if (res.ok) {
        setJobs(prev => [json.data, ...prev]);
        setNewJob({ ...EMPTY_JOB });
        setExpandedJob(null);
        setMessage(`✅ "${json.data.title}" created!`);
      } else { setMessage(`❌ ${json.error || 'Error creating job.'}`); }
    } catch { setMessage('❌ Network error.'); }
    setJobSaving(null);
  };

  if (loading) return <div style={{ padding: '3rem', color: '#64748b' }}>Loading Careers CMS...</div>;

  const styles = `
    .admin-section { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; margin-bottom: 2.5rem; overflow: hidden; }
    .admin-section-header { background: #f8fafc; padding: 1.25rem 2rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 14px; }
    .admin-badge { background: #00AEEF; color: #fff; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 700; font-size: 13px; flex-shrink: 0; }
    .admin-form-body { padding: 2rem; }
    .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .admin-col-full { grid-column: span 2; }
    .admin-label { display: block; font-size: 0.875rem; font-weight: 600; color: #475569; margin-bottom: 0.5rem; }
    .admin-input, .admin-textarea, .admin-select { width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.75rem 1rem; box-sizing: border-box; font-family: inherit; font-size: 14px; }
    .admin-input:focus, .admin-textarea:focus, .admin-select:focus { outline: none; border-color: #00AEEF; box-shadow: 0 0 0 3px rgba(0,174,239,0.15); }
    .admin-array-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; }
    .admin-btn-remove { background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; }
    .admin-btn-add { width: 100%; border: 2px dashed #cbd5e1; background: transparent; color: #64748b; font-weight: 600; padding: 0.75rem 1rem; border-radius: 10px; cursor: pointer; font-size: 14px; margin-top: 0.5rem; }
    .admin-btn-add:hover { border-color: #00AEEF; color: #00AEEF; }
    .admin-btn-save { background: #00AEEF; color: #fff; font-weight: 600; padding: 0.75rem 2.5rem; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
    .admin-btn-save:disabled { opacity: 0.6; }
    .admin-bottom-bar { position: fixed; bottom: 0; left: 260px; right: 0; background: rgba(255,255,255,0.97); border-top: 1px solid #e2e8f0; padding: 1.25rem 3rem; display: flex; justify-content: flex-end; z-index: 100; backdrop-filter: blur(8px); }
    .job-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 1rem; overflow: hidden; }
    .job-card-header { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; cursor: pointer; gap: 12px; }
    .job-card-header:hover { background: #f1f5f9; }
    .job-badge-active { background: #dcfce7; color: #166534; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .job-badge-inactive { background: #fef2f2; color: #991b1b; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .list-item-row { display: flex; gap: 8px; margin-bottom: 8px; align-items: center; }
    .list-item-input { flex: 1; border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; font-size: 13px; font-family: inherit; }
    .img-preview { width: 100%; max-height: 140px; object-fit: cover; border-radius: 8px; margin-top: 8px; border: 1px solid #e2e8f0; }
    .upload-label { display: inline-flex; align-items: center; gap: 6px; background: #00AEEF; color: #fff; padding: 8px 18px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 600; margin-top: 8px; }
  `;

  const renderJobEditor = (job, idx, isNew = false) => {
    const updateFn = isNew
      ? (field, val) => setNewJob(prev => ({ ...prev, [field]: val }))
      : (field, val) => updateJob(idx, field, val);
    const updateListFn = isNew ? updateNewJobList : (ln, li, val) => updateJobList(idx, ln, li, val);
    const addListFn = isNew ? addNewJobListItem : (ln) => addJobListItem(idx, ln);
    const removeListFn = isNew ? removeNewJobListItem : (ln, li) => removeJobListItem(idx, ln, li);

    const renderListEditor = (listName, label) => (
      <div style={{ marginBottom: '1.5rem' }}>
        <label className="admin-label">{label}</label>
        {(job[listName] || []).map((item, li) => (
          <div key={li} className="list-item-row">
            <input className="list-item-input" value={item} onChange={e => updateListFn(listName, li, e.target.value)} placeholder={`${label} item ${li + 1}`} />
            <button type="button" className="admin-btn-remove" onClick={() => removeListFn(listName, li)}>✕</button>
          </div>
        ))}
        <button type="button" className="admin-btn-add" onClick={() => addListFn(listName)}>+ Add {label} item</button>
      </div>
    );

    return (
      <div style={{ padding: '1.5rem' }}>
        <div className="admin-grid" style={{ marginBottom: '1.5rem' }}>
          <div>
            <label className="admin-label">Job Title *</label>
            <input className="admin-input" value={job.title} onChange={e => updateFn('title', e.target.value)} placeholder="e.g. Project Engineer" />
          </div>
          <div>
            <label className="admin-label">URL Slug (ID) *{isNew && <span style={{ color: '#94a3b8', fontWeight: 400 }}> — used in URL e.g. /careers/your-slug</span>}</label>
            <input className="admin-input" value={job.id} onChange={e => updateFn('id', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))} placeholder="e.g. project-engineer" disabled={!isNew} style={{ background: !isNew ? '#f1f5f9' : '#fff' }} />
          </div>
          <div>
            <label className="admin-label">Department</label>
            <select className="admin-select" value={job.department} onChange={e => updateFn('department', e.target.value)}>
              <option value="">-- Select Department --</option>
              {DEPT_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="admin-label">Job Type</label>
            <select className="admin-select" value={job.type} onChange={e => updateFn('type', e.target.value)}>
              <option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option>
            </select>
          </div>
          <div>
            <label className="admin-label">Location</label>
            <input className="admin-input" value={job.location} onChange={e => updateFn('location', e.target.value)} placeholder="Pune, India" />
          </div>
          <div>
            <label className="admin-label">Date Posted</label>
            <input className="admin-input" value={job.date} onChange={e => updateFn('date', e.target.value)} placeholder="January 8, 2026" />
          </div>
          <div>
            <label className="admin-label">Experience Required</label>
            <input className="admin-input" value={job.experience} onChange={e => updateFn('experience', e.target.value)} placeholder="1–3 years" />
          </div>
          <div>
            <label className="admin-label">Education Required</label>
            <input className="admin-input" value={job.education} onChange={e => updateFn('education', e.target.value)} placeholder="Master's in Engineering" />
          </div>
          <div className="admin-col-full">
            <label className="admin-label">About the Role (Overview)</label>
            <textarea className="admin-textarea" rows={4} value={job.overview} onChange={e => updateFn('overview', e.target.value)} placeholder="Describe the role..." />
          </div>
        </div>
        {renderListEditor('responsibilities', 'Key Responsibilities')}
        {renderListEditor('requirements', 'Requirements & Qualifications')}
        {renderListEditor('benefits', 'What We Offer (Benefits)')}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          {isNew ? (
            <button type="button" onClick={saveNewJob} disabled={jobSaving === 'new'} className="admin-btn-save">
              {jobSaving === 'new' ? 'Creating...' : '+ Create Job Posting'}
            </button>
          ) : (
            <button type="button" onClick={() => saveJob(idx)} disabled={jobSaving === idx} className="admin-btn-save">
              {jobSaving === idx ? 'Saving...' : '✓ Save this Job'}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#0f172a', paddingBottom: '6rem' }}>
      <style>{styles}</style>

      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0 }}>Careers Page CMS</h1>
        <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>Manage the Careers page content, core values, and all job postings.</p>
      </div>

      {message && (
        <div style={{ padding: '1rem', marginBottom: '2rem', borderRadius: '8px', background: message.includes('❌') ? '#fef2f2' : '#f0fdf4', color: message.includes('❌') ? '#991b1b' : '#166534', fontWeight: 600 }}>
          {message}
        </div>
      )}

      <form onSubmit={handlePageSave}>
        {/* 1. HERO SECTION */}
        <section className="admin-section">
          <div className="admin-section-header"><span className="admin-badge">1</span><h2 style={{ margin: 0, fontWeight: 700 }}>Hero Section</h2></div>
          <div className="admin-form-body">
            <div className="admin-grid">
              <div className="admin-col-full">
                <label className="admin-label">Title (HTML allowed for gradient styling)</label>
                <input className="admin-input" value={pageData.heroSection.title} onChange={e => setPageData(p => ({ ...p, heroSection: { ...p.heroSection, title: e.target.value } }))} />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Description</label>
                <textarea className="admin-textarea" rows={2} value={pageData.heroSection.description} onChange={e => setPageData(p => ({ ...p, heroSection: { ...p.heroSection, description: e.target.value } }))} />
              </div>
              <div className="admin-col-full">
                <label className="admin-label">Background Image</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <input className="admin-input" style={{ flex: 1 }} value={pageData.heroSection.bgImage} onChange={e => setPageData(p => ({ ...p, heroSection: { ...p.heroSection, bgImage: e.target.value } }))} placeholder="/images/careers-bg.png" />
                  <label className="upload-label">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    Upload Image
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageUpload(e, url => setPageData(p => ({ ...p, heroSection: { ...p.heroSection, bgImage: url } })))} />
                  </label>
                </div>
                {pageData.heroSection.bgImage && <img src={pageData.heroSection.bgImage} alt="Hero BG preview" className="img-preview" />}
              </div>
            </div>
          </div>
        </section>

        {/* 2. CORE VALUES */}
        <section className="admin-section">
          <div className="admin-section-header"><span className="admin-badge">2</span><h2 style={{ margin: 0, fontWeight: 700 }}>Core Values Section</h2></div>
          <div className="admin-form-body">
            <div className="admin-grid" style={{ marginBottom: '1.5rem' }}>
              <div>
                <label className="admin-label">Section Heading</label>
                <input className="admin-input" value={pageData.coreValuesSection.heading} onChange={e => setPageData(p => ({ ...p, coreValuesSection: { ...p.coreValuesSection, heading: e.target.value } }))} />
              </div>
              <div>
                <label className="admin-label">Section Description</label>
                <input className="admin-input" value={pageData.coreValuesSection.description} onChange={e => setPageData(p => ({ ...p, coreValuesSection: { ...p.coreValuesSection, description: e.target.value } }))} />
              </div>
            </div>
            {pageData.coreValuesSection.values.map((val, idx) => (
              <div key={idx} className="admin-array-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <strong>Value #{idx + 1}</strong>
                  <button type="button" className="admin-btn-remove" onClick={() => removeValue(idx)}>Remove</button>
                </div>
                <div className="admin-grid">
                  <div>
                    <label className="admin-label">Title</label>
                    <input className="admin-input" value={val.title} onChange={e => updateValue(idx, 'title', e.target.value)} placeholder="e.g. Innovation" />
                  </div>
                  <div>
                    <label className="admin-label">Description</label>
                    <input className="admin-input" value={val.desc} onChange={e => updateValue(idx, 'desc', e.target.value)} placeholder="Description of this value..." />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="admin-btn-add" onClick={addValue}>+ Add Core Value</button>
          </div>
        </section>

        {/* 3. OPPORTUNITIES HEADING */}
        <section className="admin-section">
          <div className="admin-section-header"><span className="admin-badge">3</span><h2 style={{ margin: 0, fontWeight: 700 }}>Opportunities Section</h2></div>
          <div className="admin-form-body">
            <label className="admin-label">Section Heading</label>
            <input className="admin-input" value={pageData.opportunitiesSection.heading} onChange={e => setPageData(p => ({ ...p, opportunitiesSection: { heading: e.target.value } }))} placeholder="Check out our latest opportunities" />
          </div>
        </section>

        {/* 4. FORM SELECTOR */}
        <section className="admin-section">
          <div className="admin-section-header"><span className="admin-badge">4</span><h2 style={{ margin: 0, fontWeight: 700 }}>Application Form (Job Detail Page)</h2></div>
          <div className="admin-form-body">
            <label className="admin-label">Select Form to Display on Each Job Detail Page</label>
            <select className="admin-select" value={pageData.selectedFormId || ''} style={{ maxWidth: '500px' }} onChange={e => setPageData(p => ({ ...p, selectedFormId: e.target.value }))}>
              <option value="">-- No Form Selected (form hidden) --</option>
              {forms.map(f => <option key={f._id} value={f._id}>{f.name} ({f.fields?.length || 0} fields)</option>)}
            </select>
            {forms.length === 0 && (
              <p style={{ color: '#f59e0b', marginTop: '0.75rem', fontSize: '14px' }}>
                ⚠ No forms yet. <a href="/admin/forms" style={{ color: '#00AEEF' }}>Create one in the Form Builder</a> first.
              </p>
            )}
            {pageData.selectedFormId && <p style={{ color: '#16a34a', marginTop: '0.5rem', fontSize: '13px' }}>✓ Form selected — it will appear on every job detail page.</p>}
          </div>
        </section>

        {/* STICKY SAVE BAR */}
        <div className="admin-bottom-bar">
          <button type="submit" disabled={saving} className="admin-btn-save">
            {saving ? (
              <svg style={{ animation: 'spin 1s linear infinite', width: '18px', height: '18px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            )}
            {saving ? 'Publishing...' : 'Save All Changes'}
          </button>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </form>

      {/* 5. JOB POSTINGS */}
      <section className="admin-section">
        <div className="admin-section-header">
          <span className="admin-badge">5</span>
          <h2 style={{ margin: 0, fontWeight: 700 }}>Job Postings ({jobs.length} total)</h2>
          <button type="button" style={{ marginLeft: 'auto', background: '#00AEEF', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setExpandedJob(expandedJob === 'new' ? null : 'new')}>
            {expandedJob === 'new' ? '✕ Cancel' : '+ New Job'}
          </button>
        </div>
        <div className="admin-form-body">

          {/* New Job Form */}
          {expandedJob === 'new' && (
            <div style={{ border: '2px dashed #00AEEF', borderRadius: '12px', marginBottom: '1.5rem', background: '#f0fafe' }}>
              <div style={{ padding: '1rem 1.5rem', background: '#e0f4ff', borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <strong style={{ color: '#0369a1' }}>New Job Posting</strong>
              </div>
              {renderJobEditor(newJob, -1, true)}
            </div>
          )}

          {/* Existing Jobs */}
          {jobs.length === 0 && expandedJob !== 'new' && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
              <p>No job postings yet. Click "+ New Job" to add one.</p>
              <p style={{ fontSize: '13px' }}>Or run: <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>node backend/seed_careers.js</code></p>
            </div>
          )}

          {jobs.map((job, idx) => (
            <div key={job.id || idx} className="job-card">
              <div className="job-card-header" onClick={() => setExpandedJob(expandedJob === idx ? null : idx)}>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '15px' }}>{job.title}</strong>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>{job.department} • {job.location} • {job.type}</div>
                </div>
                <span className={job.isActive ? 'job-badge-active' : 'job-badge-inactive'}>{job.isActive ? 'Active' : 'Hidden'}</span>
                <button type="button" onClick={e => { e.stopPropagation(); toggleJob(idx); }} style={{ background: 'none', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer', color: '#475569' }}>
                  {job.isActive ? 'Hide' : 'Show'}
                </button>
                <button type="button" onClick={e => { e.stopPropagation(); deleteJob(idx); }} style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                <span style={{ color: '#94a3b8', fontSize: '20px', transform: expandedJob === idx ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>⌄</span>
              </div>
              {expandedJob === idx && renderJobEditor(job, idx, false)}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
