"use client";

import { BookingLink } from "@/components/booking-link";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { packages60, packages90 } from "@/data/packages";

export function PackagesTabs() {
  const [activeTab, setActiveTab] = useState<"60" | "90">("60");

  const visiblePackages = activeTab === "60" ? packages60 : packages90;

  return (
    <section
      className="relative isolate py-14 sm:py-16"
    >
      <Image src="/assets/packages-background.webp" alt="" fill sizes="100vw" className="pointer-events-none object-cover object-center" />
      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[650px]">
            <h2
              className="text-[2.35rem] leading-[0.94] font-semibold text-[var(--color-brand)] sm:text-[3.2rem]"
              style={{ fontFamily: '"Gallary", var(--font-display), sans-serif' }}
            >
              From Glow-Ups to Slim Downs
            </h2>
            <p className="mt-1 text-[2rem] leading-none text-[var(--color-ink)] sm:text-[3rem]">
              Explore Our Packages
            </p>
          </div>

          <div className="lg:pt-2">
            <p className="text-[25px] font-semibold text-[var(--color-ink)]">
              Packages Of 10
            </p>
            <div className="mt-4 inline-flex max-w-full items-center gap-3 rounded-full bg-white/40 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("60")}
                className={`rounded-full px-5 py-2 font-semibold text-sm transition ${
                  activeTab === "60"
                    ? "bg-[var(--color-brand)] text-white"
                    : "text-[var(--color-brand)]"
                }`}
              >
                60 min
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("90")}
                className={`rounded-full px-5 py-2 font-semibold text-sm transition ${
                  activeTab === "90"
                    ? "bg-[var(--color-brand)] text-white"
                    : "text-[var(--color-brand)]"
                }`}
              >
                90 min
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-4">
          {visiblePackages.map((item) => (
            <article key={`${activeTab}-${item.title}`}>
              <Link href="/packages" className="block">
                <div className="relative overflow-hidden rounded-[28px]">
                  <div className="relative aspect-[1/0.9]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-300 hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[linear-gradient(180deg,rgba(18,16,14,0)_0%,rgba(18,16,14,0.18)_28%,rgba(18,16,14,0.56)_62%,rgba(18,16,14,0.82)_100%)]" />
                    <div className="absolute bottom-3 font-semibold left-5 text-[25px] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-[25px]">
                      AED {item.price.toLocaleString("en-US")}
                    </div>
                  </div>
                </div>
              </Link>

              <div className="px-4 pt-4">
                <Link
                  href="/packages"
                  className="block text-[25px] font-medium leading-[1.2] text-[var(--color-ink)]"
                  style={{ fontFamily: '"Gallary", var(--font-display), sans-serif' }}
                >
                  {item.title}
                </Link>
                <BookingLink packageName={item.title} duration={activeTab} price={item.price}
                  className="mt-3 inline-flex h-[38px] items-center gap-2 rounded-full border-2 border-[var(--color-brand)] px-5 text-[15px] font-semibold leading-none text-[var(--color-brand)] transition hover:bg-[var(--color-brand)] hover:text-white"
                >
                  <span
                    className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-[1.5px] border-current leading-none"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-[12px] w-[12px]"
                    >
                      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.58 2 2.14 6.43 2.14 11.88c0 1.74.45 3.45 1.32 4.95L2 22l5.31-1.39a9.86 9.86 0 0 0 4.72 1.2h.01c5.45 0 9.88-4.43 9.88-9.88a9.8 9.8 0 0 0-2.87-7.02Zm-7.02 15.23h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.15.83.84-3.07-.2-.32a8.18 8.18 0 0 1-1.26-4.38c0-4.51 3.67-8.18 8.19-8.18 2.18 0 4.22.85 5.76 2.39a8.1 8.1 0 0 1 2.39 5.79c0 4.51-3.67 8.18-8.18 8.18Zm4.49-6.12c-.25-.13-1.47-.72-1.7-.8-.23-.08-.39-.13-.56.13-.16.25-.64.8-.78.97-.14.17-.28.19-.53.06a6.68 6.68 0 0 1-1.96-1.21 7.36 7.36 0 0 1-1.36-1.7c-.14-.25-.01-.38.11-.51.11-.11.25-.28.38-.42.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.84-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.02 2.59.13.17 1.77 2.7 4.28 3.79.6.26 1.07.42 1.43.54.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.17.21-.57.21-1.06.15-1.17-.06-.11-.22-.17-.47-.3Z" />
                    </svg>
                  </span>
                  Book Now
                </BookingLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
