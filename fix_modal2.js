const fs = require('fs');
const path = 'D:/tridiagonal/frontend/components/AdminIndustryManager.jsx';
let content = fs.readFileSync(path, 'utf8');
// File uses CRLF, so we need to use \r\n in our search strings
const crlf = '\r\n';

// Build the old block to replace (lines 461-480 in the file)
const oldBlock = `                                        </div>${crlf}                                        <div style={{ marginTop: '1rem' }}>${crlf}                                            <label className="admin-label">Inner Sections</label>${crlf}                                            {modal.sections?.map((sec, j) => (${crlf}                                                <div key={j} style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>${crlf}                                                    <input className="admin-input-sm" placeholder="Label" value={sec.label} onChange={e => updateField(\`\${area}.modals.\${i}.sections.\${j}.label\`, e.target.value)} style={{ marginBottom: '6px' }} />${crlf}                                                    <input className="admin-input-sm" placeholder="Subtitle" value={sec.subtitle} onChange={e => updateField(\`\${area}.modals.\${i}.sections.\${j}.subtitle\`, e.target.value)} style={{ marginBottom: '6px' }} />${crlf}                                                    <textarea className="admin-input-sm" placeholder="Content" value={sec.content} onChange={e => updateField(\`\${area}.modals.\${i}.sections.\${j}.content\`, e.target.value)} />${crlf}                                                    <button type="button" onClick={() => {${crlf}                                                        const list = [...modal.sections];${crlf}                                                        list.splice(j, 1);${crlf}                                                        updateField(\`\${area}.modals.\${i}.sections\`, list);${crlf}                                                    }} className="btn-danger" style={{ padding: '2px 8px', marginTop: '4px' }}>Remove Section</button>${crlf}                                                </div>${crlf}                                            ))}\n                                            <button type="button" onClick={() => {${crlf}                                                const list = modal.sections || [];${crlf}                                                updateField(\`\${area}.modals.\${i}.sections\`, [...list, { label: '', subtitle: '', content: '' }]);${crlf}                                            }} className="btn-secondary" style={{ fontSize: '11px' }}>+ Add Sub-section</button>${crlf}                                        </div>`;

const newBlock = `                                            <div className="full-width">${crlf}                                                <label className="admin-label">Modal Feature Image</label>${crlf}                                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>${crlf}                                                    <input className="admin-input-sm" style={{ marginBottom: 0, flex: 1 }} value={modal.image || ''} onChange={e => updateField(\`\${area}.modals.\${i}.image\`, e.target.value)} placeholder="/hubfs/image.png" />${crlf}                                                    <label className="btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '12px' }}>Upload <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, \`\${area}.modals.\${i}.image\`)} /></label>${crlf}                                                </div>${crlf}                                                {modal.image && <img src={modal.image} alt="preview" style={{ maxWidth: '120px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '8px' }} />}${crlf}                                            </div>${crlf}                                        </div>${crlf}                                        <div style={{ marginTop: '1rem' }}>${crlf}                                            <label className="admin-label">Technical Sections (title = small label, subtitle = heading, content = body)</label>${crlf}                                            {(modal.technicalSections || []).map((sec, j) => (${crlf}                                                <div key={j} style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>${crlf}                                                    <input className="admin-input-sm" placeholder="Section Title (label above heading)" value={sec.title || ''} onChange={e => updateField(\`\${area}.modals.\${i}.technicalSections.\${j}.title\`, e.target.value)} style={{ marginBottom: '6px' }} />${crlf}                                                    <input className="admin-input-sm" placeholder="Subtitle (main heading)" value={sec.subtitle || ''} onChange={e => updateField(\`\${area}.modals.\${i}.technicalSections.\${j}.subtitle\`, e.target.value)} style={{ marginBottom: '6px' }} />${crlf}                                                    <textarea className="admin-input-sm" placeholder="Content / Body text" rows={3} value={sec.content || ''} onChange={e => updateField(\`\${area}.modals.\${i}.technicalSections.\${j}.content\`, e.target.value)} />${crlf}                                                    <button type="button" onClick={() => {${crlf}                                                        const list = [...(modal.technicalSections || [])];${crlf}                                                        list.splice(j, 1);${crlf}                                                        updateField(\`\${area}.modals.\${i}.technicalSections\`, list);${crlf}                                                    }} className="btn-danger" style={{ padding: '2px 8px', marginTop: '4px' }}>Remove Section</button>${crlf}                                                </div>${crlf}                                            ))}${crlf}                                            <button type="button" onClick={() => {${crlf}                                                const list = modal.technicalSections || [];${crlf}                                                updateField(\`\${area}.modals.\${i}.technicalSections\`, [...list, { title: '', subtitle: '', content: '' }]);${crlf}                                            }} className="btn-secondary" style={{ fontSize: '11px' }}>+ Add Technical Section</button>${crlf}                                        </div>`;

console.log('Old block start found:', content.includes('Inner Sections'));

// Let's print the exact characters around Inner Sections to verify CRLF
const idx = content.indexOf('Inner Sections');
console.log('Chars before "Inner Sections":', JSON.stringify(content.substring(idx - 10, idx)));

// Use a simpler targeted approach - replace line by line using the known content
// Replace label "Inner Sections" -> new label
content = content.replace(
    `<label className="admin-label">Inner Sections</label>`,
    `<label className="admin-label">Technical Sections (title = small label, subtitle = heading, content = body)</label>`
);

// Replace modal.sections?.map with modal.technicalSections || []).map
content = content.replace(
    `{modal.sections?.map((sec, j) => (`,
    `{(modal.technicalSections || []).map((sec, j) => (`
);

// Replace sec.label -> sec.title (with title placeholder)
content = content.replace(
    `placeholder="Label" value={sec.label} onChange={e => updateField(\`\${area}.modals.\${i}.sections.\${j}.label\`, e.target.value)}`,
    `placeholder="Section Title (label above heading)" value={sec.title || ''} onChange={e => updateField(\`\${area}.modals.\${i}.technicalSections.\${j}.title\`, e.target.value)}`
);

// Replace sec.subtitle path
content = content.replace(
    `value={sec.subtitle} onChange={e => updateField(\`\${area}.modals.\${i}.sections.\${j}.subtitle\`, e.target.value)}`,
    `value={sec.subtitle || ''} onChange={e => updateField(\`\${area}.modals.\${i}.technicalSections.\${j}.subtitle\`, e.target.value)}`
);

// Replace sec.content path
content = content.replace(
    `value={sec.content} onChange={e => updateField(\`\${area}.modals.\${i}.sections.\${j}.content\`, e.target.value)}`,
    `rows={3} value={sec.content || ''} onChange={e => updateField(\`\${area}.modals.\${i}.technicalSections.\${j}.content\`, e.target.value)}`
);

// Replace the splice on modal.sections -> modal.technicalSections
content = content.replace(
    `const list = [...modal.sections];`,
    `const list = [...(modal.technicalSections || [])];`
);
content = content.replace(
    `updateField(\`\${area}.modals.\${i}.sections\`, list);`,
    `updateField(\`\${area}.modals.\${i}.technicalSections\`, list);`
);

// Replace the add button for sub-sections
content = content.replace(
    `const list = modal.sections || [];` + '\r\n' +
    `                                                updateField(\`\${area}.modals.\${i}.sections\`, [...list, { label: '', subtitle: '', content: '' }]);`,
    `const list = modal.technicalSections || [];` + '\r\n' +
    `                                                updateField(\`\${area}.modals.\${i}.technicalSections\`, [...list, { title: '', subtitle: '', content: '' }]);`
);

// Replace "+ Add Sub-section" button text
content = content.replace(
    `>+ Add Sub-section</button>`,
    `>+ Add Technical Section</button>`
);

// Now also insert image field. We need to add it to the grid-2 after tools row.
// Find the pattern: tools row closing </div> then grid closing </div>, and insert image field before the grid closing
const toolsClosingPattern = `onChange={e => updateField(\`\${area}.modals.\${i}.tools\`, e.target.value.split(',').map(t => t.trim()))} /></div>\r\n                                        </div>`;
const toolsClosingReplacement = `onChange={e => updateField(\`\${area}.modals.\${i}.tools\`, e.target.value.split(',').map(t => t.trim()))} /></div>\r\n                                            <div className="full-width">\r\n                                                <label className="admin-label">Modal Feature Image</label>\r\n                                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>\r\n                                                    <input className="admin-input-sm" style={{ marginBottom: 0, flex: 1 }} value={modal.image || ''} onChange={e => updateField(\`\${area}.modals.\${i}.image\`, e.target.value)} placeholder="/hubfs/image.png" />\r\n                                                    <label className="btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '12px' }}>Upload <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, \`\${area}.modals.\${i}.image\`)} /></label>\r\n                                                </div>\r\n                                                {modal.image && <img src={modal.image} alt="preview" style={{ maxWidth: '120px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '8px' }} />}\r\n                                            </div>\r\n                                        </div>`;

const foundPattern = content.includes(toolsClosingPattern);
console.log('Tools closing pattern found:', foundPattern);
if (foundPattern) {
    content = content.replace(toolsClosingPattern, toolsClosingReplacement);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Done! Final stats:');
console.log('technicalSections count:', (content.match(/technicalSections/g) || []).length);
console.log('Inner Sections remaining:', content.includes('Inner Sections'));
console.log('modal.sections?.map remaining:', content.includes('modal.sections?.map'));
console.log('image field added:', content.includes('Modal Feature Image'));
console.log('File length:', content.length);
