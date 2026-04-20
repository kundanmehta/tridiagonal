'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Current static fields as fallback
const DEFAULT_FORM = {
  fields: [
    { label: 'First Name', name: 'firstName', type: 'text', required: true, width: 'half' },
    { label: 'Last Name', name: 'lastName', type: 'text', required: true, width: 'half' },
    { label: 'Email', name: 'email', type: 'email', required: true, width: 'full' },
    { label: 'Job title', name: 'jobTitle', type: 'text', required: true, width: 'full' },
    { label: 'Company name', name: 'companyName', type: 'text', required: true, width: 'full' },
    { label: 'Phone number', name: 'phone', type: 'tel', required: false, width: 'full', placeholder: '+91 ...' },
    { label: 'Country', name: 'country', type: 'select', required: true, width: 'full', options: ['India', 'United States', 'United Arab Emirates', 'United Kingdom', 'Germany', 'Other'] },
  ],
  submitButtonText: 'Register Now',
  consentText: "I agree to receive communications regarding Tridiagonal products. Read our <a href='/privacy-policy' style='color: #43bd94; text-decoration: underline'>privacy policy</a>"
};

export default function WebinarRegistrationForm({ webinarId, webinarTitle, formSlug, preloadedFormConfig, customTitle, noStyles }) {
  const [formValues, setFormValues] = useState({});
  const [formConfig, setFormConfig] = useState(preloadedFormConfig || null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // If we have preloaded config, use it if it matches the current slug
    // Otherwise fetch the latest to ensure consistency
    if (preloadedFormConfig && (!formSlug || preloadedFormConfig.slug === formSlug || preloadedFormConfig._id === formSlug)) {
      setFormConfig(preloadedFormConfig);
    } else if (formSlug) {
      // Reset form config whenever the slug changes to avoid showing the previous form
      setFormConfig(null);
      setFormValues({});

      fetch(`${API_URL}/api/forms/${formSlug}`, { cache: 'no-store' })
        .then(r => r.json())
        .then(json => {
          if (json.data) setFormConfig(json.data);
        })
        .catch(err => console.error('Failed to load dynamic form:', err));
    } else {
      setFormConfig(null);
      setFormValues({});
    }
  }, [formSlug, preloadedFormConfig]);

  const effectiveForm = formConfig || DEFAULT_FORM;

  const handleChange = (name, value) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // If dynamic form, use the forms submission API
      // If default form, use the existing webinar registration API for backwards compatibility
      const url = formConfig
        ? `${API_URL}/api/forms/${formConfig._id}/submit`
        : `${API_URL}/api/webinars/register`;

      const payload = formConfig
        ? { data: formValues, metadata: { webinarId, webinarTitle } }
        : {
          webinarId,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          jobTitle: formValues.jobTitle,
          company: formValues.companyName,
          phoneNumber: formValues.phone,
          country: formValues.country
        };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to register. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field) => {
    const inputStyle = { width: '100%', padding: '12px 15px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' };
    const selectStyle = { ...inputStyle, appearance: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23ffffff' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px top 50%', cursor: 'pointer' };

    if (field.type === 'textarea') {
      return <textarea rows="3" value={formValues[field.name] || ''} onChange={e => handleChange(field.name, e.target.value)} required={field.required} style={{ ...inputStyle, resize: 'vertical' }} />;
    }
    if (field.type === 'select') {
      return (
        <select value={formValues[field.name] || ''} onChange={e => handleChange(field.name, e.target.value)} required={field.required} style={selectStyle}>
          <option value="" disabled>Please Select</option>
          {(field.options || []).map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
        </select>
      );
    }
    if (field.type === 'checkbox') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="checkbox" checked={!!formValues[field.name]} onChange={e => handleChange(field.name, e.target.checked)} style={{ accentColor: '#43bd94' }} />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{field.placeholder || field.label}</span>
        </div>
      );
    }
    return <input type={field.type || 'text'} value={formValues[field.name] || ''} onChange={e => handleChange(field.name, e.target.value)} required={field.required} placeholder={field.placeholder || ''} style={inputStyle} />;
  };

  if (!mounted) return <div style={{ minHeight: '400px', background: '#242424', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}></div>;

  if (submitted) {
    return (
      <div className="webinar-form-card" style={{ background: '#242424', borderRadius: '12px', padding: '60px 30px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ width: '60px', height: '60px', background: 'rgba(67, 189, 148, 0.1)', color: '#43bd94', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '10px' }}>Registration Successful!</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.6' }}>
          Thank you for registering for <strong>{webinarTitle}</strong>.
          {webinarId ? " In case of on-demand sessions, you can now access the content below." : " We have sent a confirmation email with access details to your inbox."}
        </p>
      </div>
    );
  }

  const cardStyle = noStyles ? { background: 'transparent', padding: 0, border: 'none', boxShadow: 'none' } : { background: '#242424', borderRadius: '12px', padding: '35px 30px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' };
  const titleStyle = noStyles ? { color: '#fff', fontSize: '1.4rem', marginBottom: '25px', fontWeight: '600', paddingBottom: '15px' } : { color: '#fff', fontSize: '1.4rem', marginBottom: '25px', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' };

  return (
    <div className="webinar-form-card" style={cardStyle}>
      <h3 style={titleStyle}>
        {customTitle || 'Access the Webinar Now'}
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '10px', borderRadius: '6px', fontSize: '0.85rem' }}>{error}</div>}

        {effectiveForm.fields.map((field, idx) => (
          <div key={idx}>
            {field.type !== 'checkbox' && (
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '6px' }}>
                {field.label}{field.required && '*'}
              </label>
            )}
            {renderField(field)}
          </div>
        ))}

        {/* Consent */}
        {effectiveForm.consentText && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '5px' }}>
            <input type="checkbox" required id="agree" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: '5px', accentColor: '#43bd94' }} />
            <label htmlFor="agree" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: effectiveForm.consentText }} />
          </div>
        )}

        <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '14px', background: '#43bd94', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
          {submitting ? 'Registering...' : (effectiveForm.submitButtonText || 'Register Now')}
        </button>

      </form>
    </div>
  );
}
