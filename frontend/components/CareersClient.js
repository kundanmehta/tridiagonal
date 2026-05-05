'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

const VALUE_ICONS = [
  <svg key={0} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>,
  <svg key={1} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key={2} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  <svg key={3} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  <svg key={4} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key={5} width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
];

export default function CareersClient({ p, initialJobs }) {
  const [jobs] = useState(initialJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  const departments = useMemo(() => {
    return ['All Departments', ...new Set(jobs.map(j => j.department).filter(Boolean))];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesDept = selectedDept === 'All Departments' || job.department === selectedDept;
      const matchesSearch =
        searchQuery.trim() === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.department || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.location || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [searchQuery, selectedDept, jobs]);

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: `url(${p.heroSection?.bgImage}) center center / cover no-repeat`, minHeight: 'auto', padding: '80px 0 60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26, 26, 26, 0.85)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '15px' }} dangerouslySetInnerHTML={{ __html: p.heroSection?.title }} />
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>{p.heroSection?.description}</p>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: '#222' }}>
        <div className="content-wrapper-lg">
          <div style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 'bold', color: 'var(--color-teal)', marginBottom: '12px' }}>{p.coreValuesSection?.heading}</h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>{p.coreValuesSection?.description}</p>
          </div>
          <div className="core-values-grid">
            {(p.coreValuesSection?.values || []).map((val, idx) => (
              <div key={idx} className="core-value-card">
                <div style={{ color: '#fff', marginBottom: '18px', opacity: 0.9 }}>{VALUE_ICONS[idx % VALUE_ICONS.length]}</div>
                <h3 style={{ fontSize: '20px', color: '#fff', fontWeight: '600', marginBottom: '12px' }}>{val.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.95)', lineHeight: '1.7', fontSize: '18px' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a' }}>
        <div className="content-wrapper-lg">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="section-title" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}
              dangerouslySetInnerHTML={{ __html: p.opportunitiesSection?.heading?.replace('latest opportunities', '<span class="gradient-text">latest opportunities</span>') }}
            />
          </div>

          <div className="jobs-filter-bar">
            <div className="jobs-search-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input suppressHydrationWarning type="text" placeholder="Search by title, department, or location…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="jobs-search-input" />
            </div>
            <div className="jobs-dept-wrap">
              <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', whiteSpace: 'nowrap' }}>Department</label>
              <select suppressHydrationWarning value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="jobs-dept-select">
                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="jobs-list">
            {filteredJobs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>No positions match your search.</div>
            ) : filteredJobs.map((job) => (
              <div key={job.id} className="job-row">
                <div className="job-row-info">
                  <h3 className="job-row-title">{job.title}</h3>
                  <div className="job-row-meta">
                    <span className="job-meta-pill">{job.department}</span>
                    <span className="job-meta-pill">{job.location}</span>
                    <span className="job-meta-pill">{job.date}</span>
                    <span className="job-meta-pill job-type-pill">{job.type}</span>
                  </div>
                </div>
                <Link href={`/careers/${job.id}`} className="btn-primary job-apply-btn">APPLY NOW</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .core-values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 35px; }
        .core-value-card { display: flex; flex-direction: column; padding: 10px 0; }
        .jobs-filter-bar { display: flex; gap: 15px; margin-bottom: 30px; flex-wrap: wrap; }
        .jobs-search-wrap { flex: 1; min-width: 280px; position: relative; }
        .jobs-search-input { width: 100%; padding: 14px 15px 14px 44px; background: #242424; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: #fff; font-size: 15px; outline: none; }
        .jobs-dept-wrap { display: flex; align-items: center; gap: 10px; background: #242424; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 0 15px; min-width: 260px; }
        .jobs-dept-select { background: transparent; border: none; color: #fff; font-size: 14px; padding: 14px 0; outline: none; cursor: pointer; width: 100%; }
        .jobs-list { display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.06); border-radius: 15px; overflow: hidden; }
        .job-row { display: flex; justify-content: space-between; align-items: center; padding: 28px 30px; background: #242424; border-bottom: 1px solid rgba(255,255,255,0.06); transition: background 0.25s ease; flex-wrap: wrap; gap: 15px; }
        .job-row:last-child { border-bottom: none; }
        .job-row-title { color: #fff; font-size: 19px; font-weight: 600; margin-bottom: 10px; }
        .job-row-meta { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
        .job-meta-pill { display: inline-flex; align-items: center; gap: 5px; color: rgba(255,255,255,0.5); font-size: 13px; }
        .job-type-pill { background: rgba(71,188,135,0.12); color: var(--color-teal); padding: 3px 10px; border-radius: 20px; font-weight: 600; font-size: 12px; }
        .job-apply-btn { background: var(--color-teal); color: #1a1a1a; padding: 10px 28px; border-radius: 50px; font-weight: 700; text-decoration: none; }
        @media (max-width: 900px) { .core-values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 550px) { .core-values-grid { grid-template-columns: 1fr; } }
      `}} />
    </main>
  );
}
