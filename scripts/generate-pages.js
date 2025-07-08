// scripts/generate-pages.js
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const csvPath = './data/pages.csv'; // Make sure this file exists
const outputDir = './pages'; // This is where we'll save the HTML files

// Read and parse CSV
const csv = fs.readFileSync(csvPath);
const records = parse(csv, {
  columns: true,
  skip_empty_lines: true
});

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

records.forEach((row) => {
  const { slug, title, meta_description, content } = row;

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    <meta name="description" content="${meta_description}" />
  </head>
  <body>
    <h1>${title}</h1>
    <p>${content}</p>
    <a href="/">← Back to Homepage</a>
  </body>
</html>`;

  fs.writeFileSync(path.join(outputDir, `${slug}.html`), html);
});

console.log("✅ Pages generated successfully.");
