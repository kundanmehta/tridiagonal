'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import WebinarRegistrationForm from '@/components/WebinarRegistrationForm';
import { API_URL, resolveImageUrl } from '@/lib/apiConfig';

const mockCaseStudies = [
  { title: 'Reducing Erosion in Subsea Pipelines', service: 'Advanced Modeling & Simulation', industry: 'Oil & Gas', excerpt: 'Detailed CFD analysis of sand erosion inside subsea tie-backs leading to a 30% reduction in pipe wear.', coverImage: '/hubfs/Digital Twin.jpg', slug: 'reducing-erosion-subsea', date: '2023-12-02' },
  { title: 'Optimizing Mixing Bioreactors for Vaccine Production', service: 'Technology Validation', industry: 'Pharma & Medical Devices', excerpt: 'Using physical scale-up modeling and CFD to maximize cell viability in heavy agitation tanks.', coverImage: '/hubfs/image%20(10).png', slug: 'optimizing-mixing-bioreactors', date: '2024-01-14' },
  { title: 'Digital Twin for Continuous Caster Tracking', service: 'Digital Transformation', industry: 'Metals & Mining', excerpt: 'Implementation of a holistic digital twin using Agentic AI to predict slab defects and thermal anomalies.', coverImage: '/hubfs/Flow Assurance.jpg', slug: 'digital-twin-caster-tracking', date: '2024-02-19' },
  { title: 'Thermal Profiling of Heat Exchangers', service: 'Advanced Modeling & Simulation', industry: 'Chemicals & Petrochemicals', excerpt: 'Redesigning cross-flow heat exchangers using automated thermal CFD mapping to prevent localized overheating.', coverImage: '/hubfs/CFD FEA Coupled-1.png', slug: 'thermal-profiling-heat-exchangers', date: '2024-03-10' },
  { title: 'Flow Assurance Strategy using Siemens Simcenter', service: 'Partner Solutions', industry: 'Oil & Gas', excerpt: 'A seamless integration of Siemens Simcenter to identify complex multiphase flow regimes during heavy oil extraction.', coverImage: '/hubfs/Blog CFD DEM.png', slug: 'flow-assurance-siemens-simcenter', date: '2024-04-05' },
  { title: 'Crystallization Process Scale-up', service: 'Technology Validation', industry: 'Food & Beverages', excerpt: 'Experimental fluid dynamics and pilot plant testing applied to optimize commercial scale crystallization networks.', coverImage: '/hubfs/image%20(12).png', slug: 'crystallization-process-scaleup', date: '2024-05-22' },
];

export default function CaseStudySinglePage() {
  const params = useParams();
  const { slug } = params || {};

  const cleanHTML = (html) => {
    if (!html) return '';
    if (typeof html !== 'string') return html;
    return html.replace(/&nbsp;/g, ' ');
  };

  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedCaseStudies, setRelatedCaseStudies] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', company: '', phone: '', country: '', consent: false
  });

  useEffect(() => {
    if (slug) {
      setLoading(true);
      Promise.all([
        fetch(`${API_URL}/api/resources/${slug}`).then(r => r.json()).catch(() => ({})),
        fetch(`${API_URL}/api/resources?type=Case Study&limit=50`).then(r => r.json()).catch(() => ({}))
      ]).then(([csRes, allRes]) => {
        const cs = csRes.data || mockCaseStudies.find(c => c.slug === slug);
        setCaseStudy(cs);

        if (cs) {
          let all = allRes.data || mockCaseStudies;
          all = all.filter(c => c.slug !== slug);

          // Score: +2 for matching industry, +1 for matching service
          all.sort((a, b) => {
            let scoreA = 0, scoreB = 0;
            if (a.industry === cs.industry) scoreA += 2;
            if (a.service === cs.service) scoreA += 1;
            if (b.industry === cs.industry) scoreB += 2;
            if (b.service === cs.service) scoreB += 1;
            return scoreB - scoreA;
          });

          setRelatedCaseStudies(all.slice(0, 4));
        }
        setLoading(false);
      });
    }
  }, [slug, API_URL]);

  if (loading) {
    return (
      <main style={{ paddingTop: 'var(--nav-height)', background: '#111', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '600' }}>Loading Case Study...</h1>
      </main>
    );
  }

  if (!caseStudy) {
    return (
      <main style={{ paddingTop: 'var(--nav-height)', background: '#111', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ color: '#fff' }}>Case Study Not Found</h1>
      </main>
    );
  }

  const handleDownload = (e) => { e.preventDefault(); setSubmitted(true); };
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = encodeURIComponent(caseStudy.title);

  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#111' }}>
      <ReadingProgressBar />

      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #111 0%, #1a1a1a 100%)', padding: '70px 0 40px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(0, 255, 204, 0.1) 0%, transparent 70%)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumbs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '30px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/resources/case-studies" style={{ color: 'inherit', textDecoration: 'none' }}>Resources</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-teal)' }}>Case Study</span>
          </nav>

          <Link href="/resources/case-studies" className="back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            BACK TO CASE STUDIES
          </Link>

          <div style={{ marginTop: '25px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '25px' }}>
              <span className="category-badge">{caseStudy.industry}</span>
              <span className="service-badge-outline">{caseStudy.service}</span>
            </div>
            <h1 className="blog-title gradient-text">{caseStudy.title}</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', color: 'rgba(255,255,255,0.5)', fontSize: '15px', marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                {new Date(caseStudy.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                PDF Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section style={{ background: '#111', padding: '40px 0 80px' }}>
        <div className="content-wrapper-lg">
          <div className="cs-detail-layout">

            {/* Left Content Area */}
            <div className="cs-detail-left">

              <div className="blog-body-text">
                <p className="blog-lead-text">
                  {cleanHTML(caseStudy.excerpt)}
                </p>
                {Array.isArray(caseStudy.content) ? (
                  caseStudy.content.map((para, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: cleanHTML(para) }} style={{ marginBottom: '20px' }} />
                  ))
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: cleanHTML(caseStudy.content) }} />
                )}
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="cs-detail-right">
              {/* Form Card */}
              <div className="cs-form-card">
                {!submitted ? (
                  <>
                    {caseStudy.selectedFormId ? (
                      <div className="dynamic-form-container">
                        <WebinarRegistrationForm
                          webinarTitle={caseStudy.title}
                          preloadedFormConfig={caseStudy.selectedFormId}
                          customTitle="Register to Access"
                          noStyles={true}
                        />
                      </div>
                    ) : (
                      <>
                        <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '20px', fontWeight: '700' }}>Download Full Case Study</h3>
                        <form onSubmit={handleDownload} className="cs-apply-form">
                          <div className="form-row">
                            <div className="form-group">
                              <label>First Name*</label>
                              <input type="text" required placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                            </div>
                            <div className="form-group">
                              <label>Last Name*</label>
                              <input type="text" required placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Corporate Email*</label>
                            <input type="email" required placeholder="email@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                          </div>
                          <button type="submit" className="glow-button" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                            <span className="gradient-text">Request Download Link</span>
                          </button>
                        </form>
                      </>
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0,174,239,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00AEEF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <h4 style={{ color: '#fff', marginBottom: '10px' }}>Thank You!</h4>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>The PDF case study is ready for you.</p>
                    <button className="glow-button" style={{ width: '100%' }} onClick={() => window.open(caseStudy.fileUrl || '#', '_blank')}>
                      <span className="gradient-text">Download PDF Now</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Share Section */}
              <div className="sidebar-card" style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '15px', color: '#fff', marginBottom: '20px', fontWeight: '600' }}>Share Case Study</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="social-share-btn">LinkedIn</a>
                  <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="social-share-btn">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Insights Grid */}
      {relatedCaseStudies.length > 0 && (
        <section style={{ background: '#111', padding: '0 0 100px' }}>
          <div className="content-wrapper-lg">
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '60px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '800', margin: 0 }} className="gradient-text">Related Insights</h2>
                <Link href="/resources/case-studies" style={{ color: 'var(--color-teal)', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  View All
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {relatedCaseStudies.map((insight) => (
                  <Link key={insight.slug} href={`/resources/case-studies/${insight.slug}`} style={{ textDecoration: 'none' }}>
                    <article className="cs-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#1a1a1a', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)' }}>
                      <div style={{ position: 'relative', width: '100%', height: '350px' }}>
                        <Image src={resolveImageUrl(insight.coverImage) || '/hubfs/Digital Twin.jpg'} alt={insight.title} fill style={{ objectFit: 'cover' }} unoptimized={true} />
                      </div>
                      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <span style={{ color: '#00AEEF', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>{insight.industry}</span>
                        </div>
                        <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', lineHeight: '1.4', marginBottom: '20px' }}>{insight.title}</h3>
                        <div style={{ fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
                          <span className="gradient-text">READ MORE</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#00AEEF' }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .back-link { color: var(--color-teal); text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; gap: 10px; font-weight: 700; letter-spacing: 1.5px; transition: all 0.3s ease; }
        .back-link:hover { gap: 15px; opacity: 0.8; }
        .category-badge { display: inline-block; background: rgba(0, 174, 239, 0.1); color: #00AEEF; padding: 8px 18px; border-radius: 30px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border: 1px solid rgba(0, 174, 239, 0.2); }
        .service-badge-outline { display: inline-block; background: transparent; color: rgba(255,255,255,0.6); padding: 8px 18px; border-radius: 30px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border: 1px solid rgba(255,255,255,0.1); }
        .blog-title { color: #fff; font-size: clamp(30px, 4.5vw, 52px); font-weight: 800; line-height: 1.15; max-width: 950px; letter-spacing: -0.02em; }
        .cs-detail-layout { display: flex; gap: 40px; align-items: flex-start; }
        .cs-detail-left { flex: 1; min-width: 0; }
        .cs-detail-right { flex: 0 0 470px; position: sticky; top: 100px; }
        @media (max-width: 1024px) { .cs-detail-layout { flex-direction: column; } .cs-detail-right { flex: none; width: 100%; position: static; } }
        .featured-image-container { position: relative; width: 100%; height: 480px; border-radius: 24px; overflow: hidden; margin-bottom: 50px; box-shadow: 0 30px 60px rgba(0,0,0,0.4); }
        .blog-body-text { color: rgba(255,255,255,0.7); line-height: 1.85; font-size: 1.15rem; }
        .blog-body-text p { margin-bottom: 25px; }
        .blog-lead-text { font-size: 1.4rem; font-weight: 500; color: #fff; line-height: 1.6; margin-bottom: 40px !important; border-left: 4px solid var(--color-teal); padding-left: 30px; }
        .cs-form-card { background: linear-gradient(145deg, #1e1e1e 0%, #151515 100%); padding: 35px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.06); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .cs-apply-form { display: flex; flex-direction: column; gap: 15px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .form-group label { display: block; color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .form-group input { width: 100%; padding: 12px 16px; background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: #fff; font-size: 14px; outline: none; transition: border-color 0.3s; }
        .form-group input:focus { border-color: var(--color-teal); }
        .glow-button { background: var(--gradient-brand); color: #fff; border: none; padding: 16px 30px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 14px; transition: all 0.3s; cursor: pointer; display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 20px rgba(0, 174, 239, 0.2); }
        .glow-button:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(0, 174, 239, 0.4); opacity: 0.9; }
        .sidebar-card { background: rgba(255,255,255,0.02); padding: 35px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); }
        .social-share-btn { flex: 1; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 8px; font-size: 11px; font-weight: 700; text-align: center; text-decoration: none; transition: all 0.3s; }
        .social-share-btn:hover { border-color: var(--color-teal); color: var(--color-teal); background: rgba(255,255,255,0.06); }
        .cs-card:hover { transform: translateY(-10px); border-color: rgba(0, 174, 239, 0.3) !important; box-shadow: 0 30px 60px rgba(0,0,0,0.4); }
        @media (max-width: 1024px) { .cs-card-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .cs-card-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}
