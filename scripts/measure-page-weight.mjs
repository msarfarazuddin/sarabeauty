import fs from 'node:fs';
import { gzipSync } from 'node:zlib';

const result = {};
for (const route of ['index', 'about-us', 'services', 'locations/khalidiya']) {
  const html = fs.readFileSync(`.next/server/app/${route}.html`, 'utf8');
  const files = new Set([...html.matchAll(/<script[^>]*src="([^"]+)/g)].map(match => match[1]));
  let bytes = 0;
  for (const file of files) bytes += gzipSync(fs.readFileSync('.next' + file.replace('/_next', ''))).length;
  result[route] = { javaScriptGzipBytes: bytes, scriptFiles: files.size, htmlGzipBytes: gzipSync(html).length };
}
fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync(`reports/performance-${process.argv[2] === 'baseline' ? 'baseline' : 'after'}.json`, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
