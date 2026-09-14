"use client";

import Image from "next/image";
import { useState } from "react";

import { pageSeo, homeFaqLinks } from "@/data/page-seo";
import { ContextualLinks } from "@/components/contextual-links";

const faqs = pageSeo["/"].faqs;

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/assets/fbc.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* LIGHT OVERLAY */}

      {/* CONTENT */}
      <div className="relative mx-auto w-full max-w-[1120px]  px-5 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto mb-12 max-w-[760px] text-center sm:mb-14">
          

          <h2
            className="text-[2.5rem] leading-[1.05] text-[#395E4C] sm:text-[3.2rem] lg:text-[3.7rem]"
            style={{
              fontFamily: "var(--font-display), serif",
            }}
          >
            Frequently Asked Questions
            <br className="hidden sm:block" /> About Massage in Abu Dhabi
          </h2>

          <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.7] text-[#575757] sm:text-[16px]">
            Helpful answers to common questions about massage treatments,
            session durations, pricing and booking in Abu Dhabi.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mx-auto max-w-[930px] space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={faq.question}
                className={`group overflow-hidden rounded-[18px] border transition-all duration-300 ${
                  isOpen
                    ? "border-[#395E4C]/20 bg-white/95 shadow-[0_14px_40px_rgba(57,94,76,0.08)]"
                    : "border-white/50 bg-white/75 hover:bg-white/90"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-[2px] text-[12px] font-semibold tracking-[0.08em] text-[#a18b52] sm:text-[13px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3
                      className={`text-[16px] font-semibold leading-[1.4] transition-colors duration-300 sm:text-[17px] ${
                        isOpen
                          ? "text-[#395E4C]"
                          : "text-[#292929] group-hover:text-[#395E4C]"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* ARROW */}
                  <span
                    className={`flex h-[36px] w-[36px] min-w-[36px] items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 border-[#395E4C] bg-[#395E4C] text-white"
                        : "border-[#395E4C]/20 bg-[#f6f1df] text-[#395E4C]"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3.25 5.25L7 9L10.75 5.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 sm:px-7 sm:pb-7">
                      <div className="border-t border-[#395E4C]/10 pt-5 sm:ml-[41px]">
                        <p className="max-w-[800px] text-[14px] leading-[1.75] text-[#626262] sm:text-[15px]">
                          <ContextualLinks text={faq.answer} links={homeFaqLinks[index] ?? []} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
