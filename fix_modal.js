const fs = require('fs');
const path = 'D:/tridiagonal/frontend/components/AdminIndustryManager.jsx';
let content = fs.readFileSync(path, 'utf8');

console.log('File length:', content.length);
console.log('Has Inner Sections:', content.includes('Inner Sections'));

// Fix 1: mainTitle value add || ''
content = content.replace(
    'value={modal.mainTitle} onChange={e => updateField(`${area}.modals.${i}.mainTitle`',
    "value={modal.mainTitle || ''} onChange={e => updateField(`${area}.modals.${i}.mainTitle`"
);
console.log('Fix 1 done');

// Fix 2: overview - add rows and || ''
content = content.replace(
    'value={modal.overview} onChange={e => updateField(`${area}.modals.${i}.overview`, e.target.value)} />',
    "rows={3} value={modal.overview || ''} onChange={e => updateField(`${area}.modals.${i}.overview`, e.target.value)} />"
);
console.log('Fix 2 done');

// Fix 3: tools?.join add || ''
content = content.replace(
    "value={modal.tools?.join(', ')} onChange={e => updateField(`${area}.modals.${i}.tools`",
    "value={modal.tools?.join(', ') || ''} onChange={e => updateField(`${area}.modals.${i}.tools`"
);
console.log('Fix 3 done');

// Fix 4: Add image field after tools row and replace inner sections with technicalSections
const oldToolsEnd = `                                            <div className="full-width"><label className="admin-label">Tools Applied (Comma separated)</label><input className="admin-input-sm" value={modal.tools?.join(', ') || ''} onChange={e => updateField(\`\${area}.modals.\${i}.tools\`, e.target.value.split(',').map(t => t.trim()))} /></div>
                                        </div>
                                        <div style={{ marginTop: '1rem' }}>
                                            <label className="admin-label">Inner Sections</label>
                                            {modal.sections?.map((sec, j) => (
                                                <div key={j} style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                                                    <input className="admin-input-sm" placeholder="Label" value={sec.label} onChange={e => updateField(\`\${area}.modals.\${i}.sections.\${j}.label\`, e.target.value)} style={{ marginBottom: '6px' }} />
                                                    <input className="admin-input-sm" placeholder="Subtitle" value={sec.subtitle} onChange={e => updateField(\`\${area}.modals.\${i}.sections.\${j}.subtitle\`, e.target.value)} style={{ marginBottom: '6px' }} />
                                                    <textarea className="admin-input-sm" placeholder="Content" value={sec.content} onChange={e => updateField(\`\${area}.modals.\${i}.sections.\${j}.content\`, e.target.value)} />
                                                    <button type="button" onClick={() => {
                                                        const list = [...modal.sections];
                                                        list.splice(j, 1);
                                                        updateField(\`\${area}.modals.\${i}.sections\`, list);
                                                    }} className="btn-danger" style={{ padding: '2px 8px', marginTop: '4px' }}>Remove Section</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => {
                                                const list = modal.sections || [];
                                                updateField(\`\${area}.modals.\${i}.sections\`, [...list, { label: '', subtitle: '', content: '' }]);
                                            }} className="btn-secondary" style={{ fontSize: '11px' }}>+ Add Sub-section</button>
                                        </div>`;

const newToolsEnd = `                                            <div className="full-width"><label className="admin-label">Tools Applied (Comma separated)</label><input className="admin-input-sm" value={modal.tools?.join(', ') || ''} onChange={e => updateField(\`\${area}.modals.\${i}.tools\`, e.target.value.split(',').map(t => t.trim()))} /></div>
                                            <div className="full-width">
                                                <label className="admin-label">Modal Feature Image</label>
                                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                                    <input className="admin-input-sm" style={{ marginBottom: 0, flex: 1 }} value={modal.image || ''} onChange={e => updateField(\`\${area}.modals.\${i}.image\`, e.target.value)} placeholder="/hubfs/image.png" />
                                                    <label className="btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '12px' }}>Upload <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, \`\${area}.modals.\${i}.image\`)} /></label>
                                                </div>
                                                {modal.image && <img src={modal.image} alt="preview" style={{ maxWidth: '120px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '8px' }} />}
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '1rem' }}>
                                            <label className="admin-label">Technical Sections (title = small label, subtitle = main heading, content = body)</label>
                                            {(modal.technicalSections || []).map((sec, j) => (
                                                <div key={j} style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                                                    <input className="admin-input-sm" placeholder="Section Title (label above heading)" value={sec.title || ''} onChange={e => updateField(\`\${area}.modals.\${i}.technicalSections.\${j}.title\`, e.target.value)} style={{ marginBottom: '6px' }} />
                                                    <input className="admin-input-sm" placeholder="Subtitle (main heading)" value={sec.subtitle || ''} onChange={e => updateField(\`\${area}.modals.\${i}.technicalSections.\${j}.subtitle\`, e.target.value)} style={{ marginBottom: '6px' }} />
                                                    <textarea className="admin-input-sm" placeholder="Content / Body text" rows={3} value={sec.content || ''} onChange={e => updateField(\`\${area}.modals.\${i}.technicalSections.\${j}.content\`, e.target.value)} />
                                                    <button type="button" onClick={() => {
                                                        const list = [...(modal.technicalSections || [])];
                                                        list.splice(j, 1);
                                                        updateField(\`\${area}.modals.\${i}.technicalSections\`, list);
                                                    }} className="btn-danger" style={{ padding: '2px 8px', marginTop: '4px' }}>Remove Section</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => {
                                                const list = modal.technicalSections || [];
                                                updateField(\`\${area}.modals.\${i}.technicalSections\`, [...list, { title: '', subtitle: '', content: '' }]);
                                            }} className="btn-secondary" style={{ fontSize: '11px' }}>+ Add Technical Section</button>
                                        </div>`;

console.log('Old block found in content:', content.includes(oldToolsEnd.substring(0, 100)));

if (content.includes(oldToolsEnd)) {
    content = content.replace(oldToolsEnd, newToolsEnd);
    console.log('Fix 4 done - sections replaced');
} else {
    console.log('WARNING: Could not find exact block for fix 4');
    // Try line-by-line to diagnose
    const lines = content.split('\n');
    lines.forEach((line, i) => {
        if (line.includes('Inner Sections') || line.includes('modal.sections?.map')) {
            console.log('Found at line', i + 1, ':', line.trim().substring(0, 80));
        }
    });
}

// Fix 5: Fix add modal button default object
content = content.replace(
    "{ cardTitle: '', mainTitle: '', overview: '', sections: [], tools: [] }",
    "{ cardTitle: '', mainTitle: '', overview: '', technicalSections: [], tools: [], image: '' }"
);
console.log('Fix 5 done');

fs.writeFileSync(path, content, 'utf8');
console.log('File written successfully. New length:', content.length);
console.log('Has technicalSections:', content.includes('technicalSections'));
console.log('Has Inner Sections:', content.includes('Inner Sections'));
