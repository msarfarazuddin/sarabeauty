import type { MetadataRoute } from "next";
import { allPosts, allServices, allLocations } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sarabeauty.ae";
  // Use the sitemap generation date when content has no recorded update date.
  const fallbackModified = new Date();
  return [
    ...["", "/about-us", "/services", "/locations", "/blogs", "/packages", "/contact", "/book-now"].map(path => ({ url: `${base}${path}/`, lastModified: fallbackModified })),
    ...allServices.map(service => ({ url: `${base}/services/${service.slug}/`, lastModified: fallbackModified })),
    ...allLocations.map(location => ({ url: `${base}/locations/${location.slug}/`, lastModified: fallbackModified })),
    ...allPosts.map(post => {
      const modified = new Date(post.modifiedAt || post.publishedAt);
      return { url: `${base}/blogs/${post.slug}/`, lastModified: Number.isNaN(modified.getTime()) ? fallbackModified : modified };
    }),
  ];
}
