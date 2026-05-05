import { API_URL } from '@/lib/apiConfig';
import { constructMetadata } from '@/lib/seoUtils';

async function getPrivacyPolicyData() {
  try {
    const res = await fetch(`${API_URL}/api/privacy-policy`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      return json.data || null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching Privacy Policy data:', error);
    return null;
  }
}

export async function generateMetadata() {
  const data = await getPrivacyPolicyData();
  return constructMetadata(data?.seo, {
    title: 'Privacy Policy | Tridiagonal Solutions',
    description: 'We are committed to protecting your privacy and ensuring your data is handled securely.'
  });
}

export default async function PrivacyPolicy() {
  const data = await getPrivacyPolicyData();

  if (!data) {
    return (
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <section style={{ padding: '80px 0', textAlign: 'center', background: '#1a1a1a', minHeight: '100vh' }}>
          <h1 style={{color: '#fff'}}>Privacy Policy Not Found</h1>
        </section>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* HERO SECTION */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)', minHeight: 'auto', padding: '80px 0 60px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '15px' }}>
            {data.hero?.titleLine1} <span className="gradient-text">{data.hero?.titleLine2}</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            {data.hero?.description}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ background: '#1a1a1a', padding: '60px 0 80px' }}>
        <div className="content-wrapper-lg" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px', lineHeight: '1.8' }}>
          
          {data.contentSections && data.contentSections.map((section, index) => (
            <div key={index} style={{ marginBottom: index === 0 ? '0' : '20px' }}>
              {section.title !== 'Introduction' && (
                <h2 style={{ fontSize: '28px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', marginTop: '50px' }}>
                  {section.title}
                </h2>
              )}
              
              <div className="rich-content" dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}

        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .rich-content ul { list-style-type: disc; padding-left: 1.5em; margin: 1em 0; }
        .rich-content ol { list-style-type: decimal; padding-left: 1.5em; margin: 1em 0; }
        .rich-content li { margin-bottom: 0.5em; padding-left: 0.25em; }
        .rich-content p { margin-bottom: 0.75em; }
        .rich-content strong, .rich-content b { color: #fff; font-weight: 700; }
        .rich-content a { color: var(--color-teal, #47BC87); text-decoration: underline; }
      `}} />
    </main>
  );
}
