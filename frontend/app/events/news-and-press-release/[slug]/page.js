import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventBySlug } from '../../data';

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const item = getEventBySlug(slug);
  if (!item) return { title: 'Not Found' };
  return { title: `${item.title} | News & Updates | Tridiagonal Solutions` };
};

export default async function NewsDetail({ params }) {
  const { slug } = await params;
  const item = getEventBySlug(slug);
  
  if (!item) {
    notFound();
  }

  const descriptionParagraphs = item.fullDescription 
    ? item.fullDescription 
    : item.description.split('\n').filter(p => p.trim() !== '');

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* ─────────────── HERO ─────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)',
          padding: '80px 0 60px',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(0, 115, 230, 0.1) 0%, transparent 60%)' }} />
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            href="/events/news-and-press-release"
            style={{
              color: 'var(--color-blue)',
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
            BACK TO ALL NEWS
          </Link>
          
          <div style={{ marginBottom: '16px' }}>
            <span className="webinar-hero-pill" style={{ 
              background: 'rgba(0, 115, 230, 0.1)', 
              color: 'var(--color-blue)'
            }}>
              {item.type}
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
            {item.title}
          </h1>

          <div className="webinar-hero-meta">
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              {item.date}
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────── CONTENT ─────────────── */}
      <section style={{ background: '#1a1a1a', padding: '60px 0 80px', minHeight: '50vh' }}>
        <div className="content-wrapper-lg">
          <div className="webinar-detail-layout">

            {/* LEFT: Description & Details (Matches Webinar width) */}
            <div className="webinar-detail-left">
              <div className="webinar-section-block">
                <div style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.8', fontSize: '1.15rem' }}>
                  {descriptionParagraphs.map((para, i) => (
                     <p key={i} style={{ marginBottom: '24px' }}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Social Share / Contact CTA */}
              <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0 0 8px 0', fontSize: '14px' }}>Have questions about this announcement?</p>
                  <Link href="/contact-us" style={{ color: 'var(--color-blue)', textDecoration: 'underline', fontWeight: '600' }}>Contact our Press Team</Link>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button suppressHydrationWarning style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#242424', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </button>
                  <button suppressHydrationWarning style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#242424', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                  </button>
                  <button suppressHydrationWarning style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#242424', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT: Empty column so layout remains exactly identical to webinar page */}
            <div className="webinar-detail-right">
                
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────── SCOPED STYLES ─────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .webinar-hero-pill {
          display: inline-block;
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
        .webinar-detail-right { flex: 0.75; min-width: 0; }
        @media (max-width: 900px) {
          .webinar-detail-layout { flex-direction: column; }
          .webinar-detail-right { display: none; }
        }

        .webinar-section-block { margin-bottom: 50px; }
      `}} />
    </main>
  );
}
