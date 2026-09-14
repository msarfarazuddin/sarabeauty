
import { BookingLink } from "@/components/booking-link";
import { PageSchema } from "@/components/page-schema";
import { pageMetadata, servicesIntro, servicesIntroLinks } from "@/data/page-seo";
import { ContextualLinks } from "@/components/contextual-links";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ServicesFAQSection } from "@/app/services/services-faq-section";
import { allServices } from "@/data/site";

const commonPrices = [
  { label: "Single Session 60 min", price: "(AED 249)" },
  { label: "Single Session 90 min", price: "(AED 299)" },
];

const serviceImages: Record<string, string> = {
  "post-lymphatic-massage":
    "/assets/post-lymphatic-package_0848b4eb_ed7c09de.webp",

  "deep-tissue-massage":
    "/assets/deep-tissue-massage_1d8df029_5125d682.jpg",

  "sports-massage":
    "/assets/sports-package_ba238771_aa369b9e.jpg",

  "combination-massage":
    "/assets/combination-massage_4162948e_12c882b5.jpg",

  "prenatal-massage":
    "/assets/imgi_94_IMAGE1-2_2a9d6522_04bf09bb.jpg",

  "face-massage":
    "/assets/imgi_95_IMAGE1-3_36812fc6_882b753b.jpg",

  "himalaya-signature-massage":
    "/assets/imgi_104_Himalayan_14b7904a_61f2553e.jpg",

  "brazilian-lymphatic-slimming-massage":
    "/assets/brazilian-lymphatic-package_6a565047_6ddd9693.webp",

  maderotherapy:
    "/assets/maderotherapy-package_7168a6cb_6efa67ab.webp",

  "aromatherapy-massage":
    "/assets/aromatherapy-package_ee674f5e_c6ad97a8.webp",

  "foot-reflexology":
    "/assets/imgi_96_foot_be9ceec9_99f429b3.jpg",

  "hot-stone": "/assets/stone.jpg",

  "postnatal-massage":
    "/assets/imgi_102_Postnatal_33e9b9e7_910895d5.jpg",

  "manicures-and-pedicures-exfoliate":
    "/assets/imgi_105_Manicures_06434394_31a34f97.jpg",

  "brazilian-maderotherapy":
    "/assets/brazilian-maderotherapy-package_a615ff01_f32e7adf.webp",

  "relaxing-massage":
    "/assets/relaxing-package_6da7240f_56537024.webp",

  "face-maderotherapy":
    "/assets/face-maderotherapy-package_899cea61_eaac307d.webp",

  "thai-massage-without-oil":
    "/assets/thai-package_75094538_ee51fd60.jpg",

  "full-body-scrub":
    "/assets/imgi_87_WhatsApp-Image-2025-07-07-at-12.42.45_8e4c755f_cc17ae3c_35d869e2.jpg",

  "dry-cupping-therapy": "/assets/cub.jpg",

  "ayurvedic-massage":
    "/assets/ayurvedic-massage-abu-dhabi_9f28c635_35893cd3.jpg",
};

function getServiceExcerpt(description: string) {
  const cleanDescription = description
    .replace(/â€™/g, "'")
    .replace(/\s+/g, " ");

  return cleanDescription.length > 128
    ? `${cleanDescription.slice(0, 124).trim()}...`
    : cleanDescription;
}

export const metadata = pageMetadata("/services");

export default function ServicesPage() {
  return (
    <div className="w-full bg-[#395E4C] text-white">
      <PageSchema route="/services" />
      {/* ==================================================
          HERO
      ================================================== */}
      <section
        className="
          relative
          -mt-[120px]
          overflow-hidden
          bg-[#fbf7e5]

          sm:-mt-[128px]
          lg:-mt-[108px]
        "
      >
        <h1 className="sr-only">Massage Services in Abu Dhabi</h1>
        {/* ==================================================
            DESKTOP / TABLET BANNER
        ================================================== */}
        <div
          className="
            relative
            hidden
            w-full
            md:block

            md:aspect-[1909/1050]
          "
        >
          <Image
            src="/assets/services-1.png"
            alt="Massage services in Abu Dhabi"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />

          {/* Hero Content */}
          <div
            className="
              absolute
              inset-0
              z-10
              mx-auto
              w-full
            "
          >
            <div
              className="
                mx-auto
                w-full
                max-w-[1360px]
                px-8

                pt-[185px]

                lg:px-10
                lg:pt-[190px]

                xl:px-14
                xl:pt-[200px]

                2xl:pt-[215px]
              "
            >
              <div className="max-w-[950px]">
                <p
                  className="
                    text-[44px]
                    leading-[0.98]
                    text-[#395E4C]

                    lg:text-[54px]
                    xl:text-[62px]
                  "
                  style={{
                    fontFamily: "var(--font-display), serif",
                  }}
                >
                  Massage Services in Abu Dhabi
                </p>

                <p
                  className="
                    mt-5
                    max-w-[950px]
                    text-[24px]
                    leading-[1.2]
                    text-[#111111]

                    lg:text-[27px]
                    xl:text-[30px]
                  "
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                  }}
                >
                  Sara Beauty Massage Treatments for Relaxation &amp; Wellness
                </p>

                <p
                  className="
                    mt-7
                    max-w-[890px]
                    text-[14px]
                    leading-[1.75]
                    text-[#5d5d5d]

                    lg:text-[15px]
                    xl:text-[16px]
                  "
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                  }}
                >
                  Explore Sara Beauty&apos;s spa and massage treatments in Abu
                  Dhabi, from Deep Tissue and Sports Massage to Relaxing,
                  Aromatherapy, Lymphatic Drainage, Prenatal, Thai and Hot Stone
                  Massage. Each treatment is designed around different wellness
                  needs, helping you choose the right option for relaxation,
                  recovery, muscle tension and overall wellbeing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            MOBILE HERO
        ================================================== */}
        <div className="relative min-h-[650px] md:hidden">
          <Image
            src="/assets/services-1.png"
            alt="Massage services in Abu Dhabi"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[67%_center]"
          />

          {/* Mobile fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf7e5]/95 via-[#fbf7e5]/75 to-transparent" />

          <div className="relative z-10 px-5 pb-16 pt-[200px] sm:px-8">
            <div className="max-w-[600px]">
              <p
                className="text-[31px] leading-[1] text-[#395E4C] md:text-[46px]"
                style={{
                  fontFamily: "var(--font-display), serif",
                }}
              >
                Massage Services in Abu Dhabi
              </p>

              <p
                className="mt-4 text-[21px] leading-[1.2] text-[#111]"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                }}
              >
                Sara Beauty Massage Treatments for Relaxation &amp; Wellness
              </p>

              <p
                className="mt-6 max-w-[520px] text-[14px] leading-[1.7] text-[#555]"
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                }}
              >
                Explore Sara Beauty&apos;s spa and massage treatments in Abu
                Dhabi, from Deep Tissue and Sports Massage to Relaxing,
                Aromatherapy, Lymphatic Drainage, Prenatal, Thai and Hot Stone
                Massage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          INTRO
      ================================================== */}
      <section className="bg-[#fbf8ea] px-5 py-10 text-center sm:px-8 sm:py-12">
        <div className="mx-auto max-w-[1200px]">
          <h2
            className="text-[30px] leading-[1.1] text-[#395E4C] sm:text-[38px] lg:text-[44px]"
            style={{
              fontFamily: "var(--font-display), serif",
            }}
          >
            Massage Treatments &amp; Wellness Services in Abu Dhabi
          </h2>

          <p
            className="mx-auto mt-4 max-w-[900px] text-[14px] leading-[1.7] text-[#5d5d5d] sm:text-[15px]"
            style={{
              fontFamily: "var(--font-body), sans-serif",
            }}
          >
            <ContextualLinks text={servicesIntro} links={servicesIntroLinks} />
          </p>
        </div>
      </section>

      {/* ==================================================
          SERVICES
      ================================================== */}
      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {allServices.map((service) => (
            <article
              key={service.slug}
              className="
                group
                rounded-[28px]
                p-3
                transition-colors
                duration-300
                hover:bg-[#395E4C]
              "
            >
              {/* IMAGE */}
              <div className="relative aspect-[1.5] w-full overflow-hidden border-2 border-[#e7ddae] bg-[#395E4C]">
                <Image
                  src={
                    serviceImages[service.slug] ??
                    "/assets/services-1_0c4581dd_7a488f2e.png"
                  }
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-b from-transparent via-[#395E4C]/60 to-[#395E4C]" />

                {/* Title */}
                <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                  <h3 className="text-center text-[22px] font-bold leading-tight text-white">
                    {service.name}
                  </h3>
                </div>
              </div>

              {/* DETAILS */}
              <div className="px-1 pb-2 pt-7">
                <p className="min-h-[104px] text-[17px] leading-[1.55] text-white sm:text-[18px]">
                  {getServiceExcerpt(service.description)}{" "}
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[#e7ddae] transition hover:text-white"
                  >
                    Read More
                  </Link>
                </p>

                {/* Prices */}
                <div className="mt-7 space-y-2 text-[16px] text-white sm:text-[17px]">
                  {commonPrices.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-[1fr_auto] gap-4"
                    >
                      <span>{item.label}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Book */}
                <BookingLink service={service.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    rounded-[9px]
                    border-2
                    border-[#e7ddae]
                    px-4
                    py-2
                    text-[18px]
                    text-white
                    transition
                    hover:bg-[#e7ddae]
                    hover:text-[#395E4C]
                  "
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Book Now
                </BookingLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ==================================================
          FAQ
      ================================================== */}
      <ServicesFAQSection />
    </div>
  );
}
