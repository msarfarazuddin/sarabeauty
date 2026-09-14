import fs from 'node:fs';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const { posts } = JSON.parse(fs.readFileSync('src/data/card-data.json', 'utf8'));
const images = JSON.parse(fs.readFileSync('src/data/blog-images.json', 'utf8'));
const files = new Set(fs.readdirSync('public/assets'));
for (const post of posts) {
  const image = images[post.slug];
  assert.ok(image?.startsWith('/assets/'), `Missing image mapping: ${post.slug}`);
  assert.ok(files.has(image.slice('/assets/'.length)), `Missing file or incorrect filename case: ${image}`);
  const metadata = await sharp(`public${image}`).metadata();
  assert.ok(metadata.width && metadata.height, `Invalid image: ${image}`);
}
console.log(`Verified ${posts.length} blog image mappings, exact filenames, and image decoding.`);
