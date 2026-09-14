Implemented: September 10, 2026

- `/sitemap.xml`: 155 unique URLs (7 main pages, 21 services, 7 locations, 120 blogs).
- `/robots.txt` references the sitemap and excludes the public reviews API from crawling.
- All existing blog, service and location slugs are prerendered at build time.
- Blog canonicals point to the actual `/blogs/{slug}/` routes rather than legacy WordPress URLs.
- Location and booking pages have specific metadata. Booking links to WhatsApp.
- Card summaries replace full article/service imports in four client components.
  Source data is 1,264,548 bytes; generated summaries are 57,117 bytes. These are
  uncompressed data sizes, not a measured network-transfer or Lighthouse improvement.
- `predev` and `prebuild` regenerate summaries. After editing `site.ts` during a
  running development session, run `node scripts/build-card-data.mjs` to refresh cards.
- Below-fold FAQ and blog showcase images no longer preload.
- Reviews upstream requests time out after five seconds and no longer expose
  configuration or upstream error details in public responses.
- Security headers prevent framing, disable object embeds, constrain base/form
  destinations, disable camera/microphone/geolocation, and disable MIME sniffing.
  This is a baseline CSP, not a strict script-src XSS policy.
- npm production dependency audit reported zero known vulnerabilities at check time.

Deployment verification still required:

- Deploy a production build behind HTTPS; configure CDN caching, request limits,
  DDoS/WAF protection and HSTS at the hosting layer. These are not configured by local code.
- Keep server-only Google credentials out of NEXT_PUBLIC variables; restrict the
  key to its required API and apply provider quotas.
- Submit `https://sarabeauty.ae/sitemap.xml` to Search Console and check redirects
  from old WordPress blog URLs when switching the production site.
- Run mobile/desktop PageSpeed tests against the deployed build and verify real
  field data: LCP <= 2.5 seconds, INP <= 200 ms, CLS <= 0.1 at the 75th percentile.
  No Core Web Vitals pass or lab score has been measured in this workspace.
- The prior headless browser connection timed out; hydration was not browser-verified.
- No application can be guaranteed immune to every attack. Re-run dependency
  audits and patch regularly; this work is not a penetration-test certification.
