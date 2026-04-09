'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

/* ───────────────────── FULL JOB DATA ───────────────────── */
const JOBS_DATA = {
  'project-engineer': {
    title: 'Project Engineer',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'January 8, 2026',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '1–3 years',
    education: "Master's Degree in Chemical or Mechanical Engineering",
    overview:
      'We are looking for a highly motivated Project Engineer to join our Advanced Modeling & Simulation group. You will work on critical projects involving fluid flow, heat transfer, and complex phenomena simulation for the process industry. This is an exciting opportunity to contribute to solving real-world engineering challenges using state-of-the-art computational tools.',
    responsibilities: [
      'Perform CFD simulations using industry-standard tools (Ansys Fluent, OpenFOAM, STAR-CCM+)',
      'Collaborate with cross-functional teams to define simulation parameters and boundary conditions',
      'Validate simulation results against experimental and plant data',
      'Present findings and technical recommendations to clients through reports and presentations',
      'Contribute to the development of best practices and standard operating procedures',
      'Stay updated with advancements in CFD methodologies and apply them to projects',
    ],
    requirements: [
      "Master's Degree in Chemical or Mechanical Engineering",
      'Proficiency in CFD software (OpenFOAM, Ansys Fluent, or STAR-CCM+)',
      'Strong problem-solving and analytical skills',
      'Knowledge of phase mixing and separation is a plus',
      'Excellent written and verbal communication skills',
      'Ability to work independently and in a team environment',
    ],
    benefits: [
      'Competitive salary and performance-based bonuses',
      'Opportunity to work on cutting-edge projects for Fortune 500 companies',
      'Continuous learning through mentorship and training programs',
      'Collaborative and innovation-driven work culture',
      'Health insurance and other employee benefits',
    ],
  },
  'sr-project-engineer-cfd-combustion': {
    title: 'Sr. Project Engineer (CFD – Combustion Modeling)',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'November 18, 2025',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '5+ years',
    education: "PhD or Master's in Engineering",
    overview:
      'Lead complex CFD combustion modeling projects for our major clients in the oil and gas sector. Assume technical leadership and mentor junior engineers while delivering high-value insights. You will be at the forefront of developing innovative combustion simulation approaches that directly impact plant safety and efficiency.',
    responsibilities: [
      'Lead combustion CFD projects end-to-end for global energy clients',
      'Develop, validate, and implement combustion sub-models for industrial burners, furnaces, and reactors',
      'Mentor junior team members and review project deliverables for technical accuracy',
      'Contribute to proposals, technical presentations, and business development activities',
      'Collaborate with experimental teams for model validation against physical test data',
      'Drive standardization efforts in combustion modeling workflows',
    ],
    requirements: [
      "PhD or Master's in Mechanical, Chemical, or Aerospace Engineering",
      '5+ years of hands-on experience in Combustion CFD Modeling',
      'Deep understanding of turbulence-chemistry interaction models (EDC, FGM, PDF)',
      'Proficiency in Ansys Fluent or equivalent CFD platforms',
      'Excellent communication and client management skills',
      'Experience with scripting/automation (Python, UDF) is a plus',
    ],
    benefits: [
      'Leadership role with high-impact global projects',
      'Competitive compensation package with performance bonuses',
      'Opportunity to publish and present research at international conferences',
      'Flexible work arrangements',
      'Health insurance and comprehensive employee benefits',
    ],
  },
  'project-engineer-efd-laboratory': {
    title: 'Project Engineer (EFD Laboratory)',
    department: 'Technology Validation & Scale-up Centre',
    date: 'October 20, 2025',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '1–3 years',
    education: "Bachelor's or Master's in Engineering",
    overview:
      'This is a hands-on role focused on operating and maintaining experimental fluid dynamics setups. Work closely with the simulation team to validate CFD models with real-world test data. You will play a key role in bridging the gap between computational predictions and physical reality.',
    responsibilities: [
      'Design and execute experimental fluid dynamics campaigns in a lab environment',
      'Maintain, calibrate, and troubleshoot laboratory instrumentation and equipment',
      'Analyze experimental data and benchmark against CFD predictions',
      'Prepare detailed test reports and documentation for internal and client use',
      'Collaborate with CFD engineers to define test matrices and validation protocols',
      'Support scale-up activities and technology transfer to clients',
    ],
    requirements: [
      "Bachelor's or Master's in Mechanical, Chemical, or relevant Engineering discipline",
      'Experience with lab-scale testing, flow measurement, and sensor technologies',
      'Knowledge of fluid mechanics, heat transfer, and mass transfer fundamentals',
      'Ability to analyze and interpret physical test data',
      'Familiarity with data acquisition systems and LabVIEW is a plus',
      'Strong attention to detail and safety awareness',
    ],
    benefits: [
      'Unique opportunity to work in a state-of-the-art EFD laboratory',
      'Cross-functional collaboration with simulation experts',
      'Competitive salary and benefits package',
      'Professional development and training opportunities',
      'Health insurance and employee wellness programs',
    ],
  },
  'project-leader-cfd-combustion': {
    title: 'Project Leader (CFD - Combustion Modeling)',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'February 13, 2025',
    location: 'Pune, India',
    type: 'Full-time',
    experience: '8+ years',
    education: "PhD or Master's in Engineering",
    overview:
      'Provide strategic and technical leadership for a team of combustion modeling experts. Drive innovation and maintain best practices across project executions. This senior role demands a combination of deep technical expertise and strong people management skills to deliver world-class simulation solutions.',
    responsibilities: [
      'Lead a team of 4-6 engineers on combustion-related projects',
      'Define project scope, timelines, budgets, and deliverables',
      'Ensure quality control and technical rigor across all simulation work',
      'Engage directly with clients for requirement gathering, progress reviews, and final presentations',
      'Identify new business opportunities and contribute to proposal writing',
      'Drive technical innovation by evaluating new tools, methods, and research',
    ],
    requirements: [
      '8+ years of experience in CFD and combustion modeling',
      'Proven team leadership, project management, and mentorship capabilities',
      'Strong technical background in reacting flow simulations',
      'Ability to align technical deliverables with business goals',
      'Excellent interpersonal, leadership, and communication skills',
      'Experience with P&L management is a plus',
    ],
    benefits: [
      'Senior leadership position with strategic influence',
      'Competitive senior-level compensation with performance incentives',
      'Opportunity to shape the direction of combustion modeling practice',
      'International travel and client engagement opportunities',
      'Comprehensive benefits including health, retirement, and professional development',
    ],
  },
  'intern-fea': {
    title: 'Intern (FEA)',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'October 1, 2024',
    location: 'Pune, India',
    type: 'Internship',
    experience: '0 years (Students welcome)',
    education: 'B.E / B.Tech / M.Tech (Pursuing or Recently Completed)',
    overview:
      'A structured 6-month internship program designed for recent graduates or final-year students looking to gain hands-on experience in Finite Element Analysis in a professional engineering services environment. You will learn from experienced engineers and contribute to live projects.',
    responsibilities: [
      'Assist senior engineers in structural, thermal, and modal FEA analyses',
      'Learn and apply industry-standard FEA workflows (Ansys Mechanical, Abaqus)',
      'Participate in team meetings, knowledge-sharing sessions, and technical discussions',
      'Document simulation setups, results, and learnings systematically',
      'Contribute to internal R&D and benchmarking activities',
    ],
    requirements: [
      'Currently pursuing or recently completed B.E/B.Tech/M.Tech in Mechanical or related discipline',
      'Basic understanding of solid mechanics, structural analysis, and material science',
      'Familiarity with any FEA software (Ansys, Abaqus, SolidWorks Simulation) is a plus',
      'Strong academic record and eagerness to learn',
      'Good communication skills (written and verbal)',
    ],
    benefits: [
      'Mentorship from experienced FEA professionals',
      'Hands-on experience with real client projects',
      'Stipend provided during the internship period',
      'Certificate of completion and potential for full-time conversion',
      'Access to Tridiagonal learning resources and technical library',
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════ */
export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.jobId;
  const job = JOBS_DATA[jobId];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    coverLetter: '',
  });
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!job) {
    return (
      <main style={{ paddingTop: 'var(--nav-height)', background: '#1a1a1a', minHeight: '100vh' }}>
        <div className="content-wrapper-lg" style={{ padding: '120px 20px', textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '20px' }}>Position Not Found</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', marginBottom: '40px' }}>
            The job listing you are looking for does not exist or may have been removed.
          </p>
          <Link href="/careers" className="btn-primary" style={{ textDecoration: 'none', padding: '14px 35px' }}>
            ← Back to Careers
          </Link>
        </div>
      </main>
    );
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const submitApplication = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>

      {/* ─────────────── JOB HERO ─────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'url(/images/careers-bg.png) center center / cover no-repeat',
          padding: '80px 0 60px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,26,0.88)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            href="/careers"
            style={{
              color: 'var(--color-teal)',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '25px',
              transition: 'opacity 0.3s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Back to all positions
          </Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
            <span className="job-hero-pill">{job.department}</span>
            <span className="job-hero-pill">{job.type}</span>
          </div>
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '18px',
              lineHeight: '1.2',
            }}
          >
            {job.title}
          </h1>
          <div className="job-hero-meta">
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {job.location}
            </span>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              Posted: {job.date}
            </span>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {job.experience}
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────── JOB CONTENT ─────────────── */}
      <section style={{ background: '#1a1a1a', padding: '60px 0 80px' }}>
        <div className="content-wrapper-lg">
          <div className="job-detail-layout">

            {/* LEFT: Job Description */}
            <div className="job-detail-left">

              {/* Overview */}
              <div className="job-section-block">
                <h2 className="job-section-heading">About the Role</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', fontSize: '16px' }}>
                  {job.overview}
                </p>
              </div>

              {/* Quick Info Cards */}
              <div className="job-info-cards">
                <div className="job-info-card">
                  <span className="job-info-label">Department</span>
                  <span className="job-info-value">{job.department}</span>
                </div>
                <div className="job-info-card">
                  <span className="job-info-label">Location</span>
                  <span className="job-info-value">{job.location}</span>
                </div>
                <div className="job-info-card">
                  <span className="job-info-label">Experience</span>
                  <span className="job-info-value">{job.experience}</span>
                </div>
                <div className="job-info-card">
                  <span className="job-info-label">Education</span>
                  <span className="job-info-value">{job.education}</span>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="job-section-block">
                <h2 className="job-section-heading">Key Responsibilities</h2>
                <ul className="job-detail-list">
                  {job.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="job-section-block">
                <h2 className="job-section-heading">Requirements & Qualifications</h2>
                <ul className="job-detail-list">
                  {job.requirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="job-section-block">
                <h2 className="job-section-heading">What We Offer</h2>
                <ul className="job-detail-list benefits-list">
                  {job.benefits.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: Application Form (Sticky) */}
            <div className="job-detail-right">
              <div className="job-form-card">
                {!submitted ? (
                  <>
                    <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
                      Apply for this position
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '28px' }}>
                      Fill out the form below and we&apos;ll get back to you shortly.
                    </p>
                    <form onSubmit={submitApplication} className="job-apply-form">
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input suppressHydrationWarning type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input suppressHydrationWarning type="email" required placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input suppressHydrationWarning type="tel" required placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>LinkedIn / Portfolio URL</label>
                        <input suppressHydrationWarning type="url" placeholder="https://linkedin.com/in/…" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Cover Letter</label>
                        <textarea rows={4} placeholder="Tell us why you're a great fit…" value={formData.coverLetter} onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Upload Resume * (.pdf, .doc, .docx)</label>
                        <div className="file-upload-zone">
                          <input suppressHydrationWarning type="file" required accept=".pdf,.doc,.docx" id="resume-upload" style={{ display: 'none' }} onChange={handleFileChange} />
                          <label htmlFor="resume-upload" className="file-upload-label">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="17 8 12 3 7 8"/>
                              <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            {fileName ? (
                              <span style={{ color: 'var(--color-teal)', fontWeight: '600' }}>{fileName}</span>
                            ) : (
                              <span>Click to upload your resume</span>
                            )}
                          </label>
                        </div>
                      </div>
                      <button suppressHydrationWarning type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '16px', fontWeight: '700', marginTop: '8px' }}>
                        Submit Application
                      </button>
                    </form>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(71,188,135,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>
                      Application Submitted!
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>
                      Thank you, {formData.name}! We have received your application for <strong style={{ color: '#fff' }}>{job.title}</strong>. Our team will review it and get back to you shortly.
                    </p>
                    <Link href="/careers" className="btn-primary" style={{ textDecoration: 'none', padding: '12px 30px', display: 'inline-block' }}>
                      Browse More Positions
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────── SCOPED STYLES ─────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .job-hero-pill {
          display: inline-block;
          background: rgba(71,188,135,0.12);
          color: var(--color-teal);
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }
        .job-hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          color: rgba(255,255,255,0.55);
          font-size: 15px;
        }
        .job-hero-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* Layout */
        .job-detail-layout {
          display: flex;
          gap: 40px;
          align-items: flex-start;
        }
        .job-detail-left { flex: 1.15; min-width: 0; }
        .job-detail-right { flex: 0.85; min-width: 0; position: sticky; top: calc(var(--nav-height) + 20px); }
        @media (max-width: 900px) {
          .job-detail-layout { flex-direction: column; }
          .job-detail-right { position: static; }
        }

        /* Section blocks */
        .job-section-block { margin-bottom: 40px; }
        .job-section-heading {
          color: '#fff';
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          color: #fff;
        }
        .job-detail-list {
          color: rgba(255,255,255,0.75);
          font-size: 15px;
          line-height: 1.8;
          padding-left: 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .job-detail-list li::marker { color: var(--color-teal); }
        .benefits-list li::marker { content: '✓  '; color: var(--color-teal); }

        /* Info cards grid */
        .job-info-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 40px;
        }
        @media (max-width: 500px) { .job-info-cards { grid-template-columns: 1fr; } }
        .job-info-card {
          background: #242424;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .job-info-label {
          color: rgba(255,255,255,0.4);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .job-info-value {
          color: #fff;
          font-size: 15px;
          font-weight: 500;
        }

        /* Form Card */
        .job-form-card {
          background: #242424;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 35px;
        }
        .job-apply-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .form-group { display: flex; flex-direction: column; gap: 7px; }
        .form-group label {
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          font-weight: 500;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 14px;
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s ease;
          font-family: inherit;
          resize: vertical;
        }
        .form-group input:focus,
        .form-group textarea:focus { border-color: var(--color-teal); }
        .form-group input::placeholder,
        .form-group textarea::placeholder { color: rgba(255,255,255,0.25); }

        .file-upload-zone {
          border: 1px dashed rgba(255,255,255,0.15);
          border-radius: 10px;
          background: #1a1a1a;
          transition: border-color 0.3s;
        }
        .file-upload-zone:hover { border-color: var(--color-teal); }
        .file-upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 25px;
          cursor: pointer;
          color: rgba(255,255,255,0.45);
          font-size: 14px;
          text-align: center;
        }
      `}} />
    </main>
  );
}
