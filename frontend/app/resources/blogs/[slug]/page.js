import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import BlogTableOfContents from '@/components/BlogTableOfContents';
import { API_URL, resolveImageUrl, extractExcerpt } from '@/lib/apiConfig';

const mockBlogs = [
  { title: 'Fluid Structure Interaction Analysis (FSI): Maximizing Efficiency', category: 'Engineering', excerpt: 'In the fast-paced industrial landscape, the challenges faced by sectors such as oil and gas, crude refining...', coverImage: '/hubfs/CFD FEA Coupled-1.png', slug: 'fsi-efficiency', date: '2023-10-12', content: ["In the fast-paced industrial landscape, the challenges faced by sectors such as oil and gas, crude refining, and power generation are complex and multifaceted.", "Engineers must ensure maximum efficiency while strictly adhering to rigorous safety standards. One of the most effective methodologies for addressing these challenges is Fluid Structure Interaction (FSI) analysis.", "FSI occurs when a fluid flow interacts with a solid structure, causing deformation or stress. This phenomenon is critical in designing components like valves, pipes, and offshore platforms. By coupling Computational Fluid Dynamics (CFD) with Finite Element Analysis (FEA), we can accurately predict how these structures will behave under real-world operating conditions.", "Our recent projects demonstrate that applying FSI early in the design phase reduces prototype iterations by up to 40% and significantly mitigates the risk of catastrophic failures in the field."] },
];

const cleanHTML = (html) => {
  if (!html) return '';
  if (typeof html !== 'string') return html;
  return html.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
};

async function getBlog(slug) {
  try {
    const res = await fetch(`${API_URL}/api/resources/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ? json.data : null;
  } catch (error) {
    return null;
  }
}

import { constructMetadata } from '@/lib/seoUtils';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug) || mockBlogs.find(b => b.slug === slug);
  if (!blog) return constructMetadata({ metaTitle: 'Blog Not Found' });
  
  return constructMetadata(blog.seo, {
    title: `${blog.title} | Blogs | Tridiagonal Solutions`,
    description: blog.excerpt || 'Read the latest technical insights and success stories from Tridiagonal Solutions.',
    image: blog.coverImage
  });
}

// Helper to slugify heading text for ID
const slugify = (text) => {
  if (typeof text !== 'string') return '';
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
};

export default async function BlogSinglePage({ params }) {
  const { slug } = await params;
  let blog = null;

  try {
    const res = await fetch(`${API_URL}/api/resources/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      if (json.data) blog = json.data;
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  if (!blog) blog = mockBlogs.find(b => b.slug === slug);
  if (!blog) notFound();

  // Fetch related blogs
  let relatedBlogs = [];
  try {
    const relRes = await fetch(`${API_URL}/api/resources?type=Blog&limit=50`, { next: { revalidate: 60 } });
    if (relRes.ok) {
      const relJson = await relRes.json();
      if (relJson.data) {
        let all = relJson.data.filter(b => b.slug !== slug);
        all.sort((a, b) => {
          let scoreA = 0, scoreB = 0;
          if (a.category === blog.category) scoreA += 2;
          if (a.industry === blog.industry) scoreA += 2;
          if (a.service === blog.service) scoreA += 1;
          
          if (b.category === blog.category) scoreB += 2;
          if (b.industry === blog.industry) scoreB += 2;
          if (b.service === blog.service) scoreB += 1;
          
          return scoreB - scoreA;
        });
        relatedBlogs = all.slice(0, 4);
      }
    }
  } catch (err) {}

  const shareUrl = `https://tridiagonal.com/resources/blogs/${slug}`;
  const shareTitle = encodeURIComponent(blog.title);

  // Extract headings for Table of Contents (Supporting blockType and type fallback)
  const tocHeadings = (blog.contentBlocks || [])
    .filter(block => (block.blockType === 'heading' || block.type === 'heading') && block.text)
    .map(block => ({ text: block.text, id: slugify(block.text) }));

  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#111' }}>
      <ReadingProgressBar />

      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #111 0%, #1a1a1a 100%)', padding: '100px 0 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(0, 174, 239, 0.1) 0%, transparent 70%)' }} />

        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1 }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '30px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/resources/blogs" style={{ color: 'inherit', textDecoration: 'none' }}>Resources</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-teal)' }}>Blog</span>
          </nav>

          <Link href="/resources/blogs" className="back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            BACK TO BLOGS
          </Link>

          <div style={{ marginTop: '40px' }}>
            <span className="category-badge">{blog.category}</span>
            <h1 className="blog-title gradient-text">{blog.title}</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', color: 'rgba(255,255,255,0.5)', fontSize: '15px', marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                {blog.date ? new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown Date'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                ~6 Min Read
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                By {blog.author || 'Tridiagonal Team'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body with 2-Column Layout */}
      <section style={{ background: '#111', padding: '80px 0 100px' }}>
        <div className="content-wrapper-lg">
          <div className="blog-layout-grid">
            
            {/* Left Column: Content */}
            <div className="blog-main-column">

              <div className="blog-body-text">
                
                {/* Structured Content Blocks */}
                {Array.isArray(blog.contentBlocks) && blog.contentBlocks.length > 0 ? (
                  <div className="blocks-container">
                    {blog.contentBlocks.map((block, i) => {
                      const bType = block.blockType || block.type;
                      if (bType === 'heading') {
                        return <h2 key={i} id={slugify(block.text)} className="heading-block">{block.text}</h2>;
                      }
                      if (bType === 'text') {
                        return <div key={i} className="rich-text-content" dangerouslySetInnerHTML={{ __html: cleanHTML(typeof block.text === 'string' ? block.text : '') }} />;
                      }
                      if (bType === 'image') {
                        const img = (
                          <div className="blog-image-block">
                            <img src={resolveImageUrl(block.image)} alt={block.subValue || blog.title || 'Image'} style={{ width: '100%', borderRadius: '16px' }} />
                            {block.subValue && <p className="image-caption">{block.subValue}</p>}
                          </div>
                        );
                        return block.link ? <a key={i} href={block.link} target="_blank" rel="noopener noreferrer">{img}</a> : <div key={i}>{img}</div>;
                      }
                      return null;
                    })}
                  </div>
                ) : (
                  /* Fallback to legacy rich text content */
                  <div dangerouslySetInnerHTML={{ __html: cleanHTML(typeof blog.content === 'string' ? blog.content : '') }} className="rich-text-content" />
                )}
              </div>

              {/* Technical Contributors */}
              {Array.isArray(blog.contributors) && blog.contributors.length > 0 && (
                <div style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '30px' }}>Technical Contributors</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {blog.contributors.map((contributor, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '16px' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,174,239,0.08)', border: '1px solid rgba(0,174,239,0.2)', flexShrink: 0, overflow: 'hidden' }}>
                          {contributor.image ? (
                            <img src={resolveImageUrl(contributor.image)} alt={contributor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(0,174,239,0.5)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <p style={{ color: '#fff', fontWeight: '700', fontSize: '15px', margin: 0 }}>{contributor.name}</p>
                          <p style={{ color: 'var(--color-teal)', fontSize: '12px', margin: '2px 0', fontWeight: '600' }}>{contributor.role}</p>
                          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>{contributor.organization}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Knowledge */}
              <div className="share-section">
                <h3 style={{ fontSize: '15px', color: '#fff', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Share Knowledge</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="social-share-btn">LinkedIn</a>
                  <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="social-share-btn">Twitter</a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="social-share-btn">Facebook</a>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Table of Contents */}
            <aside className="blog-sidebar">
              <div className="sidebar-inner">
                <div className="sticky-toc">
                  <BlogTableOfContents headings={tocHeadings} />
                </div>
                
                <div className="sidebar-cta-block">
                  <h5 style={{ color: '#fff', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Need Expert Guidance?</h5>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>Our technical team is ready to help you navigate complex industrial engineering challenges.</p>
                  <Link href="/contact" className="sidebar-cta-btn">Consult an Expert</Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Related Insights Grid */}
      {relatedBlogs.length > 0 && (
        <section style={{ background: '#111', padding: '0 0 100px' }}>
          <div className="content-wrapper-lg">
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '60px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h2 className="gradient-text" style={{ fontSize: '32px', fontWeight: '800', margin: 0 }}>Related Insights</h2>
                <Link href="/resources/blogs" style={{ color: 'var(--color-teal)', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  View All
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '20px' }}>
                {relatedBlogs.map((insight) => (
                  <Link key={insight.slug} href={`/resources/blogs/${insight.slug}`} style={{ textDecoration: 'none' }}>
                    <article className="blog-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#1a1a1a', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)' }}>
                      <div style={{ position: 'relative', width: '100%', height: '350px' }}>
                        <Image src={resolveImageUrl(insight.coverImage) || '/hubfs/CFD FEA Coupled-1.png'} alt={insight.title || 'Insight'} fill style={{ objectFit: 'cover' }} unoptimized={true} />
                      </div>
                      <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '15px', fontWeight: '500' }}>
                          {insight.date ? new Date(insight.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
                        </span>
                        <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: '600', lineHeight: '1.4', marginBottom: '15px' }}>{insight.title}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: '1.6', marginBottom: '25px', flex: 1 }}>{extractExcerpt(insight.content, 130)}</p>
                        <div style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
                          <span className="gradient-text">READ ARTICLE</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#00AEEF' }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
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
        .back-link { color: var(--color-teal); text-decoration: none; font-size: 11px; display: inline-flex; align-items: center; gap: 10px; font-weight: 800; letter-spacing: 2px; transition: all 0.3s ease; }
        .back-link:hover { gap: 15px; opacity: 0.8; }
        .category-badge { display: inline-block; background: rgba(0, 174, 239, 0.1); color: #00AEEF; padding: 6px 16px; border-radius: 30px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 25px; border: 1px solid rgba(0, 174, 239, 0.2); }
        .blog-title { color: #fff; font-size: clamp(32px, 5vw, 52px); font-weight: 800; line-height: 1.1; max-width: 950px; letter-spacing: -0.02em; }
        
        .blog-layout-grid { display: grid; grid-template-columns: 1fr 320px; gap: 80px; align-items: start; }
        .blog-main-column { min-width: 0; }

        .featured-image-container { position: relative; width: 100%; height: 500px; border-radius: 32px; overflow: hidden; margin-bottom: 60px; box-shadow: 0 40px 80px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); }
        
        .blog-body-text { color: rgba(255,255,255,0.8); line-height: 1.9; font-size: 1.15rem; }
        .blog-lead-text { font-size: 1.4rem; font-weight: 500; color: #fff; line-height: 1.6; margin-bottom: 60px; border-left: 4px solid var(--color-teal); padding-left: 40px; }
        
        .heading-block { font-size: 1.6rem; font-weight: 600; color: #45b884; margin: 50px 0 30px; scroll-margin-top: 120px; letter-spacing: -0.02em; line-height: 1.2; }
        .blog-image-block { margin: 50px 0; }
        .image-caption { font-size: 14px; color: rgba(255,255,255,0.5); text-align: center; margin-top: 15px; font-style: italic; }
        
        .blog-sidebar { position: sticky; top: 120px; height: fit-content; }
        .sidebar-inner { display: flex; flex-direction: column; gap: 20px; }
        .sticky-toc { padding: 30px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; backdrop-filter: blur(20px); }
        .sidebar-cta-block { padding: 30px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; backdrop-filter: blur(20px); }
        
        .sidebar-cta-btn { display: block; width: 100%; text-align: center; background: var(--gradient-brand); color: #fff; padding: 16px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; transition: all 0.3s; box-shadow: 0 10px 20px rgba(0, 174, 239, 0.2); }
        .sidebar-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0, 174, 239, 0.4); opacity: 0.9; }
        
        .share-section { margin-top: 60px; padding: 40px 0; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .social-share-btn { padding: 10px 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; color: #fff; text-decoration: none; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s; }
        .social-share-btn:hover { background: var(--color-teal); border-color: var(--color-teal); color: #fff; }
        
        .cs-card:hover { transform: translateY(-10px); border-color: rgba(0, 174, 239, 0.3) !important; }

        @media (max-width: 1100px) {
          .blog-layout-grid { grid-template-columns: 1fr; gap: 60px; }
          .blog-sidebar { display: none; }
          .featured-image-container { height: 400px; }
        }
      `}</style>
    </main>
  );
}
