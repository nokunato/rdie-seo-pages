import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Paths
const csvFilePath = path.resolve('Data', 'pages.csv'); // adjust if different
const outputDir = path.resolve('seo');

// Step 1: Read CSV file
const fileContent = fs.readFileSync(csvFilePath, 'utf8');

// Step 2: Parse CSV
const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
});

// Helper to sanitize slugs
function sanitizeSlug(slug) {
  return slug.trim().replace(/\s+/g, '-').toLowerCase();
}

// Step 3: Create SEO folder if not exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Step 4: Generate HTML for each row
records.forEach((record, index) => {
  const slug = sanitizeSlug(record.slug);
  const title = record.title || 'RDIE SEO Page';
  const metaDesc = record.meta_desc || '';
  const htmlContent = record.html_content || '<p>No content available.</p>';

  // Step 5: Pick 5 random pages for internal linking (excluding current)
  const relatedLinks = records
    .filter((r, i) => i !== index)
    .slice(0, 5)
    .map((r) => {
      const linkSlug = sanitizeSlug(r.slug);
      return `<li><a href="/seo/${linkSlug}.html">${r.title}</a></li>`;
    })
    .join('\n');

  // Step 6: Final HTML structure
  const finalHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    <meta name="description" content="${metaDesc}" />
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    ${htmlContent}
    
    <h3>Explore More:</h3>
    <ul>
      ${relatedLinks}
    </ul>

    <a class="back-link" href="/">← Back to Homepage</a>
  </body>
</html>`;

  // Step 7: Write to file
  const filePath = path.join(outputDir, `${slug}.html`);
  fs.writeFileSync(filePath, finalHtml);
});

console.log('✅ Pages generated successfully with styling and internal links.');
