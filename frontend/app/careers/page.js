'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

/* ───────────────────── CORE VALUES DATA ───────────────────── */
const CORE_VALUES = [
  {
    title: 'Innovation',
    desc: 'Encouraging new ideas, creativity, and continuous improvement.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6"/><path d="M10 22h4"/>
        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>
      </svg>
    ),
  },
  {
    title: 'Customer Centricity',
    desc: "Putting customers' needs first and striving to exceed their expectations.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Excellence',
    desc: 'Striving for the highest standards of quality and performance.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    ),
  },
  {
    title: 'Results-Driven',
    desc: 'Focusing on achieving measurable outcomes and goals.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    title: 'Teamwork',
    desc: 'Collaborating effectively and valuing diverse perspectives.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Agility',
    desc: 'Being adaptable and responsive to changing market and technological trends.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
];

/* ───────────────────── DEPARTMENTS ───────────────────── */
const DEPARTMENTS = [
  'All Departments',
  'Advanced Modeling & Simulation (CFD/FEA)',
  'Technology Validation & Scale-up Centre',
  'Digital Solutions & AI',
  'Process Consulting',
];

/* ───────────────────── OPPORTUNITIES DATA ───────────────────── */
const OPPORTUNITIES = [
  {
    id: 'project-engineer',
    title: 'Project Engineer',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'January 8, 2026',
    location: 'Pune, India',
    type: 'Full-time',
  },
  {
    id: 'sr-project-engineer-cfd-combustion',
    title: 'Sr. Project Engineer (CFD – Combustion Modeling)',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'November 18, 2025',
    location: 'Pune, India',
    type: 'Full-time',
  },
  {
    id: 'project-engineer-efd-laboratory',
    title: 'Project Engineer (EFD Laboratory)',
    department: 'Technology Validation & Scale-up Centre',
    date: 'October 20, 2025',
    location: 'Pune, India',
    type: 'Full-time',
  },
  {
    id: 'project-leader-cfd-combustion',
    title: 'Project Leader (CFD - Combustion Modeling)',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'February 13, 2025',
    location: 'Pune, India',
    type: 'Full-time',
  },
  {
    id: 'intern-fea',
    title: 'Intern (FEA)',
    department: 'Advanced Modeling & Simulation (CFD/FEA)',
    date: 'October 1, 2024',
    location: 'Pune, India',
    type: 'Internship',
  },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function Careers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  const filteredJobs = useMemo(() => {
    return OPPORTUNITIES.filter((job) => {
      const matchesDept =
        selectedDept === 'All Departments' || job.department === selectedDept;
      const matchesSearch =
        searchQuery.trim() === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [searchQuery, selectedDept]);

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>

      {/* ─────────────── HERO SECTION ─────────────── */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'url(/images/careers-bg.png) center center / cover no-repeat',
          minHeight: 'auto',
          padding: '80px 0 60px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26, 26, 26, 0.85)' }} />
        <div
          className="content-wrapper-lg"
          style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}
        >
          <h1
            className="hero-title fade-in-up"
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '15px',
            }}
          >
            Explore opportunities to grow in{' '}
            <span className="gradient-text">advanced technology</span> space
          </h1>
          <p
            className="hero-desc fade-in-up delay-200"
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '18px',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            We&apos;re a group of talented professionals who are passionate about
            applying advanced technologies in process industry
          </p>
        </div>
      </section>

      {/* ─────────────── OUR CORE VALUES ─────────────── */}
      <section style={{ padding: '80px 0', background: '#222' }}>
        <div className="content-wrapper-lg">
          <div style={{ marginBottom: '50px' }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 'bold',
                color: 'var(--color-teal)',
                marginBottom: '12px',
              }}
            >
              Our Core Values
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
              Fostering Growth and Success for Our Customers and Employees
            </p>
          </div>

          <div className="core-values-grid">
            {CORE_VALUES.map((val, idx) => (
              <div key={idx} className="core-value-card">
                <div style={{ color: '#fff', marginBottom: '18px', opacity: 0.9 }}>
                  {val.icon}
                </div>
                <h3
                  style={{
                    fontSize: '20px',
                    color: '#fff',
                    fontWeight: '600',
                    marginBottom: '12px',
                  }}
                >
                  {val.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.95)',
                    lineHeight: '1.7',
                    fontSize: '18px',
                  }}
                >
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── LATEST OPPORTUNITIES ─────────────── */}
      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2
              className="section-title"
              style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}
            >
              Check out our
              <br />
              <span className="gradient-text">latest opportunities</span>
            </h2>
          </div>

          {/* ── Filters Bar ── */}
          <div className="jobs-filter-bar">
            <div className="jobs-search-wrap">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by title, department, or location…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="jobs-search-input"
              />
            </div>

            <div className="jobs-dept-wrap">
              <label
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                }}
              >
                Department
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="jobs-dept-select"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Job List ── */}
          <div className="jobs-list">
            {filteredJobs.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '16px',
                }}
              >
                No positions match your search. Try adjusting the filters.
              </div>
            )}

            {filteredJobs.map((job) => (
              <div key={job.id} className="job-row">
                <div className="job-row-info">
                  <h3 className="job-row-title">{job.title}</h3>
                  <div className="job-row-meta">
                    <span className="job-meta-pill">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                      {job.department}
                    </span>
                    <span className="job-meta-pill">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {job.location}
                    </span>
                    <span className="job-meta-pill">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {job.date}
                    </span>
                    <span className="job-meta-pill job-type-pill">{job.type}</span>
                  </div>
                </div>
                <Link href={`/careers/${job.id}`} className="btn-primary job-apply-btn">
                  APPLY NOW
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── SCOPED STYLES ─────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .core-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px 35px;
        }
        @media (max-width: 900px) { .core-values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 550px) { .core-values-grid { grid-template-columns: 1fr; } }
        .core-value-card {
          display: flex;
          flex-direction: column;
          padding: 10px 0;
        }

        .jobs-filter-bar {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .jobs-search-wrap {
          flex: 1;
          min-width: 280px;
          position: relative;
        }
        .jobs-search-input {
          width: 100%;
          padding: 14px 15px 14px 44px;
          background: #242424;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .jobs-search-input:focus { border-color: var(--color-teal); }
        .jobs-search-input::placeholder { color: rgba(255,255,255,0.35); }

        .jobs-dept-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #242424;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 0 15px;
          min-width: 260px;
        }
        .jobs-dept-select {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 14px;
          padding: 14px 0;
          outline: none;
          cursor: pointer;
          width: 100%;
        }
        .jobs-dept-select option { background: #242424; color: #fff; }
        @media (max-width: 600px) { .jobs-dept-wrap { min-width: 100%; } }

        .jobs-list {
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 15px;
          overflow: hidden;
        }
        .job-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 30px;
          background: #242424;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background 0.25s ease;
          flex-wrap: wrap;
          gap: 15px;
        }
        .job-row:last-child { border-bottom: none; }
        .job-row:hover { background: #2a2a2a; }
        .job-row-info { flex: 1; min-width: 250px; }
        .job-row-title {
          color: #fff;
          font-size: 19px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .job-row-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }
        .job-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: rgba(255,255,255,0.5);
          font-size: 13px;
        }
        .job-type-pill {
          background: rgba(71,188,135,0.12);
          color: var(--color-teal);
          padding: 3px 10px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 12px;
        }
        .job-apply-btn {
          padding: 10px 28px !important;
          font-size: 13px !important;
          font-weight: 700 !important;
          letter-spacing: 1px;
          white-space: nowrap;
          text-decoration: none;
        }
      `}} />
    </main>
  );
}
