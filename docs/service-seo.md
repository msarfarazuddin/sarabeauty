Service detail pages use `src/data/service-seo.json` for the supplied SEO content,
merged over the existing service in `src/data/site.ts`. Other service content,
pricing, images and layout remain in `site.ts`.

Source: `SARA-BEAUTY-CODEX-SEO-INTERNAL-LINKING-FAQ-SCHEMA.md` supplied by the user.
Imported coverage: 20 services, 144 FAQs and 55 contextual internal links.
Postnatal Massage is not included in the supplied document and keeps its existing content.

Source adjustments:

- `/services/ayurvedic-massage-abu-dhabi` maps to the existing `/services/ayurvedic-massage` page.
- `/services/cupping-therapy` maps to the existing `/services/dry-cupping-therapy` page.
- Schema URLs use those existing routes. Home and service-index breadcrumb URLs are preserved.
- Two `YOUR-ACTUAL-LOGO-URL` placeholders use the existing `/assets/color%20logo.png` image.
- Each supplied schema graph is rendered once, replacing the old page schema.
  One FAQPage node is added to that graph from the same answers shown in the accordion.
- Titles, descriptions and FAQ wording are preserved, including source punctuation and repeated text.
- Case differences in anchors preserve the visible original wording.
- The Face Massage source requests overlapping `Face Maderotherapy` and `Maderotherapy`
  anchors to different pages. The longer treatment name links to Face Maderotherapy;
  a short intro cross-reference supplies the separate body Maderotherapy link.
- Post Lymphatic's requested service-index anchor occurs only in its metadata context,
  so a short visible intro cross-reference supplies this link.
- Brazilian Lymphatic's `massage at home` and Brazilian Maderotherapy's `Maderotherapy`
  links use existing FAQ occurrences because their supplied main-copy contexts are absent.
- Face Maderotherapy's Maderotherapy link uses its existing second intro paragraph;
  the supplied context was a source URL, not visible content.

The per-service counts and context adjustments are recorded in
`service-seo-import-report.json`.

Regenerate after changing the source document or service paragraph positions:

```powershell
node scripts/import-service-seo.mjs 'PATH/TO/SARA-BEAUTY-CODEX-SEO-INTERNAL-LINKING-FAQ-SCHEMA.md'
```

Verification with the site running locally:

```powershell
node scripts/verify-service-seo.mjs
node scripts/check-service-hydration.mjs
npx.cmd tsc --noEmit
npm.cmd run build
```

The browser check uses local headless Chrome; set `CHROME_PATH` to an alternative
Chromium executable if needed. The HTML verification checks exact metadata,
FAQ text, original intro text, all contextual links and their destinations,
schema equality, and duplicate metadata/JSON-LD.
