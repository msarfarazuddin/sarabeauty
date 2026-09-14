
import { BookingLink } from "@/components/booking-link";
import { PageSchema } from "@/components/page-schema";
import { pageMetadata } from "@/data/page-seo";
import Link from "next/link";
import { AboutWhySection } from "@/components/about-why-section";
import { AreasShowcase } from "@/components/areas-showcase";
import { BlogShowcase } from "@/components/blog-showcase";
import { CtaBanner } from "@/components/cta-banner";
import { MapSection } from "@/components/map-section";
import { PackagesTabs } from "@/components/packages-tabs";
import { ReviewsShowcase } from "@/components/reviews-showcase";
import { SignatureProcedures } from "@/components/signature-procedures";
import { FAQSection } from "@/components/faq-section";
import { HomeHeroImage } from "@/components/home-hero-image";

export const metadata = pageMetadata("/");

export default function Home() {
  return (
    <div className="home-page min-h-screen bg-[var(--color-page)] text-[var(--color-ink)]">
      <PageSchema route="/" />
      <main className="-mt-[120px] sm:-mt-[128px] lg:-mt-[108px]">
        <section className="home-hero relative flex min-h-screen items-end overflow-hidden bg-[#f5f0ea]">
          <HomeHeroImage />
          <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.1)_42%,rgba(245,240,234,0.72)_82%,rgba(245,240,234,0.9)_100%)] md:block" />
          <div className="home-hero-content relative z-10 mx-auto flex w-full max-w-[1440px] items-end px-4 pb-3 pt-[180px] sm:px-6 sm:pb-10 sm:pt-[200px] lg:px-8 lg:pb-5 lg:pt-[220px] xl:px-10">
            <div className="flex w-full min-w-0 flex-col text-center">
              <h1
                className="mx-auto text-[2.9rem] leading-[0.9] text-[var(--color-brand)] font-bold sm:text-[4.2rem] lg:text-[75px] xl:text-[75px]"
                style={{ fontFamily: '"Gallary", var(--font-display), sans-serif' }}
              >
                Massage in Abu Dhabi - <span className="block md:inline">Sara Beauty Spa</span>
              </h1>
              <p className="home-hero-subtitle mx-auto mt-1 text-[1.15rem] leading-none font-semibold text-[var(--color-ink)] sm:mt-2 sm:text-[1.9rem] lg:text-[2.15rem] xl:text-[2.45rem]">
                Relax, Recover &amp; Feel Your Best with Sara Beauty Spa
              </p>
              
              <p className="home-hero-description order-4 mx-auto mt-5 max-w-[1380px] text-balance px-1 text-[0.95rem] leading-[1.55] text-[var(--color-ink)] md:order-none sm:mt-6 sm:text-[1.2rem] sm:leading-[1.6] lg:text-[1.02rem] lg:leading-[1.75] xl:text-[1.05rem]">
                <strong>Looking for a professional massage in Abu Dhabi?</strong> Sara Beauty Spa offers a private, relaxing, and comfortable spa experience with experienced female therapists. Whether you want to ease muscle tension, reduce everyday stress, recover after a workout, or simply take time to unwind, you can explore our
                <Link href="/services" className="underline underline-offset-4"> massage and spa services </Link>and choose the treatment that best suits your needs.
              </p>
              <div className="home-hero-cta mt-5 flex justify-center sm:mt-6">
                <BookingLink
                  className="min-w-[120px] rounded-full bg-[#395E4C] px-5 py-3 text-center text-lg text-white  decoration-white/70 underline-offset-2 transition hover:bg-[var(--color-brand)] sm:min-w-[150px] sm:px-10 sm:text-[1.05rem]"
                >
                  Book Now
                </BookingLink>
              </div>
            </div>
          </div>
        </section>

        <SignatureProcedures />
        <PackagesTabs />
        <AboutWhySection />
        <ReviewsShowcase />
        <CtaBanner />
        <AreasShowcase />
        <MapSection />
        <BlogShowcase />
        <FAQSection />
      </main>
    </div>
  );
}
