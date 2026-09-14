import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

const areas = [
  { name: "Al Reem Island", href: "/locations/al-reem-island" },
  { name: "Al Bateen", href: "/locations/al-bateen" },
  { name: "Saadiyat Island", href: "/locations/saadiyat-island" },
  { name: "Khalidiya", href: "/locations/khalidiya" },
  { name: "Al Maryah Island", href: "/locations/al-maryah-island" },
  { name: "Khalifa City", href: "/locations/khalifa-city" },
  { name: "Corniche Area", href: "/locations/corniche-area" },
];

export function AreasShowcase() {
  return (
    <section aria-labelledby="areas-heading" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-48 h-[440px] w-[440px] rounded-full border border-[#395E4C]/[0.07]" />
      <div className="relative mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[740px] text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#395E4C]">
            <span aria-hidden="true" className="h-px w-7 bg-[#b69a74]" />
            Welcoming women from across Abu Dhabi
            <span aria-hidden="true" className="h-px w-7 bg-[#b69a74]" />
          </span>
          <h2
            id="areas-heading"
            className="mt-5 text-[38px] leading-[1.12] text-[#395E4C] sm:text-[50px] lg:text-[56px]"
            style={{ fontFamily: '"Gallary", var(--font-display), serif' }}
          >
            Visit Our Home Spa in Abu Dhabi
          </h2>
          <p className="mx-auto mt-5 max-w-[590px] text-[15px] leading-7 text-[#65756b] sm:text-base">
            Wherever you live in Abu Dhabi, visit Sara Beauty’s private home spa
            for your massage and wellness treatments. All appointments take place at our spa.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12 lg:gap-5">
          {areas.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="group relative flex w-full flex-col overflow-hidden rounded-[22px] border border-[#395E4C]/10 bg-white p-6 text-[#395E4C] no-underline shadow-[0_4px_18px_rgba(57,94,76,0.03)] transition-[background-color,border-color,box-shadow,transform] duration-300 hover:border-[#395E4C] hover:bg-[#395E4C] hover:text-white hover:shadow-[0_12px_28px_rgba(57,94,76,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#395E4C] motion-safe:hover:-translate-y-1 motion-reduce:transition-none sm:w-[calc(50%-8px)] lg:w-[calc(25%-15px)]"
            >
              <span aria-hidden="true" className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-[#395E4C]/10 bg-[#f5f4ed] text-[#395E4C] group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-[#eee7bd]">
                <MapPin className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#65756b] group-hover:text-white/70">Massage &amp; home spa</span>
              <h3
                className="mt-2 text-[29px] leading-[1.12] sm:min-h-[66px]"
                style={{ fontFamily: '"Gallary", var(--font-display), serif' }}
              >
                {area.name}
              </h3>
              <span className="mt-6 flex items-center justify-between gap-3 border-t border-[#395E4C]/10 pt-4 text-[13px] font-semibold group-hover:border-white/20">
                Explore Area
                <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f4ed] text-[#395E4C] group-hover:bg-[#eee7bd]">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
