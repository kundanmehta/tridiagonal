const fs = require('fs');
const path = require('path');

const targetFolders = [
    path.join(__dirname, 'app'),
    path.join(__dirname, 'components')
];

const patterns = [
    /const API_URL = process\.env\.NEXT_PUBLIC_BACKEND_URL \|\| 'https:\/\/silver-wasp-603471\.hostingersite\.com';/g,
    /const backendUrl = process\.env\.NEXT_PUBLIC_BACKEND_URL \|\| 'https:\/\/silver-wasp-603471\.hostingersite\.com';/g,
    /const baseUrl = process\.env\.NEXT_PUBLIC_BACKEND_URL \|\| 'https:\/\/silver-wasp-603471\.hostingersite\.com';/g,
    /process\.env\.NEXT_PUBLIC_BACKEND_URL \|\| 'https:\/\/silver-wasp-603471\.hostingersite\.com'/g
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let modified = false;

    // Check if we need to add the import
    const needsImport = patterns.some(pattern => pattern.test(content));

    if (needsImport) {
        // Replace patterns with API_URL (we'll ensure the variable name matches what was there or use the imported one)
        
        // Specific replacements for common variable names
        content = content.replace(/const API_URL = process\.env\.NEXT_PUBLIC_BACKEND_URL \|\| 'https:\/\/silver-wasp-603471\.hostingersite\.com';/g, '');
        content = content.replace(/const backendUrl = process\.env\.NEXT_PUBLIC_BACKEND_URL \|\| 'https:\/\/silver-wasp-603471\.hostingersite\.com';/g, 'const backendUrl = API_URL;');
        content = content.replace(/const baseUrl = process\.env\.NEXT_PUBLIC_BACKEND_URL \|\| 'https:\/\/silver-wasp-603471\.hostingersite\.com';/g, 'const baseUrl = API_URL;');
        
        // General replacement for inline usage
        content = content.replace(/process\.env\.NEXT_PUBLIC_BACKEND_URL \|\| 'https:\/\/silver-wasp-603471\.hostingersite\.com'/g, 'API_URL');

        // Add import at the top if not present
        if (!content.includes("import { API_URL } from '@/lib/apiConfig'")) {
            // Find the best place for import (after existing imports)
            const lines = content.split('\n');
            let lastImportIndex = -1;
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].startsWith('import ')) {
                    lastImportIndex = i;
                }
            }
            if (lastImportIndex !== -1) {
                lines.splice(lastImportIndex + 1, 0, "import { API_URL } from '@/lib/apiConfig';");
            } else {
                lines.unshift("import { API_URL } from '@/lib/apiConfig';");
            }
            content = lines.join('\n');
        }
        
        modified = true;
    }

    if (modified && content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Refactored: ${path.relative(__dirname, filePath)}`);
    }
}

function traverse(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next') {
                traverse(fullPath);
            }
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

targetFolders.forEach(folder => {
    if (fs.existsSync(folder)) {
        traverse(folder);
    }
});

console.log('Refactoring complete.');
