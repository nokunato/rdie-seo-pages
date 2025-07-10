import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ⬇️ Needed because __dirname doesn't exist in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 Adjust path if your HTML files are elsewhere
const dirPath = path.join(__dirname, '../public/go');
const linkTag = '<link rel="stylesheet" href="/css/style.css" />';

fs.readdirSync(dirPath).forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Prevent double-injection
    if (!content.includes(linkTag)) {
      content = content.replace(
        '</head>',
        `  ${linkTag}\n</head>`
      );
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${file}`);
    }
  }
});

