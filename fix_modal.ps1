$filePath = 'D:\tridiagonal\frontend\components\AdminIndustryManager.jsx'
$content = [System.IO.File]::ReadAllText($filePath)

# Fix: add image field row and fix technicalSections block
# Replace the old grid-2 block (mainTitle/overview/tools only) + inner sections block
$oldBlock = @"
                                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                                            <div className="full-width"><label className="admin-label">Main Modal Title</label><input className="admin-input-sm" value={modal.mainTitle} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.mainTitle`, e.target.value)} /></div>
                                            <div className="full-width"><label className="admin-label">Overview</label><textarea className="admin-input-sm" value={modal.overview} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.overview`, e.target.value)} /></div>
                                            <div className="full-width"><label className="admin-label">Tools Applied (Comma separated)</label><input className="admin-input-sm" value={modal.tools?.join(', ')} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.tools`, e.target.value.split(',').map(t => t.trim()))} /></div>
                                        </div>
                                        <div style={{ marginTop: '1rem' }}>
                                            <label className="admin-label">Inner Sections</label>
                                            {modal.sections?.map((sec, j) => (
                                                <div key={j} style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                                                    <input className="admin-input-sm" placeholder="Label" value={sec.label} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.sections.${"$"}{j}.label`, e.target.value)} style={{ marginBottom: '6px' }} />
                                                    <input className="admin-input-sm" placeholder="Subtitle" value={sec.subtitle} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.sections.${"$"}{j}.subtitle`, e.target.value)} style={{ marginBottom: '6px' }} />
                                                    <textarea className="admin-input-sm" placeholder="Content" value={sec.content} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.sections.${"$"}{j}.content`, e.target.value)} />
                                                    <button type="button" onClick={() => {
                                                        const list = [...modal.sections];
                                                        list.splice(j, 1);
                                                        updateField(`${"$"}{area}.modals.${"$"}{i}.sections`, list);
                                                    }} className="btn-danger" style={{ padding: '2px 8px', marginTop: '4px' }}>Remove Section</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => {
                                                const list = modal.sections || [];
                                                updateField(`${"$"}{area}.modals.${"$"}{i}.sections`, [...list, { label: '', subtitle: '', content: '' }]);
                                            }} className="btn-secondary" style={{ fontSize: '11px' }}>+ Add Sub-section</button>
                                        </div>
"@

$newBlock = @"
                                        <div className="grid-2" style={{ marginTop: '1rem' }}>
                                            <div className="full-width"><label className="admin-label">Main Modal Title</label><input className="admin-input-sm" value={modal.mainTitle || ''} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.mainTitle`, e.target.value)} /></div>
                                            <div className="full-width"><label className="admin-label">Overview</label><textarea className="admin-input-sm" rows={3} value={modal.overview || ''} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.overview`, e.target.value)} /></div>
                                            <div className="full-width"><label className="admin-label">Tools Applied (Comma separated)</label><input className="admin-input-sm" value={modal.tools?.join(', ') || ''} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.tools`, e.target.value.split(',').map(t => t.trim()))} /></div>
                                            <div className="full-width">
                                                <label className="admin-label">Modal Feature Image</label>
                                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                                    <input className="admin-input-sm" style={{ marginBottom: 0, flex: 1 }} value={modal.image || ''} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.image`, e.target.value)} placeholder="/hubfs/image.png" />
                                                    <label className="btn-secondary" style={{ cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '12px' }}>Upload <input type="file" hidden accept="image/*" onChange={e => handleImageUpload(e, `${"$"}{area}.modals.${"$"}{i}.image`)} /></label>
                                                </div>
                                                {modal.image && <img src={modal.image} alt="preview" style={{ maxWidth: '120px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '8px' }} />}
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '1rem' }}>
                                            <label className="admin-label">Technical Sections (title = small label, subtitle = main heading, content = body)</label>
                                            {(modal.technicalSections || []).map((sec, j) => (
                                                <div key={j} style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                                                    <input className="admin-input-sm" placeholder="Section Title (label above subtitle)" value={sec.title || ''} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.technicalSections.${"$"}{j}.title`, e.target.value)} style={{ marginBottom: '6px' }} />
                                                    <input className="admin-input-sm" placeholder="Subtitle (main heading)" value={sec.subtitle || ''} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.technicalSections.${"$"}{j}.subtitle`, e.target.value)} style={{ marginBottom: '6px' }} />
                                                    <textarea className="admin-input-sm" placeholder="Content / Body text" rows={3} value={sec.content || ''} onChange={e => updateField(`${"$"}{area}.modals.${"$"}{i}.technicalSections.${"$"}{j}.content`, e.target.value)} />
                                                    <button type="button" onClick={() => {
                                                        const list = [...(modal.technicalSections || [])];
                                                        list.splice(j, 1);
                                                        updateField(`${"$"}{area}.modals.${"$"}{i}.technicalSections`, list);
                                                    }} className="btn-danger" style={{ padding: '2px 8px', marginTop: '4px' }}>Remove Section</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => {
                                                const list = modal.technicalSections || [];
                                                updateField(`${"$"}{area}.modals.${"$"}{i}.technicalSections`, [...list, { title: '', subtitle: '', content: '' }]);
                                            }} className="btn-secondary" style={{ fontSize: '11px' }}>+ Add Technical Section</button>
                                        </div>
"@

# Fix the add button for new modals
$oldAddBtn = "addItem(`${"$"}{area}.modals`, { cardTitle: '', mainTitle: '', overview: '', sections: [], tools: [] })"
$newAddBtn = "addItem(`${"$"}{area}.modals`, { cardTitle: '', mainTitle: '', overview: '', technicalSections: [], tools: [], image: '' })"

if ($content.Contains($oldBlock.Trim())) {
    Write-Host "Found old block - replacing..."
    $content = $content.Replace($oldBlock.TrimEnd(), $newBlock.TrimEnd())
} else {
    Write-Host "WARNING: Old block not found as-is. Trying line-by-line check..."
    $lines = $oldBlock -split "`n"
    foreach ($line in $lines[0..2]) {
        $trimmed = $line.Trim()
        if ($trimmed.Length -gt 10) {
            $found = $content.Contains($trimmed)
            Write-Host "Line '$trimmed' found: $found"
        }
    }
}

$content = $content.Replace($oldAddBtn, $newAddBtn)

[System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
Write-Host "Done. File written."
