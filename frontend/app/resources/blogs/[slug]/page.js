import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = mockBlogs.find((b) => b.slug === slug);
  if (!blog) return { title: 'Blog Not Found' };
  return { title: `${blog.title} | Blogs | Tridiagonal Solutions` };
}

export default async function BlogSinglePage({ params }) {
  const { slug } = await params;
  const blog = mockBlogs.find((b) => b.slug === slug);
  
  if (!blog) {
    notFound();
  }

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero Section */}
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
            href="/resources/blogs"
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
            BACK TO BLOGS
          </Link>
          
          <div style={{ marginBottom: '16px' }}>
            <span style={{ 
              display: 'inline-block',
              background: 'rgba(0, 255, 204, 0.15)', 
              color: 'var(--color-teal)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {blog.category}
            </span>
          </div>

          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: '700',
              marginBottom: '24px',
              lineHeight: '1.2',
              maxWidth: '900px'
            }}
          >
            {blog.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', color: 'rgba(255,255,255,0.65)', fontSize: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              {blog.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              5 Min Read
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              By Tridiagonal Team
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section style={{ background: '#1a1a1a', padding: '60px 0 80px' }}>
        <div className="content-wrapper-lg">
          
          <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            
            {/* Left Content Area */}
            <div style={{ flex: '1 1 65%', minWidth: '320px' }}>
              
              {/* Featured Image */}
              <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px', background: '#000' }}>
                <Image 
                  src={blog.img} 
                  alt={blog.title} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
              </div>

              {/* Text Blocks */}
              <div style={{ color: 'rgba(255,255,255,0.85)', lineHeight: '1.9', fontSize: '1.15rem' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: '500', color: '#fff', marginBottom: '30px' }}>
                  {blog.excerpt}
                </p>
                {blog.content.map((para, i) => (
                  <p key={i} style={{ marginBottom: '25px' }}>{para}</p>
                ))}
              </div>

              {/* Author / CTA Footer Block */}
              <div style={{ marginTop: '60px', padding: '30px', background: '#242424', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                 <div style={{ flex: 1, minWidth: '250px' }}>
                   <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '10px' }}>Discuss your project with us</h3>
                   <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', margin: 0 }}>Discover how Tridiagonal Solutions can empower your engineering workforce with advanced computational modeling.</p>
                 </div>
                 <Link href="/contact-us" className="btn-primary" style={{ flexShrink: 0, textDecoration: 'none' }}>
                   Contact Engineering Team
                 </Link>
              </div>

            </div>

            {/* Right Sticky Sidebar */}
            <div style={{ flex: '1 1 30%', minWidth: '300px', position: 'sticky', top: '100px' }}>
              <div style={{ background: '#242424', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
                  Related Readings
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {mockBlogs.filter(b => b.slug !== blog.slug).slice(0, 3).map((related) => (
                    <Link href={`/resources/blogs/${related.slug}`} key={related.slug} style={{ display: 'flex', gap: '15px', textDecoration: 'none', group: 'true' }}>
                      <div style={{ width: '80px', height: '60px', position: 'relative', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                         <Image src={related.img} alt={related.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '14px', color: '#fff', lineHeight: '1.4', marginBottom: '6px', fontWeight: '600' }}>
                          {related.title.length > 50 ? related.title.substring(0, 50) + '...' : related.title}
                        </h4>
                        <span style={{ fontSize: '12px', color: 'var(--color-teal)' }}>{related.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '15px' }}>Share this post</h3>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {['LinkedIn', 'Twitter', 'Facebook'].map(social => (
                      <button key={social} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>
                        {social}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
