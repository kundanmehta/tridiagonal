import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReadingProgressBar from '@/components/ReadingProgressBar';

// Mock Blog Database
const mockBlogs = [
  {
    title: 'Fluid Structure Interaction Analysis (FSI): Maximizing Efficiency',
    category: 'Engineering',
    excerpt: 'In the fast-paced industrial landscape, the challenges faced by sectors such as oil and gas, crude refining...',
    img: '/hubfs/CFD FEA Coupled-1.png',
    slug: 'fsi-efficiency',
    date: 'Oct 12, 2023',
    content: [
      "In the fast-paced industrial landscape, the challenges faced by sectors such as oil and gas, crude refining, and power generation are complex and multifaceted.",
      "Engineers must ensure maximum efficiency while strictly adhering to rigorous safety standards. One of the most effective methodologies for addressing these challenges is Fluid Structure Interaction (FSI) analysis.",
      "FSI occurs when a fluid flow interacts with a solid structure, causing deformation or stress. This phenomenon is critical in designing components like valves, pipes, and offshore platforms. By coupling Computational Fluid Dynamics (CFD) with Finite Element Analysis (FEA), we can accurately predict how these structures will behave under real-world operating conditions.",
      "Our recent projects demonstrate that applying FSI early in the design phase reduces prototype iterations by up to 40% and significantly mitigates the risk of catastrophic failures in the field."
    ]
  },
  {
    title: 'Advanced CFD Modeling For Reactor Safety',
    category: 'Modeling',
    excerpt: 'Discover how computational modeling is preventing catastrophic failures and streamlining the maintenance of critical systems...',
    img: '/hubfs/Blog CFD DEM.png',
    slug: 'cfd-reactor-safety',
    date: 'Nov 05, 2023',
    content: [
      "Reactor safety is a paramount concern in chemical and nuclear engineering. Unpredictable thermal runaway or flow maldistribution can lead to severe consequences.",
      "Advanced Computational Fluid Dynamics (CFD) allows engineers to simulate the complex hydrodynamics and thermodynamics inside these vessels with profound accuracy.",
      "By establishing a digital twin of the reactor, operators can test extreme scenarios virtually. The simulations provide a granular view of temperature gradients, pressure drops, and mixing efficiencies that are impossible to measure with physical sensors alone.",
      "Ultimately, predictive modeling not only guarantees safety compliance but also extends the operational lifespan of expensive capital equipment."
    ]
  },
  {
    title: 'Enhancing Asphaltene Testing Methodologies',
    category: 'Technology',
    excerpt: 'A deep dive into scalable strategies to enhance extraction rates while managing long-term flow assurance concerns...',
    img: '/hubfs/Asphaltene Blog.png',
    slug: 'asphaltene-testing',
    date: 'Jan 22, 2024',
    content: [
      "Asphaltenes, often referred to as the 'cholesterol of petroleum', are known for precipitating out of crude oil and causing severe blockages in pipelines and processing equipment.",
      "Managing Asphaltene deposition is a massive challenge in flow assurance. Traditional testing methodologies have been slow and occasionally unreliable under dynamic high-pressure environments.",
      "Our team has recently developed a hybridized testing methodology combining high-pressure experimental loops with predictive thermodynamic software. This allows for rapid screening of chemical inhibitors.",
      "The result is a highly scalable strategy capable of enhancing oil extraction rates while keeping capital expenditures well within budget."
    ]
  },
  {
    title: 'Optimizing Heat Exchangers with Agentic AI',
    category: 'Technology',
    excerpt: 'How AI-driven tools can drastically reduce trial-and-error in thermal analysis and heat exchanger designs.',
    img: '/hubfs/image%20(10).png',
    slug: 'heat-exchanger-ai',
    date: 'Feb 15, 2024',
    content: [
      "The design of complex heat exchangers has traditionally required a staggering amount of trial-and-error, iterating over tube pitch, baffle cuts, and shell diameters.",
      "By integrating Agentic AI frameworks with established thermal analysis solvers, we are witnessing a paradigm shift. The AI agent acts autonomously to rapidly evaluate millions of configuration permutations.",
      "This approach not only optimizes heat transfer efficiency but also flags potential vibration issues before they manifest. The AI utilizes historical design data to bypass configurations known to induce early fatigue.",
      "This marks a new era in generative engineering design."
    ]
  },
  {
    title: 'DEM for Particle Mixing in Pharmaceuticals',
    category: 'Modeling',
    excerpt: 'Understanding mixing efficiency, powder behavior, and coating mechanics using Discrete Element Method simulations.',
    img: '/hubfs/image%20(12).png',
    slug: 'dem-pharma',
    date: 'Mar 08, 2024',
    content: [
      "In pharmaceutical manufacturing, the uniformity of a powder blend directly dictates the dosage accuracy of the final tablet. Variations can lead to failed batches and enormous financial losses.",
      "Discrete Element Method (DEM) has emerged as the premier tool for understanding granular mechanics. It tracks the motion of individual particles, allowing engineers to visualize dead zones and segregation within blending equipment.",
      "When coupled with fluid flow in fluidized bed coaters, DEM provides an unparalleled look into particle growth dynamics.",
      "Our validation studies show that DEM predictions closely trace empirical data, offering a reliable path to scale-up from lab to commercial production."
    ]
  },
  {
    title: 'Flow Assurance in Subsea Pipelines',
    category: 'Engineering',
    excerpt: 'Addressing flow assurance challenges like wax deposition and hydrates formation using sophisticated simulation software.',
    img: '/hubfs/Flow Assurance.jpg',
    slug: 'flow-assurance-subsea',
    date: 'Apr 02, 2024',
    content: [
      "Subsea environments present some of the harshest conditions for multiphase pipeline transport. Cold ambient temperatures rapidly cool production fluids, leading to wax deposition and catastrophic hydrate blockages.",
      "Flow assurance engineers rely heavily on transient multiphase flow simulators to establish strict operating envelopes for startup, shutdown, and steady-state operations.",
      "In our recent analysis of a deepwater tie-back system, we utilized transient modeling to precisely optimize the insulation thickness and chemical injection rates.",
      "The optimized design reduced necessary inhibitor volumes by 15%, slashing operational OPEX without sacrificing system reliability."
    ]
  }
];

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://silver-wasp-603471.hostingersite.com';

async function getBlog(slug) {
  try {
    const res = await fetch(`${API_URL}/api/resources/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) return null;
    const json = await res.json();
    return json.data ? json.data : null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug) || mockBlogs.find(b => b.slug === slug);
  if (!blog) return { title: 'Blog Not Found' };
  return { title: `${blog.title} | Blogs | Tridiagonal Solutions` };
}

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

  let relatedBlogs = [];
  try {
    const relRes = await fetch(`${API_URL}/api/resources?type=Blog&limit=5`, { next: { revalidate: 60 } });
    if (relRes.ok) {
      const relJson = await relRes.json();
      if (relJson.data) relatedBlogs = relJson.data.filter(b => b.slug !== slug).slice(0, 4);
    }
  } catch (err) { }
  if (relatedBlogs.length === 0) relatedBlogs = mockBlogs.filter(b => b.slug !== slug).slice(0, 4);

  const shareUrl = `https://tridiagonal.com/resources/blogs/${slug}`;
  const shareTitle = encodeURIComponent(blog.title);

  return (
    <main style={{ paddingTop: 'var(--nav-height)', background: '#111' }}>
      <ReadingProgressBar />

      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #111 0%, #1a1a1a 100%)', padding: '100px 0 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(0, 174, 239, 0.1) 0%, transparent 70%)' }} />

        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1 }}>
          {/* Breadcrumbs */}
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
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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

      {/* Main Content Body */}
      <section style={{ background: '#111', padding: '80px 0 120px' }}>
        <div className="content-wrapper-lg">
          <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Left Content Area */}
            <div style={{ flex: '1 1 65%', minWidth: '320px', maxWidth: '850px' }}>
              <div className="featured-image-container">
                <Image
                  src={blog.coverImage || '/hubfs/CFD FEA Coupled-1.png'}
                  alt={blog.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>

              <div className="blog-body-text">
                <p className="blog-lead-text">
                  {blog.excerpt}
                </p>
                {Array.isArray(blog.content) ? (
                  blog.content.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : (
                  <div style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</div>
                )}
              </div>

              {/* Enhanced Author / CTA */}
              <div className="cta-footer-card">
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '12px', fontWeight: '700' }}>Accelerate Your Project with Simulation</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                    Our engineering team specializes in high-fidelity CFD and FEA modeling to solve your most complex fluid-structure challenges.
                  </p>
                </div>
                <Link href="/contact-us" className="glow-button">
                  <span className="gradient-text">Consult With Our Experts</span>
                </Link>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <div style={{ flex: '1 1 25%', minWidth: '300px', position: 'sticky', top: '100px' }}>
              <div className="sidebar-card">
                <h3 className="sidebar-title">Related Insights</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  {relatedBlogs.map((related) => (
                    <Link href={`/resources/blogs/${related.slug}`} key={related.slug} className="related-post-item">
                      <div className="related-thumb">
                        <Image src={related.coverImage || '/hubfs/Digital Twin.jpg'} alt={related.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 className="related-title-text">{related.title}</h4>
                        <span className="related-cat-text">{related.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '20px', fontWeight: '600' }}>Share Knowledge</h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="social-share-btn">
                      LinkedIn
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="social-share-btn">
                      Twitter
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="social-share-btn">
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .back-link {
          color: var(--color-teal);
          text-decoration: none;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          transition: all 0.3s ease;
        }
        .back-link:hover {
          gap: 15px;
          opacity: 0.8;
        }
        .category-badge {
          display: inline-block;
          background: rgba(0, 174, 239, 0.1);
          color: #00AEEF;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 25px;
          border: 1px solid rgba(0, 174, 239, 0.2);
        }
        .blog-title {
          color: #fff;
          fontSize: clamp(32px, 5vw, 56px);
          font-weight: 800;
          line-height: 1.1;
          max-width: 950px;
          letter-spacing: -0.02em;
        }
        .featured-image-container {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 50px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        .blog-body-text {
          color: rgba(255,255,255,0.7);
          line-height: 1.85;
          font-size: 1.15rem;
          letter-spacing: -0.01em;
        }
        .blog-body-text p {
          margin-bottom: 30px;
        }
        .blog-lead-text {
          font-size: 1.45rem;
          font-weight: 500;
          color: #fff;
          line-height: 1.6;
          margin-bottom: 40px !important;
          border-left: 4px solid var(--color-teal);
          padding-left: 30px;
        }
        .cta-footer-card {
          margin-top: 80px;
          padding: 40px;
          background: linear-gradient(145deg, #1e1e1e 0%, #151515 100%);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          gap: 30px;
          flex-wrap: wrap;
          transition: border-color 0.3s;
        }
        .cta-footer-card:hover {
          border-color: rgba(0, 174, 239, 0.3);
        }
        .glow-button {
          background: #00AEEF;
          color: #fff;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          font-size: 15px;
          transition: all 0.3s;
          box-shadow: 0 10px 20px rgba(0, 174, 239, 0.2);
          flex-shrink: 0;
        }
        .glow-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(0, 174, 239, 0.4);
          background: #008fcc;
        }
        .sidebar-card {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(10px);
          padding: 35px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .sidebar-title {
          font-size: 18px;
          color: #fff;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-weight: 700;
        }
        .related-post-item {
          display: flex;
          gap: 15px;
          text-decoration: none;
          transition: transform 0.3s;
        }
        .related-post-item:hover {
          transform: translateX(5px);
        }
        .related-thumb {
          width: 90px;
          height: 65px;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          background: #000;
        }
        .related-title-text {
          font-size: 14px;
          color: #fff;
          line-height: 1.4;
          margin: 0 0 6px 0;
          font-weight: 600;
          transition: color 0.3s;
        }
        .related-post-item:hover .related-title-text {
          color: var(--color-teal);
        }
        .related-cat-text {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .social-share-btn {
          flex: 1;
          background: rgba(255,255,255,0.03);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 10px;
          border-radius: 8px;
          font-size: 11px;
          cursor: pointer;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .social-share-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: var(--color-teal);
          color: var(--color-teal);
        }
      `}</style>
    </main>
  );
}

