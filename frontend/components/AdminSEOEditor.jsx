'use client';
import React from 'react';
import { Globe, Search, MessageSquare, Tag, Image as ImageIcon, CheckCircle } from 'lucide-react';

export default function AdminSEOEditor({ data = {}, onChange }) {
  const seo = data || {
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
    ogImage: ''
  };

  const handleFieldChange = (field, value) => {
    onChange({ ...seo, [field]: value });
  };

  return (
    <div className="seo-editor-container">
      <style>{`
        .seo-editor-container {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }
        
        .seo-header {
          padding: 1.5rem;
          background: #f8fafc;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .seo-badge {
          background: #00AEEF;
          color: #fff;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .seo-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
        }

        .seo-body {
          padding: 1.5rem;
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr 1fr;
        }

        .preview-pane {
          grid-column: span 2;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1rem;
        }

        .preview-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .google-preview {
          max-width: 600px;
        }

        .google-url {
          font-size: 14px;
          color: #202124;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .google-title {
          font-size: 20px;
          color: #1a0dab;
          margin-bottom: 4px;
          font-weight: 400;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .google-desc {
          font-size: 14px;
          color: #4d5156;
          line-height: 1.58;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .seo-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .seo-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .seo-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .seo-icon {
          position: absolute;
          left: 1rem;
          color: #94a3b8;
        }

        .seo-input, .seo-textarea {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9rem;
          color: #1e293b;
          background: #fcfdfe;
          transition: all 0.2s;
        }

        .seo-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .seo-input:focus, .seo-textarea:focus {
          outline: none;
          border-color: #00AEEF;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(0, 174, 239, 0.08);
        }

        .char-count {
          font-size: 11px;
          color: #94a3b8;
          text-align: right;
          margin-top: 4px;
        }

        .char-limit-reached {
          color: #ef4444;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .seo-body { grid-template-columns: 1fr; }
          .preview-pane { grid-column: span 1; }
        }
      `}</style>

      <div className="seo-header">
        <div className="seo-badge">
          <Globe size={18} />
        </div>
        <div>
          <h3>Search Engine Optimization (SEO)</h3>
        </div>
      </div>

      <div className="seo-body">
        {/* PREVIEW PANE */}
        <div className="preview-pane">
          <div className="preview-label">
            <Search size={14} />
            Google Search Result Preview
          </div>
          <div className="google-preview">
            <div className="google-url">https://tridiagonal.com › ...</div>
            <div className="google-title">
              {seo.metaTitle || 'Page Title Template | Tridiagonal Solutions'}
            </div>
            <div className="google-desc">
              {seo.metaDescription || 'Please provide a meta description to see how your page will appear in search results. A well-written description improves click-through rates.'}
            </div>
          </div>
        </div>

        {/* FIELDS */}
        <div className="seo-field">
          <label className="seo-label">Meta Title</label>
          <div className="seo-input-wrapper">
            <Tag className="seo-icon" size={16} />
            <input
              type="text"
              className="seo-input"
              placeholder="Enter SEO title (max 60 chars)"
              value={seo.metaTitle || ''}
              onChange={(e) => handleFieldChange('metaTitle', e.target.value)}
            />
          </div>
          <div className={`char-count ${seo.metaTitle?.length > 60 ? 'char-limit-reached' : ''}`}>
            {seo.metaTitle?.length || 0} / 60 characters
          </div>
        </div>

        <div className="seo-field">
          <label className="seo-label">Focus Keyword</label>
          <div className="seo-input-wrapper">
            <Search className="seo-icon" size={16} />
            <input
              type="text"
              className="seo-input"
              placeholder="e.g., Computational Fluid Dynamics"
              value={seo.focusKeyword || ''}
              onChange={(e) => handleFieldChange('focusKeyword', e.target.value)}
            />
          </div>
          <p className="char-count">Target keyword for this page.</p>
        </div>

        <div className="seo-field" style={{ gridColumn: 'span 2' }}>
          <label className="seo-label">Meta Description</label>
          <div className="seo-input-wrapper">
            <MessageSquare className="seo-icon" style={{ top: '1rem' }} size={16} />
            <textarea
              className="seo-textarea"
              placeholder="Enter a compelling meta description (max 160 chars)..."
              value={seo.metaDescription || ''}
              onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
            />
          </div>
          <div className={`char-count ${seo.metaDescription?.length > 160 ? 'char-limit-reached' : ''}`}>
            {seo.metaDescription?.length || 0} / 160 characters
          </div>
        </div>

        <div className="seo-field" style={{ gridColumn: 'span 2' }}>
          <label className="seo-label">OG Image (Social Media Preview)</label>
          <div className="seo-input-wrapper">
            <ImageIcon className="seo-icon" size={16} />
            <input
              type="text"
              className="seo-input"
              placeholder="https://example.com/social-preview.jpg"
              value={seo.ogImage || ''}
              onChange={(e) => handleFieldChange('ogImage', e.target.value)}
            />
          </div>
          <p className="char-count">Full URL for the image shown when sharing on LinkedIn/Twitter.</p>
        </div>
      </div>
    </div>
  );
}
