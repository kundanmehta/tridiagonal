'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogTableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    // Small delay to ensure DOM headings are rendered
    const timer = setTimeout(() => {
      headings.forEach(h => {
        const el = document.getElementById(h.id);
        if (el) observer.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) {
    return (
      <div style={{ padding: '0 0 20px', color: 'rgba(255,255,255,0.3)', fontSize: '13px', fontStyle: 'italic' }}>
        No sub-sections available for this article.
      </div>
    );
  }

  return (
    <>
      <h4 className="toc-heading">Table of Contents</h4>
      <nav className="toc-nav-redesigned">
        {headings.map((h, i) => (
          <a
            key={i}
            href={`#${h.id}`}
            className={`toc-card ${activeId === h.id ? 'toc-card--active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(h.id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveId(h.id);
              }
            }}
          >
            <span className="toc-card-indicator" />
            <span className="toc-card-text">{h.text}</span>
          </a>
        ))}
      </nav>

      <style>{`
        .toc-heading {
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .toc-heading::before {
          content: '';
          display: inline-block;
          width: 18px;
          height: 3px;
          background: var(--gradient-brand);
          border-radius: 2px;
        }

        .toc-nav-redesigned {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .toc-card {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 0;
          padding: 14px 16px;
          border-radius: 12px;
          text-decoration: none;
          color: rgba(255,255,255,0.55);
          font-size: 13.5px;
          font-weight: 500;
          line-height: 1.45;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          border: 1px solid transparent;
          overflow: hidden;
        }

        .toc-card-indicator {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          border-radius: 0 3px 3px 0;
          background: transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .toc-card:hover {
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.85);
          border-color: rgba(255,255,255,0.06);
        }

        .toc-card--active {
          background: rgba(0, 174, 239, 0.08);
          color: var(--color-teal);
          font-weight: 600;
          border-color: rgba(0, 174, 239, 0.15);
        }

        .toc-card--active .toc-card-indicator {
          background: var(--gradient-brand);
          box-shadow: 0 0 12px rgba(0, 174, 239, 0.4);
        }

        .toc-card--active:hover {
          background: rgba(0, 174, 239, 0.12);
          border-color: rgba(0, 174, 239, 0.2);
        }

        .toc-card-text {
          flex: 1;
        }
      `}</style>
    </>
  );
}
