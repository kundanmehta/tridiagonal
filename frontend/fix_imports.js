const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetDir = path.join(__dirname, 'app');
const targetComponents = path.join(__dirname, 'components');

[targetDir, targetComponents].forEach(dir => {
  if (!fs.existsSync(dir)) return;
  walk(dir, (filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Pattern 1: LF
      let broken1 = "import {\nimport { API_URL } from '@/lib/apiConfig';";
      let fixed1 = "import { API_URL } from '@/lib/apiConfig';\nimport {";
      
      // Pattern 2: CRLF
      let broken2 = "import {\r\nimport { API_URL } from '@/lib/apiConfig';";
      let fixed2 = "import { API_URL } from '@/lib/apiConfig';\r\nimport {";

      // Pattern 3: Space after import {
      let broken3 = "import { \nimport { API_URL } from '@/lib/apiConfig';";
      let fixed3 = "import { API_URL } from '@/lib/apiConfig';\nimport { ";

      let changed = false;
      if (content.includes(broken1)) { content = content.replace(new RegExp(broken1, 'g'), fixed1); changed = true; }
      if (content.includes(broken2)) { content = content.replace(new RegExp(broken2, 'g'), fixed2); changed = true; }
      if (content.includes(broken3)) { content = content.replace(new RegExp(broken3, 'g'), fixed3); changed = true; }

      if (changed) {
        console.log(`Fixing ${filePath}...`);
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
});
