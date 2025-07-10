const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '../public/seo'); // adjust if needed
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
