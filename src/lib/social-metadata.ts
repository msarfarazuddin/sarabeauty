import type { Metadata } from "next";

export function socialMetadata(title: string, description: string, path: string, image = "/assets/sara-banner-1.webp"): Pick<Metadata, "openGraph" | "twitter"> {
  const url = new URL(path, "https://sarabeauty.ae").href;
  const images = [{ url: new URL(image, "https://sarabeauty.ae").href, alt: title }];
  return {
    openGraph: { type: "website", siteName: "Sara Beauty", locale: "en_AE", title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
