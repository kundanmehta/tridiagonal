const nodemailer = require('nodemailer');

// Create a reusable transporter
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn('⚠️ SMTP not configured. Email notifications will be skipped.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: parseInt(port) || 587,
    secure: parseInt(port) === 465,
    auth: { user, pass }
  });
};

/**
 * Send form submission notification email to admin
 */
const sendFormNotification = async (adminEmail, formName, submissionData) => {
  const transporter = createTransporter();
  if (!transporter || !adminEmail) {
    console.log('📧 Email skipped (SMTP not configured or no admin email).');
    return false;
  }

  // Build HTML table from submission data
  const rows = Object.entries(submissionData)
    .map(([key, value]) => `<tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;color:#334155;text-transform:capitalize">${key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}</td><td style="padding:8px 12px;border:1px solid #eee;color:#475569">${value || '-'}</td></tr>`)
    .join('');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#00AEEF;padding:20px;border-radius:8px 8px 0 0">
        <h2 style="color:#fff;margin:0">New ${formName} Submission</h2>
      </div>
      <div style="padding:20px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse">${rows}</table>
        <p style="color:#94a3b8;font-size:12px;margin-top:20px">This is an automated notification from your website CMS.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Website CMS" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: `New ${formName} Submission`,
      html
    });
    console.log(`📧 Notification sent to ${adminEmail}`);
    return true;
  } catch (error) {
    console.error('📧 Email send error:', error.message);
    return false;
  }
};

module.exports = { sendFormNotification };
