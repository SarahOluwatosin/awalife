'use strict';
const http = require('http');
const https = require('https');
const urlModule = require('url');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
const SITE_URL = (process.env.SITE_URL || 'https://www.awalife.com').replace(/\/$/, '');

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function fetchArticle(articleId) {
  return new Promise((resolve, reject) => {
    if (!SUPABASE_URL || !SUPABASE_KEY) { resolve(null); return; }
    const endpoint = `${SUPABASE_URL}/rest/v1/news_articles?id=eq.${encodeURIComponent(articleId)}&select=title,excerpt,image_url,meta_title,meta_desc,status&limit=1`;
    const parsed = urlModule.parse(endpoint);
    const options = {
      hostname: parsed.hostname,
      path: parsed.path,
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    };
    const req = https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(e); } });
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = req.url || '';
    const match = reqUrl.match(/\/company\/news\/([^?#/]+)/);
    const articleId = match && match[1];

    if (!articleId) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const articles = await fetchArticle(articleId);
    const article = Array.isArray(articles) ? articles[0] : null;

    if (!article || article.status !== 'published') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const title = article.meta_title || article.title || 'Awalife News';
    const desc = String(article.meta_desc || article.excerpt || '').slice(0, 300);
    const image = article.image_url || '';
    const pageUrl = `${SITE_URL}/company/news/${encodeURIComponent(articleId)}`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Awalife">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:url" content="${escapeHtml(pageUrl)}">
${image ? `  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="627">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(desc)}">
${image ? `  <meta name="twitter:image" content="${escapeHtml(image)}">` : ''}
  <link rel="canonical" href="${escapeHtml(pageUrl)}">
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(desc)}</p>
  <a href="${escapeHtml(pageUrl)}">Read article</a>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (err) {
    console.error('[OG Server]', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
});

server.listen(3001, '127.0.0.1', () => {
  console.log('[OG Server] Listening on 127.0.0.1:3001');
});
