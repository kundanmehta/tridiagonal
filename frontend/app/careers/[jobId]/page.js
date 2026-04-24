'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/lib/apiConfig';



/* ─── Static fallback jobs (same as before) ─── */
const JOBS_DATA = {
  'project-engineer': { title: 'Project Engineer', department: 'Advanced Modeling & Simulation (CFD/FEA)', date: 'January 8, 2026', location: 'Pune, India', type: 'Full-time', experience: '1–3 years', education: "Master's Degree in Chemical or Mechanical Engineering", overview: 'We are looking for a highly motivated Project Engineer to join our Advanced Modeling & Simulation group. You will work on critical projects involving fluid flow, heat transfer, and complex phenomena simulation for the process industry.', responsibilities: ['Perform CFD simulations using industry-standard tools (Ansys Fluent, OpenFOAM, STAR-CCM+)', 'Collaborate with cross-functional teams', 'Validate simulation results against experimental and plant data', 'Present findings and technical recommendations to clients', 'Contribute to the development of best practices'], requirements: ["Master's Degree in Chemical or Mechanical Engineering", 'Proficiency in CFD software', 'Strong problem-solving and analytical skills', 'Excellent written and verbal communication skills'], benefits: ['Competitive salary and performance-based bonuses', 'Opportunity to work on cutting-edge projects', 'Continuous learning through mentorship', 'Health insurance and other employee benefits'] },
  'sr-project-engineer-cfd-combustion': { title: 'Sr. Project Engineer (CFD – Combustion Modeling)', department: 'Advanced Modeling & Simulation (CFD/FEA)', date: 'November 18, 2025', location: 'Pune, India', type: 'Full-time', experience: '5+ years', education: "PhD or Master's in Engineering", overview: 'Lead complex CFD combustion modeling projects for our major clients in the oil and gas sector.', responsibilities: ['Lead combustion CFD projects end-to-end', 'Develop, validate, and implement combustion sub-models', 'Mentor junior team members', 'Contribute to proposals and business development'], requirements: ["PhD or Master's in Engineering", '5+ years of combustion CFD experience', 'Deep understanding of turbulence-chemistry models'], benefits: ['Leadership role with high-impact projects', 'Competitive compensation package', 'Health insurance and comprehensive benefits'] },
  'project-engineer-efd-laboratory': { title: 'Project Engineer (EFD Laboratory)', department: 'Technology Validation & Scale-up Centre', date: 'October 20, 2025', location: 'Pune, India', type: 'Full-time', experience: '1–3 years', education: "Bachelor's or Master's in Engineering", overview: 'Hands-on role focused on operating and maintaining experimental fluid dynamics setups.', responsibilities: ['Design and execute experimental fluid dynamics campaigns', 'Maintain and calibrate laboratory equipment', 'Analyze experimental data'], requirements: ["Bachelor's or Master's in Engineering", 'Experience with lab-scale testing', 'Knowledge of fluid mechanics'], benefits: ['Work in a state-of-the-art EFD laboratory', 'Competitive salary', 'Professional development opportunities'] },
  'project-leader-cfd-combustion': { title: 'Project Leader (CFD - Combustion Modeling)', department: 'Advanced Modeling & Simulation (CFD/FEA)', date: 'February 13, 2025', location: 'Pune, India', type: 'Full-time', experience: '8+ years', education: "PhD or Master's in Engineering", overview: 'Provide strategic and technical leadership for a team of combustion modeling experts.', responsibilities: ['Lead a team of 4-6 engineers', 'Define project scope and deliverables', 'Engage directly with clients'], requirements: ['8+ years of CFD and combustion modeling experience', 'Proven team leadership capabilities'], benefits: ['Senior leadership position', 'Competitive compensation with incentives'] },
  'intern-fea': { title: 'Intern (FEA)', department: 'Advanced Modeling & Simulation (CFD/FEA)', date: 'October 1, 2024', location: 'Pune, India', type: 'Internship', experience: '0 years (Students welcome)', education: 'B.E / B.Tech / M.Tech', overview: 'A structured 6-month internship for recent graduates in Finite Element Analysis.', responsibilities: ['Assist senior engineers in FEA analyses', 'Learn industry-standard FEA workflows', 'Document simulation setups and results'], requirements: ['Currently pursuing or recently completed B.E/B.Tech/M.Tech', 'Basic understanding of solid mechanics'], benefits: ['Mentorship from experienced FEA professionals', 'Stipend provided', 'Certificate of completion'] },
};

/* ─── Dynamic form renderer (same as contact-us) ─── */
function DynamicForm({ formConfig, jobTitle, formId }) {
  const [formValues, setFormValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [uploading, setUploading] = useState({}); // { fieldName: boolean }

  const handleFieldChange = (name, value) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    if (name === 'name' || name === 'firstName' || name === 'fullName') setApplicantName(value);
  };

  const handleFileUpload = async (name, file) => {
    if (!file) return;
    setUploading(prev => ({ ...prev, [name]: true }));
    setSubmitMsg('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_URL}/api/upload-public`, {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (res.ok) {
        handleFieldChange(name, json.url); // store URL
      } else {
        setSubmitMsg(`Upload failed: ${json.error || 'Unknown error'}`);
      }
    } catch (err) {
      setSubmitMsg('Network error during file upload');
    }
    setUploading(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any files are still uploading
    if (Object.values(uploading).some(v => v)) {
      setSubmitMsg('Please wait for file upload to complete.');
      return;
    }

    setSubmitting(true);
    setSubmitMsg('');
    try {
      const payload = { ...formValues, _jobTitle: jobTitle };
      const url = formId ? `${API_URL}/api/forms/${formId}/submit` : null;
      if (!url) { setSubmitMsg('Form not configured yet.'); setSubmitting(false); return; }
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) { setSubmitted(true); }
      else { setSubmitMsg('Something went wrong. Please try again.'); }
    } catch { setSubmitMsg('Network error. Please try again.'); }
    setSubmitting(false);
  };

  const renderField = (field) => {
    const inputStyle = { width: '100%', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '12px 14px', color: '#fff', outline: 'none', fontSize: '14px', fontFamily: 'inherit', transition: 'border-color 0.2s' };
    const selectStyle = { ...inputStyle, appearance: 'none', cursor: 'pointer' };

    if (field.type === 'textarea') return <textarea rows="4" value={formValues[field.name] || ''} onChange={e => handleFieldChange(field.name, e.target.value)} required={field.required} placeholder={field.placeholder || ''} style={{ ...inputStyle, resize: 'vertical' }} />;
    if (field.type === 'select') return (
      <select value={formValues[field.name] || ''} onChange={e => handleFieldChange(field.name, e.target.value)} required={field.required} style={selectStyle}>
        <option value="" disabled>Please Select</option>
        {(field.options || []).map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
    );
    if (field.type === 'checkbox') return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input type="checkbox" checked={!!formValues[field.name]} onChange={e => handleFieldChange(field.name, e.target.checked)} style={{ accentColor: 'var(--color-teal)', width: '16px', height: '16px' }} />
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>{field.placeholder || field.label}</span>
      </div>
    );
    if (field.type === 'file') return (
      <div className="file-upload-zone" style={{ border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '10px', padding: '20px', textAlign: 'center', background: 'rgba(255,255,255,0.03)' }}>
        <input type="file" id={`file-${field.name}`} style={{ display: 'none' }} onChange={e => handleFileUpload(field.name, e.target.files[0])} required={field.required && !formValues[field.name]} accept=".pdf,.doc,.docx" />
        <label htmlFor={`file-${field.name}`} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          {uploading[field.name] ? (
            <div className="spinner" style={{ width: '24px', height: '24px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--color-teal)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          ) : formValues[field.name] ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          )}
          <span style={{ fontSize: '14px', color: formValues[field.name] ? 'var(--color-teal)' : 'rgba(255,255,255,0.5)' }}>
            {uploading[field.name] ? 'Uploading...' : formValues[field.name] ? 'File Uploaded Successfully' : 'Select Resume (PDF, DOC, DOCX)'}
          </span>
          {formValues[field.name] && <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{formValues[field.name].split('/').pop()}</span>}
        </label>
      </div>
    );
    return <input type={field.type || 'text'} value={formValues[field.name] || ''} onChange={e => handleFieldChange(field.name, e.target.value)} required={field.required} placeholder={field.placeholder || ''} style={inputStyle} />;
  };

  const renderFormFields = () => {
    const fields = formConfig?.fields || [];
    const rendered = [];
    let i = 0;
    while (i < fields.length) {
      const field = fields[i];
      if (field.width === 'half' && i + 1 < fields.length && fields[i + 1].width === 'half') {
        const field2 = fields[i + 1];
        rendered.push(
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div><label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>{field.label}{field.required && <span style={{ color: '#f05a28' }}> *</span>}</label>{renderField(field)}</div>
            <div><label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>{field2.label}{field2.required && <span style={{ color: '#f05a28' }}> *</span>}</label>{renderField(field2)}</div>
          </div>
        );
        i += 2;
      } else {
        rendered.push(
          <div key={i}><label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>{field.label}{field.required && <span style={{ color: '#f05a28' }}> *</span>}</label>{renderField(field)}</div>
        );
        i++;
      }
    }
    return rendered;
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(71,188,135,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>Application Submitted!</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>
          {applicantName ? `Thank you, ${applicantName}! ` : 'Thank you! '}We have received your application for <strong style={{ color: '#fff' }}>{jobTitle}</strong>. Our team will review it and get back to you shortly.
        </p>
        <Link href="/careers" className="btn-primary" style={{ textDecoration: 'none', padding: '12px 30px', display: 'inline-block' }}>Browse More Positions</Link>
      </div>
    );
  }

  return (
    <>
      <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>Apply for this position</h3>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '28px' }}>Fill out the form below and we'll get back to you shortly.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {renderFormFields()}
        {formConfig?.consentText && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required style={{ accentColor: 'var(--color-teal)', marginTop: '3px', width: '16px', height: '16px', flexShrink: 0 }} />
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: formConfig.consentText }} />
          </div>
        )}
        {submitMsg && <p style={{ color: '#f87171', fontSize: '14px' }}>{submitMsg}</p>}
        <button suppressHydrationWarning type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '16px', fontWeight: '700', marginTop: '8px', opacity: submitting ? 0.7 : 1 }}>
          {submitting ? 'Submitting...' : (formConfig?.submitButtonText || 'Submit Application')}
        </button>
      </form>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.jobId;

  const [job, setJob] = useState(null);
  const [formConfig, setFormConfig] = useState(null);
  const [formId, setFormId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Fetch job details
    fetch(`${API_URL}/api/careers/jobs/${jobId}`)
      .then(r => r.json())
      .then(json => {
        if (json.data) {
          setJob(json.data);
        } else {
          // fallback to hardcoded
          const fallback = JOBS_DATA[jobId];
          if (fallback) setJob(fallback);
          else setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => {
        const fallback = JOBS_DATA[jobId];
        if (fallback) setJob(fallback);
        else setNotFound(true);
        setLoading(false);
      });

    // Fetch careers page config to get selectedFormId
    fetch(`${API_URL}/api/careers/page`)
      .then(r => r.json())
      .then(json => {
        const d = json.data;
        if (d?.selectedFormId) {
          const fid = typeof d.selectedFormId === 'object' ? d.selectedFormId._id : d.selectedFormId;
          setFormId(fid);
          if (typeof d.selectedFormId === 'object') {
            setFormConfig(d.selectedFormId);
          } else {
            fetch(`${API_URL}/api/forms/${fid}`).then(r => r.json()).then(fj => setFormConfig(fj.data));
          }
        }
      })
      .catch(() => {});
  }, [jobId]);

  if (loading) return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#1a1a1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>Loading position details…</p>
    </main>
  );

  if (notFound || !job) return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#1a1a1a', minHeight: '100vh' }}>
      <div className="content-wrapper-lg" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '20px' }}>Position Not Found</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '40px' }}>The job listing you are looking for does not exist or may have been removed.</p>
        <Link href="/careers" className="btn-primary" style={{ textDecoration: 'none', padding: '14px 35px' }}>← Back to Careers</Link>
      </div>
    </main>
  );

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>

      {/* ─────────────── JOB HERO ─────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'url(/images/careers-bg.png) center center / cover no-repeat', padding: '80px 0 60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,26,0.88)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/careers" style={{ color: 'var(--color-teal)', textDecoration: 'none', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '25px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Back to all positions
          </Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
            <span className="job-hero-pill">{job.department}</span>
            <span className="job-hero-pill">{job.type}</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: '700', marginBottom: '18px', lineHeight: '1.2' }}>{job.title}</h1>
          <div className="job-hero-meta">
            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>{job.location}</span>
            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Posted: {job.date}</span>
            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{job.experience}</span>
          </div>
        </div>
      </section>

      {/* ─────────────── JOB CONTENT ─────────────── */}
      <section style={{ background: '#1a1a1a', padding: '60px 0 80px' }}>
        <div className="content-wrapper-lg">
          <div className="job-detail-layout">

            {/* LEFT: Job Description */}
            <div className="job-detail-left">
              <div className="job-section-block">
                <h2 className="job-section-heading">About the Role</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', fontSize: '16px' }}>{job.overview}</p>
              </div>
              <div className="job-info-cards">
                <div className="job-info-card"><span className="job-info-label">Department</span><span className="job-info-value">{job.department}</span></div>
                <div className="job-info-card"><span className="job-info-label">Location</span><span className="job-info-value">{job.location}</span></div>
                <div className="job-info-card"><span className="job-info-label">Experience</span><span className="job-info-value">{job.experience}</span></div>
                <div className="job-info-card"><span className="job-info-label">Education</span><span className="job-info-value">{job.education}</span></div>
              </div>
              <div className="job-section-block">
                <h2 className="job-section-heading">Key Responsibilities</h2>
                <ul className="job-detail-list">{(job.responsibilities || []).map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
              <div className="job-section-block">
                <h2 className="job-section-heading">Requirements & Qualifications</h2>
                <ul className="job-detail-list">{(job.requirements || []).map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
              <div className="job-section-block">
                <h2 className="job-section-heading">What We Offer</h2>
                <ul className="job-detail-list benefits-list">{(job.benefits || []).map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
            </div>

            {/* RIGHT: Application Form */}
            <div className="job-detail-right">
              <div className="job-form-card">
                {formConfig ? (
                  <DynamicForm formConfig={formConfig} jobTitle={job.title} formId={formId} />
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" style={{ marginBottom: '16px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', lineHeight: '1.6' }}>Application form not configured yet.<br/>Please check back soon.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────── SCOPED STYLES ─────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .job-hero-pill { display: inline-block; background: rgba(71,188,135,0.12); color: var(--color-teal); padding: 5px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
        .job-hero-meta { display: flex; flex-wrap: wrap; gap: 20px; color: rgba(255,255,255,0.55); font-size: 15px; }
        .job-hero-meta span { display: inline-flex; align-items: center; gap: 6px; }
        .job-detail-layout { display: flex; gap: 40px; align-items: flex-start; }
        .job-detail-left { flex: 1.15; min-width: 0; }
        .job-detail-right { flex: 0.85; min-width: 0; position: sticky; top: calc(var(--nav-height) + 20px); }
        @media (max-width: 900px) { .job-detail-layout { flex-direction: column; } .job-detail-right { position: static; } }
        .job-section-block { margin-bottom: 40px; }
        .job-section-heading { color: #fff; font-size: 22px; font-weight: 700; margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .job-detail-list { color: rgba(255,255,255,0.75); font-size: 15px; line-height: 1.8; padding-left: 22px; display: flex; flex-direction: column; gap: 10px; }
        .job-detail-list li::marker { color: var(--color-teal); }
        .benefits-list li::marker { content: '✓  '; color: var(--color-teal); }
        .job-info-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 40px; }
        @media (max-width: 500px) { .job-info-cards { grid-template-columns: 1fr; } }
        .job-info-card { background: #242424; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 18px 20px; display: flex; flex-direction: column; gap: 6px; }
        .job-info-label { color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
        .job-info-value { color: #fff; font-size: 15px; font-weight: 500; }
        .job-form-card { background: #242424; border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; padding: 35px; }
      `}} />
    </main>
  );
}
