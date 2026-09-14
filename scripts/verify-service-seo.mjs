import assert from 'node:assert/strict';
import fs from 'node:fs';
import { allServices } from '../src/data/site.ts';

const data = JSON.parse(fs.readFileSync(new URL('../src/data/service-seo.json', import.meta.url), 'utf8'));
const baseUrl = process.argv[2] || 'http://localhost:3000';
const decode = text => text.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const normalize = text => decode(text).replace(/\s+/g, ' ').trim();
let totalFaqs = 0;
let totalLinks = 0;
const targets = new Set();

for (const [slug, seo] of Object.entries(data)) {
  const original = allServices.find(service => service.slug === slug);
  assert.ok(original, `Missing service ${slug}`);
  const response = await fetch(`${baseUrl}/services/${slug}`);
  assert.equal(response.status, 200, slug);
  const html = await response.text();
  const titles = [...html.matchAll(/<title>(.*?)<\/title>/gs)];
  assert.equal(titles.length, 1, `${slug}: duplicate titles`);
  assert.equal(decode(titles[0][1]), seo.metaTitle, slug);
  const descriptions = [...html.matchAll(/<meta name="description" content="([^"]*)"/g)];
  assert.equal(descriptions.length, 1, `${slug}: duplicate descriptions`);
  assert.equal(decode(descriptions[0][1]), seo.metaDescription, slug);
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)];
  assert.equal(canonicals.length, 1, `${slug}: duplicate canonicals`);
  assert.equal(canonicals[0][1], `https://sarabeauty.ae/services/${slug}/`, slug);
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1, `${slug}: duplicate JSON-LD`);
  const schema = JSON.parse(scripts[0][1]);
  assert.deepEqual(schema, seo.structuredData, slug);
  const graph = schema['@graph'];
  assert.equal(graph.filter(node => node['@type'] === 'Service').length, 1, slug);
  assert.equal(graph.filter(node => node['@type'] === 'FAQPage').length, 1, slug);
  assert.ok(!scripts[0][1].includes('YOUR-ACTUAL') && !scripts[0][1].includes('.ae/service/'), slug);
  const schemaFaqs = graph.find(node => node['@type'] === 'FAQPage').mainEntity;
  assert.deepEqual(schemaFaqs.map(faq => ({ question: faq.name, answer: faq.acceptedAnswer.text })), seo.faqs, slug);
  // Check actual visible/server-rendered content, excluding JSON and hydration payloads.
  const content = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  const paragraphs = [...content.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m => normalize(m[1].replace(/<[^>]*>/g, '')));
  for (const faq of seo.faqs) {
    const headings = [...content.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/g)].map(m => normalize(m[1]));
    assert.equal(headings.filter(heading => heading === normalize(faq.question)).length, 1, `${slug}: FAQ missing/duplicated: ${faq.question}`);
    assert.ok(paragraphs.includes(normalize(faq.answer)), `${slug}: answer changed: ${faq.question}`);
  }
  for (const paragraph of original.intro ?? [original.description]) assert.ok(paragraphs.includes(normalize(paragraph)), `${slug}: original intro changed`);
  const renderedLinks = [...content.matchAll(/<a\b([^>]*data-service-link=""[^>]*)>([\s\S]*?)<\/a>/g)]
    .map(m => ({ href: decode(m[1].match(/href="([^"]+)"/)[1]), text: decode(m[2]) }));
  const expectedLinks = Object.entries(seo.links).flatMap(([key, links]) => {
    const [section, i, j] = key.split('.');
    const text = section === 'faqs' ? seo.faqs[i].answer : section === 'extraIntro' ? seo.extraIntro[i] : section === 'intro' ? (original.intro ?? [original.description])[i] : original.sections[i].paragraphs[j];
    return links.map(link => ({ href: link.href, text: text.slice(link.start, link.end) }));
  });
  const sort = links => links.map(link => JSON.stringify({ ...link, href: link.href.replace(/\/$/, '') })).sort();
  assert.deepEqual(sort(renderedLinks), sort(expectedLinks), `${slug}: internal link mismatch`);
  for (const link of expectedLinks) targets.add(link.href);
  totalFaqs += seo.faqs.length;
  totalLinks += expectedLinks.length;
}
for (const target of targets) assert.equal((await fetch(baseUrl + target)).status, 200, `Broken link: ${target}`);
console.log(JSON.stringify({ pages: Object.keys(data).length, faqs: totalFaqs, links: totalLinks, targets: targets.size, status: 'passed' }));
