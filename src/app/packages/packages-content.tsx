"use client";

import { BookingLink } from "@/components/booking-link";

import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { useState } from "react";

import { packages60, packages90, packageServiceLinks, type Duration } from "@/data/packages";

export default function PackagesPage() {
  const [duration, setDuration] = useState<Duration>(60);

  const activePackages = duration === 60 ? packages60 : packages90;

  return (
    <main className="w-full overflow-hidden bg-white -mt-[34px] sm:-mt-[42px] md:-mt-[110px]">
      {/* HERO */}
      <section
        className="
          packages-hero relative
         
          min-h-[590px]
          overflow-hidden
          bg-[#eee7bd]
          pt-[245px]

          sm:-mt-[128px]
          sm:min-h-[610px]
          sm:pt-[260px]

          
          lg:min-h-[620px]
          lg:pt-[280px]

          xl:min-h-[640px]
          xl:pt-[305px]
        "
      >
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 text-center sm:px-8 lg:px-10 ">
          <h1
            className="text-[42px] leading-[1] text-[#395E4C] sm:text-[52px] lg:text-[62px] xl:text-[68px]"
            style={{
              fontFamily: "var(--font-display), serif",
            }}
          >
            Our Spa and Massage Packages
          </h1>

          <p
            className="mx-auto mt-7 max-w-[1080px] text-[15px] leading-[1.65] text-[#141414] sm:text-[16px] lg:text-[18px]"
            style={{
              fontFamily: "var(--font-body), sans-serif",
            }}
          >
            Indulge in a luxurious spa treatment in the comfort of Sara Beauty’s home spa.
            Our massage therapists are professionally trained to deliver a
            relaxing and calming experience, which will help you reduce both
            your physical and mental stress.
          </p>
        </div>

        {/* Smooth bottom curve */}
        <div className="packages-hero-curve pointer-events-none absolute inset-x-0 bottom-[-1px] h-[105px] sm:h-[120px] lg:h-[135px]">
          <svg
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M0 14C220 14 370 27 515 51C665 76 820 91 995 78C1145 67 1260 44 1440 41V140H0V14Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* DURATION TOGGLE */}
      <section className="bg-white pt-10 sm:pt-12 lg:pt-14">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center gap-4 px-5 sm:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => setDuration(60)}
            className={`text-[20px] transition ${
              duration === 60
                ? "font-medium text-[#395E4C]"
                : "text-[#9a9a9a]"
            }`}
          >
            60 min
          </button>

          <button
            type="button"
            aria-label="Switch massage duration"
            role="switch"
            aria-checked={duration === 90}
            onClick={() => setDuration(duration === 60 ? 90 : 60)}
            className="relative h-[28px] w-[54px] rounded-full border border-[#dedede] bg-[#e5deba] shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]"
          >
            <span
              className={`absolute top-[3px] h-[20px] w-[20px] rounded-full bg-white transition-all duration-300 ${
                duration === 60 ? "left-[4px]" : "left-[28px]"
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => setDuration(90)}
            className={`text-[20px] transition ${
              duration === 90
                ? "font-medium text-[#395E4C]"
                : "text-[#9a9a9a]"
            }`}
          >
            90 min
          </button>
        </div>
      </section>

      {/* PACKAGE GRID */}
      <section className="packages-list bg-white px-5 pb-24 pt-12 sm:px-8 lg:px-10 lg:pt-14">
        <div className={`mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-7 md:grid-cols-2 ${duration === 60 ? "lg:grid-cols-6" : "lg:grid-cols-3"}`}>
          {activePackages.map((item, index) => {
            const isGreen = duration === 60 ? index !== 1 : index % 2 === 0;

            const isLast = index === activePackages.length - 1;

            const remainder = activePackages.length % 3;

            const shouldCenterLast =
              isLast && remainder === 1;

            return (
              <article
                key={`${duration}-${item.title}`}
                className={`
                  ${duration === 60 ? `lg:col-span-2 ${index === 3 ? "lg:col-start-2" : index === 4 ? "lg:col-start-4" : ""}` : ""}
                  flex
                  package-card min-h-[300px]
                  w-full
                  flex-col
                  overflow-hidden
                  rounded-[12px]
                  border

                  ${
                    isGreen
                      ? "border-[#395E4C] bg-[#395E4C]"
                      : "border-[#395E4C]/40 bg-white"
                  }

                  ${
                    shouldCenterLast
                      ? "md:col-span-2 md:mx-auto md:w-[calc(50%-14px)] lg:col-span-1 lg:col-start-2 lg:w-full"
                      : ""
                  }
                `}
              >
                {/* UPPER CONTENT */}
                <div className="package-card-content flex flex-1 gap-5 px-6 pb-0 pt-8">
                  {/* IMAGE */}
                  <div className="package-card-image relative h-[130px] w-[130px] min-w-[130px] overflow-hidden rounded-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="140px"
                      className="object-cover"
                    />
                  </div>

                  {/* TEXT */}
                  <div className="package-card-text flex min-w-0 flex-1 flex-col">
                    <h2
                      className={`text-[21px] font-semibold leading-[1.08] ${
                        isGreen ? "text-white" : "text-[#395E4C]"
                      }`}
                    >
                      <Link href={packageServiceLinks[item.title]}>{item.title}</Link>
                    </h2>

                    <p
                      className={`mt-2 text-[16px] leading-[1.5] ${
                        isGreen ? "text-white/90" : "text-[#686868]"
                      }`}
                    >
                      {item.description}
                    </p>

                    {/* PRICE */}
                    <div className="package-card-price mt-auto pt-4">
                      <div
                        className={`flex items-end gap-2 ${
                          isGreen ? "text-white" : "text-[#395E4C]"
                        }`}
                      >
                        <span className="pb-[4px] text-[20px]">
                          AED
                        </span>

                        <span
                          className="text-[55px] leading-none font-bold"
                          style={{
                            fontFamily: "var(--font-display), serif",
                          }}
                        >
                          {item.price.toLocaleString("en-US")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="package-card-bottom grid min-h-[80px] w-full grid-cols-[135px_1fr]">
                  {/* PACKAGE OF 10 */}
                  <div className="package-card-label flex items-center justify-center bg-[#e8dfb0] px-5 text-center">
                    <span className="text-[22px] font-medium leading-[1.05] text-black">
                    <span className="font-bold">  PACKAGE</span>
                      <br />
                      OF 10
                    </span>
                  </div>

                  {/* BOOK BUTTON */}
                  <div
                    className={`package-card-booking flex items-center px-4 ${
                      isGreen ? "bg-[#395E4C]" : "bg-white"
                    }`}
                  >
                    <BookingLink packageName={item.title} duration={duration} price={item.price}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex min-h-[38px] items-center gap-2 rounded-full px-4 py-2 text-[16px] font-semibold transition ${
                        isGreen
                          ? "bg-white text-[#395E4C] hover:bg-[#eee7bd]"
                          : "bg-[#395E4C] text-white hover:bg-[#395E4C]"
                      }`}
                    >
                      <WhatsAppIcon
                        className="h-4 w-4"
                        strokeWidth={1.8}
                      />
                      Book an appointment
                    </BookingLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
} 
