import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = process.argv[2] || "C:/Users/AspireDigital/Downloads/SARA_BEAUTY_MASTER_BLOG_DATA_FOR_CODEX.json";
const sitePath = path.join(root, "src/data/site.ts");

const master = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const publishedBlogs = master.publishedBlogs.filter((post) => post.status === "publish");
const blogSlugs = new Set(publishedBlogs.map((post) => post.slug));

const serviceRedirects = {
  "ayurvedic-massage-abu-dhabi": "ayurvedic-massage",
  "cupping-therapy": "dry-cupping-therapy",
  "post-lymphatic-drainage-massage": "post-lymphatic-massage",
  "post-natal-massage": "postnatal-massage",
};

function normalizeInternalHref(href) {
  if (/^(tel:|mailto:|sms:|whatsapp:)/i.test(href)) return href;

  let url;
  try {
    url = new URL(href, "https://sarabeauty.ae");
  } catch {
    return href;
  }

  if (!/(^|\.)sarabeauty\.ae$/i.test(url.hostname)) return href;

  const hash = url.hash || "";
  let pathname = url.pathname.replace(/\/{2,}/g, "/");
  if (pathname !== "/" && pathname.endsWith("/")) pathname = pathname.slice(0, -1);

  if (pathname === "/contact-us") pathname = "/contact";
  if (pathname.startsWith("/service/")) {
    const slug = pathname.slice("/service/".length);
    pathname = `/services/${serviceRedirects[slug] || slug}`;
  } else if (pathname !== "/" && !pathname.startsWith("/blogs/")) {
    const slug = pathname.slice(1);
    if (blogSlugs.has(slug)) pathname = `/blogs/${slug}`;
  }

  return `${pathname || "/"}${hash}`;
}

function normalizeHtml(html = "") {
  const linkedHtml = html.replace(/\s(?:target|rel)="[^"]*"/gi, "").replace(
    /\shref=(["'])(.*?)\1/gi,
    (_match, quote, href) => ` href=${quote}${normalizeInternalHref(href)}${quote}`,
  );

  // Several WordPress exports contain loose text between headings instead of
  // paragraphs. Browsers collapse those line breaks, making complete sections
  // and FAQ answers look missing. Preserve each exported text block explicitly.
  const blockTag = /^<\/?(?:address|article|aside|blockquote|div|details|dl|dt|dd|fieldset|figcaption|figure|footer|form|h[1-6]|header|hr|li|main|nav|ol|p|pre|section|summary|table|thead|tbody|tfoot|tr|th|td|ul)\b/i;

  return linkedHtml
    .split(/\r?\n/)
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed || blockTag.test(trimmed) || /^<!--/.test(trimmed)) return line;
      return `<p>${trimmed}</p>`;
    })
    .join("\n");
}

const comparisonSlug = "top-home-massage-centers-in-abu-dhabi-luxury-wellness";

function removeCompetitorPrices(html) {
  let updated = html.replace(/<tr>([\s\S]*?)<\/tr>/gi, (row) => {
    const cells = [...row.matchAll(/<t[hd]>[\s\S]*?<\/t[hd]>/gi)];
    if (cells.length !== 4) return row;
    return row.replace(cells[1][0], "");
  });

  const replacements = [
    ["each with different pricing, treatment options", "each with different treatment options"],
    ["based on your preferred treatment, budget, therapist preference, and booking style", "based on your preferred treatment, therapist preference, location, and booking style"],
    ["Some providers focus on affordable sessions, while others specialize", "Some providers focus on convenient booking, while others specialize"],
    ["Prices and service details were checked in July 2026. Rates, areas, and appointment times may change", "Service details were reviewed in July 2026. Treatment menus, coverage areas, and appointment times may change"],
    ["depends on more than just the price", "depends on more than a single feature"],
    ["2. Urban Company: Clear Prices and Quick Online Booking", "2. Urban Company: Quick Online Booking"],
    ["Women who want published prices, several session lengths, and app-based booking", "Women who want several session lengths and app-based booking"],
    ["Clear prices and app booking", "Simple app-based booking"],
    ["Single-session prices should be confirmed before booking.", "Current session details should be confirmed before booking."],
    ["6. REVA: Full Home-Spa Setup and Fixed Session Prices", "6. REVA: Full Home-Spa Setup"],
    ["Clients who want a fuller setup at home and clear prices for longer appointments", "Clients who want a fuller setup at home and a choice of appointment lengths"],
    ["For lower published starting prices:", "For convenient app-based booking:"],
    ["Some focus on low starting prices, while others offer", "Some focus on convenient booking, while others offer"],
    ["matches your budget, preferred therapist", "matches your preferred therapist"],
    ["compares active providers by published prices, treatment menus", "compares active providers by treatment menus"],
    ["Session length and total price", "Session length and booking details"],
    ["whether the final price matched the booking", "whether the delivered service matched the booking"],
    ["service area, and final price", "service area, and booking details"],
    ["Always confirm the final price and service details", "Always confirm the appointment and service details"],
  ];

  for (const [from, to] of replacements) updated = updated.replaceAll(from, to);

  updated = updated
    .replace(/<p>Urban Company lists massage services([\s\S]*?)<\/p>/i, "<p>Urban Company lists several massage styles and appointment lengths for women in Abu Dhabi. Available treatments and time slots can be reviewed during online booking.</p>")
    .replace(/<p>ServiceMarket works as a booking marketplace([\s\S]*?)<\/p>/i, "<p>ServiceMarket works as a booking marketplace rather than one physical massage center. Its Abu Dhabi listings allow users to review several women’s home massage options in one place.</p>")
    .replace(/<p>Beutics offers home massage([\s\S]*?)<\/p>/i, "<p>Beutics offers home massage and spa bookings in Abu Dhabi and other UAE cities, with female therapists listed for women’s bookings.</p>")
    .replace(/<p>Many standard massage pages show prices([\s\S]*?)<\/p>/i, "<p>The provider lists multiple appointment lengths and specialist treatments. Confirm the current treatment menu and availability directly before booking.</p>")
    .replace(/<p>REVA offers home massage([\s\S]*?)<\/p>/i, "<p>REVA offers home massage in Abu Dhabi, including relaxation, lymphatic drainage, aromatherapy, deep tissue, sports, reflexology, Thai, prenatal, and postnatal treatments.</p>")
    .replace(/<p>Public prices were not clear([\s\S]*?)<\/p>/i, "<p>Clients should confirm the session length, appointment area, therapist availability, and items included directly before booking.</p>")
    .replace(/<p><strong>For convenient app-based booking:<\/strong>([\s\S]*?)<\/p>/i, "<p><strong>For convenient app-based booking:</strong> Urban Company offers online treatment selection and appointment scheduling.</p>")
    .replace(/<h2>How Much Does a Home Massage Service Cost in Abu Dhabi\?<\/h2>[\s\S]*?(?=<h2>What Should You Check Before Booking\?<\/h2>)/i, "<h2>What Should You Confirm Before Booking?</h2>\n<p>Ask the provider to confirm the treatment, session length, therapist availability, equipment, service area, arrival window, and cancellation terms before you book. For current charges or package details, contact the provider directly rather than relying on third-party comparisons.</p>\n")
    .replace(/<h3>What is the cheapest home massage option in Abu Dhabi\?<\/h3>\s*<p>[\s\S]*?<\/p>/i, "<h3>How should I compare home massage providers in Abu Dhabi?</h3>\n<p>Compare treatment options, therapist preference, appointment availability, hygiene standards, equipment, service coverage, and recent client feedback. Contact the provider directly for current booking details.</p>");

  return updated;
}

function contentFor(post) {
  const html = normalizeHtml(post.contentHtml || post.originalWordPressHtml || "");
  return post.slug === comparisonSlug ? removeCompetitorPrices(html) : html;
}

function imagePath(post) {
  const value = post.featuredImage?.url;
  if (!value) return "/assets/hero.webp";
  try {
    return `/assets/${decodeURIComponent(new URL(value).pathname.split("/").pop())}`;
  } catch {
    return value;
  }
}

function category(post) {
  return post.categories?.[0]?.name || "Massage";
}

const posts = publishedBlogs.map((post) => ({
  slug: post.slug,
  title: post.slug === comparisonSlug ? "7 Best Home Massage Services in Abu Dhabi: Treatments & Reviews" : post.title,
  excerpt: post.slug === comparisonSlug
    ? "Compare home massage services in Abu Dhabi by treatments, therapist options, booking methods, and the type of experience each provider may suit."
    : post.excerpt || post.seo?.metaDescription || "",
  category: category(post),
  categories: (post.categories || []).map((item) => item.name),
  tags: (post.tags || []).map((item) => typeof item === "string" ? item : item.name).filter(Boolean),
  author: post.author || "Sara Beauty",
  publishedAt: post.publishedAt,
  modifiedAt: post.modifiedAt,
  image: imagePath(post),
  metaTitle: post.slug === comparisonSlug ? "7 Best Home Massage Services in Abu Dhabi | Treatments" : post.seo?.metaTitle || post.title,
  metaDescription: post.slug === comparisonSlug
    ? "Compare home massage services in Abu Dhabi by treatments, therapist options, booking methods, and the type of experience each provider may suit."
    : post.seo?.metaDescription || post.excerpt || "",
  focusKeyword: post.seo?.focusKeyword || undefined,
  keywords: post.seo?.keywords || [],
  canonical: post.seo?.canonical || post.url,
  seo: {
    title: post.slug === comparisonSlug ? "7 Best Home Massage Services in Abu Dhabi | Treatments" : post.seo?.metaTitle || post.title,
    description: post.slug === comparisonSlug
      ? "Compare home massage services in Abu Dhabi by treatments, therapist options, booking methods, and the type of experience each provider may suit."
      : post.seo?.metaDescription || post.excerpt || "",
    focusKeyword: post.seo?.focusKeyword || undefined,
    keywords: post.seo?.keywords || [],
    canonical: post.seo?.canonical || post.url,
  },
  contentHtml: contentFor(post),
  schemaRawCode: post.schema?.rawCode || undefined,
}));

const site = fs.readFileSync(sitePath, "utf8");
const replacement = `export const featuredPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};\n\n`;
const updated = site.replace(
  /export const featuredPosts: BlogPost\[] = [\s\S]*?\n(?=export const (?:serviceAreas|allPosts))/,
  replacement,
);

if (updated === site) {
  throw new Error("Could not find featuredPosts block in src/data/site.ts");
}

fs.writeFileSync(sitePath, updated);
console.log(`Imported ${posts.length} published blogs from ${sourcePath}`);
