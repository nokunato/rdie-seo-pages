import fs from 'fs';
import path from 'path';

const baseUrl = 'https://removeduplicatesinexcel.com/seo';
const seoFolder = './seo';
const outputFile = './sitemap.xml';

// Read all HTML files in ./seo/
const pages = fs.readdirSync(seoFolder).filter(file => file.endsWith('.html'));

const urls = pages.map((file) => {
  const slug = file.replace('.html', '');
  return `
  <url>
    <loc>${baseUrl}/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

// Save to sitemap.xml
fs.writeFileSync(outputFile, sitemap);
console.log('✅ Sitemap generated at sitemap.xml');
