const doSeed = async () => {
  try {
    // 1. Login
    console.log('Logging in...');
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@tridiagonal.com', password: 'Admin@123' })
    });
    
    if (!loginRes.ok) {
      throw new Error('Login failed: ' + await loginRes.text());
    }
    
    const { token } = await loginRes.json();
    console.log('Got token:', token.substring(0, 15) + '...');

    // 2. Fetch existing forms and delete any with slug "contact-us" via ID (Wait, we don't have a DELETE api implemented)
    // Actually let's just make the slug unique if it fails
    
    const formPayload = {
      name: 'Contact Us',
      slug: 'contact-us-' + Date.now(), // Unique slug to avoid any mongoose lingering issues
      adminEmail: 'info@tridiagonal.com',
      submitButtonText: 'Submit',
      consentText: 'I agree to receive communications regarding Tridiagonal products, services, and events. I can unsubscribe at any time. Read our <a href="/privacy-policy" style="color: #00AEEF; text-decoration: underline;">privacy policy</a>',
      fields: [
        { label: 'First Name*', name: 'firstName', type: 'text', required: true, width: 'half' },
        { label: 'Last Name*', name: 'lastName', type: 'text', required: true, width: 'half' },
        { label: 'Email*', name: 'email', type: 'email', required: true, width: 'half' },
        { label: 'Contact Number*', name: 'contactNumber', type: 'tel', required: true, width: 'half' },
        { label: 'Job title', name: 'jobTitle', type: 'text', required: false, width: 'half' },
        { label: 'Company Name*', name: 'companyName', type: 'text', required: true, width: 'half' },
        { label: 'Industry', name: 'industry', type: 'select', required: false, width: 'full', options: ['Oil & Gas', 'Pharma & Medical Devices', 'Metals, Mining & Cement', 'Food, Beverages & CPG', 'Chemicals & Petrochemicals', 'Power & Renewables', 'Others'] },
        { label: 'Country', name: 'country', type: 'select', required: false, width: 'full', options: ['India', 'United States', 'United Arab Emirates', 'United Kingdom', 'Germany', 'Other'] },
        { label: 'Services/Technologies', name: 'servicesTechnologies', type: 'select', required: false, width: 'full', options: ['CFD', 'FEA', 'DEM', 'FSI', 'Digital Twin', 'Flow Assurance Testing', 'Erosion & Corrosion Testing', 'Tridiagonal.ai', 'Partner Solutions'] },
        { label: 'Message Box', name: 'message', type: 'textarea', required: false, width: 'full' }
      ]
    };

    console.log('Sending payload to API...');
    const formRes = await fetch('http://localhost:5000/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formPayload)
    });

    const formData = await formRes.json();
    if (!formRes.ok) {
      throw new Error('Form creation failed: ' + JSON.stringify(formData));
    }
    console.log('SUCCESS! Form created with ID:', formData.data._id);
    
    // Now optionally hook it to the Contact Page CMS automatically
    console.log('Linking form to Contact Page CMS...');
    const cpRes = await fetch('http://localhost:5000/api/contactpage', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const cpData = await cpRes.json();
    let payload = cpData.data || {};
    payload.selectedFormId = formData.data._id;
    
    const cpUpdate = await fetch('http://localhost:5000/api/contactpage', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    console.log('Linked to Contact Page:', cpUpdate.ok);

  } catch (err) {
    console.error(err);
  }
};

doSeed();
