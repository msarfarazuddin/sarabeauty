import { getImageProps } from "next/image";

export function HomeHeroImage() {
  const { props: desktop } = getImageProps({ src: "/assets/sara-banner-1.webp", alt: "Sara Beauty treatment", width: 1920, height: 1162, sizes: "100vw", loading: "eager", fetchPriority: "high" });
  const { props: mobile } = getImageProps({ src: "/assets/mobilebanner.webp", alt: "Sara Beauty treatment", width: 600, height: 700, sizes: "150vw" });
  return (
    <picture className="home-hero-picture absolute inset-0 overflow-hidden">
      <source media="(max-width: 767px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
      {/* getImageProps supplies optimized sources and intrinsic dimensions. */}
      <img {...desktop} alt={desktop.alt} className="home-hero-image" />
    </picture>
  );
}
