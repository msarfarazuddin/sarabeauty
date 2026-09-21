import Image from "next/image";
import Link from "next/link";
import { PageSchema } from "@/components/page-schema";
import { pageMetadata } from "@/data/page-seo";
import { Mail, MapPin, Phone } from "lucide-react";
import { MapSection } from "@/components/map-section";

const contactItems = [
  { label: "Email", value: "info@sarabeauty.ae", href: "mailto:info@sarabeauty.ae", icon: Mail },
  { label: "Clinic", value: "Khalid bin Waleed Street PO Box 36493\nAbu Dhabi - U.A.E", href: "https://www.google.com/maps?q=Sara+Beauty+Home+Massage+%26+Spa+Service+Abu+Dhabi", icon: MapPin },
  { label: "Customer service", value: "+971 544 297 974", href: "tel:+971544297974", icon: Phone },
];

export const metadata = pageMetadata("/contact");

export default function ContactPage() {
  return (
    <main className="w-full overflow-hidden bg-white -mt-[34px] sm:-mt-[42px] md:-mt-[110px]">
      <PageSchema route="/contact" />
      <section className="contact-hero relative min-h-[390px] overflow-hidden bg-[#eee7bd] pt-[235px] sm:min-h-[420px] sm:pt-[250px] lg:min-h-[455px] lg:pt-[220px]">
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 text-center sm:px-8 lg:px-10">
          <h1 className="text-[46px] leading-none text-[#395E4C] sm:text-[56px] lg:text-[64px]" style={{ fontFamily: "var(--font-display), serif" }}>
            Contact Us
          </h1>
        </div>
        <div className="contact-hero-curve pointer-events-none absolute inset-x-0 bottom-[-1px] h-[90px] sm:h-[105px] lg:h-[120px]">
          <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
            <path d="M0 28C210 28 350 36 515 56C680 76 810 87 985 75C1138 65 1260 46 1440 50V140H0V28Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="bg-white px-5 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
        <p className="mx-auto mb-8 max-w-[1160px] text-center text-[16px] leading-relaxed text-[#395E4C]">Contact Sara Beauty for <Link href="/services" className="underline underline-offset-4">massage and spa treatments</Link>, appointment enquiries, prices and booking information in Abu Dhabi.</p>
        <div className="mx-auto grid w-full max-w-[1160px] overflow-hidden rounded-[18px] shadow-[0_8px_24px_rgba(57,94,76,0.1)] lg:grid-cols-2">
          <div className="relative min-h-[330px] lg:min-h-[510px]">
            <Image src="/assets/Full-Body-Scrub.webp" alt="Relaxing Sara Beauty spa treatment" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="flex min-h-[510px] flex-col justify-center bg-[#395E4C] px-7 py-10 sm:px-12 lg:px-16">
            <div className="space-y-9 sm:space-y-11">
              {contactItems.map(({ label, value, href, icon: Icon }) => (
                <div key={label} className="flex gap-5 sm:gap-6">
                  <Icon className="mt-1 h-8 w-8 shrink-0 text-[#e8dfb0]" strokeWidth={1.5} />
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wide text-white/90 underline underline-offset-4">{label}</p>
                    <a href={href} target={label === "Clinic" ? "_blank" : undefined} rel={label === "Clinic" ? "noopener noreferrer" : undefined} className="mt-2 block whitespace-pre-line text-[22px] leading-[1.38] text-[#e8dfb0] underline decoration-[#e8dfb0]/70 underline-offset-4 transition hover:text-white sm:text-[25px]" style={{ fontFamily: "var(--font-display), serif" }}>
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MapSection />
    </main>
  );
}
