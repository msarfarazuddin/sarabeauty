"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import type { ServiceContentSection } from "@/data/site";
import { ServiceLinkedText, type ServiceLinkMap } from "@/components/service-linked-text";

export function ServiceContentTabs({ sections, links = {} }: { sections: ServiceContentSection[]; links?: ServiceLinkMap }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const image = [...sections].reverse().find((section) => section.image)?.image;

  if (!sections.length) return null;

  return (
    <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 grid grid-cols-1 gap-2 rounded-2xl bg-[#f5f1dc]/60 p-2 md:mb-10 md:flex md:flex-wrap md:justify-center md:gap-3 md:rounded-none md:bg-transparent md:p-0">
          {sections.map((section, index) => (
            <button
              key={section.title}
              type="button"
              aria-controls={`service-section-${index}`}
              onClick={() => {
                setActiveIndex(index);
                document.getElementById(`service-section-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className={`flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-[15px] font-semibold leading-[1.4] transition md:w-auto md:max-w-[300px] md:rounded-[10px] md:text-[20px] ${activeIndex === index ? "border-[#395E4C] bg-[#395E4C] text-[#e8dfb0]" : "border-[#395E4C]/20 bg-white text-[#395E4C] hover:bg-[#f5f1dc]"}`}
            >
              <span>{section.tabLabel ?? section.title}</span>
              <ArrowDown aria-hidden="true" className="h-4 w-4 shrink-0 md:hidden" />
            </button>
          ))}
        </div>

        <div className="items-start md:flex">
          <div className="overflow-hidden rounded-[18px] bg-[#f5f1dc] md:w-[68%]">
          <div className="p-6 sm:p-9 lg:p-5">
            {sections.map((section, index) => (
              <section id={`service-section-${index}`} key={section.title} className="mb-7 scroll-mt-28 last:mb-0 sm:mb-9">
                <h2 className="text-[27px] leading-[1.05] text-[#395E4C] sm:text-[34px]" style={{ fontFamily: "var(--font-display), serif" }}>{section.title}</h2>
                <div className="mt-4 space-y-3 text-[15px] leading-[1.68] text-[#393939] sm:text-[16px]">{section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraph}><ServiceLinkedText text={paragraph} links={links[`sections.${index}.${paragraphIndex}`]} /></p>)}</div>
              </section>
            ))}
          </div>
          </div>
          {image ? <div className="relative mt-5 aspect-[.78/1] w-full overflow-hidden rounded-[18px] md:mt-0 md:ml-0 md:min-h-[700px] md:w-[32%] md:aspect-auto"><Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" /></div> : null}
        </div>
      </div>
    </section>
  );
}
