import fs from 'node:fs';
import { allPosts, allServices } from '../src/data/site.ts';

const posts = allPosts.map(({ slug, title, excerpt, category, author, publishedAt, image }) => ({ slug, title, excerpt, category, author, publishedAt, image }));
const services = allServices.map(({ slug, name, description }) => ({ slug, name, description }));
fs.writeFileSync(new URL('../src/data/card-data.json', import.meta.url), JSON.stringify({ posts, services }) + '\n');
fs.writeFileSync(new URL('../src/data/service-card-data.json', import.meta.url), JSON.stringify(services) + '\n');
console.log(`Generated ${posts.length} blog summaries and ${services.length} service summaries.`);
