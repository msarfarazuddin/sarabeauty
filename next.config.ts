import type { NextConfig } from "next";
import blogData from "./src/data/card-data.json";

const isDevelopment = process.env.NODE_ENV === "development";
// Static Next.js pages use inline hydration scripts; keep prerendering and
// restrict their origin without forcing every page into nonce-based SSR.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
  "frame-src https://www.google.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const legacyLocationSlugs = [
  "al-bateen",
  "saadiyat-island",
  "al-maryah-island",
  "corniche-area",
  "khalidiya",
  "al-reem-island",
  "khalifa-city",
];

const legacyServiceRedirects: Record<string, string> = {
  "aromatherapy-massage": "aromatherapy-massage",
  "ayurvedic-massage-abu-dhabi": "ayurvedic-massage",
  "brazilian-lymphatic-slimming-massage": "brazilian-lymphatic-slimming-massage",
  "brazilian-maderotherapy": "brazilian-maderotherapy",
  "combination-massage": "combination-massage",
  "cupping-therapy": "dry-cupping-therapy",
  "deep-tissue-massage": "deep-tissue-massage",
  "face-maderotherapy": "face-maderotherapy",
  "face-massage": "face-massage",
  "foot-reflexology": "foot-reflexology",
  "full-body-scrub": "full-body-scrub",
  "himalaya-signature-massage": "himalaya-signature-massage",
  "hot-stone": "hot-stone",
  "maderotherapy": "maderotherapy",
  "manicures-and-pedicures-exfoliate": "manicures-and-pedicures-exfoliate",
  "post-lymphatic-drainage-massage": "post-lymphatic-massage",
  "post-natal-massage": "postnatal-massage",
  "prenatal-massage": "prenatal-massage",
  "relaxing-massage": "relaxing-massage",
  "sports-massage": "sports-massage",
  "thai-massage-without-oil": "thai-massage-without-oil",
};

const legacyBlogSlugs = [
  "10-must-try-treatments-at-sara-beauty-home-spa",
  "20-top-home-massage-services-for-women-in-abu-dhabi",
  "affordable-deep-tissue-massage-near-me-in-abu-dhabi",
  "aromatherapy-for-women-complete-guide",
  "ayurvedic-massage-in-abu-dhabi-ancient-healing-for-modern-stress",
  "best-home-massage-service-for-women-in-abu-dhabi-2026",
  "best-massage-center",
  "best-massage-service-for-women-living-in-abu-dhabi",
  "best-massage-spas-wellness-centers-in-abu-dhabi",
  "best-massages-to-try-abu-dhabi",
  "best-mother-home-spa-in-abu-dhabi",
  "best-postnatal-massage-abu-dhabi",
  "best-spa-for-women-in-abu-dhabi",
  "best-thai-massage-without-oil-abu-dhabi",
  "brazilian-lymphatic-massage-in-abu-dhabi",
  "brazilian-lymphatic-slimming-massage",
  "brazilian-maderotherapy-abu-dhabi",
  "combination-massage-a-holistic-approach-to-wellness",
  "deep-tissue-massage-abu-dhabi-benefits-price",
  "deep-tissue-massage-at-home-in-abu-dhabi",
  "deep-tissue-massage-can-improve-posture-and-flexibility",
  "deep-tissue-massage-case-study-abu-dhabi",
  "deep-tissue-massage-in-abu-dhabi-expert-pain-relief",
  "deep-tissue-medical-massage-services-in-abu-dhabi",
  "economical-relaxing-massage-centers-near-me",
  "experience-home-massage-spa-in-abu-dhabi",
  "here-are-5-reasons-you-should-consider-a-home-spa-massage-in-abu-dhabi-if-youre-stressed-out",
  "home-massage-abu-dhabi-affordable-private-spa",
  "home-massage-home-spa-beauty-services-near-me",
  "home-massage-ladies-abu-dhabi",
  "home-massage-spa-services-in-abu-dhabi",
  "home-spa-services-abu-dhabi-women",
  "how-much-should-you-pay-for-a-high-quality-massage-in-abu-dhabi",
  "luxury-home-spa-in-abu-dhabi",
  "luxury-sara-beauty-home-spa-services-in-abu-dhabi",
  "lymphatic-drainage-massage-abu-dhabi",
  "massage-and-spa-centers",
  "massage-and-spa-for-women-in-abu-dhabi",
  "massage-as-stress-therapy-abu-dhabi",
  "moroccan-bath-in-abu-dhabi",
  "popular-massage-at-home-abu-dhabi",
  "post-lymphatic-massage-abu-dhabi",
  "premier-sports-massage-in-abu-dhabi",
  "relax-and-rejuvenate-the-best-aromatherapy-in-abu-dhabi",
  "relax-home-massage-in-abu-dhabi",
  "relaxing-home-massage-abu-dhabi-case-study",
  "relaxing-home-spa-massage-in-abu-dhabi",
  "relaxing-massage-in-abu-dhabi-from-sara-beauty",
  "sara-beauty-abu-dhabi-review",
  "sara-beauty-best-home-spa-choice-in-abu-dhabi",
  "sara-beautys-spa-and-massage",
  "should-you-get-a-relaxing-massage-daily-or-weekly",
  "spa-and-massage-places",
  "spa-vs-therapy-which-is-right",
  "sports-massage-abu-dhabi-boost-recovery",
  "techniques-benefits-of-combination-massage-at-sara-beauty",
  "top-15-home-massage-and-spa-services-for-women",
  "top-5-home-spa-massage-abu-dhabi",
  "top-5-spa-wellness-face-massage-for-women-in-abu-dhabi",
  "top-dry-cupping-therapy-hijama-in-abu-dhabi",
  "top-home-massage-centers-in-abu-dhabi-luxury-wellness",
  "top-hot-stone-massages-near-me-in-abu-dhabi",
  "top-places-relaxing-massage-abu-dhabi-sara-beauty",
  "total-relaxing-massage-in-abu-dhabi-by-sara-beauty",
];

const allBlogSlugs = Array.from(
  new Set([...legacyBlogSlugs, ...blogData.posts.map((post) => post.slug)]),
);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/contact-us/", destination: "/contact/", permanent: true },
      { source: "/blogs/page/23/", destination: "/blogs/", permanent: true },
      { source: "/category/home-massage-services/", destination: "/blogs/", permanent: true },
      ...legacyLocationSlugs.map((slug) => ({
        source: `/${slug}/`,
        destination: `/locations/${slug}/`,
        permanent: true,
      })),
      ...Object.entries(legacyServiceRedirects).map(([source, destination]) => ({
        source: `/service/${source}/`,
        destination: `/services/${destination}/`,
        permanent: true,
      })),
      ...allBlogSlugs.map((slug) => ({
        source: `/${slug}/`,
        destination: `/blogs/${slug}/`,
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000" },
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
    ] }, { source: "/assets/:path*", headers: [
      { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
    ] }];
  },
};

export default nextConfig;
