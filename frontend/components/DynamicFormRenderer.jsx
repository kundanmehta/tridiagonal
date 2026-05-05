'use client';
import { useState } from 'react';
import { API_URL } from '@/lib/apiConfig';

/**
 * DynamicFormRenderer
 * Renders and submits a dynamic form fetched from the Form Builder.
 *
 * Props:
 *  - formConfig: The full form object (with _id, fields, submitButtonText, consentText)
 *  - theme: 'dark' | 'light'  (default: 'dark')
 *  - onSuccess: optional callback after successful submission
 */
export default function DynamicFormRenderer({ formConfig, theme = 'dark', onSuccess }) {
  const [formValues, setFormValues] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');

  if (!formConfig) return null;

  const isDark = theme === 'dark';

  const colors = {
    label: isDark ? '#fff' : '#1e293b',
    labelSub: isDark ? 'rgba(255,255,255,0.85)' : '#475569',
    inputBg: isDark ? '#1a1a1a' : '#f8fafc',
    inputBorder: isDark ? 'rgba(255,255,255,0.3)' : '#cbd5e1',
    inputColor: isDark ? '#fff' : '#1e293b',
    required: '#f05a28',
  };

  const inputStyle = {
    width: '100%',
    background: colors.inputBg,
    border: `1px solid ${colors.inputBorder}`,
    borderRadius: '4px',
    padding: '10px 14px',
    color: colors.inputColor,
    outline: 'none',
    fontSize: '14px',
    boxSizing: 'border-box',
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='${isDark ? '%23ffffff' : '%23475569'}' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px top 50%',
    paddingRight: '40px',
  };

  const handleChange = (name, value) => setFormValues(prev => ({ ...prev, [name]: value }));

  const renderField = (field) => {
    if (field.type === 'textarea') {
      return (
        <textarea
          suppressHydrationWarning
          rows={3}
          value={formValues[field.name] || ''}
          onChange={e => handleChange(field.name, e.target.value)}
          required={field.required}
          placeholder={field.placeholder || ''}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      );
    }
    if (field.type === 'select') {
      return (
        <select
          suppressHydrationWarning
          value={formValues[field.name] || ''}
          onChange={e => handleChange(field.name, e.target.value)}
          required={field.required}
          style={selectStyle}
        >
          <option value="" disabled>Please Select</option>
          {(field.options || []).map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
        </select>
      );
    }
    if (field.type === 'checkbox') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            suppressHydrationWarning
            type="checkbox"
            checked={!!formValues[field.name]}
            onChange={e => handleChange(field.name, e.target.checked)}
            style={{ accentColor: 'var(--color-teal, #00AEEF)' }}
          />
          <span style={{ color: colors.labelSub, fontSize: '14px' }}>{field.placeholder || field.label}</span>
        </div>
      );
    }
    return (
      <input
        suppressHydrationWarning
        type={field.type || 'text'}
        value={formValues[field.name] || ''}
        onChange={e => handleChange(field.name, e.target.value)}
        required={field.required}
        placeholder={field.placeholder || ''}
        style={inputStyle}
      />
    );
  };

  // Group half-width fields into rows of 2
  const renderFields = () => {
    const fields = formConfig.fields || [];
    const rendered = [];
    let i = 0;
    while (i < fields.length) {
      const field = fields[i];
      if (field.width === 'half' && i + 1 < fields.length && fields[i + 1].width === 'half') {
        const field2 = fields[i + 1];
        rendered.push(
          <div key={i} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 calc(50% - 8px)', minWidth: '200px' }}>
              {field.type !== 'checkbox' && (
                <label style={{ display: 'block', color: colors.label, marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>
                  {field.label}{field.required && <span style={{ color: colors.required }}>*</span>}
                </label>
              )}
              {renderField(field)}
            </div>
            <div style={{ flex: '1 1 calc(50% - 8px)', minWidth: '200px' }}>
              {field2.type !== 'checkbox' && (
                <label style={{ display: 'block', color: colors.label, marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>
                  {field2.label}{field2.required && <span style={{ color: colors.required }}>*</span>}
                </label>
              )}
              {renderField(field2)}
            </div>
          </div>
        );
        i += 2;
      } else {
        rendered.push(
          <div key={i}>
            {field.type !== 'checkbox' && (
              <label style={{ display: 'block', color: colors.label, marginBottom: '6px', fontSize: '14px', fontWeight: 500 }}>
                {field.label}{field.required && <span style={{ color: colors.required }}>*</span>}
              </label>
            )}
            {renderField(field)}
          </div>
        );
        i++;
      }
    }
    return rendered;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formConfig.consentText && !agreed) {
      setSubmitMsg('Please agree to the consent before submitting.');
      return;
    }
    setSubmitting(true);
    setSubmitMsg('');
    try {
      const res = await fetch(`${API_URL}/api/forms/${formConfig._id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      if (res.ok) {
        setSubmitMsg('Thank you! Your submission has been received.');
        setFormValues({});
        setAgreed(false);
        if (onSuccess) onSuccess();
      } else {
        setSubmitMsg('Something went wrong. Please try again.');
      }
    } catch {
      setSubmitMsg('Network error. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {renderFields()}

      {/* Consent checkbox */}
      {formConfig.consentText && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '5px' }}>
          <input
            suppressHydrationWarning
            type="checkbox"
            id={`consent-${formConfig._id}`}
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            style={{ marginTop: '4px', accentColor: 'var(--color-teal, #00AEEF)', flexShrink: 0 }}
          />
          <label
            htmlFor={`consent-${formConfig._id}`}
            style={{ color: colors.labelSub, fontSize: '13px', lineHeight: 1.5 }}
            dangerouslySetInnerHTML={{ __html: formConfig.consentText }}
          />
        </div>
      )}

      {/* Status message */}
      {submitMsg && (
        <div style={{
          padding: '10px 16px',
          borderRadius: '8px',
          background: submitMsg.includes('Thank') ? 'rgba(71,188,135,0.15)' : 'rgba(239,68,68,0.15)',
          color: submitMsg.includes('Thank') ? (isDark ? '#4ade80' : '#15803d') : (isDark ? '#f87171' : '#dc2626'),
          fontSize: '14px',
          fontWeight: 600,
        }}>
          {submitMsg}
        </div>
      )}

      {/* Submit button */}
      <button
        suppressHydrationWarning
        type="submit"
        disabled={submitting}
        style={{
          marginTop: '8px',
          width: '100%',
          background: 'linear-gradient(90deg, #1aa390, #88c847)',
          color: '#fff',
          padding: '14px',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '15px',
          border: 'none',
          cursor: submitting ? 'not-allowed' : 'pointer',
          transition: 'box-shadow 0.3s, transform 0.3s',
          opacity: submitting ? 0.6 : 1,
        }}
        onMouseEnter={e => { if (!submitting) { e.currentTarget.style.boxShadow = '0 6px 25px rgba(136,200,71,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        {submitting ? 'Submitting...' : (formConfig.submitButtonText || 'Submit')}
      </button>
    </form>
  );
}
