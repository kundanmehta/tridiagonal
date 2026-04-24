'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import WebinarRegistrationForm from '@/components/WebinarRegistrationForm';

// ... (keep mockCaseStudies as they are)

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

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com';

  useEffect(() => {
    if (slug) {
      fetch(`${API_URL}/api/resources/${slug}`)
        .then(res => res.json())
        .then(json => {
          if (json.data) setCaseStudy(json.data);
          else setCaseStudy(mockCaseStudies.find(c => c.slug === slug));
          setLoading(false);
        })
        .catch(() => {
          setCaseStudy(mockCaseStudies.find(c => c.slug === slug));
          setLoading(false);
        });

      fetch(`${API_URL}/api/resources?type=Case Study&limit=4`)
        .then(res => res.json())
        .then(json => {
          if (json.data) setRelatedCaseStudies(json.data.filter(c => c.slug !== slug).slice(0, 3));
          else setRelatedCaseStudies(mockCaseStudies.filter(c => c.slug !== slug).slice(0, 3));
        })
        .catch(() => setRelatedCaseStudies(mockCaseStudies.filter(c => c.slug !== slug).slice(0, 3)));
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
      <section style={{ background: '#111', padding: '40px 0 100px' }}>
        <div className="content-wrapper-lg">
          <div className="cs-detail-layout">

            {/* Left Content Area */}
            <div className="cs-detail-left">
              <div className="featured-image-container">
                <Image
                  src={caseStudy.coverImage || '/hubfs/Digital Twin.jpg'}
                  alt={caseStudy.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

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

              {/* Related/Share Section */}
              <div className="sidebar-card" style={{ marginTop: '30px' }}>
                <h3 className="sidebar-title">Related Case Studies</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  {relatedCaseStudies.map((related) => (
                    <Link href={`/resources/case-studies/${related.slug}`} key={related.slug} className="related-post-item">
                      <div className="related-thumb">
                        <Image src={related.coverImage || '/hubfs/Digital Twin.jpg'} alt={related.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 className="related-title-text">{related.title}</h4>
                        <span className="related-cat-text">{related.industry}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 style={{ fontSize: '15px', color: '#fff', marginBottom: '20px', fontWeight: '600' }}>Share Case Study</h3>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="social-share-btn">LinkedIn</a>
                    <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="social-share-btn">Twitter</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .back-link { color: var(--color-teal); text-decoration: none; font-size: 13px; display: inline-flex; alignItems: center; gap: 10px; font-weight: 700; letter-spacing: 1.5px; transition: all 0.3s ease; }
        .back-link:hover { gap: 15px; opacity: 0.8; }
        .category-badge { display: inline-block; background: rgba(0, 174, 239, 0.1); color: #00AEEF; padding: 8px 18px; border-radius: 30px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border: 1px solid rgba(0, 174, 239, 0.2); }
        .service-badge-outline { display: inline-block; background: transparent; color: rgba(255,255,255,0.6); padding: 8px 18px; border-radius: 30px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; border: 1px solid rgba(255,255,255,0.1); }
        .blog-title { color: #fff; fontSize: clamp(30px, 4.5vw, 52px); font-weight: 800; line-height: 1.15; max-width: 950px; letter-spacing: -0.02em; }
        .cs-detail-layout { display: flex; gap: 40px; align-items: flex-start; }
        .cs-detail-left { flex: 1; maxWidth: 850px; min-width: 0; }
        .cs-detail-right { flex: 0 0 470px; position: sticky; top: 100px; }
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
        .glow-button { background: #00AEEF; color: #fff; border: none; padding: 15px 30px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 14px; transition: all 0.3s; cursor: pointer; display: flex; align-items: center; gap: 10px; }
        .glow-button:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0, 174, 239, 0.4); background: #008fcc; }
        .sidebar-card { background: rgba(255,255,255,0.02); padding: 35px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); }
        .sidebar-title { font-size: 16px; color: #fff; margin-bottom: 25px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 700; }
        .related-post-item { display: flex; gap: 15px; text-decoration: none; transition: transform 0.3s; }
        .related-post-item:hover { transform: translateX(5px); }
        .related-thumb { width: 85px; height: 60px; position: relative; border-radius: 10px; overflow: hidden; flex-shrink: 0; background: #000; }
        .related-title-text { font-size: 13px; color: #fff; line-height: 1.4; margin: 0 0 4px 0; font-weight: 600; transition: color 0.3s; }
        .related-post-item:hover .related-title-text { color: var(--color-teal); }
        .related-cat-text { font-size: 10px; color: #00AEEF; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        .social-share-btn { flex: 1; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 8px; font-size: 11px; font-weight: 700; text-align: center; text-decoration: none; transition: all 0.3s; }
        .social-share-btn:hover { border-color: var(--color-teal); color: var(--color-teal); background: rgba(255,255,255,0.06); }
      `}</style>
    </main>
  );
}
