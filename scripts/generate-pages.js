import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const csvPath = './Data/pages.csv'; // Updated based on your screenshot
const outputDir = './seo'; // Save HTML pages here

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Read and parse the CSV file
const csvBuffer = fs.readFileSync(csvPath, 'utf8');
const records = parse(csvBuffer, {
  columns: true,
  skip_empty_lines: true
});

// Loop through each row and generate HTML
records.forEach((row) => {
  const slug = row.slug?.trim();
  const title = row.title?.trim() || 'Remove Duplicates in Excel';
  const metaDesc = row.meta_desc?.trim() || '';
  const htmlContent = row.html_content?.trim() || '<p>Coming soon...</p>';

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${metaDesc}" />
  </head>
  <body>
    ${htmlContent}
    <br />
    <a href="/">← Back to Homepage</a>
  </body>
</html>`;

  const outputPath = path.join(outputDir, `${slug}.html`);
  fs.writeFileSync(outputPath, html);
  console.log(`✅ Created: ${slug}.html`);
});

console.log('🎉 All pages generated successfully!');
