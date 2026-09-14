# Website optimization audit

Scope: local Next.js production build, September 11, 2026. These changes have not been deployed to the public website.

## Changes

- Replaced the homepage's separate desktop image and mobile CSS background with an optimized responsive picture. The browser downloads the appropriate banner, with high fetch priority for the main image.
- Removed unnecessary FAQ image preload, optimized logos and therapist images, and supplied responsive image sizes.
- Reduced the packages background from 401,098 to 20,652 bytes (94.9%) and made it lazy-loading. Originals are retained.
- Removed the full blog summary dataset from the global navigation bundle and moved static showcase components to server rendering.
- Added one-day caching with stale revalidation for public assets; fingerprinted Next.js bundles retain framework caching.
- Matched canonical URLs and sitemap URLs to trailing-slash routing. Next.js permanently redirects the alternate URL form.
- Added page-specific Open Graph/Twitter previews, a location directory description, blog article/breadcrumb structured data, and a working favicon. Corrected missing/duplicate main headings and accessibility labels/contrast.
- Expanded Content Security Policy to restrict resource origins, added HSTS, and retained MIME-sniffing, framing, referrer and permissions protections.

Canonical URL alignment follows [Google Search Central's guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). Next.js implementation was checked against the installed version's documentation.

## Verification

- Production build and ESLint pass.
- `reports/site-audit.json`: 156 rendered pages, 11,023 link occurrences and 175 unique local image references; no detected broken internal links or missing images. All 156 page URLs respond with HTTP 200. Sitemap, robots, favicon and unknown-page HTTP 404 checked.
- Existing service SEO verifier: 20 pages, 144 FAQ entries, 55 contextual links and 10 destinations pass.
- Existing blog image verifier: 120 mappings, exact filenames and image decoding pass.
- Chrome service hydration checks: 20 FAQ interactions, desktop Services dropdown and mobile menu open/close pass with no browser runtime/console errors. Mobile screenshot saved as navigation-mobile.png.
- npm audit: zero known vulnerabilities across production and development dependencies at audit time.
- Homepage compressed JavaScript: 218,972 → 202,263 bytes (7.6% reduction). See performance-baseline.json and performance-after.json. This measures script transfer weight, not a guaranteed load-time improvement.
- Final mobile Lighthouse: performance 79, accessibility 100, best practices 100, SEO 100. LCP 3.7 seconds, total blocking time 420 ms, layout shift 0. See lighthouse-mobile-final.json. These are local simulated lab measurements, not live Core Web Vitals.
- Desktop Lighthouse: performance 99, accessibility 100, best practices 100, SEO 100. LCP 0.8 seconds, total blocking time 10 ms, layout shift 0. See lighthouse-desktop.json.

Lighthouse wrote valid reports without an audit runtimeError, then its Windows temporary-profile cleanup returned EPERM. The report results are retained; the CLI exit status itself is not recorded as a clean pass.

## Remaining deployment checks

- Mobile performance still has room for improvement; the measured result is 79, not a claim of 100. Confirm mobile Core Web Vitals on the deployed HTTPS site and its real hosting/CDN.
- The 36 external URLs are recorded, but WhatsApp account ownership and Google Maps availability could not be verified through automated browsing. Two different WhatsApp destination numbers already exist in the site's data; confirm the intended business numbers before changing them.
- CSP permits inline hydration scripts/styles to preserve static Next.js rendering. It restricts origins but is not a nonce-based strict CSP or a guarantee against all XSS. Google Maps frames are explicitly allowed. HSTS takes effect over HTTPS.
- Hosting TLS, backups, firewall/rate limiting, production API-key restrictions and Search Console ownership/submission require access to the deployed environment and were not changed here.
- No ranking, rich-result eligibility, complete security or field performance guarantee is implied by the checks.

## Repeat checks

```text
npm run build
npm run lint
npm run start -- --port 3100
npm run audit:site -- http://localhost:3100
npm run audit:weight
node scripts/verify-service-seo.mjs http://localhost:3100
node scripts/verify-blog-images.mjs
node scripts/check-service-hydration.mjs http://localhost:3100
npm audit
```

Run the server in a separate terminal. Browser checks use installed Chrome. Build regenerates card datasets automatically.
