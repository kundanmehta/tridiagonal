'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function WebinarRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    companyName: '',
    phone: '',
    country: '',
    consent: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for registering! You will receive the access link in your inbox.');
  };

  return (
    <div className="webinar-form-card" style={{ background: '#242424', borderRadius: '12px', padding: '35px 30px', position: 'sticky', top: '100px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
      <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '25px', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
        Access the On-Demand Webinar Now
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '6px' }}>First Name*</label>
          <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" style={{ width: '100%', padding: '12px 15px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-teal)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
        </div>

        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '6px' }}>Last Name*</label>
          <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" style={{ width: '100%', padding: '12px 15px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-teal)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
        </div>

        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '6px' }}>Email*</label>
          <input required name="email" value={formData.email} onChange={handleChange} type="email" style={{ width: '100%', padding: '12px 15px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-teal)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
        </div>

        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '6px' }}>Job title*</label>
          <input required name="jobTitle" value={formData.jobTitle} onChange={handleChange} type="text" style={{ width: '100%', padding: '12px 15px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-teal)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
        </div>

        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '6px' }}>Company name*</label>
          <input required name="companyName" value={formData.companyName} onChange={handleChange} type="text" style={{ width: '100%', padding: '12px 15px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-teal)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
        </div>

        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '6px' }}>Phone number</label>
          <div style={{ display: 'flex' }}>
            <div style={{ background: '#363636', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', borderRadius: '6px 0 0 6px', padding: '12px 15px', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>
              +91
            </div>
            <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="India (भारत)" style={{ width: '100%', padding: '12px 15px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0 6px 6px 0', color: '#fff', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-teal)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '6px' }}>Country*</label>
          <select required name="country" value={formData.country} onChange={handleChange} style={{ width: '100%', padding: '12px 15px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none', appearance: 'none', cursor: 'pointer' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-teal)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}>
            <option value="" disabled>Please Select</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px' }}>
          <input required name="consent" checked={formData.consent} onChange={handleChange} type="checkbox" id="consent" style={{ marginTop: '4px', cursor: 'pointer', accentColor: 'var(--color-teal)' }} />
          <label htmlFor="consent" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: '1.5', cursor: 'pointer' }}>
            I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <Link href="/privacy-policy" style={{ color: 'var(--color-teal)', textDecoration: 'underline' }}>privacy policy</Link>
          </label>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '14px' }}>
          Register Now
        </button>

      </form>
    </div>
  );
}
