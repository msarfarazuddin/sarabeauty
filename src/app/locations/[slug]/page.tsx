import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allLocations } from "@/data/site";
import { getLocationContent } from "@/data/location-content";
import { LocationTemplate } from "@/components/location-template";
import { socialMetadata } from "@/lib/social-metadata";

type LocationPageProps = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = allLocations.find(item => item.slug === slug);
  if (!location) notFound();
  const content = getLocationContent(location);
  return {
    ...socialMetadata(content.metaTitle || `home spa massage in ${location.name} | Sara Beauty`, content.metaDescription || content.intro, `/locations/${slug}/`, content.heroImage),
    title: { absolute: content.metaTitle || `home spa massage in ${location.name} | Sara Beauty` },
    description: content.metaDescription || `Explore Sara Beauty home spa massage and spa treatments in ${location.name}, Abu Dhabi. Contact our team for availability and appointments.`,
    ...(content.focusKeyword ? { keywords: [content.focusKeyword] } : {}),
    alternates: { canonical: `https://sarabeauty.ae/locations/${slug}/` },
  };
}
export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = allLocations.find(item => item.slug === slug);
  if (!location) notFound();
  const content = getLocationContent(location);
  return <>
    {content.structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(content.structuredData).replace(/</g, "\\u003c") }} />}
    <LocationTemplate name={location.name} content={content} />
  </>;
}
export function generateStaticParams() {
  return allLocations.map(item => ({ slug: item.slug }));
}
