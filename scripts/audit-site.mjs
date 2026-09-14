import fs from 'node:fs';
import path from 'node:path';

// Audit the actual production HTML, including links generated from data.
const root = path.resolve('.next/server/app');
const origin = 'https://sarabeauty.ae';
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const pages = new Map(walk(root).filter(file => file.endsWith('.html')).map(file => {
  const relative = path.relative(root, file).replaceAll('\\', '/').replace(/\.html$/, '');
  return [relative === 'index' ? '/' : `/${relative}/`, fs.readFileSync(file, 'utf8')];
}));
const errors = [];
const external = new Set();
const assets = new Set();
let links = 0;
let checkedPages = 0;
const baseUrl = process.argv[2];
const urls = [];
for (const [route, html] of pages) {
  if (route.startsWith('/_') || route === '/about/') continue;
  checkedPages++;
  urls.push(route);
  for (const [name, regex] of [
    ['title', /<title>[^<]+<\/title>/g],
    ['description', /<meta name="description" content="[^"]+"/g],
    ['canonical', /<link rel="canonical" href="[^"]+"/g],
    ['h1', /<h1\b/g],
    ['Open Graph title', /<meta property="og:title" content="[^"]+"/g],
  ]) if ([...html.matchAll(regex)].length !== 1) errors.push(`${route}: expected one ${name}`);
  if (!html.includes(`rel="canonical" href="${origin}${route}"`)) errors.push(`${route}: canonical mismatch`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { errors.push(`${route}: invalid JSON-LD`); }
  }
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]*)"/g)) {
    links++;
    const href = decode(match[1]);
    if (/^(mailto:|tel:)/.test(href)) continue;
    const url = new URL(href, `${origin}${route}`);
    if (url.origin !== origin) { external.add(url.href); continue; }
    const target = decodeURIComponent(url.pathname);
    const normalized = target.endsWith('/') ? target : `${target}/`;
    if (!pages.has(normalized) && !fs.existsSync(path.join('public', target))) errors.push(`${route}: broken link ${href}`);
    if (url.hash && pages.has(normalized)) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!pages.get(normalized).includes(`id="${id}"`)) errors.push(`${route}: missing anchor ${href}`);
    }
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(match[0])) errors.push(`${route}: image missing alt`);
    const src = match[0].match(/\bsrc="([^"]+)"/)?.[1];
    if (!src) continue;
    const url = new URL(decode(src), origin);
    const asset = url.pathname.replace(/\/$/, '') === '/_next/image' ? url.searchParams.get('url') : url.pathname;
    if (asset?.startsWith('/assets/')) assets.add(decodeURIComponent(asset));
  }
}
for (const asset of assets) if (!fs.existsSync(path.join('public', asset))) errors.push(`Missing image: ${asset}`);
if (baseUrl) {
  for (let index = 0; index < urls.length; index += 6) {
    await Promise.all(urls.slice(index, index + 6).map(async route => {
      try {
        const response = await fetch(`${baseUrl}${route}`, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
        if (response.status !== 200) errors.push(`${route}: HTTP ${response.status}`);
        if (response.headers.get('x-content-type-options') !== 'nosniff') errors.push(`${route}: missing security headers`);
        await response.arrayBuffer();
      } catch (error) { errors.push(`${route}: ${error.message}`); }
    }));
  }
  for (const endpoint of ['/sitemap.xml', '/robots.txt', '/favicon.ico']) {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (response.status !== 200) errors.push(`${endpoint}: HTTP ${response.status}`);
    const body = await response.text();
    if (endpoint === '/sitemap.xml') {
      const entries = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
      for (const route of urls) if (!entries.includes(route)) errors.push(`${route}: missing from sitemap`);
      for (const route of entries) if (!pages.has(route)) errors.push(`Sitemap has unknown route: ${route}`);
    }
  }
  const missing = await fetch(`${baseUrl}/this-page-does-not-exist-audit/`);
  if (missing.status !== 404) errors.push('Unknown URL must return 404');
}
fs.mkdirSync('reports', { recursive: true });
const result = { checkedPages, links, images: assets.size, httpChecked: Boolean(baseUrl), errors: [...new Set(errors)], externalLinkStatus: 'Recorded only; third-party availability and WhatsApp account ownership are not verified.', externalLinks: [...external] };
fs.writeFileSync('reports/site-audit.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ ...result, externalLinks: `${external.size} distinct external URLs recorded in reports/site-audit.json` }, null, 2));
if (errors.length) process.exitCode = 1;
