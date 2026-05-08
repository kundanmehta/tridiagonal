'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Settings, Plus, Edit2, Trash2, Save, X, ArrowUp, ArrowDown, 
  ChevronDown, ChevronRight, Users, MessageSquare, Monitor, 
  Zap, Cpu, Award, Layout, Eye, ArrowLeft, RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { API_URL, resolveImageUrl } from '@/lib/apiConfig';
import AdminSEOEditor from './AdminSEOEditor';

/* ─── Shared style helpers ─── */
const S = {
  card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' },
  title: { fontSize: '18px', fontWeight: 700, marginBottom: '1.5rem', color: '#1e293b' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
  label: { display: 'block', fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '8px' },
  input: { width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#1e293b', outline: 'none', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#1e293b', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical' },
  btnPrimary: { background: '#00AEEF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' },
  btnSecondary: { background: '#fff', color: '#475569', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' },
  btnDanger: { background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
  fullWidth: { gridColumn: 'span 2' },
};

/* ─── Media Upload Helper (Image/Video) ─── */
function MediaField({ label, value, onChange, token, type = 'image' }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset state
    setError('');
    setUploading(true);
    setProgress(0);

    const fd = new FormData();
    fd.append('file', file);

    // Use XMLHttpRequest for progress tracking on large video files
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}/api/upload-public`);
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable) {
        setProgress(Math.round((ev.loaded / ev.total) * 100));
      }
    };

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const json = JSON.parse(xhr.responseText);
          if (json.url) {
            onChange(json.url);
            setError('');
          } else {
            setError('Upload failed: No URL returned from server.');
          }
        } catch {
          setError('Upload failed: Invalid response from server.');
        }
      } else {
        try {
          const json = JSON.parse(xhr.responseText);
          setError(`Upload failed: ${json.error || xhr.statusText}`);
        } catch {
          setError(`Upload failed: Server returned status ${xhr.status}`);
        }
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      setError('Upload failed: Network error. Is the backend server running?');
    };

    xhr.ontimeout = () => {
      setUploading(false);
      setError('Upload timed out. The file may be too large.');
    };

    xhr.send(fd);

    // Reset file input so same file can be re-selected
    e.target.value = '';
  };

  const isVideo = value && (
    value.toLowerCase().endsWith('.mp4') ||
    value.toLowerCase().endsWith('.webm') ||
    value.toLowerCase().endsWith('.mov')
  );

  return (
    <div>
      <label style={S.label}>{label}</label>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          style={S.input}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder="Paste URL or upload a file"
        />
        <label style={{
          ...S.btnSecondary,
          cursor: uploading ? 'not-allowed' : 'pointer',
          flexShrink: 0,
          opacity: uploading ? 0.6 : 1,
          minWidth: '80px',
          textAlign: 'center'
        }}>
          {uploading ? `${progress}%` : 'Upload'}
          <input
            type="file"
            hidden
            disabled={uploading}
            accept={type === 'video' ? 'video/mp4,video/webm,video/mov,video/*' : 'image/*,video/*'}
            onChange={handleUpload}
          />
        </label>

        {/* Preview */}
        {value && !isVideo && (
          <img
            src={resolveImageUrl(value)}
            style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', border: '1px solid #e2e8f0', flexShrink: 0 }}
            alt=""
          />
        )}
        {value && isVideo && (
          <div style={{ width: 48, height: 48, borderRadius: 8, background: '#f1f5f9', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Monitor size={20} color="#64748b" />
          </div>
        )}
      </div>

      {/* Upload Progress Bar */}
      {uploading && (
        <div style={{ marginTop: 8 }}>
          <div style={{ height: 4, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00AEEF, #47bc87)',
              borderRadius: 4,
              transition: 'width 0.2s ease'
            }} />
          </div>
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
            Uploading... {progress}% — please wait
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p style={{ fontSize: 12, color: '#ef4444', marginTop: 6, background: '#fef2f2', padding: '6px 10px', borderRadius: 6, border: '1px solid #fecaca' }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}

/* ─── Section: Hero ─── */
function HeroTab({ data, onChange, token }) {
  const h = data.hero || {};
  const set = (key, val) => onChange({ ...data, hero: { ...h, [key]: val } });
  return (
    <div style={S.card}>
      <h2 style={S.title}>Hero Section</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={S.grid2}>
          <div><label style={S.label}>Badge Text</label><input style={S.input} value={h.badge || ''} onChange={e => set('badge', e.target.value)} placeholder="CFD | FEA | DEM" /></div>
          <div><label style={S.label}>Title (before gradient)</label><input style={S.input} value={h.title || ''} onChange={e => set('title', e.target.value)} /></div>
          <div><label style={S.label}>Gradient Text (colored part)</label><input style={S.input} value={h.gradientText || ''} onChange={e => set('gradientText', e.target.value)} /></div>
          <div><label style={S.label}>Subtitle / Tagline</label><input style={S.input} value={h.subtitle || ''} onChange={e => set('subtitle', e.target.value)} /></div>
          <div style={S.fullWidth}><label style={S.label}>Hero Description</label><textarea style={S.textarea} rows={3} value={h.description || ''} onChange={e => set('description', e.target.value)} /></div>
          <div><label style={S.label}>CTA Button Label</label><input style={S.input} value={h.ctaLabel || ''} onChange={e => set('ctaLabel', e.target.value)} /></div>
          <div><label style={S.label}>Brochure Link</label><input style={S.input} value={h.brochureLink || ''} onChange={e => set('brochureLink', e.target.value)} /></div>
          <div style={S.fullWidth}><MediaField label="Banner Image" value={h.bannerImage} onChange={v => set('bannerImage', v)} token={token} /></div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section: About ─── */
function AboutTab({ data, onChange, token }) {
  const a = data.about || {};
  const set = (key, val) => onChange({ ...data, about: { ...a, [key]: val } });
  return (
    <div style={S.card}>
      <h2 style={S.title}>About Section</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div><label style={S.label}>Heading</label><input style={S.input} value={a.heading || ''} onChange={e => set('heading', e.target.value)} /></div>
        <div><label style={S.label}>Body Paragraph 1</label><textarea style={S.textarea} rows={4} value={a.body1 || ''} onChange={e => set('body1', e.target.value)} /></div>
        <div><label style={S.label}>Body Paragraph 2</label><textarea style={S.textarea} rows={4} value={a.body2 || ''} onChange={e => set('body2', e.target.value)} /></div>
        <MediaField label="About Image" value={a.image} onChange={v => set('image', v)} token={token} />
        <MediaField label="About Video (Upload or URL)" value={a.videoUrl} onChange={v => set('videoUrl', v)} token={token} type="video" />
      </div>
    </div>
  );
}

/* ─── Section: Technology Partners (Marquee) ─── */
function PartnersTab({ data, onChange, token }) {
  const partners = data.technologyPartners || [];
  const add = () => onChange({ ...data, technologyPartners: [...partners, { name: '', logo: '' }] });
  const remove = i => onChange({ ...data, technologyPartners: partners.filter((_, idx) => idx !== i) });
  const update = (i, key, val) => {
    const next = [...partners];
    next[i] = { ...next[i], [key]: val };
    onChange({ ...data, technologyPartners: next });
  };

  return (
    <div style={S.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h2 style={S.title}>Technology Partners / Clients</h2>
        <button type="button" style={{ ...S.btnPrimary, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }} onClick={add}>
          + Add Partner
        </button>
      </div>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '1.5rem' }}>
        These logos appear in the scrolling marquee on the service page. Upload PNG/SVG with transparent background for best results.
      </p>

      {/* Empty state */}
      {partners.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8fafc', borderRadius: 12, border: '2px dashed #e2e8f0' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏢</div>
          <p style={{ color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>No partners added yet</p>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>Add your technology partners and clients to display their logos on the service page.</p>
          <button type="button" style={S.btnPrimary} onClick={add}>+ Add First Partner</button>
        </div>
      )}

      {/* Partner cards grid */}
      {partners.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {partners.map((p, i) => (
            <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              
              {/* Logo Preview area */}
              <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {p.logo ? (
                  <img
                    src={resolveImageUrl(p.logo)}
                    alt={p.name || 'Partner logo'}
                    style={{ maxHeight: '80px', maxWidth: '80%', objectFit: 'contain' }}
                    onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                <div style={{ display: p.logo ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: '#94a3b8' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                  <span style={{ fontSize: 12 }}>No logo</span>
                </div>
                {/* Partner number badge */}
                <div style={{ position: 'absolute', top: 8, left: 10, background: '#e2e8f0', color: '#64748b', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                  #{i + 1}
                </div>
                <button
                  type="button"
                  style={{ position: 'absolute', top: 8, right: 8, background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                  onClick={() => remove(i)}
                >
                  Remove
                </button>
              </div>

              {/* Fields */}
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label style={S.label}>Partner / Client Name</label>
                  <input
                    style={S.input}
                    value={p.name || ''}
                    onChange={e => update(i, 'name', e.target.value)}
                    placeholder="e.g. Siemens, ANSYS, Shell..."
                  />
                </div>
                <MediaField
                  label="Logo Image (PNG/SVG recommended)"
                  value={p.logo}
                  onChange={v => update(i, 'logo', v)}
                  token={token}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


/* ─── Sub-component: FullContent editor inside a capability ─── */
function FullContentEditor({ items, onChange, token }) {
  const add = () => onChange([...(items || []), { heading: '', text: '', image: '', bullets: [] }]);
  const remove = i => onChange(items.filter((_, idx) => idx !== i));
  const update = (i, key, val) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  return (
    <div style={{ marginTop: '1rem', borderTop: '1px dashed #e2e8f0', paddingTop: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>Content Sections (Sub-page Alternating Blocks)</span>
        <button type="button" style={S.btnSecondary} onClick={add}>+ Add Section</button>
      </div>
      {(items || []).map((sec, i) => (
        <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#334155' }}>Section {i + 1}: {sec.heading || '(untitled)'}</span>
            <button type="button" style={S.btnDanger} onClick={() => remove(i)}>Remove</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div><label style={S.label}>Heading</label><input style={S.input} value={sec.heading || ''} onChange={e => update(i, 'heading', e.target.value)} /></div>
            <div><label style={S.label}>Body Text</label><textarea style={S.textarea} rows={3} value={sec.text || ''} onChange={e => update(i, 'text', e.target.value)} /></div>
            <MediaField label="Section Image" value={sec.image} onChange={v => update(i, 'image', v)} token={token} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Section: Capabilities ─── */
function CapabilitiesTab({ data, onChange, token }) {
  const [expanded, setExpanded] = useState(null);
  const caps = data.capabilities || [];

  const addCap = () => onChange({ ...data, capabilities: [...caps, { id: '', slug: '', title: '', subtitle: '', desc: '', img: '', cta: { label: 'Talk to an Expert', link: '#contact-us' }, fullContent: [] }] });
  const removeCap = i => onChange({ ...data, capabilities: caps.filter((_, idx) => idx !== i) });
  const updateCap = (i, key, val) => {
    const next = [...caps];
    next[i] = { ...next[i], [key]: val };
    onChange({ ...data, capabilities: next });
  };
  const updateCapCta = (i, key, val) => {
    const next = [...caps];
    next[i] = { ...next[i], cta: { ...(next[i].cta || {}), [key]: val } };
    onChange({ ...data, capabilities: next });
  };
  const moveCap = (i, dir) => {
    const next = [...caps];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange({ ...data, capabilities: next });
  };

  return (
    <div style={S.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ ...S.title, margin: 0 }}>Capabilities</h2>
        <button type="button" style={S.btnSecondary} onClick={addCap}>+ Add Capability</button>
      </div>

      {/* Capabilities intro */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#0369a1', marginBottom: '0.75rem' }}>Capabilities Section Intro Text</div>
        <div style={S.grid2}>
          <div><label style={S.label}>Label (badge)</label><input style={S.input} value={data.capabilitiesIntro?.label || ''} onChange={e => onChange({ ...data, capabilitiesIntro: { ...(data.capabilitiesIntro || {}), label: e.target.value } })} /></div>
          <div><label style={S.label}>Heading</label><input style={S.input} value={data.capabilitiesIntro?.heading || ''} onChange={e => onChange({ ...data, capabilitiesIntro: { ...(data.capabilitiesIntro || {}), heading: e.target.value } })} /></div>
          <div><label style={S.label}>Gradient Text</label><input style={S.input} value={data.capabilitiesIntro?.gradientText || ''} onChange={e => onChange({ ...data, capabilitiesIntro: { ...(data.capabilitiesIntro || {}), gradientText: e.target.value } })} /></div>
          <div style={S.fullWidth}><label style={S.label}>Description</label><textarea style={S.textarea} rows={2} value={data.capabilitiesIntro?.description || ''} onChange={e => onChange({ ...data, capabilitiesIntro: { ...(data.capabilitiesIntro || {}), description: e.target.value } })} /></div>
        </div>
      </div>

      {caps.map((cap, i) => (
        <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, marginBottom: '0.75rem', overflow: 'hidden' }}>
          {/* Accordion header */}
          <div style={{ background: expanded === i ? '#f0f9ff' : '#f8fafc', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setExpanded(expanded === i ? null : i)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <button type="button" style={{ ...S.btnSecondary, padding: '2px 6px', fontSize: 11 }} onClick={e => { e.stopPropagation(); moveCap(i, -1); }}>▲</button>
              <button type="button" style={{ ...S.btnSecondary, padding: '2px 6px', fontSize: 11 }} onClick={e => { e.stopPropagation(); moveCap(i, 1); }}>▼</button>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 15 }}>{cap.title || `Capability ${i + 1}`}</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>ID: {cap.id || '–'} | Slug: {cap.slug || '–'}</div>
            </div>
            <button type="button" style={S.btnDanger} onClick={e => { e.stopPropagation(); removeCap(i); }}>Remove</button>
            {expanded === i ? <ChevronDown size={18} color="#64748b" /> : <ChevronRight size={18} color="#64748b" />}
          </div>

          {/* Accordion body */}
          {expanded === i && (
            <div style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
              
              {/* Card Preview Section */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layout size={16} /> Capability Card Preview Settings (Main Service Page)
                </div>
                <div style={S.grid2}>
                  <div style={S.fullWidth}><label style={S.label}>Card Heading</label><input style={S.input} value={cap.title || ''} onChange={e => updateCap(i, 'title', e.target.value)} /></div>
                  <div style={S.fullWidth}><label style={S.label}>Card Description</label><textarea style={S.textarea} rows={3} value={cap.desc || ''} onChange={e => updateCap(i, 'desc', e.target.value)} /></div>
                  <div style={S.fullWidth}><MediaField label="Card Background Image" value={cap.img} onChange={v => updateCap(i, 'img', v)} token={token} /></div>
                  <div><label style={S.label}>Button Label (e.g. Talk to an Expert)</label><input style={S.input} value={cap.cta?.label || ''} onChange={e => updateCapCta(i, 'label', e.target.value)} /></div>
                  <div><label style={S.label}>Button Link</label><input style={S.input} value={cap.cta?.link || ''} onChange={e => updateCapCta(i, 'link', e.target.value)} /></div>
                </div>
              </div>

              {/* Sub-page Section - MOVED TO DEDICATED TAB */}
            </div>
          )}
        </div>
      ))}


      <div style={{ marginTop: '2.5rem', borderTop: '2px solid #e2e8f0', paddingTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b' }}>Trailing Grid Cards (Optional)</h3>
          <button type="button" style={S.btnSecondary} onClick={() => onChange({ ...data, capabilitiesTrailingCards: [...(data.capabilitiesTrailingCards || []), { title: '', desc: '', href: '#', btnLabel: 'View More' }] })}>+ Add Card</button>
        </div>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: '1.5rem' }}>These cards appear after the main capabilities in the grid (e.g. Resources, Contact Us).</p>
        <div style={S.grid2}>
          {(data.capabilitiesTrailingCards || []).map((card, i) => (
            <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '1rem', background: '#fafafa', position: 'relative' }}>
              <button type="button" style={{ position: 'absolute', top: 5, right: 5, border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={() => onChange({ ...data, capabilitiesTrailingCards: data.capabilitiesTrailingCards.filter((_, idx) => idx !== i) })}>✕</button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div><label style={S.label}>Card Title</label><input style={S.input} value={card.title || ''} onChange={e => {
                  const next = [...data.capabilitiesTrailingCards];
                  next[i] = { ...next[i], title: e.target.value };
                  onChange({ ...data, capabilitiesTrailingCards: next });
                }} /></div>
                <div><label style={S.label}>Background (CSS Gradient/Hex)</label><input style={S.input} value={card.background || ''} onChange={e => {
                  const next = [...data.capabilitiesTrailingCards];
                  next[i] = { ...next[i], background: e.target.value };
                  onChange({ ...data, capabilitiesTrailingCards: next });
                }} placeholder="e.g. linear-gradient(135deg, #0c7196 0%, #6ca03e 100%)" /></div>
                <div style={S.fullWidth}><label style={S.label}>Description</label><textarea style={S.textarea} rows={2} value={card.desc || ''} onChange={e => {
                  const next = [...data.capabilitiesTrailingCards];
                  next[i] = { ...next[i], desc: e.target.value };
                  onChange({ ...data, capabilitiesTrailingCards: next });
                }} /></div>
                <div><label style={S.label}>Button Label</label><input style={S.input} value={card.btnLabel || ''} onChange={e => {
                  const next = [...data.capabilitiesTrailingCards];
                  next[i] = { ...next[i], btnLabel: e.target.value };
                  onChange({ ...data, capabilitiesTrailingCards: next });
                }} /></div>
                <div><label style={S.label}>Button Link</label><input style={S.input} value={card.href || ''} onChange={e => {
                  const next = [...data.capabilitiesTrailingCards];
                  next[i] = { ...next[i], href: e.target.value };
                  onChange({ ...data, capabilitiesTrailingCards: next });
                }} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Section: Practice Heads ─── */
function PracticeHeadsTab({ data, onChange, token }) {
  const heads = data.practiceHeads || [];
  const add = () => onChange({ ...data, practiceHeads: [...heads, { name: '', role: '', image: '', linkedin: '#', desc: '' }] });
  const remove = i => onChange({ ...data, practiceHeads: heads.filter((_, idx) => idx !== i) });
  const update = (i, key, val) => {
    const next = [...heads];
    next[i] = { ...next[i], [key]: val };
    onChange({ ...data, practiceHeads: next });
  };
  return (
    <div style={S.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ ...S.title, margin: 0 }}>Practice Heads / Team</h2>
        <button type="button" style={S.btnSecondary} onClick={add}>+ Add Person</button>
      </div>
      {heads.map((h, i) => (
        <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem', marginBottom: '1rem', background: '#fafafa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>{h.name || `Person ${i + 1}`}</span>
            <button type="button" style={S.btnDanger} onClick={() => remove(i)}>Remove</button>
          </div>
          <div style={S.grid2}>
            <div><label style={S.label}>Name</label><input style={S.input} value={h.name || ''} onChange={e => update(i, 'name', e.target.value)} /></div>
            <div><label style={S.label}>Role / Title</label><input style={S.input} value={h.role || ''} onChange={e => update(i, 'role', e.target.value)} /></div>
            <div style={S.fullWidth}><MediaField label="Photo" value={h.image} onChange={v => update(i, 'image', v)} token={token} /></div>
            <div><label style={S.label}>LinkedIn URL</label><input style={S.input} value={h.linkedin || ''} onChange={e => update(i, 'linkedin', e.target.value)} /></div>
            <div style={S.fullWidth}><label style={S.label}>Bio</label><textarea style={S.textarea} rows={4} value={h.desc || ''} onChange={e => update(i, 'desc', e.target.value)} /></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Section: Industries Overrides ─── */
function IndustriesTab({ data, onChange, allIndustries }) {
  const list = data.industries || [];
  const update = (i, key, val) => {
    const next = [...list];
    next[i] = { ...next[i], [key]: val };
    onChange({ ...data, industries: next });
  };
  const add = () => onChange({ ...data, industries: [...list, { name: '', desc: '' }] });
  const move = (i, dir) => {
    if (i + dir < 0 || i + dir >= list.length) return;
    const next = [...list];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    onChange({ ...data, industries: next });
  };
  return (
    <div style={S.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={S.title}>Industry Overrides</h2>
        <button type="button" style={S.btnSecondary} onClick={add}>+ Add Industry</button>
      </div>

      {/* Industries intro */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#1e293b', marginBottom: '0.75rem' }}>Industries Section Intro</div>
        <div style={S.grid2}>
          <div><label style={S.label}>Section Title</label><input style={S.input} value={data.industriesIntro?.title || ''} onChange={e => onChange({ ...data, industriesIntro: { ...(data.industriesIntro || {}), title: e.target.value } })} /></div>
          <div><label style={S.label}>Section Subtitle</label><input style={S.input} value={data.industriesIntro?.subtitle || ''} onChange={e => onChange({ ...data, industriesIntro: { ...(data.industriesIntro || {}), subtitle: e.target.value } })} /></div>
        </div>
      </div>

      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '1.5rem' }}>
        Manage descriptions for industries on this page. Images and links are automatically pulled from the global Industries Manager.
      </p>
      {list.map((ind, i) => (
        <div key={i} style={{ ...S.card, background: '#f8fafc', padding: '1.5rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={S.label}>Select Industry</label>
              <select style={S.input} value={ind.name || ''} onChange={e => update(i, 'name', e.target.value)}>
                <option value="">-- Select Global Industry --</option>
                {(allIndustries || []).map(ai => (
                  <option key={ai._id} value={ai.title}>{ai.title}</option>
                ))}
              </select>
              <label style={{ ...S.label, marginTop: '1rem' }}>Custom Description (Overrides global overview)</label>
              <textarea style={S.textarea} rows={2} value={ind.desc || ''} onChange={e => update(i, 'desc', e.target.value)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button type="button" onClick={() => move(i, -1)} style={S.btnSecondary} disabled={i === 0}><ArrowUp size={14}/></button>
              <button type="button" onClick={() => move(i, 1)} style={S.btnSecondary} disabled={i === list.length-1}><ArrowDown size={14}/></button>
              <button type="button" onClick={() => onChange({ ...data, industries: list.filter((_, idx) => idx !== i) })} style={{ ...S.btnDanger, border: 'none', padding: '8px' }}><Trash2 size={15}/></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Section: Resources (Left Side + Slider Override) ─── */
function ResourceSlidesTab({ data, onChange, token }) {
  const rs = data.resourcesSection || { heading: '', description: '', categories: [], allResourcesBtn: {} };
  const cats = rs.categories || [];
  const updateRS = (key, val) => onChange({ ...data, resourcesSection: { ...rs, [key]: val } });
  const updateCat = (i, key, val) => {
    const next = [...cats];
    next[i] = { ...next[i], [key]: val };
    updateRS('categories', next);
  };
  const addCat = () => updateRS('categories', [...cats, { label: '', link: '#' }]);
  const removeCat = i => updateRS('categories', cats.filter((_, idx) => idx !== i));

  const slides = data.heroResourceSlides || [];
  const add = () => onChange({ ...data, heroResourceSlides: [...slides, { title: '', desc: '', image: '', type: 'BLOGS', href: '#' }] });
  const remove = i => onChange({ ...data, heroResourceSlides: slides.filter((_, idx) => idx !== i) });
  const update = (i, key, val) => {
    const next = [...slides];
    next[i] = { ...next[i], [key]: val };
    onChange({ ...data, heroResourceSlides: next });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 1. Left Side Content */}
      <div style={S.card}>
        <h2 style={S.title}>Resources Section (Left Column)</h2>
        <div style={S.grid2}>
          <div><label style={S.label}>Section Heading</label><input style={S.input} value={rs.heading || ''} onChange={e => updateRS('heading', e.target.value)} /></div>
          <div style={S.fullWidth}><label style={S.label}>Description</label><textarea style={S.textarea} rows={2} value={rs.description || ''} onChange={e => updateRS('description', e.target.value)} /></div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Category Links (Left Side)</h3>
            <button type="button" style={S.btnSecondary} onClick={addCat}>+ Add Link</button>
          </div>
          {cats.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '0.5rem', alignItems: 'center' }}>
              <input style={{ ...S.input, flex: 1 }} value={c.label || ''} onChange={e => updateCat(i, 'label', e.target.value)} placeholder="Title (e.g. BLOGS)" />
              <input style={{ ...S.input, flex: 1 }} value={c.link || ''} onChange={e => updateCat(i, 'link', e.target.value)} placeholder="Link (e.g. /resources/blogs)" />
              <button type="button" style={S.btnDanger} onClick={() => removeCat(i)}>X</button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: '1rem' }}>Bottom CTA Button</h3>
          <div style={S.grid2}>
            <div><label style={S.label}>Button Label</label><input style={S.input} value={rs.allResourcesBtn?.label || ''} onChange={e => updateRS('allResourcesBtn', { ...(rs.allResourcesBtn || {}), label: e.target.value })} /></div>
            <div><label style={S.label}>Button Link</label><input style={S.input} value={rs.allResourcesBtn?.link || ''} onChange={e => updateRS('allResourcesBtn', { ...(rs.allResourcesBtn || {}), link: e.target.value })} /></div>
          </div>
        </div>
      </div>

      {/* 2. Slider Overrides */}
      <div style={S.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={S.title}>Manual Slider Overrides (Optional)</h2>
          <button type="button" style={S.btnSecondary} onClick={add}>+ Add Slide</button>
        </div>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: '1.5rem' }}>Note: If no manual slides are added, the section will automatically pull latest global resources.</p>
        {slides.map((slide, i) => (
          <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem', marginBottom: '1rem', background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 700 }}>Slide {i + 1}</span>
              <button type="button" style={S.btnDanger} onClick={() => remove(i)}>Remove</button>
            </div>
            <div style={S.grid2}>
              <div><label style={S.label}>Type</label><input style={S.input} value={slide.type || ''} onChange={e => update(i, 'type', e.target.value)} placeholder="e.g. BLOGS" /></div>
              <div><label style={S.label}>Title</label><input style={S.input} value={slide.title || ''} onChange={e => update(i, 'title', e.target.value)} /></div>
              <div style={S.fullWidth}><label style={S.label}>Description</label><textarea style={S.textarea} rows={2} value={slide.desc || ''} onChange={e => update(i, 'desc', e.target.value)} /></div>
              <div><label style={S.label}>Image</label><MediaField value={slide.image} onChange={v => update(i, 'image', v)} token={token} /></div>
              <div><label style={S.label}>Link</label><input style={S.input} value={slide.href || ''} onChange={e => update(i, 'href', e.target.value)} /></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ─── Section: Why Choose Us ─── */
const ICON_OPTIONS = [
  { name: 'Users', icon: Users },
  { name: 'MessageSquare', icon: MessageSquare },
  { name: 'Monitor', icon: Monitor },
  { name: 'Settings', icon: Settings },
  { name: 'Zap', icon: Zap },
  { name: 'Cpu', icon: Cpu },
  { name: 'Award', icon: Award }
];

function WhyTab({ data, onChange }) {
  const items = data.whyItems || [];
  const add = () => onChange({ ...data, whyItems: [...items, { title: '', desc: '', icon: 'Users' }] });
  const remove = i => onChange({ ...data, whyItems: items.filter((_, idx) => idx !== i) });
  const update = (i, key, val) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: val };
    onChange({ ...data, whyItems: next });
  };
  return (
    <div style={S.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={S.title}>Why Choose Us Items</h2>
        <button type="button" style={S.btnSecondary} onClick={add}>+ Add Item</button>
      </div>

      {/* Why intro */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#1e293b', marginBottom: '0.75rem' }}>Why Section Intro Text</div>
        <div style={S.grid2}>
          <div><label style={S.label}>Badge Label</label><input style={S.input} value={data.whyItemsIntro?.label || ''} onChange={e => onChange({ ...data, whyItemsIntro: { ...(data.whyItemsIntro || {}), label: e.target.value } })} /></div>
          <div><label style={S.label}>Heading</label><input style={S.input} value={data.whyItemsIntro?.heading || ''} onChange={e => onChange({ ...data, whyItemsIntro: { ...(data.whyItemsIntro || {}), heading: e.target.value } })} /></div>
          <div style={S.fullWidth}><label style={S.label}>Description</label><textarea style={S.textarea} rows={3} value={data.whyItemsIntro?.description || ''} onChange={e => onChange({ ...data, whyItemsIntro: { ...(data.whyItemsIntro || {}), description: e.target.value } })} /></div>
        </div>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem', marginBottom: '1rem', background: '#fafafa' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 700 }}>Item {i + 1}</span>
            <button type="button" style={S.btnDanger} onClick={() => remove(i)}>Remove</button>
          </div>
          <div style={S.grid2}>
            <div><label style={S.label}>Title</label><input style={S.input} value={item.title || ''} onChange={e => update(i, 'title', e.target.value)} /></div>
            <div>
              <label style={S.label}>Icon</label>
              <select style={S.input} value={item.icon || 'Users'} onChange={e => update(i, 'icon', e.target.value)}>
                {ICON_OPTIONS.map(opt => <option key={opt.name} value={opt.name}>{opt.name}</option>)}
              </select>
            </div>
            <div style={S.fullWidth}><label style={S.label}>Description</label><textarea style={S.textarea} rows={2} value={item.desc || ''} onChange={e => update(i, 'desc', e.target.value)} /></div>
          </div>
        </div>
      ))}
    </div>
  );
}


/* ─── Section: Contact Us Section ─── */
function ContactTab({ data, onChange, allForms }) {
  if (!data) return null;
  const cs = data.contactSection || { heading: '', description: '', formSlug: 'contact-form' };
  const update = (key, val) => onChange({ ...data, contactSection: { ...cs, [key]: val } });
  return (
    <div style={S.card}>
      <h2 style={S.title}>Contact Us Section</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={S.grid2}>
          <div style={S.fullWidth}><label style={S.label}>Section Heading</label><input style={S.input} value={cs.heading || ''} onChange={e => update('heading', e.target.value)} /></div>
          <div style={S.fullWidth}><label style={S.label}>Section Description</label><textarea style={S.textarea} rows={2} value={cs.description || ''} onChange={e => update('description', e.target.value)} /></div>
          <div style={S.fullWidth}>
            <label style={S.label}>Select Dynamic Form</label>
            <select style={S.input} value={cs.formSlug || ''} onChange={e => update('formSlug', e.target.value)}>
              <option value="">-- Select a Form --</option>
              {(allForms || []).map(f => (
                <option key={f.slug} value={f.slug}>{f.name} ({f.slug})</option>
              ))}
            </select>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>Forms can be created and managed in the <strong>Form Builder</strong> section of the dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ─── Main Export ─── */
/* ─── Default trailing cards ─── */
const DEFAULT_TRAILING_CARDS = [
  {
    title: 'Resources',
    desc: 'Access our library of blogs, case studies, brochures, and technical publications curated for this practice.',
    href: '/resources',
    btnLabel: 'VIEW RESOURCES',
    background: ''
  },
  {
    title: 'Contact Us',
    desc: 'Talk to our experts about how we can support your technology validation and scale-up challenges.',
    href: '/contact-us',
    btnLabel: 'GET IN TOUCH',
    background: 'linear-gradient(135deg, #0c7196 0%, #6ca03e 100%)'
  }
];

export default function AdminServiceManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [allIndustries, setAllIndustries] = useState([]);
  const [allForms, setAllForms] = useState([]);
  const [openServices, setOpenServices] = useState({});
  const [openCaps, setOpenCaps] = useState({});

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : '';
  const slugify = text => text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/services?t=${Date.now()}`);
      const json = await res.json();
      setServices(json.data || []);
      
      const indRes = await fetch(`${API_URL}/api/industries`);
      const indJson = await indRes.json();
      setAllIndustries(indJson.data || []);

      const formRes = await fetch(`${API_URL}/api/forms`);
      const formJson = await formRes.json();
      setAllForms(formJson.data || []);
    } catch { /* silent */ }
    setLoading(false);
  };

  const searchParams = useSearchParams();

  useEffect(() => { fetchServices(); }, []);

  // Handle deep-linking from query params
  useEffect(() => {
    if (loading || services.length === 0) return;
    
    const sid = searchParams.get('serviceId');
    const tab = searchParams.get('tab');
    
    if (sid) {
      const found = services.find(s => s._id === sid);
      if (found) {
        const copy = JSON.parse(JSON.stringify(found));
        // Pre-populate trailing cards with defaults if none are configured
        if (!copy.capabilitiesTrailingCards || copy.capabilitiesTrailingCards.length === 0) {
          copy.capabilitiesTrailingCards = DEFAULT_TRAILING_CARDS;
        }
        if (!copy.technologyPartners) copy.technologyPartners = [];
        setEditing(copy);
        if (tab) {
          const isValidTab = TABS.some(t => t.key === tab);
          setActiveTab(isValidTab ? tab : 'general');
        }
      }
    } else {
      setEditing(null);
    }
  }, [searchParams, services, loading]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    const isNew = !editing._id;
    const url = isNew ? `${API_URL}/api/services` : `${API_URL}/api/services/${editing._id}`;
    try {
      console.log('[handleSave] Saving service data:', editing);
      const res = await fetch(url, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(editing) });
      const json = await res.json();
      if (res.ok) { setMessage('✅ Service saved!'); fetchServices(); if (json.data) setEditing(json.data); }
      else setMessage(`❌ ${json.error || 'Save failed'}`);
    } catch { setMessage('❌ Network error'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Permanently delete this service?')) return;
    try {
      await fetch(`${API_URL}/api/services/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      fetchServices();
    } catch { alert('Delete failed'); }
  };

  const TABS = [
    { key: 'general', label: 'General' },
    { key: 'hero', label: 'Hero Section' },
    { key: 'about', label: 'About' },
    { key: 'capabilities', label: 'Capabilities' },

    { key: 'practiceHeads', label: 'Practice Heads' },
    { key: 'partners', label: 'Partners' },
    { key: 'why', label: 'Why Choose Us' },
    { key: 'industries', label: 'Industries' },
    { key: 'resources', label: 'Resources' },
    { key: 'contact', label: 'Contact Us' },
    { key: 'seo', label: 'SEO' },
  ];

  const newService = { title: '', slug: '', description: '', hero: {}, about: {}, capabilitiesIntro: {}, capabilities: [], industries: [], whyItems: [], practiceHeads: [], resourcesSection: { categories: [], allResourcesBtn: {} }, heroResourceSlides: [], capabilitiesTrailingCards: DEFAULT_TRAILING_CARDS, technologyPartners: [], contactSection: { heading: '', description: '', formSlug: 'contact-form' }, seo: {} };

  if (loading) return <div style={{ padding: '2rem', color: '#64748b' }}>Loading...</div>;

  if (editing) return (
    <div style={{ maxWidth: '1100px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setEditing(null)} style={S.btnSecondary}>← Back</button>
        <h1 style={{ fontSize: '26px', fontWeight: 800 }}>{editing._id ? 'Edit' : 'Create'} Service</h1>
      </div>

      {message && <div style={{ padding: '1rem', borderRadius: 10, marginBottom: '1.5rem', background: message.startsWith('❌') ? '#fef2f2' : '#f0fdf4', border: `1px solid ${message.startsWith('❌') ? '#fecaca' : '#bbf7d0'}`, color: message.startsWith('❌') ? '#991b1b' : '#166534' }}>{message}</div>}

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem', overflowX: 'auto' }}>
        {TABS.map(t => (
          <button 
            key={t.key} 
            type="button" 
            onClick={() => setActiveTab(t.key)} 
            style={{ 
              padding: '12px 18px', 
              fontSize: '13px', 
              fontWeight: 600, 
              color: activeTab === t.key ? '#00AEEF' : '#64748b', 
              borderLeft: 'none',
              borderRight: 'none',
              borderTop: 'none',
              borderBottom: activeTab === t.key ? '2px solid #00AEEF' : '2px solid transparent', 
              background: 'none', 
              cursor: 'pointer', 
              whiteSpace: 'nowrap', 
              transition: 'all 0.2s' 
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave}>
        {activeTab === 'general' && (
          <div style={S.card}>
            <h2 style={S.title}>General Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={S.grid2}>
                <div style={S.fullWidth}><label style={S.label}>Service Title *</label>
                  <input style={S.input} required value={editing.title || ''} onChange={e => {
                    const t = e.target.value;
                    setEditing(p => ({ ...p, title: t, ...(!p.slug || p.slug === slugify(p.title || '') ? { slug: slugify(t) } : {}) }));
                  }} />
                </div>
                <div><label style={S.label}>Slug *</label><input style={S.input} required value={editing.slug || ''} onChange={e => setEditing(p => ({ ...p, slug: e.target.value }))} /></div>
                <div style={S.fullWidth}><label style={S.label}>Short Description</label><textarea style={S.textarea} rows={3} value={editing.description || ''} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} /></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hero' && <HeroTab data={editing} onChange={setEditing} token={token} />}
        {activeTab === 'about' && <AboutTab data={editing} onChange={setEditing} token={token} />}
        {activeTab === 'capabilities' && <CapabilitiesTab data={editing} onChange={setEditing} token={token} />}

        {activeTab === 'practiceHeads' && <PracticeHeadsTab data={editing} onChange={setEditing} token={token} />}
        {activeTab === 'partners' && <PartnersTab data={editing} onChange={setEditing} token={token} />}
        {activeTab === 'why' && <WhyTab data={editing} onChange={setEditing} />}
        {activeTab === 'industries' && <IndustriesTab data={editing} onChange={setEditing} allIndustries={allIndustries} />}
        {activeTab === 'resources' && <ResourceSlidesTab data={editing} onChange={setEditing} token={token} />}
        {activeTab === 'contact' && <ContactTab data={editing} onChange={setEditing} allForms={allForms} />}
        {activeTab === 'seo' && (
          <div style={S.card}>
            <h2 style={S.title}>SEO Settings</h2>
            <AdminSEOEditor seoData={editing.seo || {}} onChange={seo => setEditing(p => ({ ...p, seo }))} pagePath={`/services/${editing.slug}`} />
          </div>
        )}

        <div style={{ position: 'fixed', bottom: 0, left: '260px', right: 0, background: '#fff', padding: '20px 40px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', zIndex: 40 }}>
          <button type="submit" disabled={saving} style={{ ...S.btnPrimary, padding: '12px 32px', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving...' : 'Save Service'}
          </button>
        </div>
      </form>
    </div>
  );

  /* ─── List view ─── */
  const toggleService = (id) => setOpenServices(p => ({ ...p, [id]: !p[id] }));
  const toggleCap = (key) => setOpenCaps(p => ({ ...p, [key]: !p[key] }));

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Settings size={28} style={{ color: '#00AEEF' }} /> Services Management
          </h1>
          <p style={{ color: '#64748b', marginTop: '6px' }}>Manage service pages, capabilities, practice heads, and more.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={fetchServices} style={{ ...S.btnSecondary, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={16} /> Refresh
          </button>
          <button onClick={() => { setEditing(newService); setActiveTab('general'); }} style={{ ...S.btnPrimary, display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: 10 }}>
            <Plus size={18} /> Add New Service
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {services.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            No services found. Add a new service to get started.
          </div>
        )}

        {services.map((svc) => {
          const svcOpen = openServices[svc._id];
          const caps = svc.capabilities || [];
          return (
            <div key={svc._id} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              {/* ── Level 1: Service ── */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', gap: '12px', cursor: 'pointer', background: svcOpen ? '#f0f9ff' : '#fff', transition: 'background 0.2s', borderBottom: svcOpen ? '1px solid #e2e8f0' : 'none' }}
                onClick={() => toggleService(svc._id)}>
                <span style={{ transition: 'transform 0.3s', transform: svcOpen ? 'rotate(90deg)' : 'rotate(0deg)', color: '#00AEEF', flexShrink: 0 }}>▶</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#1e293b' }}>{svc.title}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>/services/{svc.slug}</div>
                </div>
                <span style={{ background: '#f0f9ff', color: '#0369a1', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {caps.length} capabilities
                </span>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                  <button onClick={() => { 
                    const copy = JSON.parse(JSON.stringify(svc));
                    if (!copy.capabilitiesTrailingCards || copy.capabilitiesTrailingCards.length === 0) {
                      copy.capabilitiesTrailingCards = DEFAULT_TRAILING_CARDS;
                    }
                    if (!copy.technologyPartners) copy.technologyPartners = [];
                    setEditing(copy); 
                    setActiveTab('general'); 
                  }} style={{ background: '#eff6ff', color: '#3b82f6', border: 'none', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600 }}>
                    <Edit2 size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(svc._id)} style={{ ...S.btnDanger, border: 'none', padding: '8px 12px', display: 'flex', alignItems: 'center' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* ── Level 2: Capabilities ── */}
              {svcOpen && (
                <div style={{ paddingLeft: '16px', paddingBottom: '12px' }}>
                  {caps.length === 0 && (
                    <div style={{ padding: '12px 20px', color: '#94a3b8', fontSize: 13 }}>No capabilities added yet.</div>
                  )}
                  {caps.map((cap, ci) => {
                    const capKey = `${svc._id}-${ci}`;
                    const capOpen = openCaps[capKey];
                    const sections = cap.fullContent || [];
                    return (
                      <div key={ci} style={{ marginTop: '8px', borderRadius: 8, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                        {/* Capability row */}
                        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: '10px', cursor: sections.length > 0 ? 'pointer' : 'default', background: capOpen ? '#f8fafc' : '#fafafa', transition: 'background 0.2s' }}
                          onClick={() => sections.length > 0 && toggleCap(capKey)}>
                          {sections.length > 0
                            ? <span style={{ transition: 'transform 0.3s', transform: capOpen ? 'rotate(90deg)' : 'rotate(0deg)', color: '#64748b', fontSize: 11, flexShrink: 0 }}>▶</span>
                            : <span style={{ width: 14, flexShrink: 0 }} />
                          }
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#334155' }}>{cap.title || `Capability ${ci + 1}`}</div>
                            {cap.subtitle && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>{cap.subtitle}</div>}
                          </div>
                          {sections.length > 0 && (
                            <span style={{ background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                              {sections.length} sections
                            </span>
                          )}
                          <button
                            onClick={e => { e.stopPropagation(); 
                            const copy = JSON.parse(JSON.stringify(svc));
                            if (!copy.capabilitiesTrailingCards || copy.capabilitiesTrailingCards.length === 0) {
                              copy.capabilitiesTrailingCards = DEFAULT_TRAILING_CARDS;
                            }
                            if (!copy.technologyPartners) copy.technologyPartners = [];
                            setEditing(copy); 
                            setActiveTab('capabilities'); 
                          }}
                            style={{ background: 'transparent', border: '1px solid #e2e8f0', color: '#64748b', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
                            Edit
                          </button>
                        </div>

                        {/* ── Level 3: fullContent sections ── */}
                        {capOpen && sections.length > 0 && (
                          <div style={{ paddingLeft: '30px', paddingBottom: '8px', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                            {sections.map((sec, si) => (
                              <div key={si} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px', borderBottom: si < sections.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#cbd5e1', flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>{sec.heading || `Section ${si + 1}`}</div>
                                  {sec.text && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px' }}>{sec.text}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
