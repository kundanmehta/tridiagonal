'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function WebinarPage() {
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
    // Usually submit to an API here
    alert('Thank you for registering! We will be in touch shortly.');
  };

  return (
    <main style={{ background: '#1a1a1a', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="content-wrapper-lg" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
        
        {/* Left Column: Webinar Details */}
        <div style={{ flex: '1 1 600px' }}>
          <div style={{ marginBottom: '30px' }}>
            <span style={{ color: 'var(--color-teal)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
              On-Demand Webinar
            </span>
            <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', lineHeight: '1.2', marginTop: '15px', marginBottom: '25px', fontFamily: 'var(--font-heading)' }}>
              The Future of Cement Manufacturing: Simulate, Optimize, Excel
            </h1>
          </div>

          <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p>
              In today’s rapidly evolving industrial landscape, the cement industry faces increasing pressure to enhance efficiency, reduce emissions, and improve process reliability — all while maintaining profitability. Achieving this balance requires more than traditional process control methods; it demands smarter tools and forward-thinking strategies.
            </p>
            <p>
              Simulation technology is proving to be a game-changer. From optimizing raw material blending and kiln operations to energy usage and emissions reduction, simulation enables cement manufacturers to gain deep insights into complex systems — before changes are implemented in the real world. By creating accurate simulations, industry leaders can explore scenarios, predict outcomes, and make physics-driven decisions with confidence.
            </p>
            <p>
              This webinar, &quot;The Future of Cement Manufacturing: Simulate, Optimize, Excel,&quot; will explore how advanced simulation tools are transforming the cement manufacturing process. We&apos;ll discuss real-world use cases, demonstrate how simulation drives measurable improvements in performance, and highlight the key technologies leading the charge.
            </p>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px', fontWeight: '600' }}>In this session, you&apos;ll learn:</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255, 255, 255, 0.8)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                "How simulation supports optimization in cement production",
                "Real-life examples of operational gains achieved through virtual modeling",
                "The role of simulation in sustainability and energy efficiency",
                "Steps to avail advantage of the simulation"
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px', fontWeight: '600' }}>Who Should Attend:</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '15px' }}>This webinar is designed for:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              {[
                "Process Managers in the Cement Industry",
                "Mechanical and CFD Engineers",
                "Design and Analysis Professionals",
                "Engineering Consultants"
              ].map((attendee, idx) => (
                <div key={idx} style={{ background: '#242424', padding: '15px 20px', borderRadius: '8px', borderLeft: '3px solid var(--color-teal)', color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem', fontWeight: '500' }}>
                  {attendee}
                </div>
              ))}
            </div>
          </div>

          {/* Presenter Section */}
          <div style={{ marginTop: '50px', background: '#242424', borderRadius: '12px', padding: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Presenter</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '25px', flexWrap: 'wrap' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#363636', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid var(--color-teal)' }}>
                {/* Fallback SVG Avatar since we don't have the real image yet */}
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '8px', fontWeight: '600' }}>Mr. Harinarayanan Nagarajan</h4>
                <p style={{ color: 'var(--color-teal)', fontSize: '0.95rem', fontWeight: '500', marginBottom: '4px' }}>Project Manager - CFD Consulting</p>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>Tridiagonal Solutions</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Registration Form */}
        <div style={{ flex: '1 1 350px', maxWidth: '450px' }}>
          <div style={{ background: '#242424', borderRadius: '12px', padding: '35px 30px', position: 'sticky', top: '100px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '25px', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
              Access the On-Demand Webinar Now
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '6px' }}>First Name*</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" style={{ width: '100%', padding: '12px 15px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-teal)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '6px' }}>Last Name*</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" style={{ width: '100%', padding: '12px 15px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = 'var(--color-teal)'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
                </div>
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
        </div>

      </div>
    </main>
  );
}
