const run = async () => {
  const payload = {
    name: 'Contact Us',
    slug: 'contact-us',
    adminEmail: 'info@tridiagonal.com',
    submitButtonText: 'Submit',
    consentText: 'I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <a href="/privacy-policy" style="color: #00AEEF; text-decoration: underline;">privacy policy</a>',
    fields: [
      { label: 'First Name', name: 'firstName', type: 'text', required: true, width: 'half' },
      { label: 'Last Name', name: 'lastName', type: 'text', required: true, width: 'half' },
      { label: 'Email', name: 'email', type: 'email', required: true, width: 'half' },
      { label: 'Contact Number', name: 'contactNumber', type: 'tel', required: true, width: 'half' },
      { label: 'Job title', name: 'jobTitle', type: 'text', required: false, width: 'half' },
      { label: 'Company Name', name: 'companyName', type: 'text', required: true, width: 'half' },
      { label: 'Industry', name: 'industry', type: 'select', required: false, width: 'full', options: ['Oil & Gas', 'Pharma & Medical Devices', 'Metals, Mining & Cement', 'Food, Beverages & CPG', 'Chemicals & Petrochemicals', 'Power & Renewables', 'Others'] },
      { label: 'Country', name: 'country', type: 'select', required: false, width: 'full', options: ['India', 'United States', 'United Arab Emirates', 'United Kingdom', 'Germany', 'Other'] },
      { label: 'Services/Technologies', name: 'servicesTechnologies', type: 'select', required: false, width: 'full', options: ['CFD', 'FEA', 'DEM', 'FSI', 'Digital Twin', 'Flow Assurance Testing', 'Erosion & Corrosion Testing', 'Tridiagonal.ai', 'Partner Solutions'] },
      { label: 'Message Box', name: 'message', type: 'textarea', required: false, width: 'full' }
    ]
  };

  try {
    const res = await fetch('http://localhost:5000/api/forms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('Error:', err);
  }
};

run();
