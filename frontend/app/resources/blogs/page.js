'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const mockBlogs = [
  {
    title: 'Fluid Structure Interaction Analysis (FSI): Maximizing Efficiency',
    category: 'Engineering',
    excerpt: 'In the fast-paced industrial landscape, the challenges faced by sectors such as oil and gas, crude refining...',
    img: '/hubfs/CFD FEA Coupled-1.png',
    slug: 'fsi-efficiency',
    date: 'Oct 12, 2023'
  },
  {
    title: 'Advanced CFD Modeling For Reactor Safety',
    category: 'Modeling',
    excerpt: 'Discover how computational modeling is preventing catastrophic failures and streamlining the maintenance of critical systems...',
    img: '/hubfs/Blog CFD DEM.png',
    slug: 'cfd-reactor-safety',
    date: 'Nov 05, 2023'
  },
  {
    title: 'Enhancing Asphaltene Testing Methodologies',
    category: 'Technology',
    excerpt: 'A deep dive into scalable strategies to enhance extraction rates while managing long-term flow assurance concerns...',
    img: '/hubfs/Asphaltene Blog.png',
    slug: 'asphaltene-testing',
    date: 'Jan 22, 2024'
  },
  {
    title: 'Optimizing Heat Exchangers with Agentic AI',
    category: 'Technology',
    excerpt: 'How AI-driven tools can drastically reduce trial-and-error in thermal analysis and heat exchanger designs.',
    img: '/hubfs/image%20(10).png',
    slug: 'heat-exchanger-ai',
    date: 'Feb 15, 2024'
  },
  {
    title: 'DEM for Particle Mixing in Pharmaceuticals',
    category: 'Modeling',
    excerpt: 'Understanding mixing efficiency, powder behavior, and coating mechanics using Discrete Element Method simulations.',
    img: '/hubfs/image%20(12).png',
    slug: 'dem-pharma',
    date: 'Mar 08, 2024'
  },
  {
    title: 'Flow Assurance in Subsea Pipelines',
    category: 'Engineering',
    excerpt: 'Addressing flow assurance challenges like wax deposition and hydrates formation using sophisticated simulation software.',
    img: '/hubfs/Flow Assurance.jpg',
    slug: 'flow-assurance-subsea',
    date: 'Apr 02, 2024'
  }
];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Engineering', 'Modeling', 'Technology'];

  // Filter based on search query AND active category
  const filteredBlogs = mockBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1a1a1a 0%, #242424 100%)', minHeight: 'auto', padding: '100px 0 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top left, rgba(71, 188, 135, 0.15) 0%, transparent 60%)' }}></div>
        <div className="content-wrapper-lg" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title fade-in-up" style={{ color: '#fff', fontWeight: '700', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px' }}>
            Latest <span className="gradient-text">Blogs</span>
          </h1>
          <p className="hero-desc fade-in-up delay-200" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            Explore industry insights, technical deep dives, and thought leadership from the Tridiagonal team.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#1a1a1a', minHeight: '600px' }}>
        <div className="content-wrapper-lg">
          
          {/* Header, Filter & Search Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>
              <div className="dvr-line" style={{ margin: '0 auto 16px' }}></div>
              <h2 className="section-title" style={{ color: 'var(--color-teal)', margin: 0, fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: 1 }}>
                Explore Articles
              </h2>
            </div>
            
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              
              {/* Category Filters */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{ 
                      background: activeCategory === cat ? 'var(--color-teal)' : '#242424', 
                      color: activeCategory === cat ? '#000' : '#fff', 
                      border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.1)', 
                      padding: '8px 20px', 
                      borderRadius: '30px', 
                      fontWeight: '600', 
                      cursor: 'pointer', 
                      transition: 'all 0.2s',
                      fontSize: '14px'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                <input 
                  suppressHydrationWarning
                  type="text" 
                  placeholder="Search blogs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 24px 14px 44px',
                    borderRadius: '30px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(0,0,0,0.3)',
                    color: '#fff',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-teal)';
                    e.target.style.boxShadow = '0 0 15px rgba(0, 255, 204, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Blogs Grid List */}
          {filteredBlogs.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', 
              gap: '30px' 
            }}>
              {filteredBlogs.map((blog, i) => (
                <Link key={i} href={`/resources/blogs/${blog.slug}`} style={{ textDecoration: 'none' }}>
                  <article style={{ 
                    background: '#242424', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 204, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  }}
                  >
                    {/* Featured Image */}
                    <div style={{ position: 'relative', width: '100%', height: '220px', background: '#111' }}>
                      <Image 
                        src={blog.img} 
                        alt={blog.title} 
                        fill 
                        style={{ objectFit: 'cover', opacity: 0.9 }} 
                      />
                      <div style={{ 
                        position: 'absolute', 
                        top: '16px', 
                        left: '16px', 
                        background: 'rgba(0, 0, 0, 0.65)', 
                        backdropFilter: 'blur(4px)',
                        color: 'var(--color-teal)', 
                        padding: '6px 14px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '700', 
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {blog.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '24px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', display: 'block', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {blog.date}
                      </span>
                      
                      <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: '700', lineHeight: 1.4, marginBottom: '12px' }}>
                        {blog.title}
                      </h3>
                      
                      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px 0', flex: '1' }}>
                        {blog.excerpt.length > 120 ? blog.excerpt.substring(0, 120) + '...' : blog.excerpt}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-teal)', fontSize: '15px', fontWeight: '700', letterSpacing: '0.5px', marginTop: 'auto' }}>
                        READ MORE 
                        <svg style={{ marginLeft: '8px' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
              <svg style={{ color: 'rgba(255,255,255,0.2)', marginBottom: '16px', display: 'inline-block' }} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <h3 style={{ color: '#fff', fontSize: '20px', margin: '0 0 8px 0' }}>No blogs found</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>Try adjusting your search criteria or category filter</p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
