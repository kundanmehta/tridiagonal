import Link from 'next/link';
import { notFound } from 'next/navigation';
import WebinarRegistrationForm from '../../../../components/WebinarRegistrationForm';
import { eventsData } from '../../data';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

async function getWebinar(slug) {
  try {
    const res = await fetch(`${API_URL}/api/webinars/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

async function getFormConfig(slug) {
  if (!slug) return null;
  try {
    const res = await fetch(`${API_URL}/api/forms/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const localWebinar = eventsData.find(e => e.slug === slug);
  const dbWebinar = await getWebinar(slug);
  const webinar = dbWebinar || localWebinar;

  if (!webinar) return { title: 'Webinar Not Found' };
  return { title: `${webinar.title} | Upcoming Webinars | Tridiagonal Solutions` };
};

export default async function WebinarDetail({ params }) {
  const { slug } = await params;
  const dbWebinar = await getWebinar(slug);
  const localWebinar = eventsData.find(e => e.slug === slug);

  if (!dbWebinar && !localWebinar) {
    notFound();
  }

  // Merge: DB data takes priority, but we fall back to local data field by field
  const webinar = {
    ...localWebinar,
    ...dbWebinar,
    presenters: dbWebinar?.presenters?.length > 0 ? dbWebinar.presenters : (localWebinar?.presenter ? [localWebinar.presenter] : []),
    learnPoints: dbWebinar?.sections?.find(s => s.type === 'points')?.items ||
      dbWebinar?.learnPoints ||
      localWebinar?.learnPoints || [],
    attendees: dbWebinar?.sections?.find(s => s.type === 'who_attend')?.items ||
      dbWebinar?.attendees ||
      localWebinar?.attendees || [],
    fullDescription: dbWebinar?.fullDescription ||
      (dbWebinar?.sections?.find(s => s.type === 'text')?.value) ||
      (localWebinar?.fullDescription ? (Array.isArray(localWebinar.fullDescription) ? localWebinar.fullDescription.join('<br><br>') : localWebinar.fullDescription) : localWebinar?.description)
  };

  const formConfig = await getFormConfig(webinar.formSlug);

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)',
          padding: '80px 0 60px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(67, 189, 148, 0.1) 0%, transparent 60%)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            href="/events/upcoming-webinars"
            style={{
              color: '#43bd94',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '25px',
              fontWeight: '600'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            BACK TO WEBINARS
          </Link>

          <div style={{ marginBottom: '16px' }}>
            <span className="webinar-hero-pill" style={{
              background: 'rgba(67, 189, 148, 0.1)',
              color: '#43bd94',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-block'
            }}>
              {webinar.accessType || webinar.type || 'Upcoming'}
            </span>
          </div>

          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '700',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}
          >
            {webinar.title}
          </h1>

          <div className="webinar-hero-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>{new Date(webinar.eventDate || webinar.date || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>{webinar.duration || '45 mins'}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>{webinar.sessionType || 'Online Technical Session'}</span>
          </div>
        </div>
      </section>

      <section style={{ background: '#1a1a1a', padding: '60px 0 80px' }}>
        <div className="content-wrapper-lg" style={{ margin: '0px', maxWidth: '100%', width: '100%', padding: '0 30px' }}>
          <div className="webinar-detail-layout" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 400px',
            gap: '80px',
            alignItems: 'flex-start'
          }}>

            <div className="webinar-detail-left" style={{ maxWidth: '950px' }}>

              {/* Description Section */}
              <div style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '40px', overflowWrap: 'break-word', wordBreak: 'normal', hyphens: 'none' }} dangerouslySetInnerHTML={{ __html: webinar.fullDescription }} />

              {/* Learning Points Section */}
              {webinar.learnPoints?.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px', fontWeight: '600' }}>In this session, you&apos;ll learn:</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255, 255, 255, 0.8)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {webinar.learnPoints.map((pt, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#43bd94" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12" /></svg>
                        <span style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Who Should Attend Section */}
              {webinar.attendees?.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px', fontWeight: '600' }}>Who Should Attend:</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                    {webinar.attendees.map((role, i) => (
                      <div key={i} style={{ background: '#242424', padding: '15px 20px', borderRadius: '8px', borderLeft: '3px solid #43bd94', color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem', fontWeight: '500' }}>
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Presenters Section */}
              {webinar.presenters?.length > 0 && (
                <div style={{ marginTop: '50px' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Presenters</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {webinar.presenters.map((pres, idx) => (
                      <div key={idx} style={{ background: '#242424', borderRadius: '12px', padding: '25px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#363636', flexShrink: 0, overflow: 'hidden', border: '2px solid #43bd94' }}>
                          {pres.image ? (
                            <img src={pres.image.startsWith('/uploads') ? `${API_URL}${pres.image}` : pres.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                          )}
                        </div>
                        <div>
                          <h4 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '4px', fontWeight: '600' }}>{pres.name}</h4>
                          <p style={{ color: '#43bd94', fontSize: '0.9rem', fontWeight: '500' }}>{pres.title}</p>
                          <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem' }}>{pres.company}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="webinar-info-cards" style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                <div style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Access Type</span>
                  <span style={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}>{webinar.accessType || 'Upcoming'}</span>
                </div>
                <div style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Format</span>
                  <span style={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}>{webinar.format || 'Technical Presentation'}</span>
                </div>
                <div style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Host</span>
                  <span style={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}>{webinar.host || 'Tridiagonal Solutions'}</span>
                </div>
              </div>
            </div>

            <div className="webinar-detail-right" style={{ position: 'sticky', top: 'calc(var(--nav-height) + 40px)' }}>
              <WebinarRegistrationForm webinarId={dbWebinar?._id || webinar.slug} webinarTitle={webinar.title} formSlug={webinar.formSlug} preloadedFormConfig={formConfig} />
            </div>

          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 1100px) {
          .webinar-detail-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
          .webinar-detail-right { position: static !important; width: 100% !important; order: -1; }
        }
      `}} />
    </main>
  );
}
