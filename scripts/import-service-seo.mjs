import fs from 'node:fs';
import path from 'node:path';
import { allServices } from '../src/data/site.ts';

const source = fs.readFileSync(process.argv[2], 'utf8').replace(/\r\n/g, '\n');
const aliases = { 'ayurvedic-massage-abu-dhabi': 'ayurvedic-massage', 'cupping-therapy': 'dry-cupping-therapy' };
const output = {};
const report = [];
const migrate = text => Object.entries(aliases).reduce((text, [from, to]) => text.replaceAll(`/services/${from}`, `/services/${to}`), text)
  .replaceAll('YOUR-ACTUAL-LOGO-URL', 'https://sarabeauty.ae/assets/color%20logo.png');

for (const block of source.split(/(?=^# \d+\. )/m).slice(1)) {
  const sourceSlug = block.match(/NEXT\.JS ROUTE:\*\* `\/services\/([^`]+)/)[1];
  const slug = aliases[sourceSlug] ?? sourceSlug;
  const service = allServices.find(item => item.slug === slug);
  if (!service) throw new Error(`Missing service: ${slug}`);
  const field = heading => block.split(`## ${heading}\n`)[1].split('\n## ')[0].trim();
  const rawFaq = block.match(/```text\n([\s\S]*?)```/)[1].replace(/\nSchema\s*:?\s*$/i, '').trim();
  const numbered = /^\d+\s*[.\-]\s+.+\?\s*$/m.test(rawFaq);
  const questions = [...rawFaq.matchAll(numbered ? /^\d+\s*[.\-]\s+(.+\?)\s*$/gm : /^([^\n]+\?)\s*$/gm)];
  const faqs = questions.map((match, i) => ({
    question: match[1].trim(),
    answer: rawFaq.slice(match.index + match[0].length, questions[i + 1]?.index ?? rawFaq.length).trim(),
  }));
  if (!faqs.length || faqs.some(faq => !faq.answer)) throw new Error(`Incomplete FAQs: ${slug}`);
  const structuredData = JSON.parse(migrate(block.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]));
  // Keep one graph, with FAQ markup matching the actual accordion answers.
  structuredData['@graph'].push({
    '@type': 'FAQPage', '@id': `https://sarabeauty.ae/services/${slug}/#faq`,
    mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  });
  const item = {
    metaTitle: field('META TITLE'), metaDescription: field('META DESCRIPTION'),
    faqTitle: rawFaq.slice(0, questions[0].index).trim() || 'FAQs',
    faqs, structuredData, extraIntro: [], links: {},
  };
  const notices = [];
  const rules = [...field('INTERNAL LINKING').matchAll(/\*\*Find anchor:\*\* `([^`]+)`\s+\*\*Link to:\*\* `([^`]+)`\s+\*\*Location:\*\* ([^\n]+)\s+\*\*Find in this context:\*\* “([^”]+)”/g)]
    .map(m => ({ anchor: m[1], href: migrate(m[2]), location: m[3].trim(), context: m[4] }))
    .sort((a, b) => b.anchor.length - a.anchor.length);
  const paragraphs = [
    ...(service.intro ?? [service.description]).map((text, i) => ({ key: `intro.${i}`, text, location: 'main page copy' })),
    ...(service.sections ?? []).flatMap((section, i) => section.paragraphs.map((text, j) => ({ key: `sections.${i}.${j}`, text, location: 'main page copy' }))),
    ...faqs.map((faq, i) => ({ key: `faqs.${i}`, text: faq.answer, location: 'FAQ section' })),
  ];
  for (const rule of rules) {
    if (rule.href !== '/services' && !allServices.some(s => `/services/${s.slug}` === rule.href)) throw new Error(`Invalid target: ${rule.href}`);
    const candidates = [];
    const context = rule.context.replace(/^…|…$/g, '').toLowerCase();
    for (const paragraph of paragraphs) {
      const text = paragraph.text.toLowerCase();
      let start = text.indexOf(rule.anchor.toLowerCase());
      while (start !== -1) {
        const end = start + rule.anchor.length;
        const overlaps = (item.links[paragraph.key] ?? []).some(link => start < link.end && end > link.start);
        // A body-Maderotherapy link must not steal part of a different treatment name.
        const wrongTreatment = rule.anchor === 'Maderotherapy' && /(?:face|brazilian)\s+$/i.test(paragraph.text.slice(0, start));
        if (!overlaps && !wrongTreatment) candidates.push({ ...paragraph, start, end, score: (text.includes(context) ? 100 : 0) + (paragraph.location === rule.location ? 10 : 0) });
        start = text.indexOf(rule.anchor.toLowerCase(), end);
      }
    }
    candidates.sort((a, b) => b.score - a.score);
    let match = candidates[0];
    if (!match) {
      const text = rule.context.startsWith('Explore our ') ? rule.context : `Explore our ${rule.anchor} ${rule.href === '/services' ? 'options' : 'treatment'}.`;
      const key = `extraIntro.${item.extraIntro.length}`;
      const start = text.toLowerCase().indexOf(rule.anchor.toLowerCase());
      match = { key, text, start, end: start + rule.anchor.length, score: 0 };
      item.extraIntro.push(text);
      paragraphs.push({ key, text, location: 'main page copy' });
      notices.push(`Added a short intro cross-reference for "${rule.anchor}"; the requested occurrence was absent or overlapped another treatment link.`);
    } else if (match.score < 100) {
      notices.push(`Linked existing "${match.text.slice(match.start, match.end)}" in ${match.key}; source context was not present verbatim.`);
    }
    (item.links[match.key] ??= []).push({ start: match.start, end: match.end, href: rule.href });
  }
  for (const links of Object.values(item.links)) links.sort((a, b) => a.start - b.start);
  output[slug] = item;
  report.push({ slug, sourceSlug, faqs: faqs.length, links: rules.length, notices });
}
if (Object.keys(output).length !== 20) throw new Error('Expected 20 service pages');
fs.writeFileSync(path.join(import.meta.dirname, '../src/data/service-seo.json'), JSON.stringify(output, null, 2) + '\n');
fs.mkdirSync(path.join(import.meta.dirname, '../docs'), { recursive: true });
fs.writeFileSync(path.join(import.meta.dirname, '../docs/service-seo-import-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
