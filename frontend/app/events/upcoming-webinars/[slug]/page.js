import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventBySlug } from '../../data';
import WebinarRegistrationForm from '../../../../components/WebinarRegistrationForm';

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const webinar = getEventBySlug(slug);
  if (!webinar) return { title: 'Webinar Not Found' };
  return { title: `${webinar.title} | Upcoming Webinars | Tridiagonal Solutions` };
};

export default async function WebinarDetail({ params }) {
  const { slug } = await params;
  const webinar = getEventBySlug(slug);
  
  if (!webinar) {
    notFound();
  }

  // Use fullDescription if available, otherwise fallback to standard description
  const descriptionParagraphs = webinar.fullDescription 
    ? webinar.fullDescription 
    : webinar.description.split('\n').filter(p => p.trim() !== '');

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* ─────────────── WEBINAR HERO ─────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)',
          padding: '80px 0 60px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            href="/events/upcoming-webinars"
            style={{
              color: 'var(--color-teal)',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '25px',
              transition: 'opacity 0.3s',
              fontWeight: '600'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            BACK TO WEBINARS
          </Link>
          
          <div style={{ marginBottom: '16px' }}>
            <span className="webinar-hero-pill" style={{ 
              background: webinar.type.includes('OnDemand') ? 'rgba(255, 165, 0, 0.15)' : 'rgba(0, 255, 204, 0.15)', 
              color: webinar.type.includes('OnDemand') ? '#FFA500' : 'var(--color-teal)'
            }}>
              {webinar.type}
            </span>
          </div>

          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              marginBottom: '24px',
              lineHeight: '1.2',
              maxWidth: '100%'
            }}
          >
            {webinar.title}
          </h1>

          <div className="webinar-hero-meta">
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              {webinar.date}
            </span>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              45 mins Duration
            </span>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Online Technical Session
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────── WEBINAR CONTENT ─────────────── */}
      <section style={{ background: '#1a1a1a', padding: '60px 0 80px' }}>
        <div className="content-wrapper-lg">
          <div className="webinar-detail-layout">

            {/* LEFT: Description & Details */}
            <div className="webinar-detail-left">

              {/* Overview */}
              <div className="webinar-section-block">
                <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                  {descriptionParagraphs.map((para, i) => (
                    <p key={i} style={{ marginBottom: '20px' }}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Learning Points */}
              {webinar.learnPoints && webinar.learnPoints.length > 0 && (
                <div className="webinar-section-block">
                  <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px', fontWeight: '600' }}>In this session, you&apos;ll learn:</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255, 255, 255, 0.8)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {webinar.learnPoints.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Who Should Attend */}
              {webinar.attendees && webinar.attendees.length > 0 && (
                <div className="webinar-section-block">
                  <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px', fontWeight: '600' }}>Who Should Attend:</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '15px' }}>This webinar is designed for:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
                    {webinar.attendees.map((attendee, idx) => (
                      <div key={idx} style={{ background: '#242424', padding: '15px 20px', borderRadius: '8px', borderLeft: '3px solid var(--color-teal)', color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem', fontWeight: '500' }}>
                        {attendee}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Presenter Profile */}
              {webinar.presenter && (
                <div className="webinar-section-block">
                  <div style={{ background: '#242424', borderRadius: '12px', padding: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Presenter</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '25px', flexWrap: 'wrap' }}>
                      <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#363636', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid var(--color-teal)' }}>
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div>
                        <h4 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '8px', fontWeight: '600' }}>{webinar.presenter.name}</h4>
                        <p style={{ color: 'var(--color-teal)', fontSize: '0.95rem', fontWeight: '500', marginBottom: '4px' }}>{webinar.presenter.title}</p>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>{webinar.presenter.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* General Information Cards */}
              <div className="webinar-info-cards" style={{ marginTop: '40px' }}>
                <div className="webinar-info-card">
                  <span className="webinar-info-label">Access Type</span>
                  <span className="webinar-info-value">{webinar.type}</span>
                </div>
                <div className="webinar-info-card">
                  <span className="webinar-info-label">Format</span>
                  <span className="webinar-info-value">Technical Presentation</span>
                </div>
                <div className="webinar-info-card">
                  <span className="webinar-info-label">Host</span>
                  <span className="webinar-info-value">Tridiagonal Solutions</span>
                </div>
              </div>

            </div>

            {/* RIGHT: Registration Form (Sticky Component) */}
            <div className="webinar-detail-right">
              <WebinarRegistrationForm />
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────── SCOPED STYLES ─────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .webinar-hero-pill {
          display: inline-block;
          background: rgba(71,188,135,0.12);
          color: var(--color-teal);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .webinar-hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          color: rgba(255,255,255,0.65);
          font-size: 16px;
        }
        .webinar-hero-meta span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* Layout */
        .webinar-detail-layout {
          display: flex;
          gap: 50px;
          align-items: flex-start;
        }
        .webinar-detail-left { flex: 1.25; min-width: 0; }
        .webinar-detail-right { flex: 0.75; min-width: 0; position: sticky; top: calc(var(--nav-height) + 20px); }
        @media (max-width: 900px) {
          .webinar-detail-layout { flex-direction: column; }
          .webinar-detail-right { width: 100%; position: static; }
        }

        /* Section blocks */
        .webinar-section-block { margin-bottom: 50px; }
        .webinar-section-heading {
          color: #fff;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        /* Info cards grid */
        .webinar-info-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 500px) { .webinar-info-cards { grid-template-columns: 1fr; } }
        .webinar-info-card {
          background: #242424;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .webinar-info-label {
          color: rgba(255,255,255,0.4);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        .webinar-info-value {
          color: #fff;
          font-size: 16px;
          font-weight: 500;
        }
      `}} />
    </main>
  );
}
