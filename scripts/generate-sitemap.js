const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://[your-vercel-domain].vercel.app'; // Update this after deployment
const POSTS_DIR = path.join(__dirname, '..', 'posts');
const OUT_DIR = path.join(__dirname, '..', 'public');

function getSlugs() {
    const slugs = new Set();

    // Helper to read dir
    const read = (lang) => {
        try {
            const dir = path.join(POSTS_DIR, lang);
            if (fs.existsSync(dir)) {
                const files = fs.readdirSync(dir);
                files.forEach(file => {
                    if (file.endsWith('.md')) {
                        slugs.add(file.replace('.md', ''));
                    }
                });
            }
        } catch (e) {
            console.error(`Error reading ${lang} posts:`, e);
        }
    };

    read('zh');
    read('en');
    return Array.from(slugs);
}

function generateSitemap() {
    const slugs = getSlugs();
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${today}</lastmod>
  </url>`;

    slugs.forEach(slug => {
        xml += `
  <url>
    <loc>${BASE_URL}/posts/${slug}</loc>
    <lastmod>${today}</lastmod>
  </url>`;
    });

    xml += `
</urlset>`;

    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR, { recursive: true });
    }

    fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), xml);
    console.log('✅ sitemap.xml generated in out/');
}

generateSitemap();
