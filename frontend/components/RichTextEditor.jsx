'use client';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent "document is not defined" SSR errors in Next.js
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div style={{padding: '20px', color: '#94a3b8', fontStyle: 'italic'}}>Loading Editor...</div> 
});

export default function RichTextEditor({ value, onChange }) {
  const [mode, setMode] = useState('visual'); // 'visual' | 'code'

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  }), []);

  // Helper to clean up excessive &nbsp; and common clutter
  const cleanHTML = (html) => {
    if (!html) return '';
    // Replace non-breaking spaces with normal spaces
    let cleaned = html.replace(/&nbsp;/g, ' ');
    // Remove zero-width spaces and other invisible characters often introduced by editors
    cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF]/g, '');
    // Clean up multiple spaces
    cleaned = cleaned.replace(/ +/g, ' ');
    return cleaned;
  };

  const prettifyHTML = () => {
    if (!value) return;
    // Clean first, then format
    let formatted = cleanHTML(value)
      .replace(/></g, '>\n<') // Add newline between tags
      .replace(/(<p[^>]*>)/g, '\n$1') // Newline before paragraphs
      .replace(/(<\/p>)/g, '$1\n') // Newline after paragraphs
      .replace(/(<ul[^>]*>)/g, '\n$1') // Newline before lists
      .replace(/(<\/ul>)/g, '$1\n') // Newline after lists
      .replace(/(<li[^>]*>)/g, '  $1') // Indent list items
      .replace(/\n\s*\n/g, '\n'); // Remove excessive newlines
    onChange(formatted.trim());
  };

  const handleModeChange = (newMode) => {
    // Clean both ways to ensure consistency
    const cleanedValue = cleanHTML(value);
    if (cleanedValue !== value) {
      onChange(cleanedValue);
    }
    setMode(newMode);
  };

  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      
      {/* Mode Toggle Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#f8fafc', 
        borderBottom: '1px solid #cbd5e1', 
        padding: '8px 12px' 
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            type="button" 
            onClick={() => handleModeChange('visual')} 
            style={{ 
              padding: '8px 16px', 
              background: mode === 'visual' ? '#00AEEF' : 'transparent', 
              color: mode === 'visual' ? '#fff' : '#64748b', 
              border: mode === 'visual' ? 'none' : '1px solid #e2e8f0', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontWeight: 600, 
              fontSize: '13px',
              transition: 'all 0.2s',
              boxShadow: mode === 'visual' ? '0 2px 4px rgba(0, 174, 239, 0.2)' : 'none'
            }}
          >
            Visual Editor
          </button>
          <button 
            type="button" 
            onClick={() => handleModeChange('code')} 
            style={{ 
              padding: '8px 16px', 
              background: mode === 'code' ? '#00AEEF' : 'transparent', 
              color: mode === 'code' ? '#fff' : '#64748b', 
              border: mode === 'code' ? 'none' : '1px solid #e2e8f0', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontWeight: 600, 
              fontSize: '13px',
              transition: 'all 0.2s',
              boxShadow: mode === 'code' ? '0 2px 4px rgba(0, 174, 239, 0.2)' : 'none'
            }}
          >
            Raw HTML (Code)
          </button>
        </div>

        {mode === 'code' && (
          <button
            type="button"
            onClick={prettifyHTML}
            style={{
              padding: '6px 12px',
              background: '#fff',
              color: '#00AEEF',
              border: '1px solid #00AEEF',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Prettify Code
          </button>
        )}
      </div>

      <div style={{ position: 'relative' }}>
        {mode === 'visual' ? (
          <ReactQuill 
            theme="snow" 
            value={value || ''} 
            onChange={onChange} 
            modules={modules}
            style={{ height: '350px', display: 'flex', flexDirection: 'column' }}
          />
        ) : (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => onChange(cleanHTML(value))}
            style={{ 
              width: '100%', 
              height: '350px', 
              padding: '20px', 
              border: 'none', 
              outline: 'none', 
              fontFamily: '"Fira Code", "Cascadia Code", "Source Code Pro", monospace', 
              fontSize: '14px', 
              lineHeight: '1.6',
              color: '#334155', 
              resize: 'vertical',
              boxSizing: 'border-box',
              background: '#fdfdfd'
            }}
            placeholder="<p>Enter HTML here...</p>"
          />
        )}
      </div>

      <style>{`
        .ql-container {
          flex: 1;
          font-family: 'Inter', sans-serif !important;
          font-size: 15px !important;
          height: auto;
          overflow-y: auto;
          border: none !important;
        }
        .ql-editor {
          min-height: 300px;
          padding: 20px !important;
        }
        .ql-toolbar {
          border: none !important;
          border-bottom: 1px dashed #cbd5e1 !important;
          background: #f8fafc;
          padding: 10px !important;
        }
        /* Custom scrollbar for textarea */
        textarea::-webkit-scrollbar {
          width: 8px;
        }
        textarea::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        textarea::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
