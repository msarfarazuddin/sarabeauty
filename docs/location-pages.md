# Location page content

All seven /locations/[slug] pages share src/components/location-template.tsx.
Edit src/data/location-content.ts to supply content one location at a time.
Add fields under the appropriate locationOverrides entry. Omitted fields use
shared defaults with that location's name. Arrays replace the whole section.

Example:
```ts
"al-reem-island": {
  title: "Professional Home Spa Services in Al Reem Island",
  whyParagraphs: ["First paragraph.", "Second paragraph."],
  faqs: [{ question: "Your question?", answer: "Your answer." }],
},
```

LocationContent defines all available fields, including heroImage, benefits,
treatments, differences, bookingTitle and bookingDescription. Use local assets
with ASCII filenames and existing service slugs for treatment links.
Register new locations in serviceAreas in src/data/site.ts as well.

The four supplied location pages are imported from location-pages-source.md into
src/data/location-pages.json. Run node scripts/import-location-content.cjs to regenerate.
Al Reem has 5 FAQs; Al Bateen has 6; Saadiyat and Khalidiya have none.
Cards and schema use the existing dry-cupping-therapy and ayurvedic-massage routes.
The locations index supplies the schema breadcrumb destination and is in the sitemap.
The 23 source service blocks (21 unique services) are retained. Repeated title/alt
labels and repeated FAQ/section headings render once.
Editorial review: the supplied Al Bateen postnatal description repeats face massage
copy. The supplied schema organization phone differs from the site's booking phone.
Both are preserved from the source document.

All seven locations now have supplied content. The importer reads both
location-pages-source.md and location-pages-source-3.md by default.
The second document supplies Corniche Area (3 FAQs), Khalifa City (5 FAQs),
and Al Maryah Island (no FAQs). Al Maryah uses the document's recommended
focus keyword because the original source did not provide one.
Khalifa City's treatment-selection section uses the existing difference section
with its supplied heading, introduction, and four treatment groups.
