
import { BookingLink } from "@/components/booking-link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceFaqs } from "@/components/service-faqs";
import { ServiceContentTabs } from "@/components/service-content-tabs";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { allServices } from "@/data/site";
import { serviceSeo } from "@/data/service-seo";
import { ServiceLinkedText } from "@/components/service-linked-text";
import { socialMetadata } from "@/lib/social-metadata";

type ServicePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const original = allServices.find((item) => item.slug === slug);
  if (!original) notFound();
  const seo = serviceSeo[slug];
  const service = { ...original, ...seo };

  return {
    ...socialMetadata(service.metaTitle || `${service.name} | Sara Beauty`, service.metaDescription || service.description, `/services/${slug}/`, service.image),
    ...(service.metaTitle ? { title: { absolute: service.metaTitle } } : {}),
    alternates: { canonical: `https://sarabeauty.ae/services/${slug}/` },
    ...(service.metaDescription ? { description: service.metaDescription } : {}),
  };
}

const fallbackFaqs = [
  { question: "How do I choose the right session?", answer: "Tell us about your comfort and wellness goals when booking, and our team will help you choose a suitable treatment and duration." },
  { question: "How can I book this service?", answer: "Contact Sara Beauty on WhatsApp to check availability and arrange your preferred appointment time." },
];

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const original = allServices.find((item) => item.slug === slug);
  if (!original) notFound();
  const seo = serviceSeo[slug];
  const service = { ...original, ...seo };

  const heroImage = service.image ?? "/assets/services-1_0c4581dd_7a488f2e.png";
  const intro = service.intro ?? [service.description];
  const prices = service.prices ?? [{ duration: "60 min", single: "AED 249", package: "AED 2,299" }, { duration: "90 min", single: "AED 299", package: "AED 2,799" }];
  const pricingColumns = [
    { title: "Single Session", rows: prices.filter((price) => price.single.trim()).map((price) => ({ duration: price.duration, amount: price.single })) },
    { title: "Package of 10", rows: prices.filter((price) => price.package.trim()).map((price) => ({ duration: price.duration, amount: price.package })) },
  ].filter((column) => column.rows.length > 0);
  const sections = service.sections ?? [];
  const pricingTitle = service.pricingTitle ?? `Experience the Healing Power of ${service.name}`;

  return (
    <main className="w-full overflow-hidden bg-white -mt-[34px] sm:-mt-[42px] md:-mt-[110px]">
      {service.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service.structuredData).replace(/</g, "\\u003c") }}
        />
      ) : null}
      <section className="service-detail-hero relative overflow-hidden md:flex md:min-h-svh md:items-end md:pt-[220px]">
        <div className="service-detail-hero-image relative aspect-[1.85/1] w-full md:absolute md:inset-0 md:aspect-auto">
          <Image src={heroImage} alt={service.name} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white md:hidden" />
        </div>
        <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,transparent_30%,rgba(255,255,255,0.35)_55%,white_95%)] md:block" />
        <div className="service-detail-hero-content relative z-10 mx-auto w-full max-w-[1280px] px-3 pb-0 text-center md:px-8 md:pb-10 lg:px-10 lg:pb-0">
          <h1 className={`text-center ${slug === "post-lymphatic-massage" ? "text-[32px]" : "text-[26px]"} leading-[1.1] text-[#395E4C] md:text-[54px] lg:text-[64px]`} style={{ fontFamily: "var(--font-display), serif" }}>{service.heroTitle ?? service.name}</h1>
          <p className="mt-1 text-center text-[20px] font-semibold leading-[1.25] text-[#343434] md:mt-3 md:text-[21px]">{service.heroSubtitle ?? `${service.name} in Abu Dhabi`}</p>
        </div>
      </section>

      <section className="service-detail-intro bg-white px-3 pb-10 pt-2 md:px-8 md:pb-16 md:pt-8 lg:px-10">
        <div className="mx-auto max-w-[1120px] text-left md:text-center">
          <div className="space-y-4 text-justify text-[16px] font-medium leading-[1.5] text-black md:text-center md:font-normal md:leading-[1.75] md:text-[#484848]">{intro.map((paragraph, index) => <p key={paragraph}><ServiceLinkedText text={paragraph} links={seo?.links[`intro.${index}`]} /></p>)}{seo?.extraIntro.map((paragraph, index) => <p key={`extra-${index}`}><ServiceLinkedText text={paragraph} links={seo.links[`extraIntro.${index}`]} /></p>)}</div>
          <BookingLink service={service.name} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex md:mt-7 items-center gap-2 rounded-md bg-[#395E4C] px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-[#395E4C]"><WhatsAppIcon className="h-4 w-4" /> Call Now for Appointment</BookingLink>
        </div>
      </section>

      {pricingColumns.length > 0 && (
        <section className="bg-[#395E4C] px-5 py-16 text-white sm:px-8 lg:py-20">
          <div className="mx-auto max-w-[900px] text-center">
            {pricingTitle && <h2 className="mx-auto max-w-[720px] text-[38px] leading-[1.05] text-[#e8dfb0] sm:text-[50px]" style={{ fontFamily: "var(--font-display), serif" }}>{pricingTitle}</h2>}
            <div className={(pricingTitle ? "mt-10 " : "") + "service-pricing-grid mx-auto grid grid-cols-1 " + (pricingColumns.length === 2 ? "divide-y divide-white/30 md:grid-cols-2 md:divide-x md:divide-y-0" : "w-full max-w-[450px]")}>
              {pricingColumns.map((column) => (
                <div key={column.title} className="px-2 py-8 first:pt-0 last:pb-0 md:px-6 md:py-0">
                  <h3 className="text-[34px] sm:text-[38px]" style={{ fontFamily: "var(--font-display), serif" }}>{column.title}</h3>
                  {column.rows.map((row) => (
                    <p key={row.duration} className="mx-auto mt-6 grid w-full max-w-[280px] grid-cols-[1fr_auto] gap-x-8 whitespace-nowrap text-left text-[19px] leading-[1.6] sm:text-[21px]">
                      <span>{row.duration}</span><span>{row.amount}</span>
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <BookingLink service={service.name} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-md bg-[#e8dfb0] px-6 py-3 text-[16px] font-semibold text-[#395E4C] transition hover:bg-white"><WhatsAppIcon className="h-5 w-5" /> Book Now</BookingLink>
          </div>
        </section>
      )}

      {sections.length ? <ServiceContentTabs sections={sections} links={seo?.links} /> : null}

      {service.faqs?.length || fallbackFaqs.length ? <ServiceFaqs faqs={service.faqs ?? fallbackFaqs} title={service.faqTitle} links={seo?.links} /> : null}

    </main>
  );
}

export function generateStaticParams() {
  return allServices.map(item => ({ slug: item.slug }));
}
