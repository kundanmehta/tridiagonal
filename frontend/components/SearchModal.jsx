'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Loader2, ArrowRight, FileText, Calendar, Settings, Factory } from 'lucide-react';
import { API_URL } from '@/lib/apiConfig';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 2) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
      
      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType || !contentType.includes("application/json")) {
        console.error('Search failed: Backend returned non-JSON response. Please ensure backend server is restarted.');
        setResults([]);
        return;
      }

      const json = await res.json();
      setResults(json.data || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '80px 20px',
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '700px',
          background: '#1a1a1a',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Search Input Area */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <Search size={24} style={{ color: 'var(--color-teal)' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search resources, events, industries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '20px',
              outline: 'none',
              fontWeight: '500'
            }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '8px' }}>
            <X size={24} />
          </button>
        </div>

        {/* Results Area */}
        <div style={{
          maxHeight: '60vh',
          overflowY: 'auto',
          padding: '12px'
        }}>
          {loading && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              <Loader2 className="animate-spin" style={{ margin: '0 auto 12px' }} />
              <p>Searching through everything...</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {results.map((item, idx) => (
                <Link 
                  key={idx} 
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-teal)'
                  }}>
                    {item.category === 'Resource' && <FileText size={18} />}
                    {item.category === 'Event' && <Calendar size={18} />}
                    {item.category === 'Service' && <Settings size={18} />}
                    {item.category === 'Industry' && <Factory size={18} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#fff', margin: 0, fontSize: '15px', fontWeight: '600' }}>{item.title}</h4>
                    <p style={{ color: '#64748b', margin: '2px 0 0', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.type} • {item.category}</p>
                  </div>
                  <ArrowRight size={16} style={{ color: '#334155' }} />
                </Link>
              ))}
            </div>
          )}

          {!loading && query.length > 2 && results.length === 0 && (
            <div style={{ padding: '60px 40px', textAlign: 'center' }}>
              <p style={{ color: '#64748b', fontSize: '16px' }}>No results found for &quot;<span style={{ color: '#fff' }}>{query}</span>&quot;</p>
              <p style={{ color: '#475569', fontSize: '14px', marginTop: '8px' }}>Try searching for keywords like &quot;CFD&quot;, &quot;Pharma&quot;, or &quot;Webinar&quot;.</p>
            </div>
          )}

          {query.length <= 2 && !loading && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#475569' }}>
              <p>Type at least 3 characters to start searching...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(0,0,0,0.2)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <p style={{ color: '#475569', fontSize: '12px', margin: 0 }}>
            <span style={{ border: '1px solid #334155', padding: '2px 6px', borderRadius: '4px', marginRight: '6px' }}>ESC</span>
            to close
          </p>
          <img src="/images/logo.png" style={{ height: '20px', opacity: 0.3 }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
