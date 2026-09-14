import { AboutHero } from "@/app/about/banner";
import { AboutWhyChooseSection } from "@/app/about/why-choose-section";
import { PageSchema } from "@/components/page-schema";
import { pageMetadata } from "@/data/page-seo";

export const metadata = pageMetadata("/about-us");

export default function AboutPage() {
  return (
    <main className="w-full">
      <PageSchema route="/about-us" />
      <AboutHero />
      <AboutWhyChooseSection />
    </main>
  );
}
