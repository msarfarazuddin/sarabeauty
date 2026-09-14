"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { BlogFaq } from "@/data/site";
import { ServiceLinkedText, type ServiceLinkMap } from "@/components/service-linked-text";

export function ServiceFaqs({ faqs, title = "FAQs", links = {} }: { faqs: BlogFaq[]; title?: string; links?: ServiceLinkMap }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  if (!faqs.length) return null;

  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1050px]">
        <h2 className="text-center text-[39px] leading-none text-[#395E4C] sm:text-[50px]" style={{ fontFamily: "var(--font-display), serif" }}>{title}</h2>
        <div className="mt-10 space-y-3 sm:mt-12">
          {faqs.map((faq, index) => {
            if (!faq.answer.trim()) {
              return <div key={faq.question} className="rounded-[18px] border border-[#395E4C]/12 px-5 py-5 sm:px-7 sm:py-6"><h3 className="text-[17px] font-semibold leading-[1.35] text-[#395E4C] sm:text-[19px]">{faq.question}</h3></div>;
            }
            const isOpen = activeIndex === index;
            return <div key={faq.question} className={`overflow-hidden rounded-[18px] border transition-all ${isOpen ? "border-[#395E4C]/20 bg-[#f9f6e7] shadow-[0_10px_25px_rgba(57,94,76,0.08)]" : "border-[#395E4C]/12 bg-white"}`}>
              <button type="button" onClick={() => setActiveIndex(isOpen ? null : index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6">
                <h3 className="text-[17px] font-semibold leading-[1.35] text-[#395E4C] sm:text-[19px]">{faq.question}</h3>
                <span aria-hidden="true" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen ? "border-[#395E4C] bg-[#395E4C] text-white" : "border-[#395E4C]/30 text-[#395E4C]"}`}><ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} strokeWidth={2} /></span>
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><p className="whitespace-pre-line border-t border-[#395E4C]/10 px-5 py-5 text-[15px] leading-[1.7] text-[#555] sm:px-7 sm:text-[16px]"><ServiceLinkedText text={faq.answer} links={links[`faqs.${index}`]} /></p></div></div>
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
