import imageReplacements from "./blog-images.json";

// Match by blog slug, not list position: imported posts can share an old image path.
export function getBlogImage(image: string, slug?: string) {
  return (imageReplacements as Record<string, string>)[slug ?? ""] ?? image;
}
