// Import the supplied editorial document without rewriting its copy.
const fs = require('node:fs');
const ts = require('typescript');
const sourcePaths = process.argv.length > 2 ? process.argv.slice(2) : ['docs/location-pages-source.md', 'docs/location-pages-source-3.md'];
const source = sourcePaths.map(path => fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n')).join('\n\n');
const site = { exports: {} };
new Function('exports', ts.transpileModule(fs.readFileSync('src/data/site.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(site.exports);
const result = {};
const aliases = { 'cupping-therapy': 'dry-cupping-therapy', 'ayurvedic-massage-abu-dhabi': 'ayurvedic-massage' };
for (const part of source.split(/(?=^# \d\. )/m).slice(1)) {
  const slug = part.match(/\*\*NEXT.JS ROUTE:\*\* `\/locations\/([^`]+)`/)[1];
  const lines = part.match(/```text\n([\s\S]*?)```/)[1].trim().split('\n').map(line => line.trim()).filter(Boolean);
  while (/^(?:Meta tittle\s*:|Dis\s*:|Disc\s*:|Description\s*:|Keyword\s*:|Canonical\b|\uF0B7)/i.test(lines[0])) lines.shift();
  const why = lines.indexOf('Why Choose');
  const firstService = lines.indexOf('Post Lymphatic Drainage');
  const benefitsStart = firstService - 7;
  const links = Object.fromEntries([...part.matchAll(/^\d+\. `([^`]+)` → `\/services\/([^`]+)`/gm)].map(match => [match[1], match[2]]));
  const pairs = (list) => {
    if (list.length % 2) throw new Error(`Unpaired content in ${slug}`);
    return Array.from({ length: list.length / 2 }, (_, i) => ({ title: list[i * 2], description: list[i * 2 + 1] }));
  };
  let cursor = firstService;
  const treatments = [];
  while (links[lines[cursor]] || lines[cursor] === lines[firstService - 1]) {
    if (lines[cursor] === lines[firstService - 1]) { cursor++; continue; }
    const name = lines[cursor];
    if (lines[cursor + 1] !== name || lines[cursor + 3] !== name) throw new Error(`Unexpected service block: ${slug} ${name}`);
    const service = site.exports.allServices.find(item => item.slug === (aliases[links[name]] || links[name]));
    if (!service?.image || !fs.existsSync(`public${service.image}`)) throw new Error(`Missing service/image: ${name}`);
    treatments.push({ name, slug: service.slug, image: service.image, description: lines[cursor + 2] });
    cursor += 4;
  }
  const differenceTitle = lines[cursor++];
  const differenceIntro = lines[cursor++];
  const differences = pairs(lines.slice(cursor, cursor + 8));
  cursor += 8;
  if (lines[cursor] === 'Book Now') cursor++;
  const bookingTitle = lines[cursor++];
  const bookingDescription = lines[cursor++];
  if (lines[cursor] === 'Book Now') cursor++;
  const faqTitle = lines[cursor] || '';
  while (faqTitle && lines[cursor] === faqTitle) cursor++;
  const faqs = pairs(lines.slice(cursor)).map(({ title, description }) => ({ question: title, answer: description }));
  let schemaText = part.match(/```json\n([\s\S]*?)```/)[1];
  for (const [from, to] of Object.entries(aliases)) schemaText = schemaText.replaceAll(`/services/${from}/`, `/services/${to}/`);
  const structuredData = JSON.parse(schemaText);
  result[slug] = {
    metaTitle: part.match(/\*\*Meta Title:\*\* (.+)/)[1],
    metaDescription: part.match(/\*\*Meta Description:\*\* (.+)/)[1],
    focusKeyword: part.match(/\*\*(?:Use this corrected |Recommended implementation )?Focus Keyword:\*\* `([^`]+)`/)[1],
    canonical: part.match(/\*\*Migration Canonical:\*\* `([^`]+)`/)[1],
    eyebrow: lines[0], title: lines[1], intro: lines.slice(2, why).join('\n\n'),
    whyEyebrow: 'Why Choose', whyTitle: lines[why + 1], whyParagraphs: lines.slice(why + 2, benefitsStart),
    benefits: pairs(lines.slice(benefitsStart, firstService - 1)),
    treatmentsTitle: lines[firstService - 1], treatmentsIntro: '', treatments,
    differenceTitle, differenceIntro, differences, bookingTitle, bookingDescription, faqTitle, faqs, structuredData,
  };
  const schemaFaq = structuredData['@graph'].find(item => item['@type'] === 'FAQPage');
  if (JSON.stringify(schemaFaq?.mainEntity.map(item => ({ question: item.name, answer: item.acceptedAnswer.text })) || []) !== JSON.stringify(faqs)) throw new Error(`FAQ/schema mismatch: ${slug}`);
  console.log(`${slug}: ${treatments.length} source service blocks, ${faqs.length} FAQs`);
}
fs.writeFileSync('src/data/location-pages.json', JSON.stringify(result, null, 2) + '\n');
