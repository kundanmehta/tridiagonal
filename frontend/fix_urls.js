const fs = require('fs');
const path = require('path');

const targetUrl = 'https://silver-wasp-603471.hostingersite.com';
const dirPath = path.join(__dirname, 'app');
const componentsPath = path.join(__dirname, 'components');

function replaceInFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace various fallbacks
            if (content.includes('http://localhost:5000')) {
                content = content.replace(/http:\/\/localhost:5000/g, targetUrl);
                modified = true;
            }
            if (content.includes('http://127.0.0.1:5000')) {
                content = content.replace(/http:\/\/127\.0\.0\.1:5000/g, targetUrl);
                modified = true;
            }
            
            // Fix Next.js typo
            if (content.includes('NEXT_PUBLIC_API_URL')) {
                content = content.replace(/NEXT_PUBLIC_API_URL/g, 'NEXT_PUBLIC_BACKEND_URL');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

replaceInFiles(dirPath);
replaceInFiles(componentsPath);
console.log('All files processed.');
